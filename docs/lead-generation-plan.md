# Lead-Generation Plan

**Project:** Aster Industrial Coatings · **Status:** Plan · 2026-10-09

Covers Phases 8, 10 and 14 of the brief: conversion architecture, form design, submission handling, email and automation design, analytics and conversion measurement, and data-handling policy. Nothing here is implemented yet; the HubSpot and email integrations will remain marked **incomplete** until configured and tested with authorised access.

---

## 1. Conversion architecture

| Tier | Conversion | Page / trigger | What sales receives | Analytics event |
|---|---|---|---|---|
| **Primary** | Request a Quote | `/request-a-quote` (header button on every page; inline CTA on every product, category, industry and application page with pre-filled context) | Structured RFQ with project qualifiers | `generate_lead` (type=quote) |
| Secondary | Technical Inquiry | `/technical-inquiry` (CTA on product and application pages) | Question + product/substrate context, optional attachment | `generate_lead` (type=technical) |
| Secondary | Contact Sales | `/contact` form, `tel:` and `mailto:` links | Short message | `generate_lead` (type=contact), `phone_click`, `email_click` |
| Secondary | Technical document download | TDS/SDS download buttons on product and resource pages | (TDS: optional, non-blocking email capture; SDS: ungated by policy) | `file_download` (doc id, type — no PII) |
| Secondary | Request product information | Product page "Request information" — same form as Technical Inquiry with intent preset | Lightweight inquiry | `generate_lead` (type=info) |

Design rules: one primary CTA per viewport region; the quote button is visually distinct and present in the header on all breakpoints; secondary CTAs are text links or outline buttons. No popups, no exit-intent, no chat widget at launch.

## 2. Qualification at the point of capture

The RFQ captures what a salesperson needs to respond without a discovery call (to be confirmed with E3). Required fields are kept to the minimum that makes a lead actionable; everything else is optional or conditional.

Lead quality signals recorded (not shown to the user): business vs free-mail domain, completeness score, product/application specified, volume band, timeline band, attribution source. These feed CRM properties for routing and reporting; none affect whether a submission is accepted.

## 3. Request a Quote form specification

Rendered as three visible fieldsets on one page (progressive, no multi-page wizard, so it works without JavaScript and can be reviewed before submit). Client-side enhancement adds inline validation, conditional fields and a "What happens next" summary.

### Step 1 — Contact
| Field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Full name | text | yes | 2–100 chars | `autocomplete="name"` |
| Business email | email | yes | RFC-compliant; free-mail domains accepted but flagged | `autocomplete="email"`; explanation text "We reply to this address" |
| Company | text | yes | 2–120 chars | `autocomplete="organization"` |
| Job title / role | select + other | no | enum | Engineer, Plant/Production, Purchasing, Owner/Executive, Other |
| Phone | tel | no | loose international format | `autocomplete="tel"`; "Optional — if you prefer a call" |

### Step 2 — Project
| Field | Type | Required | Conditional | Notes |
|---|---|---|---|---|
| Product(s) of interest | multi-select from published catalog + "Not sure / need a recommendation" | yes (one of) | — | Pre-filled from referring product page |
| Application / what is being coated | select + free text | yes | — | Options from `applications.ts` |
| Substrate(s) | multi-select | no | shown always | Options from `substrates.ts` + "Other" |
| Application method | select | no | shown if product unknown or application chosen | Spray (air/airless/HVLP), dip, flow coat, brush/roll, electrostatic, other |
| Cure | select | no | shown if method chosen | Air dry, force dry, bake, unknown |
| Estimated annual volume | select bands | no | — | Bands set with B4/D7; "Not sure" option |
| Purchase timeline | select | no | — | Immediate (<1 month), 1–3 months, 3–6 months, planning/budgeting |
| Project location | country + state/province | yes (country) | state/province list shown for countries in the served regions (A7; default US only) | Drives routing (E6) and shipping relevance (A7) |
| Currently using a coating? | yes/no | no | if yes → "Current product/supplier (optional)" | Useful for switching conversations; never required |
| Additional details | textarea | no | — | 2000 chars max; placeholder suggests specs, colour, performance requirements |
| Attachments | file (multiple) | no | **feature-flagged off** until storage decided | PDF/PNG/JPG, ≤10 MB each, ≤3 files |

