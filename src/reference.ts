/**
 * Reference material: flashcards, templates, the capstone, the DES field guide,
 * the divergence register and the diagnostic pool.
 *
 * The diagnostic pool is deliberately SEPARATE from the module and practice
 * questions. In the previous release the diagnostic reused each module's first
 * question, so the same 9 items appeared in the diagnostic, the module quiz and
 * the mixed-practice pool — a learner could see one question three times and
 * mistake recognition for knowledge.
 */

import type { Question } from "./course";

/* ------------------------------------------------------------------ *
 * Flashcards
 * ------------------------------------------------------------------ */

export type FlashcardKind = "definition" | "application" | "discrimination";

export type Flashcard = {
  id: string;
  moduleId: string;
  front: string;
  back: string;
  kind: FlashcardKind;
};

export const FLASHCARD_KIND_LABEL: Record<FlashcardKind, string> = {
  definition: "Definition",
  application: "Application",
  discrimination: "Tell apart",
};

export const flashcards: Flashcard[] = [
  /* Stage 1 — thinking */
  { id: "f01", moduleId: "thinking", kind: "definition", front: "Product", back: "An enduring vehicle for delivering value to identifiable users, with ongoing ownership and improvement. It may be software, a policy, operational procedures, or a combination." },
  { id: "f02", moduleId: "thinking", kind: "definition", front: "Project", back: "A temporary structure for coordinating investment and delivery toward a defined change." },
  { id: "f03", moduleId: "thinking", kind: "definition", front: "Product vision", back: "A description of the future state the product or service is trying to create." },
  { id: "f04", moduleId: "thinking", kind: "definition", front: "Product strategy", back: "The focused choices about which critical problems to solve to progress toward the vision — including what not to pursue." },
  { id: "f05", moduleId: "thinking", kind: "discrimination", front: "Vision or strategy: 'Reduce administrative effort, increase self-service, improve transparency'", back: "Strategy. It names directions of travel and implies trade-offs. The vision is the destination — 'a simpler, faster and more transparent experience for employers and providers'." },
  { id: "f06", moduleId: "thinking", kind: "application", front: "A sponsor says the fixed date means there is no time for discovery. What is the product move?", back: "Bounded discovery on the riskiest assumption inside the approved constraints. Product management is not all or nothing — some discovery beats none." },
  { id: "f07", moduleId: "thinking", kind: "definition", front: "The four shift-in-thinking pairs", back: "Projects → products. Outputs → outcomes. Requirements → problems. Delivery → learning." },

  /* Stage 2 — discovery */
  { id: "f08", moduleId: "discovery", kind: "definition", front: "Discovery", back: "Work that reduces uncertainty about users, problems, opportunities and solution risks before and during delivery." },
  { id: "f09", moduleId: "discovery", kind: "definition", front: "Persona", back: "A research-grounded synthesis of user goals, needs, behaviours, motivations, challenges and context — not a demographic stereotype." },
  { id: "f10", moduleId: "discovery", kind: "definition", front: "Service blueprint", back: "A view connecting user actions and front-stage interactions to back-stage activities, supporting systems and processes." },
  { id: "f11", moduleId: "discovery", kind: "definition", front: "Created need", back: "Something users are forced to do because of policy or the way government works — a need manufactured by the system, not held by the user." },
  { id: "f12", moduleId: "discovery", kind: "discrimination", front: "Stated, unstated or created: 'I need the reconciliation spreadsheet emailed each Monday' — the spreadsheet exists only because two systems don't integrate", back: "Stated and created. Explicitly asked for, but the need exists only as a workaround. Automating it would entrench the workaround instead of removing it." },
  { id: "f13", moduleId: "discovery", kind: "definition", front: "Hypothesis", back: "A testable statement linking a proposed action for a group to an expected outcome and observable evidence — including what would show it false." },
  { id: "f14", moduleId: "discovery", kind: "application", front: "Discovery has produced a 60-page report recommending a mobile app. What are the two failures?", back: "The recommendation is not traceable to the evidence, and discovery has crossed into prescribing a solution. Discovery produces insight and hypotheses, not requirements or features." },
  { id: "f15", moduleId: "discovery", kind: "definition", front: "Lean Canvas riskiest assumption", back: "For each hypothesis, the claim that — if wrong — makes the whole thing fail. It is what you test first." },
  { id: "f16", moduleId: "discovery", kind: "discrimination", front: "Journey map or service blueprint?", back: "Journey map: the user's experience over time — goals, activities, touchpoints, emotions, pain points. Blueprint: what happens behind the scenes to produce that experience." },

  /* Stage 3 — outcomes */
  { id: "f17", moduleId: "outcomes", kind: "definition", front: "Output", back: "The thing produced or delivered — a feature, form, policy or release. The what." },
  { id: "f18", moduleId: "outcomes", kind: "definition", front: "Outcome", back: "A meaningful change in behaviour, performance, experience, risk or value resulting from the work. The why." },
  { id: "f19", moduleId: "outcomes", kind: "definition", front: "Leading indicator", back: "A predictive measure of future performance — for example feature usage or completion rate. It must itself be validated." },
  { id: "f20", moduleId: "outcomes", kind: "definition", front: "Lagging indicator", back: "A measure of past performance — for example customer satisfaction or outcome achieved." },
  { id: "f21", moduleId: "outcomes", kind: "definition", front: "Guardrail measure", back: "A measure that detects unacceptable harm, trade-offs or displacement while pursuing the primary outcome." },
  { id: "f22", moduleId: "outcomes", kind: "definition", front: "OKR grading scale", back: "4 exceeded expected results; 3 sufficient achievement; 2 made progress but fell short; 1 no progress." },
  { id: "f23", moduleId: "outcomes", kind: "application", front: "Calls fell 34% — but only because status enquiries were routed to a four-day callback queue. What happened?", back: "Displacement, not resolution. The measure moved without the outcome changing. A guardrail on time-to-resolution would have caught it." },
  { id: "f24", moduleId: "outcomes", kind: "discrimination", front: "Key result or action: 'Run five user interviews'", back: "Action. A key result is a measurable change with baseline, target and timeframe — 'reduce median completion time from 18 to 12 minutes by June'." },
  { id: "f25", moduleId: "outcomes", kind: "definition", front: "The five kinds of good outcome", back: "User value; operational efficiency; financial impact; risk reduction; learning and reduced uncertainty." },

  /* Stage 4 — exploration */
  { id: "f26", moduleId: "exploration", kind: "definition", front: "Desirability / value risk", back: "Whether the problem matters and people will choose or benefit from the proposed response." },
  { id: "f27", moduleId: "exploration", kind: "definition", front: "Feasibility risk", back: "Whether the team can build and operate the solution with available technology, data, skills and time." },
  { id: "f28", moduleId: "exploration", kind: "definition", front: "Viability risk", back: "Whether policy, operational, legal, financial and organisational conditions can sustain the solution." },
  { id: "f29", moduleId: "exploration", kind: "definition", front: "MVP", back: "The smallest coherent thing that delivers value and generates learning. Focused, intentional, uncertainty-reducing — not poor quality and not unfinished." },
  { id: "f30", moduleId: "exploration", kind: "discrimination", front: "Trade-off pair: affordable to run and technically sound, but no validated user problem", back: "Feasible + Viable = operable and sustainable. The risk is that it does not solve a genuine user problem." },
  { id: "f31", moduleId: "exploration", kind: "discrimination", front: "Trade-off pair: users need it and policy supports it, but it needs real-time data from batch systems", back: "Desirable + Viable = valuable and needed. The risk is that it is not technically achievable in the current landscape. You owe a feasibility spike." },
  { id: "f32", moduleId: "exploration", kind: "application", front: "Which method tests whether people can complete a task, versus whether an integration will hold?", back: "Prototype and usability testing for comprehension and usability; a technical spike against representative interfaces and data for feasibility." },
  { id: "f33", moduleId: "exploration", kind: "application", front: "When is an A/B test the right method?", back: "When you need to compare the effect of variants on a measure, at sufficient scale, with a working build. It shows difference, never explanation." },

  /* Stage 5 — delivery */
  { id: "f34", moduleId: "delivery", kind: "definition", front: "Product Goal", back: "The long-term objective for the Scrum Team and the target against which the Product Backlog emerges." },
  { id: "f35", moduleId: "delivery", kind: "definition", front: "Product Backlog", back: "An emergent, ordered list of what is needed to improve the product; the Scrum Team's single source of work. Anyone may add; product management orders." },
  { id: "f36", moduleId: "delivery", kind: "definition", front: "Sprint", back: "Two weeks (10 working days) in the DES cadence, delivering small increments of releasable value." },
  { id: "f37", moduleId: "delivery", kind: "definition", front: "Program Increment (PI)", back: "Ten weeks (50 working days) in the DES cadence, delivering key business outcomes. Five sprints fit inside one." },
  { id: "f38", moduleId: "delivery", kind: "definition", front: "Epic", back: "A measurable business outcome spanning many PIs and teams. Maps to business-case benefits and blueprint pain points. Carries a hypothesis, description, outcomes/benefits and objective." },
  { id: "f39", moduleId: "delivery", kind: "definition", front: "Feature — minimum detail", back: "Hypothesis; sizing estimate; acceptance criteria; in/out of scope; feature measurement; risks, issues and dependencies. Demonstrable within a PI." },
  { id: "f40", moduleId: "delivery", kind: "definition", front: "Story — minimum detail", back: "As a [persona] I want [goal] so that [reason]; story points; area path; iteration path aligned to the expected sprint." },
  { id: "f41", moduleId: "delivery", kind: "definition", front: "WSJF", back: "Relative cost of delay ÷ relative job duration or size. Cost of delay combines user/business value, time criticality, and risk reduction or opportunity enablement." },
  { id: "f42", moduleId: "delivery", kind: "discrimination", front: "Which of epic, feature, story and Program Increment are Scrum terms?", back: "None of them. Scrum defines the Product Goal, Product Backlog, Sprint Backlog and Increment. The rest come from scaled frameworks and local DES practice." },
  { id: "f43", moduleId: "delivery", kind: "application", front: "While delivery teams build PI N, what is product management doing?", back: "Discovery and solution exploration for PI N+1, so refined validated features are ready when the next increment starts." },
  { id: "f44", moduleId: "delivery", kind: "definition", front: "Outcome roadmap", back: "Now / Next / Later bands carrying objectives and key results, communicating direction at a confidence the evidence supports." },
  { id: "f45", moduleId: "delivery", kind: "application", front: "Eight features proposed, six refined, historical throughput five. What do you commit to?", back: "The refined six at most, with the capacity gap named. Send the two unrefined items to refinement — sponsorship is not refinement." },

  /* Stage 6 — lifecycle */
  { id: "f46", moduleId: "lifecycle", kind: "definition", front: "Discovery phase (DTA)", back: "Understand the service landscape, user needs, policy intent and technology constraints." },
  { id: "f47", moduleId: "lifecycle", kind: "definition", front: "Alpha phase", back: "Explore several approaches and test hypotheses through prototypes and research, before committing to Beta." },
  { id: "f48", moduleId: "lifecycle", kind: "definition", front: "Beta phase", back: "Build and trial an accessible, secure service based on successful Alpha learning — the first test under real conditions." },
  { id: "f49", moduleId: "lifecycle", kind: "definition", front: "Live phase", back: "Operate the service and continue improving it through performance data and user feedback." },
  { id: "f50", moduleId: "lifecycle", kind: "application", front: "Alpha tested three approaches; two failed. The board wants all three carried into Beta. What do you say?", back: "Eliminating two options is Alpha succeeding, not effort wasted. Carrying failed approaches forward converts learning into rework." },
  { id: "f51", moduleId: "lifecycle", kind: "discrimination", front: "DTA phases or DES phases: Pre-Approval, Pre-Delivery, Delivery, Closure", back: "DES delivery phases. The DTA process is Discovery, Alpha, Beta and Live. They coexist and are not interchangeable." },

  /* Stage 7 — roles */
  { id: "f52", moduleId: "roles", kind: "definition", front: "Product trio", back: "Product manager (viable), designer (desirable) and technology lead (feasible) collaborating on discovery and product decisions." },
  { id: "f53", moduleId: "roles", kind: "definition", front: "Product manager horizon", back: "Vision, strategy, outcomes, roadmaps and stakeholder alignment. Asks: are we working on the right things?" },
  { id: "f54", moduleId: "roles", kind: "definition", front: "Product Owner horizon", back: "Backlog management, story refinement, acceptance criteria, sprint support and clarifying requirements. Asks: do teams have what they need to deliver?" },
  { id: "f55", moduleId: "roles", kind: "definition", front: "Senior Responsible Officer", back: "Owns the project outcomes, the delivery roadmap and championing the change." },
  { id: "f56", moduleId: "roles", kind: "definition", front: "The three layers and their questions", back: "Strategic: what future are we trying to create? Coordination: what should we deliver next? Delivery: how do we successfully deliver this work?" },
  { id: "f57", moduleId: "roles", kind: "definition", front: "Decision rights", back: "Explicit agreement about who decides, who contributes evidence, who is consulted and when escalation is required." },
  { id: "f58", moduleId: "roles", kind: "application", front: "The Product Owner spends every sprint relaying questions between the team and three business areas. What is the real problem?", back: "The PO has become a requirements courier because decision rights were never agreed. Fix the authority, not the calendar." },

  /* Stage 8 — government */
  { id: "f59", moduleId: "government", kind: "definition", front: "Digital Service Standard 2.0", back: "The Australian Government's current 10-criterion standard, reduced from 13. Fully in effect: new services from 1 July 2024, pre-existing public-facing services from 1 July 2025." },
  { id: "f60", moduleId: "government", kind: "definition", front: "DES delivery phases", back: "Pre-Approval, Pre-Delivery, Delivery, Closure — with stage gates between them." },
  { id: "f61", moduleId: "government", kind: "definition", front: "Principle 1 and its implication", back: "Start with the problem, not the solution: understand user needs, policy intent and root causes first. Discovery comes before build." },
  { id: "f62", moduleId: "government", kind: "definition", front: "Principle 6 and its implication", back: "Design for the whole service: optimise the end-to-end experience across channels and systems, not individual projects. Reuse before rebuild." },
  { id: "f63", moduleId: "government", kind: "definition", front: "Policy intent vs user need", back: "Policy defines a required public result; research shows how people experience and can successfully meet it. A policy requirement is not automatically a user need." },
  { id: "f64", moduleId: "government", kind: "definition", front: "Evidence-based gate", back: "A governance decision using outcome evidence, readiness, unresolved assumptions and material risk — not document completion alone." },
  { id: "f65", moduleId: "government", kind: "application", front: "Which DES phase carries the greatest product risk, and why?", back: "Closure. The project ends but the product does not, so ownership of performance, measures and improvement must be handed over or the service decays unowned." },
  { id: "f66", moduleId: "government", kind: "application", front: "Policy mandates a declaration screen users cannot understand. The assisted channel already uses a plain-language script. What do you do?", back: "Meet the policy intent using the evidence and the existing script, then measure comprehension. Compliance says what must be true; design determines how it is experienced." },

  /* Stage 9 — integration */
  { id: "f67", moduleId: "integration", kind: "definition", front: "Evidence chain", back: "Need → problem → outcome → options → evidence → ordered delivery → measurement → learning." },
  { id: "f68", moduleId: "integration", kind: "definition", front: "Assumption", back: "Something believed true but not yet supported strongly enough for the decision being made." },
  { id: "f69", moduleId: "integration", kind: "definition", front: "What good looks like — the six qualities", back: "Outcome focused, user centred, evidence based, collaborative, adaptive, value driven." },
  { id: "f70", moduleId: "integration", kind: "definition", front: "Product judgement", back: "Choosing a defensible course under uncertainty by balancing evidence, outcomes, constraints, risk and learning." },
  { id: "f71", moduleId: "integration", kind: "application", front: "A pilot improves the average but worsens results for assistive-technology users. What does the evidence require?", back: "Treat it as a guardrail failure, investigate the cause and adapt before scaling. Averages can conceal distributional harm." },
  { id: "f72", moduleId: "integration", kind: "application", front: "Ten minutes with the SRO: delivery is green but the outcome measure probably will not move. What do you lead with?", back: "The outcome risk, the evidence behind it and the decision you need — schedule as context. The SRO owns the project outcomes." },
  /* ---- Expansion: cross-cutting judgement and vocabulary ---- */
  { id: "f73", moduleId: "thinking", kind: "application", front: "A stakeholder says 'the users want it' about a feature nobody has researched. What do you ask?", back: "Which users, doing what, and what evidence shows they cannot do it today? 'Users want it' is an assumption wearing the costume of a finding." },
  { id: "f74", moduleId: "thinking", kind: "discrimination", front: "Output or outcome: 'Portal migrated to the new platform'", back: "Output. The outcome would be what changed for users or operations because of the migration — faster completion, fewer failures, lower running cost." },
  { id: "f75", moduleId: "discovery", kind: "application", front: "Analytics show a 60% drop-off. Interviews say the wording is confusing. What have you still not established?", back: "That wording is the binding constraint. Removing it might reveal a second barrier. Only a test establishes that fixing it changes the outcome." },
  { id: "f76", moduleId: "discovery", kind: "definition", front: "Triangulation", back: "Comparing evidence from different methods — behaviour, stated preference, operational data — because they routinely disagree, and the disagreement is itself the finding." },
  { id: "f77", moduleId: "discovery", kind: "discrimination", front: "Insight or requirement: 'Providers check status an average of four times per application'", back: "Insight. It describes observed behaviour. The requirement would be a solution someone chose in response to it." },
  { id: "f78", moduleId: "outcomes", kind: "application", front: "Your only measure is 'user satisfaction'. What is the risk?", back: "It is lagging, slow-moving and heavily confounded. You will not know whether you helped until long after the decisions are made. Pair it with a leading behavioural measure." },
  { id: "f79", moduleId: "outcomes", kind: "definition", front: "Vanity metric", back: "A number that reliably goes up and never changes a decision — page views, notifications sent, releases shipped. If no result would make you act differently, stop reporting it." },
  { id: "f80", moduleId: "outcomes", kind: "discrimination", front: "Guardrail or key result: 'Escalation for unresolved cases stays above 95%'", back: "Guardrail. It must not get worse; it is not what you are trying to improve. Key results move; guardrails hold." },
  { id: "f81", moduleId: "exploration", kind: "application", front: "You have three weeks and one engineer. Which assumption do you test?", back: "The one that is both most uncertain and most consequential — where being wrong kills the idea. Cheapness is measured against the decision, not the effort." },
  { id: "f82", moduleId: "exploration", kind: "definition", front: "Falsifiable test", back: "One where you have written down, in advance, the result that would make you stop or change direction. Without that line, you will rationalise any outcome." },
  { id: "f83", moduleId: "exploration", kind: "discrimination", front: "Which risk: 'The API exists but only refreshes overnight, and users need same-day status'", back: "Feasibility, surfacing as a value problem. The technology works; it cannot meet the need. Test the data freshness before designing around it." },
  { id: "f84", moduleId: "delivery", kind: "application", front: "A feature has acceptance criteria but no feature measurement. What breaks?", back: "You can tell whether it was built, never whether it worked. The PI closes, the benefit is assumed, and nothing feeds the next decision." },
  { id: "f85", moduleId: "delivery", kind: "definition", front: "Refinement", back: "Confirming the detail, scope and feasibility of candidate features before an increment starts. Committing to unrefined work is committing to a guess." },
  { id: "f86", moduleId: "delivery", kind: "discrimination", front: "Now/Next/Later or PI X/PI Y — which is the outcome roadmap?", back: "Now/Next/Later, carrying objectives and key results. PI X/PI Y is the feature roadmap, carrying likely solution work. Confidence bands versus committed slots." },
  { id: "f87", moduleId: "lifecycle", kind: "application", front: "Live service, falling completion rate, nobody has noticed for six months. What was missing?", back: "An owner, a measure and a cadence. Any one of the three missing and decay goes unobserved until someone complains." },
  { id: "f88", moduleId: "roles", kind: "application", front: "Every decision is going to the Project Board. What is the cost?", back: "Board capacity is spent on reversible detail, so material risk gets less attention, and the team learns not to decide anything. Push reversible decisions down." },
  { id: "f89", moduleId: "government", kind: "application", front: "You are asked to 'just make it accessible at the end'. What do you say?", back: "Accessibility is a delivery obligation and a design input, not a remediation phase. Retrofitting costs more and usually still fails the people it was meant to serve." },
  { id: "f90", moduleId: "government", kind: "discrimination", front: "Which framework: 'Discovery, Alpha, Beta, Live'?", back: "The DTA service design and delivery process. The DES pipeline is Pre-Approval, Pre-Delivery, Delivery, Closure. The Digital Service Standard is a third thing again — 10 criteria applied across all of it." },
  { id: "f91", moduleId: "integration", kind: "application", front: "How do you know a roadmap item is justified?", back: "Trace it back to a user or service problem with evidence, and forward to a measure that would show whether it worked. If either end is missing, priority is unjustifiable." },
  { id: "f92", moduleId: "integration", kind: "definition", front: "Distributional harm", back: "An intervention that improves the average while making things worse for a specific group. Averages conceal it; disaggregated guardrails reveal it." },
];

