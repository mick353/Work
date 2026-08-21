/** Verify every single-course export is isolated, usable and correctly branded. */

import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { build as esbuild } from "esbuild";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const checks = [];

function check(name, condition, detail = "") {
  checks.push({ name, passed: Boolean(condition), detail });
  if (!condition) failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
}

async function runExports() {
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(projectDir, "scripts", "export-all.mjs")], {
      cwd: projectDir,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Course export build failed with exit code ${code}`));
    });
  });
}

const catalogueBundle = await esbuild({
  stdin: {
    contents: `export { trainingPackages } from ${JSON.stringify(path.join(projectDir, "src", "packages.ts"))};`,
    resolveDir: projectDir,
    loader: "ts",
  },
  bundle: true,
  format: "esm",
  write: false,
  logLevel: "silent",
});
const { trainingPackages } = await import(
  `data:text/javascript;base64,${Buffer.from(catalogueBundle.outputFiles[0].text).toString("base64")}`
);

await runExports();

const browser = await chromium.launch({ headless: true });
for (const entry of trainingPackages) {
  const { id, title, version, schemaVersion } = entry.manifest;
  const exportRoot = path.join(projectDir, "exports", id);
  const standalonePath = path.join(exportRoot, `${id}.html`);
  const siteDir = path.join(exportRoot, "site");
  const siteIndex = path.join(siteDir, "index.html");
  const label = `${id} v${version}`;

  check(`${label}: standalone file exists`, existsSync(standalonePath));
  check(`${label}: web build exists`, existsSync(siteIndex));
  if (!existsSync(standalonePath) || !existsSync(siteIndex)) continue;

  const html = await readFile(standalonePath, "utf8");
  const otherTitles = trainingPackages
    .filter((candidate) => candidate.manifest.id !== id)
    .map((candidate) => candidate.manifest.title)
    .filter((otherTitle) => html.includes(otherTitle));
  check(`${label}: bundle excludes every other course`, otherTitles.length === 0, otherTitles.join(", "));
  check(`${label}: schema version is current`, schemaVersion === 1, `schema ${schemaVersion}`);

  const inlinedSlides = (html.match(/data:image\/webp;base64,/g) ?? []).length;
  check(
    `${label}: standalone contains exactly its own slide assets`,
    inlinedSlides === entry.content.slideCount,
    `${inlinedSlides} inlined; package declares ${entry.content.slideCount}`,
  );

  const payloadMatch = /<script type="application\/json" id="slide-data">([^<]*)<\/script>/.exec(html);
  const slideKeys = payloadMatch ? Object.keys(JSON.parse(payloadMatch[1])) : [];
  check(
    `${label}: inline slide keys use the course namespace`,
    slideKeys.every((key) => key.startsWith(`courses/${id}/slides/`)),
    slideKeys.find((key) => !key.startsWith(`courses/${id}/slides/`)) ?? "",
  );

  const coursesAssetDir = path.join(siteDir, "courses");
  const shippedCourseDirs = existsSync(coursesAssetDir)
    ? (await readdir(coursesAssetDir, { withFileTypes: true }))
        .filter((asset) => asset.isDirectory())
        .map((asset) => asset.name)
    : [];
  check(
    `${label}: web build contains no other course asset folder`,
    shippedCourseDirs.every((courseId) => courseId === id),
    shippedCourseDirs.join(", "),
  );
  if (entry.content.slideCount) {
    const slideDir = path.join(coursesAssetDir, id, "slides");
    const shippedSlides = existsSync(slideDir)
      ? (await readdir(slideDir)).filter((name) => /^slide-\d+\.webp$/.test(name)).length
      : 0;
    check(
      `${label}: web build contains every declared slide`,
      shippedSlides === entry.content.slideCount,
      `${shippedSlides} shipped; package declares ${entry.content.slideCount}`,
    );
  }

  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, acceptDownloads: true });
  const page = await context.newPage();
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !/favicon/i.test(message.text())) runtimeErrors.push(message.text());
  });

  await page.goto(pathToFileURL(standalonePath).href, { waitUntil: "load" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "load" });
  await page.locator(".hero h1").waitFor();

  check(`${label}: overview names the selected course`, (await page.locator(".hero h1").innerText()).trim() === title);
  check(`${label}: browser title follows the selected course`, (await page.title()).includes(title), await page.title());
  check(`${label}: package switcher is omitted`, (await page.locator(".package-switch").count()) === 0);
  check(
    `${label}: sidebar contains exactly this course's stages`,
    (await page.locator(".sidebar-modules nav button").count()) === entry.content.modules.length,
  );

  await page.evaluate(() => { window.location.hash = "library"; });
  await page.waitForTimeout(250);
  check(`${label}: library route degrades to the overview`, (await page.locator(".library-page").count()) === 0);
  check(`${label}: library route never leaves an empty shell`, (await page.locator(".hero h1").innerText()).trim() === title);

  const dashboardAxe = await new AxeBuilder({ page }).analyze();
  const severeDashboard = dashboardAxe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
  check(
    `${label}: single-course overview has no serious accessibility violations`,
    severeDashboard.length === 0,
    severeDashboard.map((violation) => violation.id).join(", "),
  );

  if (entry.content.capstoneBriefs.length && entry.content.capstoneSteps.length) {
    await page.evaluate(() => { window.location.hash = "capstone"; });
    const exportButton = page.getByRole("button", { name: /Export brief as text/ });
    await exportButton.waitFor();
    const [download] = await Promise.all([page.waitForEvent("download"), exportButton.click()]);
    const expectedPrefix = `${id}-capstone-${entry.content.capstoneBriefs[0].id}`;
    check(
      `${label}: capstone download filename is course-scoped`,
      download.suggestedFilename() === `${expectedPrefix}.txt`,
      download.suggestedFilename(),
    );
    const downloadedPath = await download.path();
    const exportedText = downloadedPath ? await readFile(downloadedPath, "utf8") : "";
    check(
      `${label}: capstone download heading is course-scoped`,
      exportedText.startsWith(`${title.toUpperCase()} CAPSTONE`),
      exportedText.split(/\r?\n/, 1)[0] ?? "no content",
    );
  }

  check(`${label}: no uncaught browser errors`, runtimeErrors.length === 0, runtimeErrors.join(" | "));
  await context.close();
}
await browser.close();

for (const result of checks) {
  console.log(`${result.passed ? "PASS" : "FAIL"}  ${result.name}${result.detail && !result.passed ? ` — ${result.detail}` : ""}`);
}
console.log(`\n${checks.length - failures.length}/${checks.length} individual-export checks passed.`);
if (failures.length) {
  console.error(`\n${failures.length} failure(s):\n- ${failures.join("\n- ")}`);
  process.exitCode = 1;
}
