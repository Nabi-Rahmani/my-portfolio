'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Projects() {
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
                            color: isDark ? '#fbbf24' : '#f59e0b', // Better contrast for both modes
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

            {/* Projects Content */}
            <main style={{ paddingTop: '5rem', padding: '5rem 1.5rem 4rem' }}>
                <div className="max-w-6xl mx-auto">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                            fontWeight: '300',
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)'
                        }}>
                            My Projects
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                            color: 'var(--text-secondary)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Flutter mobile apps and full-stack projects built with modern DevOps practices,
                            from development to production deployment with complete CI/CD workflows.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem',
                        marginBottom: '4rem'
                    }}>
                        {/* Project 1 */}
                        <div style={{
                            border: `1px solid var(--border-color)`,
                            borderRadius: '1rem',
                            backgroundColor: 'var(--bg-secondary)',
                            padding: '1.5rem',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                                (e.target as HTMLElement).style.boxShadow = isDark
                                    ? '0 12px 40px rgba(252, 180, 176, 0.1)'
                                    : '0 12px 40px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.transform = 'translateY(0)';
                                (e.target as HTMLElement).style.boxShadow = 'none';
                            }}>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                borderRadius: '0.5rem',
                                background: 'linear-gradient(135deg, rgba(252, 180, 176, 0.3) 0%, rgba(255, 192, 203, 0.2) 100%)',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    color: 'rgba(252, 180, 176, 0.7)'
                                }}>
                                    💻
                                </div>
                            </div>

                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                marginBottom: '0.75rem'
                            }}>
                                E-Commerce Flutter App
                            </h3>

                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '1rem'
                            }}>
                                Production-ready e-commerce mobile app built with Flutter and Supabase backend.
                                Features complete CI/CD pipeline with Codemagic, Mixpanel analytics, Sentry monitoring,
                                and automated deployment to both App Store and Play Store.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {['Flutter', 'Supabase', 'Codemagic', 'Mixpanel', 'Sentry'].map((tech) => (
                                        <span key={tech} style={{
                                            fontSize: '0.75rem',
                                            background: 'linear-gradient(135deg, rgba(252, 180, 176, 0.2) 0%, rgba(255, 192, 203, 0.1) 100%)',
                                            color: 'var(--text-primary)',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '0.25rem',
                                            border: `1px solid rgba(252, 180, 176, 0.3)`
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <a href="#" style={{
                                    fontSize: '0.875rem',
                                    color: 'rgba(252, 180, 176, 1)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'rgba(252, 180, 176, 0.8)'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(252, 180, 176, 1)'}>
                                    View Live →
                                </a>
                                <a href="#" style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                    GitHub →
                                </a>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div style={{
                            border: `1px solid var(--border-color)`,
                            borderRadius: '1rem',
                            backgroundColor: 'var(--bg-secondary)',
                            padding: '1.5rem',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                                (e.target as HTMLElement).style.boxShadow = isDark
                                    ? '0 12px 40px rgba(252, 180, 176, 0.1)'
                                    : '0 12px 40px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.transform = 'translateY(0)';
                                (e.target as HTMLElement).style.boxShadow = 'none';
                            }}>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                borderRadius: '0.5rem',
                                background: 'linear-gradient(135deg, rgba(255, 218, 185, 0.3) 0%, rgba(252, 180, 176, 0.2) 100%)',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    color: 'rgba(255, 218, 185, 0.7)'
                                }}>
                                    📱
                                </div>
                            </div>

                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                marginBottom: '0.75rem'
                            }}>
                                Social Media Flutter App
                            </h3>

                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '1rem'
                            }}>
                                Cross-platform social media application with real-time messaging, Firebase backend,
                                complete DevOps setup with GitHub Actions, integrated analytics with Mixpanel,
                                and comprehensive crash monitoring with Sentry.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {['Flutter', 'Firebase', 'GitHub Actions', 'Mixpanel'].map((tech) => (
                                        <span key={tech} style={{
                                            fontSize: '0.75rem',
                                            background: 'linear-gradient(135deg, rgba(255, 218, 185, 0.2) 0%, rgba(252, 180, 176, 0.1) 100%)',
                                            color: 'var(--text-primary)',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '0.25rem',
                                            border: `1px solid rgba(255, 218, 185, 0.3)`
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <a href="#" style={{
                                    fontSize: '0.875rem',
                                    color: 'rgba(252, 180, 176, 1)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'rgba(252, 180, 176, 0.8)'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(252, 180, 176, 1)'}>
                                    Play Store →
                                </a>
                                <a href="#" style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                    GitHub →
                                </a>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div style={{
                            border: `1px solid var(--border-color)`,
                            borderRadius: '1rem',
                            backgroundColor: 'var(--bg-secondary)',
                            padding: '1.5rem',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                                (e.target as HTMLElement).style.boxShadow = isDark
                                    ? '0 12px 40px rgba(252, 180, 176, 0.1)'
                                    : '0 12px 40px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.transform = 'translateY(0)';
                                (e.target as HTMLElement).style.boxShadow = 'none';
                            }}>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                borderRadius: '0.5rem',
                                background: 'linear-gradient(135deg, rgba(255, 192, 203, 0.3) 0%, rgba(253, 230, 138, 0.2) 100%)',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    color: 'rgba(255, 192, 203, 0.7)'
                                }}>
                                    ⚡
                                </div>
                            </div>

                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                marginBottom: '0.75rem'
                            }}>
                                Healthcare App with DevOps
                            </h3>

                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '1rem'
                            }}>
                                Flutter healthcare application with Supabase backend, complete CI/CD pipeline,
                                automated testing, Docker containerization, AWS deployment, and comprehensive
                                monitoring with Sentry and user analytics with Mixpanel.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {['Flutter', 'Supabase', 'Docker', 'AWS', 'Sentry'].map((tech) => (
                                        <span key={tech} style={{
                                            fontSize: '0.75rem',
                                            background: 'linear-gradient(135deg, rgba(255, 192, 203, 0.2) 0%, rgba(253, 230, 138, 0.1) 100%)',
                                            color: 'var(--text-primary)',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '0.25rem',
                                            border: `1px solid rgba(255, 192, 203, 0.3)`
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <a href="#" style={{
                                    fontSize: '0.875rem',
                                    color: 'rgba(252, 180, 176, 1)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'rgba(252, 180, 176, 0.8)'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(252, 180, 176, 1)'}>
                                    API Docs →
                                </a>
                                <a href="#" style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                    GitHub →
                                </a>
                            </div>
                        </div>

                        {/* Project 4 */}
                        <div style={{
                            border: `1px solid var(--border-color)`,
                            borderRadius: '1rem',
                            backgroundColor: 'var(--bg-secondary)',
                            padding: '1.5rem',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                                (e.target as HTMLElement).style.boxShadow = isDark
                                    ? '0 12px 40px rgba(252, 180, 176, 0.1)'
                                    : '0 12px 40px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.transform = 'translateY(0)';
                                (e.target as HTMLElement).style.boxShadow = 'none';
                            }}>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                borderRadius: '0.5rem',
                                background: 'linear-gradient(135deg, rgba(253, 230, 138, 0.3) 0%, rgba(255, 218, 185, 0.2) 100%)',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    color: 'rgba(253, 230, 138, 0.7)'
                                }}>
                                    🎨
                                </div>
                            </div>

                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                marginBottom: '0.75rem'
                            }}>
                                Flutter Fintech App
                            </h3>

                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '1rem'
                            }}>
                                Secure fintech mobile application built with Flutter, featuring biometric authentication,
                                encrypted data storage, Codemagic CI/CD pipeline, comprehensive analytics with Mixpanel,
                                and production-ready deployment with advanced security measures.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {['Flutter', 'Security', 'Codemagic', 'Analytics'].map((tech) => (
                                        <span key={tech} style={{
                                            fontSize: '0.75rem',
                                            background: 'linear-gradient(135deg, rgba(253, 230, 138, 0.2) 0%, rgba(255, 218, 185, 0.1) 100%)',
                                            color: 'var(--text-primary)',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '0.25rem',
                                            border: `1px solid rgba(253, 230, 138, 0.3)`
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <a href="#" style={{
                                    fontSize: '0.875rem',
                                    color: 'rgba(252, 180, 176, 1)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'rgba(252, 180, 176, 0.8)'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(252, 180, 176, 1)'}>
                                    View Live →
                                </a>
                                <a href="#" style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                    GitHub →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

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
                            © 2025 codewithnabi. Flutter Apps from Zero to Production 🚀
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <a href="https://github.com/Nabi-Rahmani" target="_blank" rel="noopener noreferrer" style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                                onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                                onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/muhammad-nabi-rahmani-%F0%9F%87%B5%F0%9F%87%B8-8945b21ba/" target="_blank" rel="noopener noreferrer" style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                                onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#0077b5'}
                                onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </a>
                            <a href="https://x.com/nabirahmani_dev" target="_blank" rel="noopener noreferrer" style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                                onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1da1f2'}
                                onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                Twitter
                            </a>
                            <a href="mailto:codewithnabi@gmail.com" style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                                onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#ea4335'}
                                onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.909L12 9.545l8.455-5.724h1.909c.904 0 1.636.732 1.636 1.636z" />
                                </svg>
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
