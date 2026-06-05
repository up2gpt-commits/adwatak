import { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Analisis Kalori Makanan dari Foto — Hitung Kalori dengan Foto",
  description:
    "Alat analisis kalori makanan berbasis AI gratis. Foto makanan Anda dan dapatkan detail kalori, protein, karbohidrat, dan lemak secara instan.",
  alternates: {
    canonical: "https://adwatak.cloud/id/tools/food-calorie-analyzer",
  },
  openGraph: {
    title: "Analisis Kalori Makanan — Adwatak",
    description:
      "Foto makanan Anda dan dapatkan analisis kalori & nutrisi instan secara gratis.",
  },
};

export default function Page() {
  return <Client />;
}
