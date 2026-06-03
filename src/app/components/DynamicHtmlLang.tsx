"use client";

import { useEffect } from "react";

/**
 * Fixes the <html lang=""> attribute to match the current language route.
 * In Next.js App Router, the root layout always renders <html lang="ar">,
 * but we need en/tr/id pages to report the correct lang to Google.
 *
 * This client component reads the URL path and updates lang on mount.
 */
export default function DynamicHtmlLang() {
  useEffect(() => {
    const pathname = window.location.pathname;
    // Detect locale from path: /en, /tr, /id, or default ar
    const match = pathname.match(/^\/(en|tr|id)(\/|$)/);
    const lang = match ? match[1] : "ar";

    const htmlEl = document.documentElement;
    if (htmlEl.lang !== lang) {
      htmlEl.lang = lang;
    }

    // Also set dir attribute based on language
    if (lang === "ar") {
      htmlEl.dir = "rtl";
    } else {
      htmlEl.dir = "ltr";
    }
  }, []);

  return null;
}
