'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';

import Footer from '@/components/Footer';
import {
  getAppProof,
  getArticleCount,
  getAverageRating,
  getTotalInstalls,
  getYearsShipping,
} from '@/config/proof';
import { contactMailto } from '@/config/site';
import { socialLinks } from '@/config/navigation';
import { getFeaturedPosts } from '@/data/blog';
import { nowData } from '@/data/now';
import { getFeaturedProjects } from '@/data/projects';
import { usesCategories } from '@/data/uses';
import { fadeUpMotion } from '@/lib/animations';

const articles = getFeaturedPosts().slice(0, 4);
const projects = getFeaturedProjects();
const toolboxItems = usesCategories.find((category) => category.label === 'Flutter / Dart')?.items.slice(0, 6) ?? [];
const githubUrl = socialLinks.find((link) => link.label === 'GitHub')?.href ?? 'https://github.com/Nabi-Rahmani';

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en', {
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(value);
}

function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00Z`)).toUpperCase();
}

function ProjectIcon({
  title,
  iconLight,
  iconDark,
}: {
  title: string;
  iconLight?: string;
  iconDark?: string;
}) {
  const lightSrc = iconLight ?? iconDark;
  const darkSrc = iconDark ?? iconLight;
  const sameAsset = lightSrc === darkSrc;

  if (!lightSrc && !darkSrc) return null;

  return (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-tile border border-[var(--line-18)] bg-[var(--tile-bg)]">
      {lightSrc && (
        <Image
          src={lightSrc}
          alt={`${title} app icon`}
          width={36}
          height={36}
          className={sameAsset ? 'h-full w-full scale-[1.65] object-contain' : 'h-full w-full scale-[1.65] object-contain dark:hidden'}
        />
      )}
      {!sameAsset && darkSrc && (
        <Image
          src={darkSrc}
          alt=""
          aria-hidden
          width={36}
          height={36}
          className="hidden h-full w-full scale-[1.65] object-contain dark:block"
        />
      )}
    </span>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const reveal = fadeUpMotion(reduceMotion);
  const stats = [
    {
      label: 'TOTAL INSTALLS',
      value: getTotalInstalls(),
      format: formatCompactNumber,
    },
    {
      label: 'RATINGS',
      value: getAverageRating(),
      format: (value: number) => `${value.toFixed(1)} ★`,
    },
    {
      label: 'YEARS SHIPPING',
      value: getYearsShipping(),
      format: String,
    },
    {
      label: 'ARTICLES',
      value: getArticleCount(),
      format: String,
    },
  ].filter((stat): stat is { label: string; value: number; format: (value: number) => string } => stat.value !== undefined);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[54px] text-[var(--text-strong)]">
      <section id="home" className="border-b border-[var(--line-16)]" aria-label="Introduction">
        <motion.div
          className="mx-auto grid w-full max-w-[1280px] lg:grid-cols-[1.35fr_1fr]"
          initial="hidden"
          animate="visible"
          variants={reveal}
        >
          <div className="px-5 pb-10 pt-[46px] md:px-10">
            <div className="mb-5 flex items-center gap-[9px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-ok)]" aria-hidden />
              <span className="font-mono text-[11.5px] tracking-[0.1em] text-[var(--text-muted)]">
                AVAILABLE — FREELANCE &amp; FULL-TIME REMOTE
              </span>
            </div>
            <h1 className="type-hero max-w-[19ch]">Flutter apps that hold up after the launch week.</h1>
            <p className="type-lede mt-[18px] max-w-[52ch] text-[var(--text-muted)]">
              I&apos;m Nabi — six years of mobile engineering, three of my own apps on the Play Store, and a habit of writing down what broke. Offline-first data, Riverpod at scale, store delivery.
            </p>
            <div className="mt-7 flex flex-wrap gap-[10px]">
              <Link
                href="/blog"
                className="type-button rounded-pill bg-[var(--text-strong)] px-[22px] py-[11px] font-semibold text-[var(--on-accent)] no-underline transition-colors duration-[120ms] ease-out hover:brightness-95"
              >
                Read the writing →
              </Link>
              <a
                href={contactMailto()}
                className="type-button rounded-pill border border-[color:rgba(245,239,227,0.25)] px-[22px] py-[11px] text-[var(--text-strong)] no-underline transition-colors duration-[120ms] ease-out hover:border-[var(--line-30)]"
              >
                codewithnabi@gmail.com
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-[var(--line-16)] lg:border-l lg:border-t-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={[
                  'p-[22px] md:px-6',
                  index % 2 === 0 ? 'border-r border-[var(--line-16)]' : '',
                  index < stats.length - (stats.length % 2 === 0 ? 2 : 1) ? 'border-b border-[var(--line-16)]' : '',
                ].join(' ')}
              >
                <div className="type-stat text-[var(--accent)]">{stat.format(stat.value)}</div>
                <div className="type-meta mt-[5px] text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-b border-[var(--line-16)]" aria-label="Writing and current work">
        <motion.div
          className="mx-auto grid w-full max-w-[1280px] lg:grid-cols-[minmax(0,1fr)_380px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
        >
          <div className="px-5 py-8 md:px-10 lg:border-r lg:border-[var(--line-16)] lg:pb-[34px]">
            <div className="mb-5 flex items-baseline justify-between gap-5">
              <span className="type-eyebrow text-[var(--text-muted)]">Latest writing</span>
              <Link href="/blog" className="type-button shrink-0 text-[var(--accent)] no-underline">
                All {getArticleCount()} posts →
              </Link>
            </div>
            <div>
              {articles.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`group flex gap-5 border-t border-[var(--line-13)] px-0 py-4 no-underline transition-colors duration-[120ms] ease-out hover:bg-[color-mix(in_srgb,var(--accent)_4%,transparent)] ${index === articles.length - 1 ? 'border-b' : ''}`}
                >
                  <time dateTime={post.publishedAt} className="type-meta w-[70px] shrink-0 pt-[3px] text-[var(--text-faint)]">
                    {formatPostDate(post.publishedAt)}
                  </time>
                  <div className="min-w-0">
                    <h2 className="type-article-title text-[var(--text-strong)]">{post.title}</h2>
                    <p className="type-dek mt-1 max-w-[60ch] text-[var(--text-muted)]">{post.excerpt}</p>
                  </div>
                  <span className="type-meta ml-auto shrink-0 pt-[3px] text-[var(--text-faint)] transition-transform duration-[120ms] ease-out group-hover:translate-x-0.5">
                    {post.readingTime}m
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <aside id="about" className="border-t border-[var(--line-16)] bg-[var(--panel-bg)] px-5 py-8 md:px-[30px] lg:border-l-0 lg:border-t-0 lg:pb-[34px]" aria-label="Now and toolbox">
            <span className="type-eyebrow text-[var(--text-muted)]">Now</span>
            <p className="mt-[14px] text-[14px] leading-[1.6] text-[var(--text-soft)] [text-wrap:pretty]">
              {nowData.sections.map((section, index) => (
                <Fragment key={section.label}>
                  <span className="font-medium text-[var(--text-strong)]">{section.label}: </span>
                  {section.items.join(' · ')}
                  {index < nowData.sections.length - 1 ? ' ' : ''}
                </Fragment>
              ))}
            </p>
            <div className="my-[22px] h-px bg-[var(--line-16)]" />
            <span className="type-eyebrow text-[var(--text-muted)]">Toolbox</span>
            <div className="mt-[13px] flex flex-wrap gap-[7px]">
              {toolboxItems.map((item) => (
                <span key={item} className="type-meta rounded-chip border border-[var(--line-24)] px-[10px] py-[5px] text-[var(--text-soft)]">
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </motion.div>
      </section>

      <section id="projects" className="border-b border-[var(--line-16)]" aria-label="Apps I built and maintain alone">
        <motion.div
          className="mx-auto w-full max-w-[1280px] px-5 py-8 md:px-10 md:pb-[38px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
        >
          <span className="type-eyebrow text-[var(--text-muted)]">Apps I built and maintain alone</span>
          <div className="mt-[18px]">
            {projects.map((project, index) => {
              const proof = getAppProof(project.slug);
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className={`group grid grid-cols-[44px_minmax(0,1fr)] items-center gap-x-4 gap-y-2 border-t border-[var(--line-13)] py-4 no-underline transition-colors duration-[120ms] ease-out hover:bg-[color-mix(in_srgb,var(--accent)_4%,transparent)] xl:grid-cols-[44px_190px_minmax(0,1fr)_130px_100px_90px] ${index === projects.length - 1 ? 'border-b' : ''}`}
                >
                  <ProjectIcon title={project.title} iconLight={project.iconLight} iconDark={project.iconDark} />
                  <span className="text-[17px] font-semibold tracking-[-0.012em] text-[var(--text-strong)]">{project.title}</span>
                  <span className="col-start-2 text-[13.5px] text-[var(--text-muted)] xl:col-start-auto">{project.subtitle}</span>
                  {proof?.installs !== undefined && (
                    <span className="col-start-2 font-mono text-[13px] font-medium text-[var(--accent)] xl:col-start-auto">
                      {formatCompactNumber(proof.installs)} installs
                    </span>
                  )}
                  {proof?.rating !== undefined && (
                    <span className="col-start-2 font-mono text-[13px] text-[var(--text-muted)] xl:col-start-auto">
                      {proof.rating.toFixed(1)} ★
                    </span>
                  )}
                  <span className="col-start-2 text-[12.5px] font-medium text-[var(--text-strong)] xl:col-start-auto xl:text-right xl:group-hover:underline xl:group-hover:underline-offset-4">
                    Open ↗
                  </span>
                </Link>
              );
            })}
          </div>
          {/* Device screenshots supplied by the owner will be added here; marketing cover images intentionally stay off this page. */}
        </motion.div>
      </section>

      <section id="contact" aria-label="Contact">
        <motion.div
          className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-5 py-[44px] md:px-10 lg:flex-row lg:items-end lg:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
        >
          <div>
            <h2 className="max-w-[16ch] font-serif text-[38px] font-bold italic leading-[1.1] tracking-[-0.01em] text-[var(--text-strong)]">
              Got something worth building properly?
            </h2>
            <p className="mt-3 text-[14px] text-[var(--text-muted)]">Ankara, Turkey · works remote · replies within a day</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-[10px]">
            <a
              href={contactMailto({ subject: 'Portfolio inquiry' })}
              className="rounded-pill bg-[var(--accent)] px-6 py-3 text-[14px] font-semibold text-[var(--on-accent)] no-underline transition-[filter] duration-[120ms] ease-out hover:brightness-95"
            >
              Write an email ↗
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill border border-[color:rgba(245,239,227,0.25)] px-6 py-3 text-[14px] font-medium text-[var(--text-strong)] no-underline transition-colors duration-[120ms] ease-out hover:border-[var(--line-30)]"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
