import type { Metadata } from "next";
export const metadata: Metadata = { title: "مولد الفواتير | أدواتك", description: "أنشئ فاتورة إعربية احترافية مجانا" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
