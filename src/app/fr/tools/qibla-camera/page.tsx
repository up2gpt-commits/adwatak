import Client from "./Client";

export const metadata = {
  title: "Qibla Camera Finder | Adwatak",
  description:
    "Point your phone camera to find Qibla direction in real-time — interactive AR that reveals the Kaaba when aligned correctly",
  openGraph: {
    title: "Qibla Camera Finder — Live AR",
    description:
      "Use your phone camera to find Qibla direction. Interactive AR compass that shows the Kaaba when correctly aligned.",
  },
};

export default function Page() {
  return <Client locale="fr" />;
}
