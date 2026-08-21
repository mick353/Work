/** Build one standalone file and one web folder for every registered course folder. */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const coursesDir = path.join(projectDir, "src", "courses");
const courseIds = (await readdir(coursesDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && existsSync(path.join(coursesDir, entry.name, "index.ts")))
  .map((entry) => entry.name)
  .sort();

if (!courseIds.length) throw new Error("No course packages found.");

for (const courseId of courseIds) {
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(projectDir, "scripts", "build.mjs"), "--course", courseId], {
      cwd: projectDir,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Export failed for ${courseId} with exit code ${code}`));
    });
  });
}

console.log(`Exported ${courseIds.length} course package${courseIds.length === 1 ? "" : "s"}.`);
