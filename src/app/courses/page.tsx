'use client';

import { useEffect, useState } from 'react';

export default function CoursesPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        paddingTop: '100px',
        paddingBottom: isMobile ? '100px' : '60px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}
        >
          Coming Soon
        </h1>
        <p
          style={{
            fontSize: isMobile ? '1rem' : '1.125rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          Courses are on the way. Stay tuned!
        </p>
      </div>
    </main>
  );
}
