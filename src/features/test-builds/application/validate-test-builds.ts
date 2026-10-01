import 'server-only';

import { existsSync } from 'node:fs';
import path from 'node:path';

import { getTestBuildDisplayFileName } from '@/features/test-builds/data/test-builds';
import type {
  TestBuildApp,
  TestBuildArtifact,
} from '@/features/test-builds/domain/test-build';

export interface TestBuildValidationError {
  appSlug: string;
  releaseVersion?: string;
  /** Zero-based artifact index when the error concerns one artifact. */
  artifactIndex?: number;
  artifactLabel?: string;
  message: string;
  fix: string;
}

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SHA256 = /^[0-9a-fA-F]{64}$/;

const ALLOWED_FORMATS: Record<string, readonly string[]> = {
  android: ['apk'],
  windows: ['exe', 'msi', 'msix', 'zip'],
  macos: ['dmg', 'pkg', 'zip'],
  linux: ['appimage', 'deb', 'rpm', 'tar.gz'],
};

const ALLOWED_ARCHS: Record<string, readonly string[]> = {
  android: ['universal', 'arm64-v8a', 'armeabi-v7a', 'x86_64'],
  windows: ['x64', 'arm64'],
  macos: ['universal', 'arm64', 'x64'],
  linux: ['x64', 'arm64'],
};

/** Extension (lowercase, without dot) -> expected format. */
const KNOWN_EXTENSION_FORMAT: Record<string, string> = {
  apk: 'apk',
  exe: 'exe',
  msi: 'msi',
  msix: 'msix',
  zip: 'zip',
  dmg: 'dmg',
  pkg: 'pkg',
  appimage: 'appimage',
  deb: 'deb',
  rpm: 'rpm',
};

/** Full suffix match for `.tar.gz` is handled separately. */
const REJECTED_STORE_EXTENSIONS = new Set(['aab', 'apks', 'xapk']);

