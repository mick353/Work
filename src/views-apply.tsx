import { Check, Download, Printer, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CAPSTONE_MIN_WORDS,
  capstoneRubric,
  capstoneSteps,
  fieldGuide,
  glossary,
  toolkitTemplates,
  type GlossaryEntry,
} from "./reference";
import { downloadFile } from "./lib";
import type { RubricMap, TextMap } from "./state";
import { EmptyState, PageIntro, ProgressBar, SourceChips } from "./components";

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
}: {
  values: TextMap;
  setValues: (updater: (current: TextMap) => TextMap) => void;
  rubric: RubricMap;
  setRubric: (updater: (current: RubricMap) => RubricMap) => void;
}) {
  const drafted = capstoneSteps.filter((step) => wordCount(values[step.id] ?? "") >= CAPSTONE_MIN_WORDS).length;
  const totalChecks = capstoneSteps.length * capstoneRubric.length;
  const confirmedChecks = capstoneSteps.reduce((sum, step) => sum + (rubric[step.id]?.length ?? 0), 0);

  const toggleRubric = (stepId: string, rubricId: string) => {
    setRubric((current) => {
      const existing = current[stepId] ?? [];
      return {
        ...current,
        [stepId]: existing.includes(rubricId)
          ? existing.filter((id) => id !== rubricId)
          : [...existing, rubricId],
      };
    });
  };

  const exportBrief = () => {
    const lines = [
      "PRODUCT MANAGEMENT CAPSTONE",
      "Provider application-status service",
      `Exported: ${new Date().toLocaleString("en-AU")}`,
      `Sections drafted: ${drafted} of ${capstoneSteps.length}`,
      `Self-assessment checks confirmed: ${confirmedChecks} of ${totalChecks}`,
      "",
      "".padEnd(70, "="),
      "",
    ];
    capstoneSteps.forEach((step, index) => {
      const confirmed = rubric[step.id] ?? [];
      lines.push(
        `${index + 1}. ${step.title.toUpperCase()}`,
        "",
        values[step.id]?.trim() || "[Not completed]",
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
    downloadFile("product-management-capstone.txt", lines.join("\r\n"), "text/plain;charset=utf-8");
  };

  return (
    <div className="page">
      <section className="capstone-hero">
        <div>
          <span className="eyebrow">Integrated assessment</span>
          <h1>Provider application-status product brief</h1>
          <p>
            Use the recurring case from the source presentation to demonstrate the full chain from user evidence to
            sustained service value.
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

      <section className="case-brief">
        <strong>Case</strong>
        <p>
          Providers frequently contact support because they cannot reliably understand participant application
          progress. Information is fragmented across systems, policy and operational constraints matter, and any
          response must remain accessible, secure and clear about escalation.
        </p>
      </section>

      <div className="capstone-steps">
        {capstoneSteps.map((step, index) => {
          const words = wordCount(values[step.id] ?? "");
          const done = words >= CAPSTONE_MIN_WORDS;
          const confirmed = rubric[step.id] ?? [];
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
                    value={values[step.id] ?? ""}
                    onChange={(event) => setValues((current) => ({ ...current, [step.id]: event.target.value }))}
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
  return (
    <div className="page">
      <PageIntro
        eyebrow="DES field guide"
        title="The reference half of the course"
        body="Phase names, principles, cadence, backlog fields and roles, in one place for lookup at work. Nothing here is assessed — it exists so you do not have to reopen the deck mid-meeting."
      />
      <nav className="field-guide-nav" aria-label="Field guide sections">
        {fieldGuide.map((entry) => (
          <a key={entry.id} href={`#${entry.id}`}>
            {entry.title}
          </a>
        ))}
      </nav>
      <div className="field-guide">
        {fieldGuide.map((entry) => (
          <section key={entry.id} id={entry.id}>
            <header>
              <h2>{entry.title}</h2>
              {entry.slides && <span className="field-guide-slides">Deck slides {entry.slides}</span>}
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
