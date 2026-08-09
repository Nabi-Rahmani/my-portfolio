import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';
import { courses, formatDuration, getFirstLesson } from '@/data/courses';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <header className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-7 py-14 sm:gap-8 sm:py-22 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:py-26">
            <div>
              <p className="eyebrow">Learn</p>
              <h1 className="display-page mt-6 max-w-[11ch]">Ship Flutter with fewer surprises.</h1>
            </div>
            <p className="max-w-[58ch] text-[1rem] leading-8 text-[var(--text-muted)]">
              Free, practical learning paths built from the same release systems used in my
              products: flavors, observability, store delivery, automation, and maintenance.
            </p>
          </div>
        </header>

        <section className="site-container py-14 sm:py-22 lg:py-28" aria-label="Available courses">
          {courses.length === 0 ? (
            <div className="editorial-card px-6 py-16 text-center text-[var(--text-muted)]">No courses available yet.</div>
          ) : (
            <div className="grid gap-6">
              {courses.map((course) => {
                const firstLesson = getFirstLesson(course);
                const courseHref = firstLesson
                  ? `/courses/${course.slug}/${firstLesson.slug}`
                  : `/courses/${course.slug}`;

                return (
                  <article key={course.slug} className="editorial-card grid overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
                    <Link href={`/courses/${course.slug}`} className="relative min-h-[280px] overflow-hidden border-b border-[var(--line-16)] no-underline lg:min-h-[520px] lg:border-b-0 lg:border-r">
                      <Image src={course.coverImage} alt={course.title} fill className="object-cover transition-transform duration-500 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100" sizes="(max-width: 1024px) 100vw, 55vw" priority />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/75">{course.difficulty} · {course.price === 'free' ? 'Free' : `$${course.price}`}</p>
                        <h2 className="mt-3 text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-none tracking-[-0.045em]">{course.title}</h2>
                      </div>
                    </Link>

                    <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                      <p className="eyebrow text-[var(--accent)]">Complete release course</p>
                      <h2 className="mt-5 text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-none tracking-[-0.05em]">From starter project to store release.</h2>
                      <p className="mt-6 max-w-[58ch] text-sm leading-7 text-[var(--text-muted)]">{course.excerpt}</p>

                      <dl className="mt-8 grid grid-cols-3 border-y border-[var(--line-16)] py-5">
                        <div>
                          <dt className="meta-label">Modules</dt>
                          <dd className="mt-2 text-lg font-semibold">{course.modules.length}</dd>
                        </div>
                        <div>
                          <dt className="meta-label">Lessons</dt>
                          <dd className="mt-2 text-lg font-semibold">{course.totalLessons}</dd>
                        </div>
                        <div>
                          <dt className="meta-label">Length</dt>
                          <dd className="mt-2 text-lg font-semibold">{formatDuration(course.totalDuration)}</dd>
                        </div>
                      </dl>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href={courseHref} className="button-primary w-full sm:w-auto">Start learning</Link>
                        <Link href={`/courses/${course.slug}`} className="button-secondary w-full sm:w-auto">View curriculum</Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
