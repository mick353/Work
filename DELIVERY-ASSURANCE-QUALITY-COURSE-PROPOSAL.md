# Delivery Assurance & Quality — Course Concept

**Status:** Concept approved for authority mapping and stakeholder research; not yet approved for implementation  
**Repository:** `mick353/Work`  
**Context:** Department of Employment and Workplace Relations (DEWR) digital delivery practice  
**Working title:** **Delivery Assurance & Quality**  
**Working subtitle:** **How to know whether a change is genuinely ready to accept, release and operate**

---

## 1. Purpose of this document

This document sets out the concept for a new training package in the Product Practice learning system.

It is intentionally a **course concept and design brief**, not a completed curriculum specification. It defines the problem to solve, the learner, the core reasoning model, the likely course shape, the authority and information-handling gates that must be completed first, and the criteria that should determine whether the course is worth building.

The next phase is **authority mapping and stakeholder research**. No course package should be authored until that work has confirmed:

1. the real DEWR release / assurance decision the course is intended to improve;
2. the departmental artefacts and processes that govern that decision;
3. the relevant accountabilities and delegations;
4. which obligations are discretionary, formally risk-acceptible, or mandatory;
5. which recurring delivery failures matter most in practice;
6. whether the proposed course stages remain the right structure once those facts are known.

---

# 2. The workplace problem

The proposed course addresses a common delivery problem:

> **Teams can have large amounts of testing and status information without having a clear, defensible basis for deciding whether a change is ready to release.**

The problem is not usually lack of terminology. Delivery teams already encounter terms such as UAT, regression, defect severity, entry criteria, exit criteria, operational readiness, traceability, rollback and risk acceptance.

The harder problem is interpreting those things correctly when evidence is incomplete, deadlines are real, specialists disagree, governance wants a recommendation, and not every unresolved issue has the same consequence.

Typical weak patterns include:

- “95% of test cases passed” being treated as proof of readiness;
- “no Severity 1 defects remain” being treated as proof that residual risk is acceptable;
- UAT being reduced to a sign-off exercise;
- operational readiness being checked after the technical release decision is effectively made;
- release decisions being driven by traffic-light status rather than by consequence, control and uncertainty;
- scope completion being treated as equivalent to business acceptance;
- vendor confidence being treated as evidence without sufficient corroboration;
- security, privacy, accessibility, performance, resilience, data quality and supportability being considered as disconnected specialist checks rather than as inputs to one service-readiness decision;
- decision-makers receiving large volumes of testing data but little clarity about what remains uncertain;
- QA or testing staff being asked to “sign off” risks that actually belong to a business, service, technical or delegated authority.

The course should therefore **not** be a conventional software-testing course, QA certification course, test-management primer, or checklist tutorial.

It should teach people how to reason from delivery evidence to a defensible recommendation.

---

# 3. Primary learner and workplace task

The primary learner is:

> **A person who evaluates delivery evidence, challenges readiness claims, and contributes to or produces a release recommendation.**

That is the workplace task the course should improve.

The primary audience is therefore likely to include people performing roles such as:

- Test Manager / Test Lead;
- Quality Assurance lead;
- Delivery Manager;
- Product Manager / Product Owner;
- Project Manager;
- Service Owner;
- Business representative contributing to acceptance;
- Release / transition / operational-readiness lead.

The course may also be useful to:

- Senior Responsible Officers and governance participants;
- PMO / PPO staff;
- technical leads;
- architecture, security, accessibility, privacy and data specialists contributing assurance evidence;
- vendor-management and procurement staff where acceptance decisions are involved.

The course is **not primarily intended** to teach:

- detailed test execution;
- specialist automation frameworks;
- penetration-testing methods;
- specialist accessibility auditing;
- specialist performance engineering;
- certification-specific terminology;
- detailed service-management methodology.

Those domains may provide evidence to the release decision, but this course is about **integrating and judging evidence**, not reproducing specialist training.

---

# 4. Core teaching model

The strongest part of the concept is the reasoning chain:

> **outcome → failure modes → evidence → uncertainty → controls → consequence → ownership → decision**

This should remain the conceptual spine of the course.

The learner should progressively learn to ask:

1. What outcome or obligation matters here?
2. How could it fail?
3. What evidence do we actually have?
4. What remains unknown or unproven?
5. What controls reduce the exposure?
6. What would the consequence be if the control fails?
7. Who owns the remaining risk or obligation?
8. What decision is justified by the evidence?

The course should install the following mental model:

> **Assurance is a structured, evidence-supported basis for a decision under uncertainty. Testing contributes evidence to that basis; testing is not itself the release decision.**

A defensible recommendation should therefore distinguish among:

- **fact** — what is directly evidenced;
- **inference** — what reasonably follows from the evidence;
- **assumption** — what is being treated as true but remains unproven;
- **judgement** — the professional conclusion drawn from evidence and consequence;
- **constraint** — something that cannot simply be traded away through ordinary risk acceptance;
- **residual risk** — exposure that remains after controls;
- **authority** — the person or body entitled to accept, reject or condition the decision.

