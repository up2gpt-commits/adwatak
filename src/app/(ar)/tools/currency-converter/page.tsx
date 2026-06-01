"use client";
import { useState, useEffect } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const currencies = [
  { code: "SAR", name: "ريال سعودي", flag: "🇸🇦" },
  { code: "AED", name: "درهم إماراتي", flag: "🇦🇪" },
  { code: "EGP", name: "جنيه مصري", flag: "🇪🇬" },
  { code: "KWD", name: "دينار كويتي", flag: "🇰🇼" },
  { code: "QAR", name: "ريال قطري", flag: "🇶🇦" },
  { code: "OMR", name: "ريال عماني", flag: "🇴🇲" },
  { code: "BHD", name: "دينار بحريني", flag: "🇧🇭" },
  { code: "JOD", name: "دينار أردني", flag: "🇯🇴" },
  { code: "TRY", name: "ليرة تركية", flag: "🇹🇷" },
  { code: "USD", name: "دولار أمريكي", flag: "🇺🇸" },
  { code: "EUR", name: "يورو", flag: "🇪🇺" },
  { code: "GBP", name: "جنيه إسترليني", flag: "🇬🇧" },
  { code: "CNY", name: "يوان صيني", flag: "🇨🇳" },
  { code: "INR", name: "روبيه هندي", flag: "🇮🇳" },
];

const faqs = [
  { question: "من أين تأتي الأسعار؟", answer: "أسعار الصرف الحية تأتي من Frankfurter API (تحديث يومي من البنك المركزي الأوروبي). الأسعار هي سعر السوق المتوسط (Mid-market rate). البنوك والصرافات تضيف هامش ربح 1-5%." },
  { question: "لماذا يختلف السعر عن تطبيقي البنكي؟", answer: "البنوك والصرافات تزيد هامش ربح على السعر. سعرنا هو سعر السوق الأساسي. البنك قد يعرض سعراً أقل بنسبة 2-3%." },
  { question: "هل العملات الخليجية مرتبطة بالدولار؟", answer: "نعم: SAR = 3.75/USD، AED = 3.67/USD، QAR = 3.64/USD، BHD = 0.376/USD، OMR = 0.384/USD. الدينار الكويتي معوم وليس مرتبطاً." },
  { question: "كم مرة تتحدث الأسعار؟", answer: "مرة يومياً (أيام الأسبوع). أسواق الصرف تغلق في عطلة نهاية الأسبوع." },
  { question: "هل الأداة مجانية؟", answer: "نعم 100%. الأسعار الحية مجاناً من API مفتوح." },
  { question: "كيف أحصل على أفضل سعر صرف؟", answer: "تجنب صرافات المطارات (2-5% هامش). استخدم البنوك الإلكترونية أو تطبيقات التحويل (مثل Wise, STC Pay). تواصل مع البنك للمبالغ الكبيرة." },
];

const relatedTools = [
  { title: "حاسبة الضريبة", icon: "🏛️", href: "/tools/vat-calculator" },
  { title: "حاسبة هامش الربح", icon: "📈", href: "/tools/profit-margin" },
  { title: "حاسبة الذهب", icon: "🥇", href: "/tools/gold-calculator" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
];

const seoContent = [
  "محوّل العملات الحية — أسعار صرف محدثة يومياً لأكثر من 14 عملة عربية وعالمية. أدخل المبلغ واختر العملتين للحصول على السعر الفوري.",
  "أسعار الصرف من Frankfurter API (البنك المركزي الأوروبي). تدعم: ريال سعودي، درهم إماراتي، دولار، يورو، جنيه، وأكثر.",
  "مثالية للتخطيط للسفر، التحويلات البنكية، والتجارة الإلكترونية. الأسعار محدثة يومياً.",
  "استخدم المحول لمعرفة قيمة نقودك قبل السفر أو الشراء من مواقع أجنبية.",
];

export default function CurrencyConverter() {
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
      // Use our server-side proxy to avoid CORS issues
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
        setError("تعذر الحصول على سعر الصرف");
      }
    } catch {
      setError("تعذر الاتصال بخدمة الأسعار");
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

  const schemaName = "محوّل العملات";
  const schemaDesc = "أسعار صرف حية — محدثة يومياً";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/currency-converter";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "محولات", url: "https://adwatak.cloud/tools/converters" },
    { name: "محوّل العملات", url: "https://adwatak.cloud/tools/currency-converter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "ar", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="محولات" categorySlug="converters" toolName="محوّل العملات" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">💱 محوّل العملات</h1>
        <p className="text-sm text-gray-500 mb-6">أسعار صرف حية — محدثة يومياً</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">المبلغ</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1,000" />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">من</label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">إلى</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
                {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
              </select>
            </div>
          </div>

          {loading && <p className="text-sm text-gray-400 text-center">⏳ جاري تحميل الأسعار...</p>}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {result !== null && !loading && !error && (
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <p className="text-xs text-green-600">{parseFloat(amount || "0").toLocaleString("ar-SA")} {from} =</p>
              <p className="text-3xl font-black text-green-900 my-2">{result.toLocaleString("ar-SA", { maximumFractionDigits: 2 })} {to}</p>
              <p className="text-xs text-gray-500">سعر الصرف: 1 {from} = {(rate || 0).toFixed(6)} {to}</p>
              {lastUpdated && <p className="text-xs text-gray-400 mt-1">📅 آخر تحديث: {lastUpdated}</p>}
            </div>
          )}

          {!loading && !error && rate === null && (
            <p className="text-sm text-gray-400 text-center">هذه العملة غير مدعومة في المصدر. جرب زوجاً آخر.</p>
          )}
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
