import type { TaxonomyEntry } from '@/lib/content/schema';

/**
 * Industries served. Listed on the Industries hub as sections; an individual industry page is
 * generated only when it has unique approved content and ≥ 2 linked products (D1).
 * Starting set to be confirmed by the owner (open question D1).
 */
export const industries: TaxonomyEntry[] = [
  {
    id: 'agriculture-construction-equipment',
    slug: 'agriculture-and-construction-equipment',
    name: 'Agriculture and construction equipment',
    shortDescription: 'Implements, attachments and machinery exposed to weather, abrasion and chemicals.',
    description: null,
    status: 'published',
  },
  {
    id: 'trailers-truck-bodies',
    slug: 'trailers-and-truck-bodies',
    name: 'Trailers and truck bodies',
    shortDescription: 'Frames, bodies and components for on-road service.',
    description: null,
    status: 'published',
  },
  {
    id: 'metal-fabrication',
    slug: 'metal-fabrication',
    name: 'General metal fabrication',
    shortDescription: 'Job shops and OEM fabricators finishing steel and aluminum parts.',
    description: null,
    status: 'published',
  },
  {
    id: 'racking-storage',
    slug: 'racking-and-storage',
    name: 'Racking and storage systems',
    shortDescription: 'Pallet racking, shelving and material-handling structures.',
    description: null,
    status: 'published',
  },
  {
    id: 'steel-doors-frames',
    slug: 'steel-doors-and-frames',
    name: 'Steel doors and frames',
    shortDescription: 'Hollow metal doors, frames and architectural hardware.',
    description: null,
    status: 'published',
  },
  {
    id: 'tanks-containers',
    slug: 'tanks-and-containers',
    name: 'Tanks, drums and containers',
    shortDescription: 'Cylinders, drums, tanks and waste containers.',
    description: null,
    status: 'published',
  },
];
