---
description: Create a new Service and Repository layer for a feature
model: claude-sonnet-4-5
---

# Create New Service/Repository Layer

Create the Application and Data layer components following CodeWithNabi Feature-First Clean Architecture.

## Requirements

$ARGUMENTS

## Architecture Overview

```
lib/src/feature/<feature_name>/
├── domain/
│   ├── <entity>.dart              # Pure Dart entity
│   └── <entity>_repository.dart   # Abstract repository
│
├── data/
│   ├── <entity>_repository_impl.dart  # Repository implementation
│   ├── <entity>_mapper.dart           # DTO ↔ Domain mappers
│   ├── <entity>_sync_service.dart     # ✅ Sync logic (Data Layer)
│   ├── local/
│   │   ├── local_<entity>_data_source.dart      # Abstract
│   │   ├── drift_<entity>_data_source.dart      # Drift impl
│   │   └── <entity>_table.dart                  # Drift table
│   └── remote/
│       ├── remote_<entity>_data_source.dart     # Abstract
│       └── supabase_<entity>_data_source.dart   # Supabase impl
│
└── application/
    ├── <entity>_service.dart       # Pure Business logic
    └── <entity>_providers.dart     # Riverpod providers
```

## Layer Rules

### 1. Domain Layer (Pure Dart)
- **Entity**: Data model with `copyWith`.
- **Abstract Repository**: The "Contract" for data access.

### 2. Data Layer (CRUD & Sync)
- **Repository Impl**: Wires Local + Remote sources.
- **Sync Service**: Handles offline-to-online orchestration (Data Layer responsibility).
- **Mappers**: Pure functions to convert between JSON/SQL and Domain.

### 3. Application Layer (Logic Only)
- **Service**: Handles high-level business decisions and validation.
- **Providers**: DI wiring using Riverpod Generator.

## Implementation Example (Service)

```dart
// lib/src/feature/product/application/product_service.dart
class ProductService {
  final ProductRepository _repo;

  ProductService(this._repo);

  Future<void> createProduct({required String name, required double price}) async {
    // ✅ Validation in Service
    if (name.isEmpty) throw ProductValidationException('Name required');
    if (price <= 0) throw ProductValidationException('Price must be positive');

    final product = Product(
      id: const Uuid().v4(),
      name: name,
      price: price,
      createdAt: DateTime.now(),
    );

    await _repo.add(product);
  }
}
```

## Key Rules Summary

### ✅ DO:
1. Put all **Sync logic** in the Data Layer (`<entity>_sync_service.dart`).
2. Keep the Application layer purely about business rules and validation.
3. Use `AsyncValue.guard` in Controllers (Presentation) to call Services.
4. Ensure the Domain layer has zero Flutter/Infrastructure imports.

### ❌ DON'T:
1. Orchestrate sync inside the Application Service.
2. Put validation logic inside the Repository.
3. Access the database directly from the Presentation layer.
4. Use private members (`_`) in UI files.