#!/usr/bin/env python3
"""Fix remaining English issues after the big fix pass."""
import os, re, json, urllib.request, time

FIREWORKS_KEY = "fw_TwbdB1iMtWzWLL1J62Hcrm"
BASE = "/home/ops123/adwatak/src/app"

def call_fireworks(prompt):
    data = {
        "model": "accounts/fireworks/models/deepseek-v4-pro",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.05,
        "max_tokens": 2000
    }
    req = urllib.request.Request(
        "https://api.fireworks.ai/inference/v1/chat/completions",
        data=json.dumps(data).encode('utf-8'),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {FIREWORKS_KEY}"}
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"  API error: {e}")
        return None

def fix_file(locale, tool, old_str, new_str):
    fpath = f"{BASE}/{locale}/tools/{tool}/Client.tsx"
    with open(fpath) as f:
        content = f.read()
    if old_str in content:
        content = content.replace(old_str, new_str, 1)
        with open(fpath, 'w') as f:
            f.write(content)
        print(f"  ✓ {locale}/{tool}")
        return True
    else:
        print(f"  ✗ {locale}/{tool}: '{old_str[:40]}' not found")
        return False

# === TURKISH ===
print("=== TR ===")
fix_file("tr", "inheritance-calculator", 'toolName="Inheritance Calculator"', 'toolName="Miras Hesaplayıcı"')
fix_file("tr", "random-number", "Generate cryptographically secure random numbers instantly", "Anında kriptografik olarak güvenli rastgele sayılar oluşturun")
fix_file("tr", "random-number", "Generate", "Oluştur")
fix_file("tr", "salary-calculator", "Convert between annual, monthly, weekly, and hourly pay", "Yıllık, aylık, haftalık ve saatlik maaş arasında dönüştürme yapın")
fix_file("tr", "seo-content-generator", "Generate 5 unique SEO-optimized articles from a single keywo", "Tek bir anahtar kelimeden 5 benzersiz SEO uyumlu makale oluşturun")
fix_file("tr", "text-case", "Convert text between UPPERCASE, lowercase, Title Case, camel", "Metni BÜYÜK/küçük harf, Başlık, camelCase arasında dönüştürün")
fix_file("tr", "unit-converter", "Convert between metric and imperial units — length, weight, ", "Metrik ve emperyal birimler arasında dönüşüm — uzunluk, ağırlık")
fix_file("tr", "unit-converter", "Convert", "Dönüştür")

# === FRENCH ===
print("\n=== FR ===")
fix_file("fr", "ai-content-detector", 'placeholder="Paste your text here for analysis..."', 'placeholder="Collez votre texte ici pour analyse..."')
fix_file("fr", "ai-essay-writer", 'placeholder="Enter your essay topic..."', 'placeholder="Entrez le sujet de votre dissertation..."')
fix_file("fr", "background-remover", "Download (PNG)", "Télécharger (PNG)")
fix_file("fr", "barcode-generator", "Download SVG", "Télécharger SVG")
fix_file("fr", "bio-generator", "Generate Bio", "Générer un Bio")
fix_file("fr", "bio-generator", 'placeholder="Enter your profession"', 'placeholder="Entrez votre profession"')
fix_file("fr", "car-installment", "Calculate", "Calculer")
fix_file("fr", "compound-interest", 'toolName="Compound Interest Calculator"', 'toolName="Calculateur d\'Intérêts Composés"')
fix_file("fr", "emi-calculator", "🧮 EMI Calculator", "🧮 Calculateur EMI")
fix_file("fr", "hash-generator", 'placeholder="Enter text to hash..."', 'placeholder="Entrez le texte à hacher..."')
fix_file("fr", "inheritance-calculator", "📜 Islamic Inheritance Calculator", "📜 Calculateur d\'Héritage Islamique")
fix_file("fr", "inheritance-calculator", "Calculate Sharia Shares", "Calculer les Parts Charia")
fix_file("fr", "profit-margin", "📈 Profit Margin Calculator", "📈 Calculateur de Marge Bénéficiaire")
fix_file("fr", "stopwatch", "↺ Reset", "↺ Réinitialiser")
fix_file("fr", "text-case", 'placeholder="Enter text to convert..."', 'placeholder="Entrez le texte à convertir..."')
fix_file("fr", "uuid-generator", "🚀 Generate", "🚀 Générer")
fix_file("fr", "vat-calculator", "🏛️ VAT Calculator", "🏛️ Calculateur de TVA")
fix_file("fr", "vat-calculator", "Calculate VAT", "Calculer la TVA")
fix_file("fr", "zakat-calculator", "☪️ Zakat Calculator", "☪️ Calculateur de Zakat")

# === INDONESIAN ===
print("\n=== ID ===")
fix_file("id", "base64-encoder", "Convert text to and from Base64 encoding — client-side only", "Konversi teks ke dan dari encoding Base64 — hanya sisi klien")
fix_file("id", "image-to-pdf", "Convert images to PDF — free, private, client-side", "Konversi gambar ke PDF — gratis, pribadi, sisi klien")
fix_file("id", "inheritance-calculator", "Calculate Sharia-compliant inheritance shares. Select living", "Hitung bagian warisan sesuai Syariah. Pilih ahli waris yang")
fix_file("id", "inheritance-calculator", "Calculate Sharia Shares", "Hitung Bagian Warisan")
fix_file("id", "password-generator", "Generate strong, random passwords — client-side and private", "Hasilkan kata sandi kuat acak — sisi klien dan pribadi")
fix_file("id", "stopwatch", "↺ Reset", "↺ Atur Ulang")
fix_file("id", "youtube-thumbnail-downloader", "Download YouTube video thumbnails in high resolution", "Unduh thumbnail video YouTube dalam resolusi tinggi")

print("\nDone!")
