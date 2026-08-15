import { useMemo, useRef, useState } from "react";
import { AlertTriangle, Brain, ChevronRight, Download, ExternalLink, RotateCcw, Search, Upload } from "lucide-react";
import { CONTENT_REVIEWED, modules, sources } from "./course";
import { divergences, fieldGuide, flashcards, toolkitTemplates } from "./reference";
import { BACKUP_VERSION, downloadFile, parseBackup, type View } from "./lib";
import type { HistoryEntry, ProgressMap, ReviewMap, RubricMap, TextMap } from "./state";
import { EmptyState, PageIntro } from "./components";

type Navigate = (view: View) => void;

/* ------------------------------------------------------------------ *
 * Search
 * ------------------------------------------------------------------ */

type SearchRecord = {
  id: string;
  title: string;
  body: string;
  kind: string;
  view: View;
};

function buildIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];

  modules.forEach((module) => {
    records.push({
      id: `m-${module.id}`,
      title: `Stage ${module.number}: ${module.title}`,
      body: `${module.subtitle} ${module.outcome} ${module.coreIdea}`,
      kind: "Stage",
      view: `module:${module.id}`,
    });
    module.sections.forEach((section, index) => {
      const tableText = section.table
        ? `${section.table.caption ?? ""} ${section.table.head.join(" ")} ${section.table.rows.flat().join(" ")}`
        : "";
      records.push({
        id: `s-${module.id}-${index}`,
        title: section.heading,
        body: `${section.body} ${(section.bullets ?? []).join(" ")} ${section.example ?? ""} ${tableText}`,
        kind: `Stage ${module.number} lesson`,
        view: `module:${module.id}`,
      });
    });
  });

  flashcards.forEach((card) => {
    records.push({
      id: `f-${card.id}`,
      title: card.front,
      body: card.back,
      kind: "Flashcard",
      view: "review",
    });
  });

  toolkitTemplates.forEach((template) => {
    records.push({
      id: `t-${template.id}`,
      title: template.title,
      body: `${template.prompt} ${template.example} ${template.note ?? ""}`,
      kind: "Template",
      view: "toolkit",
    });
  });

  fieldGuide.forEach((entry) => {
    records.push({
      id: `g-${entry.id}`,
      title: entry.title,
      body: `${entry.summary} ${entry.items.map((item) => `${item.term} ${item.detail}`).join(" ")}`,
      kind: "Field guide",
      view: "fieldguide",
    });
  });

  divergences.forEach((item) => {
    records.push({
      id: `d-${item.id}`,
      title: `Divergence: ${item.topic}`,
      body: `${item.deck} ${item.here} ${item.why}`,
      kind: "Divergence",
      view: "divergences",
    });
  });

  sources.forEach((source) => {
    records.push({
      id: `src-${source.id}`,
      title: source.title,
      body: `${source.publisher} ${source.note}`,
      kind: "Source",
      view: "sources",
    });
  });

  return records;
}

function excerpt(body: string, term: string) {
  const position = body.toLowerCase().indexOf(term.toLowerCase());
  if (position < 0) return body.slice(0, 160) + (body.length > 160 ? "…" : "");
  const start = Math.max(0, position - 70);
  const end = Math.min(body.length, position + term.length + 90);
  return `${start > 0 ? "…" : ""}${body.slice(start, end).trim()}${end < body.length ? "…" : ""}`;
}

