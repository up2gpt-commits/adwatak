import type { Metadata } from "next";
export const metadata: Metadata = { title: "تحويل هجري ميلادي | أدواتك", description: "حوّل التاريخ بين الهجري والميلادي بدقة عالية" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
