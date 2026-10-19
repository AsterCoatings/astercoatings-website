import type { Doc, Certification } from '@/lib/content/schema';

/**
 * Document registry. Only `approved && public && status === 'published'` documents are linked,
 * listed or included in the sitemap. SDS are kept ungated as a matter of policy.
 * Files live in /public/documents with stable lowercase names.
 *
 * Empty until the owner supplies a technical data sheet and safety data sheet per product (C7).
 * Add one entry per document and reference its id from the product's `documents` field.
 */
export const documents: Doc[] = [];

/** Certifications registry (C8). Empty until evidence exists. */
export const certifications: Certification[] = [];
