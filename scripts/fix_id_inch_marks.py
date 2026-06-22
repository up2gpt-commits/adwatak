#!/usr/bin/env python3
"""Find and fix inch-mark issues in ID tool files."""
import os, re

tools_dir = "/home/ops123/adwatak/src/app/id/tools"

# Pattern: foot+inch like 5'10" 6'2" etc that breaks JS strings
# These appear inside double-quoted JS strings as inch marks
# We replace just the inch mark " with " inci" 
# Better: replace 'X" with 'X inci (remove the inch " mark)
inch_pattern = re.compile(r"(\d)'(\d)\"(\s)")

fixed = 0
for tool in sorted(os.listdir(tools_dir)):
    fpath = os.path.join(tools_dir, tool, "Client.tsx")
    if not os.path.exists(fpath):
        continue
    with open(fpath) as f:
        content = f.read()
    
    new_content = inch_pattern.sub(r"\1'\2 inci\3", content)
    
    if new_content != content:
        with open(fpath, 'w') as f:
            f.write(new_content)
        print(f"Fixed: {tool} ({tool})")
        fixed += 1

print(f"\nFixed {fixed} files total")
