#!/usr/bin/env python3
"""Test translate ONE Turkish tool file including FAQs."""
import os, re, json, time, subprocess, sys
import urllib.request, urllib.error

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
MODEL = "accounts/fireworks/models/deepseek-v4-pro"
TOOL = sys.argv[1] if len(sys.argv) > 1 else "mortgage-calculator"
FPATH = f"/home/ops123/adwatak/src/app/tr/tools/{TOOL}/Client.tsx"

with open(FPATH) as f:
    content = f.read()

prompt = f"""Translate this React TSX file for /tr/tools/{TOOL}/ (Turkish language site) from English to NATURAL Turkish.

TRANSLATE THESE PARTS TO TURKISH:
- h1 heading text (e.g. "Mortgage Calculator" -> "Konut Kredisi Hesaplama")
- p subtitle/description text under the h1
- <label> text
- <button> text (e.g. "Calculate Mortgage" -> "Konut Kredisini Hesapla")
- placeholder="..." text
- faqs array: question and answer values (translate the text inside quotes after question: and answer:)
- seoContent array strings (the long multi-paragraph strings)
- relatedTools title values
- Breadcrumb category and toolName props
- schemaName and schemaDesc string values
- breadcrumbItems name values
- Change language "en" to "tr" in toolSchema(..., 'en', ...) and howToSchema(..., "en")

DO NOT CHANGE:
- Code syntax, imports, JSX tags, className, variable names, component names
- URLs (keep /tr/)
- Numbers, emojis, $, %, special characters
- The word "Adwatak" or "Adawatak"
- Keep the file as a single minified line (don't add line breaks)

Return ONLY the complete translated file inside ```tsx ... ``` block.

FILE CONTENT:
```tsx
{content}
```"""

data = {"model": MODEL, "messages": [
    {"role": "system", "content": "You translate React TSX files from English to Turkish. You return valid TSX with only UI strings changed. You keep the file format exactly as-is (single line minified)."},
    {"role": "user", "content": prompt}
], "temperature": 0.05, "max_tokens": 32000}

req = urllib.request.Request(
    "https://api.fireworks.ai/inference/v1/chat/completions",
    data=json.dumps(data).encode('utf-8'),
    headers={"Content-Type": "application/json", "Authorization": "Bearer " + FIREWORKS_KEY}
)

print(f"Translating {TOOL} ({len(content)} chars)...", flush=True)
try:
    with urllib.request.urlopen(req, timeout=180) as resp:
        text = json.loads(resp.read())["choices"][0]["message"]["content"]
        code_match = re.search(r'```(?:tsx|typescript|jsx)?\n(.*?)```', text, re.DOTALL)
        result = (code_match.group(1) if code_match else text).strip()
except Exception as e:
    print(f"API error: {e}")
    sys.exit(1)

# Verify
h1 = re.search(r'<h1[^>]*>(.*?)</h1>', result)
h1_text = h1.group(1) if h1 else "N/A"

faqs = re.search(r'const faqs = \[(.*?)\];', result, re.DOTALL)
faq_first = ""
if faqs:
    questions = re.findall(r'question:\s*"([^"]+)"', faqs.group(1))
    faq_first = questions[0][:60] if questions else "N/A"

print(f"  h1: {h1_text[:60]}")
print(f"  FAQ q1: {faq_first}")
print(f"  Size: {len(result)} chars (was {len(content)})")

if 'export default' not in result:
    print("ERROR: corrupted (no export)")
    sys.exit(1)

with open(FPATH, 'w') as f:
    f.write(result)
print("Saved!")
