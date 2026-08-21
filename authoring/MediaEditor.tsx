import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { FileImage, FileStack, Trash2, Upload } from "lucide-react";
import type { CourseAsset, Slide, TrainingPackage } from "../src/package-model";
import { importSlideImages, importSlidePdf, importStageVisual, type ImportedSlides } from "./media";

type Props = {
  entry: TrainingPackage;
  setEntry: Dispatch<SetStateAction<TrainingPackage>>;
  setMessage: (message: string) => void;
};

function Field({ label, value, onChange, hint }: { label: string; value: string; onChange: (value: string) => void; hint?: string }) {
  return <label className="field"><span>{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} />{hint && <small>{hint}</small>}</label>;
}

function Area({ label, value, onChange, rows = 3, hint }: { label: string; value: string; onChange: (value: string) => void; rows?: number; hint?: string }) {
  return <label className="field field-wide"><span>{label}</span><textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />{hint && <small>{hint}</small>}</label>;
}

function updateAt<T>(items: T[], index: number, next: T): T[] {
  const result = [...items];
  result[index] = next;
  return result;
}

function withSlideRanges(entry: TrainingPackage, slides: Slide[], assets: CourseAsset[]): TrainingPackage {
  const modules = entry.content.modules.map((module) => {
    const numbers = slides.filter((slide) => slide.stage === module.id).map((slide) => slide.n).sort((a, b) => a - b);
    const range = numbers.length === 0 ? "" : numbers.length === 1 ? String(numbers[0]) : `${numbers[0]}–${numbers.at(-1)}`;
    return { ...module, slides: range };
  });
  return { ...entry, content: { ...entry.content, modules, slides, slideCount: slides.length, assets } };
}

function megabytes(assets: CourseAsset[]): string {
  return (assets.reduce((sum, asset) => sum + asset.dataUrl.length, 0) / 1024 / 1024).toFixed(1);
}

