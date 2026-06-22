import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hubungi Kami — Adwatak",
  description:
    "Hubungi Adwatak — kirim pertanyaan, laporkan bug, atau sarankan alat baru. Kami siap membantu Anda.",
  alternates: {
    canonical: "https://adwatak.cloud/id/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hubungi Kami</h1>
        <p className="text-gray-400 text-sm mb-6">Kami siap membantu Anda</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                Ada pertanyaan, menemukan bug, atau ingin menyarankan alat baru? Kami di sini untuk membantu. Kirim pesan dan kami akan merespon secepatnya.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📧</span>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:contact@adwatak.cloud" className="text-blue-600 hover:text-blue-700 no-underline">contact@adwatak.cloud</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">🐦</span>
                  <div>
                    <p className="font-semibold text-gray-900">X (Twitter)</p>
                    <a href="https://twitter.com/adawatak" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 no-underline">@adwatak</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">💡</span>
                  <div>
                    <p className="font-semibold text-gray-900">Saran Alat</p>
                    <p className="text-sm text-gray-500">Punya ide untuk alat baru? Kami ingin mendengarnya!</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mt-6">
                <p className="text-sm text-blue-800"><strong>Waktu respons:</strong> Kami biasanya membalas dalam 24-48 jam pada hari kerja.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Kirim Pesan</h2>
            <form action="mailto:contact@adwatak.cloud" method="post" encType="text/plain" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
                <input type="text" id="name" name="nama" required className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors" placeholder="Nama Lengkap" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" required className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors" placeholder="contoh@email.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">Subjek</label>
                <select id="subject" name="subjek" required className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors bg-white">
                  <option value="">Pilih subjek...</option>
                  <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                  <option value="Laporkan Bug">Laporkan Bug</option>
                  <option value="Saran Alat">Saran Alat</option>
                  <option value="Iklan / AdSense">Iklan / AdSense</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Pesan</label>
                <textarea id="message" name="pesan" required rows={5} className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors resize-vertical" placeholder="Ada yang bisa kami bantu?" />
              </div>
              <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-none text-base cursor-pointer hover:bg-blue-700 transition-colors w-full">Kirim Pesan ✉️</button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link href="/id" className="text-blue-600 hover:text-blue-700 font-semibold no-underline">← Beranda</Link>
      </div>
    </div>
  );
}
