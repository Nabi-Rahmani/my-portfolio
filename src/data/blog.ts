import { BlogPost, BlogCategory } from '@/types/blog';

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Riverpod: The Future of Flutter State Management',
        slug: 'riverpod-flutter-state-management-guide',
        excerpt: 'Discover why Riverpod is revolutionizing Flutter state management. A friendly guide to understanding this powerful tool that makes app development smoother and more enjoyable.',
        content: `
# Riverpod: The Future of Flutter State Management

Have you ever felt frustrated trying to manage data in your Flutter app? You're not alone! State management can be one of the trickiest parts of app development, but Riverpod is here to make your life so much easier.

## What Makes Riverpod Special?

Think of Riverpod as your app's personal assistant that never forgets anything and always knows exactly what your app needs at any moment. It's like having a super-organized friend who keeps track of all your app's data and makes sure everything stays in sync.

### Why Developers Love Riverpod

**It Catches Your Mistakes Early**
Remember those annoying bugs that only show up when users are actually using your app? Riverpod helps catch these problems before your app even runs. It's like having a spell-checker but for your code logic.

**No More Context Confusion**
One of the most frustrating things in Flutter development is dealing with context dependencies. Riverpod eliminates this headache completely. You can access your data from anywhere in your app without jumping through hoops.

**Testing Becomes a Breeze**
Testing apps can be tedious, but Riverpod makes it surprisingly enjoyable. You can easily test different scenarios and make sure your app behaves correctly in all situations.

**Memory Management on Autopilot**
Worried about your app using too much memory? Riverpod automatically cleans up resources you're not using anymore. It's like having a personal housekeeper for your app's memory.

## Getting Started is Simple

The beauty of Riverpod is that you can start small and gradually adopt more features as you become comfortable. You don't need to rewrite your entire app overnight.

### Your First Steps

Setting up Riverpod is surprisingly straightforward. You add it to your project, wrap your app with a special widget, and you're ready to go. It's designed to be beginner-friendly while being powerful enough for complex applications.

### Understanding the Basics

Riverpod works with the concept of "providers" - think of them as containers that hold your data and logic. These containers are smart enough to know when to update, when to refresh, and when to clean themselves up.

## Real-World Benefits

**Faster Development**
Once you get the hang of Riverpod, you'll find yourself building features much faster. The clear patterns and helpful tools mean less time debugging and more time creating.

**Better App Performance**
Apps built with Riverpod tend to be more responsive and use resources more efficiently. Your users will notice the difference in how smooth everything feels.

**Easier Collaboration**
If you're working with a team, Riverpod's clear structure makes it easier for everyone to understand and contribute to the codebase. New team members can get up to speed quickly.

## Making the Switch

If you're currently using other state management solutions, don't worry! Riverpod is designed to work alongside existing code. You can migrate gradually, one feature at a time, without breaking anything.

The learning curve is gentler than you might expect. The official documentation is excellent, and the community is incredibly helpful and welcoming to newcomers.

## The Bottom Line

Riverpod isn't just another tool - it's a game-changer that makes Flutter development more enjoyable and productive. Whether you're building your first app or your fiftieth, Riverpod helps you write better code with less stress.

Ready to give it a try? Your future self will thank you for making the switch to this powerful, developer-friendly solution.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-10',
        updatedAt: '2025-09-10',
        readingTime: 5,
        category: 'Flutter Development',
        tags: ['Flutter', 'Riverpod', 'State Management', 'Architecture'],
        featured: true,
        coverImage: '/assets/blog-images/dart.jpg',
        seo: {
            title: 'Riverpod Flutter State Management: Complete Guide | CodeWithNabi',
            description: 'Master Riverpod for Flutter state management. Learn advanced patterns, best practices, and why it\'s the future of Flutter development.',
            keywords: ['Flutter', 'Riverpod', 'State Management', 'Provider', 'Architecture']
        }
    },
    {
        id: '2',
        title: 'Firebase: Your Complete Backend Solution for Flutter',
        slug: 'firebase-complete-backend-flutter',
        excerpt: 'Explore how Firebase transforms Flutter development by handling all the complex backend stuff, so you can focus on creating amazing user experiences.',
        content: `
# Firebase: Your Complete Backend Solution for Flutter

Imagine if you could build a full-featured app without worrying about servers, databases, or complex backend infrastructure. That's exactly what Firebase offers - it's like having an entire backend team working for you around the clock.

## Why Firebase is a Game-Changer

Building modern apps used to mean you needed expertise in frontend development, backend programming, database management, server configuration, and more. Firebase changes all of that by handling the complicated backend stuff automatically.

### The Magic Behind Firebase

**Everything Just Works Together**
Firebase isn't just one tool - it's an entire ecosystem of services that work seamlessly together. Authentication talks to your database, your database syncs with storage, and analytics tracks everything automatically. It's like having puzzle pieces that perfectly fit together every time.

**Real-Time is Built In**
Remember when getting real-time updates in apps was incredibly difficult? Firebase makes it feel like magic. When one user makes a change, everyone else sees it instantly. No complex setup, no server management - it just works.

**Scales with Your Success**
Starting with a few users? Firebase handles it effortlessly. Suddenly have thousands of users? Firebase scales automatically without you lifting a finger. It's designed to grow with your app's success.

## The Services That Make a Difference

**Authentication Made Simple**
User login and registration can be one of the most complex parts of app development. Firebase handles email/password authentication, social logins like Google and Facebook, and even advanced features like phone number verification. Your users get a smooth experience, and you get peace of mind about security.

**Database That Thinks Ahead**
Cloud Firestore is like having a super-smart database that knows exactly how mobile apps work. It automatically syncs data between devices, works offline, and comes back online seamlessly. Your users never have to worry about losing their data.

**File Storage Without Headaches**
Need to store user profile pictures, documents, or videos? Cloud Storage handles files of any size and automatically optimizes delivery based on the user's connection. No more worrying about server space or slow downloads.

**Analytics That Actually Help**
Firebase Analytics doesn't just tell you numbers - it helps you understand how people actually use your app. You'll discover which features are popular, where users get stuck, and how to make your app even better.

## Real-World Benefits You'll Love

**Development Speed That Surprises**
Developers consistently report building apps 3-5 times faster with Firebase. Features that used to take weeks can be implemented in days. You'll spend more time on what makes your app unique and less time on infrastructure.

**Rock-Solid Reliability**
Firebase runs on Google's infrastructure - the same technology that powers Google Search and YouTube. Your app benefits from world-class reliability and performance without any extra effort from you.

**Security You Can Trust**
Security isn't an afterthought with Firebase - it's built into everything. From authentication to database rules, Firebase helps you follow security best practices even if you're not a security expert.

## Getting Started is Surprisingly Easy

The best part about Firebase is how approachable it is. You don't need to be a backend expert to use it effectively. The setup process is straightforward, and you can add features one at a time as your app grows.

### Your Journey with Firebase

Most developers start with authentication - getting users to sign up and log in. Once that's working smoothly, they add a database to store user data. Then maybe file storage for user uploads, and eventually analytics to understand user behavior.

Each step builds naturally on the previous one, and you never feel overwhelmed by complexity.

## The Community Advantage

