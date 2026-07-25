'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';
import ProjectShowcase from '@/components/ProjectShowcase';
import { socialLinks } from '@/config/navigation';
import { contactMailto, siteConfig } from '@/config/site';
import { blogPosts, getFeaturedPosts } from '@/data/blog';
import { getFeaturedProjects } from '@/data/projects';
import { fadeUpMotion, staggerMotion } from '@/lib/animations';

const projects = getFeaturedProjects();
const featuredPosts = getFeaturedPosts();
const articles = (featuredPosts.length > 0 ? featuredPosts : blogPosts).slice(0, 4);
const githubUrl =
  socialLinks.find((link) => link.label === 'GitHub')?.href ??
  'https://github.com/Nabi-Rahmani';
const linkedInUrl =
  socialLinks.find((link) => link.label === 'LinkedIn')?.href ?? '#';

const proofItems = [
  { value: '3', label: 'Live products', note: 'Solo-built and maintained' },
  { value: siteConfig.experienceLabel, label: 'Flutter experience', note: 'Production mobile work' },
  { value: 'End to end', label: 'Product ownership', note: 'Architecture through release' },
  { value: 'Remote', label: 'Availability', note: `${siteConfig.location} · ${siteConfig.timezone}` },
];

const engineeringFocus = [
  {
    number: '01',
    title: 'Offline-first systems',
    body: 'Local data remains useful when the network disappears, then cloud services stay intentionally small.',
    stack: 'Drift · SQLite · Supabase',
  },
  {
    number: '02',
    title: 'State with clear boundaries',
    body: 'Product state is split by responsibility so new features do not turn every screen into a dependency graph.',
    stack: 'Riverpod · Clean Architecture',
  },
  {
    number: '03',
    title: 'Store-ready delivery',
    body: 'Subscriptions, release links, observability, and maintenance are part of the product—not an afterthought.',
    stack: 'RevenueCat · Sentry · Mixpanel',
  },
];

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00Z`));
}

function ProductRack() {
  const rackProjects = projects.slice(0, 3);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[var(--line-16)] bg-[var(--accent-soft)] px-4 pb-0 pt-8 sm:px-7 sm:pt-12 lg:px-9">
      <div className="absolute left-6 top-5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
        Shipped products · real screens
      </div>
      <div className="grid grid-cols-3 items-end gap-2.5 pt-8 sm:gap-4">
        {rackProjects.map((project, index) => {
          const screenshot = project.screenshots[index === 1 ? 1 : 0] ?? project.coverImage;
          return (
            <div
              key={project.slug}
              className={[
                'relative aspect-[9/19.5] overflow-hidden rounded-t-[14px] border border-b-0 border-[var(--line-18)] bg-[var(--surface-bg)] sm:rounded-t-[22px]',
                index === 1 ? 'z-10 -mt-8' : '',
              ].join(' ')}
            >
              <Image
                src={screenshot}
                alt={`${project.title} app screen`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 30vw, 190px"
                priority
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const reveal = fadeUpMotion(reduceMotion);
  const stagger = staggerMotion(reduceMotion);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <section className="border-b border-[var(--line-16)]">
          <motion.div
            className="site-container grid gap-10 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:gap-16 lg:py-26"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={reveal}>
              <div className="flex items-start gap-2 font-mono text-xs uppercase leading-5 tracking-[0.11em] text-[var(--text-faint)] sm:items-center sm:tracking-[0.13em]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--status-ok)] sm:mt-0" aria-hidden />
                {siteConfig.role} · Ankara / Remote
              </div>
              <h1 className="display-hero mt-6 max-w-[12ch] sm:mt-7">
                I design and ship mobile products people can rely on.
              </h1>
              <p className="mt-6 max-w-[610px] text-base leading-7 text-[var(--text-muted)] sm:mt-7 sm:text-[1.12rem] sm:leading-8">
                I&apos;m Nabi Rahmani, a Flutter engineer with {siteConfig.experienceLabel} of
                experience taking offline-first products from architecture to Play Store
                release.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
                <Link
                  href="/projects"
                  className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--on-accent)] no-underline transition-all duration-150 hover:-translate-y-0.5 hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto"
                >
                  View selected work
                </Link>
                <a
                  href={contactMailto({ subject: 'Flutter role inquiry' })}
                  className="flex h-12 w-full items-center justify-center rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] px-6 text-sm font-semibold text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none sm:w-auto"
                >
                  Email me
                </a>
              </div>
              <p className="mt-7 font-mono text-xs uppercase tracking-[0.11em] text-[var(--text-faint)]">
                Flutter · Dart · Riverpod · Drift · Store delivery
              </p>
            </motion.div>

            <motion.div variants={reveal}>
              <ProductRack />
            </motion.div>
          </motion.div>
        </section>

        <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]" aria-label="Professional proof">
          <div className="site-container grid grid-cols-2 lg:grid-cols-4">
            {proofItems.map((item, index) => (
              <div
                key={item.label}
                className={[
                  'border-b border-[var(--line-16)] px-3 py-5 lg:border-b-0 lg:border-r lg:px-6 lg:py-8',
                  index % 2 === 0 ? 'border-r border-[var(--line-16)] pl-0' : '',
                  index === 1 ? 'pr-0 lg:pr-6' : '',
                  index >= 2 ? 'border-b-0' : '',
                  index === proofItems.length - 1 ? 'border-r-0 pr-0 lg:pr-0' : '',
                ].join(' ')}
              >
                <p className="text-[1.45rem] font-semibold tracking-[-0.04em] text-[var(--text-strong)]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--text-body)]">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-[var(--text-faint)]">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="site-container py-14 sm:py-22 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="display-section mt-5 max-w-[10ch]">Products built past the prototype.</h2>
            </div>
            <p className="max-w-[620px] text-[0.95rem] leading-7 text-[var(--text-muted)] lg:justify-self-end">
              Three independent products designed, engineered, released, and maintained as
              complete systems. Each case study focuses on the decisions behind the interface.
            </p>
          </div>

          <div className="mt-9 sm:mt-12">
            {projects.map((project, index) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                index={index}
                priority={index === 0}
              />
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--line-16)] bg-[var(--surface-bg)]">
          <div className="site-container grid gap-9 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-28">
            <div>
              <p className="eyebrow">Engineering focus</p>
              <h2 className="display-section mt-5 max-w-[10ch]">The work behind a reliable release.</h2>
              <p className="mt-6 max-w-[43ch] text-[0.9rem] leading-7 text-[var(--text-muted)]">
                I care about what happens after launch: data integrity, clear state, observable
                failures, and code another engineer can safely extend.
              </p>
            </div>

            <div className="border-t border-[var(--line-16)]">
              {engineeringFocus.map((item) => (
                <div
                  key={item.number}
                  className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-[var(--line-16)] py-6 sm:grid-cols-[52px_180px_1fr] sm:gap-6 sm:py-7"
                >
                  <span className="font-mono text-xs text-[var(--accent)]">{item.number}</span>
                  <h3 className="text-[0.95rem] font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <div className="col-start-2 sm:col-start-auto">
                    <p className="text-sm leading-6 text-[var(--text-muted)]">{item.body}</p>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)]">
                      {item.stack}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="site-container py-14 sm:py-22 lg:py-28">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Writing from production</p>
              <h2 className="display-section mt-5 max-w-[12ch]">Notes for engineers who ship.</h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-[var(--accent)] no-underline"
            >
              Browse all writing →
            </Link>
          </div>

          <div className="mt-9 border-t border-[var(--line-16)] sm:mt-12">
            {articles.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-[var(--line-16)] py-5 text-[var(--text-strong)] no-underline transition-colors hover:bg-[var(--row-hover-bg)] sm:grid-cols-[56px_120px_1fr_auto] sm:items-start sm:gap-5 sm:px-4 sm:py-6"
              >
                <span className="row-span-3 pt-0.5 font-mono text-xs text-[var(--text-faint)] sm:row-span-1 sm:pt-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <time
                  dateTime={post.publishedAt}
                  className="font-mono text-xs uppercase tracking-[0.05em] text-[var(--text-faint)]"
                >
                  {formatPostDate(post.publishedAt)}
                </time>
                <div className="col-start-2 sm:col-start-auto">
                  <h3 className="text-[1rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent)]">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-[68ch] text-sm leading-6 text-[var(--text-muted)]">
                    {post.excerpt}
                  </p>
                </div>
                <span className="col-start-2 font-mono text-xs text-[var(--text-faint)] sm:col-start-auto">
                  {post.readingTime} min
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--line-16)] bg-[var(--accent-soft)]">
          <div className="site-container grid items-center gap-8 py-14 sm:gap-10 sm:py-22 lg:grid-cols-[220px_1fr_auto] lg:gap-14 lg:py-26">
            <div className="relative aspect-[4/3] w-full max-w-[380px] overflow-hidden rounded-[22px] border border-[var(--line-18)] bg-[var(--surface-bg)] sm:aspect-[4/5] sm:w-[220px]">
              <Image
                src={siteConfig.portraitPath}
                alt="Nabi Rahmani, Flutter product engineer"
                fill
                className="object-cover object-[center_44%] sm:object-center"
                sizes="(max-width: 639px) calc(100vw - 2.5rem), 220px"
              />
            </div>
            <div>
              <p className="eyebrow text-[var(--accent)]">Open to the right team</p>
              <h2 className="mt-5 max-w-[14ch] text-[clamp(2.2rem,4.7vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]">
                Looking for an engineer who owns the product past launch?
              </h2>
              <p className="mt-5 max-w-[62ch] text-[0.9rem] leading-7 text-[var(--text-muted)]">
                I&apos;m available for remote Flutter roles where product judgment, reliable
                architecture, and shipping discipline matter.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
              <a
                href={contactMailto({ subject: 'Flutter role inquiry' })}
                className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-center text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none sm:w-auto"
              >
                Email Nabi
              </a>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] px-6 text-center text-sm font-semibold text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none sm:w-auto"
              >
                LinkedIn ↗
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 w-full items-center justify-center text-center font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-muted)] no-underline sm:w-auto"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
