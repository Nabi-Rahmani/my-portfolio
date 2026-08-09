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
        iconLight: '/assets/projects/focus-flow/app-icon.png',
        iconDark: '/assets/projects/focus-flow/app-icon.png',
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
            // appStore omitted until a real App Store URL exists (never use '#')
            playStore: 'https://play.google.com/store/apps/details?id=com.nabirahmani.focus_flow',
            privacy: '/projects/focus-flow/privacy',
            terms: '/projects/focus-flow/terms',
        },
        platform: 'both',
        badges: ['Live on Google Play', 'Actively maintained', 'Solo-built'],
        caseStudy: {
            role: 'Independent product engineer',
            responsibilities: [
                'Product design',
                'Flutter architecture',
                'Development',
                'Play Store delivery',
                'Ongoing maintenance',
            ],
            engineeringHighlights: [
                {
                    title: 'Local-first by design',
                    description:
                        'Drift and SQLite keep tasks, sessions, and progress dependable without a network connection.',
                },
                {
                    title: 'Predictable product state',
                    description:
                        'Riverpod separates timer state, task workflows, settings, and persistence into maintainable boundaries.',
                },
                {
                    title: 'Production delivery',
                    description:
                        'RevenueCat supports subscriptions while Supabase delivers optional ambient sound packs on demand.',
                },
            ],
        },
        privacyContent: {
            lastUpdated: 'May 23, 2026',
            intro: 'Welcome to FocusFlow. We are committed to protecting your privacy and ensuring you have a positive experience using our productivity and focus timer application. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application FocusFlow. The app uses anonymous product analytics (Mixpanel) and crash reporting (Sentry) to improve stability and user experience, and downloads optional ambient sound packs on demand from our cloud storage (Supabase). Please read this privacy policy carefully.',
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
                    content: 'The app automatically collects usage and device data to provide core functionality and improve the app:',
                    list: [
                        'Focus session duration, completion data, and category counts',
                        'Daily and weekly progress statistics and streak tracking',
                        'Device type, model, operating system version, and app version',
                        'Timezone information for notification scheduling',
                        'Selected ambient sounds, volume levels, and audio playback history',
                        'Anonymized analytics events (feature usage, session completions, screen views) via Mixpanel',
                        'Crash reports, error stack traces, and breadcrumbs via Sentry (no personal content)',
                        'An anonymous device identifier generated locally — not linked to your name, email, or account',
                    ],
                },
                {
                    title: '3. How We Use Your Information',
                    content: 'We use collected information to operate the Pomodoro timer, manage your tasks and to-do lists, display progress statistics and insights, sync data to home screen widgets, send daily reminder notifications, personalize the app based on your preferences, and monitor app performance and stability.',
                },
                {
                    title: '4. Data Storage & Security',
                    content: 'Your personal content — tasks, session history, progress statistics, and preferences — is stored locally on your device. Tasks are stored in a local SQLite database using Drift, and settings are stored using SharedPreferences, both in sandboxed app storage protected by the operating system. We do not upload your task data, notes, or personal statistics to our servers. However, anonymized analytics events are transmitted to Mixpanel, crash and error data are transmitted to Sentry, and ambient sound files are downloaded over HTTPS from our Supabase Storage bucket when you choose to use them. See the sections below for details on each.',
                },
                {
                    title: '5. Analytics (Mixpanel)',
                    content: 'We use Mixpanel, Inc. to understand how the app is used so we can improve features and fix issues. Mixpanel receives anonymized event data such as feature interactions, session completions, screen views, and app/OS/device metadata, identified only by a randomly generated anonymous device ID. We do not send your task titles, notes, name, email, account information, or precise location to Mixpanel. You can disable analytics at any time from in-app Settings → Privacy; once disabled, no further events are sent. Mixpanel\'s privacy policy is available at https://mixpanel.com/legal/privacy-policy.',
                },
                {
                    title: '6. Crash Reporting (Sentry)',
                    content: 'We use Sentry (Functional Software, Inc.) to detect and diagnose crashes and errors. Sentry receives stack traces, error messages, breadcrumbs, and app/OS/device information, tagged with an anonymous install ID. Data is only transmitted when an error or crash occurs. We do not include your task content, notes, or any user-authored text in crash reports. Sentry\'s privacy policy is available at https://sentry.io/privacy/.',
                },
                {
                    title: '7. Cloud-Hosted Sounds (Supabase Storage)',
                    content: 'Ambient sound packs are hosted on Supabase Storage and downloaded to your device over HTTPS the first time you select a sound. Downloaded sounds are cached locally so they can play offline afterward. To serve these files, Supabase processes standard request metadata such as IP address, user agent, and timestamp. No account, login, task data, or listening history is sent to Supabase. Supabase\'s privacy policy is available at https://supabase.com/privacy.',
                },
                {
                    title: '8. Widgets & Live Activities',
                    content: 'When you use iOS Live Activities or Home Widgets, timer status and progress data is shared with widget extensions via App Groups (iOS) or SharedPreferences (Android). This data remains local to your device and is not transmitted elsewhere. Widget data is encrypted and protected by device security.',
                },
                {
                    title: '9. Notifications',
                    content: 'If you enable daily reminders, notification scheduling uses your device\'s local timezone. Notification content is generated locally on your device. No notification data is sent to external services. You can disable notifications at any time in Settings.',
                },
                {
                    title: '10. Children\'s Privacy',
                    content: 'Our App is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.',
                },
                {
                    title: '11. Your Privacy Rights',
                    content: 'You have the right to access, delete, and export your data. You can opt out of Mixpanel analytics at any time from in-app Settings → Privacy; opting out stops further analytics collection but does not retroactively remove previously sent anonymous events. Crash reporting can be disabled by uninstalling the app. Notifications can be managed in app Settings. California residents have additional rights under CCPA, and European residents have rights under GDPR including data portability and the right to object to processing.',
                },
                {
                    title: '12. Data Breach Notification',
                    content: 'In the unlikely event of a data breach, we will notify affected users within 72 hours, describe the nature of the breach, provide recommended actions, and report to relevant authorities as required by law.',
                },
                {
                    title: '13. Changes to This Policy',
                    content: 'We may update this Privacy Policy from time to time. We will notify you by updating the "Last Updated" date, displaying an in-app notification for material changes, and posting the new Privacy Policy in the app. Your continued use constitutes acceptance of the updated policy.',
                },
                {
                    title: '14. Contact Us',
                    content: 'If you have any questions about this Privacy Policy, please contact us at codewithnabi@gmail.com or visit https://www.codewithnabi.dev/.',
                },
            ],
        },
        termsContent: {
            lastUpdated: 'May 23, 2026',
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
                    content: 'The App is distributed through Apple App Store (iOS) and Google Play Store (Android), subject to their respective Terms of Service. The App also integrates with the following third-party services: Mixpanel for anonymized product analytics, Sentry for crash and error reporting, and Supabase Storage for hosting ambient sound packs that are downloaded to your device on demand. Use of these services is governed by their own terms and privacy policies, and we are not responsible for third-party services or their terms.',
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
        iconLight: '/assets/projects/dev-discipline/app-icon.png',
        iconDark: '/assets/projects/dev-discipline/app-icon.png',
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
            // appStore omitted until a real App Store URL exists (never use '#')
            playStore: 'https://play.google.com/store/apps/details?id=com.nabirahmani.dev_discipline',
            privacy: '/projects/dev-discipline/privacy',
            terms: '/projects/dev-discipline/terms',
        },
        platform: 'android',
        badges: ['Live on Google Play', 'Actively maintained', 'Solo-built'],
        caseStudy: {
            role: 'Independent product engineer',
            responsibilities: [
                'Product design',
                'Flutter architecture',
                'Development',
                'Play Store delivery',
                'Ongoing maintenance',
            ],
            engineeringHighlights: [
                {
                    title: 'Durable daily progress',
                    description:
                        'Plans, streaks, journal entries, and completion history live in a local Drift database.',
                },
                {
                    title: 'State that scales',
                    description:
                        'Riverpod keeps the plan, habit, progress, and subscription flows explicit and testable.',
                },
                {
                    title: 'A complete release loop',
                    description:
                        'The product combines RevenueCat subscriptions with production Play Store delivery and maintenance.',
                },
            ],
        },
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
    {
        id: '3',
        slug: 'mihrab-by-raha',
        title: 'Raha',
        subtitle: 'A peaceful Islamic companion for your daily worship',
        description:
            'Raha is a thoughtfully designed Islamic lifestyle app to support your daily spiritual routine. From accurate prayer times and Quran reading to dhikr, Islamic calendar guidance, and a curated library, it brings your essentials into one calm, focused experience.',
        coverImage: '/assets/projects/mihrab-by-raha/project-cover/cover_mihrab_by_raha.png',
        iconLight: '/assets/projects/mihrab-by-raha/app-icon.png',
        iconDark: '/assets/projects/mihrab-by-raha/app-icon.png',
        heroImage: '/assets/projects/mihrab-by-raha/main-image/Raha%20Mihrab.png',
        screenshots: [
            '/assets/projects/mihrab-by-raha/screenshots/01_prayer_times.png',
            '/assets/projects/mihrab-by-raha/screenshots/02_quran.png',
            '/assets/projects/mihrab-by-raha/screenshots/03_calendar.png',
            '/assets/projects/mihrab-by-raha/screenshots/04_dhikr.png',
            '/assets/projects/mihrab-by-raha/screenshots/05_library.png',
            '/assets/projects/mihrab-by-raha/screenshots/06_themes.png',
        ],
        features: ['Prayer Times', 'Quran Reader', 'Hijri Calendar', 'Daily Dhikr', 'Islamic Library', 'Themes'],
        featureSubtitle: 'Everything you need for a consistent spiritual routine',
        featureDetails: [
            {
                title: 'Accurate Prayer Times',
                description: 'Stay connected with timely prayer reminders and a clean overview of all five daily prayers based on your location and selected method.',
            },
            {
                title: 'Beautiful Quran Reading',
                description: 'Read the Quran in a clear, distraction-free interface designed for comfort and reflection, whether you are reading daily or revisiting selected surahs.',
            },
            {
                title: 'Hijri Calendar Guidance',
                description: 'Track Islamic dates and upcoming occasions with an easy-to-read Hijri calendar that helps you plan meaningful days and worship moments.',
            },
            {
                title: 'Dhikr and Remembrance',
                description: 'Build consistency in remembrance with dedicated dhikr flows that are simple, calming, and easy to return to throughout the day.',
            },
            {
                title: 'Curated Islamic Library',
                description: 'Access a growing collection of essential Islamic content in one place so you can learn, revisit, and reflect without jumping between multiple apps.',
            },
            {
                title: 'Personal Themes and Mood',
                description: 'Customize the look and feel with soothing themes that match your preference and keep your spiritual routine visually calm and personal.',
            },
        ],
        techStack: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'SQLite'],
        links: {
            github: 'https://github.com/Nabi-Rahmani',
            // appStore omitted until a real App Store URL exists (never use '#')
            playStore: 'https://play.google.com/store/apps/details?id=com.nabirahmani.raha',
            privacy: '/projects/mihrab-by-raha/privacy',
            terms: '/projects/mihrab-by-raha/terms',
        },
        platform: 'both',
        badges: ['Live on Google Play', 'Actively maintained', 'Solo-built'],
        caseStudy: {
            role: 'Independent product engineer',
            responsibilities: [
                'Product design',
                'Flutter architecture',
                'Development',
                'Play Store delivery',
                'Ongoing maintenance',
            ],
            engineeringHighlights: [
                {
                    title: 'Daily use without friction',
                    description:
                        'Prayer, Quran, calendar, and dhikr experiences are structured to stay useful with local data.',
                },
                {
                    title: 'Clear application boundaries',
                    description:
                        'Riverpod, Drift, and SQLite separate content, preferences, and daily worship state.',
                },
                {
                    title: 'Production observability',
                    description:
                        'Supabase serves optional audio while Mixpanel and Sentry support product learning and reliability.',
                },
            ],
        },
        privacyContent: {
            lastUpdated: 'May 23, 2026',
            intro: 'Raha ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application Mihrab by Raha. The app uses anonymous product analytics (Mixpanel) and crash reporting (Sentry) to improve stability and user experience, and downloads optional audio content (such as Adhan calls and recitations) on demand from our cloud storage (Supabase). Please read this privacy policy carefully.',
            sections: [
                {
                    title: '1. Information We Collect',
                    content: 'Since Raha emphasizes full functionality without account creation, we collect minimal personal data. Automatically collected information includes device information (model, OS version, anonymous device identifiers), IP address (used only for location-based prayer time calculation, not stored), approximate location (used solely for prayer time detection — not stored or transmitted), and anonymized usage statistics and crash logs. User-provided information stored locally only includes:',
                    list: [
                        'Habit tracking data (completion status, streaks)',
                        'Prayer time preferences (calculation method, offsets)',
                        'Custom habit definitions',
                        'Notification preferences',
                        'Theme and appearance settings',
                    ],
                },
                {
                    title: '2. How We Use Your Information',
                    content: 'We use your information to:',
                    list: [
                        'Calculate accurate prayer times based on your location (processed locally)',
                        'Provide habit tracking, dhikr, Quran reading, and calendar functionality (stored locally)',
                        'Send prayer time and habit reminders (scheduled locally)',
                        'Improve app performance and user experience (through anonymized analytics via Mixpanel)',
                        'Diagnose crashes and errors (via Sentry, only on failure)',
                        'Deliver downloadable audio content (Adhan, recitations) via Supabase Storage',
                        'Enable premium features through RevenueCat (payment processing only)',
                    ],
                },
                {
                    title: '3. Data Storage and Security',
                    content: 'Your personal content — habit tracking, prayer preferences, dhikr counts, Quran reading positions, and settings — is stored exclusively on your device. No personally identifiable information is transmitted to or stored on our servers. However, anonymized analytics events are transmitted to Mixpanel, crash and error data are transmitted to Sentry, and audio assets are downloaded over HTTPS from our Supabase Storage bucket when you choose to use them. We employ industry-standard security measures to protect any transmitted data. All local data storage uses Flutter\'s secure storage mechanisms where appropriate.',
                },
                {
                    title: '4. Analytics (Mixpanel)',
                    content: 'We use Mixpanel, Inc. to understand how the app is used so we can improve features and fix issues. Mixpanel receives anonymized event data such as feature interactions, screen views, and app/OS/device metadata, identified only by a randomly generated anonymous device ID. We do not send your habit data, prayer logs, dhikr counts, reading positions, name, email, or precise location to Mixpanel. You can disable analytics at any time from in-app Settings → Privacy; once disabled, no further events are sent. Mixpanel\'s privacy policy is available at https://mixpanel.com/legal/privacy-policy.',
                },
                {
                    title: '5. Crash Reporting (Sentry)',
                    content: 'We use Sentry (Functional Software, Inc.) to detect and diagnose crashes and errors. Sentry receives stack traces, error messages, breadcrumbs, and app/OS/device information, tagged with an anonymous install ID. Data is only transmitted when an error or crash occurs. We do not include your habit data, prayer logs, dhikr counts, or any user-authored text in crash reports. Sentry\'s privacy policy is available at https://sentry.io/privacy/.',
                },
                {
                    title: '6. Cloud-Hosted Audio (Supabase Storage)',
                    content: 'Optional audio content such as Adhan (call to prayer) sounds and recitations is hosted on Supabase Storage and downloaded to your device over HTTPS the first time you select it. Downloaded audio is cached locally so it can play offline afterward. To serve these files, Supabase processes standard request metadata such as IP address, user agent, and timestamp. No account, login, habit data, or listening history is sent to Supabase. Supabase\'s privacy policy is available at https://supabase.com/privacy.',
                },
                {
                    title: '7. Data Sharing',
                    content: 'We do not sell or rent your personal information. We may share:',
                    list: [
                        'Anonymized usage analytics with Mixpanel',
                        'Anonymized crash and error data with Sentry',
                        'Standard request metadata with Supabase to serve audio downloads',
                        'Required information with payment processors (Apple App Store, Google Play Store) for subscription services via RevenueCat',
                        'Information only when legally required to do so (we have no personal data to share)',
                    ],
                },
                {
                    title: '8. Your Rights',
                    content: 'You have the right to:',
                    list: [
                        'Access all your data stored locally on your device through the app interface',
                        'Delete your habit data and reset the app through Settings',
                        'Opt out of Mixpanel analytics at any time from in-app Settings → Privacy',
                        'Disable crash reporting by uninstalling the app',
                        'Control all notification permissions through your device settings',
                        'Export your data (where applicable) for backup purposes',
                    ],
                },
                {
                    title: '9. Children\'s Privacy',
                    content: 'Raha is designed for Muslim parents and professionals. While not specifically directed at children, we do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently received personal information from someone under 13, we will delete such information from our records.',
                },
                {
                    title: '10. International Data Transmissions',
                    content: 'Any minimal data transmitted (anonymized analytics via Mixpanel, crash data via Sentry, audio downloads via Supabase, subscription validation via RevenueCat) may be processed in the United States or other countries where our service providers operate. No personal habit or prayer data ever leaves your device.',
                },
                {
                    title: '11. Changes to This Policy',
                    content: 'We will notify users of material changes through an in-app notification or other appropriate means. Your continued use of the app after such changes constitutes your acceptance of the new policy.',
                },
                {
                    title: '12. Contact Us',
                    content: 'For questions about this Privacy Policy, please contact us at codewithnabi@gmail.com or visit https://www.codewithnabi.dev/.',
                },
                {
                    title: '13. Religious Context Note',
                    content: 'While Raha is designed to support Islamic practices, we do not collect or store any sensitive religious data beyond what users voluntarily input as part of their habit tracking. All such data remains exclusively on the user\'s device.',
                },
            ],
        },
        termsContent: {
            lastUpdated: 'May 23, 2026',
            intro: 'By downloading, installing, or using the Raha application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App.',
            sections: [
                {
                    title: '1. Description of Service',
                    content: 'Raha is a mobile application designed to help busy Muslim parents and professionals build consistent, faith-aligned micro-habits anchored to their five daily prayers. The App uses salah times as natural trigger points for micro-habit building and provides a sacred design system rooted in Islamic heritage.',
                },
                {
                    title: '2. User Eligibility',
                    content: 'You must be at least thirteen (13) years of age to use Raha. By using the App, you represent and warrant that you meet this age requirement. If you are under 18 years old, you should use the App only under the supervision of a parent or legal guardian.',
                },
                {
                    title: '3. Account Registration and Usage',
                    content: 'While Raha offers full core functionality without requiring account creation, certain features may require or benefit from registration. Premium subscription management requires an account with Apple App Store or Google Play Store. No personal information is required to use the core habit tracking and prayer time features. If you create an account, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
                },
                {
                    title: '4. User Responsibilities',
                    content: 'As a condition of your use of Raha, you agree not to use the App for any purpose that is unlawful or prohibited by these Terms. You are solely responsible for ensuring that your use of the App complies with all applicable laws and regulations, the accuracy of any information you input into the App, maintaining the security of your device, and any consequences arising from your use of the App.',
                },
                {
                    title: '5. Intellectual Property Rights',
                    content: 'All content, features, and functionality of Raha, including but not limited to the design, text, graphics, images, video, audio, software, and the selection and arrangement thereof, are the proprietary property of Nabi Rahmani and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. You are granted a limited, non-exclusive, non-transferable, revocable license to download and install a copy of the App on your mobile device and use it for personal, non-commercial purposes only.',
                },
                {
                    title: '6. Subscriptions, Payments, and Third-Party Services',
                    content: 'Raha offers both free and premium features. Premium features are available through subscription, with payments processed through Apple App Store (iOS) or Google Play Store (Android) via RevenueCat; we do not directly collect or store payment information. Subscriptions automatically renew unless canceled according to the store\'s policies, and refunds are subject to those policies. The App also integrates with the following third-party services to operate and improve the product: Mixpanel for anonymized product analytics, Sentry for crash and error reporting, and Supabase Storage for hosting downloadable audio content such as Adhan calls and recitations. Use of these services is governed by their own terms and privacy policies, and we are not responsible for third-party services or their terms.',
                },
                {
                    title: '7. Disclaimer of Warranties',
                    content: 'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE APP IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITH ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND. WE EXPRESSLY DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APP WILL BE ERROR-FREE, UNINTERRUPTED, OR SECURE, OR THAT ANY ERRORS WILL BE CORRECTED.',
                },
                {
                    title: '8. Limitation of Liability',
                    content: 'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL NABI RAHMANI BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, OR OTHER INTANGIBLE LOSSES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU HAVE PAID US FOR USING THE APP DURING THE SIX (6) MONTHS PRECEDING THE CAUSE OF ACTION.',
                },
                {
                    title: '9. Indemnification',
                    content: 'You agree to defend, indemnify, and hold harmless Nabi Rahmani and its affiliates, officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorneys\' fees and costs, arising out of or in any way connected with your access to or use of the App, or your violation of these Terms.',
                },
                {
                    title: '10. Term and Termination',
                    content: 'These Terms shall remain in full force and effect while you use the App. We may terminate or suspend your access to the App immediately, without prior notice or liability, for any reason whatsoever, including if you breach these Terms. You may terminate these Terms at any time by discontinuing your use of the App and deleting it from your device. Upon termination, your right to use the App will cease immediately. If you have a premium subscription, you should cancel it through your app store to avoid further charges.',
                },
                {
                    title: '11. Governing Law',
                    content: 'These Terms shall be governed by and construed in accordance with the laws of Turkey, without regard to its conflict of law principles.',
                },
                {
                    title: '12. Dispute Resolution',
                    content: 'Any dispute arising out of or relating to these Terms or the App shall be resolved through binding arbitration. The arbitration shall be conducted in Istanbul, Turkey, and the language of the arbitration shall be English. The arbitrator\'s decision shall be final and binding on both parties.',
                },
                {
                    title: '13. Severability',
                    content: 'If any provision of these Terms is held to be unlawful, void, or unenforceable, the remaining provisions shall continue to be valid and enforceable.',
                },
                {
                    title: '14. Entire Agreement',
                    content: 'These Terms, together with our Privacy Policy and any other legal notices published by us on the App, constitute the entire agreement between you and Nabi Rahmani concerning the App.',
                },
                {
                    title: '15. Changes to Terms',
                    content: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least thirty (30) days\' notice prior to the effective date of any changes. By continuing to access or use the App after any revisions become effective, you agree to be bound by the revised Terms.',
                },
                {
                    title: '16. Contact Us',
                    content: 'If you have any questions about these Terms, please contact us at codewithnabi@gmail.com or visit https://www.codewithnabi.dev/.',
                },
                {
                    title: '17. Religious Content Disclaimer',
                    content: 'WHILE RAHA IS DESIGNED TO SUPPORT ISLAMIC PRACTICES AND PROVIDE GENERAL INFORMATION ABOUT PRAYER TIMES AND ISLAMIC TEACHINGS, IT IS NOT A SUBSTITUTE FOR PROFESSIONAL RELIGIOUS ADVICE FROM QUALIFIED ISLAMIC SCHOLARS OR AUTHORITIES. THE APP DOES NOT PROVIDE FATWAS, LEGAL OPINIONS, OR OFFICIAL RELIGIOUS RULINGS. USERS ARE ENCOURAGED TO CONSULT WITH KNOWLEDGEABLE INDIVIDUALS, LOCAL IMAMS, OR ISLAMIC CENTERS FOR SPECIFIC RELIGIOUS QUESTIONS OR GUIDANCE.',
                },
            ],
        },
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

/** Full project set for `/projects`. Home uses a curated subset of this list. */
export function getAllProjects(): Project[] {
    return projects;
}

/**
 * Curated home subset (shipping proof first). Keep in sync with home engagement.
 * Full catalog remains `getAllProjects()`.
 */
export function getFeaturedProjects(limit = 3): Project[] {
    return projects.slice(0, limit);
}
