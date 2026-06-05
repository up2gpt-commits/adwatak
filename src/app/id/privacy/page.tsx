import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Adwatak",
  description:
    "Kebijakan privasi Adwatak — bagaimana kami menangani data Anda, informasi apa yang kami kumpulkan, dan hak Anda sebagai pengguna.",
  alternates: {
    canonical: "https://adwatak.cloud/id/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kebijakan Privasi</h1>
        <p className="text-gray-400 text-sm mb-6">Terakhir diperbarui: Juni 2026</p>

        <div className="text-gray-600 leading-relaxed space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Komitmen Privasi Kami</h2>
          <p>
            Di <strong>Adwatak</strong>, privasi Anda adalah prioritas kami. Semua alat berjalan secara lokal di browser Anda — data Anda tidak pernah dikirim ke server mana pun. Kami tidak mengumpulkan informasi pribadi saat menggunakan alat kami.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Informasi yang Kami Kumpulkan</h2>
          <p>
            Saat Anda mengunjungi situs web kami, kami dapat mengumpulkan informasi teknis terbatas seperti jenis browser, sistem operasi, dan alamat IP. Informasi ini digunakan untuk meningkatkan kinerja situs dan menganalisis penggunaan melalui layanan seperti Google Analytics.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Cookie</h2>
          <p>
            Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Kami juga dapat menggunakan layanan pihak ketiga seperti Google AdSense yang menggunakan cookie mereka sendiri untuk menampilkan iklan yang dipersonalisasi.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Layanan Pihak Ketiga</h2>
          <p>
            Kami dapat menggunakan layanan seperti Google Analytics dan Google AdSense. Layanan ini memiliki kebijakan privasi independen mereka sendiri. Kami menyarankan Anda meninjau kebijakan privasi mereka untuk informasi lebih lanjut.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Perlindungan Data</h2>
          <p>
            Karena semua alat berjalan di browser Anda, data keuangan dan pribadi Anda tidak pernah disimpan di server mana pun. Kami tidak menjual atau membagikan informasi pribadi Anda kepada pihak ketiga.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi kami di:
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
          href="/id"
          className="text-blue-600 hover:text-blue-700 font-semibold no-underline"
        >
          ← Beranda
        </Link>
      </div>
    </div>
  );
}
