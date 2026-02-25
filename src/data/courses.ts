import { Course, Module, Lesson, CourseNavigation, CourseFilter } from '@/types/course';

// Flutter in Production Course - Real Content
export const flutterInProductionCourse: Course = {
  id: 'flutter-in-production',
  slug: 'flutter-in-production',
  title: 'Flutter in Production',
  description: 'Learn everything about shipping mobile apps: preparing for release, app submissions, release automation, and post-release strategies.',
  excerpt: 'The complete guide to releasing professional Flutter apps to production.',
  instructor: {
    name: 'Andrea',
    avatar: '/assets/branding/profile.jpg',
    bio: 'Flutter instructor helping developers ship production-ready mobile applications.',
  },
  coverImage: '/assets/blog/dart.jpg',
  price: 'free',
  difficulty: 'intermediate',
  totalDuration: 45,
  totalLessons: 3,
  tags: ['Flutter', 'Production', 'App Store', 'Play Store', 'Screenshots', 'Automation'],
  publishedAt: '2025-01-01',
  updatedAt: '2025-01-15',
  seo: {
    title: 'Flutter in Production - Complete App Release Course',
    description: 'Learn to release professional Flutter apps. Covers app icons, splash screens, screenshots, automation, and store submission.',
    keywords: ['Flutter', 'production', 'app release', 'App Store', 'Play Store', 'screenshots'],
  },
  modules: [
    {
      id: 'module-1',
      slug: 'introduction',
      title: 'Module 1 — Course Introduction',
      description: 'Welcome to Flutter in Production and course overview.',
      order: 0,
      lessons: [
        {
          id: 'lesson-1-1',
          slug: 'welcome',
          title: 'Welcome to Flutter in Production',
          description: 'Course introduction and what you will learn.',
          order: 0,
          duration: 10,
          type: 'text',
          isFree: true,
          content: {
            markdown: `
## Welcome to Flutter in Production!

Hey, I'm Andrea, your instructor for this course!

I created this course because **shipping mobile apps is hard**, and there are many things to consider:

### What This Course Covers

#### Preparing for Release
- App icons, splash screens, flavors, environments
- Error reporting, analytics, force update
- Privacy, T&Cs

#### App Submissions
- App store metadata & screenshots
- Compliance
- Testing vs distribution tracks
- Dealing with rejections

#### Release Automation
- CI workflows
- Environment variables
- Custom build steps
- Code signing
- Uploading to the stores

#### Post-Release
- Error monitoring
- Bug fixes
- Addressing user feedback
- Over-the-air updates
- Feature toggles & A/B testing

---

By the end of this course, you'll have all the knowledge needed to confidently ship your Flutter apps to production!

Let's get started!
            `,
          },
        },
      ],
    },
    {
      id: 'module-2',
      slug: 'screenshot-generation',
      title: 'Module 2 — Automated Screenshot Generation',
      description: 'Learn to automate screenshot generation for App Store and Play Store.',
      order: 1,
      lessons: [
        {
          id: 'lesson-2-1',
          slug: 'introduction-to-screenshots',
          title: 'Introduction to Automated Screenshot Generation',
          description: 'Why screenshots matter and how automation helps.',
          order: 0,
          duration: 15,
          type: 'text',
          isFree: true,
          content: {
            markdown: `
## Introduction to Automated Screenshot Generation

Many years ago, I used to publish apps on the App Store. Back then, I didn't have a clue about marketing—and my screenshots proved it!

Compare poorly designed screenshots to polished ones from apps like Citymapper. That's a huge difference, right?

### Why Do Screenshots Matter?

Screenshots are **marketing materials**. They're like ads or billboards for your app.

Since they're the first thing potential users see, they need to:

- ✅ Stand out in a crowded marketplace
- ✅ Communicate value instantly
- ✅ Look polished and professional

That sounds great in theory, but there's a big problem...

### Why Creating Screenshots is a Pain

If you've published apps before, you know how tedious this process is:

1. Manually capture screenshots on iOS & Android (multiple sizes and resolutions)
2. Frame them in a design tool to make them look professional
3. Export and upload them to the stores

But that's just the beginning.

### Things Get Even Worse If...

- **Your app supports multiple languages** → The effort multiplies
- **You release a big update** → You have to redo everything to showcase new features
- **Your app grows** → You need to run A/B tests to optimize conversion rates
- **You run international marketing campaigns** → A simple design + copy-paste won't cut it

It's repetitive, time-consuming, and boring.

So the question is: **Can this be automated?**

### The Screenshot Generation Process

Broadly speaking, there are three main steps:

| Step | Manual | Automated |
|------|--------|-----------|
| **Capture** raw screenshots | Manual | Fastlane snapshot, Maestro |
| **Edit and frame** screenshots | Figma, Canva | Picasso |
| **Upload** screenshots | Manual | Fastlane deliver/supply |

While these tools help streamline the process, there isn't a fully automated solution that does everything. However, the benefits of automation are clear.

### Before & After Automation

**Before Automation:**
- ❌ Slow & painful manual screenshot capturing
- ❌ Inconsistent screenshots (status bars, font sizes, layouts)
- ❌ Time-consuming & error-prone

**After Automation:**
- ✅ High-quality, consistent screenshots across all devices
- ✅ Fast, repeatable workflow using free tools like Maestro, Figma, and Fastlane
- ✅ One-time setup that saves hours in the long run
- ✅ Easily reusable across multiple apps

### What You'll Learn in This Module

This module will walk you through tools and techniques to help you automate screenshot generation:

- 📸 **Capturing Better Screenshots** — Best practices for clean, professional screenshots
- 🤖 **Automated Screenshot Generation with Maestro** — Writing flows for automated screenshots
- 🎨 **Editing Screenshots with Figma** — Framing & designing screenshots
- 🚀 **Automated Screenshot Uploads with Fastlane** — Uploading with custom lanes

Ready? Let's dive in!
            `,
          },
        },
        {
          id: 'lesson-2-2',
          slug: 'tips-for-capturing-screenshots',
          title: 'Tips for Capturing Good Screenshots',
          description: 'Best practices for capturing clean, professional screenshots.',
          order: 1,
          duration: 20,
          type: 'text',
          isFree: false,
          content: {
            markdown: `
## Tips for Capturing Good Screenshots

The first step in the screenshot generation process is capturing the raw screenshots that will later be edited and uploaded to the stores.

In this lesson, you'll learn key strategies to create better screenshots from the start, ensuring they look clean, professional, and engaging.

### What We'll Cover

- Override the iOS Status Bar
- Enable Demo Mode on Android
- Font Size & Readability
- Localization Considerations
- Content & Data Best Practices
- Dark Mode Strategy
- App Store and Play Store Screenshot Sizes

---

## Tell a Story

Don't just capture random screens—think about the story you want to tell.

Instead of asking "What screens should I capture?", ask:

- What problem does my app solve?
- What benefits does it offer?
- What is the main user journey?

Take inspiration from successful apps. For example, **Headspace** tells a story about better mental health through its screenshots.

Once you've defined your story, it becomes much easier to identify the specific screens that support it.

---

## 1. Override the iOS Status Bar

Apple's marketing screenshots always show **9:41 AM** in the status bar. This is the time Steve Jobs unveiled the first iPhone.

To match this convention, run:

\`\`\`bash
xcrun simctl status_bar booted override --time 09:41 --batteryState charged --batteryLevel 100 --cellularBars 4
\`\`\`

To reset:

\`\`\`bash
xcrun simctl status_bar booted clear
\`\`\`

Run \`xcrun simctl status_bar --help\` to explore all available options.

---

## 2. Enable Demo Mode on Android

Android supports a similar feature called **Demo Mode**.

You can enable it from the Android settings:

1. Search **About emulated device** > scroll to the bottom, and tap multiple times on **Build Number** until you see "You are now a developer"
2. Search **Developer options** > scroll down and tap on **System UI demo mode**
3. Toggle **Enable demo mode** and **Show demo mode**

To reset, simply disable the **Show demo mode** option.

---

## 3. Font Size & Readability

When users browse the App Store on their phone, screenshots take up only a portion of the screen.

If your text is too small, it becomes unreadable. To ensure clarity:

- Increase text size when capturing screenshots
- Use bold, high-contrast typography for key messages
- Keep captions concise—avoid blocks of text

### Supporting Dynamic Text Sizing

Avoid the mistake of hardcoding a larger font size just for screenshots. Instead, your app should support **dynamic text scaling** so users can adjust font sizes as needed.

The easiest way to test this is with the \`accessibility_tools\` package, which lets you adjust text scaling directly within your app.

Alternatively, adjust font sizes at the system level:

- **iOS:** Go to Settings > Accessibility > Display & Text Size > Larger Text
- **Android:** Go to Settings > Accessibility > Display size and text

If increasing the text size breaks your UI (truncated text, layout shifts), fix it! Supporting dynamic text properly improves both accessibility and screenshot quality.

---

## 4. Localization Considerations

If your app supports multiple languages, you'll need localized screenshots. This introduces challenges:

| Challenge | Description |
|-----------|-------------|
| **Text Length Differences** | Languages like German tend to have longer words, which may cause layout issues |
| **Right-to-Left (RTL) Layouts** | Arabic and Hebrew require mirrored UI |
| **Font Readability** | Chinese and Japanese may need different font sizes for clarity |

### Best Practices

- Test all supported languages before capturing screenshots
- Use flexible layouts to accommodate text expansion
- Check RTL support to ensure correct mirroring

Localization mistakes can make your app look unpolished—so verify everything before capturing.

---

## 5. Content & Data Best Practices

Your screenshots should feel polished and intentional. Pay attention to:

- **Test Data:** Use high-quality, realistic content (not placeholder text)
- **Privacy:** Never display real user data or personal information
- **Consistency:** Ensure data across screenshots tells a cohesive story
- **Relevance:** Highlight features that differentiate your app

> **Tip:** Create a dedicated test account with carefully curated content for screenshots. This guarantees consistency and avoids exposing sensitive information.

---

## 6. Dark Mode Strategy

If your app supports dark mode, decide how to handle it in screenshots:

- Include both light and dark mode screenshots?
- Choose only one mode for a consistent look?
- Use different modes for different features?

Dark mode screenshots can look visually striking in the stores, but ensure they accurately represent the user experience and align with your branding.

---

## 7. App Store and Play Store Screenshot Sizes

**Apple** requires screenshots to match specific dimensions based on the target device.

**Google Play** screenshots need to have a **16:9 or 9:16** aspect ratio, with each side between **320 px and 3,840 px**.

The iOS simulator and Android emulator capture screenshots at native resolution by default, but it's always a good idea to double-check the dimensions before uploading.

> **Tip:** Press **CMD+S** in the iOS simulator or Android emulator to capture a full-resolution screenshot.

---

## Screenshot Readiness Checklist

Before capturing screenshots:

- [ ] Define the story your screenshots will tell
- [ ] Identify key screens to capture
- [ ] Override the iOS & Android status bar
- [ ] Ensure proper text scaling in your app
- [ ] Prepare a test account with curated content

In the next lessons, we'll cover manual and automated screenshot capturing techniques, followed by enhancing screenshots with design tools before uploading them to the stores.
            `,
          },
        },
      ],
    },
  ],
};

// All courses array
export const courses: Course[] = [flutterInProductionCourse];

// Helper functions

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

  // Find previous lesson
  let previousLesson: { lesson: Lesson; module: Module } | undefined;
  if (currentIndex > 0) {
    const prevLesson = allLessons[currentIndex - 1];
    const prevModule = course.modules.find((m) =>
      m.lessons.some((l) => l.id === prevLesson.id)
    )!;
    previousLesson = { lesson: prevLesson, module: prevModule };
  }

  // Find next lesson
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
