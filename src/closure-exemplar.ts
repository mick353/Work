/**
 * Complete worked closure reports, one per departmental template.
 *
 * A course about producing a document has to show the finished document. Both
 * examples cover the same project so the two forms can be compared directly,
 * and both show the uncomfortable version — a cost overrun against original
 * approval, a benefit that missed, a transfer nobody accepted — because a
 * worked example of the easy case teaches nothing.
 */

import type { LessonTable } from "./course";

export type ExemplarSection = {
  /** Numbered or named as it appears in the form. */
  heading: string;
  /** The report text, as paragraphs. */
  body?: string[];
  table?: LessonTable;
  /** Paragraphs after the table, where a section argues from its own figures. */
  body2?: string[];
  /** Fixed-width block — a statement, register extract or list. */
  artefact?: string;
  /** Why it is written this way. Not part of the report. */
  note: string;
};

export type Exemplar = {
  /** Short label for the switcher. */
  id: string;
  tab: string;
  title: string;
  subtitle: string;
  intro: string;
  meta: { label: string; value: string }[];
  sections: ExemplarSection[];
  closing: string;
};

const CASE_INTRO =
  "One report, end to end, for a project that broadly succeeded and missed several things. The grey notes beside each section are commentary for you, not part of the document. Read the report first and ignore them; then read them and see what each section is doing.";

/* ------------------------------------------------------------------ *
 * The full template — Tier 1 and Tier 2
 * ------------------------------------------------------------------ */

