"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";

const faqs = [
  { question: "ما هي العملات المدعومة في المحول؟", answer: "ندعم أكثر من 12 عملة: ريال سعودي (SAR)، درهم إماراتي (AED)، جنيه مصري (EGP)، دينار كويتي (KWD)، ريال قطري (QAR)، ريال عماني (OMR)، دينار بحريني (BHD)، دولار أمريكي (USD)، يورو (EUR)، جنيه إسترليني (GBP)، ليرة تركية (TRY)، دينار أردني (JOD)." },
  { question: "من أين تأتي أسعار الصرف؟", answer: "أسعار الصرف هي سعر المتوسط بين البيع والشراء (Mid-market rate). هذه الأسعار للتوجيه فقط — البنوك والصرافات تضيف هامش ربح 1-5%. السعر الفعلي للتحويل قد يختلف." },
  { question: "لماذا يختلف سعر الصرف من مكان لآخر؟", answer: "البنوك تضيف هامش ربح (spread) يختلف من بنك لآخر. صرافات المطارات الأغلى (2-5% فوق السعر الرسمي). التحويل البنكي المباشر (أونلاين) غالباً أفضل سعر. في السعودية، صرافة الروابي وحسين العودي من الأفضل." },
  { question: "هل يمكن تحويل العملات بدون رسوم؟", answer: "لا، كل بنك أو صرافة يأخذ رسماً أو هامش ربح. أقل الرسوم عادة في البنوك الإلكترونية وبطاقات السفر (STC Pay، بطاقة الراجحي للسفر). بعض البنوك تقدم تحويلات بدون رسوم للعملات المرتبطة كالدرهم والدولار." },
  { question: "ما هو أفضل وقت لتحويل العملات؟", answer: "تجنب نهاية الأسبوع (السبت-الأحد) لأن الأسواق مغلقة والهامش أعلى. أفضل وقت: الأحد-الخميس بين 8 صباحاً و10 مساءً بتوقيت لندن. تجنب أيام الأخبار الاقتصادية الكبرى (قرارات الفائدة، بيانات التوظيف)." },
  { question: "هل العملات الخليجية مرتبطة بالدولار؟", answer: "نعم، معظم العملات الخليجية مرتبطة بالدولار بسعر صرف ثابت: الريال السعودي = 3.75 دولار، الدرهم الإماراتي = 3.67، الريال القطري = 3.64. الدينار الكويتي هو الأغلى عالمياً وغير مرتبط بالدولار بشكل كامل." },
  { question: "كيف أحول الريال السعودي للجنيه المصري؟", answer: "سعر الصرف التقريبي: 1 SAR ≈ 12.5 EGP (يتغير يومياً). مثال: 1,000 ريال × 12.5 = 12,500 جنيه. استخدم المحول للحصول على السعر الحالي لأن الجنيه المصري متقلب." },
  { question: "ما الفرق بين سعر البيع والشراء في العملات؟", answer: "سعر البيع = السعر الذي يبيع به البنك العملة لك. سعر الشراء = السعر الذي يشتري به البنك العملة منك. الفرق بينهما هو هامش ربح البنك (spread). المحول يعطي السعر الوسطي (Mid-rate)." },
  { question: "هل يمكن تحويل العملات الرقمية (Bitcoin)؟", answer: "حالياً لا ندعم العملات الرقمية. نحول بين العملات التقليدية (Fiat) فقط. للعملات الرقمية، استخدم منصات متخصصة مثل Binance أو Coinbase." },
  { question: "كيف أستخدم المحول للسفر؟", answer: "أدخل المبلغ بالعملة التي معك (مثلاً ريال سعودي)، اختر العملة الهدف (مثلاً دولار أمريكي). ستحصل على القيمة المعادلة. استخدم السعر كمؤشر — السعر الفعلي في الصرافة قد يختلف قليلاً." },
  { question: "هل الأداة تحفظ أسعار الصرف؟", answer: "الأسعار في الأداة ثابتة للتوجيه (تدفع يدوياً). للحصول على أسعار حية، استخدم تطبيقات مثل XE.com أو Google Finance." },
  { question: "لماذا اليورو والجنيه الإسترليني مهمان؟", answer: "للسفر والعمل مع الشركات الأوروبية والبريطانية. كثير من الشركات العربية تتعامل مع أوروبا وبريطانيا. اليورو ثاني أقوى عملة احتياطية عالمياً بعد الدولار." },
];

