import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import BlogArchive from '@/features/blog/presentation/BlogArchive';
import Footer from '@/core/presentation/layout/Footer';
import { blogCategories, getAllTags, getBlogPostSummaries } from '@/features/blog/data/blog';
import { formatDateShort } from '@/core/lib/utils';

export default function BlogPage() {
  const posts = getBlogPostSummaries();
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const archivePosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <header className="border-b border-[var(--line-16)]">
          <div className="site-container py-12 sm:py-16 lg:py-20">
            <p className="eyebrow">Blog</p>
            <h1 className="display-page mt-3 max-w-[18ch]">Notes from building Flutter apps</h1>
            <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-8 text-[var(--text-muted)]">
              Practical, step-by-step guides on state, offline data, app releases,
              subscriptions, and the real problems that show up after the tutorial ends.
            </p>
            <Link
              href="/feed.xml"
              className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-[var(--accent)] no-underline"
            >
              Follow with RSS
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </header>

        {featuredPost && (
          <section className="site-container pt-10 sm:pt-14" aria-label="Featured article">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group editorial-card hover-card grid overflow-hidden text-[var(--text-strong)] no-underline motion-reduce:hover:translate-y-0 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="relative aspect-video bg-[var(--panel-bg)] lg:aspect-auto lg:min-h-full">
                <Image
                  src={featuredPost.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </div>
              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip bg-[var(--accent-soft)] text-[var(--accent)]">Featured</span>
                  <span className="chip">{featuredPost.category}</span>
                </div>
                <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em] transition-colors group-hover:text-[var(--accent)]">
                  {featuredPost.title}
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-7 text-[var(--text-muted)]">{featuredPost.excerpt}</p>
                <p className="mt-5 text-[0.8125rem] text-[var(--text-faint)]">
                  {formatDateShort(featuredPost.publishedAt)}
                  <span aria-hidden> · </span>
                  {featuredPost.readingTime} min read
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-[var(--accent)] lg:mt-auto lg:pt-6">
                  Read the article
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </section>
        )}

        <Suspense fallback={<div className="site-container py-24 text-center text-sm text-[var(--text-muted)]">Loading writing…</div>}>
          <BlogArchive
            posts={archivePosts}
            categories={blogCategories.filter((category) => category.count > 0)}
            popularTags={getAllTags().slice(0, 8)}
            totalCount={posts.length}
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
