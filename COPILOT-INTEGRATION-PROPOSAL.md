# Product Practice — Departmental Copilot Integration Proposal

## Purpose

This paper describes a possible future integration between Product Practice, Course Workshop and an approved departmental Microsoft Copilot capability.

It is a **future-state proposal**, not an assertion that the department's current Copilot implementation already exposes every capability described here, and not an approved architecture or committed implementation sequence.

The current Product Practice direction remains deliberately useful without AI:

- Course Workshop allows non-technical trainers to create, review and export governed training packages in a browser.
- Learner packages can operate as self-contained HTML or hosted static courses.
- Course content, assessment, sources, provenance and release evidence remain represented in the existing `TrainingPackage` model.
- Authoring and learner use do not depend on an AI service, account, application server or external API.

The proposed future principle is therefore:

> **AI assistance should be additive, governed and optional — not load-bearing.**

If Product Practice is later hosted inside an approved departmental environment and the department exposes suitable Copilot integration services, Copilot could augment both trainer and learner workflows while Course Workshop and the learner package remain the governing applications.

---

## 1. Strategic position

Product Practice already separates three concerns:

1. **Course authoring** — Course Workshop guides a trainer through the complete course structure, content, sources, assessment, review and release record.
2. **Course governance** — package validation, quality profiles, source relationships, release evidence, exact-content digests and controlled publication constrain what can be released.
3. **Course consumption** — the learner player renders a validated package without exposing authoring or repository functions.

A future Copilot integration should preserve that separation.

Copilot should not become the course format, the source of truth, the release authority or the calculation engine for deterministic checks. It should operate as an **approved intelligence service around the existing product boundaries**.

Conceptually:

```text
                    Approved departmental environment

        ┌──────────────────────────────────────────────┐
        │          Departmental Copilot service       │
        │                                              │
        │  Skills / actions / approved connectors     │
        │  Governed retrieval and generation          │
        │  Organisational identity and policy controls │
        └───────────────┬──────────────────────────────┘
                        │ optional governed calls
              ┌─────────┴─────────┐
              │                   │
      ┌───────▼────────┐   ┌──────▼──────────┐
      │ Course Workshop │   │ Learner package │
      │ trainer-facing  │   │ participant use │
      └───────┬────────┘   └──────┬──────────┘
              │                   │
              ▼                   ▼
      validated TrainingPackage   learner progress
              │                   and course context
              └─────────┬─────────┘
                        ▼
                 governed release
```

If Copilot is unavailable, not authorised for a particular information classification, or the course is distributed outside the departmental network, the existing non-AI workflow should continue to function.

---

## 2. Why integrate Copilot rather than replace Course Workshop

A frontier AI model can potentially generate a large amount of training content from source material. That does not remove the need for Course Workshop.

Course Workshop exists because the production user is a trainer, subject-matter contributor or reviewer who should not need to understand:

- Git or repository structure;
- React or TypeScript;
- the `TrainingPackage` schema;
- package validation code;
- build and release scripts;
- prompt engineering;
- model limitations; or
- low-level AI orchestration.

The Workshop provides a stable product workflow and explicit structure. Copilot could make individual steps faster or more intelligent, but Course Workshop should continue to determine:

- what a valid course contains;
- what fields and relationships are required;
- what checks must pass;
- what release evidence must be recorded;
- what content is accepted into the draft; and
- what exact package is ultimately released.

The preferred relationship is therefore:

```text
Trainer intent
    ↓
Course Workshop workflow
    ↓
Optional Copilot assistance
    ↓
Trainer review / acceptance / revision
    ↓
Existing deterministic validation
    ↓
Human review and release controls
    ↓
TrainingPackage
```

This is materially safer than treating an AI conversation as the authoring system.

---

## 3. Integration prerequisite

The proposal becomes relevant only if the department chooses an architecture that can safely expose Copilot capabilities to Product Practice.

Possible future prerequisites include:

- departmental hosting or another approved execution environment;
- authenticated departmental identity;
- an approved Copilot/API integration mechanism;
- information-classification and data-handling rules for prompts, retrieved material and model outputs;
- approved connectors to authoritative departmental sources where required;
- logging, monitoring and support arrangements appropriate to the information handled;
- clear model/service ownership and change management;
- controls over which skills, agents, connectors or retrieval sources may be invoked;
- network and endpoint controls; and
- an agreed boundary between local browser state and centrally processed AI context.

