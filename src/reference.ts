/**
 * Reference material: flashcards, templates, the capstone, the DES field guide,
 * the course additions and the diagnostic pool.
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
 * Course additions — where the course goes further than the briefing.
 *
 * Framing matters here. The deck has one session to cover the whole of
 * product management; this course has about eight hours. Going deeper in a
 * few places is what the extra time is for, not a verdict on the deck. Every
 * entry is written that way: what the briefing says, what the course adds,
 * and what the addition buys the learner. Where the two genuinely disagree,
 * the entry says so and defers to the deck, because that is the artefact
 * people are asked for at work.
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
    why: "A hypothesis you can only confirm will always look confirmed. Naming the signal that would change your mind, and the group whose experience must not slide, turns the deck's statement into something the measure design in Stage 3 can actually test.",
  },
  {
    id: "d2",
    topic: "How might we",
    slides: "31",
    deck: "'How might we [intended action] for [who] so that [desired outcome]?'",
    here: "Adds 'while [important guardrail]'.",
    why: "Government services almost always have a group whose access must not be traded away for an average improvement. Naming that group while you are still framing the opportunity is far cheaper than meeting it for the first time at accessibility testing.",
  },
  {
    id: "d3",
    topic: "Beta and Live",
    slides: "73",
    deck: "Shows the DTA process as Discovery, Alpha, and Beta/Live together — the right level of detail for a single slide on government alignment.",
    here: "Separates Beta and Live, and spends a section on the handover between them.",
    why: "The move from Beta to Live is where enduring ownership is either assigned or quietly dropped. It is worth a section of its own in a course, even though it is a fair simplification in a briefing.",
  },
  {
    id: "d4",
    topic: "Digital Service Standard",
    slides: "not covered",
    deck: "Not covered — the deck predates the current version and keeps to product-management fundamentals.",
    here: "Stage 8 covers Version 2.0: 10 criteria, applicability dates and lifecycle-wide use.",
    why: "Version 2.0 is a live obligation for public-facing services, and a self-paced course has room for it. Knowing the ten criteria makes the deck's lifecycle material land against the standard your service is actually assessed on.",
  },
  {
    id: "d5",
    topic: "Attribution of the PM definition",
    slides: "8, 54",
    deck: "Uses the well-known 'intersection of business, technology and user experience' framing.",
    here: "Names Martin Eriksson as its author and links his writing.",
    why: "Eriksson is already on the deck's recommended-reading list at slide 97, so this simply joins the two up — and the original essay is worth the ten minutes.",
  },
  {
    id: "d6",
    topic: "MVP and accessibility",
    slides: "56",
    deck: "'MVPs aren't: a poor-quality solution, an unfinished product.'",
    here: "Adds that an MVP must still meet accessibility and security obligations.",
    why: "The deck is right that an MVP is not a poor-quality product. Saying so in terms of accessibility and security gives you the sentence to use when 'minimum' is offered as a reason to defer either.",
  },
  {
    id: "d7",
    topic: "Problem statement structure",
    slides: "30",
    deck: "Who / what / goal / where / when / why-impact.",
    here: "Kept exactly as the deck has it, with one 'Evidence:' line added underneath.",
    why: "An earlier draft of this course compressed where and when into 'context'. That was a mistake: it stopped matching the artefact people are asked for at work, so the deck's structure was restored. Where the two disagree, the deck wins.",
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
    options: [ "success is declared when the agreed scope is delivered", "they work to a fixed budget set at the start", "they report progress to a Project Board each month", "they use a stage-gated delivery pipeline with formal approvals"],
    answer: 0,
    rationale:
      "Stage gates, fixed budgets and boards are all normal in government and compatible with product thinking. Defining success as scope delivered rather than a change achieved is the actual tell.",
  },
  {
    id: "dx-discovery",
    moduleId: "discovery",
    prompt: "You have analytics showing where users drop out, and interviews explaining why they find a step confusing. What do you still not know?",
    options: [ "How many users are affected by the problem overall", "Whether the confusion is the binding constraint, or something else would stop them", "What users say about the service when you ask them directly about it", "Where in the journey the problem actually occurs"],
    answer: 1,
    rationale:
      "Quantitative tells you where and how many; qualitative tells you what people experience. Neither establishes that removing this barrier would change the outcome — that requires a test.",
  },
  {
    id: "dx-outcomes",
    moduleId: "outcomes",
    prompt: "Which of these is the strongest evidence that an OKR is well written?",
    options: [ "The objective is ambitious, inspiring and memorable", "Every key result has a single named owner in the team",
      "You could tell from the key results alone whether the objective was achieved", "The key results are all within the team's direct control and need no other team"],
    answer: 2,
    rationale:
      "Key results exist to make the objective's achievement observable. If they can all be met while the objective plainly is not, they are measuring activity. Note that outcome key results usually are not fully within a team's control — that is expected.",
  },
  {
    id: "dx-exploration",
    moduleId: "exploration",
    prompt: "The cheapest credible test is usually the one that…",
    options: [ "produces the most data for the least effort", "involves the fewest people and approvals", "can be run without any engineering effort or approvals",
      "resolves the assumption most likely to kill the idea"],
    answer: 3,
    rationale:
      "Cheapness is measured against the decision, not against effort. A test that is quick but answers a question you were not going to act on is expensive.",
  },
  {
    id: "dx-delivery",
    moduleId: "delivery",
    prompt: "A backlog item has a clear title, an estimate and an assigned team, but no stated outcome. What is missing that matters most?",
    options: [ "Acceptance criteria written and agreed with the team before it starts", "The link that lets anyone judge whether it should be prioritised", "A due date agreed with the sponsor and the delivery team", "A technical design and an implementation approach"],
    answer: 1,
    rationale:
      "Without a connection to a user or service outcome, priority is unjustifiable and success is unmeasurable. Acceptance criteria and design matter, but they answer 'is it done', not 'should we do it'.",
  },
  {
    id: "dx-delivery2",
    moduleId: "delivery",
    prompt: "Two items have similar value and urgency. One is a quarter the size of the other. Which usually goes first, and why?",
    options: [
      "The smaller one, because value and learning arrive sooner per unit of effort", "Whichever one the sponsor prefers to see first", "They should be started together so the team's workload stays balanced across the sprint", "The larger one, because it delivers more total value overall"],
    answer: 0,
    rationale:
      "This is the whole point of dividing cost of delay by job size. Smaller valuable work realises benefit and produces learning earlier, which also improves the next decision.",
  },
  {
    id: "dx-lifecycle",
    moduleId: "lifecycle",
    prompt: "What most reliably distinguishes a service that will keep improving after launch from one that will not?",
    options: [ "The size of the original project budget and its contingency", "Whether the technology stack is modern and actively supported", "The quality of the closure documentation produced at handover time", "Whether an owner, measures and a cadence exist after the project"],
    answer: 3,
    rationale:
      "Improvement requires someone accountable, something observed and a rhythm for acting on it. Without all three, a service degrades regardless of how well it launched.",
  },
  {
    id: "dx-roles",
    moduleId: "roles",
    prompt: "A decision is reversible, low cost, and the delivery team has the most relevant information. Where should it be made?",
    options: [
      "At the next governance forum, for transparency",
      "By whoever raised it",
      "By the delivery team",
      "By the product manager, to maintain consistency"],
    answer: 2,
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
    options: [ "Projects will be delivered faster and with less friction", "Well-documented projects get approved whether or not they work", "Teams will produce noticeably less documentation over time", "Accessibility issues will be found much earlier in the delivery cycle"],
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
      "They are the same thing in government services", "Policy defines what must be true; research defines how people meet it", "User needs should override policy requirements wherever the two conflict"],
    answer: 2,
    rationale:
      "Compliance sets the obligation; design determines the experience of meeting it. Treating them as identical means never noticing when policy implementation is what creates the difficulty.",
  },
  {
    id: "dx-integration",
    moduleId: "integration",
    prompt: "An intervention improves the headline measure but worsens results for one user group. What does this most require?",
    options: [
      "Removing the affected group from the denominator", "Accepting it as an unavoidable trade-off for now", "Reporting the headline figure with an explanatory footnote",
      "Investigating the cause and adapting before scaling"],
    answer: 3,
    rationale:
      "Averages conceal distributional harm. The disaggregated result is the finding, and it should change the scaling decision rather than be annotated.",
  },
  /* ---- Expansion: two further diagnostic items per stage ---- */
  { id: "dx-thinking2", moduleId: "thinking",
    prompt: "A team can describe what it will ship next quarter but not what will be different for users afterwards. What is missing?",
    options: ["Capacity planning", "A stated outcome", "Stakeholder buy-in", "Technical design"],
    answer: 1,
    rationale: "Knowing the output without the intended change means success can only be measured as 'we shipped it' — the exact trap the outputs-to-outcomes shift names." },
  { id: "dx-thinking3", moduleId: "thinking",
    prompt: "Which is the better test of whether something is a strategy?",
    options: [ "Does it say what will not be done?", "Is it endorsed by leadership?", "Does it cover a full financial year?","Does it list the priorities?"],
    answer: 0,
    rationale: "Anyone can list priorities. Naming the deliberate exclusion is what turns a list into a choice, and it is the part that gets negotiated away first." },
  { id: "dx-discovery3", moduleId: "discovery",
    prompt: "Users repeatedly ask for a feature that would automate a workaround the department itself created. What should you interrogate first?",
    options: [ "Which team would own it","Whether the automation is technically feasible", "How many users have asked", "Whether the step needs to exist at all"],
    answer: 3,
    rationale: "This is a created need. Automating it entrenches the workaround; the higher-value question is why the step exists." },
  { id: "dx-discovery4", moduleId: "discovery",
    prompt: "Which finding would most change a delivery plan?",
    options: [ "Most of the users are on mobile devices", "Users find the current wording of the page confusing and unclear", "The problem occurs mainly in a channel the team cannot change", "Satisfaction is running below the agreed target"],
    answer: 2,
    rationale: "It relocates the problem outside the team's remit, which changes scope, stakeholders and possibly whether the work should proceed at all." },
  { id: "dx-outcomes3", moduleId: "outcomes",
    prompt: "A measure improves sharply in the week a change ships, then returns to baseline within a month. What is the most useful interpretation?",
    options: [ "A novelty effect, so judge it on the sustained level not the spike", "The measurement itself is broken and needs rebuilding", "The change should be reverted before the next release", "The change worked and then wore off, so it should be shipped again later"],
    answer: 0,
    rationale: "Short-lived jumps after a visible change are routine. The decision-relevant number is where it settles, which is why measurement windows matter." },
  { id: "dx-outcomes4", moduleId: "outcomes",
    prompt: "Which is the strongest reason to define measures before delivery starts?",
    options: [ "It satisfies the governance reporting requirements agreed at portfolio level", "It prevents choosing the measure that happens to look good afterwards", "It speeds up reporting at the end of the quarter", "It helps the team size the work more accurately"],
    answer: 1,
    rationale: "Measures chosen after the fact are chosen knowing the result. Committing in advance is what makes the evidence capable of contradicting you." },
  { id: "dx-exploration2", moduleId: "exploration",
    prompt: "You can only test one thing before a funding decision. What determines the choice?",
    options: [ "Which one has the clearest method and cleanest data", "Which test can be run the quickest before the deadline", "Which assumption is most uncertain and most consequential", "Which test the funding sponsor is most interested in seeing"],
    answer: 2,
    rationale: "Cheapness is measured against the decision. A fast test of something you would not act on is expensive; a slower test of the thing that kills the idea is not." },
  { id: "dx-exploration3", moduleId: "exploration",
    prompt: "An MVP ships without keyboard support 'because it is only a trial'. What is wrong with that reasoning?",
    options: [ "Keyboard support is cheap to add later, once the trial has finished and the scope is known", "Trials should never be put in front of real users at all", "Trials still need the full set of planned features", "Minimum refers to the scope of the bet, not the quality or accessibility of the build"],
    answer: 3,
    rationale: "'Minimum' is the word most often used to defer accessibility. It licenses a smaller bet, never an experience that excludes people." },
  { id: "dx-delivery3", moduleId: "delivery",
    prompt: "A backlog item has been near the top for six months without being started. What does that most likely indicate?",
    options: [ "The team is under-resourced for the work in front of it", "It is not actually as high a priority as its position claims", "It is blocked by a dependency that nobody has managed to resolve", "Estimation on this item is inaccurate"],
    answer: 1,
    rationale: "Order is a claim about what matters most. Something perpetually next but never started reveals the stated order and the real order have diverged." },
  { id: "dx-delivery4", moduleId: "delivery",
    prompt: "Why does the deck insist a feature carries a measurement field?",
    options: [ "So you can tell whether it worked, not just whether it was built", "To help the team estimate the effort involved", "To satisfy the definition of done for the feature", "To support the reporting that goes up to the portfolio governance board"],
    answer: 0,
    rationale: "Without it, a PI closes, the benefit is assumed, and nothing feeds the next prioritisation decision — the loop silently stops closing." },
  { id: "dx-lifecycle2", moduleId: "lifecycle",
    prompt: "Which is the strongest argument for continuing research after a service goes Live?",
    options: [ "Teams usually have spare capacity in the weeks right after launch", "It generates useful content for governance reporting", "It is required by the Digital Service Standard anyway", "The service now meets its widest audience for the first time"],
    answer: 3,
    rationale: "Pre-launch research uses recruited participants. Live is the first time the whole population, including those who struggle most, encounters the service." },
  { id: "dx-lifecycle3", moduleId: "lifecycle",
    prompt: "An Alpha concludes that none of the three tested approaches works. How should that be reported?",
    options: [ "As a resourcing problem that stopped the phase from succeeding", "As a failed Alpha that wasted the allocated budget", "A successful Alpha that avoided an expensive wrong commitment", "As a reason to extend the phase and try more options"],
    answer: 2,
    rationale: "Alpha exists to eliminate approaches. Eliminating all three is a return on the investment, and framing it as failure teaches the next team to hide the same result." },
  { id: "dx-roles3", moduleId: "roles",
    prompt: "Who should decide the wording of a validation error message?",
    options: [ "The delivery team, with content design input", "The product manager for the service", "The policy area that owns the rule", "The Project Board at its next meeting"],
    answer: 0,
    rationale: "Reversible, local, and the relevant expertise sits in the team. Escalating it spends scarce governance attention and slows the work for no gain." },
  { id: "dx-roles4", moduleId: "roles",
    prompt: "A product manager spends most of the week writing acceptance criteria. What has probably gone wrong?",
    options: [ "Nothing at all — it is a normal part of the role", "The horizons have collapsed, leaving nobody on outcomes or direction", "The team lacks business analysts to do that work", "The backlog has grown far too large to manage"],
    answer: 1,
    rationale: "That is Product Owner work. When the PM absorbs it, the longer-horizon questions go unasked — which is how a team delivers competently in the wrong direction." },
  { id: "dx-government3", moduleId: "government",
    prompt: "Which best describes how the Digital Service Standard relates to the DES delivery phases?",
    options: [ "The Standard replaces the delivery phases entirely", "They are the same thing described under different names", "They coexist — the Standard spans the lifecycle, phases sequence work", "The phases apply only to digital services and not to assisted channels"],
    answer: 2,
    rationale: "Three distinct things overlap here — the Standard, the DES pipeline and the DTA phases. Conflating them causes duplicated or missed assurance evidence." },
  { id: "dx-government4", moduleId: "government",
    prompt: "A policy requirement makes a task materially harder for users. What is the product manager's legitimate move?",
    options: [ "Escalate the requirement to the Project Board and wait for their decision", "Implement it exactly as specified without comment", "Refuse to implement the requirement at all", "Meet the intent by design and take the friction data to policy"],
    answer: 3,
    rationale: "Compliance says what must be true; design determines the experience. Evidence about the resulting friction is exactly what a policy owner needs to reconsider implementation." },
  { id: "dx-integration3", moduleId: "integration",
    prompt: "Which is the best evidence that a team is operating adaptively rather than just iterating?",
    options: [ "It releases new software into production very frequently", "It has changed a plan because evidence contradicted it", "It runs regular retrospectives after every sprint", "It uses two-week sprints consistently across teams"],
    answer: 1,
    rationale: "Cadence and ceremony are iteration. Adaptation is the plan actually changing when the evidence says it should — which is uncomfortable and therefore rare." },
  { id: "dx-integration4", moduleId: "integration",
    prompt: "You must summarise a product's position in one sentence. Which structure serves best?",
    options: [ "The outcome sought, what the evidence shows, and the decision", "The risks and the mitigations agreed for each of them", "The budget position measured against the original approved forecast", "What we built and when we finished it"],
    answer: 0,
    rationale: "Outcome, evidence, decision is the compression that survives every audience. The others are inputs to it, not substitutes." },
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

