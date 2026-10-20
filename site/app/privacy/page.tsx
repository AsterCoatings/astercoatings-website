import { buildMetadata } from '@/lib/seo/metadata';
import { isProduction, site } from '@/content/site.config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Placeholder } from '@/components/ui/Placeholder';
import { PageHeader, Section } from '@/components/ui/primitives';

export const metadata = buildMetadata({
  title: 'Privacy policy',
  description: `How ${site.brand.name} handles information submitted through this website.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Privacy policy' }]} />
      <PageHeader title="Privacy policy" />
      <Section>
        {!isProduction ? (
          <p
            role="status"
            className="mb-6 inline-block rounded-xs bg-draft-tint px-3 py-2 font-mono text-sm text-draft"
          >
            [LEGAL REVIEW REQUIRED — draft policy; open question F10]
          </p>
        ) : null}
        <div className="prose-block text-md">
          <p>
            This website is operated by {site.legal.entityName ?? site.brand.name}. This policy explains what
            information the website collects, why, and what we do with it. It applies to the website only.
          </p>
          <h2>Information you send us</h2>
          <p>
            When you request a quote, ask a technical question or use the contact form, we collect the details
            you enter: your name, company, email address, phone number if you give it, and what you tell us
            about your project. We use this information to answer your inquiry and, if you become a customer,
            to manage the relationship. Inquiries are delivered to our sales team by email through a
            form-processing service and retained for as long as there is a business reason to keep them.
          </p>
          <h2>Information collected automatically</h2>
          <p>
            Our web server records standard technical information such as IP address, browser type and the
            pages requested, for security and troubleshooting. We do not load analytics or advertising scripts
            unless you accept them; if analytics is enabled, it is described here and you can decline.
          </p>
          <h2>Cookies</h2>
          <p>
            The site does not set cookies for tracking. If analytics is enabled and you consent, the analytics
            provider sets its own cookies, which you can clear at any time.
          </p>
          <h2>Sharing</h2>
          <p>
            We do not sell personal information. We share it only with service providers that help us run the
            site and respond to inquiries (for example, website hosting, form processing and email delivery),
            under terms that restrict their use of it.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask what information we hold about you, ask us to correct it, or ask us to delete it, by
            emailing <Placeholder value={site.contact.salesEmail} label="email" />. California residents have
            additional rights under the California Consumer Privacy Act; the same address handles those
            requests.
          </p>
          <h2>Changes</h2>
          <p>We will post any changes to this policy on this page with a new revision date.</p>
          <p className="text-sm text-ink-muted">Revision: 20 October 2026.</p>
        </div>
      </Section>
    </>
  );
}
