import type { Metadata } from "next";
export const metadata: Metadata = { title: "المسبحة الإلكترونية | أدواتك", description: "مسبحة إلكترونية لتسبيح الله — عداد أذكار مع حفظ العدد في المتصفح — 33 تسبيحة لكل ذكر" };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
