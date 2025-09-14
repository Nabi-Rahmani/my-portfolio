import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
    // Base pages
    const basePages = [
        {
            url: 'https://codewithnabi.dev',
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: 'https://codewithnabi.dev/about',
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: 'https://codewithnabi.dev/projects',
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: 'https://codewithnabi.dev/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ];

    // Blog posts
    const blogPages = blogPosts.map((post) => ({
        url: `https://codewithnabi.dev/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...basePages, ...blogPages];
}
