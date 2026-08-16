/**
 * The Deck view — all 98 slides, browsable, filtered by the stage that covers
 * them. The lightbox and the citation controls live in slide-viewer.tsx.
 */

import { manifest, modules, SLIDE_COUNT, slides } from "./content";
import { useEffect, useRef, useState } from "react";
import { slideAlt, slideLabel, slideSrc, useSlideViewer } from "./slide-viewer";
import { PageIntro } from "./components";

/* ------------------------------------------------------------------ *
 * The Deck view
 * ------------------------------------------------------------------ */

export function Deck({ initial }: { initial?: number }) {
  const { open } = useSlideViewer();
  const [stage, setStage] = useState<string>("all");
  const opened = useRef(false);

  // A citation elsewhere can deep-link here; open that slide once on arrival.
  useEffect(() => {
    if (initial && !opened.current) {
      opened.current = true;
      open(initial);
    }
  }, [initial, open]);

  const shown = stage === "all" ? slides : slides.filter((slide) => slide.stage === stage);

  if (!slides.length) {
    return (
      <div className="page">
        <PageIntro
          eyebrow="Source deck"
          title="No source slides in this package"
          body="This package was not built from a slide deck, so there is nothing to browse here. Citations elsewhere in the course point at its own sources instead."
        />
      </div>
    );
  }

  return (
    <div className="page deck-page">
      <PageIntro
        eyebrow="Source deck"
        title={`All ${SLIDE_COUNT} slides the course was built from`}
        body={`${manifest.source}, from ${manifest.publisher}. Every slide citation in the course opens the slide it names, so you can check the course against its source rather than take it on trust.`}
      />

      <div className="deck-filter" role="group" aria-label="Filter slides by stage">
        <button className={stage === "all" ? "active" : ""} onClick={() => setStage("all")} aria-pressed={stage === "all"}>
          All {SLIDE_COUNT}
        </button>
        {modules.map((module) => (
          <button
            key={module.id}
            className={stage === module.id ? "active" : ""}
            data-stage={module.number}
            aria-pressed={stage === module.id}
            onClick={() => setStage(module.id)}
          >
            <span className="deck-filter-num" aria-hidden="true">{module.number}</span>
            {module.title}
            <span className="visually-hidden"> — slides {module.slides}</span>
          </button>
        ))}
      </div>

      <p className="deck-count" role="status">
        Showing {shown.length} slide{shown.length === 1 ? "" : "s"}
        {stage === "all" ? "" : ` from Stage ${modules.find((m) => m.id === stage)?.number}`}.
      </p>

      <ul className="deck-grid">
        {shown.map((slide) => (
          <li key={slide.n}>
            <button onClick={() => open(slide.n)}>
              {/*
                Native lazy loading. On the Pages build this is what keeps the
                page cheap: only the thumbnails scrolled into view are fetched.
                Width and height are set so the grid does not reflow as they
                arrive.
              */}
              <img
                src={slideSrc(slide.n)}
                alt={slideAlt(slide)}
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
              />
              <span className="deck-caption">
                <span className="deck-number" data-stage={modules.find((m) => m.id === slide.stage)?.number}>
                  {slide.n}
                </span>
                <span>{slideLabel(slide)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
