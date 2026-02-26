'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CoursesPage() {
    return (
        <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <section className="hero-grid relative pt-32 md:pt-44 pb-20 md:pb-32 px-6">
                {/* Background glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full"
                        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.06 }}
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <div className="max-w-[640px] mx-auto text-center relative z-10">
                    {/* Icon */}
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[var(--accent-muted)] mb-8"
                        initial={{ opacity: 0, scale: 0, rotate: -20 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                    </motion.div>

                    <motion.h1
                        className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 }}
                    >
                        Courses
                    </motion.h1>

                    <motion.p
                        className="text-[1rem] md:text-[1.125rem] text-[var(--text-secondary)] leading-relaxed mb-10 max-w-[480px] mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}
                    >
                        In-depth courses on Flutter, mobile development, and shipping production apps are on the way.
                    </motion.p>

                    {/* Status badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-muted)] mb-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.3 }}
                    >
                        <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                        <span className="text-[0.875rem] font-medium text-[var(--accent)]">Coming Soon</span>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.4 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[0.9375rem] font-medium no-underline hover:bg-[var(--bg-secondary)] transition-colors"
                        >
                            Browse articles in the meantime
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
