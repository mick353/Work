import {
  capstoneBriefs,
  capstoneSteps,
  caseStudies,
  diagnosticQuestions,
  divergences,
  exemplars,
  fieldGuide,
  findModule,
  flashcards,
  glossary,
  manifest,
  modules,
  practiceQuestions,
  slides,
  sources,
  toolkitTemplates,
} from "./content";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Brain,
  BookA,
  BookOpen,
  BookMarked,
  Check,
  ChevronDown,
  BarChart3,
  ClipboardCheck,
  Compass,
  FileText,
  FileCheck2,
  PlusCircle,
  Home,
  Library as LibraryIcon,
  Layers,
  Menu,
  Presentation,
  Moon,
  Search,
  Settings2,
  Sun,
  Target,
  Keyboard,
  Wrench,
  X,
} from "lucide-react";
import type { Question } from "./package-model";
import { DEFAULT_PACKAGE_ID, activePackage, trainingPackages } from "./packages";
import { bringForward, cardsToResurface } from "./recall";
import {
  clearStored,
  acceptCurriculumVersion,
  curriculumVersionDecision,
  scrollBehavior,
  localDayKey,
  matchView,
  migrateToPackageNamespace,
  parseView,
  resetPackageForCurriculumVersion,
  setActivePackageId,
  scheduleNext,
  viewToHash,
  type BackupParseResult,
  type CurriculumVersionDecision,
  type Rating,
  type View,
} from "./lib";
import {
  emptyModuleProgress,
  masteryState,
  normaliseModuleProgress,
  type HistoryEntry,
  useSalt,
  usePreferredTheme,
  useStorageStatus,
  useStoredState,
  type ModuleProgress,
  type ProgressMap,
  type ItemStatMap,
  type ReviewMap,
  type RubricMap,
  type TextMap,
} from "./state";
import { Dashboard, Diagnostic, LearningPath, ModuleView } from "./views-learn";
import { Practice, Review, selectDueCards } from "./views-practice";
import { Capstone, CaseStudies, FieldGuide, Glossary, Toolkit } from "./views-apply";
import { Divergences, NotFound, SearchView, Settings, Sources, StorageWarning } from "./views-meta";
import { Results } from "./views-results";
import { Guide } from "./views-guide";
import { WorkedExample } from "./views-exemplar";
import { Library } from "./views-library";
import { Deck } from "./views-deck";
import { SlideViewerProvider } from "./slide-viewer";

const MOBILE_QUERY = "(max-width: 820px)";

/**
 * Sidebar structure.
 *
 * Fourteen destinations plus nine stages had been one flat list: 23 buttons,
 * 1136px of it, in a column 834px tall on a normal laptop. Everything looked
 * equally important, which meant nothing did, and the last few items were
 * below the fold on every screen.
 *
 * Grouping alone would have made it taller, so the groups collapse. They are
 * split by what you are doing rather than by what the thing is — "Results"
 * sits with practice because you look at it after drilling, not with the
 * reference material it superficially resembles.
 *
 * Grouping was necessary and not sufficient: the groups were still ordered as
 * a taxonomy of the software, which left the course itself last. See the note
 * above NAV_GROUPS for what changed and why.
 *
 * Everything starts EXPANDED. An earlier version started Apply and Reference
 * collapsed to win back vertical space, on the reasoning that their labels
 * stayed visible so nothing was really hidden. That reasoning failed its first
 * contact with a user: the person who commissioned the guide could not find it
 * in the menu, because "Read the guide" was inside a collapsed group.
 *
 * A sidebar that scrolls is a small cost. A destination nobody can find is not
 * a small cost. The grouping already fixed the real problem — everything
 * looking equally important — and collapsing stays available for anyone who
 * wants to tidy it away, with the choice remembered.
 */
type NavGroup = {
  id: string;
  label: string;
  /** Render the stage list immediately after this group. */
  curriculumAfter?: boolean;
  items: { id: View; label: string; icon: React.ReactNode }[];
};

/*
 * The order is the learner's journey, not a taxonomy of the software.
 *
 * It used to be Learn / Practise / Apply / Reference, with the stages — the
 * actual course, where nearly all the reading is — rendered last, below four
 * groups of activities. Three things were wrong with that at once:
 *
 *   - the substance came after the assessment of it;
 *   - the group called "Learn" contained no lesson, only a dashboard and an
 *     index, because the lessons were in the list at the bottom;
 *   - the complete guide, which is the whole course in continuous reading
 *     form, sat under "Reference" beside the glossary and the source list.
 *
 * Study now comes first and carries the stages inside it. Everything that
 * tests, applies or supports the material follows it, which is also the order
 * a learner actually needs them in.
 */
