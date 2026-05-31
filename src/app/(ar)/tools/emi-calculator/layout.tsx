import type { Metadata } from "next";
export const metadata: Metadata = { title: "حاسبة EMI | أدواتك", description: "احسب القسط الشهري الثابت EMI للقروض" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
