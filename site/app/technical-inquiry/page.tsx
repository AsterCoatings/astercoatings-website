import { Suspense } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { messaging } from '@/content/messaging';
import { products } from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, Section } from '@/components/ui/primitives';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { TechnicalFields } from '@/components/forms/FieldGroups';

export const metadata = buildMetadata({
  title: 'Technical inquiry',
  description: 'Ask about product selection, surface preparation, application or compatibility.',
  path: '/technical-inquiry',
});

const labels = {
  productInterest: 'Product',
  question: 'Question',
  name: 'Name',
  company: 'Company',
  email: 'Work email',
  phone: 'Phone',
  consent: 'Privacy consent',
};

export default function TechnicalPage() {
  const productOptions = products.map((p) => ({ value: p.id, label: p.name }));
  const productNames = Object.fromEntries(products.map((p) => [p.id, p.name]));
  return (
    <>
      <Breadcrumbs items={[{ label: 'Technical inquiry' }]} />
      <PageHeader title={messaging.technical.headline.text} lead={messaging.technical.lead.text} />
      <Section>
        <div className="max-w-3xl">
          <Suspense fallback={<p>Loading form…</p>}>
            <InquiryForm
              type="technical"
              labels={labels}
              productNames={productNames}
              submitLabel="Send question"
            >
              <TechnicalFields productOptions={productOptions} />
            </InquiryForm>
          </Suspense>
        </div>
      </Section>
    </>
  );
}
