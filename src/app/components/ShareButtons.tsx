"use client";

import { useState, useEffect } from "react";

interface ShareButtonsProps {
  title?: string;
  url?: string;
  lang?: "ar" | "en" | "tr" | "id" | "fr";
}

export default function ShareButtons({ title, url, lang = "ar" }: ShareButtonsProps) {
  const [mounted, setMounted] = useState(false);
  const [clientUrl, setClientUrl] = useState("");
  const [clientTitle, setClientTitle] = useState("");

  useEffect(() => {
    setMounted(true);
    setClientUrl(window.location.href);
    setClientTitle(document.title);
  }, []);

  const fullUrl = url || clientUrl;
  const pageTitle = title || clientTitle;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(pageTitle);

  // Don't render share links during SSR — wait for mount so URLs are correct
  if (!mounted && !url) {
    return (
      <div className="mt-8 mb-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">
            {lang === "ar" ? "🔗 شارك الأداة" : lang === "id" ? "🔗 Bagikan alat ini" : "🔗 Share this tool"}
          </h3>
          <p className="text-sm text-gray-400">
            {lang === "ar"
              ? "شارك الأداة مع أصحابك — كل الأداة مجانية ومتاحة بدون تسجيل"
              : lang === "id"
              ? "Bagikan alat ini ke teman — gratis, tanpa daftar"
              : "Share this free tool with friends — no signup required"}
          </p>
        </div>
      </div>
    );
  }

  const shareLinks = [
    {
      name: lang === "ar" ? "واتساب" : lang === "id" ? "WhatsApp" : "WhatsApp",
      icon: "💬",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "X",
      icon: "🐦",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "bg-black hover:bg-gray-800",
    },
    {
      name: lang === "ar" ? "فيسبوك" : lang === "id" ? "Facebook" : "Facebook",
      icon: "📘",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Telegram",
      icon: "✈️",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: lang === "ar" ? "لينكد إن" : lang === "id" ? "LinkedIn" : "LinkedIn",
      icon: "💼",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-blue-700 hover:bg-blue-800",
    },
  ];

  const copyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(fullUrl);
    }
  };

  return (
    <div className="mt-8 mb-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">
          {lang === "ar" ? "🔗 شارك الأداة" : lang === "id" ? "🔗 Bagikan alat ini" : "🔗 Share this tool"}
        </h3>
        <div className="flex flex-wrap gap-3">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${link.color} text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </a>
          ))}
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            <span>🔗</span>
            <span>{lang === "ar" ? "نسخ الرابط" : lang === "id" ? "Salin tautan" : "Copy link"}</span>
          </button>
        </div>
        {/* Direct link field */}
        <div className="mt-4">
          <label className="text-xs text-gray-400 font-medium block mb-1">
            {lang === "ar" ? "الرابط المباشر:" : lang === "id" ? "Tautan langsung:" : "Direct link:"}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={fullUrl}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 font-mono"
              onClick={(e) => e.currentTarget.select()}
            />
            <button
              onClick={copyLink}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              {lang === "ar" ? "نسخ" : lang === "id" ? "Salin" : "Copy"}
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          {lang === "ar"
            ? "شارك الأداة مع أصحابك — كل الأداة مجانية ومتاحة بدون تسجيل"
            : lang === "id"
            ? "Bagikan alat ini ke teman — gratis, tanpa daftar"
            : "Share this free tool with friends — no signup required"}
        </p>
      </div>
    </div>
  );
}
