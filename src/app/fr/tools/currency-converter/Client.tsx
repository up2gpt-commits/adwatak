"use client";
import { useState, useEffect } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const currencies = [
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "EGP", name: "Livre égyptienne", flag: "🇪🇬" },
  { code: "KWD", name: "Dinar koweïtien", flag: "🇰🇼" },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦" },
  { code: "OMR", name: "Omani Rial", flag: "🇴🇲" },
  { code: "BHD", name: "Dinar bahreïni", flag: "🇧🇭" },
  { code: "JOD", name: "Dinar jordanien", flag: "🇯🇴" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "Livre sterling", flag: "🇬🇧" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
];

const faqs = [
  { question: "Quelles devises sont prises en charge ?", answer: "Plus de 14 devises : Riyal saoudien (SAR), Dirham des Émirats arabes unis (AED), Livre égyptienne (EGP), Dinar koweïtien (KWD), Riyal qatari (QAR), Rial omanais (OMR), Dinar bahreïni (BHD), Dollar américain (USD), Euro (EUR), Livre sterling (GBP), Lire turque (TRY), Dinar jordanien (JOD), Yuan chinois (CNY), Roupie indienne (INR)." },
  { question: "D'où viennent les taux de change ?", answer: "Les taux affichés sont les taux moyens du marché provenant d'une API de devises open source mise à jour quotidiennement. Les banques et les bureaux de change ajoutent une marge de 1 à 5 %. Utilisez notre outil comme estimation, puis vérifiez auprès de votre banque pour les taux exacts." },
  { question: "Les devises du CCG sont-elles indexées sur le dollar américain ?", answer: "Oui, la plupart des devises du CCG sont indexées : SAR = 3,75, AED = 3,67, QAR = 3,64, BHD = 0,376, OMR = 0,384 pour 1 USD. Le KWD est la devise la plus forte au monde et n'est pas entièrement indexé. L'EGP et la TRY flottent librement." },
  { question: "Comment obtenir le meilleur taux de change ?", answer: "Évitez les bureaux de change des aéroports (les pires taux). Utilisez Wise, Revolut ou STC Pay. Transférez des montants plus importants pour obtenir de meilleurs taux. Surveillez les taux pendant quelques jours avant de convertir de grosses sommes." },
  { question: "Puis-je convertir des SAR en USD ?", answer: "1 SAR = 0,267 USD (parité fixe). 1 000 SAR = 267 USD. Le taux SAR-USD est stable en raison de l'ancrage monétaire. La marge bancaire est généralement de 0,5 à 1 % sur cette paire." },
  { question: "What's the buy/sell spread?", answer: "Buy price = what the bank sells you currency at. Sell price = what the bank pays when you sell currency. The difference is the bank's profit margin (spread). Our tool shows mid-rate." },
  { question: "Prenez-vous en charge les cryptomonnaies ?", answer: "Non, nous ne prenons en charge que les devises fiduciaires traditionnelles. Pour les conversions de cryptomonnaies, utilisez des plateformes spécialisées comme Binance ou Coinbase." },
  { question: "Comment utiliser cet outil pour les voyages ?", answer: "Saisissez le montant dans votre devise d'origine, sélectionnez votre devise de destination. Ajoutez 2 à 3 % pour les marges bancaires afin d'obtenir un budget réaliste. Vérifiez les taux une semaine avant de voyager." },
  { question: "Pourquoi le KWD est-il la devise la plus forte ?", answer: "Le Koweït a une économie forte, d'importantes réserves de pétrole et un fonds souverain. Le KWD est indexé sur un panier de devises (pas seulement le dollar américain). 1 KWD ≈ 3,25 USD." },
  { question: "Quel est le meilleur moment pour convertir des devises ?", answer: "En semaine pendant les heures du marché de Londres (du dimanche au jeudi de 8h à 22h). Évitez les week-ends (marchés fermés, spreads plus larges). Évitez les jours de grandes nouvelles économiques." },
];

const relatedTools = [
  { title: "VAT Calculator", icon: "🏛️", href: "/fr/tools/vat-calculator" },
  { title: "Marge Bénéficiaire", icon: "📈", href: "/fr/tools/profit-margin" },
  { title: "Calculateur d'or", icon: "🥇", href: "/fr/tools/gold-calculator" },
  { title: "Calculateur de prêt", icon: "💰", href: "/fr/tools/loan-calculator" },
  { title: "Convertisseur d'Unités", icon: "📏", href: "/fr/tools/unit-converter" },
  { title: "Salary Calculator", icon: "💵", href: "/fr/tools/salary-calculator" },
];

