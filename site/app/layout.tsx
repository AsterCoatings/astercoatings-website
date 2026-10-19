import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { site } from '@/content/site.config';
import { PageTransition } from '@/components/ui/PageTransition';
import { ScrollState } from '@/components/ui/ScrollState';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationJsonLd } from '@/lib/seo/metadata';

/**
 * Self-hosted fonts (SIL Open Font License; licences in app/fonts/). No build-time or runtime third-party request.
 *
 * Display face: the Eurostile direction chosen by the owner on 2026-10-16. Michroma (free) stands in until the
 * licensed Mirano family is purchased; to switch, replace the `display` src entries with the Mirano woff2 files
 * and weights — nothing else in the site refers to the family by name.
 * Text face: Barlow, for paragraphs, tables, navigation and controls.
 */
const display = localFont({
  src: [{ path: './fonts/michroma-latin-400-normal.woff2', weight: '400', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Eurostile', 'Bank Gothic', 'Arial', 'sans-serif'],
  adjustFontFallback: false,
});
const text = localFont({
  src: [
    { path: './fonts/barlow-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/barlow-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/barlow-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/barlow-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-text',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.urls.site),
  title: { default: site.brand.name, template: `%s | ${site.brand.name}` },
  description: site.brand.description ?? 'Industrial coatings for fabricated metal.',
};

export const viewport: Viewport = { themeColor: '#14181f', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body>
        <a href="#main" className="skip-link rounded-xs bg-accent px-4 py-2 font-semibold text-white">
          Skip to main content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <PageTransition>{children}</PageTransition>
        </main>
        <ScrollState />
        <SiteFooter />
      </body>
    </html>
  );
}
