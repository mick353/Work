# Delivery Assurance & Quality — Comprehensive Course Proposal

**Status:** Proposal for review and challenge  
**Repository:** `mick353/Work`  
**Intended use:** Design brief and handoff for a separate work session before any implementation begins  
**Proposed course title:** **Delivery Assurance & Quality**  
**Working subtitle:** **How to know whether a change is genuinely ready to accept, release and operate**

---

## 1. Executive summary

This proposal recommends a new training package for the Product Practice learning system focused on **delivery assurance and quality judgement**.

The central problem is not that delivery teams lack testing terminology. The problem is that organisations routinely confuse **activity evidence** with **assurance evidence**.

Examples include:

- “95% of test cases passed” being treated as proof that a service is ready;
- “no Severity 1 defects remain” being treated as proof that residual risk is acceptable;
- User Acceptance Testing being reduced to a sign-off exercise;
- operational readiness being checked after technical deployment decisions are effectively locked in;
- release decisions being made from status labels rather than from an explicit view of exposure, consequence and control;
- scope completion being treated as equivalent to business acceptance;
- vendor assertions being accepted without independent evidence;
- non-functional concerns such as accessibility, security, resilience, performance, data quality, supportability or recoverability being considered separately rather than as part of one decision about service readiness;
- decision-makers receiving large volumes of testing data but insufficient information about what remains uncertain.

The proposed course should therefore **not** be a conventional software testing course, QA certification course, test-management primer, or checklist tutorial.

It should teach the learner to answer one high-value professional question:

> **What evidence would justify accepting this change, what uncertainty remains, who owns the residual risk, and what would make release unsafe?**

This gives the course a wider audience than testers alone. It is relevant to product managers, delivery managers, project managers, business owners, service owners, test leads, technical leads, operational teams, governance officers, vendors and executives who participate in acceptance or release decisions.

The course should treat testing as one component of assurance rather than as the whole assurance system.

The design should follow the repository’s established authoring model:

1. establish the governing artefacts and authority hierarchy before authoring content;
2. structure the course around the real decisions and artefacts used at work;
3. teach judgement through scenarios rather than through passive exposition;
4. separate departmental requirements from course additions and external comparators;
5. provide complete worked examples where the learner must interpret conflicting evidence;
6. use assessment to test transfer, not recognition;
7. preserve human accountability for final assurance and release decisions.

The strongest version of this course would become the **middle layer** between the existing Product Management Fundamentals package and the Closure Reports package:

**Product thinking → requirements and evidence → assurance and acceptance → operational release → closure and benefits.**

---

# 2. Why this course belongs in the learning system

The current learning system is unusually well suited to this topic because it already supports:

- staged lessons;
- diagnostic assessment;
- knowledge checks with per-option feedback;
- applied decision scenarios;
- spaced retrieval practice;
- mixed practice;
- worked cases;
- toolkit templates;
- capstones;
- complete worked exemplars;
- field-guide reference content;
- glossary support;
- source traceability;
- explicit recording of course additions and divergences;
- offline use;
- release checks and package validation.

Delivery assurance is a judgement-heavy discipline. It is therefore a better fit for this learning model than for a slide deck followed by a simple quiz.

A weak assurance course would teach terms such as defect severity, UAT, regression, entry criteria, exit criteria, traceability and test coverage.

A strong assurance course would force the learner to decide what those things mean in context.

For example:

> A release has completed 96% of planned tests. All Severity 1 defects are closed. Six Severity 2 defects remain. The vendor states that the remaining defects are cosmetic. The business wants to release on Friday because the policy commencement date is fixed. The latest migration rehearsal produced errors in 18% of customer records. There is no proven production rollback for the data transformation. What recommendation do you make?

The learner should not be rewarded for selecting a memorised rule such as “all Severity 1 defects must be closed.”

The learner should identify that the strongest risk may not be represented by the defect register at all. The critical exposure may instead be:

- migration integrity;
- inability to reverse the change;
- operational consequences;
- an untested control;
- data reconciliation gaps;
- unsupported assumptions about defect impact;
- or a deadline that is distorting the decision.

That is precisely the kind of judgement the platform’s scenario, worked-case and capstone capabilities can train.

---

# 3. Core thesis of the course

The proposed course should install the following mental model:

> **Assurance is a structured argument, supported by evidence, that the important risks of a proposed change are understood, controlled to an acceptable level, and owned by someone with the authority to accept what remains.**

Testing contributes evidence to that argument.

Testing is not itself the argument.

A release decision is therefore not reducible to:

- percentage complete;
- number of test cases;
- number of defects;
- a traffic-light status;
- an environment sign-off;
- an executive preference;
- or a vendor statement.

A defensible release recommendation instead connects:

**intended outcome → critical behaviours → failure modes → evidence → unresolved uncertainty → controls → consequence → ownership → decision.**

This chain should be the conceptual spine of the course.

---

# 4. Course purpose

By the end of the course, a learner should be able to:

1. explain the difference between testing, quality, assurance, acceptance and release approval;
2. determine what evidence is needed for a particular delivery risk rather than merely asking whether “testing is complete”;
3. connect requirements, outcomes, risks and acceptance evidence;
4. distinguish evidence of activity from evidence of fitness for purpose;
5. interpret defect information in context rather than by severity label alone;
6. assess functional and non-functional readiness as one integrated service decision;
7. identify when UAT is meaningful and when it has become ceremonial;
8. evaluate operational readiness before release rather than after implementation;
9. identify evidence gaps, untested assumptions and misleading metrics;
10. express residual risk clearly enough for an accountable decision-maker to accept, reject or defer a release;
11. challenge vendor claims without becoming adversarial for its own sake;
12. recommend proportionate controls when complete certainty is impossible;
13. document an assurance recommendation that separates fact, inference, judgement and assumption;
14. explain who owns the final decision and why assurance staff do not silently assume that accountability.

---

# 5. Audience

## Primary audience

- Test Managers and Test Leads
- Quality Assurance Managers
- Delivery Managers
- Project Managers
- Product Managers
- Business Analysts
- Product Owners
- Service Owners
- Technical Leads
- Release Managers
- Operations / Service Transition staff

## Secondary audience

- Senior Responsible Officers
- Program and portfolio governance staff
- PMO / PPO staff
- Procurement and vendor-management staff
- Business owners participating in acceptance
- Accessibility, security, privacy, architecture and data specialists who contribute assurance evidence

## Not primarily designed for

- entry-level learners seeking detailed instruction in test execution tools;
- people seeking certification-specific terminology;
- specialist penetration testers;
- specialist performance engineers;
- specialist accessibility auditors;
- engineers seeking detailed automated-testing implementation techniques.

