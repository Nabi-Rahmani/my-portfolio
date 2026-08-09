import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { blogPosts } from '@/data/blog';
import { courses, getAllLessons } from '@/data/courses';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path = '') => `${siteConfig.siteUrl}${path}`;
  const basePages: MetadataRoute.Sitemap = [
    { url: url(), changeFrequency: 'weekly', priority: 1 },
    { url: url('/about'), changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/projects'), changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/blog'), changeFrequency: 'weekly', priority: 0.9 },
    ...(siteConfig.learningEnabled
      ? [{ url: url('/courses'), changeFrequency: 'monthly' as const, priority: 0.8 }]
      : []),
    { url: url('/uses'), changeFrequency: 'monthly', priority: 0.5 },
    { url: url('/now'), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.flatMap((project) => {
    const pages: MetadataRoute.Sitemap = [
      {
        url: url(`/projects/${project.slug}`),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ];
    if (project.links.privacy && project.privacyContent) {
      pages.push({
        url: url(project.links.privacy),
        lastModified: new Date(project.privacyContent.lastUpdated),
        changeFrequency: 'yearly',
        priority: 0.3,
      });
    }
    if (project.links.terms && project.termsContent) {
      pages.push({
        url: url(project.links.terms),
        lastModified: new Date(project.termsContent.lastUpdated),
        changeFrequency: 'yearly',
        priority: 0.3,
      });
    }
    return pages;
  });

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const coursePages: MetadataRoute.Sitemap = siteConfig.learningEnabled
    ? courses.flatMap((course) => [
        {
          url: url(`/courses/${course.slug}`),
          lastModified: new Date(course.updatedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        },
        ...getAllLessons(course).map((lesson) => ({
          url: url(`/courses/${course.slug}/${lesson.slug}`),
          lastModified: new Date(course.updatedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        })),
      ])
    : [];

  return [...basePages, ...projectPages, ...blogPages, ...coursePages];
}
