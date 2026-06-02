"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما معنى VAT؟", answer: "VAT = Value Added Tax = ضريبة القيمة المضافة. هي ضريبة استهلاك غير مباشرة تُفرض على الفرق بين تكلفة المدخلات وسعر المخرجات في كل مرحلة من مراحل الإنتاج والتوزيع. في السعودية نسبة VAT هي 15%، وفي الإمارات 5%، وفي مصر 14%." },
  { question: "متى تم تطبيق VAT في السعودية؟", answer: "تم تطبيق ضريبة القيمة المضافة في السعودية في 1 يناير 2018 بنسبة 5%، ثم رُفعت إلى 15% في 1 يوليو 2020 لمواجهة العجز الناتج عن انخفاض أسعار النفط وجائحة كورونا." },
  { question: "من يدفع VAT المستهلك أم التاجر؟", answer: "المستهلك النهائي هو من يدفع VAT، لكن التاجر هو المسؤول عن تحصيلها من العملاء وتوريدها للهيئة العامة للزكاة والضريبة (ZATCA). التاجر المسجل في VAT يسترد الضريبة التي دفعها لمورديه." },
  { question: "ما هي السلع المعفاة من VAT في السعودية؟", answer: "تشمل الإعفاءات: بعض الخدمات المالية مثل التأمين والإقراض، تأجير السكن السكني، النقل المحلي للركاب، الصادرات خارج دول التعاون الخليجي، وبعض الخدمات التعليمية والصحية المعتمدة." },
  { question: "كيف أعرف إذا السعر شامل الضريبة أم لا؟", answer: "في السعودية والإمارات، معظم الأسعار المعروضة للمستهلك شاملة الضريبة (Inclusive). في المعاملات التجارية B2B، غالباً تُعرض الأسعار قبل الضريبة (Exclusive). ابحث عن عبارة 'شامل ضريبة القيمة المضافة' أو 'VAT Inclusive'." },
  { question: "هل يمكنني استرداد VAT كمستهلك؟", answer: "لا يسترد المستهلك النهائي VAT. فقط التجار المسجلين في نظام VAT يستردون ضريبة المدخلات. لكن هناك برنامج 'Tax Free for Tourists' يسمح للمغادرين باسترداد الضريبة على مشتريات بقيمة 3,000 ريال أو أكثر خلال 90 يوماً." },
  { question: "ما الفرق بين VAT وضريبة الدخل؟", answer: "VAT ضريبة استهلاك تدفعها عند الشراء. ضريبة الدخل تُدفع من أرباح الأفراد أو الشركات. في السعودية لا توجد ضريبة دخل على الأفراد السعوديين حالياً، لكن تطبق على الشركات الأجنبية والمواطنين الخليجيين العاملين في القطاع الخاص." },
  { question: "كيف أحسب VAT من سعر شامل الضريبة؟", answer: "المبلغ قبل الضريبة = السعر الشامل ÷ (1 + نسبة الضريبة). مثال: سعر شامل 115 ريال، نسبة VAT 15%: المبلغ قبل الضريبة = 115 ÷ 1.15 = 100 ريال. مقدار VAT = 115 - 100 = 15 ريال." },
  { question: "ما هي غرامات عدم التسجيل في VAT؟", answer: "وفقاً لهيئة الزكاة والضريبة (ZATCA)، عدم التسجيل في VAT يعرضك لغرامة تصل إلى 10,000 ريال. كما توجد غرامات على التأخير في تقديم الإقرارات (5% إلى 25% من الضريبة المستحقة) وغرامات على عدم السداد." },
  { question: "هل السكن معفى من VAT؟", answer: "تأجير الوحدات السكنية للأفراد معفى من VAT في السعودية والإمارات. أما الفنادق والوحدات الفندقية السياحية فتخضع لـ VAT بنسبة 15%. بيع العقارات الجديدة لأول مرة من المطور العقاري يخضع لضريبة التصرفات العقارية." },
  { question: "متى يكون التسجيل في VAT إجباري واختياري؟", answer: "التسجيل إجباري إذا تجاوزت إيراداتك السنوية 375,000 ريال سعودي. التسجيل اختياري إذا تجاوزت 187,500 ريال. لو أقل من ذلك، لست ملزماً بالتسجيل لكن يمكنك التسجيل طواعية في بعض الحالات." },
  { question: "كيف أقدم إقرار VAT في السعودية؟", answer: "يتم تقديم إقرار VAT إلكترونياً عبر بوابة هيئة الزكاة والضريبة (zatca.gov.sa). الإقرار يقدم شهرياً (للإيرادات فوق 40 مليون) أو ربع سنوي (لأقل من 40 مليون). الإقرار يتضمن مبيعاتك، مشترياتك، وضريبة المخرجات والمدخلات." },
  { question: "هل هناك أنظمة ضريبة غير VAT في السعودية؟", answer: "نعم، هناك ضريبة التصرفات العقارية 5% على بيع وشراء العقارات، ضريبة الاستقطاع على المدفوعات للجهات غير المقيمة، والزكاة للشركات السعودية والخليجية بنسبة 2.5% على رأس المال العامل." },
  { question: "ما هي نسبة VAT في دول الخليج الأخرى؟", answer: "الإمارات 5% (مطبقة من 2018)، البحرين 10% (رفعت من 5% في 2022)، عمان 5%، قطر 5% (مع إعفاءات واسعة)، الكويت لم تطبق VAT بعد. السعودية الأعلى بنسبة 15% بين دول الخليج." },
];