---

# 5. Why this belongs in the existing learning system

The current Product Practice platform is well suited to this subject because it already supports:

- staged learning;
- diagnostic assessment;
- knowledge checks with per-option feedback;
- applied decision scenarios;
- spaced retrieval;
- mixed practice;
- worked cases;
- capstones;
- toolkit templates;
- complete exemplars;
- field guides;
- glossaries;
- source traceability;
- explicit course additions and divergences;
- offline use;
- controlled authoring and release checks.

Delivery assurance is judgement-heavy. The platform’s strongest feature is therefore not content volume; it is the ability to put learners into realistic decisions and make them explain why a recommendation is justified.

A weak course would teach definitions such as defect severity, UAT and traceability.

A stronger course would ask:

> A release has completed 96% of planned tests. All Severity 1 defects are closed. Six Severity 2 defects remain. The business wants to release on Friday because a policy date is fixed. The latest migration rehearsal produced reconciliation exceptions, rollback has not been proven with production-like data, and the vendor describes the remaining defects as cosmetic. What evidence matters most, what is still unknown, and what recommendation is justified?

The learner should not be rewarded for memorising a rule such as “all Severity 1 defects must be closed.”

The learner should determine whether the critical exposure is actually:

- migration integrity;
- lack of reversibility;
- an operational-control gap;
- unsupported vendor assumptions;
- an unmet mandatory requirement;
- weak UAT evidence;
- or something else entirely.

That is the type of professional judgement the existing platform can teach well.

---

# 6. Relationship to existing DEWR-oriented courses

This course should fit naturally between the existing **Product Management Fundamentals** and **Closure Reports** packages.

A useful lifecycle is:

> **Product thinking → requirements and evidence → assurance and acceptance → operational release → closure and benefits**

The Product Management course asks whether the team is solving the right problem and creating value.

The proposed Delivery Assurance & Quality course asks whether there is sufficient evidence that the proposed change can be accepted and operated within the applicable constraints and risks.

The Closure Reports course asks what actually happened, what evidence remains, what was achieved, and what should be learned.

The three should therefore reinforce each other rather than repeat content.

Potential bridges from Product Management include:

- user need → critical journey;
- desired outcome → acceptance evidence;
- product risk → assurance priority;
- discovery assumption → release assumption;
- product ownership → ongoing quality ownership;
- outcome measure → post-release validation.

Potential bridges into Closure Reports include:

- residual risks accepted at release;
- defects knowingly carried into production;
- migration outcomes;
- operational incidents;
- controls that worked or failed;
- realised quality outcomes;
- evidence that benefits were helped or harmed by release quality;
- lessons from assurance gaps.

---

# 7. Hard information-handling gate

The repository is currently public. This creates a non-negotiable design constraint.

> **No internal DEWR controlled material, non-public policy, sensitive operational detail, unpublished template, security-sensitive information, personal information, project evidence, internal screenshot, production data, vendor-confidential material, or other non-public departmental content is to be committed to the public repository unless it is explicitly approved for public release.**

This gate applies before source ingestion, example creation, capstone construction, screenshots, attachments or exemplar authoring.

Where useful internal artefacts exist, the course design should choose one of the following approaches:

1. **Reference only** — describe the type of artefact without reproducing it.
2. **Sanitise** — remove all internal, identifying or sensitive material under an approved process.
3. **Synthesise** — create a realistic fictional equivalent that preserves the learning problem without reproducing protected content.
4. **Separate** — keep internal artefacts outside the public repository and use them only in an appropriately controlled environment.
5. **Exclude** — do not use the artefact if its inclusion cannot be justified safely.

The information-handling decision should be recorded as part of course release review.

---

# 8. Authority mapping — required before authoring

No implementation should begin until the governing process and authority hierarchy are established.

The research phase should identify the current DEWR artefacts, processes and accountabilities relevant to:

- test planning and quality management;
- UAT / business acceptance;
- risk acceptance;
- release approval / go-live;
- production deployment;
- operational readiness;
- service transition;
- security assurance;
- accessibility assurance;
- privacy obligations;
- technical change approval;
- data migration and reconciliation;
- rollback / recovery;
- vendor acceptance;
- post-release monitoring;
- governance reporting and decision records.

The course must not silently replace departmental practice with a generic external framework.

A likely authority hierarchy to verify is:

1. applicable legislation and mandatory obligations;
2. whole-of-government mandatory policy, standards or directions;
3. current DEWR controlled policies, procedures and templates;
4. current divisional / program delivery processes;
5. approved local conventions and working practices;
6. professional standards and research used as comparators;
7. overseas or commercial frameworks used only where they clarify practice.

Candidate comparator domains may include, where current and relevant:

