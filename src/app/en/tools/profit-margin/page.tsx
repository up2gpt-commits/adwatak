"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Gross margin vs net margin?", answer: "Gross margin only accounts for direct cost of goods. Net margin subtracts everything — overhead, marketing, taxes. A cafe might have 70% gross margin on coffee but only 10% net after rent and staff. Both matter for different decisions." },
  { question: "What's a good profit margin?", answer: "Depends on industry: restaurants 3-9%, software 15-25%, retail 2-5%, consulting 20-40%, manufacturing 5-15%. A 5% net margin is solid for grocery but terrible for consulting. Benchmark against your specific industry." },
  { question: "Markup vs margin — what's the difference?", answer: "Markup = profit / cost × 100. Margin = profit / price × 100. $60 cost, $100 price: markup = 66.7%, margin = 40%. If you want 40% margin, you must mark up by 66.7% — not 40%. This is the most common pricing mistake." },
  { question: "How do I calculate selling price from margin?", answer: "Selling Price = Cost ÷ (1 - Desired Margin). Example: cost = $60, desired margin = 40%. Price = $60 ÷ 0.6 = $100. If you want 50% margin: $60 ÷ 0.5 = $120. Always calculate margin this way, not by adding a percentage to cost." },
  { question: "How do I calculate cost from price and margin?", answer: "Cost = Price × (1 - Margin). Example: selling at $100, want 40% margin. Max cost = $100 × 0.6 = $60. If your cost is higher than $60, you can't achieve 40% margin at $100 price. Either raise price or lower costs." },
  { question: "What's a healthy profit margin for a startup?", answer: "First year: breaking even is a win. Year 2-3: aim for 5-10% net margin. Year 4+: 10-20% is healthy. SaaS startups target 20-30% net margin. Ecommerce startups often run at 0-5% and scale volume." },
  { question: "How do I improve profit margins?", answer: "Raise prices (most powerful lever — 1% price increase = 10% profit increase at 10% margin), reduce COGS (negotiate with suppliers, bulk buying), cut waste (inventory, labor, energy), and upsell higher-margin products." },
  { question: "What is contribution margin?", answer: "Contribution margin = Price - Variable Costs. It shows how much each sale contributes to fixed costs and profit. If you sell at $100 with $40 variable costs, contribution margin = $60. This $60 pays for rent, salaries, then becomes profit." },
  { question: "Net profit vs operating profit?", answer: "Operating profit = Revenue - COGS - Operating expenses (rent, salaries, marketing). Net profit = Operating profit - taxes - interest. Operating profit shows business health. Net profit shows what owners actually keep." },
  { question: "Can margin be over 100%?", answer: "Margin (based on price) cannot exceed 100%. Markup (based on cost) can exceed 100%. If cost is $1 and price is $10: margin = 90%, markup = 900%. Margin is capped at 100% because price always exceeds profit." },
  { question: "Industry benchmark: what margin should I target?", answer: "Software/SaaS: 60-80% gross, 15-25% net. Retail: 25-50% gross, 2-5% net. Restaurants: 60-70% gross, 3-9% net. Manufacturing: 30-50% gross, 5-15% net. Services: 80-90% gross, 15-30% net." },
  { question: "What's the difference between markup and margin in retail?", answer: "Retailers often use markup (keystone = 100% markup = 50% margin). $50 cost × 2 = $100 retail. Margin = $50/$100 = 50%. If a retailer says '50% off', they're at 0% margin. Understand both to price correctly." },
];

const relatedTools = [
  { title: "VAT Calculator", icon: "🏛️", href: "/en/tools/vat-calculator" },
  { title: "Invoice Generator", icon: "🧾", href: "/en/tools/invoice-generator" },
  { title: "Currency Converter", icon: "💱", href: "/en/tools/currency-converter" },
  { title: "Loan Calculator", icon: "💰", href: "/en/tools/loan-calculator" },
  { title: "EMI Calculator", icon: "🧮", href: "/en/tools/emi-calculator" },
  { title: "Installment Calculator", icon: "📊", href: "/en/tools/installment-calculator" },
];

const seoContent = [
  "A profit margin calculator helps you determine the true profitability of your products. Enter cost and selling price to get margin percentage, markup percentage, and profit amount. Or enter cost + desired margin to calculate the right selling price.",
  "The most common pricing mistake is confusing markup with margin. If you want 40% profit margin, you cannot just add 40% to your cost. $60 cost + 40% = $84 price = only 28.6% margin, not 40%. Use our calculator to get it right every time.",
  "Example: You buy a product for $80 and sell it for $100. Profit = $20. Margin = 20/100 = 20%. Markup = 20/80 = 25%. If you want 30% margin, price = $80/0.7 = $114.29. Run different scenarios before setting your final prices.",
  "Profit margin analysis helps you decide which products to push, which to discount, and which to discontinue. A product with 5% margin needs 4× the volume of a 20% margin product to generate the same profit. Focus marketing on high-margin items.",
  "Related: Use our VAT Calculator to add taxes to your margins. The Invoice Generator creates professional invoices with your calculated prices. Our Currency Converter helps if you source products internationally.",
  "Business tip: Track gross margin by product category monthly. If margins are shrinking, investigate — rising costs, price pressure from competitors, or product mix shift. A 1% margin improvement at 10% net margin = 10% profit increase."
];

export default function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");
  const [result, setResult] = useState<{ profit: number; margin: number; markup: number } | null>(null);

  const calculate = () => {
    const rev = parseFloat(revenue), co = parseFloat(cost);
    if (rev <= 0 || co < 0 || co > rev) return;
    const profit = rev - co;
    setResult({ profit, margin: (profit / rev) * 100, markup: co > 0 ? (profit / co) * 100 : 0 });
  };

  const schemaName = "Profit Margin Calculator";
const schemaDesc = `Online Profit Margin Calculator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/profit-margin";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Utility", url: "https://adwatak.cloud/en/tools/utility" },
  { name: "Profit Margin Calculator", url: "https://adwatak.cloud/en/tools/profit-margin" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Financial Calculators" categorySlug="calculators" toolName="Profit Margin Calculator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📐 Profit Margin Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate profit margin, markup, and net profit</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Revenue ($)</label><input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="100" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Cost ($)</label><input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="60" /></div>
        </div>
        <p className="text-xs text-gray-400 mb-2">Cost must be less than revenue</p>
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Calculate</button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">Profit Margin</p>
            <p className="text-xl font-extrabold text-blue-900">{result.margin.toFixed(1)}%</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">Markup</p>
            <p className="text-xl font-extrabold text-green-900">{result.markup.toFixed(1)}%</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-300">
            <p className="text-xs text-yellow-700 mb-1">Profit</p>
            <p className="text-xl font-extrabold text-yellow-900">${result.profit.toFixed(2)}</p>
          </div>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
