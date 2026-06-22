#!/usr/bin/env python3
"""Phase 4: Patch all SEO into tool files"""
import json, os, re, sys

BASE = "/home/ops123/adwatak/src/app"

# Load all translation data
with open("/tmp/seo_en.json") as f:
    EN = json.load(f)
with open("/tmp/seo_fr.json") as f:
    FR = json.load(f)
with open("/tmp/seo_tr.json") as f:
    TR = json.load(f)

# ID and AR might not exist yet
ID = {}
try:
    with open("/tmp/seo_id.json") as f:
        ID = json.load(f)
except: pass

AR = {}
try:
    with open("/tmp/seo_ar.json") as f:
        AR = json.load(f)
except: pass

MISSING = ["date-duration","encryption-tool","fidyah-kaffarah","ideal-weight","percentage-calculator","pixel-converter","prayer-times","qibla-direction","temperature-converter","timezone-converter","umrah-calculator"]
FR_EN = ["compound-interest","emi-calculator","gold-calculator","inheritance-calculator","installment-calculator","ip-lookup","loan-calculator","markdown-editor","mortgage-calculator","number-to-words","password-generator","pdf-to-word","seo-content-generator","uuid-generator","youtube-thumbnail-downloader"]
TR_EN = ["css-minifier","loan-calculator","plagiarism-checker","random-number","salary-calculator","seo-content-generator","stopwatch","text-case","text-cleaner","text-compare"]
ID_EN = ["css-minifier","image-compressor","ip-lookup","markdown-editor","text-cleaner","whatsapp-link","youtube-thumbnail-downloader"]
MISSING_AR = ["ai-essay-writer", "keyword-research"]

def patch_file(lang_dir, tool, items):
    """Patch seoContent array in a tool file with 'items' list."""
    path = f"{BASE}/{lang_dir}/tools/{tool}/Client.tsx"
    if not os.path.exists(path):
        print(f"  ⚠️  {path} not found")
        return False
    
    with open(path, "r") as f:
        c = f.read()
    
    # Build new seoContent
    items_str = ",\n".join(f'  "{x}"' for x in items)
    new_block = f"seoContent=[\n{items_str},\n];"
    
    # Find and replace existing seoContent or insert new
    old = re.search(r"seoContent\s*=\s*\[.+?\];", c, re.DOTALL)
    if old:
        c_new = c[:old.start()] + new_block + c[old.end():]
    else:
        # Insert before SEOContent component usage
        insert_before = "<SEOContent"
        pos = c.find(insert_before)
        if pos >= 0:
            c_new = c[:pos] + new_block + "\n\n      " + c[pos:]
        else:
            insert_before = "export default function"
            pos = c.find(insert_before)
            if pos >= 0:
                c_new = c[:pos] + new_block + "\n\n" + c[pos:]
            else:
                print(f"  ⚠️  Cannot find insert point in {tool}")
                return False
    
    with open(path, "w") as f:
        f.write(c_new)
    return True

patched = 0

print("="*60)
print("Patching EN (11 missing tools)")
print("="*60)
for tool in MISSING:
    if tool in EN:
        if patch_file("en", tool, EN[tool]):
            print(f"  ✅ EN/{tool}")
            patched += 1

print("\n" + "="*60)
print("Patching FR (15 English + 11 missing)")
print("="*60)
for tool in FR_EN + MISSING:
    if tool in FR:
        if patch_file("fr", tool, FR[tool]):
            print(f"  ✅ FR/{tool}")
            patched += 1

print("\n" + "="*60)
print("Patching TR (10 English + 11 missing)")
print("="*60)
for tool in TR_EN + MISSING:
    if tool in TR:
        if patch_file("tr", tool, TR[tool]):
            print(f"  ✅ TR/{tool}")
            patched += 1
    elif tool in EN:
        # Fallback to EN if TR not available
        if patch_file("tr", tool, EN[tool]):
            print(f"  ⚠️ TR/{tool} (EN fallback)")
            patched += 1

print("\n" + "="*60)
print("Patching ID (7 English + 11 missing)")
print("="*60)
for tool in ID_EN + MISSING:
    if tool in ID:
        if patch_file("id", tool, ID[tool]):
            print(f"  ✅ ID/{tool}")
            patched += 1
    elif tool in EN:
        # Fallback to EN if ID not available
        if patch_file("id", tool, EN[tool]):
            print(f"  ⚠️ ID/{tool} (EN fallback)")
            patched += 1

print("\n" + "="*60)
print("Patching AR (11 missing + ai-essay-writer + keyword-research)")
print("="*60)
for tool in MISSING + MISSING_AR:
    if tool in AR:
        if patch_file("(ar)", tool, AR[tool]):
            print(f"  ✅ AR/{tool}")
            patched += 1
    elif tool in EN:
        if patch_file("(ar)", tool, EN[tool]):
            print(f"  ⚠️ AR/{tool} (EN fallback)")
            patched += 1

print(f"\n{'='*60}")
print(f"TOTAL PATCHED: {patched}")
print("="*60)
