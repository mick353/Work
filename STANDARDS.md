# Standards

The measurable definitions [AUTHORING.md](AUTHORING.md) refers to. A rule has one of three scopes:

- **Shared contract** — applies to every `TrainingPackage` and is enforced by runtime/package validation or a catalogue-wide check.
- **Workshop release profile** — applies to courses exported through Course Workshop and is enforced by `authoring/quality.ts` and recalculated by the repository inspector.
- **Course-specific regression** — protects a deliberate property of a maintained course. It must name that course or its declared profile; it is not automatically a universal teaching law.

Run `npm run verify` for the complete current evidence. `npm run qa` is the combined learner suite, but it does not by itself run every Workshop, release and isolated-export check. Where documentation and implementation disagree, treat the disagreement as a defect to resolve rather than silently declaring either source authoritative.

---

## 1. Assessment items

| Rule | Threshold | Why it exists |
|---|---|---|
| Options per question | Exactly 4 | Current player and QA contract; a consistent format and chance baseline, not a universal item-writing law |
| "Always click the longest option" strategy | Scores **≤ 40%** | Chance is 25% and the mastery threshold is 75%. Above 40% the strategy starts to substitute for knowing the material |
| Correct-answer-longest rate | Target **under 30%** when measuring a batch | Chance is 25% |
| Mean key/distractor length ratio | Target **under 1.20** | |
| `optionNotes` | 4 entries; the key's is `""` | Per-option feedback on the option the learner chose |
| Answer position | Permuted per learner | Seeded from question id + per-install salt; asserted statistically across simulated learners |
| Question ids | Unique across the package | |
| Diagnostic coverage | Every stage has ≥ 1 item | The diagnostic draws one per stage |
| Pool separation | Diagnostic ≠ practice ≠ module questions | A good diagnostic score should mean transfer, not recognition |

**Measure after every batch you write.** The correct answer is the one you thought hardest about, which is why it comes out longest without anyone intending it.

---

## 2. Assessment behaviour

| Property | Rule |
|---|---|
| Stage quiz | Fresh sample of 5 from the stage's pool per attempt |
| Mixed practice | 10 drawn **round-robin across stages** — never a flat shuffle |
| Flashcard review | Scheduled by SM-2, not sampled |
| Mastery | Lesson marked read **and** ≥ 75% on the knowledge check **and** every scenario correct |
| Failed check | Names the sections the missed questions came from |
| Error-driven recall | A wrong answer brings forward cards covering it — moves the **due date only**, never ease or lapse count |

---

## 3. Content depth and course profiles

The current Workshop release gate is intentionally strict enough to reject a stub, but it is not evidence that every valid short course needs the same amount of content.

| Scope | Encoded rule |
|---|---|
| Workshop release profile | At least 300 lesson-body words per stage |
| Workshop release profile | At least 4 knowledge questions and exactly 2 scenarios per stage |
| Workshop release profile | At least 1 diagnostic question per stage |
| Workshop release profile | Definition, application and discrimination review cards per stage |
| Workshop release profile | At least 1 complete glossary entry and 1 observable practice contrast per stage |
| Workshop release profile | Stage assignment with a worked answer of at least 100 words and at least 2 review criteria |
| Workshop release profile | Cases, capstone, field guide and exemplars may be omitted; partially authored optional content becomes blocking |
| Product Management profile v1 | 9 stages; at least 8,000 teaching words; 300 body words per stage; 4 questions and 2 scenarios per stage; 100-word/4-criterion worked assignments; 9 substantial worked-reasoning passages; case steps covering all 9 stages |
| Closure Reports profile v1 | 12 stages; at least 12,500 teaching words; 300 body words per stage; 4 questions and 2 scenarios per stage; 100-word/3-criterion worked assignments; 5 substantial worked-reasoning passages; case steps covering at least 8 stages |
| Learner behaviour | A capstone response needs 60 words before it counts as completed |

The exact catalogue profiles live in `src/course-quality-profiles.ts`; `scripts/qa.mjs` fails if a maintained course has no current profile. These floors prevent reviewed depth and applied practice from silently disappearing. They are regression evidence, not proof that word count causes learning or that one profile suits every future course.

