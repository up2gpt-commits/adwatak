"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هي أداة تحميل ثامبنيل يوتيوب؟", answer: "أداة مجانية تتيح لك تحميل الصور المصغرة (Thumbnails) لأي فيديو يوتيوب بجودة عالية. فقط أدخل رابط الفيديو واختر المقاس المناسب." },
  { question: "هل أحتاج لأي برامج أو اشتراكات؟", answer: "لا، الأداة مجانية 100% وتعمل مباشرة في المتصفح. لا تحتاج تثبيت برامج أو دفع اشتراكات." },
  { question: "ما مقاسات الثامبنيل المتوفرة؟", answer: "MaxRes (1920×1080) - أعلى جودة. HQ (480×360) - جودة عالية. MQ (320×180) - جودة متوسطة. SD (640×480) - جودة قياسية. اختر ما يناسبك." },
  { question: "هل الأداة قانونية؟", answer: "نعم، تحميل الثامبنيل للاستخدام الشخصي مسموح. يوتيوب يوفر الصور المصغرة بشكل عام. لكن لا تستخدمها لأغراض تجارية دون إذن." },
  { question: "كيف أحصل على رابط الفيديو؟", answer: "افتح الفيديو في يوتيوب، وانسخ الرابط من شريط العنوان (https://youtube.com/watch?v=...). الصقه في الحقل المخصص." },
  { question: "هل تدعم روابط يوتيوب المختصرة (youtu.be)؟", answer: "نعم، تدعم جميع صيغ روابط يوتيوب: youtube.com/watch?v=, youtu.be/, youtube.com/shorts/, و youtube.com/embed/." },
  { question: "هل الأداة مجانية بالكامل؟", answer: "نعم 100%. بدون تسجيل، بدون حدود تحميل، بدون إعلانات مزعجة." },
  { question: "ما أفضل مقاس للثامبنيل؟", answer: "MaxRes (1920×1080) هو أعلى جودة. لكن ليس كل الفيديوهات تمتلك ثامبنيل MaxRes. إذا لم يعمل، جرب HQ أو SD." },
  { question: "هل تعمل الأداة على الجوال؟", answer: "نعم، متوافقة مع الجوال والتابلت. واجهة responsive تعمل على جميع الأجهزة." },
  { question: "ما صيغة الصور التي أحصل عليها؟", answer: "جميع الثامبنيلات بصيغة JPG. يمكنك تحميلها مباشرة واستخدامها في أي مكان." },
  { question: "هل يمكن استخدام الثامبنيل في مشاريعي؟", answer: "للاستخدام الشخصي نعم. للاستخدام التجاري، تأكد من شروط يوتيوب وحقوق صاحب الفيديو." },
  { question: "ماذا لو لم يظهر الثامبنيل؟", answer: "تأكد من صحة رابط الفيديو. بعض الفيديوهات الخاصة أو المحذوفة لا تظهر ثامبنيلاتها. جرب مقاساً آخر." },
];

const relatedTools = [
  { title: "تغيير حجم الصور", icon: "🖼️", href: "/tools/image-resizer" },
  { title: "ضغط الصور", icon: "📦", href: "/tools/image-compressor" },
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
];

const seoContent = [
  "أداة تحميل ثامبنيل يوتيوب مجانية. أدخل رابط أي فيديو يوتيوب واحصل على الصورة المصغرة بأربع مقاسات مختلفة: MaxRes (1920×1080), HQ (480×360), MQ (320×180), SD (640×480).",
  "مثالية للمدونين ومنشئي المحتوى والمسوقين. استخدم الثامبنيلات كصور للمقالات أو العروض التقديمية أو منشورات التواصل الاجتماعي.",
  "الأداة بسيطة وسريعة: الصق الرابط، شاهد المعاينة، اختر المقاس، وحمّل. لا تحتاج حساب أو تسجيل. كل شيء مجاني.",
  "تدعم جميع صيغ روابط يوتيوب: youtube.com/watch?v=, youtu.be/, shorts, embed. تستخرج Video ID تلقائياً وتعرض الثامبنيل المناسب.",
  "نصيحة: استخدم MaxRes للحصول على أفضل جودة. إذا لم يظهر، جرب HQ. الثامبنيل عالية الجودة تحسن مظهر محتواك.",
];

function getVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function Client() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const resolutions = [
    { key: "maxresdefault", label: "MaxRes (1920×1080)", quality: "أعلى جودة" },
    { key: "hqdefault", label: "HQ (480×360)", quality: "جودة عالية" },
    { key: "mqdefault", label: "MQ (320×180)", quality: "متوسطة" },
    { key: "sddefault", label: "SD (640×480)", quality: "قياسية" },
  ];

  const handleLookup = () => {
    setError("");
    const id = getVideoId(url.trim());
    if (!id) {
      setError("الرجاء إدخال رابط يوتيوب صحيح");
      return;
    }
    setVideoId(id);
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("تحميل ثامبنيل يوتيوب", "تحميل الصور المصغرة لفيديوهات يوتيوب بجودة عالية مجاناً", "https://adwatak.cloud/tools/youtube-thumbnail-downloader", "ar", "Image Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات صور",url:"https://adwatak.cloud/tools/image"},{name:"تحميل ثامبنيل يوتيوب",url:"https://adwatak.cloud/tools/youtube-thumbnail-downloader"}])} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="أدوات الصور" categorySlug="image" toolName="تحميل ثامبنيل يوتيوب" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">▶️ تحميل ثامبنيل يوتيوب</h1>
        <p className="text-sm text-gray-500 mb-6">حمِّل الصور المصغرة لفيديوهات يوتيوب بجودة عالية</p>

        <div className="flex gap-3">
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl text-sm outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleLookup()} />
          <button onClick={handleLookup} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all">🔍 بحث</button>
        </div>

        {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

        {videoId && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resolutions.map((res) => {
              const imgSrc = `https://img.youtube.com/vi/${videoId}/${res.key}.jpg`;
              return (
                <div key={res.key} className="p-4 bg-white rounded-xl border border-gray-200">
                  <img src={imgSrc} alt={res.label} className="w-full rounded-lg mb-2"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <p className="text-xs font-bold text-gray-700">{res.label}</p>
                  <p className="text-xs text-gray-500 mb-2">{res.quality}</p>
                  <a href={imgSrc} download={`thumbnail-${res.key}.jpg`}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded-xl text-xs transition-all">
                    📥 تحميل
                  </a>
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
