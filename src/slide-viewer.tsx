/**
 * The slide viewer: the lightbox, and the citation controls that open it.
 *
 * The course was written from a 98-slide deck and cited it constantly —
 * "Deck slides 21-35" on every stage, "Slide 33 - the deck's canvas fields" on
 * nineteen figures. None of that was any use to a reader who did not have the
 * file. A citation you cannot follow is just an assertion.
 *
 * So the deck ships with the app. Two ways in:
 *
 *   1. Inline. A citation anywhere in the course opens that exact slide over
 *      the page you are reading. You do not lose your place, which is the whole
 *      point — you are checking a reference, not changing activity.
 *
 *   2. The Deck view, for browsing all 98 against the stage that covers them.
 *
 * The images are attached by the build, not imported here, because the two
 * builds carry them differently — see `slideSrc` below.
 *
 * This module deliberately imports nothing from components.tsx: components.tsx
 * needs SlideCaption to render a figure caption, so the dependency has to run
 * one way only.
 */

import { modules, SLIDE_COUNT, slides } from "./content";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Maximize2, X } from "lucide-react";
import { type Slide } from "./slides";

/* ------------------------------------------------------------------ *
 * Where the picture comes from
 * ------------------------------------------------------------------ */

/**
 * The standalone HTML must stay ONE file — that is the reason it exists, and
 * a folder of images sitting next to it would be lost the first time anyone
 * emailed it on. So the build inlines all 98 slides there as data URIs, in a
 * JSON script tag.
 *
 * The Pages build does the opposite: it leaves them as separate files, so a
 * phone downloads a 530 KB page and then only the handful of slides actually
 * opened. The service worker caches each one as it is fetched.
 *
 * Parsing is deferred to first use. The inline payload is a few megabytes of
 * base64, and somebody who never opens a slide should never pay to parse it.
 */
let inlined: Record<string, string> | null | undefined;

export function slideSrc(n: number): string {
  if (inlined === undefined) {
    const element = document.getElementById("slide-data");
    try {
      inlined = element?.textContent ? (JSON.parse(element.textContent) as Record<string, string>) : null;
    } catch {
      inlined = null;
    }
  }
  return inlined?.[String(n)] ?? `slides/slide-${String(n).padStart(2, "0")}.webp`;
}

export function findSlide(n: number): Slide | undefined {
  return slides.find((slide) => slide.n === n);
}

/**
 * The heading to show. A few slides carry no words at all — slide 98 is a
 * wordless "questions?" illustration — and the import leaves those blank
 * rather than inventing a title. Say so plainly instead.
 */
export function slideLabel(slide: Slide): string {
  return slide.title || "Image only";
}

/**
 * Alt text. "Slide 33" describes nothing, so use the slide's own heading and
 * let the text panel carry the rest — visible to everyone, rather than hidden
 * in an attribute only a screen reader reaches.
 */
export function slideAlt(slide: Slide): string {
  return slide.title
    ? `Slide ${slide.n}: ${slide.title}`
    : `Slide ${slide.n}: an illustration with no text on it`;
}

/* ------------------------------------------------------------------ *
 * Opening a slide from anywhere
 * ------------------------------------------------------------------ */

type ViewerApi = { open: (n: number) => void };

const ViewerContext = createContext<ViewerApi>({ open: () => {} });

export function useSlideViewer() {
  return useContext(ViewerContext);
}

export function SlideViewerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<number | null>(null);
  const open = useCallback((n: number) => setCurrent(n), []);
  const api = useMemo(() => ({ open }), [open]);

  return (
    <ViewerContext.Provider value={api}>
      {children}
      {current !== null && (
        <Lightbox n={current} onChange={setCurrent} onClose={() => setCurrent(null)} />
      )}
    </ViewerContext.Provider>
  );
}

