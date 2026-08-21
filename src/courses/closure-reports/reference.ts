/**
 * Closure Reports — reference content.
 *
 * Everything the package owns beyond its twelve stages: retrieval cards, the
 * glossary, worked cases, the capstone, templates and the field guide.
 *
 * This package has no `divergences` — that concept belongs to a course built
 * from a departmental deck, where the course goes further than the source and
 * the difference has to be visible. Here the sources are published frameworks
 * and the course does not depart from them, so the array is empty and the view
 * shows its empty state rather than an invented section.
 */

import type {
  CapstoneBrief,
  CapstoneRubricItem,
  CapstoneStep,
  CaseStudy,
  Contrast,
  Divergence,
  FieldGuideEntry,
  Flashcard,
  GlossaryEntry,
  Question,
  ToolkitTemplate,
} from "../../package-model";

/* ------------------------------------------------------------------ *
 * Retrieval cards
 * ------------------------------------------------------------------ */

export const closureFlashcards: Flashcard[] = [
  { id: "cf-p1", moduleId: "process", kind: "definition", front: "What are the six activities that constitute closure?", back: "Deliverables handed over and accepted; risks, issues and benefits assigned to BAU owners; PIR arrangements confirmed; closure formally approved; the closure report completed and approved by the SRO; lessons recorded in the Departmental Lessons Learned Register." },
  { id: "cf-p2", moduleId: "process", kind: "definition", front: "How many items are on the departmental closure checklist, and across how many categories?", back: "Fifteen items across six categories: deliverables and benefits transition, transition ownership to BAU, closure documentation, lessons learned, approvals and submission, and stakeholder engagement." },
  { id: "cf-p3", moduleId: "process", kind: "discrimination", front: "Why is the closure report written after the closure activities rather than before?", back: "Its job is to evidence work that happened. Written first, sections describe intentions in the past tense — a transition 'completed' that nobody accepted." },
  { id: "cf-p4", moduleId: "process", kind: "application", front: "A template section does not apply to your project. What do you do?", back: "Keep the heading and justify the omission in place. A deleted section is indistinguishable from an oversight; a justified one records a decision." },
  { id: "cf-p5", moduleId: "process", kind: "discrimination", front: "Which closure artefact is scoped to Tier 1 and Tier 2 projects only?", back: "The Project Transition Plan. SRO approval, the Lessons Learned Register and submission to the PMO and PPO apply at every tier." },
  { id: "cf-p6", moduleId: "process", kind: "application", front: "What satisfies 'benefit ownership is defined and agreed'?", back: "A named business owner who has accepted it. Naming a branch in a table records where the benefit was pointed, not that anyone caught it." },

  { id: "cf-d1", moduleId: "deliverables", kind: "discrimination", front: "Project management deliverable or project-specific deliverable?", back: "Management deliverables are artefacts the P3M Framework required — plans, registers, profiles. Project-specific deliverables are the goods or services the project existed to produce." },
  { id: "cf-d2", moduleId: "deliverables", kind: "definition", front: "Which core artefacts does the closure template pre-populate?", back: "Concept Definition; Business Case or NPP; Assurance Approach or Plan; PMP; Schedule; Benefit Profiles; Benefits Realisation Plan; Stakeholder Engagement Strategy; Risk Management Plan in RiskNet2; PIA where applicable; Change Register; the closure report; status reports; change requests." },
  { id: "cf-d3", moduleId: "deliverables", kind: "application", front: "Where does the 'planned deliverable' column come from?", back: "The approved business case, NPP or project outline — the original commitment. Taking it from the latest plan compares the project to itself." },
  { id: "cf-d4", moduleId: "deliverables", kind: "definition", front: "The three delivery statuses on the Tier 3 form", back: "Achieved, Partially achieved, Not achieved. Partially achieved is a legitimate answer and survives skim-reading in a way a caveat in a comments column does not." },
  { id: "cf-d5", moduleId: "deliverables", kind: "discrimination", front: "A deliverable was dropped with no approval anywhere. Variation or shortfall?", back: "A shortfall. An approved variation cites who approved it, when and in which forum. Absence of objection is not approval." },
  { id: "cf-d6", moduleId: "deliverables", kind: "application", front: "What does the status-report row ask for instead of a version?", back: "The cadence — weekly, fortnightly, monthly. A break in the rhythm is a governance finding." },

  { id: "cf-m1", moduleId: "milestones", kind: "definition", front: "Which baseline does the milestone table report against?", back: "The original baselined schedule in the approved PMP. Where the project was rebaselined, report variance to both, with each rebaseline dated and attributed." },
  { id: "cf-m2", moduleId: "milestones", kind: "definition", front: "The six dimensions performance is reported against", back: "Time, cost, quality, scope, benefits and risk — each against targets and agreed tolerances, so the question is whether the movement exceeded what governance had allowed." },
  { id: "cf-m3", moduleId: "milestones", kind: "discrimination", front: "Late, or outside tolerance?", back: "Different findings. Tolerance is the room agreed in advance; reporting against it says whether the control worked, not merely whether the date moved." },
  { id: "cf-m4", moduleId: "milestones", kind: "application", front: "What should a change register with approvals but no rejections prompt you to check?", back: "Check how proposals were screened, withdrawn and entered, and whether the decision forum applied meaningful challenge. A zero-rejection pattern is a signal to investigate, not proof of weak control." },
  { id: "cf-m5", moduleId: "milestones", kind: "application", front: "A milestone was met by narrowing its definition. How is it reported?", back: "Met on the narrowed definition, with the change stated and whether it went through change control. The redefinition is the finding." },
  { id: "cf-m6", moduleId: "milestones", kind: "definition", front: "What does section 12 ask you to attach?", back: "The Change Register. The section summarises how change was managed; the register is the evidence." },

  { id: "cf1", moduleId: "purpose", kind: "definition", front: "What is a closure report for?", back: "To provide the first evidence about whether an investment was worth making, and to transfer every obligation that outlives the project to a named owner." },
  { id: "cf2", moduleId: "purpose", kind: "definition", front: "What does the Gateway Benefits Realisation review assess?", back: "Whether the investment delivered the benefits and value for money identified in the business case and benefits realisation plans, and what must happen next." },
  { id: "cf3", moduleId: "purpose", kind: "application", front: "How should you determine whether a proposal needs Gateway consideration?", back: "Check the current Finance guidance, entity classification, financial tests and risk pathway. Do not rely on memorised thresholds, because current applicability is the decision that matters." },
  { id: "cf4", moduleId: "purpose", kind: "discrimination", front: "Project manager or SRO — who remains accountable during a Gateway review?", back: "The Senior Responsible Officer. Gateway provides independent assurance to the SRO; it does not take over accountability for delivery or benefits." },
  { id: "cf5", moduleId: "purpose", kind: "application", front: "Which closure-report reader has no alternative source of information?", back: "The next delivery team. The SRO can ask, Finance has the ledger, audit can test — only the next team depends entirely on what was written down." },
  { id: "cf6", moduleId: "purpose", kind: "discrimination", front: "Why is a structural conflict, not carelessness, the reason closure reports are weak?", back: "The author's own record is the subject, written at the point of least time and least incentive to be candid, for readers who cannot verify." },

  { id: "cf75", moduleId: "purpose", kind: "definition", front: "What governs a DEWR project's closure?", back: "The department's P3M Framework. A project cannot formally close without a closure report approved by the SRO and submitted to the group PMO and the Portfolio Project Office. The DTA's seven-criteria standard is a whole-of-government comparator, not the departmental requirement." },
  { id: "cf76", moduleId: "purpose", kind: "discrimination", front: "Strong or Emerging? (DTA comparator)", back: "Emerging records what happened. Strong explains why it happened and what it cost. Useful as a quality test on any closure report, including one written to the departmental template." },
  { id: "cf77", moduleId: "purpose", kind: "application", front: "Which closure-standard criteria call for supporting artefacts?", back: "Scope calls for the original business case and/or project scope document. Lessons calls for an artefact setting out the full lessons, such as a lessons learned register. Do not narrow either alternative beyond the Standard's wording." },
  { id: "cf78", moduleId: "accountability", kind: "definition", front: "What does criterion 5 require?", back: "That internal and external assurance activities in the Assurance Plan agreed with the DTA were completed, with the reason for any material change and the key outcomes. Strong adds whether the assurance was worth its cost." },
  { id: "cf79", moduleId: "financial", kind: "definition", front: "Movement of Funds", back: "A request to shift approved funding between financial years. A Strong budget rating gives the rationale for it and its impact, including on the wider agency." },
  { id: "cf80", moduleId: "handover", kind: "definition", front: "What does a Strong transition rating add?", back: "Sustainment funding plans, and the impact of transferring incomplete or outstanding deliverables into business as usual." },

  { id: "cf7", moduleId: "evidence", kind: "definition", front: "The three kinds of claim", back: "Measured (data before and after, same definition), estimated (a model with stated assumptions), asserted (informed judgement, no measurement). Mark which is which." },
  { id: "cf8", moduleId: "evidence", kind: "application", front: "What makes a claim traceable?", back: "A reader who was not there can reach the underlying data without asking you: named source, date range, sample size, and the metric definition." },
  { id: "cf9", moduleId: "evidence", kind: "discrimination", front: "Original baseline or revised baseline?", back: "Both. State the original approved baseline first, show each revision dated and reasoned, and report against both so the reader sees the gap." },
  { id: "cf10", moduleId: "evidence", kind: "application", front: "No baseline was captured. What now?", back: "Say so plainly. Any improvement claim becomes estimated or asserted. A reconstructed baseline is legitimate as an estimate, never as a measurement." },
  { id: "cf11", moduleId: "evidence", kind: "discrimination", front: "Why disclose that a claim is merely asserted?", back: "It is what makes the measured claims credible. Strip the marking and a sceptical reader treats every claim in the document as equally unverifiable." },
  { id: "cf12", moduleId: "evidence", kind: "application", front: "The metric definition changed mid-project. What must the report do?", back: "Report both definitions, state that it changed, and give a like-for-like figure if the data allows — otherwise improvement and measurement artefact are indistinguishable." },

  { id: "cf13", moduleId: "benefits", kind: "definition", front: "How does benefits realisation span closure?", back: "Some benefits may begin during delivery; many continue in operations. Closure reports progress realised so far and transfers the remaining ownership, measurement, governance and corrective action." },
  { id: "cf14", moduleId: "benefits", kind: "definition", front: "The course's recommended four-part benefit accountability test", back: "Responsible business area and preferably an accountable role-holder; recorded acceptance; ability to influence the driver; and durable measurement. The departmental forms do not uniformly mandate a named individual, so label the stronger test as recommended practice unless local policy confirms it." },
  { id: "cf15", moduleId: "benefits", kind: "discrimination", front: "'The Service Delivery Group owns this benefit' — what must be checked?", back: "Whether the area is correct under local governance, who is accountable for acting, whether ownership was accepted, who controls the driver and whether measurement will persist. A group label alone does not evidence those things." },
  { id: "cf16", moduleId: "benefits", kind: "application", front: "When should an internal PIR and the Gateway Benefits Realisation review occur?", back: "Set the PIR when the project's effects can be judged; there is no universal timing for every PIR. For Gateway proposals, the Benefits Realisation review is generally six to twelve months after commissioning and follows an internal PIR or similar major review." },
  { id: "cf17", moduleId: "benefits", kind: "application", front: "Which benefit measurement survives two years?", back: "One drawn from standing operational reporting, reviewed at a committee that meets anyway. Bespoke dashboards lose maintainers; commissioned surveys lose funding." },
  { id: "cf18", moduleId: "benefits", kind: "discrimination", front: "Benefit missed because take-up was low, system worked. What is the finding?", back: "Forecast error, not delivery failure — and the transferable asset is why the forecast was optimistic, not the revised number." },

  { id: "cf19", moduleId: "lessons", kind: "definition", front: "The four parts of a usable lesson", back: "Context (when does this apply), what happened (specific, with magnitude), cost (why care), action (what to do differently)." },
  { id: "cf20", moduleId: "lessons", kind: "discrimination", front: "Why is 'engage stakeholders earlier' not a lesson?", back: "It is the category a lesson would sit under. No context, event, cost or action — so no reader can act differently than they would have." },
  { id: "cf21", moduleId: "lessons", kind: "definition", front: "Reference class data", back: "Pooled estimate-versus-actual ratios across comparable projects. A single project cannot establish a base rate; twenty can." },
  { id: "cf22", moduleId: "lessons", kind: "application", front: "Ratio or absolute figure — which transfers?", back: "The ratio. 'Integration exceeded estimate by 3.2×' applies to a project of any size; '$840k over' applies only to one the same size." },
  { id: "cf23", moduleId: "lessons", kind: "discrimination", front: "Why does an end-of-project lessons workshop produce weak lessons?", back: "The team has told itself the story many times and the story has smoothed over the branch points. What survives is coherent; what is lost is transferable." },
  { id: "cf24", moduleId: "lessons", kind: "application", front: "Well-written lessons in the project's own folder — what is wrong?", back: "Discoverability. Readers search by problem, not by the name of a project they have never heard of. Publish into a pool that accumulates." },

  { id: "cf25", moduleId: "handover", kind: "definition", front: "The test of a completed handover", back: "The receiving team can run and change it without anyone who has left. Not: a document was signed." },
  { id: "cf26", moduleId: "handover", kind: "discrimination", front: "Why does informal contact with departed staff hide a handover failure?", back: "It keeps the service running, so nothing visibly fails and nobody funds the fix — until the person stops replying, usually mid-incident." },
  { id: "cf27", moduleId: "handover", kind: "definition", front: "What transfers at handover?", back: "Operational support, change and enhancement, run cost and licences, residual risks, benefits measurement, and data and records obligations — each to a named holder." },
  { id: "cf28", moduleId: "handover", kind: "application", front: "Run costs 'handed to operations' with no budget line — consequence?", back: "A renewal lapses because no budget holder recognises the cost as theirs, and it surfaces when the service degrades." },
  { id: "cf29", moduleId: "handover", kind: "application", front: "What is known fragility, and why can it be omitted?", back: "The parts the team knows are weak — retry loops, timing dependencies and poorly understood configuration. Teams may hesitate to record them because disclosure can feel like admitting failure, but operations needs the information to manage incidents and change safely." },
  { id: "cf30", moduleId: "handover", kind: "application", front: "How do you find the real handover gaps?", back: "Have the receiving team make a routine change, delivery team away. What they need to ask is the handover backlog." },

  { id: "cf43", moduleId: "financial", kind: "definition", front: "What must be true before the ledger closes?", back: "Costs recorded in the right period; commitments paid or accrued; capitalised spend tests as a real asset; WIP cleared; recurring costs on a funded budget line." },
  { id: "cf44", moduleId: "financial", kind: "discrimination", front: "Capitalise or expense: abandoned discovery options?", back: "Expense. An asset is what you have, not the analysis that led to it. Capitalising all options overstates the asset and hides the cost of deciding." },
  { id: "cf45", moduleId: "financial", kind: "discrimination", front: "Capitalise or expense: training?", back: "Expense under AASB 138 and Finance RMG 109. Other change-management costs require classification against their nature; do not sweep an undifferentiated change budget into the software asset." },
  { id: "cf46", moduleId: "financial", kind: "definition", front: "What does final acceptance do?", back: "Whatever the executed contract says it does. It may trigger payment, warranty, retention, title or defects provisions; check the acceptance criteria and consequences rather than applying a universal rule." },
  { id: "cf47", moduleId: "financial", kind: "application", front: "Supplier wants acceptance signed with defects open. What now?", back: "Apply the executed contract: withhold or document conditional acceptance only through a mechanism the agreement permits, recording the open obligations and obtaining procurement, commercial or legal advice where needed." },
  { id: "cf48", moduleId: "financial", kind: "application", front: "Why do warranties expire unnoticed?", back: "Invoices and payments have owners in the finance process. A warranty is a right with no natural owner once the project dissolves — so name one and record the end date." },
  { id: "cf49", moduleId: "financial", kind: "application", front: "What obligations survive contract termination?", back: "Whatever the survival and related clauses specify, which may include confidentiality, warranty/defects, records access, audit rights and transition-out duties. Check the executed contract and record the actual obligations and end dates." },

  { id: "cf50", moduleId: "handover", kind: "definition", front: "Is data in a business system a Commonwealth record?", back: "Yes. Information created or received in the course of Australian Government business is a Commonwealth record under the Archives Act 1983, wherever it is held." },
  { id: "cf51", moduleId: "handover", kind: "definition", front: "What does a records authority do?", back: "Gives permission to destroy, retain or transfer described records, and sets the minimum retention period. Destruction without authority is unauthorised." },
  { id: "cf52", moduleId: "handover", kind: "discrimination", front: "Continuing storage or continuing access?", back: "Access. A backup readable only by software the entity no longer licenses does not meet the obligation, and the gap is found when the data is requested." },
  { id: "cf53", moduleId: "handover", kind: "application", front: "Best long-term retention format at decommissioning", back: "Export to an open, documented format with the schema, code tables and a plain-English data dictionary. Not a database backup; not a VM snapshot." },
  { id: "cf54", moduleId: "handover", kind: "application", front: "What comes first in a decommissioning sequence?", back: "Sentence the records — what must be kept, how long, under which authority. Export scope and everything after it depends on that answer." },
  { id: "cf55", moduleId: "handover", kind: "application", front: "Why revoke integrations before deleting data?", back: "It is a reversible test. Whatever breaks is an undocumented dependency, and the system can still be turned back on — which it cannot once data is gone." },
  { id: "cf56", moduleId: "handover", kind: "discrimination", front: "The legacy system is still running. Closure report?", back: "State it: owner, cost, when it stops, and which system is the system of record. Two writable copies of the same data is a data-integrity failure." },
  { id: "cf57", moduleId: "handover", kind: "application", front: "Does migrating to a new system discharge the retention obligation?", back: "No. The obligation attaches to the information, not the system, and access must be maintained for the prescribed period across however many platforms." },

  { id: "cf58", moduleId: "benefits", kind: "discrimination", front: "Objective, business outcome, key result — what is the difference?", back: "Objective: what you set out to do. Outcome: the change that justified doing it. Key result: the measure telling you whether it happened. Report all three separately." },
  { id: "cf59", moduleId: "benefits", kind: "application", front: "Objective delivered, outcome did not move. Report it how?", back: "Separately, and prominently — it is the most informative result a closure report can carry, and it disappears the moment the three levels are merged into one sentence." },
  { id: "cf60", moduleId: "benefits", kind: "definition", front: "What is the document purpose section for?", back: "Naming the decisions this report supports and who must take them. Not 'this document reports on closure', which the title already said." },
  { id: "cf61", moduleId: "benefits", kind: "application", front: "Why does the project overview matter in three years?", back: "The reader will not know what the project was, what it was called internally, or which of four similar initiatives it is. Orientation is what makes the record findable." },
  { id: "cf62", moduleId: "benefits", kind: "discrimination", front: "Every milestone actual equals its planned date. Infer what?", back: "The plan was rebaselined until variance disappeared. Real delivery has variance; report against original dates as well as revised ones." },
  { id: "cf63", moduleId: "openitems", kind: "definition", front: "What is the outstanding items section actually for?", back: "It is a transfer document, not a status report. Every remaining risk, issue, dependency and action is accepted by someone named, or visibly abandoned." },
  { id: "cf64", moduleId: "openitems", kind: "application", front: "What must every outstanding item carry?", back: "Accepted accountability that survives the project, a destination register and a review date. Stronger practice identifies a named role-holder; an item left with the dissolving project team has not transferred." },
  { id: "cf65", moduleId: "openitems", kind: "discrimination", front: "An action assigned to the project team — what is wrong?", back: "The team is dissolving. An entity that will not exist cannot be chased. Reassign to an individual who remains, or close it." },
  { id: "cf66", moduleId: "openitems", kind: "application", front: "What belongs in the artefacts section?", back: "Each artefact with its location AND its owner — including architecture decisions, data dictionaries, test evidence, contracts and the benefits plan. Mark which are records with retention obligations." },
  { id: "cf67", moduleId: "openitems", kind: "definition", front: "What should be established before closure approval?", back: "Use the approved template's formal statements and evidence that transfers described as complete were accepted. Do not invent separate legal attestations for each signatory beyond the form and local delegations." },

  { id: "cf68", moduleId: "openitems", kind: "discrimination", front: "Lesson, recommendation, follow-on action — which is which?", back: "Lesson: for future projects anywhere. Recommendation: for this entity's process. Follow-on action: unfinished work from this project, with a named owner." },
  { id: "cf69", moduleId: "openitems", kind: "application", front: "An open issue marked 'ongoing' at closure", back: "'Ongoing' is not a state — it records that nobody decided. Closed, formally accepted, or a follow-on action with an owner and a date." },
  { id: "cf70", moduleId: "openitems", kind: "discrimination", front: "Quality or scope: 'all deliverables completed'?", back: "Scope. Quality asks whether it works under real conditions — defect counts and severities, load, accessibility conformance, security position." },
  { id: "cf71", moduleId: "openitems", kind: "application", front: "Where do known defects accepted into production belong?", back: "In the quality section, with severity and owner — not buried in the risk table where they read as things that might happen rather than things that did." },
  { id: "cf72", moduleId: "openitems", kind: "definition", front: "What are completion criteria?", back: "The conditions agreed at the start for calling the project done. Reporting against them is what stops closure being a matter of opinion. Mark each met, partial or waived — and by whom." },
  { id: "cf73", moduleId: "openitems", kind: "application", front: "What makes a team performance section useful?", back: "Resourcing model, vacancy and turnover, reliance on individuals, and what you would staff differently. Not a list of names and thanks." },
  { id: "cf74", moduleId: "openitems", kind: "discrimination", front: "Stakeholder feedback is unanimously positive. What should you check?", back: "Who was asked, response rate, method and whether negative themes were sought and retained. Unanimity is a quality-control signal, not proof that the sample or write-up was biased." },

  { id: "cf31", moduleId: "writing", kind: "application", front: "What belongs on page one?", back: "What was promised, what was delivered, and the gap. Not governance, not acknowledgements, not the financial position against a revised budget." },
  { id: "cf32", moduleId: "writing", kind: "definition", front: "The shortfall paragraph", back: "A single direct passage: what was not achieved, by how much against the original commitment, the cause, and where the lesson is recorded." },
  { id: "cf33", moduleId: "writing", kind: "discrimination", front: "'Broadly in line with expectations' — how is it read?", back: "As a miss, by an amount the writer chose not to state. Results that meet expectations are reported with the number." },
  { id: "cf34", moduleId: "writing", kind: "discrimination", front: "Why not pair a shortfall with a compensating success?", back: "It reads as deflection. The shortfall is not softened and the success now looks deployed defensively rather than reported on its merits." },
  { id: "cf35", moduleId: "writing", kind: "discrimination", front: "'Delivered within the revised budget' — what does a reader hear?", back: "Over the original budget. State it as delivered at $X against original $Y, revised to $Z with dates and reasons." },
  { id: "cf36", moduleId: "writing", kind: "application", front: "Why give shortfalls their own heading?", back: "Buried bad news reads as concealed bad news, and the reader then re-reads everything looking for what else was placed carefully." },

  { id: "cf37", moduleId: "accountability", kind: "definition", front: "Where can closure claims resurface?", back: "In corporate-plan and annual performance reporting, which can be audited, and in ANAO performance audits. Not every closure claim flows into an annual performance statement and not every statement is automatically audited." },
  { id: "cf38", moduleId: "accountability", kind: "definition", front: "The evidence chain", back: "Claim, method, data, definition, approval. Audit follows it until it reaches primary data or runs out." },
  { id: "cf39", moduleId: "accountability", kind: "application", front: "Where does the chain usually break?", back: "At the data. The source system was decommissioned and no extract was retained. The number was real and the evidence evaporated." },
  { id: "cf40", moduleId: "accountability", kind: "discrimination", front: "Dashboard or extract — which is durable evidence?", back: "The extract, with the query and the definition beside it. A dashboard depends on a workspace that may be deleted well inside the retention period." },
  { id: "cf41", moduleId: "accountability", kind: "application", front: "Why retain the metric definition with the data?", back: "The same metric defined two ways gives two answers. Without the definition a tester has a number and no way to know what it counts." },
  { id: "cf42", moduleId: "accountability", kind: "application", front: "Measurement runs nine months; the workspace is deleted in 30 days. What now?", back: "Establish a durable data source for the ongoing measurement and retain the baseline extract and method now, while they still exist." },
];

