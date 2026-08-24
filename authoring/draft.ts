import {
  PACKAGE_SCHEMA_VERSION,
  type Contrast,
  type Flashcard,
  type FlashcardKind,
  type GlossaryEntry,
  type Module,
  type Question,
  type Scenario,
  type TrainingPackage,
} from "../src/package-model";
import { buildPracticeQuestions, withDerivedMinutes } from "../src/package-utils";

export const DRAFT_SCHEMA_VERSION = 1 as const;
export const DRAFT_STORAGE_KEY = "product-practice:course-workshop:draft-v1";

export type ReleaseChecklist = {
  subjectMatterChecked: boolean;
  learningFlowChecked: boolean;
  handlingChecked: boolean;
  releaseApproved: boolean;
  approvalReference: string;
  approvalDate: string;
};

export const EMPTY_RELEASE_CHECKLIST: ReleaseChecklist = {
  subjectMatterChecked: false,
  learningFlowChecked: false,
  handlingChecked: false,
  releaseApproved: false,
  approvalReference: "",
  approvalDate: "",
};

export type AuthoringDraft = {
  draftSchemaVersion: typeof DRAFT_SCHEMA_VERSION;
  savedAt: string;
  package: TrainingPackage;
  release: ReleaseChecklist;
};

export type LoadedDraft = {
  package: TrainingPackage;
  release: ReleaseChecklist;
};

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function nextId(prefix: string, used: Iterable<string>): string {
  const existing = new Set(used);
  let number = 1;
  while (existing.has(`${prefix}-${number}`)) number += 1;
  return `${prefix}-${number}`;
}

export function blankQuestion(moduleId: string, id: string): Question {
  return {
    id,
    moduleId,
    prompt: "",
    options: ["", "", "", ""],
    answer: 0,
    rationale: "",
    optionNotes: ["", "", "", ""],
  };
}

export function blankScenario(moduleId: string, id: string): Scenario {
  return { ...blankQuestion(moduleId, id), context: "" };
}

export function createStage(number: number, usedIds: Iterable<string>): Module {
  const id = nextId("stage", usedIds);
  return {
    id,
    number,
    title: "",
    subtitle: "",
    minutes: 5,
    slides: "",
    outcome: "",
    coreIdea: "",
    sections: [
      { heading: "", body: "", sourceIds: [] },
      { heading: "", body: "", sourceIds: [] },
    ],
    questions: Array.from({ length: 4 }, (_, index) => blankQuestion(id, `${id}-question-${index + 1}`)),
    scenarios: Array.from({ length: 2 }, (_, index) => blankScenario(id, `${id}-scenario-${index + 1}`)),
    assignment: {
      title: "",
      instruction: "",
      prompts: [""],
      modelAnswer: "",
      criteria: ["", ""],
    },
  };
}

function supportCards(moduleId: string): Flashcard[] {
  const kinds: FlashcardKind[] = ["definition", "application", "discrimination"];
  return kinds.map((kind) => ({
    id: `${moduleId}-card-${kind}`,
    moduleId,
    front: "",
    back: "",
    kind,
  }));
}

function supportGlossary(moduleId: string): GlossaryEntry[] {
  return [{ term: "", definition: "", origin: "Course", moduleId }];
}

function supportContrast(moduleId: string): Contrast[] {
  return [{ moduleId, good: "", usual: "", tell: "" }];
}

export function createStarterPackage(): TrainingPackage {
  const stage = createStage(1, []);

  return {
    manifest: {
      schemaVersion: PACKAGE_SCHEMA_VERSION,
      version: "0.1.0",
      id: "new-course",
      title: "",
      subtitle: "",
      publisher: "",
      source: "",
      reviewed: "",
      status: "draft",
      summary: "",
      arc: "",
    },
    content: {
      modules: [stage],
      sources: [{ id: "source-1", title: "", publisher: "", note: "", checked: "" }],
      totalMinutes: 5,
      practiceQuestions: [],
      diagnosticQuestions: [blankQuestion(stage.id, `${stage.id}-diagnostic-1`)],
      supplementaryQuestions: [],
      flashcards: supportCards(stage.id),
      glossary: supportGlossary(stage.id),
      caseStudies: [],
      contrasts: supportContrast(stage.id),
      divergences: [],
      toolkitTemplates: [],
      capstoneSteps: [],
      capstoneBriefs: [],
      capstoneRubric: [],
      fieldGuide: [],
      exemplars: [],
      slides: [],
      slideCount: 0,
      assets: [],
      contentReviewed: "",
    },
  };
}

