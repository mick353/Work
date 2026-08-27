# DEWR visual theme

## Status

The DEWR-aligned presentation is the **default visual theme** for the combined learner site, generated learner-course packages and Course Workshop. It changes presentation only: course content, navigation, progress, scoring, storage, authoring and export behaviour remain the same.

- Learner site: <https://mick353.github.io/Work/>
- Course Workshop: <https://mick353.github.io/Work/course-workshop/>
- Existing bookmarks containing `?brand=dewr` remain compatible, but the parameter is no longer required.
- The application continues to identify itself as an `internal learning aid`.
- The learner header uses the approved inline black logo on the light theme and the approved all-white reversed logo on the dark theme. Course Workshop uses the reversed logo on its dark application sidebar.

## Current authority

The theme is aligned to the department-supplied **DEWR Brand Guidelines, version 1, June 2026** and its **Quick reference guide, 2026**. These replace the earlier 2024 *Colour palettes and fonts* source used during exploration. The source PDFs are held with the local project evidence and are not republished in this public repository.

The core palette is Graphite `#3E4246`, Eucalyptus `#78A34F`, Mint `#4CBFAD`, Lime `#A6BD38`, Spruce `#055044` and Teal `#149B9E`. Supporting colours are used sparingly. The dedicated data palette—Pine Green, Ocean Mist, Rose Pink, Tiger Flame and Electric Indigo—is reserved for information graphics.

The guide adopts Aptos as the department-wide typeface across Microsoft, print and digital platforms. The player and Course Workshop therefore use locally installed Aptos and Aptos Display where available, with Segoe UI and Arial as offline-safe fallbacks. They download no font.

Learner-facing wording also follows the Australian Government Style Manual's plain-language guidance: use familiar words and direct sentences, explain necessary specialist terms, and remove needless bureaucratic phrasing. Course-specific technical terms remain where they are part of what the learner must understand.

## Applied design rules

| Use | Treatment | Reason |
|---|---|---|
| Main text and application structure | Graphite on white or a light Graphite tint | The guide approves Graphite with white and discourages arbitrary substitute colours |
| Primary actions and focus | White on Spruce in light mode; black on Eucalyptus in dark mode | These are approved regular-text pairings; Eucalyptus is not used behind small white text |
| Visible brand accent | Eucalyptus on the departmental banner edge and restrained application accents | Gives a clear DEWR cue without making a low-contrast colour carry meaning |
| Stages and diagrams | Exact core, supporting or data colours with a separately tested text-safe partner | Colour differentiates content but is never the only cue |
| Data visualisation | Dedicated DATA colours, direct labels and restrained series counts | Matches the guide's chart palette and avoids legend-only interpretation |
| Typography | Aptos family with offline system fallbacks | Matches the June 2026 department-wide type direction |
| Icons | Existing rounded, outline Lucide icons with consistent stroke | Matches the required rounded-outline visual language; icon meaning is also supplied by text or an accessible name |
| Illustrations | Existing course illustrations inherit the DEWR palette | Keeps a coherent palette and simple, purposeful visual forms without replacing teaching content |
| Dark theme | Exact bright approved colours on Graphite-derived surfaces | Each semantic text pairing is tested; dark colours are not forced onto a dark surface |
| Status | Existing success, warning and danger semantics plus text or symbols | Brand colour never replaces meaning or becomes the sole status cue |

The design target is WCAG 2.2 Level AA. Normal text must reach 4.5:1, large text and meaningful graphical/interface boundaries 3:1. The application also retains keyboard, focus, zoom, reduced-motion and target-size safeguards. Automated checks are regression evidence, not a claim of complete conformance.

## Logo use

The learner header and Course Workshop use the exact inline black and all-white reversed logo artwork supplied in the department's 2026 guide. The logo appears once per application, at the top of the interface, with the guide's isolation space preserved. The displayed artwork keeps the Coat of Arms at or above the 48-pixel website-banner minimum. Its alternative text is `Australian Government Department of Employment and Workplace Relations`.

The inline treatment is the guide's preferred digital logo and fits the supported mobile width, so the player does not switch to or redraw a stacked mark. Light and dark themes select the corresponding approved contrast treatment without filters, recolouring or distortion.

## Ongoing validation

The technical theme is implemented and regression-tested. The following evidence and maintenance activities sit outside automated checks:

1. resolve trainer feedback;
2. complete representative manual keyboard, screen-reader, zoom and device checks;
3. replace the embedded logo files only if the Design team supplies a newer approved brand asset pack.

The automated suite verifies the default theme across every course stage in light and dark modes. The palette values are a tested contract so a future edit cannot silently restore superseded colours.
