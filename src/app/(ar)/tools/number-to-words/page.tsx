"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";

const ones = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
const tens = ["", "", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
const hundreds = ["", "مائة", "مائتان", "ثلاثمائة", "أربعمائة", "خمسمائة", "ستمائة", "سبعمائة", "ثمانمائة", "تسعمائة"];

function convertArabic(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  if (n < 100) { const t = Math.floor(n / 10), o = n % 10; return o ? ones[o] + " و" + tens[t] : tens[t]; }
  if (n < 1000) { const h = Math.floor(n / 100), rest = n % 100; return hundreds[h] + (rest ? " و" + convertArabic(rest) : ""); }
  if (n < 1000000) { const th = Math.floor(n / 1000), rest = n % 1000; return convertArabic(th) + " ألف" + (rest ? " و" + convertArabic(rest) : ""); }
  if (n < 1000000000) { const m = Math.floor(n / 1000000), rest = n % 1000000; return convertArabic(m) + " مليون" + (rest ? " و" + convertArabic(rest) : ""); }
  return "رقم كبير جداً";
}

const faqs = [
  { question: "ما هو أكبر رقم يمكن تحويله؟", answer: "حتى 999,999,999 (تسعمائة وتسعة وتسعون مليون وتسعمائة وتسعة وتسعون ألف وتسعمائة وتسعة وتسعون). الأرقام الأكبر تحتاج مكتبة متخصصة لقواعد اللغة العربية المعقدة." },
  { question: "لماذا أحتاج تحويل الأرقام لحروف؟", answer: "في الشيكات والفواتير والعقود يُشترط كتابة المبلغ رقماً وحرفاً لمنع التلاعب والتزوير. كثير من البنوك والمحاكم تطلب التوقيع على الصيغة الحرفية أيضاً." },
  { question: "هل يدعم الأرقام العشرية؟", answer: "نعم، الأرقام العشرية مثل 1500.50 تتحول إلى 'ألف وخمسمائة فاصلة خمسون من مائة'. الجزء العشري يكتب بشكل منفصل." },
  { question: "كيف أكتب رقماً كبيراً جداً مثل 1,000,000؟", answer: "1,000,000 = مليون. 10,000,000 = عشرة ملايين. 100,000,000 = مائة مليون. 1,000,000,000 = مليار (غير مدعوم في هذه الأداة لأنها تحتاج قواعد مختلفة)." },
  { question: "كيف أكتب مليون وخمسمائة ألف بالعربية؟", answer: "1,500,000 = مليون وخمسمائة ألف. في اللغة العربية، العدد يتبع المعدود في التذكير والتأنيث." },
  { question: "هل أداة تحويل الأرقام لحروف دقيقة؟", answer: "نعم، تستخدم الأداة قواعد اللغة العربية للعدد والمعدود. لكن الاستثناءات اللغوية (مثل المائة بدلاً من مئة) قد تختلف حسب اللهجة. معظم النتائج دقيقة للاستخدام الرسمي." },
  { question: "ما الفرق بين 'مائة' و 'مئة'؟", answer: "كلاهما صحيح. 'مائة' هي الأكثر شيوعاً في الكتابة الرسمية والشيكات. 'مئة' تستخدم في بعض السياقات. أداتنا تستخدم 'مائة' لأنها الأشهر." },
  { question: "كيف أكتب 1050 بالعربية؟", answer: "ألف وخمسون. العدد 1050 يكتب بدون 'و' لأن 50 لا 'ألف' قبله. أما 1500 = ألف وخمسمائة (مع 'و' للفصل)." },
  { question: "هل الفاصلة العشرية مدعومة؟", answer: "نعم، تدعم الأرقام العشرية. مثال: 99.99 → تسعة وتسعون فاصلة تسعة وتسعون من مائة. الجزء المائة يُكتب بشكل منفصل." },
  { question: "هل يدعم الأرقام السالبة؟", answer: "لا، الأداة مصممة للأرقام الموجبة فقط (صفر فأكبر). المستخدمة في المبالغ المالية والفواتير." },
];

const relatedTools = [
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "حاسبة الضريبة", icon: "🏛️", href: "/tools/vat-calculator" },
  { title: "عداد الكلمات", icon: "📝", href: "/tools/word-counter" },
  { title: "تحويل حالة النص", icon: "🔤", href: "/tools/text-case" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
  { title: "حاسبة الذهب", icon: "🥇", href: "/tools/gold-calculator" },
];

const seoContent = [
  "أداة تحويل الأرقام إلى كلمات عربية تكتب أي رقم بالعربية بالتمام. أدخل الرقم واحصل عليه مكتوباً بالكلمات العربية الفصحى — مثلاً 1500 → 'ألف وخمسمائة'. تدعم الأرقام حتى 999,999,999.",
  "هذه الأداة ضرورية لكتابة الشيكات والفواتير الرسمية حيث يُشترط كتابة المبلغ بالأرقام والحروف. كثير من البنوك والجهات الحكومية في السعودية والخليج تطلب ذلك لمنع التزوير والتلاعب.",
  "تدعم الأداة الأرقام الصحيحة والعشرية. الأرقام العشرية تتحول إلى: الرقم الصحيح + 'فاصلة' + الجزء العشري. مثال: 1500.50 → 'ألف وخمسمائة فاصلة خمسون من مائة'.",
  "القواعد اللغوية المستخدمة: الأعداد من 1-19 لها أشكال خاصة، العشرات (20-90) لها قواعد موحدة، المئات تتبع قاعدة المذكر والمؤنث. الأداة تغطي معظم القواعد الشائعة.",
  "تطبيقات عملية: فواتير البيع والشراء، عقود الإيجار والبيع، الشيكات المصرفية، اتفاقيات القروض، إيصالات الاستلام، ووثائق المحكمة والأحوال الشخصية.",
  "نصيحة: عند كتابة الشيكات، تأكد من كتابة المبلغ بالحروف بطريقة لا تترك فراغات يمكن التلاعب بها. الأفضل ربط الكلمات وعدم ترك فراغات."
];

export default function NumberToWords() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    const n = parseFloat(number);
    if (isNaN(n) || n < 0) { setResult("أدخل رقماً صحيحاً"); return; }
    const intPart = Math.floor(n);
    const decPart = Math.round((n - intPart) * 100);
    let text = convertArabic(intPart);
    if (decPart > 0) text += " و" + convertArabic(decPart) + " من مائة";
    setResult(text);
  };

  const schemaName = "تحويل الأرقام لحروف";
const schemaDesc = `Online تحويل الأرقام لحروف - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/number-to-words";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "تحويل الأرقام لحروف", url: "https://adwatak.cloud/tools/number-to-words" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="text" toolName="تحويل الأرقام لحروف" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔢 تحويل الأرقام لحروف</h1>
        <p className="text-sm text-gray-500 mb-6">الأرقام إلى كلمات عربية (1500 → ألف وخمسمائة)</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">الرقم</label>
          <input type="number" value={number} onChange={(e) => setNumber(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1500" />
        </div>
        <button onClick={convert}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          حوّل
        </button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200 mb-6">
          <p className="text-xs text-green-600 mb-2">النتيجة</p>
          <p className="text-xl font-bold text-green-900">{result}</p>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    </div>
  );
}
