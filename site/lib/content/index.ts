import { z } from 'zod';
import {
  certificationSchema,
  documentSchema,
  productSchema,
  taxonomyEntrySchema,
  type Certification,
  type Doc,
  type Product,
  type TaxonomyEntry,
} from './schema';
import { categories as rawCategories } from '@/content/products/categories';
import { applications as rawApplications } from '@/content/products/applications';
import { substrates as rawSubstrates } from '@/content/products/substrates';
import { industries as rawIndustries } from '@/content/products/industries';
import { products as rawProducts } from '@/content/products/products';
import {
  documents as rawDocuments,
  certifications as rawCertifications,
} from '@/content/documents/documents';
import { isProduction } from '@/content/site.config';

/** Drafts are visible in development and preview builds, never in production. */
export const showDrafts = !isProduction;

function parseAll<T>(schema: z.ZodType<T>, items: unknown[], label: string): T[] {
  return items.map((item, i) => {
    const r = schema.safeParse(item);
    if (!r.success) {
      const id = (item as { id?: string })?.id ?? `#${i}`;
      throw new Error(`${label} ${id} is invalid:\n${z.prettifyError(r.error)}`);
    }
    return r.data;
  });
}

export const categories = parseAll(taxonomyEntrySchema, rawCategories, 'category');
export const applications = parseAll(taxonomyEntrySchema, rawApplications, 'application');
export const substrates = parseAll(taxonomyEntrySchema, rawSubstrates, 'substrate');
export const industries = parseAll(taxonomyEntrySchema, rawIndustries, 'industry');
export const allProducts = parseAll(productSchema, rawProducts, 'product');
export const allDocuments = parseAll(documentSchema, rawDocuments, 'document');
export const certifications = parseAll(certificationSchema, rawCertifications, 'certification');

export type ContentIssue = { level: 'error' | 'warning'; entity: string; message: string };

/**
 * Referential integrity and publish gates. Run at build (scripts/check-content.ts) and in tests.
 * Errors block the build; warnings are reported.
 */
export function validateContent(): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const ids = (xs: { id: string }[]) => new Set(xs.map((x) => x.id));
  const catIds = ids(categories);
  const appIds = ids(applications);
  const subIds = ids(substrates);
  const indIds = ids(industries);
  const prodIds = ids(allProducts);
  const docIds = ids(allDocuments);
  const certIds = ids(certifications);

  const dupes = (xs: { id: string; slug?: string }[], label: string) => {
    const seen = new Set<string>();
    for (const x of xs) {
      if (seen.has(x.id))
        issues.push({ level: 'error', entity: `${label} ${x.id}`, message: 'duplicate id' });
      seen.add(x.id);
    }
  };
  dupes(categories, 'category');
  dupes(allProducts, 'product');
  dupes(allDocuments, 'document');

  for (const p of allProducts) {
    const e = `product ${p.id}`;
    const ref = (list: string[], set: Set<string>, what: string) =>
      list
        .filter((x) => !set.has(x))
        .forEach((x) => issues.push({ level: 'error', entity: e, message: `unknown ${what} '${x}'` }));
    ref(p.categoryIds, catIds, 'category');
    ref(p.applications, appIds, 'application');
    ref(p.substrates, subIds, 'substrate');
    ref(p.industries, indIds, 'industry');
    ref(p.relatedProductIds, prodIds, 'related product');
    ref(p.certifications, certIds, 'certification');
    ref(
      [p.documents.tds, p.documents.sds, ...p.documents.other].filter((x): x is string => Boolean(x)),
      docIds,
      'document',
    );
    if (!p.categoryIds.includes(p.primaryCategoryId))
      issues.push({ level: 'error', entity: e, message: 'primaryCategoryId must be one of categoryIds' });
    if (p.relatedProductIds.includes(p.id))
      issues.push({ level: 'warning', entity: e, message: 'relates to itself' });

    if (p.status === 'published') {
      if (!p.review.reviewedBy || !p.review.reviewedAt)
        issues.push({
          level: 'error',
          entity: e,
          message: 'published products must record reviewedBy and reviewedAt',
        });
      if (/sample|fictional|placeholder|illustrative/i.test(`${p.name} ${p.description}`))
        issues.push({
          level: 'error',
          entity: e,
          message: 'published product text contains placeholder wording',
        });
      for (const d of [p.documents.tds, p.documents.sds, ...p.documents.other]) {
        if (!d) continue;
        const doc = allDocuments.find((x) => x.id === d);
        if (doc && !(doc.approved && doc.public && doc.status === 'published'))
          issues.push({
            level: 'error',
            entity: e,
            message: `references document '${d}' that is not approved, public and published`,
          });
      }
      if (p.specifications.some((s) => s.state === 'unknown'))
        issues.push({
          level: 'warning',
          entity: e,
          message: "has 'unknown' specification rows; they are hidden in production",
        });
    }
  }
  for (const d of allDocuments) {
    const e = `document ${d.id}`;
    if (d.approved && (!d.approvedBy || !d.approvedAt))
      issues.push({
        level: 'error',
        entity: e,
        message: 'approved documents must record approvedBy and approvedAt',
      });
    d.productIds
      .filter((x) => !prodIds.has(x))
      .forEach((x) => issues.push({ level: 'error', entity: e, message: `unknown product '${x}'` }));
    if (d.status === 'published' && !d.approved)
      issues.push({ level: 'error', entity: e, message: 'published documents must be approved' });
  }
  return issues;
}

