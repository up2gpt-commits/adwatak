#!/usr/bin/env python3
"""
Translate all French tool Client.tsx files and static pages from English to French.
Processes 77 tools + static pages in src/app/fr/
"""

import os, re, json, shutil

BASE = "/home/ops123/adwatak/src/app/fr"

# ─── Common UI text translations ───
UI_TRANS = {
    "Home": "Accueil",
    "About": "À propos",
    "Privacy": "Confidentialité",
    "Terms": "Conditions",
    "Blog": "Blog",
    "Contact": "Contact",
    "Search": "Rechercher",
    "Share": "Partager",
    "Copy": "Copier",
    "Copied": "Copié",
    "Download": "Télécharger",
    "Upload": "Téléverser",
    "Result": "Résultat",
    "Results": "Résultats",
    "Calculate": "Calculer",
    "Generate": "Générer",
    "Reset": "Réinitialiser",
    "Clear": "Effacer",
    "Submit": "Envoyer",
    "Close": "Fermer",
    "Open": "Ouvrir",
    "More": "Plus",
    "Less": "Moins",
    "Free": "Gratuit",
    "Free tool": "Outil gratuit",
    "online": "en ligne",
    "tool": "outil",
    "Tools": "Outils",
    "All tools": "Tous les outils",
    "Related Tools": "Outils similaires",
    "Related tools": "Outils similaires",
    "Share this tool": "Partager cet outil",
    "Embed this tool": "Intégrer cet outil",
    "Embed": "Intégrer",
    "Copy link": "Copier le lien",
    "Copy code": "Copier le code",
    "Copy embed code": "Copier le code d'intégration",
    "Read more": "Lire la suite",
    "Show more": "Afficher plus",
    "Show less": "Afficher moins",
    "Loading": "Chargement",
    "Error": "Erreur",
    "Success": "Succès",
    "Invalid input": "Entrée invalide",
    "Please enter a valid value": "Veuillez entrer une valeur valide",
    "less than a minute": "moins d'une minute",
    "Click the calculate or generate button": "Cliquez sur le bouton Calculer ou Générer",
    "Copy, download, or share the results": "Copiez, téléchargez ou partagez les résultats",
    "Navigate to this tool page on Adwatak": "Accédez à cet outil sur Adwatak",
    "Fill in the required fields": "Remplissez les champs requis",
    "Get results": "Obtenez les résultats",
    "Use or share": "Utilisez ou partagez",
    "Enter your data": "Entrez vos données",
    "Open the tool": "Ouvrir l'outil",
    "Our free": "Notre",
    "free": "gratuit",
    "Free online": "Gratuit en ligne",
    "No registration required": "Aucune inscription requise",
    "no signup required": "aucune inscription requise",
    "No signup required": "Aucune inscription requise",
    "Online": "En ligne",
    "Fast and accurate": "Rapide et précis",
    "Privacy-first — no data sent to server": "Confidentialité — aucune donnée envoyée au serveur",
    "Works offline in browser": "Fonctionne hors ligne dans le navigateur",
    "Modern browser (Chrome, Firefox, Safari, Edge)": "Navigateur moderne (Chrome, Firefox, Safari, Edge)",
    "Free to use": "Gratuit à utiliser",
    "Free online tool": "Outil en ligne gratuit",
    "Free online tool.": "Outil en ligne gratuit.",
    "Works directly in your browser.": "Fonctionne directement dans votre navigateur.",
    "Everything runs in your browser — no data is sent to any server": "Tout s'exécute dans votre navigateur — aucune donnée n'est envoyée à un serveur",
    "Everything runs in your browser": "Tout s'exécute dans votre navigateur",
    "This tool works 100% client-side — your text never leaves your browser. Full privacy guaranteed.": "Cet outil fonctionne 100% côté client — vos données ne quittent jamais votre navigateur. Confidentialité totale garantie.",
    "This tool works 100% client-side": "Cet outil fonctionne 100% côté client",
    "Full privacy guaranteed": "Confidentialité totale garantie",
    "client-side only": "côté client uniquement",
    "No data sent to server": "Aucune donnée envoyée au serveur",
    "No registration needed": "Aucune inscription nécessaire",
    "Enter text...": "Entrez le texte...",
    "Enter value...": "Entrez une valeur...",
    "Enter your text": "Entrez votre texte",
    "Enter a value": "Entrez une valeur",
    "Execute": "Exécuter",
    "Convert": "Convertir",
    "Encode": "Encoder",
    "Decode": "Décoder",
    "Encode to Base64": "Encoder en Base64",
    "Decode from Base64": "Décoder depuis Base64",
    "Base64 Encode": "Encodage Base64",
    "Base64 Decode": "Décodage Base64",
    "URL Encode": "Encodage URL",
    "URL Decode": "Décodage URL",
}

