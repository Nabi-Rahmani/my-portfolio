import Image from 'next/image';
import Link from 'next/link';

import { getProjectLeadImage } from '@/features/projects/application/links';
import type { Project } from '@/features/projects/domain/project';

/**
 * PRESENTATION — home hero project tiles.
 * Job: show the curated featured stills as a primary + supporting rack.
 */
export default function ProductRack({ projects }: { projects: Project[] }) {
  const rackProjects = projects.slice(0, 3);
  const [primary, ...supporting] = rackProjects;

  if (!primary) return null;

  const primaryLead = getProjectLeadImage(primary);
  const primarySrc = primaryLead?.src ?? primary.coverImage;
  const primaryAlt = primaryLead?.alt ?? `${primary.title} product overview`;

  return (
    <div className="grid gap-2 sm:gap-3" aria-label="Featured project previews">
      <Link
        href={`/projects/${primary.slug}`}
        className={[
          'group relative block aspect-video overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-16)] bg-[var(--surface-bg)] no-underline transition-[border-color,transform] duration-150',
          'hover:-translate-y-0.5 hover:border-[var(--line-24)]',
          'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]',
          'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        ].join(' ')}
      >
        <Image
          src={primarySrc}
          alt={primaryAlt}
          fill
          className="object-cover object-center transition-opacity duration-150 group-hover:opacity-95 motion-reduce:transition-none"
          sizes="(max-width: 1024px) 100vw, 46vw"
          priority
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--page-bg)_88%,transparent)] to-transparent px-3 pb-2.5 pt-8 sm:px-3.5 sm:pb-3">
          <span className="block text-sm font-semibold tracking-[-0.02em] text-[var(--text-strong)]">
            {primary.title}
          </span>
        </span>
      </Link>

      {supporting.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {supporting.map((project) => {
            const lead = getProjectLeadImage(project);
            const src = lead?.src ?? project.coverImage;
            const alt = lead?.alt ?? `${project.title} product overview`;

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={[
                  'group relative block aspect-video overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-16)] bg-[var(--surface-bg)] no-underline transition-[border-color,transform] duration-150',
                  'hover:-translate-y-0.5 hover:border-[var(--line-24)]',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]',
                  'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                ].join(' ')}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-center transition-opacity duration-150 group-hover:opacity-95 motion-reduce:transition-none"
                  sizes="(max-width: 1024px) 48vw, 22vw"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--page-bg)_88%,transparent)] to-transparent px-2 pb-2 pt-6 sm:px-3 sm:pb-2.5 sm:pt-8">
                  <span className="block text-xs font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-sm">
                    {project.title}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
