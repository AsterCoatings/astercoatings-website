import Link from 'next/link';
import { site } from '@/content/site.config';
import { JsonLd } from '@/components/seo/JsonLd';

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.urls.site}${c.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="site-container py-3 text-sm text-ink-muted">
      <JsonLd data={jsonLd} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link href={c.href} className="text-link inline-block py-1 text-ink-soft">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-ink' : ''}>
                  {c.label}
                </span>
              )}
              {!last ? <span aria-hidden="true">›</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
