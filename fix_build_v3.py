#!/usr/bin/env python3
"""Surgical fix: inject missing declarations from EN template into corrupted ID/TR files.
Uses bracket counting for safe faqs extraction.
"""
import os

BASE = "/home/ops123/adwatak/src/app"

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

def extract_array_content(text, start_marker):
    """Extract array content between [ and matching ] using bracket counting.
    Returns the content including the surrounding [].
    """
    idx = text.find(start_marker)
    if idx == -1:
        return None
    
    # Find the opening [
    open_idx = text.find('[', idx + len(start_marker))
    if open_idx == -1:
        return None
    
    depth = 1
    i = open_idx + 1
    in_string = False
    string_char = None
    
    while i < len(text) and depth > 0:
        ch = text[i]
        
        # Handle string literals
        if not in_string and (ch == '"' or ch == "'" or ch == '`'):
            in_string = True
            string_char = ch
        elif in_string and ch == string_char:
            # Check for escaped quotes
            if i > 0 and text[i-1] != '\\':
                in_string = False
                string_char = None
        
        if not in_string:
            if ch == '[':
                depth += 1
            elif ch == ']':
                depth -= 1
        
        i += 1
    
    if depth != 0:
        return None
    
    return text[open_idx:i]

def fix_file(lang, tool):
    en_path = os.path.join(BASE, "en", "tools", tool, "Client.tsx")
    target_path = os.path.join(BASE, lang, "tools", tool, "Client.tsx")
    
    if not os.path.exists(en_path):
        print(f"  NO TEMPLATE: en/{tool}")
        return False
    if not os.path.exists(target_path):
        print(f"  NO TARGET: {lang}/{tool}")
        return False
    
    with open(en_path) as f:
        en = f.read()
    with open(target_path) as f:
        broken = f.read()
    
    # Extract translated faqs from broken file
    translated_faqs = extract_array_content(broken, "const faqs")
    if translated_faqs is None:
        print(f"  {lang}/{tool}: NO faqs in broken - using EN")
        translated_faqs = extract_array_content(en, "const faqs")
        if translated_faqs is None:
            print(f"  {lang}/{tool}: NO faqs in EN either!")
            return False
    
    # Find the faqs declaration in EN and replace
    en_faqs_start = en.find("const faqs")
    if en_faqs_start == -1:
        print(f"  {lang}/{tool}: const faqs not found in EN!")
        return False
    
    en_faqs_content = extract_array_content(en, "const faqs")
    if en_faqs_content is None:
        print(f"  {lang}/{tool}: Could not parse EN faqs!")
        return False
    
    en_faqs_end = en.find(en_faqs_content, en_faqs_start) + len(en_faqs_content)
    assert en[en_faqs_end] == ';', f"Expected ; after faqs at position {en_faqs_end}, got {repr(en[en_faqs_end])}"
    
    # Replace faqs content only (keep the "const faqs = " prefix and ";")
    new_content = (en[:en_faqs_start] + 
                   "const faqs = " + translated_faqs + 
                   en[en_faqs_end:])
    
    # Fix locale references (only in non-import parts)
    new_content = new_content.replace('lang="en"', f'lang="{lang}"')
    new_content = new_content.replace('/en/', f'/{lang}/')
    
    with open(target_path, 'w') as f:
        f.write(new_content)
    
    return True

success = 0
fail = 0
for lang, tools in BROKEN:
    for tool in tools:
        if fix_file(lang, tool):
            success += 1
        else:
            fail += 1
            print(f"  ❌ {lang}/{tool}")

print(f"\n=== ✅ {success} fixed, ❌ {fail} failed ===")
if fail == 0:
    print("Build now!")
