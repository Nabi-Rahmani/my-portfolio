import type {
  TestBuildApp,
  TestBuildArtifact,
  TestBuildRelease,
} from '@/features/test-builds/domain/test-build';

/**
 * Client Test Build content. Committed data must not contain fabricated apps,
 * clients, versions, or links. Local-only sample entries used during
 * development must point only to `/test-builds/` files (git-ignored, fail
 * Vercel builds by design). Shipped files must be allowlisted in `.gitignore`.
 */
export const testBuildApps: TestBuildApp[] = [
  {
    slug: 'label-studio',
    name: 'LabelStudio',
    summary:
      'Windows production installer for LabelStudio. Download and run the setup file on a Windows PC.',
    releases: [
      {
        version: '1.0.0.1',
        releasedAt: '2026-10-01',
        changes: ['Production Windows setup installer.'],
        artifacts: [
          {
            platform: 'windows',
            format: 'exe',
            url: '/test-builds/LabelStudio-prod-1.0.0.1-setup.exe',
            fileName: 'LabelStudio-prod-1.0.0.1-setup.exe',
            sizeBytes: 13755383,
          },
        ],
      },
    ],
  },
];

/** Visible apps: `hidden: true` entries stay in data but never render. */
export function getVisibleTestBuildApps(
  apps: TestBuildApp[] = testBuildApps,
): TestBuildApp[] {
  return apps.filter((app) => !app.hidden);
}

/**
 * Newest first by `releasedAt`. Equal dates keep data order (stable sort).
 * Invalid dates sort last, preserving data order among themselves.
 */
export function sortReleasesNewestFirst(
  releases: TestBuildRelease[],
): TestBuildRelease[] {
  return releases
    .map((release, index) => ({ release, index }))
    .sort((a, b) => {
      const aTime = Date.parse(a.release.releasedAt);
      const bTime = Date.parse(b.release.releasedAt);
      const aValid = !Number.isNaN(aTime);
      const bValid = !Number.isNaN(bTime);
      if (aValid && bValid) {
        if (bTime !== aTime) return bTime - aTime;
        return a.index - b.index;
      }
      if (aValid) return -1;
      if (bValid) return 1;
      return a.index - b.index;
    })
    .map((entry) => entry.release);
}

/** Releases for an app, newest first. */
export function getSortedReleases(app: TestBuildApp): TestBuildRelease[] {
  return sortReleasesNewestFirst(app.releases);
}

/** The newest release, or undefined when the app has none. */
export function getLatestRelease(
  app: TestBuildApp,
): TestBuildRelease | undefined {
  return getSortedReleases(app)[0];
}

/** Visible apps that have at least one release — the renderable section apps. */
export function getTestBuildSectionApps(
  apps: TestBuildApp[] = testBuildApps,
): TestBuildApp[] {
  return getVisibleTestBuildApps(apps).filter(
    (app) => app.releases.length > 0,
  );
}

/** Display file name: explicit `fileName`, else the URL path basename. */
export function getTestBuildDisplayFileName(
  artifact: TestBuildArtifact,
): string {
  if (artifact.fileName?.trim()) return artifact.fileName.trim();
  const path = artifact.url.split(/[?#]/, 1)[0];
  const lastSlash = path.lastIndexOf('/');
  const base = lastSlash >= 0 ? path.slice(lastSlash + 1) : path;
  try {
    return decodeURIComponent(base) || artifact.url;
  } catch {
    return base || artifact.url;
  }
}

/**
 * Deterministic absolute date ("1 Oct 2026"). Fixed `en-GB` locale in UTC so
 * server output never shifts by a day across timezones. Do not use
 * `formatDate` (en-US long form, local time) for build dates.
 */
export function formatTestBuildDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