Those subjects may be referenced, but this course is about **decision quality across evidence domains**.

---

# 6. Scope boundaries

The course should deliberately avoid becoming an encyclopaedia of software quality.

## In scope

- assurance reasoning;
- quality risk;
- acceptance evidence;
- traceability;
- risk-based test thinking;
- defect interpretation;
- residual risk;
- UAT judgement;
- non-functional readiness;
- data migration assurance;
- operational readiness;
- vendor evidence;
- release recommendations;
- governance and risk acceptance;
- evidence packs;
- post-release validation;
- proportionate assurance based on consequence and uncertainty.

## Out of scope except where necessary for context

- detailed test automation frameworks;
- coding unit tests;
- penetration-testing methodology;
- detailed accessibility auditing technique;
- detailed performance engineering;
- detailed architecture review;
- detailed privacy impact assessment methodology;
- detailed records-management training;
- procurement law;
- service-management certification content;
- Agile or Scrum training as a standalone subject.

The course should teach how evidence from those specialist domains contributes to a release decision, not duplicate specialist training.

---

# 7. Governing artefact strategy — Phase 0 requirement

No implementation should begin until the work session completes the repository’s required authority-mapping exercise.

The other work session should identify the actual departmental artefacts used to govern or evidence:

- test planning;
- quality management;
- risk acceptance;
- release approval;
- production deployment;
- operational readiness;
- UAT or business acceptance;
- security assurance;
- accessibility assurance;
- privacy assurance;
- technical change approval;
- incident / rollback readiness;
- data migration approval;
- go-live decision-making;
- vendor acceptance where applicable.

The course must not silently invent a process hierarchy where a controlled departmental process already exists.

## Proposed authority map to investigate

The authoring session should determine the correct hierarchy among:

1. legislation and mandatory obligations where relevant;
2. Australian Government mandatory digital, security, accessibility, privacy, records and assurance requirements;
3. current departmental controlled policies and procedures;
4. current divisional / program release and assurance processes;
5. approved templates and forms;
6. role accountabilities and delegations;
7. professional testing / quality standards used only as external comparators where appropriate.

## Candidate external comparator domains to verify

The eventual research phase may consider, only where appropriate and current:

- Australian Government Digital Service Standard;
- Australian Government Information Security Manual / PSPF implications relevant to assurance;
- WCAG / Australian Government accessibility requirements;
- privacy requirements;
- Department of Finance assurance material;
- Australian Government Architecture guidance;
- ISO/IEC/IEEE software testing standards if they add value;
- ISO 25010 quality model as a comparator for quality characteristics;
- ISTQB terminology as a vocabulary comparator where useful, but not as the course spine;
- ITIL/service-transition concepts where relevant;
- ANAO findings concerning digital delivery, assurance, benefits or governance;
- UK Government Service Manual / assurance comparators where they illuminate practice but do not replace departmental authority.

The course should clearly label any such external material as comparator practice unless it actually governs the work.

---

# 8. Proposed course architecture

A twelve-stage structure is recommended for review.

The stages deliberately move from the conceptual question “what are we trying to prove?” through evidence design, interpretation and release decision-making.

---

## Stage 1 — Assurance is an argument, not a test phase

### Proposed outcome

Explain what assurance is, distinguish it from testing and inspection, and identify the decision the evidence is intended to support.

### Core idea

Assurance exists to reduce uncertainty for a decision-maker. Testing generates evidence about behaviour under selected conditions. Quality is broader than test completion. Acceptance is a business or governance decision. Release approval is an explicit decision under residual uncertainty.

### Key concepts

- quality versus testing;
- verification versus validation;
- assurance versus activity;
- evidence versus confidence;
- acceptance versus implementation;
- residual uncertainty;
- accountable decision-maker.

### Worked reasoning example

A test manager reports “all planned testing is complete.” The release authority asks, “Does that mean the service is safe to launch?” The correct response is not automatically yes. Completion says the planned work occurred. It does not establish whether the plan covered the important risks, whether evidence is reliable, or whether unresolved exposure is acceptable.

### Diagnostic misconception to target

“If every planned test passes, quality has been assured.”

---

## Stage 2 — Start with outcomes, critical journeys and consequences

### Proposed outcome

Translate intended service outcomes and failure consequences into assurance priorities.

### Core idea

Not every function deserves equal assurance effort. Risk-based assurance begins with what matters to users and the organisation, then asks how those outcomes could fail.

### Key concepts

- critical business journeys;
- high-consequence failure;
- likelihood versus impact;
- risk concentration;
- regulatory or policy constraints;
- user harm;
- operational harm;
- reputational and financial consequences;
- assumptions that must hold.

### Scenario pattern

A feature used by 90% of users has low consequence if it fails temporarily. A function used by 1% of users can create severe legal or financial harm when it fails. Which gets more assurance attention?

The course should train the learner not to use transaction volume as a proxy for risk.

---

## Stage 3 — Requirements are only useful when they can support evidence

### Proposed outcome

Assess whether requirements and acceptance criteria are sufficiently clear to support meaningful assurance.

### Core idea

Ambiguous requirements do not merely create development risk. They make later assurance weak because the team cannot distinguish a defect from an interpretation dispute.

### Key concepts

- testability;
- acceptance criteria;
- outcome requirements versus implementation detail;
- negative requirements;
- constraints;
- business rules;
- traceability;
- assumptions;
- missing non-functional requirements.

### Important tension

Traceability should not become document bureaucracy. The useful question is whether the team can show that each critical obligation, risk or behaviour is supported by sufficient evidence.

---

## Stage 4 — Design evidence around risk

### Proposed outcome

Choose proportionate assurance activities based on the nature and consequence of uncertainty.

### Core idea

A test strategy is a risk-response design, not a catalogue of test types.

### Key concepts

- risk-based testing;
- coverage models;
- positive and negative paths;
- boundary conditions;
- exploratory testing;
- production-like conditions;
- independent evidence;
- test depth versus breadth;
- confidence limits;
- evidence diversity.

### Scenario

A team has executed 4,000 automated tests but has never tested a critical end-to-end journey with production-scale data. Does the quantity of automated tests materially reduce the missing evidence?

---

## Stage 5 — Understand what metrics can and cannot tell you

### Proposed outcome

Interpret test and quality metrics without allowing summary numbers to substitute for judgement.

### Core idea

Metrics compress information. Compression creates the risk that the most decision-relevant detail disappears.

### Candidate metrics to examine

- test completion percentage;
- pass rate;
- defect counts;
- severity distribution;
- defect leakage;
- requirements coverage;
- code coverage;
- automation percentage;
- reopen rates;
- escaped defects;
- environment availability;
- mean time to resolve;
- performance thresholds.

