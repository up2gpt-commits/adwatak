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
  { question: "What is compound interest?", answer: "Interest earned on interest. If you invest $10,000 at 8% annually, year 1 interest = $800 (on $10K). Year 2 interest = $864 (on $10,800). The extra $64 is compound interest working. Over 30 years, $10K grows to $100,627." },
  { question: "Simple vs compound interest?", answer: "Simple interest: earn 8% on $10K = $800/year every year. After 30 years = $34,000. Compound interest: 8% on growing balance. After 30 years = $100,627. The difference of $66,627 is the power of compounding." },
  { question: "How often should interest compound?", answer: "More frequent = more growth. $10K at 8% over 30 years: annually = $100,627, semi-annually = $102,013, quarterly = $102,942, monthly = $103,670, daily = $104,044. Daily compounding adds only 3.4% more than annual." },
  { question: "What's the Rule of 72?", answer: "Divide 72 by your annual rate to get years to double. At 8%: 72/8 = 9 years to double. At 12%: 6 years. At 4%: 18 years. At 20%: 3.6 years. It's a quick mental approximation — accurate for rates 6-12%." },
  { question: "How much do I need to retire?", answer: "Rule of thumb: 25× your annual expenses. If you need $40K/year: $1M. If you're 30 saving $500/month at 8% compound: $500 × 12 × (1.08^35 - 1)/0.08 = $1,035,852 by 65. Start early — time is your biggest advantage." },
  { question: "How does compounding apply to debt?", answer: "Credit cards compound daily — the worst kind. $5,000 at 22% APR compounds to $8,380 in 3 years if unpaid. Minimum payments ($100/month) take 8+ years and cost $4,200+ in interest. Pay credit card debt before investing." },
  { question: "What is compounding frequency?", answer: "How often interest is calculated and added: annually (once/year), semi-annually (2×), quarterly (4×), monthly (12×), daily (365×). Continuous compounding uses e^rt. More frequent = marginally more growth." },
  { question: "Does compound interest beat inflation?", answer: "Yes if your return exceeds inflation. Historical S&P 500: ~10% average return. Historical inflation: ~3%. Real return = 7%. $10K in stocks over 30 years: $100K nominal, ~$50K in today's dollars. Stocks beat inflation long-term." },
  { question: "What is compounding for savings accounts?", answer: "Most high-yield savings accounts compound daily and pay monthly. At 4.5% APY, $10K earns $450/year. After 5 years = $12,460. Much less than stocks but guaranteed (FDIC insured). Best for emergency funds." },
  { question: "How does age affect compounding?", answer: "Starting at 25 vs 35 makes a massive difference. Saving $200/month at 8%: 25-65 = $699,000. 35-65 = $298,000. The 10-year delay costs $401,000 — more than half. The first decade of investing is the most powerful." },
  { question: "What's the formula for compound interest?", answer: "A = P(1 + r/n)^(nt). P = principal, r = annual rate, n = compounds per year, t = years. A = final amount. Our calculator does this instantly. Try different rate, time, and frequency combinations before investing." },
  { question: "Can I lose money with compound interest?", answer: "Yes if the investment loses value (stocks, crypto, ETFs). Compound interest assumes positive returns. In negative years, losses compound too. Diversify across stocks, bonds, real estate to smooth returns over decades." },
];

const relatedTools = [
  { title: "Loan Calculator", icon: "💰", href: "/en/tools/loan-calculator" },
  { title: "EMI Calculator", icon: "🧮", href: "/en/tools/emi-calculator" },
  { title: "Salary Calculator", icon: "💵", href: "/en/tools/salary-calculator" },
  { title: "Mortgage Calculator", icon: "🏠", href: "/en/tools/mortgage-calculator" },
  { title: "Profit Margin", icon: "📐", href: "/en/tools/profit-margin" },
  { title: "VAT Calculator", icon: "🏛️", href: "/en/tools/vat-calculator" },
];

const seoContent = [
  "Our Compound Interest Calculator shows how your money grows when earnings generate their own earnings. Enter principal, rate, time, and compounding frequency to see the exponential growth of your investments or the true cost of compounding debt.",
  "Example: $10,000 invested at 8% annual compounding. After 10 years: $21,589. After 20 years: $46,610. After 30 years: $100,627. Without compounding (simple interest): $34,000 after 30 years. The power of compounding adds over $66,000.",
  "Time is the most important factor. $5,000 invested at 8% from age 25 to 65 (40 years) = $108,622. Same $5,000 from 35 to 65 (30 years) = $50,313. The 10-year delay costs $58,309. Start investing early and let time work for you.",
  "Compounding frequency matters: $10K at 8% for 10 years: annual = $21,589, quarterly = $22,080, monthly = $22,196, daily = $22,253. Monthly compounding adds ~3% more than annual. Use our calculator to see the difference.",
  "Related: Pair with our Loan Calculator to compare borrowing vs investing. The Salary Calculator shows how much you could save. The EMI Calculator demonstrates the flip side — the cost of compounding debt. Use compound interest wisely.",
  "Albert Einstein reportedly called compound interest the 'eighth wonder of the world'. He who understands it earns it; he who doesn't pays it. Make compounding work for you (investing), not against you (credit card debt)."
];

export default function Client() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState<{ final: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal), r = parseFloat(rate) / 100, t = parseFloat(years), n = parseFloat(frequency);
    if (p <= 0 || r <= 0 || t <= 0 || n <= 0) return;
    const final = p * Math.pow(1 + r / n, n * t);
    setResult({ final, interest: final - p });
  };

  const schemaName = "Compound Interest Calculator";
const schemaDesc = `Online Compound Interest Calculator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/compound-interest";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Financial Calculators", url: "https://adwatak.cloud/en/category/calculators" },
  { name: "Compound Interest Calculator", url: "https://adwatak.cloud/en/tools/compound-interest" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb category="Financial Calculators" categorySlug="calculators" toolName="Compound Interest Calculator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📈 Compound Interest Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate the exponential growth of your investments</p>
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Principal ($)</label><input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="10000" /></div>
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Annual Rate (%)</label><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="8" /></div>
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Years</label><input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="10" /></div>
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Compounding Frequency</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
            <option value="1">Annually</option>
            <option value="2">Semi-Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Calculate</button>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">Final Amount</p>
            <p className="text-xl font-extrabold text-green-900">${fmt(result.final)}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-300">
            <p className="text-xs text-yellow-700 mb-1">Total Interest</p>
            <p className="text-xl font-extrabold text-yellow-900">${fmt(result.interest)}</p>
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
