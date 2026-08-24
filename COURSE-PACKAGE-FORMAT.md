# Course package format

The current contract between course content, the shared player and the export pipeline. Read this before adding a course folder, changing package identity or building a trainer-facing authoring tool.

## 1. Boundary

A course is one `TrainingPackage`:

```text
TrainingPackage
├── manifest   identity, provenance, schema and course version
└── content    stages, assessment, practice, applied work, references and assets
```

The canonical TypeScript contract is `src/package-model.ts`. `src/package-validation.ts` checks the structure at runtime before the player starts. Curated repository courses use TypeScript, but the contract contains data only: no functions, React components or storage objects belong inside a package. Course Workshop emits the same boundary as JSON.

`schemaVersion` and `version` answer different questions:

- `schemaVersion` identifies the shape the player understands. It changes only when the package contract changes.
- `version` is the semantic version of one course's content. It changes when that course is released or revised.

Current package schema version 2 adds the course-owned `qualityProfile`. The profile travels with Workshop JSON and a generated repository package, so installing a new course does not require a hidden central QA entry.

## 2. Folder contract

Every course owns one source folder and one optional public-asset folder:

```text
src/courses/<course-id>/
  index.ts       manifest and complete TrainingPackage assembly
  course.ts      stages, lessons, questions, scenarios and sources
  reference.ts   cards, glossary, cases, capstone, toolkit and field guide
  slides.ts      optional generated slide metadata
  exemplar.ts    optional worked document
  releases/      Workshop-installed versioned release declarations

public/courses/<course-id>/
  slides/        optional slide-NN.webp assets
```

Files may be split further when a course becomes large, but no course may import content values from another course folder. Shared types and derivations belong in `package-model.ts` and `package-utils.ts`, not in whichever course happened to be authored first.

`index.ts` must:

1. assemble all content owned by the course;
2. derive stage minutes rather than accepting authored totals;
3. set `slideAssetBase` when slides exist;
4. export the package as both a named export and the default export.

The default export is what the selected-course build imports without needing course-specific code.

## 3. Identity and versioning

`manifest.id` is a lowercase URL-safe slug. It is also the storage namespace, asset namespace and export directory name. Treat it as permanent.

`manifest.version` uses semantic versioning:

- patch: corrections that do not change the curriculum or meaning of recorded progress;
- minor: additive lessons, practice or reference material that remains compatible with existing progress;
- major: a breaking curriculum change, such as replacing or re-identifying stages.

Changing `version` does not change the storage namespace. On first use of a changed or previously unrecorded version, the player explains the mismatch and asks the learner to **keep saved work** or **start this version fresh**. Starting fresh clears only that package's state; other courses and person-level settings remain. A new course id is still required when old and new curricula must coexist. Do not silently rename an id: existing browser progress would appear to vanish.

The repository holds one active version of each course. Isolated builds also retain `exports/<course-id>/releases/<version>/` delivery copies with a SHA-256 manifest, and a Workshop-installed course retains its release declaration under `src/courses/<course-id>/releases/<version>.json`. Signing releases or choosing among multiple live versions remains outside the current workflow.

## 4. Registration

`src/package-catalog.ts` is the combined catalogue. Register a course by importing its entry module and adding that package to `catalogPackages`.

The catalogue is validated before `trainingPackages` is exported. A package that has an unsupported schema, invalid semantic version, duplicate stage/source ids, missing source references, invalid assessment structure or an unsafe slide path fails before the learner UI renders.

Views never import a course folder. `src/content.ts` resolves the active package and exposes stable names to the shared player.

## 5. Assets, source references and cross-course keys

Curated repository courses may keep asset paths relative to `public/`; those paths must stay under the owning course's namespace. Their source decks are imported by a developer with:

```bash
python3 scripts/import-slides.py <course-id> path/to/deck.pptx
```

Slide data in a standalone export is keyed by the same relative path used by the web build, for example `courses/pm-fundamentals/slides/slide-01.webp`.

Course Workshop uses the same player through a different, self-contained asset route:

- `PackageContent.assets` contains PNG, JPEG or WebP data URLs only;
- `Module.visualAssetId` selects an embedded image for a stage;
- `Slide.assetId` selects an embedded source-slide image;
- `LessonSection.sourceReferences` and `FieldGuideEntry.sourceReferences` add human locators and optional slide numbers to an existing source id.

The runtime validator rejects unknown asset/source ids, duplicate slide numbers, unsafe filenames, unsupported/SVG media declarations, mismatched data-URL prefixes, image bytes that do not match the declared PNG/JPEG/WebP type, missing alternative text, missing cited slides and packages above the embedded-media limit. Source URLs must be credential-free HTTPS. An embedded package needs no public binary-asset folder: standalone, hosted and repository outputs carry the same canonical data and remain self-contained.

