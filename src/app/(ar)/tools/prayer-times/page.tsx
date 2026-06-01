"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const cities = [
  "الرياض", "جدة", "مكة", "المدينة", "الدمام", "الخبر", "تبوك", "أبها", "حائل", "القصيم",
  "القاهرة", "الإسكندرية", "دبي", "أبوظبي", "الدوحة", "مسقط", "الكويت", "المنامة", "عمان",
  "إسطنبول", "لندن", "نيويورك", "واشنطن",
];

const countryMap: Record<string, string> = {
  "الرياض": "Saudi Arabia", "جدة": "Saudi Arabia", "مكة": "Saudi Arabia", "المدينة": "Saudi Arabia",
  "الدمام": "Saudi Arabia", "الخبر": "Saudi Arabia", "تبوك": "Saudi Arabia", "أبها": "Saudi Arabia",
  "حائل": "Saudi Arabia", "القصيم": "Saudi Arabia",
  "القاهرة": "Egypt", "الإسكندرية": "Egypt",
  "دبي": "UAE", "أبوظبي": "UAE",
  "الدوحة": "Qatar", "مسقط": "Oman", "الكويت": "Kuwait", "المنامة": "Bahrain", "عمان": "Jordan",
  "إسطنبول": "Turkey", "لندن": "United Kingdom", "نيويورک": "United States", "واشنطن": "United States",
};

const faqs = [
  { question: "ما هي مواقيت الصلاة الخمس؟", answer: "الفجر (قبل الشروق)، الظهر (بعد الزوال مباشرة — منتصف النهار)، العصر (بعد الظهر)، المغرب (بعد غروب الشمس مباشرة)، العشاء (بعد غياب الشفق الأحمر)." },
  { question: "لماذا تختلف المواقع في أوقات الصلاة؟", answer: "بسبب اختلاف طرق الحساب: أم القرى (السعودية): فجر 18.5°، عشاء — (يتبع المغرب بـ 90 دقيقة). الهيئة المصرية: فجر 19.5°، عشاء 17.5°. الفرق 2-5 دقائق." },
  { question: "هل المواقيت دقيقة؟", answer: "نسبة دقة عالية. الأداة تستخدم API حية من Aladhan.com. قد تختلف عن التقويم المحلي بدقيقة أو دقيقتين حسب طريقة الحساب." },
  { question: "هل يمكن استخدامها للسفر؟", answer: "اختر المدينة الوجهة وستحصل على الأوقات حسب توقيتها المحلي." },
  { question: "هل الأداة مجانية؟", answer: "نعم، مجانية 100%. البيانات تجلب من API مفتوح." },
];

const relatedTools = [
  { title: "اتجاه القبلة", icon: "🧭", href: "/tools/qibla-direction" },
  { title: "تحويل هجري ميلادي", icon: "📅", href: "/tools/hijri-converter" },
  { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
  { title: "حاسبة الميراث", icon: "📜", href: "/tools/inheritance-calculator" },
];

const seoContent = [
  "أداة مواقيت الصلاة تستخدم API حية لعرض أوقات الصلاة الخمس لأكثر من 20 مدينة عربية وعالمية. اختر المدينة واحصل على الأوقات المحدثة.",
  "مواقيت الصلاة تتغير يومياً. الفجر، الظهر، العصر، المغرب، العشاء — كلها محدثة حسب موقعك المختار.",
  "الأداة مجانية، تدعم العربية، وتستخدم Aladhan API للحصول على أدق الأوقات.",
];

const prayerNames = ["الفجر", "الشروق", "الظهر", "العصر", "المغرب", "العشاء"];

export default function PrayerTimes() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [times, setTimes] = useState<Record<string, string> | null>(null);
  const [date, setDate] = useState("");
  const [method, setMethod] = useState("4");

  const lookup = async () => {
    if (!city) return;
    setLoading(true);
    setTimes(null);
    try {
      const country = countryMap[city] || "Saudi Arabia";
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`
      );
      const data = await res.json();
      if (data.code === 200) {
        const t = data.data.timings;
        const d = data.data.date.readable;
        setTimes(t);
        setDate(d);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const schemaName = "مواقيت الصلاة";
  const schemaDesc = "أوقات الصلاة حسب مدينتك — API حية";
  const schemaCategory = "Islamic";
  const schemaUrl = "https://adwatak.cloud/tools/prayer-times";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "أدوات إسلامية", url: "https://adwatak.cloud/tools/islamic" },
    { name: "مواقيت الصلاة", url: "https://adwatak.cloud/tools/prayer-times" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "ar", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="أدوات إسلامية" categorySlug="islamic" toolName="مواقيت الصلاة" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🕐 مواقيت الصلاة</h1>
        <p className="text-sm text-gray-500 mb-6">أوقات الصلاة حسب مدينتك — محدثة يومياً</p>

        <div className="flex gap-2 mb-4">
          <select value={city} onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
            <option value="">اختر مدينة</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={method} onChange={(e) => setMethod(e.target.value)}
            className="w-36 p-3 border-2 border-gray-200 rounded-xl text-sm outline-none font-inherit bg-white">
            <option value="4">أم القرى</option>
            <option value="5">مصر</option>
            <option value="3">مكة</option>
            <option value="2">إسلامي</option>
          </select>

          <button onClick={lookup} disabled={loading || !city}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all cursor-pointer border-none">
            {loading ? "⏳" : "🔍 بحث"}
          </button>
        </div>

        {times && (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400 mb-1">📅 {date} — {city}</p>
            {prayerNames.map((name) => {
              const time = times[name];
              if (!time) return null;
              const key = name === "الفجر" ? "Fajr" : name === "الشروق" ? "Sunrise" : name === "الظهر" ? "Dhuhr" : name === "العصر" ? "Asr" : name === "المغرب" ? "Maghrib" : "Isha";
              return (
                <div key={key}
                  className={`flex justify-between items-center rounded-xl p-4 px-5 border ${name === "المغرب" || name === "الفجر" ? "bg-orange-50 border-orange-200" : "bg-gray-50 border-gray-200"}`}>
                  <span className="font-semibold text-gray-700">{name}</span>
                  <span className="text-xl font-extrabold text-blue-900 font-mono">{time}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