### Step 3 — Consent and submit
| Field | Type | Required | Notes |
|---|---|---|---|
| Privacy notice | static text + link | — | "We use these details only to respond to your inquiry. See our Privacy Policy." |
| Processing consent | checkbox | **only where legally required** (F10); otherwise implied by submission and stated in notice | Captured as `legalConsentOptions.consentToProcess` for HubSpot |
| Marketing opt-in | checkbox, unchecked | no | Separate from processing; only creates a marketing subscription; off by default |
| Honeypot | hidden | — | Must be empty |
| Submit | button | — | "Request quote"; disabled state only after first click (double-submit guard) |

Hidden/automatic: `inquiryId` (client UUID, idempotency key), `formStartedAt`, `referrerPage`, `landingPage`, `utm_*`, `gclid` if present, HubSpot `hutk` cookie if present and consented.

### Technical Inquiry form
Contact block as above (phone optional) + Product (optional) + Substrate (optional) + Question (required, 20–4000 chars) + "What have you tried / current conditions" (optional) + attachments (flagged) + consent block. Routed to `TECHNICAL_NOTIFICATION_EMAIL`. Confirmation copy must state that a technical team member will review — never that an answer has been given.

### Contact form
Name, email, company (optional), message (required), consent block. Routed to sales.

## 4. Validation, errors and accessibility
- One Zod schema per form, imported by both the client component and the API route; the server is authoritative.
- Every input has a visible `<label>`; required fields marked in the label text ("(required)") not colour alone; help text via `aria-describedby`.
- On error: focus moves to an **error summary** at the top (`role="alert"`, heading "There is a problem with your submission"), each item links to its field; fields get `aria-invalid` and inline messages that say what to do ("Enter an email address like name@company.com").
- Status announcements (`role="status"`) for submitting / success; no auto-dismissing messages.
- Works without JavaScript (standard POST → server renders the same page with errors or redirects to the thank-you page).

## 5. Submission handling (server)
Pipeline defined in `technical-architecture.md` §8.4. Key behaviours:
- **Durable before external:** the lead is persisted to the `LeadStore` before CRM or email calls, so a failed integration never loses a lead.
- **Idempotency:** `inquiryId` is unique per form session; a replayed request returns the original result (HTTP 200) and never creates a second CRM record or email.
- **Spam defences, layered:** honeypot; minimum 3 s between form render and submit; per-IP and per-email token-bucket rate limits (e.g. 5/10 min, 20/day — tunable); payload size limit; link-count heuristic in free text (flag, not block); optional Turnstile when `TURNSTILE_SECRET` is set. Flagged submissions are stored and emailed with a "possible spam" marker rather than discarded, so no legitimate lead is lost silently.
- **Truthful responses:** the user sees "Your request has been received" **only** if the lead store write succeeded. If the store and the internal email both fail, the user sees a failure state with phone/email fallback and no false confirmation. If the store succeeded but CRM/email failed, the user still sees success (the lead is safe), and an admin alert is raised.
- **Integration unavailable (development/unconfigured):** with `CRM_PROVIDER=mock` and `EMAIL_PROVIDER=console`, the UI shows a clearly labelled development notice ("Integrations are in development mode; this submission was recorded locally") — never a production-style confirmation.
- **Attachments (when enabled):** validated by extension and sniffed MIME, size-limited, renamed to `inquiryId-n.ext`, stored privately, referenced in notifications by a signed, expiring link; never embedded in emails; never executed or previewed server-side.

## 6. Email and automation design (Phase 10)

