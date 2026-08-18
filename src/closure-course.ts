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
  {
    id: "aga-standard",
    title: "Project closure reporting standard for digital and ICT-enabled projects",
    publisher: "Australian Government Architecture / Digital Transformation Agency",
    url: "https://architecture.digital.gov.au/standard/project-closure-reporting-standard-digital-and-ict-enabled-projects",
    note: "The standard an Australian Government digital or ICT-enabled project closure report is actually assessed against. Seven criteria, each rated Strong, Emerging or Nil, self-assessed by the agency before the report is finalised. This is the spine of this course.",
    checked: CLOSURE_REVIEWED,
  },
  {
    id: "aga-templates",
    title: "Digital project closure report templates",
    publisher: "Australian Government Architecture / Digital Transformation Agency",
    url: "https://architecture.digital.gov.au/design/digital-project-closure-report-templates",
    note: "Templates built by the DTA with the ATO to meet the standard. One for Tier 1 and Tier 2 projects, one for Tier 3 and smaller work. Agencies may use their own template provided it meets the criteria.",
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

export const closureModules: Module[] = [
  {
    id: "purpose",
    number: 1,
    title: "What closure is actually for",
    subtitle: "Accountability and learning, not administration",
    minutes: 0,
    slides: "",
    outcome: "Explain who reads a closure report, what decision it informs, and why most are written to be filed rather than read.",
    coreIdea:
      "A closure report is the first piece of evidence about whether an investment was worth making. Writing it well means working against the moment: the people who know most are dispersing, and the document is due when time is shortest.",
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
        heading: "The standard you are actually assessed against",
        body: "For Australian Government digital and ICT-enabled projects there is a published standard for this document, and it is short enough to hold in your head. The Digital Transformation Agency's closure reporting standard sets seven criteria, and asks the agency to self-assess its draft against each one as Strong, Emerging or Nil before finalising it. Everything else in this course is depth behind one of those seven.",
        table: {
          caption: "The seven criteria",
          head: ["#", "The report records...", "Covered here in"],
          rows: [
            ["1", "Performance against the scope agreed in the business case, with the rationale and impact of any change", "Stage 8"],
            ["2", "Performance against the agreed schedule, with the rationale and impact of any slippage", "Stage 8"],
            ["3", "Outcomes achieved and benefits realised against the benefits management plan", "Stage 3"],
            ["4", "Performance against the agreed budget, with the rationale and impact of any change", "Stages 6 and 8"],
            ["5", "Completion of assurance activities under the Assurance Plan agreed with the DTA", "Stage 11"],
            ["6", "Fit-for-purpose transition arrangements into business as usual", "Stages 5 and 9"],
            ["7", "Lessons learned, and how they will be applied to other projects", "Stage 4"],
          ],
        },
        bullets: [
          "Self-assessed by the agency, so the honest rating is the useful one — a report rated Strong on everything by its own author tells the reader nothing.",
          "Strong almost always means the same extra thing: not just what changed, but why, and what it cost.",
          "Several criteria require artefacts attached, not merely referenced — the original business case, the lessons learned register.",
          "Agencies may use their own template. The criteria apply either way.",
        ],
        example:
          "The pattern repeats across all seven. Emerging records what happened; Strong explains why it happened and what followed from it. A schedule table showing an eight-week slip is Emerging. The same table plus 'the identity broker token lifetime changed without notice, costing 11 weeks and $3.8m of rework' is Strong.",
        sourceIds: ["aga-standard", "aga-templates"],
      },
      {
        heading: "Why someone independent checks your closure",
        body: "Above certain values, a Commonwealth project's closure is independently reviewed. The Department of Finance runs a series of independent checkpoints across a project's life called the Gateway Review Process, numbered Gate 0 to Gate 6. The last of them, Gate 6, is the Benefits Realisation review: an independent check that the investment delivered what was promised, that benefits have named owners, and that the arrangements to keep harvesting them survive the project's disappearance. The gate exists precisely because self-reported closure was found not to be reliable.",
        bullets: [
          "Gateway applies to non-corporate Commonwealth entities above the thresholds: $30m procurement or infrastructure, $30m with an ICT component of at least $10m, $50m for programs.",
          "Gate 6 assesses delivery of the purpose and benefits of the investment, not delivery of the scope.",
          "It looks for benefits that are identified, owned, and still being measured after the team has gone.",
          "The Senior Responsible Officer is the accountable party — not the project manager.",
        ],
        example:
          "A $42m program with a $14m ICT component is inside scope on two counts. Its Gate 6 review will ask who owns the benefit in eighteen months. If the answer is 'the project', there is no answer.",
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
    id: "benefits",
    number: 3,
    title: "Benefits realisation",
    subtitle: "Why benefits are the business's job, not the project's",
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
    title: "Handover to business as usual",
    subtitle: "What has to be true before the team can leave",
    minutes: 0,
    slides: "",
    outcome: "Specify an operational handover that does not depend on the delivery team remaining reachable.",
    coreIdea:
      "A handover is complete when the receiving team can run, support and change the thing without calling anyone who has left. That is the test worth setting, and it is a higher bar than a signed document.",
    sections: [
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
    id: "records",
    number: 7,
    title: "Decommissioning, data and records",
    subtitle: "What the law requires you to keep after you switch it off",
    minutes: 0,
    slides: "",
    outcome: "Decommission a system without destroying Commonwealth records or losing access the entity is obliged to maintain.",
    coreIdea:
      "Data held in a government business system is a Commonwealth record, and the obligation to keep it accessible outlives the system holding it. Decommissioning is therefore a records decision before it is a technical one.",
    sections: [
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
        heading: "Keeping it readable, years from now",
        body: "Accessibility is the obligation, and it asks more than storage does. If the only way to read the data is software the entity no longer licenses, running on an operating system it no longer supports, the obligation is not met in any practical sense — and the failure is discovered when someone asks for the data, usually under FOI or in litigation.",
        table: {
          caption: "Retention approaches at decommissioning",
          head: ["Approach", "Access in five years", "When it is appropriate"],
          rows: [
            ["Leave the system running", "Good, at full run cost", "Short residual period, active use continues"],
            ["Migrate records to the successor", "Good, if the migration is complete", "A successor exists and the records fit"],
            ["Export to an open, documented format", "Good, with the schema retained", "Most decommissioning of retired systems"],
            ["Retain a database backup", "Poor — needs the original software", "Almost never sufficient on its own"],
            ["Virtual machine snapshot", "Fragile, degrades over time", "Short-term bridge only"],
            ["Transfer to National Archives", "Good, permanent", "Records of archival value, per the authority"],
          ],
        },
        example:
          "An export to CSV with the schema, the code tables and a plain-English data dictionary will be readable in a decade. A .bak file for a database version nobody licenses will not.",
        sourceIds: ["naa-data", "archives"],
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
      {
        heading: "What became of the system you replaced",
        body: "Closure should also say what became of the thing being replaced. The common gap is the mirror image of the last section: the new service goes live, the report describes it, and the old system keeps running — costing money, holding duplicate data, and still accepting transactions. Closure should state the disposition of what was replaced, or say plainly that it remains in service and why.",
        bullets: [
          "Name the system or process replaced, and its current status.",
          "If it is still running, say who owns it, what it costs, and when it will stop.",
          "If both are running, name the system of record — two sources of truth is a data-integrity issue, not a transitional inconvenience.",
          "Record any residual users who have not migrated, and what the plan for them is.",
        ],
        sourceIds: ["closure", "naa-data"],
      },
    ],
    questions: [
      {
        id: "cl-r1",
        moduleId: "records",
        prompt: "A cloud subscription lapses and eleven years of case data is deleted. How is this best characterised?",
        options: [
          "Destruction of Commonwealth records without authority",
          "A procurement failure with data loss as a consequence",
          "An acceptable outcome, since the retention period was not specified",
          "A technical incident to be managed through the incident process",
        ],
        answer: 0,
        rationale:
          "Nobody decided to destroy the records, which is the point. Data in a government business system is a Commonwealth record under the Archives Act, and unauthorised destruction is unauthorised however it happens.",
        optionNotes: [
          "",
          "Accurate as a proximate cause, and it understates what was actually breached.",
          "An unspecified retention period does not create a permission to destroy.",
          "Incident handling addresses the outage; it does not address the legal position.",
        ],
      },
      {
        id: "cl-r2",
        moduleId: "records",
        prompt: "Why is a database backup usually insufficient for long-term retention?",
        options: [
          "Reading it needs software the entity may no longer have",
          "Backups are not recognised as records under the Archives Act",
          "Backup media degrade faster than the required retention periods",
          "Backups exclude the metadata needed to interpret the records",
        ],
        answer: 0,
        rationale:
          "The obligation is continuing access, not continuing storage. A backup that can only be read by a database version nobody licenses does not deliver access, and the gap is discovered when the data is requested.",
        optionNotes: [
          "",
          "Format has no bearing on whether something is a record.",
          "Media degradation is real and secondary to the software dependency.",
          "Often true, and the binding problem is being unable to open it at all.",
        ],
      },
      {
        id: "cl-r3",
        moduleId: "records",
        prompt: "What should happen first when decommissioning a system?",
        options: [
          "Sentence the records — what to keep, how long, under what authority",
          "Revoke user access to prevent further data being created",
          "Export the data to an open format for long-term retention",
          "Confirm that no downstream system still consumes the data",
        ],
        answer: 0,
        rationale:
          "Everything else depends on the answer. Exporting, revoking and checking dependencies are all necessary, and doing any of them before you know what must be retained risks doing them to the wrong scope.",
        optionNotes: [
          "",
          "Necessary, and premature — do it after you know what must be preserved.",
          "You cannot decide the export scope before sentencing tells you what to keep.",
          "Essential, and it comes after retention scope is known.",
        ],
      },
      {
        id: "cl-r4",
        moduleId: "records",
        prompt: "Why revoke integrations before deleting data rather than after?",
        options: [
          "Undocumented dependencies surface while the system can still be restored",
          "Deletion is faster once integrations are removed",
          "Retaining integrations during deletion risks propagating the deletion downstream",
          "Access revocation is required before disposal under records authorities",
        ],
        answer: 0,
        rationale:
          "It is a deliberately reversible test. Whatever breaks in that window is a dependency nobody documented, and you still have the system to turn back on — which you do not once the data is gone.",
        optionNotes: [
          "",
          "Speed is irrelevant to the sequencing decision.",
          "Plausible-sounding and not the reason; the point is discovering dependencies safely.",
          "Records authorities govern disposal of records, not access sequencing.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-r-s1",
        moduleId: "records",
        context:
          "The replaced legacy system is still running six months after go-live. It costs $190k a year, holds duplicate participant data, and about 40 users still transact in it because a niche function was never rebuilt.",
        prompt: "What must the closure report do?",
        options: [
          "Name it as still in service, its owner and cost, and the system of record",
          "Record the new service as delivered and treat the legacy system as a separate operational matter",
          "Recommend immediate decommissioning of the legacy system to realise the saving",
          "Defer the closure report until the residual users have been migrated",
        ],
        answer: 0,
        rationale:
          "Two live systems holding the same participant data is a data-integrity problem and an unfunded cost, and it is a direct consequence of what this project did. Naming the system of record is the urgent part — without it, staff cannot know which record is authoritative.",
        optionNotes: [
          "",
          "It is not separate; the duplication exists because of this delivery.",
          "Premature — 40 users depend on a function that was never rebuilt.",
          "Deferral leaves the ambiguity unrecorded for however long migration takes.",
        ],
      },
      {
        id: "cl-r-s2",
        moduleId: "records",
        context:
          "You plan to export case records to CSV before decommissioning. A colleague suggests also keeping a VM snapshot of the whole system 'just in case', and skipping the data dictionary since the column names are self-explanatory.",
        prompt: "What is the correct position?",
        options: [
          "Keep the dictionary and schema; the snapshot is a short-term bridge",
          "The snapshot is sufficient on its own, since it preserves the system exactly as it was",
          "Both are unnecessary if the CSV export is verified as complete",
          "Skip the CSV and rely on the snapshot, which preserves relationships the CSV would lose",
        ],
        answer: 0,
        rationale:
          "Column names are self-explanatory to people who worked on the system, which is a group that shrinks to zero. Code tables, units and exclusions are what a future reader needs. A snapshot degrades — it needs a hypervisor, an OS and licences that all age.",
        optionNotes: [
          "",
          "Snapshots depend on infrastructure and licensing that will not survive the retention period.",
          "A verified export without its schema is a grid of values nobody can interpret.",
          "Relationships can be preserved in exports; long-term readability cannot be preserved in a snapshot.",
        ],
      },
    ],
    assignment: {
      title: "Plan the shutdown",
      instruction:
        "For a system you know, write the decommissioning position: what must be retained and under what authority, how access will be maintained, the shutdown sequence, and the disposition of whatever it replaced.",
      prompts: [
        "Records to be retained, retention period, and the authority relied on",
        "How access will be maintained — format, schema, dictionary, holder",
        "Shutdown sequence, with the reversible checkpoint identified",
        "Disposition of the system or process replaced",
      ],
      criteria: [
        "Retention names an authority or states plainly that one has not been identified",
        "The access approach would still be readable without the original software",
        "The sequence puts a reversible step before anything irreversible",
      ],
      modelAnswer:
        "Retention: participant case records, minimum seven years from last action, under the entity's records authority for programme administration — confirmed with the information governance team rather than assumed. Financial transaction records fall under a separate authority with a longer period; both were checked. Access: export to CSV per table, with the DDL schema, all code and lookup tables, and a plain-English data dictionary covering every column, its units and its exclusions. Held by the Assistant Director, Information Governance, in the departmental records store — not in the platform team's storage, which is itself subject to future decommissioning. Sequence: sentence records → export → read the export back and reconcile row counts and totals against the live system → retain closure evidence separately → confirm no downstream consumers → revoke integrations and monitor for a fortnight, which is the reversible checkpoint and the last point at which the system can simply be turned back on → then release infrastructure and cancel subscriptions. Replaced system: the legacy register is still running and will be until the niche reporting function is rebuilt, currently scheduled for Q3. Owner: Platform Services; cost $190k p.a.; the new service is the system of record from go-live and the legacy register is read-only for the 40 residual users — stated explicitly because two writable copies of participant data would be a data-integrity failure, not a transitional inconvenience.",
    },
  },

  {
    id: "sections",
    number: 8,
    title: "Framing the report",
    subtitle: "Purpose, overview, objectives and the numbers",
    minutes: 0,
    slides: "",
    outcome: "Write the framing sections: purpose, overview, objectives, business outcomes, key results, milestones and the financial summary.",
    coreIdea:
      "Most closure reports are written into a departmental template with fixed headings. Knowing how to think about evidence and benefits is necessary and not sufficient — you also have to know what belongs under 'Outstanding dependencies' and why 'Project overview' is the section people waste and then need.",
    sections: [
      {
        heading: "The two sections everyone wastes",
        body: "Document purpose and project overview are the two sections everyone treats as padding, and they are the reason the report is usable in three years. The reader in three years has no idea what the project was, what it was called internally, or which of four similar initiatives this one is. Two hundred words of orientation is the difference between a findable record and an archived file.",
        table: {
          caption: "The two sections people waste",
          head: ["Section", "What it is for", "How it is usually failed"],
          rows: [
            ["Document purpose", "Says what this document decides and who must act on it", "'This document reports on the closure of the project.'"],
            ["Project overview", "Orients a reader who was not there — problem, scope, dates, cost, who", "A paragraph lifted from the business case, unchanged since 2023"],
          ],
        },
        bullets: [
          "Purpose names the decisions the report supports and who takes them.",
          "Overview states the problem the project addressed, in the words a stranger would use.",
          "Include the internal name, any codename, and the funding or investment reference — this is how it gets found.",
          "Give start and end dates, total cost, and the delivery model in two lines, not two pages.",
        ],
        example:
          "'This report closes the Provider Status project and transfers six benefits, four residual risks and one unresolved dependency to named owners. It supports the SRO's decision to stand down programme governance, and Finance's treatment of $47.3m of capitalised and expensed cost.' That is a purpose statement. It tells you who has to read it.",
        sourceIds: ["rmg106", "closure"],
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
      {
        heading: "Milestones and the financial summary",
        body: "Both sections are usually presented as a table of what happened, which is the least useful form. The value is in the variance: planned against actual, with the reason. A milestone table showing everything delivered on the revised date tells the reader nothing they could not have assumed.",
        bullets: [
          "Milestones: planned date, actual date, variance, and the reason for any material slip.",
          "Show the original planned dates alongside any rebaselined ones, as with cost.",
          "Financial summary: original approved, revisions with dates and reasons, final actual, variance against the original.",
          "Split capital and operating, and state what was capitalised and on what basis.",
          "Name the recurring cost transferring to business as usual, and the budget line receiving it.",
        ],
        example:
          "A milestone table where every actual equals the planned date is a table that was written backwards from the outcome. Real delivery has variance; a report showing none has usually rebaselined until there was none.",
        sourceIds: ["closure", "anao-gateway"],
      },
      {
        heading: "Outstanding risks, issues, dependencies and actions",
        body: "This is the section that determines whether the report does anything, and it is routinely a copy of the RAID log with the closed items filtered out. A closure RAID section is not a status report — it is a transfer document. Every remaining item is either being accepted by someone named, or it is being abandoned, and abandonment is a decision that should be visible rather than implied by silence.",
        table: {
          caption: "What each column has to carry",
          head: ["Item", "Must state", "Failure"],
          rows: [
            ["Risk", "Owner, current rating, treatment, where it now lives", "Transferred to a register nobody reviews"],
            ["Issue", "Owner, impact if unresolved, resolution path or acceptance", "Reclassified as a risk to avoid resolving it"],
            ["Dependency", "The other party, what is owed, by when, who chases", "Named as a system rather than a person"],
            ["Action", "Owner, due date, and what happens if it is not done", "Assigned to the disbanding project team"],
          ],
        },
        bullets: [
          "Every item names an individual, a destination register, and a review date.",
          "An issue that will not be fixed is closed as accepted, with who accepted it — not carried indefinitely.",
          "Actions assigned to the project team are actions assigned to nobody. Reassign or close them.",
          "State explicitly if an item has no owner. That is a live problem, and burying it does not make it less true.",
        ],
        example:
          "'Risk: identity broker token lifetime may change without notice. Owner: Assistant Director, Platform Services. Rating: medium. Treatment: registered as a consuming system with Platform Identity, notification requested. Transferred to: Platform Services risk register, ref PS-R-118. Next review: December.' That item survives the project. 'Risk: integration dependencies — ongoing' does not.",
        sourceIds: ["rmg106", "teal"],
      },
    ],
    questions: [
      {
        id: "cl-x1",
        moduleId: "sections",
        prompt: "What is the difference between an objective and a business outcome at closure?",
        options: [
          "The objective is what you set out to do; the outcome is why it mattered",
          "The objective is set by the project; the outcome is set by the entity's corporate plan",
          "The objective is qualitative; the outcome is always expressed as a number",
          "They are the same thing, described at different levels of governance",
        ],
        answer: 0,
        rationale:
          "Keeping them separate is what lets the report show an objective delivered while the outcome did not move — the single most informative result a closure report can contain.",
        optionNotes: [
          "",
          "Both can come from either. The distinction is what each asks, not who wrote it.",
          "Objectives are often measurable and outcomes are often estimated. Form is not the difference.",
          "Collapsing them is exactly the failure that hides the interesting result.",
        ],
      },
      {
        id: "cl-x2",
        moduleId: "sections",
        prompt: "A milestone table shows every actual date equal to the planned date. What should a reader infer?",
        options: [
          "The plan was rebaselined until variance disappeared",
          "The project was managed with unusual schedule discipline",
          "Milestones were defined loosely enough to always be met",
          "The table was completed from the delivery plan rather than actuals",
        ],
        answer: 0,
        rationale:
          "Real delivery has variance. A table with none has almost always been reported against the most recent replan, which is the schedule equivalent of reporting cost against the revised budget.",
        optionNotes: [
          "",
          "Possible in principle and vanishingly rare in practice for anything substantial.",
          "A genuine failure mode, and it usually produces vague milestones rather than exact date matches.",
          "Would produce the same table, and is a subset of reporting against the latest plan.",
        ],
      },
      {
        id: "cl-x9",
        moduleId: "sections",
        prompt: "What does a financial summary give you that a table of final costs does not?",
        options: [
          "The variance against original approval, with each revision dated and reasoned",
          "A breakdown of expenditure by supplier and by cost centre",
          "Confirmation that spending stayed within delegated authority",
          "The proportion of the budget consumed in each financial year",
        ],
        answer: 0,
        rationale:
          "Final cost answers what it cost. The decision-relevant question is how far the delivered thing moved from the approved thing, which only the variance and the revision chain show.",
        optionNotes: [
          "",
          "Useful operational detail that does not address the approval question.",
          "A compliance matter, separate from whether the investment held its shape.",
          "Phasing, relevant to Finance rather than to the approval gap.",
        ],
      },
      {
        id: "cl-x10",
        moduleId: "sections",
        prompt: "Why does the project overview matter to a reader in three years?",
        options: [
          "They will not know what it was, what it was called, or which of several it is",
          "It supplies the context required for the report to be formally accepted",
          "Overviews are the section most often requested under freedom of information",
          "It establishes the scope against which variances are later measured",
        ],
        answer: 0,
        rationale:
          "Orientation makes the record findable and usable. Internal name, codename and funding reference are how someone locates it; problem and dates are how they judge relevance.",
        optionNotes: [
          "",
          "Acceptance turns on the transfers, not the overview.",
          "Occasionally true, and not the reason to write it well.",
          "Scope baselines live in the objectives and financial sections.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-x-s2",
        moduleId: "sections",
        context:
          "Your objective was 'provide self-service visibility of application status'. It was delivered and works. The business outcome was 'reduce avoidable support contact', measured at 18 per cent against a 40 per cent target. Your sponsor wants the section to lead with the delivered objective.",
        prompt: "How should the section be written?",
        options: [
          "Report all three separately: objective met, outcome largely not",
          "Lead with the objective as requested, and cover the outcome shortfall in the shortfall section",
          "Lead with the outcome, since it is the reason the investment was funded",
          "Combine them into a single statement describing partial achievement",
        ],
        answer: 0,
        rationale:
          "The sponsor is not wrong that the objective was met. Reporting the levels separately serves both truths and produces the useful finding: the thing was built, works, and did not change behaviour as expected — which points at take-up or at the theory, and neither is visible in a merged sentence.",
        optionNotes: [
          "",
          "Splitting them across sections lets a reader take the objective as the result and stop.",
          "Reversing the emphasis is as distorting as the sponsor's version, in the other direction.",
          "'Partial achievement' is the phrase that hides which part.",
        ],
      },
      {
        id: "cl-x-s3",
        moduleId: "sections",
        context:
          "Your milestone table shows eleven milestones, every one delivered on its planned date. The project was rebaselined twice, in March and September, and each rebaseline moved the remaining dates.",
        prompt: "How should the table be presented?",
        options: [
          "Original planned dates alongside the rebaselined ones, with variance against original",
          "As it stands, since both rebaselines were formally approved",
          "Original dates only, so that the true slip is visible",
          "Replaced by a narrative explaining the two rebaselines",
        ],
        answer: 0,
        rationale:
          "The same principle as cost. Both rebaselines were legitimate and disclosed; a table showing no variance against a twice-moved plan answers an easier question than the reader is asking.",
        optionNotes: [
          "",
          "Approval makes the revision legitimate, not the presentation complete.",
          "Hiding approved revisions swaps one distortion for another.",
          "A narrative loses the per-milestone detail the table exists to carry.",
        ],
      },
    ],
    assignment: {
      title: "Write the framing sections",
      instruction:
        "For a piece of work you know, draft the document purpose, a project overview a stranger could use, and the objective / business outcome / key result set reported separately.",
      prompts: [
        "Document purpose: the decisions this report supports, and who takes them",
        "Project overview: problem, scope, dates, cost, internal name and funding reference",
        "Objective as originally written, marked achieved / partial / not",
        "Business outcome with its baseline, and the key result with target and actual",
      ],
      criteria: [
        "The purpose statement would not be true of any other closure report",
        "The overview lets someone who was not there tell whether it is relevant to them",
        "Objective, outcome and key result are reported separately rather than merged",
      ],
      modelAnswer:
        "Purpose: this report closes the Provider Status project and transfers six benefits, four residual risks and one unresolved dependency to named owners. It supports the SRO's decision to stand down programme governance, and Finance's treatment of $47.3m of capitalised and expensed cost. Overview: providers could not see where participant applications had got to, and rang support to find out. Delivered a self-service status view in the provider portal, Aug 2023 to Jun 2026, $47.3m against $38.1m approved. Known internally as Provider Status, codename PANDA in early planning papers, NPP reference 2023-DEWR-114. Delivery: internal team with an integration vendor. Objective: 'Provide providers with self-service visibility of application status' — achieved. Business outcome: reduce avoidable support contact — measured 18% reduction (Q3 2026 against a Q1 2024 baseline, source CRM-RPT-88) against a 40% target. Key result: contacts per application, target 0.6, actual 0.83. The objective was met and the outcome was not, which is the finding: providers use it, and it has not displaced the phone call.",
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
    title: "Writing the report",
    subtitle: "Structure, candour and the shortfall paragraph",
    minutes: 0,
    slides: "",
    outcome: "Produce a closure report structured so a reader can find the decision-relevant content, including where targets were not met.",
    coreIdea:
      "A closure report is read by people looking for one thing, in a hurry. Structure it so they find it, and say the difficult part plainly enough that the rest of the document becomes believable.",
    sections: [
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

  {
    id: "assurance",
    number: 11,
    title: "Assurance and audit readiness",
    subtitle: "Writing for a reader who will test the claim",
    minutes: 0,
    slides: "",
    outcome: "Anticipate how a closure claim will be tested, and hold the evidence that makes it stand.",
    coreIdea:
      "A closure report's claims travel. They can reappear in annual performance statements, which are audited, and in ANAO performance audits years later. Write as though each claim will be tested, because it may be.",
    sections: [
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
        heading: "What a tester actually does",
        body: "Audit reads for evidence. It selects a claim, asks what supports it, and follows the chain until it either reaches primary data or runs out. Most claims fail not because they were false but because the chain breaks — the analyst left, the extract was not retained, the definition was not written down.",
        table: {
          caption: "The chain",
          head: ["Step", "What must exist", "Where it usually breaks"],
          rows: [
            ["The claim", "A specific, quantified statement", "Vague wording admits no test"],
            ["The method", "How the figure was derived, written down", "Lived in an analyst's spreadsheet"],
            ["The data", "Retained extract or reproducible query", "System decommissioned, extract not kept"],
            ["The definition", "What was counted, and what was not", "Never recorded; two readings possible"],
            ["The approval", "Who accepted the figure and when", "Approved verbally, no record"],
          ],
        },
        sourceIds: ["anao-perf", "rmg134"],
      },
      {
        heading: "Deciding what to keep before it is deleted",
        body: "Evidence has to outlive the systems that produced it, and that is a decision somebody makes at closure. Systems are decommissioned, licences lapse, cloud accounts are closed, and the extract that supported the headline benefit goes with them. Deciding what to retain is part of writing the report, not an afterthought for records management.",
        bullets: [
          "Retain the extract, not the dashboard — dashboards depend on systems that will be turned off.",
          "Keep the query or method alongside the data, so the figure can be reproduced rather than merely cited.",
          "Record the definition in the same place, in plain words.",
          "Confirm the retention period against the entity's obligations, and name who holds it.",
        ],
        example:
          "A benefit claim supported by 'the Power BI dashboard' is supported by nothing eighteen months after the workspace is deleted. A retained CSV, the SQL that produced it, and a paragraph defining the metric will still answer the question.",
        sourceIds: ["closure", "rmg134"],
      },
      {
        heading: "Recording what assurance actually did",
        body: "One of the seven criteria is about assurance itself: the report must record that the activities in the Assurance Plan agreed with the Digital Transformation Agency were completed, note any material change to what was planned, and capture what those activities found. It is the criterion most often answered with a list of review dates, which records that assurance occurred and not what it was worth.",
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
      {
        heading: "Assurance and audit are different readers",
        body: "They are routinely conflated, and the difference changes who you are writing for. Assurance is advice to the person accountable, given while there is still time to act — Gateway exists to help an SRO deliver. Audit is independent examination reported to others, usually after the fact, and its finding is about the entity rather than about you. A closure report is read by both, at different times, for different purposes.",
        table: {
          caption: "Two different readers",
          head: ["", "Assurance", "Audit"],
          rows: [
            ["Reports to", "The accountable officer", "The entity's audit committee, Parliament"],
            ["Timing", "During, in time to change the outcome", "After, on a sample"],
            ["Question", "Will this succeed, and what would help?", "Is what was reported supported?"],
            ["Consequence", "Recommendations to the SRO", "A finding against the entity"],
          ],
        },
        bullets: [
          "Write assurance responses to be useful; write the record to be testable. They are not in tension, and they are not the same task.",
          "An assurance recommendation not acted on is itself something a later audit will look at.",
          "Internal audit follow-up asks whether the closure commitments were kept, not whether the report was well written.",
          "The three-lines model is a useful check: management owns it, oversight functions monitor it, internal audit independently examines it. A closure report feeds all three.",
        ],
        example:
          "A Gate 6 reviewer asks what would improve the outcome from here. An ANAO auditor asks what supports the number on page four. Answering the second well is what protects the entity; answering the first well is what protects the benefit.",
        sourceIds: ["rmg106", "anao-gateway", "anao-perf"],
      },
    ],
    questions: [
      {
        id: "cl-a1",
        moduleId: "assurance",
        prompt: "Why does a closure claim warrant more care than the immediate audience suggests?",
        options: [
          "It can flow into audited performance statements and be tested years later",
          "Closure reports are published externally and attract media attention",
          "The Senior Responsible Officer is personally liable for inaccurate closure claims",
          "Gateway reviewers re-examine closure reports at each subsequent gate",
        ],
        answer: 0,
        rationale:
          "The immediate reader is a sponsor who will sign it. The eventual reader may be an auditor testing a performance statement that inherited the claim, with statutory powers and no stake in the original narrative.",
        optionNotes: [
          "",
          "Most closure reports are internal. Media exposure is not the general case.",
          "Accountability is real; personal liability of that kind overstates it.",
          "Gate 6 is normally the final gate. Later gates do not re-examine it.",
        ],
      },
      {
        id: "cl-a2",
        moduleId: "assurance",
        prompt: "Where does an evidence chain most commonly break?",
        options: [
          "The data — the system was decommissioned and no extract kept",
          "The claim — the statement is too specific to defend",
          "The approval — nobody was willing to sign off the figure",
          "The method — the calculation was too complex to reproduce",
        ],
        answer: 0,
        rationale:
          "Retention is the usual failure. The number was real, the analysis was done, and the thing it was drawn from no longer exists — which is why deciding what to keep belongs in the closure process rather than after it.",
        optionNotes: [
          "",
          "Specificity strengthens a claim's defensibility rather than weakening it.",
          "Sign-off is usually obtained; the record of it is what sometimes goes missing.",
          "Complexity is manageable when the method was written down; the writing-down is the issue.",
        ],
      },
      {
        id: "cl-a3",
        moduleId: "assurance",
        prompt: "Which is the more durable evidence for a benefit claim?",
        options: [
          "A retained extract, with the query and metric definition beside it",
          "A Power BI dashboard showing the trend, linked from the report",
          "A signed statement from the analyst confirming the figure",
          "A screenshot of the reporting tool taken at the time of closure",
        ],
        answer: 0,
        rationale:
          "Only the first survives decommissioning and allows reproduction. A dashboard depends on a live system, an attestation is not the underlying data, and a screenshot proves what was displayed rather than what was true.",
        optionNotes: [
          "",
          "Depends entirely on a workspace that may be deleted well within the retention period.",
          "An attestation about data is weaker than the data, and the analyst will move on.",
          "Shows a rendering, not a reproducible figure, and carries no definition.",
        ],
      },
      {
        id: "cl-a4",
        moduleId: "assurance",
        prompt: "Why should the metric definition be retained alongside the data?",
        options: [
          "The same metric defined two ways gives two answers, and a tester cannot tell",
          "Records management policy requires definitions to accompany datasets",
          "It demonstrates that the delivery team followed a rigorous process",
          "Definitions are needed to rebuild the reporting solution if required",
        ],
        answer: 0,
        rationale:
          "Ambiguity in the definition is where a real improvement and a measurement artefact become indistinguishable. Without it, a tester has a number and no way to know what it counts.",
        optionNotes: [
          "",
          "Policy may or may not require it, and that would not explain why it matters.",
          "Process rigour is a by-product, not the reason.",
          "System rebuild is a rare and separate concern.",
        ],
      },
    ],
    scenarios: [
      {
        id: "cl-a-s1",
        moduleId: "assurance",
        context:
          "Eighteen months after closure, an ANAO performance audit selects your reported benefit for testing. The reporting system was decommissioned at closure. You have the closure report, a summary slide, and an email from the analyst confirming the figure.",
        prompt: "What is the position?",
        options: [
          "The claim is unsupported — nothing left is primary data or reproducible",
          "The analyst's email is sufficient contemporaneous evidence of the figure",
          "The closure report itself stands as the record, having been formally approved",
          "The summary slide provides adequate support if it shows the underlying trend",
        ],
        answer: 0,
        rationale:
          "Everything retained is a restatement of the claim by parties connected to it. Audit follows the chain to primary data or a reproducible method, and neither exists. This is the ordinary way closure claims fail — not falsification, but evaporation.",
        optionNotes: [
          "",
          "An email asserts the figure; it does not evidence it, and the analyst is an interested party.",
          "Approval records that someone accepted the claim, not that the claim was supported.",
          "A slide is a presentation of a figure, without definition, source or reproducibility.",
        ],
      },
      {
        id: "cl-a-s2",
        moduleId: "assurance",
        context:
          "You are two weeks from closure. The cloud workspace holding all reporting data will be deleted 30 days after closure under the decommissioning plan. The benefit measurement period runs for another nine months.",
        prompt: "What is the necessary action?",
        options: [
          "Establish a durable data source now, and retain the baseline extract",
          "Extend the workspace retention until the measurement period ends",
          "Complete a final measurement before deletion and report that as the outcome",
          "Transfer the workspace ownership to the receiving operational team",
        ],
        answer: 0,
        rationale:
          "The measurement has to run for nine more months, so it needs a durable source regardless of what happens to this workspace — and the baseline must be preserved now, while it still exists. Extending or transferring the workspace defers the same problem and leaves the benefit owner dependent on infrastructure nobody has funded.",
        optionNotes: [
          "",
          "Buys time without solving it, and the extension will expire during a period when nobody is watching.",
          "Measuring at closure measures nothing — the benefit has not accrued yet.",
          "Hands the receiving team a cost and a dependency they have not agreed to fund or support.",
        ],
      },
    ],
    assignment: {
      title: "Trace the chain",
      instruction:
        "Take one benefit claim and trace its evidence chain: the claim, the method, the data, the definition, the approval. Mark where it breaks and what you would retain to fix it.",
      prompts: [
        "The claim, stated as it would appear in the report",
        "Method and where it is written down",
        "Data source, and what happens to it after closure",
        "Definition, approval, and the weakest link",
      ],
      criteria: [
        "The chain is traced to primary data or the break is named honestly",
        "The retention action names a format and a holder, not just an intention",
        "The weakest link is identified explicitly rather than left for the reader to infer",
      ],
      modelAnswer:
        "Claim: median lodgement-to-decision time fell from 14 to 9 days between Q1 and Q3 2026. Method: monthly extract from the case management system, median calculated across all decided applications in the period, excluding withdrawn applications — written up in the measurement note appended to the closure report, not only in the analyst's notebook. Data: CMS reporting replica, which is retained under the entity's standard operational retention and is not part of the project decommissioning scope — so it survives, which is the fortunate case rather than the designed one. Definition: lodgement timestamp to decision timestamp, both system-generated; withdrawn and duplicate applications excluded; definition unchanged across both periods and recorded in the measurement note. Approval: figure accepted by the Director, Provider Support Branch, at the 14 July governance meeting — minuted, which is the record that would otherwise be missing. Weakest link: the exclusion rule for duplicates was applied by a script held in the analyst's personal repository. If she leaves, the figure cannot be reproduced exactly. Action: move the script into the branch's shared analytics repository with the measurement note, owned by the Assistant Director, Performance Reporting.",
    },
  },
];
