"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const limits: Record<string, number> = { "Twitter/X": 280, "Instagram": 2200, "TikTok": 300, "Snapchat": 80, "LinkedIn": 3000, "Threads": 500 };

const faqs = [
  { question: "ما حدود الحروف في كل منصة؟", answer: "Twitter/X: 280 حرف. Instagram: 2,200 حرف. TikTok: 300 حرف. Snapchat: 80 حرف. LinkedIn: 3,000 حرف. Threads: 500 حرف. لكل منصة حد مختلف، اختار المنصة قبل الكتابة." },
  { question: "هل الهاشتاق يحسب كحرف؟", answer: "نعم، كل حرف في النص يحسب بما فيها # و @ وعلامات الترقيم والمسافات. النص بالكامل يُحتسب ضمن الحد المسموح." },
  { question: "ماذا يحدث إذا تجاوزت الحد المسموح؟", answer: "العداد يتحول للأحمر ويظهر رقم سالب في المتبقي. المنصة قد تمنع النشر أو تقطع النص. حافظ على النص ضمن الحد المسموح للمنصة." },
  { question: "كيف أكتب تغريدة طويلة دون تجاوز 280 حرف؟", answer: "استخدم Thread (سلسلة تغريدات) — اكتب 1/3، 2/3، 3/3. أو استخدم Twitter Notes للكتابة الطويلة. اختصر النص قدر الإمكان — 280 حرف تحتاج مهارة كتابة." },
  { question: "لماذا Instagram يسمح بـ 2,200 حرف بينما Twitter 280؟", answer: "كل منصة لها فلسفة مختلفة: Twitter يركز على السرعة والمباشرة (280 حرف كافي لخبر). Instagram يركز على المحتوى البصري والنص الوصفي (2,200 حرف للوصف)." },
  { question: "هل المسافات تحسب كحروف؟", answer: "نعم، كل مسافة تحسب كحرف واحد. في Twitter، المسافات تستهلك من الـ 280 حرف. استخدم المسافات بحكمة." },
  { question: "ما هو أفضل طول للتغريدة؟", answer: "71-100 حرف تحصل على أعلى تفاعل (46% أكثر من التغريدات القصيرة جداً). التغريدات 190-280 حرف تحصل على مشاركات أكثر. لا تطيل أكثر من اللازم." },
  { question: "هل يختلف حساب الحروف بين العربية والإنجليزية؟", answer: "كل حرف عربي أو إنجليزي يحسب كحرف واحد. لكن الحروف العربية أعرض في المساحة البصرية — 280 حرف عربي يعادل ~140 حرف إنجليزي في العرض." },
  { question: "كيف أخطط للتغريدة المثالية؟", answer: "1) اكتب الفكرة الرئيسية أولاً. 2) اختصر لأقل عدد كلمات. 3) استخدم عداد الحروف. 4) أضف هاشتاق واحد أو اثنين (لا تزيد). 5) أضف صورة أو GIF لزيادة التفاعل." },
  { question: "هل تغيرت حدود الحروف مؤخراً؟", answer: "Twitter رفع الحد من 140 لـ 280 في 2017. Instagram Creator Account قد يسمح بـ 4,000 حرف. LinkedIn يسمح بـ 3,000. تحقق دائماً من آخر التحديثات." },
];

const relatedTools = [
  { title: "عداد الكلمات", icon: "📝", href: "/tools/word-counter" },
  { title: "تحويل حالة النص", icon: "🔤", href: "/tools/text-case" },
  { title: "مولد النص العربي", icon: "📃", href: "/tools/arabic-lorem" },
  { title: "رابط واتساب", icon: "💬", href: "/tools/whatsapp-link" },
  { title: "تنظيف النص", icon: "🧹", href: "/tools/text-cleaner" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
];

const seoContent = [
  "عداد حروف مخصص لمنصات التواصل الاجتماعي — اعرف عدد الحروف والمتبقي قبل تجاوز الحد المسموح لكل منصة. اختر المنصة من القائمة وابدأ الكتابة. العداد يظهر فوراً.",
  "الحدود المدعومة: Twitter/X (280 حرف)، Instagram (2,200 حرف)، TikTok (300 حرف)، Snapchat (80 حرف)، LinkedIn (3,000 حرف)، Threads (500 حرف). كل منصة حسب احتياجها.",
  "كيف تستخدم العداد: اختر المنصة المستهدفة → اكتب أو الصق النص → العداد يظهر عدد الحروف والمتبقي باللون الأخضر (آمن)، الأصفر (وشك تخلص)، أو الأحمر (تجاوزت الحد).",
  "للمسوقين: استخدم العداد للتأكد من أن منشوراتك ضمن الحد قبل النشر. المنشورات التي تتجاوز الحد تُقطع أو تُرفض. هذا يحسن Professionalism علامتك التجارية.",
  "مثال: تغريدة تسويقية مثالية: '🔥 خصم 30% على أدواتك المالية! استخدم كود ADW30 — العرض ساري حتى نهاية الشهر. #أدواتك #عروض' = 69 حرف — ضمن الحد ومؤثرة."
];

export default function Client() {
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState("Twitter/X");
  const limit = limits[platform] || 280;
  const remaining = limit - text.length;

  const schemaName = "عداد حروف السوشيال";
const schemaDesc = `Online عداد حروف السوشيال - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/social-character-counter";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "أدوات نصية", url: "https://adwatak.cloud/category/calculators" },
  { name: "عداد حروف السوشيال", url: "https://adwatak.cloud/tools/social-character-counter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات أخرى" categorySlug="daily" toolName="عداد حروف السوشيال" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📱 عداد حروف السوشيال</h1>
        <p className="text-sm text-gray-500 mb-6">عداد حروف Twitter, Instagram, TikTok والمزيد</p>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white mb-4">
          {Object.keys(limits).map(p => <option key={p} value={p}>{p} ({limits[p]} حرف)</option>)}
        </select>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[150px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="اكتب نصك هنا..." />
        <div className="flex justify-between mt-3">
          <span className={`text-xs ${remaining < 0 ? "text-red-600" : "text-gray-500"}`}>الحروف: {text.length} / {limit}</span>
          <span className={`text-xs font-bold ${remaining < 0 ? "text-red-600" : remaining < 50 ? "text-yellow-600" : "text-green-600"}`}>المتبقي: {remaining}</span>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
