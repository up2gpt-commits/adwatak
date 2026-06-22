#!/usr/bin/env python3
"""Translate English SEO/FAQ content in French Client.tsx files via Fireworks API."""
import os, re, json, subprocess, time

TOOLS_DIR = "/home/ops123/adwatak/src/app/fr/tools"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
API_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"

def find_english_strings(content):
    results = set()
    for m in re.finditer(r'["\x27]([A-Z][^"\x27]{20,})["\x27]', content):
        text = m.group(1)
        if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text): continue
        french_inds = ["calcul","poids","taille","compteur","minuteur",
            "convertisseur","generateur","detecteur","correcteur","audit",
            "mots","texte","couleur","nombre","aleatoire","facture",
            "fusionneur","separateur","compresseur","redimensionneur",
            "suppresseur","telechargeur","miniature","liens","balises",
            "marge","cout","prix","vente","optionnel","riz","pain",
            "viande","necessiteux","affranchir","jeuner","editeur",
            "lecteur","etat","abonne","secourir","chiffrement"]
        if any(ind in text.lower() for ind in french_inds): continue
        if text.startswith("http") or len(text) < 15: continue
        results.add(text)
    for m in re.finditer(r'(question|answer):\s*["\x27]([^"\x27]{15,})["\x27]', content):
        text = m.group(2)
        if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text): continue
        if len(text) < 15: continue
        results.add(text)
    return results

def translate_chunk(texts, tool_name):
    if not texts:
        return {}
    prompt = (
        "Translate each English phrase to French. Return ONLY a JSON object where each key is the "
        "original English text and each value is its French translation. Keep HTML tags, emojis, "
        "and special chars unchanged. Do not add text outside the JSON.\n\n"
        f"Tool: {tool_name}\n"
        + "\n".join(f"{i+1}. {t}" for i, t in enumerate(texts))
    )
    payload = json.dumps({
        "model": "accounts/fireworks/models/deepseek-v4-pro",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 4000,
        "temperature": 0.1,
        "response_format": {"type": "json_object"},
    })
    result = subprocess.run(
        ["curl", "-s", "-X", "POST", API_URL,
         "-H", "Authorization: Bearer " + API_KEY,
         "-H", "Content-Type: application/json",
         "-d", payload],
        capture_output=True, text=True, timeout=120
    )
    try:
        resp = json.loads(result.stdout)
        content = resp["choices"][0]["message"]["content"]
        return json.loads(content)
    except Exception as e:
        print(f"    API error: {e}")
        if result.stdout:
            print(f"    Resp: {result.stdout[:300]}")
        return {}

def main():
    tools = sorted([d for d in os.listdir(TOOLS_DIR) if os.path.isdir(os.path.join(TOOLS_DIR, d))])
    
    tools_with_english = []
    for tool in tools:
        cf = os.path.join(TOOLS_DIR, tool, "Client.tsx")
        if not os.path.exists(cf): continue
        with open(cf) as f:
            content = f.read()
        eng_strings = find_english_strings(content)
        if eng_strings:
            tools_with_english.append((tool, list(eng_strings)))
    
    print("{} outils avec contenu anglais restant".format(len(tools_with_english)))
    
    total_fixed = 0
    total_str = 0
    
    for tool, eng_strings in tools_with_english:
        cf = os.path.join(TOOLS_DIR, tool, "Client.tsx")
        with open(cf) as f:
            content = f.read()
        
        long_strings = [s for s in eng_strings if len(s) > 30]
        if not long_strings:
            continue
        
        translations = {}
        for i in range(0, len(long_strings), 20):
            chunk = long_strings[i:i+20]
            print("  {}: translating {} ({}-{})...".format(
                tool, len(chunk), i+1, min(i+20, len(long_strings))))
            chunk_trans = translate_chunk(chunk, tool)
            translations.update(chunk_trans)
            time.sleep(0.3)
        
        if translations:
            new_c = content
            for eng, fr in translations.items():
                if eng and fr and eng != fr and len(fr) > 5:
                    new_c = new_c.replace('"' + eng + '"', '"' + fr + '"')
                    new_c = new_c.replace("'" + eng + "'", "'" + fr + "'")
            
            if new_c != content:
                with open(cf, "w") as f:
                    f.write(new_c)
                total_fixed += 1
                total_str += len(translations)
                print("    OK {}: {} strings".format(tool, len(translations)))
    
    print("\nDone! {} tools, {} strings".format(total_fixed, total_str))

if __name__ == "__main__":
    main()
