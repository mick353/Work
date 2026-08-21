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
      import { trainingPackages } from ${JSON.stringify(path.join(projectDir, "src/packages.ts"))};
      import { validateTrainingPackage } from ${JSON.stringify(path.join(projectDir, "src/package-validation.ts"))};
      const product = trainingPackages.find((entry) => entry.manifest.id === "pm-fundamentals");
      if (!product) throw new Error("Product Management package is missing");
      export { trainingPackages, validateTrainingPackage };
      export const modules = product.content.modules;
      export const sources = product.content.sources;
      export const practiceQuestions = product.content.practiceQuestions;
      export const diagnosticQuestions = product.content.diagnosticQuestions;
      export const flashcards = product.content.flashcards;
      export const toolkitTemplates = product.content.toolkitTemplates;
      export const supplementaryQuestions = product.content.supplementaryQuestions;
      export const divergences = product.content.divergences;
      export const glossary = product.content.glossary;
      export const caseStudies = product.content.caseStudies;
      export const slides = product.content.slides;
      export const SLIDE_COUNT = product.content.slideCount;
      export { spreadAcrossStages } from ${JSON.stringify(path.join(projectDir, "src/views-practice.tsx"))};
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

const packageContractErrors = bank.trainingPackages.flatMap(bank.validateTrainingPackage);
check(
  "Every catalogue entry satisfies the versioned package contract",
  packageContractErrors.length === 0,
  packageContractErrors.join(" | "),
);

/*
 * Government Gateway has six project reviews, numbered Gate 0 to Gate 5.
 * A previous content pass invented a Gate 6 and then assessed recall of it.
 * Test the packaged learner-facing data rather than comments or generated HTML.
 */
const packagedContent = JSON.stringify(bank.trainingPackages);
check(
  "No package teaches the non-existent Gateway Gate 6",
  !/Gate 6|Gate6/i.test(packagedContent),
);
const closurePackage = bank.trainingPackages.find((entry) => entry.manifest.id === "closure-reports");
const packagedQuestions = [];
const packagedQuestionKeys = new Set();
for (const entry of bank.trainingPackages) {
  for (const question of [
    ...entry.content.practiceQuestions,
    ...entry.content.diagnosticQuestions,
    ...entry.content.supplementaryQuestions,
  ]) {
    const key = `${entry.manifest.id}:${question.id}`;
    if (packagedQuestionKeys.has(key)) continue;
    packagedQuestionKeys.add(key);
    packagedQuestions.push({ ...question, packageId: entry.manifest.id });
  }
}
const gatewayGuide = closurePackage?.content.fieldGuide.find((entry) => entry.id === "gates");
check(
  "Gateway reference lists the six current project reviews",
  gatewayGuide?.items.length === 6 && gatewayGuide.items.at(-1)?.term.startsWith("Gate 5"),
  gatewayGuide?.items.map((item) => item.term).join(" | ") ?? "Gateway guide missing",
);
const numberedGatePrompts = closurePackage
  ? [
      ...closurePackage.content.practiceQuestions.map((item) => item.prompt),
      ...closurePackage.content.diagnosticQuestions.map((item) => item.prompt),
      ...closurePackage.content.supplementaryQuestions.map((item) => item.prompt),
      ...closurePackage.content.flashcards.map((item) => item.front),
    ].filter((text) => /\bGate [0-9]\b/i.test(text))
  : ["Closure package missing"];
check(
  "Gateway assessment tests purpose and application rather than gate-number recall",
  numberedGatePrompts.length === 0,
  numberedGatePrompts.join(" | "),
);

const productNumberedPrinciplePrompts = [
  ...bank.practiceQuestions.map((item) => item.prompt),
  ...bank.diagnosticQuestions.map((item) => item.prompt),
  ...bank.supplementaryQuestions.map((item) => item.prompt),
  ...bank.flashcards.map((item) => item.front),
].filter((text) => /\bPrinciple\s+[0-9]+\b|\bprinciple number\b/i.test(text));
check(
  "Product Management assessment uses named principles rather than number recall",
  productNumberedPrinciplePrompts.length === 0,
  productNumberedPrinciplePrompts.join(" | "),
);

const authoritySensitiveErrors = [
  /almost no benefit is realised until after closure/i,
  /benefits realisation cannot be a project activity/i,
  /starts warranties, releases retentions, closes the defects window/i,
  /annual performance statements, which are audited/i,
  /anyone may add; product management orders/i,
].filter((pattern) => pattern.test(packagedContent));
check(
  "Authority-sensitive corrections remain in the packaged courses",
  authoritySensitiveErrors.length === 0,
  authoritySensitiveErrors.map(String).join(" | "),
);

const closureSourceIds = new Set(closurePackage?.content.sources.map((source) => source.id) ?? []);
check(
  "Closure accounting teaching cites current Finance and accounting authority",
  closureSourceIds.has("rmg109") && closureSourceIds.has("aasb138"),
  [...closureSourceIds].join(", "),
);
check(
  "Product Management restores all three Ways of Working foundations",
  /three Ways of Working foundations[\s\S]*Behaviours[\s\S]*Digital Delivery Framework[\s\S]*Methods/i.test(packagedContent),
);

/* ---------------------------------------------------------------- *
 * Slide citation integrity
 *
 * The course cites the source deck constantly — "Deck slides 21-35" on every
 * stage, "Slide 33 - ..." on nineteen figures. Those citations were dead
 * pointers until the deck was imported. This asserts they stay live: every
 * number the course names must exist in the deck, and the stage ranges must
 * partition all 98 slides with no gap and no overlap.
 * ---------------------------------------------------------------- */

const slideNumbers = new Set(bank.slides.map((slide) => slide.n));
check(
  "Every deck slide is present",
  slideNumbers.size === bank.SLIDE_COUNT && bank.SLIDE_COUNT === 98,
  `${slideNumbers.size} slides, SLIDE_COUNT ${bank.SLIDE_COUNT}`,
);

const citedInCaptions = [];
for (const module of bank.modules) {
  for (const section of module.sections) {
    const caption = section.table?.caption;
    if (!caption) continue;
    const match = /^Slides?\s+(\d+)(?:\s*[\u2013\u2014-]\s*(\d+))?/.exec(caption);
    if (match) citedInCaptions.push([Number(match[1]), match[2] ? Number(match[2]) : null, caption]);
  }
}
check("Figure captions cite the deck", citedInCaptions.length >= 15, `${citedInCaptions.length} cited`);
const brokenCaptions = citedInCaptions.filter(
  ([first, last]) => !slideNumbers.has(first) || (last !== null && !slideNumbers.has(last)),
);
check(
  "Every figure citation resolves to a real slide",
  brokenCaptions.length === 0,
  brokenCaptions.map(([, , caption]) => caption).join(" | "),
);

const covered = new Set();
let rangeOverlap = false;
for (const module of bank.modules) {
  const [first, last] = module.slides.split(/[\u2013\u2014-]/).map((part) => Number(part.trim()));
  check(`Stage ${module.number} cites a valid slide range`, slideNumbers.has(first) && slideNumbers.has(last), module.slides);
  for (let n = first; n <= last; n += 1) {
    if (covered.has(n)) rangeOverlap = true;
    covered.add(n);
  }
}
check("Stage ranges cover the whole deck with no overlap", covered.size === bank.SLIDE_COUNT && !rangeOverlap,
  `${covered.size} of ${bank.SLIDE_COUNT} covered${rangeOverlap ? ", with overlap" : ""}`);
check(
  "Every slide is assigned to the stage whose range contains it",
  bank.slides.every((slide) => {
    const module = bank.modules.find((m) => m.id === slide.stage);
    if (!module) return false;
    const [first, last] = module.slides.split(/[\u2013\u2014-]/).map((part) => Number(part.trim()));
    return slide.n >= first && slide.n <= last;
  }),
);
// A title is either the slide\'s real heading or empty, never the fabricated
// "Slide 98" — that produced the alt text "Slide 98: Slide 98". Empty is only
// legitimate on a slide that genuinely has no words on it.
check(
  "No slide has a fabricated title",
  bank.slides.every((slide) => !/^Slide \d+$/.test(slide.title)),
  bank.slides.filter((s) => /^Slide \d+$/.test(s.title)).map((s) => s.n).join(", "),
);
check(
  "Only wordless slides lack a title",
  bank.slides.every((slide) => slide.title.length > 2 || slide.text === ""),
  bank.slides.filter((s) => !s.title && s.text).map((s) => s.n).join(", "),
);


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
/* ---------------------------------------------------------------- *
 * Per-package content coverage.
 *
 * Reference content is keyed by stage id inside its package and resolved by lookup, so a stage
 * with no flashcards, no glossary term or no diagnostic question renders an
 * empty section and reports nothing. The diagnostic is the sharpest case: it
 * draws one question per stage, so a stage absent from the pool is silently
 * excluded from the recommendation the learner is given.
 *
 * A module id that no stage owns is the mirror image — content that can never
 * be reached.
 * ---------------------------------------------------------------- */
{
  const gaps = [];
  const orphans = [];
  for (const entry of bank.trainingPackages) {
    const ids = entry.content.modules.map((m) => m.id);
    const sets = {
      "diagnostic questions": entry.content.diagnosticQuestions,
      flashcards: entry.content.flashcards,
      glossary: entry.content.glossary,
      contrasts: entry.content.contrasts,
      "supplementary questions": entry.content.supplementaryQuestions,
    };
    for (const [label, items] of Object.entries(sets)) {
      if (!items?.length) continue;
      const covered = new Set(items.map((i) => i.moduleId).filter(Boolean));
      if (!covered.size) continue;
      const missing = ids.filter((id) => !covered.has(id));
      const extra = [...covered].filter((id) => !ids.includes(id));
      if (missing.length) gaps.push(`${entry.manifest.id} ${label}: no ${missing.join(", ")}`);
      if (extra.length) orphans.push(`${entry.manifest.id} ${label}: ${extra.join(", ")}`);
    }
  }
  check(
    "Every stage of every package has reference content of each kind",
    gaps.length === 0,
    gaps.length ? gaps.join(" | ") : "diagnostic, cards, glossary, contrasts and supplements all complete",
  );
  check(
    "No reference content is keyed to a stage that does not exist",
    orphans.length === 0,
    orphans.length ? orphans.join(" | ") : "no orphaned module ids",
  );
}

/* ---------------------------------------------------------------- *
 * Mixed practice covers the curriculum.
 *
 * A flat shuffle over the bank can legitimately return ten questions from one
 * stage. Interleaving across topics is the property that makes mixed practice
 * worth more than re-reading, so the draw is round-robin over stages.
 * ---------------------------------------------------------------- */
{
  const worst = [];
  for (const entry of bank.trainingPackages) {
    const pool = entry.content.practiceQuestions;
    if (!pool?.length) continue;
    const stages = new Set(pool.map((q) => q.moduleId)).size;
    const want = Math.min(10, stages);
    let low = Infinity;
    for (let run = 0; run < 40; run += 1) {
      const set = bank.spreadAcrossStages(pool, 10);
      low = Math.min(low, new Set(set.map((q) => q.moduleId)).size);
    }
    if (low < want) worst.push(`${entry.manifest.id}: a set covered only ${low} of a possible ${want} stages`);
  }
  check(
    "A ten-question practice set always spans as many stages as it can",
    worst.length === 0,
    worst.length ? worst.join(" | ") : "40 draws per package, every one fully spread",
  );
}

const malformedOptions = packagedQuestions.filter((q) => q.options.length !== 4);
check(
  "Every question in every package has four options",
  malformedOptions.length === 0,
  malformedOptions.map((q) => `${q.packageId}:${q.id}`).join(", "),
);
const misalignedNotes = packagedQuestions.filter(
  (q) => q.optionNotes && (q.optionNotes.length !== q.options.length || q.optionNotes[q.answer] !== ""),
);
check(
  "Every optionNotes array in every package aligns with its options",
  misalignedNotes.length === 0,
  misalignedNotes.map((q) => `${q.packageId}:${q.id}`).join(", "),
);
/*
 * Option-LENGTH bias.
 *
 * Answer POSITION was fixed earlier with per-learner shuffling, and proved
 * statistically. That did nothing about length: the longest option is longest
 * wherever it sits. A review of the bank found the key was the longest option
 * in 129 of 158 questions, so "always click the longest answer" scored 81.6%
 * against a 75% mastery threshold — the whole course could be passed without
 * reading a word.
 *
 * "Dissimilar length of options" is a named item-writing flaw (Haladyna et
 * al.); options should be of approximately equal length so the set carries no
 * information the learner could use instead of knowing the answer.
 */
{
  // practiceQuestions already contains the supplementary set and the scenarios,
  // so a naive concat counts 36 questions twice and skews every ratio below.
  const bankAll = [];
  const seenIds = new Set();
  for (const q of [...bank.practiceQuestions, ...bank.diagnosticQuestions, ...bank.supplementaryQuestions]) {
    if (seenIds.has(q.id)) continue;
    seenIds.add(q.id);
    bankAll.push(q);
  }
  const longestWins = bankAll.filter((q) => {
    const lengths = q.options.map((o) => o.length);
    return lengths.indexOf(Math.max(...lengths)) === q.answer;
  }).length;
  const longestScore = (longestWins / bankAll.length) * 100;
  const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
  const keyMean = mean(bankAll.map((q) => q.options[q.answer].length));
  const distractorMean = mean(bankAll.flatMap((q) => q.options.filter((_, i) => i !== q.answer).map((o) => o.length)));

  check(
    "Longest-option strategy scores near chance",
    longestScore <= 40,
    `scores ${longestScore.toFixed(1)}% (${longestWins}/${bankAll.length}); chance is 25%, mastery threshold is 75%`,
  );
  check(
    "Correct answers are not systematically longer than distractors",
    keyMean / distractorMean <= 1.25,
    `key ${keyMean.toFixed(1)} chars vs distractor ${distractorMean.toFixed(1)} chars = ${(keyMean / distractorMean).toFixed(2)}x`,
  );
  const lopsided = bankAll.filter((q) => {
    const lengths = q.options.map((o) => o.length);
    return Math.max(...lengths) / Math.max(1, Math.min(...lengths)) > 3;
  });
  check(
    "No question has an option more than 3x the length of its shortest",
    lopsided.length === 0,
    `${lopsided.length} question(s), e.g. "${lopsided[0]?.prompt.slice(0, 60) ?? ""}"`,
  );
}

