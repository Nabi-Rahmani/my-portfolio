import Image from 'next/image';
import Link from 'next/link';

import { getProjectLeadImage } from '@/features/projects/application/links';
import { platformLabel } from '@/features/projects/application/platform';
import type { Project } from '@/features/projects/domain/project';

/**
 * PRESENTATION — home selected-work card.
 * Job: title, value line, still, and platform cues for one project.
 */
export default function WorkCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const lead = getProjectLeadImage(project);
  const src = lead?.src ?? project.coverImage;
  const alt = lead?.alt ?? `${project.title} product overview`;
  const cues = (project.features.length > 0 ? project.features : project.techStack).slice(
    0,
    3,
  );

  return (
    <article className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className={[
          'group editorial-card flex h-full flex-col overflow-hidden no-underline transition-[border-color,transform] duration-150',
          'hover:-translate-y-0.5 hover:border-[var(--line-24)]',
          'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]',
          'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        ].join(' ')}
      >
        <div className="relative aspect-video overflow-hidden border-b border-[var(--line-16)] bg-[var(--panel-bg)]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="meta-label">
            0{index + 1} · {platformLabel(project.platform)}
          </p>
          <h3 className="mt-3 text-[1.5rem] font-semibold tracking-[-0.04em] text-[var(--text-strong)]">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--text-body)]">{project.subtitle}</p>
          <p className="mt-3 text-sm font-medium text-[var(--text-muted)]">
            {project.caseStudy.role}
          </p>
          {cues.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {cues.map((cue) => (
                <li
                  key={cue}
                  className="rounded-full border border-[var(--line-16)] px-2.5 py-1 font-mono text-xs leading-4 text-[var(--text-muted)]"
                >
                  {cue}
                </li>
              ))}
            </ul>
          )}
          <span className="mt-auto pt-6 text-sm font-semibold text-[var(--accent)]">
            Read case study →
          </span>
        </div>
      </Link>
    </article>
  );
}
