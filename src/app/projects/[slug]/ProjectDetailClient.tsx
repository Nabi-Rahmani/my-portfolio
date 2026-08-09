'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import Footer from '@/components/Footer';
import ProjectAppIcon from '@/components/ProjectAppIcon';
import ProjectDemoPlayer from '@/components/ProjectDemoPlayer';
import {
  getProjectDemo,
  getProjectImages,
  getProjectLeadImage,
  getValidProjectGithubUrl,
  getValidStoreUrl,
} from '@/lib/links';
import type { Project } from '@/types/project';

function platformLabel(platform: Project['platform']) {
  if (platform === 'android') return 'Android';
  if (platform === 'ios') return 'iOS';
  return 'Android · iOS planned';
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const images = getProjectImages(project.media).slice(0, 3);
  const leadImage = getProjectLeadImage(project);
  const demo = getProjectDemo(project.media);
  const playStoreUrl = getValidStoreUrl(project.links.playStore);
  const appStoreUrl = getValidStoreUrl(project.links.appStore);
  const githubUrl = getValidProjectGithubUrl(project.links.github);
  const metrics = project.metrics?.filter((metric) => metric.label && metric.value) ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openLightbox = useCallback((index: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
  }, []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrevious = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') goPrevious();
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'Tab') {
        const focusable = lightboxRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      lastFocusedRef.current?.focus();
    };
  }, [closeLightbox, goNext, goPrevious, lightboxIndex]);

  const hasStoreCta = Boolean(playStoreUrl || appStoreUrl);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        {/* 1. Product / value hero */}
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

              <h1 className="display-page mt-8 max-w-[12ch]">{project.title}</h1>
              <p className="mt-6 max-w-[34ch] text-[1.2rem] font-medium leading-8 text-[var(--text-body)]">
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

            {/* Landscape lead still — no portrait phone columns */}
            <div className="rounded-[20px] border border-[var(--line-16)] bg-[var(--accent-soft)] p-3 sm:rounded-[28px] sm:p-5">
              {leadImage ? (
                <button
                  type="button"
                  onClick={() => openLightbox(0)}
                  aria-label={`Open ${leadImage.alt}`}
                  className="relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-[14px] border border-[var(--line-18)] bg-[var(--surface-bg)] p-0 sm:rounded-[20px]"
                >
                  <Image
                    src={leadImage.src}
                    alt={leadImage.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    priority
                  />
                </button>
              ) : demo ? (
                <div className="relative aspect-video overflow-hidden rounded-[14px] border border-[var(--line-18)] bg-[var(--surface-bg)] sm:rounded-[20px]">
                  <Image
                    src={demo.poster}
                    alt={`${project.title} product demo poster`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    priority
                  />
                </div>
              ) : (
                <div className="relative aspect-video overflow-hidden rounded-[14px] border border-[var(--line-18)] bg-[var(--surface-bg)] sm:rounded-[20px]">
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} product overview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 2. Challenge and role */}
        <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]">
          <div className="site-container grid gap-8 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
            <div>
              <p className="eyebrow">Challenge and role</p>
              <h2 className="display-section mt-5 max-w-[12ch]">The problem to solve.</h2>
              <p className="mt-6 max-w-[42ch] text-[0.95rem] font-medium leading-7 text-[var(--text-body)]">
                {project.caseStudy.role}
              </p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[20px] border border-[var(--line-16)] bg-[var(--page-bg)] p-6 sm:p-8">
                <p className="eyebrow">Challenge</p>
                <p className="mt-4 text-[1.05rem] font-medium leading-8 text-[var(--text-strong)]">
                  {project.caseStudy.challenge}
                </p>
              </div>

              <div>
                <p className="eyebrow mb-4">Responsibilities</p>
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
              </div>
            </div>
          </div>
        </section>

        {/* 3. Approach and scope */}
        <section className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-8 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
            <div>
              <p className="eyebrow">Approach</p>
              <h2 className="display-section mt-5 max-w-[11ch]">How it was shaped.</h2>
            </div>
            <p className="max-w-[62ch] self-center text-[1.05rem] font-medium leading-8 text-[var(--text-body)] lg:justify-self-end">
              {project.caseStudy.approach}
            </p>
          </div>
        </section>

        {/* 4. Demo and still proof */}
        {(demo || images.length > 0) && (
          <section
            className="border-b border-[var(--line-16)] bg-[var(--panel-bg)] py-14 sm:py-22 lg:py-28"
            aria-label="Product demo and screens"
          >
            <div className="site-container">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Visual proof</p>
                  <h2 className="display-section mt-5">Inside {project.title}.</h2>
                </div>
                <p className="max-w-[36ch] text-sm leading-6 text-[var(--text-muted)]">
                  {demo
                    ? 'Watch a short silent demo, then inspect the three current product stills.'
                    : 'Inspect the three current product stills.'}
                </p>
              </div>

              {demo && (
                <div className="mt-10 sm:mt-12">
                  <ProjectDemoPlayer demo={demo} />
                </div>
              )}

              {images.length > 0 && (
                <div className="mt-8 sm:mt-10">
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <p className="eyebrow">Product stills</p>
                    <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)]">
                      Select a screen to inspect
                    </p>
                  </div>
                  <ul className="grid list-none gap-3 p-0 sm:grid-cols-3 sm:gap-4">
                    {images.map((image, index) => (
                      <li key={`${image.src}-${index}`}>
                        <button
                          type="button"
                          onClick={() => openLightbox(index)}
                          aria-label={`Open ${image.alt}`}
                          className="relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-[16px] border border-[var(--line-18)] bg-[var(--surface-bg)] p-0 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[var(--line-24)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 360px"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 5. Capabilities */}
        <section className="border-b border-[var(--line-16)]">
          <div className="site-container py-14 sm:py-22 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="eyebrow">Capabilities</p>
                <h2 className="display-section mt-5 max-w-[12ch]">
                  {project.featureSubtitle || `What ${project.title} does`}
                </h2>
              </div>
              <p className="max-w-[62ch] text-[0.9rem] leading-7 text-[var(--text-muted)] lg:justify-self-end">
                Capabilities visible in the current product media, delivered as one coherent
                system with local persistence between sessions.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-[var(--line-16)] bg-[var(--line-16)] md:grid-cols-2 lg:grid-cols-3">
              {(
                project.featureDetails ??
                project.features.map((title) => ({ title, description: '' }))
              ).map((feature, index) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* 6. Engineering decisions and stack */}
        <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]">
          <div className="site-container py-14 sm:py-22 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className="eyebrow">Engineering</p>
                <h2 className="display-section mt-5 max-w-[11ch]">Technical decisions.</h2>
                <p className="mt-6 max-w-[42ch] text-[0.88rem] leading-7 text-[var(--text-muted)]">
                  Ownership includes architecture boundaries, delivery readiness, and the stack
                  that keeps the product maintainable after release.
                </p>
              </div>

              <div className="border-t border-[var(--line-16)]">
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

            <div className="mt-12 grid gap-7 border-t border-[var(--line-16)] pt-10 sm:mt-16 sm:pt-12 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
              <div>
                <p className="eyebrow">Stack</p>
                <h3 className="mt-3 text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
                  Technical foundation
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--line-16)] bg-[var(--page-bg)] px-4 py-2.5 font-mono text-xs text-[var(--text-body)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Outcome / release status */}
        <section className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-8 py-14 sm:gap-10 sm:py-22 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
            <div>
              <p className="eyebrow">Outcome</p>
              <h2 className="display-section mt-5 max-w-[10ch]">Where it stands.</h2>
            </div>
            <div>
              <p className="max-w-[58ch] text-[1.05rem] font-medium leading-8 text-[var(--text-body)]">
                {project.caseStudy.outcome}
              </p>
              {metrics.length > 0 && (
                <div className="mt-10 grid grid-cols-2 gap-7 sm:grid-cols-3 sm:gap-8">
                  {metrics.map((metric) => (
                    <div key={`${metric.label}-${metric.value}`}>
                      <p className="text-[2.4rem] font-semibold tracking-[-0.05em] text-[var(--accent)]">
                        {metric.value}
                      </p>
                      <p className="eyebrow mt-2">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 8. Valid next action */}
        <section className="bg-[var(--accent-soft)]">
          <div className="site-container flex flex-col gap-7 py-14 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:py-22">
            <div>
              <p className="eyebrow text-[var(--accent)]">Next step</p>
              <h2 className="display-section mt-5 max-w-[14ch]">
                {hasStoreCta
                  ? `Explore ${project.title} in the store.`
                  : `See more of the work.`}
              </h2>
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
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            ref={lightboxRef}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-5"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} media viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close media viewer"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-xl text-white"
            >
              ×
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrevious}
                  aria-label="Previous image"
                  className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-white md:left-7"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-white md:right-7"
                >
                  →
                </button>
              </>
            )}
            <div className="relative aspect-video w-[min(92vw,1100px)] max-h-[85vh]">
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                className="rounded-[1rem] object-contain sm:rounded-[1.5rem]"
                sizes="(max-width: 768px) 92vw, 1100px"
                priority
              />
            </div>
            <span className="absolute bottom-5 font-mono text-xs text-white/70">
              {lightboxIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