{
  // Thirty diagnostic items carried a rationale but no per-option note, so a
  // learner who chose wrongly was told the right answer and never why theirs
  // was wrong — which is where most of this course's teaching happens.
  const incomplete = packagedQuestions.filter((q) => {
    const notes = q.optionNotes ?? [];
    return q.options.some((_, i) => i !== q.answer && !String(notes[i] ?? "").trim());
  });
  check(
    "Every question explains every wrong option",
    incomplete.length === 0,
    `${incomplete.length} question(s) missing distractor feedback: ${incomplete.slice(0, 5).map((q) => `${q.packageId}:${q.id}`).join(", ")}`,
  );
  const keyNoted = packagedQuestions.filter((q) => String((q.optionNotes ?? [])[q.answer] ?? "").trim());
  check(
    "The correct option carries no note",
    keyNoted.length === 0,
    `${keyNoted.length} question(s) annotate the key, which would give it away`,
  );
}

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
/*
 * Teaching volume.
 *
 * The review measured 5,852 words of lesson prose against 15,971 words of
 * questions and feedback — the course tested 2.7x more than it taught, and
 * sections of 24-72 words state conclusions without deriving them. Each stage
 * now carries a worked-reasoning passage showing a decision made badly and
 * then well.
 */
{
  const words = (text) => String(text ?? "").trim().split(/\s+/).filter(Boolean).length;
  const withReasoning = bank.modules.filter((module) =>
    module.sections.some((section) => /^Worked reasoning:/.test(section.heading)),
  );
  check(
    "Every stage carries a worked-reasoning passage",
    withReasoning.length === 9,
    `${withReasoning.length} of 9`,
  );
  const shortPassages = bank.modules.flatMap((module) =>
    module.sections.filter((s) => /^Worked reasoning:/.test(s.heading) && words(s.body) < 150),
  );
  check(
    "Worked reasoning actually derives the reasoning",
    shortPassages.length === 0,
    `${shortPassages.length} passage(s) under 150 words — a summary, not a derivation`,
  );
  const lessonWords = bank.modules.reduce((total, module) => {
    let n = words(module.outcome) + words(module.coreIdea);
    for (const section of module.sections) {
      n += words(section.heading) + words(section.body) + words(section.example);
      for (const bullet of section.bullets ?? []) n += words(bullet);
      if (section.table) {
        for (const head of section.table.head) n += words(head);
        for (const row of section.table.rows) for (const cell of row) n += words(cell);
      }
    }
    return total + n;
  }, 0);
  check("Lesson prose is substantial", lessonWords >= 8000, `${lessonWords} words`);
  const thinnest = Math.min(...bank.modules.map((m) => m.sections.reduce((n, s) => n + words(s.body), 0)));
  check("No stage is a stub", thinnest >= 300, `thinnest stage has ${thinnest} body words`);

  // The minutes are derived now, so they cannot drift from the content.
  check(
    "Stage length is derived, not declared",
    bank.modules.every((m) => m.minutes % 5 === 0 && m.minutes >= 5),
    bank.modules.map((m) => m.minutes).join(", "),
  );
}

/*
 * The course never refers to its own past.
 *
 * A divergence entry read "An earlier draft of this course compressed where
 * and when into 'context'. That was a mistake..." — development history
 * leaking into learner-facing copy. A learner is reading the course, not its
 * changelog: the current version IS the course, and referring to earlier ones
 * makes it read like a draft rather than a finished thing.
 *
 * This scans every learner-visible string in the content files. Code comments
 * are exempt and should keep explaining why decisions were made; the rule is
 * about what a reader sees.
 */
{
  const selfReferential = [
    /earlier (draft|version|release)s? of th(is|e) course/i,
    /previous(ly)? (version|draft)s? of th(is|e) course/i,
    /th(is|e) course (previously|used to|no longer|now includes)/i,
    /an earlier draft/i,
    /in (a|the) (previous|earlier) (version|release|draft)/i,
    /(we|this) (have )?(since )?(added|changed|removed|revised|corrected) (it|this|that)/i,
  ];
  const strings = [];
  for (const module of bank.modules) {
    strings.push(module.outcome, module.coreIdea, module.subtitle);
    for (const section of module.sections) {
      strings.push(section.heading, section.body, section.example ?? "", ...(section.bullets ?? []));
      if (section.table) strings.push(section.table.caption ?? "", ...section.table.rows.flat());
    }
    for (const q of [...module.questions, ...module.scenarios]) {
      strings.push(q.prompt, q.rationale ?? "", ...q.options, ...(q.optionNotes ?? []));
    }
  }
  for (const source of bank.sources) strings.push(source.note, source.title);
  for (const item of bank.divergences) strings.push(item.deck, item.here, item.why, item.topic);
  for (const card of bank.flashcards) strings.push(card.front, card.back);
  for (const entry of bank.glossary) strings.push(entry.definition);

  const offenders = [];
  for (const text of strings) {
    for (const pattern of selfReferential) {
      if (pattern.test(String(text ?? ""))) {
        offenders.push(String(text).slice(0, 90));
        break;
      }
    }
  }
  check(
    "The course never refers to its own earlier versions",
    offenders.length === 0,
    offenders.join(" | "),
  );
}

{
  const caseStages = new Set(bank.caseStudies.flatMap((c) => c.steps.map((s) => s.stage)));
  check(
    "The case set exercises every stage",
    caseStages.size === 9,
    `covers stages ${[...caseStages].sort((a, b) => a - b).join(", ")}`,
  );
  const shortSteps = bank.caseStudies.flatMap((c) => c.steps).filter((s) => s.body.trim().split(/\s+/).length < 40);
  check(
    "Case steps are substantial",
    shortSteps.length === 0,
    `${shortSteps.length} step(s) under 40 words`,
  );
  const everyStepDecides = bank.caseStudies.every((c) => c.steps.every((s) => s.decision && s.decision.trim()));
  check("Every case step carries a decision in the data", everyStepDecides);
}

{
  const withModel = bank.modules.filter((m) => m.assignment.modelAnswer && m.assignment.modelAnswer.trim());
  check("Every stage assignment has a worked answer", withModel.length === 9, `${withModel.length} of 9`);
  const withCriteria = bank.modules.filter((m) => (m.assignment.criteria ?? []).length >= 3);
  check("Every worked answer has self-check criteria", withCriteria.length === 9, `${withCriteria.length} of 9`);
  const thinModels = bank.modules.filter(
    (m) => (m.assignment.modelAnswer ?? "").trim().split(/\s+/).length < 100,
  );
  check("Worked answers are substantial", thinModels.length === 0, `${thinModels.length} under 100 words`);
}

