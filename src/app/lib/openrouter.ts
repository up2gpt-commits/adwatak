/**
 * Shared OpenRouter client with model fallback chain.
 *
 * Tries free models first (cheap, no rate-limit budget), then paid models.
 * Designed for Adwatak's no-signup, free tools — prefer free endpoints
 * but degrade gracefully when upstream providers rate-limit us.
 */

export const OR_KEY = process.env.OPENROUTER_API_KEY || "";

/**
 * Free-text model chain. Order matters — first to succeed wins.
 * 1. deepseek-v4-flash — paid but very cheap, most reliable for JSON
 * 2. gpt-oss-20b — best free quality + supports json_object mode
 * 3. gemma-4-26b — alt free quality (sometimes rate-limited)
 * 4. nemotron-nano-9b — last free fallback
 */
const TEXT_MODELS = [
  "deepseek/deepseek-v4-flash",
  "openai/gpt-oss-20b:free",
  "google/gemma-4-26b-a4b-it:free",
  "nvidia/nemotron-nano-9b-v2:free",
];

/**
 * Vision-capable model chain (text + image + video).
 * 1. gemma-4-26b:free — best free vision
 * 2. nemotron-nano-12b-vl:free — alt free vision
 * 3. gemma-4-26b — paid fallback
 */
const VISION_MODELS = [
  "google/gemma-4-26b-a4b-it:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "google/gemma-4-26b-a4b-it",
];

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string | Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }>;
}

export interface ChatOptions {
  messages: ChatMessage[];
  vision?: boolean;
  jsonObject?: boolean;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface ChatResult {
  content: string;
  model: string;
  attempts: number;
}

export class AllProvidersFailedError extends Error {
  attempts: { model: string; status?: number; error: string }[];
  constructor(attempts: { model: string; status?: number; error: string }[]) {
    super("All model providers failed");
    this.attempts = attempts;
  }
}

/**
 * Call OpenRouter chat completions with a fallback chain.
 * Returns the first successful response.
 */
export async function chatCompletion(opts: ChatOptions): Promise<ChatResult> {
  const models = opts.vision ? VISION_MODELS : TEXT_MODELS;
  const attempts: { model: string; status?: number; error: string }[] = [];
  for (const model of models) {
    try {
      const content = await callOR(model, opts);
      if (content && content.trim().length > 0) {
        return { content, model, attempts: attempts.length + 1 };
      }
      attempts.push({ model, error: "empty response" });
    } catch (e: any) {
      attempts.push({ model, status: e?.status, error: e?.message || "unknown" });
    }
  }
  throw new AllProvidersFailedError(attempts);
}

async function callOR(model: string, opts: ChatOptions): Promise<string> {
  if (!OR_KEY) {
    const e: any = new Error("OPENROUTER_API_KEY not set");
    e.status = 0;
    throw e;
  }
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), opts.timeoutMs ?? 35000);
  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OR_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://adwatak.cloud",
        "X-Title": "Adwatak Tools",
      },
      body: JSON.stringify({
        model,
        messages: opts.messages,
        ...(opts.jsonObject ? { response_format: { type: "json_object" } } : {}),
        temperature: opts.temperature ?? 0.3,
        max_tokens: opts.maxTokens ?? 4096,
      }),
      signal: controller.signal,
    });
    if (!r.ok) {
      const e: any = new Error(`HTTP ${r.status}`);
      e.status = r.status;
      throw e;
    }
    const data = await r.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      // Some vision models return content parts
      return content
        .filter((p: any) => p?.type === "text")
        .map((p: any) => p.text)
        .join("\n");
    }
    return "";
  } finally {
    clearTimeout(t);
  }
}

/**
 * Robust JSON parser — tries multiple extraction strategies.
 * Handles: raw JSON, ```json ... ``` fences, embedded JSON in prose.
 */
export function parseJSON<T = any>(text: string): T | null {
  if (!text) return null;
  // 1. Try direct parse
  try {
    return JSON.parse(text);
  } catch {}
  // 2. Try stripping ```json fences
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) {
    try {
      return JSON.parse(fence[1].trim());
    } catch {}
  }
  // 3. Try to find the first JSON object/array in the text
  for (const delim of ["{", "["]) {
    const first = text.indexOf(delim);
    if (first < 0) continue;
    const closer = delim === "{" ? "}" : "]";
    const last = text.lastIndexOf(closer);
    if (last > first) {
      const candidate = text.slice(first, last + 1);
      try {
        return JSON.parse(candidate);
      } catch {}
    }
  }
  return null;
}
