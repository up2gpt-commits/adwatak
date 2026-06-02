"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هو نصاب الذهب للزكاة؟", answer: "نصاب الذهب هو 85 جراماً من الذهب الخالص (24 قيراط). إذا امتلكت هذا المقدار أو أكثر وحال عليه الحول (سنة هجرية كاملة)، تلزمك زكاة بنسبة 2.5% من قيمته السوقية. مثال: 85 جرام × 350 ريال = 29,750 ريال (النصاب النقدي للذهب)." },
  { question: "كيف أحسب قيمة الذهب بالجرام؟", answer: "سعر الجرام = سعر الأونصة (أوقية) ÷ 31.1 × نسبة النقاء. مثال: سعر الأونصة 2,000 دولار، عيار 21 (87.5% نقاء) = 2,000 ÷ 31.1 × 0.875 = 56.37 دولار للجرام. لتحويلها للريال: اضرب في 3.75 = 211.39 ريال." },
  { question: "ما هي أنواع عيارات الذهب؟", answer: "24 قيراط = 99.9% ذهب خالص. 22 قيراط = 91.7% ذهب. 21 قيراط = 87.5% ذهب (الأشهر في السعودية والخليج). 18 قيراط = 75% ذهب (الأشهر في أوروبا). 14 قيراط = 58.3% ذهب. كلما قل العيار، زادت نسبة المعادن الأخرى المخلوطة." },
  { question: "هل المصنعية تدخل في حساب الزكاة؟", answer: "اختلف العلماء: الحنابلة يرون الزكاة بالقيمة السوقية شاملة المصنعية. الجمهور (المالكي والشافعي والحنفي) يرونها بوزن الذهب الخالص فقط بدون مصنعية. الأحوط هو حسابها بالقيمة الكاملة خروجاً من الخلاف." },
  { question: "هل ذهب الزينة عليه زكاة؟", answer: "اختلف العلماء: الحنابلة يوجبون الزكاة على ذهب الزينة المستعمل إذا بلغ النصاب. الجمهور (المالكي والشافعي والحنفي) يرون عدم وجوبها على الذهب المستعمل للزينة المعتادة. الأحوط إخراج الزكاة عنه." },
  { question: "كيف أحسب زكاة الذهب بالجرامات؟", answer: "مثال: عندك 200 جرام عيار 21. أولاً: احسب الذهب الخالص = 200 × (21÷24) = 175 جرام عيار 24. ثانياً: هذا يزيد عن النصاب (85 جرام). ثالثاً: قيمة الذهب = 175 × سعر الجرام اليوم. رابعاً: الزكاة = القيمة × 2.5%." },
  { question: "ما هو سعر الذهب اليوم في السعودية؟", answer: "سعر الذهب يتغير يومياً حسب البورصة العالمية. يمكنك متابعة الأسعار في المواقع المتخصصة أو تطبيقات البنوك. حاسبتنا تسمح لك بإدخال سعر الجرام يدوياً للحصول على حساب دقيق حسب سعر اليوم." },
  { question: "هل سعر الذهب يتأثر بأسعار العملات؟", answer: "نعم، سعر الذهب عالمياً مقوم بالدولار. تقلبات الدولار مقابل الريال (أو أي عملة محلية) تؤثر على سعر الذهب في السوق المحلي. ثبات سعر صرف الريال مقابل الدولار (3.75) يعني أن سعر الذهب في السعودية يتبع السعر العالمي مباشرة." },
  { question: "كيف أستثمر في الذهب في السعودية؟", answer: "طرق الاستثمار: شراء سبائك ذهبية (عيار 24) من البنوك أو محلات الصرافة المرخصة، الاستثمار في صناديق المؤشرات المتداولة للذهب (Gold ETFs) عبر البنوك السعودية، شراء العملات الذهبية (الجنيه الذهب وأونصة كنديالر). الذهب ملاذ آمن للتحوط من التضخم." },
  { question: "ما الفرق بين سبائك الذهب والجنيه الذهب؟", answer: "السبائك: تبدأ من 1 جرام حتى 1 كجم، عيار 24 (ذهب خالص)، مناسبة للاستثمار طويل المدى. الجنيه الذهب (الليرة الذهب): وزن 8 جرام عيار 21، منتشر في مصر والخليج، تستخدم أيضاً كهدية ومناسبة للادخار." },
  { question: "لماذا تختلف أسعار الذهب بين محل وآخر؟", answer: "المصنعية (أجر الصائغ) تختلف من محل لآخر — تتراوح بين 10-50 ريال للجرام حسب التصميم والمهارة. سعر الذهب نفسه (سعر الجرام الخالص) موحد عالمياً، لكن هامش ربح التاجر يختلف. قارن بين 3 محلات قبل الشراء." },
  { question: "هل الذهب المستعمل سعره أقل من الجديد؟", answer: "نعم، الذهب المستعمل سعره أقل لأنه لا يحتاج مصنعية عالية. عند بيع الذهب المستعمل، يُحسب بسعر الجرام الخالص فقط (بدون مصنعية). لهذا السبب، يُنصح بشراء السبائك لأن المصنعية فيها منخفضة جداً مقارنة بالمشغولات." },
  { question: "هل الضريبة المضافة تطبق على الذهب؟", answer: "في السعودية، تم إلغاء ضريبة القيمة المضافة (15%) على استثمارات الذهب (السبائك والعملات الذهبية) اعتباراً من مايو 2020 لتشجيع الاستثمار. المشغولات الذهبية (الزينة) تخضع لضريبة القيمة المضافة 15%." },
  { question: "كيف أعرف عيار الذهب؟", answer: "مختوم على القطعة من الداخل أو الخلف: 999 = 24 قيراط، 916 = 22 قيراط، 875 = 21 قيراط، 750 = 18 قيراط. في السعودية، كل قطعة ذهب تباع应有 ختم العيار واسم التاجر وبلد المنشأ مطابقاً للمواصفات." },
];

