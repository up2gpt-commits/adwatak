import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adwatak.cloud";

  const locales = ["", "en", "tr", "id", "fr"] as const;

  const staticPaths = [
    "", "/about", "/privacy", "/blog",
  ];

  const categoryPaths = [
    "/category/calculators",
    "/category/converters",
    "/category/text",
    "/category/generators",
    "/category/dev",
    "/category/islamic",
    "/category/daily",
  ];

  const arTools = [
    "age-calculator", "ai-content-detector", "arabic-lorem", "background-remover",
    "barcode-generator", "base64-encoder",
    "bio-generator", "bmi-calculator", "calorie-calculator", "car-installment",
    "color-converter", "compound-interest", "currency-converter", "emi-calculator",
    "encoder", "gold-calculator", "hash-generator", "hijri-converter",
    "image-to-pdf", "inheritance-calculator", "installment-calculator",
    "invoice-generator", "json-formatter", "loan-calculator", "mortgage-calculator",
    "name-generator", "number-to-words", "password-generator", "pdf-compressor",
    "pdf-merger", "pdf-splitter", "pdf-to-word", "prayer-times", "profit-margin",
    "qibla-direction", "qr-generator", "qr-reader", "random-number",
    "salary-calculator", "seo-audit", "social-character-counter", "stopwatch",
    "typing-test", "text-case", "text-cleaner", "text-compare", "unit-converter",
    "vat-calculator", "whatsapp-link", "word-counter", "zakat-calculator",
    "plagiarism-checker", "grammar-checker", "paraphrasing-tool", "image-resizer",
    "image-compressor", "youtube-thumbnail-downloader", "css-minifier",
    "markdown-editor", "ip-lookup", "seo-content-generator",
  ];

  const enTools = arTools.filter(t => t !== "seo-content-generator" || true);
  const trTools = [...enTools];
  const idTools = [...enTools];
  const frTools = [...enTools];

  const arBlogSlugs = [
    "how-to-calculate-zakat", "how-to-calculate-mortgage",
    "simple-vs-compound-interest", "best-free-arabic-tools-2026",
    "emi-calculator-guide-2026",
    "inheritance-guide-2026", "vat-calculator-guide-2026",
    "zakat-money-calculator-2026", "barcode-qr-guide-business",
    "image-to-pdf-guide",
  ];
  const enBlogSlugs = [
    "how-to-calculate-zakat", "how-to-calculate-mortgage",
    "simple-vs-compound-interest", "best-free-arabic-tools-2026",
    "emi-calculator-guide-2026",
  ];
  const trBlogSlugs = ["adwatak-nedir-2026"];
  const idBlogSlugs = ["apa-itu-adwatak"];
  const frBlogSlugs: string[] = [];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages + categories with hreflang
  for (const locale of locales) {
    const prefix = locale === "" ? "" : `/${locale}`;

    // Static pages
    for (const path of staticPaths) {
      const url = `${baseUrl}${prefix}${path}`;
      const alternates: Record<string, string> = {};
      for (const l of locales) {
        alternates[l === "" ? "x-default" : l] = `${baseUrl}${l === "" ? "" : `/${l}`}${path}`;
      }
      entries.push({
        url,
        lastModified: "2026-06-03",
        changeFrequency: path === "" ? "daily" as const : "weekly" as const,
        priority: path === "" ? 1.0 : path === "/en" || path === "/tr" || path === "/id" || path === "/fr" ? 0.9 : 0.8,
        alternates: { languages: alternates },
      });
    }

    // Category pages (AR only has content, others get redirect — so only include AR)
    if (locale === "") {
      for (const catPath of categoryPaths) {
        entries.push({
          url: `${baseUrl}${catPath}`,
          lastModified: "2026-06-03",
          changeFrequency: "weekly" as const,
          priority: 0.7,
        });
      }
    }
  }

  // Tool pages with hreflang
  const toolLocales = [
    { tools: arTools, locale: "" },
    { tools: enTools, locale: "en" },
    { tools: trTools, locale: "tr" },
    { tools: idTools, locale: "id" },
    { tools: frTools, locale: "fr" },
  ] as const;

  for (const { tools, locale: toolLocale } of toolLocales) {
    const prefix = toolLocale === "" ? "" : `/${toolLocale}`;
    for (const slug of tools) {
      const url = `${baseUrl}${prefix}/tools/${slug}`;
      const alternates: Record<string, string> = {};
      for (const l of locales) {
        alternates[l === "" ? "x-default" : l] = `${baseUrl}${l === "" ? "" : `/${l}`}/tools/${slug}`;
      }
      entries.push({
        url,
        lastModified: "2026-06-03",
        changeFrequency: "weekly" as const,
        priority: toolLocale === "" ? 0.9 : 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  // Blog posts with hreflang
  const blogEntries = [
    { slugs: arBlogSlugs, locale: "" },
    { slugs: enBlogSlugs, locale: "en" },
    { slugs: trBlogSlugs, locale: "tr" },
    { slugs: idBlogSlugs, locale: "id" },
    { slugs: frBlogSlugs, locale: "fr" },
  ] as const;

  for (const { slugs, locale: blogLocale } of blogEntries) {
    const prefix = blogLocale === "" ? "" : `/${blogLocale}`;
    for (const slug of slugs) {
      const url = `${baseUrl}${prefix}/blog/${slug}`;
      const alternates: Record<string, string> = {};
      if (blogLocale === "" || blogLocale === "en") {
        alternates["ar"] = `${baseUrl}/blog/${slug}`;
        alternates["en"] = `${baseUrl}/en/blog/${slug}`;
        alternates["x-default"] = `${baseUrl}/blog/${slug}`;
      }
      entries.push({
        url,
        lastModified: "2026-06-03",
        changeFrequency: "monthly" as const,
        priority: blogLocale === "" ? 0.7 : 0.6,
        ...(Object.keys(alternates).length > 0 ? { alternates: { languages: alternates } } : {}),
      });
    }
  }

  return entries;
}
