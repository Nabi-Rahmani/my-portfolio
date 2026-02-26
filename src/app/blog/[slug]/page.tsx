import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug } from '@/data/blog';
import BlogStructuredData from '@/components/BlogStructuredData';
import BlogPostClient from '@/components/BlogPostClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found - Muhammad Nabi Rahmani',
            description: 'The requested blog post could not be found.',
        };
    }

    return {
        title: `${post.title} - Muhammad Nabi Rahmani`,
        description: post.excerpt,
        keywords: [post.category, ...post.tags, 'Flutter development', 'Programming tutorial'],
        authors: [{ name: post.author.name }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://codewithnabi.dev/blog/${post.slug}`,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author.name],
            tags: post.tags,
            images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
        },
    };
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <BlogStructuredData post={post} />
            <BlogPostClient post={post} />
        </>
    );
}
