"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";

const faqs = [
  { question: "ما الفرق بين الراتب الإجمالي والصافي؟", answer: "الراتب الإجمالي هو الأساسي + جميع البدلات (سكن، نقل، غلاء معيشة). الراتب الصافي هو المبلغ الفعلي الذي يُودع في حسابك بعد خصم التأمينات الاجتماعية والاستقطاعات الأخرى. في السعودية، يُخصم 9% للتأمينات من راتب المواطن السعودي." },
  { question: "كيف يتم خصم التأمينات الاجتماعية في السعودية؟", answer: "لموظفي القطاع الخاص السعوديين: 9% من الراتب الأساسي + بدل السكن (بحد أقصى 3,000 ريال) يتحملها الموظف. 2% تأمينات مهنية يتحملها صاحب العمل. 10% يتحملها صاحب العمل. للمقيمين: لا يُخصم تأمينات اجتماعية." },
  { question: "هل بدل السكن يدخل في حساب التأمينات؟", answer: "نعم، يدخل بدل السكن في حساب التأمينات بحد أقصى 3,000 ريال شهرياً. مثال: راتب أساسي 7,000 + سكن 4,000 = أساس التأمينات 10,000 (7,000 + 3,000). الـ 1,000 الزايدة عن 3,000 لا تدخل في الحساب." },
  { question: "ما هي نسبة الاستقطاع المسموح بها من الراتب؟", answer: "حسب لوائح البنك المركزي السعودي: 33% للموظف الحكومي للالتزامات الائتمانية، 45% لموظفي القطاع الخاص، 60% لقرض الصندوق العقاري. يُصح ألا تتجاوز 40% إجمالاً لجميع الأقساط." },
  { question: "كيف أحسب راتبي الصافي كمقيم في السعودية؟", answer: "المقيمون لا يخصم منهم تأمينات اجتماعية. الاستقطاعات المحتملة: رسوم الإقامة (800 ريال/سنة)، التأمين الطبي (يلزمة صاحب العمل)، رسوم المرافقين (إن وجدت). الراتب الصافي ≈ الإجمالي ناقص هذه الرسوم." },
  { question: "هل التأمينات الاجتماعية تشمل بدل النقل؟", answer: "لا، بدل النقل لا يدخل في حساب التأمينات الاجتماعية في السعودية. التأمينات تحسب على الراتب الأساسي + بدل السكن فقط (بحد أقصى 3,000 للسكن). بدل النقل يُعتبر من البدلات غير الخاضعة للتأمينات." },
  { question: "متى يستحق الموظف التأمينات في السعودية؟", answer: "جميع الموظفين السعوديين في القطاع الخاص والعام يستحقون التأمينات الاجتماعية من أول يوم عمل. صاحب العمل ملزم بتسجيل الموظف في المؤسسة العامة للتأمينات الاجتماعية خلال 30 يوماً من تاريخ التعيين." },
  { question: "ما هي مزايا التأمينات الاجتماعية للموظف؟", answer: "معاش تقاعدي عند بلوغ 60 سنة (للرجال) أو 55 سنة (للنساء)، تعويض للعجز الكلي أو الجزئي، تعويض للوفاة (يصرف للمستحقين)، تعويض للفصل التعسفي (ساند)، وبدل إجازة أمومة (10 أسابيع). التسجيل في التأمينات إجباري للموظف السعودي." },
  { question: "هل يمكنني حساب الراتب الصافي يدوياً؟", answer: "نعم: الراتب الصافي = الإجمالي - (9% من أساس التأمينات). مثال: راتب 10,000 + سكن 2,000 = أساس التأمينات 12,000. التأمينات = 12,000 × 9% = 1,080 ريال. الصافي = 10,000 + 2,000 - 1,080 = 10,920 ريال." },
  { question: "ما هي ضريبة الدخل في السعودية للأفراد؟", answer: "لا توجد ضريبة دخل على الأفراد السعوديين حالياً. المقيمون غير الخليجيين يدفعون ضريبة دخل بنسبة 20% على الدخل الناتج عن مزاولة نشاط تجاري داخل المملكة فقط (لا تشمل الرواتب). الرواتب معفاة من ضريبة الدخل للجميع." },
  { question: "ماذا لو كان راتبي أقل من 4,000 ريال؟", answer: "الحد الأدنى للراتب الخاضع للتأمينات الاجتماعية في السعودية هو 4,000 ريال. إذا كان راتبك أقل، لا تُخصم تأمينات اجتماعية. لكن يُفضل التحقق مع جهة عملك لأن بعض الجهات تسجل الموظفين طواعية." },
  { question: "هل الترقية أو العلاوة تؤثر على التأمينات؟", answer: "نعم، أي زيادة في الراتب الأساسي أو بدل السكن تؤدي لزيادة مبلغ التأمينات. يتم تحديث الاشتراك التأميني تلقائياً بعد الترقية. هذا يعني أن صافي راتبك قد لا يزيد بنفس نسبة الزيادة الإجمالية لأن خصم التأمينات سيرتفع أيضاً." },
];

