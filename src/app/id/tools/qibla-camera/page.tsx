import Client from "@/app/(ar)/tools/qibla-camera/Client";

export const metadata = {
  title: "Arah Kiblat dengan Kamera | Adwatak",
  description:
    "Arahkan kamera ponsel Anda untuk menemukan arah kiblat secara real-time — AR interaktif yang menampilkan Ka'bah saat sejajar dengan benar",
  openGraph: {
    title: "Arah Kiblat dengan Kamera — AR Langsung",
    description:
      "Gunakan kamera ponsel untuk menemukan arah kiblat. Kompas AR interaktif yang menampilkan Ka'bah saat sejajar dengan benar.",
  },
};

export default function Page() {
  return <Client locale="id" />;
}
