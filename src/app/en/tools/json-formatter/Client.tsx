"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is JSON?", answer: "JavaScript Object Notation — a lightweight data interchange format. Uses key-value pairs and arrays. Human-readable, easy for machines to parse. The standard format for web APIs (REST, GraphQL), configuration files, and data storage." },
  { question: "Why format JSON?", answer: "Unformatted JSON is one long line — impossible to read. Formatted JSON uses indentation and line breaks to show structure: nested objects, arrays, and their values. Essential for debugging APIs, reading configs, and understanding data." },
  { question: "How to validate JSON?", answer: "Our tool validates JSON syntax. Common errors: trailing commas (not allowed in JSON), missing quotes around keys, single quotes instead of double, unescaped special characters, and mismatched brackets/braces." },
  { question: "What are JSON types?", answer: "String (in double quotes), Number (integer or decimal), Boolean (true/false), Array ([...]), Object ({...}), and null. No undefined, no functions, no dates (use ISO string). JSON is language-independent." },
  { question: "JSON vs XML?", answer: "JSON: lighter, faster, native to JavaScript, easier to read. XML: supports attributes, namespaces, schemas (XSD), comments. JSON has largely replaced XML for web APIs. XML still dominates in enterprise (SOAP, document storage)." },
  { question: "JSON vs YAML?", answer: "JSON: more strict, no comments, universally supported. YAML: supports comments, uses indentation instead of brackets, multiline strings, more human-friendly for config files. YAML can parse to the same data structures as JSON." },
  { question: "Can JSON contain comments?", answer: "No — JSON specification does not allow comments. Use a separate field like '//comment' as a workaround, or preprocess JSON to strip comments. YAML is better for config files that need comments." },
  { question: "What is minified JSON?", answer: "All whitespace removed — one compact line. Uses less bandwidth and storage. Used in production APIs and bundled code. Our tool minifies JSON for deployment then pretty-prints for development." },
  { question: "How to handle large JSON?", answer: "Most tools struggle with 10+ MB JSON. Our browser-based tool handles moderate files. For large JSON, use command-line tools: jq (Linux/macOS), json-parse (npm), or stream processing. Our tool is best for API responses and configs." },
  { question: "What is JSON Schema?", answer: "A specification for validating JSON structure. Defines required fields, data types, allowed values, nested structures, and more. Used in API request/response validation, configuration validation, and documentation generation." },
  { question: "Circular JSON references?", answer: "JSON cannot represent circular references (object referring to itself). JSON.stringify throws an error. Solutions: use a replacer function, manual serialization, or libraries like flatted/circular-json." },
  { question: "JSON vs JSONP?", answer: "JSON: standard format. JSONP (JSON with Padding): wraps JSON in a callback function for cross-origin requests before CORS existed. JSONP is deprecated — use CORS and standard JSON for modern web development." },
];

const relatedTools = [
  { title: "Hash Generator", icon: "#️⃣", href: "/en/tools/hash-generator" },
  { title: "Base64 Encoder", icon: "🔐", href: "/en/tools/base64-encoder" },
  { title: "Text Cleaner", icon: "🧹", href: "/en/tools/text-cleaner" },
  { title: "Text Case", icon: "🔤", href: "/en/tools/text-case" },
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "Text Compare", icon: "📋", href: "/en/tools/text-compare" },
];

const seoContent = [
  "Our free JSON Formatter pretty-prints and validates JSON data instantly. Paste unformatted JSON, click Format, and get properly indented, color-coded output. Perfect for debugging API responses, editing configuration files, and understanding complex data structures.",
  "Example: Input '{\"name\":\"John\",\"age\":30,\"city\":\"NYC\"}' becomes formatted: { \"name\": \"John\", \"age\": 30, \"city\": \"NYC\" }. Nested objects and arrays use 2-space indentation. Invalid JSON shows syntax errors: missing commas, unclosed brackets, trailing commas.",
  "Features: (1) Format — pretty-print with 2-space indentation. (2) Minify — compress to one line for production. (3) Validate — check JSON syntax. (4) Browser-safe — no data sent to any server. Your API keys and sensitive data never leave your device.",
  "JSON is the backbone of modern web development. Every REST API returns JSON. Every npm project has package.json. Every web app configuration uses JSON. Mastering JSON formatting saves hours of debugging time.",
  "Related: Use with our Base64 Encoder for JSON with binary data. The Hash Generator verifies JSON integrity. The Text Cleaner removes unwanted characters from JSON strings. The Text Compare diffs two JSON structures.",
  "Common scenarios: Debugging a REST API response that's one giant line. Validating an exported JSON configuration before import. Preparing JSON for documentation. Converting between minified (production) and formatted (development) JSON."
];

export default function Client() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: unknown) {
      setOutput("");
      setError("Invalid JSON: " + (e as Error).message);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setOutput("");
      setError("Invalid JSON: " + (e as Error).message);
    }
  };

  const schemaName = "JSON Formatter";
const schemaDesc = `Online JSON Formatter - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/json-formatter";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Dev Tools", url: "https://adwatak.cloud/en/category/calculators" },
  { name: "JSON Formatter", url: "https://adwatak.cloud/en/tools/json-formatter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Dev Tools" categorySlug="developer-tools" toolName="JSON Formatter" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📋 JSON Formatter</h1>
        <p className="text-sm text-gray-500 mb-6">Pretty-print, validate, and minify JSON — client-side only</p>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4 min-h-[120px] font-mono text-sm" placeholder='{"name":"John","age":30}' />
        <div className="flex gap-2">
          <button onClick={format} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg cursor-pointer flex-1">Format JSON</button>
          <button onClick={minify} className="bg-gray-600 text-white font-bold p-3 rounded-xl border-none text-lg cursor-pointer flex-1">Minify</button>
        </div>
      </div>
      {error && <div className="bg-red-50 rounded-xl p-5 border border-red-200 mb-6"><p className="text-sm text-red-700">{error}</p></div>}
      {output && (
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-6">
          <p className="text-xs text-gray-600 mb-1">Result</p>
          <pre className="text-sm bg-white p-3 rounded-lg border border-gray-200 overflow-x-auto">{output}</pre>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="en" />
    </div>
  );
}
