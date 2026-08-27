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
import { workshopQualityProfile } from "../src/course-quality-profiles";

export const DRAFT_SCHEMA_VERSION = 2 as const;
export const DRAFT_STORAGE_KEY = "product-practice:course-workshop:draft-v2";
export const LEGACY_DRAFT_STORAGE_KEYS = ["product-practice:course-workshop:draft-v1"] as const;

export type ReleaseChecklist = {
  subjectMatterChecked: boolean;
  learningFlowChecked: boolean;
  handlingChecked: boolean;
  releaseApproved: boolean;
  /** Optional acknowledgement that advisory findings were reviewed and may remain. */
  advisoriesReviewed: boolean;
  reviewerName: string;
  reviewerRole: string;
  approverName: string;
  approverRole: string;
  approvalScope: string;
  approvalReference: string;
  approvalDate: string;
};

export const EMPTY_RELEASE_CHECKLIST: ReleaseChecklist = {
  subjectMatterChecked: false,
  learningFlowChecked: false,
  handlingChecked: false,
  releaseApproved: false,
  advisoriesReviewed: false,
  reviewerName: "",
  reviewerRole: "",
  approverName: "",
  approverRole: "",
  approvalScope: "",
  approvalReference: "",
  approvalDate: "",
};

export type DraftLineage = {
  draftId: string;
  revision: number;
  createdAt: string;
  lastExportedAt?: string;
  origin: "blank" | "clone" | "imported-package" | "migrated-v1";
  basedOn?: { packageId: string; packageVersion: string };
};

export type AuthoringDraft = {
  draftSchemaVersion: typeof DRAFT_SCHEMA_VERSION;
  savedAt: string;
  lineage: DraftLineage;
  package: TrainingPackage;
  release: ReleaseChecklist;
};

export type LoadedDraft = {
  package: TrainingPackage;
  release: ReleaseChecklist;
  lineage: DraftLineage;
  migrationNotice?: string;
};

