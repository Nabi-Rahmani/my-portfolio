import Link from 'next/link';

import CopyEmail from '@/features/home/presentation/editorial/CopyEmail';
import AppPosterGrid from '@/features/home/presentation/editorial/AppPosterGrid';
import { socialLinks } from '@/core/config/navigation';
import { siteConfig } from '@/core/config/site';
import type { BlogPostSummary } from '@/features/blog/domain/blog';
import type { Project } from '@/features/projects/domain/project';

interface HomePageProps {
  projects: Project[];
  notes: BlogPostSummary[];
  articleCount: number;
}

const proof = [
  {
    label: 'I design the product, ship it, and stay for the updates',
    hint: 'apps ↓',
    href: '#apps',
  },
  {
    label: 'Prayer, focus, and daily plans stay useful offline',
    hint: 'about →',
    href: '/about',
  },
  {
    label: 'Every listed app has a case study, not just a store link',
    hint: 'projects →',
    href: '/projects',
  },
  {
    label: 'I write the Flutter notes I needed while shipping',
    hint: 'notes ↓',
    href: '#notes',
  },
  {
    label: 'Open to remote Flutter roles',
    hint: 'contact ↓',
    href: '#contact',
  },
] as const;

const also = [
  {
    title: 'About',
    description: 'How I work, the stack, and a Windows test build.',
    href: '/about',
    hint: 'about →',
  },
  {
    title: 'Now',
    description: 'What I am focused on at the moment.',
    href: '/now',
    hint: 'now →',
  },
  {
    title: 'Uses',
    description: 'Tools I actually keep open.',
    href: '/uses',
    hint: 'uses →',
  },
] as const;

/**
 * PRESENTATION — home editorial page.
 * Job: proof, shipped apps, writing, and contact in one reading column.
 */
export default function HomePage({ projects, notes, articleCount }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="relative max-w-3xl pb-16 pt-10 sm:pt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-px bg-[var(--line-16)]"
        />
        <header className="pb-12">
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            I design, ship, and maintain Flutter apps.
          </h1>
        </header>

        <main className="space-y-[72px]">
          <section aria-labelledby="why-me">
            <SectionLabel id="why-me" title="Why me" />
            <ul className="mt-6 divide-y divide-[var(--line-16)] border border-[var(--line-16)]">
              {proof.map((item) => (
                <li key={item.label}>
                  <RowLink href={item.href} label={item.label} hint={item.hint} />
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-2 bg-[var(--accent)] px-4 py-2 font-mono text-xs text-[var(--on-accent)] no-underline transition-opacity hover:opacity-90"
            >
              <span>work with me</span>
              <span aria-hidden>↓</span>
            </a>
          </section>

          <section aria-labelledby="apps">
            <SectionLabel
              id="apps"
              title="Mobile apps"
              meta={`${projects.length} shipped`}
            />
            <AppPosterGrid projects={projects} />
            <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
              <Link href="/projects" className="no-underline transition-colors hover:text-[var(--accent)]">
                Read the case studies →
              </Link>
            </p>
          </section>

          <section aria-labelledby="notes">
            <SectionLabel id="notes" title="Notes" meta={`${articleCount} articles`} />
            <ul className="mt-6 divide-y divide-[var(--line-16)] border border-[var(--line-16)]">
              {notes.map((note) => (
                <li key={note.slug}>
                  <Link
                    href={`/blog/${note.slug}`}
                    className="group flex flex-col gap-1.5 px-4 py-3.5 no-underline transition-colors hover:bg-[var(--surface-bg)]"
                  >
                    <span className="text-sm font-medium text-[var(--text-strong)]">{note.title}</span>
                    <span className="line-clamp-2 text-sm leading-6 text-[var(--text-muted)]">
                      {note.excerpt}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]">
                      {note.readingTime} min →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
              <Link href="/blog" className="no-underline transition-colors hover:text-[var(--accent)]">
                All notes →
              </Link>
            </p>
          </section>

          <section aria-labelledby="also">
            <SectionLabel id="also" title="Also" />
            <ul className="mt-6 divide-y divide-[var(--line-16)] border border-[var(--line-16)]">
              {also.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex flex-col gap-1.5 px-4 py-3.5 no-underline transition-colors hover:bg-[var(--surface-bg)] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span>
                      <span className="block text-sm font-medium text-[var(--text-strong)]">{item.title}</span>
                      <span className="mt-1 block text-sm text-[var(--text-muted)]">{item.description}</span>
                    </span>
                    <span className="shrink-0 font-mono text-xs text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]">
                      {item.hint}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="contact">
            <SectionLabel id="contact" title="Contact" />
            <h2 className="mt-6 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Let&apos;s work together.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--text-muted)] sm:text-base sm:leading-7">
              Open to full-time and contract Flutter work. I answer serious email within a
              working day. Based in {siteConfig.location}.
            </p>
            <CopyEmail email={siteConfig.contactEmail} />
            <ul className="mt-8 divide-y divide-[var(--line-16)] border border-[var(--line-16)]">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 px-4 py-3.5 no-underline transition-colors hover:bg-[var(--surface-bg)]"
                  >
                    <span className="text-sm font-medium text-[var(--text-strong)]">{link.label}</span>
                    <span className="font-mono text-xs text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/feed.xml"
                  className="group flex items-center justify-between gap-4 px-4 py-3.5 no-underline transition-colors hover:bg-[var(--surface-bg)]"
                >
                  <span className="text-sm font-medium text-[var(--text-strong)]">RSS</span>
                  <span className="font-mono text-xs text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]">
                    ↗
                  </span>
                </Link>
              </li>
            </ul>
          </section>
        </main>
        <p className="mt-16 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
          © {new Date().getFullYear()} {siteConfig.shortName}
        </p>
      </div>
      </div>
    </div>
  );
}

function SectionLabel({
  id,
  title,
  meta,
}: {
  id: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="relative flex items-baseline justify-between gap-4 pl-4">
      <span
        aria-hidden
        className="absolute top-1/2 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)]"
      />
      <h2
        id={id}
        className="scroll-mt-28 font-mono text-xs font-normal uppercase tracking-widest text-[var(--text-muted)]"
      >
        {title}
      </h2>
      {meta ? (
        <span className="font-mono text-xs text-[var(--text-muted)]">{meta}</span>
      ) : null}
    </div>
  );
}

function RowLink({ href, label, hint }: { href: string; label: string; hint: string }) {
  const className =
    'group flex w-full flex-col items-start gap-1.5 px-4 py-3.5 no-underline transition-colors hover:bg-[var(--surface-bg)] sm:flex-row sm:items-center sm:justify-between sm:gap-4';
  const body = (
    <>
      <span className="text-sm font-medium text-[var(--text-strong)]">{label}</span>
      <span className="shrink-0 font-mono text-xs text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]">
        {hint}
      </span>
    </>
  );

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {body}
    </Link>
  );
}
