import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adwatak.cloud";

  const staticPages = [
    { path: "", lastModified: "2026-05-31" },
    { path: "/about", lastModified: "2026-05-31" },
    { path: "/privacy", lastModified: "2026-05-31" },
    { path: "/blog", lastModified: "2026-05-31" },
    { path: "/en", lastModified: "2026-05-31" },
    { path: "/en/about", lastModified: "2026-05-31" },
    { path: "/en/privacy", lastModified: "2026-05-31" },
    { path: "/en/blog", lastModified: "2026-05-31" },
    { path: "/category/calculators", lastModified: "2026-05-31" },
    { path: "/category/converters", lastModified: "2026-05-31" },
    { path: "/category/text", lastModified: "2026-05-31" },
    { path: "/category/generators", lastModified: "2026-05-31" },
    { path: "/category/dev", lastModified: "2026-05-31" },
    { path: "/category/islamic", lastModified: "2026-05-31" },
    { path: "/category/daily", lastModified: "2026-05-31" },
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
    "markdown-editor", "ip-lookup",
  ];

  const enTools = [
    "age-calculator", "ai-content-detector", "arabic-lorem", "background-remover",
    "barcode-generator", "base64-encoder",
    "bmi-calculator", "calorie-calculator", "color-converter", "compound-interest",
    "currency-converter", "emi-calculator", "gold-calculator", "hash-generator",
    "hijri-converter", "image-to-pdf", "image-compressor", "image-resizer",
    "inheritance-calculator", "installment-calculator", "ip-lookup",
    "json-formatter", "loan-calculator", "markdown-editor", "mortgage-calculator",
    "number-to-words", "paraphrasing-tool", "password-generator", "pdf-compressor",
    "pdf-merger", "pdf-to-word", "plagiarism-checker", "profit-margin",
    "qr-generator", "qr-reader", "random-number", "salary-calculator",
    "seo-audit", "social-character-counter", "stopwatch", "typing-test",
    "text-case", "text-cleaner", "text-compare", "unit-converter",
    "vat-calculator", "whatsapp-link", "word-counter", "zakat-calculator",
    "css-minifier", "grammar-checker",
  ];

  const arBlogSlugs = [
    "how-to-calculate-zakat", "how-to-calculate-mortgage",
    "simple-vs-compound-interest", "best-free-arabic-tools-2026",
  ];
  const enBlogSlugs = [
    "how-to-calculate-zakat", "how-to-calculate-mortgage",
    "simple-vs-compound-interest", "best-free-arabic-tools-2026",
  ];

  const entries: MetadataRoute.Sitemap = [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: page.path === "" ? "daily" as const : "weekly" as const,
      priority: page.path === "" ? 1.0 : page.path === "/en" ? 0.9 : 0.8,
    })),
    ...arTools.map((slug) => ({
      url: `${baseUrl}/tools/${slug}`,
      lastModified: "2026-05-31",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...enTools.map((slug) => ({
      url: `${baseUrl}/en/tools/${slug}`,
      lastModified: "2026-05-31",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...arBlogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: "2026-05-31",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...enBlogSlugs.map((slug) => ({
      url: `${baseUrl}/en/blog/${slug}`,
      lastModified: "2026-05-31",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return entries;
}
