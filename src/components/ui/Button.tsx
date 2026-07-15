import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--ink)] text-[var(--cream)] hover:opacity-90 transition-opacity',
  secondary:
    'border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink-soft)] hover:bg-[var(--cream-2)] transition-all duration-200',
  ghost:
    'text-[var(--muted)] hover:text-[var(--ink)] transition-colors',
};

const baseClasses =
  'inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[0.9375rem] font-medium no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]';

const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler;
  'aria-label'?: string;
  'aria-disabled'?: boolean | 'true' | 'false';
}

export default function Button({
  variant = 'primary',
  href,
  disabled,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], disabled && disabledClasses, className);

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-disabled={disabled ? 'true' : undefined}
      {...(rest as object)}
    >
      {children}
    </button>
  );
}
