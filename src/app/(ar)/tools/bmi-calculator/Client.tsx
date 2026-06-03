"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هو BMI المثالي؟", answer: "بين 18.5 و24.9 = وزن طبيعي. أقل من 18.5 = نقص وزن. 25-29.9 = زيادة وزن. 30+ = سمنة. BMI المثالي يعتمد على العمر والجنس وكتلة العضلات. المدى 18.5-24.9 هو الأكثر صحة للبالغين." },
  { question: "هل BMI دقيق؟", answer: "مؤشر عام جيد للسكان، لكنه لا يميز العضل عن الدهون. الرياضيون قد يحصلوا على BMI مرتفع رغم صحتهم. المسنون قد يحصلوا على BMI طبيعي رغم فقدان العضلات. استخدم BMI كمؤشر أولي واستشر طبيباً للتقييم الدقيق." },
  { question: "هل يختلف BMI عند الأطفال؟", answer: "نعم، يُستخدم مخططات نمو مختلفة حسب العمر والجنس للأطفال. حاسبتنا للبالغين فقط (18 سنة وأكبر). لأطفالك، استشر طبيب الأطفال واستخدم مخططات منظمة الصحة العالمية (WHO)." },
  { question: "كيف أحسب BMI بنفسي؟", answer: "BMI = الوزن (كجم) ÷ (الطول بالمتر)². مثال: وزن 80 كجم، طول 1.75 م → BMI = 80 ÷ (1.75 × 1.75) = 26.1 (زيادة وزن). أو استخدم حاسبتنا — أدخل وزنك وطولك وستحصل على النتيجة فوراً." },
  { question: "ما الفرق بين BMI ومحيط الخصر؟", answer: "BMI مقياس عام للوزن نسبة للطول. محيط الخصر مقياس للدهون الحشوية (الخطيرة على الصحة). قد يكون BMI طبيعياً لكن محيط الخصر كبير — وهذا خطر. الرجال: محيط خصر صحي أقل من 94 سم. النساء: أقل من 80 سم." },
  { question: "هل BMI يختلف بين الرجال والنساء؟", answer: "نفس المقاييس تنطبق على الرجال والنساء (18.5-24.9 طبيعي). لكن النساء عادةً لديهن نسبة دهون أعلى قليلاً من الرجال عند نفس BMI. للنساء، النصف الأدنى من النطاق الطبيعي (18.5-22) قد يكون أفضل." },
  { question: "ماذا أفعل إذا كان BMI مرتفعاً؟", answer: "حاول خفض وزنك تدريجياً (0.5-1 كجم أسبوعياً): قلل السكريات والمقليات، زد الخضروات والبروتين، مارس الرياضة 30 دقيقة يومياً على الأقل، اشرب ماء كافي، ونم 7-8 ساعات. استشر أخصائي تغذية لوضع خطة مخصصة." },
  { question: "ماذا أفعل إذا كان BMI منخفضاً؟", answer: "نقص الوزن قد يسبب ضعف المناعة وهشاشة العظام. زد سعراتك الحرارية بأكل صحي (مكسرات، أفوكادو، ألبان كاملة الدسم)، مارس تمارين مقاومة لبناء العضلات، وتناول وجبات صغيرة متكررة. استشر طبيباً لاستبعاد أسباب طبية." },
  { question: "هل BMI ينطبق على كمال الأجسام؟", answer: "لا، لأن العضلات أثقل من الدهون. رياضي كمال أجسام وزنه 100 كجم وطوله 1.8 م → BMI = 30.8 (سمنة!) لكنه في الواقع رياضي بدهون منخفضة. بدلاً من BMI، استخدم قياس نسبة الدهون بالكالبر أو جهاز Inbody." },
  { question: "ما أفضل وقت لقياس الوزن والطول؟", answer: "الوزن: في الصباح بعد الحمام وقبل الأكل والشرب، بدون ملابس ثقيلة. الوزن يتقلب 1-2 كجم خلال اليوم بسبب الماء والطعام. الطول: يُقاس مرة فقط لأنه لا يتغير في البالغين. قياس دقيق للطول ضروري لنتيجة BMI صحيحة." },
  { question: "هل الحمل يؤثر على BMI؟", answer: "نعم، BMI للحامل غير دقيق. زيادة الوزن الطبيعية أثناء الحمل 11-16 كجم. يُستخدم أسبوع الحمل لتقييم الزيادة وليس BMI. بعد الولادة، يمكن العودة لاستخدام BMI بعد 6-8 أسابيع." },
  { question: "متى يكون BMI غير قابل للتطبيق؟", answer: "عند كبار السن (فوق 65 سنة) لأنهم يفقدون كتلة عضلية — BMI طبيعي قد يخفي ساركوبينيا (هزال عضلي). عند الرياضيين المحترفين. عند الحوامل. عند الأطفال (تحت 18 سنة). في هذه الحالات استشر مختصاً للتقييم الصحيح." },
];

