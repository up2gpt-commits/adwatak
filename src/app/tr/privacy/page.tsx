import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — Adwatak",
  description:
    "Adwatak gizlilik politikası — verilerinizi nasıl işlediğimiz, hangi bilgileri topladığımız ve bir kullanıcı olarak haklarınız.",
  alternates: {
    canonical: "https://adwatak.cloud/tr/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gizlilik Politikası</h1>
        <p className="text-gray-400 text-sm mb-6">Son güncelleme: Haziran 2026</p>

        <div className="text-gray-600 leading-relaxed space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Gizlilik Taahhüdümüz</h2>
          <p>
            <strong>Adwatak</strong> olarak gizliliğiniz önceliğimizdir. Tüm araçlar tarayıcınızda yerel olarak çalışır — verileriniz asla herhangi bir sunucuya gönderilmez. Araçlarımızı kullanırken kişisel bilgi toplamayız.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Topladığımız Bilgiler</h2>
          <p>
            Web sitemizi ziyaret ettiğinizde, tarayıcı türü, işletim sistemi ve IP adresi gibi sınırlı teknik bilgiler toplayabiliriz. Bu bilgiler, site performansını iyileştirmek ve Google Analytics gibi hizmetler aracılığıyla kullanımı analiz etmek için kullanılır.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Çerezler</h2>
          <p>
            Deneyiminizi iyileştirmek için çerezler kullanıyoruz. Kişiselleştirilmiş reklamlar sunmak için kendi çerezlerini kullanan Google AdSense gibi üçüncü taraf hizmetleri de kullanabiliriz.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Üçüncü Taraf Hizmetleri</h2>
          <p>
            Google Analytics ve Google AdSense gibi hizmetleri kullanabiliriz. Bu hizmetlerin kendi bağımsız gizlilik politikaları vardır. Daha fazla bilgi için gizlilik politikalarını incelemenizi öneririz.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Veri Koruması</h2>
          <p>
            Tüm araçlar tarayıcınızda çalıştığından, finansal ve kişisel verileriniz asla herhangi bir sunucuda saklanmaz. Kişisel bilgilerinizi üçüncü taraflara satmaz veya paylaşmayız.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">İletişim</h2>
          <p>
            Bu gizlilik politikası hakkında herhangi bir sorunuz için bizimle iletişime geçin:
            <a
              href="mailto:contact@adwatak.cloud"
              className="text-blue-600 hover:text-blue-700 no-underline ml-1"
            >
              contact@adwatak.cloud
            </a>
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
