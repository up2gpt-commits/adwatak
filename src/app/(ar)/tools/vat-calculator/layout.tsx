import type { Metadata } from "next";
export const metadata: Metadata = { title: "حاسبة الضريبة المضافة | أدواتك", description: "احسب ضريبة القيمة المضافة 15% السعودية أو 5% الإمارات" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
