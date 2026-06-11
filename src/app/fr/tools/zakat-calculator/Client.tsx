"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

function fmt(n: number) { return n.toLocaleString("en-US", { maximumFractionDigits: 2 }); }

const faqs = [
  { question: "What is Zakat?", answer: "Zakat is the third pillar of Islam — an obligatory charity of 2.5% of wealth held for one lunar year. It applies to cash, gold, silver, investments, business inventory, and rental income above the Nisab threshold." },
  { question: "What is Nisab?", answer: "The minimum wealth threshold before Zakat is due. Nisab = value of 85g of gold or 595g of silver (use the lower silver value to include更多人). In 2024: roughly $5,000-6,000 (85g gold) or $500-600 (595g silver). Most scholars recommend the silver Nisab." },
  { question: "What wealth is Zakat-eligible?", answer: "Cash (bank accounts, savings), gold and silver (including jewelry by most scholars), stocks and investments, business inventory (not fixed assets), rental income, cryptocurrency (growing consensus), loans you expect to be repaid." },
  { question: "What wealth is exempt from Zakat?", answer: "Primary residence, personal car, business equipment, household furniture, debts owed to others, salary before you receive it, retirement accounts (401k/IRA — unvested or inaccessible portions). Contested by some scholars." },
  { question: "When is Zakat due?", answer: "After one lunar year (355 days) of holding wealth above Nisab. Choose a fixed date (e.g., Ramadan 1st) to simplify calculation. Pay at any time during the year. Many pay in Ramadan for multiplied rewards." },
  { question: "Who receives Zakat?", answer: "Eight categories from Quran 9:60: the poor, the needy, Zakat administrators, those whose hearts are to be reconciled, slaves/captives, those in debt, for Allah's cause (fi sabilillah), and the stranded traveler." },
  { question: "Can Zakat be paid in advance?", answer: "Yes, you can pay Zakat before the year ends if you're sure wealth will stay above Nisab. Some scholars allow paying months in advance. Calculate at year-end and pay immediately — don't delay." },
  { question: "Zakat on gold jewelry?", answer: "Most scholars: gold jewelry is Zakat-eligible at 2.5%. Some (Hanafi): jewelry for permissible use is exempt. To be safe, calculate Zakat on jewelry value. Check with your scholar for their ruling." },
  { question: "Zakat on stocks?", answer: "Two methods: (1) 2.5% of total stock value (easier, conservative). (2) Zakat only on the portion representing company assets (cash + inventory + receivables). For index funds: method 1 is simpler. For individual stocks: method 2 is more accurate." },
  { question: "Zakat on rental income?", answer: "Zakat is 2.5% of the net rental income received during the year (after expenses, mortgage payments). Not the property value itself. If rent = $24,000/year, expenses = $8,000, net = $16,000, Zakat = $400." },
  { question: "Can Zakat be given to family?", answer: "Yes, to eligible relatives whom you're not financially obligated to support: siblings, cousins, aunts, uncles, in-laws. Not to parents, children, or spouse (you must support them anyway). Intention matters — give as Zakat, not a gift." },
  { question: "Can Zakat be given to non-Muslims?", answer: "According to Abu Hanifa and many contemporary scholars: Zakat can be given to poor non-Muslims, especially those in need. This builds community relations. Most scholars agree it can be given to 'those whose hearts are to be reconciled.'" },
];

const relatedTools = [
  { title: "Gold Calculator", icon: "🥇", href: "/fr/tools/gold-calculator" },
  { title: "Inheritance Calculator", icon: "📜", href: "/fr/tools/inheritance-calculator" },
  { title: "Hijri Converter", icon: "🌙", href: "/fr/tools/hijri-converter" },
  { title: "Prayer Times", icon: "🕌", href: "/fr/tools/prayer-times" },
  { title: "Compound Interest", icon: "📈", href: "/fr/tools/compound-interest" },
  { title: "Profit Margin", icon: "📐", href: "/fr/tools/profit-margin" },
];

