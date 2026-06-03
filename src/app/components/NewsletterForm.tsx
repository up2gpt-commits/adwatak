"use client";

import { useState, FormEvent } from "react";

interface NewsletterFormProps {
  lang?: "ar" | "en" | "tr" | "id";
}

export default function NewsletterForm({ lang = "ar" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const isTr = lang === "tr";
  const isId = lang === "id";

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setMessage(lang === "ar" ? "✅ تم الاشتراك بنجاح!" : isTr ? "✅ Başarıyla abone olundu!" : isId ? "✅ Berhasil berlangganan!" : "✅ Subscribed successfully!");
        setEmail("");
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.error || (lang === "ar" ? "❌ حدث خطأ" : isTr ? "❌ Bir hata oluştu" : isId ? "❌ Terjadi kesalahan" : "❌ Something went wrong"));
      }
    } catch {
      setStatus("error");
      setMessage(lang === "ar" ? "❌ حدث خطأ في الاتصال" : isTr ? "❌ Bağlantı hatası" : isId ? "❌ Kesalahan koneksi" : "❌ Connection error");
    }
    setTimeout(() => { setStatus("idle"); setMessage(""); }, 4000);
  };

  return (
    <form onSubmit={submit} className="footer-newsletter">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={lang === "ar" ? "بريدك الإلكتروني..." : isTr ? "E-posta adresiniz..." : isId ? "Alamat email Anda..." : "Your email..."}
        required
        disabled={status === "loading"}
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading"
          ? "⏳"
          : lang === "ar"
            ? "اشترك مجاناً ✉️"
            : isTr
              ? "Ücretsiz Abone Ol ✉️"
              : isId
                ? "Berlangganan Gratis ✉️"
                : "Subscribe Free ✉️"}
      </button>
      {message && (
        <p className={`text-xs mt-2 ${status === "success" ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