/* ------------------------------------------------------------------ *
 * Supplementary question bank
 *
 * These join the MIXED PRACTICE pool but not the stage quizzes. Keeping the
 * quizzes tight (4–5 questions) preserves the meaning of the 75% mastery
 * threshold, while the practice pool gets deep enough that interleaving stays
 * genuinely unpredictable rather than becoming a memorisation exercise.
 *
 * Answer indices cycle 0–3 so the stored data stays balanced; display order is
 * permuted per learner regardless.
 * ------------------------------------------------------------------ */

export const supplementaryQuestions: Question[] = [
  /* --- Stage 1: product thinking and strategy --- */
  {
    id: "x-think-1", moduleId: "thinking",
    prompt: "A service has been live for three years, has a named owner, a backlog and a quarterly improvement cycle. Funding arrives as a series of discrete projects. What is it?",
    options: [ "A project, mislabelled as a product", "Neither — funding model decides", "A programme of work","A product, funded by projects"],
    answer: 3,
    optionNotes: [ "Ownership, backlog and improvement cadence are the defining properties. It is a product regardless of how the money arrives.", "Funding is a constraint on a product, not its definition. The deck is explicit that product thinking can operate inside project funding.", "A programme coordinates related projects. It says nothing about enduring ownership of a service.",""],
    rationale: "Ongoing ownership, an evolving backlog and an improvement cadence make it a product. The funding model is a constraint to work within, not a definition.",
  },
  {
    id: "x-think-2", moduleId: "thinking",
    prompt: "Which is the clearest example of the deck's 'delivery → learning' shift?",
    options: [ "Publishing a release calendar for the coming quarter", "Running a retrospective on how the team's process went", "Instrumenting a release so it produces evidence that changes the next decision", "Increasing deployment frequency so releases reach users sooner and more often"],
    answer: 2,
    optionNotes: ["A calendar communicates timing. It generates no evidence about whether the work mattered.", "Retrospectives improve how the team works. Useful, but they examine process rather than whether the product changed anything.", "", "Frequency is a delivery capability. Shipping more often without measuring effect just produces wrong answers faster."],
    rationale: "The shift is about each release being expected to teach you something that alters what you do next — not about cadence or process hygiene.",
  },
  {
    id: "x-think-3", moduleId: "thinking",
    prompt: "Your vision statement could describe almost any government service. What is the likely problem?",
    options: [ "It describes a generic quality rather than a specific future state", "It is far too short to be useful", "It has no measurable target attached to it", "It is aspirational rather than operational, so nobody can act on it"],
    answer: 0,
    optionNotes: [ "","Length is not the issue; some of the best visions are one line.", "Visions are not supposed to carry targets — that is what key results do.", "A vision should be aspirational. That is its job."],
    rationale: "'Simpler, faster, better' fits everything and therefore guides nothing. A vision has to name who it is for and what specifically becomes possible.",
  },
  {
    id: "x-think-4", moduleId: "thinking",
    prompt: "Which trade-off is the deck actually asking product managers to make?",
    options: [ "User needs versus the needs of the business", "What to pursue now versus what to explicitly defer", "Time spent on discovery versus time spent on delivery", "Speed of delivery versus quality of the build"],
    answer: 1,
    optionNotes: [ "The role exists to hold these together, not to pick one.", "", "The deck argues these run in parallel, an increment apart — not that you choose between them.","A real tension, but not the strategic choice the deck names."],
    rationale: "Strategy is choosing priorities, focusing investment and deciding what not to do. Naming the deferral is what makes it a decision rather than a wish list.",
  },

  /* --- Stage 2: discovery --- */
  {
    id: "x-disc-1", moduleId: "discovery",
    prompt: "Support data shows the top call reason is 'status enquiry'. What does that tell you on its own?",
    options: [ "That the provider portal needs a status page adding to it", "That status information is hard to find in the current service", "That people are calling about status, and nothing about why", "That self-service would reduce the call volume"],
    answer: 2,
    optionNotes: [ "A solution derived from a call-reason code. This is exactly the jump discovery exists to prevent.","Plausible, but it is an inference. They might be calling because they distrust what they can see.", "", "That is a hypothesis, and an untested one. Calls might move to another channel instead."],
    rationale: "Operational data tells you what is happening at volume. It never tells you why, and call-reason codes are assigned by staff under time pressure.",
  },
  {
    id: "x-disc-2", moduleId: "discovery",
    prompt: "A five-whys chain ends at 'because the service grew through several projects and was never consolidated'. What kind of finding is that?",
    options: [ "An invalid conclusion — five whys should end at a user", "A user need the team can act on", "A usability problem in the interface", "A structural cause outside the current team's control"],
    answer: 3,
    optionNotes: [ "Five whys should end at a cause, wherever it sits. Ending at a structural one is common in government and is useful information.","It describes the system's history, not what any user is trying to achieve.", "Usability is what people experience. This explains why the experience is that way.", ""],
    rationale: "The deck's own chain ends here deliberately. Naming a structural cause tells you the problem cannot be fully solved at the interface — which changes what you propose and to whom.",
  },
  {
    id: "x-disc-3", moduleId: "discovery",
    prompt: "Which is the strongest evidence that a persona is doing real work?",
    options: [ "It is grounded in interviews and observation", "It changes a prioritisation decision","It has a name and a photograph", "It was signed off by stakeholders"],
    answer: 1,
    optionNotes: [ "Necessary, but not sufficient — well-researched personas still gather dust.", "","Presentation. It can be beautifully produced and entirely invented.", "Sign-off establishes agreement, not accuracy."],
    rationale: "Research grounding is the entry price. The test the deck applies to every artefact is whether it improves a consequential decision.",
  },
  {
    id: "x-disc-4", moduleId: "discovery",
    prompt: "Which of these belongs in a journey map rather than a service blueprint?",
    options: ["The user's emotional low point", "The queue that assessment requests sit in", "The legacy system holding application records", "The team responsible for manual verification"],
    answer: 0,
    optionNotes: ["", "Back-stage process. Blueprint.", "Supporting system. Blueprint.", "Back-stage people. Blueprint."],
    rationale: "Journey maps capture the user's experience over time — goals, touchpoints, emotions, pain points. Blueprints capture what happens behind the curtain to produce it.",
  },

  /* --- Stage 3: outcomes --- */
  {
    id: "x-out-1", moduleId: "outcomes",
    prompt: "A key result reads 'improve the provider experience'. What is missing?",
    options: [ "A named initiative and a delivery date", "Agreement from the stakeholders", "A named owner inside the team", "A baseline, a target and a timeframe"],
    answer: 3,
    optionNotes: [ "Initiatives are how you might move it. Their absence does not stop it being measurable.", "Agreement on an unmeasurable statement is agreement about nothing.","Ownership matters but is not what makes a key result measurable.", ""],
    rationale: "Without a baseline you cannot tell whether it moved; without a target you cannot tell whether it moved enough; without a timeframe you cannot tell when to check.",
  },
  {
    id: "x-out-2", moduleId: "outcomes",
    prompt: "Your team hits a grade 4 on every key result, three quarters running. What is the most likely explanation?",
    options: [ "Exceptional delivery performance across the year", "The measures are well designed and stable", "The targets are being set below what the team already expects to achieve", "The grading scale is being applied far too generously by the team each quarter"],
    answer: 2,
    optionNotes: ["Possible, but consistently exceeding every target is a stronger signal about the targets than the team.", "Well-designed targets should occasionally be missed. Never missing means they carry no information.", "", "Generous grading is a variant of the same problem, but the deck's scale is specific enough that target-setting is the usual culprit."],
    rationale: "Targets that are always exceeded have stopped being targets. A mix of 2s and 3s with clear insight is more useful to the organisation than a wall of 4s.",
  },
  {
    id: "x-out-3", moduleId: "outcomes",
    prompt: "Which pairing would best detect that a faster online form is pushing failures onto the phone channel?",
    options: [ "Completion rate and assisted-channel contact volume", "Time on page and bounce rate across the whole form journey", "Submission count and validation error count", "Completion rate and satisfaction score"],
    answer: 0,
    optionNotes: [ "", "Both are online engagement measures and neither speaks to the other channel.", "Both count online activity. A user who abandons and phones instead appears in neither.","Both measure the online channel. Neither can see the phone queue."],
    rationale: "Displacement is only visible if you measure the place the demand moves to. That is precisely what a guardrail on the assisted channel is for.",
  },
  {
    id: "x-out-4", moduleId: "outcomes",
    prompt: "A dashboard reports 'notifications sent: 42,000'. Under what condition is that worth reporting?",
    options: [ "Never — it is a pure activity count and says nothing about result", "When it is paired with whether recipients acted on them", "When the number is growing quarter on quarter", "When it is compared against the same quarter last year"],
    answer: 1,
    optionNotes: [ "Too absolute — as a denominator for an action rate it is genuinely useful.", "","Growth in an activity count tells you the system is busier, not better.", "A comparison of two activity counts is still an activity count."],
    rationale: "Volume becomes meaningful the moment it is the denominator of a behaviour: of 42,000 sent, how many led to the action the notification existed to prompt?",
  },

  /* --- Stage 4: exploration --- */
  {
    id: "x-exp-1", moduleId: "exploration",
    prompt: "Which option should always be on the table before a build option is chosen?",
    options: [ "Extending an existing departmental system to cover it", "Doing nothing at all until the next financial year","Removing the step or changing the process entirely", "Buying a commercial off-the-shelf product instead"],
    answer: 2,
    optionNotes: [ "A sensible reuse option, but again a technology response.", "A legitimate choice, but deferral is not the same as questioning whether the step needs to exist.","", "Sometimes right, but it is still a build-or-buy solution to an assumed problem."],
    rationale: "The deck asks for non-build, process and policy options in the option set. The cheapest fix is often deleting a step that only exists because of how the department is organised.",
  },
  {
    id: "x-exp-2", moduleId: "exploration",
    prompt: "You run a prototype test with eight providers. Six complete the task, two do not. What have you learned?",
    options: [ "Nothing useful here — a sample of eight providers is far too small to conclude anything", "The design works for roughly 75% of providers, so it is ready", "The design is ready to build once the two failures are patched", "The concept is broadly comprehensible, and two failure modes are worth understanding"],
    answer: 3,
    optionNotes: [ "Eight is a reasonable qualitative sample for comprehension. The failures are the most informative part.","Eight participants cannot support a percentage. Treating qualitative counts as rates is a common misreading.", "Comprehension is one risk. Feasibility, viability and scale are untested.", ""],
    rationale: "Small-sample qualitative work tells you what can go wrong and why, not how often. The two failures are the finding; go and understand them.",
  },
  {
    id: "x-exp-3", moduleId: "exploration",
    prompt: "'We'll build a small version and see how it goes.' What is missing for this to be an MVP?",
    options: [ "A budget and an approved delivery plan", "A defined decision and a result that would change it", "Full accessibility conformance from day one", "A production release plan agreed with the operations team"],
    answer: 1,
    optionNotes: ["Cost matters, but a funded release that teaches you nothing is still not an MVP.", "", "Required regardless — but its presence does not make something an MVP.", "An MVP may or may not go to production; that is not the defining property."],
    rationale: "'See how it goes' has no decision attached, so any result can be rationalised. An MVP exists to produce evidence about a specific question you have committed to acting on.",
  },
  {
    id: "x-exp-4", moduleId: "exploration",
    prompt: "Policy will not permit the detail your design depends on. Which lens has failed, and what happens next?",
    options: [ "Viability — test whether the outcome is reachable within the constraint, or argue to change it", "Desirability — redesign the service around what users say they would prefer instead", "Feasibility — find a technical workaround that avoids the policy constraint entirely and ship it", "Usability — simplify the interface until the missing detail is no longer needed"],
    answer: 0,
    optionNotes: [ "","Users may well want it. That is not the blocker.", "The technology is not the constraint here; the rule is.", "Simplifying does not make a prohibited disclosure permitted."],
    rationale: "Policy and legal conditions are the viability lens. The two legitimate moves are designing to meet the intent within the constraint, or taking evidence to the policy owner.",
  },

  /* --- Stage 5: delivery --- */
  {
    id: "x-del-1", moduleId: "delivery",
    prompt: "Two items: A is high value, high urgency, very large. B is moderate value, moderate urgency, very small. What does WSJF typically suggest?",
    options: [ "Neither — WSJF cannot compare items like these", "A first, because urgency breaks the tie", "A first, because value dominates the score", "B first, because dividing by size favours it"],
    answer: 3,
    optionNotes: [ "Relative comparison is exactly what WSJF is for.", "Time criticality is part of cost of delay, still divided by size.","Value is the numerator, but the whole point of the formula is that it is divided by size.", ""],
    rationale: "Cost of delay divided by job size systematically favours small valuable work, because benefit and learning arrive sooner per unit of effort. Judgement can still override.",
  },
  {
    id: "x-del-2", moduleId: "delivery",
    prompt: "A stakeholder asks for a date for something in the 'Later' band. What is the right response?",
    options: [ "Give the date the team currently believes is achievable for the work", "Give a date with a very wide confidence range attached to it", "Explain what must be true before a date is meaningful, and what moves it to Next", "Refuse to discuss anything at all beyond the items that are already in the Now band"],
    answer: 2,
    optionNotes: [ "A believed date becomes a remembered commitment, regardless of caveats.","A range still implies you have estimated something you have not yet scoped or validated.", "", "Unhelpful. Stakeholders need direction even where dates are not available."],
    rationale: "Confidence bands exist because the evidence does not yet support a date. The useful answer converts the question into what would need to be resolved for one to exist.",
  },
  {
    id: "x-del-3", moduleId: "delivery",
    prompt: "Which is the clearest sign a backlog has become a requirements dump?",
    options: [ "Items describe solutions with no stated outcome or measure", "It has not been reordered for over a month", "Multiple business areas are able to add items to it directly", "It contains considerably more than 200 items"],
    answer: 0,
    optionNotes: [ "", "Concerning, but the ordering could still be correct.", "The deck explicitly says anyone in the team may add; product management orders.","Size alone is normal for a long-lived product."],
    rationale: "The defect is not volume or authorship, it is items that cannot be traced to a user or service outcome — which makes their priority unjustifiable and their success unmeasurable.",
  },
  {
    id: "x-del-4", moduleId: "delivery",
    prompt: "Halfway through a PI, discovery invalidates the hypothesis behind a committed feature. What should happen?",
    options: [ "Finish it anyway — the PI commitment was already made and communicated", "Stop it, record what was learned, and re-plan the remaining capacity", "Finish a reduced version of it to show progress", "Continue and re-evaluate it at PI close instead"],
    answer: 1,
    optionNotes: ["Delivering something you now believe will not work is the sunk-cost fallacy with a governance wrapper.", "", "A smaller version of an invalidated idea is still an invalidated idea.", "Waiting until close means spending the remaining weeks on it regardless."],
    rationale: "The plan changes when the evidence does — that is the 'adaptive' quality. Learning mid-increment is the parallel discovery stream working as intended.",
  },

  /* --- Stage 6: lifecycle --- */
  {
    id: "x-life-1", moduleId: "lifecycle",
    prompt: "Which is the strongest evidence that a Discovery phase has actually finished?",
    options: [ "The discovery report has been written and signed off by the board", "The time allocated to the phase has elapsed", "You can state the problem, the users, the constraints and the unknowns", "A preferred solution has been agreed with all of the stakeholders involved"],
    answer: 2,
    optionNotes: ["Sign-off records agreement with a document, not that the uncertainty has reduced.", "Time elapsing is a budget event, not a knowledge event.", "", "Agreeing a solution in Discovery means it has run past its purpose into Alpha's territory."],
    rationale: "Discovery ends when you can articulate the problem and constraints clearly and name the remaining unknowns. Naming what you still do not know is part of the output.",
  },
  {
    id: "x-life-2", moduleId: "lifecycle",
    prompt: "A Live service's completion rate has drifted down 8% over six months with no release in that period. What is the most likely cause?",
    options: [ "The original design was simply wrong from the start and is only now showing", "Measurement error somewhere in the analytics", "The code has degraded over time without releases", "Something outside the service changed — users, policy or upstream systems"],
    answer: 3,
    optionNotes: [ "Possible, but it would not explain a gradual change with a stable baseline earlier.", "Worth ruling out, but drift with no release usually points outward, not at the instrument.","Code does not rot on its own without deploys. Dependencies around it do change.", ""],
    rationale: "Services sit inside a moving system. Live-phase measurement exists to catch exactly this: the product did not change, but its context did.",
  },
  {
    id: "x-life-3", moduleId: "lifecycle",
    prompt: "Why does the deck describe the lifecycle as a loop rather than a sequence?",
    options: [ "Because teams often have to redo work they thought was finished", "Because measuring one release is the discovery input for the next", "Because Agile delivery methods are iterative by design", "Because in practice the phases frequently overlap with one another"],
    answer: 1,
    optionNotes: ["Rework is a symptom of a broken sequence, not the reason for the loop.", "", "True but circular — it names the method rather than the reason.", "They do overlap, but overlap is not what makes it a loop."],
    rationale: "The loop closes because what you measure after release is what tells you which problem to solve next. Treating measurement as a terminal report breaks it.",
  },
  {
    id: "x-life-4", moduleId: "lifecycle",
    prompt: "Which handover is sufficient at the Beta-to-Live transition?",
    options: [ "Documentation and runbooks, plus a named owner and an improvement cadence", "A closure report and a benefits realisation statement signed off by the board", "Transfer to the operations team with an agreed SLA", "Documentation, runbooks and an agreed support rota"],
    answer: 0,
    optionNotes: [ "", "Documents the past and assigns nobody to the future.", "An SLA covers availability, not whether the service achieves its outcome.","Keeps it running. Nobody is accountable for whether it still works for users."],
    rationale: "Operational support keeps a service up; product ownership keeps it useful. Without a named owner, measures and a cadence, quality decays with nobody accountable for noticing.",
  },

  /* --- Stage 7: roles --- */
  {
    id: "x-role-1", moduleId: "roles",
    prompt: "A designer and an engineer disagree about an approach in refinement. What is the product manager's job?",
    options: [ "Ask the Product Owner to break the tie between them", "Decide it personally, since the product manager owns the product", "Escalate the disagreement to the Solution Architect for a ruling", "Make the trade-off explicit against the outcome, then get it decided"],
    answer: 3,
    optionNotes: [ "It is not a backlog-clarity question, so it is not the PO's to break.","Deciding technical detail by authority wastes the expertise in the room.", "Escalating a reversible team decision spends senior time and teaches the team not to decide.", ""],
    rationale: "The trio exists so desirability, feasibility and viability are argued in the same conversation. The PM's contribution is framing the trade-off against the outcome, not overruling it.",
  },
  {
    id: "x-role-2", moduleId: "roles",
    prompt: "Which decision most clearly belongs at the strategic layer?",
    options: [ "How a particular validation error message is worded", "Whether to split a story into two smaller ones", "Whether to retire a service and fold it into another", "Which features go into the next Program Increment"],
    answer: 2,
    optionNotes: [ "Delivery layer — 'how do we deliver this well?'", "Delivery layer.","", "Coordination layer — 'what should we deliver next?'"],
    rationale: "The strategic layer asks what future we are trying to create, and owns cross-product experience and service direction. Retirement and consolidation sit squarely there.",
  },
  {
    id: "x-role-3", moduleId: "roles",
    prompt: "What is the practical cost of leaving decision rights unstated?",
    options: [ "Decisions default to whoever is most persistent", "Teams make considerably more mistakes", "Documentation grows without bound", "Governance forums become longer and more frequent"],
    answer: 0,
    optionNotes: [ "", "Sometimes, but the deeper issue is that nobody knows whose call it was.", "Documentation is not the mechanism by which authority gets captured.","A symptom, but not the core cost."],
    rationale: "Authority does not stay vacant. Unstated rights get filled by availability and persistence, which is how a service ends up shaped by whoever attends the most meetings.",
  },
  {
    id: "x-role-4", moduleId: "roles",
    prompt: "In the deck's model, who is best placed to say whether the team is working on the right things?",
    options: [ "The Senior Responsible Officer", "The Product Manager","The Scrum Master", "The Product Owner"],
    answer: 1,
    optionNotes: [ "Owns the project outcomes and champions the change, at a level above product direction.", "","Owns team process and flow, not product direction.", "Asks the complementary question: do teams have what they need to deliver successfully?"],
    rationale: "The deck pairs the two questions explicitly: the product manager asks whether we are working on the right things; the Product Owner asks whether teams can deliver them.",
  },

  /* --- Stage 8: government --- */
  {
    id: "x-gov-1", moduleId: "government",
    prompt: "Which is the best evidence that the Digital Service Standard is being met, rather than merely claimed?",
    options: [ "Sign-off by the delivery manager at the governance gate", "A completed self-assessment template held by the delivery team", "Research, testing and performance data for each criterion", "A statement of intent recorded in the approved business case"],
    answer: 2,
    optionNotes: [ "Sign-off attests to process, not to criteria being met.","A template records that the questions were asked, not what the answers were.", "", "Intent is not evidence, and business cases are written before the work."],
    rationale: "The standard expects demonstration across the lifecycle. Governance evidence should show how criteria are being met, not that a document was completed.",
  },
  {
    id: "x-gov-2", moduleId: "government",
    prompt: "Principle 4 says decisions belong closest to the problem. What does that require of governance?",
    options: [ "Delegating every decision to the delivery teams without exception", "Faster approval turnaround from the forums", "Fewer governance forums in the schedule", "Delegating reversible decisions, reserving forums for risk"],
    answer: 3,
    optionNotes: [ "Material risk, investment and cross-service trade-offs still need governance.", "Speed helps but does not change which decisions need to go there at all.","Fewer forums without changed thresholds just delays the same decisions.", ""],
    rationale: "The principle is about placement, not volume or speed. Reversible and local decisions go down; material risk and investment stay up.",
  },
  {
    id: "x-gov-3", moduleId: "government",
    prompt: "Which is a legitimate reason for an accessibility issue to reach a governance gate unresolved?",
    options: [ "The assessment template did not require it to be checked at all", "It was found late and a dated remediation plan is presented", "It affects only a small number of users", "It will be fixed in a later delivery phase"],
    answer: 1,
    optionNotes: [ "Gate scope does not change the legal and standard obligation.","", "Small user numbers do not reduce the obligation, and they usually undercount the people who never got far enough to be measured.", "Deferral without a plan is the same decision as ignoring it."],
    rationale: "Finding a problem late is normal. Arriving without a plan, dates and interim mitigation is what turns a finding into a failure of assurance.",
  },
  {
    id: "x-gov-4", moduleId: "government",
    prompt: "Which artefact belongs to the Pre-Delivery phase rather than Pre-Approval?",
    options: [ "A refined backlog with measures and baselines defined", "The investment case for the programme", "Options analysis with the associated risks and mitigations", "Outcome hypotheses and early user evidence"],
    answer: 0,
    optionNotes: [ "", "The investment case is the Pre-Approval output by definition.","Options and risks support the investment decision — Pre-Approval.", "Evidence and hypotheses make the case for investment — Pre-Approval."],
    rationale: "Pre-Delivery is where planning gets the right level of detail and the runway is established: refined backlog, validated approach, and baselines captured before build starts.",
  },

  /* --- Stage 9: integration --- */
  {
    id: "x-int-1", moduleId: "integration",
    prompt: "Which is the most honest thing to put in a status report when the outcome measure has not moved?",
    options: [ "It is too early to tell anything from the data yet", "The measure needs revising because it is not the right one", "Delivery is on track against the agreed plan and budget", "The measure has not moved — here is what we will do"],
    answer: 3,
    optionNotes: [ "Sometimes legitimate — but stated without a date by which it will be tellable, it is a way of deferring the conversation.", "Sometimes right, but leading with it looks like moving the goalposts and destroys the baseline.","True and irrelevant if the work is not producing the change it was funded for.", ""],
    rationale: "The chain of evidence is only useful if you report the link that is breaking. Naming it early is what lets a decision still be made.",
  },
  {
    id: "x-int-2", moduleId: "integration",
    prompt: "Which of the six 'what good looks like' qualities is most at risk when a team optimises a single headline metric?",
    options: ["Collaborative", "Evidence based", "User centred", "Adaptive"],
    answer: 2,
    optionNotes: ["Collaboration concerns how options get shaped, which single-metric focus does not directly damage.", "Ironically the metric is evidence — the problem is that it is the wrong evidence, narrowly held.", "", "The plan may still adapt; it just adapts toward the wrong target."],
    rationale: "Optimising one number reliably produces decisions that serve the number rather than the people behind it — which is the failure mode user-centredness names.",
  },
  {
    id: "x-int-3", moduleId: "integration",
    prompt: "You have three minutes with a Minister's adviser. What do they need?",
    options: [ "The outcome, the evidence, the risk, and the decision", "The full evidence base behind the current product position", "The technical architecture and integration detail", "The delivery timeline with all of its milestones"],
    answer: 0,
    optionNotes: [ "", "Depth without framing is unusable in three minutes.", "Almost never the right level for this audience.","Timeline without outcome invites a question about dates rather than value."],
    rationale: "Adjust the depth, not the facts. At the most senior level that means outcome, evidence, risk and the decision required — in that order.",
  },
  {
    id: "x-int-4", moduleId: "integration",
    prompt: "What most reliably distinguishes a defensible prioritisation decision from a defensive one?",
    options: [ "It was made in a formal governance forum with minutes", "It can name the evidence that would change it", "It has agreement from all stakeholders", "It follows an agreed scoring model"],
    answer: 1,
    optionNotes: ["Venue is not reasoning.", "", "Agreement can be reached about an unjustifiable decision.", "A score is the output of a judgement, not the justification for it."],
    rationale: "A defensible decision is falsifiable: you can state what would make you change your mind. A defensive one is protected from evidence rather than grounded in it.",
  },
];

