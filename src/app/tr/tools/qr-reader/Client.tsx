"use client";
import { useState, useRef } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "How do I read a QR Code from an image?", answer: "Upload an image containing a QR Code — the tool reads it and extracts the hidden text or URL. Supports JPG, PNG, WEBP. Can read up to 4,296 alphanumeric characters." },
  { question: "Can I scan QR Codes with my camera?", answer: "Yes! Switch to camera mode and point your camera at any QR Code. It works on both mobile and desktop devices. The QR Code will be decoded automatically." },
  { question: "Is QR Code scanning safe?", answer: "Adwatak reads the QR Code locally in your browser — nothing is sent to any server. However, be cautious about the links you scan. QR Codes are just storage — the destination could be harmful. We show you the content first for safety." },
  { question: "What's the difference between QR Scanner and QR Reader?", answer: "No practical difference. Both decode QR Codes. QR Reader = reads uploaded images. QR Scanner = uses live camera. Both do the same thing. Some apps auto-open links — we show you the content first." },
  { question: "Can I read damaged QR Codes?", answer: "QR Codes have built-in error correction (up to 30%). Smudged, scratched, or partially damaged codes can still be read. Higher resolution images give better results. Completely destroyed codes cannot be recovered." },
  { question: "What QR Code types does this support?", answer: "All standard types: plain text, URLs, Wi-Fi (SSID + Password), vCard contacts, SMS, email, phone numbers, geo-location data, and app store links." },
  { question: "Is this tool free?", answer: "Yes, 100% free with no registration required. Everything happens in your browser — images are processed locally without uploading to any server. Fast, private, and simple." },
  { question: "What print quality is needed for QR Codes?", answer: "Print at 300 DPI minimum. Minimum size: 2×2 cm (0.8×0.8 inches). Test scanning from the expected viewing distance. Use high contrast (black on white) for best results." },
  { question: "Can QR Codes store video or images?", answer: "No, QR Codes store text only. However, they can store a URL link to a video or image. Max storage: ~3 KB. For simple URLs and text, this is more than enough." },
  { question: "QR Codes vs NFC — what's the future?", answer: "QR needs no special chip (every phone camera reads them), is cheaper to print, and easier to distribute. NFC is faster and requires a tap. Both will coexist — QR for print/advertising, NFC for payments." },
];

const relatedTools = [
  { title: "QR Generator", icon: "🔳", href: "/en/tools/qr-generator" },
  { title: "WhatsApp Link", icon: "💬", href: "/en/tools/whatsapp-link" },
  { title: "Base64 Encoder", icon: "🔄", href: "/en/tools/base64-encoder" },
  { title: "Password Generator", icon: "🔐", href: "/en/tools/password-generator" },
  { title: "Random Number", icon: "🎲", href: "/en/tools/random-number" },
  { title: "SEO Audit", icon: "🔍", href: "/en/tools/seo-audit" },
];

const seoContent = [
  "QR Code Reader — Decode QR Codes from uploaded images or your camera instantly. Upload a QR image or use your camera to extract the hidden text, URL, or any data. Completely free and private — everything runs in your browser.",
  "How it works: The tool uses jsQR library to detect and decode QR Codes. It processes the image locally in your browser, detects the square pattern, decodes the data, and displays the result. Nothing is uploaded to any server.",
  "QR Code uses: Website links, vCard contacts, Wi-Fi auto-connect, restaurant digital menus, e-tickets, payments, vaccination cards, advertising, and product packaging. QR Codes are now part of everyday life worldwide.",
  "Security tips: Don't scan random QR Codes — verify the source. QR Codes in public places (stations, airports) could be tampered with (QRishing). Preview the link before opening it. Use a reader that shows content first (like ours).",
  "This tool is 100% free, requires no download or registration. Read QR Codes quickly and safely. Perfect for marketers, restaurant owners, event organizers, and anyone using digital tickets."
];

export default function Client() {
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "camera">("upload");
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResult("Reading QR Code...");

    try {
      const image = new Image();
      const url = URL.createObjectURL(file);
      image.src = url;
      await new Promise((resolve) => { image.onload = resolve; });

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const jsQR = (await import("jsqr")).default;
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setResult(code.data);
      } else {
        setResult("No QR Code found in the image. Try a clearer image.");
      }
      URL.revokeObjectURL(url);
    } catch {
      setResult("Error reading the image. Please check the file.");
    }
  };

  const startCamera = async () => {
    setScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setResult("Camera access denied. Check your browser permissions.");
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  const schemaName = "QR Code Reader";
  const schemaDesc = `Online QR Code Reader - free tool`;
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/qr-reader";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Generators", url: "https://adwatak.cloud/en/category/calculators" },
    { name: "QR Code Reader", url: "https://adwatak.cloud/en/tools/qr-reader" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Other Tools" categorySlug="daily" toolName="QR Code Reader" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📷 QR Code Reader</h1>
        <p className="text-sm text-gray-500 mb-6">Read QR Codes from images or your camera instantly</p>
        
        <div className="flex gap-2 mb-4">
          <button onClick={() => { setMode("upload"); stopCamera(); }} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${mode === "upload" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>🖼 Upload Image</button>
          <button onClick={() => { setMode("camera"); startCamera(); }} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${mode === "camera" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>📸 Camera</button>
        </div>

        {mode === "upload" && (
          <div className="border-2 border-dashed border-gray-300 p-8 rounded-xl text-center">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="qr-upload-en" />
            <label htmlFor="qr-upload-en" className="cursor-pointer">
              <div className="text-4xl mb-3">🖼️</div>
              <p className="text-blue-600 font-semibold">Click to upload a QR Code image</p>
              <p className="text-sm text-gray-400 mt-1">JPG, PNG, WEBP</p>
            </label>
          </div>
        )}

        {mode === "camera" && (
          <div className="text-center">
            <video ref={videoRef} className="w-full max-w-[400px] mx-auto rounded-xl bg-black" playsInline />
            {scanning && <p className="text-sm text-gray-400 mt-2">Point your camera at a QR Code</p>}
            <button onClick={stopCamera} className="bg-red-500 text-white font-bold p-2 rounded-xl border-none text-sm cursor-pointer mt-2">Stop Camera</button>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-sm mb-2">{result.startsWith("http") ? "🔗 URL:" : "📄 Text:"}</h3>
            <p className="text-sm text-gray-700 break-all bg-white p-3 rounded-lg border border-gray-200">{result}</p>
            {result.startsWith("http") && (
              <a href={result} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 bg-blue-600 text-white font-bold p-2 rounded-xl text-sm no-underline">🔗 Open Link</a>
            )}
          </div>
        )}
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
