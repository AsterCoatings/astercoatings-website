/**
 * Image manifest. Each entry is a slot on the site. A slot renders the file `/public/images/<key>.<ext>`
 * (jpg, png or webp) when it exists, and the neutral technical graphic when it does not — so adding
 * imagery is a matter of dropping correctly named files into `site/public/images/`.
 *
 * Captions and alt text are deliberately generic (the subject, not "our facility") until the owner
 * confirms what each image shows. Generated imagery must not be captioned as the company's own
 * plant, staff or products. See docs/image-shot-list.md for the prompts that produce these files.
 */
export interface ImageSlotSpec {
  key: string;
  alt: string;
  aspect: string; // CSS aspect-ratio value
  use: string;
}

export const imageSlots = {
  hero: {
    key: 'hero',
    alt: 'Spray gun resting on its stand in a bright, white-walled paint shop',
    aspect: '16 / 9',
    use: 'Home hero background, full width. Poster frame of /public/videos/hero.mp4, which plays over it.',
  },
  'home-specs': {
    key: 'home-specs',
    alt: 'Rolled steel cylinder on the floor of a bright fabrication plant',
    aspect: '4 / 3',
    use: 'Home, "How we work" section',
  },
  'home-industries': {
    key: 'home-industries',
    alt: 'Orange steel beams in a bright factory hall',
    aspect: '3 / 2',
    use: 'Reserved (home markets section uses the six tiles)',
  },
  'cta-band': {
    key: 'cta-band',
    alt: 'Spray gun applying an orange primer to a steel bracket',
    aspect: '21 / 9',
    use: 'Reserved. The CTA band is a solid brand-orange band since 2026-10-16 and does not render this slot.',
  },
  'products-hub': {
    key: 'products-hub',
    alt: 'Paint mixing station with rows of dispensers',
    aspect: '16 / 9',
    use: 'Products hub header',
  },
  'product-default': {
    key: 'product-default',
    alt: 'Spray gun applying coating to a metal bracket',
    aspect: '4 / 3',
    use: 'Product page image when a product has no photo of its own',
  },
  'family-water-reducible-alkyd': {
    key: 'family-water-reducible-alkyd',
    alt: 'Paint roller applying a light grey coating',
    aspect: '4 / 3',
    use: 'Products page, water-reducible alkyd family',
  },
  'family-short-oil-alkyd': {
    key: 'family-short-oil-alkyd',
    alt: 'Spray gun applying coating to a metal bracket',
    aspect: '4 / 3',
    use: 'Products page, short oil alkyd family',
  },
  'service-technical-development': {
    key: 'service-technical-development',
    alt: 'Paint mixing station with rows of dispensers',
    aspect: '3 / 2',
    use: 'Services page, technical development',
  },
  'service-technical-support': {
    key: 'service-technical-support',
    alt: 'Digital caliper measuring the edge of a steel beam',
    aspect: '3 / 2',
    use: 'Services page, technical support',
  },
  'service-shipping': {
    key: 'service-shipping',
    alt: 'Forklift loading a pallet into a truck trailer',
    aspect: '3 / 2',
    use: 'Services page, shipping',
  },
  'service-color-matching': {
    key: 'service-color-matching',
    alt: 'Tops of used spray cans in many colours',
    aspect: '3 / 2',
    use: 'Services page, colour matching',
  },
  'service-toll-manufacturing': {
    key: 'service-toll-manufacturing',
    alt: 'Stainless steel process tanks and pipework in a plant',
    aspect: '3 / 2',
    use: 'Services page, toll manufacturing',
  },
  'industry-agriculture-construction-equipment': {
    key: 'industry-agriculture-construction-equipment',
    alt: 'Two backhoe loaders parked on a paved yard',
    aspect: '3 / 2',
    use: 'Industry tile and section',
  },
  'industry-trailers-truck-bodies': {
    key: 'industry-trailers-truck-bodies',
    alt: 'Refrigerated trailers parked in a lot',
    aspect: '3 / 2',
    use: 'Industry tile and section',
  },
  'industry-metal-fabrication': {
    key: 'industry-metal-fabrication',
    alt: 'Steel stock in a bright warehouse',
    aspect: '3 / 2',
    use: 'Industry tile and section',
  },
  'industry-racking-storage': {
    key: 'industry-racking-storage',
    alt: 'Orange pallet racking in a warehouse',
    aspect: '3 / 2',
    use: 'Industry tile and section',
  },
  'industry-steel-doors-frames': {
    key: 'industry-steel-doors-frames',
    alt: 'Grey steel door in a white corrugated wall',
    aspect: '3 / 2',
    use: 'Industry tile and section',
  },
  'industry-tanks-containers': {
    key: 'industry-tanks-containers',
    alt: 'Blue steel drums seen from above',
    aspect: '3 / 2',
    use: 'Industry tile and section',
  },
  about: {
    key: 'about',
    alt: 'Gloved hand finishing a metal surface with a pneumatic sander',
    aspect: '3 / 2',
    use: 'About page, "what we make"',
  },
  'about-history': {
    key: 'about-history',
    alt: 'Metal parts hanging on a coating line in bright light',
    aspect: '3 / 2',
    use: 'About page, "where we are"',
  },
} as const satisfies Record<string, ImageSlotSpec>;

export type ImageKey = keyof typeof imageSlots;
