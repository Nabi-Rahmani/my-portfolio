import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type BadgeVariant = 'accent' | 'neutral';

const variantClasses: Record<BadgeVariant, string> = {
  accent: 'bg-[var(--accent-soft)] text-[var(--atelier-accent)]',
  neutral:
    'bg-[var(--cream-2)] text-[var(--muted)] border border-[var(--line)]',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export default function Badge({ variant = 'accent', children, className = '' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-[0.75rem] font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
