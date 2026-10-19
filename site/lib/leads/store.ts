import { appendFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { InquiryType } from '@/lib/forms/schemas';

export type LeadStatus = 'received' | 'integrated' | 'needs-attention';

export interface LeadRecord {
  inquiryId: string;
  type: InquiryType;
  receivedAt: string;
  status: LeadStatus;
  fields: Record<string, unknown>;
  meta: { ipHash: string; userAgent: string | null; idempotencyKey: string | null };
  integration: {
    crm: 'ok' | 'failed' | 'skipped' | null;
    crmId: string | null;
    email: 'ok' | 'failed' | 'skipped' | null;
    error: string | null;
  };
}

export interface LeadStore {
  save(lead: LeadRecord): Promise<void>;
  update(inquiryId: string, patch: Partial<LeadRecord>): Promise<void>;
  findByIdempotencyKey(key: string): Promise<LeadRecord | null>;
  all(): Promise<LeadRecord[]>;
}

/**
 * Append-only JSONL store. Suitable for development and single-server hosting only:
 * serverless and multi-instance hosts have no durable local filesystem (technical-architecture.md §5).
 * Each update is appended as a full record; the latest line per inquiryId wins on read.
 */
export class JsonlLeadStore implements LeadStore {
  constructor(private readonly file = process.env.LEAD_STORE_PATH ?? './data/leads.jsonl') {}

  private async ensureDir() {
    await mkdir(path.dirname(path.resolve(this.file)), { recursive: true });
  }
  async save(lead: LeadRecord) {
    await this.ensureDir();
    await appendFile(this.file, JSON.stringify(lead) + '\n', 'utf8');
  }
  async update(inquiryId: string, patch: Partial<LeadRecord>) {
    const current = (await this.all()).find((l) => l.inquiryId === inquiryId);
    if (!current) throw new Error(`lead ${inquiryId} not found`);
    await this.save({
      ...current,
      ...patch,
      integration: { ...current.integration, ...(patch.integration ?? {}) },
    });
  }
  async all(): Promise<LeadRecord[]> {
    let text = '';
    try {
      text = await readFile(this.file, 'utf8');
    } catch {
      return [];
    }
    const byId = new Map<string, LeadRecord>();
    for (const line of text.split('\n')) {
      if (!line.trim()) continue;
      try {
        const rec = JSON.parse(line) as LeadRecord;
        byId.set(rec.inquiryId, rec);
      } catch {
        /* skip corrupt line */
      }
    }
    return [...byId.values()];
  }
  async findByIdempotencyKey(key: string) {
    return (await this.all()).find((l) => l.meta.idempotencyKey === key) ?? null;
  }
}

/** In-memory store for tests. */
export class MemoryLeadStore implements LeadStore {
  leads = new Map<string, LeadRecord>();
  failOnSave = false;
  async save(lead: LeadRecord) {
    if (this.failOnSave) throw new Error('store unavailable');
    this.leads.set(lead.inquiryId, structuredClone(lead));
  }
  async update(inquiryId: string, patch: Partial<LeadRecord>) {
    const cur = this.leads.get(inquiryId);
    if (!cur) throw new Error('not found');
    this.leads.set(inquiryId, {
      ...cur,
      ...patch,
      integration: { ...cur.integration, ...(patch.integration ?? {}) },
    });
  }
  async findByIdempotencyKey(key: string) {
    return [...this.leads.values()].find((l) => l.meta.idempotencyKey === key) ?? null;
  }
  async all() {
    return [...this.leads.values()];
  }
}

export class NoLeadStore implements LeadStore {
  async save(): Promise<void> {
    throw new Error('no durable lead store configured (LEAD_STORE=none)');
  }
  async update(): Promise<void> {
    throw new Error('no durable lead store configured (LEAD_STORE=none)');
  }
  async findByIdempotencyKey(): Promise<LeadRecord | null> {
    return null;
  }
  async all(): Promise<LeadRecord[]> {
    return [];
  }
}

export function createLeadStore(): LeadStore {
  const kind = process.env.LEAD_STORE ?? 'jsonl';
  if (kind === 'jsonl') return new JsonlLeadStore();
  // 'none': serverless host with no database yet. save() fails so the pipeline knows the lead is
  // not durably stored: the notification email is the record, and the submission is refused with a
  // 503 + fallback contact details if that email cannot be sent either.
  if (kind === 'none') return new NoLeadStore();
  throw new Error(
    `LEAD_STORE '${kind}' is not implemented; choose a durable store for this host (technical-architecture.md §8.4)`,
  );
}
