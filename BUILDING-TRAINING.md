# Building training in this system — what I got wrong, and the rules that came out of it

Written after the session that built Closure Reports. The project owner
corrected me eighteen times. Almost none of those corrections needed specialist knowledge — they
needed me to check something I had assumed. This is the checklist that would
have caught them.

Read this **before** authoring a new package, and again before saying anything
is finished.

---

## 1. Research the artefact, not just the field

**What went wrong.** For Closure Reports I researched the Australian assurance
frameworks properly — Gateway, RMG 106, RMG 134, ANAO, NAA, the Procurement
Rules — and never once looked at an actual closure report template. I wrote the
section structure from PRINCE2 and two US state templates because that is what a
generic search returns. He then listed fourteen sections his department
actually uses and I was missing ten of them. Later I found the DTA had published
a **Project closure reporting standard for digital and ICT-enabled projects** —
seven criteria, self-assessed Strong / Emerging / Nil — which is the exact thing
a DEWR project is measured against, and which the course should have been built
on from the first hour.

**The rule.** For any workplace deliverable, find the thing that governs it
before writing a word of the course:

1. Search `architecture.digital.gov.au` for a standard or design.
2. Search `finance.gov.au` for an RMG, and `anao.gov.au` for the audit view.
3. Search `site:.gov.au "<artefact name>" template` — state governments publish
   what the Commonwealth sometimes does not.
4. Ask the project owner whether his area has a template. His answer outranks all of the
   above; it is the document people will actually open.
5. Only then reach for PRINCE2, PMBOK, IPA or overseas material — as
   *comparators*, clearly labelled, never as the spine.

**The tell that you have skipped this.** You are describing good practice in
general terms and cannot name the document, its sections, or who assesses it.

---

## 2. Ship the source, or do not cite it

The first course cited "Deck slides 21–35" on every stage while the deck existed
nowhere in the project. A citation the learner cannot follow is an assertion.
Either the source travels with the package or the citation goes.

---

## 3. Show the finished artefact

A course about producing a document must contain **one complete worked example
of that document**, not fragments in templates. I taught all fourteen sections,
wrote three case studies and a template for each part, and never showed a whole
report until he asked where it was.

Make the example uncomfortable: a cost overrun against original approval, a
benefit that missed, an owner who would not accept a transfer. A worked example
of the easy case teaches nothing, and everyone can already write that one.

---

## 4. Test the path the user takes, not the state it produces

**The worst failure of the session.** I verified the package switch by writing
`active-package` into `localStorage` and reloading. That proved the content
layer resolved. It could not possibly have caught the actual bug, because
nineteen views had the first package's name written in as literal text — the
sidebar changed, the content changed, and the page still said "Product
Management Fundamentals" at the top. He clicked the button and saw nothing
happen.

**The rule.** Every user-facing behaviour gets tested through the control the
user touches. Seeding state is for setting up a scenario, never for verifying
one. If the test does not click the thing, it does not test the thing.

---

## 5. Assume the second package will find what the first one hid

Anything keyed by id silently no-ops on a miss. Both of these shipped:

- **Illustrations** are `Record<moduleId, Component>`. All nine belonged to
  package one. Package two rendered eleven stages of prose with no diagram and
  no error.
- **Nineteen hardcoded strings**: hero, topbar, guide cover, record of
  completion, deck intro, slide caption, search blurb, reset dialog. Plus a
  sidebar heading hardcoded to "Nine-stage curriculum" and a hero tagline
  hardcoded to the first course's arc.

**The rule.** When you add a package, walk every view of the *new* one before
claiming anything. Better: build a deliberately minimal probe package (two
stages, no slides, no capstone, no cases) and walk all views with it. That is
how the empty states got written, and it took twenty minutes.

Anything phrased as a fact about the course comes from the manifest. If you are
typing a course's name, stage count, publisher or tagline into a component, stop.

---

## 6. Write the assessment against the item-writing rules, every time

In **every** batch of questions I wrote, the correct answer was the longest
option far more often than chance:

| Batch | Correct answer longest | After fixing |
|---|---|---|
| Package 1 original | 81% | 13% |
| Closure, first 65 | 78.5% | 27.7% |
| Closure, +19 new | 36.9% | 25.0% |
| Closure, +13 new | 30.9% | 24.5% |

It recurs because the correct answer is the one you have thought about. Measure
after every batch, target under 30% and a mean length ratio under 1.20.
Answer *position* is already neutralised by the render-time shuffle; length is
not.

---

## 7. Lead with what the practice achieves

I wrote the whole closure package in a deficit frame: 23 of 47 sections opened
on what goes wrong, 8 headings named a pathology, 5 of 11 core ideas began with
a negation. Over eleven stages that reads as a catalogue of failure, and it
teaches worse — people build a skill faster from what a practice achieves than
from what it avoids.

**The rule.** State what good does, then use the failure as contrast. Keep the
honest material; change the order.

- ✗ "Closure reports are unusually bad documents"
- ✓ "Writing one of these well is harder than it looks, and the difficulty is
  structural rather than personal"

**Not** a blanket ban on "not". Contrastive definition — "an ownership model,
not merely software" — states the positive first and is good teaching. The
target is roughly 90%+ affirmative openers, not 100%.

---

## 8. Headings must not assume what the section teaches

"Gate 6 and why it exists" is meaningless to someone who has never heard of
Gateway — which is everyone the section is written for. Define the jargon in
plain words on first use, and name the capability in the heading.

