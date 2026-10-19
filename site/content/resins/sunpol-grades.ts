import type { Spec } from '@/lib/content/schema';
import type { Resin } from './types';

/**
 * Aster-branded alkyd resins. Every value below is transcribed from the corresponding Sunpol Resins
 * technical data sheet (sunpol.com, revisions dated March–April 2025) — same products, same
 * manufacturer, Aster brand. Status stays 'draft' until the owner has (1) confirmed the Aster code
 * and name, (2) issued an Aster TDS and SDS naming Aster as the responsible party, and (3) recorded
 * the review. Where the Sunpol product table and the TDS disagree, the TDS value is used and the
 * difference is noted in `review.source` for the lab to resolve.
 */

const handling =
  'Store in a dry location and avoid temperatures above 100 °F. Avoid contact with air or oxygen; under these conditions shelf life is at least one year.';

function spec(key: string, label: string, value: string | number, unit?: string, note?: string): Spec {
  return { key, label, value, unit, note, state: 'value' };
}

export const aster4033B: Resin = {
  id: 'aster-4033b',
  slug: 'aster-4033b',
  name: 'Aster 4033B',
  code: '4033B',
  status: 'draft',
  availability: 'available',
  categoryIds: ['water-reducible-alkyds', 'chain-stopped-alkyds'],
  primaryCategoryId: 'water-reducible-alkyds',
  systemType: 'water-reducible',
  shortDescription:
    'Chain-stopped water-reducible alkyd on tall oil fatty acid, 70 % in butyl glycol, for fast-drying, tough air-dry and force-dry primers and enamels.',
  description:
    'Aster 4033B is a chain-stopped, water-reducible alkyd based on tall oil fatty acid (TOFA), supplied at 69–71 % solids in butyl glycol. It is designed for fast-drying, tough films in air-dry or force-dry primers and enamels for industrial coatings.\n\nThe data sheet lists excellent gloss, corrosion resistance and durability, and the product is HAPs free.',
  applications: ['industrial-enamels', 'metal-primers', 'low-bake-finishes'],
  oilTypes: ['tofa'],
  markets: ['industrial-coatings', 'marine-protective'],
  limitations: [],
  specifications: [
    spec('viscosity', 'Viscosity (Gardner)', 'Z5–Z7'),
    spec('solids', 'Solids by weight', '69–71', '%'),
    spec('reducedViscosity', 'Reduced viscosity', 'Z3–Z5', undefined, 'In butyl glycol at 65 % NVM'),
    spec('color', 'Colour (Gardner, max)', 8),
    spec('acidValue', 'Acid value', '35–41'),
    spec('density', 'Density', '9.0 ± 0.1', 'lb/gal'),
    spec('appearance', 'Appearance', 'Clear'),
    spec('solvent', 'Solvent', 'Butyl glycol'),
    spec('handling', 'Handling and storage', handling),
  ],
  documents: { tds: 'aster-4033b-tds', other: [] },
  images: [],
  relatedProductIds: ['aster-4033c'],
  certifications: [],
  internalCrossReference: [
    { supplier: 'Polynt', grade: 'Duramac WR 74-7495', note: 'WRA; candidate offset — lab to confirm' },
  ],
  review: {
    reviewedBy: null,
    reviewedAt: null,
    source:
      'Sunpol 4033B TDS, updated 3/11/25. Sunpol product table lists wt/gal 8.9; TDS density 9.0 ± 0.1 used.',
  },
};

