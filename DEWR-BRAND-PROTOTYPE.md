# DEWR brand prototype

## Status

This is an **optional visual prototype for trainer evaluation**. It changes presentation only: course content, navigation, progress, scoring, storage and exports remain the same.

- Default learner site: <https://mick353.github.io/Work/>
- DEWR visual prototype: <https://mick353.github.io/Work/?brand=dewr#dashboard>
- Activation rule: the prototype appears only when the URL contains `?brand=dewr`.
- Status wording: the application identifies itself as a `DEWR theme preview` and continues to say `internal learning aid`.
- Approval boundary: the prototype is not an official publication or evidence of departmental endorsement. It does not use the Australian Government crest or an official wordmark.

## Current authority

The prototype is aligned to the department-supplied **DEWR Brand Guidelines, version 1, June 2026** and its **Quick reference guide, 2026**. These replace the earlier 2024 *Colour palettes and fonts* source used for the first prototype. The source PDFs are held with the local project evidence and are not republished in this public repository.

The core palette is Graphite `#3E4246`, Eucalyptus `#78A34F`, Mint `#4CBFAD`, Lime `#A6BD38`, Spruce `#055044` and Teal `#149B9E`. Supporting colours are used sparingly. The dedicated data palette—Pine Green, Ocean Mist, Rose Pink, Tiger Flame and Electric Indigo—is reserved for information graphics.

The guide adopts Aptos as the department-wide typeface across Microsoft, print and digital platforms. The prototype therefore uses locally installed Aptos and Aptos Display where available, with Segoe UI and Arial as offline-safe fallbacks. It downloads no font.

Learner-facing wording also follows the Australian Government Style Manual's plain-language guidance: use familiar words and direct sentences, explain necessary specialist terms, and remove needless bureaucratic phrasing. Course-specific technical terms remain where they are part of what the learner must understand.

## Applied design rules

| Use | Prototype treatment | Reason |
|---|---|---|
| Main text and application structure | Graphite on white or a light Graphite tint | The guide approves Graphite with white and discourages arbitrary substitute colours |
| Primary actions and focus | White on Spruce in light mode; black on Eucalyptus in dark mode | These are approved regular-text pairings; Eucalyptus is not used behind small white text |
| Visible brand accent | Eucalyptus on the header edge and product mark | Gives a clear DEWR cue without making a low-contrast colour carry meaning |
| Stages and diagrams | Exact core, supporting or data colours with a separately tested text-safe partner | Colour differentiates content but is never the only cue |
| Data visualisation | Dedicated DATA colours, direct labels and restrained series counts | Matches the guide's chart palette and avoids legend-only interpretation |
| Typography | Aptos family with offline system fallbacks | Matches the June 2026 department-wide type direction |
| Icons | Existing rounded, outline Lucide icons with consistent stroke | Matches the required rounded-outline visual language; icon meaning is also supplied by text or an accessible name |
| Illustrations | Existing course illustrations inherit the DEWR palette in preview mode | Keeps a coherent palette and simple, purposeful visual forms without replacing teaching content |
| Dark theme | Exact bright approved colours on Graphite-derived surfaces | Each semantic text pairing is tested; dark colours are not forced onto a dark surface |
| Status | Existing success, warning and danger semantics plus text or symbols | Brand colour never replaces meaning or becomes the sole status cue |

The design target is WCAG 2.2 Level AA. Normal text must reach 4.5:1, large text and meaningful graphical/interface boundaries 3:1. The application also retains keyboard, focus, zoom, reduced-motion and target-size safeguards. Automated checks are regression evidence, not a claim of complete conformance.

## Logo boundary

The 2026 guide specifies approved inline and stacked Australian Government/department logo files, clear space, minimum digital sizes and the alt text `Australian Government Department of Employment and Workplace Relations`. Those assets must come from the department's approved source. The prototype deliberately keeps its `PP` product mark and does **not** copy, redraw or extract a crest from the PDF.

If the product is approved for departmental adoption, the Design team or brand owner should supply the correct logo asset and confirm its placement. Until then, the preview label and internal-learning-aid wording remain.

## Evaluation and adoption

Trainers can use the prototype normally and compare it with the default link. Saved learner progress belongs to the same application and is not duplicated merely because the brand parameter changes.

Before adoption:

1. obtain brand/communications approval and any approved logo assets;
2. resolve trainer feedback and complete manual keyboard, screen-reader, 200%/400% zoom and representative device checks;
3. decide whether the DEWR theme becomes the default or remains an organisational theme;
4. apply the same shared tokens to Course Workshop so learner and authoring tools read as one product; and
5. retain the unofficial/internal-learning-aid notice until the department explicitly changes the product's status.

The automated suite verifies the default and prototype modes independently, including every course stage in light and dark themes. The palette values themselves are now a tested contract so a future edit cannot silently restore the superseded colours.
