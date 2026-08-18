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

Each of these has cost real time. They are here so they cost it once.

**`grid-template-columns: 1fr` means `minmax(auto, 1fr)`, and `auto` will not shrink below its content.** Any track that might hold a `<pre>`, a table or a long token needs `minmax(0, 1fr)`. This bit three times in one session.

**`--stage-N` and `--accent-N` are not interchangeable.** `--stage-N` is a bright fill colour. `--accent-N` aliases `--stage-N-ink`, a darker variant, and is used for **text**. Brightening the fill without keeping the split produced hundreds of contrast failures.

**Colour and background must be changed together.** `.core-idea` was authored as a dark slab with white text; two later rules restyled the background to a light tint and neither touched `color`. Twenty stage pages rendered white-on-white in the light theme and every check passed, because the contrast check only opened the dashboard.

**Anything keyed by module id silently renders nothing on a miss.** `illustrations.tsx` is `Record<moduleId, Component>`. The second package shipped eleven stages with no diagrams and no error.

**Optional manifest and content fields must be handled at every render site.** `sourceAuthor` is absent on one package, `exemplar` on the other, `slides` on the other again. A missing optional field should produce no output, not a stranded label.

**`sourceAuthor` wrote the source, not the package.** He wrote the deck or standard the package was built from. The stages, questions, cards, cases and capstone — the overwhelming majority of what a learner touches — are separate work. A field called `author`, or a byline under the title, hands him credit for all of it; that shipped once and had to be undone.

**The package author is deliberately unnamed.** The separation is carried by wording — everything says "built from" — rather than by a second name. This is easy to undo by accident, because naming both people is the obvious way to express the distinction. A QA check reads the built artefact and fails if a personal name appears as a package credit.

**`opacity` composites an element *and* its background toward the page.** A disabled button at `opacity: 0.45` computed to 1.04:1 in dark mode. Use real colour tokens for disabled states.

**Never hardcode a course's name, stage count, publisher or tagline in a view.** Nineteen views once carried the first package's name as literal text, so switching packages changed the sidebar and the content while the page still said the wrong title. Anything phrased as a fact about the course comes from the manifest.

---

## 6. Verification

`scripts/qa.mjs` — **273 checks** against the real built artefact in a real Chromium, writing `qa-report.json`. Playwright and its browser resolve from `node_modules`, so there are no absolute paths.

Coverage: question-bank integrity and item-writing statistics, scoring arithmetic, mastery gating, backup round-trip including malformed-file rejection, package switching *through the button*, contrast across all 40 stage-page/theme combinations, axe-core WCAG 2.1 A/AA on every view in both packages and both themes, line measure and horizontal overflow from 320 px to 2560 px, target sizes, keyboard and focus, reduced motion, and console hygiene.

Two rules govern additions to it:

1. **Test through the control the user touches.** Seeding `localStorage` and reloading proves the content layer resolved and nothing else. That is exactly how a broken package switch shipped.
2. **After writing a check, break the thing deliberately and confirm the check fails.** Three checks in this suite were once passing while measuring nothing.

The count varies by one between runs. That is expected: one check only fires when the harness's first-option click lands on a wrong answer, and option order is salted.

[BUILDING-TRAINING.md](BUILDING-TRAINING.md) is the full checklist for authoring a package, written after the second one. Read it before adding a course.
