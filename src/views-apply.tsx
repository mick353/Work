import { capstoneBriefs, capstoneRubric, capstoneSteps, caseStudies, fieldGuide, glossary, modules, toolkitTemplates } from "./content";
import { AlertTriangle, Check, ChevronRight, Download, Printer, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CAPSTONE_MIN_WORDS, type GlossaryEntry } from "./reference";
import { downloadFile, scrollToSection, type View } from "./lib";
import type { RubricMap, TextMap } from "./state";
import { EmptyState, LessonBody, PageIntro, ProgressBar, SourceChips } from "./components";
import { SlideRangeLink } from "./slide-viewer";

function wordCount(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function Toolkit({
  values,
  setValues,
}: {
  values: TextMap;
  setValues: (updater: (current: TextMap) => TextMap) => void;
}) {
  return (
    <div className="page">
      <PageIntro
        eyebrow="Reusable product toolkit"
        title="Turn concepts into working artefacts"
        body="These are prompts for thinking, not compliance templates. Complete only the detail needed to improve the next decision. Where a template differs from the source deck, the note says so and why."
      />
      <div className="toolkit-list">
        {toolkitTemplates.map((template, index) => (
          <section key={template.id} className="toolkit-item">
            <div className="toolkit-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h2>{template.title}</h2>
              <p className="template-prompt">{template.prompt}</p>
              {template.note && <p className="template-note">{template.note}</p>}
              <details>
                <summary>Show worked example</summary>
                <p>{template.example}</p>
              </details>
              <label>
                <span className="visually-hidden">Your {template.title.toLowerCase()}</span>
                <textarea
                  rows={6}
                  value={values[template.id] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [template.id]: event.target.value }))}
                  placeholder={`Draft your ${template.title.toLowerCase()}…`}
                />
              </label>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export function Capstone({
  values,
  setValues,
  rubric,
  setRubric,
  briefId,
  setBriefId,
}: {
  values: TextMap;
  setValues: (updater: (current: TextMap) => TextMap) => void;
  rubric: RubricMap;
  setRubric: (updater: (current: RubricMap) => RubricMap) => void;
  briefId: string;
  setBriefId: (id: string) => void;
}) {
  const brief = capstoneBriefs.find((b) => b.id === briefId) ?? capstoneBriefs[0];
  const hasCapstone = capstoneBriefs.length > 0 && capstoneSteps.length > 0;
  const key = (stepId: string) => `${briefId}:${stepId}`;
  const drafted = capstoneSteps.filter((step) => wordCount(values[key(step.id)] ?? "") >= CAPSTONE_MIN_WORDS).length;
  const totalChecks = capstoneSteps.length * capstoneRubric.length;
  const confirmedChecks = capstoneSteps.reduce((sum, step) => sum + (rubric[key(step.id)]?.length ?? 0), 0);

  const toggleRubric = (stepId: string, rubricId: string) => {
    setRubric((current) => {
      const existing = current[key(stepId)] ?? [];
      return {
        ...current,
        [key(stepId)]: existing.includes(rubricId)
          ? existing.filter((id) => id !== rubricId)
          : [...existing, rubricId],
      };
    });
  };

  const exportBrief = () => {
    const lines = [
      "PRODUCT MANAGEMENT CAPSTONE",
      brief.title,
      `Exported: ${new Date().toLocaleString("en-AU")}`,
      `Sections drafted: ${drafted} of ${capstoneSteps.length}`,
      `Self-assessment checks confirmed: ${confirmedChecks} of ${totalChecks}`,
      "",
      "".padEnd(70, "="),
      "",
    ];
    capstoneSteps.forEach((step, index) => {
      const confirmed = rubric[key(step.id)] ?? [];
      lines.push(
        `${index + 1}. ${step.title.toUpperCase()}`,
        "",
        values[key(step.id)]?.trim() || "[Not completed]",
        "",
        `Self-assessment: ${
          confirmed.length
            ? capstoneRubric
                .filter((item) => confirmed.includes(item.id))
                .map((item) => item.title)
                .join(", ")
            : "none confirmed"
        }`,
        "",
        "".padEnd(70, "-"),
        "",
      );
    });
    lines.push("SELF-REVIEW RUBRIC", "");
    capstoneRubric.forEach((item) => lines.push(`${item.title}: ${item.detail}`));
    downloadFile(`product-management-capstone-${briefId}.txt`, lines.join("\r\n"), "text/plain;charset=utf-8");
  };

  if (!hasCapstone) {
    return (
      <div className="page">
        <PageIntro eyebrow="Capstone" title="No capstone in this package" body="This package does not include a capstone brief. Everything else — stages, checks, review and results — works as normal." />
      </div>
    );
  }

  return (
    <div className="page">
      <section className="capstone-hero">
        <div>
          <span className="eyebrow">Integrated assessment</span>
          <h1>{brief.title}</h1>
          <p>
            Demonstrate the full chain from user evidence to sustained service value. Your answers are kept per brief,
            so switching does not overwrite work.
          </p>
        </div>
        <div className="capstone-progress">
          <strong>
            {drafted}/{capstoneSteps.length}
          </strong>
          <span>sections drafted ({CAPSTONE_MIN_WORDS}+ words)</span>
          <ProgressBar value={(drafted / capstoneSteps.length) * 100} label="Capstone sections drafted" />
          <small>
            {confirmedChecks} of {totalChecks} self-assessment checks confirmed
          </small>
        </div>
      </section>

      <div className="brief-switch" role="tablist" aria-label="Choose a capstone brief">
        {capstoneBriefs.map((b) => (
          <button
            key={b.id}
            role="tab"
            aria-selected={briefId === b.id}
            className={briefId === b.id ? "active" : ""}
            onClick={() => setBriefId(b.id)}
          >
            <strong>{b.title}</strong>
            <span>{b.short}</span>
          </button>
        ))}
      </div>

      <section className="case-brief">
        <strong>Brief</strong>
        <div>
          <p>{brief.brief}</p>
          <p className="brief-twist">{brief.twist}</p>
        </div>
      </section>

      <div className="capstone-steps">
        {capstoneSteps.map((step, index) => {
          const words = wordCount(values[key(step.id)] ?? "");
          const done = words >= CAPSTONE_MIN_WORDS;
          const confirmed = rubric[key(step.id)] ?? [];
          return (
            <section key={step.id} className={done ? "done" : ""}>
              <div className="capstone-step-index" aria-hidden="true">
                {done ? <Check size={19} /> : index + 1}
              </div>
              <div>
                <h2>
                  <span className="visually-hidden">Section {index + 1}: </span>
                  {step.title}
                </h2>
                <p>{step.prompt}</p>
                <details className="capstone-checks">
                  <summary>What a substantive response contains</summary>
                  <ul>
                    {step.checks.map((check) => (
                      <li key={check}>{check}</li>
                    ))}
                  </ul>
                </details>
                <label>
                  <span className="visually-hidden">Your response for {step.title}</span>
                  <textarea
                    rows={8}
                    value={values[key(step.id)] ?? ""}
                    onChange={(event) => setValues((current) => ({ ...current, [key(step.id)]: event.target.value }))}
                    placeholder="Write a decision-ready response with evidence, assumptions and rationale…"
                  />
                </label>
                <p className="word-count">
                  {words} word{words === 1 ? "" : "s"}
                  {done ? " — drafted" : ` — ${CAPSTONE_MIN_WORDS - words} more for a substantive draft`}
                </p>

                <fieldset className="rubric-check">
                  <legend>Self-assessment for this section</legend>
                  {capstoneRubric.map((item) => (
                    <label key={item.id}>
                      <input
                        type="checkbox"
                        checked={confirmed.includes(item.id)}
                        onChange={() => toggleRubric(step.id, item.id)}
                      />
                      <span>
                        <strong>{item.title}</strong> {item.detail}
                      </span>
                    </label>
                  ))}
                </fieldset>
              </div>
            </section>
          );
        })}
      </div>

      <section className="rubric">
        <span className="eyebrow">Self-review rubric</span>
        <h2>A defensible brief should be…</h2>
        <div>
          {capstoneRubric.map((item) => (
            <p key={item.id}>
              <strong>{item.title}</strong> {item.detail}
            </p>
          ))}
        </div>
        <div className="button-row">
          <button className="primary" onClick={exportBrief}>
            <Download size={18} aria-hidden="true" /> Export brief as text
          </button>
          <button className="secondary" onClick={() => window.print()}>
            <Printer size={18} aria-hidden="true" /> Print
          </button>
        </div>
        <p className="rubric-note">
          Text export is the reliable option — printed text areas are clipped to their visible height by most browsers.
        </p>
      </section>
    </div>
  );
}

export function FieldGuide() {
  if (!fieldGuide.length) {
    return (
      <div className="page">
        <PageIntro eyebrow="Field guide" title="No field guide in this package" body="This package does not include a reference field guide. The stages and the complete guide carry the same material in context." />
      </div>
    );
  }

  return (
    <div className="page">
      <PageIntro
        eyebrow="DES field guide"
        title="The reference half of the course"
        body="Phase names, principles, cadence, backlog fields and roles, in one place for lookup at work. Nothing here is assessed — it exists so you do not have to reopen the deck mid-meeting."
      />
      {/* Buttons, not fragment links — the location hash is the router. */}
      <nav className="field-guide-nav" aria-label="Field guide sections">
        {fieldGuide.map((entry) => (
          <button key={entry.id} onClick={() => scrollToSection(entry.id)}>
            {entry.title}
          </button>
        ))}
      </nav>
      <div className="field-guide">
        {fieldGuide.map((entry) => (
          <section key={entry.id} id={entry.id}>
            <header>
              <h2>{entry.title}</h2>
              {entry.slides && <SlideRangeLink range={entry.slides} className="field-guide-slides" />}
            </header>
            <p>{entry.summary}</p>
            <dl>
              {entry.items.map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.detail}</dd>
                </div>
              ))}
            </dl>
            <SourceChips ids={entry.sourceIds} />
          </section>
        ))}
      </div>
    </div>
  );
}


