"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is Base64?", answer: "Base64 is an encoding scheme that converts binary data into ASCII text using 64 printable characters (A-Z, a-z, 0-9, +, /). It's not encryption — it's encoding for safe transmission over text-based protocols like email (MIME) and HTTP." },
  { question: "Why use Base64 encoding?", answer: "To send binary data (images, files, audio) through channels that only support text. Used in: email attachments (MIME), data URLs in HTML/CSS (base64 images), storing binary in JSON/XML, and certificate encoding (PEM format)." },
  { question: "Is Base64 secure?", answer: "No — Base64 is encoding, not encryption. Anyone can decode Base64 instantly. Don't use it to 'hide' data. For security, use proper encryption (AES, RSA). Base64 just makes binary data text-friendly." },
  { question: "Base64 vs Base64URL?", answer: "Base64 uses + and / which can cause issues in URLs. Base64URL replaces + with - and / with _. Both decode to the same binary. Use Base64URL for JWT tokens, web APIs, and URL parameters." },
  { question: "How much does Base64 expand data?", answer: "Base64 expands data by ~33%. A 3MB image becomes ~4MB. Ratio: 3 bytes become 4 characters. Padding (=) brings it to multiples of 4. For large files, use binary transfer instead of Base64." },
  { question: "Can I Base64 an image?", answer: "Yes — our tool handles text. For images, convert the file to Base64 using command line: base64 image.png > encoded.txt. The result starts with 'data:image/png;base64,iVBORw...' for inline embedding." },
  { question: "What does the padding (=) mean?", answer: "Base64 works in 3-byte groups. If input isn't a multiple of 3, = is added as padding. One = means 2 bytes remaining. Two = means 1 byte remaining. Decoders strip padding automatically." },
  { question: "What characters are in Base64?", answer: "A-Z (26), a-z (26), 0-9 (10), + and / = 64 characters. = for padding. That's 65 total. Different variants use different last two characters for URL-safety." },
  { question: "How to decode Base64 in the terminal?", answer: "Encode: echo 'Hello' | base64. Decode: echo 'SGVsbG8=' | base64 -d. Linux and macOS include base64. Windows also has certutil -encode and certutil -decode." },
  { question: "Base64 vs hexadecimal?", answer: "Base64: 64 chars, 33% overhead. Hex: 16 chars (0-9, a-f), 100% overhead. Base64 is more compact. Hex is human-readable for short values. Base64 is preferred for large binary data like images and files." },
  { question: "What is Base64 used for in web development?", answer: "Data URIs in CSS: background-image: url(data:image/png;base64,...). JWT token payloads. Storing binary in localStorage. API responses with binary content. Email attachments (MIME standard). Certificate and key formats." },
  { question: "Can Base64 handle non-English text?", answer: "Yes — first encode the text to UTF-8 bytes, then Base64. Our tool encodes UTF-8 compatible strings. Emoji (😊 = 4 bytes), Arabic (السلام = 14 bytes), and special characters are all supported." },
];

const relatedTools = [
  { title: "Hash Generator", icon: "#️⃣", href: "/en/tools/hash-generator" },
  { title: "JSON Formatter", icon: "📋", href: "/en/tools/json-formatter" },
  { title: "Text Cleaner", icon: "🧹", href: "/en/tools/text-cleaner" },
  { title: "Text Case", icon: "🔤", href: "/en/tools/text-case" },
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "QR Generator", icon: "📱", href: "/en/tools/qr-generator" },
];

const seoContent = [
  "Our free Base64 Encoder/Decoder converts text to Base64 encoding and decodes Base64 back to plain text instantly. Input your data, choose encode or decode — no uploads, no servers. Everything runs in your browser for privacy and speed.",
  "Base64 is essential for web developers: email attachments use Base64 (MIME), inline images in HTML/CSS use Base64 data URIs, JWT tokens use Base64URL encoding, and binary data in JSON APIs requires Base64. Our tool handles all of these.",
  "Example: Encode 'Hello World!' → SGVsbG8gV29ybGQh. Decode 'UEE0NU1FUlQ=' → PA45MERT. Every 3 bytes of input becomes 4 Base64 characters. Your 1KB text becomes ~1.37KB encoded. Works with emoji, Arabic, Chinese, and all Unicode characters.",
  "All processing happens client-side — no data is sent to any server. This matters when encoding sensitive information like API keys, authentication tokens, or private keys. Your data stays on your device. Private, fast, and free.",
  "Related: Use with our Hash Generator for content integrity verification. The JSON Formatter pairs well for API work. The Text Cleaner helps prepare input. The QR Generator can encode Base64 data into scannable barcodes.",
  "Developers commonly use Base64 for: data: URIs (images in CSS/HTML), authorization headers (Basic Auth = base64(username:password)), certificate storage (PEM format), and binary over WebSocket. Our tool simplifies all these workflows."
];

export default function Base64Encoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      setOutput(mode === "encode" ? btoa(input) : atob(input));
    } catch {
      setOutput("Error: Invalid input for " + mode);
    }
  };

  const schemaName = "Base64 Encoder / Decoder";
const schemaDesc = `Online Base64 Encoder / Decoder - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/base64-encoder";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Utility", url: "https://adwatak.cloud/en/tools/utility" },
  { name: "Base64 Encoder / Decoder", url: "https://adwatak.cloud/en/tools/base64-encoder" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Developer Tools" categorySlug="developer-tools" toolName="Base64 Encoder/Decoder" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔐 Base64 Encoder / Decoder</h1>
        <p className="text-sm text-gray-500 mb-6">Convert text to and from Base64 encoding — client-side only</p>
        <div className="flex gap-2 mb-4">
          <button onClick={() => { setMode("encode"); setOutput(""); }} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${mode === "encode" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>Encode</button>
          <button onClick={() => { setMode("decode"); setOutput(""); }} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${mode === "decode" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>Decode</button>
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4 min-h-[100px]" placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."} />
        <button onClick={convert} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">{mode === "encode" ? "Encode to Base64" : "Decode from Base64"}</button>
      </div>
      {output && (
        <div className="bg-green-50 rounded-xl p-5 border border-green-200 mb-6">
          <p className="text-xs text-green-600 mb-1">Result</p>
          <textarea readOnly value={output} className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm outline-none min-h-[80px]" />
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
