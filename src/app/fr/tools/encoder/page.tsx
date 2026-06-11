import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("encoder", "fr")!;

export default function Page() {
  return <Client />;
}
