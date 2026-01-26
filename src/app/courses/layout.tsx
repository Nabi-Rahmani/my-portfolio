import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses | codewithnabi',
  description: 'Learn Flutter development with comprehensive courses. From beginner to production-ready apps.',
  openGraph: {
    title: 'Courses | codewithnabi',
    description: 'Learn Flutter development with comprehensive courses.',
    type: 'website',
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
