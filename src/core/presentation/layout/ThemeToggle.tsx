'use client';

import { IconMoon, IconSun } from '@/core/presentation/layout/NavIcons';
import { cn } from '@/core/lib/utils';

/**
 * PRESENTATION — theme switch control.
 * Job: toggle light/dark; persistence stays in Navigation.
 */
export function ThemeToggle({
  isDark,
  onToggle,
  variant = 'icon',
}: {
  isDark: boolean;
  onToggle: () => void;
  variant?: 'icon' | 'row';
}) {
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  if (variant === 'row') {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] px-5 font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] motion-reduce:transition-none"
      >
        {isDark ? <IconSun size={17} /> : <IconMoon size={17} />}
        {isDark ? 'Use light canvas' : 'Use dark canvas'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      className={cn(
        'group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] text-[var(--text-strong)]',
        'transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] motion-reduce:transition-none',
      )}
    >
      <span className="transition-transform duration-200 group-hover:rotate-12 motion-reduce:transition-none motion-reduce:group-hover:rotate-0">
        {isDark ? <IconSun /> : <IconMoon />}
      </span>
    </button>
  );
}
