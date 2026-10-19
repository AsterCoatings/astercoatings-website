import { beforeEach, describe, expect, it, vi } from 'vitest';
import { processInquiry, type PipelineDeps } from '@/lib/inquiries/pipeline';
import { MemoryLeadStore, NoLeadStore } from '@/lib/leads/store';
import { MockCrmAdapter, NoCrmAdapter } from '@/lib/crm/adapter';
import { ConsoleEmailAdapter } from '@/lib/email/adapter';
import { RateLimiter } from '@/lib/security/rate-limit';

const good = () => ({
  name: 'Pat Example',
  company: 'Example Fabrication',
  email: 'pat@example.com',
  phone: '',
  application: 'Steel racking, interior warehouse',
  substrate: 'cold-rolled-steel',
  consent: 'on',
  website: '',
  ts: Date.now() - 10_000,
});

let deps: PipelineDeps & { store: MemoryLeadStore; crm: MockCrmAdapter; email: ConsoleEmailAdapter };
const ctx = { ip: '203.0.113.5', userAgent: 'test', idempotencyKey: null as string | null };

beforeEach(() => {
  vi.stubEnv('NODE_ENV', 'test');
  deps = {
    store: new MemoryLeadStore(),
    crm: new MockCrmAdapter(),
    email: new ConsoleEmailAdapter(),
    limiter: new RateLimiter(3, 60_000),
    recipients: { sales: 'sales@example.com', technical: 'tech@example.com', admin: 'admin@example.com' },
  };
});

describe('inquiry pipeline', () => {
  it('stores, integrates and confirms a valid quote', async () => {
    const r = await processInquiry('quote', good(), ctx, deps);
    expect(r.status).toBe(200);
    const [lead] = await deps.store.all();
    expect(lead?.status).toBe('integrated');
    expect(lead?.fields).not.toHaveProperty('website');
    expect(lead?.fields).not.toHaveProperty('consent');
    expect(deps.crm.calls).toHaveLength(1);
    expect(deps.email.sent.map((m) => m.to[0])).toEqual(['sales@example.com', 'pat@example.com']);
  });

  it('returns field errors for invalid input', async () => {
    const r = await processInquiry('quote', { ...good(), email: 'nope', application: '' }, ctx, deps);
    expect(r.status).toBe(400);
    if (r.status === 400) {
      expect(r.body.errors.email).toBeTruthy();
      expect(r.body.errors.application).toBeTruthy();
    }
    expect(await deps.store.all()).toHaveLength(0);
  });

  it('silently drops honeypot submissions', async () => {
    const r = await processInquiry('quote', { ...good(), website: 'http://spam' }, ctx, deps);
    expect(r.status).toBe(200);
    expect(await deps.store.all()).toHaveLength(0);
    expect(deps.crm.calls).toHaveLength(0);
  });

  it('rejects submissions faster than the minimum time', async () => {
    const r = await processInquiry('quote', { ...good(), ts: Date.now() }, ctx, deps);
    expect(r.status).toBe(400);
  });

  it('rate limits per IP', async () => {
    for (let i = 0; i < 3; i++) expect((await processInquiry('quote', good(), ctx, deps)).status).toBe(200);
    expect((await processInquiry('quote', good(), ctx, deps)).status).toBe(429);
    expect((await processInquiry('quote', good(), { ...ctx, ip: '198.51.100.9' }, deps)).status).toBe(200);
  });

  it('replays idempotently', async () => {
    const k = { ...ctx, idempotencyKey: 'abc' };
    const a = await processInquiry('quote', good(), k, deps);
    const b = await processInquiry('quote', good(), k, deps);
    expect(a.status).toBe(200);
    expect(b.status).toBe(200);
    if (a.status === 200 && b.status === 200) expect(b.body.inquiryId).toBe(a.body.inquiryId);
    expect(await deps.store.all()).toHaveLength(1);
  });

  it('keeps the lead and flags it when the CRM fails', async () => {
    deps.crm.mode = 'server-error';
    const r = await processInquiry(
      'technical',
      { ...good(), question: 'Which primer for galvanized?' },
      ctx,
      deps,
    );
    expect(r.status).toBe(200);
    const [lead] = await deps.store.all();
    expect(lead?.status).toBe('needs-attention');
    expect(lead?.integration.crm).toBe('failed');
    expect(deps.crm.calls.length).toBe(3); // retried
    expect(deps.email.sent.some((m) => m.to[0] === 'admin@example.com')).toBe(true);
    expect(deps.email.sent.some((m) => m.to[0] === 'tech@example.com')).toBe(true);
  });

  it('does not retry 4xx CRM errors', async () => {
    deps.crm.mode = 'client-error';
    await processInquiry('contact', { ...good(), subject: 'Hi', message: 'Hello' }, ctx, deps);
    expect(deps.crm.calls.length).toBe(1);
  });

  it('returns 503 with a fallback only when store, CRM and email all fail', async () => {
    deps.store.failOnSave = true;
    deps.crm.mode = 'timeout';
    deps.email.failNext = true;
    const r = await processInquiry('quote', good(), ctx, deps);
    expect(r.status).toBe(503);
  });

  it('still succeeds when the store fails but email works', async () => {
    deps.store.failOnSave = true;
    const r = await processInquiry('quote', good(), ctx, deps);
    expect(r.status).toBe(200);
  });

  it('serverless mode (no store, no CRM): the sales email is the record; 503 with fallback when it cannot be sent', async () => {
    const email = new ConsoleEmailAdapter();
    const live = { ...deps, store: new NoLeadStore(), crm: new NoCrmAdapter(), email };
    const ok = await processInquiry('quote', good(), ctx, live);
    expect(ok.status).toBe(200);
    const to = email.sent.map((m) => m.to[0]);
    expect(to).toContain('sales@example.com');
    expect(to).not.toContain('pat@example.com'); // no customer confirmation without a durable record

    email.failNext = true;
    const bad = await processInquiry('quote', good(), { ...ctx, ip: '203.0.113.9' }, live);
    expect(bad.status).toBe(503);
    expect((bad.body as { fallback?: unknown }).fallback).toBeDefined();
  });
});
