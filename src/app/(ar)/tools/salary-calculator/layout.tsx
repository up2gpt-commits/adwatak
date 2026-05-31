import type { Metadata } from "next";
export const metadata: Metadata = { title: "حاسبة الراتب الصافي | أدواتك", description: "احسب راتبك الصافي بعد التأمينات والاستقطاعات" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
