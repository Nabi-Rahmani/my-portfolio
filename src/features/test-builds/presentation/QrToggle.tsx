'use client';

import dynamic from 'next/dynamic';
import { useEffect, useId, useMemo, useState } from 'react';

import { useDetectedPlatform } from './TestBuildDevice';

const QrCodePanel = dynamic(() => import('./QrCodeView'), {
  ssr: false,
  loading: () => (
    <p className="font-mono text-xs text-[var(--text-muted)]">
      Preparing QR code…
    </p>
  ),
});

/**
 * Android QR handoff. Rendered only after mount on non-Android devices so
 * server output stays badge-free with no hydration mismatch. The QR library
 * chunk loads only when the toggle opens; no remote QR service is called.
 */
export function QrToggle({ artifactUrl }: { artifactUrl: string }) {
  const detected = useDetectedPlatform();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const absoluteUrl = useMemo(() => {
    if (!mounted || typeof window === 'undefined') return null;
    try {
      return new URL(artifactUrl, window.location.href).toString();
    } catch {
      return null;
    }
  }, [mounted, artifactUrl]);

  if (!mounted || detected === 'android') return null;
  if (!absoluteUrl) return null;

  return (
    <div className="mt-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center rounded-full border border-[var(--line-24)] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-strong)] motion-reduce:transition-none"
      >
        {open ? 'Hide QR code' : 'Scan to install on your phone'}
      </button>
      {open && (
        <div
          id={panelId}
          className="mt-3 motion-reduce:transition-none"
        >
          <QrCodePanel value={absoluteUrl} />
        </div>
      )}
    </div>
  );
}
