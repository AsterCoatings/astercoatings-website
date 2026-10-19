# Open Questions and Decision Register

**Project:** Aster Industrial Coatings website · **Updated:** 2026-10-16

This is the single list of things the owner must decide or supply. Each item carries a priority:

- **BLOCK** — Blocking launch. The site cannot go live without this.
- **PUB** — Important before content publication. Development can proceed with placeholders; the affected pages stay unpublished (`noindex`, excluded from sitemap, or not built) until answered.
- **LATER** — Can be resolved after initial development.

Development is **not** blocked by any of these. Every page and component is being built so that the answer drops into one place (the brand configuration file or a content file) without re-editing pages.

How to answer: reply inline, or fill the table in section H. Where a question asks for documents, attach them or share a folder.

---

## A. Company identity

| ID | Question | Why it matters | Priority | Default until answered |
|---|---|---|---|---|
| A1 | Final company name. | Everything. | **DECIDED** | **Aster Industrial Coatings** (owner, 2026-10-12). Knockout screen in `naming-research.md` §5: no live US paint/coatings mark; one live ASTER in Class 2 for toner cartridges and a Japanese "Aster Power Coating" seismic product to flag to counsel. Attorney clearance still recommended before filing. |
| A2 | Approved tagline (if any)? | Hero and metadata. | PUB | None shown; hero uses a descriptive statement of what is supplied |
| A3 | Legal entity name, type and state of formation? | Footer, privacy policy, terms, Organization schema `legalName`. | **BLOCK** | `[LEGAL ENTITY TBD]` |
| A4 | Relationship to Sunpol: owner confirmed 2026-10-16 that **Sunpol Resins (sunpol.com, Fairfield CA, alkyd resin manufacturer) is "our other company"** and that Aster will sell Sunpol's water-reducible and short oil (chain-stopped) alkyds under the Aster brand. Still open: the exact legal relationship (same entity / sister company / licence), and whether the site may say the resins are made by Sunpol. | Determines the About-page statement (`site.relationships.sunpol`), whether "manufacturer" may be claimed (B1), and the responsible party on Aster SDS. | **BLOCK** | No reference to Sunpol on public pages; copy says "supplies" |
| A5 | Public business address. Owner (2026-10-19, later): **no street address on the site** — the Sunpol address was published briefly and then removed. Footer shows "Fairfield, California" only. Manufacturing: four plants (Hayward CA, Louisville KY, Detroit MI, Dallas TX) — cities never published, states only. Decide before launch whether a postal address is needed for the privacy page / Organization schema. | Footer, Contact, About, schema. | PUB | Hidden |
| A6 | Sales phone **888-655-6557** and sales email **sales@astercoatings.net** (owner, 2026-10-19; email given as "Sales@astercoaings.net", spelling corrected to the registered domain — owner to confirm the mailbox exists and receives mail before launch). Optional technical email not set. | Footer, contact, forms, closing bands, mobile menu, Organization schema, confirmation emails. | DECIDED | Both live |
| A7 | Target service regions (US only? Canada? Mexico? specific states)? Shipping restrictions? | Copy, structured data `areaServed`, RFQ "project location" field options, hreflang (none expected). | PUB | United States |
| A8 | **About page copy.** Rewritten 2026-10-19 to be specific (own resin, two alkyd families, four-step way of working, six industries, Fairfield CA) and approved on the basis of owner-confirmed facts. One paragraph still open: how Aster came about and the Sunpol relationship (ties to A4). | About page, meta descriptions, Organization schema. | PUB | Flagged in development; neutral fallbacks in production |
| A9 | Business hours and time zone? | Contact page, schema `openingHours`. | LATER | Omitted |
| A10 | Logo and brand colours. | Header, favicon, OG image, design tokens. | **DECIDED** | Owner-approved logo adopted 2026-10-16, traced to SVG, in the header/footer/favicon (`design-notes.md` §4). Colours: ink #14181F, accent #C84A18. |
| A11 | Purchase the Mirano webfont licence (MyFonts, Unio Creative Solutions; single-domain webfont EULA) in the company's name and place the woff2 files in `site/app/fonts/`. | Headings and wordmark switch from the Michroma stand-in to the chosen face. | PUB | Michroma (free, same lineage) with a hairline stroke |

## B. Business model

