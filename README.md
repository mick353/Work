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
| **[STANDARDS.md](STANDARDS.md)** | You need the measurable definition of "good" and the scope of shared, Workshop and course-specific checks |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | You are changing the player rather than the content |
| **[COURSE-PACKAGE-FORMAT.md](COURSE-PACKAGE-FORMAT.md)** | You need the folder contract, package schema, versioning rules or export commands |
| **[COURSE-WORKSHOP.md](COURSE-WORKSHOP.md)** | You are using or maintaining the separate trainer-facing course authoring tool |
| **[ROADMAP.md](ROADMAP.md)** | You want to know what remains beyond the implemented player, exports and authoring profile |
| **[LEARNING-SYSTEM-DIRECTION.md](LEARNING-SYSTEM-DIRECTION.md)** | You need the settled training-managed product and deployment decisions |
| **[DEWR-BRAND-PROTOTYPE.md](DEWR-BRAND-PROTOTYPE.md)** | You are reviewing the optional departmental visual theme and its accessibility guardrails |
| **[NOTICE.md](NOTICE.md)** | Provenance, status and takedown contact |
| **[DELIVERY-ASSURANCE-QUALITY-COURSE-PROPOSAL.md](DELIVERY-ASSURANCE-QUALITY-COURSE-PROPOSAL.md)** | You are reviewing the proposed third course; it is a concept and research brief, not an implemented package |

If you are an AI agent picking this up cold: read AUTHORING.md end to end before changing any content, and STANDARDS.md before writing any assessment item. Both are written to be followed without further context.

## Current status

- The combined learner site publishes two maintained packages: Product Management Fundamentals and Closure Reports.
- Both packages can also be built and distributed independently without the catalogue or the other course's content.
- Course Workshop 0.5.0 covers the complete current package shape, including advanced learning content, embedded media and source decks. Its code-level readiness controls are implemented; organisational production readiness still requires real trainer and manual accessibility/device evidence.
- Repository installation and online publication remain release-custodian actions. Browser authoring never changes Git or publishes a course by itself.
- Draft v2 migration, exact-content release binding, HTTPS/media hardening, per-course quality profiles, versioned release archives and learner curriculum-version choices are implemented. The remaining external evidence is recorded in [ROADMAP.md](ROADMAP.md).
- An opt-in DEWR visual prototype is available for trainer evaluation. It does not change the default learner site and is not a claim of departmental endorsement.

## Use it

**On the web:** <https://mick353.github.io/Work/>

**DEWR visual prototype:** <https://mick353.github.io/Work/?brand=dewr#dashboard>. This is the same learner application and saved-progress model with an optional departmental colour/font treatment. The normal URL remains unchanged; see [DEWR-BRAND-PROTOTYPE.md](DEWR-BRAND-PROTOTYPE.md).

**For trainers creating a course:** <https://mick353.github.io/Work/course-workshop/>. Its first page is the complete author/review/release guide. A trainer can start blank or safely clone a maintained course, edit the complete learning package, import a PDF/image source deck and stage visuals, preview it, and export one learner course. Drafts remain in that browser; using the published tool does not add anything to the learner site.

**On your phone:** open that link, then add it to your home screen — *Share → Add to Home Screen* on iOS, or *⋮ → Install app* on Android. It installs with its own icon, opens without browser chrome, and works offline afterwards.

**Anywhere else:** download **`Product-Management-Learning-System.html`** and open it in any modern browser. That one file is everything — both courses, all 98 slides, no installation, no server, no network. It works from a USB stick, an email attachment or a network share.

Learner progress is stored in the browser's local storage and is not transmitted by the application. When a course version changes, the player asks whether to keep that course's saved work or start it fresh. Course Workshop drafts use a separate local IndexedDB store so decks and images fit; portable draft v2 files carry stable identity and revision metadata. There is no account, login, application server or telemetry. Locally entered learner answers and trainer-authored material can still contain personal, sensitive or internal information, so downloaded backups and draft files must be handled appropriately. Progress and drafts do **not** follow you between machines—use **Settings → Download a backup** for learner progress and **Save/share complete draft** in Course Workshop for authoring work.

The recommended loop:

1. Take the diagnostic, or begin at Stage 1.
2. Read a short lesson, then explain the idea from memory.
3. Complete the knowledge check and both decision scenarios.
4. Return to **Review** on later days for scheduled retrieval practice.
5. Use the toolkit, the field guide and the capstone to apply the method to a realistic government-service case.

