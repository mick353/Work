# Product Practice — Departmental Copilot Integration Proposal

## Purpose and status

This paper describes a possible future integration between Product Practice, Course Workshop and an approved departmental Microsoft Copilot capability.

It is a **future-state proposal**. It does not assert that the Department's current Copilot implementation already exposes every capability described here, and it is not an approved architecture, procurement decision or committed implementation sequence.

The proposal deliberately preserves the current Product Practice direction:

- **Course Workshop remains the trainer-facing authoring product.** Non-technical trainers can plan, create, review, transfer and export a complete course without writing code.
- **The `TrainingPackage` remains the governed course boundary.** Course identity, content, assessment, sources, provenance and release evidence continue to use the existing versioned package model.
- **The learner package remains complete without AI.** A course can still be distributed as a self-contained learner HTML file or as an isolated hosted course.
- **Existing deterministic controls remain authoritative for what they measure.** Package validation, course quality profiles, learner mechanics, release gates, SHA-256 content binding and repository verification are not replaced by generative AI.
- **Human authority remains load-bearing.** AI cannot manufacture subject-matter review, learning-flow review, accessibility evidence or approval authority.

The core principle is therefore:

> **AI assistance should be additive, governed and optional — not load-bearing.**

If Product Practice later operates within an approved departmental environment that exposes suitable Copilot capabilities, Copilot could augment both trainer and learner workflows while Course Workshop and the learner player remain the governing applications.

This proposal should be read with:

- [LEARNING-SYSTEM-DIRECTION.md](LEARNING-SYSTEM-DIRECTION.md) — settled product direction;
- [COURSE-WORKSHOP.md](COURSE-WORKSHOP.md) — current trainer workflow and output model;
- [ARCHITECTURE.md](ARCHITECTURE.md) — current course/player separation and state model;
- [STANDARDS.md](STANDARDS.md) — measurable quality and verification rules;
- [ROADMAP.md](ROADMAP.md) — remaining evidence and deliberately parked work; and
- [DEPLOYMENT-INTEGRITY-AND-HOSTING-OPTIONS.md](DEPLOYMENT-INTEGRITY-AND-HOSTING-OPTIONS.md) — possible future hosting, identity, integrity and service models.

---

## 1. Current baseline: what already exists

Product Practice is already designed as a reusable learning system rather than a single hard-coded course.

The architectural rule is:

> **A course is data. The player is code. They meet at one versioned interface.**

`TrainingPackage` is the course-neutral contract. The learner player renders a validated package; Course Workshop produces that same package shape. Ordinary course creation is therefore a data operation rather than a new software build.

The current product boundary is intentionally clear:

```text
Trainer
  ↓
Course Workshop
  ↓
validated TrainingPackage
  ↓
human review + release record
  ↓
standalone learner course / hosted course / controlled repository package
  ↓
Learner player
```

The current system also deliberately has a small infrastructure footprint:

- Course Workshop can run as a self-contained browser application;
- trainer drafts remain in browser storage unless deliberately exported;
- learner progress remains in the learner's browser unless deliberately backed up;
- no application account, login, central user database or telemetry is required;
- one-course exports contain only that course and no other catalogue content;
- release records are bound to exact canonical package content with SHA-256 digests; and
- repository installation and publication remain deliberate release-custodian actions.

A future Copilot integration should extend this architecture, not replace it.

---

## 2. Strategic position

Product Practice already separates four concerns that should remain separate:

1. **Authoring** — Course Workshop guides a trainer through planning, sources, lesson content, assessments, reinforcement, applied material, media, review and release preparation.
2. **Course data** — the `TrainingPackage` is the structured, versioned representation of the course.
3. **Governance and release** — deterministic validation, quality profiles, review declarations, exact-content binding and controlled publication determine what can become an official release.
4. **Learning** — the learner player presents approved package content and manages deterministic progress, assessment, mastery and spaced-repetition behaviour.

Copilot should operate as an **approved intelligence service around these boundaries**.

It should not become:

- the course format;
- the source of truth;
- the release authority;
- the owner of learner progress;
- the replacement for Course Workshop;
- the replacement for the learner player; or
- the authority over deterministic validation.

The architectural relationship should therefore be:

