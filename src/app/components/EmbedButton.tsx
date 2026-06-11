"use client";

import { useState } from "react";

interface Props {
  lang: "ar" | "en" | "tr" | "id" | "fr";
  toolSlug?: string;
}

const labels: Record<string, any> = {
  ar: {
    button: "🔌 أضف هذه الحاسبة لموقعك",
    modalTitle: "تضمين حاسبة الضريبة المضافة في موقعك",
    step1: "انسخ الكود أدناه",
    step2: "الصقه في صفحة HTML في موقعك أو مدونتك",
    step3: "سيظهر الحاسبة في موقعك مباشرة",
    copied: "✅ تم النسخ!",
    copy: "📋 نسخ الكود",
    preview: "معاينة",
    close: "إغلاق",
  },
  en: {
    button: "🔌 Embed this calculator on your site",
    modalTitle: "Embed VAT Calculator on your site",
    step1: "Copy the code below",
    step2: "Paste it into any HTML page on your site or blog",
    step3: "The calculator will appear on your site",
    copied: "✅ Copied!",
    copy: "📋 Copy Code",
    preview: "Preview",
    close: "Close",
  },
  tr: {
    button: "🔌 Bu hesaplayıcıyı sitenize ekleyin",
    modalTitle: "KDV Hesaplayıcıyı sitenize gömün",
    step1: "Aşağıdaki kodu kopyalayın",
    step2: "Sitenizdeki herhangi bir HTML sayfasına yapıştırın",
    step3: "Hesaplayıcı sitenizde görünecek",
    copied: "✅ Kopyalandı!",
    copy: "📋 Kodu Kopyala",
    preview: "Önizleme",
    close: "Kapat",
  },
  id: {
    button: "🔌 Sematkan kalkulator ini di situs Anda",
    modalTitle: "Sematkan Kalkulator PPN di situs Anda",
    step1: "Salin kode di bawah ini",
    step2: "Tempelkan ke halaman HTML di situs atau blog Anda",
    step3: "Kalkulator akan muncul di situs Anda",
    copied: "✅ Disalin!",
    copy: "📋 Salin Kode",
    preview: "Pratinjau",
    close: "Tutup",
  },
};

const localePrefix: Record<string, string> = {
  ar: "",
  en: "/en",
  tr: "/tr",
  id: "/id",
};

export default function EmbedButton({ lang, toolSlug = "vat-calculator" }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = labels[lang] || labels.en;

  const prefix = localePrefix[lang] || "";
  const embedUrl = `https://adwatak.cloud${prefix}/embed/${toolSlug}`;
  const iframeCode = `<iframe src="${embedUrl}" width="100%" height="420" style="border:none;border-radius:12px;overflow:hidden;" loading="lazy"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = iframeCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "system-ui, sans-serif",
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "16px",
    maxWidth: "600px",
    width: "100%",
    padding: "28px",
    position: "relative",
    maxHeight: "90vh",
    overflow: "auto",
    direction: lang === "ar" ? "rtl" : "ltr",
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "#1e293b",
          color: "#fff",
          fontWeight: 600,
          padding: "10px 18px",
          borderRadius: "10px",
          border: "none",
          fontSize: "0.9rem",
          cursor: "pointer",
          marginTop: "8px",
        }}
      >
        {t.button}
      </button>

      {open && (
        <div style={modalStyle} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div style={modalContentStyle}>
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "12px",
                [lang === "ar" ? "left" : "right"]: "12px",
                background: "none",
                border: "none",
                fontSize: "1.3rem",
                cursor: "pointer",
                color: "#6b7280",
                padding: "4px 8px",
                lineHeight: 1,
              }}
              aria-label={t.close}
            >
              ✕
            </button>

            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "16px", marginTop: 0 }}>
              {t.modalTitle}
            </h2>

            <ol style={{ margin: "0 0 20px 0", padding: lang === "ar" ? "0 20px 0 0" : "0 0 0 20px", fontSize: "0.9rem", color: "#374151", lineHeight: "1.8" }}>
              <li>{t.step1}</li>
              <li>{t.step2}</li>
              <li>{t.step3}</li>
            </ol>

            {/* Embed Code */}
            <div style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              padding: "14px",
              marginBottom: "14px",
              position: "relative",
            }}>
              <pre style={{
                margin: 0,
                fontSize: "0.8rem",
                color: "#1e293b",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                lineHeight: "1.6",
                maxHeight: "120px",
                overflow: "auto",
              }}>
                {iframeCode}
              </pre>
            </div>

            <button
              onClick={handleCopy}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: copied ? "#059669" : "#2563eb",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "10px",
                border: "none",
                fontSize: "1rem",
                cursor: "pointer",
                marginBottom: "16px",
                transition: "background-color 0.2s",
              }}
            >
              {copied ? t.copied : t.copy}
            </button>

            {/* Live Preview */}
            <details style={{ fontSize: "0.85rem", color: "#6b7280" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, marginBottom: "8px" }}>
                {t.preview}
              </summary>
              <iframe
                src={embedUrl}
                width="100%"
                height="420"
                style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}
                loading="lazy"
              />
            </details>
          </div>
        </div>
      )}
    </>
  );
}
