'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function About() {
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

            {/* About Content */}
            <main style={{ paddingTop: '5rem', padding: '5rem 1.5rem 4rem' }}>
                <div className="max-w-6xl mx-auto">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                            fontWeight: '300',
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)'
                        }}>
                            About Me
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                            color: 'var(--text-secondary)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Discover my journey, experience, and passion for creating
                            innovative digital solutions that make a difference.
                        </p>
                    </div>

                    {/* Location */}
                    <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <div style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '1rem'
                        }}>
                            Asia/Kabul
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Introduction */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h1 style={{
                                fontSize: '2rem',
                                fontWeight: '300',
                                marginBottom: '1rem',
                                background: 'linear-gradient(135deg, rgba(252, 180, 176, 1) 0%, rgba(255, 192, 203, 0.8) 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            } as React.CSSProperties}>
                                Introduction
                            </h1>
                            <div style={{ marginBottom: '2rem' }}>
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: 'var(--text-primary)',
                                    marginBottom: '0.5rem'
                                }}>
                                    Noor Mohammad Rahmani
                                </h2>
                                <p style={{
                                    fontSize: '1rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.6',
                                    marginBottom: '1rem'
                                }}>
                                    I am a passionate software developer from Afghanistan with over 3 years of experience
                                    in building modern web applications and mobile solutions. I specialize in full-stack
                                    development using cutting-edge technologies like Next.js, React, Node.js, and Flutter.
                                </p>
                                <p style={{
                                    fontSize: '1rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.6'
                                }}>
                                    My journey in technology started with a curiosity about how things work behind the scenes
                                    in digital products. This curiosity led me to dive deep into programming, where I discovered
                                    my passion for creating solutions that make a real difference in people's lives.
                                </p>
                            </div>
                        </div>

                        {/* Work Experience */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h1 style={{
                                fontSize: '2rem',
                                fontWeight: '300',
                                marginBottom: '2rem',
                                background: 'linear-gradient(135deg, rgba(255, 218, 185, 1) 0%, rgba(252, 180, 176, 0.9) 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            } as React.CSSProperties}>
                                Work Experience
                            </h1>

                            {/* Orhan Technology */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{
                                    borderLeft: '3px solid rgba(252, 180, 176, 0.5)',
                                    paddingLeft: '1.5rem',
                                    marginBottom: '2rem'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.25rem'
                                    }}>
                                        Frontend Developer - Orhan Technology
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '0.75rem'
                                    }}>
                                        March 2024 - Present
                                    </p>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        Leading frontend development projects using Next.js, React, and modern JavaScript.
                                        Collaborated with cross-functional teams to deliver high-quality web applications
                                        with focus on performance optimization and user experience.
                                    </p>
                                </div>
                            </div>

                            {/* YouTube Channel */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{
                                    borderLeft: '3px solid rgba(255, 192, 203, 0.5)',
                                    paddingLeft: '1.5rem',
                                    marginBottom: '2rem'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.25rem'
                                    }}>
                                        Content Creator - YouTube Channel
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '0.75rem'
                                    }}>
                                        January 2023 - Present
                                    </p>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        Creating educational content about web development, programming tutorials,
                                        and technology insights. Building a community of developers and sharing
                                        knowledge about modern development practices.
                                    </p>
                                </div>
                            </div>

                            {/* Netlinks */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{
                                    borderLeft: '3px solid rgba(255, 218, 185, 0.5)',
                                    paddingLeft: '1.5rem'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.25rem'
                                    }}>
                                        Full Stack Developer - Netlinks
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '0.75rem'
                                    }}>
                                        June 2022 - February 2024
                                    </p>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        Developed and maintained full-stack web applications using Node.js, Express,
                                        and React. Worked on database design, API development, and frontend implementation
                                        for various client projects.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Technical Skills */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h1 style={{
                                fontSize: '2rem',
                                fontWeight: '300',
                                marginBottom: '2rem',
                                background: 'linear-gradient(135deg, rgba(253, 230, 138, 1) 0%, rgba(255, 218, 185, 0.9) 50%, rgba(252, 180, 176, 0.8) 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            } as React.CSSProperties}>
                                Technical Skills
                            </h1>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {/* Next.js */}
                                <div>
                                    <h3 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Frontend Development
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        Next.js, React, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS,
                                        Responsive Design, Progressive Web Apps (PWA)
                                    </p>
                                </div>

                                {/* Backend */}
                                <div>
                                    <h3 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Backend Development
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        Node.js, Express.js, RESTful APIs, GraphQL, Authentication & Authorization,
                                        Server-side Rendering (SSR), Database Integration
                                    </p>
                                </div>

                                {/* Mobile */}
                                <div>
                                    <h3 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Mobile Development
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        Flutter, Dart, Cross-platform Development, Mobile UI/UX Design,
                                        State Management, Native Platform Integration
                                    </p>
                                </div>

                                {/* Tools & Technologies */}
                                <div>
                                    <h3 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Tools & Technologies
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        Git, GitHub, VS Code, Figma, Docker, AWS, Firebase, MongoDB, PostgreSQL,
                                        Vercel, Netlify, Performance Optimization
                                    </p>
                                </div>
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
