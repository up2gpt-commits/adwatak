#!/usr/bin/env python3
"""Process remaining ID tools that haven't been translated yet."""
import sys, os, json, re, urllib.request, time

sys.path.insert(0, '/home/ops123/adwatak')
from translate_id_tools import translate_file

REMAINING = [
    "paraphrasing-tool", "password-generator", "pdf-compressor", "pdf-merger",
    "pdf-splitter", "pdf-to-word", "percentage-calculator", "pixel-converter",
    "plagiarism-checker", "prayer-times", "profit-margin", "qibla-camera",
    "qibla-direction", "qr-generator", "qr-reader", "random-number",
    "salary-calculator", "seo-audit", "seo-content-generator",
    "social-character-counter", "stopwatch", "tasbeeh-counter",
    "temperature-converter", "text-case", "text-cleaner", "text-compare",
    "timezone-converter", "typing-test", "umrah-calculator", "unit-converter",
    "uuid-generator", "vat-calculator", "whatsapp-link", "word-counter",
    "youtube-thumbnail-downloader", "zakat-calculator"
]

TOOLS_DIR = "/home/ops123/adwatak/src/app/id/tools"
total = len(REMAINING)
success = 0
fail = 0

for i, tool in enumerate(REMAINING):
    filepath = os.path.join(TOOLS_DIR, tool, 'Client.tsx')
    if not os.path.exists(filepath):
        print(f"\n[{i+1}/{total}] {tool}... SKIP (no Client.tsx)")
        continue

    print(f"\n[{i+1}/{total}] {tool}...", end=" ", flush=True)

    # Try up to 3 times
    for attempt in range(3):
        try:
            result = translate_file(filepath)
            if result:
                print(f"  ✓ Done (attempt {attempt+1})", flush=True)
                success += 1
                break
            else:
                if attempt < 2:
                    print(f"  ⚠ Attempt {attempt+1} failed, retrying in 3s...", flush=True)
                    time.sleep(3)
        except Exception as e:
            if attempt < 2:
                print(f"  ⚠ Error: {e}, retrying in 5s...", flush=True)
                time.sleep(5)
    else:
        print(f"  ✗ FAILED after 3 attempts", flush=True)
        fail += 1

    time.sleep(1)

print(f"\n\n=== DONE ===")
print(f"Remaining: {total}, Success: {success}, Failed: {fail}")
