import type { Metadata } from "next";
export const metadata: Metadata = { title: "حاسبة الميراث الإسلامي | أدواتك", description: "احسب أنصبة الميراث حسب الشريعة الإسلامية تلقائياً" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
