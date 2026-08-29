# Authoring a training package

The end-to-end procedure for adding a new course to this system, or revising an existing one. Follow it in order. Each phase ends in a gate that must pass before the next begins.

For a trainer-authored course, `Course-Authoring-Studio.html` provides the guided form and encoded minimum checks described in [COURSE-WORKSHOP.md](COURSE-WORKSHOP.md). It now covers the complete package profile, including advanced learning elements, embedded media and source decks. This document remains the release procedure and the authority for human content review and repository integration.

This document says **what to do**. [STANDARDS.md](STANDARDS.md) distinguishes the shared package contract, the current Workshop release profile and course-specific regression rules. [ARCHITECTURE.md](ARCHITECTURE.md) says how the code is put together.

---

## The model

A course is **data**. The player is **code**. They meet at the versioned `TrainingPackage` contract in `src/package-model.ts`. Runtime boundary checks live in `src/package-validation.ts`; the complete folder and versioning contract is in [COURSE-PACKAGE-FORMAT.md](COURSE-PACKAGE-FORMAT.md).

Adding a course means authoring arrays and registering a manifest. It does not mean editing a view. If you find yourself editing a view to accommodate a course, either the course is wrong or the interface needs extending — decide which, and say so.

Everything a learner sees comes through `src/content.ts`, which resolves the active package once at load. No view imports a course file directly.

---

## Phase 0 — Establish the governing artefact

**Nothing else starts until this is done.** A course teaches people to do something that exists at work. Find the thing that governs it.

Build an authority map rather than treating one person's answer as the hierarchy. Highest to lowest:

1. Applicable law, regulations, directions and mandatory government policy.
2. Current controlled departmental policy, standards, templates and approved procedures.
3. Applicable whole-of-government standards and official guidance, including material from `architecture.digital.gov.au`, `finance.gov.au` and `anao.gov.au`.
4. The course owner's current local process and conventions. These establish what people actually do, but cannot silently override levels 1–3.
5. Professional standards and research syntheses.
6. PRINCE2, PMBOK, IPA or overseas material used as **comparators**, labelled as such rather than substituted for the spine.

Ask the course owner to identify the local artefact and how it is used, then verify its status and currency. Search `site:.gov.au "<artefact name>" template` when the governing source is unclear. If sources conflict, record the conflict and obtain an accountable decision; do not silently choose the convenient answer.

**Produce:** the governing document(s), stored locally outside the repository if internal. A list of every section, table, field, rating scale and fixed vocabulary they contain.

**Gate:** you can name the governing document, its sections, and who assesses against it. If you are describing good practice in general terms, Phase 0 is not finished.

**If the source is a slide deck or presentation:** it travels with the package. See "Importing a source deck" below.

---

## Phase 1 — Structure

Decide the stages. The structure follows the artefact and the process around it, not a taxonomy you find elegant.

1. Map every section of the governing artefact to a stage. A stage may cover several sections; no section may be unowned.
2. Add stages for the process around the artefact where one exists — who approves it, where it goes, what must be true before it is produced.
3. Name each stage for the capability it builds, not the jargon it contains. A heading must be meaningful to someone who has never heard the term it would otherwise use.
4. Assign each stage a **stable id**. Ids are permanent: questions, flashcards, glossary terms, contrasts and illustrations are all keyed to them.
5. Order the stages in a `*_ORDER` array. `number` is derived from position — never hand-maintained.

**Produce:** an id-to-title map, and a table mapping every artefact section to the stage that owns it.

**Gate:** every section of the governing artefact has exactly one primary owning stage. A supporting concept may recur for deliberate retrieval, application or integration, but the recurrence is labelled and does not introduce a competing definition or unexplained duplication.

---

## Phase 2 — Teaching content

For each stage, author the `Module`:

