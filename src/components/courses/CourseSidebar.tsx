'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Course, Module, Lesson } from '@/types/course';
import { ProgressBar } from './ProgressBar';
import { getModuleProgress, formatDuration } from '@/data/courses';

interface CourseSidebarProps {
  course: Course;
  currentLessonId?: string;
  completedLessons: string[];
  onLessonComplete?: (lessonId: string) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function CourseSidebar({
  course,
  currentLessonId,
  completedLessons,
  isMobile = false,
  isOpen = true,
  onClose,
}: CourseSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  // Auto-expand module containing current lesson
  useEffect(() => {
    if (currentLessonId) {
      const currentModule = course.modules.find((m) =>
        m.lessons.some((l) => l.id === currentLessonId)
      );
      if (currentModule && !expandedModules.includes(currentModule.id)) {
        setExpandedModules((prev) => [...prev, currentModule.id]);
      }
    }
  }, [currentLessonId, course.modules, expandedModules]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const overallProgress = Math.round((completedLessons.length / totalLessons) * 100);

  const sidebarContent = (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <Link
            href="/courses"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
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
          {isMobile && onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <h2
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '12px',
            lineHeight: 1.4,
          }}
        >
          {course.title}
        </h2>

        <ProgressBar percentage={overallProgress} size="sm" label="Course Progress" />

        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            gap: '16px',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span>{completedLessons.length}/{totalLessons} lessons</span>
          <span>{formatDuration(course.totalDuration)}</span>
        </div>
      </div>

      {/* Modules List */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '12px 0',
        }}
      >
        {course.modules
          .sort((a, b) => a.order - b.order)
          .map((module) => (
            <ModuleAccordion
              key={module.id}
              module={module}
              courseSlug={course.slug}
              isExpanded={expandedModules.includes(module.id)}
              onToggle={() => toggleModule(module.id)}
              currentLessonId={currentLessonId}
              completedLessons={completedLessons}
              onLessonClick={isMobile ? onClose : undefined}
            />
          ))}
      </div>
    </div>
  );

  // Mobile drawer
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div
            onClick={onClose}
            style={{
              position: 'fixed',
              top: '70px', // Below main navigation
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 250,
            }}
          />
        )}
        {/* Drawer */}
        <div
          style={{
            position: 'fixed',
            top: '70px', // Below main navigation
            left: 0,
            bottom: '100px', // Above mobile nav
            width: '85%',
            maxWidth: '320px',
            backgroundColor: 'var(--bg-primary)',
            zIndex: 251,
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease',
            boxShadow: isOpen ? '4px 0 20px rgba(0, 0, 0, 0.15)' : 'none',
            overflowY: 'auto',
          }}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside
      style={{
        width: '280px',
        minWidth: '280px',
        height: 'calc(100vh - 70px)', // Account for main navigation
        borderRight: '1px solid var(--border-color)',
        overflow: 'hidden',
      }}
    >
      {sidebarContent}
    </aside>
  );
}

// Module Accordion Component
interface ModuleAccordionProps {
  module: Module;
  courseSlug: string;
  isExpanded: boolean;
  onToggle: () => void;
  currentLessonId?: string;
  completedLessons: string[];
  onLessonClick?: () => void;
}

function ModuleAccordion({
  module,
  courseSlug,
  isExpanded,
  onToggle,
  currentLessonId,
  completedLessons,
  onLessonClick,
}: ModuleAccordionProps) {
  const progress = getModuleProgress(module, completedLessons);
  const isModuleComplete = progress.completed === progress.total && progress.total > 0;

  return (
    <div style={{ borderBottom: '1px solid var(--border-color)' }}>
      {/* Module Header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-secondary)"
          strokeWidth="2"
          style={{
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            marginTop: '2px',
            flexShrink: 0,
          }}
        >
          <path d="M9 18l6-6-6-6" />
        </svg>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '4px',
            }}
          >
            {isModuleComplete && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#10b981"
                stroke="#10b981"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            )}
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              {module.title}
            </span>
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
            }}
          >
            {progress.completed}/{progress.total} lessons
          </span>
        </div>
      </button>

      {/* Lessons List */}
      {isExpanded && (
        <div style={{ paddingBottom: '8px' }}>
          {module.lessons
            .sort((a, b) => a.order - b.order)
            .map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                courseSlug={courseSlug}
                isCurrent={currentLessonId === lesson.id}
                isCompleted={completedLessons.includes(lesson.id)}
                onClick={onLessonClick}
              />
            ))}
        </div>
      )}
    </div>
  );
}

// Lesson Item Component
interface LessonItemProps {
  lesson: Lesson;
  courseSlug: string;
  isCurrent: boolean;
  isCompleted: boolean;
  onClick?: () => void;
}

function LessonItem({
  lesson,
  courseSlug,
  isCurrent,
  isCompleted,
  onClick,
}: LessonItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    // Close sidebar first
    if (onClick) {
      onClick();
    }
    // Navigate to lesson
    router.push(`/courses/${courseSlug}/${lesson.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 20px 10px 48px',
        cursor: 'pointer',
        backgroundColor: isCurrent
          ? 'var(--bg-secondary)'
          : isHovered
          ? 'var(--bg-secondary)'
          : 'transparent',
        borderLeft: isCurrent ? '3px solid var(--accent)' : '3px solid transparent',
        transition: 'background-color 0.2s ease',
      }}
    >
      {/* Completion indicator */}
      <div
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          border: isCompleted ? 'none' : '2px solid var(--border-color)',
          backgroundColor: isCompleted ? '#10b981' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {isCompleted && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {/* Lesson info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '0.8125rem',
            color: isCurrent ? 'var(--accent)' : 'var(--text-primary)',
            fontWeight: isCurrent ? 600 : 400,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {lesson.title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '2px',
          }}
        >
          <span
            style={{
              fontSize: '0.6875rem',
              color: 'var(--text-secondary)',
            }}
          >
            {formatDuration(lesson.duration)}
          </span>
          {lesson.type === 'video' && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="var(--text-secondary)"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
          {lesson.isFree && (
            <span
              style={{
                fontSize: '0.625rem',
                padding: '1px 6px',
                backgroundColor: 'var(--accent)',
                color: 'white',
                borderRadius: '4px',
                fontWeight: 500,
              }}
            >
              FREE
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
