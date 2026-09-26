# Repository agent instructions

## Verification model

This repository already has a comprehensive GitHub Actions workflow at `.github/workflows/verify.yml`. It installs dependencies and Chromium, then runs the complete `npm run verify` suite on pull requests and on pushes to `main`.

For Codex, ChatGPT and other coding agents:

1. During implementation, run only targeted checks needed to catch obvious local mistakes in the files being changed.
2. Prefer a feature/fix branch plus pull request rather than pushing substantive changes directly to `main`.
3. Let GitHub Actions perform the authoritative full verification suite for the proposed commit: TypeScript checks, learner build, authoring build, browser QA, isolated-export QA, authoring QA and release/tamper QA.
4. Do not automatically repeat the entire `npm run verify` suite locally before pushing when the same commit will immediately be verified by GitHub Actions.
5. If GitHub CI fails, inspect the failing job/QA report first. Reproduce only the relevant failing check locally unless broader reproduction is necessary.
6. Before merge, require the GitHub verification run for the current PR head commit to pass.
7. Manual or external evidence that cannot be proven by the automated suite remains manual; do not represent automated QA as complete organisational accessibility/device/production assurance.

The purpose is to move deterministic, repeatable compute to GitHub-hosted CI and reduce duplicated agent compute/context use without weakening the quality gate.

## Content and architecture controls

Read `AUTHORING.md` before changing course content and `STANDARDS.md` before writing or modifying assessment items. Read `ARCHITECTURE.md` before changing the player architecture.

Do not hand-edit generated `docs/` artefacts without rebuilding them from source. Preserve source provenance, package boundaries, trainer-facing repository documentation and the distinction between automated regression evidence and manual production-readiness evidence.


## Explicit fast mode

Default mode is the branch + pull-request workflow above.

If the user explicitly says `WORK.FAST`, asks to use the old/pre-CI-first working style, or explicitly asks to bypass the pull-request ceremony for that change, the agent may work directly on `main`.

In `WORK.FAST` mode:

1. Make only the requested change; do not broaden the scope.
2. Run the smallest targeted checks needed while editing.
3. Push directly to `main`.
4. Let the existing push-triggered `Verify learning system` workflow run the same full `npm run verify` suite that existed before this repository guidance was added.
5. If that post-push verification fails, inspect and fix the failure immediately rather than treating the push as complete.

This mode does not disable or weaken the existing verification workflow, generated-artifact rules, source/content controls, accessibility/browser QA, or Pages deployment. It restores the previous direct-to-main development path when the user explicitly chooses speed over the pre-merge PR gate.

Do not infer `WORK.FAST` from urgency or use it merely to bypass a failing check.
