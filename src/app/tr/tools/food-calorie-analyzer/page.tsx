import { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Fotoğrafla Kalori Analizi — Yemeğin Kalorisini Fotoğrafını Çekerek Öğren",
  description:
    "Ücretsiz yapay zeka destekli kalori analiz aracı. Yemeğinizin fotoğrafını çekin, anında kalori, protein, karbonhidrat ve yağ detaylarını alın.",
  alternates: {
    canonical: "https://adwatak.cloud/tr/tools/food-calorie-analyzer",
  },
  openGraph: {
    title: "Fotoğrafla Kalori Analizi — Adwatak",
    description:
      "Yemeğinizin fotoğrafını çekin ve anında ücretsiz kalori analizi alın.",
  },
};

export default function Page() {
  return <Client />;
}
