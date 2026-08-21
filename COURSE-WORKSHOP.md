# Course Workshop

The trainer-facing authoring tool for Product Practice courses.

- **Online:** <https://mick353.github.io/Work/course-workshop/>
- **From a copied repository:** open `Course-Authoring-Studio.html` in a modern browser.

Both are the same self-contained application. No account or server is required for authoring. Drafts autosave under a Workshop-specific key in that browser and are not uploaded. Use **Download draft** to move work to another computer or retain a deliberate backup.

The online Workshop is public, but it contains no draft or course content from its users. A course becomes public only when its approved output is deliberately added to a public repository or public host.

## Trainer workflow

The first page in the Workshop is the trainer instruction page. The controlled path is:

1. **Course setup** — record stable identity, ownership, version, status and governing sources.
2. **Teach** — write stages in learner order, with explanations, checks, scenarios and an assignment.
3. **Reinforce** — add a diagnostic, recall cards, glossary terms and observable practice contrasts.
4. **Review** — clear encoded checks and preview the course in the real learner player.
5. **Release** — record the subject-matter, learning-flow, audience/handling and release decisions; set the course status to **Available**; choose an output.

Status alone does not release a course. Final outputs unlock only when the course has no blocking content errors, the complete release checklist is recorded and status is **Available**. Preview and editable draft remain separate from release.

## Current authoring scope

The core profile includes:

- course identity, ownership, semantic version and source register;
- ordered stages with outcomes, core ideas and sourced lesson sections;
- four-option questions with keyed answers, rationales and feedback for every distractor;
- applied decision scenarios;
- stage assignments with worked answers and review criteria;
- a separate diagnostic pool;
- definition, application and discrimination review cards;
- glossary terms and observable practice contrasts;
- local autosave, draft backup/restore, live checks and the shared learner preview.

Worked cases, capstone, field guide, toolkit templates, divergences, worked documents and image/slide import remain outside the browser editor. They stay optional in the package contract and are reported honestly as warnings or notes rather than invented.

## Outputs and what happens next

### Editable draft JSON

The only re-editable Workshop source. It includes the current release checklist and is available even when incomplete. It is not a learner course and cannot be installed into the repository.

### Standalone learner HTML

One self-contained, offline course. It uses the same shared player as Product Practice but has no authoring controls, catalogue, switcher or other course content. It can be emailed, copied to a shared drive or opened from a USB device. No repository action is required.

### Hosted-course ZIP

Contains only:

```text
<course-id>-hosted-course/
  index.html
  README.md
  release-record.json
```

This is useful for a non-repository host. When this repository is the host, use the **repository package** and `course:host`; that preserves inspection and overwrite controls.

### Repository package ZIP

The controlled handoff for adding the course to the combined catalogue, giving it an individual site address, or both:

```text
<course-id>-course-package/
  README.md
  course-package.json
  release-record.json
  validation-report.json
  CATALOGUE-ENTRY.txt
  hosted/
    index.html
  src/courses/<course-id>/
    course-package.json
    index.ts
  public/courses/<course-id>/
    README.md
```

The ZIP never installs, commits or publishes itself.

## Releasing from a copied repository

Install Node.js once, open a terminal in the repository and run `npm install`. Inspect every package before choosing a route:

```bash
npm run course:inspect -- path/to/<course-id>-course-package.zip
```

Then choose one or both:

```bash
# Add it to the combined Product Practice course catalogue
npm run course:install -- path/to/<course-id>-course-package.zip

# Give it its own /training/<course-id>/ page without adding it to the catalogue
npm run course:host -- path/to/<course-id>-course-package.zip
```

`course:install` creates `src/courses/<course-id>/`, creates the matching course-owned public asset folder and adds one import/entry to `src/package-catalog.ts`.

`course:host` creates `public/training/<course-id>/index.html` and its release record. The normal build copies it to `docs/training/<course-id>/`, so after publication its GitHub Pages address is:

```text
https://mick353.github.io/Work/training/<course-id>/
```

Both commands reject unsafe ZIP paths, identity mismatches, structural or authoring errors, incomplete release records and existing target folders. They recalculate the local checks instead of trusting the exported report. They do not run Git and never overwrite an existing released course.

After either route:

```bash
npm run verify
git status --short
git diff
```

A release custodian reviews the course and exact diff, commits the intended files and pushes deliberately. If the repository has no remote or is kept offline, the combined and individual HTML outputs still work locally; online publication simply does not occur.

## Validation and authority boundary

The automated profile checks package structure, source links, lesson depth, assessment counts, distractor feedback, worked-answer depth, diagnostics, review-card kinds, glossary coverage and contrasts. Warnings identify optional elements and detectable item risks.

Those checks do not establish factual correctness or teaching effectiveness. The release record captures declarations made by reviewers; it is not independent review evidence. Release still requires an accountable person to verify the subject matter, read the course in learner order, confirm audience/handling and approve the exact version.

## Build and verification

```bash
npm run build:authoring   # writes the offline and docs/course-workshop copies
npm run verify:authoring  # typecheck, build and browser/output checks
npm run qa:release        # inspection, install, host, tamper and nested-cache checks
npm run verify            # the full learner, export, Workshop and release suite
```

The normal `npm run build` builds the learner site first and then writes the identical Workshop file to both `Course-Authoring-Studio.html` and `docs/course-workshop/index.html`. `docs/` is generated; do not edit its copies by hand.

## Remaining product work

- trainer usability testing with real material;
- optional advanced-element editors;
- browser-based image and slide import within the course namespace;
- retained/datable release archives and release notes;
- explicit migration choices when a breaking revision changes learner progress.
