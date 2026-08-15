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
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
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
 * Replacements use FUNCTIONS, never strings: a minified bundle contains `$&`
 * and `$1`, which String.replace would otherwise treat as substitution
 * patterns and splice the original tag back into the output.
 */
function inline(template, css, js) {
  const html = template
    .replace("<!--INLINE_STYLES-->", () => `<style>\n${css}\n</style>`)
    .replace(
      '<script type="module" src="/src/main.tsx"></script>',
      () => `<script>\n${escapeForScript(js)}\n</script>`,
    );
  if (html.includes("src/main.tsx") || html.includes("<!--INLINE_STYLES-->")) {
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

  // 1. Standalone, fully self-contained.
  const standalone = inline(template, css, js);
  await writeFile(standaloneFile, standalone, "utf8");

  // 2. GitHub Pages build.
  const version = createHash("sha256").update(standalone).digest("hex").slice(0, 12);
  const pagesHtml = standalone
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

  const sizeKb = (Buffer.byteLength(standalone, "utf8") / 1024).toFixed(1);
  console.log(
    `\nBuilt:\n  ${path.relative(projectDir, standaloneFile)} — ${sizeKb} KB, self-contained` +
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
