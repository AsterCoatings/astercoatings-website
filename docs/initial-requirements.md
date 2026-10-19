# Initial Requirements

**Project:** Aster Industrial Coatings — industrial coatings B2B website
**Status:** Draft for owner review · 2026-10-09
**Owner contact:** Lucas Fairfield

This document records what the website must do, in priority order, and separates **verified facts** from **assumptions** that still need owner confirmation. Every assumption has a matching entry in `docs/open-questions.md`. **ID conventions:** `FACT#` = verified fact (this doc), `AS#` = assumption (this doc), `P#/L#/CRM#` = requirements (this doc); `A#–F#` always refer to questions in `docs/open-questions.md`.

---

## 1. Verified facts (as of this document)

Only the items below are confirmed. Everything else about the business is an assumption or an open question.

| # | Fact | Source |
|---|---|---|
| FACT1 | The company name is **Aster Industrial Coatings** (owner decision, 2026-10-12). Knockout screen passed (`naming-research.md` §5); formal attorney clearance still pending. The owner holds asterpaint.net and astercoatings.net. | Owner, 2026-10-12 |
| FACT2 | The company is "associated with Sunpol". The nature of the association is not yet defined. | Project brief |
| FACT3 | The company will operate in the industrial coatings market. | Project brief |
| FACT4 | The two reference competitors are trinkote.com and shebpaint.com. | Project brief; audited in `docs/competitive-research.md` |
| FACT5 | HubSpot is already used in the related business environment and is the initial CRM candidate. | Project brief |
| FACT6 | The project repository is currently empty; no prior code or content exists. | Folder and project inspection, 2026-10-09 |
| FACT7 | Code will live in a GitHub repository (URL to be provided by owner). | Owner decision, 2026-10-09 |
| FACT8 | Public directories list a "Sun Polymers International Inc." (Mooresville, IN; specialty resins, curing agents and additives for powder coatings; also sells resins from parent Chan Sieh Enterprises) and a "Sunpol Resins & Polymers" (alkyd resins). **Which, if either, is the "Sunpol" in FACT2 is unconfirmed.** | pcimag.com buyers-guide listing; specialchem.com supplier page |

## 2. Assumptions (must be confirmed before publication)

| # | Assumption | Why it matters | Open question |
|---|---|---|---|
| AS1 | The company sells liquid industrial coatings for metal substrates to OEMs and fabricators in North America. | Drives information architecture, keyword map and industry pages. | B1, D1, A7 |
| AS2 | The product range will include at least some of: primers, topcoats, water-based and solvent-based systems. | Drives category structure and product content model. | C1, C2 |
| AS3 | Products will have approved TDS and SDS documents available for public distribution. | Drives technical-resources section and the document-download conversion. | C7 |
| AS4 | Leads will be handled by a small sales/technical team that wants qualified, structured inquiries. | Drives RFQ form design and CRM routing. | E1–E3 |
| AS5 | The site will be in US English only at launch. | Drives i18n decisions (none at launch). | A7 |
| AS6 | There is no requirement for e-commerce, pricing display, customer login or distributor portal at launch. | Keeps stack simple (no database or auth). | B9, F6 |
| AS7 | Non-technical staff will need to update company details and some content; developers will update products via structured content files initially. | Drives content model and CMS decision. | F6, F7 |

## 3. Business goals (from the brief, in priority order)

1. Qualified B2B lead generation — primary conversion is **Request a Quote**; secondary are Technical Inquiry, Contact Sales, Technical Document Download, Request Product Information.
2. Technical credibility with engineers, plant managers, procurement and technical directors.
3. Search engine visibility for product, application and industry intent.
4. Product discovery by chemistry, application, substrate and industry.
5. Accessibility (WCAG 2.2 AA target).
6. Performance (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 as measurable goals).
7. Mobile usability.
8. CRM integration (HubSpot evaluated first).
9. Analytics and conversion measurement with privacy controls.
10. Maintainability and scalability.

## 4. Functional requirements

