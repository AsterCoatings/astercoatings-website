import { z } from 'zod';
import { fieldErrors, schemas, type InquiryType } from '@/lib/forms/schemas';
import type { LeadRecord, LeadStore } from '@/lib/leads/store';
import type { CrmAdapter } from '@/lib/crm/adapter';
import type { EmailAdapter } from '@/lib/email/adapter';
import { RateLimiter, sha256 } from '@/lib/security/rate-limit';
import { site } from '@/content/site.config';

export interface PipelineDeps {
  store: LeadStore;
  crm: CrmAdapter;
  email: EmailAdapter;
  limiter: RateLimiter;
  now?: () => number;
  log?: (event: Record<string, unknown>) => void;
  recipients?: { sales: string | null; technical: string | null; admin: string | null };
}

export type PipelineResult =
  | { status: 400; body: { ok: false; errors: Record<string, string> } }
  | { status: 429; body: { ok: false; errors: { _form: string } } }
  | { status: 200; body: { ok: true; inquiryId: string; replay?: true } }
  | {
      status: 503;
      body: {
        ok: false;
        errors: { _form: string };
        fallback: { phone: string | null; email: string | null };
      };
    };

const MIN_MS = Number(process.env.MIN_SECONDS_TO_SUBMIT ?? 3) * 1000;

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  let t: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, rej) => {
    t = setTimeout(() => rej(Object.assign(new Error('timeout'), { retryable: true })), ms);
  });
  try {
    return await Promise.race([p, timeout]);
  } finally {
    clearTimeout(t);
  }
}

async function retry<T>(fn: () => Promise<T>, attempts: number): Promise<T> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      const retryable = (e as { retryable?: boolean })?.retryable ?? false;
      if (!retryable) throw e;
      await new Promise((r) => setTimeout(r, 25 * (i + 1) + Math.random() * 25));
    }
  }
  throw last;
}

/**
 * The inquiry pipeline (technical-architecture.md §8.4). Durable store first, then integrations,
 * then a truthful response. Never throws for integration failures; the lead is kept and flagged.
 */