export const aster4033C: Resin = {
  id: 'aster-4033c',
  slug: 'aster-4033c',
  name: 'Aster 4033C',
  code: '4033C',
  status: 'draft',
  availability: 'available',
  categoryIds: ['water-reducible-alkyds', 'chain-stopped-alkyds'],
  primaryCategoryId: 'water-reducible-alkyds',
  systemType: 'water-reducible',
  shortDescription:
    'Chain-stopped water-reducible alkyd on dehydrated castor fatty acid, 70 % in butyl glycol, with fast cure response, low colour and humidity resistance.',
  description:
    'Aster 4033C is a chain-stopped, water-reducible alkyd based on dehydrated castor oil fatty acid (DCOFA), supplied at 69–71 % solids in butyl glycol. It is designed for fast-drying, tough films with fast cure response and humidity resistance, at low colour and without compromising dry time.\n\nThe data sheet lists excellent gloss, corrosion resistance and colour retention, and the product is HAPs free. Recommended for air-dry or force-dry primers and enamels in industrial coatings.',
  applications: ['industrial-enamels', 'metal-primers', 'low-bake-finishes'],
  oilTypes: ['dcofa'],
  markets: ['industrial-coatings', 'marine-protective'],
  limitations: [],
  specifications: [
    spec('viscosity', 'Viscosity (Gardner)', 'Z5–Z7'),
    spec('solids', 'Solids by weight', '69–71', '%'),
    spec('reducedViscosity', 'Reduced viscosity', 'Z3–Z5', undefined, 'In butyl glycol at 65 % NVM'),
    spec('color', 'Colour (Gardner, max)', 6),
    spec('acidValue', 'Acid value', '37–42'),
    spec('density', 'Density', '8.7 ± 0.1', 'lb/gal'),
    spec('appearance', 'Appearance', 'Clear'),
    spec('solvent', 'Solvent', 'Butyl glycol'),
    spec('handling', 'Handling and storage', handling),
  ],
  documents: { tds: 'aster-4033c-tds', other: [] },
  images: [],
  relatedProductIds: ['aster-4033b'],
  certifications: [],
  internalCrossReference: [
    { supplier: 'Polynt', grade: 'Duramac WR 74-7495', note: 'WRA; candidate offset — lab to confirm' },
  ],
  review: { reviewedBy: null, reviewedAt: null, source: 'Sunpol 4033C TDS, updated 3/11/25.' },
};

export const aster4084: Resin = {
  id: 'aster-4084',
  slug: 'aster-4084',
  name: 'Aster 4084',
  code: '4084',
  status: 'draft',
  availability: 'available',
  categoryIds: ['chain-stopped-alkyds'],
  primaryCategoryId: 'chain-stopped-alkyds',
  systemType: 'solvent-borne',
  shortDescription:
    'Soya/linseed short oil chain-stopped alkyd, 80 % in Aromatic 100 / n-butyl acetate, for high-gloss air-dry enamels, metal primers and maintenance coatings.',
  description:
    'Aster 4084 is a soya/linseed-based, short oil, chain-stopped alkyd reduced to 79–81 % solids in a blend of Aromatic 100 and n-butyl acetate. The data sheet lists excellent flow and levelling, durability and high gloss, and states that the product meets Federal Specification TT-E-489J.\n\nRecommended for metal primers, industrial maintenance coatings, and air-dry and architectural enamels.',
  applications: ['metal-primers', 'maintenance-coatings', 'industrial-enamels', 'architectural-enamels'],
  oilTypes: ['soya-linseed'],
  markets: ['industrial-coatings', 'architectural-paint', 'marine-protective'],
  limitations: [],
  specifications: [
    spec('viscosity', 'Viscosity (Gardner)', 'Z1–Z3'),
    spec('solids', 'Solids by weight', '79–81', '%'),
    spec('reducedViscosity', 'Reduced viscosity', 'E–H', undefined, 'In n-butyl acetate at 65 % NVM'),
    spec('color', 'Colour (Gardner, max)', 8),
    spec('acidValue', 'Acid value (max)', 10),
    spec('density', 'Density', '8.55–8.75', 'lb/gal'),
    spec('appearance', 'Appearance', 'Clear'),
    spec('solvent', 'Solvent', 'Aromatic 100 / n-butyl acetate'),
    spec(
      'standard',
      'Specification',
      'TT-E-489J',
      undefined,
      'As stated on the Sunpol data sheet; confirm before publication',
    ),
    spec('handling', 'Handling and storage', handling),
  ],
  documents: { tds: 'aster-4084-tds', other: [] },
  images: [],
  relatedProductIds: ['aster-4422n', 'aster-4423'],
  certifications: [],
  internalCrossReference: [
    {
      supplier: 'Polynt',
      grade: 'Duramac 207-1405',
      note: 'Chain-stopped SOA; candidate offset — lab to confirm',
    },
  ],
  review: { reviewedBy: null, reviewedAt: null, source: 'Sunpol 4084 TDS, updated 03/12/2025.' },
};

