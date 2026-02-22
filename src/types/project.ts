export interface Project {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    coverImage: string;
    screenshots: string[];
    features: string[];
    techStack: string[];
    links: {
        github?: string;
        appStore?: string;
        playStore?: string;
    };
    platform: 'ios' | 'android' | 'both';
}
