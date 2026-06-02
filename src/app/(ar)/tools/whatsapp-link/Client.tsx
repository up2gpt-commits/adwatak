"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "كيف أستخدم رابط واتساب المباشر؟", answer: "أدخل رقم الهاتف مع كود الدولة (بدون + أو صفر)، أضف رسالة مسبقة (اختياري)، اضغط 'ولّد الرابط'. انسخ الرابط وضعه في زر 'تواصل معنا' على موقعك أو شاركه على السوشيال ميديا." },
  { question: "هل يعمل بدون حفظ الرقم في جهات الاتصال؟", answer: "نعم، الرابط يفتح المحادثة مباشرة في واتساب بدون حفظ الرقم في جهات الاتصال. هذا مثالي للإعلانات والمواقع — الزائر يضغط ويتحدث فوراً." },
  { question: "هل يعمل على الجوال والكمبيوتر؟", answer: "على الجوال (iOS/Android): يفتح تطبيق واتساب مباشرة. على الكمبيوتر: يفتح web.whatsapp.com. تأكد من تثبيت واتساب على الجوال للاستخدام السلس." },
  { question: "هل يمكنني تخصيص الرسالة المسبقة؟", answer: "نعم، اكتب أي رسالة في حقل 'الرسالة المسبقة' — مثلاً 'مرحباً، أريد الاستفسار عن منتجاتكم'. الرسالة ستظهر في مربع الكتابة عند فتح المحادثة، ويمكن للعميل تعديلها قبل الإرسال." },
  { question: "هل الرابط مدعوم رسمياً من واتساب؟", answer: "نعم، الرابط يستخدم النطاق الرسمي wa.me — المعتمد من واتساب. كل الروابط المولدة بالأداة رسمية وآمنة. النطاق القديم (api.whatsapp.com) ما زال يعمل لكن wa.me هو الموصى به." },
  { question: "ما هو الـ Click to Chat؟", answer: "Click to Chat هي ميزة رسمية من واتساب تسمح بإنشاء رابط يفتح محادثة مباشرة مع رقم محدد. تُستخدم في التسويق الرقمي، خدمة العملاء، مواقع التجارة الإلكترونية، والإعلانات على وسائل التواصل." },
  { question: "لماذا لا يعمل الرابط؟", answer: "الأسباب الشائعة: الرقم بدون كود الدولة (مثلاً 966 للسعودية)، وجود + أو صفر قبل الرقم (يزيلهم تلقائياً). تأكد من تثبيت واتساب على الجوال. جرب فتح الرابط من متصفح آخر." },
  { question: "هل يمكن استخدام الرابط في الإعلانات المدفوعة؟", answer: "نعم، فيسبوك وإنستغرام وجوجل إعلانات تدعم روابط واتساب. استخدم الرابط في زر Call to Action 'تواصل عبر واتساب'. الإعلانات ذات روابط واتساب تحقق نسبة نقر أعلى في المنطقة العربية." },
  { question: "ما هو أفضل تنسيق لرقم الهاتف؟", answer: "كود الدولة + الرقم بدون صفر، بدون +، بدون مسافات أو شرط. السعودية: 966501234567. الإمارات: 971501234567. مصر: 201001234567. الولايات المتحدة: 12025551234." },
  { question: "هل الرسالة المسبقة تظهر بالعربية؟", answer: "نعم، واتساب يدعم العربية والإنجليزية وأكثر من 40 لغة. اكتب رسالتك بالعربية — ستظهر كما هي. حرفياً بدون أي تشويش." },
  { question: "كم عدد الأحرف المسموح بها في الرسالة المسبقة؟", answer: "واتساب لا يحدد عدد أحرف في الرابط نفسه، لكن واجهة API لها حد 1,024 حرف. لرسائل أطول، اكتب رسالة قصيرة تشرح الموضوع واترك التفاصيل للمحادثة." },
  { question: "هل يمكن إنشاء QR Code للرابط؟", answer: "نعم! بعد توليد الرابط، استخدم مولد QR Code في أدواتك لتحويل الرابط لـ QR Code. ضع QR على بطاقات العمل، الإعلانات المطبوعة، أو علب المنتجات — المسح يفتح المحادثة مباشرة." },
];

const relatedTools = [
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
  { title: "عداد حروف السوشيال", icon: "📱", href: "/tools/social-character-counter" },
  { title: "مولد أسماء", icon: "👤", href: "/tools/name-generator" },
  { title: "مولد أرقام عشوائية", icon: "🎲", href: "/tools/random-number" },
];

const seoContent = [
  "أداة إنشاء رابط واتساب مباشر (Click to Chat) تُنشئ رابطاً يفتح محادثة واتساب مباشرة مع رقم محدد ورسالة مسبقة — مثالية لخدمة العملاء، التسويق، والتجارة الإلكترونية في العالم العربي.",
  "الرابط يعمل على الجوال (يفتح تطبيق واتساب) والكمبيوتر (يفتح web.whatsapp.com). معتمد رسمياً من واتساب عبر النطاق wa.me. أدخل الرقم والرسالة واضغط زر واحصل على الرابط في ثوانٍ.",
  "لماذا رابط واتساب أفضل من نموذج الاتصال التقليدي؟ 70% من العملاء العرب يفضلون التواصل عبر واتساب. رابط واتساب يقلل خطوات التواصل من 6 خطوات لخطوة واحدة. يزيد نسبة تحويل الزوار لعملاء.",
  "كيف تستخدمه في التسويق: ضعه في زر 'تواصل معنا' في موقعك، أضفه في Bio انستغرام وتويتر، استخدمه في إعلانات فيسبوك كـ Call to Action، ضعه في توقيع البريد الإلكتروني، واطبعه على بطاقات العمل.",
  "مثال: صاحب متجر أونلاين يضع رابط واتساب في كل صفحة منتج. العميل يضغط → المحادثة تفتح مع رسالة مسبقة 'مرحباً، أستفسر عن [اسم المنتج]'. هذا يزيد المبيعات ويحسن خدمة العملاء.",
  "الحاسبة مجانية بالكامل، تدعم العربية، ولا تخزن أي بيانات. استخدمها لتوليد روابط غير محدودة لأرقام مختلفة."
];

export default function Client() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  const generate = () => {
    const p = phone.replace(/[^0-9]/g, "");
    const m = encodeURIComponent(message);
    setLink(`https://wa.me/${p}?text=${m}`);
  };

  const schemaName = "رابط واتساب مباشر";
const schemaDesc = `Online رابط واتساب مباشر - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/whatsapp-link";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "مولدات", url: "https://adwatak.cloud/category/calculators" },
  { name: "رابط واتساب مباشر", url: "https://adwatak.cloud/tools/whatsapp-link" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="مولدات" categorySlug="generators" toolName="رابط واتساب مباشر" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">💬 رابط واتساب مباشر</h1>
        <p className="text-sm text-gray-500 mb-6">إنشاء رابط يفتح واتساب مباشرة مع رسالة</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">رقم الهاتف (مع كود الدولة)</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="966501234567" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">الرسالة المسبقة</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}
            className="w-full h-[80px] p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit"
            placeholder="مرحباً، أريد الاستفسار عن..." />
        </div>
        <button onClick={generate}
          className="bg-[#25D366] text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          ولّد الرابط
        </button>
      </div>
      {link && (
        <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-200">
          <p className="text-xs text-green-600 mb-2">الرابط</p>
          <p className="font-mono break-all m-0">{link}</p>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
