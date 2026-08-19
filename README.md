# Product Practice — a player for training packages

An offline learning system that runs self-contained **training packages**. Nothing in the player is specific to any one course: a package supplies its own stages, questions, flashcards, glossary, cases and sources, and the app reads all of it through a single interface.

Two packages ship today.

| Package | Stages | Questions | Cards | Built from |
|---|---|---|---|---|
| **Product Management Fundamentals** | 9 | 122 | 92 | The 98-slide *Product Management Fundamentals* deck by Simon Morris, DEWR Digital Experience and Solutions |
| **Closure Reports** | 11 | 105 | 80 | Commonwealth assurance and performance frameworks, spined on the DTA project closure reporting standard |

A source artefact supplies the subject matter and nothing else. Everything the learner interacts with — the staged lessons, the questions and their per-option feedback, the flashcards, the cases, the capstone, the templates and the player itself — was built around that source, and the app says "built from" rather than "by" throughout so the two are never conflated.

> Unofficial internal learning aid. **Not an official Australian Government publication**, and not a substitute for departmental guidance or the Digital Service Standard. See [NOTICE.md](NOTICE.md).

New here and reading the code? [ARCHITECTURE.md](ARCHITECTURE.md) explains how it fits together. Adding a course? Read [BUILDING-TRAINING.md](BUILDING-TRAINING.md) first — it is the checklist written after the second package was built, and it exists because most of what goes wrong is not obvious. [ROADMAP.md](ROADMAP.md) records what is deliberately not built yet.

## Use it

**On the web:** <https://mick353.github.io/Work/>

**On your phone:** open that link, then add it to your home screen — *Share → Add to Home Screen* on iOS, or *⋮ → Install app* on Android. It installs with its own icon, opens without browser chrome, and works offline afterwards.

**Anywhere else:** download **`Product-Management-Learning-System.html`** and open it in any modern browser. That one file is everything — both courses, all 98 slides, no installation, no server, no network. It works from a USB stick, an email attachment or a network share.

Progress is stored in the browser's local storage and never leaves the device. There is no account, no login, no server and no telemetry of any kind. That also means progress does **not** follow you between machines — use **Settings → Download a backup** and **Restore from a backup** to move it.

The recommended loop:

1. Take the diagnostic, or begin at Stage 1.
2. Read a short lesson, then explain the idea from memory.
3. Complete the knowledge check and both decision scenarios.
4. Return to **Review** on later days for scheduled retrieval practice.
5. Use the toolkit, the field guide and the capstone to apply the method to a realistic government-service case.

## What a learner gets

Common to both packages: staged lessons with a worked-reasoning passage each, knowledge checks with feedback on *every* option, decision scenarios, a spaced-repetition card deck, mixed practice, a diagnostic that recommends where to start, worked case studies, a multi-part capstone with a self-assessment rubric, a toolkit of templates, a field guide, a glossary, a printable full-course guide, full-text search, results charts, light and dark themes, JSON backup and restore, and a printable record of completion.

Per package:

| | Product Management Fundamentals | Closure Reports |
|---|---|---|
| Stages | 9 | 11 |
| Knowledge checks | 74 | 72 |
| Decision scenarios | 18 | 22 |
| Diagnostic pool | 30 | 11 |
| Mixed-practice pool | 92 | 68 |
| Flashcards | 92 | 80 |
| Glossary | 59 | 56 |
| Worked cases | 4 | 3 |
| Templates | 10 | 16 |
| Capstone | 3 briefs × 9 sections | 4 briefs × 10 sections |
| Practice contrasts | 17 | 11 |
| Course additions | 7 | — |
| Source slides | 98, all in the app | — |
| Worked example document | — | A complete 14-section closure report with commentary |
| Sources | 16 | 13 |
| Reading time | ~1h 55m | ~2h |

Question counts are the assessed items — knowledge checks, scenarios and the diagnostic pool. The mixed-practice pool is separate, so a good diagnostic score means the ideas transfer rather than that you recognise the wording.

## Design decisions worth knowing

**A course is a package, not the whole product.** Content was flat top-level arrays, which was right for one course and wrong the moment there would be more: a second would have shared one progress record, one review queue and one results page with the first, so finishing one would have looked like partly finishing the other. Each package carries a manifest and owns its own storage namespace — the shape SCORM and cmi5 both settled on. Person-level settings (theme, shuffle salt, sidebar state) deliberately sit outside any package, because re-randomising someone's option order for opening a different course would be pointless churn.

