import { PACKAGE_SCHEMA_VERSION, type Question, type TrainingPackage } from "./package-model";

function unique(values: string[], label: string, errors: string[]) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) errors.push(`${label} contains duplicate id "${value}"`);
    seen.add(value);
  }
}

function validateQuestion(question: Question, moduleIds: Set<string>, label: string, errors: string[]) {
  if (!moduleIds.has(question.moduleId)) errors.push(`${label} references unknown stage "${question.moduleId}"`);
  if (question.options.length !== 4) errors.push(`${label} must contain exactly four options`);
  if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
    errors.push(`${label} has an invalid answer index`);
  }
  if (question.optionNotes && question.optionNotes.length !== question.options.length) {
    errors.push(`${label} has ${question.optionNotes.length} option notes for ${question.options.length} options`);
  }
}

/**
 * Structural checks needed when packages eventually arrive from an authoring
 * form rather than the TypeScript compiler. Content-quality checks remain in
 * scripts/qa.mjs; this function protects the package boundary itself.
 */
export function validateTrainingPackage(entry: TrainingPackage): string[] {
  const errors: string[] = [];
  const { manifest, content } = entry;

  if (manifest.schemaVersion !== PACKAGE_SCHEMA_VERSION) {
    errors.push(`unsupported schemaVersion ${manifest.schemaVersion}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.id)) {
    errors.push(`manifest id "${manifest.id}" is not a lowercase slug`);
  }
  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(manifest.version)) {
    errors.push(`manifest version "${manifest.version}" is not semantic versioning`);
  }
  if (!manifest.title.trim()) errors.push("manifest title is empty");
  if (!content.modules.length) errors.push("package contains no stages");

  const rawModuleIds = content.modules.map((module) => module.id);
  const rawSourceIds = content.sources.map((source) => source.id);
  const moduleIds = new Set(rawModuleIds);
  const sourceIds = new Set(rawSourceIds);
  unique(rawModuleIds, "stages", errors);
  unique(rawSourceIds, "sources", errors);

  const ordered = content.modules.map((module) => module.number);
  if (!ordered.every((number, index) => number === index + 1)) {
    errors.push("stage numbers must be contiguous and follow array order");
  }

  for (const module of content.modules) {
    for (const [index, section] of module.sections.entries()) {
      for (const sourceId of section.sourceIds ?? []) {
        if (!sourceIds.has(sourceId)) {
          errors.push(`stage "${module.id}" section ${index + 1} references unknown source "${sourceId}"`);
        }
      }
    }
    for (const question of module.questions) validateQuestion(question, moduleIds, `question "${question.id}"`, errors);
    for (const scenario of module.scenarios) validateQuestion(scenario, moduleIds, `scenario "${scenario.id}"`, errors);
  }

  for (const [name, questions] of [
    ["practice question", content.practiceQuestions],
    ["diagnostic question", content.diagnosticQuestions],
    ["supplementary question", content.supplementaryQuestions],
  ] as const) {
    for (const question of questions) validateQuestion(question, moduleIds, `${name} "${question.id}"`, errors);
  }

  for (const card of content.flashcards) {
    if (!moduleIds.has(card.moduleId)) errors.push(`flashcard "${card.id}" references unknown stage "${card.moduleId}"`);
  }
  for (const term of content.glossary) {
    if (term.moduleId && !moduleIds.has(term.moduleId)) {
      errors.push(`glossary term "${term.term}" references unknown stage "${term.moduleId}"`);
    }
  }
  for (const contrast of content.contrasts) {
    if (!moduleIds.has(contrast.moduleId)) errors.push(`contrast references unknown stage "${contrast.moduleId}"`);
  }
  for (const study of content.caseStudies) {
    for (const step of study.steps) {
      if (!moduleIds.has(step.moduleId)) {
        errors.push(`case "${study.id}" references unknown stage "${step.moduleId}"`);
      }
    }
  }
  for (const guide of content.fieldGuide) {
    for (const sourceId of guide.sourceIds) {
      if (!sourceIds.has(sourceId)) errors.push(`field-guide entry "${guide.id}" references unknown source "${sourceId}"`);
    }
  }
  for (const slide of content.slides) {
    if (!moduleIds.has(slide.stage)) errors.push(`slide ${slide.n} references unknown stage "${slide.stage}"`);
  }
  if (content.slideCount !== content.slides.length) {
    errors.push(`slideCount ${content.slideCount} does not match ${content.slides.length} slide records`);
  }
  if (content.slides.length && !content.slideAssetBase) errors.push("slides are present but slideAssetBase is missing");
  if (content.slideAssetBase && (content.slideAssetBase.includes("..") || /^[a-z]+:/i.test(content.slideAssetBase))) {
    errors.push("slideAssetBase must be a safe relative path");
  }

  return errors.map((error) => `${manifest.id || "unknown-package"}: ${error}`);
}

export function assertValidPackageCatalog(entries: TrainingPackage[]): TrainingPackage[] {
  const errors = entries.flatMap(validateTrainingPackage);
  unique(entries.map((entry) => entry.manifest.id), "package catalog", errors);
  if (errors.length) throw new Error(`Invalid training package catalog:\n- ${errors.join("\n- ")}`);
  return entries;
}
