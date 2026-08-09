'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Course, Module, Lesson } from '@/types/course';
import { ProgressBar } from './ProgressBar';
import { getModuleProgress, formatDuration } from '@/data/courses';
import { cn } from '@/lib/utils';

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
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (currentLessonId) {
      const currentModule = course.modules.find((m) =>
        m.lessons.some((l) => l.id === currentLessonId),
      );
      if (currentModule && !expandedModules.includes(currentModule.id)) {
        setExpandedModules((prev) => [...prev, currentModule.id]);
      }
    }
  }, [currentLessonId, course.modules, expandedModules]);

  useEffect(() => {
    if (!isMobile || !isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isMobile, isOpen, onClose]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const overallProgress = Math.round((completedLessons.length / totalLessons) * 100);

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[var(--cream)]">
      <div className="border-b border-[var(--line)] p-5">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-[0.875rem] text-[var(--muted)] no-underline transition-colors hover:text-[var(--atelier-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All courses
          </Link>
          {isMobile && onClose && (
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close course menu"
              className="cursor-pointer rounded-full border border-[var(--line)] bg-transparent p-2 text-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <h2 className="mb-3 text-[1rem] font-semibold leading-snug text-[var(--ink)]">
          {course.title}
        </h2>

        <ProgressBar percentage={overallProgress} size="sm" label="Course progress" />

        <div className="mt-3 flex gap-4 text-[0.75rem] text-[var(--muted)]">
          <span>
            {completedLessons.length}/{totalLessons} lessons
          </span>
          <span>{formatDuration(course.totalDuration)}</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-3">
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

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            onClick={onClose}
            className="fixed inset-x-0 bottom-0 top-[72px] z-[250] bg-black/50 md:hidden"
            aria-hidden
          />
        )}
        <div
          ref={drawerRef}
          className={cn(
            'fixed bottom-0 left-0 top-[72px] z-[251] w-[85%] max-w-[320px] overflow-y-auto border-r border-[var(--line)] bg-[var(--cream)] transition-transform duration-300 motion-reduce:transition-none md:hidden',
            isOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Course lessons"
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-[280px] min-w-[280px] overflow-hidden border-r border-[var(--line)] md:block">
      {sidebarContent}
    </aside>
  );
}

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
    <div className="border-b border-[var(--line)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start gap-3 border-none bg-transparent px-5 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--atelier-accent)]"
        aria-expanded={isExpanded}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="2"
          className={cn(
            'mt-0.5 shrink-0 transition-transform duration-200 motion-reduce:transition-none',
            isExpanded && 'rotate-90',
          )}
          aria-hidden
        >
          <path d="M9 18l6-6-6-6" />
        </svg>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            {isModuleComplete && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0 text-[var(--status-ok)]"
                aria-hidden
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            )}
            <span className="text-[0.875rem] font-semibold text-[var(--ink)]">{module.title}</span>
          </div>
          <span className="text-[0.75rem] text-[var(--muted)]">
            {progress.completed}/{progress.total} lessons
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="pb-2">
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
  const router = useRouter();

  const handleClick = () => {
    onClick?.();
    router.push(`/courses/${courseSlug}/${lesson.slug}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex w-full cursor-pointer items-center gap-3 border-0 border-l-[3px] bg-transparent py-2.5 pl-12 pr-5 text-left transition-colors duration-200 motion-reduce:transition-none',
        'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--atelier-accent)]',
        isCurrent
          ? 'border-l-[var(--atelier-accent)] bg-[var(--cream-2)]'
          : 'border-l-transparent hover:bg-[var(--cream-2)]',
      )}
    >
      <div
        className={cn(
          'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full',
          isCompleted
            ? 'border-none bg-[var(--status-ok)]'
            : 'border-2 border-[var(--line)] bg-transparent',
        )}
        aria-hidden
      >
        {isCompleted && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'truncate text-[0.8125rem]',
            isCurrent
              ? 'font-semibold text-[var(--atelier-accent)]'
              : 'font-normal text-[var(--ink)]',
          )}
        >
          {lesson.title}
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="text-[0.6875rem] text-[var(--muted)]">
            {formatDuration(lesson.duration)}
          </span>
          {lesson.type === 'video' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--muted)" aria-hidden>
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
          {lesson.isFree && (
            <span className="rounded bg-[var(--atelier-accent)] px-1.5 py-px text-[0.625rem] font-medium text-[var(--cream)]">
              FREE
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
