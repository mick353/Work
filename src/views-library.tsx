/**
 * The library.
 *
 * The home screen used to open straight into Product Management Fundamentals,
 * because that was the only thing there was. Once there is more than one
 * package that framing is wrong twice over: it hides that anything else
 * exists, and it makes one course look like the whole product.
 *
 * This is the landing view now. It answers "what is available, and where am I
 * up to in each" before it answers "what next in the one I am in" — which is
 * the question the package overview already answers well.
 */

import { ArrowRight, BookOpen, CheckCircle2, Clock3 } from "lucide-react";
import { estimateHours, type View } from "./lib";
import { masteryState, type ProgressMap } from "./state";
import { packageStats, trainingPackages, type TrainingPackage } from "./packages";
import { PageIntro } from "./components";

export function Library({
  activeId,
  progress,
  onOpen,
  navigate,
}: {
  activeId: string;
  progress: ProgressMap;
  onOpen: (id: string) => void;
  navigate: (view: View) => void;
}) {
  return (
    <div className="page library-page">
      <PageIntro
        eyebrow="Training library"
        title="Available training"
        body="Each package is self-contained: its own stages, question bank, review queue and results. Progress is kept separately for each, so finishing one does not look like partly finishing another."
      />

      <ul className="library-grid">
        {trainingPackages.map((entry) => (
          <li key={entry.manifest.id}>
            <PackageCard
              entry={entry}
              active={entry.manifest.id === activeId}
              progress={entry.manifest.id === activeId ? progress : {}}
              onOpen={() => onOpen(entry.manifest.id)}
            />
          </li>
        ))}
      </ul>

      {/*
        The combined build demonstrates the catalogue. Individual exports omit
        this view entirely because there is no package choice to make.
      */}
      <section className="library-note">
        <h2>Adding another package</h2>
        <p>
          A package is a manifest plus its content — stages, questions, cards, glossary, worked cases, source slides
          and references. Nothing in the player is specific to product management, so a new package is authored
          rather than built: it appears here, keeps its own progress, and shares nothing with another course except the
          person using it.
        </p>
        <button className="text-button" onClick={() => navigate("sources")}>
          How this package is sourced <ArrowRight size={16} aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}

function PackageCard({
  entry,
  active,
  progress,
  onOpen,
}: {
  entry: TrainingPackage;
  active: boolean;
  progress: ProgressMap;
  onOpen: () => void;
}) {
  const stats = packageStats(entry);
  const mastered = entry.content.modules.filter(
    (module) => masteryState(progress[module.id], module.scenarios.length).mastered,
  ).length;
  const started = Object.keys(progress).length > 0;
  const percent = Math.round((mastered / entry.content.modules.length) * 100);

  return (
    <article className={`package-card ${active ? "active" : ""}`}>
      <header>
        <span className="eyebrow">{entry.manifest.publisher}</span>
        <h2>{entry.manifest.title}</h2>
        <p className="package-sub">{entry.manifest.subtitle}</p>
        {/*
          "Built from" rather than "by": the source author wrote the artefact,
          not the package. Omitted where a package has no single source author.
        */}
        {entry.manifest.sourceAuthor && (
          <p className="package-author">Built from a source deck by {entry.manifest.sourceAuthor}</p>
        )}
      </header>

      <p className="package-summary">{entry.manifest.summary}</p>

      <dl className="package-stats">
        <div>
          <dt>Stages</dt>
          <dd>{stats.stages}</dd>
        </div>
        <div>
          <dt>Questions</dt>
          <dd>{stats.questions}</dd>
        </div>
        <div>
          <dt>Cards</dt>
          <dd>{stats.cards}</dd>
        </div>
        {/*
          A package need not have been built from a deck, and "Source slides: 0"
          reads as a missing feature rather than a different provenance. Show
          worked cases instead, which every package has.
        */}
        <div>
          <dt>{stats.slides > 0 ? "Source slides" : "Worked cases"}</dt>
          <dd>{stats.slides > 0 ? stats.slides : entry.content.caseStudies.length}</dd>
        </div>
      </dl>

      <div className="package-progress">
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${entry.manifest.title}: ${percent} per cent of stages demonstrated`}
        >
          <i style={{ width: `${percent}%` }} />
        </div>
        <span>
          {started ? (
            <>
              <CheckCircle2 size={14} aria-hidden="true" /> {mastered} of {stats.stages} stages demonstrated
            </>
          ) : (
            <>
              <Clock3 size={14} aria-hidden="true" /> Not started · {estimateHours(stats.minutes)}
            </>
          )}
        </span>
      </div>

      <footer>
        <button className="primary" onClick={onOpen}>
          <BookOpen size={17} aria-hidden="true" />
          {active ? (started ? "Continue" : "Start") : "Open"}
        </button>
        <span className="package-meta">Reviewed {entry.manifest.reviewed}</span>
      </footer>
    </article>
  );
}
