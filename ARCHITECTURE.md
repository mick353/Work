# Architecture

How this repository fits together, for someone arriving with only the code.

The short version: it is a React app with no backend, no accounts and no network calls, which renders one **training package** at a time out of a registry, and builds into two artefacts — a single self-contained HTML file and a GitHub Pages site.

---

## 1. The one idea that explains the layout

**A course is data. The player is code. They meet at exactly one interface.**

`src/packages.ts` defines two types and holds the registry:

- `PackageManifest` — identity and provenance. Id, title, subtitle, publisher, source artefact, `sourceAuthor` (optional — whoever wrote that artefact), review date, status, summary, curriculum arc.
- `PackageContent` — everything a course owns: modules, sources, questions in four separate pools, flashcards, glossary, case studies, contrasts, divergences, toolkit templates, capstone steps and briefs, field guide, an optional worked-example document, slides.

`trainingPackages` is the registry. Adding a course means authoring the arrays, writing a manifest and appending to that array. It does not mean touching a view.

**Nothing in `views-*` imports a course file.** Everything goes through `src/content.ts`, which resolves the active package once at module load and re-exports its content under stable names. This indirection is the whole reason the claim "adding a package is a data operation" is true; before it existed, every view named its content directly and the claim was false.

```
packages.ts  ──registry──▶  content.ts  ──named exports──▶  every view
     ▲                          │
     │                          └── reads localStorage for the active package id
course.ts, reference.ts, slides.ts                    (before React renders)
closure-course.ts, closure-reference.ts, closure-exemplar.ts
```

### Why switching packages does a full page reload

`content.ts` resolves at module load, not in a React context. That is deliberate. Storage keys are namespaced per package, so switching has to re-read all of them; a reload is the honest way to do that. Given the reload, a context would add a hook call to every view to solve a problem the reload already solves.

The practical consequence for anyone editing: **the active package is fixed for the lifetime of the page.** Do not write code that expects it to change under you.

---

## 2. Storage

All state is `localStorage`. There is no server, no account, no sync and no telemetry — verified, not assumed.

Two tiers, and the split matters:

| Scope | Key shape | Examples |
|---|---|---|
| **Per package** | `product-practice-v2:<packageId>:<key>` | progress, review schedule, capstone drafts, study days, question history |
| **Per person** | `product-practice-v2:<key>` | theme, shuffle salt, sidebar group state, active package id |

Person-level settings sit outside any package on purpose: re-randomising someone's answer order because they opened a different course would be pointless churn.

`storageKey()` in `lib.ts` applies the namespace. `readStored` / `writeStored` guard against quota errors and private-mode failures rather than throwing. Data written before namespacing existed migrates on first load rather than presenting as a reset.

**Backups** are JSON, named `pp-<packageId>-<YYYY-MM-DD>-<HHMM>[-before-reset].json` in local time. Restore rejects a malformed file rather than clearing progress — there is a QA check for that specific failure.

---

## 3. The two builds

`scripts/build.mjs` runs one esbuild bundle and emits two things:

| | `Product-Management-Learning-System.html` | `docs/` |
|---|---|---|
| Size | ~4.4 MB | ~1 MB + assets |
| Slides | All 98 inlined as base64 data URIs | Separate `.webp` files, lazy-loaded |
| Service worker | **No** | Yes, network-first |
| Web manifest, icons | No | Yes |
| Runs from | `file://`, USB, email attachment | GitHub Pages |

The PWA pieces are kept out of the standalone file because a service worker registration that can never succeed on `file://` would only log errors. The slides are inlined there for the opposite reason: a single file that loses its images the first time someone emails it on is not a single file.

Both behaviours are asserted in QA, because getting them backwards is invisible until someone is on mobile data.

The service worker's cache name is stamped with a hash of the built HTML (`__BUILD_VERSION__`), so each release invalidates the last.

**`docs/` is generated. Never edit it by hand.** GitHub Pages is configured to serve `/docs` on `main`, which is why the build lands there.

