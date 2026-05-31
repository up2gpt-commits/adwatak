import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مولد QR Code | أدواتك",
  description: "إنشاء QR Code مجاني لأي رابط أو نص أو رقم هاتف",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
