'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { formatDateShort } from '@/core/lib/utils';
import type { BlogCategory, BlogPostSummary } from '@/features/blog/domain/blog';

interface BlogArchiveProps {
  posts: BlogPostSummary[];
  categories: BlogCategory[];
  popularTags: string[];
  totalCount: number;
}

export default function BlogArchive({ posts, categories, popularTags, totalCount }: BlogArchiveProps) {
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
    router.replace(`${pathname}${params.size ? `?${params.toString()}` : ''}`, { scroll: false });
  };

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
      return (
        (!activeCategory || categorySlug === activeCategory) &&
        (!activeTag || post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())) &&
        (!normalizedSearch ||
          post.title.toLowerCase().includes(normalizedSearch) ||
          post.excerpt.toLowerCase().includes(normalizedSearch) ||
          post.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch)))
      );
    });
  }, [activeCategory, activeTag, posts, searchQuery]);

  const hasFilters = Boolean(searchQuery || activeCategory || activeTag);
  const clearFilters = () => {
    setSearchValue('');
    router.replace(pathname, { scroll: false });
  };

  return (
    <>
      <section className="site-container pt-10 sm:pt-14" aria-label="Find an article">
        <div className="editorial-card p-4 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                updateParam('search', searchValue.trim());
              }}
              className="flex max-w-[560px] gap-2"
              role="search"
            >
              <label htmlFor="writing-search" className="sr-only">Search writing</label>
              <input
                id="writing-search"
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search articles, e.g. Riverpod"
                className="h-12 min-w-0 flex-1 rounded-full border border-[var(--line-24)] bg-[var(--page-bg)] px-5 text-[0.9375rem] text-[var(--text-strong)] transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]"
              />
              <button type="submit" className="button-primary min-h-12 px-5">
                Search
              </button>
            </form>

            <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              <button
                type="button"
                onClick={() => updateParam('category', '')}
                aria-pressed={!activeCategory}
                className={`h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${!activeCategory ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]' : 'border-[var(--line-24)] text-[var(--text-muted)] hover:border-[var(--text-strong)] hover:text-[var(--text-strong)]'}`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => updateParam('category', category.slug)}
                  aria-pressed={activeCategory === category.slug}
                  className={`h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${activeCategory === category.slug ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]' : 'border-[var(--line-24)] text-[var(--text-muted)] hover:border-[var(--text-strong)] hover:text-[var(--text-strong)]'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="scrollbar-hide -mx-4 mt-4 flex items-center gap-2 overflow-x-auto border-t border-[var(--line-16)] px-4 pt-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <span className="mr-1 shrink-0 text-sm font-semibold text-[var(--text-strong)]">Topics:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => updateParam('tag', activeTag === tag ? '' : tag)}
                aria-pressed={activeTag === tag}
                className={`h-10 shrink-0 rounded-full border px-3.5 text-[0.8125rem] transition-colors ${activeTag === tag ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]' : 'border-transparent bg-[var(--panel-bg)] text-[var(--text-muted)] hover:text-[var(--text-strong)]'}`}
              >
                {tag}
              </button>
            ))}
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="ml-auto h-10 shrink-0 px-2 text-sm font-semibold text-[var(--accent)]">
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="site-container py-10 sm:py-14 lg:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em]">
            {hasFilters ? `${filteredPosts.length} matching articles` : 'All articles'}
          </h2>
          <p className="text-sm text-[var(--text-faint)]" aria-live="polite">
            {hasFilters ? `out of ${totalCount}` : `${totalCount} articles`}
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="editorial-card mt-6 px-6 py-14 text-center">
            <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em]">No articles match that filter.</h3>
            <p className="mt-2 text-[0.9375rem] text-[var(--text-muted)]">Try a different word or topic.</p>
            <button type="button" onClick={clearFilters} className="button-secondary mt-5">Show all articles</button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-3">
            {filteredPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group editorial-card hover-card flex flex-col gap-3 p-5 text-[var(--text-strong)] no-underline motion-reduce:hover:translate-y-0 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.8125rem] text-[var(--text-faint)]">
                      <span className="chip">{post.category}</span>
                      <time dateTime={post.publishedAt}>{formatDateShort(post.publishedAt)}</time>
                      <span aria-hidden>·</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <h3 className="mt-2.5 text-[1.075rem] font-semibold leading-snug tracking-[-0.015em] transition-colors group-hover:text-[var(--accent)]">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 max-w-[80ch] text-[0.9375rem] leading-6 text-[var(--text-muted)]">{post.excerpt}</p>
                  </div>
                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line-24)] text-[var(--text-muted)] transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--on-accent)] sm:inline-flex" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
