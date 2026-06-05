"use client";
import { useState } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema, howToSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

type KaffarahType = "oath" | "ramadan" | "zhihar" | "fasting";

interface KaffarahInfo {
  title: string;
  description: string;
  options: { label: string; detail: string }[];
  defaultCount: number;
}

const KAFFARAH_DATA: Record<KaffarahType, KaffarahInfo> = {
  oath: {
    title: "🤲 كفارة اليمين",
    description: "من حلف يمينًا ثم حنث فيها، عليه كفارة يمين. قال تعالى: 'كفارته إطعام عشرة مساكين من أوسط ما تطعمون أهليكم أو كسوتهم أو تحرير رقبة فمن لم يجد فصيام ثلاثة أيام'",
    options: [
      { label: "إطعام 10 مساكين", detail: "إطعام عشرة مساكين من أوسط ما تطعمون أهلكم — حوالي 1.5 كجم أرز/شخص = 15 كجم إجمالاً" },
      { label: "كسوة 10 مساكين", detail: "كسوة عشرة مساكين — ملابس لكل مسكين" },
      { label: "تحرير رقبة", detail: "تحرير رقبة مؤمنة — وهذا غير متاح في العصر الحالي" },
      { label: "صيام 3 أيام", detail: "صيام ثلاثة أيام متتابعة أو متفرقة — لمن لم يجد الطعام أو الكسوة" },
    ],
    defaultCount: 1,
  },
  ramadan: {
    title: "🌙 كفارة الجماع في رمضان",
    description: "من جامع زوجته عمدًا في نهار رمضان عليه كفارة مع القضاء. الكفارة على الترتيب: تحرير رقبة، فإن لم يجص فصيام شهرين متتابعين، فإن لم يستطع فإطعام ستين مسكينًا",
    options: [
      { label: "تحرير رقبة", detail: "تحرير رقبة مؤمنة — غير متاح حاليًا" },
      { label: "صيام شهرين متتابعين", detail: "صيام 60 يومًا متتابعًا — لا يجوز التفريق إلا لعذر شرعي" },
      { label: "إطعام 60 مسكينًا", detail: "إطعام ستين مسكينًا — حوالي 1.5 كجم أرز/شخص = 90 كجم إجمالاً" },
    ],
    defaultCount: 1,
  },
  zhihar: {
    title: "💔 كفارة الظهار",
    description: "من ظاهر من زوجته فقال لها: أنت علي كظهر أمي، فعليه كفارة قبل أن يمسها. قال تعالى: 'والذين يظاهرون من نسائهم ثم يعودون لما قالوا فتحرير رقبة من قبل أن يتماسا ذلكم توعظون به'",
    options: [
      { label: "تحرير رقبة", detail: "تحرير رقبة مؤمنة — غير متاح حاليًا" },
      { label: "صيام شهرين متتابعين", detail: "صيام 60 يومًا متتابعًا — لمن لم يجد رقبة" },
      { label: "إطعام 60 مسكينًا", detail: "إطعام ستين مسكينًا من أوسط الطعام — حوالي 90 كجم أرز" },
    ],
    defaultCount: 1,
  },
  fasting: {
    title: "🍽️ فدية الصيام",
    description: "من كان عاجزًا عن الصيام عجزًا دائمًا (كالكبير في السن أو المريض المزمن) عليه فدية عن كل يوم: إطعام مسكين. قال تعالى: 'وعلى الذين يطيقونه فدية طعام مسكين'",
    options: [
      { label: "إطعام مسكين عن كل يوم", detail: "إطعام مسكين واحد عن كل يوم أفطر فيه — حوالي 1.5 كجم أرز/يوم" },
      { label: "إطعام مسكينين عن كل يوم", detail: "إطعام مسكينين عن كل يوم — حوالي 3 كجم أرز/يوم (بعض العلماء أجاز ذلك)" },
    ],
    defaultCount: 30,
  },
};

