"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Gross margin vs net margin?", answer: "Gross margin only accounts for direct cost of goods. Net margin subtracts everything — overhead, marketing, taxes. A cafe might have 70% gross margin on coffee but only 10% net after rent and staff. Both matter for different decisions." },
  { question: "What's a good profit margin?", answer: "Depends on industry: restaurants 3-9%, software 15-25%, retail 2-5%, consulting 20-40%, manufacturing 5-15%. A 5% net margin is solid for grocery but terrible for consulting. Benchmark against your specific industry." },
  { question: "Markup vs margin — what's the difference?", answer: "Markup = profit / cost × 100. Margin = profit / price × 100. $60 cost, $100 price: markup = 66.7%, margin = 40%. If you want 40% margin, you must mark up by 66.7% — not 40%. This is the most common pricing mistake." },
  { question: "How do I calculate selling price from margin?", answer: "Selling Price = Cost ÷ (1 - Desired Margin). Example: cost = $60, desired margin = 40%. Price = $60 ÷ 0.6 = $100. If you want 50% margin: $60 ÷ 0.5 = $120. Always calculate margin this way, not by adding a percentage to cost." },
  { question: "How do I calculate cost from price and margin?", answer: "Cost = Price × (1 - Margin). Example: selling at $100, want 40% margin. Max cost = $100 × 0.6 = $60. If your cost is higher than $60, you can't achieve 40% margin at $100 price. Either raise price or lower costs." },
  { question: "What's a healthy profit margin for a startup?", answer: "For SaaS startups, 20-40% net margin at scale is excellent. Early stage: focus on 60-80% gross margins (common for SaaS). If gross margin is below 50%, your pricing model or cost structure needs serious review before scaling." },
  { question: "How do I calculate break-even point?", answer: "Break-Even = Fixed Costs ÷ Contribution Margin per Unit. Contribution Margin = Price - Variable Cost per Unit. Example: fixed costs $10,000, price $100, variable cost $60 → CM = $40 → BE = 250 units. Every sale after 250 = pure profit." },
  { question: "What's the difference between gross margin and contribution margin?", answer: "Gross margin = (Revenue - COGS) ÷ Revenue. Contribution margin = (Revenue - Variable Costs) ÷ Revenue. COGS is just the product cost. Contribution margin includes ALL variable costs (product + commissions + packaging + shipping). Contribution margin is more useful for pricing decisions." },
  { question: "Is a 50% profit margin good?", answer: "50% gross margin is excellent in most industries. But remember: from that 50%, you deduct rent 10%, salaries 15%, marketing 5%, utilities 2% → net profit ≈ 18% only. Gross margin is NOT net profit. Always think in terms of net margin for business health." },
  { question: "How can I improve my profit margin?", answer: "1) Negotiate with suppliers for lower costs. 2) Raise prices gradually. 3) Reduce inventory waste. 4) Sell higher-margin products alongside low-margin ones. 5) Bundle products instead of individual discounts. 6) Automate processes to cut operational costs. 7) Focus on repeat customers — they cost less to acquire." },
  { question: "Can profit margin be over 100%?", answer: "Profit margin (margin %) can NEVER exceed 100% because it's profit ÷ price. Profit can't be larger than the price. However, markup CAN exceed 100%. Example: cost $10, price $100 → margin = 90%, markup = 900%. Don't confuse the two!" },
  { question: "What's a good profit margin for e-commerce?", answer: "E-commerce averages 10-20% net margin. Top performers hit 25-40%. The challenge: ads (10-30% of revenue), shipping (5-15%), returns (5-20%), payment processing (2-3%). To net 15%, you need at least 45% gross margin. Use this calculator to work backwards from your desired net margin." },
];

const relatedTools = [
  { title: "VAT Calculator", icon: "🏛️", href: "/en/tools/vat-calculator" },
  { title: "Loan Calculator", icon: "💰", href: "/en/tools/loan-calculator" },
  { title: "Currency Converter", icon: "💱", href: "/en/tools/currency-converter" },
  { title: "Salary Calculator", icon: "💵", href: "/en/tools/salary-calculator" },
  { title: "Compound Interest", icon: "📊", href: "/en/tools/compound-interest" },
  { title: "Invoice Generator", icon: "🧾", href: "/en/tools/invoice-generator" },
];

