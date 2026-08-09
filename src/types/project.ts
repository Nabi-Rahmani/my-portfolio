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
    /** Concise product problem — evidence-backed, non-empty. */
    challenge: string;
    /** How the product was shaped/built — evidence-backed, non-empty. */
    approach: string;
    /**
     * Honest shipped narrative proof (not an unverified metric).
     * Non-empty and distinct per project.
     */
    outcome: string;
}

/** Still image entry in ordered project media. */
export interface ProjectImageMedia {
    type: 'image';
    src: string;
    /** Describes the visible product capability (not “screenshot 1”). */
    alt: string;
}

/** Demo video entry in ordered project media. */
export interface ProjectVideoMedia {
    type: 'video';
    src: string;
    poster: string;
    /** Accessible name for the demo control / element. */
    label: string;
}

/** Discriminated media union — renderers switch on `type`. */
export type ProjectMedia = ProjectImageMedia | ProjectVideoMedia;

export interface Project {
    id: string;
    slug: string;
    title: string;
    /** Short hiring-manager value line (cards + detail hero). */
    subtitle: string;
    description: string;
    /** Dedicated 1200×630 metadata/social fallback. */
    coverImage: string;
    iconLight?: string;
    iconDark?: string;
    /**
     * Ordered typed media (stills + optional demo).
     * Lead still is first image; components select generically — no slug branches.
     */
    media: ProjectMedia[];
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
