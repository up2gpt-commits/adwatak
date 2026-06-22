#!/usr/bin/env python3
"""SEO Fix Script — run with python3 -u for live output"""
import sys
import json, os, time, requests, re

FW_KEY = "fw_KSKFwcCdYKh79ZnzQS24Yc"
FW_URL = "https://api.fireworks.ai/inference/v1/chat/completions"

BASE = "/home/ops123/adwatak/src/app"

MISSING_TOOLS = [
    "date-duration", "encryption-tool", "fidyah-kaffarah", "ideal-weight",
    "percentage-calculator", "pixel-converter", "prayer-times", "qibla-direction",
    "temperature-converter", "timezone-converter", "umrah-calculator"
]
MISSING_AR_ONLY = ["ai-essay-writer", "keyword-research"]

FR_ENGLISH = [
    "compound-interest", "emi-calculator", "gold-calculator", "inheritance-calculator",
    "installment-calculator", "ip-lookup", "loan-calculator", "markdown-editor",
    "mortgage-calculator", "number-to-words", "password-generator", "pdf-to-word",
    "seo-content-generator", "uuid-generator", "youtube-thumbnail-downloader"
]
TR_ENGLISH = [
    "css-minifier", "loan-calculator", "plagiarism-checker", "random-number",
    "salary-calculator", "seo-content-generator", "stopwatch", "text-case",
    "text-cleaner", "text-compare"
]
ID_ENGLISH = [
    "css-minifier", "image-compressor", "ip-lookup", "markdown-editor",
    "text-cleaner", "whatsapp-link", "youtube-thumbnail-downloader"
]

def extract_seo(lang, tool):
    path = f"{BASE}/{lang}/tools/{tool}/Client.tsx"
    if not os.path.exists(path):
        return None
    with open(path, 'r') as f:
        c = f.read()
    m = re.search(r'seoContent\s*=\s*\[(.+?)\];', c, re.DOTALL)
    if not m:
        return None
    items = re.findall(r'"([^"]*)"', m.group(1))
    return [x for x in items if x.strip()]

def patch_seo(lang, tool, new_items):
    path = f"{BASE}/{lang}/tools/{tool}/Client.tsx"
    with open(path, 'r') as f:
        c = f.read()
    items_str = ",\n".join(f'  "{x}"' for x in new_items)
    new_block = f"seoContent=[\n{items_str},\n];"
    old = re.search(r'seoContent\s*=\s*\[.+?\];', c, re.DOTALL)
    if old:
        c_new = c[:old.start()] + new_block + c[old.end():]
    else:
        insert_before = "export default function"
        pos = c.find(insert_before)
        if pos == -1:
            insert_before = "<SEOContent"
            pos = c.find(insert_before)
        if pos == -1:
            print(f"  WARN: Cannot find in {lang}/{tool}", flush=True)
            return False
        c_new = c[:pos] + f"const {new_block}\n\n" + c[pos:]
    with open(path, 'w') as f:
        f.write(c_new)
    return True

def call_fireworks(messages, max_tokens=4000, temp=0.3):
    headers = {
        "Authorization": f"Bearer {FW_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "accounts/fireworks/models/deepseek-v4-pro",
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temp
    }
    start = time.time()
    try:
        r = requests.post(FW_URL, headers=headers, json=data, timeout=180)
        elapsed = time.time()-start
        if r.status_code == 200:
            print(f"  API OK ({elapsed:.0f}s)", flush=True)
            return r.json()["choices"][0]["message"]["content"]
        else:
            print(f"  API ERROR {r.status_code} ({elapsed:.0f}s): {r.text[:200]}", flush=True)
            return None
    except Exception as e:
        print(f"  EXCEPTION: {e}", flush=True)
        return None

translations = {"fr": {}, "tr": {}, "id": {}, "ar": {}}

# Phase 1: Read EN SEO
print("="*60, flush=True)
print("PHASE 1: Collecting EN SEO...", flush=True)
print("="*60, flush=True)
all_en_seo = {}
all_tools = sorted(os.listdir(f"{BASE}/en/tools/"))
for tool in all_tools:
    seo = extract_seo("en", tool)
    if seo:
        all_en_seo[tool] = seo
print(f"  Found {len(all_en_seo)} tools with EN SEO", flush=True)

missing_to_generate = [t for t in MISSING_TOOLS if t not in all_en_seo]
if missing_to_generate:
    print(f"\n  Generating EN SEO for {len(missing_to_generate)} tools...", flush=True)
    prompt = f"""Generate SEO content for the following free online tools on adwatak.cloud.
For each tool, write 5 short SEO description lines (max 150 chars each) in English.
The descriptions should be informative, mention the tool's purpose and use cases, and include relevant keywords.

Return ONLY a JSON object where keys are tool names and values are arrays of 5 strings.

Tools: {', '.join(missing_to_generate)}"""
    resp = call_fireworks([
        {"role": "system", "content": "You are an SEO content writer. Output valid JSON only."},
        {"role": "user", "content": prompt}
    ], max_tokens=4000, temp=0.3)
    if resp:
        json_match = re.search(r'\{.*\}', resp, re.DOTALL)
        if json_match:
            try:
                gen = json.loads(json_match.group(0))
                for tool, lines in gen.items():
                    if isinstance(lines, list):
                        all_en_seo[tool] = lines
                        print(f"    ✅ {tool}: {len(lines)} lines", flush=True)
            except json.JSONDecodeError as e:
                print(f"    ❌ JSON error: {e}", flush=True)
        else:
            print(f"    ❌ No JSON: {resp[:200]}", flush=True)

