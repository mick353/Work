/**
 * Versioned, course-neutral contract between training content and the player.
 *
 * Course files may contain TypeScript while they are maintained in this
 * repository, but the shape deliberately contains data only. A future trainer
 * form can therefore emit the same structure as JSON and pass it through the
 * same validation and export pipeline.
 */

export const PACKAGE_SCHEMA_VERSION = 1 as const;
export const CAPSTONE_MIN_WORDS = 60;

export type Question = {
  id: string;
  moduleId: string;
  prompt: string;
  options: string[];
  /** Index into `options`. Display order is permuted per learner at render. */
  answer: number;
  rationale: string;
  /** Per-option feedback. The key may carry an empty string. */
  optionNotes?: string[];
};

export type Scenario = Question & { context: string };
export type PracticeQuestion = Question & { context?: string };

export type LessonTable = {
  caption?: string;
  head: string[];
  rows: string[][];
};

export type LessonSection = {
  heading: string;
  body: string;
  bullets?: string[];
  example?: string;
  table?: LessonTable;
  sourceIds?: string[];
};

export type Assignment = {
  title: string;
  instruction: string;
  prompts: string[];
  modelAnswer?: string;
  criteria?: string[];
};

export type Module = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  /** Derived by the package assembler; authored values are not authoritative. */
  minutes: number;
  /** Human-readable source-slide range, or an empty string. */
  slides: string;
  outcome: string;
  coreIdea: string;
  sections: LessonSection[];
  questions: Question[];
  scenarios: Scenario[];
  assignment: Assignment;
};

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  altUrl?: string;
  altLabel?: string;
  note: string;
  checked?: string;
};

export type FlashcardKind = "definition" | "application" | "discrimination";

export const FLASHCARD_KIND_LABEL: Record<FlashcardKind, string> = {
  definition: "Definition",
  application: "Application",
  discrimination: "Tell apart",
};

export type Flashcard = {
  id: string;
  moduleId: string;
  front: string;
  back: string;
  kind: FlashcardKind;
};

export type ToolkitTemplate = {
  id: string;
  title: string;
  prompt: string;
  example: string;
  note?: string;
};

export type CapstoneStep = {
  id: string;
  title: string;
  prompt: string;
  checks: string[];
};

export type CapstoneRubricItem = {
  id: string;
  title: string;
  detail: string;
};

export type CapstoneBrief = {
  id: string;
  title: string;
  short: string;
  brief: string;
  twist: string;
};

export type FieldGuideEntry = {
  id: string;
  title: string;
  summary: string;
  slides?: string;
  sourceIds: string[];
  items: { term: string; detail: string }[];
};

export type Divergence = {
  id: string;
  topic: string;
  slides: string;
  deck: string;
  here: string;
  why: string;
};

export type GlossaryEntry = {
  term: string;
  definition: string;
  origin: string;
  moduleId?: string;
};

export type CaseStep = {
  moduleId: string;
  stage: number;
  heading: string;
  decision?: string;
  tempting?: string;
  body: string;
  artefact?: string;
  insight: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  outcome: "worked" | "corrected";
  summary: string;
  steps: CaseStep[];
  closing: string;
};

export type Contrast = {
  moduleId: string;
  good: string;
  usual: string;
  tell: string;
};

export type ExemplarSection = {
  heading: string;
  body?: string[];
  table?: LessonTable;
  body2?: string[];
  artefact?: string;
  note: string;
};

export type Exemplar = {
  id: string;
  tab: string;
  title: string;
  subtitle: string;
  intro: string;
  meta: { label: string; value: string }[];
  sections: ExemplarSection[];
  closing: string;
};

export type Slide = {
  n: number;
  stage: string;
  title: string;
  text: string;
};

export type PackageStatus = "draft" | "in-development" | "available" | "retired";

export type PackageManifest = {
  /** Version of this data contract. */
  schemaVersion: typeof PACKAGE_SCHEMA_VERSION;
  /** Version of the course content, independent of the player release. */
  version: string;
  /** Stable storage and asset namespace. Never rename in place. */
  id: string;
  title: string;
  subtitle: string;
  publisher: string;
  sourceAuthor?: string;
  source: string;
  reviewed: string;
  status: PackageStatus;
  summary: string;
  arc: string;
};

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
  capstoneRubric: CapstoneRubricItem[];
  fieldGuide: FieldGuideEntry[];
  exemplars: Exemplar[];
  slides: Slide[];
  slideCount: number;
  /** Relative public path containing slide-NN.webp, without a trailing slash. */
  slideAssetBase?: string;
  contentReviewed: string;
};

export type TrainingPackage = {
  manifest: PackageManifest;
  content: PackageContent;
};
