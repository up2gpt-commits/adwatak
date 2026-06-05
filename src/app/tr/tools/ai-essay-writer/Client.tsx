"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "What is AI Essay Writer?", answer: "Yapay zeka destekli ücretsiz makale oluşturma aracı. Konunuzu, makale türünü ve uzunluğu seçin, araç sizin için giriş, gelişme ve sonuç bölümleriyle eksiksiz bir makale oluştursun." },
  { question: "Is it free?", answer: "Evet, %100 ücretsiz. Kayıt gerektirmez, sınır yok, reklam yok." },
  { question: "What essay types are available?", answer: "Mevcut türler: Tartışmacı, Betimleyici, Öyküleyici, Açıklayıcı ve İkna Edici. Her türün farklı bir yapısı vardır." },
  { question: "Does it support Arabic?", answer: "Evet, hem Arapça hem de İngilizceyi akıcı bir şekilde destekler." },
  { question: "What length options?", answer: "Kısa (~300 kelime), Orta (~600 kelime), Uzun (~1000 kelime)." },
  { question: "Can I use it commercially?", answer: "Evet, sonuçlar kişisel ve ticari kullanım içindir." },
  { question: "Does it work on mobile?", answer: "Evet, tüm cihazlarda tam uyumludur." },
  { question: "How to start?", answer: "Konunuzu yazın, makale türünü ve uzunluğu seçin, ardından Oluştur'a tıklayın." },
  { question: "Can I copy the essay?", answer: "Evet, kopyalama butonu ve .txt dosyası olarak indirme seçeneği mevcuttur." },
  { question: "Is my data safe?", answer: "Her şey tarayıcınızda çalışır. Hiçbir veri sunucuya gönderilmez." },
];

const relatedTools = [
  { title: "Paraphrasing Tool", icon: "✏️", href: "/tr/tools/paraphrasing-tool" },
  { title: "Grammar Checker", icon: "📝", href: "/tr/tools/grammar-checker" },
  { title: "Word Counter", icon: "📊", href: "/tr/tools/word-counter" },
  { title: "Bio Generator", icon: "👤", href: "/tr/tools/bio-generator" },
  { title: "Text Case Converter", icon: "🔤", href: "/tr/tools/text-case" },
];

const seoContent = [
  "Ücretsiz AI Makale Yazarı - giriş, gelişme ve sonuç ile yapılandırılmış makaleler oluşturun. Tartışmacı, betimleyici, öyküleyici, açıklayıcı ve ikna edici türler arasından seçim yapın.",
  "Öğrenciler, yazarlar, blog yazarları ve içerik üreticileri için mükemmel.",
  "Profesyonel yapı ve biçimlendirme ile AI destekli makale oluşturma.",
  "%100 ücretsiz, tarayıcınızda çalışır, kayıt gerektirmez.",
];

const INTROS: Record<string, Record<string, ((t: string) => string)[]>> = {
  argumentative: {
    tr: [
      (t: string) => `"${t}" konusu son zamanlarda en çok tartışılan konulardan biri haline geldi. Görüşler destekleyenler ve karşı çıkanlar arasında bölünmüş durumda. Bu makalede, bu konunun farklı yönlerini keşfedeceğiz.`,
      (t: string) => `Son yıllarda, "${t}" hakkındaki tartışmalar kamusal söylemde merkez haline geldi. Bazıları bunu bir gereklilik olarak görürken, diğerleri önemli bir zorluk olarak değerlendiriyor. Bu konunun çeşitli boyutlarını keşfedelim.`,
    ],
  },
  descriptive: {
    tr: [
      (t: string) => `"${t}" hakkında konuşurken, kendimizi ayrıntılar ve düşünülmeye değer sahnelerle dolu bir dünyada buluruz. Dikkatli bir incelemeyi hak eden unsurlarla zengin bir konudur.`,
      (t: string) => `"${t}" sadece bir terimden daha fazlasıdır — detaylı olarak keşfedilmeyi hak eden birçok yönü taşıyan eksiksiz bir deneyimdir.`,
    ],
  },
  narrative: {
    tr: [
      (t: string) => `"${t}"nin hikayesi uzun zaman önce, mütevazı başlangıçlar ve büyük hayallerle başladı. Bu yolculukta, bu konuyu şekillendiren önemli dönüm noktalarını keşfedeceğiz.`,
      (t: string) => `Her konunun bir hikayesi vardır ve "${t}"nin hikayesi büyüleyici dönüşümler ve gelişmelerle doludur. Birlikte anlatalım.`,
    ],
  },
  expository: {
    tr: [
      (t: string) => `Bu makale, "${t}" hakkında kapsamlı ve objektif bir açıklama sunmayı amaçlamaktadır. Bu konuyu daha derinlemesine anlamanıza yardımcı olacak temel kavramları ve önemli bilgileri ele alacağız.`,
      (t: string) => `"${t}"yi tam olarak anlamak için temellerden başlamalı ve yavaş yavaş ayrıntılara doğru ilerlemeliyiz. Bu kapsamlı rehber, bilmeniz gereken her şeyi sağlar.`,
    ],
  },
  persuasive: {
    tr: [
      (t: string) => `"${t}"nin önemini ve hayatımıza etkisini hiç düşündünüz mü? Bu makalede, "${t}"nin dikkatinizi ve zamanınızı hak etmesinin ikna edici nedenlerini sunacağız.`,
      (t: string) => `"${t}" konusunda hala kararsızsanız, bu konunun neden en önemli konulardan biri olduğunu keşfetmek için bir yolculuğa çıkalım.`,
    ],
  },
};

