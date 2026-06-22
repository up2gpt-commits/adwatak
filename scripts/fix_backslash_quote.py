#!/usr/bin/env python3
"""Fix className=\" → className=\" and similar backslash-before-quote issues in JSX files."""
import os, re

tools_dir = "/home/ops123/adwatak/src/app/id/tools"
fixed = 0

for tool in sorted(os.listdir(tools_dir)):
    fpath = os.path.join(tools_dir, tool, "Client.tsx")
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'rb') as f:
        raw = f.read()
    
    new_raw = raw
    
    # Fix className=\" → className=" 
    # Pattern: `=\\"` (0x3d 0x5c 0x22) → `="` (0x3d 0x22)
    new_raw = new_raw.replace(b'=\\"', b'="')
    
    # Fix other similar issues where a backslash is before a " in JSX attr context
    # Like placeholder=\\" → placeholder="
    new_raw = new_raw.replace(b'=\\"', b'="')
    
    # Also fix htmlFor=\\" → htmlFor="
    # already covered by above
    
    # Fix any remaining backslash+quote that shouldn't be there in JSX
    # Pattern in regular JSX: `=\\"` is wrong, should be `="`
    # We already handled this above
    
    if new_raw != raw:
        with open(fpath, 'wb') as f:
            f.write(new_raw)
        print(f"Fixed: {tool}")
        fixed += 1

print(f"\nFixed {fixed} files total")
