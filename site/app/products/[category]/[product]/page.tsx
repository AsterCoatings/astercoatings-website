import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo/metadata';
import { site } from '@/content/site.config';
import {
  documentsForProduct,
  getProduct,
  isDraft,
  lookup,
  products,
  productPath,
  relatedProducts,
} from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DraftBanner } from '@/components/ui/DraftBanner';
import { CtaBand, Section } from '@/components/ui/primitives';
import { BrandImage } from '@/components/ui/BrandImage';
import { Reveal } from '@/components/ui/Reveal';
import { SpecTable } from '@/components/product/SpecTable';
import { DocumentList } from '@/components/product/DocumentList';
import { ProductCard } from '@/components/product/ProductCard';
import { JsonLd } from '@/components/seo/JsonLd';

type Params = { category: string; product: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => {
    const cat = lookup.category(p.primaryCategoryId);
    return { category: cat?.slug ?? p.primaryCategoryId, product: p.slug };
  });
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { category, product } = await params;
  const p = getProduct(category, product);
  if (!p) return {};
  return buildMetadata({
    title: p.seo?.title ?? p.name,
    description: p.seo?.description ?? p.shortDescription,
    path: productPath(p),
    noindex: isDraft(p),
  });
}

const systemLabel = {
  'water-reducible': 'Water-reducible',
  'solvent-borne': 'Solvent-borne',
  other: 'Other',
} as const;
const functionLabel = {
  primer: 'Primer',
  topcoat: 'Topcoat',
  'primer-topcoat': 'Primer and topcoat',
} as const;

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { category, product } = await params;
  const p = getProduct(category, product);
  if (!p) notFound();
  const cat = lookup.category(p.primaryCategoryId)!;
  const docs = documentsForProduct(p);
  const related = relatedProducts(p);
  const draft = isDraft(p);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    ...(p.code ? { sku: p.code } : {}),
    description: p.shortDescription,
    category: cat.name,
    brand: { '@type': 'Brand', name: site.brand.name },
    url: `${site.urls.site}${productPath(p)}`,
  };

  return (
    <>
      {draft ? <DraftBanner what="This product" /> : null}
      <Breadcrumbs
        items={[
          { label: 'Products', href: '/products' },
          { label: cat.name, href: `/products/${cat.slug}` },
          { label: p.name },
        ]}
      />
      {!draft ? <JsonLd data={jsonLd} /> : null}

      <header className="border-b border-line bg-surface-alt">
        <div className="site-container grid gap-8 py-10 lg:grid-cols-12 lg:py-14">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              {cat.name}
              {p.function ? ` · ${functionLabel[p.function]}` : ''}
              {p.availability === 'in-development' ? ' · In development' : ''}
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl">{p.name}</h1>
            {p.availability === 'in-development' ? (
              <p className="mt-3 inline-block rounded-xs border border-warning bg-warning-tint px-2 py-1 text-sm font-semibold text-ink">
                In development — no data sheet issued yet. Ask us for the target specification.
              </p>
            ) : null}
            {p.code ? <p className="mt-2 font-mono text-ink-muted">Product code {p.code}</p> : null}
            <p className="prose-block mt-4 text-md text-ink-soft">{p.shortDescription}</p>
            <dl className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              {p.systemType ? <Fact label="System type" value={systemLabel[p.systemType]} /> : null}
              {p.baseResin ? <Fact label="Formulated on" value={p.baseResin} /> : null}
              {p.substrates.length ? (
                <Fact
                  label="Substrates"
                  value={p.substrates
                    .map((s) => lookup.substrate(s)?.name)
                    .filter(Boolean)
                    .join(', ')}
                />
              ) : null}
              {p.applications.length ? (
                <Fact
                  label="Application"
                  value={p.applications
                    .map((a) => lookup.application(a)?.name)
                    .filter(Boolean)
                    .join(', ')}
                />
              ) : null}
              {p.packaging?.length ? (
                <Fact label="Packaging" value={p.packaging.map((k) => k.label).join(', ')} />
              ) : null}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/request-a-quote?product=${encodeURIComponent(p.id)}`} className="btn btn-primary">
                Request a quote
              </Link>
              <Link
                href={`/request-a-sample?product=${encodeURIComponent(p.id)}`}
                className="btn btn-secondary"
              >
                Request a sample
              </Link>
              {docs.length ? (
                <a href="#docs-heading" className="btn btn-secondary">
                  Data sheets
                </a>
              ) : null}
            </div>
          </div>
          <div className="hero-media lg:col-span-5">
            {/* Product photos come later (p.images); the shared image fills the slot until then. */}
            <BrandImage
              slot="product-default"
              className="aspect-[4/3] w-full rounded-sm border border-line"
            />
          </div>
        </div>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="text-xl">Overview</h2>
            <div className="prose-block mt-3 text-md">
              {p.description.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {p.limitations.length ? (
              <div className="mt-8 rounded-sm border-l-4 border-warning bg-surface-alt p-4">
                <h3 className="text-base font-bold">Limitations</h3>
                <ul className="mt-2 list-disc pl-5 text-ink-soft">
                  {p.limitations.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {p.specifications.length ? (
              <div className="mt-10">
                <h2 className="text-xl">Specifications</h2>
                <p className="mt-1 mb-4 text-sm text-ink-muted">
                  {p.availability === 'in-development'
                    ? 'No specification has been issued for this product yet.'
                    : 'Typical values; refer to the technical data sheet for the controlling figures.'}
                </p>
                <SpecTable specs={p.specifications} caption={`Specifications for ${p.name}`} />
              </div>
            ) : null}
          </Reveal>
          <Reveal as="div" delay={120} className="lg:col-span-5">
            <DocumentList docs={docs} />
            {p.industries.length ? (
              <section aria-labelledby="ind-heading" className="mt-10">
                <h2 id="ind-heading" className="text-xl">
                  Used in
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.industries.map((i) => {
                    const ind = lookup.industry(i);
                    return ind ? (
                      <li key={i}>
                        <Link
                          href={`/industries#${ind.slug}`}
                          className="inline-block rounded-xs border border-line-strong px-3 py-1.5 text-sm font-semibold text-ink no-underline hover:border-ink"
                        >
                          {ind.name}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </section>
            ) : null}
          </Reveal>
        </div>
      </Section>

      {related.length ? (
        <Section tone="alt">
          <h2 className="text-2xl">Related products</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        heading={p.availability === 'in-development' ? `Ask about ${p.name}` : `Quote or sample ${p.name}`}
        text={
          p.availability === 'in-development'
            ? 'Tell us the coating you use today and the properties you depend on, and we will confirm the fit when the specification is released.'
            : 'Tell us the substrate, the application method and the annual volume, and we will reply with pricing, lead time and a sample if you want one.'
        }
        productId={p.id}
        productName={p.name}
        actions="quote-sample"
      />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-ink-muted">{label}</dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}
