import { isProduction } from '@/content/site.config';

/**
 * Renders a value from config, or — when the value is null — a visible development placeholder.
 * In production, null renders nothing. This is how unset facts never become public claims.
 */
export function Placeholder({
  value,
  label,
  as: Tag = 'span',
}: {
  value: string | null;
  label: string;
  as?: 'span' | 'p' | 'div';
}) {
  if (value) return <Tag>{value}</Tag>;
  if (isProduction) return null;
  return (
    <Tag
      className="inline-block rounded-xs bg-draft-tint px-1.5 py-0.5 font-mono text-xs text-draft"
      title="Not yet supplied by the owner; omitted in production"
    >
      [{label.toUpperCase()} NOT SET]
    </Tag>
  );
}

/** Marks copy that has not been approved yet (development only). */
export function CopyFlag({ needsApproval }: { needsApproval: boolean }) {
  if (!needsApproval || isProduction) return null;
  return (
    <span
      className="ml-2 inline-block rounded-xs bg-draft-tint px-1.5 py-0.5 align-middle font-mono text-xs font-normal tracking-normal text-draft"
      title="Copy not yet approved by the owner; a neutral fallback is used in production"
    >
      [OWNER COPY NEEDED]
    </span>
  );
}
