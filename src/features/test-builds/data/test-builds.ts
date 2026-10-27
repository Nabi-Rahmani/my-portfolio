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
        version: '1.1.2.1',
        releasedAt: '2026-10-27',
        changes: [
          'Perkon TSPL prints black on white, not a fully dark negative.',
          'A recognized printer fills in its language, resolution, and widest label.',
        ],
        artifacts: [
          {
            platform: 'windows',
            format: 'exe',
            arch: 'x64',
            url: '/test-builds/LabelStudio-prod-1.1.2.1-setup.exe',
            fileName: 'LabelStudio-prod-1.1.2.1-setup.exe',
            sizeBytes: 14188626,
            sha256:
              '9d740ca838a76f3e59203c59024dbf4bd697ca99ad2ca04d7f7f33360e934d69',
          },
        ],
      },
      {
        version: '1.1.1.1',
        releasedAt: '2026-10-26',
        changes: [
          'The Perkon PR-470B is recognized and prints the whole label in TSPL.',
          'A label that does not fit the page fails before anything is sent.',
          'The Zebra TLP 2844 shows Printer ready when Windows reports it ready.',
        ],
        artifacts: [
          {
            platform: 'windows',
            format: 'exe',
            arch: 'x64',
            url: '/test-builds/LabelStudio-prod-1.1.1.1-setup.exe',
            fileName: 'LabelStudio-prod-1.1.1.1-setup.exe',
            sizeBytes: 14186782,
            sha256:
              '83a4bdc13f6ba1f07a8a5356a6fbe5b85cfa3e425a945c89c60a066adbc0fa6e',
          },
        ],
      },
      {
        version: '1.1.0.2',
        releasedAt: '2026-10-15',
        changes: [
          'New Full details label: TETT date, allergen badge, and storage line.',
          'Row or Column label design and any custom label size when printing.',
          'Portrait labels laid out top to bottom at a readable size.',
          'Printer-style label preview on the Print screen.',
        ],
        artifacts: [
          {
            platform: 'windows',
            format: 'exe',
            arch: 'x64',
            url: '/test-builds/LabelStudio-prod-1.1.0.2-setup.exe',
            fileName: 'LabelStudio-prod-1.1.0.2-setup.exe',
            sizeBytes: 14132617,
            sha256:
              '1d8083cfd46954e6c60ed32483eecdd6827c9ab904d932c557a6d976664dd18c',
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
