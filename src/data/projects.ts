import { Project } from '@/types/project';

export const projects: Project[] = [
    {
        id: '1',
        slug: 'focus-flow',
        title: 'Focus Flow',
        subtitle: 'A calm, guided focus timer for deep work',
        description:
            'Focus Flow is a beautifully crafted focus timer app designed to help you build deep focus habits. It features ambient sounds, customizable session modes, guided breathing exercises, and detailed analytics — all wrapped in a calming, minimal UI that keeps distractions away and lets you concentrate on what matters.',
        coverImage: '/assets/projectImage/focusflow/focusflow_ios_01.png',
        screenshots: [
            '/assets/projectImage/focusflow/focusflow_ios_01.png',
            '/assets/projectImage/focusflow/focusflow_ios_02.png',
            '/assets/projectImage/focusflow/focusflow_ios_03.png',
            '/assets/projectImage/focusflow/focusflow_ios_04.png',
            '/assets/projectImage/focusflow/focusflow_ios_05.png',
            '/assets/projectImage/focusflow/focusflow_ios_06.png',
            '/assets/projectImage/focusflow/focusflow_ios_07.png',
            '/assets/projectImage/focusflow/focusflow_ios_08.png',
        ],
        features: ['Focus timer', 'Session modes', '95+ sounds', 'Analytics', 'Breathing exercises', 'Pro tier'],
        techStack: ['Flutter', 'Dart', 'Riverpod', 'Hive', 'Firebase'],
        links: {
            github: 'https://github.com/Nabi-Rahmani',
            appStore: '#',
        },
        platform: 'ios',
    },
    {
        id: '2',
        slug: 'dev-discipline',
        title: 'Dev Discipline',
        subtitle: 'Build better habits, stay consistent',
        description:
            'Dev Discipline is a discipline-focused productivity app built with Flutter to help you stay consistent, build better habits, and track your progress with a clean, motivating UI. It features daily routines, habit tracking, progress insights, and streak building to keep you accountable and on track every day.',
        coverImage: '/assets/projectImage/day.png',
        screenshots: [
            '/assets/projectImage/day.png',
            '/assets/projectImage/plan.png',
            '/assets/projectImage/setting.png',
            '/assets/projectImage/insight.png',
        ],
        features: ['Daily routines', 'Habit tracking', 'Progress insights', 'Streak building', 'Clean UI/UX', 'Flutter'],
        techStack: ['Flutter', 'Dart', 'Provider', 'SQLite'],
        links: {
            github: 'https://github.com/Nabi-Rahmani',
            playStore: 'https://play.google.com/store/apps/details?id=com.nabirahmani.dev_discipline',
        },
        platform: 'android',
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
    return projects;
}