export function addStage(entry: TrainingPackage): TrainingPackage {
  const modules = entry.content.modules;
  const stage = createStage(modules.length + 1, modules.map((item) => item.id));
  return {
    ...entry,
    content: {
      ...entry.content,
      modules: [...modules, stage],
      diagnosticQuestions: [
        ...entry.content.diagnosticQuestions,
        blankQuestion(stage.id, `${stage.id}-diagnostic-1`),
      ],
      flashcards: [...entry.content.flashcards, ...supportCards(stage.id)],
      glossary: [...entry.content.glossary, ...supportGlossary(stage.id)],
      contrasts: [...entry.content.contrasts, ...supportContrast(stage.id)],
    },
  };
}

export function removeStage(entry: TrainingPackage, moduleId: string): TrainingPackage {
  const removed = entry.content.modules.find((module) => module.id === moduleId);
  const retainedSlides = entry.content.slides.filter((slide) => slide.stage !== moduleId);
  const retainedAssetIds = new Set([
    ...entry.content.modules.filter((module) => module.id !== moduleId).map((module) => module.visualAssetId),
    ...retainedSlides.map((slide) => slide.assetId),
  ].filter(Boolean));
  const removedSlideAssetIds = new Set(
    entry.content.slides.filter((slide) => slide.stage === moduleId).map((slide) => slide.assetId).filter(Boolean),
  );
  const removedAssetIds = new Set(
    [removed?.visualAssetId, ...removedSlideAssetIds].filter((assetId) => assetId && !retainedAssetIds.has(assetId)),
  );
  const modules = entry.content.modules
    .filter((module) => module.id !== moduleId)
    .map((module, index) => ({ ...module, number: index + 1 }));
  const keepQuestion = <T extends { moduleId: string }>(item: T) => item.moduleId !== moduleId;
  return {
    ...entry,
    content: {
      ...entry.content,
      modules,
      diagnosticQuestions: entry.content.diagnosticQuestions.filter(keepQuestion),
      supplementaryQuestions: entry.content.supplementaryQuestions.filter(keepQuestion),
      flashcards: entry.content.flashcards.filter(keepQuestion),
      glossary: entry.content.glossary.filter((item) => item.moduleId !== moduleId),
      contrasts: entry.content.contrasts.filter(keepQuestion),
      caseStudies: entry.content.caseStudies.map((study) => ({
        ...study,
        steps: study.steps.filter(keepQuestion),
      })),
      slides: retainedSlides,
      slideCount: retainedSlides.length,
      assets: entry.content.assets?.filter((asset) => !removedAssetIds.has(asset.id)),
    },
  };
}

export function renameStageId(entry: TrainingPackage, oldId: string, proposed: string): TrainingPackage {
  const newId = slugify(proposed);
  if (!newId || oldId === newId) return entry;
  const remap = <T extends { moduleId: string }>(item: T): T =>
    item.moduleId === oldId ? { ...item, moduleId: newId } : item;
  return {
    ...entry,
    content: {
      ...entry.content,
      modules: entry.content.modules.map((module) =>
        module.id === oldId
          ? {
              ...module,
              id: newId,
              questions: module.questions.map((item) => remap(item)),
              scenarios: module.scenarios.map((item) => remap(item)),
            }
          : module,
      ),
      diagnosticQuestions: entry.content.diagnosticQuestions.map(remap),
      supplementaryQuestions: entry.content.supplementaryQuestions.map(remap),
      flashcards: entry.content.flashcards.map(remap),
      glossary: entry.content.glossary.map((item) =>
        item.moduleId === oldId ? { ...item, moduleId: newId } : item,
      ),
      contrasts: entry.content.contrasts.map(remap),
      caseStudies: entry.content.caseStudies.map((study) => ({
        ...study,
        steps: study.steps.map(remap),
      })),
      slides: entry.content.slides.map((slide) =>
        slide.stage === oldId ? { ...slide, stage: newId } : slide,
      ),
    },
  };
}

export function renameSourceId(entry: TrainingPackage, oldId: string, proposed: string): TrainingPackage {
  const newId = slugify(proposed);
  if (!newId || oldId === newId) return entry;
  return {
    ...entry,
    content: {
      ...entry.content,
      sources: entry.content.sources.map((source) => source.id === oldId ? { ...source, id: newId } : source),
      modules: entry.content.modules.map((module) => ({
        ...module,
        sections: module.sections.map((section) => ({
          ...section,
          sourceIds: section.sourceIds?.map((sourceId) => sourceId === oldId ? newId : sourceId),
          sourceReferences: section.sourceReferences?.map((reference) =>
            reference.sourceId === oldId ? { ...reference, sourceId: newId } : reference,
          ),
        })),
      })),
      fieldGuide: entry.content.fieldGuide.map((guide) => ({
        ...guide,
        sourceIds: guide.sourceIds.map((sourceId) => sourceId === oldId ? newId : sourceId),
        sourceReferences: guide.sourceReferences?.map((reference) =>
          reference.sourceId === oldId ? { ...reference, sourceId: newId } : reference,
        ),
      })),
      assets: entry.content.assets?.map((asset) =>
        asset.sourceId === oldId ? { ...asset, sourceId: newId } : asset,
      ),
    },
  };
}

