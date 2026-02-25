'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/types/blog';
import { getRelatedPosts } from '@/data/blog';
import ShareButtons from '@/components/ShareButtons';
import ArticleContent from '@/components/ArticleContent';

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/* ─── Reading Progress Bar ─── */
function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--accent)] origin-left z-[100]"
            style={{ scaleX }}
        />
    );
}

/* ─── Table of Contents ─── */
function TableOfContents({ content }: { content: string }) {
    const [activeId, setActiveId] = useState<string>('');
    const headings = content.match(/^(#{2,3})\s+(.+)$/gm) || [];

    const tocItems = headings.map((heading, index) => {
        const level = heading.match(/^#+/)?.[0].length || 2;
        const text = heading.replace(/^#+\s+/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { level, text, id, index };
    });

    useEffect(() => {
        if (tocItems.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter(e => e.isIntersecting);
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
        );

        tocItems.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [tocItems]);

    if (tocItems.length === 0) return null;

    return (
        <div className="sticky top-28 rounded-2xl border border-[var(--border-color)] p-6">
            <h3 className="text-[0.8125rem] font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                On this page
            </h3>
            <nav className="space-y-1">
                {tocItems.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <a
                            key={item.index}
                            href={`#${item.id}`}
                            className={`block text-[0.8125rem] py-1.5 transition-all duration-200 border-l-2 ${
                                item.level === 2 ? 'pl-3' : 'pl-6'
                            } ${
                                isActive
                                    ? 'border-[var(--accent)] text-[var(--accent)] font-medium'
                                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-color)]'
                            }`}
                        >
                            {item.text}
                        </a>
                    );
                })}
            </nav>
        </div>
    );
}

/* ─── Related Posts ─── */
const RelatedPosts = ({ currentPost }: { currentPost: BlogPost }) => {
    const relatedPosts = getRelatedPosts(currentPost.id);

    if (relatedPosts.length === 0) return null;

    return (
        <motion.section
            className="mt-16 pt-16 border-t border-[var(--border-color)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        >
            <h2 className="text-[1.5rem] font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                Keep Reading
            </h2>
            <p className="text-[0.9375rem] text-[var(--text-secondary)] mb-8">
                More articles you might enjoy
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedPosts.map((post: BlogPost, i: number) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] as const }}
                        whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                    >
                        <Link
                            href={`/blog/${post.slug}`}
                            className="group no-underline block h-full"
                        >
                            <article className="h-full rounded-2xl border border-[var(--border-color)] overflow-hidden hover:border-[var(--accent)]/30 transition-all duration-300 hover:shadow-[var(--shadow-md)]">
                                <div className="h-[140px] relative overflow-hidden">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2.5">
                                        <span className="text-[0.6875rem] px-2 py-0.5 bg-[var(--accent-muted)] text-[var(--accent)] rounded-full font-medium">
                                            {post.category}
                                        </span>
                                        <span className="text-[0.6875rem] text-[var(--text-secondary)]">{post.readingTime} min</span>
                                    </div>
                                    <h3 className="text-[0.9375rem] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-[var(--text-secondary)] text-[0.8125rem] line-clamp-2 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

/* ─── Estimated Read Time Visual ─── */
function ReadTimeVisual({ minutes }: { minutes: number }) {
    return (
        <div className="flex items-center gap-2 text-[0.8125rem] text-[var(--text-secondary)]">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="text-[var(--accent)]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {minutes} min read
        </div>
    );
}

/* ─── Main Blog Post Client ─── */
export default function BlogPostClient({ post }: { post: BlogPost }) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Silently fail
        }
    }, []);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <ReadingProgress />

            {/* Hero Section */}
            <section className="relative">
                {/* Cover image with overlay */}
                <div className="relative h-[300px] md:h-[450px] overflow-hidden">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
                </div>

                {/* Content overlaying bottom of image */}
                <div className="relative -mt-32 md:-mt-44 z-10 px-6">
                    <div className="max-w-[800px] mx-auto">
                        {/* Breadcrumb */}
                        <motion.nav
                            className="mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <ol className="flex items-center gap-2 text-[0.8125rem]">
                                <li>
                                    <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li className="text-[var(--text-secondary)]">/</li>
                                <li>
                                    <Link href="/blog" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                                        Blog
                                    </Link>
                                </li>
                                <li className="text-[var(--text-secondary)]">/</li>
                                <li className="text-[var(--text-primary)] truncate max-w-[200px]">{post.title}</li>
                            </ol>
                        </motion.nav>

                        {/* Meta */}
                        <motion.div
                            className="flex flex-wrap items-center gap-3 mb-5"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <span className="px-3 py-1 bg-[var(--accent-muted)] text-[var(--accent)] rounded-full text-[0.75rem] font-medium">
                                {post.category}
                            </span>
                            <ReadTimeVisual minutes={post.readingTime} />
                            <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                                {formatDate(post.publishedAt)}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            className="text-[2rem] md:text-[2.75rem] font-bold leading-[1.15] mb-6 text-[var(--text-primary)] tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] as const }}
                        >
                            {post.title}
                        </motion.h1>

                        {/* Excerpt */}
                        <motion.p
                            className="text-[1.0625rem] md:text-[1.125rem] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-[650px]"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                        >
                            {post.excerpt}
                        </motion.p>

                        {/* Author + Share */}
                        <motion.div
                            className="flex items-center justify-between pb-8 border-b border-[var(--border-color)]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.35 }}
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="relative">
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover border-2 border-[var(--border-color)]"
                                    />
                                </div>
                                <div>
                                    <p className="text-[0.9375rem] font-semibold text-[var(--text-primary)]">
                                        {post.author.name}
                                    </p>
                                    <p className="text-[0.8125rem] text-[var(--text-secondary)]">
                                        {post.author.bio}
                                    </p>
                                </div>
                            </div>

                            {/* Quick share */}
                            <button
                                onClick={handleCopyLink}
                                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all duration-200 cursor-pointer bg-transparent text-[0.8125rem]"
                            >
                                {copied ? (
                                    <>
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-4.822a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.05 8.05" />
                                        </svg>
                                        Share
                                    </>
                                )}
                            </button>
                        </motion.div>

                        {/* Tags */}
                        <motion.div
                            className="flex flex-wrap gap-2 pt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.45 }}
                        >
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${tag}`}
                                    className="text-[0.8125rem] px-3 py-1 bg-[var(--accent-muted)] text-[var(--text-secondary)] rounded-full hover:text-[var(--accent)] transition-colors no-underline"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Article Content + TOC */}
            <div className="max-w-6xl mx-auto px-6 pt-12 pb-16">
                <div className="grid lg:grid-cols-[1fr_240px] gap-12">
                    <article>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <ArticleContent content={post.content} />
                        </motion.div>

                        {/* Bottom Share */}
                        <motion.div
                            className="mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                        >
                            <ShareButtons post={post} />
                        </motion.div>

                        <RelatedPosts currentPost={post} />
                    </article>

                    {/* Sidebar TOC */}
                    <motion.aside
                        className="hidden lg:block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <TableOfContents content={post.content} />
                    </motion.aside>
                </div>
            </div>

            {/* Footer */}
            <footer className="px-6 py-8 border-t border-[var(--border-color)]">
                <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                        &copy; 2025 Mohammad Nabi Rahmani
                    </span>
                    <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                        Built with Next.js &amp; Tailwind
                    </span>
                </div>
            </footer>
        </div>
    );
}
