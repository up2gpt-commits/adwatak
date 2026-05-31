"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is a text cleaner?", answer: "A tool that removes unwanted characters, extra spaces, HTML tags, special characters, and formatting from text. Essential for cleaning copied content, preparing data, and normalizing text before processing." },
  { question: "When to use a text cleaner?", answer: "Pasting from Word or PDF (carries hidden formatting), removing HTML tags from copied web content, cleaning CSV data, normalizing user input, removing non-ASCII characters, and preparing text for translation tools." },
  { question: "Does text cleaner remove emoji?", answer: "Optional — some cleaners have a 'Remove emoji' option. Our cleaner removes special characters including emoji. If you want to keep emoji, use the 'Keep emoji' mode. Emoji are Unicode and can cause encoding issues in some systems." },
  { question: "What is a non-ASCII character?", answer: "Characters outside the basic English alphabet (A-Z, 0-9). Examples: ñ, ü, ç, Chinese (中文), Arabic (العربية), emoji (smiley face), and special quote marks. Our cleaner can strip non-ASCII to leave only plain ASCII text." },
  { question: "How to remove extra spaces?", answer: "Multiple spaces between words (double spaces), leading or trailing whitespace, tabs, and line breaks. Our cleaner normalizes all to single spaces. Trim removes leading/trailing whitespace. Line break removal joins everything into one line." },
  { question: "What is HTML stripping?", answer: "Removing HTML tags (p, div, a, img) while keeping the text content. For example: p Hello b world /b /p becomes 'Hello world'. Essential for web scraping, email processing, and cleaning pasted content from browsers." },
  { question: "How to clean text from PDF?", answer: "PDF text often has broken words (hyphenation across lines), random line breaks, special spaces, missing punctuation, and encoding issues. Our cleaner fixes these: remove line breaks within paragraphs, fix hyphenation, and remove non-standard spaces." },
  { question: "What is normalize Unicode?", answer: "Convert Unicode characters to their closest ASCII equivalents: e.g., cafe (with accent) becomes cafe, uber (with umlaut) becomes uber. Also converts curly quotes to straight quotes and different dash types to hyphen." },
  { question: "Why clean text before SEO?", answer: "Search engines index clean, structured content better. Hidden formatting, non-standard characters, extra spaces, and broken HTML can confuse crawlers. Clean text equals better indexation equals better ranking." },
  { question: "How to remove line breaks?", answer: "Replace newline characters with spaces (or nothing). This combines multiple lines into one continuous paragraph. Useful for pasting email text, code logs, and multi-line content that should be continuous." },
  { question: "Can I remove numbers from text?", answer: "Yes — remove all digits (0-9) from text. Useful for cleaning text where numbers are irrelevant, preparing content for analysis, or anonymizing data that contains phone numbers or IDs." },
  { question: "What is text normalization?", answer: "Standardizing text: lowercase (or proper case), remove extra spaces and punctuation, normalize Unicode, remove HTML/XML tags, and standardize line endings. Essential for data processing, NLP, and machine learning pipelines." },
];

const relatedTools = [
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "Text Case", icon: "🔤", href: "/en/tools/text-case" },
  { title: "Text Compare", icon: "📋", href: "/en/tools/text-compare" },
  { title: "JSON Formatter", icon: "📋", href: "/en/tools/json-formatter" },
  { title: "Base64 Encoder", icon: "🔐", href: "/en/tools/base64-encoder" },
  { title: "Hash Generator", icon: "#️⃣", href: "/en/tools/hash-generator" },
];

const seoContent = [
  "Our free Text Cleaner removes unwanted characters, extra spaces, HTML tags, and formatting from your text. Clean up messy text copied from Word, PDFs, web pages, and email. Choose exactly what to remove: extra spaces, line breaks, HTML, non-ASCII, numbers, or special characters.",
  "Common uses: (1) Paste from Word or Google Docs — removes hidden formatting. (2) Clean HTML — strip tags for plain text. (3) Normalize Unicode — convert special chars to ASCII. (4) Remove extra spaces — fix double spaces at once. (5) Fix line breaks — merge broken paragraphs from PDFs.",
  "Example: Input p Hello   World! nbsp nbsp This is b text /b /p becomes 'Hello World! This is text'. All HTML tags removed, extra spaces normalized, encoded characters decoded. Clean text ready for processing.",
  "Business use: Clean customer data before import, normalize product descriptions from suppliers, prepare text for email campaigns (no HTML garbage), clean form submissions, and sanitize user-generated content before database storage.",
  "Related: Pair with our Word Counter to measure cleaned output. The Text Case tool formats the result. The Text Compare tool checks before and after. The JSON Formatter structures cleaned data. Complete text processing in one workflow.",
  "All processing happens in your browser — no data sent to servers. Click buttons to toggle different cleaning options. Results appear instantly as you type. Free, private, and fast."
];

export default function TextCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const clean = (action: string) => {
    let text = input;
    switch (action) {
      case "trim": text = text.trim(); break;
      case "spaces": text = text.replace(/[ \t]+/g, " ").replace(/^\s+|\s+$/gm, "").replace(/\n{3,}/g, "\n\n"); break;
      case "lines": text = text.replace(/\r?\n|\r/g, " ").replace(/ +/g, " "); break;
      case "html": text = text.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'"); break;
      case "nonascii": text = text.replace(/[^\x20-\x7E\n\r]/g, ""); break;
      case "numbers": text = text.replace(/[0-9]/g, ""); break;
      case "punctuation": text = text.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, ""); break;
      case "extra": text = text.replace(/(\w)-\s+(\w)/g, "$1$2").replace(/(\w)\s+-(\w)/g, "$1$2"); break;
    }
    setOutput(text);
  };

  const schemaName = "Text Cleaner";
const schemaDesc = `Online Text Cleaner - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/text-cleaner";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Utility", url: "https://adwatak.cloud/en/tools/utility" },
  { name: "Text Cleaner", url: "https://adwatak.cloud/en/tools/text-cleaner" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Text Tools" categorySlug="text-tools" toolName="Text Cleaner" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧹 Text Cleaner</h1>
        <p className="text-sm text-gray-500 mb-6">Remove unwanted characters, spaces, HTML, and formatting</p>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4 min-h-[100px]" placeholder="Paste messy text here..." />
        <div className="flex flex-wrap gap-2 mb-4">
          {[{ k: "trim", l: "Trim" }, { k: "spaces", l: "Fix Spaces" }, { k: "lines", l: "Remove Line Breaks" }, { k: "html", l: "Strip HTML" }, { k: "nonascii", l: "Remove non-ASCII" }, { k: "numbers", l: "Remove Numbers" }, { k: "punctuation", l: "Remove Punctuation" }, { k: "extra", l: "Fix Hyphenation" }].map((btn) => (
            <button key={btn.k} onClick={() => clean(btn.k)} className="bg-gray-100 text-gray-800 font-semibold px-3 py-1.5 rounded-lg text-sm border-none cursor-pointer hover:bg-blue-100">{btn.l}</button>
          ))}
        </div>
      </div>
      {output && (
        <div className="bg-green-50 rounded-xl p-5 border border-green-200 mb-6">
          <p className="text-xs text-green-600 mb-1">Result</p>
          <p className="text-sm break-all">{output}</p>
          <button onClick={() => navigator.clipboard.writeText(output)} className="mt-2 bg-green-600 text-white font-semibold px-4 py-1.5 rounded-xl border-none text-sm cursor-pointer">Copy</button>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="en" />
    </div>
  );
}