- Digital Service Standard;
- PSPF / ISM implications for release assurance;
- Australian Government accessibility requirements and WCAG;
- privacy obligations;
- Department of Finance assurance guidance;
- Australian Government Architecture material;
- relevant ANAO findings;
- ISO/IEC/IEEE testing standards;
- ISO 25010 quality characteristics;
- ISTQB vocabulary where useful;
- service-transition practice;
- UK Government material as explicitly labelled comparator practice.

External material should never be presented as DEWR authority unless it actually has that status.

---

# 9. Risk and compliance model

A major design requirement is to distinguish different kinds of exposure before teaching “risk acceptance.”

The course should not imply that every unresolved issue can simply be accepted by someone senior enough.

The learner should distinguish at least three categories.

## 9.1 Discretionary delivery risk

Examples may include:

- a known defect with a workable control;
- a low-probability operational issue;
- incomplete evidence in a non-critical area;
- a minor usability limitation;
- a technical compromise with understood consequence.

These may be capable of explicit acceptance by the appropriate authority if the exposure is understood and proportionate.

## 9.2 Controlled or formally acceptible compliance / governance risk

Some obligations may permit exceptions, risk acceptance, waivers or formal treatment only through a defined process or authority.

The course should teach the learner to identify the governing mechanism rather than assume ordinary project risk acceptance is sufficient.

## 9.3 Mandatory constraint

Some legal, policy, security, privacy, accessibility, safety or statutory obligations may not be open to ordinary discretionary trade-off at all.

Where a mandatory constraint applies, the decision model changes.

The learner must ask:

- Is there a lawful / authorised exception process?
- Who has the authority to make that determination?
- What evidence is required?
- Is release legally or procedurally prohibited if the condition is not met?

The course should never teach a simplistic rule such as “all risks can be accepted if the right person signs.”

---

# 10. Evidence quality and independence

The course should teach **credible evidence proportionate to the risk**.

Evidence quality may be strengthened by:

- direct observation;
- reproducibility;
- traceability to the requirement or risk;
- corroboration from multiple sources;
- representative test conditions;
- clear provenance;
- specialist review;
- independence where independence materially improves confidence;
- evidence produced by a party without a direct incentive to overstate readiness.

However, “independent evidence” should not be taught as a universal requirement.

The correct question is:

> **How credible does the evidence need to be for the consequence of getting this decision wrong?**

For a low-consequence reversible change, evidence produced by the delivery team may be entirely adequate.

For a high-consequence, contested, supplier-dependent or compliance-sensitive decision, additional corroboration or independence may be appropriate.

---

# 11. Provisional course architecture

The stage structure below is a **design hypothesis**, not a locked curriculum.

Authority mapping and stakeholder research may justify merging, removing, reordering or splitting stages.

The current proposal is nine core stages rather than a predetermined twelve-stage package.

---

## Stage 1 — What decision are we trying to support?

### Outcome

Distinguish testing, quality, assurance, acceptance and release approval, and identify the actual decision the evidence must support.

### Core idea

Testing shows what happened under selected conditions. Assurance interprets evidence against the decision. Acceptance and release are accountable decisions, not automatic consequences of test completion.

### Key questions

- What is being approved?
- What does “ready” mean in this context?
- What evidence is relevant to that decision?
- Who has authority to decide?

### Typical misconception

“All planned testing is complete, therefore the service is ready.”

---

## Stage 2 — Start with outcomes, obligations and failure consequences

### Outcome

Identify the highest-value and highest-consequence things that must work before designing assurance activity.

### Core idea

Assurance effort should be driven by consequence and obligation, not simply transaction volume or functional count.

### Key concepts

- critical journeys;
- user harm;
- financial and operational consequence;
- policy or statutory obligation;
- irreversible failure;
- risk concentration;
- assumptions that must hold.

### Example

A feature used by 90% of users may be low consequence if it fails temporarily. A pathway used by 1% of users may create significant legal or payment harm if it fails. Usage volume alone does not determine assurance priority.

---

## Stage 3 — Turn requirements and risks into evidence needs

### Outcome

Determine whether requirements, acceptance criteria and risk statements are clear enough to support meaningful assurance.

### Core idea

Ambiguous requirements do not only create build risk; they create evidence risk because the team cannot later distinguish a defect, a misunderstanding and an unstated expectation.

### Key concepts

- testability;
- acceptance criteria;
- traceability;
- critical controls;
- negative requirements;
- non-functional obligations;
- assumptions;
- evidence sufficiency.

The stage should explicitly avoid turning traceability into document bureaucracy. The useful question is whether important obligations and risks can be linked to sufficient evidence.

---

## Stage 4 — Design proportionate assurance evidence

### Outcome

Choose assurance activities that match the nature and consequence of the uncertainty.

### Core idea

A test strategy is a risk-response design, not a catalogue of test types.

### Key concepts

- risk-based testing;
- representative conditions;
- positive and negative paths;
- boundary conditions;
- exploratory testing;
- evidence diversity;
- specialist assurance;
- corroboration;
- independence where proportionate;
- reversibility;
- confidence under incomplete evidence.

