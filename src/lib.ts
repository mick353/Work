/**
 * Shared primitives: storage, dates, deterministic shuffling, spaced repetition.
 *
 * Everything here is deliberately framework-free so it can be unit-reasoned about
 * and so the React layer stays about rendering.
 */

/* ------------------------------------------------------------------ *
 * Routing
 * ------------------------------------------------------------------ */

export const MODULE_HASH_PREFIX = "module/";
export const MODULE_VIEW_PREFIX = "module:";

export const TOP_LEVEL_VIEWS = [
  "dashboard",
  "path",
  "diagnostic",
  "review",
  "practice",
  "toolkit",
  "capstone",
  "fieldguide",
  "sources",
  "divergences",
  "search",
  "settings",
] as const;

export type TopLevelView = (typeof TOP_LEVEL_VIEWS)[number];
export type View = TopLevelView | `module:${string}`;

export function isModuleView(view: View): view is `module:${string}` {
  return view.startsWith(MODULE_VIEW_PREFIX);
}

export function moduleIdFromView(view: View): string {
  return view.slice(MODULE_VIEW_PREFIX.length);
}

export function viewToHash(view: View): string {
  return isModuleView(view) ? `${MODULE_HASH_PREFIX}${moduleIdFromView(view)}` : view;
}

export function parseView(rawHash: string): View {
  const hash = rawHash.replace(/^#\/?/, "");
  if (!hash) return "dashboard";
  if (hash.startsWith(MODULE_HASH_PREFIX)) {
    return `${MODULE_VIEW_PREFIX}${hash.slice(MODULE_HASH_PREFIX.length)}` as View;
  }
  return (TOP_LEVEL_VIEWS as readonly string[]).includes(hash) ? (hash as View) : "dashboard";
}

/* ------------------------------------------------------------------ *
 * Dates — local time, not UTC.
 *
 * The previous implementation used toISOString().slice(0,10), which is UTC.
 * At AEST/AEDT (UTC+10/+11) every session before ~10am local was filed against
 * the previous day, so the study-rhythm grid highlighted the wrong squares.
 * ------------------------------------------------------------------ */

export function localDayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function daysAgoKey(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return localDayKey(date);
}

const DAY_MONTH = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short" });
const DAY_MONTH_TIME = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
});

/**
 * Humanises a due timestamp. The old version always rendered a day/month, so a
 * card rated "Again" (due in 10 minutes) was reported as due tomorrow.
 */
export function formatDue(timestamp: number, now: number = Date.now()): string {
  const delta = timestamp - now;
  if (delta <= 0) return "now";
  if (delta < 60 * 60_000) {
    const minutes = Math.max(1, Math.round(delta / 60_000));
    return `in ${minutes} minute${minutes === 1 ? "" : "s"}`;
  }
  if (delta < 12 * 60 * 60_000) {
    const hours = Math.round(delta / (60 * 60_000));
    return `in ${hours} hour${hours === 1 ? "" : "s"}`;
  }
  if (localDayKey(new Date(timestamp)) === localDayKey(new Date(now))) {
    return `later today, ${DAY_MONTH_TIME.format(timestamp).split(", ").pop()}`;
  }
  return `on ${DAY_MONTH.format(timestamp)}`;
}

export function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (!hours) return `${minutes} min`;
  if (!minutes) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

/* ------------------------------------------------------------------ *
 * Storage — guarded on read AND write.
 *
 * The previous implementation wrapped only the read. In Safari private mode,
 * with storage disabled, in a sandboxed iframe, or on quota exhaustion, the
 * bare setItem threw uncaught on every single state change. This artefact is
 * distributed as a file people open in whatever browser is to hand, so the
 * write has to be able to fail softly and say so.
 * ------------------------------------------------------------------ */

export const STORAGE_PREFIX = "product-practice-v2";
export const LEGACY_STORAGE_PREFIX = "product-practice-v1";

export type StorageStatus = "ok" | "unavailable";

