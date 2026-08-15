/**
 * Course content.
 *
 * The nine stages map 1:1 onto the nine sections of the source deck
 * (slides 4, 21, 36, 47, 58, 71, 75, 86, 93). That mapping is deliberate and
 * should be preserved — it is what lets a learner move between this system and
 * the deck without translation.
 *
 * Where this system departs from the deck, the departure is recorded in
 * `divergences` (src/reference.ts) and surfaced in the app, so nobody quotes
 * this material in a meeting and gets contradicted by the slides.
 */

export type Question = {
  id: string;
  moduleId: string;
  prompt: string;
  options: string[];
  /** Index into `options`. Display order is permuted per learner at render. */
  answer: number;
  rationale: string;
  /** Optional per-option feedback, shown for the option the learner chose. */
  optionNotes?: string[];
};

export type Scenario = Question & { context: string };

export type LessonTable = {
  caption?: string;
  head: string[];
  rows: string[][];
};

export type LessonSection = {
  heading: string;
  body: string;
  bullets?: string[];
  example?: string;
  table?: LessonTable;
  /** Sources for this section. Load-bearing claims also carry inline markers. */
  sourceIds?: string[];
};

export type Module = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  minutes: number;
  slides: string;
  outcome: string;
  coreIdea: string;
  sections: LessonSection[];
  questions: Question[];
  scenarios: Scenario[];
  assignment: {
    title: string;
    instruction: string;
    prompts: string[];
  };
};

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  note: string;
  /** Shown on the Sources page so currency is visible rather than implied. */
  checked?: string;
};

export const CONTENT_REVIEWED = "15 August 2026";

export const sources: Source[] = [
  {
    id: "deck",
    title: "Product Management Fundamentals — 12AUG2026",
    publisher: "DEWR / Digital Experience and Solutions Division",
    note: "Primary course spine, 98 slides across nine sections. Slide ranges are shown on each stage.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "dss",
    title: "Digital Service Standard, Version 2.0",
    publisher: "Australian Government / Digital Transformation Agency",
    url: "https://www.digital.gov.au/policy/digital-experience/digital-service-standard",
    note: "Current standard: 10 criteria, reduced from the former 13. Fully in effect — new services from 1 July 2024, and public-facing services that existed before that date from 1 July 2025.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "dsspdf",
    title: "The Digital Service Standard Version 2.0 (PDF)",
    publisher: "Australian Government",
    url: "https://www.digital.gov.au/sites/default/files/documents/2024-10/Digital%20Service%20Standard.pdf",
    note: "The criteria in full. This October 2024 file supersedes the July 2024 PDF that earlier versions of this course linked to.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "scrum",
    title: "The Scrum Guide (2020)",
    publisher: "Ken Schwaber and Jeff Sutherland",
    url: "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf",
    note: "Authoritative definitions for Product Goal, Product Backlog, Sprint Goal and Increment. Note that Scrum does not define epics, features or Program Increments.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "wsjf",
    title: "Weighted Shortest Job First",
    publisher: "Scaled Agile Framework",
    url: "https://framework.scaledagile.com/wsjf/",
    note: "Defines WSJF as relative cost of delay divided by relative job duration/size, and cost of delay as user/business value plus time criticality plus risk reduction or opportunity enablement.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "cdh",
    title: "Opportunity Solution Trees",
    publisher: "Teresa Torres, Product Talk",
    url: "https://www.producttalk.org/2016/08/opportunity-solution-tree/",
    note: "Free, full article. Mapping a clear outcome to opportunities, then to solutions and assumption tests, by a product trio.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "svpg",
    title: "The Product Operating Model: An Introduction",
    publisher: "Marty Cagan, Silicon Valley Product Group",
    url: "https://www.svpg.com/product-vs-feature-teams/",
    note: "Outcome-accountable teams and the value, usability, feasibility and viability risks addressed in discovery.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "eriksson",
    title: "What, exactly, is Product Management?",
    publisher: "Martin Eriksson, Mind the Product",
    url: "https://www.mindtheproduct.com/what-exactly-is-a-product-manager/",
    note: "Origin of the business / technology / user-experience intersection framing quoted on slides 8 and 54 of the source deck, where it appears unattributed.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "ideo",
    title: "Introduction to Design Thinking",
    publisher: "IDEO",
    url: "https://designthinking.ideo.com/introduction",
    note: "Human-centred innovation balancing desirability, feasibility and viability.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "lean",
    title: "What is a Lean Canvas?",
    publisher: "Ash Maurya",
    url: "https://ashmaurya.com/blog/what-is-lean-canvas",
    note: "The canvas as a one-page model of assumptions to expose and test, adapted on slide 33 of the deck.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "perri",
    title: "Product strategy and the build trap",
    publisher: "Melissa Perri",
    url: "https://melissaperri.com/blog",
    note: "Free articles. Named in the deck's recommended reading (slide 97); the source of the 'build trap' framing behind outputs-versus-outcomes.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "pichler",
    title: "Product Roadmaps and Product Strategy",
    publisher: "Roman Pichler",
    url: "https://www.romanpichler.com/blog/goal-oriented-agile-product-roadmap/",
    note: "Named in the deck's recommended reading (slide 97). Goal-oriented roadmaps as an alternative to dated feature lists.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "retrieval",
    title: "Test-Enhanced Learning",
    publisher: "Roediger and Karpicke (2006)",
    url: "https://pubmed.ncbi.nlm.nih.gov/16507066/",
    note: "Retrieving knowledge strengthens later retention more effectively than passive restudy over longer delays.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "spacing",
    title: "Distributed Practice in Verbal Recall Tasks",
    publisher: "Cepeda et al. (2006)",
    url: "https://pubmed.ncbi.nlm.nih.gov/16719566/",
    note: "Quantitative review supporting study distributed across time rather than massed into one sitting.",
    checked: CONTENT_REVIEWED,
  },
  {
    id: "techniques",
    title: "Improving Students' Learning With Effective Learning Techniques",
    publisher: "Dunlosky et al. (2013)",
    url: "https://pubmed.ncbi.nlm.nih.gov/26173288/",
    note: "Rates practice testing and distributed practice as high-utility. Note that it rates rereading and highlighting as low-utility — which is why this system makes you retrieve.",
    checked: CONTENT_REVIEWED,
  },
];

