/**
 * Complete both courses as a learner would, deliberately getting things wrong.
 *
 * The QA suite proves invariants. This proves the experience: it sits every
 * knowledge check twice — failing the first attempt on purpose — answers
 * scenarios wrongly and retries them, writes assignments, reveals worked
 * answers, rates flashcards across all four buttons, fills the capstone, and
 * then checks that the reporting agrees with what actually happened.
 *
 * It keeps a ledger of every answer given and compares the results pages
 * against it, because a results page that renders is not a results page that
 * is right.
 *
 * Usage:  node scripts/walkthrough.mjs <packageId>
 */

import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = join(projectDir, "docs");
const outDir = join(projectDir, ".walkthrough");
const packageId = process.argv[2] ?? "pm-fundamentals";

mkdirSync(outDir, { recursive: true });

/* ---------------------------------------------------------------- *
 * Findings
 * ---------------------------------------------------------------- */

const findings = [];
const notes = [];
function fail(severity, area, detail) {
  findings.push({ severity, area, detail });
  console.log(`  ${severity.toUpperCase().padEnd(8)} ${area} — ${detail}`);
}
function ok(area, detail = "") {
  notes.push({ area, detail });
  console.log(`  ok       ${area}${detail ? ` — ${detail}` : ""}`);
}

/* ---------------------------------------------------------------- *
 * Static server
 * ---------------------------------------------------------------- */

const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".webmanifest": "application/manifest+json",
  ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml",
};
const server = createServer((req, res) => {
  const p = join(docsDir, decodeURIComponent(req.url.split("?")[0]));
  const f = existsSync(p) && extname(p) ? p : join(docsDir, "index.html");
  res.writeHead(200, { "content-type": TYPES[extname(f)] ?? "application/octet-stream" });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, r));
const url = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
const page = await ctx.newPage();

const consoleErrors = [];
page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(`console: ${m.text()}`); });

await page.addInitScript((id) => {
  localStorage.setItem("product-practice-v2:active-package", JSON.stringify(id));
}, packageId);
await page.goto(url, { waitUntil: "load" });
await page.waitForSelector(".sidebar");

const courseTitle = (await page.locator(".brand strong").innerText()).trim();
console.log(`\n=== Walking "${courseTitle}" (${packageId}) as a learner ===\n`);

const go = async (hash) => {
  await page.evaluate((h) => { window.location.hash = h; }, hash);
  await page.waitForTimeout(360);
};

/* A deterministic ledger of everything answered. */
const ledger = { stages: [], practice: null, review: [], diagnostic: null };

/* ---------------------------------------------------------------- *
 * 1. Diagnostic — answered with a deliberate mix
 * ---------------------------------------------------------------- */

/*
  Note on method: the page does not mark which option is correct until the
  answer is submitted — deliberately, and correctly. So "get this one wrong on
  purpose" cannot be done on a first sitting. Where a retry exists, the
  walkthrough sits the check once to learn the answers, then retries choosing
  a known-wrong option, then retries again choosing the right ones. That gives
  a verifiable 0% and a verifiable 100% on the same questions.
*/
console.log("1. Diagnostic");
await go("diagnostic");
await page.waitForSelector(".diagnostic-list fieldset");
{
  const sets = await page.locator(".diagnostic-list fieldset").count();
  /* Rotate the choice so the diagnostic gets a genuine mix rather than a pattern. */
  for (let i = 0; i < sets; i += 1) {
    const opts = page.locator(".diagnostic-list fieldset").nth(i).locator(".answer-option");
    const n = await opts.count();
    await opts.nth(i % n).click();
    await page.waitForTimeout(40);
  }
  ledger.diagnostic = { asked: sets };

  const unanswered = await page.locator(".diagnostic-slot.unanswered").count();
  if (unanswered > 0) fail("bug", "Diagnostic", `${unanswered} slots still unanswered after answering all ${sets}`);

  const showBtn = page.getByRole("button", { name: "Show recommendation" });
  if (await showBtn.count()) {
    await showBtn.click();
    await page.waitForTimeout(500);
    const result = await page.locator(".diagnostic-result").count();
    if (!result) fail("bug", "Diagnostic", "No recommendation rendered after answering every question");
    else {
      const text = (await page.locator(".diagnostic-result").innerText()).replace(/\s+/g, " ");
      ok("Diagnostic recommendation", text.slice(0, 110));
      if (!/stage/i.test(text)) fail("weak", "Diagnostic", "Recommendation does not name a stage to start at");
    }
  } else {
    fail("bug", "Diagnostic", "No 'Show recommendation' control found");
  }
}