Firebase has an incredible community of developers who share tips, tutorials, and solutions. When you run into questions (and you will - it's part of development!), you'll find helpful answers from developers who've been there before.

## Making Your Decision

If you're tired of fighting with backend complexity and want to focus on creating great user experiences, Firebase might be exactly what you need. It's not just about making development easier - it's about making development more enjoyable.

Whether you're building your first app or your hundredth, Firebase provides the foundation that lets you think bigger and move faster. Your users will appreciate the reliability, and you'll appreciate getting back to the creative parts of development.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-05',
        updatedAt: '2025-09-05',
        readingTime: 6,
        category: 'Backend Development',
        tags: ['Firebase', 'Flutter', 'Backend', 'Authentication', 'Cloud'],
        featured: true,
        coverImage: '/assets/blog-images/firebase.png',
        seo: {
            title: 'Firebase Complete Backend Guide for Flutter | CodeWithNabi',
            description: 'Master Firebase for Flutter development. Learn authentication, Firestore, storage, and best practices for building scalable apps.',
            keywords: ['Firebase', 'Flutter', 'Backend', 'Authentication', 'Firestore', 'Cloud']
        }
    },
    {
        id: '3',
        title: 'Shorebird: Revolutionary Code Push for Flutter',
        slug: 'shorebird-code-push-flutter-guide',
        excerpt: 'Discover how Shorebird lets you instantly update your Flutter apps without waiting for app store approval. It\'s like having superpowers for app deployment.',
        content: `
# Shorebird: Revolutionary Code Push for Flutter

Have you ever discovered a critical bug in your live app and felt that sinking feeling knowing it could take days or weeks to get a fix to your users? Shorebird changes everything by letting you push updates instantly, no app store approval needed.

## The Problem We All Face

App store reviews can be unpredictable. Sometimes they approve updates in hours, sometimes it takes days, and occasionally they reject perfectly good fixes for mysterious reasons. Meanwhile, your users are stuck with bugs, and you're losing sleep knowing you could fix everything if only you could update your app instantly.

### The Shorebird Solution

Imagine having the power to fix bugs and add features with the click of a button, and having those changes appear in your users' apps within minutes. That's exactly what Shorebird delivers - instant over-the-air updates for Flutter apps.

## Why This is Revolutionary

**Instant Bug Fixes**
Found a critical bug? With Shorebird, you can push a fix and have it running on user devices in minutes, not days. Your users stay happy, and you can sleep peacefully knowing problems get resolved immediately.

**Feature Updates Without Friction**
Want to tweak a feature or improve user experience? Traditional app deployment means waiting for store approval. Shorebird means your improvements reach users instantly.

**Risk-Free Deployments**
Made a mistake in your update? No problem! Shorebird lets you roll back changes instantly. It's like having an undo button for your entire app.

**Happy Users**
Users love getting improvements and fixes quickly. Instead of being stuck with problems for weeks, they see continuous improvements that make their experience better every day.

## How It Works (The Simple Version)

Think of Shorebird like having a special delivery service for your app updates. Instead of going through the app store's front door (which requires inspection and approval), Shorebird delivers updates through a side door that's always open.

Your app periodically checks for updates in the background. When it finds one, it downloads and applies the changes automatically. Users don't even notice it happening - they just get a better app experience.

## Real-World Benefits

**Faster Response to Issues**
Customer support becomes much easier when you can fix problems immediately. Instead of saying "we'll fix that in the next update," you can say "that's already fixed!"

**Competitive Advantage**
While your competitors wait for app store approval, you're continuously improving your app. Users notice the difference in responsiveness and quality.

**Reduced Development Stress**
Knowing you can fix problems instantly reduces the pressure of having to get everything perfect before release. You can be more agile and responsive to user feedback.

**Better Testing in the Wild**
You can push updates to a small group of users first, see how they work in real conditions, then roll out to everyone. It's like having a safety net for every update.

## Getting Started is Straightforward

Shorebird is designed to work with your existing Flutter development workflow. You don't need to rewrite your app or change how you build features. It integrates seamlessly with what you're already doing.

### The Learning Curve

If you're comfortable with Flutter development, you'll find Shorebird surprisingly easy to understand. The concepts are straightforward, and the tools are designed to feel familiar to Flutter developers.

Most developers have their first update working within a few hours of starting with Shorebird. The documentation is clear, and the community is helpful for any questions that come up.

## Smart About Safety

Shorebird isn't just about speed - it's about safe, reliable updates. It includes features like gradual rollouts, automatic rollbacks if problems are detected, and respect for user preferences about downloads and data usage.

## Who Benefits Most

**Solo Developers**: Get the responsiveness of a large development team without the overhead.

**Small Teams**: Compete with larger companies by being more agile and responsive.

**Enterprise Apps**: Reduce support costs and improve user satisfaction with instant issue resolution.

**Any App with Active Users**: Keep your audience engaged with continuous improvements.

## The Bottom Line

Shorebird represents a fundamental shift in how we think about app deployment. Instead of big, infrequent updates that require careful planning and app store approval, you can embrace continuous improvement and instant responsiveness.

It's not just a tool - it's a superpower that lets you be the kind of developer who can fix problems immediately and delight users with constant improvements. Your future self (and your users) will thank you for making the switch.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-01',
        updatedAt: '2025-09-01',
        readingTime: 5,
        category: 'DevOps',
        tags: ['Shorebird', 'Flutter', 'Deployment', 'Code Push', 'DevOps'],
        featured: false,
        coverImage: '/assets/blog-images/shorebird-flutter.webp',
        seo: {
            title: 'Shorebird Code Push for Flutter: Complete Guide | CodeWithNabi',
            description: 'Master Shorebird for Flutter instant updates. Learn implementation, best practices, and deployment strategies for seamless app updates.',
            keywords: ['Shorebird', 'Flutter', 'Code Push', 'Deployment', 'OTA Updates']
        }
    },
    {
        id: '4',
        title: 'Supabase: The Open Source Firebase Alternative for Flutter',
        slug: 'supabase-firebase-alternative-flutter',
        excerpt: 'Explore Supabase as a powerful, developer-friendly alternative to Firebase. It\'s open source, built on PostgreSQL, and gives you more control over your data.',
        content: `
# Supabase: The Open Source Firebase Alternative for Flutter

What if you could have all the convenience of Firebase but with complete transparency, more control, and the power of a real database? That's exactly what Supabase offers - it's like Firebase's more flexible, open-minded cousin.

## Why Developers Are Making the Switch

**Complete Transparency**
Unlike closed-source alternatives, Supabase is completely open source. You can see exactly how everything works, contribute improvements, and never worry about vendor lock-in. It's refreshing to work with technology you can fully understand and trust.

**Real Database Power**
While other solutions use specialized databases, Supabase is built on PostgreSQL - one of the most powerful and reliable databases ever created. This means you get real SQL, complex queries, and decades of database engineering excellence.

**You're in Control**
Need to host your data in a specific country? Want to run everything on your own servers? With Supabase, you have options. You're not locked into anyone else's infrastructure decisions.

## What Makes Supabase Special

**It Speaks SQL**
Remember learning SQL and thinking it was actually pretty elegant? With Supabase, that knowledge isn't wasted. You can write real database queries, create complex relationships, and use advanced database features that other platforms don't offer.

**Real-Time That Just Works**
Live updates between users happen automatically. When someone adds a comment, likes a post, or updates their profile, everyone else sees it instantly. It feels like magic, but it's just good engineering.

**Authentication Without Headaches**
User login, password resets, email verification, social logins - all the authentication features you need work seamlessly. Plus, you get advanced features like row-level security that protect your data automatically.

**File Storage That Scales**
Upload user avatars, documents, videos, or any other files. Supabase handles the storage, optimization, and delivery. Your users get fast downloads, and you get peace of mind.

## Developer Experience That Delights

**Documentation That Actually Helps**
Ever read documentation that felt like it was written for the developers who built the system? Supabase docs are written for real developers building real apps. They include examples, explain the "why" behind decisions, and help you succeed.

**Dashboard That Makes Sense**
The Supabase dashboard is intuitive and powerful. You can manage your database, view real-time activity, configure authentication, and monitor your app's performance all in one place.

**Community Support**
The Supabase community is incredibly welcoming and helpful. Whether you're a beginner asking basic questions or an expert diving into advanced features, you'll find people eager to help.

## Real-World Benefits

**Faster Development**
Developers report building features significantly faster with Supabase. The clear APIs, excellent documentation, and powerful features mean less time fighting infrastructure and more time building great user experiences.

**Lower Costs**
Supabase's pricing is transparent and often significantly lower than alternatives. Plus, if you want to self-host to save even more, you can do that too.

**Better Performance**
PostgreSQL is incredibly fast and efficient. Your users will notice snappier responses and smoother experiences, especially as your app grows.

**Future-Proof Architecture**
Since Supabase is built on standard technologies like PostgreSQL and follows open standards, your investment is protected. You're building on solid foundations that will serve you well for years.

## Getting Started is Surprisingly Simple

Despite all this power, Supabase is remarkably easy to get started with. The setup process is straightforward, and you can have a working backend in minutes.

### Your First Steps

Most developers start by creating a simple table and connecting their Flutter app. Once that's working, they add authentication, then real-time features, then file storage. Each step builds naturally on the previous one.

The learning curve is gentle because Supabase doesn't try to reinvent everything. If you know databases, you'll feel at home. If you're new to backend development, the concepts are clear and well-explained.

## When Supabase Shines

**Complex Data Relationships**
If your app needs to model real-world relationships between data, PostgreSQL's relational features are incredibly powerful. You can express complex business logic directly in your database.

**Growing Applications**
Supabase scales beautifully as your app grows. Features that work for 100 users continue working for 100,000 users, often without any changes to your code.

**Team Collaboration**
Multiple developers can work with Supabase easily. The clear structure and familiar technologies mean new team members can contribute quickly.

**International Applications**
With options for different hosting regions and the ability to self-host, Supabase works well for apps with global audiences or specific data sovereignty requirements.

## The Open Source Advantage

Being open source isn't just about the code - it's about philosophy. Supabase is built by developers, for developers. The team listens to feedback, implements requested features, and maintains the high standards the community expects.

## Making Your Decision

If you value transparency, want the power of a real database, and appreciate having options about how and where your app runs, Supabase might be perfect for your next project.

Whether you're building your first app or migrating from another platform, Supabase provides a solid foundation that grows with your needs. It's not just about building apps - it's about building them on your terms.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-08-28',
        updatedAt: '2025-08-28',
        readingTime: 7,
        category: 'Backend Development',
        tags: ['Supabase', 'Flutter', 'Backend', 'PostgreSQL', 'Open Source'],
        featured: false,
        coverImage: '/assets/blog-images/supabase-fluuter.jpg',
        seo: {
            title: 'Supabase vs Firebase for Flutter: Complete Guide | CodeWithNabi',
            description: 'Master Supabase for Flutter development. Learn authentication, real-time features, and why it\'s the powerful Firebase alternative.',
            keywords: ['Supabase', 'Flutter', 'Firebase Alternative', 'PostgreSQL', 'Backend']
        }
    },
    {
        id: '5',
        title: 'Feature-First Clean Architecture in Flutter: A Practical Guide',
        slug: 'flutter-clean-architecture-feature-first',
        excerpt: 'Learn how to structure your Flutter apps with Feature-First Clean Architecture. Four layers, strict boundaries, and a folder structure that scales from hobby project to production app.',
        content: `
# Feature-First Clean Architecture in Flutter: A Practical Guide

Ever opened a Flutter project and felt completely lost? Files scattered everywhere, business logic mixed with UI code, and nobody knows where anything should go. There's a better way, and it's called Feature-First Clean Architecture.

## The Problem with "Default" Flutter Projects

Most Flutter tutorials organize code by type: all screens in one folder, all models in another, all services somewhere else. This works fine for a to-do app. But the moment your app grows beyond a few screens, you're scrolling through folders with dozens of files, trying to figure out which \`user_service.dart\` belongs to which feature.

**Feature-First** flips this approach. Instead of grouping by type, you group by feature. Everything related to "chat" lives inside \`feature/chat/\`. Everything for "payments" lives in \`feature/payments/\`. Each feature is self-contained and easy to find.

## The Four Layers

Every feature has exactly four layers, and they always talk in one direction:

\`\`\`
Domain -> Data -> Application -> Presentation
\`\`\`

Think of it like a restaurant. The **Domain** is the menu (what's available). The **Data** layer is the kitchen (where things are prepared). The **Application** layer is the head chef (decides how things are made). The **Presentation** layer is the waiter (interacts with customers).

### 1. Domain Layer: The Contracts

This is the purest layer. It contains your entities (data models) and abstract repository interfaces. No Flutter imports, no database code, no API calls. Just plain Dart.

\`\`\`dart
// Pure Dart - no Flutter, no Drift, no Supabase
abstract class ChatRepository {
  Stream<List<ChatMessage>> watchMessages(String chatId);
  Future<void> sendMessage(String chatId, ChatMessage message);
  Future<void> deleteMessage(String messageId);
}
\`\`\`

Why abstract? Because the Domain layer defines **what** your app can do, not **how** it does it. This separation is what makes your code testable and flexible.

### 2. Data Layer: The Mechanics

This layer implements the abstract interfaces from Domain. It talks to APIs, databases, and external services. But it has one strict rule: **no business logic**.

\`\`\`dart
class ChatRepositoryImpl implements ChatRepository {
  final ChatLocalDataSource _local;
  final ChatRemoteDataSource _remote;

  @override
  Stream<List<ChatMessage>> watchMessages(String chatId) {
    return _local.watchMessages(chatId);
  }

  @override
  Future<void> sendMessage(String chatId, ChatMessage message) async {
    await _local.saveMessage(message);  // Save locally first
    await _remote.sendMessage(message); // Then sync to server
  }
}
\`\`\`

The Data layer is "dumb" on purpose. It saves, fetches, syncs, and caches. It never decides whether something is valid or whether a business rule is met.

### 3. Application Layer: The Brain

All your business logic lives here. Validation rules, calculations, business constraints - everything that makes your app *your app*.

\`\`\`dart
class ChatService {
  final ChatRepository _repo; // Depends on the ABSTRACT interface

  Future<void> sendText(String chatId, String text) async {
    // Business rule: messages can't be empty
    if (text.trim().isEmpty) {
      throw ValidationException('Message cannot be empty');
    }

    final message = ChatMessage(
      id: Uuid().v4(),
      chatId: chatId,
      text: text,
      timestamp: DateTime.now(),
    );

    await _repo.sendMessage(chatId, message);
  }
}
\`\`\`

Notice how the service depends on the **abstract** \`ChatRepository\`, not the concrete \`ChatRepositoryImpl\`. This means you can swap implementations without changing a single line of business logic.

### 4. Presentation Layer: The Face

This is your UI. Screens, widgets, and controllers. The key rule: **no business logic here**. Controllers just trigger services and display the results.

\`\`\`dart
class ChatController extends AsyncNotifier<void> {
  @override
  Future<void> build() async {}

  Future<void> sendMessage(String text) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await ref.read(chatServiceProvider).sendText('chat-id', text);
    });
  }
}
\`\`\`

The controller doesn't validate, doesn't format, doesn't compute. It triggers the service and lets Riverpod handle the loading/error/success states.

## The Folder Structure

Here's what a feature looks like on disk:

\`\`\`
lib/src/feature/chat/
  domain/
    chat_message.dart          # Entity
    chat_repository.dart       # Abstract interface
  data/
    chat_repository_impl.dart  # Concrete implementation
    chat_mapper.dart           # DTO <-> Domain conversion
    local/
      local_chat_data_source.dart
    remote/
      remote_chat_data_source.dart
  application/
    chat_service.dart          # Business logic
  presentation/
    controllers/
      send_message_controller.dart
    chat_screen/
      chat_screen.dart
\`\`\`

**Every new feature gets all four folders.** Even if one layer is thin, create the folder. Consistency beats cleverness.

## Rules That Save You From Yourself

Here are the rules that keep this architecture working:

1. **Domain never imports Flutter.** If you see \`import 'package:flutter'\` in Domain, something's wrong.
2. **Data never validates.** "Is this order valid?" belongs in Application. Data just saves and fetches.
3. **Application never touches APIs directly.** It talks through abstract repository interfaces.
4. **Presentation never contains business logic.** Controllers trigger services and display results.
5. **One public class per file.** Aim for under 150 lines. Hard limit at 200.
6. **Extract CustomPainters** into their own files in a \`painters/\` subfolder.

## Why This Matters

When every developer on your team knows exactly where code goes, magic happens:

- **New features are faster** because you follow a recipe, not your intuition
- **Bugs are easier to find** because you know which layer to look in
- **Testing is straightforward** because each layer can be tested in isolation
- **Onboarding is faster** because the structure is self-documenting

## The Decision Checklist

Before writing code, always ask: **"Which layer does this belong to?"**

| Question | Layer |
|----------|-------|
| "What data does my app work with?" | Domain |
| "How do I fetch/save this data?" | Data |
| "Is this action valid? What are the rules?" | Application |
| "How does the user interact with this?" | Presentation |

## Getting Started

You don't need to refactor your entire app overnight. Pick one feature, create the four folders, and move the code where it belongs. Once you see how clean it feels, you'll want to do the rest.

The initial setup takes a bit longer than throwing everything in one file. But the first time you need to change a business rule and it only requires editing one file in one layer - that's when you'll understand why this architecture exists.

Clean architecture isn't about perfection. It's about having a place for everything, so that when your app grows, your codebase grows with grace instead of chaos.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-10-15',
        updatedAt: '2025-10-15',
        readingTime: 8,
        category: 'Flutter Development',
        tags: ['Flutter', 'Architecture', 'Clean Architecture', 'Best Practices'],
        featured: true,
        coverImage: '/assets/blog-images/clean-architecture.png',
        seo: {
            title: 'Feature-First Clean Architecture in Flutter | CodeWithNabi',
            description: 'Learn how to structure Flutter apps with Feature-First Clean Architecture. Four layers, strict boundaries, and scalable folder structure.',
            keywords: ['Flutter', 'Clean Architecture', 'Feature-First', 'App Architecture', 'Best Practices']
        }
    },
    {
        id: '6',
        title: 'Advanced Riverpod Patterns Every Flutter Developer Should Know',
        slug: 'advanced-riverpod-patterns-flutter',
        excerpt: 'Go beyond the basics. Learn single-action controllers, debounced search, pagination, optimistic updates, and the rebuild prevention techniques that make your Flutter apps performant.',
        content: `
# Advanced Riverpod Patterns Every Flutter Developer Should Know

You know how to create a provider and watch it in a widget. Great. But production Flutter apps need more than the basics. They need patterns for search, pagination, performance, and real-world state transitions. Let's level up.

## Single-Action Controllers: The Golden Rule

The most important Riverpod pattern is also the simplest: **one controller, one job**.

\`\`\`
BAD:  ProductController with create, update, delete, favorite, archive
GOOD: Separate controllers for each action:
   - ToggleTaskController       (toggle completion)
   - DeleteTaskController       (delete a task)
   - AddTaskController          (add a task)
\`\`\`

Why? Because each controller has its own loading and error states. When \`ToggleTaskController\` is loading, you can show a spinner on the checkbox without affecting the delete button. If you cram everything into one controller, a loading state for "delete" also disables "toggle."

\`\`\`dart
@riverpod
class ToggleTaskController extends _\$ToggleTaskController {
  @override
  FutureOr<void> build() {}

  Future<void> toggleTaskCompletion(int dayNumber, int taskIndex) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      final service = ref.read(disciplineServiceProvider);
      await service.toggleTaskCompletion(dayNumber, taskIndex);
      ref.invalidate(disciplineControllerProvider);
    });
  }
}
\`\`\`

Name your controllers by their **job**, not by their entity. \`ToggleTaskController\`, not \`TaskController\`.

## Debounced Search That Actually Works

Every search implementation needs debouncing, but most tutorials get it wrong. Here's the clean Riverpod way:

\`\`\`dart
@riverpod
class SearchQuery extends _\$SearchQuery {
  @override
  String build() => '';
  void update(String query) => state = query;
}

@riverpod
Future<List<Item>> searchResults(Ref ref) async {
  final query = ref.watch(searchQueryProvider);

  if (query.trim().isEmpty) return []; // No API call for empty query

  // Debounce: wait 300ms after last keystroke
  await Future.delayed(const Duration(milliseconds: 300));

  final service = ref.read(itemServiceProvider);
  return service.search(query);
}
\`\`\`

The magic: when the user types another character, Riverpod auto-disposes the old provider and starts a new one. The 300ms delay in the old provider never completes. You get automatic cancellation for free.

## Pagination Without Losing Your List

The trickiest part of pagination is loading the next page **without** replacing the current list. If you set \`state = AsyncLoading()\`, you lose all visible items. Users hate that.

\`\`\`dart
@riverpod
class PaginatedListController extends _\$PaginatedListController {
  static const _pageSize = 20;

  @override
  Future<PaginatedState<Item>> build() async {
    final result = await ref.watch(itemServiceProvider).fetchItems(limit: _pageSize);
    return PaginatedState(
      items: result.items,
      hasMore: result.items.length >= _pageSize,
      nextCursor: result.nextCursor,
    );
  }

  Future<void> loadMore() async {
    final current = state.valueOrNull;
    if (current == null || current.isLoadingMore || !current.hasMore) return;

    // Use a flag, NOT AsyncLoading
    state = AsyncData(current.copyWith(isLoadingMore: true));

    try {
      final result = await ref.read(itemServiceProvider).fetchItems(
        limit: _pageSize,
        cursor: current.nextCursor,
      );
      state = AsyncData(current.copyWith(
        items: [...current.items, ...result.items],
        isLoadingMore: false,
        hasMore: result.items.length >= _pageSize,
        nextCursor: result.nextCursor,
      ));
    } catch (e) {
      state = AsyncData(current.copyWith(isLoadingMore: false, error: e.toString()));
    }
  }
}
\`\`\`

Key insight: use \`isLoadingMore: true\` in your state, **not** \`AsyncLoading\`. This keeps existing items visible while the spinner shows at the bottom.

## Preventing Rebuild Cascades

The most common performance problem in Riverpod isn't slow providers. It's **wide dependency scope** - one widget watching too many providers.

\`\`\`dart
// BAD - ANY of these changing rebuilds the ENTIRE widget
class DashboardScreen extends ConsumerWidget {
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);
    final stats = ref.watch(statsProvider);
    final theme = ref.watch(themeProvider);
    return Column(children: [
      Header(name: user.name),     // rebuilds when stats change
      StatsCard(stats: stats),     // rebuilds when user changes
      ThemeBadge(theme: theme),    // rebuilds when stats change
    ]);
  }
}
\`\`\`

**Fix: push \`ref.watch\` down to leaf widgets.**

\`\`\`dart
// GOOD - each widget watches only what it needs
class DashboardScreen extends StatelessWidget {
  Widget build(BuildContext context) {
    return Column(children: [
      const DashboardHeader(),  // watches userProvider only
      const DashboardStats(),   // watches statsProvider only
      const ThemeBadge(),       // watches themeProvider only
    ]);
  }
}

class DashboardHeader extends ConsumerWidget {
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);
    return Text(user.name);
  }
}
\`\`\`

Now when \`statsProvider\` changes, only \`DashboardStats\` rebuilds. Zero wasted work.

## Side Effects Done Right

This is where most developers make mistakes. The rule is simple:

- **\`ref.watch\`** is for rendering (in \`build()\`)
- **\`ref.listen\`** is for reacting (also in \`build()\`, but for side effects)
- **\`ref.read\`** is for one-time actions (in callbacks)

\`\`\`dart
class TaskScreen extends ConsumerWidget {
  Widget build(BuildContext context, WidgetRef ref) {
    // Side effect: show error dialog when action fails
    ref.listen(toggleTaskControllerProvider, (prev, next) {
      next.showAlertDialogOnError(context);
    });

    // Navigate on success (check the TRANSITION, not just the value)
    ref.listen(saveControllerProvider, (prev, next) {
      if (prev?.isLoading == true && next.hasValue && !next.isLoading) {
        Navigator.of(context).pop();
      }
    });

    // Rendering
    final tasks = ref.watch(taskListProvider);
    return tasks.when(
      data: (data) => TaskList(tasks: data),
      loading: () => const CircularProgressIndicator(),
      error: (e, st) => ErrorView(error: e),
    );
  }
}
\`\`\`

The transition check (\`prev?.isLoading == true\`) is critical. Without it, the listener fires on initial build when state goes from null to \`AsyncData(void)\`, causing premature navigation.

## The keepAlive Decision Tree

Not sure whether a provider should persist or auto-dispose? Follow this:

\`\`\`
Is it a database, SDK client, or platform service?
  YES -> keepAlive: true (expensive singleton)
  NO  -> Does it hold app-wide state that survives navigation?
    YES -> keepAlive: true
    NO  -> Does it cache static data that never changes mid-session?
      YES -> keepAlive: true
      NO  -> Use @riverpod (auto-dispose, the default)
\`\`\`

Most providers should auto-dispose. Only use \`keepAlive\` for singletons and static data.

## Stale-While-Revalidate

Show old data while loading new data. Users see content immediately instead of a loading spinner:

\`\`\`dart
Future<void> refresh() async {
  // Keep showing old data during reload
  state = const AsyncLoading<AnalyticsData>().copyWithPrevious(state);
  state = await AsyncValue.guard(() async {
    return ref.read(analyticsServiceProvider).calculateAnalytics();
  });
}
\`\`\`

\`copyWithPrevious\` is the secret weapon. The widget sees \`isLoading: true\` AND \`hasValue: true\` simultaneously, so it can show a subtle spinner over the existing content.

## The Naming Convention That Saves Your Sanity

Name everything by its **job**, and make method names specific:

\`\`\`dart
// GOOD - specific verb + target
controller.searchById(userId);
controller.toggleTaskCompletion(dayNumber, taskIndex);
controller.syncLocalToRemote();

// BAD - generic verbs that could mean anything
controller.execute();
controller.run();
controller.handle();
controller.process();
\`\`\`

If a method name doesn't tell you what it does without reading the implementation, rename it.

## What You Should Do Next

Pick one pattern from this article and apply it to your current project. Start with single-action controllers - they give you the most immediate benefit with the least refactoring. Then move to rebuild prevention. Then pagination and search.

Each pattern is independent. You don't need to adopt them all at once. But once you start using them, you'll wonder how you ever built apps without them.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-10-08',
        updatedAt: '2025-10-08',
        readingTime: 10,
        category: 'Flutter Development',
        tags: ['Flutter', 'Riverpod', 'State Management', 'Performance', 'Patterns'],
        featured: true,
        coverImage: '/assets/blog-images/riverpod-expert.png',
        seo: {
            title: 'Advanced Riverpod Patterns for Flutter | CodeWithNabi',
            description: 'Master advanced Riverpod patterns: single-action controllers, debounced search, pagination, rebuild prevention, and side effects.',
            keywords: ['Flutter', 'Riverpod', 'Advanced Patterns', 'State Management', 'Performance']
        }
    },
    {
        id: '7',
        title: 'Building Offline-First Flutter Apps with Drift and Supabase',
        slug: 'offline-first-flutter-drift-supabase',
        excerpt: 'Your users deserve apps that work without internet. Learn the offline-first architecture pattern that saves locally first, syncs in the background, and handles conflicts gracefully.',
        content: `
# Building Offline-First Flutter Apps with Drift and Supabase

Nothing ruins a user experience faster than a spinning loader that never resolves because the train went through a tunnel. Your app should work perfectly offline, then quietly sync when connection returns. Here's how to build that.

## What "Offline-First" Actually Means

Offline-first doesn't mean "works offline sometimes." It means your app treats local storage as the primary data source and remote sync as a background enhancement. The user never waits for the network. Ever.

\`\`\`
User Action
    |
    v
Save to Local (Drift/SQLite) -- instant, always works
    |
    v
UI updates immediately
    |
    v (background)
Sync to Remote (Supabase/PostgreSQL) -- best effort
\`\`\`

When the user taps "complete task," the change is saved to the local Drift database instantly. The UI reflects the change immediately. Then, in the background, the app tries to push the change to Supabase. If there's no internet, it queues the change for later.

## The Architecture

The Data layer owns all the offline-first mechanics. The rest of your app doesn't even know remote sync exists.

\`\`\`
Application Layer (Business Logic)
    |
    v  (calls abstract interface)
Domain Layer (Repository Interface)
    |
    v  (implemented by)
Data Layer (Repository Implementation)
    |
    +---> Local Data Source (Drift/SQLite)
    |
    +---> Remote Data Source (Supabase)
    |
    +---> Sync Service (orchestrates push/pull)
\`\`\`

### The Repository Facade

Your repository implementation is a facade that switches between local-only and hybrid mode:

\`\`\`dart
class DisciplineRepositoryImpl implements DisciplineRepository {
  final LocalDisciplineRepository _local;
  final RemoteDisciplineRepository? _remote;
  final SyncService? _syncService;

  // Local-only mode (works perfectly without Supabase)
  DisciplineRepositoryImpl(this._local)
      : _remote = null, _syncService = null;

  // Hybrid mode (offline-first + background sync)
  DisciplineRepositoryImpl.hybrid({
    required LocalDisciplineRepository local,
    required RemoteDisciplineRepository remote,
    required SyncService syncService,
  }) : _local = local, _remote = remote, _syncService = syncService;

  @override
  Future<void> saveProgress(UserProgress progress) async {
    // Always save locally first
    await _local.saveProgress(progress);

    // If hybrid mode, queue for sync
    _syncService?.queueSync(progress);
  }
}
\`\`\`

The beauty of this design: your entire app works in local-only mode. When you're ready for cloud sync, you flip to hybrid mode without changing any business logic or UI code.

## Local Data Source with Drift

Drift gives you type-safe SQLite access with reactive queries. Your UI automatically updates when the database changes:

\`\`\`dart
// Define your table
class ProgressTable extends Table {
  IntColumn get dayNumber => integer()();
  BoolColumn get isCompleted => boolean().withDefault(const Constant(false))();
  DateTimeColumn get updatedAt => dateTime()();
  BoolColumn get isDirty => boolean().withDefault(const Constant(false))();
}
\`\`\`

That \`isDirty\` column is the secret sauce. When a record is modified locally but not yet synced, it's marked as "dirty." The sync service knows to push these records.

## The Sync Service

This lives in the Data layer and handles all the push/pull/merge logic:

\`\`\`dart
class SyncService {
  final LocalDataSource _local;
  final RemoteDataSource _remote;
  final Connectivity _connectivity;

  Future<SyncResult> syncAll() async {
    if (!await _isOnline()) {
      return SyncResult(success: false, error: 'No connection');
    }

    // 1. Push dirty records to remote
    final dirtyRecords = await _local.getDirty();
    for (final record in dirtyRecords) {
      await _remote.upsert(record);
      await _local.markClean(record.id);
    }

    // 2. Pull remote changes since last sync
    final lastSync = await _local.getLastSyncTime();
    final remoteChanges = await _remote.getChangesSince(lastSync);

    // 3. Merge with conflict resolution
    for (final change in remoteChanges) {
      await _mergeRecord(change);
    }

    return SyncResult(success: true);
  }
}
\`\`\`

## Conflict Resolution: Last-Write-Wins

The simplest strategy that works for most apps. Every record has an \`updatedAt\` timestamp. When local and remote conflict, the newer one wins:

\`\`\`dart
Future<void> _mergeRecord(RemoteRecord remote) async {
  final local = await _local.getById(remote.id);

  if (local == null) {
    // New record from remote, just save it
    await _local.save(remote.toLocal());
    return;
  }

  if (remote.updatedAt.isAfter(local.updatedAt)) {
    // Remote is newer, overwrite local
    await _local.save(remote.toLocal());
  }
  // Otherwise keep local (it's newer or same)
}
\`\`\`

For most apps, this is sufficient. If you need more sophisticated conflict resolution (like merging specific fields), implement it in the merge strategy.

## Where Responsibilities Live

This is where developers get confused. Here's the clear boundary:

| Concern | Layer | Example |
|---------|-------|---------|
| "Should I sync now?" | **Data** | Check connectivity, push if online |
| "Queue this for later" | **Data** | Save to sync queue |
| "Merge local + remote" | **Data** | Compare timestamps, resolve conflicts |
| "Is this order valid?" | **Application** | Check business rules |
| "Max 5 tasks per day" | **Application** | Enforce limits |

The Application layer decides **what** should happen. The Data layer decides **how** it happens in terms of storage and sync.

## Setting Up Supabase (When You're Ready)

The app works perfectly offline-first with just Drift. When you want cloud sync:

1. Create your Supabase project and run the SQL migrations
2. Uncomment the remote data source code
3. Switch from \`DisciplineRepositoryImpl(local)\` to \`DisciplineRepositoryImpl.hybrid(local, remote, sync)\`
4. Everything else stays the same

\`\`\`dart
@riverpod
DisciplineRepository disciplineRepository(Ref ref) {
  const useSupabaseSync = true; // Flip this switch

  if (useSupabaseSync) {
    return DisciplineRepositoryImpl.hybrid(
      local: ref.watch(localRepositoryProvider),
      remote: ref.watch(remoteRepositoryProvider),
      syncService: ref.watch(syncServiceProvider),
    );
  } else {
    return DisciplineRepositoryImpl(ref.watch(localRepositoryProvider));
  }
}
\`\`\`

## The Benefits You'll Feel Immediately

1. **Instant UI responses** - No loading spinners for user actions
2. **Works everywhere** - Subway, airplane, rural areas
3. **Resilient** - Network drops don't cause data loss
4. **Testable** - Each layer tests independently
5. **Flexible** - Add or remove remote sync without touching business logic
6. **User trust** - People love apps that just work

## Start Small

You don't need Supabase on day one. Build your entire app with Drift as the local database. Get all your features working offline. Then, when you're ready for cloud sync, add the remote layer. The architecture supports this incremental approach by design.

Offline-first isn't a nice-to-have. In a world where users expect apps to work instantly, everywhere, all the time - it's a necessity. And with Drift and Supabase, it's surprisingly achievable.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-10-01',
        updatedAt: '2025-10-01',
        readingTime: 9,
        category: 'Flutter Development',
        tags: ['Flutter', 'Offline-First', 'Drift', 'Supabase', 'Architecture'],
        featured: false,
        coverImage: '/assets/blog-images/offline-first.png',
        seo: {
            title: 'Offline-First Flutter Apps with Drift and Supabase | CodeWithNabi',
            description: 'Build Flutter apps that work without internet. Learn the offline-first architecture pattern with Drift SQLite and Supabase sync.',
            keywords: ['Flutter', 'Offline-First', 'Drift', 'Supabase', 'SQLite', 'Sync']
        }
    },
    {
        id: '8',
        title: 'Production Error Handling in Flutter: A Complete Strategy',
        slug: 'flutter-error-handling-production-strategy',
        excerpt: 'Stop showing raw stack traces to users. Learn how to build a structured error handling pipeline with sealed exceptions, severity levels, automatic logging, and user-friendly dialogs.',
        content: `
# Production Error Handling in Flutter: A Complete Strategy

Your app will crash. APIs will fail. Databases will throw errors. The question isn't whether errors happen - it's whether your users see a helpful message or a terrifying stack trace. Let's build an error handling system that makes both developers and users happy.

## The Philosophy: Safe-Fail

Instead of trying to prevent all errors (impossible), we design our app to fail gracefully. Every error is caught, logged through a structured pipeline, and presented to the user as a helpful, non-technical message.

## Step 1: A Sealed Exception Hierarchy

Every error in your app should be an \`AppException\`. No generic \`Exception\`, no thrown strings, no raw errors reaching the UI.

\`\`\`dart
sealed class AppException implements Exception {
  final String code;
  final String message;
  final String? details;

  AppException(this.code, this.message, {this.details});

  ErrorSeverity get severity;
  ErrorCategory get category;
}
\`\`\`

### Why Sealed?

Dart's \`sealed\` keyword means the compiler **forces** you to handle every exception type. Add a new exception? Every \`switch\` statement that handles \`AppException\` will show a compile error until you add the new case. No exception can slip through unhandled.

### Severity and Category

Every exception carries metadata that tells the logging pipeline how important it is:

| Severity | When to Use | Example |
|----------|-------------|---------|
| \`warning\` | User can recover | Permission denied, purchase cancelled |
| \`error\` | Feature is broken | Database read failed, API returned 500 |
| \`critical\` | Data loss risk | Database corruption, write failure |

| Category | Subsystem |
|----------|-----------|
| \`storage\` | Local DB / file failures |
| \`business\` | Validation / illegal state |
| \`platform\` | Notifications, IAP, URL launch |
| \`network\` | HTTP / connectivity |

### Concrete Exceptions

\`\`\`dart
class DatabaseException extends AppException {
  DatabaseException(String msg, {String? details})
      : super('database-error', msg, details: details);

  @override
  ErrorSeverity get severity => ErrorSeverity.critical;

  @override
  ErrorCategory get category => ErrorCategory.storage;
}

class ValidationException extends AppException {
  ValidationException(String msg)
      : super('validation-error', msg);

  @override
  ErrorSeverity get severity => ErrorSeverity.warning;

  @override
  ErrorCategory get category => ErrorCategory.business;
}

class NoConnectionException extends AppException {
  NoConnectionException({String? details})
      : super('no-connection', 'No internet connection', details: details);

  @override
  ErrorSeverity get severity => ErrorSeverity.warning;

  @override
  ErrorCategory get category => ErrorCategory.network;
}
\`\`\`

**All exceptions live in one file:** \`core/errors/app_exception.dart\`. Never scatter exception classes across feature files.

## Step 2: The Logging Pipeline

Your \`ErrorLogger\` uses \`dart:developer log()\` with severity-based log levels:

\`\`\`dart
class ErrorLogger {
  final AnalyticsFacade _analytics;

  void logAppException(AppException exception, [StackTrace? stackTrace]) {
    final logLevel = switch (exception.severity) {
      ErrorSeverity.warning  => 900,
      ErrorSeverity.error    => 1000,
      ErrorSeverity.critical => 1200,
    };

    developer.log(
      '[\${exception.severity.name.toUpperCase()}] '
      '\${exception.category.name} | '
      '\${exception.code}: \${exception.message}',
      name: 'Error',
      level: logLevel,
    );

    // Fan out to analytics (Firebase, Mixpanel, local DB)
    _analytics.trackError(
      code: exception.code,
      message: exception.message,
      severity: exception.severity,
    );
  }
}
\`\`\`

### Automatic Catching with ProviderObserver

Riverpod's \`ProviderObserver\` catches every \`AsyncError\` state transition automatically:

\`\`\`dart
class AsyncErrorLogger extends ProviderObserver {
  @override
  void didUpdateProvider(
    ProviderBase provider, Object? previousValue, Object? newValue,
    ProviderContainer container,
  ) {
    if (newValue is AsyncError) {
      final error = newValue.error;
      if (error is AppException) {
        errorLogger.logAppException(error, newValue.stackTrace);
      } else {
        errorLogger.logError(error, newValue.stackTrace);
      }
    }
  }
}

// Register in main.dart:
ProviderScope(observers: [AsyncErrorLogger()], child: MyApp())
\`\`\`

Every controller that fails now gets automatically logged. Zero extra code in each controller.

## Step 3: User-Friendly Error Dialogs

The UI layer converts sealed exceptions into human-readable messages using exhaustive switches:

\`\`\`dart
extension AsyncValueUI on AsyncValue<dynamic> {
  void showAlertDialogOnError(BuildContext context) {
    if (isLoading || !hasError) return;

    // Some errors are silently dismissed
    if (error is PurchaseCancelledException) return;

    final title = switch (error as AppException) {
      DatabaseException()   => 'Storage Error',
      ValidationException() => 'Invalid Input',
      NetworkException()    => 'Connection Error',
      NoConnectionException() => 'You\\'re Offline',
      // ... all cases (compiler-enforced)
    };

    showAlertDialog(context: context, title: title, content: message);
  }
}
\`\`\`

### Every Page Needs ref.listen

Every page with async controllers must listen for errors:

\`\`\`dart
class TaskScreen extends ConsumerWidget {
  Widget build(BuildContext context, WidgetRef ref) {
    ref.listen(toggleTaskControllerProvider, (_, state) {
      state.showAlertDialogOnError(context);
    });

    // ... rest of build
  }
}
\`\`\`

## Step 4: Convert External Errors at the Boundary

External SDKs throw their own exceptions (Dio, platform plugins). Convert them to \`AppException\` at the Data layer boundary:

\`\`\`dart
AppException appExceptionFromDio(DioException e) {
  return switch (e.type) {
    DioExceptionType.connectionTimeout ||
    DioExceptionType.sendTimeout ||
    DioExceptionType.receiveTimeout => ApiTimeoutException(details: e.message),
    DioExceptionType.connectionError => NoConnectionException(details: e.message),
    _ => NetworkException(
        e.response?.statusMessage ?? 'Request failed',
        details: 'HTTP \${e.response?.statusCode}: \${e.message}',
      ),
  };
}

// Usage in repositories:
try {
  final response = await dio.get('/endpoint');
} on DioException catch (e) {
  throw appExceptionFromDio(e);
}
\`\`\`

## Step 5: Global Safety Nets

Catch anything that slips through:

\`\`\`dart
void registerErrorHandlers(ErrorLogger errorLogger) {
  // Flutter framework errors
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    errorLogger.logError(details.exception, details.stack);
  };

  // Platform/async errors
  PlatformDispatcher.instance.onError = (error, stack) {
    errorLogger.logError(error, stack);
    return true;
  };
}
\`\`\`

## The Four Rules

1. **The Throwing Rule:** Services throw \`AppException\`. Never throw generic \`Exception\` or raw strings.
2. **The Guarding Rule:** Controllers wrap service calls in \`AsyncValue.guard\`.
3. **The Consolidation Rule:** All exceptions live in one file. No stray exceptions in feature files.
4. **The Converter Rule:** External SDK exceptions are converted to \`AppException\` at the Data layer.

## Adding a New Exception (The Checklist)

1. Add the class to \`app_exception.dart\` with severity + category
2. Add switch cases in \`async_value_ui.dart\` (title + message)
3. If retryable, add to \`isRetryable\` extension
4. Implement the \`throw\` in the Service layer
5. Ensure the Controller uses \`AsyncValue.guard\`
6. Verify the page has \`ref.listen\`
7. Run \`flutter analyze\` - Dart enforces exhaustive switches

The compiler is your safety net. Miss a case? Compile error. Forget to handle a new exception in the UI? Compile error. This is the power of sealed classes.

## What This Gets You

- **Users see friendly messages**, not stack traces
- **Developers see structured logs** with severity, category, and context
- **Analytics track every error** automatically
- **New exceptions are impossible to forget** thanks to exhaustive switches
- **Testing is straightforward** because error behavior is deterministic

Error handling isn't glamorous. But it's the difference between an app that feels amateur and one that feels professional. When things go wrong - and they will - your app should handle it with grace.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-25',
        updatedAt: '2025-09-25',
        readingTime: 9,
        category: 'Flutter Development',
        tags: ['Flutter', 'Error Handling', 'Best Practices', 'Production', 'Architecture'],
        featured: false,
        coverImage: '/assets/blog-images/error-handling.svg',
        seo: {
            title: 'Production Error Handling Strategy for Flutter | CodeWithNabi',
            description: 'Build a structured error handling pipeline for Flutter with sealed exceptions, automatic logging, severity levels, and user-friendly dialogs.',
            keywords: ['Flutter', 'Error Handling', 'AppException', 'Sealed Classes', 'Production']
        }
    },
    {
        id: '9',
        title: 'Flutter Testing That Actually Works: From Unit to Integration',
        slug: 'flutter-testing-unit-widget-integration',
        excerpt: 'A practical guide to Flutter testing. Learn the Robot pattern, test hierarchies, and how to write tests that catch real bugs without slowing you down.',
        content: `
# Flutter Testing That Actually Works: From Unit to Integration

Most Flutter testing tutorials show you how to test a counter app. Real apps have async providers, database dependencies, theme extensions, and complex state machines. Here's how to test those.

## The Testing Pyramid for Flutter

Build tests bottom-up. Each layer depends on the one below:

| Phase | What to Test | How |
|-------|-------------|-----|
| Domain entities | Computed properties, copyWith, edge cases | Pure Dart unit tests, no mocks |
| Data sources | API converters, mappers, DB operations | Unit tests with mocked SDKs |
| Services | Business logic, validation, calculations | Unit tests with mocked repositories |
| Controllers | State transitions, action methods | ProviderContainer with mocked services |
| Pages | UI rendering, user interactions, states | Widget tests with ProviderScope overrides |

## Infrastructure First: mocks.dart and test_data.dart

Before writing a single test, set up two files that every test will use.

### Centralized Mocks

\`\`\`dart
// test/src/mocks.dart
import 'package:mocktail/mocktail.dart';

class MockDisciplineRepository extends Mock implements DisciplineRepository {}
class MockDisciplineService extends Mock implements DisciplineService {}
class MockJournalService extends Mock implements JournalService {}
class MockAnalyticsService extends Mock implements AnalyticsService {}

// State listener for verifying state transitions
class Listener<T> extends Mock {
  void call(T? previous, T next);
}
\`\`\`

One file, all mocks. Never scatter mock classes across test files.

### Factory Functions for Test Data

\`\`\`dart
// test/src/test_data.dart
UserProgress makeProgress({
  int currentStreak = 0,
  DateTime? startDate,
  Map<String, bool>? completedTasks,
}) {
  return UserProgress(
    currentStreak: currentStreak,
    startDate: startDate ?? DateTime.now(),
    completedTasks: completedTasks ?? {},
  );
}

JournalEntry makeJournalEntry({int dayNumber = 1, String mood = 'good'}) {
  return JournalEntry(dayNumber: dayNumber, mood: mood, note: '');
}
\`\`\`

Every test entity has a \`make*()\` factory with sensible defaults. Override only what the test cares about. Never construct entities inline.

## Service Tests: The Core

Service tests are the most valuable. They test your business logic with mocked dependencies:

\`\`\`dart
void main() {
  setUpAll(() {
    registerFallbackValue(makeProgress()); // Required for any()
  });

  late MockDisciplineRepository mockRepository;
  late DisciplineService service;

  setUp(() {
    mockRepository = MockDisciplineRepository();
    service = DisciplineService(mockRepository);
  });

  group('calculateCurrentDay', () {
    test('returns 1 on start date', () {
      final startDate = DateTime.now();
      final progress = makeProgress(startDate: startDate);
      expect(service.calculateCurrentDay(progress), 1);
    });

    test('returns 5 after 4 days', () {
      final startDate = DateTime.now().subtract(const Duration(days: 4));
      final progress = makeProgress(startDate: startDate);
      expect(service.calculateCurrentDay(progress), 5);
    });
  });

  group('toggleTask', () {
    test('saves progress with updated task', () async {
      when(() => mockRepository.saveProgress(any()))
          .thenAnswer((_) async {});

      await service.toggleTaskCompletion(1, 0);

      verify(() => mockRepository.saveProgress(any())).called(1);
    });
  });
}
\`\`\`

### Three rules for service tests:

1. **\`setUpAll\`** with \`registerFallbackValue\` for every custom type used with \`any()\`
2. **\`setUp\`** creates fresh mocks for each test
3. **Date-relative tests:** always use \`DateTime.now().subtract()\` - never hardcode dates

## Controller Tests: State Transitions

Controllers use \`ProviderContainer\` with overrides:

\`\`\`dart
void main() {
  late MockJournalService mockService;

  setUp(() {
    mockService = MockJournalService();
  });

  ProviderContainer makeContainer() {
    final container = ProviderContainer(
      overrides: [
        journalServiceProvider.overrideWithValue(mockService),
      ],
    );
    addTearDown(container.dispose); // CRITICAL - never skip
    return container;
  }

  test('save calls service and updates state', () async {
    when(() => mockService.saveEntry(any(), any(), any()))
        .thenAnswer((_) async {});
    when(() => mockService.getEntry(1))
        .thenAnswer((_) async => makeJournalEntry());

    final container = makeContainer();
    await container.read(journalEntryControllerProvider(1).future);

    await container.read(
      journalEntryControllerProvider(1).notifier,
    ).save('content', 'mood');

    verify(() => mockService.saveEntry(1, 'content', 'mood')).called(1);
  });
}
\`\`\`

The \`makeContainer()\` pattern with \`addTearDown(container.dispose)\` prevents provider leaks across tests.

## Widget Tests: The Tricky Part

Widget tests require theme extensions and provider overrides:

\`\`\`dart
testWidgets('TodayContent shows tasks section', (tester) async {
  SharedPreferences.setMockInitialValues({});
  final prefs = await SharedPreferences.getInstance();

  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        sharedPreferencesProvider.overrideWith((_) => Future.value(prefs)),
        isPremiumProvider.overrideWith((_) => Future.value(false)),
        disciplineServiceProvider.overrideWithValue(FakeDisciplineService()),
      ],
      child: MaterialApp(
        theme: ThemeData(extensions: [AppColors.dark()]),
        home: const Scaffold(body: TodayContent(state: testState)),
      ),
    ),
  );

  await tester.pump(); // Let async providers resolve

  expect(find.text("Today's Focus"), findsOneWidget);
});
\`\`\`

**Common gotchas:**
- \`SharedPreferences.setMockInitialValues({})\` must come **before** \`getInstance()\`
- Theme extensions are required if your widgets use \`context.colors.*\`
- \`await tester.pump()\` after \`pumpWidget\` to resolve async providers

## The Robot Pattern: No Duplicate Finders

Robots encapsulate all \`find.byXxx\` calls so test files read like user stories:

\`\`\`dart
class TodayRobot {
  TodayRobot(this.tester);
  final WidgetTester tester;

  Future<void> tapTask(int index) async {
    final finder = find.byType(TaskTile).at(index);
    await tester.tap(finder);
    await tester.pumpAndSettle();
  }

  void expectTodaysFocus() {
    expect(find.text("Today's Focus"), findsOneWidget);
  }

  void expectTaskCompleted(int index) {
    final tile = tester.widget<TaskTile>(find.byType(TaskTile).at(index));
    expect(tile.isCompleted, isTrue);
  }
}

// Usage in tests:
testWidgets('toggle task marks it complete', (tester) async {
  final r = Robot(tester);
  await r.pumpApp();

  r.today.expectTodaysFocus();
  r.today.expectTaskCount(3);
  await r.today.tapTask(0);
  r.today.expectTaskCompleted(0);
});
\`\`\`

Write the robot once, reuse it for widget tests, integration tests, AND golden tests. Zero finder duplication.

## Timer-Based Tests with fake_async

Controllers that use \`Timer\` or \`Future.delayed\` need controlled time:

\`\`\`dart
import 'package:fake_async/fake_async.dart';

test('auto-clears celebration after 3 seconds', () {
  fakeAsync((async) {
    final container = ProviderContainer();
    addTearDown(container.dispose);

    final controller = container.read(celebrationControllerProvider.notifier);
    controller.celebrate(CelebrationEvent.dayComplete);

    expect(container.read(celebrationControllerProvider), isNotNull);

    async.elapse(const Duration(seconds: 3));

    expect(container.read(celebrationControllerProvider), isNull);
  });
});
\`\`\`

## Mock vs Fake: When to Use Which

| Type | When | Example |
|------|------|---------|
| **Mock** (mocktail) | Unit tests - precise control with when/verify | \`MockDisciplineService\` |
| **Fake** (implements) | Controller/widget tests - realistic behavior | \`FakeDisciplineService\` |

Mocks are for verifying **that** something was called. Fakes are for providing **realistic behavior** without the real dependency.

## Error Handling Tests

Test that your sealed exception hierarchy works end-to-end:

\`\`\`dart
test('PlanLoadException has correct metadata', () {
  final e = PlanLoadException(details: 'file not found');
  expect(e.severity, ErrorSeverity.error);
  expect(e.category, ErrorCategory.storage);
  expect(e.code, 'plan-load-failed');
  expect(e, isA<AppException>());
});

testWidgets('shows dialog for AppException', (tester) async {
  await tester.pumpWidget(MaterialApp(
    home: ErrorDialogTrigger(
      asyncValue: AsyncValue.error(PlanLoadException(), StackTrace.current),
    ),
  ));
  await tester.pumpAndSettle();
  expect(find.text('Plan Unavailable'), findsOneWidget);
});

testWidgets('silently dismisses PurchaseCancelledException', (tester) async {
  // ... same setup
  expect(find.byType(AlertDialog), findsNothing);
});
\`\`\`

## The Gotcha Reference Card

| Problem | Solution |
|---------|----------|
| \`MissingStubError\` on \`any()\` | Add \`registerFallbackValue\` in \`setUpAll\` |
| Provider leaks between tests | Add \`addTearDown(container.dispose)\` |
| Widget needs theme | Add \`ThemeData(extensions: [...])\` |
| Async providers not resolving | Add \`await tester.pump()\` after pumpWidget |
| Date tests break next day | Use \`DateTime.now().subtract()\`, never hardcode |
| Dialog error during build | Use \`addPostFrameCallback\` to defer dialog |

## Start Here

1. Create \`mocks.dart\` and \`test_data.dart\`
2. Write unit tests for your most important service
3. Add controller tests for your main state provider
4. Add widget tests for your most complex screen
5. Introduce the Robot pattern when you have 3+ widget tests

Testing isn't about 100% coverage. It's about testing the code that breaks. Business logic in services, state transitions in controllers, and user flows in widgets. Test those well, and your app will be remarkably stable.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-20',
        updatedAt: '2025-09-20',
        readingTime: 11,
        category: 'Flutter Development',
        tags: ['Flutter', 'Testing', 'Unit Tests', 'Widget Tests', 'Best Practices'],
        featured: false,
        coverImage: '/assets/blog-images/flutter-testing.jpg',
        seo: {
            title: 'Flutter Testing Guide: Unit, Widget, and Integration | CodeWithNabi',
            description: 'A practical guide to Flutter testing with the Robot pattern, mocktail, ProviderContainer overrides, and real-world patterns.',
            keywords: ['Flutter', 'Testing', 'Unit Tests', 'Widget Tests', 'Robot Pattern', 'Mocktail']
        }
    },
    {
        id: '10',
        title: 'Monetizing Flutter Apps with RevenueCat: Subscriptions Done Right',
        slug: 'flutter-revenuecat-subscriptions-monetization',
        excerpt: 'Implement in-app subscriptions without the headache. Learn how RevenueCat handles the hard parts of IAP while you focus on building a great paywall experience.',
        content: `
# Monetizing Flutter Apps with RevenueCat: Subscriptions Done Right

In-app purchases are one of the most painful parts of mobile development. Apple and Google have completely different APIs, receipt validation is a nightmare, and subscription state management is full of edge cases. RevenueCat makes all of that disappear.

## Why RevenueCat Instead of Raw IAP

If you've ever tried implementing in-app purchases directly, you know the pain:

- Different APIs for iOS and Android
- Server-side receipt validation
- Handling subscription renewals, cancellations, and expirations
- Grace periods and billing retry logic
- Sandbox testing that never works quite right

RevenueCat wraps all of this into a clean SDK. You call \`Purchases.purchasePackage(package)\` and it handles everything else. Entitlements are cached locally, so premium checks work offline too.

## Architecture: Where Everything Lives

Following Clean Architecture, here's how monetization fits:

\`\`\`
lib/src/feature/premium/
  domain/
    subscription_status.dart     # Entities and enums
  data/
    premium_repository.dart      # RevenueCat SDK wrapper
  application/
    premium_service.dart         # Business logic
  presentation/
    premium_controller.dart      # State management
    paywall/
      paywall_screen.dart        # Purchase UI
\`\`\`

### The Domain: What Subscription States Exist

\`\`\`dart
enum SubscriptionStatus { active, paused, expired, lifetime }

class SubscriptionState {
  final bool isPremium;
  final SubscriptionStatus status;
  final DateTime? expirationDate;
  final String? productId;

  static const free = SubscriptionState(
    isPremium: false,
    status: SubscriptionStatus.expired,
  );
}
\`\`\`

### The Repository: A Thin SDK Wrapper

\`\`\`dart
class PremiumRepository {
  Future<CustomerInfo> getCustomerInfo() async {
    return Purchases.getCustomerInfo();
  }

  Future<Offerings> getOfferings() async {
    return Purchases.getOfferings();
  }

  Future<CustomerInfo> purchase(Package package) async {
    return Purchases.purchasePackage(package);
  }

  Future<CustomerInfo> restore() async {
    return Purchases.restorePurchases();
  }
}
\`\`\`

This is intentionally thin. The repository just wraps RevenueCat SDK calls. No business logic, no validation.

### The Service: Entitlement Logic

\`\`\`dart
class PremiumService {
  final PremiumRepository _repo;

  Future<bool> isPremium() async {
    final info = await _repo.getCustomerInfo();
    return info.entitlements.active.containsKey('premium');
  }

  Future<SubscriptionState> getSubscriptionState() async {
    final info = await _repo.getCustomerInfo();
    final entitlement = info.entitlements.active['premium'];

    if (entitlement == null) return SubscriptionState.free;

    return SubscriptionState(
      isPremium: true,
      status: entitlement.willRenew
          ? SubscriptionStatus.active
          : SubscriptionStatus.expired,
      expirationDate: entitlement.expirationDate,
      productId: entitlement.productIdentifier,
    );
  }
}
\`\`\`

## The Premium Gate Widget

Gate premium features with a simple widget:

\`\`\`dart
class PremiumGate extends ConsumerWidget {
  final Widget child;
  final Widget fallback;

  const PremiumGate({required this.child, required this.fallback});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isPremium = ref.watch(premiumControllerProvider).valueOrNull ?? false;
    return isPremium ? child : fallback;
  }
}

// Usage:
PremiumGate(
  child: JournalEditor(),     // Premium users see the editor
  fallback: UpgradePrompt(),  // Free users see upgrade prompt
)
\`\`\`

## Backend Sync with Supabase Webhooks

For cross-device subscription tracking, set up RevenueCat webhooks that write to Supabase:

\`\`\`sql
CREATE TYPE sub_status AS ENUM ('ACTIVE', 'PAUSED', 'EXPIRED', 'LIFETIME');

CREATE TABLE public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status sub_status NOT NULL,
  period_end_date timestamptz,
  sku_id text NOT NULL,
  last_update_date timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
\`\`\`

### The Edge Function

\`\`\`typescript
Deno.serve(async (req) => {
  // Verify RevenueCat webhook token
  const authToken = req.headers.get("Authorization")?.split(" ")[1];
  if (authToken !== Deno.env.get("RC_TOKEN")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const event = body.event;

  // Map RevenueCat events to subscription status
  const status = mapEventToStatus(event.type);
  if (!status) return new Response("ignored", { status: 200 });

  // Upsert subscription record
  await supabase.from('subscriptions').upsert({
    user_id: event.app_user_id,
    status: status,
    period_end_date: event.expiration_at_ms
      ? new Date(event.expiration_at_ms) : null,
    sku_id: event.product_id,
  });

  return new Response("saved", { status: 200 });
});
\`\`\`

## RevenueCat Event Mapping

| Event | Status |
|-------|--------|
| \`INITIAL_PURCHASE\` | ACTIVE |
| \`RENEWAL\` | ACTIVE |
| \`UNCANCELLATION\` | ACTIVE |
| \`CANCELLATION\` | EXPIRED |
| \`EXPIRATION\` | EXPIRED |
| \`SUBSCRIPTION_PAUSED\` | PAUSED |
| \`NON_RENEWING_PURCHASE\` | LIFETIME |
| \`BILLING_ISSUE\` | Ignore |
| \`TRANSFER\` | Ignore |

## Two Strategies: Choose Your Path

### Strategy A: Anonymous (No Backend)

Purchases are tied to the Apple ID or Google Play account. RevenueCat SDK caches entitlements locally. No user accounts needed. Perfect for simple apps.

### Strategy B: User-Synced (With Supabase)

Purchases sync to your database via webhooks. Users have accounts, subscription data is centralized, and you get a dashboard for admin purposes. Better for apps with existing authentication.

## The Rules

1. **Never store subscription state locally** - RevenueCat is the source of truth
2. **Never hardcode prices** - Fetch from \`Offering\` objects (prices vary by country)
3. **Always show "Restore Purchases"** - App Store requires it
4. **Don't force login for anonymous purchases** - Let users buy first, create accounts later
5. **Use \`--no-verify-jwt\`** when deploying webhook Edge Functions
6. **Keep the paywall screen under 150 lines** - Extract pricing cards into separate widgets

## What To Build First

1. Set up RevenueCat account and configure products in App Store Connect / Play Console
2. Create the \`premium/\` feature folder with all four layers
3. Implement the \`isPremium\` check and \`PremiumGate\` widget
4. Build a simple paywall screen
5. Add restore purchases functionality
6. (Optional) Set up Supabase webhooks for backend sync

RevenueCat turns what used to be months of IAP plumbing into a weekend project. Your time is better spent making your premium features worth paying for than wrestling with receipt validation.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-15',
        updatedAt: '2025-09-15',
        readingTime: 9,
        category: 'Flutter Development',
        tags: ['Flutter', 'RevenueCat', 'Monetization', 'Subscriptions', 'In-App Purchases'],
        featured: false,
        coverImage: '/assets/blog-images/revenuecat.png',
        seo: {
            title: 'Flutter In-App Subscriptions with RevenueCat | CodeWithNabi',
            description: 'Implement in-app subscriptions in Flutter with RevenueCat. Learn paywall patterns, entitlement management, and Supabase webhook integration.',
            keywords: ['Flutter', 'RevenueCat', 'In-App Purchases', 'Subscriptions', 'Monetization']
        }
    },
    {
        id: '11',
        title: 'CI/CD for Flutter: Auto-Deploy to Google Play with GitHub Actions',
        slug: 'flutter-cicd-github-actions-google-play',
        excerpt: 'Stop uploading AABs manually. Learn how to set up a GitHub Actions pipeline that builds, signs, and deploys your Flutter app to Google Play on every push to master.',
        content: `
# CI/CD for Flutter: Auto-Deploy to Google Play with GitHub Actions

Every time you manually build an AAB, open the Play Console, upload the file, and click through the release wizard, you lose 20 minutes and introduce the risk of human error. Let's automate the entire process so pushing to master means deploying to production.

## What We're Building

A GitHub Actions workflow that:

1. Triggers on push to \`master\` (or manual dispatch)
2. Decodes your upload keystore from a GitHub secret
3. Builds a signed release AAB with flavor support
4. Uploads the AAB directly to Google Play

No manual steps. Push code, grab coffee, app is live.

## One-Time Setup

### 1. Google Play Service Account

You need a service account that GitHub Actions can use to upload to Play Console:

1. Go to **Google Cloud Console** > IAM > Service Accounts
2. Create a service account and download the JSON key
3. In **Play Console** > Users and permissions, add the service account email with "Release Manager" role

### 2. Upload Keystore

Create your upload keystore if you haven't already, then base64-encode it for GitHub:

\`\`\`bash
base64 -i /path/to/upload-keystore.jks | tr -d '\\n' | pbcopy
\`\`\`

This copies the encoded keystore to your clipboard. Paste it into a GitHub secret.

### 3. GitHub Secrets

Add these secrets to your repository (Settings > Secrets > Actions):

| Secret | Value |
|--------|-------|
| \`GOOGLE_PLAY_SERVICE_ACCOUNT_JSON\` | Raw JSON from the service account key file |
| \`ANDROID_KEYSTORE_JKS\` | Base64-encoded upload keystore |
| \`ANDROID_KEYSTORE_PASSWORD\` | Keystore password |
| \`ANDROID_KEY_ALIAS\` | Key alias (usually \`upload\`) |
| \`ANDROID_KEY_PASSWORD\` | Key password |

### 4. The Workflow File

\`\`\`yaml
# .github/workflows/build-upload.yaml
name: Build & Upload to Google Play

on:
  push:
    branches: [master]
  workflow_dispatch:

jobs:
  build-android:
    runs-on: self-hosted  # or ubuntu-latest
    environment: prod

    steps:
      - uses: actions/checkout@v4

      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.24.0'
          channel: 'stable'

      # Decode keystore from secret
      - name: Decode Keystore
        run: |
          echo "\${{ secrets.ANDROID_KEYSTORE_JKS }}" | base64 -D > android/android_keystore.jks

      # Create key.properties
      - name: Create key.properties
        run: |
          cat > android/key.properties << EOF
          storeFile=\${{ github.workspace }}/android/android_keystore.jks
          storePassword=\${{ secrets.ANDROID_KEYSTORE_PASSWORD }}
          keyAlias=\${{ secrets.ANDROID_KEY_ALIAS }}
          keyPassword=\${{ secrets.ANDROID_KEY_PASSWORD }}
          EOF

      - run: flutter pub get
      - run: flutter build appbundle --release --flavor prod

      # Upload to Google Play
      - uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: \${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON }}
          packageName: com.yourcompany.yourapp
          releaseFiles: build/app/outputs/bundle/prodRelease/app-prod-release.aab
          track: production
\`\`\`

## Versioning: Don't Forget the Build Number

Google Play rejects uploads if the \`versionCode\` hasn't increased. Always bump the \`+N\` part in \`pubspec.yaml\` before pushing:

\`\`\`yaml
version: 1.0.1+7  # +7 is the versionCode
\`\`\`

You can automate this with a script that reads the current version and increments it, or simply remember to bump it as part of your release process.

## Self-Hosted Runner Tips

If you're using a self-hosted macOS runner (for faster builds or iOS support too):

- **No spaces in the runner path.** \`/Users/you/actions-runner\` works. \`/Users/you/My Folder/actions-runner\` breaks everything.
- Start the runner with \`./run.sh\` and wait for "Listening for Jobs"
- Don't run multiple runner sessions simultaneously
- Keep runner files out of git (add \`actions-runner/\` to \`.gitignore\`)

## Track Options

| Track | Use Case |
|-------|----------|
| \`internal\` | Team testing, fastest review |
| \`alpha\` | Closed testing with testers |
| \`beta\` | Open testing before launch |
| \`production\` | Live release to all users |

Start with \`internal\` to validate your pipeline works, then switch to \`production\` when you're confident.

## Common Failures and Fixes

**No logs / instant fail:** The runner is offline, environment approval is pending, or the runner work folder is misconfigured.

**"No such file or directory" with spaces:** Your runner path contains spaces. Move it to a clean path.

**"base64: invalid input":** The \`ANDROID_KEYSTORE_JKS\` secret has wrong encoding. On macOS, the workflow needs \`base64 -D\` (not \`base64 -d\`).

**Upload errors:** The package name in the workflow doesn't match the Play Console app, or the track doesn't exist yet. Create the track in Play Console first.

## Security Checklist

- Never commit keystore files to source control
- Never commit \`key.properties\`
- Never commit runner configuration files
- Use GitHub environment protection rules for production deployments
- Rotate the service account key periodically

## What This Gets You

- **Consistent builds:** Same environment every time, no "works on my machine" issues
- **Faster releases:** Push to master, deployment happens automatically
- **Audit trail:** Every deployment is a GitHub Actions run you can inspect
- **Team collaboration:** Anyone with merge access can deploy
- **Rollback:** Git revert + push = automatic rollback deployment

## Start Simple

Set up the workflow with \`track: internal\` first. Push to master, verify the AAB appears in Play Console's internal testing track. Once that works reliably, change to \`production\`.

The initial setup takes about an hour. After that, every release takes zero manual effort. The time you save compounds with every single deployment.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-12',
        updatedAt: '2025-09-12',
        readingTime: 7,
        category: 'DevOps',
        tags: ['Flutter', 'CI/CD', 'GitHub Actions', 'Google Play', 'DevOps'],
        featured: false,
        coverImage: '/assets/blog-images/cicd-github-actions.svg',
        seo: {
            title: 'Flutter CI/CD with GitHub Actions to Google Play | CodeWithNabi',
            description: 'Set up automated Flutter deployments to Google Play with GitHub Actions. Learn signing, secrets management, and self-hosted runners.',
            keywords: ['Flutter', 'CI/CD', 'GitHub Actions', 'Google Play', 'Deployment', 'DevOps']
        }
    },
    {
        id: '12',
        title: 'Supabase + Drift: The Ultimate Flutter Data Layer',
        slug: 'supabase-drift-flutter-data-layer',
        excerpt: 'Learn how to build a bulletproof data layer that combines Drift for local SQLite storage with Supabase for remote PostgreSQL sync. Type-safe, reactive, and offline-first.',
        content: `
# Supabase + Drift: The Ultimate Flutter Data Layer

Supabase gives you a powerful PostgreSQL backend. Drift gives you type-safe SQLite locally. Together, they form a data layer that's fast, reliable, and works offline. Here's how to wire them up properly.

## Why Both?

**Drift alone:** Your app works offline with a local SQLite database. Data is type-safe and reactive. But there's no cloud sync, no cross-device access, and no backup.

**Supabase alone:** Your app has a powerful cloud backend. But every operation requires network, the UI waits for API responses, and offline users see loading spinners forever.

**Together:** Users get instant responses from the local database while changes sync to the cloud in the background. Best of both worlds.

## The Data Source Pattern

Keep data sources dumb. They just do CRUD operations:

\`\`\`dart
abstract class ProductLocalDataSource {
  Future<List<Product>> fetchAll();
  Future<Product?> getById(String id);
  Future<void> save(Product product);
  Future<void> delete(String id);
  Future<List<Product>> getDirty();     // Records needing sync
  Future<void> markClean(String id);    // Mark as synced
  Stream<List<Product>> watchAll();     // Drift reactive queries
}
\`\`\`

That \`getDirty()\` and \`markClean()\` pair is the foundation of offline sync. Every local record has an \`isDirty\` flag. When you modify a record locally, it's marked dirty. When the sync service successfully pushes it to Supabase, it's marked clean.

## Drift: Type-Safe Local Storage

Drift generates type-safe Dart code from your table definitions:

\`\`\`dart
class ProgressTable extends Table {
  IntColumn get dayNumber => integer()();
  BoolColumn get isCompleted => boolean().withDefault(const Constant(false))();
  TextColumn get notes => text().nullable()();
  DateTimeColumn get updatedAt => dateTime()();
  BoolColumn get isDirty => boolean().withDefault(const Constant(false))();

  @override
  Set<Column> get primaryKey => {dayNumber};
}
\`\`\`

### Reactive Queries

Drift's \`watch()\` queries are perfect with Riverpod streams. Your UI automatically updates when the database changes:

\`\`\`dart
// In your local data source
Stream<List<ProgressRow>> watchAll() {
  return (select(progressTable)
    ..orderBy([(t) => OrderingTerm.asc(t.dayNumber)])
  ).watch();
}
\`\`\`

Connect this to a Riverpod StreamProvider, and your UI rebuilds automatically whenever the local database changes - whether from user actions or background sync.

## Supabase: Remote Data Source

The remote data source mirrors the local one, but talks to PostgreSQL:

\`\`\`dart
class RemoteProgressDataSource {
  final SupabaseClient _client;

  Future<List<Map<String, dynamic>>> fetchAll(String userId) async {
    return await _client
        .from('user_progress')
        .select()
        .eq('user_id', userId);
  }

  Future<void> upsert(Map<String, dynamic> data) async {
    await _client.from('user_progress').upsert(data);
  }

  Future<List<Map<String, dynamic>>> getChangesSince(DateTime since) async {
    return await _client
        .from('user_progress')
        .select()
        .gte('updated_at', since.toIso8601String());
  }
}
\`\`\`

## Mappers: The Bridge Between Worlds

Never let Drift types leak into your domain or Supabase types into your UI. Mappers convert between layers:

\`\`\`dart
class ProgressMapper {
  // Drift row -> Domain entity
  static UserProgress fromLocal(ProgressRow row) {
    return UserProgress(
      dayNumber: row.dayNumber,
      isCompleted: row.isCompleted,
      notes: row.notes,
      updatedAt: row.updatedAt,
    );
  }

  // Domain entity -> Drift companion (for inserts/updates)
  static ProgressTableCompanion toLocal(UserProgress entity) {
    return ProgressTableCompanion(
      dayNumber: Value(entity.dayNumber),
      isCompleted: Value(entity.isCompleted),
      notes: Value(entity.notes),
      updatedAt: Value(entity.updatedAt),
      isDirty: const Value(true), // Always dirty on local save
    );
  }

  // Supabase JSON -> Domain entity
  static UserProgress fromRemote(Map<String, dynamic> json) {
    return UserProgress(
      dayNumber: json['day_number'],
      isCompleted: json['is_completed'],
      notes: json['notes'],
      updatedAt: DateTime.parse(json['updated_at']),
    );
  }
}
\`\`\`

## The Sync Service

The sync service lives in the Data layer and orchestrates push/pull operations:

\`\`\`dart
class ProductSyncService {
  final ProductLocalDataSource _local;
  final ProductRemoteDataSource _remote;
  final Connectivity _connectivity;

  Future<bool> _isOnline() async {
    final result = await _connectivity.checkConnectivity();
    return result.contains(ConnectivityResult.wifi) ||
           result.contains(ConnectivityResult.mobile);
  }

  Future<SyncResult> syncAll() async {
    if (!await _isOnline()) {
      return SyncResult(success: false, error: 'No connection');
    }

    try {
      // Push local changes to remote
      final dirtyRecords = await _local.getDirty();
      for (final record in dirtyRecords) {
        await _remote.upsert(record.toJson());
        await _local.markClean(record.id);
      }

      // Pull remote changes
      final lastSync = await _local.getLastSyncTime();
      final changes = await _remote.getChangesSince(lastSync);

      for (final change in changes) {
        final local = await _local.getById(change['id']);
        final remoteDate = DateTime.parse(change['updated_at']);

        // Last-write-wins conflict resolution
        if (local == null || remoteDate.isAfter(local.updatedAt)) {
          await _local.save(ProgressMapper.fromRemote(change));
        }
      }

      return SyncResult(success: true);
    } catch (e) {
      return SyncResult(success: false, error: e.toString());
    }
  }
}
\`\`\`

## Wiring It Up with Riverpod

\`\`\`dart
@Riverpod(keepAlive: true)
AppDatabase appDatabase(Ref ref) {
  throw UnimplementedError('Override in ProviderScope');
}

@riverpod
ProductLocalDataSource localDataSource(Ref ref) {
  return DriftProductDataSource(ref.watch(appDatabaseProvider));
}

@riverpod
ProductRemoteDataSource remoteDataSource(Ref ref) {
  return SupabaseProductDataSource(Supabase.instance.client);
}

@riverpod
ProductRepository productRepository(Ref ref) {
  return ProductRepositoryImpl(
    local: ref.watch(localDataSourceProvider),
    remote: ref.watch(remoteDataSourceProvider),
    sync: ref.watch(syncServiceProvider),
  );
}
\`\`\`

## The Supabase SQL Schema

\`\`\`sql
CREATE TABLE public.user_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  is_completed boolean DEFAULT false,
  notes text,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, day_number)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress"
  ON public.user_progress
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_progress;
\`\`\`

## Key Principles

1. **Local data source knows nothing about remote.** They're separate classes.
2. **Remote data source knows nothing about local.** No mixing.
3. **The sync service orchestrates both.** It's the only class that talks to both sources.
4. **Mappers handle all conversions.** Drift rows never reach the domain. Supabase JSON never reaches the UI.
5. **\`isDirty\` flag tracks what needs syncing.** Simple, reliable.
6. **Last-write-wins resolves conflicts.** Good enough for 90% of apps.

## When to Add Supabase

Start with Drift only. Build your entire app offline-first. When you need cloud features:

1. Install \`supabase_flutter\`
2. Run your SQL migrations
3. Uncomment the remote data source
4. Switch to hybrid mode in the repository provider
5. Everything else stays the same

The architecture supports this incremental approach by design. Your business logic and UI code never change when you add or remove the remote layer. That's the power of clean separation.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/images/myimage.JPG',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-08',
        updatedAt: '2025-09-08',
        readingTime: 10,
        category: 'Backend Development',
        tags: ['Flutter', 'Supabase', 'Drift', 'SQLite', 'Offline-First', 'Sync'],
        featured: false,
        coverImage: '/assets/blog-images/supabase-drift.svg',
        seo: {
            title: 'Supabase + Drift Flutter Data Layer Guide | CodeWithNabi',
            description: 'Build a type-safe, offline-first data layer with Drift SQLite and Supabase PostgreSQL. Learn sync patterns, dirty tracking, and conflict resolution.',
            keywords: ['Flutter', 'Supabase', 'Drift', 'SQLite', 'Offline-First', 'Data Layer']
        }
    }
];

export const blogCategories: BlogCategory[] = [
    {
        id: '1',
        name: 'Flutter Development',
        slug: 'flutter-development',
        description: 'Tutorials and insights about Flutter mobile development',
        count: 6
    },
    {
        id: '2',
        name: 'Backend Development',
        slug: 'backend-development',
        description: 'Backend services, databases, and infrastructure',
        count: 3
    },
    {
        id: '3',
        name: 'DevOps',
        slug: 'devops',
        description: 'Deployment, CI/CD, and development operations',
        count: 2
    },
    {
        id: '4',
        name: 'Tools & Resources',
        slug: 'tools-resources',
        description: 'Useful tools and resources for developers',
        count: 0
    }
];

// Helper functions
export const getFeaturedPosts = (): BlogPost[] => {
    return blogPosts.filter(post => post.featured);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
    return blogPosts.filter(post =>
        post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
    );
};

export const getPostsByTag = (tag: string): BlogPost[] => {
    return blogPosts.filter(post =>
        post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    );
};

export const searchPosts = (query: string): BlogPost[] => {
    const lowercaseQuery = query.toLowerCase();
    return blogPosts.filter(post =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
};

export const getAllTags = (): string[] => {
    const allTags = blogPosts.flatMap(post => post.tags);
    return [...new Set(allTags)].sort();
};

// Get related posts based on shared tags and category
export const getRelatedPosts = (postId: string, limit: number = 3): BlogPost[] => {
    const currentPost = blogPosts.find(post => post.id === postId);
    if (!currentPost) return [];

    const relatedPosts = blogPosts
        .filter(post => post.id !== postId)
        .map(post => {
            let score = 0;

            // Same category gets higher score
            if (post.category === currentPost.category) {
                score += 3;
            }

            // Shared tags
            const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
            score += sharedTags.length;

            return { post, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.post);

    return relatedPosts;
};
