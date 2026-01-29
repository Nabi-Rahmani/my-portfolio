'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {
    const [isDark, setIsDark] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const projectScreenshots = [
        { src: '/assets/projectImage/day.png', title: 'Day' },
        { src: '/assets/projectImage/plan.png', title: 'Plan' },
        { src: '/assets/projectImage/insight.png', title: 'Insight' },
        { src: '/assets/projectImage/setting.png', title: 'Settings' }
    ];

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
                                color: 'var(--text-secondary)',
                                fontSize: '0.8rem',
                                transition: 'color 0.3s ease',
                                textDecoration: 'none',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.5rem'
                            }}
                                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)'}
                                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>
                                Home
                            </Link>
                            <Link href="/projects" style={{
                                color: 'var(--text-primary)',
                                fontSize: '0.8rem',
                                transition: 'color 0.3s ease',
                                textDecoration: 'none',
                                fontWeight: '600',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.5rem',
                                backgroundColor: 'var(--bg-secondary)'
                            }}>
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
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            padding: '0.5rem',
                            borderRadius: '0.75rem',
                            transition: 'all 0.3s ease',
                            minWidth: '60px'
                        }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                            <span style={{ fontSize: '0.7rem' }}>Home</span>
                        </Link>

                        <Link href="/projects" style={{
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
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                            <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>Projects</span>
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

            <main style={{ paddingTop: '5rem', padding: '5rem 1.5rem 4rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 style={{
                            fontSize: isMobile ? '2.5rem' : '3.5rem',
                            fontWeight: '700',
                            margin: '0 0 1rem',
                            background: 'linear-gradient(135deg, var(--text-primary), rgba(252, 180, 176, 1))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            My Projects
                        </h1>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            margin: 0,
                            lineHeight: 1.6
                        }}>
                            Flutter applications I&apos;ve built with passion
                        </p>
                    </div>

                    {/* Featured Project - Dev Discipline */}
                    <div style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: '1.5rem',
                        padding: '3rem',
                        marginBottom: '3rem',
                        border: `1px solid var(--border-color)`,
                        transition: 'all 0.3s ease',
                        boxShadow: isDark
                            ? '0 20px 40px rgba(0,0,0,0.1)'
                            : '0 20px 40px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: '3rem',
                            alignItems: 'center'
                        }}>
                            {/* Project Info */}
                            <div>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: 'rgba(252, 180, 176, 0.1)',
                                    color: 'rgba(252, 180, 176, 1)',
                                    borderRadius: '2rem',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    marginBottom: '1.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Featured Project
                                </div>

                                <h2 style={{
                                    fontSize: isMobile ? '1.8rem' : '2.5rem',
                                    fontWeight: '700',
                                    margin: '0 0 1rem',
                                    color: 'var(--text-primary)',
                                    lineHeight: 1.2
                                }}>
                                    Dev Discipline
                                </h2>

                                <p style={{
                                    fontSize: '1.1rem',
                                    color: 'var(--text-secondary)',
                                    margin: '0 0 2rem',
                                    lineHeight: 1.7
                                }}>
                                    A discipline-focused productivity app built with Flutter, featuring habit routines,
                                    progress tracking, and a clean, motivating user experience to keep you consistent.
                                </p>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        margin: '0 0 1rem',
                                        color: 'var(--text-primary)'
                                    }}>
                                        Key Features
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                        {[
                                            'Daily routines',
                                            'Habit tracking',
                                            'Progress insights',
                                            'Streak building',
                                            'Clean UI/UX',
                                            'Built with Flutter'
                                        ].map((feature) => (
                                            <span key={feature} style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: 'var(--bg-primary)',
                                                color: 'var(--text-primary)',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '500',
                                                border: `1px solid var(--border-color)`,
                                                transition: 'all 0.3s ease'
                                            }}>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <button style={{
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: 'rgba(252, 180, 176, 1)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                        onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(252, 180, 176, 0.8)'}
                                        onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(252, 180, 176, 1)'}>
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        View Code
                                    </button>
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.nabirahmani.dev_discipline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-primary)',
                                            border: `2px solid var(--border-color)`,
                                            borderRadius: '0.5rem',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            textDecoration: 'none'
                                        }}
                                        onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--bg-primary)'}
                                        onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                                    >
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                                        </svg>
                                        Go Play Store
                                    </a>
                                </div>
                            </div>

                            {/* Project Screenshots */}
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                alignItems: 'center'
                            }}>
                                {projectScreenshots.map((shot) => (
                                    <div
                                        key={shot.src}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <div style={{
                                            position: 'relative',
                                            width: isMobile ? '120px' : '150px',
                                            height: isMobile ? '220px' : '270px',
                                            borderRadius: '1rem',
                                            overflow: 'hidden',
                                            border: `2px solid var(--border-color)`,
                                            boxShadow: isDark
                                                ? '0 15px 30px rgba(0,0,0,0.2)'
                                                : '0 15px 30px rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease',
                                            transform: 'scale(1)'
                                        }}
                                            onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'scale(1.05) translateY(-5px)'}
                                            onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'scale(1)'}>
                                            <Image
                                                src={shot.src}
                                                alt={`Dev Discipline ${shot.title}`}
                                                fill
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                                sizes="(max-width: 768px) 120px, 150px"
                                            />
                                        </div>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            {shot.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Coming Soon Projects */}
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <div style={{
                            padding: '3rem',
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: '1.5rem',
                            border: `1px solid var(--border-color)`,
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(252, 180, 176, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem'
                            }}>
                                <svg width="40" height="40" fill="rgba(252, 180, 176, 1)" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                                </svg>
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                margin: '0 0 1rem',
                                color: 'var(--text-primary)'
                            }}>
                                More Projects Coming Soon
                            </h3>
                            <p style={{
                                fontSize: '1rem',
                                color: 'var(--text-secondary)',
                                margin: 0,
                                lineHeight: 1.6
                            }}>
                                I&apos;m constantly working on new Flutter applications.
                                Stay tuned for more exciting projects!
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer style={{
                padding: '2rem 1.5rem',
                borderTop: `1px solid var(--border-color)`,
                marginTop: '6rem'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <p style={{ margin: '0 0 0.5rem' }}>
                            Built with Next.js and lots of ☕
                        </p>
                        <p style={{ margin: 0, fontSize: '0.8rem' }}>
                            © 2024 codewithnabi. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
