"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

function fmt(n: number) { return n.toLocaleString("en-US", { maximumFractionDigits: 2 }); }

const faqs = [
  { question: "Installment vs loan — what's the difference?", answer: "Loans give you cash upfront from a bank. Installment plans let you buy a specific item and pay the retailer over time — sometimes at 0% if paid within the promotional period. Installments are tied to a purchase; loans are cash you can use for anything." },
  { question: "Are 0% installments really free?", answer: "Usually yes — if you pay on time and in full before the deadline. Miss a payment and retroactive interest kicks in at 20-30% from the original purchase date. Always read the fine print on deferred interest offers." },
  { question: "How does an installment calculator work?", answer: "Enter the total purchase amount, number of months, and interest rate (0% for promotional offers). The calculator divides the total by months with interest on the reducing balance. You get the exact monthly payment and total cost." },
  { question: "What's a typical installment APR?", answer: "Store credit cards: 25-30% APR. Buy now pay later (Klarna, Afterpay): 0% if paid on time, but late fees apply. Bank installment loans: 7-20%. Credit unions: 8-18%. Always compare the APR — not the monthly payment." },
  { question: "Can I pay installments early?", answer: "Most plans allow early payoff. Some charge a small admin fee. Paying off a 24-month plan in 12 months saves the remaining interest. Check terms before signing." },
  { question: "What happens if I miss an installment payment?", answer: "Late fee ($25-40). Credit score impact after 30 days. Deferred interest kicks in (all back interest added). Device financing (phones, laptops) may get locked. Set up autopay to avoid this." },
  { question: "Installment vs credit card — which is better?", answer: "Installment: fixed payment, fixed term, known total cost. Credit card: flexible payment, revolving balance, variable interest. Installments are better for planned large purchases. Credit cards are better for everyday spending and rewards." },
  { question: "What items are commonly financed?", answer: "Electronics (phones, laptops, TVs) — 6-24 months. Furniture — 12-36 months. Appliances — 12-24 months. Auto repairs — 6-12 months. Medical procedures — 6-24 months. Education — 6-12 months." },
  { question: "Does installment affect credit score?", answer: "Yes. On-time payments build credit. Late payments hurt credit. New installment accounts temporarily lower your average account age. Multiple installment applications in a short time signal risk to lenders." },
  { question: "What's the hidden cost of installments?", answer: "Retailers often price items higher to subsidize 0% offers. You might pay $800 for a $700 phone because '0% financing' is built into the price. Always compare the cash price vs installment total before buying." },
  { question: "Should I use BNPL (Buy Now Pay Later)?", answer: "BNPL is convenient but risky. 18% of BNPL users in the US have been charged late fees. Some BNPL companies report missed payments to credit bureaus. BNPL is fine for occasional use but dangerous as a habit." },
  { question: "How do I choose installment terms?", answer: "Shortest term you can afford. A $1,000 purchase: 6 months = $167/month (0 interest). 12 months = $84/month (maybe 0% or low). 24 months = $42/month + interest. Longer = lower payment but higher total cost." },
];

const relatedTools = [
  { title: "Loan Calculator", icon: "💰", href: "/en/tools/loan-calculator" },
  { title: "EMI Calculator", icon: "🧮", href: "/en/tools/emi-calculator" },
  { title: "Mortgage Calculator", icon: "🏠", href: "/en/tools/mortgage-calculator" },
  { title: "Compound Interest", icon: "📈", href: "/en/tools/compound-interest" },
  { title: "VAT Calculator", icon: "🏛️", href: "/en/tools/vat-calculator" },
  { title: "Profit Margin", icon: "📐", href: "/en/tools/profit-margin" },
];

const seoContent = [
  "An installment calculator figures out your monthly payment when you split a purchase into equal parts. Enter total amount, number of months, and interest rate (0% for promotional offers). Get the exact monthly payment and total cost instantly.",
  "Real-world example: A $2,000 laptop financed at 0% over 12 months = $167/month, no extra cost. Same laptop at 20% APR over 24 months = $102/month, total = $2,441 — you pay $441 in interest. Choose the shortest term you can afford.",
  "Installment plans are offered by retailers (Best Buy, Amazon, Apple), BNPL services (Klarna, Afterpay, Affirm), and banks through credit cards with installment features. Each has different terms, fees, and credit impact — compare before choosing.",
  "The 0% trap: Many store cards offer 'deferred interest' not '0% APR'. The difference: with deferred interest, missing even one payment means all back interest (from day one) is added at 20-30%. With 0% APR, only the remaining balance accrues interest.",
  "Related: Use our Loan Calculator to compare installment plans against personal loans. The Mortgage Calculator shows the same math for home loans. The Compound Interest tool shows what your money could earn if invested instead of spent on interest.",
  "Smart strategy: Before financing a purchase, calculate the total cost with our calculator. If the total interest exceeds 10% of the purchase price, consider saving up instead. If it's 0%, go ahead — just don't miss a payment."
];

export default function Client() {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<{ monthly: number; total: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const m = parseFloat(months);
    const r = parseFloat(rate) / 100 / 12;
    if (a <= 0 || m <= 0) return;
    const monthly = r > 0 ? a * (r * Math.pow(1 + r, m)) / (Math.pow(1 + r, m) - 1) : a / m;
    setResult({ monthly, total: monthly * m });
  };

  const schemaName = "Installment Calculator";
const schemaDesc = `Online Installment Calculator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/installment-calculator";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Financial Calculators", url: "https://adwatak.cloud/en/category/calculators" },
  { name: "Installment Calculator", url: "https://adwatak.cloud/en/tools/installment-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb category="Financial Calculators" categorySlug="calculators" toolName="Installment Calculator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📊 Installment Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate monthly payments for any installment plan</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Total Amount ($)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="2,000" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number of Months</label>
          <input type="number" value={months} onChange={(e) => setMonths(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="12" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Annual Rate (%) — 0 for 0% financing</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="0" />
        </div>
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Calculate</button>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">Monthly Payment</p>
            <p className="text-xl font-extrabold text-blue-900">${fmt(result.monthly)}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
            <p className="text-xs text-red-600 mb-1">Total Cost</p>
            <p className="text-xl font-extrabold text-red-900">${fmt(result.total)}</p>
          </div>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="en" />
    </div>
  );
}