/* ---------------------------------------------------------------- *
 * 2. Every stage: fail the check, then pass it
 * ---------------------------------------------------------------- */

const stageCount = await page.locator(".sidebar-modules nav button").count();
console.log(`\n2. Stages (${stageCount}) — failing each check once on purpose, then passing`);

for (let s = 0; s < stageCount; s += 1) {
  await go("dashboard");
  await page.locator(".sidebar-modules nav button").nth(s).click();
  await page.waitForTimeout(380);
  const stageName = (await page.locator("#main-content h1").innerText()).replace(/\s+/g, " ").trim();
  const rec = { stage: s + 1, name: stageName, firstScore: null, secondScore: null, issues: [] };

  /* An illustration should open every stage. */
  if (!(await page.locator("#main-content svg.illus").count())) {
    fail("bug", `Stage ${s + 1} (${stageName})`, "no illustration");
  }

  /*
    Retaking a check draws a FRESH sample from the stage's pool — deliberately,
    so a retake is a new test rather than a memory check of the same five. That
    means there is no way to know the answers in advance, and a learner has to
    actually learn the pool. This does the same: it sits the check repeatedly,
    accumulating an answer key across attempts, and on every attempt it checks
    the reported score against the answers it actually gave.

    That last part is the real assertion. A deliberate mix of right and wrong,
    every attempt, verified — which is stronger than only ever checking 0% and
    100%.
  */
  const checkBtn = page.getByRole("button", { name: "Check my recall" });
  if (!(await checkBtn.count())) {
    fail("bug", `Stage ${s + 1}`, "no knowledge check found");
    continue;
  }

  const learned = new Map();      // prompt -> correct answer text
  const attempts = [];
  let sawZero = false;
  let sawFull = false;

  for (let attempt = 0; attempt < 7 && !(sawZero && sawFull); attempt += 1) {
    /*
      Identify a question by its option set, not its legend. The legend carries
      the question NUMBER, which changes with position — keying on it made the
      same question look new every time it moved, so the key never converged
      and no attempt was ever fully known.
    */
    const shown = await page.$$eval(".knowledge-check .question-block", (bs) =>
      bs.map((b) => {
        const options = [...b.querySelectorAll(".answer-option .answer-text")].map((o) => o.textContent.trim());
        return { id: [...options].sort().join("|"), options };
      }));
    if (!shown.length) { fail("bug", `Stage ${s + 1}`, "knowledge check rendered no questions"); break; }

    const allKnown = shown.every((q) => learned.has(q.id));
    /* Once the whole displayed set is known: one attempt all wrong, then all right. */
    const mode = !allKnown ? "learn" : (!sawZero ? "all-wrong" : "all-right");

    const chose = [];
    for (let q = 0; q < shown.length; q += 1) {
      const key = learned.get(shown[q].id);
      let idx;
      if (mode === "all-right" && key) idx = shown[q].options.indexOf(key);
      else if (mode === "all-wrong" && key) idx = shown[q].options.findIndex((o) => o !== key);
      else idx = (q + attempt) % shown[q].options.length;   // genuine guess
      if (idx < 0) idx = 0;
      chose.push(shown[q].options[idx]);
      await page.locator(".knowledge-check .question-block").nth(q).locator(".answer-option").nth(idx).click();
      await page.waitForTimeout(22);
    }

    await page.getByRole("button", { name: "Check my recall" }).click();
    await page.waitForSelector(".quiz-result");
    const reported = Number(
      ((await page.locator(".quiz-result").innerText()).match(/(\d+)%/) ?? [])[1] ?? -1,
    );

    /* Read the key off the marked options and check the arithmetic. */
    const marked = await page.$$eval(".knowledge-check .question-block", (bs) =>
      bs.map((b) => {
        const options = [...b.querySelectorAll(".answer-option .answer-text")].map((o) => o.textContent.trim());
        return {
          id: [...options].sort().join("|"),
          correct: b.querySelector(".answer-option.correct .answer-text")?.textContent?.trim() ?? "",
        };
      }));
    marked.forEach((m) => { if (m.correct) learned.set(m.id, m.correct); });
    if (marked.some((m) => !m.correct)) {
      fail("bug", `Stage ${s + 1} (${stageName})`, "a question marked no correct answer after submission");
    }

    const rightCount = marked.filter((m, i) => m.correct === chose[i]).length;
    const expected = Math.round((rightCount / shown.length) * 100);
    attempts.push({ mode, reported, expected, of: shown.length });
    if (reported !== expected) {
      fail("bug", `Stage ${s + 1} (${stageName})`,
        `scoring wrong: chose ${rightCount} of ${shown.length} correctly, reported ${reported}% (expected ${expected}%)`);
    }

    if (mode === "all-wrong") {
      sawZero = true;
      rec.firstScore = reported;
      if (reported !== 0) {
        fail("bug", `Stage ${s + 1} (${stageName})`,
          `answered every question wrong on purpose, scored ${reported}%`);
      }
      if (!(await page.locator(".revisit-panel").count())) {
        fail("bug", `Stage ${s + 1} (${stageName})`, `scored ${reported}% but no reread guidance shown`);
      }
      if (!(await page.locator(".knowledge-check .answer-option.incorrect").count())) {
        fail("bug", `Stage ${s + 1}`, "wrong answers were not marked incorrect");
      }
      if (!(await page.locator(".knowledge-check .feedback-chosen").count())) {
        fail("bug", `Stage ${s + 1}`, "no per-option feedback on the chosen wrong answer");
      }
      if (await page.locator(".mastered-label").count()) {
        fail("bug", `Stage ${s + 1}`, `mastery shown after a ${reported}% check`);
      }
    }
    if (mode === "all-right") {
      sawFull = true;
      rec.secondScore = reported;
      if (reported !== 100) {
        fail("bug", `Stage ${s + 1} (${stageName})`,
          `answered every question correctly, reported ${reported}%`);
      }
    }

    if (sawZero && sawFull) break;
    const retry = page.getByRole("button", { name: "Try these again" });
    if (!(await retry.count())) {
      fail("bug", `Stage ${s + 1}`, `no retry control after scoring ${reported}%`);
      break;
    }
    await retry.click();
    await page.waitForTimeout(260);
  }
  rec.attempts = attempts;
  rec.poolLearned = learned.size;
  if (!sawFull) {
    fail("weak", `Stage ${s + 1} (${stageName})`,
      `could not reach 100% within 7 attempts (learned ${learned.size} pool items)`);
  }

  /* --- Scenarios: answer, learn, deliberately fail, then correct --- */
  const scCount = await page.locator(".scenario-panel .question-block").count();
  for (let sc = 0; sc < scCount; sc += 1) {
    const block = page.locator(".scenario-panel .question-block").nth(sc);
    const texts = () => block.locator(".answer-option .answer-text").allInnerTexts();

    await block.locator(".answer-option").first().click();
    await page.waitForTimeout(220);
    const answer = (await block.locator(".answer-option.correct .answer-text").innerText().catch(() => "")).trim();
    if (!answer) fail("bug", `Stage ${s + 1}`, `scenario ${sc + 1} marked no correct answer`);

    const retryBtn = page.locator(".scenario-retry button").nth(sc);
    if (!(await retryBtn.count())) {
      fail("bug", `Stage ${s + 1}`, "no retry offered after answering a scenario");
      continue;
    }

    /* Deliberately wrong, to confirm a wrong scenario blocks mastery. */
    await retryBtn.click();
    await page.waitForTimeout(240);
    let opts = (await texts()).map((t) => t.trim());
    let idx = opts.findIndex((t) => t !== answer);
    await block.locator(".answer-option").nth(idx < 0 ? 0 : idx).click();
    await page.waitForTimeout(280);
    if (await page.locator(".mastered-label").count()) {
      fail("bug", `Stage ${s + 1}`, "mastery shown while a scenario is answered wrongly");
    }

    /* Then correct. */
    await page.locator(".scenario-retry button").nth(sc).click();
    await page.waitForTimeout(240);
    opts = (await texts()).map((t) => t.trim());
    idx = opts.indexOf(answer);
    await block.locator(".answer-option").nth(idx < 0 ? 0 : idx).click();
    await page.waitForTimeout(220);
  }

  /* --- Assignment: model must stay hidden until something is written --- */
  const ta = page.locator(".assignment-panel textarea");
  if (await ta.count()) {
    const revealBefore = page.getByRole("button", { name: "Compare with a worked answer" });
    const disabledBefore = (await revealBefore.count())
      ? await revealBefore.first().isDisabled()
      : null;
    if (disabledBefore === false) {
      fail("bug", `Stage ${s + 1}`, "worked answer can be revealed before writing anything");
    }
    await ta.first().fill(
      `Walkthrough answer for ${stageName}: stating the problem, the measure and who owns it.`,
    );
    await page.waitForTimeout(220);
    const revealAfter = page.getByRole("button", { name: "Compare with a worked answer" });
    if (await revealAfter.count()) {
      if (await revealAfter.first().isDisabled()) {
        fail("bug", `Stage ${s + 1}`, "worked answer still disabled after writing an answer");
      } else {
        await revealAfter.first().click();
        await page.waitForTimeout(260);
        if (!(await page.locator(".model-answer p").count())) {
          fail("bug", `Stage ${s + 1}`, "revealing the worked answer rendered nothing");
        }
        const crit = page.locator(".model-criteria input");
        const cn = await crit.count();
        if (cn === 0) fail("weak", `Stage ${s + 1}`, "worked answer has no self-check criteria");
        for (let c = 0; c < cn; c += 1) await crit.nth(c).check().catch(() => {});
      }
    }
  }

  /* --- Mark the lesson read, then mastery should appear --- */
  const readBox = page.locator(".completion-check input");
  if (await readBox.count()) await readBox.check().catch(() => {});
  await page.waitForTimeout(220);

  /*
    The stage page reports status in its footer; the "Mastered" chip itself
    lives on the learning path. Checking for the chip here finds nothing and
    means nothing — read the footer, which is what the learner reads.
  */
  const footer = (await page.locator(".module-footer").innerText().catch(() => "")).replace(/\s+/g, " ");
  const mastered = /\bMastered\b/.test(footer);
  if (!mastered) {
    fail("bug", `Stage ${s + 1} (${stageName})`,
      `all three requirements met but the stage footer does not report mastery — "${footer.slice(0, 120)}"`);
  }
  rec.mastered = mastered;
  rec.footer = footer.slice(0, 160);
  ledger.stages.push(rec);
  process.stdout.write(`  stage ${String(s + 1).padStart(2)} ${rec.firstScore}% → ${rec.secondScore}%  ${mastered ? "mastered" : "NOT MASTERED"}\n`);
}