export function MediaEditor({ entry, setEntry, setMessage }: Props) {
  const pdfRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState("");
  const [deckStage, setDeckStage] = useState(entry.content.modules[0]?.id ?? "");
  const [deckSource, setDeckSource] = useState(entry.content.sources[0]?.id ?? "");
  const assets = entry.content.assets ?? [];

  const mergeDeck = (imported: ImportedSlides) => {
    setEntry((current) => {
      const importedAssets = imported.assets.map((asset) => ({ ...asset, sourceId: deckSource || undefined }));
      return withSlideRanges(current, [...current.content.slides, ...imported.slides], [...(current.content.assets ?? []), ...importedAssets]);
    });
  };

  const importPdf = async (file: File | undefined) => {
    if (!file || !deckStage) return;
    try {
      setBusy("Opening PDF…");
      const start = Math.max(0, ...entry.content.slides.map((slide) => slide.n)) + 1;
      mergeDeck(await importSlidePdf(file, deckStage, start, setBusy));
      setMessage(`Imported ${file.name}. Review slide titles, extracted text, stage assignments and image descriptions.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy("");
      if (pdfRef.current) pdfRef.current.value = "";
    }
  };

  const importImages = async (files: File[]) => {
    if (!files.length || !deckStage) return;
    try {
      setBusy("Opening slide images…");
      const start = Math.max(0, ...entry.content.slides.map((slide) => slide.n)) + 1;
      mergeDeck(await importSlideImages(files, deckStage, start, setBusy));
      setMessage(`Imported ${files.length} slide image${files.length === 1 ? "" : "s"}. Review their order, titles, stage assignments and image descriptions.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy("");
      if (imagesRef.current) imagesRef.current.value = "";
    }
  };

  const updateAsset = (assetId: string, next: (asset: CourseAsset) => CourseAsset) => {
    setEntry((current) => ({ ...current, content: { ...current.content, assets: (current.content.assets ?? []).map((asset) => asset.id === assetId ? next(asset) : asset) } }));
  };

  const removeSlide = (index: number) => {
    setEntry((current) => {
      const slide = current.content.slides[index];
      const slides = current.content.slides.filter((_, candidate) => candidate !== index);
      const assets = (current.content.assets ?? []).filter((asset) => asset.id !== slide.assetId);
      return withSlideRanges(current, slides, assets);
    });
  };

  const clearDeck = () => {
    if (!window.confirm("Remove the complete source deck from this draft? Stage visuals and other course content will remain.")) return;
    setEntry((current) => {
      const slideAssetIds = new Set(current.content.slides.map((slide) => slide.assetId).filter(Boolean));
      return withSlideRanges(current, [], (current.content.assets ?? []).filter((asset) => !slideAssetIds.has(asset.id)));
    });
  };

  const uploadVisual = async (file: File | undefined, stageId: string) => {
    if (!file) return;
    try {
      setBusy(`Preparing ${file.name}…`);
      const asset = await importStageVisual(file, stageId);
      setEntry((current) => {
        const module = current.content.modules.find((candidate) => candidate.id === stageId);
        const previous = module?.visualAssetId;
        return {
          ...current,
          content: {
            ...current.content,
            assets: [...(current.content.assets ?? []).filter((candidate) => candidate.id !== previous), asset],
            modules: current.content.modules.map((candidate) => candidate.id === stageId ? { ...candidate, visualAssetId: asset.id } : candidate),
          },
        };
      });
      setMessage("Image added. Write an accurate text alternative before release.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="workspace-stack media-page">
      <div className="page-heading"><span className="eyebrow">6 · Media and source deck</span><h1>Bring the source material and stage visuals with the course</h1><p>Imported files are resized, embedded in the draft and carried into every learner export. Nothing is uploaded. PDF pages become slide images; PowerPoint files should first be saved as PDF or exported as images.</p></div>
      {busy && <div className="media-progress" role="status"><span className="progress-spinner" />{busy}</div>}

      <section className="editor-card">
        <header className="card-header"><div><span className="eyebrow">Complete source deck</span><h2>Slides learners can open from citations</h2><p>Choose the initial stage and source before import. You can reassign individual slides afterwards.</p></div>{entry.content.slides.length > 0 && <button type="button" className="text-danger" onClick={clearDeck}><Trash2 size={16} />Remove complete deck</button>}</header>
        <div className="form-grid media-import-settings">
          <label className="field"><span>Initial course stage</span><select value={deckStage} onChange={(event) => setDeckStage(event.target.value)}>{entry.content.modules.map((module) => <option key={module.id} value={module.id}>{module.number}. {module.title || module.id}</option>)}</select><small>Used for all imported pages until you reassign them below.</small></label>
          <label className="field"><span>Deck source</span><select value={deckSource} onChange={(event) => setDeckSource(event.target.value)}><option value="">No registered source</option>{entry.content.sources.map((source) => <option key={source.id} value={source.id}>{source.title || source.id}</option>)}</select><small>Connects the imported images to the source register.</small></label>
        </div>
        <div className="media-import-actions">
          <input ref={pdfRef} className="visually-hidden" type="file" accept="application/pdf,.pdf" onChange={(event) => void importPdf(event.target.files?.[0])} />
          <button type="button" className="primary" disabled={Boolean(busy) || !deckStage} onClick={() => pdfRef.current?.click()}><FileStack size={18} />Import PDF deck</button>
          <input ref={imagesRef} className="visually-hidden" type="file" multiple accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp" onChange={(event) => void importImages(Array.from(event.target.files ?? []))} />
          <button type="button" className="secondary" disabled={Boolean(busy) || !deckStage} onClick={() => imagesRef.current?.click()}><FileImage size={18} />Import slide images</button>
          <p>Maximum 50 MB per source file and 150 PDF pages. PNG, JPEG and WebP are accepted; SVG is deliberately excluded.</p>
        </div>
        <div className="asset-summary"><strong>{entry.content.slides.length}</strong><span>slides</span><strong>{megabytes(assets)}</strong><span>MB embedded media</span></div>
        <div className="slide-editor-list">{entry.content.slides.length === 0 && <p className="empty-copy">No source deck is included. This is valid for a course that does not need one.</p>}{entry.content.slides.map((slide, index) => {
          const asset = assets.find((candidate) => candidate.id === slide.assetId);
          return <details className="slide-editor" key={`${slide.n}-${slide.assetId ?? index}`}><summary>{asset && <img src={asset.dataUrl} alt="" />}<span>Slide {slide.n}</span><strong>{slide.title || "Untitled slide"}</strong></summary><div className="slide-editor-body">{asset && <img className="slide-preview" src={asset.dataUrl} alt={asset.alt} />}<div className="form-grid"><Field label="Slide title" value={slide.title} onChange={(value) => setEntry((current) => ({ ...current, content: { ...current.content, slides: updateAt(current.content.slides, index, { ...slide, title: value }) } }))} /><label className="field"><span>Course stage</span><select value={slide.stage} onChange={(event) => setEntry((current) => withSlideRanges(current, updateAt(current.content.slides, index, { ...slide, stage: event.target.value }), current.content.assets ?? []))}>{entry.content.modules.map((module) => <option key={module.id} value={module.id}>{module.number}. {module.title || module.id}</option>)}</select></label>{asset && <Field label="Image description" value={asset.alt} hint="Describe the information, not merely ‘slide image’." onChange={(value) => updateAsset(asset.id, (current) => ({ ...current, alt: value }))} />}</div><Area label="Searchable slide text" value={slide.text} onChange={(value) => setEntry((current) => ({ ...current, content: { ...current.content, slides: updateAt(current.content.slides, index, { ...slide, text: value }) } }))} rows={5} hint="PDF import extracts this automatically. Correct it if needed." /><button type="button" className="text-danger" onClick={() => removeSlide(index)}><Trash2 size={16} />Remove slide</button></div></details>;
        })}</div>
      </section>

      <section className="editor-card">
        <header className="card-header"><div><span className="eyebrow">Stage visuals</span><h2>One useful image or illustration per stage</h2><p>These replace the generic stage illustration in the learner course. Add an image only when it helps explain or orient the learner.</p></div></header>
        <div className="visual-editor-list">{entry.content.modules.map((module) => {
          const asset = assets.find((candidate) => candidate.id === module.visualAssetId);
          return <article className="visual-editor" key={module.id}><header><span>{module.number}</span><div><strong>{module.title || module.id}</strong><small>{asset ? asset.fileName : "Using the default course illustration"}</small></div></header>{asset && <img src={asset.dataUrl} alt={asset.alt} />}<label className="secondary upload-label"><Upload size={16} /><span>{asset ? "Replace image" : "Add image"}</span><input className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp" onChange={(event) => void uploadVisual(event.target.files?.[0], module.id)} /></label>{asset && <><Field label="Image description" value={asset.alt} hint="Required for learners who cannot see the image." onChange={(value) => updateAsset(asset.id, (current) => ({ ...current, alt: value }))} /><Field label="Caption (optional)" value={asset.caption ?? ""} onChange={(value) => updateAsset(asset.id, (current) => ({ ...current, caption: value || undefined }))} /><label className="field"><span>Image source (optional)</span><select value={asset.sourceId ?? ""} onChange={(event) => updateAsset(asset.id, (current) => ({ ...current, sourceId: event.target.value || undefined }))}><option value="">No registered source</option>{entry.content.sources.map((source) => <option key={source.id} value={source.id}>{source.title || source.id}</option>)}</select></label><button type="button" className="text-danger" onClick={() => setEntry((current) => ({ ...current, content: { ...current.content, assets: (current.content.assets ?? []).filter((candidate) => candidate.id !== asset.id), modules: current.content.modules.map((candidate) => candidate.id === module.id ? { ...candidate, visualAssetId: undefined } : candidate) } }))}><Trash2 size={16} />Remove image</button></>}</article>;
        })}</div>
      </section>
    </div>
  );
}
