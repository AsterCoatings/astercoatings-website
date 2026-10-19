import type { Doc } from '@/lib/content';

function formatSize(bytes: number | null) {
  if (bytes === null) return null;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentList({ docs, heading = 'Documents' }: { docs: Doc[]; heading?: string }) {
  if (docs.length === 0) return null;
  return (
    <section aria-labelledby="docs-heading">
      <h2 id="docs-heading" className="text-xl">
        {heading}
      </h2>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {docs.map((d) => {
          const ready = d.approved && d.public && d.status === 'published';
          return (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <span className="mr-2 inline-block rounded-xs bg-steel px-1.5 py-0.5 text-xs font-bold tracking-wide">
                  {d.type}
                </span>
                <span className="font-semibold text-ink">{d.title}</span>
                <span className="block text-sm text-ink-muted">
                  Rev. {d.revision} · {d.revisedAt}
                  {formatSize(d.sizeBytes) ? ` · PDF, ${formatSize(d.sizeBytes)}` : ' · PDF'}
                </span>
              </div>
              {ready ? (
                <a
                  href={d.file}
                  download
                  className="btn btn-secondary min-h-10 py-1.5 text-sm"
                  data-track="document_download"
                  data-doc={d.id}
                >
                  Download
                </a>
              ) : (
                <span className="rounded-xs bg-draft-tint px-2 py-1 font-mono text-xs text-draft">
                  not approved for download
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
