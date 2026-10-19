import { showDrafts } from '@/lib/content';
import type { Spec } from '@/lib/content/schema';

/**
 * Renders a specification table. Rows with state 'unknown' are shown only when drafts are visible
 * (development), labelled "Not specified", so that missing data is never presented as a value.
 */
export function SpecTable({ specs, caption }: { specs: Spec[]; caption: string }) {
  const rows = specs.filter((s) => s.state !== 'unknown' || showDrafts);
  if (rows.length === 0) return null;
  const hasMethod = rows.some((r) => r.method);
  return (
    <div className="overflow-x-auto">
      <table className="spec-table w-full text-sm md:text-base">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Value</th>
            {hasMethod ? <th scope="col">Test method</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.key}>
              <th scope="row">{s.label}</th>
              <td>
                <SpecValue spec={s} />
                {s.note ? <span className="block text-xs text-ink-muted">{s.note}</span> : null}
              </td>
              {hasMethod ? <td className="text-ink-muted">{s.method ?? ''}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SpecValue({ spec }: { spec: Spec }) {
  switch (spec.state) {
    case 'value':
      return (
        <span>
          {spec.value}
          {spec.unit ? ` ${spec.unit}` : ''}
        </span>
      );
    case 'confirmed-zero':
      return <span>0{spec.unit ? ` ${spec.unit}` : ''}</span>;
    case 'not-applicable':
      return <abbr title="Not applicable">N/A</abbr>;
    case 'unknown':
      return (
        <span className="rounded-xs bg-draft-tint px-1.5 py-0.5 font-mono text-xs text-draft">
          Not specified
        </span>
      );
  }
}
