import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/data/projects';
import LegalDocument from '@/components/LegalDocument';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project || !project.links.privacy) {
        return { title: 'Not Found' };
    }

    return {
        title: `Privacy Policy - ${project.title}`,
        description: `Privacy Policy for ${project.title} by Muhammad Nabi Rahmani.`,
        alternates: { canonical: `/projects/${project.slug}/privacy` },
    };
}

export async function generateStaticParams() {
    return projects
        .filter((p) => p.links.privacy)
        .map((p) => ({ slug: p.slug }));
}

export default async function PrivacyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project || !project.links.privacy) {
        notFound();
    }

    return <LegalDocument project={project} kind="privacy" />;
}