export const modules: Module[] = [
  /* ================================================================ *
   * STAGE 1 — Product thinking and strategy (deck slides 1–20)
   * ================================================================ */
  {
    id: "thinking",
    number: 1,
    title: "Product thinking and strategy",
    subtitle: "Move from delivering scope to creating value",
    minutes: 45,
    slides: "1–20",
    outcome:
      "Explain what makes something a product, distinguish product from project thinking, connect vision to strategic choices, and apply product thinking inside a project-funded environment.",
    coreIdea:
      "A product is an enduring vehicle for value. Product management keeps user needs, organisational outcomes and technical reality in productive tension — and it works partially before it works perfectly.",
    sections: [
      {
        heading: "Product is an ownership model, not merely software",
        body: "A product can be a digital service, a policy-enabled capability, an operational system or a combination of these. What matters is that it serves identifiable users, has ongoing ownership, evolves through evidence and is judged by the value it creates. The deck puts it directly: a service is the series of interactions that helps someone do something; a product is the tool created to deliver that service.",
        bullets: [
          "A project is a temporary structure for coordinating investment and delivering change.",
          "A product persists after launch and must be operated, measured and improved.",
          "A release is an output; a changed user or organisational result is an outcome.",
          "A product solves a problem, delivers value, supports outcomes, evolves over time and has ongoing ownership.",
        ],
        example:
          "Launching an application-status page is an output. Providers resolving their status questions without calling support is an outcome.",
        sourceIds: ["deck", "scrum"],
      },
      {
        heading: "The product manager's central judgement",
        body: "Product management is often described as the intersection of business, technology and user experience — a framing that originates with Martin Eriksson and appears on slides 8 and 54 of the deck without attribution. The role is not to collect every request or write every requirement. It is to make evidence-informed choices where user value, organisational value and technical constraints meet, and to keep the team aligned on why the work matters.",
        bullets: [
          "Desirable or valuable: people have a meaningful need and will use the result.",
          "Viable: policy, operational, financial, legal and service constraints can sustain it.",
          "Feasible and usable: the team can build and operate it, and people can understand it.",
          "The deck names three accountabilities: vision and strategy, execution and delivery, and product success.",
        ],
        sourceIds: ["eriksson", "svpg", "ideo", "deck"],
      },
      {
        heading: "Vision gives direction; strategy makes choices",
        body: "Vision describes the future state worth moving toward. Strategy identifies the critical problems and choices that create progress toward it. A roadmap then communicates a current sequence of bets — it is not the strategy itself. The deck is blunt about this: strategy is not doing everything, building every feature or satisfying every stakeholder. It is choosing priorities, focusing investment, making trade-offs and deciding what not to do.",
        bullets: [
          "Vision should be stable enough to orient multiple delivery cycles.",
          "Strategy says where to focus and, crucially, what not to pursue now.",
          "Priorities should be traceable to evidence, constraints and desired outcomes.",
          "A list that accommodates every stakeholder is a decision deferred, not a strategy.",
        ],
        example:
          "Vision: providers can understand and manage applications with confidence. Strategy: first reduce uncertainty at the three points that generate most avoidable support demand. Deliberate non-priority: no changes to the assessment workflow this year.",
        sourceIds: ["deck", "svpg", "perri"],
      },
      {
        heading: "Product thinking survives inside project funding",
        body: "Government funds projects, not products. Departments run project frameworks, not product frameworks. Delivery is measured by outputs more often than by value. All of this is true, and none of it makes product thinking impossible — it makes partial adoption the realistic goal. The deck's own framing is that product management is not all or nothing.",
        bullets: [
          "Doing some discovery is better than doing none.",
          "Using outcomes imperfectly is better than tracking only outputs.",
          "Testing one assumption is better than testing none.",
          "Getting some user feedback after a release is better than none.",
        ],
        example:
          "A project with fixed scope and a fixed date can still run a two-week bounded discovery on the riskiest assumption, and still define one outcome measure and one guardrail before build starts.",
        sourceIds: ["deck"],
      },
      {
        heading: "The shift in thinking, in four pairs",
        body: "The deck compresses the whole first section into four contrasts. They are worth memorising because they diagnose most disagreements you will have about priority.",
        table: {
          caption: "Slide 13 — A shift in thinking",
          head: ["From", "To", "What changes in practice"],
          rows: [
            ["Projects", "Products", "Ownership continues after go-live; someone is accountable for performance."],
            ["Outputs", "Outcomes", "Success is a measured change, not a delivered artefact."],
            ["Requirements", "Problems", "The team is briefed on the problem and constraints, not handed a solution."],
            ["Delivery", "Learning", "Each release is expected to produce evidence that changes the next decision."],
          ],
        },
        sourceIds: ["deck", "perri"],
      },
    ],
    questions: [
      {
        id: "thinking-q1",
        moduleId: "thinking",
        prompt: "Which statement best distinguishes a product from a project?",
        options: [
          "A product has ongoing ownership and is improved against outcomes; a project is a temporary delivery structure",
          "A product uses Agile while a project uses waterfall",
          "A product is digital while a project can include policy",
          "A product has no fixed constraints"],
        answer: 0,
        optionNotes: [
          "",
          "Method is not the distinction. A project can be run iteratively and a product can be managed badly in either method.",
          "Both can be either. The deck explicitly says a product may be a digital application, a policy, a set of operational procedures, or a combination.",
          "Products operate under constraints permanently — funding, policy, legacy systems and capacity. The difference is duration of ownership, not absence of limits."],
        rationale:
          "Method and medium do not define the distinction. Ongoing ownership, learning and outcome accountability do.",
      },
      {
        id: "thinking-q2",
        moduleId: "thinking",
        prompt: "A list containing every stakeholder's requested feature is primarily…",
        options: [ "A product strategy", "An unmade set of choices", "A measurable outcome","A product vision"],
        answer: 1,
        optionNotes: [
          "Strategy requires focus and trade-offs. A list that accommodates everyone has made no trade-off.",
          "",
          "An outcome is a measured change. A feature list is a set of proposed outputs.",
          "A vision describes a future state, not an inventory of requests."],
        rationale: "Strategy requires focus and trade-offs. Accepting everything avoids the strategic decision.",
      },
      {
        id: "thinking-q3",
        moduleId: "thinking",
        prompt:
          "Your department funds projects, runs a project framework and reports on delivery milestones. What does the deck say this means for product management?",
        options: [
          "Product management applies only to the digital components of the project",
          "Product management cannot be applied until the funding model changes",
          "Product thinking can operate inside project delivery, and partial adoption is worthwhile",
          "The project framework should be abandoned for a product framework"],
        answer: 2,
        optionNotes: [
          "Whole-of-service thinking is the point. Restricting product practice to the digital layer reproduces the problem it is meant to solve.",
          "This is the counsel of despair the deck explicitly argues against. Waiting for the operating model to change means never starting.",
          "",
          "Nothing in the deck proposes replacing the departmental framework. The two are designed to coexist."],
        rationale:
          "'Product management is not all or nothing.' Some discovery beats none; imperfect outcomes beat outputs alone.",
      },
      {
        id: "thinking-q4",
        moduleId: "thinking",
        prompt: "In the shift-in-thinking pairs, what replaces 'requirements'?",
        options: [ "Epics", "Acceptance criteria","Roadmaps", "Problems"],
        answer: 3,
        optionNotes: [
          "An epic is a backlog container. It can carry a requirement mindset just as easily as an outcome mindset.",
          "Acceptance criteria are still needed — they define done for a slice. The shift is about what the team is briefed on.",
          "A roadmap communicates sequence and confidence. It is not the counterpart to requirements.",
          ""],
        rationale:
          "Slide 13 pairs projects/products, outputs/outcomes, requirements/problems and delivery/learning. Teams briefed on problems can find better solutions than the one someone specified.",
      },
    ],
    scenarios: [
      {
        id: "thinking-s1",
        moduleId: "thinking",
        context:
          "Funding and the delivery date are fixed. A senior stakeholder says discovery is pointless because the team must deliver the approved scope.",
        prompt: "What is the strongest product-management response?",
        options: [
          "Remove all discovery and ask for detailed requirements",
          "Reject the project because product work cannot operate under constraints",
          "Use bounded discovery to test the riskiest assumptions and prioritise value within the approved constraints",
          "Promise every requested feature and measure success after closure"],
        answer: 2,
        optionNotes: [
          "This guarantees the approved scope is built exactly as imagined, including whichever parts are wrong. It converts a delivery risk into a certainty.",
          "Constraints are the normal condition of government delivery. Refusing to work inside them removes product practice from where it is most needed.",
          "",
          "Measuring after closure means measuring after the team has disbanded and the budget has closed — the point at which nothing can be changed."],
        rationale:
          "Product thinking can operate within project constraints. The practical move is to reduce uncertainty early and protect the most valuable outcome inside the approved envelope.",
      },
      {
        id: "thinking-s2",
        moduleId: "thinking",
        context:
          "You inherit a service with a clear vision statement, a 40-item feature list and no stated priorities. Every item has an internal sponsor and the team is delivering roughly in the order requests arrived.",
        prompt: "What is the first thing to establish?",
        options: [
          "A steering committee vote to rank the 40 items",
          "A commitment to deliver the top 20 items this financial year",
          "A detailed estimate for all 40 items so the sponsors can see the total cost",
          "The two or three problems that most block the vision, and what will therefore be deferred"],
        answer: 3,
        optionNotes: [
          "A vote ranks preferences, not value. It converts the loudest voice into a number and gives the result false authority.",
          "This picks a quantity before establishing a rationale. It also re-commits to the arrival-order problem, just with a cut line.",
          "Estimating everything is expensive and answers a question nobody needs answered. It also implies all 40 items are still candidates.",
          ""],
        rationale:
          "The missing artefact is not an estimate or a ranking — it is the strategic choice. Naming the critical problems, and what is explicitly not being pursued, is what turns a vision and a list into a strategy.",
      },
    ],
    assignment: {
      title: "Write a one-page strategic chain",
      instruction:
        "Choose a service you know. Connect one user group to a future state, a strategic focus and a deliberate non-priority.",
      prompts: [
        "Who is the user and what are they trying to achieve?",
        "What future state should the vision describe?",
        "What problem will you focus on first — and what will you explicitly defer?",
        "Which of the four shift-in-thinking pairs is hardest in your context, and what would make it easier?",
      ],
    },
  },

  /* ================================================================ *
   * STAGE 2 — Discovery and problem framing (deck slides 21–35)
   * ================================================================ */
  {
    id: "discovery",
    number: 2,
    title: "Discovery and problem framing",
    subtitle: "Build evidence before committing to a solution",
    minutes: 55,
    slides: "21–35",
    outcome:
      "Plan discovery, distinguish four kinds of user need, tell evidence from assumption, diagnose root causes, and write testable problem, opportunity and hypothesis statements.",
    coreIdea:
      "Discovery reduces uncertainty about users, problems and opportunities. It produces insight, not requirements — and it should change a decision, not merely generate artefacts.",
    sections: [
      {
        heading: "Understand behaviour in context",
        body: "Interviews, observation, workshops, analytics, support data and surveys reveal different parts of the service. Triangulation matters because stated preferences, actual behaviour and system constraints frequently disagree.",
        bullets: [
          "Research the whole journey, including non-digital channels and workarounds.",
          "Separate direct evidence from interpretation and inherited belief.",
          "Include people with varied access, capability and support needs.",
        ],
        sourceIds: ["deck", "dss", "cdh"],
      },
      {
        heading: "Four kinds of need — and the one government creates",
        body: "The deck distinguishes what users are experiencing now from what they say, what they assume and what the system forces on them. The fourth category is the one most often mistaken for a user need, and it is the one product managers in government are uniquely placed to challenge.",
        table: {
          caption: "Slide 23 — what are we trying to understand?",
          head: ["Kind of need", "What it is", "How you find it"],
          rows: [
            [
              "Current experience",
              "What users do now, and the tools they already use to reach their goal.",
              "Observation, analytics, support data, walking the process.",
            ],
            [
              "Stated needs",
              "What users explicitly tell you they need — for example, a mobile-responsive service.",
              "Interviews, surveys, feedback channels.",
            ],
            [
              "Unstated needs",
              "What users expect without ever asking — for example, information they can understand.",
              "Observation of failure and hesitation; usability testing.",
            ],
            [
              "Created needs",
              "What users are forced to do because of policy or the way government works.",
              "Journey mapping and blueprinting; asking why a step exists at all.",
            ],
          ],
        },
        example:
          "'Providers need a form to request a status update' is a created need. The underlying need is to know the status. The form exists because the department has no self-service channel — that is a design decision, not a user requirement.",
        sourceIds: ["deck"],
      },
      {
        heading: "Artefacts are thinking tools",
        body: "Personas summarise meaningful behavioural patterns; journey maps show the experience over time; service blueprints connect visible interactions to backstage people, processes and systems. None of them is the outcome. Their value is the decision they improve.",
        table: {
          caption: "Slides 25–27 — what each artefact is for",
          head: ["Artefact", "Purpose", "Typically contains"],
          rows: [
            [
              "Persona",
              "Shared understanding of who the users are.",
              "Goals, needs, behaviours, motivations, challenges, context.",
            ],
            [
              "Journey map",
              "Find where improvement will have the greatest impact.",
              "User goals, activities, touchpoints, emotions, pain points, opportunities.",
            ],
            [
              "Service blueprint",
              "Understand how the service operates behind the scenes.",
              "User actions, front-stage activities, back-stage activities, supporting systems and processes.",
            ],
          ],
        },
        bullets: [
          "A persona must be grounded in research, not a demographic stereotype.",
          "A blueprint exposes why the front-stage experience behaves as it does.",
          "If an artefact would not change what the team does next, it is decoration.",
        ],
        sourceIds: ["deck", "dss"],
      },
      {
        heading: "Discovery produces insight, not requirements",
        body: "The deck draws a hard line here. Discovery produces interview notes, survey responses, analytics, feedback and observations. It does not produce requirements, features or solutions. The moment a discovery report contains a solution, it has stopped being evidence and started being advocacy.",
        bullets: [
          "Discovery outputs: insights, personas, journey maps, blueprints, problem statements, opportunities, hypotheses.",
          "These become the inputs to solution exploration — the next stage, not this one.",
          "A five-whys chain moves from the visible symptom to the structural cause.",
        ],
        example:
          "Five whys, from the deck: providers call support → they cannot determine application status → status is not available through self-service → progress is stored across multiple systems → the service grew through several projects and was never consolidated → past investment prioritised policy commitments and functionality over end-to-end user experience.",
        sourceIds: ["deck"],
      },
      {
        heading: "Move from symptom to testable opportunity",
        body: "A good problem statement names the affected group, their goal, the observed difficulty, where and when it occurs, and the consequence — without embedding a preferred solution. 'How might we' then reframes the problem as an invitation to explore several responses, and a hypothesis commits to one of them in a form that evidence can contradict.",
        bullets: [
          "Problem: an evidence-based description of the current gap. Who / what / goal / where / when / why it matters.",
          "How might we: an invitation to explore, not a proposal.",
          "Hypothesis: a proposed intervention, audience, expected outcome and observable signal.",
          "A hypothesis you cannot imagine being wrong is not a hypothesis.",
        ],
        example:
          "We believe giving providers timely application-status visibility will reduce avoidable status calls. We will look for lower call volume and higher successful self-service, while checking that unresolved cases still reach support.",
        sourceIds: ["deck", "cdh"],
      },
      {
        heading: "The Lean Canvas as an assumption model",
        body: "The deck adapts Ash Maurya's Lean Canvas as a one-page way to hold the whole problem-to-measure chain while it is still uncertain. Its real function is not documentation — it is to make the riskiest assumption visible so you know what to test first.",
        table: {
          caption: "Slide 33 — the deck's canvas fields",
          head: ["Field", "The question it answers"],
          rows: [
            ["Problem", "What problem does the organisation have that you are trying to solve?"],
            ["Users", "What types of users are impacted?"],
            ["Solution ideas", "What options could solve the problem and meet user needs?"],
            ["Business outcomes", "How will you know if you have solved it? What will you measure?"],
            ["Hypotheses", "Combine the assumptions above into testable hypothesis statements."],
            ["Riskiest assumption", "For each hypothesis: what, if wrong, makes the whole thing fail?"],
          ],
        },
        sourceIds: ["lean", "deck"],
      },
    ],
    questions: [
      {
        id: "discovery-q1",
        moduleId: "discovery",
        prompt: "Which is the best problem statement?",
        options: [
          "Providers cannot reliably determine application progress and make avoidable support calls, increasing effort and uncertainty",
          "We need an application-status dashboard",
          "The old system is bad",
          "Build automated notifications by October"],
        answer: 0,
        optionNotes: [
          "",
          "This is a solution. It forecloses every other option — including changing the notification, the policy or the process.",
          "This has no user, no goal, no evidence and no consequence. Nothing can be tested against it.",
          "This is a commitment with a date. It presumes both the solution and the timeline before the problem is understood."],
        rationale:
          "It names the affected group, the goal they cannot reach, the observed behaviour and the consequence, without prescribing a solution.",
      },
      {
        id: "discovery-q2",
        moduleId: "discovery",
        prompt: "What makes a discovery artefact useful?",
        options: [
          "It is visually polished",
          "It improves a consequential decision",
          "It was created collaboratively in a workshop",
          "It contains every research quote"],
        answer: 1,
        optionNotes: [
          "Polish helps communication but is not the test. A beautiful journey map that changes nothing has failed.",
          "",
          "Collaboration improves shared understanding, but a workshop can equally produce a well-attended guess.",
          "Completeness is not the goal — synthesis is. A document nobody can act on is an archive, not an artefact."],
        rationale: "Artefacts are means for shared understanding and decision quality, not ends in themselves.",
      },
      {
        id: "discovery-q3",
        moduleId: "discovery",
        prompt:
          "A provider says: 'I need the weekly reconciliation spreadsheet emailed to me every Monday.' The spreadsheet exists only because two departmental systems do not talk to each other. What kind of need is this?",
        options: [ "A stated need that is also a created need", "A current experience only", "A viability constraint","An unstated need"],
        answer: 0,
        optionNotes: [
          "",
          "It does describe current experience, but stopping there misses the point: the need exists because of a system boundary, and that boundary is changeable.",
          "Viability is about whether the organisation can sustain a solution. This is about where the requirement came from.",
          "Unstated needs are the expectations users never articulate. This one was articulated very precisely."],
        rationale:
          "It is stated — they asked for it explicitly — and created, because it exists only as a workaround for how government has organised its systems. Treating it as a pure user requirement would automate the workaround instead of removing it.",
      },
      {
        id: "discovery-q4",
        moduleId: "discovery",
        prompt: "According to the deck, which of these does discovery NOT produce?",
        options: [ "Problem statements", "Requirements", "Hypotheses","Insights"],
        answer: 1,
        optionNotes: [
          "Problem statements are a discovery output — they synthesise evidence into a testable framing.",
          "",
          "Hypotheses are a discovery output and the bridge into solution exploration.",
          "Insights are the primary output of discovery."],
        rationale:
          "Slide 28 is explicit: discovery produces interview notes, survey responses, analytics, feedback and observations — not requirements, features or solutions. Those belong to solution exploration and delivery.",
      },
    ],
    scenarios: [
      {
        id: "discovery-s1",
        moduleId: "discovery",
        context:
          "Analytics show users abandon a form at the identity step. Stakeholders assume the page needs clearer instructions.",
        prompt: "What should the team do next?",
        options: [
          "Treat the drop-off rate as proof of the cause",
          "Rewrite the instructions immediately",
          "Observe representative users and inspect error and support data before choosing an intervention",
          "Remove identity verification"],
        answer: 2,
        optionNotes: [
          "Analytics tell you where users stop, never why. Drop-off is the symptom the investigation starts from.",
          "Possibly the right fix, but chosen before the cause is known. If the real barrier is a document people do not have, clearer instructions change nothing.",
          "",
          "This treats a legal and security control as an inconvenience. Viability constraints are design inputs, not obstacles to delete."],
        rationale:
          "The data identifies where the problem occurs, not why. Targeted qualitative and operational evidence should diagnose the cause before an intervention is chosen.",
      },
      {
        id: "discovery-s2",
        moduleId: "discovery",
        context:
          "A discovery report lands on your desk. It is 60 pages, beautifully produced, and concludes with a recommendation to build a mobile app. The research section contains 14 interviews, none of which mention mobile.",
        prompt: "What is the most useful critique?",
        options: [
          "The interviews should have asked directly about mobile preferences",
          "The sample size is too small to support any conclusion",
          "The report should have been shorter",
          "The recommendation is not traceable to the evidence, and discovery should not be recommending a solution at all"],
        answer: 3,
        optionNotes: [
          "Asking users to choose a channel invites them to design for you. Stated channel preferences are weak evidence compared with observed behaviour.",
          "Fourteen interviews is a reasonable qualitative sample. Sample size is not the defect here.",
          "Length is a symptom, not the problem. A three-page report with the same disconnect would be equally unusable.",
          ""],
        rationale:
          "Two failures at once: the conclusion has no evidential chain, and discovery has crossed into prescribing a solution. The deck separates these deliberately — discovery produces insight and hypotheses, solution exploration chooses among options.",
      },
    ],
    assignment: {
      title: "Build an evidence ledger",
      instruction:
        "For a real service problem, separate what is known, inferred and unknown before proposing an intervention.",
      prompts: [
        "What direct evidence exists?",
        "What assumptions are being treated as facts?",
        "Which unknown could most change the decision, and how would you investigate it?",
        "Which of the current requirements are created needs — artefacts of how the department works rather than what users need?",
      ],
    },
  },

  /* ================================================================ *
   * STAGE 3 — Outcomes, measures and OKRs (deck slides 36–46)
   * ================================================================ */
  {
    id: "outcomes",
    number: 3,
    title: "Outcomes, measures and OKRs",
    subtitle: "Define success before delivery begins",
    minutes: 50,
    slides: "36–46",
    outcome:
      "Write useful outcomes and OKRs, grade them honestly, distinguish leading from lagging signals, and design measures that support learning rather than vanity reporting.",
    coreIdea:
      "An output says what was produced. An outcome says what changed. Measurement closes the loop between intent, delivery and evidence — and if the work does not move a key result, it needs a different justification.",
    sections: [
      {
        heading: "Start with the change, not the artefact",
        body: "Outcomes may describe user behaviour or experience, operational performance, financial impact, risk reduction or learning. They must be specific enough to influence choices but not so narrow that teams optimise a proxy at the expense of the service.",
        table: {
          caption: "Slides 37–39 — outputs and the outcomes they are meant to create",
          head: ["Output (the what)", "Outcome (the why)"],
          rows: [
            ["New login feature", "Users can access the service faster"],
            ["New form", "Submission time reduced by 20%"],
            ["System deployed", "Increased user satisfaction"],
            ["Status notifications sent", "Providers resolve status questions without assistance"],
          ],
        },
        bullets: [
          "The deck names five kinds of good outcome: user value, operational efficiency, financial impact, risk reduction, and learning or reduced uncertainty.",
          "Learning counts as an outcome. Reducing uncertainty is a legitimate result of a cycle.",
          "Guardrail: accessibility, support demand or error risk does not worsen for other groups.",
        ],
        sourceIds: ["deck", "dss", "svpg", "perri"],
      },
      {
        heading: "OKRs connect direction to evidence",
        body: "An objective describes a meaningful direction. Key results describe measurable evidence that the objective is being achieved. Actions are hypotheses about how to move those results; they are not substitutes for the result. The deck's formula is compact: we will [objective], as measured by [key results], via [actions].",
        bullets: [
          "Objective: qualitative, specific and motivating.",
          "Key result: a measurable change with baseline, target and timeframe. Two to five per objective.",
          "Action: work the team believes will influence a key result.",
          "Insight: what the movement in the key result taught you.",
        ],
        example:
          "Objective: Make application progress understandable without assistance. KR1: Increase successful status self-service from 42% to 70% by June. KR2: Reduce avoidable status calls by 30%. Guardrail: unresolved-case escalation stays above 95%.",
        sourceIds: ["deck"],
      },
      {
        heading: "Grade key results honestly",
        body: "The deck uses a four-point grading scale. Its value is that it makes partial achievement sayable. A team that scores 2 and explains why has produced more organisational learning than a team that quietly rewrites the target to 100%.",
        table: {
          caption: "Slide 41 — OKR grading",
          head: ["Grade", "Meaning"],
          rows: [
            ["4", "Exceeded expected results"],
            ["3", "Sufficient achievement against expected results"],
            ["2", "Made progress, but fell short of expected results"],
            ["1", "No progress against expected results"],
          ],
        },
        bullets: [
          "Grade the key result, not the effort that went into it.",
          "A consistent 4 across every objective usually means the targets were set too low.",
          "Record the insight alongside the grade — the grade without the reason teaches nobody anything.",
        ],
        sourceIds: ["deck"],
      },
      {
        heading: "Use a measurement system, not one magic number",
        body: "Lagging indicators measure past performance and confirm an outcome after it occurs. Leading indicators are predictive measures of future performance and provide earlier signals, but they require validation. Pair them with diagnostic measures and guardrails, and define the population, denominator, baseline, period and exclusions before anyone reports on them.",
        table: {
          caption: "Slide 42 — indicator types with worked examples",
          head: ["Type", "Purpose", "Example"],
          rows: [
            ["Leading", "Predictive signal of future performance", "Feature usage; completion rate"],
            ["Lagging", "Confirmation of past performance", "Customer satisfaction; outcome achieved"],
            ["Guardrail", "Detects harm or displacement", "Escalation rate for unresolved cases; assistive-technology success rate"],
          ],
        },
        bullets: [
          "Outcome: did the desired change occur?",
          "Leading: are behaviours moving in the expected direction?",
          "Guardrail: did the intervention create unacceptable harm or push the problem somewhere else?",
          "Define the denominator before you publish the percentage.",
        ],
        sourceIds: ["deck", "dss"],
      },
    ],
    questions: [
      {
        id: "outcomes-q1",
        moduleId: "outcomes",
        prompt: "Which is a key result rather than an action or output?",
        options: [
          "Launch a new portal",
          "Run five user interviews",
          "Reduce median completion time from 18 to 12 minutes by June",
          "Create a roadmap"],
        answer: 2,
        optionNotes: [
          "A launch is an output. It can happen on time and change nothing.",
          "Interviews are an action. They might produce insight, but the count of interviews is not a result.",
          "",
          "A roadmap is a communication artefact, not a measured change."],
        rationale: "It describes a measurable change with a baseline, a target and a timeframe. The others are activities or outputs.",
      },
      {
        id: "outcomes-q2",
        moduleId: "outcomes",
        prompt: "Why pair an outcome measure with a guardrail?",
        options: [
          "To avoid having to set a baseline",
          "To convert an output into a strategy",
          "To make the dashboard more comprehensive",
          "To detect harmful trade-offs or displaced problems"],
        answer: 3,
        optionNotes: [
          "Guardrails need baselines just as much as targets do. Without one you cannot tell whether it has worsened.",
          "Guardrails constrain how an outcome is pursued. They have nothing to do with strategy formation.",
          "More metrics is not the aim. A guardrail has a specific job: catching the harm your target might cause.",
          ""],
        rationale:
          "A target can be achieved in a way that harms another user group, channel or risk domain. Guardrails make that visible before it scales.",
      },
      {
        id: "outcomes-q3",
        moduleId: "outcomes",
        prompt: "Under the deck's grading scale, what does a grade of 2 mean?",
        options: [
          "Made progress, but fell short of expected results",
          "Sufficient achievement against expected results",
          "Exceeded expected results",
          "No progress against expected results"],
        answer: 0,
        optionNotes: [
          "",
          "That is grade 3 — the target was substantially met.",
          "That is grade 4.",
          "That is grade 1."],
        rationale:
          "The four-point scale exists to make partial achievement reportable. A 2 with a clear explanation of what was learned is more useful to the organisation than a target quietly revised downward.",
      },
      {
        id: "outcomes-q4",
        moduleId: "outcomes",
        prompt: "Which pairing correctly matches an indicator to its type?",
        options: [
          "Form completion rate — lagging indicator",
          "Feature usage in the first fortnight — leading indicator",
          "Number of releases shipped — lagging indicator",
          "Customer satisfaction score — leading indicator"],
        answer: 1,
        optionNotes: [
          "Completion rate is leading — it moves early and predicts the later outcome.",
          "",
          "Release count is an output measure. It is neither leading nor lagging with respect to any outcome, because it measures activity rather than change.",
          "Satisfaction is lagging: it reports how people felt about an experience they have already had."],
        rationale:
          "The deck pairs feature usage and completion rate as leading, and customer satisfaction and outcome achievement as lagging. Release counts measure activity, which is the trap the whole stage warns about.",
      },
    ],
    scenarios: [
      {
        id: "outcomes-s1",
        moduleId: "outcomes",
        context: "A team launches status notifications and wants to know whether they created value.",
        prompt: "Which measure set is strongest?",
        options: [
          "Successful self-service, avoidable status-call rate, user comprehension and unresolved-case escalation",
          "Number of notifications sent",
          "Release delivered on date and on budget",
          "Status page views"],
        answer: 0,
        optionNotes: [
          "",
          "This counts the activity the team performed. It would rise even if every notification were ignored or misunderstood.",
          "This measures project performance, not product value. Both can be true while nothing improves for users.",
          "Views tell you people arrived, not that they understood or that their question was answered."],
        rationale:
          "The set combines outcome, behavioural, experience and guardrail evidence instead of counting activity alone.",
      },
      {
        id: "outcomes-s2",
        moduleId: "outcomes",
        context:
          "Your key result is 'reduce avoidable status calls by 30%'. Two months in, calls are down 34%. Support tells you the improvement began the week the phone menu was restructured to route status enquiries to a callback queue with a four-day wait.",
        prompt: "What is the correct reading?",
        options: [
          "The key result has been met and the objective can be closed",
          "The measure has been moved by displacement rather than by resolution, and the missing guardrail is the real finding",
          "The key result should be raised to 50% since progress is ahead of schedule",
          "The phone menu change should be reversed to isolate the product's effect"],
        answer: 1,
        optionNotes: [
          "The number moved; the problem did not. Closing here would bank an improvement that users experienced as a four-day wait.",
          "",
          "Raising a target you have not actually influenced compounds the error rather than correcting it.",
          "Reversing an operational change to protect the cleanliness of a metric puts measurement ahead of service. Instrument the displacement instead."],
        rationale:
          "Calls fell because the demand was pushed into a queue, not because uncertainty was resolved. A guardrail on time-to-resolution or unresolved-case escalation would have caught it — which is exactly what guardrails are for.",
      },
    ],
    assignment: {
      title: "Create a measure tree",
      instruction: "Turn one service objective into measurable evidence and safeguards.",
      prompts: [
        "State one objective in plain language.",
        "Write two key results with baselines, targets and timeframes.",
        "Add one leading indicator and one guardrail; explain what each protects against.",
        "For each key result, state what a grade of 2 would look like and what you would do about it.",
      ],
    },
  },
  /* ================================================================ *
   * STAGE 4 — Solution exploration and validation (deck slides 47–57)
   * ================================================================ */
  {
    id: "exploration",
    number: 4,
    title: "Solution exploration and validation",
    subtitle: "Learn cheaply before you build deeply",
    minutes: 55,
    slides: "47–57",
    outcome:
      "Generate options, apply the desirable/viable/feasible lenses and their trade-off pairs, expose assumptions, select appropriate experiments, and define an MVP as the smallest coherent test of value.",
    coreIdea:
      "Discovery asks whether a solution is valuable, usable, feasible and viable before the organisation makes an expensive commitment. A trade-off is not a compromise you regret — it is a choice you make on purpose.",
    sections: [
      {
        heading: "Diverge before you converge",
        body: "Generate several ways to address the opportunity before comparing them. Workshops, co-design, brainstorming and AI-assisted ideation all broaden the option space, but evidence and constraints — not workshop popularity — must drive the decision.",
        bullets: [
          "Generate many ideas; encourage diverse perspectives; avoid premature judgement; focus on outcomes.",
          "Separate idea generation from evaluation, in time and preferably in the agenda.",
          "Include non-build options: process change, policy change, guidance, removing a step entirely.",
          "Compare options against the intended outcome and the critical constraints, not against each other's polish.",
        ],
        sourceIds: ["deck", "ideo"],
      },
      {
        heading: "Desirable, viable, feasible — the three lenses",
        body: "The DVF model is a filter applied before the organisation invests time and resources. The ideal solution sits at the intersection of desirability (human), feasibility (technology) and viability (business and policy). Delivery fails when one perspective dominates.",
        table: {
          caption: "Slides 50–52 — the lenses and their failure modes",
          head: ["Lens", "The question", "What dominance alone produces"],
          rows: [
            ["Desirable (human)", "Do users want it? Is the need validated?", "User-led but unsustainable"],
            ["Feasible (technology)", "Can teams build and operate it?", "Technically elegant but unused"],
            ["Viable (business and policy)", "Can the organisation sustain it?", "Strategically valuable but undeliverable"],
            ["None — expedience", "What can we do fastest?", "Easiest to build now, unlikely to deliver the outcome"],
          ],
        },
        sourceIds: ["deck", "ideo", "svpg"],
      },
      {
        heading: "The trade-off pairs tell you what you are risking",
        body: "Any two lenses without the third produce a recognisable kind of failure. Naming the pair you are currently sitting on is the fastest way to say what evidence you still owe.",
        table: {
          caption: "Slide 53 — common trade-offs",
          head: ["Pair", "What you get", "What you are risking"],
          rows: [
            [
              "Desirable + Feasible",
              "Usable and buildable — users will use it, teams can deliver it",
              "May not align to business or policy priorities",
            ],
            [
              "Feasible + Viable",
              "Operable and sustainable — affordable to run, technically sound",
              "May not solve a genuine user problem",
            ],
            [
              "Desirable + Viable",
              "Valuable and needed — meaningful benefits, aligned to strategy",
              "May not be technically achievable in the current landscape",
            ],
          ],
        },
        example:
          "A proposal that policy loves and users need, but which requires real-time integration with three systems that batch overnight, is Desirable + Viable. The debt you owe is a feasibility spike — not another stakeholder briefing.",
        sourceIds: ["deck"],
      },
      {
        heading: "Map risks and assumptions",
        body: "A promising idea can fail because users do not value it, cannot use it, the team cannot deliver or operate it, or policy and business constraints make it untenable. Write assumptions explicitly and rank them by importance and uncertainty. The riskiest assumption is the one that, if wrong, makes the whole thing fail.",
        bullets: [
          "Value/desirability: will this solve a problem that matters?",
          "Usability: can people understand and successfully use it?",
          "Feasibility: can it be built and operated with the available technology and capability?",
          "Viability: can policy, service, legal, financial and organisational conditions sustain it?",
        ],
        sourceIds: ["svpg", "ideo", "lean"],
      },
      {
        heading: "Match the experiment to the uncertainty",
        body: "An experiment is a deliberate way to obtain decision-relevant evidence. The method should follow from the kind of risk, not from what the team is comfortable running.",
        table: {
          caption: "Choosing a validation method",
          head: ["Risk", "Method", "What it tells you"],
          rows: [
            ["Problem and value", "Interviews, observation, demand tests", "Whether the problem matters enough to act on"],
            ["Usability and comprehension", "Wireframes, prototypes, usability testing", "Whether people can understand and complete the task"],
            ["Feasibility", "Technical spike against representative interfaces and data", "Whether it can be built and operated"],
            ["Viability", "Operational simulation, policy and legal review, costing", "Whether the organisation can sustain it"],
            ["Comparative effect at scale", "A/B or staged rollout with a control", "Which variant actually moves the measure"],
          ],
        },
        bullets: [
          "Define the decision first, then the evidence that would change it.",
          "Test the riskiest assumption with the cheapest credible evidence.",
          "Predefine what result would support, weaken or kill the idea — before you run it.",
        ],
        example:
          "Before integrating three legacy systems, use a realistic prototype and manually supplied status data to test whether the proposed information actually reduces uncertainty for providers.",
        sourceIds: ["cdh", "svpg", "lean"],
      },
      {
        heading: "What an MVP is, and what it is not",
        body: "The deck defines an MVP as the smallest thing we can build that delivers value and generates learning. MVPs are focused, intentional and designed to reduce uncertainty. They are not a poor-quality solution and not an unfinished product. In government the distinction matters more than usual: 'minimum' never licenses an inaccessible, insecure or misleading experience.",
        bullets: [
          "Minimum refers to scope of the bet, not to quality of the build.",
          "An MVP still has to meet accessibility and security obligations.",
          "If it cannot produce evidence that would change your next decision, it is not an MVP — it is just a small release.",
        ],
        sourceIds: ["deck", "dss"],
      },
    ],
    questions: [
      {
        id: "exploration-q1",
        moduleId: "exploration",
        prompt: "What is the best definition of an MVP in this context?",
        options: [
          "Whatever scope fits before the deadline",
          "The cheapest possible release",
          "The smallest coherent test that produces evidence about value and risk",
          "A complete product with fewer features"],
        answer: 2,
        optionNotes: [
          "Deadline-driven scope is a delivery constraint. It says nothing about what the release is designed to find out.",
          "Cost is not the defining property. A cheap release that teaches you nothing has failed at the only job an MVP has.",
          "",
          "This describes a reduced product, not a test. The purpose is learning, not a trimmed launch."],
        rationale:
          "The purpose is learning and risk reduction. 'Minimum' does not excuse an incoherent, inaccessible or unsafe experience.",
      },
      {
        id: "exploration-q2",
        moduleId: "exploration",
        prompt: "Which experiment best tests technical feasibility?",
        options: [
          "A stakeholder vote on the preferred option",
          "A persona workshop",
          "A satisfaction survey before release",
          "A technical spike against representative interfaces and data"],
        answer: 3,
        optionNotes: [
          "A vote measures preference among people who mostly cannot assess the technical risk.",
          "Personas address desirability. They tell you nothing about whether an integration will hold.",
          "Asking about satisfaction with something nobody has used produces speculation, not evidence.",
          ""],
        rationale: "A bounded technical spike directly tests the engineering uncertainty under relevant conditions.",
      },
      {
        id: "exploration-q3",
        moduleId: "exploration",
        prompt:
          "A solution is affordable to run and technically sound, but research has not established that anyone struggles with the problem it addresses. Which trade-off pair is this, and what is the risk?",
        options: [
          "All three lenses are satisfied",
          "Desirable + Feasible — risks misalignment with business priorities",
          "Feasible + Viable — risks not solving a genuine user problem",
          "Desirable + Viable — risks not being technically achievable"],
        answer: 2,
        optionNotes: [
          "Desirability is unevidenced, so the intersection has not been reached.",
          "Desirable + Feasible would mean the user need is validated. Here it is precisely what is missing.",
          "",
          "Desirable + Viable would again require a validated need. The description gives you sustainability and technical soundness only."],
        rationale:
          "Affordable to run plus technically sound is Feasible + Viable. It is the classic profile of an internally convenient solution that no user asked for.",
      },
      {
        id: "exploration-q4",
        moduleId: "exploration",
        prompt: "When is an A/B test the appropriate validation method?",
        options: [
          "When you need to test whether a legacy integration is achievable",
          "When you need to decide which idea stakeholders prefer",
          "When you need to understand why users behave a certain way",
          "When you need to compare the effect of variants on a measure at sufficient scale"],
        answer: 3,
        optionNotes: [
          "That is a technical spike. An A/B test needs a working implementation of both variants.",
          "Preference is not the question an experiment answers, and stakeholders are not the population under test.",
          "A/B tests measure difference, never explanation. Pair one with qualitative research if you need the why.",
          ""],
        rationale:
          "A/B and staged rollouts isolate the comparative effect of variants against a control. They need traffic volume and a working build, which is why they sit late in the validation sequence rather than early.",
      },
    ],
    scenarios: [
      {
        id: "exploration-s1",
        moduleId: "exploration",
        context:
          "The team believes SMS notifications will reduce calls, but policy limits the detail a message may contain and provider contact data may be stale.",
        prompt: "What is the best first test?",
        options: [
          "Test message comprehension, contact-data quality and operational handling with a small controlled cohort",
          "Ask executives whether they prefer SMS",
          "Choose email instead because it is cheaper",
          "Build the full integration"],
        answer: 0,
        optionNotes: [
          "",
          "Executive preference is not evidence about comprehension or data quality, which are the two live risks.",
          "Switching channel on cost grounds sidesteps the actual uncertainties, which apply to email as well.",
          "This spends the largest amount of money before answering the cheapest questions. Both risks named in the brief remain untested."],
        rationale:
          "It targets the highest-risk value, viability and data assumptions before major integration work — comprehension under the policy constraint, and whether the contact data can even reach people.",
      },
      {
        id: "exploration-s2",
        moduleId: "exploration",
        context:
          "A workshop generated 30 ideas. The team voted with dot stickers and the top-ranked idea is a chatbot. The two engineers present did not vote and have since said the required content simply does not exist in any structured form.",
        prompt: "What should happen next?",
        options: [
          "Discard the chatbot and take the second-ranked idea",
          "Treat the vote as an input, then evaluate the shortlist against the outcome and the three lenses, starting with the feasibility signal already raised",
          "Run the workshop again with a better voting method",
          "Proceed with the chatbot — it has the clearest mandate from the workshop"],
        answer: 1,
        optionNotes: [
          "Rank order from the same flawed process has the same problem. The method is the issue, not the winner.",
          "",
          "The problem is not the voting mechanism — it is treating any vote as the decision. A better-run vote produces a better-run guess.",
          "Popularity in a room is not evidence. A mandate from people who cannot assess feasibility is not a mandate."],
        rationale:
          "The deck separates idea generation from evaluation for exactly this reason. Engineers have already surfaced a feasibility risk; that is decision-relevant evidence and it outranks the sticker count.",
      },
    ],
    assignment: {
      title: "Design an assumption test",
      instruction: "Choose one proposed solution and design a small experiment that could genuinely change the decision.",
      prompts: [
        "What must be true for the solution to work?",
        "Which assumption is both uncertain and critical?",
        "What evidence will you collect, from whom, and what result would cause you to pivot?",
        "Which trade-off pair is your option currently sitting on, and what evidence do you therefore still owe?",
      ],
    },
  },

  /* ================================================================ *
   * STAGE 5 — Delivery, backlogs and roadmaps (deck slides 58–70)
   * ================================================================ */
  {
    id: "delivery",
    number: 5,
    title: "Delivery, backlogs and roadmaps",
    subtitle: "Translate outcomes into ordered, testable increments",
    minutes: 70,
    slides: "58–70",
    outcome:
      "Structure and refine a backlog to the level of detail DES expects, work within the sprint and Program Increment cadence, use prioritisation methods with judgement, and communicate direction without turning a roadmap into a false promise.",
    coreIdea:
      "Delivery is a learning system: order work toward a goal, release usable increments on a predictable cadence, measure the effect and adapt the plan.",
    sections: [
      {
        heading: "The backlog is an ordered model of current intent",
        body: "The Scrum Guide describes the Product Backlog as an emergent, ordered list and the single source of work for the Scrum Team. The deck adds the local reality: the backlog is owned and maintained by product management, can be added to by anyone in the team, is prioritised in order of value with priority set by product management, and changes as new work is identified.",
        bullets: [
          "Product Goal: the longer-term target the backlog emerges against.",
          "Product Backlog: what may improve the product, ordered as knowledge changes.",
          "Sprint Backlog: the Sprint Goal, the selected items and the developers' plan.",
          "Anyone may add; product management orders. Those are different rights and confusing them is a common failure.",
        ],
        sourceIds: ["scrum", "deck"],
      },
      {
        heading: "Levels exist to preserve traceability, not to create bureaucracy",
        body: "Epics, features and stories move a team from outcome to increment. Note that epics, features and Program Increments are not Scrum terms — they come from scaled frameworks and local practice, and their definitions vary between organisations. What follows is how the deck defines them for DES.",
        table: {
          caption: "Slides 60–63 — the DES backlog hierarchy",
          head: ["Level", "Horizon", "Definition"],
          rows: [
            [
              "Epic",
              "Many PIs, multiple teams",
              "A measurable business outcome. Maps directly to benefits in the business case, high-level requirements and significant pain points in the service blueprint.",
            ],
            [
              "Feature",
              "Within a PI, often multiple teams",
              "A smaller tangible outcome contributing to its epic. Should result in a demonstrable output each PI.",
            ],
            [
              "Story",
              "Within a sprint, one team",
              "A small slice a team can complete and validate. Written as: as a [persona] I want [goal] so that [reason].",
            ],
            ["Task", "Within a sprint", "The work breakdown beneath a story."],
          ],
        },
        sourceIds: ["deck", "scrum"],
      },
      {
        heading: "Minimum detail at each level",
        body: "The deck specifies what each backlog level must carry. This is the most directly operational content in the whole presentation — Area Path and Iteration Path are Azure DevOps fields, and getting them wrong is why work goes missing from a PI plan.",
        table: {
          caption: "Slides 61–63 — minimum detail",
          head: ["Level", "Required fields"],
          rows: [
            [
              "Epic",
              "Epic hypothesis; epic description; business outcomes and benefits; objective. Hypothesis-driven, expressed as the outcome delivered when the work is complete.",
            ],
            [
              "Feature",
              "Feature hypothesis; sizing estimate; acceptance criteria; in/out of scope; feature measurement (e.g. '30% reduction in processing time'); risks, issues and dependencies.",
            ],
            [
              "Story",
              "Story description in as-a/I-want/so-that form; story points; area path; iteration path aligned to the sprint in which delivery is expected.",
            ],
          ],
        },
        bullets: [
          "Every level carries a hypothesis or an outcome. None of them is a specification handed down.",
          "Feature measurement is not optional — it is how you find out whether the feature worked.",
          "Iteration path must align to the sprint the work is actually expected in, or PI reporting silently drifts.",
        ],
        sourceIds: ["deck"],
      },
      {
        heading: "The DES delivery cadence",
        body: "DES maintains a common planning and delivery cycle so teams synchronise. Two-week sprints deliver small increments of value; ten-week Program Increments deliver key business outcomes. Knowing this cadence is what makes the backlog levels meaningful — a feature is 'PI-sized' only because a PI is ten weeks.",
        table: {
          caption: "Slides 66–67 — cadence",
          head: ["Cycle", "Length", "Delivers"],
          rows: [
            ["Sprint", "2 weeks (10 working days)", "Small increments of releasable value"],
            ["Program Increment (PI)", "10 weeks (50 working days)", "Key business outcomes"],
          ],
        },
        bullets: [
          "The PI flow: business outcome → candidate features from the backlog → refinement → increment planning → delivery → measurement.",
          "Refinement confirms the detail, scope and feasibility of each feature before the increment starts.",
          "Five sprints fit inside a PI, which is why feature sizing and iteration paths have to be honest.",
        ],
        sourceIds: ["deck"],
      },
      {
        heading: "Discovery runs an increment ahead of delivery",
        body: "Continuous delivery relies on parallel streams. Product management works on discovery and solution exploration an increment in advance, while delivery teams build the features identified from the previous refinement cycle. The two streams share outcomes, people and feedback — otherwise you get a discovery function producing documents nobody builds.",
        bullets: [
          "Discovery for PI N+1 happens during delivery of PI N.",
          "Releases occur throughout, not only at PI boundaries.",
          "Operational data and research from live releases feed back into the opportunity and product backlogs.",
          "Continuous does not mean chaotic — it means the loops overlap on a known cadence.",
        ],
        sourceIds: ["deck", "cdh", "svpg"],
      },
      {
        heading: "Prioritisation is economic judgement made explicit",
        body: "Impact/effort and WSJF make trade-offs discussable; they do not manufacture certainty. SAFe defines WSJF as relative cost of delay divided by relative job duration or size. Scores should be relative, evidence-informed and revisited — prioritisation is not a one-off activity.",
        table: {
          caption: "Slide 64 — the WSJF components",
          head: ["Component", "Contributes to"],
          rows: [
            ["User and business value", "Cost of delay (numerator)"],
            ["Time criticality", "Cost of delay (numerator)"],
            ["Risk reduction and opportunity enablement", "Cost of delay (numerator)"],
            ["Job size or effort", "Denominator"],
          ],
        },
        bullets: [
          "WSJF = cost of delay ÷ job size. Higher score sequences earlier.",
          "Smaller valuable work often moves earlier because it creates learning and benefit sooner.",
          "Impact/effort quadrants: quick wins, big-ticket items, fill-in jobs, thankless tasks.",
          "Dependencies, safety, legislated mandates and confidence still require judgement over the score.",
        ],
        sourceIds: ["wsjf", "deck"],
      },
      {
        heading: "A roadmap communicates direction at the right confidence",
        body: "Outcome roadmaps emphasise objectives and key results over time horizons; feature roadmaps specify likely solution work against PIs. The deck shows both. Use Now/Next/Later or similar confidence bands where exact dates would imply certainty the evidence does not support.",
        bullets: [
          "Outcome roadmap: Now / Next / Later, each carrying objectives and their key results.",
          "Feature roadmap: PI X / PI Y, each carrying candidate features under an objective.",
          "The further out, the lower the confidence and the coarser the commitment should be.",
          "A dated 18-month feature list is a forecast presented as a promise.",
        ],
        sourceIds: ["deck", "svpg", "pichler"],
      },
    ],
    questions: [
      {
        id: "delivery-q1",
        moduleId: "delivery",
        prompt: "How does the Scrum Guide describe the Product Backlog?",
        options: [
          "An emergent, ordered list of what is needed to improve the product",
          "A release contract with stakeholders",
          "A fixed requirements baseline agreed at the start",
          "The Product Owner's private task list"],
        answer: 0,
        optionNotes: [
          "",
          "Treating the backlog as a contract is what produces the dated 40-item roadmap this stage warns about.",
          "'Emergent' is the opposite of a baseline. A frozen backlog cannot respond to what delivery teaches you.",
          "It is the single source of work for the whole Scrum Team, and anyone in the team may add to it."],
        rationale:
          "Ordered and emergent are deliberate: the backlog changes as the team learns and is not a frozen specification.",
      },
      {
        id: "delivery-q2",
        moduleId: "delivery",
        prompt: "In WSJF, a higher score generally indicates…",
        options: [
          "A guaranteed return on investment",
          "High relative cost of delay compared with job size",
          "The largest job",
          "The most senior sponsor"],
        answer: 1,
        optionNotes: [
          "WSJF sequences relative economic urgency. It forecasts nothing and guarantees less.",
          "",
          "Job size is the denominator — a larger job lowers the score, all else equal.",
          "Sponsorship is not a WSJF input. If it is driving your scores, the model is being used as cover."],
        rationale: "WSJF sequences relative economic urgency against relative duration or size. It is a comparative aid, not a guarantee.",
      },
      {
        id: "delivery-q3",
        moduleId: "delivery",
        prompt: "How long is a Program Increment in the DES cadence, and what is it meant to deliver?",
        options: [
          "2 weeks, delivering small increments of releasable value",
          "6 weeks, delivering a release candidate",
          "10 weeks, delivering key business outcomes",
          "12 weeks, delivering a completed epic"],
        answer: 2,
        optionNotes: [
          "That is the sprint: two weeks, ten working days, small increments of value.",
          "Six weeks is not part of the DES cadence.",
          "",
          "Epics span many PIs by definition, so no single PI is expected to complete one."],
        rationale:
          "DES runs two-week sprints inside ten-week PIs. Five sprints per PI is why features are sized to a PI and stories to a sprint.",
      },
      {
        id: "delivery-q4",
        moduleId: "delivery",
        prompt: "Which field is required on a feature but not on a story?",
        options: [ "Area path","Story points", "Iteration path", "In/out of scope and feature measurement"],
        answer: 3,
        optionNotes: [
          "Area path is a story-level field.",
          "Story points are a story-level field.",
          "Iteration path is a story-level field, aligning the story to the sprint it is expected in.",
          ""],
        rationale:
          "Features carry a hypothesis, sizing estimate, acceptance criteria, in/out of scope, feature measurement and risks/issues/dependencies. Feature measurement is the one most often skipped and the one that determines whether you learn anything.",
      },
      {
        id: "delivery-q5",
        moduleId: "delivery",
        prompt: "In the continuous discovery and delivery model, what is product management working on while teams deliver PI N?",
        options: [
          "Nothing — discovery pauses during delivery",
          "Acceptance testing for PI N",
          "Discovery and solution exploration for PI N+1",
          "The business case for the next financial year"],
        answer: 2,
        optionNotes: [
          "Pausing discovery during delivery is exactly the failure the parallel-stream model is designed to prevent.",
          "Acceptance sits with the delivery team and Product Owner within the increment.",
          "",
          "Business case work happens, but it is not what the parallel-stream model describes."],
        rationale:
          "Product management runs an increment ahead so that refined, validated features are ready when the next PI starts. Otherwise planning fills with unvalidated work.",
      },
    ],
    scenarios: [
      {
        id: "delivery-s1",
        moduleId: "delivery",
        context: "A six-month roadmap lists 40 dated features, but discovery has invalidated several underlying assumptions.",
        prompt: "What should the product manager do?",
        options: [
          "Stop publishing a roadmap until things are more certain",
          "Keep the dates to preserve stakeholder confidence",
          "Replace everything with an unprioritised idea list",
          "Reframe around outcomes and confidence bands, explain the evidence change and reorder the backlog"],
        answer: 3,
        optionNotes: [
          "Silence is read as drift. Stakeholders need direction and rationale more than they need dates.",
          "Confidence built on dates you know are wrong is a debt that comes due with interest at the first missed milestone.",
          "Removing order removes the strategy. Stakeholders lose the ability to see what matters most.",
          ""],
        rationale:
          "Transparency means updating the plan when evidence changes while preserving direction, rationale and stakeholder dialogue.",
      },
      {
        id: "delivery-s2",
        moduleId: "delivery",
        context:
          "At PI planning a team commits to eight features. Six have acceptance criteria and sizing; two are one-line titles with an executive's name attached. The PI is ten weeks and the team's historical throughput is five features.",
        prompt: "What is the strongest response?",
        options: [
          "Take the six refined features, and put the two unrefined items into refinement for the next PI while making the capacity gap explicit",
          "Split the two unrefined items into stories immediately so they can be committed",
          "Commit to the two sponsored items first since they have executive attention",
          "Commit to all eight and manage the shortfall later in the PI"],
        answer: 0,
        optionNotes: [
          "",
          "Decomposing an item that has no hypothesis, scope boundary or measurement produces detailed stories about an unvalidated idea.",
          "Sponsorship is not refinement. Committing unrefined work first maximises the chance the PI delivers the least validated thing in it.",
          "Committing to 60% more than throughput supports guarantees a shortfall. Managing it later means discovering it at week eight."],
        rationale:
          "Refinement exists to confirm detail, scope and feasibility before an increment starts. Two problems are live here — unrefined work and a capacity overcommitment — and both need naming rather than absorbing.",
      },
    ],
    assignment: {
      title: "Order a small backlog",
      instruction: "Choose five candidate items and make your trade-offs visible.",
      prompts: [
        "State the Product Goal or outcome they serve.",
        "Estimate relative value, urgency/risk reduction and size.",
        "Order the items, then explain one case where judgement should override the score.",
        "Take your top item and write it to the deck's minimum detail for its level — epic, feature or story.",
      ],
    },
  },

  /* ================================================================ *
   * STAGE 6 — Lifecycle and continuous learning (deck slides 71–74)
   * ================================================================ */
  {
    id: "lifecycle",
    number: 6,
    title: "Lifecycle and continuous learning",
    subtitle: "Connect discovery, delivery, release and improvement",
    minutes: 40,
    slides: "71–74",
    outcome:
      "Relate the product lifecycle to the DTA service design and delivery process, and explain why discovery and measurement continue after release.",
    coreIdea: "The lifecycle is a loop: discover problems, define solutions, deliver value, measure outcomes, iterate and improve.",
    sections: [
      {
        heading: "Solve the right problem; build the right thing; build it right",
        body: "These are linked responsibilities, not three isolated departments. Product, design and technology need shared context so that feasibility knowledge improves discovery and user evidence improves delivery. The deck frames the whole lifecycle as moving a service from 'need identified' to 'need met'.",
        sourceIds: ["deck", "svpg"],
      },
      {
        heading: "Government phases manage increasing confidence",
        body: "The DTA service design and delivery process moves through Discovery, Alpha and Beta/Live. Discovery understands users and constraints; Alpha explores and tests different ways to meet those needs; Beta builds and trials an accessible, secure service; Live sustains and improves it. Note the deck presents Beta and Live as a combined stage — this course separates them because the ownership question at go-live is where services most often fail.",
        table: {
          caption: "Slide 73 — DTA phases",
          head: ["Phase", "Purpose", "Typical evidence produced"],
          rows: [
            ["Discovery", "Understand users, policy intent and constraints", "Insights, problem statements, opportunities"],
            ["Alpha", "Explore and test several approaches", "Prototypes, validated or killed hypotheses"],
            ["Beta", "Build and trial an accessible, secure service", "Live usage under real conditions, performance data"],
            ["Live", "Operate and continue improving", "Ongoing performance, research and feedback"],
          ],
        },
        bullets: [
          "A phase is not permission to stop learning.",
          "The Digital Service Standard should be considered across the whole lifecycle, not at a single gate.",
          "Non-digital channels and end-to-end service impacts remain in scope throughout.",
        ],
        sourceIds: ["dss", "deck"],
      },
      {
        heading: "Continuous does not mean chaotic",
        body: "Teams can explore upcoming opportunities while delivering validated work, provided both streams share outcomes, people and feedback. Reviews, operational data and research continuously update the opportunity and product backlogs. The loop is: discover problems or opportunities, define solutions, deliver value, measure outcomes, iterate and improve.",
        sourceIds: ["deck", "cdh", "svpg"],
      },
    ],
    questions: [
      {
        id: "lifecycle-q1",
        moduleId: "lifecycle",
        prompt: "What is the primary job of Alpha in the government service process?",
        options: [
          "Operate the service indefinitely",
          "Explore and test different ways to meet user needs",
          "Freeze the requirements before build",
          "Complete procurement"],
        answer: 1,
        optionNotes: [
          "That is Live.",
          "",
          "Freezing requirements is the opposite of what Alpha is for — it exists to find out which approach works.",
          "Procurement may occur, but it is not the purpose of the phase."],
        rationale: "Alpha is for testing hypotheses and approaches before committing to the Beta service.",
      },
      {
        id: "lifecycle-q2",
        moduleId: "lifecycle",
        prompt: "When should product discovery stop?",
        options: [
          "It should continue as new evidence and needs emerge",
          "At the end of the Discovery phase",
          "When the business case is approved",
          "At first release"],
        answer: 0,
        optionNotes: [
          "",
          "The phase is named Discovery; it is not the only place discovery happens.",
          "Approval funds the work. It does not resolve the uncertainty in it.",
          "First release is where the most valuable evidence starts arriving, not where enquiry ends."],
        rationale: "The intensity and the questions change, but continuous improvement requires ongoing discovery and measurement.",
      },
      {
        id: "lifecycle-q3",
        moduleId: "lifecycle",
        prompt: "Which phase produces evidence about how the service behaves under real conditions with real users at scale?",
        options: [ "Alpha", "Beta", "None — that only happens after the project closes","Discovery"],
        answer: 1,
        optionNotes: [
          "Alpha tests approaches with prototypes. Useful, but not under real operating conditions.",
          "",
          "Waiting until after closure means nobody is funded or accountable to act on what is found.",
          "Discovery produces evidence about needs and constraints, before a service exists."],
        rationale:
          "Beta builds and trials an accessible, secure service with real users. It is the first point at which operational reality tests the design.",
      },
      {
        id: "lifecycle-q4",
        moduleId: "lifecycle",
        prompt: "The deck describes the product lifecycle as 'a continuous loop, not a linear process'. What does that imply for measurement?",
        options: [
          "Measurement should wait until the service is stable enough to give clean numbers",
          "Measurement is a closure activity that confirms benefits were realised",
          "Measurement feeds the next cycle of discovery and reprioritisation",
          "Measurement is only required where a business case claimed a benefit"],
        answer: 2,
        optionNotes: [
          "Waiting for clean numbers usually means waiting past the point where the finding could have changed anything.",
          "Measurement at closure informs a report. It cannot inform a decision, because the decisions are already made.",
          "",
          "Benefit claims set a floor for what must be measured, not a ceiling. Guardrails and user outcomes matter regardless."],
        rationale:
          "In a loop, measurement is an input to the next iteration: discover, define, deliver, measure, iterate. Treating it as a terminal reporting step breaks the loop.",
      },
    ],
    scenarios: [
      {
        id: "lifecycle-s1",
        moduleId: "lifecycle",
        context:
          "A service has moved to Live. The project team is disbanding and no owner has been assigned for performance, research or backlog decisions.",
        prompt: "What is the strongest response?",
        options: [
          "Wait for complaints to indicate where attention is needed",
          "Produce a more thorough closure report",
          "Accept this — Live means the work is finished",
          "Assign enduring ownership, measures and an improvement cadence before transition"],
        answer: 3,
        optionNotes: [
          "Complaints are a lagging, heavily filtered signal. Most users who fail simply stop.",
          "A closure report documents the past. It assigns nobody to the future.",
          "Live is the phase where the service meets the most users. Treating it as an endpoint is how accessibility and performance decay unnoticed.",
          ""],
        rationale:
          "A live service needs durable ownership and feedback loops; otherwise value, accessibility and operational quality decay invisibly.",
      },
      {
        id: "lifecycle-s2",
        moduleId: "lifecycle",
        context:
          "An Alpha tested three approaches. Two failed with users and one succeeded. The governance board asks the team to move all three into Beta so that no work is wasted.",
        prompt: "What should the product manager argue?",
        options: [
          "Move the successful option and archive the other two without discussion",
          "Agree — the development effort is already sunk and should be used",
          "Explain that Alpha's purpose is to eliminate approaches, and that carrying failed options into Beta converts learning into rework",
          "Move all three but resource the successful one more heavily"],
        answer: 2,
        optionNotes: [
          "The right decision, but taken silently. The board needs to see that Alpha worked — eliminating two options is a return on the investment, not a loss.",
          "Sunk cost is the fallacy the phase gate exists to interrupt. The money is spent either way; the only question is what happens next.",
          "",
          "Splitting resource across approaches that failed with users spreads the same mistake across a larger budget."],
        rationale:
          "Alpha exists to narrow the option space. Two eliminated approaches are the phase succeeding, and saying so out loud is what protects the next Alpha from the same pressure.",
      },
    ],
    assignment: {
      title: "Draw the evidence loop",
      instruction: "Map how evidence will flow through a real service after release.",
      prompts: [
        "What operational and user evidence will be observed?",
        "Who interprets it and makes backlog decisions?",
        "What cadence will connect learning to the next increment?",
        "Which phase is your service in, and what would have to be true to move to the next one?",
      ],
    },
  },
  /* ================================================================ *
   * STAGE 7 — Roles, teams and decision rights (deck slides 75–85)
   * ================================================================ */
  {
    id: "roles",
    number: 7,
    title: "Roles, teams and decision rights",
    subtitle: "Put accountability close to the evidence",
    minutes: 50,
    slides: "75–85",
    outcome:
      "Distinguish complementary product roles, name the surrounding delivery and governance roles, explain the product trio, and design decision rights across strategic, coordination and delivery layers.",
    coreIdea:
      "Strong product work is cross-functional. Role clarity should make collaboration and decisions easier — not create hand-offs between silos.",
    sections: [
      {
        heading: "Product manager and Product Owner are different horizons",
        body: "Organisations define these titles differently, and arguing about the definitions is usually a proxy for an unresolved accountability question. In the deck's model the two share a common objective but focus on different horizons.",
        table: {
          caption: "Slide 77 — the split",
          head: ["Product Manager", "Product Owner"],
          rows: [
            ["Vision", "Backlog management"],
            ["Strategy", "Story refinement"],
            ["Outcomes", "Acceptance criteria"],
            ["Roadmaps", "Sprint support"],
            ["Stakeholder alignment", "Clarifying requirements"],
          ],
        },
        bullets: [
          "The deck's two guiding questions: the PM asks 'are we working on the right things?'; the PO asks 'do teams have everything they need to deliver successfully?'",
          "Do not use titles as a substitute for explicit accountability.",
          "Avoid making the Product Owner a requirements courier.",
          "Avoid separating strategic discovery from the team that must deliver and operate the result.",
        ],
        sourceIds: ["deck", "scrum"],
      },
      {
        heading: "The trio combines product, design and technology",
        body: "A product trio brings viability, desirability and feasibility into the same discovery conversation — product manager (viable), designer (desirable), technology lead (feasible). It is a collaboration pattern, not a committee that replaces broader research, delivery and stakeholder expertise. The deck shows trios operating at all three organisational layers, not only in delivery teams.",
        sourceIds: ["cdh", "svpg", "deck"],
      },
      {
        heading: "Three layers, three questions",
        body: "The deck separates the organisation into strategic, coordination and delivery layers, each with its own question, scope and accountability. Escalate constraints, not every routine decision.",
        table: {
          caption: "Slides 82–85 — how the layers work together",
          head: ["Layer", "Its question", "Responsible for", "Typical work"],
          rows: [
            [
              "Strategic",
              "What future are we trying to create?",
              "Direction, user needs and service outcomes — the why",
              "Service strategy, cross-product experience, future service design, long-term technology direction, emerging user needs, organisational outcomes",
            ],
            [
              "Solution / coordination",
              "What should we deliver next?",
              "Translating strategy into roadmaps, priorities and features — the what and when",
              "Roadmaps, feature prioritisation, dependency management, exploring solution options, product-level outcomes, cross-team coordination",
            ],
            [
              "Tactical / delivery",
              "How do we successfully deliver this work?",
              "Design, build, test and release — the how and how much",
              "Refinement, sprint planning, story development, quality assurance, user validation, sprint showcases",
            ],
          ],
        },
        bullets: [
          "State who decides, who contributes evidence and who must be consulted.",
          "Place reversible, local decisions closest to the team.",
          "Reserve governance attention for material risk, investment and cross-service trade-offs.",
        ],
        sourceIds: ["deck", "svpg"],
      },
      {
        heading: "The roles around you",
        body: "Product managers in DES do not operate alone, and the deck names the surrounding structure explicitly. Knowing who owns what saves you from either escalating unnecessarily or making a decision that was never yours.",
        table: {
          caption: "Slides 79 and 92 — the wider delivery and governance structure",
          head: ["Role", "Layer", "Owns"],
          rows: [
            ["Senior Responsible Officer", "Governance", "The project outcomes, delivery roadmap, championing the change"],
            ["Senior Supplier", "Governance", "Supplier-side commitment and capability"],
            ["Project Board", "Governance", "Investment and material risk decisions"],
            ["Lead Delivery Manager", "Coordination", "Delivery across teams; removing systemic impediments"],
            ["Product Manager", "Coordination / strategic", "Outcomes, priorities, product direction"],
            ["Product Owner", "Delivery", "Building, curating and prioritising a refined, validated backlog"],
            ["UX Lead / Designers", "Solution", "User research, service and interaction design"],
            ["Solution Architect / Architects", "Solution", "Technical approach and integrity"],
            ["Scrum Master", "Delivery", "Team process, flow and impediment removal"],
            ["BAs, Developers, Testers", "Delivery", "Making working increments"],
          ],
        },
        sourceIds: ["deck"],
      },
    ],
    questions: [
      {
        id: "roles-q1",
        moduleId: "roles",
        prompt: "What is the product trio intended to achieve?",
        options: [
          "Approve every user story before development",
          "Separate discovery from delivery",
          "Replace stakeholder consultation",
          "Combine product, design and technology perspectives in discovery"],
        answer: 3,
        optionNotes: [
          "Approval gates are the opposite of the intent. The trio is for shaping options, not signing off tickets.",
          "It exists to connect them. Separating the two is the failure mode it addresses.",
          "The trio is a working pattern, not a substitute for the people who hold policy, operational and user expertise.",
          ""],
        rationale: "The trio improves cross-functional judgement about value, usability, feasibility and viability at the point options are shaped.",
      },
      {
        id: "roles-q2",
        moduleId: "roles",
        prompt: "Where should a reversible, team-local design decision usually sit?",
        options: [
          "With the delivery team closest to the evidence",
          "At the highest governance board",
          "With whichever stakeholder raises it most persistently",
          "Outside the product team entirely"],
        answer: 0,
        optionNotes: [
          "",
          "Board time is a scarce resource for material risk and investment. Spending it on reversible decisions delays everything else.",
          "Persistence is not authority. This is how decision rights are captured by whoever has the most availability.",
          "Removing the decision from the people with the relevant knowledge guarantees a slower and worse answer."],
        rationale:
          "Placing reversible decisions close to the relevant knowledge reduces delay while governance retains material risk and investment decisions.",
      },
      {
        id: "roles-q3",
        moduleId: "roles",
        prompt: "Which question belongs to the solution / coordination layer?",
        options: [
          "What future are we trying to create?",
          "What should we deliver next?",
          "How do we successfully deliver this work?",
          "Who approves the business case?"],
        answer: 1,
        optionNotes: [
          "That is the strategic layer.",
          "",
          "That is the tactical / delivery layer.",
          "Approval sits with governance and is not one of the three layer questions."],
        rationale:
          "The coordination layer translates strategy into roadmaps, priorities and features — it owns the what and the when, between the strategic why and the delivery how.",
      },
      {
        id: "roles-q4",
        moduleId: "roles",
        prompt: "In the deck's structure, who owns the project outcomes and champions the change?",
        options: [ "The Senior Responsible Officer", "The Lead Delivery Manager","The Product Manager", "The Scrum Master"],
        answer: 0,
        optionNotes: [
          "",
          "The Lead Delivery Manager owns delivery across teams, not the project outcomes themselves.",
          "The product manager owns product outcomes, priorities and direction — which is related but narrower, and sits below the SRO in the governance structure.",
          "The Scrum Master owns team process and impediment removal within a delivery team."],
        rationale:
          "The SRO owns the project outcomes, the delivery roadmap and championing the change. Knowing this matters because product decisions that alter the outcome need the SRO, not just the board.",
      },
    ],
    scenarios: [
      {
        id: "roles-s1",
        moduleId: "roles",
        context:
          "Designers research users, analysts write requirements and developers receive work months later. Each group says the others missed critical context.",
        prompt: "What structural change is most useful?",
        options: [
          "Add a more thorough hand-over document",
          "Create shared cross-functional discovery and refinement with clear decision rights",
          "Remove the user research step to shorten the chain",
          "Let each function maintain its own roadmap"],
        answer: 1,
        optionNotes: [
          "Better documentation reduces loss at a hand-off. It does not remove the hand-off, which is where the context is lost.",
          "",
          "The chain would be shorter and the output worse. Research is not the bottleneck; sequencing is.",
          "Three roadmaps is three strategies. This formalises the disagreement instead of resolving it."],
        rationale: "Shared work reduces information loss and lets design, product and technology shape viable options together.",
      },
      {
        id: "roles-s2",
        moduleId: "roles",
        context:
          "Your Product Owner is spending most of each sprint relaying questions between the delivery team and three business areas, and has no time for refinement. The backlog is filling with unrefined items and the team is starting sprints with unclear acceptance criteria.",
        prompt: "What is the underlying problem?",
        options: [
          "The Product Owner needs better time management",
          "The delivery team should be asking fewer questions",
          "The Product Owner has become a requirements courier, and decision rights have not been agreed with the business areas",
          "The role should be merged into the product manager position"],
        answer: 2,
        optionNotes: [
          "Treating a structural problem as a personal one guarantees it recurs with the next person in the seat.",
          "The questions are legitimate. They arise because nobody has been given authority to answer them.",
          "",
          "Merging the roles increases the load on one person without resolving where the answers are supposed to come from."],
        rationale:
          "The deck warns specifically against the Product Owner becoming a requirements courier. The fix is agreeing who can decide what — reversible and local decisions to the team, business rules with named owners and agreed response times.",
      },
    ],
    assignment: {
      title: "Clarify decision rights",
      instruction: "Choose one recurring product decision and make the accountability explicit.",
      prompts: [
        "Who owns the decision?",
        "Whose evidence or expertise must shape it?",
        "What threshold requires escalation, and what should remain with the team?",
        "Which layer does this decision actually belong to — strategic, coordination or delivery — and where is it being made now?",
      ],
    },
  },

  /* ================================================================ *
   * STAGE 8 — Product practice in government (deck slides 86–92)
   * ================================================================ */
  {
    id: "government",
    number: 8,
    title: "Product practice in government",
    subtitle: "Work with policy, assurance and delivery constraints without losing the outcome",
    minutes: 65,
    slides: "86–92",
    outcome:
      "Apply product principles inside DES ways of working and delivery phases, use the current Digital Service Standard accurately, distinguish it from internal governance, and protect inclusion, accessibility, security and service continuity.",
    coreIdea:
      "Government product practice combines user-centred evidence with public value, policy intent, stewardship, assurance and whole-of-service responsibility.",
    sections: [
      {
        heading: "Constraints are design inputs",
        body: "Policy intent, legislation, privacy, security, accessibility, records, procurement, funding and legacy systems shape the feasible solution space. Surface them early in discovery so they inform options rather than arriving as late-stage blockers.",
        bullets: [
          "A policy requirement is not automatically a user need.",
          "Compliance says what must be true; design still determines how people experience it.",
          "Whole-of-service outcomes include assisted and non-digital channels.",
        ],
        sourceIds: ["deck", "dss"],
      },
      {
        heading: "Ways of Working: behaviours and framework",
        body: "DES ways of working has two core elements. The behaviours describe how people are expected to operate; the Digital Delivery Framework is the end-to-end, repeatable delivery pipeline that ensures consistent practice.",
        bullets: [
          "We put user needs at the centre.",
          "We are accountable and take ownership for solving issues.",
          "We empower our people.",
          "We connect and work across boundaries.",
          "We do the basics brilliantly.",
          "We are innovative and contemporary.",
        ],
        sourceIds: ["deck"],
      },
      {
        heading: "The seven principles in practice",
        body: "These are the division's stated operating principles. Each one has an implication that changes what a product manager actually does — which is why they are worth knowing by number, not just by sentiment.",
        table: {
          caption: "Slides 88–89 — principles and their implications",
          head: ["#", "Principle", "What it means in practice"],
          rows: [
            [
              "1",
              "Start with the problem, not the solution",
              "Understand user needs, policy intent and root causes before committing to solutions. Discovery comes before build.",
            ],
            [
              "2",
              "Validate before you scale",
              "Reduce risk through prototypes, testing and incremental releases rather than a single large commitment.",
            ],
            [
              "3",
              "Deliver value early and often",
              "Prefer incremental delivery of valuable outcomes over large, infrequent releases.",
            ],
            [
              "4",
              "Decisions belong closest to the problem",
              "People with the greatest understanding of users and delivery realities make day-to-day decisions.",
            ],
            [
              "5",
              "Focus on outcomes, not outputs",
              "Measure success by value created, not volume of work completed. Outcomes over features, benefits over deliverables, value over activity.",
            ],
            [
              "6",
              "Design for the whole service",
              "Optimise the end-to-end experience rather than individual systems, projects or organisational silos. Reuse before rebuild.",
            ],
            [
              "7",
              "Learn continuously",
              "Discovery, validation and improvement continue throughout the life of a service.",
            ],
          ],
        },
        sourceIds: ["deck"],
      },
      {
        heading: "The four DES delivery phases",
        body: "DES has an agreed end-to-end delivery pipeline for all projects, divided into four phases with stage gates between them. This is the pipeline your work actually sits inside, and it is distinct from both the DTA service phases and the Digital Service Standard.",
        table: {
          caption: "Slides 90–91 — the DES pipeline",
          head: ["Phase", "Focus", "Product management contribution"],
          rows: [
            [
              "Pre-Approval",
              "Establishing the case for investment",
              "Problem definition, user evidence, outcome hypotheses, options and their risks",
            ],
            [
              "Pre-Delivery",
              "Planning with the right amount of detail; establishing the runway",
              "Refined backlog, validated approach, measures and baselines defined before build",
            ],
            [
              "Delivery",
              "Building and releasing increments",
              "Ordering the backlog, protecting the outcome, running discovery an increment ahead",
            ],
            [
              "Closure",
              "Transitioning and completing the project",
              "Handing over enduring ownership, measures and improvement cadence — not just documentation",
            ],
          ],
        },
        bullets: [
          "The stated purpose: projects are well planned with the right amount of detail, teams have a clear runway, there is a shared view of success, and stage gates build in quality and predictability.",
          "The product risk sits at Closure — a project closes, but the product does not.",
          "Do not confuse these four phases with the DTA's Discovery/Alpha/Beta/Live, or with the Digital Service Standard. They are three different things that coexist.",
        ],
        sourceIds: ["deck"],
      },
      {
        heading: "Use the current Digital Service Standard accurately",
        body: "Version 2.0 has 10 criteria, reduced from the former 13, and forms part of the Digital Experience Policy. It expects agile, user-centred work and consideration of the criteria across the service lifecycle. It is now fully in effect: it applied to new and redeveloped services from 1 July 2024, and to public-facing services that already existed before that date from 1 July 2025.",
        bullets: [
          "The standard covers accessibility, inclusion, security, trust, adaptability and measurement.",
          "Internal DES delivery phases can coexist with this external standard but should not be mistaken for it.",
          "Governance evidence should demonstrate how the criteria are being met, not merely that a template was completed.",
          "Staff-facing internal services sit outside the Phase 2 scope; check current DTA guidance before assuming applicability.",
        ],
        sourceIds: ["dss", "dsspdf"],
      },
      {
        heading: "Make governance a learning and risk conversation",
        body: "Strong gates examine evidence, unresolved risk, outcome confidence and readiness for the next investment — not only schedule and document completion. Product evidence can strengthen business cases and assurance decisions rather than competing with them.",
        bullets: [
          "Show what was learned and what changed as a result.",
          "Make residual assumptions and guardrails visible.",
          "Preserve a clear owner for benefits and service performance after project closure.",
          "A gate that only checks artefact completeness will approve a well-documented failure.",
        ],
        sourceIds: ["deck", "dss"],
      },
    ],
    questions: [
      {
        id: "government-q1",
        moduleId: "government",
        prompt: "Which statement about the Digital Service Standard Version 2.0 is correct?",
        options: [
          "It replaces internal departmental governance",
          "It contains 13 criteria",
          "It applies only during the Alpha phase",
          "It contains 10 criteria and should be considered across the service lifecycle"],
        answer: 3,
        optionNotes: [
          "It sits alongside internal governance. Both apply, and confusing them is a common source of duplicated or missed evidence.",
          "Thirteen was the former standard. Version 2.0 reduced it to 10.",
          "It is explicitly lifecycle-wide. Treating it as a single-phase checkpoint is the failure it was revised to prevent.",
          ""],
        rationale: "Version 2.0 reduced the former 13 criteria to 10 and explicitly encourages lifecycle-wide application.",
      },
      {
        id: "government-q2",
        moduleId: "government",
        prompt: "How should policy constraints enter product work?",
        options: [
          "They should be set aside during design and applied afterwards",
          "Only at final assurance",
          "As early discovery inputs that shape options and evidence",
          "As user needs, since they define what the service must do"],
        answer: 2,
        optionNotes: [
          "Designing without constraints produces options that cannot be built, and wastes the design effort.",
          "Late arrival is what turns a constraint into a blocker and forces rework.",
          "",
          "A policy requirement is not automatically a user need. Conflating them means never noticing when policy is creating the difficulty."],
        rationale:
          "Early involvement helps the team design within the real service and legal context and prevents late rework.",
      },
      {
        id: "government-q3",
        moduleId: "government",
        prompt: "Which are the four DES delivery phases, in order?",
        options: [
          "Initiation, Planning, Execution, Benefits Realisation",
          "Problem, Options, Build, Measure",
          "Discovery, Alpha, Beta, Live",
          "Pre-Approval, Pre-Delivery, Delivery, Closure"],
        answer: 3,
        optionNotes: [
          "Generic project phasing, not the DES pipeline.",
          "This resembles the product lifecycle loop rather than the delivery pipeline.",
          "That is the DTA service design and delivery process — a different framework that coexists with the DES pipeline.",
          ""],
        rationale:
          "DES divides its end-to-end pipeline into Pre-Approval, Pre-Delivery, Delivery and Closure, with stage gates between them. Keep it distinct from the DTA phases and from the Digital Service Standard.",
      },
      {
        id: "government-q4",
        moduleId: "government",
        prompt: "Principle 6 is 'design for the whole service'. Which decision best reflects it?",
        options: [
          "Considering the phone, paper and assisted channels alongside the digital journey, and reusing an existing capability rather than rebuilding",
          "Delivering the digital service first and addressing other channels in a later project",
          "Standardising the interface across all departmental systems",
          "Optimising the online form's completion rate as the primary measure"],
        answer: 0,
        optionNotes: [
          "",
          "Deferring other channels to a later project is how end-to-end problems become permanent, since the later project is rarely funded.",
          "Interface consistency is a usability concern. Whole-of-service is about the end-to-end journey across channels and systems.",
          "A single-channel measure can improve while the overall service worsens — for example by pushing failures to the phone queue."],
        rationale:
          "The principle optimises the end-to-end service experience rather than individual systems, projects or silos — and its stated implications include whole-of-service thinking and reuse before rebuild.",
      },
      {
        id: "government-q5",
        moduleId: "government",
        prompt: "Which product-management risk is concentrated in the Closure phase?",
        options: [
          "The backlog becomes too detailed",
          "The project closes without enduring ownership of the product's performance and improvement",
          "Stakeholders lose interest in the roadmap",
          "The team over-invests in discovery"],
        answer: 1,
        optionNotes: [
          "Backlog detail is a Pre-Delivery and Delivery concern.",
          "",
          "Attention does fade, but the structural risk is that nobody is accountable, not that nobody is interested.",
          "Over-investment in discovery is a Pre-Approval or Pre-Delivery risk, if it is one at all."],
        rationale:
          "A project closes; the product does not. Closure must hand over ownership, measures and an improvement cadence, or the service degrades with nobody accountable for noticing.",
      },
    ],
    scenarios: [
      {
        id: "government-s1",
        moduleId: "government",
        context:
          "The project has completed its templates, but research found a major accessibility barrier and the benefits measures have no baseline.",
        prompt: "What should the team present at the gate?",
        options: [
          "Present the evidence, remediation plan, missing baseline and impact on readiness before seeking the next investment",
          "Reclassify accessibility as a future enhancement",
          "Proceed on the basis that documentation is complete",
          "Defer the accessibility issue to Beta and proceed"],
        answer: 0,
        optionNotes: [
          "",
          "Accessibility is a legal and standard obligation and part of service quality. It cannot be reclassified as optional polish.",
          "This is precisely the failure mode the stage exists to describe: a gate that checks artefacts approves a well-documented failure.",
          "Deferral without a plan is the same decision as ignoring it, taken with better manners."],
        rationale:
          "Assurance should use evidence to make an informed risk and investment decision; accessibility is part of service quality, not optional polish. A missing baseline also means benefits cannot later be demonstrated.",
      },
      {
        id: "government-s2",
        moduleId: "government",
        context:
          "A policy area asks you to add a mandatory declaration screen. Research shows most users cannot tell what they are declaring, and the assisted channel already handles the same declaration verbally with a plain-language script.",
        prompt: "What is the strongest product response?",
        options: [
          "Decline, since research shows users do not understand it",
          "Meet the policy intent, but design the interaction using the evidence and the existing plain-language script, and measure comprehension",
          "Escalate to the Project Board for a decision",
          "Implement the screen as specified — the requirement is mandatory"],
        answer: 1,
        optionNotes: [
          "The obligation is real and cannot be declined. The question is how it is met, not whether.",
          "",
          "Board time is for material risk and investment. This is a design decision that belongs with the team and the policy owner.",
          "Compliance says what must be true; it rarely dictates the interaction. Implementing the specification literally satisfies the letter and fails the intent."],
        rationale:
          "A policy requirement is not automatically a user need, but nor is it optional. Compliance defines what must be true; design determines how people experience it — and the assisted channel has already solved the comprehension problem.",
      },
    ],
    assignment: {
      title: "Prepare an evidence-based gate brief",
      instruction: "Frame a decision for governance in one page.",
      prompts: [
        "What outcome and public value justify the work?",
        "What evidence supports the proposed direction and what remains uncertain?",
        "What risks, standards, guardrails and ownership conditions must be satisfied before proceeding?",
        "Which DES phase gate is this, and what specifically must be true to pass it?",
      ],
    },
  },

  /* ================================================================ *
   * STAGE 9 — Integration and capstone (deck slides 93–98)
   * ================================================================ */
  {
    id: "integration",
    number: 9,
    title: "Integration and capstone",
    subtitle: "Run the whole chain from need to measured value",
    minutes: 60,
    slides: "93–98",
    outcome:
      "Integrate the course into a defensible product approach and explain the reasoning to users, delivery partners, stakeholders and governance.",
    coreIdea:
      "Product management is a connected chain of decisions: need → problem → outcome → options → evidence → ordered delivery → measurement → learning.",
    sections: [
      {
        heading: "Maintain the chain of evidence",
        body: "Every major item should trace backward to an outcome and forward to a way of learning. If a feature cannot be connected to a user or service problem, an intended result and a measure, its priority is unclear. The deck's closing questions are the shortest version of this test: what problem are we solving, what outcome are we trying to create, what evidence do we have, and what have we learned?",
        sourceIds: ["deck", "svpg"],
      },
      {
        heading: "What good looks like",
        body: "The deck names six qualities. They are worth treating as a checklist for your own work rather than as a poster: outcome focused, user centred, evidence based, collaborative, adaptive, value driven.",
        bullets: [
          "Outcome focused: success is a measured change, not a delivered artefact.",
          "User centred: decisions are grounded in what users actually do.",
          "Evidence based: claims are traceable to something observed.",
          "Collaborative: product, design and technology shape options together.",
          "Adaptive: the plan changes when the evidence does.",
          "Value driven: work that does not move a result needs a different justification.",
        ],
        sourceIds: ["deck"],
      },
      {
        heading: "Tell the product story at three levels",
        body: "Executives need the outcome, evidence, investment and risk. Delivery teams need the problem context, goal, guardrails and near-term decisions. Users and operational partners need clear changes, support and feedback paths.",
        bullets: [
          "Keep one truth; adjust the depth, not the facts.",
          "Explain trade-offs and confidence honestly.",
          "Separate evidence, assumption and decision in the way you speak.",
        ],
        sourceIds: ["deck"],
      },
      {
        heading: "Reflection becomes practice",
        body: "Mastery comes from repeatedly making and explaining product decisions. The capstone uses the provider application-status case that runs through the source deck so you can practise the complete method, self-assess against a rubric, and export a reusable product brief.",
        bullets: [
          "The deck's reflection questions: what problem are you solving and is it the right one? How are you measuring success? What assumptions need validation? What feedback loops exist? How will you know you have delivered value?",
          "Retrieval and spacing are why this system makes you recall before it lets you reread.",
        ],
        sourceIds: ["deck", "retrieval", "spacing", "techniques"],
      },
    ],
    questions: [
      {
        id: "integration-q1",
        moduleId: "integration",
        prompt: "Which chain best represents product reasoning?",
        options: [
          "Workshop → roadmap → backlog",
          "Feature → deadline → launch",
          "Need → problem → outcome → options → evidence → delivery → measurement → learning",
          "Budget → requirements → closure"],
        answer: 2,
        optionNotes: [
          "Each of these is a real artefact, but the chain has no problem at the front and no measurement at the end.",
          "This is delivery without a rationale. It can be executed perfectly and still change nothing.",
          "",
          "This is a funding and assurance sequence. It manages the project, not the product."],
        rationale: "The full chain preserves the relationship between evidence, decisions, delivery and achieved value.",
      },
      {
        id: "integration-q2",
        moduleId: "integration",
        prompt: "What should change when presenting the product story to different audiences?",
        options: [ "The stated outcome","The underlying facts", "The evidence cited", "The level of detail and framing"],
        answer: 3,
        optionNotes: [
          "If the outcome changes by audience, there is no shared understanding of what the work is for.",
          "Changing the facts by audience is how organisations end up with three incompatible versions of the same project.",
          "The evidence should be consistent; how much of it you present can vary.",
          ""],
        rationale:
          "Different audiences need different depth, but the decision, evidence and outcome should remain consistent.",
      },
      {
        id: "integration-q3",
        moduleId: "integration",
        prompt: "A stakeholder asks why a highly requested feature is not on the roadmap. What is the strongest form of answer?",
        options: [
          "It was not in the approved scope",
          "It did not score highly enough in prioritisation",
          "The outcome it would serve is already better addressed by work in flight, and here is the evidence and the measure that would change that judgement",
          "The team does not have capacity this year"],
        answer: 2,
        optionNotes: [
          "Scope is a procedural answer to a value question. It also implies nothing can ever change, which is untrue.",
          "A score is the output of a judgement, not the justification for it. It invites an argument about the scoring instead of the substance.",
          "",
          "Capacity is true but incomplete. It implies the item would be next if resources appeared, which may not be the case."],
        rationale:
          "Traceability is what makes a prioritisation decision defensible. Naming the outcome, the evidence and the condition under which you would change your mind turns a refusal into a shared model.",
      },
      {
        id: "integration-q4",
        moduleId: "integration",
        prompt:
          "Which of the deck's six 'what good looks like' qualities is most directly at risk when a team keeps a dated plan after the evidence has changed?",
        options: [ "Value driven","User centred", "Collaborative", "Adaptive"],
        answer: 3,
        optionNotes: [
          "Value drive is about justifying work by results. Related, but the direct failure here is the refusal to change.",
          "User-centredness is about grounding decisions in user evidence. It may also suffer, but it is not what a frozen plan primarily violates.",
          "Collaboration concerns how options are shaped, not how plans respond to evidence.",
          ""],
        rationale:
          "Adaptive means the plan changes when the evidence does. Holding a dated plan to protect stakeholder confidence is the specific failure this quality names.",
      },
    ],
    scenarios: [
      {
        id: "integration-s1",
        moduleId: "integration",
        context:
          "A pilot improves self-service overall, but increases unsuccessful attempts among users relying on assistive technology.",
        prompt: "Which response demonstrates the strongest product judgement?",
        options: [
          "Treat the accessibility result as a critical guardrail failure, investigate the cause and adapt before scaling",
          "Report the aggregate figure and address the detail in a later release",
          "Declare success because the average improved",
          "Cancel the product permanently"],
        answer: 0,
        optionNotes: [
          "",
          "Reporting the aggregate while knowing the disaggregated result is misleading by omission, and it scales the harm in the meantime.",
          "An average can improve while a specific group is actively harmed. This is exactly what guardrails exist to surface.",
          "The evidence supports adaptation, not abandonment. Most of the intervention is working."],
        rationale:
          "Outcomes must not hide distributional harm. The evidence should change the scaling decision and the next experiment.",
      },
      {
        id: "integration-s2",
        moduleId: "integration",
        context:
          "You have ten minutes with the SRO before a board meeting. Delivery is on schedule, but discovery has shown the primary outcome measure will probably not move because the root cause sits in a policy process outside your control.",
        prompt: "What do you lead with?",
        options: [
          "Delivery status, since that is what the board reports on",
          "The outcome risk, the evidence behind it, and the decision you need — with the schedule position as context",
          "A request to change the outcome measure to one the project can influence",
          "Nothing yet — wait until the measurement confirms it after release"],
        answer: 1,
        optionNotes: [
          "Leading with green delivery status when you know the outcome is at risk trains the board to trust a signal that is not measuring the thing that matters.",
          "",
          "Changing the measure to one you can move is how a project reports success while the problem persists. It also destroys the baseline.",
          "Waiting until after release means raising it when the decision can no longer be influenced and the cost is sunk."],
        rationale:
          "Executives need outcome, evidence, investment and risk. The chain of evidence is only useful if you are willing to report the link that is breaking — and the SRO owns the project outcomes, so this is precisely their decision.",
      },
    ],
    assignment: {
      title: "Complete the capstone brief",
      instruction:
        "Use the dedicated Capstone workspace to produce an end-to-end product approach for the provider application-status case.",
      prompts: [
        "Can every proposed action trace to evidence and an outcome?",
        "Are the riskiest assumptions explicit and testable?",
        "Would a delivery team and a governance board understand what happens next and why?",
        "Which of the deck's six qualities is weakest in your brief, and what would fix it?",
      ],
    },
  },
];

