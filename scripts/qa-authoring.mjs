/** Browser and output-boundary verification for Course Workshop. */

import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "playwright";
import { copyFile, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { strFromU8, unzipSync } from "fflate";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const studioFile = path.join(projectDir, "Course-Authoring-Studio.html");
const publishedStudioFile = path.join(projectDir, "docs", "course-workshop", "index.html");
const qaDir = path.join(projectDir, ".qa-authoring");
const releaseFixtureDir = path.join(projectDir, ".qa-release");
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

const longBody = (subject) => Array.from(
  { length: 165 },
  (_, index) => `${subject} evidence ${index + 1} connects the learner's judgement to an observable workplace decision.`,
).join(" ");

function question(id, moduleId, prompt) {
  return {
    id,
    moduleId,
    prompt,
    options: [
      "Check the evidence and name the decision before acting",
      "Use the familiar template and assume the evidence will follow",
      "Wait for complete certainty before naming any next step",
      "Copy the previous answer without testing the current context",
    ],
    answer: 0,
    rationale: "The defensible response connects current evidence to the decision and records what remains uncertain.",
    optionNotes: [
      "",
      "A familiar template does not establish that its assumptions hold here.",
      "Decisions often need an explicit uncertainty statement rather than indefinite delay.",
      "Previous wording is not evidence about the current context.",
    ],
  };
}

function validPackage() {
  const moduleId = "evidence-to-action";
  const questions = Array.from({ length: 4 }, (_, index) => question(`knowledge-${index + 1}`, moduleId, `Which response best handles evidence question ${index + 1}?`));
  const scenarios = Array.from({ length: 2 }, (_, index) => ({
    ...question(`scenario-${index + 1}`, moduleId, `What should the team do in scenario ${index + 1}?`),
    context: "A delivery team has a time-bound decision, mixed evidence and an accountable owner who needs a recommendation today.",
  }));
  const modelAnswer = Array.from({ length: 110 }, (_, index) => `word${index + 1}`).join(" ");
  return {
    manifest: {
      schemaVersion: 1,
      version: "0.1.0",
      id: "workshop-fixture",
      title: "Evidence to Action",
      subtitle: "Make a defensible decision from incomplete information",
      publisher: "Training Team",
      source: "the approved evidence and decision practice guide",
      reviewed: "21 August 2026",
      status: "available",
      summary: "A compact course for turning evidence into a transparent decision and next action.",
      arc: "From evidence to an accountable next step",
    },
    content: {
      modules: [{
        id: moduleId,
        number: 1,
        title: "Connect evidence to the decision",
        subtitle: "Name what is known, what is inferred and what happens next",
        minutes: 5,
        slides: "",
        outcome: "Produce a decision statement that distinguishes evidence, inference and action.",
        coreIdea: "Evidence becomes useful when it is tied to a named decision, an accountable owner and an explicit uncertainty.",
        sections: [
          { heading: "Start with the decision", body: longBody("Decision"), sourceIds: ["practice-guide"] },
          { heading: "Show the evidence chain", body: longBody("Evidence"), sourceIds: ["practice-guide"] },
        ],
        questions,
        scenarios,
        assignment: {
          title: "Write the recommendation",
          instruction: "Draft a recommendation for the decision owner.",
          prompts: ["Name the decision, evidence, uncertainty, owner and next action."],
          modelAnswer,
          criteria: ["The decision is explicit", "Evidence and inference are separated"],
        },
      }],
      sources: [{
        id: "practice-guide",
        title: "Evidence and decision practice guide",
        publisher: "Training Team",
        note: "The governing source for the course's decision and evidence method.",
        checked: "21 August 2026",
      }],
      totalMinutes: 5,
      practiceQuestions: [],
      diagnosticQuestions: [question("diagnostic-1", moduleId, "Which statement best connects evidence to a decision?")],
      supplementaryQuestions: [],
      flashcards: [
        { id: "card-definition", moduleId, kind: "definition", front: "What is decision evidence?", back: "Information relevant to a named choice and its consequences." },
        { id: "card-application", moduleId, kind: "application", front: "How do you apply incomplete evidence?", back: "State the inference, uncertainty, owner and next action explicitly." },
        { id: "card-discrimination", moduleId, kind: "discrimination", front: "Evidence or assertion?", back: "Evidence is traceable; an assertion is merely stated." },
      ],
      glossary: [{ term: "Decision evidence", definition: "Information evaluated for a named choice.", origin: "Course", moduleId }],
      caseStudies: [],
      contrasts: [{ moduleId, good: "Traceable evidence linked to a named decision", usual: "A confident recommendation with no evidence chain", tell: "Another reader can reproduce how the recommendation follows from the cited material" }],
      divergences: [],
      toolkitTemplates: [],
      capstoneSteps: [],
      capstoneBriefs: [],
      capstoneRubric: [],
      fieldGuide: [],
      exemplars: [],
      slides: [],
      slideCount: 0,
      contentReviewed: "21 August 2026",
    },
  };
}

const approvedRelease = {
  subjectMatterChecked: true,
  learningFlowChecked: true,
  handlingChecked: true,
  releaseApproved: true,
  approvalReference: "QA fixture approval",
  approvalDate: "2026-08-21",
};

await rm(qaDir, { recursive: true, force: true });
await mkdir(qaDir, { recursive: true });
await rm(releaseFixtureDir, { recursive: true, force: true });
await mkdir(releaseFixtureDir, { recursive: true });

const [offlineStudioSource, publishedStudioSource] = await Promise.all([
  readFile(studioFile, "utf8"),
  readFile(publishedStudioFile, "utf8"),
]);
check("Published Course Workshop is byte-identical to the offline repository copy", offlineStudioSource === publishedStudioSource);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const consoleErrors = [];
const networkRequests = [];
page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
page.on("request", (request) => { if (/^https?:/i.test(request.url())) networkRequests.push(request.url()); });

await page.goto(pathToFileURL(studioFile).href);
await page.waitForSelector(".studio-shell");
check("Course Workshop opens as a local standalone file", await page.title() === "Course Workshop — Product Practice");
check("A new course is blocked until required content is written", await page.locator(".status-blocked").count() === 1);
check("The built-in instructional page explains all three learner delivery routes", /offline HTML course.*host it at its own URL.*combined catalogue/is.test(await page.locator("body").innerText()));
check("The studio makes its local-only boundary visible", /not uploaded/i.test(await page.locator(".privacy-banner").innerText()));
check("The studio makes no network requests", networkRequests.length === 0, networkRequests[0] ?? "offline only");
const instructionAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
const instructionSerious = instructionAxe.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
check("Workshop instructions have no serious or critical automated accessibility violations", instructionSerious.length === 0, instructionSerious.map((item) => `${item.id}: ${item.nodes[0]?.html ?? ""}`).join(" | "));

await page.getByRole("button", { name: /Review & export/ }).click();
check("Learner export is disabled for an incomplete draft", await page.getByRole("button", { name: "Export training HTML" }).isDisabled());
check("Repository export is disabled for an incomplete draft", await page.getByRole("button", { name: "Export repository ZIP" }).isDisabled());

await page.getByRole("button", { name: /Teach/ }).click();
await page.getByLabel("Title").first().fill("Local persistence check");
await page.waitForTimeout(400);
const saved = await page.evaluate((key) => window.localStorage.getItem(key), "product-practice:course-workshop:draft-v1");
check("Draft changes autosave to a workshop-specific storage key", Boolean(saved?.includes("Local persistence check")));

const fixture = validPackage();
const brokenFixture = structuredClone(fixture);
brokenFixture.content.modules[0].questions[0].optionNotes = ["", "", "", ""];
const reviewFixture = structuredClone(fixture);
reviewFixture.manifest.status = "in-development";
await page.locator('input[type="file"]').setInputFiles({
  name: "deliberately-broken-course-draft.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify({ draftSchemaVersion: 1, savedAt: new Date().toISOString(), package: brokenFixture, release: approvedRelease })),
});
await page.waitForSelector("text=Loaded deliberately-broken-course-draft.json");
await page.getByRole("button", { name: /Review & export/ }).click();
await page.waitForSelector(".readiness.blocked");
check("A deliberately broken distractor-feedback rule blocks export", await page.getByRole("button", { name: "Export training HTML" }).isDisabled());

await page.locator('input[type="file"]').setInputFiles({
  name: "workshop-fixture-under-review.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify({ draftSchemaVersion: 1, savedAt: new Date().toISOString(), package: reviewFixture, release: approvedRelease })),
});
await page.waitForSelector("text=Loaded workshop-fixture-under-review.json");
await page.getByRole("button", { name: /Review & export/ }).click();
await page.waitForSelector(".readiness.pending");
check("Clean content remains unreleased until its status is Available", await page.getByRole("button", { name: "Export training HTML" }).isDisabled());

await page.locator('input[type="file"]').setInputFiles({
  name: "workshop-fixture-course-draft.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify({ draftSchemaVersion: 1, savedAt: new Date().toISOString(), package: fixture, release: approvedRelease })),
});
await page.waitForSelector("text=Loaded workshop-fixture-course-draft.json");
await page.getByRole("button", { name: /Review & export/ }).click();
await page.waitForSelector(".readiness.ready");
check("A complete draft clears every blocking authoring check", (await page.locator(".issue.error").count()) === 0);
check("Final outputs require and accept a complete human release record", !(await page.getByRole("button", { name: "Export repository ZIP" }).isDisabled()));
check("Optional advanced learning elements remain honest warnings or notes", (await page.locator(".issue.warning, .issue.note").count()) >= 2);

const studioAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
const studioSerious = studioAxe.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
check("Course Workshop has no serious or critical automated accessibility violations", studioSerious.length === 0, studioSerious.map((item) => `${item.id}: ${item.nodes[0]?.html ?? ""}`).join(" | "));
const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
check("Course Workshop has no desktop horizontal overflow", noOverflow);

const [htmlDownload] = await Promise.all([
  page.waitForEvent("download"),
  page.getByRole("button", { name: "Export training HTML" }).click(),
]);
const learnerFile = path.join(qaDir, "workshop-fixture.html");
await htmlDownload.saveAs(learnerFile);
const learnerSource = await readFile(learnerFile, "utf8");
check("Learner export contains the canonical authored package", learnerSource.includes('id="authored-package-data"') && learnerSource.includes("workshop-fixture"));
check("Learner export strips all authoring controls", !learnerSource.includes("Course Workshop") && !learnerSource.includes("Load draft"));
check("Learner export is self-contained", !/<script[^>]+src=|<link[^>]+href=/i.test(learnerSource));

const [zipDownload] = await Promise.all([
  page.waitForEvent("download"),
  page.getByRole("button", { name: "Export repository ZIP" }).click(),
]);
const zipFile = path.join(qaDir, "workshop-fixture-course-package.zip");
await zipDownload.saveAs(zipFile);
await copyFile(zipFile, path.join(releaseFixtureDir, "workshop-fixture-course-package.zip"));
const zipped = unzipSync(new Uint8Array(await readFile(zipFile)));
const zipNames = Object.keys(zipped).sort();
const expectedRoot = "workshop-fixture-course-package";
check("Developer ZIP owns one explicit package root", zipNames.every((name) => name.startsWith(`${expectedRoot}/`)));
check("Developer ZIP contains the canonical course folder", zipNames.includes(`${expectedRoot}/src/courses/workshop-fixture/course-package.json`) && zipNames.includes(`${expectedRoot}/src/courses/workshop-fixture/index.ts`));
check("Repository ZIP contains installation, hosted-page, validation and release records", zipNames.includes(`${expectedRoot}/README.md`) && zipNames.includes(`${expectedRoot}/CATALOGUE-ENTRY.txt`) && zipNames.includes(`${expectedRoot}/validation-report.json`) && zipNames.includes(`${expectedRoot}/release-record.json`) && zipNames.includes(`${expectedRoot}/hosted/index.html`));
check("Developer ZIP contains no unsafe traversal path", zipNames.every((name) => !name.includes("..") && !path.isAbsolute(name)));
const report = JSON.parse(strFromU8(zipped[`${expectedRoot}/validation-report.json`]));
const releaseRecord = JSON.parse(strFromU8(zipped[`${expectedRoot}/release-record.json`]));
check("Validation report and release record keep automated and declared evidence distinct", report.releaseReady === true && /neither record is independent review evidence/i.test(report.statement) && releaseRecord.checklistComplete === true);

const [hostedDownload] = await Promise.all([
  page.waitForEvent("download"),
  page.getByRole("button", { name: "Export hosted-course ZIP" }).click(),
]);
const hostedFile = path.join(qaDir, "workshop-fixture-hosted-course.zip");
await hostedDownload.saveAs(hostedFile);
const hostedZip = unzipSync(new Uint8Array(await readFile(hostedFile)));
const hostedNames = Object.keys(hostedZip);
check("Hosted-course ZIP is isolated and contains only its page, guidance and release record", hostedNames.includes("workshop-fixture-hosted-course/index.html") && hostedNames.includes("workshop-fixture-hosted-course/README.md") && hostedNames.includes("workshop-fixture-hosted-course/release-record.json") && hostedNames.every((name) => name.startsWith("workshop-fixture-hosted-course/")));

const learner = await context.newPage();
const learnerErrors = [];
learner.on("console", (message) => { if (message.type() === "error") learnerErrors.push(message.text()); });
await learner.goto(pathToFileURL(learnerFile).href);
await learner.waitForSelector(".app-shell");
check("Exported learner course boots in the real shared player", /Evidence to Action/i.test(await learner.locator("body").innerText()));
check("Single-course export omits package-switching chrome", await learner.locator(".package-switcher, .library-link").count() === 0);
await learner.evaluate(() => { window.location.hash = "module/evidence-to-action"; });
await learner.waitForSelector(".stage-illustration svg.illus");
// The shared player uses a 260 ms page-entry fade. Axe measures the transient
// composited colour if it runs while that animation is still in flight.
await learner.waitForTimeout(400);
check("Generated stages receive the course-neutral illustration fallback", await learner.locator(".stage-illustration svg.illus").count() === 1);
check("Exported learner course produces no console errors", learnerErrors.length === 0, learnerErrors[0] ?? "clean console");
const learnerAxe = await new AxeBuilder({ page: learner }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
const learnerSerious = learnerAxe.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
check("Generated learner course has no serious or critical automated accessibility violations", learnerSerious.length === 0, learnerSerious.map((item) => `${item.id}: ${item.nodes[0]?.html ?? ""} ${item.nodes[0]?.failureSummary ?? ""}`).join(" | "));

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(100);
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
check("Course Workshop has no phone-width horizontal overflow", mobileOverflow);

await browser.close();
await rm(qaDir, { recursive: true, force: true });

console.log(`\nCourse Workshop QA: ${passed} passed, ${failed} failed.\n`);
if (failed) process.exit(1);
