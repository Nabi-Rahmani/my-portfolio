'use client';

import { useMemo, useRef, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SkeletonBlogCard } from '@/components/ui/Skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  blogPosts,
  blogCategories,
  getFeaturedPosts,
  getAllTags,
  searchPosts,
  getPostsByCategory,
  getPostsByTag,
} from '@/data/blog';
import type { BlogPost, BlogFilter } from '@/types/blog';
import Footer from '@/components/Footer';
import { formatDateShort as formatDate } from '@/lib/utils';
import { atelierEase, selectTransition } from '@/lib/animations';
import { socialLinks } from '@/config/navigation';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]';

/* ─── Featured Hero Card ─── */
function FeaturedCard({
  post,
  reduceMotion,
}: {
  post: BlogPost;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={selectTransition(reduceMotion, {
        duration: 0.55,
        ease: atelierEase,
      })}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`group no-underline block ${focusRing} rounded-3xl`}
      >
        <article className="relative rounded-3xl overflow-hidden border border-[var(--line)] hover:border-[var(--atelier-accent)]/40 transition-all duration-500 hover:shadow-[var(--shadow-lg)] bg-[var(--cream-2)]">
          <div className="relative h-[300px] md:h-[420px] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover motion-safe:group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              sizes="(max-width: 1200px) 100vw, 1100px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute top-5 left-5">
              <span
                className="px-3 py-1.5 rounded-full bg-[var(--atelier-accent)] text-[var(--cream)] text-[0.6875rem] font-semibold uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Featured
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
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

              <h2
                className="text-white leading-tight mb-3 group-hover:text-[var(--accent-soft)] transition-colors duration-300 max-w-[700px]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.35rem, 3vw, 2rem)',
                }}
              >
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
                <span className="text-[0.8125rem] font-medium text-white/90">
                  {post.author.name}
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

