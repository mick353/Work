/**
 * The worked example view.
 *
 * A course about producing a document shows the finished document. The report
 * renders as a document — numbered sections, real tables, fixed-width register
 * extracts — with commentary beside it rather than inside it, so the report
 * can be read straight through and the notes ignored.
 *
 * A package may carry more than one worked document where it teaches more than
 * one form. They are switched rather than concatenated, because each is meant
 * to be read as a complete document.
 */

import { useState } from "react";
import { exemplars, manifest } from "./content";
import { LessonTableView, PageIntro } from "./components";

export function WorkedExample() {
  const [active, setActive] = useState(0);

  if (!exemplars.length) {
    return (
      <div className="page">
        <PageIntro
          eyebrow="Worked example"
          title="No worked document in this package"
          body="This package does not produce a single document, so there is no finished example to show. The worked cases carry its applied material instead."
        />
      </div>
    );
  }

  const exemplar = exemplars[Math.min(active, exemplars.length - 1)];

  return (
    <div className="page exemplar-page">
      <PageIntro eyebrow="Worked example" title={exemplar.subtitle} body={exemplar.intro} />

      {exemplars.length > 1 && (
        <div className="case-switch" role="group" aria-label="Choose a worked document">
          {exemplars.map((item, index) => (
            <button
              key={item.id}
              className={index === active ? "active" : ""}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <strong>{item.tab}</strong>
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      )}

      <dl className="exemplar-meta">
        {exemplar.meta.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <article className="exemplar-doc" aria-label={`${exemplar.title} closure report`}>
        <header className="exemplar-doc-head">
          <span className="eyebrow">{manifest.publisher}</span>
          <h2>{exemplar.title}</h2>
          <p>Project Closure Report</p>
        </header>

        {exemplar.sections.map((section) => (
          <section key={section.heading} className="exemplar-section">
            <div className="exemplar-body">
              <h3>{section.heading}</h3>
              {section.body?.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
              {section.table && <LessonTableView table={section.table} />}
              {section.body2?.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
              {section.artefact && <pre className="artefact">{section.artefact}</pre>}
            </div>
            {/*
              Commentary sits in its own column on wide screens and below the
              section on narrow ones. Marked as an aside so a screen reader
              announces it as commentary rather than as part of the report.
            */}
            <aside className="exemplar-note" aria-label={`Why ${section.heading} is written this way`}>
              <span>Why it reads this way</span>
              <p>{section.note}</p>
            </aside>
          </section>
        ))}
      </article>

      <p className="exemplar-closing">{exemplar.closing}</p>
    </div>
  );
}
