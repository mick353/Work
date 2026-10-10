# Course Workshop — trainer feedback collection and recovery

**Operational record:** 11 October 2026 (Australia/Sydney)  
**Environment:** Public Product Practice `mick353/Work` GitHub Pages + owner-controlled Cloudflare Worker/KV  
**Owner access credential:** Private Notion only — **never commit its value to this public repository**.

This is an implemented feedback system for **trainers using Course Workshop to author courses**, not a survey for learners taking a course. It lets a trainer submit feedback during course creation and/or after course completion, then provides a private, key-protected owner review and CSV export.

## Essential links

| Purpose | Link |
|---|---|
| **Course builder** | [Course Workshop](https://mick353.github.io/Work/course-workshop/) |
| **Trainer fills in feedback** | [Submit Course Workshop feedback](https://mick353.github.io/Work/trainer-feedback/) |
| **Owner reviews and exports replies** | [Owner feedback dashboard](https://mick353.github.io/Work/trainer-feedback/review.html) |
| **Private review key and exact recovery identifiers** | [Private Notion — Product Practice Trainer Feedback Access](https://app.notion.com/p/3f5a16241adc813e8a21c5dcc8cf3ec7) |
| **Notion trainer-adoption milestone** | [Trainer validation](https://app.notion.com/p/3eba16241adc819781c7cd01537d351e) |
| **Live form source** | [public/trainer-feedback/index.html](public/trainer-feedback/index.html) |
| **Owner review page source** | [public/trainer-feedback/review.html](public/trainer-feedback/review.html) |
| **Worker implementation source** | [infrastructure/trainer-feedback/worker.js](infrastructure/trainer-feedback/worker.js) |

The current Course Workshop contains a **Give Course Workshop feedback** link in its authoring sidebar. It opens the trainer questionnaire in a separate tab without uploading the current draft, its title, its authoring data, or any learner information. The HTML questionnaire is a separate static page, not part of the local-only Course Workshop draft store. An offline/local HTML copy cannot submit feedback without network access.

## Submission path

```text
Trainer authoring in Course Workshop
    -> "Give Course Workshop feedback" (external link)
    -> /Work/trainer-feedback/ (public static form)
    -> POST https://product-practice-trainer-feedback.gobbos-sportsbet.workers.dev/submit
    -> Cloudflare Worker "product-practice-trainer-feedback"
    -> Workers KV namespace PRODUCT_PRACTICE_TRAINER_FEEDBACK_2026
    -> immutable-ish individual response:<timestamp>:<uuid> key

Owner:
    /Work/trainer-feedback/review.html
    -> input private review key from the private Notion page
    -> GET /results with Authorization: Bearer <key>
    -> Worker reads "config:review-key" from KV
    -> response table and downloadable CSV
```

**Note:** Workers KV writes are per response key, not a transactional database. KV is adequate for small feedback volumes, but do not claim enterprise-grade audit logging, strict consistency, response deduplication, prevention of repeat responses, regulatory retention compliance or organisational hosting approval.

## Data collected

The questionnaire records:
- a **generic/non-sensitive course reference**, response stage and current course progress;
- previous digital authoring experience; whether work began blank, via clone or previous draft; and preparedness of the teaching content;
- active authoring time; time to first useful learner preview; frequency and duration of software assistance;
- which actual Course Workshop features the trainer used and their ease-of-use assessment;
- the hardest step, problem categories, biggest obstacle, most helpful aspect;
- usable output achieved, confidence in making another course independently, principal requested improvement, and missing capability;
- an automatic submission timestamp and receipt identifier.

It deliberately does **not** upload a trainer's draft, PDF/deck or learner records; request a name/email; or ask for departmental source documents. The respondent is instructed to avoid confidential content. **Optional free-text answers can nonetheless contain personal or internal information if entered by a user.** Privacy/security controls must account for that.

Same course reference can be used for both responses to compare experiences but is not a verified identity, and no automatic pairing or analytics engine is present.

## Files and release preservation

| Path | Role |
|---|---|
| `authoring/App.tsx` | Sidebar feedback link in Course Workshop |
| `authoring/styles.css` | Feedback action styles; keyboard-visible focus |
| `public/trainer-feedback/index.html` | Source-controlled form, copied to published `docs/` by build |
| `public/trainer-feedback/review.html` | Source-controlled owner-only view, copied to published `docs/` by build |
| `docs/trainer-feedback/index.html` | Published GitHub Pages trainer form |
| `docs/trainer-feedback/review.html` | Published GitHub Pages review page |
| `infrastructure/trainer-feedback/worker.js` | Exact deployed Cloudflare Worker source as at this record |
| `TRAINER-FEEDBACK-OPERATIONS.md` | This runbook |

The duplicate `public/` and `docs/` HTML files are intentional: a standard build regenerates the published `docs/` directory from `public/`. **Edit the `public/` copy first**, run the build, and inspect the generated `docs/` files. Do not keep an independent, hand-edited `docs/` implementation.

The Worker has been deployed separately through the Cloudflare API. A GitHub merge alone **does not deploy** the Worker, configure its bindings, create its KV namespace or set its private review key. Worker source tracked here is for continuity and controlled redeployment, not an automatic workflow. The repository is public.

## Cloudflare recovery identifiers

- Cloudflare account ID: `fe7cd10c724fcced8b50c5def6c3996f`.
- Worker script: `product-practice-trainer-feedback`.
- Workers subdomain: `gobbos-sportsbet.workers.dev`.
- Submission worker URL: `https://product-practice-trainer-feedback.gobbos-sportsbet.workers.dev/submit`.
- Review worker URL: `https://product-practice-trainer-feedback.gobbos-sportsbet.workers.dev/results`.
- Health endpoint: `https://product-practice-trainer-feedback.gobbos-sportsbet.workers.dev/health`.
- KV namespace title: `PRODUCT_PRACTICE_TRAINER_FEEDBACK_2026`.
- KV namespace ID: `998b7ec4ce7b4f0ca9480eb29a5f7e0e`.
- Worker binding: `FB_STORE` (KV namespace).
- Review key's **Cloudflare KV location**: `config:review-key`.
- Response key prefix: `response:`.

### Where the existing review key is kept

The exact **unchanged** current review key is deliberately saved at [the user's private Notion page](https://app.notion.com/p/3f5a16241adc813e8a21c5dcc8cf3ec7). Open that page when access is needed, copy its key into the owner review dashboard, and **do not publish it in GitHub, issue history, CI logs, source code, screenshots or public website text**. User explicitly requested that it **not be rotated**, and no change to its value is part of this documentation.

The Worker obtains the key from KV on every owner review request. It is not present as a hard-coded secret in `worker.js`. A safe redeployment must preserve the KV binding and existing `config:review-key` value; recreating the KV namespace without migrating the key and response entries would break review and lose historic records.

## Validation, known boundaries and operational checks

**Verified in the previous implementation pass:**
1. The public questionnaire page loaded and displayed all four groups of trainer questions.
2. Cloudflare Browser Rendering exercised the **real form submission handler**, recorded a 201 response and a displayed receipt.
3. Two explicitly synthetic submissions were observed in the Cloudflare KV store and then deleted. They were not retained as real trainer feedback.
4. The owner dashboard rejects an invalid key (observed unauthorised access).
5. GitHub Pages deployment and repository `Verify learning system` completed successfully at `5a3b871d94d59edfed23a12a64cdca0800dcfc94`.

**Evidence qualification:** An earlier automated TinyFish browser pass clicked through the page but did not observe a successful receipt. Later **independent** Cloudflare browser tests established form submission and receipt display. Those tests should not be merged into one fictitious TinyFish pass. Any later smoke-test result should include the actual tool, date, response and evidence, and be updated here if it changes.

**Recommended regression test after changing the builder or form:** Open Course Workshop, follow its feedback link, check four groups and required fields, submit a clearly labelled non-sensitive `TEST-QA-ONLY` response, capture the receipt, confirm it is present in KV and visible in the authorised owner dashboard, confirm CSV export and denied access with a deliberately incorrect key, then remove only the synthetic response and record deployment/CI provenance. Do **not** delete other trainer submissions.

**Organisational boundary:** The feedback API is in an account controlled by the product owner, **not a DEWR-approved service** by virtue of being live. Work colleagues should only be asked to submit when the departmental information-handling permission for this collection route has been checked. The public form instructs respondents to avoid identifiable or confidential content. Internal trainee surveys and organisation-sanctioned retention/access controls may instead require an approved Microsoft 365 or departmental system.

## Known optional directions

This feedback mechanism does not alter the learner player, course publishing, release approvals, local drafting, LMS integration, central progress tracking or the commercialisation decision. Later adoption may require departmental hosting, stronger authentication/retention, analyst roles, centralised surveys, metrics aggregation or approved-case-study consent; none of these are implied to be implemented today.
