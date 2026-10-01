'use client';

import { useId, useState } from 'react';

/**
 * Small client island: copies `text` to the clipboard.
 * Missing/denied Clipboard API degrades gracefully — the source text stays
 * selectable and the failure is announced. Success is announced once through
 * a polite live region.
 */
export function CopyButton({
  text,
  label,
  small = false,
}: {
  text: string;
  label: string;
  small?: boolean;
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const liveId = useId();

  async function onCopy() {
    try {
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard?.writeText
      ) {
        await navigator.clipboard.writeText(text);
        setStatus('copied');
      } else {
        throw new Error('clipboard unavailable');
      }
    } catch {
      setStatus('failed');
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={onCopy}
        aria-label={label}
        aria-describedby={liveId}
        className={[
          'inline-flex items-center justify-center rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] font-mono uppercase tracking-[0.1em] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-strong)] motion-reduce:transition-none',
          small
            ? 'min-h-11 min-w-11 px-3 py-2 text-[0.65rem]'
            : 'min-h-11 px-4 py-2 text-[0.68rem]',
        ].join(' ')}
      >
        {status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}
      </button>
      <span id={liveId} role="status" aria-live="polite" className="sr-only">
        {status === 'copied'
          ? 'Copied to clipboard.'
          : status === 'failed'
            ? 'Copy failed. The text remains selectable so you can copy it manually.'
            : ''}
      </span>
    </span>
  );
}
