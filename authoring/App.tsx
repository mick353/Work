import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Archive,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Download,
  Eye,
  FileJson,
  FileText,
  FolderGit2,
  GraduationCap,
  Info,
  Layers3,
  Library,
  Plus,
  RotateCcw,
  Save,
  Settings2,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import type {
  Module,
  Question,
  Scenario,
  TrainingPackage,
} from "../src/package-model";
import {
  DRAFT_STORAGE_KEY,
  EMPTY_RELEASE_CHECKLIST,
  addStage,
  blankQuestion,
  createStarterPackage,
  makeDraft,
  packageForExport,
  readDraft,
  removeStage,
  renameStageId,
  renameSourceId,
  slugify,
  type LoadedDraft,
  type ReleaseChecklist,
} from "./draft";
import {
  exportDeveloperPackage,
  exportDraft,
  exportHostedCourse,
  exportLearnerHtml,
  learnerHtml,
  readJsonFile,
} from "./downloads";
import { evaluateCourse, issueCounts, type AuthoringIssue } from "./quality";
import { AdvancedEditor } from "./AdvancedEditor";
import { MediaEditor } from "./MediaEditor";
import { readBrowserDraft, writeBrowserDraft } from "./storage";

type View = "instructions" | "setup" | "stages" | "supports" | "advanced" | "media" | "review";
type IssueFilter = "all" | AuthoringIssue["severity"];

const NAV: Array<{ id: View; label: string; description: string; icon: typeof Settings2 }> = [
  { id: "instructions", label: "How it works", description: "Author, review and release safely", icon: Info },
  { id: "setup", label: "Course setup", description: "Identity, ownership and sources", icon: Settings2 },
  { id: "stages", label: "Teach", description: "Lessons, questions and assignments", icon: Layers3 },
  { id: "supports", label: "Reinforce", description: "Diagnostic, cards and reference aids", icon: GraduationCap },
  { id: "advanced", label: "Apply & reference", description: "Cases, capstone, tools and exemplars", icon: Library },
  { id: "media", label: "Media & source deck", description: "Stage images and cited slides", icon: FileText },
  { id: "review", label: "Review & export", description: "Checks and controlled outputs", icon: ShieldCheck },
];

function freshDraft(): LoadedDraft {
  return { package: createStarterPackage(), release: { ...EMPTY_RELEASE_CHECKLIST } };
}

function loadLocalDraft(): LoadedDraft {
  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return freshDraft();
    const draft = readDraft(JSON.parse(raw) as unknown);
    packageForExport(draft.package);
    return draft;
  } catch {
    return freshDraft();
  }
}

function wordCount(value: string | undefined): number {
  return (value ?? "").trim().split(/\s+/).filter(Boolean).length;
}

function nextNumericId(prefix: string, used: Iterable<string>): string {
  const existing = new Set(used);
  let number = 1;
  while (existing.has(`${prefix}-${number}`)) number += 1;
  return `${prefix}-${number}`;
}

function parseNumberRanges(value: string): number[] {
  const numbers = new Set<number>();
  for (const token of value.split(/[,;\s]+/).filter(Boolean)) {
    const range = token.match(/^(\d+)[-–](\d+)$/);
    if (range) {
      const first = Number(range[1]);
      const last = Number(range[2]);
      if (last >= first && last - first <= 200) for (let number = first; number <= last; number += 1) numbers.add(number);
    } else if (/^\d+$/.test(token)) numbers.add(Number(token));
  }
  return [...numbers].filter((number) => number > 0).sort((a, b) => a - b);
}

function formatNumberRanges(numbers: number[] | undefined): string {
  return (numbers ?? []).join(", ");
}

function InputField({
  id,
  label,
  value,
  onChange,
  hint,
  type = "text",
  required,
}: {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="field">
      <span>{label}{required && <em aria-hidden="true"> *</em>}</span>
      <input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  hint,
  rows = 4,
  minimum,
}: {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
  minimum?: number;
}) {
  const count = wordCount(value);
  return (
    <label className="field field-wide">
      <span>{label}</span>
      <textarea id={id} rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
      <small className={minimum && count < minimum ? "under" : undefined}>
        {hint}{hint && " · "}{count} words{minimum ? ` / ${minimum} minimum` : ""}
      </small>
    </label>
  );
}

