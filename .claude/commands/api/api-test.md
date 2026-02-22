---
description: Generate Flutter tests for services, repositories, and widgets
model: claude-sonnet-4-5
---

# Create Flutter Tests

Generate comprehensive tests following the CodeWithNabi testing strategy.

## Target

$ARGUMENTS

## Test Structure

```
test/
├── unit/
│   ├── domain/
│   │   └── product_test.dart
│   ├── application/
│   │   └── product_service_test.dart
│   └── data/
│       └── product_repository_test.dart
│
├── widget/
│   └── product_card_test.dart
│
├── integration/
│   └── product_flow_test.dart
│
└── mocks/
    ├── mock_repositories.dart
    └── mock_services.dart
```

## Testing Tools

- **flutter_test** - Built-in testing framework
- **mocktail** - Mocking (simpler than mockito)
- **flutter_riverpod** - Provider testing utilities

## 1. Unit Tests

### Domain Entity Tests

```dart
// test/unit/domain/product_test.dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('Product', () {
    test('formattedPrice returns correct format', () {
      final product = Product(
        id: '1',
        name: 'Test Product',
        priceCents: 1999,
        stock: 10,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );

      expect(product.formattedPrice, equals('\$19.99'));
    });

    test('copyWith creates new instance with updated fields', () {
      final product = Product(
        id: '1',
        name: 'Original',
        priceCents: 1000,
        stock: 5,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );

      final updated = product.copyWith(name: 'Updated');

      expect(updated.name, equals('Updated'));
      expect(updated.priceCents, equals(1000)); // Unchanged
      expect(updated.id, equals(product.id)); // Same ID
    });
  });
}
```

### Service Tests (Application Layer)

```dart
// test/unit/application/product_service_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockProductRepository extends Mock implements ProductRepository {}

void main() {
  late MockProductRepository mockRepository;
  late ProductService service;

  setUp(() {
    mockRepository = MockProductRepository();
    service = ProductService(repository: mockRepository);
  });

  group('ProductService', () {
    group('createProduct', () {
      test('creates product with valid data', () async {
        // Arrange
        when(() => mockRepository.add(any())).thenAnswer((_) async {});

        // Act
        await service.createProduct(
          name: 'Test Product',
          priceCents: 1000,
          stock: 5,
        );

        // Assert
        verify(() => mockRepository.add(any())).called(1);
      });

      test('throws exception for empty name', () async {
        expect(
          () => service.createProduct(name: '', priceCents: 1000),
          throwsA(isA<ProductValidationException>()),
        );

        verifyNever(() => mockRepository.add(any()));
      });

      test('throws exception for negative price', () async {
        expect(
          () => service.createProduct(name: 'Test', priceCents: -100),
          throwsA(isA<ProductValidationException>()),
        );
      });

      test('throws exception for name too long', () async {
        final longName = 'a' * 101;

        expect(
          () => service.createProduct(name: longName, priceCents: 1000),
          throwsA(isA<ProductValidationException>()),
        );
      });
    });

    group('getAll', () {
      test('returns products from repository', () async {
        final products = [
          Product(
            id: '1',
            name: 'Product 1',
            priceCents: 1000,
            stock: 10,
            createdAt: DateTime.now(),
            updatedAt: DateTime.now(),
          ),
        ];

        when(() => mockRepository.fetchAll())
            .thenAnswer((_) async => products);

        final result = await service.getAll();

        expect(result, equals(products));
        verify(() => mockRepository.fetchAll()).called(1);
      });
    });

    group('deleteProduct', () {
      test('deletes product by id', () async {
        when(() => mockRepository.delete(any())).thenAnswer((_) async {});

        await service.deleteProduct('123');

        verify(() => mockRepository.delete('123')).called(1);
      });
    });
  });
}
```

### Repository Tests

```dart
// test/unit/data/product_repository_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockLocalDataSource extends Mock implements ProductLocalDataSource {}
class MockRemoteDataSource extends Mock implements ProductRemoteDataSource {}

void main() {
  late MockLocalDataSource mockLocal;
  late MockRemoteDataSource mockRemote;
  late ProductRepositoryImpl repository;

  setUp(() {
    mockLocal = MockLocalDataSource();
    mockRemote = MockRemoteDataSource();
    repository = ProductRepositoryImpl(
      local: mockLocal,
      remote: mockRemote,
    );
  });

  group('ProductRepositoryImpl', () {
    test('fetchAll returns products from local data source', () async {
      final products = [testProduct];
      when(() => mockLocal.fetchAll()).thenAnswer((_) async => products);

      final result = await repository.fetchAll();

      expect(result, equals(products));
      verify(() => mockLocal.fetchAll()).called(1);
      verifyNever(() => mockRemote.fetchAll());
    });

    test('add saves to local data source', () async {
      when(() => mockLocal.save(any())).thenAnswer((_) async {});

      await repository.add(testProduct);

      verify(() => mockLocal.save(testProduct)).called(1);
    });
  });
}
```