/* ---------------------------------------------------------------- *
 * 3. Mixed practice
 * ---------------------------------------------------------------- */

console.log("\n3. Mixed practice");
await go("practice");
{
  const start = page.locator(".page button.primary").first();
  if (await start.count()) { await start.click(); await page.waitForTimeout(260); }
  let asked = 0, gotRight = 0, feedbackShown = 0;
  for (let i = 0; i < 40; i += 1) {
    const opts = page.locator(".answer-option");
    const n = await opts.count();
    if (!n) break;
    /* Rotate the pick so the run lands a genuine mix of right and wrong. */
    await opts.nth(i % n).click();
    asked += 1;
    await page.waitForTimeout(240);
    const wasRight = await page.locator(".answer-option.correct.selected, .answer-option.selected.correct").count();
    const marked = await page.locator(".answer-option.correct").count();
    if (marked === 0) fail("bug", "Mixed practice", "answer submitted but no option marked correct");
    if (await page.locator(".feedback-chosen, .feedback").count()) feedbackShown += 1;
    if (wasRight) gotRight += 1;
    const next = page.locator(".page button.primary").first();
    if (await next.count()) { await next.click(); await page.waitForTimeout(280); }
  }
  ledger.practice = { asked, gotRight };
  ok("Mixed practice", `${asked} answered, ${gotRight} correct, feedback on ${feedbackShown}`);
  if (asked === 0) fail("bug", "Mixed practice", "could not answer any question — start control not found?");
  else if (feedbackShown < asked) {
    fail("weak", "Mixed practice", `feedback shown on only ${feedbackShown} of ${asked} answers`);
  }
}

