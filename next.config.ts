import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "/home/ops123/adwatak",
  },
  async redirects() {
    return [
      // ── Singular /tool/* → plural /tools/* (catch SEO 404s from external links) ──
      { source: "/tool/:slug*", destination: "/tools/:slug*", permanent: true },
      { source: "/en/tool/:slug*", destination: "/en/tools/:slug*", permanent: true },
      { source: "/tr/tool/:slug*", destination: "/tr/tools/:slug*", permanent: true },
      { source: "/id/tool/:slug*", destination: "/id/tools/:slug*", permanent: true },
      { source: "/fr/tool/:slug*", destination: "/fr/tools/:slug*", permanent: true },

      // ── Explicit /ar/* paths → root (Arabic is the default locale, no prefix) ──
      { source: "/ar", destination: "/", permanent: true },
      { source: "/ar/", destination: "/", permanent: true },
      {
        source: "/ar/:path*",
        destination: "/:path*",
        permanent: true,
      },

      // ── Old renamed tools → new URLs (SEO 404 fixes) ──
      { source: "/tools/hijri-date", destination: "/tools/hijri-converter", permanent: true },
      { source: "/en/tools/hijri-date", destination: "/en/tools/hijri-converter", permanent: true },
      { source: "/tr/tools/hijri-date", destination: "/tr/tools/hijri-converter", permanent: true },
      { source: "/id/tools/hijri-date", destination: "/id/tools/hijri-converter", permanent: true },
      { source: "/fr/tools/hijri-date", destination: "/fr/tools/hijri-converter", permanent: true },

      { source: "/tools/islamic-finance", destination: "/category/islamic", permanent: true },
      { source: "/en/tools/islamic-finance", destination: "/en/category/islamic", permanent: true },
      { source: "/tr/tools/islamic-finance", destination: "/tr/category/islamic", permanent: true },
      { source: "/id/tools/islamic-finance", destination: "/id/category/islamic", permanent: true },
      { source: "/fr/tools/islamic-finance", destination: "/fr/category/islamic", permanent: true },

      { source: "/tools/investment-calcul", destination: "/tools/compound-interest", permanent: true },
      { source: "/en/tools/investment-calcul", destination: "/en/tools/compound-interest", permanent: true },
      { source: "/tr/tools/investment-calcul", destination: "/tr/tools/compound-interest", permanent: true },
      { source: "/id/tools/investment-calcul", destination: "/id/tools/compound-interest", permanent: true },
      { source: "/fr/tools/investment-calcul", destination: "/fr/tools/compound-interest", permanent: true },

      { source: "/tools/timer", destination: "/", permanent: true },
      { source: "/en/tools/timer", destination: "/en", permanent: true },
      { source: "/tr/tools/timer", destination: "/tr", permanent: true },
      { source: "/id/tools/timer", destination: "/id", permanent: true },
      { source: "/fr/tools/timer", destination: "/fr", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://ssl.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://openrouter.ai https://www.google-analytics.com",
              "frame-ancestors *",
              "media-src 'self' blob:",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
      {
        source: "/tools/qr-reader",
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/en/tools/qr-reader",
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
