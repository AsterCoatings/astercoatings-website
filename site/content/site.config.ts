/**
 * Site configuration — the single source of business identity.
 *
 * Rules:
 *  - `null` means "not yet supplied by the owner". It is never rendered as a value.
 *    In development it renders as a visible placeholder; in production (ASTER_ENV=production)
 *    the element is omitted, and `scripts/check-config.ts --strict` fails the build if a field
 *    marked `required: 'block'` is still null.
 *  - Every string here is a public claim. Add nothing that is not verified (see docs/initial-requirements.md).
 */

export type Requirement = 'block' | 'pub' | 'later';

export interface SiteConfig {
  brand: {
    name: string;
    shortName: string;
    legalSuffix: string | null; // e.g. "LLC" — A3
    tagline: string | null; // approved one-line descriptor — A8
    description: string | null; // approved one-paragraph description — A8
  };
  legal: { entityName: string | null; jurisdiction: string | null };
  contact: {
    salesPhone: string | null; // A6
    salesEmail: string | null; // A6
    technicalEmail: string | null; // A6
    address: { street: string; city: string; region: string; postalCode: string; country: string } | null; // A5
    hours: string | null; // A9
    publishAddress: boolean;
  };
  regions: { served: string[]; shippingNote: string | null };
  urls: { site: string; canonicalHost: string | null; redirectHosts: string[] };
  social: { linkedin: string | null; youtube: string | null; x: string | null };
  relationships: { sunpol: { disclose: boolean; text: string | null } };
  features: {
    quoteAttachments: boolean;
    analytics: boolean;
    selector: boolean;
    colorLibrary: boolean;
    responseTimeCommitment: string | null; // E4, e.g. "one business day"
  };
}

export const site: SiteConfig = {
  brand: {
    name: 'Aster Industrial Coatings',
    shortName: 'Aster',
    legalSuffix: null,
    tagline: 'Industrial alkyd coatings for steel fabrication', // from approved home copy, 2026-10-20
    description:
      'Aster Industrial Coatings makes water-reducible and short oil alkyd primers and topcoats for steel fabrication, built on its own alkyd resin and manufactured in California, Kentucky, Michigan and Texas. Custom formulation, colour matching and toll manufacturing.',
  },
  legal: { entityName: 'Aster Industrial Coatings', jurisdiction: null }, // A3 — owner, 2026-10-20
  contact: {
    salesPhone: '888-655-6557', // A6 — owner, 2026-10-19: dedicated Aster toll-free number
    salesEmail: 'sales@astercoatings.net', // A6 — owner, 2026-10-19 (given as "Sales@astercoaings.net"; spelling corrected to the registered domain)
    technicalEmail: null,
    address: null, // A5 — owner, 2026-10-19: no address published (the Sunpol address was removed from the site)
    hours: null,
    publishAddress: false,
  },
  regions: { served: ['US'], shippingNote: null },
  urls: {
    // Owner, 2026-10-19 (F1): astercoatings.net is the main domain; asterpaint.net redirects to it.
    // Both are registered at GoDaddy. In production NEXT_PUBLIC_SITE_URL is https://astercoatings.net.
    site: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    canonicalHost: 'astercoatings.net',
    redirectHosts: ['www.astercoatings.net', 'asterpaint.net', 'www.asterpaint.net'],
  },
  social: { linkedin: null, youtube: null, x: null },
  relationships: { sunpol: { disclose: false, text: null } },
  features: {
    quoteAttachments: false,
    analytics: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
    selector: false,
    colorLibrary: false,
    responseTimeCommitment: null,
  },
};

/** Which fields must be set before a production build is allowed. Keyed by dotted path. */
export const requirements: Record<string, { level: Requirement; question: string }> = {
  'brand.tagline': { level: 'pub', question: 'A8' },
  'brand.description': { level: 'pub', question: 'A8' },
  'legal.entityName': { level: 'block', question: 'A3' },
  'contact.salesPhone': { level: 'block', question: 'A6' },
  'contact.salesEmail': { level: 'block', question: 'A6' },
  'contact.technicalEmail': { level: 'pub', question: 'A6' },
  'contact.address': { level: 'later', question: 'A5' }, // owner decided: no street address on the site (2026-10-19)
  'contact.hours': { level: 'later', question: 'A9' },
  'urls.canonicalHost': { level: 'block', question: 'F1' },
  'social.linkedin': { level: 'later', question: 'A10' },
};

export const isProduction = process.env.ASTER_ENV === 'production';