# ─── FAQ question translations (question → French) ───
FAQ_Q = {
    # General
    "What is": "Qu'est-ce que",
    "How does": "Comment fonctionne",
    "How to": "Comment",
    "How do I": "Comment",
    "Why use": "Pourquoi utiliser",
    "When should I": "Quand utiliser",
    "Is it": "Est-ce que",
    "Can I": "Puis-je",
    "What are": "Quels sont",
    "What is the difference": "Quelle est la différence",
    "Is this tool free": "Cet outil est-il gratuit",
    "Is this tool": "Cet outil est-il",
    "Is there": "Existe-t-il",
    
    # Specific tool questions
    "How accurate is": "Quelle est la précision",
    "How to calculate": "Comment calculer",
    "What is my age": "Quel est mon âge",
    "What is chronological age": "Qu'est-ce que l'âge chronologique",
    "What is the formula": "Quelle est la formule",
    "What factors affect": "Quels facteurs influencent",
    
    # Time/date
    "What is a leap year": "Qu'est-ce qu'une année bissextile",
    "How many days": "Combien de jours",
    "Age calculator for legal purposes": "Calculateur d'âge pour usage légal",
    "What is your age in dog years": "Quel est votre âge en années de chien",
    "What is biological age": "Qu'est-ce que l'âge biologique",
    "How to calculate age for retirement planning": "Comment calculer l'âge pour la planification de la retraite",
    
    # Financial
    "What is EMI": "Qu'est-ce que l'EMI",
    "What is an EMI": "Qu'est-ce qu'un EMI",
    "What is the EMI formula": "Quelle est la formule de l'EMI",
    "How to calculate EMI": "Comment calculer l'EMI",
    "What is the difference between fixed and variable": "Quelle est la différence entre taux fixe et variable",
    "Can I repay early": "Puis-je rembourser par anticipation",
    "What's a safe EMI-to-income ratio": "Quel est le ratio EMI/revenu sûr",
    "How accurate is an EMI calculator": "Quelle est la précision d'un calculateur EMI",
    "What's the difference between EMI and simple installment": "Différence entre EMI et versement simple",
    
    # Zakat/Islamic
    "What is Zakat": "Qu'est-ce que la Zakat",
    "What is Nisab": "Qu'est-ce que le Nisab",
    "What wealth is Zakat-eligible": "Quels biens sont éligibles à la Zakat",
    "How to calculate Zakat": "Comment calculer la Zakat",
    "Do I pay Zakat on": "Dois-je payer la Zakat sur",
    
    # Tech/Dev
    "What is Base64": "Qu'est-ce que Base64",
    "Why use Base64 encoding": "Pourquoi utiliser l'encodage Base64",
    "Is Base64 secure": "Base64 est-il sécurisé",
    "Base64 vs Base64URL": "Base64 vs Base64URL",
    "How much does Base64 expand data": "De combien Base64 augmente-t-il les données",
    "Can I Base64 an image": "Puis-je encoder une image en Base64",
    "What is JSON": "Qu'est-ce que JSON",
    "What is URL encoding": "Qu'est-ce que l'encodage URL",
    "What is HTML encoding": "Qu'est-ce que l'encodage HTML",
    
    # Health
    "What is BMI": "Qu'est-ce que l'IMC",
    "What is a healthy BMI": "Qu'est-ce qu'un IMC sain",
    "What is body fat percentage": "Qu'est-ce que le pourcentage de graisse corporelle",
    "How to lower BMI": "Comment réduire l'IMC",
    "Is BMI accurate": "L'IMC est-il précis",
    "BMI for children": "IMC pour les enfants",
    "BMI for athletes": "IMC pour les athlètes",
    "BMI vs body fat": "IMC vs graisse corporelle",
    
    # Prayer times
    "How are prayer times calculated": "Comment sont calculées les heures de prière",
    "What is Fajr time": "Quelle est l'heure du Fajr",
    "What is the difference between Fajr and Sunrise": "Différence entre Fajr et lever du soleil",
    "What is Dhuhr time": "Quelle est l'heure du Dhuhr",
    "What is Asr time": "Quelle est l'heure du Asr",
    "What is Maghrib time": "Quelle est l'heure du Maghrib",
    "What is Isha time": "Quelle est l'heure du Isha",
    "Calculation methods": "Méthodes de calcul",
    "Muslim World League": "Ligue islamique mondiale",
    "Egyptian General Authority": "Autorité générale égyptienne",
    "University of Islamic Sciences, Karachi": "Université des sciences islamiques de Karachi",
    "Umm al-Qura University, Makkah": "Université d'Oum al-Qoura, La Mecque",
}