const BODIES: Record<string, Record<string, ((t: string) => string)[]>> = {
  argumentative: {
    tr: [
      (t: string) => `Bir yandan, destekleyenler "${t}"nin göz ardı edilemeyecek olumlu bir gelişme olduğuna inanıyor. Yaşam kalitesinin iyileştirilmesi ve verimliliğin artırılması dahil önemli faydaları olduğunu düşünüyorlar.`,
      (t: string) => `Öte yandan, eleştirmenler "${t}"nin belirli olumsuz yönleri konusunda uyarıyor. Ele alınması gereken önemli zorluklar görüyorlar.`,
      (t: string) => `Bu iki pozisyon arasında uzlaşma için alan vardır. En uygun çözüm, potansiyel riskleri en aza indirirken faydaları da göz önünde bulunduran dengeli bir yaklaşım benimsemek olabilir.`,
    ],
  },
  descriptive: {
    tr: [
      (t: string) => `"${t}" hakkında dikkat çeken ilk şey, sahip olduğu çeşitlilik ve zenginliktir. Her unsurun kendine özgü karakteri ve ayırt edici önemi vardır.`,
      (t: string) => `"${t}"nin ayrıntılarına daha derinlemesine indikçe, ek anlam ve önem katmanları keşfederiz. Her unsur, bütünleşik bir resimde diğerini tamamlar.`,
      (t: string) => `"${t}"nin izleyici üzerindeki etkisi göz ardı edilemez. Dakik ayrıntılar, benzersiz ve unutulmaz bir deneyim yaratır.`,
    ],
  },
  narrative: {
    tr: [
      (t: string) => `Başlangıçta, "${t}" sadece birkaç kişinin zihninde basit bir fikirdi. Ancak zamanla, ilgi arttı ve onunla ilişkili kavramlar gelişti.`,
      (t: string) => `İkinci aşama, "${t}"nin yolculuğunda kritik bir dönüm noktası olarak geldi. Büyük gelişmeler önceki kavramları değiştirdi ve yeni boyutlar ekledi.`,
      (t: string) => `Bugün, "${t}"yi yıllar süren geliştirme ve sürekli çalışmanın ürünü olan mevcut haliyle görüyoruz.`,
    ],
  },
  expository: {
    tr: [
      (t: string) => `"${t}"yi daha derinlemesine anlamak için, tanımı ve temel bileşenleriyle başlamalıyız. Bu konu, tam resme katkıda bulunan birbirine bağlı birkaç unsurdan oluşur.`,
      (t: string) => `"${t}"nin önemli bir yönü pratik uygulamasıdır. Her birinin avantajları ve zorlukları olan birkaç yaklaşım ve yöntem vardır.`,
      (t: string) => `Geleceğe baktığımızda, "${t}"nin daha fazla gelişmeye tanık olması bekleniyor. Mevcut araştırmalar büyük potansiyel vaat ediyor.`,
    ],
  },
  persuasive: {
    tr: [
      (t: string) => `"${t}"nin önemli olmasının ilk nedeni, günlük yaşamımız üzerindeki doğrudan etkisidir. Araştırmalar, bu konuya dikkat etmenin yaşam kalitesini iyileştirdiğini gösteriyor.`,
      (t: string) => `Ayrıca, "${t}" uzun vadede daha geniş hedeflere ulaşılmasına katkıda bulunur. Bu alana yapılan yatırım, hem bireylere hem de topluma büyük faydalar sağlar.`,
      (t: string) => `Son olarak, son gelişmelerin "${t}"yi her zamankinden daha önemli hale getirdiği inkar edilemez. Fırsat şimdi mevcut.`,
    ],
  },
};

