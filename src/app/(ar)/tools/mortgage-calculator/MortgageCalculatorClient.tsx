"use client";

import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "@/app/components/StructuredData";
import FAQSection from "@/app/components/FAQSection";
import RelatedTools from "@/app/components/RelatedTools";
import SEOContent from "@/app/components/SEOContent";
import Breadcrumb from "@/app/components/Breadcrumb";
import ShareButtons from "@/app/components/ShareButtons";

function fmt(n: number) {
  return n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
}

interface Props {
  title: string;
  icon: string;
  desc: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedTools: Array<{ title: string; icon: string; href: string }>;
  seoContent: string[];
  schemaName: string;
  schemaDesc: string;
  schemaCategory: string;
  schemaUrl: string;
  breadcrumbItems: Array<{ name: string; url: string }>;
  lang?: "ar" | "en";
  category: string;
  categorySlug: string;
}

export default function MortgageCalculatorClient(props: Props) {
  const {
    title, icon, desc, faqs, relatedTools, seoContent,
    schemaName, schemaDesc, schemaCategory, schemaUrl,
    breadcrumbItems, lang = "ar",
    category, categorySlug,
  } = props;

  const [price, setPrice] = useState("");
  const [down, setDown] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<null | {
    monthly: number; total: number; totalInterest: number;
    schedule: { year: number; payment: number; principal: number; interest: number; balance: number }[];
  }>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(down) || 0;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    const principal = p - d;
    if (principal <= 0 || r <= 0 || n <= 0) return;
    const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const totalInterest = total - principal;
    const schedule = [];
    let balance = principal;
    let yearlyPrincipal = 0, yearlyInterest = 0, yearlyPayment = 0;
    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * r;
      const principalPayment = monthly - interestPayment;
      balance -= principalPayment;
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
      yearlyPayment += monthly;
      if (i % 12 === 0 || i === n) {
        schedule.push({ year: Math.ceil(i / 12), payment: yearlyPayment, principal: yearlyPrincipal, interest: yearlyInterest, balance: Math.max(0, balance) });
        yearlyPrincipal = 0; yearlyInterest = 0; yearlyPayment = 0;
      }
    }
    setResult({ monthly, total, totalInterest, schedule });
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang={lang} category={category} categorySlug={categorySlug} toolName={title} />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">{icon} {title}</h1>
        <p className="text-sm text-gray-500 mb-6">{desc}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">سعر العقار (ريال)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="500,000" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">الدفعة الأولى (ريال)</label>
            <input type="number" value={down} onChange={(e) => setDown(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="100,000" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">نسبة الفائدة السنوية (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1"
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="5.5" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">مدة القرض (سنوات)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="25" />
          </div>
        </div>

        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب القسط
        </button>
      </div>

      {result && (
        <div className="flex flex-col gap-4 mb-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
              <p className="text-xs text-blue-600 mb-1">القسط الشهري</p>
              <p className="text-xl font-extrabold text-blue-900">{fmt(result.monthly)} <span className="text-xs">ر.س</span></p>
            </div>
            <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
              <p className="text-xs text-green-600 mb-1">إجمالي السداد</p>
              <p className="text-xl font-extrabold text-green-900">{fmt(result.total)} <span className="text-xs">ر.س</span></p>
            </div>
            <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
              <p className="text-xs text-red-600 mb-1">إجمالي الفائدة</p>
              <p className="text-xl font-extrabold text-red-900">{fmt(result.totalInterest)} <span className="text-xs">ر.س</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-bold">📋 جدول الاستفلال (سنوي)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-right font-semibold">السنة</th>
                    <th className="p-3 text-right font-semibold">القسط السنوي</th>
                    <th className="p-3 text-right font-semibold">أصل الدين</th>
                    <th className="p-3 text-right font-semibold">الفائدة</th>
                    <th className="p-3 text-right font-semibold">المتبقي</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((row) => (
                    <tr key={row.year} className="border-t border-gray-50">
                      <td className="p-2.5 text-center">{row.year}</td>
                      <td className="p-2.5">{fmt(row.payment)}</td>
                      <td className="p-2.5">{fmt(row.principal)}</td>
                      <td className="p-2.5">{fmt(row.interest)}</td>
                      <td className="p-2.5 font-semibold">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <SEOContent content={seoContent} lang={lang} />
      <FAQSection faqs={faqs} lang={lang} />
      <RelatedTools tools={relatedTools} lang={lang} />
      <ShareButtons lang={lang} />
    </div>
  );
}
