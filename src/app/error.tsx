'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--page-bg)] px-5 pt-[72px] text-[var(--text-strong)]">
      <div className="w-full max-w-[680px] py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]">Unexpected error</p>
        <h1 className="display-page mt-6">Something failed to render.</h1>
        <p className="mx-auto mt-6 max-w-[48ch] text-base leading-7 text-[var(--text-muted)]">Try the request again. Your saved theme and course progress will not be affected.</p>
        <button type="button" onClick={reset} className="button-primary mt-9 cursor-pointer border-0">Try again</button>
      </div>
    </main>
  );
}
