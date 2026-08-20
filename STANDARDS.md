# Standards

The measurable definitions [AUTHORING.md](AUTHORING.md) refers to. Every figure here is enforced by a check in `scripts/qa.mjs` unless marked otherwise. Where this document and the suite disagree, the suite is correct and this document is out of date — fix it.

Run the suite with `npm run qa`. It takes two to three minutes and runs against the built artefact in a real browser.

---

## 1. Assessment items

| Rule | Threshold | Why it exists |
|---|---|---|
| Options per question | Exactly 4 | Four is the minimum that makes a 75% mastery threshold meaningful |
| "Always click the longest option" strategy | Scores **≤ 40%** | At one point the key was the longest option in 129 of 158 questions, so that strategy scored 81.6% against a 75% pass mark |
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

## 3. Content volume

| Measure | Minimum |
|---|---|
| Lesson prose across the package | 8,000 words |
| Body words per stage | No stage may be a stub |
| Worked-reasoning passage per stage | 1, and substantial |
| Flashcards per stage | 5 |
| Flashcard kinds present | definition, application, discrimination — 5+ of each across the package |
| Worked cases | 4 for a full package; every stage appears in at least one |
| Worked answer per stage assignment | Present, with self-check criteria |
| Capstone response | 60 words minimum before it counts |

Stage `minutes` are **derived** from word count at 220 wpm plus 1 minute per question and 2 per scenario. Never typed.

---

## 4. Language

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
| Horizontal overflow | None from 320 px to 2560 px |
| Widths checked | 390, 768, 1100, 1440, 1920 |

**`grid-template-columns: 1fr` means `minmax(auto, 1fr)`, and `auto` will not shrink below its content.** Any track that might hold a `<pre>`, a table or a long token needs `minmax(0, 1fr)`.

---

## 6. Illustrations

| Rule | Bound |
|---|---|
| Coverage | Every stage has one, registered under its stage id |
| Label collision | None — no text overlaps other text |
| Frame spill | None — no text outside the SVG box |
| Leading between stacked labels | **≥ 4 user units** |
| Minimum label size | 12px |
| Colour | All from `var(--stage)`, so the diagram recolours per stage |
| Gradient and filter ids | Namespaced per instance — duplicate SVG ids cross-wire fills between diagrams |

SVG text does not wrap or reflow. Position labels in **fixed columns**. A label positioned from a variable — a bar width, an end anchor — collides the moment the string grows.

---

## 7. Accessibility

| Standard | Requirement |
|---|---|
| WCAG 2.1 A/AA | Zero serious or critical axe violations, every view, both packages, both themes |
| Text contrast | 4.5:1 normal, 3:1 large — checked on **every stage page**, both themes |
| Target size (SC 2.5.8) | 24 × 24 CSS pixels minimum |
| Keyboard | Closed mobile drawer is `inert`; opening moves focus in; Escape closes and returns focus |
| Reduced motion | Every animation off under `prefers-reduced-motion`, including JavaScript `scrollIntoView` |
| Disabled states | Real colour tokens, never `opacity` — `opacity` composites the element *and* its background toward the page |

`--stage-N` is a bright **fill**. `--accent-N` aliases `--stage-N-ink`, a darker variant, used for **text**. They are not interchangeable.

---

## 8. Build and delivery

| Artefact | Property |
|---|---|
| `Product-Management-Learning-System.html` | Single file, zero external references, all slides inlined as data URIs |
| `docs/` | Pages build; slides as separate lazy-loaded files; service worker; web manifest |
| Pages size budget | `500 KB + 30 KB per stage` — scales with content, so ordinary authoring does not fail it |
| Service worker cache | Stamped with a hash of the built HTML |
| Console | Zero uncaught page or console errors across every view |

`docs/` is generated and committed because Pages serves it directly. Committing source without rebuilding means the live site does not match the code.

---

## 9. State and storage

| Scope | Key shape |
|---|---|
| Per package | `product-practice-v2:<packageId>:<key>` — progress, reviews, drafts, study days, item stats |
| Per person | `product-practice-v2:<key>` — theme, shuffle salt, sidebar state, active package |

| Property | Rule |
|---|---|
| Backup filename | `pp-<packageId>-<YYYY-MM-DD>-<HHMM>[-before-reset].json`, local time |
| Backup contents | Progress, drafts, review scheduling — round-trips through wipe and restore |
| Malformed backup | Rejected; must not clear existing progress |
| Reset | Backup is offered and optional; clearing the option warns that nothing will be saved |
| Package switch | Full page reload — storage keys are namespaced and a reload re-reads all of them |

---

## 10. Rules for the check suite itself

1. **Test through the control the user touches.** Seeding `localStorage` and reloading proves the content layer resolved and nothing else. A broken package switch shipped because it was verified that way.
2. **After writing a check, break the thing and confirm the check fails.** A check that has never failed has never been tested.
3. **Check the content, not just the geometry.** A print check that measures overflow and never reads the page will pass while the table of contents is empty.
4. **Run against every package and every theme.** A check that opens one page cannot see a fault bound per stage.
5. **Budgets scale with content.** A fixed ceiling that has to be raised on every addition asserts nothing.

The check count varies by one or two between runs: some checks are generated per item and depend on which options a shuffled sample presented. That is expected. A drop of more than two means a check stopped running.
