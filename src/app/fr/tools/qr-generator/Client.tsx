"use client";
import { useState, useRef } from "react";
import QRCode from "qrcode";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema, howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is a QR code?", answer: "Quick Response code — a 2D barcode readable by smartphones and scanners. Stores URLs, text, contact info, Wi-Fi credentials, and more. QR codes hold up to 4,296 alphanumeric characters or 2,953 bytes of binary data." },
  { question: "How to scan a QR code?", answer: "Most smartphones: open camera app, point at QR code. iPhone: Camera app detects automatically. Android: Google Lens or Camera app. No separate app needed on modern phones. Third-party scanners offer more features (history, export)." },
  { question: "Can QR codes have colors?", answer: "Yes — but ensure contrast. Dark-on-light is standard (black on white). Inverted (white on black) works. Colored QR codes need sufficient contrast — light blue on dark blue works, pastel on white doesn't. High contrast = fast scanning." },
  { question: "How much data can a QR code hold?", answer: "Version 40 (largest): 4,296 alphanumeric chars, 7,089 numeric digits, 2,953 bytes, or 1,817 Chinese characters (Kanji mode). For URLs, keep under 500 chars for smaller, faster-scanning codes." },
  { question: "What's the difference between QR versions?", answer: "Version 1 (21×21 modules, 25 chars) to Version 40 (177×177 modules, 4,296 chars). Each version adds 4 modules per side. Higher version = more data = larger more complex code. Error correction also affects size." },
  { question: "What is error correction?", answer: "QR codes have Reed-Solomon error correction. Levels: L (7% damage recovery), M (15%), Q (25%), H (30%). For advertising, use L or M. For industrial/medical, use H. Higher correction = larger QR code but survives more damage." },
  { question: "Why use a QR code generator?", answer: "So your customers don't type long URLs manually. One scan opens your site, dials your number, or joins your Wi-Fi. QR codes boost engagement — restaurants saw 40%+ menu views after switching to QR. They're also touch-free (hygienic)." },
  { question: "QR vs barcode?", answer: "Barcode: vertical lines, numeric only (12-25 digits), scans in one direction. QR: square with 3 finder patterns, alphanumeric + binary + Kanji, scans in 2 directions. QR is faster, holds 100x more data, and works with any camera." },
  { question: "Are QR codes secure?", answer: "QR codes themselves are just data containers. The risk is in what you scan — 'QRishing' attacks replace legitimate QR stickers with malicious ones. Always preview the URL before opening. Our tool generates clean, standard QR codes for your safe use." },
  { question: "Can QR codes expire?", answer: "The QR image never expires — it's a static encoding of your data. But if the URL it points to changes or the link breaks, the QR becomes useless. For dynamic QR codes that can be updated, use a URL shortener as intermediary." },
  { question: "What is the minimum QR size for print?", answer: "At least 2×2 cm (0.8 inches) for print. Larger = easier scanning. For screens, 1×1 cm is sufficient. Always test-scan from the expected viewing distance before mass printing. Low contrast or glossy surfaces may need larger sizes." },
  { question: "How to track QR scans?", answer: "Use a short URL (bit.ly, or a tracking link) instead of the direct URL. The QR encodes the short URL, which redirects with analytics. This way you know scan count, location, device type, and time. Without tracking, you won't know how many people scanned." },
];

const relatedTools = [
  { title: "WhatsApp Link", icon: "💬", href: "/fr/tools/whatsapp-link" },
  { title: "Password Generator", icon: "🔐", href: "/fr/tools/password-generator" },
  { title: "Invoice Generator", icon: "🧾", href: "/fr/tools/invoice-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/fr/tools/base64-encoder" },
  { title: "Name Generator", icon: "👤", href: "/fr/tools/name-generator" },
  { title: "Random Number", icon: "🎲", href: "/fr/tools/random-number" },
];

const seoContent = [
  "Generate free QR codes online instantly. No signup, no uploads, no tracking. Works entirely in your browser using client-side QR code generation — your data never leaves your device.",
  "Create QR codes for URLs, text, phone numbers, SMS, Wi-Fi networks, and vCards. Download as high-quality PNG images ready for print, web, or social media use.",
  "Our QR code generator uses the standard qrcode library and creates fully compliant QR codes with Reed-Solomon error correction. Every code passes all standard QR scanner validation.",
];

export default function Client() {
  const [url, setUrl] = useState("https://adwatak.cloud");
  const [size, setSize] = useState("200");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function generate() {
    if (!url.trim()) {
      setError("Please enter a URL or text");
      return;
    }
    setError("");
    try {
      const dataUrl = await QRCode.toDataURL(url.trim(), {
        width: parseInt(size),
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: "M",
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      setError("Failed to generate QR code. Please try a shorter text.");
    }
  }

  const schemaName = "Générateur QR Code";
  const schemaDesc = "En ligne gratuit QR Code Generator - create QR codes for URLs, text, and more";
  const schemaUrl = "https://adwatak.cloud/fr/tools/qr-generator";

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "fr", "Utility")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{ name: "Accueil", url: "https://adwatak.cloud/fr" }, { name: "Développement", url: "https://adwatak.cloud/fr/category/dev" }, { name: "Générateur QR Code", url: schemaUrl }])} />
      <StructuredData data={howToSchema("Comment utiliser cet outil", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [{ name: "Ouvrir l'outil", text: "Navigate to this tool page on Adawatak" }, { name: "Entrez vos données", text: "Remplissez les champs requis" }, { name: "Obtenez les résultats", text: "Cliquez sur le bouton Calculer ou Générer" }, { name: "Utilisez ou partagez", text: "Copiez, téléchargez ou partagez les résultats" }], "moins d'une minute", "fr")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb category="Développement" categorySlug="developer-tools" toolName="QR Code Generator" />
      
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-extrabold mb-1 dark:text-white">📱 QR Code Generator</h1>
        <p className="text-sm text-gray-500 mb-6 dark:text-gray-400">Generate free QR codes for URLs, text, and more</p>
        
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 dark:text-gray-300">URL or Text</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="https://adwatak.cloud"
        />
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 dark:text-gray-300">QR Size (px)</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="150">Small (150×150)</option>
            <option value="200">Medium (200×200)</option>
            <option value="300">Large (300×300)</option>
            <option value="500">Extra Large (500×500)</option>
          </select>
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}
        
        <button
          onClick={generate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Generate QR Code
        </button>
      </div>

      {qrDataUrl && (
        <div className="bg-gray-50 rounded-xl p-5 text-center border border-gray-200 mb-6 dark:bg-gray-800 dark:border-gray-700">
          <img src={qrDataUrl} alt="QR Code" className="inline-block max-w-full" />
          <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">Scan to visit {url}</p>
          <div className="flex gap-3 justify-center mt-3">
            <a
              href={qrDataUrl}
              download="qrcode.png"
              className="inline-block bg-blue-600 text-white font-bold px-6 py-2 rounded-xl no-underline text-sm hover:bg-blue-700 transition-colors"
            >
              Download PNG
            </a>
            <button
              onClick={() => { const a = document.createElement("a"); a.href = qrDataUrl; a.download = "qrcode.svg"; a.click(); }}
              className="inline-block bg-gray-600 text-white font-bold px-6 py-2 rounded-xl text-sm cursor-pointer hover:bg-gray-700 transition-colors border-none"
            >
              Download SVG
            </button>
          </div>
        </div>
      )}

      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
      <ShareButtons lang="fr" />
    </div>
  );
}
