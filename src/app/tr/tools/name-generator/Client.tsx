"use client";import { useState } from "react";import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema,howToSchema } from "../../../components/StructuredData";import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";

type Cat = 'baby' | 'brand' | 'username' | 'business' | 'pet' | 'fantasy' | 'startup';

const categories: { key: Cat; label: string; emoji: string }[] = [
  { key: 'baby', label: 'Bebek İsimleri', emoji: '👶' },
  { key: 'brand', label: 'Marka İsimleri', emoji: '🏷️' },
  { key: 'username', label: 'Kullanıcı Adları', emoji: '👤' },
  { key: 'business', label: 'Şirket İsimleri', emoji: '🏢' },
  { key: 'pet', label: 'Evcil Hayvan', emoji: '🐾' },
  { key: 'fantasy', label: 'Fantezi', emoji: '🧙' },
  { key: 'startup', label: 'Girişim', emoji: '🚀' },
];

const babyNames = ["Zeynep","Elif","Fatma","Ayşe","Hatice","Merve","Sude","İrem","Buse","Cansu","Dilara","Leyla","Meryem","Nazlı","Rüya","Aslı","Damla","Esra","Gamze","Hande","Melis","Pelin","Tuana","Yaren","Zehra","Ahmet","Mehmet","Mustafa","Ali","Hüseyin","Hasan","İbrahim","İsmail","Murat","Ömer","Yusuf","Emre","Burak","Can","Deniz","Emir","Fatih","Mert","Onur","Osman","Ozan","Tarık","Uğur","Volkan","Yasin"];
const brandNames = ["NovaTek","ApexGen","ZenAkış","VibeParlak","FluxÇekirdek","AuraZihin","EkoLab","LuxeDalga","SafSenk","BoldYol","SwiftKovan","ZirveForge","KenarAtım","KovanCraft","AtomMerkez","İyonStüdyo","NeoPro","MaxSoft","UltraWare","OmniBayt","AlfaBulut","BetaAkış","SigmaZihin","OmegaKıvılcım","DeltaDalga","PulseLab"];
const usernames = ["Kurt_42","KaraKartal_","ParlakTilki_","NeonŞahin_","SanalKaplan_","PikselBüyücü_","GölgeDoğan_","MaviAnka_","AtomKuzgun_","GizemPars_","ParlakKurt_","GümüşŞahin_","KozmikVaşak_","YıldızTilki_","NeonPuma_","SanalKurt_","PikselŞövalye_","RetroKuzgun_","SertKurt_","AsilKaplan_","KraliyetŞahini_","VahşiDoğan_","AlevEjderi_","BuzAnka_","KorKurt_","FırtınaKartal_"];
const businessNames = ["Küresel Çözümler","Birinci Girişim","Yeni Ufuk","Elit Hizmetler","Premier Grup","Stratejik Ortaklar","Dinamik İnovasyon","Dijital Sınır","Akıllı Sistemler","Hızlı Lojistik","Çekirdek Çözümler","Zirve Danışmanlık","Tac Girişim","Kraliyet Holding","Yüce Kalite","Nihai Kaynaklar","Öncü Grup","Miras Ortaklar","Asil Girişim","Egemen Çözümler"];
const petNames = ["Pamuk","Karam","Duman","Boncuk","Maviş","Şeker","Tarçın","Minnoş","Tekir","Sarman","Zeytin","Fındık","Papatya","Çilek","Mocha","Latte","Mochi","Prenses","Kral","Badem","Ceviz","Fıstık","Limon","Kiraz","Vişne","Erik","Nar","İncir","Üzüm","Rüzgar","Bulut","Yağmur","Kar","Yıldız","Ay","Nehir","Deniz","Göl","Orman","Gül","Lale"];
const fantasyNames = ["Aerion","Balor","Celestian","Drakon","Eldric","Faelyn","Galadriel","Helios","İthildin","Jorlan","Kaladin","Lorien","Malakai","Naroth","Orlinn","Piralis","Quelior","Ravath","Sarafin","Thranduil","Ulrick","Valerius","Wyrlan","Xandor","Yelara","Zarathos","Ashara","Briallen","Korvina","Emberlyn","Frostbane","Gloomhaven","Obsidyen","BeyazAy"];
const startupNames = ["Birleş","OmniLi","Hiperio","Metaix","NeoEx","ProMerkez","MaxBox","UltraSoft","SüperBulut","MegaAkış","GigaDalga","TeraKıvılcım","NanoBayt","MicroSenk","PoliZihin","MultiLab","BiÇekirdek","TriMantık","QuadGirişim","AlfaZihin","Betaİşler"];