# Phase 2: Translate
def translate_batch(lang_code, lang_name, tool_list):
    to_translate = {}
    for tool in tool_list:
        if tool in all_en_seo:
            to_translate[tool] = all_en_seo[tool]
    if not to_translate:
        print(f"  No {lang_name} tools need translation", flush=True)
        return
    print(f"\n  Translating {len(to_translate)} tools to {lang_name} ({lang_code})...", flush=True)
    prompt_parts = []
    for tool, lines in to_translate.items():
        prompt_parts.append(f"=== {tool} ===")
        for i, line in enumerate(lines):
            prompt_parts.append(f"  [{i}] {line}")
    prompt = f"""Translate the following SEO content from English to {lang_name} ({lang_code}).
Each tool has 4-6 SEO description lines. Do NOT translate tool names or "adwatak.cloud".
Maintain the same number of lines per tool.

Return a JSON object where each key is a tool name and value is an array of translated strings.

Source:
{chr(10).join(prompt_parts)}"""
    resp = call_fireworks([
        {"role": "system", "content": f"You are a professional translator English->{lang_name} for SEO. Output valid JSON only."},
        {"role": "user", "content": prompt}
    ], max_tokens=8000, temp=0.2)
    if resp:
        json_match = re.search(r'\{.*\}', resp, re.DOTALL)
        if json_match:
            try:
                trans = json.loads(json_match.group(0))
                for tool, lines in trans.items():
                    if isinstance(lines, list) and len(lines) >= 3:
                        translations[lang_code][tool] = lines
                        print(f"    ✅ {tool}", flush=True)
            except json.JSONDecodeError as e:
                print(f"    ❌ JSON error: {e}", flush=True)

print("\n" + "="*60, flush=True)
print("PHASE 2: Translating...", flush=True)
print("="*60, flush=True)
translate_batch("fr", "French", FR_ENGLISH + MISSING_TOOLS)
translate_batch("tr", "Turkish", TR_ENGLISH + MISSING_TOOLS)
translate_batch("id", "Indonesian", ID_ENGLISH + MISSING_TOOLS)

# Arabic generation
print(f"\n  Generating Arabic SEO for {len(MISSING_TOOLS)} tools...", flush=True)
prompt_ar = f"""Write SEO content in Arabic for these free online tools on adwatak.cloud.
For each tool, write 5 short SEO description lines (max 150 chars each) in Arabic.
Return ONLY a JSON object where keys are tool names and values are arrays of 5 strings.

Tools: {', '.join(MISSING_TOOLS)}"""
resp_ar = call_fireworks([
    {"role": "system", "content": "أنت كاتب محتوى SEO بالعربية. اخرج JSON فقط."},
    {"role": "user", "content": prompt_ar}
], max_tokens=4000, temp=0.3)
if resp_ar:
    json_match = re.search(r'\{.*\}', resp_ar, re.DOTALL)
    if json_match:
        try:
            gen_ar = json.loads(json_match.group(0))
            for tool, lines in gen_ar.items():
                if isinstance(lines, list):
                    translations["ar"][tool] = lines
                    print(f"    ✅ AR/{tool}", flush=True)
        except json.JSONDecodeError as e:
            print(f"    ❌ Arabic JSON error: {e}", flush=True)

# Translate ai-essay-writer + keyword-research from EN to AR
for tool in MISSING_AR_ONLY:
    if tool in all_en_seo and tool not in translations["ar"]:
        print(f"  Translating {tool} EN->AR...", flush=True)
        prompt_single = f"""Translate this SEO text from English to Arabic. Return ONLY a JSON array of strings.

English:
{chr(10).join(all_en_seo[tool])}"""
        resp_single = call_fireworks([
            {"role": "system", "content": "Translate to Arabic, output valid JSON array only."},
            {"role": "user", "content": prompt_single}
        ], max_tokens=2000, temp=0.2)
        if resp_single:
            try:
                ar_arr = json.loads(resp_single.strip())
                if isinstance(ar_arr, list):
                    translations["ar"][tool] = ar_arr
                    print(f"    ✅ AR/{tool}", flush=True)
            except:
                print(f"    ❌ AR/{tool} failed", flush=True)

# Phase 3: Patch
print("\n" + "="*60, flush=True)
print("PHASE 3: Patching files...", flush=True)
print("="*60, flush=True)
patched = 0

for tool in MISSING_TOOLS:
    if tool in all_en_seo and patch_seo("en", tool, all_en_seo[tool]):
        print(f"  ✅ EN/{tool}", flush=True)
        patched += 1

for tool in MISSING_AR_ONLY:
    if tool in translations.get("ar", {}):
        if patch_seo("(ar)", tool, translations["ar"][tool]):
            print(f"  ✅ (ar)/{tool}", flush=True)
            patched += 1

for tool in FR_ENGLISH + MISSING_TOOLS:
    if tool in translations.get("fr", {}):
        if patch_seo("fr", tool, translations["fr"][tool]):
            print(f"  ✅ FR/{tool}", flush=True)
            patched += 1

for tool in TR_ENGLISH + MISSING_TOOLS:
    if tool in translations.get("tr", {}):
        if patch_seo("tr", tool, translations["tr"][tool]):
            print(f"  ✅ TR/{tool}", flush=True)
            patched += 1

for tool in ID_ENGLISH + MISSING_TOOLS:
    if tool in translations.get("id", {}):
        if patch_seo("id", tool, translations["id"][tool]):
            print(f"  ✅ ID/{tool}", flush=True)
            patched += 1

for tool in MISSING_TOOLS:
    if tool in translations.get("ar", {}):
        if patch_seo("(ar)", tool, translations["ar"][tool]):
            print(f"  ✅ (ar)/{tool}", flush=True)
            patched += 1

print(f"\n{'='*60}", flush=True)
print(f"TOTAL PATCHED: {patched}", flush=True)
print("="*60, flush=True)
