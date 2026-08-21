import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import type { CourseAsset, Slide } from "../src/package-model";
import { slugify } from "./draft";

const MAX_SOURCE_BYTES = 50 * 1024 * 1024;
const MAX_PDF_PAGES = 150;
const MAX_IMAGE_EDGE = 1_600;
let workerUrl = "";

export type ImportedSlides = { assets: CourseAsset[]; slides: Slide[] };

function ensurePdfWorker() {
  if (!workerUrl) {
    workerUrl = URL.createObjectURL(new Blob([__PDF_WORKER_SOURCE__], { type: "text/javascript" }));
    GlobalWorkerOptions.workerSrc = workerUrl;
  }
}

function dataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error("Could not read generated image data."));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(blob);
  });
}

function canvasBlob(canvas: HTMLCanvasElement): Promise<{ blob: Blob; mimeType: CourseAsset["mimeType"] }> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((webp) => {
      if (webp) {
        resolve({ blob: webp, mimeType: "image/webp" });
        return;
      }
      canvas.toBlob((png) => {
        if (png) resolve({ blob: png, mimeType: "image/png" });
        else reject(new Error("This browser could not encode the image."));
      }, "image/png");
    }, "image/webp", 0.84);
  });
}

function slideId(number: number): string {
  return `slide-${String(number).padStart(3, "0")}`;
}

function titleFromFile(name: string): string {
  return name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/^\d+\s*/, "").trim() || "Image only";
}

async function bitmapFromFile(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if ("createImageBitmap" in window) return createImageBitmap(file);
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function normaliseImage(file: File): Promise<{ dataUrl: string; mimeType: CourseAsset["mimeType"] }> {
  if (file.size > MAX_SOURCE_BYTES) throw new Error(`${file.name} exceeds the 50 MB source-file limit.`);
  const extensionType = /\.png$/i.test(file.name) ? "image/png" : /\.jpe?g$/i.test(file.name) ? "image/jpeg" : /\.webp$/i.test(file.name) ? "image/webp" : "";
  const selectedType = file.type || extensionType;
  if (!/^image\/(?:png|jpeg|webp)$/i.test(selectedType)) throw new Error(`${file.name} must be PNG, JPEG or WebP.`);
  const bitmap = await bitmapFromFile(file);
  const width = "naturalWidth" in bitmap ? bitmap.naturalWidth : bitmap.width;
  const height = "naturalHeight" in bitmap ? bitmap.naturalHeight : bitmap.height;
  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser cannot prepare image assets.");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  if ("close" in bitmap) bitmap.close();
  const encoded = await canvasBlob(canvas);
  return { dataUrl: await dataUrl(encoded.blob), mimeType: encoded.mimeType };
}

export async function importSlideImages(
  files: File[],
  stageId: string,
  startNumber: number,
  onProgress?: (message: string) => void,
): Promise<ImportedSlides> {
  const ordered = [...files].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const assets: CourseAsset[] = [];
  const slides: Slide[] = [];
  for (const [index, file] of ordered.entries()) {
    const number = startNumber + index;
    onProgress?.(`Preparing slide ${index + 1} of ${ordered.length}…`);
    const image = await normaliseImage(file);
    const id = slideId(number);
    const title = titleFromFile(file.name);
    assets.push({ id, kind: "slide", fileName: `${id}.${image.mimeType === "image/webp" ? "webp" : "png"}`, mimeType: image.mimeType, dataUrl: image.dataUrl, alt: `Slide ${number}: ${title}` });
    slides.push({ n: number, stage: stageId, title, text: "", assetId: id });
  }
  return { assets, slides };
}

export async function importSlidePdf(
  file: File,
  stageId: string,
  startNumber: number,
  onProgress?: (message: string) => void,
): Promise<ImportedSlides> {
  if (file.size > MAX_SOURCE_BYTES) throw new Error(`${file.name} exceeds the 50 MB PDF limit.`);
  ensurePdfWorker();
  const pdfDocument = await getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  try {
    if (pdfDocument.numPages > MAX_PDF_PAGES) throw new Error(`The PDF has ${pdfDocument.numPages} pages; the limit is ${MAX_PDF_PAGES}.`);
    const assets: CourseAsset[] = [];
    const slides: Slide[] = [];
    for (let index = 0; index < pdfDocument.numPages; index += 1) {
      const number = startNumber + index;
      onProgress?.(`Rendering PDF page ${index + 1} of ${pdfDocument.numPages}…`);
      const page = await pdfDocument.getPage(index + 1);
      const base = page.getViewport({ scale: 1 });
      const scale = Math.min(1.8, MAX_IMAGE_EDGE / Math.max(base.width, base.height));
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(viewport.width));
      canvas.height = Math.max(1, Math.round(viewport.height));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("This browser cannot render PDF pages.");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: context, viewport }).promise;
      const textContent = await page.getTextContent();
      const words = textContent.items.flatMap((item: (typeof textContent.items)[number]) => ("str" in item ? [item.str.trim()] : [])).filter(Boolean);
      const text = words.join(" ").replace(/\s+/g, " ").trim();
      const title = words[0]?.slice(0, 140) || `Page ${index + 1}`;
      const encoded = await canvasBlob(canvas);
      const id = slideId(number);
      assets.push({ id, kind: "slide", fileName: `${id}.${encoded.mimeType === "image/webp" ? "webp" : "png"}`, mimeType: encoded.mimeType, dataUrl: await dataUrl(encoded.blob), alt: `Slide ${number}: ${title}` });
      slides.push({ n: number, stage: stageId, title, text, assetId: id });
      page.cleanup();
    }
    return { assets, slides };
  } finally {
    await pdfDocument.destroy();
  }
}

export async function importStageVisual(file: File, stageId: string): Promise<CourseAsset> {
  const image = await normaliseImage(file);
  const base = slugify(titleFromFile(file.name)) || "visual";
  const id = `stage-${slugify(stageId)}-${base}-${Date.now().toString(36)}`;
  return {
    id,
    kind: "image",
    fileName: `${id}.${image.mimeType === "image/webp" ? "webp" : "png"}`,
    mimeType: image.mimeType,
    dataUrl: image.dataUrl,
    alt: "",
    caption: "",
  };
}