| ID | Question | Why it matters | Priority | Default |
|---|---|---|---|---|
| B1 | Is Aster the manufacturer (same legal entity as Sunpol), a sister company, or a reseller of Sunpol product? | The single most important positioning fact. "Manufacturer" cannot be claimed if products are sourced from a separate entity. | **BLOCK** | Copy says "supplies" and avoids "manufactures" |
| B2 | Which products are made in-house vs sourced? Who makes the sourced ones (and may they be named)? | Product-page wording, Quality page, "made in USA" statements. | PUB | No origin statements |
| B3 | Custom formulation / colour-matching capability? Turnaround? | A key differentiator if true; must not be implied otherwise. | PUB | Not mentioned |
| B4 | Minimum order quantities (by product or general)? | RFQ volume field thresholds; FAQ. | LATER | Not published; RFQ captures estimated volume |
| B5 | Packaging formats offered (e.g. 1 gal, 5 gal pail, 55 gal drum, totes)? | Product content model `packaging` field. | PUB | Field omitted on product pages when empty |
| B6 | Production/supply capacity statements that can be made publicly? | Trust layer; avoid overclaiming. | LATER | None |
| B7 | Standard lead times for stock, custom colour, samples? | Published commitments are persuasive; must be achievable. | PUB | Not published |
| B8 | Shipping regions and carriers; hazmat shipping constraints? | Copy, RFQ location options. | LATER | Not published |
| B9 | Sales process: direct sales, reps, distributors? Any need for a "find a rep" feature or distributor portal? | IA and possible future features. | PUB | Direct inquiry only |
| B10 | Do you want to publish prices? (Recommendation: no.) | Scope. | LATER | No pricing |

## C. Products

| ID | Question | Why it matters | Priority | Default |
|---|---|---|---|---|
| C1 | Official product names and codes for the four launch coatings (water-reducible alkyd primer and topcoat; short oil alkyd primer and topcoat). | Product pages exist as drafts under placeholder names; nothing publishes until named and specified. | **BLOCK** (for the Products section only — the site launches on Services) | Four placeholder-named drafts |
| C2 | Product categories you want buyers to see (e.g. primers, topcoats, DTM, water-based, solvent-based, specialty)? | Navigation and URL structure. | PUB | Two-axis taxonomy: chemistry/system type × function (primer/topcoat/etc.) |
| C3 | For each product: intended uses, suitable substrates, limitations. | Core product content; also powers the selector. | PUB | Fields show "Not specified" rather than invented values |
| C4 | Available technical specifications per product (solids by volume, VOC, recommended DFT, dry/cure times, gloss, application methods, thinning, coverage, shelf life, etc.). Which may be published? | Spec tables; structured data `additionalProperty`. | PUB | Table omitted when empty |
| C5 | Where do spec values come from (TDS) and who signs off on their accuracy? | Liability; review workflow. | PUB | Each product has a `reviewedBy`/`reviewedAt` field required before `status: published` |
| C6 | Packaging and availability per product. | Product page. | LATER | Omitted |
| C7 | **TDS and SDS for each of the four coatings**, with the responsible party's name, address and phone in SDS Section 1 (OSHA HCS 2012). Until a TDS exists, every specification renders as "Not specified" (draft only). Versioning/revision dates? | Technical Resources section; a primary differentiator. Recommendation: keep SDS ungated (customers and distributors need ready access; hazard-communication rules require supplying SDS downstream, and ungated web access is the simplest way to meet that expectation). | PUB | No documents listed |
| C8 | Certifications or compliance statements per product (e.g. VOC category compliance, heavy-metal-free, specific standards met) **with supporting evidence**. | Attribute badges and Quality page. Unsupported badges are a liability. | PUB | No badges |
| C9 | Product imagery (packaging shots, lab photos) with usage rights. | Product cards/pages, OG images. | PUB | Licensed stock photography (`image-credits.md`), captioned by subject only |
| C11 | **Competitor cross-references** (Polynt Duramac, Alquimex, OPC Polychem, Allnex Setyrene, Macopol) are recorded only in `site/content/resins/` (not rendered) and a unit test keeps those names and customer names out of product copy. Decide, with counsel if needed, whether any comparison may ever appear publicly. | Comparative claims need substantiation; naming competitor marks is a legal decision. | PUB | Internal only |
| C12 | **Services page: APPROVED by the owner 2026-10-19** (flags cleared; confirm-notes removed). Aster offers the same services as the Sheboygan reference: technical development, precision colour matching (with product quality testing and a quality policy), responsive technical support, expedited shipping, toll manufacturing. The page mirrors the reference section for section with **original wording** (their copy is their copyright and carries their facts). Flagged for confirmation: response commitment, lab location and turnaround, instruments and colour standards, the QC test list, any quality-management certification, on-site support coverage, shipping regions/carriers/commitment, toll minimum batch and confidentiality terms. | The Services page is the launch offer; every sentence is a claim. | **PUB** | All six sections live in development with flags |
| C10 | Colour offering: stock colours, custom match, colour standards (RAL, Federal Standard, custom)? | Possible colour section; RFQ field. | LATER | Not shown |

