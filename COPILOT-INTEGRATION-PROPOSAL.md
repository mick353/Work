# Product Practice Departmental Copilot Integration

## Purpose and current position

Product Practice already works without an AI service. Course Workshop helps trainers create and review a structured course; the learner player delivers it; the versioned `TrainingPackage` holds the released course content; and human review and deterministic checks govern release.

This paper describes a possible later use of an approved departmental Microsoft Copilot capability. It is written for training, digital, architecture and service owners considering whether AI could add useful assistance to the existing learning system.

**Current decision:** retain the existing standalone model. Do not build or commit to a Copilot integration until there is a defined business need and an approved departmental service boundary.

This is a future option, not an approved architecture, procurement decision or assertion about the Department's current Copilot capability.

## The rule that protects the product

> AI may propose, explain and analyse. Product Practice governs course structure and release. People retain authority.

The existing product must remain useful when AI is unavailable, unsuitable for the information being handled or not authorised for a particular user or course.

| Product Practice remains responsible for | Copilot may assist with |
| --- | --- |
| Course structure, identifiers, versions and source relationships | Drafting, rewriting and structured suggestions |
| Deterministic package validation and encoded quality checks | Semantic critique that fixed checks cannot reliably perform |
| Learner progress, scoring, mastery and spaced review | Explanation, guided practice and error-aware coaching |
| Human review, approval and publication | Finding likely impacts, gaps or inconsistencies for human decision |
| Portable learner delivery and local drafts | Optional intelligence in an approved connected environment |

Copilot must not become the course format, system of record, release authority, learner-progress store, scoring authority, invisible editor of released content or substitute for subject-matter, learning-design or accessibility review.

## What already exists

The current architecture deliberately separates authoring, course data, release and learning:

```text
Trainer
  ↓
Course Workshop
  ↓
validated TrainingPackage
  ↓
human review and release record
  ↓
standalone learner course / hosted course / controlled repository package
  ↓
Learner player
```

Course Workshop can run locally in a browser. Drafts stay on that device unless a trainer deliberately exports them. Learner progress is also local by default. A course can be distributed as a self-contained learner HTML file or as an individually hosted course without an account, application database, AI connection or central telemetry.

That low-infrastructure, portable model is a strength. A connected AI capability should extend it when justified, not weaken it.

See [LEARNING-SYSTEM-DIRECTION.md](LEARNING-SYSTEM-DIRECTION.md), [COURSE-WORKSHOP.md](COURSE-WORKSHOP.md), [ARCHITECTURE.md](ARCHITECTURE.md), [STANDARDS.md](STANDARDS.md) and [ROADMAP.md](ROADMAP.md) for the current product and release model.

## Where Copilot could add value

### Trainer assistance is the sensible first use

Course Workshop already knows the active course, stage, source register, assessment item and quality profile. That makes small, bounded assistance more useful and safer than an unstructured general chat.

Possible trainer capabilities include:

- proposing learning objectives, lesson structure or plain-English explanations from approved sources;
- suggesting stronger distractors, feedback, scenarios, flashcards or worked examples;
- identifying an assessment item that can be answered without understanding the lesson;
- finding inconsistent terminology, duplicated ideas or unsupported claims across a draft;
- explaining which approved source supports a paragraph or question; and
- comparing a changed governing source with a course to identify content that may need review.

Every result is a candidate for the trainer to accept, edit, compare or dismiss. Course Workshop remains the place where the result is checked, linked to sources and stored in the valid course shape.

### Source change impact is a high-value later capability

When a governing source changes, Copilot could compare the old and new material against a selected course and return a review list such as:

```text
Potentially affected
- Stage 3 explanation
- Question CR-3-07
- Scenario CR-S3-02
- Flashcard CR-F21

No apparent impact found
- Stages 1, 2 and 5 to 12

Human judgement required
- Meaning of revised delegation wording
```

That is a change-impact candidate, not an approved course amendment. A qualified reviewer must still assess the source, decide what changes and release a new package through the ordinary process.

### Learner assistance comes later

A later, course-bound tutor could explain a section in another way, help a learner understand an error, provide an additional scenario or direct the learner to the relevant approved source.

The first learner implementation should be strictly **course-grounded**: it should use the released course and its approved sources, not present broad general assistance in the same interface. During a scored activity, it should guide reasoning without revealing the keyed answer. Generated practice remains temporary and must never silently alter released assessment, completion or mastery.

## Context, evidence and data handling

Each AI request should contain the smallest authorised context that can do the job. A request about one question should not automatically send the entire course, complete learner history or trainer draft.

| Information | Intended position |
| --- | --- |
| Released course content and approved learner sources | May be used only through an approved service and within the authorised course scope. |
| Trainer draft content | Requires explicit trainer action and approved handling rules; it is not automatically treated as approved course content. |
| Learner progress and answers | Send only the minimum summary needed for the requested assistance, and only when the connected service and user are authorised. |
| Restricted, personal, sensitive or otherwise unsuitable material | Do not send unless the Department has explicitly approved that data type, source and service path. |
| Credentials, tokens and service secrets | Never embed them in standalone HTML, browser-delivered JavaScript or exported course packages. |