export const aster4085HS: Resin = {
  id: 'aster-4085hs',
  slug: 'aster-4085hs',
  name: 'Aster 4085HS',
  code: '4085HS',
  status: 'draft',
  availability: 'available',
  categoryIds: ['chain-stopped-alkyds', 'medium-oil-alkyds'],
  primaryCategoryId: 'chain-stopped-alkyds',
  systemType: 'solvent-borne',
  shortDescription:
    'HAPs-free soya medium oil chain-stopped alkyd, 60 % in Aromatic 100, for fast air-dry or low-bake finishes and maintenance coatings.',
  description:
    'Aster 4085HS is a soya-based, medium oil, chain-stopped alkyd reduced to 59–61 % solids in Aromatic 100. The data sheet lists it as HAPs free, fast drying and high gloss.\n\nRecommended for fast air-dry or low-bake finishes and maintenance coatings.',
  applications: ['industrial-enamels', 'low-bake-finishes', 'maintenance-coatings'],
  oilTypes: ['soya'],
  markets: ['industrial-coatings', 'aerosol-specialty'],
  limitations: [],
  specifications: [
    spec('viscosity', 'Viscosity (Gardner)', 'Z–Z3'),
    spec('solids', 'Solids by weight', '59–61', '%'),
    spec('reducedViscosity', 'Reduced viscosity', 'T–V', undefined, 'In Aromatic 100 at 55 % NVM'),
    spec('color', 'Colour (Gardner, max)', 7),
    spec('acidValue', 'Acid value (max)', 9),
    spec(
      'density',
      'Density',
      '8.5 ± 0.1',
      'lb/gal',
      'TDS prints "8.5 +/-1"; product table lists 8.5 — tolerance to be confirmed',
    ),
    spec('appearance', 'Appearance', 'Clear'),
    spec('solvent', 'Solvent', 'Aromatic 100'),
    spec('handling', 'Handling and storage', handling),
  ],
  documents: { tds: 'aster-4085hs-tds', other: [] },
  images: [],
  relatedProductIds: ['aster-4423', 'aster-4084'],
  certifications: [],
  internalCrossReference: [],
  review: {
    reviewedBy: null,
    reviewedAt: null,
    source: 'Sunpol 4085HS TDS, updated 3/12/2025. Density tolerance printed as "+/-1" — query with lab.',
  },
};

export const aster4422N: Resin = {
  id: 'aster-4422n',
  slug: 'aster-4422n',
  name: 'Aster 4422N',
  code: '4422N',
  status: 'draft',
  availability: 'available',
  categoryIds: ['chain-stopped-alkyds'],
  primaryCategoryId: 'chain-stopped-alkyds',
  systemType: 'solvent-borne',
  shortDescription:
    'High-solids soya short oil chain-stopped alkyd, 80 % in MPK / n-butyl acetate, for fast-dry industrial air-dry and force-dry enamels with colour retention.',
  description:
    'Aster 4422N is a soya-based, chain-stopped short oil alkyd for high-solids industrial coatings, supplied at 79–81 % solids in methyl propyl ketone and n-butyl acetate. It is designed for fast-drying, tough films that resist yellowing, in air-dry or bake applications.\n\nThe data sheet lists fast dry, high gloss, durability and colour retention. Recommended for industrial air-dry enamels, force-dry enamels and exterior applications.',
  applications: ['industrial-enamels', 'low-bake-finishes'],
  oilTypes: ['soya'],
  markets: ['industrial-coatings', 'aerosol-specialty'],
  limitations: [],
  specifications: [
    spec('viscosity', 'Viscosity (Gardner)', 'Z3–Z6'),
    spec('solids', 'Solids by weight', '79–81', '%'),
    spec('reducedViscosity', 'Reduced viscosity', 'G–J', undefined, 'In n-butyl acetate at 65 % NVM'),
    spec('color', 'Colour (Gardner, max)', 12),
    spec('acidValue', 'Acid value (max)', 12),
    spec('density', 'Density', '9.0 ± 0.1', 'lb/gal'),
    spec('appearance', 'Appearance', 'Clear'),
    spec('solvent', 'Solvent', 'Methyl propyl ketone / n-butyl acetate'),
    spec('handling', 'Handling and storage', handling),
  ],
  documents: { tds: 'aster-4422n-tds', other: [] },
  images: [],
  relatedProductIds: ['aster-4084', 'aster-4423'],
  certifications: [],
  internalCrossReference: [
    {
      supplier: 'Polynt',
      grade: 'Duramac 207-1405',
      note: 'Chain-stopped SOA; candidate offset — lab to confirm',
    },
  ],
  review: { reviewedBy: null, reviewedAt: null, source: 'Sunpol 4422N TDS, updated 3/6/25.' },
};

