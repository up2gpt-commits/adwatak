"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هي السعرات الحرارية؟", answer: "السعرات الحرارية هي وحدة قياس الطاقة في الطعام. الجسم يحتاج سعرات حرارية للقيام بجميع وظائفه الحيوية — التنفس، ضخ الدم، الهضم، النشاط البدني، وحتى التفكير. كلما زاد نشاطك البدني، زادت حاجتك للسعرات." },
  { question: "كم سعرة أحتاج يومياً؟", answer: "الرجال: 2,000-2,500 سعرة. النساء: 1,600-2,000 سعرة. هذا يختلف حسب العمر، الوزن، الطول، ومستوى النشاط. الرياضيون يحتاجون أكثر، كبار السن يحتاجون أقل. استخدم حاسبة السعرات لتعرف احتياجك الدقيق حسب بياناتك." },
  { question: "ما هي معادلة حساب السعرات الأساسية؟", answer: "أشهر معادلة هي Mifflin-St Jeor: للرجال = 10 × الوزن + 6.25 × الطول - 5 × العمر + 5. للنساء = 10 × الوزن + 6.25 × الطول - 5 × العمر - 161. تحسب معدل الأيض الأساسي (BMR) — السعرات التي تحتاجها في حالة الراحة التامة." },
  { question: "كم سعرة أحتاج لإنقاص الوزن؟", answer: "لإنقاص 0.5 كجم أسبوعياً: قلل 500 سعرة يومياً من احتياجك. لإنقاص 1 كجم أسبوعياً: قلل 1,000 سعرة. لا تنزل تحت 1,200 سعرة للنساء أو 1,500 للرجال بدون إشراف طبي. أفضل طريقة: تقليل 300-500 سعرة مع زيادة النشاط البدني." },
  { question: "ماذا يحدث لو أكلت سعرات أقل من احتياجي الأساسي؟", answer: "الجسم يدخل في 'وضع المجاعة' — يبطئ الأيض للحفاظ على الطاقة. قد تشعر بالتعب والبرد وتساقط الشعر وضعف التركيز. لهذا السبب الحميات القاسية جداً تفشل على المدى الطويل. اخفض سعراتك تدريجياً وبشكل معتدل." },
  { question: "ما هي الأطعمة التي تعطي طاقة عالية بسعرات منخفضة؟", answer: "الخضروات الورقية (خس، سبانخ، كرنب)، الخيار، الطماطم، الكوسا، الفطر، القرنبيط، البروكلي. هذه الأطعمة منخفضة السعرات لكن غنية بالألياف والفيتامينات — تشعرك بالشبع بدون زيادة وزن." },
  { question: "كم سعرة في الوجبات الشائعة؟", answer: "شاورما دجاج = 500-700 سعرة. برجر كبير = 600-800. كبسة مع لحم = 600-900. فول + طعمية = 400-600. منسف = 800-1,200. المشروبات الغازية = 140-200 سعرة للعلبة. الحلويات العربية (كنافة، أم علي) = 400-600 سعرة للقطعة." },
  { question: "هل السعرات كلها متساوية؟", answer: "لا، 500 سعرة من الخضار والبروتين تختلف عن 500 سعرة من السكر. الأولى تشعرك بالشبع وتعطي فيتامينات. الثانية ترفع سكر الدم ثم تهبطه بسرعة وتزيد الجوع. الجودة أهم من الكمية. ركز على البروتين، الألياف، والدهون الصحية." },
  { question: "هل الرياضة تحرق سعرات كثيرة؟", answer: "المشي 30 دقيقة = 100-150 سعرة. الجري 30 دقيقة = 250-400 سعرة. السباحة 30 دقيقة = 200-300 سعرة. رفع الأثقال 30 دقيقة = 150-250 سعرة. الرياضة تحرق سعرات أقل من التغذية — نقص السعرات من الأكل أسهل من حرقها بالرياضة." },
  { question: "ما هو معدل الأيض الأساسي (BMR)؟", answer: "BMR هو أقل عدد من السعرات يحتاجها جسمك للبقاء حياً في حالة الراحة التامة — للتنفس، الدورة الدموية، وظائف المخ. يشكل 60-75% من إجمالي السعرات التي تحرقها يومياً. العضلات تزيد BMR — لهذا تمارين المقاومة مهمة." },
  { question: "هل السعرات تختلف حسب العمر؟", answer: "نعم، كل 10 سنين فوق 25 سنة، ينخفض معدل الأيض 2-5%. يعني شخص عمره 45 يحتاج سعرات أقل من شخص عمره 25 بنفس الوزن والنشاط. لهذا السبب يزيد الوزن مع التقدم في العمر إذا لم تقلل الأكل أو تزيد الرياضة." },
  { question: "ما هو مؤشر TDEE؟", answer: "TDEE (Total Daily Energy Expenditure) = إجمالي السعرات اللي تحرقها يومياً. يشمل BMR + نشاط بدني + هضم الطعام. لحساب TDEE: اضرب BMR × معامل النشاط (1.2 لخامل، 1.55 لمتوسط، 1.9 لنشيط جداً). TDEE هو المفتاح لإنقاص أو زيادة الوزن." },
];