## D. Target customers

| ID | Question | Why it matters | Priority | Default |
|---|---|---|---|---|
| D1 | Priority industries (rank top 3–6). Starting set on the site: agriculture & construction equipment, trailers & truck bodies, metal fabrication, racking & storage, steel doors & frames, tanks & containers. | Industry pages, homepage tiles, keyword map. | PUB | Six industries listed; no industry pages published |
| D2 | Ideal customer profile (company size, type, line setup: spray, dip, bake?). | Copy tone and RFQ fields. | PUB | — |
| D3 | Typical buyers and decision-makers (engineer, plant manager, purchasing, owner)? | Messaging, form field choices. | LATER | Mixed audience |
| D4 | Common customer problems you solve. | Application and homepage copy; FAQ. | PUB | — |
| D5 | Common objections (price, switching cost, approvals, lead time)? | FAQ and sales-enablement content. | LATER | — |
| D6 | Geographic priorities within the service region. | Local SEO decisions. | LATER | None |
| D7 | Typical order sizes (optional). | RFQ volume options; lead scoring. | LATER | Generic ranges |
| D8 | Lead qualification criteria (what makes a lead worth a salesperson's time?). | RFQ required fields; CRM lead scoring; analytics definitions. | PUB | Business email + company + product/application interest |

## E. Commercial process

| ID | Question | Why it matters | Priority | Default |
|---|---|---|---|---|
| E1 | Who receives new quote inquiries (names/emails)? Backup? | Internal notification routing. | **BLOCK** | `SALES_NOTIFICATION_EMAIL` env var, unset |
| E2 | Who answers technical inquiries? | Routing of the technical form. | **BLOCK** | `TECHNICAL_NOTIFICATION_EMAIL` env var, unset |
| E3 | Who prepares quotes, and what information do they need to quote without a follow-up call? | Determines RFQ fields. | PUB | Fields in `docs/lead-generation-plan.md` §3 |
| E4 | Expected response time you are willing to publish. | Trust signal; sets customer expectation in confirmation email. | PUB | "We will respond as soon as possible" (no commitment) |
| E5 | CRM platform decision: HubSpot? Separate portal or segmented existing portal? Who administers it? | Integration design and credentials. | PUB (BLOCK for CRM integration specifically) | Mock adapter; leads stored durably + emailed |
| E6 | Sales territories or routing rules (by region, industry, product)? | CRM owner assignment. | LATER | Single owner |
| E7 | Lead qualification process after capture (who calls, when, SLA)? | Analytics definitions of "qualified lead" and "opportunity". | LATER | Documented defaults in `docs/lead-generation-plan.md` |

## F. Technology

| ID | Question | Why it matters | Priority | Default |
|---|---|---|---|---|
| F1 | Domain. | Canonical URL, email sending domain, redirects. | **DECIDED** | Owner (2026-10-19): **astercoatings.net** is the main domain; **asterpaint.net** redirects to it. Both at GoDaddy. Set in `site.config.ts` (`urls.canonicalHost`, `urls.redirectHosts`) and enforced by host redirects in `next.config.ts`; also to be set at the host when the domains are attached. |
| F2 | Hosting preference (Vercel, Netlify, Cloudflare, AWS, existing provider)? Any IT policy constraints? | Deployment process, edge/runtime choices, cost. | PUB | Vercel-compatible build; also documented for Node self-host |
| F3 | Email sending: existing transactional provider (e.g. SES, Postmark, SendGrid, Microsoft 365 SMTP)? Which domain sends? | Confirmation and notification emails; SPF/DKIM/DMARC. | **BLOCK** | Email adapter with console/mock transport |
| F4 | HubSpot: portal ID, private-app access, which pipeline/objects to use (Deals vs Tickets vs custom "Inquiry" object)? | Live CRM integration. | PUB | Mock adapter |
| F5 | Analytics: GA4 acceptable? Existing Google account/property? Search Console access? Consent-management preferences? | Measurement; consent banner behaviour. | PUB | GA4 code path present but disabled until `NEXT_PUBLIC_GA_MEASUREMENT_ID` set; consent required before load |
| F6 | Budget for paid services (hosting, email, forms storage, CAPTCHA, uptime monitoring)? | Service selection. | PUB | Free tiers / none |
| F7 | Content management: will non-developers need to edit products/pages? If yes, how often? | Whether to add a Git-based CMS layer now or later. | LATER | Typed content files in repo; CMS evaluated post-launch |
| F8 | Who maintains the site after launch (internal, agency, this engagement)? | Documentation depth, CI setup, dependency update policy. | LATER | Full README + runbooks |
| F9 | GitHub repository URL (owner creates an empty repo). | Code delivery. | **BLOCK for code delivery** | Code held in workspace until provided |
| F10 | Privacy/legal: who reviews the privacy policy and consent language? Any regulated-state obligations (e.g. California) or Canadian/EU visitors expected? | Legal pages and consent gating. | **BLOCK** | Draft policy flagged `[LEGAL REVIEW REQUIRED]` |

## G. Items already decided

| Date | Decision | By |
|---|---|---|
| 2026-10-09 | This session delivers discovery and planning only; code begins after architecture approval. | Owner |
| 2026-10-09 | Code will be delivered to a GitHub repository (URL pending). | Owner |
| 2026-10-09 | Provisional brand "Vantrex Coatings" used in development with configuration-level replaceability. | Brief |
| 2026-10-09 | Name knockout screen completed; "Vantrex" flagged as unlikely to clear; shortlist produced (`docs/naming-research.md`). | Research |
| 2026-10-16 | **Visual direction:** confident-but-restrained motion system added; imagery to be generated from `image-shot-list.md` (owner) with real photography later. Image slots fill automatically from `site/public/images/`. | Owner / Build |
| 2026-10-16 | **Logo adopted** (owner-generated artwork, vectorised); header, footer and favicon updated. | Owner |
| 2026-10-16 | **Typography: Eurostile direction.** Mirano (commercial, Unio Creative Solutions) for headings once licensed; Michroma stands in; Barlow for text. Inter retired. See `design-notes.md`. | Owner |
| 2026-10-16 | Architecture and stack approved; code lives in the connected folder (`site/`) until a GitHub repo exists; shebpaint.com and trinkote.com used as references for look and feel, structure, feature set and tone (`design-notes.md`); products built as DRAFT placeholders. Increments 1–4 delivered (`progress/2026-10-16-increments-1-4.md`). | Owner / Build |
| 2026-10-19 | Services page **approved**; three promises removed at the owner's request. Industries page approved; per-industry product lists removed (products return when published). About page rebuilt in the reference structure; copy awaiting owner. Resources and Applications pages retired (redirects kept). Phone 541-891-1819 published; Sunpol address published as a temporary stand-in. | Owner / Build |
| 2026-10-19 | **Sales email: sales@astercoatings.net** published (footer, Contact, Accessibility, Privacy, schema). The two contact-detail launch blockers are now closed; remaining blockers: legal entity name (A3) and the form delivery route (where submissions are sent — F3). | Owner / Build |
| 2026-10-19 | **Aster phone number: 888-655-6557** (toll-free) published everywhere the phone appears. Still no street address on the site; "Fairfield, California" line removed from the footer as well, so Fairfield now appears only in the About "Where we are" sentence. | Owner / Build |
| 2026-10-19 | **Address and phone removed from the site** at the owner's request: no street address anywhere (footer says "Fairfield, California"), no phone until the dedicated Aster number exists. Contact page says to use the form; Accessibility page points to the contact form. No placeholders shown. | Owner / Build |
| 2026-10-19 | **Manufacturing footprint corrected.** Aster coatings are not made in one Fairfield plant; they are manufactured at four plants — Hayward CA, Louisville KY, Detroit MI, Dallas TX (internal; cities never published). Site copy now says "manufactured in California, Kentucky, Michigan and Texas", stays neutral on who owns the plants (owner's choice), keeps "our own resin / our own lab", and drops "one plant", "under one roof", "made in-house" and "makes what it sells" (now "formulates what it sells"). Fairfield remains the business address. A dedicated Aster phone number is under consideration (virtual number; see A6). | Owner / Build |
| 2026-10-19 | **Domain decided: astercoatings.net**, with asterpaint.net (and both www. forms) permanently redirecting to it, path intact. No company email exists yet; sales email (A6) remains the launch blocker — recommendation: a mailbox on astercoatings.net (GoDaddy's Microsoft 365 or Google Workspace) rather than a personal address. | Owner / Build |
| 2026-10-19 | **Hero is a looping video clip** (Pexels 7493835, cottonbro studio: spray gun in a white paint shop; 12 s, muted, 1.1 MB) with its own first frame as the poster; the previous hero photo is retired. Plays only without a reduced-motion preference. Home hero and "How we work" copy rewritten to be specific (job description → sample batch on the customer's line → one plant); step numerals removed on Home and About; hover/press/focus states sharpened site-wide (orange edges on tiles and rows, chip tint, underline links, button press). Owner declined the hero capabilities strip, About section fixes and page-header changes for now. | Owner / Build |
| 2026-10-19 | **Calls to action go to Contact** while no products are published: every "Get in touch"/closing band and the home hero show a single **Contact us** button (`/contact`). "Request a quote" / "Request a sample" buttons remain only on the unlisted product pages (`CtaBand actions="quote-sample"`) and in the footer; the forms themselves stay live. Mobile menu still carries quote + call buttons (owner to confirm). Header phone and quote button removed; Contact page "Quotes" block removed; About history placeholder and address removed; email placeholders hidden until the sales email exists. | Owner / Build |
| 2026-10-19 | **Services page mirrors shebpaint.com/services section for section** (owner: "we have the same services"), with original copy; verbatim copying declined on copyright and factual grounds. | Owner / Build |
| 2026-10-16 (later) | **Correction — Aster sells finished coatings, not resins.** The owner clarified after reviewing trinkote.com/products: Aster's launch range is a water-reducible alkyd **primer and topcoat** (mainly for steel) and a short oil alkyd **primer and topcoat**, formulated on the Sunpol resins. Site returned to the coatings model (industries, substrates, application methods, gallons); products presented Trinkote-style as two chemistry families. **Then: Services leads.** Until formulated products exist, the Products page is unlisted (noindex, out of navigation; drafts visible in development) and a Sheboygan-style **Services** page carries the offer: custom formulation / technical development, precision colour matching, toll manufacturing (owner-confirmed 2026-10-16). Quality testing, technical support and shipping sections are drafted but switched off until confirmed. Resin data retained in `site/content/resins/` (not rendered). | Owner / Build |
| 2026-10-16 | *(superseded the same day)* Business pivot: Aster sells alkyd resins to coatings formulators — Sunpol Resins' water-reducible (4033B, 4033C) and chain-stopped/short oil alkyds (4084, 4085HS, 4422N, 4423, 4405) rebranded as Aster, plus six development grades (short oil CS, long oil, medium oil, water-reducible, vinyl toluene, acrylic-modified) positioned to offset grades target customers buy today. Site re-aimed: resin spec tables, categories by resin type, Industries → Markets, substrates → oil types, quote asks packaging/annual volume, new sample-request form; competitor cross-references internal only. All products remain drafts pending Aster TDS/SDS and code confirmation. | Owner / Build |
| 2026-10-16 | **Imagery: real stock photography** (Pexels) replaces generated images after two rejected rounds; hero gets a slow continuous drift. | Owner |
| 2026-10-12 | **Company name: Aster Industrial Coatings.** Domains held: asterpaint.net, astercoatings.net. All docs updated from the Vantrex placeholder. Attorney clearance still to be obtained. | Owner |

## H. Quick answer sheet

Copy, fill and return. Leave blank anything unknown.

```
A1 Final name / cleared?        : Aster Industrial Coatings / attorney clearance pending
A3 Legal entity                 :
A4 Relationship to Sunpol       :
A5 Public address               : 2475 Crocker Cir, Fairfield, CA 94533
A6 Phone / sales email / tech email : 541-891-1819 / ______ / ______
A7 Service regions              :
B1 Manufacturer / formulator / distributor :
B3 Custom formulation?          :
B5 Packaging formats            :
B7 Lead times (stock / custom / sample) :
C1 Names/codes for the four coatings :
C12 Services wording confirmed (turnaround, instruments, batch size) :
C7 TDS/SDS approved (attach)    :
C8 Certifications (attach evidence) :
D1 Top industries               :
D8 Lead qualification criteria  :
E1 Quote inquiry recipient(s)   :
E2 Technical inquiry recipient(s) :
E4 Response-time commitment     :
E5 HubSpot portal: separate / segmented / other :
F1 Domain                       : astercoatings.net (canonical?) + asterpaint.net
F2 Hosting                      :
F3 Email provider & sending domain :
F5 GA4 ok? Search Console owner :
F9 GitHub repo URL              :
F10 Legal reviewer              :
```
