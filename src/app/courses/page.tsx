'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { courses, formatDuration, getFirstLesson } from '@/data/courses';

export default function CoursesPage() {
    const course = courses[0];
    const firstLesson = course ? getFirstLesson(course) : undefined;

    return (
        <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            {/* Hero */}
            <section className="hero-grid relative pt-32 md:pt-44 pb-16 md:pb-24 px-6">
                <div className="max-w-[800px] mx-auto text-center relative z-10">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-muted)] mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        <span className="text-[0.8125rem] font-medium text-[var(--accent)]">{course.modules.length} Modules &middot; {course.totalLessons} Lessons</span>
                    </motion.div>

                    <motion.h1
                        className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 }}
                    >
                        Courses
                    </motion.h1>

                    <motion.p
                        className="text-[1rem] md:text-[1.125rem] text-[var(--text-secondary)] leading-relaxed max-w-[560px] mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}
                    >
                        In-depth courses on Flutter development and shipping production apps.
                    </motion.p>
                </div>
            </section>

            {/* Course Card */}
            <section className="px-6 pb-20 md:pb-32">
                <div className="max-w-[900px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 16, delay: 0.3 }}
                    >
                        <Link
                            href={`/courses/${course.slug}`}
                            className="block no-underline group"
                        >
                            {/* Cover image */}
                            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-6 border border-[var(--border-color)]">
                                <Image
                                    src={course.coverImage}
                                    alt={course.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent)] text-white text-[0.75rem] font-semibold mb-3 uppercase tracking-wider">
                                        {course.difficulty}
                                    </span>
                                    <h2 className="text-white text-[1.5rem] md:text-[2rem] font-bold tracking-tight">
                                        {course.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-[0.8125rem] text-[var(--text-secondary)]">
                                <span className="flex items-center gap-1.5">
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                    {formatDuration(course.totalDuration)}
                                </span>
                                <span>&middot;</span>
                                <span>{course.modules.length} modules</span>
                                <span>&middot;</span>
                                <span>{course.totalLessons} lessons</span>
                                <span>&middot;</span>
                                <span className="text-[var(--accent)] font-semibold uppercase">
                                    {course.price === 'free' ? 'Free' : `$${course.price}`}
                                </span>
                            </div>

                            <p className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed mb-6 max-w-[700px]">
                                {course.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {course.tags.slice(0, 6).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] text-[0.75rem] font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            {firstLesson && (
                                <span className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-full text-[0.9375rem] font-semibold group-hover:bg-[var(--accent-hover)] transition-colors">
                                    Start Learning
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            )}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
