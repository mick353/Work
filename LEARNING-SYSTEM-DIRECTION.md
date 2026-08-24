# Learning-system direction

The settled product direction for Product Practice. This records decisions, not the discussion that produced them.

## Destination

The intended destination is a training-managed learning product. Trainers should be able to create, review, transfer and export an individual course without writing code. A release custodian remains responsible for repository installation, managed web publication and the final release decision.

The source material and the learning platform remain distinct. A source author or governing document supplies subject matter; the package supplies the learning sequence, practice, feedback, applied work and learner experience. Attribution must preserve that distinction.

## Default delivery shape

One course per learner export is the default. A trainer can distribute one self-contained offline HTML file or request an individually hosted `training/<course-id>/` route. The combined catalogue remains a controlled demonstration and repository-managed surface, not the ordinary trainer delivery route.

Single-course output must therefore contain no package switcher, package-position count, empty library shell or assets/content from another course.

## Product boundary

- **Course Workshop** is the trainer application. It guides planning, authoring, source/media linkage, review, release declarations and output choice.
- **The exported course** is the learner application. It uses the shared player and contains no authoring or repository controls.
- **The repository tools** inspect an approved package, add it to the combined catalogue and/or create its managed individual route. They refuse overwrites and never commit or push.

Ordinary course content is package data. Views and learner mechanics remain shared code. New maintained courses require a package, an explicit versioned quality profile and catalogue registration; they do not require course-specific learner views.

## Release model

Automated checks establish structural, regression and selected authoring evidence. They do not establish factual correctness, teaching effectiveness, accessibility conformance or approval authority.

Every final Workshop release therefore requires:

- a clean package and **Available** status;
- named subject-matter/learning reviewer and accountable approver roles;
- audience/handling confirmation, approval scope, reference and date;
- SHA-256 binding between those declarations and the exact canonical package;
- independent repository inspection, full verification and deliberate publication.

Versioned release records and delivery archives are retained for comparison and rollback. When learner data meets a changed course version, the learner chooses whether to retain that course's work or start it fresh.

## Adoption path

The next product evidence is trainer use with real material: at least one short and one substantial course, on desktop and tablet. That work should test terminology, the strict authoring profile, draft transfer, media/storage limits, review responsibilities and the clarity of the three delivery routes. Applicable manual accessibility/device testing belongs in the same adoption phase.

Feedback that changes a settled boundary must be recorded in this file, [ROADMAP.md](ROADMAP.md), or the relevant contract document before implementation. Chat history is not a product decision record.

## Parked unless evidence changes the need

- arbitrary trainer-composed multi-course bundles;
- PowerPoint parsing beyond the supported PDF and ordered image route;
- accounts, login, analytics, telemetry or cloud synchronisation;
- browser-side GitHub publication;
- automatic merging of separately edited portable drafts.
