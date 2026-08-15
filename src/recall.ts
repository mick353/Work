/**
 * Closing the loop between assessment and review.
 *
 * The app had two halves that never spoke to each other: 122 questions on one
 * side, 92 flashcards and a working SM-2 scheduler on the other. Getting a
 * question wrong produced a score and nothing else — the thing you had just
 * demonstrated you did not know was no more likely to come back than anything
 * else. That is the opposite of what spaced repetition is for.
 *
 * Now a wrong answer schedules the cards that cover it. This is the mechanism
 * behind every serious retrieval tool: the queue is driven by your errors, not
 * by a fixed order.
 *
 * Matching is deliberately simple and deterministic — significant-word overlap
 * between the question and the card, restricted to the same stage. A smarter
 * scheme would need embeddings, which cannot ship inside a single HTML file,
 * and would be harder to explain to a learner who asks why a card appeared.
 */

import { flashcards, type Flashcard } from "./reference";
import type { Module, Question } from "./course";
import { NEW_SCHEDULE, type ReviewSchedule } from "./lib";

/** Words too common to carry topic signal. */
const STOP = new Set([
  "the", "and", "for", "that", "this", "with", "from", "what", "which", "when",
  "does", "are", "was", "were", "has", "have", "had", "not", "but", "its", "it",
  "you", "your", "their", "they", "them", "than", "then", "there", "into", "onto",
  "would", "could", "should", "will", "can", "may", "might", "most", "more", "less",
  "best", "better", "worst", "good", "bad", "how", "why", "who", "whom", "whose",
  "one", "two", "three", "all", "any", "some", "each", "every", "other", "another",
  "about", "after", "before", "during", "while", "because", "since", "until",
  "team", "teams", "work", "working", "make", "makes", "made", "take", "takes",
  "thing", "things", "something", "anything", "nothing", "also", "just", "only",
  "statement", "following", "example", "correct", "describes", "means", "kind",
]);

function significantWords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !STOP.has(word)),
  );
}

/**
 * The cards worth re-scheduling when this question is answered wrongly.
 *
 * Scored on the question's prompt plus its CORRECT answer — not the option the
 * learner picked. The point is to review the idea they should have applied, not
 * to reinforce the mistake.
 */
export function cardsForMissedQuestion(question: Question, limit = 2): Flashcard[] {
  const target = significantWords(`${question.prompt} ${question.options[question.answer] ?? ""}`);
  if (!target.size) return [];

  const sameStage = flashcards.filter((card) => card.moduleId === question.moduleId);
  if (!sameStage.length) return [];

  const scored = sameStage
    .map((card) => {
      const words = significantWords(`${card.front} ${card.back}`);
      let overlap = 0;
      target.forEach((word) => {
        if (words.has(word)) overlap += 1;
      });
      return { card, overlap };
    })
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || a.card.id.localeCompare(b.card.id));

  // No lexical overlap at all: fall back to the stage's definition cards, which
  // are the ones most likely to underpin any question in it. Better than
  // returning nothing and silently dropping the signal.
  if (!scored.length) {
    return sameStage.filter((card) => card.kind === "definition").slice(0, limit);
  }
  return scored.slice(0, limit).map((entry) => entry.card);
}

/**
 * Bring a card forward so it is due now.
 *
 * Deliberately NOT a full "Again" rating. Rating a card the learner has never
 * seen would corrupt its ease and lapse count with data from a different
 * exercise. This only moves the due date, and only ever earlier — a card
 * already due stays where it is.
 */
export function bringForward(existing: ReviewSchedule | undefined, now: number = Date.now()): ReviewSchedule {
  if (!existing) return { ...NEW_SCHEDULE, due: now, lastRated: 0 };
  if (existing.due <= now) return existing;
  return { ...existing, due: now };
}

/** Every card to bring forward for a set of missed questions, de-duplicated. */
export function cardsToResurface(missed: Question[], limit = 2): Flashcard[] {
  const byId = new Map<string, Flashcard>();
  for (const question of missed) {
    for (const card of cardsForMissedQuestion(question, limit)) {
      byId.set(card.id, card);
    }
  }
  return [...byId.values()];
}

/* ------------------------------------------------------------------ *
 * Targeted re-teaching
 * ------------------------------------------------------------------ */

/**
 * The lesson sections a learner should revisit after missing questions.
 *
 * Failing a knowledge check used to produce a score and nothing else: you were
 * told you scored 40% and left to reread the whole stage, which is the least
 * efficient possible response and the one most likely to end the session.
 * Mastery learning routes a failure back to the specific material, so this
 * names the sections rather than the stage.
 *
 * Same overlap scoring as the flashcard matcher, against the section text.
 */
export function sectionsToRevisit(module: Module, missed: Question[], limit = 3): string[] {
  if (!missed.length) return [];
  const scores = new Map<string, number>();

  for (const question of missed) {
    const target = significantWords(`${question.prompt} ${question.options[question.answer] ?? ""}`);
    for (const section of module.sections) {
      const words = significantWords(
        `${section.heading} ${section.body} ${(section.bullets ?? []).join(" ")} ${section.example ?? ""}`,
      );
      let overlap = 0;
      target.forEach((word) => {
        if (words.has(word)) overlap += 1;
      });
      if (overlap > 0) scores.set(section.heading, (scores.get(section.heading) ?? 0) + overlap);
    }
  }

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([heading]) => heading);
}
