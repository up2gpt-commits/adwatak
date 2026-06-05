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
    slug: "zekat-hesaplama-rehberi-2026-altin-para-hisseler",
    title: "Zekat Hesaplama Nasıl Yapılır 2026 — Altın, Para ve Hisse Senetleri İçin Detaylı Rehber",
    excerpt:
      "Zekat hesaplama 2026: Altın, para ve hisse senetleri için zekat nasıl hesaplanır? Nisab miktarı, hangi mallardan zekat verilir, örnek hesaplamalar ve Adwatak ücretsiz zekat hesaplama aracı ile adım adım rehber.",
    date: "2026-06-03",
    category: "İslami Araçlar",
    readTime: "10 dakika okuma",
    keywords: [
      "zekat hesaplama 2026",
      "zekat nisabı 2026",
      "altın zekat hesaplama",
      "para zekatı nasıl hesaplanır",
      "hisse senedi zekatı",
      "zekat hesaplama aracı",
      "zekat ne zaman verilir",
      "zekat farz mı",
      "zekat hesaplama örnekleri",
      "ücretsiz zekat hesaplama",
      "zekat eşi nisap",
      "İslamda zekat kuralları",
    ],
    content: `
<h2>Zekat Hesaplama 2026 — Altın, Para ve Hisse Senetleri İçin Detaylı Rehger</h2>
<p><strong>Zekat</strong>, İslam'ın beş şartından biridir ve belirli bir nisab (eşik) üzerinden hesaplanarak yoksullara, ihtiyaç sahiplerine ve belirlenen sekiz sınıfa dağıtılır. 2026 yılında zekat hesaplamak için <strong>altının gram fiyatı, döviz kurları ve nisab miktarı</strong> gibi güncel verileri bilmeniz gerekir. Bu rehberde, altın, para ve hisse senetleri için zekat nasıl hesaplanır, nisab miktarı ne kadar ve hangi koşullarda zekat farz olur detaylıca açıklanmaktadır.</p>
<p>Zekat hesaplamak artık çok kolay: <a href="https://adwatak.cloud/tr/tools/zakat-calculator" target="_blank" rel="noopener"><strong>Adwatak ücretsiz zekat hesaplama aracı</strong></a> ile anında hesaplayabilirsiniz. Ancak hesaplamanın arkasındaki mantığı bilmek de önemlidir — bu rehber hem pratik hem teorik bilgiyi sunar.</p>

<h2>Zekat Nedir ve Neden Farzdır?</h2>
<p>Zekat, Arapça "zekâ" (temizlenme, büyüme) kökünden gelir. Mali anlamda, belirli bir miktar malın <strong>%2,5'ini</strong> belirlenen kişilere vermek anlamına gelir. Zekat, Kur'an-ı Kerim'de namazla birlikte sıkça emredilen bir ibadettir:</p>
<p><em>"Namazı kılın, zekatı verin..."</em> (Bakara, 2/43)</p>
<p>Zekat farz oluşu, <strong>Kur'an, Sünnet ve İcma</strong> ile kesinleşmiştir. Zekat vermeyen kişi için Kur'an'da ağır uyarılar vardır (Tevbe, 9/34-35).</p>

<h2>Zekatın Farz Olma Şartları</h2>
<p>Zekatın farz olması için aşağıdaki şartların tamamının gerçekleşmesi gerekir:</p>

<h3>1. Müslüman Olmak</h3>
<p>Zekat, Müslüman bireyler için farzdır. Gayrimüslimler zekat yükümlülüğü altında değildir.</p>

<h3>2. Akıl ve Baligh Olmak</h3>
<p>Akıllı ve ergenlik çağına ulaşmış olmak gerekir. Küçük çocukların ve akıl hastalarının mallarından zekat farz değildir (bazı mezheplere göre veli/vekil hesaplayıp verebilir).</p>

<h3>3. Hür (Köle) Olmamak</h3>
<p>Özgür bireyler için geçerlidir.</p>

<h3>4. Nisab Miktarına Ulaşmak</h3>
<p>Malların, belirlenen <strong>nisab miktarına</strong> (eşiğe) ulaşması gerekir. 2026 yılı nisab miktarı aşağıda detaylıca açıklanmıştır.</p>

<h3>5. Haul (Bir Yıl) Tamamlanması</h3>
<p>Malların üzerinden <strong>bir hicri yıl</strong> (354 gün) geçmesi gerekir. Ancak ticari mallar ve gelirler için farklı görüşler de mevcuttur.</p>

<h3>6. Tam Mülkiyet</h3>
<p>Malın tamamen kişinin mülkiyetinde olması, üzerinde başkasının hakkı bulunmaması gerekir.</p>

<h2>Zekat Nisabı 2026 — Altın ve Para Cinsinden</h2>
<p>Nisab, zekatın farz olduğu minimum miktardır. 2026 yılında nisab miktarı şu şekildedir:</p>

<h3>Altın Cinsinden Nisab</h3>
<p><strong>85 gram altın</strong> veya eş değerinde para/tercihen altın. Bu, saf altın (24 ayar) bazından hesaplanır.</p>
<p>2026 yılında gram altın fiyatı değişkenlik gösterse de, nisab miktarı <strong>85 gram altın</strong> olarak sabittir. Güncel altın fiyatına göre nisabın para karşılığını hesaplayabilirsiniz.</p>

<h3>Gümüş Cinsinden Nisab</h3>
<p><strong>595 gram gümüş</strong> veya eş değerinde para. Ancak gümüş nisabı, altın nisabına göre daha az tercih edilir; çoğu alim, altın nisabını esas almayı önerir.</p>

<h3>Para (Nakit) Cinsinden Nisab</h3>
<p>Nakit paranızın nisab miktarı, <strong>85 gram altının güncel piyasa değerine</strong> eşit olmalıdır. Örneğin, gram altın 4.000 ₺ ise nisab = 85 × 4.000 = <strong>340.000 ₺</strong> olur.</p>

<p><strong>Örnek Nisab Hesabı (2026 Tahmini):</strong></p>
<ul>
  <li>Gram altın: ~4.000 ₺</li>
  <li>Nisab (85 gram): <strong>~340.000 ₺</strong></li>
  <li>Zekat (%2,5): <strong>~8.500 ₺</strong></li>
</ul>

<p><em>Not: Güncel altın fiyatları için <a href="https://adwatak.cloud/tr/tools/zakat-calculator" target="_blank" rel="noopener"><strong>Adwatak zekat hesaplama aracını</strong></a> kullanın — otomatik olarak güncel fiyatları alır.</em></p>

<h2>Hangi Mallardan Zekat Verilir?</h2>
<p>İslam hukukunda zekat verilmesi gereken mal kategorileri bellidir:</p>

<h3>1. Altın ve Gümüş</h3>
<p>Takı, sikke, külçe veya herhangi formda altın ve gümüş — nisabı geçerse ve bir yıl geçerse zekat farzdır. <strong>Not:</strong> Kullanılan takı hakkında mezhepler arasında ihtilaf vardır; Hanefi mezhebine göre kullanılan takılardan da zekat verilir.</p>

<h3>2. Nakit Para ve Banka Hesapları</h3>
<p>Türk Lirası, döviz veya herhangi bir para birimi cinsinden nakit, banka hesapları, vadesiz mevduat — hepsi nisabı geçerse zekata tabidir.</p>

<h3>3. Ticari Mallar</h3>
<p>Satılmak amacıyla alınmış her türlülük mal (gıda, tekstil, elektronik vb.) ticari mal sayılır. Bunların nisabı, ticari değerleri üzerinden hesaplanır.</p>

<h3>4. Hayvanlar (Enam)</h3>
<p>Deve, sığır, koyun/keçi gibi belirli hayvanlardan, belirli sayılarda zekat verilir. Bu konu ayrı bir detay gerektirir.</p>

<h3>5. Tarımsal Ürünler</h3>
<p>Buğday, arz, kuru üzüm, hurma gibi belirli ürünlerden hasat anında zekat verilir. Nisab: <strong>653 kg</strong> (kuru ağırlık).</p>

<h3>6. Hisse Senetleri ve Yatırım Araçları</h3>
<p>Hisse senetleri, <strong>ticari mal</strong> olarak değerlendirilir. Satılmak için tutulan hisselerin piyasa değerinden zekat verilir. Şirket hisselerinin zekatı, şirketin aktiflerine göre de hesaplanabilir (detaylar aşağıda).</p>

<h3>7. Emeklik ve Bireysel Emeklilik (TEB, BES) Hesapları</h3>
<p>Emeklilik hesaplarındaki paralar, erişim durumuna göre zekata tabidir. Hanefi mezhebine göre, paraya ulaşabilme imkânı varsa zekat farzdır.</p>

<h2>Zekat Hesaplama Yöntemleri</h2>

<h3>Altın İçin Zekat Hesaplama</h3>
<p><strong>Formül:</strong> Toplam altın (gram) × Gram altın fiyatı = Toplam değer → Nisabı geçerse × %2,5 = Zekat</p>
<p><strong>Örnek:</strong> 200 gram altınınız var, gram altın 4.000 ₺:</p>
<ul>
  <li>Toplam değer: 200 × 4.000 = 800.000 ₺</li>
  <li>Nisab: 340.000 ₺ (geçti)</li>
  <li>Zekat: 800.000 × 0,025 = <strong>20.000 ₺</strong></li>
</ul>

<h3>Nakit Para İçin Zekat Hesaplama</h3>
<p><strong>Formül:</strong> Toplam nakit − Nisab = Zekat matrahı → × %2,5</p>
<p><strong>Örnek:</strong> Banka hesabınızda 500.000 ₺ var:</p>
<ul>
  <li>Nisab: 340.000 ₺ (geçti)</li>
  <li>Zekat: 500.000 × 0,025 = <strong>12.500 ₺</strong></li>
</ul>

<h3>Hisse Senedi İçin Zekat Hesaplama</h3>
<p>Hisse senetleri, <strong>ticari mal</strong> sayılır. Hesaplama:</p>
<ul>
  <li>Hisse sayısı × Güncel hisse fiyatı = Toplam piyasa değeri</li>
  <li>Nisabı geçerse × %2,5 = Zekat</li>
</ul>
<p><strong>Örnek:</strong> 100 adet hisse, hisse başına 50 ₺:</p>
<ul>
  <li>Toplam değer: 100 × 50 = 5.000 ₺</li>
  <li>Nisab: 340.000 ₺ (geçmedi → zekat yok)</li>
</ul>
<p><strong>Alternatif Yöntem (Şirket bilançosu bazlı):</strong> Bazı alimler, hisse senedi zekatını şirketin nakit aktifleri üzerinden hesaplamayı tercih eder. Bu yöntem daha detaylıdır ve şirketin mali tablolarını gerektirir.</p>

<h3>Döviz Cinsinden Zekat</h3>
<p>Döviz (USD, EUR vb.) nakit olarak değerlendirilir. Hesaplama:</p>
<ul>
  <li>Döviz miktarı × Güncel kuru = TL karşılığı</li>
  <li>Nisabı geçerse × %2,5 = Zekat (TL veya döviz cinsinden)</li>
</ul>

<h2>Zekat Ne Zaman Verilir?</h2>
<p>Zekat, <strong>nisabın üzerinde bir yıl (haul)</strong> geçtikten sonra verilir. Zekat yılının başlangıcı, malın nisabı ilk geçtiği tarihtir. Örneğin, 1 Ocak 2025'te nisabı geçen bir mal için zekat, 1 Ocak 2026'da vadesi gelir.</p>
<p><strong>Önemli:</strong> Zekat yılının sonunda mal miktarı nisabın altına düşse bile, yıl başında nisabı geçmişse zekat yükümlülüğü devam eder.</p>

<h2>Zekat Kimlere Verilir? (Sekiz Sınıf)</h2>
<p>Kur'an-ı Kerim'de (Tevbe, 9/60) zekatın verileceği sekiz sınıf açıkça belirtilmiştir:</p>
<ul>
  <li><strong>Fakirler:</strong> Temel ihtiyaçlarını karşılayamayanlar</li>
  <li><strong>Miskinler:</strong> Biraz geliri olan ama yetersiz olanlar</li>
  <li><strong>Zekat memurları:</strong> Zekatı toplayan ve dağıtan görevliler</li>
  <li><strong>Müellefe-i kulup:</strong> Müslümanlığa yeni giren veya kalpleri İslama ısındırılması gerekenler</li>
  <li><strong>Özgür kılınacak köleler:</strong> (Günümüzde geçerli değil)</li>
  <li><strong>Borçlular:</strong> Borçları yüzünden zor durumda olanlar</li>
  <li><strong>Fi sebîlillah:</strong> Allah yolunda olanlar (gazi, öğrenci, muhacir vb.)</li>
  <li><strong>İbnü's-sabil:</strong> Yolda kalmış, yolunu kaybeden yolcular</li>
</ul>

<h2>Zekat Hesaplamada Sık Yapılan Hatalar</h2>
<ul>
  <li><strong>Nisabı yanlış hesaplamak:</strong> Güncel altın fiyatını kullanmak yerine eski fiyatları kullanmak.</li>
  <li><strong>Haul şartını unutmak:</strong> Malın üzerinden bir yıl geçmeden zekat hesaplamak (tarım ve maden hariç).</li>
  <li><strong>Borçları düşmemek:</strong> Zekat matrahından kısa vadeli borçlar düşülebilir, ancak uzun vadeli borçların tümünü düşmek hakkında ihtilaf vardır.</li>
  <li><strong>Takı zekatını ihmal etmek:</strong> Hanefi mezhebine göre kullanılan altın/gümüş takılardan da zekat verilir.</li>
  <li><strong>Hisse senetlerini hesaba katmamak:</strong> Yatırım hesaplarındaki hisseleri unutmak.</li>
  <li><strong>Zekatı yanlış kişilere vermek:</strong> Zekat, Kur'an'da belirtilen sekiz sınıf dışında kişilere verilemez.</li>
</ul>

<h2>Adwatak Zekat Hesaplama Aracı ile Kolay Hesaplama</h2>
<p><a href="https://adwatak.cloud/tr/tools/zakat-calculator" target="_blank" rel="noopener"><strong>Adwatak zekat hesaplama aracı</strong></a>, zekat hesaplamayı basit ve hızlı hale getiren ücretsiz bir çevrimiçi araçtır. Kayıt gerektirmez, tüm hesaplamalar tarayıcınızda yapılır.</p>

<h3>Nasıl Kullanılır?</h3>
<ul>
  <li><strong>Adım 1:</strong> Altınızın gramını veya nakit paranızı girin.</li>
  <li><strong>Adım 2:</strong> Güncel altın fiyatı otomatik alınır (veya manuel girebilirsiniz).</li>
  <li><strong>Adım 3:</strong> Araç, nisabı kontrol eder ve zekat miktarını anında gösterir.</li>
  <li><strong>Adım 4:</strong> Hisse senetleri ve diğer yatırımlar için ayrı hesaplama seçeneği mevcuttur.</li>
</ul>

<h2>Zekat ve Diğer İslami Araçlar</h2>
<p>Zekat hesaplamanın yanı sıra, İslami yaşam için şu araçları da kullanabilirsiniz:</p>
<ul>
  <li><a href="https://adwatak.cloud/tr/tools/inheritance-calculator" target="_blank" rel="noopener"><strong>İslami Miras Hesaplama</strong></a> — Feraiz kurallarına göre miras paylaşımı</li>
  <li><a href="https://adwatak.cloud/tr/tools/kible-yonu" target="_blank" rel="noopener"><strong>Kıble Yönü</strong></a> — Konumunuza göre kıble yönü bulma</li>
  <li><a href="https://adwatak.cloud/tr/tools/namaz-vakitleri" target="_blank" rel="noopener"><strong>Namaz Vakitleri</strong></a> — Diyanet'e göre namaz vakitleri</li>
  <li><a href="https://adwatak.cloud/tr/tools/hicri-tarih" target="_blank" rel="noopener"><strong>Hicri ↔ Miladi Tarih Çevirici</strong></a> — Tarih dönüşümü</li>
</ul>

<h2>Sıkça Sorulan Sorular (FAQ)</h2>

<h3>1. Zekat hesaplama nasıl yapılır 2026?</h3>
<p>Zekat hesaplamak için önce toplam mal varlığınızı (altın, nakit, hisse, ticari mal) belirleyin. Ardından nisab miktarını (85 gram altının güncel değeri) kontrol edin. Nisabı geçiyorsa, toplam mal varlığının <strong>%2,5'ini</strong> zekat olarak hesaplayın. <a href="https://adwatak.cloud/tr/tools/zakat-calculator" target="_blank" rel="noopener"><strong>Adwatak zekat hesaplama aracı</strong></a> bu işlemi otomatik olarak yapar.</p>

<h3>2. Zekat nisabı 2026 ne kadar?</h3>
<p>2026 yılında zekat nisabı <strong>85 gram altın</strong> veya eş değerinde paradır. Gram altının güncel piyasa fiyatına göre TL karşılığı değişir. Örneğin gram altın 4.000 ₺ ise nisab yaklaşık 340.000 ₺'dir. Kesin miktar için güncel altın fiyatını kontrol edin.</p>

<h3>3. Altın zekatı nasıl hesaplanır?</h3>
<p>Altın zekatı hesaplamak için toplam altınızın gramını güncel gram altın fiyatıyla çarpın. Elde edilen toplam değer nisabı geçerse, bu değerin <strong>%2,5'ini</strong> zekat olarak verin. Örneğin 200 gram altın × 4.000 ₺ = 800.000 ₺ × 0,025 = 20.000 ₺ zekat. Hanefi mezhebine göre kullanılan altın takılardan da zekat verilir.</p>

<h3>4. Para zekatı nasıl hesaplanır?</h3>
<p>Banka hesaplarındaki nakit para, döviz ve diğer nakit varlıklar toplanır. Toplam nakit değer, 85 gram altının güncel değerine eşit veya fazlaysa, toplam nakit üzerinden <strong>%2,5 zekat</strong> verilir. Örneğin 500.000 ₺ nakit için zekat: 500.000 × 0,025 = 12.500 ₺.</p>

<h3>5. Hisse senedi zekatı nasıl hesaplanır?</h3>
<p>Hisse senetleri ticari mal sayılır. Hesaplama: hisse sayısı × güncel fiyat = piyasa değeri. Bu değer nisabı geçerse × %2,5 = zekat. Alternatif olarak, şirketin nakit aktifleri üzerinden de hesaplanabilir. Uzun vadeli yatırım amaçlı hisseler için farklı görüşler mevcuttur; fakih'e danışmanız önerilir.</p>

<h3>6. Zekat farz mı vacip midir?</h3>
<p>Zekat, İslam'ın beş şartından biri olarak <strong>farzdır</strong>. Farz, Kur'an ve Sünnet ile kesin olarak emredilen, yapmayanın günah işleyeceği ibadettir. Vacip ise biraz daha hafif bir yükümlülük kategorisidir. Zekatın farz oluşu, tüm mezheplerde ittifakla kabul edilmiştir.</p>

<h3>7. Zekat ne zaman verilmelidir?</h3>
<p>Zekat, malın nisabı geçirdiği tarihten itibaren <strong>bir hicri yıl (354 gün)</strong> sonra vadesi gelir. Zekat yılının başlangıcı, malın ilk kez nisabı geçtiği tarihtir. Ramazan'da zekat vermenin fazileti vardır, ancak zekatın Ramazan'da verilmesi şart değildir.</p>

<h3>8. Zekat vermeyen kişi hakkında ne denir?</h3>
<p>Kur'an-ı Kerim'de zekat vermeyenler için ağır uyarılar vardır (Tevbe, 9/34-35). Zekat vermek, İslam'ın beş şartından biri olduğu için, bilerek ve inatla vermek <strong>tekfir (dışlama)</strong> konusu tartışılmıştır. Cumhur ulema, zekatı inkar etmeyip de geri veren kişinin tevbeye davet edilmesini ve zekatın zorla alınmasını uygun görür.</p>

<h3>9. Zekat evli çiftler için ayrı ayrı mı hesaplanır?</h3>
<p>Evet, zekat <strong>bireysel</strong> bir yükümlülüktür. Her bireyin kendi mal varlığı ayrı ayrı hesaplanır. Kocanın mallarından kocası, karısının mallarından karısı zekat hesaplar. Ortak mallar için ise pay oranına göre zekat hesaplanır.</li>

<h3>10. Borcu olan kişi zekat hesaplarken borcu düşebilir mi?</h3>
<p>Bu konuda mezhepler arasında ihtilaf vardır. <strong>Hanefi mezhebi</strong> göre kısa vadeli borçlar (bir yıl içinde ödenecek) zekat matrahından düşülebilir. <strong>Şafii ve Hanbeli mezheplerine</strong> göre ise borçlar zekat matrahından düşülemez. En güvenli yol, borçları düşmeden zekat hesaplamaktır.</p>

<h3>11. Takı olarak kullanılan altın ve gümüşten zekat verilir mi?</h3>
<p>Bu konuda mezhepler arasında ihtilaf vardır. <strong>Hanefi mezhebi</strong>, kadınların kullandığı altın ve gümüş takıların — normal miktarda olsa bile — zekata tabi olduğunu söyler. <strong>Şafii, Maliki ve Hanbeli mezhepleri</strong> ise, normal kullanım miktarındaki takılardan zekat verilmez; ancak fazla miktarda veya yatırım amaçlı takılardan zekat verilir.</p>

<h3>12. Zekatı kime verebilirim?</h3>
<p>Zekat, Kur'an-ı Kerim'de (Tevbe, 9/60) belirtilen <strong>sekiz sınıfa</strong> verilmelidir: fakir, miskin, zekat memuru, müellefe-i kulup, köle (özür), borçlu, fi sebîlillah ve ibnü's-sabil. Zekat, akrabaya verilemez (akraba sadakası ayrıdır), ölülere vasiyet edilemez ve cami, okul gibi yapı inşaatına harcanamaz.</p>

<h3>13. Zekat ile sadaka arasındaki fark nedir?</h3>
<p><strong>Zekat</strong> farzdır, belirli bir oranda (%2,5), belirli mallardan ve belirli kişilere verilir. <strong>Sadaka</strong> ise gönüllüdür, herhangi bir oran ve sınır yoktur, herkese ve her amaçla verilebilir. Zekat, İslam'ın beş şartından biridir; sadaka ise sünnettir (mendup/vacip tartışması vardır).</p>

<h3>14. Emeklilik hesabındaki paradan zekat verilir mi?</h3>
<p>Emeklilik hesaplarındaki paralar, erişim durumuna göre değerlendirilir. <strong>Hanefi mezhebi</strong> göre paraya ulaşabilme imkânı varsa (örneğin BES hesabı) zekat farzdır. Paraya erişim kısıtlıysa (örneğin erken çekilme yasağı olan BES), bazı alimler zekatı tali yükümlülük olarak görür. Detaylı bilgi için fakih'e danışın.</p>

<h3>15. Zekat hesaplayıcısı güvenilir mi?</h3>
<p>Evet, <a href="https://adwatak.cloud/tr/tools/zakat-calculator" target="_blank" rel="noopener"><strong>Adwatak zekat hesaplayıcısı</strong></a> İslam hukukunun temel ilkelerine göre tasarlanmıştır. Ancak karmaşık durumlar (hisse senedi, ticari mal, karışık mallar) için bir fakih'ten danışmanız en doğrusudur. Araç, genel hesaplamalar için güvenilir sonuçlar üretir.</p>

<h3>16. Zekat yılının başlangıcı nasıl belirlenir?</h3>
<p>Zekat yılı, malınızın ilk kez nisabı geçtiği tarihten itibaren başlar. Örneğin, 15 Mart 2025'te nisabı geçen bir mal için zekat, 15 Mart 2026'da vadesi gelir. Her mal için ayrı zekat yılı hesaplanabilir. Toplu hesaplama yapmak isterseniz, en eski nisab geçiş tarihini baz alabilirsiniz.</p>

<p><a href="https://adwatak.cloud/tr/tools/zakat-calculator" target="_blank" rel="noopener"><strong>→ Şimdi Zekat Hesapla (Ücretsiz)</strong></a></p>
`,
  },
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
  <li><strong><a href="https://adwatak.cloud/tr/tools/mortgage-calculator"><strong>Konut Kredisi Hesaplama</strong></a> — Aylık ödeme ve amortisman tablosu</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/loan-calculator"><strong>Kişisel Kredi Hesaplama</strong></a> — Kredi faizi ve toplam geri ödeme</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/emi-calculator"><strong>EMI Hesaplama</strong></a> — Eşit aylık taksit hesaplama</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/compound-interest"><strong>Bileşik Faiz Hesaplama</strong></a> — Yatırım büyüme hesaplamaları</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/vat-calculator"><strong>KDV Hesaplama</strong></a> — KDV ekleme ve çıkarma</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/salary-calculator"><strong>Net Maaş Hesaplama</strong></a> — Kesintiler sonrası net maaş</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/gold-calculator"><strong>Altın Hesaplama</strong></a> — Gram altın değeri ve zekat</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/profit-margin"><strong>Kâr Marjı Hesaplama</strong></a> — Kar marjı ve başabaş noktası</li>
