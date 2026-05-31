import type { Metadata } from "next";
export const metadata: Metadata = { title: "تنظيف النص | أدواتك", description: "نظّف النص من المسافات والأسطر والعلامات الزائدة" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
