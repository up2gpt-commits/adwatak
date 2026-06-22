#!/usr/bin/env python3
"""Fast batch: collect ALL English strings, translate in bulk, apply everywhere."""
import os, re, json, subprocess, sys, time

TOOLS_DIR = "/home/ops123/adwatak/src/app/fr/tools"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
FW_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"

FR_WORDS = ['est','les','des','une','dans','pour','avec','sur','sans',
            'comment','quelle','quand','pourquoi','combien','tres',
            'plus','moins','notre','votre','leur','cette','chaque',
            'autre','mais','donc','alors','depuis','toujours','parfois',
            'encore','voici','voila','peut','calcule','affiche','donne',
            'naissance','jour','mois','annee','temps','heure','minute',
            'seconde','resultat','poids','taille','calculer','generer',
            'ouvrir','entrez','obtenez','utilisez','copiez','partagez',
            'remplissez','cliquez','bouton','champs','requis','inscription',
            'utiliser','aucune','nombre','sont','conseil','aide',
            'annuler','confirmer','valider','supprimer','ajouter','modifier',
            'rechercher','trouver','exporter','importer','etape','obtenir',
            'faire','savoir','comprendre','permet','gratuit','outil','ligne',
            'navigateur','site','web','page','information','description',
            'fonction','question','reponse','poser','faq','frequentes',
            'corrige','veuillez','erreur','analyse','analyseur',
            'identifier','aliment','besoin','internet','fusionner','extraire',
            'compte','besoin','creer','imprimer','choisissez','enregistrer',
            'format','supporte','correcteur','verificateur','detecteur',
            'generateur','redimensionneur','compresseur','telechargeur',
            'convertisseur','nettoyeur','comparateur','lecteur','encodeur',
            'formateur','minifieur','editeur']

def is_eng(text):
    if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text):
        return False
    if re.search(r'[\xc7\x15e\x11e\x131\xd6\xdc]', text):
        return False
    words = text.lower().split()
    fc = sum(1 for w in words if w.strip(".,!?;'()[]{}") in FR_WORDS)
    if fc >= 2 or (len(words) > 0 and fc/len(words) > 0.25):
        return False
    return True

def extract_strings(content):
    results = set()
    for m in re.finditer(r'["\x27]([A-Za-z][^"\x27]{8,})["\x27]', content):
        t = m.group(1)
        if len(t) >= 8 and len(t) <= 500 and is_eng(t) and not t.startswith("http"):
            results.add(t)
    return results

def translate_batch(texts):
    if not texts:
        return {}
    prompt = "Translate each English phrase to French. Return JSON where key=English, value=French.\n"
    prompt += "\n".join(str(i+1) + ". " + t for i, t in enumerate(texts))
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
             "-H", "Content-Type: application/json",
             "-H", "Authorization: Bearer " + FW_KEY,
             "-d", payload],
            capture_output=True, text=True, timeout=180
        )
        resp = json.loads(result.stdout)
        if "error" in resp:
            print("  API error: " + str(resp["error"]), flush=True)
            return {}
        return json.loads(resp["choices"][0]["message"]["content"])
    except Exception as e:
        print("  Exception: " + str(e), flush=True)
        return {}

def main():
    # Phase 1: Collect all English strings from all tools
    all_strings = set()
    tool_map = {}  # tool_name -> set of strings
    
    for d in sorted(os.listdir(TOOLS_DIR)):
        if not os.path.isdir(os.path.join(TOOLS_DIR, d)):
            continue
        cf = os.path.join(TOOLS_DIR, d, "Client.tsx")
        if not os.path.exists(cf):
            continue
        with open(cf) as f:
            content = f.read()
        eng = extract_strings(content)
        if eng:
            tool_map[d] = eng
            all_strings.update(eng)
    
    total_tools = len(tool_map)
    total_strings = len(all_strings)
    all_list = sorted(all_strings)
    
    print("Found " + str(total_strings) + " unique English strings across " + str(total_tools) + " tools", flush=True)
    for s in all_list[:5]:
        print("  Sample: " + s[:80], flush=True)
    
    if not all_list:
        print("Nothing to translate!", flush=True)
        return
    
    # Phase 2: Translate in large batches (100 per batch)
    all_translations = {}
    batch_size = 100
    num_batches = -(-total_strings // batch_size)
    
    for i in range(0, len(all_list), batch_size):
        chunk = all_list[i:i+batch_size]
        batch_num = i//batch_size + 1
        print("Batch " + str(batch_num) + "/" + str(num_batches) + " (" + str(len(chunk)) + " strings)...", flush=True)
        trans = translate_batch(chunk)
        all_translations.update(trans)
        print("  Got " + str(len(trans)) + " translations", flush=True)
        time.sleep(0.5)
    
    print("Total translations: " + str(len(all_translations)), flush=True)
    
    # Print some translations to verify
    count = 0
    for eng, fr in all_translations.items():
        if eng != fr and len(fr) > 2:
            print("  " + eng[:50] + " -> " + fr[:50], flush=True)
            count += 1
            if count >= 10:
                break
    
    # Phase 3: Apply to files
    print("\nApplying translations...", flush=True)
    applied_count = 0
    for tool, eng_strings in sorted(tool_map.items()):
        cf = os.path.join(TOOLS_DIR, tool, "Client.tsx")
        with open(cf) as f:
            content = f.read()
        
        new_c = content
        tool_applied = 0
        for eng, fr in all_translations.items():
            if eng and fr and eng != fr and len(fr) > 2 and eng in new_c:
                new_c = new_c.replace('"' + eng + '"', '"' + fr + '"')
                new_c = new_c.replace("'" + eng + "'", "'" + fr + "'")
                new_c = new_c.replace(">" + eng + "<", ">" + fr + "<")
                tool_applied += 1
        
        if tool_applied > 0 and new_c != content:
            with open(cf, "w") as f:
                f.write(new_c)
            applied_count += 1
            print("  " + tool + ": " + str(tool_applied) + " applied", flush=True)
    
    print("\nDone! " + str(applied_count) + "/" + str(total_tools) + " tools updated", flush=True)

if __name__ == "__main__":
    main()