let storageStatus: StorageStatus = "ok";
const storageListeners = new Set<(status: StorageStatus) => void>();

function setStorageStatus(next: StorageStatus) {
  if (storageStatus === next) return;
  storageStatus = next;
  storageListeners.forEach((listener) => listener(next));
}

export function getStorageStatus(): StorageStatus {
  return storageStatus;
}

export function onStorageStatusChange(listener: (status: StorageStatus) => void) {
  storageListeners.add(listener);
  return () => storageListeners.delete(listener);
}

export function storageKey(key: string) {
  return `${STORAGE_PREFIX}:${key}`;
}

export function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(storageKey(key));
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStored(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(storageKey(key), JSON.stringify(value));
    setStorageStatus("ok");
    return true;
  } catch {
    setStorageStatus("unavailable");
    return false;
  }
}

export function clearStored(): boolean {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(STORAGE_PREFIX) || key.startsWith(LEGACY_STORAGE_PREFIX))
      .forEach((key) => window.localStorage.removeItem(key));
    return true;
  } catch {
    return false;
  }
}

/** Probe once at boot so the banner can appear before the user loses work. */
export function probeStorage(): StorageStatus {
  try {
    const probe = `${STORAGE_PREFIX}:__probe`;
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    setStorageStatus("ok");
  } catch {
    setStorageStatus("unavailable");
  }
  return storageStatus;
}

/* ------------------------------------------------------------------ *
 * Deterministic shuffling
 *
 * Answer options are permuted so position stops carrying information — in the
 * previous build 85% of correct answers sat at position B or C and options were
 * never shuffled, so "always answer B" scored 48%.
 *
 * The permutation is seeded from the question id plus a per-install salt, so it
 * is stable for a given learner across reloads (re-reading a lesson shows the
 * same layout) but differs between learners.
 * ------------------------------------------------------------------ */

