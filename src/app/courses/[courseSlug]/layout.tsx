import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { courses, getCourseBySlug } from '@/data/courses';

export function generateStaticParams() {
  if (!siteConfig.learningEnabled) return [];
  return courses.map((course) => ({ courseSlug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);

  if (!course) return {};

  return {
    title: course.title,
    description: course.seo.description,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      title: course.seo.title,
      description: course.seo.description,
      url: `/courses/${course.slug}`,
      images: [{ url: course.coverImage, alt: course.title }],
    },
  };
}

export default function CourseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