### Questions the learner should ask

- What is the denominator?
- What important risk is not represented?
- Is the metric cumulative or current?
- Does it measure activity, output, behaviour, outcome or risk?
- Can teams game it?
- Does it conceal clustering?
- What would make the metric look good while the service remains unsafe?

### Signature exercise

Give learners a dashboard with attractive green metrics and embed one critical unresolved exposure that invalidates the overall release confidence.

---

## Stage 6 — Defects are evidence, not the risk register

### Proposed outcome

Evaluate defects by business consequence, exposure, workaround, recurrence potential and control rather than by severity label alone.

### Core idea

A defect classification is a communication mechanism. It does not replace analysis of residual risk.

### Key concepts

- severity versus priority;
- likelihood of occurrence;
- affected population;
- detectability;
- workaround quality;
- reversibility;
- data corruption;
- cumulative defects;
- known errors;
- risk acceptance;
- defect clustering as a quality signal.

### Scenario

A Severity 3 defect occasionally produces incorrect payment information but has a manual workaround. A Severity 2 defect causes a prominent but harmless display failure. Which is more significant for release?

The learner should recognise that labels must not outrank consequence.

---

## Stage 7 — User Acceptance Testing must test acceptance

### Proposed outcome

Distinguish meaningful business acceptance from ceremonial UAT.

### Core idea

UAT is valuable when business representatives test whether the solution supports real work and agreed outcomes. It is weak when users simply repeat system test scripts or sign a document they did not meaningfully evaluate.

### Key concepts

- representative users;
- realistic workflows;
- business process integration;
- policy / operational interpretation;
- acceptance ownership;
- evidence of fitness for purpose;
- independence from build-team optimism;
- UAT entry conditions;
- unresolved system defects before UAT;
- sign-off pressure.

### Strong scenario

The business owner has signed UAT completion because the deadline is fixed, but users tested only happy-path transactions and were instructed not to retest defects already verified by the technical team. What does the sign-off actually prove?

---

## Stage 8 — Quality is non-functional as well as functional

### Proposed outcome

Integrate non-functional evidence into the overall readiness judgement.

### Core idea

A function can behave correctly and still produce an unacceptable service.

### Domains to integrate

- performance;
- resilience;
- recovery;
- accessibility;
- security;
- privacy;
- maintainability;
- supportability;
- interoperability;
- observability;
- capacity;
- data integrity;
- records obligations where relevant.

### Course discipline

This stage should not pretend the learner becomes a specialist in every domain. It should teach what questions require specialist assurance, how to understand the resulting evidence, and how missing evidence affects release confidence.

---

## Stage 9 — Data migration and irreversible change

### Proposed outcome

Assess migration, conversion and irreversible-change risk using reconciliation, rehearsal, rollback and data-quality evidence.

### Core idea

Many of the most damaging failures occur not because application functions are wrong, but because the state of the system or data becomes wrong in a way that is difficult to reverse.

### Key concepts

- migration rehearsal;
- reconciliation;
- control totals;
- orphaned records;
- duplicate records;
- transformation rules;
- sampling limitations;
- production data characteristics;
- rollback versus roll-forward;
- cutover checkpoints;
- data ownership;
- decision thresholds.

### Signature scenario

A migration rehearsal succeeds technically but 7% of records require manual remediation. The project calls this “acceptable because a process exists.” The learner must calculate or reason about operational volume, timing, error consequence and capacity before accepting that statement.

---

## Stage 10 — Operational readiness is part of quality

### Proposed outcome

Determine whether the organisation can safely operate, support, monitor and recover the service after release.

### Core idea

“Deployment succeeded” and “the service is ready” are different propositions.

### Key concepts

- monitoring;
- alerting;
- support ownership;
- service desk readiness;
- knowledge articles;
- runbooks;
- incident paths;
- escalation paths;
- backup and recovery;
- capacity management;
- training;
- user communication;
- hypercare;
- production support coverage;
- handover evidence;
- dependency readiness.

### Scenario

The software passes all acceptance tests, but the production support team has not received access to diagnostic logs and the on-call escalation path is incomplete. Is this a testing issue? No. Is it a release-quality issue? Yes.

---

## Stage 11 — Build a release recommendation that survives challenge

### Proposed outcome

Produce a concise, evidence-based release recommendation that distinguishes fact, inference, assumption, risk and decision.

### Core idea

A good assurance recommendation tells the decision-maker what is known, what is not known, why the remaining uncertainty matters, what controls exist, and who must own the residual exposure.

### Proposed recommendation structure

1. Decision requested
2. Overall recommendation
3. Critical evidence
4. Critical unresolved risks
5. Assumptions
6. Conditions / controls
7. Rollback or recovery position
8. Residual risk owner
9. Explicit trigger for no-go / defer
10. Post-release monitoring obligations

### Language discipline

Avoid unsupported statements such as:

- “testing is complete”;
- “the solution is low risk”;
- “no major defects remain”;
- “the business has signed off”;
- “all teams are comfortable.”

Replace them with evidence-based statements that specify scope and consequence.

---

## Stage 12 — Post-release evidence closes the assurance loop

### Proposed outcome

Use production evidence to confirm whether pre-release assumptions were valid and improve future assurance decisions.

### Core idea

Release approval is not proof that the assurance model was correct. Production outcomes provide the final test of assumptions.

### Key concepts

- early-life support;
- production telemetry;
- defect escape;
- incident patterns;
- business outcome validation;
- accessibility / performance in real use;
- operational load;
- unexpected user behaviour;
- lessons for future risk models;
- updating reference-class expectations.

### Bridge to Closure Reports

This stage should deliberately connect to the existing Closure Reports course by showing how release evidence, incidents, residual risks and realised quality outcomes become useful closure evidence rather than disappearing after go-live.

---

# 9. Learning arc

A simple course arc could be:

**DEFINE → TARGET → DESIGN → TEST → INTERPRET → ACCEPT → OPERATE → DECIDE → LEARN**

Expanded:

1. Define the decision.
2. Identify what matters.
3. Identify how it can fail.
4. Design evidence around the risk.
5. Execute proportionate assurance.
6. Interpret the evidence.
7. Integrate business and operational readiness.
8. Express residual uncertainty.
9. Make or support an accountable decision.
10. Validate the decision after release.

This is stronger than structuring the course by test types because it reflects the reasoning sequence used in real assurance.

---

# 10. Assessment design

The assessment should deliberately avoid easy recall items wherever judgement can be tested.

## Knowledge checks

Knowledge checks should confirm key distinctions, for example:

