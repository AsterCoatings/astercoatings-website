# Launch Checklist

**Project:** Aster Industrial Coatings · **Status:** Template — nothing is checked yet · 2026-10-09

This checklist is the Definition of Done from Phase 17 of the brief, expanded into verifiable items. The site is **not** declared production-ready until every item in sections 1–9 is checked **and** the owner approvals in section 10 are recorded. A passing automated audit satisfies only the item that names it; manual checks are listed separately and cannot be skipped.

Legend: ☐ not started · ◐ in progress · ☑ verified (record who/when/evidence) · ✗ failed/blocked

---

## 1. Build and rendering
| | Item | Verification | Evidence |
|---|---|---|---|
| ☐ | Production build succeeds (`npm run build`) with zero warnings treated as errors in CI | CI run | link |
| ☐ | Content validation passes: no `published` product/document fails schema; no unset BLOCK-priority config field (`npm run check:content`, `npm run check:config`) | CI run | |
| ☐ | Core pages render correctly: Home, Products hub, each category, each published product, Industries, Applications, Resources, About, Quality (if present), RFQ, Technical Inquiry, Contact, Privacy, Accessibility, 404 | Playwright smoke tests + manual pass | |
| ☐ | 404 returns HTTP 404 and the custom page; unknown product/category URLs 404 (not 200) | curl + e2e | |
| ☐ | No console errors on core pages | Playwright | |
| ☐ | Staging deploy serves `X-Robots-Tag: noindex`; production does not | curl | |

## 2. Navigation and discovery
| | Item | Verification |
|---|---|---|
| ☐ | Desktop navigation: all items reachable, `aria-current` on active page, Products disclosure opens/closes with keyboard | manual + e2e |
| ☐ | Mobile navigation: menu button has accessible name, `aria-expanded`, focus trapped in open menu, Esc closes, returns focus to button; tested on ≤360 px and 768 px | manual + e2e |
| ☐ | Breadcrumbs present and correct on all pages below Home | e2e |
| ☐ | Product discovery: hub → category → product; filters work with and without JS; every published product reachable within 3 clicks from Home | e2e + orphan check |
| ☐ | Every published product linked from its category and ≥1 application or industry page (orphan report empty) | CI script |
| ☐ | All `tel:` and `mailto:` links are valid and point to approved contact details | e2e |
| ☐ | No internal broken links (crawl) | link checker in CI |

## 3. Forms and lead handling
| | Item | Verification |
|---|---|---|
| ☐ | RFQ, Technical Inquiry and Contact forms validate on client and server with identical rules | unit + API tests |
| ☐ | Failure scenarios tested: missing required fields, invalid email, oversized input, HTML/script injection, honeypot filled, too-fast submission, rate-limit exceeded, duplicate inquiryId, missing product data, missing env vars, CRM timeout/5xx/4xx, SMTP failure | automated tests |
| ☐ | Success state shown only when the lead store write succeeded; failure state shows phone/email fallback; development notice shown when integrations are mock/console | e2e |
| ☐ | Error summary receives focus; fields marked `aria-invalid`; messages actionable | manual (keyboard + screen reader) |
| ☐ | Forms submit without JavaScript | manual |
| ☐ | Lead store implementation matches the host (durable/shared store on serverless or multi-instance hosts; file store only on a single server); write verified in the production environment (test lead, then deleted) | manual, logged |
| ☐ | Configured submission destination tested end to end: a test inquiry reaches the sales mailbox and (if enabled) the CRM, with correct fields and attribution; test records then deleted | manual, logged, **owner-authorised** |
| ☐ | Customer confirmation email received, renders correctly, correct from-address, SPF/DKIM/DMARC pass | manual with mail-tester or equivalent |
| ☐ | Retry script (`leads:retry`) replays a deliberately failed lead without creating a duplicate | manual |
| ☐ | Attachments (only if enabled): type/size enforcement, private storage, signed link expiry | tests + manual |

