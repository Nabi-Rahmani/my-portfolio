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
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset scroll position when lesson changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [lessonSlug]);

  // Set current lesson on mount
  useEffect(() => {
    if (data?.lesson.id) {
      setCurrentLesson(data.lesson.id);
    }
  }, [data?.lesson.id, setCurrentLesson]);

  if (!courseSlug || !lessonSlug) {
    return (
      <main
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-primary)',
          paddingTop: '80px',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--text-secondary)',
        }}
      >
        Loading…
      </main>
    );
  }

  if (!data) {
    notFound();
  }

  const { course, module, lesson } = data;
  const navigation = getCourseNavigation(course, lesson.id, completedLessons);
  const isComplete = isLessonComplete(lesson.id);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        marginTop: '70px', // Space for main navigation
      }}
    >
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <CourseSidebar
          course={course}
          currentLessonId={lesson.id}
          completedLessons={completedLessons}
        />
      )}

      {/* Sidebar - Mobile */}
      {isMobile && (
        <CourseSidebar
          course={course}
          currentLessonId={lesson.id}
          completedLessons={completedLessons}
          isMobile={true}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Bar */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px',
            backgroundColor: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}

            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
              <Link
                href={`/courses/${course.slug}`}
                style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              >
                {course.title}
              </Link>
              <span style={{ color: 'var(--text-secondary)' }}>/</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                {module.title}
              </span>
            </nav>
          </div>

          {/* Progress */}
          <div style={{ width: '150px' }}>
            <ProgressBar
              percentage={getCompletionPercentage(course.totalLessons)}
              size="sm"
              showLabel={false}
            />
          </div>
        </header>

        {/* Lesson Content */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflow: 'auto',
            padding: isMobile ? '24px 16px' : '40px 60px',
            paddingBottom: '150px', // Space for bottom nav
          }}
        >
          {/* Lesson Header */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
              }}
            >
              <span
                style={{
                  padding: '4px 10px',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  textTransform: 'capitalize',
                }}
              >
                {lesson.type}
              </span>
              <span
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                }}
              >
                {lesson.duration} min
              </span>
              {lesson.isFree && (
                <span
                  style={{
                    padding: '4px 10px',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  FREE PREVIEW
                </span>
              )}
            </div>
            <h1
              style={{
                fontSize: isMobile ? '1.75rem' : '2.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
              }}
            >
              {lesson.title}
            </h1>
            {lesson.description && (
              <p
                style={{
                  marginTop: '12px',
                  fontSize: '1.125rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {lesson.description}
              </p>
            )}
          </div>

          {/* Video Player */}
          {(lesson.type === 'video' || lesson.type === 'mixed') && lesson.content.videoUrl && (
            <div style={{ marginBottom: '40px' }}>
              <VideoPlayer
                videoUrl={lesson.content.videoUrl}
                provider={lesson.content.videoProvider}
                title={lesson.title}
              />
            </div>
          )}

          {/* Markdown Content */}
          {lesson.content.markdown && (
            <div
              style={{
                maxWidth: '800px',
              }}
            >
              <LessonContent content={lesson.content.markdown} />
            </div>
          )}

          {/* Mark Complete Button */}
          <div
            style={{
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <button
              onClick={() => toggleLessonComplete(lesson.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 28px',
                backgroundColor: isComplete ? '#10b981' : 'var(--bg-secondary)',
                color: isComplete ? 'white' : 'var(--text-primary)',
                border: isComplete ? 'none' : '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
            >
              {isComplete ? (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Completed
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '2px solid var(--border-color)',
                    }}
                  />
                  Mark as Complete
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Navigation - Previous/Next */}
        <nav
          style={{
            position: 'fixed',
            bottom: isMobile ? '100px' : '0',
            left: isMobile ? '0' : '280px',
            right: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            backgroundColor: 'var(--bg-primary)',
            borderTop: '2px solid var(--border-color)',
            zIndex: 200,
            boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {/* Previous */}
          {navigation?.previousLesson ? (
            <button
              onClick={() => {
                router.push(`/courses/${course.slug}/${navigation.previousLesson!.lesson.slug}`);
              }}
              data-lenis-prevent
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 500,
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Previous</span>
            </button>
          ) : (
            <div style={{ width: '100px' }} />
          )}

          {/* Progress Info */}
          <div
            style={{
              textAlign: 'center',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
            }}
          >
            {navigation?.progress.completedLessons} / {navigation?.progress.totalLessons} lessons
          </div>

          {/* Next */}
          {navigation?.nextLesson ? (
            <button
              onClick={() => {
                router.push(`/courses/${course.slug}/${navigation.nextLesson!.lesson.slug}`);
              }}
              data-lenis-prevent
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: 'var(--accent-primary)',
                color: 'white',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span>Next Lesson</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => {
                router.push(`/courses/${course.slug}`);
              }}
              data-lenis-prevent
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#10b981',
                color: 'white',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span>Finish Course</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
          )}
        </nav>
      </main>
    </div>
  );
}
