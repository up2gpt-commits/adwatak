import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("pdf-splitter", "en")!;

export default function Page() {
  return <Client />;
}
