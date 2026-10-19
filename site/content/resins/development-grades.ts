import type { Resin } from './types';

/**
 * Development grades: resin types the owner has confirmed the plant can produce, positioned to offset
 * grades that target customers buy today. They are listed so that formulators can ask about them,
 * but carry NO specifications until the lab issues a data sheet. `internalCrossReference` is for
 * sales only and is never rendered. Customer names are deliberately not recorded anywhere in code.
 *
 * Codes are provisional ("DEV-…") — the owner assigns real product codes when a grade is released.
 */

function dev(
  p: Pick<
    Resin,
    | 'id'
    | 'slug'
    | 'name'
    | 'code'
    | 'categoryIds'
    | 'primaryCategoryId'
    | 'systemType'
    | 'shortDescription'
    | 'description'
    | 'applications'
    | 'oilTypes'
    | 'markets'
    | 'internalCrossReference'
  >,
): Resin {
  return {
    ...p,
    status: 'draft',
    availability: 'in-development',
    limitations: [],
    specifications: [
      { key: 'viscosity', label: 'Viscosity (Gardner)', value: null, state: 'unknown' },
      { key: 'solids', label: 'Solids by weight', value: null, unit: '%', state: 'unknown' },
      { key: 'solvent', label: 'Solvent', value: null, state: 'unknown' },
      { key: 'acidValue', label: 'Acid value', value: null, state: 'unknown' },
      { key: 'density', label: 'Density', value: null, unit: 'lb/gal', state: 'unknown' },
    ],
    documents: { other: [] },
    images: [],
    relatedProductIds: [],
    certifications: [],
    review: {
      reviewedBy: null,
      reviewedAt: null,
      source: 'Owner request 2026-10-16: offsets for grades customers currently buy. No data sheet yet.',
    },
  };
}

