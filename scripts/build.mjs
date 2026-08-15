/**
 * Build.
 *
 * Emits two things from one bundle:
 *
 *   1. Product-Management-Learning-System.html
 *      Pure single file. No external references at all — it works from a USB
 *      stick, an email attachment or a network share.
 *
 *   2. docs/
 *      The same app plus a web manifest, icons and a service worker, for
 *      GitHub Pages. Pages is configured to serve from the `docs` folder on
 *      `main`, which is why the built page lands there as index.html.
 *
 * The PWA bits are deliberately kept OUT of the standalone file: a service
 * worker registration that can never succeed on file:// would just log errors.
 *
 * Usage:  node scripts/build.mjs [--watch]
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
const docsDir = path.join(projectDir, "docs");
const standaloneFile = path.join(projectDir, "Product-Management-Learning-System.html");
const templateFile = path.join(projectDir, "index.html");

const watch = process.argv.includes("--watch");

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
};

function escapeForScript(source) {
  // Stop an accidental </script> inside a string literal closing the tag early.
  return source.replace(/<\/script/gi, "<\\/script");
}

/**
 * The 98 source slides, and the one real difference between the two builds.
 *
 * Standalone has to stay a single file — a folder of images beside it would be
 * lost the first time anyone emailed it on — so every slide goes in as a data
 * URI. That is a few megabytes, which is the honest price of "one file that
 * contains everything".
 *
 * Pages must NOT do that. A phone should download a small page and then fetch
 * only the slides actually opened, which is what `loading="lazy"` and the
 * service worker's cache-first rule give us. So the placeholder is simply
 * dropped, and the app falls back to `slides/slide-NN.webp` paths.
 *
 * The payload is a JSON script tag rather than a JS assignment so it costs
 * nothing until something asks for a slide — see `slideSrc` in slide-viewer.tsx.
 * Base64 is [A-Za-z0-9+/=] and the keys are digits, so nothing in here can
 * close the tag early.
 */
async function slideDataTag() {
  const dir = path.join(publicDir, "slides");
  if (!existsSync(dir)) return { tag: "", bytes: 0, count: 0 };

  const files = (await readdir(dir)).filter((name) => /^slide-\d+\.webp$/.test(name)).sort();
  if (!files.length) return { tag: "", bytes: 0, count: 0 };

  const entries = {};
  for (const file of files) {
    const n = Number(file.match(/\d+/)[0]);
    const data = await readFile(path.join(dir, file));
    entries[n] = `data:image/webp;base64,${data.toString("base64")}`;
  }

  const json = JSON.stringify(entries);
  if (json.includes("</")) throw new Error("Slide payload contains a tag terminator.");
  return {
    tag: `<script type="application/json" id="slide-data">${json}</script>`,
    bytes: Buffer.byteLength(json, "utf8"),
    count: files.length,
  };
}

/**
 * Replacements use FUNCTIONS, never strings: a minified bundle contains `$&`
 * and `$1`, which String.replace would otherwise treat as substitution
 * patterns and splice the original tag back into the output.
 */
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

async function assemble() {
  const [template, js, css] = await Promise.all([
    readFile(templateFile, "utf8"),
    readFile(path.join(tempDir, "app.js"), "utf8"),
    existsSync(path.join(tempDir, "app.css"))
      ? readFile(path.join(tempDir, "app.css"), "utf8")
      : Promise.resolve(""),
  ]);

  const slideData = await slideDataTag();

  // 1. Standalone, fully self-contained — slides inlined.
  const standalone = inline(template, css, js, slideData.tag);
  await writeFile(standaloneFile, standalone, "utf8");

  // 2. Pages — same bundle, slides left as separate lazy-loaded files.
  const pagesBase = inline(template, css, js, "");

  const version = createHash("sha256").update(pagesBase).digest("hex").slice(0, 12);
  const pagesHtml = pagesBase
    .replace("</head>", () => `${PWA_HEAD}\n  </head>`)
    .replace("</body>", () => `${PWA_SCRIPT}\n  </body>`);

  await rm(docsDir, { recursive: true, force: true });
  await mkdir(docsDir, { recursive: true });
  await writeFile(path.join(docsDir, "index.html"), pagesHtml, "utf8");
  // Stops GitHub Pages running the output through Jekyll.
  await writeFile(path.join(docsDir, ".nojekyll"), "", "utf8");

  await cp(publicDir, docsDir, { recursive: true });

  // replaceAll, not replace: the token also appears in sw.js's own doc comment,
  // and replacing only the first occurrence left the real constant unstamped —
  // which would have pinned every visitor to the first cached release.
  const swSource = await readFile(path.join(publicDir, "sw.js"), "utf8");
  const swOut = swSource.replaceAll("__BUILD_VERSION__", version);
  if (swOut.includes("__BUILD_VERSION__")) {
    throw new Error("Service worker version placeholder was not fully substituted.");
  }
  if (!swOut.includes(version)) {
    throw new Error("Service worker version was not stamped.");
  }
  await writeFile(path.join(docsDir, "sw.js"), swOut, "utf8");

  const standaloneMb = (Buffer.byteLength(standalone, "utf8") / 1024 / 1024).toFixed(2);
  const pagesKb = (Buffer.byteLength(pagesHtml, "utf8") / 1024).toFixed(1);
  const slideMb = (slideData.bytes / 1024 / 1024).toFixed(2);
  console.log(
    `\nBuilt:\n  ${path.relative(projectDir, standaloneFile)} — ${standaloneMb} MB, self-contained` +
      ` (${slideData.count} slides inlined, ${slideMb} MB)` +
      `\n  docs/index.html — ${pagesKb} KB, ${slideData.count} slides fetched on demand` +
      `\n  docs/ — GitHub Pages build, cache version ${version}\n`,
  );
}

await mkdir(tempDir, { recursive: true });

if (watch) {
  const ctx = await context({
    ...buildOptions,
    plugins: [
      {
        name: "assemble",
        setup(builder) {
          builder.onEnd(async (result) => {
            if (result.errors.length) return;
            await assemble();
          });
        },
      },
    ],
  });
  await ctx.watch();
  console.log("Watching for changes. Reload the HTML after each rebuild.");
} else {
  await build(buildOptions);
  await assemble();
  await rm(tempDir, { recursive: true, force: true });
}
