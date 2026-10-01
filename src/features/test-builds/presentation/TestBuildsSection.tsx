import { getTestBuildSectionApps } from '@/features/test-builds/data/test-builds';

import { TestBuildAppCard } from './TestBuildAppCard';
import { IosNotice, TestBuildDeviceProvider } from './TestBuildDevice';

/**
 * Public, server-rendered Client test builds section for `/about`.
 * Absent (renders null) when no visible app has a release, leaving About
 * otherwise unchanged.
 */
export function TestBuildsSection() {
  const apps = getTestBuildSectionApps();
  if (apps.length === 0) return null;

  return (
    <section
      id="test-builds"
      aria-labelledby="test-builds-heading"
      className="scroll-mt-24 border-b border-[var(--line-16)] bg-[var(--surface-bg)]"
    >
      <TestBuildDeviceProvider>
        <div className="site-container grid gap-8 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-28">
          <div>
            <p className="eyebrow">Client test builds</p>
            <h2 id="test-builds-heading" className="display-section mt-5 max-w-[10ch] scroll-mt-24">
              Test builds for app owners.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[0.95rem] leading-7 text-[var(--text-muted)]">
              If Nabi is building an app for you, you’ll find its latest test
              build here for Android, Windows, macOS, and Linux — with install
              steps for each file type. iOS builds aren’t distributed here.
            </p>
            <IosNotice />
          </div>

          <div className="min-w-0">
            {apps.length > 1 ? (
              <nav aria-label="Client test builds" className="mb-6">
                <ul className="flex flex-wrap gap-2">
                  {apps.map((app) => (
                    <li key={app.slug}>
                      <a
                        href={`#build-${app.slug}`}
                        className="inline-flex min-h-11 items-center rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] px-4 py-2 text-sm font-medium text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none"
                      >
                        {app.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <div className="grid gap-6">
              {apps.map((app) => (
                <TestBuildAppCard key={app.slug} app={app} />
              ))}
            </div>
          </div>
        </div>
      </TestBuildDeviceProvider>
    </section>
  );
}
