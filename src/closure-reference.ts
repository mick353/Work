/**
 * Closure Reports — reference content.
 *
 * Everything the package owns beyond the seven stages: retrieval cards, the
 * glossary, worked cases, the capstone, templates and the field guide.
 *
 * This package has no `divergences` — that concept belongs to a course built
 * from a departmental deck, where the course goes further than the source and
 * the difference has to be visible. Here the sources are published frameworks
 * and the course does not depart from them, so the array is empty and the view
 * shows its empty state rather than an invented section.
 */

import type { Question } from "./course";
import type {
  CapstoneBrief,
  CapstoneStep,
  CaseStudy,
  Contrast,
  Divergence,
  FieldGuideEntry,
  Flashcard,
  GlossaryEntry,
  ToolkitTemplate,
} from "./reference";

/* ------------------------------------------------------------------ *
 * Retrieval cards
 * ------------------------------------------------------------------ */

export const closureFlashcards: Flashcard[] = [
  { id: "cf1", moduleId: "purpose", kind: "definition", front: "What is a closure report for?", back: "To provide the first evidence about whether an investment was worth making, and to transfer every obligation that outlives the project to a named owner." },
  { id: "cf2", moduleId: "purpose", kind: "definition", front: "What does Gateway Gate 6 assess?", back: "Benefits realisation: whether the purpose and benefits of the investment were delivered, and whether benefit harvesting survives the project's closure." },
  { id: "cf3", moduleId: "purpose", kind: "definition", front: "Gateway financial thresholds", back: "$30m for procurement or infrastructure projects; $30m where the ICT component is at least $10m; $50m for programs. Non-corporate Commonwealth entities." },
  { id: "cf4", moduleId: "purpose", kind: "discrimination", front: "Project manager or SRO — who is accountable at Gate 6?", back: "The Senior Responsible Officer. Gateway provides assurance to the SRO, who remains accountable for benefits across the lifecycle." },
  { id: "cf5", moduleId: "purpose", kind: "application", front: "Which closure-report reader has no alternative source of information?", back: "The next delivery team. The SRO can ask, Finance has the ledger, audit can test — only the next team depends entirely on what was written down." },
  { id: "cf6", moduleId: "purpose", kind: "discrimination", front: "Why is a structural conflict, not carelessness, the reason closure reports are weak?", back: "The author's own record is the subject, written at the point of least time and least incentive to be candid, for readers who cannot verify." },

  { id: "cf7", moduleId: "evidence", kind: "definition", front: "The three kinds of claim", back: "Measured (data before and after, same definition), estimated (a model with stated assumptions), asserted (informed judgement, no measurement). Mark which is which." },
  { id: "cf8", moduleId: "evidence", kind: "application", front: "What makes a claim traceable?", back: "A reader who was not there can reach the underlying data without asking you: named source, date range, sample size, and the metric definition." },
  { id: "cf9", moduleId: "evidence", kind: "discrimination", front: "Original baseline or revised baseline?", back: "Both. State the original approved baseline first, show each revision dated and reasoned, and report against both so the reader sees the gap." },
  { id: "cf10", moduleId: "evidence", kind: "application", front: "No baseline was captured. What now?", back: "Say so plainly. Any improvement claim becomes estimated or asserted. A reconstructed baseline is legitimate as an estimate, never as a measurement." },
  { id: "cf11", moduleId: "evidence", kind: "discrimination", front: "Why disclose that a claim is merely asserted?", back: "It is what makes the measured claims credible. Strip the marking and a sceptical reader treats every claim in the document as equally unverifiable." },
  { id: "cf12", moduleId: "evidence", kind: "application", front: "The metric definition changed mid-project. What must the report do?", back: "Report both definitions, state that it changed, and give a like-for-like figure if the data allows — otherwise improvement and measurement artefact are indistinguishable." },

  { id: "cf13", moduleId: "benefits", kind: "definition", front: "Why can benefits realisation not be a project activity?", back: "Benefits accrue in the operational business after delivery. By the time they are measurable there is no project — so ownership must transfer at closure." },
  { id: "cf14", moduleId: "benefits", kind: "definition", front: "The four conditions of a real benefit owner", back: "A named individual; who has agreed; who can influence the driver; and who has a measurement that will exist without new funded work." },
  { id: "cf15", moduleId: "benefits", kind: "discrimination", front: "'The Service Delivery Group owns this benefit' — what is wrong?", back: "A group holds no accountability. No individual's work depends on it and no calendar entry belongs to anyone. Name a person in a role." },
  { id: "cf16", moduleId: "benefits", kind: "application", front: "When does post-implementation review typically occur?", back: "Roughly 6 to 12 months after closure, once effects have had time to appear. Anchor it to an existing governance cycle, not a standalone date." },
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
  { id: "cf29", moduleId: "handover", kind: "application", front: "What is known fragility, and why is it omitted?", back: "The parts the team knows are weak — retry loops, timing dependencies, config nobody understands. Omitted because writing it down feels like confessing." },
  { id: "cf30", moduleId: "handover", kind: "application", front: "How do you find the real handover gaps?", back: "Have the receiving team make a routine change, delivery team away. What they need to ask is the handover backlog." },

  { id: "cf31", moduleId: "writing", kind: "application", front: "What belongs on page one?", back: "What was promised, what was delivered, and the gap. Not governance, not acknowledgements, not the financial position against a revised budget." },
  { id: "cf32", moduleId: "writing", kind: "definition", front: "The shortfall paragraph", back: "A single direct passage: what was not achieved, by how much against the original commitment, the cause, and where the lesson is recorded." },
  { id: "cf33", moduleId: "writing", kind: "discrimination", front: "'Broadly in line with expectations' — how is it read?", back: "As a miss, by an amount the writer chose not to state. Results that meet expectations are reported with the number." },
  { id: "cf34", moduleId: "writing", kind: "discrimination", front: "Why not pair a shortfall with a compensating success?", back: "It reads as deflection. The shortfall is not softened and the success now looks deployed defensively rather than reported on its merits." },
  { id: "cf35", moduleId: "writing", kind: "discrimination", front: "'Delivered within the revised budget' — what does a reader hear?", back: "Over the original budget. State it as delivered at $X against original $Y, revised to $Z with dates and reasons." },
  { id: "cf36", moduleId: "writing", kind: "application", front: "Why give shortfalls their own heading?", back: "Buried bad news reads as concealed bad news, and the reader then re-reads everything looking for what else was placed carefully." },

  { id: "cf37", moduleId: "assurance", kind: "definition", front: "Where do closure claims resurface?", back: "In annual performance statements, which are audited, and in ANAO performance audits — tested by parties with no relationship to the project." },
  { id: "cf38", moduleId: "assurance", kind: "definition", front: "The evidence chain", back: "Claim, method, data, definition, approval. Audit follows it until it reaches primary data or runs out." },
  { id: "cf39", moduleId: "assurance", kind: "application", front: "Where does the chain usually break?", back: "At the data. The source system was decommissioned and no extract was retained. The number was real and the evidence evaporated." },
  { id: "cf40", moduleId: "assurance", kind: "discrimination", front: "Dashboard or extract — which is durable evidence?", back: "The extract, with the query and the definition beside it. A dashboard depends on a workspace that may be deleted well inside the retention period." },
  { id: "cf41", moduleId: "assurance", kind: "application", front: "Why retain the metric definition with the data?", back: "The same metric defined two ways gives two answers. Without the definition a tester has a number and no way to know what it counts." },
  { id: "cf42", moduleId: "assurance", kind: "application", front: "Measurement runs nine months; the workspace is deleted in 30 days. What now?", back: "Establish a durable data source for the ongoing measurement and retain the baseline extract and method now, while they still exist." },
];

