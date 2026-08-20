/**
 * Closure Reports — course content.
 *
 * The second training package, and the first one not built from a slide deck.
 * Its spine is the Commonwealth assurance and performance framework: the
 * Gateway Gate 6 closure review, the PGPA Act performance requirements, and
 * the benefits-management practice the Department of Finance and the ANAO
 * both assess against.
 *
 * Deliberately not a template-filling course. Closure reports are written
 * badly for a structural reason — they are produced by the people with the
 * least incentive to be candid, at the moment they have the least time, about
 * a thing everyone has already moved on from. The course is built around that
 * problem rather than around the document.
 */

import type { Module, Source } from "./course";

export const CLOSURE_REVIEWED = "16 August 2026";

export const closureSources: Source[] = [
  /*
    The departmental documents come first because they are what a DEWR project
    is actually closed against. An earlier version of this course was built on
    the DTA standard, which is sound and is not the document anyone here opens.
    The DTA material is retained below as a comparator, clearly labelled.
  */
  {
    id: "dewr-template",
    title: "Project Closure Report Template",
    publisher: "DEWR / Portfolio Project Office — internal, Project Management Hub",
    note: "The full template, for Tier 1 and Tier 2 projects. Document Control and Key Project Contacts, then fifteen numbered sections ending in a Lessons Learned table of eighteen fixed categories, each split into Strengths and Areas to improve. Every section is retained even when it does not apply — you justify the omission in place rather than deleting the heading. This is the spine of this course.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "dewr-tier3",
    title: "Project Closure Report — Tier 3",
    publisher: "DEWR / Portfolio Project Office — internal, pilot",
    note: "A simplified form for Tier 3 projects, released for testing in July 2026 and still gathering feedback, so treat the detail as current rather than settled. Nine table blocks rather than numbered sections, an overall Achieved / Partially achieved / Not achieved status, and a seven-area assessment grid with fixed rating scales. Feedback goes to the Portfolio Project Office.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "dewr-factsheet",
    title: "Project Closure Factsheet",
    publisher: "DEWR / Portfolio Project Office — internal",
    note: "What closure is, the six activities that constitute it, what the Senior Responsible Officer is accountable for, and a fifteen-item checklist across six categories. This is the process the report is the artefact of, and it is the part most people skip.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "dewr-announcement",
    title: "Project Closure Reports and when they need to be completed",
    publisher: "DEWR / Portfolio Project Office — internal announcement, 3 July 2026",
    note: "States plainly that a project cannot formally close without a completed closure report, lists what the report confirms, and sets out where it goes: the group Project Management Office and the Portfolio Project Office. The PPO does not review reports for approval or compliance — it aggregates them for trends and enterprise reporting.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "aga-standard",
    title: "Project closure reporting standard for digital and ICT-enabled projects",
    publisher: "Australian Government Architecture / Digital Transformation Agency",
    url: "https://architecture.digital.gov.au/standard/project-closure-reporting-standard-digital-and-ict-enabled-projects",
    note: "Comparator, not the spine. The whole-of-government standard for digital and ICT-enabled closure reports: seven criteria, each self-assessed Strong, Emerging or Nil. Useful for judging whether a report is good rather than merely complete, and it is what a DEWR digital project would be measured against outside the department.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "aga-templates",
    title: "Digital project closure report templates",
    publisher: "Australian Government Architecture / Digital Transformation Agency",
    url: "https://architecture.digital.gov.au/design/digital-project-closure-report-templates",
    note: "Comparator. The DTA's own templates, built with the ATO — one for Tier 1 and Tier 2, one for Tier 3. The tiering language matches DEWR's; the sections do not. Use the departmental template.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "rmg106",
    title: "Guidance on the Assurance Reviews Process (RMG 106)",
    publisher: "Australian Government / Department of Finance",
    url: "https://www.finance.gov.au/publications/resource-management-guides/guidance-assurance-reviews-process-rmg-106",
    note: "The operating guidance for Gateway. Defines the gates, including Gate 6 (Benefits Realisation), and what a Senior Responsible Officer is accountable for at each.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "gateway",
    title: "Gateway Reviews Process",
    publisher: "Australian Government / Department of Finance",
    url: "https://www.finance.gov.au/government/assurance-reviews-and-risk-assessment/gateway-reviews-process",
    note: "Scope and thresholds: $30m for procurement or infrastructure, $30m where the ICT component is at least $10m, $50m for programs. Applies to non-corporate Commonwealth entities.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "lessons",
    title: "Gateway Review Process — Lessons Learned",
    publisher: "Australian Government / Department of Finance",
    url: "https://www.finance.gov.au/publications/lessons-learned/gateway-review-process-lessons-learned-first-edition",
    note: "Aggregated observations across Australian Government Gateway reviews. The closest thing the Commonwealth has to published reference-class data on why delivery goes wrong.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "closure",
    title: "Project closure — Financial Statements Better Practice Guide",
    publisher: "Australian Government / Department of Finance",
    url: "https://www.finance.gov.au/government/financial-reporting-and-accounting-policy/financial-statements-better-practice-guide/12-project-closure",
    note: "The financial-side expectations at closure: costs finalised, assets recognised, obligations settled or transferred.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "rmg134",
    title: "Annual performance statements for Commonwealth entities (RMG 134)",
    publisher: "Australian Government / Department of Finance",
    url: "https://www.finance.gov.au/government/managing-commonwealth-resources/annual-performance-statements-commonwealth-entities-rmg-134",
    note: "Where closure evidence ends up. Performance statements are audited, so a claim made at closure can be tested a year later.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "anao-perf",
    title: "Reporting Meaningful Performance Information",
    publisher: "Australian National Audit Office",
    url: "https://www.anao.gov.au/work/insights/reporting-meaningful-performance-information",
    note: "The auditor's view of what makes a performance claim meaningful rather than merely reported. Useful as the standard a closure report is written to survive.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "anao-gateway",
    title: "Administration of the Gateway Review Process",
    publisher: "Australian National Audit Office",
    url: "https://www.anao.gov.au/work/performance-audit/administration-the-gateway-review-process",
    note: "Performance audit of Gateway itself, including how consistently review recommendations are acted on after the review closes.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "archives",
    title: "Archives Act 1983 and records authorities",
    publisher: "National Archives of Australia",
    url: "https://www.naa.gov.au/information-management/records-authorities/types-records-authorities",
    note: "Records authorities give permission to destroy, retain or transfer Commonwealth records and set minimum retention periods. Destruction without authority is unauthorised however it happens.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "naa-data",
    title: "Retaining, managing and disposing of data and datasets",
    publisher: "National Archives of Australia",
    url: "https://www.naa.gov.au/information-management/disposing-information/retaining-managing-and-disposing-data-and-datasets",
    note: "Data held in business systems is a Commonwealth record. Access must be maintained for the prescribed period, and migration to a new system does not discharge the obligation.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "cprs",
    title: "Commonwealth Procurement Rules",
    publisher: "Australian Government / Department of Finance",
    url: "https://www.finance.gov.au/government/procurement/buying-australian-government/commonwealth-procurement-rules",
    note: "The procurement framework the contract sits inside. Relevant at closure for final acceptance, warranty and defects liability, retentions, and obligations that survive termination.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "teal",
    title: "Benefits management — Government Project Delivery (Teal Book)",
    publisher: "UK Government / Infrastructure and Projects Authority",
    url: "https://projectdelivery.gov.uk/teal-book/home/part-e-planning-and-control/chapter-19-benefits-management/",
    note: "Comparator practice. Benefits management as a whole-of-lifecycle discipline owned by the business, not a closure-time activity owned by the project.",
    checked: CLOSURE_REVIEWED,
  },
];

/* ------------------------------------------------------------------ *
 * Stages
 * ------------------------------------------------------------------ */

/*
 * Definitions. Order here is irrelevant — see CLOSURE_ORDER below.
 *
 * `number` drives the stage colour, the sidebar, and next-stage navigation
 * (`item.number === module.number + 1`), so it has to be contiguous from 1.
 * Maintaining it by hand while inserting stages is how you get two stage 5s
 * and a curriculum that cannot be navigated past them, so it is derived.
 */