const relatedTools = [
  { title: "حاسبة الضريبة", icon: "🏛️", href: "/tools/vat-calculator" },
  { title: "حاسبة هامش الربح", icon: "📈", href: "/tools/profit-margin" },
  { title: "حاسبة الذهب", icon: "🥇", href: "/tools/gold-calculator" },
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
  { title: "حاسبة التقسيط", icon: "📊", href: "/tools/installment-calculator" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator" },
];

const seoContent = [
  "محوّل العملات يساعدك على التحويل الفوري بين أكثر من 12 عملة عربية ودولية — ريال سعودي، درهم إماراتي، جنيه مصري، دينار كويتي، دولار، يورو، وأكثر. أدخل المبلغ واختر العملتين للحصول على النتيجة.",
  "تتذبذب أسعار صرف العملات يومياً حسب العرض والطلب في سوق الفوركس (سوق الصرف الأجنبي). العملات الخليجية (ماعدا الدينار الكويتي) مرتبطة بالدولار الأمريكي بسعر صرف ثابت. الجنيه المصري شهد تقلبات كبيرة في السنوات الأخيرة.",
  "استخدم محوّل العملات للتخطيط للسفر (اعرف قيمة نقودك في البلد الوجهة)، مقارنة الأسعار بين الدول للتسوق أونلاين، حساب قيمة التحويلات البنكية الدولية، أو معرفة قيمة مشترياتك بالعملة المحلية.",
  "مثال: كم تساوي 5,000 ريال سعودي بالدولار؟ السعر التقريبي: 1 SAR = 0.267 USD. 5,000 × 0.267 = 1,335 دولار. البنك قد يعطيك 1,300-1,320 دولار بعد خصم هامش الربح.",
  "نصيحة للسفر: لا تغير كل نقودك في المطار — سعر الصرف هناك الأسوأ. غيّر مبلغاً صغيراً تكفيك أول يومين، والباقي غيّره في المدينة. استخدم بطاقة STC Pay أو بطاقة السفر من الراجحي لتحصل على سعر أفضل.",
  "للتجار: أسعار الصرف التي نعرضها للتوجيه فقط. للتحويلات التجارية الكبيرة، تواصل مع البنك مباشرة للحصول على سعر تنافسي (البنوك تعطي سعر أفضل للمبالغ الكبيرة)."
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const rates: Record<string, number> = { SAR: 1, AED: 1.02, EGP: 12.5, KWD: 0.075, QAR: 0.99, USD: 0.267, EUR: 0.245, GBP: 0.212, BHD: 0.1, OMR: 0.105, JOD: 0.189, TRY: 3.8 };
  const [from, setFrom] = useState("SAR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState<any>(null);

  const convert = () => {
    const a = parseFloat(amount);
    if (a <= 0) return;
    const inSAR = a / rates[from];
    const converted = inSAR * rates[to];
    setResult({ amount: a, from, to, converted, rate: rates[to] / rates[from] });
  };

  const schemaName = "محوّل العملات";
const schemaDesc = `Online محوّل العملات - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/currency-converter";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "محوّل العملات", url: "https://adwatak.cloud/tools/currency-converter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="محوّل العملات" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">💱 محوّل العملات</h1>
        <p className="text-sm text-gray-500 mb-6">حوّل بين العملات العربية والعالمية</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">المبلغ</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1,000" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">من</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
              {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">إلى</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
              {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-2">الأسعار للتوجيه فقط — البنوك تضيف هامش</p>
        <button onClick={convert}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          حوّل
        </button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200 mb-6">
          <p className="text-xs text-green-600">{result.amount.toLocaleString("ar-SA")} {result.from} =</p>
          <p className="text-3xl font-black text-green-900 my-2">{result.converted.toLocaleString("ar-SA", { maximumFractionDigits: 2 })} {result.to}</p>
          <p className="text-xs text-gray-500">سعر الصرف: 1 {result.from} = {result.rate.toFixed(4)} {result.to}</p>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    </div>
  );
}
