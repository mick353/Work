/**
 * Build the isolated trainer-facing Course Workshop.
 *
 * The same self-contained HTML is written for offline use at the repository
 * root and for GitHub Pages under docs/course-workshop/. It contains a generic, single-course
 * learner-player template so a trainer can export a working learner file in
 * the browser without Node, repository access or a network connection.
 */

import { build } from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildAuthoredPlayerTemplate } from "./authored-player.mjs";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tempDir = path.join(projectDir, ".authoring-build");
const authoringDir = path.join(projectDir, "authoring");
const outputFile = path.join(projectDir, "Course-Authoring-Studio.html");
const publishedDir = path.join(projectDir, "docs", "course-workshop");
const publishedFile = path.join(publishedDir, "index.html");
const studioVersion = "0.2.0";

function escapeForScript(source) {
  return source.replace(/[ \t]+$/gm, "").replace(/<\/script/gi, "<\\/script");
}

function inline(template, css, js, sourceTag) {
  const result = template
    .replace("<!--INLINE_STYLES-->", () => `<style>\n${css}\n</style>`)
    .replace(sourceTag, () => `<script>\n${escapeForScript(js)}\n</script>`);
  if (result.includes("<!--INLINE_STYLES-->") || result.includes(sourceTag)) {
    throw new Error(`Template placeholder was not replaced: ${sourceTag}`);
  }
  return result;
}

await rm(tempDir, { recursive: true, force: true });
await mkdir(tempDir, { recursive: true });

const playerTemplate = await buildAuthoredPlayerTemplate(projectDir, path.join(tempDir, "player"));

// Bundle Course Workshop, embedding the already-built player as an inert string.
await build({
  entryPoints: [path.join(authoringDir, "main.tsx")],
  bundle: true,
  minify: true,
  sourcemap: false,
  format: "iife",
  target: ["chrome111", "firefox113", "safari16.4", "edge111"],
  jsx: "automatic",
  legalComments: "none",
  define: {
    "process.env.NODE_ENV": '"production"',
    __PLAYER_TEMPLATE__: JSON.stringify(playerTemplate),
    __STUDIO_VERSION__: JSON.stringify(studioVersion),
  },
  outdir: path.join(tempDir, "studio"),
  entryNames: "app",
  logLevel: "warning",
});

const [studioTemplate, studioJs, studioCss] = await Promise.all([
  readFile(path.join(authoringDir, "index.html"), "utf8"),
  readFile(path.join(tempDir, "studio", "app.js"), "utf8"),
  readFile(path.join(tempDir, "studio", "app.css"), "utf8"),
]);
const studioHtml = inline(
  studioTemplate,
  studioCss,
  studioJs,
  '<script type="module" src="/authoring/main.tsx"></script>',
);

await writeFile(outputFile, studioHtml, "utf8");
await rm(publishedDir, { recursive: true, force: true });
await mkdir(publishedDir, { recursive: true });
await writeFile(publishedFile, studioHtml, "utf8");
await rm(tempDir, { recursive: true, force: true });

console.log(
  `Built Course Workshop ${studioVersion}:\n` +
  `  ${path.relative(projectDir, outputFile)} — ${(Buffer.byteLength(studioHtml) / 1024 / 1024).toFixed(2)} MB, self-contained\n` +
  `  ${path.relative(projectDir, publishedFile)} — GitHub Pages copy\n`,
);
