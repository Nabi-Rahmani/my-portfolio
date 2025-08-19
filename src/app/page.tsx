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

      {/* Hero Section */}
      <section style={{ paddingTop: '6rem', paddingBottom: '4rem', padding: '6rem 1.5rem 4rem' }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div style={{
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              fontWeight: '500',
              letterSpacing: '0.1rem',
              textTransform: 'uppercase'
            }}>
              Software Developer
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: '300',
              marginBottom: '2rem',
              color: 'var(--text-primary)',
              lineHeight: '1.1'
            }}>
              Hi, I&apos;m{' '}
              <span style={{
                background: 'linear-gradient(135deg, rgba(252, 180, 176, 1) 0%, rgba(255, 192, 203, 0.8) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '400'
              } as React.CSSProperties}>
                Noor Mohammad
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              lineHeight: '1.6'
            }}>
              A passionate full-stack developer from Afghanistan, specializing in modern web applications,
              mobile development, and creating digital solutions that make a difference in people&apos;s lives.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '4rem'
            }}>
              <Link href="/projects" style={{
                background: 'linear-gradient(135deg, rgba(252, 180, 176, 1) 0%, rgba(255, 192, 203, 0.9) 100%)',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '2rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-block'
              }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLElement).style.boxShadow = '0 8px 25px rgba(252, 180, 176, 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}>
                View My Work
              </Link>

              <Link href="/about" style={{
                color: 'var(--text-primary)',
                padding: '0.75rem 2rem',
                borderRadius: '2rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                border: `1px solid var(--border-color)`,
                backgroundColor: 'transparent',
                display: 'inline-block'
              }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                  (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                }}>
                About Me
              </Link>
            </div>
          </div>

          {/* Skills & Technologies */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: '300',
              marginBottom: '2rem',
              color: 'var(--text-primary)'
            }}>
              Technologies I Work With
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {/* Frontend */}
              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                border: `1px solid var(--border-color)`,
                backgroundColor: 'var(--bg-secondary)',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.target as HTMLElement).style.boxShadow = isDark
                    ? '0 8px 25px rgba(252, 180, 176, 0.1)'
                    : '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)'
                }}>
                  Frontend
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4'
                }}>
                  Next.js, React, TypeScript, Tailwind CSS
                </p>
              </div>

              {/* Backend */}
              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                border: `1px solid var(--border-color)`,
                backgroundColor: 'var(--bg-secondary)',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.target as HTMLElement).style.boxShadow = isDark
                    ? '0 8px 25px rgba(252, 180, 176, 0.1)'
                    : '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)'
                }}>
                  Backend
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4'
                }}>
                  Node.js, Express.js, MongoDB, PostgreSQL
                </p>
              </div>

              {/* Mobile */}
              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                border: `1px solid var(--border-color)`,
                backgroundColor: 'var(--bg-secondary)',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.target as HTMLElement).style.boxShadow = isDark
                    ? '0 8px 25px rgba(252, 180, 176, 0.1)'
                    : '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)'
                }}>
                  Mobile
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4'
                }}>
                  Flutter, React Native, Dart
                </p>
              </div>

              {/* Tools */}
              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                border: `1px solid var(--border-color)`,
                backgroundColor: 'var(--bg-secondary)',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.target as HTMLElement).style.boxShadow = isDark
                    ? '0 8px 25px rgba(252, 180, 176, 0.1)'
                    : '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)'
                }}>
                  Tools
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4'
                }}>
                  Git, Docker, AWS, Firebase
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
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
      </footer>
    </div>
  );
}