- activity versus assurance;
- severity versus risk;
- verification versus validation;
- UAT versus system testing;
- rollback versus recovery;
- evidence versus assertion;
- test completion versus release readiness.

## Decision scenarios

Every stage should contain at least two scenarios with realistic ambiguity.

The learner should frequently face situations where:

- every available option has a cost;
- deadlines matter;
- incomplete evidence is unavoidable;
- management prefers release;
- a vendor is confident;
- a metric looks healthy;
- the specialist view conflicts with program reporting;
- the technically safest answer may not be the proportionate answer;
- residual risk can be accepted by the correct authority rather than eliminated.

The course should not teach “never release with defects.”

It should teach **how to decide what residual risk is acceptable and who has the authority to accept it**.

---

# 11. Example scenario bank

The following are candidate scenario concepts for later authoring. They are design prompts, not final assessment items.

## Scenario A — The green dashboard

- 98% tests executed
- 97% pass rate
- no Sev-1 defects
- two Sev-2 defects
- performance environment unavailable for the final build
- production peak volume is expected to be three times the last successful performance test

Question: What is the most important assurance concern?

Expected reasoning: headline completion metrics do not compensate for missing evidence against a high-consequence production condition.

## Scenario B — The fixed legislative date

- release date cannot easily move;
- one known defect affects a low-volume pathway;
- workaround is documented;
- impact is moderate;
- business owner understands the consequence;
- monitoring is in place;
- rollback is available.

Question: Must release be blocked?

Expected reasoning: not necessarily. Assurance is not absolutist. Residual risk may be accepted if the risk is understood, controlled, proportionate and accepted by the accountable authority.

## Scenario C — UAT completed in one afternoon

- 14 business processes;
- four users;
- pre-written scripts;
- only happy paths;
- all scripts pass;
- UAT sign-off obtained.

Question: What does the sign-off establish?

Expected reasoning: it establishes only the limited evidence represented by the scripts executed. It may not support broad fitness-for-purpose claims.

## Scenario D — “Cosmetic” data defect

A record displays the wrong status colour, but downstream processing uses the same incorrect status value to determine a customer entitlement.

Question: Is the defect cosmetic?

Expected reasoning: UI appearance cannot be used to classify end-to-end consequence.

## Scenario E — Vendor confidence

The vendor reports that a defect “cannot occur in production” because it requires a race condition they consider improbable. No evidence is supplied.

Question: What should the assurance lead request?

Expected reasoning: evidence supporting likelihood, conditions, detection and consequence rather than reassurance.

## Scenario F — Rollback theatre

A rollback plan exists in the release document but has never been executed with migrated production-like data.

Question: Is rollback a control?

Expected reasoning: it is a proposed control, not yet proven evidence of recoverability.

## Scenario G — Accessibility late in delivery

The team discovers major keyboard-navigation failures three days before release. The service is public-facing and the project proposes recording them as post-release defects.

Question: What must happen before recommending release?

Expected reasoning: understand governing accessibility obligation, affected users, legal/policy consequence, workaround reality, authority and whether release with known non-conformance can be justified.

## Scenario H — One “minor” defect repeated 20,000 times

Each individual transaction error costs only a few dollars to remediate manually, but the service processes tens of thousands of transactions each day.

Expected reasoning: aggregate exposure matters.

## Scenario I — Excellent test evidence, no monitoring

All pre-production testing is strong. Production monitoring cannot detect the key failure mode.

Expected reasoning: inability to detect failure materially changes residual operational risk.

## Scenario J — Requirement met, outcome missed

The system meets every documented requirement but forces staff into a manual workaround that doubles processing time.

Expected reasoning: specification conformance is not sufficient evidence of fitness for purpose.

---

# 12. Diagnostic design

The diagnostic should identify reasoning weaknesses rather than merely content gaps.

Candidate dimensions:

1. **Metric dependence** — trusts percentages and status labels too readily.
2. **Defect dependence** — equates defect count with residual risk.
3. **Functional bias** — underweights non-functional and operational evidence.
4. **Process compliance bias** — assumes completion of required artefacts proves readiness.
5. **Authority confusion** — does not distinguish recommendation from risk acceptance.
6. **UAT ceremonialism** — assumes sign-off is meaningful regardless of test design.
7. **Deadline capture** — treats schedule pressure as evidence.
8. **Zero-risk thinking** — cannot reason proportionately about release under uncertainty.
9. **Vendor deference** — accepts supplier confidence as evidence.
10. **Traceability bureaucracy** — values traceability completeness over decision usefulness.
11. **Rollback assumption** — treats documented rollback as proven recoverability.
12. **Post-release blindness** — considers assurance finished at go-live.

The diagnostic could recommend particular stages based on these patterns.

---

# 13. Flashcard strategy

Flashcards should not be dominated by definitions.

Use the repository’s available flashcard categories to emphasise:

## Definition cards

Examples:

- residual risk;
- verification;
- validation;
- acceptance;
- release authority;
- test oracle;
- rollback;
- recovery;
- reconciliation.

## Discrimination cards

Examples:

**Front:** “96% of planned tests passed.” What does this establish?  
**Back:** That 96% of the planned tests produced passing results under their tested conditions. It does not establish that the test plan covered the most important risks or that the service is ready for release.

## Application cards

**Front:** A defect is low severity but affects every transaction. What should you consider before accepting it?  
**Back:** Aggregate exposure, consequence, frequency, detectability, workaround, reversibility and accountable risk ownership.

These should support transfer better than memorising a glossary alone.

---

# 14. Contrast library

Each stage should include observable “good versus usual” contrasts.

Examples:

| Good practice | Common weak practice | Observable tell |
|---|---|---|
| Assurance starts from critical outcomes and failure consequences | Assurance starts from a list of test types | Ask whether each major test activity can be traced to a decision-relevant risk |
| Metrics support judgement | Metrics replace judgement | Ask what important risk could remain high while every dashboard measure stays green |
| Defects are assessed by consequence | Defects are managed by labels | Review whether a low-severity defect can create high aggregate or irreversible harm |
| UAT validates real business use | UAT repeats system-test scripts | Compare UAT scenarios with actual workflows, edge cases and business decisions |
| Rollback is demonstrated | Rollback is documented | Ask for evidence of the latest successful rollback or recovery rehearsal |
| Risk acceptance is explicit | Risk acceptance is implied by release | Identify the named authority who accepted the residual risk and what they accepted |
| Operational readiness is tested | Operational readiness is a checklist | Ask whether support, monitoring and recovery mechanisms have actually been exercised |
| Release recommendation states uncertainty | Status report hides uncertainty | Look for explicit assumptions, evidence gaps and no-go triggers |

---

