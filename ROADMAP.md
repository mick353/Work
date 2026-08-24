# Roadmap

The implemented product boundary and the remaining work. New work still requires an explicit decision; this file records the current destination without relying on chat history.

---

## Self-service course authoring

**The goal.** A training team authors and reviews its own courses without needing a developer for ordinary content work. It can distribute one offline learner file directly; a release custodian uses the copied repository only when a course must join the catalogue or receive a managed web address.

**Two artefacts, not one.** This split is the useful part of the design:

- **Course Workshop**, available from the copied repository and its separate Pages address. It guides the author through the course, live checks, human release record and delivery choice.
- **The exported course**, which learners receive. Authoring and admin functions stripped out entirely. This is essentially the standalone build that already exists.

The learner-facing product does not change. Course Workshop embeds the existing single-course player and inserts validated package data into it.

**Default delivery shape.** One course per export is the expected case. The current two-course build remains the combined demonstration and development surface. Course Workshop exports one learner course with no library shell, package-position count or switcher chrome.

**The delivery foundation exists.** `npm run export:course -- <course-id>` produces a standalone HTML file and a web folder containing only a selected repository course. Course Workshop uses the same player for browser-generated courses. Its repository package can be inspected, added to the combined catalogue and/or installed as an individual `training/<course-id>/` route through overwrite-safe commands. The export, authoring and release suites verify these paths.

**Current authoring profile.** The complete package profile is editable: identity and sources; lesson stages; assessment, scenarios and assignments; diagnostics, cards, glossary and contrasts; worked cases; toolkit; capstone; field guide; source differences; worked-document exemplars; precise source/slide references; a PDF or image source deck; and course-owned stage visuals. The Workshop includes a five-part planning blueprint, point-of-authoring examples, cross-step connection guidance, live source-usage summaries and active-stage linkage summaries. Newly created and cloned courses begin with review evidence blank; checks are grouped/filterable and navigate to the relevant focused field; step changes reset position/focus. Large decks render in batches with visible clone progress. Asset-rich drafts autosave in IndexedDB and remain portable as downloaded JSON. A transferred draft is a complete copy, not shared editing or automatic merge. The Workshop provides live checks, preview, standalone learner export, a hosted-course ZIP and a controlled repository ZIP. The browser never writes into the repository. The Workshop itself is published under `course-workshop/` without user draft data.

**Safe reuse exists.** Every maintained catalogue course is embedded as an editable template. Cloning makes a separate Draft, resets identity/version/review/release state and preserves the complete content and deck. It never updates the released source course in place.

**Release authority remains human.** Final outputs require a clean encoded profile, **Available** status and a recorded subject-matter, course-flow, audience/handling and release checklist. These are declarations, not independent review evidence. A custodian still inspects the package/diff and runs full verification before publication.

**Implemented readiness controls:**

- Draft schema v2 gives a portable draft a stable id, revision, creation/export timestamps and clone/import origin. Version-1 drafts and raw released packages are migrated into Draft status with review dates, source-checked dates and release declarations cleared.
- Final releases require named reviewer and approver roles, approval scope, reference and date. Source links are restricted to credential-free HTTPS, embedded image bytes are checked against their declared type, and both the release record and validation report carry the SHA-256 digest of the exact canonical package JSON.
- Every maintained catalogue course has an explicit versioned quality profile in `src/course-quality-profiles.ts`. The catalogue suite applies the declared depth, assessment, worked-reasoning, assignment and case floors to each course. `qa-report.json` separates observations from failure messages.
- Individual exports retain `releases/<course-version>/` copies of both delivery forms with a hash manifest. Workshop-installed courses retain the exact release record under `src/courses/<id>/releases/<version>.json`.
- When stored learner work belongs to a different or previously unrecorded course version, the player asks whether to keep it or start that course fresh. It never silently resets another course or person-level settings.
- The self-contained Workshop has a 12 MB build budget. Exceeding it blocks the build and forces a deliberate decision about embedded templates/media.

**External evidence still required before calling the authoring product organisationally production-ready:**

1. Observe trainers building a short and a substantial real course on desktop and tablet. Test terminology, draft transfer, storage limits, release responsibilities and whether the current strict profile suits the training team's actual course types.
2. Complete applicable manual keyboard, screen-reader, zoom, text-spacing, forced-colour, touch and print testing with people and real devices. Automated checks are regression evidence, not accessibility certification.
3. For every released course, retain the real subject-matter, learning-flow, handling and approval evidence named in its release record. The software can bind declarations to content; it cannot manufacture the underlying review.

**Deliberately parked:** direct PowerPoint parsing remains out unless trainers demonstrate a need; PDF and ordered PNG/JPEG/WebP import are the supported browser route. Arbitrary multi-course bundle composition also remains parked.

Arbitrary multi-course bundle composition remains parked. One course per learner export is the agreed default; the combined catalogue remains a controlled repository release surface.

The detailed implemented boundary is in [COURSE-WORKSHOP.md](COURSE-WORKSHOP.md).

---

## Cross-device progress

Progress is `localStorage`, so it is per-browser and per-device. A learner's phone and laptop keep separate records, and backup/restore JSON is the only bridge.

**If this is ever wanted:** keep `localStorage` as the source of truth and sync it to a backend in the background. The app keeps working offline, no read becomes asynchronous, and cross-device sync falls out of it. Fetching the profile on load is the expensive version — every read becomes async and the whole app inherits loading states and conflict handling.

---

## Accounts

There is no login, account, application backend, telemetry or central user-data collection today. Learner answers and trainer drafts remain in the browser unless a person downloads or distributes them. Those local files can still contain personal, sensitive or internal information and must be handled according to their content; “local only” does not mean “no data to protect.”

If registration is ever needed, prefer email one-time codes or magic links over passwords — more secure, and nothing to reset. Note that collecting email addresses means holding personal information, which is a materially different proposition from where this sits now.

**A static-site host is not a place to store user accounts.** A public repository would publish the data, a token shipped to the browser is readable by anyone, and static hosting runs no server-side code to check a credential against.

---

## Smaller things, unscheduled

- **Manual light-theme review.** Automated contrast and accessibility checks exercise all stage pages in both themes; human/device review remains part of the external testing above.
- **Two-column treatment** for the field guide, glossary and toolkit on wide screens — flagged, not done.
- **Diagnostic presentation.** The current all-at-once diagnostic works and is accessible to automated checks, but a paged or one-question-at-a-time mode may reduce mobile and cognitive load.
- **Catalogue decision information.** Course cards currently emphasise volume. Audience, prerequisite, difficulty, outcome, owner and currency would be more useful selection information as the catalogue grows.