const seoContent = [
  "Our Zakat Calculator helps Muslims calculate their annual Zakat obligation accurately. Enter your cash savings, gold/silver value, investments, and business inventory. The calculator automatically checks Nisab threshold and calculates 2.5% of Zakat-eligible wealth.",
  "Example: $15,000 in savings, $5,000 in gold, $10,000 in stocks, $3,000 business inventory. Total Zakatable wealth = $33,000. Above Nisab ($500-6,000 depending on calculation). Zakat = $33,000 × 2.5% = $825. Due annually.",
  "Calculation steps: (1) Determine your Zakat date (same day each lunar year). (2) List all Zakatable assets: cash, gold, silver, stocks, business inventory, rental income, cryptocurrency. (3) Subtract immediate debts and expenses. (4) Check if remaining exceeds Nisab. (5) Pay 2.5%.",
  "Gold Nisab: 85g × current gold price per gram. Silver Nisab: 595g × current silver price. Using silver Nisab ($500-600) includes more wealth and is recommended by many scholars. Check current gold/silver prices in our Gold Calculator.",
  "Related: Use our Gold Calculator to get accurate gold value for Zakat. The Inheritance Calculator helps with Islamic estate planning. The Hijri Converter tracks the lunar year for your Zakat anniversary date.",
  "Tip: Maintain a Zakat spreadsheet throughout the year. Record major changes in wealth quarterly. When Zakat month arrives, calculations take 10 minutes. Donating in Ramadan multiplies rewards. Use our calculator to ensure accuracy — incorrect Zakat is not accepted."
];

export default function Client() {
  const [cash, setCash] = useState("15000");
  const [gold, setGold] = useState("5000");
  const [stocks, setStocks] = useState("10000");
  const [business, setBusiness] = useState("3000");
  const [result, setResult] = useState<{ total: number; nisabCheck: string; zakat: number } | null>(null);

  const calculate = () => {
    const total = [cash, gold, stocks, business].reduce((s, v) => s + (parseFloat(v) || 0), 0);
    const nisab = 500; // using silver nisab
    setResult({ total, nisabCheck: total >= nisab ? "Above Nisab" : "Below Nisab", zakat: total >= nisab ? total * 0.025 : 0 });
  };

  const schemaName = "Calculateur de Zakat";
const schemaDesc = `Online Zakat Calculator - outil gratuit`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/fr/tools/zakat-calculator";
const breadcrumbItems = [
  { name: "Accueil", url: "https://adwatak.cloud/fr" },
  { name: "Islamique", url: "https://adwatak.cloud/fr/category/calculators" },
  { name: "Calculateur de Zakat", url: "https://adwatak.cloud/fr/tools/zakat-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'fr', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Comment utiliser cet outil", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [{name:"Ouvrir l'outil",text:"Navigate to this tool page on Adawatak"},{name:"Entrez vos données",text:"Remplissez les champs requis"},{name:"Obtenez les résultats",text:"Cliquez sur le bouton Calculer ou Générer"},{name:"Utilisez ou partagez",text:"Copiez, téléchargez ou partagez les résultats"}],"moins d'une minute","fr")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />

      <Breadcrumb category="Outils Islamiques" categorySlug="calculators" toolName="Zakat Calculator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">☪️ Zakat Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate your annual Zakat obligation accurately</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Cash & Savings ($)</label><input type="number" value={cash} onChange={(e) => setCash(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="15000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Gold & Silver ($)</label><input type="number" value={gold} onChange={(e) => setGold(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="5000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Stocks & Investments ($)</label><input type="number" value={stocks} onChange={(e) => setStocks(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="10000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Inventory ($)</label><input type="number" value={business} onChange={(e) => setBusiness(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="3000" /></div>
        </div>
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Calculer la Zakat</button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200"><p className="text-xs text-blue-600 mb-1">Total Wealth</p><p className="text-xl font-extrabold text-blue-900">${fmt(result.total)}</p></div>
          <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-300"><p className="text-xs text-yellow-700 mb-1">Status</p><p className="text-xl font-extrabold text-yellow-900">{result.nisabCheck}</p></div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200"><p className="text-xs text-green-600 mb-1">Zakat Due (2.5%)</p><p className="text-xl font-extrabold text-green-900">${fmt(result.zakat)}</p></div>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="fr" />
    </div>
  );
}