const seoContent = [
  "Convertissez instantanément entre plus de 14 devises mondiales — SAR, AED, EGP, KWD, USD, EUR, GBP et plus encore. Saisissez le montant, sélectionnez les devises et obtenez le résultat avec les taux moyens du marché en direct.",
  "Les devises du CCG sont indexées sur le dollar américain (sauf le KWD). SAR = 3,75, AED = 3,67, QAR = 3,64. L'EGP et la TRY flottent librement. Utilisez le convertisseur pour la planification de voyages, les achats en ligne et les affaires.",
  "Conseil aux voyageurs : Les taux des aéroports sont les pires. Changez seulement pour le premier jour sur place, utilisez Wise ou STC Pay pour le reste. Vérifiez les taux avant de voyager pour budgétiser avec précision.",
  "Pour les entreprises : Les taux affichés sont indicatifs. Pour les transferts importants, contactez votre banque pour obtenir des devis compétitifs. Les banques proposent de meilleurs taux pour les montants supérieurs à 10 000 USD.",
];

export default function Client() {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("SAR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRate = async (f: string, t: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/currency-proxy");
      const data = await res.json();
      const rates = data?.usd;
      const fromLower = f.toLowerCase();
      const toLower = t.toLowerCase();
      if (rates?.[fromLower] && rates?.[toLower]) {
        // Cross rate: rate = rates[to] / rates[from]
        const crossRate = rates[toLower] / rates[fromLower];
        setRate(crossRate);
        setLastUpdated(data.date || "");
      } else {
        setError("Unable to get exchange rate");
      }
    } catch {
      setError("Échec de la connexion au service de taux");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate(from, to);
  }, [from, to]);

  useEffect(() => {
    if (rate !== null && amount) {
      const a = parseFloat(amount);
      setResult(isNaN(a) ? null : a * rate);
    } else {
      setResult(null);
    }
  }, [rate, amount]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const schemaName = "Convertisseur de Devises";
  const schemaDesc = "Convertisseur de devises en ligne — taux moyens du marché en direct";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/fr/tools/currency-converter";
  const breadcrumbItems = [
    { name: "Accueil", url: "https://adwatak.cloud/fr" },
    { name: "Convertisseurs", url: "https://adwatak.cloud/fr/category/converters" },
    { name: "Convertisseur de Devises", url: "https://adwatak.cloud/fr/tools/currency-converter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'fr', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Comment utiliser cet outil", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [{name:"Ouvrir l'outil",text:"Accédez à la page de cet outil sur Adawatak"},{name:"Entrez vos données",text:"Remplissez les champs requis"},{name:"Obtenez les résultats",text:"Cliquez sur le bouton Calculer ou Générer"},{name:"Utilisez ou partagez",text:"Copiez, téléchargez ou partagez les résultats"}],"moins d'une minute","fr")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />

      <Breadcrumb category="Convertisseurs" categorySlug="converters" toolName="Convertisseur de Devises" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">Convertisseur de Devises</h1>
        <p className="text-sm text-gray-500 mb-6">Convertissez des devises en temps réel</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1,000" />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
                {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
              </select>
            </div>
            <button onClick={swap}
              className="bg-gray-200 hover:bg-gray-300 rounded-xl p-3 text-lg transition-all cursor-pointer border-none mb-0.5">
              🔄
            </button>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
                {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
              </select>
            </div>
          </div>

          {loading && <p className="text-sm text-gray-400 text-center">⏳ Loading rates...</p>}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {result !== null && !loading && !error && (
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <p className="text-xs text-green-600">{parseFloat(amount || "0").toLocaleString("en-US")} {from} =</p>
              <p className="text-3xl font-black text-green-900 my-2">{result.toLocaleString("en-US", { maximumFractionDigits: 2 })} {to}</p>
              <p className="text-xs text-gray-500">Rate: 1 {from} = {(rate || 0).toFixed(6)} {to}</p>
              {lastUpdated && <p className="text-xs text-gray-400 mt-1">📅 Last updated: {lastUpdated}</p>}
            </div>
          )}

          {!loading && !error && rate === null && (
            <p className="text-sm text-gray-400 text-center">This currency pair is not supported. Try another pair.</p>
          )}
        </div>
      </div>
      <SEOContent content={seoContent} lang="fr" />
      <FAQSection faqs={faqs} lang="fr" />
      <RelatedTools tools={relatedTools} lang="fr" />
      <ShareButtons lang="fr" />
    </div>
  );
}
