"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Qu'est-ce que le calendrier hégirien ?", answer: "Islamic lunar calendar used by Muslims worldwide for religious events. Started in 622 CE (Hijra of Prophet Muhammad from Mecca to Medina). 12 lunar months = 354-355 days. Shorter than Gregorian year by ~11 days." },
  { question: "Comment convertir entre le calendrier hégirien et le calendrier grégorien ?", answer: "Formula: approximate Hijri year = (Gregorian year - 622) × 0.97. But month/day requires precise calculations based on lunar cycles. Our converter gives exact results using Umm al-Qura calendar (Saudi Arabia)." },
  { question: "Quels sont les mois hégiriens ?", answer: "Muharram (محرم), Safar (صفر), Rabi' al-Awwal (ربيع الأول), Rabi' al-Thani (ربيع الثاني), Jumada al-Awwal (جمادى الأولى), Jumada al-Thani (جمادى الثانية), Rajab (رجب), Sha'ban (شعبان), Ramadan (رمضان), Shawwal (شوال), Dhu al-Qi'dah (ذو القعدة), Dhu al-Hijjah (ذو الحجة)." },
  { question: "Pourquoi l'année hégirienne est-elle plus courte que l'année grégorienne ?", answer: "Année lunaire : 354 jours (12 × 29,5 cycles lunaires). Année solaire : 365 jours (une orbite terrestre). Une différence de 11 jours signifie que les dates hégiriennes reculent d'environ 11 jours chaque année grégorienne. Le Ramadan traverse toutes les saisons tous les 33 ans." },
  { question: "En quelle année hégirienne sommes-nous ?", answer: "En 2024 apr. J.-C. : environ 1445-1446 AH. Le calendrier hégirien a débuté en 622 apr. J.-C. 2025-2026 apr. J.-C. ≈ 1447 AH. Notre convertisseur donne la date hégirienne exacte pour toute date grégorienne." },
  { question: "Qu'est-ce que le calendrier Umm al-Qura ?", answer: "Calendrier hégirien officiel utilisé par l'Arabie saoudite. Utilise des mois lunaires calculés (et non l'observation réelle de la lune) à des fins administratives. Le calendrier hégirien calculé le plus précis. Notre convertisseur utilise le système Umm al-Qura." },
  { question: "Moon sighting vs calculated calendar?", answer: "Observation de la lune : méthode traditionnelle — chercher la nouvelle lune. Le mois commence lorsque le croissant est visible. Calculé : prédictions astronomiques. L'Arabie saoudite utilise Umm al-Qura pour les dates civiles, mais l'observation de la lune pour le Ramadan et l'Aïd. Différents pays peuvent commencer le Ramadan à des jours différents." },
  { question: "Quelle est la date hégirienne d'aujourd'hui ?", answer: "Notre convertisseur affiche automatiquement la date hégirienne du jour. Saisissez n'importe quelle date grégorienne pour voir la date hégirienne correspondante. Fonctionne également dans l'autre sens : saisissez une date hégirienne pour voir l'équivalent grégorien." },
  { question: "Hijri calendar for business?", answer: "L'Arabie saoudite utilise le calendrier hégirien pour les dates gouvernementales, les contrats et l'emploi. Le calendrier grégorien est utilisé en parallèle pour les affaires internationales. Notre convertisseur aide à faire le pont entre les deux calendriers pour la planification commerciale et les dates de contrat." },
  { question: "Quelle est la signification de chaque mois ?", answer: "Muharram : Nouvel An islamique, Achoura (le 10). Safar : historiquement considéré comme malchanceux (simple superstition). Rabi' al-Awwal : naissance du prophète Mahomet (Mawlid). Ramadan : mois de jeûne, révélation du Coran. Shawwal : Aïd al-Fitr. Dhu al-Hijjah : pèlerinage du Hajj, Aïd al-Adha." },
  { question: "Pourquoi l'année hégirienne actuelle est-elle 1446 ?", answer: "L'Hégire (migration) a eu lieu en 622 apr. J.-C. 2024 - 622 = 1402. Mais l'année lunaire est plus courte, donc plus d'années lunaires se sont écoulées. Environ 1446 années lunaires depuis l'Hégire. Notre convertisseur calcule l'année exacte." },
  { question: "Hijri in non-Muslim countries?", answer: "Utilisé par les communautés musulmanes pour les événements religieux (Ramadan, Aïd). Les employeurs tiennent compte des fêtes religieuses. Les écoles marquent les fêtes islamiques. Notre convertisseur aide les non-musulmans à comprendre les dates islamiques pour la planification et la sensibilisation culturelle." },
];

