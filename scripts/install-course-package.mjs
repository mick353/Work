/**
 * Inspect or install a repository package exported by Course Workshop.
 *
 * This command never commits or pushes. It refuses overwrites and treats every
 * ZIP path and embedded release claim as untrusted until checked locally.
 */

import { build } from "esbuild";
import { unzipSync } from "fflate";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildAuthoredPlayerTemplate, insertAuthoredPackage } from "./authored-player.mjs";

const scriptProjectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAX_ZIP_BYTES = 80 * 1024 * 1024;
const MAX_EXPANDED_BYTES = 150 * 1024 * 1024;
const textDecoder = new TextDecoder("utf-8", { fatal: true });

function fail(message) {
  throw new Error(message);
}

function parseArguments(args) {
  const mode = args[0];
  if (!["--inspect", "--install", "--host"].includes(mode)) {
    fail("Usage: node scripts/install-course-package.mjs --inspect|--install|--host <course-package.zip> [--project <repository>]");
  }
  const zipPath = args[1];
  if (!zipPath || zipPath.startsWith("--")) fail("A Course Workshop repository-package ZIP path is required.");
  const projectPosition = args.indexOf("--project");
  const projectDir = projectPosition < 0 ? scriptProjectDir : args[projectPosition + 1];
  if (!projectDir || projectDir.startsWith("--")) fail("--project requires a repository path.");
  return {
    mode,
    zipPath: path.resolve(zipPath),
    projectDir: path.resolve(projectDir),
  };
}

function assertInside(parent, candidate, label) {
  const relative = path.relative(parent, candidate);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    fail(`${label} must resolve inside ${parent}.`);
  }
}

function safeZipName(rawName) {
  const name = rawName.replace(/\\/g, "/");
  const parts = name.split("/").filter(Boolean);
  if (!parts.length || name.startsWith("/") || /^[A-Za-z]:/.test(name) || parts.some((part) => part === ".." || part === ".")) {
    fail(`Unsafe ZIP path: ${rawName}`);
  }
  return parts.join("/");
}

function readText(files, name) {
  const bytes = files.get(name);
  if (!bytes) fail(`Package is missing ${name}.`);
  try {
    return textDecoder.decode(bytes);
  } catch {
    fail(`${name} is not valid UTF-8 text.`);
  }
}

