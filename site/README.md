# Aster Industrial Coatings — website

B2B website for Aster Industrial Coatings: product catalog with specifications and data sheets, industries and application pages, and a lead-capture system (quote requests, technical inquiries, contact). Built with Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4 and Zod. All public pages are statically generated; only the inquiry API runs on the server.

Project documentation (requirements, architecture, plans, open questions) lives in `../docs/`.

## Quick start

```bash
cd site
npm install
cp .env.example .env        # defaults use mock CRM, console email and a local JSONL lead store
npm run dev                 # http://localhost:3000
```

Development builds show every unset business fact as a visible `[… NOT SET]` or `[OWNER COPY NEEDED]` marker, and sample products carry a purple DRAFT banner. Production builds (`ASTER_ENV=production`) omit all of that — and refuse to build while any BLOCK-level fact is missing.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (drafts and placeholders visible unless `ASTER_ENV=production`) |
| `npm run build:prod` | Strict build: fails on unset BLOCK config fields or invalid content, then builds |
| `npm run start` | Serve the built site |
| `npm run typecheck` / `lint` / `format:check` | Static checks |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Playwright end-to-end + axe accessibility scan of every page, desktop and mobile. Set `PLAYWRIGHT_CHROMIUM_PATH` to reuse an installed Chromium instead of downloading one. |
| `npm run check:config` | Lists unset business facts and the open question each maps to |
| `npm run check:content` | Validates content files and publish gates |
| `npm run leads:export` | Operator: export stored leads as CSV |
| `npm run leads:retry` | Operator: replay CRM/email for leads marked `needs-attention` |

## Where things live

```
content/
  site.config.ts        business identity — the single source; null = not yet supplied
  messaging.ts          approved copy per page, each string flagged approved/unapproved
  navigation.ts         header/footer nav derived from published content
  products/             categories, applications, substrates, industries, products/*.ts
  documents/            TDS/SDS registry with approval status
app/                    routes; app/styles/tokens.css holds every design token
components/             layout, ui, product, forms, seo
lib/                    content loader + validation, SEO helpers, form schemas, inquiry pipeline,
                        lead store, CRM and email adapters, rate limiting
scripts/                config/content checks, lead export/retry
tests/unit, tests/e2e   Vitest and Playwright
public/documents/       approved public PDFs (none yet)
data/                   local JSONL lead store (git-ignored)
```

## Adding a real product

1. Create `content/products/products/<slug>.ts` from one of the sample files and add it to `index.ts`.
2. Fill `specifications` from the TDS. Use `state: 'unknown'` for anything not on the sheet — it is hidden in production, never shown as a value. Use `'confirmed-zero'` only for a genuine zero.
3. Put the TDS/SDS PDF in `public/documents/` and register it in `content/documents/documents.ts` with `approved: true`, `approvedBy`, `approvedAt`, `public: true`, `status: 'published'`.
4. Set the product's `status: 'published'` and record `review.reviewedBy` / `reviewedAt`.
5. `npm run check:content` — it will refuse to publish a product with placeholder wording, an unreviewed state, or a reference to an unapproved document.

## Inquiry pipeline

`POST /api/inquiries/{quote|technical|contact}` → validate (Zod, shared with the client) → honeypot, minimum time-to-submit, per-IP rate limit, idempotency key → **save to the lead store first** → CRM adapter (8 s timeout, 2 retries on 5xx/timeout) → internal notification email → customer confirmation → truthful response. If the CRM or email fails the lead is kept and marked `needs-attention`, an admin alert is sent, and `npm run leads:retry` replays it. Forms work without JavaScript (plain POST + redirect).

Adapters are selected by environment variables (`CRM_PROVIDER`, `EMAIL_PROVIDER`, `LEAD_STORE`). Only `mock`, `console` and `jsonl` exist today; HubSpot and SMTP are Increment 5. The JSONL store and in-memory rate limiter are for development and single-server hosting — serverless hosts need a durable store (see `docs/technical-architecture.md` §8.4).

## Security notes

- Security headers are set in `next.config.ts`. The CSP currently allows `'unsafe-inline'` for same-origin scripts because Next.js injects inline bootstrap scripts; moving to build-time script hashes is tracked in the progress report.
- Secrets come only from environment variables; `.env` is git-ignored; `NEXT_PUBLIC_*` is reserved for values safe to expose.
- `npm audit` reports a `braces` denial-of-service finding reachable only through `eslint-config-next` (development tooling; no fixed release published as of 2026-10-16). It is not shipped to production. CI audits production dependencies only.

## GitHub Actions

The CI workflow is in `github-workflows/ci.yml` in the delivered folder (the `.github` directory cannot be written through the desktop link). When the project moves to GitHub, move it to `.github/workflows/ci.yml`.

## Environment variables

See `.env.example`. Nothing is required for local development.

## Fonts

Michroma (display, stand-in for the licensed Mirano) and Barlow (text) are self-hosted from `app/fonts/` under the SIL Open Font License. No third-party requests at build or run time. To switch to Mirano, replace the `display` font sources in `app/layout.tsx`.
