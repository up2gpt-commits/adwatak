"use client";
import { useState } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema, howToSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

type Currency = "USD" | "SAR" | "EUR" | "GBP" | "TRY" | "IDR" | "PKR" | "EGP";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", SAR: "SR", EUR: "€", GBP: "£", TRY: "₺", IDR: "Rp", PKR: "Rs", EGP: "E£",
};

const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "US Dollar", SAR: "Saudi Riyal", EUR: "Euro", GBP: "Livre sterling", TRY: "Turkish Lira", IDR: "Indonesian Rupiah", PKR: "Pakistani Rupee", EGP: "Livre égyptienne",
};

interface CostItem {
  label: string;
  amount: number;
}

interface UmrahCosts {
  visa: CostItem[];
  flight: CostItem[];
  accommodation: CostItem[];
  transport: CostItem[];
  expenses: CostItem[];
}

const UMRAH_RITUALS = [
  { step: 1, title: "Ihram", description: "Enter the state of Ihram at the Miqat — pray two raka'at and say: Labbayk Allahumma Umrah (Here I am, O Allah, for Umrah)" },
  { step: 2, title: "Tawaf", description: "Faites sept tours autour de la Kaaba — commencez à la Pierre Noire et terminez-y" },
  { step: 3, title: "Pray 2 Raka'at behind Maqam Ibrahim", description: "After Tawaf, pray two raka'at behind Maqam Ibrahim if possible, otherwise anywhere in the Haram" },
  { step: 4, title: "Sa'i between Safa and Marwah", description: "Marchez sept fois entre les collines de Safa et Marwah — commencez à Safa et terminez à Marwah" },
  { step: 5, title: "Halq ou Taqsir", description: "Rasez-vous ou coupez-vous les cheveux — cela complète votre Omra et vous sortez de l'état d'Ihram" },
];