{
  // One document listed twice is one source, not two. The Digital Service
  // Standard had a web entry and a PDF entry whose note explained which PDF
  // superseded which — version housekeeping in a learner-facing list.
  const titles = bank.sources.map((s) => s.title.toLowerCase().replace(/\s*\(pdf\)\s*/g, "").trim());
  check(
    "No source is listed twice in different formats",
    new Set(titles).size === titles.length,
    titles.filter((t, i) => titles.indexOf(t) !== i).join(", "),
  );
  const versionChatter = bank.sources.filter((s) => /supersedes .*that earlier|earlier versions of this course/i.test(s.note));
  check("Source notes carry no version housekeeping", versionChatter.length === 0);
}

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

  /*
   * The two builds carry the deck differently on purpose. Standalone must be
   * ONE file, so its slides are inlined. Pages must stay small on a phone, so
   * its slides are separate files fetched on demand. Assert both, because
   * getting it backwards is invisible until someone is on mobile data or has
   * emailed the file to a colleague.
   */
  const standaloneHtml = await readFile(artifactPath, "utf8");
  check(
    "Standalone inlines every slide",
    (standaloneHtml.match(/data:image\/webp;base64,/g) ?? []).length === 98,
    `${(standaloneHtml.match(/data:image\/webp;base64,/g) ?? []).length} inlined`,
  );
  const pagesHtml = await readFile(path.join(docsDir, "index.html"), "utf8");
  check(
    "Pages build does NOT inline slides",
    !pagesHtml.includes("data:image/webp;base64,"),
    "inlining them would push a multi-megabyte page to every phone",
  );
  /*
    Per package, not absolute — and every package ships in the bundle, by
    design.

    An earlier version of this comment called per-package code splitting "the
    real fix". That was wrong, and worth correcting rather than quietly
    deleting. Text is cheap: two full courses are about 910 KB, so ten would
    be a few megabytes, fetched once and then served from the service worker
    cache. The standalone build is already 4.2 MB because of the slides, and
    nobody has ever complained about that. Splitting would buy a first-load
    saving measured in a second or two on a slow connection, and cost the
    single-file property that is the entire reason the standalone build
    exists, plus a loading state on every package switch.

    So: ship everything, browse the whole library offline, switch instantly.
    What this check is for is catching genuine bloat — an accidentally
    inlined asset, a duplicated dependency, a package that dwarfs the others.
    Base covers the shell, React and the styles; the allowance covers one
    course's prose, questions and reference material.

    Slides stay out of the Pages build, which is the split that actually
    matters: they are megabytes of images rather than kilobytes of text.
  */
  /*
    Budgeted per STAGE, not per package.

    It was per package, at a flat allowance each, which assumed packages are
    roughly the same size. They are not: one course has nine stages and the
    other twelve, so adding stages of legitimate prose to one package
    failed a budget that had no way to know the package had grown. A budget
    that fails on ordinary content and has to be raised each time is the
    fixed-ceiling problem in a different costume.

    A stage is the unit that carries the bytes, so the budget follows it —
    and it falls again when stages are retired. The allowance is generous
    against the ~24 KB a stage actually costs, because this check is not a
    diet. It is here to catch an accidentally inlined image or a duplicated
    dependency, both of which arrive in hundreds of kilobytes.
  */
  const packageCount = (standaloneHtml.match(/"status":\s*"(available|in-development)"/g) ?? []).length || 2;
  const stageCountAll = (standaloneHtml.match(/"coreIdea":/g) ?? []).length || 20;
  // Allow 31 KB per stage: the authority notes and worked explanations added
  // in the subject-matter audit took the measured bundle just above 30 KB per
  // stage after the shared shell. This still catches asset/dependency bloat.
  const budgetKb = 500 + 31 * stageCountAll;
  const pagesKb = Buffer.byteLength(pagesHtml, "utf8") / 1024;
  check(
    "Pages build stays small for the content it carries",
    pagesKb < budgetKb,
    `${pagesKb.toFixed(0)} KB against ${budgetKb} KB for ${stageCountAll} stages across ${packageCount} packages`,
  );
  check(
    "All 98 slide images ship with the Pages build",
    Array.from({ length: 98 }, (_, i) => `slide-${String(i + 1).padStart(2, "0")}.webp`)
      .every((name) => existsSync(path.join(docsDir, "courses", "pm-fundamentals", "slides", name))),
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
await page.getByRole("heading", { name: "Product Management Fundamentals" }).waitFor();


/* -- home page and sidebar structure ------------------------------- */

/*
 * The home page opened on a tagline and never said what the training was,
 * and the nav item was called "Today" for a page that is not a daily view.
 */
const heroHeading = (await page.locator(".hero h1").innerText()).trim();
check("Home page names the training", heroHeading === "Product Management Fundamentals", heroHeading);
check(
  "Home page states what the course covers before what to do next",
  (await page.locator(".hero-lead").innerText()).length > 120,
);
const heroFacts = await page.locator(".hero-facts li strong").allInnerTexts();
check("Home page carries the course facts", heroFacts.length === 4, heroFacts.join(" | "));
// Counted independently of the app so the two can disagree. allQuestions
// already folds in the diagnostic pool, so build this from the parts.
const bankTotal =
  bank.modules.reduce((n, m) => n + m.questions.length + m.scenarios.length, 0) +
  bank.supplementaryQuestions.length +
  bank.diagnosticQuestions.length;
check(
  "Stated question count matches the bank",
  heroFacts.some((fact) => fact.startsWith(String(bankTotal))),
  `hero says ${heroFacts.join(" | ")}, bank holds ${bankTotal}`,
);
check(
  "First-time visitor is told where to start",
  (await page.locator(".hero .button-row .primary").innerText()).includes("Start Stage 1"),
);

// Grouped nav. The flat list overflowed every laptop viewport.
const groupLabels = await page.locator(".nav-section-header span").allInnerTexts();
const normalisedGroups = groupLabels.map((label) => label.toLowerCase());
check(
  "Sidebar is grouped by activity",
  ["study", "practise", "apply", "reference"].every((label) => normalisedGroups.includes(label)),
  groupLabels.join(" | "),
);
/*
 * Every group starts open. Collapsing Apply and Reference by default hid
 * "Read the guide" well enough that the person who asked for the guide could
 * not find it. Nothing in the sidebar may start hidden.
 */
check(
  "No navigation group starts collapsed",
  (await page.locator('.nav-section-header[aria-expanded="false"]').count()) === 0,
);
const visibleDestinations = await page.locator(".sidebar .nav-section nav button").count();
check(
  "Every destination is present in the sidebar on arrival",
  visibleDestinations === 23,
  `${visibleDestinations} of 23 (14 destinations + 9 stages)`,
);
check(
  "The complete guide is reachable from the sidebar without opening anything",
  (await page.getByRole("button", { name: "Read the whole course", exact: true }).count()) === 1,
);
/*
  The reading material must come before the assessment of it. The sidebar used
  to run Learn / Practise / Apply / Reference with the stages last, so the
  substance sat below four groups of activities. Assert the order rather than
  trusting it: Study, then the stages, then everything that tests or supports
  them.
*/
{
  const order = await page.evaluate(() =>
    [...document.querySelectorAll(".sidebar .nav-section")].map(
      (el) => el.querySelector(".nav-section-header span")?.textContent?.trim() ?? "",
    ),
  );
  check(
    "Study and the stages come before Practise in the sidebar",
    order[0] === "Study" && /^The .+ stages$/.test(order[1] ?? "") && order[2] === "Practise",
    order.join(" / "),
  );
  check(
    "Overview is a standalone item above the groups",
    (await page.locator(".sidebar .nav-standalone").count()) === 1,
  );
  check(
    "The diagnostic is reachable from the sidebar",
    (await page.getByRole("button", { name: "Diagnostic", exact: true }).count()) === 1,
  );
  /*
    Every stage needs a diagram. The second package shipped with none at all,
    because illustrations are keyed by package id plus stage id and a missing key renders
    nothing rather than failing — so twelve stages of dense prose opened with
    a heading and a wall of text.
  */
  const stageCount = await page.locator(".sidebar-modules nav button").count();
  const noIllustration = [];
  for (let i = 0; i < stageCount; i += 1) {
    await page.evaluate(() => { window.location.hash = "path"; });
    await page.waitForTimeout(80);
    await page.locator(".sidebar-modules nav button").nth(i).click();
    await page.waitForTimeout(180);
    if (!(await page.locator("#main-content svg.illus").count())) {
      noIllustration.push(await page.locator("#main-content h1").innerText());
    }
  }
  /*
    The worked documents are written to the departmental templates, so they are
    checked against those: the full template's front matter and its numbered
    sections, and the Tier 3 form's blocks. Each item below is something the
    form asks for by name and that a plausible-looking report can omit.

    Runs on the package that HAS worked documents — a package without them
    renders an empty state, and a check reading that would report every
    requirement missing.
  */
  {
    const ex = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const exPage = await ex.newPage();
    watchPage(exPage, "worked-example");
    await exPage.addInitScript(() =>
      localStorage.setItem("product-practice-v2:active-package", JSON.stringify("closure-reports")),
    );
    await exPage.goto(artifactUrl, { waitUntil: "load" });
    await exPage.evaluate(() => { window.location.hash = "example"; });
    await exPage.waitForSelector(".exemplar-doc");

    const tabs = await exPage.locator(".case-switch button").count();
    check("Both departmental forms are shown as worked documents", tabs === 2, `${tabs} document(s)`);

    /* Document 1 — the full template. */
    const full = (await exPage.locator(".exemplar-doc").innerText()).toLowerCase();
    const fullNeeds = [
      ["document control", /document control/],
      ["key project contacts", /key project contacts/],
      ["the five approval assertions", /resources assigned to the project can be released/],
      ["OPEX and CAPEX", /opex/, /capex/],
      ["asset management with both owners", /business owner/, /it owner/],
      ["a lessons category with both columns", /areas to improve/],
      ["Closing the Gap", /closing the gap/],
      ["the lessons register", /lessons learned register/],
      ["tolerance reporting", /tolerance/],
      ["RiskNet2 or the risk plan", /risknet2|risk management plan/],
    ];
    const fullMissing = fullNeeds
      .filter(([, ...res]) => !res.every((re) => re.test(full)))
      .map(([label]) => label);
    check(
      "The full-template worked report carries what the template asks for",
      fullMissing.length === 0,
      fullMissing.length ? `missing: ${fullMissing.join(", ")}` : `all ${fullNeeds.length} present`,
    );

    /*
      Cross-references name NUMBERED sections. Front matter is unnumbered, so
      the ceiling is the count of headings that begin with a number, not the
      count of rendered blocks.
    */
    const numbered = await exPage.$$eval(".exemplar-section h3", (hs) =>
      hs.map((h) => Number((h.textContent || "").match(/^(\d+)\./)?.[1])).filter(Boolean));
    const top = numbered.length ? Math.max(...numbered) : 0;
    const refs = [...full.matchAll(/sections? (\d+)(?:[, ]+(?:and )?(\d+))?(?:[, ]+(?:and )?(\d+))?/g)]
      .flatMap((m) => [m[1], m[2], m[3]])
      .filter(Boolean)
      .map(Number);
    check(
      "Cross-references in the worked report point at sections that exist",
      top > 0 && refs.every((n) => n >= 1 && n <= top),
      `numbered 1–${top}, refs ${[...new Set(refs)].sort((a, b) => a - b).join(",") || "none"}`,
    );

    /* Document 2 — the Tier 3 form. */
    if (tabs > 1) {
      await exPage.locator(".case-switch button").nth(1).click();
      await exPage.waitForTimeout(400);
      const t3 = (await exPage.locator(".exemplar-doc").innerText()).toLowerCase();
      const t3Needs = [
        ["an overall delivery status", /achieved|partially achieved|not achieved/],
        ["the assessment grid", /project closure assessment|assessment area/],
        ["a fixed schedule rating", /on time|minor delay|significant delay/],
        ["evidence of BAU acceptance", /evidence and status of acceptance|accepted at|accepted by/],
        ["ASL", /asl/],
        ["the RiskNet2 plan id", /risknet2|plan id/],
        ["approval by email accepted", /approval by email|attached/],
      ];
      const t3Missing = t3Needs.filter(([, re]) => !re.test(t3)).map(([label]) => label);
      check(
        "The Tier 3 worked report carries what the form asks for",
        t3Missing.length === 0,
        t3Missing.length ? `missing: ${t3Missing.join(", ")}` : `all ${t3Needs.length} present`,
      );
    }
    await ex.close();
  }
  /*
    Measure and overflow across the responsive range, not just the test
    viewport. The container now grows on wide screens, and the two bands where
    multi-column layouts collapse (roughly 700-1100px) are exactly where a
    capped column stops capping. Both faults found here were invisible at
    1440px: commentary running to 117 characters a line, and a fixed-width
    <pre> forcing a grid track to 712px inside a 356px phone.
  */
  {
    const resp = await browser.newContext({ viewport: { width: 1100, height: 900 } });
    const rp = await resp.newPage();
    watchPage(rp, "responsive");
    await rp.addInitScript(() =>
      localStorage.setItem("product-practice-v2:active-package", JSON.stringify("closure-reports")),
    );
    await rp.goto(artifactUrl, { waitUntil: "load" });
    const views = ["dashboard", "cases", "toolkit", "guide", "example", "module/purpose"];
    let worst = 0;
    const overflowed = [];
    for (const width of [390, 768, 1100, 1440, 1920]) {
      await rp.setViewportSize({ width, height: 900 });
      for (const v of views) {
        await rp.evaluate((h) => { window.location.hash = h; }, v);
        await rp.waitForTimeout(140);
        const r = await rp.evaluate(() => {
          const ctx = document.createElement("canvas").getContext("2d");
          let m = 0;
          document.querySelectorAll("#main-content p, #main-content li").forEach((el) => {
            const text = el.textContent.trim();
            if (text.length < 150 || el.children.length) return;
            const s = getComputedStyle(el);
            ctx.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
            m = Math.max(m, Math.round(el.getBoundingClientRect().width / (ctx.measureText(text).width / text.length)));
          });
          const d = document.documentElement;
          return { m, ov: d.scrollWidth > d.clientWidth + 1 };
        });
        worst = Math.max(worst, r.m);
        if (r.ov) overflowed.push(`${width}/${v}`);
      }
    }
    check("Line length stays under 80 characters at every width", worst <= 80, `worst ${worst}ch`);
    check(
      "No horizontal overflow at any width",
      overflowed.length === 0,
      overflowed.length ? overflowed.join(", ") : "390 to 1920",
    );
    await resp.close();
  }
  /*
    Motion, and its off switch. The stylesheet had no animation at all, which
    is why the site read flat beside anything else in the category. Adding it
    creates an obligation: anyone who asks their OS for reduced motion must get
    none of it, and progress feedback must not become the only way to know
    where you are.
  */
  {
    const still = await browser.newContext({ viewport: { width: 1600, height: 1000 }, reducedMotion: "reduce" });
    const sp = await still.newPage();
    watchPage(sp, "reduced-motion");
    await sp.addInitScript(() =>
      localStorage.setItem("product-practice-v2:active-package", JSON.stringify("closure-reports")),
    );
    await sp.goto(artifactUrl, { waitUntil: "load" });
    await sp.evaluate(() => { window.location.hash = "module/purpose"; });
    await sp.waitForSelector(".lesson-section");
    await sp.waitForTimeout(200);
    const animating = await sp.evaluate(() =>
      [".page", ".lesson-section", ".module-index"]
        .map((sel) => {
          const el = document.querySelector(sel);
          return el && getComputedStyle(el).animationName !== "none" ? sel : null;
        })
        .filter(Boolean),
    );
    check(
      "Reduced motion switches every animation off",
      animating.length === 0,
      animating.length ? `still animating: ${animating.join(", ")}` : "page, sections and stage index all still",
    );
    await still.close();

    const moving = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
    const mp = await moving.newPage();
    watchPage(mp, "motion");
    await mp.addInitScript(() =>
      localStorage.setItem("product-practice-v2:active-package", JSON.stringify("closure-reports")),
    );
    await mp.goto(artifactUrl, { waitUntil: "load" });
    await mp.evaluate(() => { window.location.hash = "module/purpose"; });
    await mp.waitForSelector(".lesson-section");
    const named = await mp.evaluate(
      () => getComputedStyle(document.querySelector(".lesson-section")).animationName,
    );
    check("Lesson sections animate in by default", named !== "none", named);
    check(
      "The stage states its shape before you start it",
      (await mp.locator(".stage-shape li").count()) >= 3,
      `${await mp.locator(".stage-shape li").count()} facts`,
    );
    check(
      "A long stage shows reading progress",
      (await mp.locator(".reading-progress").count()) === 1,
    );
    await moving.close();
  }
  /*
    Target size, across views rather than on one screen. WCAG 2.2 SC 2.5.8 sets
    24x24 as the minimum. Three separate lists were shipping at 16-18px tall —
    the in-stage contents, the guide contents, and the "open primary source"
    links — all wide enough to look fine and all too short. None showed up
    until the check walked more than one view.

    Own context, and both packages. The first version of this ran on the shared
    page, which by this point has been clicked through dozens of checks, and it
    reported a phantom failure from leftover state. Native inputs are excluded
    deliberately: the answer options use a visually-hidden radio behind a large
    styled label, and the label is the target.
  */
  {
    const tapViews = ["dashboard", "path", "cases", "toolkit", "guide", "glossary", "sources", "capstone", "results"];
    const small = [];
    for (const pkg of ["pm-fundamentals", "closure-reports"]) {
      for (const width of [390, 1440]) {
        const tap = await browser.newContext({ viewport: { width, height: 900 } });
        const tp = await tap.newPage();
        watchPage(tp, `targets-${pkg}-${width}`);
        await tp.addInitScript(
          (k) => localStorage.setItem("product-practice-v2:active-package", JSON.stringify(k)),
          pkg,
        );
        await tp.goto(artifactUrl, { waitUntil: "load" });
        for (const v of tapViews) {
          await tp.evaluate((h) => { window.location.hash = h; }, v);
          /*
            Wait for the entrance animations to settle before measuring.
            getBoundingClientRect returns the VISUAL box, so an element part way
            through pp-pop (which scales from 0.82) measures ~82% of its resting
            size — enough to put a 24px control under the threshold and produce
            a failure that vanishes the moment you look for it by hand.
          */
          await tp.evaluate(
            () =>
              Promise.race([
                Promise.allSettled(document.getAnimations().map((a) => a.finished)),
                new Promise((r) => setTimeout(r, 1200)),
              ]),
          );
          await tp.waitForTimeout(60);
          const n = await tp.evaluate(() =>
            [...document.querySelectorAll("button, a[href]")].filter((el) => {
              const r = el.getBoundingClientRect();
              return r.width && (r.height < 24 || r.width < 24);
            }).length,
          );
          if (n) small.push(`${pkg}@${width}/${v}:${n}`);
        }
        await tap.close();
      }
    }
    check(
      "No interactive target under 24px, at phone and desktop width",
      small.length === 0,
      small.length ? small.join(", ") : `${tapViews.length} views, 2 packages, 2 widths`,
    );
  }
  /*
    Contrast across EVERY stage page, not one sample. Brightening the palette
    put 388 elements below AA at once and a later pass left 137 more, because
    each stage carries its own hue and the suite only ever opened one of them.
    A palette with twelve hues needs twelve checks.
  */
  {
    const hues = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const hp = await hues.newPage();
    watchPage(hp, "stage-hues");
    await hp.addInitScript(() =>
      localStorage.setItem("product-practice-v2:active-package", JSON.stringify("closure-reports")),
    );
    await hp.goto(artifactUrl, { waitUntil: "load" });
    await hp.waitForSelector(".sidebar-modules nav button");
    const stageTotal = await hp.locator(".sidebar-modules nav button").count();
    let worstRatio = 21;
    let worstWhere = "";
    for (let i = 0; i < stageTotal; i += 1) {
      await hp.evaluate(() => { window.location.hash = "path"; });
      await hp.waitForTimeout(80);
      await hp.locator(".sidebar-modules nav button").nth(i).click();
      await hp.waitForTimeout(260);
      const r = await hp.evaluate(() => {
        const lum = (c) => {
          const m = c.match(/\d+/g);
          if (!m) return null;
          const [r, g, b] = m.slice(0, 3).map(Number);
          const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
          return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        const behind = (el) => {
          let n = el;
          while (n) {
            const bg = getComputedStyle(n).backgroundColor;
            if (bg && !bg.includes("rgba(0, 0, 0, 0)")) return bg;
            n = n.parentElement;
          }
          return getComputedStyle(document.body).backgroundColor;
        };
        let worst = 21;
        document
          .querySelectorAll(".section-count, .outcome-box strong, .module-index, .stage-shape li, .path-meta span")
          .forEach((el) => {
            const a = lum(getComputedStyle(el).color);
            const b = lum(behind(el));
            if (a === null || b === null) return;
            const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
            if (ratio < worst) worst = ratio;
          });
        return { worst: +worst.toFixed(2), title: document.querySelector("#main-content h1")?.innerText ?? "" };
      });
      if (r.worst < worstRatio) { worstRatio = r.worst; worstWhere = r.title; }
    }
    check(
      "Every stage hue keeps its own page above AA",
      worstRatio >= 4.5,
      `${stageTotal} stages, worst ${worstRatio}:1${worstRatio < 4.5 ? ` on ${worstWhere}` : ""}`,
    );
    await hues.close();
  }
  /*
    Boxes proportionate to what they hold.

    This has been wrong in both directions in one session. First a block of
    measure rules capped whole PANELS at ~620px inside a 794px column, so they
    read as narrow. Releasing them produced the opposite fault: a 1268px box
    around a 500px column of text, which looks worse than the narrow version.

    The invariant is neither "narrow" nor "full width". It is:
      - a container that holds structure (a case step, a library card) fills
        its column;
      - a callout that holds only prose is close to the width of that prose.
    Both are asserted here.
  */
  {
    const fit = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
    const fp = await fit.newPage();
    watchPage(fp, "panel-fit");
    await fp.addInitScript(() =>
      localStorage.setItem("product-practice-v2:active-package", JSON.stringify("closure-reports")),
    );
    await fp.goto(artifactUrl, { waitUntil: "load" });
    const problems = [];
    for (const v of ["cases", "sources", "module/purpose", "capstone", "library", "example", "guide"]) {
      await fp.evaluate((h) => { window.location.hash = h; }, v);
      await fp.waitForTimeout(260);
      const r = await fp.evaluate(() => {
        const page = document.querySelector("#main-content .page");
        if (!page) return [];
        const column =
          document.querySelector(".lesson-sections")?.getBoundingClientRect().width ??
          page.getBoundingClientRect().width;
        const out = [];

        /*
          Structural containers should fill the track they sit in — the track,
          not the page. The library cards are a two-column grid, so 509px of
          1268px is correct and the first version of this check called it a
          fault.
        */
        ["case-steps", "library-grid"].forEach((parentClass) => {
          const parent = document.querySelector(`.${parentClass}`);
          const el = parent?.firstElementChild;
          if (!parent || !el) return;
          const cols = getComputedStyle(parent).gridTemplateColumns.split(" ").filter(Boolean).length || 1;
          const track = parent.getBoundingClientRect().width / cols;
          const w = el.getBoundingClientRect().width;
          if (w < track * 0.85) {
            out.push(`${parentClass} item squeezed ${Math.round(w)} in a ${Math.round(track)} track`);
          }
        });

        // Prose-only callouts should be close to the width of their prose.
        document.querySelectorAll("#main-content div, #main-content aside, #main-content blockquote").forEach((el) => {
          const s = getComputedStyle(el);
          const surface =
            (s.backgroundColor && !s.backgroundColor.includes("rgba(0, 0, 0, 0)")) ||
            parseFloat(s.borderLeftWidth) > 0;
          if (!surface) return;
          const box = el.getBoundingClientRect();
          if (box.width < 300) return;
          let text = 0;
          let structural = false;
          el.querySelectorAll("table, .lesson-table-wrap, pre, img, svg, button").forEach(() => { structural = true; });
          el.querySelectorAll("p, li, label").forEach((n) => {
            if (n.textContent.trim().length > 60) text = Math.max(text, n.getBoundingClientRect().width);
          });
          if (!text || structural) return;
          if (box.width / text > 1.45) {
            out.push(`${(el.className || "").toString().split(" ")[0]} box ${Math.round(box.width)} around ${Math.round(text)} of text`);
          }
        });
        return [...new Set(out)];
      });
      r.forEach((x) => problems.push(`${v}: ${x}`));
    }
    check(
      "Boxes are proportionate to what they hold",
      problems.length === 0,
      problems.length ? problems.slice(0, 4).join(", ") : "7 views, containers and callouts",
    );
    await fit.close();
  }
  /*
    Backup filenames and the reset choice.

    Every backup was `product-practice-backup-<date>.json` regardless of which
    course it came from, so two taken on the same day became "(1)" and "(2)" in
    the downloads folder with nothing to tell them apart. And a backup before
    reset was compulsory, which is the wrong default for someone who has just
    decided the data is not worth keeping.
  */
  {
    const back = await browser.newContext({ viewport: { width: 1200, height: 1000 }, acceptDownloads: true });
    const bp = await back.newPage();
    watchPage(bp, "backup");
    await bp.addInitScript(() =>
      localStorage.setItem("product-practice-v2:active-package", JSON.stringify("closure-reports")),
    );
    await bp.goto(artifactUrl, { waitUntil: "load" });
    await bp.evaluate(() => { window.location.hash = "settings"; });
    await bp.waitForSelector(".reset-option input");

    const [manual] = await Promise.all([
      bp.waitForEvent("download"),
      bp.getByRole("button", { name: "Download backup" }).click(),
    ]);
    const name = manual.suggestedFilename();
    check(
      "Backup filename carries the package, date and time",
      /^pp-closure-reports-\d{4}-\d{2}-\d{2}-\d{4}\.json$/.test(name),
      name,
    );

    check(
      "Backing up before a reset is on by default",
      await bp.locator(".reset-option input").isChecked(),
    );

    bp.once("dialog", (d) => d.accept());
    const [onReset] = await Promise.all([
      bp.waitForEvent("download"),
      bp.locator(".danger-button").click(),
    ]);
    check(
      "A reset with the box ticked downloads a before-reset backup",
      /-before-reset\.json$/.test(onReset.suggestedFilename()),
      onReset.suggestedFilename(),
    );

    await bp.waitForTimeout(900);
    await bp.evaluate(() => { window.location.hash = "settings"; });
    await bp.waitForSelector(".reset-option input");
    await bp.locator(".reset-option input").uncheck();
    let downloaded = false;
    bp.once("download", () => { downloaded = true; });
    let warned = "";
    bp.once("dialog", (d) => { warned = d.message(); d.accept(); });
    await bp.locator(".danger-button").click();
    await bp.waitForTimeout(1100);
    check("A reset with the box cleared downloads nothing", downloaded === false);
    check(
      "Clearing the box warns that nothing will be saved",
      /NO backup/i.test(warned),
      warned.split("\n").filter(Boolean).slice(-2)[0] ?? "",
    );
    await back.close();
  }
  check(
    "Every stage opens with an illustration",
    noIllustration.length === 0,
    noIllustration.length ? noIllustration.join(", ") : `all ${stageCount} stages`,
  );
  await page.evaluate(() => { window.location.hash = "dashboard"; });
  await page.waitForTimeout(150);
}
/*
 * The real requirement is not that the whole sidebar fits — the nine-stage
 * list is a long list and long lists scroll. It is that every way into the
 * app is reachable without scrolling, which is what failed before: the last
 * four destinations sat below the fold on every laptop.
 */
const headersInView = await page.locator(".sidebar").evaluate((el) => {
  const box = el.getBoundingClientRect();
  return Array.from(el.querySelectorAll(".nav-section-header")).every((header) => {
    const r = header.getBoundingClientRect();
    return r.top >= box.top - 1 && r.bottom <= box.bottom + 1;
  });
});
check("Every navigation group is reachable without scrolling", headersInView);
/*
  And at a realistic laptop height, not just the generous test viewport. The
  full nav genuinely cannot fit 14 destinations, 5 headers and 11 stages on a
  800px screen, so the requirement here is bounded: at most one group header
  below the fold, and it must not be the stage list — the course itself is the
  one thing that must never be the part you have to scroll to find.
*/
{
  const short = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const shortPage = await short.newPage();
  watchPage(shortPage, "short-viewport");
  await shortPage.goto(artifactUrl, { waitUntil: "load" });
  await shortPage.waitForSelector(".sidebar");
  const below = await shortPage.evaluate(() => {
    const sb = document.querySelector(".sidebar");
    const box = sb.getBoundingClientRect();
    return [...sb.querySelectorAll(".nav-section-header")]
      .filter((h) => h.getBoundingClientRect().bottom > box.bottom + 1)
      .map((h) => h.textContent.trim());
  });
  await check(
    "At 1280x800 at most one group is below the fold, and it is not the stages",
    below.length <= 1 && !below.some((label) => /stages/i.test(label)),
    below.length ? below.join(", ") : "none below the fold",
  );
  await short.close();
}
check(
  "Every group header reports its state to assistive tech",
  await page.locator(".nav-section-header").evaluateAll((els) =>
    els.every((el) => el.hasAttribute("aria-expanded") && el.hasAttribute("aria-controls"))),
);

// Navigating into a collapsed group must reveal it, or the nav looks lost.
await page.evaluate(() => { window.location.hash = "glossary"; });
await page.waitForTimeout(400);
check(
  "Navigating into a collapsed group opens it",
  await page.locator(".nav-section").filter({ hasText: "Reference" }).locator("button.active").isVisible(),
);
await page.evaluate(() => { window.location.hash = ""; });
await page.waitForTimeout(300);

/* -- structure ---------------------------------------------------- */

const stageButtons = await page.locator(".sidebar-modules nav button").count();
check("Nine stages listed in the sidebar", stageButtons === 9, `found ${stageButtons}`);

/*
  Tone. This is training, and the closure package was written in a deficit
  frame: 23 of 47 section openers led with what goes wrong before saying what
  good looks like. Cumulatively that reads as a catalogue of failure rather
  than a course, and it teaches less well — people build a skill faster from
  what a practice achieves than from what it avoids.

  Deliberately loose. Contrastive definitions ("an ownership model, not merely
  software") state the positive first and are good teaching, so some of this
  is right. The threshold catches drift back toward half, not the occasional
  contrast.
*/
{
  const source = await readFile(path.join(projectDir, "src", "courses", "closure-reports", "course.ts"), "utf8");
  const openers = [...source.matchAll(/body:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g)]
    .map((m) => m[1].split(". ")[0])
    .filter((s) => s.length > 30);
  const negative = openers.filter((s) =>
    /\b(fail|fails|failed|failure|wrong|worse|worst|bad|badly|useless|weak|poor|mistake|meaningless)\b/i.test(s),
  );
  const share = openers.length ? negative.length / openers.length : 0;
  check(
    "Most lesson sections open on what good looks like, not on failure",
    share <= 0.2,
    `${negative.length} of ${openers.length} openers lead with failure (${Math.round(share * 100)}%)`,
  );
}

await page.getByRole("button", { name: "Learning path", exact: true }).click();
await page.getByRole("heading", { name: "Build the complete capability chain" }).waitFor();
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
  const chosenClass = await quiz.nth(index).locator(".answer-option").first().getAttribute("class") ?? "";
  check(
    `Q${index + 1} marks the chosen answer`,
    /\b(correct|incorrect)\b/.test(chosenClass),
    chosenClass,
  );
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

// Apply and Reference start collapsed, so open a group before clicking into it.
const openNavGroup = async (label) => {
  const header = page.locator(".nav-section-header").filter({ hasText: label });
  if ((await header.getAttribute("aria-expanded")) === "false") await header.click();
  await page.waitForTimeout(120);
};
await openNavGroup("Apply");
await page.getByRole("button", { name: "Toolkit", exact: true }).click();
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

await openNavGroup("Reference");
await page.getByRole("button", { name: "Field guide", exact: true }).click();
await page.getByRole("heading", { name: "The reference half of the course" }).waitFor();
const guideText = await page.locator(".field-guide").innerText();
for (const term of ["Pre-Approval", "Program Increment", "Iteration path", "Senior Responsible Officer", "Learn continuously"]) {
  check(`Field guide covers ${term}`, guideText.toLowerCase().includes(term.toLowerCase()));
}

await page.getByRole("button", { name: "Course additions", exact: true }).click();
const divergenceCount = await page.locator(".divergence").count();
check("Course additions are populated", divergenceCount >= 5, `found ${divergenceCount}`);

/*
 * Tone check. This page describes a colleague's deck, and the previous
 * wording ("Where this course departs from the deck", "a small correction")
 * read as an errata list against departmental material. The relationship is
 * briefing-to-workbook, so the page must not use the language of fault.
 */
const additionsText = (await page.locator(".page").innerText()).toLowerCase();
const faultWords = ["departs from", "correction", "improves on", "the deck is wrong", "shortcoming", "deficien"];
const found = faultWords.filter((word) => additionsText.includes(word));
check("Course additions are framed as depth, not as fault", found.length === 0, found.join(", "));
check(
  "Course additions state that they do not replace the deck",
  additionsText.includes("nothing here replaces the deck"),
);

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

/*
 * Submitting the diagnostic with a gap.
 *
 * "Show recommendation" used to be `disabled` until all nine were answered,
 * styled with nothing but opacity, so a learner who missed one question in a
 * long scroll got a solid-looking primary button that did nothing and said
 * nothing. The button must always act, and must point at the gap.
 */
const diagSlots = page.locator(".diagnostic-list fieldset");
for (let index = 0; index < 9; index += 1) {
  if (index === 3) continue; // deliberately leave question 4 blank
  await diagSlots.nth(index).locator(".answer-option").first().click();
}
const showRecommendation = page.getByRole("button", { name: "Show recommendation" });
check("Submit is never a dead end", !(await showRecommendation.isDisabled()));
check(
  "Answered count is reported before submitting",
  (await page.locator(".diagnostic-progress").innerText()).includes("8 of 9"),
);

await showRecommendation.click();
await page.waitForTimeout(500);
check(
  "Submitting with a gap does not produce a result",
  (await page.locator(".diagnostic-result").count()) === 0,
);
check(
  "The unanswered question is marked",
  (await page.locator(".diagnostic-slot.unanswered").count()) === 1,
);
check(
  "Focus moves to the first unanswered question",
  await page.evaluate(() => Boolean(document.activeElement?.closest("#diagnostic-q4"))),
  "scrolling alone leaves a keyboard user stranded",
);

await diagSlots.nth(3).locator(".answer-option").first().click();
await page.waitForTimeout(150);
await showRecommendation.click();
await page.waitForTimeout(600);
check(
  "Completing every question produces a recommendation",
  (await page.locator(".diagnostic-result").count()) === 1,
);
check(
  "The recommendation names a stage to start from",
  /Stage \d/.test(await page.locator(".diagnostic-result h2").innerText()),
);

/* -- the disclaimer appears once per page --------------------------- */

/*
 * The same statement was running in the sidebar note, the page footer and the
 * body of the Sources page at once, so a reader met it three times on one
 * screen. Repetition does not make a caveat more binding — it makes the page
 * read as boilerplate and teaches people to skip the region it lives in.
 */
for (const view of ["dashboard", "sources", "module/thinking", "glossary"]) {
  await page.evaluate((h) => { window.location.hash = h; }, view);
  await page.waitForTimeout(400);
  const occurrences = await page.evaluate(() => {
    const text = document.body.innerText;
    return (text.match(/not an official Australian Government publication/gi) ?? []).length;
  });
  check(
    `The disclaimer appears once per page (${view})`,
    occurrences <= 1,
    `${occurrences} occurrences on one screen`,
  );
}
const footerWords = await page.evaluate(
  () => (document.querySelector(".app-footer")?.innerText ?? "").trim().split(/\s+/).length,
);
check(
  "The persistent footer stays small",
  footerWords <= 20,
  `${footerWords} words — it repeats on every page, so it earns very little space`,
);

/* -- the package container holds ----------------------------------- */

/*
 * A structural check rather than a behavioural one, because this invariant
 * cannot be observed by clicking. The player must read content ONLY through
 * the active package. Views used to import `modules` and `flashcards` straight
 * from an individual course folder, which would hard-wire the player to one course
 * and made "adding a package is a data operation" untrue.
 *
 * Types may still be imported from the content files — a type is the same
 * whichever package supplies the value. Only the VALUES have to come through
 * the container.
 */
{
  const { readdir } = await import("node:fs/promises");
  const srcDir = path.join(projectDir, "src");
  const files = (await readdir(srcDir)).filter((name) => /^(views-|App|components|recall|slide-viewer)/.test(name));
  const contentValues = [
    "modules", "sources", "totalMinutes", "practiceQuestions", "diagnosticQuestions",
    "supplementaryQuestions", "flashcards", "glossary", "caseStudies", "contrasts",
    "divergences", "toolkitTemplates", "capstoneSteps", "capstoneBriefs", "capstoneRubric",
    "fieldGuide", "slides", "SLIDE_COUNT", "CONTENT_REVIEWED", "quizPoolFor", "findModule", "findSource",
  ];
  const offenders = [];
  for (const file of files) {
    const text = await readFile(path.join(srcDir, file), "utf8");
    for (const match of text.matchAll(/import \{([^}]*)\} from "\.\/(course|reference|slides)";/gs)) {
      for (const raw of match[1].split(",")) {
        const name = raw.trim();
        if (!name || name.startsWith("type ")) continue;
        if (contentValues.includes(name)) offenders.push(`${file}: ${name} from ./${match[2]}`);
      }
    }
  }
  check(
    "No view can bypass the package container",
    offenders.length === 0,
    offenders.slice(0, 6).join(" | "),
  );
}

/* -- training packages --------------------------------------------- */

/*
 * Content used to be flat top-level arrays, which was right for one course and
 * wrong the moment there would be more: a second package would have shared one
 * progress record, one review queue and one results page with the first, so
 * finishing one would have looked like partly finishing the other.
 *
 * Storage is namespaced per package now, following the shape SCORM and cmi5
 * settled on — a course is a self-contained package and progress belongs to it.
 */
await page.evaluate(() => { window.location.hash = "library"; });
await page.waitForTimeout(600);
check("The library lists every registered package", (await page.locator(".package-card").count()) >= 1);
check(
  "The library states what a package contains",
  (await page.locator(".package-stats dt").count()) >= 4,
);
check(
  "The sidebar names the package it belongs to",
  (await page.locator(".package-switch strong").innerText()).trim().length > 3,
  "without this the navigation reads as though one course were the whole product",
);

// Namespacing, and that pre-namespace data is carried across rather than lost.
const keys = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith("product-practice-v2:")));
const namespaced = keys.filter((k) => k.includes(":pm-fundamentals:"));
check(
  "Progress keys are namespaced by package",
  namespaced.length > 0,
  `${namespaced.length} namespaced of ${keys.length} keys`,
);
const globals = keys.filter((k) => /:(theme|salt|nav-collapsed-v2|active-package|migrated-to-packages)$/.test(k));
check(
  "Person-level settings stay outside any package",
  globals.every((k) => !k.includes(":pm-fundamentals:")),
  "re-randomising someone's option order because they opened a different course would be pointless churn",
);

