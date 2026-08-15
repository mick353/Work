# Product Practice — Product Management Learning System

An offline learning system built from the 98-slide **Product Management Fundamentals — 12AUG2026** presentation (DEWR Digital Experience and Solutions Division).

> Unofficial internal learning aid. **Not an official Australian Government publication**, and not a substitute for departmental guidance or the Digital Service Standard. See [NOTICE.md](NOTICE.md).

## Use it

**On the web:** <https://mick353.github.io/Work/>

**On your phone:** open that link, then add it to your home screen — *Share → Add to Home Screen* on iOS, or *⋮ → Install app / Add to Home screen* on Android. It installs with its own icon, opens without browser chrome, and works offline afterwards.

**Anywhere else:** download **`Product-Management-Learning-System.html`** and open it in any modern browser. That one file is the whole course — no installation, no server, no network. It works from a USB stick, an email attachment or a network share.

Progress is stored in the browser's local storage and never leaves the device. That means it does **not** follow you between your laptop and your phone — use **Settings → Download a backup** and **Restore from a backup** to move it.

The recommended loop:

1. Take the diagnostic, or begin at Stage 1.
2. Read a short lesson, then explain the idea from memory.
3. Complete the knowledge check and both decision scenarios.
4. Return to **Review** on later days for scheduled retrieval practice.
5. Use the toolkit, the DES field guide and the nine-part capstone to apply the method to a realistic government-service case.

Because progress lives in one browser on one machine, use **Settings → Download a backup** before switching machines, and **Restore from a backup** on the other side.

## What is included

| | |
|---|---|
| Nine stages | Mapped 1:1 onto the deck's nine sections, covering slides 1–98 |
| Source deck | All 98 slides, in the app. Every citation in the course opens the slide it names |
| Lesson time | About 8 hours in total — built for an hour here and there, not a fixed schedule |
| Questions | 122 — 74 knowledge checks, 18 decision scenarios, 30 in a separate diagnostic pool |
| Per-distractor feedback | Explains why the option you chose is wrong, not just why the answer is right |
| Flashcards | 92 — definition, application and discrimination cards |
| Templates | 10, including epic, feature and story written to the deck's minimum detail |
| Worked cases | 2 end-to-end, carrying the artefacts each step produces |
| Capstone | 3 briefs, nine sections, per-section self-assessment against a five-part rubric |
| Practice contrasts | 17 pairs of what good looks like against what usually happens, each with a tell |
| Glossary | 59 terms, each attributed to where it comes from |
| DES field guide | Phases, principles, cadence, backlog fields and roles, for lookup at work |
| Course additions | The handful of places the course goes further than the briefing, and what the extra depth buys |
| Sources | 15 primary and authoritative references, all free to read and date-checked |

Also: a printable guide that reads as one continuous document, full-text search across the course *and* the deck, light and dark themes, keyboard-driven review, results charts, JSON backup and restore, and offline use as an installable app.

## Design decisions worth knowing

**Answer options are shuffled per learner.** The permutation is seeded from the question id plus a per-install salt, so it is stable for you across reloads but differs between people. Position carries no information; the QA suite asserts this statistically across 40 simulated learners.

**The diagnostic pool is separate** from the module quizzes and the mixed-practice pool, so a good diagnostic score means the ideas transfer rather than that you recognise the wording.

**Mastery states its rule plainly**: read the lesson, score at least 75% on the knowledge check, and answer both scenarios correctly. The stage footer reports how many attempts it took.

**The sidebar groups by activity, not by category.** Fourteen destinations plus nine stages was one flat list — 23 buttons, taller than any laptop viewport, with everything weighted equally. They are now four collapsible groups (Learn, Practise, Apply, Reference). *Results* sits under Practise because you read it after drilling, not with the reference material it superficially resembles. Apply and Reference start collapsed; navigating into a collapsed group opens it.

**The course goes further than the deck in a few places, and says where.** The deck is a briefing with one session to cover the whole field; this course has about eight hours, and spends some of it on depth a briefing has no room for. Those places are listed under **Course additions** — framed as what the extra depth buys rather than as corrections — so you always know which wording is the department's and which is the course's. Where the two genuinely disagree, the register defers to the deck.

**The deck ships with the app, and the two builds carry it differently.** The standalone HTML inlines all 98 slides as data URIs, because a single file that loses its images the first time it is emailed on is not a single file. The GitHub Pages build leaves them as separate lazy-loaded files, so a phone downloads a ~580 KB page and fetches only the slides actually opened. Both are asserted by the QA suite, because getting it backwards is invisible until someone is on mobile data.

## Development

Requires Node 18+.

