# Technical Architecture

**Project:** Aster Industrial Coatings website · **Status:** Approved 2026-10-16; implemented through Increment 4 · 2026-10-09

This document covers the planning outputs of Phases 3–7, 9 and 15 of the brief: positioning directions, content model, information architecture and page map, stack selection with rationale, component inventory, product catalog model, CRM adapter design, and security design. Nothing described here is implemented yet.

---

## 1. Repository inspection

The connected folder (`Industrial Coatings Website`) and the Claude project were both empty on 2026-10-09. There is no existing framework, code, content or design to reuse. The stack below is therefore a fresh selection.

## 2. Positioning directions (Phase 3)

Three defensible directions, all compatible with the required tone (technically credible, direct, industrial, evidence-based, no exaggeration). Each is written so that it remains true regardless of which business-model facts (open questions B1–B3) come back; the parts that depend on those facts are marked.

### Direction 1 — "Specification-first supplier"
**Core idea:** The site is a more transparent technical resource than the reference competitors: every published product has an HTML spec table, substrates, application guidance and instant TDS/SDS downloads.
**Homepage lead (illustrative, not final copy):** "Industrial coatings for fabricated metal — with the specifications and data sheets you need up front."
**Why it works against the competitors:** Neither reference site has product pages or self-service documents (see `competitive-research.md` §5, items 1–2). This is the largest, most verifiable gap.
**Tradeoffs:** Entirely dependent on the owner supplying verified product data and approved documents (C1–C8). Weak if the launch catalog is small. Requires a product-data review workflow and ongoing document maintenance.
**Fits best if:** B1 = manufacturer or formulator, and a launch catalog of roughly eight or more products exists.

### Direction 2 — "Responsive technical partner"
**Core idea:** Lead with process and service: structured quote requests and, **only where confirmed by the owner (E4, E2, B3, B7)**, a published response-time commitment, access to technical staff, lead times, samples and colour matching.
**Homepage lead (illustrative, not final copy; only if E4 and staffing are confirmed):** "Talk to a coatings technical team that answers quote requests in [N] business day(s)."
**Why it works:** Both competitors funnel everything through generic contact forms with no service commitment; SPC's document requests take three working days. Service transparency is persuasive to plant managers and buyers under time pressure.
**Tradeoffs:** Every service claim must be operationally true from day one (E3–E4, B3, B7). If the team is small, a published SLA is a risk. Less differentiated on search (service pages attract less organic traffic than product pages).
**Fits best if:** The team can commit to response times and has real technical staff available, while the catalog is still being finalised.

### Direction 3 — "Application-led problem solver"
**Core idea:** Organise the site around what the buyer is trying to coat and the conditions it must survive (substrate, environment, line type, compliance), with products recommended per application. Industry and application pages are the primary entry points; products sit underneath.
**Homepage lead (illustrative, not final copy):** "Choose coatings by what you make and how you finish it."
**Why it works:** Mirrors how buyers search ("primer for galvanized steel", "DTM coating for ag equipment") and gives a natural home for a working product selector (SPC advertises one in its header, but no destination was found during the audit).
**Tradeoffs:** Needs the most content (D1, D4, C3) and the strongest technical review to avoid recommending a product for an application it has not been validated for. Highest risk of thin pages if industries are built before content exists.
**Fits best if:** The owner can name priority industries and applications with confidence and has application-specific validation data.

### Recommendation
Build the architecture so that **Direction 1 is the spine** (products with specs and documents are the only sustainable organic asset), **Direction 2 provides the conversion layer** (RFQ, response commitment, contact clarity), and **Direction 3 is added incrementally** as application and industry content is approved. The IA below supports all three without rework. The homepage messaging decision should be made after B1, C1 and E4 are answered; until then the homepage uses descriptive, claim-free copy from the brand config.

Tone rules applied to all copy: concrete nouns over adjectives; name the substrate, the method, the standard; never "revolutionary", "world-class", "premium", "superior" without a stated, checkable basis; no heritage, capacity or customer claims that are not in the verified-facts table.

