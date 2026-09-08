import { useId, useMemo, useState } from "react";
import { Image, Plus, X } from "lucide-react";
import type { CourseAsset, Slide } from "../src/package-model";

type Props = {
  slides: Slide[];
  assets: CourseAsset[];
  value: number[] | undefined;
  onChange: (numbers: number[]) => void;
};

/** Turn the legacy display value (for example "4–6, 9") into slide numbers. */
export function parseSlideReference(value: string | undefined): number[] {
  if (!value?.trim()) return [];
  const numbers = new Set<number>();
  for (const part of value.split(",")) {
    const range = part.trim().match(/^(\d+)\s*(?:–|-)\s*(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      for (let number = Math.min(start, end); number <= Math.max(start, end); number += 1) numbers.add(number);
      continue;
    }
    if (/^\d+$/.test(part.trim())) numbers.add(Number(part.trim()));
  }
  return [...numbers].filter(Number.isInteger).sort((a, b) => a - b);
}

/** Keep learner-facing references compact while preserving every selected slide. */
export function formatSlideReference(numbers: number[]): string {
  const selected = [...new Set(numbers)].filter(Number.isInteger).sort((a, b) => a - b);
  const groups: string[] = [];
  for (let index = 0; index < selected.length;) {
    const start = selected[index];
    let end = start;
    while (selected[index + 1] === end + 1) {
      index += 1;
      end = selected[index];
    }
    groups.push(start === end ? String(start) : `${start}–${end}`);
    index += 1;
  }
  return groups.join(", ");
}

/**
 * A constrained source-deck picker. Free-text slide numbers made it far too
 * easy to create a citation that could not open in the learner course.
 */
export function SlideReferencePicker({ slides, assets, value, onChange }: Props) {
  const [candidate, setCandidate] = useState("");
  const labelId = useId();
  const selected = useMemo(
    () => [...new Set(value ?? [])].sort((a, b) => a - b),
    [value],
  );
  const byNumber = useMemo(() => new Map(slides.map((slide) => [slide.n, slide])), [slides]);
  const byAsset = useMemo(() => new Map(assets.map((asset) => [asset.id, asset])), [assets]);
  const available = slides.filter((slide) => !selected.includes(slide.n));

  const add = () => {
    const number = Number(candidate);
    if (!Number.isInteger(number) || !byNumber.has(number)) return;
    onChange([...selected, number].sort((a, b) => a - b));
    setCandidate("");
  };

  const remove = (number: number) => onChange(selected.filter((item) => item !== number));

  return (
    <div className="slide-reference-picker" role="group" aria-labelledby={labelId}>
      <div>
        <strong id={labelId}>Source deck slides</strong>
        <p>Choose from the imported deck. Each selected slide becomes an openable citation for learners.</p>
      </div>
      {slides.length === 0 ? (
        <p className="slide-reference-empty"><Image size={16} aria-hidden="true" /> No source deck is available yet. Import it in Media & source deck before citing slides.</p>
      ) : (
        <div className="slide-reference-add">
          <label>
            <span className="visually-hidden">Choose an imported slide</span>
            <select aria-label="Choose an imported slide" value={candidate} onChange={(event) => setCandidate(event.target.value)}>
              <option value="">Choose a slide to cite…</option>
              {available.map((slide) => <option key={slide.n} value={slide.n}>Slide {slide.n} — {slide.title || "Untitled slide"}</option>)}
            </select>
          </label>
          <button type="button" className="secondary" disabled={!candidate} onClick={add}><Plus size={16} aria-hidden="true" />Add slide</button>
        </div>
      )}
      {selected.length > 0 && (
        <ul className="selected-slides" aria-label="Selected source deck slides">
          {selected.map((number) => {
            const slide = byNumber.get(number);
            const asset = slide?.assetId ? byAsset.get(slide.assetId) : undefined;
            return (
              <li key={number} className={slide ? undefined : "missing"}>
                {asset ? <img src={asset.dataUrl} alt="" /> : <Image size={18} aria-hidden="true" />}
                <span><strong>Slide {number}</strong><small>{slide?.title || "This slide is not in the imported deck"}</small></span>
                <button type="button" className="icon-danger" onClick={() => remove(number)} aria-label={`Remove slide ${number} citation`}><X size={16} aria-hidden="true" /></button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