/*
 * Migration is tested in its OWN context. The first attempt seeded legacy keys
 * and reloaded the shared page, which reset the state four later checks had
 * spent the run building — and it could not test the real case anyway, since
 * namespaced progress already existed and migration correctly refuses to
 * overwrite it. A clean profile is the only place first-run behaviour is real.
 */
{
/*
  Switching package, through the button a learner actually clicks.

  This is here because it was missed. The package switch was verified by
  writing the active-package key into localStorage and loading the page, which
  proved the content layer resolved correctly and proved nothing about the
  control. Shipped, and the app kept showing the first package's title, because
  the views still carried its name as literal text. Test the path the user
  takes, not the state it produces.
*/
{
  const swap = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const swapPage = await swap.newPage();
  watchPage(swapPage, "package-switch");
  await swapPage.goto(artifactUrl, { waitUntil: "load" });
  await swapPage.waitForSelector(".sidebar");

  const read = () =>
    swapPage.evaluate(() => ({
      brand: document.querySelector(".brand strong")?.textContent?.trim() ?? "",
      h1: document.querySelector("#main-content h1")?.textContent?.trim() ?? "",
      heading: [...document.querySelectorAll(".nav-section-header span")].map((s) => s.textContent).pop() ?? "",
      stages: document.querySelectorAll(".module-dot").length,
      // Stage titles, not the count. Two packages can legitimately have the
      // same number of stages — the first version of this check compared
      // counts and started failing the moment they did.
      firstStage:
        document.querySelector(".sidebar-modules nav button span:nth-child(2)")?.textContent?.trim() ?? "",
      position: document.querySelector(".package-switch small")?.textContent?.trim() ?? "",
      title: document.title,
    }));

  const before = await read();

  await swapPage.click(".package-switch");
  await swapPage.waitForTimeout(400);
  const titles = await swapPage.$$eval(".package-card h2", (els) => els.map((e) => e.textContent ?? ""));
  const otherIndex = titles.findIndex((t) => !before.brand || !t.includes(before.brand));

  await check("Library offers more than one package", titles.length > 1, titles.join(" / "));

  if (otherIndex >= 0) {
    const cards = await swapPage.$$(".package-card");
    await cards[otherIndex].$eval("footer button", (b) => b.click());
    await swapPage.waitForTimeout(1600);
    const after = await read();

    await check(
      "Switching package changes the topbar title",
      after.brand !== before.brand && after.brand.length > 0,
      `${before.brand} -> ${after.brand}`,
    );
    await check(
      "Switching package changes the dashboard heading",
      after.h1 !== before.h1 && after.h1.length > 0,
      `${before.h1} -> ${after.h1}`,
    );
    await check(
      "Switching package changes the curriculum to the other package's stages",
      after.firstStage !== before.firstStage && after.firstStage.length > 0 && after.stages > 0,
      `${before.firstStage} -> ${after.firstStage}`,
    );
    await check(
      "No view still renders the previous package's name",
      !after.h1.includes(before.brand) && !after.brand.includes(before.brand),
      `after switch: brand="${after.brand}" h1="${after.h1}"`,
    );
    await check(
      "Package switch reports the active package position",
      before.position.endsWith("1 of 2") && after.position.endsWith("2 of 2"),
      `${before.position} -> ${after.position}`,
    );
    await check(
      "Browser title follows the active package",
      after.title.includes(after.brand),
      after.title,
    );

    await swapPage.evaluate(() => { window.location.hash = "sources"; });
    await swapPage.waitForSelector(".source-list");
    const closureSourcesText = await swapPage.locator("#main-content").innerText();
    await check(
      "Closure provenance names its departmental spine",
      /DEWR Project Closure Report Template/i.test(closureSourcesText) &&
        /departmental closure requirements/i.test(closureSourcesText),
      closureSourcesText.slice(0, 220),
    );
    await check(
      "Closure provenance does not inherit Product Management framework copy",
      !/Scrum definitions|SAFe prioritisation|source-deck teaching/i.test(closureSourcesText),
      closureSourcesText.slice(0, 220),
    );
  }
  await swap.close();
}

/*
  Provenance: the source author is credited for the source, and for nothing
  else.

  The source deck was written by one person. The package around it — stages,
  122 assessed questions, 92 practice items, cards, cases, capstone, templates
  and the player — is separate work. A first attempt rendered "Course written
  by <source author>" directly under the title, which handed him credit for
  all of it.

  The fix is wording, not a second name: everything says "built from". The
  package author is deliberately not named anywhere, so there is also a check
  that no personal name has crept back in as a builder credit.

  `sourceAuthor` is optional — a package built from published frameworks has
  none — so the checks run in both directions.
*/
{
  const SOURCE_AUTHOR = "Simon Morris";
  /* Wording that would credit the source author with the package. */
  const OVERCLAIM = /(Course|Training|Package|Content)\s+(written\s+|built\s+|created\s+)?by\s+Simon/i;
  /* A label left stranded when the optional field is missing. */
  const DANGLING = [
    /Source deck by\s*(?:$|[.,·|])/m,
    /Built from\s*(?:$|[.,·|])/m,
    /,\s*by\s*[.,]/,
    /written by\s*,/,
    /Built from[^.]*,\s*by\s*\./,
  ];

  const cred = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const cp = await cred.newPage();
  watchPage(cp, "credit");
  await cp.goto(artifactUrl, { waitUntil: "load" });
  await cp.waitForSelector(".sidebar");

  await cp.evaluate(() => { window.location.hash = "library"; });
  await cp.waitForSelector(".package-card");
  const cards = await cp.$$eval(".package-card", (els) =>
    els.map((c) => ({
      title: c.querySelector("h2")?.textContent?.trim() ?? "",
      credit: c.querySelector(".package-author")?.textContent?.trim() ?? "",
    })),
  );
  const pmCard = cards.find((c) => c.title.includes("Product Management"));
  const closureCard = cards.find((c) => c.title.includes("Closure"));

  check(
    "The library card attributes the source deck, not the package",
    pmCard?.credit === `Built from a source deck by ${SOURCE_AUTHOR}`,
    pmCard?.credit || "(nothing rendered)",
  );
  check(
    "A package with no source author shows no attribution line",
    closureCard?.credit === "",
    closureCard ? `"${closureCard.credit}"` : "(card not found)",
  );

  /*
    The home page must name the source author against the source, and must not
    imply he wrote the package. "written by <source author>" as a byline under
    the title was the exact wording that did imply it.
  */
  await cp.evaluate(() => { window.location.hash = "dashboard"; });
  await cp.waitForTimeout(450);
  const heroText = (await cp.innerText(".hero")).replace(/\s+/g, " ");
  check("The home page attributes the source material", heroText.includes(SOURCE_AUTHOR));
  check(
    "The home page does not present the source author as the course author",
    !OVERCLAIM.test(heroText),
    heroText.slice(0, 140),
  );
  check(
    "The home page states the package was built around the source",
    /built around it/i.test(heroText),
    heroText.slice(-120),
  );
  check(
    "The source credit sits below the title, not as a byline",
    await cp.evaluate(() => {
      const h1 = document.querySelector(".hero h1");
      const credits = document.querySelector(".hero-credits");
      if (!h1 || !credits) return false;
      /* Anything after the h1 in document order is not a byline. */
      return !!(h1.compareDocumentPosition(credits) & Node.DOCUMENT_POSITION_FOLLOWING)
        && credits.getBoundingClientRect().top > h1.getBoundingClientRect().bottom + 100;
    }),
  );

  /* The views that state where the material came from. */
  for (const view of ["deck", "guide"]) {
    await cp.evaluate((v) => { window.location.hash = v; }, view);
    await cp.waitForTimeout(450);
    const text = await cp.innerText("#main-content");
    check(`The ${view} view names the source author`, text.includes(SOURCE_AUTHOR));
  }

  /* The slide caption, on a slide opened the way a learner opens one. */
  await cp.evaluate(() => { window.location.hash = "deck"; });
  await cp.waitForTimeout(400);
  await cp.locator(".deck-grid button").first().click();
  await cp.waitForSelector(".slide-foot");
  const foot = (await cp.innerText(".slide-foot")).replace(/\s+/g, " ");
  check("The slide caption credits the source author", foot.includes(SOURCE_AUTHOR), foot.slice(0, 90));
  await cp.keyboard.press("Escape");
  await cp.waitForTimeout(250);

  /* Now the package with no source author, through the control a learner clicks. */
  await cp.click(".package-switch");
  await cp.waitForTimeout(400);
  const closureIndex = (
    await cp.$$eval(".package-card h2", (els) => els.map((e) => e.textContent ?? ""))
  ).findIndex((t) => t.includes("Closure"));
  const allCards = await cp.$$(".package-card");
  await allCards[closureIndex].$eval("footer button", (b) => b.click());
  await cp.waitForTimeout(1600);

  const stranded = [];
  for (const view of ["dashboard", "guide", "sources"]) {
    await cp.evaluate((v) => { window.location.hash = v; }, view);
    await cp.waitForTimeout(450);
    const text = await cp.innerText("#main-content");
    if (text.includes(SOURCE_AUTHOR)) stranded.push(`${view}: credits the other package's source author`);
    for (const pattern of DANGLING) {
      const hit = text.match(pattern);
      if (hit) stranded.push(`${view}: "${hit[0].trim()}"`);
    }
  }
  check(
    "A package with no source author leaves no stranded attribution",
    stranded.length === 0,
    stranded.length ? stranded.join(" | ") : "dashboard, guide, sources all clean",
  );
  await cred.close();
}

/*
  What the printed page actually says.

  The print path had a check for overflow — is anything wider than the page —
  and none for content. So a blanket `button { display: none }` in the print
  stylesheet emptied the guide's whole table of contents (each entry is a
  button, so fifteen numbers printed with no titles), hid the footer's
  provenance link leaving a stranded separator, and let a keyboard skip link
  onto the paper. Nothing was wrong on screen, nothing overflowed, and every
  check passed.

  This reads the rendered text under print media and asserts the content is
  there — which is what a reader gets, and what measuring never sees.
*/
{
  const pr = await browser.newContext({ viewport: { width: 1200, height: 1400 } });
  const pp = await pr.newPage();
  watchPage(pp, "print-content");
  await pp.goto(artifactUrl, { waitUntil: "load" });
  await pp.waitForSelector(".sidebar");
  await pp.evaluate(() => { window.location.hash = "guide"; });
  await pp.waitForSelector(".guide-contents");
  await pp.emulateMedia({ media: "print" });
  await pp.waitForTimeout(400);

  const toc = await pp.$$eval(".guide-contents li", (lis) =>
    lis.map((li) => (li.innerText ?? "").replace(/\s+/g, " ").trim()));
  const empty = toc.filter((t) => !t).length;
  check(
    "The printed contents lists section titles, not just numbers",
    toc.length > 0 && empty === 0,
    empty ? `${empty} of ${toc.length} entries print with no title` : `${toc.length} entries, all titled`,
  );
  await pp.emulateMedia({ media: "screen" });
  await pr.close();
}

/*
  Illustration text: collisions, spill and crowding.

  SVG text does not wrap, reflow or push its neighbours. A label positioned
  from a variable — a bar width, an end anchor, a stacked sub-label — collides
  or runs off the canvas the moment the string is longer than the space
  assumed for it, and nothing reports an error. The layout is fixed in user
  units, so a fault is present at every viewport rather than only at narrow
  ones; the sweep is here because font metrics are not perfectly proportional
  to the scale factor.

  Three faults, all checked: text over text, text outside the frame, and
  stacked labels with under 4 user units of leading, which reads as collided
  even where the boxes do not intersect.
*/
{
  const faults = [];
  for (const entry of bank.trainingPackages) {
    const ids = entry.content.modules.map((m) => m.id);
    /* One context per package; resize in place rather than rebuilding it. */
    const ic = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
    const ip = await ic.newPage();
    watchPage(ip, `illus-${entry.manifest.id}`);
    await ip.addInitScript((id) =>
      localStorage.setItem("product-practice-v2:active-package", JSON.stringify(id)), entry.manifest.id);
    await ip.goto(artifactUrl, { waitUntil: "load" });
    await ip.waitForSelector("#main-content");
    for (const W of [1440, 390]) {
      await ip.setViewportSize({ width: W, height: 1200 });
      await ip.waitForTimeout(120);
      for (const id of ids) {
        await ip.evaluate((m) => { window.location.hash = `module/${m}`; }, id);
        await ip.waitForTimeout(180);
        const found = await ip.evaluate(() => {
          const svg = document.querySelector("#main-content svg.illus");
          if (!svg) return { missing: true };
          const texts = [...svg.querySelectorAll("text")]
            .map((t) => ({ s: (t.textContent || "").trim(), b: t.getBoundingClientRect() }))
            .filter((t) => t.s && t.b.width > 0);
          const box = svg.getBoundingClientRect();
          const scale = svg.viewBox.baseVal.width / box.width;
          const out = [];
          for (let a = 0; a < texts.length; a += 1) for (let z = a + 1; z < texts.length; z += 1) {
            const A = texts[a].b, B = texts[z].b;
            const ox = Math.min(A.right, B.right) - Math.max(A.left, B.left);
            if (ox <= 0.5) continue;
            const oy = Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top);
            if (oy > 0.5) { out.push(`"${texts[a].s.slice(0, 24)}" over "${texts[z].s.slice(0, 24)}"`); continue; }
            const gap = (Math.max(A.top, B.top) - Math.min(A.bottom, B.bottom)) * scale;
            if (gap >= 0 && gap < 4) out.push(`"${texts[a].s.slice(0, 24)}" / "${texts[z].s.slice(0, 24)}" ${gap.toFixed(1)}u apart`);
          }
          texts.filter((t) => t.b.left < box.left - 1 || t.b.right > box.right + 1)
            .forEach((t) => out.push(`"${t.s.slice(0, 24)}" outside the frame`));
          return { out: [...new Set(out)] };
        });
        if (found.missing) { faults.push(`${entry.manifest.id}/${id} @${W}: no illustration`); continue; }
        found.out.forEach((o) => faults.push(`${entry.manifest.id}/${id} @${W}: ${o}`));
      }
    }
    await ic.close();
  }
  check(
    "Illustration labels never collide, crowd or leave the frame",
    faults.length === 0,
    faults.length ? `${faults.length} — ${faults.slice(0, 3).join(" | ")}` : "every stage, two widths, both packages",
  );
}

