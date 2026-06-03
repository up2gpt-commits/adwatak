import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "المدونة | أدواتك",
  description: "مقالات وشروحات حول الأدوات المالية والحاسبات والمواضيع التقنية والإسلامية",
};

/** Content clusters for topical authority */
const CONTENT_CLUSTERS: { label: string; categories: string[]; description: string }[] = [
  {
    label: "🕌 الحاسبات الإسلامية",
    categories: ["إسلامي", "إسلامية", "عبادات"],
    description: "زكاة، ميراث، مواقيت صلاة، اتجاه القبلة، التقويم الهجري",
  },
  {
    label: "💰 الحاسبات المالية",
    categories: ["مالي", "مالية", "تمويل", "قروض"],
    description: "قروض عقارية، فوائد، رواتب، استثمارات، ضرائب",
  },
  {
    label: "🔄 المحولات والأدوات",
    categories: ["محولات", "أدوات", "تحويلات", "عامة"],
    description: "تحويل عملات، وحدات، درجات حرارة، أدوات نصية",
  },
];

export default function BlogPage() {
  const posts = getAllPosts();

  /** Group posts by cluster */
  const clustered = CONTENT_CLUSTERS.map((cluster) => ({
    ...cluster,
    posts: posts.filter((p) => cluster.categories.includes(p.category)),
  })).filter((c) => c.posts.length > 0);

  const unclustered = posts.filter(
    (p) => !CONTENT_CLUSTERS.some((c) => c.categories.includes(p.category))
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 المدونة</h1>
        <p className="text-gray-500">مقالات وشروحات تساعدك تستفيد أقصى استفادة من أدواتنا</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-xl">مقالات جديدة قريباً إن شاء الله</p>
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
                    href={`/blog/${post.slug}`}
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">📚 مقالات أخرى</h2>
              <div className="space-y-4">
                {unclustered.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
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
        <h2 className="font-bold text-lg mb-3">عن مدونة أدواتك</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          مدونة أدواتك بتقدم محتوى تعليمي وشروحات مبسطة للأدوات المالية والحاسبات.
          هدفنا نساعك تفهم وتحسب بنفسك — سواء قرض عقاري، زكاة، أو حتى تحويل بين العملات.
          كل المقالات مكتوبة بالعربي ومحدثة بشكل مستمر.
        </p>
      </div>
    </div>
  );
}
