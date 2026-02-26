'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { UserProgress } from '@/types/course';

const STORAGE_KEY = 'course_progress';

interface CourseProgressState {
  [courseId: string]: UserProgress;
}

function createInitialProgress(courseId: string): UserProgress {
  return {
    moduleId: '',
    courseId,
    completedLessons: [],
    startedAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
  };
}

export function useCourseProgress(courseId: string) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Use a ref to access current progress inside callbacks without adding
  // `progress` to dependency arrays (which causes infinite re-render loops).
  const progressRef = useRef<UserProgress | null>(null);
  progressRef.current = progress;

  // Load progress from localStorage
  useEffect(() => {
    if (!courseId) {
      setProgress(null);
      setIsLoading(false);
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allProgress: CourseProgressState = JSON.parse(stored);
        if (allProgress[courseId]) {
          setProgress(allProgress[courseId]);
        } else {
          setProgress(createInitialProgress(courseId));
        }
      } else {
        setProgress(createInitialProgress(courseId));
      }
    } catch (error) {
      console.error('Error loading course progress:', error);
    }
    setIsLoading(false);
  }, [courseId]);

  // Save progress to localStorage — reads from ref, not state dependency
  const saveProgress = useCallback(
    (updatedProgress: UserProgress) => {
      if (!courseId) return;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const allProgress: CourseProgressState = stored ? JSON.parse(stored) : {};
        const toSave: UserProgress = {
          ...updatedProgress,
          lastAccessedAt: new Date().toISOString(),
        };
        allProgress[courseId] = toSave;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
        setProgress(toSave);
      } catch (error) {
        console.error('Error saving course progress:', error);
      }
    },
    [courseId]
  );

  // Mark a lesson as complete
  const markLessonComplete = useCallback(
    (lessonId: string) => {
      const current = progressRef.current;
      if (!courseId || !current) return;

      if (!current.completedLessons.includes(lessonId)) {
        saveProgress({
          ...current,
          completedLessons: [...current.completedLessons, lessonId],
        });
      }
    },
    [courseId, saveProgress]
  );

  // Mark a lesson as incomplete
  const markLessonIncomplete = useCallback(
    (lessonId: string) => {
      const current = progressRef.current;
      if (!courseId || !current) return;

      saveProgress({
        ...current,
        completedLessons: current.completedLessons.filter((id) => id !== lessonId),
      });
    },
    [courseId, saveProgress]
  );

  // Toggle lesson completion
  const toggleLessonComplete = useCallback(
    (lessonId: string) => {
      const current = progressRef.current;
      if (!courseId || !current) return;

      if (current.completedLessons.includes(lessonId)) {
        markLessonIncomplete(lessonId);
      } else {
        markLessonComplete(lessonId);
      }
    },
    [courseId, markLessonComplete, markLessonIncomplete]
  );

  // Set current lesson — bails out if already set to avoid re-render loop
  const setCurrentLesson = useCallback(
    (lessonId: string) => {
      const current = progressRef.current;
      if (!courseId || !current) return;
      // Skip if already on this lesson to prevent infinite update cycle
      if (current.currentLessonId === lessonId) return;

      saveProgress({
        ...current,
        currentLessonId: lessonId,
      });
    },
    [courseId, saveProgress]
  );

  // Check if a lesson is completed
  const isLessonComplete = useCallback(
    (lessonId: string): boolean => {
      return progress?.completedLessons.includes(lessonId) ?? false;
    },
    [progress]
  );

  // Get completion percentage
  const getCompletionPercentage = useCallback(
    (totalLessons: number): number => {
      if (!progress || totalLessons === 0) return 0;
      return Math.round((progress.completedLessons.length / totalLessons) * 100);
    },
    [progress]
  );

  // Reset progress
  const resetProgress = useCallback(() => {
    if (!courseId) return;
    saveProgress(createInitialProgress(courseId));
  }, [courseId, saveProgress]);

  return {
    progress,
    isLoading,
    completedLessons: progress?.completedLessons ?? [],
    markLessonComplete,
    markLessonIncomplete,
    toggleLessonComplete,
    setCurrentLesson,
    isLessonComplete,
    getCompletionPercentage,
    resetProgress,
  };
}
