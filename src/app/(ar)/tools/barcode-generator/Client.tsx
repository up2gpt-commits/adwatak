"use client";
import { useState, useRef } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const barcodeTypes = [
  { value: "code128", label: "Code 128", desc: "أكواد كثيفة — يدعم كل الحروف ASCII" },
  { value: "code39", label: "Code 39", desc: "يدعم حروف وأرقام — بسيط وشائع" },
  { value: "ean13", label: "EAN-13", desc: "المواصفات الأوروبية — 13 رقم" },
  { value: "ean8", label: "EAN-8", desc: "المواصفات الأوروبية المختصرة — 8 أرقام" },
  { value: "upc", label: "UPC-A", desc: "المواصفات الأمريكية — 12 رقم" },
  { value: "codabar", label: "Codabar", desc: "المكتبات — الرعاية الصحية" },
  { value: "itf14", label: "ITF-14", desc: "العبوات الكرتونية — 14 رقم" },
  { value: "pharmacode", label: "Pharmacode", desc: "صناعة الأدوية" },
];

const faqs = [
  { question: "ما الفرق بين أنواع الباركود المختلفة؟", answer: "Code 128: الأكثر شيوعاً للمنتجات الصغيرة، كثافة عالية (يدعم كل ASCII). EAN-13: للمنتجات الأوروبية، 13 رقم. UPC-A: للمنتجات الأمريكية، 12 رقم. Code 39: للصناعة. اختر حسب متطلبات متجرك أو شريكتك." },
  { question: "كيف أحصل على رقم باركود للمنتج؟", answer: "الشركات العضوة في GS1 تحصل على GTIN (رقم المنتج العالمي). للأفراد: بعض الأسواق (أمازون، نون) تسمح بباركود خاص. أو اشتر باركود GS1 من مكتبك المحلي (في السعودية: GS1 Saudi Arabia)." },
  { question: "هل الباركود المولد يعمل على المنتجات الحقيقية؟", answer: "نعم، إذا كان الرقم مسجلاً في نظام GS1. الباركود نفسه مجرد تمثيل بصري للرقم — السحّابة (Scanner) تقرأ الرقم والرقم هو المهم. إذا استخدمت رقماً غير مسجل، سحّابة المتجر قد لا تتعرف عليه." },
  { question: "هل يدعم الباركود الأرقام فقط؟", answer: "حسب النوع. Code 128: يدعم أرقاماً وحروفاً ورموزاً. Code 39: أرقام وحروف كبيرة. EAN/UPC: أرقام فقط (كل منها بعدد معين من الأرقام). Codabar: أرقام + حروف A-D." },
  { question: "ما هو الحد الأدنى لحجم الباركود للطباعة؟", answer: "20 × 20 مم للباركود العادي. 30 × 15 مم للباركود المسطح. اطبع بدقة 300 DPI على الأقل. اختبر المسح من مسافة 10-30 سم. التباين العالي (أسود على أبيض) ضروري." },
  { question: "كيف أستخدم الباركود للمخزون؟", answer: "اطبع ملصقات باركود لكل منتج. الصقها على العبوات. استخدم سحّابة (Scanner) لقراءة الباركود عند البيع والاستلام. أنظمة المخزون (مثل Odoo، Zoho) تدعم الباركود." },
  { question: "ما الفرق بين الباركود والـ QR Code؟", answer: "الباركود: خطوط أحادية البعد (1D)، يخزن 20-30 حرفاً، يُقرأ بالليزر، شائع في المتاجر. QR Code: ثنائي البعد (2D)، يخزن حتى 4,296 حرف، يُقرأ بالكاميرا، أشمل للاستخدامات الحديثة." },
  { question: "هل الباركود ينتهي صلاحيته؟", answer: "لا، الباركود صورة ثابتة — لا ينتهي أبداً. لكن الرقم الذي يمثله قد ينتهي إذا سحبته GS1 من السوق. طالما الرقم مسجل، الباركود صالح للأبد." },
  { question: "هل يمكن طباعة الباركود بآلة عادية؟", answer: "نعم، اطبع بصورة عادية. استخدم طابعة ليزر لجودة أفضل. الطابعة الحرارية (Thermal) هي الأفضل للإنتاج الكمي. ورق A4 لاصق متوفر في مكتبات القرطاسية." },
  { question: "لماذا الباركود مهم للتجارة الإلكترونية؟", answer: "أمازون، نون، متاجر التجزئة تطلب باركود لكل منتج. الباركود يسرع المخزون 10×. يقلل الأخطاء البشرية (بدون كتابة أرقام يدوية). كل منتج له رقم فريد — لا لبس." },
];

