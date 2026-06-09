"use client";

import VATCalculatorCore from "../../../components/VATCalculatorCore";

export default function EmbedClient() {
  return (
    <div style={{
      padding: "16px",
      fontFamily: "system-ui, sans-serif",
      maxWidth: "400px",
      margin: "0 auto",
    }}>
      <VATCalculatorCore lang="id" defaultRate={11} />
    </div>
  );
}
