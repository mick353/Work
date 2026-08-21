import type { Module, PracticeQuestion, Question } from "./package-model";

const WORDS_PER_MINUTE = 220;
const MINUTES_PER_QUESTION = 1;
const MINUTES_PER_SCENARIO = 2;

function countWords(text: string | undefined): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Derive a rounded learning-time estimate from the content itself. */
export function stageMinutes(module: Module): number {
  let words = countWords(module.outcome) + countWords(module.coreIdea);
  for (const section of module.sections) {
    words += countWords(section.heading) + countWords(section.body) + countWords(section.example);
    for (const bullet of section.bullets ?? []) words += countWords(bullet);
    if (section.table) {
      for (const head of section.table.head) words += countWords(head);
      for (const row of section.table.rows) for (const cell of row) words += countWords(cell);
    }
  }
  const raw =
    words / WORDS_PER_MINUTE +
    module.questions.length * MINUTES_PER_QUESTION +
    module.scenarios.length * MINUTES_PER_SCENARIO;
  return Math.max(5, Math.round(raw / 5) * 5);
}

/** Preserve author data while replacing hand-maintained time estimates. */
export function withDerivedMinutes(modules: Module[]): Module[] {
  return modules.map((module) => ({ ...module, minutes: stageMinutes(module) }));
}

/** Build the mixed-practice pool consistently for every package. */
export function buildPracticeQuestions(
  modules: Module[],
  supplementaryQuestions: Question[],
): PracticeQuestion[] {
  return modules
    .flatMap((module) => [
      ...module.questions,
      ...module.scenarios.map((scenario) => ({
        id: scenario.id,
        moduleId: scenario.moduleId,
        prompt: scenario.prompt,
        options: scenario.options,
        answer: scenario.answer,
        rationale: scenario.rationale,
        optionNotes: scenario.optionNotes,
        context: scenario.context,
      })),
    ])
    .concat(supplementaryQuestions);
}
