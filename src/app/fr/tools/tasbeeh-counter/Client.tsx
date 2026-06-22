"use client";
import { useState, useEffect, useCallback } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const dhikrList = [
  { text: "سُبْحَانَ اللهِ", transliteration: "Subhan Allah", meaning: "Glory be to Allah", target: 33 },
  { text: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", meaning: "Praise be to Allah", target: 33 },
  { text: "اللهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest", target: 34 },
  { text: "لَا إِلَٰهَ إِلَّا اللهُ", transliteration: "La ilaha illallah", meaning: "There is no god but Allah", target: 33 },
  { text: "أَسْتَغْفِرُ اللهَ", transliteration: "Astaghfirullah", meaning: "I seek forgiveness from Allah", target: 33 },
  { text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ", transliteration: "Il n'y a de force ni de puissance qu'en Allah", meaning: "No power except with Allah", target: 33 },
  { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", transliteration: "Subhan Allahi wa bihamdihi", meaning: "Gloire à Allah et à Sa louange", target: 33 },
  { text: "سُبْحَانَ اللهِ الْعَظِيمِ", transliteration: "Subhan Allahil Azeem", meaning: "Gloire à Allah le Magnifique", target: 33 },
];

const faqs = [
  { question: "Qu'est-ce qu'un compteur de Tasbeeh ?", answer: "Un compteur de Tasbeeh est un outil numérique qui vous aide à compter votre dhikr (souvenir d'Allah) pendant l'adoration. Il fonctionne directement dans votre navigateur, sauvegarde votre progression automatiquement et peut être utilisé comme remplacement ou complément d'un chapelet de prière traditionnel (misbaha/sibha)." },
  { question: "Pourquoi 33 comptages par tasbeeh ?", answer: "Le nombre 33 vient de la Sunnah du Prophète Muhammad ﷺ. Après chaque prière obligatoire, il disait 'Subhan Allah' 33 fois, 'Alhamdulillah' 33 fois et 'Allahu Akbar' 34 fois, pour un total de 100. Cette pratique est rapportée dans Sahih Muslim." },
  { question: "Mon comptage est-il sauvegardé si je ferme la page ?", answer: "Oui ! Votre comptage est automatiquement sauvegardé dans le localStorage de votre navigateur. Lorsque vous revenez sur la page, vous verrez votre dernier comptage. Cependant, effacer les données du navigateur ou utiliser un navigateur différent réinitialisera le compteur." },
  { question: "Puis-je l'utiliser hors ligne ?", answer: "Oui, après le premier chargement de la page, le compteur de Tasbeeh fonctionne complètement hors ligne. Tout s'exécute dans votre navigateur sans aucune donnée envoyée à un serveur." },
  { question: "Utiliser un compteur numérique compte-t-il comme dhikr ?", answer: "Oui, c'est l'intention qui compte. Le compteur numérique est simplement un outil pour vous aider à suivre votre dhikr. Les savants ont permis l'utilisation de compteurs numériques comme moyen d'aider au souvenir d'Allah." },
  { question: "Quel est le meilleur dhikr à dire ?", answer: "Le meilleur dhikr est 'La ilaha illallah' (Il n'y a de dieu qu'Allah). Parmi les autres dhikr fortement recommandés figurent 'Subhan Allah', 'Alhamdulillah', 'Allahu Akbar' et 'Il n'y a de force ni de puissance qu'en Allah'." },
  { question: "Comment savoir quand j'ai terminé une série ?", answer: "Lorsque vous atteignez le comptage cible (33 ou 34), le cercle du compteur devient brièvement vert et un message de complétion apparaît. Vous pouvez alors passer au dhikr suivant ou réinitialiser et recommencer." },
  { question: "Puis-je modifier le comptage cible ?", answer: "Les comptages cibles sont définis selon la Sunnah : 33 pour la plupart des dhikr et 34 pour le Takbir (Allahu Akbar). Ceux-ci ne peuvent pas être modifiés individuellement, mais le compteur continuera à compter au-delà de la cible si vous le souhaitez." },
  { question: "Que sont les adhkar du matin et du soir ?", answer: "Les adhkar du matin (Adhkar al-Sabah) et les adhkar du soir (Adhkar al-Masa) sont des supplications recommandées à réciter après le Fajr et l'Asr/Maghrib. Ils comprennent divers dhikr du Coran et de la Sunnah. Ce compteur vous aide à suivre vos récitations." },
  { question: "Cet outil est-il gratuit ?", answer: "Oui, complètement gratuit, aucune inscription requise, aucune publicité, aucune collecte de données. Fonctionne sur tous les appareils : mobile, tablette et ordinateur." },
  { question: "Puis-je l'utiliser pendant la prière ?", answer: "Il est recommandé de ranger votre téléphone pendant la prière pour maintenir la concentration (khushu'). Utilisez plutôt le compteur de Tasbeeh avant ou après la prière." },
  { question: "Quel dhikr dois-je dire après la prière ?", answer: "Après chaque prière obligatoire, la Sunnah est de dire : 'Subhan Allah' 33 fois, 'Alhamdulillah' 33 fois, 'Allahu Akbar' 34 fois (total 100). Le Prophète ﷺ a dit : 'Quiconque fait cela, ses péchés lui seront pardonnés même s'ils sont comme l'écume de la mer.' (Sahih Muslim)" },
];

const relatedTools = [
  { title: "Horaires de Prière", icon: "🕌", href: "/fr/tools/prayer-times" },
  { title: "Direction de la Qibla", icon: "🧭", href: "/fr/tools/qibla-direction" },
  { title: "Calculateur de Zakat", icon: "💰", href: "/fr/tools/zakat-calculator" },
  { title: "Convertisseur Hijri", icon: "📅", href: "/fr/tools/hijri-converter" },
  { title: "Calculateur d'Héritage", icon: "⚖️", href: "/fr/tools/inheritance-calculator" },
  { title: "Chronomètre", icon: "⏱️", href: "/fr/tools/stopwatch" },
];

const seoContent = [
  "Compteur de Tasbeeh numérique gratuit : comptez votre dhikr en ligne avec une interface belle et facile à utiliser. Suivez Subhan Allah, Alhamdulillah, Allahu Akbar, et plus encore avec sauvegarde automatique.",
  "Prend en charge 8 adhkar essentiels : Subhan Allah (33), Alhamdulillah (33), Allahu Akbar (34), La ilaha illallah (33), Astaghfirullah (33), La hawla wa la quwwata illa billah (33), Subhan Allahi wa bihamdihi (33), Subhan Allahil Azeem (33).",
  "Fonctionnalités : sauvegarde automatique dans le localStorage du navigateur, indicateur de progression circulaire avec anneau animé, notifications de complétion, fonctionnement hors ligne après le premier chargement, design entièrement responsive.",
  "Comptages cibles basés sur la Sunnah du Prophète Muhammad ﷺ : 33 comptages par dhikr, 34 pour le Takbir. Total de 100 après chaque prière obligatoire comme rapporté dans Sahih Muslim.",
  "100 % gratuit, aucune inscription requise, fonctionne sur tous les appareils, confidentialité avant tout : aucune donnée collectée ou envoyée à aucun serveur.",
];

export default function Client() {
  const [selectedDhikr, setSelectedDhikr] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const currentDhikr = dhikrList[selectedDhikr];

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasbeeh-count-en");
    const savedTotal = localStorage.getItem("tasbeeh-total-en");
    const savedDhikr = localStorage.getItem("tasbeeh-dhikr-en");
    if (saved) setCount(parseInt(saved, 10));
    if (savedTotal) setTotalCount(parseInt(savedTotal, 10));
    if (savedDhikr) setSelectedDhikr(parseInt(savedDhikr, 10));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasbeeh-count-en", count.toString());
    localStorage.setItem("tasbeeh-total-en", totalCount.toString());
    localStorage.setItem("tasbeeh-dhikr-en", selectedDhikr.toString());
  }, [count, totalCount, selectedDhikr]);

  // Show completion animation
  useEffect(() => {
    if (count >= currentDhikr.target && count > 0) {
      setShowComplete(true);
      const timer = setTimeout(() => setShowComplete(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [count, currentDhikr.target]);

  const increment = useCallback(() => {
    setCount(c => c + 1);
    setTotalCount(t => t + 1);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const resetAll = useCallback(() => {
    setCount(0);
    setTotalCount(0);
  }, []);

  const selectDhikr = useCallback((index: number) => {
    setSelectedDhikr(index);
    setCount(0);
  }, []);

  const progress = Math.min((count / currentDhikr.target) * 100, 100);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const schemaName = "📿 Tasbeeh Counter";
  const schemaDesc = `Free digital Tasbeeh counter — count your dhikr with save to localStorage`;
  const schemaCategory = "Islamic";
  const schemaUrl = "https://adwatak.cloud/fr/tools/tasbeeh-counter";
  const breadcrumbItems = [
    { name: "Accueil", url: "https://adwatak.cloud/fr" },
    { name: "Islamique", url: "https://adwatak.cloud/fr/category/islamic" },
    { name: "📿 Tasbeeh Counter", url: "https://adwatak.cloud/fr/tools/tasbeeh-counter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'fr', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={howToSchema("How to use the Tasbeeh Counter", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [
        { name: "Choose a Dhikr", text: "Sélectionnez un dhikr dans la liste — Subhan Allah, Alhamdulillah, Allahu Akbar, etc." },
        { name: "Tap to Count", text: "Appuyez sur le grand bouton ou n'importe où sur le cercle pour incrémenter le compteur" },
        { name: "Complete the Set", text: "Continuez jusqu'à atteindre le nombre cible (33 ou 34) — un message de fin apparaîtra" },
        { name: "Move to Next", text: "Après avoir terminé, passez au dhikr suivant ou réinitialisez le compteur" },
      ], "moins d'une minute", "fr")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb category="Outils Islamiques" categorySlug="islamic" toolName="Compteur de Tasbeeh" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1 text-center">Compteur de Tasbeeh</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Compteur Tasbih numérique pour le dhikr quotidien</p>

        {/* Dhikr selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {dhikrList.map((d, i) => (
            <button
              key={i}
              onClick={() => selectDhikr(i)}
              className={`px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer ${
                selectedDhikr === i
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
              }`}
            >
              {d.transliteration}
            </button>
          ))}
        </div>

        {/* Current dhikr display */}
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-emerald-700 mb-1">{currentDhikr.text}</p>
          <p className="text-sm text-gray-500">{currentDhikr.transliteration}</p>
          <p className="text-xs text-gray-400">{currentDhikr.meaning}</p>
        </div>

        {/* Circular counter */}
        <div className="flex justify-center my-6">
          <div className="relative w-52 h-52 cursor-pointer" onClick={increment}>
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="100" cy="100" r="90" fill="none"
                stroke={showComplete ? "#10b981" : "#059669"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-200"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-black font-mono ${showComplete ? "text-emerald-500" : "text-gray-900"}`}>
                {count}
              </span>
              <span className="text-sm text-gray-500">/ {currentDhikr.target}</span>
            </div>
          </div>
        </div>

        {/* Completion message */}
        {showComplete && (
          <div className="text-center mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-emerald-700 font-bold">✅ MashaAllah! You completed {currentDhikr.target} counts</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={increment}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-2xl border-none cursor-pointer text-xl shadow-lg active:scale-95 transition-transform"
          >
            Tasbeeh ✨
          </button>
        </div>

        <div className="flex gap-3 justify-center mt-3">
          <button
            onClick={reset}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-xl border border-gray-200 cursor-pointer text-sm"
          >
            Reset This Dhikr
          </button>
          <button
            onClick={resetAll}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-6 py-2 rounded-xl border border-red-200 cursor-pointer text-sm"
          >
            Reset All
          </button>
        </div>

        {/* Total counter */}
        <div className="text-center mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500">Total Tasbeeh Today</p>
          <p className="text-3xl font-black text-emerald-700">{totalCount}</p>
        </div>
      </div>

      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
      <ShareButtons lang="fr" />
    </div>
  );
}
