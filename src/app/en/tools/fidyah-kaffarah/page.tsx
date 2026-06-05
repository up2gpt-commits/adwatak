import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("fidyah-kaffarah", "en")!;

export default function Page() {
  return <Client />;
}
