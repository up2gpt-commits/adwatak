#!/usr/bin/env python3
"""
Translate Turkish tool Client.tsx files from English to Turkish using Fireworks AI.
Sends the complete file to the API with precise instructions.
"""
import os, re, json, time, subprocess, sys
import urllib.request, urllib.error

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
MODEL = "accounts/fireworks/models/deepseek-v4-pro"
TR_DIR = "/home/ops123/adwatak/src/app/tr/tools/"

def call_api(content, tool_name):
    """Send file content for translation."""
    prompt = f"""You are translating UI text in a Turkish React tool page. The file is for /tr/tools/{tool_name}/.

IMPORTANT RULES:
1. Translate ONLY these parts to natural Turkish:
   - h1 heading text (e.g., "Mortgage Calculator" → "Konut Kredisi Hesaplama")
   - p subtitle/description text
   - <label> text
   - <button> text  
   - placeholder="..." text
   - seoContent array strings (multi-paragraph)
   - relatedTools title strings
   - Breadcrumb category and toolName props
   - schemaName and schemaDesc (variable string values)
   - breadcrumbItems name values
   - "en" in toolSchema and howToSchema → change to "tr"

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

    data = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are a professional English-to-Turkish translator specializing in software UI translation. You return valid TSX code with only UI strings translated."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.05,
        "max_tokens": 32000
    }
    
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(data).encode('utf-8'),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {FIREWORKS_KEY}"
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            result = json.loads(resp.read())
            text = result["choices"][0]["message"]["content"]
            # Extract tsx code block
            code_match = re.search(r'```(?:tsx|typescript|jsx)?\n(.*?)```', text, re.DOTALL)
            if code_match:
                return code_match.group(1).strip()
            return text.strip()
    except Exception as e:
        print(f"  API error: {e}")
        return None

def verify_translation(content, tool_name):
    """Basic verification that the file compiles and has Turkish text."""
    # Check h1 has Turkish chars
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', content)
    if not h1:
        return False, "No h1 found"
    h1_text = h1.group(1)
    if not re.search(r'[\u00e7\u011f\u0131\u00f6\u015f\u00fc]', h1_text):
        return False, f"h1 not translated: {h1_text[:50]}"
    
    # Check seoContent has Turkish
    seo = re.search(r'const seoContent = \[(.*?)\];', content, re.DOTALL)
    if seo:
        items = re.findall(r'\"(?:[^\"\\\\]|\\.)*\"', seo.group(1))
        if items and not re.search(r'[\u00e7\u011f\u0131\u00f6\u015f\u00fc]', items[0]):
            return False, "seoContent not translated"
    
    return True, "OK"

def main():
    # Get list of tools with Client.tsx
    tools = sorted([d for d in os.listdir(TR_DIR) 
                    if os.path.isdir(os.path.join(TR_DIR, d))
                    and os.path.exists(os.path.join(TR_DIR, d, 'Client.tsx'))])
    
    print(f"Total Turkish tools: {len(tools)}")
    
    # Reset any stashed changes first
    subprocess.run(['git', 'stash', 'drop'], capture_output=True)
    
    success, fail, skip = 0, 0, 0
    
    for i, tool in enumerate(tools):
        fpath = os.path.join(TR_DIR, tool, 'Client.tsx')
        
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Quick check: is h1 already Turkish?
        h1 = re.search(r'<h1[^>]*>(.*?)</h1>', content)
        if h1 and re.search(r'[\u00e7\u011f\u0131\u00f6\u015f\u00fc]', h1.group(1)):
            print(f"[{i+1}/{len(tools)}] {tool:35s} \u2713 Already translated, skipping")
            skip += 1
            continue
        
        print(f"[{i+1}/{len(tools)}] {tool:35s} translating...", end=" ", flush=True)
        
        result = call_api(content, tool)
        if not result:
            print("FAILED (API)")
            fail += 1
            continue
        
        # Verify
        ok, msg = verify_translation(result, tool)
        if not ok:
            print(f"FAILED ({msg})")
            fail += 1
            # Save failed attempt for debugging
            with open(f'/tmp/tr_translate_fail_{tool}.tsx', 'w') as f:
                f.write(result)
            continue
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(result)
        
        print("OK")
        success += 1
        time.sleep(0.3)  # Rate limit
    
    print(f"\n=== SUMMARY ===")
    print(f"Translated: {success}, Failed: {fail}, Skipped: {skip}")
    return 0 if fail == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
