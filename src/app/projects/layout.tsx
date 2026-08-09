import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Selected Work',
    description: 'Explore three shipped Flutter products designed, engineered, released, and maintained by Nabi Rahmani.',
    alternates: { canonical: '/projects' },
    openGraph: {
        title: 'Selected Work — Nabi Rahmani',
        description: 'Three shipped Flutter products built from architecture through Play Store release.',
        url: 'https://codewithnabi.dev/projects',
    },
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
