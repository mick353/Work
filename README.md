# Product Practice — a player for training packages

An offline learning system that runs self-contained **training packages**. Nothing in the player is specific to any one course: a package supplies its own stages, questions, flashcards, glossary, cases and sources, and the app reads all of it through a single interface.

Two packages ship today.

| Package | Stages | Questions | Cards | Built from |
|---|---|---|---|---|
| **Product Management Fundamentals** | 9 | 122 | 92 | The 98-slide *Product Management Fundamentals* deck by Simon Morris, DEWR Digital Experience and Solutions |
| **Closure Reports** | 12 | 119 | 98 | The DEWR Project Closure Report Template, Tier 3 form, Project Closure Factsheet and closure announcement |

A source artefact supplies the subject matter and nothing else. Everything the learner interacts with — the staged lessons, the questions and their per-option feedback, the flashcards, the cases, the capstone, the templates and the player itself — was built around that source, and the app says "built from" rather than "by" throughout so the two are never conflated.

> Unofficial internal learning aid. **Not an official Australian Government publication**, and not a substitute for departmental guidance or the Digital Service Standard. See [NOTICE.md](NOTICE.md).

## The documentation set

Each document has one job. Start with the one that matches what you are doing.

| Document | Read it when |
|---|---|
| **README.md** (this file) | You want to know what the system is, what ships in it, and how to run it |
| **[AUTHORING.md](AUTHORING.md)** | You are adding a course or revising one. The end-to-end procedure, in order, with a gate at each phase |
| **[STANDARDS.md](STANDARDS.md)** | You need the measurable definition of "good" — every threshold the check suite enforces |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | You are changing the player rather than the content |
| **[ROADMAP.md](ROADMAP.md)** | You want to know what is deliberately not built yet, and why |
| **[NOTICE.md](NOTICE.md)** | Provenance, status and takedown contact |

If you are an AI agent picking this up cold: read AUTHORING.md end to end before changing any content, and STANDARDS.md before writing any assessment item. Both are written to be followed without further context.

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
| Stages | 9 | 12 |
| Knowledge checks | 74 | 81 |
| Decision scenarios | 18 | 24 |
| Diagnostic pool | 30 | 14 |
| Mixed-practice pool | 92 | 74 |
| Flashcards | 92 | 98 |
| Glossary | 59 | 77 |
| Worked cases | 4 | 3 |
| Templates | 10 | 16 |
| Capstone | 3 briefs × 9 sections | 4 briefs × 10 sections |
| Practice contrasts | 17 | 14 |
| Field guide entries | 7 | 10 |
| Course additions | 7 | 7 |
| Source slides | 98, all in the app | — |
| Worked documents | — | The full template and the Tier 3 form, each complete with commentary |
| Sources | 16 | 17 |
| Reading time | ~1h 55m | ~2h 40m |

Question counts are the assessed items — knowledge checks, scenarios and the diagnostic pool. The mixed-practice pool is separate, so a good diagnostic score means the ideas transfer rather than that you recognise the wording.

## Design decisions

The learning design is deliberate and in several places counter-intuitive — how mastery is gated, why the completion record is not a certificate, why question sets are drawn rather than fixed. Those decisions and their reasoning are documented in [ARCHITECTURE.md](ARCHITECTURE.md#7-design-decisions), alongside the code that implements them.

## Development

Requires Node 18+.

```bash
npm install
npx playwright install chromium   # once, before the first QA run

npm run build      # writes both builds
npm run dev        # rebuild on change
npm run typecheck  # tsc --noEmit
npm run qa         # comprehensive browser verification suite
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
git status --short
git add -- <exact-source-files> Product-Management-Learning-System.html docs
git diff --cached
git commit -m "..."
git push origin HEAD
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

`scripts/qa.mjs` runs **281 checks** against the real built artefact in a real browser, and writes `qa-report.json`. Playwright and its Chromium are resolved from `node_modules`, so there are no absolute paths.

It covers question-bank integrity, scoring arithmetic, mastery gating, backup round-trip including rejection of malformed files, package switching **through the control a learner clicks**, contrast on all 40 stage-page/theme combinations, axe-core WCAG 2.1 A/AA across every view in both packages and both themes, line measure and horizontal overflow from 320 px to 2560 px, target sizes, keyboard and focus behaviour, reduced motion, and console hygiene.

The rules governing additions to the suite are in [STANDARDS.md](STANDARDS.md#10-rules-for-the-check-suite-itself).

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
  qa.mjs               The browser verification suite
  import-slides.py     Deck → slides.ts + public/slides (see above)
  walkthrough.mjs      Completes a course end to end as a learner; not part of qa
  add-notes.py         One-off content migrations, already applied. Retained for
  add-reasoning.py     provenance only: not part of the build and not safe to
  new-cases.py         re-run.
  rebalance.py
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

  closure-course.ts    Package 2 — twelve stages
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

Product Management Fundamentals is built from Simon Morris's deck, which supplies the subject matter and the nine-part structure. Closure Reports is built from the DEWR Project Closure Report Template, Tier 3 form, Project Closure Factsheet and closure announcement. DTA closure material is a whole-of-government comparator; Finance, ANAO and National Archives sources add assurance, performance and records obligations; the UK Teal Book is comparator practice. In both packages the named source material is the spine, while the assessment, practice, worked material and player around it are separate work.

`PackageManifest` carries `sourceAuthor` for whoever wrote the artefact a package was built from. There is deliberately no matching field for whoever built the package: the separation is carried by the wording "built from", and a QA check fails the build if a personal name appears as a package credit.

Scrum definitions, SAFe prioritisation guidance and Australian Government standards are cited separately and are **not interchangeable** — epics, features and Program Increments are not Scrum terms, and the DES delivery phases (Pre-Approval, Pre-Delivery, Delivery, Closure) are not the DTA service phases (Discovery, Alpha, Beta, Live). Each package's Sources page makes these boundaries explicit and carries a review date.