# ─── French translations for README-style content ───
README_FR = {
    "About": "À propos",
    "Privacy": "Confidentialité",
    "Terms of Service": "Conditions d'utilisation",
    "Contact": "Contact",
    "Home": "Accueil",
}

NO_TRANSLATE_PATTERNS = [
    r'import\s+',
    r'className=',
    r'href=',
    r'url=',
    r'www\.',
    r'http',
    r'adwatak',
    r'\.cloud',
    r'\.com',
    r'\.org',
    r'\.io',
    r'javascript:',
    r'#\w+',
]

def should_skip_line(line):
    """Check if a line should not have its text translated"""
    stripped = line.strip()
    
    # Skip code-only lines
    if any(re.match(p, stripped) for p in [
        r'^import ', r'^const ', r'^let ', r'^var ', r'^function', 
        r'^export ', r'^return ', r'^interface ', r'^type ',
        r'^\}', r'^\{', r'^\]', r'^\[', r'^\s*;',
    ]):
        return True
    
    # Skip lines with code keywords
    if 'className=' in stripped and not ('>' in stripped or '<' in stripped):
        return True
    
    return False

def translate_faqs(content):
    """Translate FAQ question/answer pairs to French"""
    # Translate question fields
    content = re.sub(
        r'(question:\s*)"([^"]+)"',
        lambda m: f'{m.group(1)}"{translate_text_faq(m.group(2))}"',
        content
    )
    # Translate answer fields
    content = re.sub(
        r'(answer:\s*)"([^"]+)"',
        lambda m: f'{m.group(1)}"{translate_text_answer(m.group(2))}"',
        content
    )
    return content

def translate_text_faq(text):
    """Translate FAQ question text to French"""
    # Check if we have a direct match
    for eng, fr in sorted(FAQ_Q.items(), key=lambda x: -len(x[0])):
        if text.startswith(eng):
            remainder = text[len(eng):]
            return fr + remainder
    
    # If the text starts with "What", "How", "Why", "Is", "Can", etc.
    # Try basic pattern matching
    if text.startswith("What ") or text.startswith("what "):
        return re.sub(r'^[Ww]hat', 'Qu\'', text, count=1)
    if text.startswith("How ") or text.startswith("how "):
        return re.sub(r'^[Hh]ow', 'Comment', text, count=1)
    if text.startswith("Why ") or text.startswith("why "):
        return re.sub(r'^[Ww]hy', 'Pourquoi', text, count=1)
    if text.startswith("Is ") or text.startswith("is "):
        return re.sub(r'^[Ii]s', 'Est-ce que', text, count=1)
    if text.startswith("Can ") or text.startswith("can "):
        return re.sub(r'^[Cc]an', 'Puis-je', text, count=1)
    if text.startswith("Do I ") or text.startswith("do I "):
        return re.sub(r'^[Dd]o I', 'Dois-je', text, count=1)
    if "difference between" in text.lower():
        return text.replace("difference between", "différence entre")
    
    return text

