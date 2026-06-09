import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Kami — Adwatak",
  description:
    "Adwatak adalah platform alat online gratis yang menawarkan 80+ alat interaktif — kalkulator, alat Islami, generator, dan konverter. Tanpa pendaftaran, tanpa iklan.",
  alternates: {
    canonical: "https://adwatak.cloud/id/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tentang Adwatak</h1>
        <div className="w-16 h-1 bg-blue-600 rounded-full mb-6" />

        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>
            <strong>Adawatak</strong> (Arab: أدواتك — "Alat Anda") adalah platform alat online gratis
            yang menawarkan alat interaktif berkualitas tinggi dalam bahasa Arab, Inggris, Turki, dan Indonesia. Kami percaya
            alat digital harus dapat diakses oleh semua orang — gratis, mudah digunakan, dan tidak perlu membuat akun.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Apa yang Kami Tawarkan</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Kalkulator Keuangan:</strong> KPR, pinjaman pribadi, cicilan, EMI, margin keuntungan, PPN, gaji, konverter mata uang, bunga majemuk, dan kalkulator emas.
            </li>
            <li>
              <strong>Alat Islami:</strong> Kalkulator waris Islam, kalkulator zakat, konverter Hijriah/Masehi, kalkulator usia, waktu sholat, dan arah kiblat.
            </li>
            <li>
              <strong>Alat Teks:</strong> Penghitung kata, konversi huruf, angka ke huruf, lorem ipsum Arab, pembersih teks, dan perbandingan teks.
            </li>
            <li>
              <strong>Konverter:</strong> Gabung PDF, gambar ke PDF, konverter satuan, dan konverter warna.
            </li>
            <li>
              <strong>Alat Pengembang:</strong> Pemformat JSON, encoder Base64, dan generator hash.
            </li>
            <li>
              <strong>Generator:</strong> QR code, tautan WhatsApp, generator kata sandi, generator faktur, generator angka acak, dan generator nama.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Mengapa Adwatak?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>100% gratis — tidak ada biaya tersembunyi, tidak ada plan premium</li>
            <li>Tidak perlu daftar — gunakan setiap alat secara instan</li>
            <li>Sepenuhnya sisi klien — data Anda tidak meninggalkan perangkat Anda</li>
            <li>Dirancang untuk semua orang — berjalan di setiap negara</li>
            <li>Desain responsif — berjalan di mobile dan desktop</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Teknologi</h2>
          <p>
            Dibangun dengan <strong>Next.js</strong> — framework modern yang menyediakan kecepatan tinggi dan performa sempurna. Semua alat berjalan di browser Anda (sisi klien), menjamin privasi data Anda.
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
