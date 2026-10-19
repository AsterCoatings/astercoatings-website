'use client';

import { useEffect } from 'react';

/**
 * Mirrors scroll position onto <html data-scrolled> so CSS can tighten the sticky header after the
 * first few pixels of scroll. rAF-throttled, passive listener, no React state (nothing re-renders).
 */
export function ScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;
    const update = () => {
      ticking = false;
      if (window.scrollY > 24) root.setAttribute('data-scrolled', '');
      else root.removeAttribute('data-scrolled');
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}
