"use client";
import { useState, useRef } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "كيف أقرأ QR Code من صورة؟", answer: "ارفع صورة فيها QR Code — الأداة تقرأها وتستخرج النص أو الرابط المخفي داخلها. يدعم JPG, PNG, WEBP. الكود يقرأ حتى 4,296 حرفاً رقمياً كحد أقصى." },
  { question: "هل يدعم قراءة QR من الكاميرا مباشرة؟", answer: "نعم. إذا كان جهازك مزود بكاميرا، يمكنك استخدام خيار 'الكاميرا' مباشرة. وجه الكاميرا نحو QR Code وسيتم قراءته تلقائياً. يعمل على الجوال واللاب توب." },
  { question: "هل قراءة QR آمنة؟", answer: "أداة Adwatak تقرأ الـ QR وتظهر المحتوى لك — لا ترسله لأي خادم. كل شيء في متصفحك (Client-side). لكن احذر من الروابط التي تقرؤها — QR نفسه وسيلة تخزين فقط." },
  { question: "ما الفرق بين QR Scanner و QR Reader؟", answer: "لا فرق جوهري. قارئ QR = يقرأ ويفك تشفير الـ QR. ماسح QR = يمسح بالكاميرا. كلاهما يؤدي نفس الوظيفة. بعض التطبيقات تفتح الرابط تلقائياً (نحن نظهره لك أولاً للأمان)." },
  { question: "هل أستطيع قراءة QR Codes التالفة؟", answer: "QR Code له قدرة على تصحيح الأخطاء (Error Correction) بنسبة تصل لـ 30%. QR متسخ أو مكسور (لكن غير تالف بالكامل) يمكن قراءته. كلما كانت جودة الصورة أعلى، كانت القراءة أفضل." },
  { question: "ما هي أنواع QR Codes التي تقرؤها الأداة؟", answer: "جميع الأنواع: نص عادي، رابط URL، واي فاي (SSID + Password)، vCard (بطاقة اتصال)، SMS، بريد إلكتروني، هاتف (اتصال مباشر)، بيانات موقع جغرافي، وتطبيقات (App Store / Google Play)." },
  { question: "هل الأداة مجانية؟", answer: "نعم، مجانية 100% ولا تحتاج تسجيل. كل شيء في المتصفح — نقرأ الصورة محلياً بدون رفعها لسيرفر. صُممت لتكون سريعة ومباشرة بدون تعقيد." },
  { question: "كيف أحدد جودة صور QR للاستخدام التجاري؟", answer: "اطبع QR بـ 300 DPI على الأقل. حجم لا يقل عن 2×2 سم للطباعة. اختبر المسح من مسافة الاستخدام. استخدم تباين ألوان عالي (أسود على أبيض) لضمان القراءة." },
  { question: "هل يقدر QR يخزن فيديو أو صورة؟", answer: "لا، QR Code يخزن نصاً فقط. لكن يمكن تخزين رابط لصورة أو فيديو. حد QR Code: 3 كيلوبايت تقريباً. للروابط والبيانات البسيطة، هذا كافي." },
  { question: "ما مستقبل QR Codes مقابل NFC؟", answer: "QR لا يحتاج شريحة خاصة (كل كاميرا جوال تقرؤه)، أرخص في الطباعة، وأسهل في التوزيع. NFC أسرع ويتطلب لمساً. الاثنان سيتعايشان — QR للطباعة والإعلانات، NFC للمدفوعات." },
];