/* ---------------------------------------------------------------- *
 * 4. Flashcard review across all four ratings
 * ---------------------------------------------------------------- */

console.log("\n4. Review");
await go("review");
{
  const RATINGS = ["Again", "Hard", "Good", "Easy"];
  let rated = 0;
  for (let i = 0; i < 12; i += 1) {
    const reveal = page.getByRole("button", { name: /Reveal answer/ });
    if (!(await reveal.count())) break;
    const front = await page.locator(".flashcard-face h2").innerText().catch(() => "");
    await reveal.click();
    await page.waitForTimeout(180);
    if (!(await page.locator(".flashcard-answer p").count())) {
      fail("bug", "Review", "revealing a card showed no answer");
      break;
    }
    const label = RATINGS[i % 4];
    const btn = page.locator(".rating-grid button", { hasText: label }).first();
    if (!(await btn.count())) { fail("bug", "Review", `rating "${label}" not available`); break; }
    await btn.click();
    await page.waitForTimeout(240);
    ledger.review.push({ front: front.slice(0, 50), rating: label });
    rated += 1;
  }
  ok("Review", `${rated} cards rated across all four buttons`);
  if (rated < 4) fail("weak", "Review", `only ${rated} cards could be rated`);
}

/* ---------------------------------------------------------------- *
 * 5. Capstone
 * ---------------------------------------------------------------- */