## 3. Content model (Phase 3 and 7)

All business identity and approved messaging live in **one place** and are consumed by every page.

```
content/
  site.config.ts          # brand, legal, contact, regions, social, feature flags (single source)
  messaging.ts            # approved headline/description strings keyed by page; each has `approved: boolean`
  navigation.ts           # header/footer/mobile nav derived from published content
  products/
    categories.ts         # category taxonomy
    applications.ts
    substrates.ts
    industries.ts
    products/*.ts         # one file per product (typed, validated)
  documents/
    documents.ts          # TDS/SDS/guide registry (approval status, revision, file path or URL)
  pages/
    about.ts, quality.ts, privacy.ts, accessibility.ts, ...   # long-form approved copy
```

### 3.1 `site.config.ts` (brand configuration — the "central location" from the brief)
```ts
export const site = {
  brand: { name: 'Aster Industrial Coatings', shortName: 'Aster', provisional: false, tagline: null },
  legal: { entityName: null, entityType: null, jurisdiction: null },   // null = not yet supplied
  contact: { salesPhone: null, salesEmail: null, technicalEmail: null, address: null, hours: null },
  regions: { served: ['US'], shipping: null },
  urls: { site: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000' },
  social: {},
  relationships: { sunpol: { disclose: false, text: null } },
  features: { quoteAttachments: false, analytics: false, crm: 'mock', email: 'console', selector: false },
} satisfies SiteConfig;
```
Every `null` renders as a visibly flagged placeholder in development (`[CONTACT PHONE NOT SET]`) and is **omitted** in production builds; a build-time check lists all unset required fields and fails `npm run build:prod` if any `BLOCK`-priority field is null (see open-questions). This is how "do not present missing details as verified public claims" is enforced mechanically rather than by memory.

### 3.2 Product model (Phase 7)
```ts
type Product = {
  id: string;                      // stable, never changes (e.g. 'vx-1000' — illustrative id, not a real product)
  slug: string;                    // URL slug
  name: string;                    // official name (C1)
  code?: string;                   // product code, if distinct
  status: 'draft' | 'review' | 'published' | 'retired';
  categoryIds: string[];           // ≥1
  systemType?: 'water-based' | 'solvent-based' | 'two-component' | 'powder' | 'other';
  function?: 'primer' | 'topcoat' | 'primer-topcoat' | 'intermediate' | 'specialty';
  shortDescription: string;        // approved
  description: string;             // approved; Markdown allowed
  applications: string[];          // ids into applications.ts
  substrates: string[];            // ids into substrates.ts
  limitations?: string[];          // approved cautions
  specifications?: Spec[];         // see below
  packaging?: Packaging[];         // omitted entirely if unknown
  documents: { tds?: string; sds?: string; other?: string[] };   // ids into documents.ts
  images?: Image[];                // approved imagery with alt text and rights note
  relatedProductIds?: string[];
  certifications?: string[];       // ids into a certifications registry with evidence refs
  seo?: { title?: string; description?: string };
  review: { reviewedBy: string | null; reviewedAt: string | null; source: string | null };
};

type Spec = {
  key: string;                     // e.g. 'volumeSolids'
  label: string;                   // 'Volume solids'
  value: number | string | null;   // null = unknown
  unit?: string;
  method?: string;                 // e.g. 'ASTM D2697'
  note?: string;
  state: 'value' | 'unknown' | 'not-applicable' | 'confirmed-zero';
};
```
The `state` field is how the brief's requirement to "clearly distinguish missing information from a value of zero or a confirmed absence" is met. Templates render `unknown` as "Not specified", `not-applicable` as "N/A", and `confirmed-zero` as the actual zero with unit. Rows with `unknown` are shown only in draft mode.