def translate_text_answer(text):
    """Translate FAQ answer text to French"""
    result = text
    
    # Common substitutions
    subs = {
        "free": "gratuit",
        "Free": "Gratuit",
        "online": "en ligne",
        "Online": "En ligne",
        "tool": "outil",
        "Tool": "Outil",
        "website": "site web",
        "Website": "Site web",
        "browser": "navigateur",
        "Browser": "Navigateur",
        "Calculate": "Calculez",
        "calculate": "calculer",
        "Enter": "Entrez",
        "enter": "entrez",
        "Enter the": "Entrez le",
        "Click": "Cliquez",
        "click": "cliquez",
        "Result": "Résultat",
        "result": "résultat",
        "Results": "Résultats",
        "results": "résultats",
        "Example": "Exemple",
        "example": "exemple",
        "Note": "Remarque",
        "note": "remarque",
        "Tip": "Astuce",
        "tip": "astuce",
        "Warning": "Avertissement",
        "warning": "avertissement",
        "Error": "Erreur",
        "error": "erreur",
        "Success": "Réussi",
        "success": "réussi",
        "Invalid": "Invalide",
        "invalid": "invalide",
        "Please": "Veuillez",
        "please": "veuillez",
        "Your": "Votre",
        "your": "votre",
        "Our": "Notre",
        "our": "notre",
        "This": "Ce",
        "this": "ce",
        "That": "Cela",
        "that": "cela",
        "Use": "Utilisez",
        "use": "utilisez",
        "Using": "Utilisation",
        "using": "utilisation",
        "Supports": "Prend en charge",
        "supports": "prend en charge",
        "Support": "Assistance",
        "support": "assistance",
        "Value": "Valeur",
        "value": "valeur",
        "Values": "Valeurs",
        "values": "valeurs",
        "Amount": "Montant",
        "amount": "montant",
        "Total": "Total",
        "total": "total",
        "Interest": "Intérêts",
        "interest": "intérêts",
        "Principal": "Principal",
        "principal": "principal",
        "Monthly": "Mensuel",
        "monthly": "mensuel",
        "Payment": "Paiement",
        "payment": "paiement",
        "Rate": "Taux",
        "rate": "taux",
        "Year": "Année",
        "year": "année",
        "Years": "Ans",
        "years": "ans",
        "Month": "Mois",
        "month": "mois",
        "Months": "Mois",
        "months": "mois",
        "Day": "Jour",
        "day": "jour",
        "Days": "Jours", 
        "days": "jours",
        "Hour": "Heure",
        "hour": "heure",
        "Hours": "Heures",
        "hours": "heures",
        "Minute": "Minute",
        "minute": "minute",
        "Minutes": "Minutes",
        "minutes": "minutes",
        "Second": "Seconde",
        "second": "seconde",
        "Seconds": "Secondes",
        "seconds": "secondes",
        "Percentage": "Pourcentage",
        "percentage": "pourcentage", 
        
        # Islamic terms
        "Zakat": "Zakat",
        "zakat": "zakat",
        "Fidyah": "Fidyah",
        "fidyah": "fidyah",
        "Kaffarah": "Kaffarah",
        "kaffarah": "kaffarah",
        "Tasbeeh": "Tasbih",
        "tasbeeh": "tasbih",
        "Qibla": "Qibla",
        "qibla": "qibla",
        "Umrah": "Omra",
        "umrah": "omra",
        "Hijri": "Hijri",
        "hijri": "hijri",
        "Ramadan": "Ramadan",
        "ramadan": "ramadan",
        "Allah": "Allah",
        "allah": "Allah",
        "Halal": "Halal",
        "halal": "halal",
        "Makkah": "La Mecque",
        "Mekkah": "La Mecque",
        "Mecca": "La Mecque",
        "Kaaba": "Kaaba",
        "kaaba": "Kaaba",
        "Fajr": "Fajr",
        "Dhuhr": "Dhuhr",
        "Asr": "Asr",
        "Maghrib": "Maghrib",
        "Isha": "Isha",
        
        # Financial terms
        "EMI": "EMI",
        "Loan": "Prêt",
        "loan": "prêt",
        "Loans": "Prêts",
        "loans": "prêts",
        "Mortgage": "Prêt hypothécaire",
        "mortgage": "prêt hypothécaire",
        "Finance": "Financement",
        "finance": "financement",
        "Insurance": "Assurance",
        "insurance": "assurance",
        "Tax": "Impôt",
        "tax": "impôt",
        "VAT": "TVA",
        "Amortization": "Amortissement",
        "amortization": "amortissement",
        "Down payment": "Acompte",
        "down payment": "acompte",
        
        # Tech terms
        "Server": "Serveur",
        "server": "serveur",
        "Client": "Client",
        "client": "client",
        "Algorithm": "Algorithme",
        "algorithm": "algorithme",
        "Encryption": "Chiffrement",
        "encryption": "chiffrement",
        "Decryption": "Déchiffrement",
        "decryption": "déchiffrement",
        "Hash": "Hash",
        "hash": "hash",
        "Input": "Entrée",
        "input": "entrée",
        "Output": "Sortie",
        "output": "sortie",
        "Default": "Par défaut",
        "default": "par défaut",
        "Custom": "Personnalisé",
        "custom": "personnalisé",
        "Option": "Option",
        "option": "option",
        "Options": "Options",
        "options": "options",
    }
    
    # Apply substitutions (longest first to avoid partial matches)
    for old, new in sorted(subs.items(), key=lambda x: -len(x[0])):
        result = result.replace(old, new)
    
    return result

