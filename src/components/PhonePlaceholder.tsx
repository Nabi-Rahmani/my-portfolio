'use client';

interface PhonePlaceholderProps {
  label: string;
  caption: string;
  className?: string;
}

export default function PhonePlaceholder({ label, caption, className }: PhonePlaceholderProps) {
  return (
    <div
      className={className}
      style={{
        width: '280px',
        aspectRatio: '9 / 19.5',
        position: 'relative',
        borderRadius: '36px',
        border: '3px solid var(--line)',
        backgroundColor: 'var(--cream-2)',
        overflow: 'hidden',
      }}
      role="img"
      aria-label={label}
    >
      {/* Inner screen */}
      <div
        style={{
          position: 'absolute',
          inset: '6px',
          borderRadius: '30px',
          overflow: 'hidden',
          background: 'repeating-linear-gradient(135deg, var(--accent-soft) 0 4px, var(--cream-2) 4px 12px)',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '20px',
            backgroundColor: 'var(--line)',
            borderRadius: '0 0 10px 10px',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 16px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--muted)',
              opacity: 0.7,
              whiteSpace: 'pre-wrap',
              marginTop: '8px',
              lineHeight: 1.5,
            }}
          >
            {caption}
          </span>
        </div>
      </div>
    </div>
  );
}
