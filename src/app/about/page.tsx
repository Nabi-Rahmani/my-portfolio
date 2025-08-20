'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
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
            paddingBottom: isMobile ? '100px' : '0'
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
                                color: 'var(--text-primary)',
                                fontSize: '0.8rem',
                                transition: 'color 0.3s ease',
                                textDecoration: 'none',
                                fontWeight: '600',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.5rem',
                                backgroundColor: 'var(--bg-secondary)'
                            }}>
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
                    bottom: '0',
                    left: '0',
                    right: '0',
                    zIndex: 50,
                    backgroundColor: `${isDark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'}`,
                    backdropFilter: 'blur(16px)',
                    borderTop: `1px solid var(--border-color)`,
                    padding: '0.75rem 1rem 1.5rem',
                    transition: 'all 0.3s ease',
                    boxShadow: isDark
                        ? '0 -8px 32px rgba(0,0,0,0.3)'
                        : '0 -8px 32px rgba(0,0,0,0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        maxWidth: '400px',
                        margin: '0 auto'
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
                            color: 'rgba(252, 180, 176, 1)',
                            textDecoration: 'none',
                            padding: '0.5rem',
                            borderRadius: '0.75rem',
                            backgroundColor: 'rgba(252, 180, 176, 0.1)',
                            transition: 'all 0.3s ease',
                            minWidth: '60px'
                        }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>About</span>
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
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Left Column - Profile Photo */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        position: isMobile ? 'static' : 'sticky',
                        top: isMobile ? 'auto' : '6rem'
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '280px',
                            height: '280px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: `4px solid var(--border-color)`,
                            boxShadow: isDark
                                ? '0 20px 60px rgba(0,0,0,0.4), 0 0 0 8px rgba(252, 180, 176, 0.1)'
                                : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 8px rgba(252, 180, 176, 0.1)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.transform = 'scale(1.05)';
                                (e.target as HTMLElement).style.boxShadow = isDark
                                    ? '0 25px 80px rgba(0,0,0,0.5), 0 0 0 12px rgba(252, 180, 176, 0.2)'
                                    : '0 25px 80px rgba(0,0,0,0.2), 0 0 0 12px rgba(252, 180, 176, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.transform = 'scale(1)';
                                (e.target as HTMLElement).style.boxShadow = isDark
                                    ? '0 20px 60px rgba(0,0,0,0.4), 0 0 0 8px rgba(252, 180, 176, 0.1)'
                                    : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 8px rgba(252, 180, 176, 0.1)';
                            }}>
                            <Image
                                src="/assets/images/myimage.JPG"
                                alt="Nabi Rahman - Flutter Developer"
                                fill
                                style={{
                                    objectFit: 'cover',
                                    transition: 'all 0.3s ease'
                                }}
                                sizes="280px"
                                priority
                            />
                        </div>

                        {/* Quick Contact Info under profile */}
                        <div style={{
                            marginTop: '1.5rem',
                            textAlign: 'center',
                            maxWidth: '280px'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                fontSize: '0.85rem'
                            }}>
                                <a href="mailto:codewithnabi@gmail.com" style={{
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    justifyContent: 'center',
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    transition: 'all 0.3s ease'
                                }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                                        (e.target as HTMLElement).style.color = 'rgba(252, 180, 176, 1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                                        (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                                    }}>
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                    codewithnabi@gmail.com
                                </a>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    marginTop: '0.5rem'
                                }}>
                                    <a href="https://github.com/Nabi-Rahmani" target="_blank" rel="noopener noreferrer" style={{
                                        color: 'var(--text-secondary)',
                                        transition: 'color 0.3s ease'
                                    }}
                                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#24292e'}
                                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>

                                    <a href="https://www.linkedin.com/in/muhammad-nabi-rahmani-%F0%9F%87%B5%F0%9F%87%B8-8945b21ba/" target="_blank" rel="noopener noreferrer" style={{
                                        color: 'var(--text-secondary)',
                                        transition: 'color 0.3s ease'
                                    }}
                                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#0077b5'}
                                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>

                                    <a href="https://x.com/nabirahmani_dev" target="_blank" rel="noopener noreferrer" style={{
                                        color: 'var(--text-secondary)',
                                        transition: 'color 0.3s ease'
                                    }}
                                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1da1f2'}
                                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div style={{ paddingTop: isMobile ? '2rem' : '0' }}>
                        {/* Header */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h1 style={{
                                fontSize: isMobile ? '2rem' : '2.5rem',
                                fontWeight: '700',
                                margin: '0 0 0.5rem',
                                background: 'linear-gradient(135deg, var(--text-primary), rgba(252, 180, 176, 1))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                About Me
                            </h1>
                            <p style={{
                                fontSize: '1.1rem',
                                color: 'var(--text-secondary)',
                                margin: 0,
                                lineHeight: 1.6
                            }}>
                                Flutter Developer & Mobile App Enthusiast
                            </p>
                        </div>

                        {/* Bio Section */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{
                                fontSize: '1.3rem',
                                fontWeight: '600',
                                margin: '0 0 1rem',
                                color: 'var(--text-primary)'
                            }}>
                                Who I Am
                            </h2>
                            <div style={{
                                fontSize: '1rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.7,
                                marginBottom: '1.5rem'
                            }}>
                                <p style={{ marginBottom: '1rem' }}>
                                    I&apos;m a passionate Flutter developer with a love for creating beautiful, functional mobile applications.
                                    My journey in mobile development started with a curiosity about how apps work, and it quickly evolved
                                    into a deep appreciation for the craft of building user experiences.
                                </p>
                                <p style={{ marginBottom: '1rem' }}>
                                    I specialize in Flutter development, bringing ideas to life through clean code and intuitive design.
                                    Whether it&apos;s a simple utility app or a complex enterprise solution, I focus on creating apps
                                    that users love to interact with.
                                </p>
                                <p style={{ margin: 0 }}>
                                    When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects,
                                    or sharing my knowledge with the developer community.
                                </p>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{
                                fontSize: '1.3rem',
                                fontWeight: '600',
                                margin: '0 0 1.5rem',
                                color: 'var(--text-primary)'
                            }}>
                                Skills & Technologies
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                gap: '2rem'
                            }}>
                                <div>
                                    <h3 style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        margin: '0 0 1rem',
                                        color: 'rgba(252, 180, 176, 1)'
                                    }}>
                                        Mobile Development
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {['Flutter', 'Dart', 'Firebase', 'REST APIs', 'State Management'].map(skill => (
                                            <span key={skill} style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: 'var(--bg-secondary)',
                                                color: 'var(--text-primary)',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.8rem',
                                                border: `1px solid var(--border-color)`,
                                                transition: 'all 0.3s ease'
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        margin: '0 0 1rem',
                                        color: 'rgba(252, 180, 176, 1)'
                                    }}>
                                        Tools & Others
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {['Git', 'VS Code', 'Android Studio', 'Figma', 'UI/UX Design'].map(skill => (
                                            <span key={skill} style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: 'var(--bg-secondary)',
                                                color: 'var(--text-primary)',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.8rem',
                                                border: `1px solid var(--border-color)`,
                                                transition: 'all 0.3s ease'
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience Section */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{
                                fontSize: '1.3rem',
                                fontWeight: '600',
                                margin: '0 0 1.5rem',
                                color: 'var(--text-primary)'
                            }}>
                                Experience
                            </h2>
                            <div style={{
                                padding: '2rem',
                                backgroundColor: 'var(--bg-secondary)',
                                borderRadius: '1rem',
                                border: `1px solid var(--border-color)`,
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        margin: '0 0 0.5rem',
                                        color: 'var(--text-primary)'
                                    }}>
                                        Flutter Developer
                                    </h3>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'rgba(252, 180, 176, 1)',
                                        margin: '0 0 1rem',
                                        fontWeight: '500'
                                    }}>
                                        Freelance & Personal Projects
                                    </p>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)',
                                        margin: 0,
                                        lineHeight: 1.6
                                    }}>
                                        Developing mobile applications with Flutter, focusing on clean architecture,
                                        performance optimization, and delightful user experiences. Working on various
                                        projects including productivity apps, utilities, and educational tools.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div>
                            <h2 style={{
                                fontSize: '1.3rem',
                                fontWeight: '600',
                                margin: '0 0 1.5rem',
                                color: 'var(--text-primary)'
                            }}>
                                Let&apos;s Connect
                            </h2>
                            <p style={{
                                fontSize: '1rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.6,
                                marginBottom: '1.5rem'
                            }}>
                                I&apos;m always interested in new opportunities and collaborations.
                                Feel free to reach out if you&apos;d like to work together or just chat about Flutter development!
                            </p>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                                gap: '1rem',
                                maxWidth: isMobile ? '100%' : '500px'
                            }}>
                                {/* Email */}
                                <a href="mailto:codewithnabi@gmail.com" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem',
                                    backgroundColor: 'rgba(252, 180, 176, 1)',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    textAlign: 'center'
                                }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = 'rgba(252, 180, 176, 0.8)';
                                        (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = 'rgba(252, 180, 176, 1)';
                                        (e.target as HTMLElement).style.transform = 'translateY(0)';
                                    }}>
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                    <span>Email</span>
                                </a>

                                {/* GitHub */}
                                <a href="https://github.com/Nabi-Rahmani" target="_blank" rel="noopener noreferrer" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem',
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    border: `1px solid var(--border-color)`,
                                    transition: 'all 0.3s ease',
                                    textAlign: 'center'
                                }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = '#24292e';
                                        (e.target as HTMLElement).style.color = 'white';
                                        (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                                        (e.target as HTMLElement).style.color = 'var(--text-primary)';
                                        (e.target as HTMLElement).style.transform = 'translateY(0)';
                                    }}>
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span>GitHub</span>
                                </a>

                                {/* LinkedIn */}
                                <a href="https://www.linkedin.com/in/muhammad-nabi-rahmani-%F0%9F%87%B5%F0%9F%87%B8-8945b21ba/" target="_blank" rel="noopener noreferrer" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem',
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    border: `1px solid var(--border-color)`,
                                    transition: 'all 0.3s ease',
                                    textAlign: 'center'
                                }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = '#0077b5';
                                        (e.target as HTMLElement).style.color = 'white';
                                        (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                                        (e.target as HTMLElement).style.color = 'var(--text-primary)';
                                        (e.target as HTMLElement).style.transform = 'translateY(0)';
                                    }}>
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    <span>LinkedIn</span>
                                </a>

                                {/* Twitter */}
                                <a href="https://x.com/nabirahmani_dev" target="_blank" rel="noopener noreferrer" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem',
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    border: `1px solid var(--border-color)`,
                                    transition: 'all 0.3s ease',
                                    textAlign: 'center'
                                }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = '#1da1f2';
                                        (e.target as HTMLElement).style.color = 'white';
                                        (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                                        (e.target as HTMLElement).style.color = 'var(--text-primary)';
                                        (e.target as HTMLElement).style.transform = 'translateY(0)';
                                    }}>
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                    <span>Twitter</span>
                                </a>
                            </div>
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
