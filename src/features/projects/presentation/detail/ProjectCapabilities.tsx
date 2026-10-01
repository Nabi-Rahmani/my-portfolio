import type { Project } from '@/features/projects/domain/project';

/**
 * PRESENTATION — shipped capabilities grid.
 * Job: feature details when present, otherwise feature titles.
 */
export function ProjectCapabilities({ project }: { project: Project }) {
  const features =
    project.featureDetails ?? project.features.map((title) => ({ title, description: '' }));

  return (
    <section className="border-b border-[var(--line-16)]">
      <div className="site-container py-14 sm:py-22 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 className="display-section mt-5 max-w-[12ch]">
              {project.featureSubtitle || `What ${project.title} does`}
            </h2>
          </div>
          <p className="max-w-[62ch] text-[0.9rem] leading-7 text-[var(--text-muted)] lg:justify-self-end">
            Capabilities visible in the current product media, delivered as one coherent system
            with local persistence between sessions.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-[var(--line-16)] bg-[var(--line-16)] md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="min-h-[180px] bg-[var(--surface-bg)] p-5 sm:min-h-[220px] sm:p-7"
            >
              <span className="font-mono text-xs text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-8 text-[1.05rem] font-semibold tracking-[-0.025em] sm:mt-12">
                {feature.title}
              </h3>
              {feature.description && (
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  {feature.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
