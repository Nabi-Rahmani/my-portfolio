---
description: Generate Dart types and Drift tables from Supabase database schema
model: claude-sonnet-4-5
---

# Generate Dart Types from Supabase Schema

Generate Dart domain entities, Drift tables, and mappers from your Supabase database schema.

## Approach

Unlike TypeScript projects, Flutter/Dart doesn't have automatic type generation from Supabase. Instead, follow these patterns:

## 1. Fetch Schema Info

Use Supabase dashboard or SQL to understand your schema:

```sql
-- Get table columns and types
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'products'
ORDER BY ordinal_position;
```

## 2. Create Domain Entity (Pure Dart)

```dart
// lib/src/feature/product/domain/product.dart

/// Domain entity - pure Dart, no external dependencies
class Product {
  final String id;
  final String name;
  final int priceCents;
  final String? barcode;
  final int stock;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Product({
    required this.id,
    required this.name,
    required this.priceCents,
    this.barcode,
    required this.stock,
    required this.createdAt,
    required this.updatedAt,
  });

  /// Computed property
  String get formattedPrice => '\$${(priceCents / 100).toStringAsFixed(2)}';

  /// Immutable update pattern
  Product copyWith({
    String? id,
    String? name,
    int? priceCents,
    String? barcode,
    int? stock,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Product(
      id: id ?? this.id,
      name: name ?? this.name,
      priceCents: priceCents ?? this.priceCents,
      barcode: barcode ?? this.barcode,
      stock: stock ?? this.stock,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Product &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;
}
```

## 3. Create Drift Table

```dart
// lib/src/feature/product/data/local/product_table.dart
import 'package:drift/drift.dart';

/// Drift table definition - matches Supabase schema
class ProductTable extends Table {
  // UUID from Supabase
  TextColumn get id => text()();

  // Text with constraint
  TextColumn get name => text().withLength(min: 1, max: 100)();

  // Store price as cents (integer)
  IntColumn get priceCents => integer()();

  // Nullable field
  TextColumn get barcode => text().nullable()();

  // Integer with default
  IntColumn get stock => integer().withDefault(const Constant(0))();

  // Timestamps
  DateTimeColumn get createdAt => dateTime()();
  DateTimeColumn get updatedAt => dateTime()();

  // Offline-first sync tracking
  BoolColumn get isDirty => boolean().withDefault(const Constant(true))();
  DateTimeColumn get lastSyncedAt => dateTime().nullable()();

  @override
  Set<Column> get primaryKey => {id};

  // Optional: Add indexes for frequently queried columns
  @override
  List<String> get customConstraints => [
    'CREATE INDEX IF NOT EXISTS idx_product_name ON products(name)',
  ];
}
```

## 4. Create Mapper

```dart
// lib/src/feature/product/data/product_mapper.dart
import 'package:drift/drift.dart';

class ProductMapper {
  /// Drift row → Domain entity
  static Product toDomain(ProductTableData row) {
    return Product(
      id: row.id,
      name: row.name,
      priceCents: row.priceCents,
      barcode: row.barcode,
      stock: row.stock,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    );
  }

  /// Domain entity → Drift companion (for inserts/updates)
  static ProductTableCompanion toCompanion(
    Product product, {
    bool isDirty = true,
  }) {
    return ProductTableCompanion(
      id: Value(product.id),
      name: Value(product.name),
      priceCents: Value(product.priceCents),
      barcode: Value(product.barcode),
      stock: Value(product.stock),
      createdAt: Value(product.createdAt),
      updatedAt: Value(product.updatedAt),
      isDirty: Value(isDirty),
    );
  }

  /// Supabase JSON → Domain entity
  static Product fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'] as String,
      name: json['name'] as String,
      priceCents: json['price_cents'] as int,
      barcode: json['barcode'] as String?,
      stock: json['stock'] as int? ?? 0,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  /// Domain entity → Supabase JSON
  static Map<String, dynamic> toJson(Product product) {
    return {
      'id': product.id,
      'name': product.name,
      'price_cents': product.priceCents,
      'barcode': product.barcode,
      'stock': product.stock,
      'created_at': product.createdAt.toIso8601String(),
      'updated_at': product.updatedAt.toIso8601String(),
    };
  }
}
```

## 5. Type Mapping Reference

| PostgreSQL Type | Dart Type | Drift Column |
|-----------------|-----------|--------------|
| uuid | String | text() |
| text, varchar | String | text() |
| integer, int4 | int | integer() |
| bigint, int8 | int | integer() |
| real, float4 | double | real() |
| boolean | bool | boolean() |
| timestamp, timestamptz | DateTime | dateTime() |
| date | DateTime | dateTime() |
| jsonb | Map<String, dynamic> | text() + custom converter |
| array | List<T> | text() + custom converter |

## 6. Handle Complex Types

### JSON/JSONB Fields

```dart
// In Drift table
TextColumn get metadata => text().map(const JsonConverter())();

// Custom converter
class JsonConverter extends TypeConverter<Map<String, dynamic>, String> {
  const JsonConverter();

  @override
  Map<String, dynamic> fromSql(String fromDb) {
    return jsonDecode(fromDb) as Map<String, dynamic>;
  }

  @override
  String toSql(Map<String, dynamic> value) {
    return jsonEncode(value);
  }
}
```

### Enum Fields

```dart
// Domain enum
enum ProductStatus { active, inactive, discontinued }

// In Drift table
TextColumn get status => textEnum<ProductStatus>()();

// In mapper
static ProductStatus _parseStatus(String status) {
  return ProductStatus.values.firstWhere(
    (e) => e.name == status,
    orElse: () => ProductStatus.active,
  );
}
```

## 7. Add to Database

```dart
// lib/src/core/database/app_database.dart
import 'package:drift/drift.dart';

part 'app_database.g.dart';

@DriftDatabase(tables: [
  ProductTable,
  SaleTable,
  CustomerTable,
])
class AppDatabase extends _$AppDatabase {
  AppDatabase(QueryExecutor e) : super(e);

  @override
  int get schemaVersion => 1;

  @override
  MigrationStrategy get migration => MigrationStrategy(
    onCreate: (m) => m.createAll(),
    onUpgrade: (m, from, to) async {
      // Handle migrations here
    },
  );
}
```

## When to Regenerate

Update your Dart types when:
- Adding/removing columns in Supabase
- Changing column types
- Adding new tables
- Modifying constraints

## Best Practices

### DO:
1. Keep domain entities pure Dart (no imports)
2. Use mappers for all conversions
3. Match Supabase column names in JSON mapper
4. Add sync tracking columns for offline-first
5. Use `copyWith` for immutable updates

### DON'T:
1. Import Flutter in domain layer
2. Put conversion logic in entities
3. Use snake_case in Dart (convert in mapper)
4. Forget to run `flutter pub run build_runner build`

## What to Generate

For each Supabase table, create:

1. **Domain Entity** - `lib/src/feature/<name>/domain/<name>.dart`
2. **Drift Table** - `lib/src/feature/<name>/data/local/<name>_table.dart`
3. **Mapper** - `lib/src/feature/<name>/data/<name>_mapper.dart`
4. **Add to AppDatabase** - Include table in `@DriftDatabase` annotation