const fullTemplate: Exemplar = {
  id: "full",
  tab: "Full template (Tier 1–2)",
  title: "Provider Application Status",
  subtitle: "Project Closure Report — the full template, worked end to end",
  intro: CASE_INTRO,
  meta: [
    { label: "Form", value: "Project Closure Report Template — Tier 1 and Tier 2" },
    { label: "Status", value: "Illustrative — not a real DEWR project" },
    { label: "Length", value: "Front matter plus fifteen sections" },
  ],
  sections: [
    {
      heading: "Document Control",
      table: {
        caption: "Version history",
        head: ["Version", "Change description", "Date"],
        rows: [
          ["0.1", "Initial draft for project team review", "14 Jul 2026"],
          ["0.2", "Financial summary and benefits owners added following Finance review", "28 Jul 2026"],
          ["0.3", "Residual risk R4 escalated to SRO; benefits section revised", "11 Aug 2026"],
          ["1.0", "Approved by SRO", "19 Aug 2026"],
        ],
      },
      note:
        "Front matter, not a numbered section. The 0.3 row is the useful one: it records that an unresolved risk was escalated rather than smoothed away, which is visible here and nowhere else in the document.",
    },
    {
      heading: "Key Project Contacts",
      table: {
        caption: "Roles as defined in the P3M Framework",
        head: ["Role", "Name"],
        rows: [
          ["Senior Responsible Officer", "First Assistant Secretary, Provider Services"],
          ["Project Manager", "Director, Provider Platform Delivery"],
          ["Senior User / Business Owner", "Assistant Secretary, Provider Support Branch"],
          ["Group PMO contact", "Director, Digital Group PMO"],
        ],
      },
      note:
        "Names the people a reader in three years has to find. The Senior User is listed because they sign for the receiving side, and their absence from a contacts table is usually a sign they were not involved.",
    },
    {
      heading: "1. Purpose of this Document",
      body: [
        "This report closes the Provider Application Status project. It assesses the project against the Business Case, the Project Management Plan and the project's objectives, and transfers six benefits, four residual risks, two follow-on actions and one unresolved dependency to the owners named in sections 10, 11 and 14.",
        "The Senior Responsible Officer and the Project Board use it to assess the success of the project, inform best practice, resolve open issues where possible, and transition activities to business as usual. Section 3 records the approvals.",
      ],
      note:
        "Names the decisions and who takes them. A purpose section that says 'this document reports on the closure of the project' has restated the title and told nobody whether the document is theirs to act on.",
    },
    {
      heading: "2. Introduction and Background",
      body: [
        "Employment service providers could not reliably see how far a participant's application had progressed. Information sat across three systems, none of it provider-facing, so providers rang the support line to ask — generating roughly 34,000 avoidable contacts a year against a support function sized for 20,000.",
        "The project delivered a self-service application status view in the provider portal, drawing on the case management system and the payments platform, with status definitions agreed with Policy Branch.",
        "Known internally as Provider Status; appears as PANDA in planning papers before August 2023. New Policy Proposal reference 2023-DEWR-114. Tier 2. Delivered August 2023 to June 2026 by an internal team of 14 with an integration vendor, at a final cost of $47.3m against $38.1m originally approved.",
      ],
      note:
        "Written for someone who has never heard of it. The internal name, the old codename, the NPP reference and the tier are how a reader in three years finds this at all; the contact numbers are how they judge whether it is worth reading.",
    },
    {
      heading: "3. Approvals",
      body: [
        "It is agreed that the original project objectives have been met subject to approved changes; that provision has been made to address all open issues and risks, with the exception recorded below; that project outcomes are in place and transferred to BAU, with one exception recorded at section 10; that resources assigned to the project can be released from 30 September 2026; and that the Post Implementation Review has been assigned to Provider Support Branch, with all project documentation up to date.",
        "Exception to the second assertion: residual risk R4, the support staffing avoidance benefit, has no accepted owner. Provider Support Branch has declined it twice on the grounds that staffing levels are set centrally. This is presented to the SRO as an allocation decision rather than as an outstanding administrative action.",
      ],
      table: {
        caption: "Approval",
        head: ["Role", "Name", "Approval date"],
        rows: [
          ["Project Board", "Chair, Provider Services Investment Board", "18 Aug 2026"],
          ["Senior Responsible Officer", "FAS, Provider Services", "19 Aug 2026"],
          ["Project Manager", "Director, Provider Platform Delivery", "14 Aug 2026"],
          ["Senior User / Business Owner", "AS, Provider Support Branch", "18 Aug 2026"],
        ],
      },
      note:
        "The five assertions are quoted, and the one that is not fully true is qualified in place rather than left to be discovered. Putting the exception here, above the signature block, is what makes the signature mean something.",
    },
    {
      heading: "4. Project Manager's Report",
      body: [
        "The project delivered its core objective. The status view was released to all providers in March 2026 and is in routine use, with 78 per cent of active provider organisations accessing it at least weekly.",
        "It cost 24 per cent more than originally approved and arrived twenty-two months later than the original schedule, across two approved rebaselines. The dominant cause in both cases was integration scope: the original estimate assumed two interfaces to the case management system and the delivered solution required seven, a finding that emerged in discovery and was accepted at the first rebaseline.",
        "The benefit that justified the investment has moved less than forecast. Contact volume fell to 28,900 a year against a forecast of 20,400. The system performs to specification and take-up is high; the forecast was built on a comparator that did not hold. That is set out at section 11 and recorded as a lesson.",
      ],
      note:
        "Three paragraphs: what was achieved, what it cost, and the thing that did not work. Written in that order because a reader who stops after the first paragraph should still have been told the project was late and over.",
    },
    {
      heading: "5. Review of the Business Case",
      body: [
        "The Business Case remains valid in its problem statement and largely invalid in its cost and benefit estimates.",
        "The problem — providers unable to see application status, driving avoidable contact — was correctly identified and is evidenced by the measured reduction in contact volume, even though that reduction was smaller than forecast. Nothing in delivery suggested the investment was aimed at the wrong problem.",
        "The cost estimate understated integration by a factor of 3.4. The benefit estimate assumed contact would fall in proportion to visibility, on the precedent of the 2023 online lodgement rollout. That rollout was a mandatory channel change; this is an opt-in information screen, and the comparator was not sound. Both are recorded as lessons at section 15 under Project planning and Budget.",
      ],
      note:
        "Separates the parts of a business case that can be wrong independently. A project can be worth doing and badly estimated, and saying so precisely is more useful than a verdict on the case as a whole.",
    },
    {
      heading: "6. Review of Project Objectives",
      body: [
        "Objective as approved: 'Provide employment service providers with self-service visibility of participant application status, reducing avoidable contact with the provider support line.'",
      ],
      table: {
        caption: "Performance against targets and tolerances",
        head: ["Dimension", "Target", "Outcome", "Within tolerance"],
        rows: [
          ["Time", "Delivery by Aug 2024", "Jun 2026, after two approved rebaselines", "No — escalated, rebaselined twice"],
          ["Cost", "$38.1m", "$47.3m, +24%", "No — both increases approved"],
          ["Quality", "Under 12 severity-3 defects at release", "9 severity-3, no severity-1 or 2", "Yes"],
          ["Scope", "Provider and participant visibility", "Provider only; participant view withdrawn", "No — withdrawn by Board decision"],
          ["Benefits", "0.60 contacts per application", "0.83", "No — 38% short"],
          ["Risk", "No risk outside appetite at closure", "One risk unallocated (R4)", "No — referred to SRO"],
        ],
      },
      body2: [
        "One objective was withdrawn. 'Extend status visibility to participants directly' was removed from scope in November 2025 by the Project Board, on advice that participant-facing release required a privacy assessment that could not be completed in the funded period. It is not delivered and is not counted as a benefit.",
      ],
      note:
        "Reported against tolerance rather than as good or bad. Four of six outside tolerance with every breach approved or escalated describes a project that was managed; the same four with no approvals would describe one that was not.",
    },
    {
      heading: "7. Project Management Deliverables",
      table: {
        caption: "Artefacts required under the P3M Framework for a Tier 2 project",
        head: ["Documentation", "Version / ID", "Delivery date / comments"],
        rows: [
          ["Concept Definition", "1.0", "Mar 2023"],
          ["Business Case (NPP 2023-DEWR-114)", "2.1", "Jun 2023; v2.1 reflects the Nov 2025 scope withdrawal"],
          ["Assurance Approach", "1.2", "Oct 2023"],
          ["Project Management Plan", "3.0", "Rebaselined Mar 2024 and Aug 2025"],
          ["Project Schedule", "3.0", "Aligned to PMP v3.0"],
          ["Benefit Profiles", "1.1", "Six profiles; B5 added Feb 2024"],
          ["Benefits Realisation Plan", "1.0", "Jun 2023 — not revised after the Nov 2025 scope change"],
          ["Stakeholder Engagement and Communications Strategy", "1.0", "Sep 2023"],
          ["Risk Management Plan (RiskNet2)", "PLAN-4471", "Maintained to closure; attached"],
          ["Privacy Impact Assessment", "1.0", "Nov 2025 — completed after provider release, before the withdrawn participant scope"],
          ["Change Register", "—", "31 requests, 24 approved, 7 rejected; attached"],
          ["Project Closure Report", "1.0", "This document"],
          ["Project Status Report", "—", "Prepared and reviewed fortnightly; two gaps in Feb 2025 during resourcing change"],
          ["Project Change Request", "—", "Each recorded in the Change Register"],
        ],
      },
      note:
        "Two rows carry findings a reader would otherwise miss: the Benefits Realisation Plan was never updated after scope was cut, and status reporting lapsed for a month. Both became lessons. A table of clean version numbers would have hidden them.",
    },
    {
      heading: "8. Review of Project Specific Deliverables",
      table: {
        caption: "What the project produced",
        head: ["Deliverable", "Purpose", "Delivery date / comments"],
        rows: [
          ["Provider status view", "Lets providers see application progress without contacting the support line", "Mar 2026 — delivered in full"],
          ["Status definition set", "Common language for application states across three systems, agreed with Policy Branch", "Jan 2025 — delivered in full"],
          ["CMS and payments integration", "Supplies status data to the portal", "Feb 2026 — seven interfaces against two estimated"],
          ["Provider bulk export", "Lets large providers reconcile status offline", "Not delivered — dependency on the provider gateway roadmap, no committed date"],
          ["Participant status view", "Direct participant visibility", "Not delivered — withdrawn by Project Board, Nov 2025"],
        ],
      },
      note:
        "The purpose column is what makes this readable in three years. The last two rows are both 'not delivered' and are entirely different facts: one is an approved decision, the other is an open dependency that needs an owner. Section 10 carries it.",
    },
    {
      heading: "9. Review of Milestones",
      table: {
        caption: "Against the original baselined schedule",
        head: ["Key milestone", "Scheduled", "Actual", "Comments"],
        rows: [
          ["Discovery complete", "Feb 2024", "Feb 2024", "On time"],
          ["Integration design approved", "Jun 2024", "Nov 2024", "22 weeks. Interface count rose from 2 to 7. CR-009, first rebaseline"],
          ["CMS integration complete", "Nov 2024", "Jun 2025", "31 weeks against original, 13 against revised. Definition narrowed Apr 2025 to exclude two low-volume interfaces; agreed at the integration working group and not raised as a change request"],
          ["Provider release", "Feb 2025", "Mar 2026", "56 weeks against original. Second rebaseline CR-021 approved Aug 2025"],
          ["Benefits baseline confirmed", "Aug 2025", "Sep 2025", "4 weeks, within tolerance"],
        ],
      },
      note:
        "The CMS row is the most useful line in the report. It carries the delay, the approved part, the part that was never approved, and where the record is incomplete — and it writes two lessons, one under Schedule and one under Change control.",
    },
    {
      heading: "10. Outcomes",
      table: {
        caption: "Outcomes and ongoing ownership",
        head: ["Outcome", "Responsible Business Owner", "Status"],
        rows: [
          ["Providers can self-serve application status", "AS, Provider Support Branch", "In place, accepted 12 Aug 2026"],
          ["Common status definitions maintained across systems", "Director, Eligibility Policy", "In place, accepted 5 Aug 2026"],
          ["Support line demand managed against reduced volumes", "AS, Provider Support Branch", "In place, accepted 12 Aug 2026"],
          ["Post Implementation Review", "Director, Provider Support Branch", "Assigned; scheduled Jun 2027, scope agreed"],
          ["Bulk export dependency", "AD, Platform Services", "NOT TRANSFERRED — Provider Systems has no committed date"],
        ],
      },
      note:
        "Acceptance dates, not intentions. The last row says NOT TRANSFERRED in the table rather than in a footnote, because a reader scanning this column for problems will only look in this column.",
    },
    {
      heading: "11. Benefits",
      table: {
        caption: "Against the Benefit Profiles",
        head: ["ID", "Benefit", "How measured", "Owner", "When realised / measured"],
        rows: [
          ["B1", "Reduced avoidable contact — $3.1m p.a. forecast", "Contacts per application, monthly CMS extract", "AS, Provider Support Branch", "Partly realised: $1.9m p.a. from Jun 2026. Reviewed each Dec"],
          ["B2", "Faster provider action on applications", "Median days to provider action", "AS, Provider Support Branch", "Realised: 4.2 days against 4.0 target. Standing Service Performance pack"],
          ["B3", "Improved provider confidence", "Portal satisfaction score", "Director, Provider Engagement", "Realised: +11 points. Annual provider survey"],
          ["B4", "Reduced duplicate applications", "Duplicate rate at lodgement", "Director, Eligibility Policy", "On track: measurement begins Dec 2026"],
          ["B5", "Fewer status escalations to the department", "Escalations per 1,000 applications", "AS, Provider Support Branch", "Realised: down 34%"],
          ["B6", "Support staffing avoidance — $0.9m p.a.", "Staffing against forecast demand", "UNALLOCATED", "Referred to SRO at section 3"],
        ],
      },
      body2: [
        "B1 is the benefit that justified the investment and it has landed at roughly 61 per cent of forecast. The shortfall is approximately 8,500 contacts a year, worth about $1.2m annually against the forecast saving. The cause is forecast error rather than delivery failure: the system performs to specification and take-up is high, but the forecast assumed contact would fall in proportion to visibility on a comparator that was a mandatory channel change rather than an opt-in screen.",
      ],
      note:
        "Every benefit carries a measurement that exists without new funded work, and an owner who has agreed. B6 is shown unallocated rather than pointed at a branch that has refused it twice — the honest version is the one the SRO can act on.",
    },
    {
      heading: "12. Change Control",
      body: [
        "Change was managed through the Project Board under the P3M change process. Thirty-one change requests were raised: twenty-four approved, seven rejected. The Change Register is attached.",
        "One scope change did not pass through the process. The definition of 'CMS integration complete' was narrowed in April 2025 to exclude two low-volume interfaces. This was agreed at the integration working group, which is not a change authority, and was never raised as a change request. CR-014 covers the associated date movement but not the scope reduction. This is recorded as a lesson under Change control.",
      ],
      table: {
        caption: "Material changes",
        head: ["Change ID", "Description", "Decision"],
        rows: [
          ["CR-009", "Integration scope from two interfaces to seven; first rebaseline", "Approved Mar 2024"],
          ["CR-014", "CMS integration date moved to Jun 2025", "Approved Apr 2025"],
          ["CR-018", "Add provider bulk export to scope", "Rejected — no funded capacity"],
          ["CR-021", "Second rebaseline; provider release to Mar 2026", "Approved Aug 2025"],
          ["CR-027", "Withdraw participant-facing status view", "Approved Nov 2025"],
          ["CR-030", "Extend vendor engagement three months for defect support", "Rejected — absorbed internally"],
        ],
      },
      note:
        "Seven rejections out of thirty-one is the number that makes this section credible: it shows a gate that refused things. The unapproved narrowing is stated plainly, because a reader comparing sections 8 and 9 would find it anyway.",
    },
    {
      heading: "13. Financial Summary",
      table: {
        caption: "Against the originally approved budget",
        head: ["Financial year", "Approved OPEX", "Approved CAPEX", "Actual OPEX", "Actual CAPEX", "Variance"],
        rows: [
          ["2023–24", "$3.4m", "$9.1m", "$3.9m", "$8.2m", "+$0.5m / −$0.9m"],
          ["2024–25", "$4.2m", "$11.8m", "$4.9m", "$14.1m", "+$0.7m / +$2.3m"],
          ["2025–26", "$2.8m", "$6.8m", "$4.1m", "$12.1m", "+$1.3m / +$5.3m"],
          ["Total", "$10.4m", "$27.7m", "$12.9m", "$34.4m", "+$2.5m / +$6.7m"],
        ],
      },
      body2: [
        "Total actual cost $47.3m against $38.1m originally approved, an overrun of $9.2m or 24 per cent. Both increases were approved at rebaseline. The original approval was still exceeded, and that is the comparison this section reports against.",
        "The dominant driver is CAPEX in 2025–26: integration build for five interfaces beyond the original estimate. OPEX overran in every year, largely vendor engagement extended alongside the schedule.",
        "Of the $34.4m capitalised, $1.6m relates to the withdrawn participant-facing view. That work produced no asset and has been expensed, which is reflected in the 2025–26 OPEX position.",
      ],
      note:
        "Split by year and by OPEX and CAPEX because that is how the department reports it, and because a single net figure would have hidden the $1.6m written off. The capitalisation judgement is stated rather than left in the ledger.",
    },
    {
      heading: "14. Asset Management",
      table: {
        caption: "Assets in use at closure",
        head: ["Asset", "Business owner", "IT owner", "Location", "Handover timing"],
        rows: [
          ["Provider status view (portal module)", "AS, Provider Support Branch", "AD, Provider Platform Services", "Provider Portal production tenancy", "Complete, 12 Aug 2026"],
          ["Status definition service", "Director, Eligibility Policy", "AD, Integration Services", "Departmental integration layer", "Complete, 5 Aug 2026"],
          ["CMS status interfaces (7)", "AS, Provider Support Branch", "AD, Integration Services", "Departmental integration layer", "Complete, 5 Aug 2026"],
          ["Provider status reporting dataset", "AD, Performance Reporting", "AD, Data Platform", "Analytics workspace ANL-PRV-02", "30 Sep 2026 — see action A7"],
        ],
      },
      note:
        "Two owners each, because the area that uses an asset and the area that keeps it running are different. The last asset has a handover date after closure, which is legitimate provided a named person is accountable for it happening — action A7 at section 10 of the register.",
    },
    {
      heading: "15. Lessons Learned",
      body: [
        "The following lessons were recorded during the project lifecycle and have been entered in the Departmental Lessons Learned Register. Categories with nothing material to report are marked accordingly rather than left blank.",
      ],
      table: {
        caption: "Extract — the categories with material findings",
        head: ["Project area", "Key learnings", "Recommendation"],
        rows: [
          ["Governance arrangements", "Strengths: Board met monthly and took every scope decision. Areas to improve: the integration working group made a scope decision it had no authority to make.", "Define which forums may vary a deliverable definition, not only a date."],
          ["Project planning", "Strengths: discovery correctly identified the problem and completed on time. Areas to improve: integration scope was estimated at two interfaces against seven delivered.", "For work integrating with the case management system, treat interface count as unknown until discovery completes."],
          ["Budget", "Strengths: both increases were approved before commitment. Areas to improve: the benefit forecast used a mandatory channel change as the comparator for an opt-in screen.", "Where a benefit forecast rests on a precedent, state the precedent in the business case so its fit can be challenged."],
          ["Change control", "Strengths: 7 of 31 requests were refused. Areas to improve: one scope narrowing bypassed the process entirely.", "Audit the change register against the deliverables table before closure."],
          ["Assurance", "Strengths: the Gate 4 recommendation to split the release was acted on and absorbed the identity broker change. Areas to improve: assurance findings were recorded without noting which changed a decision.", "Record for each assurance finding whether it changed delivery or was noted and left."],
          ["Contribution to Closing the Gap", "Strengths: status definitions were reviewed with providers serving remote communities. Areas to improve: no disaggregated take-up measure was built, so effect on remote providers cannot be assessed.", "Where a service reaches remote providers, build the disaggregated measure at release rather than retrofitting it."],
          ["Transition to operations", "Strengths: five of six outcomes accepted with dated evidence. Areas to improve: one benefit was refused twice and remained unallocated at closure.", "Raise a refused ownership transfer to the SRO at the point of the second refusal, not at closure."],
        ],
      },
      note:
        "Both columns filled for every category, and the register reference given. Contribution to Closing the Gap is answered rather than skipped — the honest answer is that the measure was not built, which is itself the recommendation.",
    },
  ],
  closing:
    "The report runs to about 2,600 words. Its usefulness is concentrated in four places: the exception in section 3, the CMS row in section 9, the unallocated benefit in section 11, and the unapproved scope change in section 12. Each of those is a thing that went wrong, stated where a reader will find it.",
};

