---
description: Create a new Flutter screen with CodeWithNabi architecture and strict UI rules
model: claude-sonnet-4-5
---

# Create New Flutter Screen

Create a new Flutter screen following Feature-First Clean Architecture and strict UI style rules.

## Requirements

$ARGUMENTS

## Strict UI Style Rules

- ❌ **NO private members**: Do not use `_` for classes, methods, or variables.
- ❌ **150-line limit**: No screen or section file should exceed 150 lines.
- ✅ **Public only**: Keep everything public for maximum reusability and visibility.
- ✅ **Modular sections**: If a screen is complex, split it into public widgets in the `widgets/` folder.

## Screen Template

```dart
class ProductListScreen extends ConsumerWidget {
  const ProductListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productsAsync = ref.watch(productControllerProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Products')),
      body: productsAsync.when(
        data: (products) => ProductListView(products: products),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => ErrorView(error: err),
      ),
    );
  }
}
```

## Key Rules

### ✅ DO:
1. Use `ref.watch` for reactive state.
2. Use `ref.listen` for side effects (SnackBars, navigation).
3. Keep the file under **150 lines**.
4. Use **public** members for everything.

### ❌ DON'T:
1. Use private `_` prefixes.
2. Put validation or pricing logic in the screen (use Services).
3. Use `setState` (use Riverpod).