"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const bioStyles = [
  { id: "professional", label: "احترافي", desc: "لـ LinkedIn، ملف شخصي، CV" },
  { id: "creative", label: "إبداعي", desc: "للسوشيال ميديا، تويتر، إنستغرام" },
  { id: "simple", label: "بسيط", desc: "سطر واحد مختصر" },
  { id: "funny", label: "فكاهي", desc: "نكتة خفيفة + معلومات" },
];

const professions = [
  "مطور ويب", "مصمم جرافيك", "كاتب محتوى", "مسوق رقمي", "محاسب",
  "مهندس برمجيات", "مدرس", "مستشار أعمال", "رائد أعمال", "مصور فوتوغرافي",
  "مدير مشاريع", "محلل بيانات", "خبير SEO", "مترجم", "طبيب",
  "محامي", "مهندس معماري", "مدرب شخصي", "منتج فيديو", "مبرمج",
];

const faqs = [
  { question: "ما هو مولد السيرة الذاتية (Bio)؟", answer: "أداة مجانية تساعدك على إنشاء سيرة ذاتية مختصرة (Bio) احترافية لأي منصة. اختر نمطك، أدخل معلوماتك، واحصل على Bio جاهزة للنسخ." },
  { question: "هل يناسب لينكد إن؟", answer: "نعم، النمط الاحترافي مخصص خصيصاً لـ LinkedIn. يتضمن المسمى الوظيفي، المهارات، وخبراتك." },
  { question: "هل يناسب السوشيال ميديا؟", answer: "نعم، النمط الإبداعي مناسب لتويتر، إنستغرام، تيليجرام، وفيسبوك. قصير وجذاب." },
  { question: "هل يمكنني تعديل النص بعد التوليد؟", answer: "نعم، النص الناتج يظهر في مربع نص — يمكنك تعديله ونسخه قبل الاستخدام." },
  { question: "هل الأداة مجانية؟", answer: "نعم 100% مجانية، بدون تسجيل، بدون حدود." },
  { question: "ما طول النص المناسب لـ Bio؟", answer: "لـ LinkedIn: 100-200 كلمة. لتويتر: 160 حرفاً. لإنستغرام: 150 حرفاً. لتيليجرام: 70 حرفاً." },
  { question: "هل تدعم العربية والإنجليزية؟", answer: "نعم، الـ Bio تُولد بالعربية. للإنجليزية، اختر أدوات EN." },
  { question: "هل يمكن استخدامها للمتاجر والصفحات التجارية؟", answer: "نعم، اختر النمط الاحترافي وأضف معلومات متجرك." },
];

const relatedTools = [
  { title: "مولد الأسماء", icon: "👤", href: "/tools/name-generator" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
  { title: "رابط واتساب", icon: "💬", href: "/tools/whatsapp-link" },
];

const seoContent = [
  "مولد السيرة الذاتية (Bio Generator) يساعدك على إنشاء Bio احترافية لأي منصة. اختر النمط (احترافي، إبداعي، بسيط، فكاهي)، أدخل اسمك ومجال عملك، واحصل على نص جاهز.",
  "نماذج الـ Bio تناسب LinkedIn، Twitter، Instagram، Telegram، وفيسبوك. لكل منصة أسلوبها وطولها المثالي.",
  "الأداة مجانية، تعمل في المتصفح، بدون تسجيل. انسخ الـ Bio واستخدمها مباشرة.",
];

function generateBio(name: string, profession: string, skills: string, style: string): string {
  const skillsList = skills.split(",").map((s) => s.trim()).filter(Boolean);
  const skillsText = skillsList.length > 0 ? `مهاراتي: ${skillsList.join(" • ")}` : "";

  switch (style) {
    case "professional":
      return `${name} | ${profession}\n${skillsText}\n💼 خبرة في ${profession} — أساعد الأفراد والشركات على تحقيق أهدافهم.\n📩 للتواصل: الرجاء إرسال رسالة.`;
    case "creative":
      return `${name} ✦ ${profession}\n${skillsText}\n🚀 أحول الأفكار إلى واقع. شغوف بـ ${profession}.\n📱 بناء وتطوير — كل يوم تعلم جديد.`;
    case "simple":
      return `${name} — ${profession}. ${skillsText ? skillsText : ""}`;
    case "funny":
      const jokes = [
        `أنا ${name}، ${profession}. بكتب كود أكتر ما بكتب حروف 💻`,
        `${name} — ${profession}. أشتغل في ${profession}، مش عشان بحبه، عشان الأكل غالي 😂`,
        `${name}. ${profession}. أعمل شغلي، أسكت، وأطلع.`,
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    default:
      return `${name} — ${profession}`;
  }
}

export default function Client() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [customProfession, setCustomProfession] = useState("");
  const [skills, setSkills] = useState("");
  const [style, setStyle] = useState("professional");
  const [result, setResult] = useState("");

  const generate = () => {
    const n = name.trim() || "اسمك";
    const p = customProfession || profession || "تخصصك";
    const bio = generateBio(n, p, skills, style);
    setResult(bio);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
  };

  const schemaName = "مولد السيرة الذاتية (Bio)";
  const schemaDesc = "أنشئ سيرة ذاتية مختصرة احترافية لأي منصة";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/bio-generator";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "مولدات", url: "https://adwatak.cloud/category/generators" },
    { name: "مولد السيرة الذاتية", url: "https://adwatak.cloud/tools/bio-generator" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "ar", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="مولدات" categorySlug="generators" toolName="مولد السيرة الذاتية" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👤 مولد السيرة الذاتية (Bio)</h1>
        <p className="text-sm text-gray-500 mb-6">أنشئ Bio احترافية لأي منصة — LinkedIn، تويتر، إنستغرام</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">الاسم</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" placeholder="محمد أحمد" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">المجال/المهنة</label>
            <select value={profession} onChange={(e) => { setProfession(e.target.value); setCustomProfession(""); }}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white mb-2">
              <option value="">اختر مجالاً...</option>
              {professions.map((p) => <option key={p} value={p}>{p}</option>)}
              <option value="__other__">أخرى (اكتب يدوياً)</option>
            </select>
            {profession === "__other__" && (
              <input type="text" value={customProfession} onChange={(e) => setCustomProfession(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" placeholder="أدخل المهنة" />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">المهارات (اختياري — افصل بفاصلة)</label>
            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" placeholder="HTML, CSS, JavaScript, React" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">النمط</label>
            <div className="grid grid-cols-2 gap-2">
              {bioStyles.map((s) => (
                <button key={s.id} onClick={() => setStyle(s.id)}
                  className={`p-3 rounded-xl border-2 text-right cursor-pointer transition-all ${style === s.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                  <p className="font-bold text-sm">{s.label}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <button onClick={generate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base">
            ✨ توليد Bio
          </button>

          {result && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-700">الـ Bio الخاصة بك</p>
                <button onClick={copy} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1.5 px-4 rounded-xl text-sm transition-all cursor-pointer border-none">
                  📋 نسخ
                </button>
              </div>
              <textarea readOnly value={result}
                className="w-full h-36 p-4 border-2 border-gray-200 rounded-xl text-sm font-sans outline-none resize-y bg-gray-50"
                dir="auto" />
              <p className="text-xs text-gray-400 mt-2">انسخ النص والصقه في ملفك الشخصي على LinkedIn أو تويتر أو أي منصة</p>
            </div>
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
