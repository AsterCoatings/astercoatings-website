# Implementation Plan

**Project:** Aster Industrial Coatings · **Status:** Approved; Increments 1–4 delivered 2026-10-16 (see `progress/`) · 2026-10-09

Work is sequenced so that a polished, functional core exists before optional complexity, and so that nothing waits on owner answers that are not strictly required. Each increment ends with: what changed, files touched, tests run, failures, outstanding decisions, external configuration still required.

Estimates are in working sessions of focused implementation, not calendar time, and assume the stack in `technical-architecture.md` §5 is approved.

---

## Increment 0 — Approval gate (now)
- Owner reviews `technical-architecture.md` (stack, IA, content model) and this plan.
- Owner provides GitHub repository URL (F9).
- Owner starts on the BLOCK-priority questions in `open-questions.md` (A1, A3–A6, B1, E1–E2, F1, F3, F9, F10; plus C1 for the product section and E5 for live CRM). None are needed to begin Increment 1.

## Increment 1 — Foundation (1 session)
**Goal:** a building, testing, linting repository with the brand configuration and design tokens in place; no pages beyond a placeholder home.
- Initialise Next.js 16 + TypeScript strict + Tailwind v4; ESLint (next, typescript-eslint, jsx-a11y), Prettier; Vitest + Testing Library; Playwright + axe; GitHub Actions CI (typecheck, lint, unit, build, e2e, audit, secret scan).
- `content/site.config.ts` with typed schema and the dev-only placeholder renderer; `scripts/check-config.ts` that lists unset fields and fails production builds on unset BLOCK fields.
- `app/styles/tokens.css` design tokens (colour, type scale, spacing, radius, shadow, states, motion); contrast-checked.
- `.env.example`, README skeleton, CONTRIBUTING, security headers (hash-based CSP with `strict-dynamic`, keeping static pages static), `robots.ts` with staging noindex.
- Tests: config schema; placeholder rendering in dev vs prod; headers present.
**Exit:** CI green on an empty-but-real site.

## Increment 2 — Layout, navigation, core static pages (1–2 sessions)
- `SiteHeader`, `PrimaryNav`, `ProductsDisclosure`, `MobileMenuDialog`, `SiteFooter`, `SkipLink`, `Breadcrumbs` (+ BreadcrumbList JSON-LD), `Dialog`, `CtaBand`.
- Pages: Home (claim-free structure from `messaging.ts`), About (flagged copy), Contact (config-driven), Privacy (draft, `[LEGAL REVIEW REQUIRED]`), Accessibility Statement, custom 404, thank-you shells (`noindex`).
- `buildMetadata()`, Organization + WebSite JSON-LD, `sitemap.ts`.
- Tests: navigation keyboard behaviour (e2e), mobile menu focus trap, one-`h1` rule, metadata uniqueness, axe on each page, 404 status.
**Exit:** the shell is navigable, accessible and deployable to a staging URL with noindex.

## Increment 3 — Content model and product catalog (2 sessions)
- Zod schemas and content files: categories, applications, substrates, industries, products, documents, certifications registry; `scripts/check-content.ts` with publish gates (reviewer recorded, approved docs only, referenced ids exist).
- Pages: Products hub, category, product detail (`SpecTable` with spec `state` handling, `DocumentList`, `RelatedProducts`, pre-filled quote CTA), Resources hub and document pages, Industries and Applications hubs (sections only; individual pages gated by content thresholds).
- Product JSON-LD limited to visible properties.
- Seed data: **two or three clearly fictional sample products marked `status: 'draft'`** used only for tests and local preview; never built in production. (Real products enter when C1–C8 arrive.)
- Tests: schema validation (publish gates), rendering with missing optional fields, unknown product URL → 404, orphan-link check, Product JSON-LD snapshot, axe on product and category pages.
**Exit:** catalog pipeline proven end to end with draft data; publishing a real product is a content-file change plus review.

