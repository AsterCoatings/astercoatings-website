import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { site } from '@/content/site.config';
import { PageHeader, Section } from '@/components/ui/primitives';

export const metadata = buildMetadata({
  title: 'Thank you',
  description: 'Your technical inquiry was received.',
  path: '/technical-inquiry/thank-you',
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <PageHeader
        title="We have your question."
        lead="A confirmation email is on its way with a reference number. We reply by email, so keep an eye on your inbox."
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
