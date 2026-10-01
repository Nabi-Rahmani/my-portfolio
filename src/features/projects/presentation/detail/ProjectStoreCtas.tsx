import type { ReactNode } from 'react';

/**
 * PRESENTATION — valid store/GitHub actions.
 * Job: render only URLs already validated by `lib/links`.
 */
export function ProjectStoreCtas({
  playStoreUrl,
  appStoreUrl,
  githubUrl,
  extra,
}: {
  playStoreUrl?: string;
  appStoreUrl?: string;
  githubUrl?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
      {playStoreUrl && (
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none sm:w-auto"
        >
          Google Play ↗
        </a>
      )}
      {appStoreUrl && (
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none sm:w-auto"
        >
          App Store ↗
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center rounded-full border border-[var(--line-24)] px-6 text-sm font-semibold text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none sm:w-auto"
        >
          GitHub ↗
        </a>
      )}
      {extra}
    </div>
  );
}
