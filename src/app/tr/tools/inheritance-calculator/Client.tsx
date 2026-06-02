"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import { getDefaultHeirs, calculateInheritance, HeirSelection } from "../../../lib/inheritance";

const faqs = [
  { question: "What is an inheritance calculator?", answer: "An inheritance calculator estimates how an estate is distributed based on Islamic inheritance law (Ilm al-Fara'id). It considers the deceased's assets, debts, and eligible heirs (spouse, children, parents, siblings). Distribution follows Quranic shares (Surah An-Nisa 4:11-12)." },
  { question: "Who are the primary heirs in Islam?", answer: "Quranic heirs: spouse (husband gets 1/4 if no children, 1/8 if children; wife gets 1/4 if no children, 1/8 if children), children (son gets 2× daughter), parents (each gets 1/6 if children exist), siblings (variable shares). Shares are pre-determined, not discretionary." },
  { question: "Why do sons inherit double daughters?", answer: "Quran 4:11 — the male gets twice the female's share. Rationale: men are financially responsible for women in Islamic tradition (dowry, housing, maintenance). Many modern Muslim-majority countries still apply this." },
  { question: "Can I leave everything to one person?", answer: "Under Islamic law: no — mandatory heirs get fixed shares. A valid will can only distribute 1/3 of estate to non-heirs (charity, friends, etc.). The remaining 2/3 goes to Quranic heirs. Without a will, the estate follows court-appointed distribution." },
  { question: "What if there are no children?", answer: "Spouse gets a larger share. If husband dies without children: wife gets 1/4, remaining goes to parents/siblings. If wife dies without children: husband gets 1/2, remaining to her parents/siblings." },
  { question: "What about debts and funeral expenses?", answer: "Before any distribution: (1) funeral expenses, (2) debts owed by deceased, (3) valid wills (up to 1/3 of estate), (4) the remainder is distributed to heirs. Debts take priority over inheritance." },
  { question: "Do non-Muslim heirs inherit?", answer: "In Islamic law: a non-Muslim cannot inherit from a Muslim. Some Muslim-majority countries allow it under civil law. If the deceased has non-Muslim relatives, consult a local scholar or lawyer for your jurisdiction." },
  { question: "What about adopted children?", answer: "Adopted children do not inherit as children in Islamic law. However, they can receive up to 1/3 of the estate through a will (wasiyyah). Alternatively, make a lifetime gift." },
  { question: "What if an heir dies before distribution?", answer: "The deceased heir's share passes to their own heirs. Example: a son dies before the estate is distributed; his children inherit his share. This is called 'representation' in many Muslim countries." },
  { question: "Do I need a written will?", answer: "Yes — Islamic law recommends writing a will. It ensures your wishes are followed, clarifies the 1/3 discretionary portion, appoints an executor, and reduces family disputes." },
  { question: "What happens without a will (intestate)?", answer: "The estate goes to probate court. For Muslims in non-Muslim countries: the state's laws apply, which may not follow Quranic distribution. Having a written will protects your Islamic distribution rights." },
  { question: "How do I plan my inheritance?", answer: "Calculate total assets (property, savings, investments, gold). Estimate debts and funeral costs. Distribute remaining: 1/3 in will (optional, non-heirs), 2/3 to Quranic heirs in fixed shares." },
];

const relatedTools = [
  { title: "Zakat Calculator", icon: "🕌", href: "/en/tools/zakat-calculator" },
  { title: "Gold Calculator", icon: "🥇", href: "/en/tools/gold-calculator" },
  { title: "Hijri Converter", icon: "🌙", href: "/en/tools/hijri-converter" },
  { title: "Qibla Direction", icon: "🧭", href: "/en/tools/qibla-direction" },
  { title: "Prayer Times", icon: "🕐", href: "/en/tools/prayer-times" },
];

const seoContent = [
  "Islamic inheritance calculator — select the living heirs, enter the estate value, and calculate each heir's share according to Sharia law. Based on Quranic verses from Surah An-Nisa.",
  "Islamic inheritance law (Ilm al-Fara'id) determines fixed shares for each heir. The process: (1) funeral expenses, (2) debt repayment, (3) will execution (max 1/3), (4) distribution of remainder to Quranic heirs.",
  "Primary Quranic heirs include: husband, wife, sons, daughters, father, mother, grandfather, grandmother, full siblings, paternal siblings, and maternal siblings. Each has a specific share that varies based on other living heirs.",
];

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });

export default function Client() {
  const [h, setH] = useState<HeirSelection>(getDefaultHeirs());
  const [amount, setAmount] = useState("500000");
  const [results, setResults] = useState<ReturnType<typeof calculateInheritance> | null>(null);

  const toggle = (key: keyof HeirSelection) => {
    setH(prev => ({ ...prev, [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key] }));
  };

  const setNum = (key: "sons" | "daughters" | "fullBrothers" | "fullSisters" | "paternalBrothers" | "paternalSisters" | "maternalBrothers" | "maternalSisters" | "wifeCount", val: number) => {
    setH(prev => ({ ...prev, [key]: Math.max(0, Math.min(20, val || 0)) }));
  };

  const calc = () => {
    const estate = parseFloat(amount) || 0;
    setResults(calculateInheritance(h, estate));
  };

  const hasResults = results && results.length > 0;
  const totalPct = results ? results.reduce((s, r) => s + r.percentage, 0) : 0;
  const totalAmt = results ? results.reduce((s, r) => s + r.amount, 0) : 0;

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Islamic Inheritance Calculator", "Islamic Inheritance Calculator - free Sharia-compliant tool", "https://adwatak.cloud/en/tools/inheritance-calculator", "en", "Utility")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{ name: "Home", url: "https://adwatak.cloud/en" }, { name: "Islamic Tools", url: "https://adwatak.cloud/en/category/islamic" }, { name: "Inheritance Calculator", url: "https://adwatak.cloud/en/tools/inheritance-calculator" }])} />
      <Breadcrumb lang="en" category="Islamic Tools" categorySlug="islamic" toolName="Inheritance Calculator" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📜 Islamic Inheritance Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate Sharia-compliant inheritance shares. Select living heirs and enter the estate value.</p>

        <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 mb-6">
          <p className="text-sm text-emerald-800 leading-relaxed">
            This calculator follows Quranic inheritance laws from Surah An-Nisa. Shares for each heir are calculated automatically based on the selected heirs. Always consult a scholar for complex cases.
          </p>
        </div>

        {/* Estate Amount */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-1.5">💰 Total Estate (after debts & will)</label>
          <div className="flex gap-3">
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none focus:border-emerald-500 transition-colors" placeholder="500000" />
            <span className="flex items-center text-sm text-gray-500 font-semibold shrink-0">SAR</span>
          </div>
        </div>

        {/* Heir Selection */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-700 mb-3">👥 Select Living Heirs:</h2>

          {/* Spouses */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${h.husband ? "border-blue-400 bg-blue-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.husband} onChange={() => toggle("husband")} className="w-5 h-5 accent-blue-600" />
              <span><span className="text-lg">👨</span> Husband</span>
            </label>
            <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${h.wife ? "border-pink-400 bg-pink-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.wife} onChange={() => toggle("wife")} className="w-5 h-5 accent-pink-600" />
              <span><span className="text-lg">👩</span> Wife</span>
            </label>
          </div>
          {h.wife && (
            <div className="mb-4 ml-4">
              <label className="text-xs text-gray-500">Number of wives:</label>
              <input type="number" min="1" max="4" value={h.wifeCount} onChange={(e) => setNum("wifeCount", parseInt(e.target.value) || 1)}
                className="w-20 p-2 ml-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" />
            </div>
          )}

          {/* Parents */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${h.father ? "border-emerald-400 bg-emerald-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.father} onChange={() => toggle("father")} className="w-5 h-5 accent-emerald-600" />
              <span><span className="text-lg">👨‍🦳</span> Father</span>
            </label>
            <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${h.mother ? "border-amber-400 bg-amber-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.mother} onChange={() => toggle("mother")} className="w-5 h-5 accent-amber-600" />
              <span><span className="text-lg">👩‍🦳</span> Mother</span>
            </label>
          </div>

          {/* Children */}
          <div className="p-4 bg-gray-50 rounded-xl mb-4">
            <p className="text-xs font-bold text-gray-600 mb-2">👶 Children</p>
            <div className="flex gap-4">
              <div><label className="text-xs text-gray-400 block mb-1">Sons</label>
                <input type="number" min="0" max="20" value={h.sons} onChange={(e) => setNum("sons", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
              <div><label className="text-xs text-gray-400 block mb-1">Daughters</label>
                <input type="number" min="0" max="20" value={h.daughters} onChange={(e) => setNum("daughters", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
            </div>
          </div>

          {/* Grandparents */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${h.grandfather ? "border-emerald-300 bg-emerald-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.grandfather} onChange={() => toggle("grandfather")} className="w-4 h-4 accent-emerald-600" />
              <span>Grandfather</span>
            </label>
            <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${h.grandmotherPaternal ? "border-amber-300 bg-amber-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.grandmotherPaternal} onChange={() => toggle("grandmotherPaternal")} className="w-4 h-4 accent-amber-600" />
              <span>Grandmother (P)</span>
            </label>
            <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${h.grandmotherMaternal ? "border-amber-300 bg-amber-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.grandmotherMaternal} onChange={() => toggle("grandmotherMaternal")} className="w-4 h-4 accent-amber-600" />
              <span>Grandmother (M)</span>
            </label>
          </div>

          {/* Full Siblings */}
          <div className="p-4 bg-gray-50 rounded-xl mb-4">
            <p className="text-xs font-bold text-gray-600 mb-2">🧑‍🤝‍🧑 Full Siblings</p>
            <div className="flex gap-4">
              <div><label className="text-xs text-gray-400 block mb-1">Brothers</label>
                <input type="number" min="0" max="20" value={h.fullBrothers} onChange={(e) => setNum("fullBrothers", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
              <div><label className="text-xs text-gray-400 block mb-1">Sisters</label>
                <input type="number" min="0" max="20" value={h.fullSisters} onChange={(e) => setNum("fullSisters", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
            </div>
          </div>

          {/* Paternal Siblings */}
          <div className="p-4 bg-gray-50 rounded-xl mb-4">
            <p className="text-xs font-bold text-gray-600 mb-2">👥 Paternal Siblings (same father)</p>
            <div className="flex gap-4">
              <div><label className="text-xs text-gray-400 block mb-1">Brothers</label>
                <input type="number" min="0" max="20" value={h.paternalBrothers} onChange={(e) => setNum("paternalBrothers", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
              <div><label className="text-xs text-gray-400 block mb-1">Sisters</label>
                <input type="number" min="0" max="20" value={h.paternalSisters} onChange={(e) => setNum("paternalSisters", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
            </div>
          </div>

          {/* Maternal Siblings */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs font-bold text-gray-600 mb-2">👥 Maternal Siblings (same mother)</p>
            <div className="flex gap-4">
              <div><label className="text-xs text-gray-400 block mb-1">Brothers</label>
                <input type="number" min="0" max="20" value={h.maternalBrothers} onChange={(e) => setNum("maternalBrothers", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
              <div><label className="text-xs text-gray-400 block mb-1">Sisters</label>
                <input type="number" min="0" max="20" value={h.maternalSisters} onChange={(e) => setNum("maternalSisters", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
            </div>
          </div>
        </div>

        <button onClick={calc}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold p-4 rounded-xl text-lg hover:shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all cursor-pointer border-none">
          📊 Calculate Sharia Shares
        </button>
      </div>

      {/* Results */}
      {hasResults && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <h2 className="text-lg font-extrabold text-gray-900 mb-1">📊 Inheritance Distribution</h2>
          <p className="text-xs text-gray-400 mb-5">Sharia-compliant shares based on selected living heirs</p>

          <div className="flex flex-col gap-3">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${r.color}08`, borderLeft: `4px solid ${r.color}` }}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{r.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{r.nameEn}</p>
                    <p className="text-xs text-gray-400">{r.percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold" style={{ color: r.color }}>{fmt(r.amount)} SAR</p>
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(1, r.percentage)}%`, background: r.color }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-200 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Total Distributed</p>
              <p className="text-lg font-extrabold text-gray-900">{fmt(totalAmt)} SAR</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Distribution Ratio</p>
              <p className="text-lg font-extrabold" style={{ color: totalPct > 100 ? "#dc2626" : "#059669" }}>
                {totalPct.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}

      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