Stage `minutes` are **derived** from word count at 220 wpm plus 1 minute per question and 2 per scenario. Never type them as release evidence.

---

## 4. Language

The general language rules apply across courses. The approximate positive-opener percentage is presently a Product Management regression and an authoring target for other packages, not a catalogue-wide measured result.

| Rule | Target |
|---|---|
| Section openers stating the positive first | ~90% |
| Headings | Name the capability, not the jargon. A heading must be meaningful to someone who has never heard the term |
| Development history in learner text | None. No version notes, no "an earlier version", no commentary on colleagues' work |
| Singular counts | Never followed by a plural noun — "1 day", not "1 days" |
| Completion record | States it is self-recorded, not a credential. A check fails if the wording drifts |
| Course name, stage count, publisher, tagline | Never hardcoded in a view — always from the manifest |
| Credit | The source author is credited for the source. Package authorship is carried by the wording "built from", not a second name |

Contrastive definition — "an ownership model, not merely software" — states the positive first and is good teaching. The rule is not a ban on the word "not".

---

## 5. Layout and typography

| Measure | Bound |
|---|---|
| Line length | **45–80 characters** at every width; longest measured must be ≤ 80 |
| Prose measure | `--measure: 58ch`, applied to running text only |
| Tables and artefacts | Deliberately break out of the measure — a table is scanned, not read |
| Horizontal overflow | None at every exercised width |
| Combined learner widths checked | 390, 768, 1100, 1440, 1920 px |
| Workshop phone-width check | 390 px |

**`grid-template-columns: 1fr` means `minmax(auto, 1fr)`, and `auto` will not shrink below its content.** Any track that might hold a `<pre>`, a table or a long token needs `minmax(0, 1fr)`.

---

## 6. Illustrations

| Rule | Bound |
|---|---|
| Coverage | Every maintained stage renders a meaningful course illustration or an explicitly accepted course-neutral fallback; curated mappings use `<packageId>:<stageId>` |
| Label collision | None — no text overlaps other text |
| Frame spill | None — no text outside the SVG box |
| Leading between stacked labels | **≥ 4 user units** |
| Minimum label size | 12px |
| Colour | All from `var(--stage)`, so the diagram recolours per stage |
| Gradient and filter ids | Namespaced per instance — duplicate SVG ids cross-wire fills between diagrams |

SVG text does not wrap or reflow. Position labels in **fixed columns**. A label positioned from a variable — a bar width, an end anchor — collides the moment the string grows.

---

## 7. Accessibility

The product design target is **WCAG 2.2 Level AA**. Automated tooling is one part of the evidence: axe-core currently supplies tagged WCAG 2.0/2.1 A/AA rules, while the project adds explicit checks for relevant WCAG 2.2 behaviours and still requires manual review.

| Check | Requirement |
|---|---|
| Automated accessibility scan | Zero serious or critical axe violations from the supported rules tagged WCAG 2.0/2.1 A/AA, across the views, themes and brand modes exercised by the suite |
| Text contrast | 4.5:1 normal, 3:1 large — checked on **every stage page**, both themes and every supported brand mode |
| Target size | Project rule: every measured button and link is at least 24 × 24 CSS pixels. This is deliberately stricter than [WCAG 2.2 SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), which also permits spacing and four other exceptions |
| Keyboard | Closed mobile drawer is `inert`; opening moves focus in; Escape closes and returns focus |
| Reduced motion | Project usability rule: every animation off under `prefers-reduced-motion`, including JavaScript `scrollIntoView` |
| Disabled states | Project design rule: use explicit colour tokens rather than blanket opacity, so the composited result remains predictable and testable |

The automated scan and the project-specific checks are regression gates, not a claim of complete WCAG conformance. Accessibility also requires applicable manual testing and review of axe results outside the serious/critical impact filter.

`--stage-N` is a bright **fill**. `--accent-N` aliases `--stage-N-ink`, a darker variant, used for **text**. They are not interchangeable.

---

## 8. Build and delivery