const FOOD_PRICES: Record<string, { unit: string; pricePerUnit: number; label: string }> = {
  rice: { unit: "كجم", pricePerUnit: 5, label: "أرز" },
  bread: { unit: "رغيف", pricePerUnit: 1, label: "خبز" },
  dates: { unit: "كجم", pricePerUnit: 20, label: "تمر" },
  meat: { unit: "كجم", pricePerUnit: 30, label: "لحم" },
};

export default function Client() {
  const [selectedType, setSelectedType] = useState<KaffarahType>("oath");
  const [count, setCount] = useState(1);
  const [foodType, setFoodType] = useState("rice");
  const [foodPerPerson, setFoodPerPerson] = useState(1.5);
  const [calculated, setCalculated] = useState(false);

  const info = KAFFARAH_DATA[selectedType];
  const food = FOOD_PRICES[foodType];

  const totalFood = count * foodPerPerson;
  const totalCost = totalFood * food.pricePerUnit;

  const handleCalculate = () => setCalculated(true);

  const typeLabels: Record<KaffarahType, string> = {
    oath: "🤲 كفارة اليمين",
    ramadan: "🌙 كفارة الجماع في رمضان",
    zhihar: "💔 كفارة الظهار",
    fasting: "🍽️ فدية الصيام",
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("حاسبة الفدية والكفارة", "احسب الفدية والكفارة — كفارة اليمين، كفارة الجماع في رمضان، كفارة الظهار، فدية الصيام مع الشرح الشرعي", "https://adwatak.cloud/tools/fidyah-kaffarah", "ar", "Islamic")} />
      <StructuredData data={faqSchema([
        { question: "ما هي كفارة اليمين؟", answer: "كفارة اليمين هي واجب على من حلف يمينًا ثم حنث فيها. وهي إطعام 10 مساكين أو كسوتهم أو تحرير رقبة، فمن لم يجد فصيام ثلاثة أيام." },
        { question: "ما هي كفارة الجماع في رمضان؟", answer: "من جامع زوجته عمدًا في نهار رمضان عليه القضاء والكفارة. الكفارة: تحرير رقبة، فإن لم يجد فصيام شهرين متتابعين، فإن لم يستطع فإطعام 60 مسكينًا." },
        { question: "ما هي كفارة الظهار؟", answer: "الظهار أن يقول الرجل لزوجته: أنت علي كظهر أمي. كفارته: تحرير رقبة، فإن لم يجد فصيام شهرين متتابعين، فإن لم يستطع فإطعام 60 مسكينًا." },
        { question: "ما هي فدية الصيام؟", answer: "فدية الصيام واجبة على من عجز عن الصيام عجزًا دائمًا: إطعام مسكين عن كل يوم. مقدارها حوالي 1.5 كجم أرز لكل مسكين." },
        { question: "هل يمكن إطعام بدل الصيام في الكفارة؟", answer: "نعم، إذا لم يستطع الصيام لعجز صحي يجوز له الإطعام بدلًا منه. لكن يجب أن يكون العجز حقيقيًا ومؤكدًا." },
        { question: "كم مقدار الطعام لكل مسكين؟", answer: "حوالي 1.5 كجم من الأرز أو ما يعادله من الطعام المتوسط. بعض العلماء قالوا نصف صاع (حوالي 1.5 كجم)." },
        { question: "هل يجب أن يكون الصيام متتابعًا؟", answer: "نعم، صيام الكفارة (3 أيام لليمين أو شهرين للظهار والجماع) يجب أن يكون متتابعًا عند جمهور العلماء." },
        { question: "هل المرأة عليها كفارة إذا حنت يمينها؟", answer: "نعم، كفارة اليمين واجبة على الرجل والمرأة سواء. أما كفارة الجماع في رمضان فعلى الزوج فقط." },
        { question: "هل الحنث في اليمين يكون بالإصرار؟", answer: "الحنث هو عدم الوفاء باليمين. إذا حلف ألا يفعل شيئًا ثم فعله، فقد حنث وعليه الكفارة." },
        { question: "هل يمكن دفع مال بدل الطعام؟", answer: "اختلف العلماء في ذلك. جمهور العلماء قالوا لا يجوز إخراج المال بدل الطعام في الكفارة. لكن بعض المعاصرين أجازوه للمساكين." },
        { question: "ما الفرق بين الفدية والكفارة؟", answer: "الكفارة تكون للمخالفات المحرمة (يمين، جماع في رمضان، ظهار). الفدية تكون للعجز عن الواجب (فدية الصيام للعاجز الدائم)." },
        { question: "هل الحاسبة مجانية؟", answer: "نعم، حاسبة الفدية والكفارة مجانية بالكامل وتعمل في المتصفح مباشرة." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "الرئيسية", url: "https://adwatak.cloud/" },
        { name: "الأدوات الإسلامية", url: "https://adwatak.cloud/category/islamic" },
        { name: "حاسبة الفدية والكفارة", url: "https://adwatak.cloud/tools/fidyah-kaffarah" },
      ])} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <StructuredData data={howToSchema("كيفية استخدام حاسبة الفدية والكفارة", "أداة مجانية تعمل في المتصفح. بدون تسجيل.", [{name: "اختر نوع الكفارة", text: "اختر نوع الكفارة أو الفدية"}, {name: "أدخل العدد", text: "أدخل عدد المرات أو الأيام"}, {name: "حدد نوع الطعام", text: "اختر نوع الطعام والكمية لكل مسكين"}, {name: "احسب", text: "اضغط على زر الحساب لمعرفة المقدار والتكلفة"}], "دقيقتان", "ar")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="ar" category="الأدوات الإسلامية" categorySlug="islamic" toolName="حاسبة الفدية والكفارة" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⚖️ حاسبة الفدية والكفارة</h1>
        <p className="text-sm text-gray-500 mb-6">احسب مقدار الفدية والكفارة مع الشرح الشرعي التفصيلي</p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">اختر نوع الكفارة أو الفدية:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(typeLabels) as KaffarahType[]).map(type => (
              <button
                key={type}
                onClick={() => { setSelectedType(type); setCount(KAFFARAH_DATA[type].defaultCount); setCalculated(false); }}
                className={`p-4 rounded-xl border-2 text-right font-semibold text-sm transition-colors ${selectedType === type ? "border-green-500 bg-green-50 text-green-800" : "border-gray-200 bg-white text-gray-700 hover:border-green-300"}`}
              >
                {typeLabels[type]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-amber-800 mb-2">{info.title}</h3>
          <p className="text-sm text-amber-700 leading-relaxed mb-4">{info.description}</p>
          <div className="space-y-2">
            {info.options.map((opt, i) => (
              <div key={i} className="bg-white rounded-lg p-3 border border-amber-100">
                <p className="font-semibold text-gray-800 text-sm">{opt.label}</p>
                <p className="text-xs text-gray-600 mt-1">{opt.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {selectedType === "fasting" ? "عدد الأيام:" : "عدد المرات:"}
            </label>
            <input type="number" min={1} max={365} value={count} onChange={e => { setCount(Math.max(1, parseInt(e.target.value) || 1)); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">نوع الطعام:</label>
            <select value={foodType} onChange={e => { setFoodType(e.target.value); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              {Object.entries(FOOD_PRICES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">الكمية لكل مسكين (كجم):</label>
            <input type="number" min={0.5} max={10} step={0.5} value={foodPerPerson} onChange={e => { setFoodPerPerson(parseFloat(e.target.value) || 1.5); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
        </div>

        <button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-lg">
          ⚖️ احسب الفدية / الكفارة
        </button>

        {calculated && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-extrabold text-green-800 mb-4 text-center">📊 نتيجة الحساب</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">عدد المساكين / الأيام</p>
                <p className="text-xl font-extrabold text-gray-800">{count}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">نوع الطعام</p>
                <p className="text-base font-extrabold text-gray-800">{food.label}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">الكمية لكل مسكين</p>
                <p className="text-base font-extrabold text-gray-800">{foodPerPerson} {food.unit}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">إجمالي الطعام</p>
                <p className="text-base font-extrabold text-gray-800">{totalFood.toLocaleString()} {food.unit}</p>
              </div>
            </div>
            <div className="border-t border-green-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">التكلفة التقديرية:</span>
                <span className="text-xl font-extrabold text-green-800">{totalCost.toLocaleString()} ر.س</span>
              </div>
              <p className="text-xs text-gray-500">* الأسعار تقريبية وتختلف حسب المنطقة والوقت</p>
            </div>
          </div>
        )}
      </div>

      <SEOContent content={[
        "حاسبة الفدية والكفارة — احسب كفارة اليمين، كفارة الجماع في رمضان، كفارة الظهار، وفدية الصيام.",
        "تشمل الشرح الشرعي التفصيلي لكل نوع مع الأدلة من القرآن والسنة.",
        "حساب مقدار الطعام المطلوب (أرز، خبز، تمر، لحم) والتكلفة التقديرية.",
        "تدعم 4 أنواع: كفارة اليمين (10 مساكين)، كفارة الجماع (60 مسكين)، كفارة الظهار (60 مسكين)، فدية الصيام (مسكين/يوم).",
        "100% مجاني ويعمل في المتصفح مباشرة — بدون إرسال بيانات.",
      ]} lang="ar" />
      <FAQSection faqs={[
        { question: "ما هي كفارة اليمين؟", answer: "كفارة اليمين واجبة على من حلف يمينًا ثم حنث فيها: إطعام 10 مساكين أو كسوتهم أو تحرير رقبة، فمن لم يجد فصيام ثلاثة أيام." },
        { question: "ما هي كفارة الجماع في رمضان؟", answer: "القضاء + الكفارة: تحرير رقبة، فإن لم يجد فصيام شهرين متتابعين، فإن لم يستطع فإطعام 60 مسكينًا." },
        { question: "ما هي كفارة الظهار؟", answer: "تحرير رقبة، فإن لم يجد فصيام شهرين متتابعين، فإن لم يستطع فإطعام 60 مسكينًا." },
        { question: "ما هي فدية الصيام؟", answer: "إطعام مسكين عن كل يوم — حوالي 1.5 كجم أرز لكل مسكين." },
        { question: "هل يمكن إطعام بدل الصيام في الكفارة؟", answer: "نعم، إذا لم يستطع الصيام لعجز صحي يجوز له الإطعام." },
        { question: "كم مقدار الطعام لكل مسكين؟", answer: "حوالي 1.5 كجم من الأرز أو ما يعادله من الطعام المتوسط." },
        { question: "هل يجب أن يكون الصيام متتابعًا؟", answer: "نعم، صيام الكفارة يجب أن يكون متتابعًا عند جمهور العلماء." },
        { question: "هل المرأة عليها كفارة إذا حنت يمينها؟", answer: "نعم، كفارة اليمين واجبة على الرجل والمرأة." },
        { question: "هل يمكن دفع مال بدل الطعام؟", answer: "جمهور العلماء قالوا لا يجوز إخراج المال بدل الطعام في الكفارة." },
        { question: "ما الفرق بين الفدية والكفارة؟", answer: "الكفارة للمخالفات المحرمة، الفدية للعجز عن الواجب." },
      ]} lang="ar" />
      <RelatedTools tools={[
        { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
        { title: "حاسبة العمرة", icon: "🕋", href: "/tools/umrah-calculator" },
        { title: "اتجاه القبلة", icon: "🧭", href: "/tools/qibla-direction" },
        { title: "المسبحة الإلكترونية", icon: "📿", href: "/tools/tasbeeh-counter" },
      ]} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
