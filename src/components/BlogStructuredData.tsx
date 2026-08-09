import { absoluteUrl, siteConfig } from '@/config/site';
import type { BlogPost } from '@/types/blog';

interface BlogStructuredDataProps {
    post: BlogPost;
}

export default function BlogStructuredData({ post }: BlogStructuredDataProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": absoluteUrl(post.coverImage),
        "author": {
            "@type": "Person",
            "name": post.author.name,
            "description": post.author.bio,
            "url": siteConfig.siteUrl
        },
        "publisher": {
            "@type": "Organization",
            "name": "codewithnabi",
            "url": siteConfig.siteUrl,
            "logo": {
                "@type": "ImageObject",
                "url": absoluteUrl('/assets/branding/profile.jpg')
            }
        },
        "datePublished": post.publishedAt,
        "dateModified": post.updatedAt || post.publishedAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": absoluteUrl(`/blog/${post.slug}`)
        },
        "url": absoluteUrl(`/blog/${post.slug}`),
        "keywords": post.tags.join(", "),
        "articleSection": post.category,
        "wordCount": Math.round(post.content.split(' ').length),
        "timeRequired": `PT${post.readingTime}M`,
        "about": {
            "@type": "Thing",
            "name": post.category
        },
        "mentions": post.tags.map(tag => ({
            "@type": "Thing",
            "name": tag
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
