'use client';

import Image from 'next/image';

interface PhoneScreenshotProps {
  src: string;
  alt: string;
  className?: string;
  /** Prefer true for the first above-the-fold project visual. */
  priority?: boolean;
}

export default function PhoneScreenshot({
  src,
  alt,
  className,
  priority = false,
}: PhoneScreenshotProps) {
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
    >
      {/* Inner screen — no notch; screenshots include their own status bar */}
      <div
        style={{
          position: 'absolute',
          inset: '6px',
          borderRadius: '30px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          sizes="280px"
          priority={priority}
        />
      </div>
    </div>
  );
}
