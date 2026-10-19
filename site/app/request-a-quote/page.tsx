import { Suspense } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { messaging } from '@/content/messaging';
import { site } from '@/content/site.config';
import { products } from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, Section } from '@/components/ui/primitives';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { QuoteFields } from '@/components/forms/FieldGroups';

export const metadata = buildMetadata({
  title: 'Request a quote',
  description:
    'Request pricing on industrial coatings. Tell us the part, substrate, application method and volume.',
  path: '/request-a-quote',
});

const labels = {
  productInterest: 'Product of interest',
  application: 'Part or application',
  substrate: 'Substrate',
  substrateOther: 'Other substrate',
  method: 'Application method',
  volume: 'Estimated annual volume',
  timeline: 'Timeline',
  location: 'Project location',
  message: 'Anything else',
  name: 'Name',
  company: 'Company',
  email: 'Work email',
  phone: 'Phone',
  consent: 'Privacy consent',
};

export default function QuotePage() {
  const productOptions = products.map((p) => ({ value: p.id, label: p.name }));
  const productNames = Object.fromEntries(products.map((p) => [p.id, p.name]));
  return (
    <>
      <Breadcrumbs items={[{ label: 'Request a quote' }]} />
      <PageHeader title={messaging.quote.headline.text} lead={messaging.quote.lead.text} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<p>Loading form…</p>}>
              <InquiryForm
                type="quote"
                labels={labels}
                productNames={productNames}
                submitLabel="Send quote request"
              >
                <QuoteFields productOptions={productOptions} />
              </InquiryForm>
            </Suspense>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-sm border border-line bg-surface-alt p-5 text-sm">
              <h2 className="text-base font-bold">What happens next</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-soft">
                <li>You get an email confirming we received the request, with a reference number.</li>
                <li>
                  Sales reviews the substrate, method and volume
                  {site.features.responseTimeCommitment
                    ? ` and replies within ${site.features.responseTimeCommitment}`
                    : ''}
                  .
                </li>
                <li>If a technical question needs answering first, we ask before quoting.</li>
              </ol>
              {site.contact.salesPhone ? (
                <p className="mt-4">Prefer to call? {site.contact.salesPhone}</p>
              ) : null}
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
