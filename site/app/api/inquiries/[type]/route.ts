import { NextResponse } from 'next/server';
import { processInquiry, inquiryTypeSchema, type PipelineDeps } from '@/lib/inquiries/pipeline';
import { createLeadStore } from '@/lib/leads/store';
import { createCrmAdapter } from '@/lib/crm/adapter';
import { createEmailAdapter } from '@/lib/email/adapter';
import { RateLimiter } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// One set of adapters per server process.
let deps: PipelineDeps | null = null;
function getDeps(): PipelineDeps {
  if (!deps) {
    deps = {
      store: createLeadStore(),
      crm: createCrmAdapter(),
      email: createEmailAdapter(),
      limiter: new RateLimiter(),
      log: (e) => console.info('[inquiries]', JSON.stringify(e)),
    };
  }
  return deps;
}

const MAX_BODY = 64 * 1024;

function sameOrigin(req: Request) {
  const site = req.headers.get('sec-fetch-site');
  if (site && site !== 'same-origin' && site !== 'none') return false;
  const origin = req.headers.get('origin');
  if (!origin) return true; // non-browser or no-JS form posts on older UAs; still protected by honeypot/time/rate limit
  const host = req.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ type: string }> }) {
  const { type: rawType } = await params;
  const type = inquiryTypeSchema.safeParse(rawType);
  if (!type.success)
    return NextResponse.json({ ok: false, errors: { _form: 'Unknown inquiry type.' } }, { status: 404 });
  if (!sameOrigin(req))
    return NextResponse.json(
      { ok: false, errors: { _form: 'Cross-site request rejected.' } },
      { status: 403 },
    );

  const len = Number(req.headers.get('content-length') ?? 0);
  if (len > MAX_BODY)
    return NextResponse.json({ ok: false, errors: { _form: 'Request too large.' } }, { status: 413 });

  const contentType = req.headers.get('content-type') ?? '';
  let raw: Record<string, unknown> = {};
  try {
    if (contentType.includes('application/json')) raw = (await req.json()) as Record<string, unknown>;
    else {
      const fd = await req.formData();
      for (const [k, v] of fd.entries()) if (typeof v === 'string') raw[k] = v;
    }
  } catch {
    return NextResponse.json({ ok: false, errors: { _form: 'Could not read the form.' } }, { status: 400 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  const result = await processInquiry(
    type.data,
    raw,
    { ip, userAgent: req.headers.get('user-agent'), idempotencyKey: req.headers.get('idempotency-key') },
    getDeps(),
  );

  // No-JS form posts expect a redirect to the thank-you page; JS clients get JSON.
  const wantsHtml =
    !contentType.includes('application/json') && (req.headers.get('accept') ?? '').includes('text/html');
  if (wantsHtml) {
    const bases = { quote: 'request-a-quote', sample: 'request-a-sample', technical: 'technical-inquiry', contact: 'contact' } as const;
    const base = `/${bases[type.data]}`;
    if (result.status === 200) return NextResponse.redirect(new URL(`${base}/thank-you`, req.url), 303);
    const q = new URLSearchParams({
      error: result.body.errors._form ?? 'Please check the highlighted fields.',
    });
    return NextResponse.redirect(new URL(`${base}?${q}`, req.url), 303);
  }
  return NextResponse.json(result.body, { status: result.status });
}
