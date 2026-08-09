import Link from 'next/link';

import Footer from '@/components/Footer';
import ProjectAppIcon from '@/components/ProjectAppIcon';
import { siteConfig } from '@/config/site';
import type { LegalPage, Project } from '@/types/project';

interface LegalDocumentProps {
  project: Project;
  kind: 'privacy' | 'terms';
}

export default function LegalDocument({ project, kind }: LegalDocumentProps) {
  const content: LegalPage | undefined =
    kind === 'privacy' ? project.privacyContent : project.termsContent;
  const title = kind === 'privacy' ? 'Privacy Policy' : 'Terms of Use';

  if (!content) return null;

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <header className="border-b border-[var(--line-16)]">
          <div className="site-container max-w-[900px] py-10 sm:py-14">
            <nav className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)]" aria-label="Breadcrumb">
              <Link href={`/projects/${project.slug}`} className="text-inherit no-underline hover:text-[var(--accent)]">{project.title}</Link>
              <span className="mx-2" aria-hidden>/</span>
              <span className="text-[var(--text-strong)]">{title}</span>
            </nav>
            <div className="mt-10 flex items-center gap-4">
              <ProjectAppIcon title={project.title} iconLight={project.iconLight} iconDark={project.iconDark} size="sm" />
              <div>
                <p className="eyebrow">{project.title}</p>
                <h1 className="mt-2 text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-none tracking-[-0.05em]">{title}</h1>
              </div>
            </div>
            <p className="mt-7 font-mono text-xs uppercase tracking-[0.07em] text-[var(--text-faint)]">Last updated · {content.lastUpdated}</p>
          </div>
        </header>

        <article className="site-container max-w-[900px] py-12 sm:py-18 lg:py-22">
          <p className="max-w-[70ch] text-[1.05rem] leading-8 text-[var(--text-body)]">{content.intro}</p>
          <div className="mt-12 border-t border-[var(--line-16)]">
            {content.sections.map((section) => (
              <section key={section.title} className="grid gap-4 border-b border-[var(--line-16)] py-8 sm:grid-cols-[220px_1fr] sm:gap-10">
                <h2 className="text-[1rem] font-semibold leading-6 tracking-[-0.02em]">{section.title}</h2>
                <div className="text-[0.95rem] leading-7 text-[var(--text-muted)]">
                  <p>{section.content}</p>
                  {section.list && section.list.length > 0 && (
                    <ul className="mt-4 list-disc space-y-2 pl-5">
                      {section.list.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
          {kind === 'terms' && project.links.privacy && (
            <p className="editorial-card mt-10 p-5 text-sm leading-6 text-[var(--text-muted)]">
              Please also review the <Link href={project.links.privacy} className="font-semibold text-[var(--accent)]">Privacy Policy</Link> for this product.
            </p>
          )}
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)]">© {new Date().getFullYear()} {siteConfig.name}</p>
        </article>
      </main>
      <Footer links={[{ label: 'All Work', href: '/projects' }, { label: project.title, href: `/projects/${project.slug}` }]} />
    </div>
  );
}
