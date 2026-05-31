import type { Metadata } from "next";
export const metadata: Metadata = { title: "ترقيم عشوائي | أدواتك", description: "أنشئ أرقام عشوائية بين نطاق محدد" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
