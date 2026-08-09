import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--page-bg)] px-5 pt-[72px] text-[var(--text-strong)]">
      <div className="w-full max-w-[720px] py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]">404 · Route not found</p>
        <h1 className="display-page mt-6">This page has left the release.</h1>
        <p className="mx-auto mt-6 max-w-[52ch] text-base leading-7 text-[var(--text-muted)]">
          The address may have changed, but the shipped work and production notes are still here.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="button-primary">Return home</Link>
          <Link href="/blog" className="button-secondary">Browse writing</Link>
        </div>
      </div>
    </main>
  );
}
