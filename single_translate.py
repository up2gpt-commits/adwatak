#!/usr/bin/env python3
"""Translate a single tool - simple version."""
import json, os, re, sys, subprocess

AK="fw_NuSpvm1K6VR4teLpx8VkWj"
AU="https://api.fireworks.ai/inference/v1/chat/completions"

def call_api(prompt, max_tokens=8000):
    data = {
        "model": "accounts/fireworks/models/kimi-k2p6",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0,
        "max_tokens": max_tokens
    }
    ah = "Bearer " + AK
    r = subprocess.run(["curl", "-s", "-X", "POST", AU,
        "-H", "Authorization: " + ah,
        "-H", "Content-Type: application/json",
        "-d", json.dumps(data)], capture_output=True, text=True, timeout=300)
    j = json.loads(r.stdout)
    return j["choices"][0]["message"]["content"]

def readf(p):
    with open(p) as f: return f.read()

def writef(p,c):
    with open(p,"w") as f: f.write(c)

def extract_arr(c, key):
    p = r'const ' + key + r'\s*=\s*(\[.*\])\s*;'
    m = re.search(p, c, re.DOTALL)
    return m.group(1) if m else None

def rep_arr(c, n, v):
    p = r'(const ' + n + r'\s*=\s*)\[.*\](\s*;)'
    m = re.search(p, c, re.DOTALL)
    if m: return c[:m.start(1)] + "const " + n + " = " + v + c[m.end(2):]
    return c

def find_last(text, pattern):
    ms = list(re.finditer(pattern, text, re.DOTALL))
    return ms[-1].group(0) if ms else None

lang = sys.argv[1]
tool = sys.argv[2]

path = f"/home/ops123/adwatak/src/app/{lang}/tools/{tool}/Client.tsx"
en_path = f"/home/ops123/adwatak/src/app/en/tools/{tool}/Client.tsx"

content = readf(path)
en_content = readf(en_path)

# Extract arrays from EN version
en_arr = {}
for k in ["faqs", "seoContent", "relatedTools"]:
    v = extract_arr(en_content, k)
    if v:
        if k == "relatedTools":
            v = v.replace('/en/', f'/{lang}/')
        en_arr[k] = v

# Check current content
has_eng = "What is" in content or "How does" in content or "Free" in content
print(f"Has English: {has_eng}")
print(f"EN arrays: {list(en_arr.keys())}")

if not has_eng:
    print("Already localized!")
    sys.exit(0)

prompt = f"""Translate the following 3 JavaScript arrays to {lang.upper()}.

Output ONLY the 3 translated arrays in the EXACT same format, one after the other. No other text.

IMPORTANT: Keep Arabic Islamic phrases (Subhan Allah, Alhamdulillah, Allahu Akbar, etc.), Arabic month names, and Quran/Hadith references (Sahih Muslim, etc.) in their ORIGINAL form. Translate only the English question/answer/text content.

===FAQS===
{en_arr.get("faqs", "")}

===SEOCONTENT===
{en_arr.get("seoContent", "")}

===RELATEDTOOLS===
{en_arr.get("relatedTools", "")}"""

print("Calling Kimi...")
resp = call_api(prompt)
print(f"Response: {len(resp)} chars")

# Find translated arrays
faq_pat = r'\[\s*\{[^}]*?question[^}]*?answer[^}]*?\}(?:\s*,\s*\{[^}]*?question[^}]*?answer[^}]*?\})+\s*\]'
seo_pat = r'\[\s*"[^"]*?"(?:\s*,\s*"[^"]*?")+\s*\]'  
rel_pat = r'\[\s*\{[^}]*?title[^}]*?icon[^}]*?\}(?:\s*,\s*\{[^}]*?title[^}]*?icon[^}]*?\})+\s*\]'

new_faq = find_last(resp, faq_pat)
new_seo = find_last(resp, seo_pat)
new_rel = find_last(resp, rel_pat)

writef("/tmp/resp_debug.txt", resp)
print(f"Found FAQ: {new_faq is not None}")
print(f"Found SEO: {new_seo is not None}")
print(f"Found REL: {new_rel is not None}")
print(f"Resp preview: {resp[:500]}")

nc = content
if new_faq: nc = rep_arr(nc, "faqs", new_faq)
if new_seo: nc = rep_arr(nc, "seoContent", new_seo)
if new_rel: nc = rep_arr(nc, "relatedTools", new_rel)
writef(path, nc)
print("Written!")
