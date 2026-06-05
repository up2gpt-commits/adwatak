import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("temperature-converter", "ar")!;

export default function Page() {
  return <Client />;
}
