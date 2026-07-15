import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Flutter courses from Muhammad Nabi Rahmani — production patterns, architecture, and shipping real apps.',
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
  return <>{children}</>;
}
