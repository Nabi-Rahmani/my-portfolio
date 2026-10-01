'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { atelierEase, selectTransition } from '@/core/lib/animations';
import type { BlogPostSummary } from '@/features/blog/domain/blog';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]';

/**
 * PRESENTATION — related writing cards.
 * Job: render summaries already selected by data helpers.
 */
export function RelatedPosts({
  posts,
  reduceMotion,
}: {
  posts: BlogPostSummary[];
  reduceMotion?: boolean | null;
}) {
  const prefersReduced = useReducedMotion();
  const reduced = reduceMotion ?? prefersReduced;

  if (posts.length === 0) return null;

  return (
    <motion.section
      className="mt-16 border-t border-[var(--line)] pt-16"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={selectTransition(reduced, {
        duration: 0.55,
        ease: atelierEase,
      })}
      aria-label="Related articles"
    >
      <h2 className="mb-2 font-[family-name:var(--font-serif)] text-[clamp(1.25rem,2.5vw,1.5rem)] tracking-tight text-[var(--ink)]">
        Keep Reading
      </h2>
      <p className="mb-8 text-[0.9375rem] text-[var(--muted)]">More articles you might enjoy</p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={selectTransition(reduced, {
              duration: 0.45,
              delay: Math.min(i * 0.08, 0.2),
              ease: atelierEase,
            })}
          >
            <Link
              href={`/blog/${post.slug}`}
              className={`group block h-full rounded-2xl no-underline ${focusRing}`}
            >
              <article className="h-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--cream-2)] transition-all duration-300 hover:border-[var(--atelier-accent)]/40 hover:shadow-[var(--shadow-md)]">
                <div className="relative h-[140px] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-5">
                  <div className="mb-2.5 flex items-center gap-2">
                    <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[0.6875rem] font-medium text-[var(--atelier-accent)]">
                      {post.category}
                    </span>
                    <span className="text-[0.6875rem] text-[var(--muted)]">
                      {post.readingTime} min
                    </span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 font-[family-name:var(--font-serif)] text-[0.9375rem] font-semibold leading-snug text-[var(--ink)] transition-colors duration-200 group-hover:text-[var(--atelier-accent)]">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
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
