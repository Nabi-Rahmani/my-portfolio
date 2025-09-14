export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
    publishedAt: string;
    updatedAt: string;
    readingTime: number; // in minutes
    category: string;
    tags: string[];
    featured: boolean;
    coverImage: string;
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };
}

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    count: number;
}

export interface BlogFilter {
    category?: string;
    tag?: string;
    search?: string;
}