const relatedTools = [
  { title: "حاسبة BMI", icon: "⚖️", href: "/tools/bmi-calculator" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
  { title: "حاسبة العمر", icon: "🎂", href: "/tools/age-calculator" },
  { title: "حاسبة الفائدة المركبة", icon: "📈", href: "/tools/compound-interest" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator" },
  { title: "ساعة إيقاف", icon: "⏱️", href: "/tools/stopwatch" },
];

const seoContent = [
  "حاسبة السعرات الحرارية تساعدك على معرفة احتياجك اليومي من السعرات بناءً على عمرك ووزنك وطولك ومستوى نشاطك. سواء كنت تريد إنقاص وزنك، تثبيته، أو زيادته — معرفة احتياجك اليومي هي الخطوة الأولى والاهم.",
  "معدل الأيض الأساسي (BMR) هو أساس الحساب. يحسب أقل عدد من السعرات التي يحتاجها جسمك في حالة الراحة التامة. للرجال: 10 × وزن (كجم) + 6.25 × طول (سم) - 5 × عمر + 5. للنساء: 10 × وزن + 6.25 × طول - 5 × عمر - 161.",
  "عامل النشاط البدني: خامل (مكتبي لا يمارس رياضة) = BMR × 1.2. نشاط خفيف (رياضة 1-3 أيام) = × 1.375. نشاط متوسط (3-5 أيام) = × 1.55. نشاط عالي (6-7 أيام) = × 1.725. نشاط شديد جداً (رياضي محترف) = × 1.9.",
  "مثال: رجل عمر 30، وزن 80 كجم، طول 175 سم، نشاط متوسط. BMR = 10×80 + 6.25×175 - 5×30 + 5 = 1,748 سعرة. TDEE = 1,748 × 1.55 = 2,709 سعرة يومياً. لإنقاص الوزن: 2,200 سعرة يومياً. لتثبيت الوزن: 2,700 سعرة.",
  "نصيحة: لا تعتمد على حساب السعرات فقط. جودة الأكل مهمة جداً. 200 سعرة من بروتين + خضار تختلف عن 200 سعرة من سكر. ركز على البروتين (يبني عضلات ويزيد الشبع)، الألياف (تحسن الهضم)، والدهون الصحية (ضرورية للهرمونات).",
  "أفضل طريقة لإنقاص الوزن: عجز 300-500 سعرة يومياً + تمارين مقاومة (تحافظ على العضلات) + مشي 8,000-10,000 خطوة. لا تنزل تحت 1,200 سعرة للنساء أو 1,500 للرجال بدون إشراف طبي. تغيير نمط الحياة أهم من أي رجيم مؤقت."
];

export default function CalorieCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a) return;
    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * parseFloat(activity);
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), loss05: Math.round(tdee - 500), loss1: Math.round(tdee - 1000) });
  };

  const schemaName = "حاسبة السعرات الحرارية";
const schemaDesc = `Online حاسبة السعرات الحرارية - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/calorie-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "حاسبة السعرات الحرارية", url: "https://adwatak.cloud/tools/calorie-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="يومية" categorySlug="daily" toolName="حاسبة السعرات" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔥 حاسبة السعرات الحرارية</h1>
        <p className="text-sm text-gray-500 mb-6">احسب احتياجك اليومي من السعرات لإنقاص أو تثبيت أو زيادة الوزن</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">الوزن (كجم)</label><input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="70" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">الطول (سم)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="175" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">العمر</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="30" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">الجنس</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
              <option value="male">ذكر</option><option value="female">أنثى</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">مستوى النشاط</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
            <option value="1.2">خامل — وظيفة مكتبية ولا تمارس رياضة</option>
            <option value="1.375">خفيف — رياضة 1-3 أيام/أسبوع</option>
            <option value="1.55">متوسط — رياضة 3-5 أيام/أسبوع</option>
            <option value="1.725">عالي — رياضة 6-7 أيام/أسبوع</option>
            <option value="1.9">شديد — رياضة يومية مضاعفة</option>
          </select>
        </div>
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب السعرات
        </button>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">معدل الأيض (BMR)</p>
            <p className="text-xl font-extrabold text-blue-900">{result.bmr.toLocaleString("ar-SA")} <span className="text-xs">سعرة</span></p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">احتياجك اليومي (TDEE)</p>
            <p className="text-xl font-extrabold text-green-900">{result.tdee.toLocaleString("ar-SA")} <span className="text-xs">سعرة</span></p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-300">
            <p className="text-xs text-yellow-700 mb-1">لإنقاص 0.5 كجم/أسبوع</p>
            <p className="text-xl font-extrabold text-yellow-900">{result.loss05.toLocaleString("ar-SA")} <span className="text-xs">سعرة</span></p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
            <p className="text-xs text-red-600 mb-1">لإنقاص 1 كجم/أسبوع</p>
            <p className="text-xl font-extrabold text-red-900">{result.loss1.toLocaleString("ar-SA")} <span className="text-xs">سعرة</span></p>
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
