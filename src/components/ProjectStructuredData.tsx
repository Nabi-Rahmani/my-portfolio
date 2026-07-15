import type { Project } from '@/types/project';
import { getValidStoreUrl } from '@/lib/links';

const platformToOS: Record<Project['platform'], string> = {
    ios: 'iOS',
    android: 'Android',
    // iOS planned only — do not claim both stores in schema until App Store ships
    both: 'Android',
};

export default function ProjectStructuredData({ project }: { project: Project }) {
    const playStore = getValidStoreUrl(project.links.playStore);
    const appStore = getValidStoreUrl(project.links.appStore);
    const downloadUrl = playStore ?? appStore;
    const operatingSystem =
        playStore && appStore
            ? 'iOS, Android'
            : playStore
              ? 'Android'
              : appStore
                ? 'iOS'
                : platformToOS[project.platform];

    const data = {
        '@context': 'https://schema.org',
        '@type': 'MobileApplication',
        name: project.title,
        description: project.subtitle,
        operatingSystem,
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
