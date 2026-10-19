import Link from 'next/link';
import { lookup, productPath, isDraft, type Product } from '@/lib/content';

const systemLabel: Record<NonNullable<Product['systemType']>, string> = {
  'water-reducible': 'Water-reducible',
  'solvent-borne': 'Solvent-borne',
  other: 'Other',
};

export function ProductCard({ product }: { product: Product }) {
  const cat = lookup.category(product.primaryCategoryId);
  return (
    <article className="lift flex flex-col rounded-sm border border-line bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
        <span>{cat?.name}</span>
        {product.systemType ? (
          <>
            <span aria-hidden="true">·</span>
            <span>{systemLabel[product.systemType]}</span>
          </>
        ) : null}
        {product.availability === 'in-development' ? (
          <span className="ml-auto rounded-xs border border-warning bg-warning-tint px-1.5 py-0.5 normal-case tracking-normal text-ink">
            In development
          </span>
        ) : null}
        {isDraft(product) ? (
          <span className="rounded-xs bg-draft-tint px-1.5 py-0.5 font-mono normal-case tracking-normal text-draft">
            draft
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-lg">
        <Link href={productPath(product)} className="text-link text-ink">
          {product.name}
        </Link>
      </h3>
      {product.code ? <p className="mt-0.5 font-mono text-sm text-ink-muted">{product.code}</p> : null}
      <p className="mt-3 text-ink-soft">{product.shortDescription}</p>
      {product.substrates.length > 0 ? (
        <p className="mt-4 text-sm text-ink-muted">
          <span className="font-semibold text-ink-soft">Substrates: </span>
          {product.substrates
            .map((s) => lookup.substrate(s)?.name)
            .filter(Boolean)
            .join(', ')}
        </p>
      ) : null}
      <Link href={productPath(product)} className="mt-auto pt-5 font-semibold text-accent-deep">
        View product →
      </Link>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0)
    return <p className="text-ink-muted">No products are published in this section yet.</p>;
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
