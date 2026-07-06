export interface NowSection {
    label: string;
    items: string[];
}

export const nowData: { lastUpdated: string; sections: NowSection[] } = {
    lastUpdated: 'July 6, 2026',
    sections: [
        {
            label: 'Building',
            items: [
                'Polishing Focus Flow, Dev Discipline, and Mihrab by Raha based on user feedback',
                'Improving this portfolio\'s conversion, SEO, and proof surfaces',
            ],
        },
        {
            label: 'Learning',
            items: [
                'Deeper Riverpod code-generation patterns',
                'Supabase Edge Functions for backend features',
            ],
        },
        {
            label: 'Reading',
            items: [
                'Flutter and Dart release notes and RFCs',
                'Indie app marketing and App Store optimization write-ups',
            ],
        },
    ],
};
