import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  '/',
  '/products',
  '/products/water-reducible-alkyd/water-reducible-alkyd-primer',
  '/products/short-oil-alkyd/short-oil-alkyd-topcoat',
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

for (const path of pages) {
  test(`${path} has one h1, a title and no axe violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Aster/);
    await page.waitForTimeout(1100); // let the entrance animation settle before auditing colours
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test('unknown product returns 404', async ({ page }) => {
  const res = await page.goto('/products/primers/does-not-exist');
  expect(res?.status()).toBe(404);
});

test('security headers are present', async ({ request }) => {
  const res = await request.get('/');
  const h = res.headers();
  expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
});

test('staging robots disallows indexing', async ({ request }) => {
  const res = await request.get('/robots.txt');
  expect(await res.text()).toContain('Disallow: /');
});

test('quote form validates and submits (mock integrations)', async ({ page }) => {
  await page.goto('/request-a-quote?product=water-reducible-alkyd-primer');
  await expect(page.getByText('About: Water-Reducible Alkyd Primer')).toBeVisible();
  await page.getByRole('button', { name: 'Send quote request' }).click();
  await expect(page.locator('#error-summary')).toContainText('Please fix the following');
  await page.getByLabel('Part or application').fill('Pallet racking uprights, interior');
  await page.getByLabel('Name', { exact: true }).fill('Pat Example');
  await page.getByRole('textbox', { name: 'Company' }).fill('Example Fabrication');
  await page.getByLabel('Work email').fill('pat@example.com');
  await page.getByLabel(/privacy policy/).check();
  await page.waitForTimeout(3100); // minimum time-to-submit
  await page.getByRole('button', { name: 'Send quote request' }).click();
  await expect(page).toHaveURL(/\/request-a-quote\/thank-you$/);
  await expect(page.locator('h1')).toHaveText('We have your quote request.');
});

test('sample request submits (mock integrations)', async ({ page }) => {
  await page.goto('/request-a-sample?product=short-oil-alkyd-primer');
  await page
    .getByLabel('Intended use')
    .fill('Hot-rolled steel brackets, airless spray, checking dry-to-handle');
  await page.getByLabel('Name', { exact: true }).fill('Pat Example');
  await page.getByRole('textbox', { name: 'Company' }).fill('Example Coatings');
  await page.getByLabel('Work email').fill('pat@example.com');
  await page.getByLabel(/privacy policy/).check();
  await page.waitForTimeout(3100);
  await page.getByRole('button', { name: 'Send sample request' }).click();
  await expect(page).toHaveURL(/\/request-a-sample\/thank-you$/);
});

test('keyboard: skip link and mobile menu', async ({ page, isMobile }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  if (isMobile) {
    await page.getByRole('button', { name: 'Menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Site menu' });
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  } else {
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: 'Services' })).toBeVisible();
    const products = nav.getByRole('button', { name: 'Products' });
    if (await products.count()) {
      await products.click();
      await expect(nav.getByRole('link', { name: /All products/ })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(nav.getByRole('link', { name: /All products/ })).toBeHidden();
    }
  }
});
