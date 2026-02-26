'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    },
};

const skillGroups = [
    {
        label: 'Mobile',
        icon: 'M15 2H9c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 18h-4v-1h4v1zm1-3H9V5h6v12z',
        skills: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'Hive', 'Firebase'],
    },
    {
        label: 'Backend',
        icon: 'M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
        skills: ['Supabase', 'PostgreSQL', 'Edge Functions', 'REST APIs'],
    },
    {
        label: 'Web',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
        skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
        label: 'Architecture',
        icon: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.24L19.17 7.5 12 10.76 4.83 7.5 12 4.24zM4 16.39V9.08l7 3.5v7.31l-7-3.5zm9 3.5v-7.31l7-3.5v7.31l-7 3.5z',
        skills: ['Clean Architecture', 'Offline-First', 'State Management'],
    },
    {
        label: 'DevOps & Tools',
        icon: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z',
        skills: ['Git', 'GitHub Actions', 'CI/CD', 'Figma', 'VS Code'],
    },
    {
        label: 'Quality',
        icon: 'M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z',
        skills: ['Unit Testing', 'Widget Testing', 'Golden Tests', 'Performance Profiling'],
    },
];

const experiences = [
    {
        role: 'Flutter Developer',
        company: 'Freelance & Published Apps',
        description:
            'Built and published Focus Flow (iOS) and Dev Discipline (Android). Clean Architecture with Riverpod state management, offline-first data sync via Drift and Supabase, and RevenueCat monetization integration.',
        highlights: ['App Store', 'Google Play', 'RevenueCat', 'Offline-First'],
    },
    {
        role: 'Full-Stack Web Developer',
        company: 'Portfolio & Course Platform',
        description:
            'Built this portfolio site with Next.js 15, React 19, TypeScript, and Tailwind CSS. Includes a blog, course platform with video lessons, and project showcases.',
        highlights: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
    },
];

const values = [
    {
        title: 'Ship Fast',
        description: 'From idea to production quickly. I believe in launching, learning, and iterating.',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
        title: 'Build Offline-First',
        description: 'Apps should work everywhere — even without internet. Reliability is not optional.',
        icon: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    },
    {
        title: 'Clean Code',
        description: 'Maintainable, testable, scalable. Architecture matters as much as the UI.',
        icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    },
];

