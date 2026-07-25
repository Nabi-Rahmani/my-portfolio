'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import ProjectAppIcon from '@/components/ProjectAppIcon';
import { fadeUpMotion } from '@/lib/animations';
import { getProjectScreenshots, getValidProjectGithubUrl, getValidStoreUrl } from '@/lib/links';
import type { Project } from '@/types/project';

function platformLabel(platform: Project['platform']) {
  if (platform === 'android') return 'Android';
  if (platform === 'ios') return 'iOS';
  return 'Android · iOS planned';
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const reveal = fadeUpMotion(reduceMotion);
  const screenshots = getProjectScreenshots(project.screenshots);
  const playStoreUrl = getValidStoreUrl(project.links.playStore);
  const appStoreUrl = getValidStoreUrl(project.links.appStore);
  const githubUrl = getValidProjectGithubUrl(project.links.github);
  const wantsAndroid = project.platform === 'android' || project.platform === 'both';
  const wantsIos = project.platform === 'ios' || project.platform === 'both';
  const metrics = project.metrics?.filter((metric) => metric.label && metric.value) ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrevious = useCallback(() => {
    setLightboxIndex((current) => current === null ? null : (current - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((current) => current === null ? null : (current + 1) % screenshots.length);
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

  const releaseLine = [
    wantsAndroid ? (playStoreUrl ? 'Available on Google Play' : 'Android not released') : null,
    wantsIos ? (appStoreUrl ? 'Available on the App Store' : 'iOS not released') : null,
  ].filter(Boolean).join(' · ');

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      {/* Standalone product hero: one identity, one product preview. */}
      <section className="relative overflow-hidden border-b border-[var(--line)] px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-36" aria-label={`${project.title} overview`}>
        <div className="mx-auto max-w-[1200px]">
          <nav className="mb-12 flex items-center gap-2 text-[0.72rem] text-[var(--muted)]" aria-label="Breadcrumb">
            <Link href="/" className="text-inherit no-underline hover:text-[var(--ink)]">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/projects" className="text-inherit no-underline hover:text-[var(--ink)]">Projects</Link>
            <span aria-hidden>/</span>
            <span className="text-[var(--ink)]">{project.title}</span>
          </nav>

          <div className="grid gap-12 md:grid-cols-[1fr_0.8fr] md:items-center lg:gap-20">
            <motion.div initial="hidden" animate="visible" variants={reveal}>
              <ProjectAppIcon title={project.title} iconLight={project.iconLight} iconDark={project.iconDark} priority />
              <p className="editorial-kicker mb-5 mt-8">{platformLabel(project.platform)}</p>
              <h1 className="editorial-display text-[clamp(3.8rem,8vw,7.5rem)] leading-[0.86]">{project.title}</h1>
              <p className="mt-7 max-w-[600px] text-[clamp(1.25rem,2.5vw,1.8rem)] leading-[1.35] text-[var(--ink-soft)]">{project.subtitle}</p>
              <p className="mt-4 max-w-[560px] text-[0.88rem] leading-[1.7] text-[var(--muted)]">{releaseLine}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.techStack.slice(0, 5).map((tech) => <span key={tech} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[0.6875rem] text-[var(--muted)]">{tech}</span>)}
              </div>
            </motion.div>

            {project.heroImage && (
              <motion.div
                className="relative mx-auto w-full max-w-[420px]"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.65 }}
              >
                <Image src={project.heroImage} alt={`${project.title} product preview`} width={841} height={1280} className="relative h-auto w-full rounded-[2rem] border border-[var(--line)] shadow-[var(--shadow-lg)]" sizes="(max-width: 768px) 82vw, 420px" priority />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Shipping proof and truthful release actions. */}
      <section className="border-b border-[var(--line)] px-6 py-8 md:px-12" aria-label="Shipping proof">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {project.badges?.map((badge) => <span key={badge} className="rounded-full border border-[var(--atelier-accent)] bg-[var(--accent-soft)] px-3 py-1.5 text-[0.72rem] font-medium text-[var(--accent-ink)]">{badge}</span>)}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {playStoreUrl && <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-[0.82rem] font-medium text-[var(--cream)] no-underline">Google Play ↗</a>}
            {appStoreUrl && <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-[0.82rem] font-medium text-[var(--cream)] no-underline">App Store ↗</a>}
            {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--line)] px-5 py-2.5 text-[0.82rem] font-medium text-[var(--ink)] no-underline">GitHub ↗</a>}
            {wantsIos && !appStoreUrl && <span className="text-[0.75rem] text-[var(--muted)]">iOS not released</span>}
            {wantsAndroid && !playStoreUrl && <span className="text-[0.75rem] text-[var(--muted)]">Android not released</span>}
          </div>
        </div>
      </section>

      {/* Original horizontal screenshot rail. */}
      {screenshots.length > 0 && (
        <section className="overflow-hidden px-6 py-20 md:px-12 md:py-28" aria-label="Screenshots">
          <div className="mx-auto mb-10 max-w-[1200px] text-center">
            <p className="editorial-kicker mb-4">Product screens</p>
            <h2 className="editorial-display text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.95]">Inside {project.title}</h2>
            <p className="mt-4 text-[0.82rem] text-[var(--muted)]">Tap a screen to enlarge</p>
          </div>
          <div className="scrollbar-hide mx-auto flex max-w-[1200px] snap-x snap-mandatory gap-5 overflow-x-auto pb-8">
            {screenshots.map((src, index) => (
              <button key={`${src}-${index}`} type="button" onClick={() => setLightboxIndex(index)} aria-label={`Open ${project.title} screenshot ${index + 1}`} className="group relative aspect-[9/18] w-[210px] shrink-0 snap-center overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[var(--cream-2)] p-0 shadow-[var(--shadow-sm)] md:w-[240px]">
                <Image src={src} alt={`${project.title} screenshot ${index + 1}`} fill className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.02]" sizes="240px" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Existing feature-card structure. */}
      <section className="border-t border-[var(--line)] bg-[var(--cream-2)] px-6 py-20 md:px-12 md:py-28" aria-label="What was built">
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto mb-14 max-w-[720px] text-center">
            <p className="editorial-kicker mb-4">What was built</p>
            <h2 className="editorial-display text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.95]">{project.featureSubtitle || `Inside ${project.title}`}</h2>
            <p className="mt-6 text-[0.96rem] leading-[1.8] text-[var(--muted)]">{project.description}</p>
          </div>

          {project.featureDetails && project.featureDetails.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {project.featureDetails.map((feature, index) => (
                <motion.article key={feature.title} className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--cream)] p-7" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={reveal} custom={index}>
                  <span className="editorial-kicker text-[var(--accent-ink)]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-7 text-[1.05rem] font-semibold text-[var(--ink)]">{feature.title}</h3>
                  <p className="mt-3 text-[0.86rem] leading-[1.75] text-[var(--muted)]">{feature.description}</p>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2">{project.features.map((feature) => <span key={feature} className="rounded-full border border-[var(--line)] bg-[var(--cream)] px-4 py-2 text-[0.8rem] text-[var(--muted)]">{feature}</span>)}</div>
          )}
        </div>
      </section>

      <section className="border-t border-[var(--line)] px-6 py-20 md:px-12 md:py-24" aria-label="Tech stack">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="editorial-kicker mb-4">Technical implementation</p>
          <h2 className="editorial-display text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95]">Stack</h2>
          <div className="mt-9 flex flex-wrap justify-center gap-2">
            {project.techStack.map((tech) => <span key={tech} className="rounded-full border border-[var(--line)] bg-[var(--cream-2)] px-4 py-2 text-[0.8rem] font-medium text-[var(--ink)]" style={{ fontFamily: 'var(--font-mono)' }}>{tech}</span>)}
          </div>
        </div>
      </section>

      {metrics.length > 0 && (
        <section className="border-t border-[var(--line)] bg-[var(--cream-2)] px-6 py-20 md:px-12 md:py-24" aria-label="Outcomes">
          <div className="mx-auto max-w-[900px] text-center">
            <h2 className="editorial-display text-[clamp(2.6rem,5vw,4.2rem)]">Results</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-10 md:gap-16">
              {metrics.map((metric) => <div key={`${metric.label}-${metric.value}`}><p className="editorial-display text-[2.8rem] text-[var(--accent-ink)]">{metric.value}</p><p className="editorial-kicker mt-2">{metric.label}</p></div>)}
            </div>
          </div>
        </section>
      )}

      {(project.links.privacy || project.links.terms) && (
        <section className="border-t border-[var(--line)] px-6 py-10 md:px-12" aria-label="Legal">
          <div className="mx-auto flex max-w-[900px] justify-center gap-5 text-[0.78rem] text-[var(--muted)]">
            {project.links.privacy && <Link href={project.links.privacy} className="text-inherit hover:text-[var(--ink)]">Privacy Policy</Link>}
            {project.links.terms && <Link href={project.links.terms} className="text-inherit hover:text-[var(--ink)]">Terms of Use</Link>}
          </div>
        </section>
      )}

      <section className="border-t border-[var(--line)] bg-[var(--accent-soft)] px-6 py-20 text-center md:px-12 md:py-28">
        <p className="editorial-kicker mb-5">Available now</p>
        <h2 className="editorial-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9]">Try {project.title}.</h2>
        <p className="mx-auto mt-5 max-w-[560px] text-[0.9rem] leading-[1.7] text-[var(--muted)]">{releaseLine}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {playStoreUrl && <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--ink)] px-7 py-3.5 text-[0.88rem] font-medium text-[var(--cream)] no-underline">Get on Google Play ↗</a>}
          {appStoreUrl && <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--ink)] px-7 py-3.5 text-[0.88rem] font-medium text-[var(--cream)] no-underline">App Store ↗</a>}
          <Link href="/projects" className="rounded-full border border-[var(--line)] bg-[var(--cream)] px-7 py-3.5 text-[0.88rem] font-medium text-[var(--ink)] no-underline">All projects</Link>
        </div>
      </section>

      <Footer links={[
        ...(project.links.privacy ? [{ label: 'Privacy Policy', href: project.links.privacy }] : []),
        ...(project.links.terms ? [{ label: 'Terms of Use', href: project.links.terms }] : []),
        { label: 'All Projects', href: '/projects' },
      ]} />

      <AnimatePresence>
        {lightboxIndex !== null && screenshots[lightboxIndex] && (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-5" role="dialog" aria-modal="true" aria-label={`${project.title} screenshot viewer`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.2 }}>
            <button type="button" onClick={closeLightbox} aria-label="Close screenshot viewer" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-xl text-white">×</button>
            {screenshots.length > 1 && <><button type="button" onClick={goPrevious} aria-label="Previous screenshot" className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-white md:left-7">←</button><button type="button" onClick={goNext} aria-label="Next screenshot" className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-white md:right-7">→</button></>}
            <div className="relative h-[85vh] w-[min(90vw,440px)]"><Image src={screenshots[lightboxIndex]} alt={`${project.title} screenshot ${lightboxIndex + 1}`} fill className="rounded-[1.75rem] object-contain" sizes="(max-width: 768px) 90vw, 440px" priority /></div>
            <span className="absolute bottom-5 text-[0.75rem] text-white/70">{lightboxIndex + 1} / {screenshots.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