```bash
npm install
npm run build      # writes the single-file HTML
npm run dev        # rebuild on change
npm run typecheck  # tsc --noEmit
npm run qa         # full verification suite (see below)
npm run verify     # typecheck + build + qa
```

Before the first QA run:

```bash
npx playwright install chromium
```

### Build

`scripts/build.mjs` uses esbuild to bundle `src/main.tsx` and inline the JS and CSS into `index.html`. It emits two things from one bundle:

1. **`Product-Management-Learning-System.html`** (~387 KB) — pure single file, zero external references.
2. **`docs/`** — the same app plus a web manifest, icons and a service worker, which is what GitHub Pages serves.

The PWA pieces are deliberately kept out of the standalone file: a service worker registration that can never succeed on `file://` would only log errors. The service worker's cache name is stamped with a hash of the built HTML, so each release invalidates the last.

### Deploying

Pages is configured to serve **`/docs` on `main`**. To publish an update:

```bash
npm run verify        # typecheck + build + 77 QA checks
git add -A && git commit -m "Update course"
git push
```

GitHub Pages redeploys within a minute or two. Installed home-screen copies pick up the new version the next time they are opened with signal.

### Re-importing the deck

`src/slides.ts` and `public/slides/` are generated. A normal build and a normal
checkout never need to regenerate them — the outputs are committed. If the
source deck changes:

```bash
apt-get install libreoffice poppler-utils
pip install python-pptx pillow
python3 scripts/import-slides.py path/to/deck.pptx
```

The script reads the stage-to-slide mapping straight out of `course.ts`, so the
two cannot drift apart. The QA suite then asserts that every slide the course
cites actually exists and that the stage ranges cover all 98 with no overlap.

### QA

`scripts/qa.mjs` runs 65 checks and writes `qa-report.json`. It is portable: Playwright and its bundled Chromium are resolved from `node_modules`, with no absolute paths.

It verifies:

- **Question-bank integrity** — option counts, unique ids, `optionNotes` alignment, diagnostic/practice pool separation, and that the correct answer's position is balanced across simulated learners
- **Scoring arithmetic** — answers are submitted, the reported score is compared against what was actually selected, and an all-correct retry must report 100%
- **Mastery gating** — a stage must not report mastered until all three requirements are met
- **Backup round trip** — export, wipe, restore, confirm mastery and drafts return; and that a malformed file is rejected rather than clearing progress
- **Accessibility** — axe-core against WCAG 2.1 A/AA on all twelve views plus dark theme and mobile; no serious or critical violations
- **Keyboard and focus** — the closed mobile drawer is `inert`, opening it moves focus in, Escape closes it and returns focus
- **Console hygiene** — no uncaught page or console errors

### Source layout

```
public/            Assets copied into docs/ at build time
  manifest.webmanifest
  sw.js            Offline service worker (version stamped at build)
  icon-*.png
  slides/          The 98 rendered deck slides (slide-01.webp ...)
docs/              Generated — the GitHub Pages build. Do not edit by hand.
src/
  course.ts        Nine stages: lessons, tables, questions, scenarios
  reference.ts     Flashcards, templates, capstone, field guide, divergences, diagnostic pool
  slides.ts        GENERATED by scripts/import-slides.py — deck metadata. Do not edit.
  lib.ts           Routing, local-time dates, guarded storage, seeded shuffle, spaced repetition
  state.ts         Progress types, storage hooks, mastery rules
  components.tsx   Shared UI: question cards, feedback, tables, source chips
  charts.tsx       Hand-rolled SVG charts, each with a visually-hidden data table
  illustrations.tsx  Original conceptual SVG diagrams, one per stage
  slide-viewer.tsx Slide lightbox and the citation controls that open it
  views-learn.tsx  Dashboard, learning path, stage view, diagnostic
  views-practice.tsx  Spaced review, mixed practice
  views-apply.tsx  Toolkit, capstone, worked cases, glossary, field guide
  views-results.tsx   Results charts
  views-guide.tsx  The full printable guide
  views-deck.tsx   The source deck browser
  views-meta.tsx   Search, sources, course additions, settings
  App.tsx          Shell, routing, state wiring, mobile drawer
  styles.css       Single stylesheet
```

## Provenance

The deck supplies the spine. Scrum definitions, SAFe prioritisation guidance and Australian Government standards are cited separately and are **not interchangeable** — in particular, epics, features and Program Increments are not Scrum terms, and the DES delivery phases (Pre-Approval, Pre-Delivery, Delivery, Closure) are not the DTA service phases (Discovery, Alpha, Beta, Live). The Sources page makes these boundaries explicit and carries a review date.
