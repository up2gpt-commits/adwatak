"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

function fmt(n: number) { return n.toLocaleString("en-US", { maximumFractionDigits: 0 }); }

const faqs = [
  { question: "What is an inheritance calculator?", answer: "An inheritance calculator estimates how an estate is distributed based on Islamic inheritance law (Ilm al-Fara'id). It considers the deceased's assets, debts, and eligible heirs (spouse, children, parents, siblings). Distribution follows Quranic shares (Surah An-Nisa 4:11-12)." },
  { question: "Who are the primary heirs in Islam?", answer: "Quranic heirs: spouse (husband gets 1/4 if no children, 1/8 if children; wife gets 1/4 if no children, 1/8 if children), children (son gets 2× daughter), parents (each gets 1/6 if children exist), siblings (variable shares). Shares are pre-determined, not discretionary." },
  { question: "Why do sons inherit double daughters?", answer: "Quran 4:11 — the male gets twice the female's share. Rationale: men are financially responsible for women in Islamic tradition (dowry, housing, maintenance). Many modern Muslim-majority countries still apply this. Some countries allow reforms." },
  { question: "Can I leave everything to one person?", answer: "Under Islamic law: no — mandatory heirs get fixed shares. A valid will can only distribute 1/3 of estate to non-heirs (charity, friends, etc.). The remaining 2/3 goes to Quranic heirs. Without a will, the estate follows court-appointed distribution." },
  { question: "What if there are no children?", answer: "Spouse gets a larger share. If husband dies without children: wife gets 1/4, remaining goes to parents/siblings. If wife dies without children: husband gets 1/2, remaining to her parents/siblings. Distribution varies by specific family composition." },
  { question: "What about debts and funeral expenses?", answer: "Before any distribution: (1) funeral expenses, (2) debts owed by deceased, (3) valid wills (up to 1/3 of estate), (4) the remainder is distributed to heirs. Debts take priority over inheritance — ensure all debts are paid first." },
  { question: "Do non-Muslim heirs inherit?", answer: "In Islamic law: a non-Muslim cannot inherit from a Muslim. Some Muslim-majority countries allow it under civil law. If the deceased has non-Muslim relatives, consult a local scholar or lawyer for your jurisdiction." },
  { question: "What about adopted children?", answer: "Adopted children (in the Western sense) do not inherit as children in Islamic law. However, they can receive up to 1/3 of the estate through a will (wasiyyah). Alternatively, make a lifetime gift. Islamic adoption maintains the child's original family name." },
  { question: "What if an heir dies before distribution?", answer: "The deceased heir's share passes to their own heirs. Example: a son dies before the estate is distributed; his children inherit his share. This is called 'representation' and is accepted in many Muslim countries." },
  { question: "Do I need a written will?", answer: "Yes — Islamic law recommends (some scholars say obligatory) writing a will. It ensures your wishes are followed, clarifies the 1/3 discretionary portion, appoints an executor, and reduces family disputes. A lawyer familiar with Islamic inheritance can draft it." },
  { question: "What happens without a will (intestate)?", answer: "The estate goes to probate court. For Muslims in non-Muslim countries: the state's laws apply, which may not follow Quranic distribution. In Muslim countries: the court applies Sharia inheritance law. Having a written will protects your Islamic distribution rights." },
  { question: "How do I plan my inheritance?", answer: "Calculate total assets (property, savings, investments, gold). Estimate debts and funeral costs. Distribute remaining: 1/3 in will (optional, non-heirs), 2/3 to Quranic heirs in fixed shares. Consult a scholar and a lawyer for your specific situation." },
];

const relatedTools = [
  { title: "Zakat Calculator", icon: "☪️", href: "/en/tools/zakat-calculator" },
  { title: "Gold Calculator", icon: "🥇", href: "/en/tools/gold-calculator" },
  { title: "Hijri Converter", icon: "🌙", href: "/en/tools/hijri-converter" },
  { title: "Loan Calculator", icon: "💰", href: "/en/tools/loan-calculator" },
  { title: "Mortgage Calculator", icon: "🏠", href: "/en/tools/mortgage-calculator" },
  { title: "VAT Calculator", icon: "🏛️", href: "/en/tools/vat-calculator" },
];