## 4. CRM (only if `CRM_PROVIDER=hubspot`)
| | Item | Verification |
|---|---|---|
| ☐ | Portal decision (separate vs segmented) recorded; properties and pipeline created per setup guide | owner/admin sign-off |
| ☐ | Private app token with least-privilege scopes stored only in server env | review |
| ☐ | Contact create/update, company association, inquiry record, product/application properties, attribution, owner assignment verified with a test submission | manual, logged |
| ☐ | Duplicate protection verified (resubmit same inquiryId → no duplicate) | manual |
| ☐ | Error logging contains no tokens, no field values | log review |
| ☐ | **If not configured:** CRM marked "incomplete" in README and status page of this checklist; leads flow via store + email | — |

## 5. Security
| | Item | Verification |
|---|---|---|
| ☐ | No secrets in the repo history or client bundle (`grep` of `.next/static` for key patterns; secret scanner in CI) | CI + manual |
| ☐ | `.env.example` contains placeholders only; README documents every variable | review |
| ☐ | Security headers present: CSP (hash-based with `strict-dynamic`), HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors | securityheaders.com or curl |
| ☐ | CSP has no `unsafe-inline` for scripts; GA4 origins only when analytics enabled | review |
| ☐ | Same-origin enforcement on POST routes; rate limits active in production | API tests against staging |
| ☐ | `npm audit` shows no high/critical in production dependencies | CI |
| ☐ | No admin, export or debug endpoints reachable in production | route inventory review |
| ☐ | HTTPS enforced; www/apex redirect correct | curl |

## 6. SEO
| | Item | Verification |
|---|---|---|
| ☐ | Every indexable page has a unique title and meta description within length targets | metadata test + crawl |
| ☐ | Canonical URLs absolute, self-referencing, using the approved production domain (F1) | crawl |
| ☐ | Exactly one `h1` per page; heading hierarchy logical | test + crawl |
| ☐ | `sitemap.xml` lists only published, indexable pages with correct `lastmod`; `robots.txt` correct; sitemap submitted to Search Console | manual |
| ☐ | Thank-you, preview and utility pages `noindex` and absent from sitemap | crawl |
| ☐ | No placeholder, draft or "coming soon" page is indexable | crawl + content check |
| ☐ | Open Graph and Twitter tags render correctly (preview tool) | manual |
| ☐ | Structured data validates (Rich Results Test / schema validator) for Organization, BreadcrumbList, Product; no unsupported properties (no ratings/offers) | manual |
| ☐ | Redirect map in place for any changed slugs; old provisional domain (if any) redirects | curl |
| ☐ | Image alt text reviewed on all content images; decorative images `alt=""` | manual |

## 7. Accessibility (WCAG 2.2 AA target)
| | Item | Verification |
|---|---|---|
| ☐ | Automated: axe (via Playwright) reports no critical or serious issues on all page types | CI |
| ☐ | **Manual keyboard pass**: all interactive elements reachable and operable in a logical order on every page type; visible focus indicator everywhere; no keyboard traps; skip link works | manual, recorded by page |
| ☐ | **Manual screen-reader pass** (NVDA + Firefox or Chrome, VoiceOver + Safari): landmarks, headings, menu, dialog, forms with errors, status messages, tables, download links | manual, recorded |
| ☐ | Colour contrast ≥4.5:1 text, ≥3:1 UI components and focus indicators (tokens verified) | tool + manual |
| ☐ | 200% zoom and 320 px reflow without loss of content or horizontal scroll | manual |
| ☐ | `prefers-reduced-motion` respected | manual |
| ☐ | Touch targets ≥24×24 CSS px (2.5.8) with adequate spacing; menu/CTA ≥44 px | manual |
| ☐ | Focus not obscured by the sticky header or banners (2.4.11); help/contact route in a consistent place on every page (3.2.6); no redundant re-entry of information within a form session — pre-fill from referring page and keep entered values on error (3.3.7) | manual |
| ☐ | Forms: labels, required indication, error identification, `autocomplete` tokens | manual |
| ☐ | PDFs offered for download are tagged/accessible where the company controls them, or the accessibility statement notes the limitation | manual |
| ☐ | Accessibility statement published, honest about target, method and known gaps, with a contact route | review |
| ☐ | **Note recorded**: automated score is not legal compliance; manual findings and residual risks documented | review |

