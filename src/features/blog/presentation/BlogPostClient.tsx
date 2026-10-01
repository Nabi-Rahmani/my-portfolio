'use client';

import { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import ArticleContent from '@/features/blog/presentation/ArticleContent';
import { ReadingProgress } from '@/features/blog/presentation/post/ReadingProgress';
import { ReadTimeVisual } from '@/features/blog/presentation/post/ReadTimeVisual';
import { RelatedPosts } from '@/features/blog/presentation/post/RelatedPosts';
import { TableOfContents } from '@/features/blog/presentation/post/TableOfContents';
import ShareButtons from '@/features/blog/presentation/ShareButtons';
import Footer from '@/core/presentation/layout/Footer';
import { atelierEase, selectTransition } from '@/core/lib/animations';
import { formatDate } from '@/core/lib/utils';
import type { BlogPost, BlogPostSummary } from '@/features/blog/domain/blog';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]';

/**
 * PRESENTATION CONTROLLER — thin bridge for a writing post.
 * Job: copy-link view state, compose hero/article/TOC/related sections.
 */
export default function BlogPostClient({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPostSummary[];
}) {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be blocked; the article remains readable.
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

      <section className="relative">
        <div className="relative h-[300px] overflow-hidden md:h-[450px]">
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

        <div className="relative z-10 -mt-32 px-6 md:-mt-44 md:px-12">
          <div className="mx-auto max-w-[800px]">
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
                    className={`rounded text-[var(--muted)] transition-colors hover:text-[var(--atelier-accent)] ${focusRing}`}
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
                    className={`rounded text-[var(--muted)] transition-colors hover:text-[var(--atelier-accent)] ${focusRing}`}
                  >
                    Articles
                  </Link>
                </li>
                <li className="text-[var(--muted)]" aria-hidden>
                  /
                </li>
                <li className="max-w-[200px] truncate text-[var(--ink)]">{post.title}</li>
              </ol>
            </motion.nav>

            <motion.div
              className="mb-5 flex flex-wrap items-center gap-3"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.08)}
            >
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[0.75rem] font-medium text-[var(--atelier-accent)]">
                {post.category}
              </span>
              <ReadTimeVisual minutes={post.readingTime} />
              <span className="text-[0.8125rem] text-[var(--muted)]">
                {formatDate(post.publishedAt)}
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.15] tracking-tight text-[var(--ink)]"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.14)}
            >
              {post.title}
            </motion.h1>

            <motion.p
              className="mb-8 max-w-[650px] text-[1.0625rem] leading-relaxed text-[var(--ink-soft)] md:text-[1.125rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.2)}
            >
              {post.excerpt}
            </motion.p>

            <motion.div
              className="flex items-center justify-between border-b border-[var(--line)] pb-8"
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
                  className="rounded-full border-2 border-[var(--line)] object-cover"
                />
                <div>
                  <p className="text-[0.9375rem] font-semibold text-[var(--ink)]">
                    {post.author.name}
                  </p>
                  <p className="text-[0.8125rem] text-[var(--muted)]">{post.author.bio}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className={`hidden cursor-pointer items-center gap-2 rounded-full border border-[var(--line)] bg-transparent px-4 py-2 text-[0.8125rem] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--atelier-accent)]/40 hover:text-[var(--atelier-accent)] md:flex ${focusRing}`}
              >
                {copied ? 'Copied!' : 'Share'}
              </button>
            </motion.div>

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
                  className={`rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[0.75rem] text-[var(--muted)] no-underline transition-colors hover:border-[var(--atelier-accent)]/40 hover:text-[var(--atelier-accent)] ${focusRing}`}
                >
                  {tag}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-12 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
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

            <RelatedPosts posts={relatedPosts} reduceMotion={reduceMotion} />
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
