'use client';

import { useState } from 'react';

/**
 * PRESENTATION — contact email control.
 * Job: copy the address, with the mail client as the fallback.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={copy}
        className="group inline-flex min-h-11 cursor-pointer items-center gap-3 text-left"
      >
        <span className="font-mono text-sm text-[var(--text-strong)] sm:text-base">$ {email}</span>
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]">
          {copied ? 'copied' : 'copy'}
        </span>
      </button>
      <a
        href={`mailto:${email}`}
        className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--accent)]"
      >
        Open mail ↗
      </a>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email copied' : ''}
      </span>
    </div>
  );
}
