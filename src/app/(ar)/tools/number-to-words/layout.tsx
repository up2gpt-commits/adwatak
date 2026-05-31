import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تحويل الأرقام لكلمات عربية | أدواتك",
  description: "حوّل أي رقم إلى كلمات عربية — مثال: 1500 → ألف وخمسمائة",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
