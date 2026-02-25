import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/data/projects';
import TermsClient from './TermsClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project || !project.links.terms) {
        return { title: 'Not Found' };
    }

    return {
        title: `Terms of Use - ${project.title}`,
        description: `Terms of Use for ${project.title} by Mohammad Nabi Rahmani.`,
    };
}

export async function generateStaticParams() {
    return projects
        .filter((p) => p.links.terms)
        .map((p) => ({ slug: p.slug }));
}

export default async function TermsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project || !project.links.terms) {
        notFound();
    }

    return <TermsClient project={project} />;
}
