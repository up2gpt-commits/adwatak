import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İletişim — Adwatak",
  description:
    "Adwatak ile iletişime geçin — sorunuzu gönderin, hata bildirin veya yeni bir araç önerin. Sizden haber almak isteriz.",
  alternates: {
    canonical: "https://adwatak.cloud/tr/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">İletişim</h1>
        <p className="text-gray-400 text-sm mb-6">Sizden haber almak isteriz</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bize Ulaşın</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                Sorunuz mu var, hata mı buldunuz veya yeni bir araç önermek mi istiyorsunuz?
                Size yardımcı olmak için buradayız. Mesaj gönderin, en kısa sürede size dönüş yapalım.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📧</span>
                  <div>
                    <p className="font-semibold text-gray-900">E-posta</p>
                    <a href="mailto:contact@adwatak.cloud" className="text-blue-600 hover:text-blue-700 no-underline">contact@adwatak.cloud</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">🐦</span>
                  <div>
                    <p className="font-semibold text-gray-900">X (Twitter)</p>
                    <a href="https://twitter.com/adawatak" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 no-underline">@adawatak</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">💡</span>
                  <div>
                    <p className="font-semibold text-gray-900">Araç Öner</p>
                    <p className="text-sm text-gray-500">Yeni bir araç fikriniz mi var? Sizi dinliyoruz!</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mt-6">
                <p className="text-sm text-blue-800"><strong>Yanıt süresi:</strong> İş günlerinde genellikle 24-48 saat içinde yanıtlıyoruz.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mesaj Gönder</h2>
            <form action="mailto:contact@adwatak.cloud" method="post" encType="text/plain" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Adınız</label>
                <input type="text" id="name" name="ad" required className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors" placeholder="Ad Soyad" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">E-posta</label>
                <input type="email" id="email" name="eposta" required className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors" placeholder="ornek@email.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">Konu</label>
                <select id="subject" name="konu" required className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors bg-white">
                  <option value="">Konu seçin...</option>
                  <option value="Genel Soru">Genel Soru</option>
                  <option value="Hata Bildirimi">Hata Bildirimi</option>
                  <option value="Araç Önerisi">Araç Önerisi</option>
                  <option value="Reklam / AdSense">Reklam / AdSense</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Mesaj</label>
                <textarea id="message" name="mesaj" required rows={5} className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors resize-vertical" placeholder="Size nasıl yardımcı olabiliriz?" />
              </div>
              <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-none text-base cursor-pointer hover:bg-blue-700 transition-colors w-full">Mesaj Gönder ✉️</button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link href="/tr" className="text-blue-600 hover:text-blue-700 font-semibold no-underline">← Ana Sayfa</Link>
      </div>
    </div>
  );
}
