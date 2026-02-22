import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/data/projects';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found - Muhammad Nabi Rahmani',
            description: 'The requested project could not be found.',
        };
    }

    return {
        title: `${project.title} - Muhammad Nabi Rahmani`,
        description: project.subtitle,
        keywords: [...project.techStack, ...project.features, 'Flutter', 'Mobile App'],
        openGraph: {
            title: project.title,
            description: project.subtitle,
            url: `https://codewithnabi.dev/projects/${project.slug}`,
            type: 'website',
            images: [{ url: project.coverImage }],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.subtitle,
        },
    };
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetailClient project={project} />;
}
