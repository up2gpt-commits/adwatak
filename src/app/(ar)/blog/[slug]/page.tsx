import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/** Extract FAQ pairs from blog post HTML content */
function extractFaqFromHtml(html: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  // Match h3 followed by p — standard FAQ pattern from our blog prompts
  const faqRegex = /<h3[^>]*>([^<]+)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = faqRegex.exec(html)) !== null) {
    const question = match[1].trim();
    // Strip HTML tags from answer
    const answer = match[2].trim().replace(/<[^>]*>/g, "").trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}

/** Build FAQPage schema from extracted FAQs */
function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "المقال غير موجود | أدواتك" };
  const baseUrl = "https://adwatak.cloud";
  return {
    title: `${post.title} | أدواتك`,
    description: post.excerpt,
    alternates: { canonical: `${baseUrl}/blog/${slug}` },
    openGraph: {
      title: `${post.title} | أدواتك`,
      description: post.excerpt,
      url: `${baseUrl}/blog/${slug}`,
      type: "article",
      siteName: "أدواتك",
      locale: "ar_SA",
      images: [{ url: `${baseUrl}/og-ar.png`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | أدواتك`,
      description: post.excerpt,
      images: [`${baseUrl}/og-ar.png`],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === post.category && p.slug !== post.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `https://adwatak.cloud/blog/${slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "أدواتك" },
    image: "https://adwatak.cloud/og-ar.png",
  };

  // Extract FAQ from article content
  const faqs = extractFaqFromHtml(post.content);
  const faqSchema = faqs.length >= 3 ? buildFaqSchema(faqs) : null;

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <span>›</span>
        <Link href="/blog" className="hover:text-blue-600">المدونة</Link>
        <span>›</span>
        <span className="text-gray-700">{post.title}</span>
      </div>

      {/* Article */}
      <article className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">{post.category}</span>
          <span className="text-sm text-gray-400">{post.date}</span>
          <span className="text-sm text-gray-400">⏱️ {post.readTime}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-relaxed">{post.title}</h1>

        <div className="prose prose-lg max-w-none text-gray-700 leading-loose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">مقالات ذات صلة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPosts.map((rp) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="bg-white rounded-xl p-5 border border-gray-100 card-hover">
                <h3 className="font-bold text-gray-900 hover:text-blue-600 mb-1">{rp.title}</h3>
                <p className="text-sm text-gray-500">{rp.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to blog */}
      <div className="mt-8 text-center">
        <Link href="/blog" className="btn-secondary inline-block">← العودة للمدونة</Link>
      </div>
    </div>
  );
}
