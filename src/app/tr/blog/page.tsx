import type { Metadata } from "next";
import Link from "next/link";
import { getAllTrPosts } from "@/lib/blog-tr";

export const metadata: Metadata = {
  title: "Blog — Adwatak",
  description:
    "Finansal hesaplayıcılar, İslami araçlar ve dijital araçlar hakkında eğitici makaleler ve rehberler.",
};

export default function TrBlogPage() {
  const posts = getAllTrPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 Blog</h1>
        <p className="text-gray-500">
          Araçlarımızdan en iyi şekilde yararlanmanız için rehberler ve makaleler
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-xl">Yeni makaleler yakında</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/tr/blog/${post.slug}`}
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
                      {post.category}
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
        <h2 className="font-bold text-lg mb-3">Adwatak Blog Hakkında</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Adwatak Blog, finansal hesaplayıcılar ve dijital araçlar hakkında eğitici içerikler
          ve basitleştirilmiş rehberler sunar. Amacımız, ister konut kredisi, ister zekat veya
          döviz dönüşümü olsun — anlamanıza ve kendi başınıza hesaplamanıza yardımcı olmaktır.
          Tüm makaleler düzenli olarak güncellenmektedir.
        </p>
      </div>
    </div>
  );
}