/* ─── Big Full-Width Card ─── */
function BigCard({
  post,
  index,
  reduceMotion,
}: {
  post: BlogPost;
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={selectTransition(reduceMotion, {
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.2),
        ease: atelierEase,
      })}
      className="group rounded-3xl overflow-hidden border border-[var(--line)] bg-[var(--cream-2)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500"
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`no-underline block ${focusRing}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover motion-safe:group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 1000px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </Link>
      <div className="p-7 md:p-10">
        <Link
          href={`/blog/${post.slug}`}
          className={`no-underline block ${focusRing} rounded-lg`}
        >
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--atelier-accent)] text-[0.75rem] font-medium">
              {post.category}
            </span>
            <span className="text-[0.8125rem] text-[var(--muted)]">
              {post.readingTime} min read
            </span>
            <span className="text-[0.8125rem] text-[var(--muted)]">
              &middot; {formatDate(post.publishedAt)}
            </span>
          </div>
          <h3
            className="mb-3 tracking-tight text-[var(--ink)] group-hover:text-[var(--atelier-accent)] transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            }}
          >
            {post.title}
          </h3>
          <p className="text-[1rem] md:text-[1.0625rem] text-[var(--ink-soft)] mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        </Link>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[11px] tracking-[0.04em] border border-[var(--line)] text-[var(--muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
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
          <span className="text-[0.875rem] text-[var(--muted)]">
            {post.author.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Grid Card (smaller, for 2-column rows) ─── */
function GridCard({
  post,
  index,
  reduceMotion,
}: {
  post: BlogPost;
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={selectTransition(reduceMotion, {
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.18),
        ease: atelierEase,
      })}
      className="group rounded-3xl overflow-hidden border border-[var(--line)] bg-[var(--cream-2)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500 h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`no-underline block h-full flex flex-col ${focusRing}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover motion-safe:group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
        <div className="p-6 md:p-7 flex flex-col flex-1">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--atelier-accent)] text-[0.6875rem] font-medium">
              {post.category}
            </span>
            <span className="text-[0.75rem] text-[var(--muted)]">
              {post.readingTime} min
            </span>
          </div>
          <h3
            className="mb-2.5 tracking-tight leading-snug text-[var(--ink)] group-hover:text-[var(--atelier-accent)] transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
            }}
          >
            {post.title}
          </h3>
          <p className="text-[0.9375rem] text-[var(--ink-soft)] leading-relaxed mb-5 flex-1 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]">
            <div className="flex items-center gap-2.5">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
              <span className="text-[0.8125rem] text-[var(--muted)]">
                {post.author.name}
              </span>
            </div>
            <span className="text-[0.75rem] text-[var(--muted)]">
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Renders posts in 1-big + 2-grid repeating pattern ─── */
function PostGrid({
  posts,
  reduceMotion,
}: {
  posts: BlogPost[];
  reduceMotion: boolean | null;
}) {
  const rows: React.ReactNode[] = [];
  let i = 0;

  while (i < posts.length) {
    rows.push(
      <BigCard
        key={posts[i].id}
        post={posts[i]}
        index={i}
        reduceMotion={reduceMotion}
      />,
    );
    i++;

    if (i < posts.length) {
      const pair = posts.slice(i, i + 2);
      rows.push(
        <div key={`grid-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pair.map((post, j) => (
            <GridCard
              key={post.id}
              post={post}
              index={i + j}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>,
      );
      i += pair.length;
    }
  }

  return <div className="flex flex-col gap-10">{rows}</div>;
}

/* ─── Main Page ─── */
function WritingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const reduceMotion = useReducedMotion();

  const filters = useMemo<BlogFilter>(
    () => ({
      search: searchParams.get('q') || undefined,
      category: searchParams.get('category') || undefined,
      tag: searchParams.get('tag') || undefined,
    }),
    [searchParams],
  );

  const allTags = getAllTags();
  const featuredPosts = getFeaturedPosts();
  const hasActiveFilters = !!(filters.search || filters.category || filters.tag);

  const updateFilters = (newFilters: BlogFilter) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set('q', newFilters.search);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.tag) params.set('tag', newFilters.tag);
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    if (filters.search) posts = searchPosts(filters.search);
    if (filters.category) {
      posts = posts.filter((post) =>
        getPostsByCategory(filters.category!).includes(post),
      );
    }
    if (filters.tag) {
      posts = posts.filter((post) => getPostsByTag(filters.tag!).includes(post));
    }
    return posts;
  }, [filters]);

  const enter = (delay = 0) =>
    selectTransition(reduceMotion, {
      duration: 0.5,
      delay,
      ease: atelierEase,
    });

  const chipBase =
    'px-4 py-2 rounded-full text-[0.8125rem] font-medium transition-colors duration-200 border cursor-pointer ' +
    focusRing;
  const chipActive = 'bg-[var(--ink)] text-[var(--cream)] border-transparent';
  const chipIdle =
    'bg-transparent text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--ink)]';

  const github = socialLinks.find((s) => s.label === 'GitHub');
  const twitter = socialLinks.find((s) => s.label === 'X (Twitter)');

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <main className="pt-28 md:pt-32 px-6 md:px-12 pb-8">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <header className="mb-12 md:mb-16 max-w-[640px]">
            <motion.p
              className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0)}
            >
              [ Writing ]
            </motion.p>
            <motion.h1
              className="mb-4 leading-tight"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              }}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.08)}
            >
              Notes on craft &amp; shipping
            </motion.h1>
            <motion.p
              className="text-[1rem] text-[var(--ink-soft)] leading-relaxed"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.16)}
            >
              Thoughts on Flutter development, mobile architecture, backend
              integration, and the craft of building apps people actually use.
            </motion.p>

            <motion.div
              className="flex items-center gap-6 mt-8 flex-wrap"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.22)}
            >
              <div className="flex items-center gap-2 text-[0.875rem] text-[var(--muted)]">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                {blogPosts.length} Articles
              </div>
              <span className="w-1 h-1 rounded-full bg-[var(--muted)] opacity-40" />
              <div className="flex items-center gap-2 text-[0.875rem] text-[var(--muted)]">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
                {blogCategories.filter((c) => c.count > 0).length} Categories
              </div>
            </motion.div>
          </header>

          {/* Search + Filters */}
          <motion.div
            className="mb-12 space-y-5"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0.28)}
          >
            <div className="relative max-w-[480px]">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--muted)]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search articles..."
                aria-label="Search articles"
                defaultValue={filters.search || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (debounceRef.current) clearTimeout(debounceRef.current);
                  debounceRef.current = setTimeout(() => {
                    updateFilters({ ...filters, search: value || undefined });
                  }, 300);
                }}
                className={`w-full pl-11 pr-4 py-3 rounded-xl text-[0.9375rem] bg-transparent border border-[var(--line)] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--atelier-accent)]/30 focus:border-[var(--atelier-accent)]/40 transition-all ${focusRing}`}
              />
            </div>

            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filter by category or tag"
            >
              <button
                type="button"
                onClick={() => updateFilters({ ...filters, category: undefined })}
                className={`${chipBase} ${!filters.category ? chipActive : chipIdle}`}
              >
                All
              </button>
              {blogCategories
                .filter((c) => c.count > 0)
                .map((category) => (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() =>
                      updateFilters({
                        ...filters,
                        category:
                          filters.category === category.slug
                            ? undefined
                            : category.slug,
                      })
                    }
                    className={`${chipBase} ${
                      filters.category === category.slug ? chipActive : chipIdle
                    }`}
                  >
                    {category.name}
                    <span className="ml-1.5 text-[0.6875rem] opacity-60">
                      ({category.count})
                    </span>
                  </button>
                ))}

              <span className="w-px h-6 bg-[var(--line)] mx-1 hidden md:block" />

              {allTags.slice(0, 5).map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() =>
                    updateFilters({
                      ...filters,
                      tag: filters.tag === tag ? undefined : tag,
                    })
                  }
                  className={`px-3 py-1.5 rounded-full text-[0.75rem] transition-colors duration-200 border cursor-pointer ${focusRing} ${
                    filters.tag === tag
                      ? 'bg-[var(--atelier-accent)] text-[var(--cream)] border-transparent'
                      : 'bg-transparent text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {hasActiveFilters && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-[0.8125rem] overflow-hidden flex-wrap"
                >
                  <span className="text-[var(--muted)]">Filtering by:</span>
                  {filters.search && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--atelier-accent)]/20 text-[var(--ink)]">
                      &ldquo;{filters.search}&rdquo;
                      <button
                        type="button"
                        onClick={() =>
                          updateFilters({ ...filters, search: undefined })
                        }
                        className={`text-[var(--muted)] hover:text-[var(--atelier-accent)] cursor-pointer bg-transparent border-none p-0 text-base leading-none ${focusRing}`}
                        aria-label="Remove search filter"
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  {filters.category && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--atelier-accent)]/20 text-[var(--ink)]">
                      {filters.category}
                      <button
                        type="button"
                        onClick={() =>
                          updateFilters({ ...filters, category: undefined })
                        }
                        className={`text-[var(--muted)] hover:text-[var(--atelier-accent)] cursor-pointer bg-transparent border-none p-0 text-base leading-none ${focusRing}`}
                        aria-label="Remove category filter"
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  {filters.tag && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--atelier-accent)]/20 text-[var(--ink)]">
                      {filters.tag}
                      <button
                        type="button"
                        onClick={() =>
                          updateFilters({ ...filters, tag: undefined })
                        }
                        className={`text-[var(--muted)] hover:text-[var(--atelier-accent)] cursor-pointer bg-transparent border-none p-0 text-base leading-none ${focusRing}`}
                        aria-label="Remove tag filter"
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => updateFilters({})}
                    className={`text-[var(--atelier-accent)] hover:underline cursor-pointer bg-transparent border-none p-0 text-[0.8125rem] ml-1 ${focusRing}`}
                  >
                    Clear all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Featured Post (only when no filters) */}
          {!hasActiveFilters && featuredPosts.length > 0 && (
            <section className="mb-16" aria-label="Featured article">
              <FeaturedCard
                post={featuredPosts[0]}
                reduceMotion={reduceMotion}
              />
            </section>
          )}

          {/* Posts Grid */}
          <section className="pb-12" aria-label="All articles">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-[1.25rem] font-semibold text-[var(--ink)]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {hasActiveFilters
                  ? `${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''}`
                  : 'All Articles'}
              </h2>
            </div>

            {filteredPosts.length > 0 ? (
              <PostGrid
                posts={filteredPosts.filter((p) =>
                  !hasActiveFilters ? !p.featured : true,
                )}
                reduceMotion={reduceMotion}
              />
            ) : (
              <motion.div
                className="text-center py-20"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={selectTransition(reduceMotion, { duration: 0.3 })}
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-7 h-7 text-[var(--atelier-accent)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-[1.125rem] font-semibold text-[var(--ink)] mb-2"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  No articles found
                </h3>
                <p className="text-[0.9375rem] text-[var(--muted)] mb-6">
                  Try a different search term or browse all categories.
                </p>
                <button
                  type="button"
                  onClick={() => updateFilters({})}
                  className={`px-6 py-2.5 rounded-full bg-[var(--ink)] text-[var(--cream)] text-[0.875rem] font-medium hover:opacity-90 transition-opacity cursor-pointer border-none ${focusRing}`}
                >
                  View all articles
                </button>
              </motion.div>
            )}
          </section>

          {/* Follow CTA */}
          <motion.section
            className="mb-8 py-14 md:py-16 px-8 md:px-14 rounded-3xl border border-[var(--line)] bg-[var(--cream-2)] text-center relative overflow-hidden"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={selectTransition(reduceMotion, {
              duration: 0.55,
              ease: atelierEase,
            })}
            aria-label="Follow for updates"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--atelier-accent)] opacity-[0.04] rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
              <p
                className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-4"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                [ Follow ]
              </p>
              <h3
                className="mb-3 tracking-tight text-[var(--ink)]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
                }}
              >
                Stay in the loop
              </h3>
              <p className="text-[1rem] text-[var(--ink-soft)] mb-8 max-w-[440px] mx-auto leading-relaxed">
                Follow along for new tutorials, Flutter tips, and behind-the-scenes
                of building mobile apps.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                {twitter && (
                  <a
                    href={twitter.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-[var(--ink)] text-[var(--cream)] rounded-full text-[0.875rem] font-medium no-underline hover:opacity-90 transition-opacity ${focusRing}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d={twitter.icon} />
                    </svg>
                    Follow on X
                  </a>
                )}
                {github && (
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 border border-[var(--line)] text-[var(--ink)] rounded-full text-[0.875rem] font-medium no-underline hover:border-[var(--atelier-accent)] hover:text-[var(--atelier-accent)] transition-colors duration-200 ${focusRing}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d={github.icon} />
                    </svg>
                    Follow on GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--cream)]">
          <div className="max-w-[1000px] mx-auto px-6 pt-40 pb-12">
            <div className="flex flex-col gap-10">
              <SkeletonBlogCard />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonBlogCard />
                <SkeletonBlogCard />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <WritingContent />
    </Suspense>
  );
}
