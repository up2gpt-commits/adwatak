import type { Metadata } from "next";
export const metadata: Metadata = { title: "محوّل العملات | أدواتك", description: "تحويل بين العملات العربية والعالمية" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
