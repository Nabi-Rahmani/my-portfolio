import type { TestBuildPlatform } from '@/features/test-builds/domain/test-build';

/**
 * Compact monochrome platform marks — fill, 24x24 viewBox, decorative.
 * Follows the footer's inline-`ICONS` approach; no icon package.
 */
const PATHS: Record<TestBuildPlatform, string> = {
  // Simplified Android robot: head dome, body, arms, legs.
  android:
    'M7.5 9h9a3.5 3.5 0 0 1 3.5 3.5V15h-2v-2.5h-11V15h-2v-2.5A3.5 3.5 0 0 1 7.5 9Zm1-2.2 1.2 1.2A5.4 5.4 0 0 1 12 7.5c.8 0 1.6.2 2.3.5L15.5 6.8l1.4 1.4-1.2 1.2A5.5 5.5 0 0 1 17.5 12H6.5c0-1.2.4-2.3 1-3.2L6.3 7.6l1.4-1.4 1.2 1.2A5.4 5.4 0 0 1 12 6.5c-.5 0-1 .1-1.5.2L9.3 5.5 8.5 6.8ZM7 16h2v5H7v-5Zm8 0h2v5h-2v-5ZM4 11.5h2V16H4v-4.5Zm14 0h2V16h-2v-4.5Z',
  // Windows: four panes.
  windows:
    'M3 5.5 10.5 4.4v7.1H3V5.5Zm11-2.1L21 2.5v9H14V3.4ZM3 12.5h7.5v7.1L3 18.5v-6Zm11 0h7v9l-7-.9v-8.1Z',
  // Apple silhouette.
  macos:
    'M16.7 12.9c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9-1.6 0-3.1 1-4 2.4-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.7-1-2.7-3.7ZM14.2 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.9-1 3 1.1.1 2.1-.6 2.8-1.4Z',
  // Linux: terminal mark (penguin geometry is unreadable at small sizes).
  linux:
    'M4 5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm3.3 3.1-2 2 2 2 1.4-1.4-1.3-1.3 1.3-1.3-1.4-1.3 1.4 1.3Zm5.2 5.5 3.5-6.2 1.5.9-3.5 6.2-1.5-.9Z',
};

export function PlatformIcon({ platform }: { platform: TestBuildPlatform }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d={PATHS[platform]} />
    </svg>
  );
}