Build-time validation (Zod) enforces: `published` requires non-null `review.reviewedBy/reviewedAt`, at least one category, non-empty descriptions, and that referenced documents exist and are `approved: true`. A product that fails validation cannot be published and fails the build with a clear message.

### 3.3 Document registry
```ts
type Doc = { id; productIds; type: 'TDS'|'SDS'|'guide'|'brochure'|'certificate'; title; revision; revisedAt;
             file: string /* /documents/... */; approved: boolean; approvedBy; approvedAt; public: boolean; sizeBytes; };
```
Only `approved && public` documents are linked, listed or included in the sitemap. SDS are kept ungated as a matter of policy. Files are served from the repository's `public/documents/` folder (or an object store later) with stable, descriptive filenames (illustrative: `vantrex-vx-1000-tds-rev3.pdf`).

## 4. Information architecture and page map (Phase 4)

### 4.1 URL structure
| Route | Page | Index? | Built when |
|---|---|---|---|
| `/` | Home | yes | always |
| `/products` | Products hub (by category and system type) | yes | ≥1 published product |
| `/products/[category]` | Category page | yes | ≥1 published product in category |
| `/products/[category]/[product]` | Product detail | yes | product `published` |
| `/industries` | Industries hub (all industries as sections) | yes | content approved |
| `/industries/[industry]` | Industry page | yes | only when unique approved content ≥ ~300 words and ≥2 linked products |
| `/applications` | Applications hub | yes | content approved |
| `/applications/[application]` | Application page | yes | same threshold as industries |
| `/resources` | Technical Resources (document library, filterable) | yes | ≥1 approved public doc |
| `/resources/[doc]` | Document landing page (title, product, revision, download) | yes | approved doc |
| `/about` | About | yes | always (claim-free until A8) |
| `/quality` | Quality & Compliance | yes | only if C8 evidence exists |
| `/request-a-quote` | RFQ form (primary conversion) | yes | always |
| `/technical-inquiry` | Technical inquiry form | yes | always |
| `/contact` | Contact | yes | always |
| `/privacy` | Privacy Policy | yes | always (legal review flag) |
| `/accessibility` | Accessibility Statement | yes | always |
| `/request-a-quote/thank-you` etc. | Confirmation pages | **noindex** | always |
| `/404` | Custom not-found | n/a | always |
| `/sitemap.xml`, `/robots.txt` | generated | — | always |

Rules: canonical URLs are lowercase, hyphenated, no trailing slash; a product belongs to one canonical category URL (additional categories cross-link to it, no duplicates); no page is generated for an entity with `status !== 'published'`; confirmation and utility pages are `noindex` and excluded from the sitemap.

### 4.2 Page map and primary conversion path

```
                 ┌──────────── Header: Products ▾ · Industries · Applications · Resources · About · Contact · [Request a Quote] · ☎ ────────────┐
                 │                                                                                                                              │
   Home ──┬──► Products hub ──► Category ──► Product detail ──┬──► Request a Quote (pre-filled product) ──► Thank-you (noindex)
          │                                   │  ▲            ├──► Technical Inquiry (pre-filled product) ──► Thank-you
          │                                   │  │            ├──► TDS / SDS download (Resources doc page)
          │                                   │  └── related products / same substrate / same application
          ├──► Industries hub ──► Industry ───┴──► recommended products ──► (as above)
          ├──► Applications hub ──► Application ──► recommended products ──► (as above)
          ├──► Resources ──► Document page ──► Product detail
          ├──► About ──► Quality (if exists) ──► Contact
          └──► Request a Quote (hero and persistent header CTA)

   Footer on every page: Products by category · Industries · Resources · Request a Quote · Technical Inquiry · Contact · Privacy · Accessibility
   Breadcrumbs on every page below Home (illustrative: Home › Products › Primers › VX-1000)
```

Primary conversion path: any entry → product detail → Request a Quote. Every product, industry and application page carries a quote CTA that pre-fills the inquiry context (product id, referring page), so sales sees what the buyer was looking at.

