'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { blogPosts, blogCategories, getFeaturedPosts, getAllTags, searchPosts, getPostsByCategory, getPostsByTag } from '@/data/blog';
import { BlogPost, BlogFilter } from '@/types/blog';

const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => {
    return (
        <article className={`group cursor-pointer transition-all duration-300 ${featured ? 'mb-12' : 'mb-8'
            }`}>
            <Link href={`/blog/${post.slug}`}>
                <div className={`${featured
                    ? 'flex flex-col lg:flex-row gap-8 p-8 rounded-2xl shadow-lg hover:shadow-xl border'
                    : 'rounded-xl shadow-md hover:shadow-lg border overflow-hidden'
                    }`}
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)',
                        transition: 'all 0.3s ease'
                    }}>
                    {/* Cover Image */}
                    <div className={`${featured
                        ? 'lg:w-1/2 h-64 lg:h-auto'
                        : 'h-48'
                        } rounded-xl overflow-hidden`}>
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Content */}
                    <div className={`${featured ? 'lg:w-1/2' : 'p-6'} flex flex-col justify-between`}>
                        <div>
                            {/* Category & Reading Time */}
                            <div className="flex items-center gap-4 text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                    {post.category}
                                </span>
                                <span>{post.readingTime} min read</span>
                            </div>

                            {/* Title */}
                            <h2 className={`font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'
                                }`}
                                style={{ color: 'var(--text-primary)' }}>
                                {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                {post.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-1 rounded-md"
                                        style={{
                                            backgroundColor: 'var(--bg-primary)',
                                            color: 'var(--text-secondary)',
                                            border: '1px solid var(--border-color)'
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Author & Date */}
                        <div className="flex items-center gap-3">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                                    {post.author.name}
                                </p>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
};

const SearchAndFilter = ({
    filters,
    onFiltersChange
}: {
    filters: BlogFilter;
    onFiltersChange: (filters: BlogFilter) => void;
}) => {
    const allTags = getAllTags();

    return (
        <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={filters.search || ''}
                    onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                    className="w-full px-4 py-3 pl-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)'
                    }}
                />
                <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: 'var(--text-secondary)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                {/* Categories */}
                <select
                    value={filters.category || ''}
                    onChange={(e) => onFiltersChange({ ...filters, category: e.target.value || undefined })}
                    className="px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)'
                    }}
                >
                    <option value="">All Categories</option>
                    {blogCategories.map((category) => (
                        <option key={category.id} value={category.slug}>
                            {category.name} ({category.count})
                        </option>
                    ))}
                </select>

                {/* Popular Tags */}
                <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 6).map((tag) => (
                        <button
                            key={tag}
                            onClick={() => onFiltersChange({
                                ...filters,
                                tag: filters.tag === tag ? undefined : tag
                            })}
                            className="px-3 py-1 text-sm rounded-full transition-all"
                            style={filters.tag === tag
                                ? {
                                    backgroundColor: 'var(--accent-primary)',
                                    color: 'white'
                                }
                                : {
                                    backgroundColor: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)'
                                }
                            }
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Filters */}
            {(filters.search || filters.category || filters.tag) && (
                <div className="flex flex-wrap gap-2">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Active filters:</span>
                    {filters.search && (
                        <span className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)'
                            }}>
                            Search: &ldquo;{filters.search}&rdquo;
                            <button
                                onClick={() => onFiltersChange({ ...filters, search: undefined })}
                                style={{ color: 'var(--text-secondary)' }}
                                className="hover:opacity-75"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.category && (
                        <span className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            style={{
                                backgroundColor: 'var(--accent-primary)',
                                color: 'white'
                            }}>
                            Category: {blogCategories.find(c => c.slug === filters.category)?.name}
                            <button
                                onClick={() => onFiltersChange({ ...filters, category: undefined })}
                                className="hover:opacity-75 text-white"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.tag && (
                        <span className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            style={{
                                backgroundColor: 'var(--accent-secondary)',
                                color: 'white'
                            }}>
                            Tag: #{filters.tag}
                            <button
                                onClick={() => onFiltersChange({ ...filters, tag: undefined })}
                                className="hover:opacity-75 text-white"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    <button
                        onClick={() => onFiltersChange({})}
                        className="px-3 py-1 rounded-full text-sm transition-colors"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
};

export default function BlogPage() {
    const [filters, setFilters] = useState<BlogFilter>({});

    const featuredPosts = getFeaturedPosts();

    const filteredPosts = useMemo(() => {
        let posts = blogPosts;

        if (filters.search) {
            posts = searchPosts(filters.search);
        }

        if (filters.category) {
            posts = posts.filter(post => getPostsByCategory(filters.category!).includes(post));
        }

        if (filters.tag) {
            posts = posts.filter(post => getPostsByTag(filters.tag!).includes(post));
        }

        return posts;
    }, [filters]);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            paddingTop: '6rem',
            paddingBottom: '4rem',
            transition: 'all 0.3s ease'
        }}>
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                        Blog & Insights
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                        Thoughts, tutorials, and experiences about Flutter development, programming,
                        and the journey of building great mobile applications.
                    </p>
                </div>

                {/* Featured Posts */}
                {!filters.search && !filters.category && !filters.tag && featuredPosts.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                            <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                            Featured Posts
                        </h2>
                        <div className="space-y-8">
                            {featuredPosts.map((post) => (
                                <BlogCard key={post.id} post={post} featured={true} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Search and Filters */}
                <SearchAndFilter filters={filters} onFiltersChange={setFilters} />

                {/* All Posts */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                            <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                            All Posts ({filteredPosts.length})
                        </h2>
                    </div>

                    {filteredPosts.length > 0 ? (
                        <div className="grid lg:grid-cols-2 gap-8">
                            {filteredPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-color)'
                                }}>
                                <svg className="w-12 h-12" style={{ color: 'var(--text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                No posts found
                            </h3>
                            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                                Try adjusting your search criteria or browse all categories.
                            </p>
                            <button
                                onClick={() => setFilters({})}
                                className="px-6 py-3 rounded-lg transition-colors"
                                style={{
                                    backgroundColor: 'var(--accent-primary)',
                                    color: 'white'
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}