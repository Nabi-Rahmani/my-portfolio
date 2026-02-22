---
description: Analyze task complexity and create Flutter implementation plan
model: claude-sonnet-4-5
---

# Analyze Task and Create Implementation Plan

Analyze the following task and create a clear, actionable implementation plan following CodeWithNabi Feature-First Clean Architecture.

## Task

$ARGUMENTS

## Analysis Framework

### 1. Task Classification

**Type**
- [ ] New Feature - Complete new functionality
- [ ] Enhancement - Improve existing feature
- [ ] Bug Fix - Fix broken functionality
- [ ] Refactor - Improve code quality
- [ ] Infrastructure - Setup, config, DevOps

**Complexity**
- **Small**: 1-2 hours (UI tweak, simple fix)
- **Medium**: Half day (new widget, service method)
- **Large**: 1-2 days (new feature with all layers)
- **Very Large**: 3+ days (complex feature, major refactor)

### 2. Architecture Impact

Determine which layers need changes:

```
lib/src/
├── core/              # Shared utilities, theme, errors
├── routing/           # Navigation (go_router)
└── feature/<name>/
    ├── domain/        # Entities, abstract repos
    ├── data/          # Data sources, repos, mappers
    ├── application/   # Services, providers
    └── presentation/  # Controllers, screens, widgets
```

**Questions to answer:**
- New feature or modifying existing?
- Which layers are affected?
- New database tables needed?
- RLS policies required?
- New packages needed?

### 3. Dependency Analysis

```
Domain ← Data ← Application ← Presentation
(innermost)                    (outermost)
```

- Domain: Pure Dart, no dependencies
- Data: Depends on Domain
- Application: Depends on Domain + Data
- Presentation: Depends on Application

### 4. Risk Assessment

**Technical Risks**
- Unknown API behavior
- Complex state management
- Performance concerns
- Third-party package issues

**Data Risks**
- Database migrations
- Data loss potential
- Offline sync conflicts

**Integration Risks**
- External services (Supabase, etc.)
- Package compatibility

## Output Format

### Task Summary
- **Type**: [Feature / Enhancement / Bug Fix / Refactor / Infrastructure]
- **Complexity**: [Small / Medium / Large / Very Large]
- **Affected Layers**: [Domain / Data / Application / Presentation]
- **Priority**: [High / Medium / Low]

### Requirements
1. User story or requirement 1
2. User story or requirement 2
3. ...

### Implementation Plan

**Phase 1: Setup** (X hours)
- [ ] Review existing code
- [ ] Plan database changes
- [ ] Add dependencies to pubspec.yaml

**Phase 2: Domain Layer** (X hours)
- [ ] Create entity class
- [ ] Define abstract repository

**Phase 3: Data Layer** (X hours)
- [ ] Create Supabase table + RLS
- [ ] Create Drift table
- [ ] Implement local data source
- [ ] Implement remote data source
- [ ] Create mapper
- [ ] Implement repository

**Phase 4: Application Layer** (X hours)
- [ ] Create service with business logic
- [ ] Add validation
- [ ] Wire Riverpod providers

**Phase 5: Presentation Layer** (X hours)
- [ ] Create controller (AsyncNotifier)
- [ ] Create screens
- [ ] Create widgets
- [ ] Add routes

**Phase 6: Testing** (X hours)
- [ ] Service unit tests
- [ ] Widget tests
- [ ] Integration tests

### Files to Create/Modify

**New Files**
```
lib/src/feature/<name>/domain/<entity>.dart
lib/src/feature/<name>/domain/<entity>_repository.dart
lib/src/feature/<name>/data/local/<entity>_table.dart
lib/src/feature/<name>/data/local/drift_<entity>_data_source.dart
lib/src/feature/<name>/data/remote/supabase_<entity>_data_source.dart
lib/src/feature/<name>/data/<entity>_mapper.dart
lib/src/feature/<name>/data/<entity>_repository_impl.dart
lib/src/feature/<name>/application/<entity>_service.dart
lib/src/feature/<name>/application/<entity>_providers.dart
lib/src/feature/<name>/presentation/<entity>_controller.dart
lib/src/feature/<name>/presentation/screens/<entity>_screen.dart
```

**Modified Files**
```
lib/src/core/database/app_database.dart (add new table)
lib/src/routing/app_router.dart (add routes)
```

### Dependencies

**Packages** (if needed)
```yaml
dependencies:
  new_package: ^x.x.x
```

**Database Changes**
```sql
-- Supabase migration
CREATE TABLE <table_name> (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- columns
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;
```

### Potential Issues

1. **Issue**: Description
   **Mitigation**: How to handle it

2. **Issue**: Description
   **Mitigation**: How to handle it

### Success Criteria

- [ ] Feature works as specified
- [ ] All AsyncValue states handled (loading, error, data)
- [ ] Works offline (if applicable)
- [ ] Tests pass
- [ ] No analyzer warnings
- [ ] Code follows architecture patterns

### Next Steps

1. Start with Phase 1
2. Run `flutter pub run build_runner build` after adding Drift tables
3. Test each layer before moving to next
4. Commit after each phase

---

Provide a clear, actionable plan that follows CodeWithNabi architecture patterns.