function readJson(files, name) {
  try {
    return JSON.parse(readText(files, name));
  } catch (error) {
    fail(`${name} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function requiredReleaseRecord(record, entry, packageSha256) {
  if (!record || typeof record !== "object" || record.recordVersion !== 2) fail("release-record.json uses an unsupported format. Regenerate the package with the current Course Workshop.");
  if (record.packageId !== entry.manifest.id || record.packageVersion !== entry.manifest.version) {
    fail("Release record identity does not match course-package.json.");
  }
  if (record.packageDigest?.algorithm !== "SHA-256" || record.packageDigest?.value !== packageSha256) {
    fail("Release record is not bound to the exact course-package.json content.");
  }
  if (record.packageStatus !== "available" || record.checklistComplete !== true) {
    fail("The package is not recorded as an approved Available release.");
  }
  const approvals = record.approvals;
  if (!approvals ||
      approvals.subjectMatterChecked !== true ||
      approvals.learningFlowChecked !== true ||
      approvals.audienceAndHandlingChecked !== true ||
      approvals.releaseApproved !== true ||
      typeof approvals.reviewer?.name !== "string" || !approvals.reviewer.name.trim() ||
      typeof approvals.reviewer?.role !== "string" || !approvals.reviewer.role.trim() ||
      typeof approvals.approver?.name !== "string" || !approvals.approver.name.trim() ||
      typeof approvals.approver?.role !== "string" || !approvals.approver.role.trim() ||
      typeof approvals.approvalScope !== "string" || !approvals.approvalScope.trim() ||
      typeof approvals.approvalReference !== "string" || !approvals.approvalReference.trim() ||
      typeof approvals.approvalDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(approvals.approvalDate)) {
    fail("release-record.json does not contain the complete human release checklist.");
  }
}

async function loadValidators() {
  const result = await build({
    stdin: {
      contents: `export { validateTrainingPackage } from "./src/package-validation.ts";\nexport { evaluateCourse } from "./authoring/quality.ts";`,
      resolveDir: scriptProjectDir,
      loader: "ts",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node18",
    write: false,
    logLevel: "silent",
  });
  const source = result.outputFiles[0]?.text;
  if (!source) fail("Could not load the repository package validators.");
  return import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
}

function authoredDataFromHtml(html) {
  const match = html.match(/<script\s+type="application\/json"\s+id="authored-package-data">([\s\S]*?)<\/script>/i);
  if (!match) fail("hosted/index.html does not contain authored package data.");
  try {
    return JSON.parse(match[1]);
  } catch {
    fail("hosted/index.html contains invalid authored package data.");
  }
}

function expectedEntryModule() {
  return `import type { TrainingPackage } from "../../package-model";
import courseData from "./course-package.json";

/** Data-only package generated by Product Practice Course Workshop. */
export const authoredCourse = courseData as unknown as TrainingPackage;

export default authoredCourse;
`;
}

async function inspectPackage(zipPath) {
  if (!existsSync(zipPath)) fail(`Package not found: ${zipPath}`);
  const information = await stat(zipPath);
  if (!information.isFile()) fail(`Package path is not a file: ${zipPath}`);
  if (information.size > MAX_ZIP_BYTES) fail(`Package exceeds the ${MAX_ZIP_BYTES / 1024 / 1024} MB compressed limit.`);

  const rawEntries = unzipSync(new Uint8Array(await readFile(zipPath)));
  const files = new Map();
  let expandedBytes = 0;
  for (const [rawName, bytes] of Object.entries(rawEntries)) {
    const name = safeZipName(rawName);
    if (files.has(name)) fail(`Duplicate normalised ZIP path: ${name}`);
    expandedBytes += bytes.length;
    if (expandedBytes > MAX_EXPANDED_BYTES) fail(`Package exceeds the ${MAX_EXPANDED_BYTES / 1024 / 1024} MB expanded limit.`);
    if (!rawName.endsWith("/")) files.set(name, bytes);
  }

  const roots = new Set([...files.keys()].map((name) => name.split("/")[0]));
  if (roots.size !== 1) fail("Repository package must contain exactly one top-level folder.");
  const root = [...roots][0];
  if (!root.endsWith("-course-package")) fail("Top-level folder is not a Course Workshop repository package.");

  const canonicalPath = `${root}/course-package.json`;
  const canonicalText = readText(files, canonicalPath);
  const packageSha256 = createHash("sha256").update(canonicalText, "utf8").digest("hex");
  const entry = readJson(files, canonicalPath);
  if (!entry?.manifest?.id || !entry?.content) fail("course-package.json is not a training package.");
  const id = entry.manifest.id;
  if (root !== `${id}-course-package`) fail("Top-level folder does not match the package id.");
  if (entry.manifest.status !== "available") fail("Only a course with Available status can be installed or hosted.");

  const nestedPath = `${root}/src/courses/${id}/course-package.json`;
  if (readText(files, nestedPath) !== readText(files, canonicalPath)) {
    fail("The canonical and repository-path course-package.json files differ.");
  }
  if (readText(files, `${root}/src/courses/${id}/index.ts`) !== expectedEntryModule()) {
    fail("The generated course entry module differs from the repository's data-only template.");
  }
  const assetPrefix = `${root}/public/courses/${id}/`;
  for (const name of files.keys()) {
    if (!name.startsWith(assetPrefix)) continue;
    const relative = name.slice(assetPrefix.length);
    const allowed = relative === "README.md" || /\.(?:avif|gif|jpe?g|png|webp)$/i.test(relative);
    if (!allowed) fail(`Public course asset is not an allowed image or README: ${relative}`);
  }
  const hostedHtml = readText(files, `${root}/hosted/index.html`);
  const hostedEntry = authoredDataFromHtml(hostedHtml);
  if (hostedEntry?.manifest?.id !== id || hostedEntry?.manifest?.version !== entry.manifest.version) {
    fail("The hosted page does not contain the same course identity and version.");
  }

  const playerCheckDir = await mkdtemp(path.join(scriptProjectDir, ".package-player-check-"));
  assertInside(scriptProjectDir, playerCheckDir, "Player verification directory");
  let trustedHostedHtml;
  try {
    const template = await buildAuthoredPlayerTemplate(scriptProjectDir, path.join(playerCheckDir, "player"));
    trustedHostedHtml = insertAuthoredPackage(template, entry);
  } finally {
    await rm(playerCheckDir, { recursive: true, force: true });
  }
  if (hostedHtml !== trustedHostedHtml) {
    fail("hosted/index.html differs from the repository's trusted single-course player build.");
  }

  const releasePath = `${root}/release-record.json`;
  const release = readJson(files, releasePath);
  requiredReleaseRecord(release, entry, packageSha256);
  const archivedReleasePath = `${root}/src/courses/${id}/releases/${entry.manifest.version}.json`;
  if (readText(files, archivedReleasePath) !== readText(files, releasePath)) {
    fail("The course-owned release archive differs from release-record.json.");
  }
  const report = readJson(files, `${root}/validation-report.json`);
  if (report.packageId !== id || report.packageVersion !== entry.manifest.version || report.contentBlocked !== false || report.releaseReady !== true) {
    fail("validation-report.json does not record a release-ready version of this package.");
  }
  if (report.packageDigest?.algorithm !== "SHA-256" || report.packageDigest?.value !== packageSha256) {
    fail("validation-report.json is not bound to the exact course-package.json content.");
  }

  const validators = await loadValidators();
  const structuralErrors = validators.validateTrainingPackage(entry);
  const authoringErrors = validators.evaluateCourse(entry).filter((issue) => issue.severity === "error");
  if (structuralErrors.length || authoringErrors.length) {
    const messages = [...structuralErrors, ...authoringErrors.map((issue) => issue.title)];
    fail(`Local validation rejected the package:\n- ${messages.join("\n- ")}`);
  }

  return { id, entry, release, report, root, files, hostedHtml: trustedHostedHtml, expandedBytes };
}

function catalogWithCourse(source, id) {
  if (source.includes(`./courses/${id}`)) fail(`The catalogue already references ${id}.`);
  const match = source.match(/export const catalogPackages = \[([\s\S]*?)\];/);
  if (!match) fail("src/package-catalog.ts does not contain the expected catalogPackages declaration.");
  const identifier = `course${id.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("")}`;
  if (new RegExp(`\\b${identifier}\\b`).test(source)) fail(`Catalogue identifier ${identifier} already exists.`);
  const importLine = `import ${identifier} from "./courses/${id}";\n`;
  const exportPosition = match.index;
  const withImport = `${source.slice(0, exportPosition)}${importLine}${source.slice(exportPosition)}`;
  const oldItems = match[1].split(",").map((item) => item.trim()).filter(Boolean);
  const oldDeclaration = match[0];
  const newDeclaration = `export const catalogPackages = [${[...oldItems, identifier].join(", ")}];`;
  return withImport.replace(oldDeclaration, newDeclaration);
}

async function installInCatalogue(projectDir, inspected) {
  const coursesDir = path.join(projectDir, "src", "courses");
  const targetCourse = path.join(coursesDir, inspected.id);
  const publicCoursesDir = path.join(projectDir, "public", "courses");
  const targetAssets = path.join(publicCoursesDir, inspected.id);
  const catalogPath = path.join(projectDir, "src", "package-catalog.ts");
  assertInside(projectDir, targetCourse, "Course target");
  assertInside(projectDir, targetAssets, "Asset target");
  if (existsSync(targetCourse)) fail(`Refusing to overwrite existing course folder: ${targetCourse}`);
  if (existsSync(targetAssets)) fail(`Refusing to overwrite existing course asset folder: ${targetAssets}`);
  if (!existsSync(catalogPath)) fail(`Catalogue not found: ${catalogPath}`);

  const catalogSource = await readFile(catalogPath, "utf8");
  const nextCatalog = catalogWithCourse(catalogSource, inspected.id);
  await mkdir(coursesDir, { recursive: true });
  await mkdir(publicCoursesDir, { recursive: true });
  const stagedCourse = await mkdtemp(path.join(coursesDir, ".course-install-"));
  const stagedAssets = await mkdtemp(path.join(publicCoursesDir, ".course-assets-"));
  const catalogTemp = `${catalogPath}.course-install-${process.pid}.tmp`;
  let courseMoved = false;
  let assetsMoved = false;
  try {
    await writeFile(path.join(stagedCourse, "course-package.json"), readText(inspected.files, `${inspected.root}/course-package.json`), "utf8");
    await writeFile(path.join(stagedCourse, "index.ts"), expectedEntryModule(), "utf8");
    await mkdir(path.join(stagedCourse, "releases"), { recursive: true });
    await writeFile(
      path.join(stagedCourse, "releases", `${inspected.entry.manifest.version}.json`),
      readText(inspected.files, `${inspected.root}/release-record.json`),
      "utf8",
    );
    const assetPrefix = `${inspected.root}/public/courses/${inspected.id}/`;
    for (const [name, bytes] of inspected.files) {
      if (!name.startsWith(assetPrefix)) continue;
      const relative = name.slice(assetPrefix.length);
      const target = path.join(stagedAssets, ...relative.split("/"));
      assertInside(stagedAssets, target, "Staged asset");
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, bytes);
    }
    await writeFile(catalogTemp, nextCatalog, "utf8");
    await rename(stagedCourse, targetCourse);
    courseMoved = true;
    await rename(stagedAssets, targetAssets);
    assetsMoved = true;
    await rename(catalogTemp, catalogPath);
  } catch (error) {
    if (courseMoved) await rm(targetCourse, { recursive: true, force: true });
    else await rm(stagedCourse, { recursive: true, force: true });
    if (assetsMoved) await rm(targetAssets, { recursive: true, force: true });
    else await rm(stagedAssets, { recursive: true, force: true });
    await rm(catalogTemp, { force: true });
    throw error;
  }
  console.log(`Installed ${inspected.id} in the combined catalogue. Run npm run verify, inspect Git diff, then commit deliberately.`);
}

async function hostCourse(projectDir, inspected) {
  const trainingDir = path.join(projectDir, "public", "training");
  const target = path.join(trainingDir, inspected.id);
  assertInside(projectDir, target, "Hosted-course target");
  if (existsSync(target)) fail(`Refusing to overwrite existing hosted course: ${target}`);
  await mkdir(trainingDir, { recursive: true });
  const staged = await mkdtemp(path.join(trainingDir, ".course-host-"));
  try {
    await writeFile(path.join(staged, "index.html"), inspected.hostedHtml, "utf8");
    await writeFile(path.join(staged, "release-record.json"), JSON.stringify(inspected.release, null, 2), "utf8");
    await rename(staged, target);
  } catch (error) {
    await rm(staged, { recursive: true, force: true });
    throw error;
  }
  console.log(`Hosted-course source installed at public/training/${inspected.id}/. Run npm run verify before publication.`);
}

const { mode, zipPath, projectDir } = parseArguments(process.argv.slice(2));
if (!existsSync(path.join(projectDir, "package.json"))) fail(`Repository package.json not found: ${projectDir}`);
const inspected = await inspectPackage(zipPath);
console.log(
  `Inspected ${inspected.id} v${inspected.entry.manifest.version}: ` +
  `${inspected.entry.content.modules.length} stages, ${(inspected.expandedBytes / 1024 / 1024).toFixed(2)} MB expanded, release record complete.`,
);
if (mode === "--install") await installInCatalogue(projectDir, inspected);
if (mode === "--host") await hostCourse(projectDir, inspected);
