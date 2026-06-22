#!/usr/bin/env python3
"""Translate French FAQ questions/answers via batch API call."""
import os, re, json, subprocess, time

TOOLS_DIR = "/home/ops123/adwatak/src/app/fr/tools"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"

def get_api_key():
    with open("/home/ops123/adwatak/.api_key") as f:
        return f.read().strip()

def translate_batch(texts, api_key):
    if not texts:
        return {}
    
    header = "Translate each English phrase to French. Return ONLY JSON where key=English, value=French. "
    header += "These are FAQ questions and answers for a web app.\n"
    header += "If text already looks French, leave it unchanged.\n\n"
    header += "\n".join(str(i+1) + ". " + t for i, t in enumerate(texts))
    
    payload = json.dumps({
        "model": "accounts/fireworks/models/deepseek-v4-pro",
        "messages": [{"role": "user", "content": header[:32000]}],
        "max_tokens": 8000,
        "temperature": 0.1,
        "response_format": {"type": "json_object"},
    })
    
    auth = "Authorization: Bearer " + api_key
    
    try:
        result = subprocess.run(
            ["curl", "-s", "-X", "POST", API_URL,
             "-H", auth,
             "-H", "Content-Type: application/json",
             "-d", payload],
            capture_output=True, text=True, timeout=120
        )
        resp = json.loads(result.stdout)
        return json.loads(resp["choices"][0]["message"]["content"])
    except Exception as e:
        print("API error: " + str(e))
        return {}

def main():
    api_key = get_api_key()
    
    # Collect all FAQ question English strings
    all_eng = {}
    for d in sorted(os.listdir(TOOLS_DIR)):
        if not os.path.isdir(os.path.join(TOOLS_DIR, d)):
            continue
        cf = os.path.join(TOOLS_DIR, d, "Client.tsx")
        if not os.path.exists(cf):
            continue
        with open(cf) as f:
            content = f.read()
        
        eng_qs = set()
        for m in re.finditer(r'question:\s*["\x27]([^"\x27]{10,})["\x27]', content):
            text = m.group(1)
            if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text):
                continue
            french_words = ['est','les','des','une','dans','pour','avec','sur','sans','tous',
                          'comment','quelle','quand','pourquoi','combien','entre','apres',
                          'avant','tres','plus','moins','notre','votre','leur','cette',
                          'cet','ces','chaque','autre','seulement','car','mais','donc',
                          'alors','aussi','enfin','depuis','jusqu','toujours','parfois',
                          'souvent','encore','voici','voila','lorsque','puisque','ni',
                          'neanmoins','toutefois','pourtant','plusieurs','certains',
                          'quelques','premier','second','dernier','egalement','malgre']
            if any(fw in text.lower() for fw in french_words):
                continue
            eng_qs.add(text)
        
        for m in re.finditer(r'answer:\s*["\x27]([^"\x27]{15,})["\x27]', content):
            text = m.group(1)
            if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text):
                continue
            french_words = ['est','les','des','une','dans','pour','avec','sur','sans','tous',
                          'comment','quelle','quand','pourquoi']
            if any(fw in text.lower() for fw in french_words):
                continue
            eng_qs.add(text)
        
        if eng_qs:
            all_eng[d] = eng_qs
    
    total_qs = sum(len(v) for v in all_eng.values())
    print("Found " + str(total_qs) + " English FAQ strings across " + str(len(all_eng)) + " tools")
    
    all_texts = sorted(set(t for v in all_eng.values() for t in v))
    print("Unique English strings: " + str(len(all_texts)))
    for t in all_texts[:10]:
        print("  - " + t[:80])
    if len(all_texts) > 10:
        print("  ... and " + str(len(all_texts)-10) + " more")
    
    translations = {}
    batch_count = -(-len(all_texts)//50)  # ceil division
    for i in range(0, len(all_texts), 50):
        chunk = all_texts[i:i+50]
        print("Batch " + str(i//50 + 1) + "/" + str(batch_count) + "...", flush=True)
        chunk_trans = translate_batch(chunk, api_key)
        translations.update(chunk_trans)
        time.sleep(0.3)
    
    print("Got " + str(len(translations)) + " translations")
    
    applied = 0
    for tool, eng_strings in all_eng.items():
        cf = os.path.join(TOOLS_DIR, tool, "Client.tsx")
        with open(cf) as f:
            content = f.read()
        
        new_c = content
        tool_applied = 0
        for eng, fr in translations.items():
            if eng and fr and eng != fr and len(fr) > 3:
                if eng in new_c:
                    new_c = new_c.replace('"' + eng + '"', '"' + fr + '"')
                    new_c = new_c.replace("'" + eng + "'", "'" + fr + "'")
                    tool_applied += 1
        
        if tool_applied > 0:
            with open(cf, "w") as f:
                f.write(new_c)
            applied += 1
            print("  " + tool + ": " + str(tool_applied) + " translations", flush=True)
    
    print("\nDone! " + str(applied) + "/" + str(len(all_eng)) + " tools updated")

if __name__ == "__main__":
    main()
