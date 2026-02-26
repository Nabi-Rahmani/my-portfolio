'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts, blogCategories, getFeaturedPosts, getAllTags, searchPosts, getPostsByCategory, getPostsByTag } from '@/data/blog';
import type { BlogPost, BlogFilter } from '@/types/blog';
import Footer from '@/components/Footer';

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

/* ─── Featured Hero Card ─── */
const FeaturedCard = ({ post }: { post: BlogPost }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
    >
        <Link href={`/blog/${post.slug}`} className="group no-underline block">
            <article className="relative rounded-3xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent)]/30 transition-all duration-500 hover:shadow-[var(--shadow-lg)]">
                {/* Full-width image */}
                <div className="relative h-[300px] md:h-[420px] overflow-hidden">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        sizes="(max-width: 1200px) 100vw, 1100px"
                        priority
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Featured badge */}
                    <div className="absolute top-5 left-5">
                        <span className="px-3 py-1.5 rounded-full bg-[var(--accent)] text-white text-[0.6875rem] font-semibold uppercase tracking-wider backdrop-blur-sm">
                            Featured
                        </span>
                    </div>

                    {/* Content overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-[0.75rem] font-medium">
                                {post.category}
                            </span>
                            <span className="text-[0.8125rem] text-white/70">
                                {post.readingTime} min read
                            </span>
                            <span className="text-[0.8125rem] text-white/50">&middot;</span>
                            <span className="text-[0.8125rem] text-white/70">
                                {formatDate(post.publishedAt)}
                            </span>
                        </div>

                        <h2 className="text-[1.5rem] md:text-[2rem] font-bold text-white leading-tight mb-3 group-hover:text-[var(--accent)] transition-colors duration-300 max-w-[700px]">
                            {post.title}
                        </h2>

                        <p className="text-[0.9375rem] text-white/75 leading-relaxed mb-5 max-w-[600px] line-clamp-2 hidden md:block">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center gap-3">
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={32}
                                height={32}
                                className="rounded-full object-cover border border-white/20"
                            />
                            <span className="text-[0.8125rem] font-medium text-white/90">{post.author.name}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    </motion.div>
);

/* ─── Big Full-Width Card ─── */
const BigCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.05 }}
        className="group rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500"
    >
        <Link href={`/blog/${post.slug}`} className="no-underline block">
            <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 1000px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
        </Link>
        <div className="p-7 md:p-10">
            <Link href={`/blog/${post.slug}`} className="no-underline block">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] text-[0.75rem] font-medium">
                        {post.category}
                    </span>
                    <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                        {post.readingTime} min read
                    </span>
                    <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                        &middot; {formatDate(post.publishedAt)}
                    </span>
                </div>
                <h3 className="text-[1.75rem] md:text-[2.25rem] font-bold text-[var(--text-primary)] mb-3 tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                    {post.title}
                </h3>
                <p className="text-[1rem] md:text-[1.0625rem] text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {post.excerpt}
                </p>
            </Link>
            <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-[var(--accent-muted)] text-[var(--text-secondary)] rounded-lg text-[0.8125rem]">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex items-center gap-3">
                <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                />
                <span className="text-[0.875rem] text-[var(--text-secondary)]">
                    {post.author.name}
                </span>
            </div>
        </div>
    </motion.div>
);

/* ─── Grid Card (smaller, for 2-column rows) ─── */
const GridCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.08 }}
        className="group rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500 h-full"
    >
        <Link href={`/blog/${post.slug}`} className="no-underline block h-full flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2.5 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] text-[0.6875rem] font-medium">
                        {post.category}
                    </span>
                    <span className="text-[0.75rem] text-[var(--text-secondary)]">
                        {post.readingTime} min
                    </span>
                </div>
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-bold text-[var(--text-primary)] mb-2.5 tracking-tight leading-snug group-hover:text-[var(--accent)] transition-colors duration-300">
                    {post.title}
                </h3>
                <p className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed mb-5 flex-1 line-clamp-2">
                    {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-2.5">
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
                        />
                        <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                            {post.author.name}
                        </span>
                    </div>
                    <span className="text-[0.75rem] text-[var(--text-secondary)]">
                        {formatDate(post.publishedAt)}
                    </span>
                </div>
            </div>
        </Link>
    </motion.div>
);

