import { ImageResponse } from "@vercel/og";
import { TOOLS_META } from "@/app/lib/tool-metadata";

export const runtime = "edge";

const LOCALE_META: Record<string, { name: string; desc: string; sub: string; suffix: string }> = {
  ar: { name: "أدواتك", desc: "80+ أداة مجانية بالعربي", sub: "حاسبات • أدوات إسلامية • مولدات • محولات", suffix: "" },
  en: { name: "Adwatak", desc: "80+ Free Online Tools — No Signup", sub: "Calculators • Islamic Tools • Generators • Converters", suffix: "" },
  tr: { name: "Araçların", desc: "80+ Ücretsiz Çevrimiçi Araç", sub: "Hesaplayıcılar • İslami Araçlar • Üreteçler • Dönüştürücüler", suffix: "" },
  id: { name: "Alat-alatmu", desc: "80+ Alat Online Gratis", sub: "Kalkulator • Alat Islami • Generator • Konverter", suffix: "" },
};

let fontData: ArrayBuffer | null = null;

async function getFontData(baseUrl: string): Promise<ArrayBuffer | null> {
  if (fontData) return fontData;
  try {
    const fontUrl = `${baseUrl}/NotoSansArabic-VariableFont_wght.ttf`;
    const res = await fetch(fontUrl);
    if (!res.ok) return null;
    fontData = await res.arrayBuffer();
    return fontData;
  } catch {
    return null;
  }
}

const colors = {
  bg: "#0f172a",
  accent: "#2563eb",
  accent2: "#7c3aed",
  text: "#ffffff",
  muted: "#94a3b8",
  sub: "#64748b",
};

const OG_FONTS = [
  {
    name: "Noto Sans Arabic",
    data: null as any, // filled at runtime
    weight: 400,
    style: "normal" as const,
  },
  {
    name: "Noto Sans Arabic",
    data: null as any,
    weight: 700,
    style: "normal" as const,
  },
  {
    name: "Noto Sans Arabic",
    data: null as any,
    weight: 900,
    style: "normal" as const,
  },
];

function getBaseUrl(request: Request): string {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

function HomepageOG(meta: { name: string; desc: string; sub: string }) {
  const dir = meta.name === "أدواتك" ? "rtl" : "ltr";
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bg,
        fontFamily: "Noto Sans Arabic",
        direction: dir as any,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2}, ${colors.accent})`,
        }}
      />

      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(37, 99, 235, 0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(124, 58, 237, 0.06)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          zIndex: 1,
        }}
      >
        {/* Icon */}
        <div style={{ fontSize: "72px", marginBottom: "16px" }}>🔧</div>

        {/* Brand name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            color: colors.text,
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: "12px",
            letterSpacing: "0.02em",
          }}
        >
          {meta.name}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "28px",
            color: colors.muted,
            textAlign: "center",
            lineHeight: 1.4,
            marginBottom: "8px",
          }}
        >
          {meta.desc}
        </div>

        {/* Sub description */}
        <div
          style={{
            fontSize: "20px",
            color: colors.sub,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {meta.sub}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            fontSize: "16px",
            color: "#334155",
          }}
        >
          adwatak.cloud
        </div>
      </div>
    </div>
  );
}

function ToolOG(nameAr: string, descAr: string, icon: string) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bg,
        fontFamily: "Noto Sans Arabic",
        direction: "rtl",
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
          background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2}, ${colors.accent})`,
        }}
      />

      {/* Tool icon */}
      <div style={{ fontSize: "80px", marginBottom: "20px" }}>{icon}</div>

      {/* Tool name */}
      <div
        style={{
          fontSize: "52px",
          fontWeight: 900,
          color: colors.text,
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: "16px",
        }}
      >
        {nameAr}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: "24px",
          color: colors.muted,
          textAlign: "center",
          lineHeight: 1.5,
          maxWidth: "500px",
        }}
      >
        {descAr.length > 80 ? descAr.substring(0, 80) + "…" : descAr}
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
        <span>🔧 أدواتك</span>
      </div>

      {/* Domain */}
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
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const baseUrl = getBaseUrl(request);

  // Load font data
  const fontBuffer = await getFontData(baseUrl);

  const fonts = !fontBuffer ? undefined : OG_FONTS.map((f) => ({ ...f, data: fontBuffer })) as any;

  // Handle localized homepage slugs (ar, en, tr, id)
  if (LOCALE_META[slug]) {
    const meta = LOCALE_META[slug];
    return new ImageResponse(HomepageOG(meta), {
      width: 1200,
      height: 630,
      emoji: "twemoji",
      fonts,
    });
  }

  // Tool-specific OG image
  const tool = TOOLS_META[slug];
  const nameAr = tool?.nameAr || "أدواتك";
  const descAr = tool?.descAr || "80+ أداة مجانية بالعربي";
  const icon = getToolIcon(slug);

  return new ImageResponse(ToolOG(nameAr, descAr, icon), {
    width: 1200,
    height: 630,
    emoji: "twemoji",
    fonts,
  });
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
