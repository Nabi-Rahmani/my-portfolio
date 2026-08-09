import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { getAllLessons, getCourseBySlug, getLessonBySlug } from '@/data/courses';

export function generateStaticParams({ params }: { params: { courseSlug: string } }) {
  if (!siteConfig.learningEnabled) return [];
  const course = getCourseBySlug(params.courseSlug);
  return course ? getAllLessons(course).map((lesson) => ({ lessonSlug: lesson.slug })) : [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const data = getLessonBySlug(courseSlug, lessonSlug);

  if (!data) return {};

  return {
    title: `${data.lesson.title} — ${data.course.title}`,
    description: data.lesson.description,
    alternates: { canonical: `/courses/${courseSlug}/${lessonSlug}` },
  };
}

export default function LessonLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
