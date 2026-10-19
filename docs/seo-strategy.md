# SEO Strategy

**Project:** Aster Industrial Coatings · **Status:** Plan · 2026-10-09

No rankings or traffic are promised. This plan builds search visibility into the architecture and content model so that, once verified product and application content exists, the site can compete for buyer-intent queries that the two reference competitors do not currently have pages targeting (neither has product pages or structured data, and TRINKOTE has no meta descriptions — see `competitive-research.md`). Whether Vantrex ranks for them depends on content quality, authority and competition beyond these two sites.

**Keyword volume caveat.** No keyword-volume tool was available in this planning session, and search volumes have not been fabricated. The intents below are derived from how industrial coatings buyers describe needs (substrate + function + chemistry + compliance + industry) and from the competitors' own taxonomy. Volumes and difficulty must be validated with Google Search Console (after launch) and a keyword tool before content investment is prioritised (open question F5).

---

## 1. Principles
1. One page per intent; one intent per page. No near-duplicate category/industry pages.
2. Pages exist only when there is unique, accurate, owner-approved content (operating rule 13).
3. Product-level content is the primary long-tail asset; industry and application pages are the mid-funnel asset; the homepage and About carry brand queries.
4. Technical accuracy over keyword density: TDS-grade terms (volume solids, DFT, VOC, cure schedule) are the vocabulary engineers search with.
5. Structured data only where visible content supports every property.
6. Nothing confidential in public markup, sitemaps or schema.

## 2. Keyword / intent map

Columns: target search intent → proposed page → primary topic → supporting topics → existing content → technical review required → conversion goal. "Existing content" is **none** everywhere today; the column records what will satisfy it.

### 2.1 Brand and navigational
| Intent | Page | Primary topic | Supporting | Content needed | Review | Conversion |
|---|---|---|---|---|---|---|
| "[final brand] coatings", "[brand] TDS", "[brand] SDS" | `/`, `/resources` | Brand | Products, contact | A1, A8 | Owner | RFQ / doc download |
| "[brand] + product name" | product pages | Product | Spec, docs | C1–C7 | Technical | RFQ |

### 2.2 Commercial — supplier intent (mid/bottom funnel)
| Intent (examples) | Page | Primary topic | Supporting | Content needed | Review | Conversion |
|---|---|---|---|---|---|---|
| industrial coatings supplier / manufacturer [region] | `/` and `/about` | What is supplied, to whom, where | Capabilities, regions, response commitment | B1, A7, E4 | Owner | RFQ |
| industrial paint for metal fabrication | `/products` | Metal-fabrication coatings range | Primers, topcoats, system types | C1, C2 | Technical | RFQ |
| OEM coatings supplier / paint line supplier | `/industries` | OEM finishing | Line types (spray, dip, bake), industries | D1, D2 | Owner + technical | RFQ |
| custom colour match industrial paint | `/applications/colour-matching` (only if B3 true) | Colour matching service | Standards, turnaround | B3, B7 | Owner | Technical inquiry |
| request a quote industrial coatings | `/request-a-quote` | RFQ | — | E3 | Owner | RFQ |

### 2.3 Product-category intent
| Intent (examples) | Page | Primary topic | Supporting | Content needed | Review | Conversion |
|---|---|---|---|---|---|---|
| water-based industrial primer / waterborne metal primer | `/products/water-based-primers` (name per C2) | Water-based primers | Substrates, VOC, cure | C1–C4 | Technical | RFQ |
| solvent-based alkyd enamel industrial / fast dry alkyd topcoat | `/products/alkyd-enamels` | Alkyd topcoats | Gloss, dry time, applications | C1–C4 | Technical | RFQ |
| 2K urethane topcoat industrial / polyurethane topcoat for equipment | `/products/urethane-topcoats` | 2K urethanes | Chemical/UV resistance, DFT | C1–C4 | Technical | RFQ |
| epoxy primer for steel / zinc-rich epoxy primer | `/products/epoxy-primers` | Epoxy primers | Corrosion data, substrates | C1–C4 | Technical | RFQ |
| direct-to-metal (DTM) coating | `/products/dtm-coatings` | DTM | Surface prep, substrates | C1–C4 | Technical | RFQ |
| low VOC industrial coatings / compliant coatings | `/products` filter or `/applications/low-voc-compliance` | VOC compliance | Per-product VOC values, regional rules | C4, C8 | Technical + compliance | RFQ |
| (powder coatings — only if offered) | `/products/powder-coatings` | Powder | — | C1 | Technical | RFQ |

