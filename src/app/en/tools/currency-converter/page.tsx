import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("currency-converter", "en")!;

export default function Page() {
  return <Client />;
}
