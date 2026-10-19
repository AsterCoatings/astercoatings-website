import Link from 'next/link';
import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function Section({
  children,
  tone = 'default',
  className = '',
  id,
}: {
  children: ReactNode;
  tone?: 'default' | 'alt' | 'steel' | 'dark';
  className?: string;
  id?: string;
}) {
  const tones = {
    default: 'bg-surface',
    alt: 'bg-surface-alt',
    steel: 'bg-steel',
    dark: 'bg-ink text-white',
  } as const;
  return (
    <section id={id} className={`${tones[tone]} scroll-mt-20 py-12 md:py-16 lg:py-20 ${className}`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-surface-alt">
      <div className="site-container py-10 md:py-14">
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        {lead ? <p className="prose-block mt-4 text-md text-ink-soft">{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}

export function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkRow({ href, children, meta }: { href: string; children: ReactNode; meta?: ReactNode }) {
  return (
    <Link href={href} className="link-row">
      <span>
        <span className="block">{children}</span>
        {meta ? <span className="mt-1 block text-sm font-normal text-ink-muted">{meta}</span> : null}
      </span>
      <span className="link-row-arrow">
        <ArrowIcon />
      </span>
    </Link>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  children,
  className = '',
}: {
  href: string;
  variant?: 'primary' | 'secondary' | 'on-dark' | 'on-accent';
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      {children}
    </Link>
  );
}

export function CtaBand({
  heading,
  text,
  productId,
  productName,
  actions = 'contact',
}: {
  heading: string;
  text?: string;
  productId?: string;
  productName?: string;
  /** 'contact' (default, until products are published) or 'quote-sample' (product pages). */
  actions?: 'contact' | 'quote-sample';
}) {
  const q = productId ? `?product=${encodeURIComponent(productId)}` : '';
  // Solid brand-orange band (the Sheboygan-style "band" without the dark photo; owner asked for bright).
  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden bg-accent text-white">
      <div
        className="dot-motif-light pointer-events-none absolute -top-8 -right-8 h-56 w-56 opacity-70"
        aria-hidden="true"
      />
      <div className="site-container flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
        <Reveal className="max-w-2xl">
          <h2 id="cta-heading" className="text-2xl md:text-3xl">
            {heading}
          </h2>
          <span className="coat-line coat-line-on-accent" aria-hidden="true" />
          {text ? <p className="mt-4 text-md">{text}</p> : null}
          {productName ? <p className="mt-2 text-sm">Product: {productName}</p> : null}
        </Reveal>
        <Reveal delay={120} className="flex flex-wrap gap-3">
          {actions === 'quote-sample' ? (
            <>
              <ButtonLink href={`/request-a-quote${q}`} variant="on-accent">
                Request a quote
              </ButtonLink>
              <ButtonLink href={`/request-a-sample${q}`} variant="on-dark">
                Request a sample
              </ButtonLink>
            </>
          ) : (
            <ButtonLink href="/contact" variant="on-accent">
              Contact us
            </ButtonLink>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Neutral image slot (docs/design-notes.md §4). Replace with <Image> once approved assets exist. */
export function ImageSlot({
  className = '',
  label = 'Image slot — approved photography to be supplied',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div role="img" aria-label={label} className={`hatch relative overflow-hidden rounded-sm ${className}`}>
      <div className="dot-motif absolute inset-0 opacity-70" />
    </div>
  );
}
