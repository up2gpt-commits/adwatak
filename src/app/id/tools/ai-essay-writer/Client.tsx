"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "What is AI Essay Writer?", answer: "Alat gratis untuk membuat esai terstruktur dengan AI. Pilih topik, jenis esai, dan panjangnya, alat ini akan menghasilkan esai lengkap dengan pendahuluan, isi, dan kesimpulan." },
  { question: "Is it free?", answer: "Ya, 100% gratis. Tanpa registrasi, tanpa batas, tanpa iklan." },
  { question: "What essay types are available?", answer: "Tersedia: Argumentatif, Deskriptif, Naratif, Ekspositori, dan Persuasif. Setiap jenis memiliki struktur yang berbeda." },
  { question: "Does it support Arabic?", answer: "Ya, mendukung bahasa Arab dan Inggris dengan lancar." },
  { question: "What length options?", answer: "Pendek (~300 kata), Sedang (~600 kata), Panjang (~1000 kata)." },
  { question: "Can I use it commercially?", answer: "Ya, hasilnya dapat digunakan untuk keperluan pribadi dan komersial." },
  { question: "Does it work on mobile?", answer: "Ya, responsif penuh di semua perangkat." },
  { question: "How to start?", answer: "Ketik topik Anda, pilih jenis dan panjang esai, lalu klik Hasilkan." },
  { question: "Can I copy the essay?", answer: "Ya, tombol salin dan unduh sebagai file .txt tersedia." },
  { question: "Is my data safe?", answer: "Semuanya berjalan di browser Anda. Tidak ada data yang dikirim ke server." },
];

const relatedTools = [
  { title: "Paraphrasing Tool", icon: "✏️", href: "/id/tools/paraphrasing-tool" },
  { title: "Grammar Checker", icon: "📝", href: "/id/tools/grammar-checker" },
  { title: "Word Counter", icon: "📊", href: "/id/tools/word-counter" },
  { title: "Bio Generator", icon: "👤", href: "/id/tools/bio-generator" },
  { title: "Text Case Converter", icon: "🔤", href: "/id/tools/text-case" },
];

const seoContent = [
  "Penulis Esai AI Gratis - hasilkan esai terstruktur dengan pendahuluan, isi, dan kesimpulan. Pilih dari jenis argumentatif, deskriptif, naratif, ekspositori, dan persuasif.",
  "Sempurna untuk siswa, penulis, blogger, dan pembuat konten.",
  "Pembuatan esai berbasis AI dengan struktur dan format profesional.",
  "100% gratis, bekerja di browser Anda, tanpa registrasi.",
];

const INTROS: Record<string, Record<string, ((t: string) => string)[]>> = {
  argumentative: {
    id: [
      (t: string) => `Topik "${t}" telah menjadi salah satu subjek yang paling diperdebatkan akhir-akhir ini. Pendapat terbagi antara pendukung dan penentang. Dalam esai ini, kita akan mengeksplorasi berbagai aspek dari topik ini.`,
      (t: string) => `Dalam beberapa tahun terakhir, diskusi tentang "${t}" telah menjadi pusat perhatian publik. Sementara beberapa melihatnya sebagai kebutuhan, yang lain menganggapnya sebagai tantangan signifikan. Mari jelajahi berbagai dimensi masalah ini.`,
    ],
  },
  descriptive: {
    id: [
      (t: string) => `Ketika membahas "${t}", kita menemukan diri kita dalam dunia yang kaya akan detail dan pemandangan yang layak direnungkan. Ini adalah subjek yang kaya dengan elemen yang memerlukan pemeriksaan cermat.`,
      (t: string) => `"${t}" lebih dari sekadar istilah — ini adalah pengalaman lengkap yang membawa banyak aspek yang layak dijelajahi dan dijelaskan secara detail.`,
    ],
  },
  narrative: {
    id: [
      (t: string) => `Kisah "${t}" dimulai sejak lama, dengan awal yang sederhana dan ambisi yang besar. Dalam perjalanan ini, kita akan mengeksplorasi tonggak-tonggak penting yang membentuk topik ini.`,
      (t: string) => `Setiap topik memiliki cerita, dan cerita "${t}" penuh dengan transformasi dan perkembangan yang menarik. Mari kita ceritakan bersama.`,
    ],
  },
  expository: {
    id: [
      (t: string) => `Artikel ini bertujuan untuk memberikan penjelasan komprehensif dan objektif tentang "${t}". Kami akan membahas konsep dasar dan informasi penting untuk membantu Anda memahami topik ini lebih dalam.`,
      (t: string) => `Untuk memahami "${t}" sepenuhnya, kita harus mulai dari dasar dan secara bertahap bergerak menuju detail. Panduan komprehensif ini memberikan semua yang perlu Anda ketahui.`,
    ],
  },
  persuasive: {
    id: [
      (t: string) => `Pernahkah Anda berpikir tentang pentingnya "${t}" dan dampaknya pada kehidupan kita? Dalam artikel ini, kami akan menyajikan alasan kuat mengapa "${t}" layak mendapatkan perhatian Anda.`,
      (t: string) => `Jika Anda masih ragu tentang "${t}", mari kita lakukan perjalanan untuk menemukan mengapa ini adalah salah satu topik terpenting yang layak mendapat perhatian Anda.`,
    ],
  },
};