/* ------------------------------------------------------------------ *
 * Toolkit templates
 * ------------------------------------------------------------------ */

export type ToolkitTemplate = {
  id: string;
  title: string;
  prompt: string;
  example: string;
  note?: string;
};

export const toolkitTemplates: ToolkitTemplate[] = [
  {
    id: "vision",
    title: "Product vision",
    prompt: "For [users], create a future where [meaningful state], so that [public/user/organisational value].",
    example:
      "For employment-service providers, create a future where application progress is understandable and actionable, so they can support participants confidently with less avoidable effort.",
  },
  {
    id: "problem",
    title: "Problem statement",
    prompt:
      "Our [who] are currently experiencing [what] when trying to [goal]. This occurs in [where] and has been happening since [when]. This is critical because [why / impact]. Evidence: [sources].",
    example:
      "Our providers are currently experiencing an inability to determine application progress when trying to support participants. This occurs across the provider portal and the support line, and has been happening since the 2023 platform split. This is critical because it generates avoidable support demand and leaves participants without answers. Evidence: call-reason coding, 12 interviews, journey observation.",
    note: "This follows the deck's who/what/goal/where/when/why structure from slide 30.",
  },
  {
    id: "hmw",
    title: "How might we",
    prompt: "How might we [intended action] for [who] so that [desired outcome], while [important guardrail]?",
    example:
      "How might we make application progress understandable for providers so they can act without assistance, while preserving clear escalation for unresolved cases?",
    note: "The deck's format (slide 31) omits the guardrail clause. It is added here because government services almost always have a group whose access must not be traded away.",
  },
  {
    id: "hypothesis",
    title: "Hypothesis",
    prompt:
      "We believe [intervention] for [audience] will [outcome]. We will know this is true when we see [signal], and false if [disconfirming signal], without [guardrail failure].",
    example:
      "We believe plain-language status and next-step guidance will reduce avoidable calls for providers. We will know it is true if successful self-service rises above 65%, and false if call volume holds while page views rise — without unresolved-case escalation dropping below 95%.",
    note: "The deck's version (slide 32) has no disconfirming signal and no guardrail. Both are added here: a hypothesis you cannot imagine being wrong is not testable.",
  },
  {
    id: "okr",
    title: "Objective and key results",
    prompt:
      "Objective: [meaningful direction]. KR1: move [metric] from [baseline] to [target] by [date]. KR2: [second measure]. Guardrail: [must not worsen]. Grade at review: [1–4] because [insight].",
    example:
      "Objective: Make application progress understandable without assistance. KR1: successful self-service 42% → 70% by June. KR2: avoidable status calls down 30%. Guardrail: unresolved-case escalation stays above 95%.",
  },
  {
    id: "experiment",
    title: "Experiment brief",
    prompt:
      "Decision: [what will change]. Riskiest assumption: [claim]. Method: [test]. Participants/data: [sample]. Success/stop signals: [thresholds decided in advance].",
    example:
      "Decision: whether to invest in live status integration. Assumption: the proposed information resolves the main uncertainty. Test: realistic prototype with 8 representative providers using manually supplied data. Proceed if 6 of 8 correctly state the next action unprompted.",
  },
  {
    id: "epic",
    title: "Epic",
    prompt:
      "Epic hypothesis: [outcome we believe this delivers]. Description: [scope]. Business outcomes and benefits: [measurable outcomes tracked, linked to the business case]. Objective: [the objective it serves].",
    example:
      "Epic hypothesis: consolidating application status into a single provider view will materially reduce avoidable support demand. Benefits: 30% reduction in status-related contacts; linked to business-case benefit B3. Objective: reduce administrative effort for providers.",
    note: "Epics span many PIs and multiple teams. Written to the deck's minimum detail, slide 61.",
  },
  {
    id: "feature",
    title: "Feature",
    prompt:
      "Feature hypothesis: [user outcome expected]. Sizing estimate: [relative size]. Acceptance criteria: [conditions]. In scope / out of scope: [boundaries]. Feature measurement: [metric, e.g. 30% reduction in processing time]. Risks, issues, dependencies: [items].",
    example:
      "Feature hypothesis: providers shown a plain-language status with a next action will resolve their query without contacting support. Measurement: successful self-service rate for status queries, target 65% in the first PI after release. Out of scope: payment status. Dependency: status API availability from the assessment platform.",
    note: "Features are demonstrable within a PI. Feature measurement is the field most often skipped and the one that decides whether you learn anything.",
  },
  {
    id: "story",
    title: "User story with evidence",
    prompt:
      "As a [persona], I want [capability] so that [reason]. Acceptance: [observable conditions]. Story points: [estimate]. Area path: [team/product]. Iteration path: [sprint]. Outcome link: [measure].",
    example:
      "As a provider, I want to see the current application status and the required next action so I can support the participant without calling. Acceptance: status meaning is available to screen readers, a timestamp is shown, and the escalation path is visible. Outcome link: successful self-service rate.",
  },
  {
    id: "gate",
    title: "Evidence-based gate brief",
    prompt:
      "Decision requested: [decision]. Phase gate: [Pre-Approval / Pre-Delivery / Delivery / Closure]. Outcome: [result sought]. Evidence: [what supports it]. Uncertainty: [what remains]. Risks and standards: [material items, including DSS criteria]. Ownership after this gate: [named owner]. Next test or investment: [proposal].",
    example:
      "Proceed to a controlled Beta after accessibility remediation and baseline capture. Evidence supports comprehension; data freshness remains a material operational risk. Enduring owner named for post-Live performance.",
  },
];

