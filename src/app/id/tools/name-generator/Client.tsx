"use client";import { useState } from "react";import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema,howToSchema } from "../../../components/StructuredData";import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";

type Cat = 'baby' | 'brand' | 'username' | 'business' | 'pet' | 'fantasy' | 'startup';

const categories: { key: Cat; label: string; emoji: string }[] = [
  { key: 'baby', label: 'Nama Bayi', emoji: '👶' },
  { key: 'brand', label: 'Nama Merek', emoji: '🏷️' },
  { key: 'username', label: 'Username', emoji: '👤' },
  { key: 'business', label: 'Nama Bisnis', emoji: '🏢' },
  { key: 'pet', label: 'Nama Hewan', emoji: '🐾' },
  { key: 'fantasy', label: 'Nama Fantasi', emoji: '🧙' },
  { key: 'startup', label: 'Nama Startup', emoji: '🚀' },
];

const babyNames = ["Aisyah","Fatimah","Khadijah","Mariam","Sarah","Nurul","Dewi","Sari","Rina","Dian","Mega","Ratu","Intan","Zahra","Lestari","Kartika","Kusuma","Anggraini","Mulyani","Purnama","Yuliana","Susanti","Puspita","Rahayu","Yunita","Ahmad","Muhammad","Abdullah","Ibrahim","Yusuf","Hasan","Ali","Umar","Budi","Agus","Eko","Fajar","Guntur","Hendra","Indra","Kurniawan","Lutfi","Rahmat","Santoso","Wahyu","Yoga","Arif","Bambang","Darmawan","Gunawan","Taufik","Wibowo","Aditya","Bayu","Dimas","Haris","Kamil"];
const brandNames = ["NovaTech","ApexGen","ZenFlow","VibeSpark","FluxCore","AuraMind","EchoLab","LuxeWave","PureSync","BoldPath","SwiftHive","GlowBridge","PeakForge","EdgePulse","AtomHub","IonStudio","NeoPro","MaxSoft","UltraWare","OmniByte","AlphaCloud","BetaFlow","SigmaMind","OmegaSpark","DeltaWave","PulseLab"];
const usernames = ["Serigala_42","ElangGelap_","RubahCerah_","ElangNeon_","HarimauCyber_","PenyihirPixel_","FalconBayang_","UlarMerah_","PhoenixBiru_","GagakAtom_","HiuKuantum_","MacanMistik_","ElangEmas_","ElangPerak_","RubahBintang_","PumaNeon_","SingaBayang_","NagaApi_","HantuPutih_","KsatriaGelap_"];
const businessNames = ["Solusi Global","Usaha Prima","Horizon Baru","Layanan Elit","Mitra Strategis","Inovasi Dinamis","Frontier Digital","Sistem Cerdas","Logistik Cepat","Solusi Inti"];
const petNames = ["Mimi","Kiki","Cici","Lili","Bobi","Bulu","Putih","Hitam","Coklat","Oranye","Mochi","Kopi","Susu","Madu","Gula","Bakso","Siomay","Sate","Nasi","Mie","Tahu","Tempe","Sambal"];
const fantasyNames = ["Aerion","Balor","Celestian","Drakon","Eldric","Faelyn","Galadriel","Helios","Jorlan","Kaladin","Lorien","Malakai","Naroth","Orlinn","Pyralis","Quelior","Ravath","Saraphine","Thranduil","Ulrick","Valerius","Xandor","Yelara","Zarathos"];
const startupNames = ["Unify","Omnily","Hyperio","Metaix","NeoEx","ProHub","MaxBox","UltraSoft","SuperCloud","MegaFlow","GigaWave","TeraSpark","NanoByte","MicroSync","PolyMind","MultiLab","BiCore","TriLogic","QuadVentures"];