const NAV_GROUPS: NavGroup[] = [
  {
    id: "study",
    label: "Study",
    /** The stage list renders directly beneath this group — it belongs to it. */
    curriculumAfter: true,
    items: [
      { id: "path", label: "Learning path", icon: <Compass size={18} aria-hidden="true" /> },
      { id: "guide", label: "Read the whole course", icon: <FileText size={18} aria-hidden="true" /> },
      { id: "example", label: "A finished report", icon: <FileCheck2 size={18} aria-hidden="true" /> },
    ],
  },
  {
    id: "practise",
    label: "Practise",
    items: [
      // Was reachable only from a button on the dashboard, which made the
      // "where should I start" entry point invisible to anyone who navigated.
      { id: "diagnostic", label: "Diagnostic", icon: <Compass size={18} aria-hidden="true" /> },
      { id: "review", label: "Review", icon: <Brain size={18} aria-hidden="true" /> },
      { id: "practice", label: "Mixed practice", icon: <ClipboardCheck size={18} aria-hidden="true" /> },
      { id: "results", label: "Results", icon: <BarChart3 size={18} aria-hidden="true" /> },
    ],
  },
  {
    id: "apply",
    label: "Apply",
    items: [
      { id: "toolkit", label: "Toolkit", icon: <Wrench size={18} aria-hidden="true" /> },
      { id: "cases", label: "Worked cases", icon: <BookOpen size={18} aria-hidden="true" /> },
      { id: "capstone", label: "Capstone", icon: <Target size={18} aria-hidden="true" /> },
    ],
  },
  {
    id: "reference",
    label: "Reference",
    items: [
      { id: "fieldguide", label: "Field guide", icon: <BookMarked size={18} aria-hidden="true" /> },
      { id: "glossary", label: "Glossary", icon: <BookA size={18} aria-hidden="true" /> },
      { id: "sources", label: "Sources", icon: <LibraryIcon size={18} aria-hidden="true" /> },
      { id: "deck", label: "Source deck", icon: <Presentation size={18} aria-hidden="true" /> },
      { id: "divergences", label: "Course additions", icon: <PlusCircle size={18} aria-hidden="true" /> },
    ],
  },
];

const DEFAULT_COLLAPSED: Record<string, boolean> = {};

/*
 * The key is versioned because the DEFAULT changed. Anyone who had already
 * loaded the app has { apply: true, reference: true } saved, and a new default
 * does nothing for them — they would still be missing the groups this change
 * exists to reveal. A new key gives everyone the new default once, and leaves
 * any deliberate collapsing they do from here on intact.
 */
const NAV_STATE_KEY = "nav-collapsed-v2";

/**
 * Keep the active stage visible inside the stage list's own scroll area.
 * Without this, opening Stage 9 of 11 leaves the sidebar showing stages 1-5.
 */
function useScrollActiveStageIntoView(view: View) {
  useEffect(() => {
    if (!view.startsWith("module:")) return;
    document
      .querySelector<HTMLElement>(".sidebar-modules nav button.active")
      ?.scrollIntoView({ block: "nearest", behavior: "auto" });
  }, [view]);
}

/** Which group owns a view, so navigating into a collapsed one opens it. */
function groupForView(view: View): string {
  if (view.startsWith("module:")) return "curriculum";
  if (view === "dashboard") return "";
  return NAV_GROUPS.find((group) => group.items.some((item) => item.id === view))?.id ?? "";
}

/**
 * Stage count, spelled out. Hardcoded as "Nine" once, which was true of exactly
 * one package. Falls through to the numeral past twelve — "The 13 stages" is
 * fine; "Nine" on an eleven-stage course is not.
 */
const NUMBER_WORDS = [
  "", "One", "Two", "Three", "Four", "Five", "Six",
  "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
];

/**
 * Whether a nav item has anything to show in this package.
 *
 * A menu entry that leads to an empty state is worse than no entry: the reader
 * spends a click discovering the absence, and the absence looks like a fault.
 * The empty states still exist for anyone arriving by URL or search.
 */
