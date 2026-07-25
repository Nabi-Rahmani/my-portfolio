'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

import Footer from '@/components/Footer';
import Badge from '@/components/ui/Badge';
import CardImage from '@/components/ui/CardImage';
import { getAllProjects } from '@/data/projects';
import { atelierEase, selectTransition } from '@/lib/animations';
import { getValidProjectGithubUrl, getValidStoreUrl } from '@/lib/links';

type PlatformFilter = 'all' | 'ios' | 'android' | 'both';

const platformFilters: { label: string; value: PlatformFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
  { label: 'Both', value: 'both' },
];

const allProjects = getAllProjects();

function platformLabel(platform: 'ios' | 'android' | 'both') {
  if (platform === 'both') return 'Android · iOS planned';
  if (platform === 'ios') return 'iOS';
  return 'Android';
}

export default function Projects() {
  const [activePlatform, setActivePlatform] = useState<PlatformFilter>('all');
  const reduceMotion = useReducedMotion();

  const projects = useMemo(() => {
    if (activePlatform === 'all') return allProjects;
    if (activePlatform === 'both') return allProjects.filter((project) => project.platform === 'both');
    return allProjects.filter((project) => project.platform === activePlatform || project.platform === 'both');
  }, [activePlatform]);

  const enter = (delay = 0) => selectTransition(reduceMotion, { duration: 0.5, delay, ease: atelierEase });

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <main className="px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-[1120px]">
          <header className="mb-14 max-w-[820px] md:mb-20">
            <motion.p className="editorial-kicker mb-5" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={enter()}>
              [ Projects ]
            </motion.p>
            <motion.h1 className="editorial-display text-[clamp(3.6rem,8vw,7.5rem)] leading-[0.88]" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={enter(0.08)}>
              Apps I&apos;ve shipped.
            </motion.h1>
            <motion.p className="mt-7 max-w-[650px] text-[1.08rem] leading-[1.8] text-[var(--muted)]" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={enter(0.16)}>
              Three independent Flutter products. Open any project for its complete landing page, screenshots, features, stack, and release links.
            </motion.p>
          </header>

          <motion.div className="mb-12 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by platform" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={enter(0.22)}>
            {platformFilters.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => setActivePlatform(value)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-[0.78rem] font-medium transition-colors ${activePlatform === value ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--cream)]' : 'border-[var(--line)] bg-[var(--cream)] text-[var(--muted)] hover:border-[var(--atelier-accent)] hover:text-[var(--ink)]'}`}
                aria-pressed={activePlatform === value}
              >
                {label}
              </button>
            ))}
          </motion.div>

          <div className="flex flex-col gap-12 md:gap-16">
            {projects.length === 0 && <p className="py-16 text-center text-[var(--muted)]">No projects match this filter.</p>}

            {projects.map((project, index) => {
              const playStore = getValidStoreUrl(project.links.playStore);
              const appStore = getValidStoreUrl(project.links.appStore);
              const github = getValidProjectGithubUrl(project.links.github);
              const wantsIos = project.platform === 'ios' || project.platform === 'both';
              const wantsAndroid = project.platform === 'android' || project.platform === 'both';

              return (
                <motion.article
                  key={project.id}
                  className="group overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--cream-2)] shadow-[var(--shadow-sm)] transition-shadow duration-500 hover:shadow-[var(--shadow-md)]"
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-48px' }}
                  transition={selectTransition(reduceMotion, { duration: 0.55, delay: Math.min(index * 0.06, 0.18), ease: atelierEase })}
                >
                  <Link href={`/projects/${project.slug}`} className="block no-underline">
                    <CardImage src={project.coverImage} alt={`${project.title} cover — ${project.subtitle}`} aspectRatio="16/9" sizes="(max-width: 1120px) 100vw, 1120px" priority={index === 0} />
                  </Link>

                  <div className="p-7 md:p-10 lg:p-12">
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                      <Badge variant="neutral">{platformLabel(project.platform)}</Badge>
                      {project.badges?.slice(0, 2).map((badge) => <Badge key={badge} variant="accent">{badge}</Badge>)}
                    </div>

                    <Link href={`/projects/${project.slug}`} className="block no-underline">
                      <h2 className="editorial-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.92] text-[var(--ink)] transition-colors group-hover:text-[var(--accent-ink)]">{project.title}</h2>
                      <p className="mt-5 max-w-[680px] text-[1.08rem] leading-[1.7] text-[var(--ink-soft)]">{project.subtitle}</p>
                    </Link>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 5).map((tech) => <span key={tech} className="rounded-full border border-[var(--line)] bg-[var(--cream)] px-3 py-1.5 text-[0.6875rem] text-[var(--muted)]">{tech}</span>)}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Link href={`/projects/${project.slug}`} aria-label={`View ${project.title} project`} data-testid={`view-project-${project.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-[0.85rem] font-medium text-[var(--cream)] no-underline">View project →</Link>
                      {playStore && <a href={playStore} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--line)] bg-[var(--cream)] px-5 py-3 text-[0.8rem] text-[var(--ink)] no-underline hover:border-[var(--atelier-accent)]">Play Store ↗</a>}
                      {appStore && <a href={appStore} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--line)] bg-[var(--cream)] px-5 py-3 text-[0.8rem] text-[var(--ink)] no-underline hover:border-[var(--atelier-accent)]">App Store ↗</a>}
                      {github && <a href={github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--line)] px-5 py-3 text-[0.8rem] text-[var(--muted)] no-underline">GitHub ↗</a>}
                      {wantsIos && !appStore && <span className="px-2 text-[0.75rem] text-[var(--muted)]">iOS not released</span>}
                      {wantsAndroid && !playStore && <span className="px-2 text-[0.75rem] text-[var(--muted)]">Android not released</span>}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <p className="mt-16 text-center"><Link href="/" className="text-[0.85rem] text-[var(--muted)] no-underline hover:text-[var(--ink)]">← Back to home</Link></p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
