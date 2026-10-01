'use client';

import Image from 'next/image';
import Link from 'next/link';

import ProjectAppIcon from '@/features/projects/presentation/ProjectAppIcon';
import { ProjectStoreCtas } from '@/features/projects/presentation/detail/ProjectStoreCtas';
import { platformLabel } from '@/features/projects/application/platform';
import type { Project, ProjectImageMedia, ProjectVideoMedia } from '@/features/projects/domain/project';

/**
 * PRESENTATION — project value hero.
 * Job: identity, outcome line, valid CTAs, and lead still.
 */
export function ProjectHero({
  project,
  leadImage,
  demo,
  playStoreUrl,
  appStoreUrl,
  githubUrl,
  onOpenLightbox,
}: {
  project: Project;
  leadImage?: ProjectImageMedia;
  demo?: ProjectVideoMedia;
  playStoreUrl?: string;
  appStoreUrl?: string;
  githubUrl?: string;
  onOpenLightbox: (index: number) => void;
}) {
  return (
    <>
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

            <div className="mt-8">
              <ProjectStoreCtas
                playStoreUrl={playStoreUrl}
                appStoreUrl={appStoreUrl}
                githubUrl={githubUrl}
              />
            </div>
          </div>

          <div className="rounded-[20px] border border-[var(--line-16)] bg-[var(--accent-soft)] p-3 sm:rounded-[28px] sm:p-5">
            {leadImage ? (
              <button
                type="button"
                onClick={() => onOpenLightbox(0)}
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
    </>
  );
}
