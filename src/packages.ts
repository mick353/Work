/**
 * Training packages.
 *
 * This started as one course with its content exported as flat top-level
 * arrays, which was correct while there was one of them and wrong the moment
 * there would be more. A second course would have had to either overwrite the
 * first or be bolted alongside it, sharing one progress record, one review
 * queue and one set of results — so finishing Product Management would have
 * looked like partly finishing whatever came next.
 *
 * The model here is the one the e-learning standards settled on. SCORM and
 * cmi5 both treat a course as a self-contained package with a manifest: the
 * content travels together, the player runs whichever package is active, and
 * progress belongs to the package rather than to the player. That is exactly
 * the shape this needed, and it costs nothing to adopt while there is still
 * only one package.
 *
 * What a package owns:
 *   - a manifest (identity, provenance, currency)
 *   - all of its content
 *   - its own namespace in storage, so progress can never bleed between them
 *
 * Adding a second package is a data operation, not a rewrite: author the
 * content, add a manifest, register it below.
 */

import {
  CONTENT_REVIEWED,
  modules,
  practiceQuestions,
  sources,
  stageMinutes,
  totalMinutes,
  type Module,
  type PracticeQuestion,
  type Question,
  type Source,
} from "./course";
import { CLOSURE_REVIEWED, closureModules, closureSources } from "./closure-course";
import {
  closureCapstoneBriefs,
  closureCapstoneRubric,
  closureCapstoneSteps,
  closureCaseStudies,
  closureContrasts,
  closureDiagnostic,
  closureDivergences,
  closureFieldGuide,
  closureFlashcards,
  closureGlossary,
  closureSupplementary,
  closureToolkit,
} from "./closure-reference";
import {
  capstoneBriefs,
  capstoneRubric,
  capstoneSteps,
  caseStudies,
  contrasts,
  diagnosticQuestions,
  divergences,
  fieldGuide,
  flashcards,
  glossary,
  supplementaryQuestions,
  toolkitTemplates,
  type CapstoneBrief,
  type CapstoneStep,
  type CaseStudy,
  type Contrast,
  type Divergence,
  type FieldGuideEntry,
  type Flashcard,
  type GlossaryEntry,
  type ToolkitTemplate,
} from "./reference";
import { SLIDE_COUNT, slides, type Slide } from "./slides";

export type PackageStatus = "available" | "in-development";

export type PackageManifest = {
  /** Stable, and used as the storage namespace — never rename in place. */
  id: string;
  title: string;
  subtitle: string;
  /** Who owns the material, not who built the player. */
  publisher: string;
  /** The artefact the package was built from, for provenance. */
  source: string;
  /** When the content was last checked against its sources. */
  reviewed: string;
  status: PackageStatus;
  /** One-line description for the library card. */
  summary: string;
  /**
   * The curriculum arc, in four or five words — shown beside the stage count.
   * Was hardcoded as "From need to measured value", which is true of exactly
   * one course and was being shown on both.
   */
  arc: string;
};

/**
 * Everything a package owns.
 *
 * The player reads content through this and nothing else, so a second package
 * is authored rather than built: write the arrays, add a manifest, register it.
 */
export type PackageContent = {
  modules: Module[];
  sources: Source[];
  totalMinutes: number;
  practiceQuestions: PracticeQuestion[];
  diagnosticQuestions: Question[];
  supplementaryQuestions: Question[];
  flashcards: Flashcard[];
  glossary: GlossaryEntry[];
  caseStudies: CaseStudy[];
  contrasts: Contrast[];
  divergences: Divergence[];
  toolkitTemplates: ToolkitTemplate[];
  capstoneSteps: CapstoneStep[];
  capstoneBriefs: CapstoneBrief[];
  capstoneRubric: typeof capstoneRubric;
  fieldGuide: FieldGuideEntry[];
  slides: Slide[];
  slideCount: number;
  contentReviewed: string;
};

export type TrainingPackage = {
  manifest: PackageManifest;
  content: PackageContent;
};

/* ------------------------------------------------------------------ *
 * The registry
 * ------------------------------------------------------------------ */

export const PM_FUNDAMENTALS_ID = "pm-fundamentals";