const relatedTools = [
  { title: "حاسبة العمر", icon: "🎂", href: "/tools/age-calculator" },
  { title: "حاسبة السعرات", icon: "🔥", href: "/tools/calorie-calculator" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
];

const seoContent = [
  "حاسبة مؤشر كتلة الجسم (BMI) تحسب مدى ملاءمة وزنك لطولك بمعادلة بسيطة: الوزن (كجم) ÷ (الطول بالمتر × الطول بالمتر). مؤشر كتلة الجسم هو المعيار العالمي الأولي لتقييم الوزن وتصنيفه. تُستخدم من قبل الأطباء وأخصائيي التغذية حول العالم.",
  "التصنيفات المعتمدة من منظمة الصحة العالمية (WHO): نقص وزن (أقل من 18.5)، وزن طبيعي (18.5 إلى 24.9)، زيادة وزن (25 إلى 29.9)، سمنة درجة أولى (30 إلى 34.9)، سمنة درجة ثانية (35 إلى 39.9)، سمنة مفرطة (40 فأكثر). التصنيف يساعد في تحديد المخاطر الصحية المحتملة.",
  "زيادة BMI ترتبط بأمراض مزمنة خطيرة: السكري من النوع الثاني، ارتفاع ضغط الدم، أمراض القلب والشرايين، بعض أنواع السرطان، مشاكل المفاصل والعظام، واضطرابات النوم (انقطاع التنفس). خفض 5-10% من الوزن يحسن الصحة بشكل ملحوظ ويقلل هذه المخاطر.",
  "من المهم فهم حدود BMI: لا يميز بين العضل والدهون، لا يأخذ في الاعتبار توزيع الدهون في الجسم، ولا ينطبق على الرياضيين المحترفين أو كبار السن أو الحوامل. لهذا السبب، يُفضل استخدام BMI مع قياس محيط الخصر ونسبة الدهون للحصول على صورة صحية كاملة.",
  "حاسبتنا تدعم وحدات القياس المختلفة: الوزن بالكيلوجرام (كجم) والطول بالسنتيمتر (سم). النتيجة تظهر فوراً مع التصنيف الصحي (نقص وزن، طبيعي، زيادة، سمنة). استخدم الحاسب شهرياً لمتابعة التغيرات في وزنك وضبط نظامك الغذائي والرياضي.",
  "للوصول لوزن صحي: نظام غذائي متوازن يحتوي على بروتين وخضروات وحبوب كاملة، تقليل السكريات والمشروبات الغازية، ممارسة الرياضة 150 دقيقة أسبوعياً على الأقل (30 دقيقة × 5 أيام)، شرب 2-3 لتر ماء يومياً، ونوم كاف 7-8 ساعات."
];

export default function Client() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w <= 0 || h <= 0) return;
    let bmi: number;
    if (unit === "metric") {
      const hM = h / 100;
      bmi = w / (hM * hM);
    } else {
      // imperial: weight in lbs, height in inches
      bmi = (w / (h * h)) * 703;
    }
    let category = bmi < 18.5 ? "نقص وزن" : bmi < 25 ? "طبيعي" : bmi < 30 ? "زيادة وزن" : "سمنة";
    setResult({ bmi: bmi.toFixed(1), category });
  };

  const schemaName = "حاسبة BMI";
const schemaDesc = `Online حاسبة BMI - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/bmi-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "أدوات أخرى", url: "https://adwatak.cloud/category/calculators" },
  { name: "حاسبة BMI", url: "https://adwatak.cloud/tools/bmi-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="أدوات أخرى" categorySlug="daily" toolName="حاسبة BMI" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⚖️ حاسبة BMI</h1>
        <p className="text-sm text-gray-500 mb-6">مؤشر كتلة الجسم — وزنك المثالي</p>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setUnit("metric")} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${unit === "metric" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>📏 متري (كجم/سم)</button>
          <button onClick={() => setUnit("imperial")} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${unit === "imperial" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>🏋️ إمبراطوري (رطل/بوصة)</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">الوزن ({unit === "metric" ? "كجم" : "رطل"})</label><input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder={unit === "metric" ? "70" : "154"} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">الطول ({unit === "metric" ? "سم" : "بوصة"})</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder={unit === "metric" ? "175" : "69"} /></div>
        </div>
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب
        </button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200 mb-6">
          <p className="text-xs text-green-600">مؤشر كتلة الجسم</p>
          <p className="text-4xl font-black text-green-900">{result.bmi}</p>
          <p className="text-lg text-green-600 font-semibold">{result.category}</p>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
