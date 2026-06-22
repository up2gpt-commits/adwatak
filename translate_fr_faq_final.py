#!/usr/bin/env python3
"""Translate French FAQ content via API."""
import os, re, json, subprocess, sys, time

TOOLS_DIR = "/home/ops123/adwatak/src/app/fr/tools"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"

FW_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"

AUTH_HEADER = "Authorization: Bearer " + FW_KEY

FR_WORDS = ['est','les','des','une','dans','pour','avec','sur','sans',
            'comment','quelle','quand','pourquoi','combien','tres',
            'plus','moins','notre','votre','leur','cette','chaque',
            'autre','mais','donc','alors','depuis','toujours','parfois',
            'encore','voici','voila','peut','calcule','affiche','donne',
            'naissance','jour','mois','annee','temps','heure','minute',
            'seconde','resultat','poids','taille','calculer','generer',
            'ouvrir','entrez','obtenez','utilisez','copiez','partagez',
            'remplissez','cliquez','bouton','champs','requis','inscription',
            'utiliser','aucune','nombre','votre','sont','conseil','aide',
            'annuler','confirmer','valider','supprimer','ajouter','modifier',
            'rechercher','trouver','exporter','importer','etape','obtenir',
            'faire','savoir','comprendre','permet','gratuit','outil','ligne',
            'navigateur','site','web','page','information','description',
            'fonction','question','reponse','poser','faq','frequentes',
            'corrige','veuillez','entrer','erreur','analyse','analyseur',
            'identifier','aliment','besoin','internet','fusionner','extraire',
            'compte','besoin','creer','imprimer','choisissez','enregistrer',
            'format','supporte','devez','etes','avez','aller']

def is_eng(text):
    if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text):
        return False
    words = text.lower().split()
    fc = sum(1 for w in words if w.strip(".,!?;'()[]{}") in FR_WORDS)
    if fc >= 2 or (len(words) > 0 and fc/len(words) > 0.2):
        return False
    return True

def find_en(content):
    results = set()
    for m in re.finditer(r'(?:question|answer):\s*["\x27]([^"\x27]{8,})["\x27]', content):
        t = m.group(1)
        if len(t) >= 8 and is_eng(t):
            results.add(t)
    for m in re.finditer(r'["\x27]([A-Z][^"\x27]{30,})["\x27]', content):
        t = m.group(1)
        if not t.startswith("http") and is_eng(t):
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
        "max_tokens": 4000,
        "temperature": 0.1,
        "response_format": {"type": "json_object"},
    })
    try:
        result = subprocess.run(
            ["curl", "-s", "-X", "POST", API_URL,
             "-H", "Content-Type: application/json",
             "-H", AUTH_HEADER,
             "-d", payload],
            capture_output=True, text=True, timeout=120
        )
        resp = json.loads(result.stdout)
        if "error" in resp:
            return {}
        return json.loads(resp["choices"][0]["message"]["content"])
    except:
        return {}

def main():
    tools = sorted([d for d in os.listdir(TOOLS_DIR) if os.path.isdir(os.path.join(TOOLS_DIR, d))])
    print("Processing " + str(len(tools)) + " French tools...", flush=True)
    
    total_fixed = 0
    for i, tool in enumerate(tools):
        cf = os.path.join(TOOLS_DIR, tool, "Client.tsx")
        if not os.path.exists(cf):
            continue
        
        with open(cf) as f:
            content = f.read()
        
        eng_strings = find_en(content)
        if not eng_strings:
            continue
        
        eng_list = sorted(eng_strings)
        print("[" + str(i+1) + "/" + str(len(tools)) + "] " + tool + ": " + str(len(eng_list)) + " EN", flush=True)
        
        translations = {}
        for j in range(0, len(eng_list), 30):
            chunk = eng_list[j:j+30]
            chunk_trans = translate_batch(chunk)
            translations.update(chunk_trans)
            time.sleep(0.2)
        
        new_c = content
        applied = 0
        for eng, fr in translations.items():
            if eng and fr and eng != fr and len(fr) > 2 and eng in new_c:
                new_c = new_c.replace('"' + eng + '"', '"' + fr + '"')
                new_c = new_c.replace("'" + eng + "'", "'" + fr + "'")
                new_c = new_c.replace(">" + eng + "<", ">" + fr + "<")
                applied += 1
        
        if applied > 0 and new_c != content:
            with open(cf, "w") as f:
                f.write(new_c)
            total_fixed += 1
            print("  -> " + str(applied) + " applied", flush=True)
    
    print("\nDone! " + str(total_fixed) + "/" + str(len(tools)) + " tools", flush=True)

if __name__ == "__main__":
    main()
