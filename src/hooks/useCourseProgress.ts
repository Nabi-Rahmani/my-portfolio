'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '@/types/course';

const STORAGE_KEY = 'course_progress';

interface CourseProgressState {
  [courseId: string]: UserProgress;
}

export function useCourseProgress(courseId: string) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          // Initialize new progress
          const newProgress: UserProgress = {
            oduleId: '',
            courseId,
            completedLessons: [],
            startedAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString(),
          };
          setProgress(newProgress);
        }
      } else {
        // Initialize new progress
        const newProgress: UserProgress = {
          oduleId: '',
          courseId,
          completedLessons: [],
          startedAt: new Date().toISOString(),
          lastAccessedAt: new Date().toISOString(),
        };
        setProgress(newProgress);
      }
    } catch (error) {
      console.error('Error loading course progress:', error);
    }
    setIsLoading(false);
  }, [courseId]);

  // Save progress to localStorage
  const saveProgress = useCallback(
    (updatedProgress: UserProgress) => {
      if (!courseId) return;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const allProgress: CourseProgressState = stored ? JSON.parse(stored) : {};
        allProgress[courseId] = {
          ...updatedProgress,
          lastAccessedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
        setProgress(allProgress[courseId]);
      } catch (error) {
        console.error('Error saving course progress:', error);
      }
    },
    [courseId]
  );

  // Mark a lesson as complete
  const markLessonComplete = useCallback(
    (lessonId: string) => {
      if (!courseId || !progress) return;

      if (!progress.completedLessons.includes(lessonId)) {
        const updatedProgress: UserProgress = {
          ...progress,
          completedLessons: [...progress.completedLessons, lessonId],
        };
        saveProgress(updatedProgress);
      }
    },
    [courseId, progress, saveProgress]
  );

  // Mark a lesson as incomplete
  const markLessonIncomplete = useCallback(
    (lessonId: string) => {
      if (!courseId || !progress) return;

      const updatedProgress: UserProgress = {
        ...progress,
        completedLessons: progress.completedLessons.filter((id) => id !== lessonId),
      };
      saveProgress(updatedProgress);
    },
    [courseId, progress, saveProgress]
  );

  // Toggle lesson completion
  const toggleLessonComplete = useCallback(
    (lessonId: string) => {
      if (!courseId || !progress) return;

      if (progress.completedLessons.includes(lessonId)) {
        markLessonIncomplete(lessonId);
      } else {
        markLessonComplete(lessonId);
      }
    },
    [courseId, progress, markLessonComplete, markLessonIncomplete]
  );

  // Set current lesson
  const setCurrentLesson = useCallback(
    (lessonId: string) => {
      if (!courseId || !progress) return;

      const updatedProgress: UserProgress = {
        ...progress,
        currentLessonId: lessonId,
      };
      saveProgress(updatedProgress);
    },
    [courseId, progress, saveProgress]
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
    const newProgress: UserProgress = {
      oduleId: '',
      courseId,
      completedLessons: [],
      startedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
    };
    saveProgress(newProgress);
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