/* ------------------------------------------------------------------ *
 * Worked case studies
 *
 * The single largest gap in this course has been teaching DEPTH: it told
 * learners what a good problem statement contains, then asked them to write
 * one, without ever showing a complete chain end to end. Worked examples are
 * the cheapest high-utility intervention in the instructional literature —
 * novices learn the pattern faster from a solved problem than from practice
 * alone, and only shift to practice once the schema is formed.
 *
 * Two cases, deliberately contrasted:
 *   - PROVIDER STATUS is the deck's own case. It ends well.
 *   - EMPLOYER VACANCY goes wrong in an instructive way: the team solves the
 *     visible symptom, the headline metric improves, and the outcome does not.
 *     Learners need at least one worked example where the method catches a
 *     mistake, or they only ever see the method endorsing itself.
 * ------------------------------------------------------------------ */

export type CaseStep = {
  moduleId: string;
  stage: number;
  heading: string;
  /** What the team actually did, written as narrative. */
  body: string;
  /** The concrete artefact produced — shown in a monospace panel. */
  artefact?: string;
  /** What a learner should notice. */
  insight: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  outcome: "worked" | "corrected";
  summary: string;
  steps: CaseStep[];
  closing: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "provider-status",
    title: "Provider application status",
    subtitle: "The deck's running case, worked end to end",
    outcome: "worked",
    summary:
      "Providers phone the support centre constantly to check where participant applications have got to. The obvious response is a status page. This case follows the chain properly and arrives somewhere better than the obvious response.",
    steps: [
      {
        moduleId: "thinking",
        stage: 1,
        heading: "Framing it as a product, not a ticket",
        body: "The request arrived as 'build a status page', already scoped and already funded as a project deliverable. The product manager's first move was not to refuse it but to ask what would still be true in two years: who owns the status experience, who notices when it degrades, and what happens when the underlying systems change again.",
        insight:
          "The request was not wrong, it was premature. Reframing it as an owned capability rather than a deliverable is what created room to ask why the calls happen at all.",
      },
      {
        moduleId: "discovery",
        stage: 2,
        heading: "Finding the actual difficulty",
        body: "Call-reason coding said 'status enquiry' was the top driver. Twelve provider interviews and four hours of contact-centre observation said something more specific: providers were not confused about where an application was, they were unable to tell whether they needed to do anything. Most calls ended with the agent saying 'nothing needed at your end'.",
        artefact:
          "Our providers are currently experiencing uncertainty about whether action is required from them when supporting a participant's application. This occurs across the provider portal and the support line, and has been happening since the 2023 platform split. This is critical because it generates avoidable support demand and delays participants. Evidence: call-reason coding, 12 interviews, 4 hours of contact-centre observation.",
        insight:
          "The stated problem was 'I cannot see the status'. The real problem was 'I cannot tell whether it is my turn.' A status page answers the first and not the second.",
      },
      {
        moduleId: "outcomes",
        stage: 3,
        heading: "Defining success before building",
        body: "The team wrote the objective around resolution rather than deflection, precisely because deflection is easy to fake by making it harder to call. A guardrail was set on the assisted channel so that any improvement achieved by pushing demand elsewhere would show up immediately.",
        artefact:
          "Objective: providers can tell whether action is required, without contacting us.\nKR1: avoidable status contacts down 30% (baseline 4,100/month).\nKR2: providers correctly state their next action unprompted in 8 of 10 usability sessions.\nLeading: proportion of sessions reaching the next-action panel.\nGuardrail: median time to resolution for unresolved cases does not worsen.",
        insight:
          "The guardrail is the part that gets cut under pressure and the part that later proves you did not simply displace the problem.",
      },
      {
        moduleId: "exploration",
        stage: 4,
        heading: "Testing the cheap thing first",
        body: "Three options went on the table: the requested status page, an action-required notification, and a non-build option of changing the provider's default view. The riskiest assumption was shared by all three — that providers would trust departmental status enough to act on it. A prototype with manually supplied data tested comprehension and trust before any integration work was scoped.",
        artefact:
          "Decision: whether to fund the status integration.\nRiskiest assumption: providers will act on departmental status rather than ringing to confirm it.\nMethod: clickable prototype, manually supplied data, 8 representative providers.\nProceed if 6 of 8 state the correct next action unprompted AND say they would not call to confirm.",
        insight:
          "The expensive integration was never the question. Whether the information would be believed was the question, and it cost eight conversations to answer.",
      },
      {
        moduleId: "delivery",
        stage: 5,
        heading: "Ordering the work honestly",
        body: "The feature was sized to a single PI and written with a measurement field from the start. A dependency on the assessment platform's status API was recorded as a risk rather than assumed away, and the roadmap said Now/Next/Later rather than naming dates the evidence could not support.",
        artefact:
          "Feature hypothesis: providers shown a plain-language next action will resolve without contacting support.\nMeasurement: successful self-service rate for status queries, target 65% in the first PI after release.\nIn scope: application progress and required action. Out of scope: payment status.\nDependency: status API refresh frequency from the assessment platform.",
        insight:
          "The measurement field is what made the next stage possible. Without it the PI would have closed with the benefit assumed.",
      },
      {
        moduleId: "government",
        stage: 8,
        heading: "Meeting the standard without theatre",
        body: "Accessibility testing during Beta found that status was conveyed by colour alone in the first build. It was fixed before Live rather than logged as an enhancement. At the gate the team presented the finding, the fix and the residual risk on data freshness rather than a completed template.",
        insight:
          "Presenting a problem you have already fixed builds more governance confidence than presenting a clean template. It also makes the next honest report easier.",
      },
      {
        moduleId: "integration",
        stage: 9,
        heading: "What the evidence said afterwards",
        body: "Avoidable contacts fell 34%. The guardrail held: time to resolution for unresolved cases was flat. Usability sessions reached 9 of 10 on next-action comprehension. One finding was uncomfortable — providers with the largest caseloads still called, because they were checking several participants at once and the design assumed one.",
        insight:
          "The result was good and incomplete. Naming the caseload finding turned a successful release into the start of the next cycle rather than the end of the project.",
      },
    ],
    closing:
      "The team ended up building roughly what was originally asked for, but with a different core: an action-required signal rather than a status display. That difference came entirely from stage 2, and would have been invisible if the work had started at stage 5.",
  },
  {
    id: "employer-vacancy",
    title: "Employer vacancy drop-off",
    subtitle: "A case where the method catches the mistake — late",
    outcome: "corrected",
    summary:
      "Employers were abandoning the vacancy-advertising form at high rates. The team fixed the form, the completion rate improved sharply, and the outcome did not move at all. This case is included because a method that only ever endorses itself teaches nothing.",
    steps: [
      {
        moduleId: "discovery",
        stage: 2,
        heading: "Where the team started — and stopped",
        body: "Analytics showed 61% abandonment at the position-details step. The team ran a heuristic review, found the step long and the wording dense, and moved straight to redesign. No employer was interviewed. The reasoning felt sound: the data showed exactly where people left.",
        insight:
          "Analytics told them WHERE. Nobody established WHY. The team treated a location as a diagnosis — the single most common discovery failure.",
      },
      {
        moduleId: "outcomes",
        stage: 3,
        heading: "The measure that let it happen",
        body: "Success was defined as form completion rate. It was specific, baselined and time-bound — it looked like a good key result and satisfied every formal test. What it never asked was whether a completed form produced a filled vacancy.",
        artefact:
          "Objective: make advertising a vacancy easier.\nKR1: completion rate 39% → 65% by March.\n(no guardrail, no outcome measure beyond the form itself)",
        insight:
          "A well-formed key result measuring the wrong thing is more dangerous than a vague one, because it passes review and then drives the work.",
      },
      {
        moduleId: "delivery",
        stage: 5,
        heading: "A clean delivery of the wrong thing",
        body: "The redesign shipped in one PI. Completion rose from 39% to 71%, beating the target. The team graded the key result a 4 and closed the epic. Delivery performance was genuinely excellent.",
        insight:
          "Every delivery signal was green. This is what makes output-based measurement so persistent: it rewards teams accurately for the wrong achievement.",
      },
      {
        moduleId: "integration",
        stage: 9,
        heading: "The finding nobody was looking for",
        body: "Six months later an unrelated analysis showed vacancies filled had not moved. Digging in: the abandoned step had been acting as an unintentional filter. Employers who found it hard were largely those posting roles with pay or conditions that would not attract candidates. Making the form easier produced more listings, not more filled vacancies — and increased assessment workload downstream.",
        insight:
          "The friction was doing work nobody had noticed. Removing it optimised the measure and degraded the service, which is the exact failure a guardrail on a downstream outcome would have caught within weeks.",
      },
      {
        moduleId: "outcomes",
        stage: 3,
        heading: "What the correction looked like",
        body: "The team rewrote the measure set around the outcome the service exists for, kept the completion improvement, and added the guardrail that should have been there. Crucially they did not revert the redesign — the form genuinely was better, it just was not sufficient.",
        artefact:
          "Objective: employers fill roles through the service.\nKR1: vacancies filled within 30 days 22% → 30%.\nLeading: completion rate (retained — it moves early).\nGuardrail: downstream assessment workload per filled vacancy does not rise.\nGuardrail: proportion of listings receiving zero applications does not rise.",
        insight:
          "Completion rate was not a bad measure. It was a leading indicator being used as an outcome. That distinction is the whole of stage 3.",
      },
    ],
    closing:
      "Nothing in this case required unusual insight to avoid. A single guardrail on a downstream outcome would have surfaced the problem in the first month instead of the sixth. That is the entire argument for defining the measure set before delivery rather than after.",
  },
];

