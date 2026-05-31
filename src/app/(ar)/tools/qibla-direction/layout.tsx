import type { Metadata } from "next";
export const metadata: Metadata = { title: "اتجاه القبلة | أدواتك", description: "اعرف اتجاه القبلة من موقعك الجغرافي" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
