# Design Notes — visual direction

**Project:** Aster Industrial Coatings · **Date:** 2026-10-16 · **Status:** Working reference for the build; owner asked that shebpaint.com and trinkote.com be used as references for look and feel, page structure, feature set and tone.

Nothing from either site is copied: no code, imagery, copy or layout files. These notes record what was observed and what Aster takes from it in its own form.

## 1. What was observed (2026-10-16 screenshots)

### Sheboygan Paint Company (shebpaint.com)
- **Header:** solid black bar, white wordmark left, search and hamburger right; no visible text nav on desktop at 800 px.
- **Hero:** full-bleed photograph of a paint line (parts on hangers in a booth), light overlay, two-line headline — a plain sentence above, then a large italic bold headline ("Industrial Paint and Coatings").
- **Palette:** black, white, a warm orange accent (buttons, section band "How we are different", arrow icons), a teal halftone-dot decorative motif at section corners, warm light-grey surfaces.
- **Type:** geometric sans (Avant Garde-like), heavy italic for display headings; generous size.
- **Sections:** intro paragraph beside a circular video thumbnail; orange full-width band with cards; "Custom solutions" two-column text; a 3×N grid of industry links with an underline rule and an orange circular arrow on each; footer with contact and social.
- **Feel:** confident, mid-century industrial, warm. Imagery does the work.

### Trinkote (trinkote.com)
- **Header:** white bar, red wordmark with "Industrial Finishes" subline, hamburger right.
- **Hero:** full-bleed close-up photograph of yellow paint being poured, thin white text centred (low contrast), outlined button.
- **Palette:** white, near-black text, red accent (logo, icon badges), pale blue-grey tints; a lot of white space.
- **Type:** neutral sans (Arial/Helvetica-like), large bold headings in sentence case, generous line height.
- **Sections:** large product photograph (paint cans) edge-to-edge; "Protecting Your Business is Our Business." heading; three value rows (Quality, Experience, Innovation) each with a round icon badge; contact block.
- **Feel:** clean, quiet, trade-supplier; photography of product rather than process.

## 2. What Aster takes from them

