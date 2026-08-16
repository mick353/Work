import { useCallback, useEffect, useRef, useState } from "react";
import {
  createSalt,
  getStorageStatus,
  onStorageStatusChange,
  probeStorage,
  readStored,
  writeStored,
  type ReviewSchedule,
  type StorageStatus,
} from "./lib";

export type ModuleProgress = {
  lessonRead: boolean;
  /** Best score achieved, 0–100. */
  quizScore: number;
  /** Which of the module's scenarios have been answered correctly. */
  scenariosCorrect: string[];
  /** Attempts per scenario, so "mastered" can report how it was earned. */
  scenarioAttempts: Record<string, number>;
  reflection: string;
  assignment: string[];
  /** Which self-check criteria the learner has ticked on the assignment. */
  assignmentChecks?: Record<string, boolean>;
  /** Number of quiz attempts, so "best score" cannot be silently farmed. */
  attempts: number;
};

/**
 * An append-only log of scored attempts. The previous release stored only a
 * best score per stage, which cannot answer "am I improving?" — the question a
 * learner actually has. Every entry is timestamped so the results view can plot
 * trends rather than a single number.
 */
export type HistoryEntry = {
  at: number;
  kind: "quiz" | "practice" | "diagnostic";
  moduleId?: string;
  score: number;
  correct: number;
  total: number;
};

/**
 * Per-item outcomes.
 *
 * History records a score per attempt and nothing about which questions were
 * involved, so there was no way to tell an item everyone gets right (teaching
 * nothing) from one everyone gets wrong (ambiguous rather than hard). A bank
 * can be designed well and still be uncalibrated; this is the evidence that
 * distinguishes the two.
 */
export type ItemStat = { seen: number; correct: number };
export type ItemStatMap = Record<string, ItemStat>;

export type ProgressMap = Record<string, ModuleProgress>;
export type ReviewMap = Record<string, ReviewSchedule>;
export type TextMap = Record<string, string>;
/** Capstone self-assessment: step id -> rubric ids the learner has confirmed. */
export type RubricMap = Record<string, string[]>;

export function emptyModuleProgress(): ModuleProgress {
  return {
    lessonRead: false,
    quizScore: 0,
    scenariosCorrect: [],
    scenarioAttempts: {},
    reflection: "",
    assignment: [],
    assignmentChecks: {},
    attempts: 0,
  };
}

/** Tolerates partial objects from older backups. */
export function normaliseModuleProgress(value: Partial<ModuleProgress> | undefined): ModuleProgress {
  return {
    ...emptyModuleProgress(),
    ...(value ?? {}),
    scenarioAttempts: value?.scenarioAttempts ?? {},
    assignmentChecks: value?.assignmentChecks ?? {},
  };
}

/**
 * Mastery is deliberately explicit rather than a percentage threshold.
 *
 * The previous rule was `quizScore >= 70` over a two-question quiz, where the
 * only achievable scores were 0, 50 and 100 — so "70%" actually meant "both
 * correct" while implying a gradation that did not exist. Each stage now has
 * four knowledge questions and two scenarios, and mastery states the rule
 * plainly: read it, score at least 75% on the quiz, and get both scenarios
 * right.
 */
export const MASTERY_QUIZ_THRESHOLD = 75;

export function masteryState(progress: ModuleProgress | undefined, scenarioCount: number) {
  const item = progress ?? emptyModuleProgress();
  const learn = item.lessonRead;
  const recall = item.quizScore >= MASTERY_QUIZ_THRESHOLD;
  const apply = item.scenariosCorrect.length >= scenarioCount;
  return { learn, recall, apply, mastered: learn && recall && apply };
}

/**
 * State backed by localStorage, with writes that fail softly.
 *
 * `skipInitialWrite` avoids the previous behaviour of rewriting every key with
 * its own loaded value on first render.
 */
export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStored(key, initial));
  const hydrated = useRef(false);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    writeStored(key, value);
  }, [key, value]);

  /** Replace the value and persist immediately (used by backup import). */
  const overwrite = useCallback(
    (next: T) => {
      hydrated.current = true;
      setValue(next);
      writeStored(key, next);
    },
    [key],
  );

  return [value, setValue, overwrite] as const;
}

export function useStorageStatus(): StorageStatus {
  const [status, setStatus] = useState<StorageStatus>(() => {
    probeStorage();
    return getStorageStatus();
  });
  useEffect(() => {
    const unsubscribe = onStorageStatusChange(setStatus);
    return () => {
      unsubscribe();
    };
  }, []);
  return status;
}

/** Per-install salt so option shuffling is stable for a learner but differs between learners. */
export function useSalt(): string {
  const [salt, setSalt] = useStoredState<string>("salt", "");
  useEffect(() => {
    if (!salt) setSalt(createSalt());
  }, [salt, setSalt]);
  return salt || "default-salt";
}

/** Prefers-color-scheme aware default, overridden once the learner chooses. */
export function usePreferredTheme() {
  const [stored, setStored] = useStoredState<"light" | "dark" | null>("theme", null);
  const [systemDark, setSystemDark] = useState(
    () => typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const query = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const theme: "light" | "dark" = stored ?? (systemDark ? "dark" : "light");
  return [theme, setStored] as const;
}
