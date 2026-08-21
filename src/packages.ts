/**
 * Validated package registry.
 *
 * Courses live in self-contained folders under `src/courses`. The ordinary
 * build imports the combined catalogue; an individual export replaces that
 * catalogue at build time and therefore bundles only the selected course.
 */

import { catalogPackages } from "./package-catalog";
import type { TrainingPackage } from "./package-model";
import { assertValidPackageCatalog } from "./package-validation";

export type {
  PackageContent,
  PackageManifest,
  PackageStatus,
  TrainingPackage,
} from "./package-model";

export const trainingPackages: TrainingPackage[] = assertValidPackageCatalog(catalogPackages);

if (!trainingPackages.length) throw new Error("The training package catalogue is empty.");

export const DEFAULT_PACKAGE_ID = trainingPackages[0].manifest.id;

export function findPackage(id: string): TrainingPackage | undefined {
  return trainingPackages.find((entry) => entry.manifest.id === id);
}

export function activePackage(id: string): TrainingPackage {
  return findPackage(id) ?? trainingPackages[0];
}

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
