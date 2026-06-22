#!/usr/bin/env python3
"""Phase 2: Translate French FAQ answers (long strings)."""
import os, re, json, subprocess, sys, time

TOOLS_DIR = "/home/ops123/adwatak/src/app/fr/tools"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
FW_KEY = "fw_U2wna5cfAR8i6Qmyzwc74m"

FR_WORDS = ['est','les','des','une','dans','pour','avec','sur','sans',
            'comment','quelle','quand','pourquoi','combien','tres',
            'plus','moins','notre','votre','leur','cette','chaque',
            'autre','mais','donc','alors','depuis','toujours','parfois',
            'encore','voici','voila','peut','calcule','affiche','donne',
            'naissance','jour','mois','annee','temps','heure','minute',
            'seconde','resultat','poids','taille','calculer','generer',
            'ouvrir','entrez','obtenez','utilisez','copiez','partagez',
            'remplissez','cliquez','bouton','obtenir','faire','savoir',
            'comprendre','permet','gratuit','outil','ligne','navigateur',
            'site','web','page','information','description','fonction',
            'question','reponse','poser','corrige','erreur','analyse',
            'identifier','aliment','besoin','internet','fusionner',
            'extraire','compte','creer','imprimer','choisissez',
            'enregistrer','format','supporte','cependant','toutefois',
            'pourtant','plusieurs','quelques','veillez','entrer',
            'rechercher','trouver','activer','configurer','exporter',
            'usage','exemple','definition','contenu','caracteristique',
            'sont','etes','avez','aller','devez','nombre','entre',
            'depuis','jusqu','accedez','conseil','astuce','avertissement',
            'succes','chargement','terminer','annuler','confirmer',
            'valider','sauvegarder','supprimer','ajouter','modifier',
            'filtrer','trier','activer','desactiver','exporter','importer',
            'etape','aider','utiliser','pouces','kilos','centimetres',
            'grammes','livres','onces','metrique','correcteur',
            'verificateur','detecteur','generateur','convertisseur',
            'nettoyeur','comparateur','lecteur','encodeur','editeur']

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
             "-H", "Authorization: Bearer " + FW_KEY,
             "-d", payload],
            capture_output=True, text=True, timeout=180
        )
        resp = json.loads(result.stdout)
        if "error" in resp:
            print("  API err: " + str(resp["error"]), flush=True)
            return {}
        return json.loads(resp["choices"][0]["message"]["content"])
    except:
        return {}

def main():
    # Collect ALL strings from question: and answer: fields
    all_faq = set()
    tool_faq = {}
    
    for d in sorted(os.listdir(TOOLS_DIR)):
        if not os.path.isdir(os.path.join(TOOLS_DIR, d)): continue
        cf = os.path.join(TOOLS_DIR, d, "Client.tsx")
        if not os.path.exists(cf): continue
        with open(cf) as f:
            content = f.read()
        
        eng = set()
        # FAQ question/answer strings
        for m in re.finditer(r'(question|answer):\s*["\x27]([^"\x27]{15,})["\x27]', content):
            t = m.group(2)
            if is_eng(t) and not t.startswith("http"):
                eng.add(t)
        # SEO content strings
        for m in re.finditer(r'["\x27]([A-Z][^"\x27]{30,})["\x27]', content):
            t = m.group(1)
            if is_eng(t) and not t.startswith("http"):
                eng.add(t)
        
        if eng:
            tool_faq[d] = eng
            all_faq.update(eng)
    
    all_list = sorted(all_faq)
    print(str(len(all_list)) + " unique English strings across " + str(len(tool_faq)) + " tools", flush=True)
    
    if not all_list:
        print("Nothing to translate!", flush=True)
        return
    
    # Translate in batches of 50
    all_trans = {}
    for i in range(0, len(all_list), 250):
        chunk = all_list[i:i+250]
        print("Batch " + str(i//250+1) + "/" + str(-(-len(all_list)//250)) + " (" + str(len(chunk)) + ")", flush=True)
        trans = translate_batch(chunk)
        all_trans.update(trans)
        time.sleep(0.3)
    
    print("Got " + str(len(all_trans)) + " translations", flush=True)
    
    # Apply
    applied_tools = 0
    for tool, eng_strings in sorted(tool_faq.items()):
        cf = os.path.join(TOOLS_DIR, tool, "Client.tsx")
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
            applied_tools += 1
            print("  " + tool + ": " + str(cnt), flush=True)
    
    print("Done! " + str(applied_tools) + "/" + str(len(tool_faq)) + " tools", flush=True)

if __name__ == "__main__":
    main()
