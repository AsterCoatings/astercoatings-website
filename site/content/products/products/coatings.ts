import type { Product, Spec } from '@/lib/content/schema';

/**
 * The launch catalog as stated by the owner on 2026-10-16: four finished coatings in two families —
 * a water-reducible alkyd primer and topcoat (mainly for steel) and a short oil alkyd primer and
 * topcoat. Names and codes are PLACEHOLDERS until the owner supplies them (C1). Every specification is
 * 'unknown' until a technical data sheet exists (C4/C7); nothing below invents a value.
 *
 * The resins behind these coatings are documented in `content/resins/` (not rendered).
 */

const unknownSpecs: Spec[] = [
  { key: 'volumeSolids', label: 'Volume solids', value: null, unit: '%', state: 'unknown' },
  { key: 'voc', label: 'VOC (as supplied)', value: null, unit: 'lb/gal', state: 'unknown' },
  { key: 'dft', label: 'Recommended dry film thickness', value: null, unit: 'mils', state: 'unknown' },
  { key: 'dryToTouch', label: 'Dry to touch', value: null, unit: 'min', state: 'unknown' },
  { key: 'dryToRecoat', label: 'Dry to recoat', value: null, state: 'unknown' },
  { key: 'gloss', label: 'Gloss at 60°', value: null, state: 'unknown' },
  { key: 'thinner', label: 'Reducer / clean-up', value: null, state: 'unknown' },
  {
    key: 'potLife',
    label: 'Pot life',
    value: null,
    state: 'not-applicable',
    note: 'Single-component product',
  },
  { key: 'shelfLife', label: 'Shelf life', value: null, state: 'unknown' },
];

function coating(p: {
  id: string;
  name: string;
  family: 'water-reducible-alkyd' | 'short-oil-alkyd';
  fn: 'primer' | 'topcoat';
  short: string;
  description: string;
  related: string;
}): Product {
  const wr = p.family === 'water-reducible-alkyd';
  return {
    id: p.id,
    slug: p.id,
    name: p.name,
    code: undefined,
    status: 'draft',
    availability: 'available',
    categoryIds: [p.family],
    primaryCategoryId: p.family,
    systemType: wr ? 'water-reducible' : 'solvent-borne',
    function: p.fn,
    baseResin: wr
      ? "Aster's own water-reducible alkyd resin"
      : "Aster's own short oil (chain-stopped) alkyd resin",
    shortDescription: p.short,
    description: p.description,
    applications: [],
    substrates: ['cold-rolled-steel', 'hot-rolled-steel'],
    industries: [],
    internalCrossReference: [],
    limitations: [],
    specifications: unknownSpecs,
    documents: { other: [] },
    images: [],
    relatedProductIds: [p.related],
    certifications: [],
    review: {
      reviewedBy: null,
      reviewedAt: null,
      source:
        'Owner statement 2026-10-16 (product exists; family, function and steel substrate). No TDS yet.',
    },
  };
}

export const coatings: Product[] = [
  coating({
    id: 'water-reducible-alkyd-primer',
    name: 'Water-Reducible Alkyd Primer',
    family: 'water-reducible-alkyd',
    fn: 'primer',
    short:
      'Water-reducible alkyd primer for steel fabrications. Name, code and specification to be supplied.',
    description:
      'A primer formulated on a water-reducible alkyd resin for steel fabrications. Technical data — solids, VOC, film build, dry times, suitable application methods — will be published from the technical data sheet when it is issued.\n\nAsk us for the current data sheet or a sample.',
    related: 'water-reducible-alkyd-topcoat',
  }),
  coating({
    id: 'water-reducible-alkyd-topcoat',
    name: 'Water-Reducible Alkyd Topcoat',
    family: 'water-reducible-alkyd',
    fn: 'topcoat',
    short:
      'Water-reducible alkyd topcoat for steel fabrications. Name, code and specification to be supplied.',
    description:
      'A topcoat formulated on a water-reducible alkyd resin for steel fabrications, for use over the matching primer or as part of a system agreed with our technical team. Technical data will be published from the technical data sheet when it is issued.\n\nAsk us for the current data sheet or a sample.',
    related: 'water-reducible-alkyd-primer',
  }),
  coating({
    id: 'short-oil-alkyd-primer',
    name: 'Short Oil Alkyd Primer',
    family: 'short-oil-alkyd',
    fn: 'primer',
    short:
      'Fast-dry short oil alkyd primer for fabricated metal. Name, code and specification to be supplied.',
    description:
      'A primer formulated on a short oil (chain-stopped) alkyd resin, the chemistry chosen for fast air-dry and force-dry lines. Technical data will be published from the technical data sheet when it is issued.\n\nAsk us for the current data sheet or a sample.',
    related: 'short-oil-alkyd-topcoat',
  }),
  coating({
    id: 'short-oil-alkyd-topcoat',
    name: 'Short Oil Alkyd Topcoat',
    family: 'short-oil-alkyd',
    fn: 'topcoat',
    short:
      'Fast-dry short oil alkyd topcoat for fabricated metal. Name, code and specification to be supplied.',
    description:
      'A topcoat formulated on a short oil (chain-stopped) alkyd resin, for use over the matching primer or as part of a system agreed with our technical team. Technical data will be published from the technical data sheet when it is issued.\n\nAsk us for the current data sheet or a sample.',
    related: 'short-oil-alkyd-primer',
  }),
];
