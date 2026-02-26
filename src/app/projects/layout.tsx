import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Explore mobile apps built by Muhammad Nabi Rahmani — Focus Flow and Dev Discipline, crafted with Flutter, Riverpod, and clean architecture.',
    openGraph: {
        title: 'Projects - Muhammad Nabi Rahmani',
        description: 'Explore mobile apps built with Flutter, Riverpod, and clean architecture.',
        url: 'https://codewithnabi.dev/projects',
    },
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
