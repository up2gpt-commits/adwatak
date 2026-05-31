import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تحويل حالة النص | أدواتك",
  description: "تحويل النص لأحرف كبيرة أو صغيرة أو عنوان أو عكس النص",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
