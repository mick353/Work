/**
 * The active package's content, resolved once.
 *
 * Views used to import `modules`, `flashcards` and the rest straight from
 * course.ts and reference.ts. That hard-wired the player to one course: the
 * claim that adding a package was "a data operation" was not true while every
 * view named its content directly.
 *
 * Everything the player renders now comes through here, and here reads the
 * active package. Registering a second package is genuinely all that is needed.
 *
 * Why a module-level resolve rather than a React context: switching packages
 * does a full reload — deliberately, because storage keys are namespaced and a
 * reload is the honest way to re-read all of them. Given that, a context would
 * add a hook call to every view to solve a problem the reload already solves.
 */

import { activePackage, DEFAULT_PACKAGE_ID } from "./packages";
import { readStored, STORAGE_PREFIX } from "./lib";

/**
 * Resolved at module load, before React renders.
 *
 * `getActivePackageId()` is only correct after App has set it, and App has not
 * run yet at this point — so read the same stored value App will read. It is
 * one key and it has to be right this early, because everything below depends
 * on it.
 */
function resolveActiveId(): string {
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}:active-package`);
    if (raw) return JSON.parse(raw) as string;
  } catch {
    /* fall through to the default */
  }
  return DEFAULT_PACKAGE_ID;
}

const pack = activePackage(resolveActiveId());

export const manifest = pack.manifest;

export const {
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
  fieldGuide, exemplars,
  slides,
  slideCount,
  slideAssetBase = "",
  assets = [],
  contentReviewed,
} = pack.content;

/** Kept for the many call sites that read it as a bare constant. */
export const CONTENT_REVIEWED = contentReviewed;
export const SLIDE_COUNT = slideCount;

/* ------------------------------------------------------------------ *
 * Lookups — scoped to the active package rather than to a global list
 * ------------------------------------------------------------------ */

export function findModule(id: string) {
  return modules.find((module) => module.id === id);
}

export function findSource(id: string) {
  return sources.find((source) => source.id === id);
}

/** A stage's question pool: its own items plus this package's supplements. */
export function quizPoolFor(moduleId: string) {
  const module = findModule(moduleId);
  if (!module) return [];
  return [...module.questions, ...supplementaryQuestions.filter((q) => q.moduleId === moduleId)];
}

// readStored is imported so the storage layer is initialised before any view
// reads it; referencing it keeps the import meaningful rather than incidental.
void readStored;
