'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Footer from '@/components/Footer';
import { courses, formatDuration, getFirstLesson } from '@/data/courses';
import { atelierEase, selectTransition } from '@/lib/animations';

export default function CoursesPage() {
  const course = courses[0];
  const firstLesson = course ? getFirstLesson(course) : undefined;
  const reduceMotion = useReducedMotion();

  const enter = (delay = 0) =>
    selectTransition(reduceMotion, {
      duration: 0.5,
      delay,
      ease: atelierEase,
    });

  if (!course) {
    return (
      <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] pt-28 grid place-items-center">
        <p className="text-[var(--muted)]">No courses available yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <section className="px-6 md:px-12 pt-28 md:pt-36 pb-12 md:pb-16" aria-label="Courses introduction">
        <div className="max-w-[900px] mx-auto">
          <motion.p
            className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0)}
          >
            [ Courses ]
          </motion.p>
          <motion.h1
            className="leading-tight tracking-tight text-[var(--ink)] mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            }}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0.08)}
          >
            Learn Flutter in depth
          </motion.h1>
          <motion.p
            className="text-[1rem] text-[var(--ink-soft)] leading-relaxed max-w-[560px]"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0.16)}
          >
            In-depth courses on Flutter development and shipping production apps.
            {' '}
            <span className="text-[var(--muted)]">
              {course.modules.length} modules · {course.totalLessons} lessons
            </span>
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 md:pb-28" aria-label="Available courses">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0.22)}
          >
            <Link
              href={`/courses/${course.slug}`}
              className="block no-underline group rounded-3xl overflow-hidden border border-[var(--line)] bg-[var(--cream-2)]/40 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              <div className="relative aspect-[21/9] overflow-hidden">
                <Image
                  src={course.coverImage}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  sizes="(max-width: 900px) 100vw, 900px"
                  priority
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                  <span className="inline-block px-3 py-1 rounded-full bg-[var(--atelier-accent)] text-[var(--cream)] text-[0.75rem] font-semibold mb-3 uppercase tracking-wider">
                    {course.difficulty}
                  </span>
                  <h2
                    className="text-white text-[1.5rem] md:text-[2rem] font-bold tracking-tight leading-tight"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {course.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4 text-[0.8125rem] text-[var(--muted)]">
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {formatDuration(course.totalDuration)}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{course.modules.length} modules</span>
                  <span aria-hidden>·</span>
                  <span>{course.totalLessons} lessons</span>
                  <span aria-hidden>·</span>
                  <span className="text-[var(--atelier-accent)] font-semibold uppercase">
                    {course.price === 'free' ? 'Free' : `$${course.price}`}
                  </span>
                </div>

                <p className="text-[0.9375rem] text-[var(--ink-soft)] leading-relaxed mb-6 max-w-[700px]">
                  {course.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {course.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--cream)] text-[var(--ink-soft)] text-[0.75rem] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {firstLesson && (
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ink)] text-[var(--cream)] rounded-full text-[0.9375rem] font-semibold group-hover:opacity-90 transition-opacity">
                    Start learning
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
