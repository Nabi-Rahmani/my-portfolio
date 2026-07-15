'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { getCourseBySlug, formatDuration, getFirstLesson, getAllLessons } from '@/data/courses';

export default function CourseOverviewPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const params = useParams<{ courseSlug?: string | string[] }>();
  const courseSlug = Array.isArray(params.courseSlug)
    ? params.courseSlug[0]
    : params.courseSlug;
  const course = courseSlug ? getCourseBySlug(courseSlug) : undefined;

  useEffect(() => {
    try {
      const stored = localStorage.getItem('course_progress');
      if (stored && course) {
        const parsed = JSON.parse(stored);
        if (parsed[course.id]) {
          setCompletedLessons(parsed[course.id].completedLessons || []);
        }
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
  }, [course]);

  // Expand first module with incomplete lessons by default
  useEffect(() => {
    if (course && expandedModules.size === 0) {
      const firstIncomplete = course.modules.find((m) =>
        m.lessons.some((l) => !completedLessons.includes(l.id))
      );
      if (firstIncomplete) {
        setExpandedModules(new Set([firstIncomplete.id]));
      } else if (course.modules.length > 0) {
        setExpandedModules(new Set([course.modules[0].id]));
      }
    }
  }, [course, completedLessons, expandedModules.size]);

  if (!courseSlug) {
    return (
      <div className="min-h-screen bg-[var(--cream)] pt-28 grid place-items-center text-[var(--muted)]">
        Loading...
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  const firstLesson = getFirstLesson(course);
  const allLessons = getAllLessons(course);
  const progress = Math.round((completedLessons.length / allLessons.length) * 100);
  const hasStarted = completedLessons.length > 0;
  const currentLesson = allLessons.find((l) => !completedLessons.includes(l.id)) || firstLesson;

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const totalHours = Math.floor(course.totalDuration / 60);
  const totalMinutes = course.totalDuration % 60;

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--atelier-accent)] text-sm transition-colors mb-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All courses
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
            {/* Left: Course Info */}
            <div>
              {/* Badges */}
              <motion.div
                className="flex flex-wrap items-center gap-2.5 mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 0.05 }}
              >
                <span className="px-3 py-1 rounded-full bg-[var(--atelier-accent)] text-[var(--cream)] text-xs font-semibold uppercase tracking-wider">
                  {course.difficulty}
                </span>
                {course.price === 'free' && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-500/20">
                    Free
                  </span>
                )}
              </motion.div>

              {/* Title */}
              <motion.h1
                className="tracking-tight leading-[1.1] text-[var(--ink)] mb-5"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
              >
                {course.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-base md:text-lg text-[var(--ink-soft)] leading-relaxed mb-8 max-w-[640px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.15 }}
              >
                {course.description}
              </motion.p>

              {/* Stats Row */}
              <motion.div
                className="flex flex-wrap items-center gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                  <span className="text-sm font-medium">{course.modules.length} Modules</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
                    <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20" />
                  </svg>
                  <span className="text-sm font-medium">{course.totalLessons} Lessons</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span className="text-sm font-medium">
                    {totalHours > 0 ? `${totalHours}h ` : ''}{totalMinutes > 0 ? `${totalMinutes}m` : ''}
                  </span>
                </div>
              </motion.div>

              {/* Progress (if started) */}
              {hasStarted && (
                <motion.div
                  className="mb-8 max-w-[320px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[var(--muted)]">Your progress</span>
                    <span className="text-xs font-bold text-[var(--atelier-accent)]">{progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--cream-2)] border border-[var(--line)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--atelier-accent)] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1.5">
                    {completedLessons.length} of {allLessons.length} lessons completed
                  </p>
                </motion.div>
              )}

              {/* CTA + Instructor Row */}
              <motion.div
                className="flex flex-wrap items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.3 }}
              >
                <Link
                  href={`/courses/${course.slug}/${currentLesson?.slug || firstLesson?.slug}`}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[var(--ink)] hover:opacity-90 text-[var(--cream)] rounded-full text-[0.9375rem] font-semibold transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  {hasStarted ? 'Continue learning' : 'Start course'}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <div className="flex items-center gap-3">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover ring-2 ring-[var(--line)]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">{course.instructor.name}</p>
                    <p className="text-xs text-[var(--muted)]">Instructor</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Cover Image Card */}
            <motion.div
              className="relative w-full rounded-2xl overflow-hidden border border-[var(--line)] shadow-[var(--shadow-lg)] hidden lg:block"
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.2 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={course.coverImage}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Quick info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex flex-wrap gap-2">
                  {course.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-[0.6875rem] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 4 && (
                    <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-[0.6875rem] font-medium">
                      +{course.tags.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Mobile Cover Image */}
            <motion.div
              className="relative w-full rounded-2xl overflow-hidden border border-[var(--line)] lg:hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.2 }}
            >
              <div className="aspect-[16/9] relative">
                <Image
                  src={course.coverImage}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          >
            <h2
              className="text-[var(--ink)] mb-3"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              What you&apos;ll learn
            </h2>
            <p className="text-[var(--muted)] mb-10 max-w-[600px]">
              This course covers everything you need to take a Flutter app from development to production.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.tags.map((tag, i) => (
              <motion.div
                key={tag}
                className="flex items-start gap-3 p-4 rounded-xl border border-[var(--line)] bg-[var(--cream-2)]/40"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ type: 'spring', stiffness: 100, damping: 18, delay: i * 0.03 }}
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--atelier-accent)" strokeWidth="2" aria-hidden>
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[var(--ink)]">{tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Content / Curriculum */}
      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          >
            <div>
              <h2
                className="text-[var(--ink)] mb-1"
                style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                Course content
              </h2>
              <p className="text-sm text-[var(--muted)]">
                {course.modules.length} modules &middot; {course.totalLessons} lessons &middot; {formatDuration(course.totalDuration)} total
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (expandedModules.size === course.modules.length) {
                  setExpandedModules(new Set());
                } else {
                  setExpandedModules(new Set(course.modules.map((m) => m.id)));
                }
              }}
              className="text-xs font-medium text-[var(--atelier-accent)] hover:underline hidden sm:block cursor-pointer bg-transparent border-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              {expandedModules.size === course.modules.length ? 'Collapse all' : 'Expand all'}
            </button>
          </motion.div>

          {/* Modules Accordion */}
          <div className="flex flex-col gap-3">
            {course.modules
              .sort((a, b) => a.order - b.order)
              .map((module, moduleIndex) => {
                const moduleLessons = module.lessons;
                const completedInModule = moduleLessons.filter((l) =>
                  completedLessons.includes(l.id)
                ).length;
                const moduleProgress = Math.round(
                  (completedInModule / moduleLessons.length) * 100
                );
                const isExpanded = expandedModules.has(module.id);
                const isModuleComplete = completedInModule === moduleLessons.length && moduleLessons.length > 0;

                return (
                  <motion.div
                    key={module.id}
                    className="rounded-xl border border-[var(--line)] overflow-hidden bg-[var(--cream)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ type: 'spring', stiffness: 100, damping: 18, delay: moduleIndex * 0.03 }}
                  >
                    {/* Module Header (clickable) */}
                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-[var(--accent-soft)]/50 transition-colors cursor-pointer bg-transparent border-none"
                    >
                      {/* Module number / check */}
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                        isModuleComplete
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-[var(--accent-soft)] text-[var(--atelier-accent)]'
                      }`}>
                        {isModuleComplete ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <span>{module.order}</span>
                        )}
                      </div>

                      {/* Module title + meta */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[0.9375rem] font-semibold text-[var(--ink)] truncate">
                          {module.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-[var(--muted)]">
                            {moduleLessons.length} lessons
                          </span>
                          <span className="text-xs text-[var(--muted)]">
                            {formatDuration(moduleLessons.reduce((sum, l) => sum + l.duration, 0))}
                          </span>
                          {completedInModule > 0 && (
                            <span className="text-xs text-[var(--atelier-accent)] font-medium">
                              {completedInModule}/{moduleLessons.length}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress mini bar */}
                      {completedInModule > 0 && !isModuleComplete && (
                        <div className="w-12 h-1.5 rounded-full bg-[var(--cream-2)] overflow-hidden hidden sm:block">
                          <div
                            className="h-full rounded-full bg-[var(--atelier-accent)]"
                            style={{ width: `${moduleProgress}%` }}
                          />
                        </div>
                      )}

                      {/* Chevron */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--muted)"
                        strokeWidth="2"
                        className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        aria-hidden
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Lessons List (collapsible) */}
                    {isExpanded && (
                      <div className="border-t border-[var(--line)]">
                        {moduleLessons
                          .sort((a, b) => a.order - b.order)
                          .map((lesson, index) => {
                            const isCompleted = completedLessons.includes(lesson.id);
                            return (
                              <Link
                                key={lesson.id}
                                href={`/courses/${course.slug}/${lesson.slug}`}
                                className={`flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[var(--accent-soft)]/40 group no-underline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--atelier-accent)] ${
                                  index < moduleLessons.length - 1 ? 'border-b border-[var(--line)]' : ''
                                }`}
                              >
                                {/* Lesson number / completion */}
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  isCompleted
                                    ? 'bg-emerald-500 text-white'
                                    : 'border-2 border-[var(--line)]'
                                }`}>
                                  {isCompleted ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  ) : (
                                    <span className="text-[0.625rem] font-medium text-[var(--muted)]">
                                      {lesson.order + 1}
                                    </span>
                                  )}
                                </div>

                                {/* Lesson info */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-[var(--ink)] group-hover:text-[var(--atelier-accent)] transition-colors truncate">
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-2.5 mt-0.5">
                                    <span className="text-xs text-[var(--muted)]">
                                      {formatDuration(lesson.duration)}
                                    </span>
                                    {lesson.type === 'video' && (
                                      <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                          <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                        Video
                                      </span>
                                    )}
                                    {lesson.isFree && (
                                      <span className="px-1.5 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--atelier-accent)] text-[0.625rem] font-semibold uppercase">
                                        Free
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Arrow */}
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="var(--muted)"
                                  strokeWidth="2"
                                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  aria-hidden
                                >
                                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </Link>
                            );
                          })}
                      </div>
                    )}
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-[700px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          >
            <h2
              className="text-[var(--ink)] mb-4"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Ready to ship your Flutter app?
            </h2>
            <p className="text-[var(--muted)] mb-8 max-w-[500px] mx-auto">
              Start learning now and take your Flutter app from development to production with confidence.
            </p>
            <Link
              href={`/courses/${course.slug}/${currentLesson?.slug || firstLesson?.slug}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--ink)] hover:opacity-90 text-[var(--cream)] rounded-full text-base font-semibold transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              {hasStarted ? 'Continue where you left off' : 'Start learning for free'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
