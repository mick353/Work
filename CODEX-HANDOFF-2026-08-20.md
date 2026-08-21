# Codex handoff — 20 August 2026

Read this before changing the learning system. This release began from `main`
commit `28fc9a1f50568cd121befabe94c3cd71101390ec` and was published after a
read-only whole-site review followed by owner-authorised corrections.

## Subject-matter correction release — 20 August 2026

After the first release, the owner authorised a second, complete content audit
of both courses against the source pack in
`Z:\WORK\Imported _from_work_DOCS`, the course's own authority boundaries and
current primary guidance. The source documents and PowerPoint were used as
evidence and were not edited.

### Product Management corrections

- Reframed Discovery so candidate ideas and hypotheses may be explored while
  an idea remains unselected and unproven; removed the false implication that
  any candidate idea means Discovery has ended.
- Made leading and lagging indicators relational to a named outcome and time
  horizon. A completion metric is not inherently leading, and satisfaction is
  not inherently lagging.
- Distinguished Scrum's Product Owner accountability for Product Backlog
  management from the deck's local contribution and ordering model.
- Restored the source deck's minimum fields for epics, features and stories,
  including outcomes, measures, acceptance, scope, dependencies, sizing and
  delivery-system paths where applicable.
- Labelled the overlapping discovery/delivery cadence and “increment ahead”
  language as a local planning heuristic rather than a universal definition of
  continuous discovery.
- Restored all three Ways of Working foundations — Behaviours, the Digital
  Delivery Framework and Methods — and the four named DDF principles.
- Replaced questions that depended on remembering principle, phase or cadence
  numbers with applied decisions and evidence-based scenarios.

### Closure Reports corrections

- Recast benefits realisation as a whole-lifecycle process: some benefits may
  begin during delivery, while closure reports progress and transfers the
  remaining ownership, measurement, governance and corrective action.
- Distinguished what the departmental forms actually require from this
  course's stronger recommended benefit-accountability test. A named role-holder,
  recorded acceptance, influence and durable measurement are recommended
  practice unless local policy makes them mandatory.
- Corrected the internal PIR/Gateway relationship. There is no universal
  six-to-twelve-month rule for every PIR; the current Finance timing applies to
  the Gateway Benefits Realisation review.
- Corrected PPO and group-PMO language: the PPO receives and aggregates the
  report but does not approve it or review it for compliance; local group-PMO
  quality processes must be confirmed rather than invented or dismissed.
- Corrected annual-performance-statement audit language. The statements can be
  audited in the circumstances described by Finance; they are not automatically
  audited for every entity every year.
- Added Finance RMG 109 and AASB 138 as accounting authorities. Training and
  research/option-selection costs are expensed; qualifying development and
  post-go-live work require classification by nature and the applicable
  recognition tests.
- Made final-acceptance effects contract-specific. Warranty, retention,
  payment, title and defects consequences must be taken from the executed
  agreement and advice, not inferred from the Commonwealth Procurement Rules.
- Restored benefits to the six performance dimensions and changed a
  zero-rejection change register from “proof” of weak control to a signal that
  requires investigation of screening, withdrawals, completeness and challenge.
- Corrected the Tier 3 exemplar's stakeholder-engagement evidence and softened
  unsupported universal or cynical statements throughout the teaching.
- Replaced remaining gate-number and threshold-recall prompts with questions
  about purpose, current applicability, evidence and action.

Primary sources checked for this correction release:

