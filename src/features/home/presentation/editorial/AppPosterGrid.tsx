import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/features/projects/domain/project';

/**
 * PRESENTATION — shipped-app posters.
 * Job: show each product still, the store link, and the case study.
 */
export default function AppPosterGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-px border border-[var(--line-16)] bg-[var(--line-16)] sm:grid-cols-3">
      {projects.map((project, index) => {
        const still = project.media.find((item) => item.type === 'image');
        const src = still && still.type === 'image' ? still.src : project.coverImage;
        const alt = still && still.type === 'image' ? still.alt : project.title;

        return (
          <article
            key={project.slug}
            className="bg-[var(--page-bg)] p-4 transition-colors hover:bg-[var(--surface-bg)]"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="relative block aspect-video overflow-hidden bg-[var(--surface-bg)]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 45vw, 240px"
                className="object-cover"
              />
            </Link>
            <h3 className="mt-3 text-sm font-medium tracking-tight text-[var(--text-strong)]">
              <Link href={`/projects/${project.slug}`} className="no-underline hover:text-[var(--accent)]">
                {project.title}
              </Link>
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--text-muted)]">
              {project.subtitle}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[var(--text-muted)]">
              {project.links.playStore ? (
                <a
                  href={project.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline transition-colors hover:text-[var(--accent)]"
                >
                  Play ↗
                </a>
              ) : null}
              <Link
                href={`/projects/${project.slug}`}
                className="no-underline transition-colors hover:text-[var(--accent)]"
              >
                Study →
              </Link>
            </p>
          </article>
        );
      })}
    </div>
  );
}
