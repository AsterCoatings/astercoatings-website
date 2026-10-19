import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { messaging, copy } from '@/content/messaging';
import { isProduction } from '@/content/site.config';
import { categoriesWithProducts, industries, productsInCategory } from '@/lib/content';
import { CopyFlag } from '@/components/ui/Placeholder';
import { ButtonLink, CtaBand, LinkRow, Section } from '@/components/ui/primitives';
import { BrandBackdrop, BrandImage, resolveImage } from '@/components/ui/BrandImage';
import { Reveal } from '@/components/ui/Reveal';
import type { ImageKey } from '@/content/images';

export const metadata = buildMetadata({
  title: 'Home',
  description:
    'Water-reducible and short oil alkyd primers and topcoats for steel fabrication, made on our own alkyd resin at plants in California, Kentucky, Michigan and Texas. Custom formulation, colour matching and toll manufacturing.',
  path: '/',
});

export default function HomePage() {
  const m = messaging.home;
  const headline = copy(m.headline, isProduction);
  const lead = copy(m.lead, isProduction);
  const indHeading = copy(m.industriesHeading, isProduction);
  const ctaText = copy(m.ctaText, isProduction);
  const publishedCats = categoriesWithProducts().filter((c) =>
    productsInCategory(c.id).some((p) => p.status === 'published'),
  );
  const heroHasPhoto = Boolean(resolveImage('hero'));

  return (
    <>
      {/* Hero: bright full-bleed photograph with a soft white wash behind the text when the file exists;
          otherwise a light split layout. Dark text throughout (owner: bright, not moody). */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden border-b border-line bg-surface-alt text-ink"
      >
        {heroHasPhoto ? <BrandBackdrop slot="hero" priority drift video className="-z-10" /> : null}
        <div
          className={`site-container grid items-center gap-10 py-20 md:py-28 lg:grid-cols-12 ${heroHasPhoto ? 'min-h-[min(82vh,760px)] lg:py-36' : 'lg:py-28'}`}
        >
          <div className="hero-enter lg:col-span-7">
            <p className="eyebrow">{m.eyebrow.text}</p>
            <h1 id="hero-heading" className="mt-4 text-4xl md:text-5xl">
              {headline.text}
              <CopyFlag needsApproval={headline.needsApproval} />
            </h1>
            <p className="prose-block mt-6 text-md text-ink-soft md:text-lg">
              {lead.text}
              <CopyFlag needsApproval={lead.needsApproval} />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Contact us</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Our services
              </ButtonLink>
            </div>
          </div>
          {!heroHasPhoto ? (
            <div className="hero-media lg:col-span-5">
              <BrandImage
                slot="hero"
                priority
                className="aspect-[4/3] w-full rounded-sm border border-line"
              />
            </div>
          ) : null}
        </div>
        {!heroHasPhoto ? (
          <div
            className="dot-motif pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 opacity-60"
            aria-hidden="true"
          />
        ) : null}
      </section>

      {/* Why */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-2xl md:text-3xl">{m.whyHeading.text}</h2>
              <span className="coat-line" aria-hidden="true" />
            </Reveal>
            <ul className="mt-8 grid gap-8 sm:grid-cols-3 lg:grid-cols-1">
              {m.why.map((w, i) => (
                <Reveal as="li" key={w.heading} delay={i * 90} className="border-t-2 border-ink pt-5">
                  <h3 className="text-lg">{w.heading}</h3>
                  <p className="mt-2 max-w-prose text-ink-soft">{w.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal variant="scale" className="lg:col-span-5">
            <BrandImage
              slot="home-specs"
              parallax
              className="aspect-[4/3] w-full rounded-sm"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>
        </div>
      </Section>

      {/* Services (lead offer until formulated products are published) */}
      <Section tone="alt">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl">{messaging.services.headline.text}</h2>
            <span className="coat-line" aria-hidden="true" />
          </div>
          <Link href="/services" className="font-semibold text-accent-deep">
            All services →
          </Link>
        </Reveal>
        <div className="mt-6 grid gap-x-10 md:grid-cols-3">
          {messaging.services.items
            .filter((s) => s.offered)
            .map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <LinkRow href={`/services#${s.id}`} meta={copy(s, isProduction).text.split('. ')[0] + '.'}>
                  {s.heading}
                </LinkRow>
              </Reveal>
            ))}
        </div>
        {publishedCats.length > 0 ? (
          <p className="mt-8 text-md">
            <Link href="/products" className="font-semibold text-accent-deep">
              Browse products by chemistry →
            </Link>
          </p>
        ) : null}
      </Section>

      {/* Industries: photo tiles */}
      <Section>
        <Reveal>
          <h2 className="text-2xl md:text-3xl">
            {indHeading.text}
            <CopyFlag needsApproval={indHeading.needsApproval} />
          </h2>
          <span className="coat-line" aria-hidden="true" />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const key = `industry-${ind.id}` as ImageKey;
            return (
              <Reveal key={ind.id} delay={(i % 3) * 80}>
                <Link
                  href={`/industries#${ind.slug}`}
                  className="lift zoom-media group block overflow-hidden rounded-sm border border-line bg-surface no-underline"
                >
                  <BrandImage
                    slot={key}
                    className="aspect-[3/2] w-full"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <span className="flex items-center justify-between gap-3 px-4 py-3">
                    <span>
                      <span className="block font-semibold text-ink">{ind.name}</span>
                      <span className="mt-0.5 block text-sm text-ink-muted">{ind.shortDescription}</span>
                    </span>
                    <span className="link-row-arrow">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand heading={m.ctaHeading.text} text={ctaText.text} />
    </>
  );
}