/*
  Numbering applied twice.

  Stage labels already carry their number — "1. Product thinking and strategy"
  — so any list marker or CSS counter placed beside one renders "2. 1. Product
  thinking and strategy": the guide's numbering fighting the curriculum's. It
  was in the guide contents on screen as well as in print, and no check saw it
  because a list marker is not in `innerText` and a `::before` counter is not
  in the DOM.

  Three ways it can appear, all checked, across every view of both packages:
  literal text, a list-style marker, and a generated counter.
*/
{
  const dbl = [];
  for (const pkg of ["pm-fundamentals", "closure-reports"]) {
    const nc = await browser.newContext({ viewport: { width: 1600, height: 1200 } });
    const np = await nc.newPage();
    watchPage(np, `numbering-${pkg}`);
    await np.addInitScript((id) =>
      localStorage.setItem("product-practice-v2:active-package", JSON.stringify(id)), pkg);
    await np.goto(artifactUrl, { waitUntil: "load" });
    await np.waitForSelector(".sidebar");

    const scan = () => np.evaluate(() => {
      const out = [];
      const numbered = (t) => /^\d{1,2}[.)]\s/.test(t);
      const text = (document.querySelector("#main-content")?.innerText ?? "").replace(/\s+/g, " ");
      (text.match(/\b\d{1,2}\.\s+\d{1,2}\.\s+\S+/g) ?? []).forEach((m) => out.push(`literal "${m.slice(0, 46)}"`));
      document.querySelectorAll("#main-content ol, #main-content ul").forEach((l) => {
        if (getComputedStyle(l).listStyleType === "none") return;
        [...l.children].forEach((li) => {
          const t = (li.innerText ?? "").trim();
          if (numbered(t)) out.push(`marker+number "${t.slice(0, 42)}"`);
        });
      });
      document.querySelectorAll("#main-content li, #main-content button").forEach((el) => {
        const before = getComputedStyle(el, "::before").content;
        if (!before || before === "none" || before === '""' || !/\d|counter/.test(before)) return;
        const t = (el.innerText ?? "").trim();
        if (numbered(t)) out.push(`counter+number "${t.slice(0, 42)}"`);
      });
      return [...new Set(out)];
    });

    for (const view of ["dashboard", "path", "guide", "results", "cases", "toolkit", "capstone",
                        "fieldguide", "glossary", "sources", "deck", "divergences", "example"]) {
      await np.evaluate((v) => { window.location.hash = v; }, view);
      await np.waitForTimeout(420);
      for (const h of await scan()) dbl.push(`${pkg}/${view}: ${h}`);
    }
    const stages = await np.locator(".sidebar-modules nav button").count();
    for (let i = 0; i < stages; i += 1) {
      await np.evaluate(() => { window.location.hash = "dashboard"; });
      await np.waitForTimeout(110);
      await np.locator(".sidebar-modules nav button").nth(i).click();
      await np.waitForTimeout(420);
      for (const h of await scan()) dbl.push(`${pkg}/stage ${i + 1}: ${h}`);
    }
    await nc.close();
  }
  check(
    "Nothing is numbered twice, in any view of either package",
    dbl.length === 0,
    dbl.length ? `${dbl.length} — ${dbl.slice(0, 3).join(" | ")}` : "every view of both packages clean",
  );
}