---

## 4. Where the learning design lives

| Concern | File | Note |
|---|---|---|
| Seeded option shuffling | `lib.ts` | Mulberry32 seeded from question id + per-install salt. Stable per person, different between people. |
| Spaced repetition | `lib.ts` | SM-2. Ease, interval, lapses, due date. |
| Error-driven recall | `recall.ts` | A wrong answer brings forward cards covering it. Moves the **due date only** — never ease or lapse count, because rating a card the learner has not seen would corrupt it. |
| Mastery rules | `state.ts` | Lesson read + ≥75% on the check + both scenarios correct. |
| Question pools | `content.ts` | `quizPoolFor()` merges a stage's own items with package supplements. Diagnostic and mixed-practice pools are kept separate so a diagnostic score means transfer, not recognition. |
| Reading time | derived | Word count plus an allowance per question. Never typed by hand. |

**Question selection is dynamic.** A stage quiz draws a fresh five from its pool per attempt; mixed practice draws ten from the whole bank; the diagnostic takes one question per stage at random, so it always covers the full curriculum but never with the same set. Flashcards are the deliberate exception — scheduled, not sampled.

---

## 5. Traps

Behaviours that produce no error and no visible symptom until someone reports one. Check each before shipping a change in its area.

**`grid-template-columns: 1fr` means `minmax(auto, 1fr)`, and `auto` will not shrink below its content.** Any track that might hold a `<pre>`, a table or a long token needs `minmax(0, 1fr)`.

**`--stage-N` and `--accent-N` are not interchangeable.** `--stage-N` is a bright fill colour. `--accent-N` aliases `--stage-N-ink`, a darker variant, used for **text**. Brightening the fill without preserving the split fails contrast across every stage at once.

**Colour and background travel together.** A rule that restyles a background without setting `color` leaves whatever the previous rule set. Because stage hue is bound per stage via `[data-stage]`, the result can be legible on one stage and invisible on another, so contrast is checked on every stage page in both themes rather than on a sample.

**Anything keyed by module id renders nothing on a miss, and reports nothing.** `illustrations.tsx` is `Record<moduleId, Component>`; flashcards, glossary terms, contrasts and questions resolve the same way. A stage absent from any of them shows an empty section.

**Optional manifest and content fields need handling at every render site.** `sourceAuthor`, `exemplars` and `slides` are each absent from one package. A missing optional field must produce no output rather than a label with nothing after it.

**`sourceAuthor` names whoever wrote the source artefact, and nothing else.** The stages, questions, cards, cases and capstone are separate work. A single `author` field, or a byline under the title, attributes all of it to the source author. There is deliberately no field naming the package author: the separation is carried by the wording "built from".

**The package author is unnamed by design.** A check reads the built artefact and fails if a personal name appears as a package credit.

**`opacity` composites an element *and* its background toward the page.** A disabled button at `opacity: 0.45` computed to 1.04:1 in dark mode. Use real colour tokens for disabled states.

**Never hardcode a course's name, stage count, publisher or tagline in a view.** Nineteen views once carried the first package's name as literal text, so switching packages changed the sidebar and the content while the page still said the wrong title. Anything phrased as a fact about the course comes from the manifest.

---

## 6. Verification

`scripts/qa.mjs` runs the comprehensive suite against the real built artefact in a real Chromium, writing the exact result to `qa-report.json`. The current committed report records **294/294 checks passed**. Playwright and its browser resolve from `node_modules`, so there are no absolute paths.

Coverage: question-bank integrity and item-writing statistics, scoring arithmetic, mastery gating, backup round-trip including malformed-file rejection, package switching *through the button*, contrast across all 40 stage-page/theme combinations, axe-core rules tagged to WCAG 2.0/2.1 A/AA with serious and critical impacts, line measure and horizontal overflow from 320 px to 2560 px, the project's 24 px target-size rule, keyboard and focus, reduced motion, and console hygiene. This is regression evidence rather than complete accessibility certification.