/* ------------------------------------------------------------------ *
 * Capstone
 * ------------------------------------------------------------------ */

export type CapstoneStep = {
  id: string;
  title: string;
  prompt: string;
  /** What a substantive response needs to contain — used for self-assessment. */
  checks: string[];
};

/** Words, not characters. The previous 40-character gate was met by one short sentence. */
export const CAPSTONE_MIN_WORDS = 60;

export const capstoneSteps: CapstoneStep[] = [
  {
    id: "c1",
    title: "User and service context",
    prompt: "Identify the users, their real goal, the end-to-end service and the strongest available evidence.",
    checks: [
      "Names a specific user group and what they are trying to achieve",
      "Describes the service across channels, not just the digital interface",
      "Cites the evidence relied on and its limits",
    ],
  },
  {
    id: "c2",
    title: "Problem and root cause",
    prompt:
      "Write a solution-neutral problem statement. Separate the visible symptom from the likely root causes and mark remaining assumptions.",
    checks: [
      "Problem statement contains no proposed solution",
      "Distinguishes symptom from root cause",
      "Flags which claims are still assumptions",
    ],
  },
  {
    id: "c3",
    title: "Vision and strategic choice",
    prompt: "Describe the future state, the first strategic focus and at least one deliberate non-priority.",
    checks: [
      "Vision describes a state, not a feature",
      "Names the first problem to solve and why it is first",
      "States something explicitly deferred",
    ],
  },
  {
    id: "c4",
    title: "Outcome and measures",
    prompt: "Write one objective, two key results, one leading indicator and one guardrail with definitions and baselines.",
    checks: [
      "Key results have baseline, target and timeframe",
      "Leading indicator is distinguished from the outcome",
      "Guardrail names a group or channel that must not be harmed",
    ],
  },
  {
    id: "c5",
    title: "Options and risks",
    prompt:
      "Generate at least three materially different options, including at least one non-build option. Compare value/usability, feasibility and viability risks.",
    checks: [
      "Three genuinely different options, not three variants of one",
      "At least one process, policy or non-build option",
      "Each option assessed against all three lenses",
    ],
  },
  {
    id: "c6",
    title: "Experiment",
    prompt: "Choose the riskiest assumption and design the cheapest credible test, including decision thresholds set in advance.",
    checks: [
      "Identifies one assumption as both critical and uncertain",
      "Method matches the kind of risk",
      "States the result that would stop or change the idea",
    ],
  },
  {
    id: "c7",
    title: "Delivery approach",
    prompt:
      "Define a Product Goal, an initial ordered backlog with at least one item written to the deck's minimum detail, and an outcome-oriented Now/Next/Later roadmap.",
    checks: [
      "Backlog is ordered with a stated rationale",
      "At least one epic, feature or story written to its required fields",
      "Roadmap uses confidence bands rather than false dates",
    ],
  },
  {
    id: "c8",
    title: "Government readiness",
    prompt:
      "Address policy intent, accessibility, privacy and security, operational ownership, Digital Service Standard evidence, the relevant DES phase gate and the next governance decision.",
    checks: [
      "Names the DES phase gate and what must be true to pass it",
      "Treats accessibility as a delivery obligation, not an enhancement",
      "Names an enduring owner for post-Live performance",
    ],
  },
  {
    id: "c9",
    title: "Learning loop",
    prompt: "Explain how live performance, research and service feedback will change priorities after release.",
    checks: [
      "Names the evidence that will be observed and by whom",
      "States the cadence connecting learning to the next increment",
      "Identifies who makes the resulting backlog decisions",
    ],
  },
];