{
  const pr = await browser.newContext({ viewport: { width: 1200, height: 1400 } });
  const pp = await pr.newPage();
  watchPage(pp, "print-tail");
  await pp.goto(artifactUrl, { waitUntil: "load" });
  await pp.waitForSelector(".sidebar");
  await pp.evaluate(() => { window.location.hash = "guide"; });
  await pp.waitForSelector(".guide-contents");
  await pp.emulateMedia({ media: "print" });
  await pp.waitForTimeout(400);

  const printed = (await pp.innerText("body")).replace(/\s+/g, " ");
  check(
    "The printed page carries no keyboard skip link",
    !/Skip to (learning content|main)/i.test(printed),
    /Skip to/i.test(printed) ? "skip link is on the paper" : "absent, correctly",
  );
  check(
    "The printed footer strands no separator",
    !/publication\s*·\s*$/.test(printed.trim()) && !/·\s*·/.test(printed),
    printed.slice(-90),
  );
  await pp.emulateMedia({ media: "screen" });
  await pr.close();
}

/*
  "1 days".

  Found by completing a course rather than by any check: after a single
  session the results page read "1 days in the last 12 weeks" and "1 study
  days recorded overall". The codebase already had the guard idiom in six
  other places; these two just missed it, and no check looked at rendered
  text with a count of exactly one in it.

  Seeds a single study day and one attempt — the state a first-time learner
  is in for their whole first session, so this is the common case, not an
  edge one — and reads every view for a singular count followed by a plural.
*/
{
  const one = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
  const op = await one.newPage();
  watchPage(op, "singular");
  await op.addInitScript(() => {
    const p = "product-practice-v2:pm-fundamentals:";
    localStorage.setItem(`${p}study-days`, JSON.stringify(["2026-08-19"]));
    localStorage.setItem(`${p}progress`, JSON.stringify({
      thinking: {
        lessonRead: true, quizScore: 100, scenariosCorrect: ["thinking-s1", "thinking-s2"],
        scenarioAttempts: { "thinking-s1": 1, "thinking-s2": 1 },
        reflection: "", assignment: [], assignmentChecks: {}, attempts: 1,
      },
    }));
  });
  await op.goto(artifactUrl, { waitUntil: "load" });
  await op.waitForSelector(".sidebar");

  const NOUNS = "day|days|attempt|attempts|question|questions|card|cards|stage|stages|slide|slides|"
    + "week|weeks|item|items|section|sections|answer|answers|time|times|point|points|word|words";
  const bad = [];
  for (const view of ["dashboard", "results", "path", "review", "module/thinking"]) {
    await op.evaluate((v) => { window.location.hash = v; }, view);
    await op.waitForTimeout(600);
    const text = (await op.innerText("#main-content")).replace(/\s+/g, " ");
    const hits = text.match(new RegExp(`\\b1 (?:${NOUNS})s\\b`, "g")) ?? [];
    /* "1 days" is wrong; "1 day" is right. Only flag a plural after exactly 1. */
    for (const h of new Set(hits)) bad.push(`${view}: "${h}"`);
  }
  check(
    "A count of one is not followed by a plural noun",
    bad.length === 0,
    bad.length ? bad.join(" | ") : "dashboard, results, path, review and a stage page all read correctly",
  );
  await one.close();
}

/*
  The package author is not named, anywhere.

  This is a deliberate choice, not an oversight, and it is easy to undo by
  accident — the obvious way to express "this person wrote the source and that
  person wrote the package" is to name both, and that is exactly what an
  earlier version did. Assert it against the shipped artefact rather than the
  source, because a name reaching the build is what matters.
*/
{
  const html = await readFile(artifactPath, "utf8");
  const claimed = [
    /\bPackage by\b/i,
    /\bbuilt by\s+[A-Z][a-z]+\s+[A-Z][a-z]+/,
    /\bCourse (structure|material)[^.]{0,40}\bby\s+[A-Z][a-z]+\s+[A-Z][a-z]+/,
  ]
    .map((re) => html.match(re))
    .filter(Boolean)
    .map((m) => m[0]);
  check(
    "No personal name is credited as the package author",
    claimed.length === 0,
    claimed.length ? claimed.join(" | ") : "none in the built artefact",
  );
}

