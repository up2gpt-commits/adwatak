import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Adawatak",
  description:
    "Educational articles and guides about financial calculators, Islamic tools, and digital tools. Learn how to make the most of our free online tools.",
};

export default function EnBlogPage() {
  const posts = getAllPosts();

  const categoryMap: Record<string, string> = {
    "مالية": "Finance",
    "إسلامية": "Islamic",
  };

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
        <div className="space-y-6">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/en/blog/${post.slug}`}
              className="block bg-white rounded-2xl p-6 border border-gray-100 card-hover group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-16 md:text-center shrink-0">
                  <span className="text-3xl font-bold text-blue-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {categoryMap[post.category] || post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <span className="text-xs text-gray-400">⏱️ {post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="shrink-0 text-gray-300 group-hover:text-blue-500 text-xl transition-colors">
                  →
                </div>
              </div>
            </Link>
          ))}
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