/* ─── Renders posts in 1-big + 2-grid repeating pattern ─── */
function PostGrid({ posts }: { posts: BlogPost[] }) {
    const rows: React.ReactNode[] = [];
    let i = 0;

    while (i < posts.length) {
        // Big card
        rows.push(
            <BigCard key={posts[i].id} post={posts[i]} index={i} />
        );
        i++;

        // 2-column grid row
        if (i < posts.length) {
            const pair = posts.slice(i, i + 2);
            rows.push(
                <div key={`grid-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pair.map((post, j) => (
                        <GridCard key={post.id} post={post} index={i + j} />
                    ))}
                </div>
            );
            i += pair.length;
        }
    }

    return <div className="flex flex-col gap-10">{rows}</div>;
}

/* ─── Main Page ─── */
export default function BlogPage() {
    const [filters, setFilters] = useState<BlogFilter>({});
    const allTags = getAllTags();
    const featuredPosts = getFeaturedPosts();
    const hasActiveFilters = !!(filters.search || filters.category || filters.tag);

    const filteredPosts = useMemo(() => {
        let posts = blogPosts;
        if (filters.search) posts = searchPosts(filters.search);
        if (filters.category) posts = posts.filter(post => getPostsByCategory(filters.category!).includes(post));
        if (filters.tag) posts = posts.filter(post => getPostsByTag(filters.tag!).includes(post));
        return posts;
    }, [filters]);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            {/* Hero Header */}
            <section className="hero-grid">
                <div className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-20 px-6">
                    <div className="max-w-[900px] mx-auto">
                        <motion.p
                            className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-4"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Blog
                        </motion.p>
                        <motion.h1
                            className="text-[2.25rem] md:text-[3.25rem] font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-5"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] as const }}
                        >
                            Insights & Tutorials
                        </motion.h1>
                        <motion.p
                            className="text-[1.0625rem] md:text-[1.125rem] text-[var(--text-secondary)] leading-relaxed max-w-[600px]"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Thoughts on Flutter development, mobile architecture, backend integration, and the craft of building great apps.
                        </motion.p>

                        {/* Stats bar */}
                        <motion.div
                            className="flex items-center gap-6 mt-8"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="flex items-center gap-2 text-[0.875rem] text-[var(--text-secondary)]">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                                {blogPosts.length} Articles
                            </div>
                            <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)] opacity-40" />
                            <div className="flex items-center gap-2 text-[0.875rem] text-[var(--text-secondary)]">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                </svg>
                                {blogCategories.filter(c => c.count > 0).length} Categories
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="max-w-[1000px] mx-auto px-6">
                {/* Search + Filters */}
                <motion.div
                    className="mb-12 space-y-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                >
                    {/* Search Bar */}
                    <div className="relative max-w-[480px]">
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--text-secondary)]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={filters.search || ''}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value || undefined })}
                            className="w-full pl-11 pr-4 py-3 rounded-xl text-[0.9375rem] bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/30 transition-all"
                        />
                    </div>

                    {/* Category Tabs + Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setFilters({ ...filters, category: undefined })}
                            className={`px-4 py-2 rounded-full text-[0.8125rem] font-medium transition-all duration-200 border cursor-pointer ${
                                !filters.category
                                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent'
                                    : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                            }`}
                        >
                            All
                        </button>
                        {blogCategories.filter(c => c.count > 0).map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setFilters({ ...filters, category: filters.category === category.slug ? undefined : category.slug })}
                                className={`px-4 py-2 rounded-full text-[0.8125rem] font-medium transition-all duration-200 border cursor-pointer ${
                                    filters.category === category.slug
                                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent'
                                        : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                                }`}
                            >
                                {category.name}
                                <span className="ml-1.5 text-[0.6875rem] opacity-60">({category.count})</span>
                            </button>
                        ))}

                        <span className="w-px h-6 bg-[var(--border-color)] mx-1 hidden md:block" />

                        {allTags.slice(0, 5).map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setFilters({ ...filters, tag: filters.tag === tag ? undefined : tag })}
                                className={`px-3 py-1.5 rounded-full text-[0.75rem] transition-all duration-200 border cursor-pointer ${
                                    filters.tag === tag
                                        ? 'bg-[var(--accent)] text-white border-transparent'
                                        : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--text-primary)]'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Active Filters */}
                    <AnimatePresence>
                        {hasActiveFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center gap-2 text-[0.8125rem] overflow-hidden"
                            >
                                <span className="text-[var(--text-secondary)]">Filtering by:</span>
                                {filters.search && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-muted)] border border-[var(--accent)]/20 text-[var(--text-primary)]">
                                        &ldquo;{filters.search}&rdquo;
                                        <button onClick={() => setFilters({ ...filters, search: undefined })} className="text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer bg-transparent border-none p-0 text-base leading-none">&times;</button>
                                    </span>
                                )}
                                {filters.category && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-muted)] border border-[var(--accent)]/20 text-[var(--text-primary)]">
                                        {filters.category}
                                        <button onClick={() => setFilters({ ...filters, category: undefined })} className="text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer bg-transparent border-none p-0 text-base leading-none">&times;</button>
                                    </span>
                                )}
                                {filters.tag && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-muted)] border border-[var(--accent)]/20 text-[var(--text-primary)]">
                                        {filters.tag}
                                        <button onClick={() => setFilters({ ...filters, tag: undefined })} className="text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer bg-transparent border-none p-0 text-base leading-none">&times;</button>
                                    </span>
                                )}
                                <button
                                    onClick={() => setFilters({})}
                                    className="text-[var(--accent)] hover:underline cursor-pointer bg-transparent border-none p-0 text-[0.8125rem] ml-1"
                                >
                                    Clear all
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Featured Post (only when no filters) */}
                {!hasActiveFilters && featuredPosts.length > 0 && (
                    <section className="mb-16">
                        <FeaturedCard post={featuredPosts[0]} />
                    </section>
                )}

                {/* Posts Grid */}
                <section className="pb-12">
                    <motion.div
                        className="flex items-center justify-between mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-[1.25rem] font-semibold text-[var(--text-primary)]">
                            {hasActiveFilters ? `${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''}` : 'All Articles'}
                        </h2>
                    </motion.div>

                    {filteredPosts.length > 0 ? (
                        <PostGrid
                            posts={filteredPosts.filter(p => !hasActiveFilters ? !p.featured : true)}
                        />
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center mx-auto mb-5">
                                <svg className="w-7 h-7 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <h3 className="text-[1.125rem] font-semibold text-[var(--text-primary)] mb-2">
                                No articles found
                            </h3>
                            <p className="text-[0.9375rem] text-[var(--text-secondary)] mb-6">
                                Try a different search term or browse all categories.
                            </p>
                            <button
                                onClick={() => setFilters({})}
                                className="px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[0.875rem] font-medium hover:opacity-90 transition-opacity cursor-pointer border-none"
                            >
                                View all articles
                            </button>
                        </motion.div>
                    )}
                </section>

                {/* Newsletter / CTA */}
                <motion.section
                    className="mb-8 py-14 md:py-16 px-8 md:px-14 rounded-3xl border border-[var(--border-color)] text-center relative overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                >
                    {/* Subtle glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--accent)] opacity-[0.03] rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center mx-auto mb-5">
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="text-[var(--accent)]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                        </div>

                        <h3 className="text-[1.5rem] md:text-[1.75rem] font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                            Stay in the loop
                        </h3>
                        <p className="text-[1rem] text-[var(--text-secondary)] mb-8 max-w-[440px] mx-auto leading-relaxed">
                            Follow along for new tutorials, Flutter tips, and behind-the-scenes of building mobile apps.
                        </p>
                        <div className="flex gap-3 justify-center flex-wrap">
                            <a
                                href="https://x.com/nabirahmani_dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-[0.875rem] font-medium no-underline hover:opacity-90 transition-opacity"
                            >
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                Follow on Twitter
                            </a>
                            <a
                                href="https://github.com/Nabi-Rahmani"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[0.875rem] font-medium no-underline hover:border-[var(--text-secondary)] transition-all duration-200"
                            >
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                Follow on GitHub
                            </a>
                        </div>
                    </div>
                </motion.section>
            </div>

            <Footer />
        </div>
    );
}