export const aster4423: Resin = {
  id: 'aster-4423',
  slug: 'aster-4423',
  name: 'Aster 4423',
  code: '4423',
  status: 'draft',
  availability: 'available',
  categoryIds: ['chain-stopped-alkyds', 'medium-oil-alkyds'],
  primaryCategoryId: 'chain-stopped-alkyds',
  systemType: 'solvent-borne',
  shortDescription:
    'HAPs-free medium oil chain-stopped alkyd, 75 % in MAK / n-butyl acetate, for low-VOC industrial air-dry and force-dry enamels and maintenance coatings.',
  description:
    'Aster 4423 is a chain-stopped alkyd for HAPs-free and low-VOC formulations, supplied at 74–76 % solids in methyl amyl ketone and n-butyl acetate. The data sheet notes that the low density and high activity of MAK allow reduction to VOC limits in the finished product, and that the medium oil length gives good compatibility and flexibility alongside the fast dry of a chain-stopped alkyd.\n\nListed benefits are good application and flow, high gloss, durability, colour retention and high flexibility. Recommended for industrial air-dry or force-dry enamels and maintenance coatings.',
  applications: ['industrial-enamels', 'low-bake-finishes', 'maintenance-coatings'],
  oilTypes: ['soya'],
  markets: ['industrial-coatings', 'marine-protective'],
  limitations: [],
  specifications: [
    spec('viscosity', 'Viscosity (Gardner)', 'Z3–Z5'),
    spec('solids', 'Solids by weight', '74–76', '%'),
    spec('reducedViscosity', 'Reduced viscosity', 'R–U', undefined, 'In n-butyl acetate at 65 % NVM'),
    spec('color', 'Colour (Gardner, max)', 10),
    spec('acidValue', 'Acid value (max)', 12),
    spec('density', 'Density', '8.9 ± 0.1', 'lb/gal'),
    spec('appearance', 'Appearance', 'Clear'),
    spec('solvent', 'Solvent', 'Methyl amyl ketone / n-butyl acetate'),
    spec('handling', 'Handling and storage', handling),
  ],
  documents: { tds: 'aster-4423-tds', other: [] },
  images: [],
  relatedProductIds: ['aster-4085hs', 'aster-4422n'],
  certifications: [],
  internalCrossReference: [
    { supplier: 'Polynt', grade: 'Duramac 51-5184', note: 'MOA; candidate offset — lab to confirm' },
    {
      supplier: 'Polynt',
      grade: 'Duramac 204-1465',
      note: 'MOA (aerosol customer); candidate offset — lab to confirm',
    },
    {
      supplier: 'Polímeros Sintéticos',
      grade: 'Alquimex S-60GN',
      note: 'MOA; interchangeable with the above at the customer',
    },
  ],
  review: {
    reviewedBy: null,
    reviewedAt: null,
    source: 'Sunpol 4423 TDS, updated 3/6/25. Oil type (soya) from the Sunpol product table.',
  },
};

export const aster4405: Resin = {
  id: 'aster-4405',
  slug: 'aster-4405',
  name: 'Aster 4405',
  code: '4405',
  status: 'draft',
  availability: 'available',
  categoryIds: ['chain-stopped-alkyds'],
  primaryCategoryId: 'chain-stopped-alkyds',
  systemType: 'solvent-borne',
  shortDescription:
    'Soya alkyd at 50 % in xylene with high chemical resistance and storage stability, for powder coatings, fiberglass molds, machinery and implement coatings.',
  description:
    'Aster 4405 is supplied at 49–50 % solids in xylene. The data sheet lists high chemical resistance and durability with fast drying, high gloss and good colour retention, and good storage stability with a smooth surface.\n\nRecommended for powder coatings, fiberglass molds, machinery and implement coatings.',
  applications: ['powder-coatings-molds', 'industrial-enamels'],
  oilTypes: ['soya'],
  markets: ['industrial-coatings'],
  limitations: [],
  specifications: [
    spec('viscosity', 'Viscosity (Gardner)', 'U–W'),
    spec('solids', 'Solids by weight', '49–50', '%'),
    spec(
      'reducedViscosity',
      'Reduced viscosity',
      'C–E',
      undefined,
      'In xylene at 40 % NVM (Sunpol product table)',
    ),
    spec('color', 'Colour (Gardner, max)', 6),
    spec('acidValue', 'Acid value (max)', 12),
    spec('density', 'Density', '8.3 ± 0.01', 'lb/gal', 'Tolerance as printed on the TDS; to be confirmed'),
    spec('appearance', 'Appearance', 'Clear'),
    spec('solvent', 'Solvent', 'Xylene'),
    spec('handling', 'Handling and storage', handling),
  ],
  documents: { tds: 'aster-4405-tds', other: [] },
  images: [],
  relatedProductIds: [],
  certifications: [],
  internalCrossReference: [],
  review: {
    reviewedBy: null,
    reviewedAt: null,
    source:
      'Sunpol 4405 TDS, updated 04/2025. The TDS is titled "Long Oil Alkyd" while the Sunpol product table lists 4405 under Chain Stopped Alkyds — category to be confirmed by the lab before publication.',
  },
};

export const sunpolGrades: Resin[] = [
  aster4033B,
  aster4033C,
  aster4084,
  aster4085HS,
  aster4422N,
  aster4423,
  aster4405,
];
