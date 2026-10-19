import type { NextConfig } from 'next';
import { site } from './content/site.config';

/**
 * Security headers. CSP note: Next.js emits inline bootstrap scripts, so a strict hash-based
 * script-src requires generating hashes at build time. Until that step is added (tracked in
 * docs/progress), script-src permits 'unsafe-inline' for same-origin only. All other directives are strict.
 */
const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
const isDev = process.env.NODE_ENV === 'development';
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  // React's development tooling (source-mapped call stacks, fast refresh) uses eval(); production never does.
  ...(isDev ? ["'unsafe-eval'"] : []),
  ...(analyticsEnabled ? ['https://www.googletagmanager.com'] : []),
];
const connectSrc = [
  "'self'",
  ...(analyticsEnabled ? ['https://www.google-analytics.com', 'https://region1.google-analytics.com'] : []),
];

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src ${connectSrc.join(' ')}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'X-Frame-Options', value: 'DENY' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Site photos carry a content-hash query (`/images/<key>.jpg?v=…`) so swapped files are never
    // served stale from the image or browser cache. Allow that query on local images only.
    localPatterns: [{ pathname: '/images/**', search: '' }, { pathname: '/images/**' }],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // Every other hostname the company owns (www., asterpaint.net) sends visitors to the canonical
  // domain with a permanent redirect, path intact. The host also does this at the DNS/edge level once
  // the domains are attached; this is the belt to that pair of braces.
  async redirects() {
    return site.urls.redirectHosts.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host' as const, value: host }],
      destination: `https://${site.urls.canonicalHost}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
