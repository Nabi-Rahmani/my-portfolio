'use client';

import type { MouseEvent } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blog';
import { getAllProjects } from '@/data/projects';

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: HTMLElement | string, options?: { offset?: number; immediate?: boolean }) => void;
    };
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const socials = [
  { href: 'https://github.com/Nabi-Rahmani', label: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { href: 'https://www.linkedin.com/in/muhammad-nabi-rahmani-%F0%9F%87%B5%F0%9F%87%B8-8945b21ba/', label: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { href: 'https://x.com/nabirahmani_dev', label: 'Twitter/X', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
];

export default function Home() {
  const handleScrollTo = (hash: string) => (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (typeof window === 'undefined') return;

    event.preventDefault();

    const target = document.querySelector(hash) as HTMLElement | null;
    const lenis = window.__lenis;

    if (target && lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(target, { offset: -80 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
  };

  const featuredPosts = blogPosts.slice(0, 3);
  const allProjects = getAllProjects();

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      {/* Hero */}
      <section id="home" className="hero-grid">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center max-w-[680px] w-full"
          >
            <motion.h1
              custom={0}
              variants={fadeUp}
              className="text-[2.75rem] md:text-[4.5rem] font-bold tracking-tight leading-[1.05] text-[var(--text-primary)] mb-4"
            >
              Nabi Rahmani
            </motion.h1>

            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-[1.125rem] md:text-[1.25rem] text-[var(--text-secondary)] mb-6 max-w-[520px] mx-auto leading-relaxed"
            >
              Flutter Developer crafting beautiful mobile experiences
              with clean code and intuitive design.
            </motion.p>

            {/* Social icons */}
            <motion.div custom={2} variants={fadeUp} className="flex gap-3 justify-center mb-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
                  title={social.label}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </motion.div>

            {/* Metrics line */}
            <motion.p custom={3} variants={fadeUp} className="text-[0.875rem] text-[var(--text-secondary)] mb-10">
              3+ Years Experience &middot; 2 Published Apps &middot; Ankara, Turkey
            </motion.p>

            {/* Single CTA */}
            <motion.div custom={4} variants={fadeUp}>
              <Link
                href="/#projects"
                onClick={handleScrollTo('#projects')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-[0.9375rem] font-medium no-underline hover:opacity-90 transition-opacity"
              >
                View My Work
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M12 5v14m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 md:py-32 px-6">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
              Featured Work
            </p>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold text-[var(--text-primary)] tracking-tight">
              Selected Projects
            </h2>
          </motion.div>

          <div className="flex flex-col gap-14">
            {allProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500"
              >
                <Link href={`/projects/${project.slug}`} className="no-underline block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={`${project.title} - ${project.subtitle}`}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 1000px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </Link>
                <div className="p-7 md:p-10">
                  <Link href={`/projects/${project.slug}`} className="no-underline block">
                    <h3 className="text-[1.75rem] md:text-[2.25rem] font-bold text-[var(--text-primary)] mb-3 tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[1rem] md:text-[1.0625rem] text-[var(--text-secondary)] mb-6 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </Link>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature) => (
                      <span key={feature} className="px-3 py-1.5 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-lg text-[0.8125rem] border border-[var(--border-color)]">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-[0.875rem] font-medium no-underline hover:opacity-90 transition-opacity"
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        Source Code
                      </a>
                    )}
                    {project.links.appStore && (
                      <a
                        href={project.links.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[0.875rem] font-medium no-underline hover:bg-[var(--bg-primary)] hover:border-[var(--text-secondary)] transition-all duration-200"
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                        App Store
                      </a>
                    )}
                    {project.links.playStore && (
                      <a
                        href={project.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[0.875rem] font-medium no-underline hover:bg-[var(--bg-primary)] hover:border-[var(--text-secondary)] transition-all duration-200"
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zM15 12L7 7v10l8-5zm2-5l5.5 3.5a1.5 1.5 0 010 2.5L17 17V7z" /></svg>
                        Play Store
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-24 md:py-32 px-6">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
              Writing
            </p>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold text-[var(--text-primary)] tracking-tight">
              Latest Articles
            </h2>
          </motion.div>

          {/* 1 big + 2 grid pattern */}
          <div className="flex flex-col gap-10">
            {/* Big card — first post */}
            {featuredPosts[0] && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="group rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500"
              >
                <Link href={`/blog/${featuredPosts[0].slug}`} className="no-underline block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={featuredPosts[0].coverImage}
                      alt={featuredPosts[0].title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 1000px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </Link>
                <div className="p-7 md:p-10">
                  <Link href={`/blog/${featuredPosts[0].slug}`} className="no-underline block">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] text-[0.75rem] font-medium">
                        {featuredPosts[0].category}
                      </span>
                      <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                        {featuredPosts[0].readingTime} min read
                      </span>
                    </div>
                    <h3 className="text-[1.75rem] md:text-[2.25rem] font-bold text-[var(--text-primary)] mb-3 tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-[1rem] md:text-[1.0625rem] text-[var(--text-secondary)] mb-6 leading-relaxed">
                      {featuredPosts[0].excerpt}
                    </p>
                  </Link>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPosts[0].tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-[var(--accent-muted)] text-[var(--text-secondary)] rounded-lg text-[0.8125rem]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src={featuredPosts[0].author.avatar}
                      alt={featuredPosts[0].author.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <span className="text-[0.875rem] text-[var(--text-secondary)]">
                      {featuredPosts[0].author.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2-column grid — next 2 posts */}
            {featuredPosts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.slice(1, 3).map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18, delay: i * 0.08 }}
                    className="group rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500 h-full"
                  >
                    <Link href={`/blog/${post.slug}`} className="no-underline block h-full flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                      <div className="p-6 md:p-7 flex flex-col flex-1">
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] text-[0.6875rem] font-medium">
                            {post.category}
                          </span>
                          <span className="text-[0.75rem] text-[var(--text-secondary)]">
                            {post.readingTime} min
                          </span>
                        </div>
                        <h3 className="text-[1.25rem] md:text-[1.5rem] font-bold text-[var(--text-primary)] mb-2.5 tracking-tight leading-snug group-hover:text-[var(--accent)] transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed mb-5 flex-1 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                          <div className="flex items-center gap-2.5">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={28}
                              height={28}
                              className="rounded-full object-cover"
                            />
                            <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                              {post.author.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[0.9375rem] font-medium no-underline hover:border-[var(--text-secondary)] transition-all duration-200"
            >
              View all articles
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 px-6">
        <div className="max-w-[680px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
              Background
            </p>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold text-[var(--text-primary)] tracking-tight mb-6">
              About Me
            </h2>
            <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed mb-4">
              I&apos;m Nabi Rahmani, a Flutter developer from Mazar-i-Sharif, Afghanistan, now based in Ankara, Turkey.
              I specialize in building and shipping mobile apps fast — with clean architecture,
              offline-first reliability, and polished UI on the App Store and Google Play.
            </p>
            <Link
              href="/about"
              className="text-[0.875rem] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline inline-flex items-center gap-1"
            >
              Learn more about me
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
              Contact
            </p>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold text-[var(--text-primary)] tracking-tight mb-5">
              Let&apos;s Connect
            </h2>
            <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed mb-10">
              Interested in working together or just want to chat about Flutter development? Feel free to reach out.
            </p>

            <a
              href="mailto:codewithnabi@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-[0.9375rem] font-medium no-underline hover:opacity-90 transition-opacity"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              codewithnabi@gmail.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[var(--border-color)]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
                title={social.label}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 text-[0.8125rem] text-[var(--text-secondary)]">
            <span>&copy; 2025 Mohammad Nabi Rahmani</span>
            <span className="hidden md:inline">&middot;</span>
            <span>Built with Next.js &amp; Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
