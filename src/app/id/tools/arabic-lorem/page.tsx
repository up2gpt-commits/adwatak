import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("arabic-lorem", "id")!;

export default function Page() {
  return <Client />;
}
