import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("timezone-converter", "en")!;

export default function Page() {
  return <Client />;
}