/* ------------------------------------------------------------------ *
 * Capstone briefs
 *
 * The capstone previously offered one case. A learner who wanted a second
 * attempt could only rewrite the same answers, which trains recall of their
 * own prose rather than the method. Two briefs, deliberately different in
 * shape: one where the obvious solution is nearly right, one where the
 * obvious solution is actively harmful.
 * ------------------------------------------------------------------ */

export type CapstoneBrief = {
  id: string;
  title: string;
  short: string;
  brief: string;
  twist: string;
};

export const capstoneBriefs: CapstoneBrief[] = [
  {
    id: "provider",
    title: "Provider application status",
    short: "The deck's case. Support demand driven by uncertainty.",
    brief:
      "Providers frequently contact support because they cannot reliably understand participant application progress. Information is fragmented across systems, policy and operational constraints matter, and any response must remain accessible, secure and clear about escalation.",
    twist:
      "The obvious answer — a status page — is close to right but not quite. Whether you find the gap depends entirely on how you handle stage 2.",
  },
  {
    id: "vacancy",
    title: "Employer vacancy drop-off",
    short: "High abandonment on a form. The obvious fix makes things worse.",
    brief:
      "Employers abandon the vacancy-advertising service at 61% at the position-details step. Leadership wants the form simplified and has asked for a completion-rate target. The service exists so that roles get filled, and downstream assessment capacity is already stretched.",
    twist:
      "Removing the friction is straightforward and will move the completion rate. Whether it moves the outcome is a different question, and the brief contains enough to work out why.",
  },
  {
    id: "own",
    title: "A service you actually work on",
    short: "Bring your own. Hardest and most useful.",
    brief:
      "Choose a service you are responsible for or close to. You will not have clean evidence, the constraints will be real, and someone will already have a preferred solution. That is the point — the method has to survive contact with an actual organisation.",
    twist:
      "The discipline that matters here is honesty about what you do not know. Mark assumptions as assumptions rather than quietly promoting them to facts.",
  },
];

