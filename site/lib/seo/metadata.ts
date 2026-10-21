import type { Metadata } from 'next';
import { site } from '@/content/site.config';

const indexingAllowed = process.env.ALLOW_INDEXING === 'true';

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  // The root layout applies the template `%s | <brand>` to page titles; the home page opts out with
  // `absolute` so the brand is not repeated.
  const title =
    input.path === '/'
      ? { absolute: `${site.brand.name} — Industrial coatings for fabricated metal` }
      : input.title;
  const fullTitle =
    input.path === '/'
      ? `${site.brand.name} — Industrial coatings for fabricated metal`
      : `${input.title} | ${site.brand.name}`;
  const url = `${site.urls.site}${input.path}`;
  const robotsIndex = indexingAllowed && !input.noindex;
  return {
    title,
    description: input.description,
    alternates: { canonical: url },
    robots: { index: robotsIndex, follow: robotsIndex },
    openGraph: {
      title: fullTitle,
      description: input.description,
      url,
      siteName: site.brand.name,
      type: 'website',
      locale: 'en_US',
      // Page-level openGraph replaces the inherited one, so the brand share image (app/opengraph-image.png)
      // must be repeated here or inner pages lose it.
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: `${site.brand.name} — ${site.brand.tagline ?? ''}`.trim(),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: input.description,
      images: ['/twitter-image.png'],
    },
  };
}

export function organizationJsonLd() {
  const a = site.contact.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legal.entityName ?? site.brand.name,
    url: site.urls.site,
    ...(site.contact.salesPhone ? { telephone: site.contact.salesPhone } : {}),
    ...(site.contact.salesEmail ? { email: site.contact.salesEmail } : {}),
    ...(site.contact.publishAddress && a
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: a.street,
            addressLocality: a.city,
            addressRegion: a.region,
            postalCode: a.postalCode,
            addressCountry: a.country,
          },
        }
      : {}),
    areaServed: site.regions.served,
    ...(Object.values(site.social).some(Boolean)
      ? { sameAs: Object.values(site.social).filter(Boolean) }
      : {}),
  };
}
