"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "What is encoding?", answer: "Converting data from one format to another for safe transport or storage. Common types: Base64 (binary data), URL Encoding (web links), and HTML Entities (safe text)." },
  { question: "What's the difference between Base64 and URL Encoding?", answer: "Base64 converts any data (images, files) to readable ASCII text — used in APIs and Data URLs. URL Encoding converts disallowed characters in URLs (%20 for space, %3F for question mark)." },
  { question: "What is HTML Entities encoding?", answer: "Converting special characters to HTML Entities — e.g., < → &lt;, > → &gt;, & → &amp;. Prevents XSS attacks and ensures proper rendering in browsers." },
  { question: "Is encoding secure encryption?", answer: "No! Encoding is not encryption. It can be easily reversed. Don't use it to protect sensitive data. Use AES or RSA for real encryption." },
  { question: "When should I use URL Encoding?", answer: "When building URLs with spaces or special characters — e.g., 'search tools' → 'search+tools'. Browsers require URL Encoding for proper link handling." },
  { question: "When should I use Base64 Encoding?", answer: "Embedding images in HTML (Data URL: <img src='data:...'>), transmitting data in JSON APIs, sending attachments in email (MIME)." },
  { question: "What's the difference between encodeURI and encodeURIComponent?", answer: "encodeURI: encodes a full URL (preserves / : ?). encodeURIComponent: encodes a URL segment (encodes ALL special chars). Use encodeURIComponent for query parameters." },
  { question: "Does encoding affect data size?", answer: "Yes — Base64 increases size by ~33%. URL Encoding varies based on how many special characters are encoded. HTML Entities adds minimal overhead." },
  { question: "How do I decode text in JavaScript?", answer: "Base64: atob(str) to decode, btoa(str) to encode. URL: decodeURIComponent(str) to decode, encodeURIComponent(str) to encode. HTML: use DOMParser or a library." },
  { question: "What are common encoding mistakes?", answer: "Forgetting to encode Arabic/text before sending in URLs (causes garbled text). Using Base64 for encryption (insecure). Forgetting to decode before displaying text to users." },
];

const relatedTools = [
  { title: "Base64 Encoder", icon: "🔄", href: "/en/tools/base64-encoder" },
  { title: "JSON Formatter", icon: "📋", href: "/en/tools/json-formatter" },
  { title: "Hash Generator", icon: "#️⃣", href: "/en/tools/hash-generator" },
  { title: "Text Compare", icon: "⚖️", href: "/en/tools/text-compare" },
  { title: "Text Cleaner", icon: "🧹", href: "/en/tools/text-cleaner" },
  { title: "Text Case Converter", icon: "🔤", href: "/en/tools/text-case" },
];

const seoContent = [
  "Free online encoder and decoder tool supporting three methods: Base64 encoding/decoding for binary data transmission, URL encoding/decoding for safe web links, and HTML entity encoding for XSS-safe text. Everything runs in your browser — no data is sent to any server.",
  "Every web developer needs to understand encoding: Base64 for image data and API payloads, URL Encoding for query parameters and links, and HTML Entities for preventing XSS attacks in web applications.",
  "Encoding is NOT encryption — any encoded data can be trivially reversed. Use encoding for representation and transport, not for security. For protection, use bcrypt (passwords) or TLS (transport).",
  "This tool works 100% client-side — your text never leaves your browser. Full privacy guaranteed."
];

export default function Client() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("base64-encode");

  const process = () => {
    try {
      switch (mode) {
        case "base64-encode": setResult(btoa(unescape(encodeURIComponent(input)))); break;
        case "base64-decode": setResult(decodeURIComponent(escape(atob(input)))); break;
        case "url-encode": setResult(encodeURIComponent(input)); break;
        case "url-decode": setResult(decodeURIComponent(input)); break;
      }
    } catch { setResult("Encoding/decoding error — check your input"); }
  };

  const schemaName = "URL Encoder/Decoder";
const schemaDesc = `Free online encoder and decoder tool for Base64, URL encoding, and more.`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/encoder";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud" },
  { name: "Dev Tools", url: "https://adwatak.cloud/en/category/dev" },
  { name: "URL Encoder/Decoder", url: "https://adwatak.cloud/en/tools/encoder" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
        <StructuredData data={howToSchema("How to use this encoder", "Free online tool. Works directly in your browser. No registration required.", [
          {name:"Choose encoding type", text:"Select Base64, URL, or HTML encoding from the dropdown"},
          {name:"Enter your text", text:"Paste or type the text you want to encode or decode"},
          {name:"Click the button", text:"Press execute to process your text"},
          {name:"Copy the result", text:"Use the copy button or select the encoded/decoded output"}
        ], "less than a minute", "en")} />
        <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="en" category="Dev Tools" categorySlug="dev" toolName="URL Encoder/Decoder" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔧 URL Encoder/Decoder</h1>
        <p className="text-sm text-gray-500 mb-6">Encode and decode Base64, URLs, and more — client-side only</p>
        <select value={mode} onChange={(e) => setMode(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white mb-4">
          <option value="base64-encode">Base64 Encode</option>
          <option value="base64-decode">Base64 Decode</option>
          <option value="url-encode">URL Encode</option>
          <option value="url-decode">URL Decode</option>
        </select>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full h-[120px] p-4 border-2 border-gray-200 rounded-xl text-sm outline-none font-inherit resize-y mb-4"
          placeholder="Enter text..." />
        <button onClick={process}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          Execute
        </button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-200 break-all text-sm">
          {result}
        </div>
      )}
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
    <ShareButtons lang="en" />
    </div>
  );
}