export async function processInquiry(
  type: InquiryType,
  raw: Record<string, unknown>,
  ctx: { ip: string; userAgent: string | null; idempotencyKey: string | null },
  deps: PipelineDeps,
): Promise<PipelineResult> {
  const now = deps.now ?? Date.now;
  const log = deps.log ?? (() => {});
  const recipients = deps.recipients ?? {
    sales: process.env.SALES_NOTIFICATION_EMAIL ?? null,
    technical: process.env.TECHNICAL_NOTIFICATION_EMAIL ?? null,
    admin: process.env.ADMIN_ALERT_EMAIL ?? null,
  };

  // 1. validate
  const parsed = schemas[type].safeParse(raw);
  if (!parsed.success) return { status: 400, body: { ok: false, errors: fieldErrors(parsed.error) } };
  const data = parsed.data;

  // 2. anti-abuse
  const ipHash = (await sha256(ctx.ip)).slice(0, 32);
  if (data.website && data.website.length > 0) {
    log({ event: 'honeypot', type });
    // Pretend success so bots learn nothing; nothing is stored.
    return { status: 200, body: { ok: true, inquiryId: crypto.randomUUID() } };
  }
  if (now() - data.ts < MIN_MS) {
    return {
      status: 400,
      body: { ok: false, errors: { _form: 'That was quick — please check the form and send again.' } },
    };
  }
  if (!deps.limiter.take(ipHash, now())) {
    log({ event: 'rate_limited', type, ipHash });
    return {
      status: 429,
      body: {
        ok: false,
        errors: { _form: 'Too many submissions from this connection. Please try again later or call us.' },
      },
    };
  }
  if (ctx.idempotencyKey) {
    const existing = await deps.store.findByIdempotencyKey(ctx.idempotencyKey).catch(() => null);
    if (existing) return { status: 200, body: { ok: true, inquiryId: existing.inquiryId, replay: true } };
  }

  // 3. assign id, build record
  const inquiryId = crypto.randomUUID();
  const { website: _hp, ts: _ts, consent: _c, ...fields } = data as Record<string, unknown>;
  const lead: LeadRecord = {
    inquiryId,
    type,
    receivedAt: new Date(now()).toISOString(),
    status: 'received',
    fields,
    meta: { ipHash, userAgent: ctx.userAgent, idempotencyKey: ctx.idempotencyKey },
    integration: { crm: null, crmId: null, email: null, error: null },
  };

  // 4. durable store first
  let stored = true;
  try {
    await deps.store.save(lead);
  } catch (e) {
    stored = false;
    log({ event: 'store_failed', inquiryId, error: (e as Error).message });
  }

  // 5. CRM
  let crmOk = false;
  let crmId: string | null = null;
  let crmError: string | null = null;
  try {
    const r = await retry(
      () =>
        withTimeout(
          deps.crm.createInquiry({
            inquiryId,
            type,
            contact: {
              name: String(data.name),
              email: String(data.email),
              phone: data.phone || undefined,
              company: String(data.company),
            },
            fields,
            attribution: {
              landingPage: data.landingPage || undefined,
              referrer: data.referrer || undefined,
              utm: data.utm || undefined,
              productId: data.productId || undefined,
            },
          }),
          8000,
        ),
      3,
    );
    crmOk = true;
    crmId = r.id;
  } catch (e) {
    crmError = (e as Error).message;
    log({ event: 'crm_failed', inquiryId, step: 'createInquiry', error: crmError });
  }

  // 6. internal notification
  const to = (type === 'technical' ? recipients.technical : recipients.sales) ?? recipients.sales;
  let emailOk = false;
  let emailError: string | null = null;
  if (to) {
    try {
      await withTimeout(
        deps.email.send({
          to: [to],
          subject: `[${site.brand.shortName}] New ${type} inquiry from ${data.company}`,
          replyTo: String(data.email),
          text: renderInternalEmail(
            type,
            inquiryId,
            fields,
            crmOk ? 'recorded in CRM' : `CRM failed: ${crmError ?? 'unknown'}`,
          ),
        }),
        8000,
      );
      emailOk = true;
    } catch (e) {
      emailError = (e as Error).message;
      log({ event: 'email_failed', inquiryId, error: emailError });
    }
  } else {
    log({ event: 'email_skipped', inquiryId, reason: 'no recipient configured (E1/E2)' });
  }

  // 7. customer confirmation (only if we have a durable record and the notification went somewhere)
  if (stored && (crmOk || emailOk)) {
    try {
      await deps.email.send({
        to: [String(data.email)],
        subject: `We received your ${{ quote: 'quote request', sample: 'sample request', technical: 'technical inquiry', contact: 'message' }[type]} — ${site.brand.name}`,
        text: `Thank you. We have received your ${type} inquiry (reference ${inquiryId.slice(0, 8)}). We will reply by email.${site.contact.salesPhone ? ` If it is urgent, call ${site.contact.salesPhone}.` : ''}\n\n${site.brand.name}`,
      });
    } catch (e) {
      log({ event: 'confirmation_failed', inquiryId, error: (e as Error).message });
    }
  }

  // 8/9. record outcome
  const needsAttention = !crmOk || !emailOk;
  if (stored) {
    await deps.store
      .update(inquiryId, {
        status: needsAttention ? 'needs-attention' : 'integrated',
        integration: {
          crm: crmOk ? 'ok' : 'failed',
          crmId,
          email: to ? (emailOk ? 'ok' : 'failed') : 'skipped',
          error: crmError ?? emailError,
        },
      })
      .catch((e) => log({ event: 'store_update_failed', inquiryId, error: (e as Error).message }));
  }
  if (needsAttention && recipients.admin) {
    deps.email
      .send({
        to: [recipients.admin],
        subject: `[${site.brand.shortName}] Inquiry ${inquiryId.slice(0, 8)} needs attention`,
        text: `crm=${crmOk} email=${emailOk} stored=${stored}\n${crmError ?? ''}\n${emailError ?? ''}`,
      })
      .catch(() => {});
  }

  if (!stored && !emailOk && !crmOk) {
    return {
      status: 503,
      body: {
        ok: false,
        errors: { _form: 'We could not record your request just now. Please call or email us directly.' },
        fallback: { phone: site.contact.salesPhone, email: site.contact.salesEmail },
      },
    };
  }
  return { status: 200, body: { ok: true, inquiryId } };
}

function renderInternalEmail(
  type: InquiryType,
  inquiryId: string,
  fields: Record<string, unknown>,
  integrationNote: string,
) {
  const lines = Object.entries(fields)
    .filter(([, v]) => v !== '' && v !== undefined && v !== null)
    .map(([k, v]) => `${k}: ${String(v)}`);
  return `New ${type} inquiry\nReference: ${inquiryId}\nIntegration: ${integrationNote}\n\n${lines.join('\n')}\n`;
}

export const inquiryTypeSchema = z.enum(['quote', 'sample', 'technical', 'contact']);
