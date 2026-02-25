'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlogPost } from '@/types/blog';

const ShareButtons = ({ post }: { post: BlogPost }) => {
    const [copied, setCopied] = useState(false);

    const getUrl = () => (typeof window !== 'undefined' ? window.location.href : '');

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(getUrl())}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`,
    };

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(getUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // Silently fail
        }
    }, []);

    const buttons = [
        {
            href: shareLinks.twitter,
            label: 'Twitter',
            icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
        },
        {
            href: shareLinks.linkedin,
            label: 'LinkedIn',
            icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
        },
    ];

    return (
        <div className="relative flex items-center gap-4 p-6 rounded-2xl border border-[var(--border-color)]">
            <span className="text-[0.875rem] font-medium text-[var(--text-secondary)]">Share:</span>
            <div className="flex gap-2">
                {buttons.map((btn) => (
                    <a
                        key={btn.label}
                        href={btn.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 hover:bg-[var(--accent-muted)] transition-all duration-200"
                        title={`Share on ${btn.label}`}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d={btn.icon} />
                        </svg>
                    </a>
                ))}
                <button
                    onClick={copyToClipboard}
                    className="p-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 hover:bg-[var(--accent-muted)] transition-all duration-200 cursor-pointer bg-transparent"
                    title="Copy link"
                >
                    {copied ? (
                        <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Toast notification */}
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[0.8125rem] font-medium whitespace-nowrap shadow-[var(--shadow-lg)]"
                    >
                        Link copied!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ShareButtons;