/* ------------------------------------------------------------------ *
 * Glossary
 * ------------------------------------------------------------------ */

export const closureGlossary: GlossaryEntry[] = [
  { term: "Annual performance statements", origin: "Government", moduleId: "assurance", definition: "The statements a Commonwealth entity publishes in its annual report, reporting performance against the purposes set out in its corporate plan. Audited, which is why a closure claim that flows into them can be tested." },
  { term: "Asserted claim", origin: "General", moduleId: "evidence", definition: "A statement resting on informed judgement with no measurement behind it. Legitimate in a closure report if labelled as such; corrosive if written in the same confident past tense as a measurement." },
  { term: "Assurance review", origin: "Government", moduleId: "purpose", definition: "A short, intensive independent review at a defined point in a proposal's lifecycle, providing the Senior Responsible Officer with advice and early identification of areas needing corrective action." },
  { term: "Baseline", origin: "General", moduleId: "evidence", definition: "The approved position against which delivery is measured. The useful one is the baseline approved when the investment decision was made, not the most recent revision." },
  { term: "Benefit owner", origin: "Government", moduleId: "benefits", definition: "The named individual accountable for realising and reporting a specific benefit after closure. Must have agreed, be able to influence the driver, and have a measurement that will exist without new funded work." },
  { term: "Benefits realisation", origin: "Government", moduleId: "benefits", definition: "The process of achieving and measuring the benefits promised in a business case. Occurs in the operational business after delivery, which is why it cannot be completed as a project activity." },
  { term: "Benefits realisation management plan", origin: "Government", moduleId: "benefits", definition: "The document setting out what each benefit is, who owns it, how and when it will be measured, and what happens if it is not realised." },
  { term: "Closure report", origin: "Government", moduleId: "purpose", definition: "The record produced at the end of delivery stating what was promised, what was delivered, what it cost, what was learned, and who now owns everything that outlives the project." },
  { term: "Decommissioning", origin: "General", moduleId: "assurance", definition: "Retiring the systems and environments used during delivery. The most common cause of an evidence chain breaking, because the data supporting a benefit claim goes with the system." },
  { term: "Estimated claim", origin: "General", moduleId: "evidence", definition: "A figure derived from a model rather than measured. Sound practice when the assumptions it depends on are stated, so a reader can judge whether they still hold." },
  { term: "Evidence chain", origin: "General", moduleId: "assurance", definition: "Claim, method, data, definition, approval. What an auditor follows from a reported figure until they reach primary data or run out." },
  { term: "Forecast error", origin: "General", moduleId: "benefits", definition: "A shortfall caused by the original estimate being wrong rather than by delivery failing. Distinguishing the two is what makes a shortfall useful to the next business case." },
  { term: "Gate 6", origin: "Government", moduleId: "purpose", definition: "The Benefits Realisation gate in the Gateway process. Assesses whether the investment delivered its purpose and benefits, and whether benefit harvesting continues after closure." },
  { term: "Gateway Review Process", origin: "Government", moduleId: "purpose", definition: "The Department of Finance process of independent reviews at critical points across a high-risk proposal's lifecycle, for non-corporate Commonwealth entities above defined financial thresholds." },
  { term: "Handover", origin: "General", moduleId: "handover", definition: "The transfer of operational support, change authority, run costs, residual risks, benefits measurement and records obligations from delivery to the receiving parts of the business." },
  { term: "Known fragility", origin: "General", moduleId: "handover", definition: "The parts of a delivered system the team knows are weak — timing dependencies, retry loops, unexplained configuration. Rarely documented, because recording it reads as confession." },
  { term: "Lessons learned", origin: "Government", moduleId: "lessons", definition: "Transferable findings from delivery. Usable only when they carry context, a specific event with magnitude, a cost, and an action a future team could put in a plan." },
  { term: "Measured claim", origin: "General", moduleId: "evidence", definition: "A figure from data collected before and after, using the same definition both times. The only kind of claim that supports itself without qualification." },
  { term: "New Policy Proposal", origin: "Government", moduleId: "purpose", definition: "A proposal put to Government for funding. Where high risk and above the financial thresholds, Finance may recommend it be subject to the Gateway Review Process." },
  { term: "PGPA Act", origin: "Government", moduleId: "assurance", definition: "The Public Governance, Performance and Accountability Act 2013, which establishes the Commonwealth performance framework requiring entities to measure and report performance against their purposes." },
  { term: "Post-implementation review", origin: "Government", moduleId: "benefits", definition: "A review conducted after delivery — typically 6 to 12 months post-closure — to assess whether benefits are being realised and to capture findings for future work." },
  { term: "Reference class data", origin: "General", moduleId: "lessons", definition: "Pooled estimate-versus-actual figures across comparable projects, used to forecast new work from what similar work actually cost rather than from what a team hopes." },
  { term: "Residual risk", origin: "General", moduleId: "handover", definition: "A risk that survives closure. Must transfer to a named owner in the entity's risk register, or it disappears from view without disappearing from existence." },
  { term: "Retention", origin: "Government", moduleId: "assurance", definition: "Keeping the extract, method and definition behind a reported figure for long enough that the claim can still be tested. A design decision at closure, not an afterthought." },
  { term: "RMG 106", origin: "Government", moduleId: "purpose", definition: "Finance's Guidance on the Assurance Reviews Process — the operating guidance for Gateway, including the gates and what the Senior Responsible Officer is accountable for." },
  { term: "RMG 134", origin: "Government", moduleId: "assurance", definition: "Finance's guidance on annual performance statements for Commonwealth entities. Where closure evidence eventually surfaces in audited form." },
  { term: "Run cost", origin: "General", moduleId: "handover", definition: "The recurring cost of operating a delivered system — licences, hosting, support. Must transfer to a funded budget line with a named holder, or a renewal lapses." },
  { term: "Senior Responsible Officer", origin: "Government", moduleId: "purpose", definition: "The individual accountable for a proposal achieving its objectives and realising its benefits, across the whole lifecycle including after delivery ends. The recipient of Gateway assurance." },
  { term: "Shortfall paragraph", origin: "General", moduleId: "writing", definition: "A direct passage stating what was not achieved, by how much against the original commitment, why, and where the lesson is recorded — unaccompanied by a compensating success." },
  { term: "Traceability", origin: "General", moduleId: "evidence", definition: "The property of a claim that lets a reader who was not there reach the underlying data without asking you: named source, period, sample and definition." },
];

