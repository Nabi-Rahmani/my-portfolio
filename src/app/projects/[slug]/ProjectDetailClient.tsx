'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import type { Project } from '@/types/project';
import Footer from '@/components/Footer';
import { fadeUpMotion } from '@/lib/animations';
import {
  getProjectScreenshots,
  getValidProjectGithubUrl,
  getValidStoreUrl,
} from '@/lib/links';

const playIconPath =
  'M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zM15 12L7 7v10l8-5zm2-5l5.5 3.5a1.5 1.5 0 010 2.5L17 17V7z';
const appleIconPath =
  'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z';
const githubIconPath =
  'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';

function platformLabel(platform: Project['platform']): string {
  if (platform === 'both') return 'Android · iOS planned';
  if (platform === 'ios') return 'iOS';
  return 'Android';
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const fadeUp = fadeUpMotion(reduceMotion);

  const playStoreUrl = getValidStoreUrl(project.links.playStore);
  const appStoreUrl = getValidStoreUrl(project.links.appStore);
  const githubUrl = getValidProjectGithubUrl(project.links.github);
  const wantsIos = project.platform === 'ios' || project.platform === 'both';
  const wantsAndroid = project.platform === 'android' || project.platform === 'both';
  const screenshots = useMemo(
    () => getProjectScreenshots(project.screenshots),
    [project.screenshots],
  );
  const metrics = project.metrics?.filter((m) => m.label && m.value) ?? [];
  const hasLegal = Boolean(project.links.privacy || project.links.terms);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 80]);
  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.04],
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goNext = useCallback(() => {
    if (lightboxIndex === null || screenshots.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % screenshots.length);
  }, [lightboxIndex, screenshots.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null || screenshots.length === 0) return;
    setLightboxIndex(
      (lightboxIndex - 1 + screenshots.length) % screenshots.length,
    );
  }, [lightboxIndex, screenshots.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const availabilityLine =
    playStoreUrl && !appStoreUrl
      ? 'Available on Google Play — iOS not released yet.'
      : playStoreUrl && appStoreUrl
        ? 'Available on Android and iOS.'
        : appStoreUrl && !playStoreUrl
          ? 'Available on the App Store — Android not released yet.'
          : 'Store release status below.';

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] overflow-hidden">
      {/* 1. HERO — what it is + one-line outcome */}
      <section
        ref={heroRef}
        className="relative pt-28 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 overflow-hidden"
        aria-label={`${project.title} overview`}
      >
        <div className="max-w-[1200px] mx-auto relative z-10">
          <nav
            className="flex items-center gap-2 text-[0.8125rem] text-[var(--muted)] mb-8 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-[var(--ink)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/projects"
              className="hover:text-[var(--ink)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              Projects
            </Link>
            <span aria-hidden>/</span>
            <span className="text-[var(--ink)]">{project.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 text-center md:text-left min-w-0">
              {(project.iconLight || project.iconDark) && (
                <div className="mb-6 inline-block">
                  {project.iconLight && (
                    <Image
                      src={project.iconLight}
                      alt={`${project.title} app icon`}
                      width={96}
                      height={96}
                      className="rounded-2xl shadow-lg dark:hidden w-20 h-20 md:w-24 md:h-24"
                      priority
                    />
                  )}
                  {project.iconDark && (
                    <Image
                      src={project.iconDark}
                      alt={`${project.title} app icon`}
                      width={96}
                      height={96}
                      className="rounded-2xl shadow-lg hidden dark:block w-20 h-20 md:w-24 md:h-24"
                      priority
                    />
                  )}
                </div>
              )}

              <p
                className="text-[11px] tracking-[0.16em] uppercase text-[var(--muted)] mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {platformLabel(project.platform)}
              </p>

              <h1
                className="tracking-tight leading-[1.1] mb-4"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                }}
              >
                {project.title}
              </h1>

              <p className="text-[1.125rem] md:text-[1.25rem] text-[var(--ink-soft)] leading-relaxed mb-3 max-w-[520px] mx-auto md:mx-0">
                {project.subtitle}
              </p>
              <p className="text-[0.875rem] text-[var(--muted)] mb-0 max-w-[520px] mx-auto md:mx-0">
                {availabilityLine}
              </p>
            </div>

            {project.heroImage && (
              <motion.div
                className="w-full max-w-[280px] md:max-w-none md:flex-1 lg:max-w-[420px]"
                style={{ y: heroY, scale: heroScale }}
              >
                <Image
                  src={project.heroImage}
                  alt={`${project.title} product preview`}
                  width={841}
                  height={1280}
                  className="rounded-3xl shadow-2xl w-full h-auto border border-[var(--line)]"
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 40vw, 420px"
                  priority
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 2. PROOF STRIP — badges + real store/GitHub only */}
      <section
        className="px-6 md:px-12 pb-12 md:pb-16 border-b border-[var(--line)]"
        aria-label="Shipping proof"
      >
        <div className="max-w-[1200px] mx-auto flex flex-col gap-5">
          {project.badges && project.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 border border-[var(--atelier-accent)] text-[var(--atelier-accent)] rounded-full text-[0.8125rem]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3 items-center">
            {playStoreUrl && (
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-full text-[0.875rem] font-medium no-underline hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d={playIconPath} />
                </svg>
                Google Play
              </a>
            )}
            {appStoreUrl && (
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-full text-[0.875rem] font-medium no-underline hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d={appleIconPath} />
                </svg>
                App Store
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--line)] text-[var(--ink)] rounded-full text-[0.875rem] font-medium no-underline hover:border-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d={githubIconPath} />
                </svg>
                GitHub
              </a>
            )}
            {wantsAndroid && !playStoreUrl && (
              <span className="text-[0.8125rem] text-[var(--muted)] opacity-70">
                Android not released
              </span>
            )}
            {wantsIos && !appStoreUrl && (
              <span className="text-[0.8125rem] text-[var(--muted)] opacity-70">
                iOS not released
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 3. VISUAL PROOF — screenshot gallery */}
      {screenshots.length > 0 && (
        <section className="py-16 md:py-24 overflow-hidden" aria-label="Screenshots">
          <div className="max-w-[900px] mx-auto px-6 mb-10 text-center">
            <motion.h2
              className="tracking-tight"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Screenshots
            </motion.h2>
            <p className="text-[0.875rem] text-[var(--muted)] mt-2 m-0">
              Tap a frame to enlarge
            </p>
          </div>

          <div className="px-6">
            <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide max-w-[1200px] mx-auto">
              {screenshots.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  className="flex-shrink-0 snap-center rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--cream-2)] shadow-lg cursor-pointer p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                  style={{ width: '220px', height: '440px' }}
                  onClick={() => openLightbox(i)}
                  aria-label={`Open ${project.title} screenshot ${i + 1}`}
                >
                  <motion.div
                    className="w-full h-full"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -6, transition: { duration: 0.35 } }
                    }
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      width={220}
                      height={440}
                      className="w-full h-full object-cover pointer-events-none"
                      sizes="220px"
                    />
                  </motion.div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. WHAT WAS BUILT */}
      <section className="px-6 md:px-12 py-16 md:py-24" aria-label="What was built">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12 md:mb-16 max-w-[640px] mx-auto">
            <span
              className="block text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              [ What was built ]
            </span>
            <h2
              className="tracking-tight mb-4"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              }}
            >
              {project.featureSubtitle || `Inside ${project.title}`}
            </h2>
            <p className="text-[0.9375rem] text-[var(--ink-soft)] leading-relaxed m-0">
              {project.description}
            </p>
          </div>

          {project.featureDetails && project.featureDetails.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {project.featureDetails.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--cream-2)] p-6 md:p-7"
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  <div
                    className="text-[11px] tracking-[0.1em] text-[var(--atelier-accent)] mb-3"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-[1.0625rem] font-semibold mb-2.5 text-[var(--ink)]">
                    {feature.title}
                  </h3>
                  <p className="text-[0.875rem] text-[var(--ink-soft)] leading-[1.7] m-0">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {project.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1.5 border border-[var(--line)] text-[var(--muted)] rounded-full text-[0.8125rem]"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. STACK */}
      <section
        className="px-6 md:px-12 py-16 md:py-20 border-t border-[var(--line)]"
        aria-label="Tech stack"
      >
        <div className="max-w-[900px] mx-auto text-center">
          <h2
            className="tracking-tight mb-8"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            }}
          >
            Stack
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-[var(--line)] text-[var(--ink)] text-[0.875rem] font-medium"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OPTIONAL REAL METRICS — only when owner-supplied */}
      {metrics.length > 0 && (
        <section
          className="px-6 md:px-12 py-16 md:py-20 border-t border-[var(--line)]"
          aria-label="Outcomes"
        >
          <div className="max-w-[900px] mx-auto text-center">
            <h2
              className="tracking-tight mb-8"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              }}
            >
              Outcomes
            </h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {metrics.map((metric) => (
                <div key={`${metric.label}-${metric.value}`} className="text-center min-w-[100px]">
                  <div
                    className="leading-none mb-2 text-[var(--atelier-accent)]"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    className="text-[11px] tracking-[0.1em] uppercase text-[var(--muted)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. LEGAL — only when links exist */}
      {hasLegal && (
        <section
          className="px-6 md:px-12 py-12 border-t border-[var(--line)]"
          aria-label="Legal"
        >
          <div className="max-w-[900px] mx-auto flex flex-wrap gap-4 justify-center text-[0.875rem]">
            {project.links.privacy && (
              <Link
                href={project.links.privacy}
                className="text-[var(--muted)] hover:text-[var(--atelier-accent)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                Privacy Policy
              </Link>
            )}
            {project.links.terms && (
              <Link
                href={project.links.terms}
                className="text-[var(--muted)] hover:text-[var(--atelier-accent)] transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                Terms of Use
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Closing CTA — honest store targets only */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-[560px] mx-auto text-center">
          <h2
            className="tracking-tight mb-3"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            }}
          >
            Try {project.title}
          </h2>
          <p className="text-[0.9375rem] text-[var(--ink-soft)] mb-8 leading-relaxed">
            {availabilityLine}
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            {playStoreUrl && (
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 bg-[var(--ink)] text-[var(--cream)] rounded-full text-[0.9375rem] font-medium no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d={playIconPath} />
                </svg>
                Get on Play Store
              </a>
            )}
            {appStoreUrl && (
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 border border-[var(--line)] text-[var(--ink)] rounded-full text-[0.9375rem] font-medium no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                App Store
              </a>
            )}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-7 py-3 text-[0.9375rem] font-medium text-[var(--muted)] no-underline hover:text-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              All projects
            </Link>
          </div>
        </div>
      </section>

      <Footer
        links={[
          ...(project.links.privacy
            ? [{ label: 'Privacy Policy', href: project.links.privacy }]
            : []),
          ...(project.links.terms
            ? [{ label: 'Terms of Use', href: project.links.terms }]
            : []),
          { label: 'All Projects', href: '/projects' },
        ]}
      />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && screenshots[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} screenshot viewer`}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={closeLightbox}
              aria-hidden
            />

            <button
              type="button"
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="absolute top-6 left-6 z-10 text-white/60 text-[0.875rem] font-medium">
              {lightboxIndex + 1} / {screenshots.length}
            </div>

            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-3 md:left-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Previous screenshot"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="absolute right-3 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Next screenshot"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}

            <div className="relative z-10 max-h-[85vh] max-w-[90vw] md:max-w-[440px]">
              <Image
                src={screenshots[lightboxIndex]}
                alt={`${project.title} screenshot ${lightboxIndex + 1}`}
                width={540}
                height={960}
                className="rounded-3xl shadow-2xl w-full h-auto max-h-[85vh] object-contain"
                sizes="(max-width: 768px) 90vw, 440px"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
