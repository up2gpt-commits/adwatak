import type { Metadata } from "next";
export const metadata: Metadata = { title: "Stopwatch | أدواتك", description: "Stopwatch - أداة مجانية من أدواتك adwatak.cloud" };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
