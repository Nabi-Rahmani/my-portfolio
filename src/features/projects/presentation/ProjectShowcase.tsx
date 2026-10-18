import Image from 'next/image';
import Link from 'next/link';

import ProjectAppIcon from '@/features/projects/presentation/ProjectAppIcon';
import { getProjectImages, getValidStoreUrl } from '@/features/projects/application/links';
import { platformLabel } from '@/features/projects/application/platform';
import type { Project } from '@/features/projects/domain/project';

function ProductScreens({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  const images = getProjectImages(project.media).slice(0, 3);
  const [lead, ...supporting] = images;
  const leadSrc = lead?.src ?? project.coverImage;
  const leadAlt = lead?.alt ?? `${project.title} product overview`;

  return (
    <div className="flex flex-col gap-3 sm:gap-3.5">
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-tile)] bg-[var(--surface-bg)]">
        <Image
          src={leadSrc}
          alt={leadAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 48vw"
          priority={priority}
        />
      </div>

      {supporting.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {supporting.map((image) => (
            <div
              key={image.src}
              className="relative aspect-video overflow-hidden rounded-[var(--radius-tile)] bg-[var(--surface-bg)]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 48vw, 22vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectShowcase({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const playStoreUrl = getValidStoreUrl(project.links.playStore);
  const visualOrder = index % 2 === 0 ? 'lg:order-1' : 'lg:order-2';
  const contentOrder = index % 2 === 0 ? 'lg:order-2' : 'lg:order-1';
  const cues = (project.features.length > 0
    ? project.features
    : project.techStack
  ).slice(0, 3);

  return (
    <article className="grid items-center gap-6 border-t border-[var(--line-16)] py-10 first:border-t-0 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Open the ${project.title} project`}
        className={`editorial-card hover-card block bg-[var(--panel-bg)] p-3 no-underline motion-reduce:hover:translate-y-0 sm:p-4 ${visualOrder}`}
      >
        <ProductScreens project={project} priority={priority} />
      </Link>

      <div className={contentOrder}>
        <div className="flex items-center gap-3">
          <ProjectAppIcon
            title={project.title}
            iconLight={project.iconLight}
            iconDark={project.iconDark}
            size="sm"
          />
          <div>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-none tracking-[-0.035em] text-[var(--text-strong)]">
              {project.title}
            </h2>
            <p className="mt-1.5 text-sm text-[var(--text-faint)]">
              {platformLabel(project.platform)}
            </p>
          </div>
        </div>

        <p className="mt-5 max-w-[44ch] text-[1.125rem] font-medium leading-7 text-[var(--text-body)]">
          {project.subtitle}
        </p>
        <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-7 text-[var(--text-muted)]">
          {project.description}
        </p>

        <dl className="mt-6 border-y border-[var(--line-16)]">
          {project.caseStudy.engineeringHighlights.slice(0, 3).map((highlight) => (
            <div
              key={highlight.title}
              className="grid gap-1.5 border-b border-[var(--line-16)] py-4 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-5"
            >
              <dt className="text-[0.9375rem] font-semibold text-[var(--text-strong)]">
                {highlight.title}
              </dt>
              <dd className="text-[0.9375rem] leading-6 text-[var(--text-muted)]">
                {highlight.description}
              </dd>
            </div>
          ))}
        </dl>

        {cues.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Main features">
            {cues.map((cue) => (
              <li key={cue} className="chip">
                {cue}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link href={`/projects/${project.slug}`} className="button-primary w-full sm:w-auto">
            Read the full story
            <span aria-hidden>→</span>
          </Link>
          {playStoreUrl && (
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary w-full sm:w-auto"
            >
              Get it on Google Play
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
