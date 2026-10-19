/**
 * Operator CLI: replays CRM/email integration for leads marked 'needs-attention'.
 * Safe to re-run: each lead keeps its inquiryId and is only retried while it still needs attention.
 */
import { createLeadStore } from '../lib/leads/store';
import { createCrmAdapter } from '../lib/crm/adapter';
import { createEmailAdapter } from '../lib/email/adapter';

const store = createLeadStore();
const crm = createCrmAdapter();
const email = createEmailAdapter();
const to = process.env.SALES_NOTIFICATION_EMAIL ?? null;

const pending = (await store.all()).filter((l) => l.status === 'needs-attention');
console.log(`leads-retry: ${pending.length} lead(s) need attention`);
for (const l of pending) {
  const f = l.fields as Record<string, string>;
  let crmOk = l.integration.crm === 'ok';
  let crmId = l.integration.crmId;
  let emailOk = l.integration.email === 'ok' || l.integration.email === 'skipped';
  if (!crmOk) {
    try {
      const r = await crm.createInquiry({
        inquiryId: l.inquiryId,
        type: l.type,
        contact: { name: f.name ?? '', email: f.email ?? '', phone: f.phone, company: f.company ?? '' },
        fields: l.fields,
        attribution: {},
      });
      crmOk = true;
      crmId = r.id;
    } catch (e) {
      console.error(`  ${l.inquiryId}: CRM still failing — ${(e as Error).message}`);
    }
  }
  if (!emailOk && to) {
    try {
      await email.send({
        to: [to],
        subject: `[Retry] ${l.type} inquiry from ${f.company}`,
        text: JSON.stringify(l.fields, null, 2),
      });
      emailOk = true;
    } catch (e) {
      console.error(`  ${l.inquiryId}: email still failing — ${(e as Error).message}`);
    }
  }
  await store.update(l.inquiryId, {
    status: crmOk && emailOk ? 'integrated' : 'needs-attention',
    integration: { crm: crmOk ? 'ok' : 'failed', crmId, email: emailOk ? 'ok' : 'failed', error: null },
  });
  console.log(`  ${l.inquiryId}: crm=${crmOk} email=${emailOk}`);
}