const BODIES: Record<string, Record<string, ((t: string) => string)[]>> = {
  argumentative: {
    id: [
      (t: string) => `Di satu sisi, para pendukung percaya bahwa "${t}" mewakili perkembangan positif yang tidak dapat diabaikan. Mereka meyakini manfaat signifikan termasuk peningkatan kualitas hidup dan efisiensi.`,
      (t: string) => `Di sisi lain, para kritikus memperingatkan tentang aspek negatif tertentu dari "${t}". Mereka melihat tantangan signifikan yang harus diatasi.`,
      (t: string) => `Di antara dua posisi ini, ada ruang untuk rekonsiliasi. Solusi optimal mungkin terletak pada pendekatan seimbang yang mempertimbangkan manfaat sambil meminimalkan risiko potensial.`,
    ],
  },
  descriptive: {
    id: [
      (t: string) => `Hal pertama yang menarik perhatian tentang "${t}" adalah keragaman dan kekayaan yang dimilikinya. Setiap elemen memiliki karakter dan kepentingan tersendiri.`,
      (t: string) => `Menggali lebih dalam tentang "${t}", kita menemukan lapisan makna dan signifikansi tambahan. Setiap elemen saling melengkapi dalam gambaran yang terintegrasi.`,
      (t: string) => `Dampak "${t}" pada audiens tidak dapat diabaikan. Detail-detail kecil menciptakan pengalaman yang unik dan tak terlupakan.`,
    ],
  },
  narrative: {
    id: [
      (t: string) => `Pada awalnya, "${t}" hanyalah ide sederhana di benak beberapa orang. Namun seiring waktu, minat tumbuh dan konsep-konsep yang terkait dengannya berkembang.`,
      (t: string) => `Fase kedua datang sebagai titik balik kritis dalam perjalanan "${t}", di mana perkembangan besar mengubah konsep sebelumnya dan menambah dimensi baru.`,
      (t: string) => `Saat ini, kita melihat "${t}" dalam bentuknya yang sekarang, hasil dari tahun-tahun pengembangan dan kerja terus-menerus.`,
    ],
  },
  expository: {
    id: [
      (t: string) => `Untuk memahami "${t}" lebih dalam, kita harus mulai dengan definisi dan komponen dasarnya. Topik ini terdiri dari beberapa elemen yang saling terhubung.`,
      (t: string) => `Aspek penting dari "${t}" adalah aplikasi praktisnya. Ada beberapa pendekatan dan metode, masing-masing dengan kelebihan dan tantangannya.`,
      (t: string) => `Melihat ke masa depan, "${t}" diperkirakan akan menyaksikan perkembangan lebih lanjut. Penelitian saat ini menjanjikan potensi besar.`,
    ],
  },
  persuasive: {
    id: [
      (t: string) => `Alasan pertama mengapa "${t}" penting adalah dampak langsungnya pada kehidupan sehari-hari kita. Penelitian menunjukkan bahwa memperhatikan topik ini meningkatkan kualitas hidup.`,
      (t: string) => `Selanjutnya, "${t}" berkontribusi pada pencapaian tujuan yang lebih luas dalam jangka panjang. Investasi di bidang ini memberikan manfaat besar bagi individu dan masyarakat.`,
      (t: string) => `Akhirnya, tidak dapat disangkal bahwa perkembangan terbaru membuat "${t}" lebih penting dari sebelumnya. Kesempatan kini tersedia.`,
    ],
  },
};