const relatedTools = [
  { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
  { title: "حاسبة الميراث", icon: "📜", href: "/tools/inheritance-calculator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
  { title: "حاسبة الفائدة المركبة", icon: "📈", href: "/tools/compound-interest" },
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
  { title: "تحويل هجري ميلادي", icon: "📅", href: "/tools/hijri-converter" },
];

const seoContent = [
  "حاسبة الذهب هي أداة متعددة الاستخدامات تحسب: قيمة الذهب بالجرام حسب العيار (24، 22، 21، 18 قيراط)، زكاة الذهب المستحق إخراجها، ونصاب الذهب للزكاة. كل ما تحتاجه هو إدخال الوزن بالجرام، العيار، وسعر الجرام الخالص.",
  "يُقاس الذهب بالقيراط: 24 قيراط = ذهب خالص 99.9%، 22 قيراط = 91.7% ذهب، 21 قيراط = 87.5% ذهب (الأشهر في السعودية والخليج)، 18 قيراط = 75% ذهب. عند شراء الذهب تضاف مصنعية تختلف من تاجر لآخر (بين 10-50 ريال للجرام).",
  "حساب زكاة الذهب: إذا بلغ ذهبك النصاب (85 جرام عيار 24) وحال عليه الحول الهجري — الزكاة واجبة بنسبة 2.5%. مثال: 200 جرام عيار 21 × (21÷24) = 175 جرام خالص. 175 جرام × 350 ريال = 61,250 ريال. الزكاة = 61,250 × 2.5% = 1,531 ريال.",
  "الذهب ملاذ آمن للاستثمار طويل المدى. في السعودية، يمكنك شراء سبائك ذهبية (عيار 24) من البنوك الكبرى أو محلات الصرافة المعتمدة. السبائك متوفرة بأوزان من 1 جرام حتى 1 كجم. الاستثمار في الذهب يحمي مدخراتك من التضخم وتقلبات العملات.",
  "معلومة مهمة: في السعودية، تم إلغاء ضريبة القيمة المضافة (15%) على استثمارات الذهب (السبائك والعملات الذهبية) منذ مايو 2020 لتشجيع الادخار والاستثمار. بينما المشغولات الذهبية للزينة لا تزال خاضعة للضريبة.",
  "سعر الذهب يتغير يومياً وفقاً للبورصة العالمية. حاسبتنا تتيح لك إدخال سعر الجرام الخالص يدوياً — يمكنك تحديثه يومياً حسب آخر الأسعار من مواقع تداول الذهب أو البنوك المحلية للحصول على حساب دقيق."
];

export default function Client() {
  const [grams, setGrams] = useState("");
  const [purity, setPurity] = useState("21");
  const [price, setPrice] = useState("250");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const g = parseFloat(grams);
    const p = parseFloat(purity);
    const pr = parseFloat(price);
    if (g <= 0 || pr <= 0) return;
    const pureGold = g * (p / 24);
    const value = pureGold * pr;
    const zakat = value * 0.025;
    setResult({ pureGold, value, zakat });
  };

  const schemaName = "حاسبة الذهب والزكاة";
const schemaDesc = `Online حاسبة الذهب والزكاة - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/gold-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "الحاسبات المالية", url: "https://adwatak.cloud/category/calculators" },
  { name: "حاسبة الذهب والزكاة", url: "https://adwatak.cloud/tools/gold-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة الذهب" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🥇 حاسبة الذهب والزكاة</h1>
        <p className="text-sm text-gray-500 mb-6">احسب قيمة الذهب والزكاة والنصاب حسب العيار</p>
        {[
          { label: "الوزن (جرام)", val: grams, set: setGrams, ph: "100" },
          { label: "العيار (24/22/21/18)", val: purity, set: setPurity, ph: "21" },
          { label: "سعر الجرام الخالص (ريال)", val: price, set: setPrice, ph: "250" },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
            <input type="number" value={f.val} onChange={(e) => f.set(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder={f.ph} />
          </div>
        ))}
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب
        </button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-300">
            <p className="text-xs text-yellow-700 mb-1">ذهب خالص</p>
            <p className="text-lg font-extrabold text-yellow-900">{result.pureGold.toFixed(2)} <span className="text-xs">جرام</span></p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">القيمة</p>
            <p className="text-lg font-extrabold text-green-900">{result.value.toLocaleString("ar-SA")} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">الزكاة</p>
            <p className="text-lg font-extrabold text-blue-900">{result.zakat.toLocaleString("ar-SA")} <span className="text-xs">ر.س</span></p>
          </div>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