The present static/offline architecture should not be weakened merely to obtain AI functionality before those foundations exist.

A departmental integration is therefore better considered a **maturity layer above the current product**, not a prerequisite for adopting Product Practice.

---

## 4. Copilot skills and context bindings

A mature integration could expose a set of narrowly defined Copilot skills rather than one unrestricted general-purpose prompt box.

A **skill** is a bounded capability with an explicit purpose and input/output contract. Examples could include:

- draft learning objectives from approved source material;
- propose a stage structure;
- generate candidate knowledge-check questions;
- generate plausible distractors;
- propose decision scenarios;
- explain a source passage in learner-appropriate language;
- compare two source versions;
- identify possible course impacts from a changed policy;
- critique assessment quality;
- suggest glossary terms;
- propose flashcards;
- identify apparent unsupported claims;
- recommend revisions for accessibility or plain English;
- explain a learner's incorrect answer using approved course content; and
- generate additional practice on a learner's weak areas.

Each skill should receive only the context it needs.

A **context binding** associates the AI request with an explicit governed scope. Depending on the workflow, that could include:

- the active `TrainingPackage`;
- the current Course Workshop draft;
- the selected stage or question;
- registered sources for that stage;
- the package manifest and provenance metadata;
- the course quality profile;
- a selected authoritative departmental document;
- a controlled retrieval set;
- the learner's current course, stage and recent answers; or
- a narrowly scoped progress summary.

This makes the interaction substantially different from copying text into an unrestricted chatbot.

The product can tell Copilot, in effect:

> You are operating on Course X, version Y, Stage 4, against these approved sources, under this task definition. Return only a candidate object matching this contract.

That output can then be presented to the user for review rather than silently becoming released course content.

---

## 5. Trainer-facing use cases

### 5.1 Source-to-course assistance

A trainer could select or import approved source material and ask Course Workshop to obtain Copilot assistance.

Copilot could propose:

- course purpose and audience;
- learning objectives;
- curriculum arc;
- stage breakdown;
- draft lesson explanations;
- worked examples;
- assessment items;
- scenarios;
- flashcards;
- glossary entries;
- toolkit artefacts; and
- candidate capstone tasks.

The resulting content should enter Course Workshop as **draft suggestions**, not as an automatically released package.

The trainer remains responsible for deciding what is adopted, and the existing release process remains responsible for establishing that the resulting package is suitable for use.

### 5.2 Point-of-authoring assistance

Copilot could also operate at a much smaller scope.

Examples:

- "Improve this explanation without changing its meaning."
- "Create three alternative distractors for this question."
- "Turn this source paragraph into a decision scenario."
- "Suggest a worked example for this stage."
- "Explain why this learning objective is not adequately assessed."
- "Find material in the registered sources relevant to this field."

This model is likely to be more useful to trainers than forcing them into a separate AI tool because the relevant course and source context is already bound by Course Workshop.

### 5.3 Source grounding and traceability

A high-value integration would require Copilot-generated content to preserve evidence links.

Where practicable, a suggestion should identify:

- the source or sources used;
- the relevant source location or reference;
- whether the output is a direct transformation, synthesis or inference;
- any ambiguity or conflict detected between sources; and
- where human subject-matter judgement is required.

Course Workshop can then retain those relationships in its existing package model rather than accepting unattributed generated prose.

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
Release evidence
```

AI should strengthen that chain, not bypass it.

### 5.4 Change-impact analysis

This is one of the strongest future use cases.

If an authoritative document is updated, a Copilot skill could compare the previous and current versions and then evaluate the released or draft `TrainingPackage` for potential impact.

A result might identify:

```text
Source version change detected

Potentially affected:
- Stage 3, paragraph 4
- Question CR-3-07
- Scenario CR-S3-02
- Flashcard CR-F21
- Field-guide entry 5

Unaffected after review:
- Stages 1, 2 and 5–12
- Capstone marking rubric