export default function Client() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [costs, setCosts] = useState<UmrahCosts>({
    visa: [{ label: "Visa Omra", amount: 0 }],
    flight: [{ label: "Billet d'Avion", amount: 0 }],
    accommodation: [{ label: "Hôtel à La Mecque", amount: 0 }, { label: "Hôtel à Médine", amount: 0 }],
    transport: [{ label: "Transport Local", amount: 0 }],
    expenses: [{ label: "Dépenses Quotidiennes", amount: 0 }],
  });
  const [travelers, setTravelers] = useState(1);
  const [nights, setNights] = useState(10);
  const [calculated, setCalculated] = useState(false);

  const updateCost = (category: keyof UmrahCosts, index: number, field: "label" | "amount", value: string | number) => {
    setCosts(prev => {
      const updated = { ...prev };
      updated[category] = updated[category].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return updated;
    });
  };

  const addCostItem = (category: keyof UmrahCosts) => {
    setCosts(prev => ({
      ...prev,
      [category]: [...prev[category], { label: "Nouvel Élément", amount: 0 }],
    }));
  };

  const removeCostItem = (category: keyof UmrahCosts, index: number) => {
    setCosts(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  const categoryTotals = {
    visa: costs.visa.reduce((s, c) => s + c.amount, 0),
    flight: costs.flight.reduce((s, c) => s + c.amount, 0),
    accommodation: costs.accommodation.reduce((s, c) => s + c.amount, 0),
    transport: costs.transport.reduce((s, c) => s + c.amount, 0),
    expenses: costs.expenses.reduce((s, c) => s + c.amount, 0),
  };

  const grandTotal = Object.values(categoryTotals).reduce((s, v) => s + v, 0);
  const perPerson = travelers > 0 ? grandTotal / travelers : 0;

  const sym = CURRENCY_SYMBOLS[currency];

  const formatAmount = (amount: number) => {
    if (currency === "IDR" || currency === "PKR") return `${sym} ${amount.toLocaleString()}`;
    return `${sym} ${amount.toLocaleString()}`;
  };

  const handleCalculate = () => setCalculated(true);

  const categoryLabels: Record<keyof UmrahCosts, string> = {
    visa: "🛂 Visa",
    flight: "✈️ Flights",
    accommodation: "🏨 Accommodation",
    transport: "🚗 Transport",
    expenses: "💰 Expenses",
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Umrah Calculator", "Calculez les coûts de la Omra with step-by-step Umrah guide", "https://adwatak.cloud/fr/tools/umrah-calculator", "fr", "Islamic")} />
      <StructuredData data={faqSchema([
        { question: "Combien coûte la Omra en 2026 ?", answer: "Les coûts varient selon le pays, la durée et le niveau de l'hôtel. Estimations approximatives : depuis les États-Unis 2 500 $ - 5 000 $, depuis le Royaume-Uni 2 000 £ - 4 000 £, depuis la Turquie 1 500 $ - 3 000 $, depuis l'Indonésie 1 500 $ - 3 500 $. Utilisez ce calculateur pour une estimation personnalisée." },
        { question: "Le calculateur inclut-il les frais de visa ?", answer: "Yes, the Umrah calculator covers visas, flights, accommodation, transport, and daily expenses — every item is customizable." },
        { question: "Quels sont les rituels de la Omra ?", answer: "Ihram → Tawaf around the Kaaba → Pray 2 raka'at behind Maqam Ibrahim → Sa'i between Safa and Marwah → Halq (shave) or Taqsir (trim)." },
        { question: "Combien de jours ai-je besoin pour la Omra ?", answer: "Minimum 1 jour pour les rituels seuls, mais 7 à 14 jours sont recommandés pour visiter également Médine." },
        { question: "Puis-je calculer les coûts pour plusieurs voyageurs ?", answer: "Yes! Enter the number of travelers and it will calculate total cost and per-person cost automatically." },
        { question: "What's the difference between Umrah and Hajj?", answer: "La Omra peut être accomplie à tout moment et n'est pas obligatoire. Le Hajj a lieu pendant des mois spécifiques et est l'un des cinq piliers de l'Islam." },
        { question: "Ce calculateur est-il gratuit ?", answer: "Yes, the Umrah calculator is completely free and runs in your browser — no data is sent to any server." },
        { question: "When is the best time for Umrah?", answer: "Le Ramadan est le meilleur moment (la Omra pendant le Ramadan équivaut au Hajj en récompense). Évitez la saison du Hajj si vous voulez des prix plus bas." },
        { question: "Ai-je besoin d'un Mahram pour la Omra ?", answer: "Selon la plupart des savants, une femme a besoin d'un Mahram (mari ou tuteur masculin). Certains pays autorisent les femmes de plus de 45 ans à voyager sans Mahram." },
        { question: "Quels documents sont requis ?", answer: "Passeport valide (6+ mois), visa Omra, billet d'avion aller-retour, vaccinations requises (selon les réglementations sanitaires)." },
        { question: "Puis-je visiter Médine avec la Omra ?", answer: "Yes, it is recommended to visit Madinah and the Prophet's Mosque before or after performing Umrah." },
        { question: "Comment connaître mon Miqat ?", answer: "Il y a cinq emplacements de Miqat : Dhul-Hulayfah (pour Médine), Al-Juhfah (pour l'Égypte/Sham), Yalamlam (pour le Yémen), Qarn al-Manazil (pour le Najd) et Dhat Irq (pour l'Irak). Demandez à votre agent de voyage." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Accueil", url: "https://adwatak.cloud/fr" },
        { name: "Islamique", url: "https://adwatak.cloud/fr/category/islamic" },
        { name: "Calculateur Omra", url: "https://adwatak.cloud/fr/tools/umrah-calculator" },
      ])} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <StructuredData data={howToSchema("Comment utiliser cet outil", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [{name: "Select currency", text: "Choose your preferred currency"}, {name: "Enter costs", text: "Remplissez chaque catégorie de coût — visa, vol, hôtel, transport, dépenses"}, {name: "Set travelers", text: "Enter the number of travelers"}, {name: "Calculate", text: "Cliquez sur le bouton calculer pour voir les coûts totaux et par personne"}], "less than 2 minutes", "fr")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="fr" category="Outils Islamiques" categorySlug="islamic" toolName="Calculateur d'Omra" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🕋 Calculateur Omra</h1>
        <p className="text-sm text-gray-500 mb-6">Calculez les coûts de la Omra</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Currency:</label>
            <select value={currency} onChange={e => setCurrency(e.target.value as Currency)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              {Object.entries(CURRENCY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label} ({CURRENCY_SYMBOLS[key as Currency]})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Travelers:</label>
            <input type="number" min={1} max={20} value={travelers} onChange={e => setTravelers(Math.max(1, parseInt(e.target.value) || 1))} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Nights:</label>
            <input type="number" min={1} max={60} value={nights} onChange={e => setNights(Math.max(1, parseInt(e.target.value) || 1))} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
        </div>

        {(Object.keys(costs) as (keyof UmrahCosts)[]).map(cat => (
          <div key={cat} className="mb-6">
            <h3 className="text-base font-bold text-gray-800 mb-3">{categoryLabels[cat]}</h3>
            <div className="space-y-2">
              {costs[cat].map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input type="text" value={item.label} onChange={e => updateCost(cat, idx, "label", e.target.value)} className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  <input type="number" min={0} value={item.amount || ""} onChange={e => updateCost(cat, idx, "amount", parseFloat(e.target.value) || 0)} placeholder="0" className="w-32 border border-gray-300 rounded-xl px-3 py-2 text-sm text-right focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  {costs[cat].length > 1 && (
                    <button onClick={() => removeCostItem(cat, idx)} className="text-red-500 hover:text-red-700 text-lg px-2">✕</button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <button onClick={() => addCostItem(cat)} className="text-xs text-green-600 hover:text-green-800 font-semibold">+ Add item</button>
              <span className="text-sm font-bold text-gray-600">Subtotal: {formatAmount(categoryTotals[cat])}</span>
            </div>
          </div>
        ))}

        <button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-lg">
          🕋 Calculate Umrah Cost
        </button>

        {calculated && grandTotal > 0 && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-extrabold text-green-800 mb-4 text-center">📊 Umrah Cost Summary</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {(Object.keys(categoryTotals) as (keyof UmrahCosts)[]).map(cat => (
                <div key={cat} className="bg-white rounded-xl p-3 border border-green-100">
                  <p className="text-xs text-gray-500">{categoryLabels[cat]}</p>
                  <p className="text-base font-extrabold text-gray-800">{formatAmount(categoryTotals[cat])}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-green-200 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Total for {travelers} traveler{travelers > 1 ? "s" : ""}:</span>
                <span className="text-xl font-extrabold text-green-800">{formatAmount(grandTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Cost per person:</span>
                <span className="text-lg font-extrabold text-emerald-700">{formatAmount(perPerson)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">For {nights} nights:</span>
                <span className="text-sm font-bold text-gray-600">{formatAmount(perPerson / nights)} / night</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rituals */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h2 className="text-xl font-extrabold mb-6">📿 Umrah Rituals Step by Step</h2>
        <div className="space-y-4">
          {UMRAH_RITUALS.map(ritual => (
            <div key={ritual.step} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                {ritual.step}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{ritual.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{ritual.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SEOContent content={[
        "Calculateur de Omra — Calculez le coût total de la Omra : visa, billet d'avion, hôtel à La Mecque et Médine, transport local et dépenses quotidiennes.",
        "Prend en charge 8 devises : USD, SAR, EUR, GBP, TRY, IDR, PKR, EGP.",
        "Calculez les coûts pour plusieurs voyageurs avec des répartitions par personne et par nuit.",
        "Step-by-step Umrah rituals guide: Ihram, Tawaf, Prayer, Sa'i, Halq.",
        "100% free, runs in your browser — no data sent to any server.",
      ]} lang="fr" />
      <FAQSection faqs={[
        { question: "Combien coûte la Omra en 2026 ?", answer: "Les coûts varient selon le pays, la durée et le niveau de l'hôtel. Estimations approximatives : depuis les États-Unis 2 500 $ - 5 000 $, depuis le Royaume-Uni 2 000 £ - 4 000 £, depuis la Turquie 1 500 $ - 3 000 $, depuis l'Indonésie 1 500 $ - 3 500 $." },
        { question: "Quels sont les rituels de la Omra ?", answer: "Ihram → Tawaf around the Kaaba → Pray 2 raka'at behind Maqam Ibrahim → Sa'i between Safa and Marwah → Halq (shave) or Taqsir (trim)." },
        { question: "Combien de jours ai-je besoin pour la Omra ?", answer: "Minimum 1 jour pour les rituels seuls, mais 7 à 14 jours sont recommandés pour visiter également Médine." },
        { question: "Puis-je calculer les coûts pour plusieurs voyageurs ?", answer: "Yes! Enter the number of travelers and it will calculate total cost and per-person cost automatically." },
        { question: "What's the difference between Umrah and Hajj?", answer: "La Omra peut être accomplie à tout moment et n'est pas obligatoire. Le Hajj a lieu pendant des mois spécifiques et est l'un des cinq piliers de l'Islam." },
        { question: "Ce calculateur est-il gratuit ?", answer: "Yes, the Umrah calculator is completely free and runs in your browser." },
        { question: "When is the best time for Umrah?", answer: "Le Ramadan est le meilleur moment (la Omra pendant le Ramadan équivaut au Hajj en récompense). Évitez la saison du Hajj pour des prix plus bas." },
        { question: "Ai-je besoin d'un Mahram pour la Omra ?", answer: "Selon la plupart des savants, une femme a besoin d'un Mahram (mari ou tuteur masculin)." },
        { question: "Quels documents sont requis ?", answer: "Passeport valide (6+ mois), visa Omra, billet d'avion aller-retour, vaccinations requises." },
        { question: "Puis-je visiter Médine avec la Omra ?", answer: "Yes, it is recommended to visit Madinah and the Prophet's Mosque before or after Umrah." },
      ]} lang="fr" />
      <RelatedTools tools={[
        { title: "Zakat Calculator", icon: "🕌", href: "/fr/tools/zakat-calculator" },
        { title: "Direction de la Qibla", icon: "🧭", href: "/fr/tools/qibla-direction" },
        { title: "Heures de Prière", icon: "🕐", href: "/fr/tools/prayer-times" },
        { title: "Compteur Tasbih", icon: "📿", href: "/fr/tools/tasbeeh-counter" },
      ]} lang="fr" />
      <ShareButtons lang="fr" />
    </div>
  );
}