Internal-link rules: product ↔ category (both ways); product → applications and substrates (and those pages back to products); product → documents (and document → product); industry/application → ≥2 products; resources hub → every approved document; About → Quality → Contact. Contextual links inside body copy are preferred over "related" blocks alone.

### 4.3 Navigation
Desktop: six text items plus a visually distinct "Request a Quote" button and the phone number. "Products" opens a simple two-column disclosure (categories by function; system types), not a mega-menu with imagery. Mobile: a full-height dialog menu with accordion for Products, opened by a labelled button (`aria-expanded`, focus trapped, Esc closes). No hover-only interactions.

## 5. Technology stack (Phase 5) — proposed, pending approval

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 16.x (App Router), React 19.x, TypeScript (strict)** | Current stable major (16.4 released 2026-10-06 per nextjs.org/blog). Static generation for all public pages; server runtime only for form routes. Mature metadata, sitemap and image APIs. Widest hosting support. |
| Styling | **Tailwind CSS v4** with design tokens defined as CSS custom properties in `@theme` | CSS-first tokens (colour, type scale, spacing, radius, shadow, state) in one file; no runtime CSS-in-JS; small output; easy for later maintainers. |
| Content | Typed TypeScript content files validated by **Zod** at build | No database or CMS is justified yet (A7/F7). Content stays separate from presentation; version-controlled; reviewable in pull requests; trivially migrated to a Git-based CMS later. |
| Forms | Native `<form>` + progressive enhancement; **Zod** schemas shared by client and server; Next.js Route Handlers (`/api/inquiries/quote`, `/api/inquiries/technical`, `/api/inquiries/contact`) | Works without JS; one schema for both validation layers; route handlers make rate-limiting, idempotency and integration calls simple to test. |
| Email | Adapter interface; implementations: `console` (dev), `smtp` via **Nodemailer** (provider-agnostic) | Any provider the owner already has (F3) works over SMTP; no vendor SDK lock-in. |
| CRM | Adapter interface; implementations: `mock` (dev/tests), `hubspot` (REST, server-side only) | See §8. |
| Lead durability | `LeadStore` adapter: `jsonl-file` (dev/single-server self-host), object/KV-store implementation for serverless hosts (chosen with F2) | Aims to ensure no lead is lost when CRM/email fail; the guarantee holds only with a durable store appropriate to the host. |
| Spam / abuse | Honeypot + minimum-time-to-submit + per-IP token-bucket rate limit (in-memory for single-server; pluggable shared store for multi-instance hosts) + optional **Cloudflare Turnstile** behind a flag | No CAPTCHA by default (accessibility); Turnstile is free and accessible if abuse appears. |
| Analytics | **GA4** via `gtag` loaded only after consent; typed event helper; no PII | Brief requests GA4/Search Console evaluation; consent-gated. |
| Testing | **Vitest** + Testing Library (unit/component), **Playwright** (e2e) + `@axe-core/playwright` (accessibility), Lighthouse CI (performance budget) | Standard, well-supported, runs in GitHub Actions. |
| Lint/format | ESLint (next + typescript-eslint + jsx-a11y), Prettier | Catches a11y and type issues early. |
| CI | GitHub Actions: typecheck, lint, unit, build, e2e, axe, `npm audit`, secret scan | Production build check on every PR. |
| Hosting | Any Node 22+ host (Node 20 reached end-of-life in April 2026); works on Vercel, Netlify, Cloudflare or self-hosted Node | Owner decision F2. **The LeadStore and rate-limit stores must match the host**: serverless/multi-instance hosts have no durable or shared local filesystem, so the file-based implementations are for development and single-server self-hosting only; a managed object/KV store implementation is required there (see §8.4). |

Deliberately **not** included: a database, CMS, auth, live chat, animation libraries, UI kits, state-management libraries, tag managers (GA4 loaded directly), third-party form services.

Dependency budget at launch (runtime): `next`, `react`, `react-dom`, `zod`, `nodemailer`. Everything else is dev-only.

