import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda — Adwatak",
  description:
    "Adwatak, 50'den fazla interaktif araç sunan ücretsiz bir çevrimiçi araç platformudur — hesaplayıcılar, İslami araçlar, oluşturucular ve dönüştürücüler. Kayıt gerekmez, reklam yok.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Adwatak Hakkında</h1>
        <div className="w-16 h-1 bg-blue-600 rounded-full mb-6" />

        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>
            <strong>Adawatak</strong> (أدواتك — "Araçların") is a free online tools platform
            offering high-quality interactive tools in both Arabic and English. We believe digital
            tools should be accessible to everyone — free, easy to use, and requiring no account
            creation.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Neler Sunuyoruz</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Finansal Hesaplayıcılar:</strong> Konut kredisi, kişisel kredi, taksit, EMI, kar marjı, KDV, maaş, döviz çevirici, bileşik faiz ve altın hesaplama.
            </li>
            <li>
              <strong>İslami Araçlar:</strong> İslami miras hesaplama, zekat hesaplama, Hicri/Miladi çevirici, yaş hesaplama, namaz vakitleri ve kıble yönü.
            </li>
            <li>
              <strong>Metin Araçları:</strong> Kelime sayacı, metin dönüştürücü, sayıyı yazıya çevirme, Arapça lorem ipsum, metin temizleyici ve metin karşılaştırma.
            </li>
            <li>
              <strong>Dönüştürücüler:</strong> PDF birleştirme, görselden PDF'e, birim çevirici ve renk çevirici.
            </li>
            <li>
              <strong>Geliştirici Araçları:</strong> JSON biçimlendirici, Base64 kodlayıcı ve hash oluşturucu.
            </li>
            <li>
              <strong>Oluşturucular:</strong> QR kod, WhatsApp bağlantı, şifre oluşturucu, fatura oluşturucu, rastgele sayı oluşturucu ve isim oluşturucu.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Neden Adwatak?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>%100 ücretsiz — gizli ücret yok, premium plan yok</li>
            <li>Kayıt gerekmez — her aracı anında kullanın</li>
            <li>Tamamen istemci tarafı — verileriniz cihazınızdan ayrılmaz</li>
            <li>Herkes için tasarlandı — her ülkede çalışır</li>
            <li>Duyarlı tasarım — mobil ve masaüstünde çalışır</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Teknoloji</h2>
          <p>
            <strong>Next.js</strong> ile oluşturuldu — yüksek hız ve mükemmel performans sağlayan modern bir çerçeve. Tüm araçlar tarayıcınızda (istemci tarafında) çalışır, veri gizliliğinizi garanti eder.
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/tr"
          className="text-blue-600 hover:text-blue-700 font-semibold no-underline"
        >
          ← Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