const relatedTools = [
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
  { title: "حاسبة الضريبة المضافة", icon: "🏛️", href: "/tools/vat-calculator" },
  { title: "حاسبة هامش الربح", icon: "📈", href: "/tools/profit-margin" },
  { title: "حاسبة التقسيط", icon: "📊", href: "/tools/installment-calculator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
  { title: "حاسبة القرض العقاري", icon: "🏠", href: "/tools/mortgage-calculator" },
];

const seoContent = [
  "حاسبة الراتب الصافي تساعدك على معرفة المبلغ الفعلي الذي سيودع في حسابك البنكي كل شهر بعد خصم التأمينات الاجتماعية. أدخل راتبك الإجمالي وبدل السكن (اختياري) واحصل على الراتب الصافي فوراً — مناسبة للموظفين السعوديين في القطاع الخاص والحكومي.",
  "نظام التأمينات الاجتماعية في السعودية: يُخصم 9% من الراتب الأساسي + بدل السكن (بحد أقصى 3,000 ريال) للموظف السعودي. صاحب العمل يتحمل 10% إضافية + 2% تأمينات مهنية. هذا النظام يضمن لك معاشاً تقاعدياً عند التقاعد وتعويضات في حالات العجز والوفاة.",
  "طريقة الحساب: الراتب الإجمالي = الأساسي + بدل السكن + بدل النقل. أساس التأمينات = الأساسي + بدل السكن (بحد أقصى 3,000 للسكن). الخصم = أساس التأمينات × 9%. الراتب الصافي = الراتب الإجمالي - الخصم.",
  "مثال عملي: موظف راتبه الأساسي 10,000 ريال + بدل سكن 3,000 ريال + بدل نقل 800 ريال. الإجمالي = 13,800 ريال. أساس التأمينات = 10,000 + 3,000 = 13,000 ريال. الخصم = 13,000 × 9% = 1,170 ريال. الصافي = 13,800 - 1,170 = 12,630 ريال.",
  "معلومة مهمة للمقيمين: المقيمون في السعودية لا يخصم منهم تأمينات اجتماعية. لكنهم قد يتحملون رسوم إقامة وتأمين طبي حسب عقد العمل. يفضل التأكد من بنود العقد لمعرفة صافي الراتب بدقة.",
  "نصيحة: استخدم حاسبة الراتب الصافي عند التفاوض على راتبك مع أي جهة عمل جديدة. اعرف صافي راتبك بدقة قبل التوقيع على العقد. تذكر أن بدل السكن له حد أقصى في التأمينات (3,000 ريال) — إذا كان بدل سكنك أعلى، الفرق لا يُخصم منه تأمينات."
];

export default function SalaryCalculator() {
  const [gross, setGross] = useState("");
  const [housing, setHousing] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const g = parseFloat(gross);
    const h = parseFloat(housing) || 0;
    if (g <= 0) return;
    const insuranceBase = Math.min(g + h, g + 3000);
    const insurance = insuranceBase * 0.09;
    setResult({ gross: g + h, insurance, net: g + h - insurance });
  };

  const schemaName = "حاسبة الراتب الصافي";
const schemaDesc = `Online حاسبة الراتب الصافي - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/salary-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "حاسبة الراتب الصافي", url: "https://adwatak.cloud/tools/salary-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة الراتب الصافي" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">💵 حاسبة الراتب الصافي</h1>
        <p className="text-sm text-gray-500 mb-6">احسب راتبك بعد التأمينات والاستقطاعات</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">الراتب الإجمالي (ريال)</label>
          <input type="number" value={gross} onChange={(e) => setGross(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="10,000" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">بدل السكن (ريال) — اختياري</label>
          <input type="number" value={housing} onChange={(e) => setHousing(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="2,000" />
        </div>
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب الراتب الصافي
        </button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">التأمينات (9%)</p>
            <p className="text-xl font-extrabold text-blue-900">{result.insurance.toLocaleString("ar-SA")} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">الراتب الصافي</p>
            <p className="text-xl font-extrabold text-green-900">{result.net.toLocaleString("ar-SA")} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
            <p className="text-xs text-red-600 mb-1">إجمالي الخصومات</p>
            <p className="text-xl font-extrabold text-red-900">{result.insurance.toLocaleString("ar-SA")} <span className="text-xs">ر.س</span></p>
          </div>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    </div>
  );
}