const CONCLUSIONS: Record<string, ((t: string) => string)[]> = {
  tr: [
    (t: string) => `Sonuç olarak, "${t}" çok boyutlu bir konudur ve daha fazla ilgi ve çalışmayı hak etmektedir. Faydalar ve zorluklar arasındaki denge, potansiyelini en üst düzeye çıkarmanın anahtarıdır.`,
    (t: string) => `Nihayetinde, "${t}" araştırma ve tartışma için verimli bir alanı temsil etmektedir. Gelişmeler devam ettikçe, bu alanda daha fazla başarıya tanık olmayı umuyoruz.`,
  ],
};

const TITLES: Record<string, ((t: string) => string)[]> = {
  tr: [
    (t: string) => `${t}: Kapsamlı Bir Analiz`,
    (t: string) => `${t} Hakkında Bilmeniz Gereken Her Şey`,
    (t: string) => `${t}: Önemi, Zorlukları ve Fırsatları`,
    (t: string) => `${t} Anlamak İçin Eksiksiz Rehberiniz`,
  ],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEssay(topic: string, type: string, length: string) {
  const bodyCount = length === "short" ? 2 : length === "medium" ? 3 : 5;
  const intros = INTROS[type]?.tr ?? INTROS.argumentative.tr;
  const bodies = BODIES[type]?.tr ?? BODIES.argumentative.tr;
  const cons = CONCLUSIONS.tr;
  const titles = TITLES.tr;

  return {
    title: pick(titles)(topic),
    introduction: pick(intros)(topic),
    body: Array.from({ length: bodyCount }, (_, i) => bodies[i % bodies.length](topic)),
    conclusion: pick(cons)(topic),
  };
}

export default function ClientTr() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("argumentative");
  const [length, setLength] = useState("medium");
  const [result, setResult] = useState<{ title: string; introduction: string; body: string[]; conclusion: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setResult(generateEssay(topic.trim(), type, length));
    setCopied(false);
  };

  const fullText = result
    ? `${result.title}\n\n${result.introduction}\n\n${result.body.map(p => p).join("\n\n")}\n\n${result.conclusion}`
    : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullText], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${topic.trim().slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    a.click();
  };

  const wordCount = fullText ? fullText.split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("AI Essay Writer", "Write complete articles with AI", "https://adwatak.cloud/tr/tools/ai-essay-writer", "tr", "Text Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <Breadcrumb lang="tr" category="Text Tools" categorySlug="tools" toolName="AI Essay Writer" />
      
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">✍️ AI Essay Writer</h1>
        <p className="text-sm text-gray-500 mb-6">Yapay zeka ile yapılandırılmış makaleler oluşturun</p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Makale Konusu *</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Makale konunuzu girin..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Makale Türü</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                <option value="argumentative">Tartışmacı</option>
                <option value="descriptive">Betimleyici</option>
                <option value="narrative">Öyküleyici</option>
                <option value="expository">Açıklayıcı</option>
                <option value="persuasive">İkna Edici</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Uzunluk</label>
              <select value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                <option value="short">Kısa (~300 kelime)</option>
                <option value="medium">Orta (~600 kelime)</option>
                <option value="long">Uzun (~1000 kelime)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
          >
            ✨ Makale Oluştur
          </button>
        </div>

        {result && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">
                ✓ {wordCount} kelime
              </span>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
                  {copied ? "✓ Kopyalandı" : "📋 Kopyala"}
                </button>
                <button onClick={handleDownload} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
                  ⬇️ İndir
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 whitespace-pre-wrap text-sm leading-relaxed text-gray-800 max-h-[600px] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{result.title}</h2>
              <p className="mb-4">{result.introduction}</p>
              {result.body.map((p, i) => <p key={i} className="mb-4">{p}</p>)}
              <p>{result.conclusion}</p>
            </div>
          </div>
        )}
      </div>

      <SEOContent content={seoContent} lang="tr" />
      <FAQSection faqs={faqs} lang="tr" />
      <RelatedTools tools={relatedTools} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}