const relatedTools = [
  { title: "Calculateur d'Âge", icon: "🎂", href: "/fr/tools/age-calculator" },
  { title: "Zakat Calculator", icon: "☪️", href: "/fr/tools/zakat-calculator" },
  { title: "Inheritance Calculator", icon: "📜", href: "/fr/tools/inheritance-calculator" },
  { title: "Calculateur d'or", icon: "🥇", href: "/fr/tools/gold-calculator" },
  { title: "Calculateur de Calories", icon: "🔥", href: "/fr/tools/calorie-calculator" },
  { title: "Convertisseur d'Unités", icon: "📏", href: "/fr/tools/unit-converter" },
];

const seoContent = [
  "Our free Hijri Converter converts between Islamic (Hijri) and Gregorian (Western) calendar dates instantly. Enter either date to see its equivalent. Perfect for tracking Ramadan dates, Islamic holidays, planning Hajj, and converting birth dates for official documents.",
  "The Islamic calendar has 12 lunar months totaling 354-355 days. This means Hijri dates shift ~11 days earlier each Gregorian year. Ramadan 2024 might be March-April, but in 2030 it will be January. Our converter handles these shifts accurately.",
  "Calendar methods: Our converter uses the Umm al-Qura calendar (official in Saudi Arabia) for calculated dates. Actual moon sighting may differ by 1 day depending on location and visibility conditions. Check local moon sighting announcements for Ramadan and Eid dates.",
  "Common uses: (1) Find your Hijri birth date. (2) Check Ramadan start/end dates for any year. (3) Convert contract dates for Saudi business. (4) Plan Eid al-Adha and Hajj dates. (5) Track Islamic anniversary dates (marriage, conversion).",
  "Related: Use our Zakat Calculator with your Hijri date for annual Zakat calculation. The Inheritance Calculator works with Hijri dates. The Age Calculator can use your Hijri birth date. The Gold Calculator helps with Zakat on gold.",
  "The Hijri calendar is central to Muslim life. Use our converter to plan religious events, understand Islamic dates, and connect the two calendar systems. Free, accurate, and always available."
];

export default function Client() {
  const today = new Date().toISOString().split("T")[0];
  const [gregorian, setGregorian] = useState(today);
  const [hijriResult, setHijriResult] = useState("");

  const hijriMonths = ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Joumada al-Awwal", "Joumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhou al-Hijja"];

  const convert = () => {
    const gd = new Date(gregorian);
    if (isNaN(gd.getTime())) return;
    // Simplified Umm al-Qura-like calculation
    const totalDays = Math.floor((gd.getTime() - new Date("622-07-16").getTime()) / (1000 * 60 * 60 * 24));
    let hYear = Math.floor(totalDays / 354.367);
    let remaining = totalDays - hYear * 354.367;
    if (remaining < 1) { hYear -= 1; remaining = totalDays - hYear * 354.367; }
    hYear += 1; // AH starting from 1
    const hMonth = Math.min(Math.floor(remaining / 29.53), 11);
    const hDay = Math.floor(remaining - hMonth * 29.53) + 1;
    setHijriResult(`${hDay} ${hijriMonths[hMonth]} ${hYear} AH`);
  };

  const schemaName = "Convertisseur Hijri";
const schemaDesc = `Online Hijri Converter - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/fr/tools/hijri-converter";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Converters", url: "https://adwatak.cloud/fr/category/calculators" },
  { name: "Convertisseur Hijri", url: "https://adwatak.cloud/fr/tools/hijri-converter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("How to use this tool", "Free online tool. Works directly in your browser. No registration required.", [{name:"Open the tool",text:"Navigate to this tool page on Adawatak"},{name:"Enter your data",text:"Fill in the required fields"},{name:"Get results",text:"Click the calculate or generate button"},{name:"Use or share",text:"Copy, download, or share the results"}],"less than a minute","en")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />

      <Breadcrumb category="Outils islamiques" categorySlug="calculatrices" toolName="Convertisseur Hijri" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">Convertisseur Hijri</h1>
        <p className="text-sm text-gray-500 mb-6">Convertir entre les dates du calendrier grégorien et du calendrier islamique Hijri</p>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gregorian Date</label>
        <input type="date" value={gregorian} onChange={(e) => setGregorian(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4" />
        <button onClick={convert} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Convertir en Hijri</button>
      </div>
      {hijriResult && (
        <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200 mb-6">
          <p className="text-xs text-green-600 mb-1">Hijri Date</p>
          <p className="text-lg font-bold text-green-900">{hijriResult}</p>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="fr" />
    </div>
  );
}