```text
                       Approved departmental environment

        ┌─────────────────────────────────────────────────────┐
        │ Departmental Copilot / Copilot Studio capability   │
        │                                                     │
        │ agents · tools · prompts · knowledge · connectors  │
        │ governed retrieval · organisational identity       │
        └──────────────────────┬──────────────────────────────┘
                               │ optional governed use
                    ┌──────────┴──────────┐
                    │                     │
            ┌───────▼────────┐    ┌──────▼──────────┐
            │ Course Workshop │    │ Learner player  │
            │ trainer-facing  │    │ participant use │
            └───────┬────────┘    └──────┬──────────┘
                    │                     │
                    ▼                     ▼
            TrainingPackage       bounded course/progress context
                    │
                    ▼
             existing release model
```

If Copilot is unavailable, unsuitable for the information being handled or not authorised for a particular use, Product Practice should continue in its current non-AI mode.

---

## 3. Integration is a later maturity layer

The current static/offline architecture should not be weakened merely to obtain AI functionality.

A production Copilot integration becomes relevant only when there is a defined business need and an approved departmental service boundary. Likely prerequisites include:

- an approved hosting or execution environment;
- authenticated departmental identity and appropriate role/permission controls;
- an approved Microsoft Copilot, Copilot Studio or equivalent integration mechanism;
- clear information-classification and data-handling rules for prompts, retrieved content, learner context and generated outputs;
- approved knowledge sources and connectors where organisational retrieval is required;
- audit, logging, retention and support arrangements appropriate to the service;
- service ownership, change management and model/agent lifecycle controls;
- cost, quota, availability and performance arrangements;
- controls over which tools, agents, prompts, knowledge sources or connectors may be invoked; and
- a defined boundary between local browser state and centrally processed AI context.

**Being on the departmental network should not by itself be treated as the trust boundary.** Network location may form part of a future access policy, but connected AI capability should rely on approved identity, authentication, authorisation, hosting and information-handling controls. A managed device, departmental network, conditional access and authenticated identity may all contribute, subject to the Department's architecture.

This means Copilot integration is best treated as a **maturity layer above Product Practice**, not a prerequisite for using Product Practice.

---

## 4. Microsoft capability model and terminology

The exact Departmental implementation would need to be confirmed at the time of design. Microsoft Copilot Studio currently provides concepts that map well to this proposal, including agents, tools, prompts, knowledge sources, connectors, flows and orchestration. Microsoft also uses the term **skills** in current agent tooling.

This proposal uses two product-level concepts:

### 4.1 Bounded capability

A bounded capability is a narrowly defined AI operation with a known purpose and an input/output contract. Depending on the approved Microsoft architecture, it might be implemented as a Copilot Studio tool, prompt, skill, topic, flow, connected agent or another supported mechanism.

Examples:

- propose learning objectives;
- review one assessment item;
- compare two policy versions;
- find possible unsupported claims;
- explain one learner error; or
- generate supplementary practice.

The product should not depend on one Microsoft label remaining unchanged over time.

### 4.2 Context binding

**Context binding** is a Product Practice design concept, not a claim about a specific Microsoft feature name.

It means that an AI request is explicitly bound to the smallest authorised scope necessary for the task, for example:

- course id and version;
- current Course Workshop draft;
- selected stage, lesson section or assessment item;
- the exact registered sources relevant to that item;
- package manifest and provenance metadata;
- the applicable quality profile;
- a selected authoritative departmental document or retrieval set;
- learner stage and recent error pattern; or
- a minimal progress summary.

The interaction can then say, in effect:

> You are working on Course X, version Y, Stage 4, for this defined task, using these approved sources. Return a candidate result matching this contract and identify the evidence used.

This is materially different from copying arbitrary content into a general-purpose chat session.

---

## 5. Trainer-facing Copilot capability

Trainer assistance is the most natural first production use because Course Workshop already supplies the workflow, package schema, source relationships and review gates.

Copilot should improve individual authoring steps while **Course Workshop remains the authoring system**.

### 5.1 Source-to-course assistance

A trainer could select approved source material and request candidate learning content.

Copilot could propose:

- intended audience and course purpose;
- learning objectives;
- curriculum arc and stage sequence;
- lesson explanations;
- worked reasoning and examples;
- knowledge-check questions;
- plausible distractors and per-option feedback;
- decision scenarios;
- stage assignments;
- diagnostic items;
- flashcards;
- glossary entries;
- practice contrasts;
- worked cases;
- toolkit material;
- capstone tasks; and
- field-guide content.

The important word is **candidate**.

Generated material should enter the Workshop as suggestions for trainer review, not silently become a released course. The Workshop should still determine the valid data shape, identifiers, relationships and release state.

### 5.2 Point-of-authoring assistance

Many trainer requests will be smaller and more useful than generating a whole course.

Examples:

- "Improve this explanation without changing the supported meaning."
- "Give me three better distractors for this question."
- "Make this scenario require judgement rather than simple recall."
- "Suggest a worked example using only the sources linked to this stage."
- "Show why this learning outcome is not adequately assessed."
- "Find evidence in the approved sources relevant to this paragraph."
- "Rewrite this in clearer plain English while retaining the technical meaning."
- "Identify terminology that is inconsistent with the rest of this course."

This is where integration inside Course Workshop has a major advantage over a separate chatbot: the product already knows which course, stage, source, assessment item and quality rules are relevant.

### 5.3 Source grounding and traceability

High-value trainer integration should preserve evidence relationships.

Where practicable, every generated suggestion should identify:

- the source or sources used;
- the specific source locator, excerpt or retrieval reference;
- whether the result is a transformation, synthesis or inference;
- material ambiguity or conflict between sources;
- unsupported assumptions introduced by the model; and
- points requiring subject-matter judgement.

The desired chain is:

```text
Authoritative source
        ↓
Supported proposition
        ↓
Lesson / worked example
        ↓
Assessment / scenario
        ↓
Review and release evidence
```

Copilot should strengthen that chain, not bypass it.

### 5.4 Change-impact analysis

This is potentially one of the strongest future organisational uses.

If a governing source changes, a bounded Copilot capability could compare the previous and new versions and then inspect a released or draft `TrainingPackage` for likely impacts.

A useful output would distinguish evidence from judgement, for example:

```text
Source change detected

Potentially affected
- Stage 3, section 2
- Question CR-3-07
- Scenario CR-S3-02
- Flashcard CR-F21
- Field-guide entry 5

No apparent impact found
- Stages 1, 2 and 5–12
- Capstone marking rubric

Human judgement required
- interpretation of the changed delegation wording
```

The result is a **change-impact candidate**, not an approved course amendment. A trainer or authorised reviewer still decides what must change, and any amended release still goes through the normal controls.

### 5.5 Semantic quality review

The existing QA suite is intentionally strong at deterministic and measurable checks. Copilot could complement it with semantic critique that is difficult to express as fixed code.

Examples include:

- whether a question can be answered without understanding the lesson;
- whether a distractor is obviously implausible;
- whether wording or answer length leaks the keyed answer;
- whether two questions are semantic duplicates despite different text;
- whether an assessment measures recall when the objective requires judgement;
- whether a capstone assumes knowledge that has not been taught;
- whether an explanation overstates what its source establishes;
- whether a scenario introduces an unsupported departmental-policy claim;
- whether a worked example conflicts with a registered source; and
- whether language is inconsistent across stages.

These findings should normally appear as recommendations or review issues, not automatic edits.

### 5.6 Draft transformation with explicit acceptance

A mature implementation could return structured candidate objects matching the Workshop's package contract rather than unstructured prose.

For example, a question-review capability could return:

```json
{
  "finding": "correct answer is materially longer than distractors",
  "risk": "answer-length cue",
  "suggestedOptions": ["...", "...", "...", "..."],
  "sourceRefs": ["source-3:p7"],
  "confidence": "medium",
  "requiresHumanReview": true
}
```

Course Workshop could then show **Accept**, **Edit**, **Compare** or **Dismiss** rather than allowing invisible AI mutation.

---

## 6. Learner-facing Copilot capability

Learner AI is a separate maturity step from trainer AI. It should not be required for the base learner package.

Where a course is used inside an approved connected environment, an optional course-aware assistant could provide substantial value.

### 6.1 Course-bound tutor

Instead of exposing a generic assistant, Product Practice could provide a tutor bound to the released course and its approved source set.