/* ------------------------------------------------------------------ *
 * Glossary
 * ------------------------------------------------------------------ */

export const closureGlossary: GlossaryEntry[] = [
  { term: "ASL", origin: "Government", moduleId: "financial", definition: "Average Staffing Level — the Commonwealth measure of staffing, reported per financial year alongside budget and actual expenditure on the Tier 3 closure form." },
  { term: "Asset Management (closure section)", origin: "Government", moduleId: "handover", definition: "Section 14 of the full template. Lists each asset the project developed and now in use, with a business owner, an IT owner, a location and the timing of handover. Two owners because the area that uses an asset and the area that keeps it running are rarely the same." },
  { term: "Assurance Approach", origin: "Government", moduleId: "accountability", definition: "The assurance artefact required of Tier 1 and Tier 2 projects, listed as a project management deliverable at closure. Tier 3 projects carry an Assurance Plan or Checklist instead." },
  { term: "Benefit Profile", origin: "Government", moduleId: "benefits", definition: "The artefact defining an individual benefit — what it is, how it will be measured and who owns it. Listed among the project management deliverables in the closure report." },
  { term: "CAPEX", origin: "General", moduleId: "financial", definition: "Capital expenditure — spend that produces an identifiable asset the entity controls. Reported separately from OPEX for each financial year in the closure financial summary, against approved budget and actual." },
  { term: "Change Register", origin: "Government", moduleId: "milestones", definition: "The record of every change request raised, with its decision. Attached to the closure report rather than summarised, because the summary is the section and the register is the evidence." },
  { term: "Closing the Gap", origin: "Government", moduleId: "lessons", definition: "One of the eighteen fixed lessons categories in the full closure template, asking what the project contributed and where it could improve. Present whether or not the project was aimed at First Nations outcomes." },
  { term: "Concept Definition", origin: "Government", moduleId: "deliverables", definition: "The earliest P3M artefact, preceding the business case. Listed among the project management deliverables in the closure report." },
  { term: "Document Control", origin: "Government", moduleId: "writing", definition: "The version table opening the full template — version, change description and date. Front matter rather than a numbered section, and the record of how the report itself was revised before approval." },
  { term: "Key Project Contacts", origin: "Government", moduleId: "accountability", definition: "The front-matter table naming the Senior Responsible Officer, the Project Manager and any other applicable roles, with responsibilities as defined in the P3M Framework." },
  { term: "OPEX", origin: "General", moduleId: "financial", definition: "Operating expenditure — spend consumed in the period rather than producing an asset. Reported separately from CAPEX for each financial year in the closure financial summary." },
  { term: "P3M Framework", origin: "Government", moduleId: "process", definition: "The department's Project, Program and Portfolio Management Framework. Defines project tiers, roles and the artefacts each tier must produce, including the closure report without which a project cannot formally close." },
  { term: "Portfolio Project Office (PPO)", origin: "Government", moduleId: "accountability", definition: "The departmental office that receives approved closure reports. It does not review them for approval or compliance; it aggregates them to identify trends, insights and emerging patterns for enterprise reporting." },
  { term: "Post Implementation Review (PIR)", origin: "Government", moduleId: "benefits", definition: "A review after delivery assessing outcomes and benefits realisation. Its timing, ownership and scope must be confirmed and assigned to the BAU team before closure is approved." },
  { term: "Project Management Office (PMO)", origin: "Government", moduleId: "accountability", definition: "The group-level office to which an approved closure report is submitted, alongside the Portfolio Project Office." },
  { term: "Project Management Hub", origin: "Government", moduleId: "process", definition: "The departmental intranet location holding the P3M Framework, the closure templates and supporting material." },
  { term: "Project Transition Plan", origin: "Government", moduleId: "handover", definition: "The artefact documenting transition planning and ongoing operational responsibilities. Required of Tier 1 and Tier 2 projects; Tier 3 projects record transition directly on the closure form." },
  { term: "RiskNet2", origin: "Government", moduleId: "openitems", definition: "The departmental risk system. The closure report cites the Risk Plan ID, and the Tier 3 form asks whether the plan is attached and whether any risk sits outside appetite or tolerance." },
  { term: "Senior User", origin: "Government", moduleId: "accountability", definition: "Also called the Business Owner. Signs the closure report for the receiving side — that what has been handed over is accepted and ongoing ownership is understood. The signature that makes the transition sections credible." },
  { term: "Tier (project)", origin: "Government", moduleId: "process", definition: "The P3M classification setting how much process applies. Tier 1 and Tier 2 carry the Assurance Approach, the Project Transition Plan and the full fifteen-section closure template; Tier 3 carries a lighter checklist and the simplified closure form." },
  { term: "Tolerance", origin: "Government", moduleId: "milestones", definition: "The room agreed in advance for a project to move on time, cost, quality, scope, benefits or risk before escalation is required. Reporting against tolerance says whether the control worked, not merely whether the number moved." },
  { term: "Annual performance statements", origin: "Government", moduleId: "accountability", definition: "The statements a Commonwealth entity publishes in its annual report about performance against its purposes. They can be audited at ministerial request or at the Auditor-General's discretion; they are not automatically audited in every entity and year." },
  { term: "Asserted claim", origin: "General", moduleId: "evidence", definition: "A statement resting on informed judgement with no measurement behind it. Legitimate in a closure report if labelled as such; corrosive if written in the same confident past tense as a measurement." },
  { term: "Assurance review", origin: "Government", moduleId: "purpose", definition: "A short, intensive independent review at a defined point in a proposal's lifecycle, providing the Senior Responsible Officer with advice and early identification of areas needing corrective action." },
  { term: "Baseline", origin: "General", moduleId: "evidence", definition: "The approved position against which delivery is measured. The useful one is the baseline approved when the investment decision was made, not the most recent revision." },
  { term: "Benefit owner", origin: "Government", moduleId: "benefits", definition: "The responsible business owner or area accountable for ongoing realisation and reporting. This course recommends recording an accountable role-holder, acceptance, influence over the driver and durable measurement; confirm whether local policy makes that stronger test mandatory." },
  { term: "Benefits realisation", origin: "Government", moduleId: "benefits", definition: "The whole-lifecycle process of achieving and measuring benefits promised in a business case. It may begin during delivery and commonly continues in the operational business after closure." },
  { term: "Benefits realisation management plan", origin: "Government", moduleId: "benefits", definition: "The document setting out what each benefit is, who owns it, how and when it will be measured, and what happens if it is not realised." },
  { term: "Closure report", origin: "Government", moduleId: "purpose", definition: "The record produced at the end of delivery stating what was promised, what was delivered, what it cost, what was learned, and who now owns everything that outlives the project." },
  { term: "Decommissioning", origin: "General", moduleId: "accountability", definition: "Retiring the systems and environments used during delivery. The most common cause of an evidence chain breaking, because the data supporting a benefit claim goes with the system." },
  { term: "Estimated claim", origin: "General", moduleId: "evidence", definition: "A figure derived from a model rather than measured. Sound practice when the assumptions it depends on are stated, so a reader can judge whether they still hold." },
  { term: "Evidence chain", origin: "General", moduleId: "accountability", definition: "Claim, method, data, definition, approval. What an auditor follows from a reported figure until they reach primary data or run out." },
  { term: "Forecast error", origin: "General", moduleId: "benefits", definition: "A shortfall caused by the original estimate being wrong rather than by delivery failing. Distinguishing the two is what makes a shortfall useful to the next business case." },
  { term: "Benefits Realisation review (Gateway Gate 5)", origin: "Government", moduleId: "purpose", definition: "The final Gateway review for projects. It assesses whether the investment is delivering the benefits and value for money identified in the business case and benefits plans, usually after an internal post-implementation review." },
  { term: "Gateway Review Process", origin: "Government", moduleId: "purpose", definition: "The Department of Finance process of independent reviews at critical points across a high-risk proposal's lifecycle, for non-corporate Commonwealth entities above defined financial thresholds." },
  { term: "Handover", origin: "General", moduleId: "handover", definition: "The transfer of operational support, change authority, run costs, residual risks, benefits measurement and records obligations from delivery to the receiving parts of the business." },
  { term: "Known fragility", origin: "General", moduleId: "handover", definition: "The parts of a delivered system the team knows are weak — timing dependencies, retry loops and unexplained configuration. These can be under-documented when disclosure feels risky, even though operations needs them recorded." },
  { term: "Lessons learned", origin: "Government", moduleId: "lessons", definition: "Transferable findings from delivery. Usable only when they carry context, a specific event with magnitude, a cost, and an action a future team could put in a plan." },
  { term: "Measured claim", origin: "General", moduleId: "evidence", definition: "A figure from data collected before and after, using the same definition both times. The only kind of claim that supports itself without qualification." },
  { term: "New Policy Proposal", origin: "Government", moduleId: "purpose", definition: "A proposal put to Government for funding. Where high risk and above the financial thresholds, Finance may recommend it be subject to the Gateway Review Process." },
  { term: "PGPA Act", origin: "Government", moduleId: "accountability", definition: "The Public Governance, Performance and Accountability Act 2013, which establishes the Commonwealth performance framework requiring entities to measure and report performance against their purposes." },
  { term: "Post-implementation review", origin: "Government", moduleId: "benefits", definition: "An internal review after implementation that tests performance, benefits and lessons. Its findings may inform a later Gateway Benefits Realisation review; the two reviews are not the same." },
  { term: "Capitalisation", origin: "Government", moduleId: "financial", definition: "Recording qualifying expenditure as part of an asset. AASB 138 and RMG 109 expense research and option-selection costs and training; directly attributable development costs must meet recognition tests. Post-go-live work is assessed as maintenance/repair or a qualifying enhancement, not classified by timing alone." },
  { term: "Commonwealth record", origin: "Government", moduleId: "handover", definition: "Information created or received in the course of Australian Government business, including data inside a business system. Governed by the Archives Act 1983; cannot be destroyed without authority." },
  { term: "Continuing access", origin: "Government", moduleId: "handover", definition: "The obligation to keep retained records readable for the prescribed period — not merely stored. A backup requiring software the entity no longer licenses does not satisfy it." },
  { term: "Defects liability period", origin: "General", moduleId: "financial", definition: "A contract-defined period during which specified defect-remedy obligations apply. Its trigger, scope and end date come from the executed agreement, not a universal final-acceptance rule." },
  { term: "Final acceptance", origin: "General", moduleId: "financial", definition: "The formal act of accepting contracted deliverables under the executed agreement. Its effects on payment, warranty, retention, title and defects are contract-specific and must be checked rather than assumed." },
  { term: "Business outcome", origin: "Government", moduleId: "benefits", definition: "The change in the world that justified the investment, as distinct from what the project set out to build. Reported with its baseline, and often the place where a delivered objective turns out not to have moved anything." },
  { term: "Closure agreement", origin: "General", moduleId: "openitems", definition: "The documented approval that ends the project under the applicable local process. It should establish the status of transfers, open items and continuing accountabilities rather than merely record that delivery stopped." },
  { term: "Key result", origin: "General", moduleId: "benefits", definition: "The measure that shows whether a business outcome occurred. Carries a target and an actual; without a target it was a metric, not a key result." },
  { term: "Objective", origin: "General", moduleId: "benefits", definition: "What the project set out to do, quoted as originally written. Achievement of an objective is not achievement of the outcome that justified it." },
  { term: "Project artefacts", origin: "General", moduleId: "openitems", definition: "The outputs a project leaves behind — architecture decisions, data dictionaries, test evidence, contracts, benefits plans. Indexed with location and owner so a stranger can find them." },
  { term: "RAID", origin: "General", moduleId: "openitems", definition: "Risks, assumptions, issues and dependencies. At closure it stops being a status log and becomes a transfer table: every open item accepted by a named person or visibly abandoned." },
  { term: "Completion criteria", origin: "General", moduleId: "openitems", definition: "The conditions agreed at the outset for calling the project done. Reported at closure as met, partially met or waived — with who waived them — so that closure is a test rather than an opinion." },
  { term: "Follow-on action recommendation", origin: "General", moduleId: "openitems", definition: "Unfinished work carried out of a closing project to a named owner with a date. The discipline is that every open issue at closure is closed, formally accepted, or converted to one — there is no 'ongoing'." },
  { term: "Recommendation", origin: "General", moduleId: "openitems", definition: "A proposal directed at this entity about how it works, as distinct from a lesson aimed at future projects. A recommendation that changes a control is often the most valuable line in a closure report." },
  { term: "Assurance Plan", origin: "Government", moduleId: "accountability", definition: "The plan agreed with the Digital Transformation Agency setting out the internal and external assurance activities a digital or ICT-enabled project will undergo. The closure report must record their completion — this is criterion 5 of the closure reporting standard." },
  { term: "Benefits management plan", origin: "Government", moduleId: "benefits", definition: "The artefact recording each benefit, its owner, how and when it will be measured. Criterion 3 of the closure reporting standard measures the report against this plan, not against the business case narrative." },
  { term: "Closure reporting standard", origin: "Government", moduleId: "purpose", definition: "The DTA standard for closure reports on Australian Government digital and ICT-enabled projects. Seven criteria, each self-assessed by the agency as Strong, Emerging or Nil before the report is finalised." },
  { term: "Investment Oversight Framework", origin: "Government", moduleId: "purpose", definition: "The whole-of-government framework tiering digital and ICT investments by size and complexity. Its Tier 1/2/3 language must not be conflated with the department's P3M tiering when choosing the internal closure form, even where labels align." },
  { term: "Movement of Funds", origin: "Government", moduleId: "financial", definition: "A request to move approved funding between financial years. Named explicitly in the closure reporting standard: a Strong budget criterion gives the rationale for each such change and its impact, including on the wider agency." },
  { term: "Strong, Emerging, Nil", origin: "Government", moduleId: "purpose", definition: "The three ratings in the closure reporting standard's self-assessment. Nil means the criterion is not addressed; Emerging records what happened; Strong explains why it happened and what followed from it." },
  { term: "Sustainment funding", origin: "Government", moduleId: "handover", definition: "The ongoing funding to operate and support what was delivered, after project funding ends. Required for a Strong rating on the transition criterion, alongside the impact of handing incomplete work to business as usual." },
  { term: "Records authority", origin: "Government", moduleId: "handover", definition: "An instrument issued by the National Archives giving permission to destroy, retain or transfer described records, and setting minimum retention periods." },
  { term: "Sentencing", origin: "Government", moduleId: "handover", definition: "Determining, against a records authority, which records must be kept, for how long, destroyed, or transferred. The first step in any decommissioning, because everything else depends on the answer." },
  { term: "System of record", origin: "General", moduleId: "handover", definition: "The authoritative source for a given set of data. Must be named explicitly when a replaced system stays running, or staff cannot know which copy governs." },
  { term: "Transition-out obligations", origin: "General", moduleId: "financial", definition: "What a supplier must still do after the engagement ends — deliver source code and documentation, support handover, provide records access. Frequently unenforced because nobody records the deadline." },
  { term: "Work in progress", origin: "Government", moduleId: "financial", definition: "Costs accumulated against a project not yet transferred to an asset or an expense. Left uncleared at closure it becomes an unexplained balance nobody can resolve later." },
  { term: "Reference class data", origin: "General", moduleId: "lessons", definition: "Pooled estimate-versus-actual figures across comparable projects, used to forecast new work from what similar work actually cost rather than from what a team hopes." },
  { term: "Residual risk", origin: "General", moduleId: "handover", definition: "A risk that survives closure. Must transfer to a named owner in the entity's risk register, or it disappears from view without disappearing from existence." },
  { term: "Retention", origin: "Government", moduleId: "accountability", definition: "Keeping the extract, method and definition behind a reported figure for long enough that the claim can still be tested. A design decision at closure, not an afterthought." },
  { term: "RMG 106", origin: "Government", moduleId: "purpose", definition: "Finance's Guidance on the Assurance Reviews Process — the operating guidance for Gateway, including the gates and what the Senior Responsible Officer is accountable for." },
  { term: "RMG 134", origin: "Government", moduleId: "accountability", definition: "Finance's guidance on annual performance statements for Commonwealth entities, including record keeping and the circumstances in which statements can be audited." },
  { term: "Run cost", origin: "General", moduleId: "handover", definition: "The recurring cost of operating a delivered system — licences, hosting, support. Must transfer to a funded budget line with a named holder, or a renewal lapses." },
  { term: "Senior Responsible Officer", origin: "Government", moduleId: "purpose", definition: "The individual accountable for the proposal and recipient of Gateway assurance. At closure the SRO must ensure ongoing benefit ownership and review arrangements are assigned; the post-closure accountability structure then follows the approved local governance rather than an assumed universal model." },
  { term: "Shortfall paragraph", origin: "General", moduleId: "writing", definition: "A direct passage stating what was not achieved, by how much against the original commitment, why, and where the lesson is recorded — unaccompanied by a compensating success." },
  { term: "Traceability", origin: "General", moduleId: "evidence", definition: "The property of a claim that lets a reader who was not there reach the underlying data without asking you: named source, period, sample and definition." },
];