const seoContent = [
  "The Profit Margin Calculator is an essential tool for business owners, entrepreneurs, and e-commerce sellers. Calculate profit margin, markup, selling price, or cost instantly — enter any two values and get the rest automatically.",
  "Understanding the difference between margin and markup is critical for pricing. Margin tells you what percentage of each sale is profit. Markup tells you how much you added on top of cost. Confusing the two is the most common pricing mistake in business.",
  "Example: You buy a product for $60 and sell for $100. Profit = $40. Margin = 40 ÷ 100 × 100 = 40%. Markup = 40 ÷ 60 × 100 = 66.7%. If you say 'add 40% to cost' — that's markup, and it only gives you 28.6% margin. Use this calculator to avoid the markup-vs-margin trap.",
  "Why does margin vary by industry? Grocery stores operate on 1-3% net margin because they sell high volume. Jewelry stores work on 20-40% because sales are infrequent. Software companies reach 20-40% because marginal costs are near zero. Knowing your industry standard helps you set realistic targets.",
  "This profit margin calculator supports three methods: (A) From Cost and Selling Price → get margin and markup. (B) From Cost and Desired Margin → get the selling price. (C) From Selling Price and Desired Margin → get the maximum allowable cost. Perfect for pricing products and managing costs.",
  "Pro tip: Don't confuse gross margin with net profit. Gross margin only deducts product cost. Net profit deducts everything: rent, salaries, marketing, utilities, maintenance. Use this calculator for initial pricing, then factor in all other costs for true net profit.",
];

interface Scenario { name: string; cost: number; price: number; margin: number; markup: number; profit: number }

