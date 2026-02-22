---
description: Plan Flutter feature implementation with CodeWithNabi architecture
model: claude-sonnet-4-5
---

# Plan Flutter Feature Implementation

Create a detailed implementation plan following Feature-First Clean Architecture.

## Feature Description

$ARGUMENTS

## Planning Framework

### 1. Feature Breakdown

Analyze and break down into:
- User stories / requirements
- Which layers are affected
- New vs modified files
- Database schema changes
- Supabase RLS policies needed

### 2. Architecture Layers Checklist

```
lib/src/feature/<feature_name>/
├── domain/           # Pure Dart entities + abstract repos
├── data/             # Data sources + repository impl + mappers + sync services
├── application/      # Services + providers (Logic Only)
└── presentation/     # Controllers + screens + widgets
```

**For each layer, determine:**
- What needs to be created?
- What needs to be modified?
- Dependencies between layers

### 3. Implementation Order

Always follow this order (bottom-up):

**Phase 1: Domain Layer**
- [ ] Create entity class (pure Dart)
- [ ] Define abstract repository interface
- [ ] Add value objects if needed

**Phase 2: Data Layer**
- [ ] Create Supabase table (if new)
- [ ] Add RLS policies
- [ ] Create Drift table definition
- [ ] Implement local data source (Drift)
- [ ] Implement remote data source (Supabase)
- [ ] Create mapper (JSON ↔ Domain ↔ Drift)
- [ ] Create sync service (handles offline-to-online orchestration)
- [ ] Implement repository

**Phase 3: Application Layer**
- [ ] Create service with business logic
- [ ] Add validation in service
- [ ] Wire up Riverpod providers

**Phase 4: Presentation Layer**
- [ ] Create controller (AsyncNotifier)
- [ ] Create screen(s)
- [ ] Create widgets
- [ ] Add routes to go_router

**Phase 5: Testing**
- [ ] Unit tests for entity
- [ ] Unit tests for service
- [ ] Widget tests
- [ ] Integration tests

### 4. File Structure Template

```
lib/src/feature/<feature>/
├── domain/
│   ├── <entity>.dart
│   └── <entity>_repository.dart
├── data/
│   ├── <entity>_repository_impl.dart
│   ├── <entity>_mapper.dart
│   ├── <entity>_sync_service.dart  # ✅ Sync belongs in Data
│   ├── local/
│   │   ├── local_<entity>_data_source.dart
│   │   ├── drift_<entity>_data_source.dart
│   │   └── <entity>_table.dart
│   └── remote/
│       ├── remote_<entity>_data_source.dart
│       └── supabase_<entity>_data_source.dart
├── application/
│   ├── <entity>_service.dart
│   └── <entity>_providers.dart
└── presentation/
    ├── <entity>_controller.dart
    └── screens/
        ├── <entity>_list_screen.dart
        ├── <entity>_detail_screen.dart
        └── widgets/
            └── <entity>_card.dart
```

## Output Format

### Feature Overview
- **Problem solved**: What user need does this address?
- **User stories**: As a user, I want to...
- **Key functionality**: Bullet list of features

### Database Design

```sql
-- Supabase table
CREATE TABLE <table_name> (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- columns here
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies
ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data"
ON <table_name> FOR SELECT
USING (auth.uid() = user_id);
```

### Implementation Plan

**Phase 1: Domain (Day 1)**
- [ ] `<entity>.dart` - Pure Dart entity with copyWith
- [ ] `<entity>_repository.dart` - Abstract repository interface

**Phase 2: Data (Day 1-2)**
- [ ] Supabase migration - Create table + RLS
- [ ] `<entity>_table.dart` - Drift table
- [ ] `drift_<entity>_data_source.dart` - Local implementation
- [ ] `supabase_<entity>_data_source.dart` - Remote implementation
- [ ] `<entity>_mapper.dart` - All conversions
- [ ] `<entity>_repository_impl.dart` - Wire data sources

**Phase 3: Application (Day 2)**
- [ ] `<entity>_service.dart` - Business logic + validation
- [ ] `<entity>_providers.dart` - Riverpod wiring

**Phase 4: Presentation (Day 2-3)**
- [ ] `<entity>_controller.dart` - AsyncNotifier
- [ ] `<entity>_list_screen.dart` - List view
- [ ] `<entity>_detail_screen.dart` - Detail view
- [ ] Add routes to `app_router.dart`

**Phase 5: Testing (Day 3)**
- [ ] Service tests with mocked repository
- [ ] Widget tests for screens
- [ ] Controller tests with mocked service

### Dependencies

**Packages** (if new ones needed):
```yaml
# pubspec.yaml additions
dependencies:
  package_name: ^x.x.x
```

**Code generation** (run after adding tables):
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

### Risk Assessment

- **Technical risks**: Unknown complexity areas
- **Data risks**: Migration, backward compatibility
- **Integration risks**: External service dependencies

### Success Criteria

- [ ] All CRUD operations work offline
- [ ] Data syncs when online
- [ ] All AsyncValue states handled (loading, error, data)
- [ ] Tests pass
- [ ] No analyzer warnings

### Next Steps

1. Review this plan
2. Start with Domain layer
3. Work through each phase
4. Test incrementally
5. Commit after each phase

Provide a clear, actionable plan following CodeWithNabi architecture patterns.