For source-grounded responses, the product should show the source used, a human-readable locator where available, whether the result is a transformation, synthesis or inference, and any uncertainty or source conflict. Retrieved documents are evidence, not instructions to the AI system. Product instructions and tool permissions must remain outside untrusted source material.

## A credible first pilot

The first connected pilot should be trainer-facing, small and measurable. It should use one agreed source pack and one real but suitably handled course, with a defined service owner and a limited participant group.

Start with only three capabilities:

1. Source-grounded rewrite of one selected course section.
2. Question and distractor critique.
3. Source-change impact analysis.

Do not begin with automatic publication, repository mutation, broad organisational retrieval, learner completion decisions or a general-purpose learner chat.

The pilot should measure whether the capability is worth operating, not merely whether it can produce fluent text.

| Measure | What good looks like |
| --- | --- |
| Source fidelity | Reviewers can trace useful suggestions to permitted sources and reject unsupported claims. |
| Trainer value | Trainers accept, adapt or reuse suggestions often enough to justify the additional service. |
| Quality and safety | Unsupported, misleading or unsafe output is detected, visible and manageable before it enters a course. |
| Time and effort | The capability improves a real authoring or review task rather than adding a second workflow. |
| Reliability | Latency, availability, quota and cost are acceptable for the intended use. |
| Governance fit | Identity, access, logging, retention, support and release responsibilities are understood and workable. |

The pilot should have defined success, stop and escalation criteria before it begins. AI output is not proof of quality; the evidence is the reviewed result and the observed pilot outcome.

## Connected operating model

The detailed Microsoft pattern should be selected by departmental architecture at the time. The essential boundary is stable:

```text
Approved hosted Course Workshop or learner player
        ↓
authenticated departmental identity and role checks
        ↓
approved service boundary applies handling and context rules
        ↓
bounded Copilot capability with approved sources and tools
        ↓
structured, attributable suggestion returned to Product Practice
        ↓
explicit human acceptance or dismissal
```

Whether that service boundary is a Product Practice service, a Copilot Studio agent or another approved pattern is a later architecture decision. The product should depend on a small, stable request-and-response contract rather than a particular Microsoft label or user interface.

If a connected service fails, the core Workshop, learner player, drafts and learner state must continue to work. A loss of network or Copilot service must never corrupt local work.

## Conditions before any build

No production integration should start until the responsible parties can answer the following questions.

### Business and ownership

- What specific trainer or learner problem is being solved?
- Why is Copilot better than a deterministic Product Practice feature for that problem?
- Who owns, supports and funds the capability?

### Identity, architecture and service

- Where will the connected product be hosted?
- How will users be authenticated and authorised?
- Which approved Microsoft capability, environment, connectors and knowledge sources are available?
- What happens when the service, a source or a tool is unavailable?

### Information and records

- Which information classifications and course fields may be sent?
- What prompts, outputs, retrieved content and operational logs are retained, where and for how long?
- Which sources are approved, and how is their authority and currency managed?

### Learning, release and assurance

- Which outputs are suggestions and which are released content?
- How will assessment integrity be protected?
- What human reviewer and approver roles remain required?
- How will capability instructions, sources, tools, evaluation sets and material service changes be versioned and tested?
- What accessibility, device and user testing is needed for the new interface?

If these conditions are not met, the correct boundary is the current standalone Product Practice model.

## Maturity path

| Stage | Position |
| --- | --- |
| 0. Current product | Standalone Workshop and learner packages; deterministic checks; human review; no AI dependency. |
| 1. Development support | AI may assist development, content analysis and quality review outside the production product boundary. |
| 2. Trainer pilot | Limited, approved, trainer-facing capabilities with explicit acceptance and measured outcomes. |
| 3. Mature trainer service | Expand only where the pilot demonstrates value, safety and operational ownership. |
| 4. Learner pilot | Test a course-grounded tutor with explicit source, privacy and assessment-integrity controls. |
| 5. Broader service | Consider identity, central hosting, completion records, LMS integration or wider retrieval only as separate decisions with their own business case. |

## Summary

Product Practice provides the governed learning structure: course packages, source relationships, trainer workflow, deterministic validation, release control and portable delivery.

An approved departmental Copilot capability could later add intelligence around that structure: source-grounded drafting, semantic review, source-change impact analysis, targeted explanation and temporary practice.

The sequence matters. Product Practice should remain a complete learning system on its own. Copilot should be added only when the Department can provide the identity, hosting, information handling, governance and service ownership that a connected AI capability requires.

## References

- [Product Practice learning system direction](LEARNING-SYSTEM-DIRECTION.md)
- [Course Workshop guide](COURSE-WORKSHOP.md)
- [Product architecture](ARCHITECTURE.md)
- [Product standards](STANDARDS.md)
- [Product roadmap](ROADMAP.md)
- [Microsoft Copilot Studio documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
- [Microsoft Copilot Studio security and governance](https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-and-governance)
- [Microsoft guidance for governing Copilot Studio projects](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/sec-gov-intro)
- [Microsoft guidance for testing Copilot Studio agents](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/sec-gov-phase4)

Review this paper when a departmental architecture decision, approved Copilot service or defined pilot proposal changes the available options.
