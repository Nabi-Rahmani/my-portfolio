/**
 * PRESENTATION — reading-time chip.
 * Job: display minutes already computed in blog data.
 */
export function ReadTimeVisual({ minutes }: { minutes: number }) {
  return (
    <div className="flex items-center gap-2 text-[0.8125rem] text-[var(--muted)]">
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        className="text-[var(--atelier-accent)]"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {minutes} min read
    </div>
  );
}
