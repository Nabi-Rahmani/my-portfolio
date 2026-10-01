'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { contactMailto } from '@/core/config/site';
import {
  detectPlatform,
  type DetectedPlatform,
} from '@/features/test-builds/application/detect-platform';

/** Null before hydration — server output never contains badge or notice. */
const TestBuildDeviceContext = createContext<DetectedPlatform | null>(null);

export function useDetectedPlatform(): DetectedPlatform | null {
  return useContext(TestBuildDeviceContext);
}

export function TestBuildDeviceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [platform, setPlatform] = useState<DetectedPlatform | null>(null);

  useEffect(() => {
    const userAgent =
      typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const userAgentDataPlatform =
      typeof navigator !== 'undefined'
        ? (navigator as Navigator & { userAgentData?: { platform?: string } })
            .userAgentData?.platform
        : undefined;
    const maxTouchPoints =
      typeof navigator !== 'undefined' ? navigator.maxTouchPoints : 0;
    setPlatform(detectPlatform(userAgent, userAgentDataPlatform, maxTouchPoints));
  }, []);

  return (
    <TestBuildDeviceContext.Provider value={platform}>
      {children}
    </TestBuildDeviceContext.Provider>
  );
}

/**
 * Badge for the matching platform group. Renders nothing server-side and
 * never shifts layout: it overlays the group's reserved top padding band
 * (see `PlatformGroup`), so its appearance moves no content. The group picks
 * up an accent border through `has-[[data-tb-badge]]`.
 */
export function PlatformBadge({ platform }: { platform: DetectedPlatform }) {
  const detected = useDetectedPlatform();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || detected !== platform) return null;
  return (
    <span
      data-tb-badge
      className="pointer-events-none absolute right-3 top-3 inline-flex items-center rounded-full border border-[var(--accent)] bg-[var(--surface-bg)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--text-strong)]"
    >
      Recommended for this device
    </span>
  );
}

/** iOS notice: visible only after hydration for iPhone/iPad visitors. */
export function IosNotice() {
  const detected = useDetectedPlatform();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || detected !== 'ios') return null;
  return (
    <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--line-24)] bg-[var(--surface-bg)] p-5 sm:p-6">
      <p className="text-[0.92rem] font-semibold">Using an iPhone or iPad?</p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
        iOS builds aren’t available here — Apple doesn’t allow app installs
        from a website download. The Android and desktop downloads below stay
        visible so you can forward this page to another device.
      </p>
      <a
        href={contactMailto({ subject: 'iOS test build question' })}
        className="mt-3 inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-strong)] underline underline-offset-4"
      >
        Contact Nabi about iOS testing
      </a>
    </div>
  );
}