- [Scrum Guide](https://scrumguides.org/scrum-guide.html)
- [Australian Government Architecture project closure reporting standard](https://architecture.digital.gov.au/standard/project-closure-reporting-standard-digital-and-ict-enabled-projects)
- [Digital Service Standard — services](https://www.digital.gov.au/policy/digital-experience/digital-service-standard/services)
- [Finance RMG 106](https://www.finance.gov.au/publications/resource-management-guides/guidance-assurance-reviews-process-rmg-106)
- [Finance RMG 109](https://www.finance.gov.au/publications/resource-management-guides/accounting-internally-developed-software-and-cloud-computing-arrangements-rmg-109)
- [Finance RMG 134](https://www.finance.gov.au/publications/resource-management-guides/annual-performance-statements-commonwealth-entities-rmg-134)
- [AASB 138 Intangible Assets](https://standards.aasb.gov.au/aasb-138-dec-2022)
- [Commonwealth Procurement Rules](https://www.finance.gov.au/government/procurement/commonwealth-procurement-rules)

Regression coverage now protects the authority-sensitive corrections, the
three Ways of Working foundations and the removal of principle-number recall,
in addition to the existing Gateway checks. The generated HTML and `docs/`
must continue to be produced by `npm run build`; do not hand-edit them.

Verification for this correction release:

- `npm run verify`: passed
- TypeScript and both production builds: passed
- Browser, content-integrity, interaction, responsive, print and accessibility
  suite: passed; use check names and the generated report rather than a fixed count
- Standalone and GitHub Pages builds: passed
- `npm audit --audit-level=moderate`: **0 vulnerabilities**

## Earlier corrections in this release line

### Gateway teaching and assessment

- Corrected the Australian Government Gateway sequence to the six project
  reviews numbered Gate 0 to Gate 5. The final project review is **Gate 5 —
  Benefits Realisation**; there is no Gate 6 in the current Finance process.
- Reworked the quiz, diagnostic, scenarios, flashcards and glossary so the
  learner retrieves the purpose of the Benefits Realisation review, the
  evidence it tests and the SRO's continuing accountability. Gate-number recall
  is explicitly not a learning objective.
- Kept the gate numbers in the field guide as reference information, with the
  current names and sequence. Corrected Gate 2 to **Delivery Strategy**.
- Distinguished the internal post-implementation review from the later Gateway
  Benefits Realisation review.
- Corrected the Commonwealth Procurement Rules link.
- Updated Closure Reports source currency to 20 August 2026.

Authoritative checks used:

- [Finance Assurance Reviews Process Overview](https://www.finance.gov.au/government/assurance-reviews-and-risk-assessment/assurance-reviews-process-overview)
- [Finance RMG 106](https://www.finance.gov.au/publications/resource-management-guides/guidance-assurance-reviews-process-rmg-106)
- [Current Commonwealth Procurement Rules](https://www.finance.gov.au/government/procurement/commonwealth-procurement-rules)

### Package boundaries and learner-facing copy

- Closure Reports now identifies its actual departmental spine: the DEWR full
  template, Tier 3 form, Project Closure Factsheet and closure announcement.
  DTA, Finance, ANAO, National Archives and UK Teal sources are labelled by
  their actual authority/comparator role.
- Removed inherited Scrum, SAFe, source-deck and Product Management wording from
  the Closure Sources and Toolkit views.
- Made the shared shell package-neutral: **Toolkit**, active curriculum arc,
  generic capability-chain title and package-aware browser/PWA title.
- Fixed the package switch so Closure Reports displays **2 of 2**, not 1 of 2.
- Fixed generated prompt labels such as “Your the closure assessment grid”.

### Governance, maintenance and release quality

- Expanded `NOTICE.md` and corrected `README.md` provenance and twelve-stage
  documentation.
- Added `.github/workflows/verify.yml` to run typecheck, build and Playwright QA
  on pushes to `main` and on pull requests.
- Upgraded esbuild from the vulnerable 0.24.x line to 0.28.2. `npm audit`
  reports zero known vulnerabilities.
- Added regression checks for the Gateway sequence, non-numeric assessment
  framing, package position, package-aware title and Closure provenance.
- Made the shuffled-question checks produce a stable check count and made axe
  scans wait for a stable reduced-motion state rather than sampling text during
  its opacity transition.
- Corrected all illustration text crowding found by the suite, at desktop and
  phone widths.

## Verification evidence

`npm run verify` passed on 20 August 2026:

- TypeScript: passed
- Standalone build: passed with all declared slides inlined
- GitHub Pages build: passed, 98 slides fetched on demand
- Browser QA: passed; the suite is identified by check names rather than a fixed total
- npm audit: **0 vulnerabilities**

The committed `Product-Management-Learning-System.html` and `docs/` outputs were
generated by that successful verification run. Do not hand-edit them.

## Deliberately not changed

- Branch protection was not enabled because that would change Claude's current
  direct-to-main working method. The verification workflow now supplies an
  independent result, but it is not a required check until the owner chooses to
  protect `main`.
- The public repository still contains rendered images of the internal Product
  Management deck. Code cannot establish permission to publish internal source
  material. `NOTICE.md` now records the need for the repository owner to confirm
  publication authority with the material owner; do not treat this as resolved
  merely because the build and tests pass.

## Continuation rule

Preserve the distinction between reference knowledge and assessed capability.
Numbers, labels and framework vocabulary may appear in a field guide, but an
assessment item should normally ask what decision is being made, what evidence
supports it, who is accountable, or how to act in a scenario. Do not restore a
question whose difficulty is simply remembering a gate number.