/* ------------------------------------------------------------------ *
 * The Tier 3 form
 * ------------------------------------------------------------------ */

const tierThree: Exemplar = {
  id: "tier3",
  tab: "Tier 3 form",
  title: "Provider Notification Preferences",
  subtitle: "Project Closure Report — the Tier 3 form, worked end to end",
  intro:
    "A smaller project on the simplified form. Same discipline, a third of the length: the form asks for ratings and evidence rather than prose, which is easier to complete and harder to fudge.",
  meta: [
    { label: "Form", value: "Project Closure Report — Tier 3 (piloted from July 2026)" },
    { label: "Status", value: "Illustrative — not a real DEWR project" },
    { label: "Length", value: "Nine table blocks" },
  ],
  sections: [
    {
      heading: "Project Information",
      table: {
        caption: "Overall delivery status",
        head: ["Overall delivery status", "Start date", "Completion date"],
        rows: [["PARTIALLY ACHIEVED", "3 Feb 2025", "27 Jun 2026"]],
      },
      note:
        "One word at the top of the document, chosen from three. Partially achieved is the honest answer for a project that delivered its core scope and dropped one deliverable, and it is what gets aggregated across the department.",
    },
    {
      heading: "Delivery summary",
      table: {
        caption: "Planned against delivered",
        head: ["Planned deliverable", "Delivered", "Status", "Comments / approved variation"],
        rows: [
          ["Provider notification preference settings", "Preference screen in the provider portal", "Achieved", "Delivered in full, Apr 2026"],
          ["Email and SMS channel selection", "Email selection only", "Partially achieved", "SMS deferred; gateway contract not in place. Approved by the Project Board, Feb 2026"],
          ["Preference migration for existing providers", "8,400 of 8,400 providers migrated", "Achieved", "Completed May 2026"],
          ["Notification volume reporting", "Not delivered", "Not achieved", "Descoped Jan 2026 to protect the delivery date. No approval recorded"],
        ],
      },
      note:
        "Four rows, four different truths. The last two are both shortfalls and only one of them was approved — writing 'no approval recorded' is what turns a quiet descope into a finding.",
    },
    {
      heading: "Key milestones",
      table: {
        caption: "Planned against actual",
        head: ["Milestone", "Planned", "Actual", "Variance / comments"],
        rows: [
          ["Design agreed", "28 Mar 2025", "11 Apr 2025", "2 weeks, within tolerance"],
          ["Build complete", "29 Aug 2025", "14 Nov 2025", "11 weeks. Portal framework upgrade dependency"],
          ["Provider release", "31 Oct 2025", "24 Apr 2026", "25 weeks against the original date"],
          ["Migration complete", "30 Nov 2025", "22 May 2026", "25 weeks, tracking the release"],
        ],
      },
      note:
        "No rebaseline column, because there was no rebaseline — the project ran 25 weeks late against its original dates and never formally moved them. That absence is a governance finding and it appears in the lessons block.",
    },
    {
      heading: "Benefits",
      table: {
        caption: "Status and ongoing ownership",
        head: ["Expected benefit", "Status", "BAU owner", "Next steps"],
        rows: [
          ["Fewer unwanted notifications to providers", "Achieved", "Director, Provider Engagement", "Monitored in the quarterly provider experience pack"],
          ["Reduced notification cost", "On track", "AD, Provider Platform Services", "Measure at 12 months once volumes stabilise; first read Apr 2027"],
          ["Higher provider engagement with notifications", "At risk", "Director, Provider Engagement", "Depends on SMS, which was deferred. Reassess when the gateway contract is settled"],
        ],
      },
      note:
        "'On track' and 'At risk' are both legitimate at closure — most benefits land afterwards. The third row names what it depends on, so the owner inherits the dependency rather than just the target.",
    },
    {
      heading: "Lessons learned",
      table: {
        caption: "One row per lesson",
        head: ["Theme", "Lesson learned", "Recommendation / action"],
        rows: [
          ["Schedule", "The project ran 25 weeks past its original dates without ever rebaselining, so status reporting showed variance against dates nobody believed.", "Rebaseline or escalate once variance exceeds tolerance; do not keep reporting against a superseded date."],
          ["Change control", "Notification volume reporting was descoped in January with no approval recorded.", "Any deliverable removed from scope goes to the Board, including one removed to protect a date."],
          ["Transition to BAU", "Two BAU owners were identified late and accepted in the final fortnight, which compressed handover.", "Identify BAU owners at design, not at closure."],
          ["Closing the Gap", "Preference defaults were not tested with providers in remote communities, where SMS is often the only reliable channel.", "Where a channel choice affects remote service delivery, test defaults with those providers before release."],
        ],
      },
      note:
        "Free themes rather than eighteen fixed categories, but the same rule applies: each lesson names what happened specifically enough that another project would recognise it, and each carries an action.",
    },
    {
      heading: "Transition to BAU",
      table: {
        caption: "What transferred, and the evidence",
        head: ["Deliverable transitioned", "BAU owner", "Evidence and status of acceptance", "Handover status", "Outstanding actions"],
        rows: [
          ["Preference screen and settings", "AD, Provider Platform Services", "Accepted at Platform Services leadership meeting, 10 Jun 2026, minuted", "Complete", "—"],
          ["Preference data and migration record", "AD, Data Platform", "Accepted by email, 17 Jun 2026, attached", "Complete", "—"],
          ["Provider communications about preferences", "Director, Provider Engagement", "Accepted at branch meeting, 24 Jun 2026", "Complete", "—"],
          ["SMS channel (deferred scope)", "AD, Provider Platform Services", "Briefed 24 Jun 2026; not accepted pending gateway contract", "Not started", "A2 — confirm ownership once contract settled. Due 31 Oct 2026"],
        ],
      },
      note:
        "The evidence column is what makes the first three rows true. The fourth says 'briefed, not accepted' and carries an action with a date, which is the correct treatment of a handover that has not happened.",
    },
    {
      heading: "Financial summary",
      table: {
        caption: "Budget, actual and staffing",
        head: ["Financial year", "Approved budget", "Actual expenditure", "ASL", "Comments"],
        rows: [
          ["2024–25", "$1.10m", "$0.94m", "3.2", "Underspend: build started six weeks late"],
          ["2025–26", "$0.85m", "$1.14m", "4.1", "Overspend: extended build and delayed release"],
          ["Total", "$1.95m", "$2.08m", "—", "+$0.13m, 6.7% over approved budget"],
        ],
      },
      note:
        "ASL is reported alongside the money because staffing is the cost. The two years offset each other, which a total-only view would present as a small overspend rather than as a project that shifted a quarter of its cost into the following year.",
    },
    {
      heading: "Key risks and issues",
      table: {
        caption: "The three questions, and the plan reference",
        head: ["Question", "Response", "Detail"],
        rows: [
          ["Does the risk plan highlight any issues (realised risks) that occurred?", "Yes", "R3 — portal framework upgrade dependency, realised Jul 2025, 11 weeks of delay"],
          ["Are any risks outside appetite and/or tolerance?", "No", "—"],
          ["Are there risks requiring ongoing management in BAU?", "Yes", "R7 — providers with email-only preferences may miss time-critical notices. Owner: Director, Provider Engagement. Managed through the quarterly experience pack until SMS is available"],
          ["RiskNet2 Plan ID", "PLAN-5182", "Risk plan attached: Yes"],
        ],
      },
      note:
        "R3 is recorded as an issue because it happened. Carrying it as a risk that 'may occur' after it has occurred is the commonest error in this block, and it makes the schedule variance look unexplained.",
    },
    {
      heading: "Project closure assessment",
      table: {
        caption: "Seven areas, each with evidence",
        head: ["Assessment area", "Rating", "Evidence"],
        rows: [
          ["Scope delivered", "Partially achieved", "Three of four deliverables complete; SMS deferred with Board approval, volume reporting descoped without"],
          ["Schedule", "Significant delay", "25 weeks against original dates, no rebaseline taken"],
          ["Budget", "Over", "$2.08m against $1.95m approved, 6.7%"],
          ["Benefits", "On track", "One achieved, one measurable Apr 2027, one at risk pending SMS"],
          ["Transition to business as usual", "Outstanding actions", "Three of four accepted with dated evidence; SMS ownership open, action A2 due 31 Oct 2026"],
          ["Stakeholder engagement", "Effective", "8,400 providers migrated with 41 support contacts, against 300 forecast"],
          ["Project governance", "Partially effective", "Board met monthly; one descope did not reach it, and variance beyond tolerance was never rebaselined"],
        ],
      },
      note:
        "Every rating carries a fact a reader could check. Note that Budget is 'Over' rather than a judgement — the scale has no good option, and 6.7 per cent over is simply the position.",
    },
    {
      heading: "Project closure approvals",
      table: {
        caption: "Sign-off",
        head: ["Role", "Name", "Signature", "Date"],
        rows: [
          ["Senior Responsible Officer", "AS, Provider Services Delivery", "Approval by email, attached", "27 Jun 2026"],
          ["Project Manager", "AD, Provider Platform Delivery", "Signed", "24 Jun 2026"],
          ["Business Owner", "Director, Provider Engagement", "Approval by email, attached", "26 Jun 2026"],
        ],
      },
      note:
        "Email approval is accepted provided it is attached, which the form states. The Business Owner signature is the one that makes the transition block credible.",
    },
  ],
  closing:
    "About 900 words against the full template's 2,600, and it carries the same four hard facts: an unapproved descope, a schedule never rebaselined, a benefit at risk, and a handover not accepted. The form is shorter; the honesty required is not.",
};

export const closureExemplars: Exemplar[] = [fullTemplate, tierThree];
