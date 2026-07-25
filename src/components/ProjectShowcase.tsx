import Image from 'next/image';
import Link from 'next/link';

import ProjectAppIcon from '@/components/ProjectAppIcon';
import { getProjectScreenshots, getValidStoreUrl } from '@/lib/links';
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
  const screenshots = getProjectScreenshots(project.screenshots).slice(0, 3);

  if (screenshots.length === 0) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-[var(--line-18)] bg-[var(--surface-bg)]">
        <Image
          src={project.coverImage}
          alt={`${project.title} product overview`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 52vw"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 items-center gap-2.5 sm:gap-4">
      {screenshots.map((src, index) => (
        <div
          key={src}
          className={[
            'relative aspect-[9/19.5] overflow-hidden rounded-[14px] border border-[var(--line-18)] bg-[var(--surface-bg)] sm:rounded-[20px]',
            index === 1 ? '-translate-y-3 sm:-translate-y-5' : '',
          ].join(' ')}
        >
          <Image
            src={src}
            alt={`${project.title} product screen ${index + 1}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 30vw, 180px"
            priority={priority && index === 1}
          />
        </div>
      ))}
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

  return (
    <article className="grid items-center gap-8 border-t border-[var(--line-16)] py-12 sm:gap-10 sm:py-18 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div
        className={`rounded-[20px] border border-[var(--line-16)] bg-[var(--accent-soft)] p-3 sm:rounded-[24px] sm:p-7 lg:p-9 ${visualOrder}`}
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
            <p className="mt-1 text-sm font-medium text-[var(--accent)]">
              {project.caseStudy.role}
            </p>
          </div>
        </div>

        <h3 className="mt-6 text-[clamp(2.25rem,11vw,4.8rem)] font-semibold leading-none tracking-[-0.045em] text-[var(--text-strong)] sm:mt-7 sm:tracking-[-0.052em]">
          {project.title}
        </h3>
        <p className="mt-4 max-w-[34ch] text-[1.05rem] font-medium leading-7 text-[var(--text-body)]">
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

        <div className="mt-7 flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--line-16)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={`/projects/${project.slug}`}
            className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--text-strong)] px-5 text-sm font-semibold text-[var(--page-bg)] no-underline transition-transform duration-150 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:h-11 sm:w-auto"
          >
            Read case study
          </Link>
          {playStoreUrl && (
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center rounded-full border border-[var(--line-24)] px-5 text-sm font-semibold text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none sm:h-11 sm:w-auto"
            >
              Google Play ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
