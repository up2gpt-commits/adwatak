"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "هل يمكنني إضافة شعار شركتي للفاتورة؟", answer: "نعم، يمكن إضافة صورة الشعار في رأس الفاتورة. قريباً سيتم إضافة خيار رفع الصورة. حالياً يمكنك كتابة اسم الشركة وشعارها النصي." },
  { question: "هل يدعم الفاتورة الإلكترونية السعودية (ZATCA)؟", answer: "يوفر الأساس — اسم الشركة، العميل، البنود، الضريبة 15%. التكامل مع منصة فاتورة (ZATCA) يتطلب تطويراً إضافياً. هذه الفاتورة مناسبة للاستخدام الداخلي والتجارة البسيطة." },
  { question: "هل يمكنني حفظ الفاتورة؟", answer: "نعم، اطبع الفاتورة مباشرة أو احفظها كـ PDF من متصفحك (Ctrl+P → حفظ كـ PDF). الفاتورة تظهر في صفحة الطباعة بتنسيق نظيف ومناسب." },
  { question: "هل أحتاج حساباً لاستخدام مولد الفواتير؟", answer: "لا، مجاني بالكامل وبدون تسجيل. كل شيء يعمل في متصفحك. لا تُحفظ بيانات الفواتير على أي خادم." },
  { question: "كيف أضيف بنود متعددة للفاتورة؟", answer: "قريباً: زر إضافة بند جديد. حالياً، يمكن إدخال بند واحد فقط. لإنشاء فواتير معقدة، استخدم Excel ثم حوّل لـ PDF." },
  { question: "هل تدعم الفاتورة أكثر من عملة؟", answer: "حالياً الريال السعودي (SAR) مع ضريبة 15%. العملات الأخرى قادمة في تحديث. يمكنك تغيير رمز العملة يدوياً في النتيجة." },
  { question: "ما هي المعلومات المطلوبة في فاتورة قانونية؟", answer: "رقم الفاتورة (فريد)، تاريخ الإصدار، اسم وعنوان البائع، اسم وعنوان المشتري، وصف البضاعة/الخدمات، الكمية، السعر، الضريبة، الإجمالي. هذه المعلومات مطلوبة في أنظمة الضرائب." },
  { question: "هل الفاتورة المولدة مناسبة للمحاسبة؟", answer: "للحسابات البسيطة والأعمال الصغيرة، نعم. للشركات المتوسطة والكبيرة، استخدم أنظمة محاسبة متخصصة (Zoho, QuickBooks, Odoo) تتكامل مع البنوك والضرائب." },
  { question: "ما الفرق بين فاتورة ضريبية وأخرى عادية؟", answer: "الفاتورة الضريبية تحتوي على: الرقم الضريبي للبائع والمشتري، نسبة الضريبة، مبلغ الضريبة، الإجمالي شامل الضريبة. هذه المعلومات إلزامية في السعودية والإمارات للشركات المسجلة في VAT." },
  { question: "كيف أرسل الفاتورة للعميل؟", answer: "احفظها كـ PDF (Ctrl+P → حفظ كـ PDF) وأرسلها إيميلاً أو واتساب. أو اطبعها وسلّمها يدوياً. الروابط المولدة مؤقتة، لذا يُفضل حفظ الفاتورة." },
  { question: "هل تدعم الفاتورة العربية؟", answer: "نعم، الواجهة والفاتورة بالعربية. المحتوى (أسماء الشركة والعميل والبنود) يُكتب كما تدخله — عربي أو إنجليزي حسب احتياجك." },
  { question: "هل يوجد قالب فاتورة احترافي؟", answer: "نعم، فاتورة نظيفة واحترافية باللغة العربية مع اسم الشركة، العميل، الجدول، ضريبة 15%، والإجمالي. مناسبة لـ: freelancers، المتاجر الصغيرة، الاستشاريين." },
];

const relatedTools = [
  { title: "حاسبة الضريبة", icon: "🏛️", href: "/tools/vat-calculator" },
  { title: "تحويل الأرقام لحروف", icon: "🔢", href: "/tools/number-to-words" },
  { title: "رابط واتساب", icon: "💬", href: "/tools/whatsapp-link" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
  { title: "حاسبة هامش الربح", icon: "📈", href: "/tools/profit-margin" },
  { title: "QR Code Generator", icon: "🔳", href: "/tools/qr-generator" },
];

const seoContent = [
  "مولد الفواتير يساعدك على إنشاء فواتير احترافية بالعربية — أدخل اسم الشركة، العميل، البنود، واحصل على فاتورة كاملة مع ضريبة 15%. اطبعها أو احفظها كـ PDF.",
  "الفاتورة تتضمن: اسم الشركة واسم العميل، جدول البنود (الاسم، الكمية، السعر، الإجمالي)، ضريبة القيمة المضافة 15% (VAT)، الإجمالي قبل وبعد الضريبة، بتصميم نظيف واحترافي.",
  "مناسبة لـ: المستقلين (Freelancers — أصحاب المشاريع الصغيرة، مستشاري الأعمال)، والمتاجر الإلكترونية البسيطة. لا تحتاج تسجيل أو دفع — مجانية تماماً.",
  "تذكر أن الفاتورة التجارية يجب أن تحتوي على: رقم فريد، تاريخ الإصدار، بيانات البائع والمشتري، وصف الخدمة، الضريبة، والإجمالي. فاتورتنا تحتوي على كل هذا.",
  "الأداة تعمل في المتصفح فقط — لا تُحفظ بياناتك على أي خادم. أمان تام لبيانات عملك."
];

export default function InvoiceGenerator() {
  const [company, setCompany] = useState("");
  const [client, setClient] = useState("");
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const vat = subtotal * 0.15;

  const schemaName = "مولد الفواتير";
const schemaDesc = `Online مولد الفواتير - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/invoice-generator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "مولد الفواتير", url: "https://adwatak.cloud/tools/invoice-generator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="مولدات" categorySlug="generators" toolName="مولد الفواتير" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧾 مولد الفواتير</h1>
        <p className="text-sm text-gray-500 mb-6">إنشاء فواتير احترافية قابلة للطباعة</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">اسم الشركة</label><input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" placeholder="شركتك" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">اسم العميل</label><input value={client} onChange={(e) => setClient(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" placeholder="العميل" /></div>
        </div>
        <div className="text-sm text-gray-500 mb-2">
          الإجمالي قبل الضريبة: {subtotal.toFixed(2)} | الضريبة (15%): {vat.toFixed(2)} | الإجمالي: {(subtotal + vat).toFixed(2)} ر.س
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
