'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import type { NavItem } from '@/content/navigation';

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function HeaderNav({ items, phone }: { items: NavItem[]; phone: string | null }) {
  const pathname = usePathname();
  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Desktop */}
      <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
        <ul className="flex items-center gap-1">
          {items.map((item) =>
            item.children && item.children.length > 0 ? (
              <li key={item.href}>
                <Disclosure item={item} current={isCurrent(item.href)} />
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className="nav-link block rounded-xs px-3 py-2 text-sm font-semibold text-white/90 no-underline aria-[current=page]:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      {/* Mobile */}
      <MobileMenu items={items} phone={phone} isCurrent={isCurrent} />
    </>
  );
}

function Disclosure({ item, current }: { item: NavItem; current: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 rounded-xs px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 ${current ? 'underline decoration-accent decoration-2 underline-offset-8' : ''}`}
      >
        {item.label}
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          width="10"
          height="10"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute left-0 top-full mt-2 w-[32rem] rounded-sm border border-line bg-surface p-3 text-ink shadow-card"
      >
        <div className="grid grid-cols-2 gap-1">
          {item.children?.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-xs px-3 py-2 no-underline hover:bg-surface-alt"
            >
              <span className="block font-semibold">{c.label}</span>
              {c.description ? (
                <span className="mt-0.5 block text-sm text-ink-muted">{c.description}</span>
              ) : null}
            </Link>
          ))}
          <Link
            href={item.href}
            className="col-span-2 mt-1 border-t border-line px-3 pt-3 text-sm font-semibold text-accent-deep no-underline hover:underline"
          >
            All products →
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({
  items,
  phone,
  isCurrent,
}: {
  items: NavItem[];
  phone: string | null;
  isCurrent: (h: string) => boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="flex min-h-11 items-center gap-2 rounded-xs px-2 py-2 text-sm font-semibold text-white hover:bg-white/10"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
        Menu
      </button>
      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onClick={(e) =>
          (e.target === dialogRef.current || (e.target as HTMLElement).closest('a')) && setOpen(false)
        }
        className="mobile-menu m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-white backdrop:bg-black/50 open:flex open:flex-col"
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <span className="font-extrabold">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="min-h-11 rounded-xs px-3 text-sm font-semibold hover:bg-white/10"
          >
            Close
          </button>
        </div>
        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="divide-y divide-white/10">
            {items.map((item) => (
              <li key={item.href} className="py-1">
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className="block py-3 text-lg font-semibold text-white no-underline aria-[current=page]:text-accent-bright"
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 ? (
                  <ul className="mb-2 ml-3 border-l border-white/15 pl-3">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block py-2 text-white/85 no-underline">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/request-a-quote" className="btn btn-primary justify-center">
              Request a quote
            </Link>
            {phone ? (
              <a href={telHref(phone)} className="btn btn-on-dark justify-center">
                Call {phone}
              </a>
            ) : null}
          </div>
        </nav>
      </dialog>
    </div>
  );
}
