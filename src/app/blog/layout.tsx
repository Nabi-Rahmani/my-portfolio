import type { Metadata } from "next";
import BlogLayoutClient from "@/components/BlogLayoutClient";

export const metadata: Metadata = {
    title: 'Articles',
    description: 'Notes on Flutter development, mobile architecture, and shipping apps people actually use.',
    keywords: ['Flutter articles', 'Mobile development tutorials', 'Programming insights', 'Flutter tutorials', 'Dart programming'],
    openGraph: {
        title: 'Articles — Muhammad Nabi Rahmani',
        description: 'Notes on Flutter development, mobile architecture, and shipping apps people actually use.',
        url: 'https://codewithnabi.dev/blog',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Articles — Muhammad Nabi Rahmani',
        description: 'Notes on Flutter development, mobile architecture, and shipping apps people actually use.',
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <BlogLayoutClient>{children}</BlogLayoutClient>;
}
