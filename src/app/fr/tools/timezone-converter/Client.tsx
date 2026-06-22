"use client";
import StructuredData, { toolSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

seoContent=[
  "Convertissez l'heure instantanément entre tous les fuseaux horaires.",
  "Trouvez le décalage horaire exact dans le monde entier.",
  "Planifiez facilement des réunions entre continents.",
  "Prend en charge toutes les grandes villes et les décalages UTC.",
  "Outil de conversion de fuseau horaire en ligne gratuit.",
];

export default function Client() {
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Bientôt disponible", "New tool", "https://adwatak.cloud/fr/tools/timezone-converter", "fr", "Tools")} />
      <Breadcrumb lang="fr" category="Tools" categorySlug="tools" toolName="Bientôt disponible" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <div className="text-center py-12">
          <span className="text-6xl">⏳</span>
          <h1 className="text-2xl font-bold mt-4 mb-2">Bientôt disponible</h1>
          <p className="text-gray-500">This tool is under development</p>
        </div>
      </div>
      <ShareButtons lang="fr" />
    </div>
  );
}