export const developmentGrades: Resin[] = [
  dev({
    id: 'dev-short-oil-chain-stopped',
    slug: 'short-oil-chain-stopped-alkyd-development',
    name: 'Short Oil Chain-Stopped Alkyd — development grade',
    code: 'DEV-CS-1',
    categoryIds: ['chain-stopped-alkyds'],
    primaryCategoryId: 'chain-stopped-alkyds',
    systemType: 'solvent-borne',
    shortDescription:
      'Fast-dry short oil chain-stopped alkyd for industrial enamels and primers. In development; ask for the target specification.',
    description:
      'A short oil, chain-stopped alkyd aimed at fast air-dry and force-dry industrial enamels and metal primers. The grade is in development: no data sheet has been issued, and the values on this page are placeholders until the laboratory releases the specification.\n\nIf you formulate with a short oil chain-stopped alkyd today, tell us the grade and the properties you depend on and we will confirm whether this development matches them.',
    applications: ['industrial-enamels', 'metal-primers'],
    oilTypes: [],
    markets: ['industrial-coatings'],
    internalCrossReference: [
      {
        supplier: 'Polynt',
        grade: 'Duramac 207-1405',
        note: 'Chain-stopped SOA. Existing Aster 4084 / 4422N may already offset — lab to compare first.',
      },
    ],
  }),
  dev({
    id: 'dev-long-oil',
    slug: 'long-oil-alkyd-development',
    name: 'Long Oil Alkyd — development grade',
    code: 'DEV-LO-1',
    categoryIds: ['long-oil-alkyds'],
    primaryCategoryId: 'long-oil-alkyds',
    systemType: 'solvent-borne',
    shortDescription:
      'Brushable long oil alkyd for architectural enamels, primers and maintenance paints. In development.',
    description:
      'A long oil alkyd intended for architectural trim enamels, general-purpose primers and maintenance paints where brushability and flexibility matter. In development: no data sheet has been issued.\n\nTell us the grade you use today and the properties you depend on, and we will confirm the fit when the specification is released.',
    applications: ['architectural-enamels', 'metal-primers', 'maintenance-coatings'],
    oilTypes: [],
    markets: ['architectural-paint', 'industrial-coatings'],
    internalCrossReference: [
      {
        supplier: 'Polynt',
        grade: 'Duramac 50-5070',
        note: 'LOA. Sunpol long oil range exists — lab to compare first.',
      },
    ],
  }),
  dev({
    id: 'dev-medium-oil',
    slug: 'medium-oil-alkyd-development',
    name: 'Medium Oil Alkyd — development grade',
    code: 'DEV-MO-1',
    categoryIds: ['medium-oil-alkyds'],
    primaryCategoryId: 'medium-oil-alkyds',
    systemType: 'solvent-borne',
    shortDescription: 'General-purpose medium oil alkyd for industrial and aerosol enamels. In development.',
    description:
      'A medium oil alkyd intended as a general-purpose binder for industrial and aerosol enamels, balancing dry speed, flexibility and gloss. In development: no data sheet has been issued.\n\nTell us the grade you use today and the properties you depend on, and we will confirm the fit when the specification is released.',
    applications: ['industrial-enamels', 'aerosol-coatings', 'architectural-enamels'],
    oilTypes: [],
    markets: ['industrial-coatings', 'aerosol-specialty'],
    internalCrossReference: [
      { supplier: 'Polynt', grade: 'Duramac 51-5184', note: 'MOA' },
      {
        supplier: 'Polynt',
        grade: 'Duramac 204-1465',
        note: 'MOA; aerosol customer, batch/month; interchangeable with other MOAs they use',
      },
      {
        supplier: 'Polímeros Sintéticos',
        grade: 'Alquimex S-60GN',
        note: 'MOA; aerosol customer, batch/month; interchangeable',
      },
    ],
  }),
  dev({
    id: 'dev-water-reducible',
    slug: 'water-reducible-alkyd-development',
    name: 'Water-Reducible Alkyd — development grade',
    code: 'DEV-WR-1',
    categoryIds: ['water-reducible-alkyds'],
    primaryCategoryId: 'water-reducible-alkyds',
    systemType: 'water-reducible',
    shortDescription:
      'Water-reducible alkyd for low-VOC industrial primers and enamels. In development; see Aster 4033B and 4033C for released grades.',
    description:
      'A water-reducible alkyd intended for low-VOC industrial primers and enamels. In development: no data sheet has been issued. Aster 4033B and 4033C are released water-reducible grades and may already fit.\n\nTell us the grade you use today and the properties you depend on, and we will confirm the fit.',
    applications: ['industrial-enamels', 'metal-primers'],
    oilTypes: [],
    markets: ['industrial-coatings'],
    internalCrossReference: [
      { supplier: 'Polynt', grade: 'Duramac WR 74-7495', note: 'WRA. Compare against 4033B/4033C first.' },
    ],
  }),
  dev({
    id: 'dev-vinyl-toluene',
    slug: 'vinyl-toluene-alkyd-development',
    name: 'Vinyl Toluene Alkyd — development grade',
    code: 'DEV-VT-1',
    categoryIds: ['vinyl-toluene-alkyds'],
    primaryCategoryId: 'vinyl-toluene-alkyds',
    systemType: 'solvent-borne',
    shortDescription:
      'Vinyl-toluenated alkyd for very fast dry in aerosol and industrial enamels. In development.',
    description:
      'A vinyl toluene alkyd intended for aerosol and industrial enamels that need very fast dry and early hardness. In development: no data sheet has been issued.\n\nTell us the grade you use today and the properties you depend on, and we will confirm the fit when the specification is released.',
    applications: ['aerosol-coatings', 'industrial-enamels'],
    oilTypes: [],
    markets: ['aerosol-specialty', 'industrial-coatings'],
    internalCrossReference: [
      { supplier: 'Polynt', grade: 'Macopol 214-1481', note: 'VT alkyd; aerosol customer' },
    ],
  }),
  dev({
    id: 'dev-acrylic-modified',
    slug: 'acrylic-modified-alkyd-development',
    name: 'Acrylic-Modified Alkyd — development grade',
    code: 'DEV-AM-1',
    categoryIds: ['acrylic-modified-alkyds'],
    primaryCategoryId: 'acrylic-modified-alkyds',
    systemType: 'solvent-borne',
    shortDescription:
      'Acrylic-modified (vinyl toluene acrylic) alkyd for fast-dry aerosol and industrial finishes. In development.',
    description:
      'An acrylic-modified alkyd intended for aerosol and industrial finishes that need fast dry, early hardness and colour retention. In development: no data sheet has been issued.\n\nTell us the grade you use today and the properties you depend on, and we will confirm the fit when the specification is released.',
    applications: ['aerosol-coatings', 'industrial-enamels'],
    oilTypes: [],
    markets: ['aerosol-specialty', 'industrial-coatings'],
    internalCrossReference: [
      {
        supplier: 'OPC',
        grade: 'Polychem 7060-V-60',
        note: 'Acrylic VT; aerosol customer; interchangeable with Setyrene 13-3518',
      },
      {
        supplier: 'Allnex',
        grade: 'Setyrene 13-3518',
        note: 'Acrylic-modified; aerosol customer; interchangeable with Polychem 7060-V-60',
      },
    ],
  }),
];