const faqs = [
  { question: "İsim Oluşturucu nedir?", answer: "Ücretsiz araç: Bebek, marka, kullanıcı adı, şirket, evcil hayvan, fantezi ve girişim isimleri üretir. Yazarlar, oyuncular ve girişimciler için." },
  { question: "Ücretsiz mi?", answer: "Evet, tamamen ücretsiz! Kayıt yok, sınır yok." },
  { question: "Kaç kategori var?", answer: "7 kategori: Bebek, Marka, Kullanıcı Adı, Şirket, Evcil Hayvan, Fantezi ve Girişim." },
  { question: "Ticari kullanım?", answer: "Evet, tüm isimler ücretsiz kullanılabilir. Ticari marka kontrolü önerilir." },
  { question: "Çevrimdışı çalışır mı?", answer: "Evet, tarayıcınızda çalışır. Sayfa yüklendikten sonra internet gerekmez." },
];

const relatedTools = [
  { title: "Rastgele Sayı", icon: "🎲", href: "/tr/tools/random-number" },
  { title: "Şifre Oluşturucu", icon: "🔐", href: "/tr/tools/password-generator" },
  { title: "QR Oluşturucu", icon: "📱", href: "/tr/tools/qr-generator" },
  { title: "Fatura", icon: "🧾", href: "/tr/tools/invoice-generator" },
];

const seoContent = [
  "Ücretsiz İsim Oluşturucu: Bebek, marka, kullanıcı adı, şirket, evcil hayvan, fantezi ve girişim isimleri için anında yaratıcı isimler. Yazarlar, ebeveynler ve girişimciler için ideal.",
  "Bebek isimleri: Zeynep, Elif, Ahmet, Mehmet gibi popüler Türk isimleri. Marka isimleri: NovaTek, ApexGen. Kullanıcı adları oyun ve sosyal medya için.",
  "Fantezi isimleri: Aerion, Drakon, Galadriel — RPG karakterleri için mükemmel. Girişim isimleri teknoloji odaklı ve akılda kalıcı.",
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

  const schemaName = "İsim Oluşturucu";const schemaDesc = "Online İsim Oluşturucu - free tool";const schemaCategory = "Utility";const schemaUrl = "https://adwatak.cloud/tr/tools/name-generator";const breadcrumbItems = [{name:"Ana Sayfa",url:"https://adwatak.cloud/tr"},{name:"Oluşturucular",url:"https://adwatak.cloud/tr/category/generators"},{name:"İsim Oluşturucu",url:"https://adwatak.cloud/tr/tools/name-generator"}];
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={howToSchema("İsim Oluşturucu Nasıl Kullanılır","Yaratıcı isimler oluşturun. Kayıt gerekmez.",[{name:"Kategori seçin",text:"7 kategoriden birini seçin"},{name:"Adet belirleyin",text:"1-20 arası isim sayısı seçin"},{name:"Oluşturun",text:"Butona tıklayın, isimler anında hazır"},{name:"Kopyalayın",text:"İsimleri kopyalayıp kullanın"}],"bir dakikadan az","en")} />
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
      <Breadcrumb lang="en" category="Generators" categorySlug="generators" toolName="İsim Oluşturucu" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👤 İsim Oluşturucu</h1>
        <p className="text-sm text-gray-500 mb-6">Yaratıcı isimler oluşturun — bebek, marka, kullanıcı adı & daha fazlası</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)}
              className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all ${cat === c.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}
            >{c.emoji}{c.label}</button>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Adet</label>
          <input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="20" className="max-w-[100px] p-3 border-2 border-gray-200 rounded-xl text-base outline-none" />
        </div>
        <button onClick={generate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer hover:bg-blue-700 transition-colors">Oluştur</button>
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