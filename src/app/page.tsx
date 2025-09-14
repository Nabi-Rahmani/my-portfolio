'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

      setIsDark(shouldBeDark);
      updateTheme(shouldBeDark);

      // Check initial screen size
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);

      return () => window.removeEventListener('resize', checkScreenSize);
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
      transition: 'all 0.3s ease',
      paddingBottom: isMobile ? '50px' : '0'
    }}>
      {/* Brand Logo - Always visible at top left */}
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

      {/* Desktop Navigation - Top Center */}
      {!isMobile && (
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
              <Link href="/blog" style={{
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                transition: 'color 0.3s ease',
                textDecoration: 'none',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.5rem'
              }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>
                Blog
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
                color: isDark ? '#fbbf24' : '#f59e0b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.1)';
                (e.target as HTMLElement).style.color = isDark ? '#fcd34d' : '#d97706';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
                (e.target as HTMLElement).style.color = isDark ? '#fbbf24' : '#f59e0b';
              }}>
              {isDark ? (
                <svg style={{ width: '16px', height: '16px' }} fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg style={{ width: '16px', height: '16px' }} fill="currentColor" stroke="none" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          backgroundColor: `${isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'}`,
          backdropFilter: 'blur(16px)',
          border: `1px solid var(--border-color)`,
          borderRadius: '2rem',
          padding: '0.75rem 1rem',
          transition: 'all 0.3s ease',
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(0,0,0,0.1)',
          width: 'auto',
          minWidth: '300px',
          maxWidth: '350px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <Link href="/" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'rgba(252, 180, 176, 1)',
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              backgroundColor: 'rgba(252, 180, 176, 0.1)',
              transition: 'all 0.3s ease',
              minWidth: '60px'
            }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>Home</span>
            </Link>

            <Link href="/projects" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              transition: 'all 0.3s ease',
              minWidth: '60px'
            }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              <span style={{ fontSize: '0.7rem' }}>Projects</span>
            </Link>

            <Link href="/about" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              transition: 'all 0.3s ease',
              minWidth: '60px'
            }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span style={{ fontSize: '0.7rem' }}>About</span>
            </Link>

            <Link href="/blog" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              transition: 'all 0.3s ease',
              minWidth: '60px'
            }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zm-2-2H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              <span style={{ fontSize: '0.7rem' }}>Blog</span>
            </Link>

            <button
              onClick={toggleTheme}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                backgroundColor: 'transparent',
                color: isDark ? '#fbbf24' : '#f59e0b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '60px'
              }}>
              {isDark ? (
                <svg width="20" height="20" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="currentColor" stroke="none" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              <span style={{ fontSize: '0.7rem' }}>Theme</span>
            </button>
          </div>
        </nav>
      )}

      <main style={{
        flex: 1,
        padding: '2rem 1.5rem',
        paddingTop: '6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
          width: '100%'
        }}>
          {/* Hero Section */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{
              marginBottom: '1.5rem',
              opacity: 0,
              animation: 'fadeInUp 1s ease forwards',
              animationDelay: '0.2s'
            }}>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(252, 180, 176, 1)',
                margin: '0 0 0.5rem',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}>
                Hello, I&apos;m
              </p>
            </div>

            <div style={{
              opacity: 0,
              animation: 'fadeInUp 1s ease forwards',
              animationDelay: '0.4s'
            }}>
              <h1 style={{
                fontSize: isMobile ? '2.5rem' : '4rem',
                fontWeight: '700',
                margin: '0 0 1rem',
                background: 'linear-gradient(135deg, var(--text-primary), rgba(252, 180, 176, 1))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1
              }}>
                Nabi Rahmani
              </h1>
            </div>

            <div style={{
              opacity: 0,
              animation: 'fadeInUp 1s ease forwards',
              animationDelay: '0.6s'
            }}>
              <p style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                color: 'var(--text-secondary)',
                margin: '0 0 2rem',
                lineHeight: 1.6,
                fontWeight: '400'
              }}>
                Flutter Developer crafting beautiful mobile experiences
                <br />
                with clean code and intuitive design
              </p>
            </div>

            <div style={{
              opacity: 0,
              animation: 'fadeInUp 1s ease forwards',
              animationDelay: '0.8s',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/projects" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: 'rgba(252, 180, 176, 1)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(252, 180, 176, 0.3)'
              }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(252, 180, 176, 0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(252, 180, 176, 0.3)';
                }}>
                View My Work
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </Link>

              <Link href="/about" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: '600',
                border: `2px solid var(--border-color)`,
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                  (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}>
                About Me
              </Link>
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{
            opacity: 0,
            animation: 'fadeInUp 1s ease forwards',
            animationDelay: '1s'
          }}>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              margin: '0 0 1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '500'
            }}>
              Technologies I Love
            </p>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              {[
                { name: 'Flutter', color: '#0175C2' },
                { name: 'Dart', color: '#00B4AB' },
                { name: 'Firebase', color: '#FFCA28' },
                { name: 'Git', color: '#F05032' }
              ].map((tech, index) => (
                <div key={tech.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.75rem',
                  border: `1px solid var(--border-color)`,
                  transition: 'all 0.3s ease',
                  opacity: 0,
                  animation: 'fadeInUp 1s ease forwards',
                  animationDelay: `${1.2 + index * 0.1}s`,
                  cursor: 'default'
                }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(-3px)';
                    (e.target as HTMLElement).style.borderColor = tech.color;
                    (e.target as HTMLElement).style.boxShadow = `0 8px 25px ${tech.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                    (e.target as HTMLElement).style.borderColor = 'var(--border-color)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: tech.color
                  }}></div>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)'
                  }}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Elements */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '10%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(252, 180, 176, 0.1), rgba(252, 180, 176, 0.05))',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite',
        zIndex: -1
      }}></div>

      <div style={{
        position: 'fixed',
        bottom: '20%',
        right: '10%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(252, 180, 176, 0.08), rgba(252, 180, 176, 0.03))',
        filter: 'blur(30px)',
        animation: 'float 4s ease-in-out infinite reverse',
        zIndex: -1
      }}></div>

      <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
            `}</style>
    </div>
  );
}
