import type { MetadataRoute } from 'next';
import { site } from '@/content/site.config';

export const dynamic = 'force-static';

/** Staging stays out of search engines unless ALLOW_INDEXING=true is set explicitly for production. */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.ALLOW_INDEXING === 'true';
  return allow
    ? {
        rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/*/thank-you'] }],
        sitemap: `${site.urls.site}/sitemap.xml`,
      }
    : { rules: [{ userAgent: '*', disallow: '/' }] };
}
