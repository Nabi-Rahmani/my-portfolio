import Link from 'next/link';

import Footer from '@/core/presentation/layout/Footer';
import ProjectShowcase from '@/features/projects/presentation/ProjectShowcase';
import { contactMailto, siteConfig } from '@/core/config/site';
import { getAllProjects } from '@/features/projects/data/projects';

const projects = getAllProjects();

export default function Projects() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <header className="border-b border-[var(--line-16)]">
          <div className="site-container py-12 sm:py-16 lg:py-20">
            <p className="eyebrow">Projects · 2023 to today</p>
            <h1 className="display-page mt-3 max-w-[18ch]">Apps I&apos;ve built and taken to market</h1>
            <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-8 text-[var(--text-muted)]">
              {projects.length} real Flutter apps, live on Google Play. For each one I did the
              design, the code, the store release, and the updates since—on my own.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="At a glance">
              <li className="chip">Solo-built</li>
              <li className="chip">{siteConfig.experienceLabel} with Flutter</li>
              <li className="chip">Actively maintained</li>
            </ul>
          </div>
        </header>

        <section className="site-container" aria-label="All projects">
          {projects.map((project, index) => (
            <ProjectShowcase
              key={project.slug}
              project={project}
              index={index}
              priority={index === 0}
            />
          ))}
        </section>

        <section className="border-t border-[var(--line-16)] bg-[var(--surface-bg)]">
          <div className="site-container flex flex-col gap-7 py-12 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-16">
            <div>
              <p className="eyebrow">Your app next?</p>
              <h2 className="display-section mt-2 max-w-[22ch]">
                Need a Flutter developer who stays after launch?
              </h2>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <a
                href={contactMailto({ subject: 'Flutter role inquiry' })}
                className="button-primary w-full sm:w-auto"
              >
                Contact me
              </a>
              <Link href="/about" className="button-secondary w-full sm:w-auto">
                More about me
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
