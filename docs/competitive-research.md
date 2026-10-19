# Competitive Research: Reference Websites

**Project:** Aster Industrial Coatings website
**Date of audit:** 2026-10-09
**Method:** Public pages fetched and read directly (homepage, navigation targets, product/industry pages, contact and form pages, robots.txt, sitemaps). Each finding lists the URL where it was observed. Items that could not be verified from public pages are marked *not observed*. Nothing here relies on private analytics, rankings, conversion rates or lead quality, which are unknowable from the outside.

**Scope note on the research tool.** Pages were fetched as rendered text, so attribute-level details (ARIA attributes, skip links, focus styles, `srcset`, `lang`) could not be confirmed either way. Where this matters the finding is marked *not observed via tool*. A `site:` search for each domain returned no on-domain results through the search tool used; this is a tool limitation and is not evidence of non-indexing.

**Copyright note.** Only short phrases are quoted as evidence. No source code, imagery, layouts or copy from either site is to be reused in the Aster build.

---

## 1. Summary of findings

| Dimension | TRINKOTE (trinkote.com) | Sheboygan Paint Company (shebpaint.com) |
|---|---|---|
| Presented as | Liquid industrial coatings manufacturer and toll manufacturer, Cresson TX, "since 1964"; part of Star Step Performance Coatings Group | Industrial paint and coatings manufacturer, Sheboygan WI and Cedartown GA, founded 1921, family-owned |
| Site size | 6 URLs in sitemap | ~33 pages + 12 industry pages + posts |
| Platform | WordPress + Divi theme (inferred), Site Kit, WPForms (inferred) | WordPress + Divi, Yoast SEO, WP Rocket, GTM, LiveChat |
| Product organisation | By chemistry; 8 chemistries, one paragraph each, single page | By industry first; chemistry families listed in a shared modal; no catalog |
| Individual product pages | None | None (industry pages act as product pages) |
| Industry pages | None (10 industries listed as text) | 10 industry pages under `/industry/` |
| TDS / SDS | None on site | Gated behind an email request form, 3-working-day turnaround |
| Quote request | None; 3-field contact form only | None; general contact form with ~15 fields, no qualifiers |
| Primary CTA | "Call us today" / "Email Us" | "Chat with us!" / "Get in touch" / phone |
| Structured data | None observed | None observed |
| Meta descriptions | None | Present (Yoast) |
| Breadcrumbs | None | Present on inner pages |
| Spec tables | None | Rendered as images (not indexable, not accessible) |
| Zoom | Disabled via viewport (`user-scalable=0`) | Enabled |

Both competitors leave the same gap open: **neither offers product-level pages, self-service technical documentation, or a structured quote path.** These are the three things an industrial buyer most needs from a supplier website, and they are the core of the Vantrex differentiation plan (section 5).

---

## 2. TRINKOTE (https://trinkote.com)

