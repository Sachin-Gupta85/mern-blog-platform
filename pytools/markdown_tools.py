#!/usr/bin/env python3
"""Content utilities for the blog (static-generation helpers).

Pure functions the blog can reuse to slugify titles, estimate reading time, and
build excerpts. Run as:

    python3 markdown_tools.py "My Post Title" "The body text..."
"""
from __future__ import annotations

import math
import re
import sys


def slugify(title: str) -> str:
    s = re.sub(r"[^a-z0-9\s-]", "", title.lower().strip())
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"-+", "-", s)
    return s.strip("-")


def reading_time(text: str, wpm: int = 200) -> int:
    """Whole minutes to read `text` at `wpm` words/minute (minimum 1 if non-empty)."""
    words = len(text.split())
    if words == 0:
        return 0
    return max(1, math.ceil(words / wpm))


def excerpt(text: str, limit: int = 160) -> str:
    text = " ".join(text.split())
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0]
    return f"{cut}…"


def main(argv: list[str]) -> int:
    if len(argv) < 1:
        sys.stderr.write('usage: markdown_tools.py "<title>" ["<body>"]\n')
        return 2
    title = argv[0]
    body = argv[1] if len(argv) > 1 else ""
    print(f"slug: {slugify(title)}")
    print(f"reading_time: {reading_time(body)} min")
    print(f"excerpt: {excerpt(body)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
