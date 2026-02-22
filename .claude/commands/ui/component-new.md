---
description: Create a new Flutter widget with modern best practices and strict UI rules
model: claude-sonnet-4-5
---

# Create New Flutter Widget

Generate a new Flutter widget following CodeWithNabi architecture patterns and strict UI style rules.

## Requirements

$ARGUMENTS

## Strict UI Style Rules

- ❌ **NO private members**: Do not use `_` for classes, methods, or variables.
- ❌ **150-line limit**: No widget file should exceed 150 lines.
- ✅ **Public only**: Keep everything public for maximum reusability and visibility.
- ✅ **Stateless by default**: Prefer `StatelessWidget` unless state is absolutely required.

## Widget Types

### 1. StatelessWidget (Default)

```dart
class ProductCard extends StatelessWidget {
  final Product product;
  final VoidCallback? onTap;

  const ProductCard({
    super.key,
    required this.product,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Text(product.name),
        ),
      ),
    );
  }
}
```

### 2. ConsumerWidget (Riverpod)

```dart
class CartSummary extends ConsumerWidget {
  const CartSummary({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cart = ref.watch(cartControllerProvider);
    return Text('Total: ${cart.formattedTotal}');
  }
}
```

## Key Rules

### ✅ DO:
1. Use `const` constructors.
2. Keep widgets small and focused (split if > 150 lines).
3. Use `Theme.of(context)` for all styling.
4. Keep all members **public**.

### ❌ DON'T:
1. Use private `_` prefixes.
2. Put business logic in widgets.
3. Mix data fetching with UI rendering.