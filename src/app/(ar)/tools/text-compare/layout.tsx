import type { Metadata } from "next";
export const metadata: Metadata = { title: "مقارنة النصوص | أدواتك", description: "قارن بين نصين واعرف الفرق بينهما" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
