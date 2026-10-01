'use client';

import { useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import Footer from '@/core/presentation/layout/Footer';
import { ProjectCapabilities } from '@/features/projects/presentation/detail/ProjectCapabilities';
import { ProjectCaseStudy } from '@/features/projects/presentation/detail/ProjectCaseStudy';
import { ProjectEngineering } from '@/features/projects/presentation/detail/ProjectEngineering';
import { ProjectHero } from '@/features/projects/presentation/detail/ProjectHero';
import { ProjectLightbox } from '@/features/projects/presentation/detail/ProjectLightbox';
import { ProjectOutcome } from '@/features/projects/presentation/detail/ProjectOutcome';
import { ProjectVisualProof } from '@/features/projects/presentation/detail/ProjectVisualProof';
import {
  getProjectDemo,
  getProjectImages,
  getProjectLeadImage,
  getValidProjectGithubUrl,
  getValidStoreUrl,
} from '@/features/projects/application/links';
import type { Project } from '@/features/projects/domain/project';

/**
 * PRESENTATION CONTROLLER — thin bridge for project detail.
 * Job: derive media/CTA props, hold lightbox view state, compose section widgets.
 */
export default function ProjectDetailClient({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const images = getProjectImages(project.media).slice(0, 3);
  const leadImage = getProjectLeadImage(project);
  const demo = getProjectDemo(project.media);
  const playStoreUrl = getValidStoreUrl(project.links.playStore);
  const appStoreUrl = getValidStoreUrl(project.links.appStore);
  const githubUrl = getValidProjectGithubUrl(project.links.github);
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

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <ProjectHero
          project={project}
          leadImage={leadImage}
          demo={demo}
          playStoreUrl={playStoreUrl}
          appStoreUrl={appStoreUrl}
          githubUrl={githubUrl}
          onOpenLightbox={openLightbox}
        />
        <ProjectCaseStudy caseStudy={project.caseStudy} />
        <ProjectVisualProof
          title={project.title}
          demo={demo}
          images={images}
          onOpenLightbox={openLightbox}
        />
        <ProjectCapabilities project={project} />
        <ProjectEngineering project={project} />
        <ProjectOutcome
          project={project}
          playStoreUrl={playStoreUrl}
          appStoreUrl={appStoreUrl}
        />
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

      <ProjectLightbox
        title={project.title}
        images={images}
        index={lightboxIndex}
        reduceMotion={reduceMotion}
        lightboxRef={lightboxRef}
        closeButtonRef={closeButtonRef}
        onClose={closeLightbox}
        onPrevious={goPrevious}
        onNext={goNext}
      />
    </div>
  );
}
