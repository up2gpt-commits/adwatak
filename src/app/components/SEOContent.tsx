interface SEOContentProps {
  content: string[];
  lang?: "ar" | "en" | "tr" | "id" | "fr";
}

export default function SEOContent({ content, lang = "en" }: SEOContentProps) {
  const title = lang === "ar" ? "📖 دليل الاستخدام" : lang === "tr" ? "📖 Kullanım Rehberi" : "📖 Usage Guide";

  return (
    <div className="mt-10 p-7 bg-white rounded-2xl border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      <div className="text-sm text-gray-600 leading-8">
        {content.map((paragraph, i) => (
          <p key={i} className="mb-3.5">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
