"use client";
import { useState } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema, howToSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

type KaffarahType = "oath" | "ramadan" | "zhihar" | "fasting";

interface KaffarahInfo {
  title: string;
  description: string;
  options: { label: string; detail: string }[];
  defaultCount: number;
}

const KAFFARAH_DATA: Record<KaffarahType, KaffarahInfo> = {
  oath: {
    title: "🤲 Kaffarah for Breaking an Oath",
    description: "Whoever swears an oath and then breaks it must pay Kaffarah. Allah says: 'Its expiation is feeding ten needy people from the average of what you feed your families, or clothing them, or freeing a slave. Whoever cannot find must fast for three days.' (Quran 5:89)",
    options: [
      { label: "Feed 10 needy people", detail: "Feed ten needy people from the average food you feed your family — approx 1.5kg rice/person = 15kg total" },
      { label: "Clothe 10 needy people", detail: "Provide clothing for ten needy people" },
      { label: "Free a slave", detail: "Free a believing slave — not applicable in modern times" },
      { label: "Fast 3 days", detail: "Fast three consecutive or separate days — for those who cannot afford food or clothing" },
    ],
    defaultCount: 1,
  },
  ramadan: {
    title: "🌙 Kaffarah for Intercourse in Ramadan",
    description: "Whoever intentionally has intercourse during the day in Ramadan must make up the day AND pay Kaffarah. The Kaffarah follows this order: free a slave, if not possible fast 60 consecutive days, if not possible feed 60 needy people.",
    options: [
      { label: "Free a slave", detail: "Free a believing slave — not applicable today" },
      { label: "Fast 60 consecutive days", detail: "Fast 60 consecutive days — cannot break the fast except for valid Sharia reasons" },
      { label: "Feed 60 needy people", detail: "Feed sixty needy people — approx 1.5kg rice/person = 90kg total" },
    ],
    defaultCount: 1,
  },
  zhihar: {
    title: "💔 Kaffarah for Zhihar (Dhihar)",
    description: "Zhihar is when a husband says to his wife: 'You are to me like my mother's back.' Before any intimacy, he must pay Kaffarah. Allah says: 'Those who pronounce zhihar from their wives then wish to go back to them — then free a slave before they touch each other.' (Quran 58:3)",
    options: [
      { label: "Free a slave", detail: "Free a believing slave — not applicable today" },
      { label: "Fast 60 consecutive days", detail: "Fast 60 consecutive days — for those who cannot free a slave" },
      { label: "Feed 60 needy people", detail: "Feed sixty needy people from average food — approx 90kg rice" },
    ],
    defaultCount: 1,
  },
  fasting: {
    title: "🍽️ Fidyah for Fasting",
    description: "Whoever is permanently unable to fast (elderly, chronic illness) must pay Fidyah for each day: feed one needy person. Allah says: 'And for those who can fast with difficulty, a ransom of feeding a poor person.' (Quran 2:184)",
    options: [
      { label: "Feed 1 needy person per day", detail: "Feed one needy person for each missed day — approx 1.5kg rice/day" },
      { label: "Feed 2 needy people per day", detail: "Feed two needy people per day — approx 3kg rice/day (some scholars permit this)" },
    ],
    defaultCount: 30,
  },
};

const FOOD_PRICES: Record<string, { unit: string; pricePerUnit: number; label: string }> = {
  rice: { unit: "kg", pricePerUnit: 1.5, label: "Rice" },
  bread: { unit: "loaf", pricePerUnit: 0.3, label: "Bread" },
  dates: { unit: "kg", pricePerUnit: 5, label: "Dates" },
  meat: { unit: "kg", pricePerUnit: 8, label: "Meat" },
};

