// StructuredData — JSON-LD for SEO (Organization, WebApplication, FAQ, Article, Breadcrumb)
export default function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization schema — use in root layout
export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "أدواتك — Adawatak",
    url: "https://adwatak.cloud",
    logo: "https://adwatak.cloud/favicon.svg",
    description: "Free online tools platform — calculators, converters, generators. أدوات مجانية باللغة العربية.",
    sameAs: [
      "https://adwatak.cloud/en",
    ],
  };
}

// WebSite schema — use in root layout
export function websiteSchema(lang: "ar" | "en" = "ar") {
  const name = lang === "ar" ? "أدواتك" : "Adawatak";
  const desc = lang === "ar"
    ? "مجموعة أدوات مجانية بالكامل باللغة العربية — حاسبات مالية، أدوات إسلامية، مولدات، محولات وأكثر"
    : "Free online tools — calculators, converters, generators, and more. No signup required.";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: lang === "ar" ? "https://adwatak.cloud" : "https://adwatak.cloud/en",
    description: desc,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://adwatak.cloud/${lang === "en" ? "en/" : ""}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// WebApplication schema — use on each tool page
export function toolSchema(
  name: string,
  description: string,
  url: string,
  lang: "ar" | "en" = "ar",
  category: string = "Finance"
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description: description.substring(0, 200),
    url,
    applicationCategory: category,
    operatingSystem: "All",
    browserRequirements: "Modern browser (Chrome, Firefox, Safari, Edge)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    inLanguage: lang === "ar" ? "ar" : "en",
  };
}

// FAQPage schema — use on each tool page
export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.slice(0, 10).map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

// BreadcrumbList schema
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Article schema — use on blog posts
export function articleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
  authorName: string = "Adawatak",
  imageUrl?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description.substring(0, 200),
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: authorName,
    },
    image: imageUrl || "https://adwatak.cloud/og-ar.svg",
  };
}