const ORIGINS: GlossaryEntry["origin"][] = ["Deck", "Scrum", "SAFe", "Government", "General"];

export function Glossary() {
  const [term, setTerm] = useState("");
  const [origin, setOrigin] = useState<"All" | GlossaryEntry["origin"]>("All");

  const filtered = useMemo(() => {
    const q = term.trim().toLowerCase();
    return glossary.filter(
      (entry) =>
        (origin === "All" || entry.origin === origin) &&
        (!q || entry.term.toLowerCase().includes(q) || entry.definition.toLowerCase().includes(q)),
    );
  }, [term, origin]);

  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryEntry[]>();
    filtered.forEach((entry) => {
      const letter = entry.term[0].toUpperCase();
      map.set(letter, [...(map.get(letter) ?? []), entry]);
    });
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  if (!glossary.length) {
    return (
      <div className="page">
        <PageIntro eyebrow="Glossary" title="No glossary in this package" body="This package does not define glossary terms. Search still covers the lessons, cards and source material." />
      </div>
    );
  }

  return (
    <div className="page">
      <PageIntro
        eyebrow="Glossary"
        title="Every term, and which framework it belongs to"
        body="Product vocabulary gets muddled because four bodies of practice overlap. Each entry says where the term actually comes from, so you can tell a Scrum definition from a SAFe one from a departmental convention."
      />

      <div className="glossary-controls">
        <div className="search-field">
          <Search size={20} aria-hidden="true" />
          <label className="visually-hidden" htmlFor="glossary-search">Search the glossary</label>
          <input
            id="glossary-search"
            type="search"
            value={term}
            placeholder="Try WSJF, guardrail, created need…"
            onChange={(event) => setTerm(event.target.value)}
          />
        </div>
        <div className="origin-filter" role="group" aria-label="Filter by origin">
          {(["All", ...ORIGINS] as const).map((option) => (
            <button
              key={option}
              className={origin === option ? "active" : ""}
              aria-pressed={origin === option}
              onClick={() => setOrigin(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className="search-count" aria-live="polite">
        {filtered.length} of {glossary.length} terms
      </p>

      {filtered.length === 0 ? (
        <EmptyState title="No matches" body="Try a shorter term, or clear the origin filter." />
      ) : (
        grouped.map(([letter, entries]) => (
          <section key={letter} className="glossary-group">
            <h2>{letter}</h2>
            <dl>
              {entries.map((entry) => (
                <div key={entry.term}>
                  <dt>
                    {entry.term}
                    <span className={`origin-tag origin-${entry.origin.toLowerCase()}`}>{entry.origin}</span>
                  </dt>
                  <dd>{entry.definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))
      )}
    </div>
  );
}


export function CaseStudies({ navigate }: { navigate: (view: View) => void }) {
  /*
   * A package need not carry worked cases. Indexing [0] on an empty array is
   * how a smaller package took the whole app down — the container only holds
   * if every optional section can be absent.
   */
  const [active, setActive] = useState(caseStudies[0]?.id ?? "");
  const study = caseStudies.find((c) => c.id === active) ?? caseStudies[0];

  if (!caseStudies.length) {
    return (
      <div className="page">
        <PageIntro eyebrow="Worked cases" title="No worked cases in this package" body="This package does not include worked cases. The stages, the question bank and the review queue all work as normal." />
      </div>
    );
  }

  return (
    <div className="page">
      <PageIntro
        eyebrow="Worked cases"
        title="The whole method, worked on real decisions"
        body={`Knowing what good looks like is not the same as having seen one derived. ${caseStudies.length} cases run the method on real departmental decisions, step by step, across ${caseStudies.reduce((set, study) => { study.steps.forEach((s) => set.add(s.moduleId)); return set; }, new Set()).size} stages of the course. Each step names the decision that was on the table before it says what the team did — so you can answer it first.`}
      />

      {/*
        The tab strip now carries a stage-coverage map. The cases exercise
        different parts of the curriculum, and a learner who knows they are
        weak on lifecycle should be able to see which case will make them
        practise it without opening all four.
      */}
      <div className="case-switch" role="tablist" aria-label="Choose a case study">
        {caseStudies.map((c) => {
          const stages = [...new Set(c.steps.map((step) => step.stage))].sort((a, b) => a - b);
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              className={active === c.id ? "active" : ""}
              onClick={() => setActive(c.id)}
            >
              <strong>{c.title}</strong>
              <span>{c.subtitle}</span>
              <span className="case-coverage" aria-label={`Exercises stages ${stages.join(", ")}`}>
                {modules.map((m) => (
                  <i
                    key={m.id}
                    data-stage={m.number}
                    className={stages.includes(m.number) ? "on" : ""}
                    aria-hidden="true"
                  />
                ))}
                <span className="case-coverage-label">{stages.length} stages</span>
              </span>
            </button>
          );
        })}
      </div>

      <section className={`case-summary ${study.outcome}`}>
        {study.outcome === "corrected" && <AlertTriangle size={22} aria-hidden="true" />}
        <p>{study.summary}</p>
      </section>

      <ol className="case-steps">
        {study.steps.map((step, index) => (
          <li key={`${step.moduleId}-${index}`} data-stage={step.stage}>
            <div className="case-step-mark" aria-hidden="true">{step.stage}</div>
            <div className="case-step-body">
              {/* The stage mark is a link now — a case is the best possible
                  prompt to go and read the stage it exercises. */}
              <button className="case-stage-link" onClick={() => navigate(`module:${step.moduleId}`)}>
                Stage {step.stage} · {modules.find((m) => m.id === step.moduleId)?.title}
              </button>
              <h2>{step.heading}</h2>
              {step.decision && (
                <div className="case-decision">
                  <span className="eyebrow">The decision</span>
                  <p>{step.decision}</p>
                  {step.tempting && (
                    <p className="case-tempting">
                      <strong>Why the other way is tempting:</strong> {step.tempting}
                    </p>
                  )}
                </div>
              )}
              <LessonBody text={step.body} />
              {step.artefact && (
                <pre className="case-artefact">{step.artefact}</pre>
              )}
              <p className="case-insight"><strong>Notice:</strong> {step.insight}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="case-closing">
        <h2>What this case is for</h2>
        <p>{study.closing}</p>
        <button className="primary" onClick={() => navigate("capstone")}>
          Try it yourself in the capstone <ChevronRight size={18} aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
