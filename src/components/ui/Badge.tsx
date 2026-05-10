import type { ReactNode } from 'react';

type BadgeVariant = 'accent' | 'neutral';

const variantClasses: Record<BadgeVariant, string> = {
    accent: 'bg-[var(--accent-muted)] text-[var(--accent)]',
    neutral: 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]',
};

interface BadgeProps {
    variant?: BadgeVariant;
    children: ReactNode;
    className?: string;
}

export default function Badge({ variant = 'accent', children, className = '' }: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[0.75rem] font-medium ${variantClasses[variant]} ${className}`}
        >
            {children}
        </span>
    );
}
