import type { Metadata } from "next";
export const metadata: Metadata = { title: "محوّل الوحدات | أدواتك", description: "تحويل بين وحدات الطول والوزن والحجم" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
