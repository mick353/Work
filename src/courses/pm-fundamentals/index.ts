import { PACKAGE_SCHEMA_VERSION, type TrainingPackage } from "../../package-model";
import { buildPracticeQuestions, withDerivedMinutes } from "../../package-utils";
import { courseQualityProfiles } from "../../course-quality-profiles";
import { CONTENT_REVIEWED, modules as authoredModules, sources } from "./course";
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
} from "./reference";
import { SLIDE_COUNT, slides } from "./slides";

export const PM_FUNDAMENTALS_ID = "pm-fundamentals";

const modules = withDerivedMinutes(authoredModules);

/** Self-contained Product Management package. */
export const pmFundamentals: TrainingPackage = {
  manifest: {
    schemaVersion: PACKAGE_SCHEMA_VERSION,
    version: "1.0.1",
    id: PM_FUNDAMENTALS_ID,
    title: "Product Management Fundamentals",
    subtitle: "Product management for Australian Government service delivery",
    publisher: "DEWR Digital Experience and Solutions",
    sourceAuthor: "Simon Morris",
    source: "Product Management Fundamentals — 12AUG2026",
    reviewed: CONTENT_REVIEWED,
    status: "available",
    summary:
      "Nine stages from user need to measured value, built from the departmental deck and turned into something you practise rather than sit through.",
    arc: "From user need to measured value",
  },
  qualityProfile: courseQualityProfiles[PM_FUNDAMENTALS_ID],
  content: {
    modules,
    sources,
    totalMinutes: modules.reduce((sum, module) => sum + module.minutes, 0),
    practiceQuestions: buildPracticeQuestions(modules, supplementaryQuestions),
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
    exemplars: [],
    slides,
    slideCount: SLIDE_COUNT,
    slideAssetBase: `courses/${PM_FUNDAMENTALS_ID}/slides`,
    contentReviewed: CONTENT_REVIEWED,
  },
};

export default pmFundamentals;
