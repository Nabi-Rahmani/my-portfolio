'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import ProjectAppIcon from '@/components/ProjectAppIcon';
import { getProjectScreenshots, getValidProjectGithubUrl, getValidStoreUrl } from '@/lib/links';
import type { Project } from '@/types/project';

function platformLabel(platform: Project['platform']) {
  if (platform === 'android') return 'Android';
  if (platform === 'ios') return 'iOS';
  return 'Android · iOS planned';
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const screenshots = getProjectScreenshots(project.screenshots);
  const playStoreUrl = getValidStoreUrl(project.links.playStore);
  const appStoreUrl = getValidStoreUrl(project.links.appStore);
  const githubUrl = getValidProjectGithubUrl(project.links.github);
  const metrics = project.metrics?.filter((metric) => metric.label && metric.value) ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrevious = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current - 1 + screenshots.length) % screenshots.length,
    );
  }, [screenshots.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % screenshots.length,
    );
  }, [screenshots.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') goPrevious();
      if (event.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeLightbox, goNext, goPrevious, lightboxIndex]);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <section className="border-b border-[var(--line-16)]">
          <div className="site-container py-8 sm:py-10">
            <nav
              className="scrollbar-hide flex items-center gap-2 overflow-x-auto whitespace-nowrap font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)]"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="text-inherit no-underline hover:text-[var(--text-strong)]">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link
                href="/projects"
                className="text-inherit no-underline hover:text-[var(--text-strong)]"
              >
                Work
              </Link>
              <span aria-hidden>/</span>
              <span className="text-[var(--text-strong)]">{project.title}</span>
            </nav>
          </div>
        </section>

        <section className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-9 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-18 lg:py-26">
            <div>
              <div className="flex items-center gap-4">
                <ProjectAppIcon
                  title={project.title}
                  iconLight={project.iconLight}
                  iconDark={project.iconDark}
                  priority
                />
                <div>
                  <p className="eyebrow">{platformLabel(project.platform)}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                    {project.caseStudy.role}
                  </p>
                </div>
              </div>

              <h1 className="display-page mt-8 max-w-[10ch]">{project.title}</h1>
              <p className="mt-6 max-w-[30ch] text-[1.2rem] font-medium leading-8 text-[var(--text-body)]">
                {project.subtitle}
              </p>
              <p className="mt-5 max-w-[58ch] text-[0.9rem] leading-7 text-[var(--text-muted)]">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.badges?.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-[var(--line-16)] bg-[var(--surface-bg)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {playStoreUrl && (
                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none sm:w-auto"
                  >
                    Google Play ↗
                  </a>
                )}
                {appStoreUrl && (
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none sm:w-auto"
                  >
                    App Store ↗
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-full items-center justify-center rounded-full border border-[var(--line-24)] px-6 text-sm font-semibold text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none sm:w-auto"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-[20px] border border-[var(--line-16)] bg-[var(--accent-soft)] p-3 sm:rounded-[28px] sm:p-7">
              <div className="grid grid-cols-3 items-center gap-2.5 sm:gap-4">
                {screenshots.slice(0, 3).map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Open ${project.title} screen ${index + 1}`}
                    className={[
                      'relative aspect-[9/19.5] cursor-zoom-in overflow-hidden rounded-[14px] border border-[var(--line-18)] bg-[var(--surface-bg)] p-0 sm:rounded-[20px]',
                      index === 1 ? '-translate-y-3 sm:-translate-y-5' : '',
                    ].join(' ')}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} app screen ${index + 1}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 30vw, 200px"
                      priority={index === 1}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]">
          <div className="site-container grid gap-8 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
            <div>
              <p className="eyebrow">Scope and ownership</p>
              <h2 className="display-section mt-5 max-w-[9ch]">One product, end to end.</h2>
              <p className="mt-6 max-w-[42ch] text-[0.88rem] leading-7 text-[var(--text-muted)]">
                The work includes the product decisions around the code: interaction design,
                architecture, release readiness, and ongoing maintenance.
              </p>
            </div>

            <div>
              <div className="grid gap-px overflow-hidden rounded-[20px] border border-[var(--line-16)] bg-[var(--line-16)] sm:grid-cols-2">
                {project.caseStudy.responsibilities.map((responsibility, index) => (
                  <div
                    key={responsibility}
                    className="flex min-h-24 items-end justify-between bg-[var(--page-bg)] p-5"
                  >
                    <span className="text-[0.88rem] font-semibold">{responsibility}</span>
                    <span className="font-mono text-xs text-[var(--text-faint)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-[var(--line-16)]">
                {project.caseStudy.engineeringHighlights.map((highlight, index) => (
                  <div
                    key={highlight.title}
                    className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-[var(--line-16)] py-6 sm:grid-cols-[48px_180px_1fr] sm:gap-6"
                  >
                    <span className="font-mono text-xs text-[var(--accent)]">
                      0{index + 1}
                    </span>
                    <h3 className="text-[0.9rem] font-semibold">{highlight.title}</h3>
                    <p className="col-start-2 text-sm leading-6 text-[var(--text-muted)] sm:col-start-auto">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {screenshots.length > 0 && (
          <section className="border-b border-[var(--line-16)] py-14 sm:py-22 lg:py-28" aria-label="Product screens">
            <div className="site-container flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Product gallery</p>
                <h2 className="display-section mt-5">Inside {project.title}.</h2>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)]">
                Select a screen to inspect
              </p>
            </div>

            <div className="scrollbar-hide mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-5 sm:mt-10 sm:gap-5 sm:scroll-px-8 sm:px-8 lg:px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
              {screenshots.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Open ${project.title} screenshot ${index + 1}`}
                  className="relative aspect-[9/19.5] w-[180px] shrink-0 snap-center cursor-zoom-in overflow-hidden rounded-[18px] border border-[var(--line-18)] bg-[var(--surface-bg)] p-0 sm:w-[230px]"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover object-top transition-transform duration-300 hover:scale-[1.015]"
                    sizes="230px"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="border-b border-[var(--line-16)] bg-[var(--panel-bg)]">
          <div className="site-container py-14 sm:py-22 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="eyebrow">Product capability</p>
                <h2 className="display-section mt-5 max-w-[10ch]">
                  {project.featureSubtitle || `What ${project.title} does`}
                </h2>
              </div>
              <p className="max-w-[62ch] text-[0.9rem] leading-7 text-[var(--text-muted)] lg:justify-self-end">
                Every feature sits inside the same product system, with local persistence and
                predictable state carrying the experience between sessions.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-[var(--line-16)] bg-[var(--line-16)] md:grid-cols-2 lg:grid-cols-3">
              {(project.featureDetails ?? project.features.map((title) => ({ title, description: '' }))).map(
                (feature, index) => (
                  <article
                    key={feature.title}
                    className="min-h-[180px] bg-[var(--surface-bg)] p-5 sm:min-h-[220px] sm:p-7"
                  >
                    <span className="font-mono text-xs text-[var(--accent)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-8 text-[1.05rem] font-semibold tracking-[-0.025em] sm:mt-12">
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                        {feature.description}
                      </p>
                    )}
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-7 py-12 sm:gap-10 sm:py-18 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
            <div>
              <p className="eyebrow">Technical foundation</p>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.045em]">Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--line-16)] bg-[var(--surface-bg)] px-4 py-2.5 font-mono text-xs text-[var(--text-body)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {metrics.length > 0 && (
          <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]">
            <div className="site-container grid grid-cols-2 gap-7 py-12 sm:grid-cols-3 sm:gap-8 sm:py-18">
              {metrics.map((metric) => (
                <div key={`${metric.label}-${metric.value}`}>
                  <p className="text-[2.4rem] font-semibold tracking-[-0.05em] text-[var(--accent)]">
                    {metric.value}
                  </p>
                  <p className="eyebrow mt-2">{metric.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-[var(--accent-soft)]">
          <div className="site-container flex flex-col gap-7 py-14 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:py-22">
            <div>
              <p className="eyebrow text-[var(--accent)]">Released product</p>
              <h2 className="display-section mt-5 max-w-[12ch]">Explore {project.title} in the store.</h2>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              {playStoreUrl && (
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none sm:w-auto"
                >
                  Google Play ↗
                </a>
              )}
              {appStoreUrl && (
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none sm:w-auto"
                >
                  App Store ↗
                </a>
              )}
              <Link
                href="/projects"
                className="flex h-12 w-full items-center justify-center rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] px-6 text-sm font-semibold text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none sm:w-auto"
              >
                All work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer
        links={[
          ...(project.links.privacy
            ? [{ label: 'Privacy Policy', href: project.links.privacy }]
            : []),
          ...(project.links.terms ? [{ label: 'Terms of Use', href: project.links.terms }] : []),
          { label: 'All Work', href: '/projects' },
        ]}
      />

      <AnimatePresence>
        {lightboxIndex !== null && screenshots[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-5"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} screenshot viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close screenshot viewer"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-xl text-white"
            >
              ×
            </button>
            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrevious}
                  aria-label="Previous screenshot"
                  className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-white md:left-7"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-white md:right-7"
                >
                  →
                </button>
              </>
            )}
            <div className="relative h-[85vh] w-[min(88vw,440px)]">
              <Image
                src={screenshots[lightboxIndex]}
                alt={`${project.title} screenshot ${lightboxIndex + 1}`}
                fill
                className="rounded-[1.5rem] object-contain"
                sizes="(max-width: 768px) 88vw, 440px"
                priority
              />
            </div>
            <span className="absolute bottom-5 font-mono text-xs text-white/70">
              {lightboxIndex + 1} / {screenshots.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
