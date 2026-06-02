"use client";

import Link from "next/link";

export default function NotFound() {
  // Direct JS check — works immediately without waiting for useEffect
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const isEn = path.startsWith("/en");
  const isTr = path.startsWith("/tr");

  if (isTr) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-7xl mb-4">🔧</div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Sayfa Bulunamadı</h1>
        <p className="text-gray-500 mb-8 max-w-md">Üzgünüz, aradığınız sayfa mevcut değil.</p>
        <div className="flex gap-4">
          <Link href="/tr" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl no-underline hover:bg-blue-700 transition-colors">⬅️ Ana Sayfa</Link>
          <Link href="/tr" className="bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-xl no-underline hover:bg-gray-200 transition-colors">🗂️ Tüm Araçlar</Link>
        </div>
      </div>
    );
  }

  if (isEn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-7xl mb-4">🔧</div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="flex gap-4">
          <Link href="/en" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl no-underline hover:bg-blue-700 transition-colors">⬅️ Back to Home</Link>
          <Link href="/tools" className="bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-xl no-underline hover:bg-gray-200 transition-colors">🗂️ All Tools</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-7xl mb-4">🔧</div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">الصفحة غير موجودة</h1>
      <p className="text-gray-500 mb-8 max-w-md">عذراً، الصفحة اللي بتدور عليها مش موجودة.</p>
      <div className="flex gap-4">
        <Link href="/" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl no-underline hover:bg-blue-700 transition-colors">⬅️ الرجوع للرئيسية</Link>
        <Link href="/tools" className="bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-xl no-underline hover:bg-gray-200 transition-colors">🗂️ كل الأدوات</Link>
      </div>
    </div>
  );
}