function newDraftId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `draft-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createDraftLineage(
  origin: DraftLineage["origin"] = "blank",
  basedOn?: { packageId: string; packageVersion: string },
): DraftLineage {
  return {
    draftId: newDraftId(),
    revision: 1,
    createdAt: new Date().toISOString(),
    origin,
    ...(basedOn ? { basedOn } : {}),
  };
}

export function nextDraftRevision(lineage: DraftLineage): DraftLineage {
  return { ...lineage, revision: lineage.revision + 1, lastExportedAt: new Date().toISOString() };
}

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
    qualityProfile: workshopQualityProfile(1),
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
  entry.manifest.schemaVersion = PACKAGE_SCHEMA_VERSION;
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
  const profile = entry.qualityProfile ?? workshopQualityProfile(entry.content.modules.length);
  const usesWorkshopBaseline = profile.minimumAssignmentCriteria === 2 &&
    profile.minimumWorkedReasoningPassages === 0 &&
    profile.minimumCaseStageCoverage === 0;
  entry.qualityProfile = usesWorkshopBaseline
    ? workshopQualityProfile(entry.content.modules.length)
    : { ...profile, stageCount: entry.content.modules.length };
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

export function clearReviewEvidence(source: TrainingPackage): TrainingPackage {
  const entry = structuredClone(source);
  entry.manifest.schemaVersion = PACKAGE_SCHEMA_VERSION;
  entry.qualityProfile = entry.qualityProfile ?? workshopQualityProfile(entry.content.modules.length);
  entry.manifest.status = "draft";
  entry.manifest.reviewed = "";
  entry.content.contentReviewed = "";
  entry.content.sources = entry.content.sources.map((item) => ({ ...item, checked: "" }));
  return entry;
}

export function makeDraft(
  entry: TrainingPackage,
  release: ReleaseChecklist = EMPTY_RELEASE_CHECKLIST,
  lineage: DraftLineage = createDraftLineage(),
): AuthoringDraft {
  return {
    draftSchemaVersion: DRAFT_SCHEMA_VERSION,
    savedAt: new Date().toISOString(),
    lineage: { ...lineage, basedOn: lineage.basedOn ? { ...lineage.basedOn } : undefined },
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
    advisoriesReviewed: candidate.advisoriesReviewed === true,
    reviewerName: typeof candidate.reviewerName === "string" ? candidate.reviewerName : "",
    reviewerRole: typeof candidate.reviewerRole === "string" ? candidate.reviewerRole : "",
    approverName: typeof candidate.approverName === "string" ? candidate.approverName : "",
    approverRole: typeof candidate.approverRole === "string" ? candidate.approverRole : "",
    approvalScope: typeof candidate.approvalScope === "string" ? candidate.approvalScope : "",
    approvalReference: typeof candidate.approvalReference === "string" ? candidate.approvalReference : "",
    approvalDate: typeof candidate.approvalDate === "string" ? candidate.approvalDate : "",
  };
}

function normaliseLineage(value: unknown): DraftLineage {
  if (!value || typeof value !== "object") return createDraftLineage();
  const candidate = value as Partial<DraftLineage>;
  const origins: DraftLineage["origin"][] = ["blank", "clone", "imported-package", "migrated-v1"];
  const basedOn = candidate.basedOn &&
    typeof candidate.basedOn.packageId === "string" &&
    typeof candidate.basedOn.packageVersion === "string"
    ? { packageId: candidate.basedOn.packageId, packageVersion: candidate.basedOn.packageVersion }
    : undefined;
  return {
    draftId: typeof candidate.draftId === "string" && candidate.draftId.trim() ? candidate.draftId : newDraftId(),
    revision: Number.isInteger(candidate.revision) && Number(candidate.revision) > 0 ? Number(candidate.revision) : 1,
    createdAt: typeof candidate.createdAt === "string" && candidate.createdAt.trim() ? candidate.createdAt : new Date().toISOString(),
    ...(typeof candidate.lastExportedAt === "string" && candidate.lastExportedAt.trim() ? { lastExportedAt: candidate.lastExportedAt } : {}),
    origin: origins.includes(candidate.origin as DraftLineage["origin"]) ? candidate.origin as DraftLineage["origin"] : "blank",
    ...(basedOn ? { basedOn } : {}),
  };
}

export function readDraft(value: unknown): LoadedDraft {
  if (!value || typeof value !== "object") throw new Error("The selected file does not contain a course draft.");
  const candidate = value as Partial<Omit<AuthoringDraft, "draftSchemaVersion">> & Partial<TrainingPackage> & { draftSchemaVersion?: number };
  if (candidate.draftSchemaVersion !== undefined) {
    if (!candidate.package) {
      throw new Error("This draft uses an unsupported Course Workshop format.");
    }
    if (candidate.draftSchemaVersion === 1) {
      return {
        package: clearReviewEvidence(candidate.package),
        release: { ...EMPTY_RELEASE_CHECKLIST },
        lineage: createDraftLineage("migrated-v1", {
          packageId: candidate.package.manifest.id,
          packageVersion: candidate.package.manifest.version,
        }),
        migrationNotice: "This older draft was upgraded. Review dates and release declarations were cleared because the earlier format could not prove when or by whom they were confirmed.",
      };
    }
    if (candidate.draftSchemaVersion !== DRAFT_SCHEMA_VERSION) {
      throw new Error("This draft uses an unsupported Course Workshop format.");
    }
    return {
      package: packageForExport(candidate.package),
      release: normaliseRelease(candidate.release),
      lineage: normaliseLineage(candidate.lineage),
    };
  }
  if (candidate.manifest && candidate.content) {
    const imported = candidate as TrainingPackage;
    return {
      package: clearReviewEvidence(imported),
      release: { ...EMPTY_RELEASE_CHECKLIST },
      lineage: createDraftLineage("imported-package", {
        packageId: imported.manifest.id,
        packageVersion: imported.manifest.version,
      }),
      migrationNotice: "The package was opened as a new editable draft. Its prior review dates and release declarations were cleared so this version receives a fresh review.",
    };
  }
  throw new Error("The file is neither a Course Workshop draft nor a training package.");
}
