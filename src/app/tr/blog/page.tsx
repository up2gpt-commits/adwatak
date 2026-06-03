import type { Metadata } from "next";
import Link from "next/link";
import { getAllTrPosts } from "@/lib/blog-tr";

export const metadata: Metadata = {
  title: "Blog — Adwatak",
  description:
    "Finansal hesaplayıcılar, İslami araçlar ve dijital araçlar hakkında eğitici makaleler ve rehberler.",
};

const TR_CONTENT_CLUSTERS: { label: string; categories: string[]; description: string }[] = [
  {
    label: "🕌 İslami Araçlar",
    categories: ["İslami Araçlar", "Islami", "Dini"],
    description: "Zekat, miras, namaz vakitleri, kıble yönü, hicri takvim",
  },
  {
    label: "💰 Finansal Araçlar",
    categories: ["Finans", "Finansal", "Kredi", "Banka", "Yatırım"],
    description: "Kredi hesaplama, faiz, maaş, yatırım araçları",
  },
  {
    label: "🔧 Dönüştürücüler & Araçlar",
    categories: ["Dönüştürücüler", "Metin Araçları", "PDF", "Oluşturucular", "Geliştirici", "Genel"],
    description: "Döviz, birim, metin, PDF araçları",
  },
];

export default function TrBlogPage() {
  const posts = getAllTrPosts();

  const clustered = TR_CONTENT_CLUSTERS.map((cluster) => ({
    ...cluster,
    posts: posts.filter((p) => cluster.categories.includes(p.category)),
  })).filter((c) => c.posts.length > 0);

  const unclustered = posts.filter(
    (p) => !TR_CONTENT_CLUSTERS.some((c) => c.categories.includes(p.category))
  );

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
                    href={`/tr/blog/${post.slug}`}
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">📚 Diğer Makaleler</h2>
              <div className="space-y-4">
                {unclustered.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/tr/blog/${post.slug}`}
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
