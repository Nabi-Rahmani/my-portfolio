'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/types/blog';
import { getRelatedPosts } from '@/data/blog';
import ShareButtons from '@/components/ShareButtons';
import ArticleContent from '@/components/ArticleContent';
import Footer from '@/components/Footer';
import { formatDate } from '@/lib/utils';
import { atelierEase, selectTransition } from '@/lib/animations';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]';

/* ─── Reading Progress Bar ─── */
function ReadingProgress({ reduceMotion }: { reduceMotion: boolean | null }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 400 : 100,
    damping: reduceMotion ? 50 : 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--atelier-accent)] origin-left z-[100]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

/* ─── Table of Contents ─── */
function TableOfContents({
  content,
  reduceMotion,
}: {
  content: string;
  reduceMotion: boolean | null;
}) {
  const [activeId, setActiveId] = useState<string>('');
  const headings = content.match(/^(#{2,3})\s+(.+)$/gm) || [];

  const tocItems = headings.map((heading, index) => {
    const level = heading.match(/^#+/)?.[0].length || 2;
    const text = heading.replace(/^#+\s+/, '');
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return { level, text, id, index };
  });

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 },
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  return (
    <div className="sticky top-28 rounded-2xl border border-[var(--line)] bg-[var(--cream-2)] p-6">
      <h3
        className="text-[0.8125rem] font-semibold text-[var(--ink)] mb-4 uppercase tracking-wider flex items-center gap-2"
        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}
      >
        <svg
          className="w-4 h-4 text-[var(--atelier-accent)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
        On this page
      </h3>
      <nav className="space-y-1" aria-label="Table of contents">
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.index}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (!el) return;
                const top = el.getBoundingClientRect().top + window.scrollY - 96;
                window.scrollTo({
                  top,
                  behavior: reduceMotion ? 'auto' : 'smooth',
                });
                history.pushState(null, '', `#${item.id}`);
              }}
              className={`block text-[0.8125rem] py-1.5 transition-colors duration-200 border-l-2 ${focusRing} ${
                item.level === 2 ? 'pl-3' : 'pl-6'
              } ${
                isActive
                  ? 'border-[var(--atelier-accent)] text-[var(--atelier-accent)] font-medium'
                  : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--line)]'
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
function RelatedPosts({
  currentPost,
  reduceMotion,
}: {
  currentPost: BlogPost;
  reduceMotion: boolean | null;
}) {
  const relatedPosts = getRelatedPosts(currentPost.id);

  if (relatedPosts.length === 0) return null;

  return (
    <motion.section
      className="mt-16 pt-16 border-t border-[var(--line)]"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={selectTransition(reduceMotion, {
        duration: 0.55,
        ease: atelierEase,
      })}
      aria-label="Related articles"
    >
      <h2
        className="mb-2 tracking-tight text-[var(--ink)]"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
        }}
      >
        Keep Reading
      </h2>
      <p className="text-[0.9375rem] text-[var(--muted)] mb-8">
        More articles you might enjoy
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {relatedPosts.map((post: BlogPost, i: number) => (
          <motion.div
            key={post.id}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={selectTransition(reduceMotion, {
              duration: 0.45,
              delay: Math.min(i * 0.08, 0.2),
              ease: atelierEase,
            })}
          >
            <Link
              href={`/blog/${post.slug}`}
              className={`group no-underline block h-full ${focusRing} rounded-2xl`}
            >
              <article className="h-full rounded-2xl border border-[var(--line)] bg-[var(--cream-2)] overflow-hidden hover:border-[var(--atelier-accent)]/40 transition-all duration-300 hover:shadow-[var(--shadow-md)]">
                <div className="h-[140px] relative overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover motion-safe:group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[0.6875rem] px-2 py-0.5 bg-[var(--accent-soft)] text-[var(--atelier-accent)] rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-[0.6875rem] text-[var(--muted)]">
                      {post.readingTime} min
                    </span>
                  </div>
                  <h3
                    className="text-[0.9375rem] font-semibold text-[var(--ink)] group-hover:text-[var(--atelier-accent)] transition-colors duration-200 leading-snug mb-2 line-clamp-2"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-[var(--muted)] text-[0.8125rem] line-clamp-2 leading-relaxed">
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
}

/* ─── Estimated Read Time Visual ─── */
function ReadTimeVisual({ minutes }: { minutes: number }) {
  return (
    <div className="flex items-center gap-2 text-[0.8125rem] text-[var(--muted)]">
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        className="text-[var(--atelier-accent)]"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {minutes} min read
    </div>
  );
}

/* ─── Main Blog Post Client ─── */
export default function BlogPostClient({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail
    }
  }, []);

  const enter = (delay = 0) =>
    selectTransition(reduceMotion, {
      duration: 0.5,
      delay,
      ease: atelierEase,
    });

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <ReadingProgress reduceMotion={reduceMotion} />

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[300px] md:h-[450px] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[var(--cream)]/75" />
        </div>

        <div className="relative -mt-32 md:-mt-44 z-10 px-6 md:px-12">
          <div className="max-w-[800px] mx-auto">
            {/* Breadcrumb */}
            <motion.nav
              className="mb-6"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0)}
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center gap-2 text-[0.8125rem]">
                <li>
                  <Link
                    href="/"
                    className={`text-[var(--muted)] hover:text-[var(--atelier-accent)] transition-colors ${focusRing} rounded`}
                  >
                    Home
                  </Link>
                </li>
                <li className="text-[var(--muted)]" aria-hidden>
                  /
                </li>
                <li>
                  <Link
                    href="/blog"
                    className={`text-[var(--muted)] hover:text-[var(--atelier-accent)] transition-colors ${focusRing} rounded`}
                  >
                    Articles
                  </Link>
                </li>
                <li className="text-[var(--muted)]" aria-hidden>
                  /
                </li>
                <li className="text-[var(--ink)] truncate max-w-[200px]">
                  {post.title}
                </li>
              </ol>
            </motion.nav>

            {/* Meta */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mb-5"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.08)}
            >
              <span className="px-3 py-1 bg-[var(--accent-soft)] text-[var(--atelier-accent)] rounded-full text-[0.75rem] font-medium">
                {post.category}
              </span>
              <ReadTimeVisual minutes={post.readingTime} />
              <span className="text-[0.8125rem] text-[var(--muted)]">
                {formatDate(post.publishedAt)}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="leading-[1.15] mb-6 text-[var(--ink)] tracking-tight"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
              }}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.14)}
            >
              {post.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              className="text-[1.0625rem] md:text-[1.125rem] text-[var(--ink-soft)] leading-relaxed mb-8 max-w-[650px]"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.2)}
            >
              {post.excerpt}
            </motion.p>

            {/* Author + Share */}
            <motion.div
              className="flex items-center justify-between pb-8 border-b border-[var(--line)]"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.26)}
            >
              <div className="flex items-center gap-3.5">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-[var(--line)]"
                />
                <div>
                  <p className="text-[0.9375rem] font-semibold text-[var(--ink)]">
                    {post.author.name}
                  </p>
                  <p className="text-[0.8125rem] text-[var(--muted)]">
                    {post.author.bio}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--atelier-accent)] hover:border-[var(--atelier-accent)]/40 transition-colors duration-200 cursor-pointer bg-transparent text-[0.8125rem] ${focusRing}`}
              >
                {copied ? (
                  <>
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-4.822a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.05 8.05"
                      />
                    </svg>
                    Share
                  </>
                )}
              </button>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 pt-6"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={enter(0.32)}
            >
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className={`text-[0.8125rem] px-3 py-1 border border-[var(--line)] text-[var(--muted)] rounded-full hover:text-[var(--atelier-accent)] hover:border-[var(--atelier-accent)]/40 transition-colors no-underline ${focusRing}`}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
                >
                  {tag}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content + TOC */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-12 pb-16">
        <div className="grid lg:grid-cols-[1fr_240px] gap-12">
          <article>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.36)}
            >
              <ArticleContent content={post.content} />
            </motion.div>

            <motion.div
              className="mt-12"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={selectTransition(reduceMotion, {
                duration: 0.4,
                ease: atelierEase,
              })}
            >
              <ShareButtons post={post} />
            </motion.div>

            <RelatedPosts currentPost={post} reduceMotion={reduceMotion} />
          </article>

          <motion.aside
            className="hidden lg:block"
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={enter(0.4)}
          >
            <TableOfContents content={post.content} reduceMotion={reduceMotion} />
          </motion.aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
