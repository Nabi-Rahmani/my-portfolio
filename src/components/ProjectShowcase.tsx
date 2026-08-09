import Image from 'next/image';
import Link from 'next/link';

import ProjectAppIcon from '@/components/ProjectAppIcon';
import { getProjectImages, getValidStoreUrl } from '@/lib/links';
import type { Project } from '@/types/project';

function platformLabel(platform: Project['platform']) {
  if (platform === 'android') return 'Android';
  if (platform === 'ios') return 'iOS';
  return 'Android · iOS planned';
}

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
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-16)] bg-[var(--surface-bg)]">
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
              className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-16)] bg-[var(--surface-bg)]"
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
    <article className="grid items-center gap-8 border-t border-[var(--line-16)] py-12 sm:gap-10 sm:py-18 lg:grid-cols-2 lg:gap-14 lg:py-24">
      <div
        className={`rounded-[var(--radius-card)] border border-[var(--line-16)] bg-[var(--panel-bg)] p-3 sm:p-5 lg:p-6 ${visualOrder}`}
      >
        <ProductScreens project={project} priority={priority} />
      </div>

      <div className={contentOrder}>
        <div className="flex items-center gap-3">
          <ProjectAppIcon
            title={project.title}
            iconLight={project.iconLight}
            iconDark={project.iconDark}
            size="sm"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-faint)]">
              0{index + 1} · {platformLabel(project.platform)}
            </p>
            <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">
              {project.caseStudy.role}
            </p>
          </div>
        </div>

        <h3 className="mt-6 text-[clamp(2rem,9vw,3.75rem)] font-semibold leading-none tracking-[-0.045em] text-[var(--text-strong)] sm:mt-7 sm:tracking-[-0.05em]">
          {project.title}
        </h3>
        <p className="mt-4 max-w-[40ch] text-[1.05rem] font-medium leading-7 text-[var(--text-body)]">
          {project.subtitle}
        </p>
        <p className="mt-5 max-w-[58ch] text-[0.9rem] leading-7 text-[var(--text-muted)]">
          {project.description}
        </p>

        <dl className="mt-7 border-y border-[var(--line-16)] sm:mt-8">
          {project.caseStudy.engineeringHighlights.slice(0, 3).map((highlight) => (
            <div
              key={highlight.title}
              className="grid gap-1.5 border-b border-[var(--line-16)] py-4 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-5"
            >
              <dt className="text-sm font-semibold text-[var(--text-strong)]">
                {highlight.title}
              </dt>
              <dd className="text-sm leading-6 text-[var(--text-muted)]">
                {highlight.description}
              </dd>
            </div>
          ))}
        </dl>

        {cues.length > 0 && (
          <ul className="mt-7 flex flex-wrap gap-2">
            {cues.map((cue) => (
              <li
                key={cue}
                className="rounded-full border border-[var(--line-16)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)]"
              >
                {cue}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={`/projects/${project.slug}`}
            className={[
              'flex h-12 w-full items-center justify-center rounded-[var(--radius-tile)] bg-[var(--text-strong)] px-5 text-sm font-semibold text-[var(--page-bg)] no-underline transition-[transform,background-color] duration-150',
              'hover:-translate-y-0.5 hover:bg-[var(--filled-button-hover)]',
              'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]',
              'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
              'sm:h-11 sm:w-auto',
            ].join(' ')}
          >
            Read case study
          </Link>
          {playStoreUrl && (
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'flex h-12 w-full items-center justify-center rounded-[var(--radius-tile)] border border-[var(--line-24)] px-5 text-sm font-semibold text-[var(--text-strong)] no-underline transition-[border-color,transform] duration-150',
                'hover:-translate-y-0.5 hover:border-[var(--accent)]',
                'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]',
                'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                'sm:h-11 sm:w-auto',
              ].join(' ')}
            >
              Google Play ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
