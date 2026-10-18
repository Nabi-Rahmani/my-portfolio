import Image from 'next/image';
import Link from 'next/link';

import ProductRack from '@/features/home/presentation/ProductRack';
import ProofStrip from '@/features/home/presentation/ProofStrip';
import WorkCard from '@/features/home/presentation/WorkCard';
import Footer from '@/core/presentation/layout/Footer';
import ScrollReveal from '@/core/presentation/layout/ScrollReveal';
import { socialLinks } from '@/core/config/navigation';
import { getArticleCount } from '@/core/config/proof';
import { contactMailto, siteConfig } from '@/core/config/site';
import { blogPosts, getFeaturedPosts } from '@/features/blog/data/blog';
import { getFeaturedProjects } from '@/features/projects/data/projects';
import { formatDateUtc } from '@/core/lib/utils';

const projects = getFeaturedProjects();
const featuredPosts = getFeaturedPosts();
const articles = (featuredPosts.length > 0 ? featuredPosts : blogPosts).slice(0, 3);
const linkedInUrl =
  socialLinks.find((link) => link.label === 'LinkedIn')?.href ?? '#';

/**
 * PRESENTATION — home composition.
 * Job: who I am, what I've built, what I write, and how to reach me.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <section id="home" className="scroll-mt-[72px]">
          <div className="site-container grid grid-cols-1 gap-10 py-10 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-20">
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <Image
                  src={siteConfig.avatarPath}
                  alt={`Photo of ${siteConfig.shortName}`}
                  width={52}
                  height={52}
                  className="h-[52px] w-[52px] rounded-full border-2 border-[var(--surface-bg)] object-cover shadow-[0_0_0_1px_var(--line-18)]"
                  priority
                />
                <div>
                  <p className="text-[0.95rem] font-semibold text-[var(--text-strong)]">
                    {siteConfig.shortName}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Flutter developer · {siteConfig.location}
                  </p>
                </div>
              </div>

              <h1 className="display-hero mt-7 max-w-[13ch]">Flutter apps, built to last.</h1>
              <p className="mt-5 max-w-[540px] text-[1.05rem] leading-8 text-[var(--text-muted)] sm:text-[1.125rem]">
                I design, build, and publish mobile apps with Flutter—from the first idea to the
                app store, and the updates that come after.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/projects" className="button-primary group w-full sm:w-auto">
                  <span>See my projects</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden>→</span>
                </Link>
                <a
                  href={contactMailto({ subject: 'Flutter role inquiry' })}
                  className="button-secondary w-full sm:w-auto"
                >
                  Contact me
                </a>
              </div>

              <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
                <span className="relative flex h-2.5 w-2.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--status-ok)] opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--status-ok)]" />
                </span>
                {siteConfig.availability}
              </p>

              <ProofStrip className="mt-8 lg:mt-10" />
            </ScrollReveal>

            <ScrollReveal delay={40}>
              <ProductRack projects={projects} />
            </ScrollReveal>
          </div>
        </section>

        <section id="work" className="border-t border-[var(--line-16)]">
          <div className="site-container py-14 sm:py-20 lg:py-24">
            <ScrollReveal>
              <SectionHeader
                eyebrow="Projects"
                title="Apps I've built and shipped"
                description="Real products on Google Play. I designed, built, released, and still maintain each one."
                link={{ href: '/projects', label: 'See all projects' }}
              />
            </ScrollReveal>
            <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ScrollReveal key={project.slug} delay={index * 40} className="h-full">
                  <WorkCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line-16)] bg-[var(--surface-bg)]">
          <div className="site-container py-14 sm:py-20 lg:py-24">
            <ScrollReveal>
              <SectionHeader
                eyebrow="Blog"
                title="Notes from building apps"
                description="Practical, step-by-step lessons from building and maintaining Flutter apps."
                link={{ href: '/blog', label: `Read all ${getArticleCount()} articles` }}
              />
            </ScrollReveal>

            <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((post, index) => (
                <ScrollReveal key={post.slug} delay={index * 40} className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group editorial-card hover-card flex h-full flex-col overflow-hidden text-[var(--text-strong)] no-underline motion-reduce:hover:translate-y-0"
                  >
                    <div className="relative aspect-video border-b border-[var(--line-16)] bg-[var(--panel-bg)]">
                      <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <span className="chip self-start">{post.category}</span>
                      <h3 className="mt-3 text-[1.1rem] font-semibold leading-snug tracking-[-0.015em] transition-colors group-hover:text-[var(--accent)]">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-muted)]">
                        {post.excerpt}
                      </p>
                      <p className="mt-auto pt-5 text-[0.8125rem] text-[var(--text-faint)]">
                        <time dateTime={post.publishedAt}>{formatDateUtc(post.publishedAt)}</time>
                        <span aria-hidden> · </span>
                        {post.readingTime} min read
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-[var(--line-16)]">
          <div className="site-container py-14 sm:py-20 lg:py-24">
            <ScrollReveal>
              <div className="grid gap-8 rounded-[28px] bg-[var(--cta-bg)] px-6 py-10 text-[var(--on-cta)] sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14 lg:px-14">
                <div>
                  <p className="text-sm font-semibold opacity-85">Available for remote roles</p>
                  <h2 className="display-section mt-3 max-w-[18ch]">
                    Have a project or a role in mind? Let&apos;s talk.
                  </h2>
                  <p className="mt-4 max-w-[52ch] text-[1rem] leading-7 opacity-90">
                    Looking for a Flutter developer who cares about your app before and after
                    launch? Send me a message—I usually reply within one working day.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                  <a
                    href={contactMailto({ subject: 'Flutter role inquiry' })}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--on-cta)] px-7 text-[0.9375rem] font-semibold text-[var(--cta-bg)] no-underline transition-transform duration-150 hover:-translate-y-px motion-reduce:transition-none"
                  >
                    Email me
                  </a>
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--on-cta)_45%,transparent)] px-7 text-[0.9375rem] font-semibold text-[var(--on-cta)] no-underline transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--on-cta)_12%,transparent)] motion-reduce:transition-none"
                  >
                    Connect on LinkedIn
                  </a>
                  <p className="text-center text-sm opacity-85 lg:mt-1">{siteConfig.contactEmail}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  link,
}: {
  eyebrow: string;
  title: string;
  description: string;
  link: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display-section mt-2">{title}</h2>
        <p className="mt-3 max-w-[56ch] text-pretty text-[1rem] leading-7 text-[var(--text-muted)]">
          {description}
        </p>
      </div>
      <Link
        href={link.href}
        className="group inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-semibold text-[var(--accent)] no-underline"
      >
        {link.label}
        <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden>→</span>
      </Link>
    </div>
  );
}
