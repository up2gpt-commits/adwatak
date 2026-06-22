#!/usr/bin/env python3
"""SEO Fix Script — Phase 1: Generate/collect all SEO content"""
import sys, json, os, time, requests, re

FW_KEY = "fw_KSKFwcCdYKh79ZnzQS24Yc"
FW_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
BASE = "/home/ops123/adwatak/src/app"
NL = "\n"

MISSING = ["date-duration","encryption-tool","fidyah-kaffarah","ideal-weight","percentage-calculator","pixel-converter","prayer-times","qibla-direction","temperature-converter","timezone-converter","umrah-calculator"]
FR_EN = ["compound-interest","emi-calculator","gold-calculator","inheritance-calculator","installment-calculator","ip-lookup","loan-calculator","markdown-editor","mortgage-calculator","number-to-words","password-generator","pdf-to-word","seo-content-generator","uuid-generator","youtube-thumbnail-downloader"]
TR_EN = ["css-minifier","loan-calculator","plagiarism-checker","random-number","salary-calculator","seo-content-generator","stopwatch","text-case","text-cleaner","text-compare"]
ID_EN = ["css-minifier","image-compressor","ip-lookup","markdown-editor","text-cleaner","whatsapp-link","youtube-thumbnail-downloader"]

def call_fw(prompt, system="You are an SEO/translation specialist. Output valid JSON only.", mt=8000, temp=0.2):
    print(f"  [API] Sending request...", flush=True)
    data = {"model": "accounts/fireworks/models/deepseek-v4-pro", "messages": [{"role":"system","content":system},{"role":"user","content":prompt}], "max_tokens": mt, "temperature": temp}
    start = time.time()
    r = requests.post(FW_URL, headers={"Authorization": f"Bearer {FW_KEY}", "Content-Type": "application/json"}, json=data, timeout=180)
    elapsed = time.time()-start
    print(f"  [API] Status {r.status_code} in {elapsed:.0f}s", flush=True)
    if r.status_code == 200:
        return r.json()["choices"][0]["message"]["content"]
    return None

def read_en_seo():
    """Read all existing EN SEO"""
    seo = {}
    for tool in sorted(os.listdir(f"{BASE}/en/tools/")):
        p = f"{BASE}/en/tools/{tool}/Client.tsx"
        with open(p) as f:
            c = f.read()
        m = re.search(r"seoContent\s*=\s*\[(.+?)\];", c, re.DOTALL)
        if m:
            items = re.findall(r'"([^"]+)"', m.group(1))
            seo[tool] = [x for x in items if x.strip()]
    return seo

def extract_json(text):
    m = re.search(r"\{.*\}", text, re.DOTALL)
    if m:
        return json.loads(m.group(0))
    return None

def save_results(results):
    with open("/tmp/seo_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"  Saved to /tmp/seo_results.json", flush=True)

# ====== MAIN ======
print("="*60, flush=True)
print("Step 1: Reading EN SEO", flush=True)
print("="*60, flush=True)
en_seo = read_en_seo()
print(f"  Found {len(en_seo)} tools with EN SEO", flush=True)

# Generate missing EN SEO
need_gen = [t for t in MISSING if t not in en_seo]
if need_gen:
    print(f"\nStep 2: Generating EN SEO for {len(need_gen)} tools", flush=True)
    tool_str = ", ".join(need_gen)
    resp = call_fw(
        f"Generate SEO for these tools. Each needs exactly 5 short lines (max 150 chars) in English. Return valid JSON - keys=tool names, values=arrays of 5 strings. Tools: {tool_str}",
        mt=4000, temp=0.3
    )
    if resp:
        data = extract_json(resp)
        if data:
            for t, l in data.items():
                if isinstance(l, list):
                    en_seo[t] = l
                    print(f"  ✅ {t}", flush=True)
    save_results({"EN": en_seo})

# ====== Translate ======
results = {"EN": en_seo}

translation_configs = [
    ("FR", "French", FR_EN + MISSING),
    ("TR", "Turkish", TR_EN + MISSING),
    ("ID", "Indonesian", ID_EN + MISSING),
]

for lang_code, lang_name, tool_list in translation_configs:
    print(f"\nStep: Translating to {lang_name}", flush=True)
    parts = []
    for t in tool_list:
        if t in en_seo:
            parts.append(f"=== {t} ===")
            for i, l in enumerate(en_seo[t]):
                parts.append(f"  [{i}] {l}")
    prompt = f"Translate the following SEO content from English to {lang_name}. Do NOT translate tool names or 'adwatak.cloud'. Maintain exact line count per tool. Return valid JSON - keys=tool names, values=arrays of strings.{NL}{NL}{NL.join(parts)}"
    resp = call_fw(prompt)
    if resp:
        data = extract_json(resp)
        if data:
            results[lang_code] = data
            print(f"  Got {len(data)} tools", flush=True)
    save_results(results)

# ====== Arabic ======
print(f"\nStep: Generating Arabic SEO", flush=True)
tool_str = ", ".join(MISSING)
resp = call_fw(
    f"Write SEO content in Arabic for these tools on adwatak.cloud. Each needs exactly 5 short lines (max 150 chars). Return valid JSON - keys=tool names, values=arrays of 5 strings. Tools: {tool_str}",
    "أنت كاتب محتوى SEO بالعربية. اخرج JSON فقط.", 4000, 0.3
)
if resp:
    data = extract_json(resp)
    if data:
        results["AR"] = data
        print(f"  Got {len(data)} tools", flush=True)

# Translate ai-essay-writer, keyword-research for AR
for tool in ["ai-essay-writer", "keyword-research"]:
    if tool in en_seo:
        resp = call_fw(
            f"Translate the following to Arabic. Return ONLY a JSON array of strings.{NL}{json.dumps(en_seo[tool])}",
            "Translate to Arabic. Return valid JSON array only.", 2000, 0.2
        )
        if resp:
            try:
                arr = json.loads(resp.strip())
                if isinstance(arr, list):
                    if "AR" not in results:
                        results["AR"] = {}
                    results["AR"][tool] = arr
                    print(f"  ✅ AR/{tool}", flush=True)
            except:
                pass

save_results(results)
print(f"\n{'='*60}", flush=True)
print("ALL DONE!", flush=True)
for k in ["EN","FR","TR","ID","AR"]:
    print(f"  {k}: {len(results.get(k,{}))} tools", flush=True)
print("="*60, flush=True)