function urlPathname(url: string): string {
  const withoutQuery = url.split(/[?#]/, 1)[0];
  if (withoutQuery.startsWith('/')) return withoutQuery;
  try {
    return new URL(withoutQuery).pathname;
  } catch {
    return withoutQuery;
  }
}

function extensionOf(pathname: string): string | null {
  const lower = pathname.toLowerCase();
  if (lower.endsWith('.tar.gz')) return 'tar.gz';
  const base = lower.slice(lower.lastIndexOf('/') + 1);
  if (!base || !base.includes('.')) return null;
  return base.slice(base.lastIndexOf('.') + 1) || null;
}

function artifactLabel(
  artifact: TestBuildArtifact,
  index: number,
): string {
  try {
    const name = getTestBuildDisplayFileName(artifact);
    return name ? `#${index} (${name})` : `#${index}`;
  } catch {
    return `#${index}`;
  }
}

function isRelativeTestBuildsUrl(url: string): boolean {
  return url.startsWith('/test-builds/');
}

function isAbsoluteHttpsUrl(url: string): boolean {
  if (!/^https:\/\//i.test(url)) return false;
  try {
    return new URL(url).protocol.toLowerCase() === 'https:';
  } catch {
    return false;
  }
}

function relativeFileExists(url: string): boolean {
  const pathname = urlPathname(url);
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // Use the raw pathname when it is not valid percent-encoding.
  }
  const relative = decoded.replace(/^\/test-builds\//, '');
  if (!relative || relative.endsWith('/')) return false;
  const full = path.join(process.cwd(), 'public', 'test-builds', relative);
  return existsSync(full);
}

/**
 * Pure (except for the local-file existence check) server-only validator.
 * Returns structured errors for every rule in Spec Requirement 34. Never
 * import this module — or `fs` — from client components.
 */
export function validateTestBuilds(
  apps: TestBuildApp[],
): TestBuildValidationError[] {
  const errors: TestBuildValidationError[] = [];
  const push = (error: TestBuildValidationError) => {
    errors.push(error);
  };

  const seenSlugs = new Map<string, number>();
  apps.forEach((app, appIndex) => {
    const slugForMessage =
      typeof app.slug === 'string' && app.slug ? app.slug : `#${appIndex}`;
    if (seenSlugs.has(app.slug)) {
      push({
        appSlug: slugForMessage,
        message: `Test build app slug "${app.slug}" is duplicated (first seen at index ${seenSlugs.get(app.slug)}).`,
        fix: `Give each app a unique kebab-case slug, e.g. "acme-delivery" instead of reusing "${app.slug}".`,
      });
    } else if (typeof app.slug === 'string') {
      seenSlugs.set(app.slug, appIndex);
    }

    if (typeof app.slug !== 'string' || !KEBAB_CASE.test(app.slug)) {
      push({
        appSlug: slugForMessage,
        message: `Test build app slug "${String(app.slug)}" is not kebab-case.`,
        fix: 'Use a unique kebab-case slug with lowercase letters, numbers, and hyphens, e.g. "acme-delivery".',
      });
    }
    if (typeof app.name !== 'string' || !app.name.trim()) {
      push({
        appSlug: slugForMessage,
        message: `Test build app "${slugForMessage}" has an empty name.`,
        fix: 'Set a non-empty `name` for the app, e.g. the product name the App Owner recognizes.',
      });
    }
    if (!Array.isArray(app.releases) || app.releases.length === 0) {
      push({
        appSlug: slugForMessage,
        message: `Test build app "${slugForMessage}" has no releases.`,
        fix: 'Add at least one release with a version, ISO `releasedAt`, non-empty `changes`, and one artifact — or remove the app.',
      });
      return;
    }

    app.releases.forEach((release, releaseIndex) => {
      const versionForMessage =
        typeof release.version === 'string' && release.version
          ? release.version
          : `#${releaseIndex}`;
      const releaseCtx = {
        appSlug: slugForMessage,
        releaseVersion: versionForMessage,
      };

      if (typeof release.version !== 'string' || !release.version.trim()) {
        push({
          ...releaseCtx,
          message: `Test build app "${slugForMessage}" release #${releaseIndex} has an empty version.`,
          fix: 'Set a non-empty free-form `version`, e.g. "1.4.0".',
        });
      }
      if (
        typeof release.releasedAt !== 'string' ||
        Number.isNaN(Date.parse(release.releasedAt))
      ) {
        push({
          ...releaseCtx,
          message: `Test build app "${slugForMessage}" version "${versionForMessage}" has an invalid ISO releasedAt (${JSON.stringify(release.releasedAt)}).`,
          fix: 'Use a valid ISO date, e.g. "2026-10-01" or "2026-10-01T00:00:00.000Z".',
        });
      }
      if (
        !Array.isArray(release.changes) ||
        release.changes.length === 0 ||
        release.changes.some(
          (change) => typeof change !== 'string' || !change.trim(),
        )
      ) {
        push({
          ...releaseCtx,
          message: `Test build app "${slugForMessage}" version "${versionForMessage}" has empty changes.`,
          fix: 'List at least one non-empty entry in `changes` describing what is in this build.',
        });
      }
      if (
        release.knownIssues !== undefined &&
        (!Array.isArray(release.knownIssues) ||
          release.knownIssues.some(
            (issue) => typeof issue !== 'string' || !issue.trim(),
          ))
      ) {
        push({
          ...releaseCtx,
          message: `Test build app "${slugForMessage}" version "${versionForMessage}" has an empty known-issues entry.`,
          fix: 'Remove empty strings from `knownIssues` or omit the field when there are none.',
        });
      }
      if (
        !Array.isArray(release.artifacts) ||
        release.artifacts.length === 0
      ) {
        push({
          ...releaseCtx,
          message: `Test build app "${slugForMessage}" version "${versionForMessage}" has no artifacts.`,
          fix: 'Add at least one artifact with a platform, format, and `https://` or `/test-builds/` URL.',
        });
        return;
      }

      release.artifacts.forEach((artifact, artifactIndex) => {
        const label = artifactLabel(artifact, artifactIndex);
        const ctx = {
          ...releaseCtx,
          artifactIndex,
          artifactLabel: label,
        };
        const where = `app "${slugForMessage}" version "${versionForMessage}" artifact ${label}`;

        const platform = (artifact as { platform?: unknown }).platform;
        if (
          platform !== 'android' &&
          platform !== 'windows' &&
          platform !== 'macos' &&
          platform !== 'linux'
        ) {
          push({
            ...ctx,
            message: `Test build ${where} has unsupported platform ${JSON.stringify(platform)}. iOS cannot be distributed by download.`,
            fix: 'Use one of "android", "windows", "macos", or "linux". Do not list iOS builds here.',
          });
          return;
        }

        const allowedFormats = ALLOWED_FORMATS[platform];
        const format = (artifact as { format?: unknown }).format;
        if (
          typeof format !== 'string' ||
          !allowedFormats.includes(format.toLowerCase())
        ) {
          push({
            ...ctx,
            message: `Test build ${where} has format ${JSON.stringify(format)} which is not allowed for platform "${platform}" (allowed: ${allowedFormats.map((f) => `"${f}"`).join(', ')}).`,
            fix: `Use an allowed format for ${platform}: ${allowedFormats.join(', ')}.`,
          });
        }

        const arch = (artifact as { arch?: unknown }).arch;
        if (arch !== undefined) {
          const allowedArchs = ALLOWED_ARCHS[platform];
          if (typeof arch !== 'string' || !allowedArchs.includes(arch)) {
            push({
              ...ctx,
              message: `Test build ${where} has architecture ${JSON.stringify(arch)} which is not allowed for platform "${platform}" (allowed: ${allowedArchs.map((a) => `"${a}"`).join(', ')}).`,
              fix: `Use an allowed architecture for ${platform} (${allowedArchs.join(', ')}) or omit \`arch\`.`,
            });
          }
        }

        const url = (artifact as { url?: unknown }).url;
        if (typeof url !== 'string' || !url) {
          push({
            ...ctx,
            message: `Test build ${where} has a missing URL.`,
            fix: 'Set `url` to an absolute `https://` URL or a relative `/test-builds/<file>` path.',
          });
          return;
        }

        const pathname = urlPathname(url);
        const lowerPath = pathname.toLowerCase();
        const ext = extensionOf(pathname);

        if (lowerPath.endsWith('.ipa')) {
          push({
            ...ctx,
            message: `Test build ${where} points at an .ipa file ("${url}"). iOS builds cannot be installed from a website download.`,
            fix: 'Remove the iOS artifact. iOS builds are not distributed here.',
          });
          return;
        }
        if (ext !== null && REJECTED_STORE_EXTENSIONS.has(ext)) {
          push({
            ...ctx,
            message: `Test build ${where} points at a .${ext} file ("${url}"), which a browser download cannot install.`,
            fix: 'Build an APK instead, e.g. `flutter build apk --release`, and link the `.apk` file.',
          });
          return;
        }

        const relative = isRelativeTestBuildsUrl(url);
        const absoluteHttps = isAbsoluteHttpsUrl(url);
        if (!relative && !absoluteHttps) {
          push({
            ...ctx,
            message: `Test build ${where} has URL "${url}" which is neither an absolute https:// URL nor a /test-builds/ path.`,
            fix: 'Use an absolute `https://` URL for hosted files, or `/test-builds/<file>` for a git-ignored local file under `public/test-builds/`. `http://`, `file:`, and `data:` URLs are rejected.',
          });
          return;
        }

        if (ext !== null) {
          const expected =
            ext === 'tar.gz' ? 'tar.gz' : KNOWN_EXTENSION_FORMAT[ext];
          if (
            expected !== undefined &&
            typeof format === 'string' &&
            format.toLowerCase() !== expected
          ) {
            push({
              ...ctx,
              message: `Test build ${where} URL ends in ".${ext}" but declares format "${format}".`,
              fix: `Set \`format\` to "${expected}" to match the URL, or fix the URL to match format "${format}".`,
            });
          }
        }

        if (relative && !relativeFileExists(url)) {
          push({
            ...ctx,
            message: `Test build ${where} points at local file "${url}" which is missing under public/test-builds/.`,
            fix: 'Place the file under `public/test-builds/` (git-ignored, local only), or point `url` at the hosted `https://` file.',
          });
        }

        if (
          artifact.sizeBytes !== undefined &&
          (!Number.isInteger(artifact.sizeBytes) || artifact.sizeBytes <= 0)
        ) {
          push({
            ...ctx,
            message: `Test build ${where} has invalid sizeBytes (${String(artifact.sizeBytes)}).`,
            fix: 'Set `sizeBytes` to a positive integer file size, or omit it.',
          });
        }
        if (
          artifact.sha256 !== undefined &&
          (typeof artifact.sha256 !== 'string' || !SHA256.test(artifact.sha256))
        ) {
          push({
            ...ctx,
            message: `Test build ${where} has a malformed sha256 (${JSON.stringify(artifact.sha256)}).`,
            fix: 'Set `sha256` to exactly 64 hexadecimal characters (use `shasum -a 256 <file>`), or omit it.',
          });
        }
        if (
          artifact.fileName !== undefined &&
          (typeof artifact.fileName !== 'string' || !artifact.fileName.trim())
        ) {
          push({
            ...ctx,
            message: `Test build ${where} has an empty fileName.`,
            fix: 'Remove the empty `fileName` to fall back to the URL basename, or set the real file name.',
          });
        }
        if (
          artifact.minOs !== undefined &&
          (typeof artifact.minOs !== 'string' || !artifact.minOs.trim())
        ) {
          push({
            ...ctx,
            message: `Test build ${where} has an empty minOs.`,
            fix: 'Remove the empty `minOs` or state the minimum OS, e.g. "Android 8.0+".',
          });
        }
      });
    });
  });

  return errors;
}

/** Throw a readable Error naming slug, version, artifact, and fix. Fails the build. */
export function assertValidTestBuilds(apps: TestBuildApp[]): void {
  const errors = validateTestBuilds(apps);
  if (errors.length === 0) return;
  const lines = errors.map((error) => {
    const artifact = error.artifactLabel
      ? ` artifact ${error.artifactLabel}`
      : error.artifactIndex !== undefined
        ? ` artifact #${error.artifactIndex}`
        : '';
    const version = error.releaseVersion
      ? ` version "${error.releaseVersion}"`
      : '';
    return `- [test-builds] app "${error.appSlug}"${version}${artifact}: ${error.message} Fix: ${error.fix}`;
  });
  throw new Error(
    `Invalid test-build data (${errors.length} error${errors.length === 1 ? '' : 's'}):\n${lines.join('\n')}`,
  );
}
