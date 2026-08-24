# Course Workshop

The trainer-facing authoring tool for Product Practice courses.

- **Online:** <https://mick353.github.io/Work/course-workshop/>
- **From a copied repository:** open `Course-Authoring-Studio.html` in a modern browser.

Both are the same self-contained application. No account or application server is required for authoring. Drafts autosave to a Workshop-specific IndexedDB store in that browser, which has enough capacity for embedded decks and images, and are not uploaded by the application. Smaller drafts are also mirrored to the current Workshop v2 `localStorage` key as a fallback. Use **Save/share complete draft** to move work to another computer or retain a deliberate checkpoint.

The online Workshop is public, but it contains no draft or course content from its users. A course becomes public only when its approved output is deliberately added to a public repository or public host.

## Trainer workflow

The first page in the Workshop is the trainer instruction page. Before entering detailed content, use its five-part blueprint to agree the audience, final performance, evidence base, learning sequence and assessment approach. The controlled path is:

1. **Course setup** — record stable identity, ownership, version, status and governing sources.
2. **Teach** — write stages in learner order, with explanations, checks, scenarios, an assignment and precise source locators.
3. **Reinforce** — add a diagnostic, recall cards, glossary terms and observable practice contrasts.
4. **Apply and reference** — add the worked cases, toolkit, capstone, field guide, source differences and exemplars the course needs.
5. **Media and source deck** — import a PDF or ordered slide images, assign slides to stages, and add course-owned stage visuals with text alternatives.
6. **Review** — clear encoded checks and preview the course in the real learner player.
7. **Release** — record the subject-matter, learning-flow, audience/handling and release decisions; set the course status to **Available**; choose an output.

Status alone does not release a course. Final outputs unlock only when the course has no blocking content errors, the complete release checklist is recorded and status is **Available**. Preview and editable draft remain separate from release.

New courses begin with the content-review and source-checked dates blank. Enter those dates only after the corresponding review has actually occurred. The Review page groups issues by authoring step, filters blockers/warnings/notes, and sends each issue back to its relevant field with keyboard focus. Every step change starts at and focuses the new heading.

An existing browser may still contain a draft saved by an earlier Workshop build. Draft schema v2 preserves the course content but clears the old review date, source-checked dates, release declarations and **Available** status because the earlier format could not prove who confirmed them or when. The Workshop explains the migration and saves the upgraded draft under the current key. A raw released package loaded for editing is handled the same way: it becomes a fresh Draft that requires fresh review.

Each authoring step contains a concise **How this step connects** explanation. Course setup reports where every source is currently used; Teach reports the diagnostic, cards, glossary, contrast, cases and media connected to the active stage; Apply and reference explains the learner destination or stage/source relationship for every optional content type; Media shows the complete register → import → review → cite sequence. These are guidance and live summaries, not extra course fields.

The persistent draft header updates as the trainer works. A blank course shows **Duration pending** rather than presenting a false estimate; the derived minute estimate appears after lesson explanation content exists.

## Current authoring scope

The complete editable profile includes:

- course identity, ownership, semantic version and source register;
- ordered stages with outcomes, core ideas and sourced lesson sections;
- four-option questions with keyed answers, rationales and feedback for every distractor;
- applied decision scenarios;
- stage assignments with worked answers and review criteria;
- a separate diagnostic pool;
- definition, application and discrimination review cards;
- glossary terms and observable practice contrasts;
- worked cases, including stage-linked decisions, tempting alternatives, artefacts and teaching insights;
- toolkit templates with reusable prompts and worked examples;
- capstone briefs, production steps, completion checks and a rubric;
- field-guide entries with precise source and slide references;
- explicit source differences where the course deliberately explains or applies a source differently;
- complete worked documents and exemplars, including metadata, paragraphs, tables, artefact blocks and coaching notes;
- a complete source deck imported from PDF or ordered PNG/JPEG/WebP images;
- one optional PNG/JPEG/WebP visual per course stage, with required alternative text and optional caption/source;
- asset-capable local autosave, draft backup/restore, live checks and the shared learner preview.

This is the current strict authoring profile, not a universal claim that every valid learning intervention needs the same volume. The Workshop currently expects at least 300 body words, four knowledge questions, exactly two scenarios, the three review-card kinds, a glossary entry, a practice contrast and a substantial worked answer for each stage. Whether shorter course profiles should use different gates is a trainer-pilot decision recorded in [ROADMAP.md](ROADMAP.md).

Direct PowerPoint parsing is deliberately not built into the browser. Save the deck as PDF, or export its slides as PNG/JPEG/WebP, before import. SVG upload is excluded because the exported package treats media as inert images and does not accept script-capable image content.

## Starting from an existing course

The Workshop carries editable templates for every maintained course in the published catalogue. **Clone as new course** makes a deep local copy and preserves its lessons, assessments, advanced learning content and embedded source deck. It then:

- gives the copy a new course id and an “Adapted” title;
- resets its version to `0.1.0` and status to **Draft**;
- clears the course review date, every source checked date and every release declaration;
- leaves the published source course unchanged.