Two rules govern additions to it:

1. **Test through the control the user touches.** Seeding `localStorage` and reloading proves the content layer resolved and nothing else. That is exactly how a broken package switch shipped.
2. **After writing a check, break the thing deliberately and confirm the check fails.** Three checks in this suite were once passing while measuring nothing.

Use `qa-report.json.totalChecks` as the result for a run. The suite's shuffled-question paths were made deterministic for the current release; an unexplained change in the total should be investigated rather than dismissed as normal variation.

[AUTHORING.md](AUTHORING.md) is the procedure for adding or revising a course. [STANDARDS.md](STANDARDS.md) holds every threshold this suite enforces.

---

## 7. Design decisions

Why the learning design is shaped the way it is. Read before changing any of it.

**A course is a package, not the whole product.** Each package carries a manifest and owns its own storage namespace — the shape SCORM and cmi5 both settled on. Flat top-level content arrays would give two courses one progress record, one review queue and one results page between them, so finishing one would read as partly finishing the other. Person-level settings (theme, shuffle salt, sidebar state) deliberately sit outside any package, because re-randomising someone's option order for opening a different course would be pointless churn.

**Every optional section can be absent.** Closure Reports has no source deck; Product Management Fundamentals has no worked example document. Each optional section carries an empty state naming what is missing and confirming the rest still works, and navigation hides destinations a package does not fill. Code must not index `[0]` on a content array a smaller package leaves empty.

**Question sets are drawn, not fixed.** A stage quiz takes a fresh five from that stage's pool each attempt, so retaking it is a new test rather than a memory check of the same items. Mixed practice draws ten from the whole bank. The diagnostic takes one question per stage at random — always covering the full curriculum, never the same set twice. Flashcards are the deliberate exception: they are scheduled by an SM-2 spaced-repetition algorithm, so a card returns when it is due rather than at random.

**Answer options are shuffled per learner, and equal in length.** The permutation is seeded from the question id plus a per-install salt: stable for one person across reloads, different between people. Length matters as much as position — a key that is reliably the longest option makes "click the longest answer" a winning strategy regardless of shuffling. The suite fails the build if that strategy scores above 40%.

**Body copy is set to a measure, not to the container.** A `ch`-based measure applies to running text only — tables and artefacts deliberately break out, because a table is scanned rather than read. The QA suite fails the build if any view drifts outside 45–80 characters.

**Stage length is computed, never typed.** `stageMinutes()` derives it from word count plus an allowance per question, so the figure moves when the content does. Hand-typed values drift from the content and cannot be trusted once a stage is edited.

**Errors drive the review queue.** Getting a question wrong brings forward the flashcards covering it, so the queue is shaped by what you missed rather than by a fixed order. It moves the due date only, never the card's ease or lapse count, because rating a card the learner has not seen would corrupt it with data from a different exercise.

**The completion record is deliberately not a certificate.** It is readable and printable, and states on its face that it is self-recorded in one browser, not issued or verified by anyone. A QA check fails the build if the wording drifts toward implying a credential.

**Assignments are checked against a model, not left blank.** Marking free text is impossible in an offline single file; revealing a worked answer *after* the learner commits their own, against explicit criteria they tick themselves, is not. The model stays disabled until something is written, because seeing a good answer first replaces the work with recognition.

**Motion preference is honoured in JavaScript, not just CSS.** The stylesheet neutralises transitions under `prefers-reduced-motion`, but a JavaScript `scrollIntoView({ behavior: "smooth" })` is not CSS and that rule never reaches it. The QA suite runs a reduced-motion browser context to prove it.

**The deck ships with the app, and the two builds carry it differently.** The standalone HTML inlines all 98 slides as data URIs, because a single file that loses its images the first time it is emailed on is not a single file. The GitHub Pages build leaves them as lazy-loaded files, so a phone downloads about 1 MB and fetches only the slides actually opened. Both are asserted by the QA suite, because getting it backwards is invisible until someone is on mobile data.
