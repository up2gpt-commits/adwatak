"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هي استخدامات Base64؟", answer: "ترميز الصور في HTML/CSS (Data URL)، نقل الملفات في JSON/API، تخزين كلمات المرور المشفرة (مع Salt)، إرسال مرفقات البريد الإلكتروني (MIME)، وتخزين البيانات الثنائية في قواعد البيانات." },
  { question: "هل Base64 تشفير آمن؟", answer: "لا! Base64 ترميز (Encoding) وليس تشفير (Encryption). أي شخص يمكنه فك الترميز بسهولة. لا تستخدمه لحماية بيانات سرية — استخدم AES أو RSA للتشفير الحقيقي. Base64 للتمثيل فقط." },
  { question: "لماذا حجم الملف يزداد عند ترميز Base64؟", answer: "Base64 يستخدم 64 حرفاً فقط لتمثيل 6 بتات من البيانات، فيحتاج 33% مساحة إضافية. ملف 75 كيلوبايت يصبح 100 كيلوبايت بعد الترميز. كل 3 بايتات → 4 أحرف Base64." },
  { question: "ما الفرق بين Base64 و Base64 URL Safe؟", answer: "Base64 العادي يستخدم + و / قد يسببان مشاكل في URL. Base64 URL Safe يستخدم - و _ بدلاً منهما. للاستخدام في URL/Cookies، استخدم URL Safe encoding." },
  { question: "هل يمكن ترميز الصور بـ Base64؟", answer: "نعم، لكن يفضل للصور الصغيرة فقط (أقل من 10KB). الصور الكبيرة تزيد حجم HTML/JS بشكل كبير. مثال: <img src='data:image/png;base64,iVBOR...'>." },
  { question: "كيف أحول صورة لـ Base64؟", answer: "استخدم أداة تحويل الصور لـ Base64 (قريباً في أدواتك). حالياً، استخدم الأداة للنصوص والمقاطع النصية. للصور، ارفعها في مواقع مثل base64-image.de." },
  { question: "ما هي الأحرف المستخدمة في Base64؟", answer: "26 حرف كبير (A-Z) + 26 حرف صغير (a-z) + 10 أرقام (0-9) + + و / = 64 حرف. علامة = تستخدم كـ Padding في النهاية." },
  { question: "هل Base64 يستخدم في JWT Tokens؟", answer: "نعم، JWT (JSON Web Token) يستخدم Base64 URL Safe لترميز الـ Header والـ Payload. لكن التوقيع (Signature) يستخدم تشفير HMAC أو RSA — وهو آمن." },
  { question: "كيف أحل مشكلة النص الطويل في الـ API؟", answer: "الـ APIs تقبل Base64 للنصوص الكبيرة. إذا كان النص أكبر من 1MB، فكر في تقسيمه أو استخدام Upload مباشر للملف بدلاً من Base64." },
  { question: "هل متصفحات Internet Explorer القديمة تدعم Base64؟", answer: "IE 10+ يدعم btoa() و atob(). IE 9- لا يدعمها. للمتصفحات القديمة جداً، استخدم مكتبة polyfill." },
  { question: "ما فائدة Base64 في CSS؟", answer: "يمكن تضمين صور صغيرة (أيقونات، خلفيات بسيطة) مباشرة في CSS دون طلب HTTP إضافي. هذا يقلل عدد الطلبات ويحسن سرعة تحميل الصفحة. استخدمه للصور تحت 5KB." },
  { question: "كيف أحول Base64 لـ PDF؟", answer: "تحتاج مكتبة عميل مثل jsPDF. أو حول Base64 لـ Blob: const blob = new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], {type: 'application/pdf'}); ثم أنشئ URL للتحميل." },
];

const relatedTools = [
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "Hash Generator", icon: "#️⃣", href: "/tools/hash-generator" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "QR Code Generator", icon: "🔳", href: "/tools/qr-generator" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
];

const seoContent = [
  "Base64 Encoder/Decoder يقوم بترميز وفك ترميز النصوص باستخدام نظام Base64 — المعيار العالمي لتمثيل البيانات الثنائية كنص قابل للقراءة. يُستخدم بشكل واسع في تطوير الويب ونقل البيانات عبر APIs.",
  "يُستخدم Base64 في: ترميز الصور في HTML/CSS كـ Data URL، نقل الملفات في REST APIs، تخزين كلمات المرور المشفرة، وإرسال مرفقات البريد الإلكتروني. كل شيء يعمل في متصفحك بدون رفع بيانات لأي سيرفر.",
  "كيف يعمل: كل 3 بايتات من البيانات (24 بت) تُقسم إلى 4 مجموعات كل منها 6 بتات. كل 6 بتات تُمثل بحرف واحد من 64 حرفاً مسموحاً. النتيجة: زيادة 33% في حجم البيانات.",
  "مثال: النص 'Hello' (5 بايت) → 'SGVsbG8=' (8 أحرف Base64). النص 'مرحباً' → ترميز أطول لأن العربية تحتاج UTF-8 (كل حرف 2-3 بايت).",
  "تذكير أمني مهم: Base64 ليس تشفيراً. لا تستخدمه لحماية كلمات المرور أو البيانات السرية. أي شخص يرى النص المشفر يمكنه فك ترميزه في ثانية. استخدم bcrypt أو Argon2 لتخزين كلمات المرور.",
  "نصيحة للمطورين: استخدم btoa() للتشفير و atob() لفك التشفير في JavaScript. لكن احذر — btoa() لا يدعم UTF-8 مباشرة. استخدم encodeURIComponent/decodeURIComponent للتأكد من دعم العربية."
];

export default function Client() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const encode = () => setResult({ output: btoa(unescape(encodeURIComponent(input))), type: "encoded" });
  const decode = () => {
    try { setResult({ output: decodeURIComponent(escape(atob(input))), type: "decoded" }); }
    catch { setResult({ output: "خطأ: النص ليس Base64 صالح", type: "error" }); }
  };

  const schemaName = "Base64 Encoder/Decoder";
const schemaDesc = `Online Base64 Encoder/Decoder - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/base64-encoder";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "تطوير ويب", url: "https://adwatak.cloud/category/calculators" },
  { name: "Base64 Encoder/Decoder", url: "https://adwatak.cloud/tools/base64-encoder" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="تطوير ويب" categorySlug="dev" toolName="Base64 Encoder/Decoder" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔄 Base64 Encoder/Decoder</h1>
        <p className="text-sm text-gray-500 mb-6">تشفير وفك تشفير Base64</p>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full h-[150px] p-4 border-2 border-gray-200 rounded-xl text-sm outline-none font-mono resize-y"
          placeholder="أدخل النص هنا..." />
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button onClick={encode}
            className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-base cursor-pointer">
            تشفير (Encode)
          </button>
          <button onClick={decode}
            className="bg-gray-50 text-blue-600 font-bold p-3 rounded-xl border-2 border-blue-600 text-base cursor-pointer">
            فك تشفير (Decode)
          </button>
        </div>
      </div>
      {result && (
        <div className={`rounded-xl p-5 mb-6 border ${result.type === "error" ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
          <p className={`text-xs mb-2 ${result.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {result.type === "error" ? "خطأ" : "النتيجة"}
          </p>
          <pre className="m-0 whitespace-pre-wrap font-mono text-sm break-all">{result.output}</pre>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