### 5.1 Rendering strategy
All content pages are statically generated at build time (`generateStaticParams` from published content). Form pages are static with client-side progressive enhancement; the API routes run on the server. No per-request rendering of public pages means fast TTFB, predictable LCP and no server dependency for the marketing site if integrations are down.

### 5.2 Why not alternatives
- **Astro**: excellent for static content, but form handling/API routes and the React ecosystem for accessible dialogs/menus are more mature in Next.js, and Next.js has the larger pool of maintainers should the owner hire or contract support later (F8).
- **WordPress** (what both competitors use): editor-friendly, but plugin-driven security surface, performance overhead, and the repeated hygiene problems observed in the audit. Can be revisited as a headless content source if F7 demands non-developer editing.
- **A headless CMS now**: adds a paid service, credentials and a sync layer before anyone has asked to edit content. Content files are designed so that adopting one later is a mapping exercise.

## 6. Component inventory (Phase 5)

| Component | Notes |
|---|---|
| `SiteHeader`, `PrimaryNav`, `ProductsDisclosure`, `MobileMenuDialog` | Keyboard operable; `aria-current`; focus trap; Esc; no hover-only |
| `SiteFooter` | Config-driven; omits unset contact fields |
| `Breadcrumbs` | Renders BreadcrumbList JSON-LD |
| `ProductCard`, `ProductGrid`, `ProductFilters` (category/system/substrate/application; URL-synced, no JS required for base list) | |
| `SpecTable` | `<table>` with `<caption>`, `<th scope>`; handles spec `state` |
| `DocumentList`, `DocumentDownload` | File type, size, revision; `download` attribute; tracked event |
| `CtaBand`, `QuoteCtaInline` | Pre-fills product context |
| `Form*`: `Field`, `Fieldset`, `Select`, `Textarea`, `FileInput`, `Honeypot`, `ErrorSummary`, `StatusRegion` (`role="status"`/`alert`) | Shared validation schema; error summary links to fields |
| `QuoteForm`, `TechnicalInquiryForm`, `ContactForm` | Progressive steps rendered as fieldsets; conditional fields |
| `SubmissionResult` | Success / failure / "temporarily unavailable — call us" states |
| `RelatedProducts` | |
| `Seo` helpers: `buildMetadata()`, `JsonLd` | Organization, BreadcrumbList, Product (only supported properties) |
| `ConsentBanner`, `AnalyticsLoader` | Loads GA4 only after consent; no banner if analytics disabled |
| `Dialog` | Native `<dialog>` with polyfilled focus management |
| `Placeholder` | Dev-only visible marker for unset config |
| `SkipLink`, `VisuallyHidden`, `Prose` | |

## 7. Visual design system (Phase 6) — tokens plan

Tokens live in `app/styles/tokens.css` (consumed by Tailwind `@theme`). Palette: one dark industrial neutral (near-black blue-grey) for text and header; one restrained accent for primary actions (to be chosen for ≥4.5:1 contrast on white and on the dark neutral); warm light-grey surfaces; semantic success/warning/error. Typography: a highly legible grotesque for UI/headings and a slightly narrower companion or the same family for body; type scale 14/16/18/20/24/30/36/48 with 16 px minimum body on all devices; line-length cap ~70 ch. Spacing scale 4 px base. Radius small (2–4 px) to read "engineered", not "consumer". Shadows minimal; borders do the work. Motion: only opacity/transform ≤200 ms and fully disabled under `prefers-reduced-motion`. Imagery: real, approved photography only; until then, flat technical illustrations/graphics that cannot be mistaken for the company's facility or products. Design review will include contrast checks and a mobile/tablet/laptop/desktop pass before implementation is accepted.

## 8. CRM integration design (Phase 9)

