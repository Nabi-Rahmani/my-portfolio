import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Writing',
    description: 'Notes on Flutter development, mobile architecture, and shipping apps people actually use.',
    keywords: ['Flutter articles', 'Mobile development tutorials', 'Programming insights', 'Flutter tutorials', 'Dart programming'],
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Writing — Nabi Rahmani',
        description: 'Notes on Flutter development, mobile architecture, and shipping apps people actually use.',
        url: 'https://codewithnabi.dev/blog',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Writing — Nabi Rahmani',
        description: 'Notes on Flutter development, mobile architecture, and shipping apps people actually use.',
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
