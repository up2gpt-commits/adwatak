import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("qr-generator", "ar")!;

export default function Page() {
  return <Client />;
}
