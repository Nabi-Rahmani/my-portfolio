'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import type { Project } from '@/types/project';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function ProjectDetailClient({ project }: { project: Project }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

    // Lightbox state
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxIndex(null);
        document.body.style.overflow = '';
    }, []);

    const goNext = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % project.screenshots.length);
    }, [lightboxIndex, project.screenshots.length]);

    const goPrev = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + project.screenshots.length) % project.screenshots.length);
    }, [lightboxIndex, project.screenshots.length]);

    useEffect(() => {
        if (lightboxIndex === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxIndex, closeLightbox, goNext, goPrev]);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden">

            {/* ════════════════════════════════════════════ */}
            {/* HERO SECTION                                 */}
            {/* ════════════════════════════════════════════ */}
            <section ref={heroRef} className="hero-grid relative pt-24 md:pt-32 pb-16 md:pb-24 px-6 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] rounded-full"
                        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.06 }}
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <div className="max-w-[1200px] mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <motion.nav
                        className="flex items-center gap-2 text-[0.8125rem] text-[var(--text-secondary)] mb-8"
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    >
                        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors no-underline">Home</Link>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <Link href="/projects" className="hover:text-[var(--text-primary)] transition-colors no-underline">Projects</Link>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="text-[var(--text-primary)]">{project.title}</span>
                    </motion.nav>

                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24">
                        {/* Left — Text + CTA */}
                        <div className="flex-1 text-center md:text-left">
                            {/* App icon — swaps between light/dark variants */}
                            {(project.iconLight || project.iconDark) && (
                                <motion.div
                                    className="mb-6 inline-block"
                                    initial={{ opacity: 0, scale: 0, rotate: -20 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                                >
                                    {project.iconLight && (
                                        <Image
                                            src={project.iconLight}
                                            alt={`${project.title} icon`}
                                            width={80}
                                            height={80}
                                            className="rounded-2xl shadow-lg dark:hidden w-16 h-16 md:w-20 md:h-20"
                                        />
                                    )}
                                    {project.iconDark && (
                                        <Image
                                            src={project.iconDark}
                                            alt={`${project.title} icon`}
                                            width={80}
                                            height={80}
                                            className="rounded-2xl shadow-lg hidden dark:block w-16 h-16 md:w-20 md:h-20"
                                        />
                                    )}
                                </motion.div>
                            )}

                            <motion.h1
                                className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold tracking-tight leading-[1.1] mb-4"
                                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
                            >
                                {project.title}
                            </motion.h1>

                            <motion.p
                                className="text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-[520px] mx-auto md:mx-0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.25 }}
                            >
                                {project.subtitle}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex gap-3 flex-wrap justify-center md:justify-start"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.4 }}
                            >
                                {project.links.playStore && (
                                    <motion.a
                                        href={project.links.playStore}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-3.5 bg-[var(--accent)] text-white rounded-full text-[0.9375rem] md:text-[1rem] font-semibold no-underline shadow-lg"
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        whileTap={{ scale: 0.94 }}
                                    >
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zM15 12L7 7v10l8-5zm2-5l5.5 3.5a1.5 1.5 0 010 2.5L17 17V7z" /></svg>
                                        Get on Play Store
                                    </motion.a>
                                )}
                                {project.links.appStore && (
                                    <motion.a
                                        href={project.links.appStore}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-[0.9375rem] md:text-[1rem] font-semibold no-underline"
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        whileTap={{ scale: 0.94 }}
                                    >
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                                        App Store
                                    </motion.a>
                                )}
                                {project.links.github && (
                                    <motion.a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-3.5 border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[0.9375rem] md:text-[1rem] font-medium no-underline hover:bg-[var(--bg-secondary)] transition-colors"
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        whileTap={{ scale: 0.94 }}
                                    >
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        Source
                                    </motion.a>
                                )}
                            </motion.div>
                        </div>

                        {/* Right — Hero image with parallax */}
                        {project.heroImage && (
                            <motion.div
                                className="w-full max-w-[300px] md:max-w-none md:flex-1 lg:max-w-[500px]"
                                initial={{ opacity: 0, y: 60, scale: 0.85 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.3 }}
                                style={{ y: heroY, scale: heroScale }}
                            >
                                <Image
                                    src={project.heroImage}
                                    alt={`${project.title} hero`}
                                    width={841}
                                    height={1280}
                                    className="rounded-3xl shadow-2xl w-full h-auto"
                                    sizes="(max-width: 768px) 300px, (max-width: 1024px) 45vw, 500px"
                                    priority
                                />
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════ */}
            {/* SCREENSHOT GALLERY                           */}
            {/* ════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 overflow-hidden">
                <div className="max-w-[900px] mx-auto px-6 mb-10">
                    <motion.h2
                        className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight text-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                    >
                        See it in action
                    </motion.h2>
                </div>

                <motion.div
                    className="px-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                >
                    <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide max-w-[1200px] mx-auto">
                        {project.screenshots.map((src, i) => (
                            <motion.div
                                key={i}
                                className="flex-shrink-0 snap-center rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-lg cursor-pointer"
                                style={{ width: '240px', height: '480px' }}
                                initial={{ opacity: 0, scale: 0.6, rotate: -6, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.15 + i * 0.1 }}
                                whileHover={{
                                    scale: 1.06,
                                    y: -12,
                                    rotate: 1,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    transition: { type: 'spring', stiffness: 300, damping: 14 },
                                }}
                                onClick={() => openLightbox(i)}
                            >
                                <Image
                                    src={src}
                                    alt={`${project.title} screenshot ${i + 1}`}
                                    width={240}
                                    height={480}
                                    className="w-full h-full object-cover pointer-events-none"
                                    sizes="240px"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ════════════════════════════════════════════ */}
            {/* FEATURE DETAILS SECTION                      */}
            {/* ════════════════════════════════════════════ */}
            {project.featureDetails && project.featureDetails.length > 0 && (
                <section className="px-6 py-16 md:py-24">
                    <div className="max-w-[1100px] mx-auto">
                        {/* Section header */}
                        <div className="text-center mb-14 md:mb-20">
                            <motion.span
                                className="inline-block text-[0.8125rem] font-semibold tracking-widest uppercase text-[var(--accent)] mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 150, damping: 16 }}
                            >
                                Features
                            </motion.span>
                            <motion.h2
                                className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-bold tracking-tight"
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.05 }}
                            >
                                Everything you need to stay disciplined
                            </motion.h2>
                        </div>

                        {/* Feature cards grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {project.featureDetails.map((feature, i) => (
                                <motion.div
                                    key={feature.title}
                                    className="group relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 md:p-7 overflow-hidden"
                                    initial={{ opacity: 0, y: 50, scale: 0.92 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ type: 'spring', stiffness: 140, damping: 18, delay: i * 0.1 }}
                                    whileHover={{
                                        y: -6,
                                        scale: 1.02,
                                        transition: { type: 'spring', stiffness: 400, damping: 15 },
                                    }}
                                >
                                    {/* Accent top border line */}
                                    <motion.div
                                        className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--accent)] origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 + i * 0.1 }}
                                    />

                                    {/* Hover glow */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{ background: 'radial-gradient(circle at 50% 0%, var(--accent-muted) 0%, transparent 70%)' }}
                                    />

                                    {/* Number badge */}
                                    <motion.div
                                        className="relative w-11 h-11 rounded-xl bg-[var(--accent-muted)] text-[var(--accent)] flex items-center justify-center text-[0.9375rem] font-bold mb-5"
                                        initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ type: 'spring', stiffness: 350, damping: 14, delay: 0.15 + i * 0.1 }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </motion.div>

                                    {/* Content */}
                                    <div className="relative">
                                        <h3 className="text-[1.0625rem] font-semibold mb-2.5 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-[0.875rem] text-[var(--text-secondary)] leading-[1.7]">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════ */}
            {/* ABOUT SECTION                                */}
            {/* ════════════════════════════════════════════ */}
            <section className="px-6 py-16 md:py-24">
                <div className="max-w-[900px] mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                        className="text-center max-w-[640px] mx-auto"
                    >
                        <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight mb-6">What is {project.title}?</h2>
                        <p className="text-[1rem] md:text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════ */}
            {/* TECH STACK                                   */}
            {/* ════════════════════════════════════════════ */}
            <section className="px-6 py-16 md:py-24">
                <div className="max-w-[900px] mx-auto text-center">
                    <motion.h2
                        className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight mb-10"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                    >
                        Built with
                    </motion.h2>

                    <div className="flex flex-wrap gap-3 justify-center">
                        {project.techStack.map((tech, i) => (
                            <motion.span
                                key={tech}
                                className="px-5 py-2.5 bg-[var(--accent-muted)] text-[var(--accent)] rounded-xl text-[0.9375rem] font-semibold"
                                initial={{ opacity: 0, scale: 0, rotate: 20 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 300, damping: 14, delay: i * 0.08 }}
                                whileHover={{ scale: 1.15, y: -4, transition: { type: 'spring', stiffness: 400, damping: 12 } }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    {/* Feature badges */}
                    <div className="flex flex-wrap gap-2 justify-center mt-8">
                        {project.features.map((feature, i) => (
                            <motion.span
                                key={feature}
                                className="px-3 py-1.5 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-lg text-[0.8125rem] border border-[var(--border-color)]"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.3 + i * 0.05 }}
                            >
                                {feature}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════ */}
            {/* FINAL CTA                                    */}
            {/* ════════════════════════════════════════════ */}
            <section className="px-6 py-20 md:py-28">
                <div className="max-w-[640px] mx-auto text-center">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                    >
                        {(project.iconLight || project.iconDark) && (
                            <motion.div
                                className="inline-block mb-6"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                {project.iconLight && (
                                    <Image src={project.iconLight} alt={`${project.title} icon`} width={64} height={64} className="rounded-2xl shadow-lg dark:hidden" />
                                )}
                                {project.iconDark && (
                                    <Image src={project.iconDark} alt={`${project.title} icon`} width={64} height={64} className="rounded-2xl shadow-lg hidden dark:block" />
                                )}
                            </motion.div>
                        )}
                        <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold tracking-tight mb-4">
                            Ready to try {project.title}?
                        </h2>
                        <p className="text-[1rem] text-[var(--text-secondary)] mb-8 leading-relaxed">
                            Download {project.title} today and experience {project.subtitle.toLowerCase()}.
                        </p>

                        <div className="flex gap-3 flex-wrap justify-center">
                            {project.links.playStore && (
                                <motion.a
                                    href={project.links.playStore}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-white rounded-full text-[1rem] font-semibold no-underline shadow-lg"
                                    whileHover={{ scale: 1.08, y: -3 }}
                                    whileTap={{ scale: 0.94 }}
                                >
                                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zM15 12L7 7v10l8-5zm2-5l5.5 3.5a1.5 1.5 0 010 2.5L17 17V7z" /></svg>
                                    Download Now
                                </motion.a>
                            )}
                            {project.links.appStore && (
                                <motion.a
                                    href={project.links.appStore}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-[1rem] font-semibold no-underline"
                                    whileHover={{ scale: 1.08, y: -3 }}
                                    whileTap={{ scale: 0.94 }}
                                >
                                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                                    App Store
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════ */}
            {/* FOOTER                                       */}
            {/* ════════════════════════════════════════════ */}
            <footer className="px-6 py-8 border-t border-[var(--border-color)]">
                <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                        &copy; 2026 Mohammad Nabi Rahmani
                    </span>
                    <div className="flex gap-6">
                        {project.links.privacy && (
                            <Link href={project.links.privacy} className="text-[0.8125rem] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">
                                Privacy Policy
                            </Link>
                        )}
                        {project.links.terms && (
                            <Link href={project.links.terms} className="text-[0.8125rem] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">
                                Terms of Use
                            </Link>
                        )}
                        <Link href="/projects" className="text-[0.8125rem] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">
                            All Projects
                        </Link>
                    </div>
                </div>
            </footer>

            {/* ════════════════════════════════════════════ */}
            {/* SCREENSHOT LIGHTBOX                          */}
            {/* ════════════════════════════════════════════ */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={closeLightbox}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Close button */}
                        <motion.button
                            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            onClick={closeLightbox}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.button>

                        {/* Counter */}
                        <motion.div
                            className="absolute top-6 left-6 z-10 text-white/60 text-[0.875rem] font-medium"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: 0.15 }}
                        >
                            {lightboxIndex + 1} / {project.screenshots.length}
                        </motion.div>

                        {/* Previous button */}
                        {project.screenshots.length > 1 && (
                            <motion.button
                                className="absolute left-3 md:left-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.button>
                        )}

                        {/* Next button */}
                        {project.screenshots.length > 1 && (
                            <motion.button
                                className="absolute right-3 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.button>
                        )}

                        {/* Image */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={lightboxIndex}
                                className="relative z-10 max-h-[85vh] max-w-[90vw] md:max-w-[440px]"
                                initial={{ opacity: 0, scale: 0.7, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            >
                                <Image
                                    src={project.screenshots[lightboxIndex]}
                                    alt={`${project.title} screenshot ${lightboxIndex + 1}`}
                                    width={540}
                                    height={960}
                                    className="rounded-3xl shadow-2xl w-full h-auto max-h-[85vh] object-contain"
                                    sizes="(max-width: 768px) 90vw, 440px"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
