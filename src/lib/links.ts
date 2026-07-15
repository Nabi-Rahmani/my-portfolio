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
