import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { messaging, copy } from '@/content/messaging';
import { isProduction, site } from '@/content/site.config';
import { industries } from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CopyFlag } from '@/components/ui/Placeholder';
import { CtaBand, PageHeader, Section } from '@/components/ui/primitives';
import { BrandImage } from '@/components/ui/BrandImage';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = buildMetadata({
  title: 'About',
  description: `${site.brand.name} makes its own alkyd resin and formulates water-reducible and short oil alkyd primers and topcoats for steel fabrications, manufactured in California, Kentucky, Michigan and Texas.`,
  path: '/about',
});

/**
 * About page: mission → what we make → how a job runs → who we work with → what we stand for →
 * where we are → earning trust → get in touch. Copy in `content/messaging.ts`.
 */
export default function AboutPage() {
  const m = messaging.about;
  const history = copy(m.history, isProduction);

  return (
    <>
      <Breadcrumbs items={[{ label: 'About' }]} />
      <PageHeader eyebrow="About Aster" title={m.headline.text} lead={m.intro.text} />

      {/* What we make */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="text-2xl md:text-3xl">{m.make.heading}</h2>
            <span className="coat-line" aria-hidden="true" />
            <p className="prose-block mt-4 text-md">{m.make.text}</p>
          </Reveal>
          <Reveal variant="scale" delay={80} className="lg:col-span-6">
            <BrandImage
              slot="about"
              parallax
              className="aspect-[3/2] w-full rounded-sm"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </Section>

      {/* How a job runs */}
      <Section tone="alt">
        <Reveal>
          <h2 className="text-2xl md:text-3xl">{m.how.heading}</h2>
          <span className="coat-line" aria-hidden="true" />
        </Reveal>
        <ol className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {m.how.steps.map((st, i) => (
            <Reveal as="li" key={st.heading} delay={i * 90} className="border-t-2 border-ink pt-5">
              <h3 className="text-lg">{st.heading}</h3>
              <p className="mt-2 text-ink-soft">{st.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Who we work with */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-2xl md:text-3xl">{m.who.heading}</h2>
            <span className="coat-line" aria-hidden="true" />
            <p className="prose-block mt-4 text-md">{m.who.text}</p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {industries.map((ind) => (
                <li key={ind.id} className="border-b border-line py-3">
                  <Link href={`/industries#${ind.slug}`} className="text-link font-semibold text-ink">
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* What we stand for */}
      <Section tone="alt">
        <Reveal>
          <h2 className="text-2xl md:text-3xl">{m.values.heading}</h2>
          <span className="coat-line" aria-hidden="true" />
        </Reveal>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {m.values.items.map((v, i) => (
            <Reveal as="li" key={v.heading} delay={i * 90} className="border-t-2 border-ink pt-5">
              <h3 className="text-lg">{v.heading}</h3>
              <p className="mt-2 text-ink-soft">{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Where we are */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal variant="scale" className="lg:order-2 lg:col-span-6">
            <BrandImage
              slot="about-history"
              parallax
              className="aspect-[3/2] w-full rounded-sm"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
          <Reveal className="lg:order-1 lg:col-span-6">
            <h2 className="text-2xl md:text-3xl">{m.history.heading}</h2>
            <span className="coat-line" aria-hidden="true" />
            <p className="prose-block mt-4 text-md">
              {history.text}
              <CopyFlag needsApproval={history.needsApproval} />
            </p>
            {site.relationships.sunpol.disclose && site.relationships.sunpol.text ? (
              <p className="prose-block mt-4 text-md">{site.relationships.sunpol.text}</p>
            ) : null}
            {site.contact.publishAddress && site.contact.address ? (
              <address className="mt-6 border-l-2 border-accent pl-4 text-md not-italic">
                <span className="block font-semibold">{site.brand.name}</span>
                <span className="block">{site.contact.address.street}</span>
                <span className="block">
                  {site.contact.address.city}, {site.contact.address.region} {site.contact.address.postalCode}
                </span>
                {site.contact.salesPhone ? (
                  <a
                    href={`tel:${site.contact.salesPhone.replace(/[^+\d]/g, '')}`}
                    className="text-link mt-2 inline-block text-ink"
                  >
                    {site.contact.salesPhone}
                  </a>
                ) : null}
              </address>
            ) : null}
          </Reveal>
        </div>
      </Section>

      {/* Trust */}
      <Section tone="steel">
        <Reveal className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl">{m.trust.heading}</h2>
          <span className="coat-line" aria-hidden="true" />
          <p className="prose-block mt-4 text-md">{m.trust.text}</p>
        </Reveal>
      </Section>

      <CtaBand
        heading="Get in touch"
        text={
          site.contact.salesPhone
            ? `Call ${site.contact.salesPhone}, or send us the part and the spec.`
            : undefined
        }
      />
    </>
  );
}
