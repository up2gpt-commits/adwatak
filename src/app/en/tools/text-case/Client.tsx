"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is text case conversion?", answer: "Changing text between different capitalization styles: UPPERCASE, lowercase, Title Case, Sentence case, aLtErNaTiNg CaSe, and more. Our tool converts text instantly with a single click for any format you need." },
  { question: "When to use UPPERCASE?", answer: "Acronyms (USA, NASA), headings for emphasis, warning labels, and some legal disclaimers. Avoid for body text (harder to read, feels like shouting). UPPERCASE in emails is considered aggressive." },
  { question: "When to use Title Case?", answer: "Book titles (The Great Gatsby), article headlines (10 Ways to Improve SEO), song names, movie titles, and chapter headings. Major words capitalized, minor words (and, the, of, in) lowercased. AP Style vs Chicago Manual of Style differ on rules." },
  { question: "When to use Sentence case?", answer: "Most body text — first word capitalized, rest lowercase. Email subject lines, blog post subheadings (if not Title Case), professional documents. The standard for readable English content." },
  { question: "What is alternating case?", answer: "aLtErNaTiNg CaSe — each letter alternates upper/lower. Used for: mockery in internet culture ('WhAt ArE yOu TaLkInG aBoUt?'), stylized usernames, and design accents. Also called 'studly caps' or 'sponge case' (SpongeBob meme)." },
  { question: "What is camelCase?", answer: "Words joined without spaces, each word capitalized except first: 'camelCaseExample'. Used in: JavaScript variable names, Java method names, JSON keys. PascalCase (all words capitalized) for class names: 'MyClassName'." },
  { question: "What is snake_case?", answer: "Words separated by underscores, all lowercase: 'this_is_snake_case'. Used in: Python variable names, file names in Linux, database column names, and API endpoints. Common in Ruby, Python, and C++." },
  { question: "What is kebab-case?", answer: "Words separated by hyphens, all lowercase: 'this-is-kebab-case'. Used in: URL slugs (/my-blog-post), CSS class names (font-size), HTML attributes (data-attribute), and file names. Hyphens improve readability." },
  { question: "Why use consistent text case?", answer: "Code consistency (linters enforce case rules), professional writing standards, SEO (URL slug format matters), brand guidelines (some brands use all lowercase), and readability. Inconsistent case = unprofessional." },
  { question: "How to convert case in Word/Google Docs?", answer: "Word: select text, Shift+F3 cycles through options. Google Docs: Format > Text > Capitalization > choose option. Our online tool works faster — paste, click, copy — no need for software shortcuts." },
  { question: "What about case in URLs?", answer: "URLs are case-sensitive on some servers. Standard: all lowercase with hyphens (kebab-case). 'My Blog Post.html' might 404 on Linux servers. Always use lowercase URLs for reliability and SEO consistency." },
  { question: "How does case affect readability?", answer: "Mixed case (Sentence/Title) is 13% faster to read than ALL CAPS. lowercase is 5% slower than Title Case due to reduced shape recognition. ALL CAPS = shouting. Title Case = formal. lowercase = casual. Choose for context." },
];

const relatedTools = [
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "Text Cleaner", icon: "🧹", href: "/en/tools/text-cleaner" },
  { title: "Text Compare", icon: "📋", href: "/en/tools/text-compare" },
  { title: "Number to Words", icon: "🔢", href: "/en/tools/number-to-words" },
  { title: "JSON Formatter", icon: "📋", href: "/en/tools/json-formatter" },
  { title: "Base64 Encoder", icon: "🔐", href: "/en/tools/base64-encoder" },
];

const seoContent = [
  "Our free Text Case Converter instantly transforms text between UPPERCASE, lowercase, Title Case, Sentence case, alternating case, camelCase, PascalCase, snake_case, and kebab-case. Paste your text, choose the format, copy the result. Fast and private.",
  "Example: 'the quick brown fox' → UPPERCASE: 'THE QUICK BROWN FOX' → Title Case: 'The Quick Brown Fox' → camelCase: 'theQuickBrownFox' → snake_case: 'the_quick_brown_fox' → kebab-case: 'the-quick-brown-fox'. All in one click.",
  "Title Case rules: Capitalize the first and last word. Capitalize nouns, pronouns, verbs, adjectives, adverbs. Lowercase articles (a, an, the), conjunctions (and, but, or), and short prepositions (in, on, at, to). Differs slightly between AP and Chicago styles.",
  "Developers: Our converter is especially useful for code — convert between camelCase (JavaScript), snake_case (Python), PascalCase (C# classes), and kebab-case (CSS/HTML). No more manually renaming variables. Paste, convert, done.",
  "Related: Pair with our Word Counter to track words before/after conversion. The Text Cleaner removes unwanted formatting. The Text Compare tool diffs versions. The Number to Words converter for numeric values.",
  "Writers: Use Title Case for headlines (catchy, professional), Sentence case for body text (readable, natural), and UPPERCASE sparingly for emphasis. Our tool handles all formats so you can focus on content, not formatting."
];

export default function Client() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = (type: string) => {
    if (!input) return;
    switch (type) {
      case "upper": setOutput(input.toUpperCase()); break;
      case "lower": setOutput(input.toLowerCase()); break;
      case "title": setOutput(input.toLowerCase().replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1))); break;
      case "sentence": setOutput(input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()); break;
      case "alternating": setOutput(input.split("").map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join("")); break;
      case "camel": setOutput(input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())); break;
      case "pascal": setOutput(input.toLowerCase().replace(/(^|[\W_]+)(\w)/g, (_, __, c) => c.toUpperCase())); break;
      case "snake": setOutput(input.toLowerCase().replace(/[\W_]+/g, "_").replace(/^_|_$/g, "")); break;
      case "kebab": setOutput(input.toLowerCase().replace(/[\W_]+/g, "-").replace(/^-|-$/g, "")); break;
    }
  };

  const schemaName = "Text Case Converter";
const schemaDesc = `Online Text Case Converter - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/text-case";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Text Tools", url: "https://adwatak.cloud/en/category/calculators" },
  { name: "Text Case Converter", url: "https://adwatak.cloud/en/tools/text-case" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Text Tools" categorySlug="text-tools" toolName="Text Case Converter" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔤 Text Case Converter</h1>
        <p className="text-sm text-gray-500 mb-6">Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case</p>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4 min-h-[80px]" placeholder="Enter text to convert..." />
        <div className="flex flex-wrap gap-2 mb-4">
          {[{ k: "upper", l: "UPPERCASE" }, { k: "lower", l: "lowercase" }, { k: "title", l: "Title Case" }, { k: "sentence", l: "Sentence case" }, { k: "alternating", l: "aLtErNaTiNg" }, { k: "camel", l: "camelCase" }, { k: "pascal", l: "PascalCase" }, { k: "snake", l: "snake_case" }, { k: "kebab", l: "kebab-case" }].map((btn) => (
            <button key={btn.k} onClick={() => convert(btn.k)} className="bg-gray-100 text-gray-800 font-semibold px-3 py-1.5 rounded-lg text-sm border-none cursor-pointer hover:bg-blue-100">{btn.l}</button>
          ))}
        </div>
      </div>
      {output && (
        <div className="bg-green-50 rounded-xl p-5 border border-green-200 mb-6">
          <p className="text-xs text-green-600 mb-1">Result</p>
          <p className="text-lg font-bold text-green-900 break-all">{output}</p>
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