Human review required:
- interpretation of the new delegation wording
```

The system should distinguish **possible impact** from an approved course change. Copilot can identify and explain candidate impacts; a trainer or authorised reviewer decides the resulting amendment.

### 5.5 Semantic quality review

Existing deterministic QA is strong at structural and measurable checks. Copilot could complement it with semantic critique that is difficult to encode as fixed rules.

Examples include:

- whether a question can be answered without understanding the lesson;
- whether one distractor is obviously implausible;
- whether the correct answer is signalled by wording or length;
- whether two questions are semantically duplicates;
- whether an assessment tests recall when the objective requires judgement;
- whether a capstone requires knowledge not taught in the course;
- whether an explanation overstates its source;
- whether a scenario contains an unsupported departmental-policy claim; and
- whether terminology is inconsistent across stages.

These should normally appear as review findings or recommendations, not automatic edits.

---

## 6. Learner-facing use cases

Learner AI is a separate maturity step from trainer AI and should not be treated as necessary for the base Product Practice model.

The existing learner package should remain complete and useful without Copilot.

Where a course is being used inside an approved departmental environment, an optional Copilot learning assistant could nevertheless provide substantial value.

### 6.1 Course-bound tutor

Instead of exposing a generic assistant, the learner could receive a tutor bound to the active course and approved sources.

Useful actions could include:

- "Explain this section another way."
- "Give me an example relevant to an APS project."
- "Why was my answer wrong?"
- "Compare the two options I was considering."
- "Quiz me again on this concept."
- "Give me another scenario at the same difficulty."
- "What should I revise next?"
- "Show which course source supports this explanation."

The tutor should treat the released course and its approved source set as authoritative context for course-specific claims.

### 6.2 Error-aware tutoring

A learner's recent answers could be converted into a minimal progress summary and supplied to an approved tutoring skill.

For example:

```text
Current course: Closure Reports
Current stage: 6
Recent difficulty:
- benefits-realisation evidence
- closure approval responsibility
Mastered:
- document structure
- lessons-learned distinction
```

Copilot could then generate targeted explanation or practice without receiving unnecessary learner information.

This complements the existing deterministic mastery, diagnostic and spaced-repetition logic rather than replacing it.

### 6.3 Additional practice generation

Copilot could generate disposable practice examples or scenarios from the approved course context.

These should be clearly identified as generated practice and should not silently alter the released assessment bank or recorded course version.

A useful separation is:

- **released assessment** — versioned package content approved through the normal process;
- **generated practice** — transient supplemental learning material produced for the current learner.

### 6.4 Learner questions outside the course boundary

The system should distinguish questions answerable from the course from broader questions requiring organisational knowledge.

Possible response modes are:

1. **Course-grounded** — answer only from the released package and registered sources.
2. **Department-grounded** — use approved departmental retrieval/connectors where authorised.
3. **General assistance** — use ordinary Copilot capability, clearly distinguished from authoritative course content.

This distinction reduces the risk that a generated answer is mistaken for an approved departmental instruction.

---

## 7. What Copilot must not become

Even in a mature implementation, Copilot should not automatically become:

- the `TrainingPackage` system of record;
- the release authority;
- a substitute for subject-matter review;
- a substitute for accessibility testing with people and devices;
- a source of invented review evidence;
- a mechanism for bypassing information-classification controls;
- the sole way to create or consume a course;
- an unrestricted repository mutation path;
- a silent editor of released assessment content; or
- an authority that can overrule deterministic package validation.

The software can bind AI suggestions to content and evidence, but it cannot manufacture the underlying human authority required for a real release.

---

## 8. Information handling and least-context design

AI integration changes the data-flow boundary of a system that is presently intentionally local.

The preferred design principle is **least context necessary**.

A request concerning one assessment question should not automatically transmit the entire course, learner history and trainer draft. A learner asking for an explanation should not cause unrelated local data to leave the browser.

The integration layer should construct an explicit request envelope containing only authorised fields, for example:

```text
request
├── user role
├── requested skill
├── course id and version
├── selected stage/item
├── approved source excerpts or retrieval references
├── minimal relevant learner/trainer context
├── handling/classification metadata where required
└── output contract
```

The exact departmental controls would need to be determined by the approved architecture and policies in force at implementation time.

No secret, high-value credential or unrestricted service token should be embedded in a standalone HTML package or browser-delivered JavaScript.

---

## 9. Centralised versus portable operation

A mature Product Practice deployment could support two operating modes without creating two different course formats.

### Portable / standalone mode

```text
Course Workshop or learner HTML
        ↓