- ✗ "Gate 6 and why it exists" → ✓ "Why someone independent checks your closure"
- ✗ "Reference class data" → ✓ "Why pooled numbers beat any single account"
- ✗ "The reachability test" → ✓ "Can they work without you?"

---

## 9. Never let development history into learner-facing copy

The course once referred to "the previous version" of itself. It is a course,
not a changelog. Rationale for design decisions belongs in code comments and
commit messages — which is where all of this lives — never on the page.

The same applies to tone about other people's work. The divergence register
originally read as a critique of a colleague's deck; reframed as "Course
additions", it reads as depth a briefing has no room for. Same content.

---

## 10. Order the navigation by the learner's journey

The menu was Learn / Practise / Apply / Reference — a taxonomy of the software —
with the eleven stages rendered *last*, below four groups of activities. So the
reading material sat below the assessment of it, the group called "Learn"
contained no lesson, and the complete guide was filed under "Reference" beside
the glossary.

Study comes first and carries the stages. Everything that tests, applies or
supports the material follows. And check that every destination is actually in
the menu — the diagnostic was reachable only from a dashboard button.

---

## 11. Measure the layout, at more than one width

Two separate faults, both from testing at one viewport:

- Prose held at a 68-character measure left a **649px empty gutter** beside every
  paragraph on a 1440px screen — wider than the text column itself — while
  tables ran to 828px. The measure was right; the space beside it was doing
  nothing. The in-page contents now lives there as a sticky rail.
- Between roughly 700 and 1100px, where multi-column layouts collapse,
  commentary ran to **117 characters a line**, and on a 390px phone a
  fixed-width `<pre>` forced a grid track to 712px inside a 356px article,
  where `overflow: hidden` silently clipped it.

**The CSS trap worth memorising:** `grid-template-columns: 1fr` means
`minmax(auto, 1fr)`, and `auto` will not shrink below its content. Use
`minmax(0, 1fr)` on any track that might contain a `<pre>`, a table or a long
token.

**The rule.** Check measure and overflow at 390, 768, 1100, 1440 and 1920. The
collapse points are where capped columns stop being capped.

---

## 12. Diagnose before patching

I fixed the same dark-mode contrast bug three times because I kept guessing at
the cause. The actual cause was two panel-specific rules being outranked on
`color` by `:root[data-theme="dark"] .primary`. Two minutes reading
`getComputedStyle` would have found it immediately.

Related: `opacity` composites an element *and its background* toward the page,
so a disabled button at `opacity: 0.45` computed to 1.04:1 in dark mode. Use
real colour tokens for disabled states, never opacity.

---

## 13. Write QA checks that can actually fail

Three of my own checks were broken in ways that made them pass or report
nonsense:

- The worked-example check ran on the **default** package, which has no worked
  example, so it read an empty state and reported every requirement missing.
- The package-switch check compared **stage counts** — which stopped being a
  signal the moment both packages had nine stages.
- The bundle-size check was a **fixed 900 KB ceiling** written when there was one
  course. A budget that has to be raised on every addition means nothing; make
  it per-package so it still catches genuine bloat.

**The rule.** After writing a check, break the thing deliberately and confirm the
check fails. A check that has never failed has never been tested.

---

## 14. Script content edits defensively

Two scripts corrupted content this session:

- A rebalancer split options arrays on commas without tracking string literals,
  tearing apart every option containing a comma.
- An insert anchored on `id: "lessons"` matched the **source** with that id
  before the module with that id, and dropped a whole lesson section into
  stage 1.

**The rule.** Anchor on something unique (a title, not an id that recurs across
types). Assert the match count is exactly 1 before writing. Read the result back
and check structure — section headings per stage, question counts, contiguous
numbering — rather than trusting the script's own output.

And after any renumbering, **re-check internal cross-references**. Inserting one
section pushed the agreement from 13 to 14 and left two "see section 13"
pointers aimed at the wrong place.

---

## 15. Say what you did not verify

When the sandbox lost its system libraries I could not run the browser suite. The
right move was to say so plainly in the commit and the reply, not to imply the
usual verification had happened. (The recovery, for next time: apt was locked,
but `archive.ubuntu.com` was reachable — fetch `Packages.gz`, resolve the
filenames, `curl` the `.deb`s and `dpkg-deb -x` them into a directory on
`LD_LIBRARY_PATH`.)

---

## Pre-flight, before saying a package is done

- [ ] The governing Australian standard is identified, cited, and is the spine
- [ ] Every cited source ships with the package or is a working link
- [ ] One complete worked example of the artefact, showing the hard case
- [ ] Every view walked **in the new package**, not just the default
- [ ] Every stage has an illustration
- [ ] Package switched **by clicking the button**, both directions
- [ ] No hardcoded course name, stage count, publisher or tagline in any view
- [ ] Correct-answer-longest under 30%, mean length ratio under 1.20
- [ ] Affirmative openers ~90%+; no heading assumes what it teaches
- [ ] No development history, no criticism of colleagues' work, on any page
- [ ] Measure and overflow checked at 390 / 768 / 1100 / 1440 / 1920
- [ ] Cross-references verified after any renumbering
- [ ] Zero axe serious/critical, both packages, both themes
- [ ] Full QA suite green — and any new check proven to fail when broken
- [ ] Anything unverified stated plainly

---

## The pattern underneath all of it

Every correction he made was something I could have checked and did not,
because I had a reason to believe it was fine. The container was "done" because
storage was namespaced. The review was "professional" because I had read the
frameworks. The switch "worked" because the content layer resolved.

Check the thing itself. Click the button. Read the standard. Walk the new
package. Measure at more than one width. It is nearly always twenty minutes.
