interface BreadcrumbProps {
  category: string;
  categorySlug: string;
  toolName: string;
  lang?: "ar" | "en" | "tr";
}

// Valid category paths — only links to real pages
const CATEGORY_PATHS: Record<string, string> = {
  calculators: "calculators",
  converters: "converters",
  text: "text",
  generators: "generators",
  dev: "dev",
  islamic: "islamic",
  daily: "daily",
  image: "daily",      // image tools live under "daily" section
  pdf: "daily",        // pdf tools live under "daily" section
};

export default function Breadcrumb({ category, categorySlug, toolName, lang = "en" }: BreadcrumbProps) {
  const homeText = lang === "ar" ? "الرئيسية" : lang === "tr" ? "Ana Sayfa" : "Home";
  const homeHref = lang === "ar" ? "/" : lang === "tr" ? "/tr" : "/en";
  const prefix = lang === "ar" ? "" : lang === "tr" ? "/tr" : "/en";

  // Build category link — only link to valid category pages
  const catPath = CATEGORY_PATHS[categorySlug] || null;
  const categoryHref = catPath ? `${prefix}/category/${catPath}` : null;

  return (
    <nav className="text-xs text-gray-400 mb-5 flex items-center gap-2">
      <a href={homeHref} className="text-blue-600 no-underline">{homeText}</a>
      <span>›</span>
      {categoryHref ? (
        <a href={categoryHref} className="text-blue-600 no-underline">{category}</a>
      ) : (
        <span className="text-gray-400">{category}</span>
      )}
      <span>›</span>
      <span className="text-gray-500">{toolName}</span>
    </nav>
  );
}