const faqs = [
  { question: "Apa itu Generator Nama?", answer: "Alat gratis untuk menghasilkan nama kreatif: nama bayi, merek, username, bisnis, hewan, fantasi, dan startup. Untuk penulis, gamer, pengusaha, dan orang tua." },
  { question: "Gratis?", answer: "Ya, sepenuhnya gratis! Tidak ada pendaftaran atau batasan." },
  { question: "Ada berapa kategori?", answer: "7 kategori: Nama Bayi, Merek, Username, Bisnis, Hewan Peliharaan, Fantasi, dan Startup." },
  { question: "Bisakah digunakan komersial?", answer: "Ya! Semua nama gratis digunakan. Cek merek dagang sebelum penggunaan komersial." },
];

const relatedTools = [
  { title: "Angka Acak", icon: "🎲", href: "/id/tools/random-number" },
  { title: "Generator Kata Sandi", icon: "🔐", href: "/id/tools/password-generator" },
  { title: "Generator QR", icon: "📱", href: "/id/tools/qr-generator" },
  { title: "Faktur", icon: "🧾", href: "/id/tools/invoice-generator" },
];

const seoContent = [
  "Generator Nama gratis: Hasilkan nama kreatif untuk 7 kategori — Nama Bayi, Merek, Username, Bisnis, Hewan, Fantasi, dan Startup. Cocok untuk penulis, orang tua, dan pengusaha.",
  "Nama Bayi: Fatimah, Aisyah, Ahmad, Muhammad — nama populer Indonesia dan Islami. Nama Merek: NovaTech, ApexGen. Username untuk media sosial dan game.",
  "Nama Fantasi: Aerion, Drakon, Galadriel — sempurna untuk karakter RPG. Nama Startup modern dan mudah diingat.",
];

const pools: Record<Cat, string[]> = { baby: babyNames, brand: brandNames, username: usernames, business: businessNames, pet: petNames, fantasy: fantasyNames, startup: startupNames };

export default function Client() {
  const [cat, setCat] = useState<Cat>('baby');
  const [count, setCount] = useState("5");
  const [names, setNames] = useState<string[]>([]);

  const generate = () => {
    const pool = pools[cat];
    const result: string[] = [];
    const ct = Math.min(Math.max(parseInt(count) || 5, 1), 20);
    for (let i = 0; i < ct; i++) result.push(pool[Math.floor(Math.random() * pool.length)]);
    setNames(result);
  };

  const schemaName = "Generator Nama";const schemaDesc = "Online Generator Nama - free tool";const schemaCategory = "Utility";const schemaUrl = "https://adwatak.cloud/id/tools/name-generator";const breadcrumbItems = [{name:"Beranda",url:"https://adwatak.cloud/id"},{name:"Generator",url:"https://adwatak.cloud/id/category/generators"},{name:"Generator Nama",url:"https://adwatak.cloud/id/tools/name-generator"}];
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={howToSchema("Cara Menggunakan Generator Nama","Hasilkan nama kreatif langsung di browser.",[{name:"Pilih kategori",text:"7 kategori tersedia"},{name:"Atur jumlah",text:"1-20 nama"},{name:"Hasilkan",text:"Klik Buat untuk nama instan"},{name:"Gunakan",text:"Salin nama untuk proyek Anda"}],"kurang dari semenit","en")} />
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
      <Breadcrumb lang="en" category="Generators" categorySlug="generators" toolName="Generator Nama" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👤 Generator Nama</h1>
        <p className="text-sm text-gray-500 mb-6">Hasilkan nama kreatif — bayi, merek, username, bisnis & lainnya</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)}
              className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all ${cat === c.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}
            >{c.emoji}{c.label}</button>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jumlah</label>
          <input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="20" className="max-w-[100px] p-3 border-2 border-gray-200 rounded-xl text-base outline-none" />
        </div>
        <button onClick={generate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer hover:bg-blue-700 transition-colors">Buat</button>
      </div>
      {names.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {names.map((n,i) => <div key={i} className="bg-gray-50 rounded-xl p-3 px-5 border border-gray-200 font-semibold text-gray-700">{n}</div>)}
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
      <ShareButtons lang="en" />
    </div>
  );
}