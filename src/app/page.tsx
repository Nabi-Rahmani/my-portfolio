import Link from 'next/link';

import ProductRack from '@/features/home/presentation/ProductRack';
import ProofStrip from '@/features/home/presentation/ProofStrip';
import WorkCard from '@/features/home/presentation/WorkCard';
import Footer from '@/core/presentation/layout/Footer';
import ScrollReveal from '@/core/presentation/layout/ScrollReveal';
import { socialLinks } from '@/core/config/navigation';
import { getArticleCount } from '@/core/config/proof';
import { contactMailto, siteConfig } from '@/core/config/site';
import { blogPosts, getFeaturedPosts } from '@/features/blog/data/blog';
import { getFeaturedProjects } from '@/features/projects/data/projects';
import { formatDateUtc } from '@/core/lib/utils';

const projects = getFeaturedProjects();
const featuredPosts = getFeaturedPosts();
const articles = (featuredPosts.length > 0 ? featuredPosts : blogPosts).slice(0, 3);
const linkedInUrl =
  socialLinks.find((link) => link.label === 'LinkedIn')?.href ?? '#';

/**
 * PRESENTATION — home composition.
 * Job: identity, proof, curated work, writing, and contact path.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <section id="home" className="scroll-mt-[72px] border-b border-[var(--line-16)]">
          <div className="site-container grid grid-cols-1 gap-6 py-8 sm:gap-8 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-x-14 lg:gap-y-0 lg:py-20">
            <ScrollReveal className="order-1 lg:col-start-1 lg:row-start-1">
              <div className="flex items-start gap-2 font-mono text-xs uppercase leading-5 tracking-[0.11em] text-[var(--text-faint)] sm:items-center sm:tracking-[0.13em]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--status-ok)] sm:mt-0" aria-hidden />
                {siteConfig.role} · Ankara / Remote
              </div>
              <h1 className="display-hero mt-4 max-w-[10ch] sm:mt-5">
                Flutter products, built to last.
              </h1>
              <p className="mt-4 max-w-[560px] text-base leading-7 text-[var(--text-muted)] sm:mt-5 sm:text-[1.08rem] sm:leading-8">
                I&apos;m Nabi Rahmani. I design, build, and ship reliable Flutter apps—from
                product architecture to store release.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                <Link href="/projects" className="button-primary group w-full sm:w-auto">
                  <span>Explore projects</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden>→</span>
                </Link>
                <Link href="/blog" className="button-secondary group w-full sm:w-auto">
                  <span>Read articles</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden>→</span>
                </Link>
              </div>
            </ScrollReveal>

            <div className="order-2 -mx-5 border-y border-[var(--line-16)] bg-[var(--surface-bg)] px-5 sm:-mx-8 sm:px-8 lg:order-3 lg:col-span-2 lg:mx-0 lg:mt-12 lg:border-x-0 lg:px-0">
              <ProofStrip />
            </div>

            <ScrollReveal
              delay={40}
              className="order-3 lg:order-2 lg:col-start-2 lg:row-start-1"
            >
              <ProductRack projects={projects} />
            </ScrollReveal>
          </div>
        </section>

        <section id="work" className="site-container py-10 sm:py-20 lg:py-24">
          <ScrollReveal>
            <div className="grid gap-4 sm:gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="display-section mt-4 max-w-[10ch]">Work that shipped.</h2>
              </div>
              <p className="max-w-[540px] text-[0.95rem] leading-7 text-[var(--text-muted)] lg:justify-self-end">
                Selected Flutter products designed, engineered, released, and maintained as complete systems.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 40} className="h-full">
                <WorkCard project={project} index={index} />
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Link href="/projects" className="text-sm font-semibold text-[var(--accent)] no-underline">
              Explore every case study →
            </Link>
          </div>
        </section>

        <section className="border-y border-[var(--line-16)] bg-[var(--surface-bg)]">
          <div className="site-container grid gap-6 py-10 sm:gap-8 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:py-24">
            <ScrollReveal>
              <p className="eyebrow">Writing</p>
              <h2 className="display-section mt-4 max-w-[8ch]">Notes from the work.</h2>
              <p className="mt-5 max-w-[38ch] text-sm leading-7 text-[var(--text-muted)]">
                Practical lessons from building and maintaining Flutter products.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={40}>
              <div className="border-t border-[var(--line-16)]">
                {articles.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group grid gap-3 border-b border-[var(--line-16)] py-5 text-[var(--text-strong)] no-underline sm:grid-cols-[150px_1fr_auto] sm:items-center sm:gap-6"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.05em] text-[var(--text-faint)]">
                      {formatDateUtc(post.publishedAt)}
                    </p>
                    <div>
                      <h3 className="text-[1rem] font-semibold tracking-[-0.02em] transition-opacity group-hover:opacity-60">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-xs text-[var(--text-faint)]">{post.readingTime} min read</p>
                    </div>
                    <span className="hidden text-sm sm:block">→</span>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <Link href="/blog" className="text-sm font-semibold text-[var(--accent)] no-underline">
                  All {getArticleCount()} articles
                  <span aria-hidden className="ms-1">
                    →
                  </span>
                </Link>
                <Link
                  href="/feed.xml"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)] no-underline transition-colors hover:text-[var(--text-strong)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M5 3a1 1 0 0 0 0 2c7.18 0 13 5.82 13 13a1 1 0 1 0 2 0C20 9.716 13.284 3 5 3ZM5 8a1 1 0 0 0 0 2 8 8 0 0 1 8 8 1 1 0 1 0 2 0A10 10 0 0 0 5 8Zm1 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                  </svg>
                  RSS
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-t border-[var(--line-16)] bg-[var(--accent-soft)]">
          <div className="site-container flex flex-col gap-6 py-12 sm:gap-8 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:py-20">
            <ScrollReveal>
              <p className="eyebrow">Available for remote roles</p>
              <h2 className="display-section mt-4 max-w-[12ch]">
                Let&apos;s build something dependable.
              </h2>
              <p className="mt-4 max-w-[54ch] text-sm leading-7 text-[var(--text-muted)] sm:mt-5">
                Looking for a Flutter engineer who cares about the product before and after launch?
              </p>
            </ScrollReveal>
            <ScrollReveal delay={40} className="w-full lg:w-auto">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
                <a
                  href={contactMailto({ subject: 'Flutter role inquiry' })}
                  className="button-primary w-full sm:w-auto"
                >
                  Email Nabi
                </a>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary w-full sm:w-auto"
                >
                  LinkedIn
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
