import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/data/blog';
import { BlogPost } from '@/types/blog';
import BlogStructuredData from '@/components/BlogStructuredData';
import ShareButtons from '@/components/ShareButtons';

// Generate metadata for individual blog posts
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
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        },
    };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

interface TableOfContentsProps {
    content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
    // Extract headings from content
    const headings = content.match(/^(#{2,3})\s+(.+)$/gm) || [];

    if (headings.length === 0) return null;

    const tocItems = headings.map((heading, index) => {
        const level = heading.match(/^#+/)?.[0].length || 2;
        const text = heading.replace(/^#+\s+/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        return { level, text, id, index };
    });

    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Table of Contents
            </h3>
            <nav className="space-y-2">
                {tocItems.map((item) => (
                    <a
                        key={item.index}
                        href={`#${item.id}`}
                        className={`block text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${item.level === 2
                            ? 'text-gray-900 dark:text-white font-medium'
                            : 'text-gray-600 dark:text-gray-400 ml-4'
                            }`}
                    >
                        {item.text}
                    </a>
                ))}
            </nav>
        </div>
    );
};

const RelatedPosts = ({ currentPost }: { currentPost: BlogPost }) => {
    const relatedPosts = getRelatedPosts(currentPost.id);

    if (relatedPosts.length === 0) return null;

    return (
        <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                Related Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post: BlogPost) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group"
                    >
                        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all">
                            <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold">
                                {post.category}
                            </div>
                            <div className="p-6">
                                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                    {post.category}
                                </span>
                                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-3 mb-2 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                                    <span>{post.readingTime} min read</span>
                                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
};

const formatContent = (content: string) => {
    // Convert markdown-like content to HTML
    return content
        .split('\n\n')
        .map((paragraph) => {
            // Handle headings
            if (paragraph.startsWith('## ')) {
                const text = paragraph.replace('## ', '');
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return `<h2 id="${id}" class="text-2xl font-bold mt-8 mb-4 scroll-mt-24" style="color: var(--text-primary)">${text}</h2>`;
            }
            if (paragraph.startsWith('### ')) {
                const text = paragraph.replace('### ', '');
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return `<h3 id="${id}" class="text-xl font-bold mt-6 mb-3 scroll-mt-24" style="color: var(--text-primary)">${text}</h3>`;
            }

            // Handle code blocks
            if (paragraph.startsWith('```')) {
                return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6"><code>${paragraph.replace(/```\w*\n?|\n?```/g, '')}</code></pre>`;
            }

            // Handle inline code
            const codeProcessed = paragraph.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">$1</code>');

            // Handle bold text
            const boldProcessed = codeProcessed.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>');

            // Regular paragraphs
            return `<p class="leading-relaxed mb-6" style="color: var(--text-primary)">${boldProcessed}</p>`;
        })
        .join('');
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <BlogStructuredData post={post} />
            <div style={{
                minHeight: '100vh',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                paddingTop: '6rem',
                paddingBottom: '4rem',
                transition: 'all 0.3s ease'
            }}>
                <div className="max-w-6xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <li><Link href="/" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }} className="hover:text-blue-600">Home</Link></li>
                            <li>→</li>
                            <li><Link href="/blog" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }} className="hover:text-blue-600">Blog</Link></li>
                            <li>→</li>
                            <li style={{ color: 'var(--text-primary)' }}>{post.title}</li>
                        </ol>
                    </nav>

                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <article className="lg:col-span-3">
                            {/* Header */}
                            <header className="mb-12">
                                {/* Category & Reading Time */}
                                <div className="flex items-center gap-4 text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                        {post.category}
                                    </span>
                                    <span>{post.readingTime} min read</span>
                                    <span>•</span>
                                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>

                                {/* Title */}
                                <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
                                    {post.title}
                                </h1>

                                {/* Excerpt */}
                                <p className="text-xl leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                                    {post.excerpt}
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center gap-4 pb-8 border-b border-gray-200 dark:border-gray-700">
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                                            {post.author.name}
                                        </p>
                                        <p style={{ color: 'var(--text-secondary)' }}>
                                            {post.author.bio}
                                        </p>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 pt-6">
                                    {post.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/blog?tag=${tag}`}
                                            className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </header>

                            {/* Content */}
                            <div
                                className="prose prose-lg max-w-none dark:prose-invert prose-blue"
                                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                            />

                            {/* Share Section */}
                            <div className="mt-12">
                                <ShareButtons post={post} />
                            </div>

                            {/* Related Posts */}
                            <RelatedPosts currentPost={post} />
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <TableOfContents content={post.content} />
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}