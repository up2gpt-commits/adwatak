#!/usr/bin/env python3
"""Translate remaining English strings in French Client.tsx files."""
import os, re, json, subprocess

TOOLS_DIR = "/home/ops123/adwatak/src/app/fr/tools"
API_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
API_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"

FR_DICT = {
    "Age Calculator": "Calculateur d'Âge",
    "Calorie Calculator": "Calculateur de Calories",
    "Unit Converter": "Convertisseur d'Unités",
    "Word Counter": "Compteur de Mots",
    "Password Generator": "Générateur de Mots de Passe",
    "QR Generator": "Générateur de QR Code",
    "QR Code Generator": "Générateur de QR Code",
    "QR Reader": "Lecteur de QR Code",
    "Invoice Generator": "Générateur de Factures",
    "Name Generator": "Générateur de Noms",
    "Random Number Generator": "Générateur de Nombres Aléatoires",
    "Random Number": "Nombre Aléatoire",
    "Stopwatch": "Chronomètre",
    "Text Cleaner": "Nettoyeur de Texte",
    "Text Case": "Convertisseur de Casse",
    "Text Case Converter": "Convertisseur de Casse",
    "Text Compare": "Comparateur de Texte",
    "Base64 Encoder": "Encodeur Base64",
    "Hash Generator": "Générateur de Hachage",
    "JSON Formatter": "Formateur JSON",
    "SEO Audit": "Audit SEO",
    "SEO Content Generator": "Générateur de Contenu SEO",
    "Compound Interest": "Intérêts Composés",
    "Profit Margin": "Marge Bénéficiaire",
    "Currency Converter": "Convertisseur de Devises",
    "Color Converter": "Convertisseur de Couleurs",
    "Image Resizer": "Redimensionneur d'Images",
    "Image Compressor": "Compresseur d'Images",
    "Image to PDF": "Image en PDF",
    "PDF Merger": "Fusionneur de PDF",
    "PDF Splitter": "Séparateur de PDF",
    "PDF Compressor": "Compresseur de PDF",
    "PDF to Word": "PDF en Word",
    "Remove Background": "Suppresseur d'Arrière-plan",
    "YouTube Thumbnail Downloader": "Téléchargeur de Miniatures YouTube",
    "WhatsApp Link": "Lien WhatsApp",
    "Number to Words": "Nombre en Toutes Lettres",
    "Bio Generator": "Générateur de Bio",
    "Hijri Converter": "Convertisseur Hijri",
    "Qibla Direction": "Direction de la Qibla",
    "Direction Qibla": "Direction de la Qibla",
    "Prayer Times": "Heures de Prière",
    "Heures de Priere": "Heures de Prière",
    "Tasbeeh Counter": "Compteur Tasbih",
    "Compteur Tasbih": "Compteur Tasbih",
    "Fidyah Kaffarah": "Fidya Kaffara",
    "AI Content Detector": "Détecteur de Contenu IA",
    "Paraphrasing Tool": "Outil de Paraphrase",
    "Grammar Checker": "Correcteur Grammatical",
    "Markdown Editor": "Éditeur Markdown",
    "CSS Minifier": "Minifieur CSS",
    "Encryption Tool": "Outil de Chiffrement",
    "Time Zone Converter": "Convertisseur de Fuseau Horaire",
    "Timezone Converter": "Convertisseur de Fuseau Horaire",
    "Lorem Ipsum": "Générateur Lorem Ipsum",
    "Plagiarism Checker": "Vérificateur de Plagiat",
    "Keyword Research Tool": "Outil de Recherche de Mots-Clés",
    "Direction de la Qibla": "Direction de la Qibla",
    "Convertisseur Hijri": "Convertisseur Hijri",
    "Correcteur grammatical": "Correcteur Grammatical",
    "Outil de paraphrase": "Outil de Paraphrase",
    "Compteur de mots": "Compteur de Mots",
    "Comparateur de texte": "Comparateur de Texte",
    "Convertisseur de casse": "Convertisseur de Casse",
    "Nettoyeur de texte": "Nettoyeur de Texte",

    "Metric": "Métrique",
    "Imperial": "Impérial",
    "Weight (kg)": "Poids (kg)",
    "Weight (lbs)": "Poids (lbs)",
    "Height (cm)": "Taille (cm)",
    "Height (inches)": "Taille (pouces)",
    "Cost ($)": "Coût ($)",
    "Selling Price ($) — optional": "Prix de Vente ($) — optionnel",
    "Desired Margin (%) — optional": "Marge Souhaitée (%) — optionnel",
    "Status Code": "Code d'État",
    "Word Count": "Nombre de Mots",
    "H1 Tags": "Balises H1",
    "H2 Tags": "Balises H2",
    "Missing Alt": "Alt Manquant",
    "Internal Links": "Liens Internes",
    "External Links": "Liens Externes",
    "Underweight": "Insuffisance Pondérale",
    "Normal": "Poids Normal",
    "Overweight": "Surpoids",
    "Obese": "Obésité",
    "Code 128": "Code 128",
    "Code 39": "Code 39",
    "EAN-13": "EAN-13",
    "EAN-8": "EAN-8",
    "UPC-A": "UPC-A",
    "Codabar": "Codabar",
    "ITF-14": "ITF-14",
    "Pharmacode": "Pharmacode",
    "Professional": "Professionnel",
    "Creative": "Créatif",
    "Simple": "Simple",
    "Funny": "Amusant",
    "Rice": "Riz",
    "Bread": "Pain",
    "Meat": "Viande",
    "Your BMI": "Votre IMC",
    "Ihram": "Ihram",
    "Tawaf": "Tawaf",
    "Halq or Taqsir": "Halq ou Taqsir",
    "Umrah Visa": "Visa Omra",
    "Flight Ticket": "Billet d'Avion",
    "Hotel in Makkah": "Hôtel à La Mecque",
    "Hotel in Madinah": "Hôtel à Médine",
    "Local Transport": "Transport Local",
    "Daily Expenses": "Dépenses Quotidiennes",
    "New Item": "Nouvel Élément",
    "Feed 10 needy people": "Nourrir 10 nécessiteux",
    "Clothe 10 needy people": "Habiller 10 nécessiteux",
    "Free a slave": "Affranchir un esclave",
    "Fast 3 days": "Jeûner 3 jours",
    "Fast 60 consecutive days": "Jeûner 60 jours consécutifs",
    "Feed 60 needy people": "Nourrir 60 nécessiteux",
    "Feed 1 needy person per day": "Nourrir 1 nécessiteux par jour",
    "Feed 2 needy people per day": "Nourrir 2 nécessiteux par jour",
    "Get accurate keyword suggestions to boost your SEO": "Obtenez des suggestions de mots-clés précises pour booster votre SEO",
}

