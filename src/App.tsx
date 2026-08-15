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
  PlusCircle,
  Home,
  Library,
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
import { findModule, modules } from "./course";
import { flashcards } from "./reference";
import {
  clearStored,
  localDayKey,
  matchView,
  parseView,
  scheduleNext,
  viewToHash,
  type BackupParseResult,
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
 * Apply and Reference start collapsed: they are the occasional-use halves, and
 * the labels stay visible so nothing is actually hidden. Learn and Practise —
 * the daily loop — start open. Navigating into a collapsed group opens it.
 */
type NavGroup = {
  id: string;
  label: string;
  items: { id: View; label: string; icon: React.ReactNode }[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    id: "learn",
    label: "Learn",
    items: [
      { id: "dashboard", label: "Overview", icon: <Home size={18} aria-hidden="true" /> },
      { id: "path", label: "Learning path", icon: <Compass size={18} aria-hidden="true" /> },
    ],
  },
  {
    id: "practise",
    label: "Practise",
    items: [
      { id: "review", label: "Review", icon: <Brain size={18} aria-hidden="true" /> },
      { id: "practice", label: "Mixed practice", icon: <ClipboardCheck size={18} aria-hidden="true" /> },
      { id: "results", label: "Results", icon: <BarChart3 size={18} aria-hidden="true" /> },
    ],
  },
  {
    id: "apply",
    label: "Apply",
    items: [
      { id: "toolkit", label: "Product toolkit", icon: <Wrench size={18} aria-hidden="true" /> },
      { id: "cases", label: "Worked cases", icon: <BookOpen size={18} aria-hidden="true" /> },
      { id: "capstone", label: "Capstone", icon: <Target size={18} aria-hidden="true" /> },
    ],
  },
  {
    id: "reference",
    label: "Reference",
    items: [
      { id: "guide", label: "Read the guide", icon: <FileText size={18} aria-hidden="true" /> },
      { id: "deck", label: "Source deck", icon: <Presentation size={18} aria-hidden="true" /> },
      { id: "fieldguide", label: "DES field guide", icon: <BookMarked size={18} aria-hidden="true" /> },
      { id: "glossary", label: "Glossary", icon: <BookA size={18} aria-hidden="true" /> },
      { id: "sources", label: "Sources", icon: <Library size={18} aria-hidden="true" /> },
      { id: "divergences", label: "Course additions", icon: <PlusCircle size={18} aria-hidden="true" /> },
    ],
  },
];

const DEFAULT_COLLAPSED: Record<string, boolean> = { apply: true, reference: true };

/** Which group owns a view, so navigating into a collapsed one opens it. */
function groupForView(view: View): string {
  if (view.startsWith("module:")) return "curriculum";
  return NAV_GROUPS.find((group) => group.items.some((item) => item.id === view))?.id ?? "";
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

export default function App() {
  const [view, setView] = useState<View>(() => parseView(window.location.hash));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = usePreferredTheme();
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
  const [briefId, setBriefId] = useStoredState<string>("capstone-brief", "provider");
  const [collapsedNav, setCollapsedNav] = useStoredState<Record<string, boolean>>(
    "nav-collapsed",
    DEFAULT_COLLAPSED,
  );

  const toggleNavGroup = useCallback(
    (id: string) => setCollapsedNav((current) => ({ ...current, [id]: !current[id] })),
    [setCollapsedNav],
  );

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

  const recordAttempt = useCallback(
    (entry: Omit<HistoryEntry, "at">) => {
      // Capped so a heavy user cannot grow local storage without bound.
      setHistory((current) => [...current, { ...entry, at: Date.now() }].slice(-400));
    },
    [setHistory],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

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

  /**
   * Record the study day in LOCAL time, and re-check periodically so a tab left
   * open across midnight still records the new day. The previous build used a
   * UTC date key, so at AEST every session before ~10am was filed against the
   * previous day.
   */
  useEffect(() => {
    const record = () => {
      const today = localDayKey();
      setStudyDays((days) => (days.includes(today) ? days : [...days, today].slice(-180)));
    };
    record();
    const timer = window.setInterval(record, 10 * 60_000);
    return () => window.clearInterval(timer);
  }, [setStudyDays]);

  const navigate = useCallback((next: View) => {
    window.location.hash = viewToHash(next);
    setView(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const updateModule = useCallback(
    (id: string, changes: Partial<ModuleProgress>) => {
      setProgress((current) => ({
        ...current,
        [id]: { ...(current[id] ?? emptyModuleProgress()), ...changes },
      }));
    },
    [setProgress],
  );

  const recordReview = useCallback(
    (card: { id: string }, rating: Rating) => {
      setReviews((current) => ({ ...current, [card.id]: scheduleNext(current[card.id], rating) }));
    },
    [setReviews],
  );

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

  const dueCount = useMemo(
    () => selectDueCards(flashcards, reviews, Date.now(), flashcards.length).length,
    [reviews],
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

  let content: React.ReactNode;
  if (view === "dashboard") {
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
    content = <Review reviews={reviews} onRate={recordReview} navigate={navigate as (view: string) => void} />;
  } else if (view === "practice") {
    content = <Practice best={practiceBest} setBest={setPracticeBest} salt={salt} onComplete={recordAttempt} />;
  } else if (view === "toolkit") {
    content = <Toolkit values={toolkit} setValues={setToolkit} />;
  } else if (view === "capstone") {
    content = (
      <Capstone
        values={capstone}
        setValues={setCapstone}
        rubric={rubric}
        setRubric={setRubric}
        briefId={briefId}
        setBriefId={setBriefId}
      />
    );
  } else if (view === "results") {
    content = (
      <Results
        progress={progress}
        reviews={reviews}
        history={history}
        studyDays={studyDays}
        practiceBest={practiceBest}
        navigate={navigate}
      />
    );
  } else if (view === "fieldguide") {
    content = <FieldGuide />;
  } else if (view === "glossary") {
    content = <Glossary />;
  } else if (view === "guide") {
    content = <Guide navigate={navigate} />;
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
}) {
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
        <button className="brand" onClick={() => navigate("dashboard")} aria-label="Product Practice home">
          <span className="brand-mark" aria-hidden="true">
            PP
          </span>
          <span>
            <strong>Product Practice</strong>
            <small>DEWR Digital Experience and Solutions — internal learning aid</small>
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
        {NAV_GROUPS.map((group) => (
          <NavSection
            key={group.id}
            id={group.id}
            label={group.label}
            expanded={!collapsedNav[group.id]}
            onToggle={() => toggleNavGroup(group.id)}
          >
            {group.items.map((item) => (
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
          </NavSection>
        ))}

        <NavSection
          id="curriculum"
          label="Nine-stage curriculum"
          expanded={!collapsedNav.curriculum}
          onToggle={() => toggleNavGroup("curriculum")}
          className="sidebar-modules"
        >
          {modules.map((module) => {
            const done = masteryState(progress[module.id], module.scenarios.length).mastered;
            return (
              <button
                key={module.id}
                className={view === `module:${module.id}` ? "active" : ""}
                data-stage={module.number}
                aria-current={view === `module:${module.id}` ? "page" : undefined}
                onClick={() => navigate(`module:${module.id}`)}
              >
                <span className={`module-dot ${done ? "done" : ""}`} aria-hidden="true">
                  {done ? <Check size={12} /> : module.number}
                </span>
                <span>
                  {module.title}
                  {done && <span className="visually-hidden"> (mastered)</span>}
                </span>
              </button>
            );
          })}
        </NavSection>

        <p className="privacy-note">
          Progress stays in this browser. Nothing is uploaded. Not an official Australian Government publication.
        </p>
      </aside>

      {shortcutsOpen && <ShortcutHelp onClose={() => setShortcutsOpen(false)} />}

      {mobileOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}

      <main id="main-content" className="main-content" tabIndex={-1}>
        {!storageOk && <StorageWarning />}
        {children}
        <footer className="app-footer">
          <p>
            An internal learning aid built from <em>Product Management Fundamentals — 12AUG2026</em> (DEWR Digital
            Experience and Solutions Division). Not an official Australian Government publication and not a substitute
            for departmental guidance or the Digital Service Standard.
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
  { key: "T", label: "Product toolkit" },
  { key: "C", label: "Worked cases" },
  { key: "K", label: "Capstone" },
  { key: "F", label: "DES field guide" },
  { key: "E", label: "Read the guide" },
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