Typical learner actions could include:

- "Explain this section another way."
- "Give me an example relevant to an APS project."
- "Why was my answer wrong?"
- "Compare the two options I was considering."
- "Quiz me again on this concept."
- "Give me another scenario at the same difficulty."
- "What should I revise next?"
- "Show the course source that supports this explanation."

For course-specific claims, the released package and approved sources should remain the grounding boundary.

### 6.2 Error-aware tutoring

The learner player already knows the learner's deterministic progress, attempts, mastery and review state. It could provide a minimal relevant summary to a tutoring capability without transmitting the complete browser history.

For example:

```text
Course: Closure Reports
Stage: 6
Recent difficulty:
- benefits-realisation evidence
- closure approval responsibility
Already mastered:
- document structure
- lessons-learned distinction
```

Copilot could then provide a targeted explanation, Socratic prompt or additional practice.

The existing learner logic remains authoritative for progress, scoring, mastery and spaced repetition.

### 6.3 Generated practice versus released assessment

A strict distinction should be maintained:

- **Released assessment** — versioned package content approved through the ordinary release process.
- **Generated practice** — transient supplemental examples, questions or scenarios created for the current learner.

Generated practice should not silently change the assessment bank, alter the package version or become official completion evidence.

### 6.4 Assessment-integrity mode

Learner assistance should respect where the learner is in the activity.

During a scored item, the assistant may need to avoid directly revealing the keyed answer. It could instead clarify terminology, ask guiding questions or defer the explanation until the attempt is submitted. The exact behaviour should be an explicit learning-design decision rather than an accidental property of the model.

### 6.5 Course, department and general modes

The learner interface should make the authority boundary visible.

Possible modes are:

1. **Course-grounded** — answer from the released package and its registered sources.
2. **Department-grounded** — use additional approved departmental knowledge/connectors where the learner is authorised to access them.
3. **General assistance** — use ordinary Copilot capability, clearly labelled as broader assistance rather than approved course content.

This helps prevent a generated answer from being mistaken for an authoritative departmental instruction.

---

## 7. Portable mode and connected mode

The same course format should support both operating modes.

### 7.1 Portable / standalone mode

```text
Course Workshop or learner HTML
        ↓
local browser operation
        ↓
no Copilot dependency
```

This preserves the current strengths:

- offline use;
- simple distribution;
- no mandatory application account;
- no central application server;
- no AI availability dependency;
- minimal infrastructure; and
- usefulness outside a connected departmental deployment where policy permits.

### 7.2 Department-connected mode

```text
Approved hosted Workshop or learner player
        ↓
authenticated departmental identity
        ↓
policy / role / handling checks
        ↓
approved Copilot agent or integration service
        ↓
bounded capability + governed context
        ↓
structured result returned to Product Practice
```

The same `TrainingPackage` remains usable in both modes.

A connected build may expose AI controls that the standalone build simply does not display. Loss of network or AI service should not corrupt the local course or learner state.

---

## 8. Possible Microsoft integration patterns

The final pattern should be selected by departmental architecture rather than hard-coded into Product Practice now.

Microsoft Copilot Studio currently supports agents that can use tools, prompts, knowledge, connectors, flows and other agents. That creates several plausible future patterns.

### Pattern A — Product Practice calls a departmentally managed service boundary

```text
Course Workshop / learner player
        │
        │ authenticated request
        ▼
Department-controlled Product Practice AI service
        │
        ├─ verify identity and role
        ├─ validate requested capability
        ├─ enforce information-handling policy
        ├─ construct least-context request
        ├─ restrict knowledge/tool scope
        ├─ attach approved instructions
        ├─ apply logging/monitoring policy
        └─ invoke approved Copilot capability
                │
                ▼
        structured result
                │
                ▼
Course Workshop / learner UI
```

This gives Product Practice a stable product-specific contract even if the underlying AI service evolves.

### Pattern B — Copilot Studio agent is the approved service boundary

If departmental architecture supports it, a purpose-built Copilot Studio agent could itself hold the approved tools, knowledge, prompts and orchestration. Product Practice would invoke only the permitted operations or embed/access the agent through an approved client pattern.

### Pattern C — Product Practice capability exposed to Copilot

