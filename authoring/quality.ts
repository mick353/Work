import type { Question, TrainingPackage } from "../src/package-model";
import { validateTrainingPackage } from "../src/package-validation";
import { packageForExport } from "./draft";

export type IssueSeverity = "error" | "warning" | "note";
export type IssueArea = "setup" | "stages" | "supports" | "advanced" | "media" | "review";

export type AuthoringIssue = {
  id: string;
  severity: IssueSeverity;
  area: IssueArea;
  title: string;
  detail: string;
  stageId?: string;
  /** Stable DOM target used by Review to open and focus the relevant editor. */
  targetId?: string;
};

function words(value: string | undefined): number {
  return (value ?? "").trim().split(/\s+/).filter(Boolean).length;
}

function learnerReferenceProblem(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.hostname.toLowerCase() === "pubmed.ncbi.nlm.nih.gov") {
      return "PubMed is an evidence index, not a useful learner destination. Link to openly readable full text or to a substantive research-to-practice guide that explains the claim and its application.";
    }
  } catch {
    // Structural URL validation reports malformed or unsafe values separately.
  }
  return undefined;
}

function questionTextIssues(
  question: Question,
  label: string,
  area: IssueArea,
  stageId: string,
  add: (issue: Omit<AuthoringIssue, "id">) => void,
) {
  const untouched =
    !question.prompt.trim() &&
    question.options.every((option) => !option.trim()) &&
    !question.rationale.trim() &&
    (question.optionNotes ?? []).every((note) => !note.trim());
  if (untouched) {
    add({ severity: "error", area, stageId, targetId: `question-${question.id}-prompt`, title: `${label} is not written`, detail: "Write the prompt, four choices, rationale and feedback for each wrong option." });
    return;
  }
  if (!question.prompt.trim()) {
    add({ severity: "error", area, stageId, targetId: `question-${question.id}-prompt`, title: `${label} needs a prompt`, detail: "Write the decision or knowledge question the learner must answer." });
  }
  if (question.options.length !== 4 || question.options.some((option) => !option.trim())) {
    add({ severity: "error", area, stageId, targetId: `question-${question.id}-option-0`, title: `${label} needs four complete options`, detail: "The current learner player uses exactly four non-empty choices." });
  }
  const normalised = question.options.map((option) => option.trim().toLowerCase()).filter(Boolean);
  if (new Set(normalised).size !== normalised.length) {
    add({ severity: "error", area, stageId, targetId: `question-${question.id}-option-0`, title: `${label} repeats an option`, detail: "Every choice must be meaningfully distinct." });
  }
  if (!question.rationale.trim()) {
    add({ severity: "error", area, stageId, targetId: `question-${question.id}-rationale`, title: `${label} needs a rationale`, detail: "Explain why the keyed answer is correct after the learner submits." });
  }
  const notes = question.optionNotes ?? [];
  if (notes.length !== 4) {
    add({ severity: "error", area, stageId, targetId: `question-${question.id}-feedback-0`, title: `${label} needs option feedback`, detail: "Provide one feedback entry per option; leave the correct option's entry empty." });
  } else {
    notes.forEach((note, index) => {
      if (index === question.answer && note.trim()) {
        add({ severity: "error", area, stageId, targetId: `question-${question.id}-prompt`, title: `${label} reveals its answer`, detail: "The correct option's feedback entry must be empty." });
      }
      if (index !== question.answer && !note.trim()) {
        add({ severity: "error", area, stageId, targetId: `question-${question.id}-feedback-${index}`, title: `${label} has unexplained distractors`, detail: "Each wrong option needs feedback explaining the specific misconception." });
      }
    });
  }
  if (question.options.length === 4 && question.options.every((option) => option.trim())) {
    const lengths = question.options.map((option) => words(option));
    const keyLength = lengths[question.answer] ?? 0;
    const distractorMean = lengths
      .filter((_, index) => index !== question.answer)
      .reduce((sum, length) => sum + length, 0) / 3;
    if (distractorMean > 0 && keyLength / distractorMean > 1.45) {
      add({ severity: "warning", area, stageId, targetId: `question-${question.id}-option-${question.answer}`, title: `${label}'s answer stands out by length`, detail: `The keyed answer is ${keyLength} words and the distractors average ${distractorMean.toFixed(1)}. Shorten the key or strengthen the distractors so length does not reveal the answer.` });
    }
  }
}

