import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllEnPosts } from "@/lib/blog-en";

const baseUrl = "https://adwatak.cloud";

// Arabic tool routes
const arTools = [
  { href: "/tools/mortgage-calculator", priority: 0.9 },
  { href: "/tools/loan-calculator", priority: 0.9 },
  { href: "/tools/installment-calculator", priority: 0.8 },
  { href: "/tools/emi-calculator", priority: 0.8 },
  { href: "/tools/profit-margin", priority: 0.8 },
  { href: "/tools/vat-calculator", priority: 0.8 },
  { href: "/tools/salary-calculator", priority: 0.8 },
  { href: "/tools/currency-converter", priority: 0.8 },
  { href: "/tools/compound-interest", priority: 0.8 },
  { href: "/tools/gold-calculator", priority: 0.8 },
  { href: "/tools/inheritance-calculator", priority: 0.9 },
  { href: "/tools/zakat-calculator", priority: 0.9 },
  { href: "/tools/hijri-converter", priority: 0.8 },
  { href: "/tools/age-calculator", priority: 0.7 },
  { href: "/tools/qibla-direction", priority: 0.7 },
  { href: "/tools/prayer-times", priority: 0.7 },
  { href: "/tools/word-counter", priority: 0.7 },
  { href: "/tools/text-case", priority: 0.7 },
  { href: "/tools/number-to-words", priority: 0.7 },
  { href: "/tools/arabic-lorem", priority: 0.6 },
  { href: "/tools/text-cleaner", priority: 0.7 },
  { href: "/tools/text-compare", priority: 0.7 },
  { href: "/tools/pdf-merger", priority: 0.7 },
  { href: "/tools/pdf-splitter", priority: 0.6 },
  { href: "/tools/pdf-compressor", priority: 0.6 },
  { href: "/tools/image-to-pdf", priority: 0.7 },
  { href: "/tools/unit-converter", priority: 0.7 },
  { href: "/tools/color-converter", priority: 0.6 },
  { href: "/tools/json-formatter", priority: 0.6 },
  { href: "/tools/base64-encoder", priority: 0.6 },
  { href: "/tools/encoder", priority: 0.5 },
  { href: "/tools/hash-generator", priority: 0.6 },
  { href: "/tools/bmi-calculator", priority: 0.7 },
  { href: "/tools/calorie-calculator", priority: 0.6 },
  { href: "/tools/stopwatch", priority: 0.5 },
  { href: "/tools/social-character-counter", priority: 0.6 },
  { href: "/tools/qr-generator", priority: 0.7 },
  { href: "/tools/whatsapp-link", priority: 0.7 },
  { href: "/tools/password-generator", priority: 0.7 },
  { href: "/tools/invoice-generator", priority: 0.8 },
  { href: "/tools/random-number", priority: 0.5 },
  { href: "/tools/name-generator", priority: 0.5 },
  { href: "/tools/car-installment", priority: 0.7 },
  { href: "/tools/bio-generator", priority: 0.5 },
];

// English tool routes (those that have English pages)
const enTools = [
  "/en/tools/age-calculator",
  "/en/tools/arabic-lorem",
  "/en/tools/base64-encoder",
  "/en/tools/bmi-calculator",
  "/en/tools/calorie-calculator",
  "/en/tools/compound-interest",
  "/en/tools/emi-calculator",
  "/en/tools/gold-calculator",
  "/en/tools/hash-generator",
  "/en/tools/hijri-converter",
  "/en/tools/inheritance-calculator",
  "/en/tools/installment-calculator",
  "/en/tools/json-formatter",
  "/en/tools/loan-calculator",
  "/en/tools/mortgage-calculator",
  "/en/tools/number-to-words",
  "/en/tools/password-generator",
  "/en/tools/profit-margin",
  "/en/tools/qr-generator",
  "/en/tools/random-number",
  "/en/tools/salary-calculator",
  "/en/tools/stopwatch",
  "/en/tools/text-case",
  "/en/tools/text-cleaner",
  "/en/tools/text-compare",
  "/en/tools/unit-converter",
  "/en/tools/vat-calculator",
  "/en/tools/whatsapp-link",
  "/en/tools/word-counter",
  "/en/tools/zakat-calculator",
];

// Arabic categories
const arCategories = ["calculators", "islamic", "text", "converters", "dev", "daily", "generators"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },

    // English static pages
    { url: `${baseUrl}/en`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/en/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/en/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/en/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Arabic tool pages
  const arToolEntries: MetadataRoute.Sitemap = arTools.map((t) => ({
    url: `${baseUrl}${t.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: t.priority,
  }));

  // English tool pages
  const enToolEntries: MetadataRoute.Sitemap = enTools.map((href) => ({
    url: `${baseUrl}${href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Arabic category pages
  const arCatEntries: MetadataRoute.Sitemap = arCategories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // English category page (only calculators has a dedicated page)
  const enCatEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/en/category/calculators`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  // Blog post entries (Arabic)
  const blogPosts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // English blog post entries
  const enBlogPosts = getAllEnPosts();
  const enBlogEntries: MetadataRoute.Sitemap = enBlogPosts.map((post) => ({
    url: `${baseUrl}/en/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...arCatEntries,
    ...enCatEntries,
    ...arToolEntries,
    ...enToolEntries,
    ...blogEntries,
    ...enBlogEntries,
  ];
}
