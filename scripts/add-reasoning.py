#!/usr/bin/env python3
"""
Insert one worked-reasoning section into each stage.

Why
---
The review measured 5,852 words of lesson prose against 15,971 words of
questions and feedback: the course tested 2.7x more than it taught. Sections
ran 24-72 words each, which is a good revision note and not instruction. It
stated conclusions without deriving them, so the actual reasoning was only
visible in the per-option feedback — and only after a learner had already
committed to an answer.

Each stage now carries a passage that shows a real decision being made badly
and then well, with the thinking exposed. That is the part a reader cannot
reconstruct from a summary, and it is what the extra time in a self-paced
course is for.

Inserted programmatically because the sections arrays sit inside a 130KB
literal and hand-editing nine of them is how misalignment gets introduced.
The insert point is the end of each module's `sections` array, found by
bracket matching from the module's own id.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COURSE = ROOT / "src" / "course.ts"

SECTIONS = json.loads((Path(__file__).parent / "reasoning-sections.json").read_text(encoding="utf8"))


def ts_literal(section: dict, indent: str) -> str:
    parts = [f"{indent}{{"]
    parts.append(f"{indent}  heading: {json.dumps(section['heading'], ensure_ascii=False)},")
    parts.append(f"{indent}  body: {json.dumps(section['body'], ensure_ascii=False)},")
    if section.get("bullets"):
        parts.append(f"{indent}  bullets: [")
        for bullet in section["bullets"]:
            parts.append(f"{indent}    {json.dumps(bullet, ensure_ascii=False)},")
        parts.append(f"{indent}  ],")
    if section.get("example"):
        parts.append(f"{indent}  example: {json.dumps(section['example'], ensure_ascii=False)},")
    if section.get("sourceIds"):
        parts.append(f"{indent}  sourceIds: {json.dumps(section['sourceIds'], ensure_ascii=False)},")
    parts.append(f"{indent}}},")
    return "\n".join(parts)


def module_span(source: str, module_id: str):
    """Locate the module object literal whose id is module_id and which has sections."""
    for match in re.finditer(rf'id: "{re.escape(module_id)}",\s*\n\s*number: \d+,', source):
        start = source.rfind("{", 0, match.start())
        depth = 0
        for i in range(start, len(source)):
            if source[i] == "{":
                depth += 1
            elif source[i] == "}":
                depth -= 1
                if depth == 0:
                    return start, i + 1
    return None


def sections_end(block: str) -> int:
    """Index of the closing bracket of the module's `sections` array."""
    m = re.search(r"sections:\s*\[", block)
    if not m:
        raise SystemExit("no sections array")
    depth = 1
    i = m.end()
    in_str = False
    escape = False
    while depth:
        ch = block[i]
        if in_str:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == '"':
                in_str = False
        elif ch == '"':
            in_str = True
        elif ch in "[{":
            depth += 1
        elif ch in "]}":
            depth -= 1
            if depth == 0:
                return i
        i += 1
    raise SystemExit("unbalanced sections array")


def main() -> None:
    source = COURSE.read_text(encoding="utf8")
    added = 0
    for module_id, section in SECTIONS.items():
        span = module_span(source, module_id)
        if not span:
            raise SystemExit(f"module not found: {module_id}")
        start, end = span
        block = source[start:end]
        if section["heading"] in block:
            print(f"  skip {module_id} (already present)")
            continue
        cut = sections_end(block)
        # Match the indentation the surrounding entries already use.
        indent = "      "
        insertion = ts_literal(section, indent) + "\n" + " " * 4
        new_block = block[:cut] + insertion + block[cut:]
        source = source[:start] + new_block + source[end:]
        added += 1
        print(f"  + {module_id}: {section['heading']}")
    COURSE.write_text(source, encoding="utf8")
    print(f"inserted {added} section(s)")


if __name__ == "__main__":
    main()
