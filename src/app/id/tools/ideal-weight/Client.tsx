"use client";
import StructuredData, { toolSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

export default function Client() {
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Segera Hadir", "New tool", "https://adwatak.cloud/id/tools/ideal-weight", "id", "Tools")} />
      <Breadcrumb lang="id" category="Tools" categorySlug="tools" toolName="Segera Hadir" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <div className="text-center py-12">
          <span className="text-6xl">⏳</span>
          <h1 className="text-2xl font-bold mt-4 mb-2">Segera Hadir</h1>
          <p className="text-gray-500">Alat ini sedang dalam pengembangan</p>
        </div>
      </div>
      <ShareButtons lang="id" />
    </div>
  );
}
