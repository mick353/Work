/** Build the trusted single-course player template used by Course Workshop and release inspection. */

import { build } from "esbuild";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const AUTHORED_PACKAGE_MARKER = "<!--AUTHORED_PACKAGE_DATA-->";

function authoredPackagePlugin() {
  return {
    name: "authored-runtime-package",
    setup(builder) {
      builder.onResolve({ filter: /^\.\/package-catalog$/ }, (args) => {
        if (!args.importer.endsWith(`${path.sep}packages.ts`)) return null;
        return { path: "authored-runtime-package", namespace: "course-workshop" };
      });
      builder.onLoad({ filter: /.*/, namespace: "course-workshop" }, () => ({
        loader: "ts",
        contents: `
const element = document.getElementById("authored-package-data");
if (!element?.textContent) throw new Error("The exported course data is missing.");
export const catalogPackages = [JSON.parse(element.textContent)];
`,
      }));
    },
  };
}

function escapeForScript(source) {
  return source.replace(/[ \t]+$/gm, "").replace(/<\/script/gi, "<\\/script");
}

function safeJsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

export async function buildAuthoredPlayerTemplate(projectDir, outputDir) {
  await build({
    entryPoints: [path.join(projectDir, "src", "main.tsx")],
    bundle: true,
    minify: true,
    sourcemap: false,
    format: "iife",
    target: ["chrome111", "firefox113", "safari16.4", "edge111"],
    jsx: "automatic",
    legalComments: "none",
    loader: { ".png": "dataurl" },
    define: { "process.env.NODE_ENV": '"production"' },
    outdir: outputDir,
    entryNames: "app",
    plugins: [authoredPackagePlugin()],
    logLevel: "warning",
  });

  const [templateSource, playerJs, playerCss] = await Promise.all([
    readFile(path.join(projectDir, "index.html"), "utf8"),
    readFile(path.join(outputDir, "app.js"), "utf8"),
    readFile(path.join(outputDir, "app.css"), "utf8"),
  ]);
  const template = templateSource
    .replace("<!--INLINE_STYLES-->", () => `<style>\n${playerCss}\n</style>`)
    .replace("<!--SLIDE_DATA-->", AUTHORED_PACKAGE_MARKER)
    .replace('<script type="module" src="/src/main.tsx"></script>', () => `<script>\n${escapeForScript(playerJs)}\n</script>`)
    .replace("Product Practice — Training Package Player", "Product Practice — Exported Training Course");

  if (!template.includes(AUTHORED_PACKAGE_MARKER) || template.includes("src/main.tsx")) {
    throw new Error("The learner-player template was not assembled correctly.");
  }
  return template;
}

export function insertAuthoredPackage(template, entry) {
  if (!template.includes(AUTHORED_PACKAGE_MARKER)) throw new Error("The authored player marker is missing.");
  const payload = `<script type="application/json" id="authored-package-data">${safeJsonForHtml(entry)}</script>`;
  return template.replace(AUTHORED_PACKAGE_MARKER, payload);
}