### Example

A team may have 4,000 automated tests but still lack evidence for a critical end-to-end journey under realistic production conditions.

The answer is not automatically “more tests”; it is “what evidence is missing for the decision?”

---

## Stage 5 — Interpret metrics and defects without being captured by them

### Outcome

Use test metrics and defect information as evidence without allowing summary labels to replace judgement.

### Core idea

Metrics compress information. Defect labels classify issues. Neither is a complete representation of residual risk.

### Candidate metrics

- test completion;
- pass rate;
- defect count;
- severity distribution;
- requirements coverage;
- automation percentage;
- defect leakage;
- reopen rate;
- environment availability;
- performance thresholds;
- escaped defects.

### Questions to teach

- What is the denominator?
- What important risk is not represented?
- Is the metric current, cumulative or selectively scoped?
- Can the metric look healthy while critical evidence is missing?
- Does severity reflect actual business consequence?
- Could a low-severity issue create high aggregate exposure?

### Balance requirement

The learner must also encounter cases where the green metrics are genuinely reassuring and the correct conclusion is that the evidence is sufficient.

The course must not train learners to assume that every dashboard conceals a hidden disaster.

---

## Stage 6 — Business acceptance, UAT and fitness for purpose

### Outcome

Distinguish meaningful business acceptance from ceremonial sign-off.

### Core idea

UAT is useful when representative users and owners validate real work, critical rules and intended outcomes. It is weak when users merely repeat technical scripts or sign a document without sufficient evidence.

### Key concepts

- representative users;
- realistic workflows;
- business process integration;
- policy interpretation;
- acceptance ownership;
- UAT entry conditions;
- unresolved technical defects;
- evidence scope;
- sign-off pressure;
- fitness for purpose.

The course should also include a case where UAT is appropriately scoped and sufficient, so “UAT is superficial” does not become a predictable answer pattern.

---

## Stage 7 — Non-functional, data and operational readiness

### Outcome

Integrate specialist, data and operational evidence into one readiness view without pretending to become a specialist in every discipline.

### Core idea

A function can behave correctly and still produce an unacceptable service.

### Domains to integrate where applicable

- security;
- privacy;
- accessibility;
- performance;
- resilience;
- recovery;
- supportability;
- observability;
- capacity;
- interoperability;
- data integrity;
- migration;
- reconciliation;
- records obligations;
- operational ownership;
- support and escalation paths.

The learner should be taught when specialist evidence is required, how to interpret the status of that evidence, and how absence or uncertainty affects the release decision.

---

## Stage 8 — Make a defensible release recommendation

### Outcome

Produce a concise recommendation that distinguishes evidence, uncertainty, controls, constraints, residual risk and accountability.

### Proposed structure

1. decision sought;
2. recommendation;
3. strongest evidence supporting the recommendation;
4. material unresolved uncertainty;
5. applicable mandatory constraints;
6. controls / conditions;
7. rollback or recovery position;
8. residual risks and accountable owner;
9. explicit no-go or reconsideration triggers;
10. post-release monitoring obligations.

### Language discipline

Avoid unsupported statements such as:

- “testing is complete”;
- “the solution is low risk”;
- “the business signed off”;
- “all teams are comfortable”;
- “no major defects remain.”

Replace them with scoped, evidence-based statements.

---

## Stage 9 — Validate the decision after release

### Outcome

Use production evidence to confirm or challenge the assumptions that supported release.

### Core idea

Release approval is not proof that the assurance model was correct. Production evidence is the final test of pre-release assumptions.

### Key concepts

- early-life support;
- production telemetry;
- incident patterns;
- defect escape;
- business outcome validation;
- unexpected user behaviour;
- operational load;
- post-release accessibility / performance where relevant;
- lessons for future assurance;
- updating future risk models.

This stage should deliberately bridge into the Closure Reports course.

---

# 12. Scenario design philosophy

The course should train judgement, not pattern recognition.

A major failure mode would be to make every scenario follow the same structure:

> “The dashboard looks green, but there is a hidden critical problem.”

Learners would quickly learn to distrust all positive evidence and choose the most cautious answer.

The scenario bank must therefore include a deliberate balance of outcomes.

## Required scenario types

### 1. Justified release

Evidence is sufficient, controls are proportionate, no mandatory constraint blocks release, and delay would add little assurance value.

### 2. Conditional release

Release is reasonable if defined controls, monitoring or acceptance conditions are implemented.

### 3. Justified delay / no-go

Evidence is insufficient against a high-consequence risk or a mandatory constraint is not satisfied.

### 4. Over-cautious assurance

The QA / test concern is real but disproportionate to the consequence, reversibility and available controls. The learner should recommend release rather than reflexively ask for more testing.

### 5. Correct governance acceptance

A decision-maker understands the evidence and legitimately accepts a residual discretionary risk.

### 6. Invalid attempted acceptance

A project tries to “accept” something that is actually subject to a mandatory requirement or a different formal exception process.

