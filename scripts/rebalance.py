#!/usr/bin/env python3
"""
Apply distractor rewrites by question id and option index.

Written because the option-length tell had to be fixed across ~129 questions
spread over two large source files, and hand-editing at that volume is how you
introduce the kind of silent misalignment that has bitten this bank twice
before (options rotated without their notes; a rewrite running past the end of
one array into the next).

Everything is matched by question id and verified after writing: the option at
that index must equal the new text, and the question's `answer` index must not
have moved.

Usage:  python3 scripts/rebalance.py edits.json
        edits.json = [{"id": "...", "option": 2, "text": "..."}, ...]
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILES = [ROOT / "src" / "course.ts", ROOT / "src" / "reference.ts"]


def find_block(source: str, qid: str):
    """Return (start, end) of the object literal for the question with this id."""
    marker = f'id: "{qid}",'
    at = source.find(marker)
    if at < 0:
        return None
    start = source.rfind("{", 0, at)
    depth = 0
    for i in range(start, len(source)):
        if source[i] == "{":
            depth += 1
        elif source[i] == "}":
            depth -= 1
            if depth == 0:
                return start, i + 1
    return None


def split_options(block: str):
    """
    Return (start, end, [raw items]) for the options array.

    Splits on commas at depth 1 *outside string literals*. The first version of
    this ignored strings, so an option containing a comma — "Successful
    self-service, avoidable status-call rate, ..." — was torn into three items
    and the file stopped parsing. Options here routinely contain commas.
    """
    m = re.search(r"options:\s*\[", block)
    if not m:
        raise SystemExit("no options array")
    i = m.end()
    depth = 1
    in_str = False
    escape = False
    items, buf = [], ""
    while True:
        ch = block[i]
        if in_str:
            buf += ch
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == '"':
                in_str = False
            i += 1
            continue
        if ch == '"':
            in_str = True
            buf += ch
        elif ch in "[{":
            depth += 1
            buf += ch
        elif ch in "]}":
            depth -= 1
            if depth == 0:
                items.append(buf)
                break
            buf += ch
        elif ch == "," and depth == 1:
            items.append(buf)
            buf = ""
        else:
            buf += ch
        i += 1
    return m.end(), i, [x for x in items if x.strip()]


def replace_option(block: str, index: int, text: str) -> str:
    start, end, items = split_options(block)
    if index >= len(items):
        raise SystemExit(f"option {index} out of range ({len(items)} options)")
    items[index] = " " + json.dumps(text, ensure_ascii=False)
    return block[:start] + ",".join(items) + block[end:]


def verify(block: str, index: int, text: str) -> bool:
    _, _, items = split_options(block)
    try:
        return json.loads(items[index].strip()) == text
    except Exception:
        return False


def main() -> None:
    edits = json.loads(Path(sys.argv[1]).read_text(encoding="utf8"))
    by_file = {f: f.read_text(encoding="utf8") for f in FILES}
    applied = 0
    for edit in edits:
        done = False
        for f in FILES:
            src = by_file[f]
            span = find_block(src, edit["id"])
            if not span:
                continue
            start, end = span
            before = src[start:end]
            after = replace_option(before, edit["option"], edit["text"])
            if not verify(after, edit["option"], edit["text"]):
                raise SystemExit(f"verification failed for {edit['id']} option {edit['option']}")
            if re.search(r"answer:\s*(\d+)", before).group(1) != re.search(r"answer:\s*(\d+)", after).group(1):
                raise SystemExit(f"answer index moved on {edit['id']}")
            by_file[f] = src[:start] + after + src[end:]
            done = True
            applied += 1
            break
        if not done:
            raise SystemExit(f"question id not found: {edit['id']}")
    for f, src in by_file.items():
        f.write_text(src, encoding="utf8")
    print(f"applied {applied} option rewrites")


if __name__ == "__main__":
    main()
