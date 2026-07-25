'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

import Footer from '@/components/Footer';
import ProjectAppIcon from '@/components/ProjectAppIcon';
import CardImage from '@/components/ui/CardImage';
import { getFeaturedPosts } from '@/data/blog';
import { getFeaturedProjects } from '@/data/projects';
import { contactMailto, hasCalendly, hasCv, hasWeb3FormsKey, siteConfig } from '@/config/site';
import { fadeUpMotion } from '@/lib/animations';
import { getValidStoreUrl } from '@/lib/links';
import { cn } from '@/lib/utils';

const ContactForm = dynamic(() => import('@/components/ContactForm'));
const projects = getFeaturedProjects(3);
const articles = getFeaturedPosts().slice(0, 3);

const principles = [
  {
    number: '01',
    title: 'Quiet by design',
    body: 'Interfaces should reduce effort, make the next action obvious, and stay out of the user’s way.',
  },
  {
    number: '02',
    title: 'Local-first foundations',
    body: 'Core product experiences remain dependable without asking the network for permission.',
  },
  {
    number: '03',
    title: 'Built to ship',
    body: 'Architecture, polish, store readiness, and maintenance are treated as one product problem.',
  },
];

function platformLabel(platform: 'ios' | 'android' | 'both') {
  if (platform === 'android') return 'Android';
  if (platform === 'ios') return 'iOS';
  return 'Android · iOS planned';
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const reveal = fadeUpMotion(reduceMotion);

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <section id="home" className="relative flex min-h-[min(940px,100svh)] items-center overflow-hidden px-6 pb-20 pt-28 md:px-12 lg:px-16" aria-label="Introduction">
        <div className="relative z-10 mx-auto w-full max-w-[1320px]">
          <motion.div initial="hidden" animate="visible" variants={reveal} custom={0}>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--cream)] px-4 py-2 text-[0.72rem] font-medium text-[var(--ink-soft)]">
                <span className="h-2 w-2 rounded-full bg-[var(--atelier-accent)]" aria-hidden />
                {siteConfig.availability}
              </span>
              <span className="editorial-kicker">Flutter · Mobile engineering · Ankara</span>
            </div>
          </motion.div>

          <motion.h1
            className="editorial-display max-w-[1120px] text-[clamp(4.3rem,12vw,10.5rem)] leading-[0.78]"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={1}
          >
            Nabi
            <span className="block italic text-[var(--accent-ink)]">Rahmani.</span>
          </motion.h1>

          <motion.div
            className="mt-12 grid max-w-[1120px] gap-8 md:grid-cols-[1.3fr_1fr] md:items-end"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={2}
          >
            <p className="max-w-[700px] text-[clamp(1.35rem,3vw,2.3rem)] leading-[1.22] tracking-[-0.03em] text-[var(--ink-soft)]">
              I build thoughtful Flutter products with calm interfaces, local-first foundations, and production architecture.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/projects" className="inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-6 py-3.5 text-[0.9rem] font-medium text-[var(--cream)] no-underline transition-transform motion-safe:hover:-translate-y-1">
                Explore the work
                <span aria-hidden>↗</span>
              </Link>
              <Link href="/#contact" className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--cream)] px-6 py-3.5 text-[0.9rem] font-medium text-[var(--ink)] no-underline transition-colors hover:border-[var(--atelier-accent)]">
                Start a conversation
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--line)] pt-5"
            initial="hidden"
            animate="visible"
            variants={reveal}
            custom={3}
          >
            {['Flutter & Dart', 'Riverpod', 'Offline-first', `${projects.length} shipped apps`].map((item) => (
              <span key={item} className="text-[0.75rem] text-[var(--muted)]">{item}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="projects" className="border-t border-[var(--line)] px-6 py-24 md:px-12 md:py-32 lg:px-16" aria-label="Selected projects">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-14 grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-end">
            <div>
              <p className="editorial-kicker mb-5">Selected work · 2024—2026</p>
              <h2 className="editorial-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">Three products.<br />Three stories.</h2>
            </div>
            <p className="max-w-[520px] text-[1rem] leading-[1.75] text-[var(--muted)] md:justify-self-end">
              Each app has its own focused landing page with real screenshots, features, technical stack, and release status.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            {projects.map((project, index) => {
              const playStoreUrl = getValidStoreUrl(project.links.playStore);
              return (
                <motion.article
                  key={project.id}
                  className="group overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--cream)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-500 motion-safe:hover:-translate-y-2 hover:shadow-[var(--shadow-md)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={reveal}
                  custom={index}
                >
                  <Link href={`/projects/${project.slug}`} className="block no-underline">
                    <CardImage src={project.coverImage} alt={`${project.title} — ${project.subtitle}`} aspectRatio="16/10" sizes="(max-width: 1024px) 100vw, 33vw" priority={index === 0} />
                  </Link>
                  <div className="p-7 md:p-8">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <ProjectAppIcon title={project.title} iconLight={project.iconLight} iconDark={project.iconDark} size="sm" />
                      <span className="editorial-kicker text-right">{platformLabel(project.platform)}</span>
                    </div>
                    <Link href={`/projects/${project.slug}`} className="block no-underline">
                      <h3 className="editorial-display text-[clamp(2.25rem,4vw,3.4rem)] leading-[0.95] text-[var(--ink)]">{project.title}</h3>
                      <p className="mt-4 min-h-[3.5rem] text-[0.95rem] leading-[1.65] text-[var(--muted)]">{project.subtitle}</p>
                    </Link>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => <span key={tech} className="rounded-full border border-[var(--line)] px-3 py-1 text-[0.68rem] text-[var(--muted)]">{tech}</span>)}
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
                      <Link href={`/projects/${project.slug}`} aria-label={`View ${project.title} project`} data-testid={`view-project-${project.slug}`} className="text-[0.84rem] font-semibold text-[var(--ink)] underline decoration-[var(--atelier-accent)] decoration-2 underline-offset-4">View project</Link>
                      {playStoreUrl && <span className="text-[0.68rem] text-[var(--muted)]">Live on Play</span>}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-6 py-3 text-[0.85rem] font-medium text-[var(--ink)] no-underline hover:border-[var(--atelier-accent)]">All project details <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] px-6 py-24 md:px-12 md:py-32 lg:px-16" aria-label="Engineering principles">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="editorial-kicker mb-5">How I build</p>
              <h2 className="editorial-display text-[clamp(3rem,6vw,5.8rem)] leading-[0.92]">Design discipline.<br />Engineering depth.</h2>
            </div>
            <p className="max-w-[540px] text-[1.05rem] leading-[1.75] text-[var(--muted)] md:justify-self-end">
              A senior mobile workflow means thinking beyond screens: data ownership, failure states, maintainability, store delivery, and the feel of every interaction.
            </p>
          </div>

          <div className="grid border-y border-[var(--line)] md:grid-cols-3">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.number}
                className={cn('py-10 md:px-8 md:py-12', index > 0 && 'border-t border-[var(--line)] md:border-l md:border-t-0')}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reveal}
                custom={index}
              >
                <span className="editorial-kicker text-[var(--accent-ink)]">{principle.number}</span>
                <h3 className="mt-8 text-[1.2rem] font-semibold">{principle.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-[1.7] text-[var(--muted)]">{principle.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-[var(--line)] bg-[var(--cream-2)] px-6 py-24 md:px-12 md:py-32 lg:px-16" aria-label="About Nabi">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="editorial-kicker mb-6">About</p>
            <h2 className="editorial-display max-w-[850px] text-[clamp(3.2rem,7vw,7rem)] leading-[0.9]">
              Product thinking, expressed through Flutter.
            </h2>
          </div>
          <div>
            <p className="text-[1.05rem] leading-[1.8] text-[var(--ink-soft)]">
              I’m a Flutter engineer based in Ankara, focused on turning thoughtful ideas into dependable mobile products. My work spans interface design, local-first architecture, subscriptions, analytics, and the final details required to ship.
            </p>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-[var(--ink)] underline decoration-[var(--atelier-accent)] decoration-2 underline-offset-4">
              Read my story <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {articles.length > 0 && (
        <section id="blog" className="border-t border-[var(--line)] px-6 py-24 md:px-12 md:py-32 lg:px-16" aria-label="Selected articles">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="editorial-kicker mb-5">Articles</p>
                <h2 className="editorial-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9]">Notes from the work.</h2>
              </div>
              <Link href="/blog" className="text-[0.9rem] font-semibold text-[var(--ink)] underline decoration-[var(--atelier-accent)] decoration-2 underline-offset-4">All articles</Link>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              {articles.map((post, index) => (
                <motion.article key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} custom={index}>
                  <Link href={`/blog/${post.slug}`} className="group block no-underline">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[var(--cream-2)]">
                      <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className="mt-5 flex items-center gap-3 text-[0.7rem] text-[var(--muted)]">
                      <span>{post.category}</span><span aria-hidden>·</span><span>{post.readingTime} min</span>
                    </div>
                    <h3 className="mt-3 text-[1.25rem] font-semibold leading-[1.35] text-[var(--ink)] transition-colors group-hover:text-[var(--accent-ink)]">{post.title}</h3>
                    <p className="mt-3 line-clamp-3 text-[0.88rem] leading-[1.7] text-[var(--muted)]">{post.excerpt}</p>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="border-t border-[var(--line)] bg-[var(--cream-2)] px-6 py-24 md:px-12 md:py-32 lg:px-16" aria-label="Contact">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="editorial-kicker mb-6">Contact</p>
            <h2 className="editorial-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.88]">Let’s build something considered.</h2>
            <p className="mt-8 max-w-[500px] text-[1rem] leading-[1.8] text-[var(--muted)]">{siteConfig.availability}. Tell me about the product, team, or problem you’re working on.</p>
            <div className="mt-8 flex flex-wrap gap-4 text-[0.82rem]">
              <a href={contactMailto()} className="font-semibold text-[var(--ink)] underline decoration-[var(--atelier-accent)] decoration-2 underline-offset-4">{siteConfig.contactEmail}</a>
              {hasCalendly() && <a href={siteConfig.calendlyUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--ink)]">Book a call</a>}
              {hasCv() && <a href={siteConfig.cvPath} target="_blank" rel="noopener noreferrer" className="text-[var(--ink)]">Resume</a>}
            </div>
          </div>
          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--cream)] p-6 shadow-[var(--shadow-sm)] md:p-10">
            {hasWeb3FormsKey() ? (
              <ContactForm />
            ) : (
              <div className="flex min-h-[300px] flex-col justify-between">
                <p className="editorial-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.05]">A direct note is the best place to start.</p>
                <a href={contactMailto({ subject: 'Portfolio inquiry' })} className="mt-12 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--ink)] px-6 py-3.5 text-[0.9rem] font-medium text-[var(--cream)] no-underline transition-transform motion-safe:hover:-translate-y-1">
                  Write an email <span aria-hidden>↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
