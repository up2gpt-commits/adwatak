import type { Metadata } from "next";
export const metadata: Metadata = { title: "مواقيت الصلاة | أدواتك", description: "مواقيت الصلاة حسب موقعك الجغرافي" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