function Lightbox({
  n,
  onChange,
  onClose,
}: {
  n: number;
  onChange: (n: number) => void;
  onClose: () => void;
}) {
  const slide = findSlide(n);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  // Remember what had focus so it can be handed back on close — otherwise
  // focus lands on <body> and a keyboard user restarts from the top of the page.
  useEffect(() => {
    returnTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => returnTo.current?.focus?.();
  }, []);

  // The page behind must not scroll while a full-screen overlay is up.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft" && n > 1) {
        event.preventDefault();
        onChange(n - 1);
        return;
      }
      if (event.key === "ArrowRight" && n < SLIDE_COUNT) {
        event.preventDefault();
        onChange(n + 1);
        return;
      }
      if (event.key !== "Tab") return;
      // Trap: this is a modal dialog, so Tab must not reach the page behind.
      const items = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]") ?? [],
      );
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
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [n, onChange, onClose]);

  if (!slide) return null;
  const stage = modules.find((module) => module.id === slide.stage);

  return (
    <div className="slide-backdrop" onClick={onClose}>
      <div
        ref={panelRef}
        className="slide-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`Slide ${slide.n} of ${SLIDE_COUNT}: ${slideLabel(slide)}`}
        onClick={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span className="eyebrow">
              Source deck · slide {slide.n} of {SLIDE_COUNT}
              {stage ? ` · Stage ${stage.number}` : ""}
            </span>
            <h2>{slideLabel(slide)}</h2>
          </div>
          <button ref={closeRef} className="icon-button" onClick={onClose} aria-label="Close slide">
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="slide-stage">
          <button
            className="slide-step"
            onClick={() => onChange(n - 1)}
            disabled={n <= 1}
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <img src={slideSrc(slide.n)} alt={slideAlt(slide)} decoding="async" />
          <button
            className="slide-step"
            onClick={() => onChange(n + 1)}
            disabled={n >= SLIDE_COUNT}
            aria-label="Next slide"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>

        {slide.text && (
          <div className="slide-text">
            <h3>What the slide says</h3>
            <p>{slide.text}</p>
          </div>
        )}
        <p className="slide-foot">
          From <em>Product Management Fundamentals — 12AUG2026</em>.
          <span className="slide-foot-keys">
            {" "}Use <kbd>←</kbd> <kbd>→</kbd> to move between slides, <kbd>Esc</kbd> to close.
          </span>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Citations that resolve
 * ------------------------------------------------------------------ */

/** Matches a leading "Slide 13" or "Slides 25–27" on a figure caption. */
const CAPTION_CITATION = /^Slides?\s+(\d+)(?:\s*[–—-]\s*(\d+))?/;

/**
 * A figure caption, with its slide citation turned into something you can
 * actually open. Captions are plain strings in course.ts, so the citation is
 * parsed at render rather than hand-marked in 19 places — which also means any
 * caption added later becomes live for free.
 */
export function SlideCaption({ text }: { text: string }) {
  const { open } = useSlideViewer();
  const match = CAPTION_CITATION.exec(text);
  if (!match) return <>{text}</>;

  const first = Number(match[1]);
  if (!findSlide(first)) return <>{text}</>;

  return (
    <>
      <button className="slide-cite" onClick={() => open(first)}>
        <Maximize2 size={13} aria-hidden="true" />
        {match[0]}
        <span className="visually-hidden"> — open this slide</span>
      </button>
      {text.slice(match[0].length)}
    </>
  );
}

/** "Deck slides 21–35" on a stage header, as a control that opens the first. */
export function SlideRangeLink({ range, className }: { range: string; className?: string }) {
  const { open } = useSlideViewer();
  const first = Number(/^\s*(\d+)/.exec(range)?.[1]);
  // "Deck slides 32" when it names exactly one slide is just sloppy.
  const label = `Deck slide${/^\s*\d+\s*$/.test(range) ? "" : "s"} ${range}`;
  if (!first || !findSlide(first)) return <span className={className}>{label}</span>;
  return (
    <button className={`slide-cite ${className ?? ""}`} onClick={() => open(first)}>
      <Images size={13} aria-hidden="true" />
      {label}
      <span className="visually-hidden"> — open slide {first}</span>
    </button>
  );
}
