"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const arabicMale = ["محمد", "أحمد", "يوسف", "عمر", "خالد", "سعيد", "إبراهيم", "عبدالله", "فهد", "سلطان", "ناصر", "بندر", "تركي", "سعود", "ماجد", "وليد", "طارق", "حمد", "رائد", "بدر"];
const arabicFemale = ["فاطمة", "مريم", "نورة", "سلمى", "هند", "سارة", "ريم", "لينا", "دانة", "لمى", "وجدان", "هيفاء", "أمل", "منال", "رانيا", "ديما", "غادة", "هيا", "أسماء", "ليلى"];
const englishMale = ["James", "John", "Robert", "Michael", "David", "William", "Chris", "Daniel", "Matthew", "Anthony"];
const englishFemale = ["Mary", "Patricia", "Jennifer", "Linda", "Sarah", "Jessica", "Emma", "Olivia", "Sophia", "Isabella"];

const faqs = [
  { question: "هل الأسماء حقيقية؟", answer: "نعم، كل الأسماء حقيقية ومستخدمة في العالم العربي والغربي. الأسماء العربية من أشهر الأسماء في المملكة والخليج. الإنجليزية شائعة في أمريكا وبريطانيا." },
  { question: "هل يمكن اختيار ذكور أو إناث فقط؟", answer: "نعم، اختر 'ذكور' أو 'إناث' من القائمة المنسدلة. الافتراضي ذكور. يمكن توليد حتى 20 اسم في المرة." },
  { question: "ما الفرق بين الأسماء العربية والإنجليزية؟", answer: "الأسماء العربية: محمد، أحمد، فاطمة، سارة. الإنجليزية: John, Emma, Chris. تعكس الثقافتين المختلفتين. استخدم العربية للمشاريع العربية والإنجليزية للمشاريع الدولية." },
  { question: "كم عدد الأسماء المتوفرة؟", answer: "أكثر من 40 اسم عربي أصيل (20 ذكر + 20 أنثى) و20 اسم إنجليزي. نخطط لإضافة المئات في التحديثات القادمة." },
  { question: "للكتّاب: كيف أستخدم المولد؟", answer: "توليد أسماء لشخصيات رواياتك، أبطال قصصك، أو أسماء مستعارة للكتابة. اختر العربية للقصص المحلية والإنجليزية للقصص العالمية." },
  { question: "للمطورين: كيف أستخدم المولد؟", answer: "توليد أسماء وهمية لبيانات اختبار (Test Data)، أسماء مستخدمين تجريبية، أو شخصيات لألعاب الفيديو. الأسماء عشوائية لكنها طبيعية." },
  { question: "للآباء الجدد: هل الأسماء مناسبة؟", answer: "نعم، كل الأسماء عربية أصيلة ومنتشرة. لكن استشر شريك حياتك أولاً! المولد يعطيك اقتراحات — القرار النهائي لك." },
  { question: "هل يمكن إعادة توليد نفس الأسماء؟", answer: "احتمالية منخفضة لأننا نختار عشوائياً. إذا ظهر اسم يعجبك، اكتبه قبل إعادة التوليد. لا يوجد حفظ تلقائي." },
];

const relatedTools = [
  { title: "مولد أرقام عشوائية", icon: "🎲", href: "/tr/tools/random-number" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tr/tools/password-generator" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tr/tools/invoice-generator" },
  { title: "حاسبة العمر", icon: "🎂", href: "/tr/tools/age-calculator" },
  { title: "مولد QR Code", icon: "🔳", href: "/tr/tools/qr-generator" },
  { title: "رابط واتساب", icon: "💬", href: "/tr/tools/whatsapp-link" },
];

const seoContent = [
  "مولد الأسماء يُولّد أسماء عربية وإنجليزية عشوائية — مثالية للكتّاب، مطوري الألعاب، الآباء الباحثين عن أسماء لأطفالهم، والمبرمجين الذين يحتاجون بيانات اختبار.",
  "يتضمن أشهر الأسماء العربية الأصيلة: محمد، أحمد، عمر، فاطمة، مريم، سارة، والأسماء الإنجليزية الشائعة: John, Mary, James, Emma. اختر اللغة والنوع وعدد الأسماء.",
  "تطبيقات عملية: اختيار أسماء لشخصيات رواية أو قصة، توليد بيانات وهمية لاختبار التطبيقات، اقتراح أسماء للمواليد الجدد، وإنشاء أسماء مستخدمين عشوائية.",
  "كل اسم يظهر في كارت منفصل — يسهل قراءته ونسخه. اضغط 'ولّد' لتحصل على مجموعة جديدة من الأسماء. جرب أكثر من مرة لترى تشكيلات مختلفة.",
  "الأداة مجانية بالكامل، تدعم العربية والإنجليزية، وتعمل في المتصفح بدون حفظ بيانات."
];

export default function Client() {
  const [count, setCount] = useState("5");
  const [gender, setGender] = useState("male");
  const [lang, setLang] = useState("tr");
  const [names, setNames] = useState<string[]>([]);

  const generate = () => {
    const pool = lang === "tr" ? (gender === "male" ? arabicMale : arabicFemale) : (gender === "male" ? englishMale : englishFemale);
    const result: string[] = [];
    for (let i = 0; i < parseInt(count); i++) result.push(pool[Math.floor(Math.random() * pool.length)]);
    setNames(result);
  };

  const schemaName = "مولد أسماء";
const schemaDesc = `Online مولد أسماء - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tr/tools/name-generator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "مولدات", url: "https://adwatak.cloud/category/calculators" },
  { name: "مولد أسماء", url: "https://adwatak.cloud/tr/tools/name-generator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="tr" category="مولدات" categorySlug="generators" toolName="مولد أسماء" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👤 مولد أسماء</h1>
        <p className="text-sm text-gray-500 mb-6">توليد أسماء عربية وإنجليزية</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">العدد</label>
            <input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="20"
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">اللغة</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
              <option value="tr">عربي</option><option value="en">إنجليزي</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">النوع</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
              <option value="male">ذكور</option><option value="female">إناث</option>
            </select>
          </div>
        </div>
        <button onClick={generate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          ولّد
        </button>
      </div>
      {names.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {names.map((n, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 px-5 border border-gray-200 font-semibold text-gray-700">{n}</div>
          ))}
        </div>
      )}
      <SEOContent content={seoContent} lang="tr" />
      <FAQSection faqs={faqs} lang="tr" />
      <RelatedTools tools={relatedTools} lang="tr" />
    <ShareButtons lang="tr" />
    </div>
  );
}
