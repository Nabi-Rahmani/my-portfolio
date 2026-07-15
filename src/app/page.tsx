'use client';

import type { MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getFeaturedProjects } from '@/data/projects';
import { blogPosts } from '@/data/blog';
import PhoneScreenshot from '@/components/PhoneScreenshot';
import ScrollReveal from '@/components/ScrollReveal';
import MouseGlow from '@/components/MouseGlow';
import Footer from '@/components/Footer';
import {
  contactMailto,
  hasCalendly,
  hasCv,
  hasWeb3FormsKey,
  siteConfig,
} from '@/config/site';
import { scrollToHash, socialLinks } from '@/config/navigation';
import { getValidStoreUrl } from '@/lib/links';
import { atelierEase, selectTransition } from '@/lib/animations';

const ContactForm = dynamic(() => import('@/components/ContactForm'));

/** Curated subset for home — full set lives on /projects */
const curatedProjects = getFeaturedProjects(3);
const latestPosts = blogPosts.slice(0, 3);

/** Hiring-manager value lines (owner may refine — see work item copy notes). */
const projectValueLines: Record<string, string> = {
  'focus-flow':
    'A calm focus timer for deep work — sessions, soundscapes, and analytics that stay out of the way.',
  'dev-discipline':
    'A 60-day discipline system for engineers who want habits that stick — not another empty streak counter.',
  'mihrab-by-raha':
    'A quiet Islamic companion for daily worship — prayer times, Quran, and Hijri calendar in one calm app.',
};

const platformLabel: Record<string, string> = {
  ios: 'iOS',
  android: 'Android',
  both: 'Android · iOS planned',
};

