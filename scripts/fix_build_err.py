#!/usr/bin/env python3
"""Find the exact issue at specific positions in build-error files."""
files = {
    "calorie-calculator": 5541,
    "invoice-generator": (5, 3600),
    "password-generator": (54, 1776),
    "bmi-calculator": (1, 5200),
}

import os
base = "/home/ops123/adwatak/src/app/id/tools"

for tool, pos in files.items():
    fpath = os.path.join(base, tool, "Client.tsx")
    with open(fpath) as f:
        lines = f.readlines()
    
    if isinstance(pos, tuple):
        line_no, col = pos
    else:
        # Find which line has the relevant position
        char_count = 0
        line_no = 1
        for i, line in enumerate(lines):
            char_count += len(line)
            if char_count >= pos:
                line_no = i + 1
                break
        col = pos - (char_count - len(lines[line_no-1]))
    
    line = lines[line_no-1]
    print(f"\n=== {tool} (line {line_no}, col {col}) ===")
    start = max(0, col - 30)
    end = min(len(line), col + 30)
    print(f"Context: {repr(line[start:end])}")
    print(f"Raw char: {repr(line[col:col+1])} (code: {ord(line[col]) if col < len(line) else 'EOF'})")
