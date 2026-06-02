import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("youtube-thumbnail-downloader", "tr")!;

export default function Page() {
  return <Client />;
}
