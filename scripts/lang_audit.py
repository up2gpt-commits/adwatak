#!/usr/bin/env python3
"""
Comprehensive language audit for adwatak tools.
Checks each locale's tools for remaining English content.
"""
import os, re, json

LOCALES = {
    "tr": {"name": "Turkish", "keywords": ["ç","ğ","ı","ö","ş","ü","hesapla","aracı","oluşturucu","dönüştürücü"]},
    "fr": {"name": "French", "keywords": ["é","è","ê","ë","à","â","î","ô","û","ç","calculateur","convertisseur","générateur"]},
    "id": {"name": "Indonesian", "keywords": ["kalkulator","pengonversi","penghitung","pembuat","pemeriksa"]}
}

TOOLS_DIR = "/home/ops123/adwatak/src/app"
EN_DETECT = [
    r'\b(Calculator|Convert|Generate|Free Online|Online Tool|Check|Find|How|What|Why)\b',
    r'\b(Calculate|Convert|Generate|Reset)\b',
    r'\b(Enter (text|value|number|your))\b',
    r'\b(Paste (your|the))\b',
    r'\b(Copy to Clipboard|Download)\b',
    r'\b(Usage Guide|How to Use)\b',
    r'\b(Related Tools)\b',
    r'\b(Result|Results)\b',
    r'\b(our free online|this online tool|is a free)\b',
    r'\b(helps you|allows you to|simply enter)\b',
    r'\b(click the button|get instant)\b',
]

def has_english(text):
    """Check if text contains English UI phrases."""
    text_lower = text.lower()
    for pat in EN_DETECT:
        if re.search(pat, text):
            return True
    return False

def check_file( lang, tool_slug):
    """Check one tool file for English content."""
    fpath = f"{TOOLS_DIR}/{lang}/tools/{tool_slug}/Client.tsx"
    if not os.path.exists(fpath):
        return None
    
    with open(fpath) as f:
        content = f.read()
    
    issues = []
    
    # 1. H1 heading
    h1 = re.search(r'<h1[^>]*>([^<]+)</h1>', content)
    if h1:
        h1_text = h1.group(1).strip()
        # Remove emoji
        h1_clean = re.sub(r'[🌀-🗿🕌🔐⚖️🔥📈🌙⏱️🎂📏📝🖼️🔢🎲🏠📱💻🌐🔗♻📄💾⬆🗑🔄📋🆗🎉🔊👁✏🆕🗺🧭⚙💰👤📊⭐🏷📁🖨🆓👆📌💳🕋🎯🧮✅🆕📶🔍✂️📐🕑🧾⚡️🖌️]', '', h1_text).strip()
        if has_english(h1_clean) and len(h1_clean) > 3:
            issues.append(("h1", h1_text[:60]))
    
    # 2. Subtitle (p after h1)
    p = re.search(r'<h1[^>]*>.*?</h1>\s*<p[^>]*>([^<]+)</p>', content)
    if p:
        p_text = p.group(1).strip()
        if has_english(p_text):
            issues.append(("subtitle", p_text[:60]))
    
    # 3. Breadcrumb toolName
    bc = re.search(r'toolName="([^"]+)"', content)
    if bc:
        bc_text = bc.group(1)
        if has_english(bc_text):
            issues.append(("breadcrumb", bc_text[:60]))
    
    # 4. Buttons
    for m in re.finditer(r'<button[^>]*>((?:(?!</button>).)*)</button>', content):
        btn_text = m.group(1).strip()
        btn_clean = re.sub(r'[🌀-🗿✨⏳⬇]', '', btn_text).strip()
        if btn_clean and has_english(btn_clean) and len(btn_clean) > 2:
            # Skip state-based buttons with JSX
            if '{' not in btn_clean and '`' not in btn_clean:
                issues.append(("button", btn_clean[:60]))
    
    # 5. Labels
    for m in re.finditer(r'<label[^>]*>([^<]+)</label>', content):
        label = m.group(1).strip()
        if label and has_english(label) and '{' not in label:
            issues.append(("label", label[:60]))
    
    # 6. ShareButtons lang
    if re.search(r'ShareButtons\s+lang="en"', content):
        issues.append(("ShareButtons lang", "\"en\" instead of locale"))
    
    # 7. SEOContent / FAQSection / RelatedTools lang
    for comp in ["SEOContent", "FAQSection", "RelatedTools"]:
        m = re.search(rf'{comp}\s+content={{[^}}]+}}\s+lang="en"', content)
        if m:
            issues.append((f"{comp} lang", "\"en\" instead of locale"))
    
    # 8. Check for {{...}} template not translated (some hardcoded "en" in URLs)
    if re.search(r'adwatak\.cloud/en/tools', content):
        issues.append(("URL", "adwatak.cloud/en/... instead of locale"))
    
    # 9. Placeholder text
    for m in re.finditer(r'placeholder="([^"]+)"', content):
        ph = m.group(1)
        if has_english(ph) and not re.match(r'^\d+$', ph):
            issues.append(("placeholder", ph[:60]))
    
    return issues if issues else []

def main():
    for lang_code, lang_info in LOCALES.items():
        print(f"\n{'='*70}")
        print(f"📍 {lang_info['name']} ({lang_code}) — Audit")
        print(f"{'='*70}")
        
        tools_dir = f"{TOOLS_DIR}/{lang_code}/tools"
        if not os.path.exists(tools_dir):
            print(f"  ✗ Directory not found!")
            continue
        
        tools = sorted([d for d in os.listdir(tools_dir) 
                       if os.path.isdir(os.path.join(tools_dir, d))])
        
        total_issues = 0
        clean_tools = 0
        all_issues = {}
        
        for tool in tools:
            issues = check_file(lang_code, tool)
            if issues:
                all_issues[tool] = issues
                total_issues += len(issues)
            else:
                clean_tools += 1
        
        print(f"\n  Total tools: {len(tools)}")
        print(f"  ✅ Fully translated: {clean_tools}/{len(tools)}")
        print(f"  ❌ With English issues: {len(all_issues)}/{len(tools)}")
        print(f"  Total issues found: {total_issues}")
        
        if all_issues:
            print(f"\n  {'─'*60}")
            print(f"  DETAILED ISSUES:")
            print(f"  {'─'*60}")
            for tool, issues in sorted(all_issues.items()):
                print(f"\n  📄 {tool}:")
                for issue_type, detail in issues[:8]:  # max 8 per tool
                    print(f"    [{issue_type:25s}] {detail}")
                if len(issues) > 8:
                    print(f"    ... and {len(issues)-8} more issues")

if __name__ == "__main__":
    main()
