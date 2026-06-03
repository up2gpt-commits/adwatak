import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("random-number", "id")!;

export default function Page() {
  return <Client />;
}
