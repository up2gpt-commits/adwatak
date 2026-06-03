import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnPostBySlug, getAllEnPosts } from "@/lib/blog-en";

export async function generateStaticParams() {
  const posts = getAllEnPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/** Extract FAQ pairs from blog post HTML content */
function extractFaqFromHtml(html: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const faqRegex = /<h3[^>]*>([^<]+)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = faqRegex.exec(html)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim().replace(/<[^>]*>/g, "").trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}

function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getEnPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Adawatak" };
  const baseUrl = "https://adwatak.cloud";
  return {
    title: `${post.title} | Adawatak`,
    description: post.excerpt,
    alternates: { canonical: `${baseUrl}/en/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Adawatak`,
      description: post.excerpt,
      url: `${baseUrl}/en/blog/${slug}`,
      type: "article",
      siteName: "Adawatak",
      locale: "en_US",
      images: [{ url: `${baseUrl}/og-en.svg`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Adawatak`,
      description: post.excerpt,
      images: [`${baseUrl}/og-en.svg`],
    },
  };
}

export default async function EnBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getEnPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllEnPosts();
  const relatedPosts = allPosts.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `https://adwatak.cloud/en/blog/${slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Adawatak" },
    image: "https://adwatak.cloud/og-en.svg",
  };

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
        <Link href="/en" className="hover:text-blue-600">
          Home
        </Link>
        <span>›</span>
        <Link href="/en/blog" className="hover:text-blue-600">
          Blog
        </Link>
        <span>›</span>
        <span className="text-gray-700">{post.title}</span>
      </div>

      {/* Article */}
      <article className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-sm text-gray-400">{post.date}</span>
          <span className="text-sm text-gray-400">⏱️ {post.readTime}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>

        <div
          className="prose prose-lg max-w-none text-gray-700 leading-loose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/en/blog/${rp.slug}`}
                className="bg-white rounded-xl p-5 border border-gray-100 card-hover"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-600 mb-1">
                  {rp.title}
                </h3>
                <p className="text-sm text-gray-500">{rp.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to blog */}
      <div className="mt-8 text-center">
        <Link href="/en/blog" className="btn-secondary inline-block">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