def translate_seo_content(content):
    """Translate SEO content string arrays"""
    def translate_seo_string(match):
        full = match.group(0)
        inner = match.group(1)
        translated = translate_seo_text(inner)
        return full.replace(inner, translated)
    
    # Find SEO content arrays and translate their strings
    content = re.sub(
        r'("[^"]*?(?:tool|calculator|converter|encoder|generator|checker|formatter|reader|editor|cleaner)[^"]*?")',
        lambda m: translate_seo_string(m),
        content
    )
    return content

def translate_seo_text(text):
    """Translate SEO text paragraphs"""
    # Common SEO paragraph starters
    result = text
    
    starters = {
        "Our free": "Notre",
        "Free online": "En ligne gratuit",
        "Use": "Utilisez",
        "Calculate": "Calculez",
        "Generate": "Générez",
        "Convert": "Convertissez",
        "Encode": "Encodez",
        "Decode": "Décodez",
        "Check": "Vérifiez",
        "Compare": "Comparez",
        "Find": "Trouvez",
        "Get": "Obtenez",
        "Read": "Lisez",
    }
    
    for eng, fr in starters.items():
        if result.startswith(eng):
            result = fr + result[len(eng):]
            break
    
    # General replacements
    replacements = {
        "free": "gratuit",
        "Free": "Gratuit",
        "online tool": "outil en ligne",
        "Online tool": "Outil en ligne",
        "tool": "outil",
        "Tool": "Outil",
        "tools": "outils", 
        "Tools": "Outils",
        "website": "site web",
        "Website": "Site web",
        "website's": "du site",
        "your": "votre",
        "Your": "Votre",
        "browser": "navigateur",
        "server": "serveur",
        "no signup": "sans inscription",
        "No signup": "Sans inscription",
        "no registration": "sans inscription",
        "No registration": "Sans inscription",
        "client-side": "côté client",
        "Simple": "Simple",
        "simple": "simple",
        "Fast and accurate": "Rapide et précis",
        "Free and accurate": "Gratuit et précis",
        "No data sent": "Aucune donnée envoyée",
    }
    
    for old, new in replacements.items():
        result = result.replace(old, new)
    
    return result

