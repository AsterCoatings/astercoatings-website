import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo/metadata';
import { categoriesWithProducts, getCategory, productsInCategory } from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProductGrid } from '@/components/product/ProductCard';
import { CtaBand, PageHeader, Section } from '@/components/ui/primitives';

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return categoriesWithProducts().map((c) => ({ category: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return buildMetadata({ title: cat.name, description: cat.shortDescription, path: `/products/${cat.slug}` });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const items = productsInCategory(cat.id);
  if (items.length === 0) notFound();
  return (
    <>
      <Breadcrumbs items={[{ label: 'Products', href: '/products' }, { label: cat.name }]} />
      <PageHeader
        eyebrow="Product category"
        title={cat.name}
        lead={cat.description ?? cat.shortDescription}
      />
      <Section>
        <ProductGrid products={items} />
      </Section>
      <CtaBand heading={`Need a quote on ${cat.name.toLowerCase()}?`} />
    </>
  );
}
