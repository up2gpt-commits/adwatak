import { generateToolMetadata, generateToolSchemas } from "@/app/lib/tool-metadata";
import StructuredData from "@/app/components/StructuredData";
import Client from "./Client";

export const metadata = generateToolMetadata("qibla-camera", "ar")!;

export default function Page() {
  const schemas = generateToolSchemas("qibla-camera", "ar");
  return (
    <>
      {schemas.map((schema, i) => (
        <StructuredData key={i} data={schema} />
      ))}
      <Client locale="ar" />
    </>
  );
}
