"use client";
import StructuredData, { toolSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

seoContent=[
  "Convertissez les pixels en cm, pouces et plus.",
  "Ajustez avec précision pour le DPI d'écran ou d'impression.",
  "Parfait pour les designers et développeurs.",
  "Calculez les dimensions d'image en unités réelles.",
  "Convertisseur gratuit de pixels en taille physique.",
];

export default function Client() {
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Bientôt disponible", "New tool", "https://adwatak.cloud/fr/tools/pixel-converter", "fr", "Tools")} />
      <Breadcrumb lang="fr" category="Tools" categorySlug="tools" toolName="Prochainement" />
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
