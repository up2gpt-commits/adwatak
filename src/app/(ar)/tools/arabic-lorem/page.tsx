import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("arabic-lorem", "ar")!;

export default function Page() {
  return <Client />;
}
