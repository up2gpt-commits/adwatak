#!/usr/bin/env python3
"""Translate remaining English TR tools one by one."""
import os, re, json, sys, socket, time
import urllib.request, urllib.error

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
MODEL = "accounts/fireworks/models/deepseek-v4-pro"
TR_DIR = "/home/ops123/adwatak/src/app/tr/tools/"

TOOLS = ["qr-generator", "salary-calculator", "seo-audit", "seo-content-generator",
         "stopwatch", "text-compare", "vat-calculator", "whatsapp-link", "zakat-calculator"]

def translate(tool):
    fp = os.path.join(TR_DIR, tool, "Client.tsx")
    with open(fp) as f:
        content = f.read()
    
    prompt = f"""Translate this React TSX file from English to natural Turkish.

TRANSLATE THESE PARTS TO TURKISH:
- h1 heading text
- p subtitle/description text
- <label> text
- <button> text
- placeholder="..." text
- faqs array: question and answer values
- seoContent array strings
- relatedTools title values
- Breadcrumb category and toolName props
- schemaName and schemaDesc string values
- breadcrumbItems name values (like "Home", "Tools" etc.)
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
    
    req = urllib.request.Request(API_URL, data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {FIREWORKS_KEY}"})
    
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            text = json.loads(resp.read())["choices"][0]["message"]["content"]
            m = re.search(r'```(?:tsx|typescript|jsx)?\n(.*?)```', text, re.DOTALL)
            return (m.group(1) if m else text).strip(), None
    except Exception as e:
        return None, str(e)

def is_tr_h1(text):
    tr_chars = set("çğıöşüÇĞİÖŞÜ")
    if any(c in tr_chars for c in text):
        return True
    tr_words = ["hesapla", "arac", "olustur", "donustur", "cevir", "uretic",
                "kaldir", "sikistir", "birlestir", "temizle", "karsilastir",
                "olc", "sayac", "bulucu", "okuyucu", "sifrele", "biçimlen",
                "yapay", "zeka", "icerik", "dedektor", "makale", "yazar",
                "barkod", "renk", "doviz", "fatura", "taksit", "sorgula",
                "yeniden", "yazma", "araci", "uretici", "olusturucu",
                "donusturucu", "ceviren", "olcer", "bul", "kontrol"]
    tl = text.lower()
    return any(w in tl for w in tr_words)

def main():
    for i, tool in enumerate(TOOLS):
        fp = os.path.join(TR_DIR, tool, "Client.tsx")
        size = os.path.getsize(fp)
        print(f"[{i+1}/{len(TOOLS)}] {tool} ({size} bytes)...", end=" ", flush=True)
        
        result, err = translate(tool)
        if err:
            print(f"FAIL: {err}")
            continue
        
        # Verify
        if "export default" not in result:
            print("FAIL: corrupted (no export)")
            continue
        
        # Check h1
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", result)
        h1_text = h1.group(1).strip()[:60] if h1 else "N/A"
        
        with open(fp, "w", encoding="utf-8") as f:
            f.write(result)
        
        tr = is_tr_h1(h1_text)
        print(f"OK h1=\"{h1_text}\" tr={tr}")
        time.sleep(1)

if __name__ == "__main__":
    main()