export function hashString(input: string): number {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Mulberry32 — small, fast, adequate for shuffling four options. */
export function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(items: T[], seed: number): T[] {
  const random = seededRandom(seed);
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function shuffle<T>(items: T[]): T[] {
  return seededShuffle(items, (Math.random() * 0xffffffff) >>> 0);
}

export type PresentedOption = {
  /** Index into the question's canonical options array. */
  sourceIndex: number;
  label: string;
  isAnswer: boolean;
  note?: string;
};

/**
 * Produce the display order for a question's options.
 * `salt` is the per-install value so two learners see different orders.
 */
export function presentOptions(
  question: { id: string; options: string[]; answer: number; optionNotes?: string[] },
  salt: string,
): PresentedOption[] {
  const canonical = question.options.map((label, sourceIndex) => ({
    sourceIndex,
    label,
    isAnswer: sourceIndex === question.answer,
    note: question.optionNotes?.[sourceIndex],
  }));
  return seededShuffle(canonical, hashString(`${salt}::${question.id}`));
}

export function createSalt(): string {
  const bytes = new Uint32Array(2);
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    crypto.getRandomValues(bytes);
  } else {
    bytes[0] = (Math.random() * 0xffffffff) >>> 0;
    bytes[1] = Date.now() >>> 0;
  }
  return `${bytes[0].toString(36)}${bytes[1].toString(36)}`;
}

/* ------------------------------------------------------------------ *
 * Spaced repetition
 * ------------------------------------------------------------------ */

export const DAY_MS = 86_400_000;

export type Rating = "again" | "hard" | "good" | "easy";

export type ReviewSchedule = {
  due: number;
  interval: number;
  ease: number;
  repetitions: number;
  lapses: number;
  lastRated: number;
};

export const NEW_SCHEDULE: Omit<ReviewSchedule, "due" | "lastRated"> = {
  interval: 0,
  ease: 2.4,
  repetitions: 0,
  lapses: 0,
};

export function scheduleNext(
  previous: ReviewSchedule | undefined,
  rating: Rating,
  now: number = Date.now(),
): ReviewSchedule {
  const base: ReviewSchedule = previous ?? { ...NEW_SCHEDULE, due: now, lastRated: now };
  let { interval, ease, repetitions, lapses } = base;

  if (rating === "again") {
    interval = 0;
    repetitions = 0;
    lapses += 1;
    ease = Math.max(1.3, ease - 0.2);
    return { due: now + 10 * 60_000, interval, ease, repetitions, lapses, lastRated: now };
  }

  if (rating === "hard") {
    interval = Math.max(1, Math.round(Math.max(1, interval) * 1.2));
    repetitions += 1;
    ease = Math.max(1.3, ease - 0.15);
  } else if (rating === "good") {
    interval = repetitions === 0 ? 1 : repetitions === 1 ? 3 : Math.max(4, Math.round(interval * ease));
    repetitions += 1;
  } else {
    interval = repetitions === 0 ? 4 : Math.max(7, Math.round(Math.max(1, interval) * ease * 1.3));
    repetitions += 1;
    ease = Math.min(3, ease + 0.12);
  }

  // Cap so a long-dormant card cannot vanish for years.
  interval = Math.min(interval, 240);
  return { due: now + interval * DAY_MS, interval, ease, repetitions, lapses, lastRated: now };
}

export function describeInterval(schedule: ReviewSchedule | undefined): string {
  if (!schedule) return "New card";
  if (schedule.interval === 0) return "Relearning";
  if (schedule.interval === 1) return "Interval 1 day";
  return `Interval ${schedule.interval} days`;
}

/* ------------------------------------------------------------------ *
 * Backup payload
 * ------------------------------------------------------------------ */

export const BACKUP_VERSION = 2;

export type BackupPayload = {
  version: number;
  exportedAt: string;
  progress: unknown;
  reviews: unknown;
  toolkit: unknown;
  capstone: unknown;
  rubric?: unknown;
  studyDays?: unknown;
  practiceBest?: unknown;
  salt?: unknown;
};

export type BackupParseResult =
  | { ok: true; payload: BackupPayload; migrated: boolean }
  | { ok: false; error: string };

/**
 * Validates an uploaded backup. Version 1 files (from the previous release)
 * are accepted and up-migrated rather than rejected.
 */
export function parseBackup(raw: string): BackupParseResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: "That file is not valid JSON." };
  }
  if (typeof data !== "object" || data === null) {
    return { ok: false, error: "That file does not contain a backup object." };
  }
  const candidate = data as Partial<BackupPayload>;
  if (typeof candidate.version !== "number") {
    return { ok: false, error: "That file is missing a backup version number." };
  }
  if (candidate.version > BACKUP_VERSION) {
    return {
      ok: false,
      error: `That backup was made by a newer version (v${candidate.version}). Update the app first.`,
    };
  }
  const isRecord = (value: unknown) => typeof value === "object" && value !== null && !Array.isArray(value);
  if (!isRecord(candidate.progress) || !isRecord(candidate.reviews)) {
    return { ok: false, error: "That backup is missing its progress or review data." };
  }

  return {
    ok: true,
    migrated: candidate.version < BACKUP_VERSION,
    payload: {
      version: BACKUP_VERSION,
      exportedAt: typeof candidate.exportedAt === "string" ? candidate.exportedAt : new Date().toISOString(),
      progress: candidate.progress,
      reviews: candidate.reviews,
      toolkit: isRecord(candidate.toolkit) ? candidate.toolkit : {},
      capstone: isRecord(candidate.capstone) ? candidate.capstone : {},
      rubric: isRecord(candidate.rubric) ? candidate.rubric : {},
      studyDays: Array.isArray(candidate.studyDays) ? candidate.studyDays : [],
      practiceBest: typeof candidate.practiceBest === "number" ? candidate.practiceBest : 0,
      salt: typeof candidate.salt === "string" ? candidate.salt : undefined,
    },
  };
}

export function downloadFile(filename: string, contents: string, mime: string) {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  // Revoke on the next tick so Firefox has time to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