/* ------------------------------------------------------------------ *
 * Contrasts — good versus usual
 * ------------------------------------------------------------------ */

export const closureContrasts: Contrast[] = [
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
    good: "Each benefit has a named individual who has agreed, can influence the driver, and has a measurement that already exists.",
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
    moduleId: "writing",
    good: "The shortfall has its own heading, its own figures against the original commitment, and no compensating success beside it.",
    usual: "Misses are distributed through the narrative in hedged language, and the budget is reported against the revision.",
    tell: "Search the document for 'broadly', 'largely' and 'revised'. Each one marks a number somebody chose not to state.",
  },
  {
    moduleId: "assurance",
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
    id: "cd1",
    moduleId: "purpose",
    prompt: "What is the primary purpose of a Gateway Gate 6 review?",
    options: [
      "Whether the investment delivered its purpose and benefits",
      "To confirm the project delivered agreed scope within the revised budget",
      "To verify that the entity followed its approved project methodology",
      "To finalise asset recognition in the financial statements",
    ],
    answer: 0,
    rationale: "Gate 6 is the Benefits Realisation gate. It exists because self-reported scope delivery was found not to be a reliable indicator of whether an investment achieved its purpose.",
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
  },
  {
    id: "cd3",
    moduleId: "benefits",
    prompt: "Why must benefit ownership transfer at closure?",
    options: [
      "Benefits accrue in the business afterwards, when no project remains",
      "Project teams are not permitted to hold post-delivery accountabilities",
      "Finance requires benefit ownership to sit with a business area",
      "Delivery teams lack the analytical capability to measure benefits",
    ],
    answer: 0,
    rationale: "It is a timing fact. The money is spent by the project; the return is earned by the business, usually months or years later.",
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
  },
  {
    id: "cd7",
    moduleId: "assurance",
    prompt: "Where does an evidence chain most commonly break?",
    options: [
      "The data — the system was decommissioned, no extract kept",
      "The approval — nobody would sign off the figure",
      "The claim — it was too specific to defend",
      "The method — the calculation was too complex to reproduce",
    ],
    answer: 0,
    rationale: "The usual failure is evaporation rather than falsification. The analysis was done and the thing it drew on no longer exists.",
  },
  {
    id: "cd8",
    moduleId: "benefits",
    prompt: "A benefit is assigned to 'the Service Delivery Group'. What is the defect?",
    options: [
      "A group holds no accountability — name an individual in a role",
      "Service Delivery is the wrong business area for this benefit",
      "Benefit ownership must sit with the Senior Responsible Officer",
      "The benefit should be jointly owned by delivery and operations",
    ],
    answer: 0,
    rationale: "Diffused ownership means no individual's work depends on the benefit and no calendar entry belongs to anyone.",
  },
];

