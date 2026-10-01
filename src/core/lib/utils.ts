import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** APPLICATION — shared formatters and class merging. */

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** UTC calendar date for list rows (avoids local-timezone day shifts). */
export function formatDateUtc(dateString: string): string {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(`${dateString}T00:00:00Z`));
}

/**
 * Merge class names with Tailwind conflict resolution.
 * Preferred shared helper — do not invent parallel cn/class utilities.
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}
