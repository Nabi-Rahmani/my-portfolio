'use client';

import type { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllProjects } from '@/data/projects';
import { blogPosts } from '@/data/blog';
import AtelierNav from '@/components/AtelierNav';
import PhoneScreenshot from '@/components/PhoneScreenshot';
import ScrollReveal from '@/components/ScrollReveal';
import MouseGlow from '@/components/MouseGlow';

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: HTMLElement | string, options?: { offset?: number; immediate?: boolean }) => void;
    };
  }
}

const allProjects = getAllProjects().slice(0, 3);
const latestPosts = blogPosts.slice(0, 3);

const projectDescriptions: Record<string, string> = {
  'focus-flow':
    "A calm, guided focus timer for deep work. Sessions, soundscapes, breathing exercises, and analytics that don't shame you.",
  'dev-discipline':
    'Build better habits, stay consistent, become unstoppable. A 60-day system for engineers who want to actually finish things.',
  'mihrab-by-raha':
    'A peaceful Islamic companion for daily worship. Prayer times, Quran reader, and a Hijri calendar — designed to feel like quiet.',
};

export default function Home() {
  const handleScrollTo =
    (hash: string) => (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (typeof window === 'undefined') return;
      event.preventDefault();
      const target = document.querySelector(hash) as HTMLElement | null;
      const lenis = window.__lenis;
      if (target && lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(target, { offset: -80 });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash);
      }
    };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <MouseGlow />
      <AtelierNav />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-between px-6 md:px-12 pt-28 md:pt-36 pb-12 md:pb-16"
      >
        {/* Main content — centered vertically */}
        <div className="flex-1 flex flex-col justify-center max-w-[1200px] mx-auto w-full">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-8 md:mb-12"
          >
            <hr className="flex-none w-12 md:w-16 border-none border-t border-[var(--line)]" style={{ borderTopWidth: '1px', borderTopColor: 'var(--line)', borderTopStyle: 'solid' }} />
            <span
              className="text-[13px] tracking-[0.14em] uppercase text-[var(--ink-soft)] whitespace-nowrap"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Flutter Developer · Ankara, Turkey
            </span>
            <hr className="flex-none w-12 md:w-16 border-none" style={{ borderTopWidth: '1px', borderTopColor: 'var(--line)', borderTopStyle: 'solid' }} />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-6 md:mb-8"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(72px, 13vw, 220px)',
              lineHeight: 0.92,
            }}
          >
            Nabi
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--atelier-accent)' }}>Rahmani.</em>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-[560px] leading-relaxed text-[var(--ink-soft)]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(17px, 1.5vw, 22px)',
            }}
          >
            Building mobile apps that feel inevitable — clean, offline-first, and{' '}
            <span style={{ color: 'var(--atelier-accent)' }}>actually shipped.</span>
          </motion.p>
        </div>

        {/* Stats row + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-8 max-w-[1200px] mx-auto w-full mt-16"
        >
          {/* Stats */}
          <div className="flex items-center">
            {[
              { value: '3+', label: 'years' },
              { value: '3', label: 'apps' },
              { value: '∞', label: 'çay' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && (
                  <div className="w-px h-10 bg-[var(--line)] mx-5 md:mx-6 shrink-0" />
                )}
                <div className="text-center">
                  <div
                    className="leading-none mb-1"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(24px, 3vw, 32px)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[11px] tracking-[0.1em] uppercase text-[var(--muted)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA pill */}
          <a
            href="#projects"
            onClick={handleScrollTo('#projects')}
            className="atelier-cta inline-flex items-center rounded-[999px] bg-[var(--ink)] text-[var(--cream)] text-[15px] font-medium no-underline px-6 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
          >
            View selected work
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto mb-16 md:mb-20">
          <ScrollReveal>
            <span
              className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              [ Selected Work ]
            </span>
          </ScrollReveal>
        </div>
        <div className="max-w-[1200px] mx-auto flex flex-col gap-24 md:gap-32">
          {allProjects.map((project, i) => {
            const isEven = i % 2 === 0;
            const description = projectDescriptions[project.slug] ?? project.subtitle;

            return (
              <ScrollReveal key={project.id}>
                <div
                  className={`flex flex-col ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-12 md:gap-16 items-center`}
                >
                  {/* Phone mockup */}
                  <div className="shrink-0">
                    <motion.div
                      whileHover={{ y: -8, rotate: isEven ? -1.5 : 1.5 }}
                      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <PhoneScreenshot src={project.screenshots[0]} alt={project.title} />
                    </motion.div>
                  </div>

                  {/* Text content */}
                  <div className="flex-1">
                    <div
                      className="text-[13px] text-[var(--muted)] mb-4 tracking-[0.1em]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {String(i + 1).padStart(3, '0')}
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
                    <p className="text-[15px] text-[var(--ink-soft)] leading-[1.6] mb-6 max-w-[480px]">
                      {description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.features.map((tag) => (
                        <span
                          key={tag}
                          className="border border-[var(--line)] text-[var(--muted)] rounded-[999px] px-3 py-0.5 text-[11px] tracking-[0.04em]"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-5 items-center">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-[13px] font-medium text-[var(--ink)] hover:text-[var(--atelier-accent)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                      >
                        View project →
                      </Link>
                      {project.links.playStore && project.links.playStore !== '#' && (
                        <a
                          href={project.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                        >
                          Play Store ↗
                        </a>
                      )}
                      {project.links.appStore === '#' && (
                        <span className="text-[13px] text-[var(--muted)] opacity-50">
                          iOS coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12">
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
                More →
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left: pull-quote */}
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

              {/* Right: bio + meta */}
              <div>
                <p className="text-[15px] text-[var(--ink-soft)] leading-[1.65] mb-8">
                  I&apos;m Nabi, a Flutter developer originally from Mazar-i-Sharif, Afghanistan, now
                  living and working in Ankara, Turkey. I specialize in{' '}
                  <strong className="font-semibold text-[var(--ink)]">shipping mobile apps quickly</strong>{' '}
                  without making the kind of mess that haunts you in two months —{' '}
                  <strong className="font-semibold text-[var(--ink)]">clean architecture, offline-first reliability</strong>,
                  and a healthy distrust of feature creep. If you&apos;re
                  hiring for craft over speed (or, ideally, both), I&apos;d love to talk.
                </p>
                <dl className="flex flex-col gap-3">
                  {[
                    { label: 'Based', value: 'Ankara, Turkey · GMT+3' },
                    { label: 'Stack', value: 'Flutter · Dart · Firebase · Riverpod' },
                    { label: 'Status', value: 'Open to collaborations', accent: true },
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
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────────────────── */}
      <section id="blog" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-16 md:mb-20">
              <span
                className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                [ Writing ]
              </span>
              <Link
                href="/blog"
                className="text-[13px] font-medium text-[var(--ink)] hover:text-[var(--atelier-accent)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                All posts →
              </Link>
            </div>
          </ScrollReveal>

          <div className="flex flex-col divide-y divide-[var(--line)]">
            {latestPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10 py-8 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  {/* Date + reading time */}
                  <div
                    className="shrink-0 text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] w-36"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                    <span className="mx-2 opacity-40">·</span>
                    {post.readingTime} min
                  </div>

                  {/* Title + excerpt */}
                  <div className="flex-1">
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

                  {/* Arrow */}
                  <span
                    className="shrink-0 text-[var(--muted)] group-hover:text-[var(--atelier-accent)] group-hover:translate-x-1 transition-all duration-200 hidden md:block"
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
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <span
              className="block text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-16 md:mb-20"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              [ Get in Touch ]
            </span>
          </ScrollReveal>
          <ScrollReveal>
            {/* Large email link */}
            <div className="mb-12">
              <a
                href="mailto:codewithnabi@gmail.com"
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
                  codewithnabi@gmail.com
                  <span
                    className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    style={{ fontSize: '0.4em', verticalAlign: 'super', marginLeft: '6px' }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </div>

            {/* Social pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'GitHub', href: 'https://github.com/Nabi-Rahmani', external: true },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/muhammad-nabi-rahmani-%F0%9F%87%B5%F0%9F%87%B8-8945b21ba/',
                  external: true,
                },
                { label: 'X / Twitter', href: 'https://x.com/nabirahmani_dev', external: true },
                { label: 'Blog', href: '/blog', external: false },
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

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--line)] py-6 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between items-center gap-2">
          <span
            className="text-[11px] text-[var(--muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            © 2026 Muhammad Nabi Rahmani · Crafted in Ankara
          </span>
          <span
            className="text-[11px] text-[var(--muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            v.atelier · 03
          </span>
        </div>
      </footer>
    </div>
  );
}
