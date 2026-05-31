import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "عداد الكلمات والحروف | أدواتك",
  description: "عداد الكلمات والحروف والجمل للنص العربي والإنجليزي مع إحصائيات تفصيلية",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
