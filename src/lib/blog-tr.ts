export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  keywords: string[];
}

export function getAllTrPosts(): BlogPost[] {
  return trBlogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getTrPostBySlug(slug: string): BlogPost | undefined {
  return trBlogPosts.find((p) => p.slug === slug);
}

export function getTrPostsByCategory(category: string): BlogPost[] {
  return trBlogPosts.filter((p) => p.category === category);
}

function todayTrStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const trBlogPosts: BlogPost[] = [
  {
    slug: "adwatak-nedir-2026",
    title: "Adwatak Nedir? — 50+ Ücretsiz Çevrimiçi Araç Platformu Hakkında Kapsamlı Rehber 2026",
    excerpt:
      "Adwatak.cloud nedir, hangi araçları sunar, nasıl kullanılır? Finansal hesaplamalardan İslami araçlara, metin araçlarından PDF dönüştürücülere kadar 50+ ücretsiz aracı keşfedin.",
    content: `
<h2>Adwatak.cloud Nedir?</h2>
<p><strong>Adwatak</strong> (Arapça: أدواتك — "Araçların"), herkes için ücretsiz çevrimiçi araçlar sunan bir platformdur. 50'den fazla interaktif araçla, finansal hesaplamalardan İslami araçlara, metin düzenleyicilerden PDF dönüştürücülere kadar her ihtiyaca cevap verir.</p>
<p>Platform, Arapça, İngilizce ve şimdi de Türkçe olarak hizmet vermektedir. Tüm araçlar tamamen ücretsizdir, kayıt gerektirmez ve tarayıcınızda çalışır — hiçbir veriniz sunucuya gönderilmez.</p>

<h2>Hangi Araçlar Sunuluyor?</h2>
<h3>💰 Finansal Hesaplamalar</h3>
<ul>
  <li><strong>Konut Kredisi Hesaplama</strong> — Aylık ödeme ve amortisman tablosu</li>
  <li><strong>Kişisel Kredi Hesaplama</strong> — Kredi faizi ve toplam geri ödeme</li>
  <li><strong>EMI Hesaplama</strong> — Eşit aylık taksit hesaplama</li>
  <li><strong>Bileşik Faiz Hesaplama</strong> — Yatırım büyüme hesaplamaları</li>
  <li><strong>KDV Hesaplama</strong> — KDV ekleme ve çıkarma</li>
  <li><strong>Net Maaş Hesaplama</strong> — Kesintiler sonrası net maaş</li>
  <li><strong>Altın Hesaplama</strong> — Gram altın değeri ve zekat</li>
  <li><strong>Kâr Marjı Hesaplama</strong> — Kar marjı ve başabaş noktası</li>
</ul>

<h3>🕌 İslami Araçlar</h3>
<ul>
  <li><strong>İslami Miras Hesaplama</strong> — Feraiz kurallarına göre miras paylaşımı</li>
  <li><strong>Zekat Hesaplama</strong> — Para, altın ve hisseler için zekat</li>
  <li><strong>Kıble Yönü</strong> — Konumunuza göre kıble yönü</li>
  <li><strong>Namaz Vakitleri</strong> — Konumunuza göre namaz vakitleri</li>
  <li><strong>Hicri ↔ Miladi Çevirici</strong> — Tarih dönüşümü</li>
</ul>

<h3>📝 Metin Araçları</h3>
<ul>
  <li>Kelime ve Karakter Sayacı</li>
  <li>Metin Büyük/Küçük Harf Dönüştürücü</li>
  <li>Sayıyı Yazıya Çevirme</li>
  <li>Metin Temizleyici</li>
  <li>Metin Karşılaştırma</li>
  <li>Yapay Zeka İçerik Dedektörü</li>
  <li>Dil Bilgisi Denetleyici</li>
</ul>

<h3>📄 PDF Araçları</h3>
<ul>
  <li>PDF Birleştirme</li>
  <li>PDF Ayırma</li>
  <li>PDF Sıkıştırma</li>
  <li>PDF'den Word'e Dönüştürme</li>
</ul>

<h3>⚡ Oluşturucular</h3>
<ul>
  <li>QR Kod Oluşturucu</li>
  <li>Barkod Oluşturucu</li>
  <li>Şifre Oluşturucu</li>
  <li>Fatura Oluşturucu</li>
</ul>

<h2>Adwatak'ı Neden Kullanmalısınız?</h2>
<ul>
  <li>✅ <strong>Tamamen ücretsiz</strong> — Gizli ücret yok, premium plan yok</li>
  <li>✅ <strong>Kayıt gerekmez</strong> — Her aracı anında kullanın</li>
  <li>✅ <strong>Gizlilik odaklı</strong> — Tüm araçlar tarayıcınızda çalışır, verileriniz cihazınızdan ayrılmaz</li>
  <li>✅ <strong>Duyarlı tasarım</strong> — Mobil ve masaüstünde çalışır</li>
  <li>✅ <strong>Çok dilli</strong> — Arapça, İngilizce ve Türkçe</li>
</ul>

<h2>Sıkça Sorulan Sorular</h2>
<h3>Adwatak ücretsiz mi?</h3>
<p>Evet, tüm araçlar %100 ücretsizdir. Gizli ücret veya premium plan yoktur.</p>

<h3>Kayıt olmam gerekir mi?</h3>
<p>Hayır, herhangi bir kayıt veya hesap oluşturmanız gerekmez. Her aracı anında kullanabilirsiniz.</p>

<h3>Verilerim güvende mi?</h3>
<p>Evet, tüm araçlar tarayıcınızda (istemci tarafında) çalışır. Hiçbir veri sunucumuza gönderilmez veya saklanmaz.</p>

<h3>Hangi diller destekleniyor?</h3>
<p>Adwatak, Arapça (orijinal), İngilizce ve Türkçe olarak kullanılabilir.</p>

<h3>Yeni araçlar ekleniyor mu?</h3>
<p>Evet, düzenli olarak yeni araçlar ekliyoruz. Önerileriniz için bizimle iletişime geçin.</p>
`,
    date: "2026-06-02",
    category: "Genel",
    readTime: "5 dakika okuma",
    keywords: ["Adwatak", "ücretsiz araçlar", "çevrimiçi araçlar", "finansal hesaplamalar", "İslami araçlar"],
  },
  {
    slug: "konut-kredisi-hesaplama-rehberi-2026",
    title: "Konut Kredisi Hesaplama Rehberi 2026 — Aylık Taksit ve Faizi Kolayca Hesaplayın",
    excerpt:
      "Konut kredisi hesaplama nasıl yapılır? Adwatak'ın ücretsiz mortgage hesaplama aracıyla aylık taksit, toplam faiz ve amortisman tablosunu anında hesaplayın. 2026 güncel faiz oranları için kapsamlı rehber.",
    date: todayTrStr(),
    category: "Finans",
    readTime: "7 dakika okuma",
    keywords: [
      "konut kredisi hesaplama",
      "mortgage hesaplama",
      "aylık taksit hesaplama",
      "konut kredisi faiz oranı 2026",
      "ev kredisi hesaplama",
      "amortisman tablosu",
      "konut kredisi nasıl hesaplanır",
      "ücretsiz kredi hesaplama aracı",
    ],
    content: `
<h2>Konut Kredisi Nedir?</h2>
<p><strong>Konut kredisi</strong>, bireylerin ev satın almak amacıyla bankalardan talep ettikleri uzun vadeli finansman türüdür. Banka, evin değerinin belirli bir yüzdesini (genellikle %70-%80) kredi olarak verir; borçlu ise bu tutarı <strong>faiz</strong> ile birlikte belirli sayıda aylık taksitte geri öder.</p>
<p>Konut kredisi başvurusu öncesinde <strong>aylık taksit</strong> ve <strong>toplam geri ödeme</strong> tutarlarını bilmek, bütçenizi doğru planlamanız açısından kritik öneme sahiptir. Yanlış hesaplamalar, aylık bütçenizi zorlayabilir veya gereksiz maliyetlere yol açabilir.</p>

<h2>Konut Kredisi Hesaplama Formülü</h2>
<p>Konut kredisi aylık taksit hesaplaması, <strong>annuity (sabit taksit) formülü</strong> ile yapılır:</p>
<p><strong>Aylık Taksit = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]</strong></p>
<p>Burada:</p>
<ul>
  <li><strong>P</strong> = Kredi tutarı (ana para)</li>
  <li><strong>r</strong> = Aylık faiz oranı (yıllık faiz ÷ 12)</li>
  <li><strong>n</strong> = Toplam taksit sayısı (yıl × 12)</li>
</ul>
<p>Bu formülü elle hesaplamak karmaşık olabilir. İşte bu noktada <strong>Adwatak'ın ücretsiz konut kredisi hesaplama aracı</strong> devreye girer — sadece kredi tutarı, faiz oranı ve vade bilgilerini girin, geri kalanı anında hesaplanır.</p>

<h2>Adwatak Konut Kredisi Hesaplama Aracı Nasıl Kullanılır?</h2>
<p><a href="https://adwatak.cloud/tr/tools/mortgage-calculator" target="_blank" rel="noopener"><strong>Adwatak Mortgage Hesaplama Aracı</strong></a> tamamen ücretsizdir ve kayıt gerektirmez. Kullanımı son derece basittir:</p>

<h3>Adım 1: Kredi Tutarını Girin</h3>
<p>Satın almayı düşündüğünüz evin fiyatı veya bankadan talep etmek istediğiniz kredi tutarını girin. Örneğin: <strong>2.500.000 ₺</strong>.</p>

<h3>Adım 2: Faiz Oranını Belirleyin</h3>
<p>Bankanın size sunduğu yıllık faiz oranını girin. 2026 yılında Türkiye'de konut kredisi faiz oranları genellikle <strong>%1,89 ile %3,49</strong> arasında değişmektedir. Güncel oranları bankanızdan öğrenebilirsiniz.</p>

<h3>Adım 3: Vade (Yıl) Seçin</h3>
<p>Krediyi kaç yılda ödemek istediğinizi belirleyin. Konut kredileri genellikle <strong>5 ila 20 yıl</strong> vade aralığında sunulur. Uzun vade aylık taksiti düşürür ancak toplam faiz maliyetini artırır.</p>

<h3>Adım 4: Sonuçları İnceleyin</h3>
<p>Araç size şu bilgileri anında sunar:</p>
<ul>
  <li><strong>Aylık taksit tutarı</strong></li>
  <li><strong>Toplam geri ödeme tutarı</strong></li>
  <li><strong>Toplam faiz maliyeti</strong></li>
  <li><strong>Amortisman tablosu</strong> (her taksitte anapara ve faiz dağılımı)</li>
</ul>

<h2>Konut Kredisi Faiz Oranları 2026 — Nelere Dikkat Etmeli?</h2>
<p>2026 yılında konut kredisi faiz oranları, merkez bankası politikaları, enflasyon beklentileri ve piyasa koşullarına göre değişkenlik gösterebilir. İşte dikkat etmeniz gerekenler:</p>

<h3>Sabit Faiz mi, Değişken Faiz mi?</h3>
<ul>
  <li><strong>Sabit faiz:</strong> Kredi boyunca aynı faiz oranı uygulanır. Öngörülebilir taksitler avantajı sağlar.</li>
  <li><strong>Değişken faiz:</strong> Piyasa koşullarına göre değişir. Düşük başlayabilir ama artma riski taşır.</li>
</ul>

<h3>Faiz Dışı Maliyetler</h3>
<p>Konut kredisi sadece faizden ibaret değildir. Şunları da göz önünde bulundurun:</p>
<ul>
  <li><strong>Düzenleme masrafı</strong> — Bankanın kredi düzenleme ücreti</li>
  <li><strong>Tapu harcı</strong> — Evin değerinin %2'si (alıcı-satıcı paylaşır)</li>
  <li><strong>İpotek tesis ücreti</strong></li>
  <li><strong>Kasko ve DASK sigortası</strong></li>
  <li><strong>Değerleme raporu ücreti</strong></li>
</ul>

<h2>Konut Kredisi Taksit Hesaplama Örnekleri</h2>
<p>2026 yılı için farklı senaryolarda konut kredisi hesaplama örnekleri:</p>

<h3>Örnek 1: 2.500.000 ₺ Kredi, %2,50 Faiz, 10 Yıl Vade</h3>
<ul>
  <li>Aylık Taksit: ~<strong>23.700 ₺</strong></li>
  <li>Toplam Geri Ödeme: ~<strong>2.844.000 ₺</strong></li>
  <li>Toplam Faiz: ~<strong>344.000 ₺</strong></li>
</ul>

<h3>Örnek 2: 3.000.000 ₺ Kredi, %2,20 Faiz, 15 Yıl Vade</h3>
<ul>
  <li>Aylık Taksit: ~<strong>20.300 ₺</strong></li>
  <li>Toplam Geri Ödeme: ~<strong>3.654.000 ₺</strong></li>
  <li>Toplam Faiz: ~<strong>654.000 ₺</strong></li>
</ul>

<h3>Örnek 3: 1.500.000 ₺ Kredi, %2,80 Faiz, 5 Yıl Vade</h3>
<ul>
  <li>Aylık Taksit: ~<strong>26.800 ₺</strong></li>
  <li>Toplam Geri Ödeme: ~<strong>1.608.000 ₺</strong></li>
  <li>Toplam Faiz: ~<strong>108.000 ₺</strong></li>
</ul>

<p><em>Not: Bu rakamlar yaklaşık değerlerdir. Kesin sonuçlar için <a href="https://adwatak.cloud/tr/tools/mortgage-calculator" target="_blank" rel="noopener"><strong>Adwatak konut kredisi hesaplama aracını</strong></a> kullanın.</em></p>

<h2>Konut Kredisi İçin İpuçları</h2>
<ul>
  <li><strong>Birden fazla banka teklifini karşılaştırın</strong> — Faiz oranları ve masraflar bankadan bankaya değişir.</li>
  <li><strong>Ödeme gücünüzü aşmayın</strong> — Aylık taksit, net gelirinizin %30'unu geçmemelidir.</li>
  <li><strong>Erken ödeme seçeneğini değerlendirin</strong> — Fazladan ödemelerle toplam faiz maliyetini düşürebilirsiniz.</li>
  <li><strong>Vade uzunluğunu dikkatlice seçin</strong> — Kısa vade yüksek taksit ama düşük toplam faiz demektir.</li>
  <li><strong>Amortisman tablosunu inceleyin</strong> — İlk yıllarda faiz, son yıllarda anapara ağırlıklı ödeme yapılır.</li>
</ul>

<h2>Diğer Finansal Araçlar</h2>
<p>Konut kredisi hesaplamanın yanı sıra Adwatak'ta şu finansal araçları da ücretsiz kullanabilirsiniz:</p>
<ul>
  <li><a href="https://adwatak.cloud/tr/tools/loan-calculator" target="_blank" rel="noopener"><strong>Kişisel Kredi Hesaplama</strong></a> — Taşıt ve ihtiyaç kredileri için</li>
  <li><a href="https://adwatak.cloud/tr/tools/emi-calculator" target="_blank" rel="noopener"><strong>EMI Hesaplama</strong></a> — Eşit aylık taksit hesaplama</li>
  <li><a href="https://adwatak.cloud/tr/tools/compound-interest" target="_blank" rel="noopener"><strong>Bileşik Faiz Hesaplama</strong></a> — Yatırım büyüme hesaplamaları</li>
  <li><a href="https://adwatak.cloud/tr/tools/vat-calculator" target="_blank" rel="noopener"><strong>KDV Hesaplama</strong></a> — KDV ekleme ve çıkarma</li>
  <li><a href="https://adwatak.cloud/tr/tools/salary-calculator" target="_blank" rel="noopener"><strong>Net Maaş Hesaplama</strong></a> — Brütten nete maaş hesaplama</li>
  <li><a href="https://adwatak.cloud/tr/tools/profit-margin" target="_blank" rel="noopener"><strong>Kâr Marjı Hesaplama</strong></a> — İşletme kârlılığı analizi</li>
</ul>

<h2>Sıkça Sorulan Sorular (FAQ)</h2>

<h3>Konut kredisi hesaplama nasıl yapılır?</h3>
<p>Konut kredisi hesaplamak için kredi tutarı, yıllık faiz oranı ve vade (yıl) bilgilerine ihtiyacınız vardır. Bu değerleri <a href="https://adwatak.cloud/tr/tools/mortgage-calculator" target="_blank" rel="noopener"><strong>Adwatak mortgage hesaplama aracına</strong></a> girerek anında aylık taksit ve toplam maliyet bilgisine ulaşabilirsiniz.</p>

<h3>2026 yılında konut kredisi faiz oranları ne kadar?</h3>
<p>2026 yılında Türkiye'de konut kredisi faiz oranları bankaya ve müşteri profiline göre değişmektedir. Genel aralık %1,89 ile %3,49 arasındadır. Güncel oranlar için bankalarınızla iletişime geçin.</p>

<h3>Aylık taksit ne kadar olmalı?</h3>
<p>Finansal uzmanlar, aylık kredi taksitlerinin net gelirinizin <strong>%30'unu</strong> geçmemesini önerir. Bu oran, günlük harcamalarınızı ve diğer borçlarınızı göz önünde bulundurarak belirlenmelidir.</p>

<h3>Kısa vade mi uzun vade mi tercih etmeliyim?</h3>
<p><strong>Kısa vade</strong> (5-10 yıl) toplam faiz maliyetini düşürür ancak aylık taksiti yükseltir. <strong>Uzun vade</strong> (15-20 yıl) aylık taksiti düşürür ancak toplamda daha fazla faiz ödersiniz. Bütçenize göre karar verin.</p>

<h3>Erken ödeme yaparsam ne olur?</h3>
<p>Erken ödeme yaparak kredi tutarını veya vadesini kısaltabilirsiniz. Bu, toplam faiz maliyetinizi önemli ölçüde düşürür. Ancak bazı bankalar erken ödeme cezası uygulayabilir, sözleşmenizi kontrol edin.</p>

<h3>Konut kredisi için hangi belgeler gerekir?</h3>
<p>Genellikle kimlik belgesi, gelir belgesi (bordro/vergi levhası), tapu senedi, değerleme raporu ve kredi başvuru formu gerekir. Bankalara göre ek belgeler talep edilebilir.</p>

<h3>Sabit faizli mi yoksa değişken faizli mi kredi almalıyım?</h3>
<p><strong>Sabit faiz</strong> öngörülebilirlik sağlar ve faiz artışlarından korur. <strong>Değişken faiz</strong> başlangıçta daha düşük olabilir ama gelecekte artma riski taşır. Piyasa beklentilerinizi ve risk toleransınızı değerlendirin.</p>

<h3>Konut kredisi kimler alabilir?</h3>
<p>18 yaşını düşmüş, düzenli geliri olan ve kredi notu yeterli olan her vatandaş konut kredisi başvurusunda bulunabilir. Bankalar kendi kriterlerine göre değerlendirme yapar.</p>

<h3>Konut kredisi hesaplayıcı güvenilir mi?</h3>
<p>Evet, <a href="https://adwatak.cloud/tr/tools/mortgage-calculator" target="_blank" rel="noopener"><strong>Adwatak konut kredisi hesaplayıcısı</strong></a> standart finansal formülleri kullanır ve doğru sonuçlar üretir. Ancak bankaların uyguladığı ek masraflar ve güncel faiz oranları için bankanızla teyit almanız önerilir.</p>

<h3>Konut kredisi ile ev alırken nelere dikkat etmeliyim?</h3>
<p>Faiz oranlarını karşılaştırın, ek masrafları hesaba katın, ödeme gücünüzü aşmayın, ipotek sürecini öğrenin ve birden fazla bankadan teklif alın. Adwatak'ın finansal araçlarıyla ön hesaplamalarınızı yapın.</p>

<h3>Adwatak konut kredisi hesaplama aracı ücretsiz mi?</h3>
<p>Evet, Adwatak'ın tüm araçları — konut kredisi hesaplama dahil — <strong>%100 ücretsizdir</strong>. Kayıt gerektirmez, herhangi bir ücret veya abonelik yoktur. Tarayıcınızda anında kullanabilirsiniz.</p>

<h3>Amortisman tablosu nedir ve neden önemlidir?</h3>
<p>Amortisman tablosu, her aylık taksitin ne kadarının <strong>anaparaya</strong> ne kadarının <strong>faize</strong> gittiğini gösteren tablodur. İlk yıllarda faiz oranı yüksektir; vade ilerledikça anapara ödemesi artar. Bu tablo, erken ödeme kararları için kritik bilgi sağlar.</p>
`,
  },
];

export { trBlogPosts };
