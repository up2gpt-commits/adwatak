#!/usr/bin/env python3
"""Rebuild ALL ID/TR tool files from EN templates.
Clean slate — safe, working structure.
Translations can be re-done later.
"""
import os

BASE = "/home/ops123/adwatak/src/app"
LANGS = ["id", "tr"]

# All tools to rebuild (from tools dir listing)
en_tools = sorted(os.listdir(os.path.join(BASE, "en", "tools")))
print(f"Found {len(en_tools)} EN tools")

total = 0
for lang in LANGS:
    lang_dir = os.path.join(BASE, lang, "tools")
    for tool in en_tools:
        en_path = os.path.join(BASE, "en", "tools", tool, "Client.tsx")
        target_path = os.path.join(lang_dir, tool, "Client.tsx")
        
        if not os.path.exists(en_path) or not os.path.exists(target_path):
            continue
        
        with open(en_path) as f:
            content = f.read()
        
        # Fix locale references
        content = content.replace('lang="en"', f'lang="{lang}"')
        content = content.replace('/en/', f'/{lang}/')
        
        with open(target_path, 'w') as f:
            f.write(content)
        
        total += 1
    
    print(f"  {lang}: {total} files (cumulative)")

print(f"\n=== Total: {total} files rebuilt from EN ===")
