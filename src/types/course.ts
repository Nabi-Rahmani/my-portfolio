// Course Platform Types

export interface Instructor {
  name: string;
  avatar: string;
  bio: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface CodeBlock {
  id: string;
  language: string;
  filename?: string;
  code: string;
  highlightLines?: number[];
}

export interface LessonContent {
  // For video lessons
  videoUrl?: string;
  videoProvider?: 'youtube' | 'vimeo';

  // For text/mixed lessons
  markdown?: string;

  // Code examples
  codeBlocks?: CodeBlock[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  type: 'video' | 'text' | 'mixed';
  content: LessonContent;
  isFree: boolean; // Preview lessons available without login
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface CourseSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  instructor: Instructor;
  coverImage: string;
  price: 'free' | number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalDuration: number; // in minutes
  totalLessons: number;
  modules: Module[];
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  seo: CourseSEO;
}

// User Progress Types
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  videoProgress?: number; // Percentage for video lessons (0-100)
}

export interface UserProgress {
  id?: string;
  moduleId: string;
  courseId: string;
  completedLessons: string[]; // Array of lesson IDs
  currentLessonId?: string;
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;
}

// Helper type for course navigation
export interface CourseNavigation {
  currentLesson: Lesson;
  currentModule: Module;
  previousLesson?: { lesson: Lesson; module: Module };
  nextLesson?: { lesson: Lesson; module: Module };
  progress: {
    completedLessons: number;
    totalLessons: number;
    percentage: number;
  };
}

// Filter types for course listing
export interface CourseFilter {
  difficulty?: Course['difficulty'];
  tag?: string;
  search?: string;
}
