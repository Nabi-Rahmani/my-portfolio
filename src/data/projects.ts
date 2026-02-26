import type { Project } from '@/types/project';

export const projects: Project[] = [
    {
        id: '1',
        slug: 'focus-flow',
        title: 'Focus Flow',
        subtitle: 'A calm, guided focus timer for deep work',
        description:
            'Focus Flow is a beautifully crafted focus timer app designed to help you build deep focus habits. It features ambient sounds, customizable session modes, guided breathing exercises, and detailed analytics — all wrapped in a calming, minimal UI that keeps distractions away and lets you concentrate on what matters.',
        coverImage: '/assets/projects/focus-flow/project-cover/focusflow_hero_1920x1080.png',
        iconLight: '/assets/projects/focus-flow/icons/icon-dark.png',
        iconDark: '/assets/projects/focus-flow/icons/icon-light.png',
        heroImage: '/assets/projects/focus-flow/Main-image/header.png',
        screenshots: [
            '/assets/projects/focus-flow/screenshots/01.png',
            '/assets/projects/focus-flow/screenshots/02.png',
            '/assets/projects/focus-flow/screenshots/03.png',
            '/assets/projects/focus-flow/screenshots/04.png',
            '/assets/projects/focus-flow/screenshots/05.png',
            '/assets/projects/focus-flow/screenshots/06.png',
            '/assets/projects/focus-flow/screenshots/07.png',
            '/assets/projects/focus-flow/screenshots/08.png',
        ],
        features: ['Focus timer', 'Session modes', '95+ sounds', 'Analytics', 'Breathing exercises', 'Pro tier'],
        featureSubtitle: 'Everything you need to stay focused',
        featureDetails: [
            {
                title: 'Pomodoro Focus Timer',
                description: 'A beautifully designed Pomodoro timer with customizable focus and break durations. Stay in the zone with visual progress and gentle transitions between sessions.',
            },
            {
                title: 'Multiple Session Modes',
                description: 'Choose from Pomodoro, custom timer, or stopwatch modes. Each mode adapts to your workflow — whether you need structured intervals or free-flow deep work.',
            },
            {
                title: '95+ Ambient Sounds',
                description: 'Immerse yourself in a library of 95+ high-quality ambient sounds — rain, forest, cafe, ocean, and more. Mix and match to create your perfect focus atmosphere.',
            },
            {
                title: 'Deep Analytics & Insights',
                description: 'Track your focus sessions with detailed daily and weekly analytics. See completion rates, total focus time, streak history, and trends that reveal your productivity patterns.',
            },
            {
                title: 'Guided Breathing Exercises',
                description: 'Reset your mind between sessions with built-in guided breathing exercises. Choose from multiple patterns designed to reduce stress and sharpen concentration.',
            },
            {
                title: 'Tasks & To-Do Integration',
                description: 'Plan your focus sessions with an integrated task manager. Create tasks, track completion, and tie your timer sessions directly to what you need to accomplish.',
            },
        ],
        techStack: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'SQLite', 'RevenueCat'],
        links: {
            github: 'https://github.com/Nabi-Rahmani',
            appStore: '#',
            privacy: '/projects/focus-flow/privacy',
            terms: '/projects/focus-flow/terms',
        },
        platform: 'both',
        privacyContent: {
            lastUpdated: 'February 10, 2026',
            intro: 'Welcome to FocusFlow. We are committed to protecting your privacy and ensuring you have a positive experience using our productivity and focus timer application. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application FocusFlow. Please read this privacy policy carefully.',
            sections: [
                {
                    title: '1. Information You Provide',
                    content: 'We collect information you directly provide when using the app:',
                    list: [
                        'Task titles, descriptions, completion status, and timestamps',
                        'Timer duration preferences (focus and break lengths)',
                        'Daily reminder notification settings',
                        'Sound preferences, volume settings, and mixing preferences',
                        'Theme, appearance customization, and haptic feedback preferences',
                    ],
                },
                {
                    title: '2. Automatically Collected Information',
                    content: 'The app automatically collects usage and device data to provide core functionality:',
                    list: [
                        'Focus session duration, completion data, and category counts',
                        'Daily and weekly progress statistics and streak tracking',
                        'Device type, model, operating system version, and app version',
                        'Timezone information for notification scheduling',
                        'Selected ambient sounds, volume levels, and audio playback history',
                    ],
                },
                {
                    title: '3. How We Use Your Information',
                    content: 'We use collected information to operate the Pomodoro timer, manage your tasks and to-do lists, display progress statistics and insights, sync data to home screen widgets, send daily reminder notifications, personalize the app based on your preferences, and monitor app performance and stability.',
                },
                {
                    title: '4. Data Storage & Security',
                    content: 'All your personal data is stored locally on your device. Tasks are stored in a local SQLite database using Drift. Settings and preferences are stored using SharedPreferences. We do not transmit your task data, session history, or personal statistics to any remote servers. Data is stored in sandboxed app storage protected by the operating system.',
                },
                {
                    title: '5. Widgets & Live Activities',
                    content: 'When you use iOS Live Activities or Home Widgets, timer status and progress data is shared with widget extensions via App Groups (iOS) or SharedPreferences (Android). This data remains local to your device and is not transmitted elsewhere. Widget data is encrypted and protected by device security.',
                },
                {
                    title: '6. Notifications',
                    content: 'If you enable daily reminders, notification scheduling uses your device\'s local timezone. Notification content is generated locally on your device. No notification data is sent to external services. You can disable notifications at any time in Settings.',
                },
                {
                    title: '7. Children\'s Privacy',
                    content: 'Our App is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.',
                },
                {
                    title: '8. Your Privacy Rights',
                    content: 'You have the right to access, delete, and export your data. You can opt out of analytics through device settings and manage notifications in app Settings. California residents have additional rights under CCPA, and European residents have rights under GDPR including data portability and the right to object to processing.',
                },
                {
                    title: '9. Data Breach Notification',
                    content: 'In the unlikely event of a data breach, we will notify affected users within 72 hours, describe the nature of the breach, provide recommended actions, and report to relevant authorities as required by law.',
                },
                {
                    title: '10. Changes to This Policy',
                    content: 'We may update this Privacy Policy from time to time. We will notify you by updating the "Last Updated" date, displaying an in-app notification for material changes, and posting the new Privacy Policy in the app. Your continued use constitutes acceptance of the updated policy.',
                },
                {
                    title: '11. Contact Us',
                    content: 'If you have any questions about this Privacy Policy, please contact us at codewithnabi@gmail.com or visit https://www.codewithnabi.dev/.',
                },
            ],
        },
        termsContent: {
            lastUpdated: 'February 10, 2026',
            intro: 'These Terms of Use constitute a legally binding agreement between you and Nabi Rahmani governing your access to and use of the FocusFlow mobile application. By downloading, installing, or using the App, you acknowledge that you have read, understood, and agree to be bound by these Terms.',
            sections: [
                {
                    title: '1. License Grant',
                    content: 'Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to download, install, and use the App on devices you own or control for personal, non-commercial purposes.',
                },
                {
                    title: '2. License Restrictions',
                    content: 'You agree NOT to:',
                    list: [
                        'Copy, modify, or create derivative works of the App',
                        'Reverse engineer, decompile, or disassemble the App',
                        'Remove, alter, or obscure any proprietary notices',
                        'Sell, rent, lease, sublicense, or distribute the App',
                        'Use the App for any illegal or unauthorized purpose',
                        'Circumvent any security features or access restrictions',
                        'Use automated systems or bots to access the App',
                    ],
                },
                {
                    title: '3. Your Data',
                    content: 'You retain all rights to the tasks, notes, and data you create in the App. All data is stored locally on your device. We do not access, store, or transmit your personal tasks or session data to our servers. You are responsible for backing up your data; we are not liable for data loss.',
                },
                {
                    title: '4. Intellectual Property',
                    content: 'The App, including its design, graphics, text, code, interface, sounds, and all intellectual property rights, is owned by us and protected by copyright, trademark, and other laws. "FocusFlow" and associated logos are our trademarks. All ambient sounds and audio content are licensed or owned by us and may not be extracted separately.',
                },
                {
                    title: '5. Third-Party Services',
                    content: 'The App is distributed through Apple App Store (iOS) and Google Play Store (Android), subject to their respective Terms of Service. The App may integrate with notification services and analytics services. We are not responsible for third-party services or their terms.',
                },
                {
                    title: '6. Disclaimer of Warranties',
                    content: 'THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. Medical Disclaimer: FocusFlow is a productivity tool, not a medical device. It is not intended to diagnose, treat, cure, or prevent any medical condition.',
                },
                {
                    title: '7. Limitation of Liability',
                    content: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE APP IN THE PAST 12 MONTHS.',
                },
                {
                    title: '8. Indemnification',
                    content: 'You agree to indemnify, defend, and hold harmless FocusFlow and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your use of the App, your violation of these Terms, or your violation of any rights of another party.',
                },
                {
                    title: '9. Updates & Modifications',
                    content: 'We may release updates, bug fixes, and new features. Updates may be required for continued use. We may update these Terms at any time. Material changes will be notified through the App. Continued use after changes constitutes acceptance.',
                },
                {
                    title: '10. Termination',
                    content: 'You may stop using the App at any time by uninstalling it. We may suspend or terminate your access if you violate these Terms, engage in fraudulent activity, we discontinue the App, or as required by law. Upon termination, your license ends immediately.',
                },
                {
                    title: '11. Contact Us',
                    content: 'For questions about these Terms, please contact us at codewithnabi@gmail.com or visit https://www.codewithnabi.dev/.',
                },
            ],
        },
    },
    {
        id: '2',
        slug: 'dev-discipline',
        title: 'Dev Discipline',
        subtitle: 'Build better habits, stay consistent, become unstoppable',
        description:
            'Dev Discipline is a discipline-focused productivity app that helps you stay consistent, build powerful habits, and track your progress with a clean, motivating UI. Featuring structured daily plans, habit tracking, deep progress insights, streak building, and journaling — everything you need to stay accountable and on track every single day.',
        coverImage: '/assets/projects/dev-discipline/project-cover/devdiscipline-cover.png',
        iconLight: '/assets/projects/dev-discipline/icons/android-icon-foreground-dark.png',
        iconDark: '/assets/projects/dev-discipline/icons/android-icon-foreground-light.png',
        heroImage: '/assets/projects/dev-discipline/Main-image/header.png',
        screenshots: [
            '/assets/projects/dev-discipline/screenshots/devdiscipline_01.png',
            '/assets/projects/dev-discipline/screenshots/devdiscipline_02.png',
            '/assets/projects/dev-discipline/screenshots/devdiscipline_03.png',
            '/assets/projects/dev-discipline/screenshots/devdiscipline_04.png',
            '/assets/projects/dev-discipline/screenshots/devdiscipline_05.png',
            '/assets/projects/dev-discipline/screenshots/devdiscipline_06.png',
        ],
        features: ['60-Day Plans', 'Daily Tasks', 'Streak Tracking', 'Progress Insights', 'Journaling', 'Gamification'],
        featureSubtitle: 'Everything you need to stay disciplined',
        featureDetails: [
            {
                title: 'Structured 60-Day Plans',
                description: 'Follow a curated 60-day discipline journey with daily tasks designed to build consistency. Each day brings focused challenges that compound into real habits.',
            },
            {
                title: 'Daily Task Tracking',
                description: 'Check off your daily tasks with a satisfying tap. See your progress for each day at a glance and never lose track of where you stand.',
            },
            {
                title: 'Streak Building',
                description: 'Build and maintain streaks that keep you motivated. Miss a day? Streak freezes have your back. Watch your consistency grow day by day.',
            },
            {
                title: 'Deep Progress Insights',
                description: 'Visualize your journey with detailed analytics — completion rates, streak history, and performance trends that show how far you have come.',
            },
            {
                title: 'Daily Journaling',
                description: 'Reflect on your day with built-in journaling. Track your mood, write notes, and build self-awareness alongside your discipline habits.',
            },
            {
                title: 'Gamification & Badges',
                description: 'Earn badges and celebrations as you hit milestones. Every achievement is a reminder of your growth and dedication.',
            },
        ],
        techStack: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'SQLite', 'RevenueCat'],
        links: {
            github: 'https://github.com/Nabi-Rahmani',
            playStore: 'https://play.google.com/store/apps/details?id=com.nabirahmani.dev_discipline',
            privacy: '/projects/dev-discipline/privacy',
            terms: '/projects/dev-discipline/terms',
        },
        platform: 'android',
        privacyContent: {
            lastUpdated: 'February 06, 2026',
            intro: 'At Dev Discipline, owned by Mohammad Nabi Rahmani, we value your privacy. This Privacy Policy describes how we handle your personal information when you use our Dev Discipline mobile application. By using our Service, you agree to the terms of this Policy.',
            sections: [
                {
                    title: '1. Data Storage',
                    content: 'Dev Discipline is designed with an offline-first approach. Your app data (progress, notes, preferences) is stored locally on your device and is not transmitted to our servers.',
                },
                {
                    title: '2. Subscriptions & Payments',
                    content: 'Dev Discipline offers optional paid subscriptions (Monthly and Yearly plans) to unlock premium features. All payment processing is handled by Google Play Billing (Android), Apple App Store (iOS), and RevenueCat — our subscription management provider. We do not directly collect, store, or have access to your credit card or payment details.',
                },
                {
                    title: '3. Subscription Terms',
                    content: 'Subscriptions auto-renew unless cancelled at least 24 hours before the end of the current billing period. You can manage or cancel your subscription at any time through your app store account settings. No refunds are provided for partial billing periods.',
                },
                {
                    title: '4. Information We Do Not Collect',
                    content: 'We do not collect, store, or share:',
                    list: [
                        'Personal identification information (name, email, address)',
                        'Usage analytics or behavioral tracking data',
                        'Advertising identifiers',
                        'Location data',
                    ],
                },
                {
                    title: '5. Your Data Ownership',
                    content: 'All data you create in Dev Discipline belongs to you. It remains on your device and is never transmitted externally. Deleting the app removes all locally stored data.',
                },
                {
                    title: '6. Security',
                    content: 'Since your data is stored locally, its security depends on your device\'s security settings. We recommend using a strong password or biometric authentication on your device.',
                },
                {
                    title: '7. Children\'s Privacy',
                    content: 'Our Service is not directed to anyone under the age of 13. We do not knowingly collect personal information from children.',
                },
                {
                    title: '8. Changes to this Policy',
                    content: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.',
                },
                {
                    title: '9. Contact Us',
                    content: 'If you have questions about this Privacy Policy, contact us at codewithnabi@gmail.com.',
                },
            ],
        },
        termsContent: {
            lastUpdated: 'February 06, 2026',
            intro: 'Thank you for choosing Dev Discipline, owned by Mohammad Nabi Rahmani. Please read these Terms of Use carefully before using the Dev Discipline mobile application. By accessing or using our Service, you agree to be bound by these Terms.',
            sections: [
                {
                    title: '1. Acceptance of Terms',
                    content: 'By accessing or using our Service, you confirm your agreement to be bound by these Terms. If you do not agree to these Terms, please do not use our Service.',
                },
                {
                    title: '2. Changes to Terms',
                    content: 'We may modify these Terms at any time. Modified Terms become effective immediately upon posting. Your continued use of the Service constitutes acceptance of the modified Terms.',
                },
                {
                    title: '3. Subscriptions & Payments',
                    content: 'Dev Discipline offers optional paid subscriptions to unlock premium features. Payment is charged to your Google Play or Apple App Store account at confirmation of purchase. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period. No refunds are provided for partial unused billing periods, except where required by applicable law.',
                },
                {
                    title: '4. Free Trial',
                    content: 'We may offer free trial periods for premium features. If you do not cancel before the trial ends, your subscription will automatically convert to a paid subscription and you will be charged the applicable fee.',
                },
                {
                    title: '5. Privacy and Data Collection',
                    content: 'We respect the privacy of our users. Your app data is stored locally on your device. For more information, please refer to our Privacy Policy.',
                },
                {
                    title: '6. Intellectual Property',
                    content: 'All content, features, and functionality of the Service — including text, graphics, logos, and software — are the property of Mohammad Nabi Rahmani and are protected by applicable intellectual property laws.',
                },
                {
                    title: '7. Acceptable Use',
                    content: 'You agree not to reverse engineer, decompile, or disassemble the Service; attempt to bypass any subscription or payment mechanisms; or use the Service for any unlawful purpose.',
                },
                {
                    title: '8. Limitations of Liability',
                    content: 'To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising from your use of the Service.',
                },
                {
                    title: '9. Disclaimer of Warranties',
                    content: 'The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied.',
                },
                {
                    title: '10. Governing Law',
                    content: 'These Terms shall be governed by and interpreted in accordance with the laws of Turkey.',
                },
                {
                    title: '11. Contact Us',
                    content: 'If you have any questions about these Terms, contact us at codewithnabi@gmail.com.',
                },
            ],
        },
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
    return projects;
}
