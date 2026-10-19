import Link from 'next/link';
import { PageHeader, Section } from '@/components/ui/primitives';

export const metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="Page not found"
        lead="The address may have changed, or the page may not have been published yet."
      />
      <Section>
        <ul className="prose-block list-disc pl-5">
          <li>
            <Link href="/services">Our services</Link>
          </li>
          <li>
            <Link href="/industries">Industries we supply</Link>
          </li>
          <li>
            <Link href="/contact">Contact us</Link>
          </li>
        </ul>
      </Section>
    </>
  );
}