</ul>

<h3>🕌 İslami Araçlar</h3>
<ul>
  <li><strong><a href="https://adwatak.cloud/tr/tools/inheritance-calculator"><strong>İslami Miras Hesaplama</strong></a> — Feraiz kurallarına göre miras paylaşımı</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/zakat-calculator"><strong>Zekat Hesaplama</strong></a> — Para, altın ve hisseler için zekat</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/qibla-direction"><strong>Kıble Yönü</strong></a> — Konumunuza göre kıble yönü</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/prayer-times"><strong>Namaz Vakitleri</strong></a> — Konumunuza göre namaz vakitleri</li>
  <li><strong><a href="https://adwatak.cloud/tr/tools/hijri-converter"><strong>Hicri ↔ Miladi Çevirici</strong></a> — Tarih dönüşümü</li>
</ul>

<h3>📝 Metin Araçları</h3>
<ul>
  <li><a href="https://adwatak.cloud/tr/tools/word-counter">Kelime ve Karakter Sayacı</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/text-case">Metin Büyük/Küçük Harf Dönüştürücü</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/number-to-words">Sayıyı Yazıya Çevirme</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/text-cleaner">Metin Temizleyici</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/text-compare">Metin Karşılaştırma</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/ai-content-detector">Yapay Zeka İçerik Dedektörü</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/grammar-checker">Dil Bilgisi Denetleyici</a></li>
