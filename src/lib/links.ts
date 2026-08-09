/**
 * Honest link helpers — primary CTAs must never navigate to dead targets.
 * Project media selectors stay generic (no slug branches).
 */

import type {
  Project,
  ProjectImageMedia,
  ProjectMedia,
  ProjectVideoMedia,
} from '@/types/project';

/**
 * True when a store / external download URL is safe to use as a primary link.
 * Rejects empty, `#`, hash-only, and non-http(s) values.
 */
export function isValidStoreUrl(url: string | undefined | null): url is string {
  if (url == null) return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#' || trimmed.startsWith('#')) return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Returns the trimmed URL when valid for a store CTA; otherwise undefined. */
export function getValidStoreUrl(
  url: string | undefined | null,
): string | undefined {
  return isValidStoreUrl(url) ? url.trim() : undefined;
}

/**
 * Project GitHub CTA only when the URL points at a real repo path
 * (`github.com/owner/repo`), not a bare profile.
 */
export function getValidProjectGithubUrl(
  url: string | undefined | null,
): string | undefined {
  if (!isValidStoreUrl(url)) return undefined;
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, '');
    if (host !== 'github.com') return undefined;
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return undefined;
    return url.trim();
  } catch {
    return undefined;
  }
}

function hasNonEmptySrc(src: string | undefined): src is string {
  return typeof src === 'string' && src.trim().length > 0;
}

/** Image entries from ordered project media (skips blanks / non-image kinds). */
export function getProjectImages(
  media: ProjectMedia[] | undefined,
): ProjectImageMedia[] {
  if (!media?.length) return [];
  return media.filter(
    (item): item is ProjectImageMedia =>
      item.type === 'image' && hasNonEmptySrc(item.src),
  );
}

/** First still — default card, list, and cover-art source. */
export function getProjectLeadImage(
  project: Pick<Project, 'media'>,
): ProjectImageMedia | undefined {
  return getProjectImages(project.media)[0];
}

/** First video entry (demo), when present. */
export function getProjectDemo(
  media: ProjectMedia[] | undefined,
): ProjectVideoMedia | undefined {
  if (!media?.length) return undefined;
  return media.find(
    (item): item is ProjectVideoMedia =>
      item.type === 'video' && hasNonEmptySrc(item.src),
  );
}
