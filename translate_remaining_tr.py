#!/usr/bin/env python3
"""Translate remaining English TR tools - whole file approach with longer timeout."""
import os, re, json, sys, socket
import urllib.request, urllib.error

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
MODEL = "accounts/fireworks/models/deepseek-v4-pro"
TR_DIR = "/home/ops123/adwatak/src/app/tr/tools/"

TOOLS = [
    'installment-calculator', 'invoice-generator', 'ip-lookup',
    'paraphrasing-tool', 'qr-generator', 'salary-calculator',
    'seo-audit', 'seo-content-generator', 'stopwatch',
    'text-compare', 'vat-calculator', 'whatsapp-link', 'zakat-calculator'
]

def translate_file(tool):
    fp = os.path.join(TR_DIR, tool, 'Client.tsx')
    with open(fp) as f:
        content = f.read()
    
    prompt = f"""Translate this React TSX file for /tr/tools/{tool}/ (Turkish language site) from English to NATURAL Turkish.

TRANSLATE THESE PARTS TO TURKISH:
- h1 heading text (e.g. "Installment Calculator" -> "Taksit Hesaplama")
- p subtitle/description text under the h1
- <label> text
- <button> text
- placeholder="..." text
- faqs array: question and answer values
- seoContent array strings
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
- Keep the file format exactly as-is (single line minified)

Return ONLY the complete translated file inside ```tsx ... ``` block.

FILE CONTENT:
```tsx
{content}
```"""

    socket.setdefaulttimeout(300)
    data = {"model": MODEL, "messages": [
        {"role": "system", "content": "You translate React TSX files from English to Turkish. Return valid TSX with only UI strings changed. Keep minified format."},
        {"role": "user", "content": prompt}
    ], "temperature": 0.05, "max_tokens": 32000}
    
    req = urllib.request.Request(API_URL, data=json.dumps(data).encode('utf-8'),
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + FIREWORKS_KEY})
    
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            text = json.loads(resp.read())["choices"][0]["message"]["content"]
            code_match = re.search(r'```(?:tsx|typescript|jsx)?\n(.*?)```', text, re.DOTALL)
            result = (code_match.group(1) if code_match else text).strip()
    except Exception as e:
        return None, str(e)
    
    # Verify structure
    if 'export default' not in result:
        return None, "corrupted (no export)"
    
    # Check if h1 or faqs have Turkish content
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', result)
    h1_text = h1.group(1) if h1 else ''
    has_tr_chars = any(c in h1_text for c in '\u00e7\u011f\u0131\u00f6\u015f\u00fc')
    
    return result, None

def main():
    for i, tool in enumerate(TOOLS):
        fp = os.path.join(TR_DIR, tool, 'Client.tsx')
        size = os.path.getsize(fp)
        print(f"[{i+1}/{len(TOOLS)}] {tool} ({size} bytes)...", end=" ", flush=True)
        
        result, err = translate_file(tool)
        if err:
            print(f"FAIL: {err}")
            continue
        
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(result)
        
        # Quick verify
        with open(fp) as f:
            c = f.read()
        has_tr = any(c in '\u00e7\u011f\u0131\u00f6\u015f\u00fc' for c in c[:5000])
        print(f"OK (tr={has_tr})")

if __name__ == "__main__":
    main()
