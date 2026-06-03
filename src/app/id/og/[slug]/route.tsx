import { ImageResponse } from "@vercel/og";
import { TOOLS_META } from "@/app/lib/tool-metadata";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = TOOLS_META[slug];

  const nameId = tool?.nameId || "Adwatak";
  const descId = tool?.descId || "50+ alat online gratis";
  const icon = getToolIcon(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          fontFamily: "Inter",
          padding: "40px",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #2563eb, #7c3aed, #2563eb)",
          }}
        />

        {/* Tool icon */}
        <div
          style={{
            fontSize: "80px",
            marginBottom: "20px",
          }}
        >
          {icon}
        </div>

        {/* Tool name */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          {nameId}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: "500px",
          }}
        >
          {descId.length > 80 ? descId.substring(0, 80) + "…" : descId}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            fontSize: "18px",
            color: "#475569",
          }}
        >
          <span>🔧 Adwatak</span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "30px",
            fontSize: "14px",
            color: "#334155",
          }}
        >
          adwatak.cloud
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "twemoji",
    }
  );
}

function getToolIcon(slug: string): string {
  const icons: Record<string, string> = {
    "mortgage-calculator": "🏠",
    "loan-calculator": "💰",
    "installment-calculator": "📊",
    "emi-calculator": "🧮",
    "profit-margin": "📈",
    "vat-calculator": "🏛️",
    "salary-calculator": "💵",
    "compound-interest": "📈",
    "gold-calculator": "🥇",
    "car-installment": "🚗",
    "age-calculator": "🎂",
    "bmi-calculator": "⚖️",
    "calorie-calculator": "🔥",
    "zakat-calculator": "🕌",
    "inheritance-calculator": "📜",
    "prayer-times": "🕐",
    "qibla-direction": "🧭",
    "hijri-converter": "📅",
    "currency-converter": "💱",
    "unit-converter": "📐",
    "color-converter": "🎨",
    "word-counter": "📝",
    "text-case": "🔤",
    "number-to-words": "🔢",
    "arabic-lorem": "📃",
    "text-cleaner": "🧹",
    "text-compare": "⚖️",
    "ai-content-detector": "🤖",
    "plagiarism-checker": "🚫",
    "grammar-checker": "📝",
    "paraphrasing-tool": "✏️",
    "typing-test": "⌨️",
    "social-character-counter": "📱",
    "bio-generator": "👤",
    "background-remover": "🖼️",
    "image-to-text": "👁️",
    "image-resizer": "📐",
    "image-compressor": "📦",
    "image-to-pdf": "🖼️",
    "youtube-thumbnail-downloader": "▶️",
    "pdf-merger": "📎",
    "pdf-splitter": "✂️",
    "pdf-compressor": "📦",
    "pdf-to-word": "📄",
    "qr-generator": "🔳",
    "qr-reader": "📷",
    "barcode-generator": "📊",
    "password-generator": "🔐",
    "invoice-generator": "🧾",
    "whatsapp-link": "💬",
    "random-number": "🎲",
    "name-generator": "👤",
    "json-formatter": "📋",
    "base64-encoder": "🔄",
    "hash-generator": "#️⃣",
    "seo-audit": "🔍",
    "css-minifier": "🎨",
    "markdown-editor": "📝",
    "ip-lookup": "🌐",
    "encoder": "🔐",
    "stopwatch": "⏱️",
  };
  return icons[slug] || "🔧";
}
