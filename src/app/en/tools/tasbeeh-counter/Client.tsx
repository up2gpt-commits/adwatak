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
  { text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ", transliteration: "La hawla wa la quwwata illa billah", meaning: "No power except with Allah", target: 33 },
  { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", transliteration: "Subhan Allahi wa bihamdihi", meaning: "Glory be to Allah and His praise", target: 33 },
  { text: "سُبْحَانَ اللهِ الْعَظِيمِ", transliteration: "Subhan Allahil Azeem", meaning: "Glory be to Allah the Magnificent", target: 33 },
];

const faqs = [
  { question: "What is a Tasbeeh Counter?", answer: "A Tasbeeh Counter is a digital tool that helps you count your dhikr (remembrance of Allah) during worship. It works directly in your browser, saves your progress automatically, and can be used as a replacement or supplement to a traditional prayer bead string (misbaha/sibha)." },
  { question: "Why 33 counts per tasbeeh?", answer: "The number 33 comes from the Sunnah of Prophet Muhammad ﷺ. After each obligatory prayer, he would say 'Subhan Allah' 33 times, 'Alhamdulillah' 33 times, and 'Allahu Akbar' 34 times — totaling 100. This practice is recorded in Sahih Muslim." },
  { question: "Is my count saved if I close the page?", answer: "Yes! Your count is automatically saved to your browser's localStorage. When you return to the page, you'll see your last count. However, clearing browser data or using a different browser will reset the counter." },
  { question: "Can I use it offline?", answer: "Yes — after the first page load, the Tasbeeh Counter works completely offline. Everything runs in your browser with no data sent to any server." },
  { question: "Does using a digital counter count as dhikr?", answer: "Yes, the intention is what matters. The digital counter is simply a tool to help you keep track of your dhikr. Scholars have permitted using digital counters as a means to assist in remembrance, though some prefer using fingers as it was the Prophet's practice." },
  { question: "What is the best dhikr to say?", answer: "The best dhikr is 'La ilaha illallah' (There is no god but Allah), as narrated by Jabir (may Allah be pleased with him). Other highly recommended dhikr includes 'Subhan Allah', 'Alhamdulillah', 'Allahu Akbar', and 'La hawla wa la quwwata illa billah'." },
  { question: "How do I know when I've completed a set?", answer: "When you reach the target count (33 or 34), the counter circle turns green briefly and a completion message appears. You can then move to the next dhikr or reset and start again." },
  { question: "Can I change the target count?", answer: "The target counts are set according to the Sunnah: 33 for most dhikr and 34 for Takbir (Allahu Akbar). These cannot be changed individually, but the counter will continue counting beyond the target if you wish." },
  { question: "What are morning and evening adhkar?", answer: "Morning adhkar (Adhkar al-Sabah) and evening adhkar (Adhkar al-Masa) are recommended supplications to recite after Fajr and Asr/Maghrib. They include various dhikr from the Quran and Sunnah. This counter helps you track your recitations." },
  { question: "Is this tool free?", answer: "Yes — completely free, no signup required, no ads, no data collection. Works on all devices: mobile, tablet, and desktop." },
  { question: "Can I use it during prayer?", answer: "It's recommended to put away your phone during prayer to maintain focus (khushu'). Use the Tasbeeh Counter before or after prayer instead." },
  { question: "What dhikr should I say after prayer?", answer: "After every obligatory prayer, the Sunnah is to say: 'Subhan Allah' 33 times, 'Alhamdulillah' 33 times, 'Allahu Akbar' 34 times (total 100). The Prophet ﷺ said: 'Whoever does this, his sins will be forgiven even if they are like the foam of the sea.' (Sahih Muslim)" },
];

const relatedTools = [
  { title: "Prayer Times", icon: "🕌", href: "/en/tools/prayer-times" },
  { title: "Qibla Direction", icon: "🧭", href: "/en/tools/qibla-direction" },
  { title: "Zakat Calculator", icon: "💰", href: "/en/tools/zakat-calculator" },
  { title: "Hijri Converter", icon: "📅", href: "/en/tools/hijri-converter" },
  { title: "Inheritance Calculator", icon: "⚖️", href: "/en/tools/inheritance-calculator" },
  { title: "Stopwatch", icon: "⏱️", href: "/en/tools/stopwatch" },
];

const seoContent = [
  "Free Digital Tasbeeh Counter — count your dhikr online with a beautiful, easy-to-use interface. Track Subhan Allah, Alhamdulillah, Allahu Akbar, and more with automatic save.",
  "Supports 8 essential adhkar: Subhan Allah (33), Alhamdulillah (33), Allahu Akbar (34), La ilaha illallah (33), Astaghfirullah (33), La hawla wa la quwwata illa billah (33), Subhan Allahi wa bihamdihi (33), Subhan Allahil Azeem (33).",
  "Features: Automatic save to browser localStorage, circular progress indicator with animated ring, completion notifications, works offline after first load, fully responsive design.",
  "Target counts based on the Sunnah of Prophet Muhammad ﷺ: 33 counts per dhikr, 34 for Takbir. Total of 100 after each obligatory prayer — as narrated in Sahih Muslim.",
  "100% free, no signup required, works on all devices, privacy-first — no data collected or sent to any server.",
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
  const schemaUrl = "https://adwatak.cloud/en/tools/tasbeeh-counter";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Islamic Tools", url: "https://adwatak.cloud/en/category/islamic" },
    { name: "📿 Tasbeeh Counter", url: "https://adwatak.cloud/en/tools/tasbeeh-counter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={howToSchema("How to use the Tasbeeh Counter", "Free online tool. Works directly in your browser. No registration required.", [
        { name: "Choose a Dhikr", text: "Select a dhikr from the list — Subhan Allah, Alhamdulillah, Allahu Akbar, etc." },
        { name: "Tap to Count", text: "Tap the large button or anywhere on the circle to increment the counter" },
        { name: "Complete the Set", text: "Continue until you reach the target count (33 or 34) — a completion message will appear" },
        { name: "Move to Next", text: "After completing, move to the next dhikr or reset the counter" },
      ], "less than a minute", "en")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb category="Islamic Tools" categorySlug="islamic" toolName="Tasbeeh Counter" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1 text-center">📿 Tasbeeh Counter</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Digital dhikr counter with auto-save — 33 counts per tasbeeh</p>

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
      <ShareButtons lang="en" />
    </div>
  );
}