function Card({ children, title, eyebrow, actions }: { children: React.ReactNode; title?: string; eyebrow?: string; actions?: React.ReactNode }) {
  return (
    <section className="editor-card">
      {(title || eyebrow || actions) && (
        <header className="card-header">
          <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}{title && <h2>{title}</h2>}</div>
          {actions && <div className="card-actions">{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
}

function EmptyButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return <button type="button" className="secondary" onClick={onClick}><Plus size={17} aria-hidden="true" />{children}</button>;
}

function GuidancePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="authoring-guidance">
      <summary><CircleHelp size={17} aria-hidden="true" /><span>{title}</span></summary>
      <div>{children}</div>
    </details>
  );
}

function StepConnection({ title = "How this step connects", children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="step-connection" aria-label={title}>
      <Info size={20} aria-hidden="true" />
      <div><strong>{title}</strong><p>{children}</p></div>
    </section>
  );
}

function IssueGroup({ label, countLabel, initiallyOpen, children }: { label: string; countLabel: string; initiallyOpen: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <details className="issue-group" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary><span>{label}</span><small>{countLabel}</small></summary>
      <div>{children}</div>
    </details>
  );
}

function QuestionEditor({
  question,
  label,
  onChange,
  onRemove,
  scenario,
}: {
  question: Question | Scenario;
  label: string;
  onChange: (question: Question | Scenario) => void;
  onRemove?: () => void;
  scenario?: boolean;
}) {
  const updateOption = (index: number, value: string) => {
    const options = [...question.options];
    options[index] = value;
    onChange({ ...question, options });
  };
  const updateNote = (index: number, value: string) => {
    const notes = [...(question.optionNotes ?? ["", "", "", ""] )];
    notes[index] = value;
    onChange({ ...question, optionNotes: notes });
  };
  const setAnswer = (index: number) => {
    const notes = [...(question.optionNotes ?? ["", "", "", ""] )];
    notes[index] = "";
    onChange({ ...question, answer: index, optionNotes: notes });
  };
  return (
    <details className="question-editor" id={`question-${question.id}`}>
      <summary>
        <span>{label}</span>
        <strong>{question.prompt.trim() || "Not written yet"}</strong>
      </summary>
      <div className="question-body">
        <GuidancePanel title={scenario ? "Show a strong scenario example" : "Show a strong question example"}>
          {scenario ? (
            <><p><strong>Situation:</strong> Give the learner a role, relevant evidence and a genuine constraint. Ask for the best next decision—not a definition hidden inside a story.</p><p><strong>Options:</strong> Use one defensible answer and three choices a competent but mistaken person might make. Keep them similar in length and specificity.</p></>
          ) : (
            <><p><strong>Useful pattern:</strong> “Which action best demonstrates [the capability] in this situation?”</p><p><strong>Avoid:</strong> trivia, “all of the above”, obviously comic distractors, or making the correct answer much longer than every alternative.</p></>
          )}
        </GuidancePanel>
        {scenario && (
          <TextAreaField
            id={`question-${question.id}-context`}
            label="Situation and constraints"
            value={(question as Scenario).context}
            onChange={(context) => onChange({ ...question, context } as Scenario)}
            rows={3}
            hint="Enough context for a real decision, without hiding the answer"
          />
        )}
        <TextAreaField id={`question-${question.id}-prompt`} label="Question" value={question.prompt} onChange={(prompt) => onChange({ ...question, prompt })} rows={2} />
        <fieldset className="option-set">
          <legend>Options and feedback</legend>
          {question.options.map((option, index) => (
            <div className={`option-row ${question.answer === index ? "keyed" : ""}`} key={index}>
              <label className="answer-key">
                <input type="radio" name={`${question.id}-answer`} checked={question.answer === index} onChange={() => setAnswer(index)} />
                <span>{question.answer === index ? "Correct" : `Option ${index + 1}`}</span>
              </label>
              <input id={`question-${question.id}-option-${index}`} aria-label={`${label} option ${index + 1}`} value={option} onChange={(event) => updateOption(index, event.target.value)} />
              <input
                id={`question-${question.id}-feedback-${index}`}
                aria-label={`${label} feedback for option ${index + 1}`}
                value={(question.optionNotes ?? [])[index] ?? ""}
                disabled={question.answer === index}
                placeholder={question.answer === index ? "Correct option — leave blank" : "Why this option is wrong"}
                onChange={(event) => updateNote(index, event.target.value)}
              />
            </div>
          ))}
        </fieldset>
        <TextAreaField id={`question-${question.id}-rationale`} label="Answer rationale" value={question.rationale} onChange={(rationale) => onChange({ ...question, rationale })} rows={3} />
        {onRemove && <button type="button" className="text-danger" onClick={onRemove}><Trash2 size={16} aria-hidden="true" /> Remove this item</button>}
      </div>
    </details>
  );
}

function StageTabs({ entry, active, setActive }: { entry: TrainingPackage; active: string; setActive: (id: string) => void }) {
  return (
    <div className="stage-tabs" role="tablist" aria-label="Course stages">
      {entry.content.modules.map((stage) => (
        <button type="button" role="tab" aria-selected={active === stage.id} className={active === stage.id ? "active" : ""} key={stage.id} onClick={() => setActive(stage.id)}>
          <span>{stage.number}</span>{stage.title || `Stage ${stage.number}`}
        </button>
      ))}
    </div>
  );
}

export function App() {
  const [initialDraft] = useState<LoadedDraft>(loadLocalDraft);
  const [entry, setEntry] = useState<TrainingPackage>(initialDraft.package);
  const [release, setRelease] = useState<ReleaseChecklist>(initialDraft.release);
  const [view, setView] = useState<View>("instructions");
  const [activeStage, setActiveStage] = useState(entry.content.modules[0]?.id ?? "");
  const [saveLabel, setSaveLabel] = useState("Saved locally");
  const [message, setMessage] = useState("");
  const [browserReady, setBrowserReady] = useState(false);
  const [issueFilter, setIssueFilter] = useState<IssueFilter>("all");
  const [cloneProgress, setCloneProgress] = useState("");
  const [focusAnnouncement, setFocusAnnouncement] = useState("");
  const [focusRequest, setFocusRequest] = useState(0);
  const importRef = useRef<HTMLInputElement>(null);
  const pendingIssueRef = useRef<AuthoringIssue | null>(null);

  const issues = useMemo(() => evaluateCourse(entry), [entry]);
  const counts = useMemo(() => issueCounts(issues), [issues]);
  const currentStage = entry.content.modules.find((stage) => stage.id === activeStage) ?? entry.content.modules[0];
  const hasDurationEvidence = entry.content.modules.some((stage) => stage.sections.some((section) => wordCount(section.body) > 0));
  const contentReady = counts.errors === 0;
  const releaseChecksComplete =
    release.subjectMatterChecked &&
    release.learningFlowChecked &&
    release.handlingChecked &&
    release.releaseApproved &&
    Boolean(release.approvalReference.trim()) &&
    /^\d{4}-\d{2}-\d{2}$/.test(release.approvalDate.trim());
  const releaseReady = contentReady && entry.manifest.status === "available" && releaseChecksComplete;

  useEffect(() => {
    let cancelled = false;
    void readBrowserDraft()
      .then((stored) => {
        if (cancelled || !stored) return;
        const draft = readDraft(stored);
        packageForExport(draft.package);
        setEntry(draft.package);
        setRelease(draft.release);
        setActiveStage(draft.package.content.modules[0]?.id ?? "");
      })
      .catch(() => undefined)
      .finally(() => { if (!cancelled) setBrowserReady(true); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!browserReady) return;
    setSaveLabel("Saving…");
    const timer = window.setTimeout(() => {
      const draft = makeDraft(entry, release);
      void writeBrowserDraft(draft).then(() => {
        const compact = JSON.stringify(draft);
        try {
          if (compact.length < 1_500_000) window.localStorage.setItem(DRAFT_STORAGE_KEY, compact);
          else window.localStorage.removeItem(DRAFT_STORAGE_KEY);
        } catch { /* IndexedDB remains the asset-capable primary store. */ }
        setSaveLabel("Saved in this browser");
      }).catch(() => setSaveLabel("Browser storage unavailable — download a draft"));
    }, (entry.content.assets?.length ?? 0) > 30 ? 900 : 250);
    return () => window.clearTimeout(timer);
  }, [browserReady, entry, release]);

  useEffect(() => {
    if (!entry.content.modules.some((stage) => stage.id === activeStage)) {
      setActiveStage(entry.content.modules[0]?.id ?? "");
    }
  }, [activeStage, entry.content.modules]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const pendingIssue = pendingIssueRef.current;
      let target: HTMLElement | null = null;
      if (pendingIssue && pendingIssue.area === view) {
        target = pendingIssue.targetId ? document.getElementById(pendingIssue.targetId) : null;
        if (target) {
          for (let parent = target.closest("details"); parent; parent = parent.parentElement?.closest("details") ?? null) {
            parent.open = true;
          }
        }
      }
      if (!target) {
        target = document.querySelector<HTMLElement>("#studio-main .page-heading h1, #studio-main .instruction-hero h1, #studio-main .empty-panel h1");
      }
      if (target) {
        if (!target.matches("input, textarea, select, button, summary, [tabindex]")) target.tabIndex = -1;
        if (pendingIssue) {
          target.scrollIntoView({ block: "center" });
          target.focus({ preventScroll: true });
        } else {
          target.focus({ preventScroll: true });
          window.scrollTo({ top: 0 });
          window.requestAnimationFrame(() => window.scrollTo({ top: 0 }));
        }
      } else {
        window.scrollTo({ top: 0 });
      }
      if (pendingIssue) {
        setFocusAnnouncement(`Moved to ${pendingIssue.title}. ${pendingIssue.detail}`);
        pendingIssueRef.current = null;
      } else {
        const label = NAV.find((item) => item.id === view)?.label ?? "Course Workshop";
        setFocusAnnouncement(`${label} step opened.`);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [activeStage, focusRequest, view]);

  const updateManifest = <K extends keyof TrainingPackage["manifest"]>(key: K, value: TrainingPackage["manifest"][K]) => {
    setEntry((current) => ({ ...current, manifest: { ...current.manifest, [key]: value } }));
  };
  const updateContent = <K extends keyof TrainingPackage["content"]>(key: K, value: TrainingPackage["content"][K]) => {
    setEntry((current) => ({ ...current, content: { ...current.content, [key]: value } }));
  };
  const updateStage = (stageId: string, next: (stage: Module) => Module) => {
    setEntry((current) => ({
      ...current,
      content: { ...current.content, modules: current.content.modules.map((stage) => stage.id === stageId ? next(stage) : stage) },
    }));
  };
  const updateStageQuestion = (stageId: string, key: "questions" | "scenarios", index: number, question: Question | Scenario) => {
    updateStage(stageId, (stage) => {
      const items = [...stage[key]] as Array<Question | Scenario>;
      items[index] = question;
      return { ...stage, [key]: items } as Module;
    });
  };

  const navigateTo = (nextView: View) => {
    pendingIssueRef.current = null;
    setView(nextView);
    setFocusRequest((current) => current + 1);
  };

  const navigateIssue = (issue: AuthoringIssue) => {
    pendingIssueRef.current = issue;
    setView(issue.area);
    if (issue.stageId) setActiveStage(issue.stageId);
    setFocusRequest((current) => current + 1);
  };

  const addCourseStage = () => {
    const next = addStage(entry);
    const stage = next.content.modules.at(-1);
    setEntry(next);
    if (stage) setActiveStage(stage.id);
    setView("stages");
  };

  const deleteStage = (stage: Module) => {
    if (entry.content.modules.length === 1) {
      setMessage("A course must retain at least one stage.");
      return;
    }
    if (!window.confirm(`Remove Stage ${stage.number}, “${stage.title || stage.id}”, and its linked support content?`)) return;
    setEntry((current) => removeStage(current, stage.id));
  };

  const changeStageId = (oldId: string, value: string) => {
    const nextId = slugify(value);
    setEntry((current) => renameStageId(current, oldId, nextId));
    if (nextId) setActiveStage(nextId);
  };

  const handleImport = async (file: File | undefined) => {
    if (!file) return;
    try {
      const imported = readDraft(await readJsonFile(file));
      packageForExport(imported.package);
      setEntry(imported.package);
      setRelease(imported.release);
      setActiveStage(imported.package.content.modules[0]?.id ?? "");
      setView("instructions");
      setMessage(`Loaded ${file.name}. Review the checks before exporting.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      if (importRef.current) importRef.current.value = "";
    }
  };

  const startAgain = () => {
    if (!window.confirm("Start a new blank course? Download a draft first if you may need this work again.")) return;
    const fresh = createStarterPackage();
    setEntry(fresh);
    setRelease({ ...EMPTY_RELEASE_CHECKLIST });
    setActiveStage(fresh.content.modules[0].id);
    setView("instructions");
    setMessage("Started a new local draft.");
  };

  const cloneTemplate = async (template: TrainingPackage) => {
    if (!window.confirm(`Start a new editable course from “${template.manifest.title}”? Your current draft will be replaced, so download it first if needed.`)) return;
    const startedAt = performance.now();
    setCloneProgress(`Preparing ${template.manifest.title}…`);
    await new Promise<void>((resolve) => window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve())));
    setCloneProgress(`Copying ${template.content.modules.length} stages and ${template.content.slides.length} source slides…`);
    await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
    const clone = structuredClone(template);
    clone.manifest = {
      ...clone.manifest,
      id: `${template.manifest.id}-adapted`,
      title: `Adapted ${template.manifest.title}`,
      version: "0.1.0",
      status: "draft",
      reviewed: "",
    };
    clone.content.contentReviewed = "";
    clone.content.sources = clone.content.sources.map((source) => ({ ...source, checked: "" }));
    setEntry(clone);
    setRelease({ ...EMPTY_RELEASE_CHECKLIST });
    setActiveStage(clone.content.modules[0]?.id ?? "");
    setView("setup");
    setMessage(`Created a separate draft from ${template.manifest.title}. The published original was not changed. Give this adaptation its own stable id and complete a fresh review.`);
    const minimumProgressTime = template.content.slides.length > 20 ? 400 : 120;
    const remaining = minimumProgressTime - (performance.now() - startedAt);
    if (remaining > 0) await new Promise<void>((resolve) => window.setTimeout(resolve, remaining));
    setCloneProgress("");
  };

  const preview = () => {
    if (!contentReady) return;
    const url = URL.createObjectURL(new Blob([learnerHtml(entry)], { type: "text/html" }));
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };

  const renderInstructions = () => (
    <div className="workspace-stack instructions-page">
      <div className="instruction-hero">
        <div>
          <span className="eyebrow">Start here · Course Workshop {__STUDIO_VERSION__}</span>
          <h1>Build the course here. Release it deliberately.</h1>
          <p>
            Course Workshop turns trainer-authored material into the same package used by Product Practice. It works
            locally, keeps drafts in this browser and separates writing from release so an unfinished course cannot
            alter the learner site.
          </p>
          <button type="button" className="primary" onClick={() => navigateTo("setup")}>Begin course setup <ChevronRight size={17} /></button>
        </div>
        <div className="instruction-principle">
          <ShieldCheck size={28} />
          <strong>Your draft is not uploaded</strong>
          <p>Autosave uses this browser only. Download the JSON draft when moving machines or handing work to another trainer.</p>
        </div>
      </div>

      <Card title="The complete workflow" eyebrow="Seven controlled steps">
        <ol className="workflow-list">
          <li><span>1</span><div><strong>Set up the course</strong><p>Name the owner, version and governing sources. Keep the status as Draft while the shape is changing.</p></div></li>
          <li><span>2</span><div><strong>Teach the subject</strong><p>Write stages in learner order, then add knowledge checks, applied scenarios and a worked assignment.</p></div></li>
          <li><span>3</span><div><strong>Reinforce it</strong><p>Add an independent diagnostic, review cards, glossary terms and observable practice contrasts.</p></div></li>
          <li><span>4</span><div><strong>Connect it to practice</strong><p>Add the cases, toolkit, capstone, field guide, source differences and exemplars the subject needs.</p></div></li>
          <li><span>5</span><div><strong>Add useful media</strong><p>Import a source deck and stage visuals. Describe every image and connect precise citations to relevant slides.</p></div></li>
          <li><span>6</span><div><strong>Review the whole course</strong><p>Clear the automated checks, preview the real learner player and complete the human release checklist.</p></div></li>
          <li><span>7</span><div><strong>Choose the delivery route</strong><p>Share one offline HTML course, host it at its own URL, or install its package into the combined catalogue.</p></div></li>
        </ol>
      </Card>

      <Card title="Plan the course before filling the form" eyebrow="Five-part course blueprint">
        <p className="section-intro">A short blueprint prevents a collection of content from masquerading as a course. Agree these five decisions before writing detailed stages.</p>
        <ol className="blueprint-list">
          <li><strong>Audience</strong><span>Who will use the capability, and what can they already do?</span></li>
          <li><strong>Final performance</strong><span>What must the learner be able to decide, produce or demonstrate?</span></li>
          <li><strong>Evidence base</strong><span>Which governing documents, standards or subject-matter sources support the teaching?</span></li>
          <li><strong>Learning sequence</strong><span>What three to nine stages move the learner from starting point to final performance?</span></li>
          <li><strong>Assessment approach</strong><span>What questions, scenarios and produced work will show that the capability transfers to practice?</span></li>
        </ol>
      </Card>

      <Card title="How information travels through the Workshop" eyebrow="Connect once, reuse safely">
        <div className="connection-map">
          <div><strong>Sources</strong><span>Register each source once in Course setup. Reuse it in lesson citations, field-guide entries, source-deck slides and stage visuals.</span></div>
          <div><strong>Stages</strong><span>Each stable stage id connects its lesson, questions, diagnostic, review cards, glossary, practice contrast, cases and media.</span></div>
          <div><strong>Review</strong><span>Checks read the complete connected course. Selecting an issue returns to the relevant step, stage and field.</span></div>
          <div><strong>Outputs</strong><span>Preview, learner HTML and ZIP outputs are generated from the same draft. You do not re-enter content for each delivery route.</span></div>
        </div>
      </Card>

      <Card title="Start from an existing published course" eyebrow="Safe editable copies">
        <p className="section-intro">Cloning copies the complete maintained course—including cases, toolkit, capstone, reference content, exemplars and any source deck—into a new local draft. It resets the version, status and approvals. The published course remains untouched.</p>
        <div className="template-grid">{__COURSE_TEMPLATES__.map((template) => <article key={template.manifest.id}><span className="pill">Published template</span><h3>{template.manifest.title}</h3><p>{template.manifest.summary}</p><dl><div><dt>Stages</dt><dd>{template.content.modules.length}</dd></div><div><dt>Deck</dt><dd>{template.content.slides.length ? `${template.content.slides.length} slides` : "None"}</dd></div><div><dt>Version</dt><dd>{template.manifest.version}</dd></div></dl><button type="button" className="secondary" onClick={() => cloneTemplate(template)}><Library size={17} />Clone as new course</button></article>)}</div>
      </Card>

      <div className="instruction-grid">
        <Card title="What the statuses mean" eyebrow="Status never publishes by itself">
          <dl className="status-guide">
            <div><dt>Draft</dt><dd>The structure and wording are still changing. Save and preview only.</dd></div>
            <div><dt>In development</dt><dd>The course is complete enough for structured review and testing.</dd></div>
            <div><dt>Available</dt><dd>The release status. Final outputs unlock only after content checks and the release checklist also pass.</dd></div>
            <div><dt>Retired</dt><dd>Kept for record or migration, but not intended for new learners.</dd></div>
          </dl>
        </Card>
        <Card title="What each output is for" eyebrow="One course, three delivery choices">
          <dl className="output-guide">
            <div><dt>Training HTML</dt><dd>One offline learner file. Email it, copy it to a drive or open it from a shared folder.</dd></div>
            <div><dt>Hosted-course ZIP</dt><dd>An <code>index.html</code> folder ready for its own web address under <code>training/&lt;course-id&gt;/</code>.</dd></div>
            <div><dt>Repository package</dt><dd>Course data, hosted page, validation/release record and exact files for installing into the combined catalogue.</dd></div>
            <div><dt>Draft JSON</dt><dd>The editable source for Course Workshop. It is not a learner course.</dd></div>
          </dl>
        </Card>
      </div>

      <Card title="Using a copied repository offline" eyebrow="No GitHub access required for authoring">
        <div className="offline-flow">
          <FolderGit2 size={25} />
          <div>
            <p>Open <code>Course-Authoring-Studio.html</code> from the copied repository. Author and export in the browser. A release custodian with Node.js can then inspect or install the exported package:</p>
            <pre><code>{`npm install
npm run course:inspect -- path/to/course-package.zip
npm run course:install -- path/to/course-package.zip
# or host it at its own URL without adding it to the catalogue
npm run course:host -- path/to/course-package.zip
npm run verify`}</code></pre>
            <p>GitHub is only needed when the approved repository changes are deliberately pushed for online publication.</p>
          </div>
        </div>
      </Card>

      <section className="release-boundary">
        <AlertTriangle size={22} />
        <div><strong>Public-site warning</strong><p>The published Course Workshop contains no course draft. Anything installed into the public learner catalogue or hosted under its Pages URL becomes publicly downloadable, including the course text embedded in its HTML.</p></div>
      </section>
    </div>
  );

  const renderSetup = () => (
    <div className="workspace-stack">
      <div className="page-heading">
        <span className="eyebrow">2 · Course setup</span>
        <h1>Name the course and anchor it to its source</h1>
        <p>The source fields are part of the teaching design, not filing. They distinguish governing material from the explanation the course adds.</p>
      </div>
      <StepConnection>Course identity controls filenames, storage and learner headings. Source ids become the links used later in lesson attributions, field-guide references and imported media. Keep both kinds of id stable after release.</StepConnection>
      <Card title="Course identity" eyebrow="What learners will see">
        <div className="form-grid">
          <InputField id="manifest-title" label="Course title" required value={entry.manifest.title} onChange={(value) => {
            const wasDefault = entry.manifest.id === "new-course";
            setEntry((current) => ({
              ...current,
              manifest: { ...current.manifest, title: value, id: wasDefault ? (slugify(value) || "new-course") : current.manifest.id },
            }));
          }} />
          <InputField id="manifest-id" label="Stable course id" required value={entry.manifest.id} onChange={(value) => updateManifest("id", slugify(value))} hint="Lowercase words and hyphens. Do not change after release." />
          <InputField id="manifest-subtitle" label="Subtitle" required value={entry.manifest.subtitle} onChange={(value) => updateManifest("subtitle", value)} />
          <InputField id="manifest-publisher" label="Publisher / owning team" required value={entry.manifest.publisher} onChange={(value) => updateManifest("publisher", value)} />
          <InputField id="manifest-version" label="Content version" required value={entry.manifest.version} onChange={(value) => updateManifest("version", value)} hint="Semantic version, such as 0.1.0 or 1.0.0" />
          <label className="field"><span>Status</span><select value={entry.manifest.status} onChange={(event) => updateManifest("status", event.target.value as TrainingPackage["manifest"]["status"])}><option value="draft">Draft — still being written</option><option value="in-development">In development — under review</option><option value="available">Available — approved for learners</option><option value="retired">Retired — no new delivery</option></select><small>Status is metadata. Final outputs also require all checks and release confirmations.</small></label>
          <InputField id="manifest-reviewed" label="Content reviewed" required value={entry.manifest.reviewed} onChange={(value) => updateManifest("reviewed", value)} hint="Leave blank until a person has actually completed the content review. Then use an unambiguous date, for example 21 August 2026." />
          <InputField label="Source author (optional)" value={entry.manifest.sourceAuthor ?? ""} onChange={(value) => updateManifest("sourceAuthor", value || undefined)} />
        </div>
        <TextAreaField id="manifest-source" label="Governing source description" value={entry.manifest.source} onChange={(value) => updateManifest("source", value)} hint="Name the departmental material, standard or evidence base the course is built from" />
        <TextAreaField id="manifest-summary" label="Course summary" value={entry.manifest.summary} onChange={(value) => updateManifest("summary", value)} rows={3} hint="What capability this course builds and why it matters" />
        <InputField id="manifest-arc" label="Learning arc" value={entry.manifest.arc} onChange={(value) => updateManifest("arc", value)} hint="For example: From uncertain evidence to an approved handover" />
      </Card>
      <div id="source-register"><Card title="Source register" eyebrow="Evidence and authority" actions={<EmptyButton onClick={() => updateContent("sources", [...entry.content.sources, { id: nextNumericId("source", entry.content.sources.map((item) => item.id)), title: "", publisher: "", note: "", checked: "" }])}>Add source</EmptyButton>}>
        <GuidancePanel title="What counts as a checked source?">
          <p>Record the checked date only after someone has opened the named source, confirmed the relevant version and checked that the course uses it accurately. Adding a source to this form is not itself verification.</p>
        </GuidancePanel>
        <div className="source-list">
          {entry.content.sources.map((sourceItem, index) => {
            const lessonUses = entry.content.modules.reduce((total, stage) => total + stage.sections.filter((section) => section.sourceIds?.includes(sourceItem.id)).length, 0);
            const guideUses = entry.content.fieldGuide.filter((guide) => guide.sourceIds.includes(sourceItem.id)).length;
            const mediaUses = (entry.content.assets ?? []).filter((asset) => asset.sourceId === sourceItem.id).length;
            const detailsComplete = Boolean(sourceItem.id.trim() && sourceItem.title.trim() && sourceItem.publisher.trim() && sourceItem.note.trim());
            return <div className="source-editor" key={`${sourceItem.id}-${index}`}>
              <div className="source-number">{index + 1}</div>
              <div className="linkage-summary" aria-label={`Source ${index + 1} connection summary`}>
                <span className={detailsComplete ? sourceItem.checked?.trim() ? "linked" : "pending" : "incomplete"}>{detailsComplete ? sourceItem.checked?.trim() ? `Checked ${sourceItem.checked}` : "Details complete · check pending" : "Source details incomplete"}</span>
                <span>{lessonUses} lesson section{lessonUses === 1 ? "" : "s"}</span>
                <span>{guideUses} guide entr{guideUses === 1 ? "y" : "ies"}</span>
                <span>{mediaUses} media item{mediaUses === 1 ? "" : "s"}</span>
              </div>
              <div className="form-grid">
                <InputField id={`source-${index}-id`} label="Source id" value={sourceItem.id} hint="The stable link used by lessons, the field guide and media. Do not rename after release." onChange={(value) => {
                  setEntry((current) => renameSourceId(current, sourceItem.id, value));
                }} />
                <InputField id={`source-${index}-title`} label="Title" value={sourceItem.title} hint="The source name learners will see in attribution chips." onChange={(value) => {
                  const sources = [...entry.content.sources]; sources[index] = { ...sourceItem, title: value }; updateContent("sources", sources);
                }} />
                <InputField id={`source-${index}-publisher`} label="Publisher" value={sourceItem.publisher} hint="The organisation or authority responsible for the source." onChange={(value) => {
                  const sources = [...entry.content.sources]; sources[index] = { ...sourceItem, publisher: value }; updateContent("sources", sources);
                }} />
                <InputField id={`source-${index}-checked`} label="Checked" value={sourceItem.checked ?? ""} hint="Enter only after opening the source and confirming the version and course use." onChange={(value) => {
                  const sources = [...entry.content.sources]; sources[index] = { ...sourceItem, checked: value }; updateContent("sources", sources);
                }} />
                <InputField label="URL (optional)" type="url" value={sourceItem.url ?? ""} onChange={(value) => {
                  const sources = [...entry.content.sources]; sources[index] = { ...sourceItem, url: value || undefined }; updateContent("sources", sources);
                }} />
              </div>
              <TextAreaField id={`source-${index}-note`} label="How this source is used" hint="State whether it governs the course, supports a claim, supplies a worked example or provides comparison practice." value={sourceItem.note} onChange={(value) => {
                const sources = [...entry.content.sources]; sources[index] = { ...sourceItem, note: value }; updateContent("sources", sources);
              }} rows={3} />
              {entry.content.sources.length > 1 && <button type="button" className="text-danger" onClick={() => updateContent("sources", entry.content.sources.filter((_, sourceIndex) => sourceIndex !== index))}><Trash2 size={16} aria-hidden="true" /> Remove source</button>}
            </div>;
          })}
        </div>
      </Card></div>
    </div>
  );

  const renderStages = () => {
    if (!currentStage) return <div className="empty-panel"><h1>No stage</h1><EmptyButton onClick={addCourseStage}>Add the first stage</EmptyButton></div>;
    const stage = currentStage;
    const linkedDiagnostics = entry.content.diagnosticQuestions.filter((item) => item.moduleId === stage.id).length;
    const linkedCards = entry.content.flashcards.filter((item) => item.moduleId === stage.id).length;
    const linkedGlossary = entry.content.glossary.filter((item) => item.moduleId === stage.id).length;
    const linkedContrasts = entry.content.contrasts.filter((item) => item.moduleId === stage.id).length;
    const linkedCaseSteps = entry.content.caseStudies.reduce((total, study) => total + study.steps.filter((step) => step.moduleId === stage.id).length, 0);
    const linkedSlides = entry.content.slides.filter((slide) => slide.stage === stage.id).length;
    return (
      <div className="workspace-stack">
        <div className="page-heading with-action">
          <div><span className="eyebrow">3 · Teach</span><h1>Build the learning sequence</h1><p>Explain the idea before testing it. A stage combines lesson sections, recall, applied decisions and a writing task.</p></div>
          <EmptyButton onClick={addCourseStage}>Add stage</EmptyButton>
        </div>
        <StepConnection>The active stage is the shared anchor for Teach, Reinforce, case steps and media. Changing its stable id updates those links together; changing its learner-facing title does not break them.</StepConnection>
        <StageTabs entry={entry} active={stage.id} setActive={setActiveStage} />
        <div className="stage-linkage-summary" aria-label={`Connections for Stage ${stage.number}`}>
          <strong>Connected to this stage</strong>
          <span>{linkedDiagnostics} diagnostic{linkedDiagnostics === 1 ? "" : "s"}</span>
          <span>{linkedCards} review card{linkedCards === 1 ? "" : "s"}</span>
          <span>{linkedGlossary} glossary entr{linkedGlossary === 1 ? "y" : "ies"}</span>
          <span>{linkedContrasts} contrast{linkedContrasts === 1 ? "" : "s"}</span>
          <span>{linkedCaseSteps} case step{linkedCaseSteps === 1 ? "" : "s"}</span>
          <span>{linkedSlides} source slide{linkedSlides === 1 ? "" : "s"}</span>
          <span>{stage.visualAssetId ? "Custom stage visual" : "Default stage illustration"}</span>
        </div>
        <Card title={`Stage ${stage.number}: ${stage.title || "Untitled"}`} eyebrow="Identity and outcome" actions={<button type="button" className="icon-danger" title="Remove stage" aria-label={`Remove Stage ${stage.number}`} onClick={() => deleteStage(stage)}><Trash2 size={18} /></button>}>
          <GuidancePanel title="Show a well-shaped stage">
            <p><strong>Outcome:</strong> “Assess whether the evidence supports closing the project and identify the next accountable action.”</p>
            <p><strong>Core idea:</strong> One memorable explanation—not a list of topics. Each lesson section should establish, demonstrate or apply that idea.</p>
          </GuidancePanel>
          <div className="form-grid">
            <InputField id={`stage-${stage.id}-id`} label="Stable stage id" value={stage.id} onChange={(value) => changeStageId(stage.id, value)} hint="Used by questions, progress and support content" />
            <InputField id={`stage-${stage.id}-title`} label="Title" value={stage.title} onChange={(value) => updateStage(stage.id, (item) => ({ ...item, title: value }))} />
            <InputField id={`stage-${stage.id}-subtitle`} label="Subtitle" value={stage.subtitle} onChange={(value) => updateStage(stage.id, (item) => ({ ...item, subtitle: value }))} />
            <InputField label="Source slide range (optional)" value={stage.slides} onChange={(value) => updateStage(stage.id, (item) => ({ ...item, slides: value }))} hint="Leave blank unless slide images will travel with the course" />
          </div>
          <TextAreaField id={`stage-${stage.id}-outcome`} label="Learning outcome" value={stage.outcome} onChange={(value) => updateStage(stage.id, (item) => ({ ...item, outcome: value }))} rows={2} hint="Start with an observable verb: assess, distinguish, decide, produce…" />
          <TextAreaField id={`stage-${stage.id}-core-idea`} label="The idea to keep" value={stage.coreIdea} onChange={(value) => updateStage(stage.id, (item) => ({ ...item, coreIdea: value }))} rows={3} hint="The one explanation worth remembering after the detail fades" />
        </Card>
        <div id={`stage-${stage.id}-sections`}><Card title="Lesson sections" eyebrow={`${stage.sections.reduce((sum, section) => sum + wordCount(section.body), 0)} of 300 minimum body words`} actions={<EmptyButton onClick={() => updateStage(stage.id, (item) => ({ ...item, sections: [...item.sections, { heading: "", body: "", sourceIds: [] }] }))}>Add section</EmptyButton>}>
          <GuidancePanel title="Show a useful lesson-section pattern">
            <p>Start with the decision or problem, explain the principle in plain language, then demonstrate it with a realistic example. Cite the source supporting the claim—not merely a source related to the general topic.</p>
          </GuidancePanel>
          <div className="lesson-list">
            {stage.sections.map((section, index) => (
              <section className="lesson-editor" key={index}>
                <header><strong>{index + 1}</strong><h3>{section.heading || "Untitled lesson section"}</h3>{stage.sections.length > 2 && <button type="button" className="icon-danger" aria-label={`Remove lesson section ${index + 1}`} onClick={() => updateStage(stage.id, (item) => ({ ...item, sections: item.sections.filter((_, sectionIndex) => sectionIndex !== index) }))}><Trash2 size={17} /></button>}</header>
                <InputField id={`stage-${stage.id}-section-${index}-heading`} label="Heading" value={section.heading} onChange={(value) => updateStage(stage.id, (item) => {
                  const sections = [...item.sections]; sections[index] = { ...section, heading: value }; return { ...item, sections };
                })} />
                <TextAreaField id={`stage-${stage.id}-section-${index}-body`} label="Explanation" value={section.body} onChange={(value) => updateStage(stage.id, (item) => {
                  const sections = [...item.sections]; sections[index] = { ...section, body: value }; return { ...item, sections };
                })} rows={8} />
                <TextAreaField label="Worked example (optional)" value={section.example ?? ""} onChange={(value) => updateStage(stage.id, (item) => {
                  const sections = [...item.sections]; sections[index] = { ...section, example: value || undefined }; return { ...item, sections };
                })} rows={3} />
                <fieldset id={`stage-${stage.id}-section-${index}-source`} className="source-picker"><legend>Sources for this section</legend><p>Selecting a source displays its attribution in the lesson. Add a locator when the claim comes from a particular page, section or imported slide.</p>{entry.content.sources.map((sourceItem) => {
                  const selected = (section.sourceIds ?? []).includes(sourceItem.id);
                  const reference = section.sourceReferences?.find((item) => item.sourceId === sourceItem.id);
                  return <div className="source-reference-editor" key={sourceItem.id}><label><input type="checkbox" checked={selected} onChange={(event) => updateStage(stage.id, (item) => {
                    const sections = [...item.sections];
                    const currentSection = sections[index];
                    const currentIds = currentSection.sourceIds ?? [];
                    const sourceIds = event.target.checked ? [...currentIds, sourceItem.id] : currentIds.filter((id) => id !== sourceItem.id);
                    const sourceReferences = event.target.checked ? currentSection.sourceReferences : (currentSection.sourceReferences ?? []).filter((item) => item.sourceId !== sourceItem.id);
                    sections[index] = { ...currentSection, sourceIds, sourceReferences };
                    return { ...item, sections };
                  })} /><span>{sourceItem.title || `${sourceItem.id} — incomplete`}</span></label>{selected && <div className="form-grid"><InputField label="Page, section or locator" value={reference?.locator ?? ""} onChange={(value) => updateStage(stage.id, (item) => {
                    const sections = [...item.sections];
                    const currentSection = sections[index];
                    const references = (currentSection.sourceReferences ?? []).filter((item) => item.sourceId !== sourceItem.id);
                    references.push({ sourceId: sourceItem.id, locator: value || undefined, slideNumbers: reference?.slideNumbers });
                    sections[index] = { ...currentSection, sourceReferences: references };
                    return { ...item, sections };
                  })} /><InputField label="Imported slide numbers" value={formatNumberRanges(reference?.slideNumbers)} hint="For example: 6, 9–11. These become openable citations." onChange={(value) => updateStage(stage.id, (item) => {
                    const sections = [...item.sections];
                    const currentSection = sections[index];
                    const references = (currentSection.sourceReferences ?? []).filter((item) => item.sourceId !== sourceItem.id);
                    references.push({ sourceId: sourceItem.id, locator: reference?.locator, slideNumbers: parseNumberRanges(value) });
                    sections[index] = { ...currentSection, sourceReferences: references };
                    return { ...item, sections };
                  })} /></div>}</div>;
                })}</fieldset>
              </section>
            ))}
          </div>
        </Card></div>
        <div id={`stage-${stage.id}-questions`}><Card title="Knowledge questions" eyebrow={`${stage.questions.length} in this stage`} actions={<EmptyButton onClick={() => updateStage(stage.id, (item) => ({ ...item, questions: [...item.questions, blankQuestion(item.id, nextNumericId(`${item.id}-question`, item.questions.map((question) => question.id)))] }))}>Add question</EmptyButton>}>
          {stage.questions.map((question, index) => <QuestionEditor key={question.id} question={question} label={`Question ${index + 1}`} onChange={(next) => updateStageQuestion(stage.id, "questions", index, next)} onRemove={stage.questions.length > 4 ? () => updateStage(stage.id, (item) => ({ ...item, questions: item.questions.filter((_, itemIndex) => itemIndex !== index) })) : undefined} />)}
        </Card></div>
        <div id={`stage-${stage.id}-scenarios`}><Card title="Decision scenarios" eyebrow="Two applied choices are required">
          {stage.scenarios.map((scenario, index) => <QuestionEditor key={scenario.id} question={scenario} label={`Scenario ${index + 1}`} scenario onChange={(next) => updateStageQuestion(stage.id, "scenarios", index, next)} />)}
        </Card></div>
        <Card title="Stage assignment" eyebrow="Write, compare, self-check">
          <GuidancePanel title="Show a strong assignment pattern">
            <p>Ask the learner to produce something they could genuinely use at work, provide a worked answer that demonstrates the reasoning, and write criteria that can be observed in the response rather than judged by taste.</p>
          </GuidancePanel>
          <div className="form-grid"><InputField id={`stage-${stage.id}-assignment-title`} label="Assignment title" value={stage.assignment.title} onChange={(value) => updateStage(stage.id, (item) => ({ ...item, assignment: { ...item.assignment, title: value } }))} /><InputField id={`stage-${stage.id}-assignment-instruction`} label="Instruction" value={stage.assignment.instruction} onChange={(value) => updateStage(stage.id, (item) => ({ ...item, assignment: { ...item.assignment, instruction: value } }))} /></div>
          <TextAreaField label="Learner prompts (one per line)" value={stage.assignment.prompts.join("\n")} onChange={(value) => updateStage(stage.id, (item) => ({ ...item, assignment: { ...item.assignment, prompts: value.split("\n") } }))} rows={4} />
          <TextAreaField id={`stage-${stage.id}-assignment-answer`} label="Worked answer" value={stage.assignment.modelAnswer ?? ""} onChange={(value) => updateStage(stage.id, (item) => ({ ...item, assignment: { ...item.assignment, modelAnswer: value } }))} rows={8} minimum={100} />
          <TextAreaField id={`stage-${stage.id}-assignment-criteria`} label="Self-review criteria (one per line)" value={(stage.assignment.criteria ?? []).join("\n")} onChange={(value) => updateStage(stage.id, (item) => ({ ...item, assignment: { ...item.assignment, criteria: value.split("\n") } }))} rows={4} />
        </Card>
      </div>
    );
  };

  const replaceStageItems = <K extends "diagnosticQuestions" | "flashcards" | "glossary" | "contrasts">(
    key: K,
    stageId: string,
    stageItems: TrainingPackage["content"][K],
  ) => {
    const all = entry.content[key] as Array<{ moduleId?: string }>;
    const retained = all.filter((item) => item.moduleId !== stageId);
    updateContent(key, [...retained, ...(stageItems as Array<{ moduleId?: string }>)] as TrainingPackage["content"][K]);
  };

  const renderSupports = () => {
    if (!currentStage) return null;
    const stage = currentStage;
    const diagnostics = entry.content.diagnosticQuestions.filter((item) => item.moduleId === stage.id);
    const cards = entry.content.flashcards.filter((item) => item.moduleId === stage.id);
    const terms = entry.content.glossary.filter((item) => item.moduleId === stage.id);
    const contrasts = entry.content.contrasts.filter((item) => item.moduleId === stage.id);
    return (
      <div className="workspace-stack">
        <div className="page-heading"><span className="eyebrow">4 · Reinforce</span><h1>Make the learning retrievable and usable</h1><p>These elements are short by design. They help learners find gaps, recall the idea later and distinguish good practice from a plausible substitute.</p></div>
        <StepConnection>Everything on this page is attached to the active stage shown below. Use the stage tabs before editing. Diagnostics identify gaps; review cards support later recall; glossary and contrast entries appear in the course reference views.</StepConnection>
        <StageTabs entry={entry} active={stage.id} setActive={setActiveStage} />
        <div id={`support-${stage.id}-diagnostic`}><Card title="Diagnostic question" eyebrow="Kept separate from the stage quiz" actions={<EmptyButton onClick={() => replaceStageItems("diagnosticQuestions", stage.id, [...diagnostics, blankQuestion(stage.id, nextNumericId(`${stage.id}-diagnostic`, diagnostics.map((question) => question.id)))])}>Add diagnostic</EmptyButton>}>
          {diagnostics.map((question, index) => <QuestionEditor key={question.id} question={question} label={`Diagnostic ${index + 1}`} onChange={(next) => {
            const items = [...diagnostics]; items[index] = next as Question; replaceStageItems("diagnosticQuestions", stage.id, items);
          }} onRemove={diagnostics.length > 1 ? () => replaceStageItems("diagnosticQuestions", stage.id, diagnostics.filter((_, itemIndex) => itemIndex !== index)) : undefined} />)}
        </Card></div>
        <div id={`support-${stage.id}-cards`}><Card title="Review cards" eyebrow="Definition, transfer and discrimination">
          <div className="support-grid">{cards.map((card, index) => <div className="support-card" key={card.id}><span className="pill">{card.kind}</span><InputField id={`support-${card.id}-prompt`} label="Prompt" value={card.front} onChange={(value) => { const items = [...cards]; items[index] = { ...card, front: value }; replaceStageItems("flashcards", stage.id, items); }} /><TextAreaField id={`support-${card.id}-answer`} label="Answer" value={card.back} onChange={(value) => { const items = [...cards]; items[index] = { ...card, back: value }; replaceStageItems("flashcards", stage.id, items); }} rows={3} /></div>)}</div>
        </Card></div>
        <Card title="Glossary" eyebrow="Terms the learner should not be expected to know" actions={<EmptyButton onClick={() => replaceStageItems("glossary", stage.id, [...terms, { term: "", definition: "", origin: "Course", moduleId: stage.id }])}>Add term</EmptyButton>}>
          <div className="support-list">{terms.map((term, index) => <div className="support-row" key={index}><InputField id={`support-${stage.id}-glossary-${index}-term`} label="Term" value={term.term} onChange={(value) => { const items = [...terms]; items[index] = { ...term, term: value }; replaceStageItems("glossary", stage.id, items); }} /><InputField label="Origin" value={term.origin} onChange={(value) => { const items = [...terms]; items[index] = { ...term, origin: value }; replaceStageItems("glossary", stage.id, items); }} /><TextAreaField label="Definition" value={term.definition} onChange={(value) => { const items = [...terms]; items[index] = { ...term, definition: value }; replaceStageItems("glossary", stage.id, items); }} rows={3} />{terms.length > 1 && <button type="button" className="text-danger" onClick={() => replaceStageItems("glossary", stage.id, terms.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={16} />Remove</button>}</div>)}</div>
        </Card>
        <Card title="Practice contrast" eyebrow="Good practice versus the usual substitute" actions={<EmptyButton onClick={() => replaceStageItems("contrasts", stage.id, [...contrasts, { moduleId: stage.id, good: "", usual: "", tell: "" }])}>Add contrast</EmptyButton>}>
          <div className="support-list">{contrasts.map((contrast, index) => <div className="support-row contrast-editor" key={index}><TextAreaField id={`support-${stage.id}-contrast-${index}-good`} label="Good practice" value={contrast.good} onChange={(value) => { const items = [...contrasts]; items[index] = { ...contrast, good: value }; replaceStageItems("contrasts", stage.id, items); }} rows={3} /><TextAreaField label="Common substitute" value={contrast.usual} onChange={(value) => { const items = [...contrasts]; items[index] = { ...contrast, usual: value }; replaceStageItems("contrasts", stage.id, items); }} rows={3} /><TextAreaField label="Observable way to tell" value={contrast.tell} onChange={(value) => { const items = [...contrasts]; items[index] = { ...contrast, tell: value }; replaceStageItems("contrasts", stage.id, items); }} rows={3} />{contrasts.length > 1 && <button type="button" className="text-danger" onClick={() => replaceStageItems("contrasts", stage.id, contrasts.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={16} />Remove</button>}</div>)}</div>
        </Card>
      </div>
    );
  };

  const renderReview = () => {
    const reviewAreas = NAV.filter((item) => item.id !== "instructions");
    const filteredIssues = issues.filter((issue) => issueFilter === "all" || issue.severity === issueFilter);
    const nextIssue = filteredIssues.find((issue) => issue.severity === "error") ?? filteredIssues[0];
    return <div className="workspace-stack">
      <div className="page-heading"><span className="eyebrow">7 · Review and export</span><h1>Separate machine checks from release judgement</h1><p>The Workshop can reject malformed or visibly incomplete packages. People remain responsible for subject-matter accuracy, instructional quality, handling and release.</p></div>
      <StepConnection>Automated issues read the whole connected draft. Select an issue to return to its step, active stage and relevant field. Preview is for human learning-flow review; final outputs also require the recorded approvals and Available status.</StepConnection>
      <section className={`readiness ${releaseReady ? "ready" : contentReady ? "pending" : "blocked"}`}>
        <div className="readiness-icon">{releaseReady ? <Check size={30} /> : contentReady ? <ShieldCheck size={30} /> : <AlertTriangle size={30} />}</div>
        <div>
          <span className="eyebrow">Course release state</span>
          <h2>{releaseReady ? "Approved outputs are unlocked" : contentReady ? "Human release checks are pending" : `${counts.errors} blocking issue${counts.errors === 1 ? "" : "s"}`}</h2>
          <p>{releaseReady ? "The course passed the encoded checks, is marked Available and carries a completed release record." : contentReady ? "Preview the course, complete the approvals below and set its status to Available when the release decision is made." : "Use the issue list to return to the relevant field. Preview and final output stay locked until the course is structurally usable."}</p>
        </div>
        <div className="issue-totals"><strong>{counts.errors}</strong><span>errors</span><strong>{counts.warnings}</strong><span>warnings</span><strong>{counts.notes}</strong><span>notes</span></div>
      </section>
      <Card title="Checks" eyebrow="Grouped by authoring step" actions={nextIssue && <button type="button" className="secondary" onClick={() => navigateIssue(nextIssue)}>Go to next {nextIssue.severity === "error" ? "blocker" : "issue"}<ChevronRight size={16} /></button>}>
        <div id="review-checks">
          <div className="review-step-summary" aria-label="Issues by authoring step">
            {reviewAreas.map((item) => {
              const areaIssues = issues.filter((issue) => issue.area === item.id);
              const areaErrors = areaIssues.filter((issue) => issue.severity === "error").length;
              return <div key={item.id} className={areaErrors ? "has-errors" : areaIssues.length ? "has-advice" : "complete"}><strong>{item.label}</strong><span>{areaErrors ? `${areaErrors} blocker${areaErrors === 1 ? "" : "s"}` : areaIssues.length ? `${areaIssues.length} advisory` : "Complete"}</span></div>;
            })}
          </div>
          <div className="issue-filters" aria-label="Filter course issues">
            {(["all", "error", "warning", "note"] as IssueFilter[]).map((filter) => {
              const total = filter === "all" ? issues.length : issues.filter((issue) => issue.severity === filter).length;
              const label = filter === "all" ? "All" : filter === "error" ? "Blockers" : filter === "warning" ? "Warnings" : "Notes";
              return <button type="button" key={filter} className={issueFilter === filter ? "active" : ""} aria-pressed={issueFilter === filter} onClick={() => setIssueFilter(filter)}>{label} <span>{total}</span></button>;
            })}
          </div>
          <div className="issue-list">{filteredIssues.length === 0 ? <div className="all-clear"><Check size={20} /><span>{issues.length ? "No issues match this filter." : "No automated issues are currently reported."}</span></div> : reviewAreas.map((area) => {
            const areaIssues = filteredIssues.filter((issue) => issue.area === area.id);
            if (!areaIssues.length) return null;
            const areaErrors = areaIssues.filter((issue) => issue.severity === "error").length;
            return <IssueGroup key={`${area.id}-${issueFilter}`} label={area.label} countLabel={areaErrors ? `${areaErrors} blocker${areaErrors === 1 ? "" : "s"}` : `${areaIssues.length} advisory`} initiallyOpen={areaErrors > 0 || issueFilter !== "all"}>
              {areaIssues.map((issue) => <button type="button" className={`issue ${issue.severity}`} key={issue.id} onClick={() => navigateIssue(issue)}><span className="issue-mark">{issue.severity === "error" ? "!" : issue.severity === "warning" ? "△" : "i"}</span><span><strong>{issue.title}</strong><small>{issue.detail}</small></span><ChevronRight size={18} /></button>)}
            </IssueGroup>;
          })}</div>
        </div>
      </Card>
      <Card title="Release checklist" eyebrow="Recorded human decisions">
        <div className="release-checklist">
          <label className="release-option"><input type="checkbox" checked={release.subjectMatterChecked} onChange={(event) => setRelease((current) => ({ ...current, subjectMatterChecked: event.target.checked }))} /><span><strong>Subject matter checked</strong><small>A competent reviewer checked material claims against the named governing sources.</small></span></label>
          <label className="release-option"><input type="checkbox" checked={release.learningFlowChecked} onChange={(event) => setRelease((current) => ({ ...current, learningFlowChecked: event.target.checked }))} /><span><strong>Learning flow checked</strong><small>A reviewer completed the course in order, including feedback, scenarios and the assignment.</small></span></label>
          <label className="release-option"><input type="checkbox" checked={release.handlingChecked} onChange={(event) => setRelease((current) => ({ ...current, handlingChecked: event.target.checked }))} /><span><strong>Audience and handling checked</strong><small>The custodian confirmed who may receive it and that no unsuitable or sensitive material will be exposed.</small></span></label>
          <label className="release-option"><input type="checkbox" checked={release.releaseApproved} onChange={(event) => setRelease((current) => ({ ...current, releaseApproved: event.target.checked }))} /><span><strong>Release approved</strong><small>The accountable team has authorised this version for learner use.</small></span></label>
        </div>
        <div className="form-grid release-record-fields">
          <InputField label="Approval reference" required value={release.approvalReference} onChange={(value) => setRelease((current) => ({ ...current, approvalReference: value }))} hint="Meeting, email, ticket or document reference — do not include secrets" />
          <InputField label="Approval date" required type="date" value={release.approvalDate} onChange={(value) => setRelease((current) => ({ ...current, approvalDate: value }))} />
        </div>
        <div className={`release-status-line ${entry.manifest.status === "available" ? "complete" : "incomplete"}`}>
          {entry.manifest.status === "available" ? <Check size={18} /> : <AlertTriangle size={18} />}
          <span>{entry.manifest.status === "available" ? "Course status is Available." : "Final outputs also require Course setup → Status to be Available."}</span>
        </div>
      </Card>
      <Card title="Generate outputs" eyebrow="Choose the delivery route">
        <div className="export-grid">
          <article><div className="export-icon"><Eye size={24} /></div><h3>Preview</h3><p>Open the actual single-course learner player without declaring a release. Use this for the full learning-flow review.</p><button type="button" className="secondary" disabled={!contentReady} onClick={preview}><Eye size={17} />Preview course</button></article>
          <article><div className="export-icon"><FileText size={24} /></div><h3>Standalone learner course</h3><p>One self-contained offline HTML file. Share it directly; it has no authoring controls, catalogue or switcher.</p><button type="button" className="primary" disabled={!releaseReady} onClick={() => exportLearnerHtml(entry)}><Download size={17} />Export training HTML</button></article>
          <article><div className="export-icon"><FolderGit2 size={24} /></div><h3>Individually hosted course</h3><p>A small ZIP containing an <code>index.html</code> for its own <code>training/&lt;course-id&gt;/</code> web address.</p><button type="button" className="primary" disabled={!releaseReady} onClick={() => exportHostedCourse(entry, release)}><Download size={17} />Export hosted-course ZIP</button></article>
          <article><div className="export-icon"><Archive size={24} /></div><h3>Repository package</h3><p>The canonical course folder, hosted page, release evidence and metadata used by the controlled inspect/install commands.</p><button type="button" className="primary" disabled={!releaseReady} onClick={() => exportDeveloperPackage(entry, issues, release)}><Download size={17} />Export repository ZIP</button></article>
          <article><div className="export-icon"><FileJson size={24} /></div><h3>Editable draft</h3><p>A portable JSON backup that Course Workshop can load again. It remains available while incomplete and is never a learner course.</p><button type="button" className="secondary" onClick={() => exportDraft(entry, release)}><Save size={17} />Download draft</button></article>
        </div>
      </Card>
      <section className="release-boundary"><ShieldCheck size={22} /><div><strong>Repository and publication boundary</strong><p>Exporting downloads files to this computer only. It does not alter a copied repository or publish online. A release custodian uses the commands on How it works, inspects the generated diff, runs the full verification suite and deliberately pushes the approved change.</p></div></section>
    </div>
  };

  const currentIndex = NAV.findIndex((item) => item.id === view);
  const viewIssues = issues.filter((issue) => issue.area === view && issue.severity === "error").length;

  return (
    <div className="studio-shell" aria-busy={Boolean(cloneProgress)}>
      <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">{focusAnnouncement}</div>
      {cloneProgress && <div className="operation-overlay" role="dialog" aria-modal="true" aria-labelledby="operation-title"><div><span className="progress-spinner" /><h2 id="operation-title">Creating the editable course</h2><p>{cloneProgress}</p><small>Large source decks can take a moment. Keep this page open.</small></div></div>}
      <aside className="studio-sidebar">
        <div className="studio-brand"><div className="brand-mark"><BookOpen size={22} /></div><div><strong>Course Workshop</strong><span>Product Practice authoring</span></div></div>
        <div className="privacy-banner"><ShieldCheck size={17} /><span>Local only. Draft content is not uploaded.</span></div>
        <nav aria-label="Course authoring steps">{NAV.map((item, index) => {
          const Icon = item.icon;
          const errors = issues.filter((issue) => issue.area === item.id && issue.severity === "error").length;
          return <button type="button" key={item.id} className={view === item.id ? "active" : ""} aria-current={view === item.id ? "step" : undefined} onClick={() => navigateTo(item.id)}><span className="nav-number">{index + 1}</span><Icon size={19} /><span><strong>{item.label}</strong><small>{item.description}</small></span>{errors > 0 && <b title={`${errors} blocking issue${errors === 1 ? "" : "s"} in this step`} aria-label={`${errors} blocking issue${errors === 1 ? "" : "s"} in ${item.label}`}>{errors}</b>}</button>;
        })}</nav>
        <div className="sidebar-status"><span className={releaseReady ? "status-ready" : contentReady ? "status-pending" : "status-blocked"}>{releaseReady ? "Ready to release" : contentReady ? "Release checks pending" : "Draft incomplete"}</span><small><Save size={13} />{saveLabel}</small></div>
        <div className="sidebar-actions">
          <input ref={importRef} className="visually-hidden" type="file" accept="application/json,.json" aria-label="Load a Course Workshop draft" onChange={(event) => void handleImport(event.target.files?.[0])} />
          <button type="button" onClick={() => importRef.current?.click()}><Upload size={16} />Load draft</button>
          <button type="button" onClick={() => exportDraft(entry, release)}><Download size={16} />Save draft</button>
          <button type="button" onClick={startAgain}><RotateCcw size={16} />New course</button>
        </div>
      </aside>
      <main id="studio-main" className="studio-main" tabIndex={-1}>
        <header className="topbar"><div><span className="course-kicker">Current draft</span><strong>{entry.manifest.title || "Untitled training course"}</strong></div><div className="topbar-meta"><span>v{entry.manifest.version}</span><span>{entry.content.modules.length} stage{entry.content.modules.length === 1 ? "" : "s"}</span><span>{hasDurationEvidence ? `${packageForExport(entry).content.totalMinutes} min` : "Duration pending"}</span></div></header>
        {message && <div className="notice" role="status"><CircleHelp size={18} /><span>{message}</span><button type="button" aria-label="Dismiss message" onClick={() => setMessage("")}>×</button></div>}
        <div className="studio-workspace">{view === "instructions" ? renderInstructions() : view === "setup" ? renderSetup() : view === "stages" ? renderStages() : view === "supports" ? renderSupports() : view === "advanced" ? <AdvancedEditor entry={entry} setEntry={setEntry} /> : view === "media" ? <MediaEditor entry={entry} setEntry={setEntry} setMessage={setMessage} /> : renderReview()}</div>
        <footer className="step-footer">
          <button type="button" className="secondary" disabled={currentIndex === 0} onClick={() => navigateTo(NAV[currentIndex - 1]?.id ?? "instructions")}><ChevronLeft size={17} />Previous</button>
          <span>{viewIssues ? `${viewIssues} blocking issue${viewIssues === 1 ? "" : "s"} in this step` : "This step has no blocking issues"}</span>
          <button type="button" className="primary" disabled={currentIndex === NAV.length - 1} onClick={() => navigateTo(NAV[currentIndex + 1]?.id ?? "review")}>Next<ChevronRight size={17} /></button>
        </footer>
      </main>
    </div>
  );
}