function navItemApplies(item: { id: string }): boolean {
  if (item.id === "diagnostic") return diagnosticQuestions.length > 0;
  if (item.id === "review") return flashcards.length > 0;
  if (item.id === "practice") return practiceQuestions.length > 0;
  if (item.id === "toolkit") return toolkitTemplates.length > 0;
  if (item.id === "cases") return caseStudies.length > 0;
  if (item.id === "capstone") return capstoneBriefs.length > 0 && capstoneSteps.length > 0;
  if (item.id === "fieldguide") return fieldGuide.length > 0;
  if (item.id === "glossary") return glossary.length > 0;
  if (item.id === "sources") return sources.length > 0;
  if (item.id === "deck") return slides.length > 0;
  if (item.id === "divergences") return divergences.length > 0;
  if (item.id === "example") return exemplars.length > 0;
  return true;
}

function NavSection({
  id,
  label,
  expanded,
  onToggle,
  className,
  children,
}: {
  id: string;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`nav-section ${className ?? ""}`}>
      <button
        className="nav-section-header"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`nav-${id}`}
      >
        <ChevronDown size={14} aria-hidden="true" />
        <span>{label}</span>
      </button>
      {/*
        Unmounted rather than hidden with CSS when collapsed: a `display: none`
        list still leaves its buttons in the DOM, and the mobile drawer's focus
        trap walks the DOM to find what to cycle through.
      */}
      {expanded && (
        <nav id={`nav-${id}`} aria-label={label}>
          {children}
        </nav>
      )}
    </div>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof matchMedia === "function" && matchMedia(query).matches,
  );
  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const list = matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    setMatches(list.matches);
    return () => list.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function CurriculumVersionDialog({
  decision,
  onKeep,
  onReset,
}: {
  decision: CurriculumVersionDecision;
  onKeep: () => void;
  onReset: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);
  return (
    <dialog ref={dialogRef} className="curriculum-version-dialog" aria-labelledby="curriculum-version-title">
      <span className="dialog-kicker">Course content changed</span>
      <h2 id="curriculum-version-title">Choose what happens to your saved work</h2>
      <p>
        This course is now version <strong>{decision.currentVersion}</strong>. Your browser has learning data from {decision.previousVersion ? `version ${decision.previousVersion}` : "an earlier version recorded before version tracking was added"}.
      </p>
      <p>Keeping it preserves notes, answers and scores, but those scores may describe different questions or teaching. Starting fresh clears only this course; other courses and display settings remain.</p>
      <div className="dialog-actions">
        <button type="button" className="primary" onClick={onKeep}>Keep my saved work</button>
        <button type="button" className="secondary" onClick={onReset}>Start this version fresh</button>
      </div>
    </dialog>
  );
}

