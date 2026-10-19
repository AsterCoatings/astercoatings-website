import type { TaxonomyEntry } from '@/lib/content/schema';

/** Substrates. A product lists the substrates its data sheet covers. */
export const substrates: TaxonomyEntry[] = [
  {
    id: 'cold-rolled-steel',
    slug: 'cold-rolled-steel',
    name: 'Cold-rolled steel',
    shortDescription: 'Clean, smooth sheet and formed parts; adhesion depends on degreasing and profile.',
    description: null,
    status: 'published',
  },
  {
    id: 'hot-rolled-steel',
    slug: 'hot-rolled-steel',
    name: 'Hot-rolled steel',
    shortDescription: 'Structural sections and plate, usually with mill scale to remove.',
    description: null,
    status: 'published',
  },
  {
    id: 'galvanized-steel',
    slug: 'galvanized-steel',
    name: 'Galvanized steel',
    shortDescription: 'Zinc-coated steel; needs a compatible primer or pretreatment.',
    description: null,
    status: 'published',
  },
  {
    id: 'aluminum',
    slug: 'aluminum',
    name: 'Aluminum',
    shortDescription: 'Extrusions, sheet and castings; needs an etch or conversion coating for adhesion.',
    description: null,
    status: 'published',
  },
];
