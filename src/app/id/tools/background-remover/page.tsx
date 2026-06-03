import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("background-remover", "id")!;

export default function Page() {
  return <Client />;
}
