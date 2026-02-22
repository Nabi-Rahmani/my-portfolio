---
description: Generate DartDoc documentation for Dart/Flutter code
model: claude-sonnet-4-5
---

# Generate Dart Documentation

Generate comprehensive DartDoc documentation for Dart/Flutter code following best practices.

## Code to Document

$ARGUMENTS

## Documentation Strategy

### 1. Documentation Types

**Code Documentation (DartDoc)**
- Class descriptions
- Method/function documentation
- Parameter descriptions
- Return value documentation
- Example code blocks

**API Documentation**
- Service method descriptions
- Repository interface contracts
- Data source documentation

**Architecture Documentation**
- Feature structure
- Layer responsibilities
- Data flow explanations

### 2. DartDoc Format

```dart
/// A brief one-line description of the class.
///
/// A longer description that explains the purpose of this class,
/// how it should be used, and any important considerations.
///
/// Example:
/// ```dart
/// final service = ProductService(repository: repo);
/// final products = await service.getAll();
/// ```
class ProductService {
  /// Creates a [ProductService] with the given [repository].
  ///
  /// The [repository] is used for all data operations.
  ProductService({required ProductRepository repository})
      : _repository = repository;

  final ProductRepository _repository;

  /// Fetches all products from the repository.
  ///
  /// Returns a [Future] that completes with a list of [Product] entities.
  ///
  /// Throws a [NetworkException] if the network is unavailable.
  /// Throws a [DatabaseException] if the local database fails.
  ///
  /// Example:
  /// ```dart
  /// final products = await service.getAll();
  /// for (final product in products) {
  ///   print(product.name);
  /// }
  /// ```
  Future<List<Product>> getAll() => _repository.fetchAll();

  /// Creates a new product with the given parameters.
  ///
  /// Parameters:
  /// - [name]: The product name (required, max 100 characters)
  /// - [priceCents]: Price in cents (required, must be positive)
  /// - [barcode]: Optional barcode (EAN-13 or UPC-A format)
  /// - [stock]: Initial stock count (defaults to 0)
  ///
  /// Throws [ProductValidationException] if validation fails.
  ///
  /// Example:
  /// ```dart
  /// await service.createProduct(
  ///   name: 'Widget',
  ///   priceCents: 1999,
  ///   stock: 10,
  /// );
  /// ```
  Future<void> createProduct({
    required String name,
    required int priceCents,
    String? barcode,
    int stock = 0,
  }) async {
    // Implementation
  }
}
```

### 3. Entity Documentation

```dart
/// Represents a product in the inventory system.
///
/// Products are the core entity for tracking items available for sale.
/// Each product has a unique [id] and tracks [stock] levels.
///
/// This is a domain entity and should remain pure Dart
/// (no Flutter dependencies).
class Product {
  /// The unique identifier for this product.
  final String id;

  /// The display name of the product.
  ///
  /// Must be between 1 and 100 characters.
  final String name;

  /// The price in cents to avoid floating-point issues.
  ///
  /// Use [formattedPrice] to get a display-ready string.
  final int priceCents;

  /// Optional barcode in EAN-13 or UPC-A format.
  final String? barcode;

  /// Current stock level.
  ///
  /// Cannot be negative. Use [isLowStock] to check if restocking is needed.
  final int stock;

  /// Creates a new [Product] instance.
  const Product({
    required this.id,
    required this.name,
    required this.priceCents,
    this.barcode,
    required this.stock,
  });

  /// Returns the price formatted as currency (e.g., "$19.99").
  String get formattedPrice => '\$${(priceCents / 100).toStringAsFixed(2)}';

  /// Returns true if stock is at or below the reorder threshold (5 units).
  bool get isLowStock => stock <= 5;

  /// Creates a copy of this product with the given fields replaced.
  ///
  /// All parameters are optional. Unspecified fields retain their
  /// current values.
  Product copyWith({
    String? name,
    int? priceCents,
    String? barcode,
    int? stock,
  }) {
    return Product(
      id: id,
      name: name ?? this.name,
      priceCents: priceCents ?? this.priceCents,
      barcode: barcode ?? this.barcode,
      stock: stock ?? this.stock,
    );
  }
}
```

### 4. Repository Documentation

```dart
/// Contract for product data operations.
///
/// Implementations of this interface handle the actual data storage
/// and retrieval. The application layer depends on this abstraction,
/// not concrete implementations.
///
/// See also:
/// - [ProductRepositoryImpl] for the default implementation
/// - [ProductService] for business logic built on this repository
abstract class ProductRepository {
  /// Fetches all products.
  ///
  /// Returns an empty list if no products exist.
  /// Products are returned sorted by [createdAt] descending.
  Future<List<Product>> fetchAll();

