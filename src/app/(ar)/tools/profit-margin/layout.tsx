import type { Metadata } from "next";
export const metadata: Metadata = { title: "حاسبة هامش الربح | أدواتك", description: "احسب هامش الربح ونسبة الربح على المبيعات" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
