import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Flutter courses from Muhammad Nabi Rahmani — production patterns, architecture, and shipping real apps.',
  alternates: { canonical: '/courses' },
  openGraph: {
    title: 'Courses — Muhammad Nabi Rahmani',
    description:
      'Flutter courses on production patterns, architecture, and shipping real apps.',
    type: 'website',
    url: 'https://codewithnabi.dev/courses',
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!siteConfig.learningEnabled) notFound();

  return <>{children}</>;
}
