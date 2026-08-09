'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const heights = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
} as const;

export function ProgressBar({
  percentage,
  size = 'md',
  showLabel = true,
  label,
}: ProgressBarProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const isComplete = clampedPercentage === 100;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between text-[0.75rem] text-[var(--muted)]">
          <span>{label || 'Progress'}</span>
          <span className="font-semibold">{clampedPercentage}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full overflow-hidden rounded-full border border-[var(--line)] bg-[var(--cream-2)]',
          heights[size],
        )}
        role="progressbar"
        aria-valuenow={clampedPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none',
            isComplete ? 'bg-[var(--status-ok)]' : 'bg-[var(--atelier-accent)]',
          )}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
}
