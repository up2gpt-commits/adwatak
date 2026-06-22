#!/usr/bin/env python3
"""Find inch-mark patterns in ID tool Client.tsx files."""
import os, re

tools_dir = "/home/ops123/adwatak/src/app/id/tools"

# Look for patterns like 5'10" - but this could be in different escaping
# Let's check raw content around "5'10" patterns
for tool in sorted(os.listdir(tools_dir)):
    fpath = os.path.join(tools_dir, tool, "Client.tsx")
    if not os.path.exists(fpath):
        continue
    with open(fpath) as f:
        content = f.read()
    
    # Check for "5'10
    idx = 0
    while True:
        idx = content.find("5'10", idx)
        if idx == -1:
            break
        print(f"\n=== {tool} at pos {idx} ===")
        print(repr(content[idx:idx+30]))
        idx += 1
    
    # Also check 6'2 or 6'3
    for pattern in ["6'2", "6'3", "4'11", "5'9", "5'8", "5'7", "5'6"]:
        idx = 0
        while True:
            idx = content.find(pattern, idx)
            if idx == -1:
                break
            print(f"\n=== {tool} at pos {idx} ({pattern}) ===")
            print(repr(content[idx:idx+25]))
            idx += 1
