import Client from "@/app/(ar)/tools/qibla-camera/Client";

export const metadata = {
  title: "Kamera ile Kıble Yönü | Adwatak",
  description:
    "Telefon kameranızı kullanarak Kıble yönünü gerçek zamanlı bulun — doğru hizalandığınızda Kabe'yi gösteren etkileşimli AR pusulası",
  openGraph: {
    title: "Kamera ile Kıble Yönü — Canlı AR",
    description:
      "Kıble yönünü bulmak için telefon kameranızı kullanın. Doğru hizalandığınızda Kabe'yi gösteren etkileşimli AR pusulası.",
  },
};

export default function Page() {
  return <Client locale="tr" />;
}