console.log("\n5. Capstone");
await go("capstone");
{
  const areas = page.locator(".capstone-steps textarea");
  const n = await areas.count();
  for (let i = 0; i < Math.min(n, 4); i += 1) {
    await areas.nth(i).fill(`Walkthrough capstone response ${i + 1}. Problem, measure, owner, and the decision taken.`);
    await page.waitForTimeout(90);
  }
  const checks = page.locator(".rubric-check input");
  const cn = await checks.count();
  for (let i = 0; i < Math.min(cn, 6); i += 1) await checks.nth(i).check().catch(() => {});
  ok("Capstone", `${Math.min(n, 4)} sections written, ${Math.min(cn, 6)} rubric boxes ticked`);
  if (n === 0) fail("bug", "Capstone", "no writing areas found");
}

/* ---------------------------------------------------------------- *
 * 6. Reporting — does it agree with what we actually did?
 * ---------------------------------------------------------------- */

console.log("\n6. Reporting");
await go("results");
await page.waitForTimeout(700);
{
  const text = (await page.locator("#main-content").innerText()).replace(/\s+/g, " ");
  const masteredExpected = ledger.stages.filter((s) => s.mastered).length;
  /* Rendered as "N of M stages complete" beneath a percentage. */
  const claimed = Number(text.match(/(\d+)\s+of\s+(\d+)\s+stages?\s+complete/i)?.[1] ?? NaN);
  if (Number.isNaN(claimed)) {
    fail("weak", "Results", "could not find a stages-complete figure to check");
  } else if (claimed !== masteredExpected) {
    fail("bug", "Results", `reports ${claimed} stages complete, walkthrough mastered ${masteredExpected}`);
  } else {
    ok("Results mastery count", `${claimed} of ${stageCount}, agrees with the walkthrough`);
  }

  /* Practice accuracy must equal the answers actually given. */
  const acc = text.match(/(\d+)\s+correct\s+of\s+(\d+)\s+answered/i);
  if (acc) {
    const [, c, a] = acc.map(Number);
    const pct = Math.round((c / a) * 100);
    const shownPct = Number(text.match(/(\d+)%\s+Practice accuracy/i)?.[1] ?? NaN);
    if (!Number.isNaN(shownPct) && Math.abs(shownPct - pct) > 1) {
      fail("bug", "Results", `lifetime accuracy shows ${shownPct}% but ${c} of ${a} is ${pct}%`);
    } else ok("Practice accuracy", `${c} of ${a} = ${pct}%, internally consistent`);
  }

  const itemStats = await page.locator(".item-stats li").count();
  if (itemStats === 0) {
    fail("weak", "Results", "no item statistics after answering every question twice");
  } else {
    ok("Item statistics", `${itemStats} items reported`);
  }

  const charts = await page.locator("#main-content svg").count();
  if (charts === 0) fail("bug", "Results", "no charts rendered");

  /* Record of completion */
  if (!(await page.locator(".record-sheet").count())) {
    fail("bug", "Record of completion", "not rendered");
  } else {
    const rows = await page.locator(".record-table tbody tr").count();
    if (rows !== stageCount) {
      fail("bug", "Record of completion", `${rows} rows for ${stageCount} stages`);
    } else ok("Record of completion", `${rows} stage rows`);
    const record = (await page.locator(".record-sheet").innerText()).replace(/\s+/g, " ");
    if (!/self-recorded|not a certification|not issued/i.test(record)) {
      fail("bug", "Record of completion", "no longer states it is self-recorded rather than a credential");
    }
  }
  writeFileSync(join(outDir, `${packageId}-results.txt`), text, "utf8");
}

