#!/usr/bin/env python3
"""Translate ALL Turkish tool files (including FAQs) using Fireworks AI."""
import os, re, json, time, subprocess, sys
import urllib.request, urllib.error

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
MODEL = "accounts/fireworks/models/deepseek-v4-pro"
TR_DIR = "/home/ops123/adwatak/src/app/tr/tools/"

def call_api(content, tool_name):
    prompt = f"""Translate this React TSX file for /tr/tools/{tool_name}/ (Turkish language site) from English to NATURAL Turkish.

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
    
    req = urllib.request.Request(API_URL, data=json.dumps(data).encode('utf-8'),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {FIREWORKS_KEY}"})
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            text = json.loads(resp.read())["choices"][0]["message"]["content"]
            code_match = re.search(r'```(?:tsx|typescript|jsx)?\n(.*?)```', text, re.DOTALL)
            return (code_match.group(1) if code_match else text).strip()
    except Exception as e:
        print(f"API error: {e}")
        return None

def is_already_translated(content):
    """Check if h1 and at least one FAQ question are in Turkish."""
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', content)
    if h1:
        h1_text = h1.group(1)
        tr_chars = set('\u00e7\u011f\u0131\u00f6\u015f\u00fc')  # çğıöşü
        if not any(c in tr_chars for c in h1_text):
            return False
    # Check a FAQ question
    faqs = re.search(r'const faqs = \[(.*?)\];', content, re.DOTALL)
    if faqs:
        questions = re.findall(r'question:\s*"([^"]+)"', faqs.group(1))
        if questions and any(c in tr_chars for c in questions[0]):
            return True
    return False

def main():
    tools = sorted([d for d in os.listdir(TR_DIR) 
                    if os.path.isdir(os.path.join(TR_DIR, d))
                    and os.path.exists(os.path.join(TR_DIR, d, 'Client.tsx'))])
    
    print(f"Total: {len(tools)} tools")
    success, fail, skip = 0, 0, 0
    
    for i, tool in enumerate(tools):
        fpath = os.path.join(TR_DIR, tool, 'Client.tsx')
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if is_already_translated(content):
            print(f"[{i+1}/{len(tools)}] {tool:35s} SKIP (already TR)")
            skip += 1
            continue
        
        print(f"[{i+1}/{len(tools)}] {tool:35s} translating...", end=" ", flush=True)
        result = call_api(content, tool)
        if not result:
            print("FAIL")
            fail += 1
            continue
        
        # Basic verification
        if 'export default' not in result:
            print("FAIL (corrupted - no export)")
            fail += 1
            continue
        
        h1 = re.search(r'<h1[^>]*>(.*?)</h1>', result)
        if h1 and not any(c in h1.group(1) for c in '\u00e7\u011f\u0131\u00f6\u015f\u00fc'):
            print("WARN (h1 might not be TR)")
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(result)
        print("OK")
        success += 1
        time.sleep(0.3)
    
    print(f"\n=== DONE: {success} translated, {fail} failed, {skip} skipped ===")
    return 0 if fail == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