### 7. Strong positive evidence

A dashboard, test result or specialist assessment is genuinely sufficient and should be trusted.

### 8. Misleading positive evidence

A headline metric is technically true but does not address the critical risk.

The correct answer distribution should be intentionally varied so learners cannot infer a meta-rule such as “always delay” or “always distrust green.”

---

# 13. Example scenario concepts

These are design prompts, not final assessment items.

## A. Green dashboard, material evidence gap

- 98% tests executed;
- 97% pass rate;
- no Sev-1 defects;
- performance environment unavailable for the final build;
- production peak volume expected to be substantially higher than the last successful performance test.

The learner must decide whether the missing performance evidence is decision-critical.

## B. Fixed date, controlled residual defect

- release date has significant policy consequence;
- one low-volume defect remains;
- workaround is proven;
- impact is moderate;
- monitoring is available;
- rollback is proven;
- accountable owner understands the exposure.

The correct recommendation may be to proceed.

## C. Ceremonial UAT

- 14 business processes;
- four users;
- scripted happy paths only;
- all scripts pass;
- sign-off obtained.

The learner must state exactly what the UAT proves and what it does not.

## D. Strong UAT

- representative users;
- critical workflows;
- realistic data;
- negative cases;
- known limitations understood;
- independent business ownership;
- results aligned with system evidence.

The correct conclusion should be that UAT adds credible business acceptance evidence.

## E. “Minor” defect at scale

A small error has low consequence per transaction but occurs across tens of thousands of transactions.

The learner must assess aggregate exposure.

## F. Vendor reassurance

The vendor says a failure “cannot occur in production” but provides no reproducible evidence.

The learner should ask what evidence supports the likelihood claim.

## G. Rollback proven

The rollback plan has been rehearsed successfully under representative conditions.

The correct conclusion should recognise rollback as a credible control rather than assume all rollback plans are theatre.

## H. Mandatory constraint

A known issue conflicts with a requirement that cannot be waived through ordinary project risk acceptance.

The learner must identify that the correct next step is to determine the governing authority / exception process rather than simply record residual risk.

## I. Operational gap

The software passes functional testing, but support teams cannot access the telemetry required to diagnose the highest-consequence production failure.

The learner must consider operational readiness as part of service quality.

## J. QA overreach

A low-consequence, fully reversible change has strong automated and manual evidence. The QA team requests a week-long delay for an additional test that would add little decision value.

The learner should be able to recommend release and explain why further assurance is disproportionate.

---

# 14. Capstone concept

The capstone should be one integrated assurance exercise.

## Working title

**Should this service go live?**

The learner receives a synthetic delivery pack containing a subset of:

- intended outcome / business context;
- critical requirements;
- acceptance criteria;
- test summary;
- defect extract;
- UAT result;
- performance evidence;
- accessibility / security / privacy status where relevant;
- migration or reconciliation result;
- operational-readiness information;
- release and rollback plan;
- vendor status;
- risk-register extract;
- deadline / policy constraint;
- business-owner recommendation.

Some artefacts should agree.

Some should conflict.

Some should be incomplete.

Some should be technically accurate but easy to overinterpret.

The learner produces:

1. the decision being supported;
2. the critical outcomes / obligations;
3. the main failure modes;
4. evidence by risk;
5. material gaps and assumptions;
6. applicable constraints;
7. controls;
8. residual risks;
9. accountable owners;
10. release / conditional release / delay recommendation;
11. no-go or reconsideration triggers;
12. post-release monitoring plan.

## Capstone variants

A small number of strong variants is preferable to a large content bank.

Recommended variants:

- **Ready to release** — strong evidence, proportionate controls, no blocking constraint.
- **Release with conditions** — known exposure is manageable if controls are implemented.
- **Do not release yet** — one critical evidence gap or mandatory constraint makes release unjustified.
- **Governance-complete but weak evidence** — all sign-offs exist, but the underlying assurance basis is poor.

---

# 15. Worked exemplar

If the course teaches learners to produce or challenge a release recommendation, it should include at least one complete exemplar.

The exemplar should be realistic and uncomfortable rather than artificially clean.

It should contain:

- at least one unresolved defect;
- at least one assumption;
- incomplete but manageable evidence;
- a real delivery constraint;
- explicit conditions;
- an accountable residual-risk owner;
- a recovery / rollback position;
- post-release monitoring;
- at least one objective trigger that would invalidate the recommendation.

A useful exemplar structure is:

1. Decision sought
2. Recommendation
3. Evidence supporting the recommendation
4. Material uncertainty
5. Mandatory constraints / compliance status
6. Conditions precedent
7. Residual risks and owner
8. Recovery / rollback
9. No-go / reconsideration triggers
10. Post-release assurance

Each section should include commentary explaining why it is written that way.

---

# 16. Toolkit concept

The toolkit should provide practical judgement aids, not generic compliance forms.

Candidate tools include:

