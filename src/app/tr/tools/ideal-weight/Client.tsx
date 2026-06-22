"use client";import StructuredData, { toolSchema } from "../../../components/StructuredData";import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";seoContent=[
  "Find your ideal weight based on height and age.",
  "Use proven formulas like Devine, Robinson.",
  "Check if you're in a healthy weight range.",
  "Set realistic fitness goals today.",
  "Free ideal body weight calculator online.",
];

export default function Client() {return (<div className="max-w-[760px] mx-auto"><StructuredData data={toolSchema("Çok Yakında", "Yeni araç", "https://adwatak.cloud/tr/tools/ideal-weight", "tr", "Araçlar")} /><Breadcrumb lang="tr" category="Araçlar" categorySlug="tools" toolName="Çok Yakında" /><div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6"><div className="text-center py-12"><span className="text-6xl">⏳</span><h1 className="text-2xl font-bold mt-4 mb-2">Çok Yakında</h1><p className="text-gray-500">Bu araç geliştirme aşamasındadır</p></div></div><ShareButtons lang="tr" /></div>);}