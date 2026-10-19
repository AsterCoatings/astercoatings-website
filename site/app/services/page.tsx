import { buildMetadata } from '@/lib/seo/metadata';
import { messaging, copy } from '@/content/messaging';
import { isProduction, site } from '@/content/site.config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CopyFlag } from '@/components/ui/Placeholder';
import { CtaBand, PageHeader, Section } from '@/components/ui/primitives';
import { BrandImage } from '@/components/ui/BrandImage';
import { Reveal } from '@/components/ui/Reveal';
import type { ImageKey } from '@/content/images';

export const metadata = buildMetadata({
  title: 'Our Services',
  description:
    'Technical development, precision colour matching, product quality testing, responsive technical support, expedited shipping and toll manufacturing for OEM and fabricator customers.',
  path: '/services',
});

type Sub = {
  heading: string;
  text: string;
  approved: boolean;
  fallback?: string;
  columns?: { heading: string; items: readonly string[] }[];
};

/**
 * Services page. Section order mirrors the reference site's services page (intro,
 * one section per service with sub-sections where the reference has them, closing invitation).
 * All copy is original and lives in `content/messaging.ts`; only `offered: true` services render.
 */
export default function ServicesPage() {
  const lead = copy(messaging.services.lead, isProduction);
  const offered = messaging.services.items.filter((s) => s.offered);
  const closing = copy(messaging.services.closing, isProduction);
  return (
    <>
      <Breadcrumbs items={[{ label: 'Services' }]} />
      <PageHeader
        title={messaging.services.headline.text}
        lead={
          <>
            {lead.text}
            <CopyFlag needsApproval={lead.needsApproval} />
          </>
        }
      >
        <nav aria-label="Services on this page" className="mt-6 flex flex-wrap gap-2">
          {offered.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="chip rounded-xs border border-line-strong bg-surface px-3 py-1.5 text-sm font-semibold text-ink no-underline"
            >
              {s.heading}
            </a>
          ))}
        </nav>
      </PageHeader>

      {/* One section per offered service */}
      {offered.map((s, i) => {
        const c = copy(s, isProduction);
        const flip = i % 2 === 1;
        const subs: readonly Sub[] = 'subsections' in s ? (s.subsections as readonly Sub[]) : [];
        return (
          <Section key={s.id} id={s.id} tone={i % 2 ? 'alt' : 'default'}>
            <div className="grid items-start gap-10 lg:grid-cols-12">
              <Reveal className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
                <h2 className="text-2xl md:text-3xl">{s.heading}</h2>
                <span className="coat-line" aria-hidden="true" />
                <p className="prose-block mt-4 text-md">
                  {c.text}
                  <CopyFlag needsApproval={c.needsApproval} />
                </p>
              </Reveal>
              <Reveal variant="scale" delay={80} className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
                <BrandImage
                  slot={`service-${s.id}` as ImageKey}
                  parallax
                  className="aspect-[3/2] w-full rounded-sm"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </Reveal>
            </div>
            {subs.length ? (
              <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-2">
                {subs.map((sub, j) => {
                  const sc = copy(sub, isProduction);
                  return (
                    <Reveal key={sub.heading} delay={j * 80}>
                      <h3 className="text-xl">{sub.heading}</h3>
                      <p className="prose-block mt-3 text-ink-soft">
                        {sc.text}
                        <CopyFlag needsApproval={sc.needsApproval} />
                      </p>
                      {sub.columns ? (
                        <div className="mt-5 grid gap-6 sm:grid-cols-2">
                          {sub.columns.map((col) => (
                            <div key={col.heading}>
                              <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-ink-muted">
                                {col.heading}
                              </h4>
                              <ul className="mt-2 list-disc pl-5 text-ink-soft">
                                {col.items.map((it) => (
                                  <li key={it}>{it}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </Reveal>
                  );
                })}
              </div>
            ) : null}
          </Section>
        );
      })}

      {/* Closing invitation */}
      <Section>
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Have something on your mind?</p>
          <h2 className="mt-3 text-2xl md:text-3xl">{messaging.services.closing.heading}</h2>
          <p className="prose-block mt-4 text-md text-ink-soft">
            {closing.text}
            <CopyFlag needsApproval={closing.needsApproval} />
          </p>
        </Reveal>
      </Section>
      <CtaBand
        heading="Get in touch"
        text={`Describe the part, the spec, the colour and the volume.${site.contact.salesPhone ? ` Or call ${site.contact.salesPhone}.` : ''}`}
      />
    </>
  );
}
