interface RelatedToolsProps {
  tools: Array<{ title: string; icon: string; href: string }>;
  lang?: "ar" | "en" | "tr" | "id" | "fr";
}

export default function RelatedTools({ tools, lang = "en" }: RelatedToolsProps) {
  const title = lang === "ar" ? "🔗 أدوات ذات صلة" : "🔗 Related Tools";

  return (
    <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool, i) => (
          <a key={i} href={tool.href}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 no-underline font-semibold hover:border-blue-200 hover:text-blue-600 transition-colors">
            <span>{tool.icon}</span>
            <span>{tool.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
