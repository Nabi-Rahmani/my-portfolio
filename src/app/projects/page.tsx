import Link from 'next/link';

import Footer from '@/components/Footer';
import ProjectShowcase from '@/components/ProjectShowcase';
import { contactMailto, siteConfig } from '@/config/site';
import { getAllProjects } from '@/data/projects';

const projects = getAllProjects();

export default function Projects() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <header className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-10 py-16 sm:py-22 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-28">
            <div>
              <p className="eyebrow">Selected work · 2023—Today</p>
              <h1 className="display-page mt-6 max-w-[10ch]">Products I&apos;ve taken to market.</h1>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-[58ch] text-[1rem] leading-8 text-[var(--text-muted)]">
                Three independent Flutter products, each designed, engineered, released, and
                maintained as a complete system—not a portfolio concept.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--line-16)] pt-6">
                <div>
                  <dt className="eyebrow">Role</dt>
                  <dd className="mt-2 text-[0.86rem] font-semibold">Independent product engineer</dd>
                </div>
                <div>
                  <dt className="eyebrow">Experience</dt>
                  <dd className="mt-2 text-[0.86rem] font-semibold">{siteConfig.experienceLabel}</dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <section className="site-container">
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
          <div className="site-container flex flex-col gap-8 py-14 sm:flex-row sm:items-center sm:justify-between sm:py-18">
            <div>
              <p className="eyebrow">Next product</p>
              <h2 className="mt-4 max-w-[18ch] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1] tracking-[-0.05em]">
                Need a Flutter engineer who stays for the release?
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={contactMailto({ subject: 'Flutter role inquiry' })}
                className="rounded-full bg-[var(--accent)] px-6 py-3.5 text-[0.84rem] font-semibold text-white no-underline"
              >
                Start a conversation
              </a>
              <Link
                href="/about"
                className="rounded-full border border-[var(--line-24)] px-6 py-3.5 text-[0.84rem] font-semibold text-[var(--text-strong)] no-underline"
              >
                About my approach
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
