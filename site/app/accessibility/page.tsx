import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { site } from '@/content/site.config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, Section } from '@/components/ui/primitives';

export const metadata = buildMetadata({
  title: 'Accessibility statement',
  description: `Accessibility statement for the ${site.brand.name} website.`,
  path: '/accessibility',
});

export default function AccessibilityPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Accessibility' }]} />
      <PageHeader title="Accessibility statement" />
      <Section>
        <div className="prose-block text-md">
          <p>
            {site.brand.name} wants everyone to be able to use this website. We aim to conform to the Web
            Content Accessibility Guidelines (WCAG) 2.2 at level AA.
          </p>
          <h2>What we do</h2>
          <ul>
            <li>Every page can be used with a keyboard alone, and focus is always visible.</li>
            <li>
              Text meets the WCAG contrast requirements, and the site reflows at 320 px width and 200 % zoom.
            </li>
            <li>Forms label every field, describe errors in text, and work without JavaScript.</li>
            <li>Specification tables are real HTML tables with headers, not images.</li>
            <li>Animation is minimal and is disabled when your system asks for reduced motion.</li>
          </ul>
          <h2>Known limitations</h2>
          <p>
            Downloadable PDF data sheets are produced by product manufacturers and may not be fully
            accessible. If you need the content of a data sheet in another format, contact us and we will
            help.
          </p>
          <h2>Tell us about a problem</h2>
          <p>
            If any part of this site is difficult to use, tell us through the{' '}
            <Link href="/contact">contact form</Link>
            {site.contact.salesEmail ? <> or by email at {site.contact.salesEmail}</> : null}
            {site.contact.salesPhone ? <> or by phone on {site.contact.salesPhone}</> : null}. Please tell us
            the page and what went wrong.
          </p>
          <p className="text-sm text-ink-muted">This statement was last reviewed on 16 October 2026.</p>
        </div>
      </Section>
    </>
  );
}