# 15. Worked case design

At least four worked cases are recommended.

## Case 1 — The deadline-driven public service release

### Situation

A public-facing service has a fixed policy commencement date. Functional testing is strong, but accessibility remediation is incomplete, production monitoring has gaps and one low-frequency business pathway remains uncertain.

### Teaching purpose

Show that assurance involves competing obligations and cannot be solved by one metric or one specialist perspective.

### Key decisions

- What evidence is sufficient?
- What cannot be deferred?
- What controls can reduce risk?
- Who can accept what remains?
- What language belongs in the recommendation?

## Case 2 — The migration that technically succeeded

### Situation

The data migration job completed without system errors. Reconciliation shows discrepancies across multiple record classes. Operations can manually remediate them, but the volume is uncertain.

### Teaching purpose

Separate “technical execution succeeded” from “business data state is acceptable.”

## Case 3 — Vendor green, department uncertain

### Situation

A supplier reports green status against contractual acceptance criteria. Departmental staff identify poor observability, weak support handover and defects that technically fall outside contractual severity thresholds.

### Teaching purpose

Teach the learner to separate contractual acceptance, operational readiness and service risk.

## Case 4 — The apparently over-cautious test team

### Situation

The test team recommends delay because one recovery scenario has not been proven. Program leadership argues that the probability is low and the delay would carry major policy cost.

### Teaching purpose

Prevent the course from creating reflexive conservatism. The learner must quantify or characterise the actual exposure, consider alternative controls, understand authority and decide whether residual risk can reasonably be accepted.

At least one case should conclude with release proceeding despite unresolved defects, because the course must teach proportionate judgement rather than perfectionism.

At least one case should conclude with release being blocked despite apparently strong headline metrics.

---

# 16. Capstone proposal

The capstone should be one integrated assurance exercise rather than twelve disconnected mini-tasks.

## Capstone title

**Should this service go live?**

## Capstone brief

The learner receives a realistic delivery pack containing:

- short business case / intended outcome;
- critical requirements;
- acceptance criteria;
- test summary;
- defect register extract;
- UAT report;
- performance result;
- accessibility result;
- security statement;
- migration rehearsal results;
- operational readiness checklist;
- release plan;
- rollback plan;
- vendor status report;
- risk register extract;
- deadline / policy constraint;
- short email or note from the business owner requesting release.

Some artefacts should conflict.

Some should be technically accurate but misleading when read alone.

Some evidence should be missing.

The learner must produce:

1. assurance objective;
2. top critical risks;
3. evidence assessment by risk;
4. unresolved assumptions;
5. defects that matter and defects that do not materially change the decision;
6. operational readiness assessment;
7. conditions required for release;
8. residual risks requiring explicit acceptance;
9. no-go triggers;
10. final recommendation;
11. post-release evidence to monitor.

## Capstone variants

Three or four briefs could create different reasoning problems:

### Variant A — Ready with conditions

Release is justified if explicit controls are implemented and residual risk is accepted.

### Variant B — Green metrics, unsafe release

Headline test evidence looks excellent, but one high-consequence evidence gap makes release unjustified.

### Variant C — Defects present, release justified

Several unresolved defects exist, but exposure is controlled, reversible and proportionate.

### Variant D — Business sign-off without sufficient assurance

All formal sign-offs are present, but evidence quality is weak and the learner must challenge the apparent governance completeness.

---

# 17. Worked exemplar proposal

Because this course teaches learners to produce or interpret an assurance recommendation, it should include at least one complete worked assurance / release recommendation.

The exemplar should not be a clean success case.

It should contain:

- unresolved defects;
- at least one material assumption;
- incomplete but manageable evidence;
- a real schedule constraint;
- explicit conditions;
- a named residual-risk owner;
- a recovery position;
- post-release monitoring;
- at least one point where release would be stopped if a condition changes.

## Suggested exemplar structure

### 1. Decision sought

Clear statement of what approval is requested.

### 2. Recommendation

For example: **Proceed with release subject to conditions A–D.**

### 3. Evidence supporting the recommendation

Evidence grouped by decision-relevant risk rather than by test team.

### 4. Material unresolved exposure

Explicitly state what is not proven.

### 5. Conditions precedent

Actions that must occur before deployment.

### 6. Residual risks accepted

Named risk, consequence, control and accepting authority.

### 7. Recovery / rollback

What happens if the critical failure condition occurs.

### 8. No-go triggers

Objective conditions that invalidate the recommendation.

### 9. Post-release assurance

What will be monitored and how rapidly a decision will be revisited.

Each section should carry commentary explaining why it is written that way.

---

# 18. Toolkit proposal

The toolkit should contain practical artefacts rather than generic templates.

Recommended tools:

1. **Assurance Question Canvas**
   - decision sought;
   - outcome at risk;
   - failure consequence;
   - evidence required;
   - evidence available;
   - uncertainty;
   - control;
   - residual owner.

2. **Risk-to-Evidence Matrix**
   - risk;
   - critical behaviour;
   - evidence source;
   - confidence;
   - gap;
   - decision impact.

3. **Release Recommendation Template**

4. **No-Go Trigger Checklist**

5. **UAT Design Review Checklist**

6. **Operational Readiness Evidence Map**

7. **Migration Assurance Checklist**

8. **Defect Risk Assessment Prompt**

9. **Vendor Evidence Challenge Guide**

10. **Post-Release Validation Plan**

11. **Metric Interpretation Checklist**

12. **Assumption Register for Release Decisions**

These should be designed as judgement aids, not as compliance theatre.

---

# 19. Field-guide proposal

Potential field-guide entries:

- “What does 95% test completion actually mean?”
- “When is a defect a release blocker?”
- “What makes UAT credible?”
- “What evidence supports rollback?”
- “Who can accept residual risk?”
- “What is the difference between acceptance and deployment?”
- “How do I challenge a green status report?”
- “What should I ask about a migration rehearsal?”
- “How do non-functional risks enter a release decision?”
- “How should I express uncertainty to governance?”
- “What should be monitored immediately after release?”

---

# 20. Glossary candidates

The final glossary should use governing departmental vocabulary first. Candidate terms include:

- acceptance;
- assurance;
- attestation;
- defect;
- defect severity;
- defect priority;
- evidence;
- exit criteria;
- entry criteria;
- fitness for purpose;
- functional testing;
- non-functional testing;
- residual risk;
- risk acceptance;
- rollback;
- recovery;
- reconciliation;
- regression;
- release authority;
- release recommendation;
- service readiness;
- traceability;
- UAT;
- validation;
- verification;
- workaround;
- cutover;
- hypercare;
- observability;
- control total;
- defect leakage;
- test coverage.