Transactional and marketing are separated: transactional messages are sent by the site's email adapter; any marketing automation would live in HubSpot with its own consent and unsubscribe handling. **No real emails are sent during development without explicit authorisation**; the `console` provider prints messages to the server log.

### A. New quote inquiry
1. Validate → persist → CRM (contact/company/deal with product and application interest, attribution) → internal notification → customer confirmation.
2. **Internal notification** (to `SALES_NOTIFICATION_EMAIL`; subject `[Quote] {Company} — {Product or "recommendation"} — {Location}`): all fields in a readable table, lead-quality flags, CRM record links if created, attribution, inquiryId, reply-to set to the prospect's address. Plain text + simple HTML.
3. **Customer confirmation** (only after successful acceptance): acknowledges receipt, repeats what they asked for, states the response commitment from `site.config` (E4) or a neutral "we will respond as soon as possible", gives the sales phone/email, links the privacy policy. No marketing content. Sent from `EMAIL_FROM` on the company domain with SPF/DKIM/DMARC configured (F3) — the setup guide covers this.

### B. Technical inquiry
Routed to `TECHNICAL_NOTIFICATION_EMAIL` (fallback to sales if unset). The customer's question and context are preserved verbatim in the notification and the CRM record. The confirmation says a technical team member will review and respond; it never includes automated technical guidance. If a product has published documents, the confirmation may link the relevant TDS/SDS as reference (clearly labelled as documents, not advice).

### C. Failed integration
- Each failure is recorded on the lead record (`crmStatus`, `emailStatus`, error codes, attempt count) without secrets or full payloads.
- An admin alert goes to `ADMIN_ALERT_EMAIL` via a different path from the failing one where possible (if SMTP itself is down, the failure is written to the store and to structured logs and surfaced by host-level alerting/uptime monitoring).
- Recovery: `npm run leads:retry` lists leads with `needs-attention` and replays CRM/email steps idempotently; `npm run leads:export --since` produces a CSV for manual entry as a last resort (operator-only, server access required — no web endpoint).

### D. Lead follow-up (optional, later)
A follow-up workflow (e.g. a check-in if no quote has been issued in N days) can be built in HubSpot using the inquiry record. Preconditions: explicit marketing consent or a documented legitimate-interest basis for B2B contacts in the relevant jurisdiction, a working unsubscribe, suppression of anyone who has replied or converted, and owner approval of every message. **Off by default; the site sends no unsolicited marketing.**

## 7. CRM behaviour summary
See `technical-architecture.md` §8 for the adapter and HubSpot mapping. From the lead-gen perspective: every inquiry becomes a contact (deduped by email), an associated company (deduped by domain, except free-mail), and an inquiry record (deal or ticket) carrying product/application interest, volume and timeline bands, location, source/landing/UTM, and the inquiryId. Sales owner assignment follows E6 (default: single owner). Duplicate protection by inquiryId on retry.

## 8. Analytics and conversion measurement (Phase 14)

### 8.1 Implementation
- GA4 via `gtag.js`, loaded **only** after consent is granted in the consent banner and only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. No Google Tag Manager at launch (fewer moving parts; CSP-friendly). Google Signals and ads personalisation off; IP anonymisation is default in GA4.
- Google Search Console verified for the production domain; linked to GA4.
- A typed `track(event, params)` helper is the only way to send events; its parameter type **excludes** names, emails, phones, free-text and file contents by construction. Parameters are limited to ids, enums and page identifiers.
- Consent banner: two equal choices (Accept / Decline), no dark patterns, preference stored in a first-party cookie/`localStorage`, re-openable from the footer. If analytics is disabled by config, no banner is shown at all.

