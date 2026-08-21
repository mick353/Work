/**
 * Build the combined catalogue or one isolated course package.
 *
 * Default output (the published multi-course site):
 *   Product-Management-Learning-System.html
 *   docs/
 *
 * Single-course output:
 *   exports/<course-id>/<course-id>.html
 *   exports/<course-id>/site/
 *
 * Usage:
 *   node scripts/build.mjs
 *   node scripts/build.mjs --course pm-fundamentals
 *   node scripts/build.mjs --course closure-reports
 *   node scripts/build.mjs --watch [--course <course-id>]
 */

import { build, context } from "esbuild";
import { createHash } from "node:crypto";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tempDir = path.join(projectDir, ".build");
const publicDir = path.join(projectDir, "public");
const templateFile = path.join(projectDir, "index.html");
const watch = process.argv.includes("--watch");

function optionValue(name) {
  const position = process.argv.indexOf(name);
  if (position < 0) return null;
  const value = process.argv[position + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value.`);
  return value;
}

const selectedCourseId = optionValue("--course");
if (selectedCourseId && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(selectedCourseId)) {
  throw new Error("Course id must be a lowercase URL-safe slug.");
}

const selectedCourseIndex = selectedCourseId
  ? path.join(projectDir, "src", "courses", selectedCourseId, "index.ts")
  : null;
if (selectedCourseIndex && !existsSync(selectedCourseIndex)) {
  const available = (await readdir(path.join(projectDir, "src", "courses"), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && existsSync(path.join(projectDir, "src", "courses", entry.name, "index.ts")))
    .map((entry) => entry.name)
    .sort();
  throw new Error(`Unknown course '${selectedCourseId}'. Available: ${available.join(", ")}`);
}

const outputRoot = selectedCourseId
  ? path.join(projectDir, "exports", selectedCourseId)
  : projectDir;
const siteDir = selectedCourseId ? path.join(outputRoot, "site") : path.join(projectDir, "docs");
const standaloneFile = selectedCourseId
  ? path.join(outputRoot, `${selectedCourseId}.html`)
  : path.join(projectDir, "Product-Management-Learning-System.html");

/** Replace the catalogue at bundle time so an individual export contains one course only. */
function selectedCoursePlugin() {
  if (!selectedCourseIndex) return null;
  return {
    name: "selected-course-catalogue",
    setup(builder) {
      builder.onResolve({ filter: /^\.\/package-catalog$/ }, (args) => {
        if (!args.importer.endsWith(`${path.sep}packages.ts`)) return null;
        return { path: "selected-course-catalogue", namespace: "course-export" };
      });
      builder.onLoad({ filter: /.*/, namespace: "course-export" }, () => ({
        loader: "ts",
        resolveDir: projectDir,
        contents:
          `import selectedPackage from ${JSON.stringify(selectedCourseIndex)};\n` +
          "export const catalogPackages = [selectedPackage];\n",
      }));
    },
  };
}

const cataloguePlugin = selectedCoursePlugin();
const buildOptions = {
  entryPoints: [path.join(projectDir, "src/main.tsx")],
  bundle: true,
  minify: !watch,
  sourcemap: false,
  format: "iife",
  target: ["chrome111", "firefox113", "safari16.4", "edge111"],
  jsx: "automatic",
  legalComments: "none",
  define: { "process.env.NODE_ENV": watch ? '"development"' : '"production"' },
  outdir: tempDir,
  entryNames: "app",
  logLevel: "info",
  plugins: cataloguePlugin ? [cataloguePlugin] : [],
};

function escapeForScript(source) {
  return source.replace(/[ \t]+$/gm, "").replace(/<\/script/gi, "<\\/script");
}

async function slideFiles() {
  const coursesDir = path.join(publicDir, "courses");
  if (!existsSync(coursesDir)) return [];
  const courseIds = selectedCourseId
    ? [selectedCourseId]
    : (await readdir(coursesDir, { withFileTypes: true }))
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();

  const files = [];
  for (const courseId of courseIds) {
    const slidesDir = path.join(coursesDir, courseId, "slides");
    if (!existsSync(slidesDir)) continue;
    const names = (await readdir(slidesDir))
      .filter((name) => /^slide-\d+\.webp$/.test(name))
      .sort();
    for (const name of names) files.push(path.join(slidesDir, name));
  }
  return files;
}

/** Inline only the slides belonging to the catalogue being built. */
async function slideDataTag() {
  const files = await slideFiles();
  if (!files.length) return { tag: "", bytes: 0, count: 0 };

  const entries = {};
  for (const file of files) {
    const key = path.relative(publicDir, file).split(path.sep).join("/");
    const data = await readFile(file);
    entries[key] = `data:image/webp;base64,${data.toString("base64")}`;
  }

  const json = JSON.stringify(entries);
  if (json.includes("</")) throw new Error("Slide payload contains a tag terminator.");
  return {
    tag: `<script type="application/json" id="slide-data">${json}</script>`,
    bytes: Buffer.byteLength(json, "utf8"),
    count: files.length,
  };
}

function inline(template, css, js, slideTag) {
  const html = template
    .replace("<!--INLINE_STYLES-->", () => `<style>\n${css}\n</style>`)
    .replace("<!--SLIDE_DATA-->", () => slideTag)
    .replace(
      '<script type="module" src="/src/main.tsx"></script>',
      () => `<script>\n${escapeForScript(js)}\n</script>`,
    );
  if (
    html.includes("src/main.tsx") ||
    html.includes("<!--INLINE_STYLES-->") ||
    html.includes("<!--SLIDE_DATA-->")
  ) {
    throw new Error("Template placeholders were not replaced — check index.html.");
  }
  return html;
}

const PWA_HEAD = `
    <link rel="manifest" href="manifest.webmanifest" />
    <link rel="icon" href="icon-192.png" sizes="192x192" type="image/png" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Product Practice" />
    <meta name="mobile-web-app-capable" content="yes" />`;

const PWA_SCRIPT = `
    <script>
      if ("serviceWorker" in navigator) {
        addEventListener("load", function () {
          navigator.serviceWorker.register("sw.js").catch(function () {
            /* Offline support is a bonus; the app works without it. */
          });
        });
      }
    </script>`;

/** Copy shared PWA files and only the course assets present in this build. */
async function copyPublicFiles(target) {
  const entries = await readdir(publicDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "courses") continue;
    await cp(path.join(publicDir, entry.name), path.join(target, entry.name), { recursive: true });
  }

  const sourceCourses = path.join(publicDir, "courses");
  if (!existsSync(sourceCourses)) return;
  const targetCourses = path.join(target, "courses");
  if (!selectedCourseId) {
    await cp(sourceCourses, targetCourses, { recursive: true });
    return;
  }
  const selectedAssets = path.join(sourceCourses, selectedCourseId);
  if (existsSync(selectedAssets)) {
    await mkdir(targetCourses, { recursive: true });
    await cp(selectedAssets, path.join(targetCourses, selectedCourseId), { recursive: true });
  }
}

async function assemble() {
  const [template, js, css] = await Promise.all([
    readFile(templateFile, "utf8"),
    readFile(path.join(tempDir, "app.js"), "utf8"),
    existsSync(path.join(tempDir, "app.css"))
      ? readFile(path.join(tempDir, "app.css"), "utf8")
      : Promise.resolve(""),
  ]);

  const slideData = await slideDataTag();
  const standalone = inline(template, css, js, slideData.tag);
  await mkdir(outputRoot, { recursive: true });
  await writeFile(standaloneFile, standalone, "utf8");

  const pagesBase = inline(template, css, js, "");
  const version = createHash("sha256").update(pagesBase).digest("hex").slice(0, 12);
  const pagesHtml = pagesBase
    .replace("</head>", () => `${PWA_HEAD}\n  </head>`)
    .replace("</body>", () => `${PWA_SCRIPT}\n  </body>`);

  await rm(siteDir, { recursive: true, force: true });
  await mkdir(siteDir, { recursive: true });
  await writeFile(path.join(siteDir, "index.html"), pagesHtml, "utf8");
  await writeFile(path.join(siteDir, ".nojekyll"), "", "utf8");
  await copyPublicFiles(siteDir);

  const swSource = await readFile(path.join(publicDir, "sw.js"), "utf8");
  const swOut = swSource.replaceAll("__BUILD_VERSION__", version);
  if (swOut.includes("__BUILD_VERSION__") || !swOut.includes(version)) {
    throw new Error("Service worker version was not fully stamped.");
  }
  await writeFile(path.join(siteDir, "sw.js"), swOut, "utf8");

  const standaloneMb = (Buffer.byteLength(standalone, "utf8") / 1024 / 1024).toFixed(2);
  const pagesKb = (Buffer.byteLength(pagesHtml, "utf8") / 1024).toFixed(1);
  const slideMb = (slideData.bytes / 1024 / 1024).toFixed(2);
  console.log(
    `\nBuilt ${selectedCourseId ?? "combined catalogue"}:` +
      `\n  ${path.relative(projectDir, standaloneFile)} — ${standaloneMb} MB, self-contained` +
      ` (${slideData.count} slides inlined, ${slideMb} MB)` +
      `\n  ${path.relative(projectDir, path.join(siteDir, "index.html"))} — ${pagesKb} KB` +
      `\n  ${path.relative(projectDir, siteDir)} — web build, cache version ${version}\n`,
  );
}

await mkdir(tempDir, { recursive: true });

if (watch) {
  const ctx = await context({
    ...buildOptions,
    plugins: [
      ...buildOptions.plugins,
      {
        name: "assemble",
        setup(builder) {
          builder.onEnd(async (result) => {
            if (!result.errors.length) await assemble();
          });
        },
      },
    ],
  });
  await ctx.watch();
  console.log(`Watching ${selectedCourseId ?? "combined catalogue"}. Reload the HTML after each rebuild.`);
} else {
  await build(buildOptions);
  await assemble();
  await rm(tempDir, { recursive: true, force: true });
}
