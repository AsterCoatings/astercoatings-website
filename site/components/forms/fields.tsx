import type { ReactNode } from 'react';

type Common = { name: string; label: string; error?: string; hint?: string; required?: boolean };

export function Field({
  name,
  label,
  error,
  hint,
  required,
  type = 'text',
  autoComplete,
  defaultValue,
  inputMode,
}: Common & {
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric';
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errId = error ? `${name}-error` : undefined;
  return (
    <div>
      <Label name={name} label={label} required={required} />
      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={[hintId, errId].filter(Boolean).join(' ') || undefined}
        className="field-input mt-1.5"
      />
      <FieldError id={errId} error={error} />
    </div>
  );
}

export function TextArea({
  name,
  label,
  error,
  hint,
  required,
  rows = 5,
  defaultValue,
}: Common & { rows?: number; defaultValue?: string }) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errId = error ? `${name}-error` : undefined;
  return (
    <div>
      <Label name={name} label={label} required={required} />
      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue}
        aria-required={required || undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={[hintId, errId].filter(Boolean).join(' ') || undefined}
        className="field-input mt-1.5 min-h-32"
      />
      <FieldError id={errId} error={error} />
    </div>
  );
}

export function Select({
  name,
  label,
  error,
  hint,
  required,
  options,
  defaultValue,
}: Common & { options: { value: string; label: string }[]; defaultValue?: string }) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errId = error ? `${name}-error` : undefined;
  return (
    <div>
      <Label name={name} label={label} required={required} />
      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        aria-required={required || undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={[hintId, errId].filter(Boolean).join(' ') || undefined}
        className="field-input mt-1.5"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FieldError id={errId} error={error} />
    </div>
  );
}

export function Checkbox({ name, label, error, required }: Omit<Common, 'label'> & { label: ReactNode }) {
  const errId = error ? `${name}-error` : undefined;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={name}
          name={name}
          type="checkbox"
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={errId}
          className="mt-1 h-5 w-5 shrink-0 accent-accent"
        />
        <label htmlFor={name} className="text-sm">
          {label}
        </label>
      </div>
      <FieldError id={errId} error={error} />
    </div>
  );
}

function Label({ name, label, required }: { name: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={name} className="block font-semibold">
      {label}
      {!required ? <span className="ml-1 text-sm font-normal text-ink-muted">(optional)</span> : null}
    </label>
  );
}

function FieldError({ id, error }: { id?: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-semibold text-error">
      {error}
    </p>
  );
}

export function Fieldset({
  legend,
  children,
  description,
}: {
  legend: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="border-t-2 border-ink pt-5">
      <legend className="pr-3 text-lg font-bold">{legend}</legend>
      {description ? <p className="mt-1 text-sm text-ink-muted">{description}</p> : null}
      <div className="mt-4 grid gap-5">{children}</div>
    </fieldset>
  );
}

export function ErrorSummary({
  errors,
  labels,
}: {
  errors: Record<string, string>;
  labels: Record<string, string>;
}) {
  const entries = Object.entries(errors);
  if (entries.length === 0) return null;
  return (
    <div
      role="alert"
      tabIndex={-1}
      id="error-summary"
      className="rounded-sm border-2 border-error bg-error-tint p-4"
    >
      <h2 className="text-base font-bold text-error">Please fix the following</h2>
      <ul className="mt-2 list-disc pl-5 text-sm">
        {entries.map(([k, msg]) => (
          <li key={k}>
            {k === '_form' ? (
              msg
            ) : (
              <a href={`#${k}`} className="font-semibold text-error">
                {labels[k] ?? k}: {msg}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