Definitions should not be imported wholesale from external frameworks if departmental usage differs.

---

# 21. Course tone

The course should sound operational rather than academic.

Preferred language:

- “What does this evidence actually prove?”
- “What can still go wrong?”
- “Who owns what remains?”
- “Would this control work under production conditions?”
- “What would make you change your recommendation?”
- “What is missing from the dashboard?”
- “What assumption are we treating as fact?”

Avoid:

- certification-heavy jargon;
- rigid universal rules where risk judgement is required;
- process worship;
- false certainty;
- the idea that the QA team can own everyone else’s risk;
- framing testers as gatekeepers whose job is simply to say no.

---

# 22. Important philosophical guardrail: do not train risk aversion

This is a critical design requirement.

A badly designed quality course can accidentally teach learners that the safest professional position is always to demand more testing, more documentation and more delay.

That is not mature assurance.

Every assurance activity has cost, schedule impact and opportunity cost.

The appropriate standard is **proportionate confidence**, not certainty.

The course should repeatedly force learners to distinguish among:

- unacceptable unresolved risk;
- acceptable residual risk;
- evidence that is desirable but not decision-critical;
- uncertainty that can be controlled operationally;
- uncertainty that cannot responsibly be accepted;
- risk that belongs to another accountable authority.

A mature learner should sometimes recommend release with known defects.

A mature learner should sometimes recommend delay despite strong completion metrics.

A mature learner should be able to explain both decisions using the same reasoning model.

---

# 23. Accountability model

The course should be explicit that assurance staff provide evidence and recommendations but do not automatically own final business risk.

Potential accountability distinctions to teach:

- testers own the integrity of their evidence;
- quality / assurance leads own the clarity and defensibility of the assurance recommendation within their remit;
- technical specialists own specialist evidence within their authority;
- service or business owners own operational/business acceptance where the governance model assigns it to them;
- release authorities own the release decision where formally delegated;
- executives cannot transfer accountability merely by asking the QA team to “sign off.”

The exact model must be aligned to real departmental delegations and procedures during Phase 0.

---

# 24. Vendor and supplier dimension

Vendor-delivered systems create a distinct assurance problem because contractual acceptance criteria and service readiness are not always identical.

The course should teach learners to ask:

- What has the supplier contractually proven?
- What has the department independently proven?
- What remains asserted rather than evidenced?
- Are contractual severity thresholds aligned with business consequence?
- What evidence is owned by the supplier?
- Can the department reproduce critical results?
- What happens to defects after contractual acceptance?
- Are support and warranty provisions adequate for known exposure?
- Does acceptance transfer leverage before operational confidence exists?

This may later justify a separate **Vendor Delivery Assurance** course, but the core concepts belong here.

---

# 25. AI-assisted assurance — optional course addition

AI should not become the spine of this course, but an explicit course addition could show how AI may assist assurance work while preserving human accountability.

Potential uses:

- compare requirements against test evidence;
- identify untested acceptance criteria;
- cluster defect themes;
- generate adversarial failure scenarios;
- identify contradictions across status reports;
- summarise test evidence for governance;
- challenge release assumptions;
- inspect whether a recommendation overstates evidence;
- generate candidate negative-path tests;
- compare operational readiness artefacts against declared controls.

The course must also teach limitations:

- AI-generated test ideas are not evidence of execution;
- AI can confidently misread source artefacts;
- confidential or sensitive information may have handling restrictions;
- summarisation can erase caveats;
- generated risk statements can create false precision;
- human reviewers remain accountable for the final recommendation.

A good exercise would give the learner an AI-generated assurance summary that sounds polished but quietly converts assumptions into facts. The learner must identify the unsupported claims.

This would connect naturally to a later standalone **AI-Assisted Government Work** package.

---

# 26. Relationship to existing Product Management Fundamentals course

The new course should not duplicate Product Management Fundamentals.

Instead it should extend its outcome orientation.

Potential bridges:

- product outcome → acceptance evidence;
- product risk → assurance priority;
- discovery assumption → release assumption;
- user need → critical journey;
- measurable outcome → post-release validation;
- product ownership → ongoing quality ownership.

A useful cross-course message is:

> Product management asks whether we are building the right thing. Delivery assurance asks whether we have sufficient evidence that the thing we intend to release will behave acceptably in the real service context. Neither question substitutes for the other.

---

# 27. Relationship to Closure Reports course

The Closure Reports package already teaches that closure quality suffers when teams treat the report as a form rather than as evidence of what actually happened.

This course should create upstream evidence that makes later closure stronger.

Potential bridges:

- release risks that remained open;
- defects accepted into production;
- realised quality outcomes;
- operational incidents;
- benefits affected by quality;
- migration outcomes;
- residual technical debt;
- lessons from assurance gaps;
- controls that worked or failed;
- post-release performance.

This allows a learner to see closure as the continuation of evidence, not a disconnected final form.

---

# 28. Possible future curriculum position

The proposed package could sit inside a broader delivery curriculum:

1. Product Management Fundamentals
2. Problem Framing & Discovery
3. Business Cases & Investment Logic
4. Benefits & Outcomes
5. Requirements to Acceptance
6. Risk, Issues, Dependencies & Escalation
7. **Delivery Assurance & Quality**
8. Governance & Decision Quality
9. Operational Readiness & Transition
10. Vendor Delivery Assurance
11. Closure Reports
12. Benefits Realisation After Closure

Horizontal capability packages could later include:

- AI-Assisted Government Work;
- Digital Service Standard in Practice;
- Accessibility in Digital Delivery;
- Records and Evidence;
- Data / Privacy / Security Awareness.

Delivery Assurance & Quality is a strong early addition because it connects several of these domains without requiring them all to exist first.

---

# 29. Proposed source-divergence discipline

The final course must preserve a strict distinction between:

## Source-derived requirements

What the department, Australian Government or governing authority actually requires.

## Course interpretation

Reasoning added to help the learner apply those requirements.

## Professional comparator practice

External models that illuminate assurance but do not govern the learner’s work.

## Course-created tools

Risk-to-evidence matrices, scenarios, model recommendations and teaching heuristics created specifically for the course.

The final `divergences` / course-additions section should record all material additions beyond the governing artefact.

This is especially important because testing terminology varies across frameworks and organisations.

---

# 30. Quality model for the course itself

The course should be held to a higher standard than a conventional training package because its subject is quality and assurance.

Potential release criteria:

1. Every major course claim resolves to a source or is explicitly identified as course interpretation.
2. Every stage contains at least one scenario where the obvious metric-based answer is wrong.
3. At least one case demonstrates justified release with known defects.
4. At least one case demonstrates justified delay despite strong headline metrics.
5. At least one case concerns operational rather than functional failure.
6. At least one case concerns data integrity or migration.
7. At least one case concerns supplier assurance.
8. Every stage has an observable practice contrast.
9. No assessment item can be answered reliably by choosing the longest or most cautious option.
10. “Do more testing” is never accepted as an adequate recommendation without identifying the decision-relevant uncertainty and evidence required.
11. Every capstone recommendation must name the residual-risk owner.
12. The course must clearly distinguish mandatory obligations from comparator guidance.
13. The complete course must be read end-to-end by a human reviewer familiar with actual departmental release practice.
14. The final package must pass the repository’s standard automated QA and authoring/release checks.

---

# 31. Adversarial design review — questions the other work session should challenge

Before implementation, the other session should explicitly test this proposal against the following questions.

## Course necessity

- Is this actually a distinct capability gap, or would it duplicate existing departmental training?
- Is “Delivery Assurance & Quality” the vocabulary people use internally?
- Is the learner expected to produce an artefact, support a decision, or both?

## Authority

- What is the actual governing process for release approval?
- Is there a formal release recommendation template?
- Who accepts risk?
- Who owns UAT?
- What departmental quality or test-management policies exist?
- Which external standards genuinely apply?

## Scope

- Is twelve stages too many?
- Should requirements-to-acceptance be a separate course?
- Should migration be a separate specialist module?
- Should operational readiness be expanded or split into another course?
- Is vendor assurance sufficiently common to justify inclusion?

## Audience

- Is one course useful to both test practitioners and managers?
- Should an advanced pathway exist for Test Managers / QA Leads?
- Should executives see a shorter assurance-governance variant?

## Learning design

- Do scenarios mirror real departmental decisions?
- Are there enough ambiguous cases?
- Are we accidentally teaching testers to become blockers?
- Are we reinforcing that incomplete evidence may still support a rational release decision?
- Does the learner practise communicating uncertainty, not merely identifying it?

## Implementation

- What real internal artefacts can legally and appropriately be used as course source material?
- Which internal examples require sanitisation?
- Can the capstone include realistic but synthetic evidence packs?
- Do learners need printable templates?
- Should the package include a source deck at all, or should it be document-based like Closure Reports?

---

# 32. Recommended research tasks before authoring

The other work session should complete these before drafting course content:

1. Identify all current departmental release / go-live / test / assurance policies and templates.
2. Identify the formal acceptance and risk-acceptance authorities.
3. Identify existing UAT guidance.
4. Identify existing operational-readiness or service-transition guidance.
5. Identify relevant security, accessibility, privacy and records obligations that materially affect release assurance.
6. Review relevant Australian Government assurance standards and guidance.
7. Review current Digital Service Standard implications for service quality and evidence.
8. Search ANAO findings for recurring assurance failures relevant to digital delivery.
9. Determine whether departmental Gateway / governance processes impose specific evidence expectations.
10. Identify whether testing terminology follows an established internal standard.
11. Interview or obtain input from at least one Test/QA lead, Delivery Manager, Product Manager and service/operations representative.
12. Collect anonymised examples of good and bad release recommendations, UAT evidence, migration summaries or readiness packs if permitted.

The purpose is not to collect as many sources as possible. It is to establish the actual authority hierarchy and recurring decision failures.

---

# 33. Proposed trainer / SME review group

Ideal reviewers would include representatives from:

- quality assurance / test management;
- product management;
- delivery / project management;
- operations or service management;
- business acceptance / policy operations;
- security;
- accessibility;
- architecture or platform engineering;
- data / migration where relevant;
- portfolio governance / PMO / PPO;
- vendor management or procurement where applicable.

No one reviewer should be treated as the authority for every domain.

The goal is not consensus wording. The goal is to identify where accountabilities and evidence expectations genuinely differ.

---

# 34. Suggested minimum package profile

Subject to the repository’s standards and derived-count rules, a mature package might target approximately:

- 12 stages;
- 80–100 knowledge-check items across stage pools;
- 24–30 decision scenarios;
- 18–24 diagnostic items;
- 80–100 mixed-practice items;
- 70+ flashcards weighted toward application and discrimination;
- 50–70 glossary terms;
- 12+ stage contrasts;
- 4 worked cases;
- 10–12 toolkit items;
- 10–12 field-guide entries;
- 3–4 capstone briefs;
- 1–2 complete worked assurance exemplars;
- source set determined by Phase 0 rather than by an arbitrary target.

These are planning numbers only. The repository’s current standards should remain authoritative at implementation time.

---

# 35. Course completion standard

Completion should indicate that the learner has practised the reasoning model, not that the learner is professionally certified as a Test Manager or assurance authority.

The course should retain the platform’s existing distinction between a **record of completion** and a formal professional certificate.

Potential mastery evidence:

- stage knowledge checks passed;
- scenarios completed;
- required applied assignments completed;
- capstone self-assessment completed;
- learner can produce an assurance recommendation that states evidence, uncertainty, controls, residual risk and decision authority.

---

# 36. Suggested stage assignments

Each stage should contain a short applied task.

Examples:

1. **Assurance argument:** rewrite a weak statement such as “testing is complete” into an evidence-based assurance statement.
2. **Critical outcomes:** identify the three highest-consequence failure modes for a service scenario.
3. **Requirements:** rewrite ambiguous acceptance criteria into evidence-supporting criteria.
4. **Evidence design:** map assurance activities to specific risks.
5. **Metrics:** critique a green dashboard.
6. **Defects:** reassess five defects using consequence and exposure rather than severity alone.
7. **UAT:** redesign a ceremonial UAT plan into meaningful business validation.
8. **Non-functional:** identify specialist evidence needed for a release decision.
9. **Migration:** define reconciliation and no-go thresholds.
10. **Operational readiness:** identify which checklist claims require demonstrated evidence.
11. **Recommendation:** produce a one-page release recommendation.
12. **Post-release:** create a validation plan that would prove or disprove the pre-release assumptions.

---

# 37. Potential “worked reasoning” passages

The repository requires worked reasoning in each stage. Candidate patterns:

- why a 99% pass rate can still conceal unacceptable exposure;
- why zero Sev-1 defects does not prove a low-risk release;
- why weak requirements create assurance ambiguity;
- why more test cases are not always more confidence;
- why a low-severity defect may be decision-critical;
- why business sign-off can be weak evidence;
- why functional success can coexist with service failure;
- why a documented rollback is not a proven rollback;
- why technical migration completion may hide business reconciliation failure;
- why an operational checklist can be complete while support remains unready;
- why an assurance recommendation should sometimes say “proceed” despite known defects;
- why production evidence must update the organisation’s future assurance assumptions.

