import {
  BRAND_ACCENT,
  COMPACT_INK_PATH,
  COMPACT_VIEWBOX,
  LOGO_ACCENT_PATH,
  LOGO_INK_PATH,
  LOGO_VIEWBOX,
  MARK_ACCENT_PATH,
  MARK_INK_PATH,
  MARK_VIEWBOX,
} from './logo-paths';

/**
 * Full horizontal logo (wordmark + descriptor + mark). Ink follows `currentColor`, so set the text colour
 * of the parent: white in the header and footer, ink on light surfaces.
 */
export function Logo({
  className = '',
  title = 'Aster Industrial Coatings',
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label={title} focusable="false">
      <path fill="currentColor" fillRule="evenodd" d={LOGO_INK_PATH} />
      <path fill={BRAND_ACCENT} fillRule="evenodd" d={LOGO_ACCENT_PATH} />
    </svg>
  );
}

/** Wordmark + mark without the descriptor line: for the header and anywhere under ~48px tall. */
export function LogoCompact({
  className = '',
  title = 'Aster Industrial Coatings',
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg viewBox={COMPACT_VIEWBOX} className={className} role="img" aria-label={title} focusable="false">
      <path fill="currentColor" fillRule="evenodd" d={COMPACT_INK_PATH} />
      <path fill={BRAND_ACCENT} fillRule="evenodd" d={LOGO_ACCENT_PATH} />
    </svg>
  );
}

/** The star mark alone. */
export function Mark({ className = '', title = 'Aster' }: { className?: string; title?: string }) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} role="img" aria-label={title} focusable="false">
      <path fill="currentColor" fillRule="evenodd" d={MARK_INK_PATH} />
      <path fill={BRAND_ACCENT} fillRule="evenodd" d={MARK_ACCENT_PATH} />
    </svg>
  );
}