A later integration could also work in the opposite direction: Copilot could call approved Product Practice tools to retrieve a package section, validate a candidate object or inspect a course version. This should still respect role, course and release boundaries.

The correct pattern depends on departmental identity, hosting, licensing, security, records, support and integration standards.

### Security rule

A reusable Copilot/API credential, service secret or high-value token must never be embedded in a standalone HTML file or browser-delivered JavaScript.

Anything shipped to a browser must be assumed visible to the person operating that browser.

---

## 9. Least-context and information-handling design

AI integration changes the data-flow boundary of a system that is currently intentionally local.

The design principle should be:

> **Send the minimum authorised context required to perform the requested task.**

A request about one assessment item should not automatically transmit the entire course, complete learner history and current trainer draft.

A request envelope might contain:

```text
request
├── authenticated role
├── requested capability
├── course id and version
├── selected stage/item
├── approved source excerpts or retrieval references
├── minimum relevant trainer/learner context
├── handling/classification metadata where required
└── required output contract
```

The implementation should also distinguish between:

- package content already approved for the course;
- trainer draft content that may not yet be approved;
- learner-generated responses;
- departmental knowledge retrieved through approved connectors; and
- general model knowledge.

Those categories have different authority and potentially different handling requirements.

---

## 10. AI-specific assurance risks

Adding Copilot would introduce risks that do not exist in the present deterministic, local-only workflow.

### 10.1 Hallucination and overstatement

The model may produce plausible but unsupported content. Source-grounding, evidence references, structured output and human review reduce this risk but do not eliminate it.

### 10.2 Prompt injection and hostile source content

Imported or retrieved documents can contain text that attempts to influence an AI system. Retrieved/source content should be treated as evidence, not trusted instructions. System instructions, tool permissions and source scopes should remain outside untrusted content.

### 10.3 Authority confusion

A fluent model response can appear more authoritative than the evidence supports. The UI should distinguish:

- released course content;
- approved source material;
- AI-generated suggestion;
- AI-generated learner practice; and
- broader departmental/general assistance.

### 10.4 Model and service drift

Models, agents, prompts, tools and retrieval behaviour may change over time. AI capabilities used in production should therefore be versioned, evaluated and regression-tested at the service boundary where practicable.

### 10.5 Availability, latency and cost

AI is a network service with quotas, latency and operating cost. The core authoring and learner workflows should continue to work when that service is unavailable.

### 10.6 Data minimisation and retention

Prompts, outputs and retrieved content may create records or logs depending on departmental configuration. The approved architecture must define what is logged, retained and accessible rather than assuming conversational AI is ephemeral.

---

## 11. What Copilot must not become

Even in a mature implementation, Copilot should not automatically become:

- the `TrainingPackage` system of record;
- the release authority;
- a substitute for subject-matter review;
- a substitute for learning-design review;
- a substitute for accessibility testing with people and real devices;
- a source of invented review or approval evidence;
- a mechanism for bypassing information-classification controls;
- the sole way to create or consume a course;
- an unrestricted repository mutation path;
- an invisible editor of released content;
- the scoring or mastery authority;
- a mechanism that can overwrite local trainer or learner state without explicit product logic; or
- an authority that overrules deterministic package validation.

The software can bind AI suggestions to content and evidence. It cannot manufacture the human authority required for a real release.

---

## 12. Governance and release implications

Copilot-generated material should be governed by the same release model as human-authored material once it is accepted into a course.

The important distinction is not whether a sentence originated from AI. It is whether the final released package has been properly reviewed and approved.

A future release record may optionally capture additional AI provenance, for example:

- AI assistance used: yes/no;
- capability/agent identifier;
- model/service version where available;
- date of assistance;
- source set used; and
- human reviewer disposition.

This should be added only if it serves an identified governance or audit need. The release record should not accumulate speculative metadata with no operational purpose.

Existing principles remain unchanged:

- automated checks are evidence, not factual approval;
- warnings are not automatically release blockers unless deliberately encoded as such;
- source authority still requires human judgement;
- manual accessibility/device evidence remains necessary where applicable; and
- the accountable release decision remains human.

---

## 13. Recommended maturity path

The safest path is staged.

### Stage 0 — Current standalone product

Retain the present model:

- Course Workshop for non-technical trainer authoring;
- standalone or isolated hosted learner packages;
- local drafts and learner progress;
- deterministic validation and QA;
- human review and release controls; and
- no AI dependency.

This remains the baseline even if later stages are adopted.

### Stage 1 — Development use only

Use frontier AI, including future models, as an engineering and content-analysis aid during Product Practice development.

This can accelerate coding, QA, documentation, architecture review, semantic analysis and preparation of candidate course material without changing the production product boundary.

### Stage 2 — Trainer pilot in an approved connected environment

If departmental architecture supports it, pilot a small number of bounded Course Workshop capabilities, such as:

- source-grounded rewrite;
- question critique;
- learning-objective review; and
- source-change impact analysis.

Keep explicit trainer acceptance and collect evidence on usefulness, accuracy, latency and trust.

### Stage 3 — Mature trainer integration

Expand only after the pilot proves value. Possible capabilities include structured course drafting, semantic QA, source traceability and governed organisational retrieval.

### Stage 4 — Learner pilot

Pilot a course-bound tutor on a limited course set with clear assessment-integrity and source-grounding rules.

### Stage 5 — Broader departmental learning service

Only if justified, consider deeper identity, central hosting, completion records, cross-device progress, LMS integration or broader departmental knowledge retrieval. These are separate architecture decisions; Copilot integration does not require them automatically.

---

## 14. Decision criteria before implementation

Before moving from proposal to implementation, the project should be able to answer:

### Business

- What trainer or learner problem is being solved?
- Is Copilot materially better than a deterministic Product Practice feature for that problem?
- Who owns the capability and supports it?

### Architecture

- Where is Product Practice hosted?
- How is the user authenticated and authorised?
- Which approved Microsoft integration mechanism is available?
- What happens when Copilot is unavailable?

### Information handling

- Which information classifications may be sent?
- Which course/draft/learner fields are permitted?
- Which departmental knowledge sources may be retrieved?
- What is logged and retained?

### Learning and governance

- Which outputs are suggestions versus approved content?
- How are source references shown?
- What human review is required?
- How is assessment integrity protected?
- Does the AI change any completion or mastery semantics?

### Assurance

- How will prompts/agents/tools be versioned and tested?
- What evaluation set proves the capability does what it claims?
- How are unsafe or unsupported outputs detected and handled?
- What accessibility and device testing is required for the new UI?

If those questions cannot yet be answered, the current standalone Product Practice model remains the correct production boundary.

---

## 15. Summary position

The future opportunity is not to replace Course Workshop with Copilot or to make every learner course dependent on an AI service.

The opportunity is to combine two different strengths:

**Product Practice provides the governed structure:**

- a course-neutral package contract;
- trainer workflow;
- deterministic validation;
- source/provenance relationships;
- release controls;
- portable delivery; and
- a consistent learner experience.

**Departmental Copilot could provide optional intelligence:**

- source-grounded drafting;
- semantic review;
- source-change impact analysis;
- organisational retrieval;
- personalised explanation; and
- targeted learner practice.

The resulting principle is:

```text
Product Practice remains useful alone.
Copilot makes it more capable when the Department is ready.
AI proposes and explains.
Course Workshop governs authoring.
TrainingPackage governs released course data.
Deterministic logic governs scoring and encoded checks.
Humans govern approval and authority.
```

That preserves the portability and low-infrastructure strengths of the existing system while leaving a credible path to a much richer departmental learning service if the Department later chooses to provide the hosting, identity, Copilot and governance foundations required.

---

## References and implementation notes

The proposal is intentionally platform-aware but implementation-neutral. At the time of writing, Microsoft Copilot Studio documentation describes agents that can use knowledge, tools, prompts, connectors, flows, connected agents and generative orchestration. Those capabilities make the patterns in this paper technically plausible, but the actual DEWR service, licensing, permissions, approved connectors and integration surface must be confirmed before implementation.

Relevant Microsoft documentation areas include:

- Microsoft Copilot Studio documentation;
- agent tools and prompts;
- knowledge sources and retrieval;
- connectors and integration patterns;
- generative orchestration; and
- agent evaluation, publishing and governance.

This paper should be updated if a departmental architecture decision establishes a specific approved Copilot integration pattern.