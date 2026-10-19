# Progress — 2026-10-16 (afternoon): resin detour, correction to coatings, Services leads

> **Read this first.** The resin pivot described in §1–2 below was **reversed the same afternoon** after the owner reviewed trinkote.com/products and clarified that Aster sells **finished coatings**. §3 records the final state. The resin transcription work is retained in `site/content/resins/` as reference data (not rendered).

## Decisions taken by the owner today
1. Generated imagery rejected (dark; then "does not look good") → **licensed stock photography** from Pexels in every slot (`image-credits.md`).
2. Sunpol Resins is the owner's other company; **Aster will sell Sunpol's water-reducible and short oil (chain-stopped) alkyds under the Aster brand** — Aster is a resin brand for coatings formulators, not a coatings brand for applicators.
3. Add grades similar to what target customers buy today (competitor offsets) → six **development grades** listed without specifications.
4. Hero animation: **slow continuous drift** on the photograph.

## What changed in the site
- **Content model** (`lib/content/schema.ts`): `substrates` → `oilTypes`, `industries` → `markets`, coating `function` removed, `systemType` now water-reducible / solvent-borne / 100-solids, new `availability` ('available' | 'in-development') and `internalCrossReference` (never rendered; unit test guards it).
- **Taxonomies**: categories by resin type (water-reducible, chain-stopped, medium oil, long oil, vinyl toluene, acrylic-modified); applications = coating types; oil types (soya, soya/linseed, TOFA, DCOFA); markets (six coatings-manufacturer segments).
- **Products**: `aster-resins.ts` — 7 grades transcribed from the Sunpol TDSs (values, uses, handling; discrepancies noted in `review.source`); `development-grades.ts` — 6 grades with unknown specs and provisional DEV codes. All `status: 'draft'`.
- **Pages**: `/industries` → `/markets`; product page shows oil type, "designed for", in-development badge, quote + sample CTAs; Applications hub = by coating type / by oil type; new `/request-a-sample` (+ thank-you); quote form asks coating being formulated, packaging (pail/drum/tote/bulk/rail), annual volume in lb, ship-to; CTA band buttons = quote + sample.
- **Copy** (`messaging.ts`) rewritten for formulators; still flagged `[OWNER COPY NEEDED]` where unapproved.
- **Imagery**: 12 Pexels photos → 6 market tiles re-picked for the new markets (paint shop, roller, aerosol cans, deck boards, road line, hull painting); `hero-drift` keyframes (28 s alternate, reduced-motion off).
- **Dev ergonomics**: `resolveImage` no longer caches in development.

## Checks
`tsc` clean · `eslint` clean · Vitest 21/21 · Playwright 40/40 (desktop + mobile, zero axe violations on 14 pages incl. a development-grade page and the sample form) · `check-content`: 13 products (0 published), 7 documents (0 public) · `next build` 48 routes.

## Owner to-do (new)
- Confirm product codes (C1), issue Aster TDS/SDS (C7), resolve the three data-sheet discrepancies, confirm 4405's category.
- Decide the Sunpol statement for the About page (A4) and whether "manufacturer" may be claimed (B1).
- Decide whether competitor cross-references may ever be public (C11). Customer names stay out of the site.
- Does the name "Aster Industrial Coatings" still fit a resin supplier? The logo descriptor reads INDUSTRIAL COATINGS. (Owner call; everything is configurable.)


## 3. Correction and final state (same day, later)

**Owner clarification:** "We are selling finished coatings. A water reducible that is a primer and a topcoat (mainly for steel coatings) and a short oil alkyd coating (a primer and a topcoat)." Then: "Rather than a products page we can do a services page exactly like Sheboygan's. Once we have formulated products we can add them in later."

**Site now:**
- Content model back to coatings: `substrates`, `industries`, application methods, `function` primer/topcoat, `baseResin` statement, gallons in the quote form; sample request kept (product, intended use, quart/gallon, coating used today).
- **Products** (`content/products/products/coatings.ts`): four drafts under placeholder names, every spec `unknown`, substrates = steel, family + function set. Products hub rebuilt in Trinkote's style (Water-based → Water-Reducible Alkyd; Solvent-borne → Short Oil Alkyd; family paragraph with the approved/unapproved flag; primer and topcoat beneath). **Unlisted until a product is published**: out of navigation and sitemap, `noindex`, drafts still visible in development.
- **Services** (`/services`) in Sheboygan's structure: intro, three promises, one section per confirmed service (custom formulation & technical development, precision colour matching, toll manufacturing), closing band. Quality testing, technical support and shipping are drafted in `messaging.ts` with `offered: false`.
- Home: hero buttons = Request a quote / Our services; services section replaces the product list; industries tiles restored with the original six photos.
- Images: `family-*` (2) and `service-*` (3) slots filled from already-licensed Pexels downloads; `market-*` retired.
- Resin data moved to `site/content/resins/` (`sunpol-grades.ts`, `development-grades.ts`, `types.ts`), decoupled from the product schema; competitor cross-references live only there and a unit test keeps competitor and customer names out of product copy.

**Checks:** `tsc` clean · `eslint` clean · Vitest 21/21 · Playwright 42/42 (desktop + mobile, zero axe violations on 15 pages) · `check-content`: 4 products (0 published), 0 documents · `next build` 30 routes.

**Owner to-do:** confirm Services wording (C12); supply names, codes and data sheets for the four coatings (C1, C4, C7); decide the Sunpol statement (A4/B1); confirm industries (D1).
