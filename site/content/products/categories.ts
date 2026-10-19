import type { TaxonomyEntry } from '@/lib/content/schema';

/**
 * Product families, grouped by carrier technology the way buyers compare them (Trinkote-style:
 * Water-based / Solvent-borne → chemistry family → primer and topcoat). Family copy that makes
 * claims (application methods, cure, end uses) lives in `content/messaging.ts` under `families`
 * so it carries the approved/unapproved flag; the text here is descriptive only.
 */
export const categories: TaxonomyEntry[] = [
  {
    id: 'water-reducible-alkyd',
    slug: 'water-reducible-alkyd',
    name: 'Water-Reducible Alkyd',
    group: 'water-based',
    shortDescription:
      'A primer and a topcoat formulated on a water-reducible alkyd resin, for steel fabrications.',
    description: null,
    status: 'published',
  },
  {
    id: 'short-oil-alkyd',
    slug: 'short-oil-alkyd',
    name: 'Short Oil Alkyd',
    group: 'solvent-borne',
    shortDescription:
      'A primer and a topcoat formulated on a fast-drying short oil (chain-stopped) alkyd resin.',
    description: null,
    status: 'published',
  },
];

export const categoryGroups: { id: string; name: string; lead: string }[] = [
  {
    id: 'water-based',
    name: 'Water-based Coatings',
    lead: 'Water-reducible systems for lower VOC and solvent handling without giving up alkyd film properties.',
  },
  {
    id: 'solvent-borne',
    name: 'Solvent-borne Coatings',
    lead: 'Conventional solvent-borne alkyds for fast dry and proven performance on fabricated metal.',
  },
];
