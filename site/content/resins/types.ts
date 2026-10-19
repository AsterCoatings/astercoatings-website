import type { Spec } from '@/lib/content/schema';

/**
 * Alkyd resin grades behind the Aster coatings. NOT rendered on the public site (owner decision
 * 2026-10-16: Aster sells finished coatings; the resins are the "formulated on" story). Kept as
 * reference data for sales and for a possible future Resins section; every value traces to a
 * Sunpol Resins technical data sheet.
 */
export interface Resin {
  id: string;
  slug: string;
  name: string;
  code: string;
  status: 'draft' | 'review' | 'published' | 'retired';
  availability: 'available' | 'in-development';
  categoryIds: string[];
  primaryCategoryId: string;
  systemType: 'water-reducible' | 'solvent-borne' | '100-solids' | 'other';
  shortDescription: string;
  description: string;
  applications: string[];
  oilTypes: string[];
  markets: string[];
  limitations: string[];
  specifications: Spec[];
  documents: { tds?: string; sds?: string; other: string[] };
  images: unknown[];
  relatedProductIds: string[];
  certifications: string[];
  /** INTERNAL. Never rendered. */
  internalCrossReference: { supplier: string; grade: string; note?: string }[];
  review: { reviewedBy: string | null; reviewedAt: string | null; source: string | null };
}