| Field | What it is |
|---|---|
| `id`, `number`, `title`, `subtitle` | Identity. `number` derived from the order array. |
| `outcome` | The capability the learner gains, stated as something they can do. |
| `coreIdea` | The one idea the stage exists to install, in two or three sentences. |
| `sections[]` | `heading`, `body`, optional `bullets`, `table`, `example`, `sourceIds`. |
| `questions[]` | See Phase 3. |
| `scenarios[]` | See Phase 3. |
| `assignment` | `title`, `instruction`, `prompts[]`, `modelAnswer`, `criteria[]`. |
| `minutes` | **Derived, never typed.** `stageMinutes()` computes it from word count. |
| `slides` | Slide range, or `""` where the package has no deck. |

Rules that apply to every section — thresholds in [STANDARDS.md](STANDARDS.md):

- Lead with what the practice achieves; use failure as contrast. Roughly 90% of section openers state the positive first.
- Every load-bearing claim carries `sourceIds`.
- Expose applied reasoning rather than stating conclusions alone: show the decision, the tempting weak move, why it fails and the better move. A separately named substantial `Worked reasoning:` passage in every stage is currently a Product Management course regression, not a universal package requirement.
- No development history, no version notes, no commentary on colleagues' work. Rationale for design decisions belongs in code comments.
- Use the governing artefact's own vocabulary. Where the course introduces its own term, it goes in the glossary.

**Produce:** every stage's `Module`.

**Gate:** `npm run typecheck` passes. Every stage has an outcome, a core idea, and at least the minimum body words.

---

## Phase 3 — Assessment

Five assessment collections, each with a different job. Keep them separate.

| Pool | Purpose | Drawn how |
|---|---|---|
| `module.questions` | Knowledge check at the end of a stage | Fresh sample per attempt from the stage's pool |
| `module.scenarios` | Applied decision, with context | All shown |
| `supplementaryQuestions` | Extends a stage's quiz pool | Merged into `quizPoolFor(moduleId)` |
| `diagnosticQuestions` | Recommends a starting stage | One per stage, at random |
| `practiceQuestions` | Mixed practice | Round-robin across stages |

Item-writing rules. The player/Workshop enforce the structural rules; maintained-course suites also measure batch-level patterns. Do not assume one passing item proves the quality of the whole bank:

1. Exactly four options because that is the current player and QA contract. This is a project format, not a universal item-writing law.
2. `optionNotes` has four entries; the correct one is `""`, the other three explain why that option is wrong.
3. **The correct answer must not be systematically identifiable by length.** Measure the batch rather than rejecting an otherwise sound item merely because its key happens to be longest.
4. Keep options approximately equal in length and measure the mean key/distractor ratio across the bank. The Workshop warns about a conspicuous individual key; the deeper maintained-course suite measures the batch.
5. Distractors must be plausible and wrong for a stateable reason.
6. Every stage needs at least one diagnostic question. The diagnostic draws one per stage; a stage absent from the pool is silently excluded from the recommendation.
7. Ids unique across the whole package.

**Produce:** all four pools.

**Gate:** run the item-quality measurement. Correct-answer-longest under the threshold, mean length ratio under the threshold, every stage represented in the diagnostic pool.

---

## Phase 4 — Reference content

These arrays do not share one keying or coverage rule. Where an entry carries `moduleId`, an invalid id can make it unreachable or mis-grouped without a useful error. Package-level arrays must instead be checked for relevance, source resolution and deliberate empty-state handling.

| Array | Shape | Coverage rule |
|---|---|---|
| `flashcards` | `id`, `moduleId`, `kind` (definition / application / discrimination), `front`, `back` | Workshop profile: all 3 kinds per stage; a maintained course may declare a higher retrieval-card profile |
| `glossary` | `term`, `definition`, `origin`, optional `moduleId` | Every term the course uses that its learner may not know; any supplied stage id must resolve |
| `contrasts` | `moduleId`, `good`, `usual`, `tell` | Current full-package profile: 1+ per stage |
| `fieldGuide` | `id`, `title`, `summary`, `sourceIds`, `items[{term, detail}]` | Package-level lookup material; all source ids resolve |
| `toolkitTemplates` | `id`, `title`, `prompt`, `example`, `note` | Package-level; one per artefact the learner must produce |
| `sources` | `id`, `title`, `publisher`, `url?`, `note`, `checked` | Package-level; governing documents first and comparators labelled |
| `divergences` | `id`, `topic`, `slides`, `deck`, `here`, `why` | Package-level; one entry for each material addition or deliberate departure, otherwise an empty array |

