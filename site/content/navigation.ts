import { categoriesWithProducts, productsInCategory } from '@/lib/content';

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

/** Header navigation is derived from published content so that empty sections never appear. */
export function primaryNav(): NavItem[] {
  // Products appear in navigation only once a product is published (owner decision 2026-10-16:
  // Services leads until formulated products exist). Drafts stay reachable at /products in development.
  const cats = categoriesWithProducts().filter((c) =>
    productsInCategory(c.id).some((p) => p.status === 'published'),
  );
  const productsItem: NavItem[] = cats.length
    ? [
        {
          label: 'Products',
          href: '/products',
          children: cats.map((c) => ({
            label: c.name,
            href: `/products/${c.slug}`,
            description: c.shortDescription,
          })),
        },
      ]
    : [];
  return [
    { label: 'Services', href: '/services' },
    ...productsItem,
    { label: 'Industries', href: '/industries' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
}

export const footerNav = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Request a quote', href: '/request-a-quote' },
    { label: 'Request a sample', href: '/request-a-sample' },
    { label: 'Technical inquiry', href: '/technical-inquiry' },
  ],
  browse: [
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' },
  ],
  legal: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};
