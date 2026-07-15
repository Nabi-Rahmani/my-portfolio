/**
 * Honest link helpers — primary CTAs must never navigate to dead targets.
 */

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

/** Non-empty screenshot paths for galleries (skips blanks / broken entries). */
export function getProjectScreenshots(screenshots: string[] | undefined): string[] {
  if (!screenshots?.length) return [];
  return screenshots.filter((src) => typeof src === 'string' && src.trim().length > 0);
}
