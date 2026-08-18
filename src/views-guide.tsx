import { caseStudies, CONTENT_REVIEWED, contrasts, fieldGuide, glossary, manifest, modules, sources, toolkitTemplates, totalMinutes } from "./content";
import { Printer } from "lucide-react";
import { estimateHours, scrollToSection, type View } from "./lib";
import { LessonBody, LessonTableView, PageIntro } from "./components";
import { SlideRangeLink } from "./slide-viewer";

/**
 * The full guide, as a document.
 *
 * The app is built for drilling: short pages, retrieval, one stage at a time.
 * That is the right shape for learning and the wrong shape for reading. People
 * also want to print the thing, read it on a train, or hand it to someone —
 * and printing nine separate stage pages produced nine separate documents.
 *
 * This is one continuous read: cover, contents, all nine stages in order with
 * their tables and contrasts, both worked cases, the toolkit, the field guide,
 * the glossary and the sources. It is deliberately assessment-free — questions
 * and scenarios do not belong in a printed reference.
 *
 * Print CSS gives it running page breaks, so it comes out as a proper booklet
 * rather than a screenshot of a website.
 */
export function Guide({ navigate }: { navigate: (view: View) => void }) {
  const sections = [
    { id: "how", label: "How to use this guide" },
    ...modules.map((m) => ({ id: `stage-${m.number}`, label: `${m.number}. ${m.title}` })),
    { id: "cases", label: "Worked cases" },
    { id: "toolkit", label: "Templates" },
    { id: "field", label: "Field guide" },
    { id: "glossary", label: "Glossary" },
    { id: "sources", label: "Sources" },
  ];

  return (
    <div className="page guide-page">
      <div className="guide-actions no-print">
        <PageIntro
          eyebrow="The whole thing, in one read"
          title={`${manifest.title} — the complete guide`}
          body="Every stage in order, with the tables, the contrasts, both worked cases, the templates, the field guide and the glossary. No questions — this is the reading copy. Print it and it comes out as a proper booklet."
        />
        <div className="button-row">
          <button className="primary" onClick={() => window.print()}>
            <Printer size={18} aria-hidden="true" /> Print the guide
          </button>
          <button className="secondary" onClick={() => navigate("path")}>
            Back to the interactive course
          </button>
        </div>
      </div>

      {/* Cover — print only */}
      <section className="guide-cover">
        <span className="guide-cover-kicker">Internal learning aid</span>
        <h1>{manifest.title}</h1>
        <p className="guide-cover-sub">{manifest.subtitle}</p>
        <dl>
          <div><dt>Source</dt><dd>{manifest.source}, {manifest.publisher}</dd></div>
          {manifest.sourceAuthor && <div><dt>Source written by</dt><dd>{manifest.sourceAuthor}</dd></div>}
          <div><dt>Reading time</dt><dd>{estimateHours(totalMinutes)}</dd></div>
          <div><dt>Content reviewed</dt><dd>{CONTENT_REVIEWED}</dd></div>
        </dl>
        <p className="guide-cover-note">
          Not an official Australian Government publication. Where this and any official departmental or Australian
          Government source disagree, the official source governs.
        </p>
      </section>

      {/*
        Buttons, not <a href="#stage-1">.

        The app routes on the location hash, so a fragment link is not an
        anchor here — it is a route change. Clicking one set the hash to
        "#stage-1", which matches no view, so the contents list threw you out
        of the guide instead of moving you down it. Scroll the element into
        view directly and leave the hash alone.
      */}
      <nav className="guide-contents" aria-label="Guide contents">
        <h2>Contents</h2>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <button onClick={() => scrollToSection(section.id)}>{section.label}</button>
            </li>
          ))}
        </ol>
      </nav>

      <section id="how" className="guide-section">
        <h2>How to use this guide</h2>
        <p>
          Read a stage, then close the guide and try to say the core idea out loud. That small act of retrieval is
          worth more than reading the stage twice — it is the single most robust finding in the learning literature and
          the reason the interactive version withholds answers until you have committed to one.
        </p>
        <p>
          Each stage ends with a set of contrasts: what good looks like, what usually happens, and{" "}
          <strong>the tell</strong> — an observable check you can run on your own team this week. Those are the parts
          worth arguing with. If a tell describes you, that is the useful outcome, not a failing.
        </p>
      </section>

      {modules.map((module) => {
        const stageContrasts = contrasts.filter((c) => c.moduleId === module.id);
        return (
          <section key={module.id} id={`stage-${module.number}`} className="guide-stage" data-stage={module.number}>
            <header>
              <span className="guide-stage-num">Stage {module.number}</span>
              <h2>{module.title}</h2>
              <p className="guide-stage-sub">{module.subtitle}</p>
              <p className="guide-stage-meta">
                {module.slides?.trim() && (
                  <>
                    <SlideRangeLink range={module.slides} /> ·{" "}
                  </>
                )}
                {module.minutes} minutes
              </p>
            </header>

            <blockquote className="guide-core">{module.coreIdea}</blockquote>

            <p className="guide-outcome">
              <strong>By the end you should be able to:</strong> {module.outcome}
            </p>

            {module.sections.map((section) => (
              <div key={section.heading} className="guide-lesson">
                <h3>{section.heading}</h3>
                <LessonBody text={section.body} />
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.table && <LessonTableView table={section.table} />}
                {section.example && (
                  <p className="guide-example">
                    <strong>Worked example.</strong> {section.example}
                  </p>
                )}
              </div>
            ))}

            {stageContrasts.length > 0 && (
              <div className="guide-contrasts">
                <h3>Check yourself</h3>
                <table>
                  <thead>
                    <tr>
                      <th>What good looks like</th>
                      <th>What usually happens</th>
                      <th>The tell</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stageContrasts.map((item) => (
                      <tr key={item.good}>
                        <td>{item.good}</td>
                        <td>{item.usual}</td>
                        <td>{item.tell}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );
      })}

      <section id="cases" className="guide-section guide-break">
        <h2>Worked cases</h2>
        {caseStudies.map((study) => (
          <div key={study.id} className="guide-case">
            <h3>{study.title}</h3>
            <p className="guide-case-sub">{study.subtitle}</p>
            <p>{study.summary}</p>
            {study.steps.map((step, index) => (
              <div key={`${step.moduleId}-${index}`} className="guide-case-step">
                <h4>
                  Stage {step.stage} — {step.heading}
                </h4>
                <p>{step.body}</p>
                {step.artefact && <pre>{step.artefact}</pre>}
                <p className="guide-insight">
                  <strong>Notice.</strong> {step.insight}
                </p>
              </div>
            ))}
            <p className="guide-case-closing">{study.closing}</p>
          </div>
        ))}
      </section>

      <section id="toolkit" className="guide-section guide-break">
        <h2>Templates</h2>
        {toolkitTemplates.map((template) => (
          <div key={template.id} className="guide-template">
            <h3>{template.title}</h3>
            <pre>{template.prompt}</pre>
            <p>
              <strong>Example.</strong> {template.example}
            </p>
            {template.note && <p className="guide-note">{template.note}</p>}
          </div>
        ))}
      </section>

      <section id="field" className="guide-section guide-break">
        <h2>Field guide</h2>
        {fieldGuide.map((entry) => (
          <div key={entry.id} className="guide-field">
            <h3>{entry.title}</h3>
            <p>{entry.summary}</p>
            <dl>
              {entry.items.map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>

      <section id="glossary" className="guide-section guide-break">
        <h2>Glossary</h2>
        <p className="guide-note">
          Each entry names the body of practice the term comes from. Epics, features and Program Increments are not
          Scrum terms, and the DES delivery phases are not the DTA service phases.
        </p>
        <dl className="guide-glossary">
          {glossary.map((entry) => (
            <div key={entry.term}>
              <dt>
                {entry.term} <span>{entry.origin}</span>
              </dt>
              <dd>{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="sources" className="guide-section guide-break">
        <h2>Sources</h2>
        <p className="guide-note">All links freely readable — no paywalled papers, no books you have to buy.</p>
        <ol className="guide-sources">
          {sources.map((source) => (
            <li key={source.id}>
              <strong>{source.title}</strong> — {source.publisher}
              <br />
              {source.note}
              {source.url && (
                <>
                  <br />
                  <span className="guide-url">{source.url}</span>
                </>
              )}
            </li>
          ))}
        </ol>
      </section>

      <footer className="guide-end">
        {manifest.title} — unofficial internal learning aid. Built from {manifest.source}
        {manifest.sourceAuthor ? `, by ${manifest.sourceAuthor}` : ""}.
        Content reviewed {CONTENT_REVIEWED}. Not an official Australian Government publication.
      </footer>
    </div>
  );
}
