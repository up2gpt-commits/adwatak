#!/usr/bin/env python3
"""
Careful French translation for Client.tsx files.
Only replaces specific safe patterns - no general regex on JSX.
"""

import os, re

BASE = "/home/ops123/adwatak/src/app/fr/tools"

# Tool name translations for h1 and schema name
TOOL_NAMES_FR = {
    "Age Calculator": "Calculateur d'Âge",
    "BMI Calculator": "Calculateur IMC",
    "Calorie Calculator": "Calculateur de Calories",
    "Ideal Weight Calculator": "Poids Idéal",
    "Food Calorie Analyzer": "Analyseur Alimentaire",
    "Date Duration Calculator": "Calculateur de Durée",
    "Unit Converter": "Convertisseur d'Unités",
    "Currency Converter": "Convertisseur de Devises",
    "Temperature Converter": "Convertisseur de Température",
    "Pixel Converter": "Convertisseur Pixel",
    "Timezone Converter": "Convertisseur Fuseau Horaire",
    "Color Converter": "Convertisseur de Couleurs",
    "Text Case Converter": "Convertisseur de Casse",
    "Text Cleaner": "Nettoyeur de Texte",
    "Text Compare": "Comparateur de Texte",
    "Text Comparator": "Comparateur de Texte",
    "Word Counter": "Compteur de Mots",
    "Social Character Counter": "Compteur Caractères",
    "Random Number Generator": "Générateur de Nombres",
    "Password Generator": "Générateur de Mots de Passe",
    "Name Generator": "Générateur de Noms",
    "QR Code Generator": "Générateur QR Code",
    "QR Code Reader": "Lecteur QR Code",
    "QR Reader": "Lecteur QR",
    "Barcode Generator": "Générateur Code-barres",
    "UUID Generator": "Générateur d'UUID",
    "Invoice Generator": "Générateur de Factures",
    "Bio Generator": "Générateur de Bio",
    "AI Essay Writer": "Rédacteur IA",
    "Keyword Research Tool": "Recherche Mots-clés",
    "SEO Content Generator": "Générateur de Contenu SEO",
    "Paraphrasing Tool": "Outil de Reformulation",
    "Grammar Checker": "Vérificateur Grammatical",
    "Plagiarism Checker": "Vérificateur de Plagiat",
    "AI Content Detector": "Détecteur Contenu IA",
    "SEO Audit Tool": "Audit SEO",
    "SEO Audit": "Audit SEO",
    "IP Lookup": "Recherche IP",
    "JSON Formatter": "Formateur JSON",
    "CSS Minifier": "Minificateur CSS",
    "Markdown Editor": "Éditeur Markdown",
    "Hash Generator": "Générateur de Hash",
    "Encryption Tool": "Outil de Chiffrement",
    "Base64 Encoder": "Encodeur Base64",
    "Base64 Encoder / Decoder": "Encodeur / Décodeur Base64",
    "URL Encoder/Decoder": "Encodeur/Décodeur URL",
    "Image to PDF": "Image vers PDF",
    "PDF to Word": "PDF vers Word",
    "PDF Merger": "Fusionneur PDF",
    "PDF Splitter": "Diviseur PDF",
    "PDF Compressor": "Compresseur PDF",
    "Image Resizer": "Redimensionneur Image",
    "Image Compressor": "Compresseur Image",
    "Image to Text": "Image vers Texte (OCR)",
    "Background Remover": "Suppression Arrière-plan",
    "YouTube Thumbnail Downloader": "Miniatures YouTube",
    "Stopwatch": "Chronomètre",
    "Stopwatch and Timer": "Chronomètre et Minuteur",
    "Typing Test": "Test de Frappe",
    "WhatsApp Link Generator": "Lien WhatsApp",
    "WhatsApp Link": "Lien WhatsApp",
    "Number to Words": "Nombres en Lettres",
    "Arabic Lorem Ipsum": "Lorem Ipsum Arabe",
    "Mortgage Calculator": "Calculateur Hypothécaire",
    "Personal Loan Calculator": "Calculateur de Prêt",
    "Loan Calculator": "Calculateur de Prêt",
    "Car Installment Calculator": "Calculateur Auto",
    "Installment Calculator": "Calculateur d'Échéances",
    "EMI Calculator": "Calculateur EMI",
    "Compound Interest Calculator": "Intérêts Composés",
    "Profit Margin Calculator": "Marge Bénéficiaire",
    "Salary Calculator": "Calculateur de Salaire",
    "VAT Calculator": "Calculateur de TVA",
    "Percentage Calculator": "Calculateur de Pourcentage",
    "Gold Calculator": "Calculateur d'Or",
    "Zakat Calculator": "Calculateur de Zakat",
    "Inheritance Calculator": "Calculateur d'Héritage",
    "Fidyah": "Fidyah",
    "Fidyah and Kaffarah": "Fidyah et Kaffarah",
    "Fidyah & Kaffarah Calculator": "Calculateur Fidyah & Kaffarah",
    "Prayer Times": "Heures de Prière",
    "Qibla Direction": "Direction de la Qibla",
    "Qibla Camera": "Caméra Qibla",
    "Qibla Camera Finder": "Caméra Qibla AR",
    "Umrah Calculator": "Calculateur Omra",
    "Hijri Converter": "Convertisseur Hijri",
    "Tasbeeh Counter": "Compteur Tasbih",
    "Encoder": "Encodeur",
    "Encryption": "Chiffrement",
    "Decryption": "Déchiffrement",
    "Plagiarism": "Plagiat",
    "Paraphrasing": "Reformulation",
    "Keyword Research": "Recherche Mots-clés",
    "Generators": "Générateurs",
    "Converters": "Convertisseurs",
    "Calculators": "Calculateurs",
    "Developer Tools": "Outils Développement",
    "Dev Tools": "Développement",
    "Text Tools": "Texte",
    "Islamic Tools": "Islamique",
    "Financial Calculators": "Calculateurs Financiers",
    "Other Tools": "Autres",
    "Other": "Autres",
    "Daily": "Quotidien",
}