Categories are created only from products the owner actually supplies. The names above are placeholders for the taxonomy in C2.

### 2.4 Product-level intent (long tail)
| Intent pattern | Page | Primary topic | Supporting | Content needed | Review | Conversion |
|---|---|---|---|---|---|---|
| "[product name]", "[product code]" | product detail | The product | Spec table, substrates, applications, TDS/SDS | C1–C7 | Technical | RFQ / download |
| "[product name] TDS" / "SDS" / "data sheet" | `/resources/[doc]` | The document | Revision, product link | C7 | Technical | Download → RFQ |
| "[chemistry] primer for [substrate]" e.g. epoxy primer for galvanized steel | product or application page | Substrate–product fit | Surface prep, limitations | C3 | Technical | RFQ |
| "[spec] coating" e.g. high solids low VOC alkyd | product detail (spec-rich) | Spec values | — | C4 | Technical | RFQ |

### 2.5 Application and substrate intent
| Intent (examples) | Page | Primary topic | Supporting | Content needed | Review | Conversion |
|---|---|---|---|---|---|---|
| coating for galvanized steel / paint for galvanneal | `/applications/galvanized-steel` | Substrate guidance | Prep, adhesion, recommended products | C3 | Technical | RFQ |
| coating for cold rolled steel / hot rolled steel scale | `/applications/steel-fabrication` | Steel substrates | Prep, primers | C3 | Technical | RFQ |
| coating for aluminium / cast iron / castings | `/applications/[substrate]` | Substrate | — | C3 | Technical | RFQ |
| dip coating paint / flow coat / spray applied industrial enamel | `/applications/[method]` | Application method | Viscosity, thinning, line setup | C3, C4 | Technical | Technical inquiry |
| bake enamel / force dry coatings | `/applications/bake-and-force-dry` | Cure method | Schedules | C4 | Technical | RFQ |
| corrosion resistant coating for equipment / salt spray hours | application or product | Corrosion performance | **Only published test data** | C4 with evidence | Technical | RFQ |

### 2.6 Industry intent
| Intent (examples) | Page | Primary topic | Supporting | Content needed | Review | Conversion |
|---|---|---|---|---|---|---|
| agricultural equipment paint / ag implement coatings | `/industries/agricultural-equipment` | Ag OEM | Chemistries, products, colours | D1, D4 | Owner + technical | RFQ |
| trailer paint manufacturer / truck body coatings | `/industries/trailers-and-truck-bodies` | Transportation | — | D1 | Owner + technical | RFQ |
| structural steel shop primer / steel fabricator coatings | `/industries/structural-steel` | Fabrication | — | D1 | Owner + technical | RFQ |
| material handling / racking / shelving coatings | `/industries/material-handling` | Storage equipment | — | D1 | Owner + technical | RFQ |
| oilfield equipment coatings | `/industries/oil-and-gas-equipment` | Oilfield | — | D1 | Owner + technical | RFQ |
| railcar coatings (approvals) | `/industries/rail` | Rail | **Only if approvals exist** | D1, C8 | Owner + technical | RFQ |

Industry pages are built only for the top industries in D1, only when each has ≥300 words of unique approved content and ≥2 linked products. Until then, industries appear as sections on `/industries` with a single canonical URL.

### 2.7 Informational (later-phase content)
Guides such as surface preparation for [substrate], choosing between water-based and solvent-based systems for an OEM line, reading a TDS, VOC compliance basics. Published under `/resources/guides/[slug]` with `Article` schema and a named, qualified author. Deferred until the core site is approved; each guide must be technically reviewed. These are the only place "blog-like" content lives; no news engine at launch.

### 2.8 Cannibalisation controls
One canonical URL per product (even when in multiple categories). Category pages target category intent; product pages target product intent; application pages target substrate/method intent; industry pages target "coatings for [industry]". A page is not created if its intent is already served (e.g. no separate "metal primer" page if `/products/primers` covers it). Keyword map is kept in `docs/seo-strategy.md` and checked before any new page is added.

