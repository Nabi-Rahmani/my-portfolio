'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllProjects } from '@/data/projects';

const githubIcon = 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';
const appleIcon = 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z';
const playIcon = 'M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zM15 12L7 7v10l8-5zm2-5l5.5 3.5a1.5 1.5 0 010 2.5L17 17V7z';

const projects = getAllProjects();

export default function Projects() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-16 md:pb-0 overflow-hidden">
            <main className="pt-24 px-6 pb-16">
                <div className="max-w-[800px] mx-auto">
                    {/* Header — drops in from above with bounce */}
                    <div className="text-center mb-16">
                        <motion.h1
                            className="text-[2rem] md:text-[2.75rem] font-bold text-[var(--text-primary)] mb-4 tracking-tight"
                            initial={{ opacity: 0, y: -80, scale: 0.6 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                        >
                            My Projects
                        </motion.h1>
                        <motion.p
                            className="text-[1rem] text-[var(--text-secondary)]"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.3 }}
                        >
                            Flutter applications I&apos;ve built with passion
                        </motion.p>
                    </div>

                    <div className="flex flex-col gap-10">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                className="rounded-3xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-secondary)]"
                                initial={{ opacity: 0, x: i % 2 === 0 ? -120 : 120, rotate: i % 2 === 0 ? -4 : 4, scale: 0.85 }}
                                whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ type: 'spring', stiffness: 100, damping: 14, delay: i * 0.15 }}
                                whileHover={{ scale: 1.02, y: -6, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
                            >
                                <Link href={`/projects/${project.slug}`} className="no-underline block">
                                    <motion.div
                                        className="relative aspect-[16/10] overflow-hidden"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    >
                                        <Image
                                            src={project.coverImage}
                                            alt={`${project.title} - ${project.subtitle}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 800px"
                                        />
                                    </motion.div>
                                </Link>
                                <div className="p-6 md:p-8">
                                    <Link href={`/projects/${project.slug}`} className="no-underline block">
                                        <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                                            {project.title}
                                        </h2>
                                        <p className="text-[0.9375rem] text-[var(--text-secondary)] mb-5 leading-relaxed">
                                            {project.subtitle}
                                        </p>
                                    </Link>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.features.map((feature, fi) => (
                                            <motion.span
                                                key={feature}
                                                className="px-3 py-1.5 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-lg text-[0.8125rem] border border-[var(--border-color)]"
                                                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: fi * 0.06 }}
                                            >
                                                {feature}
                                            </motion.span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3 flex-wrap">
                                        {project.links.github && (
                                            <motion.a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-[0.875rem] font-medium no-underline hover:opacity-90 transition-opacity"
                                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.92 }}
                                            >
                                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={githubIcon} /></svg>
                                                Source Code
                                            </motion.a>
                                        )}
                                        {project.links.appStore && (
                                            <motion.a
                                                href={project.links.appStore}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[0.875rem] font-medium no-underline hover:bg-[var(--bg-primary)] hover:border-[var(--text-secondary)] transition-all duration-200"
                                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.2 }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.92 }}
                                            >
                                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={appleIcon} /></svg>
                                                App Store
                                            </motion.a>
                                        )}
                                        {project.links.playStore && (
                                            <motion.a
                                                href={project.links.playStore}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[0.875rem] font-medium no-underline hover:bg-[var(--bg-primary)] hover:border-[var(--text-secondary)] transition-all duration-200"
                                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.92 }}
                                            >
                                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={playIcon} /></svg>
                                                Play Store
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Back link — pops in from below */}
                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0, y: 40, scale: 0.8 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                    >
                        <motion.div
                            whileHover={{ x: -6 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            <Link
                                href="/"
                                className="text-[0.875rem] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline inline-flex items-center gap-1"
                            >
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5m7 7l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                Back to home
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </main>

            <footer className="px-6 py-8 border-t border-[var(--border-color)]">
                <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                        &copy; 2025 Mohammad Nabi Rahmani
                    </span>
                    <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                        Built with Next.js &amp; Tailwind
                    </span>
                </div>
            </footer>
        </div>
    );
}
