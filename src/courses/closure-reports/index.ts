import { PACKAGE_SCHEMA_VERSION, type TrainingPackage } from "../../package-model";
import { buildPracticeQuestions, withDerivedMinutes } from "../../package-utils";
import { courseQualityProfiles } from "../../course-quality-profiles";
import { CLOSURE_REVIEWED, closureModules as authoredModules, closureSources } from "./course";
import { closureExemplars } from "./exemplar";
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
} from "./reference";

export const CLOSURE_REPORTS_ID = "closure-reports";

const modules = withDerivedMinutes(authoredModules);

/** Self-contained Closure Reports package. */
export const closureReports: TrainingPackage = {
  manifest: {
    schemaVersion: PACKAGE_SCHEMA_VERSION,
    version: "1.0.1",
    id: CLOSURE_REPORTS_ID,
    title: "Closure Reports",
    subtitle: "Evidence, benefits and handover at the end of delivery",
    publisher: "DEWR Digital Experience and Solutions",
    source: "the DEWR Project Closure Report Template, Tier 3 form, Project Closure Factsheet and closure announcement",
    reviewed: CLOSURE_REVIEWED,
    status: "available",
    summary:
      "Writing a closure report that survives an audit — marked claims, transferred benefits, lessons that change behaviour, a settled financial and records position, and a handover that works once the team has gone.",
    arc: "From evidence to signed handover",
  },
  qualityProfile: courseQualityProfiles[CLOSURE_REPORTS_ID],
  content: {
    modules,
    sources: closureSources,
    totalMinutes: modules.reduce((sum, module) => sum + module.minutes, 0),
    // Preserve the existing Closure mixed-practice pool. Supplementary items
    // deepen stage quizzes but were not part of mixed practice in this package.
    practiceQuestions: buildPracticeQuestions(modules, []),
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
    exemplars: closureExemplars,
    slides: [],
    slideCount: 0,
    contentReviewed: CLOSURE_REVIEWED,
  },
};

export default closureReports;
