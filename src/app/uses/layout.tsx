import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Uses',
    description: 'The hardware, editor, Flutter/Dart packages, design tools, and services Muhammad Nabi Rahmani uses to build and ship mobile apps.',
    alternates: { canonical: '/uses' },
    openGraph: {
        title: 'Uses — Muhammad Nabi Rahmani',
        description: 'The hardware, editor, Flutter/Dart packages, design tools, and services I use to build and ship mobile apps.',
        url: 'https://codewithnabi.dev/uses',
    },
};

export default function UsesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
