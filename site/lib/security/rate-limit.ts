/**
 * Token-bucket rate limiter keyed by an opaque id (hashed IP). In-memory: correct for a single
 * server process; multi-instance hosts need a shared store (technical-architecture.md §5).
 */
export class RateLimiter {
  private buckets = new Map<string, { tokens: number; updated: number }>();
  constructor(
    private readonly max = Number(process.env.RATE_LIMIT_MAX_PER_IP ?? 5),
    private readonly windowMs = Number(process.env.RATE_LIMIT_WINDOW_SECONDS ?? 600) * 1000,
  ) {}

  /** Returns true if the request is allowed. */
  take(key: string, now = Date.now()): boolean {
    const refillPerMs = this.max / this.windowMs;
    const b = this.buckets.get(key) ?? { tokens: this.max, updated: now };
    b.tokens = Math.min(this.max, b.tokens + (now - b.updated) * refillPerMs);
    b.updated = now;
    if (b.tokens < 1) {
      this.buckets.set(key, b);
      return false;
    }
    b.tokens -= 1;
    this.buckets.set(key, b);
    // Opportunistic cleanup
    if (this.buckets.size > 10_000) {
      for (const [k, v] of this.buckets) if (now - v.updated > this.windowMs) this.buckets.delete(k);
    }
    return true;
  }
}

export async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