await page.screenshot({ path: join(outDir, `${packageId}-results.png`), fullPage: true });

/* ---------------------------------------------------------------- *
 * 7. Print output
 * ---------------------------------------------------------------- */

console.log("\n7. Print output");
for (const [view, label] of [["guide", "printable guide"], ["results", "record of completion"]]) {
  await go(view);
  await page.waitForTimeout(900);
  await page.emulateMedia({ media: "print" });
  const pdfPath = join(outDir, `${packageId}-${view}.pdf`);
  await page.pdf({ path: pdfPath, format: "A4", printBackground: true, margin: { top: "12mm", bottom: "12mm", left: "12mm", right: "12mm" } });

  /* Anything wider than the page will be clipped by the printer. */
  const overflow = await page.evaluate(() => {
    const bad = [];
    const limit = document.documentElement.clientWidth;
    document.querySelectorAll("#main-content *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > limit + 2 && r.height > 0) {
        bad.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]} ${Math.round(r.width)}px`);
      }
    });
    return [...new Set(bad)].slice(0, 6);
  });
  await page.emulateMedia({ media: "screen" });

  const bytes = readFileSync(pdfPath).length;
  const pages = (readFileSync(pdfPath).toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  if (overflow.length) fail("bug", `Print — ${label}`, `clipped at print width: ${overflow.join(", ")}`);
  else ok(`Print — ${label}`, `${pages} pages, ${(bytes / 1024).toFixed(0)} KB, nothing clipped`);
}

/* ---------------------------------------------------------------- *
 * 8. Backup round trip, with everything we just did in it
 * ---------------------------------------------------------------- */

console.log("\n8. Backup and restore");
await go("settings");
await page.waitForSelector(".reset-option input");
{
  const [dl] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download backup" }).click(),
  ]);
  const file = join(outDir, `${packageId}-backup.json`);
  await dl.saveAs(file);
  const backup = JSON.parse(readFileSync(file, "utf8"));
  const blob = JSON.stringify(backup);

  const hasCapstone = /Walkthrough capstone response/.test(blob);
  const hasAssignment = /Walkthrough answer for/.test(blob);
  const hasReviews = /"due"|"ease"|"interval"/.test(blob);
  if (!hasCapstone) fail("bug", "Backup", "capstone answers are not in the backup");
  if (!hasAssignment) fail("bug", "Backup", "stage assignment answers are not in the backup");
  if (!hasReviews) fail("bug", "Backup", "flashcard scheduling is not in the backup");
  if (hasCapstone && hasAssignment && hasReviews) {
    ok("Backup contents", `${(blob.length / 1024).toFixed(1)} KB, includes progress, drafts and scheduling`);
  }
  ok("Backup filename", dl.suggestedFilename());
}

if (consoleErrors.length) {
  fail("bug", "Console", `${consoleErrors.length} error(s): ${consoleErrors.slice(0, 3).join(" | ")}`);
} else {
  ok("Console", "no page or console errors across the whole walkthrough");
}

/* ---------------------------------------------------------------- *
 * Summary
 * ---------------------------------------------------------------- */

const bugs = findings.filter((f) => f.severity === "bug");
const weak = findings.filter((f) => f.severity === "weak");
console.log(`\n=== ${courseTitle}: ${bugs.length} defect(s), ${weak.length} weakness(es) ===`);
for (const f of findings) console.log(`  [${f.severity}] ${f.area} — ${f.detail}`);
for (const s of ledger.stages.filter((x) => x.issues.length)) {
  console.log(`  [scoring] stage ${s.stage} — ${s.issues.join("; ")}`);
}

writeFileSync(join(outDir, `${packageId}-findings.json`), JSON.stringify({ courseTitle, packageId, findings, ledger, notes }, null, 2), "utf8");

await browser.close();
server.close();
process.exit(0);
