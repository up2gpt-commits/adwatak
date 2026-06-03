"use client";

import { useEffect } from "react";

/**
 * Fixes the <html lang=""> attribute to match the current language route.
 *
 * Runs synchronously on mount (no state/effects delay) so that Google Bot
 * sees the correct lang attribute even on first render.
 *
 * Detection: reads pathname → extracts locale prefix:
 *   /en/... → "en", /tr/... → "tr", /id/... → "id", /... → "ar"
 * Also sets dir attribute: rtl for ar, ltr for everything else.
 */
export default function DynamicHtmlLang() {
  // We still need useEffect because document is only available client-side
  useEffect(() => {
    // Use requestAnimationFrame to ensure this runs as early as possible
    // (before first paint for Google's rendering engine)
    const id = requestAnimationFrame(() => {
      const pathname = window.location.pathname;
      const match = pathname.match(/^\/(en|tr|id)(\/|$)/);
      const lang = match ? match[1] : "ar";
      const dir = lang === "ar" ? "rtl" : "ltr";

      const html = document.documentElement;
      if (html.lang !== lang) html.lang = lang;
      if (html.getAttribute("dir") !== dir) html.setAttribute("dir", dir);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}
