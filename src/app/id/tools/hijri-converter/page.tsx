import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("hijri-converter", "id")!;

export default function Page() {
  return <Client />;
}
