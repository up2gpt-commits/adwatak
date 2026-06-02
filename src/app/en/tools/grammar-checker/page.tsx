import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("grammar-checker", "en")!;

export default function Page() {
  return <Client />;
}
