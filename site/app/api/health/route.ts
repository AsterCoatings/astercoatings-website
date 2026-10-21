import { NextResponse } from 'next/server';
import { site } from '@/content/site.config';

export const dynamic = 'force-dynamic';

/**
 * Public health endpoint for the weekly site check. Reports configuration *presence* only — never
 * values — so it can be read by a monitor without exposing anything.
 */
export function GET() {
  const email = process.env.EMAIL_PROVIDER ?? 'console';
  const emailConfigured =
    (email === 'formspree' && Boolean(process.env.FORMSPREE_FORM_ID)) ||
    (email === 'resend' && Boolean(process.env.RESEND_API_KEY)) ||
    (email === 'smtp' && Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS));
  return NextResponse.json(
    {
      ok: true,
      brand: site.brand.name,
      time: new Date().toISOString(),
      deployment: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? process.env.VERCEL_DEPLOYMENT_ID ?? null,
      production: process.env.ASTER_ENV === 'production',
      indexing: process.env.ALLOW_INDEXING === 'true',
      forms: {
        emailProvider: email,
        emailConfigured,
        recipientConfigured: Boolean(process.env.SALES_NOTIFICATION_EMAIL),
        crm: process.env.CRM_PROVIDER ?? 'mock',
        leadStore: process.env.LEAD_STORE ?? 'jsonl',
      },
      contact: { phone: Boolean(site.contact.salesPhone), email: Boolean(site.contact.salesEmail) },
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
