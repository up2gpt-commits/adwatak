"use client";
import QiblaDirectionCore from "../../../components/QiblaDirectionCore";

export default function EmbedClient() {
  return (
    <div style={{
      padding: "16px",
      fontFamily: "system-ui, sans-serif",
      maxWidth: "400px",
      margin: "0 auto",
    }}>
      <QiblaDirectionCore lang="fr" />
    </div>
  );
}
