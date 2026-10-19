'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Route transition: the main content remounts on every pathname change, which replays the
 * `.page-enter` animation (fade + 12 px rise, 420 ms). Pure CSS, no layout shift, and the global
 * reduced-motion rule zeroes it. Keying on the pathname is all that is needed — Next keeps scroll
 * restoration and focus handling as before.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
