# Roadmap

What is deliberately not built yet, and what it would take. Recorded so the reasoning does not have to be rediscovered.

Nothing here is in progress. Do not start any of it without asking.

---

## Self-service course authoring

**The goal.** A training team adds their own courses without needing the developer, and takes delivery of the result to run in-house — no repository, no build tooling, no hosting.

**Two artefacts, not one.** This split is the useful part of the design:

- **The authoring package**, which the training team keeps. Guidance, worked instructions, and per-part areas to type or upload each piece of a course, walking an author from an empty course to a complete one. It ends in an **Export training** action.
- **The exported course**, which learners receive. Authoring and admin functions stripped out entirely. This is essentially the standalone build that already exists.

So the learner-facing product does not change. The work is confined to a new layer that emits an artefact already being produced.

**Default delivery shape.** One course per export is the expected case. The current two-course build remains useful as a combined demonstration and development surface, but a future authoring flow should export one learner course unless the author deliberately chooses otherwise. A single-course export must show no library shell, package-position count or switcher chrome. Course assets, including imported slides, also need per-course containment rather than one flat numbering scheme.

**The delivery foundation now exists.** `npm run export:course -- <course-id>` produces a standalone HTML file and a web folder containing only the selected course. The catalogue is replaced at bundle time, assets live under `public/courses/<course-id>/`, and a one-course player omits the library and switcher. `npm run qa:exports` verifies that boundary for every course. The future editor should call this export path rather than invent another learner format.

**Interim before an editor.** Trial a structured course specification that a trainer can complete without code, with the quality rules expressed as instructions and self-checks, then convert that specification to `PackageContent`. This tests the authoring model and makes its quality controls human-readable before committing to an editor or runtime course format.

**The player and export boundary exist.** The single-file build is the in-house delivery mechanism — one HTML file, works offline, no hosting. `TrainingPackage` is a versioned, data-only shape proven across two structurally different courses, with runtime boundary validation. The remaining gap is trainer-facing authoring, validation feedback and non-developer asset import.

**What the work actually is, hardest first:**

1. **Quality control, not the editor.** The existing courses are good partly because `scripts/qa.mjs` enforces things an author will not think about — answer-length balance, the current four-option format, feedback on each option, an illustration per stage, valid slide citations, no heading that assumes what it teaches, and prose that opens on what good looks like. Self-authored courses will be measurably worse unless those rules move from a CI script into feedback the author sees while writing. **This is the piece that decides whether the idea is worth doing.**
2. **Trainer input must become validated package data.** Courses are compiled from TypeScript today. Self-service needs a form/specification that emits the existing `TrainingPackage` shape, plus an author-facing wrapper around the existing bundler so the trainer installs no development toolchain.
3. **Illustrations are React components keyed by package and module id.** The namespacing problem is solved, but a self-authored course still cannot ship custom React. It needs a picker over a generic diagram set, or image upload.
4. **Slides** are base64-inlined in the standalone build. A course with slides needs an import path that does not involve running a Python script.
5. **Define a minimum viable course.** Worked example, case studies, capstone rubric, field guide, glossary, contrasts and divergences are all optional. Decide what a course *must* have versus what it *may* have, or the authoring flow will overwhelm the first person who opens it.
6. **Version policy needs an author-facing workflow.** The package already carries semantic `version` metadata. The editor still needs release notes, migration choices for breaking curriculum changes, and a safe way to retain or deliberately reset learner progress.

---

## Cross-device progress

Progress is `localStorage`, so it is per-browser and per-device. A learner's phone and laptop keep separate records, and backup/restore JSON is the only bridge.

**If this is ever wanted:** keep `localStorage` as the source of truth and sync it to a backend in the background. The app keeps working offline, no read becomes asynchronous, and cross-device sync falls out of it. Fetching the profile on load is the expensive version — every read becomes async and the whole app inherits loading states and conflict handling.

---

## Accounts

There is no login, no account and no personal data anywhere in the system today, which is a feature: nothing to approve, nothing to protect, nothing to breach.

If registration is ever needed, prefer email one-time codes or magic links over passwords — more secure, and nothing to reset. Note that collecting email addresses means holding personal information, which is a materially different proposition from where this sits now.

**A static-site host is not a place to store user accounts.** A public repository would publish the data, a token shipped to the browser is readable by anyone, and static hosting runs no server-side code to check a credential against.

---

## Smaller things, unscheduled

- **Light theme** has had less scrutiny than dark. The tints were tuned by eye against dark first, and the one contrast fault that reached a user was light-theme only.
- **Two-column treatment** for the field guide, glossary and toolkit on wide screens — flagged, not done.
- **Versioned export archives.** Current exports replace `exports/<course-id>/`; a training-managed release workflow may also retain signed or dated copies for audit and rollback.
