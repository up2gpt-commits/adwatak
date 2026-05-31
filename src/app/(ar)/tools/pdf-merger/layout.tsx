import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دمج ملفات PDF | أدواتك",
  description: "ادمج عدة ملفات PDF في ملف واحد مجاناً",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