def translate_buttons_and_placeholders(content):
    """Translate button text and placeholder text"""
    # Translate placeholders
    content = re.sub(
        r'(placeholder=")([^"]+)(")',
        lambda m: f'{m.group(1)}{translate_simple_text(m.group(2))}{m.group(3)}',
        content
    )
    # Translate button text (text between > and </button)
    content = re.sub(
        r'(>)([^<{]+)(</button>)',
        lambda m: f'{m.group(1)}{translate_simple_text(m.group(2).strip())}{m.group(3)}',
        content
    )
    return content

def translate_simple_text(text):
    """Simple text translation for buttons/placeholders"""
    text = text.strip()
    
    # Direct match in UI_TRANS
    if text in UI_TRANS:
        return UI_TRANS[text]
    
    # Check if it's a ternary expression (keep as is)
    if '?' in text and ':' in text:
        return text
    
    # Word-by-word translation attempt
    words = text.split()
    result_words = []
    for w in words:
        if w in UI_TRANS:
            result_words.append(UI_TRANS[w])
        else:
            result_words.append(w)
    
    result = ' '.join(result_words)
    return result

def translate_howto_schema(content):
    """Translate HowTo schema text"""
    # Translate name fields in HowTo steps
    content = re.sub(
        r'\{name:"([^"]+)",text:"([^"]+)"\}',
        lambda m: '{name:"' + translate_simple_text(m.group(1)) + '",text:"' + translate_simple_text(m.group(2)) + '"}',
        content
    )
    return content

def translate_schema_fields(content):
    """Translate schema name/description fields"""
    # schemaName/name variables
    content = re.sub(
        r'(const schemaName\s*=\s*")([^"]+)(")',
        lambda m: m.group(1) + translate_schema_name(m.group(2)) + m.group(3),
        content
    )
    # schemaDesc
    content = re.sub(
        r'(const schemaDesc\s*=\s*`?)([^`"]+)(`?)',
        lambda m: m.group(1) + translate_simple_text(m.group(2)) + m.group(3),
        content
    )
    # breadcrumb items
    content = re.sub(
        r'(\{ name:\s*")([^"]+)(",)',
        lambda m: m.group(1) + translate_simple_text(m.group(2)) + m.group(3),
        content
    )
    return content