def translate_batch(texts):
    if not texts:
        return {}
    prompt = f"""Translate each of the following English phrases to French. Return a JSON object where each key is the original English text and each value is its French translation. If the text is already French or contains French characters (éèêëàâùûüôöîïç), return it unchanged.

Texts:
{chr(10).join(f'- {t}' for t in texts)}"""
    payload = json.dumps({
        "model": "accounts/fireworks/models/deepseek-v4-pro",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 2000,
        "temperature": 0.1,
        "response_format": {"type": "json_object"},
    })
    result = subprocess.run(
        ["curl", "-s", "-X", "POST", API_URL,
         "-H", "Authorization: Bearer " + API_KEY,
         "-H", "Content-Type: application/json",
         "-d", payload],
        capture_output=True, text=True, timeout=60
    )
    try:
        resp = json.loads(result.stdout)
        content = resp["choices"][0]["message"]["content"]
        return json.loads(content)
    except Exception as e:
        print(f"  API error: {e}")
        if result.stdout:
            print(f"  Response: {result.stdout[:500]}")
        return {}

def main():
    tools = sorted([d for d in os.listdir(TOOLS_DIR) if os.path.isdir(os.path.join(TOOLS_DIR, d))])
    print(f"Traitement de {len(tools)} outils français...")

    # Phase 1: Dictionary
    fixed = 0
    for tool in tools:
        cf = os.path.join(TOOLS_DIR, tool, "Client.tsx")
        if not os.path.exists(cf): continue
        with open(cf) as f:
            orig = f.read()
        content = orig
        for eng, fr in sorted(FR_DICT.items(), key=lambda x: -len(x[0])):
            content = content.replace('"' + eng + '"', '"' + fr + '"')
            content = content.replace("'" + eng + "'", "'" + fr + "'")
        if content != orig:
            with open(cf, "w") as f:
                f.write(content)
            fixed += 1
    print(f"  Phase 1: {fixed}/{len(tools)} corrigés")

    # Phase 2: Check for remaining English
    remaining = set()
    for tool in tools:
        cf = os.path.join(TOOLS_DIR, tool, "Client.tsx")
        if not os.path.exists(cf): continue
        with open(cf) as f:
            content = f.read()
        for m in re.finditer(r'(["\'])([A-Z][a-zA-Z\s()\-\d,;:.!?\']{3,})\1', content):
            text = m.group(2)
            if re.search(r'[éèêëàâùûüôöîïçÉÈÊËÀÂÙÛÜÔÖÎÏÇ]', text): continue
            french_indicators = ["calcul", "poids", "taille", "âge", "compteur", "minuteur",
                "convertisseur", "générateur", "détecteur", "correcteur", "audit",
                "mots", "texte", "couleur", "nombre", "aléatoire", "facture",
                "fusionneur", "séparateur", "compresseur", "redimensionneur",
                "suppresseur", "téléchargeur", "miniature", "liens", "balises",
                "marge", "coût", "prix", "vente", "optionnel", "riz", "pain",
                "viande", "nécessiteux", "affranchir", "jeûner", "abonné",
                "personne", "jour", "secourir", "chiffrement", "éditeur",
                "format", "lecteur", "code", "état"]
            if any(ind in text.lower() for ind in french_indicators): continue
            if re.match(r"^[\d\s()°%$]+$", text): continue
            if text in FR_DICT: continue
            if len(text) < 5: continue
            if text.startswith("http") or text.startswith("www"): continue
            remaining.add(text)

    if remaining:
        print(f"  {len(remaining)} chaînes restantes...")
        for t in sorted(remaining)[:15]:
            print(f"    - '{t}'")
        translations = translate_batch(sorted(remaining))
        if translations:
            applied = 0
            for tool in tools:
                cf = os.path.join(TOOLS_DIR, tool, "Client.tsx")
                if not os.path.exists(cf): continue
                with open(cf) as f:
                    content = f.read()
                new_c = content
                for eng, fr in translations.items():
                    if eng and fr and eng != fr:
                        new_c = new_c.replace('"' + eng + '"', '"' + fr + '"')
                        new_c = new_c.replace("'" + eng + "'", "'" + fr + "'")
                if new_c != content:
                    with open(cf, "w") as f:
                        f.write(new_c)
                    applied += 1
            print(f"  Phase 2: {applied} outils mis à jour")
    else:
        print("  Phase 2: aucune chaîne anglaise restante")

    print("Terminé!")

if __name__ == "__main__":
    main()