/*
  Contrast on every stage page, in both packages and both themes.

  There was already a contrast check, and it passed while twenty stage pages
  rendered white text on a near-white panel — because it only ever looked at
  the dashboard. The stage hue is bound per stage via [data-stage], so a rule
  can be correct on stage 1 and unreadable on stage 8, and nothing that opens
  one page can see it.

  This walks the lot. It is the slowest block in the suite and it earns it.
*/
{
  const offenders = [];
  for (const theme of ["light", "dark"]) {
    for (const pkg of ["pm-fundamentals", "closure-reports"]) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
      const cpage = await ctx.newPage();
      watchPage(cpage, `contrast-${theme}-${pkg}`);
      await cpage.addInitScript(([t, p]) => {
        localStorage.setItem("product-practice-v2:active-package", JSON.stringify(p));
        localStorage.setItem("product-practice-v2:theme", JSON.stringify(t));
      }, [theme, pkg]);
      await cpage.goto(artifactUrl, { waitUntil: "load" });
      await cpage.waitForSelector(".sidebar-modules nav button");

      const stages = await cpage.locator(".sidebar-modules nav button").count();
      for (let i = 0; i < stages; i += 1) {
        await cpage.evaluate(() => { window.location.hash = "dashboard"; });
        await cpage.waitForTimeout(110);
        await cpage.locator(".sidebar-modules nav button").nth(i).click();
        await cpage.waitForTimeout(400);

        const bad = await cpage.evaluate(() => {
          const chan = (s) => (s.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
          const lum = (c) => {
            const s = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
            return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
          };
          const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
          /* First ancestor with an opaque background is what the text sits on. */
          const behind = (el) => {
            let n = el;
            while (n && n !== document.documentElement) {
              const bg = getComputedStyle(n).backgroundColor;
              if (bg && !bg.includes("rgba(0, 0, 0, 0)")) { const c = chan(bg); if (c.length === 3) return c; }
              n = n.parentElement;
            }
            return [255, 255, 255];
          };
          const out = [];
          document.querySelectorAll(
            ".core-idea, .core-idea blockquote, .core-idea .eyebrow, .outcome-box, .outcome-box strong," +
            " .lesson-example, .worked-example, .module-hero h1, .module-hero .eyebrow, .path-item",
          ).forEach((el) => {
            if (!(el.textContent ?? "").trim()) return;
            const cs = getComputedStyle(el);
            const fg = chan(cs.color);
            if (fg.length !== 3) return;
            const size = parseFloat(cs.fontSize);
            const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
            const need = large ? 3 : 4.5;
            const r = ratio(fg, behind(el));
            if (r < need) {
              out.push(`${(el.className || el.tagName).toString().split(" ")[0]} ${r.toFixed(2)}:1 (need ${need})`);
            }
          });
          return out;
        });
        for (const b of bad) offenders.push(`${theme}/${pkg} stage ${i + 1}: ${b}`);
      }
      await ctx.close();
    }
  }
  check(
    "Every stage page meets AA on its own hue, both packages, both themes",
    offenders.length === 0,
    offenders.length ? `${offenders.length} failures — ${offenders.slice(0, 4).join(" | ")}` : "40 stage pages clean",
  );
}

  const fresh = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const freshPage = await fresh.newPage();
  watchPage(freshPage, "migration");
  await freshPage.goto(artifactUrl, { waitUntil: "load" });
  await freshPage.evaluate(() => {
    localStorage.clear();
    localStorage.setItem(
      "product-practice-v2:progress",
      JSON.stringify({ outcomes: { lessonRead: true, quizScore: 88, scenariosCorrect: [], scenarioAttempts: {}, reflection: "", assignment: [], attempts: 2 } }),
    );
    localStorage.setItem("product-practice-v2:study-days", JSON.stringify(["2026-08-15"]));
  });
  await freshPage.reload({ waitUntil: "load" });
  await freshPage.waitForTimeout(600);
  const carried = await freshPage.evaluate(() => {
    const moved = localStorage.getItem("product-practice-v2:pm-fundamentals:progress");
    return {
      oldGone: localStorage.getItem("product-practice-v2:progress") === null,
      score: moved ? JSON.parse(moved)?.outcomes?.quizScore : null,
      days: localStorage.getItem("product-practice-v2:pm-fundamentals:study-days") !== null,
    };
  });
  check(
    "Pre-namespace progress is migrated, not discarded",
    carried.oldGone && carried.score === 88 && carried.days,
    `old key removed: ${carried.oldGone}, score carried: ${carried.score}, study days carried: ${carried.days}`,
  );
  await fresh.close();
}

/* -- motion preference and the completion record -------------------- */

/*
 * The stylesheet neutralises CSS transitions under prefers-reduced-motion, but
 * a JavaScript scrollIntoView({ behavior: "smooth" }) is not CSS and that rule
 * does not reach it. Five such calls were animating the page for people who
 * had explicitly asked them not to.
 */
{
  const reduced = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  watchPage(reducedPage, "reduced-motion");
  await reducedPage.goto(`${artifactUrl}#/guide`, { waitUntil: "load" });
  await reducedPage.waitForSelector(".guide-contents button");
  const behaviour = await reducedPage.evaluate(() => {
    const original = Element.prototype.scrollIntoView;
    let seen = null;
    Element.prototype.scrollIntoView = function (options) { seen = options?.behavior ?? "auto"; };
    document.querySelector(".guide-contents button")?.click();
    Element.prototype.scrollIntoView = original;
    return seen;
  });
  check(
    "In-page scrolling honours reduced motion",
    behaviour === "auto",
    `scrollIntoView used "${behaviour}" for a user who asked for reduced motion`,
  );
  await reduced.close();
}

await page.evaluate(() => { window.location.hash = "results"; });
await page.waitForTimeout(600);
const recordRows = await page.locator(".record-table tbody tr").count();
check("The completion record covers every stage", recordRows === 9, `${recordRows} rows`);
const recordText = (await page.locator(".record-sheet").innerText()).toLowerCase();
check(
  "The record does not present itself as a certification",
  recordText.includes("not a certification") && !/certificate of/i.test(recordText),
  "self-reported local data dressed as a credential would be misleading",
);
check(
  "The record states who has verified it",
  recordText.includes("not issued or verified"),
);

/* -- typography: the prose measure --------------------------------- */

/*
 * Body copy was rendering at 117 characters per line against a published
 * optimum of 66 (Bringhurst's 45-75). Over-long lines cause tracking fatigue
 * on the return sweep, which hurts the longest passages most — exactly the
 * worked-reasoning material. Measured here with real glyph metrics rather
 * than an em heuristic, because the two disagree by ~25%.
 */
for (const view of [
  "module/lifecycle", "guide", "cases", "divergences", "fieldguide",
  "toolkit", "capstone", "sources", "glossary", "results", "settings",
]) {
  await page.evaluate((h) => { window.location.hash = h; }, view);
  await page.waitForTimeout(450);
  const stats = await page.evaluate(() => {
    const ctx = document.createElement("canvas").getContext("2d");
    const rows = [];
    document.querySelectorAll("#main-content p, #main-content li").forEach((el) => {
      const text = el.textContent.trim();
      if (text.length < 150 || el.children.length) return;
      const style = getComputedStyle(el);
      ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      rows.push(Math.round(el.getBoundingClientRect().width / (ctx.measureText(text).width / text.length)));
    });
    if (!rows.length) return null;
    rows.sort((a, b) => a - b);
    return { median: rows[Math.floor(rows.length / 2)], max: rows[rows.length - 1], n: rows.length };
  });
  if (!stats) continue;
  check(
    `Prose measure stays in the readable range (${view})`,
    stats.median >= 45 && stats.median <= 78 && stats.max <= 82,
    `median ${stats.median} ch, max ${stats.max} ch across ${stats.n} blocks — target 45-75, optimum 66`,
  );
}

/* -- worked cases -------------------------------------------------- */

await page.evaluate(() => { window.location.hash = "cases"; });
await page.waitForTimeout(500);
const caseTabs = await page.locator(".case-switch button").count();
check("Four worked cases are available", caseTabs === 4, `${caseTabs} case(s)`);
check(
  "Each case shows which stages it exercises",
  (await page.locator(".case-coverage").count()) === caseTabs,
  "a learner should be able to pick the case covering what they are weak on",
);
// Every step must name the decision before narrating what happened.
const stepCount = await page.locator(".case-steps > li").count();
const decisionCount = await page.locator(".case-decision").count();
check(
  "Every case step names the decision that was on the table",
  decisionCount === stepCount && stepCount >= 5,
  `${decisionCount} decisions across ${stepCount} steps — narrative alone is easy to nod along to`,
);
check(
  "Every case step links to the stage it exercises",
  (await page.locator(".case-stage-link").count()) === stepCount,
);
// The stage link must actually go there.
const linkLabel = (await page.locator(".case-stage-link").first().innerText()).trim();
await page.locator(".case-stage-link").first().click();
await page.waitForTimeout(600);
check(
  "A case stage link opens that stage",
  (await page.locator(".lesson-sections").count()) === 1,
  `clicking "${linkLabel}" should land on a stage page`,
);

/* -- stage navigation and targeted re-teaching --------------------- */

await page.evaluate(() => { window.location.hash = "module/delivery"; });
await page.waitForTimeout(500);
const stageContents = await page.locator(".stage-contents button").count();
check(
  "A stage lists its own sections",
  stageContents >= 5,
  `${stageContents} entries — a stage is now 8-9 sections including a 300-word passage`,
);
const firstSection = page.locator(".stage-contents button").nth(3);
const sectionLabel = (await firstSection.innerText()).trim();
await firstSection.click();
await page.waitForTimeout(1200);
check(
  "Stage contents scroll rather than re-route",
  (await page.locator(".lesson-sections").count()) === 1 &&
    (await page.evaluate(() => window.location.hash)).includes("delivery"),
  `landed on ${await page.evaluate(() => window.location.hash)} after clicking "${sectionLabel}"`,
);

/* -- constructed response and item statistics ---------------------- */

/*
 * The assignments asked for exactly the writing this course is about and
 * nothing checked any of it. Marking free text is impossible offline; a worked
 * answer revealed after commitment, against explicit criteria, is not — but it
 * only works if the model stays hidden until the learner has attempted it.
 */
await page.evaluate(() => { window.location.hash = "module/outcomes"; });
await page.waitForSelector(".assignment-panel");
const compareButton = page.getByRole("button", { name: "Compare with a worked answer" });
check(
  "The worked answer stays hidden until the learner attempts it",
  await compareButton.isDisabled(),
  "seeing a good answer first replaces the work with recognition",
);
const draftBox = page.locator(".assignment-panel textarea").first();
await draftBox.scrollIntoViewIfNeeded();
await draftBox.click();
await draftBox.fill(
  "Objective: providers get claims right first time, measured by the first-submission rejection rate against a June target.",
);
await draftBox.blur();
// Wait for the state round-trip rather than assuming a fixed delay.
const unlocked = await compareButton
  .waitFor({ state: "attached" })
  .then(() => page.waitForFunction(
    () => {
      const button = [...document.querySelectorAll("button")].find(
        (b) => b.textContent.trim() === "Compare with a worked answer",
      );
      return button && !button.disabled;
    },
    undefined,
    { timeout: 4000 },
  ))
  .then(() => true)
  .catch(() => false);
check("Writing an answer unlocks the comparison", unlocked, "the draft did not register");
if (unlocked) await compareButton.click();
await page.waitForTimeout(400);
check("The worked answer appears", (await page.locator(".model-answer p").count()) > 0);
const criteriaCount = await page.locator(".model-criteria input").count();
check("Self-check criteria are offered", criteriaCount >= 3, `${criteriaCount} criteria`);

// Per-item outcomes must actually be recorded, or the Results panel is fiction.
const itemsBefore = await page.evaluate(() => {
  const raw = localStorage.getItem("product-practice-v2:pm-fundamentals:item-stats");
  return raw ? Object.keys(JSON.parse(raw)).length : 0;
});
// Use a stage this suite has not already quizzed: submitting a quiz disables
// its options, and every other stage referenced above has been submitted.
await page.evaluate(() => { window.location.hash = "module/roles"; });
await page.waitForSelector(".knowledge-check fieldset");
const statGroups = page.locator(".knowledge-check fieldset");
const statCount = await statGroups.count();
for (let index = 0; index < statCount; index += 1) {
  await statGroups.nth(index).locator(".answer-option").first().click();
}
await page.getByRole("button", { name: "Check my recall" }).click();
await page.waitForTimeout(700);
const itemsAfter = await page.evaluate(() => {
  const raw = localStorage.getItem("product-practice-v2:pm-fundamentals:item-stats");
  return raw ? Object.keys(JSON.parse(raw)).length : 0;
});
check(
  "Per-item outcomes are recorded",
  itemsAfter > itemsBefore,
  `${itemsBefore} items before, ${itemsAfter} after — history alone records only a score`,
);

/* -- errors drive the review queue -------------------------------- */

/*
 * The app had 122 questions and 92 flashcards on an SM-2 scheduler that never
 * spoke to each other: a wrong answer changed a score and nothing else. Cards
 * covering a missed question are now brought forward to due-now.
 */
await page.evaluate(() => { window.location.hash = "module/outcomes"; });
await page.waitForSelector(".knowledge-check fieldset");
const scheduledBefore = await page.evaluate(() => {
  const raw = localStorage.getItem("product-practice-v2:pm-fundamentals:reviews");
  return raw ? Object.keys(JSON.parse(raw)).length : 0;
});
const recallGroups = page.locator(".knowledge-check fieldset");
const recallCount = await recallGroups.count();
for (let index = 0; index < recallCount; index += 1) {
  await recallGroups.nth(index).locator(".answer-option").first().click();
}
await page.getByRole("button", { name: "Check my recall" }).click();
await page.waitForTimeout(700);
const scheduledAfter = await page.evaluate(() => {
  const raw = localStorage.getItem("product-practice-v2:pm-fundamentals:reviews");
  return raw ? Object.keys(JSON.parse(raw)).length : 0;
});
check(
  "A missed question schedules the cards that cover it",
  scheduledAfter > scheduledBefore,
  `${scheduledBefore} scheduled before, ${scheduledAfter} after`,
);
check(
  "The learner is told the queue grew",
  (await page.locator(".resurfaced-note").count()) === 1,
  "a queue that grows silently is indistinguishable from one that does not work",
);
const resurfacedDueNow = await page.evaluate(() => {
  const raw = localStorage.getItem("product-practice-v2:pm-fundamentals:reviews");
  const map = raw ? JSON.parse(raw) : {};
  const now = Date.now();
  return Object.values(map).filter((entry) => entry.due <= now).length;
});
check("Resurfaced cards are due immediately", resurfacedDueNow > 0, `${resurfacedDueNow} due now`);

// Failing used to yield a score and nothing else. Name the sections instead.
const revisitEntries = await page.locator(".revisit-panel button").count();
check(
  "A failed check names what to reread",
  revisitEntries > 0,
  "rereading the whole stage is the least efficient response to a failed check",
);
check(
  "Suggested sections exist on the page",
  await page.locator(".revisit-panel button").first().evaluate((el) => {
    const label = el.textContent.trim();
    return Array.from(document.querySelectorAll(".lesson-section h2")).some((h) => h.textContent.trim() === label);
  }),
);

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
await page.getByRole("heading", { name: "Build the complete capability chain" }).waitFor();
const masteredLabels = await page.locator(".mastered-label").count();
check("Imported backup restores mastery", masteredLabels >= 1, `found ${masteredLabels}`);

const restoredToolkit = await page.evaluate(() => localStorage.getItem("product-practice-v2:pm-fundamentals:toolkit"));
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

/* -- keyboard shortcuts, capstone briefs, worked cases -------------- */

await page.evaluate(() => { window.location.hash = "dashboard"; });
await page.waitForTimeout(300);
await page.keyboard.press("l");
await page.waitForTimeout(300);
check("Single-key shortcut navigates", (await page.evaluate(() => window.location.hash)) === "#path");

