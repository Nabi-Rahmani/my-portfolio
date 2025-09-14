import type { Metadata } from "next";
import BlogLayoutClient from "@/components/BlogLayoutClient";

export const metadata: Metadata = {
    title: 'Blog & Insights - Muhammad Nabi Rahmani',
    description: 'Thoughts, tutorials, and experiences about Flutter development, programming, and building great mobile applications.',
    keywords: ['Flutter blog', 'Mobile development tutorials', 'Programming insights', 'Flutter tutorials', 'Dart programming'],
    openGraph: {
        title: 'Blog & Insights - Muhammad Nabi Rahmani',
        description: 'Thoughts, tutorials, and experiences about Flutter development, programming, and building great mobile applications.',
        url: 'https://codewithnabi.dev/blog',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog & Insights - Muhammad Nabi Rahmani',
        description: 'Thoughts, tutorials, and experiences about Flutter development, programming, and building great mobile applications.',
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <BlogLayoutClient>{children}</BlogLayoutClient>;
}