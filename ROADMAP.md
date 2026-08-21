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

**Current authoring profile.** The complete package profile is editable: identity and sources; lesson stages; assessment, scenarios and assignments; diagnostics, cards, glossary and contrasts; worked cases; toolkit; capstone; field guide; source differences; worked-document exemplars; precise source/slide references; a PDF or image source deck; and course-owned stage visuals. Asset-rich drafts autosave in IndexedDB and remain portable as downloaded JSON. The Workshop provides live checks, preview, standalone learner export, a hosted-course ZIP and a controlled repository ZIP. The browser never writes into the repository. The Workshop itself is published under `course-workshop/` without user draft data.

**Safe reuse exists.** Every maintained catalogue course is embedded as an editable template. Cloning makes a separate Draft, resets identity/version/review/release state and preserves the complete content and deck. It never updates the released source course in place.

**Release authority remains human.** Final outputs require a clean encoded profile, **Available** status and a recorded subject-matter, course-flow, audience/handling and release checklist. These are declarations, not independent review evidence. A custodian still inspects the package/diff and runs full verification before publication.

**Remaining work, in priority order:**

1. **Trainer usability testing with real material.** Observe where field guidance, sequencing and terminology are unclear before expanding the form.
2. **Release history.** Add retained/datable release archives and release notes around the implemented approval record.
3. **Version migration.** Provide deliberate retain/reset choices when a curriculum revision breaks learner-progress compatibility.
4. **Direct office-file ingestion only if trainers need it.** Current browser import accepts PDF or PNG/JPEG/WebP. Do not add PowerPoint parsing merely for technical completeness.

Arbitrary multi-course bundle composition remains parked. One course per learner export is the agreed default; the combined catalogue remains a controlled repository release surface.

The detailed implemented boundary is in [COURSE-WORKSHOP.md](COURSE-WORKSHOP.md).

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
