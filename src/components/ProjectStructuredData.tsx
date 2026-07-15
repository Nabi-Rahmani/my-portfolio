import type { Project } from '@/types/project';
import { getValidStoreUrl } from '@/lib/links';

const platformToOS: Record<Project['platform'], string> = {
    ios: 'iOS',
    android: 'Android',
    both: 'iOS, Android',
};

export default function ProjectStructuredData({ project }: { project: Project }) {
    const playStore = getValidStoreUrl(project.links.playStore);
    const appStore = getValidStoreUrl(project.links.appStore);
    const downloadUrl = playStore ?? appStore;

    const data = {
        '@context': 'https://schema.org',
        '@type': 'MobileApplication',
        name: project.title,
        description: project.subtitle,
        operatingSystem: platformToOS[project.platform],
        applicationCategory: 'ProductivityApplication',
        url: `https://codewithnabi.dev/projects/${project.slug}`,
        image: `https://codewithnabi.dev${project.coverImage}`,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        ...(downloadUrl ? { downloadUrl } : {}),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
        />
    );
}
