"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "هل يمكنني إضافة بنود متعددة للفاتورة؟", answer: "نعم، استخدم زر '+ إضافة بند' لإضافة بنود متعددة. كل بند له اسم، كمية، وسعر." },
  { question: "كيف أحفظ الفاتورة؟", answer: "اضغط 'طباعة الفاتورة' ثم من نافذة الطباعة اختر 'حفظ كـ PDF' أو اطبعها." },
  { question: "هل أحتاج حساباً؟", answer: "لا، مجاني بالكامل وبدون تسجيل. كل شيء في المتصفح." },
  { question: "هل الفاتورة قانونية؟", answer: "تحتوي على العناصر الأساسية: اسم الشركة، العميل، البنود، الضريبة، الإجمالي. للاستخدام التجاري، قد تحتاج معلومات إضافية حسب بلدك." },
  { question: "هل يمكن تغيير نسبة الضريبة؟", answer: "حالياً 15% (السعودية). Cities أخرى في تحديث قادم." },
  { question: "هل يمكن إضافة خصم؟", answer: "قادم قريباً. حالياً يمكنك تعديل سعر البند ليشمل الخصم." },
  { question: "هل يمكن إضافة شعار الشركة؟", answer: "قادم قريباً. حالياً اكتب اسم الشركة." },
  { question: "ما صيغة الفاتورة؟", answer: "HTML للطباعة و PDF عبر طباعة المتصفح." },
];

const relatedTools = [
  { title: "حاسبة الضريبة", icon: "🏛️", href: "/tools/vat-calculator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
  { title: "حاسبة هامش الربح", icon: "📈", href: "/tools/profit-margin" },
  { title: "تحويل الأرقام لحروف", icon: "🔢", href: "/tools/number-to-words" },
  { title: "رابط واتساب", icon: "💬", href: "/tools/whatsapp-link" },
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
];

const seoContent = [
  "مولد الفواتير يساعدك على إنشاء فواتير احترافية بالعربية. أضف بنود متعددة، واطبع أو احفظ كـ PDF. ضريبة 15% مضافة تلقائياً.",
  "مناسبة للمستقلين، المتاجر الصغيرة، والاستشاريين. لا تحتاج تسجيل — مجانية تماماً.",
  "الفاتورة تحتوي على: اسم الشركة، العميل، جدول البنود، الضريبة 15%، الإجمالي. تصميم نظيف للطباعة.",
];

export default function InvoiceGenerator() {
  const [company, setCompany] = useState("");
  const [client, setClient] = useState("");
  const [invoiceNo, setInvoiceNo] = useState(`INV-${Date.now().toString(36).toUpperCase()}`);
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);
  const [showPrint, setShowPrint] = useState(false);

  const addItem = () => setItems((prev) => [...prev, { name: "", qty: 1, price: 0 }]);
  const removeItem = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: string, value: string | number) => {
    setItems((prev) => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;
  const today = new Date().toLocaleDateString("ar-SA");

  const printInvoice = () => {
    setShowPrint(true);
    setTimeout(() => {
      window.print();
      setShowPrint(false);
    }, 200);
  };

  const schemaName = "مولد الفواتير";
  const schemaDesc = "فاتورة احترافية قابلة للطباعة";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/invoice-generator";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "مولدات", url: "https://adwatak.cloud/tools/generators" },
    { name: "مولد الفواتير", url: "https://adwatak.cloud/tools/invoice-generator" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "ar", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="مولدات" categorySlug="generators" toolName="مولد الفواتير" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧾 مولد الفواتير</h1>
        <p className="text-sm text-gray-500 mb-6">إنشاء فواتير احترافية مع بنود متعددة — قابلة للطباعة</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">اسم الشركة</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" placeholder="شركتك" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">اسم العميل</label>
              <input value={client} onChange={(e) => setClient(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" placeholder="العميل" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">رقم الفاتورة</label>
            <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-mono" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">البنود</label>
              <button onClick={addItem}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs transition-all cursor-pointer border-none">
                + إضافة بند
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <div className="flex-[3]">
                    <label className="block text-xs text-gray-500 mb-1">الوصف</label>
                    <input value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)}
                      className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none" placeholder="خدمة / منتج" />
                  </div>
                  <div className="flex-[1]">
                    <label className="block text-xs text-gray-500 mb-1">الكمية</label>
                    <input type="number" min={1} value={item.qty} onChange={(e) => updateItem(i, "qty", parseInt(e.target.value) || 1)}
                      className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none" />
                  </div>
                  <div className="flex-[1.5]">
                    <label className="block text-xs text-gray-500 mb-1">السعر</label>
                    <input type="number" min={0} step={0.01} value={item.price} onChange={(e) => updateItem(i, "price", parseFloat(e.target.value) || 0)}
                      className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none" />
                  </div>
                  <div className="flex-[1] text-center">
                    <p className="text-xs text-gray-400 mb-1.5">الإجمالي</p>
                    <p className="text-sm font-bold pt-1.5">{(item.qty * item.price).toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeItem(i)} disabled={items.length === 1}
                    className="bg-red-100 hover:bg-red-200 text-red-600 font-bold p-2.5 rounded-xl text-xs transition-all cursor-pointer border-none disabled:opacity-30 mb-0.5">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex justify-between text-sm"><span>الإجمالي قبل الضريبة:</span><span className="font-bold">{subtotal.toFixed(2)} ر.س</span></div>
            <div className="flex justify-between text-sm"><span>ضريبة 15%:</span><span className="font-bold">{vat.toFixed(2)} ر.س</span></div>
            <div className="flex justify-between text-lg font-black text-blue-900 border-t border-blue-300 pt-2 mt-2">
              <span>الإجمالي:</span><span>{total.toFixed(2)} ر.س</span>
            </div>
          </div>

          <button onClick={printInvoice}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base">
            🖨️ طباعة الفاتورة / حفظ PDF
          </button>

          {showPrint && (
            <div id="invoice-print" className="hidden print:block p-8 bg-white" dir="rtl">
              <div className="border-b-2 border-gray-800 pb-4 mb-4">
                <h2 className="text-2xl font-black">{company || "شركتك"}</h2>
                <p className="text-xs text-gray-500">{invoiceNo} | {today}</p>
              </div>
              <p className="text-sm mb-4"><strong>العميل:</strong> {client || "العميل"}</p>
              <table className="w-full text-sm border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-right">الوصف</th>
                    <th className="p-2 text-center">الكمية</th>
                    <th className="p-2 text-left">السعر</th>
                    <th className="p-2 text-left">الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} className="border-b border-gray-200">
                      <td className="p-2">{item.name || "—"}</td>
                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-left">{item.price.toFixed(2)}</td>
                      <td className="p-2 text-left">{(item.qty * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-left">
                <p>الإجمالي قبل الضريبة: {subtotal.toFixed(2)} ر.س</p>
                <p>ضريبة 15%: {vat.toFixed(2)} ر.س</p>
                <p className="font-black text-lg">الإجمالي: {total.toFixed(2)} ر.س</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
