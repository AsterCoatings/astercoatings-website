import { z } from 'zod';

/** Stable id: lowercase, hyphenated. */
export const idSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'ids and slugs must be lowercase, hyphenated');

export const statusSchema = z.enum(['draft', 'review', 'published', 'retired']);

export const taxonomyEntrySchema = z.object({
  id: idSchema,
  slug: idSchema,
  name: z.string().min(2),
  shortDescription: z.string().min(10),
  description: z.string().nullable().default(null),
  /** Optional parent grouping (used for product families: 'water-based' | 'solvent-borne'). */
  group: z.string().optional(),
  status: statusSchema.default('published'),
});
export type TaxonomyEntry = z.infer<typeof taxonomyEntrySchema>;

/**
 * A specification row. `state` distinguishes "we do not know" from "zero" from "not applicable".
 * Templates render: unknown → "Not specified" (draft mode only), not-applicable → "N/A",
 * confirmed-zero → "0 <unit>", value → the value.
 */
export const specSchema = z
  .object({
    key: z.string().min(1),
    label: z.string().min(1),
    value: z.union([z.number(), z.string()]).nullable().default(null),
    unit: z.string().optional(),
    method: z.string().optional(),
    note: z.string().optional(),
    state: z.enum(['value', 'unknown', 'not-applicable', 'confirmed-zero']),
  })
  .refine((s) => (s.state === 'value' ? s.value !== null && s.value !== '' : true), {
    message: "state 'value' requires a non-empty value",
  })
  .refine((s) => (s.state === 'confirmed-zero' ? s.value === 0 : true), {
    message: "state 'confirmed-zero' requires value 0",
  });
export type Spec = z.infer<typeof specSchema>;

export const packagingSchema = z.object({ label: z.string().min(1), note: z.string().optional() });

export const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(3),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  rights: z.string().min(3), // who owns it / licence; required so nothing unapproved slips in
});

export const productSchema = z.object({
  id: idSchema,
  slug: idSchema,
  name: z.string().min(2),
  code: z.string().optional(),
  status: statusSchema,
  categoryIds: z.array(idSchema).min(1),
  primaryCategoryId: idSchema,
  /** Carrier technology. */
  systemType: z.enum(['water-reducible', 'solvent-borne', 'other']).optional(),
  /** What the coating does in the system. */
  function: z.enum(['primer', 'topcoat', 'primer-topcoat']).optional(),
  /** 'in-development' products are listed (draft) so buyers can ask, but carry no specification. */
  availability: z.enum(['available', 'in-development']).default('available'),
  /** The alkyd resin the coating is formulated on (Aster/Sunpol grade), as a plain statement. */
  baseResin: z.string().optional(),
  shortDescription: z.string().min(10),
  description: z.string().min(20), // Markdown subset (paragraphs, lists)
  applications: z.array(idSchema).default([]), // application methods
  substrates: z.array(idSchema).default([]),
  industries: z.array(idSchema).default([]),
  /**
   * INTERNAL. Competitor products this one is positioned against, for sales use only.
   * Never rendered on the site: "equivalent to" is a claim that needs substantiation and
   * naming another supplier's trademark publicly is a legal decision for the owner.
   */
  internalCrossReference: z
    .array(z.object({ supplier: z.string().min(1), grade: z.string().min(1), note: z.string().optional() }))
    .default([]),
  limitations: z.array(z.string().min(3)).default([]),
  specifications: z.array(specSchema).default([]),
  packaging: z.array(packagingSchema).optional(),
  documents: z.object({
    tds: idSchema.optional(),
    sds: idSchema.optional(),
    other: z.array(idSchema).default([]),
  }),
  images: z.array(imageSchema).default([]),
  relatedProductIds: z.array(idSchema).default([]),
  certifications: z.array(idSchema).default([]),
  seo: z
    .object({ title: z.string().max(60).optional(), description: z.string().max(160).optional() })
    .optional(),
  review: z.object({
    reviewedBy: z.string().nullable(),
    reviewedAt: z.string().nullable(),
    source: z.string().nullable(),
  }),
});
export type Product = z.infer<typeof productSchema>;

export const documentSchema = z.object({
  id: idSchema,
  productIds: z.array(idSchema).default([]),
  type: z.enum(['TDS', 'SDS', 'guide', 'brochure', 'certificate']),
  title: z.string().min(3),
  revision: z.string().min(1),
  revisedAt: z.string().min(4),
  file: z
    .string()
    .regex(/^\/documents\/[a-z0-9\-]+\.pdf$/, 'documents live in /public/documents as lowercase pdf'),
  sizeBytes: z.number().int().nonnegative().nullable().default(null),
  approved: z.boolean(),
  approvedBy: z.string().nullable().default(null),
  approvedAt: z.string().nullable().default(null),
  public: z.boolean(),
  status: statusSchema.default('draft'),
});
export type Doc = z.infer<typeof documentSchema>;

export const certificationSchema = z.object({
  id: idSchema,
  name: z.string().min(2),
  issuer: z.string().min(2),
  evidence: z.string().min(3), // reference to the evidence document or record (C8)
  status: statusSchema.default('draft'),
});
export type Certification = z.infer<typeof certificationSchema>;