export default function Client() {
  const [selectedType, setSelectedType] = useState<KaffarahType>("oath");
  const [count, setCount] = useState(1);
  const [foodType, setFoodType] = useState("rice");
  const [foodPerPerson, setFoodPerPerson] = useState(1.5);
  const [calculated, setCalculated] = useState(false);

  const info = KAFFARAH_DATA[selectedType];
  const food = FOOD_PRICES[foodType];

  const totalFood = count * foodPerPerson;
  const totalCost = totalFood * food.pricePerUnit;

  const handleCalculate = () => setCalculated(true);

  const typeLabels: Record<KaffarahType, string> = {
    oath: "🤲 Kaffarah for Oath",
    ramadan: "🌙 Kaffarah for Ramadan Intercourse",
    zhihar: "💔 Kaffarah for Zhihar",
    fasting: "🍽️ Fidyah for Fasting",
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Fidyah & Kaffarah Calculator", "Calculate Fidyah & Kaffarah — oath breaking, Ramadan intimacy, Zhihar, fasting fidyah with Islamic rulings", "https://adwatak.cloud/fr/tools/fidyah-kaffarah", "fr", "Islamic")} />
      <StructuredData data={faqSchema([
        { question: "What is Kaffarah for breaking an oath?", answer: "Kaffarah for breaking an oath is: feed 10 needy people, or clothe them, or free a slave. Whoever cannot afford it must fast for three days. (Quran 5:89)" },
        { question: "What is the Kaffarah for intercourse in Ramadan?", answer: "Whoever intentionally has intercourse during Ramadan day must make up the day AND pay Kaffarah: free a slave, or fast 60 consecutive days, or feed 60 needy people." },
        { question: "What is Kaffarah for Zhihar?", answer: "Zhihar is when a husband says 'You are like my mother's back.' Kaffarah: free a slave, or fast 60 consecutive days, or feed 60 needy people." },
        { question: "What is Fidyah for fasting?", answer: "Fidyah is for those permanently unable to fast: feed one needy person per missed day. Approximately 1.5kg of rice per person." },
        { question: "Can I feed instead of fasting for Kaffarah?", answer: "Yes, if you are genuinely unable to fast due to health reasons. The inability must be real and confirmed." },
        { question: "How much food per person?", answer: "Approximately 1.5kg of rice or equivalent average food. Some scholars say half a sa' (approx 1.5kg)." },
        { question: "Must the fasting be consecutive?", answer: "Yes, Kaffarah fasting (3 days for oath, 60 days for Zhihar/Ramadan) must be consecutive according to most scholars." },
        { question: "Does a woman pay Kaffarah for breaking an oath?", answer: "Yes, Kaffarah for oath applies to both men and women equally." },
        { question: "Can I pay money instead of food?", answer: "Most scholars say money cannot replace food in Kaffarah. However, some contemporary scholars permit giving money to the poor directly." },
        { question: "What's the difference between Fidyah and Kaffarah?", answer: "Kaffarah is for prohibited acts (oath, Ramadan intercourse, Zhihar). Fidyah is for inability to perform obligations (fasting for the permanently unable)." },
        { question: "Is this calculator free?", answer: "Yes, the Fidyah & Kaffarah calculator is completely free and runs in your browser." },
        { question: "Do I need to pay Kaffarah for unintentional breaking of oath?", answer: "Kaffarah is only for deliberate breaking of an oath. If the oath was broken under coercion or forgetfulness, no Kaffarah is due according to most scholars." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Accueil", url: "https://adwatak.cloud/fr" },
        { name: "Islamique", url: "https://adwatak.cloud/fr/category/islamic" },
        { name: "Calculateur Fidyah & Kaffarah", url: "https://adwatak.cloud/fr/tools/fidyah-kaffarah" },
      ])} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <StructuredData data={howToSchema("Comment utiliser cet outil", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [{name: "Select type", text: "Choose the type of Kaffarah or Fidyah"}, {name: "Enter count", text: "Enter the number of times or days"}, {name: "Choose food type", text: "Select food type and amount per person"}, {name: "Calculate", text: "Click calculate to see the amount and estimated cost"}], "less than 2 minutes", "fr")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="fr" category="Outils Islamiques" categorySlug="islamic" toolName="Fidyah & Kaffarah Calculator" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⚖️ Calculateur Fidyah & Kaffarah</h1>
        <p className="text-sm text-gray-500 mb-6">Calculez Fidyah et Kaffarah pour le jeûne et les serments</p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Kaffarah or Fidyah type:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(typeLabels) as KaffarahType[]).map(type => (
              <button
                key={type}
                onClick={() => { setSelectedType(type); setCount(KAFFARAH_DATA[type].defaultCount); setCalculated(false); }}
                className={`p-4 rounded-xl border-2 text-left font-semibold text-sm transition-colors ${selectedType === type ? "border-green-500 bg-green-50 text-green-800" : "border-gray-200 bg-white text-gray-700 hover:border-green-300"}`}
              >
                {typeLabels[type]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-amber-800 mb-2">{info.title}</h3>
          <p className="text-sm text-amber-700 leading-relaxed mb-4">{info.description}</p>
          <div className="space-y-2">
            {info.options.map((opt, i) => (
              <div key={i} className="bg-white rounded-lg p-3 border border-amber-100">
                <p className="font-semibold text-gray-800 text-sm">{opt.label}</p>
                <p className="text-xs text-gray-600 mt-1">{opt.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {selectedType === "fasting" ? "Number of days:" : "Number of times:"}
            </label>
            <input type="number" min={1} max={365} value={count} onChange={e => { setCount(Math.max(1, parseInt(e.target.value) || 1)); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Food type:</label>
            <select value={foodType} onChange={e => { setFoodType(e.target.value); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              {Object.entries(FOOD_PRICES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount per person (kg):</label>
            <input type="number" min={0.5} max={10} step={0.5} value={foodPerPerson} onChange={e => { setFoodPerPerson(parseFloat(e.target.value) || 1.5); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
        </div>

        <button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-lg">
          ⚖️ Calculate Fidyah / Kaffarah
        </button>

        {calculated && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-extrabold text-green-800 mb-4 text-center">📊 Calculation Result</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Needy people / Days</p>
                <p className="text-xl font-extrabold text-gray-800">{count}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Food type</p>
                <p className="text-base font-extrabold text-gray-800">{food.label}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Amount per person</p>
                <p className="text-base font-extrabold text-gray-800">{foodPerPerson} {food.unit}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Total food</p>
                <p className="text-base font-extrabold text-gray-800">{totalFood.toLocaleString()} {food.unit}</p>
              </div>
            </div>
            <div className="border-t border-green-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Estimated cost:</span>
                <span className="text-xl font-extrabold text-green-800">${totalCost.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500">* Prices are approximate and vary by region and time</p>
            </div>
          </div>
        )}
      </div>

      <SEOContent content={[
        "Fidyah & Kaffarah Calculator — Calculate Kaffarah for oath, Ramadan intercourse, Zhihar, and Fidyah for fasting.",
        "Includes detailed Islamic rulings with Quran and Sunnah evidence for each type.",
        "Calculate required food amount (rice, bread, dates, meat) and estimated cost.",
        "Supports 4 types: Oath Kaffarah (10 people), Ramadan Kaffarah (60 people), Zhihar Kaffarah (60 people), Fidyah (1 person/day).",
        "100% free, runs in your browser — no data sent to any server.",
      ]} lang="fr" />
      <FAQSection faqs={[
        { question: "What is Kaffarah for breaking an oath?", answer: "Feed 10 needy people, or clothe them, or free a slave. Whoever cannot afford it must fast for three days." },
        { question: "What is the Kaffarah for intercourse in Ramadan?", answer: "Make up the day + Kaffarah: free a slave, or fast 60 consecutive days, or feed 60 needy people." },
        { question: "What is Kaffarah for Zhihar?", answer: "Free a slave, or fast 60 consecutive days, or feed 60 needy people." },
        { question: "What is Fidyah for fasting?", answer: "Feed one needy person per missed day — approximately 1.5kg of rice per person." },
        { question: "Can I feed instead of fasting for Kaffarah?", answer: "Yes, if genuinely unable to fast due to health reasons." },
        { question: "How much food per person?", answer: "Approximately 1.5kg of rice or equivalent average food." },
        { question: "Must the fasting be consecutive?", answer: "Yes, Kaffarah fasting must be consecutive according to most scholars." },
        { question: "Does a woman pay Kaffarah for breaking an oath?", answer: "Yes, Kaffarah for oath applies to both men and women." },
        { question: "Can I pay money instead of food?", answer: "Most scholars say money cannot replace food in Kaffarah." },
        { question: "What's the difference between Fidyah and Kaffarah?", answer: "Kaffarah is for prohibited acts, Fidyah is for inability to perform obligations." },
      ]} lang="fr" />
      <RelatedTools tools={[
        { title: "Zakat Calculator", icon: "🕌", href: "/fr/tools/zakat-calculator" },
        { title: "Umrah Calculator", icon: "🕋", href: "/fr/tools/umrah-calculator" },
        { title: "Qibla Direction", icon: "🧭", href: "/fr/tools/qibla-direction" },
        { title: "Tasbeeh Counter", icon: "📿", href: "/fr/tools/tasbeeh-counter" },
      ]} lang="fr" />
      <ShareButtons lang="fr" />
    </div>
  );
}
