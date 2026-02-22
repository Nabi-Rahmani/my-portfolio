It's pure architecture for an offline-online data layer and how to enable drift
and Supabase sync.

# Daily Discipline - Data Layer Architecture

This document explains the data layer architecture for the Daily Discipline
60-day challenge feature.

## Architecture Overview

The data layer follows **Clean Architecture** principles with clear separation
between local and remote data sources:

```
┌─────────────────────────────────────────────────────────────────┐
│ DATA LAYER                                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐              ┌────────────────────────┐   │
│  │ LOCAL           │              │ REMOTE                 │   │
│  │ (Drift SQLite)  │              │ (Supabase PostgreSQL)  │   │
│  ├─────────────────┤              ├────────────────────────┤   │
│  │ • app_database  │              │ • progress_data_source │   │
│  │ • progress_table│              │ • journal_data_source  │   │
│  │ • journal_table │              │ • remote_repository    │   │
│  │ • progress      │              │ • sync_service         │   │
│  │   _mapper       │              │                        │   │
│  │ • local_repo    │              │ (PLACEHOLDERS ONLY)    │   │
│  └─────────────────┘              └────────────────────────┘   │
│           │                                   │                 │
│           └───────────────┬───────────────────┘                 │
│                           ↓                                     │
│            ┌──────────────────────────────┐                     │
│            │ DisciplineRepositoryImpl     │                     │
│            │ (Main Facade - Switches      │                     │
│            │  between local/remote/hybrid)│                     │
│            └──────────────────────────────┘                     │
│                           │                                     │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                            ↓
              ┌──────────────────────────┐
              │ APPLICATION LAYER        │
              │ (Business Logic Services)│
              └──────────────────────────┘
```

## Current State: **Offline-First with Drift**

✅ **Working:** Local database with Drift (SQLite) ⏳ **Future:** Remote sync
with Supabase (placeholders ready)

---

## Directory Structure

```
lib/src/features/daily_discipline/data/
├── local/                          # ✅ WORKING (Drift SQLite)
│   ├── database/
│   │   ├── app_database.dart       # Drift database instance
│   │   └── app_database.g.dart     # Generated file
│   ├── tables/
│   │   ├── progress_table.dart     # Progress table schema
│   │   └── journal_table.dart      # Journal table schema
│   ├── mappers/
│   │   └── progress_mapper.dart    # Drift ↔ Domain entity conversion
│   ├── sources/
│   │   └── plan_data_source.dart   # Loads 60-day plan from assets
│   └── repositories/
│       ├── local_discipline_repository.dart      # Local data operations
│       └── discipline_repository_impl.dart       # Main repository facade
│
├── remote/                         # ⏳ FUTURE (Supabase - Placeholders)
│   ├── client/
│   │   └── supabase_client.dart    # Supabase client (commented out)
│   ├── sources/
│   │   ├── progress_data_source.dart     # Progress remote operations
│   │   └── journal_data_source.dart      # Journal remote operations
│   ├── repositories/
│   │   └── remote_discipline_repository.dart   # Remote data operations
│   ├── services/
│   │   └── sync_service.dart       # Sync local ↔ remote
│   └── schema/
│       ├── README.md               # Schema documentation
│       ├── 01_create_user_progress_table.sql
│       ├── 02_create_journal_entries_table.sql
│       └── 03_enable_realtime.sql
│
└── README.md                       # This file
```

---

## How Data Flows

### Current: Local-Only Mode

```
User Action (UI)
    ↓
DisciplineService (Application Layer)
    ↓
DisciplineRepository (Domain Interface)
    ↓
DisciplineRepositoryImpl (Data Facade)
    ↓
LocalDisciplineRepository
    ↓
AppDatabase (Drift)
    ↓
SQLite File (dev_discipline.db)
```

### Future: Hybrid Mode (Offline-First + Sync)

```
User Action (UI)
    ↓
DisciplineService (Application Layer)
    ↓
DisciplineRepository (Domain Interface)
    ↓
DisciplineRepositoryImpl.hybrid
    ├─→ Save to Local (fast, always works)
    │   └─→ LocalDisciplineRepository → Drift → SQLite
    │
    └─→ Sync to Remote (background, best-effort)
        └─→ RemoteDisciplineRepository → Supabase → PostgreSQL
```

---

## Layer Responsibilities

### ✅ Data Layer SHOULD:

- Talk to external APIs (Supabase, REST)
- Talk to local storage (Drift, SharedPreferences)
- Decide local vs remote (which data source to use)
- Implement offline-first strategy
- Sync data (upload/download)
- Cache data
- Merge local + remote data
- Map DTO ↔ Domain entities

### ❌ Data Layer MUST NOT:

- Enforce business rules (e.g., "max 3 tasks per day")
- Validate domain invariants (e.g., "streak must be positive")
- Decide business meaning (e.g., "what makes a valid streak?")

---

## Enabling Supabase Sync (Step-by-Step)

### Step 1: Install Supabase Package

Add to `pubspec.yaml`:

```yaml
dependencies:
    supabase_flutter: ^2.3.0
```

Run:

```bash
flutter pub get
```

### Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Project Settings → API**
4. Copy your **Project URL** and **anon/public key**

### Step 3: Configure Credentials

Open `lib/src/core/config/supabase_config.dart` and replace placeholders:

```dart
static const String url = 'https://your-project.supabase.co';
static const String anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### Step 4: Run SQL Migrations

1. Go to Supabase Dashboard → **SQL Editor**
2. Run each migration in order:
   - `01_create_user_progress_table.sql`
   - `02_create_journal_entries_table.sql`
   - `03_enable_realtime.sql`

### Step 5: Initialize Supabase

In `lib/main_dev.dart` (before runApp):

```dart
import 'package:supabase_flutter/supabase_flutter.dart';
import 'src/core/config/supabase_config.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Supabase
  await Supabase.initialize(
    url: SupabaseConfig.url,
    anonKey: SupabaseConfig.anonKey,
  );

  runApp(const DevDisciplineApp());
}
```

### Step 6: Uncomment Remote Code

Uncomment all Supabase-related code in:

- `data/remote/client/supabase_client.dart`
- `data/remote/sources/progress_data_source.dart`
- `data/remote/sources/journal_data_source.dart`
- `data/remote/repositories/remote_discipline_repository.dart`
- `data/remote/services/sync_service.dart`

### Step 7: Enable Hybrid Mode

In `discipline_repository_impl.dart`, uncomment hybrid mode:

```dart
@riverpod
DisciplineRepository disciplineRepository(Ref ref) {
  const useSupabaseSync = true; // ← Change to true

  if (useSupabaseSync) {
    return DisciplineRepositoryImpl.hybrid(
      local: ref.watch(localDisciplineRepositoryProvider),
      remote: ref.watch(remoteDisciplineRepositoryProvider),
      syncService: ref.watch(syncServiceProvider),
    );
  } else {
    return DisciplineRepositoryImpl(
      ref.watch(localDisciplineRepositoryProvider),
    );
  }
}
```

### Step 8: Run Code Generation

```bash
dart run build_runner build --delete-conflicting-outputs
```

### Step 9: Test Sync

1. Run the app
2. Complete a task
3. Check Supabase Dashboard → **Table Editor** → `user_progress`
4. Verify data is synced

---

## Offline-First Strategy

The app uses **offline-first** approach for best user experience:

1. **Save to local first** (fast, always works)
   - User action immediately updates local Drift database
   - UI reflects changes instantly
   - No waiting for network

2. **Sync to remote in background** (best-effort)
   - Changes uploaded to Supabase asynchronously
   - If offline, changes queued for later
   - User not blocked by network issues

3. **Conflict resolution: Last-Write-Wins**
   - Compare `updated_at` timestamps
   - Keep most recent version
   - Overwrite older version

---

## Testing Without Supabase

You don't need Supabase to develop/test the app:

✅ **Local-only mode works perfectly:**

- All features available offline
- Data persists in Drift database
- No network required

⏳ **When ready for cloud sync:**

- Follow setup steps above
- Uncomment remote code
- Enable hybrid mode

---

## Key Files Reference

| File                                                    | Purpose                    | Status         |
| ------------------------------------------------------- | -------------------------- | -------------- |
| `local/database/app_database.dart`                      | Drift database instance    | ✅ Working     |
| `local/tables/progress_table.dart`                      | Progress table schema      | ✅ Working     |
| `local/mappers/progress_mapper.dart`                    | DTO ↔ Domain conversion    | ✅ Working     |
| `local/repositories/local_discipline_repository.dart`   | Local operations           | ✅ Working     |
| `local/repositories/discipline_repository_impl.dart`    | Main repository facade     | ✅ Working     |
| `remote/sources/progress_data_source.dart`              | Remote progress operations | ⏳ Placeholder |
| `remote/repositories/remote_discipline_repository.dart` | Remote operations          | ⏳ Placeholder |
| `remote/services/sync_service.dart`                     | Sync coordinator           | ⏳ Placeholder |
| `remote/schema/README.md`                               | SQL schema docs            | ✅ Ready       |
| `../../../core/config/supabase_config.dart`             | Credentials config         | ⏳ Needs setup |

---

## Architecture Benefits

1. **Clean Separation**: Local and remote concerns are isolated
2. **Testable**: Each layer can be tested independently
3. **Flexible**: Easy to switch between local/remote/hybrid modes
4. **Maintainable**: Clear file organization and responsibilities
5. **Scalable**: Add new data sources without changing business logic
6. **Offline-First**: App works perfectly without network
7. **Future-Proof**: Ready for Supabase when needed

---

## Questions?

- See `remote/schema/README.md` for SQL schema details
- See `../../../.claude/agents/flutter-architect.md` for architecture rules
- See domain layer (`../domain/`) for entities and interfaces
- See application layer (`../application/`) for business logic

---

**Current Status:** ✅ Offline-first with Drift (working) **Future Status:** ⏳
Hybrid with Supabase sync (ready to enable)