**Every optional section can be absent.** Closure Reports has no source deck and no divergence register; Product Management Fundamentals has no worked example document. The player was indexing `[0]` on arrays a smaller package leaves empty, which took the whole app down, and six views rendered blank with no explanation. Each optional section now has an empty state that says what is missing and confirms the rest still works, and navigation hides destinations a package does not fill.

**Question sets are drawn, not fixed.** A stage quiz takes a fresh five from that stage's pool each attempt, so retaking it is a new test rather than a memory check of the same items. Mixed practice draws ten from the whole bank. The diagnostic takes one question per stage at random — always covering the full curriculum, never the same set twice. Flashcards are the deliberate exception: they are scheduled by an SM-2 spaced-repetition algorithm, so a card returns when it is due rather than at random.

**Answer options are shuffled per learner, and equal in length.** The permutation is seeded from the question id plus a per-install salt, so it is stable for you across reloads but differs between people. Length matters as much as position: at one point the correct answer was the longest option in 99 of 122 questions, so clicking the longest answer scored 81% against a 75% mastery threshold. The QA suite fails the build if that strategy scores above 40%.

**Body copy is set to a measure, not to the container.** Prose once rendered at 117 characters per line against a published optimum of 66. A `ch`-based measure applies to running text only — tables and artefacts deliberately break out, because a table is scanned rather than read. The QA suite fails the build if any view drifts outside 45–80 characters.

**Stage length is computed, never typed.** The course used to advertise "about 8 hours" against roughly 27 minutes of reading, because the per-stage `minutes` were guesses the content had outgrown. They are now derived from word count plus an allowance per question, and move when the content does.

**Errors drive the review queue.** Getting a question wrong brings forward the flashcards covering it, so the queue is shaped by what you missed rather than by a fixed order. It moves the due date only, never the card's ease or lapse count, because rating a card the learner has not seen would corrupt it with data from a different exercise.

**The completion record is deliberately not a certificate.** It is readable and printable, and states on its face that it is self-recorded in one browser, not issued or verified by anyone. A QA check fails the build if the wording drifts toward implying a credential.

**Assignments are checked against a model, not left blank.** Marking free text is impossible in an offline single file; revealing a worked answer *after* the learner commits their own, against explicit criteria they tick themselves, is not. The model stays disabled until something is written, because seeing a good answer first replaces the work with recognition.

**Motion preference is honoured in JavaScript, not just CSS.** The stylesheet neutralises transitions under `prefers-reduced-motion`, but a JavaScript `scrollIntoView({ behavior: "smooth" })` is not CSS and that rule never reaches it. The QA suite runs a reduced-motion browser context to prove it.

**The deck ships with the app, and the two builds carry it differently.** The standalone HTML inlines all 98 slides as data URIs, because a single file that loses its images the first time it is emailed on is not a single file. The GitHub Pages build leaves them as lazy-loaded files, so a phone downloads about 1 MB and fetches only the slides actually opened. Both are asserted by the QA suite, because getting it backwards is invisible until someone is on mobile data.

## Development

Requires Node 18+.

```bash
npm install
npx playwright install chromium   # once, before the first QA run

npm run build      # writes both builds
npm run dev        # rebuild on change
npm run typecheck  # tsc --noEmit
npm run qa         # 277-check verification suite
npm run verify     # typecheck + build + qa
```

### Build

`scripts/build.mjs` bundles `src/main.tsx` with esbuild and inlines the JS and CSS into `index.html`. One bundle, two outputs:

1. **`Product-Management-Learning-System.html`** — 4.4 MB, pure single file, zero external references, all 98 slides inlined as base64.
2. **`docs/`** — about 1 MB plus a web manifest, icons, a service worker and the slides as separate files. This is what GitHub Pages serves.

The PWA pieces are deliberately kept out of the standalone file: a service worker registration that can never succeed on `file://` would only log errors. The service worker's cache name is stamped with a hash of the built HTML, so each release invalidates the last.

### Deploying

Pages serves **`/docs` on `main`**. To publish:

```bash
npm run verify
git add -A && git commit -m "..."
git push
```

Pages redeploys within a minute or two. Installed home-screen copies pick up the new version the next time they open with signal.

### Re-importing the deck

`src/slides.ts` and `public/slides/` are generated, and the outputs are committed — a normal build never regenerates them. If the source deck changes:

```bash
apt-get install libreoffice poppler-utils
pip install python-pptx pillow
python3 scripts/import-slides.py path/to/deck.pptx
```

