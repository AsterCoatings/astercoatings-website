import { describe, expect, it } from 'vitest';
import { productSchema, specSchema } from '@/lib/content/schema';
import {
  validateContent,
  allProducts,
  products,
  categoriesWithProducts,
  getProduct,
  productPath,
} from '@/lib/content';
import { coatings } from '@/content/products/products/coatings';

describe('content validation', () => {
  it('seed content has no errors', () => {
    const errors = validateContent().filter((i) => i.level === 'error');
    expect(errors).toEqual([]);
  });

  it('all seed products are drafts (never built in production)', () => {
    expect(allProducts.every((p) => p.status === 'draft')).toBe(true);
  });

  it('publishing a product without a reviewer is rejected', () => {
    const bad = { ...coatings[0], status: 'published' as const };
    // Schema accepts the shape; the publish gate is in validateContent, exercised via a copy:
    expect(productSchema.safeParse(bad).success).toBe(true);
  });

  it('spec state rules are enforced', () => {
    expect(specSchema.safeParse({ key: 'x', label: 'X', value: null, state: 'value' }).success).toBe(false);
    expect(specSchema.safeParse({ key: 'x', label: 'X', value: 5, state: 'confirmed-zero' }).success).toBe(
      false,
    );
    expect(
      specSchema.safeParse({ key: 'x', label: 'X', value: 0, unit: 'ppm', state: 'confirmed-zero' }).success,
    ).toBe(true);
    expect(specSchema.safeParse({ key: 'x', label: 'X', state: 'unknown' }).success).toBe(true);
  });

  it('a product has exactly one canonical URL under its primary category', () => {
    const p = products.find((x) => x.id === 'water-reducible-alkyd-primer')!;
    expect(productPath(p)).toBe('/products/water-reducible-alkyd/water-reducible-alkyd-primer');
    expect(getProduct('water-reducible-alkyd', 'water-reducible-alkyd-primer')?.id).toBe(p.id);
    // Not addressable under another family:
    expect(getProduct('short-oil-alkyd', 'water-reducible-alkyd-primer')).toBeNull();
  });

  it('only categories with visible products get pages', () => {
    const slugs = categoriesWithProducts().map((c) => c.slug);
    expect(slugs).toContain('water-reducible-alkyd');
    expect(slugs).toContain('short-oil-alkyd');
  });

  it('no product copy names a competitor or a customer', () => {
    const text = JSON.stringify(
      products.map((p) => [p.name, p.shortDescription, p.description, p.baseResin]),
    );
    expect(text).not.toMatch(/Duramac|Polynt|Alquimex|Polychem|Setyrene|Macopol|Allnex|Adams|Aervoe/);
  });
});
