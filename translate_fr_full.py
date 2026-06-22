#!/usr/bin/env python3
"""Translate remaining English strings in French Client.tsx files via Fireworks API."""
import os, re, json, subprocess, time

TOOLS_DIR = "/home/ops123/adwatak/src/app/fr/tools"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"

def get_api_key():
    with open("/home/ops123/adwatak/.api_key") as f:
        return f.read().strip()

def call_api(file_content, tool_name, api_key):
    """Send file to API for translation."""
    prompt = (
        "Translate ONLY the English string literals in this French web app file to French.\n\n"
        "Rules:\n"
        "1. Translate string literals (text in \"quotes\" or 'quotes') that have NO French chars (éèêëàâùûüôöîïç).\n"
        "2. Do NOT translate: imports, URLs, CSS, HTML tags, variable names, React hooks, types.\n"
        "3. Keep emojis and special chars.\n"
        "4. Return JSON: {\"original_english\": \"french_translation\", ...}\n"
        "5. If no translation needed, return {}.\n\n"
        f"File: {tool_name}\n"
        f"Content:\n{file_content[:12000]}"
    )
    
    payload = json.dumps({
        "model": "accounts/fireworks/models/deepseek-v4-pro",
        "messages": [{"role": "user", "content": prompt[:32000]}],
        "max_tokens": 8000,
        "temperature": 0.1,
        "response_format": {"type": "json_object"},
    })
    
    try:
        result = subprocess.run(
            ["curl", "-s", "-X", "POST", API_URL,
             "-H", "Authorization: Bearer " + api_key,
             "-H", "Content-Type: application/json",
             "-d", payload],
            capture_output=True, text=True, timeout=120
        )
        resp = json.loads(result.stdout)
        return json.loads(resp["choices"][0]["message"]["content"])
    except Exception as e:
        print(f"    API error: {e}")
        return None

def has_english(content):
    """Quick check if file still has English strings."""
    count = 0
    for m in re.finditer(r'["\x27]([A-Z][a-zA-Z\s()\-\d,;:.!?\x27`]{10,})["\x27]', content):
        text = m.group(1)
        if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text): continue
        count += 1
        if count > 3:
            return True
    return False

def process_tool(tool_path, api_key):
    cf = os.path.join(tool_path, "Client.tsx")
    if not os.path.exists(cf):
        return False
    
    with open(cf) as f:
        content = f.read()
    
    if not has_english(content):
        return False
    
    tool_name = os.path.basename(tool_path)
    print(f"  {tool_name}...", end=" ", flush=True)
    
    translations = call_api(content, tool_name, api_key)
    if not translations:
        print("API fail")
        return False
    
    new_content = content
    applied = 0
    for eng, fr in translations.items():
        if eng and fr and eng != fr and len(fr) > 2:
            if eng in new_content:
                new_content = new_content.replace('"' + eng + '"', '"' + fr + '"')
                new_content = new_content.replace("'" + eng + "'", "'" + fr + "'")
                applied += 1
    
    if applied > 0 and new_content != content:
        with open(cf, "w") as f:
            f.write(new_content)
        print(f"{applied} ok")
        return True
    
    print("none")
    return False

def main():
    api_key = get_api_key()
    tools = sorted([d for d in os.listdir(TOOLS_DIR) if os.path.isdir(os.path.join(TOOLS_DIR, d))])
    print(f"French: {len(tools)} tools", flush=True)
    
    fixed = 0
    for i, tool in enumerate(tools):
        tp = os.path.join(TOOLS_DIR, tool)
        if process_tool(tp, api_key):
            fixed += 1
        if (i + 1) % 10 == 0:
            print(f"  [{i+1}/{len(tools)}] {fixed} fixed", flush=True)
        time.sleep(0.2)
    
    print(f"\nDone: {fixed}/{len(tools)}", flush=True)

if __name__ == "__main__":
    main()
