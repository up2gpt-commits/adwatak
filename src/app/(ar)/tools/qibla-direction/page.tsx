import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("qibla-direction", "ar")!;

export default function Page() {
  return <Client />;
}
