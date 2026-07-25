'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Footer from '@/components/Footer';
import {
  blogCategories,
  blogPosts,
  getAllTags,
  getFeaturedPosts,
} from '@/data/blog';
import { formatDateShort } from '@/lib/utils';

const featuredPost = getFeaturedPosts()[0] ?? blogPosts[0];
const popularTags = getAllTags().slice(0, 8);

function BlogIndex() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const activeCategory = searchParams.get('category') ?? '';
  const activeTag = searchParams.get('tag') ?? '';
  const [searchValue, setSearchValue] = useState(searchQuery);

  useEffect(() => setSearchValue(searchQuery), [searchQuery]);

  const updateParam = (key: 'search' | 'category' | 'tag', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`${pathname}${params.size ? `?${params.toString()}` : ''}`, {
      scroll: false,
    });
  };

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
      const matchesCategory = !activeCategory || categorySlug === activeCategory;
      const matchesTag =
        !activeTag ||
        post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase());
      const matchesSearch =
        !normalizedSearch ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.excerpt.toLowerCase().includes(normalizedSearch) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [activeCategory, activeTag, searchQuery]);

  const hasFilters = Boolean(searchQuery || activeCategory || activeTag);
  const indexPosts = hasFilters
    ? filteredPosts
    : filteredPosts.filter((post) => post.slug !== featuredPost?.slug);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParam('search', searchValue.trim());
  };

  const clearFilters = () => {
    setSearchValue('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <>
      {!hasFilters && featuredPost && (
        <section className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-7 py-14 sm:gap-8 sm:py-22 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-12 lg:py-26">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="relative min-h-[280px] overflow-hidden rounded-[20px] border border-[var(--line-18)] bg-[var(--surface-bg)] no-underline sm:min-h-[460px] sm:rounded-[24px]"
            >
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/80">
                  Featured field note
                </span>
                <p className="mt-3 hidden max-w-[28ch] text-[1.35rem] font-semibold leading-tight tracking-[-0.035em] sm:block">
                  {featuredPost.title}
                </p>
              </div>
            </Link>

            <div className="flex flex-col justify-between border-t border-[var(--line-16)] pt-7 lg:border-t-0 lg:pt-0">
              <div>
                <p className="eyebrow">{featuredPost.category}</p>
                <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.052em]">
                  {featuredPost.title}
                </h2>
                <p className="mt-6 max-w-[56ch] text-[0.94rem] leading-7 text-[var(--text-muted)]">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="mt-10">
                <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.07em] text-[var(--text-faint)]">
                  <span>{formatDateShort(featuredPost.publishedAt)}</span>
                  <span>{featuredPost.readingTime} min read</span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--text-strong)] px-6 text-sm font-semibold text-[var(--page-bg)] no-underline sm:w-auto"
                >
                  Read the article
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]">
        <div className="site-container py-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <form onSubmit={submitSearch} className="flex max-w-[560px] gap-2" role="search">
              <label htmlFor="writing-search" className="sr-only">
                Search writing
              </label>
              <input
                id="writing-search"
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search production notes"
                className="h-12 min-w-0 flex-1 rounded-full border border-[var(--line-24)] bg-[var(--page-bg)] px-5 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-faint)]"
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-[var(--text-strong)] px-5 text-sm font-semibold text-[var(--page-bg)]"
              >
                Search
              </button>
            </form>

            <div className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              <button
                type="button"
                onClick={() => updateParam('category', '')}
                className={[
                  'h-11 shrink-0 rounded-full border px-4 text-xs font-medium',
                  !activeCategory
                    ? 'border-[var(--text-strong)] bg-[var(--text-strong)] text-[var(--page-bg)]'
                    : 'border-[var(--line-16)] bg-transparent text-[var(--text-muted)]',
                ].join(' ')}
              >
                All
              </button>
              {blogCategories
                .filter((category) => category.count > 0)
                .map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => updateParam('category', category.slug)}
                    className={[
                      'h-11 shrink-0 rounded-full border px-4 text-xs font-medium',
                      activeCategory === category.slug
                        ? 'border-[var(--text-strong)] bg-[var(--text-strong)] text-[var(--page-bg)]'
                        : 'border-[var(--line-16)] bg-transparent text-[var(--text-muted)]',
                    ].join(' ')}
                  >
                    {category.name}
                  </button>
                ))}
            </div>
          </div>

          <div className="scrollbar-hide -mx-5 mt-5 flex items-center gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            <span className="mr-2 shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">
              Topics
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => updateParam('tag', activeTag === tag ? '' : tag)}
                className={[
                  'h-11 shrink-0 rounded-full border px-3.5 font-mono text-xs',
                  activeTag === tag
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'border-[var(--line-16)] text-[var(--text-faint)]',
                ].join(' ')}
              >
                {tag}
              </button>
            ))}
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto h-11 shrink-0 text-xs font-semibold text-[var(--accent)]"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="site-container py-14 sm:py-22 lg:py-26">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{hasFilters ? 'Filtered archive' : 'Writing archive'}</p>
            <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.8rem)] font-semibold tracking-[-0.05em]">
              {hasFilters ? `${indexPosts.length} matching notes` : 'The complete field log.'}
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)]">
            {blogPosts.length} articles · Flutter in production
          </p>
        </div>

        {indexPosts.length === 0 ? (
          <div className="mt-12 rounded-[20px] border border-[var(--line-16)] bg-[var(--surface-bg)] px-6 py-16 text-center">
            <h3 className="text-[1.3rem] font-semibold tracking-[-0.03em]">No notes match that filter.</h3>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold text-[var(--accent)]"
            >
              Show the complete archive
            </button>
          </div>
        ) : (
          <div className="mt-10 border-t border-[var(--line-16)]">
            {indexPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-[var(--line-16)] py-5 text-[var(--text-strong)] no-underline transition-colors hover:bg-[var(--row-hover-bg)] sm:grid-cols-[50px_120px_1fr_auto] sm:gap-5 sm:px-4 sm:py-6"
              >
                <span className="row-span-3 pt-0.5 font-mono text-xs text-[var(--text-faint)] sm:row-span-1 sm:pt-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="col-start-2 font-mono text-xs uppercase tracking-[0.05em] text-[var(--text-faint)] sm:col-start-auto">
                  <time dateTime={post.publishedAt}>{formatDateShort(post.publishedAt)}</time>
                  <p className="mt-2 text-[var(--accent)]">{post.category}</p>
                </div>
                <div className="col-start-2 sm:col-start-auto">
                  <h3 className="text-[1.03rem] font-semibold tracking-[-0.025em] transition-colors group-hover:text-[var(--accent)]">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-[72ch] text-sm leading-6 text-[var(--text-muted)]">
                    {post.excerpt}
                  </p>
                </div>
                <span className="col-start-2 font-mono text-xs text-[var(--text-faint)] sm:col-start-auto">
                  {post.readingTime} min
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function BlogLoading() {
  return (
    <div className="site-container py-24 text-center text-sm text-[var(--text-muted)]">
      Loading writing…
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <header className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-7 py-14 sm:gap-8 sm:py-22 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:py-26">
            <div>
              <p className="eyebrow">Writing</p>
              <h1 className="display-page mt-6 max-w-[10ch]">Notes from shipping Flutter.</h1>
            </div>
            <p className="max-w-[58ch] text-[1rem] leading-8 text-[var(--text-muted)]">
              Practical field notes about state, offline data, store delivery, subscriptions,
              updates, and the production problems that appear after the tutorial ends.
            </p>
          </div>
        </header>

        <Suspense fallback={<BlogLoading />}>
          <BlogIndex />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
