#!/usr/bin/env python3
"""Surgical fix: inject missing declarations from EN template into corrupted ID/TR files.
Preserves translated faqs, replaces missing relatedTools, seoContent, function wrapper, etc.
"""
import os
import re

BASE = "/home/ops123/adwatak/src/app"

# All broken files from build output
BROKEN = [
    # ID tools
    ("id", "bio-generator"), ("id", "bmi-calculator"), ("id", "calorie-calculator"),
    ("id", "car-installment"), ("id", "compound-interest"), ("id", "css-minifier"),
    ("id", "date-duration"), ("id", "emi-calculator"), ("id", "encryption-tool"),
    ("id", "gold-calculator"), ("id", "grammar-checker"), ("id", "image-compressor"),
    ("id", "image-resizer"), ("id", "image-to-text"), ("id", "installment-calculator"),
    ("id", "ip-lookup"), ("id", "markdown-editor"), ("id", "mortgage-calculator"),
    ("id", "number-to-words"), ("id", "paraphrasing-tool"), ("id", "pdf-compressor"),
    ("id", "pdf-merger"), ("id", "pdf-splitter"), ("id", "pdf-to-word"),
    ("id", "percentage-calculator"), ("id", "plagiarism-checker"), ("id", "qr-generator"),
    ("id", "random-number"), ("id", "seo-content-generator"), ("id", "hash-generator"),
    ("id", "json-formatter"), ("id", "loan-calculator"),
    # TR tools
    ("tr", "ai-essay-writer"), ("tr", "background-remover"), ("tr", "bio-generator"),
    ("tr", "css-minifier"), ("tr", "date-duration"), ("tr", "encryption-tool"),
    ("tr", "grammar-checker"), ("tr", "image-resizer"), ("tr", "markdown-editor"),
    ("tr", "mortgage-calculator"), ("tr", "paraphrasing-tool"), ("tr", "password-generator"),
    ("tr", "pdf-merger"), ("tr", "pdf-splitter"), ("tr", "temperature-converter"),
    ("tr", "hash-generator"), ("tr", "json-formatter"),
]

def fix_file(lang, tool):
    en_path = os.path.join(BASE, "en", "tools", tool, "Client.tsx")
    target_path = os.path.join(BASE, lang, "tools", tool, "Client.tsx")
    
    if not os.path.exists(en_path) or not os.path.exists(target_path):
        return False
    
    with open(en_path) as f:
        en = f.read()
    with open(target_path) as f:
        broken = f.read()
    
    # Strategy: take the EN template, replace:
    # 1. The faqs array content with the translated one
    # 2. Locale references ("en" -> lang)
    
    # Extract translated faqs from broken file
    faqs_match = re.search(r'const faqs\s*=\s*(\[[\s\S]*?\]);', broken)
    if not faqs_match:
        print(f"  {lang}/{tool}: NO faqs in broken file - using EN faqs")
        en_faqs = re.search(r'const faqs\s*=\s*(\[[\s\S]*?\]);', en)
        translated_faqs = en_faqs.group(1) if en_faqs else "[]"
    else:
        translated_faqs = faqs_match.group(1)
    
    # Replace faqs in EN template
    en_faqs_match = re.search(r'(const faqs\s*=\s*)(\[[\s\S]*?\]);', en)
    if en_faqs_match:
        new_content = en[:en_faqs_match.start(2)] + translated_faqs + en[en_faqs_match.end(2):]
    else:
        print(f"  {lang}/{tool}: NO faqs in EN template!")
        return False
    
    # Fix locale references
    new_content = new_content.replace('lang="en"', f'lang="{lang}"')
    new_content = new_content.replace('/en/', f'/{lang}/')
    new_content = new_content.replace('href="/en', 'href="/' + lang)
    
    # Fix import paths: from ../../ to ../../ for id/tr (same depth as en)
    # Actually the import paths are already correct in EN - same depth
    
    with open(target_path, 'w') as f:
        f.write(new_content)
    
    return True

success = 0
fail = 0
for lang, tool in BROKEN:
    if fix_file(lang, tool):
        success += 1
        print(f"  ✅ {lang}/{tool}")
    else:
        fail += 1
        print(f"  ❌ {lang}/{tool}")

print(f"\n=== Results: {success} fixed, {fail} failed ===")
