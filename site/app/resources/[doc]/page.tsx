import { permanentRedirect } from 'next/navigation';

/** Retired 2026-10-19 with the Resources page. Safe to delete. */
export default function DocumentRedirect() {
  permanentRedirect('/');
}