| Artefact | Property |
|---|---|
| `Product-Management-Learning-System.html` | Single file, zero external references, all slides inlined as data URIs |
| `docs/` | Pages build; slides as separate lazy-loaded files; service worker; web manifest |
| `exports/<course-id>/<course-id>.html` | Contains exactly one course; its slides are inlined; no library/switcher chrome |
| `exports/<course-id>/site/` | Contains exactly one course and only that course's public asset folder |
| `exports/<course-id>/releases/<version>/` | Exact standalone/site copies plus a SHA-256 release manifest |
| `Course-Authoring-Studio.html` | Self-contained; no network request while authoring; byte-identical to `docs/course-workshop/index.html` |
| Workshop course output | Exactly one course; advanced content and embedded media preserved; no authoring or package-switcher chrome |
| Workshop media | PNG/JPEG/WebP only; declared type and binary signature must match; 50 MB per selected source, 150 PDF pages, 1,600 px maximum edge, 80 MB embedded-data ceiling, alternative text required |
| Workshop source URL | Credential-free HTTPS direct to substantive public content; database/index records such as PubMed and blog-only commentary are blocked; a human still checks authority, claim support, currency, jurisdiction and teaching value |
| Workshop release record | Named reviewer/approver roles and scope; SHA-256 bound to exact canonical package JSON; retained under the installed course version |
| Pages size budget | `500 KB + 32 KB per stage` — scales with content, so ordinary authoring does not fail it |
| Workshop size budget | 12 MB self-contained build ceiling; crossing it requires an explicit template/media architecture decision |
| Service worker cache | Stamped with a hash of the built HTML |
| Console | Zero uncaught page or console errors across every view |

`docs/` is generated and committed because Pages serves it directly. `exports/` is generated and ignored; it is a delivery output, not repository source. `npm run qa:exports` rebuilds every individual export and verifies content/asset isolation, single-course navigation, accessibility and capstone export identity.

---

## 9. State and storage

| Scope | Key shape |
|---|---|
| Per package | `product-practice-v2:<packageId>:<key>` — progress, reviews, drafts, study days, item stats |
| Per person | `product-practice-v2:<key>` — theme, shuffle salt, sidebar state, active package |
| Course Workshop | IndexedDB `product-practice-course-workshop` / `drafts` / `current`; smaller drafts may also use `product-practice:course-workshop:draft-v2` |

| Property | Rule |
|---|---|
| Backup filename | `pp-<packageId>-<YYYY-MM-DD>-<HHMM>[-before-reset].json`, local time |
| Backup contents | Progress, drafts, review scheduling — round-trips through wipe and restore |
| Malformed backup | Rejected; must not clear existing progress |
| Reset | Backup is offered and optional; clearing the option warns that nothing will be saved |
| Package switch | Full page reload — storage keys are namespaced and a reload re-reads all of them |
| Curriculum version change | Explain the previous/current version and require a keep-or-reset choice; reset only that package namespace |
| Study day | Record only after a meaningful learner action, never from a page visit |
| Fresh review card | Eligible after its owning lesson is marked read; previously scheduled cards remain eligible |

New and cloned Workshop drafts begin with review evidence blank. A blank review date does not block ordinary drafting; it blocks release when status is **Available**. Draft schema v2 adds stable id, revision, origin and timestamps. Version-1 drafts and raw released packages are preserved as editable content but migrated to Draft status with review dates, source checks and release declarations cleared.

---

## 10. Rules for the check suite itself

1. **Test through the control the user touches.** Seeding `localStorage` and reloading proves the content layer resolved and nothing else. A broken package switch shipped because it was verified that way.
2. **After writing a check, break the thing and confirm the check fails.** A check that has never failed has never been tested.
3. **Check the content, not just the geometry.** A print check that measures overflow and never reads the page will pass while the table of contents is empty.
4. **Run shared claims against every package and every applicable theme.** If a check intentionally protects one course, name the course/profile in the check and documentation; do not report it as catalogue-wide evidence.
5. **Budgets scale with content.** A fixed ceiling that has to be raised on every addition asserts nothing.

Use `qa-report.json` for the exact combined-suite result and the console/output of the other verification scripts for their results. Report format v2 records `observation` for measured context and leaves `failureMessage` empty on passing rows. Investigate missing or changed checks by name rather than maintaining a hard-coded expected total in documentation.
