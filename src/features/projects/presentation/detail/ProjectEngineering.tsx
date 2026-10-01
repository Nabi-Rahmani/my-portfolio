import type { Project } from '@/features/projects/domain/project';

/**
 * PRESENTATION — engineering highlights and stack.
 * Job: render owner-supplied technical decisions, no invented metrics.
 */
export function ProjectEngineering({ project }: { project: Project }) {
  return (
    <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]">
      <div className="site-container py-14 sm:py-22 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow">Engineering</p>
            <h2 className="display-section mt-5 max-w-[11ch]">Technical decisions.</h2>
            <p className="mt-6 max-w-[42ch] text-[0.88rem] leading-7 text-[var(--text-muted)]">
              Ownership includes architecture boundaries, delivery readiness, and the stack that
              keeps the product maintainable after release.
            </p>
          </div>

          <div className="border-t border-[var(--line-16)]">
            {project.caseStudy.engineeringHighlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-[var(--line-16)] py-6 sm:grid-cols-[48px_180px_1fr] sm:gap-6"
              >
                <span className="font-mono text-xs text-[var(--accent)]">0{index + 1}</span>
                <h3 className="text-[0.9rem] font-semibold">{highlight.title}</h3>
                <p className="col-start-2 text-sm leading-6 text-[var(--text-muted)] sm:col-start-auto">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-7 border-t border-[var(--line-16)] pt-10 sm:mt-16 sm:pt-12 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
          <div>
            <p className="eyebrow">Stack</p>
            <h3 className="mt-3 text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
              Technical foundation
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--line-16)] bg-[var(--page-bg)] px-4 py-2.5 font-mono text-xs text-[var(--text-body)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
