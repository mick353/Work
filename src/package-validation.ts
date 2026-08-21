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
  const assets = content.assets ?? [];
  const assetIds = new Set(assets.map((asset) => asset.id));
  const assetById = new Map(assets.map((asset) => [asset.id, asset]));
  const slideNumbers = new Set(content.slides.map((slide) => slide.n));
  unique(rawModuleIds, "stages", errors);
  unique(rawSourceIds, "sources", errors);
  unique(assets.map((asset) => asset.id), "assets", errors);
  if (slideNumbers.size !== content.slides.length) errors.push("slides contain duplicate slide numbers");

  const ordered = content.modules.map((module) => module.number);
  if (!ordered.every((number, index) => number === index + 1)) {
    errors.push("stage numbers must be contiguous and follow array order");
  }

  for (const module of content.modules) {
    if (module.visualAssetId && !assetIds.has(module.visualAssetId)) {
      errors.push(`stage "${module.id}" references unknown visual asset "${module.visualAssetId}"`);
    } else if (module.visualAssetId && assetById.get(module.visualAssetId)?.kind !== "image") {
      errors.push(`stage "${module.id}" visual asset must have image kind`);
    }
    for (const [index, section] of module.sections.entries()) {
      for (const sourceId of section.sourceIds ?? []) {
        if (!sourceIds.has(sourceId)) {
          errors.push(`stage "${module.id}" section ${index + 1} references unknown source "${sourceId}"`);
        }
      }
      for (const reference of section.sourceReferences ?? []) {
        if (!sourceIds.has(reference.sourceId)) {
          errors.push(`stage "${module.id}" section ${index + 1} references unknown source "${reference.sourceId}"`);
        }
        for (const slideNumber of reference.slideNumbers ?? []) {
          if (!Number.isInteger(slideNumber) || slideNumber < 1) {
            errors.push(`stage "${module.id}" section ${index + 1} has invalid slide reference "${slideNumber}"`);
          } else if (!slideNumbers.has(slideNumber)) {
            errors.push(`stage "${module.id}" section ${index + 1} references missing slide ${slideNumber}`);
          }
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
    for (const reference of guide.sourceReferences ?? []) {
      if (!sourceIds.has(reference.sourceId)) errors.push(`field-guide entry "${guide.id}" references unknown source "${reference.sourceId}"`);
      for (const slideNumber of reference.slideNumbers ?? []) {
        if (!Number.isInteger(slideNumber) || slideNumber < 1) errors.push(`field-guide entry "${guide.id}" has invalid slide reference "${slideNumber}"`);
        else if (!slideNumbers.has(slideNumber)) errors.push(`field-guide entry "${guide.id}" references missing slide ${slideNumber}`);
      }
    }
  }
  let embeddedAssetCharacters = 0;
  for (const asset of assets) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(asset.id)) errors.push(`asset id "${asset.id}" is not a lowercase slug`);
    if (asset.kind !== "image" && asset.kind !== "slide") errors.push(`asset "${asset.id}" has unsupported kind`);
    if (asset.fileName.includes("/") || asset.fileName.includes("\\") || asset.fileName.includes("..")) errors.push(`asset "${asset.id}" has an unsafe file name`);
    if (asset.sourceId && !sourceIds.has(asset.sourceId)) errors.push(`asset "${asset.id}" references unknown source "${asset.sourceId}"`);
    if (!asset.alt.trim()) errors.push(`asset "${asset.id}" has no alternative text`);
    if (!/^(image\/png|image\/jpeg|image\/webp)$/.test(asset.mimeType)) errors.push(`asset "${asset.id}" uses unsupported media type "${asset.mimeType}"`);
    if (!asset.dataUrl.startsWith(`data:${asset.mimeType};base64,`)) errors.push(`asset "${asset.id}" data does not match its media type`);
    embeddedAssetCharacters += asset.dataUrl.length;
  }
  if (embeddedAssetCharacters > 80_000_000) errors.push("embedded course media exceeds the 80 MB package limit");
  for (const slide of content.slides) {
    if (!Number.isInteger(slide.n) || slide.n < 1) errors.push(`slide number "${slide.n}" is invalid`);
    if (!moduleIds.has(slide.stage)) errors.push(`slide ${slide.n} references unknown stage "${slide.stage}"`);
    if (slide.assetId && !assetIds.has(slide.assetId)) errors.push(`slide ${slide.n} references unknown asset "${slide.assetId}"`);
    if (slide.assetId && assetById.get(slide.assetId)?.kind !== "slide") errors.push(`slide ${slide.n} asset must have slide kind`);
  }
  if (content.slideCount !== content.slides.length) {
    errors.push(`slideCount ${content.slideCount} does not match ${content.slides.length} slide records`);
  }
  if (content.slides.length && !content.slideAssetBase && content.slides.some((slide) => !slide.assetId)) {
    errors.push("slides without embedded assets require slideAssetBase");
  }
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
