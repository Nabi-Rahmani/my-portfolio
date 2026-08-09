import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import BlogArchive from '@/components/BlogArchive';
import Footer from '@/components/Footer';
import { blogCategories, getAllTags, getBlogPostSummaries } from '@/data/blog';
import { formatDateShort } from '@/lib/utils';

export default function BlogPage() {
  const posts = getBlogPostSummaries();
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const archivePosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <header className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-7 py-14 sm:gap-8 sm:py-22 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:py-26">
            <div>
              <p className="eyebrow">Writing</p>
              <h1 className="display-page mt-6 max-w-[11ch]">Field notes from shipping Flutter.</h1>
            </div>
            <div>
              <p className="max-w-[58ch] text-[1rem] leading-8 text-[var(--text-muted)]">
                Practical notes about state, offline data, releases, subscriptions, updates,
                and the production problems that appear after the tutorial ends.
              </p>
              <Link href="/feed.xml" className="mt-5 inline-flex font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent)] no-underline">
                Follow via RSS ↗
              </Link>
            </div>
          </div>
        </header>

        {featuredPost && (
          <section className="border-b border-[var(--line-16)]">
            <div className="site-container grid gap-7 py-14 sm:gap-8 sm:py-22 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-12 lg:py-26">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="relative min-h-[280px] overflow-hidden rounded-[20px] border border-[var(--line-18)] bg-[var(--surface-bg)] no-underline sm:min-h-[460px] sm:rounded-[24px]"
              >
                <Image src={featuredPost.coverImage} alt={featuredPost.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/80">Featured field note</span>
                  <p className="mt-3 hidden max-w-[28ch] text-[1.35rem] font-semibold leading-tight tracking-[-0.035em] sm:block">{featuredPost.title}</p>
                </div>
              </Link>

              <div className="flex flex-col justify-between border-t border-[var(--line-16)] pt-7 lg:border-t-0 lg:pt-0">
                <div>
                  <p className="eyebrow">{featuredPost.category}</p>
                  <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.052em]">{featuredPost.title}</h2>
                  <p className="mt-6 max-w-[56ch] text-[0.94rem] leading-7 text-[var(--text-muted)]">{featuredPost.excerpt}</p>
                </div>
                <div className="mt-10">
                  <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.07em] text-[var(--text-faint)]">
                    <span>{formatDateShort(featuredPost.publishedAt)}</span>
                    <span>{featuredPost.readingTime} min read</span>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`} className="button-primary mt-6 w-full sm:w-auto">Read the article</Link>
                </div>
              </div>
            </div>
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
