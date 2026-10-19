'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Gentle parallax for a photo inside a clipped frame: the child is scaled up slightly and moved by
 * at most ±`amount` px as the frame travels through the viewport. Transform only, rAF-throttled,
 * observed only while on screen, and disabled entirely under prefers-reduced-motion.
 */
export function ParallaxFrame({
  children,
  amount = 18,
  className = '',
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = false;
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!visible) return;
      const r = frame.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 when the frame's centre is at the bottom of the viewport, +1 at the top.
      const t = Math.max(-1, Math.min(1, 1 - (2 * (r.top + r.height / 2)) / vh));
      inner.style.transform = `translate3d(0, ${(-t * amount).toFixed(1)}px, 0) scale(1.08)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) onScroll();
    });
    io.observe(frame);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [amount]);

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      <div ref={innerRef} className="parallax-inner absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
