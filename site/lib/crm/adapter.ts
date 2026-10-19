import type { InquiryType } from '@/lib/forms/schemas';

export interface CrmInquiry {
  inquiryId: string;
  type: InquiryType;
  contact: { name: string; email: string; phone?: string; company: string };
  fields: Record<string, unknown>;
  attribution: { landingPage?: string; referrer?: string; utm?: string; productId?: string };
}

export interface CrmAdapter {
  readonly name: string;
  createInquiry(input: CrmInquiry): Promise<{ id: string }>;
  health(): Promise<'ok' | 'degraded' | 'unconfigured'>;
}

/** Production without a CRM: refuses every call so the lead is never counted as 'recorded in CRM'. */
export class NoCrmAdapter implements CrmAdapter {
  readonly name = 'none';
  async createInquiry(): Promise<{ id: string }> {
    throw new Error('no CRM configured (CRM_PROVIDER=none)');
  }
  async health() {
    return 'unconfigured' as const;
  }
}

/** Records calls; can simulate failure modes for tests. Used whenever CRM_PROVIDER is not configured. */
export class MockCrmAdapter implements CrmAdapter {
  readonly name = 'mock';
  calls: CrmInquiry[] = [];
  mode: 'ok' | 'timeout' | 'server-error' | 'client-error' = 'ok';
  async createInquiry(input: CrmInquiry) {
    this.calls.push(input);
    if (this.mode === 'timeout')
      await new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 50));
    if (this.mode === 'server-error')
      throw Object.assign(new Error('503 upstream'), { status: 503, retryable: true });
    if (this.mode === 'client-error')
      throw Object.assign(new Error('400 invalid property'), { status: 400, retryable: false });
    return { id: `mock-${input.inquiryId}` };
  }
  async health() {
    return 'ok' as const;
  }
}

export function createCrmAdapter(): CrmAdapter {
  const provider = process.env.CRM_PROVIDER ?? 'mock';
  // 'none': no CRM yet. Every call fails loudly so the pipeline never treats a lead as recorded
  // anywhere but the notification email (and the durable store, when one exists).
  if (provider === 'none') return new NoCrmAdapter();
  if (provider === 'mock') return new MockCrmAdapter();
  if (provider === 'hubspot') {
    // Implemented in Increment 5 once portal decisions (E5, F4) and credentials exist.
    throw new Error('HubSpot adapter is not implemented yet (implementation-plan.md Increment 5)');
  }
  throw new Error(`Unknown CRM_PROVIDER '${provider}'`);
}