// Must NOT fire while typing — otherwise writing a capstone answer would
// teleport the learner away mid-sentence.
await page.evaluate(() => { window.location.hash = "capstone"; });
await page.waitForTimeout(400);
await page.locator(".capstone-steps textarea").first().fill("delivery ratio plan");
check(
  "Shortcuts are suppressed while typing in a field",
  (await page.evaluate(() => window.location.hash)) === "#capstone",
);

// Blur properly — body.focus() does not move focus off a textarea, so the
// app was correctly suppressing the shortcut and the test was wrong.
await page.evaluate(() => (document.activeElement instanceof HTMLElement ? document.activeElement.blur() : undefined));
await page.waitForTimeout(150);
await page.keyboard.press("?");
await page.waitForTimeout(300);
check("Question mark opens the shortcut panel", (await page.locator(".shortcut-panel").count()) === 1);
await page.keyboard.press("Escape");
await page.waitForTimeout(250);
check("Escape closes the shortcut panel", (await page.locator(".shortcut-panel").count()) === 0);

await page.evaluate(() => { window.location.hash = "capstone"; });
await page.waitForTimeout(400);
const briefCount = await page.locator(".brief-switch button").count();
check("Capstone offers multiple briefs", briefCount === 3, `found ${briefCount}`);

// Answers must be scoped per brief, or switching would silently overwrite work.
const firstAnswer = await page.locator(".capstone-steps textarea").first().inputValue();
await page.locator(".brief-switch button").nth(1).click();
await page.waitForTimeout(300);
const secondAnswer = await page.locator(".capstone-steps textarea").first().inputValue();
check(
  "Capstone answers are kept separately per brief",
  firstAnswer.length > 0 && secondAnswer === "",
  `brief 1 "${firstAnswer.slice(0, 20)}", brief 2 "${secondAnswer.slice(0, 20)}"`,
);
await page.locator(".brief-switch button").nth(0).click();
await page.waitForTimeout(300);
check(
  "Switching back restores the original brief's answers",
  (await page.locator(".capstone-steps textarea").first().inputValue()) === firstAnswer,
);

await page.evaluate(() => { window.location.hash = "cases"; });
await page.waitForTimeout(400);
const caseSteps = await page.locator(".case-steps > li").count();
check("Worked case renders its chain", caseSteps >= 5, `found ${caseSteps}`);
await page.locator(".case-switch button").nth(1).click();
await page.waitForTimeout(300);
check("Second case is the corrected one", (await page.locator(".case-summary.corrected").count()) === 1);

await page.evaluate(() => { window.location.hash = "module/outcomes"; });
await page.waitForTimeout(400);
check("Stages appearing in a case link to it", (await page.locator(".worked-pointer").count()) === 1);
// Reading-time estimates must not claim minute precision — "8 hr 10 min" on
// a guess about reading speed is false precision, not accuracy.
await page.evaluate(() => { window.location.hash = "dashboard"; });
await page.waitForTimeout(300);
const heroText = await page.locator(".hero").innerText();
check(
  "Course length is stated as a rounded estimate",
  /(about|~)\s*\d+(\.\d+)?( and a half)? hours/.test(heroText) && !/\d+ hr \d+ min/.test(heroText),
  heroText.split("\n").find((l) => /hour|hr/.test(l)) ?? "",
);

await page.evaluate(() => { window.location.hash = "guide"; });
await page.waitForTimeout(600);
const guideStages = await page.locator(".guide-stage").count();
check("Guide contains every stage", guideStages === 9, `found ${guideStages}`);
check("Guide has a contents list", (await page.locator(".guide-contents li").count()) >= 14);
check("Guide includes the glossary", (await page.locator(".guide-glossary > div").count()) >= 50);
check("Guide includes every worked case", (await page.locator(".guide-case").count()) === 4);
check("Guide carries a print-only cover", (await page.locator(".guide-cover").count()) === 1);
check(
  "Guide cover is hidden on screen",
  await page.locator(".guide-cover").evaluate((el) => getComputedStyle(el).display === "none"),
);
/*
 * In-page jumps must not re-route the app.
 *
 * The app routes on the location hash, so <a href="#stage-5"> was not an
 * anchor - it was a route matching nothing, and parseView collapsed anything
 * unknown to "dashboard". The guide's contents list therefore threw you back
 * to the home page, the field guide's jump list did the same, and so did the
 * skip link, which is the first control a keyboard user reaches.
 */
const contentsEntry = page.locator(".guide-contents button").filter({ hasText: "Roles, teams" });
check("Guide contents entries are controls, not fragment links", (await contentsEntry.count()) === 1);
await contentsEntry.click();
await page.waitForTimeout(1600);
check(
  "Jumping within the guide keeps you on the guide",
  (await page.locator(".guide-page").count()) === 1 &&
    (await page.evaluate(() => window.location.hash)).includes("guide"),
  await page.evaluate(() => window.location.hash),
);
const stageTop = await page.evaluate(() =>
  Math.round(document.getElementById("stage-7").getBoundingClientRect().top));
check("The jump lands on the section, clear of the fixed header", stageTop > 60 && stageTop < 160, `top ${stageTop}px`);
check(
  "Focus follows the jump",
  await page.evaluate(() => Boolean(document.activeElement?.closest("#stage-7"))),
);

await page.evaluate(() => { window.location.hash = "fieldguide"; });
await page.waitForTimeout(500);
await page.locator(".field-guide-nav button").nth(3).click();
await page.waitForTimeout(1200);
check("Field guide jump list keeps you on the field guide", (await page.locator(".field-guide").count()) === 1);

// The skip link is plain HTML in the template, so it stays an anchor; the
// router has to tolerate it rather than the link having to avoid the router.
await page.evaluate(() => { window.location.hash = "glossary"; });
await page.waitForTimeout(400);
await page.evaluate(() => document.querySelector(".skip-link").click());
await page.waitForTimeout(500);
check(
  "The skip link does not reset the view",
  (await page.locator(".hero h1").count()) === 0,
  "landing on the dashboard means the router swallowed the fragment",
);

await page.evaluate(() => { window.location.hash = "guide"; });
await page.waitForTimeout(600);

// A reading copy must not contain assessment.
const guideBodyText = await page.locator(".guide-page").innerText();
check(
  "Guide is assessment-free",
  !guideBodyText.includes("Check my recall") && (await page.locator(".guide-page .answer-option").count()) === 0,
);

/* -- the source deck ---------------------------------------------- */

await page.evaluate(() => { window.location.hash = "deck"; });
await page.waitForTimeout(500);
const deckThumbs = await page.locator(".deck-grid img").count();
check("Deck view shows every slide", deckThumbs === 98, `found ${deckThumbs}`);

// An <img> that 404s still renders an element, so count decoded pixels.
await page.locator(".deck-grid img").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
check(
  "Slide images actually load",
  await page.locator(".deck-grid img").first().evaluate((el) => el.complete && el.naturalWidth > 400),
);
check(
  "Thumbnails are lazily loaded",
  await page.locator(".deck-grid img").nth(40).evaluate((el) => el.loading === "lazy"),
  "without this the Pages build fetches all 98 on arrival",
);
check(
  "Slides have descriptive alt text, not just a number",
  await page.locator(".deck-grid img").first().evaluate((el) => /^Slide \d+: .{3,}/.test(el.alt)),
);

// Filtering by stage must actually narrow the set.
// Scoped to the filter row: the sidebar carries a button with the same name,
// and an unscoped .first() picked that one and navigated off the deck.
await page.locator(".deck-filter button").filter({ hasText: "Discovery and problem framing" }).click();
await page.waitForTimeout(300);
const filtered = await page.locator(".deck-grid img").count();
check("Stage filter narrows the deck", filtered === 15, `Stage 2 covers slides 21-35; found ${filtered}`);

// Back to the full deck before opening the lightbox: a filtered grid starts
// at slide 21, and a couple of section-divider slides carry a title and no
// body, which is legitimate but makes for a poor fixture.
await page.locator(".deck-filter button").filter({ hasText: /^All / }).click();
await page.waitForTimeout(300);

// The lightbox.
await page.locator(".deck-grid button").first().click();
await page.waitForSelector(".slide-lightbox");
check("Lightbox is a labelled modal dialog", await page.locator(".slide-lightbox").evaluate(
  (el) => el.getAttribute("role") === "dialog" && el.getAttribute("aria-modal") === "true" && !!el.getAttribute("aria-label"),
));
const firstSlideAlt = await page.locator(".slide-lightbox img").getAttribute("alt");
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(250);
check(
  "Arrow keys move through the deck",
  (await page.locator(".slide-lightbox img").getAttribute("alt")) !== firstSlideAlt,
);
check("Lightbox shows the slide's own words", (await page.locator(".slide-text p").innerText()).length > 10);
await page.keyboard.press("Escape");
await page.waitForTimeout(250);
check("Escape closes the lightbox", (await page.locator(".slide-lightbox").count()) === 0);
check(
  "Page scroll is restored after closing",
  await page.evaluate(() => getComputedStyle(document.body).overflow !== "hidden"),
);

// The point of the whole exercise: a citation inside a lesson opens its slide.
await page.evaluate(() => { window.location.hash = "module/discovery"; });
await page.waitForTimeout(500);
const citation = page.locator(".lesson-table caption .slide-cite").first();
check("Figure captions render their citation as a control", (await citation.count()) === 1);
const citationLabel = await citation.innerText();
await citation.click();
await page.waitForSelector(".slide-lightbox");
const openedAlt = (await page.locator(".slide-lightbox img").getAttribute("alt")) ?? "";
const citedNumber = /(\d+)/.exec(citationLabel)?.[1];
check(
  "A citation opens the slide it names",
  openedAlt.startsWith(`Slide ${citedNumber}:`),
  `caption said "${citationLabel.trim()}", lightbox opened "${openedAlt}"`,
);
await page.keyboard.press("Escape");
await page.waitForTimeout(200);

// Search must reach the deck's own wording, not only the course's paraphrase.
await page.evaluate(() => { window.location.hash = "search"; });
await page.waitForTimeout(300);
await page.getByRole("searchbox", { name: "Search the course" }).fill("Lagging Indicators");
await page.waitForTimeout(250);
check(
  "Search reaches the deck's own words",
  // The kind label is uppercased by CSS, and innerText reports what is rendered.
  (await page.locator(".search-result").allInnerTexts()).some((text) => /source deck/i.test(text)),
);

// Back to a stage page — the guide checks above navigated away.
await page.evaluate(() => { window.location.hash = "module/outcomes"; });
await page.waitForTimeout(500);
check("Stage carries a printable one-page summary", (await page.locator(".stage-print-summary").count()) === 1);
check("Print summary is hidden on screen", await page.locator(".stage-print-summary").evaluate((el) => getComputedStyle(el).display === "none"));
const contrastCount = await page.locator(".contrast").count();
check("Stage shows practice contrasts", contrastCount >= 2, `found ${contrastCount}`);
check(
  "Every contrast carries a diagnostic tell",
  (await page.locator(".contrast-tell").count()) === contrastCount,
  "a contrast without a tell is advice, not a check the learner can run",
);
// Search must reach the new material, or it is effectively invisible.
await page.evaluate(() => { window.location.hash = "search"; });
await page.waitForTimeout(300);
await page.getByRole("searchbox", { name: "Search the course" }).fill("vanity metric");
await page.waitForTimeout(250);
check("Search reaches contrasts and cases", (await page.locator(".search-result").count()) > 0);

/* -- accessibility ------------------------------------------------- */

// Stage sections enter with a short opacity animation. Axe can otherwise run
// while text is half-faded and report transient contrast failures that vanish
// a fraction of a second later. Motion itself is tested above; accessibility
// scans run in the stable reduced-motion state.
await page.emulateMedia({ reducedMotion: "reduce" });

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
  ["cases", "worked cases"],
  ["guide", "guide"],
  ["deck", "source deck"],
  ["sources", "sources"],
  ["divergences", "course additions"],
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

/*
  axe skips contrast on gradient backgrounds and reports "incomplete", so text
  over one can ship unreadable. Assert the real ratio rather than raw lightness:
  the first version of this check required luminance >= 170, which encoded the
  assumption that the hero is dark. It is light in the light theme, so the check
  failed the moment the palette gained colour — and it would have passed happily
  on dark text over a dark wash.
*/
await page.evaluate(() => { window.location.hash = "dashboard"; });
await page.waitForTimeout(300);
const gradientContrast = await page.evaluate(() => {
  const lum = (c) => {
    const [r, g, b] = c.match(/\d+/g).slice(0, 3).map(Number);
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const behind = (el) => {
    let node = el;
    while (node) {
      const bg = getComputedStyle(node).backgroundColor;
      if (bg && !bg.includes("rgba(0, 0, 0, 0)")) return bg;
      node = node.parentElement;
    }
    return getComputedStyle(document.body).backgroundColor;
  };
  const out = [];
  document.querySelectorAll(".metric-strip span, .metric-strip strong, .hero h1, .hero p").forEach((el) => {
    const a = lum(getComputedStyle(el).color);
    const b = lum(behind(el));
    out.push({
      text: (el.textContent || "").slice(0, 24),
      ratio: +(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2)),
    });
  });
  return out;
});
const lowContrast = gradientContrast.filter((item) => item.ratio < 4.5);
check(
  "Text over gradient panels meets AA against its own background",
  lowContrast.length === 0,
  lowContrast.length
    ? lowContrast.map((i) => `"${i.text}" ${i.ratio}:1`).join(", ")
    : `${gradientContrast.length} elements, worst ${Math.min(...gradientContrast.map((i) => i.ratio))}:1`,
);
await page.screenshot({ path: path.join(projectDir, "qa-desktop.png"), fullPage: false });

/* ---------------------------------------------------------------- *
 * Mobile pass
 * ---------------------------------------------------------------- */

const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobilePage = await mobileContext.newPage();
watchPage(mobilePage, "mobile");
await mobilePage.goto(artifactUrl, { waitUntil: "load" });
await mobilePage.getByRole("heading", { name: "Product Management Fundamentals" }).waitFor();

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
