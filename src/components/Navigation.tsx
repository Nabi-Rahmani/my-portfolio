'use client';

import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

declare global {
    interface Window {
        __lenis?: {
            scrollTo: (target: HTMLElement | string, options?: { offset?: number; immediate?: boolean }) => void;
        };
    }
}

type NavSection = 'home' | 'projects' | 'blog' | 'about' | 'contact';

const navItems: {
    section: NavSection;
    label: string;
    href: string;
    hash: string;
    icon: string;
}[] = [
    {
        section: 'home',
        label: 'Home',
        href: '/#home',
        hash: '#home',
        icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    },
    {
        section: 'projects',
        label: 'Projects',
        href: '/#projects',
        hash: '#projects',
        icon: 'M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h8v8h-8v-8zm2 2v4h4v-4h-4z',
    },
    {
        section: 'blog',
        label: 'Blog',
        href: '/blog',
        hash: '#blog',
        icon: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.99 4H7V9h7.01V7zm3 4H7v2h10.01v-2zm0 4H7v2h10.01v-2z',
    },
    {
        section: 'about',
        label: 'About',
        href: '/#about',
        hash: '#about',
        icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    },
    {
        section: 'contact',
        label: 'Contact',
        href: '/#contact',
        hash: '#contact',
        icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    },
];

export default function Navigation() {
    const [isDark, setIsDark] = useState(false);
    const [activeHash, setActiveHash] = useState<string>('#home');
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setIsDark(shouldBeDark);
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const handleHashChange = () => {
            setActiveHash(window.location.hash || '#home');
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        if (newTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const isActive = (section: NavSection) => {
        const hash = activeHash || '#home';

        if (pathname === '/' || pathname === '') {
            if (section === 'home') return hash === '#home' || hash === '';
            return hash === `#${section}`;
        }

        if (pathname.startsWith('/projects') && section === 'projects') return true;
        if (pathname.startsWith('/blog') && section === 'blog') return true;
        if (pathname.startsWith('/about') && section === 'about') return true;
        if (pathname.startsWith('/contact') && section === 'contact') return true;

        return section === 'home';
    };

    const handleNavClick = (hash: string) => (event: MouseEvent<HTMLAnchorElement>) => {
        if (typeof window === 'undefined') return;

        const onHome = pathname === '/' || pathname === '';

        if (!onHome) {
            setActiveHash(hash);
            return;
        }

        event.preventDefault();

        const target = document.querySelector(hash) as HTMLElement | null;
        const lenis = window.__lenis;

        if (target && lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(target, { offset: -80 });
        } else if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (window.location.hash !== hash) {
            window.history.pushState(null, '', hash);
        }

        setActiveHash(hash);
    };

    const isLessonPage = pathname.match(/^\/courses\/[^/]+\/[^/]+$/);

    return (
        <>
            {/* Desktop Navigation — Floating Centered Pill */}
            <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center pt-4 pointer-events-none">
                <nav className="pointer-events-auto flex items-center gap-1 px-2 py-1.5 rounded-full bg-[var(--bg-secondary)]/80 backdrop-blur-xl border border-[var(--border-color)] shadow-[var(--shadow-lg)]">
                    {/* Brand / Home link */}
                    <Link
                        href="/#home"
                        onClick={handleNavClick('#home')}
                        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full no-underline transition-colors duration-200 text-[var(--text-primary)]"
                    >
                        {isActive('home') && (
                            <motion.span
                                layoutId="nav-active-pill"
                                className="absolute inset-0 rounded-full bg-[var(--accent-muted)]"
                                style={{ zIndex: -1 }}
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                        <svg
                            width="18"
                            height="18"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="shrink-0"
                        >
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                        <span className="text-[0.8125rem] font-semibold tracking-tight">codewithnabi</span>
                    </Link>

                    {/* Divider */}
                    <span className="w-px h-5 bg-[var(--border-color)] mx-0.5" />

                    {/* Nav items (skip Home since brand link handles it) */}
                    {navItems.filter((item) => item.section !== 'home').map((item) => {
                        const active = isActive(item.section);

                        return (
                            <Link
                                key={item.section}
                                href={item.href}
                                onClick={item.section !== 'blog' ? handleNavClick(item.hash) : undefined}
                                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full no-underline transition-colors duration-200 ${
                                    active
                                        ? 'text-[var(--text-primary)]'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="nav-active-pill"
                                        className="absolute inset-0 rounded-full bg-[var(--accent-muted)]"
                                        style={{ zIndex: -1 }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <svg
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="shrink-0"
                                >
                                    <path d={item.icon} />
                                </svg>
                                <span className="text-[0.8125rem] font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    {/* Divider */}
                    <span className="w-px h-5 bg-[var(--border-color)] mx-0.5" />

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer border-none bg-transparent"
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                        ) : (
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        )}
                    </button>
                </nav>
            </header>

            {/* Mobile Bottom Navigation */}
            {!isLessonPage && (
                <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 items-center justify-around px-2 py-2 bg-[var(--bg-primary)] border-t border-[var(--border-color)] safe-area-pb">
                    {([
                        { section: 'home' as NavSection, label: 'Home', href: '/', hash: '#home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
                        { section: 'projects' as NavSection, label: 'Projects', href: '/#projects', hash: '#projects', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' },
                        { section: 'blog' as NavSection, label: 'Blog', href: '/blog', hash: '#blog', icon: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.99 4H7V9h7.01V7zm3 4H7v2h10.01v-2zm0 4H7v2h10.01v-2z' },
                        { section: 'about' as NavSection, label: 'About', href: '/#about', hash: '#about', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
                        { section: 'contact' as NavSection, label: 'Contact', href: '/#contact', hash: '#contact', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
                    ] as const).map((item) => (
                        <Link
                            key={item.section}
                            href={item.href}
                            onClick={item.section !== 'blog' ? handleNavClick(item.hash) : undefined}
                            className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl no-underline transition-all duration-200 ${
                                isActive(item.section)
                                    ? 'text-[var(--accent)]'
                                    : 'text-[var(--text-secondary)]'
                            }`}
                        >
                            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                                <path d={item.icon} />
                            </svg>
                            <span className={`text-[0.625rem] ${isActive(item.section) ? 'font-semibold' : ''}`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl border-none bg-transparent text-[var(--text-secondary)] cursor-pointer"
                    >
                        {isDark ? (
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                        ) : (
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        )}
                        <span className="text-[0.625rem]">Theme</span>
                    </button>
                </nav>
            )}
        </>
    );
}