## 3. On-page implementation

| Element | Implementation |
|---|---|
| Titles | `buildMetadata()` per page: product `"{Product} — {Function} | {Brand}"`; category `"{Category} Industrial Coatings | {Brand}"`; home `"{Brand} — Industrial Coatings for [what is supplied]"`. ≤60 characters target; unique by test. |
| Meta descriptions | Required field in content model; 120–155 chars; unique by test; no claims outside approved copy. |
| Canonical | Absolute, from `NEXT_PUBLIC_SITE_URL`; self-referencing; lowercase, no trailing slash; filter query strings canonicalise to the base page. |
| Headings | Exactly one `h1`; logical hierarchy enforced by component API (`SectionHeading level`). Tested. |
| Rendering | Static HTML for all content; no client-only content for indexable text. |
| URLs | See IA. Stable product ids mean slugs can change with 301s if names change. |
| Sitemap | `app/sitemap.ts` from published entities only; `lastModified` from content `updatedAt`; excludes `noindex` pages. |
| robots.txt | `app/robots.ts`: allow all; disallow `/api/`; sitemap reference. Staging deploys send `X-Robots-Tag: noindex` globally. |
| Open Graph / Twitter | Per page; default OG image generated from brand tokens (no imagery implying facilities). |
| Breadcrumbs | Visible + BreadcrumbList JSON-LD on all pages below Home. |
| Internal links | Rules in `technical-architecture.md` §4.2; a test asserts every published product is linked from its category and ≥1 application/industry page; orphan check in CI. |
| Images | `next/image` with width/height (no CLS), descriptive `alt` from content, descriptive filenames (illustrative pattern: `{product-slug}-{function}-{pack}.webp`), decorative images `alt=""`. |
| Redirects | `next.config` redirects map for any slug changes; www → apex (or reverse) and http → https at host level. |
| Indexing directives | `noindex` on thank-you, preview and utility pages; drafts never built. |
| 404 | Custom page with navigation, search-free product links; returns real 404 status. |
| Pagination/filters | Category filters are client-enhanced over a complete server-rendered list; filter states are not indexable URLs. |

## 4. Structured data

| Type | Where | Properties (only those visible on page) | Not used |
|---|---|---|---|
| `Organization` | every page (site-wide graph) | `name`, `legalName` (A3), `url`, `logo`, `contactPoint` (A6), `address` (A5), `areaServed` (A7), `sameAs` | No `aggregateRating`, no `foundingDate` unless verified |
| `BreadcrumbList` | all pages below home | positions, names, URLs | — |
| `Product` | product detail | `name`, `description`, `sku`/`productID` (code), `brand`, `category`, `image` (if approved), `additionalProperty` for published specs (name/value/unitText), `url` | **No** `offers`, `review`, `aggregateRating`; no unpublished spec values |
| `WebSite` | home | `name`, `url` | No `potentialAction` SearchAction unless a site search exists |
| `Article` | future guides | `headline`, `author`, `datePublished`, `dateModified` | — |
| `LocalBusiness` | contact (optional) | Only if A5/A9 are published | — |

Validation: Rich Results Test and schema.org validator before launch; a unit test snapshot of JSON-LD per page type ensures properties track visible content.

## 5. Measurement (ties to analytics plan)
- Google Search Console verified at launch (DNS or HTML tag), sitemap submitted.
- Monthly review: impressions/clicks by page type (product, category, application, industry), queries without matching pages → candidates for the keyword map, pages with impressions but no clicks → title/description work.
- Core Web Vitals report in Search Console cross-checked with Lighthouse CI budgets.
- No ranking promises; targets are expressed as "indexed pages with impressions" and "inquiries attributed to organic".

## 6. Risks
- Launching with an empty or tiny catalog removes the main organic asset; a "catalog coming soon" page should not be indexed.
- Provisional brand name: if the domain changes after indexing, 301 redirects from the old domain must be kept for at least a year.
- Over-building industry pages before content exists would reproduce SPC's thin-template problem.
