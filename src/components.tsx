import { findSource } from "./content";
import { useId, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import type { LessonTable, Question } from "./package-model";
import { presentOptions } from "./lib";
import { SlideCaption } from "./slide-viewer";

export function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{body}</p>
    </header>
  );
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <i style={{ width: `${clamped}%` }} />
    </div>
  );
}

/**
 * Feedback is announced. The previous build rendered it silently, so a screen
 * reader user submitted an answer and heard nothing at all.
 */
export function Feedback({
  correct,
  rationale,
  optionNote,
}: {
  correct: boolean;
  rationale: string;
  optionNote?: string;
}) {
  return (
    <div className={`feedback ${correct ? "correct" : "incorrect"}`} role="status" aria-live="polite">
      <strong>{correct ? "Correct." : "Not yet."}</strong>
      <span>
        {optionNote && !correct ? (
          <>
            <span className="feedback-chosen">{optionNote}</span>
            <span className="feedback-rationale">{rationale}</span>
          </>
        ) : (
          rationale
        )}
      </span>
    </div>
  );
}

/**
 * Lesson body text, split on blank lines.
 *
 * Sections used to be a sentence or two, so one <p> was enough. The
 * worked-reasoning passages are 200-300 words, and a paragraph that long is a
 * wall — the reader loses their place and skims. Authors can now use a blank
 * line and get a real paragraph break.
 */
export function LessonBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
}

export function LessonTableView({ table }: { table: LessonTable }) {
  return (
    <div className="lesson-table-wrap">
      <table className="lesson-table">
        {table.caption && (
          <caption>
            <SlideCaption text={table.caption} />
          </caption>
        )}
        <thead>
          <tr>
            {table.head.map((cell) => (
              <th scope="col" key={cell}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th scope="row" key={cellIndex}>
                    {cell}
                  </th>
                ) : (
                  <td key={cellIndex}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SourceChips({ ids }: { ids: string[] }) {
  const list = [...new Set(ids)].map(findSource).filter(Boolean);
  if (!list.length) return null;
  return (
    <div className="source-chips">
      {list.map(
        (source) =>
          source &&
          (source.url ? (
            <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
              {source.title}
              <ExternalLink size={13} aria-hidden="true" />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : (
            <span key={source.id}>{source.title}</span>
          )),
      )}
    </div>
  );
}

/**
 * A question rendered as a real radio group.
 *
 * The previous build used <button> elements styled to look selected, with the
 * selection expressed only as a CSS class — so a screen-reader user could pick
 * an option and receive no confirmation of which one was active, and got no
 * "1 of 4" position information. Native inputs give correct semantics and
 * keyboard behaviour for free.
 *
 * Options are permuted per learner (see presentOptions). In the previous build
 * options were never shuffled and 85% of correct answers sat at position B or
 * C, so answering "B" every time scored 48%.
 */
export function QuestionCard({
  question,
  number,
  total,
  salt,
  selected,
  onSelect,
  submitted,
  context,
  size = "normal",
}: {
  question: Question;
  number?: number;
  total?: number;
  salt: string;
  /** Canonical option index, or null. */
  selected: number | null;
  onSelect: (canonicalIndex: number) => void;
  submitted: boolean;
  context?: string;
  size?: "normal" | "large";
}) {
  const groupId = useId();
  const options = useMemo(() => presentOptions(question, salt), [question, salt]);
  const correct = selected === question.answer;
  const chosenNote = selected === null ? undefined : question.optionNotes?.[selected];

  return (
    <fieldset className={`question-block ${size === "large" ? "large" : ""}`}>
      <legend>
        {number !== undefined && (
          <span className="question-number" aria-hidden="true">
            {number}
          </span>
        )}
        <span>
          {number !== undefined && total !== undefined && (
            <span className="visually-hidden">Question {number} of {total}. </span>
          )}
          {context && <span className="question-context">{context} </span>}
          {question.prompt}
        </span>
      </legend>
      <div className="answer-options">
        {options.map((option, displayIndex) => {
          const chosen = selected === option.sourceIndex;
          const className = submitted && option.isAnswer
            ? "correct"
            : submitted && chosen
              ? "incorrect"
              : chosen
                ? "selected"
                : "";
          return (
            <label key={option.sourceIndex} className={`answer-option ${className}`}>
              <input
                type="radio"
                name={groupId}
                checked={chosen}
                disabled={submitted}
                onChange={() => onSelect(option.sourceIndex)}
              />
              <span className="answer-key" aria-hidden="true">
                {String.fromCharCode(65 + displayIndex)}
              </span>
              <span className="answer-text">{option.label}</span>
              {submitted && option.isAnswer && <span className="visually-hidden"> (correct answer)</span>}
            </label>
          );
        })}
      </div>
      {submitted && <Feedback correct={correct} rationale={question.rationale} optionNote={chosenNote} />}
    </fieldset>
  );
}

export function EmptyState({
  title,
  body,
  action,
  illustration,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
  illustration?: React.ReactNode;
}) {
  return (
    <div className="empty-state">
      {illustration}
      <h2>{title}</h2>
      <p>{body}</p>
      {action}
    </div>
  );
}

/**
 * Mastery as a ring rather than a number and a bar.
 *
 * The dashboard held the most interesting figure in the app and stated it as
 * flat text above a 4px line. A ring is the one element on the page that is
 * unmistakably a picture of your own progress — it is what the eye lands on,
 * and it costs no colour discipline because it inherits the accent.
 */
export function MasteryRing({
  value,
  label,
  sub,
}: {
  value: number;
  label: string;
  sub?: string;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - clamped / 100);
  return (
    <div className="mastery-ring">
      <svg viewBox="0 0 128 128" role="img" aria-label={`${label}: ${clamped} per cent`}>
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-4, var(--accent))" />
          </linearGradient>
        </defs>
        <circle className="ring-track" cx="64" cy="64" r={r} />
        <circle
          className="ring-value"
          cx="64"
          cy="64"
          r={r}
          stroke="url(#ring-grad)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ ["--ring-full" as string]: circumference }}
        />
      </svg>
      <div className="ring-centre">
        <strong>{clamped}%</strong>
        <span>{label}</span>
      </div>
      {sub && <small>{sub}</small>}
    </div>
  );
}