## 8. Performance (measured, not assumed)
| | Item | Verification |
|---|---|---|
| ☐ | Lighthouse CI budgets pass on Home, a category, a product, RFQ (mobile emulation): LCP ≤2.5 s, CLS ≤0.1, TBT proxy for INP acceptable | CI |
| ☐ | Field data plan: Search Console CWV report reviewed after 28 days | post-launch |
| ☐ | Images: responsive sizes, modern formats, explicit dimensions, lazy below the fold, hero not lazy | review |
| ☐ | Fonts: self-hosted, `font-display: swap` or `optional`, preloaded primary face, subset | review |
| ☐ | Client JS: no unnecessary libraries; bundle analysis reviewed | review |
| ☐ | Third-party scripts: only GA4 after consent | review |
| ☐ | Caching headers for static assets immutable; HTML revalidated | curl |

## 9. Privacy and analytics
| | Item | Verification |
|---|---|---|
| ☐ | No analytics script loads before consent; declining keeps it off; preference re-openable | manual + network inspection |
| ☐ | GA4 DebugView shows no PII in any event parameter after a test submission | manual |
| ☐ | Key events (conversions) configured; Search Console linked | manual |
| ☐ | Privacy policy covers data collected, purposes, sub-processors, retention, rights, contact; reviewed by legal (F10) | sign-off |
| ☐ | Retention/purge job for the lead store scheduled and tested | manual |
| ☐ | Cookie inventory documented (consent cookie, GA cookies if consented, HubSpot `hutk` if used) | review |

## 10. Owner approvals (recorded with name and date)
| | Approval | Approver | Date |
|---|---|---|---|
| ☐ | Final company name, legal entity, Sunpol relationship wording (A1, A3, A4) | | |
| ☐ | All company claims on Home, About, Quality (every sentence that asserts a fact) | | |
| ☐ | Product list, each product's descriptions and specifications (reviewer recorded per product) | | |
| ☐ | Documents approved for public download (TDS/SDS revisions) | | |
| ☐ | Branding: logo, colours, imagery rights | | |
| ☐ | Stock photography reviewed at full size: no readable brand names, logos or plates (see `image-credits.md`; re-check the backhoe loaders and the spray-can tops); captions never present stock images as Aster's own facility, staff or products | | |
| ☐ | Contact details, hours, service regions | | |
| ☐ | Response-time commitment wording (E4) | | |
| ☐ | Privacy policy, consent text, accessibility statement | | |
| ☐ | Email templates (internal and customer) | | |
| ☐ | Analytics and CRM configuration | | |
| ☐ | **Explicit authorisation to launch** (domain pointed, indexing enabled) | | |

## 11. Deployment and operations
| | Item |
|---|---|
| ☐ | Production deployment instructions documented and rehearsed on staging (`docs/deployment.md`, to be written during implementation) |
| ☐ | Environment variables set in the host; rotated from any values used in testing |
| ☐ | Uptime monitoring and error alerting configured for the API routes |
| ☐ | Backup/export of the lead store documented |
| ☐ | Dependency update process and owner named |
| ☐ | Rollback procedure documented |
| ☐ | Post-launch review scheduled at 2 and 6 weeks: CWV, Search Console coverage, inquiry volume and quality, form error rates |

## 12. Known incomplete at planning time
- CRM integration: designed, not implemented, not tested (requires E5/F4).
- Email delivery: designed, not implemented, not tested (requires F3).
- Product catalog: no verified products yet (requires C1–C8).
- Company identity, contact details, legal entity, domain: unknown (A1–A6, F1).
- Legal review of privacy/consent: not started (F10).