</ul>

<h3>📄 PDF Araçları</h3>
<ul>
  <li><a href="https://adwatak.cloud/tr/tools/pdf-merger">PDF Birleştirme</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/pdf-splitter">PDF Ayırma</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/pdf-compressor">PDF Sıkıştırma</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/pdf-to-word">PDF'den Word'e Dönüştürme</a></li>
</ul>

<h3>⚡ Oluşturucular</h3>
<ul>
  <li><a href="https://adwatak.cloud/tr/tools/qr-generator">QR Kod Oluşturucu</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/barcode-generator">Barkod Oluşturucu</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/password-generator">Şifre Oluşturucu</a></li>
  <li><a href="https://adwatak.cloud/tr/tools/invoice-generator">Fatura Oluşturucu</a></li>
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
  {
    slug: "kdv-hesaplama-2026-turkiye-guncel-oranlar",
    title: "KDV Hesaplama 2026 — Türkiye'deki Güncel Oranlar ve Adım Adım Rehber",
    excerpt:
      "KDV hesaplama nasıl yapılır 2026? Türkiye'de güncel KDV oranları (%1, %10, %20), KDV ekleme ve çıkarma formülleri, hangi ürünlerde hangi oran uygulanır ve Adwatak ücretsiz KDV hesaplama aracı ile pratik çözümler.",
    date: "2026-06-04",
    category: "Finans",
    readTime: "9 dakika okuma",
    keywords: [
      "KDV hesaplama 2026",
      "KDV oranları Türkiye",
      "KDV ekleme formülü",
      "KDV çıkarma nasıl yapılır",
      "katma değer hesaplama",
      "hangi üründe KDV oranı",
      "KDV matrahı hesaplama",
      "ücretsiz KDV hesaplama aracı",
      "KDV türleri 2026",
      "KDV beyannamesi nasıl hesaplanır",
      "KDV indirimi ne demek",
      "KDV hesaplama örnekleri",
    ],
    content: `
<h2>KDV Hesaplama 2026 — Türkiye'deki Güncel Oranlar ve Adım Adım Rehber</h2>
<p><strong>Katma Değer Vergisi (KDV)</strong>, Türkiye'de tüketim vergilerinin başında gelen ve neredeyse her mal ile hizmete uygulanan dolaylı bir vergidir. 2026 yılında KDV hesaplamak için bilmeniz gereken şeyler basittir: <strong>ürün/hizmet fiyatı × KDV oranı = KDV tutarı</strong>. Ancak hangi oranın neye uygulandığı, KDV'li fiyattan KDV'siz fiyatı çıkarmak ve özel durumlar (tevkifat, istisna, indirim) biraz daha detay gerektirir.</p>
<p>Bu rehberde, 2026 yılında geçerli <strong>KDV oranları</strong>, KDV ekleme ve çıkarma formülleri, hangi ürün ve hizmetlerde hangi oranın uygulandığı ve <a href="https://adwatak.cloud/tr/tools/vat-calculator" target="_blank" rel="noopener"><strong>Adwatak ücretsiz KDV hesaplama aracı</strong></a> ile pratik çözümler bulacaksınız.</p>

<h2>KDV Nedir ve Nasıl Çalışır?</h2>
<p>KDV (Katma Değer Vergisi), bir malın veya hizmetin üretiminden satışına kadar her aşamada oluşan katma değer üzerinden alınan bir <strong>tüketim vergisidir</strong>. Son tüketici, KDV'yi öder; ancak ara tedarikçiler, ödedikleri KDV'yi indirerek devlete beyan eder. Bu sistem, verginin yalnızca nihai tüketiciye yüklenmesini sağlar.</p>
<p><strong>Örnek:</strong> Bir üretici ham maddeyi 100 ₺ + KDV alır, işleyip 200 ₺ + KDV satar. Üretici, yalnızca katma değer olan 100 ₺ üzerinden KDV'yi beyan eder (aldığı KDV'yi indirir).</p>

<h2>2026 Yılı KDV Oranları — Türkiye'de Güncel Tablosu</h2>
<p>2026 yılında Türkiye'de üç ana KDV oranı uygulanmaktadır:</p>

<h3>%1 KDV Oranı — Temel İhtiyaçlar</h3>
<p>%1 KDV, temel tüketim maddelerine uygulanır. Bu oran, vatandaşların günlük ihtiyaçlarını ucuz tutmak amacıyla belirlenmiştir:</p>
<ul>
  <li><strong>Temel gıda maddeleri:</strong> Ekmek, makarna, pirinç, bulgur, mercimek, nohut, fasulye</li>
  <li><strong>Bebek ürünleri:</strong> Bebek maması, bebek bezi, bebek gıdaları</li>
  <li><strong>Tıbbi cihazlar:</strong> Reçeteyle satılan bazı tıbbi cihazlar ve protezler</li>
  <li><strong>Kırtasiye ürünleri:</strong> Defter, kalem, kitap (eğitim amaçlı)</li>
</ul>

<h3>%10 KDV Oranı — Genel Tüketim</h3>
<p>%10 KDV, geniş bir ürün ve hizmet yelpazesine uygulanır:</p>
<ul>
  <li><strong>Gıda maddeleri:</strong> Peynir, zeytin, reçel, bal, çay, kahve, çikolata, dondurma</li>
  <li><strong>Konut:</strong> 1.500 m²'ye kadar konut satışları (2024'ten itibaren %10'a çıkarılmıştır)</li>
  <li><strong>Restoran ve catering:</strong> Yiyecek-içecek hizmetleri</li>
  <li><strong>Ulaştırma:</strong> Yolcu taşımacılığı (hava, kara, deniz)</li>
  <li><strong>Telekomünikasyon:</strong> Mobil ve sabit hat, internet hizmetleri</li>
  <li><strong>Eğlence:</strong> Sinema, tiyatro, konser biletleri</li>
  <li><strong>Mobilya ve ev eşyaları</li>
  <li><strong>Tarımsal maddeler:</strong> Tohum, fide, gübre (bazıları)</li>
</ul>

<h3>%20 KDV Oranı — Genel Oran</h3>
<p>%20 KDV, Türkiye'de <strong>varsayılan (genel) KDV oranıdır</strong>. Özel bir düzenleme olmayan tüm mal ve hizmetler bu orana tabidir:</p>
<ul>
  <li><strong>Elektronik ürünler:</strong> Telefon, bilgisayar, televizyon, tablet</li>
  <li><strong>Giyim ve tekstil:</strong> Kıyafet, ayakkabı, çanta</li>
  <li><strong>Kozmetik ve bakım:</strong> Parfüm, makyaj, saç bakım ürünleri</li>
  <li><strong>Otomotiv:</strong> Otomobil, motosiklet, yedek parça</li>
  <li><strong>Lüks ürünler:</strong> Takı, saat, aksesuar</li>
  <li><strong>İnşaat ve yapı malzemeleri</li>
  <li><strong>Profesyonel hizmetler:</strong> Danışmanlık, hukuk, muhasebe</li>
  <li><strong>Büyük konutlar:</strong> 1.500 m² üzeri konut satışları</li>
</ul>

<h2>KDV Hesaplama Formülleri</h2>

<h3>KDV Eklemek (KDV'li Fiyatı Bulmak)</h3>
<p>Bir ürünün KDV'siz fiyatını biliyorsanız, KDV'li fiyatı şu formülle bulursunuz:</p>
<p><strong>KDV'li Fiyat = KDV'siz Fiyat × (1 + KDV Oranı)</strong></p>
<p><strong>Örnek:</strong> 1.000 ₺'lik bir ürüne %20 KDV ekleyelim:</p>
<ul>
  <li>KDV'li Fiyat = 1.000 × 1,20 = <strong>1.200 ₺</strong></li>
  <li>KDV Tutarı = 1.200 − 1.000 = <strong>200 ₺</strong></li>
</ul>

<h3>KDV Çıkarma (KDV'siz Fiyatı Bulmak)</h3>
<p>Bir ürünün KDV'li fiyatını biliyorsanız, KDV'siz fiyatı şu formülle bulursunuz:</p>
<p><strong>KDV'siz Fiyat = KDV'li Fiyat ÷ (1 + KDV Oranı)</strong></p>
<p><strong>Örnek:</strong> 1.200 ₺ KDV'li fiyatı olan bir ürünün KDV'siz fiyatı (%20 KDV):</p>
<ul>
  <li>KDV'siz Fiyat = 1.200 ÷ 1,20 = <strong>1.000 ₺</strong></li>
  <li>KDV Tutarı = 1.200 − 1.000 = <strong>200 ₺</strong></li>
</ul>

<h3>KDV Tutarını Doğrudan Hesaplama</h3>
<p><strong>KDV Tutarı = KDV'siz Fiyat × KDV Oranı</strong></p>
<p><strong>Örnek:</strong> 5.000 ₺'lik bir hizmete %10 KDV:</p>
<ul>
  <li>KDV Tutarı = 5.000 × 0,10 = <strong>500 ₺</strong></li>
  <li>KDV'li Fiyat = 5.000 + 500 = <strong>5.500 ₺</strong></li>
</ul>

<h2>KDV Hesaplama Örnek Tablosu</h2>
<p>Farklı fiyat ve oranlarda KDV hesaplama örnekleri:</p>
<ul>
  <li><strong>500 ₺ × %1 KDV:</strong> KDV = 5 ₺ → KDV'li = 505 ₺</li>
  <li><strong>1.000 ₺ × %10 KDV:</strong> KDV = 100 ₺ → KDV'li = 1.100 ₺</li>
  <li><strong>2.500 ₺ × %20 KDV:</strong> KDV = 500 ₺ → KDV'li = 3.000 ₺</li>
  <li><strong>10.000 ₺ × %20 KDV:</strong> KDV = 2.000 ₺ → KDV'li = 12.000 ₺</li>
  <li><strong>50.000 ₺ × %10 KDV:</strong> KDV = 5.000 ₺ → KDV'li = 55.000 ₺</li>
</ul>
<p><em>Pratik hesaplamalar için <a href="https://adwatak.cloud/tr/tools/vat-calculator" target="_blank" rel="noopener"><strong>Adwatak KDV hesaplama aracını</strong></a> kullanabilirsiniz — anında sonuç verir.</em></p>

<h2>Hangi Üründe Hangi KDV Oranı Uygulanır?</h2>
<p>KDV oranlarının hangi ürünlere uygulandığı, Maliye Bakanlığı'nın yayımladığı KDV Kanunu ve ilgili kararnamelerle belirlenir. İşte en çok merak edilen ürün kategorileri:</p>

<h3>Gıda ve İçecek</h3>
<ul>
  <li><strong>%1:</strong> Ekmek, makarna, pirinç, bulgur, mercimek, nohut, fasulye, bebek maması</li>
  <li><strong>%10:</strong> Peynir, zeytin, reçel, bal, çay, kahve, çikolata, dondurma, su (şişe), meyve suyu</li>
  <li><strong>%20:</strong> Alkolli içecekler, enerji içecekleri, hazır yemekler (restoran)</li>
</ul>

<h3>Konut ve Emlak</h3>
<ul>
  <li><strong>%1:</strong> — (2024'ten itibaren kaldırılmıştır)</li>
  <li><strong>%10:</strong> 1.500 m²'ye kadar konut satışları</li>
  <li><strong>%20:</strong> 1.500 m² üzeri konutlar, lüks konut projeleri</li>
</ul>

<h3>Elektronik ve Teknoloji</h3>
<ul>
  <li><strong>%20:</strong> Akıllı telefon, bilgisayar, tablet, televizyon, kulaklık, oyun konsolu</li>
  <li><strong>%20:</strong> Yazılım lisansları, dijital hizmetler</li>
</ul>

<h3>Giyim ve Tekstil</h3>
<ul>
  <li><strong>%20:</strong> Tüm giyim ürünleri, ayakkabı, çanta, takı</li>
  <li><strong>%10:</strong> Çocuk kıyafetleri (bazı kararnamelere göre)</li>
</ul>

<h3>Sağlık ve Kozmetik</h3>
<ul>
  <li><strong>%1:</strong> Reçeteyle satılan ilaçlar (bazıları), tıbbi cihazlar</li>
  <li><strong>%10:</strong> Reçetesiz ilaçlar, sağlık ürünleri</li>
  <li><strong>%20:</strong> Kozmetik ürünler, bakım ürünleri, estetik ürünler</li>
</ul>

<h2>KDV Tevkifatı Nedir?</h2>
<p><strong>KDV Tevkifatı</strong>, belirli işlemlerde KDV yükümlülüğünün alıcı tarafından üstlenilmesidir. Yani satıcı yerine alıcı, KDV'yi doğrudan devlete öder. Bu sistem, özellikle büyük firmalardan hizmet alan küçük işletmeler için geçerlidir.</p>
<p><strong>Tevkifat oranları:</strong></p>
<ul>
  <li><strong>%90 tevkifat:</strong> Bazı hizmetlerde (temizlik, güvenlik vb.)</li>
  <li><strong>%50 tevkikat:</strong> Genel hizmet alımlarında</li>
  <li><strong>%30 tevkikat:</strong> Belirli inşaat ve yapı işlerinde</li>
</ul>
<p>Tevkifat uygulanan işlemlerde, fatura üzerinde KDV oranı %20 görünse bile, alıcı yalnızca tevkifat oranındaki KDV'yi kesip devlete öder.</p>

<h2>KDV İstisnaları — KDV Uygulanmayan İşlemler</h2>
<p>Bazı mal ve hizmetler KDV'den <strong>istisna</strong> kapsamındadır (KDV uygulanmaz):</p>
<ul>
  <li><strong>Sağlık hizmetleri:</strong> Devlet ve özel hastaneler, diş poliklinikleri (belirli koşullarla)</li>
  <li><strong>Eğitim hizmetleri:</strong> Devlet okulları, üniversiteler, kurslar (MEB onaylı)</li>
  <li><strong>Finansal hizmetler:</strong> Banka faizleri, sigorta primleri</li>
  <li><strong>Posta ve iletişim:</strong> Bazı posta hizmetleri</li>
  <li><strong>İhraç ve serbest bölge:</strong> İhraç edilen mal ve hizmetler</li>
  <li><strong>Deniz ve hava taşımacılığı:</strong> Uluslararası yolcu taşımacılığı</li>
</ul>

<h2>Adwatak KDV Hesaplama Aracı ile Kolay Hesaplama</h2>
<p><a href="https://adwatak.cloud/tr/tools/vat-calculator" target="_blank" rel="noopener"><strong>Adwatak KDV hesaplama aracı</strong></a>, KDV hesaplamayı basit ve hızlı hale getiren ücretsiz bir çevrimiçi araçtır. Kayıt gerektirmez ve tüm hesaplamalar tarayıcınızda yapılır.</p>

<h3>Nasıl Kullanılır?</h3>
<ul>
  <li><strong>Adım 1:</strong> Fiyat tutarını girin (KDV'siz veya KDV'li).</li>
  <li><strong>Adım 2:</strong> KDV oranını seçin (%1, %10 veya %20).</li>
  <li><strong>Adım 3:</strong> Araç, KDV tutarını ve KDV'li fiyatı anında gösterir.</li>
  <li><strong>Adım 4:</strong> KDV çıkarma işlemi için ters seçeneği kullanın.</li>
</ul>

<h2>KDV Hesaplamada Sık Yapılan Hatalar</h2>
<ul>
  <li><strong>Yanlış oran seçimi:</strong> %1, %10 veya %20 oranlarından yanlışını kullanmak. Örneğin, elektronik üründe %10 yerine %20 kullanılmalıdır.</li>
  <li><strong>KDV çıkarma hatası:</strong> KDV'li fiyattan KDV çıkarırken, doğrudan fiyat × oran yerine fiyat ÷ (1+oran) formülü kullanılmalıdır. 1.200 ₺ × %20 = 240 ₺ çıkar, ama gerçek KDV = 200 ₺'dir.</li>
  <li><strong>Tevkifat ile karıştırma:</strong> Tevkifat uygulanan faturalarda KDV hesabı farklıdır.</li>
  <li><strong>İstisna kapsamını bilmemek:</strong> KDV'siz olması gereken hizmetlere KDV hesaplamak.</li>
  <li><strong>KDV matrahını yanlış belirlemek:</strong> İndirimler ve ek maliyetler KDV matrahını etkiler.</li>
</ul>

<h2>Diğer Finansal Araçlar</h2>
<p>KDV hesaplamanın yanı sıra Adwatak'ta şu finansal araçları da ücretsiz kullanabilirsiniz:</p>
<ul>
  <li><a href="https://adwatak.cloud/tr/tools/mortgage-calculator" target="_blank" rel="noopener"><strong>Konut Kredisi Hesaplama</strong></a> — Aylık taksit ve amortisman tablosu</li>
  <li><a href="https://adwatak.cloud/tr/tools/loan-calculator" target="_blank" rel="noopener"><strong>Kişisel Kredi Hesaplama</strong></a> — Kredi faizi ve toplam geri ödeme</li>
  <li><a href="https://adwatak.cloud/tr/tools/salary-calculator" target="_blank" rel="noopener"><strong>Net Maaş Hesaplama</strong></a> — Brütten nete maaş hesaplama</li>
  <li><a href="https://adwatak.cloud/tr/tools/profit-margin" target="_blank" rel="noopener"><strong>Kâr Marjı Hesaplama</strong></a> — İşletme kârlılığı analizi</li>
  <li><a href="https://adwatak.cloud/tr/tools/compound-interest" target="_blank" rel="noopener"><strong>Bileşik Faiz Hesaplama</strong></a> — Yatırım büyüme hesaplamaları</li>
</ul>

<h2>Sıkça Sorulan Sorular (FAQ)</h2>

<h3>1. KDV hesaplama nasıl yapılır 2026?</h3>
<p>KDV hesaplamak için iki temel formül vardır. <strong>KDV ekleme:</strong> KDV'siz fiyat × (1 + KDV oranı) = KDV'li fiyat. <strong>KDV çıkarma:</strong> KDV'li fiyat ÷ (1 + KDV oranı) = KDV'siz fiyat. Örneğin, 1.000 ₺'lik bir ürüne %20 KDV eklemek: 1.000 × 1,20 = 1.200 ₺. 1.200 ₺ KDV'li fiyattan KDV çıkarmak: 1.200 ÷ 1,20 = 1.000 ₺. <a href="https://adwatak.cloud/tr/tools/vat-calculator" target="_blank" rel="noopener"><strong>Adwatak KDV hesaplama aracı</strong></a> bu işlemleri otomatik olarak yapar.</p>

<h3>2. Türkiye'de KDV oranları 2026 ne kadar?</h3>
<p>2026 yılında Türkiye'de üç KDV oranı uygulanmaktadır: <strong>%1</strong> (temel gıda, bebek ürünleri), <strong>%10</strong> (gıda, konut, ulaşım, telekomünikasyon) ve <strong>%20</strong> (genel oran — elektronik, giyim, kozmetik, otomotiv vb.). Hangi oranın hangi ürüne uygulandığı KDV Kanunu ve ilgili kararnamelerle belirlenir.</p>

<h3>3. KDV ekleme formülü nedir?</h3>
<p>KDV ekleme formülü: <strong>KDV'li Fiyat = KDV'siz Fiyat × (1 + KDV Oranı)</strong>. Örneğin, 5.000 ₺'lik bir hizmete %10 KDV eklemek: 5.000 × 1,10 = 5.500 ₺. KDV tutarı = 500 ₺. KDV oranı ondalık olarak yazılır: %20 = 0,20, %10 = 0,10, %1 = 0,01.</p>

<h3>4. KDV'li fiyattan KDV'siz fiyat nasıl çıkarılır?</h3>
<p>KDV'li fiyattan KDV'siz fiyat çıkarılırken, <strong>KDV'li Fiyat ÷ (1 + KDV Oranı)</strong> formülü kullanılır. Yanlış yöntem (KDV'li fiyat × KDV oranı) yanlış sonuç verir. Örneğin, 1.200 ₺ KDV'li fiyat, %20 KDV: 1.200 ÷ 1,20 = 1.000 ₺ (doğru). 1.200 × 0,20 = 240 → 1.200 − 240 = 960 ₺ (yanlış!). Doğru KDV tutarı 200 ₺'dir.</p>

<h3>5. Hangi ürünlerde %1 KDV uygulanır?</h3>
<p>%1 KDV, temel ihtiyaç maddelerine uygulanır: ekmek, makarna, pirinç, bulgur, mercimek, nohut, fasulye gibi temel gıdalar; bebek maması ve bebek bezi; bazı tıbbi cihazlar ve eğitim amaçlı kırtasiye ürünleri. Bu oran, vatandaşların temel ihtiyaçlarını ucuz tutmak amacıyla belirlenmiştir.</p>

<h3>6. Konut alımında KDV oranı ne kadar 2026?</h3>
<p>2026 yılında konut alımında KDV oranı konutun büyüklüğüne göre değişir: <strong>1.500 m²'ye kadar konutlarda %10 KDV</strong> uygulanır. <strong>1.500 m² üzeri konutlarda %20 KDV</strong> uygulanır. 2024 yılından itibaren konut KDV oranı %1'den %10'a yükseltilmiştir.</p>

<h3>7. KDV tevkifatı nasıl hesaplanır?</h3>
<p>KDV tevkifatı, alıcının fiyatın KDV'ini doğrudan devlete ödemesidir. Tevkifat oranı, hizmet türüne göre %90, %50 veya %30 olabilir. Örneğin, %50 tevkikat uygulanan 10.000 ₺'lik bir hizmet: KDV = 10.000 × %20 = 2.000 ₺. Alıcı, bu KDV'nin %50'sini (1.000 ₺) kesip devlete öder. Satıcıya 11.000 ₺ ödenir (10.000 + 1.000 KDV).</p>

<h3>8. KDV istisnası nedir, hangi işlemler kapsamdadır?</h3>
<p>KDV istisnası, belirli mal ve hizmetlere KDV uygulanmamasıdır. Sağlık hizmetleri (hastane, diş polikliniği), eğitim hizmetleri (MEB onaylı), finansal hizmetler (banka faizi, sigorta primi), ihraç edilen mal ve hizmetler, uluslararası yolcu taşımacılığı KDV istisnası kapsamındadır.</p>

<h3>9. KDV matrahı nedir ve nasıl belirlenir?</h3>
<p>KDV matrahı, KDV'nin hesaplandığı tutardır. Genellikle malın veya hizmetin satış fiyatıdır. Ancak indirimler, iskonto ve ek maliyetler matrahı etkiler. Örneğin, 1.000 ₺'lik bir ürüne %10 indirim uygulanırsa, KDV matrahı 900 ₺ olur ve KDV = 900 × %20 = 180 ₺ hesaplanır.</p>

<h3>10. Faturada KDV nasıl gösterilir?</h3>
<p>Türkiye'de düzenlenen faturalarda KDV ayrı bir kalım olarak gösterilmelidir. Faturada: <strong>mal/hizmet bedeli (KDV'siz), KDV oranı (%, %10, %20), KDV tutarı</strong> ve <strong>toplam tutar (KDV'li)</strong> ayrı ayrı belirtilir. KDV mükellefleri, aldıkları faturalardaki KDV'yi indirerek beyan ederler.</p>

<h3>11. KDV hesaplayıcı güvenilir mi?</h3>
<p>Evet, <a href="https://adwatak.cloud/tr/tools/vat-calculator" target="_blank" rel="noopener"><strong>Adwatak KDV hesaplayıcısı</strong></a> doğru formülleri kullanır ve güvenilir sonuçlar üretir. Ancak tevkifat, istisna ve özel durumlarda profesyonel muhasebe desteği almanız önerilir. Araç, standart KDV hesaplamaları için idealdir.</p>

<h3>12. KDV oranları ne zaman değişir?</h3>
<p>KDV oranları, <strong>Hazine ve Maliye Bakanlığı</strong> tarafından çıkarılan kararnamelerle değiştirilebilir. Tarihsel olarak kriz dönemlerinde geçici indirimler veya artışlar yapılmıştır. 2026 yılında %1, %10 ve %20 oranları geçerlidir. Güncel oranlar için Maliye Bakanlığı'nın resmi web sitesini takip edebilirsiniz.</p>

<h3>13. İhracatta KDV uygulanır mı?</h3>
<p>Hayır, ihraç edilen mal ve hizmetler <strong>KDV'den istisnadır</strong> (sıfır oranlı). İhracatçı, yurt içinde aldığı mal ve hizmetlerde ödediği KDV'yi iade alabilir. Bu, ihracatı teşvik amacıyla uygulanan bir politikadır.</p>

<h3>14. KDV indirimi ile KDV istisnası arasındaki fark nedir?</h3>
<p><strong>KDV indirimi</strong>, KDV oranının geçici olarak düşürülmesidir (örneğin %20 yerine %10). <strong>KDV istisnası</strong> ise hiç KDV uygulanmamasıdır. İndirimli oranla fatura düzenlenir, istisna ile KDV'siz fatura düzenlenir. Her iki durumda da farklı yasal düzenlemeler geçerlidir.</p>

<h3>15. Adwatak KDV hesaplama aracı ücretsiz mi?</h3>
<p>Evet, Adwatak'ın tüm araçları — KDV hesaplama dahil — <strong>%100 ücretsizdir</strong>. Kayıt gerektirmez, herhangi bir ücret veya abonelik yoktur. Tarayıcınızda anında kullanabilirsiniz. Tüm hesaplar cihazınızda yapılır, verileriniz sunucuya gönderilmez.</p>

<p><a href="https://adwatak.cloud/tr/tools/vat-calculator" target="_blank" rel="noopener"><strong>→ Şimdi KDV Hesapla (Ücretsiz)</strong></a></p>
`,
  },
  {
    slug: "namaz-vakitleri-hesaplama-2026-diyanet",
    title: "Namaz Vakitleri Nasıl Hesaplanır 2026 — Diyanet'e Göre Konum Bazlı Rehber",
    excerpt:
      "Namaz vakitleri 2026: Güneşin konumuna göre namaz saatleri nasıl hesaplanır? Diyanet İşleri Başkanlığı'nın kullandığı formüller, şafak, öğle, ikindi, akşam, yatsı vakitleri ve Adwatak namaz vakitleri aracı ile anında öğrenin.",
    date: "2026-06-04",
    category: "İslami Araçlar",
    readTime: "11 dakika okuma",
    keywords: [
      "namaz vakitleri hesaplama",
      "namaz saatleri 2026",
      "diyanet namaz vakitleri",
      "namaz vakitleri nasıl hesaplanır",
      "ımsak vakti ne zaman",
      "öğle namazı saati hesaplama",
      "ikindi vakti hesaplama",
      "akşam namazı saati",
      "yatsı vakti ne zaman",
      "ücretsiz namaz vakitleri aracı",
      "ebced hesaplama",
      "kıble yönü bulma",
      "namaz vakitleri formülü",
      "namaz vakitleri hesaplama yöntemi",
    ],
    content: `
<h2>Namaz Vakitleri Nasıl Hesaplanır 2026 — Diyanet'e Göre Konum Bazlı Rehber</h2>
<p><strong>Namaz vakitleri</strong>, güneşin dünya üzerindeki konumuna göre belirlenen ve Müslümanların beş vakit namazını kıldığı zaman dilimleridir. 2026 yılında namaz vakitleri hesaplamak için <strong>enlem, boylam, tarih ve güneşin ufkun altındaki açısı</strong> gibi veriler kullanılır. Diyanet İşleri Başkanlığı, bu hesaplamaları <strong>enlem ve boylam bazlı astronomik formüller</strong> ile yapar ve günlük namaz saatlerini her ilçe için ayrı ayrı yayınlar.</p>
<p>Bu rehberde, namaz vakitlerinin hesaplama mantığını, hangi açıların kullanıldığını, Diyanet'in takip ettiği yöntemi ve <a href="https://adwatak.cloud/tr/tools/namaz-vakitleri" target="_blank" rel="noopener"><strong>Adwatak namaz vakitleri aracı</strong></a> ile anında nasıl öğrenebileceğinizi detaylıca bulacaksınız. Ayrıca <a href="https://adwatak.cloud/tr/tools/kible-yonu" target="_blank" rel="noopener"><strong>kıble yönü bulma</strong></a> aracımızla namaz için yönünüzü de belirleyebilirsiniz.</p>

<h2>Namaz Vakitleri Nereden Belli Olur? Temel Bilimsel Yaklaşım</h2>
<p>Namaz vakitleri, <strong>Kur'an-ı Kerim ve hadislerde</strong> güneşin hareketlerine ve gölgelere işaret edilerek tanımlanmıştır. Modern dünyada bu tanımlar, astronomik hesaplamalara dönüştürülmüştür. Her bir namaz vakti, güneşin ufkun (ufuk çizgisinin) altında bulunduğu belirli bir <strong>açısal derinlik</strong> ile tanımlanır.</p>
<p>Örneğin:</p>
<ul>
  <li><strong>İmsak (Şafak):</strong> Güneş ufkun altında 18° — bu andan itibaren sabah namazının zamanı başlar.</li>
  <li><strong>Güneş (Tulu):</strong> Güneş diskinin ufuk çizgisinden gözükmesi.</li>
  <li><strong>Öğle:</strong> Gölgenin kısalma noktasından sonra (güneş zirveden geçtikten sonra).</li>
  <li><strong>İkindi:</strong> Herhangi bir nesnenin gölgesi, kendisinin uzunluğunun 2 katına ulaştığı an (Hanefi mezhebinde).</li>
  <li><strong>Akşam:</strong> Güneş diskinin tamamen ufuk altına girmesi.</li>
  <li><strong>Yatsı:</strong> Alacakaranlığın (şafak) tamamen kaybolması — güneş ufkun altında 17°-18°.</li>
</ul>

<h2>Diyanet İşleri Başkanlığı'nın Kullandığı Hesaplama Yöntemi</h2>
<p>Diyanet İşleri Başkanlığı, namaz vakitlerini hesaplarken <strong>Uluslararası İslami Fıkh Akademisi (IIFA)</strong> tarafından belirlenen açıları temel alır. Bu açılar, coğrafi konuma göre değişiklik gösterebilir:</p>

<h3>Kullanılan Standart Açılar</h3>
<ul>
  <li><strong>İmsak:</strong> Güneş ufkun altında <strong>18°</strong> (bazı bölgelerde 18.5°)</li>
  <li><strong>Güneş Doğuşu:</strong> Ufuk çizgisi (0°), güneş diskinin yarı çapı (0.25°) ve atmosferik kırılma (0.583°) dahil ≈ <strong>-0.833°</strong></li>
  <li><strong>Öğle:</strong> Güneşin gökyüzündeki en yüksek noktasından (zevali) sonra</li>
  <li><strong>İkindi:</strong> Nesne gölgesi = nesne boyu × 2 + zeval gölgesi (Hanefi) veya × 1 (Şafi)</li>
  <li><strong>Güneş Batışı:</strong> Güneş diskinin tamamen ufuk altına girmesi ≈ <strong>-0.833°</strong></li>
  <li><strong>Yatsı:</strong> Güneş ufkun altında <strong>17°</strong></li>
</ul>

<h3>Önemli Düzeltme Parametreleri</h3>
<p>Hesaplamalarda aşağıdaki faktörler de dikkate alınır:</p>
<ul>
  <li><strong>Atmosferik kırılma:</strong> Işığın atmosferde kırılması, güneşin aslında ufuk altında olduğu halde görünmesini sağlar. Bu etki yaklaşık <strong>0.583°</strong> dir.</li>
  <li><strong>Güneş diski yarıçapı:</strong> Güneşin görsel çapının yarısı ≈ <strong>0.25°</strong>.</li>
  <li><strong>Deniz seviyesi yüksekliği:</strong> Yüksek rakımlı bölgelerde ufuk açısı değişir.</li>
  <li><strong>Standart saat farkı (EoT):</strong> Dünya yörüngesinin eliptik olmasından kaynaklı zaman düzeltmesi.</li>
</ul>

<h2>Şehir Bazlı Namaz Vakitleri Nasıl Değişir?</h2>
<p>Türkiye, <strong>39°-42° kuzey enlemi</strong> ve <strong>26°-45° doğu boylamı</strong> arasında yer alır. Bu geniş coğrafi yelpaze, şehirler arasında namaz vakitlerinde önemli farklar yaratır:</p>

<h3>Doğu-Batı Farkı</h3>
<p>Türkiye'nin doğusundaki <strong>Kars</strong> ile batısındaki <strong>İzmir</strong> arasında güneş doğumu ve batımı saatleri arasında <strong>yaklaşık 1 saat 20 dakika</strong> fark vardır. Bu, tüm namaz vakitlerini etkiler.</p>

<h3>Kuzey-Güney Farkı</h3>
<p><strong>Trabzon</strong> ile <strong>Antalya</strong> arasında ise yaz ve kış süreleri farklıdır. Yazın kuzeyde gündüz daha uzundur, güneyde ise gece daha kısadır. Bu durum, özellikle <strong>imsak ve yatsı vakitlerini</strong> doğrudan etkiler.</p>

<h3>Yüksek Rakım Etkisi</h3>
<p><strong>Erzurum, Kars, Ağrı</strong> gibi yüksek rakımlı şehirlerde ufuk çizgisi daha alçaktır. Bu da güneşin daha erken baktığı ve daha geç doğduğu anlamına gelir. Diyanet, her ilçe için ayrı ayrı hesaplama yapar.</p>

<h2>2026 Yılında Namaz Vakitlerinin Mevsimlik Değişimi</h2>
<p>Namaz vakitleri, yıl boyunca <strong>Dünya'nın Güneş etrafındaki yörüngesi ve 23.5° eğik ekseni</strong> nedeniyle sürekli değişir:</p>

<h3>Yaz Ayları (Haziran-Ağustos)</h3>
<ul>
  <li>Gündüz süresi en uzun olduğu için <strong>öğle ve ikindi vakitleri</strong> kayar.</li>
  <li><strong>İmsak vakti</strong> çok erken başlar (saat 02:30-03:30 arası).</li>
  <li><strong>Yatsı vakti</strong> geç başlar (saat 21:00-22:00 arası).</li>
  <li>İkindi ile akşam arasındaki süre kısalır.</li>
</ul>

<h3>Kış Aralık-Şubat)</h3>
<ul>
  <li>Gündüz süresi en kısa olduğu için <strong>öğle ve ikindi vakitleri</strong> erken kayar.</li>
  <li><strong>İmsak vakti</strong> daha geç başlar (saat 05:00-06:00 arası).</li>
  <li><strong>Yatsı vakti</strong> erken başlar (saat 17:00-18:00 arası).</li>
  <li>İkindi ile akşam arasındaki süre uzar.</li>
</ul>

<h3>İlk Bahar ve Son Bahar</h3>
<ul>
  <li>Nisan-Mayıs ve Eylül-Ekim aylarında vakitler dengelenir.</li>
  <li>Özellikle <strong>Ramazan ayı</strong> bu dönemde geldiğinde imsak ve iftar vakitleri dengeli olur.</li>
</ul>

<h2>Namaz Vakitlerinde Kullanılan Temel Formüller</h2>
<p>Astronomik hesaplamalar, birkaç temel adımdan oluşur:</p>

<h3>Adım 1: Güneş Deklinasyonu (δ) Hesaplama</h3>
<p>Güneşin ekvatorun kuzey veya güneyindeki açısal konumudur:</p>
<p><strong>δ ≈ 23.45° × sin[360/365 × (284 + N)]</strong></p>
<p>Burada N, yılın gün numarasıdır (1 Ocak = 1, 31 Aralık = 365).</p>

<h3>Adım 2: Saat Açısı (H) Hesaplama</h3>
<p>Güneşin belirli bir açıda bulunduğu saat:</p>
<p><strong>cos(H) = [cos(90.833°) - sin(φ) × sin(δ)] / [cos(φ) × cos(δ)]</strong></p>
<p>Burada φ = enlem, δ = deklinasyon, 90.833° = ufuk düzeltmeli açı.</p>

<h3>Adım 3: Öğle Vakti (Güneş Zirvesi)</h3>
<p><strong>Öğle = 12:00 + (boylam / 15) - EoT</strong></p>
<p>Boylam: Doğu boylamı pozitif, batı negatif. EoT = Equation of Time (zaman denklemi).</p>

<h3>Adım 4: Diğer Vakitler</h3>
<p>Diğer namaz vakitleri, öğle vakti baz alınarak ilgili açılar hesaplanıp eklenerek veya çıkarılarak bulunur.</p>

<h2>Ücretsiz Namaz Vakitleri Aracı ile Anında Hesaplama</h2>
<p>Bu karmaşık hesaplamaları elle yapmak zorunda değilsiniz. <a href="https://adwatak.cloud/tr/tools/namaz-vakitleri" target="_blank" rel="noopener"><strong>Adwatak namaz vakitleri aracı</strong></a> şunları yapar:</p>
<ul>
  <li><strong>Konum bazlı:</strong> GPS veya şehir seçimi ile otomatik enlem/boylam belirler.</li>
  <li><strong>Günlük güncel:</strong> Her gün namaz vakitlerini otomatik günceller.</li>
  <li><strong>Diyanet uyumlu:</strong> Diyanet İşleri Başkanlığı ile uyumlu hesaplama yapar.</li>
  <li><strong>5 vakit + imsak:</strong> İmsak, güneş, öğle, ikindi, akşam, yatsı vakitlerini gösterir.</li>
  <li><strong>Ücretsiz:</strong> Kayıt gerektirmez, tamamen ücretsizdir.</li>
</ul>

<p>Ayrıca <a href="https://adwatak.cloud/tr/tools/hicri-tarih" target="_blank" rel="noopener"><strong>Hicri-Miladi tarih çevirici</strong></a> aracımızla bugünün hicri tarihini öğrenebilir, özel günler için namaz vakitlerini planlayabilirsiniz.</p>

<h2>Namaz Vakitlerinde Sıkça Karşılaşılan Karışıklıklar</h2>

<h3>İmsak Vakti Erken mi, Geç mi?</h3>
<p>İmsak vakti konusunda farklı görüşler vardır. Bazı alimler <strong>18° açıyı</strong> kabul ederken, bazıları <strong>15° veya 17°</strong> kullanır. Diyanet, 18° açısını temel alır. Ramazan ayında oruç başlangıcı için imsak vakti kullanılır; bu nedenle doğru açı önemlidir.</p>

<h3>İkindi Vakti: Hanefi mi, Şafi mi?</h3>
<p>Hanefi mezhebinde ikindi vakti, nesne gölgesi <strong>kendisinin 2 katı + zeval gölgesi</strong> olduğunda başlar. Şafi mezhebinde ise <strong>1 kat + zeval gölgesi</strong> yeterlidir. Bu, Hanefi'ye göre ikindi vaktinin daha geç başlaması anlamına gelir. Diyanet, genellikle <strong>Şafi mezhebinin</strong> kabul ettiği daha erken ikindi vaktini esas alır.</p>

<h3>Yüksek Enlemlerde (60°+) Hesaplama Sorunu</h3>
<p>Kuzey veya güney yüksek enlemlerde (İskandinavya, İzlanda vb.) yaz aylarında güneş ufuk altında 18°'yi bazen hiç düşümez. Bu durumda <strong>"gümrük yöntemi"</strong> (son gece yarısı ile ilk sabah arasının ortası) veya <strong>"1/7 yöntemi"</i>"</strong> gibi alternatif hesaplamalar kullanılır. Türkiye'de bu sorun yoktur.</p>

<h3>Yaz Saati Uygulaması</h3>
<p>Türkiye, 2016 yılından itibaren yaz saati uygulamasını terk etmiştir. Ancak namaz vakitleri her zaman <strong>yerel saat (UTC+3)</strong> bazından hesaplanır. Uygulama olsaydı, namaz vakitleri 1 saat kaydırılması gerekirdi.</p>

<h2>Namaz Vakitleri ile İlgili Özel Günler</h2>

<h3>Cuma Namazı Vakti</h3>
<p>Cuma namazı, öğle vaktinin başlangıcında kılınır. Cuma günü öğle namazı yerine cuma namazı farzdır. Cuma vaktinin başlangıcı = öğle vaktinin başlangıcıdır.</p>

<h3>Bayram Namazı Vakti</h3>
<p>Bayram namazı, güneş doğduktan yaklaşık <strong>45 dakika-1 saat sonra</strong> kılınır. Bu, güneşin ufkun üzerinde yaklaşık <strong>3 metre (bir mızrak boyu)</strong> yükseldiği zamandır. Diyanet, her yıl baynam namazı saatlerini açıklar.</p>

<h3>Teravih Namazı</h3>
<p>Teravih namazı, <strong>yatsı namazından sonra</strong> kılınır. Ramazan ayında yatsı vaktinin hemen ardından eda edilir. Genellikle yatsı ezanından 30-60 dakika sonra başlar.</p>

<h3>Vitir Namazı</h3>
<p>Vitir namazı da <strong>yatsıdan sonra</strong> kılınır. Ramazan'da teravih ile birlikte, diğer aylarda yatsı sonrası kılınır.</p>

<h2>Diyanet Namaz Vakitleri Takvimi — Nasıl Kullanılır?</h2>
<p>Diyanet İşleri Başkanlığı, her yıl <strong>güncel namaz vakitleri takvimini</strong> web sitesinde ve mobil uygulamalarında yayınlar. Bu takvim:</p>
<ul>
  <li>Her ilçe için ayrı ayrı hazırlanır.</li>
  <li>Günlük namaz saatlerini içerir.</li>
  <li>Hicri ve miladi tarihleri birlikte gösterir.</li>
  <li>Kıble yönü bilgisi de verilir.</li>
</ul>
<p><a href="https://adwatak.cloud/tr/tools/namaz-vakitleri" target="_blank" rel="noopener"><strong>Adwatak namaz vakitleri aracı</strong></a> da aynı verileri kullanarak anında sonuç üretir ve herhangi bir kurulum gerektirmez.</p>

<h2>FAQ — Namaz Vakitleri Hakkında Sıkça Sorulan Sorular</h2>

<h3>1. Namaz vakitleri neden her gün değişir?</h3>
<p>Namaz vakitleri güneşin konumuna göre belirlenir. Dünya'nın Güneş etrafındaki yörüngesi eliptik olduğu ve ekseni 23.5° eğik olduğu için, güneşin doğuş ve batış saatleri her gün biraz farklıdır. Bu da tüm namaz vakitlerini etkiler. Yazın gündüzler uzun, kışın kısalır; bu değişim namaz saatlerini de kaydırır.</p>

<h3>2. Diyanet namaz vakitleri ile Diyanet İşleri dışındaki siteler arasında fark olur mu?</h3>
<p>Evet, küçük farklar olabilir. Bunun nedeni, hesaplamada kullanılan <strong>açı değerlerinin</strong> (imsak için 18° mu 15° mu?) ve <strong>mezhep tercihlerinin</strong> (ikindi için Hanefi mi Şafi mi?) farklı olmasıdır. Diyanet, Şafi mezhebinin ikindi açısını ve 18° şafak açısını kullanır. Farklı kaynaklar farklı açılar kullanabilir.</p>

<h3>3. İmsak vakti ile güneş doğumu arasında ne kadar süre vardır?</h3>
<p>İmsak vakti (güneş ufkun altında 18°) ile güneş doğumu (ufuk çizgisi) arasında genellikle <strong>60-90 dakika</strong> vardır. Bu süre, coğrafi konuma ve mevsime göre değişir. Yaz aylarında bu süre daha uzun, kış aylarında daha kısa olabilir.</p>

<h3>4. Öğle namazı ne zaman kılınır — güneş zirvede mi, yoksa hemen sonra mı?</h3>
<p>Öğle namazı, güneşin gökyüzündeki en yüksek noktasına (zevale) ulaştığı anda başlar. Ancak namazı <strong>zeval anında değil, hemen sonra</strong> kılmanız önerilir. Zeval anında namaz kılmak mekruh sayılmaz ama sünnet vakitlerini kaçırmamak için zeval sonrası tercih edilir.</p>

<h3>5. İkindi vakti Hanefi ve Şafi mezhebi arasında ne kadar fark vardır?</h3>
<p>Hanefi mezhebinde ikindi, nesne gölgesi kendisinin <strong>2 katı + zeval gölgesi</strong> olduğunda başlar. Şafi mezhebinde ise <strong>1 kat + zeval gölgesi</strong> yeterlidir. Bu fark, yaz aylarında <strong>30-50 dakika</strong>, kış aylarında <strong>15-30 dakika</strong> kadar olabilir. Diyanet takvimi genellikle Şafi hesabını kullanır.</p>

<h3>6. Akşam ezanı ile akşam namazı arasında ne kadar beklenecek?</h3>
<p>Akşam namazı, güneş batar batmaz kılınabilir. Beklemeye gerek yoktur. Hatta akşam namazını <strong>en kısa sürede</strong> kılmak sünnet olarak kabul edilir. Ezan okunduğunda hemen namaza niyet edilebilir.</p>

<h3>7. Yatsı vakti ile yatsı namazı arasındaki fark nedir?</h3>
<p>Yatsı vakti, alacakaranlığın (şafak) tamamen kaybolmasıyla başlar. Yatsı namazı ise bu vakit içinde kılınır. Yatsı namazını <strong>vaktin başında</strong> kılmak müstahaptır. Vaktin son üçte birinde kılınması da caizdir, ancak müstahab değildir.</p>

<h3>8. Seyahat halinde namaz vakitleri nasıl hesaplanır?</h3>
<p>Seyahat halinde (yaklaşık <strong>80-90 km</strong> veya daha uzun yolculuk) namaz vakitleri, bulunulan konuma göre belirlenir. Yolculuk sırasında kısa namaz (kasr) uygulanır. Namaz vakitleri, varış noktasının enlem/boylamına göre hesaplanır. <a href="https://adwatak.cloud/tr/tools/namaz-vakitleri" target="_blank" rel="noopener"><strong>Adwatak aracı</strong></a> ile varış şehrinizi seçerek seyahat vakitlerini öğrenebilirsiniz.</p>

<h3>9. Kıble yönü namaz vakitleri ile ilişkili midir?</h3>
<p>Kıble yönü, namaz vakitleriyle doğrudan ilişkili değildir. Ancak namaz kılarken doğru kıbleye yönelmek farzdır. <a href="https://adwatak.cloud/tr/tools/kible-yonu" target="_blank" rel="noopener"><strong>Adwatak kıble yönü aracı</strong></a> ile konumunuza göre kıble yönünü anında bulabilirsiniz. Kıble, Mekke'deki Kâbe'yi işaret eder ve Türkiye'den bakıldığında genellikle <strong>güney-doğu</strong> yönündedir.</p>

<h3>10. Namaz vakitleri hesaplamasında "ebced" sistemi kullanılır mı?</h3>
<p>Hayır, namaz vakitleri <strong>astronomik hesaplamalarla</strong> belirlenir. Ebced sistemi, Arap harflerine sayısal değer atayan geleneksel bir hesaplama yöntemidir ve tarih hesaplamalarında kullanılır. Namaz vakitleri için modern astronomik formüller kullanılır. Ancak <a href="https://adwatak.cloud/tr/tools/hicri-tarih" target="_blank" rel="noopener"><strong>Hicri-Miladi tarih çevirici</strong></a> aracımızla hicri takvim hesaplamaları yapabilirsiniz.</p>

<h3>11. Ramazan ayında imsak vakti neden önemli?</h3>
<p>Ramazan ayında imsak vakti, orucun başlangıcıdır. İmsak vaktinden itibaren yemek, içmek ve cinsel ilişki oruç bozucu sayılır. Bu nedenle <strong>doğru imsak vaktini</strong> bilmek çok önemlidir. Diyanet'in belirlediği imsak vaktini kullanmanız tavsiye edilir. <a href="https://adwatak.cloud/tr/tools/namaz-vakitleri" target="_blank" rel="noopener"><strong>Adwatak namaz vakitleri aracı</strong></a> ile imsak saatini anında öğrenebilirsiniz.</p>

<h3>12. Namaz vakitleri uygulaması veya takvimi hangisi daha doğru?</h3>
<p>Hem Diyanet'in resmi takvimi hem de güvenilir uygulamalar doğru sonuç verir. Önemli olan, uygulamanın <strong>güncel verileri</strong> kullanması ve <strong>doğru konum bilgisini</i> almasıdır. <a href="https://adwatak.cloud/tr/tools/namaz-vakitleri" target="_blank" rel="noopener"><strong>Adwatak namaz vakitleri aracı</strong></a>, Diyanet ile uyumlu hesaplama yapar ve her gün otomatik güncellenir. Kayıt gerektirmez, tamamen ücretsizdir.</p>

<h3>13. Güney Yarımküre'de namaz vakitleri nasıl hesaplanır?</h3>
<p>Güney Yarımküre'de (Avustralya, Güney Afrika, Arjantin vb.) güneşin hareketi kuzeye göre ters yöndedir. Ancak hesaplama formülleri aynıdır; sadece <strong>enlem değeri negatif</strong> alınır. Yaz-kış dönemleri ters olur ama namaz vakitleri yine güneş konumuna göre belirlenir. Türkiye'deki hesaplamalar ile aynı prensipler geçerlidir.</p>

<h3>14. Namaz vakitleri ile ilgili Diyanet'ten resmi bilgi alabilir miyim?</h3>
<p>Evet, Diyanet İşleri Başkanlığı'nın resmi web sitesi <strong>diyanet.gov.tr</strong> adresinden tüm ilçelerin namaz vakitlerine ulaşabilirsiniz. Ayrıca Diyanet'in mobil uygulamaları da mevcuttur. <a href="https://adwatak.cloud/tr/tools/namaz-vakitleri" target="_blank" rel="noopener"><strong>Adwatak aracı</strong></a> da aynı verileri kullanarak hızlı ve kolay erişim sunar.</p>

<h2>Sonuç: Namaz Vakitlerini Daha İyi Anlamak</h2>
<p>Namaz vakitleri, İslam'ın en temel ibadetlerinden biri olan namazın <strong>doğru zamanda kılınmasını</strong> sağlayan astronomik bir sistemdir. Bu vakitler güneşin konumuna göre belirlenir ve her gün, her şehir için farklılık gösterir. Diyanet İşleri Başkanlığı, bu hesaplamaları titizlikle yapar ve halka sunar.</p>
<p>Bu rehberde öğrendiğiniz bilgilerle, namaz vakitlerinin arkasındaki mantığı anlamış oldunuz. <a href="https://adwatak.cloud/tr/tools/namaz-vikitleri" target="_blank" rel="noopener"><strong>Adwatak namaz vakitleri aracı</strong></a> ile günlük namaz saatlerinizi anında öğrenebilir, <a href="https://adwatak.cloud/tr/tools/kible-yonu" target="_blank" rel="noopener"><strong>kıble yönü aracı</strong></a> ile doğru yöne dönebilirsiniz.</p>
<p><a href="https://adwatak.cloud/tr/tools/namaz-vikitleri" target="_blank" rel="noopener"><strong>→ Şimdi Namaz Vakitlerini Gör (Ücretsiz)</strong></a></p>
`,
  },
];

export { trBlogPosts };
