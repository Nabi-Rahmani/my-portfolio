'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center px-6">
            <div className="text-center max-w-[480px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                >
                    <span className="text-[6rem] md:text-[8rem] font-bold text-[var(--accent)] leading-none block">
                        404
                    </span>
                </motion.div>

                <motion.h1
                    className="text-[1.5rem] md:text-[2rem] font-bold tracking-tight mt-4 mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 }}
                >
                    Page not found
                </motion.h1>

                <motion.p
                    className="text-[0.9375rem] md:text-[1rem] text-[var(--text-secondary)] leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}
                >
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </motion.p>

                <motion.div
                    className="flex gap-3 justify-center flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.3 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-full text-[0.9375rem] font-semibold no-underline"
                    >
                        Go home
                    </Link>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[0.9375rem] font-medium no-underline hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                        Browse blog
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
