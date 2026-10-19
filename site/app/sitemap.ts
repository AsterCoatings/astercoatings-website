import type { MetadataRoute } from 'next';
import { site } from '@/content/site.config';
import { categoriesWithProducts, products, productPath } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.urls.site;
  const now = new Date();
  const statics = [
    '/',
    '/services',
    '/industries',
    '/request-a-sample',
    '/about',
    '/contact',
    '/request-a-quote',
    '/technical-inquiry',
    '/privacy',
    '/accessibility',
  ];
  const published = products.filter((p) => p.status === 'published');
  return [
    ...statics.map((p) => ({ url: `${base}${p}`, lastModified: now })),
    ...(published.length ? [{ url: `${base}/products`, lastModified: now }] : []),
    ...categoriesWithProducts()
      .filter((c) => published.some((p) => p.categoryIds.includes(c.id)))
      .map((c) => ({ url: `${base}/products/${c.slug}`, lastModified: now })),
    ...published.map((p) => ({ url: `${base}${productPath(p)}`, lastModified: now })),
  ];
}
