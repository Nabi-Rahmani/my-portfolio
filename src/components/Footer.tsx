'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/Nabi-Rahmani',
        icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/muhammad-nabi-rahmani-8945b21ba/',
        icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
        label: 'X (Twitter)',
        href: 'https://x.com/nabirahmani_dev',
        icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
];

const quickLinks = [
    { label: 'Projects', href: '/#projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/#contact' },
];

interface FooterProps {
    showSocials?: boolean;
    links?: { label: string; href: string }[];
}

export default function Footer({ showSocials = false, links }: FooterProps) {
    const year = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative">
            {/* Accent gradient line at top */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60" />

            <div className="px-6 py-8 bg-[var(--bg-secondary)]">
                <div className="max-w-[1100px] mx-auto">
                    {/* Top section - Socials, tagline and quick links in one row */}
                    <div className="flex flex-col items-center gap-6 mb-6">
                        {/* Social icons with hover effects */}
                        {showSocials && (
                            <div className="flex items-center gap-2">
                                {socials.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:shadow-[0_0_16px_var(--accent-muted)] transition-all duration-300"
                                        aria-label={social.label}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={social.icon} />
                                        </svg>
                                    </motion.a>
                                ))}
                            </div>
                        )}

                        {/* Tagline and quick links on same line */}
                        <div className="flex flex-wrap justify-center items-center gap-4 text-center">
                            <span className="text-[0.875rem] text-[var(--text-secondary)]">
                                Crafting mobile experiences
                            </span>
                            <span className="hidden sm:inline text-[var(--text-secondary)] opacity-40">·</span>
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-[0.8125rem] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 no-underline"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Bottom section - Copyright and back to top */}
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                        <span className="text-[0.8125rem] font-medium text-[var(--text-secondary)]">
                            &copy; {year} Mohammad Nabi Rahmani
                        </span>

                        {/* Back to top button */}
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200 cursor-pointer group text-[0.75rem]"
                            aria-label="Back to top"
                        >
                            <span>Top</span>
                            <svg
                                width="12"
                                height="12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                className="group-hover:-translate-y-0.5 transition-transform duration-200"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}