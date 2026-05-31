import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صورة إلى PDF | أدواتك",
  description: "حوّل الصور إلى ملف PDF مجاناً",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
