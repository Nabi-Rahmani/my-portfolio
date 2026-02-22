'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { getRelatedPosts } from '@/data/blog';
import ShareButtons from '@/components/ShareButtons';
import ArticleContent from '@/components/ArticleContent';

const RelatedPosts = ({ currentPost }: { currentPost: BlogPost }) => {
    const relatedPosts = getRelatedPosts(currentPost.id);

    if (relatedPosts.length === 0) return null;

    return (
        <motion.section
            className="mt-16 pt-16 border-t border-[var(--border-color)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 16 }}
        >
            <h2 className="text-h2 font-bold text-[var(--text-primary)] mb-8">
                Related Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post: BlogPost, i: number) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 16, delay: i * 0.1 }}
                        whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
                    >
                        <Link
                            href={`/blog/${post.slug}`}
                            className="group no-underline block"
                        >
                            <article className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] overflow-hidden hover:border-[var(--accent)] transition-colors">
                                <div className="h-32 relative overflow-hidden">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="text-xs px-2 py-1 bg-[var(--accent-muted)] text-[var(--accent)] rounded-full">
                                        {post.category}
                                    </span>
                                    <h3 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mt-3 mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-[var(--text-secondary)] text-sm line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-4 text-xs text-[var(--text-secondary)]">
                                        <span>{post.readingTime} min read</span>
                                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default function BlogPostClient({ post }: { post: BlogPost }) {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-6">
                {/* Breadcrumb */}
                <motion.nav
                    className="mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ol className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <li><Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Home</Link></li>
                        <li>&rarr;</li>
                        <li><Link href="/blog" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Blog</Link></li>
                        <li>&rarr;</li>
                        <li className="text-[var(--text-primary)]">{post.title}</li>
                    </ol>
                </motion.nav>

                {/* Hero Cover Image */}
                <motion.div
                    className="relative w-full h-[280px] md:h-[400px] rounded-2xl overflow-hidden mb-10 border border-[var(--border-color)]"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 16, delay: 0.1 }}
                >
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority
                    />
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-12">
                    <article className="lg:col-span-3">
                        <header className="mb-12">
                            <motion.div
                                className="flex items-center gap-4 text-sm mb-4 text-[var(--text-secondary)]"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <span className="px-3 py-1 bg-[var(--accent-muted)] text-[var(--accent)] rounded-full text-xs font-medium">
                                    {post.category}
                                </span>
                                <span>{post.readingTime} min read</span>
                                <span>&bull;</span>
                                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </motion.div>

                            <motion.h1
                                className="text-h1 lg:text-display font-bold leading-tight mb-6 text-[var(--text-primary)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 100, damping: 16, delay: 0.25 }}
                            >
                                {post.title}
                            </motion.h1>

                            <motion.p
                                className="text-body-lg leading-relaxed mb-8 text-[var(--text-secondary)]"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.35 }}
                            >
                                {post.excerpt}
                            </motion.p>

                            <motion.div
                                className="flex items-center gap-4 pb-8 border-b border-[var(--border-color)]"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={56}
                                    height={56}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-[var(--text-primary)]">
                                        {post.author.name}
                                    </p>
                                    <p className="text-[var(--text-secondary)]">
                                        {post.author.bio}
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex flex-wrap gap-2 pt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                            >
                                {post.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/blog?tag=${tag}`}
                                        className="text-sm px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full hover:bg-[var(--accent-muted)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </motion.div>
                        </header>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <ArticleContent content={post.content} />
                        </motion.div>

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

                    <motion.aside
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 80, damping: 16, delay: 0.6 }}
                    >
                        <TableOfContents content={post.content} />
                    </motion.aside>
                </div>
            </div>
        </div>
    );
}

/* ─── Table of Contents (moved here since this is now the client component) ─── */
function TableOfContents({ content }: { content: string }) {
    const headings = content.match(/^(#{2,3})\s+(.+)$/gm) || [];

    if (headings.length === 0) return null;

    const tocItems = headings.map((heading, index) => {
        const level = heading.match(/^#+/)?.[0].length || 2;
        const text = heading.replace(/^#+\s+/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        return { level, text, id, index };
    });

    return (
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6 sticky top-24 border border-[var(--border-color)]">
            <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Table of Contents
            </h3>
            <nav className="space-y-2">
                {tocItems.map((item) => (
                    <a
                        key={item.index}
                        href={`#${item.id}`}
                        className={`block text-sm hover:text-[var(--accent)] transition-colors ${item.level === 2
                            ? 'text-[var(--text-primary)] font-medium'
                            : 'text-[var(--text-secondary)] ml-4'
                            }`}
                    >
                        {item.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
