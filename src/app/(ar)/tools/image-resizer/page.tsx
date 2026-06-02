import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("image-resizer", "ar")!;

export default function Page() {
  return <Client />;
}
