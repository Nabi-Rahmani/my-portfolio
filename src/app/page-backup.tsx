'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

      setIsDark(shouldBeDark);
      updateTheme(shouldBeDark);
    }
  }, []);

  const updateTheme = (dark: boolean) => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;

      if (dark) {
        root.style.setProperty('--bg-primary', '#000000');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#111111');
        root.style.setProperty('--text-secondary', '#cccccc');
        root.style.setProperty('--border-color', '#333333');
        root.classList.add('dark');
      } else {
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--text-primary', '#000000');
        root.style.setProperty('--bg-secondary', '#f8f9fa');
        root.style.setProperty('--text-secondary', '#666666');
        root.style.setProperty('--border-color', '#e5e7eb');
        root.classList.remove('dark');
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateTheme(newTheme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      {/* Brand Logo */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        left: '2rem',
        zIndex: 50
      }}>
        <Link href="/" style={{
          fontSize: '1.1rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          transition: 'all 0.3s ease'
        }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'rgba(252, 180, 176, 1)'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}>
          codewithnabi
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        backgroundColor: `${isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'}`,
        backdropFilter: 'blur(16px)',
        border: `1px solid var(--border-color)`,
        borderRadius: '2rem',
        padding: '0.75rem 1.5rem',
        transition: 'all 0.3s ease',
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.3)'
          : '0 8px 32px rgba(0,0,0,0.1)',
        width: 'auto',
        minWidth: '300px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/" style={{
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              transition: 'color 0.3s ease',
              textDecoration: 'none',
              fontWeight: '600',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--bg-secondary)'
            }}>
              Home
            </Link>
            <Link href="/projects" style={{
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              transition: 'color 0.3s ease',
              textDecoration: 'none',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem'
            }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>
              Projects
            </Link>
            <Link href="/about" style={{
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              transition: 'color 0.3s ease',
              textDecoration: 'none',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem'
            }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>
              About
            </Link>
          </div>

          <button
            onClick={toggleTheme}
            style={{
              padding: '6px',
              borderRadius: '50%',
              border: `1px solid var(--border-color)`,
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'scale(1)'}>
            {isDark ? (
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 718.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </svg>
  ) : (
    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )
}
            </button >
          </div >
        </div >
      </nav >

  {/* Hero Section */ }
  < section style = {{ paddingTop: '6rem', paddingBottom: '4rem', padding: '6rem 1.5rem 4rem' }}>
    <div className="max-w-6xl mx-auto">
      <div className="max-w-3xl">
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          fontWeight: '300',
          marginBottom: '2rem',
          lineHeight: '1.1',
          color: 'var(--text-primary)'
        }}>
          Turning design concepts into{" "}
          <span style={{ fontStyle: 'italic' }}>functional builds</span>
        </h1>
        <p style={{
          fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
          color: 'var(--text-secondary)',
          marginBottom: '3rem',
          lineHeight: '1.6'
        }}>
          I design for difference—prioritizing clarity, delight, and genuine user connection.
        </p>

        {/* Social Links */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          <a href="#" style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            transition: 'color 0.3s ease'
          }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
            GitHub
          </a>
          <a href="#" style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            transition: 'color 0.3s ease'
          }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
            LinkedIn
          </a>
          <a href="#" style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            transition: 'color 0.3s ease'
          }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
            Twitter
          </a>
          <a href="mailto:your.email@example.com" style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            transition: 'color 0.3s ease'
          }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
            Email
          </a>
        </div>

        {/* Call to Action */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            href="/projects"
            style={{
              fontSize: '0.875rem',
              backgroundColor: isDark ? 'var(--text-primary)' : '#111111',
              color: isDark ? 'var(--bg-primary)' : 'white',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}
          >
            View My Work
          </Link>
          <Link
            href="/about"
            style={{
              fontSize: '0.875rem',
              border: `1px solid var(--border-color)`,
              color: 'var(--text-primary)',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}
          >
            About Me
          </Link>
        </div>
      </div>
    </div>
      </section >

  {/* Footer */ }
  < footer style = {{
  padding: '3rem 1.5rem',
    borderTop: `1px solid var(--border-color)`,
      marginTop: '6rem'
}}>
  <div className="max-w-6xl mx-auto">
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <div style={{
        fontSize: '0.875rem',
        color: 'var(--text-secondary)'
      }}>
        © 2025 codewithnabi. Built with ❤️ Next.js & Tailwind CSS.
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href="#" style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          transition: 'color 0.3s ease'
        }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
          GitHub
        </a>
        <a href="#" style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          transition: 'color 0.3s ease'
        }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
          LinkedIn
        </a>
        <a href="#" style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          transition: 'color 0.3s ease'
        }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
          Twitter
        </a>
        <a href="mailto:your.email@example.com" style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          transition: 'color 0.3s ease'
        }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
          Email
        </a>
      </div>
    </div>
  </div>
      </footer >
    </div >
  );
}