  /// Fetches a single product by [id].
  ///
  /// Returns null if no product with the given [id] exists.
  Future<Product?> getById(String id);

  /// Adds a new product.
  ///
  /// The product must have a unique [id]. If a product with the
  /// same [id] already exists, behavior is implementation-dependent.
  Future<void> add(Product product);

  /// Updates an existing product.
  ///
  /// The product must already exist. Throws [NotFoundException]
  /// if the product doesn't exist.
  Future<void> update(Product product);

  /// Deletes a product by [id].
  ///
  /// Does nothing if no product with the given [id] exists.
  Future<void> delete(String id);

  /// Watches all products for changes.
  ///
  /// Returns a stream that emits the current list of products
  /// whenever any product is added, updated, or deleted.
  Stream<List<Product>> watchAll();
}
```

### 5. Widget Documentation

```dart
/// A card widget displaying a product's key information.
///
/// Shows the product name, price, and optionally a low stock indicator.
/// Supports tap and edit actions through callbacks.
///
/// Example:
/// ```dart
/// ProductCard(
///   product: product,
///   onTap: () => navigateToDetail(product.id),
///   onEdit: () => navigateToEdit(product.id),
/// )
/// ```
class ProductCard extends StatelessWidget {
  /// The product to display.
  final Product product;

  /// Called when the card is tapped.
  ///
  /// Typically used to navigate to a detail screen.
  final VoidCallback? onTap;

  /// Called when the edit action is triggered.
  ///
  /// If null, the edit button is not shown.
  final VoidCallback? onEdit;

  /// Creates a [ProductCard] widget.
  const ProductCard({
    super.key,
    required this.product,
    this.onTap,
    this.onEdit,
  });

  @override
  Widget build(BuildContext context) {
    // Implementation
  }
}
```

### 6. Provider Documentation

```dart
/// Provides the [ProductService] instance.
///
/// This provider wires up the service with its dependencies:
/// - [ProductRepository] for data operations
///
/// Usage:
/// ```dart
/// final service = ref.watch(productServiceProvider);
/// await service.createProduct(...);
/// ```
@riverpod
ProductService productService(ProductServiceRef ref) {
  return ProductService(
    repository: ref.watch(productRepositoryProvider),
  );
}

/// Provides the list of all products as an async value.
///
/// Automatically updates when products change.
/// Handles loading and error states via [AsyncValue].
///
/// Usage in a widget:
/// ```dart
/// final productsAsync = ref.watch(productControllerProvider);
/// return productsAsync.when(
///   data: (products) => ProductList(products: products),
///   loading: () => CircularProgressIndicator(),
///   error: (e, _) => ErrorView(error: e),
/// );
/// ```
@riverpod
class ProductController extends _$ProductController {
  // Implementation
}
```

### 7. Running DartDoc

```bash
# Generate documentation
dart doc .

# Generate with specific output directory
dart doc --output docs/api .

# Preview locally
cd doc/api
python -m http.server 8000
# Open http://localhost:8000
```

### 8. Best Practices

**Good Comments**
```dart
/// Validates the barcode format.
///
/// Accepts EAN-13 (13 digits) and UPC-A (12 digits) formats.
/// Returns true if the format is valid.
bool _isValidBarcode(String barcode) {
  return RegExp(r'^\d{12,13}$').hasMatch(barcode);
}
```

**Bad Comments (Don't document the obvious)**
```dart
// BAD: States the obvious
/// Gets the name.
String get name => _name;

// BAD: Repeats the code
/// Adds one to count.
void increment() => count++;
```

## What to Generate

1. **Class Documentation** - Description, usage examples
2. **Method Documentation** - Parameters, return values, exceptions
3. **Property Documentation** - Purpose and constraints
4. **Usage Examples** - Practical code snippets
5. **Cross-References** - Links to related classes/methods

## Documentation Checklist

### Required Documentation
- [ ] All public classes
- [ ] All public methods
- [ ] All public properties
- [ ] Constructor parameters
- [ ] Thrown exceptions

### Recommended
- [ ] Usage examples
- [ ] Cross-references with `[ClassName]`
- [ ] Parameter constraints
- [ ] Return value descriptions

### Skip Documentation For
- [ ] Private members (unless complex)
- [ ] Obvious getters/setters
- [ ] Override methods (unless behavior differs)
- [ ] Generated code (.g.dart, .freezed.dart)

Focus on documentation that helps future developers understand and use the code correctly. Don't document the obvious.
