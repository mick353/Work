/**
 * Portable QA suite.
 *
 * The previous version hardcoded an absolute path to a Playwright install under
 * one user's home directory and to chrome.exe under Program Files, so it could
 * only ever run on one machine. It also asserted element counts and that
 * buttons had accessible names, which it described as verification.
 *
 * This version:
 *   - resolves Playwright from node_modules and uses its bundled Chromium
 *   - runs axe-core against every top-level view
 *   - verifies scoring arithmetic rather than that a button can be clicked
 *   - verifies mastery gating, the export/import round trip, keyboard access
 *     to the mobile drawer, and per-learner option shuffling
 *
 * Usage:  npm run qa           (add --headed to watch it)
 * Setup:  npx playwright install chromium
 */

import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { build as esbuild } from "esbuild";
import path from "node:path";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactPath = path.join(projectDir, "Product-Management-Learning-System.html");
if (!existsSync(artifactPath)) {
  throw new Error("Build the artefact first: npm run build");
}
const artifactUrl = pathToFileURL(artifactPath).href;
const headed = process.argv.includes("--headed");

const failures = [];
const checks = [];
const consoleErrors = [];

function check(name, condition, detail = "") {
  checks.push({ name, passed: Boolean(condition), detail });
  if (!condition) failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
}

