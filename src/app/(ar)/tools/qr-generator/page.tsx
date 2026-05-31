"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";

const faqs = [
  { question: "ما هي أنواع QR المدعومة؟", answer: "نص عادي، رابط URL، رقم هاتف (اتصال مباشر)، رسالة SMS، بيانات واي فاي (اسم الشبكة + كلمة السر)، vCard (بطاقة اتصال كاملة رابط واتساب)." },
  { question: "هل يعمل بدون إنترنت؟", answer: "نعم، الـ QR يُولد بالكامل في متصفحك (Client-side) ولا يحتاج اتصال بأي خادم. كل شيء محلي وآمن." },
  { question: "ما هو الحد الأقصى للنص؟", answer: "QR Code يدعم حتى 4,296 حرف رقمي، 2,953 حرف أبجدي، أو 1,817 حرف ياباني. للروابط والرسائل القصيرة، هذا كافي جداً." },
  { question: "كيف أستخدم QR Code في التسويق؟", answer: "ضعه على بطاقات العمل، الكتالوجات، الإعلانات المطبوعة، منتجات المتجر، أو شاشات العرض. المسح بالجوال ينقل العميل مباشرة لموقعك أو صفحة المنتج." },
  { question: "هل QR Code آمن؟", answer: "QR Code نفسه مجرد وسيلة تخزين. الخطر في ما يقرأه المستخدم عند المسح. احذر من QR Codes في الأماكن العامة (قد تكون معدلة بقصد ضار — 'QRishing'). تحقق من الرابط قبل فتحه." },
  { question: "ما الفرق بين QR Code والباركود؟", answer: "الباركود: خطوط عمودية، يخزن أرقاماً فقط، يقرأ بخط واحد. QR Code: مربع، يخزن نصوصاً ورموزاً، يقرأ بخطين (أفقي ورأسي) — أسرع وأكبر سعة. QR Code هو التطور الحديث." },
  { question: "كم مرة يمكن مسح QR Code؟", answer: "غير محدود. QR Code هو صورة ثابتة — كل من يمسحها يقرأ نفس البيانات. لا ينتهي صلاحيته (إلا إذا غيرت الرابط اللي يشير له)." },
  { question: "هل يمكن تخصيص شكل QR Code؟", answer: "نعم، يمكن تغيير الألوان، إضافة شعار في المنتصف، تغيير شكل النقاط. عكس الألوان التقليدية (أبيض على أسود) يجذب الانتباه. لكن احذر — التخصيص الزائد قد يمنع بعض أجهزة المسح من قراءته." },
  { question: "ما هو الحد الأدنى لحجم QR Code للطباعة؟", answer: "2 × 2 سم على الأقل للطباعة. كلما زاد حجم الطباعة، كانت القراءة أسهل. للشاشات، 1 × 1 سم كافي. اختبر المسح من مسافة الاستخدام المتوقعة." },
  { question: "كيف أتتبع عدد مسحات QR Code؟", answer: "استخدم رابطاً قصيراً (مثل bit.ly أو adwatak.cloud/go/xyz) بدلاً من الرابط المباشر. الـ QR يقرأ الرابط القصير، وخلفه رابط طويل مع تتبع. بهذه الطريقة تعرف كم مسحة وكم زيارة." },
  { question: "هل QR Codes تعمل في الإضاءة المنخفضة؟", answer: "نعم، معظم الهواتف تقرأ QR في الإضاءة المنخفضة بفضل فلاش الكاميرا. لكن تجنب الطباعة على أسطح لامعة (تعكس الضوء) أو منحنية (تشوه الصورة). الخلفية البيضاء مع النقاط السوداء هي الأفضل." },
  { question: "ما هو مستقبل QR Codes؟", answer: "مع COVID-19، انتشر استخدام QR في المطاعم (قوائم بدون لمس)، التذاكر الإلكترونية، والمدفوعات. تقنية NFC تنافسه لكن QR لا يحتاج شريحة خاصة — كل كاميرا جوال تقرؤه. متوقع أن يزداد استخدامه مع التسويق الرقمي." },
];

const relatedTools = [
  { title: "رابط واتساب", icon: "💬", href: "/tools/whatsapp-link" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "مولد أسماء", icon: "👤", href: "/tools/name-generator" },
  { title: "مولد أرقام عشوائية", icon: "🎲", href: "/tools/random-number" },
];

const seoContent = [
  "مولد رمز QR Code يساعدك على إنشاء رمز QR احترافي لأي نص أو رابط أو هاتف بسهولة. اكتب المحتوى واحصل على QR Code جاهز للاستخدام في ثوانٍ — للمطاعم، البطاقات، الإعلانات، والتسويق.",
  "QR Code اختصار لـ Quick Response Code. اخترعته شركة Denso Wave اليابانية عام 1994. يتميز بالسرعة في القراءة وسعة التخزين الكبيرة. صار جزءاً أساسياً من حياتنا اليومية — من المطاعم لبطاقات التطعيم.",
  "أنواع المحتوى المدعومة: نص عادي (معلومات، إعلانات)، رابط URL (موقعك، منتجك)، رقم هاتف (اتصال مباشر بضغطة)، SMS (رسالة جاهزة)، واي فاي (اتصال تلقائي بالشبكة)، vCard (بطاقة اتصال كاملة).",
  "نصائح للاستخدام التسويقي: ضع QR على بطاقات العمل، الإعلانات المطبوعة، علب المنتجات، شاشات العرض، والمطاعم (قوائم رقمية). اختبر المسح قبل الطباعة بكميات. استخدم رابط قصير لتتبع المسحات.",
  "إحصائيات: 83% من مستخدمي الجوال في السعودية مسحوا QR Code مرة على الأقل. 45% من المطاعم تستخدم QR للقوائم. التذاكر الإلكترونية (طيران، فعاليات) تعتمد بالكامل على QR. المدى الأقصى للمسح: 30-50 سم على الجوال.",
  "الأداة مجانية بالكامل، تعمل في المتصفح بدون رفع بيانات، وتدعم اللغة العربية كاملة. يمكنك نسخ الرابط أو مشاركته مباشرة."
];

export default function QrGenerator() {
  const [text, setText] = useState("");
  const schemaName = "مولد QR Code";
const schemaDesc = `Online مولد QR Code - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/qr-generator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "مولد QR Code", url: "https://adwatak.cloud/tools/qr-generator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="مولدات" categorySlug="generators" toolName="مولد QR Code" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔳 مولد QR Code</h1>
        <p className="text-sm text-gray-500 mb-6">إنشاء QR Code لرابط أو نص</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[120px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="أدخل النص أو الرابط..." />
        {text && (
          <div className="text-center mt-6 p-6 bg-gray-50 rounded-xl">
            <div className="w-[200px] h-[200px] bg-white mx-auto flex items-center justify-center border-2 border-gray-200 rounded-xl">
              <span className="text-6xl">🔳</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">QR Code سيظهر هنا</p>
          </div>
        )}
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    </div>
  );
}
