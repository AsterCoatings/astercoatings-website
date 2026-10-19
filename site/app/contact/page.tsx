import { Suspense } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { messaging } from '@/content/messaging';
import { site } from '@/content/site.config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, Section } from '@/components/ui/primitives';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { ContactFields } from '@/components/forms/FieldGroups';

export const metadata = buildMetadata({
  title: 'Contact',
  description: `Contact ${site.brand.name} by phone, email or the form on this page.`,
  path: '/contact',
});

const labels = {
  subject: 'Subject',
  message: 'Message',
  name: 'Name',
  company: 'Company',
  email: 'Work email',
  phone: 'Phone',
  consent: 'Privacy consent',
};

export default function ContactPage() {
  const a = site.contact.address;
  return (
    <>
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <PageHeader title={messaging.contact.headline.text} lead={messaging.contact.lead.text} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<p>Loading form…</p>}>
              <InquiryForm type="contact" labels={labels} submitLabel="Send message">
                <ContactFields />
              </InquiryForm>
            </Suspense>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <dl className="grid gap-5 text-sm">
              <div>
                <dt className="font-bold">Sales</dt>
                <dd className="mt-1">
                  {site.contact.salesPhone ? <div>{site.contact.salesPhone}</div> : null}
                  {site.contact.salesEmail ? <div>{site.contact.salesEmail}</div> : null}
                  {!site.contact.salesPhone && !site.contact.salesEmail ? (
                    <div>Use the form; it reaches sales directly.</div>
                  ) : null}
                </dd>
              </div>
              {site.contact.technicalEmail ? (
                <div>
                  <dt className="font-bold">Technical support</dt>
                  <dd className="mt-1">{site.contact.technicalEmail}</dd>
                </div>
              ) : null}
              {site.contact.publishAddress && a ? (
                <div>
                  <dt className="font-bold">Address</dt>
                  <dd className="mt-1">{`${a.street}, ${a.city}, ${a.region} ${a.postalCode}`}</dd>
                </div>
              ) : null}
              {site.contact.hours ? (
                <div>
                  <dt className="font-bold">Hours</dt>
                  <dd className="mt-1">{site.contact.hours}</dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>
      </Section>
    </>
  );
}