## 2. Widget Tests

```dart
// test/widget/product_card_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('ProductCard', () {
    testWidgets('displays product name and price', (tester) async {
      final product = Product(
        id: '1',
        name: 'Test Product',
        priceCents: 2500,
        stock: 10,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ProductCard(product: product),
          ),
        ),
      );

      expect(find.text('Test Product'), findsOneWidget);
      expect(find.text('\$25.00'), findsOneWidget);
    });

    testWidgets('shows low stock warning when stock <= 5', (tester) async {
      final product = Product(
        id: '1',
        name: 'Test',
        priceCents: 1000,
        stock: 3,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ProductCard(product: product),
          ),
        ),
      );

      expect(find.textContaining('Low stock'), findsOneWidget);
    });

    testWidgets('calls onTap when tapped', (tester) async {
      bool tapped = false;
      final product = testProduct;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ProductCard(
              product: product,
              onTap: () => tapped = true,
            ),
          ),
        ),
      );

      await tester.tap(find.byType(ProductCard));
      expect(tapped, isTrue);
    });
  });
}
```

## 3. Riverpod Controller Tests

```dart
// test/unit/presentation/product_controller_test.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockProductService extends Mock implements ProductService {}

void main() {
  group('ProductController', () {
    late MockProductService mockService;
    late ProviderContainer container;

    setUp(() {
      mockService = MockProductService();
      container = ProviderContainer(
        overrides: [
          productServiceProvider.overrideWithValue(mockService),
        ],
      );
    });

    tearDown(() {
      container.dispose();
    });

    test('build() returns products from service', () async {
      final products = [testProduct];
      when(() => mockService.getAll()).thenAnswer((_) async => products);

      final controller = container.read(productControllerProvider.future);
      final result = await controller;

      expect(result, equals(products));
    });

    test('deleteProduct updates state after deletion', () async {
      when(() => mockService.getAll()).thenAnswer((_) async => [testProduct]);
      when(() => mockService.deleteProduct(any())).thenAnswer((_) async {});

      // Wait for initial load
      await container.read(productControllerProvider.future);

      // Delete product
      await container
          .read(productControllerProvider.notifier)
          .deleteProduct('1');

      // Verify service was called
      verify(() => mockService.deleteProduct('1')).called(1);
      verify(() => mockService.getAll()).called(2); // Initial + after delete
    });
  });
}
```

## 4. Test Fixtures

```dart
// test/mocks/test_fixtures.dart
final testProduct = Product(
  id: '1',
  name: 'Test Product',
  priceCents: 1000,
  stock: 10,
  createdAt: DateTime(2024, 1, 1),
  updatedAt: DateTime(2024, 1, 1),
);

final testProducts = [
  testProduct,
  Product(
    id: '2',
    name: 'Product 2',
    priceCents: 2000,
    stock: 5,
    createdAt: DateTime(2024, 1, 2),
    updatedAt: DateTime(2024, 1, 2),
  ),
];
```

## 5. Mock Setup

```dart
// test/mocks/mock_repositories.dart
import 'package:mocktail/mocktail.dart';

class MockProductRepository extends Mock implements ProductRepository {}
class MockProductService extends Mock implements ProductService {}
class MockProductLocalDataSource extends Mock implements ProductLocalDataSource {}
class MockProductRemoteDataSource extends Mock implements ProductRemoteDataSource {}

// Register fallback values for complex types
void setUpMocks() {
  registerFallbackValue(testProduct);
}
```

## Test Coverage Checklist

### Unit Tests
- [ ] Entity methods (copyWith, getters)
- [ ] Service validation logic
- [ ] Service business rules
- [ ] Repository delegation

### Widget Tests
- [ ] Displays correct data
- [ ] Handles all states (loading, error, data)
- [ ] Callbacks work correctly
- [ ] Accessibility (semantics)

### Integration Tests
- [ ] Complete user flows
- [ ] Navigation
- [ ] Data persistence

## Running Tests

```bash
# Run all tests
flutter test

# Run with coverage
flutter test --coverage

# Run specific test file
flutter test test/unit/application/product_service_test.dart

# Run tests matching pattern
flutter test --name "ProductService"
```

## Key Rules

### DO:
1. Test behavior, not implementation
2. Use descriptive test names
3. Follow Arrange-Act-Assert pattern
4. Mock dependencies, not the SUT
5. Test edge cases and errors

### DON'T:
1. Test implementation details
2. Mock the class under test
3. Share state between tests
4. Test framework code
