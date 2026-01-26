'use client';

interface ProgressBarProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  percentage,
  size = 'md',
  showLabel = true,
  label,
}: ProgressBarProps) {
  const heights = {
    sm: '4px',
    md: '8px',
    lg: '12px',
  };

  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span>{label || 'Progress'}</span>
          <span style={{ fontWeight: 600 }}>{clampedPercentage}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: heights[size],
          backgroundColor: 'var(--border-color)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${clampedPercentage}%`,
            height: '100%',
            backgroundColor: clampedPercentage === 100 ? '#10b981' : 'var(--accent-primary)',
            borderRadius: '9999px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
