import Link from 'next/link';
import { site } from '@/content/site.config';
import { primaryNav } from '@/content/navigation';
import { HeaderNav } from './HeaderNav';
import { LogoCompact } from '@/components/brand/Logo';

export function SiteHeader() {
  const nav = primaryNav();
  return (
    <header className="site-header sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
      <div className="site-header-bar site-container flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xs text-white no-underline"
          aria-label={`${site.brand.name} — home`}
        >
          <LogoCompact className="h-8 w-auto lg:h-9" />
        </Link>
        <HeaderNav items={nav} phone={site.contact.salesPhone} />
      </div>
    </header>
  );
}
