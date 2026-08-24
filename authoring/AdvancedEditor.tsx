import type { Dispatch, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
import type {
  CapstoneBrief,
  CapstoneRubricItem,
  CapstoneStep,
  CaseStudy,
  Divergence,
  Exemplar,
  FieldGuideEntry,
  TrainingPackage,
} from "../src/package-model";
import { slugify } from "./draft";

type Props = {
  entry: TrainingPackage;
  setEntry: Dispatch<SetStateAction<TrainingPackage>>;
};

function Field({ label, value, onChange, hint }: { label: string; value: string; onChange: (value: string) => void; hint?: string }) {
  return <label className="field"><span>{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} />{hint && <small>{hint}</small>}</label>;
}

function Area({ label, value, onChange, rows = 3, hint }: { label: string; value: string; onChange: (value: string) => void; rows?: number; hint?: string }) {
  return <label className="field field-wide"><span>{label}</span><textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />{hint && <small>{hint}</small>}</label>;
}

function AddButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button type="button" className="secondary" onClick={onClick}><Plus size={16} aria-hidden="true" />{children}</button>;
}

function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" className="text-danger" onClick={onClick}><Trash2 size={16} aria-hidden="true" />{label}</button>;
}

function EditorGroup({ id, title, description, connection, children, addLabel, onAdd }: { id: string; title: string; description: string; connection: string; children: React.ReactNode; addLabel: string; onAdd: () => void }) {
  return (
    <section id={id} className="editor-card advanced-group">
      <header className="card-header"><div><span className="eyebrow">Apply and reference</span><h2>{title}</h2><p>{description}</p></div><div className="card-actions"><AddButton onClick={onAdd}>{addLabel}</AddButton></div></header>
      <p className="connection-note"><strong>Connection:</strong> {connection}</p>
      {children}
    </section>
  );
}

function uniqueId(prefix: string, ids: string[]): string {
  let number = ids.length + 1;
  while (ids.includes(`${prefix}-${number}`)) number += 1;
  return `${prefix}-${number}`;
}

