'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--ink)] flex items-center justify-center px-6">
      <div className="text-center max-w-[480px]">
        <span className="text-[4rem] md:text-[5rem] font-bold text-[var(--atelier-accent)] leading-none block mb-4">
          Oops
        </span>

        <h1
          className="text-[1.5rem] md:text-[2rem] font-bold tracking-tight mb-3"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Something went wrong
        </h1>

        <p className="text-[0.9375rem] md:text-[1rem] text-[var(--muted)] leading-relaxed mb-8">
          An unexpected error occurred. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ink)] text-[var(--cream)] rounded-full text-[0.9375rem] font-semibold cursor-pointer border-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
