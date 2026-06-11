import { generateToolMetadata, generateToolSchemas } from "@/app/lib/tool-metadata";
import StructuredData from "@/app/components/StructuredData";
import Client from "./Client";

export const metadata = generateToolMetadata("date-duration", "fr")!;

export default function Page() {
  const schemas = generateToolSchemas("date-duration", "fr");
  return (
    <>
      {schemas.map((schema, i) => (
        <StructuredData key={i} data={schema} />
      ))}
      <Client />
    </>
  );
}
