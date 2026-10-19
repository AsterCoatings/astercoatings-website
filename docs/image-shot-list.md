# Image shot list — Nano Banana prompts

> **Superseded 2026-10-16.** The owner reviewed the generated results and rejected them ("do not look good"). The site now uses licensed stock photography from Pexels — see `image-credits.md` for the files, sources and licence. This document is kept as the slot list and ratios, and in case generated or commissioned imagery is revisited. The slot mechanism is unchanged: drop a file with the right name into `site\public\images\`.

**Project:** Aster Industrial Coatings · **Date:** 2026-10-16 (revised same day: bright direction) · Owner decision: generate imagery with Nano Banana now, replace with real photography as it becomes available.

## Direction (revised)

The first prompts asked for muted charcoal, haze and low light; the results read as dark and ominous. The owner asked for the opposite: **bright, clean, daylit** — the Sheboygan Paint Company feel. Think a well-lit modern finishing plant on a sunny morning: white and pale-grey booth walls, light concrete floors, lots of daylight, fresh coatings in clear colours, crisp focus. Orange appears as a confident accent, not as a glow in the dark. The site now puts a light wash and dark text over the hero photo, so photos should be bright to begin with; a dark photo will look wrong.

Reject any result that is moody, dim, hazy, smoky, night-time, high-contrast "cinematic", or that has dark corners/vignetting. If it looks like a film still, regenerate.

## How it works

Every image on the site is a named slot. Generate the image, save it with the exact file name below into `site\public\images\`, and the next page load shows it; no code change. Until a file exists the slot shows the light technical graphic. Supported formats: `.jpg` (preferred), `.png`, `.webp`.

Rules that keep us honest: generated images are illustrative. Captions and alt text on the site describe the subject ("a coated steel bracket"), never "our plant" or "our team", and no generated image goes on the About page as a photo of the company until real photography replaces it. If a generated image contains readable text, a logo, or a recognisable brand (a competitor's drum, a tool brand), regenerate it.

## Style line (append to every prompt)

```
Bright, clean, high-key commercial photograph of a modern industrial finishing facility, flooded with soft natural daylight from large windows and skylights plus even white overhead lighting, white and pale grey walls, light polished concrete floor, airy and spacious, crisp sharp focus, true-to-life colour, fresh and optimistic mood like a corporate brochure, light grey and white palette with clean steel and one clear accent of bright safety orange, no haze, no smoke, no dark shadows, no vignette, no people's faces, no readable text or logos anywhere, no watermark, 16:9.
```

Change the ending ratio to match the slot. Generate at the largest size offered; 2000 px on the long edge is plenty.

If a result still comes back dark, add at the start of the prompt: `Overexposed-looking, very bright and airy,` — image models lean dark for "industrial" and need pushing.

## Shots

| File name | Ratio | Prompt (before the style line) |
|---|---|---|
| `hero.jpg` | 16:9 | Wide shot inside a bright white paint booth: freshly coated steel brackets and frames hanging from an overhead conveyor line, finishes in clean light grey and white with two parts in bright safety orange, white booth walls, light floor, daylight pouring in. Uncluttered composition with open, light space on the left third. |
| `home-specs.jpg` | 4:3 | Close-up of a freshly coated light-grey steel panel on a white workbench, a wet-film thickness gauge resting on it, a small brush-out of bright orange coating beside it, bright daylight, macro detail of the smooth finish. |
| `home-industries.jpg` | 3:2 | Rows of agricultural equipment frames and loader arms on a bright factory floor, uniform satin finish, most in light grey, one in bright safety orange, morning sunlight through high windows. |
| `cta-band.jpg` | 21:9 | (Optional — the CTA band is now a solid orange brand band and does not use a photo. Skip this file.) |
| `products-hub.jpg` | 16:9 | Unlabelled white and light-grey steel pails and drums of coating on a clean warehouse rack, white walls, light concrete floor, daylight, all labels blank. |
| `product-default.jpg` | 4:3 | A single coated steel test panel in light grey leaning against a white wall, perfectly even finish, soft daylight raking across the surface to show texture. |
| `industry-agriculture-construction-equipment.jpg` | 3:2 | A loader bucket attachment freshly coated in a hard-wearing satin finish in bright safety orange, sitting on a steel stand on a bright, clean factory floor. |
| `industry-trailers-truck-bodies.jpg` | 3:2 | A steel truck body frame in light grey primer on a bright fabrication shop floor, neat welds visible, white walls, daylight. |
| `industry-metal-fabrication.jpg` | 3:2 | Stacked welded steel brackets with a uniform light-grey coating on a pallet, sharp focus on the nearest bracket, bright workshop, white background. |
| `industry-racking-storage.jpg` | 3:2 | Pallet racking uprights and beams in a clean coated finish, uprights in bright safety orange and beams in light grey, bright warehouse perspective, white ceiling with skylights. |
| `industry-steel-doors-frames.jpg` | 3:2 | Hollow metal door frames hanging on a finishing line in light grey primer, evenly spaced, bright white industrial interior. |
| `industry-tanks-containers.jpg` | 3:2 | Steel drums with a smooth uniform white coated finish lined up on a light concrete floor, no labels, bright daylight. |
| `about.jpg` | 3:2 | A gloved hand holding a light-grey coated steel sample panel up to a bright window for inspection inside a white paint booth, face out of frame. |

## After generating

Drop the files into `site\public\images\`. If the site is running (`npm run dev`), refresh the page. The hero adds a soft white wash on the text side so dark headline text stays readable; everything else shows the photo as-is, so colour-correct towards bright if a result is a little dull.

When real photography arrives, replace a file with the same name and the site updates; at that point the alt text in `site\content\images.ts` can be made specific.