/* ------------------------------------------------------------------ *
 * Derived collections
 * ------------------------------------------------------------------ */

import { supplementaryQuestions } from "./reference";

export type PracticeQuestion = Question & { context?: string };

/** Every question that can appear in mixed practice. */
export const practiceQuestions: PracticeQuestion[] = modules.flatMap((module) => [
  ...module.questions,
  ...module.scenarios.map((scenario) => ({
    id: scenario.id,
    moduleId: scenario.moduleId,
    prompt: scenario.prompt,
    options: scenario.options,
    answer: scenario.answer,
    rationale: scenario.rationale,
    optionNotes: scenario.optionNotes,
    /** Scenarios keep their setup so mixed practice still reads correctly. */
    context: scenario.context,
  })),
]).concat(
  // Supplementary items deepen mixed practice without lengthening the stage
  // quizzes, so the 75% mastery threshold keeps its meaning.
  supplementaryQuestions,
);

export const totalMinutes = modules.reduce((sum, module) => sum + module.minutes, 0);
export const totalQuestions = practiceQuestions.length;

/**
 * The pool a stage's knowledge check samples from.
 *
 * Previously the check rendered `module.questions` directly, so every retake
 * showed the identical 4-5 items in the identical order — which tested memory
 * of which option was right rather than the idea, on the one surface where
 * retaking matters most (75% unlocks the Recall requirement).
 */
export function quizPoolFor(moduleId: string): Question[] {
  const module = modules.find((item) => item.id === moduleId);
  if (!module) return [];
  return [...module.questions, ...supplementaryQuestions.filter((q) => q.moduleId === moduleId)];
}

export function findModule(id: string): Module | undefined {
  return modules.find((module) => module.id === id);
}

export function findSource(id: string): Source | undefined {
  return sources.find((source) => source.id === id);
}
