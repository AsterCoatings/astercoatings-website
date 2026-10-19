import { permanentRedirect } from 'next/navigation';

/** Retired route (2026-10-16): the brief resin-era 'Markets' page became Industries again. Safe to delete. */
export default function MarketsRedirect() {
  permanentRedirect('/industries');
}
