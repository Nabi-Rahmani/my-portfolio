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

/** Owner-supplied outcome chip — never invent; omit when unknown. */
export interface ProjectMetric {
    label: string;
    value: string;
}

export interface ProjectEngineeringHighlight {
    title: string;
    description: string;
}

export interface ProjectCaseStudy {
    role: string;
    responsibilities: string[];
    engineeringHighlights: ProjectEngineeringHighlight[];
}

export interface Project {
    id: string;
    slug: string;
    title: string;
    /** Short hiring-manager value line (cards + detail hero). */
    subtitle: string;
    description: string;
    coverImage: string;
    iconLight?: string;
    iconDark?: string;
    heroImage?: string;
    screenshots: string[];
    features: string[];
    featureDetails?: ProjectFeatureDetail[];
    featureSubtitle?: string;
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
    /** True shipping badges only (e.g. Live on Google Play) — not fake metrics. */
    badges?: string[];
    /** Hiring-focused context backed by the shipped product and its implementation. */
    caseStudy: ProjectCaseStudy;
    /**
     * Optional real outcomes. Render only when present and owner-supplied.
     * Do not invent downloads, ratings, or social proof.
     */
    metrics?: ProjectMetric[];
}