/* ------------------------------------------------------------------ *
 * Contrasts — good versus usual
 * ------------------------------------------------------------------ */

export const closureContrasts: Contrast[] = [
  {
    moduleId: "process",
    good: "Each checklist item is closed by someone outside the project agreeing to it, and the report records who and when.",
    usual: "The report is drafted first and the checklist ticked against what the report says.",
    tell: "Pick any 'has been transferred' sentence and ask who accepted it. If the answer is a branch rather than a person, nothing was transferred.",
  },
  {
    moduleId: "deliverables",
    good: "Planned deliverables are quoted from the approved business case, and anything short of complete is marked Partially achieved with the gap named.",
    usual: "Deliverables are listed from the current plan and marked Achieved, with shortfalls explained in the comments column.",
    tell: "Count the Achieved rows that carry a caveat. Each one should have been Partially achieved.",
  },
  {
    moduleId: "milestones",
    good: "Variance is shown against the original baseline and the current one, with each rebaseline dated and attributed to the forum that approved it.",
    usual: "Milestones are shown against the latest baseline, so the table reports almost no variance.",
    tell: "If every milestone was met, ask when the baseline was last moved and by whom.",
  },
  {
    moduleId: "purpose",
    good: "The report names the decision each reader will make with it, and answers that decision on page one.",
    usual: "The report follows the template section order and answers whatever the template asked.",
    tell: "Ask what decision changes if this report says something different. If nothing changes, it is a filing exercise.",
  },
  {
    moduleId: "evidence",
    good: "Every claim is marked measured, estimated or asserted, and the measured ones cite definition, period and source.",
    usual: "Every claim is written in the same confident past tense, and the reader cannot tell which are which.",
    tell: "Pick the strongest sentence in the report and ask where the number came from. If it takes more than one hop, it is not traceable.",
  },
  {
    moduleId: "benefits",
    good: "Each benefit names the locally required responsible area and, as stronger recommended practice, an accountable role-holder who has agreed, can influence the driver, and has a durable measurement.",
    usual: "Benefits are assigned to branches or groups, and measurement is scheduled into a plan nobody will hold.",
    tell: "Ask who will be asked about this benefit in eighteen months. If the answer is a team name, nobody will be asked.",
  },
  {
    moduleId: "lessons",
    good: "Lessons carry context, magnitude, cost and an action, and are published where someone with that problem would search.",
    usual: "Lessons are sentiments in a register organised by project, generated in a workshop on the final day.",
    tell: "Read a lesson and ask what you would do differently tomorrow. If nothing, it is a category label.",
  },
  {
    moduleId: "handover",
    good: "The receiving team has already made a change without the delivery team present, and the gaps that surfaced were closed.",
    usual: "A handover pack was delivered and a walkthrough held, and the delivery lead is still answering messages.",
    tell: "Ask the receiving team who they contacted last time something went wrong. If it is someone who has left, the handover has not happened.",
  },
  {
    moduleId: "financial",
    good: "Every commitment is settled or accrued, and every surviving obligation has an end date and a named holder.",
    usual: "Spending stopped, the PO was left open, and the warranty end date exists only in the contract PDF.",
    tell: "Ask who holds the warranty and when it ends. If nobody can answer in a minute, it will expire unnoticed.",
  },
  {
    moduleId: "handover",
    good: "Records were sentenced against an authority, exported with their schema and dictionary, and verified before anything was deleted.",
    usual: "The data was backed up, the subscription was cancelled, and the retention question was never asked.",
    tell: "Ask what happens if someone requests this data in five years. If the answer needs software you no longer license, you have storage, not access.",
  },
  {
    moduleId: "benefits",
    good: "Objective, business outcome and key result are reported separately, so a delivered objective with a flat outcome is visible.",
    usual: "One sentence covers all three, at whichever level of abstraction flatters the result.",
    tell: "Ask what changed for users, then ask what was built. If the same sentence answers both, the levels have been merged.",
  },
  {
    moduleId: "openitems",
    good: "Every outstanding risk, issue, dependency and action names an individual, a destination register and a review date.",
    usual: "The RAID log is pasted in with closed items filtered out, and the survivors are owned by branches.",
    tell: "Pick the third item in the list and ask who will be asked about it in March. If the answer is a team name, it has not transferred.",
  },
  {
    moduleId: "writing",
    good: "The shortfall has its own heading, its own figures against the original commitment, and no compensating success beside it.",
    usual: "Misses are distributed through the narrative in hedged language, and the budget is reported against the revision.",
    tell: "Search the document for 'broadly', 'largely' and 'revised'. Each one marks a number somebody chose not to state.",
  },
  {
    moduleId: "accountability",
    good: "The extract, the query and the definition are retained with a named holder, and would answer an audit in two years.",
    usual: "The claim is supported by a dashboard in a workspace scheduled for deletion, and an email from the analyst.",
    tell: "Ask what would answer this question after the system is turned off. If the answer is a person, it is not evidence.",
  },
];

/* ------------------------------------------------------------------ *
 * Diagnostic
 * ------------------------------------------------------------------ */

