// StructuredData — JSON-LD for SEO + GEO/AEO optimization
// Includes: Organization, WebApplication, FAQ, Article, Breadcrumb, HowTo, Speakable, Review, AggregateRating
export default function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ══════════════════════════════════════════
// Core schemas (SEO)
// ══════════════════════════════════════════

export function orgSchema(pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "أدواتك — Adawatak",
    url: pageUrl || "https://adwatak.cloud",
    logo: {
      "@type": "ImageObject",
      url: "https://adwatak.cloud/favicon.svg",
      width: 512,
      height: 512,
    },
    description: "Free online tools platform — calculators, converters, generators. أدوات مجانية باللغة العربية — حاسبات مالية، أدوات إسلامية، مولدات، محولات وأكثر",
    sameAs: [
      "https://twitter.com/adawatak",
      "https://facebook.com/adawatak",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@adwatak.cloud",
      contactType: "customer support",
    },
  };
}

export function websiteSchema(lang: "ar" | "en" | "tr" | "id" = "ar") {
  const name = lang === "ar" ? "أدواتك" : "Adawatak";
  const desc = lang === "ar"
    ? "مجموعة أدوات مجانية بالكامل باللغة العربية — حاسبات مالية، أدوات إسلامية، مولدات، محولات وأكثر"
    : "Free online tools — calculators, converters, generators, and more. No signup required.";
  const prefix = lang === "ar" ? "" : lang === "tr" ? "tr/" : lang === "id" ? "id/" : "en/";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: `https://adwatak.cloud/${prefix}`,
    description: desc,
    inLanguage: lang,
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

// ══════════════════════════════════════════
// Tool schemas (per-tool pages)
// ══════════════════════════════════════════

export function toolSchema(
  name: string,
  description: string,
  url: string,
  lang: "ar" | "en" | "tr" = "ar",
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
    featureList: [
      "Free to use",
      "No registration required",
      "Works offline in browser",
      "Privacy-first — no data sent to server",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    inLanguage: lang === "ar" ? "ar" : lang === "tr" ? "tr" : "en",
    author: {
      "@type": "Organization",
      name: "Adawatak",
      url: "https://adwatak.cloud",
    },
  };
}

// ══════════════════════════════════════════
// GEO/AEO schemas
// ══════════════════════════════════════════

/**
 * GEO: Speakable schema — tells AI engines + voice assistants
 * which parts of the page are "speakable" and can be read aloud.
 * CRITICAL for: Alexa, Google Assistant, ChatGPT voice, Perplexity
 */
export function speakableSchema(cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  };
}

/**
 * GEO/AEO: HowTo schema — step-by-step instructions
 * HUGE for Featured Snippets and AI engine answers
 */
export function howToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string; url?: string }[],
  totalTime?: string,
  lang: "ar" | "en" | "tr" = "ar"
) {
  const schemaLang = lang === "tr" ? "tr" : lang === "ar" ? "ar" : "en";
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    inLanguage: schemaLang,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
    })),
    ...(totalTime ? { totalTime } : {}),
  };
}

/**
 * GEO: Review/AggregateRating schema — trust signals
 * Helps AI engines identify "authoritative" content
 */
export function aggregateRatingSchema(
  itemName: string,
  ratingValue: number,
  reviewCount: number,
  bestRating: number = 5
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating,
      worstRating: 1,
    },
  };
}

// ══════════════════════════════════════════
// FAQPage schema — use on each tool page
// CRITICAL for GEO: AI engines pull FAQ answers directly
// ══════════════════════════════════════════

export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.slice(0, 15).map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

// ══════════════════════════════════════════
// Breadcrumb schema
// ══════════════════════════════════════════

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

// ══════════════════════════════════════════
// Article schema — blog posts
// ══════════════════════════════════════════

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
    inLanguage: "ar",
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://adwatak.cloud",
    },
    image: imageUrl || "https://adwatak.cloud/og-ar.svg",
    publisher: {
      "@type": "Organization",
      name: "Adawatak",
      url: "https://adwatak.cloud",
      logo: {
        "@type": "ImageObject",
        url: "https://adwatak.cloud/favicon.svg",
      },
    },
  };
}

// ══════════════════════════════════════════
// GEO/AEO: Combined tool page schemas
// One function to generate ALL schemas for a tool page
// ══════════════════════════════════════════

interface ToolPageSchemas {
  toolName: string;
  toolDescription: string;
  toolUrl: string;
  lang: "ar" | "en" | "tr";
  category: string;
  faqs: { question: string; answer: string }[];
  breadcrumbItems: { name: string; url: string }[];
  /** Optional: steps to use this tool (for HowTo schema) */
  steps?: { name: string; text: string }[];
  /** Optional: speakable CSS selectors */
  speakableSelectors?: string[];
  /** Optional: aggregate rating */
  rating?: { value: number; count: number };
}

export function allToolPageSchemas(schemas: ToolPageSchemas) {
  const {
    toolName,
    toolDescription,
    toolUrl,
    lang,
    category,
    faqs,
    breadcrumbItems,
    steps,
    speakableSelectors,
    rating,
  } = schemas;

  const result: Record<string, unknown>[] = [
    toolSchema(toolName, toolDescription, toolUrl, lang, category),
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbItems),
  ];

  if (steps && steps.length > 0) {
    result.push(
      howToSchema(
        `كيفية استخدام ${toolName}`,
        toolDescription,
        steps,
        undefined,
        lang
      )
    );
  }

  if (speakableSelectors && speakableSelectors.length > 0) {
    result.push(speakableSchema(speakableSelectors));
  }

  if (rating) {
    result.push(
      aggregateRatingSchema(toolName, rating.value, rating.count)
    );
  }

  return result;
}