function cleanText(value: string | undefined): string {
  return (value ?? "").trim();
}

/** Create the canonical data emitted to the learner player and developer ZIP. */
export function packageForExport(source: TrainingPackage): TrainingPackage {
  const entry = structuredClone(source);
  entry.manifest.id = slugify(entry.manifest.id);
  entry.manifest.title = cleanText(entry.manifest.title);
  entry.manifest.subtitle = cleanText(entry.manifest.subtitle);
  entry.manifest.publisher = cleanText(entry.manifest.publisher);
  entry.manifest.source = cleanText(entry.manifest.source);
  entry.manifest.reviewed = cleanText(entry.manifest.reviewed);
  entry.manifest.summary = cleanText(entry.manifest.summary);
  entry.manifest.arc = cleanText(entry.manifest.arc);

  entry.content.modules = withDerivedMinutes(
    entry.content.modules.map((module, index) => ({
      ...module,
      number: index + 1,
      id: slugify(module.id),
      title: cleanText(module.title),
      subtitle: cleanText(module.subtitle),
      outcome: cleanText(module.outcome),
      coreIdea: cleanText(module.coreIdea),
      sections: module.sections.map((section) => ({
        ...section,
        heading: cleanText(section.heading),
        body: cleanText(section.body),
        bullets: section.bullets?.map(cleanText).filter(Boolean),
        example: section.example ? cleanText(section.example) : undefined,
      })),
    })),
  );
  entry.content.totalMinutes = entry.content.modules.reduce((sum, module) => sum + module.minutes, 0);
  entry.content.practiceQuestions = buildPracticeQuestions(
    entry.content.modules,
    entry.content.supplementaryQuestions,
  );
  entry.content.slideCount = entry.content.slides.length;
  entry.content.assets = entry.content.assets?.map((asset) => ({
    ...asset,
    id: slugify(asset.id),
    fileName: cleanText(asset.fileName),
    alt: cleanText(asset.alt),
    caption: asset.caption ? cleanText(asset.caption) : undefined,
  }));
  entry.content.contentReviewed = entry.manifest.reviewed;
  return entry;
}

export function makeDraft(entry: TrainingPackage, release: ReleaseChecklist = EMPTY_RELEASE_CHECKLIST): AuthoringDraft {
  return {
    draftSchemaVersion: DRAFT_SCHEMA_VERSION,
    savedAt: new Date().toISOString(),
    package: entry,
    release: { ...release },
  };
}

function normaliseRelease(value: unknown): ReleaseChecklist {
  if (!value || typeof value !== "object") return { ...EMPTY_RELEASE_CHECKLIST };
  const candidate = value as Partial<ReleaseChecklist>;
  return {
    subjectMatterChecked: candidate.subjectMatterChecked === true,
    learningFlowChecked: candidate.learningFlowChecked === true,
    handlingChecked: candidate.handlingChecked === true,
    releaseApproved: candidate.releaseApproved === true,
    approvalReference: typeof candidate.approvalReference === "string" ? candidate.approvalReference : "",
    approvalDate: typeof candidate.approvalDate === "string" ? candidate.approvalDate : "",
  };
}

export function readDraft(value: unknown): LoadedDraft {
  if (!value || typeof value !== "object") throw new Error("The selected file does not contain a course draft.");
  const candidate = value as Partial<AuthoringDraft> & Partial<TrainingPackage>;
  if (candidate.draftSchemaVersion !== undefined) {
    if (candidate.draftSchemaVersion !== DRAFT_SCHEMA_VERSION || !candidate.package) {
      throw new Error("This draft uses an unsupported Course Workshop format.");
    }
    return {
      package: structuredClone(candidate.package),
      release: normaliseRelease(candidate.release),
    };
  }
  if (candidate.manifest && candidate.content) {
    return {
      package: structuredClone(candidate as TrainingPackage),
      release: { ...EMPTY_RELEASE_CHECKLIST },
    };
  }
  throw new Error("The file is neither a Course Workshop draft nor a training package.");
}
