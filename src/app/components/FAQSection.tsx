"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  lang?: "ar" | "en" | "tr" | "id" | "fr";
}

export default function FAQSection({ faqs, lang = "en" }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  const title = lang === "ar" ? "❓ الأسئلة الشائعة" : lang === "tr" ? "❓ Sıkça Sorulan Sorular" : "❓ Frequently Asked Questions";
  const subtitle = lang === "ar" ? "إجابات لأكثر الأسئلة شيوعاً" : lang === "tr" ? "En yaygın soruların cevapları" : "Answers to the most common questions";

  return (
    <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-1">{title}</h2>
      <p className="text-xs text-gray-400 mb-5">{subtitle}</p>
      <div className="flex flex-col gap-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-50 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className={`w-full text-right p-3.5 border-none font-semibold text-sm text-gray-700 cursor-pointer flex justify-between items-center font-inherit ${
                open === i ? "bg-blue-50" : "bg-gray-50"
              }`}
            >
              <span>{faq.question}</span>
              <span className={`text-lg shrink-0 ${open === i ? "text-blue-600" : "text-gray-400"}`}>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="p-3.5 text-sm text-gray-600 leading-relaxed bg-white">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
