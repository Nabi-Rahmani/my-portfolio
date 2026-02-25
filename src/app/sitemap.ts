import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'
import { projects } from '@/data/projects'

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

    // Project detail pages
    const projectPages = projects.flatMap((project) => {
        const pages = [
            {
                url: `https://codewithnabi.dev/projects/${project.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            },
        ];

        // Add privacy and terms pages if the project has them
        if (project.links.privacy) {
            pages.push({
                url: `https://codewithnabi.dev${project.links.privacy}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.3,
            });
        }
        if (project.links.terms) {
            pages.push({
                url: `https://codewithnabi.dev${project.links.terms}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.3,
            });
        }

        return pages;
    });

    // Blog posts
    const blogPages = blogPosts.map((post) => ({
        url: `https://codewithnabi.dev/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...basePages, ...projectPages, ...blogPages];
}