// ---------------------------------------------------------------- queries (visibility-aware)

const visible = <T extends { status: string }>(x: T) =>
  x.status === 'published' || (showDrafts && x.status === 'draft');

export const products = allProducts.filter(visible);
export const documents = allDocuments.filter(
  (d) => (d.approved && d.public && d.status === 'published') || (showDrafts && d.status === 'draft'),
);

export const isDraft = (x: { status: string }) => x.status !== 'published';

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug) ?? null;
}
export function productsInCategory(categoryId: string) {
  return products.filter((p) => p.categoryIds.includes(categoryId));
}
/** Categories that have at least one visible product — the only ones that get pages. */
export function categoriesWithProducts() {
  return categories.filter((c) => productsInCategory(c.id).length > 0);
}
export function getProduct(categorySlug: string, productSlug: string) {
  const cat = getCategory(categorySlug);
  if (!cat) return null;
  const p = products.find((x) => x.slug === productSlug) ?? null;
  // A product has one canonical URL: under its primary category.
  if (!p || p.primaryCategoryId !== cat.id) return null;
  return p;
}
export function productPath(p: Product) {
  const cat = categories.find((c) => c.id === p.primaryCategoryId);
  return `/products/${cat?.slug ?? p.primaryCategoryId}/${p.slug}`;
}
export function documentsForProduct(p: Product) {
  const ids = [p.documents.tds, p.documents.sds, ...p.documents.other].filter((x): x is string => Boolean(x));
  return ids.map((id) => documents.find((d) => d.id === id)).filter((d): d is Doc => Boolean(d));
}
export function getDocument(id: string) {
  return documents.find((d) => d.id === id) ?? null;
}
export function productsForDocument(d: Doc) {
  return d.productIds.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => Boolean(p));
}
export function relatedProducts(p: Product) {
  return p.relatedProductIds
    .map((id) => products.find((x) => x.id === id))
    .filter((x): x is Product => Boolean(x));
}
export function productsForTaxonomy(kind: 'applications' | 'substrates' | 'industries', id: string) {
  return products.filter((p) => p[kind].includes(id));
}
export const lookup = {
  application: (id: string) => applications.find((x) => x.id === id) ?? null,
  substrate: (id: string) => substrates.find((x) => x.id === id) ?? null,
  industry: (id: string) => industries.find((x) => x.id === id) ?? null,
  category: (id: string) => categories.find((x) => x.id === id) ?? null,
};

export type { Product, Doc, TaxonomyEntry, Certification };