| Element | From the references | Aster's version |
|---|---|---|
| Hero | Full-bleed photography with a plain sentence and a strong headline (SPC); product close-up (Trinkote) | Full-bleed photo slot (approved imagery only; neutral technical graphic until then), a one-line descriptor and a bold headline. No italics (reads dated); headline weight carries it. |
| Palette | Black/orange/white (SPC); white/red (Trinkote) | Near-black blue-grey (`#14181F`) for header/footer/text; **a single warm accent** — a deep safety-orange (`#C84A18`) — for primary actions and rules, chosen because both references use a warm accent; white text on it measures 4.7:1 (the first candidate, `#D9541E`, measured 4.0:1 under axe and was rejected); cool light-grey surfaces (`#F3F4F6`) and one pale steel-blue tint (`#E6ECF2`) for alternating bands. |
| Type | Geometric sans (SPC), neutral sans (Trinkote) | **Eurostile direction, chosen by the owner 2026-10-16.** Display face for the wordmark and headings: **Mirano** (Unio Creative Solutions, Eurostile-derived, commercial — to be licensed for the site's domain); until it is purchased, **Michroma** (OFL) stands in with a hairline text-stroke at large sizes to compensate for its single light weight. Text face for paragraphs, tables, navigation and controls: **Barlow** 400–700 (OFL). Both self-hosted. Display type is kept to headings and the wordmark because squared extended faces tire the eye in running text. Heading sizes were reduced about 20 % from the Inter scale because the display face is wide. |
| Industry grid | Underlined link rows with arrow icons (SPC) | Industry and category cards as link rows with a bottom rule and an arrow glyph, three columns on desktop, one on mobile. |
| Value rows | Icon badge + heading + one line (Trinkote) | "Why Aster" rows with a simple line icon, heading and one evidence-based sentence; no claims that are not in the verified-facts table. |
| Phone and contact prominence | Phone in header (SPC), posted hours (Trinkote) | Phone and "Request a Quote" button in the header; hours and address in the footer, rendered only when set in config. |
| Decorative motif | Halftone dots (SPC) | A restrained diagonal "hatch" or dot pattern at low opacity in section corners, generated in CSS — a nod to the genre, not a copy of the dot graphic. |
| Features | Colour library, data-sheet request form, industry PDFs (SPC) | Document library with **instant** TDS/SDS download (no form), industry pages when content exists, a colour library slot behind a feature flag until a real chart exists. |
| Tone | "The resource for paint line solutions" (SPC); "Protecting your business is our business" (Trinkote) | Plain, specific, second-person where natural: "Coatings for fabricated metal, with the data sheets up front." Tone rules in `technical-architecture.md` §2 apply. |

## 3. Tokens (implemented in `site/app/styles/tokens.css`)

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#14181F` | Text, header, footer |
| `--color-ink-soft` | `#3C4452` | Secondary text |
| `--color-accent` | `#C84A18` | Primary buttons, rules, arrows (white text on it: 4.7:1) |
| `--color-accent-deep` | `#B5431A` | Hover, accent text on white (5.6:1) |
| `--color-accent-bright` | `#EE7F52` | Accent text on the dark ink background (6.6:1) |
| `--color-surface` | `#FFFFFF` | Page |
| `--color-surface-alt` | `#F3F4F6` | Alternating bands |
| `--color-steel` | `#E6ECF2` | Tint band, table header |
| `--color-line` | `#D5DAE1` | Borders |
| `--color-success / warning / error` | `#1E7F4F` / `#B26A00` / `#B42318` | Form states |
| Radius | 2 px (controls), 4 px (cards) | "Engineered" not "consumer" |
| Type scale | 14 / 15 / 16 / 18 / 20 / 20.8 / 24.8 / 29.6 / 36.8 / 44.8 px | Heading sizes pulled in for the wide display face |
| `--font-display` / `--font-sans` | Michroma (→ Mirano) / Barlow | Set in `app/layout.tsx` via `next/font/local`; swapping Mirano in is a change to that one file |
| Motion | ≤ 200 ms opacity/transform; none under `prefers-reduced-motion` | |

## 4. Logo (adopted 2026-10-16)

The owner generated the logo with an image model from a prompt written to the brand decisions (squared Eurostile-style wordmark, charcoal ink, safety-orange accent, star mark) and approved it "for now". It was traced into clean vectors so it scales and reverses:

| File (in `brand/logo/` and `site/public/brand/`) | Use |
|---|---|
| `aster-logo-horizontal.svg` / `-on-dark.svg` | Full lockup: wordmark, "INDUSTRIAL COATINGS" descriptor, star mark. Footer, documents, print. |
| `aster-logo-compact.svg` / `-on-dark.svg` | Wordmark + mark, no descriptor. Header and anything under about 48 px tall, where the descriptor would be unreadable. |
| `aster-mark.svg` / `-on-dark.svg` | Star alone. Social avatars, stamps. |
| `icon.svg`, `apple-icon.png`, `aster-icon-192/512.png` | Favicon set: the star on an ink tile so it reads on any tab background. |
| `aster-logo-horizontal-2000.png` | Raster export for email signatures and partners. |

In the site the paths live in `components/brand/logo-paths.ts` (generated from the SVGs) and render through `<Logo>`, `<LogoCompact>` and `<Mark>`, with the ink layer following `currentColor`. The wordmark's letterforms are bolder than the Michroma headings; once Mirano is licensed the two will match.

## 5. Motion (added 2026-10-16, owner: "confident but restrained")

All motion is opacity and transform only, 160–700 ms, and fully disabled under `prefers-reduced-motion`. Server HTML is always fully visible; JavaScript only adds the hiding class, so nothing depends on scripts to be readable.

| Element | Behaviour |
|---|---|
| Home hero | Eyebrow, headline, lead and buttons rise in with a 60–400 ms stagger on load; the hero image eases from a 4 % zoom. Full-bleed photograph with a soft **white** wash on the text side and dark text when `hero.jpg` exists (the first version used a dark gradient and white text; the owner found it too dark — see §6). |
| Section headings | Rise in on scroll; an orange "coat line" draws in beneath (`.coat-line`), on-dark variant on dark bands. |
| Lists and cards | Children stagger 70–90 ms apart on scroll (`<Reveal delay>`). |
| Hover | Arrows travel 3 px in link rows; cards and industry tiles lift 3 px with a soft shadow; photos inside tiles zoom 4 %; the primary button lifts 1 px with an orange glow. |
| CTA band | Solid brand-orange band (white heading, white coat line, white primary button) with a faint white dot motif — the Sheboygan-style band. Heading and buttons reveal on scroll. The earlier photo-with-dark-gradient version is retired; the `cta-band` slot is reserved but unused. |

| Route change (added 2026-10-19) | Main content fades and rises in over 420 ms on every navigation (`PageTransition.tsx` remounts it per pathname). |
| Header on scroll | After 24 px the sticky header tightens by ~12 px on desktop, gains a shadow and a slight blur (`ScrollState.tsx` sets `html[data-scrolled]`). |
| Nav links | An orange rule grows from the left on hover and stays on the current page. |
| Mobile menu | Slides in from the right; backdrop fades. |
| Section photos | Gentle parallax, at most ±18 px, inside a clipped frame scaled 8 % (`ParallaxFrame.tsx`, `BrandImage parallax`); observed only while on screen. Used on home "How we work", Services, Industries and About. |
| Anchor links | Sections carry `scroll-margin-top` so in-page chips land below the sticky header. |

Implementation: `components/ui/Reveal.tsx` (IntersectionObserver, `visibility` + opacity so audits and assistive tech ignore pending elements), `PageTransition.tsx`, `ScrollState.tsx`, `ParallaxFrame.tsx`, and the motion and flow blocks at the end of `app/globals.css`.

## 6. Imagery (updated 2026-10-16: stock photography)

**Current state:** twelve licensed Pexels photographs fill every slot (`image-credits.md` lists files, sources and licence terms). The owner tried generated imagery twice — first too dark, then "does not look good" — and chose real photography, which is also what the Sheboygan reference uses. Stock images are captioned by subject only and are to be replaced by the company's own photography under the same file names when it exists.

Earlier decision, for the record: generate imagery with an image model from a controlled shot list now, replace with real photography later. **Direction revised the same day:** the first prompts (muted charcoal, haze, low light) produced images the owner described as dark and horror-film-like. The brief is now bright, clean and daylit in the Sheboygan vein — white/pale-grey booths, light floors, daylight, clear colours, orange as an accent — and the site's own treatment changed to match: hero wash is white with dark text, the CTA band is solid orange, no dark gradients anywhere outside the header and footer. Reject moody, dim, hazy or vignetted results. Every image on the site is a named slot (`content/images.ts`) rendered by `<BrandImage>` / `<BrandBackdrop>`; a slot shows `/public/images/<key>.jpg` when the file exists and the neutral technical graphic otherwise, so imagery is added by dropping files, not by changing code. Prompts, file names and ratios are in `image-shot-list.md`. Generated images are captioned by subject only and never presented as the company's own facility, staff or products.

## 7. Earlier imagery policy (superseded by §6)
Until the owner supplies approved photography (A10), hero and section image slots render a neutral CSS/SVG technical graphic (hatched steel-grey panel with a subtle grid). No stock photos of facilities, people or products are used, because they would read as the company's own.
