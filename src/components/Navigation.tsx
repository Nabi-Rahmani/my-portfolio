'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const [isDark, setIsDark] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

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

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <>
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
                                color: isActive('/') ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontSize: '0.8rem',
                                transition: 'color 0.3s ease',
                                textDecoration: 'none',
                                fontWeight: '600',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.5rem',
                                backgroundColor: isActive('/') ? 'var(--bg-secondary)' : 'transparent'
                            }}
                                onMouseEnter={(e) => !isActive('/') && ((e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)')}
                                onMouseLeave={(e) => !isActive('/') && ((e.target as HTMLElement).style.backgroundColor = 'transparent')}>
                                Home
                            </Link>
                            <Link href="/projects" style={{
                                color: isActive('/projects') ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontSize: '0.8rem',
                                transition: 'color 0.3s ease',
                                textDecoration: 'none',
                                fontWeight: '600',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.5rem',
                                backgroundColor: isActive('/projects') ? 'var(--bg-secondary)' : 'transparent'
                            }}
                                onMouseEnter={(e) => !isActive('/projects') && ((e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)')}
                                onMouseLeave={(e) => !isActive('/projects') && ((e.target as HTMLElement).style.backgroundColor = 'transparent')}>
                                Projects
                            </Link>
                            <Link href="/blog" style={{
                                color: isActive('/blog') ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontSize: '0.8rem',
                                transition: 'color 0.3s ease',
                                textDecoration: 'none',
                                fontWeight: '600',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.5rem',
                                backgroundColor: isActive('/blog') ? 'var(--bg-secondary)' : 'transparent'
                            }}
                                onMouseEnter={(e) => !isActive('/blog') && ((e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)')}
                                onMouseLeave={(e) => !isActive('/blog') && ((e.target as HTMLElement).style.backgroundColor = 'transparent')}>
                                Blog
                            </Link>
                            <Link href="/about" style={{
                                color: isActive('/about') ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontSize: '0.8rem',
                                transition: 'color 0.3s ease',
                                textDecoration: 'none',
                                fontWeight: '600',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.5rem',
                                backgroundColor: isActive('/about') ? 'var(--bg-secondary)' : 'transparent'
                            }}
                                onMouseEnter={(e) => !isActive('/about') && ((e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)')}
                                onMouseLeave={(e) => !isActive('/about') && ((e.target as HTMLElement).style.backgroundColor = 'transparent')}>
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
                            color: isActive('/') ? 'rgba(252, 180, 176, 1)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            padding: '0.5rem',
                            borderRadius: '0.75rem',
                            backgroundColor: isActive('/') ? 'rgba(252, 180, 176, 0.1)' : 'transparent',
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
                            color: isActive('/projects') ? 'rgba(252, 180, 176, 1)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            padding: '0.5rem',
                            borderRadius: '0.75rem',
                            backgroundColor: isActive('/projects') ? 'rgba(252, 180, 176, 0.1)' : 'transparent',
                            transition: 'all 0.3s ease',
                            minWidth: '60px'
                        }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                            <span style={{ fontSize: '0.7rem' }}>Projects</span>
                        </Link>

                        <Link href="/blog" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: isActive('/blog') ? 'rgba(252, 180, 176, 1)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            padding: '0.5rem',
                            borderRadius: '0.75rem',
                            backgroundColor: isActive('/blog') ? 'rgba(252, 180, 176, 0.1)' : 'transparent',
                            transition: 'all 0.3s ease',
                            minWidth: '60px'
                        }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zm-2-2H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                            <span style={{ fontSize: '0.7rem' }}>Blog</span>
                        </Link>

                        <Link href="/about" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: isActive('/about') ? 'rgba(252, 180, 176, 1)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            padding: '0.5rem',
                            borderRadius: '0.75rem',
                            backgroundColor: isActive('/about') ? 'rgba(252, 180, 176, 0.1)' : 'transparent',
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
        </>
    );
}