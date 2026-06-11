import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("encoder", "en")!;

export default function Page() {
  return <Client />;
}