const seoContent = [
  "Our Inheritance Calculator helps you understand Islamic estate distribution according to Quranic shares (Surah An-Nisa). Enter family composition — spouse, children, parents, siblings — and estate value to see exactly how each heir receives their rightful share.",
  "Islamic inheritance (Ilm al-Fara'id) is one of the most detailed and precise areas of Islamic jurisprudence. Every family member's share is predetermined based on their relationship to the deceased. Our calculator implements the standard Hanafi school of thought.",
  "Example: Deceased man leaves $150,000 estate, wife, 3 children (2 sons, 1 daughter), both parents alive. Wife: 1/8 = $18,750. Father: 1/6 = $25,000. Mother: 1/6 = $25,000. Remaining $81,250: each son gets $32,500, daughter gets $16,250 (2:1 ratio).",
  "Before distribution: subtract funeral costs ($2,000-10,000), all debts (mortgage, credit cards, personal loans), and up to 1/3 for valid will (wasiyyah to non-heirs or charity). Only the remaining net estate is distributed to Quranic heirs.",
  "Related: Pair with our Zakat Calculator to ensure your estate planning accounts for religious obligations. The Gold Calculator helps value gold holdings in your estate. The Hijri Converter tracks important dates for estate documentation.",
  "Important: Our calculator provides educational estimates only. Islamic inheritance can involve complex scenarios (multiple wives, half-siblings, predeceased heirs, non-Muslim heirs, debts exceeding assets). Always consult a qualified Islamic scholar and a lawyer for your actual inheritance planning."
];

export default function InheritanceCalculator() {
  const [estate, setEstate] = useState("150000");
  const [wife, setWife] = useState<"0" | "1" | "2" | "3" | "4">("1");
  const [children, setChildren] = useState("2");
  const [daughters, setDaughters] = useState("1");
  const [hasParents, setHasParents] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const total = parseFloat(estate);
    if (total <= 0) return;
    const sons = parseInt(children) || 0;
    const girls = parseInt(daughters) || 0;
    const spouses = parseInt(wife);
    const remainAfter = (t: number, taken: number) => t - taken;
    let text = "";
    if (hasParents) {
      const wShare = spouses > 0 ? total / (spouses === 1 ? (sons + girls > 0 ? 8 : 4) : spouses > 1 ? (sons + girls > 0 ? 8 : 4) : 4) : 0;
      const pShare = (total - wShare) / 6;
      const after = remainAfter(total, wShare + pShare * 2);
      const totalKids = sons + girls;
      const boyShare = totalKids > 0 ? after / (sons * 2 + girls) : 0;
      text = `Wife${spouses > 1 ? "s" : ""}: $${fmt(wShare)} (${spouses > 1 ? `1/${spouses > 1 ? "8" : "8"}` : "1/8"})\nFather: $${fmt(pShare)} (1/6)\nMother: $${fmt(pShare)} (1/6)\nKids (${sons} sons × 2 + ${girls} daughters = ${sons * 2 + girls} shares × $${fmt(Math.round(boyShare))}/share):`;
      if (sons > 0) text += `\nEach son: $${fmt(boyShare * 2)}`;
      if (girls > 0) text += `\nEach daughter: $${fmt(boyShare)}`;
    } else {
      const wShare = spouses > 0 ? total / (spouses === 1 ? (sons + girls > 0 ? 8 : 4) : (sons + girls > 0 ? 8 : 4)) : 0;
      const after = remainAfter(total, wShare);
      const totalKids = sons + girls;
      const boyShare = totalKids > 0 ? after / (sons * 2 + girls) : 0;
      text = `Wife${spouses > 1 ? "s" : ""}: $${fmt(wShare)}\nKids:`;
      if (sons > 0) text += `\nEach son: $${fmt(boyShare * 2)}`;
      if (girls > 0) text += `\nEach daughter: $${fmt(boyShare)}`;
    }
    setResult(text);
  };

  const schemaName = "Inheritance Calculator";
const schemaDesc = `Online Inheritance Calculator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/inheritance-calculator";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Utility", url: "https://adwatak.cloud/en/tools/utility" },
  { name: "Inheritance Calculator", url: "https://adwatak.cloud/en/tools/inheritance-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Islamic Calculators" categorySlug="calculators" toolName="Inheritance Calculator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📜 Inheritance Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate Islamic inheritance distribution by Quranic shares</p>
        <p className="text-xs text-red-500 mb-4">⚠️ Educational estimate only — consult a scholar for actual distribution</p>
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Estate Value ($)</label><input type="number" value={estate} onChange={(e) => setEstate(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="150000" /></div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Wives</label>
          <select value={wife} onChange={(e) => setWife(e.target.value as any)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
            <option value="0">None</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Sons</label><input type="number" value={children} onChange={(e) => setChildren(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="2" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Daughters</label><input type="number" value={daughters} onChange={(e) => setDaughters(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1" /></div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" checked={hasParents} onChange={(e) => setHasParents(e.target.checked)} id="parents" className="w-4 h-4" />
          <label htmlFor="parents" className="text-sm">Include Parents (both alive)</label>
        </div>
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Calculate</button>
      </div>
      {result && (
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-6">
          <h3 className="font-bold text-lg mb-2">Distribution:</h3>
          <pre className="text-sm whitespace-pre-wrap font-sans">{result}</pre>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="en" />
    </div>
  );
}