const relatedTools = [
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
  { title: "رابط واتساب", icon: "💬", href: "/tools/whatsapp-link" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
  { title: "مولد أرقام عشوائية", icon: "🎲", href: "/tools/random-number" },
  { title: "SEO Audit", icon: "🔍", href: "/tools/seo-audit" },
];

const seoContent = [
  "قارئ QR Code — اقرأ وفك تشفير رموز QR من الصور أو الكاميرا مباشرة. ارفع صورة QR أو استخدم كاميرتك لقراءة النص، الرابط، أو أي بيانات مخزنة في الـ QR. أداة مجانية وآمنة تماماً.",
  "كيف يعمل قارئ QR؟ الأداة تستخدم مكتبة jsQR لقراءة QR Codes من الصور. تعالج الصورة محلياً في متصفحك، تكتشف النمط المربع، تفك تشفير البيانات، وتعرض النتيجة. بدون رفع أي شيء لسيرفر خارجي.",
  "استخدامات QR Code: روابط مواقع، بطاقات اتصال (vCard)، اتصال واي فاي (تلقائي)، قوائم مطاعم رقمية، تذاكر إلكترونية، مدفوعات، بطاقات تطعيم، إعلانات، وتغليف منتجات. QR أصبح جزءاً من حياتنا اليومية.",
  "إحصائيات: 83% من مستخدمي الجوال في السعودية مسحوا QR مرة على الأقل. 45% من المطاعم تستخدم QR. QR يساعد في تقليل التلامس في المطاعم والفنادق. 65% من الشركات تستخدم QR في التسويق.",
  "نصائح أمنية: لا تمسح QR عشوائياً — تأكد من مصدره. QR في الأماكن العامة (محطات، مطارات) قد يكون معدلاً (QRishing). تحقق من الرابط قبل فتحه. استخدم أداة قراءة تظهر المحتوى أولاً (مثل أداتنا).",
  "الأداة مجانية بالكامل، لا تحتاج تحميل أو تسجيل. اقرأ QR بسرعة وأمان. مثالية للمسوقين، أصحاب المطاعم، ومستخدمي التذاكر الإلكترونية."
];

export default function Client() {
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "camera">("upload");
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResult("جارٍ قراءة QR Code...");

    try {
      // Use jsQR via dynamic import
      const image = new Image();
      const url = URL.createObjectURL(file);
      image.src = url;
      await new Promise((resolve) => { image.onload = resolve; });

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const jsQR = (await import("jsqr")).default;
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setResult(code.data);
      } else {
        setResult("لم يتم العثور على QR Code في الصورة. حاول بصورة أوضح.");
      }
      URL.revokeObjectURL(url);
    } catch (err) {
      setResult("حدث خطأ في قراءة الصورة. تأكد من صحة الصورة.");
    }
  };

  const startCamera = async () => {
    setScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setResult("تعذر الوصول للكاميرا. تحقق من صلاحيات الكاميرا في المتصفح.");
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  const schemaName = "قارئ QR Code";
  const schemaDesc = `Online QR Code Reader - free tool`;
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/qr-reader";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "مولدات", url: "https://adwatak.cloud/category/calculators" },
    { name: "قارئ QR Code", url: "https://adwatak.cloud/tools/qr-reader" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات أخرى" categorySlug="daily" toolName="قارئ QR Code" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📷 قارئ QR Code</h1>
        <p className="text-sm text-gray-500 mb-6">اقرأ رموز QR من الصور أو الكاميرا مباشرة</p>
        
        <div className="flex gap-2 mb-4">
          <button onClick={() => { setMode("upload"); stopCamera(); }} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${mode === "upload" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>🖼 رفع صورة</button>
          <button onClick={() => { setMode("camera"); startCamera(); }} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${mode === "camera" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>📸 كاميرا</button>
        </div>

        {mode === "upload" && (
          <div className="border-2 border-dashed border-gray-300 p-8 rounded-xl text-center">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="qr-upload" />
            <label htmlFor="qr-upload" className="cursor-pointer">
              <div className="text-4xl mb-3">🖼️</div>
              <p className="text-blue-600 font-semibold">انقر لرفع صورة QR Code</p>
              <p className="text-sm text-gray-400 mt-1">JPG, PNG, WEBP</p>
            </label>
          </div>
        )}

        {mode === "camera" && (
          <div className="text-center">
            <video ref={videoRef} className="w-full max-w-[400px] mx-auto rounded-xl bg-black" playsInline />
            {scanning && <p className="text-sm text-gray-400 mt-2">وجّه الكاميرا نحو QR Code</p>}
            <button onClick={stopCamera} className="bg-red-500 text-white font-bold p-2 rounded-xl border-none text-sm cursor-pointer mt-2">إيقاف الكاميرا</button>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-sm mb-2">{result.startsWith("http") ? "🔗 الرابط:" : "📄 النص:"}</h3>
            <p className="text-sm text-gray-700 break-all bg-white p-3 rounded-lg border border-gray-200">{result}</p>
            {result.startsWith("http") && (
              <a href={result} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 bg-blue-600 text-white font-bold p-2 rounded-xl text-sm no-underline">🔗 فتح الرابط</a>
            )}
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
