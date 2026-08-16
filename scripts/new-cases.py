#!/usr/bin/env python3
"""
Add two worked cases and enrich the two that exist.

The pair already present covered "the method used well" and "the method
catching a mistake late". Both run through delivery. Neither shows product work
against a hard policy constraint, and neither shows a service degrading after
launch — which are the two situations departmental product managers actually
spend most of their time in, and the two stages (6 and 8) with the least
worked material anywhere in the course.

Each step now names the decision that was on the table and the tempting wrong
move, before saying what the team did. A narrative is easy to nod along to; a
decision has to be answered.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGET = ROOT / "src" / "reference.ts"


def esc(text: str) -> str:
    return json.dumps(text, ensure_ascii=False)


def step_literal(s: dict) -> str:
    out = ["      {"]
    out.append(f'        moduleId: {esc(s["moduleId"])},')
    out.append(f'        stage: {s["stage"]},')
    out.append(f'        heading: {esc(s["heading"])},')
    if s.get("decision"):
        out.append(f'        decision: {esc(s["decision"])},')
    if s.get("tempting"):
        out.append(f'        tempting: {esc(s["tempting"])},')
    out.append(f'        body: {esc(s["body"])},')
    if s.get("artefact"):
        out.append(f'        artefact: {esc(s["artefact"])},')
    out.append(f'        insight: {esc(s["insight"])},')
    out.append("      },")
    return "\n".join(out)


def case_literal(c: dict) -> str:
    out = ["  {"]
    out.append(f'    id: {esc(c["id"])},')
    out.append(f'    title: {esc(c["title"])},')
    out.append(f'    subtitle: {esc(c["subtitle"])},')
    out.append(f'    outcome: {esc(c["outcome"])},')
    out.append(f'    summary:\n      {esc(c["summary"])},')
    out.append("    steps: [")
    for s in c["steps"]:
        out.append(step_literal(s))
    out.append("    ],")
    out.append(f'    closing:\n      {esc(c["closing"])},')
    out.append("  },")
    return "\n".join(out)


def main() -> None:
    data = json.loads((Path(__file__).parent / "new-cases.json").read_text(encoding="utf8"))
    src = TARGET.read_text(encoding="utf8")

    # 1. Enrich existing steps with decision/tempting, matched by heading.
    added = 0
    for heading, extra in data["enrich"].items():
        marker = f"heading: {esc(heading)},"
        at = src.find(marker)
        if at < 0:
            raise SystemExit(f"heading not found: {heading}")
        if "decision:" in src[at:at + 400]:
            continue
        insert = f"\n        decision: {esc(extra['decision'])},"
        if extra.get("tempting"):
            insert += f"\n        tempting: {esc(extra['tempting'])},"
        src = src[:at + len(marker)] + insert + src[at + len(marker):]
        added += 1

    # 2. Append the new cases before the line that closes the array.
    #
    #    A character-level bracket matcher was tried first and put the insert
    #    past the array's end, because the literal contains bracket characters
    #    inside strings that the matcher mishandled. Line-based is dumber and
    #    correct: find the declaration, scan forward to the first line that is
    #    exactly "];", insert above it.
    if data["cases"][0]["id"] in src:
        print("  cases already present")
    else:
        lines = src.split("\n")
        start = next(i for i, l in enumerate(lines) if l.startswith("export const caseStudies"))
        end = next(i for i in range(start, len(lines)) if lines[i] == "];")
        block = "\n".join(case_literal(c) for c in data["cases"])
        lines[end:end] = block.split("\n")
        src = "\n".join(lines)

    TARGET.write_text(src, encoding="utf8")
    print(f"enriched {added} existing steps; added {len(data['cases'])} cases")


if __name__ == "__main__":
    main()