### 8.1 Portal decision (owner input E5)
| Option | Pros | Cons |
|---|---|---|
| **Separate HubSpot portal** for the new company | Clean data, independent reporting, no accidental exposure of the related business's contacts, simpler permissions, clean brand in emails | Second subscription/seat cost; duplicate admin; cross-selling visibility lost |
| **Segmented existing portal** (business unit/brand property, separate pipeline, team-scoped permissions, separate forms and subscription types) | One system, shared admin, cross-company visibility | Requires disciplined segmentation; risk of mixed reporting and marketing lists; private-app scopes apply portal-wide; brand/legal separation for consent and unsubscribes must be configured carefully |

Recommendation pending A4/E5: if the entities are legally distinct and have different customer bases, a separate portal is cleaner. If they share sales staff and customers, a segmented existing portal with a dedicated pipeline, a required "Brand" property, and brand-specific subscription types is workable. The integration code is the same either way (portal ID and token are config).

### 8.2 Adapter interface
```ts
interface CrmAdapter {
  upsertContact(input: ContactInput, ctx: Ctx): Promise<{ id: string }>;
  upsertCompany(input: CompanyInput, ctx: Ctx): Promise<{ id: string } | null>;
  associate(contactId: string, companyId: string): Promise<void>;
  createInquiry(input: InquiryInput & { contactId; companyId? }, ctx: Ctx): Promise<{ id: string }>;  // deal/ticket/custom object
  health(): Promise<'ok' | 'degraded' | 'unconfigured'>;
}
```
Implementations: `MockCrmAdapter` (records calls, can simulate failures/timeouts for tests) and `HubSpotCrmAdapter`.

### 8.3 HubSpot mapping (to be confirmed against the actual portal)
- **Option A — Forms submission API (authenticated):** `POST https://api.hsforms.com/submissions/v3/integration/secure/submit/{portalId}/{formGuid}` with `fields[]`, `context { hutk, pageUri, pageName, ipAddress }` and `legalConsentOptions`. HubSpot handles contact create/update and attribution from `hutk`. Simplest; attribution works natively; requires one HubSpot form per inquiry type.
- **Option B — CRM Objects API:** search contact by email → create/update; search company by domain → create/update; create Deal (or Ticket) with product/application properties; associations v4. Full control; more calls; must implement dedupe ourselves.
- **Recommended:** A for lead capture and attribution **plus** B for the Deal/Ticket record and product-interest properties, behind the same adapter. Final choice after F4 (which objects the sales team actually works from).
- Dedupe: contacts by email (HubSpot native in A; explicit search in B); companies by email domain (excluding free-mail domains); inquiries by our idempotency key stored in a custom property to prevent duplicate deals on retry.
- Properties to create in the portal (documented in setup guide): `aster_product_interest`, `aster_application`, `aster_substrate`, `aster_est_annual_volume`, `aster_timeline`, `aster_project_location`, `aster_inquiry_type`, `aster_inquiry_id`, `aster_landing_page`, `aster_utm_*`.
- Credentials: Private App access token in `HUBSPOT_PRIVATE_APP_TOKEN` (server only); least-privilege scopes (e.g. `forms`, `crm.objects.contacts.read/write`, `crm.objects.companies.read/write`, `crm.objects.deals.read/write`; tickets only if used) — exact scope names confirmed during setup.
- Timeouts 8 s per call; retry ×2 with jitter on 429/5xx/network; never retry on 4xx validation errors; structured log `{ inquiryId, step, status, durationMs, errorCode }` — no field values, no tokens.
- Status: **not implemented, not tested**. Will remain marked incomplete until exercised against an authorised portal.