const pmFundamentals: TrainingPackage = {
  manifest: {
    id: PM_FUNDAMENTALS_ID,
    title: "Product Management Fundamentals",
    subtitle: "Product management for Australian Government service delivery",
    publisher: "DEWR Digital Experience and Solutions",
    source: "Product Management Fundamentals — 12AUG2026",
    reviewed: CONTENT_REVIEWED,
    status: "available",
    summary:
      "Nine stages from user need to measured value, built from the departmental deck and turned into something you practise rather than sit through.",
    arc: "From user need to measured value",
  },
  content: {
    modules,
    sources,
    totalMinutes,
    practiceQuestions,
    diagnosticQuestions,
    supplementaryQuestions,
    flashcards,
    glossary,
    caseStudies,
    contrasts,
    divergences,
    toolkitTemplates,
    capstoneSteps,
    capstoneBriefs,
    capstoneRubric,
    fieldGuide,
    slides,
    slideCount: SLIDE_COUNT,
    contentReviewed: CONTENT_REVIEWED,
  },
};

/* ------------------------------------------------------------------ *
 * Closure Reports
 *
 * The first package not built from a slide deck, which is why it is a real
 * test of the container rather than a second copy of the first one: no slides,
 * no divergence register, its own sources, its own stage count. Everything the
 * player does with it, it does because the content says so.
 * ------------------------------------------------------------------ */

export const CLOSURE_REPORTS_ID = "closure-reports";

/*
  Derive stage length from the writing, exactly as the first package does —
  authored `minutes` values are guesses and were wrong by an order of magnitude
  the last time anyone trusted them.
*/
for (const module of closureModules) {
  module.minutes = stageMinutes(module);
}

const closurePractice: PracticeQuestion[] = closureModules.flatMap((module) => [
  ...module.questions,
  ...module.scenarios.map((scenario) => ({
    id: scenario.id,
    moduleId: scenario.moduleId,
    prompt: scenario.prompt,
    options: scenario.options,
    answer: scenario.answer,
    rationale: scenario.rationale,
    optionNotes: scenario.optionNotes,
    context: scenario.context,
  })),
]);

const closureReports: TrainingPackage = {
  manifest: {
    id: CLOSURE_REPORTS_ID,
    title: "Closure Reports",
    subtitle: "Evidence, benefits and handover at the end of delivery",
    publisher: "DEWR Digital Experience and Solutions",
    source: "Commonwealth assurance and performance frameworks",
    reviewed: CLOSURE_REVIEWED,
    status: "available",
    summary:
      "Writing a closure report that survives an audit — marked claims, transferred benefits, lessons that change behaviour, a settled financial and records position, and a handover that works once the team has gone.",
    arc: "From evidence to signed handover",
  },
  content: {
    modules: closureModules,
    sources: closureSources,
    totalMinutes: closureModules.reduce((sum, module) => sum + module.minutes, 0),
    practiceQuestions: closurePractice,
    diagnosticQuestions: closureDiagnostic,
    supplementaryQuestions: closureSupplementary,
    flashcards: closureFlashcards,
    glossary: closureGlossary,
    caseStudies: closureCaseStudies,
    contrasts: closureContrasts,
    divergences: closureDivergences,
    toolkitTemplates: closureToolkit,
    capstoneSteps: closureCapstoneSteps,
    capstoneBriefs: closureCapstoneBriefs,
    capstoneRubric: closureCapstoneRubric,
    fieldGuide: closureFieldGuide,
    slides: [],
    slideCount: 0,
    contentReviewed: CLOSURE_REVIEWED,
  },
};

export const trainingPackages: TrainingPackage[] = [pmFundamentals, closureReports];

export function findPackage(id: string): TrainingPackage | undefined {
  return trainingPackages.find((entry) => entry.manifest.id === id);
}

/**
 * The package currently being studied.
 *
 * There is one today. The point of routing every read through here is that
 * there does not have to be one tomorrow, and nothing downstream has to change
 * when that happens.
 */
export function activePackage(id: string): TrainingPackage {
  return findPackage(id) ?? pmFundamentals;
}

/* ------------------------------------------------------------------ *
 * Package-scoped counts, for the library card
 * ------------------------------------------------------------------ */

export function packageStats(entry: TrainingPackage) {
  const c = entry.content;
  const questions =
    c.modules.reduce((sum, module) => sum + module.questions.length + module.scenarios.length, 0) +
    c.supplementaryQuestions.length +
    c.diagnosticQuestions.length;
  return {
    stages: c.modules.length,
    questions,
    cards: c.flashcards.length,
    slides: c.slideCount,
    minutes: c.totalMinutes,
  };
}
