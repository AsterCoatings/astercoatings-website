'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Scroll-reveal wrapper. Server HTML is fully visible (no JS = no hiding); on mount the element is
 * marked pending and an IntersectionObserver reveals it as it enters the viewport. Elements already in
 * view reveal on the next frame, so the first paint is never blank. Disabled under prefers-reduced-motion.
 *
 * `as` picks the wrapper element; `delay` staggers children (ms); `variant` picks the motion.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  variant = 'up',
}: {
  children: ReactNode;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
  className?: string;
  delay?: number;
  variant?: 'up' | 'fade' | 'scale' | 'line';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const setRef = (el: HTMLElement | null) => {
    ref.current = el;
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    el.classList.add('reveal-pending');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('reveal-in');
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={setRef}
      className={`reveal reveal-${variant} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
