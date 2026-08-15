#!/usr/bin/env python3
"""
Fill per-distractor feedback on the diagnostic questions.

Thirty of the 122 questions carried a rationale but no per-option note, so a
learner who chose a wrong answer was told what the right one was and never why
theirs was wrong. That explanation is where most of this course's teaching
actually happens.

Matched by question id; the note on the correct option stays empty, which is
the convention the renderer and the QA suite both rely on.
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGET = ROOT / "src" / "reference.ts"


def find_block(source, qid):
    at = source.find(f'id: "{qid}",')
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


def main():
    edits = json.loads(Path(sys.argv[1]).read_text(encoding="utf8"))
    src = TARGET.read_text(encoding="utf8")
    done = 0
    for qid, notes in edits.items():
        span = find_block(src, qid)
        if not span:
            raise SystemExit(f"not found: {qid}")
        start, end = span
        block = src[start:end]
        answer = int(re.search(r"answer:\s*(\d+)", block).group(1))
        if notes[answer].strip():
            raise SystemExit(f"{qid}: the correct option must have an empty note")
        literal = "optionNotes: [\n" + "".join(
            f"      {json.dumps(n, ensure_ascii=False)},\n" for n in notes
        ) + "    ]"
        if "optionNotes:" in block:
            new_block = re.sub(r"optionNotes:\s*\[[^\]]*\]", literal, block, count=1, flags=re.S)
        else:
            new_block = re.sub(r"(rationale:)", literal + ",\n    \\1", block, count=1)
        src = src[:start] + new_block + src[end:]
        done += 1
    TARGET.write_text(src, encoding="utf8")
    print(f"added notes to {done} questions")


if __name__ == "__main__":
    main()
