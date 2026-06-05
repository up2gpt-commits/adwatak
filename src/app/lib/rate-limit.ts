/**
 * In-memory rate limiter for API routes.
 *
 * NOTE: Vercel serverless functions can run in multiple instances,
 * so this is best-effort — not perfectly accurate at scale. But it
 * catches most casual abuse (a script hitting the endpoint 100x/min
 * from one IP) without needing Redis.
 *
 * For production-grade: swap to Upstash Redis.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Cleanup old buckets every 5 min
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (v.resetAt < now) buckets.delete(k);
  }
}, 5 * 60 * 1000).unref?.();

export interface RateLimitOptions {
  /** Identifier (usually IP) */
  key: string;
  /** Max requests per window */
  max: number;
  /** Window length in seconds */
  windowSec: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // seconds
  limit: number;
}

export function rateLimit(opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const k = opts.key;
  const bucket = buckets.get(k);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(k, { count: 1, resetAt: now + opts.windowSec * 1000 });
    return {
      allowed: true,
      remaining: opts.max - 1,
      resetIn: opts.windowSec,
      limit: opts.max,
    };
  }

  bucket.count += 1;
  const allowed = bucket.count <= opts.max;
  return {
    allowed,
    remaining: Math.max(0, opts.max - bucket.count),
    resetIn: Math.max(0, Math.ceil((bucket.resetAt - now) / 1000)),
    limit: opts.max,
  };
}

/** Get the client IP from a NextRequest, with fallbacks */
export function getClientIp(req: { headers: Headers }): string {
  // Vercel sets x-forwarded-for
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || "unknown";
}