def translate_schema_name(name):
    """Translate schema name like 'Mortgage Calculator'"""
    if name in UI_TRANS:
        return UI_TRANS[name]
    
    # Check if it's an English tool name
    for eng, fr in [
        ("Mortgage Calculator", "Calculateur Hypothécaire"),
        ("Personal Loan Calculator", "Calculateur de Prêt Personnel"),
        ("Car Installment Calculator", "Calculateur Auto"),
        ("Installment Calculator", "Calculateur d'Échéances"),
        ("EMI Calculator", "Calculateur EMI"),
        ("Compound Interest Calculator", "Intérêts Composés"),
        ("Profit Margin Calculator", "Marge Bénéficiaire"),
        ("Salary Calculator", "Calculateur de Salaire"),
        ("VAT Calculator", "Calculateur de TVA"),
        ("Percentage Calculator", "Calculateur de Pourcentage"),
        ("Gold Calculator", "Calculateur d'Or"),
        ("Zakat Calculator", "Calculateur de Zakat"),
        ("Inheritance Calculator", "Calculateur d'Héritage"),
        ("Fidyah", "Fidyah"),
        ("Kaffarah", "Kaffarah"),
        ("Prayer Times", "Heures de Prière"),
        ("Qibla Direction", "Direction de la Qibla"),
        ("Qibla Camera Finder", "Caméra Qibla AR"),
        ("Qibla Camera", "Caméra Qibla"),
        ("Umrah Calculator", "Calculateur Omra"),
        ("Hijri Converter", "Convertisseur Hijri"),
        ("Tasbeeh Counter", "Compteur Tasbih"),
        ("Age Calculator", "Calculateur d'Âge"),
        ("BMI Calculator", "Calculateur IMC"),
        ("Calorie Calculator", "Calculateur de Calories"),
        ("Ideal Weight Calculator", "Poids Idéal"),
        ("Food Calorie Analyzer", "Analyseur Alimentaire"),
        ("Date Duration Calculator", "Calculateur de Durée"),
        ("Unit Converter", "Convertisseur d'Unités"),
        ("Currency Converter", "Convertisseur de Devises"),
        ("Temperature Converter", "Convertisseur de Température"),
        ("Pixel Converter", "Convertisseur Pixel/CM"),
        ("Timezone Converter", "Convertisseur de Fuseau Horaire"),
        ("Color Converter", "Convertisseur de Couleurs"),
        ("Text Case Converter", "Convertisseur de Casse"),
        ("Text Cleaner", "Nettoyeur de Texte"),
        ("Text Compare", "Comparateur de Texte"),
        ("Text Comparator", "Comparateur de Texte"),
        ("Word Counter", "Compteur de Mots"),
        ("Social Character Counter", "Compteur de Caractères"),
        ("Random Number Generator", "Générateur de Nombres"),
        ("Password Generator", "Générateur de Mots de Passe"),
        ("Name Generator", "Générateur de Noms"),
        ("QR Code Generator", "Générateur de QR Code"),
        ("QR Code Reader", "Lecteur de QR Code"),
        ("QR Reader", "Lecteur QR"),
        ("Barcode Generator", "Générateur de Code-barres"),
        ("UUID Generator", "Générateur d'UUID"),
        ("Invoice Generator", "Générateur de Factures"),
        ("Bio Generator", "Générateur de Bio"),
        ("AI Essay Writer", "Rédacteur d'Essais IA"),
        ("Keyword Research Tool", "Recherche de Mots-clés"),
        ("SEO Content Generator", "Générateur de Contenu SEO"),
        ("Paraphrasing Tool", "Outil de Reformulation"),
        ("Grammar Checker", "Vérificateur Grammatical"),
        ("Plagiarism Checker", "Détecteur de Plagiat"),
        ("AI Content Detector", "Détecteur de Contenu IA"),
        ("SEO Audit Tool", "Audit SEO"),
        ("SEO Audit", "Audit SEO"),
        ("IP Lookup", "Recherche IP"),
        ("JSON Formatter", "Formateur JSON"),
        ("CSS Minifier", "Minificateur CSS"),
        ("Markdown Editor", "Éditeur Markdown"),
        ("Hash Generator", "Générateur de Hash"),
        ("Encryption Tool", "Outil de Chiffrement"),
        ("Base64 Encoder/Decoder", "Encodeur/Décodeur Base64"),
        ("Base64 Encoder", "Encodeur Base64"),
        ("URL Encoder/Decoder", "Encodeur/Décodeur URL"),
        ("Image to PDF", "Image vers PDF"),
        ("PDF to Word", "PDF vers Word"),
        ("PDF Merger", "Fusionneur de PDF"),
        ("PDF Splitter", "Diviseur de PDF"),
        ("PDF Compressor", "Compresseur de PDF"),
        ("Image Resizer", "Redimensionneur d'Image"),
        ("Image Compressor", "Compresseur d'Image"),
        ("Image to Text (OCR)", "Image vers Texte (OCR)"),
        ("Image to Text", "Image vers Texte"),
        ("Background Remover", "Suppresseur d'Arrière-plan"),
        ("YouTube Thumbnail Downloader", "Téléchargeur de Miniature YouTube"),
        ("Stopwatch", "Chronomètre"),
        ("Stopwatch and Timer", "Chronomètre et Minuteur"),
        ("Typing Test", "Test de Frappe"),
        ("WhatsApp Link Generator", "Générateur de Lien WhatsApp"),
        ("WhatsApp Link", "Lien WhatsApp"),
        ("Number to Words", "Nombres en Lettres"),
        ("Arabic Lorem Ipsum", "Lorem Ipsum Arabe"),
        ("Arabic Lorem", "Lorem Ipsum Arabe"),
    ]:
        if name == eng or name.startswith(eng):
            return fr + name[len(eng):]
    
    return name