The `tell` in a contrast must be an **observable check** the learner can run, not a restatement of the good practice.

Where the course materially adds to, clarifies or departs from its spine, declare that boundary in `divergences` so a learner knows which wording is the source's and which is the course's. Use an intentional empty array where the distinction genuinely does not apply; do not manufacture filler.

Every learner-facing URL must open the exact substantive resource in an ordinary signed-out browser. Prefer, in order: the governing authority or standard; openly readable full text from the responsible publisher; or a credible research-to-practice guide that explains the evidence, limitations and application. A citation database record can help a reviewer locate evidence, but it is not a learning link. Do not give learners PubMed/index records, search results, generic home pages, abstract-only listings, obsolete editions or sign-in-gated courses. When an academic paper is too restricted or too narrow to teach from directly, pair the formal citation in the source note with an accessible evidence synthesis or practical guide as the URL.

The source check must cover four separate questions: does the page open without an account; does it contain enough material to learn from; does it directly support the course claim; and is its authority, date and jurisdiction suitable for that claim? Record `checked` only after all four have been answered. Automated rules block known poor destinations, but cannot establish relevance or teaching value.

**Produce:** all seven arrays required by `PackageContent`. Use `[]` where an optional section genuinely does not apply; do not manufacture filler merely to make an array non-empty.

**Gate:** every required stage-level array meets its declared coverage rule; no `moduleId` refers to a stage that does not exist; every `sourceId` resolves; every empty package-level array is intentional and its view/navigation behaviour has been checked.

---

## Phase 5 — Applied content

| Array | Shape |
|---|---|
| `caseStudies` | `id`, `title`, `subtitle`, `outcome` ("worked" / "corrected"), `summary`, `steps[]`, `closing` |
| `capstoneSteps` | `id`, `title`, `prompt`, `checks[]` |
| `capstoneBriefs` | `id`, `title`, `short`, `brief`, `twist` |
| `capstoneRubric` | The self-assessment criteria |

Each case step names the decision on the table **before** saying what the team did. A case where everything went well teaches nothing; at least one case carries `outcome: "corrected"`.

**Produce:** enough cases to exercise the consequential decisions and a capstone that walks the learner through producing the real artefact. Maintain a stage-coverage map so any uncovered stage is deliberate rather than accidental.

**Gate:** every case and capstone element included is complete and stage links resolve. Apply the course's declared coverage profile: Product Management currently requires four cases covering every stage; the shared Workshop profile allows optional cases and blocks partially authored ones.

---

## Phase 6 — The worked document

**If the course teaches people to produce a document, it must contain at least one complete example of that document.** Fragments in templates are not sufficient.

- One `Exemplar` per form the course teaches. Where the department has a full form and a simplified one, author both.
- Follow the real form exactly: its section numbering, its front matter, its table columns, its rating scales.
- Every section carries a `note` explaining why it is written that way. The note is commentary, not part of the report.
- **Make it uncomfortable.** A cost overrun against original approval, a benefit that missed, a transfer nobody accepted, an approval that was never sought. A worked example of the easy case teaches nothing, and everyone can already write that one.
- Cross-references inside the document must point at sections that exist.

**Produce:** `exemplars: Exemplar[]`.

**Gate:** each exemplar carries every element the real form asks for by name.

---

## Phase 7 — Wire it up