local browser operation
        ↓
no Copilot dependency
```

This retains the current strengths:

- offline use;
- simple distribution;
- no mandatory account;
- no central application server;
- minimal technical footprint; and
- resilience when departmental AI services are unavailable or inappropriate.

### Department-connected mode

```text
Department-hosted Workshop or learner player
        ↓
authenticated departmental session
        ↓
approved Copilot integration gateway
        ↓
bounded skill + governed context
        ↓
Copilot / approved retrieval services
```

The same `TrainingPackage` remains usable in either mode.

This preserves portability while allowing richer functionality where infrastructure and governance support it.

---

## 10. Possible technical pattern

The browser should not call a privileged Copilot endpoint using a reusable secret shipped with the application.

A preferable future pattern would be an approved departmental service boundary.

Conceptually:

```text
Course Workshop / learner player
        │
        │ authenticated request
        ▼
Product Practice AI gateway
        │
        ├─ verify identity / role
        ├─ validate requested skill
        ├─ enforce context policy
        ├─ restrict source scope
        ├─ attach approved system instructions
        ├─ apply logging / monitoring policy
        └─ call departmental Copilot capability
                │
                ▼
        structured response
                │
                ▼
Course Workshop / learner UI
```

The gateway could expose product-specific actions rather than unrestricted model access, for example:

```text
POST /ai/trainer/propose-objectives
POST /ai/trainer/review-question
POST /ai/trainer/analyse-source-change
POST /ai/trainer/find-unsupported-claims
POST /ai/learner/explain-answer
POST /ai/learner/create-practice
POST /ai/learner/recommend-review
```

The actual implementation could instead use approved Copilot agents, plugins, actions or another departmental orchestration mechanism. The important design requirement is the bounded capability and governed context, not a particular Microsoft product label or API shape.

---

## 11. Structured outputs

Where Copilot is modifying or proposing package content, structured responses are preferable to free-form prose.

For example, a question-generation skill might return a candidate object containing:

```json
{
  "stem": "...",
  "options": ["...", "...", "...", "..."],
  "correctOption": 2,
  "feedback": ["...", "...", "...", "..."],
  "sourceRefs": ["source-4"],
  "reasoningSummary": "...",
  "confidence": "medium",
  "reviewFlags": []
}
```

Course Workshop can then validate the object against its own rules before it is allowed into the draft.

This is preferable to asking the trainer to manually copy arbitrary AI prose into multiple form fields.

---

## 12. Human control and provenance

AI-supported authoring should make the provenance of suggestions visible.

Possible states could include:

- proposed by Copilot;
- accepted by trainer;
- subsequently edited by trainer;
- source links checked;
- subject-matter review completed; and
- approved for release.

This does not require the released course to advertise every intermediate AI interaction to learners, but the authoring/review process should be capable of distinguishing generated assistance from authoritative approval.

The existing release record and exact-content digest remain more important than the fact that AI participated in drafting.

---

## 13. Failure and fallback behaviour

Copilot integration should fail safely.

If the AI service is unavailable:

- Course Workshop should continue to allow ordinary authoring;
- drafts should remain intact;
- deterministic validation should continue;
- learner courses should remain usable;
- released assessment should remain available; and
- no course should become inaccessible merely because an AI request failed.

If Copilot returns malformed or unusable output, Course Workshop should reject or quarantine that suggestion rather than corrupting the package.

If an AI request is not authorised for the material being handled, the product should decline the AI operation while preserving the local workflow.

---

## 14. Suggested maturity sequence

### Stage 0 — Current standalone product

Retain the existing Product Practice architecture and complete real trainer, accessibility and device evidence.

### Stage 1 — Developer-assisted AI outside production

Use frontier AI during engineering and course development to improve code, QA, instructional design and source analysis. No production AI dependency is introduced.

### Stage 2 — Departmental proof of concept

If an approved Copilot integration path becomes available, test a small number of trainer-facing skills against non-sensitive or appropriately approved material.

Recommended initial candidates:

1. question critique;
2. source-grounded explanation drafting;
3. source-change impact analysis; and
4. objective-to-assessment alignment review.

These provide value without allowing AI to control release.

### Stage 3 — Integrated trainer assistance

Expose approved Copilot skills inside Course Workshop with authenticated access, explicit context binding, source provenance, structured outputs and trainer acceptance.

### Stage 4 — Department-connected learner assistance

Pilot a course-bound learner tutor in an approved hosted environment. Keep generated practice separate from released assessment and measure whether the feature actually improves learning outcomes.

### Stage 5 — Broader organisational integration

Only after evidence and governance are mature, consider deeper connections to approved repositories, policy stores, learning records, identity services or organisational workflow systems.

Each stage should be justified by a demonstrated need rather than treated as an inevitable destination.

---

## 15. Evaluation questions before implementation

Before adopting any production Copilot integration, stakeholders should be able to answer:

### Product value

- Which trainer or learner problem is being solved?
- Is AI materially better than a deterministic product feature for that problem?
- Can the user complete the task when AI is unavailable?

### Authority and evidence

- What source material may the model rely on?
- How is authoritative departmental information distinguished from generated inference?
- What human review remains mandatory?
- How is generated content bound to the exact released package?

### Information handling

- What information leaves the browser?
- Under what classification is it handled?
- Which service processes it?
- What is retained, logged or available to administrators?
- What context is unnecessary and should therefore not be transmitted?

### Identity and access

- Who can invoke trainer skills?
- Which learner skills are available to whom?
- Can different courses or classifications require different permissions?

### Model behaviour

- How are unsupported claims detected?
- How are source citations or evidence references surfaced?
- What happens when sources conflict?
- What happens when the model refuses, fails or returns invalid output?

### Operational support

- Who owns the integration?
- How are model/service changes regression tested?
- How are incidents handled?
- How are costs and usage monitored?

### Accessibility

- Are AI controls keyboard and screen-reader accessible?
- Are streaming/generated responses presented accessibly?
- Does AI assistance create additional cognitive load or uncertainty?

---

## 16. Recommended architectural principles

Any future implementation should preserve the following principles.

1. **Standalone first.** Product Practice remains useful without AI.
2. **Course Workshop remains the trainer product.** AI augments its workflow rather than replacing it.
3. **The `TrainingPackage` remains the course boundary.** AI does not introduce a second uncontrolled content model.
4. **Released content remains deterministic and versioned.** Generated supplemental practice is distinguished from approved assessment.
5. **AI is source-grounded where authority matters.** General model knowledge is not silently presented as departmental policy.
6. **Least context is sent.** The system transmits only information necessary for the requested skill.
7. **Human release authority remains real.** AI cannot manufacture SME, accessibility or approval evidence.
8. **Deterministic checks remain authoritative for deterministic rules.** AI critique complements rather than replaces package validation and QA.
9. **No privileged credential is shipped to the browser.** Departmental service access sits behind an approved trust boundary.
10. **Failure does not break the course.** AI unavailability must degrade to the existing standalone experience.
11. **Portability is preserved.** The same course package should remain usable in connected and disconnected delivery models.
12. **Integration follows evidence.** Trainer and learner AI should be introduced only where measured value justifies the additional complexity and governance burden.

---

## 17. Proposed end state

The strongest future model is not an AI that independently creates and teaches courses.

It is a governed learning platform in which:

- non-technical trainers continue to create courses through Course Workshop;
- Copilot can assist them when an approved departmental connection is available;
- Copilot skills are bound to the exact course, task and authorised sources;
- trainers retain explicit control over what enters the course;
- deterministic validation and human release evidence continue to govern publication;
- learners receive complete courses that remain functional without AI;
- department-connected learners can optionally access a course-aware Copilot tutor;
- generated explanations and practice are clearly distinguished from approved course content; and
- the same portable `TrainingPackage` can move between standalone and centrally governed environments.

In that architecture, AI is neither a bolt-on chatbot nor the foundation on which the learning system depends.

It becomes a controlled intelligence layer that can make a mature Product Practice platform more efficient, adaptive and useful while preserving the governance, portability, traceability and human authority already built into the product.

---

## Status

**Proposal only.** No Copilot integration is required by the current Product Practice architecture, and no capability described here should be interpreted as approved departmental functionality until the relevant product, security, information-management, architecture, AI-governance and operational decisions have been made.

The immediate Product Practice priority remains proving the standalone system through real trainer use, manual accessibility/device evidence and genuine course-review/release practice. AI integration can then be evaluated from a stable and evidenced product foundation rather than becoming a prerequisite for it.
