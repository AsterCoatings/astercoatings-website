import type { TaxonomyEntry } from '@/lib/content/schema';

/** Application methods and line types. A product lists the methods its data sheet allows. */
export const applications: TaxonomyEntry[] = [
  {
    id: 'conventional-spray',
    slug: 'conventional-spray',
    name: 'Conventional and HVLP spray',
    shortDescription: 'Air-atomised spray application in booths and open shops.',
    description: null,
    status: 'published',
  },
  {
    id: 'airless-spray',
    slug: 'airless-spray',
    name: 'Airless spray',
    shortDescription: 'High-pressure airless application for larger fabrications and structural steel.',
    description: null,
    status: 'published',
  },
  {
    id: 'electrostatic',
    slug: 'electrostatic',
    name: 'Electrostatic spray',
    shortDescription: 'Charged atomisation for wrap-around and transfer efficiency on racked parts.',
    description: null,
    status: 'published',
  },
  {
    id: 'dip-and-flow',
    slug: 'dip-and-flow',
    name: 'Dip and flow coat',
    shortDescription: 'Immersion and flow-coat lines for high-volume parts.',
    description: null,
    status: 'published',
  },
  {
    id: 'brush-and-roll',
    slug: 'brush-and-roll',
    name: 'Brush and roll',
    shortDescription: 'Touch-up, field repair and small-batch work.',
    description: null,
    status: 'published',
  },
];
