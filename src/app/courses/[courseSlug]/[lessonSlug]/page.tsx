'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { getLessonBySlug, getCourseNavigation } from '@/data/courses';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { VideoPlayer } from '@/components/courses/VideoPlayer';
import { LessonContent } from '@/components/courses/LessonContent';
import { ProgressBar } from '@/components/courses/ProgressBar';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { cn } from '@/lib/utils';

export default function LessonPage() {
  const params = useParams<{ courseSlug?: string | string[]; lessonSlug?: string | string[] }>();
  const courseSlug = Array.isArray(params.courseSlug)
    ? params.courseSlug[0]
    : params.courseSlug;
  const lessonSlug = Array.isArray(params.lessonSlug)
    ? params.lessonSlug[0]
    : params.lessonSlug;
  const data = courseSlug && lessonSlug ? getLessonBySlug(courseSlug, lessonSlug) : undefined;
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    completedLessons,
    isLessonComplete,
    toggleLessonComplete,
    setCurrentLesson,
    getCompletionPercentage,
  } = useCourseProgress(data?.course.id || '');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [lessonSlug]);

  useEffect(() => {
    if (data?.lesson.id) {
      setCurrentLesson(data.lesson.id);
    }
  }, [data?.lesson.id, setCurrentLesson]);

  if (!courseSlug || !lessonSlug) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--cream)] pt-14 text-[var(--muted)]">
        Loading…
      </div>
    );
  }

  if (!data) {
    notFound();
  }

  const { course, module, lesson } = data;
  const navigation = getCourseNavigation(course, lesson.id, completedLessons);
  const isComplete = isLessonComplete(lesson.id);

  return (
    <div className="flex min-h-screen bg-[var(--cream)] text-[var(--ink)] pt-14">
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <CourseSidebar
          course={course}
          currentLessonId={lesson.id}
          completedLessons={completedLessons}
        />
      )}

      {/* Sidebar - Mobile drawer */}
      {isMobile && (
        <CourseSidebar
          course={course}
          currentLessonId={lesson.id}
          completedLessons={completedLessons}
          isMobile
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--cream)] px-4 py-3 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            {isMobile && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open course menu"
                className="shrink-0 cursor-pointer rounded-full border border-[var(--line)] bg-transparent p-2 text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}

            <nav
              className="flex min-w-0 items-center gap-2 text-[0.875rem]"
              aria-label="Lesson breadcrumb"
            >
              <Link
                href={`/courses/${course.slug}`}
                className="truncate text-[var(--muted)] no-underline transition-colors hover:text-[var(--atelier-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              >
                {course.title}
              </Link>
              <span className="shrink-0 text-[var(--muted)]" aria-hidden>
                /
              </span>
              <span className="truncate font-medium text-[var(--ink)]">{module.title}</span>
            </nav>
          </div>

          <div className="w-[100px] shrink-0 sm:w-[150px]">
            <ProgressBar
              percentage={getCompletionPercentage(course.totalLessons)}
              size="sm"
              showLabel={false}
            />
          </div>
        </header>

        {/* Lesson body */}
        <div
          ref={contentRef}
          className="flex-1 overflow-auto px-4 py-6 pb-32 md:px-10 md:py-10 md:pb-36"
        >
          <div className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded border border-[var(--line)] bg-[var(--cream-2)] px-2.5 py-1 text-[0.75rem] capitalize text-[var(--muted)]">
                {lesson.type}
              </span>
              <span className="text-[0.875rem] text-[var(--muted)]">{lesson.duration} min</span>
              {lesson.isFree && (
                <span className="rounded bg-[var(--atelier-accent)] px-2.5 py-1 text-[0.75rem] font-medium text-[var(--cream)]">
                  Free preview
                </span>
              )}
            </div>
            <h1
              className="leading-tight text-[var(--ink)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              }}
            >
              {lesson.title}
            </h1>
            {lesson.description && (
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-[var(--ink-soft)]">
                {lesson.description}
              </p>
            )}
          </div>

          {(lesson.type === 'video' || lesson.type === 'mixed') && lesson.content.videoUrl && (
            <div className="mb-10">
              <VideoPlayer
                videoUrl={lesson.content.videoUrl}
                provider={lesson.content.videoProvider}
                title={lesson.title}
              />
            </div>
          )}

          {lesson.content.markdown && (
            <div className="max-w-[800px]">
              <LessonContent content={lesson.content.markdown} />
            </div>
          )}

          <div className="mt-12 border-t border-[var(--line)] pt-8">
            <button
              type="button"
              onClick={() => toggleLessonComplete(lesson.id)}
              className={cn(
                'inline-flex cursor-pointer items-center gap-3 rounded-full px-6 py-3.5 text-[1rem] font-medium transition-colors duration-200 motion-reduce:transition-none',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]',
                isComplete
                  ? 'border-none bg-emerald-500 text-white'
                  : 'border border-[var(--line)] bg-[var(--cream-2)] text-[var(--ink)] hover:border-[var(--atelier-accent)]/40',
              )}
            >
              {isComplete ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Completed
                </>
              ) : (
                <>
                  <span
                    className="inline-block h-5 w-5 rounded-full border-2 border-[var(--line)]"
                    aria-hidden
                  />
                  Mark as complete
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom lesson navigation — accounts for site top nav only (no mobile bottom bar) */}
        <nav
          className={cn(
            'fixed bottom-0 right-0 z-[200] flex items-center justify-between gap-3 border-t border-[var(--line)] bg-[var(--cream)] px-4 py-3 shadow-[0_-4px_16px_color-mix(in_srgb,var(--ink)_8%,transparent)] md:px-6',
            isMobile ? 'left-0' : 'left-[280px]',
          )}
          aria-label="Lesson navigation"
        >
          {navigation?.previousLesson ? (
            <button
              type="button"
              onClick={() => {
                router.push(
                  `/courses/${course.slug}/${navigation.previousLesson!.lesson.slug}`,
                );
              }}
              data-lenis-prevent
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--cream-2)] px-4 py-2.5 text-[0.875rem] font-medium text-[var(--ink)] transition-colors hover:border-[var(--atelier-accent)]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </button>
          ) : (
            <div className="w-10 sm:w-24" aria-hidden />
          )}

          <div className="text-center text-[0.8125rem] text-[var(--muted)]">
            {navigation?.progress.completedLessons} / {navigation?.progress.totalLessons} lessons
          </div>

          {navigation?.nextLesson ? (
            <button
              type="button"
              onClick={() => {
                router.push(`/courses/${course.slug}/${navigation.nextLesson!.lesson.slug}`);
              }}
              data-lenis-prevent
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-[0.9375rem] font-semibold text-[var(--cream)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              <span>Next</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                router.push(`/courses/${course.slug}`);
              }}
              data-lenis-prevent
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-[0.9375rem] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              <span>Finish</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}
