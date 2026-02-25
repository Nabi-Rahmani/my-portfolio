export interface ProjectFeatureDetail {
    title: string;
    description: string;
    image?: string;
}

export interface LegalSection {
    title: string;
    content: string;
    list?: string[];
}

export interface LegalPage {
    lastUpdated: string;
    intro: string;
    sections: LegalSection[];
}

export interface Project {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    coverImage: string;
    iconLight?: string;
    iconDark?: string;
    heroImage?: string;
    screenshots: string[];
    features: string[];
    featureDetails?: ProjectFeatureDetail[];
    techStack: string[];
    links: {
        github?: string;
        appStore?: string;
        playStore?: string;
        privacy?: string;
        terms?: string;
    };
    platform: 'ios' | 'android' | 'both';
    privacyContent?: LegalPage;
    termsContent?: LegalPage;
}
