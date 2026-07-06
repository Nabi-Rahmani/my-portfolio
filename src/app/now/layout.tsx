import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Now',
    description: 'What Muhammad Nabi Rahmani is building, learning, and reading right now.',
    openGraph: {
        title: 'Now — Muhammad Nabi Rahmani',
        description: 'What I\'m building, learning, and reading right now.',
        url: 'https://codewithnabi.dev/now',
    },
};

export default function NowLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
