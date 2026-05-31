import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Calculators — Adawatak",
  description: "Free financial calculators: mortgage, loan, EMI, compound interest, profit margin, salary, VAT, gold price",
};

const tools = [
  { title: "Mortgage Calculator", icon: "🏠", href: "/en/tools/mortgage-calculator", desc: "Calculate monthly payments and amortization" },
  { title: "Loan Calculator", icon: "💰", href: "/en/tools/loan-calculator", desc: "Personal loan payment calculator" },
  { title: "EMI Calculator", icon: "🧮", href: "/en/tools/emi-calculator", desc: "Equated Monthly Installment" },
  { title: "Compound Interest", icon: "📈", href: "/en/tools/compound-interest", desc: "Investment growth calculator" },
  { title: "Profit Margin", icon: "📐", href: "/en/tools/profit-margin", desc: "Margin and markup calculator" },
  { title: "Salary Calculator", icon: "💵", href: "/en/tools/salary-calculator", desc: "Gross to net salary" },
];

export default function CalculatorsCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>💰 Financial Calculators</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Free calculators for loans, mortgages, investments, and personal finance.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {tools.map((t, i) => (
          <a key={i} href={t.href} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #f1f5f9", textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
              <span style={{ fontSize: "2rem" }}>{t.icon}</span>
              <div><div style={{ fontWeight: 700, fontSize: "1rem" }}>{t.title}</div><div style={{ fontSize: "0.875rem", color: "#64748b" }}>{t.desc}</div></div>
            </div>
          </a>
        ))}
      </div>
      <div style={{ marginTop: "32px", padding: "24px", background: "white", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>All calculations are performed in your browser. No data is sent to any server. <a href="/en" style={{ color: "#2563eb" }}>← Back to Home</a></p>
      </div>
    </div>
  );
}
