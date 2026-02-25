import { BlogPost, BlogCategory } from '@/types/blog';

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Riverpod: The Future of Flutter State Management',
        slug: 'riverpod-flutter-state-management-guide',
        excerpt: 'Discover why Riverpod is revolutionizing Flutter state management. A friendly guide to understanding this powerful tool that makes app development smoother and more enjoyable.',
        content: `
# Riverpod: The Future of Flutter State Management

Provider was the go-to state management for Flutter. Then Riverpod came along and fixed every problem Provider had — no \`BuildContext\` dependency, compile-time safety, auto-disposal, and proper testing support. Here's how it works in practice.

## Setup

Add the dependency and wrap your app:

\`\`\`yaml
# pubspec.yaml
dependencies:
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.5

dev_dependencies:
  riverpod_generator: ^2.4.3
  build_runner: ^2.4.8
\`\`\`

\`\`\`dart
void main() {
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}
\`\`\`

\`ProviderScope\` stores all your provider state. Every provider you create lives inside this scope. That's it for setup.

## The Five Provider Types You Actually Use

### 1. Provider — Static Values

For values that never change during the app's lifetime:

\`\`\`dart
@riverpod
Dio dio(Ref ref) {
  return Dio(BaseOptions(
    baseUrl: 'https://api.example.com',
    connectTimeout: const Duration(seconds: 10),
  ));
}
\`\`\`

### 2. FutureProvider — Async Data

For one-shot async operations like fetching data:

\`\`\`dart
@riverpod
Future<User> currentUser(Ref ref) async {
  final dio = ref.watch(dioProvider);
  final response = await dio.get('/me');
  return User.fromJson(response.data);
}
\`\`\`

In your widget:

\`\`\`dart
class ProfileScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(currentUserProvider);

    return userAsync.when(
      loading: () => const CircularProgressIndicator(),
      error: (err, stack) => Text('Error: \$err'),
      data: (user) => Text('Hello, \${user.name}'),
    );
  }
}
\`\`\`

No manual loading states. No \`setState\`. The \`.when()\` method handles loading, error, and data — every time.

### 3. StreamProvider — Reactive Data

For real-time data streams:

\`\`\`dart
@riverpod
Stream<List<ChatMessage>> chatMessages(Ref ref, String chatId) {
  final db = ref.watch(databaseProvider);
  return db.watchMessages(chatId);
}
\`\`\`

### 4. NotifierProvider — Mutable State

For state that changes over time with defined mutations:

\`\`\`dart
@riverpod
class CartNotifier extends _\$CartNotifier {
  @override
  List<CartItem> build() => [];

  void addItem(Product product) {
    state = [...state, CartItem(product: product, quantity: 1)];
  }

  void removeItem(String productId) {
    state = state.where((item) => item.product.id != productId).toList();
  }

  double get total => state.fold(0, (sum, item) => sum + item.product.price * item.quantity);
}
\`\`\`

### 5. AsyncNotifierProvider — Async Mutable State

The workhorse for most features. Combines async data fetching with mutations:

\`\`\`dart
@riverpod
class TaskListNotifier extends _\$TaskListNotifier {
  @override
  Future<List<Task>> build() async {
    final repo = ref.watch(taskRepositoryProvider);
    return repo.getAllTasks();
  }

  Future<void> toggleComplete(String taskId) async {
    final repo = ref.read(taskRepositoryProvider);
    await repo.toggleComplete(taskId);
    ref.invalidateSelf(); // Refetch the list
    await future; // Wait for rebuild to complete
  }
}
\`\`\`

## Provider Dependencies

Providers can depend on other providers. Riverpod tracks the dependency graph and rebuilds only what's needed:

\`\`\`dart
@riverpod
Future<List<Task>> filteredTasks(Ref ref) async {
  final allTasks = await ref.watch(taskListNotifierProvider.future);
  final filter = ref.watch(taskFilterProvider);

  return switch (filter) {
    TaskFilter.all => allTasks,
    TaskFilter.active => allTasks.where((t) => !t.isCompleted).toList(),
    TaskFilter.completed => allTasks.where((t) => t.isCompleted).toList(),
  };
}
\`\`\`

When \`taskFilterProvider\` changes, \`filteredTasks\` recalculates. When \`taskListNotifier\` refetches, \`filteredTasks\` also updates. No manual wiring.

## Auto-Dispose: Memory Management That Works

By default, \`@riverpod\` providers auto-dispose when no widget is watching them. When a user navigates away from a screen, the provider's state is cleaned up automatically.

Want to keep state alive? Use \`keepAlive\`:

\`\`\`dart
@Riverpod(keepAlive: true)
class AuthNotifier extends _\$AuthNotifier {
  @override
  Future<AuthState> build() async {
    // This stays alive for the entire app lifecycle
    return _checkAuthStatus();
  }
}
\`\`\`

## Testing Without Pain

Override any provider in tests — no mocking frameworks needed:

\`\`\`dart
void main() {
  test('filtered tasks returns only active tasks', () async {
    final container = ProviderContainer(
      overrides: [
        taskRepositoryProvider.overrideWithValue(FakeTaskRepository()),
      ],
    );

    final tasks = await container.read(filteredTasksProvider.future);
    expect(tasks.every((t) => !t.isCompleted), isTrue);
  });
}
\`\`\`

You swap the real repository with a fake one. The rest of the provider graph works exactly the same. No \`BuildContext\` needed, no widget tree required.

## ref.watch vs ref.read vs ref.listen

This trips up every beginner. Here's the rule:

| Method | When to Use |
|--------|------------|
| \`ref.watch\` | In \`build()\` methods. Rebuilds when value changes. |
| \`ref.read\` | In callbacks, event handlers. One-time read, no rebuild. |
| \`ref.listen\` | For side effects (show snackbar, navigate). |

\`\`\`dart
// GOOD
final tasks = ref.watch(taskListProvider); // Rebuilds widget on change

// GOOD
onPressed: () => ref.read(cartProvider.notifier).addItem(product); // One-time action

// GOOD
ref.listen(authProvider, (prev, next) {
  if (next is AsyncData && next.value == null) {
    context.go('/login'); // Side effect: navigate on logout
  }
});
\`\`\`

## Why Riverpod Over Provider

| Feature | Provider | Riverpod |
|---------|----------|----------|
| Needs BuildContext | Yes | No |
| Compile-time safety | No | Yes |
| Auto-dispose | Manual | Built-in |
| Testing | Complex mocking | Simple overrides |
| Multiple providers of same type | Hacky | Natural |
| Code generation | No | Yes (optional) |

Provider requires you to climb the widget tree with \`context.read\`. Riverpod lets you access any provider from anywhere — your service layer, your tests, your other providers. No widget tree dependency.

## What to Do Next

Start with one feature. Create an \`AsyncNotifierProvider\` for it. Use \`.when()\` in the UI. Override the repository in a test. Once you see how clean the code is compared to \`setState\` or Provider, you won't go back.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-10',
        updatedAt: '2025-09-10',
        readingTime: 12,
        category: 'Flutter Development',
        tags: ['Flutter', 'Riverpod', 'State Management', 'Architecture'],
        featured: true,
        coverImage: '/assets/blog/cover-images/tutorial_01.png',
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

Firebase gives you authentication, a real-time database, file storage, cloud functions, and analytics — all wired together and ready to use from your Flutter app. No server setup, no DevOps. Here's how to actually use each service.

## Setup

Install the FlutterFire CLI and initialize:

\`\`\`bash
# Install the CLI globally
dart pub global activate flutterfire_cli

# Initialize Firebase in your Flutter project
flutterfire configure
\`\`\`

This generates \`firebase_options.dart\`. Then initialize in your app:

\`\`\`dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}
\`\`\`

## Authentication

Firebase Auth handles email/password, Google Sign-In, Apple Sign-In, and phone number verification. Here's the practical implementation:

\`\`\`dart
class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Current user as a stream — drives your UI reactively
  Stream<User?> get authStateChanges => _auth.authStateChanges();

  // Email + Password sign up
  Future<UserCredential> signUp(String email, String password) async {
    return await _auth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  // Email + Password sign in
  Future<UserCredential> signIn(String email, String password) async {
    return await _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  // Google Sign-In
  Future<UserCredential> signInWithGoogle() async {
    final googleUser = await GoogleSignIn().signIn();
    if (googleUser == null) throw Exception('Google sign-in cancelled');

    final googleAuth = await googleUser.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );

    return await _auth.signInWithCredential(credential);
  }

  Future<void> signOut() => _auth.signOut();
}
\`\`\`

Listen to auth state changes in your app to redirect between login and home:

\`\`\`dart
StreamBuilder<User?>(
  stream: authService.authStateChanges,
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const SplashScreen();
    }
    return snapshot.hasData ? const HomeScreen() : const LoginScreen();
  },
)
\`\`\`

## Cloud Firestore

Firestore is a NoSQL document database with real-time sync and offline support built in. Data is organized in collections and documents.

### Writing Data

\`\`\`dart
class TaskRepository {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> createTask(Task task) async {
    await _db.collection('users')
      .doc(task.userId)
      .collection('tasks')
      .doc(task.id)
      .set({
        'title': task.title,
        'isCompleted': task.isCompleted,
        'createdAt': FieldValue.serverTimestamp(),
        'priority': task.priority.name,
      });
  }

  Future<void> toggleComplete(String userId, String taskId) async {
    final ref = _db.collection('users').doc(userId).collection('tasks').doc(taskId);
    final doc = await ref.get();
    await ref.update({
      'isCompleted': !(doc.data()?['isCompleted'] ?? false),
      'updatedAt': FieldValue.serverTimestamp(),
    });
  }
}
\`\`\`

### Reading Data in Real-Time

\`\`\`dart
// One-time fetch
Future<List<Task>> getTasks(String userId) async {
  final snapshot = await _db
    .collection('users')
    .doc(userId)
    .collection('tasks')
    .orderBy('createdAt', descending: true)
    .get();

  return snapshot.docs.map((doc) => Task.fromFirestore(doc)).toList();
}

// Real-time stream — UI updates automatically when data changes
Stream<List<Task>> watchTasks(String userId) {
  return _db
    .collection('users')
    .doc(userId)
    .collection('tasks')
    .orderBy('createdAt', descending: true)
    .snapshots()
    .map((snapshot) =>
      snapshot.docs.map((doc) => Task.fromFirestore(doc)).toList(),
    );
}
\`\`\`

### Security Rules

Firestore Security Rules control who can read and write. Without them, your data is wide open:

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
\`\`\`

## Cloud Storage

For user-uploaded files — profile pictures, documents, images:

\`\`\`dart
class StorageService {
  final FirebaseStorage _storage = FirebaseStorage.instance;

  Future<String> uploadProfileImage(String userId, File file) async {
    final ref = _storage.ref('users/\$userId/profile.jpg');

    // Upload with metadata
    await ref.putFile(
      file,
      SettableMetadata(contentType: 'image/jpeg'),
    );

    // Get the download URL
    return await ref.getDownloadURL();
  }

  Future<void> deleteFile(String path) async {
    await _storage.ref(path).delete();
  }
}
\`\`\`

## Cloud Functions

Server-side logic that runs in response to events. Write in TypeScript, deploy to Google Cloud:

\`\`\`typescript
// functions/src/index.ts
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { getMessaging } from 'firebase-admin/messaging';

export const onNewTask = onDocumentCreated(
  'users/{userId}/tasks/{taskId}',
  async (event) => {
    const task = event.data?.data();
    const userId = event.params.userId;

    // Send push notification when a task is created
    await getMessaging().sendToTopic(userId, {
      notification: {
        title: 'New Task',
        body: task?.title ?? 'You have a new task',
      },
    });
  }
);
\`\`\`

## Offline Support

Firestore has offline support enabled by default on mobile. When the user loses connection:

1. Writes are queued locally
2. Reads come from the local cache
3. When connection returns, queued writes sync automatically

You don't write any extra code for this. It just works.

\`\`\`dart
// This works even offline
await _db.collection('tasks').add({
  'title': 'Buy groceries',
  'isCompleted': false,
});
// Firestore queues the write and syncs when back online
\`\`\`

## When to Use Firebase

| Use Case | Firebase Service |
|----------|-----------------|
| User login/signup | Firebase Auth |
| App data (CRUD) | Cloud Firestore |
| File uploads | Cloud Storage |
| Push notifications | Cloud Messaging |
| Server logic | Cloud Functions |
| Crash tracking | Crashlytics |
| User analytics | Google Analytics |

## When NOT to Use Firebase

- **Complex relational data**: If your data has many join tables and complex relationships, PostgreSQL (via Supabase) is better.
- **Full SQL access**: Firestore is NoSQL. No JOINs, no aggregations beyond basic counts.
- **Self-hosting requirement**: Firebase is Google Cloud only.
- **Predictable pricing at scale**: Firestore charges per read/write. High-traffic apps can get expensive fast.

## The Bottom Line

Firebase is the fastest way to go from zero to a production backend. Auth, database, storage, push notifications — it's all there, wired together, with offline support out of the box. Start with Auth + Firestore, add services as you need them.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-05',
        updatedAt: '2025-09-05',
        readingTime: 10,
        category: 'Backend Development',
        tags: ['Firebase', 'Flutter', 'Backend', 'Authentication', 'Cloud'],
        featured: true,
        coverImage: '/assets/blog/cover-images/tutorial_02.png',
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
# Shorebird: Code Push for Flutter Apps

You shipped a bug to production. App Store review takes 1-3 days. Your users are stuck. Shorebird fixes this — it lets you push Dart code updates directly to users' devices, bypassing app store review entirely. Here's how to set it up and use it.

## What Shorebird Actually Does

Shorebird replaces the Dart code in your app without going through the App Store or Google Play. It works at the Dart VM level — your app checks for patches on launch, downloads them, and applies them. Users get the fix without downloading a new version from the store.

**What it CAN update:** All Dart code — business logic, UI, state management, API calls, routing.

**What it CANNOT update:** Native code (Swift/Kotlin), native plugins, assets, or \`AndroidManifest.xml\`/\`Info.plist\` changes. If you add a new native dependency, you still need a store release.

## Setup

### 1. Install the Shorebird CLI

\`\`\`bash
# macOS/Linux
curl --proto '=https' --tlsv1.2 https://raw.githubusercontent.com/shorebirdtech/install/main/install.sh -sSf | bash

# Verify installation
shorebird --version
\`\`\`

### 2. Initialize in Your Project

\`\`\`bash
cd your_flutter_app
shorebird init
\`\`\`

This creates a \`shorebird.yaml\` in your project root:

\`\`\`yaml
# shorebird.yaml
app_id: your-unique-app-id
\`\`\`

### 3. Login

\`\`\`bash
shorebird login
\`\`\`

That's it. Your project is now Shorebird-enabled.

## The Workflow

### Step 1: Create a Release

A "release" is your baseline — the version you submit to the app store:

\`\`\`bash
# Build a release for Android
shorebird release android

# Build a release for iOS
shorebird release ios
\`\`\`

This produces an AAB (Android) or IPA (iOS) that you submit to the store normally. Shorebird tracks this as a release baseline.

### Step 2: Push a Patch

After the release is live and you need to fix something, change your Dart code and push a patch:

\`\`\`bash
# Fix the bug in your Dart code, then:
shorebird patch android

# Or for iOS:
shorebird patch ios
\`\`\`

Shorebird diffs your current code against the release baseline and creates a minimal patch. Users get it on next app launch.

### Step 3: Verify

Check what's deployed:

\`\`\`bash
# List all releases
shorebird releases list

# List patches for a release
shorebird patches list --release-version 1.0.0
\`\`\`

## Real-World Example

Let's say your app has a price calculation bug:

\`\`\`dart
// BEFORE (buggy) — shipped in release 1.2.0
double calculateTotal(List<CartItem> items) {
  return items.fold(0, (sum, item) => sum + item.price); // Missing quantity!
}

// AFTER (fixed)
double calculateTotal(List<CartItem> items) {
  return items.fold(0, (sum, item) => sum + item.price * item.quantity);
}
\`\`\`

Without Shorebird: fix the code, build, submit to store, wait 1-3 days for review. Users see wrong prices the entire time.

With Shorebird:

\`\`\`bash
# Fix the code, then:
shorebird patch android
shorebird patch ios
# Users get the fix in minutes
\`\`\`

## How the App Receives Patches

The patching is automatic. On app launch, the Shorebird engine checks for available patches and applies them. No code changes needed in your app — the check happens at the Dart VM level.

The patch download is small (typically 50-200KB) because Shorebird sends only the diff, not the entire app.

## Staging & Rollback

### Preview Before Deploying

Test a patch before it goes to all users:

\`\`\`bash
# Build a preview patch
shorebird preview

# This gives you a QR code or link to install the patched version
# Test it on your device before deploying to everyone
\`\`\`

### Rolling Back

Pushed a bad patch? Roll it back:

\`\`\`bash
# List patches
shorebird patches list --release-version 1.2.0

# Delete the bad patch
shorebird patches delete --patch-number 3
\`\`\`

Users revert to the previous patch (or the original release if no other patches exist) on next launch.

## CI/CD Integration

Add Shorebird to your GitHub Actions workflow:

\`\`\`yaml
# .github/workflows/patch.yml
name: Push Patch
on:
  workflow_dispatch:

jobs:
  patch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shorebirdtech/setup-shorebird@v1
        with:
          token: \${{ secrets.SHOREBIRD_TOKEN }}
      - run: shorebird patch android
\`\`\`

Now you can push patches from CI with a button click.

## Pricing & Limits

| Plan | Patch Installs/Month | Price |
|------|---------------------|-------|
| Free | 5,000 | $0 |
| Pro | 50,000 | $20/mo |
| Team | 500,000 | $100/mo |
| Enterprise | Unlimited | Custom |

A "patch install" counts when a user downloads and applies a patch. Regular app usage doesn't count.

## App Store Compliance

Shorebird is compliant with both Apple and Google's policies. Apple allows "interpreted code" updates as long as you don't change the app's primary purpose. Google's policy is similar. Shorebird is specifically designed to stay within these guidelines.

Key rule: don't use code push to add entirely new features that change your app's category. Use it for bug fixes, performance improvements, and incremental updates.

## When to Use Shorebird

- **Critical bug fixes** that can't wait for store review
- **A/B testing** different UI or logic variations
- **Hotfixes** for crashes discovered in production
- **Iterating fast** on user feedback
- **Compliance updates** that need immediate deployment

## When NOT to Use Shorebird

- Adding new native plugins (requires store release)
- Changing app permissions (requires store release)
- Major feature additions (better as a proper store release for marketing/visibility)

## The Bottom Line

Shorebird adds a safety net to your release process. Ship to the store normally, and when something goes wrong — or you need to iterate fast — push a Dart patch that reaches users in minutes. Setup takes 5 minutes, and the first time you fix a production bug without waiting for store review, you'll wonder how you ever shipped without it.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-01',
        updatedAt: '2025-09-01',
        readingTime: 9,
        category: 'DevOps',
        tags: ['Shorebird', 'Flutter', 'Deployment', 'Code Push', 'DevOps'],
        featured: false,
        coverImage: '/assets/blog/cover-images/tutorial_03.png',
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

Supabase gives you a PostgreSQL database, authentication, real-time subscriptions, file storage, and Edge Functions — all open source, all with a Flutter SDK. If you've hit Firestore's limitations with relational data or vendor lock-in concerns, this is the alternative worth learning.

## Setup

### 1. Create a Supabase Project

Go to [supabase.com](https://supabase.com), create a project, and grab your URL and anon key from Settings > API.

### 2. Add the Flutter Package

\`\`\`yaml
# pubspec.yaml
dependencies:
  supabase_flutter: ^2.5.0
\`\`\`

### 3. Initialize

\`\`\`dart
import 'package:supabase_flutter/supabase_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Supabase.initialize(
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key',
  );

  runApp(const MyApp());
}

// Access the client anywhere
final supabase = Supabase.instance.client;
\`\`\`

## Database: Real SQL, Real Power

Unlike Firestore's NoSQL document model, Supabase uses PostgreSQL. You get tables, relationships, JOINs, constraints, and indexes.

### Create Tables (SQL Editor or Dashboard)

\`\`\`sql
-- Create a tasks table
create table tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  title text not null,
  is_completed boolean default false,
  priority int default 0,
  created_at timestamptz default now()
);

-- Add an index for faster queries
create index idx_tasks_user_id on tasks(user_id);
\`\`\`

### CRUD Operations from Flutter

\`\`\`dart
class TaskRepository {
  // CREATE
  Future<void> createTask(String title, int priority) async {
    await supabase.from('tasks').insert({
      'title': title,
      'priority': priority,
      'user_id': supabase.auth.currentUser!.id,
    });
  }

  // READ — with filtering and ordering
  Future<List<Map<String, dynamic>>> getTasks() async {
    final response = await supabase
      .from('tasks')
      .select()
      .eq('user_id', supabase.auth.currentUser!.id)
      .order('created_at', ascending: false);

    return response;
  }

  // READ — with JOINs (something Firestore can't do)
  Future<List<Map<String, dynamic>>> getTasksWithCategories() async {
    final response = await supabase
      .from('tasks')
      .select('*, categories(name, color)')
      .eq('user_id', supabase.auth.currentUser!.id);

    return response;
  }

  // UPDATE
  Future<void> toggleComplete(String taskId, bool isCompleted) async {
    await supabase
      .from('tasks')
      .update({'is_completed': isCompleted})
      .eq('id', taskId);
  }

  // DELETE
  Future<void> deleteTask(String taskId) async {
    await supabase.from('tasks').delete().eq('id', taskId);
  }
}
\`\`\`

Notice the \`.select('*, categories(name, color)')\` — that's a JOIN. Supabase automatically detects foreign key relationships and lets you query across tables in a single call. Try doing that with Firestore.

## Authentication

Supabase Auth supports email/password, OAuth providers (Google, Apple, GitHub), magic links, and phone OTP:

\`\`\`dart
class AuthService {
  // Sign up
  Future<AuthResponse> signUp(String email, String password) async {
    return await supabase.auth.signUp(
      email: email,
      password: password,
    );
  }

  // Sign in
  Future<AuthResponse> signIn(String email, String password) async {
    return await supabase.auth.signInWithPassword(
      email: email,
      password: password,
    );
  }

  // Google OAuth
  Future<bool> signInWithGoogle() async {
    return await supabase.auth.signInWithOAuth(
      OAuthProvider.google,
      redirectTo: 'io.supabase.myapp://login-callback/',
    );
  }

  // Listen to auth changes
  Stream<AuthState> get onAuthStateChange =>
    supabase.auth.onAuthStateChange;

  // Sign out
  Future<void> signOut() => supabase.auth.signOut();
}
\`\`\`

## Row-Level Security (RLS)

This is Supabase's killer feature. RLS policies run at the database level — even if your Flutter code has a bug, users can never access data they shouldn't:

\`\`\`sql
-- Enable RLS on the tasks table
alter table tasks enable row level security;

-- Users can only see their own tasks
create policy "Users read own tasks"
  on tasks for select
  using (auth.uid() = user_id);

-- Users can only insert tasks for themselves
create policy "Users insert own tasks"
  on tasks for insert
  with check (auth.uid() = user_id);

-- Users can only update their own tasks
create policy "Users update own tasks"
  on tasks for update
  using (auth.uid() = user_id);

-- Users can only delete their own tasks
create policy "Users delete own tasks"
  on tasks for delete
  using (auth.uid() = user_id);
\`\`\`

With RLS, your API key can be safely used client-side. Even if someone decompiles your app and extracts the key, they can only access their own data.

## Real-Time Subscriptions

Listen to database changes in real-time:

\`\`\`dart
// Watch for changes to the tasks table
final channel = supabase
  .channel('tasks-channel')
  .onPostgresChanges(
    event: PostgresChangeEvent.all,
    schema: 'public',
    table: 'tasks',
    filter: PostgresChangeFilter(
      type: PostgresChangeFilterType.eq,
      column: 'user_id',
      value: supabase.auth.currentUser!.id,
    ),
    callback: (payload) {
      switch (payload.eventType) {
        case PostgresChangeEvent.insert:
          print('New task: \${payload.newRecord}');
          break;
        case PostgresChangeEvent.update:
          print('Updated: \${payload.newRecord}');
          break;
        case PostgresChangeEvent.delete:
          print('Deleted: \${payload.oldRecord}');
          break;
      }
    },
  )
  .subscribe();

// Clean up when done
channel.unsubscribe();
\`\`\`

## Storage

Upload and serve files with automatic CDN delivery:

\`\`\`dart
class StorageService {
  Future<String> uploadAvatar(String userId, Uint8List bytes) async {
    final path = 'avatars/\$userId.jpg';

    await supabase.storage
      .from('user-files')
      .uploadBinary(path, bytes, fileOptions: const FileOptions(
        contentType: 'image/jpeg',
        upsert: true,
      ));

    return supabase.storage
      .from('user-files')
      .getPublicUrl(path);
  }
}
\`\`\`

## Edge Functions

Server-side TypeScript functions for logic that shouldn't run on the client:

\`\`\`typescript
// supabase/functions/process-payment/index.ts
import { serve } from 'https://deno.land/std/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

serve(async (req) => {
  const { amount, currency } = await req.json()

  // Process payment with Stripe (server-side only)
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  })

  return new Response(
    JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
\`\`\`

Call from Flutter:

\`\`\`dart
final response = await supabase.functions.invoke('process-payment',
  body: {'amount': 2999, 'currency': 'usd'},
);
\`\`\`

## Firebase vs Supabase: Honest Comparison

| Feature | Firebase | Supabase |
|---------|----------|----------|
| Database | NoSQL (Firestore) | PostgreSQL (relational) |
| JOINs | Not supported | Full SQL JOINs |
| Pricing model | Per read/write | Per compute/storage |
| Open source | No | Yes |
| Self-hosting | No | Yes |
| Offline support | Built-in | Needs manual implementation |
| Real-time | Built-in | Built-in |
| Auth providers | Many | Many |
| Row-Level Security | Firestore Rules | PostgreSQL RLS |
| Edge Functions | Cloud Functions (Node.js) | Edge Functions (Deno) |
| Vendor lock-in | High | Low |

**Choose Firebase when:** You need offline-first with zero effort, you want tight Google ecosystem integration, or you're building a simple app with flat data structures.

**Choose Supabase when:** You need relational data, SQL power, open source transparency, self-hosting options, or predictable pricing at scale.

## Getting Started

1. Create a project at supabase.com
2. Create your tables in the SQL editor
3. Enable RLS and write policies
4. Add \`supabase_flutter\` to your app
5. Start with auth, then CRUD, then real-time

The SQL editor has AI assistance built in — describe what you want in plain English, and it generates the SQL. The dashboard lets you browse data, test queries, and manage auth without leaving the browser.
    `,
        author: {
            name: 'Muhammad Nabi Rahmani',
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-08-28',
        updatedAt: '2025-08-28',
        readingTime: 11,
        category: 'Backend Development',
        tags: ['Supabase', 'Flutter', 'Backend', 'PostgreSQL', 'Open Source'],
        featured: false,
        coverImage: '/assets/blog/cover-images/tutorial_04.png',
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
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-10-15',
        updatedAt: '2025-10-15',
        readingTime: 8,
        category: 'Flutter Development',
        tags: ['Flutter', 'Architecture', 'Clean Architecture', 'Best Practices'],
        featured: true,
        coverImage: '/assets/blog/cover-images/tutorial_05.png',
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
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-10-08',
        updatedAt: '2025-10-08',
        readingTime: 10,
        category: 'Flutter Development',
        tags: ['Flutter', 'Riverpod', 'State Management', 'Performance', 'Patterns'],
        featured: true,
        coverImage: '/assets/blog/cover-images/tutorial_06.png',
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
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-10-01',
        updatedAt: '2025-10-01',
        readingTime: 9,
        category: 'Flutter Development',
        tags: ['Flutter', 'Offline-First', 'Drift', 'Supabase', 'Architecture'],
        featured: false,
        coverImage: '/assets/blog/cover-images/tutorial_07.png',
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
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-25',
        updatedAt: '2025-09-25',
        readingTime: 9,
        category: 'Flutter Development',
        tags: ['Flutter', 'Error Handling', 'Best Practices', 'Production', 'Architecture'],
        featured: false,
        coverImage: '/assets/blog/cover-images/tutorial_08.png',
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
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-20',
        updatedAt: '2025-09-20',
        readingTime: 11,
        category: 'Flutter Development',
        tags: ['Flutter', 'Testing', 'Unit Tests', 'Widget Tests', 'Best Practices'],
        featured: false,
        coverImage: '/assets/blog/cover-images/tutorial_09.png',
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
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-15',
        updatedAt: '2025-09-15',
        readingTime: 9,
        category: 'Flutter Development',
        tags: ['Flutter', 'RevenueCat', 'Monetization', 'Subscriptions', 'In-App Purchases'],
        featured: false,
        coverImage: '/assets/blog/cover-images/tutorial_10.png',
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
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-12',
        updatedAt: '2025-09-12',
        readingTime: 7,
        category: 'DevOps',
        tags: ['Flutter', 'CI/CD', 'GitHub Actions', 'Google Play', 'DevOps'],
        featured: false,
        coverImage: '/assets/blog/cover-images/tutorial_11.png',
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
            avatar: '/assets/branding/profile.jpg',
            bio: 'Flutter Developer passionate about creating beautiful mobile experiences'
        },
        publishedAt: '2025-09-08',
        updatedAt: '2025-09-08',
        readingTime: 10,
        category: 'Backend Development',
        tags: ['Flutter', 'Supabase', 'Drift', 'SQLite', 'Offline-First', 'Sync'],
        featured: false,
        coverImage: '/assets/blog/cover-images/tutorial_12.png',
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
