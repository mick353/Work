/** Browser and output-boundary verification for Course Workshop. */

import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "playwright";
import { copyFile, mkdir, readFile, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { strFromU8, unzipSync } from "fflate";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const studioFile = path.join(projectDir, "Course-Authoring-Studio.html");
const publishedStudioFile = path.join(projectDir, "docs", "course-workshop", "index.html");
const publishedStudioDir = path.dirname(publishedStudioFile);
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

function minimalPdf(text = "Source deck verification slide") {
  const stream = `BT /F1 24 Tf 72 720 Td (${text.replace(/[()\\]/g, "")}) Tj ET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let result = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(result));
    result += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = Buffer.byteLength(result);
  result += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  result += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  result += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(result);
}

const tinyPng = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");
const tinyPngDataUrl = `data:image/png;base64,${tinyPng.toString("base64")}`;

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
      schemaVersion: 2,
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
    qualityProfile: {
      profileVersion: 1,
      stageCount: 1,
      minimumLessonWords: 300,
      minimumStageBodyWords: 300,
      minimumKnowledgeQuestionsPerStage: 4,
      scenariosPerStage: 2,
      minimumAssignmentWords: 100,
      minimumAssignmentCriteria: 2,
      minimumWorkedReasoningPassages: 0,
      minimumWorkedReasoningWords: 0,
      minimumCaseStageCoverage: 0,
      minimumCaseStepWords: 40,
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

function richPackage() {
  const entry = validPackage();
  const moduleId = entry.content.modules[0].id;
  entry.manifest.id = "rich-workshop-fixture";
  entry.manifest.title = "Rich Evidence to Action";
  entry.content.modules[0].visualAssetId = "stage-evidence-visual";
  entry.content.modules[0].slides = "1";
  entry.content.modules[0].sections[0].sourceReferences = [{ sourceId: "practice-guide", locator: "slide 1", slideNumbers: [1] }];
  entry.content.assets = [
    { id: "stage-evidence-visual", kind: "image", fileName: "stage-evidence.png", mimeType: "image/png", dataUrl: tinyPngDataUrl, alt: "Evidence marker connecting a source to a decision.", caption: "A course-owned stage visual." },
    { id: "slide-001", kind: "slide", fileName: "slide-01.png", mimeType: "image/png", dataUrl: tinyPngDataUrl, alt: "Slide 1: evidence connected to an accountable decision.", sourceId: "practice-guide" },
  ];
  entry.content.slides = [{ n: 1, stage: moduleId, title: "Evidence connected to a decision", text: "Source deck verification text", assetId: "slide-001" }];
  entry.content.slideCount = 1;
  entry.content.caseStudies = [{ id: "decision-case", title: "The time-bound recommendation", subtitle: "Mixed evidence and an accountable owner", outcome: "worked", summary: "A team must make a transparent decision.", steps: [{ moduleId, stage: 1, heading: "Frame the choice", decision: "Proceed with a bounded trial", tempting: "Wait for certainty", body: "The team separates observed evidence from inference.", artefact: "A one-page decision record", insight: "Visible uncertainty is more useful than false confidence." }], closing: "The decision remains reviewable because the evidence chain is explicit." }];
  entry.content.toolkitTemplates = [{ id: "decision-record", title: "Decision record", prompt: "Record the decision, evidence, inference, uncertainty, owner and next action.", example: "Proceed with a bounded trial because current evidence supports learning at controlled risk.", note: "Use the smallest record that preserves the reasoning." }];
  entry.content.capstoneBriefs = [{ id: "service-choice", title: "Service choice", short: "Service", brief: "Recommend a next step for a service with incomplete evidence.", twist: "The accountable owner needs an answer today." }];
  entry.content.capstoneSteps = [{ id: "frame-capstone", title: "Frame the decision", prompt: "Write the decision and evidence chain.", checks: ["Decision and owner are named", "Evidence and inference are separated"] }];
  entry.content.capstoneRubric = [{ id: "traceability", title: "Traceability", detail: "A reviewer can reproduce how the recommendation follows from the named source." }];
  entry.content.fieldGuide = [{ id: "decision-evidence", title: "Decision evidence", summary: "Connect source material to a named decision.", slides: "1", sourceIds: ["practice-guide"], sourceReferences: [{ sourceId: "practice-guide", locator: "slide 1", slideNumbers: [1] }], items: [{ term: "Evidence chain", detail: "The visible path from source to inference, decision and action." }] }];
  entry.content.divergences = [{ id: "certainty-language", topic: "Certainty language", slides: "1", deck: "The source shows the decision pattern.", here: "The course makes uncertainty explicit in the written record.", why: "Learners need an observable way to apply the pattern." }];
  entry.content.exemplars = [{ id: "decision-note", tab: "Decision note", title: "Worked decision note", subtitle: "A transparent recommendation", intro: "This example shows the whole artefact.", meta: [{ label: "Owner", value: "Service director" }], sections: [{ heading: "Recommendation", body: ["Proceed with a bounded trial while collecting the missing evidence."], note: "The recommendation states both action and uncertainty." }], closing: "The note is concise because each claim has a visible role." }];
  return entry;
}

const approvedRelease = {
  subjectMatterChecked: true,
  learningFlowChecked: true,
  handlingChecked: true,
  releaseApproved: true,
  reviewerName: "Review Fixture",
  reviewerRole: "Subject matter reviewer",
  approverName: "Approval Fixture",
  approverRole: "Training release owner",
  approvalScope: "Internal QA fixture",
  approvalReference: "QA fixture approval",
  approvalDate: "2026-08-21",
};

function currentDraft(packageEntry, release = approvedRelease) {
  return {
    draftSchemaVersion: 2,
    savedAt: new Date().toISOString(),
    lineage: {
      draftId: `qa-${packageEntry.manifest.id}`,
      revision: 1,
      createdAt: "2026-08-21T00:00:00.000Z",
      origin: "blank",
    },
    package: packageEntry,
    release,
  };
}

await rm(qaDir, { recursive: true, force: true });
await mkdir(qaDir, { recursive: true });
await rm(releaseFixtureDir, { recursive: true, force: true });
await mkdir(releaseFixtureDir, { recursive: true });

const [offlineStudioSource, publishedStudioSource] = await Promise.all([
  readFile(studioFile, "utf8"),
  readFile(publishedStudioFile, "utf8"),
]);
check(
  "Offline Course Workshop carries a self-contained browser and Apple icon",
  /rel="icon" href="data:image\/svg\+xml;base64,/.test(offlineStudioSource) &&
    /rel="apple-touch-icon" href="data:image\/png;base64,/.test(offlineStudioSource),
);
check(
  "Published Course Workshop links its route-owned manifest and icons",
  publishedStudioSource.includes('rel="manifest" href="manifest.webmanifest"') &&
    publishedStudioSource.includes('rel="icon" href="icon-192.png"') &&
    publishedStudioSource.includes('rel="apple-touch-icon" href="apple-touch-icon.png"'),
);
const workshopManifest = JSON.parse(await readFile(path.join(publishedStudioDir, "manifest.webmanifest"), "utf8"));
const workshopIconChecks = await Promise.all(workshopManifest.icons.map(async (icon) => {
  const bytes = await readFile(path.join(publishedStudioDir, icon.src));
  const [width, height] = icon.sizes.split("x").map(Number);
  return bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) &&
    bytes.readUInt32BE(16) === width && bytes.readUInt32BE(20) === height;
}));
const appleTouchBytes = await readFile(path.join(publishedStudioDir, "apple-touch-icon.png"));
check(
  "Course Workshop manifest is route-scoped and declares valid any and maskable icons",
  workshopManifest.start_url === "./" &&
    workshopManifest.scope === "./" &&
    workshopManifest.short_name === "Course Workshop" &&
    workshopManifest.icons.some((icon) => icon.purpose === "maskable") &&
    workshopIconChecks.every(Boolean),
);
check(
  "Course Workshop ships a valid 180-pixel Apple touch icon",
  appleTouchBytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) &&
    appleTouchBytes.readUInt32BE(16) === 180 && appleTouchBytes.readUInt32BE(20) === 180,
);

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
await page.keyboard.press("Tab");
check("The skip link is the first keyboard stop on initial load", await page.evaluate(() => document.activeElement?.classList.contains("skip-link") === true));
const workshopTheme = await page.evaluate(() => {
  const rootStyle = getComputedStyle(document.documentElement);
  const headingStyle = getComputedStyle(document.querySelector(".instruction-hero h1"));
  const logo = document.querySelector(".studio-brand .department-logo");
  const logoBox = logo?.getBoundingClientRect();
  return {
    brand: document.documentElement.dataset.brand,
    font: rootStyle.fontFamily,
    headingFont: headingStyle.fontFamily,
    graphite: rootStyle.getPropertyValue("--dewr-graphite").trim().toLowerCase(),
    eucalyptus: rootStyle.getPropertyValue("--dewr-eucalyptus").trim().toLowerCase(),
    spruce: rootStyle.getPropertyValue("--dewr-spruce").trim().toLowerCase(),
    themeColor: document.querySelector('meta[name="theme-color"]')?.getAttribute("content")?.toLowerCase(),
    logoCount: document.querySelectorAll(".studio-brand .department-logo").length,
    logoAlt: logo?.getAttribute("alt") ?? "",
    logoSource: logo?.getAttribute("src") ?? "",
    logoHeight: logoBox?.height ?? 0,
  };
});
check(
  "Course Workshop uses the default DEWR colour and Aptos typography contract",
  workshopTheme.brand === "dewr" &&
    workshopTheme.font.includes("Aptos") &&
    workshopTheme.headingFont.includes("Aptos Display") &&
    workshopTheme.graphite === "#3e4246" &&
    workshopTheme.eucalyptus === "#78a34f" &&
    workshopTheme.spruce === "#055044" &&
    workshopTheme.themeColor === "#3e4246",
  JSON.stringify(workshopTheme),
);
check(
  "Course Workshop uses the approved reversed DEWR logo once at website-banner size",
  workshopTheme.logoCount === 1 &&
    workshopTheme.logoAlt === "Australian Government Department of Employment and Workplace Relations" &&
    workshopTheme.logoSource.startsWith("data:image/png;base64,") &&
    workshopTheme.logoHeight >= 78,
  JSON.stringify(workshopTheme),
);
check("A new course is presented as a calm not-started draft", /new draft.*start with setup/i.test(await page.locator(".sidebar-status").innerText()));
check("A blank course does not claim a duration before lesson content exists", /Duration pending/i.test(await page.locator(".topbar-meta").innerText()));
check("The built-in instructional page explains all three learner delivery routes", /offline HTML course.*host it at its own URL.*combined catalogue/is.test(await page.locator("body").innerText()));
check("The studio makes its local-only boundary visible", /not uploaded/i.test(await page.locator(".privacy-banner").innerText()));
check("Draft controls disclose portable embedded media and estimated size", /save.share complete draft/i.test(await page.locator(".sidebar-actions").innerText()) && /embedded slides and images.*approximately.*(?:KB|MB)/is.test(await page.locator(".draft-backup-note").innerText()));
check("The studio makes no network requests", networkRequests.length === 0, networkRequests[0] ?? "offline only");
const instructionAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
const instructionSerious = instructionAxe.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
check("Workshop instructions have no serious or critical automated accessibility violations", instructionSerious.length === 0, instructionSerious.map((item) => `${item.id}: ${item.nodes[0]?.html ?? ""}`).join(" | "));

check("Instructions include a five-part course blueprint", await page.locator(".blueprint-list li").count() === 5);
check("Instructions explain how sources, stages, review and outputs connect", await page.locator(".connection-map > div").count() === 4);
check("Blank and template starting choices are presented together before the workflow", await page.locator(".start-options article").count() === 3 && await page.locator(".start-options").evaluate((element) => {
  const workflow = document.querySelector(".workflow-list");
  return Boolean(workflow && element.closest(".editor-card")?.compareDocumentPosition(workflow) & Node.DOCUMENT_POSITION_FOLLOWING);
}));
await page.getByRole("button", { name: /Course setup/ }).click();
check("Course setup keeps release evidence out of the drafting fields", await page.getByLabel("Content review date").count() === 0 && await page.getByLabel("Checked").inputValue() === "");
check("Course setup explains downstream ids and shows live source usage", await page.locator(".step-connection").count() === 1 && /0 lesson sections.*0 guide entries.*0 media items/is.test(await page.locator(".linkage-summary").innerText()));
await page.getByRole("button", { name: /Media & source deck/ }).click();
check("An incomplete source is labelled and never selected as the deck source", await page.getByLabel("Deck source").inputValue() === "" && /source-1 — incomplete/i.test(await page.getByLabel("Deck source").innerText()));
check("Media gives trainers the complete register-import-review-cite sequence", await page.locator(".connection-steps li").count() === 4 && /register.*import.*review.*cite/is.test(await page.locator(".connection-steps").innerText()));
await page.getByRole("button", { name: /Teach/ }).click();
check("Teach exposes the active stage's cross-step connections", await page.locator(".stage-linkage-summary").count() === 1 && /diagnostic.*review card.*source slide/is.test(await page.locator(".stage-linkage-summary").innerText()));
check("Teach gives trainers an explicit stage position and selector", /Stage 1 of 1/i.test(await page.locator(".stage-switcher").innerText()) && await page.getByLabel("Choose course stage").count() === 1);
await page.evaluate(() => window.scrollTo(0, 700));
await page.getByRole("button", { name: "Next", exact: true }).click();
// The focus move to the next heading (queued in a setTimeout) and the scroll
// reset settle on independent timelines, so a fixed 50ms delay was flaky:
// under CI load focus/scroll had not both landed (observed scrollY ~698), and a
// scroll-only wait resolves too early because the shorter next step clamps
// scrollY to ~0 while focus is still on the Next button. Wait for the intended
// end-state — heading focused and scrolled to top — then assert it.
await page
  .waitForFunction(
    () =>
      window.scrollY < 5 &&
      document.activeElement?.tagName === "H1" &&
      /retrievable and usable/i.test(document.activeElement?.textContent ?? ""),
    null,
    { timeout: 5000 },
  )
  .catch(() => {});
const navigationState = await page.evaluate(() => ({ scrollY: window.scrollY, tag: document.activeElement?.tagName, text: document.activeElement?.textContent ?? "", id: document.activeElement?.id }));
check("Step navigation resets scroll and focuses the new heading", navigationState.scrollY < 5 && navigationState.tag === "H1" && /retrievable and usable/i.test(navigationState.text), JSON.stringify(navigationState));
check("Reinforce explains that its content belongs to the active stage", /active stage/i.test(await page.locator(".step-connection").innerText()));
await page.getByRole("button", { name: /Review & export/ }).click();
check("Review checks are grouped by step and filterable", await page.locator(".review-step-summary > div").count() === 6 && await page.getByRole("button", { name: /Blockers/ }).count() === 1);
check("A blank draft review is calm and starts with issue groups collapsed", await page.locator(".readiness.not-started").count() === 1 && await page.locator("details.issue-group[open]").count() === 0);
check("Review shows stage coverage and release-gate progress", await page.locator(".coverage-table tbody tr").count() === 1 && await page.locator(".release-progress > div").count() === 3 && /0 of 4 recorded.*0 of 8 complete/is.test(await page.locator(".release-progress").innerText()));
check("The content review date is recorded at release, not while drafting", await page.getByLabel("Content review date").inputValue() === "");
check("Review explains issue navigation and the human release boundary", /relevant field.*human learning-flow review/is.test(await page.locator(".step-connection").innerText()));
check("Draft output explains the complete trainer checkpoint transfer", /Complete editable draft.*another trainer.*embedded slides, images.*approximately.*(?:KB|MB)/is.test(await page.locator("body").innerText()));
check("The step footer distinguishes current-step and whole-course blockers", /in this step.*across the course/i.test(await page.locator(".step-footer").innerText()));
await page.locator("details.issue-group").filter({ hasText: "Course setup" }).locator("summary").click();
await page.locator(".issue.error").filter({ hasText: "Add the course title" }).click();
await page.waitForTimeout(50);
check("A review issue opens and focuses its exact field", await page.evaluate(() => document.activeElement?.id === "manifest-title" && document.activeElement?.scrollIntoView !== undefined));

let templateProfilesClean = true;
const templateProfileDetails = [];
for (const templateTitle of ["Product Management Fundamentals", "Closure Reports"]) {
  const templateContext = await browser.newContext();
  const templatePage = await templateContext.newPage();
  await templatePage.goto(pathToFileURL(studioFile).href);
  await templatePage.locator(".template-grid article").filter({ hasText: templateTitle }).getByRole("button", { name: "Clone as new course" }).click();
  await templatePage.waitForSelector("text=Created a separate draft from");
  await templatePage.locator(".desktop-step-nav button").filter({ hasText: "Review & export" }).click();
  const draftBlockingTitles = await templatePage.locator(".issue.error strong").allTextContents();
  templateProfileDetails.push(`${templateTitle}: draft [${draftBlockingTitles.join(" | ") || "none"}]`);
  templateProfilesClean &&= draftBlockingTitles.length === 0;
  await templateContext.close();
}
check("Every maintained course template satisfies the Workshop profile before fresh review", templateProfilesClean, templateProfileDetails.join("; "));

const blankReplacementContext = await browser.newContext();
const blankReplacementPage = await blankReplacementContext.newPage();
await blankReplacementPage.goto(pathToFileURL(studioFile).href);
await blankReplacementPage.locator(".template-grid article").filter({ hasText: "Product Management Fundamentals" }).getByRole("button", { name: "Clone as new course" }).click();
await blankReplacementPage.waitForSelector("text=Created a separate draft from Product Management Fundamentals");
await blankReplacementPage.getByRole("button", { name: /How it works/ }).click();
let blankReplacementPrompt = "";
blankReplacementPage.once("dialog", (dialog) => {
  blankReplacementPrompt = dialog.message();
  void dialog.dismiss();
});
await blankReplacementPage.getByRole("button", { name: "Start blank course" }).click();
check(
  "Starting blank warns before replacing an existing draft and Cancel preserves it",
  /current draft will be replaced.*download it first/is.test(blankReplacementPrompt) &&
    /Adapted Product Management Fundamentals/i.test(await blankReplacementPage.locator(".topbar").innerText()),
  blankReplacementPrompt,
);
blankReplacementPage.once("dialog", (dialog) => void dialog.accept());
await blankReplacementPage.getByRole("button", { name: "Start blank course" }).click();
await blankReplacementPage.getByRole("heading", { name: "Name the course and anchor it to its source" }).waitFor();
check(
  "Confirming blank replaces the draft, clears its identity and opens Course setup",
  /Untitled training course/i.test(await blankReplacementPage.locator(".topbar").innerText()) &&
    /previous local draft was replaced/i.test(await blankReplacementPage.locator(".notice").innerText()),
);
await blankReplacementContext.close();

const metadataReplacementContext = await browser.newContext();
const metadataReplacementPage = await metadataReplacementContext.newPage();
await metadataReplacementPage.goto(pathToFileURL(studioFile).href);
await metadataReplacementPage.getByRole("button", { name: /Course setup/ }).click();
await metadataReplacementPage.getByLabel("Status").selectOption("in-development");
await metadataReplacementPage.getByRole("button", { name: /How it works/ }).click();
const metadataDialogPromise = metadataReplacementPage.waitForEvent("dialog");
const metadataClone = metadataReplacementPage.locator(".template-grid article").filter({ hasText: "Closure Reports" }).getByRole("button", { name: "Clone as new course" }).click();
const metadataDialog = await metadataDialogPromise;
const metadataPrompt = metadataDialog.message();
await metadataDialog.dismiss();
await metadataClone;
check(
  "Replacement protection includes metadata and review work, not only lesson content",
  /current draft will be replaced/i.test(metadataPrompt) && /Untitled training course/i.test(await metadataReplacementPage.locator(".topbar").innerText()),
  metadataPrompt,
);
await metadataReplacementContext.close();

const corruptStorageContext = await browser.newContext();
const corruptStoragePage = await corruptStorageContext.newPage();
await corruptStoragePage.goto(pathToFileURL(studioFile).href);
await corruptStoragePage.waitForTimeout(400);
await corruptStoragePage.evaluate(async () => {
  await new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase("product-practice-course-workshop");
    request.onsuccess = () => resolve(undefined);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("Database deletion was blocked"));
  });
  await new Promise((resolve, reject) => {
    const request = indexedDB.open("product-practice-course-workshop", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("drafts");
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const database = request.result;
      const transaction = database.transaction("drafts", "readwrite");
      transaction.objectStore("drafts").put({ corrupt: true, marker: "preserve-unreadable-draft" }, "current");
      transaction.oncomplete = () => { database.close(); resolve(undefined); };
      transaction.onerror = () => reject(transaction.error);
    };
  });
});
await corruptStoragePage.reload();
await corruptStoragePage.waitForSelector("text=Autosave is paused so the unreadable copy is not overwritten");
await corruptStoragePage.waitForTimeout(600);
const preservedCorruptDraft = await corruptStoragePage.evaluate(() => new Promise((resolve, reject) => {
  const request = indexedDB.open("product-practice-course-workshop", 1);
  request.onerror = () => reject(request.error);
  request.onsuccess = () => {
    const database = request.result;
    const read = database.transaction("drafts", "readonly").objectStore("drafts").get("current");
    read.onerror = () => reject(read.error);
    read.onsuccess = () => { database.close(); resolve(read.result); };
  };
}));
check(
  "An unreadable browser draft pauses autosave instead of silently overwriting it",
  preservedCorruptDraft?.marker === "preserve-unreadable-draft" && /Autosave paused/i.test(await corruptStoragePage.locator(".sidebar-status small").innerText()),
);
let unreadableReplacementPrompt = "";
corruptStoragePage.once("dialog", (dialog) => {
  unreadableReplacementPrompt = dialog.message();
  void dialog.dismiss();
});
await corruptStoragePage.getByRole("button", { name: "Start blank course" }).click();
check("Replacing an unreadable browser draft requires an explicit decision", /could not be opened.*deliberately replace/is.test(unreadableReplacementPrompt));
corruptStoragePage.once("dialog", (dialog) => void dialog.accept());
await corruptStoragePage.getByRole("button", { name: "Start blank course" }).click();
await corruptStoragePage.waitForSelector("text=Autosave is active again");
await corruptStorageContext.close();

const recoveryContext = await browser.newContext();
const recoveryPage = await recoveryContext.newPage();
await recoveryPage.goto(pathToFileURL(studioFile).href);
await recoveryPage.locator(".template-grid article").filter({ hasText: "Closure Reports" }).getByRole("button", { name: "Clone as new course" }).click();
await recoveryPage.locator(".operation-overlay").waitFor({ state: "hidden" });
await recoveryPage.waitForSelector("text=Saved in this browser");
await recoveryPage.reload();
await recoveryPage.waitForSelector("text=Recovered “Adapted Closure Reports” from this browser");
check(
  "A recovered browser draft is identified clearly after reload",
  /Adapted Closure Reports/i.test(await recoveryPage.locator(".topbar").innerText()) && /Autosave is active/i.test(await recoveryPage.locator(".notice").innerText()),
);
await recoveryContext.close();

const featureContext = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
const featurePage = await featureContext.newPage();
const featureErrors = [];
featurePage.on("console", (message) => { if (message.type() === "error") featureErrors.push(message.text()); });
await featurePage.goto(pathToFileURL(studioFile).href);
const pmTemplate = featurePage.locator(".template-grid article").filter({ hasText: "Product Management Fundamentals" });
check("Published Product Management is offered as an editable template", await pmTemplate.count() === 1);
const cloneClick = pmTemplate.getByRole("button", { name: "Clone as new course" }).click();
await featurePage.waitForSelector(".operation-overlay");
const cloneProgressText = await featurePage.locator(".operation-overlay").innerText();
check(
  "Large-template cloning shows visible progress before changing the draft",
  /source slides|preparing/i.test(cloneProgressText),
  cloneProgressText,
);
await cloneClick;
await featurePage.waitForSelector("text=Created a separate draft from Product Management Fundamentals");
await featurePage.locator(".operation-overlay").waitFor({ state: "hidden" });
check("Cloning creates a visibly separate draft", /Adapted Product Management Fundamentals/i.test(await featurePage.locator(".topbar").innerText()));
check("Cloning into an untouched starter does not show a needless replacement warning", await featurePage.locator(".notice").count() === 1);
check(
  "A source-rich cloned course starts with compact source summaries",
  await featurePage.locator("details.source-editor").count() > 1 && await featurePage.locator("details.source-editor[open]").count() === 0 && /lesson sections.*guide entries.*media items/is.test(await featurePage.locator("details.source-editor summary").first().innerText()),
);
await featurePage.locator("details.source-editor summary").first().click();
check("A trainer can expand a source summary to edit its full record", await featurePage.getByLabel("Checked").first().isVisible());
check("A trainer can open a registered source while checking it", await featurePage.locator(".source-open-link").first().count() === 1 && (await featurePage.locator(".source-open-link").first().getAttribute("target")) === "_blank");

await featurePage.getByRole("button", { name: /Teach/ }).click();
check("A multi-stage course can be navigated without relying on a clipped tab row", /Stage 1 of 9/i.test(await featurePage.locator(".stage-switcher").innerText()) && await featurePage.getByRole("button", { name: "Next stage" }).isEnabled());
await featurePage.getByRole("button", { name: "Next stage" }).click();
check("Stage next control updates the active stage consistently", /Stage 2 of 9/i.test(await featurePage.locator(".stage-switcher").innerText()) && (await featurePage.getByLabel("Choose course stage").inputValue()) !== "product-thinking");

await featurePage.getByRole("button", { name: /Review & export/ }).click();
check("Advisory warnings are labelled as non-blocking", await featurePage.locator(".advisory-banner").count() === 1 && /do not disable Preview or any final export/i.test(await featurePage.locator(".advisory-banner").innerText()));
check("Review explains the exact gates behind disabled final outputs", /set Course setup.*Available/i.test(await featurePage.locator(".release-gate-summary").innerText()) && /not caused by advisory warnings/i.test(await featurePage.locator(".export-gate-status").innerText()));
check("Preview remains available when a cloned course has warnings but no errors", !(await featurePage.getByRole("button", { name: "Preview course" }).isDisabled()));
check("A trainer can record an optional decision to leave advisories in place", await featurePage.locator(".advisory-option input").count() === 1 && /optional/i.test(await featurePage.locator(".advisory-option").innerText()));
check("A worked draft opens the first relevant issue group", await featurePage.locator("details.issue-group[open]").count() === 1);
check("The coverage matrix includes every cloned stage", await featurePage.locator(".coverage-table tbody tr").count() === 9);
check("Release progress separates status, human decisions and record details", /Course status.*Human decisions.*Release details/is.test(await featurePage.locator(".release-progress").innerText()));

await featurePage.getByRole("button", { name: /Apply & reference/ }).click();
check("Advanced course elements have dedicated editors", await featurePage.getByRole("heading", { name: "Worked cases" }).count() === 1 && await featurePage.getByRole("heading", { name: "Toolkit templates" }).count() === 1 && await featurePage.getByRole("heading", { name: "Capstone" }).count() === 1 && await featurePage.getByRole("heading", { name: "Field guide" }).count() === 1 && await featurePage.getByRole("heading", { name: "Source differences" }).count() === 1 && await featurePage.getByRole("heading", { name: "Worked documents and exemplars" }).count() === 1);
check("Every advanced editor explains how its content reaches the learner experience", await featurePage.locator(".connection-note").count() === 6);
check("The Product Management template brings its maintained advanced content", await featurePage.locator(".advanced-editor").count() > 5);
await featurePage.getByRole("button", { name: "Add exemplar" }).click();
check("A trainer can add a worked-document exemplar", await featurePage.locator(".advanced-editor").filter({ hasText: "Untitled exemplar" }).count() === 1);
const advancedAxe = await new AxeBuilder({ page: featurePage }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
const advancedSerious = advancedAxe.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
check("Advanced editors have no serious or critical automated accessibility violations", advancedSerious.length === 0, advancedSerious.map((item) => item.id).join(", "));

await featurePage.getByRole("button", { name: /Media & source deck/ }).click();
const proxyFileInputs = featurePage.locator('.sidebar-actions > input[type="file"], .media-import-actions > input[type="file"]');
const proxyFileInputState = await proxyFileInputs.evaluateAll((inputs) => inputs.map((input) => ({
  name: input.getAttribute("aria-label")?.trim() ?? "",
  tabIndex: input.tabIndex,
})));
check(
  "Hidden file inputs behind visible buttons are named and omitted from sequential keyboard focus",
  proxyFileInputState.length === 3 && proxyFileInputState.every((input) => input.name && input.tabIndex === -1),
  JSON.stringify(proxyFileInputState),
);
check("Large decks render in responsive batches without losing their complete count", await featurePage.locator(".slide-editor").count() === 20 && /Showing 20 of 98 slides/i.test(await featurePage.locator(".slide-render-status").innerText()));
await featurePage.getByRole("button", { name: "Show next 20 slides" }).click();
check("A trainer can reveal the next slide-editor batch", await featurePage.locator(".slide-editor").count() === 40);
const firstVisual = featurePage.locator(".visual-editor").first();
const visualFileInputs = featurePage.locator('.visual-editor input[type="file"]');
const visualFileInputNames = await visualFileInputs.evaluateAll((inputs) => inputs.map((input) => input.getAttribute("aria-label")?.trim() ?? ""));
check(
  "Every stage-image upload has a unique stage-specific accessible name",
  visualFileInputNames.length === 9 && new Set(visualFileInputNames).size === visualFileInputNames.length && visualFileInputNames.every((name) => /^Add image for Stage \d+: .+/.test(name)),
  visualFileInputNames.join(" | "),
);
await firstVisual.locator('input[type="file"]').focus();
const uploadFocusStyle = await firstVisual.locator(".upload-label").evaluate((label) => ({
  outlineStyle: getComputedStyle(label).outlineStyle,
  outlineWidth: getComputedStyle(label).outlineWidth,
}));
check(
  "Stage-image uploads expose visible keyboard focus on their labelled control",
  uploadFocusStyle.outlineStyle !== "none" && parseFloat(uploadFocusStyle.outlineWidth) >= 3,
  JSON.stringify(uploadFocusStyle),
);
await firstVisual.locator('input[type="file"]').setInputFiles({ name: "stage-visual.png", mimeType: "image/png", buffer: tinyPng });
await firstVisual.locator("img").waitFor();
await firstVisual.getByLabel("Image description").fill("A single evidence marker used to verify an embedded stage visual.");
check("Stage images can be embedded and described", await firstVisual.locator("img").count() === 1);

await featurePage.getByRole("button", { name: /Teach/ }).click();
await featurePage.getByLabel("Page, section or locator").first().fill("slides 1–2");
await featurePage.getByLabel("Imported slide numbers").first().fill("1–2");
await featurePage.waitForTimeout(1200);
const indexedDraft = await featurePage.evaluate(() => new Promise((resolve, reject) => {
  const request = indexedDB.open("product-practice-course-workshop", 1);
  request.onerror = () => reject(request.error);
  request.onsuccess = () => {
    const read = request.result.transaction("drafts", "readonly").objectStore("drafts").get("current");
    read.onerror = () => reject(read.error);
    read.onsuccess = () => resolve(read.result);
  };
}));
check("Asset-rich drafts autosave in IndexedDB", indexedDraft?.package?.content?.assets?.length === 99 && indexedDraft.package.content.modules[0].visualAssetId);

const [cloneDownload] = await Promise.all([
  featurePage.waitForEvent("download"),
  featurePage.locator(".sidebar-actions").getByRole("button", { name: "Save/share complete draft" }).click(),
]);
const cloneFile = path.join(qaDir, "adapted-pm-course-draft.json");
await cloneDownload.saveAs(cloneFile);
const cloneDraft = JSON.parse(await readFile(cloneFile, "utf8"));
check(
  "Portable draft filename carries course, version, revision, date and time",
  /^pm-fundamentals-adapted-v0\.1\.0-draft-r2-\d{4}-\d{2}-\d{2}-\d{6}\.json$/.test(cloneDownload.suggestedFilename()),
  cloneDownload.suggestedFilename(),
);
check("Clone resets identity, version, status, review evidence and approvals", cloneDraft.package.manifest.id === "pm-fundamentals-adapted" && cloneDraft.package.manifest.version === "0.1.0" && cloneDraft.package.manifest.status === "draft" && cloneDraft.package.manifest.reviewed === "" && cloneDraft.package.content.sources.every((source) => !source.checked) && cloneDraft.release.releaseApproved === false);
check("Clone receives the portable Workshop quality profile instead of inheriting a hidden course-specific gate", cloneDraft.package.qualityProfile?.stageCount === 9 && cloneDraft.package.qualityProfile?.minimumLessonWords === 2700 && cloneDraft.package.qualityProfile?.minimumWorkedReasoningPassages === 0);
check("Portable clone draft records stable lineage and a shareable revision", cloneDraft.draftSchemaVersion === 2 && cloneDraft.lineage?.origin === "clone" && cloneDraft.lineage?.basedOn?.packageId === "pm-fundamentals" && cloneDraft.lineage?.revision === 2 && Boolean(cloneDraft.lineage?.lastExportedAt));
check("Clone preserves advanced course content and embeds the source deck", cloneDraft.package.content.caseStudies.length > 0 && cloneDraft.package.content.toolkitTemplates.length > 0 && cloneDraft.package.content.capstoneSteps.length > 0 && cloneDraft.package.content.fieldGuide.length > 0 && cloneDraft.package.content.slides.length === 98 && cloneDraft.package.content.assets.length === 99);
check("Precise lesson citations survive the editable draft", cloneDraft.package.content.modules.some((module) => module.sections.some((section) => section.sourceReferences?.some((reference) => reference.locator === "slides 1–2" && reference.slideNumbers?.join(",") === "1,2"))));
await featurePage.setViewportSize({ width: 390, height: 844 });
await featurePage.locator(".mobile-step-picker select").selectOption("advanced");
const advancedMobileOverflow = await featurePage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
await featurePage.locator(".mobile-step-picker select").selectOption("media");
const mediaMobileOverflow = await featurePage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
check("Advanced and media editors fit a phone/tablet-width browser", advancedMobileOverflow && mediaMobileOverflow);
check("Advanced and media authoring produced no console errors", featureErrors.length === 0, featureErrors[0] ?? "clean console");
await featureContext.close();

const pdfContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const pdfPage = await pdfContext.newPage();
const pdfErrors = [];
pdfPage.on("console", (message) => { if (message.type() === "error") pdfErrors.push(message.text()); });
await pdfPage.goto(pathToFileURL(studioFile).href);
await pdfPage.getByRole("button", { name: /Media & source deck/ }).click();
await pdfPage.locator('.media-import-actions input[accept*="pdf"]').setInputFiles({ name: "source-deck.pdf", mimeType: "application/pdf", buffer: minimalPdf() });
await pdfPage.waitForSelector(".slide-editor");
check("A PDF source deck is rendered into editable embedded slides", await pdfPage.locator(".slide-editor").count() === 1 && /Source deck verification slide/i.test(await pdfPage.locator(".slide-editor").innerText()));
check("PDF import produces no browser console errors", pdfErrors.length === 0, pdfErrors[0] ?? "clean console");
await pdfContext.close();

await page.getByRole("button", { name: /Review & export/ }).click();
check("Learner export is disabled for an incomplete draft", await page.getByRole("button", { name: "Export training HTML" }).isDisabled());
check("Repository export is disabled for an incomplete draft", await page.getByRole("button", { name: "Export repository ZIP" }).isDisabled());

await page.getByRole("button", { name: /Teach/ }).click();
await page.getByLabel("Title").first().fill("Local persistence check");
await page.waitForTimeout(400);
const saved = await page.evaluate((key) => window.localStorage.getItem(key), "product-practice:course-workshop:draft-v2");
check("Draft changes autosave to a workshop-specific storage key", Boolean(saved?.includes("Local persistence check")));

await page.getByRole("button", { name: /Course setup/ }).click();
await page.getByLabel("Course title").fill("Unsaved replacement safeguard");
await page.waitForTimeout(50);
const importReplacementDialog = page.waitForEvent("dialog");
const guardedImport = page.locator('input[type="file"]').setInputFiles({
  name: "replacement-safeguard-course-draft.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify(currentDraft(validPackage()))),
});
const importDialog = await importReplacementDialog;
const importReplacementPrompt = importDialog.message();
await importDialog.dismiss();
await guardedImport;
check(
  "Loading a draft warns before replacing current work and Cancel preserves it",
  /replace the current browser draft.*download the current draft/is.test(importReplacementPrompt) && await page.getByLabel("Course title").inputValue() === "Unsaved replacement safeguard",
  importReplacementPrompt,
);
page.on("dialog", (dialog) => void dialog.accept());

const legacyPackage = validPackage();
await page.locator('input[type="file"]').setInputFiles({
  name: "legacy-v1-course-draft.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify({ draftSchemaVersion: 1, savedAt: "2026-08-20T00:00:00.000Z", package: legacyPackage, release: approvedRelease })),
});
await page.waitForSelector("text=This older draft was upgraded");
await page.getByRole("button", { name: /Review & export/ }).click();
check("Legacy drafts cannot carry old review declarations into a current release", await page.getByRole("button", { name: "Export repository ZIP" }).isDisabled());
const [migratedDownload] = await Promise.all([
  page.waitForEvent("download"),
  page.locator(".sidebar-actions").getByRole("button", { name: "Save/share complete draft" }).click(),
]);
const migratedFile = path.join(qaDir, "migrated-v2-course-draft.json");
await migratedDownload.saveAs(migratedFile);
const migratedDraft = JSON.parse(await readFile(migratedFile, "utf8"));
check("Legacy migration emits a traceable v2 draft with review evidence cleared", migratedDraft.draftSchemaVersion === 2 && migratedDraft.lineage?.origin === "migrated-v1" && migratedDraft.lineage?.revision === 2 && migratedDraft.package.manifest.reviewed === "" && migratedDraft.package.manifest.status === "draft" && migratedDraft.package.content.sources.every((source) => !source.checked) && migratedDraft.release.releaseApproved === false);

const fixture = validPackage();
const unreviewedReleaseFixture = structuredClone(fixture);
unreviewedReleaseFixture.manifest.reviewed = "";
unreviewedReleaseFixture.content.contentReviewed = "";
await page.locator('input[type="file"]').setInputFiles({
  name: "available-but-unreviewed-course-draft.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify(currentDraft(unreviewedReleaseFixture))),
});
await page.waitForSelector("text=Loaded available-but-unreviewed-course-draft.json");
await page.getByRole("button", { name: /Course setup/ }).click();
const unreviewedStatus = await page.locator("label.field select").first().inputValue();
await page.getByRole("button", { name: /Review & export/ }).click();
await page.waitForTimeout(50);
const unreviewedReviewDate = await page.getByLabel("Content review date").inputValue();
const unreviewedBlockingTitles = await page.locator(".issue.error strong").allTextContents();
check("Content review evidence is required for release but not for an ordinary draft", unreviewedStatus === "available" && unreviewedReviewDate === "" && unreviewedBlockingTitles.length === 1 && unreviewedBlockingTitles[0] === "Add the content review date", `status ${unreviewedStatus}; review date ${unreviewedReviewDate || "blank"}; ${unreviewedBlockingTitles.join(" | ") || "no blocker"}`);

const brokenFixture = structuredClone(fixture);
brokenFixture.content.modules[0].questions[0].optionNotes = ["", "", "", ""];
const reviewFixture = structuredClone(fixture);
reviewFixture.manifest.status = "in-development";
await page.locator('input[type="file"]').setInputFiles({
  name: "deliberately-broken-course-draft.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify(currentDraft(brokenFixture))),
});
await page.waitForSelector("text=Loaded deliberately-broken-course-draft.json");
await page.getByRole("button", { name: /Review & export/ }).click();
await page.waitForSelector(".readiness.blocked");
check("A deliberately broken distractor-feedback rule blocks export", await page.getByRole("button", { name: "Export training HTML" }).isDisabled());

const unsafeMediaFixture = richPackage();
unsafeMediaFixture.content.assets[0].alt = "";
unsafeMediaFixture.content.assets[0].dataUrl = "data:image/png;base64,SGVsbG8=";
unsafeMediaFixture.content.sources[0].url = "javascript:alert('unsafe')";
unsafeMediaFixture.content.modules[0].sections[0].sourceReferences[0].slideNumbers = [999];
await page.locator('input[type="file"]').setInputFiles({
  name: "unsafe-media-course-draft.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify(currentDraft(unsafeMediaFixture))),
});
await page.waitForSelector("text=Loaded unsafe-media-course-draft.json");
await page.getByRole("button", { name: /Review & export/ }).click();
await page.waitForSelector(".readiness.blocked");
const unsafeIssueText = await page.locator(".issue-list").textContent() ?? "";
check("Unsafe source links, false media types and broken citations block export", await page.getByRole("button", { name: "Export training HTML" }).isDisabled() && /https|declared media type|missing slide 999/i.test(unsafeIssueText), unsafeIssueText);

const databaseOnlySourceFixture = structuredClone(fixture);
databaseOnlySourceFixture.content.sources[0].url = "https://pubmed.ncbi.nlm.nih.gov/16507066/";
await page.locator('input[type="file"]').setInputFiles({
  name: "database-only-source-course-draft.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify(currentDraft(databaseOnlySourceFixture))),
});
await page.waitForSelector("text=Loaded database-only-source-course-draft.json");
await page.getByRole("button", { name: /Review & export/ }).click();
await page.waitForSelector(".readiness.blocked");
const databaseOnlyIssueText = await page.locator(".issue-list").textContent() ?? "";
check("Database-record links are rejected as learner sources", await page.getByRole("button", { name: "Export training HTML" }).isDisabled() && /PubMed is an evidence index|database-only link/i.test(databaseOnlyIssueText), databaseOnlyIssueText);

await page.locator('input[type="file"]').setInputFiles({
  name: "workshop-fixture-under-review.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify(currentDraft(reviewFixture))),
});
await page.waitForSelector("text=Loaded workshop-fixture-under-review.json");
await page.getByRole("button", { name: /Review & export/ }).click();
await page.waitForSelector(".readiness.pending");
check("Clean content remains unreleased until its status is Available", await page.getByRole("button", { name: "Export training HTML" }).isDisabled());

await page.locator('input[type="file"]').setInputFiles({
  name: "workshop-fixture-course-draft.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify(currentDraft(fixture))),
});
await page.waitForSelector("text=Loaded workshop-fixture-course-draft.json");
await page.getByRole("button", { name: /Review & export/ }).click();
await page.waitForSelector(".readiness.ready");
check("A complete draft clears every blocking authoring check", (await page.locator(".issue.error").count()) === 0);
check("Final outputs require and accept a complete human release record", !(await page.getByRole("button", { name: "Export repository ZIP" }).isDisabled()));
await page.locator(".advisory-option input").check();
check("Optional advisory acknowledgement does not change release readiness", !(await page.getByRole("button", { name: "Export repository ZIP" }).isDisabled()));
await page.getByRole("button", { name: /^All / }).click({ force: true });
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
check("Developer ZIP contains the canonical course folder and versioned release archive", zipNames.includes(`${expectedRoot}/src/courses/workshop-fixture/course-package.json`) && zipNames.includes(`${expectedRoot}/src/courses/workshop-fixture/index.ts`) && zipNames.includes(`${expectedRoot}/src/courses/workshop-fixture/releases/0.1.0.json`));
check("Repository ZIP contains installation, hosted-page, validation and release records", zipNames.includes(`${expectedRoot}/README.md`) && zipNames.includes(`${expectedRoot}/CATALOGUE-ENTRY.txt`) && zipNames.includes(`${expectedRoot}/validation-report.json`) && zipNames.includes(`${expectedRoot}/release-record.json`) && zipNames.includes(`${expectedRoot}/hosted/index.html`));
check("Developer ZIP contains no unsafe traversal path", zipNames.every((name) => !name.includes("..") && !path.isAbsolute(name)));
const report = JSON.parse(strFromU8(zipped[`${expectedRoot}/validation-report.json`]));
const releaseRecord = JSON.parse(strFromU8(zipped[`${expectedRoot}/release-record.json`]));
check("Validation report and release record keep automated and declared evidence distinct", report.releaseReady === true && /neither record is independent review evidence/i.test(report.statement) && releaseRecord.checklistComplete === true && releaseRecord.approvals?.advisoriesReviewed === true);
const canonicalPackageText = strFromU8(zipped[`${expectedRoot}/course-package.json`]);
const canonicalDigest = createHash("sha256").update(canonicalPackageText, "utf8").digest("hex");
check("Release evidence is bound to the exact canonical package bytes", releaseRecord.recordVersion === 2 && releaseRecord.packageDigest?.value === canonicalDigest && report.packageDigest?.value === canonicalDigest);
check("Release evidence records reviewer, approver, role and scope", releaseRecord.approvals?.reviewer?.name === approvedRelease.reviewerName && releaseRecord.approvals?.reviewer?.role === approvedRelease.reviewerRole && releaseRecord.approvals?.approver?.name === approvedRelease.approverName && releaseRecord.approvals?.approver?.role === approvedRelease.approverRole && releaseRecord.approvals?.approvalScope === approvedRelease.approvalScope);

const [hostedDownload] = await Promise.all([
  page.waitForEvent("download"),
  page.getByRole("button", { name: "Export hosted-course ZIP" }).click(),
]);
const hostedFile = path.join(qaDir, "workshop-fixture-hosted-course.zip");
await hostedDownload.saveAs(hostedFile);
const hostedZip = unzipSync(new Uint8Array(await readFile(hostedFile)));
const hostedNames = Object.keys(hostedZip);
check("Hosted-course ZIP is isolated and carries verifiable canonical content", hostedNames.includes("workshop-fixture-hosted-course/index.html") && hostedNames.includes("workshop-fixture-hosted-course/course-package.json") && hostedNames.includes("workshop-fixture-hosted-course/README.md") && hostedNames.includes("workshop-fixture-hosted-course/release-record.json") && hostedNames.every((name) => name.startsWith("workshop-fixture-hosted-course/")));
const hostedCanonical = strFromU8(hostedZip["workshop-fixture-hosted-course/course-package.json"]);
const hostedRelease = JSON.parse(strFromU8(hostedZip["workshop-fixture-hosted-course/release-record.json"]));
check("Hosted-course approval is bound to its bundled canonical content", hostedRelease.packageDigest?.value === createHash("sha256").update(hostedCanonical, "utf8").digest("hex"));

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

const richFixture = richPackage();
await page.locator('input[type="file"]').setInputFiles({
  name: "rich-workshop-fixture-course-draft.json",
  mimeType: "application/json",
  buffer: Buffer.from(JSON.stringify(currentDraft(richFixture))),
});
await page.waitForSelector("text=Loaded rich-workshop-fixture-course-draft.json");
await page.getByRole("button", { name: /Review & export/ }).click();
await page.waitForSelector(".readiness.ready");
check("A complete advanced and media-rich course clears blocking checks", await page.locator(".issue.error").count() === 0);
const [richDownload] = await Promise.all([
  page.waitForEvent("download"),
  page.getByRole("button", { name: "Export training HTML" }).click(),
]);
const richLearnerFile = path.join(qaDir, "rich-workshop-fixture.html");
await richDownload.saveAs(richLearnerFile);
const richLearner = await context.newPage();
await richLearner.goto(pathToFileURL(richLearnerFile).href);
await richLearner.evaluate(() => { window.location.hash = "module/evidence-to-action"; });
await richLearner.waitForSelector(".stage-illustration img");
check("Embedded stage visuals render in the standalone learner course", await richLearner.locator('.stage-illustration img[alt*="Evidence marker"]').count() === 1);
await richLearner.locator(".source-chips button").first().click();
await richLearner.waitForSelector('.slide-lightbox[role="dialog"]');
check("Precise source citations open the embedded source slide", /Evidence connected to a decision/i.test(await richLearner.locator(".slide-lightbox").innerText()) && await richLearner.locator('.slide-lightbox img[alt*="Slide 1"]').count() === 1);
const richSource = await readFile(richLearnerFile, "utf8");
check("Advanced content and media remain self-contained in learner output", richSource.includes("decision-case") && richSource.includes("decision-record") && richSource.includes(tinyPngDataUrl) && !/<script[^>]+src=|<link[^>]+href=/i.test(richSource));

await page.setViewportSize({ width: 768, height: 1024 });
await page.waitForTimeout(100);
const tabletOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
check("Tablet Workshop uses a compact step selector without horizontal navigation", await page.locator(".mobile-step-picker").isVisible() && !(await page.locator(".desktop-step-nav").isVisible()) && tabletOverflow);

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(100);
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
check("Course Workshop has no phone-width horizontal overflow", mobileOverflow);

await browser.close();
await rm(qaDir, { recursive: true, force: true });

console.log(`\nCourse Workshop QA: ${passed} passed, ${failed} failed.\n`);
if (failed) process.exit(1);
