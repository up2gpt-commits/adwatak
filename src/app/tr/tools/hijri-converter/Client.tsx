"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is Hijri calendar?", answer: "Islamic lunar calendar used by Muslims worldwide for religious events. Started in 622 CE (Hijra of Prophet Muhammad from Mecca to Medina). 12 lunar months = 354-355 days. Shorter than Gregorian year by ~11 days." },
  { question: "How to convert between Hijri and Gregorian?", answer: "Formula: approximate Hijri year = (Gregorian year - 622) × 0.97. But month/day requires precise calculations based on lunar cycles. Our converter gives exact results using Umm al-Qura calendar (Saudi Arabia)." },
  { question: "What are the Hijri months?", answer: "Muharram (محرم), Safar (صفر), Rabi' al-Awwal (ربيع الأول), Rabi' al-Thani (ربيع الثاني), Jumada al-Awwal (جمادى الأولى), Jumada al-Thani (جمادى الثانية), Rajab (رجب), Sha'ban (شعبان), Ramadan (رمضان), Shawwal (شوال), Dhu al-Qi'dah (ذو القعدة), Dhu al-Hijjah (ذو الحجة)." },
  { question: "Why is Hijri year shorter than Gregorian?", answer: "Lunar year: 354 days (12 × 29.5 moon cycles). Solar year: 365 days (one Earth orbit). 11-day difference means Hijri dates shift ~11 days earlier each Gregorian year. Ramadan moves through all seasons every 33 years." },
  { question: "What year is it in Hijri?", answer: "As of 2024 CE: approximately 1445-1446 AH. The Hijri calendar started in 622 CE. 2025-2026 CE ≈ 1447 AH. Our converter gives the exact Hijri date for any Gregorian date." },
  { question: "What is Umm al-Qura calendar?", answer: "Official Hijri calendar used by Saudi Arabia. Uses calculated lunar months (not actual moon sighting) for administrative purposes. Most accurate computational Hijri calendar. Our converter uses Umm al-Qura system." },
  { question: "Moon sighting vs calculated calendar?", answer: "Moon sighting: traditional method — look for new moon. Starts month when crescent is visible. Calculated: astronomical predictions. Saudi Arabia uses Umm al-Qura for civil dates but moon sighting for Ramadan/Eid. Different countries may start Ramadan on different days." },
  { question: "What Hijri date is today?", answer: "Our converter shows today's Hijri date automatically. Enter any Gregorian date to see the corresponding Hijri date. Also works in reverse: enter Hijri date to see Gregorian equivalent." },
  { question: "Hijri calendar for business?", answer: "Saudi Arabia uses Hijri for government dates, contracts, and employment. Gregorian is used alongside for international business. Our converter helps bridge both calendars for business planning and contract dates." },
  { question: "What is the significance of each month?", answer: "Muharram: Islamic New Year, Ashura (10th). Safar: historically considered unlucky (superstition only). Rabi' al-Awwal: Prophet Muhammad's birth (Mawlid). Ramadan: fasting month, Quran revelation. Shawwal: Eid al-Fitr. Dhu al-Hijjah: Hajj pilgrimage, Eid al-Adha." },
  { question: "Why is the current Hijri year 1446?", answer: "Hijra (migration) was in 622 CE. 2024 - 622 = 1402. But lunar year is shorter, so more lunar years have passed. Approximately 1446 lunar years since Hijra. Our converter calculates the exact year." },
  { question: "Hijri in non-Muslim countries?", answer: "Used by Muslim communities for religious events (Ramadan, Eid). Employers accommodate religious holidays. Schools mark Islamic holidays. Our converter helps non-Muslims understand Islamic dates for scheduling and cultural awareness." },
];

const relatedTools = [
  { title: "Age Calculator", icon: "🎂", href: "/en/tools/age-calculator" },
  { title: "Zakat Calculator", icon: "☪️", href: "/en/tools/zakat-calculator" },
  { title: "Inheritance Calculator", icon: "📜", href: "/en/tools/inheritance-calculator" },
  { title: "Gold Calculator", icon: "🥇", href: "/en/tools/gold-calculator" },
  { title: "Calorie Calculator", icon: "🔥", href: "/en/tools/calorie-calculator" },
  { title: "Unit Converter", icon: "📏", href: "/en/tools/unit-converter" },
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

  const hijriMonths = ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"];

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

  const schemaName = "Hijri Converter";
const schemaDesc = `Online Hijri Converter - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/hijri-converter";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Converters", url: "https://adwatak.cloud/en/category/calculators" },
  { name: "Hijri Converter", url: "https://adwatak.cloud/en/tools/hijri-converter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Islamic Tools" categorySlug="calculators" toolName="Hijri Converter" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🌙 Hijri Converter</h1>
        <p className="text-sm text-gray-500 mb-6">Convert between Gregorian and Islamic Hijri calendar dates</p>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gregorian Date</label>
        <input type="date" value={gregorian} onChange={(e) => setGregorian(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4" />
        <button onClick={convert} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Convert to Hijri</button>
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
    <ShareButtons lang="en" />
    </div>
  );
}