### 8.2 Event schema
| Event | Trigger | Parameters (no PII) |
|---|---|---|
| `page_view` | route change | `page_type` (home/product/category/industry/application/resource/form/other) |
| `view_item` | product page | `item_id` (product id), `item_category` |
| `form_start` | first interaction with a form | `form_type` (quote/technical/contact/info) |
| `form_step` | fieldset completed (JS only) | `form_type`, `step` |
| `generate_lead` | server-confirmed success (fired on thank-you page) | `form_type`, `product_id?`, `volume_band?`, `timeline_band?`, `lead_quality` (high/medium/low heuristic) |
| `form_error` | validation failure | `form_type`, `error_count` |
| `file_download` | TDS/SDS/guide click | `doc_id`, `doc_type`, `product_id?` |
| `phone_click`, `email_click` | `tel:`/`mailto:` click | `location` (header/footer/contact/product) |
| `cta_click` | primary CTA | `cta_id`, `page_type` |
| `view_search_results` | (future, if site search is added) | `results_count` only — never the query if it could contain PII |

Key events (GA4's current term for conversions) marked: `generate_lead`, `file_download`, `phone_click`, `email_click`.

### 8.3 Attribution
UTM parameters, `gclid`, landing page and referrer are captured client-side on first page view into session storage and attached to the inquiry at submit time (server-side record and CRM properties). HubSpot `hutk` is passed only if present and analytics/marketing consent was given. Analytics and CRM therefore agree on source for each inquiry without any PII in analytics.

### 8.4 Funnel definitions (so reports mean the same thing to everyone)
| Stage | Definition | Where measured |
|---|---|---|
| Traffic | Sessions / users by channel | GA4 |
| Engaged visitor | Viewed ≥1 product page or downloaded a document | GA4 (`view_item`, `file_download`) |
| Inquiry | Any accepted form submission (`generate_lead`) | GA4 count; CRM record is the source of truth |
| Qualified lead | Inquiry meeting D8 criteria (default: business email + company + product/application specified; location in a served region is a proposed addition pending A7/D8), confirmed by sales in CRM (lifecycle stage = SQL or equivalent) | CRM |
| Sales opportunity | Quote issued / deal moved to a quoting stage | CRM pipeline |
| Closed sale | Deal closed-won | CRM |

Reporting joins GA4 (top of funnel) to CRM (bottom) by the inquiry record's source/landing/UTM properties — never by personal identifiers in GA4.

### 8.5 Analytics configuration guide (to be written with implementation)
Will cover: creating the GA4 property and data stream, setting the measurement ID env var, marking conversions, enabling enhanced measurement selectively (outbound clicks and file downloads off, since we send our own), retention settings (2 months event data recommended), Search Console linking, and verifying no PII appears in DebugView.

## 9. Data handling, retention and access

| Topic | Policy (draft for owner/legal review — F10) |
|---|---|
| Data collected | Only the fields in §3; attachments only if enabled. No tracking of individuals in analytics. |
| Storage locations | LeadStore (server), CRM (HubSpot), email mailboxes of recipients, host logs (structured, minimal). |
| Retention | LeadStore: 90 days after successful CRM sync, then purged by scheduled script; leads that never synced are kept until manually resolved. CRM: per company policy (recommend reviewing inactive contacts after 24–36 months). Attachments: 90 days, then deleted. Logs: 30 days. |
| Access controls | LeadStore and logs accessible only to server operators; CRM access by role; notification mailboxes limited to named recipients (E1/E2). No web-accessible admin or export endpoint. |
| Deletion requests | Documented procedure: locate by email across LeadStore, CRM and mailboxes; delete within the statutory window; log the action without retaining the data. |
| Legal basis / consent | Processing to respond to a B2B inquiry; marketing only with opt-in. Consent text and whether the checkbox is required depend on F10. |
| Sub-processors | Host, email provider, HubSpot, Google (analytics, if consented). Listed in the privacy policy. |
| Security | TLS everywhere; secrets in env; least-privilege API scopes; see `technical-architecture.md` §9. |

## 10. Open items affecting this plan
E1–E7 (recipients, response commitment, CRM portal, routing), B4/D7 (volume bands), D8 (qualification criteria), F3 (email provider and sending domain), F5 (GA4/Search Console), F10 (consent requirements), C7 (documents available for download).
