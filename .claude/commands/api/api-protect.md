---
description: Add Supabase RLS policies and Flutter security patterns
model: claude-sonnet-4-5
---

# Implement Security for Flutter + Supabase

Add comprehensive security using Supabase Row Level Security (RLS) and Flutter secure storage patterns.

## Target

$ARGUMENTS

## Security Architecture

```
┌─────────────────────────────────────────┐
│  Flutter App                            │
│  ├── Secure Storage (credentials)       │
│  ├── Input Validation                   │
│  └── Auth State Management              │
├─────────────────────────────────────────┤
│  Supabase                               │
│  ├── Authentication (JWT)               │
│  ├── Row Level Security (RLS)           │
│  └── Edge Functions (server-side)       │
├─────────────────────────────────────────┤
│  PostgreSQL                             │
│  ├── RLS Policies                       │
│  └── Database Constraints               │
└─────────────────────────────────────────┘
```

## 1. Supabase Row Level Security (RLS)

### Enable RLS on All Tables

```sql
-- ALWAYS enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

### Common RLS Patterns

**User Owns Data (Most Common)**

```sql
-- Users can only see their own data
CREATE POLICY "Users can view own products"
ON products FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products"
ON products FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products"
ON products FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own products"
ON products FOR DELETE
USING (auth.uid() = user_id);
```

**Organization/Team Access**

```sql
-- Users can see data from their organization
CREATE POLICY "Users can view org products"
ON products FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can modify org products"
ON products FOR ALL
USING (
  organization_id IN (
    SELECT organization_id FROM user_organizations
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'editor')
  )
);
```

**Role-Based Access**

```sql
-- Only admins can delete
CREATE POLICY "Admins can delete products"
ON products FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- Read-only for viewers
CREATE POLICY "Viewers can only read"
ON products FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'editor', 'viewer')
  )
);
```

## 2. Flutter Authentication

### Auth State Provider

```dart
// lib/src/feature/auth/application/auth_providers.dart
@riverpod
Stream<AuthState> authState(AuthStateRef ref) {
  return Supabase.instance.client.auth.onAuthStateChange;
}

@riverpod
User? currentUser(CurrentUserRef ref) {
  final authState = ref.watch(authStateProvider);
  return authState.valueOrNull?.session?.user;
}

@riverpod
bool isAuthenticated(IsAuthenticatedRef ref) {
  return ref.watch(currentUserProvider) != null;
}
```

### Protected Routes

```dart
// lib/src/routing/app_router.dart
GoRouter(
  redirect: (context, state) {
    final isAuthenticated = ref.read(isAuthenticatedProvider);
    final isAuthRoute = state.matchedLocation.startsWith('/auth');

    if (!isAuthenticated && !isAuthRoute) {
      return '/auth/login';
    }
    if (isAuthenticated && isAuthRoute) {
      return '/home';
    }
    return null;
  },
  routes: [...],
)
```

## 3. Secure Storage

### flutter_secure_storage Setup

```dart
// lib/src/core/storage/secure_storage_service.dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  final _storage = const FlutterSecureStorage(
    aOptions: AndroidOptions(
      encryptedSharedPreferences: true,
    ),
    iOptions: IOSOptions(
      accessibility: KeychainAccessibility.first_unlock_this_device,
    ),
  );

  // Auth tokens
  Future<void> saveAuthToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }

  Future<String?> getAuthToken() async {
    return await _storage.read(key: 'auth_token');
  }

  Future<void> deleteAuthToken() async {
    await _storage.delete(key: 'auth_token');
  }

  // Clear all on logout
  Future<void> clearAll() async {
    await _storage.deleteAll();
  }
}
```

### Storage Guidelines

| Data Type | Storage | Example |
|-----------|---------|---------|
| Auth tokens | flutter_secure_storage | JWT, refresh token |
| API keys | flutter_secure_storage | Service keys |
| User preferences | SharedPreferences | Theme, language |
| Cached data | Drift | Products, sales |
| Sensitive user data | Encrypted Drift | Payment info |

## 4. Input Validation (Application Layer)

```dart
// lib/src/feature/product/application/product_service.dart
class ProductService {
  Future<void> createProduct({
    required String name,
    required int priceCents,
    String? barcode,
  }) async {
    // Validate before any operation
    if (name.isEmpty) {
      throw ProductValidationException('Name is required');
    }
    if (name.length > 100) {
      throw ProductValidationException('Name too long (max 100 chars)');
    }
    if (priceCents <= 0) {
      throw ProductValidationException('Price must be positive');
    }
    if (priceCents > 99999999) {
      throw ProductValidationException('Price exceeds maximum');
    }
    if (barcode != null && !_isValidBarcode(barcode)) {
      throw ProductValidationException('Invalid barcode format');
    }

    // Now safe to save
    await _repository.add(Product(...));
  }

  bool _isValidBarcode(String barcode) {
    // EAN-13 or UPC-A validation
    return RegExp(r'^\d{12,13}$').hasMatch(barcode);
  }
}
```

## 5. Database Constraints (Belt + Suspenders)

```sql
-- Add constraints even with app validation
ALTER TABLE products
ADD CONSTRAINT product_name_length CHECK (char_length(name) <= 100),
ADD CONSTRAINT product_price_positive CHECK (price_cents > 0),
ADD CONSTRAINT product_price_max CHECK (price_cents <= 99999999);

-- Prevent negative stock
ALTER TABLE products
ADD CONSTRAINT product_stock_positive CHECK (stock >= 0);
```

## 6. Environment Variables

```dart
// lib/src/core/env/env.dart
import 'package:envied/envied.dart';

part 'env.g.dart';

@Envied(path: '.env', obfuscate: true)
abstract class Env {
  @EnviedField(varName: 'SUPABASE_URL')
  static String supabaseUrl = _Env.supabaseUrl;

  @EnviedField(varName: 'SUPABASE_ANON_KEY', obfuscate: true)
  static String supabaseAnonKey = _Env.supabaseAnonKey;
}
```

## Security Checklist

### Supabase Security
- [ ] RLS enabled on ALL tables
- [ ] RLS policies tested for each role
- [ ] Service role key NEVER in app
- [ ] Anon key only for client operations

### Flutter Security
- [ ] Sensitive data in flutter_secure_storage
- [ ] Environment variables obfuscated (envied)
- [ ] Input validation in application layer
- [ ] Auth state properly managed
- [ ] Protected routes configured

### Code Review
- [ ] No `print()` with sensitive data
- [ ] No secrets in version control
- [ ] No hardcoded API keys
- [ ] Proper error messages (no internal details)
- [ ] Session timeout handling
- [ ] Logout clears all sensitive data

### Production Checklist
- [ ] ProGuard/R8 enabled (Android)
- [ ] App Transport Security (iOS)
- [ ] Certificate pinning (optional, high-security)
- [ ] Jailbreak/root detection (optional)

## Key Rules

### DO:
1. Enable RLS on EVERY table
2. Use flutter_secure_storage for secrets
3. Validate input in application layer
4. Use PKCE for OAuth flows
5. Obfuscate environment variables
6. Handle auth state changes reactively

### DON'T:
1. Trust client-side validation alone
2. Store secrets in SharedPreferences
3. Expose service role key in app
4. Skip RLS "temporarily"
5. Log sensitive data
6. Hardcode API keys

## What to Generate

1. **RLS Policies** - SQL for the target table
2. **Auth Providers** - Riverpod auth state
3. **Secure Storage Service** - Token management
4. **Validation Logic** - Service layer checks
5. **Database Constraints** - SQL constraints
