/**
 * Pure platform detection for Client Test Builds.
 * Inputs: user agent, optional `navigator.userAgentData.platform`, and
 * `maxTouchPoints`. Output: one of the six Requirement 15 values.
 * No DOM access — checkable with user-agent fixtures.
 */
export type DetectedPlatform =
  | 'android'
  | 'windows'
  | 'macos'
  | 'linux'
  | 'ios'
  | 'unknown';

export function detectPlatform(
  userAgent: string | undefined | null,
  userAgentDataPlatform?: string | undefined | null,
  maxTouchPoints?: number | undefined | null,
): DetectedPlatform {
  const ua = (userAgent ?? '').toLowerCase();
  const ud = (userAgentDataPlatform ?? '').toLowerCase();
  const touch = typeof maxTouchPoints === 'number' ? maxTouchPoints : 0;

  // Android first: Android UAs also contain "linux".
  if (ua.includes('android') || ud === 'android') return 'android';

  // iPhone / iPad (classic tokens) or explicit iOS platform.
  if (
    ua.includes('iphone') ||
    ua.includes('ipad') ||
    ua.includes('ipod') ||
    ud === 'ios'
  ) {
    return 'ios';
  }

  // iPadOS reporting a Mac UA alongside touch support.
  if (touch > 1 && (ua.includes('macintosh') || ua.includes('mac os x'))) {
    return 'ios';
  }

  if (ua.includes('windows') || ud === 'windows') return 'windows';

  if (
    ua.includes('macintosh') ||
    ua.includes('mac os x') ||
    ud === 'macos' ||
    ud === 'mac os'
  ) {
    return 'macos';
  }

  if (ua.includes('linux') || ua.includes('x11') || ud === 'linux') {
    return 'linux';
  }

  return 'unknown';
}
