import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

/**
 * Merge class names with Tailwind conflict resolution.
 * Preferred shared helper — do not invent parallel cn/class utilities.
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}
