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
  { question: "What is a personal loan?", answer: "A personal loan is a lump sum from a bank repaid in fixed monthly installments over 1-7 years. No collateral required. Rates range from 6% to 36% APR. Borrowing $10,000 at 10% over 5 years = 60 payments of $212, totaling $12,748." },
  { question: "What do lenders look at?", answer: "Credit score (700+ ideal), debt-to-income ratio (below 36%), employment stability (2+ years helps). Documentation: ID, pay stubs, bank statements, W-2s. Pre-approval checks your rate without a hard credit pull." },
  { question: "How do I compare loan offers?", answer: "Compare APR (includes all fees), total repayment amount, and monthly payment vs budget. Watch for origination fees (1-8% of loan). $10,000 at 10% APR with 5% origination = you receive $9,500 but pay interest on $10,000." },
  { question: "Can I pay off early?", answer: "Most personal loans allow early payoff without penalties. Paying off a $15,000 loan at 12% two years early saves about $1,800. Strategies: round up payments or make biweekly payments (13 per year instead of 12)." },
  { question: "What affects my interest rate?", answer: "Credit score (biggest factor), income, loan amount, loan term, and debt-to-income ratio. A 720+ score gets you 7-10% APR. Below 630, you might see 25-36% APR. Improve your score before applying." },
  { question: "Secured vs unsecured personal loan?", answer: "Secured loans require collateral (car, savings) — lower rates (5-10%). Unsecured loans need no collateral — higher rates (7-36%). If you have collateral, secured is cheaper. Defaulting on secured means losing the asset." },
  { question: "How long does funding take?", answer: "Online lenders: 1-3 business days after approval. Banks: 3-7 days. Credit unions: 2-5 days. Some lenders offer same-day funding for existing customers. Pre-qualify before applying to speed things up." },
  { question: "What happens if I miss a payment?", answer: "Late fee (typically $15-30). After 30 days, reported to credit bureaus — your score drops 60-110 points. After 90 days, account goes to collections. Set up autopay to avoid this." },
  { question: "Can I get a loan with bad credit?", answer: "Yes, but rates are high (20-36% APR). Options: secured loans, credit union loans, or a cosigner. Improve your score first if possible — even 50 points can save thousands in interest." },
  { question: "What's the difference between APR and interest rate?", answer: "Interest rate is the cost of borrowing. APR includes interest + fees (origination, processing). APR is always higher. By law, lenders must disclose APR. Always compare APR, not just the interest rate." },
  { question: "How much can I borrow?", answer: "Most lenders offer $1,000-$50,000. Maximum based on income, credit, and DTI ratio. A general rule: monthly payment shouldn't exceed 10% of your gross monthly income. Use our calculator to test scenarios." },
  { question: "What are the alternatives to personal loans?", answer: "Balance transfer credit card (0% intro APR), home equity line of credit (HELOC, lower rates), 401(k) loan (borrow from yourself), peer-to-peer lending (LendingClub, Prosper), or borrowing from family." },
];

const relatedTools = [
  { title: "Mortgage Calculator", icon: "🏠", href: "/en/tools/mortgage-calculator" },
  { title: "EMI Calculator", icon: "🧮", href: "/en/tools/emi-calculator" },
  { title: "Installment Calculator", icon: "📊", href: "/en/tools/installment-calculator" },
  { title: "Compound Interest", icon: "📈", href: "/en/tools/compound-interest" },
  { title: "Salary Calculator", icon: "💵", href: "/en/tools/salary-calculator" },
  { title: "VAT Calculator", icon: "🏛️", href: "/en/tools/vat-calculator" },
];

const seoContent = [
  "A personal loan calculator shows the true cost of borrowing — not just the monthly payment, but how much total interest you'll pay over the full term. Most people shop by monthly payment alone, which is exactly how lenders want you to think. Our calculator reveals the full picture.",
  "How it works: Enter the loan amount ($5,000-$50,000 typical), annual interest rate (check your pre-approval offers), and loan term (1-7 years). The calculator instantly shows your monthly payment, total repayment amount, and total interest cost.",
  "Example: $15,000 loan at 10% APR over 5 years. Monthly payment = $319. Total paid = $19,140. Total interest = $4,140. Same loan over 3 years: $484/month, total = $17,421, interest = $2,421. You save $1,719 by choosing 3 years instead of 5.",
  "Your credit score directly impacts your rate. A score of 760+ might get 7% APR ($15K/5yr = $297/mo, $2,820 interest). A score of 640 might get 18% APR ($15K/5yr = $381/mo, $7,860 interest). The difference: $5,040 in extra interest just because of credit score.",
  "Watch for hidden fees: origination fees (1-8% deducted upfront), prepayment penalties (rare but check), late payment fees ($15-30). Our calculator focuses on the core loan math. Add estimated fees manually to get your true cost.",
  "Internal link: Use our Loan Calculator alongside the Mortgage Calculator if you're consolidating debt. Compare with the EMI Calculator for alternative repayment structures. Bookmark the Compound Interest tool to see how the same money could grow if invested instead."
];

export default function Client() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (p <= 0 || r <= 0 || n <= 0) return;
    const monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setResult({ monthly, total: monthly * n, interest: monthly * n - p });
  };

  const schemaName = "Loan Calculator";
const schemaDesc = `Online Loan Calculator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/loan-calculator";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Financial Calculators", url: "https://adwatak.cloud/en/category/calculators" },
  { name: "Loan Calculator", url: "https://adwatak.cloud/en/tools/loan-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb category="Financial Calculators" categorySlug="calculators" toolName="Loan Calculator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">💰 Loan Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate monthly payments and total interest for any personal loan</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Loan Amount ($)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="15,000" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="10" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Loan Term (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="5" />
        </div>
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Calculate</button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">Monthly Payment</p>
            <p className="text-xl font-extrabold text-blue-900">${fmt(result.monthly)}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">Total Paid</p>
            <p className="text-xl font-extrabold text-green-900">${fmt(result.total)}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
            <p className="text-xs text-red-600 mb-1">Total Interest</p>
            <p className="text-xl font-extrabold text-red-900">${fmt(result.interest)}</p>
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