const CONCLUSIONS: Record<string, ((t: string) => string)[]> = {
  id: [
    (t: string) => `Kesimpulannya, "${t}" adalah topik multi-dimensi yang layak mendapat lebih banyak perhatian dan studi. Keseimbangan antara manfaat dan tantangan adalah kunci untuk memaksimalkan potensinya.`,
    (t: string) => `Pada akhirnya, "${t}" mewakili bidang yang subur untuk penelitian dan diskusi. Seiring perkembangan berlanjut, kami berharap akan menyaksikan lebih banyak pencapaian di bidang ini.`,
  ],
};

const TITLES: Record<string, ((t: string) => string)[]> = {
  id: [
    (t: string) => `${t}: Analisis Komprehensif`,
    (t: string) => `Semua yang Perlu Anda Ketahui Tentang ${t}`,
    (t: string) => `${t}: Pentingnya, Tantangan, dan Peluang`,
    (t: string) => `Panduan Lengkap Anda untuk Memahami ${t}`,
  ],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEssay(topic: string, type: string, length: string) {
  const bodyCount = length === "short" ? 2 : length === "medium" ? 3 : 5;
  const intros = INTROS[type]?.id ?? INTROS.argumentative.id;
  const bodies = BODIES[type]?.id ?? BODIES.argumentative.id;
  const cons = CONCLUSIONS.id;
  const titles = TITLES.id;

  return {
    title: pick(titles)(topic),
    introduction: pick(intros)(topic),
    body: Array.from({ length: bodyCount }, (_, i) => bodies[i % bodies.length](topic)),
    conclusion: pick(cons)(topic),
  };
}

export default function ClientId() {
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
      <StructuredData data={toolSchema("AI Essay Writer", "Write complete articles with AI", "https://adwatak.cloud/id/tools/ai-essay-writer", "id", "Text Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <Breadcrumb lang="id" category="Text Tools" categorySlug="tools" toolName="AI Essay Writer" />
      
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">✍️ AI Essay Writer</h1>
        <p className="text-sm text-gray-500 mb-6">Hasilkan esai terstruktur dengan AI</p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Topik Esai *</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Masukkan topik esai Anda..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Jenis Esai</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                <option value="argumentative">Argumentatif</option>
                <option value="descriptive">Deskriptif</option>
                <option value="narrative">Naratif</option>
                <option value="expository">Ekspositori</option>
                <option value="persuasive">Persuasif</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Panjang</label>
              <select value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                <option value="short">Pendek (~300 kata)</option>
                <option value="medium">Sedang (~600 kata)</option>
                <option value="long">Panjang (~1000 kata)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
          >
            ✨ Hasilkan Esai
          </button>
        </div>

        {result && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">
                ✓ {wordCount} kata
              </span>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
                  {copied ? "✓ Disalin" : "📋 Salin"}
                </button>
                <button onClick={handleDownload} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
                  ⬇️ Unduh
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

      <SEOContent content={seoContent} lang="id" />
      <FAQSection faqs={faqs} lang="id" />
      <RelatedTools tools={relatedTools} lang="id" />
      <ShareButtons lang="id" />
    </div>
  );
}