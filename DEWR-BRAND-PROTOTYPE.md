# DEWR brand prototype

## Status

This is an **optional visual prototype for trainer evaluation**. It changes presentation only: course content, navigation, progress, scoring, storage and exports remain the same.

- Default learner site: <https://mick353.github.io/Work/>
- DEWR visual prototype: <https://mick353.github.io/Work/?brand=dewr#dashboard>
- Activation rule: the prototype appears only when the URL contains `?brand=dewr`.
- Status wording: the application identifies itself as a `DEWR theme preview` and continues to say `internal learning aid`.
- Approval boundary: the prototype is not an official publication or evidence of departmental endorsement. It does not use the Australian Government crest or an official wordmark.

## Source

The palette and font direction come from the Department of Employment and Workplace Relations document *Colour palettes and fonts*, released under FOI reference LEX 1298:

<https://www.dewr.gov.au/download/16766/official-departmental-style-guidesbrand-guideswriting-guides/39290/official-departmental-style-guidesbrand-guideswriting-guides/pdf>

The primary palette is Graphite `#404246`, Eucalyptus `#7A9F4C`, Dark Eucalyptus `#5D7A38`, Grey `#A4A7A9` and Mid grey `#D7D8D8`. Secondary and tertiary colours are supporting colours for graphics, diagrams and content differentiation rather than a dominant scheme.

The guide lists Montserrat for designed headings and text-light material, Myriad Pro for text-heavy designed material and Aptos for in-house material. The prototype uses an offline-safe system font stack: it prefers Montserrat/Aptos when installed and otherwise falls back to Segoe UI or Arial. It does not download a web font.

## Applied design rules

| Use | Prototype treatment | Accessibility reason |
|---|---|---|
| Main text and application structure | Graphite on white or a very light neutral | Graphite and white are listed as AAA |
| Primary buttons and compact labels | White on Dark Eucalyptus | Listed as AA for normal text |
| Focus indicators and large/decorative accents | Eucalyptus | Eucalyptus with white is suitable for large text only, so it is not used for small white labels |
| Panels | Mid-grey/light neutral surface with Graphite text | The guide lists Mid grey and Graphite as AAA |
| Stages and diagrams | DEWR secondary/tertiary colours with separate text-safe partners | Preserves differentiation without assuming every raw colour is safe for text |
| Dark theme | Accessible tints of the departmental colours on Graphite-derived surfaces | The guide permits tints for graphic elements and headers on dark backgrounds |
| Status | Existing success, warning and danger semantics | Brand colours do not replace meaning or rely on colour alone |

Grey and Mid grey are not used as the sole visible boundary of important controls when their contrast is too low. Charts, stage indicators and status messages retain labels or symbols so colour is never the only cue.

## Evaluation and adoption

Trainers can use the prototype normally and compare it with the default link. Saved learner progress belongs to the same application and is not duplicated merely because the brand parameter changes.

If the direction is adopted:

1. obtain the current internal brand/communications approval and approved logo assets, if any;
2. resolve trainer feedback and complete manual keyboard, screen-reader, zoom and device checks;
3. decide whether the DEWR theme becomes the default or remains an organisational theme;
4. apply the same shared tokens to Course Workshop so learner and authoring tools read as one product; and
5. retain the unofficial/internal-learning-aid notice until the department explicitly changes the product's status.

The automated suite verifies the default and prototype modes independently, including every course stage in light and dark themes. Automated checks are regression evidence, not a substitute for manual accessibility testing or formal approval.
