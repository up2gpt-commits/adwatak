"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما الفرق بين HEX وRGB وHSL؟", answer: "HEX = نظام سداسي عشري (#FF0000 للأحمر). RGB = Red, Green, Blue (0-255 لكل لون). HSL = Hue (درجة اللون 0-360°), Saturation (0-100%), Lightness (0-100%). كلها تمثل نفس اللون بطرق مختلفة." },
  { question: "كيف أستخدم منتقي الألوان؟", answer: "اضغط على مربع اللون لفتح منتقي الألوان في متصفحك. اختر أي لون — سيتحول تلقائياً بين HEX وRGB وHSL. يمكنك أيضاً كتابة HEX يدوياً." },
  { question: "ما هو اللون HEX #3b82f6؟", answer: "#3b82f6 هو لون أزرق فاتح (Blue-500 في نظام Tailwind CSS). يستخدم بكثرة في واجهات المستخدم (UI) الحديثة كلون أساسي للأزرار والروابط." },
  { question: "كيف أحول RGB لـ HEX؟", answer: "كل قيمة RGB (0-255) تحول لـ Hex (00-FF). مثال: R=59 → 3B, G=130 → 82, B=246 → F6 → #3B82F6. استخدم أداة تحويل الألوان — تفعل ذلك تلقائياً." },
  { question: "لماذا يحتاج المطورون تحويل الألوان؟", answer: "لأن كل أداة ونظام يستخدم تنسيقاً مختلفاً: CSS يقبل HEX وRGB وHSL. Photoshop/Sketch/Figma تستخدم HEX. مكتبات التصميم (Tailwind, Bootstrap) تستخدم HEX. APIs أحياناً تطلب RGB." },
  { question: "ما معنى Hue في HSL؟", answer: "Hue = درجة اللون على عجلة الألوان: 0° = أحمر، 60° = أصفر، 120° = أخضر، 180° = سايان، 240° = أزرق، 300° = أرجواني، 360° = أحمر مرة أخرى. هذا يسمح بتغيير اللون الأساسي بسهولة." },
  { question: "كيف أختار ألوان متناسقة لموقعي؟", answer: "استخدم عجلة الألوان: ألوان متقابلة (Complementary — 180° فرق) تعطي تبايناً قوياً. ألوان متجاورة (Analogous — 30° فرق) تعطي انسجاماً. ألوان متباعدة (Triadic — 120° فرق) توازن." },
  { question: "ما هو اللون الآمن للويب (Web Safe Colors)؟", answer: "216 لوناً كانت تدعمها الشاشات القديمة (256 لون). اليوم كل الشاشات تدعم ملايين الألوان. لكن بعض الألوان الزاهية جداً قد تظهر مختلفة بين شاشة وأخرى (خاصة مع HDR)." },
  { question: "كيف أعرف أن لونين متناسقين؟", answer: "استخدم HSL: غير Hue بـ 60° أو 120° أو 180° مع ثبات Saturation وLightness. مثال: #3b82f6 (H=217). H=277 → أرجواني، H=337 → وردي. هذه ألوان متناسقة مع نفس الكثافة." },
  { question: "هل يوجد معيار لاختيار ألوان العلامة التجارية؟", answer: "نعم، اختر 3-5 ألوان رئيسية: لون أساسي (Primary) للماركة، لون ثانوي (Secondary)، لون خلفية (Background)، ولون نص (Text). حافظ على ثبات الألوان عبر كل منصاتك." },
];

const relatedTools = [
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "Hash Generator", icon: "#️⃣", href: "/tools/hash-generator" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "QR Code Generator", icon: "🔳", href: "/tools/qr-generator" },
];

const seoContent = [
  "أداة تحويل الألوان بين HEX وRGB وHSL مع معاينة حية. اختر أي لون باستخدام منتقي الألوان أو اكتب كود HEX — ستحصل على القيم المحولة فوراً مع معاينة اللون.",
  "HEX (Hexadecimal) هو التنسيق الأكثر شيوعاً في CSS وHTML. RGB (Red Green Blue) يستخدم في CSS ومعالج الصور. HSL (Hue Saturation Lightness) أسهل للفهم البشري — يسمح بتعديل اللون والكثافة والإضاءة بشكل بديهي.",
  "للمطورين: استخدم الأداة لتحويل ألوان التصميم من Figma/Photoshop (HEX) لـ CSS (RGB أو HSL). لمصممي UI: جرب ألواناً مختلفة وانسخ القيم المناسبة. لكل من يعمل بالألوان: اعرض أي لون بثلاث تنسيقات مختلفة.",
  "مثال: الأزرق الكلاسيكي #3B82F6 → RGB: 59,130,246 → HSL: 217°, 91%, 60%. الأحمر #FF0000 → RGB: 255,0,0 → HSL: 0°, 100%, 50%. الأخضر #00FF00 → RGB: 0,255,0 → HSL: 120°, 100%, 50%.",
  "نصيحة لمصممي UI: استخدم HSL لتوليد درجات ألوان متناسقة بسرعة. غير L (Lightness) بنسب ثابتة (95% للخلفيات، 50% للعناصر الأساسية، 20% للنصوص) مع ثبات H و S — تحصل على لوحة ألوان متكاملة.",
  "الأداة تعمل بالكامل في المتصفح وتدعم جميع المتصفحات الحديثة."
];

export default function Client() {
  const [hex, setHex] = useState("#3b82f6");
  const [result, setResult] = useState<any>(null);

  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16);
    const g = parseInt(h.slice(3, 5), 16);
    const b = parseInt(h.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const convert = () => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setResult({ hex, rgb, hsl });
  };

  const schemaName = "تحويل الألوان";
const schemaDesc = `Online تحويل الألوان - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/color-converter";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "محولات", url: "https://adwatak.cloud/category/calculators" },
  { name: "تحويل الألوان", url: "https://adwatak.cloud/tools/color-converter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="محولات" categorySlug="converters" toolName="تحويل الألوان" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🎨 تحويل الألوان</h1>
        <p className="text-sm text-gray-500 mb-6">تحويل بين HEX وRGB وHSL مع معاينة</p>
        <div className="flex gap-3 items-end mb-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">لون HEX</label>
            <input type="color" value={hex} onChange={(e) => setHex(e.target.value)}
              className="w-full h-12 border-2 border-gray-200 rounded-xl cursor-pointer" />
          </div>
          <div className="flex-[2]">
            <input type="text" value={hex} onChange={(e) => setHex(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none font-mono" placeholder="#3b82f6" />
          </div>
          <button onClick={convert}
            className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none cursor-pointer font-inherit">
            حوّل
          </button>
        </div>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <p className="text-xs text-gray-500">HEX</p>
            <p className="text-lg font-bold font-mono">{result.hex}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <p className="text-xs text-gray-500">RGB</p>
            <p className="text-lg font-bold font-mono">{result.rgb.r}, {result.rgb.g}, {result.rgb.b}</p>
          </div>
          <div className="rounded-xl p-4 text-center border border-gray-200" style={{ background: result.hex, minHeight: "60px" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>المعاينة</p>
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