const socials = [
    { href: 'https://github.com/Nabi-Rahmani', label: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
    { href: 'https://www.linkedin.com/in/muhammad-nabi-rahmani-%F0%9F%87%B5%F0%9F%87%B8-8945b21ba/', label: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { href: 'https://x.com/nabirahmani_dev', label: 'Twitter/X', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
];

export default function About() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            {/* Hero Section */}
            <section className="hero-grid">
                <div className="relative z-10 pt-28 md:pt-36 pb-20 md:pb-28 px-6">
                    <div className="max-w-[900px] mx-auto">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">
                            {/* Profile Photo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                                className="shrink-0"
                            >
                                <div className="relative">
                                    {/* Glow ring */}
                                    <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-[var(--accent)] via-[var(--accent-hover)] to-[var(--accent)] opacity-20 blur-md" />
                                    <div className="relative w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-2xl overflow-hidden border-2 border-[var(--accent)]/20">
                                        <Image
                                            src="/assets/branding/profile.jpg"
                                            alt="Nabi Rahmani - Flutter Developer"
                                            fill
                                            className="object-cover"
                                            sizes="170px"
                                            priority
                                        />
                                    </div>
                                    {/* Status dot */}
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-[var(--bg-primary)]" />
                                </div>
                            </motion.div>

                            {/* Intro Text */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                className="text-center md:text-left flex-1"
                            >
                                <motion.p
                                    custom={0}
                                    variants={fadeUp}
                                    className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3"
                                >
                                    About Me
                                </motion.p>
                                <motion.h1
                                    custom={1}
                                    variants={fadeUp}
                                    className="text-[2.25rem] md:text-[3rem] font-bold tracking-tight leading-[1.1] text-[var(--text-primary)] mb-4"
                                >
                                    I build apps people{' '}
                                    <span className="text-[var(--accent)]">actually use</span>
                                </motion.h1>
                                <motion.p
                                    custom={2}
                                    variants={fadeUp}
                                    className="text-[1.0625rem] md:text-[1.125rem] text-[var(--text-secondary)] leading-relaxed max-w-[520px]"
                                >
                                    Flutter developer from Afghanistan, based in Turkey. I ship polished mobile apps
                                    from idea to App Store &mdash; fast, reliable, and built to last.
                                </motion.p>

                                {/* Quick stats */}
                                <motion.div
                                    custom={3}
                                    variants={fadeUp}
                                    className="flex flex-wrap justify-center md:justify-start gap-6 mt-6"
                                >
                                    {[
                                        { value: '3+', label: 'Years' },
                                        { value: '2', label: 'Published Apps' },
                                        { value: '2', label: 'Platforms' },
                                    ].map((stat) => (
                                        <div key={stat.label} className="text-center md:text-left">
                                            <p className="text-[1.5rem] font-bold text-[var(--text-primary)] leading-none">
                                                {stat.value}
                                            </p>
                                            <p className="text-[0.75rem] text-[var(--text-secondary)] mt-1">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[900px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start"
                    >
                        {/* Left - Section header */}
                        <motion.div custom={0} variants={fadeUp}>
                            <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
                                My Story
                            </p>
                            <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold text-[var(--text-primary)] tracking-tight leading-tight">
                                From Mazar-i-Sharif to building apps for the world
                            </h2>
                        </motion.div>

                        {/* Right - Story text */}
                        <motion.div custom={1} variants={fadeUp} className="space-y-5">
                            <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8]">
                                I&apos;m Nabi Rahmani, a Flutter developer from Mazar-i-Sharif, Afghanistan, now
                                based in Ankara, Turkey. I specialize in building and shipping mobile apps fast
                                &mdash; from idea to the App Store and Google Play &mdash; with Flutter and Dart.
                            </p>
                            <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8]">
                                I focus on clean architecture, offline-first reliability, and polished UI. I build
                                with Riverpod, Drift, and Supabase to create apps that work seamlessly online or
                                off, with maintainable codebases that scale.
                            </p>

                            {/* Accent quote */}
                            <div className="border-l-[3px] border-[var(--accent)] pl-5 py-1">
                                <p className="text-[1.0625rem] text-[var(--text-primary)] leading-[1.7] italic">
                                    &ldquo;I don&apos;t just write code &mdash; I ship products that solve real problems
                                    and work everywhere.&rdquo;
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* What Drives Me */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[900px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
                            Philosophy
                        </p>
                        <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold text-[var(--text-primary)] tracking-tight">
                            What drives me
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5"
                    >
                        {values.map((value) => (
                            <motion.div
                                key={value.title}
                                variants={staggerItem}
                                className="group relative rounded-2xl border border-[var(--border-color)] p-7 transition-all duration-300 hover:border-[var(--accent)]/20"
                            >
                                {/* Top accent line */}
                                <div className="absolute top-0 left-6 right-6 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />

                                <div className="w-10 h-10 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center mb-5">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-[var(--accent)]">
                                        <path d={value.icon} fill="currentColor" />
                                    </svg>
                                </div>
                                <h3 className="text-[1.0625rem] font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">
                                    {value.title}
                                </h3>
                                <p className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[900px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
                            Toolkit
                        </p>
                        <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold text-[var(--text-primary)] tracking-tight">
                            Skills & Technologies
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                        {skillGroups.map((group) => (
                            <motion.div
                                key={group.label}
                                variants={staggerItem}
                                className="group rounded-2xl border border-[var(--border-color)] p-6 transition-all duration-300 hover:border-[var(--accent)]/20"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-9 h-9 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-[var(--accent)]">
                                            <path d={group.icon} fill="currentColor" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[0.9375rem] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                                        {group.label}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 bg-[var(--accent-muted)] text-[var(--text-secondary)] rounded-lg text-[0.8125rem] font-medium transition-colors duration-200 hover:text-[var(--accent)]"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Experience */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[900px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
                            Experience
                        </p>
                        <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold text-[var(--text-primary)] tracking-tight">
                            What I&apos;ve built
                        </h2>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-[var(--border-color)] hidden md:block" />

                        <div className="space-y-8">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={exp.role}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                    className="relative md:pl-14"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-[11px] top-7 w-[18px] h-[18px] rounded-full border-[3px] border-[var(--accent)] bg-[var(--bg-primary)] hidden md:block z-10" />

                                    <div className="group rounded-2xl border border-[var(--border-color)] p-7 md:p-8 transition-all duration-300 hover:border-[var(--accent)]/20">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
                                            <div>
                                                <h3 className="text-[1.125rem] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                                                    {exp.role}
                                                </h3>
                                                <p className="text-[0.875rem] text-[var(--accent)] font-medium">
                                                    {exp.company}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed mb-5">
                                            {exp.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.highlights.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-[var(--accent-muted)] text-[var(--accent)] rounded-lg text-[0.75rem] font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA / Connect */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[600px] mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
                            Get In Touch
                        </p>
                        <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold text-[var(--text-primary)] tracking-tight mb-5">
                            Let&apos;s build something together
                        </h2>
                        <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed mb-8">
                            Interested in working together, have a project idea, or just want to chat about Flutter?
                            I&apos;d love to hear from you.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <a
                                href="mailto:codewithnabi@gmail.com"
                                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-[0.9375rem] font-medium no-underline hover:opacity-90 transition-opacity"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                codewithnabi@gmail.com
                            </a>
                            <Link
                                href="/#projects"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[0.9375rem] font-medium no-underline hover:border-[var(--text-secondary)] transition-all duration-200"
                            >
                                View My Work
                                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>

                        {/* Social links */}
                        <div className="flex gap-3 justify-center">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent-muted)] transition-all duration-200 no-underline"
                                    title={social.label}
                                    aria-label={social.label}
                                >
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
