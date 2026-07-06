export interface UsesCategory {
    label: string;
    items: string[];
}

export const usesCategories: UsesCategory[] = [
    {
        label: 'Hardware',
        items: ['MacBook Pro (M-series)', 'iPhone', 'Android test device', 'LG UltraFine monitor'],
    },
    {
        label: 'Editor & Terminal',
        items: ['VS Code', 'Android Studio', 'iTerm2', 'Warp'],
    },
    {
        label: 'Flutter / Dart',
        items: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'Hive', 'RevenueCat', 'Firebase'],
    },
    {
        label: 'Design',
        items: ['Figma', 'SF Symbols', 'Material Symbols'],
    },
    {
        label: 'Web stack',
        items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
        label: 'Services',
        items: ['Supabase', 'GitHub Actions', 'Sentry', 'Mixpanel', 'Web3Forms'],
    },
];