def translate_related_tools(content):
    """Translate relatedTools title text"""
    content = re.sub(
        r'(title:\s*")([^"]+)(")',
        lambda m: m.group(1) + translate_simple_text(m.group(2)) + m.group(3),
        content
    )
    return content

def translate_headings(content):
    """Translate h1/h2 heading text and paragraph descriptions"""
    # h1 headings
    content = re.sub(
        r'(<h1[^>]*>)([^<]+)(</h1>)',
        lambda m: m.group(1) + translate_heading_text(m.group(2)) + m.group(3),
        content
    )
    # paragraph descriptions (after h1)
    content = re.sub(
        r'(<p className="text-sm text-gray-500[^>]*>)([^<]+)(</p>)',
        lambda m: m.group(1) + translate_simple_text(m.group(2)) + m.group(3),
        content
    )
    return content

def translate_heading_text(text):
    """Translate heading text like '🔧 URL Encoder/Decoder'"""
    # Separate emojis from text
    emoji_pattern = re.compile(r'[^\w\s/,-]')
    emojis = ''.join(emoji_pattern.findall(text))
    clean_text = emoji_pattern.sub('', text).strip()
    
    translated = translate_schema_name(clean_text)
    if translated == clean_text:
        translated = translate_simple_text(clean_text)
    
    if emojis:
        return emojis + ' ' + translated if not text.startswith(emojis) else emojis + translated
    
    return translated

def process_file(filepath):
    """Process a single Client.tsx or page.tsx file"""
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Apply translations in order
    content = translate_faqs(content)
    content = translate_seo_content(content)
    content = translate_buttons_and_placeholders(content)
    content = translate_howto_schema(content)
    content = translate_schema_fields(content)
    content = translate_related_tools(content)
    content = translate_headings(content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        return True
    return False

def process_static_page(filepath):
    """Process static pages (fr/page.tsx, etc.)"""
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Translate text nodes in JSX
    # Translate heading
    content = re.sub(
        r'(<h1[^>]*>)([^<]+)(</h1>)',
        lambda m: m.group(1) + translate_simple_text(m.group(2)) + m.group(3),
        content
    )
    
    # Translate paragraph text
    content = re.sub(
        r'(<p[^>]*>)([^<]+)(</p>)',
        lambda m: m.group(1) + translate_simple_text(m.group(2)) + m.group(3),
        content
    )
    
    # Translate meta descriptions
    content = re.sub(
        r'(description:\s*")([^"]+)(")',
        lambda m: m.group(1) + translate_simple_text(m.group(2)) + m.group(3),
        content
    )
    
    # Translate title
    content = re.sub(
        r'(title:\s*")([^"]+)(")',
        lambda m: m.group(1) + translate_simple_text(m.group(2)) + m.group(3),
        content
    )
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        return True
    return False

# ─── Main ───
count = 0

# Process all tool Client.tsx files
tools_dir = os.path.join(BASE, "tools")
for tool_name in sorted(os.listdir(tools_dir)):
    client_path = os.path.join(tools_dir, tool_name, "Client.tsx")
    if os.path.exists(client_path):
        if process_file(client_path):
            count += 1
            print(f"  Translated: {tool_name}/Client.tsx")

# Process static pages
static_pages = ["page.tsx", "about/page.tsx", "privacy/page.tsx", "terms/page.tsx", "blog/page.tsx"]
for page in static_pages:
    page_path = os.path.join(BASE, page)
    if os.path.exists(page_path):
        if process_static_page(page_path):
            count += 1
            print(f"  Translated: {page}")

# Category pages
categories_dir = os.path.join(BASE, "category")
if os.path.exists(categories_dir):
    for cat in sorted(os.listdir(categories_dir)):
        cat_page = os.path.join(categories_dir, cat, "page.tsx")
        if os.path.exists(cat_page):
            if process_static_page(cat_page):
                count += 1
                print(f"  Translated: category/{cat}/page.tsx")

print(f"\n✅ Done! {count} files translated to French.")
