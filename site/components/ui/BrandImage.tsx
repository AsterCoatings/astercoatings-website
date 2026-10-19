import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { imageSlots, type ImageKey } from '@/content/images';
import { isProduction } from '@/content/site.config';
import { ParallaxFrame } from './ParallaxFrame';

const EXTS = ['jpg', 'jpeg', 'png', 'webp'];
const cache = new Map<string, string | null>();

/**
 * Resolves `/public/images/<key>.<ext>` (server component), or null when absent. Cached for the
 * production build; in development the folder is re-checked on every request so newly added
 * files appear on reload without restarting the dev server.
 */
export function resolveImage(key: string): string | null {
  const useCache = process.env.NODE_ENV === 'production';
  if (useCache && cache.has(key)) return cache.get(key)!;
  let found: string | null = null;
  for (const ext of EXTS) {
    const p = path.join(process.cwd(), 'public', 'images', `${key}.${ext}`);
    if (fs.existsSync(p)) {
      // Content hash in the query string so a swapped photo under the same file name is never
      // served stale from the Next image cache or the browser cache (owner report, 2026-10-19).
      const v = crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex').slice(0, 8);
      found = `/images/${key}.${ext}?v=${v}`;
      break;
    }
  }
  if (useCache) cache.set(key, found);
  return found;
}

/**
 * Resolves `/public/videos/<key>.mp4` for a slot that has a motion version (the hero), or null.
 * Same content-hash query as images so a replaced clip is never served from a stale cache.
 */
export function resolveVideo(key: string): string | null {
  const p = path.join(process.cwd(), 'public', 'videos', `${key}.mp4`);
  if (!fs.existsSync(p)) return null;
  const v = crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex').slice(0, 8);
  return `/videos/${key}.mp4?v=${v}`;
}

/**
 * An image slot. Renders the manifest image if the file exists, otherwise the neutral technical
 * graphic (with a dev-only label naming the missing file). Swap imagery by adding files, not code.
 */
export function BrandImage({
  slot,
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  fill = true,
  parallax = false,
}: {
  slot: ImageKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  /** Gentle scroll parallax inside the frame (section photos). */
  parallax?: boolean;
}) {
  const spec = imageSlots[slot];
  const src = resolveImage(spec.key);
  if (src) {
    const img = (
      <Image src={src} alt={spec.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    );
    if (parallax) {
      return <ParallaxFrame className={className}>{img}</ParallaxFrame>;
    }
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ aspectRatio: fill ? undefined : spec.aspect }}
      >
        {img}
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${spec.alt} (image to be supplied)`}
      className={`hatch relative overflow-hidden ${className}`}
      style={{ aspectRatio: fill ? undefined : spec.aspect }}
    >
      <div className="dot-motif absolute inset-0 opacity-70" />
      {!isProduction ? (
        <span className="absolute bottom-2 left-2 rounded-xs bg-draft-tint px-1.5 py-0.5 font-mono text-[11px] text-draft">
          images/{spec.key}.jpg
        </span>
      ) : null}
    </div>
  );
}

/**
 * Full-bleed background image with a wash for text legibility. The default `light` tone (owner
 * decision 2026-10-16: bright, daylit imagery, dark text) lays a soft white wash over the text side
 * so the photograph stays bright and readable; `dark` is kept for any future dark band.
 * Falls back to the technical graphic in the matching tone.
 */
export function BrandBackdrop({
  slot,
  className = '',
  priority = false,
  tone = 'light',
  drift = false,
  video = false,
}: {
  slot: ImageKey;
  className?: string;
  priority?: boolean;
  tone?: 'light' | 'dark';
  /** Slow, looping zoom-and-pan on the photograph (hero). Off under prefers-reduced-motion. */
  drift?: boolean;
  /**
   * Play `/public/videos/<slot>.mp4` over the photograph when the file exists: muted, looping,
   * inline, no controls. The photograph is the poster and stays as the still for no-JS, slow
   * connections and prefers-reduced-motion (the source carries a media query, so the clip is
   * not even downloaded there).
   */
  video?: boolean;
}) {
  const spec = imageSlots[slot];
  const src = resolveImage(spec.key);
  const clip = video ? resolveVideo(spec.key) : null;
  const fallback = tone === 'light' ? 'hatch' : 'hatch-dark';
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${src ? '' : fallback} ${className}`}>
      {src ? (
        <>
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={priority}
            className={`object-cover ${drift ? 'hero-drift' : ''}`}
          />
          {clip ? (
            <video
              className={`hero-video absolute inset-0 h-full w-full object-cover ${drift ? 'hero-drift' : ''}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={src}
              tabIndex={-1}
            >
              <source src={clip} type="video/mp4" media="(prefers-reduced-motion: no-preference)" />
            </video>
          ) : null}
          {tone === 'light' ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 via-40% to-white/0 to-75%" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
