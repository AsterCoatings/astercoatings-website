import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { messaging, copy } from '@/content/messaging';
import { isProduction } from '@/content/site.config';
import { categoryGroups } from '@/content/products/categories';
import { categoriesWithProducts, productsInCategory, productPath, products } from '@/lib/content';

const productsExist = () => products.some((p) => p.status === 'published');
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CopyFlag } from '@/components/ui/Placeholder';
import { CtaBand, PageHeader, Section } from '@/components/ui/primitives';
import { BrandImage } from '@/components/ui/BrandImage';
import { Reveal } from '@/components/ui/Reveal';
import type { ImageKey } from '@/content/images';

export const metadata = buildMetadata({
  title: 'Products',
  description:
    'Water-reducible and short oil alkyd primers and topcoats for steel fabrications, with specifications and data sheets published as they are released.',
  path: '/products',
  // Unlisted until a product is published (owner decision 2026-10-16: Services leads for now).
  noindex: !productsExist(),
});

const functionLabel = {
  primer: 'Primer',
  topcoat: 'Topcoat',
  'primer-topcoat': 'Primer and topcoat',
} as const;

/**
 * Products hub in the reference style (trinkote.com): carrier technology → chemistry family with one
 * paragraph (application, cure, end uses) → the primer and topcoat in that family. Family paragraphs
 * carry the approved/unapproved flag because they make claims.
 */
export default function ProductsPage() {
  const cats = categoriesWithProducts();
  const groups = categoryGroups
    .map((g) => ({ ...g, cats: cats.filter((c) => c.group === g.id) }))
    .filter((g) => g.cats.length > 0);
  const ungrouped = cats.filter((c) => !c.group);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Products' }]} />
      <PageHeader title={messaging.products.headline.text} lead={messaging.products.lead.text}>
        {cats.length > 1 ? (
          <nav aria-label="Product families" className="mt-6 flex flex-wrap gap-2">
            {cats.map((c) => (
              <a
                key={c.id}
                href={`#${c.slug}`}
                className="chip rounded-xs border border-line-strong bg-surface px-3 py-1.5 text-sm font-semibold text-ink no-underline"
              >
                {c.name}
              </a>
            ))}
          </nav>
        ) : null}
      </PageHeader>

      {cats.length === 0 ? (
        <Section>
          <p className="prose-block text-md text-ink-soft">
            Product pages are published as each product&apos;s data is reviewed. In the meantime,{' '}
            <Link href="/request-a-quote">request a quote</Link> and tell us what you are coating.
          </p>
        </Section>
      ) : null}

      {[
        ...groups,
        ...(ungrouped.length ? [{ id: 'other', name: 'Other', lead: '', cats: ungrouped }] : []),
      ].map((g, gi) => (
        <Section key={g.id} id={g.id} tone={gi % 2 ? 'alt' : 'default'}>
          <Reveal>
            <h2 className="text-2xl md:text-3xl">{g.name}</h2>
            <span className="coat-line" aria-hidden="true" />
            {g.lead ? <p className="prose-block mt-3 text-md text-ink-soft">{g.lead}</p> : null}
          </Reveal>
          <div className="mt-8 space-y-12">
            {g.cats.map((c, ci) => {
              const fam = messaging.families[c.id as keyof typeof messaging.families];
              const famCopy = fam ? copy(fam, isProduction) : null;
              const prods = productsInCategory(c.id);
              return (
                <article
                  key={c.id}
                  id={c.slug}
                  aria-labelledby={`fam-${c.id}`}
                  className="grid gap-8 border-t-2 border-ink pt-8 lg:grid-cols-12"
                >
                  <Reveal className="lg:col-span-7">
                    <h3 id={`fam-${c.id}`} className="text-xl md:text-2xl">
                      {c.name}
                    </h3>
                    <p className="prose-block mt-3 text-md">
                      {famCopy ? famCopy.text : c.shortDescription}
                      {famCopy ? <CopyFlag needsApproval={famCopy.needsApproval} /> : null}
                    </p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {prods.map((p) => (
                        <li key={p.id} className="lift rounded-sm border border-line bg-surface p-4">
                          <span className="eyebrow">
                            {p.function ? functionLabel[p.function] : 'Product'}
                          </span>
                          <Link
                            href={productPath(p)}
                            className="mt-1 block font-semibold text-ink no-underline hover:underline"
                          >
                            {p.name}
                          </Link>
                          {p.code ? (
                            <span className="block font-mono text-sm text-ink-muted">{p.code}</span>
                          ) : null}
                          <span className="mt-2 block text-sm text-ink-soft">{p.shortDescription}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-sm">
                      <Link href={`/products/${c.slug}`} className="font-semibold text-accent-deep">
                        View the {c.name} family →
                      </Link>
                    </p>
                  </Reveal>
                  <Reveal variant="scale" delay={ci * 60} className="lg:col-span-5">
                    <BrandImage
                      slot={`family-${c.id}` as ImageKey}
                      className="aspect-[4/3] w-full rounded-sm"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </Reveal>
                </article>
              );
            })}
          </div>
        </Section>
      ))}

      <CtaBand
        heading="Not sure which product fits?"
        text="Send the substrate, the application method and the service conditions, and we will recommend a system and send a sample."
      />
    </>
  );
}