const relatedTools = [
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
  { title: "قارئ QR Code", icon: "📷", href: "/tools/qr-reader" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "مولد أرقام عشوائية", icon: "🎲", href: "/tools/random-number" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
];

const seoContent = [
  "مولد الباركود يساعدك على إنشاء باركود احترافي لأي منتج أو رقم. اختر نوع الباركود (Code 128, EAN-13, UPC-A, Code 39)، أدخل الرقم، واحصل على باركود جاهز للطباعة بصيغة SVG. مجاني تماماً.",
  "أنواع الباركود المدعومة: Code 128 (الأكثر شيوعاً، كثافة عالية)، EAN-13 (للمنتجات الأوروبية)، UPC-A (للمنتجات الأمريكية)، Code 39 (للصناعة)، EAN-8، Codabar، ITF-14، Pharmacode. اختر النوع المناسب لاحتياجك.",
  "الباركود (Barcode) هو تمثيل بصري للبيانات على شكل خطوط متوازية بعرض مختلف. يُقرأ بواسطة الماسحات الضوئية في المتاجر والمستودعات. كل منتج في السوق له رقم باركود فريد (GTIN).",
  "استخدامات الباركود: تجارة التجزئة (عدّ المنتجات عند الدفع)، إدارة المخزون (تتبع الكميات)، الشحن والخدمات اللوجستية (تتبع الطرود)، الرعاية الصحية (تحديد الأدوية والمرضى)، المكتبات (فهرسة الكتب).",
  "الباركود يختلف عن QR Code: الباركود يخزن 20-30 حرفاً فقط (رقم المنتج). QR Code يخزن آلاف الأحرف. الباركود أسرع في المسح في المتاجر. QR Code أفضل للروابط والنصوص الطويلة.",
  "الأداة مجانية بالكامل، تولد الباركود في المتصفح بصيغة SVG (قابلة للتكبير بدون فقدان الجودة). حمّل الباركود كصورة واطبعها مباشرة."
];

export default function Client() {
  const [text, setText] = useState("5901234123457");
  const [type, setType] = useState("code128");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(60);
  const [barcodeSvg, setBarcodeSvg] = useState("");
  const svgRef = useRef<HTMLDivElement>(null);

  const generateBarcode = async () => {
    if (!text.trim()) return;
    try {
      const JsBarcode = (await import("jsbarcode")).default;
      
      // Create SVG element in memory
      const ns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(ns, "svg");
      svg.setAttribute("width", "300");
      svg.setAttribute("height", String(height + 40));

      JsBarcode(svg, text, {
        format: type,
        width: width,
        height: height,
        displayValue: true,
        fontSize: 16,
        margin: 10,
        background: "#ffffff",
        lineColor: "#000000",
      });

      setBarcodeSvg(svg.outerHTML);
    } catch (err) {
      setBarcodeSvg("<p style='color:red'>خطأ في توليد الباركود. تأكد من صحة المدخلات.</p>");
    }
  };

  const downloadSvg = () => {
    if (!barcodeSvg) return;
    const blob = new Blob([barcodeSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode-${text.slice(0, 8)}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const schemaName = "مولد الباركود";
  const schemaDesc = `Online مولد الباركود - free tool`;
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/barcode-generator";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "مولدات", url: "https://adwatak.cloud/category/calculators" },
    { name: "مولد الباركود", url: "https://adwatak.cloud/tools/barcode-generator" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="مولدات" categorySlug="generators" toolName="مولد الباركود" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📊 مولد الباركود</h1>
        <p className="text-sm text-gray-500 mb-6">إنشاء باركود احترافي لأي منتج</p>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">الرقم أو النص</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none font-mono" placeholder="5901234123457" />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">نوع الباركود</label>
          <select value={type} onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
            {barcodeTypes.map(t => <option key={t.value} value={t.value}>{t.label} — {t.desc}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">عرض الخط (px)</label>
            <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 2)} min="1" max="10"
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">الارتفاع (px)</label>
            <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 60)} min="20" max="200"
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" />
          </div>
        </div>

        <button onClick={generateBarcode}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          توليد الباركود
        </button>

        {barcodeSvg && (
          <div className="mt-6 p-6 bg-white rounded-xl border border-gray-200 text-center">
            <div ref={svgRef} dangerouslySetInnerHTML={{ __html: barcodeSvg }} />
            <button onClick={downloadSvg}
              className="mt-4 bg-green-600 text-white font-bold p-3 rounded-xl border-none text-base cursor-pointer">
              ⬇ تحميل SVG
            </button>
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