export function evaluateCourse(source: TrainingPackage): AuthoringIssue[] {
  const issues: AuthoringIssue[] = [];
  let sequence = 0;
  const add = (issue: Omit<AuthoringIssue, "id">) => {
    sequence += 1;
    issues.push({ ...issue, id: `issue-${sequence}` });
  };

  let entry: TrainingPackage;
  try {
    entry = packageForExport(source);
    for (const message of validateTrainingPackage(entry)) {
      const area: IssueArea = /asset|slide/i.test(message) ? "media" : /case|capstone|field-guide|exemplar|divergence|toolkit/i.test(message) ? "advanced" : "review";
      add({ severity: "error", area, title: "Package structure is invalid", detail: message });
    }
  } catch (error) {
    add({
      severity: "error",
      area: "review",
      title: "Course data cannot be read",
      detail: error instanceof Error ? error.message : String(error),
    });
    return issues;
  }

  const requiredManifest: Array<[keyof typeof entry.manifest, string]> = [
    ["title", "course title"],
    ["subtitle", "course subtitle"],
    ["publisher", "publisher or owning team"],
    ["source", "governing source description"],
    ["summary", "course summary"],
    ["arc", "learning arc"],
  ];
  for (const [key, label] of requiredManifest) {
    if (!String(entry.manifest[key] ?? "").trim()) {
      add({ severity: "error", area: "setup", targetId: `manifest-${String(key)}`, title: `Add the ${label}`, detail: "This appears in the learner overview and the exported package record." });
    }
  }

  if (entry.manifest.status === "available" && !entry.manifest.reviewed.trim()) {
    add({ severity: "error", area: "review", targetId: "manifest-reviewed", title: "Add the content review date", detail: "Record the completed content review before releasing the course as Available." });
  }

  if (!entry.content.sources.length) {
    add({ severity: "error", area: "setup", targetId: "source-register", title: "Add at least one source", detail: "A course needs an identifiable governing document or evidence base." });
  }
  for (const [index, sourceItem] of entry.content.sources.entries()) {
    if (!sourceItem.id.trim() || !sourceItem.title.trim() || !sourceItem.publisher.trim() || !sourceItem.note.trim()) {
      add({ severity: "error", area: "setup", targetId: `source-${index}-title`, title: `Complete source ${index + 1}`, detail: "Each source needs an id, title, publisher and note explaining how it is used." });
    }
    if (!sourceItem.checked?.trim()) {
      add({ severity: "warning", area: "setup", targetId: `source-${index}-checked`, title: `Record when source ${index + 1} was checked`, detail: "A verification date makes future review and version decisions possible." });
    }
    const referenceProblem = learnerReferenceProblem(sourceItem.url);
    if (referenceProblem) {
      add({ severity: "error", area: "setup", targetId: `source-${index}-url`, title: `Replace source ${index + 1}'s database-only link`, detail: referenceProblem });
    }
  }

  const allQuestionIds: string[] = [];
  for (const stage of entry.content.modules) {
    const stageLabel = `Stage ${stage.number}`;
    if (!stage.id.trim() || !stage.title.trim() || !stage.subtitle.trim()) {
      add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-title`, title: `${stageLabel} needs its identity`, detail: "Add a stable id, learner-facing title and subtitle." });
    }
    if (!stage.outcome.trim() || !stage.coreIdea.trim()) {
      add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-outcome`, title: `${stageLabel} needs an outcome and core idea`, detail: "State what the learner can do, then the single idea they should retain." });
    }
    if (stage.sections.length < 2) {
      add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-sections`, title: `${stageLabel} needs at least two lesson sections`, detail: "One section rarely establishes and then applies an idea." });
    }
    const bodyWords = stage.sections.reduce((sum, section) => sum + words(section.body), 0);
    if (bodyWords < 300) {
      add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-section-0-body`, title: `${stageLabel} is still a stub`, detail: `${bodyWords} of the minimum 300 body words are present.` });
    }
    stage.sections.forEach((section, index) => {
      if (!section.heading.trim() || !section.body.trim()) {
        add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-section-${index}-heading`, title: `${stageLabel}, section ${index + 1} is incomplete`, detail: "Every lesson section needs a heading and an explanation." });
      }
      if (!(section.sourceIds?.length)) {
        add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-section-${index}-source`, title: `${stageLabel}, section ${index + 1} has no source`, detail: "Select the source that supports the teaching claim." });
      }
    });

    if (stage.questions.length < 4) {
      add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-questions`, title: `${stageLabel} needs four knowledge questions`, detail: "Four is the minimum for the current mastery threshold to be meaningful." });
    }
    if (stage.scenarios.length !== 2) {
      add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-scenarios`, title: `${stageLabel} needs exactly two scenarios`, detail: "The learner workflow requires both applied decisions to be solved." });
    }
    stage.questions.forEach((question, index) => {
      allQuestionIds.push(question.id);
      questionTextIssues(question, `${stageLabel} question ${index + 1}`, "stages", stage.id, add);
    });
    stage.scenarios.forEach((scenario, index) => {
      allQuestionIds.push(scenario.id);
      if (!scenario.context.trim()) {
        add({ severity: "error", area: "stages", stageId: stage.id, targetId: `question-${scenario.id}-context`, title: `${stageLabel} scenario ${index + 1} needs context`, detail: "Give the learner the situation and decision constraints before asking the question." });
      }
      questionTextIssues(scenario, `${stageLabel} scenario ${index + 1}`, "stages", stage.id, add);
    });

    const assignment = stage.assignment;
    if (!assignment.title.trim() || !assignment.instruction.trim() || !assignment.prompts.length || assignment.prompts.some((prompt) => !prompt.trim())) {
      add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-assignment-title`, title: `${stageLabel} needs a complete assignment`, detail: "Add a title, instruction and at least one concrete writing prompt." });
    }
    if (words(assignment.modelAnswer) < 100) {
      add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-assignment-answer`, title: `${stageLabel}'s worked answer is too thin`, detail: `${words(assignment.modelAnswer)} of the minimum 100 words are present.` });
    }
    if ((assignment.criteria ?? []).filter((item) => item.trim()).length < 2) {
      add({ severity: "error", area: "stages", stageId: stage.id, targetId: `stage-${stage.id}-assignment-criteria`, title: `${stageLabel} needs at least two review criteria`, detail: "Criteria let learners judge their response against observable qualities." });
    }

    const diagnostics = entry.content.diagnosticQuestions.filter((item) => item.moduleId === stage.id);
    if (!diagnostics.length) {
      add({ severity: "error", area: "supports", stageId: stage.id, targetId: `support-${stage.id}-diagnostic`, title: `${stageLabel} is absent from the diagnostic`, detail: "Add at least one independent diagnostic question for this stage." });
    }
    diagnostics.forEach((question, index) => {
      allQuestionIds.push(question.id);
      questionTextIssues(question, `${stageLabel} diagnostic ${index + 1}`, "supports", stage.id, add);
    });

    const cards = entry.content.flashcards.filter((item) => item.moduleId === stage.id);
    for (const kind of ["definition", "application", "discrimination"] as const) {
      const matching = cards.filter((item) => item.kind === kind);
      if (!matching.length) {
        add({ severity: "error", area: "supports", stageId: stage.id, targetId: `support-${stage.id}-cards`, title: `${stageLabel} needs a ${kind} card`, detail: "The review deck needs definition, transfer and discrimination prompts." });
      }
      if (matching.some((item) => !item.front.trim() || !item.back.trim())) {
        add({ severity: "error", area: "supports", stageId: stage.id, targetId: `support-${matching[0]?.id ?? `${stage.id}-cards`}-prompt`, title: `${stageLabel} has an incomplete ${kind} card`, detail: "Write both the retrieval prompt and its answer." });
      }
    }
    const terms = entry.content.glossary.filter((item) => item.moduleId === stage.id);
    if (!terms.length || terms.some((item) => !item.term.trim() || !item.definition.trim() || !item.origin.trim())) {
      add({ severity: "error", area: "supports", stageId: stage.id, targetId: `support-${stage.id}-glossary-0-term`, title: `${stageLabel} needs a complete glossary entry`, detail: "Define at least one term the learner should not be expected to know already." });
    }
    const contrasts = entry.content.contrasts.filter((item) => item.moduleId === stage.id);
    if (!contrasts.length || contrasts.some((item) => !item.good.trim() || !item.usual.trim() || !item.tell.trim())) {
      add({ severity: "error", area: "supports", stageId: stage.id, targetId: `support-${stage.id}-contrast-0-good`, title: `${stageLabel} needs a complete practice contrast`, detail: "State good practice, the common substitute and an observable way to tell them apart." });
    }
  }

  for (const question of entry.content.supplementaryQuestions) {
    allQuestionIds.push(question.id);
    questionTextIssues(question, `Supplementary question ${question.id}`, "supports", question.moduleId, add);
  }
  if (new Set(allQuestionIds).size !== allQuestionIds.length) {
    add({ severity: "error", area: "review", targetId: "review-checks", title: "Question ids are not unique", detail: "Every question, scenario and diagnostic item needs a unique id across the course." });
  }

  if (!entry.content.caseStudies.length) add({ severity: "warning", area: "advanced", targetId: "advanced-cases", title: "No worked case is included", detail: "The core course will work, but learners will not see the stages connected in one realistic example." });
  entry.content.caseStudies.forEach((study, index) => {
    if (!study.id.trim() || !study.title.trim() || !study.subtitle.trim() || !study.summary.trim() || !study.closing.trim() || !study.steps.length) {
      add({ severity: "error", area: "advanced", targetId: "advanced-cases", title: `Complete worked case ${index + 1}`, detail: "A case needs its identity, opening, at least one stage-linked step and closing lesson." });
    }
    if (study.steps.some((step) => !step.moduleId.trim() || !step.heading.trim() || !step.body.trim() || !step.insight.trim())) {
      add({ severity: "error", area: "advanced", targetId: "advanced-cases", title: `${study.title || `Case ${index + 1}`} has an incomplete step`, detail: "Every case step needs a course stage, heading, event and teaching insight." });
    }
  });

  entry.content.toolkitTemplates.forEach((tool, index) => {
    if (!tool.id.trim() || !tool.title.trim() || !tool.prompt.trim() || !tool.example.trim()) {
      add({ severity: "error", area: "advanced", targetId: "advanced-toolkit", title: `Complete toolkit item ${index + 1}`, detail: "Every tool needs an id, title, reusable prompt or structure and worked example." });
    }
  });

  const anyCapstone = Boolean(entry.content.capstoneBriefs.length || entry.content.capstoneSteps.length || entry.content.capstoneRubric.length);
  if (!anyCapstone) {
    add({ severity: "warning", area: "advanced", targetId: "advanced-capstone", title: "No capstone is included", detail: "The course can be exported, but it has no integrated final application." });
  } else {
    if (!entry.content.capstoneBriefs.length || !entry.content.capstoneSteps.length || !entry.content.capstoneRubric.length) {
      add({ severity: "error", area: "advanced", targetId: "advanced-capstone", title: "The capstone is only partly built", detail: "A capstone needs at least one brief, one production step and one rubric criterion." });
    }
    if (entry.content.capstoneBriefs.some((item) => !item.id.trim() || !item.title.trim() || !item.short.trim() || !item.brief.trim() || !item.twist.trim())) add({ severity: "error", area: "advanced", targetId: "advanced-capstone", title: "A capstone brief is incomplete", detail: "Complete every brief identity, situation and complication." });
    if (entry.content.capstoneSteps.some((item) => !item.id.trim() || !item.title.trim() || !item.prompt.trim() || !item.checks.length || item.checks.some((check) => !check.trim()))) add({ severity: "error", area: "advanced", targetId: "advanced-capstone", title: "A capstone production step is incomplete", detail: "Every step needs a prompt and at least one completion check." });
    if (entry.content.capstoneRubric.some((item) => !item.id.trim() || !item.title.trim() || !item.detail.trim())) add({ severity: "error", area: "advanced", targetId: "advanced-capstone", title: "A capstone rubric item is incomplete", detail: "Every criterion needs a title and observable evidence description." });
  }

  if (!entry.content.fieldGuide.length) add({ severity: "note", area: "advanced", targetId: "advanced-field-guide", title: "No field guide is included", detail: "This is optional; lesson and support content remain available through search and the complete guide." });
  entry.content.fieldGuide.forEach((guide, index) => {
    if (!guide.id.trim() || !guide.title.trim() || !guide.summary.trim() || !guide.items.length || guide.items.some((item) => !item.term.trim() || !item.detail.trim())) {
      add({ severity: "error", area: "advanced", targetId: "advanced-field-guide", title: `Complete field-guide entry ${index + 1}`, detail: "A guide entry needs its identity, summary and at least one complete term-detail pair." });
    }
  });
  entry.content.divergences.forEach((item, index) => {
    if (!item.id.trim() || !item.topic.trim() || !item.deck.trim() || !item.here.trim() || !item.why.trim()) add({ severity: "error", area: "advanced", targetId: "advanced-source-differences", title: `Complete source difference ${index + 1}`, detail: "State the topic, source position, course position and reason for the difference." });
  });
  if (!entry.content.exemplars.length) add({ severity: "note", area: "advanced", targetId: "advanced-exemplars", title: "No worked document is included", detail: "Add one if the course teaches learners to produce a formal artefact." });
  entry.content.exemplars.forEach((item, index) => {
    if (!item.id.trim() || !item.tab.trim() || !item.title.trim() || !item.subtitle.trim() || !item.intro.trim() || !item.closing.trim() || !item.sections.length) add({ severity: "error", area: "advanced", targetId: "advanced-exemplars", title: `Complete exemplar ${index + 1}`, detail: "A worked document needs its identity, introduction, at least one section and closing note." });
    if (item.sections.some((section) => !section.heading.trim() || !section.note.trim() || (!(section.body?.length) && !(section.body2?.length) && !section.artefact?.trim() && !(section.table?.rows.length)))) add({ severity: "error", area: "advanced", targetId: "advanced-exemplars", title: `${item.title || `Exemplar ${index + 1}`} has an incomplete section`, detail: "Each section needs a heading, content and coaching note." });
  });

  const assets = entry.content.assets ?? [];
  if (entry.content.slides.some((slide) => !slide.title.trim())) add({ severity: "error", area: "media", targetId: "media-slides", title: "A source slide has no title", detail: "Give every slide a concise title so learners and citations can identify it." });
  if (assets.some((asset) => !asset.alt.trim())) add({ severity: "error", area: "media", targetId: "media-assets", title: "An image has no text alternative", detail: "Describe the useful information in every imported slide and stage visual." });

  return issues;
}

export function issueCounts(issues: AuthoringIssue[]) {
  return {
    errors: issues.filter((issue) => issue.severity === "error").length,
    warnings: issues.filter((issue) => issue.severity === "warning").length,
    notes: issues.filter((issue) => issue.severity === "note").length,
  };
}