const closureModuleDefs: Module[] = [
  {
    id: "purpose",
    number: 1,
    title: "What closure is actually for",
    subtitle: "Accountability and learning, not administration",
    minutes: 0,
    slides: "",
    outcome: "Explain who reads a closure report, what decision it informs, and why most are written to be filed rather than read.",
    coreIdea:
      "A project is not formally closed until its closure report is approved, which makes this the document that ends the project rather than one that describes it. It is also the first piece of evidence about whether the investment was worth making. Writing it well means working against the moment: the people who know most are dispersing, and the document is due when time is shortest.",
    sections: [
      {
        heading: "Why this document is hard to write well",
        body: "Writing one of these well is harder than it looks, and the difficulty is structural rather than personal. Closure reports are produced at the point where the delivery team is dispersing, the funding has stopped, the sponsor has moved to the next thing, and nobody who will live with the result is in the room. The person holding the pen is usually the project manager, whose professional reputation is the subject of the document. No template solves that on its own, which is why the rest of this course is about the habits that do.",
        bullets: [
          "Written last, by the people with the least time and the most exposure.",
          "Read — if at all — by people who were not there and cannot check the claims.",
          "Approved by a sponsor whose own record is being described.",
          "Filed somewhere that the next project team will not search.",
        ],
        example:
          "A closure report states 'the project delivered all agreed scope within the revised budget'. Every word is true. The budget was revised twice, upward, and the scope was reduced at the second revision. Nothing has been falsified and nothing useful has been said.",
        sourceIds: ["lessons", "anao-gateway"],
      },
      {
        heading: "Who the audiences actually are",
        body: "Writing well requires knowing who is on the other end. A closure report has at least four distinct readers with incompatible needs, and a report that tries to serve all of them with one register serves none of them. The fix is structural: separate what happened from what it cost, from what it achieved, from what to do differently.",
        table: {
          caption: "Four readers, four questions",
          head: ["Reader", "What they need to decide", "What they do with a vague report"],
          rows: [
            ["Senior Responsible Officer", "Whether benefits are on track and who now owns them", "Signs it, because nothing in it is contestable"],
            ["Finance / CFO", "Whether costs are final and assets correctly recognised", "Chases the numbers separately, ignores the narrative"],
            ["The next project team", "What to do differently, with specifics", "Never finds it, repeats the failure"],
            ["ANAO or internal audit", "Whether claims made are supported by evidence", "Tests the claim anyway, and finds the gap"],
          ],
        },
        sourceIds: ["rmg106", "anao-perf"],
      },
      {
        heading: "A project cannot formally close without one",
        body: "This is the rule that makes the document unavoidable. Under the department's Project, Program and Portfolio Management Framework, a project or program is not formally closed until a closure report has been completed and approved. The report is not a courtesy or a write-up; it is the instrument that ends the project.",
        bullets: [
          "Approved by the Senior Responsible Officer, and endorsed by the Project Board where required.",
          "Submitted to your group Project Management Office and to the Portfolio Project Office.",
          "The tier sets which template applies: the full fifteen-section form for Tier 1 and Tier 2, a simplified form for Tier 3.",
          "Lessons go to the Departmental Lessons Learned Register, which is a separate destination from the report itself.",
        ],
        example:
          "Because the report is what closes the project, an unfinished report is an open project — still carrying its governance, its reporting obligations and its budget line, long after the team has gone.",
        sourceIds: ["dewr-announcement", "dewr-factsheet"],
      },
      {
        heading: "What the report has to confirm",
        body: "The department states what a closure report establishes. Read it as the specification for the document: seven things, each of which some later section has to evidence.",
        table: {
          caption: "What the report confirms, and where this course covers it",
          head: ["The report confirms", "Covered in"],
          rows: [
            ["Performance against scope, schedule, cost, quality and risk tolerances", "Stages 5 and 6"],
            ["Delivery of project outcomes and transition to business as usual", "Stage 8"],
            ["Achievement of key milestones and deliverables", "Stages 5 and 6"],
            ["Benefits realised, and ongoing ownership of benefits", "Stage 7"],
            ["Financial performance against the approved budget", "Stage 10"],
            ["Lessons learned and recommendations for future projects", "Stage 11"],
            ["Formal approvals and closure by the Senior Responsible Officer", "Stage 3"],
          ],
        },
        example:
          "Note what is not on the list: whether the project succeeded. Every item is about establishing a position and transferring it to someone. A project that fell short and says so precisely satisfies the specification; one that succeeded and cannot evidence it does not.",
        sourceIds: ["dewr-announcement"],
      },
      {
        heading: "Larger projects get an external review as well",
        body: "Departmental closure is one regime. Above certain values a Commonwealth project also faces the Department of Finance's Gateway Review Process — independent checkpoints numbered Gate 0 to Gate 6, the last of which reviews benefits realisation. It applies alongside the departmental process rather than instead of it, and only above the thresholds, so most projects never meet it.",
        bullets: [
          "Thresholds for non-corporate Commonwealth entities: $30m procurement or infrastructure, $30m where the ICT component is at least $10m, $50m for programs.",
          "Gate 6 assesses whether the investment delivered its purpose and benefits — not whether the scope was built.",
          "It looks for benefits that are identified, owned, and still being measured after the team has gone.",
          "The Senior Responsible Officer is accountable at the gate, as they are for departmental closure.",
        ],
        example:
          "The question a Gate 6 review asks is the same one the departmental benefits section asks: who owns this benefit in eighteen months. If the answer is 'the project', there is no answer.",
        sourceIds: ["gateway", "rmg106"],
      },
      {
        heading: "What good looks like",
        body: "A closure report worth writing does three things: it states what was promised in the original terms, it separates what is now known from what is still assumed, and it names a person for every commitment that outlives the project. Everything else in this course is machinery for those three.",
        bullets: [
          "Baseline stated as originally approved, with every revision shown as a revision.",
          "Claims marked as measured, estimated or asserted — and the difference visible.",
          "Every residual risk, benefit and obligation has a named owner who has agreed to it.",
        ],
        sourceIds: ["anao-perf", "teal"],
      },
      {
        heading: "Closure is assembled, not written",
        body: "The single change that most improves a closure report is starting it in month two. Almost everything it needs — the original baseline, the estimate against the actual, why an option was abandoned, what the vendor actually said — is easy to record at the time and expensive or impossible to reconstruct later. Treating closure as a document you sit down to write guarantees you will be writing it from memory, at the worst moment, about the things you remember rather than the things that mattered.",
        bullets: [
          "Keep the original approved baseline somewhere it cannot be edited when the plan is revised.",
          "Record each estimate at the point it is made, so estimate-versus-actual exists without archaeology.",
          "Note surprises when they happen, in one line with a date. Shape them into lessons at closure.",
          "Capture the benefit measurement definition when the measure is designed, not when it is reported.",
          "Ask at each governance point who will own each benefit after go-live. The answer changes, and the changes are informative.",
        ],
        example:
          "A team that keeps a single running file — baselines, estimates, surprises, ownership answers — writes its closure report in two days from evidence. A team that does not spends two weeks producing something weaker, and will not be able to answer the auditor eighteen months later.",
        sourceIds: ["rmg106", "lessons"],
      },
    ],
    questions: [
      {
        id: "cl-p1",
        moduleId: "purpose",
        prompt: "Why are closure reports structurally prone to being uninformative?",
        options: [
          "The author's own record is the subject, when candour costs most",
          "They are too long for senior readers to work through properly",
          "The templates in use across the Commonwealth are inconsistent",
          "Project managers are not trained in formal report writing",
        ],
        answer: 0,
        rationale:
          "The problem is incentive and timing, not skill or format. The author's record is the subject, the team is dispersing, and the reader cannot verify. Better templates do not change any of those.",
        optionNotes: [
          "",
          "Length is a symptom at most. A short uninformative report is just as useless.",
          "Template inconsistency is real and largely irrelevant — consistent templates still get filled in vaguely.",
          "Plenty of well-written closure reports say nothing testable. Writing skill is not the constraint.",
        ],
      },
      {
        id: "cl-p2",
        moduleId: "purpose",
        prompt: "A program has a total cost of $46m, of which the ICT component is $8m. On the financial thresholds alone, is it in scope for Gateway?",
        options: [
          "Yes — it exceeds neither ICT test but is a program under the program threshold of $50m... no, it is below that threshold",
          "Yes, because any program over $30m is captured",
          "No on the ICT test, and no on the program threshold — $46m is below $50m",
          "Yes, because the ICT component exceeds $5m",
        ],
        answer: 2,
        rationale:
          "Programs are captured above $50m; this is $46m. The $30m-with-$10m-ICT test is a projects test and the ICT component here is $8m in any case. Note that Finance may still recommend a review for a high-risk proposal — the thresholds are a trigger, not a ceiling.",
        optionNotes: [
          "This option contradicts itself and lands on the wrong answer.",
          "The $30m figure is the projects threshold, not the programs threshold.",
          "",
          "There is no $5m ICT test. The ICT figure is $10m, and it sits alongside a $30m project total.",
        ],
      },
      {
        id: "cl-p3",
        moduleId: "purpose",
        prompt: "What does a Gate 6 review primarily assess?",
        options: [
          "Whether the investment delivered its purpose and benefits, and who owns them",
          "Whether the agreed scope was delivered within the revised budget and schedule",
          "Whether the project followed the entity's approved delivery methodology",
          "Whether the financial statements correctly recognise the resulting assets",
        ],
        answer: 0,
        rationale:
          "Gate 6 is the Benefits Realisation gate. Scope, method and asset recognition all matter elsewhere; the gate exists to test whether the investment achieved its purpose and whether benefit harvesting survives closure.",
        optionNotes: [
          "",
          "Scope against revised budget is the question a project reports on itself. Gate 6 exists because that question is not sufficient.",
          "Methodology compliance is an internal assurance matter, not the purpose of Gate 6.",
          "Asset recognition is a Finance and financial-statements concern, covered in the closure guidance rather than the gate.",
        ],
      },
      {
        id: "cl-p4",
        moduleId: "purpose",
        prompt: "Which reader is most poorly served by a closure report that describes activity rather than outcome?",
        options: [
          "The next project team, who need specifics and get generalities",
          "The Senior Responsible Officer, who needs a document to sign",
          "The Chief Financial Officer, who needs final cost figures",
          "Internal audit, who need to confirm the report exists",
        ],
        answer: 0,
        rationale:
          "The SRO can sign a vague report and the CFO can get numbers elsewhere. The next team is the only reader whose entire need is the specific, transferable detail that activity-description omits — and they are the reader nobody writes for.",
        optionNotes: [
          "",
          "A vague report is easier to sign, not harder. This reader is served, badly but comfortably.",
          "Cost figures are obtainable from the ledger regardless of the narrative quality.",
          "Audit tests claims rather than confirming existence, and will find the gap by other means.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-p-s1",
        moduleId: "purpose",
        context:
          "You are asked to review a draft closure report for a $60m program. It states: 'The program achieved its objectives, delivering improved service outcomes for participants within the approved funding envelope.' The funding envelope was increased by $9m in year two. Participant outcome measures were never baselined.",
        prompt: "What is the single most serious problem with that sentence?",
        options: [
          "It makes an outcome claim that cannot be tested, with no baseline",
          "It describes the funding envelope as approved when it was increased mid-program",
          "It uses vague language such as 'improved service outcomes'",
          "It does not name the officers responsible for delivery",
        ],
        answer: 0,
        rationale:
          "The revision and the vagueness are both real faults, and both are fixable by editing. The missing baseline is not: without it, no version of this sentence can be substantiated, and an audit that tests the claim will find nothing behind it. Unmeasurable claims are the failure that cannot be written around.",
        optionNotes: [
          "",
          "A genuine problem, and a presentational one — the revision can simply be disclosed.",
          "Vagueness is a symptom here. Sharpening the words without a baseline just makes an untestable claim more specific.",
          "Naming officers is good practice but does not affect whether the claim can be substantiated.",
        ],
      },
      {
        id: "cl-p-s2",
        moduleId: "purpose",
        context:
          "A delivery team is disbanding in three weeks. The project manager proposes writing the closure report after the team has gone, 'when things are calmer and we can be objective about it'.",
        prompt: "What is the strongest argument against waiting?",
        options: [
          "The undocumented detail leaves with the people, and that is the transferable part",
          "Departmental policy requires closure reports to be submitted before team release",
          "The project manager will be less objective later, not more",
          "Delaying makes it harder to finalise costs in the correct financial year",
        ],
        answer: 0,
        rationale:
          "Objectivity may well improve with distance. What does not survive is the specific, unwritten knowledge — why an approach was abandoned, what the vendor actually said, which assumption broke first. That is precisely the reference-class detail the next team needs, and it walks out of the building with the people.",
        optionNotes: [
          "",
          "Policy varies by entity, and an argument from policy does not explain why the policy is right.",
          "Distance usually helps objectivity. This argues the opposite of the likely truth.",
          "A real administrative concern, but costs can be finalised without the narrative.",
        ],
      },
    ],
    assignment: {
      title: "Name the four readers",
      instruction:
        "Take a piece of work you know that has finished or is finishing. Write down, for each of the four readers, the specific decision they would make with its closure report — and what they would actually do if the report were vague.",
      prompts: [
        "Senior Responsible Officer — the decision, and the fallback if the report is vague",
        "Finance — the decision, and the fallback",
        "The next delivery team — the decision, and the fallback",
        "Audit — the decision, and the fallback",
      ],
      criteria: [
        "Each decision is specific to this piece of work, not generic to closure reports",
        "Each fallback names what the reader does instead, not merely that they are dissatisfied",
        "At least one reader is identified as unable to obtain the information any other way",
      ],
      modelAnswer:
        "SRO: decides whether to stand down the benefits governance board. If vague, keeps it running for another six months at cost, or quietly lets it lapse with nobody noticing. Finance: decides what to capitalise and what to expense. If vague, goes to the ledger and the asset register directly and ignores the report entirely. Next team: decides whether to reuse the same vendor integration pattern. If vague, cannot tell whether the pattern failed or the vendor did, and rediscovers the answer at the same cost. This is the reader with no alternative source. Audit: tests whether the reported benefit was measured. If vague, requests the underlying data, finds it was never collected, and raises a finding against the entity rather than the project.",
    },
  },

  {
    id: "process",
    number: 2,
    title: "The closure process and its checklist",
    subtitle: "Six activities, then a document that evidences them",
    minutes: 0,
    slides: "",
    outcome:
      "Run closure as a process with a checklist, so the report records work that happened rather than asserting work that did not.",
    coreIdea:
      "Closure is a set of activities; the report is the artefact that evidences them. Doing it in that order is what makes the document true. Written the other way round — report first, activities chased afterwards — every section becomes a claim somebody has to go and make good, and some of them never are.",
    sections: [
      {
        heading: "The six things that constitute closure",
        body: "The departmental factsheet lists what has to happen before a project can be formally closed. None of them is 'write the report'. The report comes after, and its job is to show these were done.",
        bullets: [
          "Outputs and deliverables completed, handed over, and formally accepted by the BAU teams that will own them — with the transition approach documented.",
          "Outstanding risks, unresolved issues and ongoing benefits reviewed, documented and assigned to a BAU owner, including new operational risks surfaced by the transition itself.",
          "Post Implementation Review arrangements considered and confirmed — timing, ownership and scope.",
          "Closure formally approved and documented, with Project Board endorsement where required.",
          "The Project Closure Report completed and approved by the Senior Responsible Officer.",
          "Lessons captured and recorded in the Departmental Lessons Learned Register.",
        ],
        example:
          "Read that list as six pieces of work with owners and dates, not as six paragraphs to write. The fifth item is the only one that is a document, and it is fifth for a reason.",
        sourceIds: ["dewr-factsheet", "dewr-announcement"],
      },
      {
        heading: "The checklist, and what each line is really asking",
        body: "The factsheet turns those activities into fifteen checkboxes across six categories. The wording repays attention: most lines ask you to confirm something is agreed or accepted by a named party, not that you have written about it.",
        table: {
          caption: "The departmental closure checklist",
          head: ["Category", "What you are confirming"],
          rows: [
            ["Deliverables and benefits transition", "Deliverables in the business case and plan completed and formally accepted; benefit ownership and ongoing realisation agreed; PIR ownership, timing and scope confirmed"],
            ["Transition ownership to BAU", "Transition planning done and operational responsibilities documented (Tier 1 and 2 use the Project Transition Plan); outputs, risks, issues and benefits transferred with clear accountability; transition completed and documented"],
            ["Closure documentation", "The report reflects performance against objectives, scope, schedule and budget"],
            ["Lessons learned", "A lessons review conducted; lessons recorded in the Departmental Lessons Learned Register"],
            ["Approvals and submission", "SRO approval obtained; governance endorsement where required; approved report sent to the PPO"],
            ["Stakeholder engagement", "Stakeholders informed of closure; transition arrangements communicated; BAU ownership and contact points confirmed"],
          ],
        },
        example:
          "'Confirm benefit ownership … are defined and agreed' is a conversation with a named business owner who says yes. It is not a row in a table with a branch name in it.",
        sourceIds: ["dewr-factsheet"],
      },
      {
        heading: "Why the order matters more than it sounds",
        body: "Writing the report first feels efficient because the sections are known in advance, and it produces a predictable failure: sections that describe an intention as though it were an event. The transition 'has been completed', the benefit 'will be owned by', the risk 'has been transferred' — each written before anyone agreed to it. The report is then correct in form and wrong in fact, and the person who discovers this is usually the BAU owner who never accepted the thing.",
        bullets: [
          "Do the activity, get the acceptance, then write the sentence that records it.",
          "Where an activity genuinely has not happened, say so and name the action, owner and date. An honest gap is a manageable one.",
          "A section you cannot evidence is a section describing work still to do — which belongs in outstanding actions, not in the past tense.",
        ],
        example:
          "'Ongoing management of R4 has been transferred to Provider Support' and 'Provider Support has twice declined to accept R4; referred to the SRO for allocation' describe the same situation. Only one of them is true, and only one gives the SRO something to decide.",
        sourceIds: ["dewr-factsheet"],
      },
      {
        heading: "How much of this applies to you",
        body: "The department tiers projects, and the tier sets how much process and which artefacts apply. Tier 1 and Tier 2 projects carry the fuller set — an Assurance Approach, a Project Transition Plan, the full closure template. Tier 3 projects use a lighter checklist and, from July 2026, a simplified closure form. The obligation to close formally does not change with tier; the paperwork does.",
        bullets: [
          "Tier 1 and 2: Assurance Approach, Project Transition Plan, the full fifteen-section template.",
          "Tier 3: Assurance Plan or Checklist, and the simplified Tier 3 closure form.",
          "Every tier: SRO approval, lessons in the register, submission to the group PMO and the Portfolio Project Office.",
          "If a section of the full template does not apply, retain the heading and justify the omission in place — do not delete it.",
        ],
        example:
          "The instruction to keep every heading and justify omissions is doing something specific: it makes a deliberate decision visible and an oversight obvious. A missing section reads as an error; a section saying 'not applicable because the project procured nothing' reads as a decision.",
        sourceIds: ["dewr-template", "dewr-tier3", "dewr-factsheet"],
      },
    ],
    questions: [
      {
        id: "cl-pr1",
        moduleId: "process",
        prompt: "Where does writing the closure report sit among the six closure activities?",
        options: [
          "Near the end — it evidences work already done",
          "First, so the sections drive the closure work",
          "In parallel, drafted as each activity proceeds",
          "It is not one of the six; it follows separately",
        ],
        answer: 0,
        rationale:
          "The factsheet lists the report fifth of six. Its job is to record work that happened, which is only possible once the work has happened.",
        optionNotes: [
          "",
          "This is the common approach and it produces sections that describe intentions in the past tense.",
          "Drafting alongside is fine as a habit, but the report is finalised on completed activity, not on progress.",
          "It is explicitly one of the six, and it is approved by the SRO.",
        ],
      },
      {
        id: "cl-pr2",
        moduleId: "process",
        prompt: "The checklist asks you to confirm benefit ownership is 'defined and agreed'. What satisfies that?",
        options: [
          "A named business owner who has accepted the benefit",
          "A row in the benefits table naming the responsible branch",
          "The benefit being recorded in the Benefits Realisation Plan",
          "SRO sign-off on the benefits section of the report",
        ],
        answer: 0,
        rationale:
          "'Agreed' requires the other party to have agreed. Naming a branch records an intention; a named person who accepted it records a transfer.",
        optionNotes: [
          "",
          "A branch name is where the benefit was pointed, not evidence anyone caught it.",
          "The plan records what was intended at the start, not who owns it now.",
          "The SRO approves the report; they cannot accept a benefit on another area's behalf.",
        ],
      },
      {
        id: "cl-pr3",
        moduleId: "process",
        prompt: "A section of the full template does not apply to your project. What does the template instruct?",
        options: [
          "Keep the heading and justify why it does not apply",
          "Delete the section to keep the report readable",
          "Mark it 'N/A' with no further explanation",
          "Move it to an appendix with the other unused sections",
        ],
        answer: 0,
        rationale:
          "Retaining the heading with a brief justification makes a decision visible. A deleted section is indistinguishable from an oversight.",
        optionNotes: [
          "",
          "Deleting it removes the evidence that anyone considered it.",
          "A bare 'N/A' records the outcome without the reasoning a later reader needs.",
          "The template has no appendix for this, and moving it hides the same information.",
        ],
      },
      {
        id: "cl-pr4",
        moduleId: "process",
        prompt: "Which artefact do Tier 1 and Tier 2 projects use that Tier 3 projects do not?",
        options: [
          "The Project Transition Plan",
          "The Departmental Lessons Learned Register",
          "A Senior Responsible Officer approval",
          "Submission to the Portfolio Project Office",
        ],
        answer: 0,
        rationale:
          "The checklist scopes the Project Transition Plan to Tier 1 and 2. The register, SRO approval and PPO submission apply at every tier.",
        optionNotes: [
          "",
          "The register is departmental and applies to all projects.",
          "SRO approval is required regardless of tier.",
          "Every approved report goes to the group PMO and the PPO.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-pr-s1",
        moduleId: "process",
        context:
          "Your report is drafted and reads well. The transition section states that operational responsibility passed to the Service Delivery branch on 30 June. Checking with the branch, you find they were briefed but have not accepted the handover, and their assistant director is on leave until after your closure date.",
        prompt: "What should the report say?",
        options: [
          "Not yet accepted, with the action, owner and date",
          "That handover completed on 30 June, since the briefing occurred then",
          "Nothing about the handover until the assistant director returns and accepts",
          "That handover completed, with a note that formal acceptance is pending",
        ],
        answer: 0,
        rationale:
          "The checklist asks you to confirm acceptance, not notification. An unaccepted handover recorded as an outstanding action is manageable; recorded as complete, it becomes a surprise for whoever inherits it.",
        optionNotes: [
          "",
          "A briefing is not an acceptance, and dating the handover to it makes the report untrue.",
          "Waiting stalls closure over one absence, and the gap is reportable as it stands.",
          "'Complete, pending acceptance' is a contradiction that reads as complete to everyone skimming it.",
        ],
      },
      {
        id: "cl-pr-s2",
        moduleId: "process",
        context:
          "A Tier 3 project has finished. The project manager plans to complete the simplified form, get the SRO to approve it, and file it in the team's SharePoint. She asks whether anything else is needed.",
        prompt: "What is missing?",
        options: [
          "The register entry, and submission to the PMO and PPO",
          "Nothing — Tier 3 projects close on SRO approval alone",
          "A Project Transition Plan, which is required at every tier",
          "Portfolio Project Office review and approval of the report",
        ],
        answer: 0,
        rationale:
          "Filing locally is not submission. Lessons belong in the Departmental Lessons Learned Register, and the approved report goes to the group PMO and the PPO — both apply at every tier.",
        optionNotes: [
          "",
          "SRO approval is necessary and not sufficient; the report still has to go somewhere.",
          "The Transition Plan is scoped to Tier 1 and 2.",
          "The PPO receives reports but explicitly does not review them for approval.",
        ],
      },
    ],
    assignment: {
      title: "Run the checklist against a real project",
      instruction:
        "Take a project you know that has closed or is closing. Work down the six checklist categories and mark each of the fifteen items done, partly done or not done — then write what would have to happen to close the gaps.",
      prompts: [
        "Which items can you evidence with something a third party agreed to, rather than something you wrote?",
        "Which item is furthest from done, and who has to act for it to be closed?",
        "Where has an intention been recorded as an event?",
      ],
      modelAnswer:
        "The pattern in almost every real run: deliverables and documentation come out strong, because they are the project's own work and the project controls them. Transition ownership and stakeholder engagement come out weakest, because both require somebody outside the project to say yes.\n\nA typical honest assessment: deliverables accepted (evidenced by the acceptance record), PIR arrangements not done — nobody has been asked to own it, benefit ownership agreed for four of six, transition documented but not accepted, lessons written but not in the register, stakeholders informed but BAU contact points not confirmed.\n\nThat is six gaps, and five of them close with a conversation and a name. The sixth — the two benefits with no owner — is a real decision for the SRO, and it is exactly the kind of thing that gets buried when the report is written before the checklist is run.",
      criteria: [
        "Each item marked against evidence, not against intention",
        "At least one item where an intention had been recorded as an event",
        "Gaps carry an owner and a date, not just a description",
        "Distinguishes gaps you can close from decisions someone else must take",
      ],
    },
  },
  {
    id: "accountability",
    number: 3,
    title: "Who approves what",
    subtitle: "The SRO, the Board, and the offices that will not save you",
    minutes: 0,
    slides: "",
    outcome:
      "Identify who must approve closure, who endorses it, who merely receives it, and what each of them is actually accountable for.",
    coreIdea:
      "Closure has one accountable person and several audiences, and the difference matters. The Senior Responsible Officer approves and gives assurance. The Project Board endorses where required. The group PMO and the Portfolio Project Office receive the report — and the PPO explicitly does not check it. Nobody downstream will catch your errors, which puts the whole weight on the SRO's assurance being real.",
    sections: [
      {
        heading: "What the SRO is accountable for",
        body: "The factsheet is unusually specific here, and it is worth reading as a list of things the SRO has to be able to say honestly rather than as a description of a role. They are accountable for overseeing and approving closure, and for confirming the project has reached a point where it can properly conclude.",
        table: {
          caption: "The SRO's two jobs at closure",
          head: ["Confirming", "Assuring"],
          rows: [
            ["Closure activities have been completed", "The project was delivered in line with its objectives, or formally closed for an approved reason"],
            ["Outcomes and deliverables transitioned to the right business owner or BAU area", "Closure decisions are appropriate and well documented"],
            ["Ongoing ownership of benefits, risks, issues and remaining actions clearly assigned", "Follow-on activities — benefits realisation, post implementation review — considered and assigned"],
          ],
        },
        example:
          "Notice what the SRO is not asked to confirm: that the project succeeded. 'Delivered in line with its objectives, or formally closed for an approved reason' makes an early or partial closure a legitimate outcome to sign, provided the reason is approved and documented.",
        sourceIds: ["dewr-factsheet"],
      },
      {
        heading: "Everyone else at the table",
        body: "The approvals block in the full template names four roles and leaves room for more. Each signs for something different, and asking the wrong person for the wrong assurance wastes a fortnight.",
        table: {
          caption: "Roles in the approvals block",
          head: ["Role", "What they are signing for"],
          rows: [
            ["Project Board", "Governance endorsement that closure is appropriate now"],
            ["Senior Responsible Officer", "Accountable approval — the assurances above"],
            ["Project Manager", "That the report is accurate and the activities were done"],
            ["Senior User / Business Owner", "That what has been handed over is accepted, and ongoing ownership is understood"],
          ],
        },
        example:
          "The Senior User signature is the one people skip, and it is the one that makes the transition sections true. If the business owner has not signed, the report is asserting acceptance that nobody gave.",
        sourceIds: ["dewr-template", "dewr-factsheet"],
      },
      {
        heading: "The five assertions you are asking them to agree to",
        body: "The Approvals section of the full template is not a signature block with a covering sentence. It sets out five specific statements, and signing means agreeing to all of them. Reading them before you draft is the fastest way to find out what the report has to establish.",
        bullets: [
          "The original project objectives have been met, subject to any approved changes.",
          "Provision has been made to address all open issues and risks.",
          "The project outcomes are in place and transferred to BAU.",
          "Resources assigned to the project can be released.",
          "The Post Implementation Review has been assigned to the BAU team, and all project documentation is up to date.",
        ],
        example:
          "Work backwards from these five and the report writes itself: each one is a claim, and each claim needs a section that evidences it. The fourth is the one people forget — releasing resources is a decision with a date, not a consequence of the project ending.",
        sourceIds: ["dewr-template"],
      },
      {
        heading: "The PPO receives your report and does not read it for compliance",
        body: "This is the single most commonly misunderstood part of the process, and getting it wrong in either direction is costly. The approved report goes to your group Project Management Office and to the Portfolio Project Office. The PPO does not review it for approval or compliance. It aggregates information across the department to identify trends, insights and emerging patterns for enterprise reporting and continuous improvement.",
        bullets: [
          "Do not treat submission as a quality gate. Nothing downstream will bounce a weak report back to you.",
          "Do not delay submission waiting for a review that is not coming.",
          "Do write for the aggregate audience as well as the local one: your lessons and ratings become departmental data.",
          "Lessons have their own destination — the Departmental Lessons Learned Register — and that is where they get reused.",
        ],
        example:
          "Because the PPO aggregates rather than assesses, a vague lesson is not just a wasted paragraph for your project; it is a row of noise in the department's only view of what keeps going wrong. 'Communication could have been better' aggregates to nothing.",
        sourceIds: ["dewr-announcement", "dewr-factsheet"],
      },
      {
        heading: "Assurance, in the departmental frame",
        body: "Assurance at DEWR is scoped by tier and lives in named artefacts rather than in a separate review event. Tier 1 and 2 projects carry an Assurance Approach; Tier 3 projects an Assurance Plan or Checklist. Both are listed as project management deliverables in the closure report, and assurance is one of the eighteen lessons categories — so you report on the artefact, and separately on whether it did any good.",
        bullets: [
          "The report lists the assurance artefact and its version, as a deliverable.",
          "The lessons table asks separately what assurance did well and where it should improve.",
          "For projects over the Commonwealth thresholds, external Gateway reviews may also apply — that is a different regime, and it sits alongside rather than instead of the departmental one.",
        ],
        example:
          "Listing 'Assurance Approach v1.2' proves an artefact existed. The lessons row is where you say whether it changed a decision — which is the only question worth asking about assurance.",
        sourceIds: ["dewr-template", "gateway", "rmg106"],
      },
      {
        heading: "Where closure claims resurface",
        body: "Performance information from delivery flows into the entity's corporate plan reporting and annual performance statements, which are subject to audit. A benefit claimed at closure can therefore be tested by someone with statutory powers, no relationship with the project, and a year's distance. That is a different reader from the sponsor who signed the report.",
        bullets: [
          "Annual performance statements report against the entity's purposes and are audited.",
          "ANAO performance audits examine whether reported information is meaningful and supported.",
          "Gateway lessons material aggregates across entities, so patterns become visible beyond one project.",
          "The evidence has to survive the project's systems being decommissioned.",
        ],
        sourceIds: ["rmg134", "anao-perf", "anao-gateway"],
      },
      {
        heading: "Recording what assurance actually did",
        body: "Assurance appears twice in the departmental report, and the two entries answer different questions. The deliverables table records the artefact — an Assurance Approach for Tier 1 and Tier 2, an Assurance Plan or Checklist for Tier 3 — with its version and date. The lessons table asks separately what assurance did well and where it should improve. The first is most often answered with a list of review dates, which records that assurance happened and not what it was worth; the second is where that question actually gets asked.",
        bullets: [
          "List the planned assurance activities, internal and external, and whether each happened.",
          "Where an activity was dropped, deferred or substituted, give the reason — a changed plan is fine, an unexplained one is not.",
          "Record the key findings and what was done about them, not just that a review took place.",
          "For a Strong rating, assess whether the assurance was any use: which recommendations changed the delivery, and which were noted and left.",
          "Assurance findings are also a source of lessons, and the standard expects the lessons section to draw on them.",
        ],
        example:
          "'Gate 4 review conducted 12 March; Gate 6 review conducted 4 June' is a record of attendance. 'Gate 4 recommended splitting the integration release; adopted, and the second release absorbed the identity broker change without a further slip. Gate 6 recommended a benefits owner for B6; not resolved at closure and carried as R4' tells a reader whether the money spent on assurance bought anything.",
        sourceIds: ["aga-standard", "rmg106", "anao-gateway"],
      },
    ],
    questions: [
      {
        id: "cl-ac1",
        moduleId: "accountability",
        prompt: "What does the Portfolio Project Office do with your submitted closure report?",
        options: [
          "Aggregates it for departmental trend reporting",
          "Reviews it for compliance with the P3M Framework",
          "Approves it on behalf of the department",
          "Returns it with feedback before the project can close",
        ],
        answer: 0,
        rationale:
          "The announcement states it plainly: reports are not reviewed by the PPO for approval. Information from them is used to identify trends, insights and emerging patterns.",
        optionNotes: [
          "",
          "Explicitly not — no compliance review takes place.",
          "Approval is the SRO's, not the PPO's.",
          "Nothing comes back. Submission is not a gate.",
        ],
      },
      {
        id: "cl-ac2",
        moduleId: "accountability",
        prompt: "Which assurance can the SRO give about a project that was closed early?",
        options: [
          "That it was formally closed for an approved reason",
          "That the objectives were met, subject to approved changes",
          "None — early closure cannot be signed by the SRO",
          "That the business case remained valid throughout",
        ],
        answer: 0,
        rationale:
          "The wording is 'delivered in line with its objectives, or formally closed for an approved reason'. Early closure is a legitimate thing to sign, provided the reason was approved and is documented.",
        optionNotes: [
          "",
          "This is the alternative branch, and it does not describe a project closed early.",
          "Early closure is explicitly provided for, and still requires SRO approval.",
          "A project often closes early precisely because the case stopped being valid.",
        ],
      },
      {
        id: "cl-ac3",
        moduleId: "accountability",
        prompt: "Whose signature makes the transition sections credible?",
        options: [
          "The Senior User or Business Owner receiving the outputs",
          "The Senior Responsible Officer, who approves the whole report",
          "The Project Manager, who performed the handover",
          "The Project Board, which endorses closure",
        ],
        answer: 0,
        rationale:
          "Transition is an acceptance by the receiving side. Only the business owner can confirm they have taken it on; everyone else is attesting to process.",
        optionNotes: [
          "",
          "The SRO approves closure overall but cannot accept on the business area's behalf.",
          "The PM can confirm the handover was offered, not that it was accepted.",
          "Board endorsement is about whether closing now is appropriate.",
        ],
      },
      {
        id: "cl-ac4",
        moduleId: "accountability",
        prompt: "The approvals statement includes 'resources assigned to the project can be released'. Why is that listed separately?",
        options: [
          "Releasing people is a dated decision, not a consequence",
          "It confirms the project has not overspent its staffing allocation",
          "It transfers employment responsibility to the receiving BAU area",
          "It is required before the financial summary can be finalised",
        ],
        answer: 0,
        rationale:
          "Everything else in the statement concerns work being finished or transferred. This one asks the approver to agree that the people can now go — which is a call somebody has to make deliberately.",
        optionNotes: [
          "",
          "Staffing spend is reported in the financial summary, not here.",
          "Nothing about employment transfers with this statement.",
          "The two are independent; the financial summary does not wait on it.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-ac-s1",
        moduleId: "accountability",
        context:
          "Your closure report is complete and the SRO has approved it. A colleague suggests holding submission for a few weeks, on the basis that the Portfolio Project Office will come back with corrections and it is better to fix them in one pass.",
        prompt: "How should you respond?",
        options: [
          "Submit now — nothing is coming back from the PPO",
          "Hold it, since a single corrected submission is cleaner for the PPO",
          "Submit an early draft to the PPO to get their comments first",
          "Ask the group PMO to review it in place of the PPO",
        ],
        answer: 0,
        rationale:
          "The PPO aggregates rather than assesses. Waiting for feedback that will not arrive delays the departmental trend data and holds the project open for nothing.",
        optionNotes: [
          "",
          "There is nothing to correct against — no review takes place.",
          "The PPO does not comment on drafts either; the misunderstanding is the same one.",
          "The group PMO receives it too, but review is not their role at this point.",
        ],
      },
      {
        id: "cl-ac-s2",
        moduleId: "accountability",
        context:
          "Two of six benefits have no agreed owner. The business area approached has declined twice, on the grounds that the relevant staffing is set centrally. Your SRO is willing to approve the report and asks you to record the benefits as 'ownership to be confirmed'.",
        prompt: "What is the problem with that wording?",
        options: [
          "It hides a decision the SRO must take",
          "It is too vague for the PPO to accept the report",
          "Benefits without owners must be deleted from the report",
          "It commits the project to confirming ownership after closure",
        ],
        answer: 0,
        rationale:
          "The SRO's assurance includes that ongoing ownership of benefits has been clearly assigned. 'To be confirmed' reads as administrative tidying-up and is actually an allocation decision only the SRO can make.",
        optionNotes: [
          "",
          "The PPO does not assess reports, so acceptance is not the constraint.",
          "An unowned benefit is a finding worth recording, not one to remove.",
          "The project will not exist to confirm anything — that is precisely the difficulty.",
        ],
      },
    ],
    assignment: {
      title: "Draft the approvals page honestly",
      instruction:
        "For a project you know, write the five approval assertions out and mark each one true, partly true or not yet true. Then draft the wording you would put in front of the SRO.",
      prompts: [
        "Which of the five can you evidence today?",
        "For any that are not yet true, what is the action, who owns it, and by when?",
        "Is there anything you are asking the SRO to assure that only a business owner can actually confirm?",
      ],
      modelAnswer:
        "The useful discipline is to treat each assertion as a testable claim and find the evidence before the meeting.\n\n'Objectives met, subject to approved changes' — true, with the two Board-approved scope reductions cited by date and minute reference. 'Provision made for all open issues and risks' — partly true: four risks transferred with named owners, one declined twice and unresolved. 'Outcomes in place and transferred to BAU' — partly true: five of six accepted, the sixth briefed but not accepted. 'Resources can be released' — true from 30 September, once the two-week transition support commitment ends. 'PIR assigned and documentation up to date' — not yet true; no PIR owner nominated.\n\nSo two of five need an SRO decision rather than more work by me: who takes the unowned risk, and who owns the PIR. Putting those two in front of them as decisions, with options, is a much better use of the approval meeting than presenting five green ticks and letting them discover the gaps later.",
      criteria: [
        "Each of the five assertions assessed separately against evidence",
        "Distinguishes what more work will fix from what needs an SRO decision",
        "Names the business-owner confirmations the SRO cannot give",
        "Gaps carry an owner and a date",
      ],
    },
  },
  {
    id: "evidence",
    number: 2,
    title: "Evidence, baselines and what you may claim",
    subtitle: "The difference between measured, estimated and asserted",
    minutes: 0,
    slides: "",
    outcome: "Distinguish measured, estimated and asserted claims, and state a baseline that a later audit can test.",
    coreIdea:
      "Every sentence in a closure report is one of three things: something you measured, something you estimated, or something you asserted. Reports that survive scrutiny mark which is which. Reports that do not, blur all three into the same confident past tense.",
    sections: [
      {
        heading: "Measured, estimated, or just asserted",
        body: "The confident past tense is the enemy. 'Processing time was reduced by 40 per cent' reads identically whether it came from a measured before-and-after, a modelled projection, or a workshop where someone said it felt about right. The reader cannot tell, so the reader either believes all of it or none of it — and an auditor will assume the weakest interpretation until shown otherwise.",
        table: {
          caption: "Marking the claim",
          head: ["Kind", "What backs it", "How to write it"],
          rows: [
            ["Measured", "Data collected before and after, same definition both times", "'Measured: median processing time fell from 14 to 9 days (Jan–Mar vs Jul–Sep 2026, n=4,102).'"],
            ["Estimated", "A model, with stated assumptions", "'Estimated: 12,000 support contacts avoided annually, assuming the Q3 contact rate holds.'"],
            ["Asserted", "Informed judgement, no measurement", "'Asserted: caseworker confidence improved. Basis: team lead observation, not measured.'"],
          ],
        },
        example:
          "The third row is the one people resist writing. It is also the one that protects the other two: a report that openly labels its soft claims earns trust for its hard ones.",
        sourceIds: ["anao-perf", "rmg134"],
      },
      {
        heading: "Baselines, and reporting against the right one",
        body: "A baseline is only useful if it is the one that was approved when the decision was made. Reporting against the most recent revision is the single most common way a closure report is technically accurate and substantively misleading. The fix is not to hide revisions but to show the chain: original, each revision with its date and reason, and current.",
        bullets: [
          "State the original approved baseline first, always.",
          "Show each revision as a dated, reasoned change — not as the new normal.",
          "Report performance against both original and final, and let the reader see the gap.",
          "If no baseline was set, say so explicitly. It is a finding, not an embarrassment to be smoothed over.",
        ],
        example:
          "'Delivered within budget' against a twice-revised budget is the sentence auditors look for. 'Delivered at $51m against an original approved budget of $38m, revised to $47m (Nov 2025, scope addition) and $52m (Apr 2026, integration rework)' is the sentence that survives.",
        sourceIds: ["closure", "anao-gateway"],
      },
      {
        heading: "Getting from the claim back to the data",
        body: "A claim is traceable when a reader who was not there can get from the sentence to the underlying data without asking you. In practice this means a reference to a named source, a date range, and a definition — because the same metric measured two ways produces two answers, and the difference is usually larger than the improvement being claimed.",
        bullets: [
          "Name the system or dataset, not the team that produced the figure.",
          "Give the date range and the sample size where relevant.",
          "State the definition when the metric could reasonably be defined more than one way.",
          "Where a definition changed mid-project, report both and say which is which.",
        ],
        example:
          "'Processing time' can mean lodgement to decision, lodgement to notification, or first-touch to decision. A 40 per cent improvement in one may be a 5 per cent improvement in another. Unstated, the reader assumes whichever is most flattering, and is right to.",
        sourceIds: ["anao-perf"],
      },
      {
        heading: "Choosing the comparison window honestly",
        body: "Once a claim is marked and traceable, the remaining way to mislead honestly is the choice of window. Comparing a bad quarter with a good one produces a real improvement from real data and tells the reader nothing about the service. Nobody usually does this deliberately; the flattering window is simply the one that gets chosen, because it is the one that looks like success.",
        bullets: [
          "State why the comparison periods were chosen, especially if they are not adjacent or not the same length.",
          "Use like-for-like periods where the work is seasonal — quarter against the same quarter, not against the quarter before.",
          "Give the sample size. A 40 per cent improvement on 60 cases is a different claim from the same figure on 6,000.",
          "Say what else changed in the window. A policy change, a staffing change or a campaign will move the same numbers.",
          "Where the trend is noisy, show it rather than reporting two endpoints from it.",
        ],
        example:
          "Processing time fell 41 per cent between Q2 and Q3. Q2 covered the annual re-registration peak; Q3 did not. Against Q3 of the previous year the improvement is 12 per cent. Both figures are real, only one is about the system, and the report that gives only the first is not lying.",
        sourceIds: ["anao-perf", "rmg134"],
      },
    ],
    questions: [
      {
        id: "cl-e1",
        moduleId: "evidence",
        prompt: "A closure report says 'processing time reduced by 40 per cent'. What single addition most improves its testability?",
        options: [
          "The metric definition, periods compared, and data source",
          "The name of the officer who approved the figure",
          "A statement that the figure was validated by the delivery team",
          "The percentage expressed as absolute numbers instead",
        ],
        answer: 0,
        rationale:
          "Testability means a stranger can reproduce the figure. Definition, period and source are what let them do that. Approval and internal validation are attestations, which are only as good as the underlying data they do not describe.",
        optionNotes: [
          "",
          "Attribution tells you who to ask, not whether the number is right.",
          "Self-validation by the party being assessed adds no independent weight.",
          "Absolute numbers help slightly, but without a definition and period they are equally untestable.",
        ],
      },
      {
        id: "cl-e2",
        moduleId: "evidence",
        prompt: "No baseline was captured before the change was made. What is the correct treatment in the closure report?",
        options: [
          "State plainly that no baseline exists, and mark any improvement claim as estimated or asserted",
          "Reconstruct a baseline from the best available historical data and report against it as measured",
          "Omit the improvement claim entirely to avoid making an unsupported statement",
          "Report the post-implementation figure alone and let the reader draw their own comparison",
        ],
        answer: 0,
        rationale:
          "Disclosure plus honest labelling. A reconstructed baseline may well be worth including — but as an estimate with its method stated, never as a measurement. Omitting the claim loses real information, and a bare post figure invites the reader to invent the comparison.",
        optionNotes: [
          "",
          "Reconstruction is legitimate; presenting it as measured is not. The label is the whole issue.",
          "Silence destroys information the next team needs. Say it, and mark its strength.",
          "This is the least honest option: it implies a comparison while taking no responsibility for it.",
        ],
      },
      {
        id: "cl-e3",
        moduleId: "evidence",
        prompt: "Which claim is correctly marked?",
        options: [
          "Estimated: 12,000 contacts avoided annually, assuming the Q3 rate persists",
          "The project delivered a significant reduction in avoidable contact volumes",
          "Contact volumes were reduced by approximately 12,000 per year",
          "Stakeholders confirmed that contact volumes fell substantially after release",
        ],
        answer: 0,
        rationale:
          "It names its kind (estimated), its magnitude, and the assumption the estimate depends on — so a reader can judge whether the assumption holds. The others are assertions wearing the grammar of measurements.",
        optionNotes: [
          "",
          "'Significant' is doing work no data supports here.",
          "'Approximately' softens the number without disclosing whether it was measured or modelled.",
          "Stakeholder confirmation is an assertion about perception, presented as a finding about volumes.",
        ],
      },
      {
        id: "cl-e4",
        moduleId: "evidence",
        prompt: "Why is reporting only against the final revised baseline misleading even when every figure is accurate?",
        options: [
          "It conceals the gap between what was approved and what was delivered",
          "Revised baselines are not formally approved and so carry no standing",
          "It overstates delivery performance by using a smaller denominator",
          "Auditors are required to reject reports that reference revised baselines",
        ],
        answer: 0,
        rationale:
          "The investment decision was made against the original. Whether the thing approved is the thing delivered is the question the report exists to answer, and reporting only against the revision quietly answers a different, easier one.",
        optionNotes: [
          "",
          "Revisions are usually formally approved. Their standing is not the problem.",
          "Sometimes true arithmetically, but it is a consequence rather than the reason.",
          "No such requirement exists. Revisions should be disclosed, not avoided.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-e-s1",
        moduleId: "evidence",
        context:
          "Your team measured 'time to decision' as lodgement-to-notification during discovery, and as first-touch-to-decision after release, because the new system made first-touch easier to capture. The headline improvement is 38 per cent.",
        prompt: "What must the closure report do?",
        options: [
          "Report both definitions, state that it changed, and give a comparable figure",
          "Use the newer definition throughout, since it is the more accurate measure of processing",
          "Use the original definition throughout and discard the post-release data",
          "Report the 38 per cent figure with a footnote noting a minor measurement change",
        ],
        answer: 0,
        rationale:
          "A definition change mid-measurement is exactly the circumstance where a real improvement and a measurement artefact are indistinguishable. Full disclosure of both, with a like-for-like comparison if the data allows, is the only treatment that lets a reader tell which they are looking at.",
        optionNotes: [
          "",
          "Accuracy of the newer definition is beside the point; you cannot compare it to a baseline captured differently.",
          "Discarding data is worse than disclosing it, and the post-release figure has value on its own terms.",
          "A footnote calling this 'minor' understates a change that may account for the entire result.",
        ],
      },
      {
        id: "cl-e-s2",
        moduleId: "evidence",
        context:
          "A sponsor asks you to remove the sentence disclosing that caseworker confidence was asserted rather than measured, on the grounds that 'it undermines the rest of the report'.",
        prompt: "What is the strongest professional response?",
        options: [
          "Keep the disclosure, because it is what makes the measured claims elsewhere credible",
          "Remove it, since an unmeasured claim adds nothing and its absence changes no conclusion",
          "Move it to an appendix so it is disclosed without affecting the narrative",
          "Replace it with a measured proxy, even a weak one, so the claim can stand",
        ],
        answer: 0,
        rationale:
          "The sponsor has the causation backwards. A report that marks its own weak claims signals that its strong ones have been tested; strip the marking and every claim in the document becomes equally unverifiable to a sceptical reader. The disclosure is load-bearing.",
        optionNotes: [
          "",
          "It changes the reader's calibration of everything else, which is a substantial effect.",
          "Appendix burial is removal with extra steps, and a reader who finds it will trust the main text less.",
          "Substituting a weak proxy to make a claim stand is how untestable numbers enter the record.",
        ],
      },
    ],
    assignment: {
      title: "Mark up a claim set",
      instruction:
        "Write three claims about a piece of work you know — one measured, one estimated, one asserted. Mark each, and for the measured one give the definition, period and source.",
      prompts: [
        "Measured claim, with definition, date range and data source",
        "Estimated claim, with the assumption it depends on",
        "Asserted claim, with the basis for the judgement",
      ],
      criteria: [
        "The measured claim names a source a stranger could go to without asking you",
        "The estimate states an assumption that could turn out to be false",
        "The assertion is labelled as such rather than dressed as a finding",
      ],
      modelAnswer:
        "Measured: median lodgement-to-decision time fell from 14 days to 9 days, comparing Jan–Mar 2026 (n=3,880) with Jul–Sep 2026 (n=4,102), source: case management system extract CMS-RPT-114, definition unchanged across both periods. Estimated: approximately 11,500 support contacts avoided per year, assuming the Q3 2026 contact-per-application rate persists and application volumes remain within 5 per cent of forecast; if volumes grow as the department projects, the figure rises. Asserted: caseworkers report lower frustration with the status screen. Basis: three team-lead debriefs and unsolicited feedback in the September release retro. Not measured, and no survey instrument was in place.",
    },
  },

  {
    id: "deliverables",
    number: 5,
    title: "Deliverables: the paperwork and the thing you built",
    subtitle: "Two different questions the template asks separately",
    minutes: 0,
    slides: "",
    outcome:
      "Report project management artefacts and project-specific deliverables as the distinct things they are, and state a completion status you can evidence.",
    coreIdea:
      "The template asks about deliverables twice, and they are not the same question. Project management deliverables are the artefacts the framework required you to produce. Project-specific deliverables are the things the project existed to build. Answering both with the same list is the commonest way to make a report look complete while saying nothing about what was delivered.",
    sections: [
      {
        heading: "The two questions",
        body: "Section 7 asks which project management documents the plan said you would produce, and whether you produced them. Section 8 asks what the project actually delivered into the world. A report that lists the Project Management Plan under both has answered neither.",
        table: {
          caption: "Telling them apart",
          head: ["", "Project management deliverables", "Project-specific deliverables"],
          rows: [
            ["What it is", "An artefact the P3M Framework required", "A good or service the project produced"],
            ["Who wanted it", "Governance", "The business, or the public"],
            ["Examples", "Business Case, PMP, Risk Management Plan, Change Register", "A status screen, a server upgrade, policy guidelines, a data migration"],
            ["Recorded as", "Document, version or ID, delivery date", "Deliverable, purpose, delivery date"],
            ["Failure mode", "Listing documents that were never produced", "Describing the artefact without saying what it was for"],
          ],
        },
        example:
          "'Policy guidelines for stakeholders — will assist the stakeholder cohort to understand and meet new legislative requirements' is a project-specific deliverable with its purpose attached. That second half is what makes the row worth reading in three years.",
        sourceIds: ["dewr-template"],
      },
      {
        heading: "The artefact list, and tailoring it by tier",
        body: "The template pre-populates the project management deliverables with the framework's core set. It is meant to be tailored to the project's tier rather than completed exhaustively, and you add anything else the project produced.",
        bullets: [
          "Concept Definition; Business Case or New Policy Proposal.",
          "Assurance Approach for Tier 1 and 2; Assurance Plan or Checklist for Tier 3.",
          "Project Management Plan; Project Schedule.",
          "Benefit Profiles and the Benefits Realisation Plan.",
          "Stakeholder Engagement and Communications Strategy and Plan.",
          "Risk Management Plan, held in RiskNet2.",
          "Privacy Impact Assessment, where applicable.",
          "Change Register; the Project Closure Report itself; status reports and change requests.",
        ],
        example:
          "The row for status reports does not ask for a version — it asks you to state the cadence: 'Regular project status reports prepared and reviewed fortnightly.' A gap in that cadence is itself a finding, and it usually shows up later as a lessons entry about governance.",
        sourceIds: ["dewr-template"],
      },
      {
        heading: "Status you can evidence",
        body: "The Tier 3 form asks for planned deliverable, delivered deliverable, and a status of Achieved, Partially achieved or Not achieved — with comments covering any approved variation. The full template asks the same thing in prose. Either way the useful discipline is identical: state the original approved scope, state what exists now, and account for the difference by pointing at an approval rather than at circumstances.",
        bullets: [
          "Take the planned deliverable from the approved business case, NPP or project outline — not from the most recent plan.",
          "'Partially achieved' is a legitimate and useful answer. It is far more informative than an achieved status with a caveat buried in comments.",
          "An approved variation is a different thing from a shortfall. Cite the approval: who, when, which forum.",
          "A deliverable descoped without approval is not a variation. It is a scope reduction the report has to surface.",
        ],
        example:
          "Two rows, same project. 'Participant-facing status view — Not achieved — withdrawn from scope by the Project Board, November 2025, on privacy assessment advice.' And: 'Bulk export — Not achieved — dependency on the provider gateway roadmap, no committed date.' The first is a decision. The second is an open item that needs an owner.",
        sourceIds: ["dewr-tier3", "dewr-template"],
      },
    ],
    questions: [
      {
        id: "cl-d1",
        moduleId: "deliverables",
        prompt: "What separates a project management deliverable from a project-specific one?",
        options: [
          "Who wanted it — governance, or the business",
          "Whether it is a document or a working system",
          "Whether it was named in the original business case",
          "Whether it is capitalised or expensed",
        ],
        answer: 0,
        rationale:
          "Management deliverables are artefacts the framework required. Project-specific deliverables are what the project existed to produce for someone else.",
        optionNotes: [
          "",
          "Both can be documents — policy guidelines are a project-specific deliverable.",
          "Both are usually named there; that does not distinguish them.",
          "Accounting treatment is a separate question entirely.",
        ],
      },
      {
        id: "cl-d2",
        moduleId: "deliverables",
        prompt: "Where should the 'planned deliverable' column be drawn from?",
        options: [
          "The approved business case, NPP or project outline",
          "The most recent version of the project schedule",
          "The Project Management Plan as last updated",
          "The delivery team's backlog at the point of closure",
        ],
        answer: 0,
        rationale:
          "The original approval is the commitment being reported against. Using a later plan compares the project to itself and hides the drift.",
        optionNotes: [
          "",
          "A current schedule already reflects the changes you are meant to be explaining.",
          "Same problem — the plan moves, the approval does not.",
          "A backlog describes remaining work, not what was promised.",
        ],
      },
      {
        id: "cl-d3",
        moduleId: "deliverables",
        prompt: "A deliverable was dropped, and no forum ever approved it. How is it reported?",
        options: [
          "As not achieved, with the fact that no approval exists",
          "As an approved variation, since the Board did not object",
          "Omitted, because it is no longer part of the project",
          "As partially achieved, reflecting the work done before it stopped",
        ],
        answer: 0,
        rationale:
          "An unapproved reduction is a scope change nobody sanctioned. Recording it as a variation implies a decision that was never taken.",
        optionNotes: [
          "",
          "Absence of objection is not approval, and the report should not manufacture one.",
          "Omitting it hides the largest single fact about the scope.",
          "Partial credit for abandoned work misrepresents what exists.",
        ],
      },
      {
        id: "cl-d4",
        moduleId: "deliverables",
        prompt: "What does the template ask for against the status-report row, rather than a version?",
        options: [
          "The cadence they were prepared at",
          "The total number of reports issued over the project",
          "A link to the folder where they are stored",
          "The name of the officer who prepared them",
        ],
        answer: 0,
        rationale:
          "Status reporting is a rhythm rather than an artefact, so the row records how often it happened. A break in the rhythm is a governance finding.",
        optionNotes: [
          "",
          "A count says nothing about whether reporting was regular.",
          "Storage location matters for records, not for this row.",
          "Authorship is not what the row is testing.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-d-s1",
        moduleId: "deliverables",
        context:
          "Your project produced a Privacy Impact Assessment, but only after go-live, following a query from the privacy team. The template lists a PIA row with a delivery date column.",
        prompt: "How should the row read?",
        options: [
          "PIA listed with its actual date, and a comment that it followed go-live",
          "PIA listed with the go-live date, since both happened in the same quarter",
          "PIA omitted, as it was not part of the approved plan",
          "PIA listed as delivered, with the timing raised in lessons instead",
        ],
        answer: 0,
        rationale:
          "The date column is the finding. A privacy assessment completed after release is exactly the pattern the register exists to surface, and hiding it in lessons removes the evidence.",
        optionNotes: [
          "",
          "Aligning the dates removes the only detail that matters here.",
          "It was produced, and it is a listed core artefact.",
          "Lessons and the deliverables table are not alternatives — the row is the evidence the lesson rests on.",
        ],
      },
      {
        id: "cl-d-s2",
        moduleId: "deliverables",
        context:
          "A Tier 3 project delivered three of four planned deliverables in full. The fourth, a reporting dashboard, went live with two of its five planned views. The project manager wants to mark the dashboard 'Achieved' and explain in comments.",
        prompt: "What status fits?",
        options: [
          "Partially achieved, with the missing views named",
          "Achieved, with the shortfall explained in the comments column",
          "Not achieved, since the deliverable was not completed as planned",
          "Achieved, because the dashboard is in use and delivering value",
        ],
        answer: 0,
        rationale:
          "The form offers Partially achieved precisely for this. It is the honest status, and it survives being skim-read in a way a caveat in a comments column does not.",
        optionNotes: [
          "",
          "The status is what gets aggregated; comments are what gets skipped.",
          "Two working views is not nothing, and Not achieved overstates the shortfall.",
          "Being useful and being complete are different claims.",
        ],
      },
    ],
    assignment: {
      title: "Split the two deliverable tables",
      instruction:
        "For a project you know, draft both tables — the project management artefacts with version and date, and the project-specific deliverables with purpose, date and status.",
      prompts: [
        "Which management artefacts were listed in the plan but never actually produced?",
        "For each project-specific deliverable, what was it for — in a sentence a stranger would understand?",
        "Which status is Partially achieved, and what exactly is missing?",
      ],
      modelAnswer:
        "Two things usually surface, and both are worth more than the tables themselves.\n\nFirst, the artefact list exposes documents that were planned and quietly skipped. A Benefits Realisation Plan that was never written is a much better explanation of why the benefits section is thin than anything you could put in the benefits section itself. Write the row as 'Not produced' with a date of nil, rather than leaving it blank — blank reads as an oversight in filling out the table.\n\nSecond, writing the purpose column forces a clarity test. 'Provider portal enhancement' fails it. 'Self-service view so providers can see application status without ringing the support line' passes, and it also happens to name the benefit, which makes the benefits section easier to write and harder to fudge.\n\nOn status: use Partially achieved wherever it is true. A table of nine Achieved rows with three caveats in the comments column tells a reader the project succeeded. Six Achieved and three Partially achieved tells them the truth in a form that survives being skimmed.",
      criteria: [
        "Two separate tables, with no artefact appearing in both",
        "Every project-specific deliverable has a purpose a stranger could follow",
        "Artefacts planned but not produced are shown, not omitted",
        "At least one honest Partially achieved, with the shortfall named",
      ],
    },
  },
  {
    id: "milestones",
    number: 6,
    title: "Milestones, schedule and change control",
    subtitle: "Variance against the baseline, and what made it legitimate",
    minutes: 0,
    slides: "",
    outcome:
      "Report schedule performance against the original baseline, and use the change record to distinguish an approved variation from a slip.",
    coreIdea:
      "A milestone table listing only actual dates is a diary. The variance is the content, and change control is what turns a variance into a decision somebody took rather than a thing that happened. Report against the original baseline; explain the movement with an approval reference, or admit there isn't one.",
    sections: [
      {
        heading: "Planned, actual, variance",
        body: "The template asks how the project performed against the original baselined schedule as set out in the Project Management Plan, and for details in the comments where delays breached tolerances. Three columns, and the third is the only one anybody reads.",
        bullets: [
          "Baseline from the approved PMP, not from the latest rebaseline.",
          "Where the project was rebaselined, show both: variance to the current baseline and variance to the original.",
          "State whether a delay breached tolerance. 'Late' and 'outside tolerance' are different findings.",
          "A milestone met by moving its definition is not a milestone met — say what changed.",
        ],
        example:
          "'Discovery complete — planned Feb 2024 — actual Feb 2024 — on time' takes one line and earns its place, because the reader now knows the early phase held and the problem is downstream.",
        sourceIds: ["dewr-template"],
      },
      {
        heading: "Tolerances, and the five things they cover",
        body: "The template frames the objectives review around performance against targets and tolerances for time, cost, quality, scope, benefits and risk. Tolerance is the pre-agreed room to move before something has to be escalated, which makes it the cleanest way to describe performance: not whether the number moved, but whether it moved further than governance agreed it could.",
        table: {
          caption: "Reporting against tolerance",
          head: ["Dimension", "Weak reporting", "Reporting against tolerance"],
          rows: [
            ["Time", "Delivered three months late", "Twelve weeks against an eight-week tolerance; escalated to the Board in March"],
            ["Cost", "Came in over budget", "24 per cent over original approval; two rebaselines, both approved"],
            ["Scope", "Some features deferred", "One objective withdrawn by Board decision; two features deferred within tolerance"],
            ["Quality", "A few defects at go-live", "Nine severity-3 defects at release against a tolerance of twelve; none severity-1 or 2"],
            ["Risk", "Risks were managed", "Two risks moved outside appetite; both escalated, one accepted by the SRO"],
          ],
        },
        example:
          "The right-hand column takes no more space than the left and answers the question governance is actually asking, which is whether the controls worked — not whether the project was perfect.",
        sourceIds: ["dewr-template", "dewr-announcement"],
      },
      {
        heading: "Change control and the register",
        body: "Section 12 asks how the formal change process was managed and what decisions were made, and asks you to attach the Change Register. This is where a schedule variance gets its legitimacy: an approved change explains a moved date; the absence of one means the date moved on its own.",
        bullets: [
          "Each change carries an ID, a description and the decision taken — approved, rejected, deferred.",
          "Rejected changes are worth keeping. They show what the project chose not to do, which is often the more interesting record.",
          "Attach the register rather than summarising it. The summary is the section; the register is the evidence.",
          "Where a milestone moved, point at the change ID that moved it.",
        ],
        example:
          "A report that shows nine approved changes and no rejected ones is describing a change process that approved everything. That is a finding about governance, and it belongs in the lessons table under change control.",
        sourceIds: ["dewr-template"],
      },
      {
        heading: "Rebaselining is not the same as being on time",
        body: "A rebaselined project measured against its new baseline reports zero variance, which is true and useless. Both facts belong in the report: the approved position the project was managed to, and the original commitment the department funded. Showing only the second looks like blame; showing only the first looks like success.",
        bullets: [
          "Report variance to the current baseline — it shows whether recent management held.",
          "Report variance to the original approval — it shows what the commitment actually cost in time.",
          "Name each rebaseline: when, which forum approved it, and why.",
          "If the two figures differ substantially, that gap is the story of the project.",
        ],
        example:
          "'On schedule against the revised baseline; twenty-two months later than the original approved date, following two rebaselines approved by the Project Board in March 2024 and August 2025.' Both true, and together they are informative in a way either alone is not.",
        sourceIds: ["dewr-template", "rmg134"],
      },
    ],
    questions: [
      {
        id: "cl-m1",
        moduleId: "milestones",
        prompt: "Which baseline does the milestone table report against?",
        options: [
          "The original baselined schedule in the approved PMP",
          "The most recent approved rebaseline",
          "Whichever baseline the Project Board last reviewed",
          "The schedule in force at the start of the final delivery phase",
        ],
        answer: 0,
        rationale:
          "The template asks for performance against the original baselined schedule. A rebaselined project measured only against its new baseline always looks on time.",
        optionNotes: [
          "",
          "Worth reporting as well, but on its own it conceals the movement.",
          "Board attention does not change which commitment is being reported against.",
          "This is a rebaseline by another name.",
        ],
      },
      {
        id: "cl-m2",
        moduleId: "milestones",
        prompt: "Why are rejected change requests worth reporting?",
        options: [
          "They record what the project deliberately chose not to do",
          "They demonstrate the change process was applied consistently",
          "They are required to reconcile the financial summary",
          "They explain why the schedule variance exceeded tolerance",
        ],
        answer: 0,
        rationale:
          "Approved changes explain what happened. Rejected ones show where the project held its scope, which is the harder decision and the one nothing else in the report captures.",
        optionNotes: [
          "",
          "True as a side effect, but it is not why the record is valuable.",
          "The financial summary reconciles against budget, not against change decisions.",
          "A rejected change did not move anything, so it explains no variance.",
        ],
      },
      {
        id: "cl-m3",
        moduleId: "milestones",
        prompt: "What does reporting a delay 'against tolerance' add?",
        options: [
          "Whether governance agreed it could move that far",
          "A more precise figure for the length of the delay",
          "The cost consequence of the additional time",
          "Confirmation that the delay was escalated to the Board",
        ],
        answer: 0,
        rationale:
          "Tolerance is the room agreed in advance. Reporting against it answers whether the control worked, rather than only whether the date moved.",
        optionNotes: [
          "",
          "Precision comes from the dates, not from the tolerance.",
          "Cost is reported separately in the financial summary.",
          "Escalation may follow a breach, but it is a different fact.",
        ],
      },
      {
        id: "cl-m4",
        moduleId: "milestones",
        prompt: "A project reports nine approved changes and no rejected ones. What does that suggest?",
        options: [
          "A change process that approved whatever was put to it",
          "Strong scope discipline throughout delivery",
          "That rejected changes were handled outside the register",
          "An unusually stable set of requirements",
        ],
        answer: 0,
        rationale:
          "A gate that never refuses anything is not a gate. It is worth naming in the lessons table under change control rather than passing over.",
        optionNotes: [
          "",
          "Discipline would show as changes considered and declined.",
          "Possible, and if so the register is incomplete — which is also a finding.",
          "Stable requirements would produce few change requests, not nine approvals.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-m-s1",
        moduleId: "milestones",
        context:
          "Your project was rebaselined twice, both approved by the Project Board. Measured against the current baseline every milestone was met. Measured against the original approved schedule, delivery was twenty-two months late.",
        prompt: "What does the milestone table show?",
        options: [
          "Both variances, with each rebaseline dated and attributed",
          "Variance to the current baseline, since both rebaselines were approved",
          "Variance to the original schedule, as the commitment that was funded",
          "Variance to the current baseline, with the original noted in lessons",
        ],
        answer: 0,
        rationale:
          "Each answers a different question — whether recent management held, and what the commitment cost in time. Showing one alone is either flattering or unfair.",
        optionNotes: [
          "",
          "Approval makes the movement legitimate; it does not make it invisible.",
          "This is closer to honest but reads as blame without the approvals alongside.",
          "Relegating it to lessons keeps it out of the table where a reader would look for it.",
        ],
      },
      {
        id: "cl-m-s2",
        moduleId: "milestones",
        context:
          "A key milestone, 'integration complete', was recorded as met in June. On checking, you find the definition was narrowed in April to exclude two of the five interfaces, and the narrowing was discussed at a working group but never raised as a change request.",
        prompt: "How should the milestone be reported?",
        options: [
          "Met as narrowed, stating the unapproved change",
          "Met in June, since the working group agreed the narrower definition",
          "Not met, because the original five interfaces were not delivered",
          "Met, with the two interfaces recorded as outstanding actions",
        ],
        answer: 0,
        rationale:
          "Both facts are load-bearing: what was actually achieved, and that the goalposts moved without going through change control. The second is the finding that improves the next project.",
        optionNotes: [
          "",
          "A working group is not a change authority, and the date alone conceals the redefinition.",
          "Three interfaces were integrated; this overstates the shortfall and loses the real issue.",
          "It captures the gap but not the governance failure that created it.",
        ],
      },
    ],
    assignment: {
      title: "Rebuild a milestone table with its variances",
      instruction:
        "Take a project you know and draft the milestone table with planned, actual and variance columns. Where the project was rebaselined, show variance to both baselines. Then write the change control paragraph.",
      prompts: [
        "Which milestones moved, and can you point at an approved change for each?",
        "Which moved because the definition changed rather than the date?",
        "How many changes were rejected, and what does that number say?",
      ],
      modelAnswer:
        "The exercise usually turns up one milestone that was met by quietly narrowing what it meant, and it is always the most useful line in the table.\n\nA workable format: 'Integration complete — planned Nov 2024 — rebaselined Mar 2025 — actual Jun 2025 — 31 weeks against original, 13 weeks against revised. Scope narrowed in April 2025 to exclude the two low-volume interfaces; agreed at the integration working group, not raised as a change request. CR-014 covers the date movement, not the scope change.'\n\nThat single row carries the delay, the approved part, the unapproved part, and where the record is incomplete. It also writes two lessons rows for you — one under schedule, one under change control — which is the general pattern: the milestone table is where lessons come from, not a separate exercise.\n\nOn rejected changes: if the answer is zero, say so in the change control paragraph rather than leaving the reader to notice. A process that approved eleven of eleven is worth a sentence.",
      criteria: [
        "Variance shown against the original baseline, not only the current one",
        "Each rebaseline dated and attributed to an approving forum",
        "At least one milestone examined for definition change, not just date change",
        "The change record's shape — including rejections — is commented on",
      ],
    },
  },
  {
    id: "benefits",
    number: 3,
    title: "Objectives, outcomes and benefits",
    subtitle: "Three different claims, and who owns each after closure",
    minutes: 0,
    slides: "",
    outcome: "Assign benefit ownership that survives closure, and schedule measurement that actually happens.",
    coreIdea:
      "Almost no benefit is realised during a project. Benefits accrue afterwards, in the operational business, over months or years — which means the entity that promised them is not the entity that delivers them, and closure is the handover point where that responsibility either transfers or evaporates.",
    sections: [
      {
        heading: "The money is spent before the benefit arrives",
        body: "The project spends the money and the business earns the return, usually long after the project has ceased to exist. This is not a flaw in how projects are run; it is what a project is. The consequence is that benefits realisation cannot be a project activity — by the time it is measurable there is no project. What closure can do is transfer ownership cleanly enough that measurement still happens.",
        bullets: [
          "Post-implementation review typically sits 6 to 12 months after closure, when effects have had time to appear.",
          "The Senior Responsible Officer remains accountable for benefits across the lifecycle, including after delivery ends.",
          "Realisation is the operational business's responsibility, supported by a named benefit owner per benefit.",
          "A benefit with no named owner is not a benefit; it is a hope recorded in a business case.",
        ],
        sourceIds: ["teal", "rmg106"],
      },
      {
        heading: "What a benefit owner has to have",
        body: "Naming an owner is the easy part and is usually where it stops. An owner who cannot act is decoration. Four things have to be true, and closure is the last moment at which you can make them true while anyone is still paying attention.",
        table: {
          caption: "The four conditions",
          head: ["Condition", "Test", "Common failure"],
          rows: [
            ["Named individual", "A person and role, not a branch or committee", "'The Service Delivery Group' — nobody"],
            ["Has agreed", "They have seen the number and accepted it", "Told after the fact, disputes it later"],
            ["Can influence it", "Their decisions plausibly move the measure", "Owner has no authority over the driver"],
            ["Has the measurement", "The data will exist without new work", "Measure requires a collection nobody funded"],
          ],
        },
        example:
          "A benefit owner who agrees to a 20 per cent contact-reduction target, but whose branch does not control the channel strategy driving contact volumes, will report against it honestly and helplessly for two years.",
        sourceIds: ["teal", "anao-perf"],
      },
      {
        heading: "Scheduling measurement that survives",
        body: "Measurement lasts when it rides on something that already exists for another reason. What usually ends it is decay rather than disagreement: the measurement was scheduled into a forward plan that was superseded, in a system that was decommissioned, by a team that was restructured. Durable measurement is boring by design — it uses data already being collected for another reason, and it lands in a cycle that exists anyway.",
        bullets: [
          "Prefer measures that ride on existing operational reporting over anything bespoke.",
          "Anchor the review date to an existing governance cycle, not to a standalone calendar entry.",
          "Write the measurement definition into the handover, so a successor can run it without archaeology.",
          "Record what would count as the benefit not being realised — and what happens then.",
        ],
        example:
          "'Reviewed at the December Service Performance Committee, using the standing contact-volume report' outlasts 'benefits review scheduled for December 2027' by roughly the length of one restructure.",
        sourceIds: ["rmg134", "teal"],
      },
      {
        heading: "Kinds of benefit, and double counting",
        body: "Benefits come in distinct kinds, and naming which kind each one is keeps the savings a business case promises within reach of the entity. The distinction that matters most at closure is whether a benefit is cashable — whether a budget line actually falls — because a non-cashable efficiency gain is real, worth having, and will not appear in anyone's bottom line.",
        table: {
          caption: "Four kinds, and what each means at closure",
          head: ["Kind", "What it is", "What closure must say"],
          rows: [
            ["Cashable saving", "A budget line falls", "Which line, whose budget, from when"],
            ["Non-cashable efficiency", "Time freed, not money released", "What the time is now used for, or that it is not"],
            ["Cost avoidance", "Spend that will not now occur", "What would have been spent, and the evidence it would have"],
            ["Effectiveness", "Better outcomes at the same cost", "The measure, and that no saving is claimed"],
          ],
        },
        bullets: [
          "Say which kind each benefit is. A closure report claiming savings that are non-cashable will be tested and found wanting.",
          "Non-cashable time savings need a stated destination — absorbed into existing workload is a legitimate answer, and it is not a saving.",
          "Check for double counting: two projects touching the same process frequently claim the same efficiency.",
          "Where a benefit was already counted in another business case, say so and halve it or drop it.",
        ],
        example:
          "'Caseworkers save 12 minutes per application' is worth having and is not $2m. It becomes $2m only if positions are removed or work is absorbed that would otherwise have needed new positions — and the report should say which, or say neither.",
        sourceIds: ["teal", "closure"],
      },
      {
        heading: "Objectives, business outcomes and key results",
        body: "These three answer different questions, and keeping them apart is what makes the section worth reading. An objective is what the project set out to do. A business outcome is the change in the world that justified the spending. A key result is the measure that tells you whether the outcome happened. Closure reports against all three, and the interesting content is where they disagree.",
        table: {
          caption: "Three different questions",
          head: ["Term", "The question", "At closure, report"],
          rows: [
            ["Objective", "What did we set out to do?", "Achieved, partially achieved, or not — against the original wording"],
            ["Business outcome", "What changed for the business or users?", "The measured or estimated change, with its baseline"],
            ["Key result", "How do we know?", "The metric, its target, and its actual"],
          ],
        },
        bullets: [
          "Quote the objective as originally written, not as it came to be described.",
          "An objective delivered while its outcome did not move is the most informative result in the report — say so.",
          "Key results carry a target and an actual. A key result with no target was a metric, not a key result.",
          "Where an objective was dropped or changed, record when and on whose decision.",
        ],
        example:
          "Objective: 'Provide providers with self-service visibility of application status.' Achieved. Business outcome: 'Reduce avoidable support contact.' Measured at 18 per cent against a target of 40. Key result: contacts per application, target 0.6, actual 0.83. The objective was met and the outcome largely was not — which is the finding, and it is invisible if all three are reported as one sentence.",
        sourceIds: ["anao-perf", "rmg134"],
      },
    ],
    questions: [
      {
        id: "cl-b1",
        moduleId: "benefits",
        prompt: "Why can benefits realisation not be completed as a project activity?",
        options: [
          "Benefits accrue in the business after delivery, when no project remains",
          "Project teams lack the analytical skills to measure benefits properly",
          "Benefits measurement is prohibited from being funded out of project budgets",
          "Business cases deliberately defer benefits to avoid scrutiny during delivery",
        ],
        answer: 0,
        rationale:
          "It is a timing fact, not a capability or funding one. The money is spent by the project and the return is earned by the business afterwards, which is why ownership must transfer at closure rather than being retained.",
        optionNotes: [
          "",
          "Skills vary, but a highly capable team still cannot measure an effect that has not happened yet.",
          "No such prohibition. Funding arrangements vary and are not the structural issue.",
          "Cynical, and it describes a failure mode rather than the reason benefits arrive late.",
        ],
      },
      {
        id: "cl-b2",
        moduleId: "benefits",
        prompt: "A closure report names 'the Service Delivery Group' as owner of a contact-reduction benefit. What is wrong?",
        options: [
          "A group cannot hold accountability — a named individual in a role is required",
          "Service Delivery is the wrong part of the organisation for this benefit",
          "Benefit ownership should sit with the Senior Responsible Officer, not a business area",
          "The benefit should be owned jointly by delivery and operations",
        ],
        answer: 0,
        rationale:
          "Ownership diffused across a group is ownership by nobody: no individual's performance depends on it and no calendar entry belongs to anyone. The SRO remains accountable overall, but each benefit needs a person.",
        optionNotes: [
          "",
          "Service Delivery may well be right. The failure is the level of specificity, not the area.",
          "The SRO is accountable across the lifecycle, which is not the same as owning each individual benefit.",
          "Joint ownership compounds the problem rather than fixing it.",
        ],
      },
      {
        id: "cl-b3",
        moduleId: "benefits",
        prompt: "Which measurement arrangement is most likely to still be running in two years?",
        options: [
          "A measure from standing reporting, reviewed at an existing committee",
          "A dedicated benefits dashboard built by the project before it closes",
          "A quarterly survey commissioned specifically to track the benefit",
          "A calendar reminder to the benefit owner to compile figures annually",
        ],
        answer: 0,
        rationale:
          "Durability comes from riding on things that exist for independent reasons. A bespoke dashboard loses its maintainer, a commissioned survey loses its funding, and a calendar reminder loses its owner in the next restructure.",
        optionNotes: [
          "",
          "Built by a team that will not exist to maintain it. These decay fastest of all.",
          "Needs recurring funding that nobody has committed past the project.",
          "Survives exactly as long as the individual stays in the role.",
        ],
      },
      {
        id: "cl-b4",
        moduleId: "benefits",
        prompt: "A benefit owner accepts a target they cannot influence. What is the most likely outcome?",
        options: [
          "Honest reporting of a measure that does not move, with no action available",
          "The owner will renegotiate the target at the first review point",
          "The benefit will be reassigned automatically to the area that controls the driver",
          "The measure will be quietly dropped from reporting within a year",
        ],
        answer: 0,
        rationale:
          "The predictable result is a conscientious owner reporting a flat line for years. Nothing in the arrangement triggers reassignment or renegotiation, and dropping it requires someone to notice — which is precisely what a diffuse arrangement prevents.",
        optionNotes: [
          "",
          "Possible, but it requires initiative the arrangement does not create.",
          "There is no automatic reassignment mechanism. Somebody would have to act.",
          "Sometimes true, but it assumes an active review that the failed arrangement makes unlikely.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-b-s1",
        moduleId: "benefits",
        context:
          "At closure, three benefits are listed. Two have named owners who have signed. The third — a $2.4m annual efficiency saving — is owned by a branch head who has been on leave throughout the handover period and has not seen the figure.",
        prompt: "What should the closure report say?",
        options: [
          "Record the benefit as having no agreed owner, and what must happen next",
          "Name the branch head as owner, since the role is correct even if the individual has not confirmed",
          "Escalate the benefit to the Senior Responsible Officer as an interim owner",
          "Hold the closure report open until the branch head returns and signs",
        ],
        answer: 0,
        rationale:
          "The report should describe the world as it is. An unagreed owner recorded as agreed is the exact defect that produces orphaned benefits two years later. Naming the gap and the action required transfers a real, visible obligation instead of a fictional one.",
        optionNotes: [
          "",
          "Recording unconfirmed acceptance as acceptance is how the record becomes untrue.",
          "SRO accountability is already continuous; substituting them as owner obscures the unresolved handover.",
          "Delaying closure indefinitely for one signature usually means the report is written under worse conditions later.",
        ],
      },
      {
        id: "cl-b-s2",
        moduleId: "benefits",
        context:
          "A benefit was forecast at $3.1m annually. At the 9-month post-implementation review the measured figure is $1.2m, and the shortfall is traced to lower-than-forecast take-up rather than to the system performing poorly.",
        prompt: "What is the most valuable thing the record can now capture?",
        options: [
          "The forecasting error itself — how take-up was estimated, and why optimistically",
          "A revised benefit forecast of $1.2m, replacing the original",
          "A remediation plan to raise take-up to the level originally forecast",
          "A note that the system performed as designed and the shortfall is not a delivery failure",
        ],
        answer: 0,
        rationale:
          "The system worked and the forecast did not. The transferable asset is why the forecast was wrong, because the same optimism will otherwise be applied to the next business case. Revising the number, remediating take-up and defending delivery are all reasonable — none of them stops the error recurring.",
        optionNotes: [
          "",
          "Necessary bookkeeping, but it records the outcome while discarding the cause.",
          "Possibly worth doing, and it does nothing for the next forecast made by someone else.",
          "True, and it reads as defensive. It closes the enquiry at the point it becomes useful.",
        ],
      },
    ],
    assignment: {
      title: "Test a benefit against the four conditions",
      instruction:
        "Take one benefit from a business case you know. Work it against the four conditions — named individual, has agreed, can influence, has the measurement — and write what is missing.",
      prompts: [
        "The benefit, stated with its number and period",
        "Named individual and role, or the gap",
        "Evidence they have agreed, or the gap",
        "Whether they can influence the driver, and how the measurement will be obtained",
      ],
      criteria: [
        "The owner is an individual in a role, or the absence is stated plainly",
        "The influence test is answered by naming the driver and who controls it",
        "The measurement identifies data that will exist without new funded work",
      ],
      modelAnswer:
        "Benefit: $2.4m annual reduction in avoidable support contact, from FY2027-28. Owner: Director, Provider Support Branch — named, and has seen the figure at the June governance meeting, but has not formally accepted it; acceptance is scheduled for the August committee and is the outstanding item. Influence: partial. The Director controls support staffing and triage, but contact volume is driven substantially by the notification policy owned by Policy Branch. This is the real gap — the target should be jointly held or the driver moved. Measurement: contact volumes are already reported monthly through the standing Service Performance pack; no new collection is needed, and the definition (inbound contacts tagged 'application status') is stable back to 2024.",
    },
  },

  {
    id: "lessons",
    number: 4,
    title: "Lessons that change behaviour",
    subtitle: "Why lessons registers fail, and what works instead",
    minutes: 0,
    slides: "",
    outcome: "Write a lesson that is specific, transferable and addressed to a decision someone will actually face.",
    coreIdea:
      "Every entity has a lessons learned register and almost none of them change what the next project does. The failure is not that lessons are not captured — it is that they are captured as sentiments rather than as decisions, and stored where nobody looking for a decision would search.",
    sections: [
      {
        heading: "Eighteen categories, and two columns each",
        body: "The full template does not ask for a free-form lessons narrative. It gives eighteen fixed rows, and each one is split into Strengths and Areas to improve, with a third column for recommendations to future projects. The structure is doing something useful: it forces you past the two or three areas you were already thinking about, and it makes the aggregate comparable across the department.",
        table: {
          caption: "The eighteen lessons categories",
          head: ["", "", ""],
          rows: [
            ["Governance arrangements", "Project management", "Project planning"],
            ["Budget", "Assurance", "Change control"],
            ["Risk management", "Schedule", "Roles and responsibilities"],
            ["Project communication", "Testing / QA / quality control", "Architecture / technical solution"],
            ["Partnering with other agencies", "Contribution to Closing the Gap", "Vendor management"],
            ["Training", "Deployment", "Transition to operations"],
          ],
        },
        bullets: [
          "Both columns are asked for. A category with only Areas to improve reads as a post-mortem; one with only Strengths reads as a defence.",
          "Contribution to Closing the Gap is a standing category, present whether or not the project was aimed at First Nations outcomes.",
          "The Tier 3 form uses open themes instead — governance, scope, stakeholder engagement, schedule, risk management, change control, transition to BAU, Closing the Gap — one row per lesson.",
          "Every row carries a recommendation: what a future project should repeat, improve or avoid.",
        ],
        example:
          "Vendor management and Training are the two categories most often left blank, and they are where the same lessons recur department-wide. A blank row is a claim that nothing happened worth recording, which is rarely true.",
        sourceIds: ["dewr-template", "dewr-tier3"],
      },
      {
        heading: "Where lessons actually go",
        body: "Lessons have a destination separate from the report. They are recorded in the Departmental Lessons Learned Register, and submitting the closure report does not lodge them. The distinction matters because the register is the only place another project will look.",
        bullets: [
          "The report carries lessons so the closure record is complete; the register carries them so they get reused.",
          "The Portfolio Project Office aggregates closure reports for trends — a vague lesson becomes a row of noise in the department's only cross-project view.",
          "A lesson written for the register has to make sense to someone with no knowledge of your project.",
          "Recording lessons in the register is an explicit checklist item, separate from completing the report.",
        ],
        example:
          "'Communication could have been better' aggregates to nothing. 'Eligibility rules were confirmed stable at design sign-off, then changed twice through Ministerial correspondence without reaching project governance' aggregates into a pattern about policy-dependent delivery that several projects would recognise.",
        sourceIds: ["dewr-factsheet", "dewr-announcement"],
      },
      {
        heading: "Making a register worth reading",
        body: "Read any lessons register and the entries look like this: 'engage stakeholders earlier', 'ensure requirements are well defined', 'improve communication between teams'. These are not lessons. They are the categories under which lessons would sit, if any had been written. Nobody has ever read 'engage stakeholders earlier' and changed a decision, because it contains no information about which stakeholders, how early, or what happened when you did not.",
        bullets: [
          "Written as sentiment, not as a decision that could have gone another way.",
          "Stored in a register organised by project, when the reader arrives with a problem.",
          "Generated in a workshop at the end, when memory has flattened into narrative.",
          "Never assigned to anyone with the standing to change the practice they describe.",
        ],
        example:
          "'Engage stakeholders earlier' versus 'The state housing authorities needed 11 weeks to approve the data-sharing schedule, which we discovered in week 3 of a 16-week build. Any project touching state housing data should start that approval before design begins.' Only one of those changes a plan.",
        sourceIds: ["lessons", "anao-gateway"],
      },
      {
        heading: "The shape of a usable lesson",
        body: "A lesson is usable when a reader facing a similar decision can act on it without contacting you. That requires four parts, and dropping any one of them returns it to sentiment.",
        table: {
          caption: "Four parts",
          head: ["Part", "Question it answers", "Example fragment"],
          rows: [
            ["Context", "When does this apply?", "Projects requiring data-sharing agreements with state agencies"],
            ["What happened", "What was the specific event?", "11-week approval cycle discovered in week 3 of a 16-week build"],
            ["Cost", "Why should I care?", "6-week schedule slip, $340k in held resources"],
            ["Action", "What should I do differently?", "Initiate the schedule approval before design starts, not at integration"],
          ],
        },
        sourceIds: ["lessons"],
      },
      {
        heading: "Why pooled numbers beat any single account",
        body: "The most valuable thing a closure report contributes to an entity is its numbers, pooled with other projects' numbers. How long did the approval actually take, against the estimate? By what factor did the integration estimate miss? Enough of these and the next business case can be forecast from what comparable work actually cost, rather than from what this team hopes.",
        bullets: [
          "Record estimate versus actual for the things that were estimated, not just the final totals.",
          "Capture the ratio, not only the absolute — a 3× miss on integration transfers; $400k does not.",
          "Note the class the project belongs to, so a future reader can tell whether it is comparable.",
          "Publish into a pool the next team will search, not into a project folder they will not.",
        ],
        example:
          "The Commonwealth's published Gateway lessons material exists precisely to serve this function — aggregated observations across many reviews, which is the only level at which a pattern becomes visible.",
        sourceIds: ["lessons", "anao-gateway"],
      },
      {
        heading: "Write it down the day it surprises you",
        body: "The four-part structure fixes how a lesson is written. It does not fix when, and the when is why registers are thin: a lesson recorded on the last day is recalled through the story the team has settled on. The alternative is unglamorous and works — capture at the moment of surprise, in a sentence, and shape it later.",
        bullets: [
          "Capture when something surprises you, not when the project ends. A one-line note with a date is enough.",
          "Record the estimate as well as the actual, at the point the estimate is made — otherwise nobody remembers what was expected.",
          "Ask at each release retro: what would we tell a team starting this next month? That is the lesson, in the only form that matters.",
          "Keep it blameless in wording and specific in fact. 'The vendor was slow' is neither.",
          "Write the lesson properly at closure from the notes, rather than from memory.",
        ],
        example:
          "A one-line note in week three — 'assumed state data-sharing approval was 2 weeks, told today it is 11' — is worth more than an hour of workshop in week sixteen, because by week sixteen the team remembers only that approvals were slow.",
        sourceIds: ["lessons"],
      },
    ],
    questions: [
      {
        id: "cl-l1",
        moduleId: "lessons",
        prompt: "Why does 'engage stakeholders earlier' fail as a lesson?",
        options: [
          "It names no context, event, cost or action, so nobody can act on it",
          "It is too critical of the stakeholder management approach taken",
          "It belongs in the risk register rather than the lessons register",
          "It repeats guidance already published in departmental methodology",
        ],
        answer: 0,
        rationale:
          "It is a category label, not a lesson. Which stakeholders, how early, and what it cost not to are the entire content — and all three are absent, so the reader ends where they started.",
        optionNotes: [
          "",
          "It is not critical at all, which is part of why it is comfortable and useless.",
          "Register placement is not the issue; the same sentence is empty in either.",
          "Duplicating methodology is a minor fault compared with containing no information.",
        ],
      },
      {
        id: "cl-l2",
        moduleId: "lessons",
        prompt: "Which is the most transferable form of a cost overrun lesson?",
        options: [
          "Integration exceeded estimate by 3.2×, across three external systems",
          "The project exceeded its integration budget by $840,000",
          "Integration proved more complex than anticipated during planning",
          "The integration vendor underperformed against contracted expectations",
        ],
        answer: 0,
        rationale:
          "A ratio plus a class definition lets a different team with different dollar figures apply it. An absolute overrun applies only to a project of the same size, and the other two contain no number at all.",
        optionNotes: [
          "",
          "Useful locally, but a team with a $200k integration cannot use a $840k figure.",
          "True of nearly every project ever run, and therefore actionable by nobody.",
          "Attributes cause without evidence, and does not help a team using a different vendor.",
        ],
      },
      {
        id: "cl-l3",
        moduleId: "lessons",
        prompt: "Lessons are captured in a workshop on the final day of a project. What is the main weakness of that timing?",
        options: [
          "Memory has compressed into a narrative, losing what would transfer",
          "Team members are demotivated and contribute less than they would earlier",
          "There is insufficient time to write the lessons up properly",
          "The project manager dominates the discussion at that stage",
        ],
        answer: 0,
        rationale:
          "By the end, a team has told itself the story of the project many times, and the story has smoothed over the branch points. What survives is a coherent account; what is lost is the messy specifics that made a decision hard at the time — which is exactly the transferable part.",
        optionNotes: [
          "",
          "Motivation may dip, but a motivated team recalling a flattened narrative still produces flat lessons.",
          "Write-up time is a scheduling problem, easily solved and not the substantive issue.",
          "A real group dynamic, and secondary to the memory effect that affects everyone present.",
        ],
      },
      {
        id: "cl-l4",
        moduleId: "lessons",
        prompt: "What makes reference class data more valuable than a project narrative for future forecasting?",
        options: [
          "Pooled estimate-versus-actual ratios reveal patterns no single account shows",
          "Numerical data is inherently more objective than written accounts",
          "Narratives are usually written to protect the reputation of the delivery team",
          "Future teams have insufficient time to read full project narratives",
        ],
        answer: 0,
        rationale:
          "A single project cannot tell you whether its 3× integration miss was bad luck or the norm. Twenty can. The value is in the pooling, which is why the data has to be published somewhere it accumulates.",
        optionNotes: [
          "",
          "Numbers carry their own biases, including in how the class was defined.",
          "Often true and beside the point — an honest narrative still cannot establish a base rate alone.",
          "A practical constraint, not the reason pooled data forecasts better.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-l-s1",
        moduleId: "lessons",
        context:
          "Your lessons register entry reads: 'Data-sharing approvals with state agencies took longer than expected and delayed integration.' A colleague says it is fine because it names the specific issue.",
        prompt: "What is still missing?",
        options: [
          "How long it took, what it cost, and what a future team should do",
          "The name of the state agency involved, for accountability",
          "An assessment of whether the delay was avoidable",
          "A recommendation that the department negotiate standing agreements",
        ],
        answer: 0,
        rationale:
          "It has context but no magnitude, no discovery point, no cost and no action. A reader now knows the category of problem and still cannot plan around it — which is where the register entry was before it was made specific.",
        optionNotes: [
          "",
          "Naming the agency invites defensiveness and adds little; the pattern matters more than the party.",
          "Worth knowing, but avoidability is a judgement that follows from the missing facts.",
          "That is one possible action, and asserting it skips the evidence that would justify it.",
        ],
      },
      {
        id: "cl-l-s2",
        moduleId: "lessons",
        context:
          "You have written eight specific, costed, actionable lessons. They are filed in the project's SharePoint folder, in the closure report appendix.",
        prompt: "What most limits their value?",
        options: [
          "Nobody with that problem will search a completed project's folder",
          "Eight lessons is too many for a reader to absorb in one sitting",
          "Appendices are conventionally treated as non-authoritative",
          "SharePoint permissions will likely restrict access to the original team",
        ],
        answer: 0,
        rationale:
          "Discoverability is the binding constraint. Readers arrive with a problem — 'how long do state data-sharing approvals take' — and search by problem, not by the name of a project they have never heard of. Well-written lessons in an unsearchable location perform identically to badly written ones.",
        optionNotes: [
          "",
          "Eight is a reasonable number, and a reader who found them would happily read all eight.",
          "A convention that would not matter if anyone were reading the appendix.",
          "A fixable technicality, and access is worthless without discovery anyway.",
        ],
      },
    ],
    assignment: {
      title: "Rewrite a sentiment as a lesson",
      instruction:
        "Take a real lessons-register entry you have seen — or write the sentiment version yourself — and rewrite it with all four parts: context, what happened, cost, action.",
      prompts: [
        "The original sentiment version",
        "Context: when does this apply?",
        "What happened, with specifics and magnitude",
        "Cost, and the action a future team should take",
      ],
      criteria: [
        "The context defines a class of work, so a reader can tell whether it applies to them",
        "The event carries a number — duration, factor or dollar figure",
        "The action is something a team could put in a plan, not an attitude to hold",
      ],
      modelAnswer:
        "Sentiment: 'Requirements from policy areas need to be clearer earlier.' Rewritten — Context: any delivery where eligibility rules are set by a policy area outside the delivery group. What happened: eligibility criteria were confirmed as stable at design sign-off in March, then changed twice (May, July) following Ministerial correspondence neither change was flagged through the project's governance. We rebuilt the rules engine twice. Cost: 5 weeks of a 22-week build, roughly $290k, and the second rebuild consumed the contingency that was covering integration. Action: for work depending on policy-set rules, do not treat design sign-off as rule stability. Ask the policy area directly what is currently before the Minister that could alter the rules, and build the rules engine to be configurable rather than compiled if the answer is anything other than 'nothing'.",
    },
  },

  {
    id: "handover",
    number: 5,
    title: "Transition to business as usual",
    subtitle: "What has to be true before the team can leave",
    minutes: 0,
    slides: "",
    outcome: "Specify an operational handover that does not depend on the delivery team remaining reachable.",
    coreIdea:
      "A handover is complete when the receiving team can run, support and change the thing without calling anyone who has left. That is the test worth setting, and it is a higher bar than a signed document.",
    sections: [
      {
        heading: "What the transition table records",
        body: "The Tier 3 form asks five things about each transition, and the middle one is the one that decides whether the row is true: evidence and status of acceptance. Not that a handover was planned or offered — that the receiving side took it.",
        table: {
          caption: "One row per thing transferred",
          head: ["Column", "What belongs there"],
          rows: [
            ["Deliverable transitioned", "The service, benefit, residual risk, issue or outstanding work being transferred"],
            ["BAU owner", "The business area taking ongoing ownership"],
            ["Evidence and status of acceptance", "How acceptance was given, and whether it has been"],
            ["Handover status", "Complete / In progress / Not started / Not required"],
            ["Outstanding actions", "Anything remaining, with a due date"],
          ],
        },
        bullets: [
          "Four statuses, and 'Not required' is one of them — say so explicitly rather than leaving a row blank.",
          "Tier 1 and Tier 2 projects document the approach in a Project Transition Plan and reference it here.",
          "Where the closure report claims outcomes are in place and transferred to BAU, this table is the evidence for that claim.",
        ],
        example:
          "'Evidence: accepted at the Service Delivery leadership meeting, 12 August, minuted.' That is a row a reader can check. 'Evidence: briefed to the branch' is a row that says the handover was announced.",
        sourceIds: ["dewr-tier3", "dewr-factsheet"],
      },
      {
        heading: "Assets, and their two owners",
        body: "Section 14 lists every asset the project developed that is now in use, and asks for a business owner and an IT owner separately. The separation is deliberate: the area that uses an asset and the area that keeps it running are rarely the same, and an asset with only one of the two named will fail in whichever direction was left blank.",
        bullets: [
          "Asset name, business owner, IT owner, location, and the timing of handover.",
          "Location means where it actually lives — an environment, a tenancy, a physical site — not a team name.",
          "Handover timing may be later than closure. Record the date and who is accountable for it happening.",
          "An asset in use with no IT owner keeps working until it needs patching, at which point nobody is funded to do it.",
        ],
        example:
          "A reporting database with a business owner in Performance Reporting and no IT owner runs fine for a year and then fails a security review, and the first question is who has been maintaining it. The answer is nobody.",
        sourceIds: ["dewr-template"],
      },
      {
        heading: "Can they work without you?",
        body: "A handover has worked when the receiving team can act on its own. There is one reliable sign that it has not landed yet: three months later, someone is still messaging a former team member who now works elsewhere. That informal channel is what makes an inadequate handover survivable, which is why it hides the problem instead of exposing it. The honest test is to ask what breaks if that person does not reply.",
        bullets: [
          "Can the receiving team deploy a change without the delivery team present?",
          "Can they diagnose the three most likely failures from documentation alone?",
          "Do they know what the system costs to run, and who pays?",
          "Do they know which parts are understood to be fragile, and why?",
        ],
        example:
          "A useful exercise before closure: have the receiving team perform a routine change with the delivery team explicitly unavailable for a day. What they need to ask is the handover backlog.",
        sourceIds: ["rmg106", "teal"],
      },
      {
        heading: "What transfers, and to whom",
        body: "Handover is several transfers, often to different places, and the closure report should say which went where. Bundling them into 'handed over to operations' is how run costs end up unfunded and licences lapse.",
        table: {
          caption: "The transfers",
          head: ["What", "Typically to", "Failure if unassigned"],
          rows: [
            ["Operational support", "Service desk / operations team", "Users report faults to nobody"],
            ["Change and enhancement", "Product or platform owner", "System freezes, then decays"],
            ["Run cost and licences", "A funded budget line", "Renewal lapses, service stops"],
            ["Residual risks", "Named risk owner in the entity register", "Risk disappears from view, not from existence"],
            ["Benefits measurement", "Named benefit owner", "Never measured, quietly dropped"],
            ["Data and records obligations", "Records / information governance", "Retention breach discovered at audit"],
          ],
        },
        sourceIds: ["closure", "rmg106"],
      },
      {
        heading: "Passing on what you know about the system",
        body: "Every delivered system has parts the team understands better than anyone else ever will — the integration that depends on a retry loop, the batch job with a timing window, the configuration with history behind it. Delivery teams rarely write these down, because writing them down feels like confessing. Not writing them down means the receiving team discovers each one during an incident.",
        bullets: [
          "List the parts you would not want to change without care, and say why.",
          "Name the failure modes you have already seen, and what fixed them.",
          "Record the workarounds in place and what they are compensating for.",
          "Say which dependencies are outside your control and who owns them.",
        ],
        example:
          "'The nightly reconciliation assumes the provider feed arrives before 02:00. It has been late twice; both times the job was rerun manually by the platform team. There is no alerting on this.' That paragraph is worth more than most handover packs.",
        sourceIds: ["teal"],
      },
      {
        heading: "Who is receiving, and can they",
        body: "Handover succeeds as a transfer of capability, and it is usually planned as a transfer of information. The receiving team may be smaller, differently skilled, already at capacity, or entirely unaware they are receiving anything. None of that is visible in a document-completeness check, and all of it determines whether the service survives contact with its first incident.",
        bullets: [
          "Confirm the receiving team knows and has agreed — being named in a plan is not agreement.",
          "Check capacity, not just capability: a team already at full load will absorb this by dropping something else.",
          "Identify the skills the delivery team had that the receiving team does not, and say so plainly.",
          "Agree the support model in terms someone can act on: hours, response expectations, escalation path, who is called at 2am.",
          "Name the first three months' contact point on both sides, and put an end date on it so it does not become permanent informal dependency.",
        ],
        example:
          "A platform built by six engineers handed to an operations team of two, neither of whom has worked with the framework. That is a legitimate arrangement if it is stated and resourced, and a failure waiting to happen if the handover pack simply lands in their inbox.",
        sourceIds: ["rmg106", "teal"],
      },
      {
        heading: "Data in a business system is a record",
        body: "Information created or received in the course of Australian Government business is a Commonwealth record under the Archives Act 1983, including the data sitting inside a business system. It cannot be destroyed because a project ended, a contract lapsed, or a cloud subscription was not renewed. Destruction requires authority — normally a records authority issued by the National Archives, which sets the minimum retention period.",
        bullets: [
          "Records authorities give permission to destroy, retain or transfer, and set minimum retention.",
          "The obligation attaches to the information, not to the system that happens to hold it.",
          "Migration to a new system does not restart or discharge the obligation.",
          "Access must be maintained for the prescribed period, which can outlast several platforms.",
          "Disposal can mean secure destruction, transfer to the Archives, or transfer to another entity.",
        ],
        example:
          "A cloud workspace deleted when the subscription lapsed took eleven years of case data with it. Nobody decided to destroy those records; that is precisely the problem — destruction without authority is still destruction.",
        sourceIds: ["archives", "naa-data"],
      },
      {
        heading: "Sequencing the shutdown",
        body: "Decommissioning in the right order protects both the evidence the closure report depends on and the records the entity is obliged to keep. The ordering is not complicated; it is simply never planned, because switching things off is treated as an operational task rather than part of closure.",
        bullets: [
          "Sentence the records first: what must be kept, for how long, under which authority.",
          "Export and verify — read the export back and confirm it is complete before anything is deleted.",
          "Retain the closure evidence separately, with its queries and definitions.",
          "Confirm no downstream system, report or interface still consumes the data.",
          "Revoke access and integrations before deleting anything, so failures surface while recovery is still possible.",
          "Only then release infrastructure, close accounts and cancel subscriptions.",
        ],
        example:
          "Turn off the integrations a fortnight before deleting the data. Anything that breaks in that fortnight was a dependency nobody had documented, and you still have the system to turn back on.",
        sourceIds: ["naa-data", "closure"],
      },
    ],
    questions: [
      {
        id: "cl-h1",
        moduleId: "handover",
        prompt: "What is the strongest practical test of whether a handover is complete?",
        options: [
          "The receiving team can run and change it without anyone who has left",
          "A handover document has been signed by both the delivery and receiving managers",
          "The receiving team has attended a full walkthrough of the system",
          "All documentation has been transferred to the operational repository",
        ],
        answer: 0,
        rationale:
          "Signature, walkthrough and document transfer are all inputs that can each be completed while leaving the receiving team unable to act. The only test that matters is capability without the original team.",
        optionNotes: [
          "",
          "Signatures record that a process occurred, not that capability transferred.",
          "A walkthrough is attended and largely forgotten; it demonstrates exposure, not readiness.",
          "Documents can be complete, transferred and unusable.",
        ],
      },
      {
        id: "cl-h2",
        moduleId: "handover",
        prompt: "Why does informal contact with departed team members conceal a handover failure?",
        options: [
          "It keeps the service running, so the gap never surfaces as a problem",
          "It breaches the terms of the formal handover agreement",
          "Departed staff give inconsistent advice without current context",
          "It creates a dependency that the entity cannot contractually enforce",
        ],
        answer: 0,
        rationale:
          "The channel works, which is the problem. Because nothing visibly fails, nobody funds the documentation or training that would remove the dependency — until the person stops replying, usually during an incident.",
        optionNotes: [
          "",
          "Formality is not the issue; an informal channel that revealed the gap would be fine.",
          "Advice quality varies, and good advice conceals the gap just as effectively.",
          "Enforceability is a real risk and downstream of the concealment.",
        ],
      },
      {
        id: "cl-h3",
        moduleId: "handover",
        prompt: "Run costs and licences are recorded as 'handed to operations' without a funded budget line. What is the likely consequence?",
        options: [
          "A renewal lapses because no budget holder recognises the cost as theirs",
          "Operations absorbs the cost within existing allocations without difficulty",
          "Finance identifies the gap during the next budget cycle and corrects it",
          "The vendor continues service and invoices retrospectively",
        ],
        answer: 0,
        rationale:
          "An unassigned cost has no owner to approve it at renewal. The failure typically surfaces when a licence expires and the service degrades, which is later and more expensive than assigning the line at closure.",
        optionNotes: [
          "",
          "Sometimes possible, and it cannot be assumed — unbudgeted costs are exactly what gets refused.",
          "Budget processes work from submitted requirements, and nobody submitted this one.",
          "Vendors generally stop service rather than extend unpaid credit.",
        ],
      },
      {
        id: "cl-h4",
        moduleId: "handover",
        prompt: "Why do delivery teams under-document known fragility?",
        options: [
          "Recording weaknesses feels like confessing fault, so nobody does",
          "Fragility is usually discovered only after the delivery team has left",
          "Documentation standards do not include a section for it",
          "The information is considered too technical for a handover audience",
        ],
        answer: 0,
        rationale:
          "The team usually knows exactly where the weak points are. The obstacle is that writing them into a closure document reads as a confession at the moment the team's record is being assessed — the same incentive problem the whole course keeps returning to.",
        optionNotes: [
          "",
          "The team generally knows before it leaves. That is what makes the omission costly.",
          "A missing template section is trivially fixed and is not why the information is withheld.",
          "Receiving teams are technical. Audience is not the barrier.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-h-s1",
        moduleId: "handover",
        context:
          "Two weeks before closure, you run a test where the receiving team attempts a routine configuration change with your team unavailable. They complete it in four hours instead of the expected 30 minutes, and needed to read source code to find a setting.",
        prompt: "How should this be treated?",
        options: [
          "As a successful test that produced a specific gap to close before handover",
          "As a failure of the handover, requiring the transition date to be deferred",
          "As acceptable, since the change was completed without escalation",
          "As evidence the receiving team needs additional general training",
        ],
        answer: 0,
        rationale:
          "The test did its job: it converted an unknown dependency into a named, fixable gap while there was still time. Deferring is an overreaction to one finding, accepting it wastes the finding, and 'more training' generalises a problem that is actually one undocumented setting.",
        optionNotes: [
          "",
          "One documentation gap found early is not grounds to defer; it is the test working as intended.",
          "Completion is not the standard — four hours and a source-code dive is the signal.",
          "General training does not fix a specific missing document, and blames the receiving team.",
        ],
      },
      {
        id: "cl-h-s2",
        moduleId: "handover",
        context:
          "Your team knows the nightly reconciliation job fails if the upstream provider feed arrives after 02:00. It has happened twice, both fixed by a manual rerun. There is no alerting. The system owner asks whether there is anything they should know about ongoing risks.",
        prompt: "What is the right response?",
        options: [
          "Document the failure mode, the occurrences and the missing alerting, with an owner",
          "Note it verbally, since it has only occurred twice and was resolved both times",
          "Add alerting before closure so the risk no longer needs to be disclosed",
          "Record it as a low-severity defect in the backlog for future prioritisation",
        ],
        answer: 0,
        rationale:
          "This is exactly the fragility that must transfer in writing with an owner. Building alerting is good and does not remove the need to disclose the underlying dependency. Verbal notes and unowned backlog items both evaporate when the people change.",
        optionNotes: [
          "",
          "Verbal transfer of an incident pattern survives about as long as the listener's role does.",
          "Worth doing, and it addresses detection rather than the dependency itself — still disclose it.",
          "An unowned backlog entry is where known problems go to be forgotten.",
        ],
      },
    ],
    assignment: {
      title: "Write the fragility section",
      instruction:
        "For a system you know, write the section a delivery team would not want to write: what is fragile, what has already failed, what workarounds are in place, and what is outside your control.",
      prompts: [
        "Parts you would not change without care, and why",
        "Failure modes already seen, and what fixed them",
        "Workarounds in place and what they compensate for",
        "Dependencies outside your control, and who owns them",
      ],
      criteria: [
        "At least one item would be uncomfortable to put in a report, and is included anyway",
        "Each failure mode names what was actually done to recover, not just that it recovered",
        "External dependencies name an owner, not just a system",
      ],
      modelAnswer:
        "Fragile: the eligibility rules engine is compiled rather than configured; a rule change requires a build and a release, so an urgent policy change cannot be applied in under five working days. Do not promise faster. Seen failures: nightly reconciliation has failed twice (14 Mar, 2 Jun) when the provider feed arrived after 02:00; both were recovered by a manual rerun by the platform team the following morning, with no data loss but a one-day lag in status accuracy. There is no alerting — the failures were noticed by a caseworker both times. Workarounds: the retry loop on the provider API compensates for intermittent 503s from their gateway, which their team has acknowledged and not scheduled a fix for. If the retry count is reduced, expect failures. Outside our control: provider gateway availability (owner: Provider Systems, external vendor), and the identity broker token lifetime (owner: Platform Identity team) — a change to that lifetime would break our session handling and we would not be notified.",
    },
  },

  {
    id: "financial",
    number: 6,
    title: "Financial and contractual closeout",
    subtitle: "Settling the money before the people go",
    minutes: 0,
    slides: "",
    outcome: "Close the financial and contractual position: costs finalised, assets recognised, obligations either discharged or transferred with an owner.",
    coreIdea:
      "The financial close is the one part of closure with a hard deadline and a statutory audience, so it repays doing while the team is still together. Every commitment either settles now or transfers to a named owner; anything left in between resurfaces later as an unexplained accrual, a lapsed warranty, or a payment nobody can approve.",
    sections: [
      {
        heading: "The table the template asks for",
        body: "Section 13 is a grid, not a narrative: one row per financial year, with approved budget and actual expenditure each split into operating and capital, and the variance for both. The split is the part people get wrong, because a project thinks in total cost and the department reports in OPEX and CAPEX separately.",
        table: {
          caption: "Financial summary, as the template lays it out",
          head: ["Financial year", "Approved OPEX", "Approved CAPEX", "Actual OPEX", "Actual CAPEX", "Variance"],
          rows: [
            ["2024–25", "$4.2m", "$11.8m", "$4.9m", "$10.6m", "+$0.7m / −$1.2m"],
            ["2025–26", "$3.1m", "$9.4m", "$3.4m", "$12.9m", "+$0.3m / +$3.5m"],
            ["Total", "$7.3m", "$21.2m", "$8.3m", "$23.5m", "+$1.0m / +$2.3m"],
          ],
        },
        bullets: [
          "Approved budget means the originally approved figure. Where the project was rebaselined, say so and give both.",
          "Variance is reported per column, not as a single net number — an OPEX overspend offset by a CAPEX underspend is two findings, not zero.",
          "Explain each material variance in the comments rather than leaving the reader to infer a cause from the numbers.",
          "The Tier 3 form adds an ASL column — Average Staffing Level — per financial year, alongside budget and actual.",
        ],
        example:
          "A net variance of zero can hide a project that expensed a million dollars it expected to capitalise. Reporting the two separately is what makes that visible, which is the whole reason the template splits the columns.",
        sourceIds: ["dewr-template", "dewr-tier3"],
      },
      {
        heading: "What must be true before the ledger closes",
        body: "Financial closure is a set of positive assertions: every cost incurred is recorded in the right period, every commitment is either paid or accrued, everything capitalised is an asset that exists and works, and everything that will keep costing money has a budget holder who knows.",
        bullets: [
          "All invoices received, matched and either paid or accrued in the correct period.",
          "Purchase orders and commitments closed, or carried with a documented reason.",
          "Capitalised costs tested against what was actually delivered — assets that exist and are in use.",
          "Work-in-progress cleared: nothing left sitting in a WIP account with no owner.",
          "Recurring costs transferred to a named, funded budget line for the next financial year.",
        ],
        example:
          "A program closes in May. In September, Finance queries a $410k accrual nobody can explain. The delivery team is gone; the invoice related to a variation cancelled in March that was never backed out. Two hours of work in May became two weeks of forensic work in September.",
        sourceIds: ["closure"],
      },
      {
        heading: "Capitalise or expense",
        body: "The distinction matters beyond accounting tidiness: capitalised costs sit on the balance sheet and depreciate, so an over-capitalised project reports a smaller hit now and an unexplained drag for years. The test is whether the spend produced an identifiable asset the entity controls and will derive benefit from — not whether the project would prefer it that way.",
        table: {
          caption: "Common judgements at closure",
          head: ["Spend", "Usual treatment", "Where it goes wrong"],
          rows: [
            ["Build of the delivered system", "Capitalise", "Includes work on abandoned options"],
            ["Discovery and options analysis", "Expense", "Capitalised to protect the operating result"],
            ["Data migration", "Depends on whether it creates the asset", "Treated inconsistently across releases"],
            ["Training and change management", "Expense", "Bundled into the build cost"],
            ["Post-go-live defect fixing", "Usually expense", "Capitalised as 'completion of build'"],
            ["Licences prepaid beyond year end", "Prepayment", "Expensed in full, distorting the year"],
          ],
        },
        example:
          "Discovery explored four options and three were abandoned. The cost of the three is not part of the asset — an asset is the thing you have, not the thinking that led to it. Capitalising all four overstates the asset and understates what the decision cost.",
        sourceIds: ["closure"],
      },
      {
        heading: "Contract closeout",
        body: "A contract runs on past the point where the work stops. Final acceptance is a formal act with consequences: it starts warranty periods, releases retentions, and closes the window in which defects are the supplier's problem rather than yours. Signing it because the project is over — rather than because the obligations were met — transfers risk quietly and permanently.",
        bullets: [
          "Confirm every deliverable was received and accepted against the contract, not against the current expectation.",
          "Record the warranty or defects-liability period, when it ends, and who will act on it.",
          "Settle retentions, milestone holdbacks and any liquidated damages position.",
          "Confirm intellectual property, source code and data have actually been delivered — not merely licensed in principle.",
          "Check transition-out obligations: what the supplier must still do, and for how long.",
          "Note obligations that survive termination — confidentiality, records access, audit rights.",
        ],
        example:
          "A twelve-month warranty is worth nothing if it expires unnoticed. Name the person who holds it, put the end date somewhere they will see it, and record what to do if a defect appears in month eleven.",
        sourceIds: ["cprs", "closure"],
      },
      {
        heading: "Unspent funds and the incentive to spend them",
        body: "Money left at the end of a project belongs somewhere specific: depending on the funding arrangement it lapses, returns to the entity, or must be formally rephased. The problem is that everyone involved knows an underspend can look like a poorly built business case, which creates real pressure to spend it on something defensible before the year closes. Naming that pressure is more useful than pretending it does not exist.",
        bullets: [
          "Establish early what happens to an underspend under this funding arrangement — it is rarely the project's to keep.",
          "Report underspend as a variance with its cause, exactly like an overspend. Both indicate the estimate was wrong.",
          "Late scope added to consume a budget is a scope decision and must go through the same approval as any other.",
          "Where funds are rephased into a following year, record the approval and what they are now committed to.",
          "An underspend caused by descoping is a different fact from one caused by efficient delivery. Say which.",
        ],
        example:
          "'Delivered $3.1m under budget' reads as good news and may mean the scope was cut by a third. The honest line names both: what was not built, and what was genuinely cheaper than forecast.",
        sourceIds: ["closure", "rmg134"],
      },
    ],
    questions: [
      {
        id: "cl-f1",
        moduleId: "financial",
        prompt: "Why is an unexplained accrual at closure more expensive than it looks?",
        options: [
          "It is resolved months later by people who were not there",
          "Accruals attract additional audit scrutiny under the PGPA framework",
          "It prevents the entity from closing its financial statements on time",
          "Unresolved accruals must be written off against the following year",
        ],
        answer: 0,
        rationale:
          "The cost is the forensic work later. What takes two hours while the team remembers the variation takes weeks once they have gone and only the ledger entry remains.",
        optionNotes: [
          "",
          "Audit interest is a consequence, not the reason it costs more.",
          "Entities close their statements regardless; the item is resolved or provided for.",
          "No such automatic rule — the treatment depends on what the accrual turns out to be.",
        ],
      },
      {
        id: "cl-f2",
        moduleId: "financial",
        prompt: "Discovery explored four options; three were abandoned. How should that cost be treated?",
        options: [
          "Expensed — an asset is what you have, not the analysis that led to it",
          "Capitalised in full, as necessary cost of producing the delivered asset",
          "Capitalised in proportion to the option that proceeded",
          "Deferred and amortised over the life of the delivered system",
        ],
        answer: 0,
        rationale:
          "Capitalisation requires an identifiable asset the entity controls. Abandoned options produced none. Including them overstates the asset and hides what the decision actually cost.",
        optionNotes: [
          "",
          "This is the common error, and it protects the operating result at the cost of a misstated balance sheet.",
          "Apportionment does not fix it — the abandoned work still produced no asset.",
          "Deferral has the same effect as capitalising, by another route.",
        ],
      },
      {
        id: "cl-f3",
        moduleId: "financial",
        prompt: "What does final acceptance under a contract actually do?",
        options: [
          "Starts warranties, releases retentions, closes the defects window",
          "Confirms the supplier has been paid in full for all work performed",
          "Formally terminates the contract and all obligations under it",
          "Transfers ownership of the delivered system to the entity",
        ],
        answer: 0,
        rationale:
          "It is a substantive legal act with timing consequences, which is why signing it because the project is over rather than because obligations were met transfers risk to the entity.",
        optionNotes: [
          "",
          "Payment usually follows acceptance; it is not what acceptance means.",
          "Several obligations survive — confidentiality, warranty, records access, audit rights.",
          "IP and ownership are governed by their own clauses, not by acceptance.",
        ],
      },
      {
        id: "cl-f4",
        moduleId: "financial",
        prompt: "Which is most often missed at contract closeout?",
        options: [
          "Naming who holds the warranty and when it ends",
          "Obtaining a final invoice from the supplier",
          "Confirming the last milestone payment was made",
          "Recording the contract as complete in the register",
        ],
        answer: 0,
        rationale:
          "Invoices, payments and register updates all have owners in the finance process. A warranty is a right with no natural owner once the project dissolves, so it expires unnoticed.",
        optionNotes: [
          "",
          "Suppliers reliably pursue their own final invoices.",
          "Payment runs are systematised and chased by the supplier.",
          "Administrative, and usually prompted by the procurement team.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-f-s1",
        moduleId: "financial",
        context:
          "Two weeks before closure the supplier asks you to sign final acceptance so they can invoice before their financial year end. Three low-severity defects remain open, all with agreed fixes scheduled for the following month.",
        prompt: "What is the right course?",
        options: [
          "Withhold, or accept subject to the defects, recorded in writing",
          "Sign, since the defects are low severity and the fixes are already agreed",
          "Sign, and raise the defects separately as warranty claims after acceptance",
          "Refuse to engage until all three defects are closed, regardless of timing",
        ],
        answer: 0,
        rationale:
          "Acceptance changes who carries the defects. Signing while they are open moves three known problems onto the entity in exchange for the supplier's reporting convenience. Conditional acceptance with the obligation written down is the ordinary commercial answer and costs nobody anything.",
        optionNotes: [
          "",
          "Severity is not the issue — an agreed fix before acceptance is a right; after acceptance it is a request.",
          "This converts a present entitlement into a future claim, which is strictly worse.",
          "Unnecessarily rigid; conditional acceptance meets both parties' needs.",
        ],
      },
      {
        id: "cl-f-s2",
        moduleId: "financial",
        context:
          "Your program capitalised $31m of $47m spend. Included in the capitalised figure are $2.1m of change management and training, and $1.4m of post-go-live defect fixing.",
        prompt: "What should closure do?",
        options: [
          "Flag both to Finance before the ledger closes, with reasoning",
          "Leave the treatment as approved, since it was agreed with Finance during delivery",
          "Reclassify both to expense immediately without further consultation",
          "Disclose the amounts in the closure report and leave the accounting unchanged",
        ],
        answer: 0,
        rationale:
          "Both are conventionally expensed and both are large enough to matter. Closure is the last point at which the judgement can be revisited cheaply, and the decision belongs jointly with Finance — which is why it is raised with reasoning rather than either accepted silently or reclassified unilaterally.",
        optionNotes: [
          "",
          "A treatment agreed mid-delivery was agreed on expectations, not on what was ultimately delivered.",
          "The delivery team does not own the accounting judgement, and acting alone invites reversal.",
          "Disclosure without correction leaves a known misstatement in place.",
        ],
      },
    ],
    assignment: {
      title: "Close the position",
      instruction:
        "For a piece of work you know, write the financial and contractual closing position: commitments, capitalisation judgements you would question, and every contractual obligation that outlives the project.",
      prompts: [
        "Open commitments, and whether each is settled, accrued or carried",
        "One capitalisation judgement you would put back to Finance, and why",
        "Warranty or defects-liability periods: end dates and who holds them",
        "Recurring costs and the funded budget line receiving them",
      ],
      criteria: [
        "Every surviving obligation has an end date and a named holder",
        "The capitalisation question is argued from what was delivered, not from preference",
        "Recurring costs name a budget line, not a business area",
      ],
      modelAnswer:
        "Commitments: two purchase orders remain open — $84k with the integration vendor, to be accrued as the work was performed in June and invoiced in July; $12k of unused contingency on the training PO, which should be closed rather than carried. Capitalisation to question: $2.1m of change management and training is inside the capitalised figure. It produced no asset the entity controls and is conventionally expensed; I would put this back to Finance with the delivery breakdown before the ledger closes rather than after. Warranty: twelve-month defects liability on the integration build, expiring 14 August 2027, held by the Assistant Director, Platform Services — recorded in the platform team's risk register with a calendar entry, because a warranty with no holder expires unnoticed. Transition-out: the supplier must provide source code and build documentation within 30 days of acceptance; this is outstanding and acceptance should not be signed until it is delivered. Recurring: $310k p.a. licences and hosting, transferred to cost centre PLT-4420 from FY2027-28, accepted by the Platform Services budget holder at the July finance meeting.",
    },
  },
  {
    id: "openitems",
    number: 9,
    title: "Closing the open items",
    subtitle: "Quality, feedback, and everything that outlives the project",
    minutes: 0,
    slides: "",
    outcome: "Close out quality, team and stakeholder sections honestly, and leave no open item without a decision and a named owner.",
    coreIdea:
      "The back half of a closure report is where things either transfer or quietly evaporate. Every open item has exactly three legitimate destinations — closed, formally accepted, or carried to a named person with a date — and 'ongoing' is not one of them.",
    sections: [
      {
        heading: "The three questions the form asks about risk",
        body: "The Tier 3 form reduces risk at closure to three yes/no questions and a plan reference. They are worth answering even on the full template, because between them they cover everything a reader needs to know about what is still live.",
        table: {
          caption: "The risk gates at closure",
          head: ["Question", "If yes"],
          rows: [
            ["Does the risk plan highlight any issues — realised risks — that occurred?", "List them from the attached RiskNet2 plan"],
            ["Are any risks outside appetite or tolerance?", "Identify each and summarise its status"],
            ["Are there risks requiring ongoing management in BAU?", "Name the risk, the BAU owner, and the planned management approach"],
          ],
        },
        bullets: [
          "The form asks for the RiskNet2 Plan ID and whether the plan is attached — a reference, not a retyped summary.",
          "A realised risk is an issue. Recording it as a risk that 'may occur' after it has occurred is the commonest error here.",
          "Outside appetite is a governance fact, not a severity rating: it means the entity had said it would not accept this, and does.",
          "Every risk continuing into BAU needs a named owner, not a receiving branch.",
        ],
        example:
          "Answering 'no' to all three is a strong claim: no realised issues, nothing outside tolerance, nothing to carry. It is occasionally true, and a reader will check it against the milestone and financial variances before believing it.",
        sourceIds: ["dewr-tier3", "dewr-template"],
      },
      {
        heading: "Completion criteria, quality and the team",
        body: "Three review dimensions that templates ask for and delivery people skip. Completion criteria are the conditions agreed at the start for calling the project done — reporting against them rather than against a general sense of doneness is what stops closure being a matter of opinion. Quality is not scope: a delivered feature that fails under load has been delivered and is not finished. And team performance is asked for in most templates and answered with a thank-you list, which wastes the only chance anyone gets to record what the delivery model actually cost.",
        table: {
          caption: "What each dimension asks",
          head: ["Dimension", "The question", "The usual non-answer"],
          rows: [
            ["Completion criteria", "Were the agreed conditions for 'done' met?", "'All deliverables were completed.'"],
            ["Quality", "Does it work under real conditions?", "'The solution passed user acceptance testing.'"],
            ["Team performance", "What did the delivery model cost, and what worked?", "A list of names and thanks"],
          ],
        },
        bullets: [
          "Quote the completion criteria as agreed, and mark each met, partially met or waived — with who waived it.",
          "Quality means defect rates, performance under load, accessibility conformance and security position, not test sign-off.",
          "Known defects accepted into production belong here, with severity and owner, not buried in the risk table.",
          "Team performance: resourcing model, vacancy and turnover, reliance on individuals, and what you would staff differently.",
        ],
        example:
          "'Delivered with 14 known defects accepted into production, 2 of them severity 3, all with owners in the platform backlog. Peak load tested to 3× forecast; accessibility audited at WCAG 2.1 AA with two outstanding AAA items.' That is a quality statement. 'Passed UAT' is a note that a meeting happened.",
        sourceIds: ["rmg106", "anao-perf"],
      },
      {
        heading: "Follow-on actions and recommendations",
        body: "Three distinct things belong here, and separating them is what makes each one land. A lesson is for someone else, on a different project. A recommendation is for this entity, about how it works. A follow-on action is unfinished work from this project that someone must now pick up. The discipline worth borrowing is that at closure every open issue is either closed or becomes a follow-on action recommendation — there is no third state where it simply stops being mentioned.",
        table: {
          caption: "Three different things",
          head: ["Type", "Audience", "Example"],
          rows: [
            ["Lesson", "Future projects, anywhere", "Opt-in take-up should be forecast from opt-in precedents"],
            ["Recommendation", "This entity, about its process", "Sentencing sign-off before any decommissioning date is set"],
            ["Follow-on action", "A named person, about this work", "Rebuild the niche reporting function before the legacy register retires"],
          ],
        },
        bullets: [
          "Every open issue at closure is closed, accepted, or converted to a follow-on action with an owner and a date.",
          "'Ongoing' is not a state. It means nobody decided.",
          "Recommendations name who can act on them — a process owner, not the organisation in general.",
          "Say where each recommendation was directed and whether it was accepted. An unaccepted recommendation is still worth recording.",
        ],
        example:
          "The most valuable line in a closure report is often a recommendation that changes a control: 'sentencing sign-off is a precondition of setting any decommissioning date'. One sentence, accepted, and every future decommissioning in the entity is safer. That is a different kind of output from a lesson, and filing it as one loses it.",
        sourceIds: ["lessons", "rmg106"],
      },
      {
        heading: "Stakeholder feedback",
        body: "Templates ask for it, and it usually appears as a paragraph asserting that stakeholders were satisfied. The useful version reports who was asked, what they said including the unflattering parts, and what it means for the thing now in operation. Treat it like any other claim: measured, estimated or asserted.",
        bullets: [
          "Name the groups consulted and how — survey, interview, workshop — and how many responded.",
          "Report dissent, not just endorsement. Unanimous positive feedback usually means the wrong people were asked.",
          "Separate feedback about the product from feedback about the delivery, since they transfer to different owners.",
          "Mark it asserted where it is impressionistic, exactly as elsewhere in the report.",
        ],
        example:
          "'Consulted: 4 provider organisations (interview), 61 internal caseworkers (survey, 38% response). Caseworkers rated the status screen positively; the strongest negative theme was that the notification wording still generates calls, which is a live issue transferred to Policy Branch as follow-on action A3.' Feedback that leads somewhere.",
        sourceIds: ["anao-perf"],
      },
      {
        heading: "Artefacts and the agreement to close",
        body: "The artefacts section is an index, and its job is to make the project's outputs findable by someone who does not know they exist. The closure agreement is the act that ends the project, and signing it means the signatories accept that everything listed has in fact transferred — which is why it belongs last, after the sections that say what is being transferred.",
        bullets: [
          "List each artefact with its location and its owner, not just its name.",
          "Include the things people forget: architecture decisions, data dictionaries, test evidence, contracts, the benefits plan.",
          "Say which artefacts are records with a retention obligation, and where they are held.",
          "The agreement names who signs, what they are attesting to, and the date.",
          "A signature is an acceptance of the transfers described. If a benefit has no owner, that is on the page above the signature, not hidden.",
        ],
        example:
          "'Signed by the Senior Responsible Officer, confirming that the benefits, risks and obligations recorded in sections 6 to 9 have been accepted by the owners named there.' That sentence makes signing mean something. 'Signed to confirm project closure' means the project has stopped, which everybody already knew.",
        sourceIds: ["rmg106", "archives"],
      },
    ],
    questions: [
      {
        id: "cl-x3",
        moduleId: "openitems",
        prompt: "An action in the closure report is assigned to the project team. What is wrong?",
        options: [
          "The project team is dissolving, so the action has no owner",
          "Actions should always be assigned to the Senior Responsible Officer",
          "Actions cannot be carried past closure under the assurance framework",
          "Project teams lack authority to complete post-closure actions",
        ],
        answer: 0,
        rationale:
          "It is the same defect as a benefit owned by a branch: an entity that will not exist cannot be chased, and nobody's work depends on it. Reassign to an individual who remains, or close it.",
        optionNotes: [
          "",
          "The SRO holds overall accountability; individual actions need individual owners.",
          "Actions are routinely carried past closure — they just need real owners.",
          "Authority is not the problem. Existence is.",
        ],
      },
      {
        id: "cl-x4",
        moduleId: "openitems",
        prompt: "What should the closure agreement signature attest to?",
        options: [
          "That the transfers described were accepted by the owners named",
          "That the project has ceased activity and released its resources",
          "That the report is factually accurate in every particular",
          "That all objectives and benefits were achieved as planned",
        ],
        answer: 0,
        rationale:
          "Tying the signature to the transfers is what makes signing consequential. If a benefit has no owner, the signatory is declining to sign that transfer — which forces the gap into the open rather than letting closure proceed around it.",
        optionNotes: [
          "",
          "True and trivial. Everyone can already see the project stopped.",
          "Nobody can attest to every particular, and demanding it makes the signature meaningless.",
          "Would make the agreement unsignable for any project with a shortfall, which is most of them.",
        ],
      },
      {
        id: "cl-x5",
        moduleId: "openitems",
        prompt: "What is the difference between a lesson and a recommendation at closure?",
        options: [
          "A lesson is for future projects anywhere; a recommendation is for this entity's process",
          "A lesson is retrospective; a recommendation is forward-looking",
          "A lesson is written by the team; a recommendation comes from governance",
          "A lesson is informal; a recommendation requires formal endorsement",
        ],
        answer: 0,
        rationale:
          "They have different audiences and different fates. A recommendation that changes a control makes every future project safer; filed as a lesson it goes into a pool nobody with authority reads.",
        optionNotes: [
          "",
          "Both look forward. The difference is who acts.",
          "Either can be written by either. Authorship is not the distinction.",
          "Both can be formal. Endorsement is not what separates them.",
        ],
      },
      {
        id: "cl-x6",
        moduleId: "openitems",
        prompt: "An issue is still open at closure and is marked 'ongoing'. What is wrong?",
        options: [
          "'Ongoing' is not a state — the issue is closed, accepted, or a follow-on action with an owner",
          "Open issues cannot be carried past closure under most frameworks",
          "It should have been reclassified as a risk before closure",
          "Issues must be escalated to the Senior Responsible Officer when unresolved",
        ],
        answer: 0,
        rationale:
          "'Ongoing' records that nobody decided. Every open issue at closure has exactly three legitimate destinations, and each of them names someone.",
        optionNotes: [
          "",
          "They can be carried — as follow-on actions with owners and dates.",
          "Reclassifying an issue as a risk converts an obligation to fix into an obligation to watch.",
          "Escalation may be appropriate and is not a resolution state.",
        ],
      },
      {
        id: "cl-x7",
        moduleId: "openitems",
        prompt: "Which is a quality statement rather than a scope statement?",
        options: [
          "14 known defects accepted into production, 2 at severity 3, peak load tested to 3x forecast",
          "All agreed deliverables were completed and accepted by the business",
          "The solution passed user acceptance testing with no outstanding blockers",
          "Scope was delivered in full following two approved variations",
        ],
        answer: 0,
        rationale:
          "Quality asks whether it works under real conditions. Defect counts, severities and load figures answer that; deliverable completion and test sign-off answer whether the thing exists.",
        optionNotes: [
          "",
          "Completion of deliverables is scope.",
          "A test event, reported as an outcome.",
          "Scope again, with the variations doing the interesting work.",
        ],
      },
      {
        id: "cl-x8",
        moduleId: "openitems",
        prompt: "Stakeholder feedback in a closure report is unanimously positive. What should a reader suspect?",
        options: [
          "The wrong people were asked, or dissent was not reported",
          "The project was unusually well received",
          "Feedback was collected too late to capture early frustration",
          "The sample was too small to be representative",
        ],
        answer: 0,
        rationale:
          "Any change of substance produces someone who disliked it. Unanimity usually indicates a selected audience or a filtered write-up, and the dissent is the part with information in it.",
        optionNotes: [
          "",
          "Possible, and it is the least likely explanation and the one to test last.",
          "Timing affects what is captured; it rarely eliminates dissent entirely.",
          "A small sample produces noise, not uniform approval.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-x-s1",
        moduleId: "openitems",
        context:
          "The outstanding items section lists eleven risks. Nine name an individual and a destination register. Two read 'Risk: data quality in migrated records — ongoing, Service Delivery' with no rating, no treatment and no review date.",
        prompt: "What is the right treatment for those two?",
        options: [
          "Record them as untransferred, and put that in front of the signatory",
          "Assign them to the Service Delivery branch head to match the other nine",
          "Remove them, since items without treatment plans cannot be meaningfully transferred",
          "Carry them in the project's own register until an owner can be found",
        ],
        answer: 0,
        rationale:
          "The closure agreement attests that transfers were accepted. Two that were not accepted are exactly what the signatory needs to see, because they are the only items where signing changes anything. Assigning a name nobody agreed to is how the record becomes untrue.",
        optionNotes: [
          "",
          "Matching the format without matching the substance is the defect, not the fix.",
          "Deleting a live risk because it is inconvenient to transfer is the worst option available.",
          "There will be no project register to carry them in.",
        ],
      },
      {
        id: "cl-x-s4",
        moduleId: "openitems",
        context:
          "Closure is next week. Of 23 issues raised during delivery, 19 are closed. Of the rest, two have agreed fixes scheduled for the next release, one waits on a Policy decision with no date, and one nobody can now reproduce.",
        prompt: "How should the four be treated?",
        options: [
          "Two become follow-on actions, one a dependency with a named chaser, one closed as unreproducible",
          "All four are carried forward as open issues for the receiving team",
          "The three actionable become follow-on actions; the unreproducible stays open in case it recurs",
          "All four transfer to the entity risk register for ongoing monitoring",
        ],
        answer: 0,
        rationale:
          "Each has a different correct destination, and naming them individually is the work. Closing the unreproducible one with the reason recorded is a decision; leaving it open is not, and it will sit there for years.",
        optionNotes: [
          "",
          "'Carried forward' to a team is the pattern that produces orphaned issues.",
          "Leaving one open indefinitely avoids the decision rather than making it.",
          "Converting issues to risks turns an obligation to fix into an obligation to watch.",
        ],
      },
    ],
    assignment: {
      title: "Draft the outstanding items section",
      instruction:
        "For a piece of work you know, write the outstanding risks, issues, dependencies and actions as a transfer table. Every row names an individual, a destination and a review date — or states plainly that it has none.",
      prompts: [
        "Risks: owner, rating, treatment, destination register, review date",
        "Issues: owner, impact if unresolved, resolution path or formal acceptance",
        "Dependencies: the other party, what is owed, by when, who chases it",
        "Actions: owner, due date, and the consequence of it not being done",
      ],
      criteria: [
        "No row is owned by a team, a branch or the project",
        "At least one item is recorded as untransferred if that is the truth",
        "Every dependency names a person to chase, not only a system",
      ],
      modelAnswer:
        "Risk R1: identity broker token lifetime may change without notice, breaking session handling. Owner: Assistant Director, Platform Services. Rating: medium. Treatment: registered as a consuming system with Platform Identity and notification requested; note there is no automatic notification list. Destination: Platform Services risk register PS-R-118. Review: December committee. Issue I1: 312 appeal records migrated with a null status code, currently unreadable in the new system. Owner: Director, Case Management. Impact if unresolved: those applicants cannot be served without manual lookup against the retained export. Path: remediation scheduled for the November release; if it slips, accepted as a manual workaround with the export as source. Dependency D1: Policy Branch must confirm the revised eligibility wording before the rules engine can be finalised. Owed by: Director, Eligibility Policy. Due: 30 September. Chased by: Assistant Director, Platform Services — named because 'Policy Branch' is not someone you can email a reminder to. Action A1: transfer the benefits measurement definition into the Service Performance pack. Owner: Assistant Director, Performance Reporting. Due: before the December review. If not done: the $2.4m benefit has no measurement and cannot be reported. UNTRANSFERRED: Risk R4 (data quality in migrated records) has no agreed owner. Service Delivery has been approached twice and has not accepted it. This is recorded here rather than assigned, and needs the SRO to resolve before the agreement is signed.",
    },
  },


  {
    id: "writing",
    number: 10,
    title: "Writing it: choosing and completing the template",
    subtitle: "Two forms, an assessment grid, and where the report goes",
    minutes: 0,
    slides: "",
    outcome:
      "Choose the right template for the project's tier, complete it so a reader finds the decision-relevant content, and submit it to the right places.",
    coreIdea:
      "The department has two closure templates and they are structured differently, not merely sized differently. Pick by tier, complete every section the form asks for — justifying rather than deleting the ones that do not apply — and remember that nobody downstream will check your work. The craft that follows matters precisely because there is no safety net.",
    sections: [
      {
        heading: "Which template, and what changes between them",
        body: "Tier 1 and Tier 2 projects use the full template: Document Control and Key Project Contacts, then fifteen numbered sections. Tier 3 projects use the simplified form released in July 2026, which is a set of tables rather than numbered prose. The obligation is the same at both tiers; the shape of the answer is not.",
        table: {
          caption: "The same project, reported two ways",
          head: ["What is being reported", "Full template", "Tier 3 form"],
          rows: [
            ["Overall result", "Inferred from sections 4, 5 and 6", "A single Achieved / Partially achieved / Not achieved at the top"],
            ["What was delivered", "§7 management deliverables, §8 project-specific", "One delivery summary table, planned against delivered"],
            ["Schedule", "§9 milestones against the baselined PMP", "Key milestones table with variance and comments"],
            ["Benefits", "§11 with ID, measure, owner, timing", "Benefits table with status, BAU owner and next steps"],
            ["Handover", "§10 outcomes and §14 asset management", "Transition BAU table, including evidence of acceptance"],
            ["Risk", "Covered by the §3 approval assertions", "Three explicit yes/no questions and a RiskNet2 Plan ID"],
            ["Overall judgement", "§4 Project Manager's Report, in prose", "A seven-area assessment grid with fixed ratings"],
            ["Lessons", "Eighteen fixed categories, Strengths and Areas to improve", "Free themes, one row per lesson"],
          ],
        },
        example:
          "The Tier 3 form is easier to complete and harder to fudge, because it makes you commit to a rating in a box rather than describe a situation in a paragraph. That is worth knowing even if you are completing the full template — write section 4 as though you had to pick one of three words.",
        sourceIds: ["dewr-template", "dewr-tier3"],
      },
      {
        heading: "The assessment grid, and what evidence means there",
        body: "The Tier 3 form ends with seven assessment areas, each with a fixed rating scale and a column headed Evidence. The ratings are the part that gets aggregated across the department; the evidence column is the part that makes your rating defensible when someone asks.",
        table: {
          caption: "The seven areas and their scales",
          head: ["Assessment area", "Rating options"],
          rows: [
            ["Scope delivered", "Achieved / Partially achieved / Not achieved"],
            ["Schedule", "On time / Minor delay / Significant delay"],
            ["Budget", "Within / Over / Under"],
            ["Benefits", "Achieved / On track / Not achieved"],
            ["Transition to business as usual", "Complete / Outstanding actions"],
            ["Stakeholder engagement", "Effective / Partially effective / Needs improvement"],
            ["Project governance", "Effective / Partially effective / Needs improvement"],
          ],
        },
        bullets: [
          "Note that Budget has no 'good' option — Within, Over and Under are three descriptions, not a scale from best to worst.",
          "Benefits offers 'On track', which is the honest answer for most projects at closure, because benefits usually land afterwards.",
          "Transition is binary: Complete, or Outstanding actions. There is no partial credit, and outstanding actions need owners.",
          "Evidence means a fact a reader could check — a date, a figure, a decision reference. Not a restatement of the rating.",
        ],
        example:
          "Weak: 'Schedule — Minor delay — the project experienced some delays but recovered well.' Strong: 'Schedule — Minor delay — six weeks against the original date, within the eight-week tolerance; no rebaseline required.' Same rating, and only one of them survives a question.",
        sourceIds: ["dewr-tier3"],
      },
      {
        heading: "Signing it off and sending it on",
        body: "Both forms end in approvals, and both accept email approval in place of a signature provided it is attached. Once approved, the report goes to your group Project Management Office and to the Portfolio Project Office — and that is the end of the process, because the PPO does not review it.",
        bullets: [
          "Full template: Project Board, SRO, Project Manager, Senior User or Business Owner, plus any other applicable roles.",
          "Tier 3 form: SRO, Project Manager, Business Owner, plus others as applicable.",
          "Attach the email where approval came that way — the form says so explicitly.",
          "Lessons go separately to the Departmental Lessons Learned Register. Submitting the report does not lodge them.",
          "Send the approved report to the group PMO and the PPO as soon as practicable rather than waiting for a review that will not come.",
        ],
        example:
          "The two-destination rule catches people out. A report approved by the SRO and filed in the project's own SharePoint has not been submitted, and the lessons in it will never reach anyone who could use them.",
        sourceIds: ["dewr-template", "dewr-tier3", "dewr-announcement"],
      },
      {
        heading: "Structure for a reader in a hurry",
        body: "Assume your reader arrives with one question and about ninety seconds. They will scan for their answer, and if it is not findable in that time they either ask you directly or decide for themselves what it probably was. Structure is therefore doing real work here: it is the difference between a document that gets used and one that gets filed.",
        bullets: [
          "Lead with what was promised, what was delivered, and the gap. One page, no preamble.",
          "Put the benefits table where it can be found without reading the narrative.",
          "Give shortfalls their own heading. Buried bad news reads as concealed bad news.",
          "Put detail in appendices, but keep every claim's evidence reference in the body.",
        ],
        sourceIds: ["anao-perf", "rmg106"],
      },
      {
        heading: "The shortfall paragraph",
        body: "Every substantial project misses something. The instinct is to distribute those misses through the document so that none of them lands hard, which produces a report where nothing is wrong and nothing is trusted. The alternative is a single, direct passage that states what was not achieved, by how much, and why — early, in plain terms.",
        bullets: [
          "State the shortfall in the same units as the original commitment.",
          "Give the cause without allocating blame, and distinguish forecast error from delivery failure.",
          "Say what was learned, and where that lesson has been recorded.",
          "Do not pair it with a compensating success in the same sentence. That reads as deflection.",
        ],
        example:
          "'The forecast $3.1m annual saving is currently measuring at $1.2m. The system performs as designed; take-up is at 41 per cent against a forecast of 85 per cent. The forecasting method — which assumed take-up equivalent to the 2023 online lodgement rollout — is recorded in the lessons pool as an over-optimistic comparator for opt-in services.'",
        sourceIds: ["anao-perf", "lessons"],
      },
      {
        heading: "Language that survives scrutiny",
        body: "Certain constructions signal to an experienced reader that a claim is weaker than it appears, and they will be tested first. Removing them is not about writing style; it is about not spending the reader's trust on sentences that cannot repay it.",
        table: {
          caption: "Constructions to avoid",
          head: ["Written", "Read as", "Better"],
          rows: [
            ["Successfully delivered", "Delivered, with 'successfully' doing no work", "Delivered [what], on [date], against [baseline]"],
            ["Broadly in line with expectations", "Missed, by an amount not stated", "Missed by X per cent; expectation was Y"],
            ["Stakeholders were engaged throughout", "We held meetings", "[Group] approved [decision] on [date]"],
            ["Lessons have been captured", "A workshop occurred", "N lessons recorded in [pool], of which [example]"],
            ["Within the revised budget", "Over the original budget", "Delivered at $X against original $Y, revised to $Z"],
          ],
        },
        sourceIds: ["anao-perf"],
      },
      {
        heading: "Assume only the first page is read",
        body: "Assume one page is read. Not because readers are lazy — because a Deputy Secretary with forty minutes and eleven papers will read your first page and skim for anything that contradicts it. Everything else in the report exists to be checked by someone who has a specific question, which is a different job and a different reader.",
        bullets: [
          "Write the first page as though it is the whole report, then let the rest support it.",
          "Put the gap, the unresolved transfers and the money on that page. They are what a decision turns on.",
          "Length is not thoroughness. A 40-page report with the finding on page 27 has hidden it, whatever the intention.",
          "Detail belongs in appendices with the body carrying the reference — reachable, not in the way.",
          "If a section exists only because the template has the heading, say 'not applicable' and why, rather than filling it.",
        ],
        example:
          "The test: hand your first page to someone who has never heard of the project and ask what they would do next. If they cannot name a decision, the page is describing the project rather than closing it.",
        sourceIds: ["anao-perf", "rmg106"],
      },
    ],
    questions: [
      {
        id: "cl-w1",
        moduleId: "writing",
        prompt: "Why should shortfalls be given their own heading rather than distributed through the narrative?",
        options: [
          "Buried bad news reads as concealed, and costs credibility",
          "Departmental templates require a dedicated shortfalls section",
          "It makes the report shorter and easier to scan",
          "It isolates negative content so senior readers can skip it",
        ],
        answer: 0,
        rationale:
          "A reader who finds a significant miss tucked inside a paragraph about something else immediately re-reads everything sceptically, looking for what else was placed carefully. Directness is cheaper than the suspicion it prevents.",
        optionNotes: [
          "",
          "Template requirements vary and would not explain why the practice is right.",
          "It does aid scanning, which is a side benefit rather than the reason.",
          "The purpose is to make it findable, not skippable — this inverts the intent.",
        ],
      },
      {
        id: "cl-w2",
        moduleId: "writing",
        prompt: "An experienced reader sees 'broadly in line with expectations'. What do they conclude?",
        options: [
          "The target was missed, by an amount the writer did not state",
          "The result was within an acceptable tolerance that was defined in advance",
          "The expectations themselves were never quantified",
          "The writer lacks the data to make a precise statement",
        ],
        answer: 0,
        rationale:
          "Results that meet expectations are reported as meeting them, with the number. The hedge appears when the number would not flatter, so the construction reliably signals a miss and invites the reader to test it.",
        optionNotes: [
          "",
          "A defined tolerance would be stated as a tolerance, with the figure.",
          "Sometimes true, and the phrase is used just as often where expectations were perfectly clear.",
          "Missing data would more naturally be disclosed as missing data.",
        ],
      },
      {
        id: "cl-w3",
        moduleId: "writing",
        prompt: "Why should a shortfall not be paired with a compensating success in the same sentence?",
        options: [
          "It reads as deflection, and undermines the success being cited",
          "It makes the sentence too long for a senior audience",
          "Successes and shortfalls belong in separate sections by convention",
          "It implies a causal relationship between the two that may not exist",
        ],
        answer: 0,
        rationale:
          "The pairing is transparent, and the cost is asymmetric: the shortfall is not softened, and the success now looks like it was deployed defensively rather than reported on its merits.",
        optionNotes: [
          "",
          "Length is trivial next to the credibility effect.",
          "Convention is not the reason, and both can appear in the same section written separately.",
          "An occasional side effect, but not the main problem with the construction.",
        ],
      },
      {
        id: "cl-w4",
        moduleId: "writing",
        prompt: "What should the first page of a closure report contain?",
        options: [
          "What was promised, what was delivered, and the gap between them",
          "A summary of the project's governance arrangements and delivery approach",
          "Acknowledgement of the contributions of delivery partners and stakeholders",
          "The financial position, including final costs against the revised budget",
        ],
        answer: 0,
        rationale:
          "It is the question every reader has, and the one that determines how they read the rest. Governance, acknowledgements and finance all matter and none of them is what the reader opened the document to find.",
        optionNotes: [
          "",
          "Governance describes how the work was run, not what it achieved.",
          "Appropriate somewhere, and it delays the answer the reader came for.",
          "Important to Finance specifically, and against the revised budget it answers the wrong question.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-w-s1",
        moduleId: "writing",
        context:
          "Your draft states: 'While the take-up target was not fully achieved, the platform delivered strong performance and high user satisfaction, and the project was completed within the revised budget.'",
        prompt: "What is the most important single edit?",
        options: [
          "Separate the shortfall, with figures, and report against the original",
          "Replace 'strong performance' and 'high user satisfaction' with measured figures",
          "Remove 'while', which frames the shortfall as a concession",
          "Add the reason take-up fell short of the target",
        ],
        answer: 0,
        rationale:
          "All four edits are worth making. The first is the one that changes the document's character: it stops the sentence functioning as a device for absorbing bad news, and it removes the 'revised budget' construction in the same move. The other edits improve a sentence that should not exist in this shape.",
        optionNotes: [
          "",
          "Necessary, and it improves a sentence whose structure is the deeper problem.",
          "A good catch on framing, and the smallest of the four in effect.",
          "Should certainly be added — in the separated shortfall passage, not in this sentence.",
        ],
      },
      {
        id: "cl-w-s2",
        moduleId: "writing",
        context:
          "A senior reviewer returns your draft with the comment: 'Can we soften the benefits section? The numbers are accurate but the framing is quite stark for an incoming Deputy Secretary.'",
        prompt: "What is the most defensible response?",
        options: [
          "Add context and cause, keeping every figure and the shortfall heading",
          "Soften the language as requested, since the figures remain available in the appendix",
          "Decline to change anything, on the basis that the numbers are accurate",
          "Add the successes achieved elsewhere alongside the shortfall to balance the section",
        ],
        answer: 0,
        rationale:
          "The reviewer's concern is legitimate — a stark section without cause or context is harder to act on, not just harder to read. Context and explanation are real improvements; removing figures or diluting the heading is not, and balancing with unrelated successes is the deflection pattern.",
        optionNotes: [
          "",
          "Appendix availability does not repair a body text that misleads.",
          "Refusing engagement wastes a reasonable point about how the section reads.",
          "This is the compensating-success pattern, and it damages both claims.",
        ],
      },
    ],
    assignment: {
      title: "Write the shortfall paragraph",
      instruction:
        "For a piece of work you know, write the passage stating what was not achieved: the shortfall in original units, the cause, whether it was forecast error or delivery failure, and where the lesson is recorded.",
      prompts: [
        "The shortfall, in the same units as the original commitment",
        "The cause, distinguishing forecast error from delivery failure",
        "Where the lesson has been recorded, and in what form",
      ],
      criteria: [
        "The shortfall is stated against the original commitment, not a revision",
        "Forecast error and delivery failure are explicitly distinguished",
        "No compensating success appears in the same passage",
      ],
      modelAnswer:
        "The business case forecast a $3.1m annual reduction in processing cost from FY2027-28. Current measurement at nine months post-release indicates $1.2m annualised, a shortfall of $1.9m against the original commitment. The cause is forecast error rather than delivery failure: the system performs to specification and processes within the designed service levels, but take-up is at 41 per cent against a forecast 85 per cent. The forecast assumed take-up equivalent to the 2023 online lodgement rollout, which was a mandatory channel change; this service is opt-in. That comparator error is recorded in the departmental lessons pool as entry LP-2026-118, classed against opt-in digital service forecasting, with the recommendation that opt-in take-up be forecast from opt-in precedents only.",
    },
  },
];

/*
 * The curriculum, in the order a learner meets it.
 *
 * Process first, then the artefacts it produces — which is how closure
 * actually runs at DEWR, and the opposite of how the first version of this
 * course was built. Declaring the order here rather than by position in the
 * array above means a stage can be inserted, moved or retired by editing one
 * line, and the numbering follows automatically.
 */
const CLOSURE_ORDER = [
  "purpose",        // what closure is, and why a project cannot close without one
  "process",        // the six activities and the fifteen-item checklist
  "accountability", // SRO, Board, Senior User, group PMO, PPO, assurance
  "evidence",       // baselines, measurement, what you may claim
  "deliverables",   // management artefacts, and what the project built
  "milestones",     // schedule against baseline, tolerances, change control
  "benefits",       // objectives, outcomes, benefits and their owners
  "handover",       // transition to BAU, assets, records and decommissioning
  "openitems",      // risks, issues, dependencies, actions
  "financial",      // OPEX/CAPEX against original approval
  "lessons",        // the eighteen categories, and the departmental register
  "writing",        // the two templates, the assessment grid, submission
] as const;

export const closureModules: Module[] = CLOSURE_ORDER.map((id, index) => {
  const found = closureModuleDefs.find((module) => module.id === id);
  /* A typo here would silently drop a stage, so fail loudly at load. */
  if (!found) throw new Error(`Closure curriculum references unknown stage "${id}"`);
  return { ...found, number: index + 1 };
});
