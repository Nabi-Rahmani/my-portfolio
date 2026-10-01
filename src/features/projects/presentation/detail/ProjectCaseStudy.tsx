import type { ProjectCaseStudy as ProjectCaseStudyModel } from '@/features/projects/domain/project';

/**
 * PRESENTATION — challenge, role, and approach.
 * Job: render case-study narrative fields from the project entity.
 */
export function ProjectCaseStudy({ caseStudy }: { caseStudy: ProjectCaseStudyModel }) {
  return (
    <>
      <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]">
        <div className="site-container grid gap-8 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
          <div>
            <p className="eyebrow">Challenge and role</p>
            <h2 className="display-section mt-5 max-w-[12ch]">The problem to solve.</h2>
            <p className="mt-6 max-w-[42ch] text-[0.95rem] font-medium leading-7 text-[var(--text-body)]">
              {caseStudy.role}
            </p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[20px] border border-[var(--line-16)] bg-[var(--page-bg)] p-6 sm:p-8">
              <p className="eyebrow">Challenge</p>
              <p className="mt-4 text-[1.05rem] font-medium leading-8 text-[var(--text-strong)]">
                {caseStudy.challenge}
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4">Responsibilities</p>
              <div className="grid gap-px overflow-hidden rounded-[20px] border border-[var(--line-16)] bg-[var(--line-16)] sm:grid-cols-2">
                {caseStudy.responsibilities.map((responsibility, index) => (
                  <div
                    key={responsibility}
                    className="flex min-h-24 items-end justify-between bg-[var(--page-bg)] p-5"
                  >
                    <span className="text-[0.88rem] font-semibold">{responsibility}</span>
                    <span className="font-mono text-xs text-[var(--text-faint)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line-16)]">
        <div className="site-container grid gap-8 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
          <div>
            <p className="eyebrow">Approach</p>
            <h2 className="display-section mt-5 max-w-[11ch]">How it was shaped.</h2>
          </div>
          <p className="max-w-[62ch] self-center text-[1.05rem] font-medium leading-8 text-[var(--text-body)] lg:justify-self-end">
            {caseStudy.approach}
          </p>
        </div>
      </section>
    </>
  );
}
