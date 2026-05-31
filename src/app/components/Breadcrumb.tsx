interface BreadcrumbProps {
  category: string;
  categorySlug: string;
  toolName: string;
  lang?: "ar" | "en";
}

export default function Breadcrumb({ category, categorySlug, toolName, lang = "en" }: BreadcrumbProps) {
  const homeText = lang === "ar" ? "الرئيسية" : "Home";
  const homeHref = lang === "ar" ? "/" : "/en";

  return (
    <nav className="text-xs text-gray-400 mb-5 flex items-center gap-2">
      <a href={homeHref} className="text-blue-600 no-underline">{homeText}</a>
      <span>›</span>
      <a href={`${lang === "ar" ? "" : "/en"}/tools/${categorySlug}`} className="text-blue-600 no-underline">{category}</a>
      <span>›</span>
      <span className="text-gray-500">{toolName}</span>
    </nav>
  );
}