## Increment 4 — Lead-generation system (2 sessions)
- Shared Zod schemas for RFQ, Technical Inquiry, Contact; form components (`Field`, `ErrorSummary`, `StatusRegion`, conditional fields, honeypot, double-submit guard); no-JS submission path.
- API routes with the pipeline in `technical-architecture.md` §8.4: validation → anti-abuse → `LeadStore` (JSONL implementation) → `CrmAdapter` (mock) → `EmailAdapter` (console) → truthful response states.
- Attribution capture (UTM/landing/referrer/`hutk` behind consent).
- `scripts/leads-retry.ts`, `scripts/leads-export.ts` (operator CLI only).
- Tests: every failure scenario in the launch checklist §3; idempotent replay; rate limit; mock CRM timeout/5xx/4xx; SMTP failure; e2e submission with mock integrations; axe on forms with errors displayed.
**Exit:** leads are captured durably and visibly in development; integrations clearly marked as mock.

## Increment 5 — Integrations (1–2 sessions; needs owner inputs)
- `HubSpotCrmAdapter` (Forms submission + CRM objects as decided in F4), setup guide (`docs/hubspot-setup.md`: portal decision, properties, pipeline, private app scopes, test procedure).
- `SmtpEmailAdapter` (Nodemailer) + templates (internal notification, customer confirmation, admin alert) + `docs/email-setup.md` (SPF/DKIM/DMARC).
- Optional Turnstile; optional attachments with private storage (only if F2/F6 decide storage).
- Tests: adapter contract tests against recorded fixtures; **live tests only with authorised credentials, against a test portal/mailbox, and recorded in the checklist.** Until then, status = incomplete.

## Increment 6 — Analytics and consent (0.5 session)
- `ConsentBanner`, `AnalyticsLoader` (GA4 after consent only), typed `track()` with PII-excluding parameter types, event wiring per `lead-generation-plan.md` §8.2, `docs/analytics-setup.md`.
- Tests: no analytics request before consent (network assertion in Playwright); event parameter type test.

## Increment 7 — Visual polish and content pass (1–2 sessions)
- Design review on mobile/tablet/laptop/desktop; typography and spacing refinement; OG image generation; imagery slots with approved assets or neutral technical graphics.
- Copy pass applying tone rules; every factual sentence traced to a verified source or flagged.
- Lighthouse CI budgets; font loading; image pipeline.

## Increment 8 — Hardening and launch readiness (1 session + owner time)
- Manual keyboard and screen-reader passes recorded; contrast audit; 200 % zoom and 320 px reflow.
- Security review against `technical-architecture.md` §9; bundle secret scan; headers verification on staging.
- `docs/deployment.md` with rehearsed staging deploy and rollback; monitoring.
- Work through `launch-checklist.md`; collect owner approvals (section 10). **No launch without the explicit authorisation line signed.**

## Dependencies on owner answers (what blocks what)
| Increment | Can start with no answers? | Needs before completion |
|---|---|---|
| 1–2 | Yes | — (A1–A6 drop into config whenever available) |
| 3 | Yes (draft seed data) | C1–C8 for any real product; D1 for industry pages |
| 4 | Yes (mock integrations) | E1–E2 to set recipients; E3 to finalise fields; F10 for consent checkbox behaviour |
| 5 | Adapter code yes; live tests no | E5, F3, F4, authorisation to test |
| 6 | Yes | F5 for the measurement ID |
| 7 | Mostly | A8, A10, approved imagery, B1 for positioning copy |
| 8 | Partly | Everything in checklist §10; F1 domain; F2 hosting |

## Reporting after each increment
Each increment closes with a short report in `docs/progress/` (date, scope, files, test results with counts and failures, decisions needed, external configuration outstanding) and a matching note in the Claude project so the next session can pick up without re-reading the code.

## What will not be done without explicit instruction
Deploy to production, point a domain, create or pay for any service, send a real email, create/modify records in a production CRM, publish any product or claim not reviewed by the owner.