function watchPage(page, label) {
  page.on("pageerror", (error) => consoleErrors.push(`${label} pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    // file:// favicon lookups are noise, not application errors.
    if (/favicon/i.test(text)) return;
    consoleErrors.push(`${label} console: ${text}`);
  });
}

/* ---------------------------------------------------------------- *
 * Question-bank integrity (runs against the source, before the browser)
 *
 * The previous release never shuffled options and 85% of correct answers sat
 * at position B or C, so answering "B" every time scored 48%. These checks
 * assert both that the stored data is balanced and — more importantly — that
 * what a learner actually sees is balanced after per-install shuffling.
 * ---------------------------------------------------------------- */

const bankModule = await esbuild({
  stdin: {
    contents: `
      export { practiceQuestions, modules } from ${JSON.stringify(path.join(projectDir, "src/course.ts"))};
      export { diagnosticQuestions, flashcards, toolkitTemplates, supplementaryQuestions } from ${JSON.stringify(path.join(projectDir, "src/reference.ts"))};
      export { presentOptions } from ${JSON.stringify(path.join(projectDir, "src/lib.ts"))};
    `,
    resolveDir: projectDir,
    loader: "ts",
  },
  bundle: true,
  format: "esm",
  write: false,
  logLevel: "silent",
});
const bank = await import(
  `data:text/javascript;base64,${Buffer.from(bankModule.outputFiles[0].text).toString("base64")}`
);

const allQuestions = [...bank.practiceQuestions, ...bank.diagnosticQuestions];

/**
 * Stage quizzes now RESAMPLE on every attempt, so the suite cannot replay
 * answer text recorded from a previous set. It knows the bank, so it looks the
 * correct option up by prompt instead.
 */
const answerByPrompt = new Map();
for (const q of [...allQuestions, ...bank.supplementaryQuestions]) {
  answerByPrompt.set(q.prompt.slice(0, 60), q.options[q.answer]);
}
const correctOptionFor = async (block) => {
  const legend = (await block.locator("legend").textContent()) ?? "";
  for (const [prompt, option] of answerByPrompt) {
    if (legend.includes(prompt.slice(0, 40))) return option;
  }
  return null;
};
check("Question bank is substantially larger than one practice set", allQuestions.length >= 60, `${allQuestions.length} questions`);
check("Every question has four options", allQuestions.every((q) => q.options.length === 4));
check(
  "Every optionNotes array aligns with its options",
  allQuestions.every((q) => !q.optionNotes || (q.optionNotes.length === 4 && q.optionNotes[q.answer] === "")),
);
check("Question ids are unique", new Set(allQuestions.map((q) => q.id)).size === allQuestions.length);
check(
  "Diagnostic pool does not overlap the practice pool",
  bank.diagnosticQuestions.every((q) => !bank.practiceQuestions.some((p) => p.prompt === q.prompt)),
);
check("Flashcards include application and discrimination cards", ["application", "discrimination"].every(
  (kind) => bank.flashcards.filter((card) => card.kind === kind).length >= 5,
));

const storedSpread = allQuestions.reduce((counts, q) => {
  counts[q.answer] = (counts[q.answer] ?? 0) + 1;
  return counts;
}, {});
const storedMax = Math.max(...Object.values(storedSpread)) / allQuestions.length;
check(
  "Stored answer indices are balanced",
  storedMax <= 0.32,
  `most common index holds ${(storedMax * 100).toFixed(0)}% (${JSON.stringify(storedSpread)})`,
);

const presentedSpread = [0, 0, 0, 0];
for (let learner = 0; learner < 40; learner += 1) {
  const salt = `qa-learner-${learner}`;
  for (const question of allQuestions) {
    presentedSpread[bank.presentOptions(question, salt).findIndex((option) => option.isAnswer)] += 1;
  }
}
const presentedTotal = presentedSpread.reduce((sum, value) => sum + value, 0);
const presentedMax = Math.max(...presentedSpread) / presentedTotal;
check(
  "Correct answer position is balanced across learners",
  presentedMax <= 0.3,
  `most common position holds ${(presentedMax * 100).toFixed(1)}% across ${presentedTotal} presentations`,
);
check(
  "Guessing a single position cannot beat chance",
  presentedMax <= 0.3,
  `best single-position strategy scores ${(presentedMax * 100).toFixed(1)}%`,
);

const totalMinutes = bank.modules.reduce((sum, module) => sum + module.minutes, 0);
check("Stated stage count is nine", bank.modules.length === 9);
// Four is the minimum that makes the 75% mastery threshold meaningful; the
// delivery and government stages carry five because they cover more ground.
check(
  "Every stage has at least four knowledge questions and exactly two scenarios",
  bank.modules.every((module) => module.questions.length >= 4 && module.scenarios.length === 2),
  bank.modules.map((module) => `${module.id}:${module.questions.length}q/${module.scenarios.length}s`).join(" "),
);
console.log(
  `\nBank: ${allQuestions.length} questions, ${bank.flashcards.length} cards, ${bank.toolkitTemplates.length} templates, ${totalMinutes} minutes of lessons.\n`,
);

/* ---------------------------------------------------------------- *
 * GitHub Pages build integrity
 * ---------------------------------------------------------------- */

const docsDir = path.join(projectDir, "docs");
if (!existsSync(docsDir)) {
  check("docs/ build exists", false, "run npm run build");
} else {
  const docsIndex = await readFile(path.join(docsDir, "index.html"), "utf8");
  const swSource = await readFile(path.join(docsDir, "sw.js"), "utf8");
  const manifestRaw = await readFile(path.join(docsDir, "manifest.webmanifest"), "utf8");

  check("Pages build links the manifest", docsIndex.includes('rel="manifest"'));
  check("Pages build registers the service worker", docsIndex.includes('serviceWorker.register("sw.js")'));
  check("Pages build has an apple-touch-icon", docsIndex.includes('rel="apple-touch-icon"'));
  check(
    "Service worker version placeholder is fully substituted",
    !swSource.includes("__BUILD_VERSION__"),
    "an unstamped cache name would pin every visitor to the first release",
  );
  check("Service worker cache name is versioned", /const VERSION = "[0-9a-f]{6,}"/.test(swSource));
  check(".nojekyll is present", existsSync(path.join(docsDir, ".nojekyll")));

  let manifest = null;
  try {
    manifest = JSON.parse(manifestRaw);
  } catch {
    /* handled below */
  }
  check("Manifest is valid JSON", manifest !== null);
  if (manifest) {
    check("Manifest uses relative start_url and scope", manifest.start_url === "./" && manifest.scope === "./",
      "absolute paths break on project pages served from a subdirectory");
    check("Manifest declares a maskable icon", manifest.icons.some((icon) => icon.purpose === "maskable"));
    check(
      "All manifest icons exist",
      manifest.icons.every((icon) => existsSync(path.join(docsDir, icon.src))),
    );
  }

  check(
    "Standalone build stays free of external references",
    !(await readFile(artifactPath, "utf8")).includes('rel="manifest"'),
    "the offline single file must not reference assets it cannot load",
  );
}

const browser = await chromium.launch({ headless: !headed });

/* ---------------------------------------------------------------- *
 * Desktop pass
 * ---------------------------------------------------------------- */

const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
const page = await context.newPage();
watchPage(page, "desktop");

await page.goto(artifactUrl, { waitUntil: "load" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "load" });
await page.getByRole("heading", { name: "Learn the judgement behind the frameworks." }).waitFor();

/* -- structure ---------------------------------------------------- */

const stageButtons = await page.locator(".sidebar-modules button").count();
check("Nine curriculum stages in the sidebar", stageButtons === 9, `found ${stageButtons}`);

await page.getByRole("button", { name: "Learning path", exact: true }).click();
await page.getByRole("heading", { name: "Build the whole product-management chain" }).waitFor();
const pathItems = await page.locator(".path-item").count();
check("Nine stages on the learning path", pathItems === 9, `found ${pathItems}`);

/* -- scoring arithmetic ------------------------------------------- */
// Answer everything with the first option, read which options were actually
// correct, retry, and select those. This verifies the score is computed from
// the answers rather than merely that submission works.

await page.locator(".path-item").first().getByRole("button", { name: /Open stage/ }).click();
// Headings carry a visually-hidden "Stage N: " prefix, so match on substring.
await page.getByRole("heading", { name: /Product thinking and strategy/ }).first().waitFor();

const quiz = page.locator(".knowledge-check .question-block");
const quizCount = await quiz.count();
check("Stage quiz presents five sampled questions", quizCount === 5, `found ${quizCount}`);

for (let index = 0; index < quizCount; index += 1) {
  await quiz.nth(index).locator(".answer-option").first().click();
}
await page.getByRole("button", { name: "Check my recall" }).click();
await page.locator(".quiz-result").waitFor();

const firstScoreText = (await page.locator(".quiz-result strong").textContent()) ?? "";
const firstScore = Number(firstScoreText.match(/scored (\d+)%/)?.[1] ?? "-1");

const correctByQuestion = [];
for (let index = 0; index < quizCount; index += 1) {
  const text = await quiz.nth(index).locator(".answer-option.correct .answer-text").first().textContent();
  correctByQuestion.push((text ?? "").trim());
  const chosenWasCorrect = await quiz.nth(index).locator(".answer-option").first().evaluate((el) =>
    el.classList.contains("correct"),
  );
  if (!chosenWasCorrect) {
    const hasIncorrect = await quiz.nth(index).locator(".answer-option.incorrect").count();
    check(`Q${index + 1} marks the chosen wrong answer`, hasIncorrect === 1, `found ${hasIncorrect}`);
  }
}

const expectedFirstScore = Math.round(
  (await Promise.all(
    Array.from({ length: quizCount }, (_, index) =>
      quiz.nth(index).locator(".answer-option").first().evaluate((el) => el.classList.contains("correct")),
    ),
  ).then((flags) => flags.filter(Boolean).length / quizCount)) * 100,
);
check(
  "Reported score matches the answers given",
  firstScore === expectedFirstScore,
  `reported ${firstScore}%, expected ${expectedFirstScore}%`,
);

check("Per-distractor feedback is shown", (await page.locator(".feedback-chosen").count()) > 0);

// Retaking now RESAMPLES from the stage pool rather than repeating the same
// items, so the previous set's answer text will not exist here. Verify the
// resampling, then re-verify the arithmetic against the new set.
const firstSet = await quiz.locator("legend").allTextContents();
await page.getByRole("button", { name: "Try these again" }).click();
await page.waitForTimeout(300);
const secondSet = await quiz.locator("legend").allTextContents();
check(
  "Retaking a stage quiz draws a different question set",
  JSON.stringify(firstSet.map((t) => t.slice(0, 40)).sort()) !==
    JSON.stringify(secondSet.map((t) => t.slice(0, 40)).sort()),
  "a static retake tests memory of the answer, not the idea",
);

const retakeCount = await quiz.count();
for (let index = 0; index < retakeCount; index += 1) {
  await quiz.nth(index).locator(".answer-option").first().click();
}
await page.getByRole("button", { name: "Check my recall" }).click();
await page.locator(".quiz-result").waitFor();
const retakeText = (await page.locator(".quiz-result strong").textContent()) ?? "";
const retakeScore = Number(retakeText.match(/scored (\d+)%/)?.[1] ?? "-1");
const retakeExpected = Math.round(
  (await Promise.all(
    Array.from({ length: retakeCount }, (_, index) =>
      quiz.nth(index).locator(".answer-option").first().evaluate((el) => el.classList.contains("correct")),
    ),
  ).then((flags) => flags.filter(Boolean).length / retakeCount)) * 100,
);
check(
  "Scoring is correct on the resampled set too",
  retakeScore === retakeExpected,
  `reported ${retakeScore}%, expected ${retakeExpected}%`,
);
check("Stage quiz samples five questions", retakeCount === 5, `found ${retakeCount}`);

/* -- mastery gating ----------------------------------------------- */

const statusBefore = (await page.locator(".module-footer span").first().textContent()) ?? "";
check(
  "Stage is not mastered before the lesson check and scenarios",
  statusBefore.startsWith("Outstanding"),
  statusBefore,
);

// Score 100% on a fresh sample so the Recall requirement is genuinely met.
await page.getByRole("button", { name: "Try these again" }).click();
await page.waitForTimeout(300);
const masteryCount = await quiz.count();
for (let index = 0; index < masteryCount; index += 1) {
  const block = quiz.nth(index);
  const correctText = await correctOptionFor(block);
  if (correctText) await block.locator(".answer-option").filter({ hasText: correctText }).first().click();
  else await block.locator(".answer-option").first().click();
}
await page.getByRole("button", { name: "Check my recall" }).click();
await page.locator(".quiz-result").waitFor();
const masteryText = (await page.locator(".quiz-result strong").textContent()) ?? "";
check("Answering from the bank scores 100% on a resampled set", /scored 100%/.test(masteryText), masteryText);

await page.getByLabel("I can explain the lesson without relying on the slide wording.").check();

const scenarios = page.locator(".scenario-panel .question-block");
const scenarioCount = await scenarios.count();
check("Stage 1 has two decision scenarios", scenarioCount === 2, `found ${scenarioCount}`);

for (let index = 0; index < scenarioCount; index += 1) {
  await scenarios.nth(index).locator(".answer-option").first().click();
  const solved = await scenarios.nth(index).locator(".answer-option").first().evaluate((el) =>
    el.classList.contains("correct"),
  );
  if (!solved) {
    const correctText = (
      await scenarios.nth(index).locator(".answer-option.correct .answer-text").first().textContent()
    )?.trim();
    await page.locator(".scenario-retry button").nth(index).click();
    await scenarios.nth(index).locator(".answer-option").filter({ hasText: correctText ?? "" }).first().click();
  }
}

const statusAfter = (await page.locator(".module-footer span").first().textContent()) ?? "";
check("Stage reports mastered once all three requirements are met", statusAfter.startsWith("Mastered"), statusAfter);
check("Mastery reports how it was earned", /attempt/.test(statusAfter), statusAfter);

/* -- option shuffling --------------------------------------------- */

const orderForSalt = async (salt) => {
  await page.evaluate((value) => {
    localStorage.setItem("product-practice-v2:salt", JSON.stringify(value));
  }, salt);
  await page.reload({ waitUntil: "load" });
  await page.locator(".scenario-panel .question-block").first().waitFor();
  // Scenarios are fixed per stage (only the quiz resamples), so they are the
  // stable surface for testing that a learner's option order does not drift.
  return page
    .locator(".scenario-panel .question-block")
    .first()
    .locator(".answer-text")
    .allTextContents();
};

const orderA = await orderForSalt("salt-alpha");
const orderB = await orderForSalt("salt-bravo");
check(
  "Answer options are permuted per learner",
  JSON.stringify(orderA) !== JSON.stringify(orderB),
  "both salts produced the same order",
);
check(
  "Permutation preserves all options",
  JSON.stringify([...orderA].sort()) === JSON.stringify([...orderB].sort()),
  "option sets differ between salts",
);

const orderAgain = await orderForSalt("salt-alpha");
check(
  "Permutation is stable for a given learner",
  JSON.stringify(orderA) === JSON.stringify(orderAgain),
  "same salt produced a different order",
);

/* -- persistence and the diagnostic pool -------------------------- */

await page.getByRole("button", { name: "Product toolkit", exact: true }).click();
const toolkitCount = await page.locator(".toolkit-item").count();
check("Ten toolkit templates", toolkitCount === 10, `found ${toolkitCount}`);

const toolkitDraft = "Providers need a reliable way to understand application status without calling support.";
await page.locator(".toolkit-item textarea").first().fill(toolkitDraft);
await page.reload({ waitUntil: "load" });
await page.locator(".toolkit-item textarea").first().waitFor();
check(
  "Toolkit drafts persist across reload",
  (await page.locator(".toolkit-item textarea").first().inputValue()) === toolkitDraft,
);

await page.getByRole("button", { name: "Capstone", exact: true }).click();
const capstoneCount = await page.locator(".capstone-steps > section").count();
check("Nine capstone sections", capstoneCount === 9, `found ${capstoneCount}`);
check(
  "Capstone offers per-section self-assessment",
  (await page.locator(".rubric-check").count()) === 9,
  `found ${await page.locator(".rubric-check").count()}`,
);

await page.getByRole("button", { name: "DES field guide", exact: true }).click();
await page.getByRole("heading", { name: "The reference half of the course" }).waitFor();
const guideText = await page.locator(".field-guide").innerText();
for (const term of ["Pre-Approval", "Program Increment", "Iteration path", "Senior Responsible Officer", "Learn continuously"]) {
  check(`Field guide covers ${term}`, guideText.toLowerCase().includes(term.toLowerCase()));
}

await page.getByRole("button", { name: "Divergence register", exact: true }).click();
const divergenceCount = await page.locator(".divergence").count();
check("Divergence register is populated", divergenceCount >= 5, `found ${divergenceCount}`);

await page.getByRole("button", { name: "Sources", exact: true }).click();
const sourceCount = await page.locator(".source-list article").count();
check("Provenance list is populated", sourceCount >= 14, `found ${sourceCount}`);

/* -- diagnostic pool is separate from the practice pool ----------- */

await page.getByRole("button", { name: "Search the course" }).click();
await page.getByRole("searchbox", { name: "Search the course" }).fill("iteration path");
await page.waitForTimeout(200);
const searchResults = await page.locator(".search-result").count();
check("Search finds backlog field detail", searchResults > 0, `found ${searchResults} results`);

await page.evaluate(() => {
  window.location.hash = "diagnostic";
});
await page.getByRole("heading", { name: "Find the first weak link" }).waitFor();
const diagnosticPrompts = await page.locator(".diagnostic-list .question-block legend").allTextContents();
check("Diagnostic samples nine questions", diagnosticPrompts.length === 9, `found ${diagnosticPrompts.length}`);
const overlapsModuleQuiz = diagnosticPrompts.some((prompt) =>
  prompt.includes("Which statement best distinguishes a product from a project?"),
);
check("Diagnostic does not reuse module quiz questions", !overlapsModuleQuiz);

/* -- backup export and import ------------------------------------- */

await page.getByRole("button", { name: "Learning settings" }).click();
const download = await Promise.all([
  page.waitForEvent("download"),
  page.getByRole("button", { name: "Download backup" }).click(),
]).then(([event]) => event);
const backupPath = path.join(projectDir, ".qa-backup.json");
await download.saveAs(backupPath);

// Wipe everything, then restore from the file.
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "load" });
await page.evaluate(() => {
  window.location.hash = "settings";
});
await page.getByRole("heading", { name: "Back up, restore or reset your progress" }).waitFor();
await page.locator('input[type="file"]').setInputFiles(backupPath);
await page.getByText("Backup restored", { exact: false }).waitFor();

await page.evaluate(() => {
  window.location.hash = "path";
});
await page.getByRole("heading", { name: "Build the whole product-management chain" }).waitFor();
const masteredLabels = await page.locator(".mastered-label").count();
check("Imported backup restores mastery", masteredLabels >= 1, `found ${masteredLabels}`);

const restoredToolkit = await page.evaluate(() => localStorage.getItem("product-practice-v2:toolkit"));
check("Imported backup restores toolkit drafts", (restoredToolkit ?? "").includes("Providers need a reliable way"));

// A malformed file must be rejected rather than clearing progress.
const badPath = path.join(projectDir, ".qa-bad.json");
await writeFile(badPath, "{ not json", "utf8");
await page.evaluate(() => {
  window.location.hash = "settings";
});
await page.locator('input[type="file"]').setInputFiles(badPath);
await page.locator(".settings-message.error").waitFor();
check("Malformed backup is rejected with an error", true);

/* -- accessibility ------------------------------------------------- */

const axeViews = [
  ["dashboard", "dashboard"],
  ["path", "learning path"],
  ["module/thinking", "stage 1"],
  ["review", "review"],
  ["practice", "mixed practice"],
  ["results", "results dashboard"],
  ["toolkit", "toolkit"],
  ["capstone", "capstone"],
  ["fieldguide", "field guide"],
  ["glossary", "glossary"],
  ["sources", "sources"],
  ["divergences", "divergence register"],
  ["settings", "settings"],
  ["diagnostic", "diagnostic"],
];

for (const [hash, label] of axeViews) {
  await page.evaluate((target) => {
    window.location.hash = target;
  }, hash);
  await page.waitForTimeout(250);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const serious = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
  check(
    `Accessibility (${label}): no serious or critical violations`,
    serious.length === 0,
    serious.map((violation) => `${violation.id} x${violation.nodes.length}`).join("; "),
  );
}

// Dark theme contrast is checked separately — it is a different palette.
await page.getByRole("button", { name: /Switch to dark theme/ }).click();
await page.evaluate(() => {
  window.location.hash = "module/delivery";
});
await page.waitForTimeout(300);
const darkResults = await new AxeBuilder({ page }).withTags(["wcag2aa", "wcag21aa"]).analyze();
const darkSerious = darkResults.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
check(
  "Accessibility (dark theme): no serious or critical violations",
  darkSerious.length === 0,
  darkSerious.map((violation) => `${violation.id} x${violation.nodes.length}`).join("; "),
);
check("Dark theme is applied", (await page.locator("html").getAttribute("data-theme")) === "dark");

// axe skips contrast checks on gradient backgrounds and reports "incomplete",
// so light-on-gradient text can ship unreadable. Assert the computed colour.
await page.evaluate(() => { window.location.hash = "dashboard"; });
await page.waitForTimeout(300);
const gradientText = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll(".metric-strip span, .metric-strip strong, .hero h1, .hero p").forEach((el) => {
    const c = getComputedStyle(el).color.match(/\d+/g).map(Number);
    out.push({ text: (el.textContent || "").slice(0, 24), luminance: (c[0] + c[1] + c[2]) / 3 });
  });
  return out;
});
const tooDark = gradientText.filter((item) => item.luminance < 170);
check(
  "Text on gradient panels is light enough to read",
  tooDark.length === 0,
  tooDark.map((item) => `"${item.text}" avg ${Math.round(item.luminance)}`).join("; "),
);

await page.screenshot({ path: path.join(projectDir, "qa-desktop.png"), fullPage: false });

/* ---------------------------------------------------------------- *
 * Mobile pass
 * ---------------------------------------------------------------- */

const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobilePage = await mobileContext.newPage();
watchPage(mobilePage, "mobile");
await mobilePage.goto(artifactUrl, { waitUntil: "load" });
await mobilePage.getByRole("heading", { name: "Learn the judgement behind the frameworks." }).waitFor();

// The closed drawer must not be reachable by keyboard. Previously it was
// translated off-screen but still in the tab order, so a keyboard user tabbed
// into sixteen invisible navigation buttons.
const drawerInert = await mobilePage.locator(".sidebar").evaluate((el) => el.hasAttribute("inert"));
check("Closed mobile drawer is inert", drawerInert);

await mobilePage.getByRole("button", { name: "Open navigation" }).click();
await mobilePage.locator(".sidebar.open").waitFor();
await mobilePage.waitForTimeout(300);

const drawerBox = await mobilePage.locator(".sidebar.open").evaluate((el) => {
  const rect = el.getBoundingClientRect();
  return { left: rect.left, right: rect.right, zIndex: Number(getComputedStyle(el).zIndex) };
});
check(
  "Open drawer is on screen and above the scrim",
  drawerBox.left >= -1 && drawerBox.right > 200 && drawerBox.zIndex > 140,
  JSON.stringify(drawerBox),
);

const focusInsideDrawer = await mobilePage.evaluate(() =>
  Boolean(document.activeElement?.closest(".sidebar")),
);
check("Opening the drawer moves focus into it", focusInsideDrawer);

await mobilePage.keyboard.press("Escape");
await mobilePage.waitForTimeout(250);
check("Escape closes the drawer", (await mobilePage.locator(".sidebar.open").count()) === 0);
const focusReturned = await mobilePage.evaluate(() =>
  document.activeElement?.classList.contains("mobile-menu"),
);
check("Escape returns focus to the menu button", focusReturned);

const mobileAxe = await new AxeBuilder({ page: mobilePage }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
const mobileSerious = mobileAxe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
check(
  "Accessibility (mobile dashboard): no serious or critical violations",
  mobileSerious.length === 0,
  mobileSerious.map((violation) => `${violation.id} x${violation.nodes.length}`).join("; "),
);

await mobilePage.screenshot({ path: path.join(projectDir, "qa-mobile.png"), fullPage: false });

await mobileContext.close();
await context.close();
await browser.close();

/* ---------------------------------------------------------------- *
 * Report
 * ---------------------------------------------------------------- */

check("No uncaught console or page errors", consoleErrors.length === 0, consoleErrors.join(" | "));

const report = {
  artefact: artifactUrl,
  ranAt: new Date().toISOString(),
  passed: failures.length === 0,
  totalChecks: checks.length,
  failed: failures.length,
  checks,
};
await writeFile(path.join(projectDir, "qa-report.json"), JSON.stringify(report, null, 2), "utf8");

for (const item of checks) {
  console.log(`${item.passed ? "PASS" : "FAIL"}  ${item.name}${item.detail && !item.passed ? ` — ${item.detail}` : ""}`);
}
console.log(`\n${checks.length - failures.length}/${checks.length} checks passed.`);

if (failures.length) {
  console.error(`\n${failures.length} failure(s):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
