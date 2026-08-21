/** End-to-end checks for Course Workshop package inspection, installation and nested-page caching. */

import { chromium } from "playwright";
import { strToU8, unzipSync, zipSync } from "fflate";
import { spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const installer = path.join(projectDir, "scripts", "install-course-package.mjs");
const fixtureDir = path.join(projectDir, ".qa-release");
const fixtureZip = path.join(fixtureDir, "workshop-fixture-course-package.zip");
let passed = 0;
let failed = 0;

function check(label, condition, detail = "") {
  if (condition) {
    passed += 1;
    console.log(`✓ ${label}${detail ? ` — ${detail}` : ""}`);
  } else {
    failed += 1;
    console.error(`✗ ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

function runInstaller(mode, packagePath, targetProject) {
  const args = [installer, mode, packagePath];
  if (targetProject) args.push("--project", targetProject);
  return spawnSync(process.execPath, args, { cwd: projectDir, encoding: "utf8" });
}

if (!existsSync(fixtureZip)) {
  const generated = spawnSync(process.execPath, [path.join(projectDir, "scripts", "qa-authoring.mjs")], {
    cwd: projectDir,
    stdio: "inherit",
  });
  if (generated.status !== 0) throw new Error("Could not generate the Course Workshop release fixture.");
}

const inspection = runInstaller("--inspect", fixtureZip);
check("Inspector accepts an approved package after recomputing local checks", inspection.status === 0 && /release record complete/i.test(inspection.stdout), inspection.stderr.trim());

const testProject = await mkdtemp(path.join(projectDir, ".qa-release-run-"));
if (!path.relative(projectDir, testProject).startsWith(".qa-release-run-")) {
  throw new Error(`Unsafe QA target: ${testProject}`);
}
try {
  await mkdir(path.join(testProject, "src"), { recursive: true });
  await writeFile(path.join(testProject, "package.json"), "{}\n", "utf8");
  await writeFile(
    path.join(testProject, "src", "package-catalog.ts"),
    await readFile(path.join(projectDir, "src", "package-catalog.ts"), "utf8"),
    "utf8",
  );

  const installed = runInstaller("--install", fixtureZip, testProject);
  const installedCourse = path.join(testProject, "src", "courses", "workshop-fixture");
  const installedCatalog = await readFile(path.join(testProject, "src", "package-catalog.ts"), "utf8");
  check("Combined-catalogue command installs one namespaced course and one catalogue entry", installed.status === 0 && existsSync(path.join(installedCourse, "course-package.json")) && existsSync(path.join(installedCourse, "index.ts")) && installedCatalog.includes('./courses/workshop-fixture'), installed.stderr.trim());
  check("Combined-catalogue command installs course-owned assets in the same namespace", existsSync(path.join(testProject, "public", "courses", "workshop-fixture", "README.md")));

  const hosted = runInstaller("--host", fixtureZip, testProject);
  check("Individual-hosting command creates a route-owned page and release record", hosted.status === 0 && existsSync(path.join(testProject, "public", "training", "workshop-fixture", "index.html")) && existsSync(path.join(testProject, "public", "training", "workshop-fixture", "release-record.json")), hosted.stderr.trim());

  const overwriteInstall = runInstaller("--install", fixtureZip, testProject);
  const overwriteHost = runInstaller("--host", fixtureZip, testProject);
  check("Release commands refuse to overwrite an existing course or hosted route", overwriteInstall.status !== 0 && overwriteHost.status !== 0 && /refusing to overwrite/i.test(`${overwriteInstall.stderr}${overwriteHost.stderr}`));
} finally {
  await rm(testProject, { recursive: true, force: true });
}

const unsafeZip = path.join(fixtureDir, "unsafe-course-package.zip");
await writeFile(unsafeZip, zipSync({ "../outside.txt": strToU8("must not escape") }));
const unsafeInspection = runInstaller("--inspect", unsafeZip);
check("Inspector rejects ZIP traversal before writing anything", unsafeInspection.status !== 0 && /unsafe zip path/i.test(unsafeInspection.stderr));

const packageFiles = unzipSync(new Uint8Array(await readFile(fixtureZip)));
const root = "workshop-fixture-course-package";
const releasePath = `${root}/release-record.json`;
const tamperedRelease = JSON.parse(new TextDecoder().decode(packageFiles[releasePath]));
tamperedRelease.approvals.releaseApproved = false;
packageFiles[releasePath] = strToU8(JSON.stringify(tamperedRelease));
const tamperedZip = path.join(fixtureDir, "tampered-release-course-package.zip");
await writeFile(tamperedZip, zipSync(packageFiles));
const tamperedInspection = runInstaller("--inspect", tamperedZip);
check("Inspector rejects an incomplete or tampered release record", tamperedInspection.status !== 0 && /release checklist/i.test(tamperedInspection.stderr));

const codeTamperedFiles = unzipSync(new Uint8Array(await readFile(fixtureZip)));
const entryPath = `${root}/src/courses/workshop-fixture/index.ts`;
codeTamperedFiles[entryPath] = strToU8(`${new TextDecoder().decode(codeTamperedFiles[entryPath])}\nconsole.log("unexpected executable code");\n`);
const codeTamperedZip = path.join(fixtureDir, "tampered-entry-course-package.zip");
await writeFile(codeTamperedZip, zipSync(codeTamperedFiles));
const codeTamperedInspection = runInstaller("--inspect", codeTamperedZip);
check("Inspector rejects executable changes to the generated data-only entry module", codeTamperedInspection.status !== 0 && /data-only template/i.test(codeTamperedInspection.stderr));

const pageTamperedFiles = unzipSync(new Uint8Array(await readFile(fixtureZip)));
const hostedPath = `${root}/hosted/index.html`;
pageTamperedFiles[hostedPath] = strToU8(new TextDecoder().decode(pageTamperedFiles[hostedPath]).replace("</body>", '<script>window.untrustedPackageCode = true;</script></body>'));
const pageTamperedZip = path.join(fixtureDir, "tampered-hosted-page-course-package.zip");
await writeFile(pageTamperedZip, zipSync(pageTamperedFiles));
const pageTamperedInspection = runInstaller("--inspect", pageTamperedZip);
check("Inspector rejects executable changes to the hosted learner page", pageTamperedInspection.status !== 0 && /trusted single-course player/i.test(pageTamperedInspection.stderr));

const docsDir = path.join(projectDir, "docs");
const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".webmanifest", "application/manifest+json"],
  [".png", "image/png"],
  [".webp", "image/webp"],
]);
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    let relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    if (!relative || relative.endsWith("/")) relative += "index.html";
    const candidate = path.resolve(docsDir, relative);
    const withinDocs = path.relative(docsDir, candidate);
    if (withinDocs.startsWith("..") || path.isAbsolute(withinDocs)) throw new Error("unsafe path");
    const information = await stat(candidate);
    if (!information.isFile()) throw new Error("not a file");
    response.writeHead(200, { "Content-Type": types.get(path.extname(candidate)) ?? "application/octet-stream" });
    response.end(await readFile(candidate));
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
if (!address || typeof address === "string") throw new Error("Could not start QA web server.");
const rootUrl = `http://127.0.0.1:${address.port}/`;
const workshopUrl = `${rootUrl}course-workshop/`;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ serviceWorkers: "allow" });
const page = await context.newPage();
try {
  await page.goto(rootUrl);
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await page.waitForSelector(".app-shell");
  await page.goto(workshopUrl);
  await page.waitForSelector(".studio-shell");
  await page.goto(rootUrl);
  await page.waitForSelector(".app-shell");
  await context.setOffline(true);
  await page.goto(workshopUrl);
  const offlineWorkshopTitle = await page.title();
  await page.goto(rootUrl);
  const offlineRootTitle = await page.title();
  check("Service worker keeps nested Workshop and learner-home documents in separate offline cache entries", /Course Workshop/i.test(offlineWorkshopTitle) && /Product Practice/i.test(offlineRootTitle) && !/Course Workshop/i.test(offlineRootTitle));
} finally {
  await context.setOffline(false);
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

await rm(fixtureDir, { recursive: true, force: true });
console.log(`\nCourse release QA: ${passed} passed, ${failed} failed.\n`);
if (failed) process.exit(1);