## What a learner gets

Common to both packages: substantial staged lessons with worked reasoning and applied examples, knowledge checks with feedback on *every* option, decision scenarios, a spaced-repetition card deck, mixed practice, a diagnostic that recommends where to start, worked case studies, a multi-part capstone with a self-assessment rubric, a toolkit of templates, a field guide, a glossary, a printable full-course guide, full-text search, results charts, light and dark themes, JSON backup and restore, and a printable record of completion.

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
| Sources | 16 | 19 |
| Reading time | ~1h 55m | ~2h 55m |

Question counts are the assessed items — knowledge checks, scenarios and the diagnostic pool. The mixed-practice pool is separate, so a good diagnostic score means the ideas transfer rather than that you recognise the wording.

## Design decisions

The learning design is deliberate and in several places counter-intuitive — how mastery is gated, why the completion record is not a certificate, why question sets are drawn rather than fixed. Those decisions and their reasoning are documented in [ARCHITECTURE.md](ARCHITECTURE.md#7-design-decisions), alongside the code that implements them.

## Development

Requires Node 18+.

```bash
npm install
npx playwright install chromium   # once, before the first QA run

npm run build      # learner builds plus offline and published Course Workshop
npm run export:course -- pm-fundamentals  # isolated standalone + web export
npm run export:all # isolated exports for every registered course
npm run build:authoring  # rebuilds both identical Course Workshop copies
npm run course:inspect -- path/to/course-package.zip # read-only release inspection
npm run course:install -- path/to/course-package.zip # add to combined catalogue
npm run course:host -- path/to/course-package.zip    # add an individual URL
npm run dev        # rebuild on change
npm run typecheck  # tsc --noEmit
npm run qa         # combined-site browser verification
npm run qa:exports # build and verify every isolated course export
npm run qa:authoring # browser and generated-output verification for Course Workshop
npm run qa:release # package install/host, tamper and nested-cache checks
npm run verify     # all learner, export, Workshop and release checks
```

### Build

`scripts/build.mjs` bundles `src/main.tsx` with esbuild and inlines the JS and CSS into `index.html`. The default command preserves the published combined catalogue:

1. **`Product-Management-Learning-System.html`** — a pure single file, with every required slide inlined.
2. **`docs/`** — the web/PWA build with course assets kept as separate lazy-loaded files. This is what GitHub Pages serves.

`npm run export:course -- <course-id>` builds the same two delivery forms under `exports/<course-id>/`, but replaces the catalogue at bundle time. The other course's content and assets are not present. In a one-course build the library route returns to the overview, and the library/switcher chrome is omitted. It also retains exact copies under `exports/<course-id>/releases/<version>/` with a SHA-256 manifest. `exports/` is generated and ignored by Git; copy the required file or site folder to the delivery location.

The PWA pieces are deliberately kept out of the standalone file: a service worker registration that can never succeed on `file://` would only log errors. The service worker's cache name is stamped with a hash of the built HTML, so each release invalidates the last.

`npm run build:authoring` writes the same self-contained Workshop to **`Course-Authoring-Studio.html`** for a copied/offline repository and **`docs/course-workshop/index.html`** for its separate Pages URL. It embeds the shared learner player, the PDF import worker and safe editable copies of maintained courses (including the Product Management deck); it contains no user draft and still performs all authoring locally. See [COURSE-WORKSHOP.md](COURSE-WORKSHOP.md) for the trainer instructions, output choices and controlled install/host commands.

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

Course slide metadata and images are generated and committed under that course's own folders — a normal build never regenerates them. If a source deck changes:

```bash
apt-get install libreoffice poppler-utils
pip install python-pptx pillow
python3 scripts/import-slides.py pm-fundamentals path/to/deck.pptx
```

The script reads the stage-to-slide mapping from `src/courses/<course-id>/course.ts`, writes metadata beside it, and writes images to `public/courses/<course-id>/slides/`. The QA suite then asserts that the declared slides and citations resolve.

### QA

`scripts/qa.mjs` runs the combined-site browser suite and writes its exact result to `qa-report.json`; passing rows carry observations while only failing rows carry failure messages. Shared checks cover the catalogue, and each maintained course is also evaluated against its explicit versioned quality profile. Some end-to-end learner journeys intentionally exercise one representative package and are named accordingly. `scripts/qa-exports.mjs` builds each course separately and verifies bundle isolation, versioned release hashes, single-course navigation, accessibility and course-scoped capstone downloads. `scripts/qa-authoring.mjs` verifies the separate authoring tool, v1→v2 migration, release gate, source/media hardening, content digests and generated outputs. `scripts/qa-release.mjs` proves controlled inspection/installation/hosting, exact-content and executable tamper refusal, and distinct service-worker caching for nested pages. Playwright and its Chromium are resolved from `node_modules`, so there are no absolute paths.

It covers question-bank integrity, scoring arithmetic, mastery gating, backup round-trip including rejection of malformed files, package switching **through the control a learner clicks**, contrast on every stage page in every supported theme and brand mode, axe-core rules tagged to WCAG 2.0/2.1 A/AA with serious and critical impacts, line measure and horizontal overflow at 390, 768, 1100, 1440 and 1920 px, the project's 24 px target-size rule, keyboard and focus behaviour, reduced motion, and console hygiene. The product design target is WCAG 2.2 Level AA; the automated rules are regression evidence within that target, not a claim of complete conformance.

The rules governing additions to the suite are in [STANDARDS.md](STANDARDS.md#10-rules-for-the-check-suite-itself).

### Source layout

```
public/                Assets copied into web builds at build time
  manifest.webmanifest
  sw.js                Offline service worker (version stamped at build)
  icon-*.png
  courses/
    pm-fundamentals/
      slides/           This course's rendered deck slides
  training/             Approved individually hosted course routes
docs/                  GENERATED — the GitHub Pages build. Do not edit by hand.
  course-workshop/      GENERATED separate trainer-facing authoring URL
exports/               GENERATED, ignored — current + versioned isolated releases
authoring/              Separate Course Workshop React source
  AdvancedEditor.tsx   Cases, toolkit, capstone, guide, differences, exemplars
  MediaEditor.tsx      Source-deck and course-owned image workflow
  media.ts             PDF/image conversion into inert embedded assets
  storage.ts           Asset-capable local draft persistence (IndexedDB)
scripts/
  build.mjs            Combined or selected-course bundle
  build-authoring.mjs  Workshop + player, PDF worker and editable course templates
  authored-player.mjs  Trusted generated-course player shared by build/inspection
  install-course-package.mjs  Inspect/install/host an approved Workshop ZIP
  export-all.mjs       Runs a selected-course build for every course folder
  qa.mjs               Combined-catalogue browser verification
  qa-exports.mjs       Individual-export isolation and behaviour verification
  qa-authoring.mjs     Authoring, ZIP-boundary and generated-learner verification
  qa-release.mjs       Release-command, tamper and nested-page cache verification
  import-slides.py     Course deck → course metadata + course assets
  walkthrough.mjs      Completes a course end to end as a learner; not part of qa
  add-notes.py         One-off content migrations, already applied. Retained for
  add-reasoning.py     provenance only: not part of the build and not safe to
  new-cases.py         re-run.
  rebalance.py
  *.json               Payloads those migrations consumed
src/
  package-model.ts     Versioned, course-neutral data contract
  package-validation.ts Runtime validation at the package boundary
  course-quality-profiles.ts Versioned release floors for every maintained course
  package-utils.ts     Shared derivation/assembly helpers
  package-catalog.ts   The combined catalogue; registers course entry modules
  packages.ts          Validated catalogue and active-package helpers
  content.ts           Resolves the active package and re-exports its content,
                       so views never import a course directly
  main.tsx             Entry point
  App.tsx              Shell, routing, navigation groups, mobile drawer

  courses/
    pm-fundamentals/   Self-contained course source
      index.ts         Manifest and complete TrainingPackage assembly
      course.ts        Stages, lessons, questions and scenarios
      reference.ts     Cards, cases, capstone, field guide and sources
      slides.ts        GENERATED deck metadata
    closure-reports/   Same boundary for Closure Reports
      index.ts
      course.ts
      reference.ts
      exemplar.ts

  lib.ts               Routing, local-time dates, guarded storage, seeded
                       shuffle, SM-2 scheduling, backup filenames
  state.ts             Progress types, storage hooks, mastery rules
  recall.ts            Which cards an error brings forward, and why

  components.tsx       Shared UI: question cards, feedback, tables, source chips
  charts.tsx           Hand-rolled SVG charts, each with a hidden data table
  illustrations.tsx    Conceptual SVG diagrams, keyed by package id + stage id

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
