import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("markdown-editor", "ar")!;

export default function Page() {
  return <Client />;
}