# h1 translations with emoji preservation
H1_TRANS = {
    "🔐 Base64 Encoder / Decoder": "🔐 Encodeur / Décodeur Base64",
    "🔧 URL Encoder/Decoder": "🔧 Encodeur/Décodeur URL",
    "🔧 Encoder Tool": "🔧 Outil d'Encodage",
    "🏠 Mortgage Calculator": "🏠 Calculateur Hypothécaire",
    "💰 Loan Calculator": "💰 Calculateur de Prêt",
    "🚗 Car Installment Calculator": "🚗 Calculateur Auto",
    "📊 Installment Calculator": "📊 Calculateur d'Échéances",
    "📈 EMI Calculator": "📈 Calculateur EMI",
    "📈 Compound Interest Calculator": "📈 Intérêts Composés",
    "📊 Profit Margin Calculator": "📊 Marge Bénéficiaire",
    "💰 Salary Calculator": "💰 Calculateur de Salaire",
    "🧾 VAT Calculator": "🧾 Calculateur de TVA",
    "📊 Percentage Calculator": "📊 Calculateur de Pourcentage",
    "🥇 Gold Calculator": "🥇 Calculateur d'Or",
    "🕌 Zakat Calculator": "🕌 Calculateur de Zakat",
    "📜 Inheritance Calculator": "📜 Calculateur d'Héritage",
    "⚖️ Fidyah & Kaffarah Calculator": "⚖️ Calculateur Fidyah & Kaffarah",
    "🕐 Prayer Times": "🕐 Heures de Prière",
    "🧭 Qibla Direction": "🧭 Direction de la Qibla",
    "📸 Qibla Camera Finder": "📸 Caméra Qibla AR",
    "🕋 Umrah Calculator": "🕋 Calculateur Omra",
    "🌙 Hijri Converter": "🌙 Convertisseur Hijri",
    "📿 Tasbeeh Counter": "📿 Compteur Tasbih",
    "🎂 Age Calculator": "🎂 Calculateur d'Âge",
    "⚖️ BMI Calculator": "⚖️ Calculateur IMC",
    "🔥 Calorie Calculator": "🔥 Calculateur de Calories",
    "⚖️ Ideal Weight Calculator": "⚖️ Poids Idéal",
    "📸 Food Calorie Analyzer": "📸 Analyseur Alimentaire",
    "📅 Date Duration Calculator": "📅 Calculateur de Durée",
    "📏 Unit Converter": "📏 Convertisseur d'Unités",
    "💱 Currency Converter": "💱 Convertisseur de Devises",
    "🌡️ Temperature Converter": "🌡️ Convertisseur de Température",
    "📐 Pixel Converter": "📐 Convertisseur Pixel",
    "🕐 Timezone Converter": "🕐 Fuseau Horaire",
    "🎨 Color Converter": "🎨 Convertisseur de Couleurs",
    "🔤 Text Case Converter": "🔤 Convertisseur de Casse",
    "🧹 Text Cleaner": "🧹 Nettoyeur de Texte",
    "⚖️ Text Compare": "⚖️ Comparateur de Texte",
    "📝 Word Counter": "📝 Compteur de Mots",
    "📱 Social Character Counter": "📱 Compteur Caractères",
    "🎲 Random Number Generator": "🎲 Générateur de Nombres",
    "🔑 Password Generator": "🔑 Générateur de Mots de Passe",
    "👤 Name Generator": "👤 Générateur de Noms",
    "📱 QR Code Generator": "📱 Générateur QR Code",
    "📷 QR Code Reader": "📷 Lecteur QR Code",
    "📦 Barcode Generator": "📦 Générateur Code-barres",
    "🆔 UUID Generator": "🆔 Générateur d'UUID",
    "📄 Invoice Generator": "📄 Générateur de Factures",
    "👤 Bio Generator": "👤 Générateur de Bio",
    "✍️ AI Essay Writer": "✍️ Rédacteur IA",
    "🔎 Keyword Research Tool": "🔎 Recherche Mots-clés",
    "📝 SEO Content Generator": "📝 Générateur de Contenu SEO",
    "🔄 Paraphrasing Tool": "🔄 Outil de Reformulation",
    "✅ Grammar Checker": "✅ Vérificateur Grammatical",
    "🔍 Plagiarism Checker": "🔍 Détecteur de Plagiat",
    "🤖 AI Content Detector": "🤖 Détecteur Contenu IA",
    "🔍 SEO Audit Tool": "🔍 Audit SEO",
    "🌐 IP Lookup": "🌐 Recherche IP",
    "📋 JSON Formatter": "📋 Formateur JSON",
    "🎨 CSS Minifier": "🎨 Minificateur CSS",
    "📝 Markdown Editor": "📝 Éditeur Markdown",
    "🔑 Hash Generator": "🔑 Générateur de Hash",
    "🔐 Encryption Tool": "🔐 Outil de Chiffrement",
    "🖼️ Image to PDF": "🖼️ Image vers PDF",
    "📄 PDF to Word": "📄 PDF vers Word",
    "📑 PDF Merger": "📑 Fusionneur PDF",
    "✂️ PDF Splitter": "✂️ Diviseur PDF",
    "🗜️ PDF Compressor": "🗜️ Compresseur PDF",
    "🖼️ Image Resizer": "🖼️ Redimensionneur Image",
    "🗜️ Image Compressor": "🗜️ Compresseur Image",
    "📄 Image to Text (OCR)": "📄 Image vers Texte (OCR)",
    "🖼️ Background Remover": "🖼️ Suppression Arrière-plan",
    "▶️ YouTube Thumbnail Downloader": "▶️ Miniatures YouTube",
    "⏱️ Stopwatch": "⏱️ Chronomètre",
    "⌨️ Typing Test": "⌨️ Test de Frappe",
    "💬 WhatsApp Link Generator": "💬 Lien WhatsApp",
    "🔢 Number to Words": "🔢 Nombres en Lettres",
    "📝 Arabic Lorem Ipsum": "📝 Lorem Ipsum Arabe",
}