The trainer must give the adaptation its own permanent id, review its inherited and changed content, and make a fresh release decision. A clone is never an in-place update to an existing released course.

## Source attribution and deck links

The **Sources for this section** checkbox is meaningful even without a deck: it displays a source attribution chip under the lesson section. The adjacent fields make that attribution precise:

- **Page, section or locator** records human-readable detail such as `page 7`, `section 3.2` or `slides 12–14`.
- **Imported slide numbers** links that attribution to slide records in the course. In the learner player, the source chip becomes a button that opens the cited slide.

Field-guide entries use the same source-reference model. Source ids are renamed consistently across lessons, field-guide entries and course-owned media.

## Media handling

Imported media is resized to a maximum 1,600-pixel edge and embedded as validated image data inside the draft/package. This keeps tablet authoring, standalone learner HTML and repository transfer self-contained. Limits are 50 MB per selected source file, 150 PDF pages and 80 MB of embedded package data.

PDF import renders each page, extracts searchable text where available, and creates editable slide title, stage, text and alternative-text fields. Image import uses natural filename order. The Workshop recalculates each stage's slide range whenever slides are added, removed or reassigned.

Large decks are retained in full but their editors are displayed in batches of 20. This prevents a 98- or 150-slide source deck from rendering every editor at once. Template cloning displays progress, and asset-rich autosave is deferred briefly so it does not compete with the immediate interaction.

## Outputs and what happens next

### Editable draft JSON

The only re-editable Workshop source. It includes all course content, the current release checklist, imported slide images, stage visuals, image descriptions and source links. The Workshop shows its approximate backup size before download. It remains available even when incomplete and is not a learner course or repository package.

A trainer can send this JSON file to another trainer, who uses **Load draft** and continues from the same editable state. The receiving browser then keeps its own local autosave. This is a portable draft transfer, not live synchronisation: later changes made by the two trainers are separate and are not automatically merged. Draft schema v2 carries a stable draft id, revision, creation/export timestamps and clone/import origin. Two copies can therefore be identified and compared before one replaces the other, but the Workshop does not merge them automatically or infer which copy is authoritative.

For a PDF source deck, the JSON retains the Workshop's rendered slide images and extracted searchable text, not the original PDF file. Registered source records retain citation details and relationships; they do not contain copies of other source documents. Because the embedded media travels with the JSON, handle the draft according to the sensitivity of the course material.

### Standalone learner HTML

One self-contained, offline course. It uses the same shared player as Product Practice but has no authoring controls, catalogue, switcher or other course content. It can be emailed, copied to a shared drive or opened from a USB device. No repository action is required.

### Hosted-course ZIP

Contains only:

```text
<course-id>-hosted-course/
  index.html
  course-package.json
  README.md
  release-record.json
```

This is useful for a non-repository host. When this repository is the host, use the **repository package** and `course:host`; that preserves inspection and overwrite controls.

### Repository package ZIP

The controlled release package for adding the course to the combined catalogue, giving it an individual site address, or both:

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
    releases/<course-version>.json
  public/courses/<course-id>/
    README.md
```

Workshop-imported media is embedded in `course-package.json` and the generated learner page. The public asset folder is reserved for a future controlled external-asset route; it is not required for Workshop images or slides.

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

The automated profile checks package structure, source and slide links, asset type/safety/alternative text, lesson depth, assessment counts, distractor feedback, worked-answer depth, diagnostics, review-card kinds, glossary coverage, contrasts and the completeness of any case, toolkit, capstone, field-guide, divergence or exemplar added. Warnings identify omitted optional elements and detectable item risks.

Those checks do not establish factual correctness or teaching effectiveness. The release record captures declarations made by named reviewers and approvers; it is not independent review evidence. It records their roles, approval scope, reference and date, and its SHA-256 digest binds those declarations to the exact canonical `course-package.json`. The repository inspector recalculates that digest and refuses a detached or altered record. The custodian still reviews the installed Git diff because content binding does not establish that the underlying human review was competent or authorised.

Source links are trainer-authored package data. The package boundary accepts only credential-free HTTPS links; file, data, JavaScript and credential-bearing addresses are rejected. Embedded PNG/JPEG/WebP data must also carry matching binary signatures. A release custodian must still confirm that an allowed address is the correct, authorised source.

## Build and verification

```bash
npm run build:authoring   # writes the offline and docs/course-workshop copies
npm run verify:authoring  # typecheck, build and browser/output checks
npm run qa:release        # inspection, install, host, tamper and nested-cache checks
npm run verify            # the full learner, export, Workshop and release suite
```

The normal `npm run build` builds the learner site first and then writes the identical Workshop file to both `Course-Authoring-Studio.html` and `docs/course-workshop/index.html`. `docs/` is generated; do not edit its copies by hand.

## Remaining product work

The implemented controls and external evidence still required are maintained in [ROADMAP.md](ROADMAP.md). The code-level readiness items are implemented; what remains is observation with real trainers, manual accessibility/device work and genuine review/approval evidence for each release.

Arbitrary multi-course bundle composition is deliberately parked. One course per export remains the default delivery shape; the maintained combined catalogue remains a developer/release-custodian surface.