export function SearchView({ navigate }: { navigate: Navigate }) {
  const index = useMemo(buildIndex, []);
  const [term, setTerm] = useState("");

  const results = useMemo(() => {
    const query = term.trim().toLowerCase();
    if (query.length < 2) return [];
    return index
      .map((record) => {
        const title = record.title.toLowerCase();
        const body = record.body.toLowerCase();
        let score = 0;
        if (title.includes(query)) score += 10;
        if (body.includes(query)) score += 3;
        query.split(/\s+/).forEach((word) => {
          if (word.length < 3) return;
          if (title.includes(word)) score += 2;
          if (body.includes(word)) score += 1;
        });
        return { record, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40);
  }, [index, term]);

  return (
    <div className="page narrow-page">
      <PageIntro
        eyebrow="Search"
        title="Find anything in the course"
        body="Searches lesson content, flashcards, templates, the field guide, the divergence register and the sources."
      />
      <div className="search-field">
        <Search size={20} aria-hidden="true" />
        <label className="visually-hidden" htmlFor="course-search">
          Search the course
        </label>
        <input
          id="course-search"
          type="search"
          value={term}
          autoFocus
          placeholder="Try WSJF, guardrail, iteration path, Closure…"
          onChange={(event) => setTerm(event.target.value)}
        />
      </div>

      <div aria-live="polite" className="search-count">
        {term.trim().length >= 2 && `${results.length} result${results.length === 1 ? "" : "s"}`}
      </div>

      {term.trim().length >= 2 && results.length === 0 && (
        <EmptyState title="No matches" body="Try a shorter term, or a concept name rather than a phrase." />
      )}

      <div className="search-results">
        {results.map(({ record }) => (
          <button key={record.id} className="search-result" onClick={() => navigate(record.view)}>
            <span className="search-kind">{record.kind}</span>
            <strong>{record.title}</strong>
            <span className="search-excerpt">{excerpt(record.body, term.trim())}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Sources
 * ------------------------------------------------------------------ */

export function Sources({ navigate }: { navigate: Navigate }) {
  return (
    <div className="page">
      <PageIntro
        eyebrow="Research and provenance"
        title="What the system is built on"
        body="The DEWR deck supplies the course spine. Primary and authoritative sources clarify framework boundaries, update government guidance and explain the learning method."
      />

      <section className="method-note">
        <div>
          <Brain size={30} aria-hidden="true" />
        </div>
        <div>
          <h2>Why the system makes you retrieve and revisit</h2>
          <p>
            Practice testing improves later retention, while distributed practice spreads learning across time. The
            same research rates rereading and highlighting as low-utility — which is why lessons here include forced
            recall, mixed scenarios and a review queue instead of relying on slide rereading.
          </p>
        </div>
      </section>

      <section className="boundary-note">
        <strong>Framework boundary</strong>
        <p>
          This course distinguishes source-deck teaching, Scrum definitions, SAFe prioritisation guidance and
          Australian Government standards. They can work together, but they are not interchangeable and none of them is
          a single mandated method. In particular: epics, features and Program Increments are not Scrum terms, and the
          DES delivery phases are not the DTA service phases.
        </p>
        <button className="text-button" onClick={() => navigate("divergences")}>
          See where this course departs from the deck <ChevronRight size={16} aria-hidden="true" />
        </button>
      </section>

      <p className="currency-note">All sources checked and content reviewed {CONTENT_REVIEWED}.</p>

      <div className="source-list">
        {sources.map((source, index) => (
          <article key={source.id}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{source.title}</h2>
              <strong>{source.publisher}</strong>
              <p>{source.note}</p>
              {source.url && (
                <a href={source.url} target="_blank" rel="noreferrer">
                  Open primary source <ExternalLink size={15} aria-hidden="true" />
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Divergence register
 * ------------------------------------------------------------------ */

export function Divergences() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="Divergence register"
        title="Where this course departs from the deck"
        body="This system improves on the source presentation in a handful of places. Every departure is listed here so you can quote either one deliberately, and so nobody is contradicted by the slides in a meeting."
      />
      <div className="divergence-list">
        {divergences.map((item) => (
          <article key={item.id} className="divergence">
            <header>
              <h2>{item.topic}</h2>
              <span>{item.slides === "not covered" ? "Not in the deck" : `Deck slides ${item.slides}`}</span>
            </header>
            <dl>
              <div>
                <dt>The deck says</dt>
                <dd>{item.deck}</dd>
              </div>
              <div>
                <dt>This course says</dt>
                <dd>{item.here}</dd>
              </div>
              <div>
                <dt>Why</dt>
                <dd>{item.why}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Settings
 * ------------------------------------------------------------------ */

export function Settings({
  progress,
  reviews,
  toolkit,
  capstone,
  rubric,
  studyDays,
  practiceBest,
  history,
  salt,
  onImport,
  onReset,
}: {
  progress: ProgressMap;
  reviews: ReviewMap;
  toolkit: TextMap;
  capstone: TextMap;
  rubric: RubricMap;
  studyDays: string[];
  practiceBest: number;
  history: HistoryEntry[];
  salt: string;
  onImport: (payload: ReturnType<typeof parseBackup>) => void;
  onReset: () => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const buildBackup = () =>
    JSON.stringify(
      {
        version: BACKUP_VERSION,
        exportedAt: new Date().toISOString(),
        progress,
        reviews,
        toolkit,
        capstone,
        rubric,
        studyDays,
        practiceBest,
        history,
        salt,
      },
      null,
      2,
    );

  const exportData = () => {
    downloadFile(
      `product-practice-backup-${new Date().toISOString().slice(0, 10)}.json`,
      buildBackup(),
      "application/json",
    );
    setMessage({ tone: "ok", text: "Backup downloaded." });
  };

  const handleFile = async (file: File) => {
    const text = await file.text();
    const result = parseBackup(text);
    if (!result.ok) {
      setMessage({ tone: "error", text: result.error });
      return;
    }
    onImport(result);
    setMessage({
      tone: "ok",
      text: result.migrated
        ? "Backup restored and upgraded from an earlier version."
        : "Backup restored.",
    });
  };

  const resetWithBackup = () => {
    const confirmed = window.confirm(
      "This clears all Product Practice progress from this browser, including capstone answers.\n\nA backup will download first. Continue?",
    );
    if (!confirmed) return;
    downloadFile(
      `product-practice-backup-before-reset-${new Date().toISOString().slice(0, 10)}.json`,
      buildBackup(),
      "application/json",
    );
    // Give the download a moment to start before the page reloads.
    setTimeout(onReset, 600);
  };

  return (
    <div className="page narrow-page">
      <PageIntro
        eyebrow="Local learning data"
        title="Back up, restore or reset your progress"
        body="All answers and review schedules live in this browser's local storage. They are never sent anywhere — which also means they do not follow you to another machine unless you move the backup file yourself."
      />

      {message && (
        <p className={`settings-message ${message.tone}`} role="status" aria-live="polite">
          {message.text}
        </p>
      )}

      <section className="settings-block">
        <Download size={24} aria-hidden="true" />
        <div>
          <h2>Download a backup</h2>
          <p>Save progress, review intervals, attempt history, toolkit drafts, capstone answers and self-assessment as JSON.</p>
          <button className="secondary" onClick={exportData}>
            Download backup
          </button>
        </div>
      </section>

      <section className="settings-block">
        <Upload size={24} aria-hidden="true" />
        <div>
          <h2>Restore from a backup</h2>
          <p>
            Load a previously downloaded file. This replaces everything currently stored in this browser. Backups from
            version 1 of this course are accepted and upgraded.
          </p>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="visually-hidden"
            aria-label="Choose a Product Practice backup file to restore"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleFile(file);
              event.target.value = "";
            }}
          />
          <button className="secondary" onClick={() => fileInput.current?.click()}>
            Choose backup file
          </button>
        </div>
      </section>

      <section className="settings-block danger">
        <RotateCcw size={24} aria-hidden="true" />
        <div>
          <h2>Reset the learning system</h2>
          <p>
            This permanently clears course progress from this browser. A backup file downloads automatically before
            anything is deleted.
          </p>
          <button className="danger-button" onClick={resetWithBackup}>
            Back up and reset all local data
          </button>
        </div>
      </section>
    </div>
  );
}

export function StorageWarning() {
  return (
    <div className="storage-warning" role="alert">
      <AlertTriangle size={18} aria-hidden="true" />
      <span>
        This browser is not allowing local storage, so progress cannot be saved. Private browsing and some managed
        browser policies cause this. You can still use the course — export your capstone before closing the tab.
      </span>
    </div>
  );
}

export function NotFound({ navigate }: { navigate: Navigate }) {
  return (
    <div className="page narrow-page">
      <PageIntro
        eyebrow="Not found"
        title="That learning stage is unavailable"
        body="Return to the learning path and choose one of the nine course stages."
      />
      <button className="primary" onClick={() => navigate("path")}>
        Learning path
      </button>
    </div>
  );
}
