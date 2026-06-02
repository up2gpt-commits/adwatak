"use client";
import { useState, useRef } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
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
  { question: "What is error correction?", answer: "QR codes have Reed-Solomon error correction. Levels: L (7% damage recovery), M (15%), Q (25%), H (30%). Higher = more data redundancy = larger code but readable even when partially damaged or covered." },
  { question: "Why use a QR code generator?", answer: "Printed materials (business cards, flyers, posters, menus), digital sharing, contactless payments, event check-in, restaurant menus (COVID popularized this), product packaging, museum exhibits, and Wi-Fi sharing." },
  { question: "QR vs barcode?", answer: "QR (2D): stores hundreds of chars, scanned any orientation, error correction, URL/text/contact. Barcode (1D): only numbers, needs specific orientation, no error correction. QR codes are superior for digital applications." },
  { question: "Is QR code scanning free?", answer: "Yes — free for everyone. No licensing fees. QR codes are open standard with patents released to the public. Use any generator and any scanner. No subscription needed for scanning." },
  { question: "Where to place QR codes for best scanning?", answer: "Flat surface, at least 2×2 inches (5×5 cm), good lighting, no glare. Placement: eye level (not on floor), on flat surfaces (not curved), away from other graphics. Test scan your final version." },
  { question: "Can QR codes expire?", answer: "The QR code itself (the pattern) never expires. But if it links to a URL, the URL destination can change or stop working. Use a URL shortener (bit.ly) to keep control — update the redirect without changing the printed QR code." },
  { question: "Are QR codes secure?", answer: "The QR code is just data — anyone can scan and see the URL. Attackers can create QR codes linking to malicious sites. Always preview the URL before opening. Use a QR scanner that shows the URL before navigating." },
];

const relatedTools = [
  { title: "Password Generator", icon: "🔐", href: "/en/tools/password-generator" },
  { title: "Base64 Encoder", icon: "🔐", href: "/en/tools/base64-encoder" },
  { title: "Hash Generator", icon: "#️⃣", href: "/en/tools/hash-generator" },
  { title: "Text Cleaner", icon: "🧹", href: "/en/tools/text-cleaner" },
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "Random Number", icon: "🎲", href: "/en/tools/random-number" },
];

const seoContent = [
  "Our free QR Code Generator creates custom QR codes instantly. Enter any URL or text, choose size, and download. Perfect for business cards, restaurant menus, marketing materials, event check-ins, and Wi-Fi sharing. No sign-up, no ads, no tracking.",
  "How it works: Paste your URL or text. Select QR size (small/medium/large). Click Generate. Download as PNG. The QR pattern encodes your data using Reed-Solomon error correction — even if partially damaged, it still scans. Works with any smartphone camera.",
  "Best practices: (1) Test before printing — scan with multiple phones. (2) Minimum 2×2 inches on printed materials. (3) White background with dark foreground. (4) Keep URLs short (use bit.ly). (5) Add a call-to-action ('Scan for discount code').",
  "Common uses: Restaurant QR menus (scanned 50M+ times during COVID), business cards linking to LinkedIn profiles, flyers to landing pages, product boxes to manuals/warranty registration, event badges to attendee profiles, and in-store displays to online reviews.",
  "Related: Use with our Password Generator for secure QR codes containing credentials. The Base64 Encoder embeds data in QR. The Hash Generator creates verification QR codes. The Random Number tool generates unique IDs for QR URLs.",
  "QR codes are everywhere — 89 million US households scanned a QR code in 2023. With zero printing cost and instant scanning, they're the most cost-effective way to bridge physical and digital experiences. Free, open, and universal."
];

export default function Client() {
  const [url, setUrl] = useState("https://adwatak.cloud");
  const [size, setSize] = useState("200");
  const [qrUrl, setQrUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = () => {
    if (!url) return;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`);
  };

  const schemaName = "QR Code Generator";
const schemaDesc = `Online QR Code Generator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/qr-generator";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Generators", url: "https://adwatak.cloud/en/category/calculators" },
  { name: "QR Code Generator", url: "https://adwatak.cloud/en/tools/qr-generator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Dev Tools" categorySlug="developer-tools" toolName="QR Code Generator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📱 QR Code Generator</h1>
        <p className="text-sm text-gray-500 mb-6">Generate free QR codes for URLs, text, and more</p>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL or Text</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4" placeholder="https://adwatak.cloud" />
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">QR Size (px)</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
            <option value="150">Small (150×150)</option>
            <option value="200">Medium (200×200)</option>
            <option value="300">Large (300×300)</option>
            <option value="500">Extra Large (500×500)</option>
          </select>
        </div>
        <button onClick={generate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Generate QR Code</button>
      </div>
      {qrUrl && (
        <div className="bg-gray-50 rounded-xl p-5 text-center border border-gray-200 mb-6">
          <img src={qrUrl} alt="QR Code" className="inline-block" />
          <p className="text-xs text-gray-500 mt-2">Scan to visit {url}</p>
          <a href={qrUrl} download="qrcode.png" className="inline-block mt-3 bg-blue-600 text-white font-bold px-6 py-2 rounded-xl no-underline text-sm">Download PNG</a>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="en" />
    </div>
  );
}