### 8.4 Submission pipeline (Phases 8 and 10)
The same pipeline serves all three inquiry routes (`quote`, `technical`, `contact`); only the schema, routing recipient and CRM inquiry type differ.
```
POST /api/inquiries/{quote|technical|contact}
  1. parse + validate (Zod)          → 400 with field errors
  2. anti-abuse: honeypot, min time, rate limit, idempotency key check → 429 / 409 / 200 (replay)
  3. assign inquiryId (UUID), capture attribution (UTM, landing page, referrer; HubSpot hutk only if analytics/marketing consent was given), timestamp
  4. LeadStore.save(status: 'received')           ← durable first, before any external call
  5. CRM.create… (timeout, retry)                 → record result on lead
  6. Email.internalNotification                   → record result
  7. Email.customerConfirmation (only if 4 succeeded and the lead is accepted)
  8. respond: success (if store OK) with "integration pending" note internally if 5/6 failed;
              failure (if store AND email both failed) with phone/email fallback shown to user
  9. on failure of 5 or 6: alert admin (email), mark lead 'needs-attention'; `npm run leads:retry` replays safely using inquiryId
```

## 9. Security design (Phase 15)
- Validation on the server for every input; output encoding by React; Markdown content rendered through a sanitising renderer for the few approved rich-text fields.
- Security headers via `next.config` / middleware: `Content-Security-Policy` using **script hashes with `strict-dynamic`** so that fully static pages stay static (per-request nonces would force dynamic rendering in the App Router); GA4 origins added only when analytics is enabled, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-Frame-Options`/`frame-ancestors 'none'`.
- CSRF: same-origin checks on POST routes (Origin/Sec-Fetch-Site), form tokens where cookies are involved; no cookie-based auth exists, which limits CSRF exposure.
- Rate limiting per IP and per email; request-size limits; file uploads (if enabled) restricted to PDF/PNG/JPG/DWG-as-PDF, ≤10 MB, MIME sniffed, renamed, stored outside the web root or in an object store with no public URL, never executed, linked in notifications by signed URL only.
- Secrets only via environment variables; `.env.example` with placeholders; secret scanning in CI; `NEXT_PUBLIC_` prefix reserved for values that are safe to expose publicly (site URL, GA ID).
- No admin endpoints, no data export routes. Lead retry is a CLI script run by an operator with server access.
- Dependency audit in CI; Renovate/Dependabot recommended.
- Logging: structured, no PII beyond inquiryId and email domain, no secrets; retention documented in `lead-generation-plan.md`.
- Environment variables (documented in README and `.env.example`): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional), `CRM_PROVIDER` (`mock|hubspot`), `HUBSPOT_PORTAL_ID`, `HUBSPOT_PRIVATE_APP_TOKEN`, `HUBSPOT_FORM_GUID_QUOTE`, `HUBSPOT_FORM_GUID_TECHNICAL`, `EMAIL_PROVIDER` (`console|smtp`), `SMTP_HOST/PORT/USER/PASS`, `EMAIL_FROM`, `SALES_NOTIFICATION_EMAIL`, `TECHNICAL_NOTIFICATION_EMAIL`, `ADMIN_ALERT_EMAIL`, `LEAD_STORE` (`jsonl|…`), `LEAD_STORE_PATH`, `TURNSTILE_SITE_KEY/SECRET` (optional), `RATE_LIMIT_*`.

## 10. Proposed repository layout
```
/app                 routes (App Router), layouts, metadata, sitemap.ts, robots.ts, not-found.tsx
/app/api/inquiries   route handlers
/components          UI components (by domain: layout, product, forms, seo, a11y)
/content             site.config.ts, messaging, products, documents, pages (see §3)
/lib                 validation schemas, crm/, email/, leads/, analytics/, seo/, security/
/public/documents    approved public PDFs
/scripts             content validation, lead retry, config check
/tests               unit, component, e2e, a11y
/docs                this documentation
.env.example, README.md, CONTRIBUTING.md, .github/workflows/ci.yml
```

## 11. Decisions requested from the owner before implementation begins
1. Approve the stack in §5 (or name constraints: hosting policy, preferred provider, maintainers' skills).
2. Confirm the IA in §4 is acceptable as a starting point.
3. Provide the GitHub repository URL (F9).
4. Indicate the preferred positioning emphasis (§2) or defer until B1/C1/E4 are answered.
