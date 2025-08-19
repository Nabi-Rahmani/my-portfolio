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
                            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent' >
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>
        </div>
                </div >
            </nav >

        {/* Projects Content */ }
        < main style = {{ paddingTop: '5rem', padding: '5rem 1.5rem 4rem' }
}>
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
                Explore my collection of projects showcasing modern web development,
                innovative solutions, and creative problem-solving.
            </p>
        </div>

        <div style={{ display: 'grid', gap: '4rem' }}>
            {/* Project 1 */}
            <div>
                <div style={{
                    aspectRatio: '16/10',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '1rem',
                    marginBottom: '2rem',
                    overflow: 'hidden',
                    border: `1px solid var(--border-color)`
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: isDark
                            ? 'linear-gradient(135deg, rgba(252, 180, 176, 0.3), rgba(255, 192, 203, 0.25), rgba(255, 218, 185, 0.2))'
                            : 'linear-gradient(135deg, rgba(252, 180, 176, 0.15), rgba(255, 192, 203, 0.12), rgba(255, 218, 185, 0.1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.125rem'
                        }}>
                            E-Commerce Platform Preview
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl">
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '300',
                        marginBottom: '1rem',
                        color: 'var(--text-primary)'
                    }}>
                        E-Commerce Platform
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem'
                    }}>
                        A modern e-commerce platform built with Next.js and TypeScript. Features include user authentication,
                        payment processing, real-time inventory management, and a responsive design that works across all devices.
                        Integrated with Stripe for secure payments and Firebase for real-time data synchronization.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                            href="#"
                            style={{
                                fontSize: '0.875rem',
                                backgroundColor: isDark ? 'var(--text-primary)' : '#111111',
                                color: isDark ? 'var(--bg-primary)' : 'white',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '9999px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            View Project
                        </a>
                        <a
                            href="#"
                            style={{
                                fontSize: '0.875rem',
                                border: `1px solid var(--border-color)`,
                                color: 'var(--text-primary)',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '9999px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Live Demo
                        </a>
                    </div>
                </div>
            </div>

            {/* Project 2 */}
            <div>
                <div style={{
                    aspectRatio: '16/10',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '1rem',
                    marginBottom: '2rem',
                    overflow: 'hidden',
                    border: `1px solid var(--border-color)`
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: isDark
                            ? 'linear-gradient(135deg, rgba(252, 180, 176, 0.25), rgba(255, 218, 185, 0.3), rgba(253, 230, 138, 0.2))'
                            : 'linear-gradient(135deg, rgba(252, 180, 176, 0.12), rgba(255, 218, 185, 0.15), rgba(253, 230, 138, 0.1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.125rem'
                        }}>
                            Task Management App Preview
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl">
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '300',
                        marginBottom: '1rem',
                        color: 'var(--text-primary)'
                    }}>
                        Task Management App
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem'
                    }}>
                        A collaborative task management application with real-time updates, drag-and-drop functionality,
                        and team collaboration features. Built with React, Node.js, and Socket.io for real-time communication.
                        Features include project boards, time tracking, file attachments, and detailed analytics.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                            href="#"
                            style={{
                                fontSize: '0.875rem',
                                backgroundColor: isDark ? 'var(--text-primary)' : '#111111',
                                color: isDark ? 'var(--bg-primary)' : 'white',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '9999px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            View Project
                        </a>
                        <a
                            href="#"
                            style={{
                                fontSize: '0.875rem',
                                border: `1px solid var(--border-color)`,
                                color: 'var(--text-primary)',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '9999px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Live Demo
                        </a>
                    </div>
                </div>
            </div>

            {/* Project 3 */}
            <div>
                <div style={{
                    aspectRatio: '16/10',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '1rem',
                    marginBottom: '2rem',
                    overflow: 'hidden',
                    border: `1px solid var(--border-color)`
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: isDark
                            ? 'linear-gradient(135deg, rgba(253, 230, 138, 0.3), rgba(252, 180, 176, 0.25), rgba(255, 192, 203, 0.2))'
                            : 'linear-gradient(135deg, rgba(253, 230, 138, 0.15), rgba(252, 180, 176, 0.12), rgba(255, 192, 203, 0.1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.125rem'
                        }}>
                            Flutter Mobile App Preview
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl">
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '300',
                        marginBottom: '1rem',
                        color: 'var(--text-primary)'
                    }}>
                        Flutter Mobile App
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem'
                    }}>
                        A cross-platform mobile application built with Flutter and Dart. Features include offline capability,
                        push notifications, biometric authentication, and seamless data synchronization. The app delivers
                        native performance on both iOS and Android platforms with a beautiful, consistent user interface.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                            href="#"
                            style={{
                                fontSize: '0.875rem',
                                backgroundColor: isDark ? 'var(--text-primary)' : '#111111',
                                color: isDark ? 'var(--bg-primary)' : 'white',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '9999px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            View Project
                        </a>
                        <a
                            href="#"
                            style={{
                                fontSize: '0.875rem',
                                border: `1px solid var(--border-color)`,
                                color: 'var(--text-primary)',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '9999px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Live Demo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
            </main >
        </div >
    );
}
