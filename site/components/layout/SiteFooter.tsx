import Link from 'next/link';
import { site } from '@/content/site.config';
import { footerNav } from '@/content/navigation';
import { Logo } from '@/components/brand/Logo';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const a = site.contact.address;
  const legalName = site.legal.entityName ?? site.brand.name;
  return (
    <footer className="mt-auto border-t border-white/10 bg-ink text-white/85">
      <div className="site-container grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo className="h-12 w-auto text-white" />
          {site.contact.publishAddress && a ? (
            <address className="mt-4 text-sm not-italic leading-relaxed">
              {a.street}
              <br />
              {a.city}, {a.region} {a.postalCode}
            </address>
          ) : null}
          {site.contact.salesPhone || site.contact.salesEmail ? (
            <p className="mt-3 text-sm leading-relaxed">
              {site.contact.salesPhone ? (
                <a
                  href={`tel:${site.contact.salesPhone.replace(/[^\d+]/g, '')}`}
                  className="text-white no-underline hover:underline"
                >
                  {site.contact.salesPhone}
                </a>
              ) : null}
              {site.contact.salesPhone && site.contact.salesEmail ? <br /> : null}
              {site.contact.salesEmail ? (
                <a
                  href={`mailto:${site.contact.salesEmail}`}
                  className="text-white no-underline hover:underline"
                >
                  {site.contact.salesEmail}
                </a>
              ) : null}
            </p>
          ) : null}
          {site.contact.hours ? <p className="mt-3 text-sm text-white/70">{site.contact.hours}</p> : null}
        </div>
        <FooterColumn heading="Browse" links={footerNav.browse} />
        <FooterColumn heading="Company" links={footerNav.company} />
        <FooterColumn heading="Legal" links={footerNav.legal} />
      </div>
      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-2 py-5 text-xs text-white/60 md:flex-row md:justify-between">
          <p>
            © {year} {legalName}
            {site.brand.legalSuffix ? ` ${site.brand.legalSuffix}` : ''}. All rights reserved.
          </p>
          <p>Serving customers in the United States.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={heading}>
      <h2 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-white/60">{heading}</h2>
      <ul className="mt-3 space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-block py-1 text-sm text-white/85 no-underline hover:text-white hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