### 2.1 Company identity as presented
- Name "TRINKOTE"; title tag "TRINKOTE | INDUSTRIAL FINISHES" (https://trinkote.com/). The News page refers to "Trinkote Industrial Coatings" and names the parent as "Star Step Performance Coatings Group (Star Step PCG)" (https://trinkote.com/news/).
- Positioned as a manufacturer: "your producer of quality general industrial coatings for all types of fabricated metal surfaces" (https://trinkote.com/company/), and a toll manufacturer: H2 "Toll Manufacturing Specialty Products", "'customer owned' formulas" (https://trinkote.com/coating-services/).
- Address 800 Hughie Long Rd., Cresson, TX 76035, only on the contact page (https://trinkote.com/contact/).
- "Providing Expert & Reliable Service Since 1964" (https://trinkote.com/company/).
- News article dated July 31, 2026 announces the group's acquisition of Royal Powder Corporation, adding powder coatings (https://trinkote.com/news/).

### 2.2 Homepage structure (https://trinkote.com/)
1. Header: logo, six-item nav.
2. Hero: H1 "TRINKOTE", tagline "PROTECTING YOUR BUSINESS IS OUR BUSINESS.", button "Learn more about our Company".
3. H2 "Protecting Your Business is Our Business." with three H4 pillars: Quality, Experience, Innovation. Stray "N" and ":" characters render where icon-font glyphs should appear.
4. H2 "Your Coating Partner" → "Learn more about our services".
5. H2 "Products" with two H3 cards, "Water-base Coatings Technology" and "Solvent-borne Coating Technology"; both "Learn More" buttons go to the same `/coating-products/` page.
6. H2 "Industrial Services" / H3 "Satisfaction Guaranteed" (the H3 block appears twice).
7. Contact block: H4 "Call us today", "817-396-4747" (the href is an empty `callto:` link), "Email Us" → `/contact/`.
8. Footer: not observed (no copyright, address or link block rendered).

### 2.3 Primary navigation
Single-level menu, identical on every page, no dropdowns: Home, Company (`/company/`), Services (`/coating-services/`), Products (`/coating-products/`), News (`/news/`), Contact (`/contact/`). The text "Select Page" appears after the nav, which is the Divi theme's default mobile menu label (inference).

### 2.4 Product categories and organisation (https://trinkote.com/coating-products/)
Organised by chemistry into two families on one page:
- **Water-based Coatings Technology:** Water Reducible Alkyd; Acrylic Emulsion; 2-Component Water-Reducible Epoxy Primers and Topcoats; Polyester High Solids Water-borne.
- **Solvent-borne Coating Technology:** Alkyd; Polyester High Solids; Single Component Epoxy-Esters; 2-Component Urethane Topcoats & Epoxy Primers.

No product names, SKUs, filters or secondary organisation by application or industry. Industries appear as a text list under H2 "Industries and Appplications" (typo on page).

### 2.5 Product page structure
No individual product pages exist. `/products/`, `/industries/` and `/request-a-quote/` return errors. Each chemistry is an H3 plus one paragraph covering application method (spray/dip/flow/roll), cure (air dry, force dry, bake) and generic end uses. *Not observed:* spec tables, VOC, gloss, colours, substrates, dry times, packaging, TDS/SDS links, related products, per-product CTA.

### 2.6 Industries / applications
Listed on the Products page only, none with its own page: Material Handling Equipment; Engineered Steel Building Manufacturing; Structural Steel Fabrication; Agricultural Equipment; Prepainted Slitted Hot Rolled Steel Coil; Construction Equipment; Oilfield Related Equipment; Furniture, Shelving and Components; Railcar and Transportation; Specialty Industries. Image alt text references "BNSF approved exterior paint" (their claim, buried in alt text).

### 2.7 Calls to action
- Every page: "Call us today" + phone, "Email Us" → `/contact/`.
- Home: "Learn more about our Company", "Learn more about our services", "Learn More" ×2.
- Services: "Contact Us Today". Contact: "Call Now" (proper `tel:` link), form "Submit".
- *Not observed:* "Request a Quote", "Download TDS", "Find a Rep", sticky CTA, chat.
- Defect: the phone link on four of six pages is an empty `callto:` href with no number, so it cannot dial as written (not click-tested).

### 2.8 Quote request / inquiry process
No quote form. The only form (https://trinkote.com/contact/) has Name (First/Last, required), Email (required), Comment or Message (required). No company, phone, industry, product, volume or substrate fields; no file upload; no CAPTCHA observed; no privacy text; post-submit behaviour not observed.

### 2.9 Contact options (https://trinkote.com/contact/)
Address; Office phone 817-396-4747; hours Mon–Fri 8am–4:30pm, Sat/Sun closed; 3-field form. *Not observed:* email address, fax, map, social links, chat, rep locator.

### 2.10 Technical documentation
None observed: no TDS, SDS, colour charts, guides, brochures or PDFs on any page.

### 2.11 Trust indicators (their claims)
"Since 1964"; "Satisfaction Guaranteed" (every page); "state-of-the-art facility", "seasoned staff" (company page); "Each batch is checked" (services); BNSF approval in an image alt. *Not observed:* certifications, Made-in-USA statement, customer logos, testimonials, case studies, team bios, memberships.

### 2.12 Mobile navigation
Viewport meta `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0` — pinch zoom is disabled by the viewport declaration, which conflicts with WCAG 1.4.4 Resize Text. Collapsed menu implied by Divi "Select Page" label. Hamburger markup and breakpoints not observed via tool.

### 2.13 Visible accessibility features
Alt text is present and descriptive on content images (e.g. "A lab technician is checking paint viscosity using a Zahn cup"); image `title` attributes are raw filenames ("IMG_1388 (3)"). Heading structure is inconsistent: News page has two H1s; H3s carry marketing taglines rather than structure; duplicated H3 on home. Zoom disabled. Icon glyphs render as literal characters. Skip link, ARIA, focus styles, `lang`: not observed via tool.

### 2.14 Content architecture and URLs
Flat depth-1 slugs. No `/products/{category}/{product}` hierarchy, no industry URLs, no breadcrumbs, no search, no footer links. "News" is a static page containing one inline article; no post permalinks, author, categories or pagination. Sitemap lastmod: five of six pages 2024-10-01, news 2026-08-03.

### 2.15 Publicly observable metadata
- Title pattern `{Page} | TRINKOTE`.
- Meta descriptions: none on any page. OG/Twitter tags: none. JSON-LD: none observed.
- Canonical: self-referencing, non-www, all pages. Robots meta `max-image-preview:large`.
- CMS: WordPress (`wp-content`, `wp-sitemap.xml`, `generator: Site Kit by Google 1.189.0`). No SEO-plugin signatures observed.
- robots.txt: `Disallow: /wp-admin/`, `Allow: /wp-admin/admin-ajax.php`, `Sitemap: https://trinkote.com/wp-sitemap.xml`.
- Sitemap: one child (`wp-sitemap-posts-page-1.xml`) with six URLs.

### 2.16 Internal linking
Every page links only to the six nav items plus `/contact/`. Both homepage product cards point to the same page. No product→industry, industry→product, product→document or services→products links. One external link (royalpowder.com).

### 2.17 URLs fetched
https://trinkote.com/ · /coating-products/ · /company/ · /coating-services/ · /contact/ · /news/ · /robots.txt · /wp-sitemap.xml · /wp-sitemap-posts-page-1.xml · /products/ (error) · /industries/ (error) · /wp-sitemap-posts-post-1.xml (error) · /request-a-quote/ (error) · https://www.trinkote.com/ (serves homepage, canonical to non-www).

---

## 3. Sheboygan Paint Company (https://shebpaint.com)

### 3.1 Company identity as presented
- "Sheboygan Paint Company" (og:site_name; footer "© 2026 Sheboygan Paint Company"); "SPC" in nav. Tagline "The Resource for Paint Line Solutions." (https://shebpaint.com/).
- Title tag "Industrial Paint & Coating Manufacturer | Sheboygan Paint Company". About page: "independent industrial coatings company", "family-owned", "privately held", founded 1921 (https://shebpaint.com/about-us/).
- Two locations in the footer of every page: 1439 North 25th Street, Sheboygan, WI 53081 and 608 Canal Street, Cedartown, GA 30125.
- Target market: OEM finishing lines ("paint line") in heavy metal fabrication.

### 3.2 Homepage structure (https://shebpaint.com/)
1. Header: logo; utility links "News & Articles", "Contact", "Solutions Finder"; phone 800-773-7801; "Chat with us!" (LiveChat).
2. Hero: background video; tagline; H1 "Industrial Paint and Coatings"; H2 "Turn to Sheboygan Paint Company for all your paint line needs."; link "Solutions Finder".
3. Intro paragraph, team photo, embedded Vimeo video.
4. "How we are different": three points ("Customerized℠ attention", "Innovative problem solving", "Delivering as promised"); block repeats lower on the page.
5. "Custom solutions": in-house chemists; list of ten industries.
6. "Capabilities to serve your overall paint line success": six linked services.
7. "Join our team" → "Careers Opportunities".
8. "Recent Updates": eight dated news items (2025–2026); "View All News".
9. "Get in touch": Contact link + "Chat with us!".
10. Footer: two addresses, phones/faxes, info@shebpaint.com, four social links, nav columns.
- Hidden modal markup on every page: an "Attributes" panel (12 items, e.g. "Pb & Cr Free", "APEO & NPEO Free") and a "Coating Systems" panel (water-based vs solvent-based). A 2022 Associate Chemist job posting is embedded in every page's markup (appears to be a template artefact).

### 3.3 Primary navigation
Drill-down menu with image thumbnails and "Go Back" controls (Divi), functioning as a mega-menu:
- **Industries** (10): Agricultural & Construction Equipment, Heavy-duty Trailers, Railcars, Truck Bodies, Light- & Medium-duty Trailers, Drums and Cylinders, Racking, Steel Doors, Waste Containers, General Metal & Nonmetal Products.
- **Services** (anchors on `/services/`): Technical Development, Precision Color Matching, Product Quality Testing, Quality Policy, Responsive Technical Support, Expedited Shipping.
- **Resources:** News & Articles, Data Sheet Request, Color Library (parent link is `#`).
- **About Us:** Company, Leadership, Community, Wellness. **Careers.**
- Utility: "Solutions Finder" has no destination URL on any page fetched; `/help/` is an internal IT support portal.
- **There is no "Products" item.**

### 3.4 Product categories and organisation
Organised by industry first, then by chemistry family. No catalog, SKU pages or product search (https://shebpaint.com/industries/). Chemistry taxonomy from the shared modal: water-based (7 families, e.g. water-reducible alkyds, acrylic emulsions, water-reducible urethanes, epoxy esters, alkyd melamine bakes) and solvent-based (8 families, e.g. alkyds & urethanes, low-VOC polyester bakes, epoxy primers, zinc-rich epoxy primers, nitrocellulose lacquers). Named lines observed: "Uraguard" 2K urethane topcoat; "Low VOC Water-based Primer". The Color Library (~77 listings, 71 unique part numbers such as "43-81975 VIPER RED FD URAGUARD PART A") is the closest thing to a product list.

### 3.5 Product page structure (industry pages act as product pages)
Common template: breadcrumb Home > [Industry]; H1; anonymous testimonial blockquote (job title only); value-prop H2; water-based / solvent-based system lists; "Most Popular … Coatings" **comparison table rendered as an image**; "Attributes" H4 grid; "Benefits"; "Popular Colors" → Color Library; "Download More Information" with two PDFs (company brochure + one industry sheet); services strip; "Get in touch"; closing section. No TDS/SDS links, packaging, pricing, related-product modules or forms.
- https://shebpaint.com/industry/steel-doors/ — "Low VOC Water-based Primer" claimed to meet "ANSI/SDI A250.10-2011"; substrates galvannealed and cold-rolled steel; two spec tables as images.
- https://shebpaint.com/industry/truck-bodies/ — Uraguard + solvent epoxy primer, claimed ">5,000 hours" corrosion resistance; 13 attributes; table image `truck_bodies_table.jpg`.
- https://shebpaint.com/industry/agriculture-and-construction/ — claim of "as much as 30% or more" fewer field claims vs competitor paints; substrates not stated.

### 3.6 Industries / applications
Each has a page under `/industry/{slug}/` (12 URLs in `industries-sitemap.xml`, including `/industry/rail2/` and `/industry/rail2-confirm/`, the latter an indexed form thank-you page). The hub `/industries/` list has duplicate and mislinked entries (Rail three times, "Heavy-Duty Trailers" twice).

### 3.7 Calls to action
- Primary on every page: "Chat with us!" (LiveChat), "Get in touch" → `/contact/`, phone 800-773-7801.
- Secondary: "Solutions Finder" (no URL), "Color Library", "Data Sheet Request", "Learn About Services", "Full Brochure", industry PDFs, "View All News", "Let's talk".
- *Not observed:* "Request a Quote", "Request a Sample", "Find a Rep".

### 3.8 Quote request / inquiry process
No dedicated quote form. General contact form (https://shebpaint.com/contact/, H1 "Let's talk. But you first."): Name (First/Last), an unlabeled "Untitled" field, "Bradley Coatings Group Customer", Title, full Address block, Phone, Email, Subject, Message, CAPTCHA, button "Send Message". No visible required markers, no upload, no project/volume/substrate qualifiers.
Data Sheet Request (https://shebpaint.com/safety-data-sheet-sds-request-form/): Name (Required), "Untitled" (Required), City/State/ZIP/Country, Email (Required), Product Codes; documents emailed as PDFs "within the next three working days".

### 3.9 Contact options
Toll-free 800-773-7801; WI and GA phones and faxes; info@shebpaint.com; two addresses; LiveChat on every page; Facebook, X, LinkedIn, YouTube. *Not observed:* hours, map, rep/distributor locator.

### 3.10 Technical documentation and downloads
TDS/SDS gated behind the request form. Custom post types `data-sheet` and `technical-guide` exist in sitemaps with a single empty placeholder each (last modified 2022) — functionality that appears unused. Ungated PDFs: company brochure, one information sheet per industry (`/wp-content/uploads/2024/05/`), a railroad brochure; three such PDFs appeared in a domain-restricted web search during the audit. Color Library (https://shebpaint.com/color-library/): ~77 listings filterable by industry and colour family; name, part number, type, swatch image; no hex/RGB, no downloadable chart, no sample request, no links from swatches. Blog (https://shebpaint.com/blog/, H1 "News & Articles"): JS-loaded list with Blog / News Articles / Press Release filters.

### 3.11 Trust indicators (their claims)
"Top 25 North American Coatings Manufacturer" by PCI Magazine, #21 in 2026 (https://shebpaint.com/2026/07/30/…); founded 1921, "over a hundred years"; family-owned, privately held; ANSI/SDI A250.10-2011 product claim; ISO 3664 light booths (equipment, not company certification; https://shebpaint.com/services/); a "Quality Policy" page but **no ISO 9001 or other company certification named** (https://shebpaint.com/services/); ">5,000 hours" and "30% or more" performance claims; anonymous testimonials; a "Bradley Coatings Group Customer" field on the contact form suggests an acquired or affiliated brand (https://shebpaint.com/contact/). *Not observed:* customer logos, named testimonials, case studies, Made-in-USA badge, association memberships.

### 3.12 Mobile navigation
Viewport meta present. Drill-down menu with "Go Back" controls implies a slide-in mobile menu. Spec tables are images and will not reflow. Background hero video. WP Rocket caching present. Actual responsive rendering not verified.

### 3.13 Visible accessibility features
Skip link and ARIA attributes: not observed. Alt text mixed: some descriptive, many empty, some images rely on `title`. Spec tables as images with no text alternative. Heading structure poor: H2s as card labels, H4–H6 used decoratively, "Main Navigation" exposed as an H2, no H1 on two pages. Form fields with "Untitled" labels. Focus styles: not observed via tool.

### 3.14 Content architecture and URLs
`/industry/{slug}/` (singular) with hub `/industries/`; `/color-library/{industry-slug}/`; services as anchors on one page; news on WordPress date permalinks `/YYYY/MM/DD/{slug}/`. Cruft indexed in the page sitemap: `/pci/`, `/help/` (internal IT portal with TeamViewer/OpenVPN downloads), `/page-builder/`, `/1821-2/`, `/thank-you/`, `/wellness2/` (duplicate). Max depth two levels.

### 3.15 Publicly observable metadata
- Title pattern `{Topic} | Sheboygan Paint Company` (Yoast); posts use ` - ` separator (inconsistent).
- Meta descriptions page-specific; one stale (2026 post describing a 2023 case study).
- Canonical self-referencing; robots `index, follow, max-image-preview:large` everywhere including thank-you pages.
- OG title/description/type/url/locale/site_name; Twitter `summary_large_image`. **JSON-LD not observed** on home, industry pages or posts.
- Platform: WordPress + Divi, Yoast, WP Rocket, Cool Timeline, Google Tag Manager, LiveChat, Vimeo/YouTube.
- robots.txt: `User-agent: *`, empty Disallow, `Sitemap: https://shebpaint.com/sitemap_index.xml`.
- Sitemap index with 12 children (post, page [33], divi_overlay, cool_timeline, industries [12], data-sheets [1], technical-guides [1], category, post_tag, ctl-stories, data-sheet-types, author).

### 3.16 Internal linking
Breadcrumbs on inner pages (Color Library sub-pages show the raw slug, e.g. "Color Library – truck-bodies"). Full industries/services/resources link set in mega-menu and footer on every page, so link equity is flat. Industry pages cross-link to all other industries, `/services/` and `/color-library/` but not to specific colour sub-pages, data sheets or related news. Colour listings link to nothing. "Resources" parent links to `#`. Steel Doors footer links to a non-canonical slug (`steel-doors-2`).

### 3.17 URLs fetched
https://shebpaint.com/ · /robots.txt · /sitemap.xml · /page-sitemap.xml · /data-sheets-sitemap.xml · /industries-sitemap.xml · /technical-guides-sitemap.xml · /industries/ · /industry/steel-doors/ · /industry/truck-bodies/ · /industry/agriculture-and-construction/ · /industry/rail2-confirm/ · /contact/ · /safety-data-sheet-sds-request-form/ · /data-sheet/data-sheet-1/ · /color-library/ · /color-library/truck-bodies/ · /services/ · /about-us/ · /help/ · /blog/ · /2026/07/30/sheboygan-paint-company-named-a-top-25-north-american-coatings-manufacturer-by-paint-coatings-industry-magazine/

---

## 4. Patterns worth adopting (in our own form, not copied)

| Pattern | Seen at | Why it is worth adopting |
|---|---|---|
| Industry-first entry points alongside chemistry | shebpaint.com nav | Buyers often search by what they make, not by resin chemistry. Aster should offer both paths. |
| Water-based vs solvent-based as a top-level product split | both sites | Matches how applicators and EHS staff think about compliance and line setup. |
| Attribute badges (e.g. heavy-metal-free, low VOC) | shebpaint.com modal | Fast scanning for compliance requirements, **provided each attribute is verified per product**. |
| Named substrates on industry pages | shebpaint.com steel doors | Substrate is a first-order qualifier for an industrial buyer. |
| Phone prominent in header | both | Many industrial buyers still call; keep a working `tel:` link. |
| Breadcrumbs | shebpaint.com | Orientation and BreadcrumbList schema. |
| Posted business hours | trinkote.com contact | Simple, useful; neither site shows a response-time commitment. |

## 5. Differentiation opportunities for Aster

Each item below is grounded in the evidence above. None of them requires Aster to make claims it cannot support; they are structural and service-level advantages.

1. **Real product pages.** Neither competitor has a single product page. A catalog with stable URLs, an HTML specification table, suitable substrates, intended applications, packaging and downloadable approved TDS/SDS would be unique among the two reference sites and is the natural way to compete for long-tail, product-level search queries. *Depends on: verified product data (open question C).*
2. **Self-service technical documents.** SPC gates documents behind a form with a three-working-day wait; TRINKOTE has none. Instant, ungated TDS/SDS downloads (with at most an optional, non-blocking email capture on TDS; SDS kept ungated as a matter of policy, since customers and distributors need them readily) would be a direct service advantage. *Depends on: documents approved for public distribution.*
3. **A structured Request a Quote path.** Both competitors route all inquiries through a generic contact form with no project qualifiers. A progressive RFQ (product, application, substrate, volume, timeline, location, optional spec upload) qualifies leads at the point of capture and gives sales what they need to respond quickly.
4. **A stated response-time commitment.** Neither site commits to a response time. If the owner can commit to, say, one business day for quote acknowledgement, publishing that is a credible, non-exaggerated trust signal. *Depends on: open question E.*
5. **Machine-readable specifications.** SPC's comparison tables are JPEGs. HTML tables are indexable, accessible, and can later power filtering and comparison.
6. **A guided product selector that actually works.** SPC advertises "Solutions Finder" in its header, but no destination URL was found on any page fetched. A simple substrate → application → environment → recommended products flow (built only once the catalog is verified) would fill a visible gap.
7. **Technical SEO hygiene from day one.** Neither site has JSON-LD; TRINKOTE has no meta descriptions or OG tags; SPC indexes thank-you pages, an internal IT portal and 2022 placeholders. Correct metadata, Organization/BreadcrumbList/Product schema (only where visible content supports it), clean sitemaps and `noindex` on utility pages are low-cost wins.
8. **Accessibility as a procurement differentiator.** TRINKOTE disables zoom; SPC has image-only tables, unlabeled form fields and decorative heading levels. A WCAG 2.2 AA-targeted site with a published accessibility statement can satisfy procurement checklists neither competitor meets.
9. **Transparent lead times and lab capabilities.** SPC's services page lists tests but no turnaround commitments; TRINKOTE's is prose only. Publishing concrete, owner-approved lead times for stock product, custom colour match and samples would be persuasive without exaggeration. *Depends on: open question B.*
10. **Honest, specific trust layer.** Both competitors rely on heritage claims and anonymous testimonials. As a new entrant, Aster should not compete on heritage claims; its trust layer must come from verifiable specifics: certifications actually held, named compliance standards each product meets, team credentials, facility details, and (with permission) named customers. Until those exist, the site should present capability and process rather than fabricate social proof.
11. **Working basics.** Functional `tel:` links on every page, a footer with address and email, a visible privacy policy, enabled zoom. Trivial, but both competitors fail at least one.

## 6. Risks and cautions from this research

- **Do not over-build the catalog before the data exists.** The product-page advantage only materialises with verified products, specs and approved documents. Placeholder product pages must be unpublished (`noindex`, excluded from sitemap, or not built) until approved.
- **Avoid mimicking competitors' claims.** Phrases like "Satisfaction Guaranteed", "Customerized", "Top 25" and performance figures are their claims; Aster must not echo comparable claims without evidence.
- **Industry-page sprawl.** SPC's industry pages share a template and thin content; building ten industry pages for Aster with no unique content would repeat that weakness and risk thin-content SEO issues. Build industry pages only where there is approved, specific content (operating rule 13).
- **Live chat.** SPC's LiveChat is a visible CTA but a third-party script with privacy and performance cost. Not recommended for launch; revisit once there is staff to answer it.
