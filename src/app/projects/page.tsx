'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { getAllProjects } from '@/data/projects';
import Footer from '@/components/Footer';
import Badge from '@/components/ui/Badge';
import CardImage from '@/components/ui/CardImage';
import {
  getValidProjectGithubUrl,
  getValidStoreUrl,
} from '@/lib/links';
import { atelierEase, selectTransition } from '@/lib/animations';

const appleIcon =
  'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z';
const playIcon =
  'M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zM15 12L7 7v10l8-5zm2-5l5.5 3.5a1.5 1.5 0 010 2.5L17 17V7z';
const githubIcon =
  'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';

type PlatformFilter = 'all' | 'ios' | 'android' | 'both';

const platformFilters: { label: string; value: PlatformFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
  { label: 'Both', value: 'both' },
];

const platformLabel = (platform: 'ios' | 'android' | 'both') => {
  if (platform === 'both') return 'Android · iOS planned';
  if (platform === 'ios') return 'iOS';
  return 'Android';
};

const allProjects = getAllProjects();

export default function Projects() {
  const [activePlatform, setActivePlatform] = useState<PlatformFilter>('all');
  const reduceMotion = useReducedMotion();

  const projects = useMemo(() => {
    if (activePlatform === 'all') return allProjects;
    if (activePlatform === 'both') {
      return allProjects.filter((p) => p.platform === 'both');
    }
    // iOS / Android chips include dual-platform apps
    return allProjects.filter(
      (p) => p.platform === activePlatform || p.platform === 'both',
    );
  }, [activePlatform]);

  const enter = (delay = 0) =>
    selectTransition(reduceMotion, {
      duration: 0.5,
      delay,
      ease: atelierEase,
    });

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <main className="pt-28 md:pt-32 px-6 md:px-12 pb-20">
        <div className="max-w-[1100px] mx-auto">
          <header className="mb-12 md:mb-16 max-w-[640px]">
            <motion.p
              className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0)}
            >
              [ Projects ]
            </motion.p>
            <motion.h1
              className="mb-4 leading-tight"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              }}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.08)}
            >
              Apps I&apos;ve shipped
            </motion.h1>
            <motion.p
              className="text-[1rem] text-[var(--ink-soft)] leading-relaxed"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.16)}
            >
              Flutter products with real store listings, screenshots, and stack
              notes — proof for hiring managers, not concept decks.
            </motion.p>
          </header>

          <motion.div
            className="flex items-center gap-2 flex-wrap mb-12"
            role="group"
            aria-label="Filter by platform"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0.22)}
          >
            {platformFilters.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => setActivePlatform(value)}
                className={`px-4 py-2 rounded-full text-[0.8125rem] font-medium transition-colors duration-200 border cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)] ${
                  activePlatform === value
                    ? 'bg-[var(--ink)] text-[var(--cream)] border-transparent'
                    : 'bg-transparent text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          <div className="flex flex-col gap-12 md:gap-14">
            {projects.length === 0 && (
              <p className="text-center py-16 text-[var(--muted)]">
                No projects match this filter.
              </p>
            )}

            {projects.map((project, i) => {
              const playStore = getValidStoreUrl(project.links.playStore);
              const appStore = getValidStoreUrl(project.links.appStore);
              const github = getValidProjectGithubUrl(project.links.github);
              const wantsIos =
                project.platform === 'ios' || project.platform === 'both';
              const wantsAndroid =
                project.platform === 'android' || project.platform === 'both';
              const techPreview = project.techStack.slice(0, 4);

              return (
                <motion.article
                  key={project.id}
                  className="group rounded-3xl overflow-hidden bg-[var(--cream-2)] border border-[var(--line)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500"
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-48px' }}
                  transition={selectTransition(reduceMotion, {
                    duration: 0.55,
                    delay: reduceMotion ? 0 : Math.min(i * 0.06, 0.18),
                    ease: atelierEase,
                  })}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="no-underline block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                  >
                    <CardImage
                      src={project.coverImage}
                      alt={`${project.title} cover — ${project.subtitle}`}
                      aspectRatio="16/9"
                      sizes="(max-width: 768px) 100vw, 1100px"
                      priority={i === 0}
                    />
                  </Link>

                  <div className="p-7 md:p-10">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="neutral">{platformLabel(project.platform)}</Badge>
                      {project.badges?.slice(0, 2).map((badge) => (
                        <Badge key={badge} variant="accent">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="no-underline block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                    >
                      <h2
                        className="mb-3 tracking-tight text-[var(--ink)] group-hover:text-[var(--atelier-accent)] transition-colors duration-300"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                        }}
                      >
                        {project.title}
                      </h2>
                      <p className="text-[1rem] text-[var(--ink-soft)] mb-5 leading-relaxed max-w-[40rem]">
                        {project.subtitle}
                      </p>
                    </Link>

                    {/* Tech cues — keep cards scannable */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {techPreview.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-[11px] tracking-[0.04em] border border-[var(--line)] text-[var(--muted)]"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 flex-wrap items-center">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-full text-[0.875rem] font-medium no-underline hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                      >
                        View project →
                      </Link>
                      {playStore && (
                        <a
                          href={playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--line)] text-[var(--ink)] rounded-full text-[0.875rem] font-medium no-underline hover:border-[var(--atelier-accent)] hover:text-[var(--atelier-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path d={playIcon} />
                          </svg>
                          Play Store ↗
                        </a>
                      )}
                      {appStore && (
                        <a
                          href={appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--line)] text-[var(--ink)] rounded-full text-[0.875rem] font-medium no-underline hover:border-[var(--atelier-accent)] hover:text-[var(--atelier-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path d={appleIcon} />
                          </svg>
                          App Store ↗
                        </a>
                      )}
                      {github && (
                        <a
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--line)] text-[var(--muted)] rounded-full text-[0.875rem] font-medium no-underline hover:text-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path d={githubIcon} />
                          </svg>
                          GitHub ↗
                        </a>
                      )}
                      {wantsIos && !appStore && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-2 text-[0.8125rem] text-[var(--muted)] opacity-70">
                          iOS not released
                        </span>
                      )}
                      {wantsAndroid && !playStore && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-2 text-[0.8125rem] text-[var(--muted)] opacity-70">
                          Android not released
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <p className="text-center mt-14">
            <Link
              href="/"
              className="text-[0.875rem] text-[var(--muted)] hover:text-[var(--ink)] transition-colors no-underline inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                <path d="M19 12H5m7 7l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to home
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
