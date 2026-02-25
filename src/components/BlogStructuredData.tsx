import { BlogPost } from '@/types/blog';

interface BlogStructuredDataProps {
    post: BlogPost;
}

export default function BlogStructuredData({ post }: BlogStructuredDataProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": `https://codewithnabi.dev/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`,
        "author": {
            "@type": "Person",
            "name": post.author.name,
            "description": post.author.bio,
            "url": "https://codewithnabi.dev"
        },
        "publisher": {
            "@type": "Organization",
            "name": "codewithnabi",
            "url": "https://codewithnabi.dev",
            "logo": {
                "@type": "ImageObject",
                "url": "https://codewithnabi.dev/assets/branding/youtube-logo.png"
            }
        },
        "datePublished": post.publishedAt,
        "dateModified": post.updatedAt || post.publishedAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://codewithnabi.dev/blog/${post.slug}`
        },
        "url": `https://codewithnabi.dev/blog/${post.slug}`,
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