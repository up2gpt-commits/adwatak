#!/usr/bin/env python3
"""Fix corrupted semicolons in minified ID/TR Client.tsx files.
Problem: regex find-and-replace matched '];' INSIDE useState declarations
like 'const [birth, setBirth] = useState(...' deleting the semicolon.

Solution: For each broken ID/TR file, rebuild it from the EN template.
"""
import os
import re
import sys

BASE = "/home/ops123/adwatak/src/app"

# All broken files from build output
BROKEN = [
    # ID tools
    ("id", "bio-generator"),
    ("id", "bmi-calculator"),
    ("id", "calorie-calculator"),
    ("id", "car-installment"),
    ("id", "compound-interest"),
    ("id", "css-minifier"),
    ("id", "date-duration"),
    ("id", "emi-calculator"),
    ("id", "encryption-tool"),
    ("id", "gold-calculator"),
    ("id", "grammar-checker"),
    ("id", "image-compressor"),
    ("id", "image-resizer"),
    ("id", "image-to-text"),
    ("id", "installment-calculator"),
    ("id", "ip-lookup"),
    ("id", "markdown-editor"),
    ("id", "mortgage-calculator"),
    ("id", "number-to-words"),
    ("id", "paraphrasing-tool"),
    ("id", "pdf-compressor"),
    ("id", "pdf-merger"),
    ("id", "pdf-splitter"),
    ("id", "pdf-to-word"),
    ("id", "percentage-calculator"),
    ("id", "plagiarism-checker"),
    ("id", "qr-generator"),
    ("id", "random-number"),
    ("id", "seo-content-generator"),
    ("id", "hash-generator"),
    ("id", "json-formatter"),
    ("id", "loan-calculator"),
    # TR tools
    ("tr", "ai-essay-writer"),
    ("tr", "background-remover"),
    ("tr", "bio-generator"),
    ("tr", "css-minifier"),
    ("tr", "date-duration"),
    ("tr", "encryption-tool"),
    ("tr", "grammar-checker"),
    ("tr", "image-resizer"),
    ("tr", "markdown-editor"),
    ("tr", "mortgage-calculator"),
    ("tr", "paraphrasing-tool"),
    ("tr", "password-generator"),
    ("tr", "pdf-merger"),
    ("tr", "pdf-splitter"),
    ("tr", "temperature-converter"),
    ("tr", "hash-generator"),  # line 4
    ("tr", "json-formatter"),  # line 1:490
]

def fix_file(lang, tool):
    path = os.path.join(BASE, lang, "tools", tool, "Client.tsx")
    if not os.path.exists(path):
        print(f"  MISSING: {lang}/{tool}")
        return False
    
    # Read the broken file
    with open(path) as f:
        content = f.read()
    
    # Find ALL lines that end with ); or ]); without semicolon
    # Actually simpler: find every line that has ) but no semicolon at end
    # and add it back
    lines = content.split('\n')
    fixed = []
    changes = 0
    
    for line in lines:
        stripped = line.rstrip()
        # If line ends with ")" but not ");" and not "]" and not "};"
        # and doesn't end with , or { or ( 
        if re.search(r'\)\s*$', stripped) and not stripped.rstrip().endswith(');'):
            # Check this is actually a statement end, not a function signature
            # If line has export, function, if, for, while, switch - skip
            skip_keywords = ['export', 'function', 'if ', 'for ', 'while ', 'switch', 'return']
            should_skip = any(kw in stripped for kw in skip_keywords)
            if not should_skip and '{' not in stripped:
                fixed.append(stripped + ';')
                changes += 1
                continue
        
        fixed.append(stripped)
    
    if changes > 0:
        with open(path, 'w') as f:
            f.write('\n'.join(fixed))
        print(f"  {lang}/{tool}: +{changes} semicolons")
        return True
    else:
        print(f"  {lang}/{tool}: no change needed")
        return False

def fix_from_template(lang, tool):
    """If simple fix doesn't work, rebuild from EN template."""
    en_path = os.path.join(BASE, "en", "tools", tool, "Client.tsx")
    target_path = os.path.join(BASE, lang, "tools", tool, "Client.tsx")
    
    if not os.path.exists(en_path):
        print(f"  NO TEMPLATE: en/{tool}")
        return False
    
    with open(en_path) as f:
        en_content = f.read()
    
    # Replace 'en' locale references with target lang
    lang_content = en_content.replace('"en"', f'"{lang}"')
    lang_content = lang_content.replace("'en'", f"'{lang}'")
    lang_content = lang_content.replace('/en/', f'/{lang}/')
    
    with open(target_path, 'w') as f:
        f.write(lang_content)
    
    print(f"  {lang}/{tool}: rebuilt from EN template")
    return True

# First pass: try simple semicolon fix
print("=== Pass 1: Fix semicolons ===")
fixed_any = False
for lang, tool in BROKEN:
    if fix_file(lang, tool):
        fixed_any = True

if not fixed_any:
    print("No simple fixes worked, trying template rebuild...")
    # Second pass: rebuild from EN
    for lang, tool in BROKEN:
        fix_from_template(lang, tool)
else:
    print(f"\nFixed semicolons on {sum(1 for l,t in BROKEN if os.path.exists(os.path.join(BASE,l,'tools',t,'Client.tsx')) and fix_file(l,t))} files")

print("\nDone!")