1. **Assurance Question Canvas**
   - decision;
   - outcome / obligation;
   - failure mode;
   - evidence needed;
   - evidence available;
   - uncertainty;
   - control;
   - consequence;
   - owner.

2. **Risk-to-Evidence Matrix**

3. **Release Recommendation Template**

4. **Constraint / Risk Classification Prompt**
   - discretionary;
   - controlled / formally acceptible;
   - mandatory.

5. **Metric Interpretation Checklist**

6. **Defect Consequence Assessment**

7. **UAT Credibility Checklist**

8. **Operational Readiness Evidence Map**

9. **Migration / Reconciliation Assurance Prompt**

10. **Vendor Evidence Challenge Guide**

11. **No-Go / Reconsideration Trigger Template**

12. **Post-Release Validation Plan**

The final set should be determined by learner need and actual DEWR workflow, not by a target number.

---

# 17. Assessment and content-volume principle

The course should not be designed around large arbitrary content counts.

The previous planning concept suggested very large pools of questions and flashcards. That is not a useful success measure.

The design principle should be:

> **Build the smallest amount of content that produces repeated, varied, credible practice across the important decisions. Add volume only where pilot evidence shows a genuine learning need.**

The repository’s existing minimum standards remain authoritative.

A reasonable pilot might begin with approximately:

- 8–9 stages;
- a focused knowledge-check pool sufficient to avoid rote repetition;
- 2 or so strong scenarios per stage where judgement is genuinely useful;
- a diagnostic focused on reasoning weaknesses;
- a compact flashcard set weighted toward discrimination and application;
- 3 worked cases;
- 1 integrated capstone with several variants;
- 1 complete worked recommendation.

These are not release requirements. They are an anti-bloat starting point.

Pilot results should determine whether the course needs more material.

---

# 18. Diagnostic design

The diagnostic should detect reasoning patterns rather than merely missing vocabulary.

Potential dimensions include:

- **metric dependence** — trusts headline percentages too readily;
- **defect-label dependence** — equates severity with actual release consequence;
- **functional bias** — underweights operational or non-functional evidence;
- **process-compliance bias** — assumes completed artefacts prove readiness;
- **authority confusion** — confuses recommendation, approval and risk ownership;
- **UAT ceremonialism** — assumes sign-off is meaningful regardless of scope;
- **deadline capture** — treats schedule pressure as evidence;
- **zero-risk thinking** — cannot reason proportionately under uncertainty;
- **vendor deference** — accepts supplier confidence without sufficient corroboration;
- **traceability bureaucracy** — values completeness over decision usefulness;
- **rollback assumption** — treats documentation as proof of recoverability;
- **compliance confusion** — treats mandatory constraints as ordinary discretionary risks;
- **post-release blindness** — sees assurance as finished at deployment.

The diagnostic should recommend where to start, not label the learner negatively.

---

# 19. Accountability model

The course must be explicit about responsibility boundaries.

A likely teaching model, subject to DEWR authority mapping, is:

- testers own the integrity and limitations of their test evidence;
- QA / assurance leads own the clarity and defensibility of their recommendation within their remit;
- specialist functions own or attest to specialist evidence within their authority;
- business / service owners own relevant business or operational acceptance where the governance model assigns it to them;
- release authorities own the release decision where delegated;
- mandatory obligations remain governed by the relevant legal, policy or formal exception process;
- executives cannot transfer accountability simply by asking QA to “sign off.”

The exact wording must be aligned to real DEWR delegations and processes.

---

# 20. Vendor / supplier dimension

Supplier-delivered systems create a specific assurance problem because contractual acceptance and service readiness may not be identical.

The course should teach learners to ask:

- What has the supplier contractually demonstrated?
- What has DEWR independently or otherwise credibly established?
- What remains an assertion?
- Are contractual defect thresholds aligned with actual business consequence?
- What happens to known defects after acceptance?
- Are warranty and support arrangements adequate for the residual exposure?
- Does contractual acceptance reduce DEWR’s leverage before operational readiness is established?
- Is additional corroboration proportionate to the risk?

This material should remain within the course only if authority mapping and learner research show it is sufficiently common and useful.

---

# 21. AI-assisted assurance — optional course addition

AI should not become the spine of this course.

However, a small, clearly labelled course addition could show how AI may assist assurance work while preserving human accountability.

Potential uses include:

- compare requirements with test evidence;
- identify untested acceptance criteria;
- cluster defect themes;
- generate adversarial failure scenarios;
- identify contradictions across status reports;
- challenge release assumptions;
- inspect whether a recommendation overstates evidence;
- propose negative-path tests;
- summarise evidence for governance.

Limitations must be explicit:

- AI-generated test ideas are not execution evidence;
- AI may misread source material;
- summaries can erase caveats;
- sensitive information may be inappropriate to provide to a tool;
- generated risk language can create false precision;
- human reviewers remain accountable for the final recommendation.

A strong exercise would give the learner a polished AI-generated release summary that quietly converts assumptions into facts. The learner must identify the unsupported claims.

