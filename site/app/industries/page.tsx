import { buildMetadata } from '@/lib/seo/metadata';
import { messaging, copy } from '@/content/messaging';
import { isProduction } from '@/content/site.config';
import { industries } from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CopyFlag } from '@/components/ui/Placeholder';
import { CtaBand, PageHeader, Section } from '@/components/ui/primitives';
import { BrandImage } from '@/components/ui/BrandImage';
import { Reveal } from '@/components/ui/Reveal';
import type { ImageKey } from '@/content/images';

export const metadata = buildMetadata({
  title: 'Industries',
  description:
    'Industrial alkyd coatings for agriculture and construction equipment, trailers and truck bodies, metal fabrication, racking, steel doors, tanks and containers.',
  path: '/industries',
});

export default function IndustriesPage() {
  const lead = copy(messaging.industries.lead, isProduction);
  return (
    <>
      <Breadcrumbs items={[{ label: 'Industries' }]} />
      <PageHeader
        title={messaging.industries.headline.text}
        lead={
          <>
            {lead.text}
            <CopyFlag needsApproval={lead.needsApproval} />
          </>
        }
      >
        <nav aria-label="Industries on this page" className="mt-6 flex flex-wrap gap-2">
          {industries.map((i) => (
            <a
              key={i.id}
              href={`#${i.slug}`}
              className="chip rounded-xs border border-line-strong bg-surface px-3 py-1.5 text-sm font-semibold text-ink no-underline"
            >
              {i.name}
            </a>
          ))}
        </nav>
      </PageHeader>
      {industries.map((m, i) => {
        return (
          <Section key={m.id} id={m.slug} tone={i % 2 ? 'alt' : 'default'}>
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <Reveal variant="scale" className="lg:col-span-5">
                <BrandImage
                  slot={`industry-${m.id}` as ImageKey}
                  parallax
                  className="aspect-[3/2] w-full rounded-sm"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </Reveal>
              <Reveal className="lg:col-span-6 lg:col-start-7">
                <h2 className="text-2xl md:text-3xl">{m.name}</h2>
                <span className="coat-line" aria-hidden="true" />
                <p className="mt-3 text-md text-ink-soft">{m.description ?? m.shortDescription}</p>
              </Reveal>
            </div>
          </Section>
        );
      })}
      <CtaBand heading="Don't see your industry?" text="Tell us what you fabricate and how you finish it." />
    </>
  );
}
