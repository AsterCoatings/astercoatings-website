import { permanentRedirect } from 'next/navigation';

/** Retired 2026-10-19 (owner): application methods belong on product pages and in the quote form. Safe to delete. */
export default function ApplicationsRedirect() {
  permanentRedirect('/industries');
}
