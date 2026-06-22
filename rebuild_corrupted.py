#!/usr/bin/env python3
"""Rebuild corrupted ID/TR Client.tsx files from EN template.
Files were corrupted by regex find-and-replace that deleted
the function wrapper and export default statements.
"""
import os
import re

BASE = "/home/ops123/adwatak/src/app"

# All broken files from build output  
BROKEN = [
    ("id", ["bio-generator", "bmi-calculator", "calorie-calculator", "car-installment",
              "compound-interest", "css-minifier", "date-duration", "emi-calculator",
              "encryption-tool", "gold-calculator", "grammar-checker", "image-compressor",
              "image-resizer", "image-to-text", "installment-calculator", "ip-lookup",
              "markdown-editor", "mortgage-calculator", "number-to-words", "paraphrasing-tool",
              "pdf-compressor", "pdf-merger", "pdf-splitter", "pdf-to-word",
              "percentage-calculator", "plagiarism-checker", "qr-generator", "random-number",
              "seo-content-generator", "hash-generator", "json-formatter", "loan-calculator"]),
    ("tr", ["ai-essay-writer", "background-remover", "bio-generator", "css-minifier",
              "date-duration", "encryption-tool", "grammar-checker", "image-resizer",
              "markdown-editor", "mortgage-calculator", "paraphrasing-tool",
              "password-generator", "pdf-merger", "pdf-splitter", "temperature-converter",
              "hash-generator", "json-formatter"]),
]

total = 0
for lang, tools in BROKEN:
    for tool in tools:
        en_path = os.path.join(BASE, "en", "tools", tool, "Client.tsx")
        target_path = os.path.join(BASE, lang, "tools", tool, "Client.tsx")
        
        if not os.path.exists(en_path):
            print(f"MISSING TEMPLATE: en/{tool}")
            continue
        
        with open(en_path) as f:
            en_content = f.read()
        
        # Replace locale references
        lang_content = en_content.replace('lang="en"', f'lang="{lang}"')
        lang_content = lang_content.replace('/en/', f'/{lang}/')
        lang_content = lang_content.replace('href="/en', 'href="/' + lang)
        
        with open(target_path, 'w') as f:
            f.write(lang_content)
        
        total += 1
        print(f"  REBUILT: {lang}/{tool}")

print(f"\n=== Rebuilt {total} files from EN templates ===")
