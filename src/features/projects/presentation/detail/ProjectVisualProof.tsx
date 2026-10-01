'use client';

import Image from 'next/image';

import ProjectDemoPlayer from '@/features/projects/presentation/ProjectDemoPlayer';
import type { ProjectImageMedia, ProjectVideoMedia } from '@/features/projects/domain/project';

/**
 * PRESENTATION — demo + stills.
 * Job: show current product media and open a still in the lightbox.
 */
export function ProjectVisualProof({
  title,
  demo,
  images,
  onOpenLightbox,
}: {
  title: string;
  demo?: ProjectVideoMedia;
  images: ProjectImageMedia[];
  onOpenLightbox: (index: number) => void;
}) {
  if (!demo && images.length === 0) return null;

  return (
    <section
      className="border-b border-[var(--line-16)] bg-[var(--panel-bg)] py-14 sm:py-22 lg:py-28"
      aria-label="Product demo and screens"
    >
      <div className="site-container">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Visual proof</p>
            <h2 className="display-section mt-5">Inside {title}.</h2>
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
                    onClick={() => onOpenLightbox(index)}
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
  );
}