1. Create `src/courses/<course-id>/`. Keep the course's `course.ts`, `reference.ts`, optional `slides.ts` and optional `exemplar.ts` inside it.
2. Add `index.ts`, assemble a complete `TrainingPackage`, and export it as both a named and default export.
3. Add the manifest: `schemaVersion`, semantic `version`, stable `id`, `title`, `subtitle`, `publisher`, `sourceAuthor?`, `source`, `reviewed`, `status`, `summary`, `arc`.
4. Register that entry module once in `src/package-catalog.ts`.
5. For a curated repository course, add a meaningful illustration for every stage in `illustrations.tsx` and register it under `<package-id>:<stage-id>`. Workshop-authored courses may use an embedded stage image or the deliberate course-neutral fallback.
6. Derive `minutes` for every stage via `withDerivedMinutes()`.
7. Put binary assets under `public/courses/<course-id>/`; never add them to another course's folder.

Illustration rules:

- All colour from `var(--stage)` so the diagram recolours per stage.
- Namespace every gradient and filter id per instance.
- Text is fixed in user units and does not reflow. Position labels in **fixed columns**, never from a variable such as a bar width or an end anchor, or they collide when the string grows.
- Minimum 4 user units of leading between stacked labels.

**Gate:** the package satisfies `package-validation.ts`, appears in the combined library, switches by clicking, exports alone without another course's content/assets, and every stage renders a diagram.

---

## Phase 8 — Verify

Run the complete release command. It performs typechecking, both builds, combined learner QA, every isolated export, Workshop QA and release-command QA:

```bash
npm run verify
```

Then, by hand:

0. **Read the course as a course**, start to finish, in order. Nothing below and no check in the suite substitutes for this, and two classes of fault are only visible from it:
   - **A stage that defines its terms after using them.** Sections are ordered by the author's sense of importance rather than the reader's need. If a stage's core idea rests on a distinction, the section drawing that distinction comes first.
   - **A title or subtitle that no longer describes its stage.** These go stale whenever content moves between stages, and they are the first thing a learner reads.

   Also read for a subject claimed by two stages. Two stages teaching the approvals block, or ownership, or evidence, is a contradiction a learner finds and an author does not.

1. **Walk every view in the new package.** Not the default one. Anything keyed by id fails silently, and the default package will not show you.
2. **Switch packages by clicking the button**, both directions. Seeding `localStorage` proves the content layer resolved and nothing else.
3. **Complete a stage end to end**: read, fail the knowledge check deliberately, confirm it names what to reread, retry and pass, answer a scenario wrongly and retry, write the assignment, reveal the model answer, confirm mastery appears only when all three requirements are met.
4. **Check the reporting agrees** with what you actually answered.
5. **Print the guide and the completion record** and read them. Measuring the PDF is not reading it.
6. `scripts/walkthrough.mjs <packageId>` automates 3 and 4 across every stage.

**Gate:** the full suite green, the new or changed course's declared profile exercised, and every item above done by hand at least once. A green catalogue total is not a substitute for confirming that course-specific checks actually ran against the changed package.

---

## Installing a Course Workshop package

For a trainer-generated core course, do not copy ZIP contents by hand. From a clean repository, inspect the approved repository package first:

```bash
npm run course:inspect -- path/to/<course-id>-course-package.zip
```

Choose the required delivery surface:

```bash
npm run course:install -- path/to/<course-id>-course-package.zip # combined catalogue
npm run course:host -- path/to/<course-id>-course-package.zip    # separate training/<id>/ URL
```

Both may be used for the same course. The first creates the namespaced course source/assets, retains `releases/<version>.json` and adds one catalogue entry. The second creates an isolated learner page and release record under `public/training/<course-id>/`. Both reject existing targets, so a revision to an already released id is a deliberate developer/custodian change rather than a silent replacement.

Run the Phase 8 gate against the resulting repository. The inspector verifies the reviewer/approver fields and SHA-256 binding to the exact canonical package. That proves which content the declaration names; it is not a substitute for the human course read, the authority behind the approval or repository verification.

---

## Phase 9 — Publish

```bash
npm run verify      # typecheck + combined build/QA + every individual export
git status --short
git add -- <exact source files> Product-Management-Learning-System.html docs
git diff --cached
git commit -m "..."
git push
```