function cleanLines(value: string): string[] {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function cleanParagraphs(value: string): string[] {
  return value.split(/\n\s*\n/).map((item) => item.replace(/\s*\n\s*/g, " ").trim()).filter(Boolean);
}

function slideNumbers(value: string): number[] {
  const result = new Set<number>();
  for (const token of value.split(/[,;\s]+/).filter(Boolean)) {
    const range = token.match(/^(\d+)[-–](\d+)$/);
    if (range) {
      const first = Number(range[1]);
      const last = Number(range[2]);
      if (last >= first && last - first <= 200) for (let number = first; number <= last; number += 1) result.add(number);
    } else if (/^\d+$/.test(token)) result.add(Number(token));
  }
  return [...result].filter((number) => number > 0).sort((a, b) => a - b);
}

function updateAt<T>(items: T[], index: number, next: T): T[] {
  const result = [...items];
  result[index] = next;
  return result;
}

export function AdvancedEditor({ entry, setEntry }: Props) {
  const update = <K extends keyof TrainingPackage["content"]>(key: K, value: TrainingPackage["content"][K]) => {
    setEntry((current) => ({ ...current, content: { ...current.content, [key]: value } }));
  };
  const sourceOptions = entry.content.sources;

  const addCase = () => {
    const id = uniqueId("case", entry.content.caseStudies.map((item) => item.id));
    update("caseStudies", [...entry.content.caseStudies, { id, title: "", subtitle: "", outcome: "worked", summary: "", steps: [], closing: "" }]);
  };
  const addToolkit = () => {
    const id = uniqueId("tool", entry.content.toolkitTemplates.map((item) => item.id));
    update("toolkitTemplates", [...entry.content.toolkitTemplates, { id, title: "", prompt: "", example: "", note: "" }]);
  };
  const addBrief = () => {
    const id = uniqueId("brief", entry.content.capstoneBriefs.map((item) => item.id));
    update("capstoneBriefs", [...entry.content.capstoneBriefs, { id, title: "", short: "", brief: "", twist: "" }]);
  };
  const addCapstoneStep = () => {
    const id = uniqueId("capstone-step", entry.content.capstoneSteps.map((item) => item.id));
    update("capstoneSteps", [...entry.content.capstoneSteps, { id, title: "", prompt: "", checks: [] }]);
  };
  const addRubric = () => {
    const id = uniqueId("rubric", entry.content.capstoneRubric.map((item) => item.id));
    update("capstoneRubric", [...entry.content.capstoneRubric, { id, title: "", detail: "" }]);
  };
  const addGuide = () => {
    const id = uniqueId("guide", entry.content.fieldGuide.map((item) => item.id));
    update("fieldGuide", [...entry.content.fieldGuide, { id, title: "", summary: "", slides: "", sourceIds: [], sourceReferences: [], items: [] }]);
  };
  const addDivergence = () => {
    const id = uniqueId("difference", entry.content.divergences.map((item) => item.id));
    update("divergences", [...entry.content.divergences, { id, topic: "", slides: "", deck: "", here: "", why: "" }]);
  };
  const addExemplar = () => {
    const id = uniqueId("exemplar", entry.content.exemplars.map((item) => item.id));
    update("exemplars", [...entry.content.exemplars, { id, tab: "Worked example", title: "", subtitle: "", intro: "", meta: [], sections: [], closing: "" }]);
  };

  return (
    <div className="workspace-stack">
      <div className="page-heading"><span className="eyebrow">5 · Apply and reference</span><h1>Connect the teaching into usable practice</h1><p>These elements are optional individually. Add the ones the course needs: a connected case, reusable tools, an integrated capstone, quick-reference guidance, source differences or a worked document.</p></div>
      <section className="step-connection" aria-label="How this step connects"><span className="connection-symbol" aria-hidden="true">↔</span><div><strong>How this step connects</strong><p>Cases link back to course stages. Field-guide entries can reuse registered sources and open imported slides. The toolkit, capstone and exemplars become their own learner destinations without duplicating lesson content.</p></div></section>

      <EditorGroup id="advanced-cases" title="Worked cases" description="Show one realistic situation developing across course stages. A corrected case can deliberately expose and repair a weak first attempt." connection="Each case step selects a course stage. Learners can move between the case and the teaching it demonstrates." addLabel="Add case" onAdd={addCase}>
        <div className="advanced-list">{entry.content.caseStudies.length === 0 && <p className="empty-copy">No case has been added.</p>}{entry.content.caseStudies.map((item, index) => (
          <details className="advanced-editor" key={item.id}>
            <summary><span>Case {index + 1}</span><strong>{item.title || "Untitled case"}</strong></summary>
            <div className="advanced-body">
              <div className="form-grid"><Field label="Stable id" value={item.id} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, id: slugify(value) }))} /><Field label="Title" value={item.title} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, title: value }))} /><Field label="Subtitle" value={item.subtitle} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, subtitle: value }))} /><label className="field"><span>Case treatment</span><select value={item.outcome} onChange={(event) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, outcome: event.target.value as CaseStudy["outcome"] }))}><option value="worked">Worked through well</option><option value="corrected">Weak attempt corrected</option></select></label></div>
              <Area label="Opening summary" value={item.summary} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, summary: value }))} />
              <div className="nested-heading"><h3>Case steps</h3><AddButton onClick={() => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, steps: [...item.steps, { moduleId: entry.content.modules[0]?.id ?? "", stage: 1, heading: "", decision: "", tempting: "", body: "", artefact: "", insight: "" }] }))}>Add case step</AddButton></div>
              {item.steps.map((step, stepIndex) => <div className="nested-editor" key={stepIndex}><div className="form-grid"><label className="field"><span>Course stage</span><select value={step.moduleId} onChange={(event) => { const module = entry.content.modules.find((candidate) => candidate.id === event.target.value); update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, steps: updateAt(item.steps, stepIndex, { ...step, moduleId: event.target.value, stage: module?.number ?? step.stage }) })); }}>{entry.content.modules.map((module) => <option key={module.id} value={module.id}>{module.number}. {module.title || module.id}</option>)}</select><small>Links this case decision back to the teaching stage it demonstrates.</small></label><Field label="Heading" value={step.heading} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, steps: updateAt(item.steps, stepIndex, { ...step, heading: value }) }))} /><Field label="Decision made (optional)" value={step.decision ?? ""} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, steps: updateAt(item.steps, stepIndex, { ...step, decision: value || undefined }) }))} /><Field label="Tempting alternative (optional)" value={step.tempting ?? ""} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, steps: updateAt(item.steps, stepIndex, { ...step, tempting: value || undefined }) }))} /></div><Area label="What happens" value={step.body} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, steps: updateAt(item.steps, stepIndex, { ...step, body: value }) }))} /><Area label="Artefact produced (optional)" value={step.artefact ?? ""} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, steps: updateAt(item.steps, stepIndex, { ...step, artefact: value || undefined }) }))} /><Area label="Teaching insight" value={step.insight} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, steps: updateAt(item.steps, stepIndex, { ...step, insight: value }) }))} /><RemoveButton label="Remove case step" onClick={() => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, steps: item.steps.filter((_, candidate) => candidate !== stepIndex) }))} /></div>)}
              <Area label="Closing lesson" value={item.closing} onChange={(value) => update("caseStudies", updateAt(entry.content.caseStudies, index, { ...item, closing: value }))} />
              <RemoveButton label="Remove case" onClick={() => update("caseStudies", entry.content.caseStudies.filter((_, candidate) => candidate !== index))} />
            </div>
          </details>
        ))}</div>
      </EditorGroup>

      <EditorGroup id="advanced-toolkit" title="Toolkit templates" description="Give learners a reusable prompt, structure or mini-template with an example of a good response." connection="Each completed item becomes a reusable tool in the learner Toolkit. It does not need a stage link." addLabel="Add tool" onAdd={addToolkit}>
        <div className="advanced-list">{entry.content.toolkitTemplates.length === 0 && <p className="empty-copy">No toolkit template has been added.</p>}{entry.content.toolkitTemplates.map((item, index) => <details className="advanced-editor" key={item.id}><summary><span>Tool {index + 1}</span><strong>{item.title || "Untitled tool"}</strong></summary><div className="advanced-body"><div className="form-grid"><Field label="Stable id" value={item.id} onChange={(value) => update("toolkitTemplates", updateAt(entry.content.toolkitTemplates, index, { ...item, id: slugify(value) }))} /><Field label="Title" value={item.title} onChange={(value) => update("toolkitTemplates", updateAt(entry.content.toolkitTemplates, index, { ...item, title: value }))} /></div><Area label="Prompt or reusable structure" value={item.prompt} onChange={(value) => update("toolkitTemplates", updateAt(entry.content.toolkitTemplates, index, { ...item, prompt: value }))} /><Area label="Worked example" value={item.example} onChange={(value) => update("toolkitTemplates", updateAt(entry.content.toolkitTemplates, index, { ...item, example: value }))} /><Area label="Trainer note (optional)" value={item.note ?? ""} onChange={(value) => update("toolkitTemplates", updateAt(entry.content.toolkitTemplates, index, { ...item, note: value || undefined }))} /><RemoveButton label="Remove tool" onClick={() => update("toolkitTemplates", entry.content.toolkitTemplates.filter((_, candidate) => candidate !== index))} /></div></details>)}</div>
      </EditorGroup>

      <EditorGroup id="advanced-capstone" title="Capstone" description="Create one or more briefs, the learner's ordered production steps and a transparent rubric. The three parts travel together." connection="Briefs provide learner choices; every brief uses the shared production steps and rubric. Build all three parts before release." addLabel="Add brief" onAdd={addBrief}>
        <div className="advanced-subgroup"><div className="nested-heading"><h3>Brief choices</h3></div>{entry.content.capstoneBriefs.length === 0 && <p className="empty-copy">No capstone brief has been added.</p>}{entry.content.capstoneBriefs.map((item: CapstoneBrief, index) => <div className="nested-editor" key={item.id}><div className="form-grid"><Field label="Stable id" value={item.id} onChange={(value) => update("capstoneBriefs", updateAt(entry.content.capstoneBriefs, index, { ...item, id: slugify(value) }))} /><Field label="Title" value={item.title} onChange={(value) => update("capstoneBriefs", updateAt(entry.content.capstoneBriefs, index, { ...item, title: value }))} /><Field label="Short label" value={item.short} onChange={(value) => update("capstoneBriefs", updateAt(entry.content.capstoneBriefs, index, { ...item, short: value }))} /></div><Area label="Situation and task" value={item.brief} onChange={(value) => update("capstoneBriefs", updateAt(entry.content.capstoneBriefs, index, { ...item, brief: value }))} /><Area label="Complication or twist" value={item.twist} onChange={(value) => update("capstoneBriefs", updateAt(entry.content.capstoneBriefs, index, { ...item, twist: value }))} /><RemoveButton label="Remove brief" onClick={() => update("capstoneBriefs", entry.content.capstoneBriefs.filter((_, candidate) => candidate !== index))} /></div>)}</div>
        <div className="advanced-subgroup"><div className="nested-heading"><h3>Production steps</h3><AddButton onClick={addCapstoneStep}>Add step</AddButton></div>{entry.content.capstoneSteps.map((item: CapstoneStep, index) => <div className="nested-editor" key={item.id}><div className="form-grid"><Field label="Stable id" value={item.id} onChange={(value) => update("capstoneSteps", updateAt(entry.content.capstoneSteps, index, { ...item, id: slugify(value) }))} /><Field label="Title" value={item.title} onChange={(value) => update("capstoneSteps", updateAt(entry.content.capstoneSteps, index, { ...item, title: value }))} /></div><Area label="Learner prompt" value={item.prompt} onChange={(value) => update("capstoneSteps", updateAt(entry.content.capstoneSteps, index, { ...item, prompt: value }))} /><Area label="Completion checks (one per line)" value={item.checks.join("\n")} onChange={(value) => update("capstoneSteps", updateAt(entry.content.capstoneSteps, index, { ...item, checks: cleanLines(value) }))} /><RemoveButton label="Remove step" onClick={() => update("capstoneSteps", entry.content.capstoneSteps.filter((_, candidate) => candidate !== index))} /></div>)}</div>
        <div className="advanced-subgroup"><div className="nested-heading"><h3>Rubric</h3><AddButton onClick={addRubric}>Add criterion</AddButton></div>{entry.content.capstoneRubric.map((item: CapstoneRubricItem, index) => <div className="nested-editor" key={item.id}><div className="form-grid"><Field label="Stable id" value={item.id} onChange={(value) => update("capstoneRubric", updateAt(entry.content.capstoneRubric, index, { ...item, id: slugify(value) }))} /><Field label="Criterion" value={item.title} onChange={(value) => update("capstoneRubric", updateAt(entry.content.capstoneRubric, index, { ...item, title: value }))} /></div><Area label="What good evidence looks like" value={item.detail} onChange={(value) => update("capstoneRubric", updateAt(entry.content.capstoneRubric, index, { ...item, detail: value }))} /><RemoveButton label="Remove criterion" onClick={() => update("capstoneRubric", entry.content.capstoneRubric.filter((_, candidate) => candidate !== index))} /></div>)}</div>
      </EditorGroup>

      <EditorGroup id="advanced-field-guide" title="Field guide" description="Build concise reference entries learners can return to after the course. Source locators can open an imported source deck." connection="Select sources registered in Course setup. Slide numbers become openable only when those numbered slides exist in Media and source deck." addLabel="Add guide entry" onAdd={addGuide}>
        <div className="advanced-list">{entry.content.fieldGuide.length === 0 && <p className="empty-copy">No field-guide entry has been added.</p>}{entry.content.fieldGuide.map((item: FieldGuideEntry, index) => <details className="advanced-editor" key={item.id}><summary><span>Guide {index + 1}</span><strong>{item.title || "Untitled entry"}</strong></summary><div className="advanced-body"><div className="form-grid"><Field label="Stable id" value={item.id} onChange={(value) => update("fieldGuide", updateAt(entry.content.fieldGuide, index, { ...item, id: slugify(value) }))} /><Field label="Title" value={item.title} onChange={(value) => update("fieldGuide", updateAt(entry.content.fieldGuide, index, { ...item, title: value }))} /><Field label="Source slide label (optional)" value={item.slides ?? ""} onChange={(value) => update("fieldGuide", updateAt(entry.content.fieldGuide, index, { ...item, slides: value || undefined }))} /></div><Area label="Summary" value={item.summary} onChange={(value) => update("fieldGuide", updateAt(entry.content.fieldGuide, index, { ...item, summary: value }))} />
          <fieldset className="source-picker"><legend>Sources and precise locators</legend><p>Select a registered source to show attribution. Add slide numbers only after those slides exist in Media and source deck.</p>{sourceOptions.map((source) => { const selected = item.sourceIds.includes(source.id); const reference = item.sourceReferences?.find((candidate) => candidate.sourceId === source.id); return <div className="source-reference-editor" key={source.id}><label><input type="checkbox" checked={selected} onChange={(event) => { const sourceIds = event.target.checked ? [...item.sourceIds, source.id] : item.sourceIds.filter((id) => id !== source.id); const sourceReferences = event.target.checked ? [...(item.sourceReferences ?? []), { sourceId: source.id }] : (item.sourceReferences ?? []).filter((candidate) => candidate.sourceId !== source.id); update("fieldGuide", updateAt(entry.content.fieldGuide, index, { ...item, sourceIds, sourceReferences })); }} /><span>{source.title || `${source.id} — incomplete`}</span></label>{selected && <div className="form-grid"><Field label="Page, section or locator" value={reference?.locator ?? ""} onChange={(value) => { const refs = (item.sourceReferences ?? []).filter((candidate) => candidate.sourceId !== source.id); refs.push({ sourceId: source.id, locator: value || undefined, slideNumbers: reference?.slideNumbers }); update("fieldGuide", updateAt(entry.content.fieldGuide, index, { ...item, sourceReferences: refs })); }} /><Field label="Slide numbers" value={(reference?.slideNumbers ?? []).join(", ")} hint="For example: 6, 9–11. These numbers must match imported slides." onChange={(value) => { const refs = (item.sourceReferences ?? []).filter((candidate) => candidate.sourceId !== source.id); refs.push({ sourceId: source.id, locator: reference?.locator, slideNumbers: slideNumbers(value) }); update("fieldGuide", updateAt(entry.content.fieldGuide, index, { ...item, sourceReferences: refs })); }} /></div>}</div>; })}</fieldset>
          <Area label="Reference items — one ‘term | detail’ per line" value={item.items.map((entryItem) => `${entryItem.term} | ${entryItem.detail}`).join("\n")} onChange={(value) => update("fieldGuide", updateAt(entry.content.fieldGuide, index, { ...item, items: cleanLines(value).map((line) => { const [term, ...detail] = line.split("|"); return { term: term.trim(), detail: detail.join("|").trim() }; }) }))} rows={6} /><RemoveButton label="Remove guide entry" onClick={() => update("fieldGuide", entry.content.fieldGuide.filter((_, candidate) => candidate !== index))} /></div></details>)}</div>
      </EditorGroup>

      <EditorGroup id="advanced-source-differences" title="Source differences" description="Record where the course deliberately explains, updates or applies source material differently. This prevents silent divergence." connection="Use this when course teaching intentionally differs from, updates or narrows a named source—not for ordinary explanation." addLabel="Add difference" onAdd={addDivergence}>
        <div className="advanced-list">{entry.content.divergences.length === 0 && <p className="empty-copy">No source difference has been recorded.</p>}{entry.content.divergences.map((item: Divergence, index) => <details className="advanced-editor" key={item.id}><summary><span>Difference {index + 1}</span><strong>{item.topic || "Untitled difference"}</strong></summary><div className="advanced-body"><div className="form-grid"><Field label="Stable id" value={item.id} onChange={(value) => update("divergences", updateAt(entry.content.divergences, index, { ...item, id: slugify(value) }))} /><Field label="Topic" value={item.topic} onChange={(value) => update("divergences", updateAt(entry.content.divergences, index, { ...item, topic: value }))} /><Field label="Source slides or locator" value={item.slides} onChange={(value) => update("divergences", updateAt(entry.content.divergences, index, { ...item, slides: value }))} /></div><Area label="What the source says" value={item.deck} onChange={(value) => update("divergences", updateAt(entry.content.divergences, index, { ...item, deck: value }))} /><Area label="What this course teaches" value={item.here} onChange={(value) => update("divergences", updateAt(entry.content.divergences, index, { ...item, here: value }))} /><Area label="Reason for the difference" value={item.why} onChange={(value) => update("divergences", updateAt(entry.content.divergences, index, { ...item, why: value }))} /><RemoveButton label="Remove difference" onClick={() => update("divergences", entry.content.divergences.filter((_, candidate) => candidate !== index))} /></div></details>)}</div>
      </EditorGroup>

      <EditorGroup id="advanced-exemplars" title="Worked documents and exemplars" description="Show the whole artefact a learner is expected to produce. Sections can contain paragraphs, a table, an artefact block and a coaching note." connection="Use an exemplar when a lesson or assignment asks the learner to produce a complete document. The exemplar appears as a separate worked-document view." addLabel="Add exemplar" onAdd={addExemplar}>
        <div className="advanced-list">{entry.content.exemplars.length === 0 && <p className="empty-copy">No worked document has been added.</p>}{entry.content.exemplars.map((item: Exemplar, index) => <details className="advanced-editor" key={item.id}><summary><span>Exemplar {index + 1}</span><strong>{item.title || "Untitled exemplar"}</strong></summary><div className="advanced-body"><div className="form-grid"><Field label="Stable id" value={item.id} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, id: slugify(value) }))} /><Field label="Tab label" value={item.tab} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, tab: value }))} /><Field label="Title" value={item.title} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, title: value }))} /><Field label="Subtitle" value={item.subtitle} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, subtitle: value }))} /></div><Area label="Introduction" value={item.intro} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, intro: value }))} /><Area label="Metadata — one ‘label | value’ per line" value={item.meta.map((meta) => `${meta.label} | ${meta.value}`).join("\n")} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, meta: cleanLines(value).map((line) => { const [label, ...rest] = line.split("|"); return { label: label.trim(), value: rest.join("|").trim() }; }) }))} />
          <div className="nested-heading"><h3>Document sections</h3><AddButton onClick={() => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, sections: [...item.sections, { heading: "", body: [], body2: [], artefact: "", note: "" }] }))}>Add section</AddButton></div>
          {item.sections.map((section, sectionIndex) => <div className="nested-editor" key={sectionIndex}><Field label="Heading" value={section.heading} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, sections: updateAt(item.sections, sectionIndex, { ...section, heading: value }) }))} /><Area label="Opening paragraphs — separate with a blank line" value={(section.body ?? []).join("\n\n")} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, sections: updateAt(item.sections, sectionIndex, { ...section, body: cleanParagraphs(value) }) }))} rows={5} /><div className="form-grid"><Field label="Table caption (optional)" value={section.table?.caption ?? ""} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, sections: updateAt(item.sections, sectionIndex, { ...section, table: { caption: value || undefined, head: section.table?.head ?? [], rows: section.table?.rows ?? [] } }) }))} /><Field label="Table headings separated by |" value={(section.table?.head ?? []).join(" | ")} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, sections: updateAt(item.sections, sectionIndex, { ...section, table: { caption: section.table?.caption, head: value.split("|").map((cell) => cell.trim()).filter(Boolean), rows: section.table?.rows ?? [] } }) }))} /></div><Area label="Table rows — one row per line, cells separated by |" value={(section.table?.rows ?? []).map((row) => row.join(" | ")).join("\n")} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, sections: updateAt(item.sections, sectionIndex, { ...section, table: { caption: section.table?.caption, head: section.table?.head ?? [], rows: cleanLines(value).map((line) => line.split("|").map((cell) => cell.trim())) } }) }))} /><Area label="Closing paragraphs — separate with a blank line" value={(section.body2 ?? []).join("\n\n")} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, sections: updateAt(item.sections, sectionIndex, { ...section, body2: cleanParagraphs(value) }) }))} /><Area label="Artefact block (optional)" value={section.artefact ?? ""} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, sections: updateAt(item.sections, sectionIndex, { ...section, artefact: value || undefined }) }))} /><Area label="Coaching note" value={section.note} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, sections: updateAt(item.sections, sectionIndex, { ...section, note: value }) }))} /><RemoveButton label="Remove document section" onClick={() => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, sections: item.sections.filter((_, candidate) => candidate !== sectionIndex) }))} /></div>)}
          <Area label="Closing note" value={item.closing} onChange={(value) => update("exemplars", updateAt(entry.content.exemplars, index, { ...item, closing: value }))} /><RemoveButton label="Remove exemplar" onClick={() => update("exemplars", entry.content.exemplars.filter((_, candidate) => candidate !== index))} /></div></details>)}</div>
      </EditorGroup>
    </div>
  );
}
