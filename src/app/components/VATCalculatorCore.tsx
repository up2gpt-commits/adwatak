"use client";

import { useState } from "react";

interface VATResult {
  beforeTax: number;
  taxAmount: number;
  total: number;
}

interface Props {
  lang: "ar" | "en" | "tr" | "id" | "fr";
  defaultRate?: number;
  compact?: boolean;
}

const labels: Record<string, any> = {
  ar: {
    title: "🏛️ حاسبة الضريبة المضافة (VAT)",
    desc: "احسب ضريبة القيمة المضافة لأي منتج أو خدمة",
    amountLabel: "المبلغ (ريال)",
    rateLabel: "نسبة الضريبة (%)",
    extractBtn: "استخرج الضريبة من السعر الشامل",
    addBtn: "أضف الضريبة على السعر",
    beforeTax: "السعر قبل الضريبة",
    taxAmount: "مبلغ الضريبة",
    total: "السعر الشامل",
    currency: "ر.س",
    placeholder: "1000",
  },
  en: {
    title: "🏛️ VAT Calculator",
    desc: "Add or extract VAT from any amount",
    amountLabel: "Amount ($)",
    rateLabel: "VAT Rate (%)",
    extractBtn: "Extract VAT from gross price",
    addBtn: "Add VAT to net price",
    beforeTax: "Net Price",
    taxAmount: "VAT Amount",
    total: "Gross Price",
    currency: "$",
    placeholder: "100",
  },
  tr: {
    title: "🏛️ KDV Hesaplayıcı",
    desc: "Herhangi bir tutara KDV ekleyin veya çıkarın",
    amountLabel: "Tutar (₺)",
    rateLabel: "KDV Oranı (%)",
    extractBtn: "KDV'yi brüt fiyattan çıkar",
    addBtn: "KDV'yi net fiyata ekle",
    beforeTax: "Net Fiyat",
    taxAmount: "KDV Tutarı",
    total: "Brüt Fiyat",
    currency: "₺",
    placeholder: "100",
  },
  id: {
    title: "🏛️ Kalkulator PPN",
    desc: "Tambah atau ekstrak PPN dari jumlah berapa pun",
    amountLabel: "Jumlah (Rp)",
    rateLabel: "Tarif PPN (%)",
    extractBtn: "Ekstrak PPN dari harga kotor",
    addBtn: "Tambahkan PPN ke harga bersih",
    beforeTax: "Harga Bersih",
    taxAmount: "Jumlah PPN",
    total: "Harga Kotor",
    currency: "Rp",
    placeholder: "100",
  },
};

export default function VATCalculatorCore({ lang, defaultRate, compact }: Props) {
  const t = labels[lang] || labels.en;
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState(String(defaultRate ?? (lang === "ar" ? "15" : "20")));
  const [result, setResult] = useState<VATResult | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const r = parseFloat(rate) / 100;
    if (p <= 0 || isNaN(p)) return;
    setResult({ beforeTax: p / (1 + r), taxAmount: p - p / (1 + r), total: p });
  };

  const calculateAdd = () => {
    const p = parseFloat(price);
    const r = parseFloat(rate) / 100;
    if (p <= 0 || isNaN(p)) return;
    setResult({ beforeTax: p, taxAmount: p * r, total: p * (1 + r) });
  };

  const fmt = (n: number) =>
    n.toLocaleString(lang === "ar" ? "ar-SA" : "en-US", { maximumFractionDigits: 2 });

  return (
    <div style={{ fontFamily: lang === "ar" ? "system-ui, sans-serif" : "system-ui, sans-serif" }}>
      {!compact && (
        <>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>{t.title}</h1>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>{t.desc}</p>
        </>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.375rem", color: "#374151" }}>
          {t.amountLabel}
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder={t.placeholder}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "2px solid #e5e7eb",
            borderRadius: "0.75rem",
            fontSize: "1rem",
            outline: "none",
            boxSizing: "border-box",
            backgroundColor: "#fff",
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.375rem", color: "#374151" }}>
          {t.rateLabel}
        </label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="15"
          step="0.5"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "2px solid #e5e7eb",
            borderRadius: "0.75rem",
            fontSize: "1rem",
            outline: "none",
            boxSizing: "border-box",
            backgroundColor: "#fff",
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
        <button
          onClick={calculate}
          style={{
            backgroundColor: lang === "ar" ? "#2563eb" : "#2563eb",
            color: "#fff",
            fontWeight: 700,
            padding: "0.75rem",
            borderRadius: "0.75rem",
            border: "none",
            fontSize: lang === "ar" ? "0.875rem" : "0.8rem",
            cursor: "pointer",
          }}
        >
          {t.extractBtn}
        </button>
        <button
          onClick={calculateAdd}
          style={{
            backgroundColor: lang === "ar" ? "#f9fafb" : "#f9fafb",
            color: "#2563eb",
            fontWeight: 700,
            padding: "0.75rem",
            borderRadius: "0.75rem",
            border: "2px solid #2563eb",
            fontSize: lang === "ar" ? "0.875rem" : "0.8rem",
            cursor: "pointer",
          }}
        >
          {t.addBtn}
        </button>
      </div>

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
          <div style={{ backgroundColor: "#eff6ff", borderRadius: "0.75rem", padding: "1.25rem", textAlign: "center", border: "1px solid #bfdbfe" }}>
            <p style={{ fontSize: "0.75rem", color: "#2563eb", marginBottom: "0.25rem", margin: 0 }}>{t.beforeTax}</p>
            <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1e3a5f", margin: 0 }}>
              {fmt(result.beforeTax)} <span style={{ fontSize: "0.75rem" }}>{t.currency}</span>
            </p>
          </div>
          <div style={{ backgroundColor: "#fef2f2", borderRadius: "0.75rem", padding: "1.25rem", textAlign: "center", border: "1px solid #fecaca" }}>
            <p style={{ fontSize: "0.75rem", color: "#dc2626", marginBottom: "0.25rem", margin: 0 }}>{t.taxAmount}</p>
            <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#7f1d1d", margin: 0 }}>
              {fmt(result.taxAmount)} <span style={{ fontSize: "0.75rem" }}>{t.currency}</span>
            </p>
          </div>
          <div style={{ backgroundColor: "#f0fdf4", borderRadius: "0.75rem", padding: "1.25rem", textAlign: "center", border: "1px solid #bbf7d0" }}>
            <p style={{ fontSize: "0.75rem", color: "#16a34a", marginBottom: "0.25rem", margin: 0 }}>{t.total}</p>
            <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#14532d", margin: 0 }}>
              {fmt(result.total)} <span style={{ fontSize: "0.75rem" }}>{t.currency}</span>
            </p>
          </div>
        </div>
      )}

      {/* Attribution — required for embed */}
      <p style={{ fontSize: "0.7rem", color: "#9ca3af", marginTop: "0.75rem", textAlign: "center", marginBottom: 0 }}>
        {lang === "ar" ? "مقدمة من " : "Powered by "}
        <a href="https://adwatak.cloud" style={{ color: "#2563eb", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
          {lang === "ar" ? "أدواتك" : "Adwatak"}
        </a>
      </p>
    </div>
  );
}
