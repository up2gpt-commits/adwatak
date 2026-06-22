#!/usr/bin/env python3
"""
Comprehensive fix for remaining English issues in all three locales.
Targets: Turkish (3 tools), French (33), Indonesian (46)
"""
import os, re, json, urllib.request, time

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
BASE = "/home/ops123/adwatak/src/app"

def call_fireworks(prompt):
    data = {
        "model": "accounts/fireworks/models/deepseek-v4-pro",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.05,
        "max_tokens": 8000
    }
    req = urllib.request.Request(
        "https://api.fireworks.ai/inference/v1/chat/completions",
        data=json.dumps(data).encode('utf-8'),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {FIREWORKS_KEY}"}
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read())["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"  ⚠ API error: {e}")
        return None

def fix_tr():
    """Fix Turkish: 3 buttons"""
    fixes = {
        "gold-calculator": ("Calculate", "Hesapla"),
        "loan-calculator": ("Calculate", "Hesapla"),
        "color-converter": ("Convert", "Dönüştür"),
    }
    for tool, (old, new) in fixes.items():
        fpath = f"{BASE}/tr/tools/{tool}/Client.tsx"
        with open(fpath) as f:
            content = f.read()
        # Replace button text - need to find the actual button
        # Find the button that contains 'old' text
        for m in re.finditer(r'<button[^>]*>((?:(?!</button>).)*)</button>', content):
            btn_text = m.group(1)
            if old in btn_text and '{' not in btn_text and '`' not in btn_text:
                old_tag = m.group(0)
                new_tag = old_tag.replace(btn_text, new)
                content = content.replace(old_tag, new_tag, 1)
                break
        with open(fpath, 'w') as f:
            f.write(content)
        print(f"  ✓ tr/{tool}: button '{old}' → '{new}'")

def fix_lang_tags(locale):
    """Fix lang='en' → lang='<locale>' in SEOContent, FAQSection, RelatedTools, ShareButtons"""
    tools_dir = f"{BASE}/{locale}/tools"
    fixed = 0
    for tool in os.listdir(tools_dir):
        fpath = os.path.join(tools_dir, tool, "Client.tsx")
        if not os.path.exists(fpath):
            continue
        with open(fpath) as f:
            content = f.read()
        new_content = content
        for comp in ["SEOContent", "FAQSection", "RelatedTools"]:
            new_content = re.sub(
                rf'({comp}\s+content={{[^}}]+}}\s+)lang="en"',
                rf'\1lang="{locale}"',
                new_content
            )
        new_content = re.sub(r'(ShareButtons\s+)lang="en"', rf'\1lang="{locale}"', new_content)
        if new_content != content:
            with open(fpath, 'w') as f:
                f.write(new_content)
            fixed += 1
    print(f"  Fixed lang= tags in {fixed} {locale} tools")
    return fixed

def fix_schema_urls(locale):
    """Fix adwatak.cloud/en/ → adwatak.cloud/{locale}/ in schema URLs"""
    tools_dir = f"{BASE}/{locale}/tools"
    fixed = 0
    for tool in os.listdir(tools_dir):
        fpath = os.path.join(tools_dir, tool, "Client.tsx")
        if not os.path.exists(fpath):
            continue
        with open(fpath) as f:
            content = f.read()
        # Fix schemaUrl
        new_content = content.replace(f'https://adwatak.cloud/en/tools/{tool}', f'https://adwatak.cloud/{locale}/tools/{tool}')
        # Fix adwatak.cloud/en in breadcrumb URLs
        new_content = new_content.replace('url: "https://adwatak.cloud/en"', f'url: "https://adwatak.cloud/{locale}"')
        new_content = new_content.replace('url: "https://adwatak.cloud/en/', f'url: "https://adwatak.cloud/{locale}/')
        new_content = new_content.replace(f'https://adwatak.cloud/en/category/', f'https://adwatak.cloud/{locale}/category/')
        # Fix schemaName - should be translated already but fix "en" locale in toolSchema
        new_content = re.sub(r"toolSchema\(([^,]+),\s*'en'", f"toolSchema(\\1, '{locale}'", new_content)
        
        if new_content != content:
            with open(fpath, 'w') as f:
                f.write(new_content)
            fixed += 1
    print(f"  Fixed schema URLs in {fixed} {locale} tools")
    return fixed

def extract_issues(content, locale_keywords):
    """Extract English UI strings from a tool file."""
    issues = []
    
    # Breadcrumb
    bc = re.search(r'toolName="([^"]+)"', content)
    if bc:
        bt = bc.group(1)
        if not any(kw in bt.lower() for kw in locale_keywords):
            issues.append(("breadcrumb", bt, f'toolName="{bt}"'))
    
    # H1
    h1 = re.search(r'<h1[^>]*>([^<]+)</h1>', content)
    if h1:
        h1_raw = h1.group(1).strip()
        ht = re.sub(r'[🌀-🗿🕌🔐⚖️🔥📈🌙⏱️🎂📏📝🖼️🔢🎲🏠📱💻🌐🔗♻📄💾⬆🗑🔄📋🆗🎉🔊👁✏🆕🗺🧭⚙💰👤📊⭐🏷📁🖨🆓👆📌💳🕋🎯🧮✅🆕📶🔍✂️📐🕑🧾⚡🖌]', '', h1_raw).strip()
        if len(ht) > 3 and re.search(r'^(Calculator|Convert|Generate|Free|Online|Tool|Check|Find|How|What|Why|The |Best |Top |[A-Z][a-z]+ (Calculator|Converter|Generator|Checker|Counter|Editor|Extractor|Lookup))', ht):
            issues.append(("h1", ht, h1_raw))
    
    # Subtitle
    p = re.search(r'<h1[^>]*>.*?</h1>\s*<p[^>]*>([^<]+)</p>', content)
    if p:
        pt = p.group(1).strip()
        if any(pat in pt.lower() for pat in ['calculate', 'convert ', 'generate ', 'check ', 'find ', 'your ', 'between ']):
            if not any(kw in pt.lower() for kw in locale_keywords):
                issues.append(("subtitle", pt, None))
    
    # Buttons
    for m in re.finditer(r'<button[^>]*>((?:(?!</button>).)*)</button>', content):
        bt = m.group(1).strip()
        bc_clean = re.sub(r'[🌀-🗿✨⏳⬇↺]', '', bt).strip()
        if bc_clean and len(bc_clean) > 3 and '{' not in bc_clean and '`' not in bc_clean:
            if not any(kw in bc_clean.lower() for kw in locale_keywords):
                if re.search(r'^(Calculate|Convert|Generate|Reset|Download|Copy|Paste|Enter|Check|Find|Search|Upload|Analyze|Remove|Start|Stop|Open|Close)',
                           bc_clean.strip(), re.IGNORECASE):
                    issues.append(("button", bc_clean, bt))
    
    return [i for i in issues if i[0] != 'breadcrumb' or i[1] not in locale_keywords]

def fix_locale(locale, keywords, name):
    """Fix remaining English issues in one locale."""
    tools_dir = f"{BASE}/{locale}/tools"
    total_fixed = 0
    
    for tool in sorted(os.listdir(tools_dir)):
        fpath = os.path.join(tools_dir, tool, "Client.tsx")
        if not os.path.exists(fpath):
            continue
        
        with open(fpath) as f:
            content = f.read()
        
        issues = extract_issues(content, keywords + [locale, 'kalkulator', 'pengonversi', 'penghitung', 'pembuat', 'pemeriksa'])
        
        if not issues:
            continue
        
        # Build translation prompt for this tool
        to_translate = {}
        for issue_type, eng_text, orig_text in issues:
            key = f"{issue_type}_{len(to_translate)}"
            to_translate[key] = {"type": issue_type, "text": eng_text, "orig": orig_text}
        
        texts_only = {k: v["text"] for k, v in to_translate.items()}
        
        prompt = f"""Translate these English UI strings to {name} (Bahasa {name}).
Keep all formatting, emoji, special characters exactly as they are.
Do NOT translate domain names (Adwatak, Adawatak) or URLs.
Translate naturally for a tool website.
Return ONLY valid JSON with the same keys.

{json.dumps(texts_only, ensure_ascii=False, indent=2)}"""
        
        result = call_fireworks(prompt)
        if not result:
            print(f"  ✗ {locale}/{tool}: API failed")
            continue
        
        try:
            json_match = re.search(r'\{[\s\S]*\}', result)
            translations = json.loads(json_match.group()) if json_match else json.loads(result)
        except Exception as e:
            print(f"  ✗ {locale}/{tool}: JSON parse error: {e}")
            continue
        
        # Apply translations
        new_content = content
        tool_fixed = 0
        
        for key, trans_info in to_translate.items():
            if key not in translations:
                continue
            translated = translations[key]
            eng_text = trans_info["text"]
            issue_type = trans_info["type"]
            
            if issue_type == "breadcrumb":
                old_str = f'toolName="{eng_text}"'
                new_str = f'toolName="{translated}"'
                new_content = new_content.replace(old_str, new_str, 1)
                tool_fixed += 1
                
            elif issue_type == "h1":
                old_str = f'>{eng_text}<'
                # Some h1 have emoji prefix - try matching with original or cleaned
                new_content = new_content.replace(f'>{trans_info.get("orig", eng_text)}<', f'>{translated}<', 1)
                if old_str in new_content:
                    new_content = new_content.replace(old_str, f'>{translated}<', 1)
                tool_fixed += 1
                
            elif issue_type == "button":
                # Replace button with old text
                new_content = new_content.replace(f'>{eng_text}<', f'>{translated}<', 1)
                tool_fixed += 1
                
            elif issue_type == "subtitle":
                p_tag = re.search(r'<h1[^>]*>.*?</h1>\s*<p[^>]*>([^<]+)</p>', new_content, re.DOTALL)
                if p_tag and p_tag.group(1) == eng_text:
                    new_content = new_content.replace(p_tag.group(0), 
                        p_tag.group(0).replace(f'>{eng_text}<', f'>{translated}<'), 1)
                    tool_fixed += 1
        
        if tool_fixed > 0:
            with open(fpath, 'w') as f:
                f.write(new_content)
            print(f"  ✓ {locale}/{tool}: {tool_fixed} fixes ({', '.join([t[2][:30] if t[2] else t[1][:30] for t in issues[:3]])})")
            total_fixed += tool_fixed
            time.sleep(0.3)
    
    print(f"  → {locale}: Fixed {total_fixed} strings total")
    return total_fixed

if __name__ == "__main__":
    print("=" * 60)
    print("STEP 1: Fix Turkish buttons")
    print("=" * 60)
    fix_tr()
    
    print("\n" + "=" * 60)
    print("STEP 2: Fix lang= tags (all locales)")
    print("=" * 60)
    for loc in ["tr", "fr", "id"]:
        fix_lang_tags(loc)
    
    print("\n" + "=" * 60)
    print("STEP 3: Fix schema URLs (all locales)")
    print("=" * 60)
    for loc in ["tr", "id"]:
        fix_schema_urls(loc)
    
    print("\n" + "=" * 60)
    print("STEP 4: Fix French remaining strings")
    print("=" * 60)
    fix_locale("fr", ["é","è","ê","ë","à","â","î","ô","û","ç","calculateur","convertisseur",
                      "générateur","vérificateur","analyseur","extracteur","suppresseur",
                      "compteur","éditeur","convertissez","générez","calculez","réinitialiser"],
               "French")
    
    print("\n" + "=" * 60)
    print("STEP 5: Fix Indonesian remaining strings")
    print("=" * 60)
    fix_locale("id", ["kalkulator","pengonversi","penghitung","pembuat","pemeriksa",
                      "pembersih","penghasil","pengubah","pengompres","pemisah",
                      "penggabung","penerjemah","penganalisis","alat","gratis",
                      "masukkan","hasil","hitung","konversi","hasilkan","salin",
                      "unduh","pilih","beranda","tahun","bulan","hari","nama",
                      "bagaimana","apa","mengapa","terkait","pertanyaan"],
               "Indonesian")
    
    print("\n" + "=" * 60)
    print("DONE! All fixes applied.")
    print("=" * 60)