`docs/` is generated and committed, because GitHub Pages serves it directly. Committing source without rebuilding means the live site does not match the code.

---

## Revising an existing course

The dangerous operations, in order of risk.

### Changing what a stage teaches

Realign the stage, then check everything keyed to it still fits: its questions, its flashcards, its glossary terms, its contrasts, its case study steps, its illustration, and any cross-reference in another stage.

### Retiring or merging a stage

Never delete a stage definition on its own. Roughly 50 items may be keyed to its id.

1. Decide which stage absorbs it.
2. Move the sections worth keeping into the absorbing stage.
3. **Remap `moduleId`** on every question, scenario, flashcard, glossary term, contrast and case step from the retired id to the absorbing one.
4. Remove the id from the order array.
5. Delete the stage definition.
6. Confirm no orphaned `moduleId` remains, and no stage is left with a gap in any reference array.

Reversing steps 3 and 5 orphans the content silently.

### Changing the governing artefact

When the department reissues a template, or you discover the course was built on the wrong document:

1. Re-run Phase 0 against the new artefact.
2. Map old stages to new sections. Expect gaps in both directions.
3. Audit **every** piece of content for the old frame — not just the stages. Toolkit prompts, field guide entries, flashcards and question rationales all embed assumptions about structure.
4. Search the built artefact for the old vocabulary. Anything that survives is a contradiction a learner will hit.
5. Rebuild the worked document to the new form.
6. Record what the course adds beyond the new artefact in `divergences`.

### Adding a check

Whenever you fix something the suite did not catch, add a check for it. Then **break the thing again and confirm the check fails.** A check that has never failed has never been tested.

---

## Importing a source deck

Each deck's metadata and images are generated and committed inside that course's namespace. A normal build never regenerates them.

```bash
apt-get install libreoffice poppler-utils
pip install python-pptx pillow
python3 scripts/import-slides.py <course-id> path/to/deck.pptx
```

The script reads the stage-to-slide mapping from `src/courses/<course-id>/course.ts`, writes `slides.ts` beside it, and writes images to `public/courses/<course-id>/slides/`. Every slide the course cites must exist, and the stage ranges must cover the deck with no overlap.

A citation the learner cannot follow is an assertion. Either the source travels with the package or the citation goes.

---

## What fails silently

Committed to memory or checked deliberately — nothing in this list produces an error.

| Fault | Symptom |
|---|---|
| Missing or wrong `<packageId>:<moduleId>` illustration | A generic fallback or the wrong conceptual diagram appears instead of the intended course visual |
| `moduleId` naming a stage that does not exist | Content unreachable |
| A stage missing from the diagnostic pool | Excluded from the recommendation |
| Course name or stage count hardcoded in a view | Wrong package's name after switching |
| Optional manifest field unhandled at a render site | Stranded label with nothing after it |
| SVG label positioned from a variable | Collides or leaves the canvas |
| `grid-template-columns: 1fr` around a `<pre>` or table | Horizontal overflow, often clipped |
| Colour changed without its background | Text the same colour as what is behind it |
| Flat shuffle over a question pool | A practice set drawn from one stage |
| Allowed HTTPS URL points to the wrong version or authority | Syntax passes while provenance is wrong |
| Two trainers edit the same portable draft revision separately | Both copies retain the same lineage until compared; there is no automatic merge |

## What no check will find

The suite catches structure, measurement and coverage. It does not read. These need a person or an agent reading the course in order:

| Fault | Where it comes from |
|---|---|
| A stage defining its terms after using them | Sections ordered by the author's priorities, not the reader's |
| A title or subtitle that no longer fits | Content moved between stages; the heading did not follow |
| Two stages claiming the same subject | A fold or a new stage that overlapped an existing one |
| A reference entry describing a structure the course no longer teaches | Toolkit prompts, field guide entries and question rationales embed structural assumptions |
| Prose that is accurate and unreadable | Nothing measures whether an explanation lands |
