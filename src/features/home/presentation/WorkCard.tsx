import Image from 'next/image';
import Link from 'next/link';

import { getProjectLeadImage } from '@/features/projects/application/links';
import { platformLabel } from '@/features/projects/application/platform';
import type { Project } from '@/features/projects/domain/project';

/**
 * PRESENTATION — home selected-work card.
 * Job: title, value line, still, and platform cues for one project.
 */
export default function WorkCard({ project }: { project: Project }) {
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
        className="group editorial-card hover-card flex h-full flex-col overflow-hidden no-underline motion-reduce:hover:translate-y-0"
      >
        <div className="relative aspect-video overflow-hidden border-b border-[var(--line-16)] bg-[var(--panel-bg)]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="meta-label">{platformLabel(project.platform)}</p>
          <h3 className="mt-1.5 text-[1.375rem] font-semibold tracking-[-0.025em] text-[var(--text-strong)]">
            {project.title}
          </h3>
          <p className="mt-2 text-[0.9375rem] leading-6 text-[var(--text-muted)]">{project.subtitle}</p>
          {cues.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Main features">
              {cues.map((cue) => (
                <li key={cue} className="chip">
                  {cue}
                </li>
              ))}
            </ul>
          )}
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.9375rem] font-semibold text-[var(--accent)]">
            View project
            <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
