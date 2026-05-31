import type { Metadata } from "next";
export const metadata: Metadata = { title: "مولد النص العربي | أدواتك", description: "أنشئ نص عربي عشوائي للتصميم والمشاريع" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
