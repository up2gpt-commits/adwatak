#!/usr/bin/env python3
"""Translate last 14 English TR tools by extracting strings and API translation."""
import os, re, json, sys, socket, time
import urllib.request, urllib.error

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
MODEL = "accounts/fireworks/models/deepseek-v4-pro"
TR_DIR = "/home/ops123/adwatak/src/app/tr/tools/"

TOOLS = ["loan-calculator", "plagiarism-checker", "qibla-camera", "random-number",
         "salary-calculator", "stopwatch", "text-case", "text-cleaner", "text-compare",
         "unit-converter", "vat-calculator", "whatsapp-link", "youtube-thumbnail-downloader",
         "zakat-calculator"]

def call_api(prompt):
    socket.setdefaulttimeout(120)
    data = {"model": MODEL, "messages": [
        {"role": "system", "content": "Translate English to natural Turkish. Return ONLY valid JSON."},
        {"role": "user", "content": prompt}
    ], "temperature": 0.05, "max_tokens": 16000}
    req = urllib.request.Request(API_URL, data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {FIREWORKS_KEY}"})
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read())["choices"][0]["message"]["content"]
    except Exception as e:
        return None

def patch_file(fp, old, new):
    with open(fp) as f:
        c = f.read()
    if old in c:
        c = c.replace(old, new, 1)
        with open(fp, "w") as f:
            f.write(c)
        return True
    return False

def main():
    for i, tool in enumerate(TOOLS):
        fp = os.path.join(TR_DIR, tool, "Client.tsx")
        size = os.path.getsize(fp)
        print(f"[{i+1}/{len(TOOLS)}] {tool} ({size}B)...", end=" ", flush=True)
        
        with open(fp) as f:
            content = f.read()
        
        # Extract strings that need translation
        strings = {}
        
        h1 = re.search(r'<h1[^>]*>(.*?)</h1>', content)
        if h1:
            txt = h1.group(1).strip()
            if txt not in ("$1", "{T.title}"):
                strings["h1"] = txt
        
        # Breadcrumb
        bc = re.search(r'<Breadcrumb\s+category="([^"]+)"', content)
        if bc:
            strings["bc_cat"] = bc.group(1)
        
        bc2 = re.search(r'toolName="([^"]+)"', content)
        if bc2:
            strings["bc_tool"] = bc2.group(1)
        
        # Labels
        labels = re.findall(r'<label[^>]*>([^<]+)</label>', content)
        for j, lb in enumerate(labels[:5]):
            strings[f"lbl_{j}"] = lb
        
        # Buttons with meaningful text
        btns = re.findall(r'<button[^>]*>((?:(?!</button>).)*)</button>', content)
        for j, bt in enumerate(btns[:4]):
            bt_clean = re.sub(r'[\U0001F300-\U0001F9FF]', '', bt).strip()
            if len(bt_clean) > 3:
                strings[f"btn_{j}"] = bt_clean
        
        # Placeholders
        phs = re.findall(r'placeholder="([^"]*)"', content)
        for j, ph in enumerate(phs[:3]):
            if ph:
                strings[f"ph_{j}"] = ph
        
        # FAQ questions (first 2 to keep prompt small)
        faqs = re.search(r'const faqs = \[(.*?)\];', content, re.DOTALL)
        if faqs:
            qs = re.findall(r'question:\s*"([^"]+)"', faqs.group(1))
            for j, q in enumerate(qs[:2]):
                strings[f"faq_q{j}"] = q
        
        # schemaName
        sn = re.search(r'const schemaName\s*=\s*"([^"]+)"', content)
        if sn:
            strings["schema"] = sn.group(1)
        
        if not strings:
            print("SKIP (no strings)")
            continue
        
        # Translate
        prompt = f"Translate these to natural Turkish. Return JSON with same keys:\n{json.dumps(strings, ensure_ascii=False)}"
        result = call_api(prompt)
        if not result:
            print("FAIL (API)")
            continue
        
        try:
            m = re.search(r'\{[\s\S]*\}', result)
            trans = json.loads(m.group() if m else result)
        except:
            print("FAIL (parse)")
            continue
        
        patches = 0
        
        # Apply h1
        if "h1" in trans and "h1" in strings:
            old = strings["h1"]
            new = trans["h1"]
            if old != new and patch_file(fp, old, new):
                patches += 1
        
        # Breadcrumb
        if "bc_cat" in trans and "bc_cat" in strings:
            if patch_file(fp, f'category="{strings["bc_cat"]}"', f'category="{trans["bc_cat"]}"'):
                patches += 1
        if "bc_tool" in trans and "bc_tool" in strings:
            if patch_file(fp, f'toolName="{strings["bc_tool"]}"', f'toolName="{trans["bc_tool"]}"'):
                patches += 1
        
        # Labels
        for j in range(5):
            k = f"lbl_{j}"
            if k in trans and k in strings:
                if patch_file(fp, f">{strings[k]}<", f">{trans[k]}<"):
                    patches += 1
        
        # Buttons
        for j in range(4):
            k = f"btn_{j}"
            if k in trans and k in strings:
                if patch_file(fp, strings[k], trans[k]):
                    patches += 1
        
        # Placeholders
        for j in range(3):
            k = f"ph_{j}"
            if k in trans and k in strings:
                if patch_file(fp, f'placeholder="{strings[k]}"', f'placeholder="{trans[k]}"'):
                    patches += 1
        
        # FAQ questions
        for j in range(2):
            k = f"faq_q{j}"
            if k in trans and k in strings:
                if patch_file(fp, f'question: "{strings[k]}"', f'question: "{trans[k]}"'):
                    patches += 1
        
        # schemaName
        if "schema" in trans and "schema" in strings:
            if patch_file(fp, f'schemaName = "{strings["schema"]}"', f'schemaName = "{trans["schema"]}"'):
                patches += 1
        
        # Also change language codes
        with open(fp) as f:
            c = f.read()
        c = c.replace("'en'", "'tr'").replace('"en"', '"tr"')
        with open(fp, "w") as f:
            f.write(c)
        
        print(f"OK ({patches} patches)")
        time.sleep(1)

if __name__ == "__main__":
    main()