export default function Home() {
  const reduceMotion = useReducedMotion();

  const handleScrollTo =
    (hash: string) => (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      event.preventDefault();
      scrollToHash(hash, reduceMotion);
    };

  const heroEnter = (delay: number) =>
    selectTransition(reduceMotion, {
      duration: 0.6,
      delay,
      ease: atelierEase,
    });

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <MouseGlow />

      {/* ── Hero — cold-land: who / stack / available / next step ───── */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-between px-6 md:px-12 pt-28 md:pt-36 pb-12 md:pb-16"
        aria-label="Introduction"
      >
        <div className="flex-1 flex flex-col justify-center max-w-[1200px] mx-auto w-full">
          {/* Availability + role eyebrow */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroEnter(0.08)}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8 md:mb-10"
          >
            <span
              className="inline-flex items-center gap-2 self-start rounded-[999px] border border-[var(--atelier-accent)]/40 bg-[var(--atelier-accent)]/10 px-3 py-1 text-[12px] font-medium text-[var(--atelier-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--atelier-accent)] motion-safe:animate-pulse"
                aria-hidden
              />
              {siteConfig.availability}
            </span>
            <span
              className="text-[13px] tracking-[0.12em] uppercase text-[var(--ink-soft)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Flutter · Mobile engineer · Ankara
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroEnter(0.16)}
            className="mb-6 md:mb-8"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(64px, 12vw, 200px)',
              lineHeight: 0.92,
            }}
          >
            Nabi
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--atelier-accent)' }}>Rahmani.</em>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroEnter(0.28)}
            className="max-w-[34rem] leading-relaxed text-[var(--ink-soft)]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(17px, 1.5vw, 22px)',
            }}
          >
            I build Flutter apps that feel inevitable — offline-first, cleanly architected, and{' '}
            <span style={{ color: 'var(--atelier-accent)' }}>actually shipped</span> to real users.
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroEnter(0.36)}
            className="mt-4 max-w-[32rem] text-[14px] leading-relaxed text-[var(--muted)]"
          >
            Hiring for a Flutter / mobile engineer? Here is selected work, then a straight path to
            reach me.
          </motion.p>
        </div>

        {/* Proof chips + dual CTAs */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroEnter(0.44)}
          className="flex flex-wrap items-end justify-between gap-8 max-w-[1200px] mx-auto w-full mt-14 md:mt-16"
        >
          {/* Honest identity chips — not invented social-proof metrics */}
          <div className="flex items-center">
            {[
              { value: '3+', label: 'years shipping' },
              { value: '3', label: 'apps on Play' },
              { value: '∞', label: 'çay' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && (
                  <div className="w-px h-10 bg-[var(--line)] mx-4 md:mx-6 shrink-0" aria-hidden />
                )}
                <div className="text-left sm:text-center">
                  <div
                    className="leading-none mb-1"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(22px, 2.8vw, 30px)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.08em] uppercase text-[var(--muted)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-stretch sm:items-end gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={handleScrollTo('#projects')}
                className="atelier-cta inline-flex items-center gap-1.5 rounded-[999px] bg-[var(--ink)] text-[var(--cream)] text-[15px] font-medium no-underline px-6 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                View selected work
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#contact"
                onClick={handleScrollTo('#contact')}
                className="inline-flex items-center rounded-[999px] border border-[var(--line)] text-[var(--ink)] text-[15px] font-medium no-underline px-6 py-3 hover:border-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                Get in touch
              </a>
              {hasCv() && (
                <a
                  href={siteConfig.cvPath}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-[999px] border border-[var(--line)] text-[var(--ink)] text-[15px] font-medium no-underline px-6 py-3 hover:border-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  Download CV
                </a>
              )}
            </div>

            <div className="flex items-center gap-1 self-end">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--atelier-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Projects — curated proof ─────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 px-6 md:px-12" aria-label="Selected work">
        <div className="max-w-[1200px] mx-auto mb-14 md:mb-20">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span
                  className="block text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-3"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  [ Selected Work ]
                </span>
                <p
                  className="max-w-[28rem] text-[var(--ink-soft)] m-0"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(18px, 2vw, 22px)',
                  }}
                >
                  Real apps on Google Play — not concept decks.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-[13px] font-medium text-[var(--ink)] hover:text-[var(--atelier-accent)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)] shrink-0"
              >
                All projects →
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className="max-w-[1200px] mx-auto flex flex-col gap-24 md:gap-32">
          {curatedProjects.map((project, i) => {
            const isEven = i % 2 === 0;
            const description = projectValueLines[project.slug] ?? project.subtitle;
            const playStore = getValidStoreUrl(project.links.playStore);
            const appStore = getValidStoreUrl(project.links.appStore);
            const wantsIos = project.platform === 'ios' || project.platform === 'both';
            const techPreview = project.techStack.slice(0, 4);
            const featurePreview = project.features.slice(0, 4);

            return (
              <ScrollReveal key={project.id}>
                <article
                  className={`flex flex-col ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-12 md:gap-16 items-center`}
                >
                  <div className="shrink-0">
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -8, rotate: isEven ? -1.5 : 1.5 }
                      }
                      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <PhoneScreenshot
                        src={project.screenshots[0]}
                        alt={`${project.title} app screenshot`}
                        priority={i === 0}
                      />
                    </motion.div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[13px] text-[var(--muted)] mb-3 tracking-[0.1em]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {String(i + 1).padStart(3, '0')}
                      <span className="mx-2 opacity-40">·</span>
                      {platformLabel[project.platform] ?? project.platform}
                    </div>
                    <h2
                      className="mb-4 leading-tight"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(36px, 5vw, 64px)',
                      }}
                    >
                      {project.title}
                    </h2>
                    <p className="text-[15px] text-[var(--ink-soft)] leading-[1.6] mb-5 max-w-[480px]">
                      {description}
                    </p>

                    {/* Stack cues — scannable proof of how it was built */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {techPreview.map((tech) => (
                        <span
                          key={tech}
                          className="border border-[var(--line)] text-[var(--muted)] rounded-[999px] px-3 py-0.5 text-[11px] tracking-[0.04em]"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Feature highlights (trimmed to reduce clutter) */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {featurePreview.map((tag) => (
                        <span
                          key={tag}
                          className="text-[12px] text-[var(--ink-soft)]"
                        >
                          <span className="text-[var(--atelier-accent)] mr-1" aria-hidden>
                            ·
                          </span>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.badges && project.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.badges.map((badge) => (
                          <span
                            key={badge}
                            className="border border-[var(--atelier-accent)] text-[var(--atelier-accent)] rounded-[999px] px-3 py-0.5 text-[11px] tracking-[0.04em]"
                            style={{ fontFamily: 'var(--font-mono)' }}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-5 items-center">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-[13px] font-medium text-[var(--ink)] hover:text-[var(--atelier-accent)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                      >
                        View project →
                      </Link>
                      {playStore && (
                        <a
                          href={playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                        >
                          Play Store ↗
                        </a>
                      )}
                      {appStore && (
                        <a
                          href={appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                        >
                          App Store ↗
                        </a>
                      )}
                      {wantsIos && !appStore && (
                        <span className="text-[13px] text-[var(--muted)] opacity-50">
                          iOS not released
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── About preview ────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12" aria-label="About">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-16 md:mb-20">
              <span
                className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                [ About ]
              </span>
              <Link
                href="/about"
                className="text-[13px] font-medium text-[var(--ink)] hover:text-[var(--atelier-accent)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                Full story →
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
              <p
                className="leading-tight text-[var(--atelier-accent)] m-0"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(36px, 4.5vw, 64px)',
                }}
              >
                Craft over speed.
                <br />
                Ideally both.
              </p>

              <div>
                <p className="text-[15px] text-[var(--ink-soft)] leading-[1.65] mb-6">
                  I&apos;m Nabi — a Flutter developer from Mazar-i-Sharif, Afghanistan, now based in
                  Ankara. I ship mobile products that stay maintainable after launch:{' '}
                  <strong className="font-semibold text-[var(--ink)]">clean architecture</strong>,{' '}
                  <strong className="font-semibold text-[var(--ink)]">offline-first reliability</strong>,
                  and a healthy distrust of feature creep. If you&apos;re hiring for someone who
                  finishes apps — not just prototypes — I&apos;d like to talk.
                </p>
                <dl className="flex flex-col gap-3 mb-8">
                  {[
                    { label: 'Based', value: 'Ankara, Turkey · GMT+3' },
                    { label: 'Stack', value: 'Flutter · Dart · Riverpod · Drift · Firebase' },
                    { label: 'Status', value: siteConfig.availability, accent: true },
                    { label: 'Speaks', value: 'English · Persian (Dari) · Turkish' },
                  ].map(({ label, value, accent }) => (
                    <div key={label} className="flex gap-6">
                      <dt
                        className="text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] w-16 shrink-0 pt-0.5"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {label}
                      </dt>
                      <dd
                        className={`text-[15px] m-0 ${
                          accent
                            ? 'text-[var(--atelier-accent)] font-medium'
                            : 'text-[var(--ink)]'
                        }`}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="#contact"
                  onClick={handleScrollTo('#contact')}
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink)] no-underline hover:text-[var(--atelier-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  Let&apos;s talk
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stack strip ──────────────────────────────────────────────── */}
      <section className="pb-24 md:pb-32 px-6 md:px-12" aria-label="Technology stack">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-8 border-t border-b border-[var(--line)]">
              {[
                'Flutter',
                'Dart',
                'Riverpod',
                'Drift',
                'Supabase',
                'RevenueCat',
                'GitHub Actions',
                'Next.js',
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-[13px] tracking-[0.06em] uppercase text-[var(--muted)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Writing ──────────────────────────────────────────────────── */}
      <section id="blog" className="py-24 md:py-32 px-6 md:px-12" aria-label="Writing">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-16 md:mb-20">
              <div>
                <span
                  className="block text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-2"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  [ Writing ]
                </span>
                <p className="text-[14px] text-[var(--muted)] m-0 max-w-sm">
                  Practical notes on Flutter production, architecture, and shipping.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-[13px] font-medium text-[var(--ink)] hover:text-[var(--atelier-accent)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)] shrink-0"
              >
                All posts →
              </Link>
            </div>
          </ScrollReveal>

          <div className="flex flex-col divide-y divide-[var(--line)]">
            {latestPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={reduceMotion ? 0 : i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10 py-8 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  <div
                    className="shrink-0 text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] w-36"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                    <span className="mx-2 opacity-40">·</span>
                    {post.readingTime} min
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-[var(--ink)] group-hover:text-[var(--atelier-accent)] transition-colors duration-200 leading-snug mb-2"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(18px, 2vw, 24px)',
                      }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-[14px] text-[var(--muted)] leading-[1.55] line-clamp-2 m-0">
                      {post.excerpt}
                    </p>
                  </div>

                  <span
                    className="shrink-0 text-[var(--muted)] group-hover:text-[var(--atelier-accent)] motion-safe:group-hover:translate-x-1 transition-all duration-200 hidden md:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12" aria-label="Contact">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <span
              className="block text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              [ Get in Touch ]
            </span>
            <h2
              className="mb-4 text-[var(--ink)] leading-tight"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 44px)',
              }}
            >
              Have a role or project in mind?
            </h2>
            <p
              className="mb-3 text-[15px] font-medium text-[var(--atelier-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {siteConfig.availability}
            </p>
            <p className="mb-12 md:mb-16 max-w-[36rem] text-[15px] text-[var(--ink-soft)] leading-relaxed">
              Freelance, full-time remote, or a collaboration — tell me what you&apos;re building.
              I reply personally.
            </p>
          </ScrollReveal>

          {hasWeb3FormsKey() ? (
            <ScrollReveal>
              <div className="mb-12">
                <ContactForm />
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <p className="mb-8 max-w-[560px] text-[15px] text-[var(--ink-soft)] leading-relaxed">
                Prefer email? Reach me directly — I read every message.
              </p>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="mb-12">
              <a
                href={contactMailto()}
                className="block no-underline group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                <span
                  className="block text-[var(--ink)] group-hover:text-[var(--atelier-accent)] transition-colors duration-300 leading-none break-words"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(28px, 7vw, 120px)',
                  }}
                >
                  {siteConfig.contactEmail}
                  <span
                    className="inline-block motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 transition-transform duration-300"
                    style={{ fontSize: '0.4em', verticalAlign: 'super', marginLeft: '6px' }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </div>

            {hasCalendly() && (
              <div className="mb-8">
                <a
                  href={siteConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-[999px] bg-[var(--ink)] text-[var(--cream)] text-[15px] font-medium no-underline px-6 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  Book a 15-min call
                  <span aria-hidden="true" className="ml-1">
                    ↗
                  </span>
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {[
                ...socialLinks.map((s) => ({
                  label: s.label,
                  href: s.href,
                  external: true as const,
                })),
                { label: 'Writing', href: '/blog', external: false as const },
              ].map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="border border-[var(--line)] rounded-[999px] px-4 py-1.5 text-[13px] text-[var(--muted)] no-underline hover:bg-[var(--ink)] hover:text-[var(--cream)] hover:border-[var(--ink)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  {label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
