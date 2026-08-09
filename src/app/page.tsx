import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { socialLinks } from '@/config/navigation';
import { contactMailto, siteConfig } from '@/config/site';
import { blogPosts, getFeaturedPosts } from '@/data/blog';
import { getFeaturedProjects } from '@/data/projects';
import { getAppCount, getArticleCount } from '@/config/proof';
import { getProjectLeadImage } from '@/lib/links';
import type { Project } from '@/types/project';

const projects = getFeaturedProjects();
const featuredPosts = getFeaturedPosts();
const articles = (featuredPosts.length > 0 ? featuredPosts : blogPosts).slice(0, 3);
const linkedInUrl =
  socialLinks.find((link) => link.label === 'LinkedIn')?.href ?? '#';

const proofItems = [
  { value: String(getAppCount()), label: 'Shipped products' },
  { value: String(getArticleCount()), label: 'Technical articles' },
  { value: siteConfig.experienceLabel, label: 'Flutter experience' },
];

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00Z`));
}

function platformLabel(platform: Project['platform']) {
  if (platform === 'android') return 'Android';
  if (platform === 'ios') return 'iOS';
  return 'Android · iOS planned';
}

function ProductRack() {
  const rackProjects = projects.slice(0, 3);
  const [primary, ...supporting] = rackProjects;

  if (!primary) return null;

  const primaryLead = getProjectLeadImage(primary);
  const primarySrc = primaryLead?.src ?? primary.coverImage;
  const primaryAlt = primaryLead?.alt ?? `${primary.title} product overview`;

  return (
    <div
      className="grid gap-2.5 sm:gap-3"
      aria-label="Featured project previews"
    >
      <Link
        href={`/projects/${primary.slug}`}
        className={[
          'group relative block aspect-video overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-16)] bg-[var(--surface-bg)] no-underline transition-[border-color,transform] duration-150',
          'hover:-translate-y-0.5 hover:border-[var(--line-24)]',
          'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]',
          'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        ].join(' ')}
      >
        <Image
          src={primarySrc}
          alt={primaryAlt}
          fill
          className="object-cover object-center transition-opacity duration-150 group-hover:opacity-95 motion-reduce:transition-none"
          sizes="(max-width: 1024px) 100vw, 46vw"
          priority
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--page-bg)_88%,transparent)] to-transparent px-3 pb-2.5 pt-8 sm:px-3.5 sm:pb-3">
          <span className="block text-sm font-semibold tracking-[-0.02em] text-[var(--text-strong)]">
            {primary.title}
          </span>
        </span>
      </Link>

      {supporting.length > 0 && (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
          {supporting.map((project) => {
            const lead = getProjectLeadImage(project);
            const src = lead?.src ?? project.coverImage;
            const alt = lead?.alt ?? `${project.title} product overview`;

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={[
                  'group relative block aspect-video overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-16)] bg-[var(--surface-bg)] no-underline transition-[border-color,transform] duration-150',
                  'hover:-translate-y-0.5 hover:border-[var(--line-24)]',
                  'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]',
                  'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                ].join(' ')}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-center transition-opacity duration-150 group-hover:opacity-95 motion-reduce:transition-none"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--page-bg)_88%,transparent)] to-transparent px-3 pb-2.5 pt-8 sm:px-3 sm:pb-2.5">
                  <span className="block text-sm font-semibold tracking-[-0.02em] text-[var(--text-strong)]">
                    {project.title}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const lead = getProjectLeadImage(project);
  const src = lead?.src ?? project.coverImage;
  const alt = lead?.alt ?? `${project.title} product overview`;
  const cues = (project.features.length > 0
    ? project.features
    : project.techStack
  ).slice(0, 3);

  return (
    <article className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className={[
          'group editorial-card flex h-full flex-col overflow-hidden no-underline transition-[border-color,transform] duration-150',
          'hover:-translate-y-0.5 hover:border-[var(--line-24)]',
          'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]',
          'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        ].join(' ')}
      >
        <div className="relative aspect-video overflow-hidden border-b border-[var(--line-16)] bg-[var(--panel-bg)]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="meta-label">
            0{index + 1} · {platformLabel(project.platform)}
          </p>
          <h3 className="mt-3 text-[1.5rem] font-semibold tracking-[-0.04em] text-[var(--text-strong)]">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--text-body)]">
            {project.subtitle}
          </p>
          <p className="mt-3 text-sm font-medium text-[var(--text-muted)]">
            {project.caseStudy.role}
          </p>
          {cues.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {cues.map((cue) => (
                <li
                  key={cue}
                  className="rounded-full border border-[var(--line-16)] px-2.5 py-1 font-mono text-xs leading-4 text-[var(--text-muted)]"
                >
                  {cue}
                </li>
              ))}
            </ul>
          )}
          <span className="mt-auto pt-6 text-sm font-semibold text-[var(--accent)]">
            Read case study →
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <section id="home" className="scroll-mt-[72px] border-b border-[var(--line-16)]">
          <div className="site-container grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:py-20">
            <ScrollReveal>
              <div className="flex items-start gap-2 font-mono text-xs uppercase leading-5 tracking-[0.11em] text-[var(--text-faint)] sm:items-center sm:tracking-[0.13em]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--status-ok)] sm:mt-0" aria-hidden />
                {siteConfig.role} · Ankara / Remote
              </div>
              <h1 className="display-hero mt-5 max-w-[10ch]">
                Flutter products, built to last.
              </h1>
              <p className="mt-5 max-w-[560px] text-base leading-7 text-[var(--text-muted)] sm:text-[1.08rem] sm:leading-8">
                I&apos;m Nabi Rahmani. I design, build, and ship reliable Flutter apps—from
                product architecture to store release.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/projects" className="button-primary group w-full sm:w-auto">
                  <span>Explore projects</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden>→</span>
                </Link>
                <Link href="/blog" className="button-secondary group w-full sm:w-auto">
                  <span>Read articles</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden>→</span>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={40}>
              <ProductRack />
            </ScrollReveal>
          </div>
        </section>

        <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]" aria-label="Professional proof">
          <div className="site-container grid grid-cols-3">
            {proofItems.map((item, index) => (
              <div
                key={item.label}
                className={[
                  'border-r border-[var(--line-16)] px-3 py-4 text-center sm:px-6 sm:py-6',
                  index === 0 ? 'pl-0' : '',
                  index === proofItems.length - 1 ? 'border-r-0 pr-0 lg:pr-0' : '',
                ].join(' ')}
              >
                <p className="text-[1.45rem] font-semibold tracking-[-0.04em]">{item.value}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-muted)] sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="site-container py-14 sm:py-20 lg:py-24">
          <ScrollReveal>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="display-section mt-4 max-w-[10ch]">Work that shipped.</h2>
              </div>
              <p className="max-w-[540px] text-[0.95rem] leading-7 text-[var(--text-muted)] lg:justify-self-end">
                Selected Flutter products designed, engineered, released, and maintained as complete systems.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 40} className="h-full">
                <WorkCard project={project} index={index} />
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Link href="/projects" className="text-sm font-semibold text-[var(--accent)] no-underline">
              Explore every case study →
            </Link>
          </div>
        </section>

        <section className="border-y border-[var(--line-16)] bg-[var(--surface-bg)]">
          <div className="site-container grid gap-8 py-14 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:py-24">
            <ScrollReveal>
              <p className="eyebrow">Writing</p>
              <h2 className="display-section mt-4 max-w-[8ch]">Notes from the work.</h2>
              <p className="mt-5 max-w-[38ch] text-sm leading-7 text-[var(--text-muted)]">
                Practical lessons from building and maintaining Flutter products.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={40}>
              <div className="border-t border-[var(--line-16)]">
                {articles.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group grid gap-3 border-b border-[var(--line-16)] py-5 text-[var(--text-strong)] no-underline sm:grid-cols-[150px_1fr_auto] sm:items-center sm:gap-6"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.05em] text-[var(--text-faint)]">
                      {formatPostDate(post.publishedAt)}
                    </p>
                    <div>
                      <h3 className="text-[1rem] font-semibold tracking-[-0.02em] transition-opacity group-hover:opacity-60">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-xs text-[var(--text-faint)]">{post.readingTime} min read</p>
                    </div>
                    <span className="hidden text-sm sm:block">→</span>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <Link href="/blog" className="text-sm font-semibold text-[var(--accent)] no-underline">
                  All {getArticleCount()} articles →
                </Link>
                <Link href="/feed.xml" className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)] no-underline">
                  RSS ↗
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-[var(--accent-soft)]">
          <div className="site-container flex flex-col gap-7 py-14 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:py-20">
            <ScrollReveal>
              <p className="eyebrow">Available for remote roles</p>
              <h2 className="display-section mt-4 max-w-[12ch]">Let&apos;s build something dependable.</h2>
              <p className="mt-5 max-w-[54ch] text-sm leading-7 text-[var(--text-muted)]">
                Looking for a Flutter engineer who cares about the product before and after launch?
              </p>
            </ScrollReveal>
            <ScrollReveal delay={40}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={contactMailto({ subject: 'Flutter role inquiry' })} className="button-primary w-full sm:w-auto">Email Nabi</a>
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="button-secondary w-full sm:w-auto">LinkedIn ↗</a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
