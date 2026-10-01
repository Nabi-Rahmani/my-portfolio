import Link from 'next/link';

import { ProjectStoreCtas } from '@/features/projects/presentation/detail/ProjectStoreCtas';
import type { Project } from '@/features/projects/domain/project';

/**
 * PRESENTATION — outcome and next step.
 * Job: honest shipped narrative plus valid store CTAs when they exist.
 */
export function ProjectOutcome({
  project,
  playStoreUrl,
  appStoreUrl,
}: {
  project: Project;
  playStoreUrl?: string;
  appStoreUrl?: string;
}) {
  const metrics = project.metrics?.filter((metric) => metric.label && metric.value) ?? [];
  const hasStoreCta = Boolean(playStoreUrl || appStoreUrl);

  return (
    <>
      <section className="border-b border-[var(--line-16)]">
        <div className="site-container grid gap-8 py-14 sm:gap-10 sm:py-22 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
          <div>
            <p className="eyebrow">Outcome</p>
            <h2 className="display-section mt-5 max-w-[10ch]">Where it stands.</h2>
          </div>
          <div>
            <p className="max-w-[58ch] text-[1.05rem] font-medium leading-8 text-[var(--text-body)]">
              {project.caseStudy.outcome}
            </p>
            {metrics.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-7 sm:grid-cols-3 sm:gap-8">
                {metrics.map((metric) => (
                  <div key={`${metric.label}-${metric.value}`}>
                    <p className="text-[2.4rem] font-semibold tracking-[-0.05em] text-[var(--accent)]">
                      {metric.value}
                    </p>
                    <p className="eyebrow mt-2">{metric.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[var(--accent-soft)]">
        <div className="site-container flex flex-col gap-7 py-14 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:py-22">
          <div>
            <p className="eyebrow text-[var(--accent)]">Next step</p>
            <h2 className="display-section mt-5 max-w-[14ch]">
              {hasStoreCta ? `Explore ${project.title} in the store.` : `See more of the work.`}
            </h2>
          </div>
          <ProjectStoreCtas
            playStoreUrl={playStoreUrl}
            appStoreUrl={appStoreUrl}
            extra={
              <Link
                href="/projects"
                className="flex h-12 w-full items-center justify-center rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] px-6 text-sm font-semibold text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none sm:w-auto"
              >
                All work
              </Link>
            }
          />
        </div>
      </section>
    </>
  );
}
