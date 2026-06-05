import type { Metadata } from "next";
export const metadata: Metadata = { title: "حاسبة العمرة | أدواتك", description: "احسب تكاليف العمرة بالكامل — تأشيرة، تذكرة طيران، سكن، نقل، مصاريف يومية مع جدول المناسك خطوة بخطوة" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