const relatedTools = [
  { title: "حاسبة هامش الربح", icon: "📈", href: "/tools/profit-margin" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator" },
  { title: "حاسبة القرض العقاري", icon: "🏠", href: "/tools/mortgage-calculator" },
];

const seoContent = [
  "حاسبة ضريبة القيمة المضافة (VAT) تساعدك على حساب الضريبة المضافة على أي منتج أو خدمة بسهولة ودقة. تدعم الحاسبة نسب الضريبة في السعودية (15%)، الإمارات (5%)، مصر (14%)، البحرين (10%)، وعمان (5%). كل ما عليك فعله هو إدخال المبلغ واختيار النسبة.",
  "ضريبة القيمة المضافة (VAT) هي ضريبة استهلاك غير مباشرة تُفرض على استهلاك السلع والخدمات في كل مرحلة من مراحل سلسلة الإمداد. بدأ تطبيقها في دول الخليج عام 2018 كجزء من الاتفاقية الموحدة لدول مجلس التعاون الخليجي. الهدف منها تنويع مصادر الدخل الحكومي وتقليل الاعتماد على النفط.",
  "حاسبتنا تدعم طريقتين أساسيتين للحساب: الأولى، إضافة الضريبة على السعر قبل الضريبة — مثلاً 100 ريال + 15% VAT = 115 ريال (مفيد للتجار والشركات عند تسعير منتجاتهم). الثانية، استخراج الضريبة من السعر الشامل — مثلاً 115 ريال → 100 ريال سعر صافي + 15 ريال ضريبة (مفيد للمستهلكين والمحاسبين).",
  "التسجيل في نظام VAT في السعودية إجباري لكل منشأة تتجاوز إيراداتها السنوية 375,000 ريال سعودي. المنشآت ذات الإيرادات بين 187,500 و 375,000 ريال يمكنها التسجيل اختياري. عدم التسجيل يعرضك لغرامات مالية تصل إلى 10,000 ريال سعودي من هيئة الزكاة والضريبة والجمارك (ZATCA).",
  "نصيحة مهمة للتجار والشركات: احتفظ بجميع فواتير المشتريات والمبيعات لأن هيئة الزكاة والضريبة تطلب الاحتفاظ بها لمدة 6 سنوات على الأقل. أيضاً، تأكد من فصل ضريبة المدخلات (الضريبة على مشترياتك) عن ضريبة المخرجات (الضريبة على مبيعاتك) عند تقديم الإقرار الشهري أو الربع سنوي.",
  "للمستهلكين: معظم الأسعار المعروضة في المتاجر السعودية والإماراتية شاملة الضريبة، لكن في المطاعم والفنادق قد تجد الضريبة تُضاف عند الدفع. استخدم حاسبة VAT للتأكد من أنك لا تدفع أكثر من المفروض. للسائحين: يمكنك استرداد VAT على المشتريات عند المغادرة عبر مكاتب 'Tax Free' في المطارات.",
  "ضريبة القيمة المضافة تختلف عن ضريبة الدخل في أنها لا تفرق بين مصدر الدخل — الجميع يدفعها بنفس النسبة عند الشراء. في السعودية، رفع VAT من 5% إلى 15% كان له تأثير على أسعار السلع والخدمات لكن الاقتصاد امتص التغيير تدريجياً خلال السنوات التالية.",
  "مقارنة بين الدول: الإمارات تحافظ على 5% أدنى نسبة خليجية، البحرين 10% بعد الرفع في 2022، الكويت لم تطبق VAT بعد رغم المحاولات المتكررة. عالمياً، متوسط VAT حوالي 20% في أوروبا — مما يجعل النسبة الخليجية منخفضة نسبياً."
];

export default function Client() {
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("15");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const r = parseFloat(rate) / 100;
    if (p <= 0) return;
    setResult({ beforeTax: p / (1 + r), taxAmount: p - p / (1 + r), total: p });
  };

  const calculateAdd = () => {
    const p = parseFloat(price);
    const r = parseFloat(rate) / 100;
    if (p <= 0) return;
    setResult({ beforeTax: p, taxAmount: p * r, total: p * (1 + r) });
  };

  const schemaName = "حاسبة الضريبة المضافة (VAT)";
const schemaDesc = `Online حاسبة الضريبة المضافة (VAT) - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/vat-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "الحاسبات المالية", url: "https://adwatak.cloud/category/calculators" },
  { name: "حاسبة الضريبة المضافة (VAT)", url: "https://adwatak.cloud/tools/vat-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة الضريبة المضافة" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🏛️ حاسبة الضريبة المضافة (VAT)</h1>
        <p className="text-sm text-gray-500 mb-6">احسب ضريبة القيمة المضافة لأي منتج أو خدمة</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">المبلغ (ريال)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1000" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">نسبة الضريبة (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="15" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={calculate}
            className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-base cursor-pointer">
            استخرج الضريبة من السعر الشامل
          </button>
          <button onClick={calculateAdd}
            className="bg-gray-50 text-blue-600 font-bold p-3 rounded-xl border-2 border-blue-600 text-base cursor-pointer">
            أضف الضريبة على السعر
          </button>
        </div>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">السعر قبل الضريبة</p>
            <p className="text-xl font-extrabold text-blue-900">{result.beforeTax.toLocaleString("ar-SA", { maximumFractionDigits: 2 })} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
            <p className="text-xs text-red-600 mb-1">مبلغ الضريبة</p>
            <p className="text-xl font-extrabold text-red-900">{result.taxAmount.toLocaleString("ar-SA", { maximumFractionDigits: 2 })} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">السعر الشامل</p>
            <p className="text-xl font-extrabold text-green-900">{result.total.toLocaleString("ar-SA", { maximumFractionDigits: 2 })} <span className="text-xs">ر.س</span></p>
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
