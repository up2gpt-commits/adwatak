#!/usr/bin/env python3
"""Fix \\" (double-escaped quotes) back to \" (single-escaped quotes) in JS files."""
import os, re

tools_dir = "/home/ops123/adwatak/src/app/id/tools"
fixed = 0

for tool in sorted(os.listdir(tools_dir)):
    fpath = os.path.join(tools_dir, tool, "Client.tsx")
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'rb') as f:
        raw = f.read()
    
    # Fix \\" → \" — this is the main bug from JSON round-tripping
    # But we have to be careful: \\\\" (4 backslashes + quote) should NOT be changed
    # Pattern: two backslashes followed by a double quote
    new_raw = raw.replace(b'\\\\"', b'\\"')
    
    # Also fix \\' → \' for single quotes
    new_raw = new_raw.replace(b"\\\\'", b"\\'")
    
    if new_raw != raw:
        with open(fpath, 'wb') as f:
            f.write(new_raw)
        print(f"Fixed: {tool}")
        fixed += 1

print(f"\nFixed {fixed} files total")
