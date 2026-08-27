# DEWR visual theme

## Status

The DEWR-aligned presentation is the **default visual theme** for the combined learner site and generated learner-course packages. It changes presentation only: course content, navigation, progress, scoring, storage and export behaviour remain the same.

- Learner site: <https://mick353.github.io/Work/>
- Existing bookmarks containing `?brand=dewr` remain compatible, but the parameter is no longer required.
- The application continues to identify itself as an `internal learning aid`.
- This is not an official Australian Government publication or evidence of departmental endorsement. It does not use the Australian Government crest or an official wordmark.

## Current authority

The theme is aligned to the department-supplied **DEWR Brand Guidelines, version 1, June 2026** and its **Quick reference guide, 2026**. These replace the earlier 2024 *Colour palettes and fonts* source used during exploration. The source PDFs are held with the local project evidence and are not republished in this public repository.

The core palette is Graphite `#3E4246`, Eucalyptus `#78A34F`, Mint `#4CBFAD`, Lime `#A6BD38`, Spruce `#055044` and Teal `#149B9E`. Supporting colours are used sparingly. The dedicated data palette—Pine Green, Ocean Mist, Rose Pink, Tiger Flame and Electric Indigo—is reserved for information graphics.

The guide adopts Aptos as the department-wide typeface across Microsoft, print and digital platforms. The player therefore uses locally installed Aptos and Aptos Display where available, with Segoe UI and Arial as offline-safe fallbacks. It downloads no font.

Learner-facing wording also follows the Australian Government Style Manual's plain-language guidance: use familiar words and direct sentences, explain necessary specialist terms, and remove needless bureaucratic phrasing. Course-specific technical terms remain where they are part of what the learner must understand.

## Applied design rules

| Use | Treatment | Reason |
|---|---|---|
| Main text and application structure | Graphite on white or a light Graphite tint | The guide approves Graphite with white and discourages arbitrary substitute colours |
| Primary actions and focus | White on Spruce in light mode; black on Eucalyptus in dark mode | These are approved regular-text pairings; Eucalyptus is not used behind small white text |
| Visible brand accent | Eucalyptus on the header edge and product mark | Gives a clear DEWR cue without making a low-contrast colour carry meaning |
| Stages and diagrams | Exact core, supporting or data colours with a separately tested text-safe partner | Colour differentiates content but is never the only cue |
| Data visualisation | Dedicated DATA colours, direct labels and restrained series counts | Matches the guide's chart palette and avoids legend-only interpretation |
| Typography | Aptos family with offline system fallbacks | Matches the June 2026 department-wide type direction |
| Icons | Existing rounded, outline Lucide icons with consistent stroke | Matches the required rounded-outline visual language; icon meaning is also supplied by text or an accessible name |
| Illustrations | Existing course illustrations inherit the DEWR palette | Keeps a coherent palette and simple, purposeful visual forms without replacing teaching content |
| Dark theme | Exact bright approved colours on Graphite-derived surfaces | Each semantic text pairing is tested; dark colours are not forced onto a dark surface |
| Status | Existing success, warning and danger semantics plus text or symbols | Brand colour never replaces meaning or becomes the sole status cue |

The design target is WCAG 2.2 Level AA. Normal text must reach 4.5:1, large text and meaningful graphical/interface boundaries 3:1. The application also retains keyboard, focus, zoom, reduced-motion and target-size safeguards. Automated checks are regression evidence, not a claim of complete conformance.

## Logo and approval boundary

The 2026 guide specifies approved inline and stacked Australian Government/department logo files, clear space, minimum digital sizes and the alt text `Australian Government Department of Employment and Workplace Relations`. Those assets must come from the department's approved source. The application keeps its `PP` product mark and does **not** copy, redraw or extract a crest from the PDF.

If the product is approved for formal departmental adoption, the Design team or brand owner should supply the correct logo asset and confirm its placement. The `internal learning aid` wording remains until the department explicitly changes the product's status.

## Remaining organisational checks

The technical theme is implemented and regression-tested. Formal departmental adoption still requires the evidence that software cannot provide by itself:

1. obtain brand or communications approval and any approved logo assets;
2. resolve trainer feedback and complete representative manual keyboard, screen-reader, zoom and device checks;
3. decide whether Course Workshop should adopt the same visual system; and
4. retain the unofficial/internal-learning-aid notice until authorised otherwise.

The automated suite verifies the default theme across every course stage in light and dark modes. The palette values are a tested contract so a future edit cannot silently restore superseded colours.