/* ------------------------------------------------------------------ *
 * Supplementary questions
 * ------------------------------------------------------------------ */

export const closureSupplementary: Question[] = [
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
    moduleId: "assurance",
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
    moduleId: "assurance",
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
    prompt: "Who is accountable for benefits after a project closes?",
    options: [
      "The Senior Responsible Officer, supported by named benefit owners",
      "The project manager, until the post-implementation review concludes",
      "The receiving operational manager, from the date of handover",
      "The entity's Chief Financial Officer, through performance reporting",
    ],
    answer: 0,
    rationale: "SRO accountability spans the lifecycle, including after delivery ends. Individual benefits sit with named owners underneath that.",
    optionNotes: ["", "The project manager's role ends with the project.", "Operational managers may hold specific benefits, not overall accountability.", "The CFO reports on performance rather than owning delivery benefits."],
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
        body: "The largest benefit — $6.2m annually from reduced manual reconciliation — was allocated to 'Payments Operations Branch'. The team applied the four conditions and found three failures: no named individual, no evidence of agreement, and a measurement that depended on a reporting view built by the program. Only the influence test passed. They wrote it up as unresolved and took it to the SRO.",
        artefact:
          "Benefit B1 — $6.2m p.a. from FY2027-28\n    Named individual   ✗  'Payments Operations Branch'\n    Has agreed         ✗  no record of the figure being put to them\n    Can influence      ✓  branch controls the reconciliation process\n    Has measurement    ✗  depends on view PAY-VW-22, built by the program\n  Status: NOT TRANSFERRED. Escalated to SRO 19 June.",
        insight:
          "Three of the four conditions failed and the item would still have been signed off as 'handed to Payments Operations'. The four-condition test is what turns an assumption into a visible gap.",
      },
      {
        moduleId: "assurance",
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
      "For each benefit, apply the four conditions — named individual, has agreed, can influence, has the measurement. Record failures as gaps with actions rather than resolving them in prose.",
    checks: [
      "Every benefit names an individual and a role, or states plainly that it does not",
      "The influence test names the driver and who controls it",
      "Measurement identifies data that will exist without new funded work",
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

export const closureCapstoneRubric = [
  { id: "testable", title: "Testable", detail: "Every claim can be traced to primary data, or is marked as estimated or asserted." },
  { id: "baselined", title: "Baselined", detail: "Performance is reported against the original approved position, with revisions disclosed." },
  { id: "owned", title: "Owned", detail: "Every benefit, risk, cost and obligation that outlives the project has a named individual who has agreed." },
  { id: "candid", title: "Candid", detail: "Shortfalls are stated directly, in original units, without compensating successes attached." },
  { id: "transferable", title: "Transferable", detail: "Lessons carry context, magnitude, cost and action, and are published where they will be found." },
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
      "Gateway runs a series of short independent reviews across a proposal's lifecycle. Gate 6 is the one closure work is written for, but knowing where it sits explains what it is checking against.",
    sourceIds: ["rmg106", "gateway"],
    items: [
      { term: "Gate 0 — Business need", detail: "Strategic assessment. Whether the proposal addresses a real need and fits the entity's direction." },
      { term: "Gate 1 — Business case", detail: "Whether the preferred option is deliverable and the benefits are credible. The benefits claimed here are what Gate 6 tests." },
      { term: "Gate 2 — Procurement strategy", detail: "Whether the approach to market will deliver the intended outcome." },
      { term: "Gate 3 — Investment decision", detail: "Readiness to commit. Whether the arrangements to deliver and to realise benefits are in place." },
      { term: "Gate 4 — Readiness for service", detail: "Whether the organisation is ready to operate what is being delivered — including the receiving business." },
      { term: "Gate 5 — Benefits realisation", detail: "Operational review after service commencement, checking benefits are beginning to appear." },
      { term: "Gate 6 — Closure", detail: "Close-out of delivery into operations, and assessment of whether the purpose and benefits of the investment were delivered and continue to be harvested." },
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
export const closureDivergences: Divergence[] = [];
