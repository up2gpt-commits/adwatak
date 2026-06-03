"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "كم كلمة يحتاج المقال للترتيب في Google؟", answer: "الحد الأدنى 300 كلمة للصفحات العادية. للمقالات الشاملة (Pillar Content): 2,000-4,000 كلمة. لكن جودة المحتوى أهم بكثير من العدد. مقال 500 كلمة مفيد قد يتفوق على مقال 2,000 كلمة مليء بحشو." },
  { question: "هل عداد الكلمات يدعم العربية والإنجليزية؟", answer: "نعم، يدعم كل اللغات والنصوص المختلطة. يعد الكلمات والحروف والجمل والفقرات بدقة عالية. يعمل بشكل ممتاز مع العربية والإنجليزية والنصوص المختلطة." },
  { question: "ما هي كثافة الكلمة المفتاحية المثالية لـ SEO؟", answer: "1-2% من إجمالي النص. مثال: مقال 1,000 كلمة → الكلمة المفتاحية 10-20 مرة كحد أقصى. أكثر من 3% يعتبر 'حشو كلمات مفتاحية' (Keyword Stuffing) وقد يعاقبك Google." },
  { question: "هل الروابط تحسب ككلمات؟", answer: "لا، الروابط لا تحسب ضمن عدد الكلمات. فقط النص المرئي يُحتسب. لو عندك رابط طويل، لا يؤثر على إحصاء الكلمات." },
  { question: "ما هو عدد الكلمات المثالي لوصف المنتج؟", answer: "150-300 كلمة لوصف المنتج. 80-150 كلمة للوصف المختصر (Meta Description). 300-500 كلمة للصفحات الرئيسية. لمتاجر التجزئة: وصف دقيق وموجز." },
  { question: "كيف تحسن كثافة الكلمات المفتاحية؟", answer: "استخدم الكلمة المفتاحية في: العنوان الرئيسي (H1)، أول 100 كلمة من المحتوى، عنوان فرعي واحد على الأقل (H2)، الـ Meta Description، وURL الصفحة. لا تكررها أكثر من اللازم." },
  { question: "ما الفرق بين عدد الكلمات والحروف للمحتوى العربي؟", answer: "الحرف العربي يعد حرفاً واحداً بغض النظر عن شكله (منفصل، أول الكلمة، وسط، آخر). الكلمة العربية تتكون من حرفين فأكثر. اللغة العربية تحتاج عدد حروف أقل من الإنجليزية لنفس المعنى." },
  { question: "ما هو أفضل طول للمحتوى في المدونات؟", answer: "المقالات القصيرة (300-600 كلمة): للأخبار السريعة. المتوسطة (1,000-2,000): لشروحات مفصلة. الطويلة (2,000-4,000): للمحتوى الشامل. أكثر من 4,000: للمحتوى المرجعي. كلما زاد المحتوى جودةً، زاد احتمال الترتيب الأول." },
  { question: "كيف أستخدم عداد الكلمات لتحسين محتواي؟", answer: "1) اكتب المحتوى أولاً. 2) استخدم عداد الكلمات لتعرف عدد الكلمات. 3) لو أقل من 300 كلمة، وسّع المحتوى. 4) تأكد من تنوع الفقرات (3-5 جمل لكل فقرة). 5) استخدم عداد الجمل للتأكد من تنوع طول الجمل." },
  { question: "هل حساب الفقرات مهم؟", answer: "نعم، الفقرات القصيرة (3-5 جمل) أفضل للقراءة على الشاشة. المحتوى المكون من فقرة واحدة طويلة يصعب قراءته ويقلل وقت البقاء على الصفحة. استخدم عداد الفقرات لتحسين تنسيق محتواك." },
];

const relatedTools = [
  { title: "تحويل حالة النص", icon: "🔤", href: "/tools/text-case" },
  { title: "تحويل الأرقام لحروف", icon: "🔢", href: "/tools/number-to-words" },
  { title: "مولد النص العربي", icon: "📃", href: "/tools/arabic-lorem" },
  { title: "تنظيف النص", icon: "🧹", href: "/tools/text-cleaner" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "عداد حروف السوشيال", icon: "📱", href: "/tools/social-character-counter" },
];

const seoContent = [
  "عداد الكلمات والحروف هو أداة أساسية للكتّاب والطلاب والمترجمين ومتخصصي SEO. يساعدك على معرفة عدد الكلمات والحروف والجمل والفقرات في نصك بدقة فورية. فقط الصق نصك أو اكتبه مباشرة في الحقل.",
  "لتحسين SEO: المحتوى العربي المثالي يجب أن يكون 300 كلمة كحد أدنى وتصل إلى 2,000 كلمة للموضوعات الشاملة. كثافة الكلمة المفتاحية المثالية 1-2%. استخدم العداد لتحسين محتواك قبل النشر.",
  "يدعم العداد النصوص العربية والإنجليزية والمختلطة. يمكنك لصق نص من أي مصدر (Word، Google Docs، مواقع) والحصول على إحصائيات فورية: عدد الكلمات، الحروف (مع وبدون مسافات)، الجمل، والفقرات.",
  "مثال: مقال 500 كلمة + 10 صور + فيديو = محتوى متوازن. مقال 2,000 كلمة يحتاج 15-20 صورة وفيديو واحد على الأقل. المحتوى الطويل بدون وسائط بصرية يصعب قراءته ويقلل التفاعل.",
  "للطلاب: عداد الكلمات يساعدك على التأكد من أن مقالك أو بحثك يفي بالمتطلبات الأكاديمية لعدد الكلمات. كثير من الجامعات تشترط حداً أدنى وأقصى لعدد الكلمات في الأبحاث والتقارير.",
  "نصيحة SEO: لا تركز على عدد الكلمات فقط. جودة المحتوى أهم من الكم. مقال 500 كلمة مفيد ومباشر قد يتفوق على مقال 3,000 كلمة مليء بالتكرار والحشو. اكتب للإنسان أولاً ثم لمحركات البحث."
];

export default function Client() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?؟。]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
  const readingTime = Math.max(1, Math.ceil(words / 200)); // avg 200 words/min

  const schemaName = "عداد الكلمات والحروف";
const schemaDesc = `Online عداد الكلمات والحروف - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/word-counter";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "أدوات نصية", url: "https://adwatak.cloud/category/calculators" },
  { name: "عداد الكلمات والحروف", url: "https://adwatak.cloud/tools/word-counter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="text" toolName="عداد الكلمات والحروف" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📝 عداد الكلمات والحروف</h1>
        <p className="text-sm text-gray-500 mb-6">احسب عدد الكلمات والحروف والجمل والفقرات</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[200px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="الصق نصك هنا..." />
        <div className="grid grid-cols-5 gap-3 mt-4">
          {[
            { l: "كلمات", v: words },
            { l: "حروف", v: chars },
            { l: "حروف بدون مسافات", v: charsNoSpaces },
            { l: "جمل", v: sentences },
            { l: "وقت القراءة", v: `${readingTime} دقيقة` },
          ].map((r, i) => (
            <div key={i} className={`rounded-xl p-4 text-center border ${i === 4 ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-200"}`}>
              <p className="text-xs text-gray-500">{r.l}</p>
              <p className="text-xl font-extrabold text-gray-900">{typeof r.v === "number" ? r.v.toLocaleString("ar-SA") : r.v}</p>
            </div>
          ))}
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
