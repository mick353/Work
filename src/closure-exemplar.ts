/**
 * A complete worked closure report.
 *
 * The course taught every section, showed fragments in the templates, and
 * walked three cases — and never once showed a finished document. For a course
 * about writing a document that is the single most obvious thing to be
 * missing: a learner could pass every question and still have no picture of
 * what the whole thing looks like on the page.
 *
 * This is one report, end to end, for the running case. Every section carries
 * a note explaining why it is written the way it is, and several deliberately
 * show the uncomfortable version — the cost overrun against original approval,
 * the benefit that missed, the risk nobody would accept — because a worked
 * example of the easy case teaches nothing.
 */

import type { LessonTable } from "./course";

export type ExemplarSection = {
  /** Numbered as it would appear in the document. */
  heading: string;
  /** The actual report text, as paragraphs. */
  body?: string[];
  table?: LessonTable;
  /** Fixed-width block — a statement, register extract or list. */
  artefact?: string;
  /** Why it is written this way. Not part of the report. */
  note: string;
};

export type Exemplar = {
  title: string;
  subtitle: string;
  intro: string;
  meta: { label: string; value: string }[];
  sections: ExemplarSection[];
  closing: string;
};

export const closureExemplar: Exemplar = {
  title: "Provider Application Status",
  subtitle: "Project Closure Report — a complete worked example",
  intro:
    "One report, end to end, for a project that broadly succeeded and missed several things. The grey notes beside each section are commentary for you, not part of the document. Read the report first and ignore them; then read them and see what each section is doing.",
  meta: [
    { label: "Status", value: "Illustrative — not a real DEWR project" },
    { label: "Length", value: "14 sections, about 2,400 words" },
    { label: "Aligned to", value: "The DTA closure reporting standard — all seven criteria" },
  ],
  sections: [
    {
      heading: "1. Document purpose",
      body: [
        "This report closes the Provider Application Status project and transfers six benefits, four residual risks, two follow-on actions and one unresolved dependency to the owners named in sections 9 and 10.",
        "It supports two decisions: the Senior Responsible Officer's decision to stand down project governance, and the Chief Financial Officer's treatment of $47.3m of capitalised and expensed cost. Section 13 records the acceptance of those transfers.",
      ],
      note:
        "Names the decisions and who takes them. A purpose section that says 'this document reports on the closure of the project' has restated the title and told nobody whether the document is theirs to act on.",
    },
    {
      heading: "2. Project overview",
      body: [
        "Employment service providers could not reliably see how far a participant's application had progressed. Information sat across three systems, none of it provider-facing, so providers rang the support line to ask — generating roughly 34,000 avoidable contacts a year against a support function sized for 20,000.",
        "The project delivered a self-service application status view in the provider portal, drawing on the case management system and the payments platform, with status definitions agreed with Policy Branch.",
        "Known internally as Provider Status; appears as PANDA in planning papers before August 2023. New Policy Proposal reference 2023-DEWR-114. Delivered August 2023 to June 2026 by an internal team of 14 with an integration vendor, at a final cost of $47.3m against $38.1m originally approved.",
      ],
      note:
        "Written for someone who has never heard of it. The internal name, the old codename and the NPP reference are how a reader in three years finds this at all; the contact numbers are how they judge whether it is worth reading.",
    },
    {
      heading: "3. Objectives",
      body: [
        "Objective as approved: 'Provide employment service providers with self-service visibility of participant application status, reducing avoidable contact with the provider support line.'",
        "Assessment: achieved. The status view was released to all providers in March 2026 and is in routine use, with 78 per cent of active provider organisations accessing it at least weekly.",
        "One objective was withdrawn. 'Extend status visibility to participants directly' was removed from scope in November 2025 by the Project Board, on advice that participant-facing release required a privacy assessment that could not be completed in the funded period. It is not delivered and is not counted as a benefit.",
      ],
      note:
        "Quotes the objective as originally written, not as it came to be described, and records the withdrawn objective with the date and who decided. Scope that quietly disappears is the most common thing a closure report is asked about later.",
    },
    {
      heading: "4. Business outcomes and key results",
      body: [
        "The outcome that justified the investment was a reduction in avoidable contact, and it has moved less than forecast.",
      ],
      table: {
        caption: "Outcomes against target",
        head: ["Outcome", "Measure", "Target", "Actual", "Basis"],
        rows: [
          ["Reduced avoidable contact", "Contacts per application", "0.60", "0.83", "Measured"],
          ["Reduced avoidable contact", "Annual contact volume", "20,400", "28,900", "Measured"],
          ["Faster provider decisions", "Median days to provider action", "4.0", "4.2", "Measured"],
          ["Provider confidence", "Provider satisfaction (portal)", "—", "+11 pts", "Measured, no target set"],
        ],
      },
      note:
        "Objective, outcome and key result kept apart. The objective was met and the outcome largely was not — providers use the screen and still ring. That is the finding, and it disappears the moment the three are merged into one sentence about success.",
    },
    {
      heading: "5. What we did not achieve",
      body: [
        "Contact reduction. The business case forecast a fall to 0.60 contacts per application by June 2026. Measured at 0.83. The shortfall is approximately 8,500 contacts a year, worth about $1.9m annually against the forecast saving of $3.1m.",
        "The cause is forecast error rather than delivery failure. The system performs to specification and take-up is high. The forecast assumed contact would fall in proportion to visibility, based on the 2023 online lodgement rollout — which was a mandatory channel change. This is an opt-in information screen, and the comparator was wrong. Recorded as lesson LP-2026-118.",
        "Cost. Final cost $47.3m against $38.1m originally approved, an overrun of $9.2m or 24 per cent. Both rebaselines were approved (section 7). The original approval was still exceeded.",
        "Participant-facing extension. Withdrawn November 2025, as recorded at section 3.",
      ],
      note:
        "Its own heading, early, in the same units as the original commitment, and no compensating success anywhere in it. Distinguishing forecast error from delivery failure is what makes it useful rather than merely honest — one is a lesson for the next business case, the other would be a lesson for the next delivery team.",
    },
    {
      heading: "6. Milestones",
      table: {
        caption: "Planned against actual",
        head: ["Milestone", "Original plan", "Rebaselined", "Actual", "Variance to original"],
        rows: [
          ["Discovery complete", "Feb 2024", "—", "Feb 2024", "On time"],
          ["Alpha assessment", "Aug 2024", "Oct 2024", "Oct 2024", "+8 weeks"],
          ["Private beta", "Mar 2025", "Jul 2025", "Aug 2025", "+22 weeks"],
          ["Integration complete", "Jun 2025", "Jan 2026", "Feb 2026", "+35 weeks"],
          ["Public release", "Sep 2025", "Mar 2026", "Mar 2026", "+26 weeks"],
        ],
      },
      body: [
        "The integration slip drove the schedule. A change to the whole-of-department identity broker token lifetime in September 2025 broke session handling in user acceptance testing; the rework is described at section 11.",
      ],
      note:
        "Both columns shown. A milestone table where every actual equals the rebaselined date — which this one nearly is — tells a reader nothing until the original is beside it.",
    },
    {
      heading: "7. Financial summary",
      artefact:
        "Original approved (Aug 2023)          $38.1m\n  Revision 1 (Mar 2025)                 $43.5m   reconciliation module added to scope\n  Revision 2 (Nov 2025)                 $47.3m   integration rework, identity broker change\n  Final actual                          $47.3m\n  Variance to original approval          +$9.2m   (+24%)\n\n  Capitalised                           $28.4m\n  Expensed                              $18.9m\n    of which discovery and options       $3.2m\n    of which training and change         $2.1m\n    of which post-release defect work    $1.4m\n\n  Recurring cost from FY2027-28          $310k p.a.  licences, hosting, support\n  Transferred to                         Cost centre PLT-4420, Platform Services\n  Accepted by                            Budget holder, 14 July 2026",
      body: [
        "Training, change management and post-release defect work were reassessed at closure and moved from capital to expense, reducing the capitalised figure by $3.5m from the position carried during delivery. Discovery costs relating to the three options not pursued were expensed.",
      ],
      note:
        "The chain, not the endpoint. Note the recurring cost has a cost centre and a named acceptance date — a run cost handed to 'operations' with no budget line is how a licence lapses eighteen months later.",
    },
    {
      heading: "8. Completion criteria and quality",
      body: [
        "Seven completion criteria were agreed at investment decision. Six are met. One — bulk status export for provider back-office systems — was waived by the Senior Responsible Officer on 3 June 2026 and moved to the platform backlog.",
        "Quality: 14 known defects were accepted into production, two at severity 3 and twelve at severity 4, all owned in the platform backlog with the Assistant Director, Platform Services. Peak load tested to three times forecast volume. Accessibility audited at WCAG 2.1 AA with two outstanding AAA items. No open security findings above low.",
      ],
      note:
        "Quality is not scope. 'Passed user acceptance testing' would report that a meeting happened; defect counts by severity, load headroom, accessibility conformance and security position report whether the thing works.",
    },
    {
      heading: "9. Benefits and their owners",
      table: {
        caption: "Benefit transfer",
        head: ["Benefit", "Value", "Owner", "Agreed", "Measurement"],
        rows: [
          ["Reduced avoidable contact", "$1.2m p.a.", "Director, Provider Support", "14 Jul 2026", "Monthly contact volumes, Service Performance pack"],
          ["Reduced manual reconciliation", "$6.2m p.a.", "Director, Payments Operations", "22 Jul 2026", "Reconciliation effort sample, half-yearly"],
          ["Faster provider action", "Non-cashable", "Director, Provider Support", "14 Jul 2026", "Median days to action, standing report"],
          ["Reduced rework from status errors", "$0.4m p.a.", "Director, Case Management", "14 Jul 2026", "Rework tickets, monthly"],
          ["Provider satisfaction", "Non-cashable", "Director, Provider Support", "14 Jul 2026", "Portal survey, quarterly"],
          ["Support staffing avoidance", "Cost avoidance $0.9m", "Director, Provider Support", "Not agreed", "See section 10, item R4"],
        ],
      },
      body: [
        "Five of six benefits have a named owner who has seen the figure and accepted it. The sixth is unresolved and is recorded at section 10.",
        "Two benefits are non-cashable. No budget line falls as a result of either, and neither is claimed as a saving.",
      ],
      note:
        "Individuals in roles, with the date they agreed and a measurement that already exists. Marking the two non-cashable benefits explicitly is what stops the report claiming $8.7m of savings it cannot deliver.",
    },
    {
      heading: "10. Outstanding risks, issues, dependencies and actions",
      artefact:
        "RISK R1  Identity broker token lifetime may change again without notice.\n           Owner: AD Platform Services · Medium · Registered as a consuming\n           system with Platform Identity; notification requested.\n           → Platform Services register PS-R-118 · Review Dec 2026\n\n  RISK R4  Support staffing avoidance benefit ($0.9m) has no agreed owner.\n           UNTRANSFERRED. Provider Support has been approached twice and has\n           not accepted it, on the grounds that staffing levels are set\n           centrally. Referred to the SRO for allocation before signature.\n\n  ISSUE I7 Notification wording continues to generate calls that the status\n           screen was expected to prevent.\n           Owner: Director, Eligibility Policy → follow-on action A3.\n\n  DEP  D1  Bulk export (waived criterion, s.8) depends on the provider\n           gateway roadmap. Owed by: Provider Systems (external vendor).\n           Chased by: AD Platform Services. No committed date.\n\n  ACT  A3  Revise notification wording. Owner: Director, Eligibility Policy.\n           Due 30 Nov 2026. If not done: contact reduction stays near 0.83\n           and the benefit owner cannot act, the driver being outside their\n           control.\n\n  ACT  A7  Move the duplicate-exclusion script from the analyst's personal\n           repository into the branch analytics repository, with the\n           measurement note. Owner: AD Performance Reporting. Due 30 Sep 2026.\n           If not done: the baseline figures cannot be reproduced.",
      note:
        "A transfer table, not a filtered status log. Every row has a person, a destination and a date — and R4 says UNTRANSFERRED in plain sight rather than being assigned to a branch that never agreed. That single line is what makes the signature at section 13 mean something.",
    },
    {
      heading: "11. Assurance activities",
      body: [
        "All assurance activities in the Assurance Plan agreed with the Digital Transformation Agency were completed. One was substituted: the planned Gate 5 operational review was replaced by an internal readiness assessment in February 2026, on the Project Board's decision, because public release had moved to March and a Gate 5 before release would have assessed nothing.",
      ],
      table: {
        caption: "Assurance completed",
        head: ["Activity", "Date", "Key finding", "What we did"],
        rows: [
          ["Gate 2 — procurement strategy", "Nov 2023", "Integration scope understated", "Accepted; scope and estimate revised before market approach"],
          ["Gate 4 — readiness for service", "Mar 2025", "Release too large to absorb change", "Adopted; split into two releases"],
          ["Internal readiness assessment", "Feb 2026", "Support model undersized", "Partly adopted; two roles added, third deferred"],
          ["Gate 6 — benefits realisation", "Jun 2026", "Benefit B6 had no owner", "Not resolved; carried as R4 at section 10"],
        ],
      },
      note:
        "This is criterion 5 of the closure reporting standard, and it is the one most often answered with a list of dates. Findings and what was done about them make it Emerging; the paragraph below — whether the assurance was worth its cost — is what makes it Strong.",
    },
    {
      heading: "11a. Was the assurance worth it?",
      body: [
        "The Gate 4 recommendation to split the release is the clearest value: the second release absorbed the identity broker change without a further slip, against a plausible counterfactual of a further 6 to 8 weeks. Gate 2's finding on integration scope was correct and acted on, though the revised estimate still proved 3.4 times short.",
        "Gate 6 identified the unowned benefit that remains unresolved at closure. The finding was right and the project could not act on it, because allocation sits above the Project Board. That is recorded here rather than presented as an assurance failure.",
      ],
      note:
        "Naming a recommendation that was correct and still not acted on is uncomfortable and is the point. An assurance section where every finding was adopted and everything went well is not describing assurance, it is describing a formality.",
    },
    {
      heading: "12. Lessons and recommendations",
      body: [
        "LP-2026-118 — Forecasting take-up for opt-in services. Context: any business case forecasting behaviour change from an opt-in digital channel. Event: contact reduction forecast at 40 per cent using the 2023 online lodgement rollout as comparator; that was a mandatory channel change and this is opt-in. Actual reduction 18 per cent. Cost: $1.9m of forecast annual benefit not realised. Action: forecast opt-in take-up from opt-in precedents only, and state the comparator in the business case so it can be challenged.",
        "LP-2026-204 — Consuming shared identity services. Context: any build depending on the whole-of-department identity broker. Event: token lifetime changed September 2025 with no notification to consuming programs; session handling broke in user acceptance testing. Cost: integration rework at 3.4 times the original estimate, $3.8m, 11 weeks. Action: register as a consuming system with Platform Identity at design and request change notification — there is no automatic list, you must ask.",
        "Recommendation R1 — that business cases forecasting behaviour change state the comparator initiative they draw on, so the assumption is visible at approval rather than at closure. Directed to: Assistant Secretary, Investment Assurance. Status: accepted, to apply from the 2027-28 NPP round.",
      ],
      note:
        "Lessons carry context, event, cost and action, and go to a pool a stranger would search. The recommendation is a different kind of thing — it is aimed at this entity's process, and filing it as a lesson would have sent it somewhere nobody with authority to act would read it.",
    },
    {
      heading: "13. Handover, artefacts and records",
      body: [
        "Operational support transferred to Platform Services on 12 June 2026. Before transfer, the receiving team completed two routine changes and one diagnostic task with the delivery team unavailable; the eleven questions raised became the handover backlog and were closed by 30 June.",
        "Known fragility disclosed at handover: the nightly reconciliation fails if the provider feed arrives after 02:00 (twice observed, recovered by manual rerun, no alerting); the eligibility rules engine is compiled rather than configured, so an urgent policy change cannot be applied in under five working days.",
      ],
      table: {
        caption: "Artefacts",
        head: ["Artefact", "Location", "Owner", "Retention"],
        rows: [
          ["Architecture decision records", "Platform wiki / ADR", "AD Platform Services", "Business"],
          ["Data dictionary and export schema", "Records store REC-2026-0881", "AD Information Governance", "7 years"],
          ["Baseline measurement extracts", "Records store REC-2026-0881", "AD Performance Reporting", "7 years"],
          ["Benefits realisation plan", "Governance library", "Director, Provider Support", "Business"],
          ["Contracts and final acceptance", "Procurement records", "Director, Procurement", "Per schedule"],
          ["Test evidence and accessibility audit", "Platform wiki", "AD Platform Services", "Business"],
        ],
      },
      note:
        "The handover was tested rather than signed, and the fragility is written down — the two things delivery teams most often skip, because one costs time and the other feels like confessing. Every artefact carries a location and an owner; a list of names is not an index.",
    },
    {
      heading: "14. Agreement on closure",
      body: [
        "Signed by the Senior Responsible Officer, confirming that the benefits, risks, dependencies and actions recorded at sections 9 and 10 have been accepted by the owners named there.",
        "Exception: risk R4 (support staffing avoidance benefit, $0.9m) remains untransferred and is referred to the Deputy Secretary for allocation. Signature is given on the basis that this exception is recorded and pursued, not resolved.",
      ],
      note:
        "The signature is tied to the transfers, so signing is an act with content. And the exception is above the signature, not buried — the SRO signs knowing exactly what has not been accepted, which is the entire reason the section exists.",
    },
  ],
  closing:
    "This project delivered its objective, missed its outcome, ran 24 per cent over its original approval, and left one benefit without an owner. It is a normal project. A closure report that made it sound like an unqualified success would have been easy to write, would have been signed without comment, and would have taught the next team nothing.",
};
