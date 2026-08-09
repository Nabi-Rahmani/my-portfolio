'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { formatDateShort } from '@/lib/utils';
import type { BlogCategory, BlogPostSummary } from '@/types/blog';

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
      <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]">
        <div className="site-container py-8">
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
                placeholder="Search production notes"
                className="h-12 min-w-0 flex-1 rounded-full border border-[var(--line-24)] bg-[var(--page-bg)] px-5 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-faint)]"
              />
              <button type="submit" className="h-12 rounded-full bg-[var(--text-strong)] px-5 text-sm font-semibold text-[var(--page-bg)]">
                Search
              </button>
            </form>

            <div className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              <button
                type="button"
                onClick={() => updateParam('category', '')}
                className={`h-11 shrink-0 rounded-full border px-4 text-xs font-medium ${!activeCategory ? 'border-[var(--text-strong)] bg-[var(--text-strong)] text-[var(--page-bg)]' : 'border-[var(--line-16)] text-[var(--text-muted)]'}`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => updateParam('category', category.slug)}
                  className={`h-11 shrink-0 rounded-full border px-4 text-xs font-medium ${activeCategory === category.slug ? 'border-[var(--text-strong)] bg-[var(--text-strong)] text-[var(--page-bg)]' : 'border-[var(--line-16)] text-[var(--text-muted)]'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="scrollbar-hide -mx-5 mt-5 flex items-center gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <span className="mr-2 shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-faint)]">Topics</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => updateParam('tag', activeTag === tag ? '' : tag)}
                className={`h-11 shrink-0 rounded-full border px-3.5 font-mono text-xs ${activeTag === tag ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]' : 'border-[var(--line-16)] text-[var(--text-faint)]'}`}
              >
                {tag}
              </button>
            ))}
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="ml-auto h-11 shrink-0 text-xs font-semibold text-[var(--accent)]">
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
              {hasFilters ? `${filteredPosts.length} matching notes` : 'The complete field log.'}
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)]">{totalCount} articles · Flutter in production</p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="editorial-card mt-12 px-6 py-16 text-center">
            <h3 className="text-[1.3rem] font-semibold tracking-[-0.03em]">No notes match that filter.</h3>
            <button type="button" onClick={clearFilters} className="mt-4 text-sm font-semibold text-[var(--accent)]">Show the complete archive</button>
          </div>
        ) : (
          <div className="mt-10 border-t border-[var(--line-16)]">
            {filteredPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-[var(--line-16)] py-5 text-[var(--text-strong)] no-underline transition-colors hover:bg-[var(--row-hover-bg)] sm:grid-cols-[50px_120px_1fr_auto] sm:gap-5 sm:px-4 sm:py-6"
              >
                <span className="row-span-3 font-mono text-xs text-[var(--text-faint)]">{String(index + 1).padStart(2, '0')}</span>
                <div className="col-start-2 font-mono text-xs uppercase tracking-[0.05em] text-[var(--text-faint)] sm:col-start-auto">
                  <time dateTime={post.publishedAt}>{formatDateShort(post.publishedAt)}</time>
                  <p className="mt-2 text-[var(--accent)]">{post.category}</p>
                </div>
                <div className="col-start-2 sm:col-start-auto">
                  <h3 className="text-[1.03rem] font-semibold tracking-[-0.025em] transition-colors group-hover:text-[var(--accent)]">{post.title}</h3>
                  <p className="mt-2 max-w-[72ch] text-sm leading-6 text-[var(--text-muted)]">{post.excerpt}</p>
                </div>
                <span className="col-start-2 font-mono text-xs text-[var(--text-faint)] sm:col-start-auto">{post.readingTime} min</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
