import { generateToolMetadata, generateToolSchemas } from "@/app/lib/tool-metadata";
import StructuredData from "@/app/components/StructuredData";
import Client from "./Client";

export const metadata = generateToolMetadata("salary-calculator", "ar")!;

export default function Page() {
  const schemas = generateToolSchemas("salary-calculator", "ar");
  return (
    <>
      {schemas.map((schema, i) => (
        <StructuredData key={i} data={schema} />
      ))}
      <Client />
    </>
  );
}
