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
  {
    slug: "islami-miras-hesaplama-rehberi-feraiz",
    title: "İslami Miras Hesaplama Rehberi 2026 — Feraiz Paylaşım Tablosu ve Örnekler",
    excerpt:
      "İslami miras hukuku (Feraiz) nedir? Miras nasıl paylaştırılır? Paylar, hisseler, vefat edenin yakınlarına göre miras dağıtımı. Adwatak'ın ücretsiz İslami miras hesaplama aracı ile örnek çözümler.",
    date: todayTrStr(),
    category: "İslami Araçlar",
    readTime: "8 dakika okuma",
    keywords: [
      "İslami miras hesaplama",
      "feraiz miras paylaşımı",
      "miras dağıtımı İslam",
      "İslamda miras hukuku",
      "kalan miras hesaplama",
      "miras payları İslami",
      "ücretsiz miras hesaplama aracı",
      "faraiz hesaplama",
    ],
    content: `
<h2>İslami Miras Hukuku (Feraiz) Nedir?</h2>
<p><strong>Feraiz</strong>, İslam hukukunda mirasın kimlere, ne oranda ve nasıl paylaştırılacağını belirleyen ilim dalına verilen isimdir. Kelime olarak Arapça "fariza" (farz edilmiş) kelimesinin çoğuludur, çünkü Kur'an-ı Kerim'de miras payları <strong>Açıkça farz edilmiştir</strong>. Nisa Suresi'nin 11. ve 12. ayetleri, miras paylarını detaylı şekilde belirler.</p>
<p>İslam'da miras hukuku, <strong>ana baba, eş ve çocuklar</strong> arasındaki mali ilişkileri düzenler. Mirasçıların payları, Kur'an'da belirlenen kesirlerle (1/2, 1/3, 1/4, 1/6, 1/8, 2/3) sabitlenmiştir. Bu paylar, ölen kişinin yakınlık derecesine, cinsiyetine ve diğer mirasçıların varlığına göre değişir.</p>

<h2>İslam'da Miras Dağıtımının Temel İlkeleri</h2>

<h3>1. Kur'an'da Belirlenen Paylar (Ashab-ı Füruz)</h3>
<p>Kur'an-ı Kerim'de payları açıkça belirlenen mirasçılara <strong>"Ashab-ı Füruz"</strong> denir. Bunların payları sabittir ve değişmez:</p>
<ul>
  <li><strong>Eş (kadın):</strong> Çocuk varsa 1/8 — Çocuk yoksa 1/4</li>
  <li><strong>Eş (erkek):</strong> Çocuk varsa 1/4 — Çocuk yoksa 1/2</li>
  <li><strong>Anne:</strong> Çocuk varsa 1/6 — Çocuk yoksa 1/3</li>
  <li><strong>Baba:</strong> Çocuk varsa 1/6 — Çocuk yoksa kalan alır</li>
  <li><strong>Kız çocuk:</strong> Tekse 1/2 — Birden fazla ise 2/3 (paylaşarak)</li>
  <li><strong>Erkek çocuk:</strong> Mirasçı sayısına göre kalanı alır (erkek çocuğun payı kız çocuğunun <strong>iki katıdır</strong>)</li>
  <li><strong>Üvey anne:</strong> Birden fazla ise 1/6 (paylaşarak)</li>
  <li><strong>Kız kardeş:</strong> Tekse 1/2 — Birden fazla ise 2/3</li>
</ul>

<h3>2. Miras Dağıtım Sırası</h3>
<p>İslami miras hukukunda miras dağıtımı belirli bir sırayla yapılır:</p>
<ul>
  <li><strong>Cenaze masrafları:</strong> Önce cenaze namazı, kefen ve defin masrafları ödenir.</li>
  <li><strong>Borçlar:</strong> Vefat edenin tahakkuk etmiş borçları (zekat, namaz, oruç kazası fidyesi, insanlara olan borçlar) ödenir.</li>
  <li><small><strong>Vasiyetname (vasiyet):</strong> Mirasın 1/3'üne kadar vasiyetnameyle başkasına bırakılabilir. Mirasçılara vasiyetname söz konusu değildir.</small></li>
  <li><strong>Miras paylaşımı:</strong> Kalan miktar, feraiz kitabına göre mirasçılara dağıtılırır.</li>
</ul>

<h3>3. Miras Kimlere Kalır?</h3>
<p>İslam'da mirasçı grupları üç ana kategoriye ayrılır:</p>
<ul>
  <li><strong>Zavi'l-Füruz (Ashab-ı Füruz):</strong> Kur'an'da payları belli olan mirasçılar</li>
  <li><strong>Asabe (Residiler):</strong> Payları belli olmayıp kalanı alan yakınlar (baba, büyük erkek torun, kardeş vb.)</li>
  <li><strong>Zevi'l-Arham (Uzak akrabalar):</strong> Üvey kan bağıyla bağlı yakınlar (anne tarafından amca, anne tarafından kuzen vb.)</li>
</ul>

<h2>Adwatak İslami Miras Hesaplama Aracı Nasıl Kullanılır?</h2>
<p><a href="https://adwatak.cloud/tr/tools/inheritance-calculator" target="_blank" rel="noopener"><strong>Adwatak İslami Miras Hesaplama Aracı</strong></a>, feraiz hesaplamalarını kolaylaştıran ücretsiz bir çevrimiçi araçtır. Kayıt gerektirmez ve tamamen tarayıcınızda çalışır.</p>

<h3>Adım Adım Kullanım</h3>
<ul>
  <li><strong>Toplam miktarı girin:</strong> Vefat edenin aktif ve pasifleri sonrasında kalan miras miktarını girin.</li>
  <li><strong>Mirasçıları belirleyin:</strong> Hayatta olan yakınları seçin — eş, anne, baba, çocuklar, kardeşler.</li>
  <li><strong>Hesapla:</strong> Araç, otomatik olarak İslami feraiz kurallarına göre payları hesaplar.</li>
</ul>
<p><strong>Not:</strong> Araç, diyabet, diğer dinler veya yasal sistem dışındaki farklı miras paylaşım yöntemlerini kapsamaz. Sadece <strong>İslami feraiz kurallarına göre</strong> hesaplama yapar.</p>

<h2>Miras Paylaşımı Örnek Çözümler</h2>

<h3>Örnek 1: Karı ve çocukları var, anne ve baba hayatta</h3>
<p>Diyelim ki ölen kişi (<strong>merhum</strong>)'ın hayattaki yakınları: <strong>1 karı, 2 erkek çocuk, 1 kız çocuk, anne, baba</strong>.</p>
<p>Paylar aşağıdaki gibi dağılır:</p>
<ul>
  <li><strong>Karı:</strong> 1/8 (çocukları olduğu için)</li>
  <li><strong>Anne:</strong> 1/6</li>
  <li><strong>Baba:</strong> 1/6 + asabe (kalan)</li>
  <li><strong>Çocuklar:</strong> Kalan pay, erkek çocuğa kız çocuğunun 2 katı olacak şekilde dağıtılır</li>
</ul>
<p>Paylar aslında bir hesaplama yöntemiyle (süre, evvel, te'asil) orantılanır. <strong>Adwatak miras hesaplayıcısı</strong> bu karmaşık süreci otomatik olarak yapar.</p>

<h3>Örnek 2: Evli, çocuğu yok, anne ve baba hayatta</h3>
<p>Hayattaki yakınlar: <strong>1 karı, anne, baba</strong>.</p>
<ul>
  <li><strong>Karı:</strong> 1/4 (çocuğu olmadığı için)</li>
  <li><strong>Anne:</strong> 1/3</li>
  <li><strong>Baba:</strong> Kalan payı alır</li>
</ul>

<h2>Neden Feraiz Bilgisine İhtiyaç Duyulur?</h2>
<p>Feraiz ilmini bilmek her Müslümanın <strong>sorumluluğudur</strong>. Zira:</p>
<ul>
  <li><strong>Mirasın haksız yere dağıtılmasını</strong> önler — bazen mirasçılardan biri zarar görebilir.</li>
  <li>Kur'an'da <strong>farz</strong> kılınan payların yerine getirilmiş olmasını sağlar.</li>
  <li><strong>Aile içi anlaşmaları</strong> önleyip, hukuki düzenlemeyi destekler.</li>
  <li>Mirasçıların <strong>hakkaniyetli pay</strong> almasını garanti eder.</li>
</ul>
<p>Profesyonel feraiz hesaplama yaparken bir fakih'ten (İslam hukuku uzmanı) danışılması önerilir. Ancak genel hesaplamalar için <strong>Adwatak'ın İslami miras hesaplayıcısı</strong> hızlı ve güvenilir sonuçlar verir.</p>

<h2>İslami Miras Hukukunun Benzersiz Özellikleri</h2>
<p>İslam'daki miras sistemi, diğer hukuki sistemlerden birçok açıdan farklıdır:</p>
<ul>
  <li><strong>Eşler arası miras:</strong> Evli kadın kocasının, erkek eşi karısının mirasından pay alır. Çoğu geleneksel sistemlerde bu, aile içi mülk kavramı çerçevesinde sınırlıdır.</li>
  <li><strong>Kadının payı:</strong> Kadın, belirli durumlarda mirasın yarısını veya önemli bir kısmını alır. Örneğin, tek kız çocuk mirasın <strong>yarısını</strong> alır.</li>
  <li><strong>Ta'sib (doğal miras):</strong> Kan bağına dayalı erkek mirasçılar (torun, kardeş, amca), kalanı alırlar.</li>
  <li><strong>Radd fazlalık payı:</strong> Bazı durumlarda paylar toplamı 1'den fazla veya az olabilir. Azalma (<strong>Avel</strong>) veya fazlalık (<strong>Radd</strong>) durumları feraiz ilminin karmaşık konularındandır.</li>
</ul>

<h2>Sıkça Sorulan Sorular (FAQ)</h2>

<h3>1. İslam'da mirasın adil dağıtımı nasıl sağlanır?</h3>
<p>İslam'da miras dağıtımı, <strong>Kur'an-ı Kerim'deki ayetlerle</strong> sabittir. Kur'an, mirasçıların paylarını olabilecek en hassas oranda belirlemiştir. <strong>Feraiz ilmi</strong> bu ayetleri yorumlar ve ölçüte uygun çözümler üretir. Bu miras sistemi, üç bin yılı aşkın uygulamada adaleti ve ahengi koruyacak şekilde tasarlanmıştır.</p>

<h3>2. İslam'da kadın miras alır mı? Payı nedir?</h3>
<p>Evet, İslam'da kadın <strong>kesinlikle miras alır</strong>. Kadının miras payı, mirasçıların durumuna göre değişir. Kadın:</p>
<ul>
  <li>Eşi vefat ederse, çocuk varsa <strong>1/8</strong>, çocuk yoksa <strong>1/4</strong> alır.</li>
  <li>Babası vefat ederse, tek kız çocuksa <strong>1/2</strong>, birden fazla kız varsa <strong>2/3</strong> (paylaşarak) alır.</li>
  <li>Annesi vefat ederse, çocuk varsa <strong>1/6</strong> alır.</li>
</ul>
<p><strong>Not:</strong> Erkek çocukların payı kız çocuklarının iki katıdır, ancak bu haksızlık değildir — erkek çocuk, ailesinin geçiminden, mehir ödemesinden ve zekat mükelleftir.</p>

<h3>3. İslam'da mirasçı olmayan kimler var?</h3>
<p>Belirli durumlarda kişi mirasçı olamaz. Örneğin:</p>
<ul>
  <li>Farklı dinden olan kişi (Müslüman ile gayrimüslim arasında miras kalmaz).</li>
  <li>Adam öldürme sebebiyle mirasçılıktan çıkarılabilir.</li>
  <li>Evlilik bağı olmadan akrabalar uzak mirasçı (Zevi'l-Arham) olarak grup dışında kalabilir, ancak mirasçı yoksa onlara da kalabilir.</li>
</ul>

<h3>4. İslam'da vasiyetname yazılabilir mi?</h3>
<p>Evet, İslam'da vasiyetname yazılabilir. Ancak şu sınırlamalar vardır:</p>
<ul>
  <li>Vasiyet <strong>mirasın en fazla 1/3'ü</strong> olabilir. (Sahih Hadis'in belirttiği gibi, yarısı veya 1/2'si değil.)</li>
  <li>Mirasçılara vasiyetname <strong>yazılamaz</strong> — mirasçıların payları Kur'an'da belirlenmiştir, onlara vasiyet fazlalık oluşturamaz.</li>
  <li>Vasiyetinin şartları vardır: aklı başında, bilinçli olarak yazılması gerekir.</li>
</ul>

<p><em>Aklınıza hâlâ takılanlar olabilir — detaylı sorularınız için bir fakih'e danışmanız en uygunudur.</em></p>

<h3>5. İslam'da evlat edinilen çocuk miras alır mı?</h3>
<p>Kur'an'da açıkça belirtildiği üzere, <strong>evlat edinilen çocuk biyolojik çocuk sayılmaz</strong>. Dolayısıyla, evlat edinilen çocuk biyolojik babasının veya annesinin mirasından doğal mirasçı olmaz. Ancak kurucu (evin mal varlığından) vasiyetname yoluyla destek olabilir veya nakdi bağışlayabilir.</p>

<h3>6. Kız çocuğunun payı neden yarı yarıya?</h3>
<p>Kız çocunun payının erkek çocuktan az olması <strong>haksızlık değildir</strong>:</p>
<ul>
  <li>Önce erkek eşin karısına <strong>mevlid (mehir)</strong> borcu, erkek çocuğa aittir.</li>
  <li>Kız çocuğunun geçimi, <strong>babası veya erkek kardeşi</strong> tarafından sağlanır.</li>
  <li>Evlendirildiğinde kız çocuğu <strong>mevlid (mehir)</strong> alır ve mirasın yarısını tutar.</li>
  <li>Erkek çocuk ailesinin sorumluluğunu taşır; geçimini, zekâtını, sadakalarını kendi malından öder.</li>
</ul>

<h3>7. Mirasçılar birbirleriyle anlaşmazlık yaşarsa ne olur?</h3>
<p>Mirasçıların anlaşmazlık yaşaması durumunda:</p>
<ul>
  <li>Bir <strong>fakih'ten (İslam hukuku uzmanı)</strong> danışılır veya mahkemeye başvurulur.</li>
  <li>Türkiye'de miras davaları <strong>Medeni Hukuk Mahkemeleri</strong>nden yürütülmektedir.</li>
  <li>Adwatak'ın <strong>İslami miras hesaplama aracı</strong> dava öncesi bilgilendirme amaçlı kullanılabilir.</li>
</ul>

<h3>8. Miras hesaplamada bölme işlemi nasıl yapılır?</h3>
<p>Feraiz hesaplamalarında paylar, <strong>ortak bölen (te'sil, ta'dil, evvel)</strong> yöntemleriyle orantılanır. Bu süreç:</p>
<ul>
  <li><strong>Te'sil:</strong> Payların ortak alt bölenini bulmak</li>
  <li><strong>İtifak:</strong> Payların ortak bölenini bulmak</li>
  <li><strong>Avel:</strong> Payların toplamı paydan fazlaysa, paydada azaltma yapılır</li>
  <li><strong>Radd:</strong> Payların toplamı paydan azsa, paydaya eklenir</li>
</ul>
<p>Bu hesaplamalar oldukça karmaşık olabilir. <a href="https://adwatak.cloud/tr/tools/inheritance-calculator" target="_blank" rel="noopener"><strong>Adwatak İslami Miras Hesaplama Aracı</strong></a> bu işlemleri otomatik olarak gerçekleştirir.</p>

<h3>9. Dini eğitim almadan miras hesaplaması yapılabilir mi?</h3>
<p>Profesyonel feraiz hesaptan önce dini eğitim almak en sağlıklısıdır. Ancak <strong>Adwatak'ın İslami miras hesaplayıcısı</strong> kullanıcılar için dini ayrıntılara girmeden hızlı ve güvenilir hesaplamalara yardımcı olur. Sonuçlar yeterli olmayabilir — önemli kararlar için <strong>fakih'ten</strong> danışmanız kesinlikle önerilir.</p>

<h3>10. Feraiz hesabını bilgisayarla yapmak caiz midir?</h3>
<p>Bilgisayar veya çevrimiçi araçlarla feraiz hesabı yapmak <strong>caizdir</strong>. Bu araçlar, matematiksel hesaplamayı hızlandırmak ve hata payını azaltmak için geliştirilmiştir. Önemli olan, aracın <strong>Kur'an ve Sünnet'e uygun</strong> payları referans almasıdır. Adwatak'ın aracı, İslam hukukunun klasik kaynaklarına dayanılarak tasarlanmıştır.</p>

<h3>11. Payların toplamı 1 (yüzde 100) eder mi?</h3>
<p>En çok evet, bazı özel durumlarda fark edebilir:</p>
<ul>
  <li><strong>Set-te (Avel):</strong> Payların toplamı 1'den fazla olur — payda azaltılır.</li>
  <li><strong>Radd:</strong> Payların toplamı 1'den az kalır — payda artırılır ve fazlalık paya eklenir.</li>
  <li>Bu iki durum feraiz ilminin en karmaşık konularındandır ve uzmanlık gerektirir.</li>
</ul>

<h3>12. Evlilik dışı çocuk miras alır mı?</h3>
<p>İslam hukukunda evlilik dışı doğan çocuk <strong>biyolojik baba</strong> ile <strong>babalık bağı (nesep)</strong> kurulamaz. Dolayısıyla, babasının mirasından doğrudan miras alamaz. Ancak Türkiye'nin Medeni Kanunu açısından durum farklı olabilir. Ayrıntılı bilgi için fakih ve hukuk danışmanına başvurun.</p>

<h3>13. Ölen kişinin borçları mirasçıları nasıl etkiler?</h3>
<p>Vefat edenin borçları, mirasın dağıtılmasından <strong>önce</strong> ödenir. Borçlar:</p>
<ul>
  <li><strong>İnsanlara olan borçlar</strong> (kredi, iş, ticari)</li>
  <li><strong>Allah'a olan borçlar</strong> (kaza namazı, kaza oruç, zekat, kefaret vb.) — bu, önce uygulaması gereken yer tahsis edilebilir.</li>
</ul>
<p>Borçlar ödendikten sonra kalan miktar, <strong>mirasçılara paylaştırılır</strong>.</p>

<h3>14. Çoğunlukla hangi durumlar "âil" (avel) veya "radd" kategorisine girer?</h3>
<p><strong>Âvel (azalma):</strong> Aynı cinsiyetten birden fazla mirasçı bulunduğunda sık karşılaşılır. Örneğin, 2 karı ve 3 kız çocuğu gibi durumlarda payların toplamı 1'i aşabilir.</p>
<p><strong>Radd (fazlalık):</strong> Asabe (doğal mirasçı) kalmadığında ve paylar toplamı 1'den az olduğunda fazlalık, zevi'l-arham (uzak akrabalara) veya mirasçılara geri dağıtılabilir. Bu, mezhep ve hukuk farklılığına göre değişir.</p>

<h3>15. Adwatak İslami miras hesaplama aracı ücretsiz mi?</h3>
<p>Evet! Adwatak'ın tüm araçları — <strong>İslami miras hesaplama dahil</strong> — <strong>%100 ücretsizdir</strong>. Kayıt gerektirmez ve hiçbir ücret veya abonelik yoktur. Tarayıcınızda anında kullanabilirsiniz.</p>
<p><a href="https://adwatak.cloud/tr/tools/inheritance-calculator" target="_blank" rel="noopener"><strong>Şimdi İslami Miras Hesapla →</strong></a></p>
`,
  },
];

export { trBlogPosts };