export const capstoneRubric = [
  { id: "traceable", title: "Traceable", detail: "Every action connects to evidence and an outcome." },
  { id: "testable", title: "Testable", detail: "Critical assumptions have credible tests and predefined thresholds." },
  { id: "balanced", title: "Balanced", detail: "User, policy, operational and technical constraints are all visible." },
  { id: "measurable", title: "Measurable", detail: "Baselines, outcomes and guardrails are defined, not implied." },
  { id: "sustainable", title: "Sustainable", detail: "Ownership and learning continue after release." },
];

/* ------------------------------------------------------------------ *
 * DES field guide — reference, not assessed
 * ------------------------------------------------------------------ */

export type FieldGuideEntry = {
  id: string;
  title: string;
  summary: string;
  slides?: string;
  sourceIds: string[];
  items: { term: string; detail: string }[];
};

export const fieldGuide: FieldGuideEntry[] = [
  {
    id: "des-phases",
    title: "DES delivery phases",
    summary:
      "The agreed end-to-end pipeline for all DES projects, with stage gates between phases. Distinct from the DTA service phases and from the Digital Service Standard.",
    slides: "90–91",
    sourceIds: ["deck"],
    items: [
      { term: "Pre-Approval", detail: "Establishing the case for investment. Product contribution: problem definition, user evidence, outcome hypotheses, options and risks." },
      { term: "Pre-Delivery", detail: "Planning with the right amount of detail and establishing the delivery runway. Product contribution: refined backlog, validated approach, measures and baselines defined before build." },
      { term: "Delivery", detail: "Building and releasing increments. Product contribution: ordering the backlog, protecting the outcome, running discovery an increment ahead." },
      { term: "Closure", detail: "Transition and completion. Product contribution: handing over enduring ownership, measures and an improvement cadence — the phase where product risk is highest." },
    ],
  },
  {
    id: "dta-phases",
    title: "DTA service design and delivery phases",
    summary:
      "The government service process the product lifecycle aligns to. The deck presents Beta and Live combined; they are separated here because the ownership question at go-live is where services most often fail.",
    slides: "73",
    sourceIds: ["dss", "deck"],
    items: [
      { term: "Discovery", detail: "Understand the service landscape, user needs, policy intent and technology constraints." },
      { term: "Alpha", detail: "Explore several approaches and test hypotheses through prototypes and research." },
      { term: "Beta", detail: "Build and trial an accessible, secure service based on successful Alpha learning." },
      { term: "Live", detail: "Operate the service and continue improving through performance data and user feedback." },
    ],
  },
  {
    id: "principles",
    title: "The seven principles in practice",
    summary: "DES operating principles and what each one changes about day-to-day product work.",
    slides: "88–89",
    sourceIds: ["deck"],
    items: [
      { term: "1. Start with the problem, not the solution", detail: "Understand user needs, policy intent and root causes before committing. Discovery comes before build." },
      { term: "2. Validate before you scale", detail: "Reduce risk through prototypes, testing and incremental releases." },
      { term: "3. Deliver value early and often", detail: "Prefer incremental delivery of valuable outcomes over large, infrequent releases." },
      { term: "4. Decisions belong closest to the problem", detail: "People with the greatest understanding of users and delivery realities make day-to-day decisions." },
      { term: "5. Focus on outcomes, not outputs", detail: "Outcomes over features, benefits over deliverables, value over activity." },
      { term: "6. Design for the whole service", detail: "Optimise end-to-end experience across channels and systems. Reuse before rebuild." },
      { term: "7. Learn continuously", detail: "Discovery, validation and improvement continue throughout the life of a service." },
    ],
  },
  {
    id: "wow",
    title: "Ways of Working — behaviours",
    summary: "The behavioural half of DES ways of working. The other half is the Digital Delivery Framework.",
    slides: "87",
    sourceIds: ["deck"],
    items: [
      { term: "We put user needs at the centre", detail: "Decisions are grounded in what users actually do and need." },
      { term: "We are accountable and take ownership", detail: "Issues are owned and solved, not routed." },
      { term: "We empower our people", detail: "Authority sits with the people doing the work." },
      { term: "We connect and work across boundaries", detail: "Whole-of-service beats local optimisation." },
      { term: "We do the basics brilliantly", detail: "Reliability and quality before novelty." },
      { term: "We are innovative and contemporary", detail: "Current practice, adopted deliberately rather than fashionably." },
    ],
  },
  {
    id: "cadence",
    title: "Cadence and backlog fields",
    summary:
      "The DES planning rhythm and the minimum detail each backlog level must carry. Area path and iteration path are Azure DevOps fields.",
    slides: "60–67",
    sourceIds: ["deck", "scrum"],
    items: [
      { term: "Sprint", detail: "2 weeks / 10 working days. Delivers small increments of releasable value." },
      { term: "Program Increment (PI)", detail: "10 weeks / 50 working days. Delivers key business outcomes. Five sprints per PI." },
      { term: "PI flow", detail: "Business outcome → candidate features → refinement → increment planning → delivery → measurement." },
      { term: "Epic fields", detail: "Epic hypothesis; description; business outcomes and benefits; objective." },
      { term: "Feature fields", detail: "Hypothesis; sizing estimate; acceptance criteria; in/out of scope; feature measurement; risks, issues and dependencies." },
      { term: "Story fields", detail: "As a [persona] I want [goal] so that [reason]; story points; area path; iteration path." },
      { term: "Not Scrum terms", detail: "Epic, feature and Program Increment come from scaled frameworks and local practice. Scrum defines Product Goal, Product Backlog, Sprint Backlog and Increment." },
    ],
  },
  {
    id: "roles",
    title: "Roles around the product manager",
    summary: "Who owns what across governance, coordination and delivery.",
    slides: "79, 92",
    sourceIds: ["deck"],
    items: [
      { term: "Senior Responsible Officer", detail: "Owns project outcomes, the delivery roadmap and championing the change." },
      { term: "Senior Supplier", detail: "Supplier-side commitment and capability." },
      { term: "Project Board", detail: "Investment and material risk decisions." },
      { term: "Lead Delivery Manager", detail: "Delivery across teams; removing systemic impediments." },
      { term: "Product Manager", detail: "Outcomes, priorities and product direction. Asks: are we working on the right things?" },
      { term: "Product Owner", detail: "Building, curating and prioritising a refined, validated backlog. Asks: do teams have what they need?" },
      { term: "UX Lead and designers", detail: "User research, service and interaction design." },
      { term: "Solution Architect", detail: "Technical approach and integrity." },
      { term: "Scrum Master", detail: "Team process, flow and impediment removal." },
      { term: "BAs, developers, testers", detail: "Making working increments." },
    ],
  },
  {
    id: "wsjf",
    title: "Prioritisation reference",
    summary: "WSJF components and the impact/effort quadrants, for use in refinement.",
    slides: "64",
    sourceIds: ["wsjf", "deck"],
    items: [
      { term: "WSJF formula", detail: "Cost of delay ÷ job size. Higher sequences earlier." },
      { term: "Cost of delay", detail: "User and business value + time criticality + risk reduction or opportunity enablement." },
      { term: "Job size", detail: "Relative effort or duration. The denominator — which is why small valuable work moves early." },
      { term: "Quick wins", detail: "High impact, low effort. Do first." },
      { term: "Big-ticket items", detail: "High impact, high effort. Plan deliberately." },
      { term: "Fill-in jobs", detail: "Low impact, low effort. Do when capacity allows." },
      { term: "Thankless tasks", detail: "Low impact, high effort. Challenge whether they should be done at all." },
      { term: "Judgement still applies", detail: "Dependencies, safety, legislated mandates and confidence can and should override a score." },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Divergence register — where this course departs from the deck
 * ------------------------------------------------------------------ */

export type Divergence = {
  id: string;
  topic: string;
  slides: string;
  deck: string;
  here: string;
  why: string;
};

export const divergences: Divergence[] = [
  {
    id: "d1",
    topic: "Hypothesis statement",
    slides: "32",
    deck: "'We believe that [doing this] for [these people] will achieve [this outcome]. We'll know this is true when we see [this feedback / behaviour change].'",
    here: "Adds a disconfirming signal and a guardrail clause.",
    why: "The deck's form can only be confirmed, never falsified, and it has no protection against achieving the outcome by harming another group. Both additions are required for the measure design taught in Stage 3 to work.",
  },
  {
    id: "d2",
    topic: "How might we",
    slides: "31",
    deck: "'How might we [intended action] for [who] so that [desired outcome]?'",
    here: "Adds 'while [important guardrail]'.",
    why: "Government services almost always have a group whose access must not be traded away for an average improvement. Naming it in the opportunity framing stops it being discovered at accessibility testing.",
  },
  {
    id: "d3",
    topic: "Beta and Live",
    slides: "73",
    deck: "Presents the DTA process as Discovery, Alpha, and a combined Beta/Live.",
    here: "Treats Beta and Live as distinct phases.",
    why: "The transition from Beta to Live is where enduring ownership is either assigned or lost. Combining them makes the most common product failure in government invisible.",
  },
  {
    id: "d4",
    topic: "Digital Service Standard",
    slides: "not covered",
    deck: "The deck does not mention the Digital Service Standard.",
    here: "Stage 8 covers Version 2.0: 10 criteria, applicability dates and lifecycle-wide use.",
    why: "The standard is a live obligation for public-facing services and post-dates much of the deck's framing. Omitting it would leave a learner unaware of a requirement that applies to their work.",
  },
  {
    id: "d5",
    topic: "Attribution of the PM definition",
    slides: "8, 54",
    deck: "Quotes 'the intersection of business, technology and user experience...' without attribution.",
    here: "Attributes the framing to Martin Eriksson and lists him as a source.",
    why: "Eriksson appears on the deck's own recommended-reading list (slide 97). Attributing the quote is a small correction that also points learners at the fuller argument.",
  },
  {
    id: "d6",
    topic: "MVP and accessibility",
    slides: "56",
    deck: "'MVPs aren't: a poor-quality solution, an unfinished product.'",
    here: "Adds that an MVP must still meet accessibility and security obligations.",
    why: "In practice 'minimum' is the word most often used to defer accessibility. Making the obligation explicit closes that gap.",
  },
  {
    id: "d7",
    topic: "Problem statement structure",
    slides: "30",
    deck: "Who / what / goal / where / when / why-impact.",
    here: "Retained in full, with an added 'Evidence:' line.",
    why: "An earlier version of this course collapsed where and when into 'context'. That diverged from what learners are asked to produce at work, so the deck's structure has been restored and only the evidence line added.",
  },
];

/* ------------------------------------------------------------------ *
 * Diagnostic pool — separate from module and practice questions
 * ------------------------------------------------------------------ */

export const diagnosticQuestions: Question[] = [
  {
    id: "dx-thinking",
    moduleId: "thinking",
    prompt: "The clearest sign that a team is doing project thinking rather than product thinking is that…",
    options: [
      "success is declared when the agreed scope is delivered",
      "they work to a fixed budget",
      "they report to a Project Board",
      "they use a stage-gated delivery pipeline"],
    answer: 0,
    rationale:
      "Stage gates, fixed budgets and boards are all normal in government and compatible with product thinking. Defining success as scope delivered rather than a change achieved is the actual tell.",
  },
  {
    id: "dx-discovery",
    moduleId: "discovery",
    prompt: "You have analytics showing where users drop out, and interviews explaining why they find a step confusing. What do you still not know?",
    options: [
      "How many users are affected",
      "Whether the confusion is the binding constraint, or whether something else would stop them anyway",
      "What users say about the service",
      "Where in the journey the problem occurs"],
    answer: 1,
    rationale:
      "Quantitative tells you where and how many; qualitative tells you what people experience. Neither establishes that removing this barrier would change the outcome — that requires a test.",
  },
  {
    id: "dx-outcomes",
    moduleId: "outcomes",
    prompt: "Which of these is the strongest evidence that an OKR is well written?",
    options: [
      "The objective is ambitious and inspiring",
      "Every key result has a named owner",
      "You could tell from the key results alone whether the objective was achieved",
      "The key results are all within the team's direct control"],
    answer: 2,
    rationale:
      "Key results exist to make the objective's achievement observable. If they can all be met while the objective plainly is not, they are measuring activity. Note that outcome key results usually are not fully within a team's control — that is expected.",
  },
  {
    id: "dx-exploration",
    moduleId: "exploration",
    prompt: "The cheapest credible test is usually the one that…",
    options: [
      "produces the most data",
      "involves the fewest people",
      "can be run without engineering effort",
      "resolves the assumption most likely to kill the idea"],
    answer: 3,
    rationale:
      "Cheapness is measured against the decision, not against effort. A test that is quick but answers a question you were not going to act on is expensive.",
  },
  {
    id: "dx-delivery",
    moduleId: "delivery",
    prompt: "A backlog item has a clear title, an estimate and an assigned team, but no stated outcome. What is missing that matters most?",
    options: [
      "A technical design",
      "Acceptance criteria",
      "The link that would let anyone judge whether it should be prioritised at all",
      "A due date"],
    answer: 2,
    rationale:
      "Without a connection to a user or service outcome, priority is unjustifiable and success is unmeasurable. Acceptance criteria and design matter, but they answer 'is it done', not 'should we do it'.",
  },
  {
    id: "dx-delivery2",
    moduleId: "delivery",
    prompt: "Two items have similar value and urgency. One is a quarter the size of the other. Which usually goes first, and why?",
    options: [
      "Whichever the sponsor prefers",
      "They should be started together to balance the team's workload",
      "The larger one, because it delivers more total value",
      "The smaller one, because value and learning arrive sooner per unit of effort"],
    answer: 3,
    rationale:
      "This is the whole point of dividing cost of delay by job size. Smaller valuable work realises benefit and produces learning earlier, which also improves the next decision.",
  },
  {
    id: "dx-lifecycle",
    moduleId: "lifecycle",
    prompt: "What most reliably distinguishes a service that will keep improving after launch from one that will not?",
    options: [
      "Whether an owner, measures and an improvement cadence exist after the project ends",
      "The size of the original budget",
      "Whether the technology stack is modern",
      "The quality of the closure documentation"],
    answer: 0,
    rationale:
      "Improvement requires someone accountable, something observed and a rhythm for acting on it. Without all three, a service degrades regardless of how well it launched.",
  },
  {
    id: "dx-roles",
    moduleId: "roles",
    prompt: "A decision is reversible, low cost, and the delivery team has the most relevant information. Where should it be made?",
    options: [
      "By whoever raised it",
      "By the delivery team",
      "By the product manager, to maintain consistency",
      "At the next governance forum, for transparency"],
    answer: 1,
    rationale:
      "Reversible, local decisions belong closest to the evidence. Escalating them consumes governance capacity that material risk and investment decisions need.",
  },
  {
    id: "dx-roles2",
    moduleId: "roles",
    prompt: "Product manager and Product Owner disagree about what the team should build next. What does this most likely indicate?",
    options: [
      "There is no shared product direction that both are working from",
      "The Product Owner should defer, since the product manager owns strategy",
      "One of them is wrong about the requirement",
      "The roles have been defined badly and should be merged"],
    answer: 0,
    rationale:
      "The two roles cover different horizons of one direction. Persistent disagreement about next steps usually means the direction itself has never been made explicit.",
  },
  {
    id: "dx-government",
    moduleId: "government",
    prompt: "A stage gate reviews document completeness, schedule and budget, but not evidence or unresolved risk. What is the likely consequence?",
    options: [
      "Projects will be delivered faster",
      "Well-documented projects will be approved regardless of whether they will work",
      "Teams will produce less documentation",
      "Accessibility issues will be found earlier"],
    answer: 1,
    rationale:
      "A gate assesses whatever it asks about. If it does not ask about evidence, outcome confidence or residual risk, it cannot distinguish a sound project from a well-presented one.",
  },
  {
    id: "dx-government2",
    moduleId: "government",
    prompt: "Which best describes the relationship between a policy requirement and a user need?",
    options: [
      "Policy requirements only constrain the assisted channel",
      "They are the same thing in government services",
      "Policy defines what must be true; research defines how people can successfully meet it",
      "User needs override policy requirements where they conflict"],
    answer: 2,
    rationale:
      "Compliance sets the obligation; design determines the experience of meeting it. Treating them as identical means never noticing when policy implementation is what creates the difficulty.",
  },
  {
    id: "dx-integration",
    moduleId: "integration",
    prompt: "An intervention improves the headline measure but worsens results for one user group. What does this most require?",
    options: [
      "Removing the affected group from the denominator",
      "Accepting it as an unavoidable trade-off",
      "Reporting the headline figure with a footnote",
      "Investigating the cause and adapting before scaling"],
    answer: 3,
    rationale:
      "Averages conceal distributional harm. The disaggregated result is the finding, and it should change the scaling decision rather than be annotated.",
  },
];

/* ------------------------------------------------------------------ *
 * Glossary — every term the course uses, in one alphabetical place.
 * Written so someone can look up a word mid-meeting and get a usable
 * answer, including which framework the term belongs to.
 * ------------------------------------------------------------------ */

export type GlossaryEntry = {
  term: string;
  definition: string;
  /** Which body of practice the term belongs to. */
  origin: "Deck" | "Scrum" | "SAFe" | "Government" | "General";
  moduleId?: string;
};

export const glossary: GlossaryEntry[] = [
  { term: "Acceptance criteria", origin: "General", moduleId: "delivery", definition: "The observable conditions that must hold for a story or feature to be considered done. They answer 'is it built', not 'should we build it'." },
  { term: "Alpha", origin: "Government", moduleId: "lifecycle", definition: "The DTA phase for exploring and testing several approaches through prototypes and research, before committing to a Beta service." },
  { term: "Area path", origin: "SAFe", moduleId: "delivery", definition: "An Azure DevOps field assigning a work item to a team or product. Required on stories in the DES backlog." },
  { term: "Assumption", origin: "General", moduleId: "integration", definition: "Something believed true but not yet supported strongly enough for the decision being made. The riskiest one is what you test first." },
  { term: "Beta", origin: "Government", moduleId: "lifecycle", definition: "The DTA phase for building and trialling an accessible, secure service with real users — the first test under real operating conditions." },
  { term: "Closure", origin: "Deck", moduleId: "government", definition: "The fourth DES delivery phase. Transition and completion — and where product risk is highest, because the project ends but the product does not." },
  { term: "Cost of delay", origin: "SAFe", moduleId: "delivery", definition: "In WSJF, user and business value plus time criticality plus risk reduction or opportunity enablement. The numerator, divided by job size." },
  { term: "Created need", origin: "Deck", moduleId: "discovery", definition: "Something users are forced to do because of policy or the way government works. A need manufactured by the system, not held by the user." },
  { term: "Decision rights", origin: "General", moduleId: "roles", definition: "Explicit agreement about who decides, who contributes evidence, who is consulted, and what threshold requires escalation." },
  { term: "Desirability", origin: "General", moduleId: "exploration", definition: "Whether the problem matters and people will choose or benefit from the proposed response. The human lens in DVF." },
  { term: "Digital Service Standard", origin: "Government", moduleId: "government", definition: "The Australian Government's current 10-criterion standard, reduced from 13. Fully in effect: new services from 1 July 2024, pre-existing public-facing services from 1 July 2025." },
  { term: "Discovery", origin: "Deck", moduleId: "discovery", definition: "Work that reduces uncertainty about users, problems, opportunities and solution risks. Produces insight and hypotheses — never requirements or features." },
  { term: "Distributional harm", origin: "General", moduleId: "integration", definition: "An intervention that improves the average while worsening outcomes for a specific group. Guardrails on disaggregated measures reveal it." },
  { term: "DVF", origin: "General", moduleId: "exploration", definition: "Desirable, Viable, Feasible — a three-lens filter applied before investing. Delivery fails when one perspective dominates." },
  { term: "Epic", origin: "SAFe", moduleId: "delivery", definition: "A measurable business outcome spanning many PIs and teams. Not a Scrum term. Requires a hypothesis, description, business outcomes and benefits, and an objective." },
  { term: "Feasibility", origin: "General", moduleId: "exploration", definition: "Whether the team can build and operate the solution with available technology, data, skills and time. The technology lens in DVF." },
  { term: "Feature", origin: "SAFe", moduleId: "delivery", definition: "A smaller tangible outcome contributing to an epic, demonstrable within a PI. Requires a hypothesis, sizing, acceptance criteria, scope boundaries, measurement, and risks." },
  { term: "Feature measurement", origin: "Deck", moduleId: "delivery", definition: "The metric that shows whether a delivered feature worked, e.g. '30% reduction in processing time'. The field most often skipped and the one that decides whether you learn anything." },
  { term: "Guardrail", origin: "General", moduleId: "outcomes", definition: "A measure that detects unacceptable harm, trade-offs or displacement while pursuing the primary outcome. It must not worsen; it is not what you are improving." },
  { term: "How might we", origin: "Deck", moduleId: "discovery", definition: "A design-thinking reframe turning a problem into an actionable opportunity, without prescribing a solution." },
  { term: "Hypothesis", origin: "Deck", moduleId: "discovery", definition: "A testable statement linking a proposed action for a group to an expected outcome and observable evidence — including what would show it false." },
  { term: "Increment", origin: "Scrum", moduleId: "delivery", definition: "A usable step toward the Product Goal. Each increment is additive to all prior increments and must be verified." },
  { term: "Iteration path", origin: "SAFe", moduleId: "delivery", definition: "An Azure DevOps field aligning a story to the sprint in which delivery is expected. Misaligned iteration paths make PI reporting silently drift." },
  { term: "Lagging indicator", origin: "Deck", moduleId: "outcomes", definition: "A measure of past performance — customer satisfaction, outcome achieved. Confirms the result after it has happened." },
  { term: "Leading indicator", origin: "Deck", moduleId: "outcomes", definition: "A predictive measure of future performance — feature usage, completion rate. Moves early, but must itself be validated." },
  { term: "Lean Canvas", origin: "General", moduleId: "discovery", definition: "A one-page model of problem, users, solution ideas, business outcomes, hypotheses and riskiest assumptions. Its function is to expose what to test first." },
  { term: "Live", origin: "Government", moduleId: "lifecycle", definition: "The DTA phase for operating the service and continuing to improve it through performance data and user feedback. Needs an owner, measures and a cadence." },
  { term: "MVP", origin: "Deck", moduleId: "exploration", definition: "The smallest coherent thing that delivers value and generates learning. Focused and intentional — not a poor-quality or unfinished product, and never an excuse to defer accessibility." },
  { term: "Objective", origin: "Deck", moduleId: "outcomes", definition: "In OKRs, a qualitative, specific and motivating direction. Measured by two to five key results." },
  { term: "OKR", origin: "Deck", moduleId: "outcomes", definition: "Objectives and Key Results. We will [objective], as measured by [key results], via [actions]. Graded 1 to 4 at review." },
  { term: "Opportunity", origin: "General", moduleId: "discovery", definition: "A problem or need reframed as something the team could act on, before any solution has been chosen." },
  { term: "Outcome", origin: "Deck", moduleId: "outcomes", definition: "A meaningful change in behaviour, performance, experience, risk or value resulting from the work. The why." },
  { term: "Output", origin: "Deck", moduleId: "outcomes", definition: "The thing produced or delivered — a feature, form, policy or release. The what. Can be delivered perfectly and change nothing." },
  { term: "Persona", origin: "Deck", moduleId: "discovery", definition: "A research-grounded synthesis of user goals, needs, behaviours, motivations, challenges and context. Not a demographic stereotype." },
  { term: "Pre-Approval", origin: "Deck", moduleId: "government", definition: "The first DES delivery phase. Establishing the case for investment: problem definition, user evidence, outcome hypotheses, options and risks." },
  { term: "Pre-Delivery", origin: "Deck", moduleId: "government", definition: "The second DES delivery phase. Planning with the right amount of detail and establishing the runway: refined backlog, validated approach, baselines defined before build." },
  { term: "Product", origin: "Deck", moduleId: "thinking", definition: "An enduring vehicle for delivering value to identifiable users, with ongoing ownership and improvement. May be software, policy, operational procedures, or a combination." },
  { term: "Product Backlog", origin: "Scrum", moduleId: "delivery", definition: "An emergent, ordered list of what is needed to improve the product; the Scrum Team's single source of work. Anyone may add; product management orders." },
  { term: "Product Goal", origin: "Scrum", moduleId: "delivery", definition: "The long-term objective for the Scrum Team and the target against which the Product Backlog emerges." },
  { term: "Product Manager", origin: "Deck", moduleId: "roles", definition: "Holds vision, strategy, outcomes, roadmaps and stakeholder alignment. Asks: are we working on the right things?" },
  { term: "Product Owner", origin: "Scrum", moduleId: "roles", definition: "Holds backlog management, refinement, acceptance criteria and sprint support. Asks: do teams have what they need to deliver? Must not become a requirements courier." },
  { term: "Product trio", origin: "General", moduleId: "roles", definition: "Product manager (viable), designer (desirable) and technology lead (feasible) collaborating on discovery. A working pattern, not an approval committee." },
  { term: "Program Increment", origin: "SAFe", moduleId: "delivery", definition: "Ten weeks / 50 working days in the DES cadence, delivering key business outcomes. Five two-week sprints fit inside one. Not a Scrum term." },
  { term: "Project", origin: "Deck", moduleId: "thinking", definition: "A temporary structure for coordinating investment and delivery toward a defined change. Ends; the product does not." },
  { term: "Root cause analysis", origin: "Deck", moduleId: "discovery", definition: "Working back from a visible symptom to the structural cause, commonly by asking why repeatedly. Prevents solving the first thing you noticed." },
  { term: "Senior Responsible Officer", origin: "Deck", moduleId: "roles", definition: "Owns the project outcomes, the delivery roadmap and championing the change. Product decisions that alter the outcome need the SRO." },
  { term: "Service", origin: "Deck", moduleId: "thinking", definition: "The series of interactions that helps someone do something. A product is a tool created to deliver the service." },
  { term: "Service blueprint", origin: "Deck", moduleId: "discovery", definition: "A view connecting user actions and front-stage interactions to back-stage activities, supporting systems and processes." },
  { term: "Spike", origin: "General", moduleId: "exploration", definition: "A bounded piece of technical investigation run against representative interfaces and data, to answer a feasibility question before committing." },
  { term: "Sprint", origin: "Scrum", moduleId: "delivery", definition: "Two weeks / 10 working days in the DES cadence, delivering small increments of releasable value." },
  { term: "Story", origin: "General", moduleId: "delivery", definition: "A small slice a team can complete and validate in a sprint. As a [persona] I want [goal] so that [reason], plus points, area path and iteration path." },
  { term: "Story points", origin: "General", moduleId: "delivery", definition: "A relative estimate of size and complexity, used for forecasting throughput. Not hours, and not a productivity measure." },
  { term: "Triangulation", origin: "General", moduleId: "discovery", definition: "Comparing evidence from different methods, because stated preference, observed behaviour and system constraints routinely disagree." },
  { term: "Vanity metric", origin: "General", moduleId: "outcomes", definition: "A number that reliably rises and never changes a decision. If no value would make you act differently, it is not worth reporting." },
  { term: "Viability", origin: "General", moduleId: "exploration", definition: "Whether policy, operational, legal, financial and organisational conditions can sustain the solution. The business and policy lens in DVF." },
  { term: "Vision", origin: "Deck", moduleId: "thinking", definition: "A description of the future state the product or service is trying to create. The destination, not the route." },
  { term: "Ways of Working", origin: "Deck", moduleId: "government", definition: "The DES behaviours plus the Digital Delivery Framework — an end-to-end, repeatable delivery pipeline underpinned by seven principles." },
  { term: "Whole-of-service", origin: "Deck", moduleId: "government", definition: "Optimising the end-to-end experience across channels and systems, including assisted and non-digital, rather than one interface or project." },
  { term: "WSJF", origin: "SAFe", moduleId: "delivery", definition: "Weighted Shortest Job First: relative cost of delay divided by relative job duration or size. A comparative sequencing aid, not a guarantee." },
];