# Description translations
DESC_TRANS = {
    "Convert text to and from Base64 encoding — client-side only": "Convertissez du texte en Base64 et vice-versa — côté client uniquement",
    "Encode and decode Base64, URLs, and more — client-side only": "Encodez et décodez du texte en Base64, URL et plus — côté client",
    "Encode and decode text using multiple methods": "Encodez et décodez du texte avec plusieurs méthodes",
}

def process_client(path):
    with open(path) as f:
        content = f.read()
    
    original = content
    
    # 1. Replace h1 headings (safe - between tags)
    for eng, fr in H1_TRANS.items():
        content = content.replace(f'<h1 className="text-2xl font-extrabold mb-1">{eng}</h1>',
                                  f'<h1 className="text-2xl font-extrabold mb-1">{fr}</h1>')
    
    # 2. Replace description text (between h1 and the next element)
    for eng, fr in DESC_TRANS.items():
        content = content.replace(f'<p className="text-sm text-gray-500 mb-6">{eng}</p>',
                                  f'<p className="text-sm text-gray-500 mb-6">{fr}</p>')
    
    # 3. Replace schema names (const schemaName = "...")
    for eng, fr in sorted(TOOL_NAMES_FR.items(), key=lambda x: -len(x[0])):
        content = content.replace(f'const schemaName = "{eng}"', f'const schemaName = "{fr}"')
        content = content.replace(f'const schemaName = "{eng};', f'const schemaName = "{fr};')
    
    # 4. Replace breadcrumb names
    for eng, fr in sorted(TOOL_NAMES_FR.items(), key=lambda x: -len(x[0])):
        content = content.replace(f'{{ name: "{eng}", url:', f'{{ name: "{fr}", url:')
        content = content.replace(f'{{name:"{eng}",url:', f'{{name:"{fr}",url:')
    
    # 5. Replace home text in breadcrumbs
    content = content.replace('{ name: "Home", url:', '{ name: "Accueil", url:')
    
    # 6. Replace "Other Tools" in breadcrumbs
    content = content.replace('{ name: "Other Tools", url:', '{ name: "Autres", url:')
    
    # 7. HowTo schema text
    content = content.replace('"How to use this tool"', '"Comment utiliser cet outil"')
    content = content.replace('"Free online tool. Works directly in your browser. No registration required."',
                              '"Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise."')
    content = content.replace('"Open the tool"', '"Ouvrir l\'outil"')
    content = content.replace('"Navigate to this tool page on Adwatak"', '"Accédez à cet outil sur Adwatak"')
    content = content.replace('"Enter your data"', '"Entrez vos données"')
    content = content.replace('"Fill in the required fields"', '"Remplissez les champs requis"')
    content = content.replace('"Get results"', '"Obtenez les résultats"')
    content = content.replace('"Click the calculate or generate button"', '"Cliquez sur le bouton Calculer ou Générer"')
    content = content.replace('"Use or share"', '"Utilisez ou partagez"')
    content = content.replace('"Copy, download, or share the results"', '"Copiez, téléchargez ou partagez les résultats"')
    content = content.replace('"less than a minute"', '"moins d\'une minute"')
    
    # 8. Tool description text in howTo
    content = content.replace('"Free online tool. Works directly in your browser. No registration required."',
                              '"Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise."')
    
    # 9. Button text - specific patterns
    content = content.replace('>Calculate</button>', '>Calculer</button>')
    content = content.replace('>Convert</button>', '>Convertir</button>')
    content = content.replace('>Generate</button>', '>Générer</button>')
    content = content.replace('>Encode</button>', '>Encoder</button>')
    content = content.replace('>Decode</button>', '>Décoder</button>')
    content = content.replace('>Execute</button>', '>Exécuter</button>')
    content = content.replace('>Calculate Age</button>', '>Calculer l\'âge</button>')
    content = content.replace('>Calculate Zakat</button>', '>Calculer la Zakat</button>')
    content = content.replace('>Calculate EMI</button>', '>Calculer l\'EMI</button>')
    content = content.replace('>Check</button>', '>Vérifier</button>')
    content = content.replace('>Compare</button>', '>Comparer</button>')
    content = content.replace('>Submit</button>', '>Envoyer</button>')
    content = content.replace('>Search</button>', '>Rechercher</button>')
    content = content.replace('>Reset</button>', '>Réinitialiser</button>')
    content = content.replace('>Clear</button>', '>Effacer</button>')
    content = content.replace('>Copy</button>', '>Copier</button>')
    
    # 10. Placeholder text - specific
    content = content.replace('placeholder="Enter text..."', 'placeholder="Entrez le texte..."')
    content = content.replace('placeholder="Enter text to encode..."', 'placeholder="Texte à encoder..."')
    content = content.replace('placeholder="Enter Base64 to decode..."', 'placeholder="Base64 à décoder..."')
    content = content.replace('placeholder="Enter your text"', 'placeholder="Entrez votre texte"')
    content = content.replace('placeholder="Enter value..."', 'placeholder="Entrez une valeur..."')
    content = content.replace('placeholder="Type here..."', 'placeholder="Tapez ici..."')
    content = content.replace('placeholder="Enter URL..."', 'placeholder="Entrez l\'URL..."')
    
    # 11. SEO content descriptions
    content = content.replace('"Our free', '"Notre')
    content = content.replace('"Free online', '"En ligne gratuit')
    
    # 12. Schema description template
    content = content.replace('"Online', '"En ligne')
    content = content.replace('- free tool"', ' - outil gratuit"')
    content = content.replace(' - free tool', ' - outil gratuit')
    
    # 13. Category name in breadcrumbs
    content = content.replace('"Financial Calculators"', '"Calculateurs Financiers"')
    content = content.replace('"Dev Tools"', '"Développement"')
    content = content.replace('"Developer Tools"', '"Outils Développement"')
    content = content.replace('"Islamic Tools"', '"Outils Islamiques"')
    content = content.replace('"Generators"', '"Générateurs"')
    content = content.replace('"Converters"', '"Convertisseurs"')
    content = content.replace('"Calculators"', '"Calculateurs"')
    content = content.replace('"Other Tools"', '"Autres"')
    content = content.replace('"Other"', '"Autres"')
    content = content.replace('"Daily"', '"Quotidien"')
    content = content.replace('"Text"', '"Texte"')
    
    if content != original:
        with open(path, 'w') as f:
            f.write(content)
        return True
    return False

# Process all tools
count = 0
for tool in sorted(os.listdir(BASE)):
    path = os.path.join(BASE, tool, "Client.tsx")
    if os.path.exists(path):
        if process_client(path):
            count += 1
            print(f"  ✓ {tool}")

print(f"\n✅ {count} files translated")
