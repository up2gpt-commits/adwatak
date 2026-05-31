"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

function fmt(n: number) {
  return n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
}

const faqs = [
  { question: "ما هي السيارات المدعومة؟", answer: "جميع أنواع السيارات — جديدة أو مستعملة، محلية أو مستوردة. أدخل سعر السيارة، الدفعة الأولى، نسبة الفائدة، ومدة التقسيط لتحصل على القسط الشهري." },
  { question: "هل تشمل التأمين والرخص؟", answer: "لا تشمل. لحساب التكلفة الإجمالية، أضف التأمين (3-5% من سعر السيارة سنوياً)، رسوم الرخص، ورسوم الاستمارة يدوياً. الحاسبة تحسب القسط فقط." },
  { question: "ما هي نسبة الفائدة المعتادة لتمويل السيارات؟", answer: "تتراوح بين 2% و6% سنوياً في السعودية حسب البنك وراتبك. التمويل الإسلامي (مرابحة السيارة) قد يكون أعلى قليلاً. قارن بين 3 بنوك على الأقل." },
  { question: "كم أقل دفعة أولى لتقسيط سيارة؟", answer: "في السعودية: 20% من سعر السيارة للمواطنين، 30-40% للمقيمين. بعض البنوك تقدم تمويل بدفعة أولى 0% (لكن الفائدة تكون أعلى)." },
  { question: "هل يمكن تقسيط سيارة مستعملة؟", answer: "نعم، الكثير من البنوك تمول السيارات المستعملة بفائدة أعلى قليلاً (1-2% أكثر من الجديدة). بعض البنوك تشترط سيارة لا تتجاوز 5 سنوات." },
  { question: "ما هي أقصى مدة لتقسيط السيارة؟", answer: "عادة 3-5 سنوات للسيارات الجديدة، 2-4 سنوات للمستعملة. المدة الأطول تعني قسط أقل لكن فائدة أعلى إجمالاً." },
  { question: "هل يشمل التمويل التأمين على السيارة؟", answer: "لا، التأمين الشامل إلزامي في السعودية ويُدفع منفصلاً (سنوياً). تكلفة التأمين تختلف حسب السيارة والعمر — تتراوح بين 1,500-5,000 ريال سنوياً." },
  { question: "هل أحتاج تحويل راتب لتمويل السيارة؟", answer: "في معظم البنوك السعودية، نعم. تأكد من الشرط مع البنك قبل التقديم. بعض شركات التمويل تقدم تمويل بدون تحويل راتب لكن بفائدة أعلى." },
  { question: "ما الفرق بين تقسيط السيارة من البنك والتقسيط من الوكالة؟", answer: "البنك: تمويل نقدي — تشتري السيارة من أي معرض، تختار التمويل الأفضل. الوكالة: تمويل مرتبط بالوكالة — عروض حصرية لكن أسعار فائدة قد تكون أعلى." },
  { question: "هل يمكن سداد تقسيط السيارة مبكراً؟", answer: "نعم، تسمح البنوك بالسداد المبكر. بعضها يفرض رسوماً. السداد المبكر يوفر الفائدة المتبقية. اسأل عن رسوم السداد المبكر قبل التوقيع." },
];

const relatedTools = [
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
  { title: "حاسبة التقسيط", icon: "📊", href: "/tools/installment-calculator" },
  { title: "حاسبة الضريبة", icon: "🏛️", href: "/tools/vat-calculator" },
  { title: "حاسبة الفائدة المركبة", icon: "📈", href: "/tools/compound-interest" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
];

const seoContent = [
  "حاسبة تقسيط السيارات تساعدك على معرفة القسط الشهري لسيارتك الجديدة أو المستعملة. أدخل سعر السيارة، الدفعة الأولى، نسبة الفائدة، ومدة التقسيط لتعرف التكلفة الفعلية.",
  "في السعودية، تمويل السيارات متاح من جميع البنوك وشركات التمويل بنسب فائدة تتراوح بين 2% و6%. الدفعة الأولى عادة 20% للمواطنين. أقصى مدة تقسيط 5 سنوات.",
  "نصيحة مهمة: قارن بين عروض 3 بنوك قبل الشراء. الفرق في 1% فائدة على سيارة 100,000 ريال لمدة 5 سنوات = توفير 2,500 ريال. لا تنسى إضافة التأمين والرخص للتكلفة الإجمالية.",
  "مثال: سيارة بـ 100,000 ريال، دفعة أولى 20,000 ريال (20%)، فائدة 4%، مدة 5 سنوات. مبلغ التمويل = 80,000 ريال. القسط الشهري ≈ 1,473 ريال. إجمالي الفائدة ≈ 8,380 ريال.",
  "الأداة مجانية بالكامل، تدعم العربية، ولا تخزّن أي بيانات."
];

export default function CarInstallment() {
  const [price, setPrice] = useState("");
  const [down, setDown] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(down) || 0;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    const principal = p - d;
    if (principal <= 0 || r <= 0 || n <= 0) return;
    const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setResult({ monthly, total: monthly * n, interest: monthly * n - principal });
  };

  const schemaName = "حاسبة تقسيط السيارات";
const schemaDesc = `Online حاسبة تقسيط السيارات - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/car-installment";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "حاسبة تقسيط السيارات", url: "https://adwatak.cloud/tools/car-installment" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة تقسيط السيارات" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🚗 حاسبة تقسيط السيارات</h1>
        <p className="text-sm text-gray-500 mb-6">احسب قسط سيارتك الشهري</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">سعر السيارة (ريال)</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="100,000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">الدفعة الأولى (ريال)</label><input type="number" value={down} onChange={(e) => setDown(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="20,000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">نسبة الفائدة (%)</label><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="4" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">المدة (سنوات)</label><input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="5" /></div>
        </div>
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب
        </button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">القسط الشهري</p>
            <p className="text-xl font-extrabold text-blue-900">{fmt(result.monthly)} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">الإجمالي</p>
            <p className="text-xl font-extrabold text-green-900">{fmt(result.total)} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
            <p className="text-xs text-red-600 mb-1">الفائدة</p>
            <p className="text-xl font-extrabold text-red-900">{fmt(result.interest)} <span className="text-xs">ر.س</span></p>
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
