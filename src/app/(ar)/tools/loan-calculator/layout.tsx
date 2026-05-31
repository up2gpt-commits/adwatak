import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حاسبة القرض الشخصي | أدواتك",
  description: "احسب أقساط القرض الشخصي ومعدل الفائدة وجدول السداد",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