export default function Client() {
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [margin, setMargin] = useState("");
  const [result, setResult] = useState<{
    margin: number; markup: number; profit: number; price: number; cost: number
  } | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [showWhatIf, setShowWhatIf] = useState(false);

  const calculate = () => {
    const c = parseFloat(cost);
    const p = parseFloat(price);
    const m = parseFloat(margin);
    if (c > 0 && p > 0) {
      const res = { margin: ((p - c) / p * 100), markup: ((p - c) / c * 100), profit: p - c, price: p, cost: c };
      setResult(res);
      return;
    }
    if (c > 0 && m > 0 && m < 100) {
      const calcPrice = c / (1 - m / 100);
      setResult({ margin: m, markup: (calcPrice - c) / c * 100, profit: calcPrice - c, price: calcPrice, cost: c });
      return;
    }
    if (p > 0 && m > 0 && m < 100) {
      const calcCost = p * (1 - m / 100);
      setResult({ margin: m, markup: (p - calcCost) / calcCost * 100, profit: p - calcCost, price: p, cost: calcCost });
    }
  };

  const saveScenario = () => {
    if (!result) return;
    const count = scenarios.length;
    const label = `Product ${count + 1}`;
    setScenarios([...scenarios, { name: label, ...result }]);
  };

  const removeScenario = (idx: number) => {
    setScenarios(scenarios.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    setScenarios([]);
  };

  const whatIfData = result ? [-20, -15, -10, -5, 0, 5, 10, 15, 20].map(pct => {
    const newPrice = result.price * (1 + pct / 100);
    const newProfit = newPrice - result.cost;
    return { change: pct, price: newPrice, profit: newProfit, margin: (newProfit / newPrice * 100), markup: (newProfit / result.cost * 100) };
  }) : [];

  const inputStyle = "w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";
  const cardStyle = "bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6 mb-5";
  const gradientBtn = "bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold p-3.5 rounded-xl border-none text-lg w-full cursor-pointer hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]";
  const resultCardStyle = "bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-xl p-5 text-center border border-white/40 shadow-sm";

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Profit Margin Calculator", "Online Profit Margin Calculator - free tool", "https://adwatak.cloud/en/tools/profit-margin", "en", "Utility")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{ name: "Home", url: "https://adwatak.cloud/en" }, { name: "Financial Calculators", url: "https://adwatak.cloud/en/category/calculators" }, { name: "Profit Margin Calculator", url: "https://adwatak.cloud/en/tools/profit-margin" }])} />
      <StructuredData data={howToSchema("How to use the Profit Margin Calculator", "Free online tool. Works directly in your browser. No registration required.", [{ name: "Open the tool", text: "Navigate to the Profit Margin Calculator on Adwatak" }, { name: "Enter your data", text: "Fill in cost, price, or desired margin (any 2 values)" }, { name: "Click Calculate", text: "Press the calculate button to get results instantly" }, { name: "Save scenarios", text: "Compare multiple products using the Scenario feature" }], "less than a minute", "en")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="en" category="Financial Calculators" categorySlug="calculators" toolName="Profit Margin Calculator" />

      {/* Main Calculator Card */}
      <div className={cardStyle}>
        <h1 className="text-2xl font-extrabold mb-1">📈 Profit Margin Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate profit margin, markup, selling price, or max cost — enter any 2 values</p>

        {[
          { label: "Cost ($)", value: cost, set: setCost, placeholder: "60", step: "any" },
          { label: "Selling Price ($) — optional", value: price, set: setPrice, placeholder: "100", step: "any" },
          { label: "Desired Margin (%) — optional", value: margin, set: setMargin, placeholder: "40", step: "any" },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <label className={labelStyle}>{f.label}</label>
            <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)}
              step={f.step} className={inputStyle} placeholder={f.placeholder} />
          </div>
        ))}

        <p className="text-xs text-gray-400 mb-3">Enter any 2 values — the rest will be calculated automatically</p>
        <button onClick={calculate} className={gradientBtn}>
          <span className="inline-flex items-center gap-2">🧮 Calculate</span>
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className={resultCardStyle}>
              <p className="text-xs text-indigo-500 mb-1 font-medium">Profit Margin</p>
              <p className="text-2xl font-extrabold text-indigo-600">{result.margin.toFixed(2)}%</p>
            </div>
            <div className={resultCardStyle}>
              <p className="text-xs text-emerald-500 mb-1 font-medium">Markup</p>
              <p className="text-2xl font-extrabold text-emerald-600">{result.markup.toFixed(2)}%</p>
            </div>
            <div className={resultCardStyle}>
              <p className="text-xs text-amber-500 mb-1 font-medium">Net Profit</p>
              <p className="text-2xl font-extrabold text-amber-600">${result.profit.toFixed(2)}</p>
            </div>
          </div>

          {/* Visual Stacked Bar Chart */}
          <div className={cardStyle}>
            <h3 className="text-sm font-bold text-gray-700 mb-3">📊 Cost vs Profit Breakdown</h3>
            {(() => {
              const total = result.cost + result.profit;
              const costPct = (result.cost / total * 100);
              const profitPct = (result.profit / total * 100);
              return (
                <>
                  <div className="h-10 rounded-xl overflow-hidden flex mb-2 shadow-inner">
                    <div className="bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-gray-700 transition-all duration-300"
                      style={{ width: `${costPct}%` }}>
                      {costPct >= 12 ? `Cost ${costPct.toFixed(1)}%` : ""}
                    </div>
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
                      style={{ width: `${profitPct}%` }}>
                      {profitPct >= 12 ? `Profit ${profitPct.toFixed(1)}%` : ""}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>🔵 Cost: ${result.cost.toFixed(2)}</span>
                    <span>🟢 Profit: ${result.profit.toFixed(2)}</span>
                    <span>💰 Total: ${total.toFixed(2)}</span>
                  </div>
                </>
              );
            })()}
          </div>

          {/* What-If Analysis */}
          <div className={cardStyle}>
            <button onClick={() => setShowWhatIf(!showWhatIf)}
              className="flex items-center justify-between w-full">
              <h3 className="text-sm font-bold text-gray-700">🔮 What-If Analysis — Price Sensitivity</h3>
              <span className={`text-gray-400 text-lg transition-transform ${showWhatIf ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {showWhatIf && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Price Δ</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Price</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Profit</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Margin</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Markup</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whatIfData.map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 hover:bg-indigo-50/50 transition-colors ${row.change === 0 ? 'bg-indigo-50 font-bold' : ''}`}>
                        <td className={`p-2.5 ${row.change > 0 ? 'text-emerald-600' : row.change < 0 ? 'text-red-500' : 'text-indigo-600'}`}>
                          {row.change > 0 ? `+${row.change}%` : `${row.change}%`}
                        </td>
                        <td className="p-2.5">${row.price.toFixed(2)}</td>
                        <td className="p-2.5">${row.profit.toFixed(2)}</td>
                        <td className="p-2.5">{row.margin.toFixed(2)}%</td>
                        <td className="p-2.5">{row.markup.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-3">Bold row = current price. See how price changes affect your margin at different levels.</p>
              </div>
            )}
          </div>

          {/* Scenario Comparison */}
          <div className={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-700">📋 Scenario Comparison</h3>
              <div className="flex gap-2">
                {scenarios.length > 0 && (
                  <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">Clear All</button>
                )}
                <button onClick={saveScenario} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">+ Save Current</button>
              </div>
            </div>
            {scenarios.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">Click "Save Current" to compare different products or pricing scenarios side by side</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Scenario</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Cost</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Price</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Margin</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Profit</th>
                      <th className="p-2.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((s, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-2.5 font-medium">{s.name}</td>
                        <td className="p-2.5">${s.cost.toFixed(2)}</td>
                        <td className="p-2.5">${s.price.toFixed(2)}</td>
                        <td className="p-2.5">
                          <span className={`${s.margin >= 20 ? 'text-emerald-600' : s.margin >= 10 ? 'text-amber-600' : 'text-red-500'} font-semibold`}>
                            {s.margin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="p-2.5">${s.profit.toFixed(2)}</td>
                        <td className="p-2.5">
                          <button onClick={() => removeScenario(i)} className="text-red-400 hover:text-red-600 transition-colors text-xs">✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
