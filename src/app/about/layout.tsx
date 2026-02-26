import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn about Muhammad Nabi Rahmani — Flutter developer crafting production mobile apps with clean architecture, offline-first data sync, and polished UI.',
    openGraph: {
        title: 'About Muhammad Nabi Rahmani',
        description: 'Flutter developer crafting production mobile apps with clean architecture, offline-first data sync, and polished UI.',
        url: 'https://codewithnabi.dev/about',
    },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