### 4.1 Public pages
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| P1 | Home page communicating what is supplied, who it serves, applications, why contact, and how to request a quote | Must | Uses central brand config; no unverified claims |
| P2 | Products hub and product category pages | Must | Only categories with ≥1 published product |
| P3 | Product detail pages from structured content | Must | Only `status: published` products are built/indexed |
| P4 | Industries hub; individual industry pages only where unique approved content exists | Should | Otherwise industry content lives on the hub page |
| P5 | Applications page(s) | Should | Cross-links products ↔ applications |
| P6 | Technical Resources (TDS/SDS library, guides) | Must | Only approved public documents |
| P7 | About page | Must | No fabricated history |
| P8 | Quality & Compliance page | Conditional | Only if certifications/compliance facts are confirmed |
| P9 | Request a Quote page | Must | Primary conversion |
| P10 | Technical Inquiry page | Must | Secondary conversion |
| P11 | Contact page | Must | Working `tel:`/`mailto:`, address; hours shown once approved (A9) |
| P12 | Privacy Policy | Must | Legal review required before launch |
| P13 | Accessibility Statement | Must | Honest statement of target and known gaps |
| P14 | Custom 404 | Must | With search/navigation help |
| P15 | Legal/Terms page | Should | If owner requires |

### 4.2 Lead generation
| ID | Requirement | Priority |
|---|---|---|
| L1 | Progressive RFQ form: contact block + project block; conditional fields | Must |
| L2 | Server-side validation (schema-based), accessible labels and error messages | Must |
| L3 | Spam protection (honeypot + time-to-submit + optional CAPTCHA-free challenge) and rate limiting | Must |
| L4 | Duplicate-submission protection (idempotency key per form session) | Must |
| L5 | Optional file attachment with type/size allowlist, server-side validation, no execution, scanned or quarantined storage | Should (off by default until storage is configured) |
| L6 | Clear success / failure / "integration unavailable" states; never silently discard a lead | Must |
| L7 | Internal notification email and customer confirmation email (only after successful acceptance) | Must |
| L8 | Privacy notice and consent capture where legally required | Must |
| L9 | Attribution capture (UTM, landing page, referrer, HubSpot `hutk` if present) without PII in analytics | Should |
| L10 | Durable fallback storage of inquiries when CRM/email fail (so leads are recoverable) | Must |

### 4.3 CRM
| ID | Requirement | Priority |
|---|---|---|
| CRM1 | CRM adapter interface with a mock implementation for development and tests | Must |
| CRM2 | HubSpot adapter: create/update contact, associate company, create deal/ticket where required, record product/application interest, attribution | Must (marked incomplete until tested with authorised access) |
| CRM3 | Timeouts, retries with idempotency, structured error logging without secrets or unnecessary PII | Must |
| CRM4 | Documented setup; decision on separate portal vs segmented existing portal | Must |

### 4.4 SEO, accessibility, performance, analytics, security
See `docs/seo-strategy.md`, `docs/technical-architecture.md` and `docs/launch-checklist.md`. Summary: unique titles/descriptions, canonicals, sitemap, robots, OG, breadcrumbs, structured data only where supported by visible content; WCAG 2.2 AA; Core Web Vitals targets; consent-gated GA4 with no PII; CSP and security headers; secrets only in environment variables.

## 5. Non-functional requirements

| Area | Requirement |
|---|---|
| Hosting | Static-first; server runtime only for form/API routes. Target any Node-compatible host (Vercel, Netlify, Cloudflare, or self-hosted Node). Owner to decide (F2). |
| Availability of core content when integrations fail | Public pages must render with no analytics, CRM or email configured. |
| Maintainability | Single brand/company config; product data in typed content files validated at build time; components documented. |
| Security | No secrets in client bundles or repo; `.env.example` with placeholders; dependency audit in CI. |
| Testing | Unit, component, API route, SEO metadata, accessibility (axe) and end-to-end tests with mock integrations; production build check in CI. |
| Privacy | Store minimum PII; document retention, access and deletion. |
| Browser support | Current and previous major versions of evergreen browsers; graceful degradation without JavaScript for content pages; forms require JS for progressive features but must still submit with JS disabled where feasible. |

## 6. Explicitly out of scope for initial launch (unless owner requests)

E-commerce or online pricing; customer login or distributor portal; multi-language; live chat; marketing-automation email sequences (design only, no sending); a database-backed CMS; blog/news engine (content model allows adding one later); programmatic location or keyword pages.

## 7. Constraints and operating rules carried from the brief

No invented products, specs, customers, testimonials, certifications, guarantees, capacity or history; clearly labelled placeholders; no secrets in code; no unnecessary dependencies or third-party scripts; no thin SEO pages; no launch, domain purchase, paid services, real emails or production CRM changes without explicit authorisation; passing automated audits are not proof of compliance.
