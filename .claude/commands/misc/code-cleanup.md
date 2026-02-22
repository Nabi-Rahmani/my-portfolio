---
description: Refactor and clean up Dart/Flutter code following best practices
model: claude-sonnet-4-5
---

# Clean Up Dart/Flutter Code

Refactor and clean up code following Dart best practices and CodeWithNabi architecture patterns.

## Code to Clean

$ARGUMENTS

## Dart/Flutter Cleanup Checklist

### 1. Code Smells to Fix

**Naming**
- Use lowerCamelCase for variables and functions
- Use UpperCamelCase for classes and types
- Use snake_case for file names
- Boolean names: isActive, hasData, canEdit
- Avoid abbreviations unless obvious

**Functions**
- Single responsibility per function
- Keep functions small (<30 lines ideal)
- Reduce parameters (max 3-4, use named parameters)
- Extract complex logic to helper methods
- Use arrow syntax for single expressions

**DRY (Don't Repeat Yourself)**
- Extract repeated code to utility functions
- Create reusable widgets
- Use mixins for shared behavior
- Centralize constants in dedicated files

**Widget Structure**
- Extract build methods for complex layouts
- Create separate widget classes for reusable components
- Use `const` constructors where possible
- Keep widget trees shallow (extract to methods/widgets)

### 2. Dart-Specific Patterns

**Use Modern Dart Features**
```dart
// Null safety
final value = obj?.property ?? defaultValue;

// Collection if/for
final items = [
  if (showHeader) HeaderWidget(),
  for (final item in list) ItemWidget(item: item),
];

// Cascade notation
final controller = TextEditingController()
  ..text = initialValue
  ..addListener(onChanged);

// Pattern matching (Dart 3)
switch (result) {
  case Success(:final data):
    return DataWidget(data: data);
  case Failure(:final error):
    return ErrorWidget(error: error);
}
```

**Named Parameters**
```dart
// Before
void createProduct(String name, double price, int stock, String? barcode)

// After
void createProduct({
  required String name,
  required double price,
  int stock = 0,
  String? barcode,
})
```

**Extension Methods**
```dart
// Create useful extensions
extension StringExtensions on String {
  String get capitalize => '${this[0].toUpperCase()}${substring(1)}';
  bool get isValidEmail => RegExp(r'^[\w-\.]+@').hasMatch(this);
}

extension DateTimeExtensions on DateTime {
  String get formatted => DateFormat('MMM d, yyyy').format(this);
  bool get isToday => DateUtils.isSameDay(this, DateTime.now());
}
```

### 3. Widget Refactoring

**Extract to Methods**
```dart
// Before: Deep nesting
Widget build(BuildContext context) {
  return Scaffold(
    body: Column(
      children: [
        Container(
          padding: EdgeInsets.all(16),
          child: Row(
            children: [
              Icon(Icons.person),
              SizedBox(width: 8),
              Text(user.name),
            ],
          ),
        ),
        // More nested widgets...
      ],
    ),
  );
}

// After: Extracted methods
Widget build(BuildContext context) {
  return Scaffold(
    body: Column(
      children: [
        _buildUserHeader(),
        _buildContent(),
      ],
    ),
  );
}

Widget _buildUserHeader() {
  return Container(
    padding: const EdgeInsets.all(16),
    child: Row(
      children: [
        const Icon(Icons.person),
        const SizedBox(width: 8),
        Text(user.name),
      ],
    ),
  );
}
```

**Extract to Widgets**
```dart
// Before: Inline complex widget
ListView.builder(
  itemBuilder: (context, index) {
    final product = products[index];
    return Card(
      child: ListTile(
        title: Text(product.name),
        subtitle: Text(product.formattedPrice),
        trailing: IconButton(
          icon: const Icon(Icons.add),
          onPressed: () => addToCart(product),
        ),
      ),
    );
  },
)

// After: Extracted widget
ListView.builder(
  itemBuilder: (context, index) => ProductListItem(
    product: products[index],
    onAddToCart: addToCart,
  ),
)
```

### 4. Architecture Cleanup

**Move Logic to Correct Layer**
```dart
// BAD: Business logic in widget
class ProductScreen extends ConsumerWidget {
  Widget build(context, ref) {
    // Don't do validation here
    if (name.isEmpty) throw Exception('Name required');
    await supabase.from('products').insert(...); // Don't call DB here
  }
}

// GOOD: Logic in service, widget just triggers
class ProductScreen extends ConsumerWidget {
  Widget build(context, ref) {
    return ElevatedButton(
      onPressed: () => ref.read(productServiceProvider).create(...),
      child: Text('Create'),
    );
  }
}
```

**Proper Provider Usage**
```dart
// BAD: ref.read in build for reactive state
final products = ref.read(productsProvider); // Won't rebuild!

// GOOD: ref.watch for reactive state
final products = ref.watch(productsProvider);

// GOOD: ref.read in callbacks
onPressed: () => ref.read(productControllerProvider.notifier).delete(id)
```

### 5. Common Fixes

**Remove Unused Imports**
```bash
# Use dart fix
dart fix --apply
```

**Add const Where Possible**
```dart
// Before
return Container(
  padding: EdgeInsets.all(16),
  child: Text('Hello'),
);

// After
return const Padding(
  padding: EdgeInsets.all(16),
  child: Text('Hello'),
);
```

**Proper Null Handling**
```dart
// Before: Unnecessary null check
if (value != null) {
  return value.toString();
} else {
  return 'default';
}

// After: Null coalescing
return value?.toString() ?? 'default';
```

**Error Handling**
```dart
// Before: Silent failures
try {
  await doSomething();
} catch (e) {
  print(e); // Don't do this
}

// After: Proper error handling
try {
  await doSomething();
} on SpecificException catch (e) {
  throw AppException('User-friendly message', cause: e);
} catch (e, stack) {
  ErrorLogger.log(e, stack);
  rethrow;
}
```

### 6. Analysis Options

Ensure you have strict analysis:

```yaml
# analysis_options.yaml
include: package:flutter_lints/flutter.yaml

linter:
  rules:
    - always_declare_return_types
    - avoid_print
    - avoid_unnecessary_containers
    - prefer_const_constructors
    - prefer_const_declarations
    - prefer_final_fields
    - prefer_final_locals
    - require_trailing_commas
    - sort_child_properties_last

analyzer:
  errors:
    missing_return: error
    dead_code: warning
  exclude:
    - "**/*.g.dart"
    - "**/*.freezed.dart"
```

## Output Format

1. **Issues Found** - List of code smells and problems
2. **Cleaned Code** - Refactored version
3. **Explanations** - What changed and why
4. **Architecture Notes** - If code is in wrong layer

## Key Rules

### DO:
1. Use `const` constructors
2. Extract reusable widgets
3. Keep widgets shallow
4. Put logic in services
5. Use proper null safety
6. Follow layer separation

### DON'T:
1. Leave business logic in widgets
2. Use `ref.read` for reactive state
3. Ignore analyzer warnings
4. Create deep widget trees
5. Use print() for logging