export default function App() {
  /*
   * The active package is resolved BEFORE any other stored state, because
   * storageKey() namespaces every other key by it. Reading progress first
   * would read it from the wrong namespace.
   *
   * Pre-namespace data is migrated on the way past. Changing the key scheme
   * without moving what is already there would present as a total reset.
   */
  const [packageId] = useState<string>(() => {
    if (trainingPackages.some((entry) => entry.manifest.id === "pm-fundamentals")) {
      migrateToPackageNamespace("pm-fundamentals");
    }
    let stored = DEFAULT_PACKAGE_ID;
    try {
      const raw = window.localStorage.getItem("product-practice-v2:active-package");
      if (raw) stored = JSON.parse(raw);
    } catch {
      /* falls back to the first package */
    }
    const resolved = trainingPackages.some((entry) => entry.manifest.id === stored)
      ? stored
      : DEFAULT_PACKAGE_ID;
    setActivePackageId(resolved);
    return resolved;
  });
  const pack = activePackage(packageId);
  const [versionDecision, setVersionDecision] = useState<CurriculumVersionDecision | null>(
    () => curriculumVersionDecision(pack.manifest.id, pack.manifest.version),
  );

  const [view, setView] = useState<View>(() => parseView(window.location.hash));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = usePreferredTheme();
  const dewrPreview = document.documentElement.dataset.brand === "dewr";
  const storageStatus = useStorageStatus();
  const salt = useSalt();

  const [progress, setProgress, overwriteProgress] = useStoredState<ProgressMap>("progress", {});
  const [reviews, setReviews, overwriteReviews] = useStoredState<ReviewMap>("reviews", {});
  const [toolkit, setToolkit, overwriteToolkit] = useStoredState<TextMap>("toolkit", {});
  const [capstone, setCapstone, overwriteCapstone] = useStoredState<TextMap>("capstone", {});
  const [rubric, setRubric, overwriteRubric] = useStoredState<RubricMap>("rubric", {});
  const [practiceBest, setPracticeBest, overwritePracticeBest] = useStoredState<number>("practice-best", 0);
  const [studyDays, setStudyDays, overwriteStudyDays] = useStoredState<string[]>("study-days", []);
  const [history, setHistory, overwriteHistory] = useStoredState<HistoryEntry[]>("history", []);
  const [briefId, setBriefId] = useStoredState<string>("capstone-brief", capstoneBriefs[0]?.id ?? "");
  const [itemStats, setItemStats, overwriteItemStats] = useStoredState<ItemStatMap>("item-stats", {});
  const [collapsedNav, setCollapsedNav] = useStoredState<Record<string, boolean>>(
    NAV_STATE_KEY,
    DEFAULT_COLLAPSED,
  );

  const toggleNavGroup = useCallback(
    (id: string) => setCollapsedNav((current) => ({ ...current, [id]: !current[id] })),
    [setCollapsedNav],
  );

  /**
   * A study day represents deliberate learner activity, not a page visit.
   * Recording it from the actions below keeps the dashboard and streak views
   * honest while still grouping any number of actions into one local day.
   */
  const recordStudyDay = useCallback(() => {
    const today = localDayKey();
    setStudyDays((days) => (days.includes(today) ? days : [...days, today].slice(-180)));
  }, [setStudyDays]);

  /*
   * Opening the group that owns the current view. Without this, a keyboard
   * shortcut or a deep link into a collapsed group lands you on a page whose
   * sidebar entry is not visible, and the nav looks like it has lost you.
   */
  useEffect(() => {
    const owner = groupForView(view);
    if (!owner) return;
    setCollapsedNav((current) => (current[owner] ? { ...current, [owner]: false } : current));
  }, [view, setCollapsedNav]);

  /**
   * Record an attempt, and let the errors drive the review queue.
   *
   * Previously this only appended to history: getting a question wrong changed
   * a score and nothing else, so the one idea you had just failed to apply was
   * no more likely to come back than any other. The cards covering a missed
   * question are now brought forward to due-now.
   *
   * Returns how many cards were resurfaced so the view can say so — a queue
   * that grows silently is indistinguishable from one that does not work.
   */
  const recordAttempt = useCallback(
    (entry: Omit<HistoryEntry, "at">, missed: Question[] = [], answered: { id: string; correct: boolean }[] = []) => {
      recordStudyDay();
      // Capped so a heavy user cannot grow local storage without bound.
      setHistory((current) => [...current, { ...entry, at: Date.now() }].slice(-400));

      // Per-item outcomes, so the bank can be calibrated rather than assumed.
      if (answered.length) {
        setItemStats((current) => {
          const next = { ...current };
          for (const item of answered) {
            const prior = next[item.id] ?? { seen: 0, correct: 0 };
            next[item.id] = { seen: prior.seen + 1, correct: prior.correct + (item.correct ? 1 : 0) };
          }
          return next;
        });
      }

      const cards = cardsToResurface(missed);
      if (cards.length) {
        setReviews((current) => {
          const now = Date.now();
          const next = { ...current };
          for (const card of cards) next[card.id] = bringForward(current[card.id], now);
          return next;
        });
      }
      return cards.length;
    },
    [recordStudyDay, setHistory, setReviews, setItemStats],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.title = `${dewrPreview ? "DEWR theme preview · " : ""}Product Practice — ${pack.manifest.title}`;
  }, [dewrPreview, pack.manifest.title]);

  useEffect(() => {
    // Only react to hashes that name a view. An in-page fragment — the skip
    // link, a contents entry — must scroll the page, not re-route it.
    const onHash = () => {
      const next = matchView(window.location.hash);
      if (next) setView(next);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useScrollActiveStageIntoView(view);


  const openPackage = useCallback(
    (id: string) => {
      setActivePackageId(id);
      try {
        window.localStorage.setItem("product-practice-v2:active-package", JSON.stringify(id));
      } catch {
        /* the switch still works for this session */
      }
      // A full reload is the honest way to re-read every namespaced key. The
      // alternative is threading a package id through every stored-state hook,
      // which buys nothing for an action taken once in a session.
      window.location.hash = "dashboard";
      window.location.reload();
    },
    [],
  );

  const navigate = useCallback((next: View) => {
    window.location.hash = viewToHash(next);
    setView(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  }, []);

  const updateModule = useCallback(
    (id: string, changes: Partial<ModuleProgress>) => {
      recordStudyDay();
      setProgress((current) => ({
        ...current,
        [id]: { ...(current[id] ?? emptyModuleProgress()), ...changes },
      }));
    },
    [recordStudyDay, setProgress],
  );

  const recordReview = useCallback(
    (card: { id: string }, rating: Rating) => {
      recordStudyDay();
      setReviews((current) => ({ ...current, [card.id]: scheduleNext(current[card.id], rating) }));
    },
    [recordStudyDay, setReviews],
  );

  const setToolkitWithStudy = useCallback((updater: (current: TextMap) => TextMap) => {
    recordStudyDay();
    setToolkit(updater);
  }, [recordStudyDay, setToolkit]);

  const setCapstoneWithStudy = useCallback((updater: (current: TextMap) => TextMap) => {
    recordStudyDay();
    setCapstone(updater);
  }, [recordStudyDay, setCapstone]);

  const setRubricWithStudy = useCallback((updater: (current: RubricMap) => RubricMap) => {
    recordStudyDay();
    setRubric(updater);
  }, [recordStudyDay, setRubric]);

  const setBriefWithStudy = useCallback((id: string) => {
    recordStudyDay();
    setBriefId(id);
  }, [recordStudyDay, setBriefId]);

  const masteredCount = modules.filter(
    (module) => masteryState(progress[module.id], module.scenarios.length).mastered,
  ).length;
  const completion = Math.round((masteredCount / modules.length) * 100);
  const quizScores = Object.values(progress)
    .map((item) => item.quizScore)
    .filter((score) => score > 0);
  const quizAverage = quizScores.length
    ? Math.round(quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length)
    : 0;
  const nextModule =
    modules.find((module) => !masteryState(progress[module.id], module.scenarios.length).mastered) ??
    modules[modules.length - 1];

  /*
   * Fresh cards unlock after their lesson has been read. A card already in the
   * scheduler remains eligible, including one brought forward by a missed
   * question, so existing review evidence is never discarded.
   */
  const availableReviewCards = useMemo(
    () => flashcards.filter((card) => Boolean(reviews[card.id]) || Boolean(progress[card.moduleId]?.lessonRead)),
    [progress, reviews],
  );
  const dueCount = useMemo(
    () => selectDueCards(availableReviewCards, reviews, Date.now(), availableReviewCards.length).length,
    [availableReviewCards, reviews],
  );

  const handleImport = useCallback(
    (result: BackupParseResult) => {
      if (!result.ok) return;
      const { payload } = result;
      overwriteProgress(payload.progress as ProgressMap);
      overwriteReviews(payload.reviews as ReviewMap);
      overwriteToolkit((payload.toolkit ?? {}) as TextMap);
      overwriteCapstone((payload.capstone ?? {}) as TextMap);
      overwriteRubric((payload.rubric ?? {}) as RubricMap);
      overwriteStudyDays((payload.studyDays ?? []) as string[]);
      overwritePracticeBest((payload.practiceBest ?? 0) as number);
      overwriteHistory((payload.history ?? []) as HistoryEntry[]);
      overwriteItemStats((payload.itemStats ?? {}) as ItemStatMap);
    },
    [
      overwriteProgress,
      overwriteReviews,
      overwriteToolkit,
      overwriteCapstone,
      overwriteRubric,
      overwriteStudyDays,
      overwritePracticeBest,
      overwriteHistory,
      overwriteItemStats,
    ],
  );

  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  /**
   * Global shortcuts. Deliberately single-key with no modifier — this is a
   * reading and drilling app, so the hands are not on the keyboard for input
   * most of the time. Suppressed whenever focus is in a field.
   */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const map: Record<string, View> = {
        d: "dashboard",
        l: "path",
        r: "review",
        p: "practice",
        g: "results",
        t: "toolkit",
        c: "cases",
        k: "capstone",
        f: "fieldguide",
        e: "guide",
        v: "deck",
        s: "search",
      };
      if (event.key === "?") {
        event.preventDefault();
        setShortcutsOpen((open) => !open);
        return;
      }
      if (event.key === "Escape" && shortcutsOpen) {
        setShortcutsOpen(false);
        return;
      }
      const target2 = map[event.key.toLowerCase()];
      if (target2) {
        event.preventDefault();
        navigate(target2);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, shortcutsOpen]);

  const handleReset = useCallback(() => {
    clearStored();
    window.location.hash = "";
    window.location.reload();
  }, []);

  const keepVersionedWork = useCallback(() => {
    acceptCurriculumVersion(pack.manifest.id, pack.manifest.version);
    setVersionDecision(null);
  }, [pack.manifest.id, pack.manifest.version]);

  const resetForCurrentVersion = useCallback(() => {
    if (resetPackageForCurriculumVersion(pack.manifest.id, pack.manifest.version)) window.location.reload();
  }, [pack.manifest.id, pack.manifest.version]);

  let content: React.ReactNode;
  if (view === "dashboard" || (view === "library" && trainingPackages.length === 1)) {
    content = (
      <Dashboard
        completion={completion}
        mastered={masteredCount}
        quizAverage={quizAverage}
        dueCount={dueCount}
        nextModule={nextModule}
        progress={progress}
        studyDays={studyDays}
        navigate={navigate}
      />
    );
  } else if (view === "path") {
    content = <LearningPath progress={progress} navigate={navigate} />;
  } else if (view === "diagnostic") {
    content = <Diagnostic navigate={navigate} salt={salt} onComplete={recordAttempt} />;
  } else if (view === "review") {
    content = <Review cards={availableReviewCards} reviews={reviews} onRate={recordReview} navigate={navigate as (view: string) => void} />;
  } else if (view === "practice") {
    content = <Practice best={practiceBest} setBest={setPracticeBest} salt={salt} onComplete={recordAttempt} />;
  } else if (view === "toolkit") {
    content = <Toolkit values={toolkit} setValues={setToolkitWithStudy} />;
  } else if (view === "capstone") {
    content = (
      <Capstone
        values={capstone}
        setValues={setCapstoneWithStudy}
        rubric={rubric}
        setRubric={setRubricWithStudy}
        briefId={briefId}
        setBriefId={setBriefWithStudy}
      />
    );
  } else if (view === "results") {
    content = (
      <Results
        progress={progress}
        reviews={reviews}
        history={history}
        itemStats={itemStats}
        studyDays={studyDays}
        practiceBest={practiceBest}
        navigate={navigate}
      />
    );
  } else if (view === "fieldguide") {
    content = <FieldGuide />;
  } else if (view === "glossary") {
    content = <Glossary />;
  } else if (view === "example") {
    content = <WorkedExample />;
  } else if (view === "guide") {
    content = <Guide navigate={navigate} />;
  } else if (view === "library") {
    content = <Library activeId={packageId} progress={progress} onOpen={openPackage} navigate={navigate} />;
  } else if (view === "deck") {
    content = <Deck />;
  } else if (view === "cases") {
    content = <CaseStudies navigate={navigate} />;
  } else if (view === "sources") {
    content = <Sources navigate={navigate} />;
  } else if (view === "divergences") {
    content = <Divergences />;
  } else if (view === "search") {
    content = <SearchView navigate={navigate} />;
  } else if (view === "settings") {
    content = (
      <Settings
        progress={progress}
        reviews={reviews}
        toolkit={toolkit}
        capstone={capstone}
        rubric={rubric}
        studyDays={studyDays}
        practiceBest={practiceBest}
        history={history}
        itemStats={itemStats}
        salt={salt}
        onImport={handleImport}
        onReset={handleReset}
      />
    );
  } else {
    const module = findModule(view.slice("module:".length));
    content = module ? (
      <ModuleView
        key={module.id}
        module={module}
        progress={normaliseModuleProgress(progress[module.id])}
        update={(changes) => updateModule(module.id, changes)}
        navigate={navigate}
        salt={salt}
        onQuizScored={recordAttempt}
      />
    ) : (
      <NotFound navigate={navigate} />
    );
  }

  return (
    <SlideViewerProvider>
    {versionDecision && <CurriculumVersionDialog decision={versionDecision} onKeep={keepVersionedWork} onReset={resetForCurrentVersion} />}
    <Shell
      shortcutsOpen={shortcutsOpen}
      setShortcutsOpen={setShortcutsOpen}
      view={view}
      navigate={navigate}
      theme={theme}
      setTheme={setTheme}
      completion={completion}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
      progress={progress}
      storageOk={storageStatus === "ok"}
      collapsedNav={collapsedNav}
      toggleNavGroup={toggleNavGroup}
      packageTitle={pack.manifest.title}
      packagePosition={trainingPackages.findIndex((entry) => entry.manifest.id === packageId) + 1}
      packageCount={trainingPackages.length}
    >
      {content}
    </Shell>
    </SlideViewerProvider>
  );
}

function Shell({
  children,
  shortcutsOpen,
  setShortcutsOpen,
  view,
  navigate,
  theme,
  setTheme,
  completion,
  mobileOpen,
  setMobileOpen,
  progress,
  storageOk,
  collapsedNav,
  toggleNavGroup,
  packageTitle,
  packagePosition,
  packageCount,
}: {
  children: React.ReactNode;
  shortcutsOpen: boolean;
  setShortcutsOpen: (open: boolean) => void;
  view: View;
  navigate: (view: View) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  completion: number;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  progress: ProgressMap;
  storageOk: boolean;
  collapsedNav: Record<string, boolean>;
  toggleNavGroup: (id: string) => void;
  packageTitle: string;
  packagePosition: number;
  packageCount: number;
}) {
  const dewrPreview = document.documentElement.dataset.brand === "dewr";
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const sidebarRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerHidden = isMobile && !mobileOpen;

  /**
   * When the drawer is closed on mobile it is translated off-screen but still
   * in the DOM. Without `inert` a keyboard user tabs from the menu button
   * straight into sixteen invisible navigation buttons — which is what the
   * previous build did.
   */
  useEffect(() => {
    const element = sidebarRef.current;
    if (!element) return;
    if (drawerHidden) element.setAttribute("inert", "");
    else element.removeAttribute("inert");
  }, [drawerHidden]);

  // Focus management and Escape-to-close for the mobile drawer.
  useEffect(() => {
    if (!isMobile || !mobileOpen) return;
    const element = sidebarRef.current;
    if (!element) return;

    const focusables = () =>
      Array.from(element.querySelectorAll<HTMLElement>("button, a[href], input, [tabindex]:not([tabindex='-1'])"));

    // The drawer transitions from `visibility: hidden`, and a hidden element
    // cannot take focus, so wait for the style to land before moving focus.
    const focusTimer = window.setTimeout(() => focusables()[0]?.focus(), 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobile, mobileOpen, setMobileOpen]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          ref={menuButtonRef}
          className="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <button className="brand" onClick={() => navigate("dashboard")} aria-label={`${manifest.title} home`}>
          <span className="brand-mark" aria-hidden="true">
            PP
          </span>
          <span>
            <strong>{manifest.title}</strong>
            <small>
              {manifest.publisher} — internal learning aid{dewrPreview ? " · DEWR theme preview" : ""}
            </small>
          </span>
        </button>
        <div className="topbar-actions">
          <div className="top-progress">
            <span>{completion}% mastered</span>
            <div
              role="progressbar"
              aria-valuenow={completion}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall course mastery"
            >
              <i style={{ width: `${completion}%` }} />
            </div>
          </div>
          <button className="icon-button" onClick={() => navigate("search")} aria-label="Search the course">
            <Search size={19} aria-hidden="true" />
          </button>
          <button
            className="icon-button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? <Moon size={19} aria-hidden="true" /> : <Sun size={19} aria-hidden="true" />}
          </button>
          <button
            className="icon-button shortcut-button"
            onClick={() => setShortcutsOpen(true)}
            aria-label="Keyboard shortcuts"
          >
            <Keyboard size={19} aria-hidden="true" />
          </button>
          <button className="icon-button" onClick={() => navigate("settings")} aria-label="Learning settings">
            <Settings2 size={19} aria-hidden="true" />
          </button>
        </div>
      </header>

      <aside ref={sidebarRef} className={`sidebar ${mobileOpen ? "open" : ""}`} aria-label="Course navigation">
        {/*
          Everything below this belongs to one package. Naming it here is what
          stops the sidebar reading as though it were the whole product once
          there is more than one — and gives a way back to the library that is
          not the browser's back button.
        */}
        {packageCount > 1 && (
          <button className="package-switch" onClick={() => navigate("library")}>
            <Layers size={16} aria-hidden="true" />
            <span>
              <small>{`Course · ${packagePosition} of ${packageCount}`}</small>
              <strong>{packageTitle}</strong>
            </span>
            <span className="package-switch-action">Library</span>
          </button>
        )}

        {/*
          Overview is a destination, not a category. It sat inside a group
          called "Learn" that contained no lesson; on its own at the top it
          reads as what it is — where you are, and what to do next.
        */}
        <button
          className={`nav-standalone ${view === "dashboard" ? "active" : ""}`}
          aria-current={view === "dashboard" ? "page" : undefined}
          onClick={() => navigate("dashboard")}
        >
          <Home size={18} aria-hidden="true" />
          <span>Overview</span>
        </button>

        {NAV_GROUPS.map((group) => [
          <NavSection
            key={group.id}
            id={group.id}
            label={group.label}
            expanded={!collapsedNav[group.id]}
            onToggle={() => toggleNavGroup(group.id)}
          >
            {group.items.filter(navItemApplies).map((item) => (
              <button
                key={item.id}
                className={view === item.id ? "active" : ""}
                aria-current={view === item.id ? "page" : undefined}
                onClick={() => navigate(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </NavSection>,
          group.curriculumAfter ? (
          <NavSection
            key="curriculum"
            id="curriculum"
            label={`The ${NUMBER_WORDS[modules.length]?.toLowerCase() ?? modules.length} stages`}
            expanded={!collapsedNav.curriculum}
            onToggle={() => toggleNavGroup("curriculum")}
            className="sidebar-modules"
          >
            {modules.map((module) => {
              /*
                Three states, not two. The list previously showed "mastered" or
                nothing, so a stage you had read and half-answered looked
                identical to one you had never opened — the sidebar is the
                learner's map of where they are, and it was hiding the most
                useful thing on it.
              */
              const item = progress[module.id];
              const done = masteryState(item, module.scenarios.length).mastered;
              const started =
                !done &&
                Boolean(item) &&
                (item.lessonRead || item.quizScore > 0 || item.scenariosCorrect.length > 0);
              const state = done ? "done" : started ? "started" : "new";
              const label = done ? " (mastered)" : started ? " (in progress)" : "";
              return (
                <button
                  key={module.id}
                  className={view === `module:${module.id}` ? "active" : ""}
                  data-stage={module.number}
                  data-state={state}
                  title={`Stage ${module.number}: ${module.title}${label}`}
                  aria-current={view === `module:${module.id}` ? "page" : undefined}
                  onClick={() => navigate(`module:${module.id}`)}
                >
                  <span className={`module-dot ${state}`} aria-hidden="true">
                    {done ? <Check size={12} /> : module.number}
                  </span>
                  <span>
                    {module.title}
                    {label && <span className="visually-hidden">{label}</span>}
                  </span>
                </button>
              );
            })}
          </NavSection>
          ) : null,
        ]).flat()}


        <p className="privacy-note">
          Progress stays in this browser. Nothing is uploaded.
        </p>
      </aside>

      {shortcutsOpen && <ShortcutHelp onClose={() => setShortcutsOpen(false)} />}

      {mobileOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}

      <main id="main-content" className="main-content" tabIndex={-1}>
        {!storageOk && <StorageWarning />}
        {children}
        {/*
          One line, once.

          The same disclaimer was running in three places at once — the sidebar
          privacy note, this footer, and again in the body of the Sources page —
          so a reader met it three times on one screen. Repetition does not make
          a caveat more binding; it makes the whole page read as boilerplate and
          teaches people to skip the region it lives in. The full statement now
          lives on the Sources page, where somebody checking provenance will
          actually be looking for it, and this is the persistent reminder.
        */}
        <footer className="app-footer">
          <p>
            Internal learning aid
            {view !== "sources" && " · not an official Australian Government publication"}
            {/* Separator travels with the link, so print does not strand a "·". */}
            <span className="footer-link">
              {" · "}
              <button className="text-button" onClick={() => navigate("sources")}>
                provenance and sources
              </button>
            </span>
          </p>
        </footer>
      </main>
    </div>
  );
}


const SHORTCUTS: { key: string; label: string }[] = [
  { key: "D", label: "Overview" },
  { key: "L", label: "Learning path" },
  { key: "R", label: "Review" },
  { key: "P", label: "Mixed practice" },
  { key: "G", label: "Results" },
  { key: "T", label: "Toolkit" },
  { key: "C", label: "Worked cases" },
  { key: "K", label: "Capstone" },
  { key: "F", label: "DES field guide" },
  { key: "E", label: "Complete guide" },
  { key: "V", label: "Source deck" },
  { key: "S", label: "Search" },
  { key: "?", label: "Show or hide this panel" },
];

function ShortcutHelp({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, []);
  return (
    <div className="shortcut-backdrop" onClick={onClose}>
      <div
        className="shortcut-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
        onClick={(event) => event.stopPropagation()}
      >
        <header>
          <h2>Keyboard shortcuts</h2>
          <button ref={closeRef} className="icon-button" onClick={onClose} aria-label="Close keyboard shortcuts">
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <dl>
          {SHORTCUTS.map((item) => (
            <div key={item.key}>
              <dt><kbd>{item.key}</kbd></dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
        <p>
          During review: <kbd>space</kbd> reveals, then <kbd>1</kbd>–<kbd>4</kbd> rate. Shortcuts are ignored while you
          are typing in a field.
        </p>
      </div>
    </div>
  );
}