The script reads the stage-to-slide mapping out of `course.ts`, so the two cannot drift. The QA suite then asserts every cited slide exists and that the stage ranges cover all 98 with no overlap.

### QA

`scripts/qa.mjs` runs **277 checks** against the real built artefact in a real browser, and writes `qa-report.json`. Playwright and its Chromium are resolved from `node_modules`, so there are no absolute paths.

It covers question-bank integrity, scoring arithmetic, mastery gating, backup round-trip including rejection of malformed files, package switching **through the control a learner clicks**, contrast on all 40 stage-page/theme combinations, axe-core WCAG 2.1 A/AA across every view in both packages and both themes, line measure and horizontal overflow from 320 px to 2560 px, target sizes, keyboard and focus behaviour, reduced motion, and console hygiene.

Two rules about this suite, both learned the hard way and both written up in [BUILDING-TRAINING.md](BUILDING-TRAINING.md): test through the control the user touches rather than by seeding storage, and after writing a check, break the thing deliberately and confirm the check fails.

### Source layout

```
public/                Assets copied into docs/ at build time
  manifest.webmanifest
  sw.js                Offline service worker (version stamped at build)
  icon-*.png
  slides/              The 98 rendered deck slides (slide-01.webp ...)
docs/                  GENERATED — the GitHub Pages build. Do not edit by hand.
scripts/
  build.mjs            esbuild bundle; emits both builds
  qa.mjs               The 277-check verification suite
  import-slides.py     Deck → slides.ts + public/slides (see above)
  add-notes.py         One-off content migrations, already applied and kept
  add-reasoning.py     only for provenance. NOT part of the build, and not
  new-cases.py         safe to re-run — two of them corrupted content when
  rebalance.py         first written. See BUILDING-TRAINING.md §14.
  *.json               Payloads those migrations consumed
src/
  packages.ts          THE REGISTRY. Manifests, the PackageContent interface,
                       and both packages. Start here.
  content.ts           Resolves the active package and re-exports its content,
                       so views never import a course directly
  main.tsx             Entry point
  App.tsx              Shell, routing, navigation groups, mobile drawer

  course.ts            Package 1 — stages, lessons, tables, questions, scenarios
  reference.ts         Package 1 — flashcards, templates, capstone, field guide,
                       glossary, contrasts, divergences, diagnostic pool
  slides.ts            GENERATED — deck metadata. Do not edit.

  closure-course.ts    Package 2 — eleven stages
  closure-reference.ts Package 2 — cards, glossary, cases, capstone, templates
  closure-exemplar.ts  Package 2 — the complete worked closure report

  lib.ts               Routing, local-time dates, guarded storage, seeded
                       shuffle, SM-2 scheduling, backup filenames
  state.ts             Progress types, storage hooks, mastery rules
  recall.ts            Which cards an error brings forward, and why

  components.tsx       Shared UI: question cards, feedback, tables, source chips
  charts.tsx           Hand-rolled SVG charts, each with a hidden data table
  illustrations.tsx    Original conceptual SVG diagrams, keyed by module id

  views-learn.tsx      Dashboard, learning path, stage view, diagnostic
  views-practice.tsx   Spaced review, mixed practice
  views-apply.tsx      Toolkit, capstone, worked cases, glossary, field guide
  views-results.tsx    Results charts, record of completion
  views-guide.tsx      The full printable guide
  views-deck.tsx       The source deck browser
  views-exemplar.tsx   The worked example document with commentary
  views-library.tsx    The package library and switcher
  views-meta.tsx       Search, sources, course additions, settings
  slide-viewer.tsx     Slide lightbox and the citation controls that open it
  styles.css           Single stylesheet
```

## Provenance

Product Management Fundamentals is built from Simon Morris's deck, which supplies the subject matter and the nine-part structure. Closure Reports is built on the DTA project closure reporting standard and the Commonwealth assurance and performance frameworks. In both cases the source is the spine; the assessment, practice, worked material and player around it are separate work.

`PackageManifest` carries `sourceAuthor` for whoever wrote the artefact a package was built from. There is deliberately no matching field for whoever built the package: the separation is carried by the wording "built from", and a QA check fails the build if a personal name appears as a package credit.

Scrum definitions, SAFe prioritisation guidance and Australian Government standards are cited separately and are **not interchangeable** — epics, features and Program Increments are not Scrum terms, and the DES delivery phases (Pre-Approval, Pre-Delivery, Delivery, Closure) are not the DTA service phases (Discovery, Alpha, Beta, Live). Each package's Sources page makes these boundaries explicit and carries a review date.