---

# 22. Learning tone

The course should sound practical and recognisably connected to delivery work.

Preferred questions include:

- What does this evidence actually prove?
- What can still go wrong?
- Is this a risk, a formal exception matter, or a mandatory constraint?
- What assumption are we treating as fact?
- Would this control work under production conditions?
- What would make you change your recommendation?
- Who owns what remains?
- What is missing from the dashboard?
- What evidence is worth obtaining before the decision?
- When is further testing disproportionate?

Avoid:

- certification-heavy jargon;
- process worship;
- generic “best practice” presented as departmental authority;
- false certainty;
- teaching QA as a universal gatekeeper;
- implying that the safest professional answer is always “delay”;
- implying that schedule pressure justifies ignoring mandatory constraints.

---

# 23. Anti-patterns the course should challenge

The course may use scenarios and contrasts to challenge statements such as:

1. “If there are no critical defects, we are ready.”
2. “Testing owns quality.”
3. “UAT sign-off means the business accepts everything.”
4. “100% requirements coverage proves fitness for purpose.”
5. “Automation percentage is a direct quality measure.”
6. “A documented rollback is a proven rollback.”
7. “Defect severity tells us whether to release.”
8. “Operational readiness starts after testing.”
9. “The vendor tested it, so the evidence is sufficient.”
10. “A fixed deadline means assurance standards must be relaxed.”
11. “Good assurance means eliminating all uncertainty.”
12. “The safest recommendation is always to delay.”
13. “Once deployment succeeds, assurance is complete.”
14. “Passing the test proves the requirement was right.”
15. “A green governance status proves low risk.”
16. “Any risk can be accepted if someone senior signs it.”

The course must also present positive examples where metrics, UAT, vendor evidence, rollback evidence and governance status are genuinely credible.

---

# 24. Quality criteria for the course itself

Because the subject is assurance, the course should be held to a high evidence standard.

Before release:

1. Every load-bearing claim must resolve to an approved source or be clearly identified as course interpretation.
2. Departmental authority, whole-of-government requirements, comparator practice and course-created tools must remain distinct.
3. No internal or sensitive material may enter the public repository without explicit approval for public release.
4. The course must distinguish discretionary risk, formally controlled / acceptible risk, and mandatory constraints.
5. Scenario outcomes must be deliberately balanced across release, conditional release and delay.
6. At least one scenario must show that the cautious QA position is disproportionate.
7. At least one scenario must show that apparently positive evidence is genuinely sufficient.
8. At least one scenario must show that strong headline metrics are not enough.
9. At least one scenario must involve operational or service-readiness risk.
10. At least one scenario should involve data or migration where relevant to the final scope.
11. If vendor assurance remains in scope, at least one scenario must address supplier evidence.
12. “Do more testing” must never be an adequate answer without identifying the decision-relevant uncertainty and evidence required.
13. The final exemplar must distinguish fact, assumption, judgement, constraint and residual risk.
14. The final package must be read end-to-end by a human reviewer familiar with actual DEWR delivery practice.
15. The package must pass the repository’s standard automated verification and release checks.

---

# 25. Stakeholder and SME research

Before content authoring, research should include people who see different parts of the decision.

Likely contributors include:

- test / QA leadership;
- delivery / project management;
- product management;
- business acceptance representatives;
- service / operations;
- security;
- accessibility;
- privacy;
- architecture / platform engineering;
- data / migration where relevant;
- PMO / PPO / governance;
- vendor-management / procurement where relevant.

No single reviewer should be treated as the authority for every domain.

The research should focus on practical questions:

- Where do release decisions currently go wrong?
- Which status measures are over-relied on?
- What evidence is routinely missing too late?
- Where are accountability boundaries unclear?
- What do decision-makers actually need in a recommendation?
- Which artefacts are genuinely used?
- Which controls are usually claimed but rarely proven?
- Which obligations are non-negotiable?
- When has QA been too cautious as well as not cautious enough?
- What examples can be safely synthesised for training?

---

# 26. Research tasks before authoring

The next phase should complete the following:

1. Identify current DEWR release / go-live / assurance / test policies and templates relevant to the target learner.
2. Identify UAT / business acceptance guidance.
3. Identify operational-readiness or service-transition guidance.
4. Identify formal risk-acceptance authorities and escalation paths.
5. Identify relevant security, privacy, accessibility, data and records obligations.
6. Determine which of those obligations are mandatory, formally exceptable, or discretionary.
7. Review relevant whole-of-government standards and guidance.
8. Review relevant ANAO observations or published assurance lessons where they add useful reference-class context.
9. Determine whether testing terminology follows an established DEWR standard or local convention.
10. Identify current release recommendation / decision artefacts, if any.
11. Interview or obtain input from representative target learners and decision-makers.
12. Collect only examples that can be safely used; otherwise build synthetic equivalents.
13. Re-test the proposed nine-stage architecture against the actual process.
14. Decide whether requirements, migration, operational readiness or vendor assurance should remain inside this course or become separate packages.

