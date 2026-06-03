import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("text-compare", "id")!;

export default function Page() {
  return <Client />;
}
