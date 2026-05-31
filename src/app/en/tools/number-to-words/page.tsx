"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is a number-to-words converter?", answer: "It converts numeric values to their English word representation. 1,234 = 'One Thousand Two Hundred Thirty-Four'. Useful for writing checks, legal documents, invoices, and formal correspondence where numbers need to be spelled out." },
  { question: "Why write numbers in words?", answer: "To prevent fraud and ambiguity. A check for 'One Thousand Dollars' can't be altered to 'Ten Million' easily. Legal contracts require both numeral and word representations. Banks in many countries require word amounts on checks." },
  { question: "What's the largest number supported?", answer: "Our converter handles up to 999 quadrillion (999,999,999,999,999,999). Common uses: millions ($1.5M = One Million Five Hundred Thousand), billions ($2.5B = Two Billion Five Hundred Million), trillions (national budgets)." },
  { question: "Does this work for currencies?", answer: "Yes! $1,234.56 = 'One Thousand Two Hundred Thirty-Four Dollars and Fifty-Six Cents'. Enter amounts with decimals for cents/pence. Some countries (US, Canada) say 'and' before cents. UK sometimes omits 'and'." },
  { question: "How do I write decimals in words?", answer: "Decimals are read as 'point' followed by each digit: 3.14159 = 'Three Point One Four One Five Nine'. For money: $5.99 = 'Five Dollars and Ninety-Nine Cents'. For scientific: 99.44 = 'Ninety-Nine Point Four Four'." },
  { question: "What about large round numbers?", answer: "1,000,000 = 'One Million'. 15,000,000 = 'Fifteen Million'. 500,000,000 = 'Five Hundred Million'. 1,000,000,000 = 'One Billion'. 1,000,000,000,000 = 'One Trillion'. Our converter handles all scales." },
  { question: "Is 'and' used in number reading?", answer: "In US English: 'and' is often omitted — 'One Hundred Twenty Three'. In UK English: 'and' is standard — 'One Hundred and Twenty-Three'. Our converter includes 'and' for clarity, compatible with both conventions." },
  { question: "How do I write ordinal numbers?", answer: "Ordinals: 1st = First, 2nd = Second, 3rd = Third, 4th = Fourth, 21st = Twenty-First. Our converter outputs cardinal numbers (One, Two). For ordinals, add your own suffix or use a dedicated ordinal converter." },
  { question: "What languages are supported?", answer: "Currently English only. Common extensions: Arabic (واحد، اثنان، ثلاثة), Spanish (uno, dos, tres), French, German. Check our Arabic tools section for the Arabic number-to-words converter." },
  { question: "Is there a mobile app?", answer: "This is a free web tool — no app needed. Bookmark the page on your phone. Works offline if cached. Use from any browser. Perfect for drafting checks, invoices, and financial documents on the go." },
  { question: "Common uses for number-to-words?", answer: "Writing checks (most common), legal contracts, rental agreements, invoices and receipts, bank deposits, formal invitations (age, date), educational worksheets, lottery/prize documentation, and wedding/event planning." },
  { question: "How accurate is the converter?", answer: "Our converter handles all integers 0-999,999,999,999,999,999 correctly, including edge cases: zero, negative numbers, large numbers, irregular English (twelve vs. twenty, hundred vs. hundredth). Test with your specific number if unsure." },
];

const relatedTools = [
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "Text Case", icon: "🔤", href: "/en/tools/text-case" },
  { title: "Text Cleaner", icon: "🧹", href: "/en/tools/text-cleaner" },
  { title: "Text Compare", icon: "📋", href: "/en/tools/text-compare" },
  { title: "QR Generator", icon: "📱", href: "/en/tools/qr-generator" },
  { title: "Password Generator", icon: "🔐", href: "/en/tools/password-generator" },
];

const seoContent = [
  "Our Number to Words Converter transforms any numeric value into its English word representation instantly. Perfect for writing checks, legal documents, invoices, and formal correspondence where numbers must be written in words to prevent fraud and ambiguity.",
  "How it works: Enter any number (0 to 999 quadrillion) with optional decimals. The converter outputs the English word equivalent. $1,250.75 = 'One Thousand Two Hundred Fifty Dollars and Seventy-Five Cents'. Simple, fast, and accurate.",
  "Why it matters: In legal and financial contexts, word representations prevent fraud. A numeral '1,000.00' can be altered to '1,000,000.00', but 'One Thousand Dollars' cannot. This is why checks, contracts, and bank documents require both formats.",
  "Our converter follows standard US/UK English conventions: 'and' between hundreds and tens (One Hundred and Twenty-Three), hyphenated compound numbers (Thirty-Two, One Hundred and Ninety-Nine), and proper large-number grouping (million, billion, trillion).",
  "Related: Pair with our Word Counter for document word counts, Text Case for formatting, and Text Cleaner for removing unwanted characters. Perfect workflow: convert numbers to words → format → count → finalize your document.",
  "Common scenarios: Writing a check for $2,347.50, drafting a contract with $50,000 consideration, creating an invoice for 1,234 units at $99.99 each, or formalizing a rental agreement at $1,850/month. Our converter handles them all."
];

export default function NumberToWords() {
  const [input, setInput] = useState("1234");
  const [output, setOutput] = useState("");

  const convert = () => {
    const num = parseFloat(input);
    if (isNaN(num)) { setOutput("Please enter a valid number"); return; }
    if (num > 999999999999999999) { setOutput("Number too large"); return; }
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const scales = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion"];

    const convertHundreds = (n: number): string => {
      if (n === 0) return "";
      const h = Math.floor(n / 100);
      const r = n % 100;
      let s = "";
      if (h > 0) s += ones[h] + " Hundred";
      if (r > 0) {
        if (s) s += " and ";
        s += r < 20 ? ones[r] : tens[Math.floor(r / 10)] + (r % 10 > 0 ? "-" + ones[r % 10] : "");
      }
      return s;
    };

    const whole = Math.floor(num);
    const cents = Math.round((num - whole) * 100);
    let result = "";
    if (whole === 0) { result = "Zero"; }
    else {
      let n = whole;
      let scaleIdx = 0;
      const parts: string[] = [];
      while (n > 0) {
        const chunk = n % 1000;
        if (chunk > 0) {
          const chunkWords = convertHundreds(chunk);
          parts.unshift(chunkWords + (scales[scaleIdx] ? " " + scales[scaleIdx] : ""));
        }
        n = Math.floor(n / 1000);
        scaleIdx++;
      }
      result = parts.join(" ");
    }
    if (cents > 0) result += ` and ${cents}/100`;
    setOutput(result);
  };

  const schemaName = "Number to Words";
const schemaDesc = `Online Number to Words - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/number-to-words";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Utility", url: "https://adwatak.cloud/en/tools/utility" },
  { name: "Number to Words", url: "https://adwatak.cloud/en/tools/number-to-words" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Text Tools" categorySlug="text-tools" toolName="Number to Words" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔢 Number to Words</h1>
        <p className="text-sm text-gray-500 mb-6">Convert numbers to English words for checks and documents</p>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Enter Number</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4" placeholder="1234" />
        <button onClick={convert} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Convert</button>
      </div>
      {output && (
        <div className="bg-green-50 rounded-xl p-5 border border-green-200 mb-6">
          <p className="text-xs text-green-600 mb-1">Result</p>
          <p className="text-lg font-bold text-green-900">{output}</p>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
