#!/usr/bin/env python3
"""Test translate one Turkish tool file."""
import os, re, json, time, subprocess, sys
import urllib.request, urllib.error

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
MODEL = "accounts/fireworks/models/deepseek-v4-pro"
TR_DIR = "/home/ops123/adwatak/src/app/tr/tools/"

def call_api(content, tool_name):
    prompt = f"""You are translating UI text in a Turkish React tool page. The file is for /tr/tools/{tool_name}/.

IMPORTANT RULES:
1. Translate ONLY these parts to natural Turkish:
   - h1 heading text (e.g., "Mortgage Calculator" -> "Konut Kredisi Hesaplama")
   - p subtitle/description text
   - <label> text
   - <button> text
   - placeholder="..." text
   - seoContent array strings (multi-paragraph)
   - relatedTools title strings
   - Breadcrumb category and toolName props
   - schemaName and schemaDesc (variable string values)
   - breadcrumbItems name values
   - "en" in toolSchema and howToSchema -> change to "tr"

2. DO NOT change:
   - faqs array (already in Turkish)
   - Code structure, imports, JSX, className, variable names
   - URLs (keep /tr/... not /en/...)
   - Numbers, emojis, $, %, symbols
   - howToSchema and speakableSchema comments
   - The word "Adwatak" or "Adawatak"

3. Return the COMPLETE file with only the translations applied.
4. Keep all code intact - don't reformat or restructure.
5. Turkish translations must sound natural, not machine-translated.

Here is the file content:
```tsx
{content}
```

Return ONLY the complete translated file content inside a code block ```tsx ... ```"""

    data = {"model": MODEL, "messages": [
        {"role": "system", "content": "You are a professional English-to-Turkish translator specializing in software UI translation. You return valid TSX code with only UI strings translated."},
        {"role": "user", "content": prompt}
    ], "temperature": 0.05, "max_tokens": 32000}
    
    req = urllib.request.Request(API_URL, data=json.dumps(data).encode('utf-8'),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {FIREWORKS_KEY}"})
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            text = json.loads(resp.read())["choices"][0]["message"]["content"]
            code_match = re.search(r'```(?:tsx|typescript|jsx)?\n(.*?)```', text, re.DOTALL)
            return (code_match.group(1) if code_match else text).strip()
    except Exception as e:
        print(f"  API error: {e}")
        return None

tool = "mortgage-calculator"
fpath = os.path.join(TR_DIR, tool, 'Client.tsx')
with open(fpath) as f:
    content = f.read()

print(f"Translating {tool}... ({len(content)} chars)")
result = call_api(content, tool)
if result:
    # Verify
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', result)
    h1_text = h1.group(1) if h1 else "N/A"
    has_tr = bool(re.search(r'[\u00e7\u011f\u0131\u00f6\u015f\u00fc]', h1_text))
    seo = re.search(r'const seoContent = \[(.*?)\];', result, re.DOTALL)
    seo_ok = False
    if seo:
        items = re.findall(r'\"(?:[^\"\\\\]|\\.)*\"', seo.group(1))
        if items:
            seo_ok = bool(re.search(r'[\u00e7\u011f\u0131\u00f6\u015f\u00fc]', items[0]))
    
    bc = re.search(r'<Breadcrumb\s+category=\"([^\"]+)\"', result)
    bc_ok = False
    if bc:
        bc_ok = bool(re.search(r'[\u00e7\u011f\u0131\u00f6\u015f\u00fc]', bc.group(1)))
    
    print(f"  h1: {'TR' if has_tr else 'EN'} = {h1_text[:60]}")
    print(f"  seoContent: {'TR' if seo_ok else 'EN'}")
    print(f"  Breadcrumb: {'TR' if bc_ok else 'EN'}")
    print(f"  Result size: {len(result)} chars (was {len(content)})")
    
    # Save result
    with open(fpath, 'w') as f:
        f.write(result)
    print(f"  Saved!")
else:
    print("FAILED!")
