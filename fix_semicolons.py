#!/usr/bin/env python3
"""The EXACT fix: add missing semicolons after ] before const/export/return.
The corrupted files have: }]const relatedTools = [
Should be: }];\nconst relatedTools = [
"""
import os
import re

BASE = "/home/ops123/adwatak/src/app"

BROKEN = [
    # ID
    "src/app/id/tools/age-calculator/Client.tsx",
    "src/app/id/tools/ai-content-detector/Client.tsx",
    "src/app/id/tools/ai-essay-writer/Client.tsx",
    "src/app/id/tools/arabic-lorem/Client.tsx",
    "src/app/id/tools/background-remover/Client.tsx",
    "src/app/id/tools/base64-encoder/Client.tsx",
    # TR
    "src/app/tr/tools/hash-generator/Client.tsx",
    "src/app/tr/tools/image-compressor/Client.tsx",
    "src/app/tr/tools/ip-lookup/Client.tsx",
    "src/app/tr/tools/loan-calculator/Client.tsx",
    "src/app/tr/tools/pdf-compressor/Client.tsx",
    "src/app/tr/tools/pdf-to-word/Client.tsx",
    "src/app/tr/tools/percentage-calculator/Client.tsx",
    "src/app/tr/tools/qr-generator/Client.tsx",
    "src/app/tr/tools/random-number/Client.tsx",
    "src/app/tr/tools/seo-audit/Client.tsx",
    "src/app/tr/tools/seo-content-generator/Client.tsx",
    "src/app/tr/tools/stopwatch/Client.tsx",
    "src/app/tr/tools/typing-test/Client.tsx",
    "src/app/tr/tools/unit-converter/Client.tsx",
]

count = 0
for rel_path in BROKEN:
    path = os.path.join(BASE, rel_path) if not rel_path.startswith('/') else rel_path
    if rel_path.startswith('src/'):
        path = os.path.join('/home/ops123/adwatak', rel_path)
    
    if not os.path.exists(path):
        print(f"MISSING: {rel_path}")
        continue
    
    with open(path) as f:
        c = f.read()
    
    original = c
    
    # Fix 1: ]const -> ];\nconst (missing semicolon before const declaration)
    c = re.sub(r'\](?=\s*const\s)', '];', c)
    
    # Fix 2: ]export -> ];\nexport (missing semicolon before export)
    c = re.sub(r'\](?=\s*export\s)', '];', c)
    
    # Fix 3: ]return -> ];\nreturn (missing semicolon before return - shouldn't happen but safe)
    c = re.sub(r'\](?=\s*return\s)', '];', c)
    
    if c != original:
        with open(path, 'w') as f:
            f.write(c)
        count += 1
        print(f"  ✅ {rel_path}")
    else:
        print(f"  ➖ {rel_path} (no change)")

print(f"\n=== {count} files fixed ===")
