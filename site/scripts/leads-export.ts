/** Operator CLI: prints stored leads as CSV. Run on the server: npm run leads:export > leads.csv */
import { createLeadStore } from '../lib/leads/store';

const store = createLeadStore();
const leads = await store.all();
const cols = [
  'inquiryId',
  'type',
  'receivedAt',
  'status',
  'crm',
  'email',
  'name',
  'company',
  'emailAddress',
  'phone',
];
const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
console.log(cols.join(','));
for (const l of leads) {
  const f = l.fields as Record<string, unknown>;
  console.log(
    [
      l.inquiryId,
      l.type,
      l.receivedAt,
      l.status,
      l.integration.crm,
      l.integration.email,
      f.name,
      f.company,
      f.email,
      f.phone,
    ]
      .map(esc)
      .join(','),
  );
}
console.error(`${leads.length} lead(s)`);
