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
                            A collection of projects that showcase my skills in web development,
                            mobile applications, and problem-solving through technology.
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
                                Modern Web Application
                            </h3>

                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '1rem'
                            }}>
                                A full-stack web application built with Next.js, TypeScript, and modern UI/UX principles.
                                Features real-time data, responsive design, and optimized performance.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'].map((tech) => (
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
                                Mobile Flutter App
                            </h3>

                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '1rem'
                            }}>
                                Cross-platform mobile application developed with Flutter and Dart.
                                Features offline capabilities, smooth animations, and native performance.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {['Flutter', 'Dart', 'Firebase', 'REST API'].map((tech) => (
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
                                API & Backend System
                            </h3>

                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '1rem'
                            }}>
                                Scalable backend system with RESTful APIs, database management,
                                and real-time features. Built for performance and reliability.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {['Node.js', 'Express', 'MongoDB', 'JWT'].map((tech) => (
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
                                Creative Portfolio
                            </h3>

                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '1rem'
                            }}>
                                Interactive portfolio website showcasing creative work with smooth animations,
                                dynamic content, and an engaging user experience.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {['React', 'GSAP', 'CSS3', 'Figma'].map((tech) => (
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
