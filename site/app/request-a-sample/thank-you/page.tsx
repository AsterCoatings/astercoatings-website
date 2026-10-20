import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { site } from '@/content/site.config';
import { PageHeader, Section } from '@/components/ui/primitives';

export const metadata = buildMetadata({
  title: 'Thank you',
  description: 'Your sample request was received.',
  path: '/request-a-sample/thank-you',
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <PageHeader
        title="We have your sample request."
        lead="It has reached our sales team. We will confirm the product and ask for a ship-to address by email."
      />
      <Section>
        <div className="prose-block text-md">
          {site.contact.salesPhone ? <p>If it is urgent, call {site.contact.salesPhone}.</p> : null}
          <p>
            {' '}
            Meanwhile you can <Link href="/services">read about our services</Link> or{' '}
            <Link href="/industries">see the industries we supply</Link>.
          </p>
        </div>
      </Section>
    </>
  );
}
