---
description: Optimize Flutter code for performance, memory, and efficiency
model: claude-sonnet-4-5
---

# Optimize Flutter Performance

Analyze and optimize Flutter code for better performance, reduced memory usage, and smoother UI.

## Code to Optimize

$ARGUMENTS

## Performance Optimization Strategy

### 1. Profiling First

Before optimizing, identify actual bottlenecks:

**Flutter DevTools**
```bash
# Run with performance overlay
flutter run --profile

# Open DevTools
flutter pub global activate devtools
flutter pub global run devtools
```

**Key Metrics to Watch**
- Frame build time (aim for <16ms for 60fps)
- Frame rasterization time
- Memory usage
- Widget rebuild count

### 2. Widget Build Optimization

**Minimize Rebuilds**
```dart
// BAD: Entire widget rebuilds
class ProductList extends ConsumerWidget {
  Widget build(context, ref) {
    final products = ref.watch(productsProvider);
    return Column(
      children: [
        Header(), // Rebuilds every time!
        ProductGrid(products: products),
      ],
    );
  }
}

// GOOD: Const widgets don't rebuild
class ProductList extends ConsumerWidget {
  Widget build(context, ref) {
    final products = ref.watch(productsProvider);
    return Column(
      children: [
        const Header(), // Won't rebuild
        ProductGrid(products: products),
      ],
    );
  }
}
```

**Use const Constructors**
```dart
// BAD: Creates new instance every build
return Container(
  padding: EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(8),
  ),
  child: Text('Hello'),
);

// GOOD: Reuses const instances
return Container(
  padding: const EdgeInsets.all(16),
  decoration: const BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.all(Radius.circular(8)),
  ),
  child: const Text('Hello'),
);
```

**Extract Static Widgets**
```dart
// BAD: Anonymous function creates new widget every build
itemBuilder: (context, index) => Card(
  child: ListTile(
    leading: const Icon(Icons.star), // This is fine
    title: Text(items[index].name),
  ),
);

// GOOD: Named widget class with const constructor
class ItemCard extends StatelessWidget {
  final Item item;
  const ItemCard({super.key, required this.item});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: const Icon(Icons.star),
        title: Text(item.name),
      ),
    );
  }
}
```

### 3. List Performance

**Use ListView.builder for Long Lists**
```dart
// BAD: Creates all widgets at once
ListView(
  children: products.map((p) => ProductCard(product: p)).toList(),
)

// GOOD: Lazy builds only visible items
ListView.builder(
  itemCount: products.length,
  itemBuilder: (context, index) => ProductCard(product: products[index]),
)
```

**Add itemExtent for Fixed Height Items**
```dart
ListView.builder(
  itemCount: items.length,
  itemExtent: 72, // Optimize scroll performance
  itemBuilder: (context, index) => ItemTile(item: items[index]),
)
```

**Use Slivers for Complex Scrolling**
```dart
CustomScrollView(
  slivers: [
    const SliverAppBar(title: Text('Products')),
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) => ProductCard(product: products[index]),
        childCount: products.length,
      ),
    ),
  ],
)
```

### 4. Image Optimization

**Cache Images**
```dart
// Use cached_network_image package
CachedNetworkImage(
  imageUrl: product.imageUrl,
  placeholder: (context, url) => const ShimmerPlaceholder(),
  errorWidget: (context, url, error) => const Icon(Icons.error),
  memCacheWidth: 200, // Resize in memory
)
```

**Precache Important Images**
```dart
@override
void didChangeDependencies() {
  super.didChangeDependencies();
  precacheImage(AssetImage('assets/logo.png'), context);
}
```

### 5. State Management Optimization

**Granular Providers**
```dart
// BAD: Entire list rebuilds when one item changes
@riverpod
List<Product> products(ProductsRef ref) => [...];

// GOOD: Individual items can be watched separately
@riverpod
Product productById(ProductByIdRef ref, String id) {
  return ref.watch(productsProvider).firstWhere((p) => p.id == id);
}
```

**Select Specific Fields**
```dart
// BAD: Rebuilds when any product field changes
final product = ref.watch(productProvider);

// GOOD: Only rebuilds when name changes
final productName = ref.watch(
  productProvider.select((p) => p.name),
);
```

### 6. Database Optimization (Drift)

**Use Streams for Reactive Queries**
```dart
// Efficient reactive query
Stream<List<Product>> watchAll() {
  return (_db.select(_db.productTable)
    ..orderBy([(t) => OrderingTerm.desc(t.updatedAt)]))
    .watch();
}
```

**Add Indexes**
```dart
class ProductTable extends Table {
  // ...

  @override
  List<String> get customConstraints => [
    'CREATE INDEX IF NOT EXISTS idx_product_name ON products(name)',
    'CREATE INDEX IF NOT EXISTS idx_product_updated ON products(updated_at)',
  ];
}
```

**Batch Operations**
```dart
// BAD: Individual inserts
for (final product in products) {
  await _db.into(_db.productTable).insert(product);
}

// GOOD: Batch insert
await _db.batch((batch) {
  batch.insertAll(
    _db.productTable,
    products.map(ProductMapper.toCompanion).toList(),
  );
});
```

### 7. Async Optimization

**Parallel API Calls**
```dart
// BAD: Sequential calls
final products = await fetchProducts();
final categories = await fetchCategories();
final user = await fetchUser();

// GOOD: Parallel calls
final results = await Future.wait([
  fetchProducts(),
  fetchCategories(),
  fetchUser(),
]);
```

**Debounce Search**
```dart
class SearchController extends AsyncNotifier<List<Product>> {
  Timer? _debounceTimer;

  void search(String query) {
    _debounceTimer?.cancel();
    _debounceTimer = Timer(const Duration(milliseconds: 300), () {
      _performSearch(query);
    });
  }
}
```

### 8. Memory Optimization

**Dispose Controllers**
```dart
class _MyWidgetState extends State<MyWidget> {
  late final TextEditingController _controller;
  late final ScrollController _scrollController;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
    _scrollController = ScrollController();
  }

  @override
  void dispose() {
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }
}
```

**Limit Image Cache**
```dart
void main() {
  PaintingBinding.instance.imageCache.maximumSize = 100;
  PaintingBinding.instance.imageCache.maximumSizeBytes = 50 << 20; // 50MB
  runApp(const MyApp());
}
```

## Performance Checklist

### Widget Performance
- [ ] Use `const` constructors
- [ ] Extract static widgets
- [ ] Use `ListView.builder` for lists
- [ ] Add `itemExtent` for fixed-height lists
- [ ] Use `select()` for granular provider watching

### Database Performance
- [ ] Add indexes on frequently queried columns
- [ ] Use batch operations for bulk updates
- [ ] Use streams for reactive queries
- [ ] Implement pagination for large datasets

### Network Performance
- [ ] Cache images with cached_network_image
- [ ] Debounce search queries
- [ ] Use parallel API calls where possible
- [ ] Implement offline-first with sync

### Memory
- [ ] Dispose controllers and subscriptions
- [ ] Limit image cache size
- [ ] Use `autoDispose` providers when appropriate

## Output Format

1. **Bottleneck Analysis** - Identified performance issues
2. **Optimized Code** - Improved version
3. **Expected Impact** - Performance gains
4. **Measurement** - How to verify improvement