export const closureDiagnostic: Question[] = [
  {
    id: "cd-process",
    moduleId: "process",
    prompt: "Before a project can be formally closed, what has to have happened to its deliverables?",
    options: [
      "Accepted by the BAU teams that will own them",
      "Completed and signed off by the project manager",
      "Listed in the closure report with delivery dates",
      "Verified against the business case by the group PMO",
    ],
    answer: 0,
    rationale:
      "The checklist asks for formal acceptance by the receiving side. Completion is the project's own view; acceptance is somebody else's.",
    optionNotes: [
      "",
      "The project confirming its own work is not acceptance.",
      "Listing them records an intention to hand over, not a handover.",
      "The PMO receives the report and does not verify deliverables.",
    ],
  },
  {
    id: "cd-deliverables",
    moduleId: "deliverables",
    prompt: "The closure template asks about deliverables in two separate sections. What distinguishes them?",
    options: [
      "Artefacts governance required, against what the project built",
      "Documents completed, against documents still outstanding",
      "Deliverables inside scope, against those added by change request",
      "Items delivered on time, against those delivered late",
    ],
    answer: 0,
    rationale:
      "Project management deliverables are the framework's artefacts — plans, registers, profiles. Project-specific deliverables are the goods or services the project existed to produce.",
    optionNotes: [
      "",
      "Both sections cover completed work; outstanding items belong elsewhere.",
      "Scope changes are recorded in change control, not by splitting the tables.",
      "Timeliness is reported in the milestones section.",
    ],
  },
  {
    id: "cd-milestones",
    moduleId: "milestones",
    prompt: "A project was rebaselined twice, both times with approval. Which schedule variance does the closure report show?",
    options: [
      "Both — against the original baseline and the current one",
      "Against the current baseline, since the changes were approved",
      "Against the original baseline only, as the funded commitment",
      "Neither, provided each rebaseline has an approval reference",
    ],
    answer: 0,
    rationale:
      "One shows whether recent management held; the other shows what the original commitment cost in time. Either alone is misleading.",
    optionNotes: [
      "",
      "Approval makes the movement legitimate without making it invisible.",
      "Honest, but it reads as blame with no mention of the approvals.",
      "Approval references explain variance; they do not replace reporting it.",
    ],
  },
  {
    id: "cd1",
    moduleId: "purpose",
    prompt: "What is the primary purpose of the Gateway Benefits Realisation review?",
    options: [
      "Whether the investment delivered its purpose and benefits",
      "To confirm the project delivered agreed scope within the revised budget",
      "To verify that the entity followed its approved project methodology",
      "To finalise asset recognition in the financial statements",
    ],
    answer: 0,
    rationale: "The Benefits Realisation review tests outcomes, benefits and value for money. Self-reported scope delivery is not enough to show that an investment achieved its purpose.",
    optionNotes: [
      "",
      "Scope, budget and schedule describe delivery performance, not whether the investment produced its intended value.",
      "Method compliance may support assurance but is not the review's primary benefits question.",
      "Asset recognition is a financial reporting decision rather than the purpose of this Gateway review.",
    ],
  },
  {
    id: "cd2",
    moduleId: "evidence",
    prompt: "A closure report claims a 40 per cent improvement. What makes it testable?",
    options: [
      "The metric definition, the periods compared, and source",
      "Sign-off by the project sponsor and the delivery lead",
      "Expressing the change in absolute rather than percentage terms",
      "A statement that the figure was validated internally",
    ],
    answer: 0,
    rationale: "Testability means a stranger can reproduce the figure. Attestations tell you who to ask; they do not let anyone check.",
    optionNotes: [
      "",
      "Sign-off identifies approvers but does not supply the data, definition or comparison window.",
      "Absolute figures can still be untestable when the source and method are missing.",
      "Internal validation is an assertion unless the evidence and method can be followed.",
    ],
  },
  {
    id: "cd3",
    moduleId: "benefits",
    prompt: "Why must closure report benefit progress and transfer the remaining arrangements?",
    options: [
      "Some benefits may begin during delivery, while remaining realisation and measurement continue after the project team disperses",
      "Project teams are not permitted to hold post-delivery accountabilities",
      "Finance requires benefit ownership to sit with a business area",
      "Delivery teams lack the analytical capability to measure benefits",
    ],
    answer: 0,
    rationale: "Benefits realisation is a whole-lifecycle process. Closure records what has already been realised and transfers ownership, measurement and dependencies for the benefits that remain.",
    optionNotes: [
      "",
      "There is no general prohibition; the issue is that the temporary team is dispersing and durable arrangements are needed.",
      "Finance does not impose one universal ownership structure for every benefit and entity.",
      "Capability is not the reason for transfer; continuing authority, accountability and measurement are.",
    ],
  },
  {
    id: "cd4",
    moduleId: "lessons",
    prompt: "Which is a usable lesson?",
    options: [
      "State approvals took 11 weeks, found in week 3; start them before design",
      "Stakeholder engagement should commence earlier in the delivery lifecycle",
      "Requirements definition was a challenge throughout the project",
      "Better communication between delivery and policy areas is needed",
    ],
    answer: 0,
    rationale: "Context, magnitude, discovery point and an action a reader can put in a plan. The others are the categories under which lessons would sit, if any had been written.",
    optionNotes: [
      "",
      "This names a broad aspiration but not which stakeholders, how early or what consequence followed.",
      "This is a topic heading without a specific event, magnitude, cost or action.",
      "This does not identify the communication failure or a decision a future team can change.",
    ],
  },
  {
    id: "cd5",
    moduleId: "handover",
    prompt: "What is the strongest test that a handover is complete?",
    options: [
      "The receiving team can work without anyone who has left",
      "A handover document has been signed by both managers",
      "The receiving team attended a full system walkthrough",
      "All documentation is in the operational repository",
    ],
    answer: 0,
    rationale: "The other three can all be true while the receiving team remains unable to act. Capability without the original team is the only test that matters.",
    optionNotes: [
      "",
      "A signature records an event; it does not demonstrate operational capability.",
      "Attendance does not show that the receiving team can diagnose, operate or change the service.",
      "Documentation is necessary but its presence does not prove that it is complete or usable.",
    ],
  },
  {
    id: "cd6",
    moduleId: "writing",
    prompt: "An experienced reader sees 'delivered within the revised budget'. What do they conclude?",
    options: [
      "The project exceeded its original approved budget",
      "The budget was managed carefully throughout delivery",
      "A formal variation was approved by the appropriate delegate",
      "The final cost was below the most recent forecast",
    ],
    answer: 0,
    rationale: "The construction exists to report a favourable comparison against a number that moved. Readers who have seen it before go straight to the original.",
    optionNotes: [
      "",
      "The phrase alone says nothing about how carefully the revised budget was managed.",
      "A revision should have authority, but this wording does not establish who approved it or why.",
      "Performance against the latest forecast cannot be inferred from performance against a revised budget.",
    ],
  },
  {
    id: "cd7",
    moduleId: "accountability",
    prompt: "Where does an evidence chain most commonly break?",
    options: [
      "The data — the system was decommissioned, no extract kept",
      "The approval — nobody would sign off the figure",
      "The claim — it was too specific to defend",
      "The method — the calculation was too complex to reproduce",
    ],
    answer: 0,
    rationale: "The usual failure is evaporation rather than falsification. The analysis was done and the thing it drew on no longer exists.",
    optionNotes: [
      "",
      "Approval can be missing, but it is not the characteristic evidence-loss failure described here.",
      "Specificity normally improves testability rather than breaking the evidence chain.",
      "A complex method can still be reproducible when it is documented and its inputs are retained.",
    ],
  },
  {
    id: "cd9",
    moduleId: "handover",
    prompt: "A cloud subscription lapses, deleting eleven years of case data. What has happened?",
    options: [
      "Commonwealth records were destroyed without authority",
      "A procurement failure occurred, with data loss as a side effect",
      "Nothing improper, as no retention period had been specified",
      "A technical incident requiring incident management",
    ],
    answer: 0,
    rationale: "Data in a government business system is a Commonwealth record under the Archives Act. Nobody decided to destroy it, which is exactly why the control failed.",
    optionNotes: [
      "",
      "Procurement control may also have failed, but the direct legal problem is unauthorised destruction of Commonwealth records.",
      "Silence about retention is not permission to destroy; disposal requires authority.",
      "Incident management may be required, but it does not fully classify the records-control failure.",
    ],
  },
  {
    id: "cd10",
    moduleId: "financial",
    prompt: "What determines the consequences of signing final acceptance?",
    options: [
      "The executed contract's acceptance, payment, warranty, retention, title and defects clauses",
      "The Commonwealth Procurement Rules apply one standard consequence to every contract",
      "The supplier's preferred invoicing date",
      "The project's planned closure date",
    ],
    answer: 0,
    rationale: "Acceptance is substantive, but its consequences are contractual rather than universal. Read the executed clauses and preserve the entity's actual rights.",
    optionNotes: [
      "",
      "The procurement framework does not impose one acceptance consequence on every executed agreement.",
      "Supplier convenience does not determine the entity's contractual rights or obligations.",
      "The project schedule cannot override the executed acceptance mechanism.",
    ],
  },
  {
    id: "cd11",
    moduleId: "openitems",
    prompt: "What is the outstanding risks, issues and dependencies section for at closure?",
    options: [
      "Recording whether each item is closed, formally accepted by BAU, or becomes a follow-on action with an owner and date",
      "Reporting the current status of the project risk register",
      "Demonstrating that risk management was performed throughout delivery",
      "Listing items for the successor project to consider",
    ],
    answer: 0,
    rationale: "It is a closure and transfer record, not merely a status report. Every unresolved item needs accepted accountability or an explicit follow-on action rather than an ownerless 'ongoing' label.",
    optionNotes: [
      "",
      "Current status is necessary but does not settle what happens after the project closes.",
      "The delivery history belongs in the assurance account; this section must resolve continuing accountability.",
      "A successor project may not exist, and 'consider' does not assign an accountable action.",
    ],
  },
  {
    id: "cd8",
    moduleId: "benefits",
    prompt: "A benefit is assigned to 'the Service Delivery Group' with no recorded acceptance. What is missing?",
    options: [
      "Evidence that the responsible area accepted it, plus an accountable role-holder where local governance uses one and a durable measure",
      "A rule that Service Delivery can never own benefits",
      "Transfer of every benefit directly to the Senior Responsible Officer",
      "Joint accountability shared equally across all delivery and operations teams",
    ],
    answer: 0,
    rationale: "The departmental sources use business-area and Business Owner language. The stronger course practice is to make acceptance and actionable accountability explicit without mislabelling that enhancement as a universal named-individual requirement.",
    optionNotes: [
      "",
      "Service Delivery may be the right area; the defect is the absence of accepted, actionable accountability.",
      "The SRO must ensure arrangements are assigned but does not automatically become owner of every benefit.",
      "Contributors can share delivery work, but diffuse joint accountability leaves no clear decision-holder.",
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Supplementary questions
 * ------------------------------------------------------------------ */

export const closureSupplementary: Question[] = [
  {
    id: "cs-pr1",
    moduleId: "process",
    prompt: "Where do lessons from a closed project have to be recorded?",
    options: [
      "The Departmental Lessons Learned Register",
      "The closure report, which the PPO then indexes",
      "The group PMO's project archive",
      "The project's own SharePoint, linked from the report",
    ],
    answer: 0,
    rationale:
      "The register is a separate destination from the report. Submitting the report does not lodge the lessons, and the register is where other projects find them.",
    optionNotes: [
      "",
      "The PPO aggregates reports for trends; it does not index lessons into the register for you.",
      "The PMO receives the report, not the lessons.",
      "A project archive disappears with the project.",
    ],
  },
  {
    id: "cs-pr2",
    moduleId: "process",
    prompt: "A Tier 3 project has SRO approval and the form is filed in the team's SharePoint. What remains outstanding?",
    options: [
      "Submission to the group PMO and the PPO",
      "Nothing — Tier 3 closes on SRO approval",
      "Project Board endorsement, required at every tier",
      "A Project Transition Plan for the BAU handover",
    ],
    answer: 0,
    rationale:
      "Filing locally is not submission. Every tier submits the approved report to the group PMO and the Portfolio Project Office.",
    optionNotes: [
      "",
      "Approval is necessary and not sufficient; the report still has to go somewhere.",
      "Board endorsement applies where required, not universally.",
      "The Transition Plan is scoped to Tier 1 and Tier 2.",
    ],
  },
  {
    id: "cs-d1",
    moduleId: "deliverables",
    prompt: "A Privacy Impact Assessment was completed after go-live. How does it appear in the deliverables table?",
    options: [
      "Listed with its actual date, noting it followed release",
      "Listed with the go-live date, since both fell in the same quarter",
      "Omitted, as it was not produced within the planned schedule",
      "Listed as delivered, with the timing raised under lessons instead",
    ],
    answer: 0,
    rationale:
      "The date is the finding. A privacy assessment completed after release is exactly what the record exists to surface.",
    optionNotes: [
      "",
      "Aligning the dates removes the only detail that matters.",
      "It was produced, and it is a listed core artefact.",
      "The lessons entry needs the table row as its evidence.",
    ],
  },
  {
    id: "cs-d2",
    moduleId: "deliverables",
    prompt: "A dashboard went live with two of five planned views. Which Tier 3 status applies?",
    options: [
      "Partially achieved",
      "Achieved, with the missing views in comments",
      "Not achieved, since it was not delivered as planned",
      "Achieved, because it is in use and delivering value",
    ],
    answer: 0,
    rationale:
      "The status is what gets aggregated across the department; comments are what gets skipped. Partially achieved is the honest and durable answer.",
    optionNotes: [
      "",
      "A caveat in a comments column does not survive skim-reading.",
      "Two working views is not nothing, and this overstates the shortfall.",
      "Useful and complete are different claims.",
    ],
  },
  {
    id: "cs-m1",
    moduleId: "milestones",
    prompt: "What does attaching the Change Register add that the change control section cannot?",
    options: [
      "The evidence behind the summary, including rejected changes",
      "A reconciliation between approved changes and the budget variance",
      "Confirmation that each change was approved by the Project Board",
      "The audit trail required before the SRO can approve closure",
    ],
    answer: 0,
    rationale:
      "The section summarises how change was managed. The register is the underlying record, and it is where decisions to refuse a change are visible.",
    optionNotes: [
      "",
      "Budget reconciliation belongs in the financial summary.",
      "The register records the decision-maker, which is not always the Board.",
      "SRO approval does not depend on the register being attached.",
    ],
  },
  {
    id: "cs1",
    moduleId: "purpose",
    prompt: "A project has a total cost of $34m including an ICT component of $11m. Is it inside the Gateway thresholds?",
    options: [
      "Yes — it exceeds $30m in total with an ICT component of at least $10m",
      "No — the total is below the $50m threshold that applies to ICT work",
      "No — only the ICT component counts, and $11m is below the $30m test",
      "Yes — any proposal with an ICT component above $10m is captured",
    ],
    answer: 0,
    rationale: "The test is $30m total with an ICT component of at least $10m. Both limbs are met. The $50m figure applies to programs.",
    optionNotes: ["", "The $50m threshold is for programs, not for ICT work generally.", "The $30m test applies to the total, with the ICT component as a second limb.", "The ICT limb does not stand alone — the total must also exceed $30m."],
  },
  {
    id: "cs2",
    moduleId: "evidence",
    prompt: "Which is the strongest form of a benefit claim?",
    options: [
      "Measured: median fell from 14 to 9 days (Q1 vs Q3 2026, n=4,102)",
      "Processing time improved substantially following the release",
      "Time to decision was reduced by approximately one third",
      "The delivery team confirmed a significant reduction in processing time",
    ],
    answer: 0,
    rationale: "It names its kind, its magnitude, its periods, its sample and its source. Everything needed to check it is present.",
    optionNotes: ["", "'Substantially' is unquantified and untestable.", "'Approximately' conceals whether this was measured or modelled.", "Team confirmation is an attestation, not evidence."],
  },
  {
    id: "cs3",
    moduleId: "evidence",
    prompt: "What should a report do when the original baseline was never formally approved?",
    options: [
      "Disclose that no approved baseline exists, and mark comparisons",
      "Use the earliest available planning figure and present it as the baseline",
      "Report only against the final approved revision",
      "Omit baseline comparison and report absolute outcomes only",
    ],
    answer: 0,
    rationale: "The absence is itself a finding worth recording, and it determines how every comparison in the document must be labelled.",
    optionNotes: ["", "Presenting a planning figure as an approved baseline misrepresents its standing.", "This answers an easier question than the one the reader has.", "Omission loses information that the next team needs."],
  },
  {
    id: "cs4",
    moduleId: "benefits",
    prompt: "Which arrangement makes a post-implementation review most likely to happen?",
    options: [
      "Anchored to an existing governance committee using data already reported",
      "Scheduled as a standalone milestone in the project's closure plan",
      "Assigned to the delivery lead to convene after they move to their next role",
      "Recorded as an action in the closure report for future follow-up",
    ],
    answer: 0,
    rationale: "Durability comes from riding on things that exist for independent reasons. Everything else depends on someone remembering.",
    optionNotes: ["", "A closure plan stops being read once the project closes.", "The delivery lead will have no standing or time in the new role.", "An unowned action in a filed document is not a mechanism."],
  },
  {
    id: "cs5",
    moduleId: "benefits",
    prompt: "A forecast $5m benefit is measuring at $2m, and the cause is lower take-up than forecast. What should be recorded for future value?",
    options: [
      "How take-up was forecast and why the comparator was wrong",
      "A revised benefit figure of $2m replacing the original forecast",
      "A statement that delivery met its specification and is not at fault",
      "A remediation plan to raise take-up toward the original forecast",
    ],
    answer: 0,
    rationale: "The forecasting method will be reused; the number will not. Capturing the method error is what stops it recurring on the next business case.",
    optionNotes: ["", "Necessary bookkeeping that discards the cause.", "True, and defensive — it closes the enquiry where it becomes useful.", "Possibly worthwhile, and it does nothing for the next forecast."],
  },
  {
    id: "cs6",
    moduleId: "lessons",
    prompt: "Why record a ratio rather than an absolute overrun?",
    options: [
      "A ratio transfers across project sizes; an absolute does not",
      "Ratios are less sensitive and easier to publish across entities",
      "Absolute figures require financial approval before release",
      "Ratios are more accurate than absolute measurements",
    ],
    answer: 0,
    rationale: "A team with a $200k integration cannot apply an $840k overrun. They can apply a 3.2× miss.",
    optionNotes: ["", "Sensitivity is a side consideration, not the reason.", "No such approval requirement generally applies.", "A ratio is derived from absolutes and is no more accurate."],
  },
  {
    id: "cs7",
    moduleId: "lessons",
    prompt: "What most limits the value of well-written lessons stored in a project's own folder?",
    options: [
      "Readers search by problem, not by a project name they never heard",
      "Project folders are usually subject to restrictive access permissions",
      "Lessons lose relevance once the project's technology is superseded",
      "Closure report appendices are treated as non-authoritative",
    ],
    answer: 0,
    rationale: "Discoverability is binding. Undiscoverable good lessons perform identically to bad ones.",
    optionNotes: ["", "A fixable technicality, and access is worthless without discovery.", "Some decay is real; the immediate failure is that nobody finds them.", "A convention that would not matter if anyone were reading."],
  },
  {
    id: "cs8",
    moduleId: "handover",
    prompt: "What is the most useful way to discover handover gaps before closure?",
    options: [
      "Have the receiving team make a routine change, delivery team away",
      "Review the handover documentation against a completeness checklist",
      "Hold an extended walkthrough session covering all system components",
      "Ask the receiving team whether they feel prepared to take over",
    ],
    answer: 0,
    rationale: "A performance test surfaces the dependencies people do not know they have. Checklists, walkthroughs and self-assessment all miss what nobody thought to write down.",
    optionNotes: ["", "A checklist confirms documents exist, not that they are sufficient.", "Walkthroughs demonstrate exposure, not readiness.", "People cannot report a dependency they are unaware of."],
  },
  {
    id: "cs9",
    moduleId: "handover",
    prompt: "Which residual item most often goes unassigned at closure?",
    options: [
      "Run costs and licence renewals, which need a funded budget line",
      "Operational support, which the service desk assumes by default",
      "Change authority, which passes to the platform owner automatically",
      "Records obligations, which information governance manages centrally",
    ],
    answer: 0,
    rationale: "Support and change tend to land somewhere by default. A recurring cost needs a budget holder to actively accept it, which is a step people skip.",
    optionNotes: ["", "Service desks generally do pick this up, if imperfectly.", "Change authority is often assumed, though rarely funded.", "Central management gives it a default home, unlike a budget line."],
  },
  {
    id: "cs10",
    moduleId: "writing",
    prompt: "Which sentence would an auditor test first?",
    options: [
      "The project was successfully delivered broadly in line with expectations",
      "Delivered at $51m against an original approved budget of $38m, revised twice",
      "Take-up reached 41 per cent against a forecast of 85 per cent",
      "Median processing time fell from 14 to 9 days between Q1 and Q3 2026",
    ],
    answer: 0,
    rationale: "Two hedges in one sentence, and no number. It is the sentence that signals a claim weaker than it appears, and testers go there first.",
    optionNotes: ["", "Uncomfortable and precise — nothing here invites suspicion.", "A disclosed shortfall with figures, which reads as candour.", "Specific, dated and checkable."],
  },
  {
    id: "cs11",
    moduleId: "writing",
    prompt: "Why report performance against both original and final baselines?",
    options: [
      "The gap between them is itself decision-relevant",
      "Departmental reporting standards require both figures",
      "It demonstrates that variations were properly approved",
      "Original baselines are more accurate than revisions",
    ],
    answer: 0,
    rationale: "The investment decision was made against the original. How far the delivered thing moved from the approved thing is what the reader needs.",
    optionNotes: ["", "Standards vary and would not explain why the practice is right.", "Approval of variations is a separate matter.", "Revisions are often more accurate; that is not the point."],
  },
  {
    id: "cs12",
    moduleId: "accountability",
    prompt: "Which evidence would still answer an audit question two years after decommissioning?",
    options: [
      "A retained extract with its query and metric definition",
      "A link to the reporting workspace used at the time",
      "The approved closure report containing the figure",
      "A signed attestation from the analyst who produced it",
    ],
    answer: 0,
    rationale: "Only the extract lets the figure be reproduced. The others are references to it or restatements of it.",
    optionNotes: ["", "The workspace is the thing that was deleted.", "The report is the claim, not its support.", "An attestation from an interested party is not primary data."],
  },
  {
    id: "cs13",
    moduleId: "accountability",
    prompt: "Why is retention a closure decision rather than a records-management afterthought?",
    options: [
      "Decommissioning destroys the evidence, and it happens at closure",
      "Records management teams lack authority over project data",
      "Retention periods are set by the project's business case",
      "Audit requires retention decisions to be documented at closure",
    ],
    answer: 0,
    rationale: "The window in which the evidence still exists closes at the same time the project does. After that there is nothing to retain.",
    optionNotes: ["", "Authority is not the issue; timing is.", "Retention periods come from entity obligations, not the business case.", "Documentation timing is a formality compared with the data being gone."],
  },
  {
    id: "cs14",
    moduleId: "purpose",
    prompt: "What must be established for benefits after a project closes?",
    options: [
      "Accepted operational ownership, durable measurement and the approved governance/escalation path for each remaining benefit",
      "The project manager remains owner until every benefit is realised",
      "The Senior Responsible Officer automatically owns every benefit indefinitely",
      "Finance becomes the owner because benefits appear in performance reporting",
    ],
    answer: 0,
    rationale: "The SRO must ensure follow-on arrangements are assigned at closure. Who remains accountable afterwards depends on the approved governance; do not replace that decision with an unsupported universal rule.",
    optionNotes: ["", "The project manager's role normally ends with the project.", "The SRO may retain a role under specific governance, but this is not automatic for every closed project.", "Reporting a benefit is not the same as owning its realisation."],
  },
  {
    id: "cs16",
    moduleId: "financial",
    prompt: "Which cost is most likely to be wrongly capitalised?",
    options: [
      "Training and change management, swept into build cost",
      "Development of the delivered system",
      "Hardware purchased for the production environment",
      "Configuration of the licensed platform",
    ],
    answer: 0,
    rationale: "It is conventionally expensed, it is usually large, and it sits close enough to the build that it gets swept in without anyone deciding to.",
    optionNotes: ["", "Properly capitalised — it produces the asset.", "Tangible and clearly capital.", "Generally capital where it creates the working system."],
  },
  {
    id: "cs17",
    moduleId: "financial",
    prompt: "Why clear work in progress before closure?",
    options: [
      "An uncleared balance becomes a figure nobody can later resolve",
      "WIP balances attract interest charges against the program",
      "Records authorities require WIP to be cleared at project end",
      "It is a precondition for the entity to close its financial statements",
    ],
    answer: 0,
    rationale: "The same pattern as the unexplained accrual: cheap to resolve while the team remembers, expensive once only the ledger entry survives.",
    optionNotes: ["", "No interest applies to internal WIP.", "Records authorities govern records, not ledgers.", "Entities close regardless; the balance is provided for or written off."],
  },
  {
    id: "cs18",
    moduleId: "handover",
    prompt: "Which retention approach is most likely to still be readable in ten years?",
    options: [
      "An open-format export with schema and dictionary",
      "A virtual machine snapshot of the whole system",
      "A native database backup file",
      "A copy of the reporting dashboard exported to PDF",
    ],
    answer: 0,
    rationale: "Only the first is independent of software the entity may no longer license. The others all depend on an environment that ages.",
    optionNotes: ["", "Needs a hypervisor, an OS and licences that all age out.", "Needs the original database version to restore.", "Preserves a rendering, not the records."],
  },
  {
    id: "cs19",
    moduleId: "handover",
    prompt: "The replaced system is still live and holds duplicate data. What is the most urgent thing to record?",
    options: [
      "Which system is the system of record",
      "The annual cost of continuing to run it",
      "The date it is expected to be decommissioned",
      "The number of users who have not yet migrated",
    ],
    answer: 0,
    rationale: "All four belong in the report. Only one determines whether staff can tell which copy of a participant's data governs today.",
    optionNotes: ["", "Important for budgeting, not for correctness of decisions made this week.", "Useful planning information that does not resolve current ambiguity.", "Scopes the migration; does not tell anyone which record is authoritative."],
  },
  {
    id: "cs20",
    moduleId: "handover",
    prompt: "Does migrating records into a new system discharge the original retention obligation?",
    options: [
      "No — it attaches to the information, not the system",
      "Yes, provided the migration is verified as complete",
      "Yes, because the new system inherits the old system's authority",
      "Only where the records authority explicitly permits migration",
    ],
    answer: 0,
    rationale: "Access must be maintained for the prescribed period across however many platforms the information passes through. Migration moves the record; it does not reset the clock.",
    optionNotes: ["", "Verification matters and does not end the obligation.", "Authorities describe records and functions, not systems.", "Migration does not require specific permission; the retention period continues either way."],
  },
  {
    id: "cs21",
    moduleId: "benefits",
    prompt: "Which is a usable document purpose statement?",
    options: [
      "It names the decisions the report supports and who must take them",
      "It states that the document reports on the closure of the project",
      "It summarises the project background and delivery approach",
      "It confirms the report was prepared per the departmental template",
    ],
    answer: 0,
    rationale: "Purpose tells a reader whether this document is theirs to act on. The other three restate the title, duplicate the overview, or describe compliance.",
    optionNotes: ["", "The title already said that.", "That is the project overview, one section later.", "Compliance with a template is not a purpose."],
  },
  {
    id: "cs22",
    moduleId: "openitems",
    prompt: "An issue is reclassified as a risk shortly before closure. What is the likely motive?",
    options: [
      "A risk can be transferred and watched; an issue demands fixing",
      "Risks receive more senior governance attention than issues",
      "Issues cannot be carried past project closure under most frameworks",
      "The distinction was corrected as the impact had not yet occurred",
    ],
    answer: 0,
    rationale: "An issue is already happening. Reclassifying it converts an obligation to fix something into an obligation to watch it, which is why the move is worth noticing at closure.",
    optionNotes: ["", "Usually the reverse — issues escalate faster.", "No such prohibition exists.", "A legitimate correction sometimes, and worth checking the impact really has not occurred."],
  },
  {
    id: "cs23",
    moduleId: "openitems",
    prompt: "What most improves an artefacts section?",
    options: [
      "An owner and a location for each item, not just a name",
      "Listing every document produced during delivery",
      "Grouping artefacts by the phase that produced them",
      "Attaching the artefacts to the closure report itself",
    ],
    answer: 0,
    rationale: "The section exists to make things findable by someone who does not know they exist. A name alone tells them what to look for and not where or whom to ask.",
    optionNotes: ["", "Completeness without location produces an unusable inventory.", "Phase grouping suits the author, not the reader.", "Impractical, and it does not survive the report being extracted."],
  },
  {
    id: "cs24",
    moduleId: "purpose",
    prompt: "Under the DTA closure reporting standard, what separates an Emerging rating from a Strong one?",
    options: [
      "Strong explains why something changed and what it cost, not just that it changed",
      "Strong requires the report to be endorsed by the Digital Transformation Agency",
      "Strong applies only to Tier 1 and Tier 2 projects under the IOF",
      "Strong requires every criterion to be supported by an attached artefact",
    ],
    answer: 0,
    rationale: "The same move recurs across all seven criteria: rationale and impact. A report full of facts without causes is Emerging by definition.",
    optionNotes: ["", "The assessment is done by the agency itself.", "The criteria apply regardless of tier; only the template differs.", "Some criteria require attachments; that is not what separates the ratings."],
  },
  {
    id: "cs25",
    moduleId: "accountability",
    prompt: "A closure report lists the dates of its Readiness for Service and Benefits Realisation reviews and nothing further. How does that rate on the assurance criterion?",
    options: [
      "Nil — completion is recorded but no findings or outcomes are captured",
      "Emerging — the activities in the Assurance Plan are recorded as complete",
      "Strong — external assurance is evidenced by the review dates",
      "It cannot be rated without the DTA's own assessment",
    ],
    answer: 0,
    rationale: "The criterion asks for key outcomes from the activities, not attendance. Dates alone record that assurance happened while saying nothing about what it found or changed.",
    optionNotes: ["", "Emerging needs the outcomes and the rationale for any change to the plan.", "Strong additionally assesses whether the assurance was worth its cost.", "The rating is a self-assessment by the agency."],
  },
  {
    id: "cs26",
    moduleId: "benefits",
    prompt: "Criterion 3 measures the closure report against which artefact?",
    options: [
      "The benefits management plan",
      "The business case narrative",
      "The entity's corporate plan",
      "The Assurance Plan agreed with the DTA",
    ],
    answer: 0,
    rationale: "Benefits are assessed against the plan that named them, their owners and their measurement — including percentage realised, expected date of realisation and transition of owners.",
    optionNotes: ["", "The business case is the reference for scope and budget, criteria 1 and 4.", "Corporate plans carry entity purposes, not project benefits.", "That is criterion 5."],
  },
  {
    id: "cs15",
    moduleId: "evidence",
    prompt: "What is the risk of a metric definition that could reasonably be read two ways?",
    options: [
      "Real improvement and measurement artefact become indistinguishable",
      "The figure will be rejected by the entity's data governance process",
      "Different business areas will calculate different totals",
      "The metric cannot be included in performance statements",
    ],
    answer: 0,
    rationale: "The difference between two definitions is frequently larger than the improvement being claimed, so without the definition the reader cannot tell which they are looking at.",
    optionNotes: ["", "Governance may not review it at all.", "True and downstream — the deeper problem is that neither total can be interpreted.", "Ambiguous metrics are reported more often than they are excluded."],
  },
];

/* ------------------------------------------------------------------ *
 * Worked cases
 * ------------------------------------------------------------------ */

export const closureCaseStudies: CaseStudy[] = [
  {
    id: "payments-uplift",
    title: "The payments platform uplift",
    subtitle: "A $47m program that delivered, and nearly could not prove it",
    outcome: "corrected",
    summary:
      "A three-year platform program met its delivery commitments and wrote a closure report that would not have survived audit. The corrections made in the final six weeks are the substance of this case.",
    steps: [
      {
        moduleId: "purpose",
        stage: 1,
        heading: "The draft that said nothing",
        decision: "Accept a compliant draft, or send it back six weeks from closure?",
        tempting:
          "The draft met the template, the sponsor was content, and the team was down to four people. Sending it back costs goodwill and buys a document nobody may read.",
        body: "The first draft ran to 34 pages and stated that the program 'successfully delivered the agreed scope within the revised funding envelope, achieving improved payment processing outcomes'. The reviewer asked one question: if the incoming Deputy Secretary reads only this, what will they now do differently? Nobody could answer.",
        artefact:
          "Reviewer note, 12 June:\n  \"Three questions this document should answer and does not:\n   1. What did we promise in 2023, and did we deliver it?\n   2. Who owns the $6.2m annual saving from 1 July?\n   3. What should the next platform program do differently?\n  Everything else is context.\"",
        insight:
          "The test of a closure report is not compliance with a template. It is whether a reader who was not there makes a different decision than they would have without it.",
      },
      {
        moduleId: "evidence",
        stage: 2,
        heading: "Finding the original baseline",
        decision: "Report against the 2025 revision, or reconstruct the 2023 approved position?",
        tempting:
          "The 2025 revision was formally approved, current, and made the program look well-managed. Reporting against it was defensible and would have gone unchallenged.",
        body: "The program had been rebaselined twice. Reporting against the second revision produced 'delivered on budget'. Reporting against the original 2023 approval produced 'delivered at $47.3m against $38.1m approved'. Both were true. The team recorded the chain: original, revision one (Mar 2025, scope addition of the reconciliation module, +$5.4m), revision two (Nov 2025, integration rework following the identity broker change, +$3.8m).",
        artefact:
          "Approved 2023 baseline:      $38.1m\n  Revision 1 (Mar 2025):       $43.5m   scope addition — reconciliation module\n  Revision 2 (Nov 2025):       $47.3m   integration rework — identity broker change\n  Final actual:                $47.3m\n  Against original approval:   +$9.2m (+24%)",
        insight:
          "Showing the chain costs nothing and pre-empts the finding. The +24% was always going to be discoverable; disclosing it made every other number in the report credible.",
      },
      {
        moduleId: "benefits",
        stage: 3,
        heading: "The benefit nobody owned",
        decision: "Record the branch as owner, or record that there is no agreed owner?",
        tempting:
          "The Assistant Secretary's branch was obviously the right home, and writing the branch name would have closed the item. Everyone assumed it would be sorted out later.",
        body: "The largest benefit — $6.2m annually from reduced manual reconciliation — was allocated to 'Payments Operations Branch'. The team applied the course's recommended accountability test and found three gaps: no accountable role-holder identified, no evidence the branch accepted the target, and a measurement dependent on a reporting view built by the program. Only the influence test passed. They labelled the stronger test as course practice, recorded the transfer as unresolved and took it to the SRO.",
        artefact:
          "Benefit B1 — $6.2m p.a. from FY2027-28\n    Responsible area   ✓  Payments Operations Branch\n    Role-holder        ✗  recommended course control; none identified\n    Has agreed         ✗  no record of the figure being put to the area\n    Can influence      ✓  branch controls the reconciliation process\n    Has measurement    ✗  depends on view PAY-VW-22, built by the program\n  Status: NOT TRANSFERRED. Escalated to SRO 19 June.",
        insight:
          "Three of the four conditions failed and the item would still have been signed off as 'handed to Payments Operations'. The four-condition test is what turns an assumption into a visible gap.",
      },
      {
        moduleId: "accountability",
        stage: 4,
        heading: "The evidence that was about to be deleted",
        decision: "Rely on the existing reporting, or extract and retain before decommissioning?",
        tempting:
          "The reporting workspace was live, the dashboards worked, and the benefit measurement was nine months away. Extracting felt like duplicating something that already existed.",
        body: "The decommissioning plan deleted the program's analytics workspace 30 days after closure. Everything supporting the baseline — the pre-change reconciliation volumes, the error rates, the effort sampling — lived there. The team extracted the baseline datasets to the department's records store, wrote the queries and definitions alongside them, and named the Assistant Director, Performance Reporting as holder.",
        artefact:
          "Retained to RM store REC-2026-0881, holder: AD Performance Reporting\n    baseline-reconciliation-volumes-2023-2026.csv\n    baseline-error-rates-2023-2026.csv\n    effort-sample-2024.csv\n    queries.sql            — the extraction logic, commented\n    definitions.md         — what each metric counts and excludes\n  Retention: 7 years, per entity schedule.",
        insight:
          "The measurement had not happened yet and the evidence for it was 30 days from deletion. Retention is a closure decision because closure is when the window shuts.",
      },
      {
        moduleId: "writing",
        stage: 5,
        heading: "The shortfall, said plainly",
        decision: "Distribute the misses through the narrative, or give them a heading?",
        tempting:
          "Two of six benefits were behind, and the program had genuinely delivered. Spreading the bad news would have been kinder to a team that had worked hard for three years.",
        body: "The rewritten report opened with a one-page statement of promised, delivered and gap, followed by a section headed 'What we did not achieve'. It stated the $9.2m cost overrun against original approval, the unresolved ownership of B1, and a straggling benefit at 60 per cent of forecast. No compensating successes appeared in that section; they had their own.",
        artefact:
          "What we did not achieve\n  ----------------------------------------\n  1. Cost. $47.3m against $38.1m approved (+24%). Both revisions\n     were approved; the original commitment was still exceeded.\n  2. Benefit B1 ownership. Not transferred at closure. Action with\n     SRO; acceptance scheduled for the August Payments Committee.\n  3. Benefit B4 (error-rate reduction) is measuring at 60% of\n     forecast at 4 months. Cause not yet established. Under review\n     by the benefit owner, reporting December.",
        insight:
          "The section is three items and eleven lines. It is also the only part of the report the Deputy Secretary quoted back — because it was the only part that told her something she could act on.",
      },
      {
        moduleId: "lessons",
        stage: 6,
        heading: "One lesson worth the whole document",
        decision: "Log the identity broker problem as a sentiment, or as reference data?",
        tempting:
          "'Manage external dependencies more actively' was the phrase in the draft. It was true, uncontroversial, and would have been accepted without comment.",
        body: "The $3.8m integration rework followed an identity broker token-lifetime change that the program was not notified about. The team wrote it as a four-part lesson with the ratio, and published it to the departmental lessons pool classed against platform integrations with shared identity services — not into the program's own folder.",
        artefact:
          "LP-2026-204 · Class: platform integration, shared identity services\n  Context: any build depending on the whole-of-department identity broker.\n  Event:   token lifetime changed Sep 2025 without notification to\n           consuming programs. Session handling broke in UAT.\n  Cost:    integration rework 3.4× the original estimate; $3.8m;\n           11-week schedule impact.\n  Action:  register as a consuming system with Platform Identity and\n           request change notification at design, not at integration.\n           There is no automatic notification list — you must ask.",
        insight:
          "'Manage external dependencies more actively' and this entry describe the same event. Only one of them tells the next team to send an email in week two.",
      },
    ],
    closing:
      "Nothing about the delivery changed in those six weeks. What changed was whether anyone could tell — and whether the $6.2m benefit had an owner when the team walked out. The report went from 34 pages nobody would act on to 19 pages with three items the SRO chased personally.",
  },
  {
    id: "register-shutdown",
    title: "The register that was switched off twice",
    subtitle: "Eleven years of records, a lapsed subscription, and the fortnight that saved them",
    outcome: "corrected",
    summary:
      "A licensing register was replaced and decommissioned. The first attempt would have destroyed Commonwealth records without authority; the second was sequenced properly and cost three weeks.",
    steps: [
      {
        moduleId: "handover",
        stage: 1,
        heading: "The decommissioning plan that was a cancellation plan",
        decision: "Accept the plan as written, or ask what happens to the data?",
        tempting:
          "The plan was clear, costed and endorsed. It read like competence: three tidy steps, a date, a saving of $240k a year. Questioning it looked like obstruction.",
        body: "The plan had three steps: migrate active licences to the new platform, notify users, cancel the hosting subscription at end of quarter. Nobody had asked what happened to the eleven years of superseded, refused and lapsed applications that were not being migrated because they were not active.",
        artefact:
          "Decommissioning plan v1.2 — extract\n  1. Migrate active licence records (approx 8,400)\n  2. Notify users; redirect the URL\n  3. Cancel hosting subscription 30 June — saving $240k p.a.\n  Records disposition: not addressed.",
        insight:
          "The plan was competent about everything it considered. What it did not consider was the majority of the data, because 'not active' had been quietly read as 'not needed'.",
      },
      {
        moduleId: "handover",
        stage: 2,
        heading: "Sentencing, which nobody had done",
        decision: "Assume the standard seven years, or check the authority?",
        tempting:
          "Seven years is the number everyone recites, and applying it would have covered most of the data and taken an afternoon.",
        body: "Information governance was asked to sentence the holdings properly. Three different retention periods applied. Refused applications carried a longer period than anyone expected because of the review and appeal history attached to them, and a small set had potential archival value and could not be destroyed at all.",
        artefact:
          "Sentencing outcome\n  Active licences            migrate to new platform, retention continues\n  Lapsed/superseded         7 years from last action — 61,300 records\n  Refused + appeal history  longer period applies — 4,180 records\n  Pre-2015 policy files     potential archival value — refer to NAA\n  Destroy now under authority: NIL",
        insight:
          "Nothing at all could be destroyed on the planned date. The assumption that a decommissioning date is a technical decision was the whole error, and it was one question away from being caught.",
      },
      {
        moduleId: "handover",
        stage: 3,
        heading: "Export, and reading it back",
        decision: "Trust the export, or reconcile it?",
        tempting:
          "The export ran without errors and produced files of a plausible size. Verification felt like ceremony over a job already done.",
        body: "The team exported every table to CSV with the DDL schema, all code and lookup tables, and a written data dictionary. Then they read it back and reconciled it against the live system. Row counts matched on every table but one: the appeals table was short by 312 rows, because the export query joined on a status code that had been retired in 2019 and left nulls behind.",
        artefact:
          "Reconciliation — export v1\n  applications      61,300 / 61,300   OK\n  licences           8,400 /  8,400   OK\n  appeals            3,868 /  4,180   SHORT 312\n  Cause: join on status_code, retired value 'RV' not mapped.\n  Re-exported and re-reconciled: 4,180 / 4,180 OK.",
        insight:
          "An export that runs cleanly is not an export that is complete. The 312 records were the ones with the longest retention period and the highest likelihood of being requested.",
      },
      {
        moduleId: "financial",
        stage: 4,
        heading: "The subscription that was already cancelled",
        decision: "Let the cancellation stand, or reinstate at cost?",
        tempting:
          "Reinstating meant admitting the plan had been wrong and paying $60k for a quarter of a system everyone had been told was finished.",
        body: "The cancellation had been lodged with the vendor two weeks earlier, effective 30 June, with data deletion 30 days after. The team reinstated for one quarter at $60k to complete the export, verification and archival referral. The finance position was corrected at the same time: $180k of the expected saving was reversed out of the following year's budget submission, which had already been lodged assuming it.",
        artefact:
          "Financial correction\n  Reinstate hosting Q1 FY27      $60k unbudgeted\n  Saving reversed from submission $180k (3 quarters, not 4)\n  Warranty on migration tooling   expires 12 Nov 2027,\n                                  holder: AD Platform Services\n  Note: saving had been booked before disposition was resolved.",
        insight:
          "The saving had been promised to a budget process before anyone knew whether the system could lawfully be switched off. That is the ordinary sequence, and it is backwards.",
      },
      {
        moduleId: "handover",
        stage: 5,
        heading: "The fortnight with the integrations off",
        decision: "Delete on schedule, or run a reversible test first?",
        tempting:
          "Everything had been exported and verified. Waiting another fortnight extended an already embarrassing overrun for no obvious benefit.",
        body: "Integrations and access were revoked, and the system was left running but unreachable for fourteen days. On day four, a monthly compliance report failed. It drew licence status directly from the register and had been built by a different branch three years earlier; nobody in the project knew it existed.",
        artefact:
          "Integration blackout log\n  Day 1  access revoked, 6 known integrations disabled\n  Day 4  FAIL — Compliance Monthly (COMP-114) unable to source\n         licence_status. Owner: Regulatory Branch. Not in\n         any dependency register. Not known to the project.\n  Day 9  no further failures\n  Day 14 proceed to release infrastructure",
        insight:
          "One undocumented consumer, found while the system could still be turned back on. Deleting on the original schedule would have found it in the same way and at a very different price.",
      },
      {
        moduleId: "writing",
        stage: 6,
        heading: "Writing down what nearly happened",
        decision: "Report the outcome, or report the near miss?",
        tempting:
          "The records were preserved, the system was decommissioned, the saving was mostly realised. Reporting it as a success would have been accurate and nobody would have queried it.",
        body: "The closure report stated plainly that the approved decommissioning plan would have destroyed approximately 65,000 Commonwealth records without authority, that this was caught by a question rather than by a control, and that no step in the entity's process would have caught it. The recommendation was a mandatory sentencing gate before any decommissioning date can be set.",
        artefact:
          "What nearly went wrong\n  ----------------------------------------\n  Plan v1.2 would have destroyed approx 65,000 Commonwealth\n  records without authority on 30 July. Detected on 12 June by\n  a question at design review, not by any control. No approval\n  step in the current process requires records disposition to\n  be resolved before a decommissioning date is committed.\n\n  R1 (accepted): sentencing sign-off from Information\n  Governance is a precondition of setting any decommissioning\n  date, and of booking any saving arising from one.",
        insight:
          "The valuable output was not the preserved records. It was the sentence saying the control did not exist — which changed the process for every future decommissioning in the entity.",
      },
    ],
    closing:
      "The saving was real, the migration was competent, and the plan was endorsed by people who knew what they were doing. It would still have destroyed sixty-five thousand records that the entity was legally obliged to keep, on a date chosen because a subscription renewed then. Nothing in the process would have stopped it.",
  },
  {
    id: "grants-portal",
    title: "The grants portal that closed twice",
    subtitle: "What an unresolved handover costs eighteen months later",
    outcome: "corrected",
    summary:
      "A well-delivered service was handed over on paper and not in practice. The failure surfaced during an incident, and the second closure — done properly — took eleven weeks.",
    steps: [
      {
        moduleId: "handover",
        stage: 1,
        heading: "The handover that passed",
        decision: "Test the handover, or accept the signed pack?",
        tempting:
          "The pack was thorough — 60 pages, architecture diagrams, runbooks, a recorded walkthrough. Both managers signed. Testing it would have implied distrust of good work.",
        body: "The portal went live in March, the handover pack was signed in April, and the delivery team dispersed in May. The pack was genuinely good. Nobody tested whether the receiving team could use it, and the receiving team had not tried, because nothing had gone wrong yet.",
        artefact:
          "Handover checklist, 22 April — all items ✓\n    Architecture documentation          ✓\n    Runbooks (12)                       ✓\n    Support model agreed                ✓\n    Walkthrough delivered and recorded  ✓\n    Signed: Delivery Manager / Operations Manager",
        insight:
          "Every input was complete. The checklist confirmed that documents existed, which is not the same question as whether anyone could act on them.",
      },
      {
        moduleId: "handover",
        stage: 2,
        heading: "Eighteen months of quiet dependency",
        decision: "Nothing was decided — which was the problem.",
        tempting:
          "The service ran well. Two or three questions a month to a former team member is not a visible failure, and raising it would have looked like manufacturing a problem.",
        body: "Between May and the following November, the operations team contacted the former technical lead — by then in another division — roughly twice a month. Configuration questions, a certificate renewal, an unexplained batch failure. Each was resolved in under an hour. The dependency never appeared in any report because nothing ever broke.",
        insight:
          "The informal channel is what makes an inadequate handover survivable, and therefore invisible. The cost is not paid until the person stops answering.",
      },
      {
        moduleId: "handover",
        stage: 3,
        heading: "The incident",
        decision: "Restore service first — but what does the post-incident review conclude?",
        tempting:
          "The easy conclusion was that the outage was caused by an expired certificate, which is a monitoring gap with a simple fix.",
        body: "In November the nightly reconciliation failed four nights running. The former technical lead had left the department in September. It took the operations team nine hours to establish that a retry loop was masking an upstream timeout, and that the threshold was set in a config file the runbooks did not mention. The post-incident review named the real cause as the untested handover, not the timeout.",
        artefact:
          "Post-incident review, INC-2026-4471\n  Immediate cause: upstream provider timeout; retry threshold in\n    app.config exhausted after 3 attempts.\n  Contributing:    threshold not documented in any runbook.\n  Root cause:      handover was assessed on document completeness,\n    not on receiving-team capability. Dependency on departed staff\n    substituted for documentation for 18 months and was never visible.\n  Time to restore: 9h 14m. Comparable documented fault: <1h.",
        insight:
          "The nine hours were not caused by the timeout. They were caused by eighteen months in which nobody had to find out what they did not know.",
      },
      {
        moduleId: "handover",
        stage: 4,
        heading: "Closing it properly",
        decision: "Patch the runbook, or redo the handover?",
        tempting:
          "Adding the config file to the runbook would have closed the incident action and taken an afternoon.",
        body: "The operations manager funded eleven weeks of a contractor who had worked on the original build, with one instruction: work through the real tasks with the operations team, and document what they had to ask. Forty-one gaps were found. Nine were significant. The config threshold was one of the smaller ones.",
        artefact:
          "Rediscovery log — 41 items, 11 weeks\n    Significant (9):\n      · retry threshold and upstream timeout behaviour\n      · certificate inventory — 3 certs, no owner, no renewal calendar\n      · batch window dependency (fails if run after 02:00)\n      · manual reconciliation procedure — undocumented entirely\n      · identity broker token lifetime assumption\n      · 4 further\n    Moderate (14) · Minor (18)",
        insight:
          "Forty-one gaps in a handover that scored 100 per cent on its checklist. The gap was never in the documents; it was in the test.",
      },
      {
        moduleId: "purpose",
        stage: 5,
        heading: "What the second closure report said",
        decision: "Record it as an incident remediation, or as a closure failure?",
        tempting:
          "Filing it under incident remediation was accurate, contained, and did not require anyone to say that the first closure had been inadequate.",
        body: "The second report was explicit: the original closure was completed on document completeness and should not have been accepted. It recorded the cost — nine hours of outage, eleven weeks of contractor time, roughly $180k — and recommended that closure acceptance in the division require a demonstrated task, not a signed pack.",
        artefact:
          "Recommendation R1 (accepted, effective 1 Feb):\n    Handover acceptance requires the receiving team to complete\n    two routine tasks and one diagnostic task with the delivery\n    team unavailable. Questions raised become the handover backlog.\n    Sign-off follows completion, not documentation.\n  Cost of the original approach: $180k and one Sev-2 outage.",
        insight:
          "The recommendation is one paragraph and changes what 'handover complete' means for every subsequent project in the division. That is the return a closure report can produce, and almost never does.",
      },
    ],
    closing:
      "The delivery was good. The documentation was good. The handover was signed by two competent managers who had done everything the process asked. It still cost $180k and a Sev-2, because nobody tested the one thing that mattered — whether the people staying could work without the people leaving.",
  },
];

/* ------------------------------------------------------------------ *
 * Toolkit
 * ------------------------------------------------------------------ */

export const closureToolkit: ToolkitTemplate[] = [
  {
    id: "claim",
    title: "Marked claim",
    prompt: "[Measured / Estimated / Asserted]: [statement with magnitude]. [Definition, period, sample, source] or [assumption] or [basis].",
    example:
      "Measured: median lodgement-to-decision time fell from 14 to 9 days. Definition: system-generated lodgement to decision timestamp, excluding withdrawn applications. Q1 2026 (n=3,880) vs Q3 2026 (n=4,102). Source: CMS-RPT-114.",
    note: "The label is not a hedge. It is what makes your measured claims believable when a reader meets your asserted ones.",
  },
  {
    id: "baseline",
    title: "Baseline chain",
    prompt: "Original approved: [$X, date]. Revision N: [$Y, date, reason]. Final actual: [$Z]. Against original: [+/- amount, per cent].",
    example:
      "Original approved: $38.1m (Aug 2023). Revision 1: $43.5m (Mar 2025, reconciliation module added). Revision 2: $47.3m (Nov 2025, integration rework after identity broker change). Final actual: $47.3m. Against original approval: +$9.2m (+24%).",
    note: "Disclosing the chain pre-empts the finding. The variance is discoverable anyway; volunteering it buys credibility for everything else.",
  },
  {
    id: "benefit",
    title: "Benefit transfer record",
    prompt: "Benefit: [what, magnitude, from when]. Owner: [name, role]. Agreed: [when and where]. Influence: [driver they control]. Measurement: [source that already exists, cycle].",
    example:
      "Benefit: $2.4m p.a. reduced avoidable contact, from FY2027-28. Owner: Director, Provider Support Branch. Agreed: 14 July governance meeting, minuted. Influence: controls triage and support staffing; note contact volume is partly driven by notification policy owned by Policy Branch — joint dependency recorded. Measurement: monthly contact volumes, standing Service Performance pack, reviewed each December.",
    note: "Run the four conditions. Any that fails is written as a gap with an action, not smoothed into the prose.",
  },
  {
    id: "self-assess",
    title: "The closure assessment grid",
    prompt:
      "Seven areas, each with a fixed rating and the evidence for it. Scope delivered (Achieved / Partially / Not) · Schedule (On time / Minor delay / Significant delay) · Budget (Within / Over / Under) · Benefits (Achieved / On track / Not achieved) · Transition to BAU (Complete / Outstanding actions) · Stakeholder engagement and Project governance (Effective / Partially effective / Needs improvement).",
    example:
      "Schedule — MINOR DELAY. Six weeks against the original date, inside the eight-week tolerance; no rebaseline required.\n\nBudget — OVER. $47.3m against $38.1m originally approved, 24 per cent. Two rebaselines, both approved by the Project Board.\n\nTransition to BAU — OUTSTANDING ACTIONS. Five of six outcomes accepted; the sixth briefed to Provider Support but not accepted. Action A9, owner AD Provider Support, due 30 September.\n\nProject governance — PARTIALLY EFFECTIVE. Board met monthly and made every scope decision; eleven change requests raised and eleven approved, with no record of any refused.",
    note:
      "Evidence means a fact a reader could check — a date, a figure, a decision reference. Restating the rating in a sentence is not evidence. Budget has no good option: Within, Over and Under are three descriptions, not a scale.",
  },
  {
    id: "purpose-stmt",
    title: "Document purpose",
    prompt: "This report closes [project] and transfers [what] to named owners. It supports [whose decision] and [whose decision].",
    example:
      "This report closes the Provider Status project and transfers six benefits, four residual risks and one unresolved dependency to named owners. It supports the SRO's decision to stand down programme governance, and Finance's treatment of $47.3m of capitalised and expensed cost.",
    note: "If the sentence would be true of any closure report, it is not a purpose statement. Name this project's decisions and this project's readers.",
  },
  {
    id: "okr-close",
    title: "Objective, outcome and key result",
    prompt: "Objective (as originally written): [text] — [achieved / partially / not]. Business outcome: [change], [measured or estimated] at [figure] against baseline [figure]. Key result: [metric], target [x], actual [y].",
    example:
      "Objective: 'Provide providers with self-service visibility of application status.' Achieved. Business outcome: reduce avoidable support contact — measured 18% reduction against a 40% target. Key result: contacts per application, target 0.6, actual 0.83.",
    note: "Report all three separately. An objective delivered while its outcome did not move is the most useful finding you have, and merging the levels destroys it.",
  },
  {
    id: "raid-transfer",
    title: "Outstanding item transfer row",
    prompt: "[Risk / Issue / Dependency / Action] [ref]: [description]. Owner: [name, role]. [Rating or impact]. [Treatment or path]. Destination: [register, ref]. Review: [when].",
    example:
      "Risk R1: identity broker token lifetime may change without notice, breaking session handling. Owner: Assistant Director, Platform Services. Rating: medium. Treatment: registered as a consuming system with Platform Identity, notification requested. Destination: Platform Services risk register PS-R-118. Review: December committee.",
    note: "No row owned by a team, a branch or the project. If an item genuinely has no owner, write UNTRANSFERRED and put it in front of the signatory.",
  },
  {
    id: "followon",
    title: "Follow-on action",
    prompt: "[Ref]: [unfinished work]. Owner: [name, role]. Due: [date]. If not done: [consequence]. Origin: issue [ref] from this project.",
    example:
      "A3: revise the notification wording that continues to generate avoidable calls. Owner: Director, Eligibility Policy. Due: 30 November. If not done: the contact-reduction benefit stays at 18% against a 40% target and the benefit owner cannot act, because the driver sits outside their control. Origin: issue I7, raised March, not resolved at closure.",
    note: "Every open issue at closure is closed, formally accepted, or becomes one of these. If you cannot name an owner, say so on the page the signatory reads.",
  },
  {
    id: "recommendation",
    title: "Recommendation",
    prompt: "[Ref]: [what this entity should change]. Directed to: [process owner]. Basis: [what happened here]. Status: [accepted / not accepted / pending].",
    example:
      "R1: sentencing sign-off from Information Governance should be a precondition of setting any decommissioning date, and of booking any saving arising from one. Directed to: Assistant Secretary, Delivery Assurance. Basis: the approved plan for the licensing register would have destroyed approximately 65,000 Commonwealth records; no approval step required records disposition to be resolved first. Status: accepted, effective 1 February.",
    note: "A recommendation is about this entity's process; a lesson is about future projects anywhere. Filing a recommendation as a lesson sends it to a pool nobody with authority reads.",
  },
  {
    id: "quality-stmt",
    title: "Quality and completion",
    prompt: "Completion criteria: [n] agreed, [n] met, [n] waived by [who]. Quality: [defects by severity accepted into production, owner], [performance], [accessibility], [security].",
    example:
      "Completion criteria: 7 agreed, 6 met, 1 waived (bulk export deferred) by the SRO on 3 June. Quality: 14 known defects accepted into production, 2 at severity 3, all owned in the platform backlog; peak load tested to 3x forecast; accessibility audited at WCAG 2.1 AA with two outstanding AAA items; no open security findings above low.",
    note: "Quality is not scope. 'Passed UAT' records that a meeting happened; this records whether the thing works under real conditions.",
  },
  {
    id: "artefact-index",
    title: "Artefact index row",
    prompt: "[Artefact]: [what it is]. Location: [where, precisely]. Owner: [name, role]. [Record with retention obligation? period and authority.]",
    example:
      "Data dictionary and export schema: column definitions, units and exclusions for the retained case export. Location: records store REC-2026-0881. Owner: Assistant Director, Information Governance. Commonwealth record, retained 7 years under the programme administration authority.",
    note: "Include what people forget: architecture decisions, test evidence, contracts, the benefits plan. A name with no location is not an index.",
  },
  {
    id: "closure-agreement",
    title: "Closure agreement",
    prompt: "Signed by [name, role], confirming that the [benefits / risks / obligations] recorded in sections [x] to [y] have been accepted by the owners named there. Date: [date]. [Exceptions, if any.]",
    example:
      "Signed by the Senior Responsible Officer, confirming that the benefits, risks and obligations recorded in sections 6 to 9 have been accepted by the owners named there. Exception: Risk R4 (data quality in migrated records) remains untransferred and is referred to the Deputy Secretary for allocation.",
    note: "Tie the signature to the transfers. 'Signed to confirm project closure' attests to something everyone could already see.",
  },
  {
    id: "lesson",
    title: "Four-part lesson",
    prompt: "Context: [class of work this applies to]. Event: [what happened, with magnitude]. Cost: [schedule, dollars, or ratio]. Action: [what to do differently, concretely].",
    example:
      "Context: any build depending on the whole-of-department identity broker. Event: token lifetime changed without notification to consuming programs; session handling broke in UAT. Cost: integration rework 3.4× estimate, $3.8m, 11 weeks. Action: register as a consuming system with Platform Identity at design and request change notification — there is no automatic list, you must ask.",
    note: "If the action could be written before the project started, it is a sentiment. The action should only be knowable because of what happened.",
  },
  {
    id: "shortfall",
    title: "Shortfall statement",
    prompt: "[What was committed, in original units]. [What was achieved]. [Shortfall]. Cause: [forecast error or delivery failure, with the distinction stated]. Recorded: [where the lesson sits].",
    example:
      "The business case forecast $3.1m annual savings from FY2027-28. Measured at nine months: $1.2m annualised. Shortfall $1.9m against the original commitment. Cause is forecast error rather than delivery failure — the system performs to specification; take-up is 41% against a forecast 85%. The forecast used the 2023 mandatory-channel rollout as its comparator for an opt-in service. Recorded as LP-2026-118.",
    note: "No compensating success in this passage. Successes are reported elsewhere, on their own merits.",
  },
  {
    id: "retention",
    title: "Evidence retention record",
    prompt: "Claim supported: [which]. Retained: [files]. Method: [query or calculation, where]. Definition: [what is counted and excluded]. Holder: [name, role]. Period: [per which schedule].",
    example:
      "Claim: B1 baseline reconciliation volumes. Retained to RM store REC-2026-0881: baseline volumes CSV, error rates CSV, effort sample CSV, queries.sql, definitions.md. Holder: Assistant Director, Performance Reporting. Retention 7 years per entity schedule. Source system PAY-ANALYTICS decommissioned 30 days post-closure.",
    note: "Retain the extract, not the dashboard. The dashboard depends on something that is scheduled to be turned off.",
  },
  {
    id: "handover-test",
    title: "Handover capability test",
    prompt: "Task: [a real routine task]. Performed by: [receiving team]. Delivery team: unavailable. Expected: [time]. Actual: [time]. Questions raised: [list — this is the backlog].",
    example:
      "Task: apply a configuration change to the notification threshold and deploy to test. Performed by: two operations engineers. Delivery team unavailable for the day. Expected 30 minutes; actual 4 hours. Questions raised: where is the threshold set (undocumented, found in source); which pipeline deploys config (runbook names a decommissioned pipeline); who approves a test deployment (unassigned). Three handover backlog items.",
    note: "Run this before closure, not after. The questions raised are the handover you have not done yet.",
  },
];

/* ------------------------------------------------------------------ *
 * Capstone
 * ------------------------------------------------------------------ */

export const closureCapstoneSteps: CapstoneStep[] = [
  {
    id: "cc1",
    title: "Promised, delivered, gap",
    prompt:
      "Write the first page. What was committed in the original approved terms, what was delivered, and the gap between them. Include cost against the original baseline with the revision chain.",
    checks: [
      "The original approved baseline is stated before any revision",
      "Each revision carries a date and a reason",
      "The gap against the original commitment is stated as a figure, not characterised",
    ],
  },
  {
    id: "cc2",
    title: "Mark your claims",
    prompt:
      "State three outcome claims. Mark each as measured, estimated or asserted, and give the definition, period and source for anything measured.",
    checks: [
      "Each claim carries its kind explicitly",
      "The measured claim names a source a stranger could reach without asking you",
      "The estimate states an assumption that could turn out to be false",
    ],
  },
  {
    id: "cc3",
    title: "Transfer the benefits",
    prompt:
      "For each benefit, record the locally required responsible area and apply the stronger recommended test — accountable role-holder, acceptance, influence and durable measurement. Label the enhancement and record failures as gaps with actions rather than resolving them in prose.",
    checks: [
      "Every benefit names the responsible area and records accepted accountability; where the stronger test is used, an accountable role-holder is named or the gap is explicit",
      "The influence test names the driver and who controls it",
      "Measurement identifies data that will exist without new funded work",
    ],
  },
  {
    id: "cc3b",
    title: "Close the financial and contractual position",
    prompt:
      "State the closing position: open commitments and their treatment, any capitalisation judgement you would put back to Finance, and every contractual obligation that outlives the project.",
    checks: [
      "Every surviving obligation has an end date and a named holder",
      "The capitalisation question is argued from what was delivered, not from preference",
      "Recurring costs name a funded budget line, not a business area",
    ],
  },
  {
    id: "cc3c",
    title: "Records and decommissioning",
    prompt:
      "State what must be retained and under what authority, how access will be maintained after the system is gone, the shutdown sequence, and the disposition of whatever this replaced.",
    checks: [
      "Retention names an authority, or states plainly that none has been identified",
      "The access approach would still be readable without the original software",
      "The sequence puts a reversible step before anything irreversible",
      "If the replaced system is still running, the system of record is named",
    ],
  },
  {
    id: "cc3d",
    title: "Outstanding items",
    prompt:
      "Write the outstanding risks, issues, dependencies and actions as a transfer table. Each row names an individual, a destination register and a review date — or is marked untransferred.",
    checks: [
      "No row is owned by a team, a branch or the project",
      "Anything genuinely unowned is marked untransferred rather than assigned to nobody",
      "Every dependency names a person to chase, not only a system",
    ],
  },
  {
    id: "cc4",
    title: "The shortfall",
    prompt:
      "Write the passage stating what was not achieved, against the original commitment, with the cause and whether it was forecast error or delivery failure.",
    checks: [
      "Stated in the same units as the original commitment",
      "Forecast error and delivery failure are explicitly distinguished",
      "No compensating success appears in the passage",
    ],
  },
  {
    id: "cc5",
    title: "Handover and fragility",
    prompt:
      "Specify what transfers and to whom — support, change, run cost, residual risks, benefits measurement, records. Then write the fragility section: what is weak, what has already failed, what workarounds exist.",
    checks: [
      "Run cost names a funded budget line and a holder",
      "At least one item is uncomfortable to write and is included anyway",
      "External dependencies name an owner, not just a system",
    ],
  },
  {
    id: "cc6",
    title: "Two lessons",
    prompt:
      "Write two lessons in four parts — context, event with magnitude, cost, action. State where each will be published so that someone with that problem would find it.",
    checks: [
      "Each context defines a class of work, not this project",
      "Each event carries a number: duration, ratio or dollars",
      "Publication location is a pool that accumulates, not the project's own folder",
    ],
  },
  {
    id: "cc7",
    title: "The evidence chain",
    prompt:
      "Take your strongest claim and trace it: claim, method, data, definition, approval. Name the weakest link and the retention action that fixes it.",
    checks: [
      "The chain reaches primary data, or the break is named honestly",
      "The retention action names a format and a named holder",
      "The weakest link is identified explicitly",
    ],
  },
];

export const closureCapstoneRubric: CapstoneRubricItem[] = [
  { id: "testable", title: "Testable", detail: "Every claim can be traced to primary data, or is marked as estimated or asserted." },
  { id: "baselined", title: "Baselined", detail: "Performance is reported against the original approved position, with revisions disclosed." },
  { id: "owned", title: "Owned", detail: "Every benefit, risk, cost and obligation that outlives the project has accepted accountability at the level local governance requires; stronger course practice identifies an accountable role-holder as well." },
  { id: "candid", title: "Candid", detail: "Shortfalls are stated directly, in original units, without compensating successes attached." },
  { id: "transferable", title: "Transferable", detail: "Lessons carry context, magnitude, cost and action, and are published where they will be found." },
  { id: "settled", title: "Settled", detail: "Financial and contractual obligations are discharged, or transferred with an end date and a named holder." },
  { id: "lawful", title: "Lawful", detail: "Records disposition is resolved against an authority, and retained information stays accessible after the system is gone." },
  { id: "durable", title: "Durable", detail: "The evidence behind every claim survives decommissioning, with a named holder and a retention period." },
];

export const closureCapstoneBriefs: CapstoneBrief[] = [
  {
    id: "payments",
    title: "Payments platform uplift",
    short: "A large program that delivered late and over the original approval.",
    brief:
      "A three-year, $47m platform program has completed. It was rebaselined twice and delivered $9.2m above the original approved budget. Six benefits were promised; four have named owners, one is disputed, one has no measurement. The analytics workspace holding all baseline data is scheduled for deletion 30 days after closure.",
    twist:
      "The Senior Responsible Officer who approved the original business case has moved to another entity. Their successor starts the week the report is due.",
  },
  {
    id: "grants",
    title: "Grants portal",
    short: "A well-delivered service with an untested handover.",
    brief:
      "A grants portal went live on time and within budget and is performing well. The handover pack is complete and signed. The receiving operations team has not yet performed any change independently, and the technical lead is leaving the department in three weeks. Two benefits depend on take-up that will not be measurable for nine months.",
    twist:
      "The operations manager has asked, informally, whether the technical lead would 'stay contactable for a while'. Everyone has agreed this is sensible.",
  },
  {
    id: "register",
    title: "Licensing register decommissioning",
    short: "A replacement delivered; the old system holds eleven years of records.",
    brief:
      "A licensing register has been replaced. Active licences migrated to the new platform; roughly 65,000 superseded, lapsed and refused applications did not, because they are not active. The hosting subscription is due for renewal in six weeks and a $240k annual saving has already been booked into next year's budget submission.",
    twist:
      "Nobody has asked Information Governance anything, and the decommissioning date was set by the renewal date.",
  },
  {
    id: "caseload",
    title: "Caseload triage pilot",
    short: "A pilot that worked, with no baseline to prove it.",
    brief:
      "An eighteen-month pilot of automated caseload triage is closing, and the department wants to scale it. Caseworkers are positive and the delivery team believes handling time has fallen substantially. No baseline was captured before the pilot began, and the definition of handling time changed when the new tool was introduced.",
    twist:
      "The scaling business case is being drafted now, and will cite your closure report as its evidence base.",
  },
];

/* ------------------------------------------------------------------ *
 * Field guide
 * ------------------------------------------------------------------ */

export const closureFieldGuide: FieldGuideEntry[] = [
  {
    id: "gates",
    title: "The Gateway gates",
    summary:
      "Gateway runs short independent reviews at key decisions in a project's lifecycle. Use the names to understand what each review is trying to establish; memorising the gate numbers is not a learning objective.",
    sourceIds: ["rmg106", "gateway"],
    items: [
      { term: "Gate 0 — Business need", detail: "Strategic assessment. Whether the proposal addresses a real need and fits the entity's direction." },
      { term: "Gate 1 — Business case", detail: "Whether the preferred option is deliverable and the benefits are credible. The final Benefits Realisation review returns to these claims." },
      { term: "Gate 2 — Delivery strategy", detail: "Whether the delivery and procurement strategy defines the project, aligns benefits to delivery and is ready to approach the market." },
      { term: "Gate 3 — Investment decision", detail: "Readiness to commit. Whether the arrangements to deliver and to realise benefits are in place." },
      { term: "Gate 4 — Readiness for service", detail: "Whether the organisation is ready to operate what is being delivered — including the receiving business." },
      { term: "Gate 5 — Benefits realisation", detail: "Usually six to twelve months after commissioning and after an internal post-implementation review. Tests benefits, value for money, future expectations and any remedial action." },
    ],
  },
  {
    id: "scope",
    title: "When Gateway applies",
    summary:
      "The thresholds trigger a recommendation; they are not the only route in. Finance may recommend review for high-risk proposals, and entities may run internal equivalents below the thresholds.",
    sourceIds: ["gateway", "rmg106"],
    items: [
      { term: "Procurement or infrastructure", detail: "Total estimated cost of $30 million or more." },
      { term: "ICT-enabled projects", detail: "Total estimated cost of $30 million or more including an ICT component of at least $10 million." },
      { term: "Programs", detail: "Total estimated cost of over $50 million." },
      { term: "Entity scope", detail: "Non-corporate Commonwealth entities. Defence Capability Plan projects assessed under the Kinnaird two-pass process are excluded." },
      { term: "Interaction with ICT Investment Approval", detail: "Where both apply, Gates 0 and 1 are not mandatory; Gateway commences after Government approval and focuses on implementation." },
    ],
  },
  {
    id: "readers",
    title: "Reader quick reference",
    summary: "What each audience opens the report to find, and what they do if it is not there.",
    sourceIds: ["rmg106", "anao-perf"],
    items: [
      { term: "Senior Responsible Officer", detail: "Whether benefits are on track and who owns them. If absent: signs it anyway, and the benefits governance quietly lapses." },
      { term: "Chief Financial Officer", detail: "Final costs, asset recognition, settled obligations. If absent: goes to the ledger and ignores the narrative." },
      { term: "Next delivery team", detail: "Specific, transferable detail. If absent: cannot obtain it anywhere else, and repeats the failure at the same cost." },
      { term: "Receiving operational team", detail: "How to run, support and change it. If absent: contacts departed staff until they stop replying." },
      { term: "ANAO or internal audit", detail: "Whether claims are supported by evidence. If absent: tests it anyway and raises a finding against the entity." },
    ],
  },
  {
    id: "closeout",
    title: "Financial and contractual closeout checklist",
    summary:
      "The items that have a hard deadline and a statutory audience. Everything here is cheap to settle while the team remembers and expensive to reconstruct afterwards.",
    sourceIds: ["closure", "cprs"],
    items: [
      { term: "Invoices and accruals", detail: "All costs recorded in the correct period; anything performed but not invoiced is accrued with a stated basis." },
      { term: "Open commitments", detail: "Purchase orders closed, or carried with a documented reason and an owner." },
      { term: "Capitalisation", detail: "Apply AASB 138, RMG 109 and entity policy. Research/option selection and training are expensed; qualifying development may be capitalised; post-go-live work is assessed by its nature and recognition tests." },
      { term: "Work in progress", detail: "Cleared to asset or expense. An uncleared balance becomes unexplained the moment the team disperses." },
      { term: "Final acceptance", detail: "Signed against the executed contract's acceptance criteria, with its actual effects on payment, warranty, retention, title and defects recorded. No universal trigger is assumed." },
      { term: "Warranty / defects liability", detail: "End date recorded and a named holder who will act on it. The most commonly lost entitlement at closure." },
      { term: "Retentions and holdbacks", detail: "Settled, or the position documented with the condition for release." },
      { term: "IP, source and data", detail: "Actually delivered, not licensed in principle. Check before acceptance, not after." },
      { term: "Transition-out", detail: "What the supplier must still do, by when, and who will enforce it." },
      { term: "Surviving obligations", detail: "Confidentiality, records access and audit rights typically continue past termination. List them with end dates." },
      { term: "Recurring costs", detail: "Licences, hosting and support moved to a funded budget line whose holder has accepted them." },
    ],
  },
  {
    id: "shutdown",
    title: "Decommissioning sequence",
    summary:
      "In order, with the reversible checkpoint before anything irreversible. Data in a government business system is a Commonwealth record; the disposition question comes before the date, not after it.",
    sourceIds: ["archives", "naa-data"],
    items: [
      { term: "1. Sentence the records", detail: "What must be kept, for how long, under which authority. Everything downstream depends on this, and it is the step routinely skipped." },
      { term: "2. Decide the retention approach", detail: "Open-format export with schema and dictionary for most cases; migration where a successor fits; referral to the National Archives where archival value applies." },
      { term: "3. Export", detail: "Every table, with DDL schema, code and lookup tables, and a plain-English data dictionary covering units and exclusions." },
      { term: "4. Verify by reading it back", detail: "Reconcile row counts and control totals against the live system. An export that ran cleanly is not necessarily complete." },
      { term: "5. Retain closure evidence separately", detail: "Baseline extracts, queries and metric definitions, with a named holder outside the platform being retired." },
      { term: "6. Check downstream consumers", detail: "Reports, interfaces and extracts built by other areas. The dependency register is usually incomplete." },
      { term: "7. Revoke access and integrations", detail: "The reversible checkpoint. Leave the system running but unreachable for a fortnight and see what breaks." },
      { term: "8. Release infrastructure", detail: "Only now: delete data, close accounts, cancel subscriptions. The first irreversible step in the sequence." },
      { term: "9. State the disposition of what it replaced", detail: "Still running? Name the owner, the cost, the stop date, and which system is the system of record." },
    ],
  },
  {
    id: "criteria",
    title: "Whole-of-government comparator: the DTA seven criteria",
    summary:
      "Not the departmental template — the DTA standard that applies to Australian Government digital and ICT-enabled closure reports, and the yardstick a DEWR digital project meets outside the department. Agencies self-assess each criterion as Strong, Emerging or Nil. Emerging records what happened; Strong explains why, and what followed. Useful here as a test of whether a report is good rather than merely complete.",
    sourceIds: ["aga-standard", "aga-templates"],
    items: [
      { term: "1. Scope", detail: "Emerging: overview, objectives and scope as agreed in the business case, performance against it, any adjustments recorded, and the original business case attached. Strong adds the rationale for each adjustment and its impact." },
      { term: "2. Schedule", detail: "Emerging: performance against the agreed schedule including key milestones. Strong adds the rationale for and impact of every slip, milestone movement and change request." },
      { term: "3. Outcomes and benefits", detail: "Emerging: achievement of outcomes against the benefits management plan, with the percentage of benefits realised, expected date of realisation and transition of benefit owners, plus any formal changes to benefits. Strong adds an agreed plan for transferring ongoing benefit management and its governance to the owners after closure." },
      { term: "4. Budget", detail: "Emerging: final budget position against the agreed budget, a breakdown of performance against it, and any changes recorded. Strong adds the rationale for each change — including Movement of Funds requests and additional funding — and its impact, including on the wider agency." },
      { term: "5. Assurance", detail: "Emerging: completion of internal and external assurance activities per the Assurance Plan agreed with the DTA, the rationale for any material change, and key outcomes. Strong adds an assessment of whether the assurance was effective and worth its cost." },
      { term: "6. Transition to BAU", detail: "Emerging: transition arrangements, the owners of any deliverable or scope component left incomplete, and a register of ongoing risks and issues transferring to BAU. Strong adds sustainment funding plans and the impact of handing incomplete work over." },
      { term: "7. Lessons learned", detail: "Emerging: key lessons including those from assurance, how they were identified, how they will be applied, and an artefact setting out the full lessons attached (for example, a lessons learned register). Strong links each lesson to the delivery challenge and addresses the source." },
      { term: "The pattern", detail: "Across all seven, Strong is the same move: not only what changed, but why it changed and what it cost. If your draft states facts without causes, it is Emerging." },
      { term: "Which template", detail: "DTA comparator templates exist for Investment Oversight Framework tiers. Choose the internal DEWR form using the departmental P3M tier and instructions; do not assume identically numbered tiers are the same framework." },
    ],
  },
  {
    id: "closure-checklist",
    title: "The closure checklist",
    summary:
      "Fifteen items across six categories, from the Project Closure Factsheet. Most ask you to confirm something is agreed or accepted by a named party, not that you have written about it.",
    sourceIds: ["dewr-factsheet"],
    items: [
      { term: "Deliverables and benefits transition", detail: "Deliverables in the Business Case and PMP completed and formally accepted · benefit ownership and ongoing realisation in BAU defined and agreed · PIR arrangements confirmed, including ownership, timing and scope." },
      { term: "Transition ownership to BAU", detail: "Transition planning complete and operational responsibilities documented — Tier 1 and 2 use the Project Transition Plan · outputs, ongoing risks, issues and benefits transferred to BAU owners with clear accountability · transition completed and documented." },
      { term: "Project closure documentation", detail: "The closure report completed and reflecting performance against objectives, scope, schedule and budget." },
      { term: "Lessons learned", detail: "A lessons review conducted, capturing successes, challenges and improvement opportunities · lessons recorded in the Departmental Lessons Learned Register." },
      { term: "Closure approvals and submission", detail: "SRO approval of the closure documentation · endorsement from relevant governance bodies where required · the approved report sent to the Portfolio Project Office." },
      { term: "Stakeholder engagement", detail: "Stakeholders informed of closure · transition arrangements communicated · BAU ownership and contact points confirmed." },
      { term: "What the PPO does with it", detail: "Receives the approved report and aggregates information for trends and organisational improvement. It does not review reports for approval or compliance; follow any separately documented group PMO process." },
    ],
  },
  {
    id: "tiers",
    title: "Which form, and what applies at each tier",
    summary:
      "The P3M tier sets which artefacts a project carries and which closure form it completes. The obligation to close formally does not change with tier.",
    sourceIds: ["dewr-template", "dewr-tier3", "dewr-factsheet"],
    items: [
      { term: "Tier 1 and Tier 2", detail: "Assurance Approach · Project Transition Plan · the full template: Document Control, Key Project Contacts and fifteen numbered sections, ending in the eighteen-category lessons table." },
      { term: "Tier 3", detail: "Assurance Plan or Checklist · transition recorded directly on the form · the simplified Tier 3 form: nine table blocks, an overall delivery status, and a seven-area assessment grid. Piloted from July 2026." },
      { term: "Every tier", detail: "SRO approval · lessons in the Departmental Lessons Learned Register · the approved report submitted to the group PMO and the Portfolio Project Office." },
      { term: "The Tier 3 assessment grid", detail: "Scope delivered (Achieved / Partially / Not) · Schedule (On time / Minor delay / Significant delay) · Budget (Within / Over / Under) · Benefits (Achieved / On track / Not achieved) · Transition to BAU (Complete / Outstanding actions) · Stakeholder engagement and Project governance (Effective / Partially effective / Needs improvement)." },
      { term: "Sections that do not apply", detail: "On the full template, keep the heading and justify the omission in place. A deleted section is indistinguishable from an oversight." },
    ],
  },
  {
    id: "sections",
    title: "The full template, section by section",
    summary:
      "The fifteen numbered sections of the departmental Project Closure Report Template, plus its two front-matter tables. What each asks for, and how each is usually failed. Every section is retained even where it does not apply — the omission is justified in place rather than deleted.",
    sourceIds: ["dewr-template"],
    items: [
      { term: "Document Control", detail: "Version, change description and date for each revision of the report itself. Front matter. Failed by showing only v1.0, which hides whether anything was challenged before approval." },
      { term: "Key Project Contacts", detail: "SRO, Project Manager and other applicable roles, per the P3M Framework. Front matter. Failed by omitting the Senior User, who signs for the receiving side." },
      { term: "1. Purpose of this Document", detail: "The decisions this report supports and who takes them; the assessment against Business Case, PMP and objectives. Failed by restating the title." },
      { term: "2. Introduction and Background", detail: "Origin, reason for inception, objectives, projected benefits, scope, timeline. Orientation for a reader who was not there. Failed by omitting the internal name and reference, which is how anyone finds it later." },
      { term: "3. Approvals", detail: "Five specific assertions — objectives met subject to approved changes, provision made for open issues and risks, outcomes transferred to BAU, resources releasable, PIR assigned and documentation current — then the signature table. Failed by signing all five when one is not true." },
      { term: "4. Project Manager's Report", detail: "A brief summary of performance, including the reason for any premature closure. Failed by omitting cost and schedule, which belong in the summary a reader may not read past." },
      { term: "5. Review of the Business Case", detail: "Whether the case remains valid, and any deviations. Failed by treating it as one verdict when problem, cost estimate and benefit estimate can be wrong independently." },
      { term: "6. Review of Project Objectives", detail: "Performance against targets and tolerances for time, cost, quality, scope, benefits and risk, and the effectiveness of the delivery approach and controls. Failed by reporting outcomes without saying whether they breached tolerance." },
      { term: "7. Project Management Deliverables", detail: "The P3M artefacts with version or ID and delivery date, tailored to tier. Failed by listing clean version numbers for documents that were never produced or never updated." },
      { term: "8. Review of Project Specific Deliverables", detail: "Deliverable, purpose and delivery date for what the project built. Failed by omitting purpose, which is what makes the row readable in three years." },
      { term: "9. Review of Milestones", detail: "Scheduled date, actual date and comments against the originally baselined schedule, with detail where delays breached tolerance. Failed by reporting against the latest rebaseline, which shows almost no variance." },
      { term: "10. Outcomes", detail: "The objectives and target outcomes from the approved PMP, each with a responsible business owner, plus maintenance, realisation monitoring and transition arrangements. Failed by naming an area without evidence that accountability was accepted or actionable." },
      { term: "11. Benefits", detail: "Benefit ID, benefit, how it will be measured, who owns it, and when it is realised or measured. Benefits may be realised after handover. Failed by owners who never agreed, or measures that need new funded work to exist." },
      { term: "12. Change Control", detail: "How the formal change process was managed and the decisions taken, with the Change Register attached. A zero-rejection pattern prompts investigation of screening, withdrawals, completeness and challenge; it does not prove the gate approved everything." },
      { term: "13. Financial Summary", detail: "Approved budget and actual expenditure, split OPEX and CAPEX, per financial year, against the original approved budget, with variance explained. Failed by reporting a single net figure that conceals offsetting movements." },
      { term: "14. Asset Management", detail: "Each asset now in use with a business owner, an IT owner, a location and the timing of handover. Failed by naming one owner, so the asset works until it needs patching." },
      { term: "15. Lessons Learned", detail: "Eighteen fixed categories, each split into Strengths and Areas to improve, with recommendations for future projects. Provided to the Portfolio Project Office and recorded in the Departmental Lessons Learned Register. Failed by leaving categories blank." },
    ],
  },
  {
    id: "phrases",
    title: "Phrases that signal a weak claim",
    summary:
      "Constructions an experienced reader treats as flags. Removing them is not a style preference — each one marks a number the writer chose not to state.",
    sourceIds: ["anao-perf"],
    items: [
      { term: "Successfully delivered", detail: "'Successfully' does no work. Say what was delivered, when, against which baseline." },
      { term: "Broadly in line with expectations", detail: "Missed, by an amount not stated. Give the figure and the expectation." },
      { term: "Within the revised budget", detail: "Over the original. Report against both with the revision chain." },
      { term: "Stakeholders were engaged throughout", detail: "Meetings occurred. Name the group, the decision and the date." },
      { term: "Lessons have been captured", detail: "A workshop happened. Say how many, where they are published, and give one." },
      { term: "Improved outcomes for users", detail: "Unmeasured unless a figure follows. Mark it asserted or give the measure." },
      { term: "Handed over to operations", detail: "Which of the six transfers, to whom, and did the receiving team demonstrate it?" },
    ],
  },
];

/* Empty by design — see the note at the top of this file. */
export const closureDivergences: Divergence[] = [
  {
    id: "cdv1",
    topic: "Marking how strong each claim is",
    slides: "Template §6, §11",
    deck: "The template asks for outcomes, benefits and measures. It does not ask how confident you are in any of them, and offers no way to say.",
    here: "Every claim is marked measured, estimated or asserted, and the course treats the three as different kinds of sentence rather than different levels of confidence about the same one.",
    why: "A report where everything is written in the same confident past tense cannot be tested, so a reader either believes all of it or none. Marking the estimates protects the measurements.",
  },
  {
    id: "cdv2",
    topic: "What makes a benefit owner real",
    slides: "Template §11",
    deck: "The benefits table has a column headed 'Who will take ownership?'. The department does not define what qualifies someone to be in it.",
    here: "Four conditions: they have agreed, they can influence the driver, a measurement exists that does not need new funded work, and a date is scheduled when someone will look.",
    why: "A name in the column with none of the four is a benefit that stops being measured the month the project ends, which is the commonest failure in benefits realisation and invisible at closure.",
  },
  {
    id: "cdv3",
    topic: "The shape of a usable lesson",
    slides: "Template §15",
    deck: "The template supplies eighteen categories and two columns. It does not say what belongs in the columns beyond 'key learnings'.",
    here: "Four parts: context, the event with its magnitude, what it cost, and the action. A lesson missing any of the four is a sentiment.",
    why: "The Portfolio Project Office aggregates lessons across the department. 'Communication could have been better' contributes nothing to that aggregate; a lesson with a magnitude and a cost is something another project can act on.",
  },
  {
    id: "cdv4",
    topic: "Writing for a reader who has ninety seconds",
    slides: "Not covered",
    deck: "Neither the template nor the factsheet says anything about how the report should read.",
    here: "Structure for a reader arriving with one question, the shortfall paragraph written without a compensating success attached, and the assumption that only the first page is read.",
    why: "The report is the artefact that closes the project. PPO submission is not an approval or compliance review, so usability must be established before submission while any documented group PMO process is still followed.",
  },
  {
    id: "cdv5",
    topic: "Records obligations under the Archives Act",
    slides: "Template §14",
    deck: "Asset Management covers assets in use and who owns them. Commonwealth records obligations sit outside the closure template.",
    here: "Data created or received in the course of Australian Government business is a Commonwealth record, which constrains what may be decommissioned and what has to remain readable.",
    why: "Decommissioning decisions are usually made at closure and are effectively irreversible. Knowing which data carries an obligation before the environment is switched off is the only chance to act on it.",
  },
  {
    id: "cdv6",
    topic: "Whole-of-government assurance",
    slides: "Not covered",
    deck: "The departmental process is the P3M Framework. Commonwealth assurance regimes sit outside it.",
    here: "The Gateway Review Process and the DTA closure reporting standard, both as external comparators — Gateway above the value thresholds, the DTA standard for digital and ICT-enabled work.",
    why: "A larger project meets both regimes, and the DTA's Strong / Emerging / Nil distinction is a sharp test of whether any closure report explains causes or only records facts.",
  },
  {
    id: "cdv7",
    topic: "Why pooled numbers beat a single account",
    slides: "Template §15",
    deck: "Lessons are recorded per project, in the report and in the departmental register.",
    here: "Reference-class comparison: what the same category of work has actually cost and taken across many projects, against what this one estimated.",
    why: "A single project's overrun reads as bad luck or bad management. The same overrun against a class of comparable projects reads as a forecasting method that needs changing, which is a lesson worth the department's time.",
  },
];