---

# 38. Potential myths to challenge

The course could deliberately dismantle the following statements:

1. “If there are no critical defects, we are ready.”
2. “Testing owns quality.”
3. “UAT sign-off means the business accepts all risk.”
4. “100% requirements coverage means the service is fit for purpose.”
5. “Automation percentage is a quality metric.”
6. “If rollback is documented, it is available.”
7. “A defect’s severity tells us whether to release.”
8. “Operational readiness starts after testing.”
9. “The vendor tested it, so we do not need to challenge the evidence.”
10. “A fixed deadline means assurance standards must be relaxed.”
11. “Good assurance means eliminating all uncertainty.”
12. “The safest recommendation is always to delay.”
13. “Once production deployment succeeds, assurance is complete.”
14. “Passing the test proves the requirement was right.”
15. “Green governance status proves low risk.”

Each myth should be challenged through evidence and scenario reasoning rather than through slogans.

---

# 39. Potential advanced layer for experienced practitioners

If the platform later supports optional advanced content, experienced QA / Test Managers could receive deeper material on:

- confidence under incomplete evidence;
- Bayesian-style updating of assurance confidence without requiring formal mathematics;
- correlated failure modes;
- common-cause failure;
- sampling risk;
- production observability as an assurance control;
- test-environment representativeness;
- model-based risk coverage;
- defect clustering and latent quality signals;
- change failure rate and operational reference-class data;
- assurance independence and conflict of interest;
- vendor evidence asymmetry;
- release governance under deadline pressure;
- decision records and auditability;
- measuring whether assurance itself is effective.

This advanced layer should only be added if it serves real learner demand.

---

# 40. Measurement of training effectiveness

The learning system currently stores progress locally and has no telemetry, which is a deliberate privacy and architecture choice.

Training effectiveness therefore should not be inferred from platform analytics.

Possible evaluation approaches outside the player could include:

- pre/post scenario judgement comparison;
- review of sample release recommendations before and after training;
- SME scoring of capstone outputs;
- team retrospectives on release-decision quality;
- reduction in recurrent evidence defects in assurance packs;
- improvement in clarity of risk ownership;
- improved distinction between facts and assertions in governance material;
- fewer late discoveries of operational-readiness gaps.

Any such evaluation would need separate approval and privacy consideration if learner-level information is collected.

---

# 41. Implementation approach if approved

If the proposal survives review, implementation should follow the repository’s documented authoring process exactly.

## Phase A — Authority and artefact discovery

- identify governing sources;
- map sections, responsibilities and mandatory vocabulary;
- resolve conflicts;
- identify the real artefact or decision flow around which the course is built.

## Phase B — Course skeleton

- finalise course ID and title;
- finalise stage structure;
- map every governing requirement to a stage;
- define outcomes and core ideas.

## Phase C — Content

- author lesson sections;
- add source IDs to load-bearing claims;
- write worked reasoning;
- record course additions.

## Phase D — Assessment

- author knowledge pools;
- author scenario pools;
- build diagnostic;
- build mixed-practice pool;
- measure item quality.

## Phase E — Reference and application content

- flashcards;
- glossary;
- field guide;
- contrasts;
- toolkit;
- worked cases;
- capstone;
- exemplar.

## Phase F — Package integration

- assemble package;
- validate schema;
- derive minutes;
- add illustrations;
- register package;
- verify isolated export.

## Phase G — Human verification

- full end-to-end read;
- scenario review by SMEs;
- usability test with actual target learners;
- challenge authority-sensitive statements;
- verify printed outputs;
- verify source distinctions.

## Phase H — Release

- run complete automated verification;
- inspect diff;
- document release approval;
- publish only after human review.

---

# 42. Key risks in building the course

## Risk 1 — Course becomes generic testing theory

**Failure mode:** lots of terminology, little decision practice.  
**Control:** organise around assurance decisions and artefacts, not testing taxonomy.

## Risk 2 — Course invents departmental process

**Failure mode:** external standards silently replace real local authority.  
**Control:** complete Phase 0 authority map first.

## Risk 3 — Course teaches excessive conservatism

**Failure mode:** learners discover that “delay and test more” is always the safest quiz answer.  
**Control:** include justified-release scenarios with residual risk.

## Risk 4 — Course makes QA accountable for everyone

**Failure mode:** “QA sign-off” becomes implied acceptance of business, security, operational and policy risk.  
**Control:** teach explicit accountability boundaries.

## Risk 5 — Course becomes too broad

**Failure mode:** every quality domain becomes its own mini-certification.  
**Control:** teach decision integration and specialist evidence interfaces.

## Risk 6 — Scenarios feel artificial

**Failure mode:** learners can guess the educational answer because cases lack real organisational tension.  
**Control:** derive scenarios from anonymised real patterns and SME interviews where permitted.

## Risk 7 — Metrics are oversimplified

**Failure mode:** course replaces bad metrics with different universal metrics.  
**Control:** teach interpretation and context rather than prescribed dashboard thresholds.

## Risk 8 — Authority becomes stale

**Failure mode:** policy or release process changes after publication.  
**Control:** use reviewed dates, source records and a planned review cadence.

---

# 43. Definition of success

The course succeeds if a learner changes from asking:

> “Have we finished testing?”

or:

> “How many defects are left?”

into asking:

> “What are the critical ways this service could fail, what evidence do we have against those risks, what remains uncertain, what controls exist, and who is authorised to accept the residual exposure?”

That is the capability shift.

---

# 44. Recommendation

Proceed to **research and authority mapping**, not implementation.

The conceptual case for the course is strong because:

- it fills a clear gap between product thinking and closure;
- it suits the platform’s scenario-heavy learning model;
- it addresses professional judgement rather than easily searchable factual knowledge;
- it can serve multiple delivery roles;
- it can incorporate real departmental artefacts without becoming a template-filling course;
- it creates natural links to later courses in risk, governance, benefits, operational readiness, vendor assurance and AI-assisted work.

However, the strongest version of this package depends on discovering the actual departmental decision and authority model before finalising the stage structure.

The other work session should therefore treat this document as a **challengeable design hypothesis**.

Do not implement it simply because the structure looks complete.

First determine:

1. what real decision this course must improve;
2. what artefacts govern that decision;
3. who owns each part of the evidence;
4. who accepts the residual risk;
5. which recurring failure patterns matter most in the actual work environment;
6. which proposed stages should be retained, merged, split or removed.

Only after those questions are answered should the course move into the repository authoring pipeline.

---

# 45. One-sentence design principle

> **Train people to make defensible release decisions under uncertainty — not merely to complete testing processes.**
