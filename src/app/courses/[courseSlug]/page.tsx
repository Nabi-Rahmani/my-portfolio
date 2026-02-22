'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getCourseBySlug, formatDuration, getFirstLesson, getAllLessons } from '@/data/courses';
import { ProgressBar } from '@/components/courses/ProgressBar';

export default function CourseOverviewPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const params = useParams<{ courseSlug?: string | string[] }>();
  const courseSlug = Array.isArray(params.courseSlug)
    ? params.courseSlug[0]
    : params.courseSlug;
  const course = courseSlug ? getCourseBySlug(courseSlug) : undefined;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Load saved progress
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

    return () => window.removeEventListener('resize', checkMobile);
  }, [course]);

  if (!courseSlug) {
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

  if (!course) {
    notFound();
  }

  const firstLesson = getFirstLesson(course);
  const allLessons = getAllLessons(course);
  const progress = Math.round((completedLessons.length / allLessons.length) * 100);
  const hasStarted = completedLessons.length > 0;

  // Find current lesson (first incomplete or first lesson)
  const currentLesson = allLessons.find((l) => !completedLessons.includes(l.id)) || firstLesson;

  const difficultyColors = {
    beginner: { bg: '#dcfce7', text: '#166534' },
    intermediate: { bg: '#fef3c7', text: '#92400e' },
    advanced: { bg: '#fee2e2', text: '#991b1b' },
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        paddingTop: '80px',
        paddingBottom: isMobile ? '100px' : '60px',
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '40px 24px' : '60px 24px',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Course Info */}
          <div>
            <Link
              href="/courses"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                marginBottom: '20px',
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
              All Courses
            </Link>

            <h1
              style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '16px',
                lineHeight: 1.2,
              }}
            >
              {course.title}
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              {course.description}
            </p>

            {/* Badges */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '24px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  padding: '6px 12px',
                  backgroundColor: difficultyColors[course.difficulty].bg,
                  color: difficultyColors[course.difficulty].text,
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                }}
              >
                {course.difficulty}
              </span>
              <span
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-secondary)',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  border: '1px solid var(--border-color)',
                }}
              >
                {course.totalLessons} lessons
              </span>
              <span
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-secondary)',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  border: '1px solid var(--border-color)',
                }}
              >
                {formatDuration(course.totalDuration)}
              </span>
              {course.price === 'free' && (
                <span
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  FREE
                </span>
              )}
            </div>

            {/* Instructor */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                width={48}
                height={48}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  {course.instructor.name}
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Instructor
                </div>
              </div>
            </div>

            {/* Progress */}
            {hasStarted && (
              <div style={{ marginBottom: '24px', maxWidth: '300px' }}>
                <ProgressBar percentage={progress} label="Your Progress" />
              </div>
            )}

            {/* CTA Button */}
            <Link
              href={`/courses/${course.slug}/${currentLesson?.slug || firstLesson?.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'var(--accent)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'opacity 0.2s',
              }}
            >
              {hasStarted ? 'Continue Learning' : 'Start Course'}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Cover Image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            <Image
              src={course.coverImage}
              alt={course.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '60px 24px',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '32px',
          }}
        >
          Course Content
        </h2>

        {/* Modules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {course.modules
            .sort((a, b) => a.order - b.order)
            .map((module) => {
              const moduleLessons = module.lessons;
              const completedInModule = moduleLessons.filter((l) =>
                completedLessons.includes(l.id)
              ).length;
              const moduleProgress = Math.round(
                (completedInModule / moduleLessons.length) * 100
              );

              return (
                <div
                  key={module.id}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Module Header */}
                  <div
                    style={{
                      padding: '20px 24px',
                      borderBottom: '1px solid var(--border-color)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {module.title}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {completedInModule}/{moduleLessons.length} completed
                      </span>
                    </div>
                    {module.description && (
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          marginBottom: '12px',
                        }}
                      >
                        {module.description}
                      </p>
                    )}
                    <ProgressBar percentage={moduleProgress} size="sm" showLabel={false} />
                  </div>

                  {/* Lessons List */}
                  <div>
                    {moduleLessons
                      .sort((a, b) => a.order - b.order)
                      .map((lesson, index) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        return (
                          <Link
                            key={lesson.id}
                            href={`/courses/${course.slug}/${lesson.slug}`}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px',
                              padding: '16px 24px',
                              textDecoration: 'none',
                              borderBottom:
                                index < moduleLessons.length - 1
                                  ? '1px solid var(--border-color)'
                                  : 'none',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            {/* Completion Circle */}
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                border: isCompleted
                                  ? 'none'
                                  : '2px solid var(--border-color)',
                                backgroundColor: isCompleted ? '#10b981' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              {isCompleted ? (
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="3"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              ) : (
                                <span
                                  style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-secondary)',
                                  }}
                                >
                                  {lesson.order + 1}
                                </span>
                              )}
                            </div>

                            {/* Lesson Info */}
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontSize: '1rem',
                                  fontWeight: 500,
                                  color: 'var(--text-primary)',
                                  marginBottom: '4px',
                                }}
                              >
                                {lesson.title}
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                  fontSize: '0.8125rem',
                                  color: 'var(--text-secondary)',
                                }}
                              >
                                <span>{formatDuration(lesson.duration)}</span>
                                {lesson.type === 'video' && (
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                    Video
                                  </span>
                                )}
                                {lesson.isFree && (
                                  <span
                                    style={{
                                      padding: '2px 8px',
                                      backgroundColor: 'var(--accent)',
                                      color: 'white',
                                      borderRadius: '4px',
                                      fontSize: '0.6875rem',
                                      fontWeight: 500,
                                    }}
                                  >
                                    FREE
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Arrow */}
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="var(--text-secondary)"
                              strokeWidth="2"
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Tags */}
        <div style={{ marginTop: '48px' }}>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '16px',
            }}
          >
            Topics Covered
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {course.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  border: '1px solid var(--border-color)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