Allowed syntax is not source authority: a release custodian must still confirm that every HTTPS address is the intended governing or supporting source and that the package is suitable for its stated audience.

Stage ids only need to be unique inside one course. Shared-player mappings that sit outside a package must therefore use both identities. Curated illustrations are registered as `<package-id>:<stage-id>`; an authored `visualAssetId` takes precedence, and a course-neutral SVG remains the fallback.

## 6. Export modes

Combined development and published site:

```bash
npm run build
```

Outputs:

- `Product-Management-Learning-System.html`
- `Course-Authoring-Studio.html`
- `docs/`, including the learner home and `course-workshop/`

One course:

```bash
npm run export:course -- <course-id>
```

Outputs:

- `exports/<course-id>/<course-id>.html`
- `exports/<course-id>/site/`
- `exports/<course-id>/releases/<course-version>/` — exact standalone and site copies plus their hash manifest

All individual courses:

```bash
npm run export:all
```

The individual build replaces the catalogue during bundling, so the other courses are absent rather than hidden. It copies only the selected course's public assets. A one-course UI has no package switcher or package-position count, and the library route returns to the overview.

`exports/` is ignored by Git because it is generated delivery output. The combined root file and `docs/` remain committed because the root file is the shareable demonstration and GitHub Pages serves `docs/` directly.

An approved Course Workshop repository ZIP has two controlled repository routes:

```bash
npm run course:inspect -- path/to/course-package.zip
npm run course:install -- path/to/course-package.zip # combined catalogue
npm run course:host -- path/to/course-package.zip    # individual training/<id>/ page
```

`course:inspect` is read-only. `course:install` writes the package-owned source/assets and one catalogue entry. `course:host` writes only the route-owned learner page and release record under `public/training/<id>/`. The normal build copies that route to `docs/training/<id>/`. Both write commands refuse existing targets and never commit or push.

## 7. Verification contract

Run:

```bash
npm run verify
```

This includes:

- TypeScript checking;
- the combined build and its comprehensive browser/content suite;
- a clean selected-course build for every course folder;
- proof that each selected bundle and web folder excludes every other course;
- single-course route and chrome checks;
- accessibility checks on each isolated overview;
- course-scoped capstone download filename and heading checks;
- browser console and runtime error checks;
- Course Workshop output and release-gate checks;
- controlled inspect/install/host, tamper refusal and nested-route cache checks.

No documentation records a fixed total number of QA checks. The suite changes with the product; checks are identified by name and the generated `qa-report.json` records the combined result for a particular run.

## 8. Course Workshop boundary

`Course-Authoring-Studio.html` and `docs/course-workshop/index.html` are identical builds of the trainer tool. It emits this contract, calls the same structural validator and embeds the package in the existing single-course player. It does not introduce a second learner format.

The browser tool can produce a self-contained learner HTML file, an isolated hosted-course ZIP, an editable draft or a repository package ZIP. It cannot write into the repository. Final learner/repository outputs require a structurally clean package, **Available** status and the recorded subject-matter, learning-flow, audience/handling and release declarations.

The repository ZIP carries the intended `src/courses/<course-id>/` folder, canonical JSON, entry module, course-owned versioned release archive, hosted page, validation report and declared release record. `scripts/install-course-package.mjs` treats those records as untrusted input: it rejects unsafe paths or mismatched identities, recalculates structural and authoring checks, verifies that the release and validation records contain the SHA-256 digest of the exact canonical JSON, and refuses incomplete reviewer/approver identity, role, scope, reference or date before any write. The custodian still verifies the resulting Git diff and the authority behind the declarations.

The implemented authoring profile covers course identity and sources; stages and sourced lesson sections; questions, scenarios and assignments; diagnostics, review cards, glossary and contrasts; worked cases; toolkit templates; complete capstones; field-guide entries; explicit source differences; worked-document exemplars; precise source/slide references; PDF or ordered-image source-deck import; and course-owned stage visuals.

Course Workshop embeds every maintained catalogue course as a safe editable template during its build. A clone carries the complete course and its deck, then receives a new id/title, version `0.1.0`, Draft status and empty review/release state. The maintained original is not edited.

Asset-rich drafts use browser IndexedDB, with downloaded draft JSON as the portable source. Draft format version 2 records a stable draft id, revision, origin and timestamps with the package and release checklist. Version-1 drafts and raw packages are migrated with review/release evidence cleared. This supports checkpoint comparison and transfer, not shared editing or automatic merge. Final outputs still carry one course only. Arbitrary multi-course composition is not part of the current product boundary.

The remaining readiness work is external evidence: trainer observation with real course material, applicable manual accessibility/device testing and the genuine human review/approval evidence for each release. Direct PowerPoint parsing remains outside: save a deck as PDF or slide images for browser import.

See [COURSE-WORKSHOP.md](COURSE-WORKSHOP.md) for the tool workflow, validation boundary and distribution decision.