/* ------------------------------------------------------------------ *
 * Practice contrasts
 *
 * The single most effective teaching device in the source deck was the
 * trade-off pairs on slide 53: a named good state, a named failure, and the
 * risk that connects them. Abstract advice ("focus on outcomes") is easy to
 * agree with and impossible to act on. A contrast is actionable because it
 * names the thing you are probably already doing.
 *
 * `tell` is the diagnostic — the observable sign you are in the failure
 * column right now. That is the part learners can actually check.
 * ------------------------------------------------------------------ */

export type Contrast = {
  moduleId: string;
  good: string;
  usual: string;
  tell: string;
};

export const contrasts: Contrast[] = [
  {
    moduleId: "thinking",
    good: "The team can name the outcome the work is meant to change, and who owns it after go-live.",
    usual: "The team can name the scope and the date, and ownership after go-live is unassigned.",
    tell: "Ask three people what changes for users if this succeeds. If you get three different answers, there is no outcome — only scope.",
  },
  {
    moduleId: "thinking",
    good: "Strategy states what is deliberately not being pursued this year.",
    usual: "Strategy lists priorities, all of which are 'high'.",
    tell: "Count the things labelled top priority. More than three and the prioritisation has not happened yet.",
  },
  {
    moduleId: "discovery",
    good: "The problem statement describes observed behaviour and cites where the evidence came from.",
    usual: "The problem statement describes a missing feature.",
    tell: "Remove every proposed solution from the statement. If nothing meaningful is left, it was a solution wearing a problem's clothes.",
  },
  {
    moduleId: "discovery",
    good: "Analytics locate the problem; qualitative work explains it; the two are checked against each other.",
    usual: "Analytics locate the problem and the team infers the cause from the location.",
    tell: "Ask what would have to be true for the obvious explanation to be wrong. If nobody has checked, you have a location, not a diagnosis.",
  },
  {
    moduleId: "outcomes",
    good: "Every key result has a baseline, and at least one guardrail protects a group or channel.",
    usual: "Key results have targets but no baselines, and no guardrails at all.",
    tell: "Ask what number it is today. If nobody knows, you cannot demonstrate improvement later — only assert it.",
  },
  {
    moduleId: "outcomes",
    good: "The measure would change the decision if it moved the wrong way.",
    usual: "The measure is reported monthly and has never changed anything.",
    tell: "Name the last decision this metric altered. If there isn't one, it is a vanity metric regardless of how rigorous it looks.",
  },
  {
    moduleId: "exploration",
    good: "At least one option in the set is non-build — process, policy, guidance, or removing a step.",
    usual: "Every option is a different way to build the same thing.",
    tell: "If all your options need engineering, you started generating after the solution had already been chosen.",
  },
  {
    moduleId: "exploration",
    good: "The stop condition was written before the test ran.",
    usual: "The result is interpreted after the fact, and always supports continuing.",
    tell: "Ask what result would have killed this. If the honest answer is 'none', the test was theatre.",
  },
  {
    moduleId: "delivery",
    good: "Every feature carries a measurement field, and it is filled in.",
    usual: "Features carry acceptance criteria, so you learn whether it was built but never whether it worked.",
    tell: "Open the last three completed features. If none records what changed, the loop is not closing.",
  },
  {
    moduleId: "delivery",
    good: "The roadmap uses confidence bands beyond the current increment.",
    usual: "The roadmap gives dates for everything, and the far ones are quietly known to be fiction.",
    tell: "Ask what evidence supports the date twelve months out. If it is 'that is when the funding ends', it is a constraint, not a forecast.",
  },
  {
    moduleId: "lifecycle",
    good: "A live service has a named owner, a measure and a review cadence.",
    usual: "A live service has a support rota and an SLA for availability.",
    tell: "Ask who decides what gets improved next. If the answer is a team that no longer exists, decay has already started.",
  },
  {
    moduleId: "roles",
    good: "Reversible decisions are made by the team; governance sees material risk and investment.",
    usual: "Everything is escalated, so governance is busy and slow on the things that matter.",
    tell: "Look at the last governance agenda. Count items that could have been decided by the team without meaningful risk.",
  },
  {
    moduleId: "roles",
    good: "The Product Owner spends most of the week on refinement and acceptance.",
    usual: "The Product Owner spends most of the week relaying questions between the team and the business.",
    tell: "If the PO is the only route to an answer, decision rights were never agreed — that is a structural problem, not a workload one.",
  },
  {
    moduleId: "government",
    good: "Gate papers show what was learned, what changed as a result, and what is still uncertain.",
    usual: "Gate papers show that the required documents exist and are signed.",
    tell: "Search the last gate paper for the word 'assumption'. Zero mentions usually means the risks were smoothed rather than surfaced.",
  },
  {
    moduleId: "government",
    good: "Accessibility is tested during Beta and blockers are fixed before Live.",
    usual: "Accessibility is assessed near Live and issues become post-launch enhancements.",
    tell: "Ask when the first assistive-technology test is scheduled. If it is after the build is complete, it is an audit, not design.",
  },
  {
    moduleId: "integration",
    good: "Priority decisions can name the evidence that would reverse them.",
    usual: "Priority decisions cite a scoring model or a sponsor.",
    tell: "Ask what would change your mind. An answer you cannot give is a decision that cannot be argued with — which is not the same as a good one.",
  },
  {
    moduleId: "integration",
    good: "Results are reported disaggregated, so harm to a subgroup is visible.",
    usual: "Results are reported as averages, and the average is genuinely better.",
    tell: "Split the headline number by channel, assistive technology and caseload size. If nobody has, you do not yet know who you helped.",
  },
];
