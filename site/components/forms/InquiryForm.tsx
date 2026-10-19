'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { fieldErrors, schemas, type InquiryType } from '@/lib/forms/schemas';
import { Checkbox, ErrorSummary, Field } from './fields';

interface Props {
  type: InquiryType;
  labels: Record<string, string>;
  /** Field groups (client components) read errors and the pre-filled product through useInquiryForm(). */
  children: ReactNode;
  productNames?: Record<string, string>;
  submitLabel?: string;
}

const FormContext = createContext<{ errors: Record<string, string>; productId: string }>({
  errors: {},
  productId: '',
});
export const useInquiryForm = () => useContext(FormContext);

const paths: Record<InquiryType, string> = {
  quote: '/request-a-quote',
  sample: '/request-a-sample',
  technical: '/technical-inquiry',
  contact: '/contact',
};

/**
 * Progressive-enhancement form. Without JavaScript it posts as a normal form to the API route,
 * which redirects to the thank-you page. With JavaScript it validates locally, posts JSON and
 * shows errors inline without a page reload.
 */
export function InquiryForm({ type, labels, children, productNames = {}, submitLabel = 'Send' }: Props) {
  const router = useRouter();
  const search = useSearchParams();
  const productId = search.get('product') ?? '';
  const serverError = search.get('error');
  const [errors, setErrors] = useState<Record<string, string>>(serverError ? { _form: serverError } : {});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'failed'>('idle');
  const [fallback, setFallback] = useState<{ phone: string | null; email: string | null } | null>(null);
  const idemRef = useRef<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tsRef = useRef<HTMLInputElement>(null);
  const landingRef = useRef<HTMLInputElement>(null);
  const referrerRef = useRef<HTMLInputElement>(null);
  const utmRef = useRef<HTMLInputElement>(null);

  // Hidden anti-abuse and attribution values are written straight into the DOM and never passed as props:
  // a hidden input's .value mirrors its attribute, so a React re-render with defaultValue would reset it.
  useEffect(() => {
    if (tsRef.current) tsRef.current.value = String(Date.now());
    try {
      const landing = sessionStorage.getItem('aster_landing') ?? location.pathname + location.search;
      sessionStorage.setItem('aster_landing', landing);
      const utm = [...new URLSearchParams(location.search).entries()]
        .filter(([k]) => k.startsWith('utm_'))
        .map(([k, v]) => `${k}=${v}`)
        .join('&');
      if (landingRef.current) landingRef.current.value = landing.slice(0, 500);
      if (referrerRef.current) referrerRef.current.value = document.referrer.slice(0, 500);
      if (utmRef.current) utmRef.current.value = utm.slice(0, 500);
    } catch {
      /* storage unavailable; attribution stays empty */
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length > 0)
      summaryRef.current?.querySelector<HTMLElement>('#error-summary')?.focus();
  }, [errors]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw: Record<string, unknown> = {};
    for (const [k, v] of fd.entries()) if (typeof v === 'string') raw[k] = v;
    const parsed = schemas[type].safeParse(raw);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setStatus('submitting');
    idemRef.current ??=
      typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now());
    try {
      const res = await fetch(`/api/inquiries/${type}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          'idempotency-key': idemRef.current,
        },
        body: JSON.stringify(raw),
      });
      const body = (await res.json()) as {
        ok: boolean;
        errors?: Record<string, string>;
        fallback?: { phone: string | null; email: string | null };
      };
      if (res.ok && body.ok) {
        router.push(`${paths[type]}/thank-you`);
        return;
      }
      setErrors(body.errors ?? { _form: 'Something went wrong. Please try again.' });
      if (body.fallback) setFallback(body.fallback);
      setStatus(res.status >= 500 ? 'failed' : 'idle');
    } catch {
      setErrors({ _form: 'We could not reach the server. Check your connection and try again, or call us.' });
      setStatus('failed');
    }
  }

  return (
    <form
      ref={formRef}
      method="post"
      action={`/api/inquiries/${type}`}
      onSubmit={onSubmit}
      noValidate
      className="grid gap-8"
      aria-describedby="form-status"
    >
      <div ref={summaryRef}>
        <ErrorSummary errors={errors} labels={labels} />
      </div>
      {fallback ? (
        <p className="rounded-sm bg-surface-alt p-4 text-sm">
          You can reach us directly{fallback.phone ? ` by phone at ${fallback.phone}` : ''}
          {fallback.email ? `${fallback.phone ? ' or' : ''} by email at ${fallback.email}` : ''}.
        </p>
      ) : null}

      {productId && productNames[productId] ? (
        <p className="rounded-sm border border-line bg-surface-alt px-4 py-3 text-sm">
          About: <strong>{productNames[productId]}</strong>{' '}
          <Link href={paths[type]} className="ml-2 text-ink-muted">
            (change)
          </Link>
        </p>
      ) : null}

      <FormContext.Provider value={{ errors, productId }}>{children}</FormContext.Provider>

      <fieldset className="border-t-2 border-ink pt-5">
        <legend className="pr-3 text-lg font-bold">Your details</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field name="name" label="Name" required autoComplete="name" error={errors.name} />
          <Field name="company" label="Company" required autoComplete="organization" error={errors.company} />
          <Field
            name="email"
            label="Work email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            error={errors.email}
          />
          <Field
            name="phone"
            label="Phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            error={errors.phone}
          />
        </div>
        <div className="mt-5">
          <Checkbox
            name="consent"
            required
            error={errors.consent}
            label={
              <>
                I have read the <Link href="/privacy">privacy policy</Link> and agree that{' '}
                {`Aster Industrial Coatings`} may contact me about this inquiry.
              </>
            }
          />
        </div>
      </fieldset>

      {/* Anti-abuse and attribution (hidden) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name="ts" ref={tsRef} />
      <input type="hidden" name="productId" value={productId} readOnly />
      <input type="hidden" name="landingPage" ref={landingRef} />
      <input type="hidden" name="referrer" ref={referrerRef} />
      <input type="hidden" name="utm" ref={utmRef} />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'submitting'}
          aria-disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : submitLabel}
        </button>
        <p id="form-status" role="status" aria-live="polite" className="text-sm text-ink-muted">
          {status === 'submitting' ? 'Sending your request.' : status === 'failed' ? 'Not sent.' : ''}
        </p>
      </div>
    </form>
  );
}
