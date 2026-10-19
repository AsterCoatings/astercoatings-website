import { Suspense } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { messaging } from '@/content/messaging';
import { site } from '@/content/site.config';
import { products } from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, Section } from '@/components/ui/primitives';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { SampleFields } from '@/components/forms/FieldGroups';

export const metadata = buildMetadata({
  title: 'Request a sample',
  description: 'Request an evaluation sample of an Aster coating for your line.',
  path: '/request-a-sample',
});

const labels = {
  productInterest: 'Product',
  application: 'Intended use',
  sampleSize: 'Sample size',
  currentCoating: 'Coating you use today',
  message: 'Anything else',
  name: 'Name',
  company: 'Company',
  email: 'Work email',
  phone: 'Phone',
  consent: 'Privacy consent',
};

export default function SamplePage() {
  const productOptions = products.map((p) => ({ value: p.id, label: p.name }));
  const productNames = Object.fromEntries(products.map((p) => [p.id, p.name]));
  return (
    <>
      <Breadcrumbs items={[{ label: 'Request a sample' }]} />
      <PageHeader title={messaging.sample.headline.text} lead={messaging.sample.lead.text} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<p>Loading form…</p>}>
              <InquiryForm
                type="sample"
                labels={labels}
                productNames={productNames}
                submitLabel="Send sample request"
              >
                <SampleFields productOptions={productOptions} />
              </InquiryForm>
            </Suspense>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-sm border border-line bg-surface-alt p-5 text-sm">
              <h2 className="text-base font-bold">What happens next</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-soft">
                <li>You get an email confirming we received the request, with a reference number.</li>
                <li>We confirm the product and sample size, and ask for a ship-to address by email.</li>
                <li>The sample ships with its technical data sheet and safety data sheet.</li>
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
