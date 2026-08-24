/**
 * Versioned, course-specific release floors used by the repository QA suite.
 *
 * These are not claims that word count proves learning quality. They prevent a
 * maintained course from silently losing the depth, practice and worked
 * application that its reviewed release currently depends on. Human subject
 * review and learner observation remain separate evidence.
 */
import type { CourseQualityProfile } from "./package-model";

export const COURSE_QUALITY_PROFILE_VERSION = 1 as const;

export function workshopQualityProfile(stageCount: number): CourseQualityProfile {
  return {
    profileVersion: COURSE_QUALITY_PROFILE_VERSION,
    stageCount,
    minimumLessonWords: stageCount * 300,
    minimumStageBodyWords: 300,
    minimumKnowledgeQuestionsPerStage: 4,
    scenariosPerStage: 2,
    minimumAssignmentWords: 100,
    minimumAssignmentCriteria: 2,
    minimumWorkedReasoningPassages: 0,
    minimumWorkedReasoningWords: 0,
    minimumCaseStageCoverage: 0,
    minimumCaseStepWords: 40,
  };
}

export const courseQualityProfiles: Record<string, CourseQualityProfile> = {
  "pm-fundamentals": {
    profileVersion: COURSE_QUALITY_PROFILE_VERSION,
    stageCount: 9,
    minimumLessonWords: 8_000,
    minimumStageBodyWords: 300,
    minimumKnowledgeQuestionsPerStage: 4,
    scenariosPerStage: 2,
    minimumAssignmentWords: 100,
    minimumAssignmentCriteria: 4,
    minimumWorkedReasoningPassages: 9,
    minimumWorkedReasoningWords: 150,
    minimumCaseStageCoverage: 9,
    minimumCaseStepWords: 40,
  },
  "closure-reports": {
    profileVersion: COURSE_QUALITY_PROFILE_VERSION,
    stageCount: 12,
    minimumLessonWords: 12_500,
    minimumStageBodyWords: 300,
    minimumKnowledgeQuestionsPerStage: 4,
    scenariosPerStage: 2,
    minimumAssignmentWords: 100,
    minimumAssignmentCriteria: 3,
    minimumWorkedReasoningPassages: 5,
    minimumWorkedReasoningWords: 150,
    minimumCaseStageCoverage: 8,
    minimumCaseStepWords: 40,
  },
};
