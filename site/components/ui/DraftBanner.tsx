/** Shown on any page built from draft content. Never rendered in production because drafts are not built there. */
export function DraftBanner({ what = 'This page' }: { what?: string }) {
  return (
    <div role="status" className="border-b border-draft bg-draft-tint text-draft">
      <div className="site-container py-2 text-sm font-medium">
        DRAFT — {what} has not been reviewed and approved by the owner. It is visible in development only and
        is not included in production builds.
      </div>
    </div>
  );
}
