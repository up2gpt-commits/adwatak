import { generateToolMetadata, generateToolSchemas } from "@/app/lib/tool-metadata";
import StructuredData from "@/app/components/StructuredData";
import Client from "./Client";

export const metadata = generateToolMetadata("seo-content-generator", "fr")!;

export default function Page() {
  const schemas = generateToolSchemas("seo-content-generator", "fr");
  return (
    <>
      {schemas.map((schema, i) => (
        <StructuredData key={i} data={schema} />
      ))}
      <Client />
    </>
  );
}