---

# 27. Implementation approach if the concept survives research

## Phase A — Authority and information handling

- establish governing sources;
- classify source sensitivity;
- confirm what may be published;
- map obligations, delegations and mandatory constraints;
- resolve source conflicts.

## Phase B — Capability map

- confirm the primary workplace task;
- confirm the learner;
- confirm or revise stage structure;
- map each important decision / artefact to a stage;
- define outcomes and core ideas.

## Phase C — Pilot content

- author the minimum viable teaching content;
- write a small but varied scenario bank;
- build one diagnostic;
- build one worked case and initial capstone;
- test whether learners can use the reasoning model.

## Phase D — Pilot review

- run SME review;
- observe target learners;
- identify where terminology, sequencing or scenario realism fails;
- identify whether learners are gaming the answer pattern;
- measure whether the course improves the quality of release reasoning.

## Phase E — Expand only where justified

- add questions, cards, cases and toolkit material where the pilot reveals a learning need;
- avoid content-volume targets for their own sake.

## Phase F — Package integration and release

- assemble the training package;
- validate schema and references;
- add illustrations where useful;
- verify isolated export;
- complete human review;
- run full automated QA;
- inspect the release diff;
- publish only after authority, handling and content checks pass.

---

# 28. Key risks in building the course

## Risk 1 — It becomes generic testing theory

**Failure mode:** terminology dominates judgement.  
**Control:** structure the course around decisions, evidence and accountability.

## Risk 2 — It invents DEWR process

**Failure mode:** generic external practice is presented as local authority.  
**Control:** complete authority mapping first and label comparators clearly.

## Risk 3 — It leaks internal information through a public repository

**Failure mode:** real templates, screenshots, project details, vendor material or sensitive examples are committed publicly.  
**Control:** hard information-handling gate before source ingestion or example authoring.

## Risk 4 — It trains excessive conservatism

**Failure mode:** learners discover that “delay and test more” is always the safest quiz answer.  
**Control:** balanced scenario outcomes, including justified release and QA overreach.

## Risk 5 — It trains excessive risk acceptance

**Failure mode:** learners treat legal, security, privacy, accessibility or other mandatory obligations as ordinary project risks.  
**Control:** explicit risk / constraint classification and authority model.

## Risk 6 — It makes QA accountable for everyone

**Failure mode:** QA “sign-off” becomes implied acceptance of business, operational and specialist risks.  
**Control:** teach responsibility boundaries and delegated authority.

## Risk 7 — It becomes too broad

**Failure mode:** every specialist quality domain becomes a mini-course.  
**Control:** teach integration of specialist evidence, not specialist methodology.

## Risk 8 — Scenarios become predictable

**Failure mode:** learners infer that the hidden problem is always the answer.  
**Control:** deliberately varied scenario outcomes and credible positive evidence.

## Risk 9 — Content inventory becomes the success measure

**Failure mode:** hundreds of questions and cards are produced before learner value is proven.  
**Control:** pilot small, expand based on evidence.

## Risk 10 — Authority becomes stale

**Failure mode:** policy, delegations or release processes change after publication.  
**Control:** dated source review, clear provenance and a defined review cycle.

---

# 29. Success criteria

The course succeeds if a learner moves from asking:

> “Have we finished testing?”

or:

> “How many defects are left?”

or:

> “Has everyone signed off?”

into asking:

> **What outcome or obligation matters, how could it fail, what evidence do we have, what remains uncertain, which controls are credible, what constraints apply, what is the consequence, who owns what remains, and what decision is justified?**

That is the capability shift.

A practical indicator of success would be that learner-produced recommendations become:

- shorter but more decision-relevant;
- clearer about evidence limitations;
- clearer about mandatory constraints;
- clearer about risk ownership;
- less dependent on headline metrics;
- less likely to recommend delay without explaining what evidence delay would actually obtain;
- more explicit about post-release monitoring and reconsideration triggers.

---

# 30. Recommendation

**Approve the concept for authority mapping and stakeholder research. Do not begin full course production yet.**

The concept is strong because:

- it addresses a real professional judgement problem rather than easily searchable factual knowledge;
- it fits the existing Product Practice learning architecture;
- it creates a useful bridge between Product Management Fundamentals and Closure Reports;
- it can serve several DEWR delivery roles while keeping one primary workplace task;
- it supports scenario-based learning where there is genuine ambiguity and trade-off;
- it can later connect naturally to governance, benefits, operational readiness, vendor assurance and AI-assisted work.

The conceptual core should be protected:

> **outcome → failure modes → evidence → uncertainty → controls → consequence → ownership → decision**

The implementation should remain deliberately provisional until DEWR authority, accountabilities, mandatory constraints, information handling and actual learner needs are confirmed.

---

# 31. One-sentence design principle

> **Train people to make defensible release decisions under uncertainty — with the right evidence, the right constraints and the right accountability — not merely to complete testing processes.**
