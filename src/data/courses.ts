import type { Course, Module, Lesson, CourseNavigation, CourseFilter } from '@/types/course';

// ═══════════════════════════════════════════════════════════════
// MODULE 1 — Course Introduction (7 lessons)
// ═══════════════════════════════════════════════════════════════

const module1: Module = {
  id: 'module-1',
  slug: '01-intro',
  title: 'Course Introduction',
  description: 'Welcome to Flutter in Production and course overview.',
  order: 1,
  lessons: [
    {
      id: 'lesson-1-1',
      slug: '01-intro',
      title: 'Welcome to Flutter in Production!',
      description: 'Course introduction and what you will learn.',
      order: 1,
      duration: 10,
      type: 'text',
      isFree: true,
      content: {
        markdown: `## Welcome to Flutter in Production!

Hey, I'm Andrea, your instructor for this course!

I created this course because **shipping mobile apps is hard**, and there are many things to consider:

- **Preparing for release**: app icons, splash screens, flavors, environments, error reporting, analytics, force update, privacy, T&Cs.
- **App Submissions**: app store metadata & screenshots, compliance, testing vs distribution tracks, dealing with rejections.
- **Release automation:** CI workflows, environment variables, custom build steps, code signing, uploading to the stores.
- **Post-release**: error monitoring, bug fixes, addressing user feedback, over-the-air updates, feature toggles & A/B testing.

## Course Structure

To help you tackle all these challenges, I've created a comprehensive curriculum that is divided into three parts.

### Part 1: Preparing for Release (Modules 2-8)

In this first part, you'll get your app ready for production by tackling:

- **Launcher Icons and Splash Screens**
- **Multiple Flavors and Environments**
- **Error Monitoring** (Sentry)
- **Analytics** (Mixpanel and Firebase Analytics)
- **Force Update** (Firebase Remote Config)
- **Collecting user feedback and in-app reviews**
- **Creating a website for your app**

Skipping these steps can be costly. Imagine releasing without error monitoring or analytics—you'd be **flying blind**. What if there's a critical bug in production? Or if a feature you spent weeks on isn't even being used? This section ensures you're equipped to avoid those headaches.

### Part 2: Release Management and Automation (Modules 9-12)

Once your app is ready, it's time to get it into users' hands. This part covers:

- **App Store Release**: Prepare, build, upload, and submit your iOS app to App Store Connect
- **Play Store Release**: Prepare, build, upload, and submit your Android app to the Google Play Store

Once your first release is out, you'll quickly find that manual releases take a lot of time, so you'll want to automate the whole process:

- **Release Automation with Codemagic** (quick setup).
- **Release Automation with GitHub Actions + Fastlane** (advanced setup with more control).

**Bonus**: I'll also walk you through the latest requirements for setting up Apple/Google developer accounts and navigating store policies.

### Part 3: Post-Release Techniques (Modules 13-15)

By this stage, you'll be confident about shipping and monitoring your apps in production. Time to streamline your process even further:

- **Code push with Shorebird**
- **Automated screenshots generation**
- **Feature toggles and A/B Testing**

### What is not included in this course

There are some topics that, while important for production apps, are not planned for this course:

- **Automated testing**
- **Accessibility and localization**
- **App security** (though I'll show you how to store API keys securely)
- **Building adaptive apps**
- **Deep linking and URL-based navigation**
- **Publishing Flutter desktop apps**
- **App monetization**
- **App store optimization (ASO) and keyword research**

Where relevant, I'll include links to resources where you can learn more.

## How to make the most of this course

The course follows a linear structure, giving you a clear release plan that covers all the important steps.

While I recommend following from beginning to end, each module will be as self-contained as possible, so feel free to jump around if you're looking for something specific.

This course is both a **learning path** and a **reference guide**. So, you'll also find:

- **Checklists** at the end of each module to ensure you "ticked all the boxes" before moving on.
- **Quizzes** to test your knowledge in many of the lessons.

## Final Thoughts

I'm excited to help you take your Flutter apps to production! Let's get started!`,
      },
    },
    {
      id: 'lesson-1-2',
      slug: '02-join-discord',
      title: 'Join Code With Andrea on Discord',
      description: 'How to join the community Discord server for support and discussion.',
      order: 2,
      duration: 3,
      type: 'text',
      isFree: true,
      content: {
        markdown: `## Join the Community on Discord

One of the best ways to get the most out of this course is to join our Discord community.

### Why Join?

- **Ask questions** about the course content and get answers from me and other students
- **Share your progress** and celebrate milestones with fellow developers
- **Get help** with bugs and issues you encounter while following along
- **Network** with other Flutter developers who are serious about shipping apps

### How to Join

1. Visit the Discord invite link provided in your course dashboard
2. Accept the invite and introduce yourself in the **#introductions** channel
3. Browse the course-specific channels to find discussions relevant to the module you're working on

### Community Guidelines

- Be respectful and helpful to other students
- Search before asking — your question may already be answered
- Share code snippets using code blocks for readability
- Don't share paid course content publicly

I look forward to seeing you there!`,
      },
    },
    {
      id: 'lesson-1-3',
      slug: '03-flutter-app-preview',
      title: 'Intro to the Flutter App Release Checklist',
      description: 'Overview of the Flutter app release checklist that guides this course.',
      order: 3,
      duration: 8,
      type: 'text',
      isFree: true,
      content: {
        markdown: `## Intro to the Flutter App Release Checklist

Before you release your Flutter app, there are many steps to complete. To help you stay organized, I've created a comprehensive **Flutter App Release Checklist**.

### The Release Checklist

This checklist covers everything from initial setup to post-release monitoring:

| Phase | Steps |
|-------|-------|
| **Pre-Release** | App icons, splash screens, flavors, environments |
| **Integration** | Error monitoring, analytics, force update |
| **Legal** | Privacy policy, terms of use |
| **Submission** | Store metadata, screenshots, compliance |
| **Automation** | CI/CD workflows, code signing |
| **Post-Release** | Monitoring, bug fixes, OTA updates |

### Why a Checklist?

Shipping an app involves dozens of small steps, and it's easy to forget one. A checklist ensures:

- You don't skip critical steps (like error monitoring)
- You follow a consistent process every time
- You can track your progress as you work through each module

### How This Course Maps to the Checklist

Each module in this course corresponds to one or more items on the checklist. As you complete each module, you'll check off the corresponding items.

By the end of the course, your entire checklist will be complete — and your app will be ready for production!`,
      },
    },
    {
      id: 'lesson-1-4',
      slug: '04-starter-project',
      title: 'Intro to the Starter Project',
      description: 'Introduction to the starter project used throughout the course.',
      order: 4,
      duration: 10,
      type: 'text',
      isFree: false,
      content: {
        markdown: `## Intro to the Starter Project

Throughout this course, we'll work with a real Flutter app — the **Flutter Ship App** — to demonstrate all the concepts and techniques.

### What is the Flutter Ship App?

Flutter Ship is a task management app that includes:

- **Authentication** (email/password + social login)
- **Cloud Firestore** for data storage
- **Riverpod** for state management
- **GoRouter** for navigation
- **Responsive design** for different screen sizes

### Why a Real App?

Using a real app (instead of trivial examples) means you'll learn how to apply production techniques in a realistic context. The app has:

- Multiple screens and navigation flows
- Network requests and error handling
- Local storage and caching
- Platform-specific code

### Getting the Starter Project

1. Clone the repository from GitHub
2. Follow the setup instructions in the README
3. Run the app to verify everything works

\`\`\`bash
git clone https://github.com/bizz84/flutter_ship_app.git
cd flutter_ship_app
flutter pub get
flutter run
\`\`\`

### Project Structure

The project follows a feature-first architecture:

\`\`\`
lib/
  src/
    features/
      authentication/
      tasks/
      settings/
    common_widgets/
    routing/
    utils/
  main.dart
\`\`\`

In the next lesson, we'll walk through the code in detail.`,
      },
    },
    {
      id: 'lesson-1-5',
      slug: '05-code-walkthrough',
      title: 'Starter Project: Code Walkthrough',
      description: 'Detailed walkthrough of the starter project code.',
      order: 5,
      duration: 15,
      type: 'text',
      isFree: false,
      content: {
        markdown: `## Starter Project: Code Walkthrough

Let's walk through the Flutter Ship app code to understand the architecture and key patterns used throughout the course.

### Entry Point

The app starts in \`main.dart\`:

\`\`\`dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const ProviderScope(child: MyApp()));
}
\`\`\`

Key things to note:
- Firebase is initialized before the app starts
- \`ProviderScope\` wraps the entire app for Riverpod state management

### Architecture Overview

The app uses a **feature-first** architecture:

| Layer | Purpose | Example |
|-------|---------|---------|
| **Presentation** | UI widgets and controllers | \`TaskListScreen\`, \`TaskListController\` |
| **Application** | Business logic services | \`TaskService\` |
| **Data** | Repositories and data sources | \`TaskRepository\`, \`FirestoreTaskDataSource\` |
| **Domain** | Models and interfaces | \`Task\`, \`TaskRepository\` (abstract) |

### State Management with Riverpod

All state is managed through Riverpod providers:

\`\`\`dart
@riverpod
class TaskListController extends _$TaskListController {
  @override
  FutureOr<List<Task>> build() {
    return ref.watch(taskRepositoryProvider).fetchTasks();
  }

  Future<void> addTask(Task task) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => ref.read(taskRepositoryProvider).addTask(task),
    );
  }
}
\`\`\`

### Navigation with GoRouter

Navigation is handled by GoRouter with type-safe routes:

\`\`\`dart
final goRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const TaskListScreen(),
      ),
      GoRoute(
        path: '/task/:id',
        builder: (context, state) {
          final taskId = state.pathParameters['id']!;
          return TaskDetailScreen(taskId: taskId);
        },
      ),
    ],
  );
});
\`\`\`

### Next Steps

Now that you understand the codebase, we're ready to start preparing it for production. In the next module, we'll tackle **launcher icons and splash screens**.`,
      },
    },
    {
      id: 'lesson-1-6',
      slug: '06-wrap-up',
      title: 'Wrap Up',
      description: 'Summary of Module 1 and what comes next.',
      order: 6,
      duration: 3,
      type: 'text',
      isFree: true,
      content: {
        markdown: `## Module 1: Wrap Up

Congratulations on completing the course introduction!

### What You've Learned

- The **scope** of this course and what topics are covered
- The **three-part structure**: Preparing for Release, Release Management, and Post-Release
- The **Flutter App Release Checklist** that guides the entire course
- The **starter project** (Flutter Ship App) and its architecture
- How to **join the community** on Discord for support

### What's Next

In **Module 2: Launcher Icons and Splash Screens**, you'll learn:

- How to generate app icons with \`flutter_launcher_icons\`
- Android adaptive icon guidelines
- How to design app icons in Figma
- How to generate custom splash screens with \`flutter_native_splash\`

This is the first step in making your app feel polished and professional. See you in the next module!`,
      },
    },
    {
      id: 'lesson-1-7',
      slug: '07-request-for-feedback',
      title: 'Request for Feedback',
      description: 'Share your feedback about this module.',
      order: 7,
      duration: 2,
      type: 'text',
      isFree: true,
      content: {
        markdown: `## Request for Feedback

Your feedback is **super valuable** and helps improve the course for everyone.

### How to Submit Feedback

At the end of each module, you'll find this feedback request. Please take a moment to share your thoughts:

- **Was this module clear?** Was there something you didn't understand or that should be explained better?
- **What did you like most?** Knowing what works well helps me maintain quality.
- **Any suggestions?** Ideas for improvement are always welcome.

### Rating Scale

- **5** — Excellent, everything was clear and well-explained
- **4** — Good, minor improvements possible
- **3** — Average, some parts were confusing
- **2** — Below average, significant improvements needed
- **1** — Poor, major issues with the content

Rest assured that I read **all your comments** and use them to improve the course.

Thank you for your time! Let's continue to Module 2.`,
      },
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// HELPER: Create a placeholder lesson
// ═══════════════════════════════════════════════════════════════

function createLesson(
  moduleNum: number,
  lessonNum: number,
  slug: string,
  title: string,
  description: string,
  duration: number = 10,
  isFree: boolean = false,
): Lesson {
  return {
    id: `lesson-${moduleNum}-${lessonNum}`,
    slug,
    title,
    description,
    order: lessonNum,
    duration,
    type: 'text',
    isFree,
    content: {
      markdown: `## ${title}\n\nContent coming soon. Stay tuned!`,
    },
  };
}

// ═══════════════════════════════════════════════════════════════
// MODULE 2 — Launcher Icons and Splash Screens (8 lessons)
// ═══════════════════════════════════════════════════════════════

const module2: Module = {
  id: 'module-2',
  slug: '02-launcher-icons',
  title: 'Launcher Icons and Splash Screens',
  description: 'Generate professional app icons and splash screens for your Flutter app.',
  order: 2,
  lessons: [
    createLesson(2, 1, '01-intro', 'Intro to Launcher Icons', 'Why launcher icons matter and how to set them up.', 8, true),
    createLesson(2, 2, '02-flutter-launcher-icons', 'Generating App Icons with Flutter Launcher Icons', 'Use the flutter_launcher_icons package to generate icons.', 12),
    createLesson(2, 3, '03-android-adaptive-icons', 'Launcher Icon Guidelines and Android Adaptive Icons', 'Understanding Android adaptive icons and design guidelines.', 10),
    createLesson(2, 4, '04-figma-app-icons', 'How to Design Your App Icons in Figma', 'Design professional app icons using Figma.', 15),
    createLesson(2, 5, '05-flutter-launcher-icons-checklist', 'Flutter Launcher Icons Checklist', 'Checklist to verify your launcher icons are set up correctly.', 5),
    createLesson(2, 6, '06-flutter-splash-screens', 'Generating Custom Splash Screens with Flutter Native Splash', 'Create polished splash screens with flutter_native_splash.', 12),
    createLesson(2, 7, '07-wrap-up', 'Launcher Icons and Splash Screens: Wrap Up', 'Summary and next steps.', 3),
    createLesson(2, 8, '08-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 3 — Adding Flavors to a Flutter App (22 lessons)
// ═══════════════════════════════════════════════════════════════

const module3: Module = {
  id: 'module-3',
  slug: '03-flavors',
  title: 'Adding Flavors to a Flutter App',
  description: 'Set up multiple flavors and environments for development, staging, and production.',
  order: 3,
  lessons: [
    createLesson(3, 1, '01-intro', 'Intro to Flavors and Environments', 'Why you need different flavors and environments.', 8, true),
    createLesson(3, 2, '02-flavors-vs-dart-defines', 'The Difference Between Flavors and Dart Defines', 'Understanding the two approaches to environment configuration.', 10),
    createLesson(3, 3, '03-flutter-flavorizr', 'Flutter Flavorizr: Introduction', 'Introduction to the Flutter Flavorizr package.', 8),
    createLesson(3, 4, '04-flutter-flavorizr-icons-setup', 'Flutter Flavorizr: Icons Setup', 'Configure different icons for each flavor.', 10),
    createLesson(3, 5, '05-flutter-flavorizr-android-setup', 'Flutter Flavorizr: Android Setup', 'Set up flavors on Android with Flavorizr.', 12),
    createLesson(3, 6, '06-flutter-flavorizr-ios-setup', 'Flutter Flavorizr: iOS Setup', 'Set up flavors on iOS with Flavorizr.', 12),
    createLesson(3, 7, '07-create-multiple-main-files', 'Single or Multiple Entry Points?', 'Choose between single or multiple main.dart files.', 8),
    createLesson(3, 8, '08-flutter-flavors-vscode-setup', 'Flutter Flavors: IDE Setup (VSCode)', 'Configure VSCode for multi-flavor development.', 8),
    createLesson(3, 9, '09-flutter-flavors-idea-setup', 'Flutter Flavors: IDE Setup (Android Studio)', 'Configure Android Studio for multi-flavor development.', 8),
    createLesson(3, 10, '10-flutter-flavors-on-web', 'How to Enable Flavors on Flutter Web', 'Add flavor support for Flutter web builds.', 8),
    createLesson(3, 11, '11-flutter-flavors-checklist', 'Flutter Flavors Checklist', 'Verify your flavor setup is correct.', 5),
    createLesson(3, 12, '12-manual-flavors-android', 'Manual Flavors: Introduction and Android Setup', 'Set up flavors manually without Flavorizr on Android.', 15),
    createLesson(3, 13, '13-manual-flavors-ios-setup', 'Manual Flavors: iOS Setup', 'Set up flavors manually on iOS.', 15),
    createLesson(3, 14, '14-whitelabel-app-challenge', 'Whitelabel App: Challenge', 'Build a whitelabel app using flavors.', 10),
    createLesson(3, 15, '15-whitelabel-app-solution', 'Whitelabel App: Solution and Checklist', 'Solution and checklist for the whitelabel challenge.', 10),
    createLesson(3, 16, '16-firebase-intro', 'Intro to Multiple Flavors with Flutter & Firebase', 'Setting up Firebase with multiple flavors.', 8),
    createLesson(3, 17, '17-firebase-create-projects', 'Creating Multiple Firebase Projects', 'Create separate Firebase projects for each environment.', 10),
    createLesson(3, 18, '18-firebase-setup-flutterfire-cli', 'FlutterFire Setup with Multiple Flavors', 'Configure FlutterFire CLI for multi-flavor setups.', 12),
    createLesson(3, 19, '19-firebase-initialization-in-dart', 'Multi-Flavor Firebase Initialization in Dart', 'Initialize Firebase based on the current flavor.', 10),
    createLesson(3, 20, '20-firebase-flavors-checklist', 'Firebase Flavors Checklist', 'Verify Firebase is correctly configured for all flavors.', 5),
    createLesson(3, 21, '21-conclusion', 'Flutter Flavors: Wrap Up', 'Summary and next steps.', 3),
    createLesson(3, 22, '22-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 4 — Error Monitoring with Sentry and Crashlytics (16)
// ═══════════════════════════════════════════════════════════════

const module4: Module = {
  id: 'module-4',
  slug: '04-error-monitoring',
  title: 'Error Monitoring with Sentry and Crashlytics',
  description: 'Set up error monitoring to catch and fix issues in production.',
  order: 4,
  lessons: [
    createLesson(4, 1, '01-intro', 'Intro to Error Monitoring', 'Why error monitoring is essential for production apps.', 8, true),
    createLesson(4, 2, '02-sentry-vs-crashlytics', 'Sentry vs Crashlytics: A Comparison', 'Compare the two most popular error monitoring solutions.', 10),
    createLesson(4, 3, '03-sentry-installation', 'Sentry Setup: Basics', 'Install and configure Sentry in your Flutter app.', 12),
    createLesson(4, 4, '04-sentry-environment-flavors', 'Sentry Setup: Environments and Flavors', 'Configure Sentry for multiple environments.', 10),
    createLesson(4, 5, '05-alternative-sentry-initialization-flows', 'Alternative Sentry Initialization Flows', 'Different ways to initialize Sentry.', 8),
    createLesson(4, 6, '06-sentry-capture-exceptions-case-study', 'Case Study: Capturing Exceptions Explicitly with Sentry', 'Real-world example of capturing exceptions.', 12),
    createLesson(4, 7, '07-sentry-dashboard-overview', 'Sentry: Dashboard Overview and Issue Resolution Workflow', 'Navigate the Sentry dashboard and resolve issues.', 10),
    createLesson(4, 8, '08-sentry-user-feedback', 'How to Collect User Feedback with Sentry', 'Collect in-app user feedback through Sentry.', 8),
    createLesson(4, 9, '09-sentry-additional-configuration', 'Sentry: Additional Options and APIs', 'Advanced Sentry configuration options.', 10),
    createLesson(4, 10, '10-error-monitoring-basics', 'Error Monitoring Basics, Source Maps, and dSYMs', 'Understanding source maps and debug symbols.', 12),
    createLesson(4, 11, '11-upload-source-maps-sentry-dart-plugin', 'How to Upload Source Maps and Debug Symbols with the Sentry Dart Plugin', 'Automate debug symbol uploads.', 10),
    createLesson(4, 12, '12-sentry-checklist', 'Sentry Setup Checklist', 'Verify your Sentry setup is complete.', 5),
    createLesson(4, 13, '13-minimize-sentry-bill', 'How to Minimize Your Sentry Bill', 'Tips for keeping Sentry costs down.', 8),
    createLesson(4, 14, '14-crashlytics', 'Crashlytics Integration', 'Set up Firebase Crashlytics as an alternative.', 12),
    createLesson(4, 15, '15-conclusion', 'Error Monitoring: Wrap Up', 'Summary and next steps.', 3),
    createLesson(4, 16, '16-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 5 — Analytics (19 lessons)
// ═══════════════════════════════════════════════════════════════

const module5: Module = {
  id: 'module-5',
  slug: '05-analytics',
  title: 'Analytics with Mixpanel and Firebase Analytics',
  description: 'Track user behavior and make data-driven decisions.',
  order: 5,
  lessons: [
    createLesson(5, 1, '01-intro', 'Intro to Analytics', 'Why analytics matters for production apps.', 8, true),
    createLesson(5, 2, '02-comparison-analytics-providers', 'Comparison of Popular Analytics Providers', 'Overview of analytics providers and their tradeoffs.', 10),
    createLesson(5, 3, '03-firebase-analytics-vs-mixpanel', 'Firebase Analytics vs Mixpanel', 'Detailed comparison of the two platforms.', 10),
    createLesson(5, 4, '04-intro-event-tracking', 'Introduction to Event Tracking', 'Understanding events, properties, and user identification.', 10),
    createLesson(5, 5, '05-app-analytics-architecture', 'App Analytics: Requirements and Architecture Overview', 'Design an analytics architecture for your app.', 12),
    createLesson(5, 6, '06-app-analytics-implementation-details', 'App Analytics: Implementation Details', 'Implement the analytics layer in code.', 15),
    createLesson(5, 7, '07-tracking-custom-events', 'Tracking Custom Events', 'Track custom events specific to your app.', 10),
    createLesson(5, 8, '08-tracking-navigation-events', 'Tracking Navigation Events', 'Automatically track screen views and navigation.', 10),
    createLesson(5, 9, '09-enable-disable-analytics', 'Enabling or Disabling Analytics: Letting Users Choose', 'Give users control over analytics collection.', 8),
    createLesson(5, 10, '10-identify-users', 'App Analytics: Identify Users', 'Associate events with specific users.', 8),
    createLesson(5, 11, '11-mixpanel-project-setup', 'Mixpanel: Project Setup', 'Create and configure a Mixpanel project.', 10),
    createLesson(5, 12, '12-mixpanel-flutter-setup', 'Mixpanel: Flutter Setup', 'Integrate Mixpanel SDK into your Flutter app.', 12),
    createLesson(5, 13, '13-mixpanel-dashboard', 'Mixpanel Dashboard Overview', 'Navigate the Mixpanel dashboard.', 10),
    createLesson(5, 14, '14-mixpanel-other-features', 'Mixpanel: Debugging and Other Useful Features', 'Debug analytics events and explore advanced features.', 8),
    createLesson(5, 15, '15-firebase-analytics-flutterfire', 'Firebase Analytics: FlutterFire Recap', 'Quick recap of FlutterFire setup for analytics.', 8),
    createLesson(5, 16, '16-firebase-analytics-flutter-setup', 'Firebase Analytics: Flutter Setup', 'Set up Firebase Analytics in your Flutter app.', 12),
    createLesson(5, 17, '17-analytics-checklist', 'Analytics Setup Checklist', 'Verify your analytics setup is complete.', 5),
    createLesson(5, 18, '18-wrap-up', 'Analytics: Wrap Up', 'Summary and next steps.', 3),
    createLesson(5, 19, '19-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 6 — Force Update Strategies (10 lessons)
// ═══════════════════════════════════════════════════════════════

const module6: Module = {
  id: 'module-6',
  slug: '06-force-update',
  title: 'Force Update Strategies',
  description: 'Ensure users always run the latest version of your app.',
  order: 6,
  lessons: [
    createLesson(6, 1, '01-intro', 'Intro to Force Update', 'Why force update is important for production apps.', 8, true),
    createLesson(6, 2, '02-upgrader-package', 'Force Update with the Upgrader Package', 'Use the Upgrader package for simple force update.', 10),
    createLesson(6, 3, '03-intro-force-update-remote-config', 'Introduction to Force Update with Remote Config', 'Use remote configuration for flexible update rules.', 10),
    createLesson(6, 4, '04-force-update-helper-package', 'The Force Update Helper Package', 'A custom package for force update logic.', 10),
    createLesson(6, 5, '05-update-github-gist', 'Force Update with a GitHub Gist', 'Use a GitHub Gist as a simple remote config.', 8),
    createLesson(6, 6, '06-update-firebase-remote-config', 'Force Update with Firebase Remote Config', 'Use Firebase Remote Config for production force update.', 12),
    createLesson(6, 7, '07-update-dart-shelf', 'Force Update with Dart Shelf', 'Build a custom server for force update.', 12),
    createLesson(6, 8, '08-force-update-checklist', 'Force Update Checklist', 'Verify your force update setup.', 5),
    createLesson(6, 9, '09-wrap-up', 'Wrap Up', 'Summary and next steps.', 3),
    createLesson(6, 10, '10-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 7 — Asking for In-App Reviews (7 lessons)
// ═══════════════════════════════════════════════════════════════

const module7: Module = {
  id: 'module-7',
  slug: '07-in-app-review',
  title: 'Asking for In-App Reviews',
  description: 'Collect user reviews at the right time to boost your store rating.',
  order: 7,
  lessons: [
    createLesson(7, 1, '01-intro', 'How to Ask for In-App Reviews', 'Best practices for requesting in-app reviews.', 8, true),
    createLesson(7, 2, '02-request-review', 'Showing the In-App Review Prompt with requestReview', 'Use the in_app_review package to show the native prompt.', 10),
    createLesson(7, 3, '03-request-review-at-the-right-time', 'Showing the Review Prompt at the Right Time', 'Timing strategies for maximum review conversion.', 10),
    createLesson(7, 4, '04-open-store-listing', 'Asking for Reviews with openStoreListing', 'Direct users to the store listing for reviews.', 8),
    createLesson(7, 5, '05-in-app-review-checklist', 'In-App Review Checklist', 'Verify your review prompt setup.', 5),
    createLesson(7, 6, '06-wrap-up', 'Wrap Up', 'Summary and next steps.', 3),
    createLesson(7, 7, '07-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 8 — Creating a Landing Page (7 lessons)
// ═══════════════════════════════════════════════════════════════

const module8: Module = {
  id: 'module-8',
  slug: '08-app-landing-page',
  title: 'Creating a Landing Page for Your App',
  description: 'Build a professional landing page with privacy policy and terms of use.',
  order: 8,
  lessons: [
    createLesson(8, 1, '01-intro', 'Intro: Do You Need a Landing Page?', 'When and why you need a landing page for your app.', 8, true),
    createLesson(8, 2, '02-landing-page-template', 'Landing Page Template: Setup Guide', 'Set up a landing page template.', 12),
    createLesson(8, 3, '03-deploy-github-pages', 'Deploy Your Website to GitHub Pages', 'Deploy your landing page for free with GitHub Pages.', 10),
    createLesson(8, 4, '04-privacy-terms', 'How to Generate the Privacy Policy and Terms of Use', 'Create legal pages for your app.', 10),
    createLesson(8, 5, '05-add-links-settings', 'Adding the Website Links to the Settings Page', 'Link your app to its landing page.', 8),
    createLesson(8, 6, '06-wrap-up', 'Wrap Up', 'Summary and next steps.', 3),
    createLesson(8, 7, '07-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 9 — Releasing on the App Store (22 lessons)
// ═══════════════════════════════════════════════════════════════

const module9: Module = {
  id: 'module-9',
  slug: '09-release-ios',
  title: 'Releasing Your iOS App on the App Store',
  description: 'Complete guide to preparing, submitting, and managing your iOS app on the App Store.',
  order: 9,
  lessons: [
    createLesson(9, 1, '01-intro', 'Intro: Releasing Your iOS App to the App Store', 'Overview of the iOS release process.', 8, true),
    createLesson(9, 2, '02-app-store-good-bad-ugly', 'App Store: The Good, Bad, and Ugly', 'What to expect from the App Store review process.', 10),
    createLesson(9, 3, '03-apple-developer-program-overview', 'Apple Developer Program Overview', 'Understanding the Apple Developer Program.', 8),
    createLesson(9, 4, '04-join-apple-developer-program', 'How to Join the Apple Developer Program', 'Step-by-step enrollment guide.', 10),
    createLesson(9, 5, '05-trader-status-eu', 'Trader Status for Developers Distributing Apps in the EU', 'EU-specific requirements for app distribution.', 8),
    createLesson(9, 6, '06-apple-developer-account-overview', 'Apple Developer Account & App Store Connect: Overview', 'Navigate your developer account and App Store Connect.', 10),
    createLesson(9, 7, '07-register-new-app-id', 'How to Register a New App ID', 'Create an App ID for your Flutter app.', 8),
    createLesson(9, 8, '08-create-new-app-app-store-connect', 'Creating a New iOS App on App Store Connect', 'Set up your app listing on App Store Connect.', 10),
    createLesson(9, 9, '09-preparing-for-review-app-information', 'Preparing for Review: App Information', 'Fill in required app information.', 10),
    createLesson(9, 10, '10-preparing-for-review-app-privacy', 'Preparing for Review: App Privacy and Data Collection', 'Complete the app privacy questionnaire.', 10),
    createLesson(9, 11, '11-preparing-for-review-app-pricing-availability', 'Preparing for Review: Pricing and Availability', 'Configure pricing and regional availability.', 8),
    createLesson(9, 12, '12-privacy-manifest-xcode', 'Adding a Privacy Manifest in Xcode', 'Create the required privacy manifest file.', 10),
    createLesson(9, 13, '13-reviewing-xcode-settings', 'Reviewing the Xcode Project Settings', 'Verify Xcode settings before building.', 10),
    createLesson(9, 14, '14-code-signing-certificates-profiles', 'Code Signing, Certificates, and Provisioning Profiles', 'Understand iOS code signing.', 15),
    createLesson(9, 15, '15-building-and-uploading', 'Building and Uploading Your iOS App to App Store Connect', 'Build and upload your app.', 12),
    createLesson(9, 16, '16-submitting-for-review', 'Submitting Your iOS App to App Store Connect', 'Submit for review and manage the process.', 10),
    createLesson(9, 17, '17-app-review-process', 'The App Review Process', 'What happens during app review.', 8),
    createLesson(9, 18, '18-submitting-app-updates', 'Submitting App Updates to App Store Connect', 'Release updates to your published app.', 10),
    createLesson(9, 19, '19-uploading-builds-with-xcrun', 'Uploading Builds with xcrun and the App Store Connect API', 'Automate uploads with command-line tools.', 12),
    createLesson(9, 20, '20-testflight', 'Distributing Your App for Beta Testing via TestFlight', 'Set up TestFlight for beta testing.', 10),
    createLesson(9, 21, '21-ios-app-release-checklist', 'iOS App Release Checklist', 'Complete checklist for iOS release.', 5),
    createLesson(9, 22, '22-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 10 — Releasing on the Play Store (18 lessons)
// ═══════════════════════════════════════════════════════════════

const module10: Module = {
  id: 'module-10',
  slug: '10-release-android',
  title: 'Releasing Your Android App on the Google Play Store',
  description: 'Complete guide to preparing, submitting, and managing your Android app on the Play Store.',
  order: 10,
  lessons: [
    createLesson(10, 1, '01-intro', 'Intro: Releasing Your Android App to the Play Store', 'Overview of the Android release process.', 8, true),
    createLesson(10, 2, '02-play-store-good-bad-ugly', 'Play Store: The Good, Bad, and Ugly', 'What to expect from the Play Store review process.', 10),
    createLesson(10, 3, '03-developer-account-overview', 'Choosing Your Developer Account Type (Individual or Organization)', 'Pick the right account type for your needs.', 8),
    createLesson(10, 4, '04-create-account-individual', 'Creating a Play Console Developer Account (Individual)', 'Register as an individual developer.', 10),
    createLesson(10, 5, '05-create-account-organization', 'Creating a Play Console Developer Account (Organization)', 'Register as an organization.', 10),
    createLesson(10, 6, '06-create-app', 'Creating a New App on the Google Play Console', 'Set up your app on the Play Console.', 10),
    createLesson(10, 7, '07-app-content', 'Preparing for Review: App Content', 'Fill in required app content information.', 10),
    createLesson(10, 8, '08-data-safety', 'Preparing for Review: Data Safety', 'Complete the data safety questionnaire.', 10),
    createLesson(10, 9, '09-store-listing', 'Preparing for Review: Store Listing', 'Create your store listing with screenshots and descriptions.', 12),
    createLesson(10, 10, '10-testing-and-production-tracks', 'Testing and Production Tracks: Overview', 'Understand internal, closed, open, and production tracks.', 10),
    createLesson(10, 11, '11-review-android-settings', 'Reviewing the Android Project Settings', 'Verify Android project settings before building.', 10),
    createLesson(10, 12, '12-code-signing-keystore', 'Configuring Code Signing on Android', 'Set up keystore and code signing.', 12),
    createLesson(10, 13, '13-building-and-uploading', 'Building, Uploading, and Submitting Your Android App to Google Play', 'Build and upload your app bundle.', 12),
    createLesson(10, 14, '14-app-review-process', 'The App Review Process', 'What happens during Play Store review.', 8),
    createLesson(10, 15, '15-submitting-app-updates', 'Submitting App Updates to the Google Play Console', 'Release updates to your published app.', 10),
    createLesson(10, 16, '16-testing-tracks', 'How to Use the Internal, Closed, and Open Testing Tracks', 'Manage beta testing with different tracks.', 10),
    createLesson(10, 17, '17-android-app-release-checklist', 'Android App Release Checklist', 'Complete checklist for Android release.', 5),
    createLesson(10, 18, '18-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 11 — Release Automation with Codemagic (12 lessons)
// ═══════════════════════════════════════════════════════════════

const module11: Module = {
  id: 'module-11',
  slug: '11-codemagic',
  title: 'Release Automation with Codemagic',
  description: 'Automate your app releases with Codemagic CI/CD.',
  order: 11,
  lessons: [
    createLesson(11, 1, '01-intro', 'Introduction to CI/CD', 'Why CI/CD matters and overview of CI/CD platforms.', 10, true),
    createLesson(11, 2, '02-differences-local-and-ci-builds', 'Differences Between Local and CI Builds', 'Key differences to understand.', 8),
    createLesson(11, 3, '03-getting-started-codemagic', 'Getting Started with Codemagic', 'Set up your first Codemagic project.', 12),
    createLesson(11, 4, '04-workflow-editor-vs-yaml-config', 'Workflow Editor vs YAML Configuration: Which One to Choose', 'Compare the two configuration approaches.', 8),
    createLesson(11, 5, '05-overview-workflow-editor', 'Overview of the Workflow Editor', 'Navigate the Codemagic workflow editor.', 10),
    createLesson(11, 6, '06-workflow-environment-variables', 'Workflow Setup: Environment Variables and Build Commands', 'Configure environment variables and build steps.', 12),
    createLesson(11, 7, '07-android-code-signing-distribution', 'Workflow Setup: Android Code Signing and Distribution', 'Set up Android code signing in Codemagic.', 12),
    createLesson(11, 8, '08-ios-code-signing-distribution', 'Workflow Setup: iOS Code Signing and Distribution', 'Set up iOS code signing in Codemagic.', 12),
    createLesson(11, 9, '09-uploading-sentry-debug-symbols', 'Uploading the Debug Symbols to Sentry with Codemagic', 'Automate debug symbol uploads in CI.', 10),
    createLesson(11, 10, '10-other-codemagic-features', 'Other Useful Codemagic Features', 'Explore additional Codemagic capabilities.', 8),
    createLesson(11, 11, '11-codemagic-checklist', 'Codemagic Setup Checklist', 'Verify your Codemagic setup.', 5),
    createLesson(11, 12, '12-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 12 — Release Automation with GitHub Actions (14 lessons)
// ═══════════════════════════════════════════════════════════════

const module12: Module = {
  id: 'module-12',
  slug: '12-github-actions',
  title: 'Release Automation with GitHub Actions',
  description: 'Build custom CI/CD workflows with GitHub Actions.',
  order: 12,
  lessons: [
    createLesson(12, 1, '01-intro', 'Introduction to GitHub Actions', 'Overview of GitHub Actions for Flutter CI/CD.', 10, true),
    createLesson(12, 2, '02-fork-flutter-ship-app', 'Starter Project (Flutter Ship App)', 'Fork the starter project for GitHub Actions.', 8),
    createLesson(12, 3, '03-github-actions-basics', 'GitHub Actions Basics', 'Core concepts: workflows, jobs, steps, and triggers.', 12),
    createLesson(12, 4, '04-your-first-workflow', 'Setting Up Your First Workflow', 'Create your first GitHub Actions workflow.', 12),
    createLesson(12, 5, '05-environment-variables-secrets', 'Environment Variables and Secrets', 'Manage secrets securely in GitHub Actions.', 10),
    createLesson(12, 6, '06-workflow-pre-build-steps', 'Adding Some Pre-Build Steps to the Workflow', 'Add Flutter setup and dependency installation.', 10),
    createLesson(12, 7, '07-self-hosted-runners', 'Using Self Hosted Runners with GitHub Actions', 'Set up macOS self-hosted runners for iOS builds.', 12),
    createLesson(12, 8, '08-android-code-signing', 'Android Code Signing with GitHub Actions', 'Automate Android signing in CI.', 12),
    createLesson(12, 9, '09-distribution-play-store', 'Uploading to the Google Play Store', 'Automate Play Store uploads from GitHub Actions.', 10),
    createLesson(12, 10, '10-ios-code-signing-distribution', 'iOS Code Signing and Distribution with the Codemagic CLI', 'Use Codemagic CLI for iOS signing in GitHub Actions.', 12),
    createLesson(12, 11, '11-uploading-sentry-debug-symbols', 'Uploading the Debug Symbols to Sentry', 'Add Sentry symbol uploads to CI.', 10),
    createLesson(12, 12, '12-reusable-workflows', 'Building Reusable Workflows', 'Create reusable workflow templates.', 10),
    createLesson(12, 13, '13-github-actions-checklist', 'GitHub Actions Setup Checklist', 'Verify your GitHub Actions setup.', 5),
    createLesson(12, 14, '14-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 13 — Code Push with Shorebird (9 lessons)
// ═══════════════════════════════════════════════════════════════

const module13: Module = {
  id: 'module-13',
  slug: '13-shorebird',
  title: 'Code Push with Shorebird',
  description: 'Push over-the-air updates to your Flutter app without going through app review.',
  order: 13,
  lessons: [
    createLesson(13, 1, '01-intro', 'Introduction to Shorebird', 'What Shorebird is and how OTA updates work.', 8, true),
    createLesson(13, 2, '02-shorebird-installation', 'Shorebird Installation and Setup', 'Install and configure Shorebird.', 10),
    createLesson(13, 3, '03-shorebird-release', 'Creating a Shorebird Release', 'Create your first Shorebird release.', 10),
    createLesson(13, 4, '04-shorebird-patch', 'Creating a Shorebird Patch', 'Push a patch to your app.', 10),
    createLesson(13, 5, '05-shorebird-integration-codemagic', 'Shorebird Integration with Codemagic', 'Automate Shorebird releases with Codemagic.', 10),
    createLesson(13, 6, '06-shorebird-integration-github-actions', 'Shorebird Integration with GitHub Actions', 'Automate Shorebird releases with GitHub Actions.', 10),
    createLesson(13, 7, '07-shorebird-checklist', 'Shorebird Integration Checklist', 'Verify your Shorebird setup.', 5),
    createLesson(13, 8, '08-shorebird-tips', 'Tips for Using Shorebird in Production', 'Best practices and tips.', 8),
    createLesson(13, 9, '09-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 14 — Automated Screenshot Generation (11 lessons)
// ═══════════════════════════════════════════════════════════════

const module14: Module = {
  id: 'module-14',
  slug: '14-screenshots',
  title: 'Automated Screenshot Generation Strategies',
  description: 'Automate screenshot generation for the App Store and Play Store.',
  order: 14,
  lessons: [
    createLesson(14, 1, '01-intro', 'Introduction to Automated Screenshot Generation', 'Why screenshots matter and how automation helps.', 10, true),
    createLesson(14, 2, '02-tips-good-screenshots', 'Tips for Capturing Good Screenshots', 'Best practices for clean, professional screenshots.', 12),
    createLesson(14, 3, '03-manual-or-automatic-screenshots', 'Manual or Automated Screenshot Generation?', 'When to automate and when manual is enough.', 8),
    createLesson(14, 4, '04-automated-screenshot-generation-maestro', 'Automated Screenshot Generation with Maestro', 'Use Maestro for automated screenshot flows.', 15),
    createLesson(14, 5, '05-edit-screenshots-figma', 'Editing Screenshots with Figma', 'Frame and design screenshots in Figma.', 12),
    createLesson(14, 6, '06-fastlane-intro', 'Introduction to Fastlane', 'Overview of Fastlane for mobile automation.', 10),
    createLesson(14, 7, '07-fastlane-screenshot-uploads-ios', 'Automated Screenshot Uploads with Fastlane: iOS Setup', 'Upload iOS screenshots with Fastlane.', 12),
    createLesson(14, 8, '08-fastlane-screenshot-uploads-android', 'Automated Screenshot Uploads with Fastlane: Android Setup', 'Upload Android screenshots with Fastlane.', 12),
    createLesson(14, 9, '09-fastlane-screenshot-uploads-github-actions', 'Automated Screenshot Uploads with Fastlane and GitHub Actions', 'Automate the entire screenshot pipeline.', 12),
    createLesson(14, 10, '10-screenshot-generation-checklist', 'Screenshot Generation Checklist', 'Verify your screenshot pipeline.', 5),
    createLesson(14, 11, '11-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// MODULE 15 — Feature Toggles and A/B Testing (10 lessons)
// ═══════════════════════════════════════════════════════════════

const module15: Module = {
  id: 'module-15',
  slug: '15-feature-toggles',
  title: 'Feature Toggles and A/B Testing',
  description: 'Control feature rollout and run A/B experiments in production.',
  order: 15,
  lessons: [
    createLesson(15, 1, '01-intro', 'Intro to Feature Toggles and A/B Testing', 'Overview of feature toggles and experimentation.', 8, true),
    createLesson(15, 2, '02-feature-toggles', 'Types of Feature Toggles', 'Release, ops, experiment, and permission toggles.', 10),
    createLesson(15, 3, '03-release-toggles', 'Release Toggles', 'Gradually roll out new features.', 10),
    createLesson(15, 4, '04-ops-toggles-kill-switches', 'Ops Toggles and Kill Switches', 'Disable features in production without a release.', 10),
    createLesson(15, 5, '05-experiment-toggles', 'Experiment Toggles', 'Run experiments with feature toggles.', 10),
    createLesson(15, 6, '06-ab-testing-flutter', 'A/B Testing: Flutter Setup', 'Implement A/B testing in your Flutter app.', 12),
    createLesson(15, 7, '07-ab-testing-firebase', 'A/B Testing: Firebase Setup', 'Set up A/B tests with Firebase Remote Config.', 12),
    createLesson(15, 8, '08-permission-toggles', 'Permission Toggles', 'Gate features based on user permissions.', 8),
    createLesson(15, 9, '09-wrap-up', 'Wrapping Up: Choosing the Right Toggle', 'Summary and decision framework.', 5),
    createLesson(15, 10, '10-request-for-feedback', 'Request for Feedback', 'Share your feedback about this module.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// APPENDIX 1 — A Riverpod Primer (13 lessons)
// ═══════════════════════════════════════════════════════════════

const appendix1: Module = {
  id: 'appendix-1',
  slug: 'a1-riverpod-primer',
  title: 'Appendix: A Riverpod Primer',
  description: 'A crash course on Riverpod state management for Flutter.',
  order: 16,
  lessons: [
    createLesson(16, 1, '01-intro', 'Intro to Riverpod', 'Why Riverpod and how it compares to other solutions.', 8, true),
    createLesson(16, 2, '02-dependencies', 'How to Manage Dependencies in Flutter', 'Dependency injection patterns in Flutter.', 10),
    createLesson(16, 3, '03-riverpod-installation', 'Riverpod: Installation and Setup', 'Install and configure Riverpod.', 8),
    createLesson(16, 4, '04-riverpod-providers', 'Introduction to Providers and Consumers', 'Core Riverpod concepts.', 12),
    createLesson(16, 5, '05-ref-read-watch', 'The Difference Between ref.read and ref.watch', 'When to use read vs watch.', 10),
    createLesson(16, 6, '06-asynchronous-providers', 'Asynchronous Providers in Riverpod', 'Handle async data with providers.', 12),
    createLesson(16, 7, '07-passing-arguments-to-providers', 'Passing Arguments to Providers (Families)', 'Use provider families for parameterized providers.', 10),
    createLesson(16, 8, '08-riverpod-notifiers', 'Introduction to Riverpod Notifiers', 'Manage mutable state with notifiers.', 12),
    createLesson(16, 9, '09-async-notifiers', 'Asynchronous Notifiers in Riverpod', 'Handle async state mutations.', 12),
    createLesson(16, 10, '10-eager-provider-initialization', 'Eager Provider Initialization and Usage with requireValue', 'Initialize providers eagerly at app startup.', 10),
    createLesson(16, 11, '11-provider-lifecycle-keep-alive-dispose', 'The Provider Lifecycle and When to Use keepAlive', 'Control provider lifecycle and disposal.', 10),
    createLesson(16, 12, '12-wrap-up', 'Wrap Up', 'Summary of Riverpod concepts.', 3),
    createLesson(16, 13, '13-request-for-feedback', 'Request for Feedback', 'Share your feedback about this appendix.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// APPENDIX 2 — Common Problems and Solutions (11 lessons)
// ═══════════════════════════════════════════════════════════════

const appendix2: Module = {
  id: 'appendix-2',
  slug: 'a2-common-problems',
  title: 'Appendix: Common Problems and Solutions',
  description: 'Solutions to common issues encountered when shipping Flutter apps.',
  order: 17,
  lessons: [
    createLesson(17, 1, '01-intro', 'List of Common Problems and Solutions', 'Index of common issues and their fixes.', 5, true),
    createLesson(17, 2, '02-android-core-system-modules', 'Android: Failed to transform core-for-system-modules.jar with JDK 21', 'Fix JDK 21 compatibility issues.', 8),
    createLesson(17, 3, '03-android-gradle-incompatible-java', 'Android Gradle Version Incompatible with Java Version', 'Resolve Gradle and Java version conflicts.', 8),
    createLesson(17, 4, '04-android-gradle-requires-java-17', 'Android Gradle Plugin Requires Java 17 to Run', 'Fix Java 17 requirement errors.', 8),
    createLesson(17, 5, '05-android-ndk-version', 'Android NDK Version Mismatch', 'Resolve NDK version conflicts between plugins.', 8),
    createLesson(17, 6, '06-app-stuck-splash-screen', 'App Stuck on the Splash Screen', 'Debug and fix splash screen freezes.', 8),
    createLesson(17, 7, '07-fixing-build-issues-nuclear', 'Fixing Build Issues - Nuclear Option', 'When all else fails: clean everything and start fresh.', 8),
    createLesson(17, 8, '08-ios-invalid-podfile', 'Invalid Podfile: undefined method has_key? for false', 'Fix Flutter 3.29 Podfile issues.', 8),
    createLesson(17, 9, '09-sentry-ios-18-4', 'Flutter 3.29.0 / iOS 18.4 Beta: Sentry Issues', 'Fix Sentry compatibility with iOS 18.4.', 8),
    createLesson(17, 10, '10-source-value-obsolete', 'source value 8 is obsolete', 'Fix obsolete source value warnings.', 5),
    createLesson(17, 11, '11-request-for-feedback', 'Request for Feedback', 'Share your feedback about this appendix.', 2),
  ],
};

// ═══════════════════════════════════════════════════════════════
// COURSE DEFINITION
// ═══════════════════════════════════════════════════════════════

const allModules = [module1, module2, module3, module4, module5, module6, module7, module8, module9, module10, module11, module12, module13, module14, module15, appendix1, appendix2];

const totalLessons = allModules.reduce((sum, m) => sum + m.lessons.length, 0);
const totalDuration = allModules.reduce((sum, m) => sum + m.lessons.reduce((s, l) => s + l.duration, 0), 0);

export const flutterInProductionCourse: Course = {
  id: 'flutter-in-production',
  slug: 'flutter-in-production',
  title: 'Flutter in Production',
  description: 'Learn everything about shipping mobile apps to production: preparing for release, app submissions, release automation, and post-release strategies. A comprehensive 15-module course covering launcher icons, flavors, error monitoring, analytics, force update, in-app reviews, landing pages, App Store & Play Store releases, CI/CD with Codemagic and GitHub Actions, Shorebird code push, automated screenshots, feature toggles, and A/B testing.',
  excerpt: 'The complete guide to releasing professional Flutter apps to production — from app icons to automated CI/CD.',
  instructor: {
    name: 'Andrea Bizzotto',
    avatar: '/assets/branding/profile.jpg',
    bio: 'Flutter GDE and instructor helping developers ship production-ready mobile applications.',
    social: {
      twitter: 'https://twitter.com/baboratorio',
      github: 'https://github.com/bizz84',
      website: 'https://codewithandrea.com',
    },
  },
  coverImage: '/assets/blog/dart.jpg',
  price: 'free',
  difficulty: 'intermediate',
  totalDuration,
  totalLessons,
  tags: ['Flutter', 'Production', 'App Store', 'Play Store', 'CI/CD', 'Sentry', 'Analytics', 'Shorebird', 'Feature Toggles'],
  publishedAt: '2025-01-01',
  updatedAt: '2026-02-26',
  seo: {
    title: 'Flutter in Production — Complete App Release Course',
    description: 'Learn to release professional Flutter apps. 15 modules covering app icons, flavors, error monitoring, analytics, store submissions, CI/CD, Shorebird, and A/B testing.',
    keywords: ['Flutter', 'production', 'app release', 'App Store', 'Play Store', 'CI/CD', 'Codemagic', 'GitHub Actions', 'Shorebird'],
  },
  modules: allModules,
};

// ═══════════════════════════════════════════════════════════════
// ALL COURSES & HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const courses: Course[] = [flutterInProductionCourse];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getLessonBySlug(
  courseSlug: string,
  lessonSlug: string
): { course: Course; module: Module; lesson: Lesson } | undefined {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;

  for (const courseModule of course.modules) {
    const lesson = courseModule.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) {
      return { course, module: courseModule, lesson };
    }
  }
  return undefined;
}

export function getModuleBySlug(courseSlug: string, moduleSlug: string): Module | undefined {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;
  return course.modules.find((m) => m.slug === moduleSlug);
}

export function getAllLessons(course: Course): Lesson[] {
  return course.modules
    .sort((a, b) => a.order - b.order)
    .flatMap((m) => m.lessons.sort((a, b) => a.order - b.order));
}

export function getCourseNavigation(
  course: Course,
  currentLessonId: string,
  completedLessons: string[] = []
): CourseNavigation | undefined {
  const allLessons = getAllLessons(course);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);

  if (currentIndex === -1) return undefined;

  const currentLesson = allLessons[currentIndex];
  const currentModule = course.modules.find((m) =>
    m.lessons.some((l) => l.id === currentLessonId)
  )!;

  let previousLesson: { lesson: Lesson; module: Module } | undefined;
  if (currentIndex > 0) {
    const prevLesson = allLessons[currentIndex - 1];
    const prevModule = course.modules.find((m) =>
      m.lessons.some((l) => l.id === prevLesson.id)
    )!;
    previousLesson = { lesson: prevLesson, module: prevModule };
  }

  let nextLesson: { lesson: Lesson; module: Module } | undefined;
  if (currentIndex < allLessons.length - 1) {
    const nextLessonData = allLessons[currentIndex + 1];
    const nextModule = course.modules.find((m) =>
      m.lessons.some((l) => l.id === nextLessonData.id)
    )!;
    nextLesson = { lesson: nextLessonData, module: nextModule };
  }

  return {
    currentLesson,
    currentModule,
    previousLesson,
    nextLesson,
    progress: {
      completedLessons: completedLessons.length,
      totalLessons: allLessons.length,
      percentage: Math.round((completedLessons.length / allLessons.length) * 100),
    },
  };
}

export function getModuleProgress(
  module: Module,
  completedLessons: string[]
): { completed: number; total: number; percentage: number } {
  const completed = module.lessons.filter((l) => completedLessons.includes(l.id)).length;
  const total = module.lessons.length;
  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function filterCourses(filter: CourseFilter): Course[] {
  let filtered = [...courses];

  if (filter.difficulty) {
    filtered = filtered.filter((c) => c.difficulty === filter.difficulty);
  }

  if (filter.tag) {
    filtered = filtered.filter((c) =>
      c.tags.some((t) => t.toLowerCase() === filter.tag?.toLowerCase())
    );
  }

  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.tags.some((t) => t.toLowerCase().includes(searchLower))
    );
  }

  return filtered;
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  courses.forEach((course) => {
    course.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getFirstLesson(course: Course): Lesson | undefined {
  if (course.modules.length === 0) return undefined;
  const firstModule = course.modules.sort((a, b) => a.order - b.order)[0];
  if (firstModule.lessons.length === 0) return undefined;
  return firstModule.lessons.sort((a, b) => a.order - b.order)[0];
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
