import type { Metadata } from "next";
import Link from "next/link";
import { getAllEnPosts } from "@/lib/blog-en";

export const metadata: Metadata = {
  title: "Blog — Adawatak",
  description:
    "Educational articles and guides about financial calculators, Islamic tools, and digital tools. Learn how to make the most of our free online tools.",
};

/** Content clusters for topical authority & AI engine recognition */
const EN_CONTENT_CLUSTERS: { label: string; categories: string[]; description: string }[] = [
  {
    label: "🕌 Islamic Finance & Worship",
    categories: ["Islamic", "Islamic Finance", "Zakat", "Inheritance", "Hajj & Umrah", "Islamic Calendar", "Worship"],
    description: "Zakat, inheritance, Islamic finance, Hajj, prayer times, Hijri calendar",
  },
  {
    label: "💰 Financial Calculators",
    categories: ["Finance", "Financial", "Loans", "Investment", "Retirement", "Tax"],
    description: "Mortgage, loans, salary, retirement planning, tax calculations",
  },
  {
    label: "🔧 Digital Tools & Converters",
    categories: ["Tools", "Converter", "Developer", "Text", "PDF", "Productivity"],
    description: "Unit converters, text tools, PDF generators, developer utilities",
  },
];

export default function EnBlogPage() {
  const posts = getAllEnPosts();

  const clustered = EN_CONTENT_CLUSTERS.map((cluster) => ({
    ...cluster,
    posts: posts.filter((p) => cluster.categories.includes(p.category)),
  })).filter((c) => c.posts.length > 0);

  const unclustered = posts.filter(
    (p) => !EN_CONTENT_CLUSTERS.some((c) => c.categories.includes(p.category))
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 Blog</h1>
        <p className="text-gray-500">
          Guides and articles to help you get the most out of our tools
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-xl">New articles coming soon</p>
        </div>
      ) : (
        <div className="space-y-10">
          {clustered.map((cluster) => (
            <section key={cluster.label}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">{cluster.label}</h2>
                <p className="text-sm text-gray-500">{cluster.description}</p>
              </div>
              <div className="space-y-4">
                {cluster.posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/en/blog/${post.slug}`}
                    className="block bg-white rounded-xl p-5 border border-gray-100 card-hover group"
                  >
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">{post.category}</span>
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <span className="text-xs text-gray-400">⏱️ {post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {unclustered.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">📚 More Articles</h2>
              <div className="space-y-4">
                {unclustered.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/en/blog/${post.slug}`}
                    className="block bg-white rounded-xl p-5 border border-gray-100 card-hover group"
                  >
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">{post.category}</span>
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <span className="text-xs text-gray-400">⏱️ {post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-6 border">
        <h2 className="font-bold text-lg mb-3">About Adawatak Blog</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Adawatak Blog provides educational content and simplified guides for financial
          calculators and digital tools. Our goal is to help you understand and calculate on
          your own — whether it is a mortgage, Zakat, or a currency conversion. All articles
          are regularly updated.
        </p>
      </div>
    </div>
  );
}
