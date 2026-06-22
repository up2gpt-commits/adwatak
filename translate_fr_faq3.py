#!/usr/bin/env python3
"""Phase 3: Translate remaining French FAQ strings (batches 5-7 of 7)."""
import os, re, json, subprocess, sys, time

TOOLS_DIR = "/home/ops123/adwatak/src/app/fr/tools"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
FW_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
AUTH_HDR = "Authorization: Bearer fw_TwbdB1iMtWzWLL1J62Hcrm"

FR_WORDS = ['est','les','des','une','dans','pour','avec','sur','sans',
            'comment','quelle','quand','pourquoi','combien','tres',
            'plus','moins','notre','votre','leur','cette','chaque',
            'autre','mais','donc','alors','depuis','toujours','parfois',
            'encore','voici','voila','peut','calcule','affiche','donne',
            'naissance','jour','mois','annee','temps','heure','minute',
            'seconde','resultat','poids','taille','calculer','generer',
            'ouvrir','entrez','obtenez','copiez','partagez','remplissez',
            'cliquez','obtenir','faire','savoir','comprendre','permet',
            'gratuit','outil','page','information','description','fonction',
            'question','reponse','poser','corrige','erreur','analyse',
            'identifier','besoin','internet','fusionner','extraire',
            'compte','creer','imprimer','choisissez','enregistrer',
            'format','supporte','cependant','toutefois','plusieurs',
            'quelques','veillez','entrer','rechercher','trouver',
            'activer','exporter','usage','exemple','definition',
            'contenu','fonctionnement','sont','etes','avez','devez',
            'nombre','entre','depuis','jusqu','conseil','avertissement',
            'succes','chargement','terminer','annuler','confirmer',
            'valider','sauvegarder','supprimer','ajouter','modifier',
            'etape','aider','utiliser','pouces','kilos','centimetres',
            'grammes','livres','onces','editeur']

def is_eng(text):
    if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text):
        return False
    words = text.lower().split()
    fc = sum(1 for w in words if w.strip(".,!?;'()[]{}") in FR_WORDS)
    if fc >= 2 or (len(words) > 0 and fc/len(words) > 0.3):
        return False
    return True

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
             "-H", AUTH_HDR,
             "-d", payload],
            capture_output=True, text=True, timeout=180
        )
        resp = json.loads(result.stdout)
        if "error" in resp:
            return {}
        return json.loads(resp["choices"][0]["message"]["content"])
    except:
        return {}

def main():
    all_list = []
    for d in sorted(os.listdir(TOOLS_DIR)):
        if not os.path.isdir(os.path.join(TOOLS_DIR, d)): continue
        cf = os.path.join(TOOLS_DIR, d, "Client.tsx")
        if not os.path.exists(cf): continue
        with open(cf) as f:
            content = f.read()
    
    for m in re.finditer(r'(?:question|answer):\s*["\x27]([^"\x27]{15,})["\x27]', content):
        t = m.group(1)
        if is_eng(t) and not t.startswith("http"):
            all_list.append(t)
    for m in re.finditer(r'["\x27]([A-Z][^"\x27]{30,})["\x27]', content):
        t = m.group(1)
        if is_eng(t) and not t.startswith("http"):
            all_list.append(t)
    
    all_unique = sorted(set(all_list))
    print(str(len(all_unique)) + " unique strings")
    
    # Translate strings 800+ (batches 5-7)
    remaining = all_unique[800:]
    if not remaining:
        print("Nothing remaining!")
        return
    
    print("Translating " + str(len(remaining)) + " remaining strings...", flush=True)
    all_trans = {}
    for i in range(0, len(remaining), 200):
        chunk = remaining[i:i+200]
        print("Batch " + str(i//200+1) + "..." + str(len(chunk)), flush=True)
        all_trans.update(translate_batch(chunk))
        time.sleep(0.3)
    
    print("Got " + str(len(all_trans)) + " translations, applying...", flush=True)
    
    applied = 0
    for d in sorted(os.listdir(TOOLS_DIR)):
        if not os.path.isdir(os.path.join(TOOLS_DIR, d)): continue
        cf = os.path.join(TOOLS_DIR, d, "Client.tsx")
        if not os.path.exists(cf): continue
        with open(cf) as f:
            content = f.read()
        
        new_c = content
        cnt = 0
        for eng, fr in all_trans.items():
            if eng and fr and eng != fr and len(fr) > 2 and eng in new_c:
                new_c = new_c.replace('"' + eng + '"', '"' + fr + '"')
                new_c = new_c.replace("'" + eng + "'", "'" + fr + "'")
                cnt += 1
        
        if cnt > 0 and new_c != content:
            with open(cf, "w") as f:
                f.write(new_c)
            applied += 1
            print("  " + d + ": " + str(cnt), flush=True)
    
    print("Done! " + str(applied) + " tools updated", flush=True)

if __name__ == "__main__":
    main()
