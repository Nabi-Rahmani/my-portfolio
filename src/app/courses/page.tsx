'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { courses, formatDuration, getFirstLesson } from '@/data/courses';
import { Course } from '@/types/course';
import { ProgressBar } from '@/components/courses/ProgressBar';

export default function CoursesPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [savedProgress, setSavedProgress] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Load saved progress
    try {
      const stored = localStorage.getItem('course_progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        const progressMap: Record<string, string[]> = {};
        Object.keys(parsed).forEach((courseId) => {
          progressMap[courseId] = parsed[courseId].completedLessons || [];
        });
        setSavedProgress(progressMap);
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        paddingTop: '100px',
        paddingBottom: isMobile ? '100px' : '60px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}
          >
            Learn Flutter Development
          </h1>
          <p
            style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Comprehensive courses to take you from beginner to production-ready Flutter developer.
          </p>
        </div>

        {/* Course Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '32px',
          }}
        >
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              completedLessons={savedProgress[course.id] || []}
            />
          ))}
        </div>

        {/* Coming Soon */}
        <div
          style={{
            marginTop: '60px',
            padding: '40px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}
          >
            More Courses Coming Soon
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              marginBottom: '20px',
            }}
          >
            Stay tuned for more courses on state management, testing, and advanced Flutter topics.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: 'var(--accent-primary)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

// Course Card Component
interface CourseCardProps {
  course: Course;
  completedLessons: string[];
}

function CourseCard({ course, completedLessons }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const firstLesson = getFirstLesson(course);
  const progress = Math.round((completedLessons.length / course.totalLessons) * 100);
  const hasStarted = completedLessons.length > 0;

  const difficultyColors = {
    beginner: { bg: '#dcfce7', text: '#166534' },
    intermediate: { bg: '#fef3c7', text: '#92400e' },
    advanced: { bg: '#fee2e2', text: '#991b1b' },
  };

  return (
    <Link
      href={hasStarted && firstLesson ? `/courses/${course.slug}/${firstLesson.slug}` : `/courses/${course.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'block',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '16px',
        overflow: 'hidden',
        textDecoration: 'none',
        border: '1px solid var(--border-color)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Cover Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={course.coverImage}
          alt={course.title}
          fill
          style={{
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        />
        {/* Price Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '6px 12px',
            backgroundColor: course.price === 'free' ? '#10b981' : 'var(--accent-primary)',
            color: 'white',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {course.price === 'free' ? 'FREE' : `$${course.price}`}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        {/* Badges */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              padding: '4px 10px',
              backgroundColor: difficultyColors[course.difficulty].bg,
              color: difficultyColors[course.difficulty].text,
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {course.difficulty}
          </span>
          <span
            style={{
              padding: '4px 10px',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-secondary)',
              borderRadius: '4px',
              fontSize: '0.75rem',
            }}
          >
            {course.totalLessons} lessons
          </span>
          <span
            style={{
              padding: '4px 10px',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-secondary)',
              borderRadius: '4px',
              fontSize: '0.75rem',
            }}
          >
            {formatDuration(course.totalDuration)}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}
        >
          {course.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {course.excerpt}
        </p>

        {/* Instructor */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <Image
            src={course.instructor.avatar}
            alt={course.instructor.name}
            width={32}
            height={32}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <span
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
            }}
          >
            {course.instructor.name}
          </span>
        </div>

        {/* Progress or CTA */}
        {hasStarted ? (
          <ProgressBar
            percentage={progress}
            size="sm"
            label={progress === 100 ? 'Completed!' : 'Continue learning'}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              backgroundColor: 'var(--accent-primary)',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            Start Course
          </div>
        )}
      </div>
    </Link>
  );
}
